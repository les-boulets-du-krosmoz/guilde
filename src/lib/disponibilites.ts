// Disponibilités habituelles : une semaine type de 7 jours × 4 tranches, une case = jour × 4 + tranche.

export const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
export const JOURS_COURTS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
/** Heures de chaque tranche, et l'heure proposée quand on crée une sortie sur ce créneau. */
export const TRANCHES = [
  { nom: "Matin", plage: "8 h – 12 h", heure: 10, minute: 0 },
  { nom: "Après-midi", plage: "12 h – 18 h", heure: 15, minute: 0 },
  { nom: "Soirée", plage: "18 h – 23 h", heure: 21, minute: 0 },
  { nom: "Nuit", plage: "23 h – 2 h", heure: 23, minute: 30 },
];
export const NB_CASES = 7 * TRANCHES.length;

export const caseDe = (jour: number, tranche: number) => jour * TRANCHES.length + tranche;
export const jourDe = (c: number) => Math.floor(c / TRANCHES.length);
export const trancheDe = (c: number) => c % TRANCHES.length;
export const libelleCase = (c: number) => `${JOURS[jourDe(c)]} ${TRANCHES[trancheDe(c)].nom.toLowerCase()}`;

/** Disponibilités par membre (cases cochées). */
export type Dispos = Map<string, Set<number>>;

/** Absence datée d'un membre (dates AAAA-MM-JJ, fin incluse). */
export type Absence = { id: string; membre_id: string; debut: string; fin: string; motif: string | null };

const jourIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Absence d'un membre à une date donnée (la nuit après minuit compte pour la veille). */
export function absenceLe(absences: Absence[], membreId: string, date: Date): Absence | undefined {
  const d = new Date(date);
  if (d.getHours() < 6) d.setDate(d.getDate() - 1);
  const j = jourIso(d);
  return absences.find((a) => a.membre_id === membreId && a.debut <= j && j <= a.fin);
}

/** Membres dispo sur une case : semaine type, moins les absents à la prochaine date de ce créneau. */
export const disposSur = (d: Dispos, c: number, parmi?: string[], absences: Absence[] = []) => {
  const date = prochaineDate(c);
  return [...d.entries()]
    .filter(([id, cases]) => cases.has(c) && (!parmi || parmi.includes(id)) && !absenceLe(absences, id, date))
    .map(([id]) => id);
};

/**
 * Meilleurs créneaux pour un groupe de membres : les cases où le plus d'entre eux sont dispo,
 * à égalité celles qui arrivent le plus tôt à partir de maintenant.
 */
export function meilleursCreneaux(d: Dispos, membres: string[], combien = 3, absences: Absence[] = []) {
  const maintenant = Date.now();
  return Array.from({ length: NB_CASES }, (_, c) => ({ c, dispo: disposSur(d, c, membres, absences), quand: prochaineDate(c).getTime() - maintenant }))
    .filter((x) => x.dispo.length > 0)
    .sort((a, b) => b.dispo.length - a.dispo.length || a.quand - b.quand)
    .slice(0, combien);
}

/** Prochaine date (heure locale) correspondant à une case, à l'heure proposée de sa tranche. */
export function prochaineDate(c: number, depuis = new Date()): Date {
  const t = TRANCHES[trancheDe(c)];
  const jourVoulu = jourDe(c); // 0 = lundi
  const d = new Date(depuis);
  d.setHours(t.heure, t.minute, 0, 0);
  const jourActuel = (depuis.getDay() + 6) % 7;
  let ecart = (jourVoulu - jourActuel + 7) % 7;
  if (ecart === 0 && d.getTime() <= depuis.getTime()) ecart = 7;
  d.setDate(d.getDate() + ecart);
  return d;
}

/** Valeur d'un champ datetime-local pour une date. */
export function versChampDate(d: Date): string {
  const z = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`;
}
