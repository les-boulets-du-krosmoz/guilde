import { DOFUS, type Dofus, type Quete } from "./dofus";
import { SERIES_FRIGOST } from "./quetesFrigost";
import { TOUR_DU_MONDE, EMMA_TOM_POUCE } from "./quetesTourDuMonde";

/**
 * Catégories de la page des quêtes. Une série a la même forme qu'un Dofus (quêtes, sources, notes) ;
 * seules les séries de la catégorie « Dofus » comptent pour les badges, le tableau de bord et la progression.
 * Chaque série a son propre préfixe d'identifiant (ex. « frb- ») : il sert à charger ses quêtes terminées.
 */
export type Categorie = { id: string; nom: string; series: Dofus[]; estDofus: boolean };

export const CATEGORIES: Categorie[] = [
  { id: "dofus", nom: "Dofus", series: DOFUS, estDofus: true },
  { id: "frigost", nom: "Frigost", series: SERIES_FRIGOST, estDofus: false },
  { id: "tour-du-monde", nom: "Tour du monde", series: [TOUR_DU_MONDE], estDofus: false },
  { id: "emma-tom-pouce", nom: "Emma Tom Pouce", series: [EMMA_TOM_POUCE], estDofus: false },
];

export const TOUTES_LES_QUETES: Quete[] = CATEGORIES.flatMap((c) => c.series.flatMap((s) => s.quetes));

/** Série, catégorie et quête correspondant à un identifiant de quête. */
export function ouEstLaQuete(id: string): { categorie: Categorie; serie: Dofus; quete: Quete } | undefined {
  for (const categorie of CATEGORIES) {
    for (const serie of categorie.series) {
      const quete = serie.quetes.find((q) => q.id === id);
      if (quete) return { categorie, serie, quete };
    }
  }
  return undefined;
}

/** Une catégorie s'affiche dès qu'une de ses séries a des quêtes saisies. */
export function aDesQuetes(c: Categorie): boolean {
  return c.series.some((s) => s.quetes.length > 0);
}

/** Série (et sa catégorie) à partir de son identifiant, pour les liens ?dofus=… venus d'autres pages. */
export function trouverSerie(id: string | null): { categorie: Categorie; serie: Dofus } | undefined {
  for (const categorie of CATEGORIES) {
    const serie = categorie.series.find((s) => s.id === id && s.quetes.length > 0);
    if (serie) return { categorie, serie };
  }
  return undefined;
}
