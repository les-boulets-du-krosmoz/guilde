// ---------- Modèle ----------

/** Conditions à remplir AVANT de lancer la quête. */
export type Prerequis =
  | { type: "quete"; queteId: string; libelle?: string; verifie: boolean } // "externe:..." = hors du site, affiché seulement
  | { type: "niveau"; niveau: number; verifie: boolean }
  // personnel: true => le membre doit avoir le niveau lui-même, aucun lien vers la page métier
  | { type: "metier"; metier: string | "au_choix"; niveau: number; personnel: boolean; verifie: boolean }
  | { type: "succes"; nom: string; verifie: boolean }
  | { type: "texte"; description: string; verifie: boolean };

/** Ce que la quête fait faire : ce qui intéresse la guilde. groupe absent = non précisé par la source. */
export type Contenu =
  | { type: "combat"; adversaires: string[]; groupe?: boolean; tactique?: boolean }
  | { type: "donjon"; nom: string }
  | { type: "drop_quete"; objet: string; quantite: number; monstre: string; zone: string };

/**
 * Ressource à réunir pour une quête. `alternative` = l'autre façon de remplir la ligne
 * (ex. faire le donjon OU acheter la pierre d'âme). Le joueur coche la ligne quand il l'a.
 */
export type Ressource = {
  id: string;
  texte: string;
  alternative?: string;
  note?: string;
  verifie: boolean;
};

export type Quete = {
  id: string;
  nom: string;
  dofus: string;
  niveauConseille: number;
  prerequis: Prerequis[];
  contenu: Contenu[];
  ressources?: Ressource[];
  /** Ne compte ni pour l'étape en cours ni pour l'obtention du Dofus. */
  facultative?: boolean;
};

export type Dofus = {
  id: string;
  nom: string;
  succes: string;
  couleur: string;
  /** Adresse d'une image à afficher à la place du badge maison (à renseigner par toi, sous ta responsabilité). */
  image?: string;
  /** Couleur des bordures et du texte coloré quand `couleur` est trop sombre sur le fond. */
  accent?: string;
  /** Ce que compte une étape, pour l'en-tête (« quêtes » par défaut, « boss » pour une série de donjons). */
  unite?: string;
  /** Dofus primordial : onglet coloré sur la première ligne ; les autres Dofus passent en dessous. */
  primordial?: boolean;
  /** Quêtes dans l'ordre d'affichage. Vide = données pas encore saisies. */
  quetes: Quete[];
  /** À prévoir sur l'ensemble de la série, sans étape précise connue. */
  notes?: string[];
  /** Fiabilité des données, affiché en haut de la page. */
  avertissement?: string;
  sources?: { nom: string; url: string }[];
  /** Outils externes utiles (ex. suivi des archimonstres). */
  liens?: { nom: string; url: string; description: string }[];
};

// ---------- Aides à la saisie ----------

export type Options = { prerequis?: Prerequis[]; contenu?: Contenu[]; ressources?: Ressource[]; facultative?: boolean };

/** Une quête ; `apres` = quêtes du site à terminer avant (branches parallèles possibles). */
export function q(dofus: string, id: string, nom: string, niv: number, apres: string[], o: Options = {}): Quete {
  return {
    id, nom, dofus, niveauConseille: niv,
    prerequis: [...apres.map((a): Prerequis => ({ type: "quete", queteId: a, verifie: true })), ...(o.prerequis ?? [])],
    contenu: o.contenu ?? [],
    ressources: o.ressources,
    facultative: o.facultative,
  };
}
export const groupe = (...adversaires: string[]): Contenu => ({ type: "combat", adversaires, groupe: true });
export const solo = (...adversaires: string[]): Contenu => ({ type: "combat", adversaires, groupe: false });
export const combat = (...adversaires: string[]): Contenu => ({ type: "combat", adversaires });
export const tactique = (...adversaires: string[]): Contenu => ({ type: "combat", adversaires, groupe: false, tactique: true });
export const donjon = (nom: string): Contenu => ({ type: "donjon", nom });
export const niveau = (n: number): Prerequis => ({ type: "niveau", niveau: n, verifie: true });
export const succes = (nom: string): Prerequis => ({ type: "succes", nom, verifie: true });
export const texte = (description: string, verifie = true): Prerequis => ({ type: "texte", description, verifie });
export const externe = (libelle: string): Prerequis => ({
  type: "quete", queteId: "externe:" + libelle.toLowerCase().replace(/[^a-z0-9]+/g, "-"), libelle, verifie: true,
});
export const metier = (nom: string, niv: number, personnel: boolean): Prerequis => ({ type: "metier", metier: nom, niveau: niv, personnel, verifie: true });
export const res = (id: string, texteRes: string, o: { alternative?: string; note?: string; verifie?: boolean } = {}): Ressource => ({
  id, texte: texteRes, alternative: o.alternative, note: o.note, verifie: o.verifie ?? true,
});

// ---------- Dofus Émeraude (succès « Vert émeraude ») ----------

export const QUETES_EMERAUDE: Quete[] = [
  {
    id: "em-1", nom: "Retourner voir le Dark Vlad, toujours sans mourir", dofus: "emeraude", niveauConseille: 45,
    prerequis: [
      { type: "niveau", niveau: 40, verifie: true },
      { type: "quete", queteId: "externe:la-magicienne-des-marecages", libelle: "La magicienne des marécages", verifie: true },
    ],
    contenu: [{ type: "combat", adversaires: ["Hell Mina Ensorcelée"], groupe: false }],
  },
  {
    id: "em-2", nom: "Qui botte le cul des Culs Bottés ?", dofus: "emeraude", niveauConseille: 50,
    prerequis: [
      { type: "quete", queteId: "em-1", verifie: true },
      { type: "metier", metier: "au_choix", niveau: 50, personnel: true, verifie: true },
    ],
    contenu: [{ type: "combat", adversaires: ["Cordonnier Sombre", "Boulanger Sombre", "Mineur Sombre"], groupe: false }],
    ressources: [
      { id: "em-2-r1", texte: "10 × Plume du Kwak de Vent", verifie: true },
      { id: "em-2-r2", texte: "8 × Graine de la Discorde", verifie: true },
      { id: "em-2-r3", texte: "6 × Ailes de Scarafeuille Blanc", verifie: true },
      { id: "em-2-r4", texte: "4 × Résine", verifie: true },
      { id: "em-2-r5", texte: "2 × Pierre d'Émeraude", verifie: true },
    ],
  },
  {
    id: "em-3", nom: "Le voleur d'âmes", dofus: "emeraude", niveauConseille: 50,
    prerequis: [
      { type: "quete", queteId: "em-2", verifie: true },
      { type: "texte", description: "Sort Capture d'âmes", verifie: true },
    ],
    contenu: [{ type: "combat", adversaires: ["Esprit de Tonam Etamwa"], groupe: true }],
    ressources: [
      { id: "em-3-r1", texte: "Donjon Maison Fantôme", alternative: "Pierre d'âme du Boostache", note: "pierre achetable en HDV", verifie: true },
      { id: "em-3-r2", texte: "Donjon Village Kanniboul", alternative: "Pierre d'âme du Kanniboul Ebil", note: "pierre achetable en HDV", verifie: true },
      { id: "em-3-r3", texte: "Donjon Épreuve de Draegnerys", alternative: "Pierre d'âme de Draegnerys", note: "pierre achetable en HDV", verifie: true },
      { id: "em-3-r4", texte: "Donjon Laboratoire de Brumen Tinctorias", alternative: "Pierre d'âme de Nelween", note: "pierre achetable en HDV", verifie: true },
      { id: "em-3-r5", texte: "Donjon Terrier du Wa Wabbit", alternative: "Pierre d'âme du Wa Wobot", note: "pierre achetable en HDV", verifie: true },
    ],
  },
  {
    id: "em-4", nom: "L'amour perdu de Nabur", dofus: "emeraude", niveauConseille: 90,
    prerequis: [{ type: "quete", queteId: "em-3", verifie: true }],
    contenu: [{ type: "combat", adversaires: ["Chef des Pillards", "Pillarde Cruelle", "Pillard Irascible"], groupe: false }],
  },
  {
    id: "em-5", nom: "Naissance d'une vocation", dofus: "emeraude", niveauConseille: 100,
    prerequis: [
      { type: "quete", queteId: "em-4", verifie: true },
      { type: "metier", metier: "Éleveur", niveau: 20, personnel: true, verifie: true },
      { type: "texte", description: "Sort Apprivoisement de monture", verifie: true },
      // DPLN et Dofuserie : « Ce n'est qu'un prélèvement » (Gamosaurus indiquait « Mon premier accouplement »).
      { type: "succes", nom: "Ce n'est qu'un prélèvement", verifie: true },
      { type: "succes", nom: "Elle a peut-être trop mangé ?", verifie: true },
    ],
    contenu: [{ type: "combat", adversaires: ["Profana Tryss", "Nikono Klaste"], groupe: false }],
    ressources: [
      { id: "em-5-r1", texte: "1 × Dragodinde Rousse", verifie: true },
      { id: "em-5-r2", texte: "1 × Dragodinde Amande", verifie: true },
      { id: "em-5-r3", texte: "1 × Dragodinde Dorée", verifie: true },
    ],
  },
  {
    id: "em-6", nom: "Les bandits de Cania", dofus: "emeraude", niveauConseille: 100,
    prerequis: [{ type: "quete", queteId: "em-5", verifie: true }],
    contenu: [{ type: "combat", adversaires: ["Nomekop le Crapoteur", "Eratz le Revendicateur", "Edasse le Trouble Fête"], groupe: true }],
  },
  {
    id: "em-7", nom: "Draconanthropie", dofus: "emeraude", niveauConseille: 100,
    prerequis: [{ type: "quete", queteId: "em-6", verifie: true }],
    contenu: [
      { type: "combat", adversaires: ["Rasamoune le Vert"], groupe: true },
      { type: "donjon", nom: "Tanière du Meulou" },
    ],
  },
  {
    id: "em-8", nom: "Ultime réminiscence", dofus: "emeraude", niveauConseille: 120,
    prerequis: [{ type: "quete", queteId: "em-7", verifie: true }],
    contenu: [
      { type: "combat", adversaires: ["Bandit Chafer"], groupe: true },
      { type: "combat", adversaires: ["Les Trois Crânes"], groupe: true },
      { type: "combat", adversaires: ["Dark Vlad"], groupe: false, tactique: true },
    ],
  },
];

// ---------- Dofus Pourpre (succès « Pourpre profond ») ----------
// Source : https://dofus.jeuxonline.info/article/13861/quetes-dofus-pourpre
// Les trois quêtes du refuge (lait, éternailes, anneau) se font dans l'ordre voulu, avant de finir Totankama.

const P = "pourpre";
export const QUETES_POURPRE: Quete[] = [
  q(P, "po-1", "Le livre des Taures", 90, [], {
    prerequis: [succes("Mais où sont les Dofus ?")],
    contenu: [groupe("Roublards Riko et Chypel"), donjon("Bibliothèque du Maître Corbac")],
  }),
  q(P, "po-2", "Taures et détours", 100, ["po-1"], {
    contenu: [donjon("Labyrinthe du Minotoror")],
  }),
  q(P, "po-3", "Il faut battre le lait quand il est chaud", 120, ["po-2"], {
    contenu: [solo("Roublards (avec Gavroch)"), donjon("Donjon des Blops")],
  }),
  q(P, "po-4", "Regrets d'éternailes", 120, ["po-2"], {
    contenu: [groupe("Araknesprit")],
    ressources: [
      res("po-4-r1", "13 × Totem Firefoux", { note: "drop Maho, Soryo et Yokai Firefoux" }),
      res("po-4-r2", "1 × Tige de Bambouto"),
    ],
  }),
  q(P, "po-5", "L'anneau de Tot", 120, ["po-2"], {
    contenu: [combat("Vensitard Smisse, Sramouraï, Kartouche"), donjon("Donjon du Capitaine Ekarlatte")],
    ressources: [res("po-5-r1", "1 × Tête de mort", { note: "drop sur les monstres de la zone de la taverne de Srambad" })],
  }),
  q(P, "po-7", "Le trésor de Totankama", 120, ["po-3", "po-4", "po-5"], {
    prerequis: [texte("Protection contre la malédiction (rituel de Mériana) : Anneau de Tot, Perle de lait doré et Poudre d'éternaile, obtenus par les trois quêtes précédentes")],
    contenu: [combat("Momie Nova (chasse légendaire)")],
    ressources: [
      res("po-7-r1", "Tablette de Totankama", { note: "à fabriquer avec les morceaux obtenus en chasse au trésor" }),
    ],
  }),
  q(P, "po-8", "Une âme en peine", 120, ["po-7"], { contenu: [tactique("Minogolem séculaire")] }),
  q(P, "po-9", "Le pouvoir derrière le trône", 120, ["po-8"], {
    contenu: [donjon("Donjon Royalmouth"), solo("Soun Rinos (avec Gavroch)")],
  }),
];

// ---------- Dofus Turquoise (succès « Bleu turquoise ») ----------
// Source : https://dofus.jeuxonline.info/article/14620/quetes-dofus-turquoise
// Les bénédictions se lancent pendant la quête du totem correspondant et la débloquent.

const T = "turquoise";
const ALTERATIONS = texte("Altérations (ex-idoles) : conditions revues à la mise à jour du 7 octobre", false);
export const QUETES_TURQUOISE: Quete[] = [
  q(T, "tu-1", "Plongeon et dragon", 80, [], {
    prerequis: [succes("Un disciple modèle"), succes("Mais où sont les Dofus ?")],
    contenu: [donjon("Donjon du Dragon Cochon"), donjon("Donjon du Chêne Mou"), groupe("Gardienne du Sanctuaire")],
  }),
  q(T, "tu-2", "Extinction des feux", 100, ["tu-1"], {
    contenu: [combat("Feu follet et Gargrouille"), combat("Obscuranti"), groupe("Ombre Vengeresse"), tactique("Esprit de Bolgrot")],
  }),
  q(T, "tu-3", "On dirait le Sud", 120, ["tu-2"], {
    contenu: [combat("Ombres Vengeresses"), combat("Ombre Vengeresse et Ombre Ailée")],
    ressources: [
      res("tu-3-r1", "5 × Pierre de Topaze"),
      res("tu-3-r2", "1 × Étoffe de Kaniglou"),
      res("tu-3-r3", "15 × Os de Sramouraï"),
      res("tu-3-r4", "1 × Oreille du Fu Mansot"),
      res("tu-3-r5", "1 × Talon d'Achille de l'Abrakleur sombre"),
    ],
  }),
  q(T, "tu-4", "La bénédiction de Viti", 140, ["tu-3"], {
    prerequis: [ALTERATIONS],
    contenu: [donjon("Fabrique de foux d'artifice (Idole de Viti Roussie)"), donjon("Laboratoire du Tynril (Idole de Viti Végétale)"), donjon("Excavation du Mansot Royal (Idole de Viti Glacée)")],
    // Idoles à fabriquer en [6,3] avant les combats.
    ressources: [
      res("tu-s-04", "10 × Corne de Berserkoffre", { note: "Idole de Viti Glacée" }),
      res("tu-s-21", "5 × Substrat de Bosquet", { note: "Idole de Viti Glacée" }),
      res("tu-s-02", "10 × Plume de Gobvious", { note: "Idole de Viti Glacée" }),
      res("tu-s-41", "1 × Chaussette trouée de Dramak", { note: "Idole de Viti Glacée" }),
      res("tu-s-30", "3 × Coquille de Dragoss Ardoise", { note: "Idole de Viti Glacée" }),
      res("tu-s-03", "10 × Peau de Don Duss Ang", { note: "Idole de Viti Roussie" }),
      res("tu-s-22", "5 × Kouartz", { note: "Idole de Viti Roussie" }),
      res("tu-s-05", "10 × Canine de Mergranlou", { note: "Idole de Viti Roussie" }),
      res("tu-s-06", "10 × Coquille de Dragoss Charbon", { note: "Idole de Viti Roussie" }),
      res("tu-s-42", "1 × Peau de Moon", { note: "Idole de Viti Roussie" }),
      res("tu-s-20", "8 × Estomac de Black Wo Wabbit", { note: "Idole de Viti Végétale" }),
      res("tu-s-23", "5 × Bakélélite", { note: "Idole de Viti Végétale" }),
      res("tu-s-43", "1 × Carapace du Mantiscore", { note: "Idole de Viti Végétale" }),
      res("tu-s-31", "3 × Laine de Dardalaine", { note: "Idole de Viti Végétale" }),
      res("tu-s-32", "3 × Écorce de Liroye Merline", { note: "Idole de Viti Végétale" }),
    ],
  }),
  q(T, "tu-5", "La méchante sorcière de l'Est", 140, ["tu-4"], {
    contenu: [groupe("Tous les monstres du Berceau d'Alma, 7 fois")],
  }),
  q(T, "tu-6", "La bénédiction de Thomahon", 150, ["tu-5"], {
    prerequis: [ALTERATIONS],
    contenu: [donjon("Repaire de Sphincter Cell (Idole de Thomahon Nauséabonde)"), donjon("Épave du Grolandais violent (Idole de Thomahon Marine)"), donjon("Canopée du Kimbo (Idole de Thomahon Arboricole)"), donjon("Hypogée de l'Obsidiantre (Idole de Thomahon d'Obsidienne)")],
    // Idoles à fabriquer en [6,3] avant les combats.
    ressources: [
      res("tu-s-24", "5 × Magnésite", { note: "Idole de Thomahon Marine" }),
      res("tu-s-07", "10 × Aile de Dragodinde", { note: "Idole de Thomahon Marine" }),
      res("tu-s-08", "10 × Poil de Rat d'Égoutant", { note: "Idole de Thomahon Marine" }),
      res("tu-s-09", "10 × Fleur de Gloutoblop", { note: "Idole de Thomahon Marine" }),
      res("tu-s-44", "1 × Carniflore", { note: "Idole de Thomahon Marine" }),
      res("tu-6-kouartz", "5 × Kouartz", { note: "Idole de Thomahon Nauséabonde" }),
      res("tu-s-10", "10 × Peau de Don Dorgan", { note: "Idole de Thomahon Nauséabonde" }),
      res("tu-s-11", "10 × Moustache du Mufafah", { note: "Idole de Thomahon Nauséabonde" }),
      res("tu-s-12", "10 × Oreille de Rhinoféroce", { note: "Idole de Thomahon Nauséabonde" }),
      res("tu-6-chaussette", "1 × Chaussette trouée de Dramak", { note: "Idole de Thomahon Nauséabonde" }),
      res("tu-s-25", "5 × Kriptonite", { note: "Idole de Thomahon Arboricole" }),
      res("tu-s-33", "3 × Rotule du Disciple Zoth", { note: "Idole de Thomahon Arboricole" }),
      res("tu-s-34", "3 × Aile Atrophiée de Tofu Dodu", { note: "Idole de Thomahon Arboricole" }),
      res("tu-s-01", "200 × Pépite", { note: "Idole de Thomahon Arboricole" }),
      res("tu-s-45", "1 × Feuille de Blop Multicolore Royal", { note: "Idole de Thomahon Arboricole" }),
      res("tu-s-13", "10 × Duvet de Truchon", { note: "Idole de Thomahon Arboricole" }),
      res("tu-s-26", "5 × Ebonite", { note: "Idole de Thomahon d'Obsidienne" }),
      res("tu-s-14", "10 × Tronc de Kokoko", { note: "Idole de Thomahon d'Obsidienne" }),
      res("tu-s-27", "5 × Lait de Tortue", { note: "Idole de Thomahon d'Obsidienne" }),
      res("tu-s-15", "10 × Casque Cassé du Chafer", { note: "Idole de Thomahon d'Obsidienne" }),
      res("tu-s-46", "1 × Plume du Kwakwa", { note: "Idole de Thomahon d'Obsidienne" }),
    ],
  }),
  q(T, "tu-7", "Autel du Nord", 150, ["tu-6"], { contenu: [solo("Robot Expérimental (avec l'Automate Brigandin)")] }),
  q(T, "tu-8", "La bénédiction de Foluk", 160, ["tu-5"], {
    prerequis: [ALTERATIONS],
    contenu: [donjon("Galerie du Phossile (Idole de Foluk Dorée)"), donjon("Grotte de Kanigroula (Idole de Foluk Griffée)"), donjon("Antre du Korriandre (Idole de Foluk Féérique)")],
    // Idoles à fabriquer en [6,3] avant les combats.
    ressources: [
      res("tu-s-35", "3 × Corne de Dragoss Calcaire", { note: "Idole de Foluk Dorée" }),
      res("tu-s-36", "3 × Corne de Rhinoféroce", { note: "Idole de Foluk Dorée" }),
      res("tu-s-28", "5 × Substrat de Fascine", { note: "Idole de Foluk Dorée" }),
      res("tu-s-47", "1 × Groin de Dragon Cochon", { note: "Idole de Foluk Dorée" }),
      res("tu-s-37", "3 × Échasse de Molette", { note: "Idole de Foluk Dorée" }),
      res("tu-s-16", "10 × Poils de Smilomouth", { note: "Idole de Foluk Griffée" }),
      res("tu-s-17", "10 × Carpelle de Brouture", { note: "Idole de Foluk Griffée" }),
      res("tu-8-pepite-griffee", "200 × Pépite", { note: "Idole de Foluk Griffée" }),
      res("tu-s-18", "10 × Croupion de Truchmuche", { note: "Idole de Foluk Griffée" }),
      res("tu-8-kriptonite", "5 × Kriptonite", { note: "Idole de Foluk Griffée" }),
      res("tu-s-48", "1 × Laine du Royalmouth", { note: "Idole de Foluk Griffée" }),
      res("tu-s-29", "5 × Substrat de Fourré", { note: "Idole de Foluk Féérique" }),
      res("tu-s-19", "10 × Calumet Zoth", { note: "Idole de Foluk Féérique" }),
      res("tu-s-38", "3 × Morpion de Truchideur", { note: "Idole de Foluk Féérique" }),
      res("tu-s-39", "3 × Arête géante du Shamansot", { note: "Idole de Foluk Féérique" }),
      res("tu-8-pepite-feerique", "200 × Pépite", { note: "Idole de Foluk Féérique" }),
      res("tu-s-49", "1 × Pixel de Fraktale", { note: "Idole de Foluk Féérique" }),
    ],
  }),
  q(T, "tu-9", "Il était une foi dans l'Ouest", 160, ["tu-8"], {
    contenu: [groupe("Craqueleur de la Baie de Cania")],
  }),
  q(T, "tu-10", "Une âme en colère", 160, ["tu-7", "tu-9"], {
    contenu: [combat("Esprits Kelpe, Verak, Goémus, Cyanog, Norie"), tactique("Furye")],
    ressources: [res("tu-10-r1", "5 × Globe Mystique", { note: "sur les monstres de la Forêt pétrifiée de Frigost (12 %, 18 % sur le Korriandre)" })],
  }),
];

// ---------- Dofus Ocre (« L'éternelle moisson ») ----------
// Source : https://dofus.jeuxonline.info/article/5986/eternelle-moisson-dofus-ocre
// Une seule quête : le détail des archimonstres se suit sur Metamob.

const O = "ocre";
export const QUETES_OCRE: Quete[] = [
  q(O, "oc-1", "L'éternelle moisson", 40, [], {
    prerequis: [niveau(40), texte("Sort Capture d'âmes")],
    contenu: [combat("Tous les archimonstres et boss de donjon à capturer pour Otomaï"), groupe("Kralamoure Géant (dernière étape)")],
  }),
];

// ---------- Dofus Ivoire (succès « Blanc Ivoire ») ----------
// Source : https://dofus.jeuxonline.info/article/14284/quetes-dofus-ivoire
// Les quatre quêtes des Nordes se font pendant « Nordalie » ; le guide conseille « Le guerrier noir » en premier.

const I = "ivoire";
export const QUETES_IVOIRE: Quete[] = [
  q(I, "iv-1", "Le Dragon Blanc", 180, [], {
    prerequis: [niveau(180), texte("Quêtes de l'île de Pandala terminées")],
    contenu: [combat("Miliciens de Brâkmar (3 vagues)"), donjon("Chaloeil")],
    ressources: [
      res("iv-1-r1", "50 × Graisse Gélatineuse", { note: "cire, atelier Alchimiste" }),
      res("iv-1-r2", "15 × Obsidienne", { note: "cire" }),
      res("iv-1-r3", "1 × Pic du Nocturlabe", { note: "cire" }),
      res("iv-1-r4", "1 × Peau de Crocabulia", { note: "cire" }),
      res("iv-1-r5", "1 × Corde de Fancrôme", { note: "mèche, atelier Tailleur" }),
      res("iv-1-r6", "5 × Moustache de Rilur", { note: "mèche" }),
      res("iv-1-r7", "15 × Perce-Neige", { note: "mèche" }),
      res("iv-1-r8", "20 × Blague de Soufre", { note: "mèche" }),
    ],
  }),
  q(I, "iv-2", "Examen de passage", 180, ["iv-1"], {
    prerequis: [texte("Alignement 100 (Bonta ou Brâkmar) et quêtes d'ordre terminées")],
    contenu: [donjon("Ventre de la Baleine (Protozorreur)")],
  }),
  q(I, "iv-3", "Le Pays gris", 180, ["iv-2"], { contenu: [combat("Mane Curieux (survivre 5 tours)")] }),
  q(I, "iv-4", "Casse en Enutrosor", 180, ["iv-3"], {
    prerequis: [externe("Espionnage industriel")],
    contenu: [groupe("Serviteurs d'Hyrkul"), donjon("Palais du Roi Nidas"), groupe("Coffret précieux")],
  }),
  q(I, "iv-5", "Le guerrier noir", 180, ["iv-4"], {
    contenu: [groupe("Bwork Bibliophile")],
    ressources: [
      res("iv-5-r1", "9 crânes (3 par zone, 2 %)", {
        note: "Hauts Ténébreux de Srambad, Tannerie Écarlate, Fosse de R'lyugluglu (version Cœur Vaillant)",
        verifie: false,
      }),
    ],
  }),
  q(I, "iv-6", "Le bonheur est dans le spray", 180, ["iv-4"], {
    prerequis: [texte("Quêtes de Nimotopia terminées")],
    ressources: [res("iv-6-r1", "1 × Baguette Rikiki")],
    contenu: [groupe("Chasseurs de Likrone"), groupe("Compère Tifoux"), groupe("Chazrael"), groupe("Colère d'Ougah"), tactique("Rainikrone")],
  }),
  q(I, "iv-7", "Une voix de crystal", 180, ["iv-4"], {
    contenu: [donjon("Laboratoire de Nileza"), donjon("Vaisseau du Capitaine Méno")],
  }),
  q(I, "iv-8", "Le mort dans l'âme", 180, ["iv-4"], {
    contenu: [combat("Abraknyde Sinistre"), donjon("Manoir de Katrepat")],
    ressources: [res("iv-8-r1", "50 × Frostiz", { note: "pour le pain à l'ail auprès de Rucar" })],
  }),
  q(I, "iv-9", "Nordalie", 180, ["iv-5", "iv-6", "iv-7", "iv-8"], {
    prerequis: [texte("Quêtes de Frigost : L'âme de glace (prologue), Bienvenue à Frigost, L'essentiel est dans Lac Gelé, Malédiction !"), externe("Allumer le feu"), externe("La bête intérieure")],
    contenu: [donjon("Chambre de Tal Kasha"), combat("Hyrkul le Tendancieux (avec deux Centorors)")],
  }),
  q(I, "iv-10", "Il est temps de mourir", 180, ["iv-9"], {
    contenu: [donjon("Transporteur de Sylargh"), groupe("Vieux Fauchalak"), tactique("Hyrkul")],
  }),
];

// ---------- Dofus Ébène (succès « Noir d'Ébène ») ----------
// Source : https://dofus.jeuxonline.info/article/14691/quetes-dofus-ebene

const E = "ebene";
export const QUETES_EBENE: Quete[] = [
  q(E, "eb-1", "L'épée du rocher", 120, [], {
    prerequis: [
      niveau(120), succes("Promenons-nous dans les bois"),
      externe("Mieux vaut ne pas se fier à la première impression"), externe("Un pendule pour guider ses pas"),
      texte("Accès à Frigost III (Glourséleste vaincu au moins une fois)"),
    ],
    contenu: [donjon("Repaire de Skeunk"), donjon("Mégalithe de Fraktale"), combat("Craqueleurs de Verre"), combat("Gardienne de l'épée")],
    ressources: [
      res("eb-1-r1", "36 × Poudre de Perlinpainpain", { note: "pour 3 Poudres de Superlinpainpain (Paysan)" }),
      res("eb-1-r2", "18 × Seigle"),
      res("eb-1-r3", "18 × Mesure de sel"),
    ],
  }),
  q(E, "eb-2", "Le forgeur de légende", 120, ["eb-1"], {
    prerequis: [externe("Le Fléau de Burin")],
    contenu: [combat("Feu de forge volcanique"), combat("Sourcier Koalak"), combat("Gardiens de l'épée"), donjon("Sanctuaire des Dragoeufs (Crocabulia)")],
  }),
  q(E, "eb-3", "Jusqu'au bout du rêve", 120, ["eb-2"], {
    ressources: [
      res("eb-3-r1", "12 Songes de Crocobur (rencontres aléatoires dans les Songes infinis)", {
        alternative: "jusqu'à 68 400 Reflets Oniriques payés à Draconiros",
        note: "Songes infinis, Rêve III ou plus",
        verifie: false,
      }),
    ],
  }),
  q(E, "eb-4", "À la recherche de Crocoburio", 190, ["eb-3"], {
    prerequis: [niveau(190), externe("La Colère des Dieux")],
    contenu: [donjon("Tour de Bethel"), combat("Monstres de la Forêt des Pins Perdus"), combat("Bruce Epett"), groupe("Boîboites à outils")],
  }),
  q(E, "eb-5", "Le creuset de Mériana", 190, ["eb-4"], {
    // JOL : l'alliage peut être fait « à l'aide d'un mineur » ; DPLN : « être mineur niveau 20 ». On suit DPLN.
    prerequis: [metier("Paysan", 80, true), { type: "metier", metier: "Mineur", niveau: 20, personnel: true, verifie: false }],
    contenu: [combat("Fuite d'eau"), combat("3 Chafers Millénaires"), donjon("Temple de Koutoulou")],
    ressources: [
      res("eb-5-r1", "10 × Obsidienne"),
      res("eb-5-r2", "10 × Écume de mer"),
      res("eb-5-r3", "10 × Dolomite"),
      res("eb-5-r4", "10 × Métal Abyssal", { note: "drop Mercemers, Base Abyssale (25 %)" }),
    ],
  }),
  q(E, "eb-6", "Une douloureuse séparation", 190, ["eb-5"], {
    contenu: [combat("Vapeurs Délétères"), combat("Miliciens corrompus (avec Joris Jurgen)"), tactique("Crocoburio")],
    ressources: [res("eb-6-r1", "1 × Corde d'escalade")],
  }),
  q(E, "eb-7", "Le dragon noir", 190, ["eb-6"], {
    prerequis: [externe("Frappez, amis et entrez"), externe("De Brikke et de Brokke"), externe("La dernière barbe avant la fin du monde")],
    contenu: [donjon("Brasserie du Roi Dazak"), donjon("Salons privés de Klime"), combat("Moskitos Géants et Gloutovores Affamés"), combat("Guerriers Crocodailles")],
    ressources: [
      res("eb-7-r1", "10 × Saucisse Fumée"),
      res("eb-7-r2", "5 × Barbarbe"),
      res("eb-7-r3", "20 × Perce-Neige", { note: "pour 2 Soupes au caillou de Graillevent" }),
    ],
  }),
  q(E, "eb-8", "La vengeance du dernier empereur", 190, ["eb-7"], {
    contenu: [combat("Shushen, Shushkebab, Shushuaïa"), solo("Bulak")],
    ressources: [res("eb-8-r1", "20 000 kamas", { note: "pour Bout d'chair" })],
  }),
  q(E, "eb-9", "L'oeuf de Crocabulia", 190, ["eb-8"], {
    contenu: [combat("Chasseuses de Poison"), donjon("Trône de la Cour Sombre"), combat("Clan Smisse")],
  }),
  q(E, "eb-10", "Un nouvel héritier", 190, ["eb-9"], {
    contenu: [donjon("Tour de Solar"), combat("Crocobur"), combat("Gloots Marécageux (4 vagues)"), tactique("Grougalorasalar")],
    ressources: [res("eb-10-r1", "20 × Âme de Calciné", { note: "Marches Magmatiques" })],
  }),
];

// ---------- Dofus des Veilleurs (4 succès, Dofus 3) ----------
// Source : https://www.millenium.org/guide/420160.html

const V = "veilleurs";
export const QUETES_VEILLEURS: Quete[] = [
  q(V, "ve-1", "Voyage, voyage", 79, [], { prerequis: [niveau(79)] }),
  q(V, "ve-2", "La porte d'Enutrosor", 80, ["ve-1"]),
  q(V, "ve-3", "Orichomania", 80, ["ve-2"]),
  q(V, "ve-4", "La cité de l'indicible mal", 90, ["ve-3"]),
  q(V, "ve-5", "Messager clandestin", 90, ["ve-4"]),
  q(V, "ve-6", "La voix de son maître", 90, ["ve-5"]),
  q(V, "ve-7", "Le maître des zaaps", 100, ["ve-6"]),
  q(V, "ve-8", "Énergie renouvelable", 100, ["ve-7"]),
  q(V, "ve-9", "Traitement de choc", 100, ["ve-8"]),
  q(V, "ve-10", "Le disparu de Sufokia", 100, ["ve-9"]),
  q(V, "ve-11", "Rendez-vous avec la mort", 100, ["ve-10"]),
  q(V, "ve-12", "Secret de fabrication", 100, ["ve-11"]),
  q(V, "ve-13", "S'emparer des commandes", 100, ["ve-11"]),
  q(V, "ve-14", "C'est dans la boîte", 100, ["ve-11"]),
  q(V, "ve-15", "Crise d'identité", 100, ["ve-12", "ve-13", "ve-14"]),
];

// ---------- Catalogue ----------

export const DPLN = (page: string) => ({ nom: "Dofus pour les Noobs", url: "https://www.dofuspourlesnoobs.com/" + page });
export const JOL = (article: string) => ({ nom: "JeuxOnLine (Dofus 2)", url: "https://dofus.jeuxonline.info/article/" + article });
// Liste des quêtes vérifiée sur DPLN (Dofus 3) ; détail des combats et ordre des branches repris de JOL (Dofus 2).
const AVERT_DETAIL = "Une erreur dans les étapes ? Préviens un officier sur Discord.";

// Domakuro : succès « Les grands esprits se rencontrent » (quêtes de Pandala). Source : DPLN, page de chaque quête.
const DK = "domakuro";
const PANDAZAHI = (id: string) => res(id, "1 × Pandazahi", { alternative: "1 × Pandaporo", note: "taverne du Pandazaap, 40 kamas" });

export const QUETES_DOMAKURO: Quete[] = [
  q(DK, "dk-1", "Le réveil de Pandala", 30, [], {
    prerequis: [texte("Lancée par Moktwa, devant le pont de Pandala en [12,-21]")],
    contenu: [groupe("Chaque Sidoa de la Carrière d'Astrub, 5 fois (Martoa, Sherpoa, Douzdoa, Pikdoa)")],
    ressources: [
      res("dk-1-r1", "5 × Laine de Boufton Noir", { note: "Sérum contre la Pandrista, en atelier d'alchimiste" }),
      res("dk-1-r2", "50 × Ortie", { note: "Sérum contre la Pandrista" }),
    ],
  }),
  q(DK, "dk-2", "À la croisée des mondes", 100, ["dk-1"], {
    prerequis: [
      metier("Façonneur", 10, true),
      texte("Conseillé : avoir fait « Ça est frugal, une fois », sinon la Filtounga coûte 50 000 kamas"),
    ],
    contenu: [
      tactique("Yokai de la bibliothèque : les rendre somnolents tous les 5 au même tour"),
      solo("3 Pandissidans, sous la banque en [20,-30]"),
      tactique("Maître Kwatimbe, invulnérable : le tacler quand il fuit"),
    ],
    ressources: [
      res("dk-2-r1", "2 × Artefact Pandawushu Roc", { note: "Pandaclier, atelier des façonneurs de Pandala [23,-28]" }),
      res("dk-2-r2", "2 × Artefact Pandawushu Vent", { note: "Pandaclier" }),
      res("dk-2-r3", "2 × Artefact Pandawushu Bois", { note: "Pandaclier" }),
      res("dk-2-r4", "2 × Artefact Pandawushu Feu", { note: "Pandaclier" }),
      res("dk-2-r5", "2 × Artefact Pandawushu Eau", { note: "Pandaclier" }),
      res("dk-2-r6", "20 × Bois de Bambou", { note: "Pandaclier" }),
      res("dk-2-r7", "1 × Pandaburg", { note: "Pandaclier, taverne du Pandazaap [20,-29]" }),
      PANDAZAHI("dk-2-r8"),
    ],
  }),
  q(DK, "dk-3", "Sous le bois de sa colère", 110, ["dk-2"], {
    prerequis: [texte("Astuce : lancer « Le Saule du Promeneur » avant, il demande le même donjon")],
    contenu: [
      groupe("Combat à vagues de Bamboutos, devant la Bambusaie en [26,-30]"),
      donjon("Bambusaie de Damadrya : lire la page du registre près du squelette, salle 4, avant le boss"),
      groupe("Négociant amaknéen [18,-29]"),
      groupe("Fruits de l'arbre Goroku [26,-32]"),
    ],
  }),
  q(DK, "dk-4", "Au nom de l'Art", 130, ["dk-3"], {
    prerequis: [metier("Alchimiste", 1, true)],
    contenu: [
      donjon("Atelier du Tanukouï San [26,-24]"),
      groupe("Kaskouïs en [27,-28] : les sortir de leur glyphe pour les rendre vulnérables"),
      groupe("Kaskouïs en [25,-24]"),
      solo("Tanuki Durtouki [26,-27] : le sortir de son glyphe"),
    ],
    ressources: [
      res("dk-4-r1", "1 × Huile de Riz", { note: "Baume Hakouï, en atelier d'alchimiste" }),
      res("dk-4-r2", "3 × Poils magiques de Tanuki", { note: "Baume Hakouï" }),
      res("dk-4-r3", "2 × Poussière de Roche", { note: "à ramasser sur la colonne en [25,-25]" }),
      res("dk-4-r4", "7 000 kamas", { note: "Alcool à 99 % (1 000), livre des géoglyphes (1 000), carré d'exposition (5 000, l'option la moins chère)" }),
    ],
  }),
  q(DK, "dk-5", "La jetée des enfants perdus", 130, ["dk-4"], {
    contenu: [
      groupe("Kwapas autour de Yuminh [18,-25]"),
      groupe("Chasseur enutrof [20,-24]"),
      solo("Kwapas devant la Vallée [22,-24], avec Kwatalo"),
      donjon("Vallée de la Dame des eaux (Nagate)"),
    ],
    ressources: [
      res("dk-5-r1", "6 × Concombre sauvage", { note: "à ramasser en [20,-23], [21,-22], [22,-23], [23,-23], [18,-24] et [18,-22]" }),
      res("dk-5-r2", "15 kamas", { note: "Granouilles du pont [23,-22] : 8, 4, 2 puis 1 kama, de la plus grosse à la plus petite" }),
    ],
  }),
  q(DK, "dk-6", "Le festival de la lanterne", 140, ["dk-5"], {
    contenu: [
      groupe("Feux follets, à la Lanterne primordiale [17,-32]"),
      solo("Firefoux, pour protéger le Qilin de papier [18,-34] : il ne doit pas mourir"),
      donjon("Fabrique de foux d'artifice (Founoroshi)"),
    ],
    ressources: [
      res("dk-6-r1", "8 × Énigme du festival des lanternes", { note: "sur les Firefoux de Feudala (12 %)" }),
      res("dk-6-r2", "100 × Graine de Sésame", { note: "10 Wanchio au sésame, atelier de Stayfun Bonnawa [23,-27]" }),
      res("dk-6-r3", "100 × Riz", { note: "50 par sorte de Wanchio" }),
      res("dk-6-r4", "50 × Haricot", { note: "10 Wanchio aux haricots" }),
      res("dk-6-r5", "20 × Eau Potable", { note: "10 par sorte de Wanchio" }),
    ],
  }),
  q(DK, "dk-7", "L'équilibre des forces", 140, ["dk-6"], {
    prerequis: [metier("Paysan", 1, true)],
    contenu: [
      solo("2 Poseurs de bombe en [19,-32]"),
      solo("2 Poseurs de bombe en [19,-33]"),
      groupe("Gardes Kozaru [21,-35]"),
      donjon("Dojo du Vent [20,-37] (Hanshi)"),
    ],
    ressources: [
      res("dk-7-r1", "3 × Viscères de Scarafeuille", { note: "Offrande à l'esprit du Vent, atelier « moudre »" }),
      res("dk-7-r2", "3 × Fraise", { note: "Offrande à l'esprit du Vent" }),
      res("dk-7-r3", "8 × Bananagrume", { note: "Offrande à l'esprit du Vent" }),
    ],
  }),
  q(DK, "dk-8", "Sang d'encre", 140, ["dk-7"], {
    prerequis: [texte("Garder le Pandaclier : il faut l'équiper pour entrer dans la Pandassemblée")],
    contenu: [
      solo("Assassins Pandikazes [19,-34], avec Ikunochi"),
      solo("Maître Pandore : ignorer les invocations, Ikunochi s'en charge"),
    ],
    ressources: [
      res("dk-8-r1", "1 000 kamas", { note: "Offrande au Grand Pouddah, Marchande aerdalienne" }),
      PANDAZAHI("dk-8-r2"),
    ],
  }),
];

export const DOFUS: Dofus[] = [
  {
    id: "emeraude", nom: "Émeraude", succes: "Vert émeraude", couleur: "#3f9b6e", primordial: true, quetes: QUETES_EMERAUDE,
    sources: [DPLN("dofus-emeraude.html"), { nom: "Dofuserie", url: "https://www.dofuserie.com/dofus/dofus-emeraude/" }],
  },
  {
    id: "pourpre", nom: "Pourpre", succes: "Pourpre profond", couleur: "#b8323f", primordial: true, quetes: QUETES_POURPRE,
    avertissement: AVERT_DETAIL,
    sources: [DPLN("quecirctes-du-dofus-pourpre.html"), JOL("13861/quetes-dofus-pourpre")],
  },
  {
    id: "turquoise", nom: "Turquoise", succes: "Bleu turquoise", couleur: "#2a9aa6", primordial: true, quetes: QUETES_TURQUOISE,
    avertissement: AVERT_DETAIL,
    sources: [DPLN("quecirctes-du-dofus-turquoise.html"), JOL("14620/quetes-dofus-turquoise")],
  },
  {
    id: "ocre", nom: "Ocre", succes: "L'éternelle moisson", couleur: "#d6a521", primordial: true, quetes: QUETES_OCRE,
    notes: ["Chaque capture est personnelle : à deux, chaque monstre doit être capturé deux fois", "La pierre du Kralamoure Géant n'est pas échangeable"],
    liens: [{ nom: "Metamob", url: "https://www.metamob.fr", description: "suivi des archimonstres capturés" }],
    sources: [JOL("5986/eternelle-moisson-dofus-ocre")],
  },
  {
    id: "ivoire", nom: "Ivoire", succes: "Blanc Ivoire", couleur: "#e8e0cc", primordial: true, quetes: QUETES_IVOIRE,
    avertissement: AVERT_DETAIL,
    sources: [DPLN("quecirctes-du-dofus-ivoire.html"), JOL("14284/quetes-dofus-ivoire")],
  },
  {
    id: "ebene", nom: "Ébène", succes: "Noir d'Ébène", couleur: "#5a5a5a", accent: "#a8a8a8", primordial: true, quetes: QUETES_EBENE,
    avertissement: AVERT_DETAIL,
    sources: [DPLN("quetes-du-dofus-ebene.html"), JOL("14691/quetes-dofus-ebene")],
  },
  {
    id: "veilleurs", nom: "Veilleurs", succes: "Odyssée en trois dimensions", couleur: "#3b6fb6", quetes: QUETES_VEILLEURS,
    avertissement: "Combats et ressources pas encore renseignés.",
    sources: [DPLN("dofus-des-veilleurs.html"), { nom: "Millenium", url: "https://www.millenium.org/guide/420160.html" }],
  },
  {
    id: "domakuro", nom: "Domakuro", succes: "Les grands esprits se rencontrent", couleur: "#4a4a5e", accent: "#a9a9c4", quetes: QUETES_DOMAKURO,
    avertissement: AVERT_DETAIL,
    sources: [DPLN("quetes-du-domakuro.html"), JOL("2037/quetes-pandala-dofus-domakuro")],
  },
];

// La liste de toutes les quêtes (Dofus et autres séries) est dans series.ts.
