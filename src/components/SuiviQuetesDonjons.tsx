import { useEffect, useMemo, useState } from "react";
import { QUETES_DONJONS } from "../data/quetesDonjons";
import { ouEstLaQuete } from "../data/series";
import { chargerEnCoursGuilde, chargerGuilde, chargerQuetesFaites, chargerTerminesParmi, marquerEnCours, marquerQuete } from "../lib/donnees";
import { useSession } from "../lib/session";
import { estDispo, type Membre, type Personnage } from "../lib/types";
import { NomAvecPastille } from "./Pastille";
import { quetesLiees, TOUS_IDS_LIEES } from "./QuetesLiees";

// Onglet Quêtes de la page Donjons : les quêtes qui demandent d'agir dans un donjon, cochées comme partout ailleurs
// (une quête qui est aussi une étape d'une série partage son identifiant, donc sa case), avec qui s'y est positionné.

const sansAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const HORS_SERIE = "Autres quêtes";
const categorieDe = (id: string) => ouEstLaQuete(id)?.categorie.nom ?? HORS_SERIE;
const DONJONS = Object.keys(QUETES_DONJONS).sort((a, b) => a.localeCompare(b)).map((nom) => ({ nom, quetes: quetesLiees(nom) }));
const CATEGORIES_PRESENTES = [...new Set(DONJONS.flatMap((d) => d.quetes.map((q) => categorieDe(q.id))))]
  .sort((a, b) => (a === HORS_SERIE ? 1 : b === HORS_SERIE ? -1 : a.localeCompare(b)));

export function SuiviQuetesDonjons() {
  const { mesPersos } = useSession();
  const [persoId, setPersoId] = useState(() => (mesPersos.find((p) => p.est_principal) ?? mesPersos[0])?.id ?? "");
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState<string | null>(null);
  const [faites, setFaites] = useState<Set<string>>(new Set());
  const [enCours, setEnCours] = useState<Map<string, string[]>>(new Map());
  const [annuaire, setAnnuaire] = useState<{ persos: Map<string, Personnage>; membres: Map<string, Membre> } | null>(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerGuilde().then((g) => setAnnuaire({ persos: new Map(g.personnages.map((x) => [x.id, x])), membres: g.membres as Map<string, Membre> })).catch(() => {});
    // Positionnements, sans ceux des membres qui ont fini la quête entre-temps (cochée depuis la page Quêtes, par exemple).
    chargerEnCoursGuilde(TOUS_IDS_LIEES).then(async (m) => {
      const finis = await chargerTerminesParmi([...m.keys()], [...new Set([...m.values()].flat())]).catch(() => new Set<string>());
      setEnCours(new Map([...m].map(([q, ps]) => [q, ps.filter((p) => !finis.has(`${p}|${q}`))])));
    }).catch(() => setErreur("Impossible de charger les positionnements."));
  }, []);
  useEffect(() => {
    if (!persoId) return;
    chargerQuetesFaites(persoId, TOUS_IDS_LIEES).then(setFaites).catch(() => setErreur("Impossible de charger vos quêtes."));
  }, [persoId]);

  const q = sansAccents(recherche.trim());
  const donjons = useMemo(() => DONJONS
    .map((d) => ({ ...d, quetes: d.quetes.filter((x) => (!categorie || categorieDe(x.id) === categorie) && (!q || sansAccents(x.nom).includes(q) || sansAccents(d.nom).includes(q))) }))
    .filter((d) => d.quetes.length > 0), [q, categorie]);

  const positionne = (id: string) => (enCours.get(id) ?? []).includes(persoId);
  const fixerEnCours = (id: string, oui: boolean) => setEnCours((m) => {
    const n = new Map(m); const l = (n.get(id) ?? []).filter((p) => p !== persoId);
    if (oui) l.push(persoId);
    n.set(id, l); return n;
  });

  // Un seul bouton par quête : à faire → en cours (orange, visible par la guilde) → faite (vert) → à faire.
  async function avancer(id: string) {
    const faite = faites.has(id), enCoursMoi = positionne(id);
    const avant = { faites, enCours };
    const fixerFaite = (oui: boolean) => setFaites((f) => { const n = new Set(f); if (oui) n.add(id); else n.delete(id); return n; });
    try {
      if (faite) { fixerFaite(false); await marquerQuete(persoId, id, false); }
      else if (enCoursMoi) { fixerFaite(true); fixerEnCours(id, false); await marquerQuete(persoId, id, true); await marquerEnCours(persoId, id, false); }
      else { fixerEnCours(id, true); await marquerEnCours(persoId, id, true); }
    } catch { setFaites(avant.faites); setEnCours(avant.enCours); setErreur("La modification n'a pas été enregistrée."); }
  }

  if (!persoId) return <main className="page"><p className="vide">Crée d'abord un personnage dans Mon compte.</p></main>;
  return (
    <main className="page suivi-donjons">
      <p className="discret">Les quêtes qui demandent d'agir dans un donjon. Les cocher ici les coche aussi dans la page Quêtes. Un clic sur la case passe la quête en cours (orange) : la guilde voit que vous cherchez du monde. Un second clic la valide (vert).</p>
      <div className="suivi-donjons__filtres">
        {mesPersos.length > 1 && (
          <select value={persoId} onChange={(e) => setPersoId(e.target.value)} aria-label="Personnage">
            {mesPersos.map((p) => <option key={p.id} value={p.id}>{p.nom} ({p.classe} {p.niveau})</option>)}
          </select>
        )}
        <input type="search" className="donjons__recherche" placeholder="Rechercher une quête ou un donjon…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher" />
      </div>
      <div className="suivi-donjons__categories" role="group" aria-label="Catégorie">
        {[null, ...CATEGORIES_PRESENTES].map((c) => (
          <button key={c ?? "toutes"} type="button" className={`onglet${categorie === c ? " onglet--actif" : ""}`} aria-pressed={categorie === c} onClick={() => setCategorie(c)}>{c ?? "Toutes"}</button>
        ))}
      </div>
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
      {donjons.length === 0 && <p className="vide">Aucune quête ne correspond.</p>}
      <ul className="index-liees">
        {donjons.map((d) => {
          const nbFaites = d.quetes.filter((x) => faites.has(x.id)).length;
          const nbAttente = d.quetes.reduce((n, x) => n + (enCours.get(x.id)?.length ?? 0), 0);
          return (
            <li key={d.nom} className="carte">
              <details open={!!q}>
                <summary>
                  <strong>{d.nom}</strong> <span className="discret-taille">{nbFaites} / {d.quetes.length} faite{d.quetes.length > 1 ? "s" : ""}</span>
                  {nbAttente > 0 && <span className="badge badge--aide" title="Membres positionnés sur une quête de ce donjon">⏳ {nbAttente}</span>}
                </summary>
                <ul className="suivi-donjons__quetes">
                  {d.quetes.map((x) => {
                    const faite = faites.has(x.id);
                    const etat = faite ? "faite" : positionne(x.id) ? "en-cours" : "a-faire";
                    const attente = (enCours.get(x.id) ?? []).map((id) => annuaire?.persos.get(id)).filter((p): p is Personnage => !!p);
                    return (
                      <li key={x.id} className={`suivi-donjons__quete--${etat}`}>
                        <span className="suivi-donjons__nom">
                          <button type="button" className={`etat-quete etat-quete--${etat}`} onClick={() => avancer(x.id)}
                            aria-label={`${x.nom} : ${etat === "faite" ? "faite" : etat === "en-cours" ? "en cours" : "à faire"}. Cliquer pour passer à ${etat === "faite" ? "à faire" : etat === "en-cours" ? "faite" : "en cours"}.`} />
                          <strong>{x.nom}</strong>
                        </span>
                        <span className="discret-taille">niv. {x.niveau} · {categorieDe(x.id)}</span>
                        <div className="discret-taille suivi-donjons__objectif">{x.objectif.split(" ; ").join(" · ")}</div>
                        <div className="suivi-donjons__attente">
                          {attente.length > 0 && (
                            <span>En attente : {attente.map((p, k) => (
                              <span key={p.id}>{k > 0 && ", "}<NomAvecPastille perso={p} dispo={estDispo(annuaire?.membres.get(p.membre_id), p.id)} /></span>
                            ))}</span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
