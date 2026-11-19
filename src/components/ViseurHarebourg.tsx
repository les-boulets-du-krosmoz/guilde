import { useMemo, useState } from "react";
import { NB_CASES, LARGEUR, TRANCHES, nomDeviation, caseAViser, bloqueur, direction } from "../lib/viseur";

// Viseur du Comte Harebourg : on place son personnage, les monstres, les murs et les alliés, on choisit sa tranche de PV,
// et la case à viser s'allume. La ligne de vue doit être libre jusqu'à la case visée et jusqu'à la case d'arrivée.

type Outil = "vous" | "monstre" | "mur" | "allie" | "gomme";
const OUTILS: { id: Outil; libelle: string }[] = [
  { id: "vous", libelle: "Vous" },
  { id: "monstre", libelle: "Monstre" },
  { id: "mur", libelle: "Mur" },
  { id: "allie", libelle: "Allié" },
  { id: "gomme", libelle: "Gomme" },
];

const W = 40, H = 20;
const centre = (id: number) => {
  const r = Math.floor(id / LARGEUR), c = id % LARGEUR;
  return { x: c * W + (r % 2 ? W : W / 2), y: r * (H / 2) + H / 2 };
};
const losange = (id: number) => {
  const { x, y } = centre(id);
  return `M${x} ${y - H / 2}L${x + W / 2} ${y}L${x} ${y + H / 2}L${x - W / 2} ${y}Z`;
};
const CASES = Array.from({ length: NB_CASES }, (_, id) => id);

export default function ViseurHarebourg() {
  const [vous, setVous] = useState(286);
  const [monstres, setMonstres] = useState<number[]>([]);
  const [cible, setCible] = useState<number | null>(null);
  const [murs, setMurs] = useState<Set<number>>(new Set());
  const [allies, setAllies] = useState<Set<number>>(new Set());
  const [outil, setOutil] = useState<Outil>("monstre");
  const [tranche, setTranche] = useState(0);
  const [cac, setCac] = useState(0);

  const quarts = TRANCHES[tranche].quarts + cac;
  const sans = (s: Set<number>, id: number) => { const n = new Set(s); n.delete(id); return n; };
  const avec = (s: Set<number>, id: number) => new Set(s).add(id);

  const vider = (id: number) => {
    setMonstres((m) => m.filter((x) => x !== id));
    if (cible === id) setCible(null);
    setMurs((s) => sans(s, id));
    setAllies((s) => sans(s, id));
  };

  const cliquer = (id: number) => {
    if (outil !== "gomme" && monstres.includes(id)) { setCible(id); return; }
    if (outil === "gomme") { if (id !== vous) vider(id); return; }
    if (id === vous) return;
    if (outil === "vous") { vider(id); setVous(id); return; }
    vider(id);
    if (outil === "monstre") { setMonstres((m) => [...m, id]); setCible(id); }
    if (outil === "mur") setMurs((s) => avec(s, id));
    if (outil === "allie") setAllies((s) => avec(s, id));
  };

  const resultat = useMemo(() => {
    if (cible === null) return null;
    const viser = caseAViser(vous, cible, quarts);
    // murs, alliés et autres monstres coupent la ligne de vue ; la case de départ et celle d'arrivée ne comptent pas
    const bloquantes = new Set([...murs, ...allies, ...monstres]);
    const problemes: string[] = [];
    if (viser === null) problemes.push("La case à viser est hors de la carte : changez de position.");
    else {
      if (murs.has(viser)) problemes.push("La case à viser est un mur : changez de position.");
      if (bloqueur(vous, viser, bloquantes) !== null) problemes.push("Pas de ligne de vue sur la case à viser.");
    }
    if (bloqueur(vous, cible, bloquantes) !== null) problemes.push("Pas de ligne de vue sur le monstre : le sort ferait un échec critique.");
    return { viser, problemes };
  }, [vous, cible, quarts, murs, allies, monstres]);

  const toutEffacer = () => { setMonstres([]); setCible(null); setMurs(new Set()); setAllies(new Set()); };
  const lieu = resultat?.viser != null ? direction(vous, resultat.viser) : null;
  const pv = centre(vous), pc = cible !== null ? centre(cible) : null, pa = resultat?.viser != null ? centre(resultat.viser) : null;

  return (
    <div className="viseur">
      <div className="viseur__reglages">
        <div className="fa-puces" role="group" aria-label="Vos PV au début du tour">
          <span className="discret-taille">Vos PV au début du tour</span>
          {TRANCHES.map((t, k) => (
            <button key={t.libelle} type="button" className={`fa-puce ${tranche === k ? "actif" : ""}`} aria-pressed={tranche === k} onClick={() => setTranche(k)}>{t.libelle}</button>
          ))}
        </div>
        <div className="viseur__ligne">
          <span className="discret-taille">Coups au corps à corps ce tour</span>
          <button type="button" className="fa-puce" onClick={() => setCac(Math.max(0, cac - 1))} aria-label="Un coup de moins">−</button>
          <strong aria-live="polite">{cac}</strong>
          <button type="button" className="fa-puce" onClick={() => setCac(cac + 1)} aria-label="Un coup de plus">+</button>
          <span className="viseur__deviation">Déviation : <strong>{nomDeviation(quarts)}</strong></span>
        </div>
        <div className="fa-puces" role="group" aria-label="Ce que place un clic">
          <span className="discret-taille">Un clic place</span>
          {OUTILS.map((o) => (
            <button key={o.id} type="button" className={`fa-puce ${outil === o.id ? "actif" : ""}`} aria-pressed={outil === o.id} onClick={() => setOutil(o.id)}>{o.libelle}</button>
          ))}
          <button type="button" className="fa-puce" onClick={toutEffacer}>Tout effacer</button>
        </div>
      </div>

      <p className="viseur__resultat" aria-live="polite">
        {cible === null
          ? "Placez un monstre : un clic sur un monstre déjà posé en fait la cible."
          : resultat?.viser != null && resultat.problemes.length === 0
            ? <>Visez la case dorée{lieu ? <> : <strong>{lieu}</strong></> : null}.</>
            : resultat?.problemes.join(" ")}
      </p>

      <svg className="viseur__carte" viewBox={`0 0 ${LARGEUR * W + W / 2} ${20 * H + H / 2}`} role="img" aria-label="Carte du combat">
        <g>
          {CASES.map((id) => {
            const classe = murs.has(id) ? "viseur__case viseur__case--mur" : id === resultat?.viser ? `viseur__case viseur__case--viser${resultat.problemes.length ? " viseur__case--bloquee" : ""}` : "viseur__case";
            return <path key={id} d={losange(id)} className={classe} onClick={() => cliquer(id)} />;
          })}
        </g>
        {pc && pa && <line x1={pv.x} y1={pv.y} x2={pa.x} y2={pa.y} className="viseur__trait viseur__trait--viser" />}
        {pc && <line x1={pv.x} y1={pv.y} x2={pc.x} y2={pc.y} className="viseur__trait viseur__trait--cible" />}
        <g pointerEvents="none">
          {[...allies].map((id) => { const c = centre(id); return <circle key={id} cx={c.x} cy={c.y - 2} r={6} className="viseur__allie" />; })}
          {monstres.map((id) => { const c = centre(id); return <circle key={id} cx={c.x} cy={c.y - 2} r={7} className={id === cible ? "viseur__monstre viseur__monstre--cible" : "viseur__monstre"} />; })}
          <circle cx={pv.x} cy={pv.y - 2} r={8} className="viseur__vous" />
          {pa && <circle cx={pa.x} cy={pa.y} r={4} className="viseur__mire" />}
        </g>
      </svg>
      <p className="discret-taille">
        Bleu : vous. Rouge : les monstres (cerclé d'or : la cible). Petits ronds bleus : vos alliés. Cases sombres : les murs.
        Murs, alliés et autres monstres coupent la ligne de vue. Le calcul est prudent : une ligne qui passe pile sur un coin est considérée comme coupée si une des deux cases voisines est occupée. Les invocations ne sont pas déviées.
      </p>
    </div>
  );
}
