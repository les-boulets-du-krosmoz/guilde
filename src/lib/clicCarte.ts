import type { MouseEvent } from "react";

/**
 * Clic sur une carte (étape de quête, avis) : l'ouvre ou la replie, sauf si le clic vise un élément interactif
 * (case à cocher, bouton, lien, champ, bulle d'état) ou termine une sélection de texte.
 */
export function clicSurCarte(e: MouseEvent, action: () => void) {
  const cible = e.target as HTMLElement;
  if (cible.closest("input, button, a, select, textarea, label, [role='button'], [role='tooltip'], .etat")) return;
  if (window.getSelection()?.toString()) return;
  action();
}
