import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { CarteAlmanax } from "../components/CarteAlmanax";
import { chargerAides, chargerAnnonces, chargerAbsences, chargerAvis, chargerDispos, chargerGuilde, chargerMetiers, chargerSouhaits, chargerSucces, toutesLesQuetes, type DonneesAnnonces } from "../lib/donnees";
import type { DonneesAccueil } from "./accueil/SectionsAccueil";

// Les parties qui ont besoin des quêtes et des succès (données lourdes) arrivent dans un second temps :
// l'en-tête et l'Almanax s'affichent tout de suite, le reste dès que son morceau est téléchargé.
const sections = () => import("./accueil/SectionsAccueil");
const ChiffresAccueil = lazy(() => sections().then((m) => ({ default: m.ChiffresAccueil })));
const BlocAnnoncesAccueil = lazy(() => sections().then((m) => ({ default: m.BlocAnnoncesAccueil })));
const GuildeAccueil = lazy(() => sections().then((m) => ({ default: m.GuildeAccueil })));

function Attente({ titre }: { titre: string }) {
  return <section className="carte carte--attente" aria-busy="true"><h2>{titre}</h2><p className="discret">Chargement…</p></section>;
}

export function TableauDeBord() {
  const [donnees, setDonnees] = useState<DonneesAccueil | null>(null);
  const [annonces, setAnnonces] = useState<DonneesAnnonces>({ annonces: [], participants: [], invitations: [] });
  const [erreur, setErreur] = useState<string | null>(null);

  const rechargerAnnonces = useCallback(() => { chargerAnnonces().then(setAnnonces).catch(() => {}); }, []);
  useEffect(rechargerAnnonces, [rechargerAnnonces]);
  useEffect(() => {
    Promise.all([chargerGuilde(), chargerMetiers(), toutesLesQuetes(), chargerSouhaits(), chargerAvis(), chargerAides(), chargerSucces(), chargerDispos(), chargerAbsences()])
      .then(([guilde, metiers, quetes, souhaits, avis, aides, succes, d, absences]) => setDonnees({ guilde, metiers, quetes, souhaits, avis, aides, succes, dispos: d.dispos, absences }))
      .catch((e) => setErreur(e.message));
  }, []);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;

  return (
    <main className="page page--accueil">
      <div className="entete">
        <h1>Tableau de bord</h1>
        {donnees && <Suspense fallback={null}><ChiffresAccueil donnees={donnees} /></Suspense>}
      </div>

      {/* Ligne 1 : l'Almanax (à gauche) et les sorties prévues (à droite). */}
      <div className="accueil-ligne accueil-ligne--haut">
        <CarteAlmanax />
        {donnees ? (
          <Suspense fallback={<Attente titre="Recherche de groupe" />}>
            <BlocAnnoncesAccueil donnees={donnees} annonces={annonces} onChange={rechargerAnnonces} />
          </Suspense>
        ) : <Attente titre="Recherche de groupe" />}
      </div>

      {/* Lignes 2 et 3 : groupes à monter, Dofus de la guilde, activité récente. */}
      {donnees ? (
        <Suspense fallback={<Attente titre="Groupes à monter" />}>
          <GuildeAccueil donnees={donnees} />
        </Suspense>
      ) : <Attente titre="Groupes à monter" />}
    </main>
  );
}
