import { ordreParNom } from "../data/ordres";
import { ouEstLaQuete } from "../data/series";
import { cleDonjon, DONJONS_SUCCES, SUCCES_PAR_ID } from "../data/succesDonjons";
import type { Annonce, MetierMembre, OrdreRequis, Personnage } from "./types";

export const PLACES_DONJON = 8;

/** Ordres acceptés d'une annonce, en reprenant l'ancien champ unique (ordre + ordre_min) s'il est seul rempli. */
export function ordresDe(a: Pick<Annonce, "ordres" | "ordre" | "ordre_min">): OrdreRequis[] {
  if (a.ordres?.length) return a.ordres;
  return a.ordre ? [{ ordre: a.ordre, rang: a.ordre_min ?? 1 }] : [];
}

/** Nombre de places d'une sortie (organisateur compris) : celui choisi pour un donjon, aucune limite pour une quête. */
export const placesDe = (a: Pick<Annonce, "type" | "places">): number | null => (a.type === "donjon" ? a.places ?? PLACES_DONJON : a.places ?? null);

/** Le succès « Duo » limite le groupe à 2 personnes. */
export const PLACES_DUO = 2;

export const donjonDeCle = (cle: string | null) => (cle ? DONJONS_SUCCES.find((d) => cleDonjon(d) === cle) : undefined);

/** Raison pour laquelle un personnage ne peut pas s'inscrire (niveau, alignement, ordre), ou null s'il peut. */
export function raisonRefus(a: Annonce, p: Personnage): string | null {
  if (a.niveau_min && p.niveau < a.niveau_min) return `Niveau ${a.niveau_min} requis (${p.nom} est ${p.niveau}).`;
  if ((a.alignement_min || a.ordre_min) && p.alignement === "Neutre") return `Il faut être aligné (${p.nom} est neutre).`;
  if (a.alignement_min && p.niveau_quete_alignement !== null && p.niveau_quete_alignement < a.alignement_min)
    return `Alignement ${a.alignement_min} requis (${p.nom} est à ${p.niveau_quete_alignement}).`;
  // Ordres acceptés : il suffit d'appartenir à l'un d'eux, au rang demandé. Un ordre ou un rang non renseigné
  // sur la fiche ne bloque pas : on ne refuse pas un membre sur une donnée qu'il n'a pas saisie.
  const acceptes = ordresDe(a).map((x) => ({ ...x, o: ordreParNom(x.ordre) })).filter((x) => x.o);
  if (acceptes.length) {
    const ok = acceptes.some((x) => p.alignement === x.o!.camp && (!p.ordre || p.ordre === x.ordre) && (p.rang_ordre === null || p.rang_ordre >= x.rang));
    if (!ok) return `Il faut faire partie de l'un de ces ordres : ${acceptes.map((x) => `${x.ordre} rang ${x.rang}`).join(", ")}.`;
  } else if (a.ordre_min && p.rang_ordre !== null && p.rang_ordre < a.ordre_min) {
    return `Rang ${a.ordre_min} requis dans l'ordre (${p.nom} est au rang ${p.rang_ordre}).`;
  }
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
    if (d) l.push(`Donjon : ${d.nom} (${d.boss}, niveau ${d.niveau}), ${placesDe(a)} places`);
    const succes = a.succes.map((id) => SUCCES_PAR_ID.get(id)?.succes.libelle).filter(Boolean);
    l.push(succes.length ? `Succès visés : ${succes.join(", ")}` : "Sans succès particulier");
  } else {
    const q = a.quete_id ? ouEstLaQuete(a.quete_id) : undefined;
    if (q) l.push(`Quête : ${q.quete.nom} (${q.categorie.estDofus ? `Dofus ${q.serie.nom}` : q.serie.nom})`);
    else if (a.quete_nom) l.push(`Quête : ${a.quete_nom}`);
  }
  l.push(a.visibilite === "prive" ? "Groupe privé : sur invitation" : "Groupe ouvert : tout le monde peut rejoindre");
  if (a.niveau_min) l.push(`Niveau ${a.niveau_min} minimum`);
  if (a.alignement_min) l.push(`Alignement ${a.alignement_min} minimum`);
  const ordres = ordresDe(a);
  if (ordres.length) l.push(`Ordre${ordres.length > 1 ? "s acceptés" : ""} : ${ordres.map((x) => `${x.ordre} rang ${x.rang} (${ordreParNom(x.ordre)?.rangs[x.rang - 1]?.nom ?? ""})`).join(" ou ")}`);
  else if (a.ordre_min) l.push(`Rang d'ordre ${a.ordre_min} minimum`);
  if (a.type === "quete" && a.places) l.push(`${a.places} places`);
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
