import { useCallback, useEffect, useMemo, useState } from "react";
import { BoutonDefi } from "../components/BoutonDefi";
import { IconeDonjon, imageDonjon } from "../components/IconeDonjon";
import { IconeSortie } from "../components/IconeSortie";
import { Pastille } from "../components/Pastille";
import { METIERS } from "../data/constantes";
import { CATEGORIES } from "../data/series";
import { cleDonjon, DONJONS_SUCCES, SUCCES_PAR_ID } from "../data/succesDonjons";
import {
  couvertureMetiers, dateLisible, donjonDeCle, grilleMois, memeJour, PLACES_DONJON, PLACES_DUO, placesDe, raisonRefus, resumeAnnonce,
} from "../lib/annonces";
import { ilYa } from "../lib/dates";
import {
  annoncerSurDiscord, annulerInvitation, chargerAnnonces, chargerGuilde, chargerMetiers, chargerSucces, enregistrerAnnonce, inviter,
  participer, repondreInvitation, retirerParticipation, supprimerAnnonce, type ChampsAnnonce, type DonneesGuilde,
} from "../lib/donnees";
import { useSession } from "../lib/session";
import type { Annonce, InvitationAnnonce, Membre, MetierMembre, MetierRequis, ParticipantAnnonce, Personnage, SuccesDonjon } from "../lib/types";
import { Chargement } from "./Acces";

const JOURS = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];

export function Annonces() {
  const { membre, mesPersos } = useSession();
  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [participants, setParticipants] = useState<ParticipantAnnonce[]>([]);
  const [invitations, setInvitations] = useState<InvitationAnnonce[]>([]);
  const [metiers, setMetiers] = useState<MetierMembre[]>([]);
  const [succes, setSucces] = useState<SuccesDonjon[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const [mois, setMois] = useState(() => new Date());
  const [jour, setJour] = useState<Date | null>(null);
  const [edition, setEdition] = useState<Annonce | "nouvelle" | null>(null);
  const [filtre, setFiltre] = useState<"tout" | "donjon" | "quete">("tout");

  const charger = useCallback(async () => {
    try {
      const [g, a, m, s] = await Promise.all([chargerGuilde(), chargerAnnonces(), chargerMetiers(), chargerSucces()]);
      setGuilde(g);
      setAnnonces(a.annonces);
      setParticipants(a.participants);
      setInvitations(a.invitations);
      setMetiers(m);
      setSucces(s);
    } catch (e) {
      setErreur((e as Error).message);
    }
  }, []);
  useEffect(() => { charger(); }, [charger]);

  // Lien depuis Discord (…/groupes#annonce-<id>) : on fait défiler jusqu'à l'annonce une fois chargée.
  const pret = !!guilde;
  useEffect(() => {
    if (!pret || !window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    el?.scrollIntoView({ block: "center" });
    el?.classList.add("annonce--ciblee");
  }, [pret]);

  const maintenant = Date.now();
  const parType = useMemo(() => (filtre === "tout" ? annonces : annonces.filter((a) => a.type === filtre)), [annonces, filtre]);
  const filtrees = useMemo(
    () => (jour ? parType.filter((a) => a.date_prevue && memeJour(new Date(a.date_prevue), jour)) : parType),
    [parType, jour],
  );
  const aVenir = filtrees.filter((a) => a.date_prevue && new Date(a.date_prevue).getTime() >= maintenant - 3 * 3600e3)
    .sort((a, b) => a.date_prevue!.localeCompare(b.date_prevue!));
  const enAttente = jour ? [] : filtrees.filter((a) => !a.date_prevue).sort((a, b) => b.cree_le.localeCompare(a.cree_le));
  const passees = filtrees.filter((a) => a.date_prevue && new Date(a.date_prevue).getTime() < maintenant - 3 * 3600e3)
    .sort((a, b) => b.date_prevue!.localeCompare(a.date_prevue!));

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!guilde || !membre) return <Chargement />;

  const carte = (a: Annonce) => (
    <CarteAnnonce key={a.id} annonce={a} guilde={guilde} participants={participants.filter((p) => p.annonce_id === a.id)}
      invitations={invitations.filter((i) => i.annonce_id === a.id)}
      metiers={metiers} succes={succes} mesPersos={mesPersos} moiId={membre.id} officier={membre.est_officier}
      onModifier={() => setEdition(a)} onChange={charger} onErreur={setErreur} />
  );
  const mesInvitations = invitations.filter((i) => i.membre_id === membre.id && i.statut === "en_attente")
    .map((i) => ({ i, a: annonces.find((a) => a.id === i.annonce_id) }))
    .filter((x): x is { i: InvitationAnnonce; a: Annonce } => !!x.a);

  return (
    <main className="page">
      <div className="entete">
        <div>
          <h1>Recherche de groupe</h1>
          <p className="discret">Les sorties prévues par la guilde : donjons (8 places) et quêtes. Inscris-toi avec le personnage de ton choix.</p>
        </div>
        {!edition && <button type="button" className="bouton bouton--or" onClick={() => setEdition("nouvelle")}>Nouvelle recherche de groupe</button>}
      </div>

      {mesInvitations.length > 0 && (
        <section className="carte invitations">
          <h2>📨 Mes invitations</h2>
          {mesInvitations.map(({ i, a }) => (
            <div key={a.id} className="invitations__ligne">
              <div>
                <a href={`#annonce-${a.id}`} className="invitations__titre">{a.titre}</a>
                <span className="discret">
                  {a.date_prevue ? dateLisible(a.date_prevue) : "date à fixer"} · invité par {guilde.membres.get(i.invite_par)?.pseudo ?? "un membre"} {ilYa(i.cree_le)}
                </span>
              </div>
              <ReponseInvitation annonce={a} invitation={i} mesPersos={mesPersos}
                complet={placesDe(a) !== null && participants.filter((p) => p.annonce_id === a.id).length >= placesDe(a)!}
                onChange={charger} onErreur={setErreur} />
            </div>
          ))}
        </section>
      )}

      {edition && (
        <FormulaireAnnonce
          initiale={edition === "nouvelle" ? null : edition}
          inscrits={edition === "nouvelle" ? 1 : participants.filter((x) => x.annonce_id === edition.id).length}
          auteurId={membre.id}
          membres={[...guilde.membres.values()].filter((m) => m.valide && m.id !== membre.id)}
          mesPersos={mesPersos}
          onAnnuler={() => setEdition(null)}
          onFini={async () => { setEdition(null); await charger(); }}
          onErreur={setErreur}
        />
      )}

      <div className="annonces">
        <section className="carte calendrier">
          <div className="calendrier__entete">
            <button type="button" className="lien-bouton" onClick={() => setMois(new Date(mois.getFullYear(), mois.getMonth() - 1, 1))} aria-label="Mois précédent">‹</button>
            <strong>{new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(mois)}</strong>
            <button type="button" className="lien-bouton" onClick={() => setMois(new Date(mois.getFullYear(), mois.getMonth() + 1, 1))} aria-label="Mois suivant">›</button>
          </div>
          <div className="calendrier__grille">
            {JOURS.map((j) => <span key={j} className="calendrier__jour-nom">{j}</span>)}
            {grilleMois(mois).map((d) => {
              const du = parType.filter((a) => a.date_prevue && memeJour(new Date(a.date_prevue), d));
              const choisi = jour && memeJour(jour, d);
              return (
                <button key={d.toISOString()} type="button"
                  className={`calendrier__case ${d.getMonth() !== mois.getMonth() ? "calendrier__case--hors" : ""} ${memeJour(d, new Date()) ? "calendrier__case--aujourdhui" : ""} ${choisi ? "calendrier__case--choisi" : ""}`}
                  onClick={() => setJour(choisi ? null : d)} aria-pressed={!!choisi}
                  aria-label={`${d.toLocaleDateString("fr-FR")}${du.length ? `, ${du.length} sortie${du.length > 1 ? "s" : ""}` : ""}`}>
                  {d.getDate()}
                  {du.length > 0 && <span className="calendrier__points">{du.slice(0, 3).map((a) => <span key={a.id} className={`calendrier__point calendrier__point--${a.type}`} />)}</span>}
                </button>
              );
            })}
          </div>
          {jour && <button type="button" className="lien-bouton" onClick={() => setJour(null)}>Afficher toutes les sorties</button>}
        </section>

        <div className="annonces__listes">
          <div className="onglets onglets--mini" role="group" aria-label="Type de sortie">
            {([["tout", "Les deux"], ["donjon", "Donjons"], ["quete", "Quêtes"]] as const).map(([id, nom]) => (
              <button key={id} type="button" className={`onglet onglet--icone ${filtre === id ? "onglet--actif" : ""}`} aria-pressed={filtre === id} onClick={() => setFiltre(id)}>
                {id === "tout" ? <><IconeSortie type="donjon" /><IconeSortie type="quete" /></> : <IconeSortie type={id} />}
                {nom}
              </button>
            ))}
          </div>
          <h2>{jour ? `Le ${jour.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}` : "À venir"}</h2>
          {aVenir.length === 0 ? <p className="vide">Aucune sortie prévue{jour ? " ce jour-là" : ""}.</p> : aVenir.map(carte)}
          {!jour && (
            <>
              <h2>En attente <span className="discret">(sans date)</span></h2>
              {enAttente.length === 0 ? <p className="vide">Rien en attente.</p> : enAttente.map(carte)}
            </>
          )}
          {passees.length > 0 && (
            <details className="annonces__passees">
              <summary>Sorties passées ({passees.length})</summary>
              {passees.map(carte)}
            </details>
          )}
        </div>
      </div>
    </main>
  );
}

function CarteAnnonce({ annonce: a, guilde, participants, invitations, metiers, succes, mesPersos, moiId, officier, onModifier, onChange, onErreur }: {
  annonce: Annonce;
  guilde: DonneesGuilde;
  participants: ParticipantAnnonce[];
  invitations: InvitationAnnonce[];
  metiers: MetierMembre[];
  succes: SuccesDonjon[];
  mesPersos: Personnage[];
  moiId: string;
  officier: boolean;
  onModifier: () => void;
  onChange: () => Promise<void>;
  onErreur: (e: string) => void;
}) {
  const persos = new Map(guilde.personnages.map((p) => [p.id, p]));
  const inscrits = participants.map((p) => persos.get(p.personnage_id)).filter((p): p is Personnage => !!p);
  const mesInscrits = inscrits.filter((p) => p.membre_id === moiId);
  const auteur = guilde.membres.get(a.auteur_id);
  const dj = donjonDeCle(a.donjon);
  const places = placesDe(a);
  const complet = places !== null && inscrits.length >= places;
  const candidats = mesPersos.filter((p) => !inscrits.some((i) => i.id === p.id));
  // Groupe privé : seuls l'auteur et les invités peuvent s'inscrire (la base le vérifie aussi).
  const accesFerme = a.visibilite === "prive" && a.auteur_id !== moiId && !invitations.some((i) => i.membre_id === moiId);
  const estOrganisateur = (p: Personnage) => p.membre_id === a.auteur_id;
  const [choix, setChoix] = useState<string>(candidats[0]?.id ?? "");
  const persoChoisi = mesPersos.find((p) => p.id === choix) ?? candidats[0];
  const refus = persoChoisi ? raisonRefus(a, persoChoisi) : null;
  const peutModifier = a.auteur_id === moiId || officier;
  const monInvitation = invitations.find((i) => i.membre_id === moiId);
  const [inviterOuvert, setInviterOuvert] = useState(false);
  // Personnage pour comparer les succès : celui inscrit, sinon celui choisi.
  const comparant = mesInscrits[0] ?? persoChoisi;

  async function action(f: () => Promise<void>) {
    try { await f(); await onChange(); } catch (e) { onErreur((e as Error).message); }
  }

  return (
    <article className={`carte annonce annonce--${a.type} ${monInvitation?.statut === "en_attente" ? "annonce--invite" : ""}`} id={`annonce-${a.id}`}>
      <div className="annonce__entete">
        {dj ? <IconeDonjon fichier={dj.icone} taille={40} titre={dj.boss} /> : <IconeSortie type={a.type} taille={40} />}
        <div className="annonce__titre">
          <h3>{a.titre}</h3>
          <span className="discret">
            {a.date_prevue ? dateLisible(a.date_prevue) : "En attente : date à fixer"} · publiée par {auteur?.pseudo ?? "un membre"} {ilYa(a.cree_le)}
          </span>
        </div>
        <span className="annonce__etiquettes">
          <span className={`etiquette etiquette--icone ${a.type === "donjon" ? "etiquette--donjon" : "etiquette--groupe"}`}><IconeSortie type={a.type} taille={16} />{a.type === "donjon" ? "Donjon" : "Quête"}</span>
          <span className={`etiquette ${a.visibilite === "prive" ? "etiquette--prive" : "etiquette--ouvert"}`}>{a.visibilite === "prive" ? "🔒 Privé" : "Ouvert"}</span>
        </span>
      </div>

      {monInvitation?.statut === "en_attente" && (
        <div className="annonce__invitation">
          <span>📨 {guilde.membres.get(monInvitation.invite_par)?.pseudo ?? "Un membre"} t'invite à cette sortie.</span>
          <ReponseInvitation annonce={a} invitation={monInvitation} mesPersos={mesPersos} complet={complet} onChange={onChange} onErreur={onErreur} />
        </div>
      )}
      {a.description && <p className="annonce__description">{a.description}</p>}
      <ul className="annonce__details">{resumeAnnonce(a).map((l) => <li key={l}>{l}</li>)}</ul>

      {a.type === "donjon" && a.succes.length > 0 && (
        <div className="annonce__succes">
          <span className="discret">Succès visés{comparant ? `, comparés avec ${comparant.nom}` : ""} :</span>
          {a.succes.map((id) => {
            const info = SUCCES_PAR_ID.get(id);
            if (!info) return null;
            const fait = (pid: string) => succes.some((x) => x.personnage_id === pid && x.succes_id === id && x.statut === "fait");
            const deja = inscrits.filter((p) => fait(p.id)).map((p) => p.nom);
            return (
              <BoutonDefi key={id} libelle={info.succes.libelle} description={info.succes.description} points={info.succes.points}
                icone={info.succes.icone} image={info.succes.icone ? undefined : imageDonjon(info.donjon.icone)}
                fait={comparant ? fait(comparant.id) : false} faitPar={deja} modifiable={false} onBasculer={() => {}} />
            );
          })}
        </div>
      )}

      {a.metiers.length > 0 && (
        <ul className="annonce__metiers">
          {couvertureMetiers(a, inscrits, metiers).map((m) => (
            <li key={m.metier}>
              <span className={m.par ? "vert" : "statut-texte--indispo"}>{m.par ? "✓" : "✗"}</span> {m.metier} {m.niveau}
              <span className="discret"> {m.par ? `: ${m.par.nom}` : ": personne parmi les inscrits"}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="annonce__inscrits">
        <span className="discret">
          {places !== null ? `${inscrits.length} / ${places} places` : `${inscrits.length} inscrit${inscrits.length > 1 ? "s" : ""}`}
        </span>
        <div className="pastilles pastilles--serrees">
          {inscrits.map((p) => (
            <span key={p.id} className={estOrganisateur(p) ? "annonce__organisateur" : undefined} title={estOrganisateur(p) ? `${p.nom}, organisateur` : undefined}>
              <Pastille perso={p} taille={30} />
            </span>
          ))}
        </div>
      </div>

      {invitations.length > 0 && (
        <div className="annonce__invites">
          <span className="discret">Invités :</span>
          {invitations.map((i) => (
            <span key={i.membre_id} className={`invite invite--${i.statut}`}>
              {i.statut === "acceptee" ? "✓" : i.statut === "refusee" ? "✗" : "⏳"} {guilde.membres.get(i.membre_id)?.pseudo ?? "?"}
              {peutModifier && i.statut === "en_attente" && (
                <button type="button" className="lien-bouton" aria-label="Annuler l'invitation"
                  onClick={() => action(() => annulerInvitation(a.id, i.membre_id))}>×</button>
              )}
            </span>
          ))}
        </div>
      )}

      {inviterOuvert && (
        <PanneauInvitation
          membres={[...guilde.membres.values()].filter((m) => m.valide && m.id !== a.auteur_id
            && !invitations.some((i) => i.membre_id === m.id) && !inscrits.some((p) => p.membre_id === m.id))}
          onAnnuler={() => setInviterOuvert(false)}
          onEnvoyer={(ids) => action(async () => { await inviter(a.id, ids, moiId); setInviterOuvert(false); })}
        />
      )}

      <div className="annonce__actions">
        {mesInscrits.filter((p) => !estOrganisateur(p)).map((p) => (
          <button key={p.id} type="button" className="bouton" onClick={() => action(() => retirerParticipation(a.id, p.id))}>Retirer {p.nom}</button>
        ))}
        {mesInscrits.some(estOrganisateur) && <span className="discret">Tu organises cette sortie.</span>}
        {accesFerme && mesInscrits.length === 0 && <span className="discret">🔒 Groupe privé : sur invitation de l'organisateur.</span>}
        {candidats.length > 0 && !complet && !accesFerme && !(a.auteur_id === moiId && mesInscrits.length > 0) && (
          <>
            {candidats.length > 1 && (
              <select value={persoChoisi?.id} onChange={(e) => setChoix(e.target.value)} aria-label="Personnage à inscrire">
                {candidats.map((p) => <option key={p.id} value={p.id}>{p.nom} ({p.classe} {p.niveau})</option>)}
              </select>
            )}
            <button type="button" className="bouton bouton--vert" disabled={!!refus || !persoChoisi}
              onClick={() => persoChoisi && action(async () => {
                await participer(a.id, persoChoisi.id);
                // S'inscrire vaut acceptation d'une invitation en attente.
                if (monInvitation?.statut === "en_attente") await repondreInvitation(a.id, moiId, "acceptee");
              })}>
              Je participe{candidats.length === 1 && persoChoisi ? ` avec ${persoChoisi.nom}` : ""}
            </button>
            {refus && <span className="statut-texte--indispo discret-taille">{refus}</span>}
          </>
        )}
        {complet && mesInscrits.length === 0 && <span className="discret">Complet</span>}
        {peutModifier && (
          <span className="annonce__gestion">
            {!inviterOuvert && <button type="button" className="lien-bouton" onClick={() => setInviterOuvert(true)}>📨 Inviter</button>}
            <button type="button" className="lien-bouton" onClick={onModifier}>Modifier</button>
            <button type="button" className="lien-bouton" onClick={() => window.confirm("Supprimer cette annonce ?") && action(() => supprimerAnnonce(a.id))}>Supprimer</button>
          </span>
        )}
      </div>
    </article>
  );
}

/** Accepter (en s'inscrivant avec un personnage qui remplit les conditions) ou refuser une invitation. */
function ReponseInvitation({ annonce: a, invitation: inv, mesPersos, complet, onChange, onErreur }: {
  annonce: Annonce;
  invitation: InvitationAnnonce;
  mesPersos: Personnage[];
  complet: boolean;
  onChange: () => Promise<void>;
  onErreur: (e: string) => void;
}) {
  const possibles = mesPersos.filter((p) => !raisonRefus(a, p));
  const [choix, setChoix] = useState(possibles[0]?.id ?? "");
  const perso = possibles.find((p) => p.id === choix) ?? possibles[0];
  async function repondre(accepte: boolean) {
    try {
      if (accepte && perso) await participer(a.id, perso.id);
      await repondreInvitation(a.id, inv.membre_id, accepte ? "acceptee" : "refusee");
      await onChange();
    } catch (e) {
      onErreur((e as Error).message);
    }
  }
  return (
    <span className="reponse-invitation">
      {possibles.length > 1 && (
        <select value={perso?.id} onChange={(e) => setChoix(e.target.value)} aria-label="Personnage pour accepter">
          {possibles.map((p) => <option key={p.id} value={p.id}>{p.nom} ({p.classe} {p.niveau})</option>)}
        </select>
      )}
      <button type="button" className="bouton bouton--vert" disabled={!perso || complet} onClick={() => repondre(true)}>
        Accepter{possibles.length === 1 && perso ? ` avec ${perso.nom}` : ""}
      </button>
      <button type="button" className="bouton" onClick={() => repondre(false)}>Refuser</button>
      {possibles.length === 0 && <span className="statut-texte--indispo discret-taille">Aucun de tes personnages ne remplit les conditions.</span>}
      {complet && <span className="discret-taille">Complet</span>}
    </span>
  );
}

/** Choix des membres à inviter (recherche par pseudo). */
function PanneauInvitation({ membres, onEnvoyer, onAnnuler }: { membres: Membre[]; onEnvoyer: (ids: string[]) => void; onAnnuler: () => void }) {
  const [recherche, setRecherche] = useState("");
  const [choisis, setChoisis] = useState<string[]>([]);
  const visibles = membres.filter((m) => m.pseudo.toLowerCase().includes(recherche.toLowerCase())).sort((x, y) => x.pseudo.localeCompare(y.pseudo));
  return (
    <div className="panneau-invitation">
      <input type="search" placeholder="Rechercher un membre…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher un membre" />
      <div className="panneau-invitation__liste">
        {visibles.length === 0 ? <span className="discret">Personne d'autre à inviter.</span> : visibles.map((m) => (
          <label key={m.id} className="case">
            <input type="checkbox" checked={choisis.includes(m.id)} onChange={() => setChoisis((x) => (x.includes(m.id) ? x.filter((y) => y !== m.id) : [...x, m.id]))} />
            {m.avatar_url && <img src={m.avatar_url} alt="" width={20} height={20} className="panneau-invitation__avatar" referrerPolicy="no-referrer" />}
            {m.pseudo}
          </label>
        ))}
      </div>
      <div className="panneau-invitation__actions">
        <button type="button" className="bouton bouton--vert" disabled={choisis.length === 0} onClick={() => onEnvoyer(choisis)}>
          Inviter {choisis.length > 0 ? `(${choisis.length})` : ""}
        </button>
        <button type="button" className="bouton" onClick={onAnnuler}>Annuler</button>
        <span className="discret">Chaque invité est mentionné sur Discord.</span>
      </div>
    </div>
  );
}

const QUETES_PAR_SERIE = CATEGORIES.flatMap((c) => c.series.filter((s) => s.quetes.length).map((s) => ({ nom: c.estDofus ? `Dofus ${s.nom}` : s.nom, quetes: s.quetes })));
const ETIQUETTE_DONJON = (d: (typeof DONJONS_SUCCES)[number]) => `${d.nom} — ${d.boss} (niv. ${d.niveau})`;

function FormulaireAnnonce({ initiale, inscrits, auteurId, membres, mesPersos, onAnnuler, onFini, onErreur }: {
  initiale: Annonce | null;
  /** Personnes déjà inscrites (1 à la création : l'organisateur) : on ne peut pas descendre en dessous. */
  inscrits: number;
  auteurId: string;
  membres: Membre[];
  mesPersos: Personnage[];
  onAnnuler: () => void;
  onFini: () => Promise<void>;
  onErreur: (e: string) => void;
}) {
  const [titre, setTitre] = useState(initiale?.titre ?? "");
  const [description, setDescription] = useState(initiale?.description ?? "");
  const [date, setDate] = useState(initiale?.date_prevue ? versChampDate(initiale.date_prevue) : "");
  const [type, setType] = useState<"donjon" | "quete">(initiale?.type ?? "donjon");
  const [visibilite, setVisibilite] = useState<"ouvert" | "prive">(initiale?.visibilite ?? "ouvert");
  const [places, setPlaces] = useState(initiale?.places ?? PLACES_DONJON);
  // L'organisateur participe d'office, avec le personnage choisi ici (son principal par défaut).
  const [persoAuteurId, setPersoAuteurId] = useState((mesPersos.find((p) => p.est_principal) ?? mesPersos[0])?.id ?? "");
  const djInitial = donjonDeCle(initiale?.donjon ?? null);
  const [donjonTexte, setDonjonTexte] = useState(djInitial ? ETIQUETTE_DONJON(djInitial) : "");
  const [succesChoisis, setSuccesChoisis] = useState<string[]>(initiale?.succes ?? []);
  const [queteId, setQueteId] = useState(initiale?.quete_id ?? (initiale?.quete_nom ? "autre" : ""));
  const [queteNom, setQueteNom] = useState(initiale?.quete_nom ?? "");
  const [niveauMin, setNiveauMin] = useState(initiale?.niveau_min?.toString() ?? "");
  const [alignementMin, setAlignementMin] = useState(initiale?.alignement_min?.toString() ?? "");
  const [ordreMin, setOrdreMin] = useState(initiale?.ordre_min?.toString() ?? "");
  const [metiersReq, setMetiersReq] = useState<MetierRequis[]>(initiale?.metiers ?? []);
  const [enCours, setEnCours] = useState(false);
  const [invites, setInvites] = useState<string[]>([]);
  const [rechercheInvite, setRechercheInvite] = useState("");

  const dj = DONJONS_SUCCES.find((d) => ETIQUETTE_DONJON(d) === donjonTexte);
  // Le succès Duo se fait à 2 : la jauge est alors bloquée à 2 places.
  const duo = type === "donjon" && succesChoisis.some((id) => dj?.succes.find((s) => s.id === id)?.libelle.startsWith("Duo"));
  const maxPlaces = duo ? PLACES_DUO : PLACES_DONJON;
  const placesRetenues = Math.min(Math.max(places, Math.max(2, inscrits)), maxPlaces);
  const nombre = (v: string) => (/^\d+$/.test(v.trim()) ? Number(v) : null);

  // Choisir une quête du site reprend ses prérequis de niveau et de métiers.
  function choisirQuete(id: string) {
    setQueteId(id);
    if (id === "autre" || id === "") return;
    const q = QUETES_PAR_SERIE.flatMap((s) => s.quetes).find((x) => x.id === id);
    if (!q) return;
    const niv = q.prerequis.find((p) => p.type === "niveau");
    if (niv && niv.type === "niveau") setNiveauMin(String(niv.niveau));
    const mets = q.prerequis.flatMap((p) => (p.type === "metier" && p.metier !== "au_choix" ? [{ metier: p.metier, niveau: p.niveau }] : []));
    if (mets.length) setMetiersReq(mets);
    if (!titre) setTitre(q.nom);
  }

  async function valider() {
    if (!titre.trim()) { onErreur("Donne un titre à l'annonce."); return; }
    if (type === "donjon" && !dj) { onErreur("Choisis un donjon dans la liste."); return; }
    if (type === "quete" && queteId === "autre" && !queteNom.trim()) { onErreur("Indique le nom de la quête."); return; }
    if (type === "donjon" && inscrits > maxPlaces) { onErreur(`Il y a déjà ${inscrits} inscrits : impossible de limiter à ${maxPlaces} places.`); return; }
    const champs: ChampsAnnonce = {
      titre: titre.trim(),
      description: description.trim() || null,
      type,
      visibilite,
      places: type === "donjon" ? placesRetenues : null,
      date_prevue: date ? new Date(date).toISOString() : null,
      donjon: type === "donjon" && dj ? cleDonjon(dj) : null,
      succes: type === "donjon" ? succesChoisis.filter((id) => dj?.succes.some((s) => s.id === id)) : [],
      quete_id: type === "quete" && queteId && queteId !== "autre" ? queteId : null,
      quete_nom: type === "quete" && queteId === "autre" ? queteNom.trim() || null : null,
      niveau_min: nombre(niveauMin),
      // L'alignement et l'ordre ne concernent que les quêtes.
      alignement_min: type === "quete" ? nombre(alignementMin) : null,
      ordre_min: type === "quete" ? nombre(ordreMin) : null,
      metiers: type === "quete" ? metiersReq.filter((m) => m.metier && m.niveau > 0) : [],
    };
    const persoAuteur = mesPersos.find((p) => p.id === persoAuteurId);
    if (!initiale) {
      if (!persoAuteur) { onErreur("Crée d'abord un personnage dans Mon compte pour organiser une sortie."); return; }
      const refus = raisonRefus({ ...champs, id: "", auteur_id: auteurId, annonce_discord_le: null, cree_le: "", maj_le: "" }, persoAuteur);
      if (refus) { onErreur(`Tu dois toi-même remplir les conditions : ${refus}`); return; }
    }
    setEnCours(true);
    try {
      const id = await enregistrerAnnonce(champs, auteurId, initiale?.id);
      if (!initiale && persoAuteur) {
        await participer(id, persoAuteur.id); // l'organisateur est le premier inscrit
      }
      if (!initiale) {
        // Les invités sont enregistrés avant le message Discord, qui les mentionne dans la même annonce.
        if (invites.length) await inviter(id, invites, auteurId, false);
        await annoncerSurDiscord(id, resumeAnnonce({ ...champs, id, auteur_id: auteurId, annonce_discord_le: null, cree_le: "", maj_le: "" }));
      }
      await onFini();
    } catch (e) {
      onErreur((e as Error).message);
    }
    setEnCours(false);
  }

  return (
    <section className="carte formulaire-annonce">
      <h2>{initiale ? "Modifier la recherche de groupe" : "Nouvelle recherche de groupe"}</h2>
      <div className="formulaire-annonce__grille">
        <label className="champ">Titre<input maxLength={120} value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="ex. Kimbo Duo + Statue" /></label>
        <label className="champ">Date et heure <span className="discret">(vide = en attente)</span><input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <label className="champ champ--large">Description<textarea maxLength={2000} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Stuff conseillé, point de rendez-vous, stratégie…" /></label>
      </div>

      <div className="formulaire-annonce__grille">
        <div className="champ">
          <span>Accès</span>
          <div className="onglets onglets--mini" role="group" aria-label="Accès au groupe">
            <button type="button" className={`onglet ${visibilite === "ouvert" ? "onglet--actif" : ""}`} aria-pressed={visibilite === "ouvert"} onClick={() => setVisibilite("ouvert")}>Ouvert à tous</button>
            <button type="button" className={`onglet ${visibilite === "prive" ? "onglet--actif" : ""}`} aria-pressed={visibilite === "prive"} onClick={() => setVisibilite("prive")}>🔒 Privé (sur invitation)</button>
          </div>
        </div>
        {!initiale && mesPersos.length > 0 && (
          <label className="champ">Tu participes avec
            <select value={persoAuteurId} onChange={(e) => setPersoAuteurId(e.target.value)}>
              {mesPersos.map((p) => <option key={p.id} value={p.id}>{p.nom} ({p.classe} {p.niveau})</option>)}
            </select>
          </label>
        )}
      </div>

      <div className="onglets onglets--mini" role="group" aria-label="Type de sortie">
        <button type="button" className={`onglet onglet--icone ${type === "donjon" ? "onglet--actif" : ""}`} aria-pressed={type === "donjon"} onClick={() => setType("donjon")}><IconeSortie type="donjon" /> Donjon (8 places)</button>
        <button type="button" className={`onglet onglet--icone ${type === "quete" ? "onglet--actif" : ""}`} aria-pressed={type === "quete"} onClick={() => setType("quete")}><IconeSortie type="quete" /> Quête</button>
      </div>

      {type === "donjon" ? (
        <div className="formulaire-annonce__bloc">
          <label className="champ champ--large">Donjon
            <input list="liste-donjons" value={donjonTexte} onChange={(e) => { setDonjonTexte(e.target.value); setSuccesChoisis([]); }} placeholder="Tape le nom du donjon ou du boss…" />
          </label>
          <datalist id="liste-donjons">{DONJONS_SUCCES.map((d) => <option key={cleDonjon(d)} value={ETIQUETTE_DONJON(d)} />)}</datalist>
          <label className="champ champ--large formulaire-annonce__places">
            <span>
              Places : <strong>{placesRetenues}</strong> <span className="discret">(toi compris, soit {placesRetenues - 1} de plus)</span>
              {duo && <span className="discret"> · succès Duo : 2 places au maximum</span>}
            </span>
            <input type="range" min={2} max={maxPlaces} step={1} value={placesRetenues} disabled={duo}
              onChange={(e) => setPlaces(Number(e.target.value))} aria-label="Nombre de places, organisateur compris" />
            <span className="formulaire-annonce__graduations" aria-hidden="true">
              {Array.from({ length: PLACES_DONJON - 1 }, (_, i) => i + 2).map((n) => <span key={n} className={n > maxPlaces ? "discret" : undefined}>{n}</span>)}
            </span>
          </label>
          {dj && (
            <div className="formulaire-annonce__succes">
              <span className="discret">Succès visés (facultatif) :</span>
              {dj.succes.map((s) => (
                <label key={s.id} className="case">
                  <input type="checkbox" checked={succesChoisis.includes(s.id)}
                    onChange={() => setSuccesChoisis((x) => (x.includes(s.id) ? x.filter((y) => y !== s.id) : [...x, s.id]))} />
                  <span title={s.description}>{s.libelle}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="formulaire-annonce__bloc">
          <label className="champ champ--large">Quête <span className="discret">(une quête du site reprend ses prérequis)</span>
            <select value={queteId} onChange={(e) => choisirQuete(e.target.value)}>
              <option value="">Choisir une quête…</option>
              <option value="autre">Autre quête, absente du site (saisir son nom)</option>
              {QUETES_PAR_SERIE.map((s) => (
                <optgroup key={s.nom} label={s.nom}>{s.quetes.map((q) => <option key={q.id} value={q.id}>{q.nom}</option>)}</optgroup>
              ))}
            </select>
          </label>
          {queteId === "autre" && (
            <label className="champ champ--large">Nom de la quête
              <input maxLength={120} value={queteNom} onChange={(e) => setQueteNom(e.target.value)} placeholder="ex. Le Tracas du Guerrier" />
            </label>
          )}
          <div className="formulaire-annonce__metiers">
            <span className="discret">Métiers nécessaires (au moins un inscrit doit les avoir) :</span>
            {metiersReq.map((m, i) => (
              <span key={i} className="formulaire-annonce__metier">
                <select value={m.metier} onChange={(e) => setMetiersReq((x) => x.map((y, j) => (j === i ? { ...y, metier: e.target.value } : y)))} aria-label="Métier">
                  {METIERS.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
                <input inputMode="numeric" value={m.niveau || ""} placeholder="niv." aria-label="Niveau du métier"
                  onChange={(e) => setMetiersReq((x) => x.map((y, j) => (j === i ? { ...y, niveau: Number(e.target.value) || 0 } : y)))} />
                <button type="button" className="lien-bouton" onClick={() => setMetiersReq((x) => x.filter((_, j) => j !== i))}>Retirer</button>
              </span>
            ))}
            <button type="button" className="lien-bouton" onClick={() => setMetiersReq((x) => [...x, { metier: METIERS[0], niveau: 1 }])}>+ Ajouter un métier</button>
          </div>
        </div>
      )}

      <div className="formulaire-annonce__grille">
        <label className="champ">Niveau minimum <span className="discret">(les inscrits en dessous sont refusés)</span><input inputMode="numeric" value={niveauMin} onChange={(e) => setNiveauMin(e.target.value)} placeholder="ex. 160" /></label>
        {type === "quete" && (
          <>
            <label className="champ">Alignement minimum<input inputMode="numeric" value={alignementMin} onChange={(e) => setAlignementMin(e.target.value)} placeholder="ex. 20" /></label>
            <label className="champ">Rang d'ordre minimum
              <select value={ordreMin} onChange={(e) => setOrdreMin(e.target.value)}>
                <option value="">Aucun</option>
                {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>Ordre {r}</option>)}
              </select>
            </label>
          </>
        )}
      </div>

      {!initiale && (
        <div className="formulaire-annonce__bloc">
          <span className="discret">Inviter des membres (facultatif) : ils sont mentionnés sur Discord et acceptent ou refusent sur le site.</span>
          <input type="search" placeholder="Rechercher un membre…" value={rechercheInvite} onChange={(e) => setRechercheInvite(e.target.value)} aria-label="Rechercher un membre à inviter" />
          <div className="panneau-invitation__liste">
            {membres.filter((m) => m.pseudo.toLowerCase().includes(rechercheInvite.toLowerCase())).sort((x, y) => x.pseudo.localeCompare(y.pseudo)).map((m) => (
              <label key={m.id} className="case">
                <input type="checkbox" checked={invites.includes(m.id)} onChange={() => setInvites((x) => (x.includes(m.id) ? x.filter((y) => y !== m.id) : [...x, m.id]))} />
                {m.avatar_url && <img src={m.avatar_url} alt="" width={20} height={20} className="panneau-invitation__avatar" referrerPolicy="no-referrer" />}
                {m.pseudo}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="formulaire-annonce__actions">
        <button type="button" className="bouton bouton--vert" onClick={valider} disabled={enCours}>{initiale ? "Enregistrer" : invites.length ? `Publier et inviter (${invites.length})` : "Publier"}</button>
        <button type="button" className="bouton" onClick={onAnnuler} disabled={enCours}>Annuler</button>
        {!initiale && <span className="discret">Tu seras inscrit d'office. La recherche sera aussi annoncée sur Discord{invites.length ? ", avec la mention des invités" : ""}.</span>}
      </div>
    </section>
  );
}

/** ISO → valeur d'un champ datetime-local (heure locale). */
function versChampDate(iso: string): string {
  const d = new Date(iso);
  const z = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`;
}

