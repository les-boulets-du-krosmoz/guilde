import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pastille } from "../components/Pastille";
import { ilYa } from "../lib/dates";
import { chargerAides, chargerAvis, chargerGuilde, chargerMetiers, chargerSouhaits, toutesLesQuetes } from "../lib/donnees";
import { estDispo, type Personnage } from "../lib/types";
import { calculerBilan, type Bilan, type Objectif } from "../lib/tableauDeBord";
import { Chargement } from "./Acces";

export function TableauDeBord() {
  const [bilan, setBilan] = useState<Bilan | null>(null);
  // Qui peut aider sur chaque quête (« Je peux aider »), déjà résolu en personnages.
  const [aidants, setAidants] = useState<Map<string, Aidant[]>>(new Map());
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([chargerGuilde(), chargerMetiers(), toutesLesQuetes(), chargerSouhaits(), chargerAvis(), chargerAides()])
      .then(([g, m, q, s, a, aides]) => {
        setBilan(calculerBilan(g.personnages, g.membres, m, q, s, a));
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

/** « Peuvent aider : … » sous une carte ; rien si personne ne s'est positionné. */
function LigneAidants({ aidants }: { aidants: Aidant[] }) {
  const uniques = [...new Map(aidants.map((a) => [a.perso.id, a])).values()];
  if (uniques.length === 0) return null;
  return (
    <span className="discret-taille">
      🤝 Peuvent aider :{" "}
      {uniques.map((a, i) => (
        <span key={a.perso.id}>
          {i > 0 && ", "}
          <Link to={`/perso/${a.perso.id}`} className={a.dispo ? "vert" : undefined} title={a.note ?? undefined}>{a.perso.nom}</Link>
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

