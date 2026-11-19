import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Fenetre } from "../components/Fenetre";
import { STATS_BOSS } from "../data/bossStats";
import { GUIDES_BOSS, nomDuGuide, type GuideBoss } from "../data/guidesBoss";
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

/** Regroupement de la liste : zones de jeu proches réunies, les zones à un seul donjon dans « Autres zones ». */
const GROUPES: { nom: string; zones: string[] }[] = [
  { nom: "Frigost", zones: ["Frigost", "Île de Sakaï"] },
  { nom: "Éliocalypse", zones: ["Éliocalypse"] },
  { nom: "Dimensions divines", zones: ["Xélorium", "Srambad", "Écaflipus", "Osavora"] },
  { nom: "Sufokia", zones: ["Baie de Sufokia", "Profondeurs de Sufokia"] },
  { nom: "Archipel de Valonia", zones: ["Archipel de Valonia"] },
];
const AUTRES = "Autres zones";
const groupeDe = (g: GuideBoss) => GROUPES.find((x) => x.zones.includes(g.zone))?.nom ?? AUTRES;
const sansAccents = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function Guides() {
  const [params, setParams] = useSearchParams();
  const [recherche, setRecherche] = useState("");
  const [niv200, setNiv200] = useState(false);
  const [groupe, setGroupe] = useState<string | null>(null);
  const ouvert = GUIDES_BOSS.find((g) => g.slug === params.get("boss")) ?? null;
  const setOuvert = (g: GuideBoss | null) => setParams(g ? { onglet: "guides", boss: g.slug } : { onglet: "guides" }, { replace: true });
  const mots = sansAccents(recherche).split(/\s+/).filter(Boolean);
  const retenus = GUIDES_BOSS.filter((g) => {
    if (niv200 && g.niveau < 200) return false;
    if (groupe && groupeDe(g) !== groupe) return false;
    const texte = sansAccents([nomDuGuide(g), STATS_BOSS[g.slug]?.nom, g.donjon, g.zone, groupeDe(g)].join(" "));
    return mots.every((m) => texte.includes(m));
  }).sort((a, b) => Number(a.statut === "a-rediger") - Number(b.statut === "a-rediger") || nomDuGuide(a).localeCompare(nomDuGuide(b)));
  const parGroupe = [...GROUPES.map((x) => x.nom), AUTRES]
    .map((nom) => [nom, retenus.filter((g) => groupeDe(g) === nom)] as const)
    .filter(([, liste]) => liste.length > 0);
  return (
    <main className="page">
      <p className="discret">Les boss qui demandent une stratégie : accès, mécaniques et astuces, rédigés par la guilde. Les caractéristiques viennent des données du jeu.</p>
      <div className="guides-boss__outils">
        <input type="search" placeholder="Rechercher un boss, un donjon ou une zone…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher un boss, un donjon ou une zone" />
        <div className="fa-puces" role="group" aria-label="Filtres rapides">
          <button type="button" className={`fa-puce ${niv200 ? "actif" : ""}`} aria-pressed={niv200} onClick={() => setNiv200(!niv200)}>Niv. 200 et +</button>
          {[...GROUPES.map((x) => x.nom), AUTRES].map((nom) => (
            <button key={nom} type="button" className={`fa-puce ${groupe === nom ? "actif" : ""}`} aria-pressed={groupe === nom} onClick={() => setGroupe(groupe === nom ? null : nom)}>{nom}</button>
          ))}
        </div>
      </div>
      {parGroupe.length === 0 && <p className="vide">Aucun boss ne correspond.</p>}
      {parGroupe.map(([nom, liste]) => (
        <section key={nom} className="guides-boss__groupe" aria-label={nom}>
          <h2>{nom} <span className="discret-taille">{liste.length}</span></h2>
          <ul className="guides-boss">
            {liste.map((g) => (
              <li key={g.slug}>
                <button type="button" className="carte guides-boss__carte" onClick={() => setOuvert(g)}>
                  <img src={`/icones/boss/${g.slug}.webp`} alt="" width={72} height={72} loading="lazy" />
                  <span className="guides-boss__nom">
                    <strong>{nomDuGuide(g)}</strong>
                    <span className="discret-taille">{g.donjon} · niv. {g.niveau}{nom === AUTRES ? ` · ${g.zone}` : ""}</span>
                  </span>
                  <span className={`etiquette ${ETIQUETTE[g.statut].classe}`}>{ETIQUETTE[g.statut].texte}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {ouvert && <Fenetre titre={nomDuGuide(ouvert)} onFermer={() => setOuvert(null)} large><FicheBoss guide={ouvert} /></Fenetre>}
    </main>
  );
}

/** Icônes des caractéristiques, comme en jeu (public/icones/stats). Pas d'icône Neutre dans les données : pastille grise. */
const ICONE_STAT = { pv: 3, pa: 4, pm: 5, res: [0, 8, 9, 10, 11] };
function IconeStat({ id, nom }: { id: number; nom: string }) {
  if (!id) return <span className="fiche-boss__neutre" role="img" aria-label={nom} title={nom} />;
  return <img className="icone-stat" src={`/icones/stats/${id}.webp`} alt={nom} title={nom} width={18} height={18} />;
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
          <h2>{nomDuGuide(guide)}</h2>
          <p className="discret">{guide.donjon} · donjon niv. {guide.niveau} · {guide.position}</p>
          {s && (
            <ul className="fiche-boss__stats" aria-label={guide.nom ? `Caractéristiques de ${s.nom}` : "Caractéristiques"}>
              {guide.nom && <li className="fiche-boss__stats-nom">{s.nom}</li>}
              <li title="Niveau du boss">Niv. <strong>{s.niveau}</strong></li>
              <li title="Points de vie en groupe de 4 personnages (plus à 8)"><IconeStat id={ICONE_STAT.pv} nom="Points de vie" /><strong>{s.pv.toLocaleString("fr-FR")}</strong><span className="discret-taille">à 4</span></li>
              <li><IconeStat id={ICONE_STAT.pa} nom="PA" /><strong>{s.pa}</strong></li>
              <li><IconeStat id={ICONE_STAT.pm} nom="PM" /><strong>{s.pm}</strong></li>
              <li className="fiche-boss__res">
                {s.res.map((r, k) => <span key={k} title={`Résistance ${ELEMENTS[k].nom}`}><IconeStat id={ICONE_STAT.res[k]} nom={`Résistance ${ELEMENTS[k].nom}`} /><strong>{r} %</strong></span>)}
              </li>
            </ul>
          )}
        </div>
      </div>
      {guide.statut === "brouillon" && <p className="fiche-boss__statut">📝 Première version, à faire relire par un membre qui a fait ce boss : signalez les erreurs aux officiers.</p>}
      {guide.statut === "a-rediger" && <p className="fiche-boss__statut">Guide pas encore rédigé : en attendant, voir le guide détaillé ci-dessous.</p>}
      {guide.avertissements?.length ? (
        <div className="fiche-boss__alerte" role="note">{guide.avertissements.map((x, k) => <p key={k}>⚠ {x}</p>)}</div>
      ) : null}
      {guide.acces?.length ? (
        <details className="fiche-boss__section fiche-boss__repli">
          <summary><h3>Accès</h3></summary>
          <ul>{guide.acces.map((l, k) => <li key={k}><TexteGuide texte={l} /></li>)}</ul>
        </details>
      ) : null}
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

