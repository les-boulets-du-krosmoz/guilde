// Icônes du jeu pour les types de sortie (servies par l'API dofusdude, comme celles des métiers) :
// une clef de donjon (Clef du Donjon des Squelettes) et un parchemin de quête.
// Images hébergées par le site (public/icones/objets), pour ne pas dépendre d'un service extérieur.
const IMG = (id: number) => `/icones/objets/${id}.webp`;
const ICONES = { donjon: 84228, quete: 24026 } as const;

export function IconeSortie({ type, taille = 20 }: { type: "donjon" | "quete"; taille?: number }) {
  return (
    <img
      className="icone-sortie"
      src={IMG(ICONES[type])}
      width={taille}
      height={taille}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
    />
  );
}
