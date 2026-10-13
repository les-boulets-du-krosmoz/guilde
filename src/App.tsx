import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { NOM_GUILDE, SLOGAN } from "./lib/guilde";
import { useSession } from "./lib/session";
import { FournisseurStatuts } from "./lib/statuts";
import { Chargement, Connexion, NonMembre } from "./pages/Acces";

// Chaque page est un morceau à part, téléchargé seulement quand on l'ouvre (puis gardé par le navigateur).
const MesMetiers = lazy(() => import("./pages/MesMetiers").then((m) => ({ default: m.MesMetiers })));
const Calendrier = lazy(() => import("./pages/Calendrier").then((m) => ({ default: m.Calendrier })));
const Annonces = lazy(() => import("./pages/Annonces").then((m) => ({ default: m.Annonces })));
const AvisRecherche = lazy(() => import("./pages/Avis").then((m) => ({ default: m.AvisRecherche })));
const Metiers = lazy(() => import("./pages/Metiers").then((m) => ({ default: m.Metiers })));
const MonCompte = lazy(() => import("./pages/MonCompte").then((m) => ({ default: m.MonCompte })));
const Personnages = lazy(() => import("./pages/Personnages").then((m) => ({ default: m.Personnages })));
const Profil = lazy(() => import("./pages/Profil").then((m) => ({ default: m.Profil })));
const Progression = lazy(() => import("./pages/Progression").then((m) => ({ default: m.Progression })));
const Quetes = lazy(() => import("./pages/Quetes").then((m) => ({ default: m.Quetes })));
const TableauDeBord = lazy(() => import("./pages/TableauDeBord").then((m) => ({ default: m.TableauDeBord })));

export function App() {
  const { chargement, session, membre } = useSession();

  if (chargement) return <Chargement />;
  if (!session) return <Connexion />;
  if (!membre?.valide) return <NonMembre />;

  return (
    <FournisseurStatuts actif>
      <Nav />
      <Suspense fallback={<Chargement />}>
      <Routes>
        <Route path="/" element={<TableauDeBord />} />
        <Route path="/personnages" element={<Personnages />} />
        <Route path="/perso/:id" element={<Profil />} />
        <Route path="/metiers" element={<Metiers />} />
        <Route path="/metiers/:metier" element={<Metiers />} />
        <Route path="/quetes" element={<Quetes />} />
        <Route path="/quetes/:persoId" element={<Quetes />} />
        <Route path="/groupes" element={<Annonces />} />
        <Route path="/mes-metiers" element={<MesMetiers />} />
        <Route path="/calendrier" element={<Calendrier />} />
        <Route path="/annonces" element={<Navigate to="/groupes" replace />} />
        <Route path="/avis" element={<AvisRecherche />} />
        <Route path="/avis/:persoId" element={<AvisRecherche />} />
        <Route path="/progression" element={<Progression />} />
        <Route path="/mon-compte" element={<MonCompte />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
      <footer className="pied">
        {NOM_GUILDE} — {SLOGAN.charAt(0).toLowerCase() + SLOGAN.slice(1)}
        <span className="pied__version">Version {__VERSION_SITE__}</span>
      </footer>
    </FournisseurStatuts>
  );
}
