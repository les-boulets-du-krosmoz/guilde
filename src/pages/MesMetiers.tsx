import { Link } from "react-router-dom";
import { FormMetiers } from "./MonCompte";

/** Mes métiers : les niveaux des métiers de son compte, enregistrés automatiquement à chaque champ. */
export function MesMetiers() {
  return (
    <main className="page">
      <div className="entete">
        <div>
          <h1>Mes métiers</h1>
          <p className="discret">Tes niveaux de métier : chaque champ s'enregistre tout seul. Ceux de toute la guilde sont dans <Link to="/metiers">Métiers de la guilde</Link>.</p>
        </div>
      </div>
      <FormMetiers />
    </main>
  );
}
