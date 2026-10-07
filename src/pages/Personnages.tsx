import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pastille } from "../components/Pastille";
import { useStatuts } from "../lib/statuts";
import { chargerGuilde, type DonneesGuilde } from "../lib/donnees";
import { statutDe, estDispo } from "../lib/types";
import { Chargement } from "./Acces";

export function Personnages() {
  const { statuts } = useStatuts();
  const [donnees, setDonnees] = useState<DonneesGuilde | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    chargerGuilde().then(setDonnees).catch((e) => setErreur(e.message));
  }, []);

  const liste = useMemo(() => {
    if (!donnees) return [];
    const r = recherche.trim().toLowerCase();
    return donnees.personnages.filter(
      (p) => !r || p.nom.toLowerCase().includes(r) || donnees.membres.get(p.membre_id)?.pseudo.toLowerCase().includes(r),
    );
  }, [donnees, recherche]);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!donnees) return <Chargement />;

  return (
    <main className="page">
      <div className="entete">
        <div>
          <h1>Personnages de la guilde</h1>
          <p className="discret">{donnees.personnages.length} personnages, {donnees.membres.size} membres</p>
        </div>
        <div className="champ">
          <label htmlFor="recherche">Rechercher</label>
          <input id="recherche" type="search" value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Personnage ou pseudo" />
        </div>
      </div>

      {liste.length === 0 ? (
        <p className="vide">
          {donnees.personnages.length === 0
            ? <>Aucun personnage pour l'instant. <Link to="/mon-compte">Ajoute le tien</Link>.</>
            : "Aucun personnage ne correspond à cette recherche."}
        </p>
      ) : (
        <ul className="grille-persos">
          {liste.map((p) => {
            const m = donnees.membres.get(p.membre_id);
            const st = statutDe(statuts.get(p.membre_id) ?? m, p.id);
            return (
              <li key={p.id} className={`carte carte--perso ${st ? `carte--statut-${st}` : ""}`}>
                <Pastille perso={p} dispo={estDispo(m, p.id)} taille={44} lien={false} />
                <div>
                  {/* Le lien s'étend à toute la carte (voir .carte--perso .carte__titre::after). */}
                  <Link to={`/perso/${p.id}`} className="carte__titre">{p.nom}</Link>
                  <div className="discret">{p.classe} niveau {p.niveau}</div>
                  <div className="discret">@{m?.pseudo ?? "?"}, {p.est_principal ? "principal" : "mule"}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
