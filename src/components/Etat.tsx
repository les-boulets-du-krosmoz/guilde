import { useId } from "react";
import { decouperEtats } from "../data/etats";

/** Mot souligné en pointillés ; sa définition s'affiche au survol, au focus clavier ou au toucher. */
export function Etat({ texte, definition, className = "" }: { texte: string; definition: string; className?: string }) {
  const id = useId();
  return (
    <span className={`etat ${className}`} tabIndex={0} aria-describedby={id}>
      {texte}
      <span role="tooltip" id={id} className="etat__bulle">{definition}</span>
    </span>
  );
}

/** Marque à écrire dans un texte de fiche pour signaler une information non vérifiée en jeu. */
const A_CONFIRMER = "(à confirmer)";

/** Texte où chaque état de combat reconnu reçoit son infobulle ; une ligne marquée « (à confirmer) » change de couleur. */
export function TexteEtats({ texte }: { texte: string }) {
  const morceaux = decouperEtats(texte).map((m, i) =>
    typeof m === "string" ? m : <Etat key={i} texte={m.texte} definition={m.etat.definition} />,
  );
  if (!texte.includes(A_CONFIRMER)) return <>{morceaux}</>;
  return <span className="a-confirmer" title="Information à vérifier en jeu">{morceaux}</span>;
}
