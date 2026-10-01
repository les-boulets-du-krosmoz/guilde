import { useEffect, useState } from "react";
import { Pastille } from "../components/Pastille";
import { ilYa } from "../lib/dates";
import { chargerGuilde, chargerMetiers, chargerSouhaits, toutesLesQuetes } from "../lib/donnees";
import { calculerBilan, type Bilan, type Objectif } from "../lib/tableauDeBord";
import { Chargement } from "./Acces";

export function TableauDeBord() {
  const [bilan, setBilan] = useState<Bilan | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([chargerGuilde(), chargerMetiers(), toutesLesQuetes(), chargerSouhaits()])
      .then(([g, m, q, s]) => setBilan(calculerBilan(g.personnages, g.membres, m, q, s)))
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
        <div>
          <h1>Avancer ensemble</h1>
          <p className="discret">Ce que la guilde peut faire à plusieurs, maintenant. Tout est calculé à partir des fiches.</p>
        </div>
        <ul className="chiffres">
          {chiffres.map((c) => (
            <li key={c.libelle}><strong>{c.valeur}</strong><span>{c.libelle}</span></li>
          ))}
        </ul>
      </div>

      <div className="tdb">
        <section className="carte carte--forte">
          <div className="carte__entete">
            <h2>Objectifs de groupe du moment</h2>
            <span className="discret">Classés par nombre de personnages concernés</span>
          </div>
          {bilan.objectifs.length === 0 ? (
            <p className="vide">
              Aucun donjon ni combat de groupe ne réunit deux personnages pour l'instant. Les objectifs apparaissent dès que
              deux personnages en sont au même point d'un Dofus commencé, ou qu'ils ont coché « Je veux commencer ce Dofus ».
            </p>
          ) : (
            <ul className="objectifs">
              {bilan.objectifs.map((o) => <CarteObjectif key={o.cle} objectif={o} />)}
            </ul>
          )}
        </section>

        <div className="tdb__cote">
          {bilan.blocages.length > 0 && (
            <section className="carte">
              <h2>Blocages de métier</h2>
              <span className="discret">Prérequis personnels qui freinent des membres</span>
              <ul className="blocages">
                {bilan.blocages.map((b) => (
                  <li key={b.cle}>
                    <strong>{b.titre} · {b.persos.length} personnage{b.persos.length > 1 ? "s" : ""} bloqué{b.persos.length > 1 ? "s" : ""}</strong>
                    <span>{b.quetes.join(" ; ")}. À monter soi-même.</span>
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
            <span className="discret">Vert : obtenu · doré : en cours</span>
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

function CarteObjectif({ objectif: o }: { objectif: Objectif }) {
  const [copie, setCopie] = useState(false);

  // En attendant l'intégration Discord : un message prêt à coller dans le salon.
  async function proposer() {
    const noms = o.persos.map((x) => x.perso.nom).join(", ");
    const texte = `Qui est chaud pour « ${o.titre} » (${o.quetes.join(" ; ")}) ? Concernés : ${noms}.`;
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
          <span className={`etiquette ${o.type === "Donjon" ? "etiquette--donjon" : "etiquette--groupe"}`}>{o.type}</span>
        </div>
        <span className="discret-taille">{o.quetes.join(" ; ")}</span>
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

