import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { NOM_GUILDE, SLOGAN } from "../lib/guilde";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import { useStatuts } from "../lib/statuts";
import { STATUTS, type Personnage, type Statut } from "../lib/types";
import { Pastille } from "./Pastille";

export function Nav() {
  const { membre, mesPersos, rafraichir, seDeconnecter } = useSession();
  const { rafraichirStatuts } = useStatuts();
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const statut = (membre?.statut ?? "dispo") as Statut;
  const persoParDefaut = mesPersos.find((p) => p.est_principal) ?? mesPersos[0];
  const persoDispo = mesPersos.find((p) => p.id === membre?.dispo_personnage_id) ?? persoParDefaut;

  async function changer(nouveau: Statut, personnageId?: string) {
    if (!membre) return;
    setEnCours(true);
    setErreur(null);
    const maj: Record<string, unknown> = { statut: nouveau, vu_le: new Date().toISOString() };
    if (personnageId) maj.dispo_personnage_id = personnageId;
    const { error } = await supabase.from("membres").update(maj).eq("id", membre.id);
    if (error) setErreur("Le statut n'a pas été enregistré.");
    await Promise.all([rafraichir(), rafraichirStatuts()]);
    setEnCours(false);
  }

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
        <NavLink to="/annonces">Annonces</NavLink>
        <NavLink to="/personnages">Personnages</NavLink>
        <NavLink to="/metiers">Métiers</NavLink>
        <NavLink to="/quetes">Mes quêtes</NavLink>
        <NavLink to="/avis">Avis de recherche</NavLink>
        <NavLink to="/progression">Progression guilde</NavLink>
        <NavLink to="/mon-compte">Mon compte</NavLink>
      </nav>

      <div className="nav__dispo">
        {mesPersos.length > 0 && (
          <MenuStatut
            statut={statut}
            persos={mesPersos}
            persoDispo={persoDispo}
            enCours={enCours}
            onStatut={(st) => changer(st, st === "dispo" ? persoDispo?.id : undefined)}
            onPerso={(id) => changer(statut, id)}
          />
        )}
        {erreur && <span className="erreur" role="alert">{erreur}</span>}
        <button type="button" className="bouton bouton--discret" onClick={seDeconnecter}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}

/**
 * Menu du statut : un seul bouton (« ● Dispo · Zham »), qui déroule les trois statuts l'un sous l'autre,
 * puis, s'il y a plusieurs personnages, le choix du personnage avec lequel on est dispo.
 */
function MenuStatut({ statut, persos, persoDispo, enCours, onStatut, onPerso }: {
  statut: Statut;
  persos: Personnage[];
  persoDispo: Personnage | undefined;
  enCours: boolean;
  onStatut: (s: Statut) => void;
  onPerso: (id: string) => void;
}) {
  const [ouvert, setOuvert] = useState(false);
  const boite = useRef<HTMLDivElement>(null);

  // Fermeture au clic à l'extérieur ou avec Échap.
  useEffect(() => {
    if (!ouvert) return;
    const dehors = (e: MouseEvent) => { if (!boite.current?.contains(e.target as Node)) setOuvert(false); };
    const echap = (e: KeyboardEvent) => { if (e.key === "Escape") setOuvert(false); };
    document.addEventListener("mousedown", dehors);
    document.addEventListener("keydown", echap);
    return () => { document.removeEventListener("mousedown", dehors); document.removeEventListener("keydown", echap); };
  }, [ouvert]);

  const nom = STATUTS.find((s) => s.id === statut)?.nom ?? "Dispo";
  const choisir = (f: () => void) => { f(); setOuvert(false); };

  return (
    <div className="menu-statut" ref={boite}>
      <button type="button" className={`menu-statut__bouton statut--${statut}`} aria-haspopup="menu" aria-expanded={ouvert} disabled={enCours} onClick={() => setOuvert(!ouvert)}>
        <span className="statut__point" aria-hidden="true" />
        {nom}
        {statut === "dispo" && persoDispo && persos.length > 1 && <span className="discret"> · {persoDispo.nom}</span>}
        <span className="menu-statut__fleche" aria-hidden="true">▾</span>
      </button>
      {ouvert && (
        <div className="menu-statut__liste" role="menu">
          <span className="menu-statut__titre">Mon statut</span>
          {STATUTS.map((s) => (
            <button key={s.id} type="button" role="menuitemradio" aria-checked={statut === s.id}
              className={`menu-statut__item statut--${s.id} ${statut === s.id ? "statut--actif" : ""}`} onClick={() => choisir(() => onStatut(s.id))}>
              <span className="statut__point" aria-hidden="true" />
              {s.nom}
            </button>
          ))}
          {persos.length > 1 && (
            <>
              <span className="menu-statut__titre">Dispo avec</span>
              {persos.map((p) => (
                <button key={p.id} type="button" role="menuitemradio" aria-checked={persoDispo?.id === p.id}
                  className={`menu-statut__item ${persoDispo?.id === p.id ? "menu-statut__item--choisi" : ""}`}
                  onClick={() => choisir(() => onPerso(p.id))}>
                  <Pastille perso={p} taille={22} lien={false} infobulle={p.nom} />
                  {p.nom}
                  {persoDispo?.id === p.id && <span aria-hidden="true">✓</span>}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
