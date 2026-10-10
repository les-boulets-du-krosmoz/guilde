import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fenêtre par-dessus la page : fermeture par Échap, par un clic à côté ou par le bouton ×,
 * le défilement de la page bloqué derrière, le focus placé dedans puis rendu à l'élément d'origine.
 * Sur téléphone, elle occupe tout l'écran.
 */
export function Fenetre({ titre, onFermer, children, large = false }: { titre: string; onFermer: () => void; children: ReactNode; large?: boolean }) {
  const boite = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const avant = document.activeElement as HTMLElement | null;
    const echap = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFermer();
      // Le clavier reste dans la fenêtre (Tab boucle sur ses éléments).
      if (e.key === "Tab" && boite.current) {
        const f = [...boite.current.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])")].filter((x) => !x.hasAttribute("disabled"));
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener("keydown", echap);
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    boite.current?.focus();
    return () => {
      document.removeEventListener("keydown", echap);
      document.body.style.overflow = defilement;
      avant?.focus();
    };
  }, [onFermer]);

  return (
    <div className="fenetre__fond" onMouseDown={(e) => { if (e.target === e.currentTarget) onFermer(); }}>
      <div className={`fenetre ${large ? "fenetre--large" : ""}`} role="dialog" aria-modal="true" aria-label={titre} ref={boite} tabIndex={-1}>
        <button type="button" className="fenetre__fermer" aria-label="Fermer" onClick={onFermer}>×</button>
        {children}
      </div>
    </div>
  );
}
