import { ouEstLaQuete } from "../data/series";
import { cleDonjon, DONJONS_SUCCES, SUCCES_PAR_ID } from "../data/succesDonjons";
import type { Annonce, MetierMembre, Personnage } from "./types";

export const PLACES_DONJON = 8;

export const donjonDeCle = (cle: string | null) => (cle ? DONJONS_SUCCES.find((d) => cleDonjon(d) === cle) : undefined);

/** Raison pour laquelle un personnage ne peut pas s'inscrire (niveau, alignement, ordre), ou null s'il peut. */
export function raisonRefus(a: Annonce, p: Personnage): string | null {
  if (a.niveau_min && p.niveau < a.niveau_min) return `Niveau ${a.niveau_min} requis (${p.nom} est ${p.niveau}).`;
  if ((a.alignement_min || a.ordre_min) && p.alignement === "Neutre") return `Il faut être aligné (${p.nom} est neutre).`;
  if (a.alignement_min && p.niveau_quete_alignement !== null && p.niveau_quete_alignement < a.alignement_min)
    return `Alignement ${a.alignement_min} requis (${p.nom} est à ${p.niveau_quete_alignement}).`;
  if (a.ordre_min && p.rang_ordre !== null && p.rang_ordre < a.ordre_min) return `Ordre ${a.ordre_min} requis (${p.nom} est au rang ${p.rang_ordre}).`;
  return null;
}

/** Pour chaque métier demandé : le participant qui le couvre (métiers de son compte), ou null. */
export function couvertureMetiers(a: Annonce, inscrits: Personnage[], metiers: MetierMembre[]) {
  return a.metiers.map((m) => {
    const p = inscrits.find((x) => metiers.some((mm) => mm.membre_id === x.membre_id && mm.metier === m.metier && mm.niveau >= m.niveau));
    return { ...m, par: p ?? null };
  });
}

/** Lignes de résumé (Discord, aperçu) : donjon et succès, ou quête, puis les conditions. */
export function resumeAnnonce(a: Annonce): string[] {
  const l: string[] = [];
  const d = donjonDeCle(a.donjon);
  if (a.type === "donjon") {
    if (d) l.push(`Donjon : ${d.nom} (${d.boss}, niveau ${d.niveau}), ${PLACES_DONJON} places`);
    const succes = a.succes.map((id) => SUCCES_PAR_ID.get(id)?.succes.libelle).filter(Boolean);
    l.push(succes.length ? `Succès visés : ${succes.join(", ")}` : "Sans succès particulier");
  } else {
    const q = a.quete_id ? ouEstLaQuete(a.quete_id) : undefined;
    if (q) l.push(`Quête : ${q.quete.nom} (${q.categorie.estDofus ? `Dofus ${q.serie.nom}` : q.serie.nom})`);
    else if (a.quete_nom) l.push(`Quête : ${a.quete_nom}`);
  }
  if (a.niveau_min) l.push(`Niveau ${a.niveau_min} minimum`);
  if (a.alignement_min) l.push(`Alignement ${a.alignement_min} minimum`);
  if (a.ordre_min) l.push(`Ordre ${a.ordre_min} minimum`);
  if (a.metiers.length) l.push(`Métiers : ${a.metiers.map((m) => `${m.metier} ${m.niveau}`).join(", ")}`);
  return l;
}

/** « samedi 12 octobre à 21:00 » */
export function dateLisible(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

/** Les 42 jours (6 semaines, lundi en premier) de la grille du mois contenant `ref`. */
export function grilleMois(ref: Date): Date[] {
  const premier = new Date(ref.getFullYear(), ref.getMonth(), 1);
  const decalage = (premier.getDay() + 6) % 7; // lundi = 0
  return Array.from({ length: 42 }, (_, i) => new Date(ref.getFullYear(), ref.getMonth(), 1 - decalage + i));
}

export const memeJour = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
