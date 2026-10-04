import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pastille } from "../components/Pastille";
import { type Dofus } from "../data/dofus";
import { aDesQuetes, CATEGORIES, trouverSerie, type Categorie } from "../data/series";
import { donjonDeLEtape } from "../data/donjons";
import { succesDuBoss } from "../data/succesDonjons";
import { chargerAides, chargerGuilde, chargerQuetes, chargerSouhaits, chargerSucces, prefixeDofus, type DonneesGuilde } from "../lib/donnees";
import { etapeActuelle } from "../lib/quetes";
import { useSession } from "../lib/session";
import { estDispo, type AideEtape, type Personnage, type SuccesDonjon } from "../lib/types";
import { Chargement } from "./Acces";
import { BarreCategories, Etiquette, OngletsSeries } from "./Quetes";

const MAX_PASTILLES = 12;

type Ligne = { cle: string; numero: string; titre: string; quete?: Dofus["quetes"][number]; persos: { p: Personnage; dispo: boolean }[] };

export function Progression() {
  const { membre: moi } = useSession();
  const [params, setParams] = useSearchParams();
  // Lien depuis le tableau de bord : ?dofus=…&etape=… ouvre directement l'étape concernée, quelle que soit la catégorie.
  const etapeCible = params.get("etape");
  const lien = trouverSerie(params.get("dofus"));
  const categorie = CATEGORIES.find((c) => c.id === params.get("cat") && aDesQuetes(c)) ?? lien?.categorie ?? CATEGORIES[0];
  const disponibles = categorie.series.filter((s) => s.quetes.length > 0);
  const dofus = disponibles.find((d) => d.id === params.get("dofus")) ?? disponibles[0];
  const setDofus = (d: Dofus) => setParams({ cat: categorie.id, dofus: d.id }, { replace: true });
  const setCategorie = (c: Categorie) => setParams({ cat: c.id }, { replace: true });
  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const [quetes, setQuetes] = useState<Map<string, Set<string>> | null>(null);
  const [souhaits, setSouhaits] = useState<Map<string, Set<string>>>(new Map());
  const [aides, setAides] = useState<AideEtape[]>([]);
  const [succes, setSucces] = useState<SuccesDonjon[]>([]);
  const [seulsDispos, setSeulsDispos] = useState(false);
  const [ouvertes, setOuvertes] = useState<Set<string>>(new Set(etapeCible ? [etapeCible] : []));
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    setQuetes(null);
    const prefixe = prefixeDofus(dofus.quetes.map((q) => q.id));
    Promise.all([chargerGuilde(), chargerQuetes(prefixe), chargerSouhaits(), chargerAides(prefixe), chargerSucces()])
      .then(([g, q, s, a, sx]) => {
        setSucces(sx);
        setGuilde(g);
        setQuetes(q);
        setSouhaits(s);
        setAides(a);
      })
      .catch((e) => setErreur(e.message));
  }, [dofus]);

  const { lignes, pasCommence } = useMemo(() => {
    if (!guilde || !quetes) return { lignes: [] as Ligne[], pasCommence: 0 };
    const res: Ligne[] = dofus.quetes.map((q, i) => ({ cle: q.id, numero: String(i + 1), titre: q.nom, quete: q, persos: [] }));
    res.push({ cle: "obtenu", numero: "", titre: categorie.estDofus ? `Dofus ${dofus.nom} obtenu` : `${dofus.nom} : terminé`, persos: [] });
    let pasCommence = 0;
    for (const p of guilde.personnages) {
      // Pas commencé et ne cherche pas de groupe pour le commencer : on ne l'affiche pas.
      if (!quetes.has(p.id) && !souhaits.get(p.id)?.has(dofus.id)) {
        pasCommence++;
        continue;
      }
      const dispo = estDispo(guilde.membres.get(p.membre_id), p.id);
      if (seulsDispos && !dispo) continue;
      res[etapeActuelle(dofus, quetes.get(p.id) ?? new Set())].persos.push({ p, dispo });
    }
    // Les dispos d'abord, puis les principaux, pour qu'ils restent visibles quand la ligne est tronquée.
    for (const l of res) {
      l.persos.sort((a, b) => Number(b.dispo) - Number(a.dispo) || Number(b.p.est_principal) - Number(a.p.est_principal) || a.p.nom.localeCompare(b.p.nom));
    }
    return { lignes: res, pasCommence };
  }, [guilde, quetes, souhaits, dofus, seulsDispos, categorie.estDofus]);

  const pret = Boolean(guilde && quetes);
  useEffect(() => {
    if (pret && etapeCible) document.getElementById(`progression-${etapeCible}`)?.scrollIntoView({ block: "center" });
  }, [pret, etapeCible]);

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
          <p className="discret">
            Chaque personnage est placé sur sa prochaine étape.
            {pasCommence > 0 && ` ${pasCommence} n'${pasCommence > 1 ? "ont" : "a"} pas commencé ${categorie.estDofus ? "ce Dofus" : "cette série"}.`}
          </p>
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

      <BarreCategories actif={categorie} onChoix={setCategorie} />
      {categorie.series.length > 1 && (
        <OngletsSeries series={categorie.series} actif={dofus} onChoix={setDofus} libelle={categorie.estDofus ? "Choix du Dofus" : "Choix de la série"} />
      )}

      <ol className="etapes">
        {lignes.map((l) => {
          const nDispo = l.persos.filter((x) => x.dispo).length;
          const estOuverte = ouvertes.has(l.cle);
          const visibles = estOuverte ? l.persos : l.persos.slice(0, MAX_PASTILLES);
          const reste = l.persos.length - visibles.length;
          const contientMoi = l.persos.some((x) => x.p.membre_id === moi?.id);
          return (
            <li key={l.cle} id={`progression-${l.cle}`} className={`etape ${contientMoi ? "etape--moi" : ""} ${l.quete ? "" : "etape--fin"} ${l.cle === etapeCible ? "etape--cible" : ""}`}>
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
                {(() => {
                  // Défi du boss : parmi les personnages à cette étape, qui ne l'a pas encore fait (donc le souhaite).
                  const defi = donjonDeLEtape(l.cle) && l.quete ? succesDuBoss(l.quete.nom) : undefined;
                  if (!defi || l.persos.length === 0) return null;
                  const aFaire = l.persos.filter((x) => !succes.some((sx) => sx.personnage_id === x.p.id && sx.succes_id === defi.id && sx.statut === "fait"));
                  return (
                    <span className="discret-taille">
                      🏆 Défi du boss à faire pour{" "}
                      <span className="etat" tabIndex={0}>
                        {aFaire.length} sur {l.persos.length}
                        <span role="tooltip" className="etat__bulle">
                          {defi.description}
                          {aFaire.length > 0 && <><br />À faire : {aFaire.map((x) => x.p.nom).join(", ")}</>}
                        </span>
                      </span>
                    </span>
                  );
                })()}
                {(() => {
                  // « Je peux aider » : ceux qui se sont positionnés sur cette étape.
                  const ici = aides.filter((a) => a.quete_id === l.cle);
                  if (ici.length === 0 || !guilde) return null;
                  return (
                    <span className="discret-taille">
                      🤝 Peuvent aider :{" "}
                      {ici.map((a, i) => {
                        const x = guilde.personnages.find((p) => p.id === a.personnage_id);
                        if (!x) return null;
                        const dispo = estDispo(guilde.membres.get(x.membre_id), x.id);
                        return (
                          <span key={a.personnage_id}>
                            {i > 0 && ", "}
                            <Link to={`/perso/${x.id}`} className={dispo ? "vert" : undefined} title={a.note ?? undefined}>{x.nom}</Link>
                          </span>
                        );
                      })}
                    </span>
                  );
                })()}
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
