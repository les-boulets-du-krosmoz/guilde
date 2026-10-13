import { QUETES_JEU } from "./quetesJeu";
import { DOFUS, type Dofus, type Quete } from "./dofus";
import { SERIES_FRIGOST } from "./quetesFrigost";
import { TOUR_DU_MONDE, EMMA_TOM_POUCE } from "./quetesTourDuMonde";

/**
 * Catégories de la page des quêtes. Une série a la même forme qu'un Dofus (quêtes, sources, notes) ;
 * seules les séries de la catégorie « Dofus » comptent pour les badges, le tableau de bord et la progression.
 * Chaque série a son propre préfixe d'identifiant (ex. « frb- ») : il sert à charger ses quêtes terminées.
 */
export type Categorie = { id: string; nom: string; series: Dofus[]; estDofus: boolean };

const AVERT_ALIGN = "Quêtes, combats et objets tirés des données du jeu. Par défaut, seules les quêtes où l'aide d'un membre est utile (combat de groupe, objet à crafter) sont affichées.";
const serieAlign = (id: string, nom: string, groupe: string, couleur: string, succes: string): Dofus => ({
  id, nom, groupe, couleur, succes, quetes: QUETES_JEU[id] ?? [], avertissement: AVERT_ALIGN,
  filtreAide: (QUETES_JEU[id] ?? []).length > 10, // les chaînes des camps (100 quêtes), pas les apprentissages d'ordre
});

// Frigost : les autres quêtes de l'île, rangées par succès (hors celles du Dofus des Glaces).
export const QUETES_FRIGOST: Dofus = {
  id: "frigost-quetes", nom: "Quêtes de Frigost", succes: "", couleur: "#9cc7e0", quetes: QUETES_JEU["frigost-quetes"] ?? [], filtreAide: true,
  avertissement: "Quêtes de l'île tirées des données du jeu et rangées par succès ; celles du Dofus des Glaces sont dans sa page. Par défaut, seules les quêtes où l'aide d'un membre est utile s'affichent.",
};
// Alignement : la chaîne de chaque camp (une quête par niveau d'alignement), puis les apprentissages de chaque ordre.
export const SERIES_ALIGNEMENT: Dofus[] = [
  serieAlign("align-bonta", "Bonta", "Bonta", "#4f8fd6", "Alignement bontarien"),
  serieAlign("align-coeur-vaillant", "Cœur Vaillant", "Bonta", "#4f8fd6", "Ordre du Cœur Vaillant"),
  serieAlign("align-esprit-salvateur", "Esprit Salvateur", "Bonta", "#4f8fd6", "Ordre de l'Esprit Salvateur"),
  serieAlign("align-oeil-attentif", "Œil Attentif", "Bonta", "#4f8fd6", "Ordre de l'Œil Attentif"),
  serieAlign("align-brakmar", "Brâkmar", "Brâkmar", "#c24a4a", "Alignement brâkmarien"),
  serieAlign("align-coeur-saignant", "Cœur Saignant", "Brâkmar", "#c24a4a", "Ordre du Cœur Saignant"),
  serieAlign("align-esprit-malsain", "Esprit Malsain", "Brâkmar", "#c24a4a", "Ordre de l'Esprit Malsain"),
  serieAlign("align-oeil-assassin", "Œil Assassin", "Brâkmar", "#c24a4a", "Ordre de l'Œil Assassin"),
];

export const CATEGORIES: Categorie[] = [
  { id: "dofus", nom: "Dofus", series: DOFUS, estDofus: true },
  { id: "frigost", nom: "Frigost", series: [...SERIES_FRIGOST, QUETES_FRIGOST], estDofus: false },
  { id: "tour-du-monde", nom: "Tour du monde", series: [TOUR_DU_MONDE], estDofus: false },
  { id: "emma-tom-pouce", nom: "Emma Tom Pouce", series: [EMMA_TOM_POUCE], estDofus: false },
  { id: "alignement", nom: "Alignement", series: SERIES_ALIGNEMENT, estDofus: false },
  // Pas de série : la page affiche le tableau des succès de donjon (voir components/TableauSucces.tsx).
  { id: "succes", nom: "Donjons", series: [], estDofus: false },
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
  return c.id === "succes" || c.series.some((s) => s.quetes.length > 0);
}

/** Série (et sa catégorie) à partir de son identifiant, pour les liens ?dofus=… venus d'autres pages. */
export function trouverSerie(id: string | null): { categorie: Categorie; serie: Dofus } | undefined {
  for (const categorie of CATEGORIES) {
    const serie = categorie.series.find((s) => s.id === id && s.quetes.length > 0);
    if (serie) return { categorie, serie };
  }
  return undefined;
}
