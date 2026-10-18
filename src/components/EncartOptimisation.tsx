import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Dofus } from "../data/dofus";
import type { Optimisation } from "../data/optimisationGlaces";
import { CATEGORIES } from "../data/series";
import { chargerQuetesEnCours, chargerQuetesFaites, marquerEnCours, marquerQuete } from "../lib/donnees";

const norme = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
// Où se trouve chaque quête du site, par son nom (pour faire des liens depuis le texte du parcours).
const PAR_NOM = new Map<string, { cat: string; serie: string; id: string }>();
for (const c of CATEGORIES) for (const s of c.series) for (const q of s.quetes) {
  if (!PAR_NOM.has(norme(q.nom))) PAR_NOM.set(norme(q.nom), { cat: c.id, serie: s.id, id: q.id });
}

/** Astuce d'optimisation pour une quête, d'après son nom. */
export const astuceDe = (opti: Optimisation | undefined, nom: string) =>
  opti ? Object.entries(opti.astuces).find(([n]) => norme(n) === norme(nom))?.[1] : undefined;

/** Quêtes citées par le parcours qui n'existent nulle part sur le site (pour vérifier les noms). */
export const quetesInconnues = (opti: Optimisation) =>
  [...new Set([...opti.alertes, ...opti.parties.flatMap((p) => p.etapes.map((e) => e.texte))]
    .flatMap((t) => [...t.matchAll(/\[\[(.+?)\]\]/g)].map((m) => m[1])))].filter((n) => !PAR_NOM.has(norme(n)));

/** Noms de quêtes cités dans un texte du parcours. */
const nomsCites = (t: string) => [...t.matchAll(/\[\[(.+?)\]\]/g)].map((m) => m[1]);
type Etat = "afaire" | "encours" | "faite";
const SYMBOLE: Record<Etat, string> = { afaire: "☐", encours: "◐", faite: "☑" };
const LIBELLE: Record<Etat, string> = { afaire: "à faire", encours: "en cours", faite: "terminée" };
const SUIVANT: Record<Etat, Etat> = { afaire: "encours", encours: "faite", faite: "afaire" };

/**
 * Parcours optimisé, en pages (une par partie) avec des flèches. Chaque quête citée a trois états, qu'un clic fait
 * défiler : à faire → en cours → terminée → à faire. « Terminée » coche la quête sur sa page (Dofus ou Quêtes de Frigost).
 */
export function ParcoursOptimise({ opti, dofus, faites, persoId, modifiable, onBasculerSerie, onAller }: {
  opti: Optimisation;
  dofus: Dofus;
  /** Quêtes faites de la série affichée. */
  faites: Set<string>;
  persoId: string;
  modifiable: boolean;
  /** Coche ou décoche une étape de la série affichée (avec ses étapes précédentes, comme dans la liste). */
  onBasculerSerie: (queteId: string) => void;
  onAller: (queteId: string) => void;
}) {
  const [autres, setAutres] = useState<Set<string>>(new Set());
  const [enCours, setEnCours] = useState<Set<string>>(new Set());
  const { pathname } = useLocation();

  const refs = useMemo(() => [...new Set([...opti.alertes, ...opti.parties.flatMap((p) => p.etapes.map((e) => e.texte))].flatMap(nomsCites))]
    .map((n) => PAR_NOM.get(norme(n))).filter((x): x is NonNullable<typeof x> => !!x), [opti]);
  const idsAutres = useMemo(() => [...new Set(refs.filter((x) => x.serie !== dofus.id).map((x) => x.id))], [refs, dofus.id]);
  const tousIds = useMemo(() => [...new Set(refs.map((x) => x.id))], [refs]);
  useEffect(() => {
    chargerQuetesFaites(persoId, idsAutres).then(setAutres).catch(() => setAutres(new Set()));
    chargerQuetesEnCours(persoId, tousIds).then(setEnCours).catch(() => setEnCours(new Set()));
  }, [persoId, idsAutres, tousIds]);

  const estFaite = (id: string, serie: string) => (serie === dofus.id ? faites.has(id) : autres.has(id));
  const etat = (ou: { id: string; serie: string }): Etat => (estFaite(ou.id, ou.serie) ? "faite" : enCours.has(ou.id) ? "encours" : "afaire");
  // Page affichée au départ : la première partie qui n'est pas terminée.
  const etapeFaite = (t: string) => {
    const r = nomsCites(t).map((n) => PAR_NOM.get(norme(n))).filter((x): x is NonNullable<typeof x> => !!x);
    return r.length > 0 && r.every((x) => estFaite(x.id, x.serie));
  };
  const etapeEnCours = (t: string) => nomsCites(t).some((n) => { const x = PAR_NOM.get(norme(n)); return !!x && etat(x) === "encours"; });
  const avancement = (p: Optimisation["parties"][number]) => [p.etapes.filter((e) => etapeFaite(e.texte)).length, p.etapes.length];
  const [page, setPage] = useState<number | null>(null);
  const pageInitiale = Math.max(0, opti.parties.findIndex((p) => { const [f, t] = avancement(p); return f < t; }));
  const courante = page ?? pageInitiale;

  const fixerEnCours = (id: string, oui: boolean) => setEnCours((s) => { const n = new Set(s); if (oui) n.add(id); else n.delete(id); return n; });
  async function suivant(ou: { serie: string; id: string }) {
    if (!modifiable) return;
    const avant = etat(ou);
    const apres = SUIVANT[avant];
    try {
      if (apres === "encours") {
        fixerEnCours(ou.id, true); await marquerEnCours(persoId, ou.id, true);
      } else if (apres === "faite") {
        fixerEnCours(ou.id, false); await marquerEnCours(persoId, ou.id, false).catch(() => {});
        if (ou.serie === dofus.id) onBasculerSerie(ou.id);
        else { setAutres((a) => new Set([...a, ou.id])); await marquerQuete(persoId, ou.id, true); }
      } else {
        if (ou.serie === dofus.id) onBasculerSerie(ou.id);
        else { setAutres((a) => { const n = new Set(a); n.delete(ou.id); return n; }); await marquerQuete(persoId, ou.id, false); }
      }
    } catch { /* l'état sera relu à la prochaine ouverture */ }
  }

  const texte = (t: string) =>
    t.split(/(\[\[.+?\]\])/g).map((morceau, k) => {
      const m = morceau.match(/^\[\[(.+)\]\]$/);
      if (!m) return <Fragment key={k}>{morceau}</Fragment>;
      const nom = m[1];
      const ou = PAR_NOM.get(norme(nom));
      if (!ou) return <strong key={k}>{nom}</strong>;
      const e = etat(ou);
      return (
        <span key={k} className="opti__ref">
          <button type="button" className={`opti__quete opti__quete--${e}`} disabled={!modifiable}
            onClick={() => suivant(ou)} title={modifiable ? `${nom} : ${LIBELLE[e]} (clic : ${LIBELLE[SUIVANT[e]]})` : `${nom} : ${LIBELLE[e]}`}>
            <span aria-hidden="true">{SYMBOLE[e]}</span> {nom}<span className="sr-only"> ({LIBELLE[e]})</span>
          </button>
          {ou.serie === dofus.id ? (
            <button type="button" className="opti__aller" onClick={() => onAller(ou.id)} title="Voir l'étape dans la liste" aria-label={`Voir l'étape ${nom}`}>↓</button>
          ) : (
            <Link className="opti__aller" to={`${pathname}?cat=${ou.cat}&dofus=${ou.serie}&etape=${ou.id}`} title="Ouvrir l'étape dans sa page" aria-label={`Ouvrir l'étape ${nom}`}>↗</Link>
          )}
        </span>
      );
    });

  const p = opti.parties[courante];
  const [f, t] = avancement(p);
  return (
    <div className="opti">
      <h2 className="opti__titre">⚡ Parcours optimisé du Dofus des Glaces</h2>
      <ul className="opti__alertes">
        {opti.alertes.map((a, k) => <li key={k}>⚠️ {texte(a)}</li>)}
      </ul>

      <div className="opti__navigation">
        <button type="button" className="bouton bouton--petit" disabled={courante === 0} onClick={() => setPage(courante - 1)} aria-label="Partie précédente">←</button>
        <div className="opti__entete-partie">
          <span className="opti__partie-titre">Partie {courante + 1} sur {opti.parties.length} · {p.titre}</span>
          <span className={`opti__compte ${f === t ? "vert" : ""}`}>{f}/{t} étapes faites</span>
        </div>
        <button type="button" className="bouton bouton--petit" disabled={courante === opti.parties.length - 1} onClick={() => setPage(courante + 1)} aria-label="Partie suivante">→</button>
      </div>
      <ol className="opti__etapes">
        {p.etapes.map((e, n) => (
          <li key={n} className={[e.alerte ? "opti__etape--alerte" : "", etapeFaite(e.texte) ? "opti__etape--faite" : etapeEnCours(e.texte) ? "opti__etape--encours" : ""].join(" ")}>{texte(e.texte)}</li>
        ))}
      </ol>
      <div className="opti__points" aria-hidden="true">
        {opti.parties.map((x, k) => <button key={x.titre} type="button" tabIndex={-1} className={k === courante ? "actif" : ""} onClick={() => setPage(k)} />)}
      </div>

      <p className="discret-taille">
        ☐ à faire · ◐ en cours · ☑ terminée : un clic passe à l'état suivant. ↓ montre l'étape dans la liste, ↗ ouvre sa page.
        {" "}{opti.source}{opti.lien && <> · <a href={opti.lien} target="_blank" rel="noreferrer">Voir l'épisode 1</a> (les épisodes 2 et 3 suivent sur sa chaîne).</>}
      </p>
    </div>
  );
}
