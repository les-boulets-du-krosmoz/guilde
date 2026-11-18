import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Fenetre } from "../components/Fenetre";
import { STATS_BOSS } from "../data/bossStats";
import { GUIDES_BOSS, type GuideBoss } from "../data/guidesBoss";
import { SuiviQuetesDonjons } from "../components/SuiviQuetesDonjons";
import { TexteGuide } from "../components/TeteDeMort";
import { cibleBoss, compterVisite } from "../lib/visites";
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
      {onglet === "quetes" && <SuiviQuetesDonjons />}
    </div>
  );
}

const ETIQUETTE: Record<GuideBoss["statut"], { texte: string; classe: string }> = {
  relu: { texte: "✓ Guide relu", classe: "etiquette--groupe" },
  brouillon: { texte: "Guide à relire", classe: "etiquette--aide" },
  "a-rediger": { texte: "Fiche du jeu", classe: "" },
};

function Guides() {
  const [params, setParams] = useSearchParams();
  const ouvert = GUIDES_BOSS.find((g) => g.slug === params.get("boss")) ?? null;
  const setOuvert = (g: GuideBoss | null) => setParams(g ? { onglet: "guides", boss: g.slug } : { onglet: "guides" }, { replace: true });
  const tries = [...GUIDES_BOSS].sort((a, b) => Number(a.statut === "a-rediger") - Number(b.statut === "a-rediger") || (STATS_BOSS[a.slug]?.nom ?? "").localeCompare(STATS_BOSS[b.slug]?.nom ?? ""));
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
                <span className={`etiquette ${ETIQUETTE[g.statut].classe}`}>{ETIQUETTE[g.statut].texte}</span>
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
  useEffect(() => compterVisite(cibleBoss(guide.slug)), [guide.slug]);
  const section = (titre: string, lignes?: string[]) => lignes?.length ? (
    <section className="fiche-boss__section"><h3>{titre}</h3><ul>{lignes.map((l, k) => <li key={k}><TexteGuide texte={l} /></li>)}</ul></section>
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
      {guide.statut === "brouillon" && <p className="fiche-boss__statut">📝 Première version, à faire relire par un membre qui a fait ce boss : signalez les erreurs aux officiers.</p>}
      {guide.statut === "a-rediger" && <p className="fiche-boss__statut">Guide pas encore rédigé : en attendant, voir le guide détaillé ci-dessous.</p>}
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

