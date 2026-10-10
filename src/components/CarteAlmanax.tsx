import { useEffect, useState } from "react";
import { chargerAlmanax, dateParis, SITE_ALMANAX, type JourAlmanax } from "../lib/almanax";

const jourLisible = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));

/** Carte de l'accueil : bonus et offrande du jour, puis ceux de demain pour anticiper. */
export function CarteAlmanax() {
  const [jours, setJours] = useState<JourAlmanax[] | null>(null);
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    Promise.all([chargerAlmanax(dateParis(0)), chargerAlmanax(dateParis(1))])
      .then(setJours)
      .catch(() => setErreur(true));
  }, []);

  return (
    <section className="carte almanax">
      <div className="carte__entete">
        <h2>Almanax du jour</h2>
        {jours && <span className="discret">{jourLisible(jours[0].date)}</span>}
      </div>
      {erreur ? (
        <p className="discret">L'Almanax ne répond pas pour l'instant. <a href={SITE_ALMANAX} target="_blank" rel="noreferrer">Voir sur notre site Almanax</a></p>
      ) : !jours ? (
        <p className="discret">Chargement de l'Almanax…</p>
      ) : (
        <>
          <div className="almanax__jour">
            <Offrande jour={jours[0]} taille={44} />
            <div>
              <span className="almanax__type">{jours[0].typeBonus}</span>
              <p className="almanax__bonus">{jours[0].bonus}</p>
              <p className="almanax__offrande">
                <strong>Offrande :</strong> {jours[0].offrande.quantite} × {jours[0].offrande.nom}
                {jours[0].kamas ? <span className="discret"> · {jours[0].kamas.toLocaleString("fr-FR")} kamas en récompense</span> : null}
              </p>
            </div>
          </div>
          <div className="almanax__demain">
            <Offrande jour={jours[1]} taille={32} />
            <div>
              <span className="discret">Demain · {jours[1].typeBonus}</span>
              <p>{jours[1].offrande.quantite} × {jours[1].offrande.nom} <span className="discret">· {jours[1].bonus}</span></p>
            </div>
          </div>
          <a className="almanax__lien" href={SITE_ALMANAX} target="_blank" rel="noreferrer">Les prochains jours sur notre site Almanax →</a>
        </>
      )}
    </section>
  );
}

function Offrande({ jour, taille }: { jour: JourAlmanax; taille: number }) {
  return (
    <span className="almanax__icone" style={{ width: taille + 4, height: taille + 4 }}>
      {jour.offrande.icone && <img src={jour.offrande.icone} alt="" width={taille} height={taille} loading="lazy" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />}
    </span>
  );
}
