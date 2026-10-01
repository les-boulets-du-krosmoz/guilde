import { useEffect, useMemo, useState } from "react";
import { Pastille } from "../components/Pastille";
import { DOFUS, type Dofus } from "../data/dofus";
import { chargerGuilde, chargerQuetes, prefixeDofus, type DonneesGuilde } from "../lib/donnees";
import { etapeActuelle } from "../lib/quetes";
import { useSession } from "../lib/session";
import { estDispo, type Personnage } from "../lib/types";
import { Chargement } from "./Acces";
import { Etiquette, OngletsDofus } from "./Quetes";

const MAX_PASTILLES = 12;

type Ligne = { cle: string; numero: string; titre: string; quete?: Dofus["quetes"][number]; persos: { p: Personnage; dispo: boolean }[] };

export function Progression() {
  const { membre: moi } = useSession();
  const [dofus, setDofus] = useState<Dofus>(DOFUS.find((d) => d.quetes.length > 0)!);
  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const [quetes, setQuetes] = useState<Map<string, Set<string>> | null>(null);
  const [seulsDispos, setSeulsDispos] = useState(false);
  const [ouvertes, setOuvertes] = useState<Set<string>>(new Set());
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    setQuetes(null);
    Promise.all([chargerGuilde(), chargerQuetes(prefixeDofus(dofus.quetes.map((q) => q.id)))])
      .then(([g, q]) => {
        setGuilde(g);
        setQuetes(q);
      })
      .catch((e) => setErreur(e.message));
  }, [dofus]);

  const lignes = useMemo<Ligne[]>(() => {
    if (!guilde || !quetes) return [];
    const res: Ligne[] = dofus.quetes.map((q, i) => ({ cle: q.id, numero: String(i + 1), titre: q.nom, quete: q, persos: [] }));
    res.push({ cle: "obtenu", numero: "", titre: `Dofus ${dofus.nom} obtenu`, persos: [] });
    for (const p of guilde.personnages) {
      const dispo = estDispo(guilde.membres.get(p.membre_id), p.id);
      if (seulsDispos && !dispo) continue;
      res[etapeActuelle(dofus, quetes.get(p.id) ?? new Set())].persos.push({ p, dispo });
    }
    // Les dispos d'abord, puis les principaux, pour qu'ils restent visibles quand la ligne est tronquée.
    for (const l of res) {
      l.persos.sort((a, b) => Number(b.dispo) - Number(a.dispo) || Number(b.p.est_principal) - Number(a.p.est_principal) || a.p.nom.localeCompare(b.p.nom));
    }
    return res;
  }, [guilde, quetes, dofus, seulsDispos]);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!guilde || !quetes) return <Chargement />;

  const basculer = (cle: string) => {
    const s = new Set(ouvertes);
    if (s.has(cle)) s.delete(cle);
    else s.add(cle);
    setOuvertes(s);
  };

  return (
    <main className="page">
      <div className="entete">
        <div>
          <h1>Où en est la guilde</h1>
          <p className="discret">Chaque personnage apparaît sur la quête qu'il doit faire ensuite.</p>
        </div>
        <div className="legende">
          <span><span className="pastille pastille--exemple" aria-hidden="true" /> Principal</span>
          <span><span className="pastille pastille--exemple pastille--mule" aria-hidden="true" /> Mule</span>
          <span><span className="pastille pastille--exemple pastille--dispo" aria-hidden="true" /> Dispo</span>
          <label className="case">
            <input type="checkbox" checked={seulsDispos} onChange={(e) => setSeulsDispos(e.target.checked)} />
            Seulement les dispos
          </label>
        </div>
      </div>

      <OngletsDofus actif={dofus} onChoix={setDofus} />

      <ol className="etapes">
        {lignes.map((l) => {
          const nDispo = l.persos.filter((x) => x.dispo).length;
          const estOuverte = ouvertes.has(l.cle);
          const visibles = estOuverte ? l.persos : l.persos.slice(0, MAX_PASTILLES);
          const reste = l.persos.length - visibles.length;
          const contientMoi = l.persos.some((x) => x.p.membre_id === moi?.id);
          return (
            <li key={l.cle} className={`etape ${contientMoi ? "etape--moi" : ""} ${l.quete ? "" : "etape--fin"}`}>
              <div className="etape__quete">
                <div>
                  {l.numero && <span className="etape__numero">{l.numero}</span>}
                  <strong>{l.titre}</strong>
                </div>
                {l.quete && (
                  <div className="etiquettes">
                    {l.quete.contenu.map((c, j) => <Etiquette key={j} contenu={c} />)}
                  </div>
                )}
              </div>
              <div className="pastilles">
                {visibles.map((x) => <Pastille key={x.p.id} perso={x.p} dispo={x.dispo} />)}
                {reste > 0 && (
                  <button type="button" className="plus" onClick={() => basculer(l.cle)} aria-label={`Afficher les ${reste} autres personnages`}>
                    +{reste}
                  </button>
                )}
                {estOuverte && l.persos.length > MAX_PASTILLES && (
                  <button type="button" className="plus" onClick={() => basculer(l.cle)}>Réduire</button>
                )}
              </div>
              <div className="etape__compteurs">
                <span><strong>{l.persos.length}</strong> perso{l.persos.length > 1 ? "s" : ""}</span>
                <span className={nDispo ? "vert" : "discret"}>{nDispo ? `${nDispo} dispo` : "personne de dispo"}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
