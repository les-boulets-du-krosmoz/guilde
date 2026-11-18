import { useEffect } from "react";
import type { GuideCombat } from "../data/combatsTactiques";
import { cibleStrat, compterVisite } from "../lib/visites";
import { OutilMemoire } from "./OutilMemoire";

/** Strat d'un combat tactique de quête, avec la même présentation que les guides de boss. */
export function FicheCombat({ guide, quete }: { guide: GuideCombat; quete: string }) {
  const cible = cibleStrat(guide);
  useEffect(() => compterVisite(cible), [cible]);
  const section = (titre: string, lignes?: string[]) => lignes?.length ? (
    <section className="fiche-boss__section"><h3>{titre}</h3><ul>{lignes.map((l, k) => <li key={k}>{l}</li>)}</ul></section>
  ) : null;
  return (
    <div className="fiche-boss">
      <div className="fiche-boss__tete">
        <div>
          <h2>{guide.adversaire}</h2>
          <p className="discret">{guide.genre === "astuce" ? "Combat" : "Combat tactique"} de la quête « {quete} »</p>
        </div>
      </div>
      {guide.statut === "brouillon" && (
        <p className="fiche-boss__statut">📝 Première version, à faire relire par un membre qui a fait ce combat : signalez les erreurs aux officiers.</p>
      )}
      {guide.avertissements?.length ? (
        <div className="fiche-boss__alerte" role="note">{guide.avertissements.map((x, k) => <p key={k}>⚠ {x}</p>)}</div>
      ) : null}
      {guide.transformation && section("Vous jouez", [guide.transformation])}
      {section("Objectif", guide.objectif)}
      {section("Mécaniques", guide.mecaniques)}
      {section("Astuces", guide.astuces)}
      {guide.outil === "memoire" && <OutilMemoire />}
    </div>
  );
}
