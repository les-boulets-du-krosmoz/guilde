import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DUREES_DISPO_H } from "../data/constantes";
import { heure } from "../lib/dates";
import { NOM_GUILDE, SLOGAN } from "../lib/guilde";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";

export function Nav() {
  const { membre, mesPersos, rafraichir, seDeconnecter } = useSession();
  const [duree, setDuree] = useState(2);
  const [persoId, setPersoId] = useState<string>("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const dispoActive = !!membre?.dispo_jusqua && new Date(membre.dispo_jusqua).getTime() > Date.now();
  const persoDispo = mesPersos.find((p) => p.id === membre?.dispo_personnage_id);
  const persoParDefaut = mesPersos.find((p) => p.est_principal) ?? mesPersos[0];

  async function majDispo(jusqua: string | null, personnageId: string | null) {
    if (!membre) return;
    setEnCours(true);
    setErreur(null);
    const { error } = await supabase
      .from("membres")
      .update({ dispo_jusqua: jusqua, dispo_personnage_id: personnageId })
      .eq("id", membre.id);
    if (error) setErreur("La dispo n'a pas été enregistrée.");
    await rafraichir();
    setEnCours(false);
  }

  const activer = () => {
    const cible = persoId || persoParDefaut?.id;
    if (!cible) return;
    const fin = new Date(Date.now() + duree * 3600 * 1000).toISOString();
    majDispo(fin, cible);
  };

  return (
    <header className="nav">
      <NavLink to="/" className="nav__guilde">
        <img src="/logo.webp" alt="" width={44} height={44} />
        <span className="nav__titre">
          <span>{NOM_GUILDE}</span>
          <span className="nav__slogan">{SLOGAN}</span>
        </span>
      </NavLink>
      <nav className="nav__liens" aria-label="Navigation principale">
        <NavLink to="/" end>Tableau de bord</NavLink>
        <NavLink to="/personnages">Personnages</NavLink>
        <NavLink to="/metiers">Métiers</NavLink>
        <NavLink to="/quetes">Mes quêtes</NavLink>
        <NavLink to="/avis">Avis de recherche</NavLink>
        <NavLink to="/progression">Progression guilde</NavLink>
        <NavLink to="/mon-compte">Mon compte</NavLink>
      </nav>

      <div className="nav__dispo">
        {mesPersos.length === 0 ? null : dispoActive ? (
          <>
            <span className="nav__dispo-etat">
              Dispo jusqu'à {heure(membre!.dispo_jusqua!)}
              {persoDispo ? ` avec ${persoDispo.nom}` : ""}
            </span>
            <button type="button" className="bouton" disabled={enCours} onClick={() => majDispo(null, null)}>
              Plus dispo
            </button>
          </>
        ) : (
          <>
            {mesPersos.length > 1 && (
              <>
                <label htmlFor="dispo-perso" className="sr-only">Personnage</label>
                <select id="dispo-perso" value={persoId || persoParDefaut?.id} onChange={(e) => setPersoId(e.target.value)}>
                  {mesPersos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nom}</option>
                  ))}
                </select>
              </>
            )}
            <label htmlFor="dispo-duree" className="sr-only">Durée</label>
            <select id="dispo-duree" value={duree} onChange={(e) => setDuree(Number(e.target.value))}>
              {DUREES_DISPO_H.map((h) => (
                <option key={h} value={h}>{h} h</option>
              ))}
            </select>
            <button type="button" className="bouton bouton--vert" disabled={enCours} onClick={activer}>
              Dispo pour grouper
            </button>
          </>
        )}
        {erreur && <span className="erreur" role="alert">{erreur}</span>}
        <button type="button" className="bouton bouton--discret" onClick={seDeconnecter}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}
