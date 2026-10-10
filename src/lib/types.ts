export type Alignement = "Neutre" | "Bonta" | "Brâkmar";

export interface Membre {
  id: string;
  discord_id: string;
  pseudo: string;
  avatar_url: string | null;
  est_officier: boolean;
  valide: boolean;
  dispo_jusqua: string | null;
  dispo_personnage_id: string | null;
  /** Lien ou pseudo Metamob. */
  metamob: string | null;
  /** Dernier statut choisi (dispo, absent, indispo). */
  statut?: "dispo" | "absent" | "indispo" | null;
  /** Dernier signe de vie du site (toutes les 5 minutes tant qu'il est ouvert). */
  vu_le?: string | null;
}

export interface Personnage {
  id: string;
  membre_id: string;
  nom: string;
  classe: string;
  niveau: number;
  alignement: Alignement;
  ordre: string | null;
  niveau_quete_alignement: number | null;
  /** Rang dans l'ordre (1 à 5), saisi par le membre. */
  rang_ordre: number | null;
  /** Dofus Ocre saisi à la main (quand Metamob ne répond pas ou n'est pas utilisé). */
  ocre_archis?: number | null;
  ocre_archis_total?: number | null;
  ocre_boss?: number | null;
  ocre_boss_total?: number | null;
  ocre_saisi_le?: string | null;
  /** Ancien suivi (« doplons dépensés ») : remplacé par le solde d'avitons ci-dessous. */
  doplons_depenses?: number | null;
  /** Avitons restants saisis par le membre, et date de la saisie (les avis livrés ensuite s'y ajoutent). */
  avitons_solde?: number | null;
  avitons_solde_le?: string | null;
  est_principal: boolean;
  image_url: string | null;
  maj_le: string;
}

export interface MetierMembre {
  membre_id: string;
  metier: string;
  niveau: number;
  maj_le: string;
}

export interface QueteTerminee {
  personnage_id: string;
  quete_id: string;
}

/** Un membre est dispo pour CE personnage si sa dispo court encore et le désigne. */
export type Statut = "dispo" | "absent" | "indispo";
export const STATUTS: { id: Statut; nom: string }[] = [
  { id: "dispo", nom: "Dispo" },
  { id: "absent", nom: "Absent" },
  { id: "indispo", nom: "Indispo" },
];
/** Sans signe de vie du site depuis ce délai, le membre est considéré hors ligne (aucune couleur). */
export const DELAI_HORS_LIGNE_MS = 15 * 60 * 1000;

type InfosStatut = Pick<Membre, "dispo_personnage_id"> & { statut?: Statut | null; vu_le?: string | null };

/**
 * Statut affiché pour un personnage : null s'il est hors ligne. « Dispo » vaut pour le personnage choisi
 * (ou tous, si aucun n'est choisi) ; « absent » et « indispo » concernent la personne, donc tous ses personnages.
 */
export function statutDe(membre: InfosStatut | undefined, persoId?: string): Statut | null {
  if (!membre?.vu_le || Date.now() - new Date(membre.vu_le).getTime() > DELAI_HORS_LIGNE_MS) return null;
  const s = membre.statut ?? "dispo";
  if (s === "dispo" && persoId && membre.dispo_personnage_id && membre.dispo_personnage_id !== persoId) return null;
  return s;
}

/** Dispo pour grouper (en ligne, statut « dispo », sur ce personnage). */
export function estDispo(membre: InfosStatut | undefined, persoId: string): boolean {
  return statutDe(membre, persoId) === "dispo";
}

/** « Je peux aider » : un personnage se positionne sur une étape de quête. */
export type AideEtape = {
  personnage_id: string;
  quete_id: string;
  note: string | null;
  cree_le: string;
};

/** Succès de donjon visé ou fait par un personnage. */
export type SuccesDonjon = {
  personnage_id: string;
  succes_id: string;
  statut: "vise" | "fait";
  maj_le: string;
};

/** Métier demandé par une annonce de quête (au moins un participant doit l'avoir à ce niveau). */
export type MetierRequis = { metier: string; niveau: number };

/** Ordre accepté par une recherche de groupe, avec son rang minimum (1 à 5). */
export type OrdreRequis = { ordre: string; rang: number };

/** Annonce de sortie : un donjon (8 places) ou une quête (places illimitées). */
export type Annonce = {
  id: string;
  auteur_id: string;
  titre: string;
  description: string | null;
  type: "donjon" | "quete";
  /** « ouvert » : tout le monde peut s'inscrire ; « prive » : seulement l'auteur et les invités. */
  visibilite: "ouvert" | "prive";
  /** Donjon : nombre de places, organisateur compris (2 à 8 ; 8 si vide). */
  places: number | null;
  date_prevue: string | null; // null = en attente, sans date
  donjon: string | null; // clé de la ligne du tableau des succès (« nom|boss »)
  succes: string[];
  quete_id: string | null;
  /** Nom saisi à la main quand la quête n'existe pas sur le site. */
  quete_nom: string | null;
  niveau_min: number | null;
  alignement_min: number | null;
  ordre_min: number | null;
  /** Ancien champ (un seul ordre) : repris dans `ordres`. */
  ordre: string | null;
  /** Ordres acceptés : l'inscrit doit faire partie de l'un d'eux, au rang minimum indiqué. */
  ordres: OrdreRequis[];
  metiers: MetierRequis[];
  annonce_discord_le: string | null;
  cree_le: string;
  maj_le: string;
};

export type ParticipantAnnonce = { annonce_id: string; personnage_id: string; cree_le: string };

/** Invitation d'un membre à une sortie, par l'auteur de l'annonce. */
export type InvitationAnnonce = {
  annonce_id: string;
  membre_id: string;
  invite_par: string;
  statut: "en_attente" | "acceptee" | "refusee";
  cree_le: string;
  repondu_le: string | null;
  discord_le: string | null;
};
