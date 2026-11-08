import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Fenetre } from "../components/Fenetre";
import { STATS_BOSS } from "../data/bossStats";
import { GUIDES_BOSS, type GuideBoss } from "../data/guidesBoss";
import { QUETES_DONJONS } from "../data/quetesDonjons";
import { Quetes } from "./Quetes";

const ONGLETS = [
  { id: "succes", libelle: "Succès" },
  { id: "guides", libelle: "Guides de boss" },
  { id: "quetes", libelle: "Quêtes liées" },
] as const;
type Onglet = (typeof ONGLETS)[number]["id"];
const ELEMENTS = [
  { nom: "Neutre", couleur: "#b9b1a3" }, { nom: "Terre", couleur: "#b4824f" }, { nom: "Feu", couleur: "#e4683f" },
  { nom: "Eau", couleur: "#4fa3e0" }, { nom: "Air", couleur: "#62c27a" },
];
const sansAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Page Donjons : les succès (déplacés de la page Quêtes), les guides de boss et l'index des quêtes liées. */
export function Donjons() {
  const [params, setParams] = useSearchParams();
  const onglet: Onglet = (ONGLETS.find((o) => o.id === params.get("onglet"))?.id ?? "succes") as Onglet;
  const choisir = (id: Onglet) => setParams(id === "succes" ? {} : { onglet: id }, { replace: true });
  return (
    <div className="donjons">
      <div className="page donjons__tete">
        <h1>Donjons</h1>
        <div className="onglets" role="tablist" aria-label="Sections">
          {ONGLETS.map((o) => (
            <button key={o.id} type="button" role="tab" aria-selected={onglet === o.id} className={`onglet ${onglet === o.id ? "onglet--actif" : ""}`} onClick={() => choisir(o.id)}>{o.libelle}</button>
          ))}
        </div>
      </div>
      {onglet === "succes" && <Quetes categorieImposee="succes" />}
      {onglet === "guides" && <Guides />}
      {onglet === "quetes" && <IndexQuetesLiees />}
    </div>
  );
}

function Guides() {
  const [ouvert, setOuvert] = useState<GuideBoss | null>(null);
  const tries = [...GUIDES_BOSS].sort((a, b) => Number(a.statut !== "brouillon") - Number(b.statut !== "brouillon") || (STATS_BOSS[a.slug]?.nom ?? "").localeCompare(STATS_BOSS[b.slug]?.nom ?? ""));
  return (
    <main className="page">
      <p className="discret">Les boss qui demandent une stratégie : accès, mécaniques et astuces, rédigés par la guilde. Les caractéristiques viennent des données du jeu.</p>
      <ul className="guides-boss">
        {tries.map((g) => {
          const s = STATS_BOSS[g.slug];
          return (
            <li key={g.slug}>
              <button type="button" className="carte guides-boss__carte" onClick={() => setOuvert(g)}>
                <img src={`/icones/boss/${g.slug}.webp`} alt="" width={72} height={72} loading="lazy" />
                <span className="guides-boss__nom"><strong>{s?.nom ?? g.slug}</strong><span className="discret-taille">{g.donjon} · niv. {g.niveau}</span></span>
                <span className={`etiquette ${g.statut === "brouillon" ? "etiquette--aide" : ""}`}>{g.statut === "brouillon" ? "Guide à relire" : "Fiche du jeu"}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {ouvert && <Fenetre titre={STATS_BOSS[ouvert.slug]?.nom ?? ouvert.slug} onFermer={() => setOuvert(null)} large><FicheBoss guide={ouvert} /></Fenetre>}
    </main>
  );
}

export function FicheBoss({ guide }: { guide: GuideBoss }) {
  const s = STATS_BOSS[guide.slug];
  const section = (titre: string, lignes?: string[]) => lignes?.length ? (
    <section className="fiche-boss__section"><h3>{titre}</h3><ul>{lignes.map((l, k) => <li key={k}>{l}</li>)}</ul></section>
  ) : null;
  return (
    <div className="fiche-boss">
      <div className="fiche-boss__tete">
        <img src={`/icones/boss/${guide.slug}.webp`} alt="" width={112} height={112} />
        <div>
          <h2>{s?.nom}</h2>
          <p className="discret">{guide.donjon} · donjon niv. {guide.niveau} · {guide.position}</p>
          {s && (
            <ul className="fiche-boss__stats">
              <li><span>Niveau</span><strong>{s.niveau}</strong></li>
              <li><span>PV</span><strong>{s.pv.toLocaleString("fr-FR")}</strong></li>
              <li><span>PA</span><strong>{s.pa}</strong></li>
              <li><span>PM</span><strong>{s.pm}</strong></li>
              {s.res.map((r, k) => <li key={k} title={`Résistance ${ELEMENTS[k].nom}`}><span style={{ color: ELEMENTS[k].couleur }}>{ELEMENTS[k].nom}</span><strong>{r} %</strong></li>)}
            </ul>
          )}
        </div>
      </div>
      {guide.statut === "brouillon"
        ? <p className="fiche-boss__statut">📝 Première version, à faire relire par un membre qui a fait ce boss : signalez les erreurs aux officiers.</p>
        : <p className="fiche-boss__statut">Guide pas encore rédigé : en attendant, voir le guide détaillé ci-dessous.</p>}
      {guide.avertissements?.length ? (
        <div className="fiche-boss__alerte" role="note">{guide.avertissements.map((x, k) => <p key={k}>⚠ {x}</p>)}</div>
      ) : null}
      {section("Accès", guide.acces)}
      {section("Mécaniques", guide.mecaniques)}
      {section("Rendre vulnérable (délock)", guide.delock)}
      {section("Comment s'y prendre", guide.strategie)}
      {section("Pour les succès", guide.succes)}
      <div className="fiche-boss__pied">
        <a href={guide.dpln} target="_blank" rel="noreferrer">Guide détaillé sur Dofus pour les Noobs ↗</a>
        <Link to="/groupes" className="bouton bouton--petit">Monter un groupe</Link>
      </div>
    </div>
  );
}

/** Index des quêtes liées à chaque donjon (lecture seule) ; pour cocher, voir l'onglet Succès. */
function IndexQuetesLiees() {
  const [recherche, setRecherche] = useState("");
  const q = sansAccents(recherche.trim());
  const donjons = Object.entries(QUETES_DONJONS)
    .filter(([d, l]) => !q || sansAccents(d).includes(q) || l.some((x) => sansAccents(x.nom).includes(q)))
    .sort(([a], [b]) => a.localeCompare(b));
  return (
    <main className="page">
      <p className="discret">Les quêtes qui demandent d'agir dans un donjon, avec la salle concernée. Pour les cocher, passez par l'onglet Succès.</p>
      <input type="search" className="donjons__recherche" placeholder="Rechercher un donjon ou une quête…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher" />
      <ul className="index-liees">
        {donjons.map(([d, l]) => (
          <li key={d} className="carte">
            <details>
              <summary><strong>{d}</strong> <span className="discret-taille">{l.length} quête{l.length > 1 ? "s" : ""}</span></summary>
              <ul>
                {l.map((x) => (
                  <li key={x.id + d}><strong>{x.nom}</strong> <span className="discret-taille">niv. {x.niveau}</span>
                    <div className="discret-taille">{x.objectif.split(" ; ").join(" · ")}</div></li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
}
