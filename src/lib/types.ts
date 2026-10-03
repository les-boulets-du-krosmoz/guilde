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
export function estDispo(membre: Pick<Membre, "dispo_jusqua" | "dispo_personnage_id"> | undefined, persoId: string): boolean {
  if (!membre?.dispo_jusqua || membre.dispo_personnage_id !== persoId) return false;
  return new Date(membre.dispo_jusqua).getTime() > Date.now();
}

/** « Je peux aider » : un personnage se positionne sur une étape de quête. */
export type AideEtape = {
  personnage_id: string;
  quete_id: string;
  note: string | null;
  cree_le: string;
};
