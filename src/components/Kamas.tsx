import { useId } from "react";

/**
 * Symbole des kamas, la monnaie du jeu, redessiné en vectoriel (net à toutes les tailles) d'après l'icône du jeu :
 * un « K » vert-jaune barré de deux traits horizontaux, avec un fin contour sombre.
 */
export function SymboleKamas({ taille = "1em", titre = "kamas" }: { taille?: string | number; titre?: string }) {
  const id = `kamas-${useId().replace(/:/g, "")}`; // identifiant unique : plusieurs symboles sur une même page
  return (
    <svg className="kamas" width={taille} height={taille} viewBox="-1.5 -1.5 20 18" role="img" aria-label={titre}>
      <title>{titre}</title>
      {/* Contour d'abord (toutes les formes avec un trait sombre), puis le remplissage par-dessus : le contour entoure
          le symbole entier, sans traits sombres là où les barres croisent le K. */}
      <defs>
        <g id={id}>
          <rect x="0" y="4.6" width="17" height="2.4" rx="1" />
          <rect x="0" y="8" width="17" height="2.4" rx="1" />
          <path d="M4 0h3v15H4z" />
          <path d="M10.6 0h4L8.6 7.5 14.6 15h-4L6.6 9.6V5.4z" />
        </g>
      </defs>
      <use href={`#${id}`} fill="#1f2033" stroke="#1f2033" strokeWidth="1.6" strokeLinejoin="round" />
      <use href={`#${id}`} fill="#f0ff4f" />
    </svg>
  );
}

/** Un montant en kamas : « 1 200 000 » suivi du symbole. */
export function Kamas({ valeur, className }: { valeur: number; className?: string }) {
  return (
    <span className={`montant-kamas ${className ?? ""}`}>
      {valeur.toLocaleString("fr-FR")}
      <SymboleKamas />
    </span>
  );
}
