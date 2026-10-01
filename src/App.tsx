import { Navigate, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { useSession } from "./lib/session";
import { Chargement, Connexion, NonMembre } from "./pages/Acces";
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
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<TableauDeBord />} />
        <Route path="/personnages" element={<Personnages />} />
        <Route path="/perso/:id" element={<Profil />} />
        <Route path="/metiers" element={<Metiers />} />
        <Route path="/metiers/:metier" element={<Metiers />} />
        <Route path="/quetes" element={<Quetes />} />
        <Route path="/quetes/:persoId" element={<Quetes />} />
        <Route path="/progression" element={<Progression />} />
        <Route path="/mon-compte" element={<MonCompte />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
