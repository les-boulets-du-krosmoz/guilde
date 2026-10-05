import { useId, type CSSProperties } from "react";

/**
 * Succès : rouge avec ✗ tant qu'il n'est pas obtenu, vert avec ✓ une fois obtenu. Au survol, une bulle donne la description et qui l'a déjà réussi.
 */
export function BoutonDefi({ libelle, description, points, icone, image, fait, faitPar = [], modifiable, onBasculer }: {
  libelle?: string;
  description: string;
  points?: number;
  /** Numéro de l'icône du challenge (public/icones/challenges/), teintée en orange ou vert selon l'état. */
  icone?: number;
  /** Image affichée telle quelle quand il n'y a pas d'icône de challenge (ex. victoire simple : portrait du donjon). */
  image?: string;
  fait: boolean;
  faitPar?: string[];
  modifiable: boolean;
  onBasculer: () => void;
}) {
  const id = useId();
  return (
    <button type="button" className={`succes ${fait ? "succes--fait" : "succes--afaire"}`} onClick={onBasculer} disabled={!modifiable} aria-describedby={id}>
      {icone ? (
        <span className="succes__icone" style={{ "--icone": `url(/icones/challenges/${icone}.webp)` } as CSSProperties} aria-hidden="true" />
      ) : image ? (
        <img className="succes__image" src={image} alt="" />
      ) : null}
      {/* Un symbole dans les deux états : le bouton garde la même largeur quand on clique. */}
      <span className="succes__etat" aria-hidden="true">{fait ? "✓" : "✗"}</span>
      {libelle ?? (fait ? "Fait" : "À faire")}
      {faitPar.length > 0 && <span className="succes__nb" aria-label={`réussi par ${faitPar.length}`}>✓ {faitPar.length}</span>}
      <span role="tooltip" id={id} className="etat__bulle">
        {description}
        {points !== undefined && <><br /><span className="discret">{points} points de succès</span></>}
        {faitPar.length > 0 && <><br /><span className="discret">Réussi par : {faitPar.join(", ")}</span></>}
        {modifiable && <><br /><span className="discret">Clic : {fait ? "remettre à faire" : "marquer comme fait"}</span></>}
      </span>
    </button>
  );
}
