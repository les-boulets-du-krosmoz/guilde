import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../lib/session";
import { IconeDonjon } from "../components/IconeDonjon";
import { IconeSortie } from "../components/IconeSortie";
import { NomAvecPastille, Pastille } from "../components/Pastille";
import { ilYa } from "../lib/dates";
import { chargerAides, chargerAnnonces, chargerAvis, chargerGuilde, chargerMetiers, chargerSouhaits, chargerSucces, toutesLesQuetes } from "../lib/donnees";
import { dateLisible, donjonDeCle, PLACES_DONJON } from "../lib/annonces";
import type { Annonce, InvitationAnnonce, ParticipantAnnonce } from "../lib/types";
import { estDispo, type Personnage } from "../lib/types";
import { calculerBilan, objectifsSeries, type Bilan, type Objectif } from "../lib/tableauDeBord";
import { Chargement } from "./Acces";

export function TableauDeBord() {
  const [bilan, setBilan] = useState<Bilan | null>(null);
  // Qui peut aider sur chaque quête (« Je peux aider »), déjà résolu en personnages.
  const [aidants, setAidants] = useState<Map<string, Aidant[]>>(new Map());
  const [erreur, setErreur] = useState<string | null>(null);
  const [annonces, setAnnonces] = useState<{ annonces: Annonce[]; participants: ParticipantAnnonce[]; invitations: InvitationAnnonce[] }>({ annonces: [], participants: [], invitations: [] });
  const { membre: moi } = useSession();
  const [auteurs, setAuteurs] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    chargerAnnonces().then(setAnnonces).catch(() => {});
  }, []);

  useEffect(() => {
    Promise.all([chargerGuilde(), chargerMetiers(), toutesLesQuetes(), chargerSouhaits(), chargerAvis(), chargerAides(), chargerSucces()])
      .then(([g, m, q, s, a, aides, succes]) => {
        setAuteurs(new Map([...g.membres.values()].map((x) => [x.id, x.pseudo])));
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
    <main className="page">
      <div className="entete">
        <h1>Tableau de bord</h1>
        <ul className="chiffres">
          {chiffres.map((c) => (
            <li key={c.libelle}><strong>{c.valeur}</strong><span>{c.libelle}</span></li>
          ))}
        </ul>
      </div>

      <BlocAnnonces annonces={annonces.annonces} participants={annonces.participants} auteurs={auteurs}
        invitations={annonces.invitations.filter((i) => i.membre_id === moi?.id && i.statut === "en_attente")} />

      <div className="tdb">
        <section className="carte carte--forte">
          <h2>Groupes à monter</h2>
          {bilan.objectifs.length === 0 ? (
            <p className="vide">
              Personne n'en est au même donjon, combat de groupe ou avis pour l'instant. Coche tes{" "}
              <Link to="/quetes">quêtes</Link>, ou « Je cherche un groupe » sur un <Link to="/avis">avis</Link>, pour apparaître ici.
            </p>
          ) : (
            <ul className="objectifs">
              {bilan.objectifs.map((o) => <CarteObjectif key={o.cle} objectif={o} aidants={o.queteIds.flatMap((id) => aidants.get(id) ?? [])} />)}
            </ul>
          )}
        </section>

        <div className="tdb__cote">
          {bilan.blocages.length > 0 && (
            <section className="carte">
              <h2>Métiers qui bloquent</h2>
              <ul className="blocages">
                {bilan.blocages.map((b) => (
                  <li key={b.cle}>
                    <strong>{b.titre} : {b.persos.length} perso{b.persos.length > 1 ? "s" : ""} bloqué{b.persos.length > 1 ? "s" : ""}</strong>
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
            </section>
          )}

          <section className="carte">
            <h2>Dofus dans la guilde</h2>
            <ul className="barres-dofus">
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

          {bilan.activite.length > 0 && (
            <section className="carte">
              <h2>Activité récente</h2>
              <ul className="activite">
                {bilan.activite.map((a, i) => (
                  <li key={i}><span>{a.texte}</span><span className="discret">{ilYa(a.date)}</span></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

type Aidant = { perso: Personnage; dispo: boolean; note: string | null };

/** Les prochaines sorties et celles en attente, avec la date de publication (« il y a 2 h »). */
function BlocAnnonces({ annonces, participants, auteurs, invitations }: { annonces: Annonce[]; participants: ParticipantAnnonce[]; auteurs: Map<string, string>; invitations: InvitationAnnonce[] }) {
  const seuil = Date.now() - 3 * 3600e3;
  const prochaines = annonces
    .filter((a) => !a.date_prevue || new Date(a.date_prevue).getTime() >= seuil)
    .sort((a, b) => (a.date_prevue && b.date_prevue ? a.date_prevue.localeCompare(b.date_prevue) : a.date_prevue ? -1 : b.date_prevue ? 1 : b.cree_le.localeCompare(a.cree_le)))
    .slice(0, 5);
  return (
    <section className="carte bloc-annonces">
      <div className="carte__entete">
        <h2>Annonces</h2>
        <Link to="/annonces">Toutes les annonces et le calendrier</Link>
      </div>
      {invitations.map((i) => {
        const a = annonces.find((x) => x.id === i.annonce_id);
        if (!a) return null;
        return (
          <p key={a.id} className="bloc-annonces__invitation">
            📨 {auteurs.get(i.invite_par) ?? "Un membre"} t'invite à <Link to={`/annonces#annonce-${a.id}`}>{a.titre}</Link>
            {a.date_prevue ? ` (${dateLisible(a.date_prevue)})` : ""}. <Link to={`/annonces#annonce-${a.id}`}>Répondre</Link>
          </p>
        );
      })}
      {prochaines.length === 0 ? (
        <p className="vide">Aucune sortie prévue. <Link to="/annonces">Propose la première</Link> !</p>
      ) : (
        <ul className="bloc-annonces__liste">
          {prochaines.map((a) => {
            const n = participants.filter((p) => p.annonce_id === a.id).length;
            const dj = donjonDeCle(a.donjon);
            return (
              <li key={a.id}>
                <Link to="/annonces" className="bloc-annonces__titre"><IconeSortie type={a.type} /> {a.titre}</Link>
                <span className="discret-taille">
                  {a.date_prevue ? dateLisible(a.date_prevue) : "En attente"}
                  {dj ? ` · ${dj.nom}` : ""} · {a.type === "donjon" ? `${n}/${PLACES_DONJON} places` : `${n} inscrit${n > 1 ? "s" : ""}`}
                </span>
                <span className="discret-taille">publiée par {auteurs.get(a.auteur_id) ?? "un membre"} {ilYa(a.cree_le)}</span>
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

