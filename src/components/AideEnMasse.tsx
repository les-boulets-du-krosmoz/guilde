import { useState } from "react";
import type { Dofus } from "../data/dofus";
import { proposerAidesPlusieurs, retirerAidesPlusieurs } from "../lib/donnees";
import type { AideEtape } from "../lib/types";

type Ligne = { coche: boolean; note: string };

/**
 * « Je peux aider » en masse sur une série : toutes les étapes d'un coup, un message commun ou un message par étape.
 * Les étapes déjà cochées sont pré-remplies ; décocher une étape retire l'inscription à la validation.
 */
export function AideEnMasse({ serie, personnageId, nomPerso, aides, onFini, onAnnuler }: {
  serie: Dofus;
  personnageId: string;
  nomPerso: string;
  aides: AideEtape[];
  onFini: () => void;
  onAnnuler: () => void;
}) {
  const existantes = new Map(aides.filter((a) => a.personnage_id === personnageId).map((a) => [a.quete_id, a.note ?? ""]));
  const [lignes, setLignes] = useState<Record<string, Ligne>>(() =>
    Object.fromEntries(serie.quetes.map((q) => [q.id, { coche: existantes.has(q.id), note: existantes.get(q.id) ?? "" }])),
  );
  const [commun, setCommun] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const maj = (id: string, l: Partial<Ligne>) => setLignes((x) => ({ ...x, [id]: { ...x[id], ...l } }));
  const toutes = (coche: boolean) => setLignes((x) => Object.fromEntries(Object.entries(x).map(([id, l]) => [id, { ...l, coche }])));
  const appliquerCommun = () =>
    setLignes((x) => Object.fromEntries(Object.entries(x).map(([id, l]) => [id, l.coche ? { ...l, note: commun } : l])));
  const nbCoches = Object.values(lignes).filter((l) => l.coche).length;

  async function valider() {
    setEnCours(true);
    setErreur(null);
    try {
      const aInscrire = Object.entries(lignes).filter(([, l]) => l.coche).map(([queteId, l]) => ({ queteId, note: l.note }));
      const aRetirer = [...existantes.keys()].filter((id) => !lignes[id]?.coche);
      await proposerAidesPlusieurs(personnageId, aInscrire);
      await retirerAidesPlusieurs(personnageId, aRetirer);
      onFini();
    } catch (e) {
      setErreur((e as Error).message);
    }
    setEnCours(false);
  }

  return (
    <section className="carte aide-masse">
      <div className="carte__entete">
        <h2>Aide en masse : {serie.nom}</h2>
        <span className="discret">{nbCoches} étape{nbCoches > 1 ? "s" : ""} cochée{nbCoches > 1 ? "s" : ""}</span>
      </div>
      <p className="discret">
        Coche les étapes où {nomPerso} peut aider. Un message commun peut s'appliquer à toutes les étapes cochées, et chaque message reste modifiable.
        Décocher une étape déjà inscrite la retire.
      </p>

      <div className="aide-masse__commun">
        <label className="sr-only" htmlFor="aide-commun">Message commun</label>
        <input id="aide-commun" maxLength={140} placeholder="Message commun, ex. « je connais la strat, je vous guide »" value={commun} onChange={(e) => setCommun(e.target.value)} />
        <button type="button" className="bouton" onClick={appliquerCommun} disabled={nbCoches === 0}>Appliquer aux étapes cochées</button>
        <button type="button" className="lien-bouton" onClick={() => toutes(true)}>Tout cocher</button>
        <button type="button" className="lien-bouton" onClick={() => toutes(false)}>Tout décocher</button>
      </div>

      <ol className="aide-masse__liste">
        {serie.quetes.map((q, i) => {
          const l = lignes[q.id];
          return (
            <li key={q.id} className={l.coche ? "aide-masse__ligne aide-masse__ligne--coche" : "aide-masse__ligne"}>
              <label className="case">
                <input type="checkbox" checked={l.coche} onChange={() => maj(q.id, { coche: !l.coche })} />
                <span className="discret">{i + 1}.</span> {q.nom}
              </label>
              <input
                maxLength={140}
                placeholder={l.coche ? "Message facultatif" : ""}
                value={l.note}
                disabled={!l.coche}
                onChange={(e) => maj(q.id, { note: e.target.value })}
                aria-label={`Message pour ${q.nom}`}
              />
            </li>
          );
        })}
      </ol>

      <div className="aide-masse__actions">
        <button type="button" className="bouton bouton--vert" onClick={valider} disabled={enCours}>Valider tout</button>
        <button type="button" className="bouton" onClick={onAnnuler} disabled={enCours}>Annuler</button>
        {erreur && <span className="erreur" role="alert">{erreur}</span>}
      </div>
    </section>
  );
}
