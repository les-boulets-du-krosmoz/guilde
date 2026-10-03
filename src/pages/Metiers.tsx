import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IconeMetier } from "../components/IconeMetier";
import { METIERS } from "../data/constantes";
import { estAncien, ilYa, SEUIL_ANCIEN_JOURS } from "../lib/dates";
import { chargerGuilde, chargerMetiers, type DonneesGuilde } from "../lib/donnees";
import type { MetierMembre } from "../lib/types";
import { Chargement } from "./Acces";

const PALIERS = [0, 50, 100, 150, 200];

export function Metiers() {
  const { metier } = useParams();
  const [params] = useSearchParams();
  const naviguer = useNavigate();
  const min = Number(params.get("min") ?? 0);

  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const [metiers, setMetiers] = useState<MetierMembre[] | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([chargerGuilde(), chargerMetiers()])
      .then(([g, m]) => {
        setGuilde(g);
        setMetiers(m);
      })
      .catch((e) => setErreur(e.message));
  }, []);

  const parMetier = useMemo(() => {
    const map = new Map<string, MetierMembre[]>();
    for (const m of metiers ?? []) {
      if (!guilde?.membres.has(m.membre_id)) continue; // membre non validé ou parti
      if (!map.has(m.metier)) map.set(m.metier, []);
      map.get(m.metier)!.push(m);
    }
    for (const l of map.values()) l.sort((a, b) => b.niveau - a.niveau);
    return map;
  }, [metiers, guilde]);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!guilde || !metiers) return <Chargement />;

  // Les métiers sont liés au compte : on affiche le personnage principal pour identifier le membre.
  const principal = (membreId: string) =>
    guilde.personnages.find((p) => p.membre_id === membreId && p.est_principal) ??
    guilde.personnages.find((p) => p.membre_id === membreId);

  const detail = metier ? (parMetier.get(metier) ?? []).filter((m) => m.niveau >= min) : [];
  const paliers = PALIERS.includes(min) ? PALIERS : [...PALIERS, min].sort((a, b) => a - b);
  const suffixe = min ? `?min=${min}` : "";

  return (
    <main className={`page ${metier ? "page--metiers" : ""}`}>
      <section>
        <h1>Métiers de la guilde</h1>
        <ul className="grille-metiers">
          {METIERS.map((nom) => {
            const liste = parMetier.get(nom) ?? [];
            return (
              <li key={nom}>
                <Link
                  to={`/metiers/${encodeURIComponent(nom)}${suffixe}`}
                  className={`carte carte--metier ${nom === metier ? "carte--active" : ""}`}
                  aria-current={nom === metier ? "page" : undefined}
                >
                  <span className="metier__nom">
                    <IconeMetier metier={nom} />
                    <strong>{nom}</strong>
                  </span>
                  <span className="compteurs">
                    <span><b className="vert">{liste.filter((m) => m.niveau === 200).length}</b> au 200</span>
                    <span><b>{liste.filter((m) => m.niveau >= 150).length}</b> ≥ 150</span>
                    <span><b>{liste.length}</b> au total</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {metier && (
        <aside className="carte panneau">
          <div className="carte__entete">
            <h2 className="metier__nom"><IconeMetier metier={metier} taille={40} />{metier}</h2>
            <span className="discret">{(parMetier.get(metier) ?? []).length} membres</span>
          </div>
          <div className="champ">
            <label htmlFor="niveau-min">Niveau minimum</label>
            <select
              id="niveau-min"
              value={min}
              onChange={(e) => naviguer(`/metiers/${encodeURIComponent(metier)}${Number(e.target.value) ? `?min=${e.target.value}` : ""}`)}
            >
              {paliers.map((p) => <option key={p} value={p}>{p === 0 ? "Tous" : p === 200 ? "200" : `≥ ${p}`}</option>)}
            </select>
          </div>

          {detail.length === 0 ? (
            <p className="vide">Personne dans la guilde n'a ce métier à ce niveau.</p>
          ) : (
            <table className="tableau">
              <thead>
                <tr><th scope="col">Membre</th><th scope="col">Niv.</th><th scope="col">Mise à jour</th></tr>
              </thead>
              <tbody>
                {detail.map((m) => {
                  const perso = principal(m.membre_id);
                  const pseudo = guilde.membres.get(m.membre_id)?.pseudo ?? "?";
                  return (
                    <tr key={m.membre_id}>
                      <td>
                        {perso ? <Link to={`/perso/${perso.id}`}>{perso.nom}</Link> : pseudo}
                        <div className="discret">@{pseudo}</div>
                      </td>
                      <td><strong>{m.niveau}</strong></td>
                      <td className={estAncien(m.maj_le) ? "ancien" : "discret"}>{ilYa(m.maj_le)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <p className="discret">En orange : pas mis à jour depuis plus de {SEUIL_ANCIEN_JOURS} jours.</p>
        </aside>
      )}
    </main>
  );
}
