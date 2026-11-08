import { Link } from "react-router-dom";

/** En-tête de l'Annuaire : la guilde par métier ou par ordre. */
export function OngletsAnnuaire({ actif }: { actif: "metiers" | "ordres" }) {
  return (
    <div className="annuaire__entete">
      <h1>Annuaire</h1>
      <div className="onglets" role="tablist" aria-label="Annuaire">
        <Link to="/metiers" role="tab" aria-selected={actif === "metiers"} className={`onglet ${actif === "metiers" ? "onglet--actif" : ""}`}>Métiers</Link>
        <Link to="/ordres" role="tab" aria-selected={actif === "ordres"} className={`onglet ${actif === "ordres" ? "onglet--actif" : ""}`}>Ordres</Link>
      </div>
    </div>
  );
}
