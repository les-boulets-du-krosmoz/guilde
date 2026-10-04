import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Etat, TexteEtats } from "../components/Etat";
import { Pastille } from "../components/Pastille";
import { clicSurCarte } from "../lib/clicCarte";
import { AVIS, REGIONS, recompense, urlAvis, type Avis } from "../data/avis";
import { definitionEtat } from "../data/etats";
import { SimulateurParchos } from "../components/SimulateurParchos";
import { chargerAvis, chargerGuilde, type DonneesGuilde, type EtatAvis, type LigneAvis } from "../lib/donnees";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import { estDispo, type Personnage } from "../lib/types";
import { Chargement } from "./Acces";

type Filtre = "tous" | "a_faire" | "livre";

const FILTRES: { id: Filtre; libelle: string }[] = [
  { id: "tous", libelle: "Tous" },
  { id: "a_faire", libelle: "À faire" },
  { id: "livre", libelle: "Livrés" },
];

type Chasseur = { perso: Personnage; dispo: boolean };

export function AvisRecherche() {
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
    return <Navigate to={`/avis/${defaut.id}`} replace />;
  }
  return <AvisPerso key={persoId} persoId={persoId} />;
}

function AvisPerso({ persoId }: { persoId: string }) {
  const { membre: moi, mesPersos } = useSession();
  const naviguer = useNavigate();
  const [perso, setPerso] = useState<Personnage | null>(null);
  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const [lignes, setLignes] = useState<LigneAvis[]>([]);
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const [ouvert, setOuvert] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [alerte, setAlerte] = useState<string | null>(null);
  const [occupe, setOccupe] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from("personnages").select("*").eq("id", persoId).single();
        if (error || !data) throw new Error("Ce personnage n'existe pas ou plus.");
        const [g, a] = await Promise.all([chargerGuilde(), chargerAvis()]);
        setPerso(data as Personnage);
        setGuilde(g);
        setLignes(a);
      } catch (e) {
        setErreur((e as Error).message);
      }
    })();
  }, [persoId]);

  const mesEtats = useMemo(
    () => new Map(lignes.filter((l) => l.personnage_id === persoId).map((l) => [l.avis_id, l.etat])),
    [lignes, persoId],
  );

  // Qui d'autre dans la guilde cherche un groupe pour chaque avis.
  const chasseurs = useMemo(() => {
    const res = new Map<string, Chasseur[]>();
    if (!guilde) return res;
    const persos = new Map(guilde.personnages.map((p) => [p.id, p]));
    for (const l of lignes) {
      if (l.etat !== "en_cours" || l.personnage_id === persoId) continue;
      const p = persos.get(l.personnage_id);
      if (!p) continue;
      if (!res.has(l.avis_id)) res.set(l.avis_id, []);
      res.get(l.avis_id)!.push({ perso: p, dispo: estDispo(guilde.membres.get(p.membre_id), p.id) });
    }
    return res;
  }, [lignes, guilde, persoId]);

  // Pour chaque avis : qui l'a déjà livré, et qui peut encore le faire (prérequis remplis, pas déjà en chasse).
  const porteurs = useMemo(() => {
    const res = new Map<string, { livre: Chasseur[]; pasEncore: Chasseur[] }>();
    if (!guilde) return res;
    const livres = new Set(lignes.filter((l) => l.etat === "livre").map((l) => `${l.personnage_id}:${l.avis_id}`));
    const enChasse = new Set(lignes.filter((l) => l.etat === "en_cours").map((l) => `${l.personnage_id}:${l.avis_id}`));
    for (const a of AVIS) {
      const r = { livre: [] as Chasseur[], pasEncore: [] as Chasseur[] };
      for (const p of guilde.personnages) {
        const c = { perso: p, dispo: estDispo(guilde.membres.get(p.membre_id), p.id) };
        if (livres.has(`${p.id}:${a.id}`)) r.livre.push(c);
        else if (!enChasse.has(`${p.id}:${a.id}`) && raisonVerrou(a, p) === null) r.pasEncore.push(c);
      }
      res.set(a.id, r);
    }
    return res;
  }, [lignes, guilde]);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!perso || !guilde) return <Chargement />;

  const modifiable = perso.membre_id === moi?.id;
  const avisLivres = AVIS.filter((a) => mesEtats.get(a.id) === "livre");
  const livres = avisLivres.length;
  const somme = (champ: "avitons" | "alitons" | "kamasGlace") => avisLivres.reduce((s, a) => s + (a[champ] ?? 0), 0);

  const visible = (a: Avis) => {
    const fait = mesEtats.get(a.id) === "livre";
    return filtre === "tous" || (filtre === "livre" ? fait : !fait);
  };

  async function changer(avisId: string, etat: EtatAvis | null) {
    if (!modifiable || occupe) return;
    const avant = lignes;
    const autres = lignes.filter((l) => !(l.personnage_id === persoId && l.avis_id === avisId));
    setLignes(etat ? [...autres, { personnage_id: persoId, avis_id: avisId, etat, maj_le: new Date().toISOString() }] : autres);
    setOccupe(true);
    setAlerte(null);
    const { error } = etat
      ? await supabase.from("avis_personnage").upsert({ personnage_id: persoId, avis_id: avisId, etat })
      : await supabase.from("avis_personnage").delete().eq("personnage_id", persoId).eq("avis_id", avisId);
    if (error) {
      setLignes(avant);
      setAlerte("Le changement n'a pas été enregistré : " + error.message);
    }
    setOccupe(false);
  }

  const regions = REGIONS.map((r) => {
    const toutes = AVIS.filter((a) => a.region === r.id);
    return { region: r, toutes, liste: toutes.filter(visible) };
  }).filter((x) => x.liste.length > 0);

  return (
    <main className="page page--etroite">
      <div className="entete">
        <div>
          {!modifiable && <Link to={`/perso/${perso.id}`}>Retour à {perso.nom}</Link>}
          <h1>{modifiable ? "Avis de recherche" : `Avis de recherche de ${perso.nom}`}</h1>
          <p className="discret">{livres} / {AVIS.length} livrés</p>
          <p className="legende-avis">
            <span className="a-confirmer">En orange</span> : informations à confirmer en jeu.{" "}
            <span className="etat" tabIndex={-1}>Souligné en pointillés</span> : survolez pour la définition de l'état.
          </p>
        </div>
        {modifiable && mesPersos.length > 1 && (
          <div className="champ">
            <label htmlFor="avis-perso">Personnage</label>
            <select id="avis-perso" value={perso.id} onChange={(e) => naviguer(`/avis/${e.target.value}`)}>
              {mesPersos.map((p) => <option key={p.id} value={p.id}>{p.nom}, {p.classe} niveau {p.niveau}</option>)}
            </select>
          </div>
        )}
      </div>

      <SimulateurParchos
        key={perso.id}
        personnageId={perso.id}
        modifiable={modifiable}
        depensesInitiales={perso.doplons_depenses ?? 0}
        doplonsGagnes={somme("avitons")}
        alitons={somme("alitons")}
        kamasGlace={somme("kamasGlace")}
      />

      <div className="onglets" role="group" aria-label="Filtrer les avis">
        {FILTRES.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`onglet ${f.id === filtre ? "onglet--actif" : ""}`}
            aria-pressed={f.id === filtre}
            onClick={() => setFiltre(f.id)}
          >
            {f.libelle}
          </button>
        ))}
      </div>

      {alerte && <p className="erreur" role="alert">{alerte}</p>}
      {regions.length === 0 && <p className="vide">Aucun avis dans cette catégorie.</p>}

      {regions.map(({ region, toutes, liste }) => (
        <section key={region.id} className="region-avis" aria-labelledby={`region-${region.id}`}>
          <div className="carte__entete">
            <h2 id={`region-${region.id}`}>{region.nom}</h2>
            <span className="discret">
              {toutes.filter((a) => mesEtats.get(a.id) === "livre").length} / {toutes.length} livrés
            </span>
          </div>
          <ul className="liste-lignes-avis">
            {liste.map((a) => (
              <LigneAvisUI
                key={a.id}
                avis={a}
                etat={mesEtats.get(a.id)}
                perso={perso}
                chasseurs={chasseurs.get(a.id) ?? []}
                livrePar={porteurs.get(a.id)?.livre ?? []}
                pasEncore={porteurs.get(a.id)?.pasEncore ?? []}
                modifiable={modifiable}
                occupe={occupe}
                ouvert={ouvert === a.id}
                onDeplier={() => setOuvert(ouvert === a.id ? null : a.id)}
                onChange={(e) => changer(a.id, e)}
              />
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

/** Prérequis court affiché sur la ligne : niveau du personnage, niveau d'alignement ou rang d'ordre. */
function libellePrerequis(a: Avis): string | null {
  if (a.niveau !== undefined) return `Niv. ${a.niveau}`;
  if (a.ordreMin !== undefined) return `Ordre ${a.ordreMin}`;
  if (a.alignementMin !== undefined) return `Align. ${a.alignementMin}`;
  return null;
}

/**
 * Raison du cadenas, ou null si le personnage peut prendre l'avis.
 * Une valeur d'alignement non renseignée sur la fiche ne verrouille pas : on ne bloque pas un membre
 * sur une donnée qu'il n'a pas encore saisie.
 */
function raisonVerrou(a: Avis, p: Personnage): string | null {
  if (a.niveau !== undefined && p.niveau < a.niveau) return `Niveau ${a.niveau} requis, ${p.nom} est niveau ${p.niveau}.`;
  if (a.alignementMin === undefined && a.ordreMin === undefined) return null;
  if (p.alignement === "Neutre") return `Il faut être aligné à Bonta ou Brâkmar, ${p.nom} est neutre.`;
  if (a.alignementMin !== undefined && p.niveau_quete_alignement !== null && p.niveau_quete_alignement < a.alignementMin) {
    return `Niveau d'alignement ${a.alignementMin} requis, ${p.nom} est à ${p.niveau_quete_alignement}.`;
  }
  if (a.ordreMin !== undefined && p.rang_ordre !== null && p.rang_ordre < a.ordreMin) {
    return `Ordre ${a.ordreMin} requis, ${p.nom} est au rang ${p.rang_ordre}.`;
  }
  return null;
}

function Cadenas({ ouvert }: { ouvert: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d={ouvert ? "M8 11V7a4 4 0 0 1 7.5-2" : "M8 11V7a4 4 0 0 1 8 0v4"} />
    </svg>
  );
}

function LigneAvisUI({
  avis: a,
  etat,
  perso,
  chasseurs,
  livrePar,
  pasEncore,
  modifiable,
  occupe,
  ouvert,
  onDeplier,
  onChange,
}: {
  avis: Avis;
  etat: EtatAvis | undefined;
  perso: Personnage;
  chasseurs: Chasseur[];
  livrePar: Chasseur[];
  pasEncore: Chasseur[];
  modifiable: boolean;
  occupe: boolean;
  ouvert: boolean;
  onDeplier: () => void;
  onChange: (etat: EtatAvis | null) => void;
}) {
  const fait = etat === "livre";
  const cherche = etat === "en_cours";
  const prerequis = libellePrerequis(a);
  const raison = fait ? null : raisonVerrou(a, perso);
  const verrou = raison !== null;
  const url = urlAvis(a);
  const idCase = `avis-${a.id}`;
  const idDetail = `detail-${a.id}`;

  return (
    <li
      className={`ligne-avis ligne-avis--cliquable ${ouvert ? "ligne-avis--ouverte" : fait ? "ligne-avis--faite" : ""} ${verrou ? "ligne-avis--verrou" : ""}`}
      onClick={(e) => clicSurCarte(e, onDeplier)}
    >
      <div className="ligne-avis__tete">
        {/* La case marque l'avis livré ; le reste de la ligne l'ouvre ou le replie. */}
        <input
          type="checkbox"
          id={idCase}
          checked={fait}
          disabled={!modifiable || occupe || verrou}
          onChange={() => onChange(fait ? null : "livre")}
          aria-label={`${fait ? "Décocher" : "Marquer livré"} : ${a.nom}`}
        />
        <span className="ligne-avis__nom">{a.nom}</span>
        {a.protection && (
          <Etat texte={a.protection} definition={definitionEtat(a.protection) ?? a.protection} className="etiquette etiquette--avis" />
        )}
        {prerequis && !fait && (
          <span className={`prerequis-avis ${verrou ? "prerequis-avis--verrou" : ""}`}>
            <Cadenas ouvert={!verrou} />
            <span>{prerequis}</span>
            <span className="sr-only">{verrou ? ", verrouillé" : ", accessible"}</span>
          </span>
        )}
        {!ouvert && cherche && <span className="etiquette etiquette--groupe">Cherche un groupe</span>}
        {!ouvert && chasseurs.length > 0 && <span className="discret">{chasseurs.length} en chasse</span>}
        <span className="ligne-avis__recompense">{recompense(a)}</span>
        <button
          type="button"
          className="ligne-avis__deplier"
          aria-expanded={ouvert}
          aria-controls={idDetail}
          aria-label={`${ouvert ? "Replier" : "Déplier"} ${a.nom}`}
          onClick={onDeplier}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {verrou && (
        <p className="ligne-avis__verrou">
          {raison}{" "}
          {modifiable && <Link to="/mon-compte">Mettre à jour la fiche</Link>}
        </p>
      )}

      {ouvert && (
        <div id={idDetail} className="ligne-avis__detail">
          {a.zone || a.strategie ? (
            <div className="ligne-avis__infos">
              <div className="ligne-avis__lieux">
                {a.zone && <div><span className="discret">Où le trouver</span><div><TexteEtats texte={a.zone} /></div></div>}
                {a.milice && <div><span className="discret">Avis et livraison</span><div><TexteEtats texte={a.milice} /></div></div>}
                {(a.niveau !== undefined || a.acces) && (
                  <div>
                    <span className="discret">Prérequis</span>
                    <ul>
                      {a.niveau !== undefined && <li>Niveau {a.niveau}</li>}
                      {(a.acces ?? []).map((t) => <li key={t}><TexteEtats texte={t} /></li>)}
                    </ul>
                  </div>
                )}
              </div>
              {a.strategie && (
                <div>
                  <span className="discret">Combat</span>
                  <ul>{a.strategie.map((t) => <li key={t}><TexteEtats texte={t} /></li>)}</ul>
                </div>
              )}
            </div>
          ) : (
            <p className="discret">Pas encore de résumé pour cet avis.</p>
          )}
          <div className="ligne-avis__bas">
            <div className="ligne-avis__groupe">
              {modifiable && !fait && (
                <label className="case">
                  <input type="checkbox" checked={cherche} disabled={occupe || verrou} onChange={() => onChange(cherche ? null : "en_cours")} />
                  Je cherche un groupe pour cet avis
                </label>
              )}
              {chasseurs.length > 0 && (
                <div className="pastilles pastilles--serrees">
                  {chasseurs.map((c) => <Pastille key={c.perso.id} perso={c.perso} dispo={c.dispo} taille={28} />)}
                  <span className="discret">
                    {chasseurs.length} autre{chasseurs.length > 1 ? "s" : ""} en chasse
                  </span>
                </div>
              )}
            </div>
            {url && <a href={url} target="_blank" rel="noreferrer">Guide complet sur Dofus pour les Noobs</a>}
          </div>
          <div className="ligne-avis__membres">
            <div>
              <span className="discret">{livrePar.length > 0 ? `Livré par ${livrePar.length} personnage${livrePar.length > 1 ? "s" : ""}` : "Personne ne l'a encore livré"}</span>
              {livrePar.length > 0 && (
                <div className="pastilles pastilles--serrees">
                  {livrePar.map((c) => <Pastille key={c.perso.id} perso={c.perso} dispo={c.dispo} taille={28} />)}
                </div>
              )}
            </div>
            <div>
              <span className="discret">
                {pasEncore.length > 0 ? `Pas encore livré par ${pasEncore.length} personnage${pasEncore.length > 1 ? "s" : ""} qui remplissent les prérequis` : "Tous ceux qui remplissent les prérequis l'ont livré ou le chassent"}
              </span>
              {pasEncore.length > 0 && (
                <div className="pastilles pastilles--serrees">
                  {pasEncore.map((c) => <Pastille key={c.perso.id} perso={c.perso} dispo={c.dispo} taille={28} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
