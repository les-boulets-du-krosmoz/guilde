import { Navigate, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { NOM_GUILDE, SLOGAN } from "./lib/guilde";
import { useSession } from "./lib/session";
import { FournisseurStatuts } from "./lib/statuts";
import { Chargement, Connexion, NonMembre } from "./pages/Acces";
import { Annonces } from "./pages/Annonces";
import { MesMetiers } from "./pages/MesMetiers";
import { AvisRecherche } from "./pages/Avis";
import { Metiers } from "./pages/Metiers";
import { MonCompte } from "./pages/MonCompte";
import { Personnages } from "./pages/Personnages";
import { Profil } from "./pages/Profil";
import { Progression } from "./pages/Progression";
import { Quetes } from "./pages/Quetes";
import { TableauDeBord } from "./pages/TableauDeBord";

export function App() {
  const { chargement, session, membre } = useSession();

  if (chargement) return <Chargement />;
  if (!session) return <Connexion />;
  if (!membre?.valide) return <NonMembre />;

  return (
    <FournisseurStatuts actif>
      <Nav />
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
        <Route path="/annonces" element={<Navigate to="/groupes" replace />} />
        <Route path="/avis" element={<AvisRecherche />} />
        <Route path="/avis/:persoId" element={<AvisRecherche />} />
        <Route path="/progression" element={<Progression />} />
        <Route path="/mon-compte" element={<MonCompte />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="pied">
        {NOM_GUILDE} — {SLOGAN.charAt(0).toLowerCase() + SLOGAN.slice(1)}
        <span className="pied__version">Version {__VERSION_SITE__}</span>
      </footer>
    </FournisseurStatuts>
  );
}
