import type { ModeDaltonien, Police } from "./types";

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

// ---------- Police ----------

const CLE_POLICE = "affichage:police";

export const POLICES: { id: Police | null; nom: string; detail: string; famille: string }[] = [
  { id: null, nom: "Police du site", detail: "IBM Plex Sans pour le texte, Fraunces pour les titres.", famille: "\"IBM Plex Sans\", system-ui, sans-serif" },
  { id: "times", nom: "Times New Roman", detail: "Police classique à empattements, installée sur la plupart des ordinateurs.", famille: "\"Times New Roman\", Times, \"Liberation Serif\", serif" },
  { id: "epaisse", nom: "Atkinson Hyperlegible (épaisse)", detail: "Lettres plus épaisses et très distinctes, conçue pour faciliter la lecture.", famille: "\"Atkinson Hyperlegible\", system-ui, sans-serif" },
];

/** Charge la police à lettres épaisses (Google Fonts) seulement quand on en a besoin. */
export function chargerPoliceEpaisse() {
  if (document.getElementById("police-epaisse")) return;
  const lien = document.createElement("link");
  lien.id = "police-epaisse";
  lien.rel = "stylesheet";
  lien.href = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap";
  document.head.appendChild(lien);
}

export function appliquerPolice(police: Police | null | undefined) {
  const racine = document.documentElement;
  if (police === "epaisse") chargerPoliceEpaisse();
  if (police) racine.dataset.police = police;
  else delete racine.dataset.police;
  try { if (police) localStorage.setItem(CLE_POLICE, police); else localStorage.removeItem(CLE_POLICE); } catch { /* sans importance */ }
}

export function policeMemorisee(): Police | null {
  try { return (localStorage.getItem(CLE_POLICE) as Police | null) ?? null; } catch { return null; }
}
