import { supabase } from "./supabase";
import type { AideEtape, Annonce, InvitationAnnonce, Membre, MetierMembre, ParticipantAnnonce, Personnage, QueteTerminee, SuccesDonjon } from "./types";

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
export type ResumeMetamob = { pseudo: string | null; quetes: QueteMetamob[]; maj_le?: string; ancien?: boolean; introuvable?: boolean };

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

/** Dofus Ocre saisi à la main pour un personnage (quand Metamob ne répond pas ou n'est pas utilisé). */
export type SaisieOcre = { archis: number; archisTotal: number; boss: number; bossTotal: number };

export async function enregistrerOcre(personnageId: string, v: SaisieOcre): Promise<void> {
  const { error } = await supabase
    .from("personnages")
    .update({ ocre_archis: v.archis, ocre_archis_total: v.archisTotal, ocre_boss: v.boss, ocre_boss_total: v.bossTotal, ocre_saisi_le: new Date().toISOString() })
    .eq("id", personnageId);
  if (error) throw error;
}

export async function effacerOcre(personnageId: string): Promise<void> {
  const { error } = await supabase
    .from("personnages")
    .update({ ocre_archis: null, ocre_archis_total: null, ocre_boss: null, ocre_boss_total: null, ocre_saisi_le: null })
    .eq("id", personnageId);
  if (error) throw error;
}

/** Succès de donjon visés ou faits par toute la guilde (petite table, chargée d'un coup). */
export async function chargerSucces(): Promise<SuccesDonjon[]> {
  const { data, error } = await supabase.from("succes_donjon").select("personnage_id, succes_id, statut, maj_le");
  // Table absente (migration 009 pas encore passée) : le site s'affiche sans les succès plutôt qu'en erreur.
  if (error && (error.code === "42P01" || error.code === "PGRST205")) return [];
  if (error) throw error;
  return data as SuccesDonjon[];
}

/** Statut d'un succès pour un personnage ; `null` retire la ligne. */
export async function definirSucces(personnageId: string, succesId: string, statut: "vise" | "fait" | null): Promise<void> {
  if (statut === null) {
    const { error } = await supabase.from("succes_donjon").delete().eq("personnage_id", personnageId).eq("succes_id", succesId);
    if (error) throw error;
    return;
  }
  const { error } = await supabase
    .from("succes_donjon")
    .upsert({ personnage_id: personnageId, succes_id: succesId, statut, maj_le: new Date().toISOString() }, { onConflict: "personnage_id,succes_id" });
  if (error) throw error;
}

/** Marque ou retire plusieurs succès d'un coup (« tout cocher » sur un donjon ou une colonne). */
export async function definirSuccesPlusieurs(personnageId: string, succesIds: string[], fait: boolean): Promise<void> {
  if (succesIds.length === 0) return;
  if (!fait) {
    const { error } = await supabase.from("succes_donjon").delete().eq("personnage_id", personnageId).in("succes_id", succesIds);
    if (error) throw error;
    return;
  }
  const maj_le = new Date().toISOString();
  const { error } = await supabase
    .from("succes_donjon")
    .upsert(succesIds.map((succes_id) => ({ personnage_id: personnageId, succes_id, statut: "fait", maj_le })), { onConflict: "personnage_id,succes_id" });
  if (error) throw error;
}

/** « Aide en masse » : inscrit le personnage sur plusieurs étapes d'un coup (note facultative par étape). */
export async function proposerAidesPlusieurs(personnageId: string, etapes: { queteId: string; note: string }[]): Promise<void> {
  if (etapes.length === 0) return;
  const { error } = await supabase.from("aides_etapes").upsert(
    etapes.map((e) => ({ personnage_id: personnageId, quete_id: e.queteId, note: e.note.trim().slice(0, 140) || null })),
    { onConflict: "personnage_id,quete_id" },
  );
  if (error) throw error;
}

/** Retire le personnage de plusieurs étapes d'un coup. */
export async function retirerAidesPlusieurs(personnageId: string, queteIds: string[]): Promise<void> {
  if (queteIds.length === 0) return;
  const { error } = await supabase.from("aides_etapes").delete().eq("personnage_id", personnageId).in("quete_id", queteIds);
  if (error) throw error;
}

// ---------- Annonces de sorties ----------

export type DonneesAnnonces = { annonces: Annonce[]; participants: ParticipantAnnonce[]; invitations: InvitationAnnonce[] };

/** Annonces, inscrits et invitations. Tables absentes (migrations 012 ou 013 pas passées) : listes vides. */
export async function chargerAnnonces(): Promise<DonneesAnnonces> {
  const [a, p, i] = await Promise.all([
    supabase.from("annonces").select("*"),
    supabase.from("annonces_participants").select("annonce_id, personnage_id, cree_le"),
    supabase.from("annonces_invitations").select("*"),
  ]);
  const absente = (e: { code?: string } | null) => !!e && (e.code === "42P01" || e.code === "PGRST205");
  if (absente(a.error) || absente(p.error)) return { annonces: [], participants: [], invitations: [] };
  if (a.error) throw a.error;
  if (p.error) throw p.error;
  if (i.error && !absente(i.error)) throw i.error;
  return { annonces: a.data as Annonce[], participants: p.data as ParticipantAnnonce[], invitations: (i.data ?? []) as InvitationAnnonce[] };
}

/**
 * Invite des membres à une sortie, puis les mentionne sur Discord (un échec Discord n'annule pas les invitations).
 * `mentionner = false` à la création : c'est le message d'annonce lui-même qui les mentionnera.
 */
export async function inviter(annonceId: string, membreIds: string[], parId: string, mentionner = true): Promise<void> {
  if (membreIds.length === 0) return;
  const { error } = await supabase
    .from("annonces_invitations")
    .upsert(membreIds.map((membre_id) => ({ annonce_id: annonceId, membre_id, invite_par: parId })), { onConflict: "annonce_id,membre_id", ignoreDuplicates: true });
  if (error) throw error;
  if (mentionner) await supabase.functions.invoke("annoncer-sortie", { body: { annonce_id: annonceId, invitations: true } }).catch(() => {});
}

export async function repondreInvitation(annonceId: string, membreId: string, statut: "acceptee" | "refusee"): Promise<void> {
  const { error } = await supabase.from("annonces_invitations")
    .update({ statut, repondu_le: new Date().toISOString() }).eq("annonce_id", annonceId).eq("membre_id", membreId);
  if (error) throw error;
}

export async function annulerInvitation(annonceId: string, membreId: string): Promise<void> {
  const { error } = await supabase.from("annonces_invitations").delete().eq("annonce_id", annonceId).eq("membre_id", membreId);
  if (error) throw error;
}

export type ChampsAnnonce = Omit<Annonce, "id" | "auteur_id" | "annonce_discord_le" | "cree_le" | "maj_le">;

/** Crée (sans id) ou modifie une annonce ; renvoie son identifiant. */
export async function enregistrerAnnonce(champs: ChampsAnnonce, auteurId: string, id?: string): Promise<string> {
  if (id) {
    const { error } = await supabase.from("annonces").update(champs).eq("id", id);
    if (error) throw error;
    return id;
  }
  const { data, error } = await supabase.from("annonces").insert({ ...champs, auteur_id: auteurId }).select("id").single();
  if (error) throw error;
  return (data as { id: string }).id;
}

export async function supprimerAnnonce(id: string): Promise<void> {
  const { error } = await supabase.from("annonces").delete().eq("id", id);
  if (error) throw error;
}

export async function participer(annonceId: string, personnageId: string): Promise<void> {
  const { error } = await supabase.from("annonces_participants").insert({ annonce_id: annonceId, personnage_id: personnageId });
  if (error) throw error;
}

export async function retirerParticipation(annonceId: string, personnageId: string): Promise<void> {
  const { error } = await supabase.from("annonces_participants").delete().eq("annonce_id", annonceId).eq("personnage_id", personnageId);
  if (error) throw error;
}

/** Demande l'annonce de la sortie sur Discord (fonction « annoncer-sortie ») ; un échec n'empêche pas la création. */
export async function annoncerSurDiscord(annonceId: string, details: string[]): Promise<void> {
  await supabase.functions.invoke("annoncer-sortie", { body: { annonce_id: annonceId, details } }).catch(() => {});
}
