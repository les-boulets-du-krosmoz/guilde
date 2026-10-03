// Résumé de la quête du Dofus Ocre d'un membre, lu sur Metamob.
// Appelée par la fiche d'un personnage avec { membre_id }. Réservée aux membres validés.
// Variables : METAMOB_API_KEY (clé créée dans l'onglet API de l'espace Metamob d'un officier).
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const API = "https://www.metamob.fr/api/v1";
const DUREE_CACHE_MS = 6 * 3600 * 1000;
const OCRE_UNITY = 1; // modèle de quête « Ocre Dofus Unity »
const TYPE_BOSS = 2;
const TYPE_ARCHI = 3;
const MAX_QUETES = 5;

type Compte = { possedes: number; total: number };
type Quete = { personnage: string; etape: number; etapes: number; archis: Compte; boss: Compte };

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

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // 1. L'appelant est-il un membre validé ?
  const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  const { data: { user } } = await admin.auth.getUser(jwt);
  if (!user) return json({ erreur: "Session invalide" }, 401);
  const { data: appelant } = await admin.from("membres").select("valide").eq("id", user.id).single();
  if (!appelant?.valide) return json({ erreur: "Réservé aux membres de la guilde" }, 403);

  // 2. Quel profil Metamob ?
  const { membre_id, forcer } = await req.json().catch(() => ({}));
  if (!membre_id) return json({ erreur: "membre_id manquant" }, 400);
  const { data: membre } = await admin.from("membres").select("metamob").eq("id", membre_id).single();
  if (!membre?.metamob) return json({ pseudo: null, quetes: [] });
  const pseudo = pseudoDepuis(membre.metamob);
  if (!pseudo) return json({ erreur: "Ce lien ne ressemble pas à un profil Metamob." }, 400);

  // 3. Cache encore frais ?
  const { data: cache } = await admin.from("metamob_cache").select("*").eq("membre_id", membre_id).maybeSingle();
  const cacheValide = cache && cache.pseudo === pseudo;
  if (cacheValide && !forcer && Date.now() - new Date(cache.maj_le).getTime() < DUREE_CACHE_MS) {
    return json({ ...cache.donnees, maj_le: cache.maj_le });
  }

  // 4. Lecture Metamob
  const cle = Deno.env.get("METAMOB_API_KEY");
  if (!cle) return json({ erreur: "Clé Metamob absente côté serveur" }, 500);
  const lire = async (chemin: string) => {
    const r = await fetch(API + chemin, { headers: { Authorization: `Bearer ${cle}` } });
    if (!r.ok) throw r.status;
    const corps = await r.json();
    return corps?.data ?? corps;
  };

  try {
    const liste = await lire(`/users/${encodeURIComponent(pseudo)}/quests`);
    const ocres = (Array.isArray(liste) ? liste : []).filter((q) => q?.quest_template?.id === OCRE_UNITY).slice(0, MAX_QUETES);

    // Progression d'un type de monstre : un monstre d'une étape déjà passée compte comme réuni,
    // sinon on compte les exemplaires possédés, plafonnés au nombre de quêtes menées en parallèle.
    const compter = async (slug: string, type: number, etape: number, parallele: number): Promise<Compte> => {
      let possedes = 0;
      let total = 0;
      for (let offset = 0; ; offset += 200) {
        const d = await lire(`/users/${encodeURIComponent(pseudo)}/quests/${encodeURIComponent(slug)}?monster_type=${type}&limit=200&offset=${offset}`);
        const monstres: { step: number; quantity: number }[] = d?.monsters ?? [];
        for (const m of monstres) {
          total += parallele;
          possedes += m.step < etape ? parallele : Math.min(m.quantity ?? 0, parallele);
        }
        if (monstres.length < 200 || offset + 200 >= (d?.pagination?.total ?? 0)) break;
      }
      return { possedes, total };
    };

    const quetes: Quete[] = [];
    for (const q of ocres) {
      const parallele = Math.max(1, q.parallel_quests ?? 1);
      quetes.push({
        personnage: q.character_name ?? "",
        etape: q.current_step ?? 0,
        etapes: q.quest_template?.step_count ?? 0,
        archis: await compter(q.slug, TYPE_ARCHI, q.current_step ?? 0, parallele),
        boss: await compter(q.slug, TYPE_BOSS, q.current_step ?? 0, parallele),
      });
    }

    const donnees = { pseudo, quetes };
    const maj_le = new Date().toISOString();
    await admin.from("metamob_cache").upsert({ membre_id, pseudo, donnees, maj_le });
    return json({ ...donnees, maj_le });
  } catch (statut) {
    // Metamob indisponible ou limite atteinte : on rend l'ancien résumé s'il existe.
    if (cacheValide) return json({ ...cache.donnees, maj_le: cache.maj_le, ancien: true });
    if (statut === 404) return json({ erreur: `Aucun profil Metamob « ${pseudo} ».` }, 404);
    if (statut === 401 || statut === 403) return json({ erreur: "Clé Metamob refusée : elle a peut-être expiré." }, 502);
    return json({ erreur: "Metamob ne répond pas, réessaie plus tard." }, 502);
  }
});
