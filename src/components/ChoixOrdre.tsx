import { useEffect, useRef, useState } from "react";
import { libelleRang, ORDRES_DETAIL, ordreParNom, type Camp } from "../data/ordres";
import { usePlacementDansEcran } from "../lib/placement";

/**
 * Choix d'un ordre et d'un rang minimum, en arbre replié : Bonta / Brâkmar, puis leurs 3 ordres, puis les 5 rangs.
 * Les deux camps ne se mélangent jamais.
 */
export function ChoixOrdre({ ordre, rang, onChoix, libelleVide = "Aucun" }: {
  ordre: string | null;
  rang: number | null;
  onChoix: (ordre: string | null, rang: number | null) => void;
  /** Texte du bouton quand rien n'est choisi (ex. « + Ajouter un ordre »). */
  libelleVide?: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const [camp, setCamp] = useState<Camp | null>(ordreParNom(ordre)?.camp ?? null);
  const [ordreOuvert, setOrdreOuvert] = useState<string | null>(ordre);
  const boite = useRef<HTMLDivElement>(null);
  const liste = useRef<HTMLDivElement>(null);
  const place = usePlacementDansEcran(ouvert, boite, liste);
  useEffect(() => {
    if (!ouvert) return;
    const dehors = (e: MouseEvent) => { if (!boite.current?.contains(e.target as Node)) setOuvert(false); };
    const echap = (e: KeyboardEvent) => { if (e.key === "Escape") setOuvert(false); };
    document.addEventListener("mousedown", dehors); document.addEventListener("keydown", echap);
    return () => { document.removeEventListener("mousedown", dehors); document.removeEventListener("keydown", echap); };
  }, [ouvert]);

  const o = ordreParNom(ordre);
  const libelle = o && rang ? `${o.camp} · ${libelleRang(o, rang)} (${o.rangs[rang - 1].alignement})` : libelleVide;
  const choisir = (nom: string | null, r: number | null) => { onChoix(nom, r); setOuvert(false); };

  return (
    <div className="choix-ordre" ref={boite}>
      <button type="button" className="choix-ordre__bouton" aria-haspopup="tree" aria-expanded={ouvert} onClick={() => setOuvert(!ouvert)}>
        <span>{libelle}</span><span className="menu-statut__fleche" aria-hidden="true">▾</span>
      </button>
      {ouvert && (
        <div className="choix-ordre__liste" ref={liste} style={place} role="tree" aria-label="Ordre et rang minimum">
          {o && <button type="button" role="treeitem" className="choix-ordre__item" onClick={() => choisir(null, null)}>Retirer cet ordre</button>}
          {(["Bonta", "Brâkmar"] as Camp[]).map((c) => (
            <div key={c} role="group">
              <button type="button" role="treeitem" aria-expanded={camp === c} className="choix-ordre__camp" onClick={() => setCamp(camp === c ? null : c)}>
                <span aria-hidden="true">{camp === c ? "▾" : "▸"}</span> {c}
              </button>
              {camp === c && ORDRES_DETAIL.filter((x) => x.camp === c).map((x) => (
                <div key={x.nom} role="group" className="choix-ordre__niveau">
                  <button type="button" role="treeitem" aria-expanded={ordreOuvert === x.nom} className="choix-ordre__ordre" onClick={() => setOrdreOuvert(ordreOuvert === x.nom ? null : x.nom)}>
                    <span aria-hidden="true">{ordreOuvert === x.nom ? "▾" : "▸"}</span> Ordre {x.nom}
                  </button>
                  {ordreOuvert === x.nom && x.rangs.map((rg, i) => (
                    <button key={rg.nom} type="button" role="treeitem" className={`choix-ordre__item choix-ordre__rang ${ordre === x.nom && rang === i + 1 ? "choix-ordre__item--choisi" : ""}`}
                      onClick={() => choisir(x.nom, i + 1)}>
                      {x.court} {i + 1} — {rg.nom} <span className="discret">({rg.alignement})</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
