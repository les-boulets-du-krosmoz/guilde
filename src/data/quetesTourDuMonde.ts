import { donjon, DPLN, JOL, q, res, texte, type Dofus, type Options, type Quete } from "./dofus";

// Préfixes : « tdm- » Tour du monde (Metag Robill), « etp- » Emma Tom Pouce.
// Tour du monde : Gamosaurus (mis à jour en juin 2025, Dofus 3), recoupé avec JeuxOnLine (Dofus 2) et la liste des 27 donjons.
// Coordonnées des donjons : liste des donjons de DPLN. « (à confirmer) » : les sources ne donnent pas la même.

const T = "tour-du-monde";

type Etape = { id: string; nom: string; niv: number; lieu: string; o: Options };
/** Une étape de la série = un boss à vaincre dans son donjon. */
const boss = (id: string, nom: string, niv: number, lieu: string, o: Options = {}): Etape => ({ id, nom, niv, lieu, o });
/** Les étapes se suivent : chacune demande la précédente, comme les quêtes du jeu. */
function enChaine(serie: string, etapes: Etape[]): Quete[] {
  return etapes.map((e, i) => q(serie, e.id, e.nom, e.niv, i === 0 ? [] : [etapes[i - 1].id], { ...e.o, contenu: [donjon(e.lieu)] }));
}
const GAMOSAURUS = (page: string) => ({ nom: "Gamosaurus", url: "https://www.gamosaurus.com/" + page });

export const TOUR_DU_MONDE: Dofus = {
  id: T,
  nom: "Tour du monde",
  succes: "Le tour du monde en 27 donjons",
  unite: "boss",
  couleur: "#d9a441",
  notes: [
    "À partir des « Sbires du maître », le PNJ qui donne la quête remet la clef de chaque donjon : rien à acheter",
    "Garde-manger du Rat Blanc et Sousouricière du Rat Noir sont les donjons des Rats de Bonta et de Brâkmar",
    "Pour finir le succès, retournez voir le Maître des clefs après le Bworker (quête « Le tracas du guerrier », sans combat)",
  ],
  sources: [
    DPLN("le-tour-du-monde-en-27-donjons.html"),
    GAMOSAURUS("jeux/dofus/solution-des-quetes-du-succes-le-tour-du-monde-en-27-donjons-dofus"),
    JOL("7761/tour-monde-metag-robill"),
  ],
  quetes: enChaine(T, [
    // Le tour du monde
    boss("tdm-tournesol-affame", "Tournesol Affamé", 20, "Grange du Tournesol Affamé [7,-24]", {
      prerequis: [texte("Parler à Metag Robill, devant la Grange du Tournesol Affamé en [7,-24]")],
      ressources: [res("tdm-r-petale", "1 Pétale de Tournesol Sauvage", { verifie: false })],
    }),
    // Revenons à nos bouftons
    boss("tdm-bouftou-royal", "Bouftou Royal", 30, "Cour du Bouftou Royal, entrée à Tainéla [2,-34]"),
    // Le maître des clefs
    boss("tdm-chafer-ronin", "Chafer Ronin", 30, "Donjon des Squelettes [10,15]"),
    boss("tdm-batofu", "Batofu", 30, "Donjon des Tofus [5,6], dans le champ des Ingalsse"),
    // Les sbires du maître
    boss("tdm-scarabosse-dore", "Scarabosse Doré", 40, "Donjon des Scarafeuilles [1,26]"),
    boss("tdm-coffre-forgerons", "Coffre des Forgerons", 40, "Donjon des Forgerons [13,21]"),
    boss("tdm-bworkette", "Bworkette", 40, "Donjon des Bworks [-5,10]"),
    boss("tdm-shin-larve", "Shin Larve", 40, "Donjon des Larves [-2,-5]"),
    boss("tdm-rakoopeur", "Rakoopeur", 40, "Refuge Sylvestre [40,-84] sur l'archipel de Valonia (bateau depuis Amakna en [10,-3])"),
    boss("tdm-craqueleur-legendaire", "Craqueleur Légendaire", 40, "Pitons Rocheux des Craqueleurs [-3,-7]"),
    // Un juge hystérique
    boss("tdm-abraknyde-ancestral", "Abraknyde Ancestral", 90, "Domaine Ancestral [-9,-14]"),
    boss("tdm-dragon-cochon", "Dragon Cochon", 90, "Antre du Dragon Cochon [-1,33]"),
    boss("tdm-koulosse", "Koulosse", 90, "Caverne du Koulosse [-17,8]"),
    boss("tdm-meulou", "Meulou", 90, "Tanière du Meulou [-23,0]"),
    boss("tdm-rat-blanc", "Rat Blanc", 90, "Garde-manger du Rat Blanc [-36,-60], par le vide-ordures des cuisines du Palais ou par les égouts en [-32,-58]"),
    boss("tdm-rat-noir", "Rat Noir", 90, "Sousouricière du Rat Noir [-29,35] (à confirmer)"),
    // Des donjons, encore des donjons
    boss("tdm-maitre-corbac", "Maître Corbac", 110, "Bibliothèque du Maître Corbac [-15,-62]"),
    boss("tdm-royalmouth", "Royalmouth", 110, "Serre du Royalmouth [-84,-49], à Frigost", {
      prerequis: [texte("Avoir accès à Frigost : bateau en [-34,-16], niveau 50 minimum")],
    }),
    boss("tdm-minotoror", "Minotoror", 110, "Labyrinthe du Minotoror [-42,-17]"),
    boss("tdm-tofu-royal", "Tofu Royal", 110, "Tofulailler Royal [5,6]"),
    boss("tdm-crocabulia", "Crocabulia", 110, "Sanctuaire des Dragoeufs [-2,25] : descendre en [-4,24] en parlant à Ziho"),
    // La voie du guerrier
    boss("tdm-skeunk", "Skeunk", 120, "Repaire de Skeunk [-20,10]"),
    boss("tdm-tanukoui-san", "Tanukouï San", 120, "Atelier du Tanukouï San [26,-24]"),
    boss("tdm-founoroshi", "Founoroshi", 120, "Fabrique de foux d'artifice [14,-32]"),
    boss("tdm-chene-mou", "Chêne Mou", 120, "Clairière du Chêne Mou [-14,-13]"),
    boss("tdm-minotot", "Minotot", 120, "Donjon du Minotot [-37,-11] (à confirmer)"),
    boss("tdm-bworker", "Bworker", 120, "Grotte du Bworker [-15,14]"),
  ]),
};

// Emma Tom Pouce : DPLN (5 succès, de « Première édition de donjons » à « La tornade des donjons »), boss et positions
// tirés de la liste des donjons de DPLN ; ordre de la Tornade recoupé avec Gamosaurus.
const E = "emma-tom-pouce";

export const EMMA_TOM_POUCE: Dofus = {
  id: E,
  nom: "Emma Tom Pouce",
  succes: "Première édition de donjons → La tornade des donjons",
  unite: "boss",
  couleur: "#d9a441",
  notes: [
    "Le PNJ qui donne chaque quête remet la clef du donjon : rien à acheter",
    "Pour finir le dernier succès, retournez voir Emma Tompouce après le Kralamoure Géant (quête « Le tour est joué », sans combat)",
  ],
  sources: [
    DPLN("classeacutees-par-succegraves.html"),
    DPLN("donjons.html"),
    JOL("14665/tour-monde-emma-tom-pouce"),
  ],
  quetes: enChaine(E, [
    // Première édition de donjons
    boss("etp-mob-l-eponge", "Mob l'Éponge", 20, "Château Ensablé [13,-28]", {
      prerequis: [texte("Parler à Emma Tompouce, sous l'épicerie d'Astrub en [1,-15]")],
    }),
    boss("etp-kankreblath", "Kankreblath", 40, "Cache de Kankreblath [3,-17]"),
    boss("etp-boostache", "Boostache", 40, "Maison Fantôme [-13,-41]"),
    boss("etp-directeur-grunob", "Directeur Grunob", 40, "Akadémie des Gobs [-5,3]"),
    boss("etp-kwakwa", "Kwakwa", 50, "Nid du Kwakwa [-4,-7]"),
    boss("etp-corailleur-magistral", "Corailleur Magistral", 50, "Grotte Hesque [-59,15]"),
    // Donjons avancés
    boss("etp-blops-royaux", "Blops Royaux (Coco, Griotte, Indigo, Reinette)", 60, "Clos des Blops [-25,-17]"),
    boss("etp-kanniboul-ebil", "Kanniboul Ebil", 60, "Village Kanniboul [29,9]"),
    boss("etp-wa-wabbit", "Wa Wabbit", 60, "Château du Wa Wabbit [24,-13]"),
    boss("etp-gelees-royales", "Gelées Royales (Bleuet, Menthe, Fraise, Citron)", 60, "Gelaxième dimension, accès par le Multygely"),
    boss("etp-draegnerys", "Draegnerys", 70, "Épreuve de Draegnerys [-4,29]"),
    boss("etp-gourlo", "Gourlo le Terrible", 70, "Cale de l'Arche d'Otomaï [-55,-4]"),
    // Donjons trois point cinq
    boss("etp-nelween", "Nelween", 70, "Laboratoire de Brumen Tinctorias [-27,17]"),
    boss("etp-mantiscore", "Mantiscore", 80, "Cimetière des Mastodontes [19,-61]"),
    boss("etp-wa-wobot", "Wa Wobot", 80, "Terrier du Wa Wabbit [28,-12]"),
    boss("etp-chouque", "Chouque", 90, "Bateau du Chouque [33,3]"),
    boss("etp-choudini", "Choudini", 90, "Chapiteau des Magik Riktus [-22,12]"),
    // Le siège des donjons
    boss("etp-reine-nyee", "Reine Nyée", 90, "Antre de la Reine Nyée [-6,-15]"),
    boss("etp-kharnozor", "Kharnozor", 100, "Repaire du Kharnozor [-3,25]"),
    boss("etp-maitre-des-pantins", "Maître des Pantins", 100, "Théâtre de Dramak [21,7]"),
    boss("etp-moon", "Moon", 100, "Arbre de Moon [29,6]"),
    boss("etp-rasboul-majeur", "Rasboul Majeur", 110, "Goulet du Rasboul [-51,9]"),
    boss("etp-blop-multicolore", "Blop Multicolore Royal", 120, "Antre du Blop Multicolore Royal [-25,-17]"),
    // La tornade des donjons
    boss("etp-tynril", "Tynril", 140, "Laboratoire du Tynril [-53,20]", {
      prerequis: [texte("Les missions de la Tornade sont données par Lorie Culère en [16,27]")],
    }),
    boss("etp-sphincter-cell", "Sphincter Cell", 150, "Repaire de Sphincter Cell (donjon des Rats du Château d'Amakna) [5,-8]"),
    boss("etp-kimbo", "Kimbo", 160, "Canopée du Kimbo [-54,16]"),
    boss("etp-ougah", "Ougah", 180, "Temple du Grand Ougah [-18,28]"),
    boss("etp-merkator", "Merkator", 200, "Aquadôme de Merkator [21,18]"),
    boss("etp-kralamoure-geant", "Kralamoure Géant", 180, "Antre du Kralamoure Géant [-60,-8]"),
  ]),
};
