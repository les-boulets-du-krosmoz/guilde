import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NOM_GUILDE, SLOGAN } from "../lib/guilde";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import { usePlacementDansEcran } from "../lib/placement";
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

  const { pathname, search } = useLocation();
  const [menuMobile, setMenuMobile] = useState(false);
  useEffect(() => setMenuMobile(false), [pathname, search]); // on referme le menu mobile après chaque navigation
  const invitations = useInvitationsEnAttente(membre?.id);
  const principal = mesPersos.find((p) => p.est_principal) ?? mesPersos[0];

  return (
    <header className="nav">
      <NavLink to="/" className="nav__guilde">
        <img src="/logo.webp" alt="" width={44} height={44} />
        <span className="nav__titre">
          <span>{NOM_GUILDE}</span>
          <span className="nav__slogan">{SLOGAN}</span>
        </span>
      </NavLink>

      <button type="button" className="nav__hamburger" aria-expanded={menuMobile} aria-controls="nav-principale" onClick={() => setMenuMobile(!menuMobile)}>
        <span aria-hidden="true">☰</span> Menu
      </button>

      <nav id="nav-principale" className={`nav__liens ${menuMobile ? "nav__liens--ouvert" : ""}`} aria-label="Navigation principale">
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/groupes" className="nav__groupes">
          Groupes
          {invitations > 0 && <span className="nav__badge" aria-label={`${invitations} invitation${invitations > 1 ? "s" : ""} en attente`}>{invitations}</span>}
        </NavLink>
        <MenuDeroulant
          libelle="Progression"
          actif={["/quetes", "/progression", "/avis"].some((c) => pathname.startsWith(c))}
          liens={[
            { to: "/quetes", libelle: "Mes quêtes", detail: "Dofus, Frigost, Tour du monde, Emma", actif: pathname.startsWith("/quetes") && !search.includes("cat=succes") },
            { to: "/quetes?cat=succes", libelle: "Succès de donjon", detail: "Les 131 boss et leurs succès", actif: pathname.startsWith("/quetes") && search.includes("cat=succes") },
            { to: "/progression", libelle: "Où en est la guilde", detail: "Qui en est à quelle étape" },
            { to: "/avis", libelle: "Avis de recherche", detail: "Avis, doplons et parchemins" },
          ]}
        />
        <MenuDeroulant
          libelle="Guilde"
          actif={["/personnages", "/metiers", "/perso/"].some((c) => pathname.startsWith(c))}
          liens={[
            { to: "/personnages", libelle: "Personnages", detail: "Tous les membres et leurs personnages" },
            { to: "/metiers", libelle: "Métiers", detail: "Qui peut fabriquer quoi" },
          ]}
        />
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
        <MenuDeroulant
          libelle={membre?.avatar_url
            ? <img src={membre.avatar_url} alt={`Compte de ${membre.pseudo}`} width={32} height={32} className="nav__avatar" referrerPolicy="no-referrer" />
            : <span className="nav__avatar nav__avatar--initiales">{(membre?.pseudo ?? "?").slice(0, 2)}</span>}
          etiquette="Mon compte"
          actif={pathname.startsWith("/mon-compte")}
          aDroite
          liens={[
            { to: "/mon-compte", libelle: "Mon compte", detail: "Personnages, métiers, Metamob" },
            ...(principal ? [{ to: `/perso/${principal.id}`, libelle: "Ma fiche", detail: `Profil de ${principal.nom}` }] : []),
          ]}
          action={{ libelle: "Déconnexion", onClick: seDeconnecter }}
        />
      </div>
    </header>
  );
}

/** Nombre d'invitations à des sorties en attente de réponse, rafraîchi toutes les 2 minutes et à chaque page. */
function useInvitationsEnAttente(membreId?: string): number {
  const [n, setN] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => {
    if (!membreId) return;
    const compter = () => {
      supabase.from("annonces_invitations").select("annonce_id", { count: "exact", head: true })
        .eq("membre_id", membreId).eq("statut", "en_attente")
        .then(({ count, error }) => setN(error ? 0 : count ?? 0));
    };
    compter();
    const t = window.setInterval(compter, 2 * 60 * 1000);
    return () => window.clearInterval(t);
  }, [membreId, pathname]);
  return n;
}

type LienMenu = { to: string; libelle: string; detail?: string; actif?: boolean };

/** Entrée de la barre qui déroule un petit menu de liens (Progression, Guilde, compte). */
function MenuDeroulant({ libelle, etiquette, liens, actif, aDroite, action }: {
  libelle: ReactNode;
  etiquette?: string;
  liens: LienMenu[];
  actif: boolean;
  aDroite?: boolean;
  action?: { libelle: string; onClick: () => void };
}) {
  const [ouvert, setOuvert] = useState(false);
  const boite = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const place = usePlacementDansEcran(ouvert, boite, menu);
  const { pathname, search } = useLocation();
  useEffect(() => setOuvert(false), [pathname, search]);
  useEffect(() => {
    if (!ouvert) return;
    const dehors = (e: MouseEvent) => { if (!boite.current?.contains(e.target as Node)) setOuvert(false); };
    const echap = (e: KeyboardEvent) => { if (e.key === "Escape") setOuvert(false); };
    document.addEventListener("mousedown", dehors);
    document.addEventListener("keydown", echap);
    return () => { document.removeEventListener("mousedown", dehors); document.removeEventListener("keydown", echap); };
  }, [ouvert]);

  return (
    <div className={`menu-nav ${aDroite ? "menu-nav--droite" : ""}`} ref={boite}>
      <button type="button" className={`menu-nav__bouton ${actif ? "menu-nav__bouton--actif" : ""}`} aria-haspopup="menu" aria-expanded={ouvert}
        aria-label={etiquette} onClick={() => setOuvert(!ouvert)}>
        {libelle}
        <span className="menu-statut__fleche" aria-hidden="true">▾</span>
      </button>
      {ouvert && (
        <div className="menu-nav__liste" role="menu" ref={menu} style={place}>
          {liens.map((l) => (
            <Link key={l.to} to={l.to} role="menuitem" className={`menu-nav__item ${l.actif ? "menu-nav__item--actif" : ""}`}>
              <span>{l.libelle}</span>
              {l.detail && <small>{l.detail}</small>}
            </Link>
          ))}
          {action && (
            <button type="button" role="menuitem" className="menu-nav__item menu-nav__item--action" onClick={action.onClick}>{action.libelle}</button>
          )}
        </div>
      )}
    </div>
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
  const liste = useRef<HTMLDivElement>(null);
  const place = usePlacementDansEcran(ouvert, boite, liste);

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
        <div className="menu-statut__liste" role="menu" ref={liste} style={place}>
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
