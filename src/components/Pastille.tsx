import { useState } from "react";
import { Link } from "react-router-dom";
import { initiales } from "../lib/image";
import type { Personnage } from "../lib/types";

const COULEURS = ["#4a6fa5", "#8a5a9e", "#a5714a", "#4a8f86", "#9e4a5f", "#6b7a3c"];

function couleurDe(nom: string): string {
  let h = 0;
  for (const c of nom) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return COULEURS[h % COULEURS.length];
}

type Props = {
  perso: Pick<Personnage, "id" | "nom" | "est_principal" | "image_url">;
  dispo?: boolean;
  taille?: number;
  lien?: boolean;
  infobulle?: string;
};

/** Cercle plein = personnage principal, pointillé = mule, halo vert = dispo pour grouper. */
export function Pastille({ perso, dispo = false, taille = 36, lien = true, infobulle }: Props) {
  const [imageCassee, setImageCassee] = useState(false);
  const titre =
    infobulle ?? `${perso.nom} · ${perso.est_principal ? "principal" : "mule"}${dispo ? " · dispo" : ""}`;
  const classes = ["pastille", perso.est_principal ? "" : "pastille--mule", dispo ? "pastille--dispo" : ""]
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
