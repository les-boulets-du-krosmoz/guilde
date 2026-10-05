import { useState } from "react";
import { Link } from "react-router-dom";
import { initiales } from "../lib/image";
import { useStatuts } from "../lib/statuts";
import { statutDe, type Personnage, type Statut } from "../lib/types";

const COULEURS = ["#4a6fa5", "#8a5a9e", "#a5714a", "#4a8f86", "#9e4a5f", "#6b7a3c"];

function couleurDe(nom: string): string {
  let h = 0;
  for (const c of nom) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return COULEURS[h % COULEURS.length];
}

type Props = {
  perso: Pick<Personnage, "id" | "nom" | "est_principal" | "image_url"> & { membre_id?: string };
  /** Ancien indicateur « dispo » : ne sert plus que si le membre du personnage est inconnu. */
  dispo?: boolean;
  taille?: number;
  lien?: boolean;
  infobulle?: string;
};

const NOM_STATUT: Record<Statut, string> = { dispo: "dispo", absent: "absent", indispo: "indispo" };

/** Statut d'un personnage pour l'affichage, d'après le statut de son membre (mis à jour chaque minute). */
export function useStatutPerso(perso: { id: string; membre_id?: string }, repli = false): Statut | null {
  const { statuts } = useStatuts();
  if (perso.membre_id && statuts.size > 0) return statutDe(statuts.get(perso.membre_id), perso.id);
  return repli ? "dispo" : null;
}

/** Cercle plein = principal, pointillé = mule. Halo : vert dispo, orange absent, rouge indispo, aucun si hors ligne. */
export function Pastille({ perso, dispo = false, taille = 36, lien = true, infobulle }: Props) {
  const [imageCassee, setImageCassee] = useState(false);
  const statut = useStatutPerso(perso, dispo);
  const titre =
    infobulle ?? `${perso.nom} (${perso.est_principal ? "principal" : "mule"}${statut ? `, ${NOM_STATUT[statut]}` : ""})`;
  const classes = ["pastille", perso.est_principal ? "" : "pastille--mule", statut ? `pastille--${statut}` : ""]
    .filter(Boolean)
    .join(" ");
  const style = { width: taille, height: taille, background: couleurDe(perso.nom), fontSize: taille * 0.36 };

  const contenu =
    perso.image_url && !imageCassee ? (
      <img src={perso.image_url} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setImageCassee(true)} />
    ) : (
      <span aria-hidden="true">{initiales(perso.nom)}</span>
    );

  return lien ? (
    <Link to={`/perso/${perso.id}`} className={classes} style={style} title={titre} aria-label={titre}>
      {contenu}
    </Link>
  ) : (
    <span className={classes} style={style} title={titre} role="img" aria-label={titre}>
      {contenu}
    </span>
  );
}

/** Petite pastille suivie du nom cliquable : là où un personnage apparaît dans un texte ou une liste. */
export function NomAvecPastille({ perso, dispo = false, taille = 22, detail }: {
  perso: Pick<Personnage, "id" | "nom" | "est_principal" | "image_url"> & { membre_id?: string };
  dispo?: boolean;
  taille?: number;
  detail?: string;
}) {
  const statut = useStatutPerso(perso, dispo);
  return (
    <span className="nom-pastille">
      <Pastille perso={perso} dispo={dispo} taille={taille} />
      <Link to={`/perso/${perso.id}`} className={statut ? `statut-texte--${statut}` : undefined}>{perso.nom}</Link>
      {detail && <span className="discret">{detail}</span>}
    </span>
  );
}
