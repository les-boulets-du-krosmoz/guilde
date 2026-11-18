/** Marque à écrire juste après le nom d'un monstre, dans les textes des guides de boss : il peut tuer d'un coup. */
export const MARQUE_OS = "{os}";

/** Tête de mort dessinée en vectoriel (nette à toutes les tailles) : signale un monstre qui peut tuer d'un coup. */
export function TeteDeMort({ taille = "1em", titre = "Peut tuer d'un coup" }: { taille?: string | number; titre?: string }) {
  return (
    <svg className="tete-de-mort" width={taille} height={taille} viewBox="0 0 16 16" role="img" aria-label={titre}>
      <title>{titre}</title>
      <path
        d="M8 1.2C4.5 1.2 2 3.6 2 6.8c0 1.9.9 3.3 2.2 4.1V13c0 .6.4 1 1 1h5.6c.6 0 1-.4 1-1v-2.1c1.3-.8 2.2-2.2 2.2-4.1 0-3.2-2.5-5.6-6-5.6z"
        fill="#ece6d8" stroke="#1f2033" strokeWidth="1.1" strokeLinejoin="round"
      />
      <circle cx="5.7" cy="7.3" r="1.55" fill="#1f2033" />
      <circle cx="10.3" cy="7.3" r="1.55" fill="#1f2033" />
      <path d="M8 9.3l-.9 1.5h1.8z" fill="#1f2033" />
      <path d="M6.6 12.1v1.7M8 12.1v1.7M9.4 12.1v1.7" stroke="#1f2033" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

/** Texte d'un guide où chaque marque « {os} » devient une tête de mort. */
export function TexteGuide({ texte }: { texte: string }) {
  const morceaux = texte.split(MARQUE_OS);
  if (morceaux.length === 1) return <>{texte}</>;
  return <>{morceaux.flatMap((m, i) => (i === 0 ? [m] : [<TeteDeMort key={i} />, m]))}</>;
}
