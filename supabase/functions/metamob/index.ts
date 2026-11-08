// Quête du Dofus Ocre des membres, lue sur Metamob (la clé API reste sur le serveur).
//   - { membre_id, forcer? } : le résumé d'un membre (fiche de personnage).
//   - { guilde: true } : la guilde entière (page Archimonstres) ; les résumés trop vieux sont rafraîchis
//     par petits lots à chaque appel, pour rester sous la limite de Metamob (60 requêtes par minute).
// Pseudo Metamob : celui saisi dans « Mon compte », sinon le nom du personnage principal du membre.
// Variables : METAMOB_API_KEY (clé créée dans les paramètres Metamob d'un officier).
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const API = "https://www.metamob.fr/api/v1";
const DUREE_CACHE_MS = 6 * 3600 * 1000;
// Une actualisation forcée (bouton « Actualiser ») n'est faite que si le résumé a plus de 10 minutes.
const DELAI_MIN_FORCER_MS = 10 * 60 * 1000;
const OCRE_UNITY = 1; // modèle de quête « Ocre, Dofus (Unity) »
const TYPE_BOSS = 2;
const TYPE_ARCHI = 3;
const MAX_QUETES = 5;
const LOT_GUILDE = 4; // membres rafraîchis au plus par appel « guilde » (environ 5 requêtes chacun)
const VERSION = 2; // format du résumé : la v2 garde aussi les archis possédés

type Compte = { possedes: number; total: number };
type Quete = { personnage: string; etape: number; etapes: number; parallele: number; archis: Compte; boss: Compte; possession: Record<string, number> };
type Resume = { v: number; pseudo: string; quetes: Quete[]; introuvable?: boolean };

/** Pseudo Metamob à partir d'un lien de profil ou d'un pseudo saisi tel quel. */
function pseudoDepuis(saisie: string): string | null {
  const brut = saisie.trim();
  if (!brut) return null;
  if (!/^https?:\/\//i.test(brut)) return /^[\p{L}\p{N}_.-]{2,40}$/u.test(brut) ? brut : null;
  let url: URL;
  try { url = new URL(brut); } catch { return null; }
  if (!/(^|\.)metamob\.fr$/i.test(url.hostname)) return null;
  const morceaux = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);
  const i = morceaux.findIndex((m) => /^(utilisateurs?|users?|profils?|profiles?|u)$/i.test(m));
  return (i >= 0 ? morceaux[i + 1] : morceaux[morceaux.length - 1]) ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    return await traiter(req);
  } catch (e) {
    // Erreur imprévue : on la journalise (Supabase > Edge Functions > metamob > Logs) et on l'explique au site.
    console.error("metamob :", e);
    const detail = typeof e === "number" ? `Metamob a répondu ${e}` : e instanceof Error ? e.message : String(e);
    return json({ erreur: `Erreur du serveur (${detail}).` }, 500);
  }
});

async function traiter(req: Request): Promise<Response> {
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // 1. L'appelant est-il un membre validé ?
  const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  const { data: { user } } = await admin.auth.getUser(jwt);
  if (!user) return json({ erreur: "Session invalide" }, 401);
  const { data: appelant } = await admin.from("membres").select("valide").eq("id", user.id).single();
  if (!appelant?.valide) return json({ erreur: "Réservé aux membres de la guilde" }, 403);

  const cle = Deno.env.get("METAMOB_API_KEY");
  if (!cle) return json({ erreur: "Clé Metamob absente côté serveur" }, 500);
  const lire = async (chemin: string) => {
    const r = await fetch(API + chemin, { headers: { Authorization: `Bearer ${cle}` } });
    if (!r.ok) throw r.status;
    const corps = await r.json();
    return corps?.data ?? corps;
  };

  /** Pseudo Metamob d'un membre (saisi, sinon son personnage principal). */
  const pseudoDuMembre = async (membre_id: string, saisi?: string | null): Promise<string | null> => {
    let saisie = saisi?.trim() ?? "";
    if (!saisie) {
      const { data: persos } = await admin.from("personnages").select("nom").eq("membre_id", membre_id)
        .order("est_principal", { ascending: false }).order("nom").limit(1);
      saisie = persos?.[0]?.nom ?? "";
    }
    return saisie ? pseudoDepuis(saisie) : null;
  };

  /** Lit la quête Ocre d'un pseudo sur Metamob, met à jour le catalogue des archis et le cache du membre. */
  const actualiser = async (membre_id: string, pseudo: string): Promise<Resume> => {
    let resume: Resume;
    try {
      const liste = await lire(`/users/${encodeURIComponent(pseudo)}/quests`);
      const ocres = (Array.isArray(liste) ? liste : []).filter((q) => q?.quest_template?.id === OCRE_UNITY).slice(0, MAX_QUETES);
      const catalogue = new Map<number, { id: number; nom: string; etape: number }>();

      // Un monstre d'une étape déjà passée compte comme réuni ; sinon on compte les exemplaires possédés,
      // plafonnés au nombre de quêtes menées en parallèle. Les archis possédés sont aussi gardés (quantités).
      const parcourir = async (slug: string, type: number, etape: number, parallele: number, possession?: Record<string, number>): Promise<Compte> => {
        let possedes = 0, total = 0;
        for (let offset = 0; ; offset += 200) {
          const d = await lire(`/users/${encodeURIComponent(pseudo)}/quests/${encodeURIComponent(slug)}?monster_type=${type}&limit=200&offset=${offset}`);
          const monstres: { id: number; name?: { fr?: string }; step: number; quantity: number }[] = d?.monsters ?? [];
          for (const m of monstres) {
            total += parallele;
            possedes += m.step < etape ? parallele : Math.min(m.quantity ?? 0, parallele);
            if (possession) {
              if ((m.quantity ?? 0) > 0) possession[m.id] = m.quantity;
              if (m.name?.fr) catalogue.set(m.id, { id: m.id, nom: m.name.fr, etape: m.step });
            }
          }
          if (monstres.length < 200 || offset + 200 >= (d?.pagination?.total ?? 0)) break;
        }
        return { possedes, total };
      };

      const quetes: Quete[] = [];
      for (const q of ocres) {
        const parallele = Math.max(1, q.parallel_quests ?? 1);
        const etape = q.current_step ?? 0;
        const possession: Record<string, number> = {};
        quetes.push({
          personnage: q.character_name ?? "", etape, etapes: q.quest_template?.step_count ?? 0, parallele,
          archis: await parcourir(q.slug, TYPE_ARCHI, etape, parallele, possession),
          boss: await parcourir(q.slug, TYPE_BOSS, etape, parallele),
          possession,
        });
      }
      if (catalogue.size) await admin.from("metamob_archis").upsert([...catalogue.values()].map((a) => ({ ...a, maj_le: new Date().toISOString() })));
      resume = { v: VERSION, pseudo, quetes };
    } catch (statut) {
      if (statut !== 404) throw statut;
      resume = { v: VERSION, pseudo, quetes: [], introuvable: true }; // pas de profil Metamob à ce nom
    }
    await admin.from("metamob_cache").upsert({ membre_id, pseudo, donnees: resume, maj_le: new Date().toISOString() });
    return resume;
  };

  const corps = await req.json().catch(() => ({}));

  // ---------- Toute la guilde (page Archimonstres) ----------
  if (corps.guilde) {
    const [{ data: membres }, { data: caches }, { data: catalogue }] = await Promise.all([
      admin.from("membres").select("id, metamob").eq("valide", true),
      admin.from("metamob_cache").select("*"),
      admin.from("metamob_archis").select("id, nom, etape").order("etape").order("nom"),
    ]);
    const parMembre = new Map((caches ?? []).map((c: { membre_id: string }) => [c.membre_id, c]));
    const lignes: { membre_id: string; pseudo: string | null; donnees: Resume | null; maj_le: string | null }[] = [];
    const aRafraichir: { membre_id: string; pseudo: string; age: number }[] = [];
    for (const m of membres ?? []) {
      const pseudo = await pseudoDuMembre(m.id, m.metamob);
      const c = parMembre.get(m.id) as { pseudo: string; donnees: Resume; maj_le: string } | undefined;
      const valide = c && c.pseudo === pseudo && c.donnees?.v === VERSION;
      const age = valide ? Date.now() - new Date(c!.maj_le).getTime() : Infinity;
      if (pseudo && age > DUREE_CACHE_MS) aRafraichir.push({ membre_id: m.id, pseudo, age });
      lignes.push({ membre_id: m.id, pseudo, donnees: valide ? c!.donnees : null, maj_le: valide ? c!.maj_le : null });
    }
    // Les plus anciens d'abord ; on s'arrête si Metamob demande de ralentir.
    aRafraichir.sort((a, b) => b.age - a.age);
    let faits = 0;
    let alerte: string | null = null;
    for (const r of aRafraichir.slice(0, LOT_GUILDE)) {
      try {
        const donnees = await actualiser(r.membre_id, r.pseudo);
        const l = lignes.find((x) => x.membre_id === r.membre_id)!;
        l.donnees = donnees; l.maj_le = new Date().toISOString(); faits++;
      } catch (statut) {
        console.error("metamob (guilde) :", r.pseudo, statut);
        alerte = statut === 401 || statut === 403 ? "Clé Metamob refusée : elle a peut-être expiré."
          : statut === 429 ? "Metamob demande de patienter (trop de requêtes) : la suite arrive dans un instant."
          : `Metamob n'a pas répondu (${typeof statut === "number" ? statut : String(statut)}).`;
        break;
      }
    }
    const { data: catalogueFrais } = faits ? await admin.from("metamob_archis").select("id, nom, etape").order("etape").order("nom") : { data: catalogue };
    return json({ membres: lignes, catalogue: catalogueFrais ?? [], restants: Math.max(0, aRafraichir.length - faits), alerte });
  }

  // ---------- Un membre (fiche de personnage) ----------
  const { membre_id, forcer } = corps;
  if (!membre_id) return json({ erreur: "membre_id manquant" }, 400);
  const { data: membre } = await admin.from("membres").select("metamob").eq("id", membre_id).single();
  const pseudo = await pseudoDuMembre(membre_id, membre?.metamob);
  if (!pseudo) return json({ pseudo: null, quetes: [] });

  const { data: cache } = await admin.from("metamob_cache").select("*").eq("membre_id", membre_id).maybeSingle();
  const cacheValide = cache && cache.pseudo === pseudo && cache.donnees?.v === VERSION;
  const age = cacheValide ? Date.now() - new Date(cache.maj_le).getTime() : Infinity;
  if (cacheValide && age < (forcer ? DELAI_MIN_FORCER_MS : DUREE_CACHE_MS)) return json({ ...cache.donnees, maj_le: cache.maj_le });
  try {
    const donnees = await actualiser(membre_id, pseudo);
    return json({ ...donnees, maj_le: new Date().toISOString() });
  } catch (statut) {
    // Metamob indisponible ou limite atteinte : on rend l'ancien résumé s'il existe.
    if (cache && cache.pseudo === pseudo) return json({ ...cache.donnees, maj_le: cache.maj_le, ancien: true });
    if (statut === 401 || statut === 403) return json({ erreur: "Clé Metamob refusée : elle a peut-être expiré." }, 502);
    if (statut === 429) return json({ erreur: "Metamob demande de patienter un peu (trop de requêtes)." }, 502);
    return json({ erreur: "Metamob ne répond pas, réessaie plus tard." }, 502);
  }
}
