const JOUR = 24 * 60 * 60 * 1000;

export function joursDepuis(date: string): number {
  return Math.floor((Date.now() - new Date(date).getTime()) / JOUR);
}

export function ilYa(date: string): string {
  const j = joursDepuis(date);
  if (j <= 0) return "aujourd'hui";
  if (j === 1) return "hier";
  return `il y a ${j} j`;
}

/** Au-delà de ce seuil, un niveau est signalé comme peut-être obsolète. */
export const SEUIL_ANCIEN_JOURS = 60;
export const estAncien = (date: string) => joursDepuis(date) > SEUIL_ANCIEN_JOURS;

export function heure(date: string): string {
  return new Date(date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
