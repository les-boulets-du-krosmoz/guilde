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
