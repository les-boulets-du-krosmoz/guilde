import { useId } from "react";

/**
 * Défi spécial d'un boss : orange tant qu'il n'est pas fait (un défi pas fait est un défi qu'on souhaite faire),
 * vert une fois fait. Au survol, une bulle donne la description et qui l'a déjà réussi.
 */
export function BoutonDefi({ libelle, description, fait, faitPar = [], modifiable, onBasculer }: {
  libelle?: string;
  description: string;
  fait: boolean;
  faitPar?: string[];
  modifiable: boolean;
  onBasculer: () => void;
}) {
  const id = useId();
  return (
    <button type="button" className={`succes ${fait ? "succes--fait" : "succes--afaire"}`} onClick={onBasculer} disabled={!modifiable} aria-describedby={id}>
      {fait ? "✓ " : ""}{libelle ?? (fait ? "Fait" : "À faire")}
      {faitPar.length > 0 && !libelle && <span className="succes__nb" aria-label={`réussi par ${faitPar.length}`}>✓ {faitPar.length}</span>}
      <span role="tooltip" id={id} className="etat__bulle">
        {description}
        {faitPar.length > 0 && <><br /><span className="discret">Réussi par : {faitPar.join(", ")}</span></>}
        {modifiable && <><br /><span className="discret">Clic : {fait ? "remettre à faire" : "marquer comme fait"}</span></>}
      </span>
    </button>
  );
}
