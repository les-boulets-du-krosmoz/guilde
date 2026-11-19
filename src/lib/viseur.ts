// Calculs du viseur du Comte Harebourg : géométrie de la carte de combat, confusion horaire et ligne de vue.
// Carte de combat Dofus : 560 cases, 40 rangées de 14 en quinconce. Coordonnées logiques (i, j) : à l'écran,
// x = (i − j) × demi-largeur, y = (i + j) × demi-hauteur. Une rotation d'un quart de tour horaire à l'écran
// envoie le vecteur (a, b) sur (−b, a).

export const LARGEUR = 14;
export const RANGEES = 40;
export const NB_CASES = LARGEUR * RANGEES;

export type Point = { i: number; j: number };

export function coord(id: number): Point {
  const r = Math.floor(id / LARGEUR), c = id % LARGEUR;
  return { i: c + Math.ceil(r / 2), j: Math.floor(r / 2) - c };
}

/** Case aux coordonnées logiques (i, j), ou null si elle est hors de la carte. */
export function caseEn({ i, j }: Point): number | null {
  const r = i + j;
  if (r < 0 || r >= RANGEES) return null;
  const c = (i - j - (r & 1)) / 2;
  if (c < 0 || c >= LARGEUR) return null;
  return r * LARGEUR + c;
}

/** Tranches de PV du Comte (sort Comtoise, données 3.7) : déviation en quarts de tour horaires. */
export const TRANCHES = [
  { libelle: "90 % et +", quarts: 1 },
  { libelle: "75 à 89 %", quarts: 3 },
  { libelle: "45 à 74 %", quarts: 2 },
  { libelle: "30 à 44 %", quarts: 3 },
  { libelle: "Moins de 30 %", quarts: 1 },
];

export function nomDeviation(quarts: number): string {
  return ["aucune déviation", "¼ de tour horaire", "½ tour", "¼ de tour anti-horaire"][((quarts % 4) + 4) % 4];
}

const tourner = ({ i, j }: Point, quarts: number): Point => {
  let a = i, b = j;
  for (let k = 0; k < ((quarts % 4) + 4) % 4; k++) [a, b] = [-b, a];
  return { i: a, j: b };
};

/** Case à viser pour que le sort, dévié de « quarts » quarts de tour horaires autour du lanceur, arrive sur la cible. */
export function caseAViser(lanceur: number, cible: number, quarts: number): number | null {
  const p = coord(lanceur), m = coord(cible);
  const v = tourner({ i: m.i - p.i, j: m.j - p.j }, -quarts);
  return caseEn({ i: p.i + v.i, j: p.j + v.j });
}

/** Cases traversées entre deux cases, sans les extrémités. Prudent : un passage pile sur un coin compte les deux cases voisines. */
export function casesTraversees(de: number, vers: number): number[] {
  const a = coord(de), b = coord(vers);
  const ni = Math.abs(b.i - a.i), nj = Math.abs(b.j - a.j);
  const si = Math.sign(b.i - a.i), sj = Math.sign(b.j - a.j);
  const vues: Point[] = [];
  let i = a.i, j = a.j;
  // parcours exact des cases (carrés unité centrés sur les coordonnées entières) que coupe le segment centre à centre
  for (let pi = 0, pj = 0; pi < ni || pj < nj; ) {
    const choix = (1 + 2 * pi) * nj - (1 + 2 * pj) * ni;
    if (choix === 0) { vues.push({ i: i + si, j }, { i, j: j + sj }); i += si; j += sj; pi++; pj++; }
    else if (choix < 0) { i += si; pi++; }
    else { j += sj; pj++; }
    vues.push({ i, j });
  }
  const ids = vues.map(caseEn).filter((id): id is number => id !== null && id !== de && id !== vers);
  return [...new Set(ids)];
}

/** Première case qui bloque la ligne de vue entre deux cases, ou null si elle est libre. */
export function bloqueur(de: number, vers: number, bloquantes: Set<number>): number | null {
  return casesTraversees(de, vers).find((id) => bloquantes.has(id)) ?? null;
}

/** Position d'une case par rapport au lanceur, en mots, quand elle est en ligne ou en diagonale. */
export function direction(lanceur: number, cible: number): string | null {
  const p = coord(lanceur), m = coord(cible);
  const a = m.i - p.i, b = m.j - p.j;
  const n = Math.max(Math.abs(a), Math.abs(b));
  const cases = (k: number) => `${k} case${k > 1 ? "s" : ""}`;
  if (a === 0 && b < 0) return `${cases(n)} en haut à droite`;
  if (a > 0 && b === 0) return `${cases(n)} en bas à droite`;
  if (a === 0 && b > 0) return `${cases(n)} en bas à gauche`;
  if (a < 0 && b === 0) return `${cases(n)} en haut à gauche`;
  if (a === b && a > 0) return `${cases(n)} en diagonale vers le bas`;
  if (a === b && a < 0) return `${cases(n)} en diagonale vers le haut`;
  if (a === -b && a > 0) return `${cases(n)} en diagonale vers la droite`;
  if (a === -b && a < 0) return `${cases(n)} en diagonale vers la gauche`;
  return null;
}
