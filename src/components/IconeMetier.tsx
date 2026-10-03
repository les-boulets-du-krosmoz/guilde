import { useState } from "react";
import { METIERS_CRAFT, METIERS_RECOLTE } from "../data/constantes";

// Icônes du jeu (servies par l'API dofusdude) : l'objet ou la ressource emblématique de chaque métier.
// Les images restent hébergées par dofusdude ; si l'une ne charge pas, on affiche le pictogramme dessiné ci-dessous.
const IMG = (id: number, px: 64 | 128) => `https://api.dofusdu.de/dofus3/v1/img/item/${id}-${px}.png`;
const ICONES: Record<string, number> = {
  Alchimiste: 12003, // Potion de Soin
  Bûcheron: 38017, // Bois de Frêne
  Chasseur: 63483, // Viande Tendre
  Mineur: 39024, // Fer
  Paysan: 34009, // Blé
  Pêcheur: 41294, // Goujon
  Bijoutier: 1048, // Amulette du Bouftou
  Cordonnier: 11003, // Bottes du Bouftou
  Façonneur: 82004, // Bouclier du Bûcheron
  Forgeron: 7023, // Marteau du Bouftou
  Sculpteur: 2022, // Arc en Corne de Bouftou
  Tailleur: 17017, // Cape du Vampire (plus lisible que les capes brunes sur le fond doré)
  Bricoleur: 84009, // Clef des Pitons Rocheux des Craqueleurs
  Éleveur: 97043, // Dragodinde Dorée et Émeraude
};

// Pictogrammes originaux (traits, grille 24 × 24) : l'outil ou l'objet emblématique de chaque métier.
const DESSINS: Record<string, string> = {
  Alchimiste: "M9 3h6 M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3 M7 15h10",
  Bûcheron: "M5 21L15 11 M13 4c4 0 7 3 7 7l-4 1-4-4z",
  Chasseur: "M4 20l8-8 M12 12l7-8c1 4-1 8-4 10z M6 16l2 2",
  Mineur: "M4 9c4-5 12-5 16 0 M12 6L6 21",
  Paysan: "M12 21V8 M12 8C9 7 8 5 8 3c3 0 4 2 4 5z M12 8c3-1 4-3 4-5-3 0-4 2-4 5z M12 14c-3-1-4-3-4-5 3 0 4 2 4 5z M12 14c3-1 4-3 4-5-3 0-4 2-4 5z",
  Pêcheur: "M3 12c3-4 9-6 14 0-5 6-11 4-14 0z M17 12l4-3v6z M8 11.5h.5",
  Bijoutier: "M12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M9 4h6l-3 5z",
  Cordonnier: "M7 3v11l-3 3v3h16v-2c0-2-2-3-5-3l-2-1V3z M7 8h6",
  Façonneur: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z M12 7v10",
  Forgeron: "M4 7h11c1 2 3 3 5 3v2h-5v2l2 4H7l2-4v-2H6a2 2 0 0 1-2-2z",
  Sculpteur: "M7 3c8 4 8 14 0 18 M7 3v18 M4 12h12 M14 10l2 2-2 2",
  Tailleur: "M5 19L19 5 M17 3l4 4 M5 19c-2 0-2-3 0-3s3 2 6 1",
  Bricoleur: "M14 7a4 4 0 0 1 5-3l-3 3 1 3 3 1 3-3a4 4 0 0 1-5 5l-8 8a2 2 0 0 1-3-3z",
  Éleveur: "M7 20v-9a5 5 0 0 1 10 0v9 M5 20h4 M15 20h4 M9 11h.5 M15 11h.5",
};

const ETINCELLE = "M19 1.5l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1z";

const CATEGORIES = {
  recolte: { fond: "#1f3a2c", trait: "#8fe0b3" },
  craft: { fond: "#3a2f1c", trait: "#f3cf85" },
  fm: { fond: "#33223d", trait: "#d4a6f0" },
  autre: { fond: "#1f2c3d", trait: "#a9cdf2" },
};

/** `base` : le métier dont on reprend l'image (la forgemagie reprend celle de son métier de craft). */
function decrire(metier: string): { base: string; categorie: keyof typeof CATEGORIES; fm: boolean } {
  if (METIERS_RECOLTE.includes(metier)) return { base: metier, categorie: "recolte", fm: false };
  if (METIERS_CRAFT.some((m) => m.craft === metier)) return { base: metier, categorie: "craft", fm: false };
  const fm = METIERS_CRAFT.find((m) => m.fm === metier);
  if (fm) return { base: fm.craft, categorie: "fm", fm: true };
  return { base: metier, categorie: "autre", fm: false };
}

export function IconeMetier({ metier, taille = 36 }: { metier: string; taille?: number }) {
  const { base, categorie, fm } = decrire(metier);
  const c = CATEGORIES[categorie];
  const id = ICONES[base];
  const [enEchec, setEnEchec] = useState(false);
  const dessin = DESSINS[base];

  return (
    <span className="icone-metier" style={{ width: taille, height: taille, background: c.fond }} aria-hidden="true">
      {id && !enEchec ? (
        <img
          src={IMG(id, taille > 48 ? 128 : 64)}
          srcSet={`${IMG(id, 64)} 1x, ${IMG(id, 128)} 2x`}
          alt=""
          loading="lazy"
          onError={() => setEnEchec(true)}
        />
      ) : (
        <svg width={taille * 0.62} height={taille * 0.62} viewBox="0 0 24 24" fill="none" stroke={c.trait}
          strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          {dessin ? <path d={dessin} /> : <circle cx="12" cy="12" r="6" />}
        </svg>
      )}
      {fm && (
        // Forgemagie : même image que le métier de craft, avec une étincelle dans le coin.
        <svg className="icone-metier__fm" viewBox="14 0 10 10" width={taille * 0.42} height={taille * 0.42}>
          <path d={ETINCELLE} fill={c.trait} />
        </svg>
      )}
    </span>
  );
}
