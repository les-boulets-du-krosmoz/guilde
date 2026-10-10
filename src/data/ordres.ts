// Ordres d'alignement et leurs 5 rangs (noms et alignement requis tirés des données du jeu, alignment_ranks).
// Les noms d'ordres sont ceux de la fiche de personnage (src/data/constantes.ts).

export type Camp = "Bonta" | "Brâkmar";
export type Ordre = { nom: string; camp: Camp; court: string; rangs: { nom: string; alignement: number }[] };

const r = (...noms: string[]) => noms.map((nom, i) => ({ nom, alignement: (i + 1) * 20 }));

export const ORDRES_DETAIL: Ordre[] = [
  { nom: "Œil Attentif", camp: "Bonta", court: "Œil", rangs: r("Disciple de Silvosse", "Espion Silencieux", "Chasseur de Renégats", "Assassin Suprême", "Maître des Illusions") },
  { nom: "Cœur Vaillant", camp: "Bonta", court: "Cœur", rangs: r("Disciple de Menalt", "Écuyer", "Chevalier de l'Espoir", "Champion Merveilleux", "Héros Légendaire") },
  { nom: "Esprit Salvateur", camp: "Bonta", court: "Esprit", rangs: r("Disciple de Jiva", "Apprenti Éclairé", "Adepte des Écrits", "Maître des Parchemins", "Gardien du Savoir") },
  { nom: "Œil Assassin", camp: "Brâkmar", court: "Œil", rangs: r("Disciple de Brumaire", "Espion Sombre", "Chasseur d'Âmes", "Psychopathe", "Maître des Ombres") },
  { nom: "Cœur Saignant", camp: "Brâkmar", court: "Cœur", rangs: r("Disciple de Djaul", "Surineur", "Chevalier du Désespoir", "Champion du Chaos", "Héros de l'Apocalypse") },
  { nom: "Esprit Malsain", camp: "Brâkmar", court: "Esprit", rangs: r("Disciple d'Hécate", "Apprenti Sombre", "Adepte des Douleurs", "Maître des Sévices", "Gardien des Tortures") },
];

export const ordreParNom = (nom: string | null | undefined) => ORDRES_DETAIL.find((o) => o.nom === nom);

/** « Œil 2 — Espion Silencieux » */
export const libelleRang = (o: Ordre, rang: number) => `${o.court} ${rang} — ${o.rangs[rang - 1]?.nom ?? ""}`;
