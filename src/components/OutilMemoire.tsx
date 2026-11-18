import { useEffect, useState } from "react";
import { CIBLE_OUTIL_MEMOIRE, compterVisite } from "../lib/visites";

// Outil du combat du Serment de l'ambre : le joueur reporte à la main ce qu'il voit en jeu sur une copie de la grille.
// Rien n'est lu dans le jeu. Les monstres changent de place à chaque combat : rien n'est placé d'avance.

const COLONNES = 14; // grille standard d'un combat Dofus : 14 × 40 demi-rangées = 560 cases en losange
const RANGEES = 40;
const L = 34; // largeur d'un losange
const H = L / 2;

type Marque = "occupee" | "malepik" | "malbois" | "maltrio" | "malzerb" | "liberee";
type Outil = Marque | "gomme";
const OUTILS: { id: Outil; nom: string; portrait?: string }[] = [
  { id: "occupee", nom: "Case occupée" },
  { id: "malepik", nom: "Malépik", portrait: "malter-malepik" },
  { id: "malbois", nom: "Malbois", portrait: "malter-malbois" },
  { id: "maltrio", nom: "Maltrio", portrait: "malter-maltrio" },
  { id: "malzerb", nom: "Malzerb", portrait: "malter-malzerb" },
  { id: "liberee", nom: "Case libérée" },
  { id: "gomme", nom: "Effacer" },
];
const NATURES = OUTILS.filter((o) => o.portrait) as { id: Marque; nom: string; portrait: string }[];
const CLE = "outil-serment-ambre";

// Carte « Prison d'ambre » [-3,19], relevée sur une capture du combat puis corrigée par un joueur : sol et blocs d'ambre.
// Les autres cases de la grille sont du vide.
const SOL = new Set<number>([103, 104, 105, 117, 118, 119, 120, 130, 131, 132, 133, 134, 144, 147, 149, 157, 158, 159, 160, 161, 162, 172, 173, 174, 175, 176, 177, 186, 187, 188, 190, 192, 202, 203, 204, 207, 211, 212, 214, 215, 216, 218, 221, 225, 226, 227, 229, 230, 231, 232, 238, 239, 240, 241, 243, 244, 245, 254, 255, 256, 266, 267, 268, 269, 275, 276, 277, 280, 281, 282, 284, 286, 287, 289, 291, 292, 294, 296, 297, 299, 301, 303, 304, 305, 308, 309, 311, 314, 315, 316, 318, 320, 321, 323, 324, 326, 327, 328, 329, 332, 333, 334, 336, 337, 338, 339, 341, 342, 344, 346, 347, 349, 350, 351, 353, 355, 356, 357, 359, 360, 361, 362, 364, 365, 366, 367, 370, 374, 375, 376, 377, 378, 379, 380, 384, 387, 389, 390, 393, 394, 402, 403, 405, 410, 413, 415, 416, 417, 418, 424, 426, 427, 428, 430, 431, 432, 433, 437, 438, 439, 440, 442, 444, 445, 446, 452, 453, 454, 455, 456, 457, 459, 465, 466, 467, 468, 469, 480, 482, 483, 485, 493, 494, 495, 496, 497, 498, 508, 509, 511, 512, 513, 522, 523, 524, 525, 526, 537, 538, 539, 540, 552]);
const MURS = new Set<number>([146, 148, 171, 184, 185, 199, 201, 217, 249, 253, 283, 290, 300, 306, 313, 322, 330, 343, 348, 352, 388, 425, 441, 484, 510]);
// Les 4 îlots où se cachent les monstres, 8 par îlot (noms vus depuis l'écran du jeu).
const ILOTS: { nom: string; cases: number[] }[] = [
  { nom: "Haut", cases: [103, 104, 105, 117, 118, 119, 120, 130, 131, 132, 133, 134, 144, 147, 149, 157, 158, 159, 160, 161, 162, 172, 173, 174, 175, 176, 177, 186, 187, 188, 190, 202, 203, 204, 214, 215, 216, 218, 229, 230, 231, 232, 243, 244, 245] },
  { nom: "Gauche", cases: [211, 212, 225, 226, 227, 238, 239, 240, 241, 254, 255, 256, 266, 267, 268, 269, 280, 281, 282, 284, 294, 296, 297, 308, 309, 311, 323, 324, 336, 337, 338, 339, 350, 351, 353, 364, 365, 366, 367, 378, 379, 380, 393, 394] },
  { nom: "Droite", cases: [275, 276, 277, 289, 291, 292, 303, 304, 305, 318, 320, 321, 332, 333, 334, 346, 347, 349, 359, 360, 361, 362, 374, 375, 376, 377, 387, 389, 390, 402, 403, 405, 415, 416, 417, 418, 430, 431, 432, 433, 444, 445, 446, 459] },
  { nom: "Bas", cases: [410, 413, 424, 426, 427, 428, 437, 438, 439, 440, 442, 452, 453, 454, 455, 456, 457, 465, 466, 467, 468, 469, 480, 482, 483, 485, 493, 494, 495, 496, 497, 498, 508, 509, 511, 512, 513, 522, 523, 524, 525, 526, 537, 538, 539, 540, 552] },
];
const MONSTRES_PAR_ILOT = 8;
const ILOT_DE = new Map(ILOTS.flatMap((il) => il.cases.map((c) => [c, il.nom] as const)));
const DEPART_JOUEUR = 328;
const DEPART_REINE = 207;
// Le personnage ne peut pas quitter l'îlot central. Positions de repérage calculées par simulation des lignes de vue
// (les blocs d'ambre bloquent la vue, le vide non), rangées pour repérer le plus de cases dès les premiers lancers.
const POSITIONS_REPERAGE: number[] = [384, 287, 326, 299, 316];
// Cases qu'aucune de ces positions ne voit : à révéler sans repérage.
const REPERAGE_INEFFICACE = new Set<number>([118, 120, 134, 157, 238, 268, 276, 277, 291, 308, 336, 349, 351, 375, 403, 498, 526, 538]);

function losange(id: number) {
  const r = Math.floor(id / COLONNES), c = id % COLONNES;
  const x = c * L + (r % 2 ? L / 2 : 0), y = r * (H / 2);
  return { cx: x + L / 2, cy: y + H / 2, points: `${x + L / 2},${y} ${x + L},${y + H / 2} ${x + L / 2},${y + H} ${x},${y + H / 2}` };
}

// Cadre de la carte : seulement la partie occupée par le terrain, pour des cases plus grandes.
const CADRE = (() => {
  const cases = [...SOL, ...MURS].map((id) => losange(id));
  const xs = cases.map((c) => c.cx), ys = cases.map((c) => c.cy);
  const x = Math.min(...xs) - L / 2 - 2, y = Math.min(...ys) - H / 2 - 2;
  return `${x} ${y} ${Math.max(...xs) + L / 2 + 2 - x} ${Math.max(...ys) + H / 2 + 2 - y}`;
})();

function lire(): Record<number, Marque> {
  try { return JSON.parse(localStorage.getItem(CLE) ?? "{}"); } catch { return {}; }
}

export function OutilMemoire() {
  const [cases, setCases] = useState<Record<number, Marque>>(lire);
  const [outil, setOutil] = useState<Outil>("occupee");

  useEffect(() => {
    try { localStorage.setItem(CLE, JSON.stringify(cases)); } catch { /* stockage indisponible : la carte vit le temps de la page */ }
  }, [cases]);

  // Raccourcis 1 à 7 pour changer de marque sans quitter le combat des yeux.
  useEffect(() => {
    const touche = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const i = Number(e.key) - 1;
      if (Number.isInteger(i) && i >= 0 && i < OUTILS.length) setOutil(OUTILS[i].id);
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, []);

  // Une marque posée sur une case déjà marquée la remplace.
  const poser = (id: number) => {
    if (outil !== "gomme") compterVisite(CIBLE_OUTIL_MEMOIRE); // l'outil sert vraiment dès la première marque
    setCases((c) => {
      const n = { ...c };
      if (outil === "gomme") delete n[id]; else n[id] = outil;
      return n;
    });
  };
  const compte = (m: Marque) => Object.values(cases).filter((x) => x === m).length;
  // Toute marque sur un îlot est un monstre trouvé (occupé, identifié ou déjà libéré).
  const trouves = (nom: string) => ILOTS.find((il) => il.nom === nom)!.cases.filter((c) => cases[c]).length;
  const complets = new Set(ILOTS.filter((il) => trouves(il.nom) >= MONSTRES_PAR_ILOT).map((il) => il.nom));
  const nouveauCombat = () => {
    if (Object.keys(cases).length && !window.confirm("Effacer toute la carte pour un nouveau combat ?")) return;
    setCases({});
  };

  return (
    <section className="outil-memoire" aria-label="Carte du combat">
      <h3>Carte du combat</h3>
      <p className="discret">Reportez ce que vous voyez en jeu : choisissez une marque (touches 1 à 7), puis cliquez sur la case. Les blocs d'ambre, qui servent de murs, sont en orange.</p>
      <div className="outil-memoire__palette" role="radiogroup" aria-label="Marque à poser">
        {OUTILS.map((o, i) => (
          <button key={o.id} type="button" role="radio" aria-checked={outil === o.id} className={`onglet${outil === o.id ? " onglet--actif" : ""}`} onClick={() => setOutil(o.id)}>
            <span className={`outil-memoire__pastille outil-memoire__pastille--${o.id}`} aria-hidden="true">
              {o.portrait && <img src={`/icones/monstres/${o.portrait}.webp`} alt="" width={22} height={22} />}
            </span>
            {o.nom}
            <kbd>{i + 1}</kbd>
          </button>
        ))}
      </div>
      <div className="outil-memoire__bilan">
        {NATURES.map((n) => {
          const k = compte(n.id);
          return (
            <span key={n.id} className={`outil-memoire__stock${k >= 2 ? " outil-memoire__stock--pret" : ""}`} title={n.nom}>
              <span className={`outil-memoire__pastille outil-memoire__pastille--${n.id}`} aria-hidden="true">
                <img src={`/icones/monstres/${n.portrait}.webp`} alt="" width={22} height={22} />
              </span>
              <span className="sr-only">{n.nom} : </span>{k} identifié{k > 1 ? "s" : ""}{k >= 2 && <strong>paire possible</strong>}
            </span>
          );
        })}
        <span className="outil-memoire__stock">Libérées : {compte("liberee")} / 32</span>
      </div>
      <div className="outil-memoire__ilots" aria-label="Monstres trouvés par îlot">
        {ILOTS.map((il) => {
          const k = trouves(il.nom);
          const etat = k > MONSTRES_PAR_ILOT ? " outil-memoire__ilot--trop" : k === MONSTRES_PAR_ILOT ? " outil-memoire__ilot--complet" : "";
          return (
            <span key={il.nom} className={`outil-memoire__ilot${etat}`} title={k > MONSTRES_PAR_ILOT ? "Plus de 8 marques : une erreur s'est glissée" : undefined}>
              Îlot {il.nom.toLowerCase()} <strong>{k} / {MONSTRES_PAR_ILOT}</strong>
            </span>
          );
        })}
        <button type="button" className="bouton bouton--petit" onClick={nouveauCombat}>Nouveau combat</button>
      </div>
      <div className="outil-memoire__carte">
        <svg viewBox={CADRE} role="img" aria-label="Carte du combat, une case par losange">
          {[...MURS].map((id) => <polygon key={`m${id}`} points={losange(id).points} className="case__mur" />)}
          {Array.from({ length: COLONNES * RANGEES }, (_, id) => {
            if (!SOL.has(id)) return null;
            const { points, cx, cy } = losange(id);
            const m = cases[id];
            return (
              <g key={id} data-case={id} onClick={() => poser(id)}
                className={`case${m ? ` case--${m}` : ""}${REPERAGE_INEFFICACE.has(id) ? " case--inefficace" : ""}${!m && complets.has(ILOT_DE.get(id) ?? "") ? " case--vide" : ""}`}>
                <polygon points={points} />
                {m === "occupee" && <circle cx={cx} cy={cy} r={3} />}
                {m === "liberee" && <path d={`M${cx - 4},${cy} l3,3 l6,-6`} />}
              </g>
            );
          })}
          {POSITIONS_REPERAGE.map((id, i) => {
            const { cx, cy } = losange(id);
            return (
              <g key={`p${id}`} className="case__reperage">
                <circle cx={cx} cy={cy} r={6.5} />
                <text x={cx} y={cy + 2.6}>{i + 1}</text>
              </g>
            );
          })}
          {[[DEPART_JOUEUR, "J"], [DEPART_REINE, "R"]].map(([id, lettre]) => {
            const { cx, cy } = losange(Number(id));
            return <text key={`d${id}`} x={cx} y={cy + 2.6} className="case__depart">{lettre}</text>;
          })}
        </svg>
      </div>
      <p className="discret outil-memoire__legende">
        1 à 5 : où lancer le repérage, dans l'ordre. Pointillés : cases qu'aucune position ne voit. Cases assombries : îlot complet, elles sont vides. J : votre départ. R : départ de la Reine.
      </p>
    </section>
  );
}
