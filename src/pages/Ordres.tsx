import { useMemo, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NomAvecPastille } from "../components/Pastille";
import { ORDRES_DETAIL, ordreParNom, type Camp, type Ordre } from "../data/ordres";
import type { DonneesGuilde } from "../lib/donnees";
import { estDispo, type Personnage } from "../lib/types";

/** Emblème de l'ordre (l'œil, le cœur ou l'esprit de son ornement en jeu), dans public/icones/ordres. */
export function EmblemeOrdre({ ordre, taille = 40 }: { ordre: Ordre; taille?: number }) {
  return <img className="embleme-ordre" src={`/icones/ordres/${slugOrdre(ordre.nom)}.webp`} alt="" width={taille} height={taille} loading="lazy" />;
}

// « Œil » → « oeil », « Cœur » → « coeur » : la ligature ne se décompose pas avec les accents.
export const slugOrdre = (t: string) => t.replace(/Œ/g, "Oe").replace(/œ/g, "oe").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
export const ordreDepuisSlug = (s: string | undefined) => ORDRES_DETAIL.find((o) => slugOrdre(o.nom) === s);

/** Personnages de chaque ordre (membres validés), du plus haut rang au plus bas. */
export function usePersosParOrdre(guilde: DonneesGuilde | null) {
  return useMemo(() => {
    const m = new Map<string, Personnage[]>();
    for (const p of guilde?.personnages ?? []) {
      if (!p.ordre || !guilde?.membres.has(p.membre_id)) continue;
      m.set(p.ordre, [...(m.get(p.ordre) ?? []), p]);
    }
    for (const l of m.values()) l.sort((a, b) => (b.rang_ordre ?? 0) - (a.rang_ordre ?? 0) || a.nom.localeCompare(b.nom));
    return m;
  }, [guilde]);
}

/** Annuaire, catégorie Ordres : les 3 ordres de Bonta et de Brâkmar, avec leurs effectifs, et le panneau de l'ordre choisi. */
export function SectionOrdres({ parOrdre, actif, panneau }: { parOrdre: Map<string, Personnage[]>; actif?: Ordre; panneau?: ReactNode }) {
  return (
    <section className="annuaire__categorie">
      <h2>Ordres</h2>
      <p className="discret">L'ordre et le rang se renseignent sur la fiche de chaque personnage, dans Mon compte.</p>
      <h3 className="annuaire__camp-titre annuaire__camp-titre--bonta">Bonta</h3>
      <div className={`annuaire__zone ${panneau ? "annuaire__zone--ouverte" : ""}`}>
        <ul className="grille-metiers grille-ordres">
          {(["Bonta", "Brâkmar"] as Camp[]).flatMap((camp) => [
            ...(camp === "Brâkmar" ? [
              <li key={camp} className="grille-ordres__titre">
                <h3 className="annuaire__camp-titre annuaire__camp-titre--brakmar">{camp}</h3>
              </li>,
            ] : []),
            ...ORDRES_DETAIL.filter((o) => o.camp === camp).map((o) => {
              const liste = parOrdre.get(o.nom) ?? [];
              return (
                <li key={o.nom}>
                  <Link to={`/ordres/${slugOrdre(o.nom)}`} className={`carte carte--metier carte--ordre carte--ordre-${camp === "Bonta" ? "bonta" : "brakmar"} ${o === actif ? "carte--active" : ""}`}
                    aria-current={o === actif ? "page" : undefined}>
                    <span className="metier__nom"><EmblemeOrdre ordre={o} /><strong>Ordre {o.nom}</strong></span>
                    <span className="compteurs">
                      <span><b className="vert">{liste.filter((p) => p.rang_ordre === 5).length}</b> au rang 5</span>
                      <span><b>{liste.filter((p) => (p.rang_ordre ?? 0) >= 3).length}</b> rang 3 ou plus</span>
                      <span><b>{liste.length}</b> au total</span>
                    </span>
                  </Link>
                </li>
              );
            }),
          ])}
        </ul>
        {panneau && <div className="annuaire__cellule"><div className="annuaire__cadre">{panneau}</div></div>}
      </div>
    </section>
  );
}

/** Panneau d'un ordre : ses personnages, filtrables par rang précis (« Œil 2 — Espion Silencieux »). */
export function PanneauOrdre({ guilde, ordre, membres, rang }: { guilde: DonneesGuilde; ordre: Ordre; membres: Personnage[]; rang: number }) {
  const naviguer = useNavigate();
  const affiches = rang ? membres.filter((p) => p.rang_ordre === rang) : membres;
  const pseudo = (p: Personnage) => guilde.membres.get(p.membre_id)?.pseudo ?? "?";
  return (
    <aside className="carte panneau">
      <div className="carte__entete">
        <h2 className="panneau__titre-ordre"><EmblemeOrdre ordre={ordre} taille={36} />Ordre {ordre.nom}</h2>
        <span className="discret">{ordre.camp} · {membres.length} personnage{membres.length > 1 ? "s" : ""}</span>
      </div>
      <div className="champ">
        <label htmlFor="rang-ordre">Rang</label>
        <select id="rang-ordre" value={rang} onChange={(e) => naviguer(`/ordres/${slugOrdre(ordre.nom)}${Number(e.target.value) ? `?rang=${e.target.value}` : ""}`)}>
          <option value={0}>Tous les rangs</option>
          {ordre.rangs.map((r, i) => (
            <option key={r.nom} value={i + 1}>{ordre.court} {i + 1} — {r.nom} ({membres.filter((p) => p.rang_ordre === i + 1).length})</option>
          ))}
        </select>
      </div>
      {affiches.length === 0 ? (
        <p className="vide">{rang ? "Personne dans la guilde n'a ce rang." : "Personne dans la guilde n'a indiqué cet ordre."}</p>
      ) : (
        <ul className="liste-annuaire">
          {affiches.map((p) => (
            <li key={p.id}>
              <div className="liste-annuaire__haut">
                <NomAvecPastille perso={p} dispo={estDispo(guilde.membres.get(p.membre_id), p.id)} taille={24} />
                <strong className="liste-annuaire__valeur">{p.rang_ordre ?? "—"}</strong>
              </div>
              <div className="discret-taille">
                @{pseudo(p)}{p.est_principal ? "" : " · mule"}
                {p.rang_ordre ? <> · {ordreParNom(p.ordre)?.rangs[p.rang_ordre - 1]?.nom}</> : " · rang non indiqué"}
                {p.niveau_quete_alignement ? <> · alignement {p.niveau_quete_alignement}</> : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
