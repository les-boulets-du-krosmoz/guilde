import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChoixMembres } from "../components/ChoixMembres";
import { Pastille } from "../components/Pastille";
import { ilYa } from "../lib/dates";
import {
  absenceLe, caseDe, disposSur, JOURS, JOURS_COURTS, libelleCase, meilleursCreneaux, prochaineDate, TRANCHES, versChampDate, type Absence, type Dispos,
} from "../lib/disponibilites";
import { ajouterAbsence, chargerAbsences, chargerDispos, chargerGuilde, enregistrerDispos, supprimerAbsence, type DonneesGuilde } from "../lib/donnees";
import { useSession } from "../lib/session";
import type { Personnage } from "../lib/types";
import { Chargement } from "./Acces";

/**
 * Calendrier : sa semaine type (cases où l'on est habituellement dispo), la vue de toute la guilde,
 * et la recherche d'un créneau commun avec les membres choisis (« je veux faire ça avec lui et lui »).
 */
export function Calendrier() {
  const { membre } = useSession();
  const navigate = useNavigate();
  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const [dispos, setDispos] = useState<Dispos>(new Map());
  const [majLe, setMajLe] = useState<Map<string, string>>(new Map());
  const [erreur, setErreur] = useState<string | null>(null);
  const [choisis, setChoisis] = useState<string[]>([]);
  const [caseVue, setCaseVue] = useState<number | null>(null);
  const [enregistre, setEnregistre] = useState(false);
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [nouvelle, setNouvelle] = useState({ debut: "", fin: "", motif: "" });

  useEffect(() => {
    Promise.all([chargerGuilde(), chargerDispos(), chargerAbsences()])
      .then(([g, d, a]) => { setGuilde(g); setDispos(d.dispos); setMajLe(d.majLe); setAbsences(a); })
      .catch((e) => setErreur((e as Error).message));
  }, []);
  // Par défaut, la recherche de créneau part de soi.
  useEffect(() => { if (membre && choisis.length === 0) setChoisis([membre.id]); }, [membre]); // eslint-disable-line react-hooks/exhaustive-deps

  const principal = useMemo(() => {
    const m = new Map<string, Personnage>();
    for (const p of guilde?.personnages ?? []) if (!m.has(p.membre_id) || p.est_principal) m.set(p.membre_id, p);
    return m;
  }, [guilde]);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!guilde || !membre) return <Chargement />;

  const miennes = dispos.get(membre.id) ?? new Set<number>();
  const membresValides = [...guilde.membres.values()].filter((m) => m.valide);
  const groupe = choisis.length > 1 ? choisis : null; // une seule personne : on montre toute la guilde
  const total = groupe ? groupe.length : dispos.size;
  const creneaux = groupe ? meilleursCreneaux(dispos, groupe, 4, absences) : [];
  const mesAbsences = absences.filter((a) => a.membre_id === membre.id);
  const dateCourte = (j: string) => new Date(`${j}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });

  async function ajouter() {
    if (!nouvelle.debut) { setErreur("Indique au moins le premier jour d'absence."); return; }
    const fin = nouvelle.fin && nouvelle.fin >= nouvelle.debut ? nouvelle.fin : nouvelle.debut;
    try {
      await ajouterAbsence(membre!.id, nouvelle.debut, fin, nouvelle.motif.trim() || null);
      setAbsences(await chargerAbsences());
      setNouvelle({ debut: "", fin: "", motif: "" });
    } catch (e) { setErreur((e as Error).message); }
  }
  async function retirer(id: string) {
    try { await supprimerAbsence(id); setAbsences(absences.filter((a) => a.id !== id)); } catch (e) { setErreur((e as Error).message); }
  }
  const pseudo = (id: string) => guilde.membres.get(id)?.pseudo ?? "?";

  async function basculer(c: number) {
    const nouvelles = new Set(miennes);
    if (nouvelles.has(c)) nouvelles.delete(c); else nouvelles.add(c);
    setDispos(new Map(dispos).set(membre!.id, nouvelles)); // affichage immédiat
    try {
      await enregistrerDispos(membre!.id, [...nouvelles]);
      setMajLe(new Map(majLe).set(membre!.id, new Date().toISOString()));
      setEnregistre(true); setTimeout(() => setEnregistre(false), 1500);
    } catch (e) {
      setErreur((e as Error).message);
    }
  }

  function proposer(c: number) {
    const invites = choisis.filter((id) => id !== membre!.id);
    const q = new URLSearchParams({ nouvelle: "1", date: versChampDate(prochaineDate(c)) });
    if (invites.length) q.set("invites", invites.join(","));
    navigate(`/groupes?${q.toString()}`);
  }

  const grille = (rendu: (c: number) => React.ReactNode, titre: string) => (
    <div className="cal-grille" role="grid" aria-label={titre}>
      <span />
      {JOURS_COURTS.map((j) => <span key={j} className="cal-grille__jour" role="columnheader">{j}</span>)}
      {TRANCHES.map((t, ti) => (
        <div key={t.nom} className="cal-grille__ligne" role="row">
          <span className="cal-grille__tranche" title={t.plage}>{t.nom}</span>
          {JOURS.map((_, ji) => rendu(caseDe(ji, ti)))}
        </div>
      ))}
    </div>
  );

  const vus = caseVue !== null ? disposSur(dispos, caseVue, groupe ?? undefined, absences) : [];
  const absentsVue = caseVue !== null && groupe ? groupe.filter((id) => !vus.includes(id)) : [];
  // Membres habituellement là sur ce créneau, mais absents à sa prochaine date (vacances…).
  const enAbsence = caseVue !== null ? [...dispos.entries()]
    .filter(([id, cases]) => cases.has(caseVue) && (!groupe || groupe.includes(id)))
    .map(([id]) => ({ id, a: absenceLe(absences, id, prochaineDate(caseVue)) }))
    .filter((x): x is { id: string; a: Absence } => !!x.a) : [];

  return (
    <main className="page">
      <div className="entete">
        <div>
          <h1>Calendrier</h1>
          <p className="discret">Les disponibilités habituelles de la guilde, semaine type, par tranche.</p>
        </div>
      </div>

      <div className="calendrier-page">
        <section className="carte cal-trouver">
          <h2>Trouver un créneau</h2>
          <p className="discret">Choisis avec qui tu veux faire une quête ou un donjon : le site cherche les moments où vous êtes dispo ensemble.</p>
          <ChoixMembres membres={membresValides} persos={guilde.personnages} choisis={choisis} onChange={(ids) => { setChoisis(ids); setCaseVue(null); }} />
          {groupe && (
            creneaux.length === 0 ? (
              <p className="vide">Aucun créneau en commun : certains n'ont pas encore rempli leurs disponibilités.</p>
            ) : (
              <ul className="cal-creneaux">
                {creneaux.map(({ c, dispo }) => (
                  <li key={c} className={dispo.length === groupe.length ? "cal-creneau--complet" : ""}>
                    <div>
                      <strong>{libelleCase(c)}</strong> <span className="discret">({TRANCHES[c % TRANCHES.length].plage})</span>
                      <span className={`cal-creneau__nb ${dispo.length === groupe.length ? "vert" : ""}`}> {dispo.length} sur {groupe.length} dispo</span>
                      {dispo.length < groupe.length && (
                        <span className="discret-taille"> · sans {groupe.filter((id) => !dispo.includes(id)).map(pseudo).join(", ")}</span>
                      )}
                    </div>
                    <button type="button" className="bouton bouton--petit bouton--vert" onClick={() => proposer(c)}>
                      Proposer une sortie {prochaineDate(c).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                    </button>
                  </li>
                ))}
              </ul>
            )
          )}
          {!groupe && <p className="discret-taille">Ajoute au moins une autre personne pour voir vos créneaux communs.</p>}
        </section>

        <section className="carte">
          <div className="carte__entete">
            <h2>{groupe ? "Le groupe choisi" : "La guilde"}</h2>
            <span className="discret">{groupe ? `${groupe.length} membres` : `${dispos.size} planning${dispos.size > 1 ? "s" : ""} rempli${dispos.size > 1 ? "s" : ""}`} · les 7 prochains jours, absences comprises</span>
          </div>
          {grille((c) => {
            const n = disposSur(dispos, c, groupe ?? undefined, absences).length;
            const part = total ? n / total : 0;
            return (
              <button key={c} type="button" role="gridcell" className={`cal-case cal-case--chaleur ${caseVue === c ? "cal-case--vue" : ""} ${groupe && n === groupe.length ? "cal-case--tous" : ""}`}
                style={{ "--part": part } as React.CSSProperties} aria-label={`${libelleCase(c)} : ${n} dispo`} onClick={() => setCaseVue(caseVue === c ? null : c)}>
                {n || ""}
              </button>
            );
          }, groupe ? "Disponibilités du groupe choisi" : "Disponibilités de la guilde")}
          {caseVue !== null && (
            <div className="cal-vue">
              <strong>{libelleCase(caseVue)}</strong> <span className="discret">({TRANCHES[caseVue % TRANCHES.length].plage})</span> : {vus.length} dispo
              <div className="pastilles pastilles--serrees cal-vue__membres">
                {vus.map((id) => principal.get(id)
                  ? <span key={id} className="cal-vue__membre"><Pastille perso={principal.get(id)!} taille={26} /> {pseudo(id)}</span>
                  : <span key={id}>{pseudo(id)}</span>)}
              </div>
              {enAbsence.length > 0 && (
                <div className="cal-vue__absents">
                  <span className="discret-taille">Absents le {prochaineDate(caseVue).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} :</span>
                  <div className="pastilles pastilles--serrees">
                    {enAbsence.map((x) => principal.get(x.id)
                      ? <span key={x.id} className="cal-vue__membre"><Pastille perso={principal.get(x.id)!} taille={26} absent /> {pseudo(x.id)}{x.a.motif ? <span className="discret"> ({x.a.motif})</span> : null}</span>
                      : <span key={x.id}>{pseudo(x.id)}</span>)}
                  </div>
                </div>
              )}
              {absentsVue.length > 0 && <p className="discret-taille">Pas dispo : {absentsVue.map(pseudo).join(", ")}</p>}
              {groupe && <button type="button" className="bouton bouton--petit bouton--vert" onClick={() => proposer(caseVue)}>Proposer une sortie sur ce créneau</button>}
            </div>
          )}
        </section>

        <section className="carte">
          <div className="carte__entete">
            <h2>Mes disponibilités</h2>
            <span className="discret">{enregistre ? "Enregistré ✓" : majLe.get(membre.id) ? `mis à jour ${ilYa(majLe.get(membre.id)!)}` : "pas encore rempli"}</span>
          </div>
          <p className="discret">Coche les tranches où tu es habituellement dispo. Chaque clic est enregistré.</p>
          {grille((c) => (
            <button key={c} type="button" role="gridcell" aria-pressed={miennes.has(c)} className={`cal-case ${miennes.has(c) ? "cal-case--mienne" : ""}`}
              aria-label={`${libelleCase(c)} : ${miennes.has(c) ? "dispo" : "pas dispo"}`} onClick={() => basculer(c)}>
              {miennes.has(c) ? "✓" : ""}
            </button>
          ), "Mes disponibilités")}
          <p className="discret-taille">{TRANCHES.map((t) => `${t.nom} ${t.plage}`).join(" · ")}</p>

          <h3 className="cal-absences__titre">Mes absences</h3>
          <p className="discret">Vacances, déplacement… : pendant ces jours, tu ne comptes pas dans les créneaux proposés.</p>
          {mesAbsences.length > 0 && (
            <ul className="cal-absences">
              {mesAbsences.map((a) => (
                <li key={a.id}>
                  <span>{a.debut === a.fin ? `Le ${dateCourte(a.debut)}` : `Du ${dateCourte(a.debut)} au ${dateCourte(a.fin)}`}{a.motif ? ` · ${a.motif}` : ""}</span>
                  <button type="button" className="lien-bouton" aria-label="Retirer cette absence" onClick={() => retirer(a.id)}>×</button>
                </li>
              ))}
            </ul>
          )}
          <div className="cal-absences__ajout">
            <label className="fa-champ"><span>Du</span><input type="date" value={nouvelle.debut} onChange={(e) => setNouvelle({ ...nouvelle, debut: e.target.value })} /></label>
            <label className="fa-champ"><span>Au <span className="discret">(facultatif)</span></span><input type="date" value={nouvelle.fin} min={nouvelle.debut || undefined} onChange={(e) => setNouvelle({ ...nouvelle, fin: e.target.value })} /></label>
            <label className="fa-champ cal-absences__motif"><span>Motif <span className="discret">(facultatif)</span></span><input maxLength={80} value={nouvelle.motif} placeholder="ex. vacances" onChange={(e) => setNouvelle({ ...nouvelle, motif: e.target.value })} /></label>
            <button type="button" className="bouton bouton--vert" onClick={ajouter}>Ajouter</button>
          </div>
        </section>
      </div>
    </main>
  );
}

