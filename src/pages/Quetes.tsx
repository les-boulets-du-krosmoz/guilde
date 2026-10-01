import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { Pastille } from "../components/Pastille";
import { DOFUS, type Contenu, type Dofus, type Ressource } from "../data/dofus";
import { chargerGuilde, chargerMetiers, chargerQuetes, chargerRessources, chargerSouhaits, prefixeDofus } from "../lib/donnees";
import { avancement, cocher, decocher, etapeActuelle, evaluerPrerequis } from "../lib/quetes";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import { estDispo, type Membre, type MetierMembre, type Personnage } from "../lib/types";
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
    return <Navigate to={`/quetes/${defaut.id}`} replace />;
  }
  return <QuetesPerso key={persoId} persoId={persoId} />;
}

function QuetesPerso({ persoId }: { persoId: string }) {
  const { membre: moi } = useSession();
  const disponibles = DOFUS.filter((d) => d.quetes.length > 0);
  const [params, setParams] = useSearchParams();
  const dofus = disponibles.find((d) => d.id === params.get("dofus")) ?? disponibles[0];
  const setDofus = (d: Dofus) => setParams({ dofus: d.id }, { replace: true });
  const [ressources, setRessources] = useState<Set<string>>(new Set());
  const [souhaits, setSouhaits] = useState<Set<string>>(new Set());
  const [perso, setPerso] = useState<Personnage | null>(null);
  const [metiers, setMetiers] = useState<MetierMembre[]>([]);
  const [faites, setFaites] = useState<Set<string>>(new Set());
  const [memeStade, setMemeStade] = useState<AuMemeStade>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  // Étapes repliées par défaut : seule l'étape en cours est dépliée.
  const [ouvertes, setOuvertes] = useState<Set<string>>(new Set());
  const [serieOuverte, setSerieOuverte] = useState(false);

  const charger = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("personnages").select("*").eq("id", persoId).single();
      if (error || !data) throw new Error("Ce personnage n'existe pas ou plus.");
      const p = data as Personnage;
      const prefixe = prefixeDofus(dofus.quetes.map((q) => q.id));
      const [m, quetes, guilde, res] = await Promise.all([
        chargerMetiers(p.membre_id),
        chargerQuetes(prefixe),
        chargerGuilde(),
        chargerRessources(p.id),
      ]);
      setRessources(res);
      chargerSouhaits(p.id).then((m) => setSouhaits(m.get(p.id) ?? new Set())).catch(() => undefined);
      const mesFaites = quetes.get(p.id) ?? new Set<string>();
      setPerso(p);
      setMetiers(m);
      setFaites(mesFaites);

      // Qui d'autre travaille sur la même quête ?
      const monEtape = etapeActuelle(dofus, mesFaites);
      setMemeStade(
        guilde.personnages
          .filter((x) => x.id !== p.id && etapeActuelle(dofus, quetes.get(x.id) ?? new Set()) === monEtape)
          .map((x) => ({ perso: x, dispo: estDispo(guilde.membres.get(x.membre_id) as Membre | undefined, x.id) })),
      );
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

  return (
    <main className="page">
      <div className="entete">
        <div>
          <Link to={`/perso/${perso.id}`}>Retour à {perso.nom} ({perso.classe} {perso.niveau})</Link>
          <h1>{modifiable ? `Dofus ${dofus.nom}` : `${perso.nom} · Dofus ${dofus.nom}`}</h1>
          <p className="discret">Succès « {dofus.succes} » · {total} quêtes{dofus.quetes.length > total ? ` + ${dofus.quetes.length - total} facultative` : ""}</p>
        </div>
        <div className="progression-globale">
          <span><strong className="vert">{terminees}</strong> / {total} terminées</span>
          <div className="barre barre--large" aria-hidden="true"><div style={{ width: `${(terminees / total) * 100}%` }} /></div>
        </div>
      </div>

      <OngletsDofus actif={dofus} onChoix={setDofus} />

      {!modifiable && <p className="discret">Tu consultes la progression de {perso.nom} : les cases ne sont pas modifiables.</p>}

      {!commence && (modifiable || souhaits.has(dofus.id)) && (
        <label className="case souhait">
          <input type="checkbox" checked={souhaits.has(dofus.id)} disabled={!modifiable} onChange={basculerSouhait} />
          <span>
            <strong>Je veux commencer ce Dofus</strong>
            <span className="discret"> · tu apparais dans les objectifs de groupe de la première quête</span>
          </span>
        </label>
      )}

      {dofus.avertissement && <p className="encart encart--avertissement">{dofus.avertissement}</p>}

      {((dofus.sources ?? []).length > 0 || (dofus.liens ?? []).length > 0) && (
        <p className="discret">
          {(dofus.sources ?? []).length > 0 && <>Sources : {dofus.sources!.map((src, i) => (
            <span key={src.url}>{i > 0 && ", "}<a href={src.url} target="_blank" rel="noreferrer">{src.nom}</a></span>
          ))}. </>}
          {(dofus.liens ?? []).map((l) => (
            <span key={l.url}>Outil : <a href={l.url} target="_blank" rel="noreferrer">{l.nom}</a> ({l.description}). </span>
          ))}
        </p>
      )}

      {(dofus.ressourcesSerie ?? []).length > 0 && (
        <div className="serie">
          <button type="button" className="bouton" aria-expanded={serieOuverte} onClick={() => setSerieOuverte(!serieOuverte)}>
            {serieOuverte ? "Masquer" : "Afficher"} les ressources de toute la série
            ({dofus.ressourcesSerie!.filter((r) => ressources.has(r.id)).length} / {dofus.ressourcesSerie!.length} réunies)
          </button>
          {serieOuverte && (
            <BlocRessources
              titre="À réunir pour toute la série"
              liste={dofus.ressourcesSerie!}
              cochees={ressources}
              modifiable={modifiable}
              onBascule={basculerRessource}
            />
          )}
        </div>
      )}

      {(dofus.notes ?? []).length > 0 && (
        <p className="encart">
          <strong>À prévoir aussi :</strong> {dofus.notes!.join(" · ")}
        </p>
      )}

      <ol className="liste-quetes">
        {dofus.quetes.map((q, i) => {
          const fait = faites.has(q.id);
          const actuelle = i === etape;
          const prerequis = q.prerequis.map((p) => evaluerPrerequis(p, perso, metiers)).filter((x) => x !== null);
          const ouverte = ouvertes.has(q.id);
          const aDuDetail = q.contenu.length > 0 || prerequis.length > 0 || (q.ressources ?? []).length > 0 || (actuelle && memeStade.length > 0);
          const manque = prerequis.some((p) => p.etat === "manque");
          return (
            <li key={q.id} id={`etape-${q.id}`} className={`quete ${fait ? "quete--faite" : ""} ${actuelle ? "quete--actuelle" : ""}`}>
              <input
                type="checkbox"
                id={q.id}
                checked={fait}
                disabled={!modifiable || enCours}
                onChange={() => basculer(q.id)}
              />
              <div className="quete__corps">
                <div className="quete__titre">
                  <label htmlFor={q.id}>{i + 1}. {q.nom}</label>
                  <span className="discret">niv. {q.niveauConseille}</span>
                  {actuelle && <span className="badge badge--or">Étape actuelle</span>}
                  {q.facultative && <span className="badge">Facultative</span>}
                  {!ouverte && manque && <span className="badge badge--alerte">Prérequis manquant</span>}
                  {aDuDetail && (
                    <button
                      type="button"
                      className="quete__deplier"
                      aria-expanded={ouverte}
                      aria-controls={`detail-${q.id}`}
                      onClick={() => basculerOuverture(q.id)}
                    >
                      {ouverte ? "Replier" : "Détails"}
                    </button>
                  )}
                </div>
                {ouverte && (
                <div id={`detail-${q.id}`} className="quete__detail">
                <div className="etiquettes">
                  {q.contenu.map((c, j) => <Etiquette key={j} contenu={c} />)}
                </div>
                {prerequis.length > 0 && (
                  <ul className="prerequis">
                    {prerequis.map((p, j) => (
                      <li key={j} className={`prerequis--${p.etat}`}>
                        <span className="prerequis__icone" aria-hidden="true">{p.etat === "ok" ? "✓" : p.etat === "manque" ? "✗" : "•"}</span>
                        <span className="sr-only">{p.etat === "ok" ? "Rempli :" : p.etat === "manque" ? "Manquant :" : "Info :"}</span>
                        <span>{p.texte}</span>
                        <span className="discret">{p.detail}</span>
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
              {ouverte && actuelle && memeStade.length > 0 && (
                <div className="meme-stade">
                  <span className="discret">Au même stade</span>
                  <div className="pastilles">
                    {memeStade.map((x) => <Pastille key={x.perso.id} perso={x.perso} dispo={x.dispo} taille={30} />)}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </main>
  );
}

export function OngletsDofus({ actif, onChoix }: { actif: Dofus; onChoix: (d: Dofus) => void }) {
  return (
    <div className="onglets" role="group" aria-label="Choix du Dofus">
      {DOFUS.map((d) =>
        d.quetes.length > 0 ? (
          <button key={d.id} type="button" className={`onglet ${d.id === actif.id ? "onglet--actif" : ""}`} aria-pressed={d.id === actif.id} onClick={() => onChoix(d)}>
            {d.nom}
          </button>
        ) : (
          <button key={d.id} type="button" className="onglet onglet--vide" disabled>{d.nom} · à venir</button>
        ),
      )}
    </div>
  );
}

export function Etiquette({ contenu: c }: { contenu: Contenu }) {
  switch (c.type) {
    case "combat":
      return (
        <span className={`etiquette ${c.groupe === undefined ? "etiquette--neutre" : c.groupe ? "etiquette--groupe" : "etiquette--solo"}`}>
          {c.groupe === undefined ? "Combat" : c.groupe ? "Combat de groupe" : c.tactique ? "Tactique solo" : "Solo obligatoire"} · {c.adversaires.join(", ")}
        </span>
      );
    case "donjon":
      return <span className="etiquette etiquette--donjon">Donjon · {c.nom}</span>;
    case "drop_quete":
      return <span className="etiquette etiquette--groupe">{c.quantite} × {c.objet} · {c.monstre} ({c.zone})</span>;
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
        <span className="discret">{n} / {liste.length} réunies</span>
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
                <span className="discret">{[r.note, r.verifie ? "" : "à confirmer"].filter(Boolean).join(" · ")}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
