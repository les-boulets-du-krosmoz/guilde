import { useEffect, useState } from "react";
import { STATS_BOSS } from "../data/bossStats";
import { COMBATS_TACTIQUES } from "../data/combatsTactiques";
import { GUIDES_BOSS } from "../data/guidesBoss";
import { CATEGORIES, ouEstLaQuete } from "../data/series";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import { cibleBoss, cibleStrat, CIBLE_OUTIL_MEMOIRE } from "../lib/visites";

type Total = { cible: string; vues: number; jours: number };
type Ligne = { cle: string; libelle: string; vues: number; jours: number; details?: Ligne[] };

const PERIODES = [
  { jours: 7, libelle: "7 jours" },
  { jours: 30, libelle: "30 jours" },
  { jours: 90, libelle: "3 mois" },
  { jours: 0, libelle: "Depuis le début" },
] as const;

const PAGES: Record<string, string> = {
  "/": "Accueil", "/groupes": "Groupes", "/quetes": "Mes quêtes", "/donjons": "Donjons", "/progression": "Où en est la guilde",
  "/avis": "Avis de recherche", "/songes": "Songes infinis", "/personnages": "Personnages", "/perso": "Fiches de personnage",
  "/metiers": "Annuaire (métiers)", "/ordres": "Annuaire (ordres)", "/calendrier": "Calendrier", "/brocante": "La Brocante des boulets",
  "/archimonstres": "Archimonstres", "/mon-compte": "Mon compte", "/mes-metiers": "Mes métiers", "/parametres": "Paramètres",
};
const ONGLETS: Record<string, Record<string, string>> = {
  "/donjons": { succes: "Succès", guides: "Guides de boss", quetes: "Quêtes liées" },
  "/songes": {
    principe: "Le principe", intensites: "Intensités", deroulement: "Déroulement", final: "Combat final", sorts: "Sorts et outils",
    domi: "Top Domi Reversi", butin: "Butin", recompenses: "Récompenses", classement: "Classement",
  },
};
const CATS: Record<string, string> = {
  ...Object.fromEntries(CATEGORIES.map((c) => [c.id, c.nom])),
  tactiques: "Combats tactiques", journalieres: "Quêtes journalières",
};
const SERIES: Record<string, string> = Object.fromEntries(CATEGORIES.flatMap((c) => c.series.map((s) => [s.id, s.nom])));

/** Date du jour à Paris moins n jours, au format AAAA-MM-JJ. */
function depuis(jours: number): string {
  if (!jours) return "2000-01-01";
  const d = new Date(Date.now() - (jours - 1) * 86_400_000);
  return new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris" }).format(d);
}

/** Pages regroupées, avec le détail par onglet ou catégorie quand il y en a plusieurs. */
function lignesPages(totaux: Total[]): Ligne[] {
  const parPage = new Map<string, Ligne>();
  for (const t of totaux) {
    if (!t.cible.startsWith("page:")) continue;
    const [racine, reglages = ""] = t.cible.slice(5).split("?");
    const page = parPage.get(racine) ?? { cle: racine, libelle: PAGES[racine] ?? racine, vues: 0, jours: 0, details: [] };
    page.vues += t.vues;
    page.jours = Math.max(page.jours, t.jours);
    const params = new URLSearchParams(reglages);
    const morceaux = [...params].map(([k, v]) => (k === "cat" ? CATS[v] : k === "dofus" ? SERIES[v] : ONGLETS[racine]?.[v]) ?? v);
    page.details!.push({ cle: t.cible, libelle: morceaux.length ? morceaux.join(" › ") : "Onglet par défaut", vues: t.vues, jours: t.jours });
    parPage.set(racine, page);
  }
  return [...parPage.values()]
    .map((p) => ({ ...p, details: p.details!.length > 1 ? p.details!.sort((a, b) => b.vues - a.vues) : undefined }))
    .sort((a, b) => b.vues - a.vues);
}

/** Une ligne par fiche connue (à 0 si jamais ouverte), plus les cibles qui ne correspondent plus à rien. */
function lignesFiches(totaux: Total[], prefixe: string, fiches: { cle: string; libelle: string }[]): Ligne[] {
  const vus = new Map(totaux.filter((t) => t.cible.startsWith(prefixe)).map((t) => [t.cible, t]));
  const lignes: Ligne[] = fiches.map((f) => ({ ...f, vues: vus.get(f.cle)?.vues ?? 0, jours: vus.get(f.cle)?.jours ?? 0 }));
  for (const [cle, t] of vus) if (!fiches.some((f) => f.cle === cle)) lignes.push({ cle, libelle: cle.slice(prefixe.length), vues: t.vues, jours: t.jours });
  return lignes.sort((a, b) => b.vues - a.vues || a.libelle.localeCompare(b.libelle));
}

const FICHES_BOSS = GUIDES_BOSS.map((g) => ({ cle: cibleBoss(g.slug), libelle: STATS_BOSS[g.slug]?.nom ?? g.slug }));
const FICHES_STRATS = COMBATS_TACTIQUES.map((g) => {
  const ou = g.quete ? ouEstLaQuete(g.quete) : undefined;
  return { cle: cibleStrat(g), libelle: `${g.adversaire} (${ou ? ou.serie.nom : g.nomQuete ?? "quête"})` };
});

/** Page des officiers : ce qui est ouvert sur le site, compté de façon anonyme. */
export function Statistiques() {
  const { membre, rafraichir } = useSession();
  const [compte, setCompte] = useState(!membre?.hors_statistiques);
  const [etatCompte, setEtatCompte] = useState<string | null>(null);
  const [periode, setPeriode] = useState<number>(30);
  const [totaux, setTotaux] = useState<Total[] | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const officier = !!membre?.est_officier;

  useEffect(() => {
    if (!officier) return;
    let actif = true;
    setTotaux(null);
    setErreur(null);
    supabase.rpc("statistiques_visites", { p_depuis: depuis(periode) }).then(({ data, error }) => {
      if (!actif) return;
      if (error) setErreur("Les chiffres n'ont pas pu être chargés (la migration 027 est-elle passée ?).");
      else setTotaux(((data ?? []) as { cible: string; vues: number | string; jours: number | string }[])
        .map((t) => ({ cible: t.cible, vues: Number(t.vues), jours: Number(t.jours) })));
    });
    return () => { actif = false; };
  }, [periode, officier]);

  async function basculerCompte(oui: boolean) {
    if (!membre) return;
    setCompte(oui);
    setEtatCompte(null);
    const { error } = await supabase.from("membres").update({ hors_statistiques: !oui }).eq("id", membre.id);
    if (error) { setCompte(!oui); setEtatCompte("Le réglage n'a pas été enregistré."); return; }
    await rafraichir();
  }

  if (!officier) {
    return <main className="page page--etroite"><h1>Statistiques</h1><p className="discret">Page réservée aux officiers.</p></main>;
  }

  const outil = totaux?.find((t) => t.cible === CIBLE_OUTIL_MEMOIRE);
  return (
    <main className="page page--etroite stats">
      <div className="entete">
        <div>
          <h1>Statistiques</h1>
          <p className="discret">
            Ce qui est ouvert sur le site, compté sans savoir qui : une ouverture par élément, par jour et par visite.
            Les visites des officiers comptent aussi, sauf pour ceux qui décochent la case ci-dessous.
          </p>
        </div>
      </div>

      <label className="stats__moi">
        <input type="checkbox" checked={compte} onChange={(e) => basculerCompte(e.target.checked)} />
        <span>
          <strong>Compter mes visites</strong>
          <span className="discret-taille">Sur tous tes appareils. Ce qui a déjà été compté reste dans les chiffres, puisque rien ne dit qui l'a ouvert.</span>
        </span>
      </label>
      {etatCompte && <p className="erreur" role="alert">{etatCompte}</p>}

      <div className="stats__periodes" role="group" aria-label="Période">
        {PERIODES.map((p) => (
          <button key={p.jours} type="button" aria-pressed={periode === p.jours} className={`onglet ${periode === p.jours ? "onglet--actif" : ""}`} onClick={() => setPeriode(p.jours)}>{p.libelle}</button>
        ))}
      </div>

      {erreur && <p className="erreur" role="alert">{erreur}</p>}
      {!erreur && !totaux && <p className="discret" role="status">Chargement…</p>}
      {totaux && totaux.length === 0 && <p className="discret">Rien de compté sur cette période : les compteurs démarrent avec la version 1.7.0.</p>}
      {totaux && totaux.length > 0 && (
        <>
          <Bloc titre="Pages" lignes={lignesPages(totaux)} />
          <Bloc titre="Guides de boss" lignes={lignesFiches(totaux, "boss:", FICHES_BOSS)} fiches />
          <Bloc titre="Strats des combats" lignes={lignesFiches(totaux, "strat:", FICHES_STRATS)} fiches />
          <section className="carte">
            <h2>Outil du Serment de l'ambre</h2>
            <p>{outil ? `Utilisé lors de ${outil.vues} visite${outil.vues > 1 ? "s" : ""}, sur ${outil.jours} jour${outil.jours > 1 ? "s" : ""}.` : "Pas encore utilisé sur cette période."}</p>
            <p className="discret-taille">Compté dès qu'une marque est posée sur la carte, pas à la simple ouverture de la fiche.</p>
          </section>
        </>
      )}
    </main>
  );
}

function Bloc({ titre, lignes, fiches }: { titre: string; lignes: Ligne[]; fiches?: boolean }) {
  const ouvertes = lignes.filter((l) => l.vues > 0);
  const jamais = lignes.filter((l) => l.vues === 0);
  const max = Math.max(1, ...ouvertes.map((l) => l.vues));
  return (
    <section className="carte">
      <h2>{titre}</h2>
      {ouvertes.length > 0 ? (
        <ul className="stats__liste">
          {ouvertes.map((l) => (
            <li key={l.cle}>
              <BarreStat ligne={l} max={max} />
              {l.details && (
                <ul className="stats__liste stats__liste--details">
                  {l.details.map((d) => <li key={d.cle}><BarreStat ligne={d} max={max} /></li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : <p className="discret">Aucune ouverture sur cette période.</p>}
      {fiches && jamais.length > 0 && (
        <p className="discret-taille stats__jamais"><strong>Jamais ouvertes ({jamais.length}) :</strong> {jamais.map((l) => l.libelle).join(", ")}.</p>
      )}
    </section>
  );
}

function BarreStat({ ligne, max }: { ligne: Ligne; max: number }) {
  return (
    <div className="stats__ligne">
      <span className="stats__nom">{ligne.libelle}</span>
      <span className="stats__nombre" title="Ouvertures, puis nombre de jours avec au moins une ouverture">{ligne.vues}<span className="discret-taille"> · {ligne.jours} j</span></span>
      <span className="stats__barre" aria-hidden="true"><span style={{ width: `${(ligne.vues / max) * 100}%` }} /></span>
    </div>
  );
}
