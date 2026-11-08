/**
 * Icône du type de sortie, redessinée en vectoriel d'après l'icône du jeu : un carré bleu nuit aux coins arrondis,
 * avec un crâne cornu lavande pour un donjon, ou un « ! » de la même couleur pour une quête.
 */
export function IconeTypeSortie({ type, taille = 20 }: { type: "donjon" | "quete"; taille?: number }) {
  const titre = type === "donjon" ? "Donjon" : "Quête";
  return (
    <svg className="icone-type-sortie" width={taille} height={taille} viewBox="0 0 24 24" role="img" aria-label={titre}>
      <title>{titre}</title>
      <rect x="1" y="1" width="22" height="22" rx="4.5" fill="#2c2f4d" stroke="#454866" strokeWidth="1" />
      {type === "donjon" ? (
        <g fill="#b6b3e6">
          {/* cornes */}
          <path d="M5.6 4.8 9.2 8.6 7 11.2 5.4 9.6z" />
          <path d="M18.4 4.8 14.8 8.6 17 11.2 18.6 9.6z" />
          {/* crâne et mâchoire */}
          <path d="M12 6.6c3.6 0 6 2.3 6 5.3 0 2-1.1 3.4-2.6 4.1v2.2H8.6V16c-1.5-.7-2.6-2.1-2.6-4.1 0-3 2.4-5.3 6-5.3z" />
          {/* orbites */}
          <rect x="8.3" y="10.6" width="2.9" height="2.4" rx=".5" fill="#2c2f4d" />
          <rect x="12.8" y="10.6" width="2.9" height="2.4" rx=".5" fill="#2c2f4d" />
        </g>
      ) : (
        <g fill="#b6b3e6">
          <rect x="10.4" y="5" width="3.2" height="9.6" rx="1.6" />
          <circle cx="12" cy="17.9" r="1.8" />
        </g>
      )}
    </svg>
  );
}
