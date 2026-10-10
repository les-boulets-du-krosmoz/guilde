import { AVIS_PAR_ID, nomRegion } from "../data/avis";
import { DOFUS, type Contenu, type Dofus } from "../data/dofus";
import { CATEGORIES } from "../data/series";
import { donjonDuBoss } from "../data/succesDonjons";
import { joursDepuis, SEUIL_ANCIEN_JOURS } from "./dates";
import type { LigneAvis } from "./donnees";
import { dofusObtenu, etapeActuelle, quetesDisponibles } from "./quetes";
import { estDispo, statutDe, type Membre, type MetierMembre, type Personnage, type SuccesDonjon } from "./types";

export type PersoObjectif = { perso: Personnage; dispo: boolean };

export type Objectif = {
  cle: string;
  titre: string;
  type: "Donjon" | "Combat de groupe" | "Avis de recherche";
  quetes: string[]; // « Draconanthropie (Dofus Émeraude) »
  /** Identifiants des quêtes concernées (pour retrouver qui peut aider). */
  queteIds: string[];
  persos: PersoObjectif[];
  nbDispo: number;
  /** Précision affichée sous le titre (ex. succès encore à faire). */
  note?: string;
  /** Icône du donjon (public/icones/donjons/), affichée devant la note. */
  icone?: string;
};

/** Quête bloquée par un métier : `dofus` et `id` servent au lien vers l'étape dans la page Progression. */
export type QueteBloquee = { id: string; dofus: string; libelle: string };
/**
 * Personnages bloqués à une étape par un niveau de métier. `personnel` : le personnage doit avoir le métier lui-même
 * (aucun allié ne peut crafter à sa place) ; sinon `crafteurs` liste les membres qui ont déjà le niveau.
 */
export type Blocage = {
  cle: string; titre: string; metier: string; niveau: number; personnel: boolean;
  quetes: QueteBloquee[]; persos: Personnage[]; crafteurs: string[];
};

export type Activite = { texte: string; date: string };

export type Bilan = {
  membresActifs: number;
  dispoMaintenant: number;
  dofusObtenus: number;
  fichesAJour: number; // pourcentage
  objectifs: Objectif[];
  blocages: Blocage[];
  dofus: { dofus: Dofus; obtenus: number; enCours: number; total: number }[];
  activite: Activite[];
};

/** Seuls les contenus qui se font à plusieurs comptent : donjons et combats de groupe. */
function cleGroupe(c: Contenu): { titre: string; type: Objectif["type"] } | null {
  if (c.type === "donjon") return { titre: c.nom, type: "Donjon" };
  if (c.type === "combat" && c.groupe === true) return { titre: c.adversaires.join(", "), type: "Combat de groupe" };
  return null;
}

export function calculerBilan(
  personnages: Personnage[],
  membres: Map<string, Membre>,
  metiers: MetierMembre[],
  quetes: { personnage_id: string; quete_id: string; termine_le: string }[],
  souhaits: Map<string, Set<string>> = new Map(),
  avis: LigneAvis[] = [],
): Bilan {
  const faitesParPerso = new Map<string, Set<string>>();
  const derniereActivite = new Map<string, string>();
  for (const q of quetes) {
    if (!faitesParPerso.has(q.personnage_id)) faitesParPerso.set(q.personnage_id, new Set());
    faitesParPerso.get(q.personnage_id)!.add(q.quete_id);
    const avant = derniereActivite.get(q.personnage_id);
    if (!avant || q.termine_le > avant) derniereActivite.set(q.personnage_id, q.termine_le);
  }
  const metiersParMembre = new Map<string, MetierMembre[]>();
  for (const m of metiers) {
    if (!metiersParMembre.has(m.membre_id)) metiersParMembre.set(m.membre_id, []);
    metiersParMembre.get(m.membre_id)!.push(m);
  }

  // Une fiche est « à jour » si le personnage ou une de ses quêtes a bougé récemment.
  const aJour = (p: Personnage) => {
    const q = derniereActivite.get(p.id);
    const recent = q && q > p.maj_le ? q : p.maj_le;
    return joursDepuis(recent) <= SEUIL_ANCIEN_JOURS;
  };
  const persosAJour = personnages.filter(aJour);
  const membresActifs = new Set(persosAJour.map((p) => p.membre_id)).size;
  const dispoMaintenant = [...membres.values()].filter((m) => statutDe(m) === "dispo").length;

  const objectifs = new Map<string, Objectif>();
  const blocages = new Map<string, Blocage>();
  const statsDofus = DOFUS.filter((d) => d.quetes.length > 0).map((d) => ({ dofus: d, obtenus: 0, enCours: 0, total: personnages.length }));
  let dofusObtenus = 0;

  for (const p of personnages) {
    const faites = faitesParPerso.get(p.id) ?? new Set<string>();
    const dispo = estDispo(membres.get(p.membre_id), p.id);
    const sesMetiers = metiersParMembre.get(p.membre_id) ?? [];

    for (const stat of statsDofus) {
      const d = stat.dofus;
      const souhaite = souhaits.get(p.id)?.has(d.id) ?? false;
      const commence = d.quetes.some((q) => faites.has(q.id));
      if (dofusObtenu(d, faites)) {
        stat.obtenus++;
        dofusObtenus++;
        continue;
      }
      // Un Dofus jamais commencé ne compte que si le personnage a coché « Je veux commencer ce Dofus » :
      // sinon toute la guilde s'entasserait sur les premières quêtes.
      if (!commence && !souhaite) continue;
      if (commence) stat.enCours++;

      for (const q of quetesDisponibles(d, faites)) {
        const libelle = `${q.nom} (Dofus ${d.nom})`;
        // Un objectif par quête : son donjon et ses combats de groupe sont réunis sur une seule carte.
        const groupes = q.contenu.map(cleGroupe).filter((g) => g !== null);
        if (groupes.length > 0) {
          if (!objectifs.has(q.id)) {
            objectifs.set(q.id, {
              cle: q.id,
              titre: groupes.map((g) => g.titre).join(" + "),
              type: groupes.some((g) => g.type === "Donjon") ? "Donjon" : "Combat de groupe",
              quetes: [libelle],
              queteIds: [q.id],
              persos: [],
              nbDispo: 0,
            });
          }
          const o = objectifs.get(q.id)!;
          o.persos.push({ perso: p, dispo });
          if (dispo) o.nbDispo++;
        }
        for (const pr of q.prerequis) {
          if (pr.type !== "metier") continue;
          const candidats = pr.metier === "au_choix" ? sesMetiers : sesMetiers.filter((m) => m.metier === pr.metier);
          if (candidats.some((m) => m.niveau >= pr.niveau)) continue;
          const nom = pr.metier === "au_choix" ? "Un métier" : pr.metier;
          const cle = `${nom}:${pr.niveau}:${pr.personnel ? "soi" : "allie"}`;
          if (!blocages.has(cle)) {
            // Craft possible par un allié : les membres qui ont déjà le niveau dans ce métier.
            const crafteurs = pr.personnel || pr.metier === "au_choix" ? [] : [...new Set(metiers
              .filter((m) => m.metier === pr.metier && m.niveau >= pr.niveau && m.membre_id !== p.membre_id)
              .map((m) => membres.get(m.membre_id)?.pseudo ?? ""))].filter(Boolean);
            blocages.set(cle, { cle, titre: `${nom} ${pr.niveau}`, metier: nom, niveau: pr.niveau, personnel: !!pr.personnel, quetes: [], persos: [], crafteurs });
          }
          const b = blocages.get(cle)!;
          if (!b.quetes.some((x) => x.id === q.id)) b.quetes.push({ id: q.id, dofus: d.id, libelle });
          if (!b.persos.some((x) => x.id === p.id)) b.persos.push(p);
        }
      }
    }
  }

  // Avis de recherche : un objectif dès que deux personnages chassent le même avis.
  const persoParId = new Map(personnages.map((p) => [p.id, p]));
  for (const l of avis) {
    const a = AVIS_PAR_ID.get(l.avis_id);
    const p = persoParId.get(l.personnage_id);
    if (l.etat !== "en_cours" || !a || !p) continue;
    const cle = "avis:" + a.id;
    if (!objectifs.has(cle)) {
      objectifs.set(cle, { cle, titre: a.nom, type: "Avis de recherche", quetes: [`Avis de recherche (${nomRegion(a.region)})`], queteIds: [], persos: [], nbDispo: 0 });
    }
    const o = objectifs.get(cle)!;
    const dispo = estDispo(membres.get(p.membre_id), p.id);
    o.persos.push({ perso: p, dispo });
    if (dispo) o.nbDispo++;
  }

  // Activité : les quêtes cochées le plus récemment, en signalant les Dofus obtenus.
  // Toutes les séries (Dofus, Tour du monde, Emma Tom Pouce, Frigost…) : sinon les autres s'affichent avec leur identifiant brut.
  const series = CATEGORIES.flatMap((c) => c.series.filter((d) => d.quetes.length).map((d) => ({ d, estDofus: c.estDofus })));
  const finales = new Map(series.map((x) => [[...x.d.quetes].reverse().find((q) => !q.facultative)!.id, x]));
  const etapes = new Map(series.flatMap((x) => x.d.quetes.map((q) => [q.id, { q, ...x }] as const)));
  const nomPerso = new Map(personnages.map((p) => [p.id, p.nom]));
  // Cocher une quête coche aussi les précédentes : on ne garde que la plus récente par personnage et par Dofus.
  const vus = new Set<string>();
  const activiteQuetes = [...quetes]
    .sort((a, b) => b.termine_le.localeCompare(a.termine_le) || b.quete_id.localeCompare(a.quete_id, undefined, { numeric: true }))
    .filter((q) => {
      const cle = q.personnage_id + ":" + q.quete_id.split("-")[0];
      if (vus.has(cle)) return false;
      vus.add(cle);
      return true;
    })
    .slice(0, 6)
    .map((q) => {
      const qui = nomPerso.get(q.personnage_id) ?? "?";
      const fin = finales.get(q.quete_id);
      const e = etapes.get(q.quete_id);
      let texte: string;
      if (fin) texte = fin.estDofus ? `${qui} a obtenu le Dofus ${fin.d.nom}` : `${qui} a terminé ${titreSerie(fin.d)}`;
      else if (e && e.d.unite === "boss") texte = `${qui} a vaincu ${e.q.nom} (${e.d.nom})`;
      else if (e) texte = `${qui} a terminé « ${e.q.nom} »${e.estDofus ? "" : ` (${e.d.nom})`}`;
      else texte = `${qui} a terminé une quête retirée du site`; // identifiant inconnu : jamais affiché tel quel
      return { texte, date: q.termine_le };
    });
  const activiteAvis = avis
    .filter((l) => l.etat === "livre" && AVIS_PAR_ID.has(l.avis_id) && nomPerso.has(l.personnage_id))
    .map((l) => ({ texte: `${nomPerso.get(l.personnage_id)} a livré ${AVIS_PAR_ID.get(l.avis_id)!.nom}`, date: l.maj_le }));
  const activite = [...activiteQuetes, ...activiteAvis].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  return {
    membresActifs,
    dispoMaintenant,
    dofusObtenus,
    fichesAJour: personnages.length ? Math.round((persosAJour.length / personnages.length) * 100) : 0,
    objectifs: [...objectifs.values()]
      .filter((o) => o.persos.length >= 2)
      .sort((a, b) => b.persos.length - a.persos.length || b.nbDispo - a.nbDispo)
      .slice(0, 8),
    blocages: [...blocages.values()].sort((a, b) => b.persos.length - a.persos.length),
    dofus: statsDofus,
    activite,
  };
}

/** Nom d'une série dans une phrase du fil d'activité (« a terminé le Tour du monde »). */
function titreSerie(d: Dofus): string {
  const noms: Record<string, string> = {
    "tour-du-monde": "le Tour du monde",
    "emma-tom-pouce": "les quêtes d'Emma Tom Pouce",
    frigost: "les donjons de Frigost",
  };
  return noms[d.id] ?? `« ${d.nom} »`;
}

/**
 * Groupes à monter pour les séries de boss (Tour du monde, Emma Tom Pouce, Frigost) : les personnages qui en sont
 * au même boss. Comme pour les Dofus, ne comptent que ceux qui ont commencé la série ou cherchent un groupe pour elle.
 * La note liste les succès du donjon encore à faire dans le groupe (un succès pas fait est un succès souhaité).
 */
export function objectifsSeries(
  personnages: Personnage[],
  membres: Map<string, Membre>,
  quetes: { personnage_id: string; quete_id: string }[],
  souhaits: Map<string, Set<string>>,
  succes: SuccesDonjon[],
): Objectif[] {
  const faites = new Map<string, Set<string>>();
  for (const q of quetes) {
    if (!faites.has(q.personnage_id)) faites.set(q.personnage_id, new Set());
    faites.get(q.personnage_id)!.add(q.quete_id);
  }
  const res: Objectif[] = [];
  for (const categorie of CATEGORIES) {
    if (categorie.estDofus) continue;
    for (const serie of categorie.series) {
      if (serie.quetes.length === 0) continue;
      const parEtape = new Map<string, PersoObjectif[]>();
      for (const p of personnages) {
        const f = faites.get(p.id) ?? new Set<string>();
        const commence = serie.quetes.some((q) => f.has(q.id));
        if (!commence && !(souhaits.get(p.id)?.has(serie.id) ?? false)) continue;
        const q = serie.quetes[etapeActuelle(serie, f)];
        if (!q) continue; // série terminée
        if (!parEtape.has(q.id)) parEtape.set(q.id, []);
        parEtape.get(q.id)!.push({ perso: p, dispo: estDispo(membres.get(p.membre_id), p.id) });
      }
      for (const [id, persos] of parEtape) {
        if (persos.length < 2) continue;
        const q = serie.quetes.find((x) => x.id === id)!;
        // Succès du donjon qu'au moins un membre du groupe n'a pas encore fait, avec le nombre de personnes concernées.
        const dj = donjonDuBoss(q.nom);
        const restes = (dj?.succes ?? [])
          .map((sx) => ({ sx, n: persos.filter((x) => !succes.some((s) => s.personnage_id === x.perso.id && s.succes_id === sx.id && s.statut === "fait")).length }))
          .filter((r) => r.n > 0 && r.sx.libelle !== "Vaincre");
        res.push({
          cle: `serie:${id}`,
          titre: q.nom,
          type: "Donjon",
          quetes: [serie.nom],
          queteIds: [id],
          persos,
          nbDispo: persos.filter((x) => x.dispo).length,
          note: restes.length > 0 ? `À faire : ${restes.map((r) => `${r.sx.libelle} (${r.n}/${persos.length})`).join(", ")}` : undefined,
          icone: dj?.icone,
        });
      }
    }
  }
  return res;
}
