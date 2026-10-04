import type { Alignement } from "../lib/types";

// À vérifier en jeu : liste des 19 classes de Dofus 3.
export const CLASSES = [
  "Cra", "Ecaflip", "Eliotrope", "Eniripsa", "Enutrof", "Feca", "Forgelance", "Huppermage", "Iop",
  "Osamodas", "Ouginak", "Pandawa", "Roublard", "Sacrieur", "Sadida", "Sram", "Steamer", "Xélor", "Zobal",
];

export const ALIGNEMENTS: Alignement[] = ["Neutre", "Bonta", "Brâkmar"];

export const ORDRES: Record<Alignement, string[]> = {
  Neutre: [],
  Bonta: ["Cœur Vaillant", "Esprit Salvateur", "Œil Attentif"],
  Brâkmar: ["Cœur Saignant", "Esprit Malsain", "Œil Assassin"],
};

// À vérifier en jeu : métiers et spécialisations de forgemagie de Dofus 3.
export const METIERS_RECOLTE = ["Alchimiste", "Bûcheron", "Chasseur", "Mineur", "Paysan", "Pêcheur"];

/** Chaque métier de craft avec sa spécialisation de forgemagie, quand elle existe. */
export const METIERS_CRAFT: { craft: string; fm?: string }[] = [
  { craft: "Bijoutier", fm: "Joaillomage" },
  { craft: "Cordonnier", fm: "Cordomage" },
  { craft: "Façonneur", fm: "Façomage" },
  { craft: "Forgeron", fm: "Forgemage" },
  { craft: "Sculpteur", fm: "Sculptemage" },
  { craft: "Tailleur", fm: "Costumage" },
  { craft: "Bricoleur" },
];

export const METIERS_AUTRES = ["Éleveur"];

export const METIERS = [
  ...METIERS_RECOLTE,
  ...METIERS_CRAFT.flatMap((m) => (m.fm ? [m.craft, m.fm] : [m.craft])),
  ...METIERS_AUTRES,
];

export const DUREES_DISPO_H = [1, 2, 3];

/** Quête du Dofus Ocre : nombre total d'archimonstres et de boss à réunir (valeurs par défaut de la saisie à la main). */
export const OCRE_ARCHIS_TOTAL = 286;
export const OCRE_BOSS_TOTAL = 51;
