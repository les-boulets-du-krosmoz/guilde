import type { Dofus } from "../data/dofus";

type Props = { dofus: Dofus; date?: string; taille?: number };

/** Badge maison (aucune illustration Ankama) : un œuf aux couleurs du Dofus. */
export function Badge({ dofus, date, taille = 56 }: Props) {
  const quand = date ? new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : null;
  const titre = `Dofus ${dofus.nom} obtenu${quand ? ` le ${quand}` : ""}`;
  if (dofus.image) {
    return (
      <figure className="badge-dofus" title={titre}>
        <img src={dofus.image} alt={titre} width={taille} height={taille} loading="lazy" referrerPolicy="no-referrer" />
        <figcaption>{dofus.nom}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="badge-dofus" title={titre}>
      <svg width={taille} height={taille * 1.2} viewBox="0 0 50 60" role="img" aria-label={titre}>
        <path d="M25 3C13 3 5 22 5 36c0 12 9 21 20 21s20-9 20-21C45 22 37 3 25 3z" fill={dofus.couleur} stroke="var(--texte)" strokeWidth="2" />
        <path d="M16 18c3-6 6-8 9-8" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
        <path d="M14 44l7 6 15-15" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </svg>
      <figcaption>{dofus.nom}</figcaption>
    </figure>
  );
}
