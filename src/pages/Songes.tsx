import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pastille } from "../components/Pastille";
import { chargerGuilde, chargerSonges, declarerSonge, supprimerSonge, type DonneesGuilde, type SongeDeclare } from "../lib/donnees";
import { useSession } from "../lib/session";
import type { Personnage } from "../lib/types";
import { RANGS, TOP_DOMI, type Rang } from "../data/songes";

/** Les intensités d'un songe : butin et expérience de base, départ, combat final. */
const INTENSITES = [
  { nom: "Rêve", niveaux: "I à III", butin: "50 % à 100 %", depart: "10 points de rêve, 1 Sable de Draconiros, 1 Tempête astrale", vagues: "5 au maximum", victoire: "1 vague", bribes: "25 à 75 par vague", note: "Ni légendes ni runes astrales." },
  { nom: "Paradoxe", niveaux: "I à IV", butin: "120 % à 190 %", depart: "5 points de rêve, 1 Tempête astrale", vagues: "15 au maximum", victoire: "3 vagues", bribes: "75 à 200 par vague", note: "Le meilleur rapport pour farmer." },
  { nom: "Cauchemar", niveaux: "I à III", butin: "220 % à 300 %", depart: "1 Tempête astrale", vagues: "sans limite", victoire: "3 vagues", bribes: "300 à 1 000 par vague", note: "Le vrai défi." },
];

const PALIERS = [
  { nom: "Les Pensées oniriques", salles: "1 à 3" },
  { nom: "Les Balades fantastiques", salles: "4 à 9" },
  { nom: "Les Espaces imaginaires", salles: "10 à 15" },
  { nom: "Les Concepts brumeux", salles: "16 à 21" },
  { nom: "Les Abstractions chimériques", salles: "22 à 26" },
];

const SORTS = [
  { nom: "Domi Reversi", effet: "Fait passer un ennemi (et ses invocations) dans votre camp jusqu'au début de votre prochain tour. Utilisé sur le dernier monstre en vie, il donne la victoire.", usage: "Usage unique" },
  { nom: "Oblivion", effet: "Tue la cible, même invulnérable. Idéal contre les boss à mécanique pénible.", usage: "Usage unique" },
  { nom: "Réveil Brutal", effet: "Sacrifie un allié pour infliger des dégâts Feu en zone selon sa vie. Combiné à Domi Reversi, il « sacrifie » un ennemi passé de votre côté.", usage: "Relance de 2 tours" },
  { nom: "Paume Ancestrale", effet: "Pose un seuil à 30 % de vie sur un ennemi : s'il l'atteint, il meurt. Évite les phases et les seuils des boss.", usage: "Relance de 3 tours" },
  { nom: "Psst Psst", effet: "Ramène un ennemi à côté de vous, pour l'achever sans vous exposer.", usage: "Relance de 5 tours" },
  { nom: "Bras de Morphée", effet: "L'ennemi ciblé passe son prochain tour.", usage: "Relance de 10 tours" },
  { nom: "Refus de la Mort", effet: "Ressuscite le dernier allié mort avec toute sa vie (il meurt si le lanceur meurt).", usage: "1 fois par combat" },
];

const GOBELINS = [
  { nom: "Bog", effet: "Renouvelle les bonus de la Fontaine Onirique (seulement dans les fontaines)." },
  { nom: "Gobledore", effet: "Vous ramène à la salle précédente : on change de chemin et on reprend un bonus de portail." },
  { nom: "Gobséric", effet: "Vous fait passer la salle sans combattre." },
  { nom: "King Gob", effet: "Multiplie vos points de rêve par 1,5 (très rare)." },
];

/** Butin par palier (salles de combat), d'après l'interface des songes. « ✓ » = possible ; texte = variante. */
const PALIERS_COURTS = ["I", "II", "III", "IV", "V"];
const BUTIN: { nom: string; image: string; paliers: (string | null)[]; reve: boolean; prospection?: boolean; note?: string }[] = [
  { nom: "Reflet onirique", image: "reflet-onirique", paliers: ["✓", "✓", "✓", "✓", "✓"], reve: true, prospection: false, note: "La ressource de base des songes." },
  { nom: "Bouclirêve (bouclier d'apparat)", image: "bouclireve-onirique", paliers: ["Onirique", "Fantastique", "Imaginaire", "Brumeux", "Infini"], reve: true, prospection: true, note: "Un bouclier par palier, plus le Bouclirêve Étoile possible à chaque palier." },
  { nom: "Bouclirêve Étoile", image: "bouclireve-etoile", paliers: ["✓", "✓", "✓", "✓", "✓"], reve: true, prospection: true },
  { nom: "Rune astrale mineure", image: "rune-mineure", paliers: ["✓", "✓", null, null, null], reve: false, prospection: false },
  { nom: "Rune astrale moyenne", image: "rune-moyenne", paliers: ["✓", "✓", null, null, null], reve: false, prospection: false },
  { nom: "Rune astrale majeure", image: "rune-majeure", paliers: [null, null, "✓", "✓", null], reve: false, prospection: false },
  { nom: "Rune astrale épatante", image: "rune-epatante", paliers: [null, null, "✓", "✓", null], reve: false, prospection: false },
  { nom: "Rune astrale merveilleuse", image: "rune-merveilleuse", paliers: [null, null, null, "✓", "✓"], reve: false, prospection: false },
  { nom: "Rune astrale légendaire", image: "rune-legendaire", paliers: [null, null, null, "✓", "✓"], reve: false, prospection: false, note: "Passer un palier augmente fortement le taux des runes astrales." },
  { nom: "Légendes (26 personnages)", image: "legende", paliers: [null, null, "✓", "✓", "✓"], reve: false, prospection: false, note: "Brumaire, Crocobur, Dame Jhessica, Mériana, Servitude…" },
  { nom: "Légendes animales (4)", image: "legende-animale", paliers: [null, null, "✓", "✓", "✓"], reve: false, prospection: false, note: "Bakushana, Kwakarticho, Magicrabe, Poukachi." },
  { nom: "Diplôme de Feur (titre)", image: "diplome-de-feur", paliers: [null, null, "✓", "✓", "✓"], reve: true, prospection: true },
];
const TAUX_BASE = [
  { nom: "Rêve I", taux: 50 }, { nom: "Rêve II", taux: 75 }, { nom: "Rêve III", taux: 100 },
  { nom: "Paradoxe I", taux: 120 }, { nom: "Paradoxe II", taux: 140 }, { nom: "Paradoxe III", taux: 160 }, { nom: "Paradoxe IV", taux: 190 },
  { nom: "Cauchemar I", taux: 220 }, { nom: "Cauchemar II", taux: 250 }, { nom: "Cauchemar III", taux: 300 },
];
const BRIBES = [25, 50, 75, 75, 100, 150, 200, 300, 500, 1000];

/** Les ressources qu'on peut déclarer après un songe (clé = image dans public/icones/songes). */
const A_DECLARER = [
  { cle: "reflet-onirique", nom: "Reflets oniriques" },
  { cle: "rune-mineure", nom: "Runes mineures" },
  { cle: "rune-moyenne", nom: "Runes moyennes" },
  { cle: "rune-majeure", nom: "Runes majeures" },
  { cle: "rune-epatante", nom: "Runes épatantes" },
  { cle: "rune-merveilleuse", nom: "Runes merveilleuses" },
  { cle: "rune-legendaire", nom: "Runes légendaires" },
  { cle: "bouclireve-onirique", nom: "Bouclirêves" },
  { cle: "diplome-de-feur", nom: "Diplômes de Feur" },
];
/** Les légendes des songes (noms du jeu), à déclarer une par une. */
const LEGENDES = ["Amayiro", "Brumaire", "Brâm Barbe-Monde", "Buhorado", "Corruption", "Crocobur", "Cul Botté", "Dame Jhessica", "Destin", "Dodge",
  "Fallanster", "Ganymède", "Guerre", "Helséphine", "Henual", "Jahash Jurgen", "Menalt", "Mille Lieues", "Miroir", "Misère", "Mériana", "Oto Mustam",
  "Rykke Errel", "Servitude", "Thanatena", "Trompe-la-Mort"];
const LEGENDES_ANIMALES = ["Bakushana", "Kwakarticho", "Magicrabe", "Poukachi"];
/** Nom complet d'une légende, comme en jeu (« Légende de Brumaire », « Légende du Destin », « Légende animale de Poukachi »). */
function nomLegende(cle: string): string {
  const [type, nom] = cle.split(":");
  if (type === "legende-animale") return `Légende animale de ${nom}`;
  if (/^(Cul Botté|Destin|Miroir|Trompe-la-Mort)$/.test(nom)) return `Légende du ${nom}`;
  return /^[AEIOUYÉÈÊH]/i.test(nom) ? `Légende d'${nom}` : `Légende de ${nom}`;
}
const estLegende = (cle: string) => cle === "legende" || cle === "legende-animale" || cle.startsWith("legende:") || cle.startsWith("legende-animale:");
/** Vagues à vaincre au combat final pour valider le songe (et recevoir des Bribes). */
const vaguesMinimum = (intensite: string) => (intensite.startsWith("Rêve") ? 1 : 3);
const tauxDeBase = (intensite: string) => TAUX_BASE.find((t) => t.nom === intensite)?.taux ?? 100;
const virgule = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });

/** Les onglets de la page (comme les catégories de la page Quêtes). */
const ONGLETS = [
  { id: "principe", libelle: "Le principe" },
  { id: "intensites", libelle: "Intensités" },
  { id: "deroulement", libelle: "Déroulement" },
  { id: "final", libelle: "Combat final" },
  { id: "sorts", libelle: "Sorts et outils" },
  { id: "domi", libelle: "Top Domi Reversi" },
  { id: "butin", libelle: "Butin" },
  { id: "recompenses", libelle: "Récompenses" },
  { id: "classement", libelle: "Classement" },
] as const;
type Onglet = (typeof ONGLETS)[number]["id"];

function Pastilles({ rang }: { rang: Rang }) {
  return <span className={`songes-rang songes-rang--${rang.toLowerCase()}`} title={RANGS[rang].detail}>{RANGS[rang].libelle}</span>;
}

/** Les Songes infinis : le principe du mode roguelite, ce qu'il faut savoir, et les meilleurs Domi Reversi. */
export function Songes() {
  const [params, setParams] = useSearchParams();
  const onglet: Onglet = (ONGLETS.find((o) => o.id === params.get("onglet"))?.id ?? "principe") as Onglet;
  const choisir = (id: Onglet) => setParams(id === "principe" ? {} : { onglet: id }, { replace: true });
  const { membre } = useSession();
  const [songes, setSonges] = useState<SongeDeclare[] | null>(null);
  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const besoinDonnees = onglet === "butin" || onglet === "classement";
  const recharger = () => chargerSonges().then(setSonges).catch(() => setSonges([]));
  useEffect(() => {
    if (!besoinDonnees) return;
    if (!songes) recharger();
    if (!guilde) chargerGuilde().then(setGuilde).catch(() => {});
  }, [besoinDonnees]); // eslint-disable-line react-hooks/exhaustive-deps

  // Coefficient de drop observé par palier : taux vu en jeu ÷ taux de base de l'intensité, en moyenne sur les relevés.
  const coefficients = useMemo(() => PALIERS_COURTS.map((_, k) => {
    const valeurs = (songes ?? []).map((r) => r.taux?.[String(k + 1)]).map((t, i) => (t ? t / tauxDeBase((songes ?? [])[i].intensite) : null)).filter((x): x is number => x !== null);
    return valeurs.length ? { moyenne: valeurs.reduce((a, b) => a + b, 0) / valeurs.length, n: valeurs.length } : null;
  }), [songes]);
  return (
    <main className="page songes">
      <header className="songes__tete">
        <h1>Les Songes infinis</h1>
        <p className="discret">Le mode roguelite de Dofus : 26 salles, une seule vie, et des bonus qui changent tout. Ce qu'il faut savoir avant de se lancer, et comment retourner les boss contre leur camp avec Domi Reversi.</p>
        <ul className="songes__reperes">
          <li><strong>26</strong> salles</li>
          <li><strong>4</strong> joueurs au maximum</li>
          <li>niveau <strong>199-200</strong> conseillé</li>
          <li><strong>mort définitive</strong></li>
        </ul>
      </header>

      <div className="onglets songes__onglets" role="tablist" aria-label="Sections de la page">
        {ONGLETS.map((o) => (
          <button key={o.id} type="button" role="tab" aria-selected={onglet === o.id} className={`onglet ${onglet === o.id ? "onglet--actif" : ""}`} onClick={() => choisir(o.id)}>
            {o.libelle}
          </button>
        ))}
      </div>

      {onglet === "principe" && <section className="carte songes__section">
        <h2>Le principe</h2>
        <div className="songes__grille">
          <div><h3>Un roguelite</h3><p>Chaque songe est une partie : on traverse 26 salles réparties en 5 paliers, de plus en plus difficiles. Une défaite met fin au songe, sauf si l'on a un Sable de Draconiros pour retenter le combat.</p></div>
          <div><h3>Le propriétaire décide</h3><p>Le songe appartient à celui qui le lance : lui seul choisit les salles, achète les bonus et lance les combats. Ses compagnons de route peuvent changer à tout moment, lui jamais. Un personnage n'a qu'un songe en cours.</p></div>
          <div><h3>Soignés à chaque salle</h3><p>Les personnages sont entièrement soignés après chaque salle : pas de pain, pas de perte d'énergie. Le tour de jeu dure 90 secondes, et la préparation 3 minutes.</p></div>
          <div><h3>Pas comme ailleurs</h3><p>Les monstres ne donnent pas leurs ressources habituelles, et les combats ne valident ni les succès de boss ni les objectifs de quêtes « vaincre tel boss ». On y gagne des ressources propres aux songes.</p></div>
          <div><h3>On choisit son chemin</h3><p>La carte du palier (Alt + M) montre les embranchements, le type de chaque salle, sa difficulté et son bonus d'entrée. On ne voit pas les monstres avant d'entrer, et on ne peut plus reculer une fois entré.</p></div>
          <div><h3>Préparer chaque combat</h3><p>Le bestiaire de la salle (Alt + B) donne les caractéristiques des monstres, l'ordre de jeu et un aperçu de la carte. Après la salle 15 en Cauchemar, chaque combat se prépare : passifs, menaces, ordre d'élimination.</p></div>
        </div>
      </section>}

      {onglet === "intensites" && <section className="carte songes__section">
        <h2>Les intensités</h2>
        <p className="discret">Dix niveaux de difficulté en trois catégories. Plus c'est dur, plus l'expérience et le butin de base montent.</p>
        <div className="songes__tableau">
          <table className="tableau">
            <thead><tr><th>Intensité</th><th>Butin et XP de base</th><th>Au départ</th><th>Combat final</th><th>Pour gagner</th><th>Bribes de rêve</th></tr></thead>
            <tbody>
              {INTENSITES.map((i) => (
                <tr key={i.nom}>
                  <td><strong>{i.nom}</strong> <span className="discret-taille">{i.niveaux}</span><div className="discret-taille">{i.note}</div></td>
                  <td>{i.butin}</td><td>{i.depart}</td><td>{i.vagues}</td><td>{i.victoire}</td><td>{i.bribes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>}

      {onglet === "deroulement" && <section className="carte songes__section">
        <h2>Le déroulement d'un songe</h2>
        <ol className="songes__paliers">
          {PALIERS.map((p, k) => <li key={p.nom}><span className="songes__palier-num">Palier {k + 1}</span><strong>{p.nom}</strong><span className="discret-taille">salles {p.salles}</span></li>)}
        </ol>
        <div className="songes__grille">
          <div><h3>Les salles</h3><p><strong>Combat</strong> : 1 à 8 monstres, boss et avis de recherche compris (les 3 premières salles sont toujours des combats). <strong>Fontaine Onirique</strong> (portail bleu, salles 4, 10, 16 et 25) : on achète des bonus. <strong>Faveur Onirique</strong> (portail vert) : un bonus gratuit parmi trois, sans combattre. <strong>Fin du rêve</strong> : le combat final.</p></div>
          <div><h3>Les points de rêve</h3><p>La monnaie du songe, gagnée en entrant dans chaque salle (davantage dans les salles difficiles, marquées d'un « ! » et d'un portail orange). Ils s'échangent dans les Fontaines contre les bonus les plus puissants.</p></div>
          <div><h3>Les bonus</h3><p><strong>Mineurs</strong> à l'entrée de chaque salle (PA, vitalité, dégâts, portée…), <strong>passifs</strong> dans les Fontaines (souvent inspirés d'une classe), et <strong>sorts de songe</strong> dans les Fontaines et les Faveurs. Les bonus de dégâts multiplient tous les autres : c'est la statistique reine.</p></div>
          <div><h3>Le niveau du songeur</h3><p>À chaque palier, votre niveau et celui des monstres montent ensemble, plus vite dans les intensités élevées. Les bonus « niveaux de songeur » ne font monter que le vôtre : invocations, poussée et boucliers en profitent.</p></div>
        </div>
      </section>}

      {onglet === "final" && <section className="carte songes__section">
        <h2>Le combat final</h2>
        <ul className="songes__liste">
          <li><strong>Des vagues aléatoires</strong>, tirées comme les salles. Une vague n'apparaît que quand la précédente est entièrement vaincue.</li>
          <li><strong>50 tours au maximum.</strong> Chaque vague est plus difficile que la précédente.</li>
          <li><strong>Pas de soin entre les vagues</strong>, et l'érosion reste. En revanche, vos boosts, invocations, pièges et glyphes restent en place : on peut préparer l'arrivée de la vague suivante.</li>
          <li><strong>Les mécaniques de la vague précédente s'effacent</strong> (confusions du Comte Harebourg, par exemple), et <strong>les monstres qui arrivent ne sont pas invulnérables</strong> : on peut les frapper avant qu'ils jouent.</li>
          <li><strong>Un sort « 1 fois par combat » ne sert qu'une fois</strong> dans tout le combat final, pas à chaque vague.</li>
          <li>Une fois le nombre de vagues requis atteint, on peut abandonner : le combat est gagné. <strong>Chaque vague de plus rapporte des Bribes de rêve.</strong></li>
        </ul>
      </section>}

      {onglet === "sorts" && <section className="carte songes__section">
        <h2>Les outils à connaître</h2>
        <div className="songes__grille">
          <div><h3>Tempête astrale</h3><p>Change le groupe de monstres d'une salle (et la carte, au combat final), ou renouvelle les bonus d'une Fontaine ou d'une Faveur. Conseil : gardez-en une pour la dernière Fontaine.</p></div>
          <div><h3>Sable de Draconiros</h3><p>Permet de retenter un combat perdu. Les succès « économe » et « parfait » se font sans Sable ni achat en Fontaine.</p></div>
          <div><h3>Les Gobelins</h3><ul className="songes__mini">{GOBELINS.map((g) => <li key={g.nom}><strong>{g.nom}</strong> : {g.effet}</li>)}</ul><p className="discret-taille">Seul le propriétaire les voit : regardez bien la carte avant de lancer le combat.</p></div>
          <div><h3>Les Souvenirs</h3><p>À la fin d'un songe, un code permet de rejouer exactement le même, sans récompense. Utile pour s'entraîner (mode Entraînement : toutes les salles ouvertes, Sables à volonté) ou défier des amis.</p></div>
        </div>
      </section>}

      {onglet === "sorts" && <section className="carte songes__section">
        <h2>Les sorts de songe</h2>
        <p className="discret">Communs à toutes les classes, achetés en Fontaine ou offerts par une Faveur. Ils coûtent 1 PA, remboursé, et tous les personnages du songe peuvent les lancer (relance partagée).</p>
        <ul className="songes__sorts">
          {SORTS.map((s) => (
            <li key={s.nom} className={s.nom === "Domi Reversi" || s.nom === "Oblivion" ? "songes__sort--majeur" : ""}>
              <strong>{s.nom}</strong><span className="etiquette">{s.usage}</span>
              <p>{s.effet}</p>
            </li>
          ))}
        </ul>
        <p className="songes__astuce">💡 <strong>L'astuce universelle</strong> : Domi Reversi sur n'importe quel boss qui vous gêne, puis Réveil Brutal (ou Oblivion) sur lui. Il meurt de votre côté, et l'explosion de Réveil Brutal touche les ennemis autour.</p>
      </section>}

      {onglet === "domi" && <section className="carte songes__section">
        <h2>Le top 10 des Domi Reversi</h2>
        <p className="discret">Les monstres sur lesquels Domi Reversi fait le plus de dégâts, surtout dans le combat final. À tenter tôt, avant la 5e à 7e vague : la plupart demandent un peu de mise en place.</p>
        <ul className="songes__rangs">
          {(["S", "A", "B", "C"] as Rang[]).map((r) => <li key={r}><Pastilles rang={r} /> {RANGS[r].detail}</li>)}
        </ul>
        <ol className="songes__top">
          {[...TOP_DOMI].sort((a, b) => a.place - b.place).map((d) => (
            <li key={d.nom} className={`carte songes__domi songes__domi--${d.rang.toLowerCase()}`}>
              <div className="songes__domi-tete">
                <span className="songes__domi-place">{d.place}</span>
                <img src={`/icones/monstres/${d.image}.webp`} alt="" width={56} height={56} loading="lazy" />
                <div>
                  <strong>{d.nom}</strong>
                  <span className="discret-taille">{d.type}{d.aussi ? ` · avec ${d.aussi}` : ""}</span>
                </div>
                <Pastilles rang={d.rang} />
              </div>
              <p>{d.comment}</p>
              {d.attention && <p className="songes__attention">⚠ {d.attention}</p>}
            </li>
          ))}
        </ol>
      </section>}

      {onglet === "butin" && <>
        <section className="carte songes__section">
          <h2>Ce qui peut tomber, palier par palier</h2>
          <p className="discret">Le butin des salles de combat. Dans le jeu, l'interface des songes montre aussi le butin de la salle en cours (cochez « Afficher uniquement les butins obtenables »).</p>
          <div className="songes__tableau">
            <table className="tableau songes__butin">
              <thead>
                <tr><th>Objet</th>{PALIERS_COURTS.map((p) => <th key={p} className="songes__centre">Palier {p}</th>)}<th className="songes__centre">En Rêve</th></tr>
              </thead>
              <tbody>
                {BUTIN.map((b) => (
                  <tr key={b.nom}>
                    <td>
                      <span className="songes__objet"><img src={`/icones/songes/${b.image}.webp`} alt="" width={32} height={32} loading="lazy" /><span><strong>{b.nom}</strong>{b.note && <span className="discret-taille songes__note">{b.note}</span>}</span></span>
                    </td>
                    {b.paliers.map((v, k) => <td key={k} className={`songes__centre ${v ? "songes__oui" : "songes__non"}`}>{v ?? "—"}</td>)}
                    <td className={`songes__centre ${b.reve ? "songes__oui" : "songes__non"}`}>{b.reve ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="songes__coef">
                  <td><strong>Coefficient de drop</strong><span className="discret-taille songes__note">Taux vu en jeu ÷ taux de base de l'intensité, d'après les songes déclarés par la guilde.</span></td>
                  {coefficients.map((c, k) => (
                    <td key={k} className="songes__centre">{c ? <><strong>×{virgule(c.moyenne)}</strong><span className="discret-taille songes__note">{c.n} relevé{c.n > 1 ? "s" : ""}</span></> : <span className="discret">—</span>}</td>
                  ))}
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
          {coefficients.every((c) => !c) && <p className="discret-taille">Pas encore de relevé : notez les taux de butin vus en jeu en déclarant vos songes dans l'onglet <button type="button" className="lien-bouton" onClick={() => choisir("classement")}>Classement</button>.</p>}
          <p className="discret-taille">Les compagnons ne tombent plus dans les songes (depuis la mise à jour du 7 octobre) : ils s'achètent avec des Bribes de rêve.</p>
        </section>

        <section className="carte songes__section">
          <h2>Le taux de drop</h2>
          <div className="songes__grille">
            <div><h3>Le taux de base</h3><p>L'intensité fixe un taux minimum pour tout le songe. Il ne descend jamais en dessous.</p></div>
            <div><h3>La difficulté de la salle</h3><p>Chaque salle a un score de difficulté caché : plus il est élevé, plus le taux monte au-dessus du taux de base (jamais en dessous). Les salles « ! » à portail orange rapportent donc davantage.</p></div>
            <div><h3>Le palier</h3><p>Les salles des derniers paliers sont plus difficiles, donc mieux dotées. Pour les runes astrales, chaque palier franchi augmente en plus fortement leur taux.</p></div>
            <div><h3>La prospection</h3><p>Selon Dofus pour les Noobs, elle est sans effet sur les ressources des songes, et ne compte que pour les cosmétiques (Bouclirêves, Diplôme de Feur) et les objets de quête. Information non vérifiée par la guilde.</p></div>
          </div>
          <div className="songes__tableau">
            <table className="tableau songes__taux">
              <thead><tr><th>Intensité</th><th>Taux de butin de base</th><th>Bribes par vague</th><th>Ce qui peut tomber</th></tr></thead>
              <tbody>
                {TAUX_BASE.map((t, k) => (
                  <tr key={t.nom}>
                    <td><strong>{t.nom}</strong></td>
                    <td><span className="songes__jauge"><span style={{ width: `${(t.taux / 300) * 100}%` }} /></span> {t.taux} %</td>
                    <td>{BRIBES[k]}</td>
                    <td className="discret-taille">{k < 3 ? "Reflets oniriques et cosmétiques seulement" : "Tout le butin des songes"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="songes__astuce">💡 <strong>Pour farmer</strong>, le Paradoxe est le meilleur compromis : tout le butin y est disponible, et un taux de base de 190 % en Paradoxe IV peut dépasser 230 % dans une salle difficile du palier 3. Le Cauchemar sert surtout au défi (et aux Bribes).</p>
          <p className="discret-taille">Le jeu n'indique pas le pourcentage exact de chaque objet : seulement le taux global de la salle, qui s'applique à tout son butin.</p>
        </section>
      </>}

      {onglet === "recompenses" && <section className="carte songes__section">
        <h2>Les récompenses</h2>
        <div className="songes__grille">
          <div><h3>Bribes de rêve</h3><p>La monnaie principale, gagnée seulement en terminant le songe : un montant par vague vaincue au combat final. Chaque participant en reçoit une part, selon le nombre de salles faites avec le propriétaire. Elles s'échangent au Marché onirique (Neru Stalar, et Gobribe pour les Sacs de 1 000 bribes).</p></div>
          <div><h3>Le butin des salles</h3><p>Reflets oniriques, Bouclirêves et runes astrales dès le début ; les légendes et les meilleures runes à partir du palier 3. Plus la salle est difficile, plus le taux de butin monte. La prospection ne compte pas, sauf pour les cosmétiques et les objets de quête.</p></div>
          <div><h3>Succès et quêtes</h3><p>Pour chaque catégorie : 1 000 monstres, 100 boss, 1 000 Bribes, et 500 Bribes sans Sable ou sans achat. Cinq quêtes se jouent aussi dans les songes, dont Cauchemar infini.</p></div>
        </div>
      </section>}

      {onglet === "classement" && (
        <Classement songes={songes} guilde={guilde} membreId={membre?.id ?? null} onChange={recharger} />
      )}

      <p className="discret-taille songes__sources">
        Sources : le top 10 vient de la vidéo de Sapeuh, <a href="https://www.youtube.com/watch?v=e1EM6c2sSF4" target="_blank" rel="noreferrer">« Top 10 Domi Reversi en Songe »</a>, retraduite en français avec les noms du jeu ; le fonctionnement, des guides de la communauté (Dofus pour les Noobs, Le Zaap du Savoir), pour la version 3.5 et suivantes. Les valeurs peuvent évoluer avec les mises à jour.
      </p>
    </main>
  );
}

type Colonne = "songes" | "termines" | "bribes" | "legendes" | "runesLeg" | "runesMerv" | "reflets" | "vagues";
const COLONNES: { id: Colonne; libelle: string }[] = [
  { id: "songes", libelle: "Songes" }, { id: "termines", libelle: "Terminés" }, { id: "vagues", libelle: "Meilleure vague" }, { id: "bribes", libelle: "Bribes" },
  { id: "legendes", libelle: "Légendes" }, { id: "runesLeg", libelle: "Runes légendaires" }, { id: "runesMerv", libelle: "Runes merveilleuses" }, { id: "reflets", libelle: "Reflets" },
];

/** Onglet Classement : déclarer son butin après un songe, et le classement de la guilde. */
export function Classement({ songes, guilde, membreId, onChange }: { songes: SongeDeclare[] | null; guilde: DonneesGuilde | null; membreId: string | null; onChange: () => void }) {
  const [tri, setTri] = useState<Colonne>("legendes");
  const [categorie, setCategorie] = useState<"toutes" | "Rêve" | "Paradoxe" | "Cauchemar">("toutes");
  const [formulaire, setFormulaire] = useState(false);
  const [intensite, setIntensite] = useState("Paradoxe IV");
  const [vagues, setVagues] = useState("3");
  const [bribes, setBribes] = useState("");
  const [butin, setButin] = useState<Record<string, string>>({});
  const [taux, setTaux] = useState<Record<string, string>>({});
  const [termine, setTermine] = useState(true);
  const [profondeur, setProfondeur] = useState("12");
  const [legendes, setLegendes] = useState<Record<string, number>>({});
  const [legendeChoisie, setLegendeChoisie] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const principal = useMemo(() => {
    const m = new Map<string, Personnage>();
    for (const p of guilde?.personnages ?? []) if (!m.has(p.membre_id) || p.est_principal) m.set(p.membre_id, p);
    return m;
  }, [guilde]);
  if (!songes) return <section className="carte songes__section"><p className="discret">Chargement…</p></section>;

  const bribesParVague = BRIBES[TAUX_BASE.findIndex((t) => t.nom === intensite)] ?? 0;
  const entier = (t: string) => Math.max(0, Math.round(Number(t.replace(/\s/g, "")) || 0));
  const profondeurAtteinte = termine ? 26 : Math.min(25, Math.max(1, entier(profondeur)));
  // Bribes : seulement si le songe est validé (assez de vagues au combat final), puis tant par vague selon l'intensité.
  const bribesCalculees = termine && entier(vagues) >= vaguesMinimum(intensite) ? entier(vagues) * bribesParVague : 0;
  // Reflets : le drop est aléatoire ; on propose la moyenne de la guilde (reflets par salle, même intensité) × salles faites.
  const releves = songes.filter((r) => r.intensite === intensite && (r.butin["reflet-onirique"] ?? 0) > 0 && r.profondeur > 0);
  const refletsParSalle = releves.length >= 3 ? releves.reduce((a, r) => a + r.butin["reflet-onirique"], 0) / releves.reduce((a, r) => a + r.profondeur, 0) : null;
  const refletsEstimes = refletsParSalle ? Math.round(refletsParSalle * profondeurAtteinte) : null;

  async function enregistrer() {
    if (!membreId) return;
    setEnCours(true); setErreur(null);
    try {
      const b: Record<string, number> = {};
      for (const [k, v] of Object.entries(butin)) if (entier(v) > 0) b[k] = entier(v);
      for (const [k, v] of Object.entries(legendes)) if (v > 0) b[k] = v;
      const t: Record<string, number> = {};
      for (const [k, v] of Object.entries(taux)) if (entier(v) > 0) t[k] = entier(v);
      await declarerSonge({
        membre_id: membreId, intensite, termine, profondeur: profondeurAtteinte,
        vagues: termine ? entier(vagues) : 0,
        bribes: termine ? (bribes.trim() ? entier(bribes) : bribesCalculees) : 0,
        butin: b, taux: t,
      });
      setFormulaire(false); setButin({}); setTaux({}); setBribes(""); setLegendes({});
      onChange();
    } catch (e) { setErreur((e as Error).message); } finally { setEnCours(false); }
  }

  // Totaux par membre
  const filtres = songes.filter((r) => categorie === "toutes" || r.intensite.startsWith(categorie));
  const totaux = new Map<string, Record<Colonne, number>>();
  for (const r of filtres) {
    const t = totaux.get(r.membre_id) ?? { songes: 0, termines: 0, bribes: 0, legendes: 0, runesLeg: 0, runesMerv: 0, reflets: 0, vagues: 0 };
    t.songes++; if (r.termine !== false) t.termines++; t.bribes += r.bribes; t.vagues = Math.max(t.vagues, r.vagues);
    t.legendes += Object.entries(r.butin).filter(([k]) => estLegende(k)).reduce((a, [, v]) => a + v, 0);
    t.runesLeg += r.butin["rune-legendaire"] ?? 0; t.runesMerv += r.butin["rune-merveilleuse"] ?? 0; t.reflets += r.butin["reflet-onirique"] ?? 0;
    totaux.set(r.membre_id, t);
  }
  const lignes = [...totaux.entries()].sort((a, b) => b[1][tri] - a[1][tri] || b[1].songes - a[1].songes);
  const mesSonges = songes.filter((r) => r.membre_id === membreId).slice(0, 10);
  const pseudo = (id: string) => guilde?.membres.get(id)?.pseudo ?? "?";

  return (
    <>
      <section className="carte songes__section">
        <div className="songes__titre-ligne">
          <h2>Le classement de la guilde</h2>
          {membreId && <button type="button" className="bouton bouton--vert" onClick={() => setFormulaire(!formulaire)}>{formulaire ? "Fermer" : "+ Déclarer un songe"}</button>}
        </div>
        {formulaire && (
          <div className="songes__formulaire">
            <div className="fa-grille">
              <label className="fa-champ fa-4"><span>Intensité</span>
                <select value={intensite} onChange={(e) => setIntensite(e.target.value)}>{TAUX_BASE.map((t) => <option key={t.nom}>{t.nom}</option>)}</select>
              </label>
              <div className="fa-champ fa-8"><span>Issue du songe</span>
                <div className="onglets onglets--mini" role="radiogroup" aria-label="Issue du songe">
                  <button type="button" role="radio" aria-checked={termine} className={`onglet ${termine ? "onglet--actif" : ""}`} onClick={() => setTermine(true)}>Arrivé au combat final</button>
                  <button type="button" role="radio" aria-checked={!termine} className={`onglet ${!termine ? "onglet--actif" : ""}`} onClick={() => setTermine(false)}>Perdu avant</button>
                </div>
              </div>
            </div>
            {termine ? (
              <div className="fa-grille">
                <label className="fa-champ fa-4"><span>Vagues vaincues au combat final</span><input inputMode="numeric" value={vagues} onChange={(e) => setVagues(e.target.value)} /></label>
                <label className="fa-champ fa-4"><span>Bribes reçues <span className="discret">(calculées : {bribesCalculees.toLocaleString("fr-FR")})</span></span>
                  <input inputMode="numeric" value={bribes} onChange={(e) => setBribes(e.target.value)} placeholder={String(bribesCalculees)} />
                </label>
                <p className="fa-champ fa-4 discret-taille songes__regle">
                  {entier(vagues) >= vaguesMinimum(intensite)
                    ? <>{bribesParVague} Bribes par vague en {intensite}. À ajuster si tu n'as pas fait tout le songe avec son propriétaire (part au prorata des salles de combat).</>
                    : <>Il faut vaincre au moins {vaguesMinimum(intensite)} vague{vaguesMinimum(intensite) > 1 ? "s" : ""} pour valider le songe : sinon, aucune Bribe.</>}
                </p>
              </div>
            ) : (
              <div className="fa-grille">
                <label className="fa-champ fa-4"><span>Perdu à la salle (profondeur)</span><input inputMode="numeric" value={profondeur} onChange={(e) => setProfondeur(e.target.value)} placeholder="1 à 25" /></label>
                <p className="fa-champ fa-8 discret-taille songes__regle">Un songe perdu avant le combat final ne donne aucune Bribe, mais le butin des salles déjà faites est gardé : déclare-le ci-dessous.</p>
              </div>
            )}
            <h3 className="songes__sous-titre">Ce que tu as obtenu</h3>
            {refletsEstimes !== null && (
              <p className="discret-taille">Estimation des reflets oniriques pour {profondeurAtteinte} salles en {intensite} : <strong>≈ {refletsEstimes}</strong> (moyenne de la guilde, {releves.length} songes).
                {" "}<button type="button" className="lien-bouton" onClick={() => setButin({ ...butin, "reflet-onirique": String(refletsEstimes) })}>Utiliser</button></p>
            )}
            <div className="songes__saisie">
              {A_DECLARER.map((o) => (
                <label key={o.cle} className="songes__saisie-ligne">
                  <img src={`/icones/songes/${o.cle}.webp`} alt="" width={28} height={28} />
                  <span>{o.nom}</span>
                  <input inputMode="numeric" value={butin[o.cle] ?? ""} placeholder="0" onChange={(e) => setButin({ ...butin, [o.cle]: e.target.value })} aria-label={o.nom} />
                </label>
              ))}
            </div>
            <h3 className="songes__sous-titre">Légendes obtenues</h3>
            <div className="songes__legendes">
              <select value={legendeChoisie} onChange={(e) => setLegendeChoisie(e.target.value)} aria-label="Légende">
                <option value="">Choisir une légende…</option>
                <optgroup label="Légendes">{LEGENDES.map((n) => <option key={n} value={`legende:${n}`}>{nomLegende(`legende:${n}`)}</option>)}</optgroup>
                <optgroup label="Légendes animales">{LEGENDES_ANIMALES.map((n) => <option key={n} value={`legende-animale:${n}`}>{nomLegende(`legende-animale:${n}`)}</option>)}</optgroup>
              </select>
              <button type="button" className="bouton bouton--petit" disabled={!legendeChoisie}
                onClick={() => { setLegendes({ ...legendes, [legendeChoisie]: (legendes[legendeChoisie] ?? 0) + 1 }); setLegendeChoisie(""); }}>Ajouter</button>
            </div>
            {Object.keys(legendes).length > 0 && (
              <ul className="songes__puces">
                {Object.entries(legendes).map(([k, v]) => (
                  <li key={k}>
                    <img src={`/icones/songes/${k.startsWith("legende-animale") ? "legende-animale" : "legende"}.webp`} alt="" width={20} height={20} />
                    {nomLegende(k)}{v > 1 ? ` ×${v}` : ""}
                    <button type="button" className="lien-bouton" aria-label={`Retirer ${nomLegende(k)}`}
                      onClick={() => { const n = { ...legendes }; if (n[k] > 1) n[k]--; else delete n[k]; setLegendes(n); }}>✕</button>
                  </li>
                ))}
              </ul>
            )}
            <h3 className="songes__sous-titre">Taux de butin vus en jeu <span className="discret">(facultatif, pour les coefficients par palier)</span></h3>
            <div className="songes__saisie songes__saisie--taux">
              {PALIERS_COURTS.map((p, k) => (
                <label key={p} className="songes__saisie-ligne">
                  <span>Palier {p}</span>
                  <input inputMode="numeric" value={taux[String(k + 1)] ?? ""} placeholder={`${tauxDeBase(intensite)} %`} onChange={(e) => setTaux({ ...taux, [String(k + 1)]: e.target.value })} aria-label={`Taux de butin au palier ${p}`} />
                </label>
              ))}
            </div>
            <p className="discret-taille">Le taux de la salle s'affiche dans l'interface des songes, à côté du butin possible. Note celui d'une salle de chaque palier.</p>
            {erreur && <p className="erreur" role="alert">{erreur}</p>}
            <div className="formulaire-annonce__actions">
              <button type="button" className="bouton bouton--vert" onClick={enregistrer} disabled={enCours}>Enregistrer</button>
              <button type="button" className="bouton" onClick={() => setFormulaire(false)} disabled={enCours}>Annuler</button>
            </div>
          </div>
        )}

        <div className="onglets onglets--mini" role="group" aria-label="Catégorie d'intensité">
          {(["toutes", "Rêve", "Paradoxe", "Cauchemar"] as const).map((c) => (
            <button key={c} type="button" className={`onglet ${categorie === c ? "onglet--actif" : ""}`} aria-pressed={categorie === c} onClick={() => setCategorie(c)}>{c === "toutes" ? "Toutes intensités" : c}</button>
          ))}
        </div>
        {lignes.length === 0 ? (
          <p className="vide">Aucun songe déclaré{categorie !== "toutes" ? ` en ${categorie}` : ""} pour l'instant : déclare le tien pour lancer le classement !</p>
        ) : (
          <div className="songes__tableau">
            <table className="tableau songes__classement">
              <thead>
                <tr>
                  <th>#</th><th>Membre</th>
                  {COLONNES.map((c) => (
                    <th key={c.id} className="songes__centre">
                      <button type="button" className={`songes__tri ${tri === c.id ? "songes__tri--actif" : ""}`} onClick={() => setTri(c.id)} title="Trier sur cette colonne">{c.libelle}{tri === c.id ? " ▾" : ""}</button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lignes.map(([id, t], k) => (
                  <tr key={id} className={id === membreId ? "songes__moi" : ""}>
                    <td className="songes__rang-num">{k < 3 ? ["🥇", "🥈", "🥉"][k] : k + 1}</td>
                    <td><span className="songes__objet">{principal.get(id) && <Pastille perso={principal.get(id)!} taille={24} />}<strong>{pseudo(id)}</strong></span></td>
                    {COLONNES.map((c) => <td key={c.id} className={`songes__centre ${tri === c.id ? "songes__oui" : ""}`}>{t[c.id].toLocaleString("fr-FR")}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {mesSonges.length > 0 && (
        <section className="carte songes__section">
          <h2>Mes derniers songes déclarés</h2>
          <ul className="songes__mes">
            {mesSonges.map((r) => (
              <li key={r.id}>
                <span><strong>{r.intensite}</strong> · {r.termine === false ? `perdu à la salle ${r.profondeur}` : `${r.vagues} vague${r.vagues > 1 ? "s" : ""} · ${r.bribes.toLocaleString("fr-FR")} Bribes`}</span>
                <span className="discret-taille">{Object.entries(r.butin).map(([k, v]) => (k.includes(":") ? `${nomLegende(k)}${v > 1 ? ` ×${v}` : ""}` : `${v} ${A_DECLARER.find((o) => o.cle === k)?.nom.toLowerCase() ?? k}`)).join(", ") || "rien de particulier"}</span>
                <span className="discret-taille">{new Date(r.cree_le).toLocaleDateString("fr-FR")}</span>
                <button type="button" className="lien-bouton" onClick={() => { if (window.confirm("Supprimer ce songe déclaré ?")) supprimerSonge(r.id).then(onChange); }}>Supprimer</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
