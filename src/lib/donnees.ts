import { supabase } from "./supabase";
import type { AideEtape, Membre, MetierMembre, Personnage, QueteTerminee } from "./types";

export type DonneesGuilde = {
  membres: Map<string, Membre>;
  personnages: Personnage[];
};

export async function chargerGuilde(): Promise<DonneesGuilde> {
  const [m, p] = await Promise.all([
    supabase.from("membres").select("*").eq("valide", true),
    supabase.from("personnages").select("*").order("nom"),
  ]);
  if (m.error) throw m.error;
  if (p.error) throw p.error;
  return {
    membres: new Map((m.data as Membre[]).map((x) => [x.id, x])),
    personnages: p.data as Personnage[],
  };
}

/** Quêtes terminées, regroupées par personnage. `prefixe` limite à un Dofus (ex. "em-"). */
/** Supabase renvoie 1 000 lignes au maximum par requête : on lit par pages pour ne rien perdre. */
export async function toutesLesQuetes(prefixe?: string, personnageId?: string): Promise<(QueteTerminee & { termine_le: string })[]> {
  const PAGE = 1000;
  const lignes: (QueteTerminee & { termine_le: string })[] = [];
  for (let debut = 0; ; debut += PAGE) {
    let req = supabase.from("quetes_terminees").select("personnage_id, quete_id, termine_le").order("personnage_id").order("quete_id");
    if (prefixe) req = req.like("quete_id", `${prefixe}%`);
    if (personnageId) req = req.eq("personnage_id", personnageId);
    const { data, error } = await req.range(debut, debut + PAGE - 1);
    if (error) throw error;
    lignes.push(...(data as (QueteTerminee & { termine_le: string })[]));
    if (!data || data.length < PAGE) return lignes;
  }
}

/** Date de fin de chaque quête d'un personnage (sert aux badges). */
export async function chargerDatesQuetes(personnageId: string): Promise<Map<string, string>> {
  const lignes = await toutesLesQuetes(undefined, personnageId);
  return new Map(lignes.map((l) => [l.quete_id, l.termine_le]));
}

export async function chargerQuetes(prefixe?: string, personnageId?: string): Promise<Map<string, Set<string>>> {
  const data = await toutesLesQuetes(prefixe, personnageId);
  const parPerso = new Map<string, Set<string>>();
  for (const r of data) {
    if (!parPerso.has(r.personnage_id)) parPerso.set(r.personnage_id, new Set());
    parPerso.get(r.personnage_id)!.add(r.quete_id);
  }
  return parPerso;
}

export async function chargerMetiers(membreId?: string): Promise<MetierMembre[]> {
  let req = supabase.from("metiers_membre").select("*");
  if (membreId) req = req.eq("membre_id", membreId);
  const { data, error } = await req;
  if (error) throw error;
  return data as MetierMembre[];
}

/** Préfixe des identifiants de quêtes d'un Dofus (toutes les quêtes d'un Dofus partagent le même). */
export function prefixeDofus(ids: string[]): string | undefined {
  return ids[0]?.split("-")[0] + "-";
}

/** Identifiants des ressources cochées par un personnage. */
export async function chargerRessources(personnageId: string): Promise<Set<string>> {
  const { data, error } = await supabase.from("ressources_cochees").select("ressource_id").eq("personnage_id", personnageId);
  if (error) throw error;
  return new Set((data as { ressource_id: string }[]).map((r) => r.ressource_id));
}

/** Dofus que chaque personnage veut commencer : personnage -> ensemble d'identifiants de Dofus. */
export async function chargerSouhaits(personnageId?: string): Promise<Map<string, Set<string>>> {
  let req = supabase.from("dofus_souhaites").select("personnage_id, dofus_id");
  if (personnageId) req = req.eq("personnage_id", personnageId);
  const { data, error } = await req;
  if (error) throw error;
  const res = new Map<string, Set<string>>();
  for (const r of data as { personnage_id: string; dofus_id: string }[]) {
    if (!res.has(r.personnage_id)) res.set(r.personnage_id, new Set());
    res.get(r.personnage_id)!.add(r.dofus_id);
  }
  return res;
}

export type EtatAvis = "en_cours" | "livre";
export type LigneAvis = { personnage_id: string; avis_id: string; etat: EtatAvis; maj_le: string };

/** Avis de recherche de toute la guilde (ou d'un personnage), lus par pages de 1 000 lignes. */
export async function chargerAvis(personnageId?: string): Promise<LigneAvis[]> {
  const PAGE = 1000;
  const lignes: LigneAvis[] = [];
  for (let debut = 0; ; debut += PAGE) {
    let req = supabase.from("avis_personnage").select("personnage_id, avis_id, etat, maj_le").order("personnage_id").order("avis_id");
    if (personnageId) req = req.eq("personnage_id", personnageId);
    const { data, error } = await req.range(debut, debut + PAGE - 1);
    if (error) throw error;
    lignes.push(...(data as LigneAvis[]));
    if (!data || data.length < PAGE) return lignes;
  }
}

export type CompteMetamob = { possedes: number; total: number };
export type QueteMetamob = { personnage: string; etape: number; etapes: number; archis: CompteMetamob; boss: CompteMetamob };
export type ResumeMetamob = { pseudo: string | null; quetes: QueteMetamob[]; maj_le?: string; ancien?: boolean };

/** Quêtes du Dofus Ocre d'un membre sur Metamob (passe par la fonction serveur, qui garde la clé API). */
export async function chargerMetamob(membreId: string, forcer = false): Promise<ResumeMetamob> {
  const { data, error } = await supabase.functions.invoke("metamob", { body: { membre_id: membreId, forcer } });
  if (error) {
    // Le message utile est dans le corps de la réponse d'erreur.
    const corps = await (error as { context?: Response }).context?.json?.().catch(() => null);
    throw new Error(corps?.erreur ?? "Metamob est injoignable pour le moment.");
  }
  return data as ResumeMetamob;
}

/** Nombre d'avis livrés par un personnage. */
export async function compterAvisLivres(personnageId: string): Promise<number> {
  const { count, error } = await supabase
    .from("avis_personnage")
    .select("avis_id", { count: "exact", head: true })
    .eq("personnage_id", personnageId)
    .eq("etat", "livre");
  if (error) throw error;
  return count ?? 0;
}

/** Inscriptions « Je peux aider ». `prefixe` limite à une série (ex. « etp- »), `personnageId` à un personnage. */
export async function chargerAides(prefixe?: string, personnageId?: string): Promise<AideEtape[]> {
  let req = supabase.from("aides_etapes").select("personnage_id, quete_id, note, cree_le").order("cree_le");
  if (prefixe) req = req.like("quete_id", `${prefixe}%`);
  if (personnageId) req = req.eq("personnage_id", personnageId);
  const { data, error } = await req;
  // Table absente (migration 006 pas encore passée) : on affiche le site sans l'entraide plutôt qu'une erreur.
  if (error && (error.code === "42P01" || error.code === "PGRST205")) return [];
  if (error) throw error;
  return data as AideEtape[];
}

export async function proposerAide(personnageId: string, queteId: string, note: string): Promise<void> {
  const texte = note.trim().slice(0, 140);
  const { error } = await supabase
    .from("aides_etapes")
    .upsert({ personnage_id: personnageId, quete_id: queteId, note: texte || null }, { onConflict: "personnage_id,quete_id" });
  if (error) throw error;
}

export async function retirerAide(personnageId: string, queteId: string): Promise<void> {
  const { error } = await supabase.from("aides_etapes").delete().eq("personnage_id", personnageId).eq("quete_id", queteId);
  if (error) throw error;
}
