import { type Dofus, type Prerequis, type Quete } from "../data/dofus";
import { TOUTES_LES_QUETES } from "../data/series";
import type { MetierMembre, Personnage } from "./types";

const INDEX = new Map(TOUTES_LES_QUETES.map((q) => [q.id, q]));

const estExterne = (id: string) => id.startsWith("externe:");

/** Prérequis de type quête suivis sur le site (les externes sont seulement affichés). */
function parents(q: Quete): string[] {
  return q.prerequis.flatMap((p) => (p.type === "quete" && !estExterne(p.queteId) ? [p.queteId] : []));
}

/** Quêtes qu'un personnage peut faire maintenant : non terminées, et toutes leurs quêtes prérequises sont faites. */
export function quetesDisponibles(dofus: Dofus, faites: Set<string>): Quete[] {
  return dofus.quetes.filter((q) => !faites.has(q.id) && parents(q).every((p) => faites.has(p)));
}

/** Toutes les quêtes à avoir terminées avant `id`, récursivement, toutes branches confondues. */
export function ancetres(id: string, acc = new Set<string>()): Set<string> {
  const q = INDEX.get(id);
  if (!q) return acc;
  for (const p of parents(q)) {
    if (!acc.has(p)) {
      acc.add(p);
      ancetres(p, acc);
    }
  }
  return acc;
}

/** Toutes les quêtes qui dépendent de `id`. */
export function descendants(id: string): Set<string> {
  return new Set(TOUTES_LES_QUETES.filter((q) => ancetres(q.id).has(id)).map((q) => q.id));
}

/** Cocher une quête coche aussi tout ce qui la précède. */
export function cocher(faites: Set<string>, id: string): Set<string> {
  return new Set([...faites, id, ...ancetres(id)]);
}

/** Décocher une quête décoche aussi tout ce qui en dépend. */
export function decocher(faites: Set<string>, id: string): Set<string> {
  const retirees = descendants(id);
  retirees.add(id);
  return new Set([...faites].filter((q) => !retirees.has(q)));
}

/**
 * Index de la quête sur laquelle le personnage travaille (la première non terminée).
 * Vaut dofus.quetes.length quand tout est terminé (Dofus obtenu).
 */
export function etapeActuelle(dofus: Dofus, faites: Set<string>): number {
  const i = dofus.quetes.findIndex((q) => !q.facultative && !faites.has(q.id));
  return i === -1 ? dofus.quetes.length : i;
}

export const dofusObtenu = (dofus: Dofus, faites: Set<string>) =>
  dofus.quetes.length > 0 && etapeActuelle(dofus, faites) === dofus.quetes.length;

/** Avancement hors quêtes facultatives : [terminées, total]. */
export function avancement(dofus: Dofus, faites: Set<string>): [number, number] {
  const obligatoires = dofus.quetes.filter((q) => !q.facultative);
  return [obligatoires.filter((q) => faites.has(q.id)).length, obligatoires.length];
}

// ---------- Affichage des prérequis ----------

export type EtatPrerequis = {
  etat: "ok" | "manque" | "info";
  texte: string;
  detail: string;
  /** Lien vers la page métier : seulement si quelqu'un d'autre peut aider. */
  lien?: string;
};

export function evaluerPrerequis(
  p: Prerequis,
  perso: Personnage,
  metiers: MetierMembre[],
): EtatPrerequis | null {
  const aConfirmer = p.verifie ? "" : "à confirmer";
  switch (p.type) {
    case "quete":
      if (!estExterne(p.queteId)) return null; // l'ordre des quêtes suffit
      return { etat: "info", texte: `Quête « ${p.libelle ?? p.queteId.replace("externe:", "")} »`, detail: aConfirmer };
    case "niveau": {
      const ok = perso.niveau >= p.niveau;
      return { etat: ok ? "ok" : "manque", texte: `Niveau ${p.niveau}`, detail: ok ? "" : `actuellement ${perso.niveau}` };
    }
    case "metier": {
      const candidats = p.metier === "au_choix" ? metiers : metiers.filter((m) => m.metier === p.metier);
      const meilleur = candidats.reduce<MetierMembre | null>((a, m) => (!a || m.niveau > a.niveau ? m : a), null);
      const ok = !!meilleur && meilleur.niveau >= p.niveau;
      const libelle = p.metier === "au_choix" ? `Un métier niveau ${p.niveau}` : `${p.metier} niveau ${p.niveau}`;
      const actuel = meilleur ? `actuellement ${meilleur.metier} ${meilleur.niveau}` : "non renseigné";
      const detail = [ok ? "" : actuel, p.personnel && !ok ? "à monter toi-même" : "", aConfirmer].filter(Boolean).join(", ");
      const lien =
        !ok && !p.personnel
          ? p.metier === "au_choix"
            ? `/metiers?min=${p.niveau}`
            : `/metiers/${encodeURIComponent(p.metier)}?min=${p.niveau}`
          : undefined;
      return { etat: ok ? "ok" : "manque", texte: libelle, detail, lien };
    }
    case "succes":
      return { etat: "info", texte: `Succès « ${p.nom} »`, detail: aConfirmer };
    case "texte":
      return { etat: "info", texte: p.description, detail: aConfirmer };
  }
}

