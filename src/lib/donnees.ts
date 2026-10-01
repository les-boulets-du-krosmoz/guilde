import { supabase } from "./supabase";
import type { Membre, MetierMembre, Personnage, QueteTerminee } from "./types";

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
