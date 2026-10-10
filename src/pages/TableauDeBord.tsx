import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../lib/session";
import { IconeDonjon, imageDonjon } from "../components/IconeDonjon";
import { BoutonDefi } from "../components/BoutonDefi";
import { SUCCES_PAR_ID } from "../data/succesDonjons";
import { IconeMetier } from "../components/IconeMetier";
import { IconeSortie } from "../components/IconeSortie";
import { CarteAlmanax } from "../components/CarteAlmanax";
import { NomAvecPastille, Pastille } from "../components/Pastille";
import { ilYa } from "../lib/dates";
import { chargerAides, chargerAnnonces, chargerAvis, chargerGuilde, chargerMetiers, chargerSouhaits, chargerSucces, participer, repondreInvitation, toutesLesQuetes } from "../lib/donnees";
import { dateLisible, donjonDeCle, ordresDe, placesDe, raisonRefus } from "../lib/annonces";
import type { Annonce, InvitationAnnonce, ParticipantAnnonce, SuccesDonjon } from "../lib/types";
import { estDispo, type Personnage } from "../lib/types";
import { calculerBilan, objectifsSeries, type Bilan, type Blocage, type Objectif } from "../lib/tableauDeBord";
import { Chargement } from "./Acces";

export function TableauDeBord() {
  const [bilan, setBilan] = useState<Bilan | null>(null);
  // Qui peut aider sur chaque quête (« Je peux aider »), déjà résolu en personnages.
  const [aidants, setAidants] = useState<Map<string, Aidant[]>>(new Map());
  const [erreur, setErreur] = useState<string | null>(null);
  const [annonces, setAnnonces] = useState<{ annonces: Annonce[]; participants: ParticipantAnnonce[]; invitations: InvitationAnnonce[] }>({ annonces: [], participants: [], invitations: [] });
  const { membre: moi, mesPersos } = useSession();
  const [auteurs, setAuteurs] = useState<Map<string, string>>(new Map());
  const [persosGuilde, setPersosGuilde] = useState<Personnage[]>([]);
  const [succesGuilde, setSuccesGuilde] = useState<SuccesDonjon[]>([]);

  useEffect(() => {
    chargerAnnonces().then(setAnnonces).catch(() => {});
  }, []);

  useEffect(() => {
    Promise.all([chargerGuilde(), chargerMetiers(), toutesLesQuetes(), chargerSouhaits(), chargerAvis(), chargerAides(), chargerSucces()])
      .then(([g, m, q, s, a, aides, succes]) => {
        setAuteurs(new Map([...g.membres.values()].map((x) => [x.id, x.pseudo])));
        setPersosGuilde(g.personnages);
        setSuccesGuilde(succes);
        const b = calculerBilan(g.personnages, g.membres, m, q, s, a);
        // Les boss du Tour du monde, d'Emma Tom Pouce et de Frigost rejoignent les autres groupes à monter.
        const objectifs = [...b.objectifs, ...objectifsSeries(g.personnages, g.membres, q, s, succes)]
          .sort((x, y) => y.persos.length - x.persos.length || y.nbDispo - x.nbDispo);
        setBilan({ ...b, objectifs });
        const persos = new Map(g.personnages.map((x) => [x.id, x]));
        const parQuete = new Map<string, Aidant[]>();
        for (const aide of aides) {
          const perso = persos.get(aide.personnage_id);
          if (!perso) continue;
          if (!parQuete.has(aide.quete_id)) parQuete.set(aide.quete_id, []);
          parQuete.get(aide.quete_id)!.push({ perso, dispo: estDispo(g.membres.get(perso.membre_id), perso.id), note: aide.note });
        }
        setAidants(parQuete);
      })
      .catch((e) => setErreur(e.message));
  }, []);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!bilan) return <Chargement />;

  const chiffres = [
    { valeur: bilan.membresActifs, libelle: "membres actifs" },
    { valeur: bilan.dispoMaintenant, libelle: "dispo maintenant" },
    { valeur: bilan.dofusObtenus, libelle: "Dofus obtenus" },
    { valeur: `${bilan.fichesAJour} %`, libelle: "fiches à jour" },
  ];

  return (
    <main className="page page--accueil">
      <div className="entete">
        <h1>Tableau de bord</h1>
        <ul className="chiffres">
          {chiffres.map((c) => (
            <li key={c.libelle}><strong>{c.valeur}</strong><span>{c.libelle}</span></li>
          ))}
        </ul>
      </div>

      {/* Ligne 1 : l'Almanax (à gauche) et les sorties prévues (à droite). */}
      <div className="accueil-ligne accueil-ligne--haut">
        <CarteAlmanax />
        <BlocAnnonces annonces={annonces.annonces} participants={annonces.participants} auteurs={auteurs}
          invitations={annonces.invitations.filter((i) => i.membre_id === moi?.id && i.statut === "en_attente")}
          toutesInvitations={annonces.invitations} moiId={moi?.id ?? ""} mesPersos={mesPersos} persos={persosGuilde} succes={succesGuilde}
          onChange={() => chargerAnnonces().then(setAnnonces).catch(() => {})} />
      </div>

      {/* Ligne 2 : les groupes à monter (boss et métiers) et les Dofus de la guilde. */}
      <div className="accueil-ligne accueil-ligne--milieu">
        <GroupesAMonter objectifs={bilan.objectifs} blocages={bilan.blocages} aidants={aidants} pseudos={auteurs} />

        <section className="carte">
          <h2>Dofus dans la guilde</h2>
          <ul className="barres-dofus barres-dofus--compactes">
            {bilan.dofus.map(({ dofus, obtenus, enCours, total }) => (
              <li key={dofus.id}>
                <span>{dofus.nom}</span>
                <div className="barre-double" role="img" aria-label={`${obtenus} obtenus, ${enCours} en cours sur ${total} personnages`}>
                  <div style={{ width: `${total ? (obtenus / total) * 100 : 0}%` }} />
                  <div style={{ width: `${total ? (enCours / total) * 100 : 0}%` }} />
                </div>
                <span className="discret">{obtenus} / {total}</span>
              </li>
            ))}
          </ul>
          <span className="discret">Vert : obtenu, doré : en cours</span>
        </section>
      </div>

      {/* Ligne 3 : l'activité récente, sur toute la largeur. */}
      {bilan.activite.length > 0 && (
        <section className="carte">
          <h2>Activité récente</h2>
          <ul className="activite activite--colonnes">
            {bilan.activite.map((a, i) => (
              <li key={i}><span>{a.texte}</span><span className="discret">{ilYa(a.date)}</span></li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

type Aidant = { perso: Personnage; dispo: boolean; note: string | null };

/** Bouton « Rejoindre » d'une recherche de groupe, sur l'accueil : mêmes règles que la page (conditions, places, accès). */
function Rejoindre({ annonce: a, inscrits, moiId, mesPersos, invite, onChange }: {
  annonce: Annonce;
  inscrits: ParticipantAnnonce[];
  moiId: string;
  mesPersos: Personnage[];
  invite: boolean;
  onChange: () => void;
}) {
  const [choix, setChoix] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const miens = mesPersos.filter((p) => inscrits.some((x) => x.personnage_id === p.id));
  const places = placesDe(a);
  if (a.auteur_id === moiId) return null;
  if (miens.length) return <span className="discret-taille rejoindre__etat vert">✓ Inscrit avec {miens.map((p) => p.nom).join(", ")}</span>;
  if (a.visibilite === "prive" && !invite) return <span className="bouton bouton--petit bouton--inactif" title="Groupe privé : sur invitation">Sur invitation</span>;
  if (places !== null && inscrits.length >= places) return <span className="bouton bouton--petit bouton--inactif">Complet</span>;
  const possibles = mesPersos.filter((p) => !raisonRefus(a, p));
  if (!possibles.length) {
    const raison = mesPersos[0] ? raisonRefus(a, mesPersos[0]) : "Aucun personnage.";
    return <span className="bouton bouton--petit bouton--inactif" title={raison ?? undefined}>Conditions non remplies</span>;
  }
  const perso = possibles.find((p) => p.id === choix) ?? possibles.find((p) => p.est_principal) ?? possibles[0];
  async function rejoindre() {
    try {
      await participer(a.id, perso.id);
      if (invite) await repondreInvitation(a.id, moiId, "acceptee").catch(() => {});
      onChange();
    } catch (e) {
      setErreur((e as Error).message);
    }
  }
  return (
    <span className="rejoindre">
      {possibles.length > 1 && (
        <select value={perso.id} onChange={(e) => setChoix(e.target.value)} aria-label="Personnage pour rejoindre">
          {possibles.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)}
        </select>
      )}
      <button type="button" className="bouton bouton--vert bouton--petit" onClick={rejoindre}>
        Rejoindre{possibles.length === 1 ? ` avec ${perso.nom}` : ""}
      </button>
      {erreur && <span className="erreur discret-taille">{erreur}</span>}
    </span>
  );
}

const APERCU = 3; // éléments visibles avant « Afficher tout »

/**
 * Groupes à monter : boss et combats, puis métiers, l'un sous l'autre. Une recherche filtre sur ses alliés
 * (personnage ou pseudo) ; chaque section montre les 3 premiers éléments et se déplie.
 * Les métiers se lisent comme la page Métiers : la liste au centre, les métiers à sélectionner à droite.
 */
export function GroupesAMonter({ objectifs, blocages, aidants, pseudos }: {
  objectifs: Objectif[];
  blocages: Blocage[];
  aidants: Map<string, Aidant[]>;
  pseudos: Map<string, string>;
}) {
  const [recherche, setRecherche] = useState("");
  const [tousBoss, setTousBoss] = useState(false);
  const [tousMetiers, setTousMetiers] = useState(false);
  const [metierChoisi, setMetierChoisi] = useState<string | null>(null);
  // Par défaut, seulement les blocages où un allié peut aider ; ceux qui doivent monter le métier eux-mêmes sur demande.
  const [voirPersonnels, setVoirPersonnels] = useState(false);

  const q = recherche.trim().toLowerCase();
  const correspond = (p: Personnage) => !q || p.nom.toLowerCase().includes(q) || (pseudos.get(p.membre_id) ?? "").toLowerCase().includes(q);
  const boss = objectifs.filter((o) => o.persos.some((x) => correspond(x.perso)));
  const parMetier = new Map<string, Blocage[]>();
  const blocagesRetenus = blocages.filter((b) => voirPersonnels || !b.personnel);
  const nbPersonnels = blocages.filter((b) => b.personnel).reduce((n, b) => n + b.persos.length, 0);
  for (const b of blocagesRetenus) {
    if (!b.persos.some(correspond)) continue;
    parMetier.set(b.metier, [...(parMetier.get(b.metier) ?? []), b]);
  }
  const metiers = [...parMetier.entries()].sort((a, b) => b[1].reduce((n, x) => n + x.persos.length, 0) - a[1].reduce((n, x) => n + x.persos.length, 0));
  const choisi = metierChoisi && parMetier.has(metierChoisi) ? metierChoisi : null;
  const blocagesVus = (choisi ? parMetier.get(choisi)! : [...parMetier.values()].flat()).sort((a, b) => b.persos.length - a.persos.length);

  return (
    <section className="carte carte--forte groupes-a-monter">
      <div className="carte__entete">
        <h2>Groupes à monter</h2>
        <input type="search" className="groupes-a-monter__recherche" placeholder="Chercher un allié…" value={recherche}
          onChange={(e) => setRecherche(e.target.value)} aria-label="Chercher un allié (personnage ou pseudo)" />
      </div>

      <div className="groupes-section">
        <h3>Boss et combats <span className="discret">({boss.length})</span></h3>
        {boss.length === 0 ? (
          <p className="vide">
            {q ? "Aucun groupe avec cet allié." : <>Personne n'en est au même donjon, combat ou avis pour l'instant. Coche tes <Link to="/quetes">quêtes</Link>, ou « Je cherche un groupe » sur un <Link to="/avis">avis</Link>.</>}
          </p>
        ) : (
          <>
            <ul className="objectifs">
              {(tousBoss ? boss : boss.slice(0, APERCU)).map((o) => <CarteObjectif key={o.cle} objectif={o} aidants={o.queteIds.flatMap((id) => aidants.get(id) ?? [])} />)}
            </ul>
            {boss.length > APERCU && (
              <button type="button" className="lien-bouton groupes-section__plus" onClick={() => setTousBoss(!tousBoss)}>
                {tousBoss ? "Réduire" : `Afficher les ${boss.length - APERCU} autres`}
              </button>
            )}
          </>
        )}
      </div>

      <div className="groupes-section">
        <div className="groupes-section__entete">
          <h3>Métiers <span className="discret">({blocagesRetenus.reduce((n, b) => n + b.persos.length, 0)} blocages)</span></h3>
          <label className="case">
            <input type="checkbox" checked={voirPersonnels} onChange={() => setVoirPersonnels(!voirPersonnels)} />
            Afficher aussi ceux qui doivent monter le métier eux-mêmes{nbPersonnels ? ` (${nbPersonnels})` : ""}
          </label>
        </div>
        {metiers.length === 0 ? (
          <p className="vide">
            {q ? "Aucun blocage de métier pour cet allié."
              : voirPersonnels ? "Aucun métier ne bloque la guilde en ce moment."
              : "Aucun blocage où un allié peut crafter à la place." + (nbPersonnels ? " Coche la case pour voir ceux qui doivent monter leur métier eux-mêmes." : "")}
          </p>
        ) : (
          <div className="groupes-metiers">
            <div className="groupes-metiers__centre">
              <ul className="blocages">
                {(tousMetiers ? blocagesVus : blocagesVus.slice(0, APERCU)).map((b) => (
                  <li key={b.cle}>
                    <div className="blocage__titre">
                      <IconeMetier metier={b.metier} taille={24} />
                      <strong>{b.titre}</strong>
                      <span className="discret">{b.persos.length} perso{b.persos.length > 1 ? "s" : ""} bloqué{b.persos.length > 1 ? "s" : ""}</span>
                      {b.personnel && <span className="etiquette etiquette--soi">à monter soi-même</span>}
                    </div>
                    {!b.personnel && (
                      <span className="discret-taille">
                        {b.crafteurs.length ? `Peuvent crafter : ${b.crafteurs.join(", ")}` : "Personne dans la guilde n'a encore ce niveau."}
                      </span>
                    )}
                    <div className="blocage__persos">
                      {b.persos.filter(correspond).map((p) => <NomAvecPastille key={p.id} perso={p} taille={22} />)}
                    </div>
                    <span className="blocages__quetes">
                      {b.quetes.map((x) => (
                        <Link key={x.id} className="bulle-lien" to={`/progression?dofus=${x.dofus}&etape=${x.id}`} title="Voir qui est bloqué à cette étape">
                          {x.libelle}
                        </Link>
                      ))}
                    </span>
                    <LigneAidants aidants={b.quetes.flatMap((x) => aidants.get(x.id) ?? [])} />
                  </li>
                ))}
              </ul>
              {blocagesVus.length > APERCU && (
                <button type="button" className="lien-bouton groupes-section__plus" onClick={() => setTousMetiers(!tousMetiers)}>
                  {tousMetiers ? "Réduire" : `Afficher les ${blocagesVus.length - APERCU} autres`}
                </button>
              )}
            </div>
            <nav className="groupes-metiers__liste" aria-label="Filtrer par métier">
              <button type="button" className={`groupes-metiers__choix ${!choisi ? "groupes-metiers__choix--actif" : ""}`} onClick={() => setMetierChoisi(null)}>
                Tous les métiers
              </button>
              {metiers.map(([m, liste]) => (
                <button key={m} type="button" className={`groupes-metiers__choix ${choisi === m ? "groupes-metiers__choix--actif" : ""}`}
                  aria-pressed={choisi === m} onClick={() => setMetierChoisi(choisi === m ? null : m)}>
                  <IconeMetier metier={m} taille={22} />
                  <span>{m}</span>
                  <span className="groupes-metiers__nb">{liste.reduce((n, x) => n + x.persos.length, 0)}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}

/** Les prochaines sorties et celles en attente, avec la date de publication (« il y a 2 h »). */
function BlocAnnonces({ annonces, participants, auteurs, invitations, toutesInvitations, moiId, mesPersos, persos, succes, onChange }: {
  annonces: Annonce[];
  participants: ParticipantAnnonce[];
  auteurs: Map<string, string>;
  invitations: InvitationAnnonce[];
  toutesInvitations: InvitationAnnonce[];
  moiId: string;
  mesPersos: Personnage[];
  persos: Personnage[];
  succes: SuccesDonjon[];
  onChange: () => void;
}) {
  // Les succès visés sont comparés avec mon personnage principal, comme sur la page Recherche de groupe.
  const monPerso = mesPersos.find((p) => p.est_principal) ?? mesPersos[0];
  const seuil = Date.now() - 3 * 3600e3;
  const prochaines = annonces
    .filter((a) => !a.date_prevue || new Date(a.date_prevue).getTime() >= seuil)
    .sort((a, b) => (a.date_prevue && b.date_prevue ? a.date_prevue.localeCompare(b.date_prevue) : a.date_prevue ? -1 : b.date_prevue ? 1 : b.cree_le.localeCompare(a.cree_le)))
    .slice(0, 5);
  return (
    <section className="carte bloc-annonces">
      <div className="carte__entete">
        <h2><Link to="/groupes" className="titre-lien" title="Toutes les recherches et le calendrier">Recherche de groupe</Link></h2>
      </div>
      {invitations.map((i) => {
        const a = annonces.find((x) => x.id === i.annonce_id);
        if (!a) return null;
        return (
          <p key={a.id} className="bloc-annonces__invitation">
            📨 {auteurs.get(i.invite_par) ?? "Un membre"} t'invite à <Link to={`/groupes#annonce-${a.id}`}>{a.titre}</Link>
            {a.date_prevue ? ` (${dateLisible(a.date_prevue)})` : ""}. <Link to={`/groupes#annonce-${a.id}`}>Répondre</Link>
          </p>
        );
      })}
      {prochaines.length === 0 ? (
        <p className="vide">Aucune sortie prévue. <Link to="/groupes">Propose la première</Link> !</p>
      ) : (
        <ul className="bloc-annonces__liste">
          {prochaines.map((a) => {
            const n = participants.filter((p) => p.annonce_id === a.id).length;
            const dj = donjonDeCle(a.donjon);
            return (
              <li key={a.id}>
                <div className="bloc-annonces__haut">
                <Link to="/groupes" className="bloc-annonces__titre">
                  {/* Donjon : la tête du boss ; quête : le parchemin. */}
                  {a.type === "donjon" && dj ? <IconeDonjon fichier={dj.icone} taille={22} titre={dj.boss} /> : <IconeSortie type={a.type} />}
                  {a.titre}
                  {a.visibilite === "prive" && (
                    <span title={a.auteur_id === moiId || toutesInvitations.some((x) => x.annonce_id === a.id && x.membre_id === moiId) ? "Groupe privé : tu as accès" : "Groupe privé : sur invitation"}>
                      {a.auteur_id === moiId || toutesInvitations.some((x) => x.annonce_id === a.id && x.membre_id === moiId) ? " 🔓" : " 🔒"}
                    </span>
                  )}
                </Link>
                <span className="discret-taille bloc-annonces__quand" title={`Publiée par ${auteurs.get(a.auteur_id) ?? "un membre"}`}>{ilYa(a.cree_le)}</span>
                </div>
                <span className="discret-taille">
                  {a.date_prevue ? dateLisible(a.date_prevue) : "En attente"}
                  {dj ? ` · ${dj.nom}` : ""} · {placesDe(a) !== null ? `${n}/${placesDe(a)} places` : `${n} inscrit${n > 1 ? "s" : ""}`}
                </span>
                {(() => {
                  // Les participants, organisateur en premier (couronne), comme sur la page Recherche de groupe.
                  const inscrits = participants.filter((p) => p.annonce_id === a.id).map((p) => persos.find((x) => x.id === p.personnage_id)).filter((x): x is Personnage => !!x);
                  const organisateur = inscrits.find((p) => p.membre_id === a.auteur_id)
                    ?? persos.filter((p) => p.membre_id === a.auteur_id).sort((x, y) => Number(y.est_principal) - Number(x.est_principal))[0];
                  const autres = inscrits.filter((p) => p.membre_id !== a.auteur_id);
                  const ordres = ordresDe(a);
                  return (
                    <>
                      <div className="bloc-annonces__inscrits">
                        {organisateur && <span className="annonce__organisateur" title={`${organisateur.nom}, organisateur`}><Pastille perso={organisateur} taille={26} /></span>}
                        {autres.map((p) => <Pastille key={p.id} perso={p} taille={26} />)}
                      </div>
                      {a.type === "donjon" && a.succes.length > 0 && (
                        <div className="bloc-annonces__succes">
                          {a.succes.map((id) => {
                            const info = SUCCES_PAR_ID.get(id);
                            if (!info) return null;
                            const fait = (pid: string) => succes.some((x) => x.personnage_id === pid && x.succes_id === id && x.statut === "fait");
                            return (
                              <BoutonDefi key={id} libelle={info.succes.libelle} description={info.succes.description} points={info.succes.points}
                                icone={info.succes.icone} image={info.succes.icone ? undefined : imageDonjon(info.donjon.icone)}
                                fait={monPerso ? fait(monPerso.id) : false} faitPar={inscrits.filter((p) => fait(p.id)).map((p) => p.nom)}
                                modifiable={false} onBasculer={() => {}} />
                            );
                          })}
                        </div>
                      )}
                      {a.type === "quete" && (a.metiers.length > 0 || ordres.length > 0) && (
                        <span className="discret-taille">
                          {a.metiers.length > 0 && <>Métiers : {a.metiers.map((m) => `${m.metier} ${m.niveau}`).join(", ")}</>}
                          {a.metiers.length > 0 && ordres.length > 0 && " · "}
                          {ordres.length > 0 && <>Ordre{ordres.length > 1 ? "s" : ""} : {ordres.map((o) => `${o.ordre} ${o.rang}`).join(" ou ")}</>}
                        </span>
                      )}
                    </>
                  );
                })()}
                <Rejoindre annonce={a} inscrits={participants.filter((p) => p.annonce_id === a.id)} moiId={moiId} mesPersos={mesPersos}
                  invite={toutesInvitations.some((x) => x.annonce_id === a.id && x.membre_id === moiId)} onChange={onChange} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

/** « Peuvent aider : … » sous une carte ; rien si personne ne s'est positionné. */
function LigneAidants({ aidants }: { aidants: Aidant[] }) {
  const uniques = [...new Map(aidants.map((a) => [a.perso.id, a])).values()];
  if (uniques.length === 0) return null;
  return (
    <span className="discret-taille">
      🤝 Peuvent aider :{" "}
      {uniques.map((a, i) => (
        <span key={a.perso.id} title={a.note ?? undefined}>
          {i > 0 && " "}
          <NomAvecPastille perso={a.perso} dispo={a.dispo} taille={20} />
        </span>
      ))}
    </span>
  );
}

function CarteObjectif({ objectif: o, aidants }: { objectif: Objectif; aidants: Aidant[] }) {
  const [copie, setCopie] = useState(false);

  // En attendant l'intégration Discord : un message prêt à coller dans le salon.
  async function proposer() {
    const noms = o.persos.map((x) => x.perso.nom).join(", ");
    const texte = `Qui est chaud pour ${o.titre} ? (${o.quetes.join(", ")}) Concernés : ${noms}`;
    try {
      await navigator.clipboard.writeText(texte);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      window.prompt("Copie ce message dans Discord :", texte);
    }
  }

  return (
    <li className="objectif">
      <div className="objectif__nb"><strong>{o.persos.length}</strong><span>persos</span></div>
      <div className="objectif__corps">
        <div className="objectif__titre">
          <strong>{o.titre}</strong>
          <span className={`etiquette ${o.type === "Donjon" ? "etiquette--donjon" : o.type === "Avis de recherche" ? "etiquette--avis" : "etiquette--groupe"}`}>{o.type}</span>
        </div>
        <span className="discret-taille">{o.quetes.join(", ")}</span>
        {o.note && <span className="discret-taille objectif__note"><IconeDonjon fichier={o.icone ?? ""} taille={20} /> {o.note}</span>}
        <LigneAidants aidants={aidants} />
        <div className="pastilles">
          {o.persos.map((x) => <Pastille key={x.perso.id} perso={x.perso} dispo={x.dispo} taille={30} />)}
          <span className={o.nbDispo ? "vert" : "discret"}>{o.nbDispo ? `${o.nbDispo} dispo maintenant` : "personne de dispo"}</span>
        </div>
      </div>
      <button type="button" className="bouton bouton--vert" onClick={proposer} aria-live="polite">
        {copie ? "Message copié" : "Proposer un groupe"}
      </button>
    </li>
  );
}

