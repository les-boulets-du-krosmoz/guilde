import { useMemo, useState } from "react";
import { QUETES_REPETABLES } from "../data/quetesRepetables";
import { Rebours } from "./Rebours";

// Onglet « Quêtes journalières » de la page Quêtes : les quêtes que le jeu permet de refaire chaque jour ou chaque semaine.

const sansAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const ZONES = [...new Set(QUETES_REPETABLES.map((q) => q.zone))].sort((a, b) => a.localeCompare(b));
const DELAI = { jour: "Tous les jours", semaine: "Toutes les semaines" } as const;

export function QuetesRepetables() {
  const [recherche, setRecherche] = useState("");
  const [zone, setZone] = useState<string | null>(null);
  const [periode, setPeriode] = useState<"jour" | "semaine" | null>(null);
  const [evenements, setEvenements] = useState(false);
  const q = sansAccents(recherche.trim());
  const groupes = useMemo(() => {
    const liste = QUETES_REPETABLES.filter((x) => (evenements || !x.evenement) && (!zone || x.zone === zone) && (!periode || x.periode === periode)
      && (!q || sansAccents(x.nom).includes(q)));
    const parZone = new Map<string, typeof liste>();
    for (const x of liste) parZone.set(x.zone, [...(parZone.get(x.zone) ?? []), x]);
    return [...parZone.entries()];
  }, [q, zone, periode, evenements]);

  return (
    <div className="repetables">
      <p className="discret">
        Les quêtes que le jeu permet de refaire, avec le délai entre deux fois, le PNJ qui les donne et ce qu'il faut apporter.
      </p>
      <p className="repetables__remise">
        Remise à zéro dans <strong><Rebours periode="jour" /></strong> pour les quotidiennes, <strong><Rebours periode="semaine" /></strong> pour les hebdomadaires
        <span className="a-confirmer"> (minuit chaque jour, et le lundi à minuit : à confirmer)</span>
      </p>
      <div className="suivi-donjons__filtres">
        <input type="search" className="donjons__recherche" placeholder="Rechercher une quête…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher une quête" />
        <select value={zone ?? ""} onChange={(e) => setZone(e.target.value || null)} aria-label="Zone">
          <option value="">Toutes les zones</option>
          {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
        </select>
        <label className="case"><input type="checkbox" checked={evenements} onChange={(e) => setEvenements(e.target.checked)} /> Quêtes d'événement</label>
      </div>
      <div className="suivi-donjons__categories" role="group" aria-label="Délai">
        {([null, "jour", "semaine"] as const).map((p) => (
          <button key={p ?? "tous"} type="button" className={`onglet${periode === p ? " onglet--actif" : ""}`} aria-pressed={periode === p} onClick={() => setPeriode(p)}>
            {p ? DELAI[p] : "Tous les délais"}
          </button>
        ))}
      </div>
      {groupes.length === 0 && <p className="vide">Aucune quête ne correspond.</p>}
      {groupes.map(([z, liste]) => (
        <section key={z} className="repetables__zone">
          <h2>{z}</h2>
          <ul>
            {liste.map((x) => (
              <li key={x.id}>
                <strong>{x.nom}</strong>
                <span className="discret-taille">niv. {x.niveau}</span>
                <span className={`repetables__delai repetables__delai--${x.periode}`}>{DELAI[x.periode]}</span>
                {x.evenement && <span className="discret-taille">Événement</span>}
                {x.donjon && <span className="discret-taille">Dans un donjon</span>}
                {(x.pnj || x.position) && <span className="repetables__pnj">{x.pnj}{x.pnj && x.position ? ", " : ""}{x.position}</span>}
                {x.ressources && <span className="repetables__ressources">À apporter : {x.ressources.map((r) => `${r.quantite} × ${r.nom}`).join(", ")}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
