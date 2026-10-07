import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { TexteEtats } from "../components/Etat";
import { NomAvecPastille, Pastille } from "../components/Pastille";
import { DOFUS, type Contenu, type Dofus, type Ressource } from "../data/dofus";
import { donjonDeLEtape } from "../data/donjons";
import { donjonDuBoss, TOTAL_SUCCES } from "../data/succesDonjons";
import { BoutonDefi } from "../components/BoutonDefi";
import { TableauSucces } from "../components/TableauSucces";
import { AideEnMasse } from "../components/AideEnMasse";
import { IconeDonjon, imageDonjon } from "../components/IconeDonjon";
import { aDesQuetes, CATEGORIES, type Categorie } from "../data/series";
import { clicSurCarte } from "../lib/clicCarte";
import { ilYa } from "../lib/dates";
import { chargerAides, chargerGuilde, chargerMetiers, chargerQuetes, chargerRessources, chargerSouhaits, chargerSucces, definirSucces, definirSuccesPlusieurs, prefixeDofus, proposerAide, retirerAide } from "../lib/donnees";
import { avancement, cocher, decocher, etapeActuelle, evaluerPrerequis } from "../lib/quetes";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import { estDispo, type AideEtape, type Membre, type MetierMembre, type Personnage, type SuccesDonjon } from "../lib/types";
import { Chargement } from "./Acces";

type AuMemeStade = { perso: Personnage; dispo: boolean }[];

export function Quetes() {
  const { persoId } = useParams();
  const { mesPersos } = useSession();

  if (!persoId) {
    const defaut = mesPersos.find((p) => p.est_principal) ?? mesPersos[0];
    if (!defaut) {
      return (
        <main className="page">
          <p className="vide">Crée d'abord un personnage dans <Link to="/mon-compte">Mon compte</Link>.</p>
        </main>
      );
    }
    return <Navigate to={{ pathname: `/quetes/${defaut.id}`, search: window.location.search }} replace />;
  }
  return <QuetesPerso key={persoId} persoId={persoId} />;
}

function QuetesPerso({ persoId }: { persoId: string }) {
  const { membre: moi } = useSession();
  const [params, setParams] = useSearchParams();
  const categorie = CATEGORIES.find((c) => c.id === params.get("cat") && aDesQuetes(c)) ?? CATEGORIES[0];
  // La catégorie « Succès » n'a pas de série : on garde une série par défaut pour le chargement des données.
  const estSucces = categorie.id === "succes";
  const disponibles = (estSucces ? CATEGORIES[0] : categorie).series.filter((d) => d.quetes.length > 0);
  const dofus = disponibles.find((d) => d.id === params.get("dofus")) ?? disponibles[0];
  const setDofus = (d: Dofus) => setParams({ cat: categorie.id, dofus: d.id }, { replace: true });
  const setCategorie = (c: Categorie) => setParams({ cat: c.id }, { replace: true });
  const [ressources, setRessources] = useState<Set<string>>(new Set());
  const [souhaits, setSouhaits] = useState<Set<string>>(new Set());
  const [perso, setPerso] = useState<Personnage | null>(null);
  const [metiers, setMetiers] = useState<MetierMembre[]>([]);
  const [faites, setFaites] = useState<Set<string>>(new Set());
  // Entraide : qui en est à chaque étape (hors ce personnage), et qui s'est positionné pour aider.
  const [positions, setPositions] = useState<Map<string, AuMemeStade>>(new Map());
  const [aides, setAides] = useState<AideEtape[]>([]);
  const [annuaire, setAnnuaire] = useState<{ persos: Map<string, Personnage>; membres: Map<string, Membre> } | null>(null);
  const [saisieAide, setSaisieAide] = useState<{ queteId: string; note: string } | null>(null);
  const [aideMasse, setAideMasse] = useState(false);
  // Succès de donjon visés ou faits par toute la guilde.
  const [succes, setSucces] = useState<SuccesDonjon[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  // Étapes repliées par défaut : seule l'étape en cours est dépliée.
  const [ouvertes, setOuvertes] = useState<Set<string>>(new Set());

  const charger = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("personnages").select("*").eq("id", persoId).single();
      if (error || !data) throw new Error("Ce personnage n'existe pas ou plus.");
      const p = data as Personnage;
      const prefixe = prefixeDofus(dofus.quetes.map((q) => q.id));
      const [m, quetes, guilde, res, tousSouhaits, inscriptions, tousSucces] = await Promise.all([
        chargerMetiers(p.membre_id),
        chargerQuetes(prefixe),
        chargerGuilde(),
        chargerRessources(p.id),
        chargerSouhaits(),
        chargerAides(prefixe),
        chargerSucces(),
      ]);
      setAides(inscriptions);
      setSucces(tousSucces);
      setAnnuaire({ persos: new Map(guilde.personnages.map((x) => [x.id, x])), membres: guilde.membres as Map<string, Membre> });
      setRessources(res);
      setSouhaits(tousSouhaits.get(p.id) ?? new Set());
      const mesFaites = quetes.get(p.id) ?? new Set<string>();
      setPerso(p);
      setMetiers(m);
      setFaites(mesFaites);

      // Qui d'autre en est à la même quête ? Seulement ceux qui ont commencé ce Dofus ou cherchent un groupe
      // pour le commencer : sinon, à la première quête, toute la guilde s'afficherait.
      const concerne = (id: string) => quetes.has(id) || (tousSouhaits.get(id)?.has(dofus.id) ?? false);
      const parEtape = new Map<string, AuMemeStade>();
      for (const x of guilde.personnages) {
        if (x.id === p.id || !concerne(x.id)) continue;
        const q = dofus.quetes[etapeActuelle(dofus, quetes.get(x.id) ?? new Set())];
        if (!q) continue; // série terminée
        if (!parEtape.has(q.id)) parEtape.set(q.id, []);
        parEtape.get(q.id)!.push({ perso: x, dispo: estDispo(guilde.membres.get(x.membre_id) as Membre | undefined, x.id) });
      }
      setPositions(parEtape);
    } catch (e) {
      setErreur((e as Error).message);
    }
  }, [persoId, dofus]);

  useEffect(() => {
    charger();
  }, [charger]);

  // Quand l'étape en cours change (chargement, quête cochée, autre Dofus), on la déplie.
  useEffect(() => {
    const courante = dofus.quetes[etapeActuelle(dofus, faites)];
    if (courante) setOuvertes((o) => (o.has(courante.id) ? o : new Set([...o, courante.id])));
  }, [dofus, faites]);

  // Arrivé depuis un profil (?dofus=…) : on amène directement à l'étape en cours.
  useEffect(() => {
    if (!perso || !params.get("dofus")) return;
    const cible = dofus.quetes[etapeActuelle(dofus, faites)];
    if (cible) document.getElementById(`etape-${cible.id}`)?.scrollIntoView({ block: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perso?.id, dofus.id]);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!perso) return <Chargement />;

  const modifiable = perso.membre_id === moi?.id;
  const etape = etapeActuelle(dofus, faites);
  const [terminees, total] = avancement(dofus, faites);

  async function validerAide() {
    if (!saisieAide || !perso) return;
    try {
      await proposerAide(perso.id, saisieAide.queteId, saisieAide.note);
      setAides(await chargerAides(prefixeDofus(dofus.quetes.map((q) => q.id))));
      setSaisieAide(null);
    } catch (e) {
      setErreur((e as Error).message);
    }
  }

  /** Clic sur un succès : à faire ↔ fait. Un succès pas encore fait est un succès qu'on souhaite faire. */
  async function basculerSucces(succesId: string, personnageId?: string) {
    if (!perso) return;
    const pid = personnageId ?? perso.id;
    const fait = succes.some((x) => x.personnage_id === pid && x.succes_id === succesId && x.statut === "fait");
    const suivant = fait ? null : "fait";
    try {
      await definirSucces(pid, succesId, suivant);
      setSucces((liste) => {
        const sans = liste.filter((x) => !(x.personnage_id === pid && x.succes_id === succesId));
        return suivant ? [...sans, { personnage_id: pid, succes_id: succesId, statut: suivant, maj_le: new Date().toISOString() }] : sans;
      });
    } catch (e) {
      setErreur((e as Error).message);
    }
  }

  /** « Tout cocher » sur un donjon, ou toutes les victoires affichées. */
  async function succesPlusieurs(ids: string[], fait: boolean, personnageId?: string) {
    if (!perso) return;
    const pid = personnageId ?? perso.id;
    try {
      await definirSuccesPlusieurs(pid, ids, fait);
      const maj_le = new Date().toISOString();
      setSucces((liste) => {
        const sans = liste.filter((x) => !(x.personnage_id === pid && ids.includes(x.succes_id)));
        return fait ? [...sans, ...ids.map((succes_id) => ({ personnage_id: pid, succes_id, statut: "fait" as const, maj_le }))] : sans;
      });
    } catch (e) {
      setErreur((e as Error).message);
    }
  }

  async function retirerMonAide(queteId: string) {
    if (!perso) return;
    try {
      await retirerAide(perso.id, queteId);
      setAides((a) => a.filter((x) => !(x.personnage_id === perso.id && x.quete_id === queteId)));
    } catch (e) {
      setErreur((e as Error).message);
    }
  }

  async function basculer(queteId: string) {
    if (!modifiable || enCours) return;
    const suivant = faites.has(queteId) ? decocher(faites, queteId) : cocher(faites, queteId);
    const ajouts = [...suivant].filter((q) => !faites.has(q));
    const retraits = [...faites].filter((q) => !suivant.has(q));
    const avant = faites;
    setFaites(suivant); // affichage immédiat
    setEnCours(true);

    const erreurs: string[] = [];
    if (ajouts.length) {
      const { error } = await supabase
        .from("quetes_terminees")
        .upsert(ajouts.map((q) => ({ personnage_id: persoId, quete_id: q })));
      if (error) erreurs.push(error.message);
    }
    if (retraits.length) {
      const { error } = await supabase.from("quetes_terminees").delete().eq("personnage_id", persoId).in("quete_id", retraits);
      if (error) erreurs.push(error.message);
    }
    if (erreurs.length) {
      setFaites(avant);
      setErreur("La progression n'a pas été enregistrée : " + erreurs.join(" ; "));
    }
    setEnCours(false);
  }

  const basculerOuverture = (id: string) =>
    setOuvertes((o) => {
      const n = new Set(o);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const commence = dofus.quetes.some((q) => faites.has(q.id));

  async function basculerSouhait() {
    if (!modifiable) return;
    const avait = souhaits.has(dofus.id);
    const suivant = new Set(souhaits);
    if (avait) suivant.delete(dofus.id);
    else suivant.add(dofus.id);
    setSouhaits(suivant);
    const { error } = avait
      ? await supabase.from("dofus_souhaites").delete().eq("personnage_id", persoId).eq("dofus_id", dofus.id)
      : await supabase.from("dofus_souhaites").insert({ personnage_id: persoId, dofus_id: dofus.id });
    if (error) {
      setSouhaits(souhaits);
      setErreur("Ton choix n'a pas été enregistré : " + error.message);
    }
  }

  async function basculerRessource(id: string) {
    if (!modifiable) return;
    const avait = ressources.has(id);
    const suivant = new Set(ressources);
    if (avait) suivant.delete(id);
    else suivant.add(id);
    setRessources(suivant);
    const { error } = avait
      ? await supabase.from("ressources_cochees").delete().eq("personnage_id", persoId).eq("ressource_id", id)
      : await supabase.from("ressources_cochees").insert({ personnage_id: persoId, ressource_id: id });
    if (error) {
      setRessources(ressources);
      setErreur("La ressource n'a pas été enregistrée : " + error.message);
    }
  }

  const guideDpln = (dofus.sources ?? []).find((src) => src.url.includes("dofuspourlesnoobs.com"))?.url;

  if (estSucces) {
    const reussis = succes.filter((x) => x.personnage_id === perso.id && x.statut === "fait").length;
    return (
      <main className="page">
        <div className="entete">
          <div>
            <Link to={`/perso/${perso.id}`}>Retour à {perso.nom} ({perso.classe} {perso.niveau})</Link>
            <h1>{modifiable ? "Succès de donjon" : `Succès de donjon de ${perso.nom}`}</h1>
            <p className="discret">Une ligne par boss, une case par succès, d'après les données du jeu.</p>
          </div>
          <div className="progression-globale">
            <span><strong className="vert">{reussis}</strong> / {TOTAL_SUCCES} réussis</span>
            <div className="barre barre--large" aria-hidden="true"><div style={{ width: `${(reussis / TOTAL_SUCCES) * 100}%` }} /></div>
          </div>
        </div>
        <BarreCategories actif={categorie} onChoix={setCategorie} />
        <TableauSucces
          perso={perso}
          modifiable={modifiable}
          succes={succes}
          persos={annuaire?.persos ?? new Map()}
          membres={annuaire?.membres ?? new Map()}
          onBasculer={(id, pid) => basculerSucces(id, pid)}
          onPlusieurs={(ids, fait, pid) => succesPlusieurs(ids, fait, pid)}
          moiMembreId={moi?.id}
        />
      </main>
    );
  }

  return (
    <main className="page">
      <div className="entete">
        <div>
          <Link to={`/perso/${perso.id}`}>Retour à {perso.nom} ({perso.classe} {perso.niveau})</Link>
          <h1>{modifiable ? titreSerie(categorie, dofus) : `${titreSerie(categorie, dofus)} de ${perso.nom}`}</h1>
          <p className="discret">
            {dofus.succes && <>Succès « {dofus.succes} », </>}{total} {dofus.unite ?? "quêtes"}
            {dofus.quetes.length > total ? ` (+ ${dofus.quetes.length - total} facultative${dofus.quetes.length - total > 1 ? "s" : ""})` : ""}
          </p>
        </div>
        <div className="progression-globale">
          <span><strong className="vert">{terminees}</strong> / {total} terminées</span>
          <div className="barre barre--large" aria-hidden="true"><div style={{ width: `${(terminees / total) * 100}%` }} /></div>
        </div>
      </div>

      <BarreCategories actif={categorie} onChoix={setCategorie} />

      {categorie.series.length > 1 && (
        <OngletsSeries series={categorie.series} actif={dofus} onChoix={(d) => { setDofus(d); setAideMasse(false); }} libelle={categorie.estDofus ? "Choix du Dofus" : "Choix de la zone"} />
      )}

      {modifiable && !aideMasse && (
        <div className="aide-masse__ouvrir">
          <button type="button" className="bouton" onClick={() => setAideMasse(true)}>🤝 Aide en masse</button>
          <span className="discret">Indiquer d'un coup toutes les étapes où {perso.nom} peut aider.</span>
        </div>
      )}
      {modifiable && aideMasse && (
        <AideEnMasse
          key={dofus.id}
          serie={dofus}
          personnageId={perso.id}
          nomPerso={perso.nom}
          aides={aides}
          onAnnuler={() => setAideMasse(false)}
          onFini={async () => {
            setAides(await chargerAides(prefixeDofus(dofus.quetes.map((q) => q.id))));
            setAideMasse(false);
          }}
        />
      )}

      {!commence && (modifiable || souhaits.has(dofus.id)) && (
        <label className="case souhait">
          <input type="checkbox" checked={souhaits.has(dofus.id)} disabled={!modifiable} onChange={basculerSouhait} />
          <strong>Je cherche un groupe pour commencer {categorie.estDofus ? "ce Dofus" : "cette série"}</strong>
        </label>
      )}

      {dofus.avertissement && <p className="encart encart--avertissement">{dofus.avertissement}</p>}

      {(guideDpln || (dofus.liens ?? []).length > 0) && (
        <p className="discret">
          {guideDpln && <><a href={guideDpln} target="_blank" rel="noreferrer">Guide complet sur Dofus pour les Noobs</a>. </>}
          {(dofus.liens ?? []).map((l) => (
            <span key={l.url}><a href={l.url} target="_blank" rel="noreferrer">{l.nom}</a> : {l.description}. </span>
          ))}
        </p>
      )}

      {(dofus.notes ?? []).length > 0 && (
        <p className="encart">
          <strong>À prévoir :</strong> {dofus.notes!.join(". ")}.
        </p>
      )}

      <ol className="liste-quetes">
        {dofus.quetes.map((q, i) => {
          const fait = faites.has(q.id);
          const actuelle = i === etape;
          const prerequis = q.prerequis.map((p) => evaluerPrerequis(p, perso, metiers)).filter((x) => x !== null);
          const ouverte = ouvertes.has(q.id);
          const aidesEtape = aides.filter((a) => a.quete_id === q.id);
          const ici = positions.get(q.id) ?? [];
          const jAide = aidesEtape.some((a) => a.personnage_id === perso.id);
          const donjon = donjonDeLEtape(q.id);
          const aDuDetail = q.contenu.length > 0 || prerequis.length > 0 || (q.ressources ?? []).length > 0 || (q.deroule ?? []).length > 0 || ici.length > 0 || aidesEtape.length > 0 || modifiable;
          const manque = prerequis.some((p) => p.etat === "manque");
          return (
            <li
              key={q.id}
              id={`etape-${q.id}`}
              className={`quete ${fait ? "quete--faite" : ""} ${actuelle ? "quete--actuelle" : ""} ${aDuDetail ? "quete--cliquable" : ""}`}
              onClick={(e) => aDuDetail && clicSurCarte(e, () => basculerOuverture(q.id))}
            >
              {/* La case valide l'étape ; le reste de la carte l'ouvre ou la replie. */}
              <input
                type="checkbox"
                id={q.id}
                checked={fait}
                disabled={!modifiable || enCours}
                onChange={() => basculer(q.id)}
                aria-label={`${fait ? "Décocher" : "Terminer"} : ${q.nom}`}
              />
              <div className="quete__corps">
                <div className="quete__titre">
                  <span className="quete__nom">{i + 1}. {q.nom}</span>
                  <span className="discret">niv. {q.niveauConseille}</span>
                  {actuelle && <span className="badge badge--or">Étape actuelle</span>}
                  {q.facultative && <span className="badge">Facultative</span>}
                  {aidesEtape.length > 0 && (
                    <span className="badge badge--aide" title="Personnages qui peuvent aider sur cette étape">🤝 {aidesEtape.length}</span>
                  )}
                  {!ouverte && manque && <span className="badge badge--alerte">Prérequis manquant</span>}
                  {aDuDetail && (
                    <button
                      type="button"
                      className={`quete__deplier ${ouverte ? "quete__deplier--ouvert" : ""}`}
                      aria-expanded={ouverte}
                      aria-controls={`detail-${q.id}`}
                      aria-label={`${ouverte ? "Replier" : "Déplier"} ${q.nom}`}
                      onClick={() => basculerOuverture(q.id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                  )}
                </div>
                {ouverte && (
                <div id={`detail-${q.id}`} className="quete__detail">
                <div className="etiquettes">
                  {q.contenu.map((c, j) => <Etiquette key={j} contenu={c} />)}
                </div>
                {(q.deroule ?? []).length > 0 && (
                  <details className="quete__deroule">
                    <summary>Déroulé de la quête ({q.deroule!.length} étapes)</summary>
                    <ol>{q.deroule!.map((d, k) => <li key={k}>{d}</li>)}</ol>
                  </details>
                )}
                {donjon && (() => {
                  const dj = donjonDuBoss(q.nom);
                  if (!dj) return null;
                  return (
                    <div className="succes-donjon">
                      <IconeDonjon fichier={dj.icone} titre={`Succès du donjon : ${dj.nom}`} />
                      {dj.succes.map((sx) => (
                        <BoutonDefi
                          key={sx.id}
                          libelle={sx.libelle}
                          description={sx.description}
                          points={sx.points}
                          icone={sx.icone}
                          image={sx.icone ? undefined : imageDonjon(dj.icone)}
                          fait={succes.some((x) => x.personnage_id === perso.id && x.succes_id === sx.id && x.statut === "fait")}
                          faitPar={succes.filter((x) => x.succes_id === sx.id && x.statut === "fait").map((x) => annuaire?.persos.get(x.personnage_id)?.nom ?? "?")}
                          modifiable={modifiable}
                          onBasculer={() => basculerSucces(sx.id)}
                        />
                      ))}
                    </div>
                  );
                })()}
                {donjon && (
                  <div className="donjon-liens">
                    <a href={`${SITE_DPLN}${donjon.page}`} target="_blank" rel="noreferrer">Guide du donjon</a>
                    {donjon.quetes.length > 0 && (
                      <>
                        <span className="discret">Autres quêtes dans ce donjon :</span>
                        {donjon.quetes.map((x) => (
                          <a key={x.page} className="bulle-lien" href={`${SITE_DPLN}${x.page}`} target="_blank" rel="noreferrer" title="Guide de la quête sur Dofus pour les Noobs">
                            {x.nom}
                          </a>
                        ))}
                      </>
                    )}
                  </div>
                )}
                {prerequis.length > 0 && (
                  <ul className="prerequis">
                    {prerequis.map((p, j) => (
                      <li key={j} className={`prerequis--${p.etat}`}>
                        <span className="prerequis__icone" aria-hidden="true">{p.etat === "ok" ? "✓" : p.etat === "manque" ? "✗" : "•"}</span>
                        <span className="sr-only">{p.etat === "ok" ? "Rempli :" : p.etat === "manque" ? "Manquant :" : "Info :"}</span>
                        <span>{p.texte}</span>
                        {p.detail && <span className={p.detail === "à confirmer" ? "discret a-confirmer" : "discret"}>{p.detail}</span>}
                        {p.lien && <Link to={p.lien}>Trouver quelqu'un dans la guilde</Link>}
                      </li>
                    ))}
                  </ul>
                )}
                {q.ressources && q.ressources.length > 0 && (
                  fait ? (
                    <span className="vert discret-taille">{q.ressources.length} ressource{q.ressources.length > 1 ? "s" : ""} réunie{q.ressources.length > 1 ? "s" : ""}</span>
                  ) : (
                    <BlocRessources
                      liste={q.ressources}
                      cochees={ressources}
                      modifiable={modifiable}
                      onBascule={basculerRessource}
                    />
                  )
                )}
                </div>
                )}
              </div>
              {ouverte && ici.length > 0 && (
                <div className="meme-stade">
                  <span className="discret">{actuelle ? "Au même stade" : "En sont à cette étape"}</span>
                  <div className="pastilles">
                    {ici.map((x) => <Pastille key={x.perso.id} perso={x.perso} dispo={x.dispo} taille={30} />)}
                  </div>
                </div>
              )}
              {ouverte && (aidesEtape.length > 0 || modifiable) && (
                <div className="entraide">
                  {aidesEtape.length > 0 && (
                    <>
                      <span className="discret">Peuvent aider</span>
                      <ul className="entraide__liste">
                        {aidesEtape.map((a) => {
                          const x = annuaire?.persos.get(a.personnage_id);
                          if (!x) return null;
                          const dispo = estDispo(annuaire?.membres.get(x.membre_id), x.id);
                          return (
                            <li key={a.personnage_id}>
                              <NomAvecPastille perso={x} dispo={dispo} />
                              {a.note && <span>{a.note}</span>}
                              <span className="discret discret-taille">{ilYa(a.cree_le)}</span>
                              {modifiable && x.id === perso.id && (
                                <button type="button" className="lien-bouton" onClick={() => retirerMonAide(q.id)}>Retirer</button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                  {modifiable && !jAide && (
                    saisieAide?.queteId === q.id ? (
                      <div className="entraide__saisie">
                        <label className="sr-only" htmlFor={`aide-${q.id}`}>Ce que vous pouvez apporter</label>
                        <input
                          id={`aide-${q.id}`}
                          maxLength={140}
                          placeholder="Facultatif : strat connue, DD à accoupler, ressources…"
                          value={saisieAide.note}
                          onChange={(e) => setSaisieAide({ queteId: q.id, note: e.target.value })}
                          onKeyDown={(e) => e.key === "Enter" && validerAide()}
                        />
                        <button type="button" className="bouton bouton--vert" onClick={validerAide}>Je peux aider</button>
                        <button type="button" className="bouton" onClick={() => setSaisieAide(null)}>Annuler</button>
                      </div>
                    ) : (
                      <button type="button" className="lien-bouton" onClick={() => setSaisieAide({ queteId: q.id, note: "" })}>
                        🤝 {perso.nom} peut aider sur cette étape
                      </button>
                    )
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </main>
  );
}

const SITE_DPLN = "https://www.dofuspourlesnoobs.com/";


/** Barre des catégories (Dofus, Frigost, Tour du monde…), partagée avec la page Progression. */
export function BarreCategories({ actif, onChoix, exclure = [] }: { actif: Categorie; onChoix: (c: Categorie) => void; exclure?: string[] }) {
  return (
    <div className="onglets onglets--categories" role="group" aria-label="Catégorie de quêtes">
      {CATEGORIES.filter((c) => !exclure.includes(c.id)).map((c) =>
        aDesQuetes(c) ? (
          <button key={c.id} type="button" className={`onglet ${c.id === actif.id ? "onglet--actif" : ""}`} aria-pressed={c.id === actif.id} onClick={() => onChoix(c)}>
            {c.nom}
          </button>
        ) : (
          <button key={c.id} type="button" className="onglet onglet--vide" disabled>{c.nom} (à venir)</button>
        ),
      )}
    </div>
  );
}

function titreSerie(c: Categorie, s: Dofus): string {
  if (c.estDofus) return `Dofus ${s.nom}`;
  return c.series.length > 1 ? `${c.nom} : ${s.nom}` : s.nom;
}

export function OngletsDofus({ actif, onChoix }: { actif: Dofus; onChoix: (d: Dofus) => void }) {
  return <OngletsSeries series={DOFUS} actif={actif} onChoix={onChoix} libelle="Choix du Dofus" />;
}

/** Mélange une couleur « #rrggbb » avec du blanc (ratio 0 à 1) : texte clair assorti, lisible sur le fond sombre. */
function eclaircir(hex: string, ratio: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * ratio));
  return `rgb(${c.join(", ")})`;
}

function avecOpacite(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Variables CSS d'un onglet de Dofus primordial : bordure, léger fond et texte de sa couleur. */
function couleursPrimordial(d: Dofus): React.CSSProperties {
  const trait = d.accent ?? d.couleur; // l'Ébène, trop sombre, prend sa couleur d'accent
  const clair = d.id === "ivoire"; // une couleur presque blanche : fond plus léger
  return {
    "--c": trait,
    "--t": eclaircir(trait, clair ? 0.3 : 0.45),
    "--f": avecOpacite(d.couleur, clair ? 0.06 : 0.12),
    "--fa": avecOpacite(d.couleur, clair ? 0.14 : 0.26),
  } as React.CSSProperties;
}

export function OngletsSeries({ series, actif, onChoix, libelle }: { series: Dofus[]; actif: Dofus; onChoix: (d: Dofus) => void; libelle: string }) {
  const onglet = (d: Dofus) =>
    d.quetes.length > 0 ? (
      <button
        key={d.id}
        type="button"
        className={`onglet ${d.primordial ? "onglet--primordial" : ""} ${d.id === actif.id ? "onglet--actif" : ""}`}
        style={d.primordial ? couleursPrimordial(d) : undefined}
        aria-pressed={d.id === actif.id}
        onClick={() => onChoix(d)}
      >
        {d.nom}
      </button>
    ) : (
      <button key={d.id} type="button" className="onglet onglet--vide" disabled>{d.nom} (à venir)</button>
    );
  // Les primordiaux sur la première ligne, les autres Dofus en dessous.
  const primordiaux = series.filter((d) => d.primordial);
  const autres = series.filter((d) => !d.primordial);
  if (primordiaux.length === 0) {
    return <div className="onglets" role="group" aria-label={libelle}>{series.map(onglet)}</div>;
  }
  return (
    <div className="onglets-dofus" role="group" aria-label={libelle}>
      <div className="onglets">{primordiaux.map(onglet)}</div>
      {autres.length > 0 && <div className="onglets onglets--secondaires">{autres.map(onglet)}</div>}
    </div>
  );
}

export function Etiquette({ contenu: c }: { contenu: Contenu }) {
  switch (c.type) {
    case "combat":
      return (
        <span className={`etiquette ${c.groupe === undefined ? "etiquette--neutre" : c.groupe ? "etiquette--groupe" : "etiquette--solo"}`}>
          {c.groupe === undefined ? "Combat" : c.groupe ? "Combat de groupe" : c.tactique ? "Tactique solo" : "Solo obligatoire"} : {c.adversaires.join(", ")}
        </span>
      );
    case "donjon":
      return <span className="etiquette etiquette--donjon"><TexteEtats texte={`Donjon : ${c.nom}`} /></span>;
    case "drop_quete":
      return <span className="etiquette etiquette--groupe">{c.quantite} × {c.objet}, {c.monstre} ({c.zone})</span>;
  }
}

function BlocRessources({
  titre = "À réunir",
  liste,
  cochees,
  modifiable,
  onBascule,
}: {
  titre?: string;
  liste: Ressource[];
  cochees: Set<string>;
  modifiable: boolean;
  onBascule: (id: string) => void;
}) {
  const n = liste.filter((r) => cochees.has(r.id)).length;
  return (
    <div className="ressources">
      <div className="ressources__entete">
        <strong>{titre}</strong>
        <span className="discret">{n} / {liste.length}</span>
      </div>
      <ul>
        {liste.map((r) => {
          const ok = cochees.has(r.id);
          return (
            <li key={r.id} className={ok ? "ressource--ok" : ""}>
              <input type="checkbox" id={r.id} checked={ok} disabled={!modifiable} onChange={() => onBascule(r.id)} />
              <label htmlFor={r.id}>
                {r.texte}
                {r.alternative && (
                  <>
                    <span className="ou">OU</span>
                    {r.alternative}
                  </>
                )}
              </label>
              {(r.note || !r.verifie) && (
                <span className={r.verifie ? "discret" : "discret a-confirmer"}>{[r.note, r.verifie ? "" : "à confirmer"].filter(Boolean).join(", ")}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
