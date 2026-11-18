import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { GuideCombat } from "../data/combatsTactiques";
import { supabase } from "./supabase";

// Comptage anonyme des visites (migration 027) : on envoie seulement « tel élément a été ouvert »,
// jamais qui l'a ouvert. Une ouverture compte une fois par élément, par jour et par chargement du site,
// pour que les allers-retours entre deux pages ne gonflent pas les chiffres.

const dejaComptes = new Set<string>();
let comptageActif = true;

/** Coupé quand le membre a choisi de ne pas être compté (la base le vérifie aussi, pour tous ses appareils). */
export function reglerComptage(actif: boolean) {
  comptageActif = actif;
}

/** Met un texte au format des cibles : minuscules, sans accents, tirets à la place du reste. */
export function enCle(texte: string): string {
  return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Ajoute 1 au compteur du jour, sans attendre la réponse (une erreur est simplement ignorée). */
export function compterVisite(cible: string) {
  if (import.meta.env.DEV || !comptageActif) return; // les essais en local ne comptent pas
  const cle = `${new Date().toDateString()}|${cible}`;
  if (dejaComptes.has(cle)) return;
  dejaComptes.add(cle);
  supabase.rpc("compter_visite", { p_cible: cible }).then(() => undefined, () => undefined);
}

// Pages comptées. Les identifiants dans l'adresse (personnage, métier, ordre) sont retirés :
// on veut savoir que les fiches de personnage servent, pas lesquelles sont regardées.
const PAGES_COMPTEES = new Set([
  "/", "/groupes", "/quetes", "/donjons", "/progression", "/avis", "/songes", "/personnages", "/perso", "/metiers",
  "/ordres", "/calendrier", "/brocante", "/archimonstres", "/mon-compte", "/mes-metiers", "/parametres",
]);
// Réglages d'adresse qui disent quel onglet ou quelle catégorie est ouvert.
const REGLAGES_COMPTES = ["onglet", "cat", "dofus"] as const;

/** Cible d'une adresse du site, ou null si la page n'est pas comptée. */
export function ciblePage(chemin: string, recherche: string): string | null {
  const racine = `/${chemin.split("/")[1] ?? ""}`;
  if (!PAGES_COMPTEES.has(racine)) return null;
  const params = new URLSearchParams(recherche);
  const reglages = REGLAGES_COMPTES.flatMap((k) => {
    const v = params.get(k);
    return v ? [`${k}=${enCle(v)}`] : [];
  });
  return `page:${racine}${reglages.length ? `?${reglages.join("&")}` : ""}`.slice(0, 120);
}

/** À placer une fois dans l'application : compte chaque page et chaque onglet ouverts. */
export function useComptageDesPages() {
  const { pathname, search } = useLocation();
  const cible = ciblePage(pathname, search);
  useEffect(() => {
    if (cible) compterVisite(cible);
  }, [cible]);
}

/** Cible d'un guide de boss et d'une strat de combat (même clé pour l'envoi et pour la page Statistiques). */
export const cibleBoss = (slug: string) => `boss:${enCle(slug)}`;
export const cibleStrat = (g: GuideCombat) => `strat:${enCle(g.quete ?? g.nomQuete ?? "")}:${enCle(g.adversaire)}`.slice(0, 120);
export const CIBLE_OUTIL_MEMOIRE = "outil:memoire";
