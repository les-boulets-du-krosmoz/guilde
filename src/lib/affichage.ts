import type { ModeDaltonien } from "./types";

const CLE = "affichage:daltonien";

export const MODES_DALTONIENS: { id: ModeDaltonien | null; nom: string; detail: string }[] = [
  { id: null, nom: "Couleurs habituelles", detail: "Vert, orange, rouge et violet." },
  { id: "deuteranopie", nom: "Deutéranopie", detail: "Le vert se confond avec le rouge (la forme la plus courante)." },
  { id: "protanopie", nom: "Protanopie", detail: "Le rouge paraît sombre et se confond avec le vert." },
  { id: "tritanopie", nom: "Tritanopie", detail: "Les jaunes sont difficiles à distinguer (ils se confondent avec le blanc ou le rose), le bleu avec le vert. Le doré du site est remplacé par du rose." },
];

/** Applique un mode (ou les couleurs habituelles) à tout le site, et le garde pour la prochaine ouverture. */
export function appliquerModeDaltonien(mode: ModeDaltonien | null | undefined) {
  const racine = document.documentElement;
  if (mode) racine.dataset.daltonien = mode;
  else delete racine.dataset.daltonien;
  try { if (mode) localStorage.setItem(CLE, mode); else localStorage.removeItem(CLE); } catch { /* sans importance */ }
}

/** Au démarrage : le dernier mode choisi sur cet appareil, avant même que le compte soit chargé. */
export function modeDaltonienMemorise(): ModeDaltonien | null {
  try { return (localStorage.getItem(CLE) as ModeDaltonien | null) ?? null; } catch { return null; }
}
