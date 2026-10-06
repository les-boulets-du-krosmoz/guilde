import { useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";

/**
 * Place un menu déroulant sous son bouton, puis le ramène dans l'écran s'il dépasse
 * (fenêtre étroite, bouton au bord). Recalculé au redimensionnement et au défilement.
 */
export function usePlacementDansEcran(ouvert: boolean, ancre: RefObject<HTMLElement | null>, menu: RefObject<HTMLElement | null>): CSSProperties {
  const [place, setPlace] = useState<CSSProperties>({});
  useLayoutEffect(() => {
    if (!ouvert) return;
    const placer = () => {
      const b = ancre.current?.getBoundingClientRect();
      const l = menu.current;
      if (!b || !l) return;
      const marge = 8;
      const largeur = Math.min(l.offsetWidth, window.innerWidth - 2 * marge);
      const gauche = Math.min(Math.max(marge, b.right - largeur), window.innerWidth - largeur - marge);
      const haut = Math.min(b.bottom + 6, Math.max(marge, window.innerHeight - l.offsetHeight - marge));
      setPlace({ position: "fixed", left: gauche, top: haut, right: "auto", maxWidth: window.innerWidth - 2 * marge, maxHeight: window.innerHeight - haut - marge });
    };
    placer();
    window.addEventListener("resize", placer);
    window.addEventListener("scroll", placer, true);
    return () => { window.removeEventListener("resize", placer); window.removeEventListener("scroll", placer, true); };
  }, [ouvert, ancre, menu]);
  return place;
}
