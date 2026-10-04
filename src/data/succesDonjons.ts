// Défi spécial de chaque boss de donjon (un par boss, ajouté avec la refonte des challenges de Dofus 2.68).
// Source : liste des nouveaux succès de donjon de Gamosaurus, descriptions reformulées.
// Tranches de niveau pour la page Profil.

export const TRANCHES = ["0 à 50", "50 à 100", "100 à 150", "150 à 200", "200 et plus"] as const;
export type Tranche = (typeof TRANCHES)[number];
export type SuccesBoss = { id: string; boss: string; tranche: Tranche; description: string; alias?: string[] };

const s = (boss: string, tranche: Tranche, description: string, alias?: string[]): SuccesBoss => ({
  id: `special:${normaliser(boss).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  boss,
  tranche,
  description,
  alias,
});

/** Nom simplifié pour comparer : sans accents, sans parenthèses, sans article en tête. */
export function normaliser(nom: string): string {
  return nom
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/^(le |la |l')/, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const SUCCES_BOSS: SuccesBoss[] = [
  // 0 à 50
  s("Kardorim", "0 à 50", "Kardorim ne doit jamais finir son tour au contact d'un combattant, et les Kardoribs ne doivent être ni touchés ni déplacés."),
  s("Tournesol Affamé", "0 à 50", "Achever chaque invocation du Tournesol avant le début de son deuxième tour."),
  s("Mob l'Éponge", "0 à 50", "À partir du tour 2, déplacer Mob l'Éponge au moins une fois par tour global."),
  s("Bouftou Royal", "0 à 50", "Aucun ennemi ne doit être soigné."),
  s("Boostache", "0 à 50", "N'achever aucun Ashi-magari de tout le combat."),
  s("Scarabosse Doré", "0 à 50", "Ne jamais toucher les invocations ennemies."),
  s("Chafer Rōnin", "0 à 50", "Aucune illusion du Chafer Rōnin ne doit rester en jeu au début de son tour."),
  s("Batofu", "0 à 50", "Être aligné avec un ennemi au moment de lui infliger des dégâts."),
  s("Kankreblath", "0 à 50", "Ne pas finir son tour aligné avec une autre entité."),
  s("Directeur Grunob", "0 à 50", "Aucun ennemi ne doit profiter du passif « Travail d'équipe »."),
  s("Bworkette", "0 à 50", "Seuls les combattants insoignables peuvent achever les ennemis."),
  s("Coffre des Forgerons", "0 à 50", "Achever les ennemis seulement une fois le Coffre sous la moitié de sa vie ; échec s'il meurt avant."),
  s("Corailleur Magistral", "0 à 50", "À partir du tour 2, commencer son tour au contact du Corailleur ; échec s'il meurt avant."),
  s("Kwakwa", "0 à 50", "Les ennemis ne doivent subir aucun dégât de poussée."),
  s("Shin Larve", "0 à 50", "Sous l'effet « Enlisement », ne frapper que le Shin Larve."),
  s("Rakoopeur", "0 à 50", "Ne jamais commencer son tour avec plus de deux faiblesses élémentaires différentes."),
  // 50 à 100
  s("Blops Royaux", "50 à 100", "Ne jamais toucher les invocations ennemies."),
  s("Kanniboul Ebil", "50 à 100", "Aucun ennemi ne doit être soigné."),
  s("Gelées Royales", "50 à 100", "Ne jamais toucher les invocations ennemies."),
  s("Wa Wabbit", "50 à 100", "Tant qu'une cawotte est en jeu, seul le Wa Wabbit peut subir des dégâts."),
  s("Craqueleur Légendaire", "50 à 100", "Les invocations ennemies ne doivent infliger aucun dégât."),
  s("Gourlo le Terrible", "50 à 100", "Chaque ennemi doit subir au moins une fois l'effet d'un tonneau."),
  s("Nelween", "50 à 100", "N'avoir aucun allié à 3 cases ou moins au moment de frapper un ennemi."),
  s("Draegnerys", "50 à 100", "N'achever les ennemis que si au moins l'un d'eux est « Intrépide »."),
  s("Mantiscore", "50 à 100", "Le Mantiscore ne doit subir aucun dégât à distance."),
  s("Wa Wobot", "50 à 100", "Les alliés ne doivent subir aucun dégât de poussée."),
  s("Chouque", "50 à 100", "Quand le Chouque échange sa place avec un de ses alliés, achever ce dernier en moins de deux tours."),
  s("Abraknyde Ancestral", "50 à 100", "N'avoir aucun ennemi à 3 cases ou moins au moment de frapper un ennemi."),
  s("Choudini", "50 à 100", "Si un ennemi déplace un allié, déplacer cet ennemi avant son prochain tour."),
  s("Reine Nyée", "50 à 100", "Achever chaque Œuf invoqué par la Reine Nyée avant son prochain tour."),
  // 100 à 150
  s("Dragon Cochon", "100 à 150", "Les alliés ne doivent subir aucun dégât de poussée."),
  s("Koulosse", "100 à 150", "Aucun allié ne doit être transformé en boufcool."),
  s("Meulou", "100 à 150", "Un même allié ne peut pas attaquer un ennemi plus de trois fois par tour."),
  s("Kharnozor", "100 à 150", "Au début de leur tour, les ennemis doivent avoir au moins un allié en ligne de vue."),
  s("Malléfisk", "100 à 150", "Achever Malléfisk en dernier."),
  s("Moon", "100 à 150", "Le Darkli Moon et les Totems ne doivent jamais subir de dégâts."),
  s("Maître des Pantins", "100 à 150", "Achever les marionnettes dans l'ordre imposé."),
  s("Rasboul Majeur", "100 à 150", "Jamais plus de 2 rasbouls mineurs en jeu au début du tour du boss.", ["Silf le Rasboul Majeur"]),
  s("Rat Blanc", "100 à 150", "Chaque ennemi doit subir des dégâts au moins une fois par tour global."),
  s("Rat Noir", "100 à 150", "Ne pas toucher le Rat Noir avant d'avoir achevé tous les autres ennemis."),
  s("Maître Corbac", "100 à 150", "À la fin du tour de chaque allié, un ennemi doit se trouver à 5 cases de lui."),
  s("Damadrya", "100 à 150", "Un allié ne doit pas subir plus d'une explosion de Bourgeon."),
  s("Pounicheur", "100 à 150", "Chaque pupuce ne doit pas changer d'état plus d'une fois par tour global."),
  s("Minotoror", "100 à 150", "Ne pas toucher le Minotoror tant qu'un de ses tofus est en jeu."),
  s("Royalmouth", "100 à 150", "Après avoir déplacé un ennemi, ne plus le frapper pendant le reste de son tour."),
  s("Skeunk", "100 à 150", "Achever les poupées dans l'ordre désigné ; Skeunk ne doit pas être touché avant."),
  s("Tofu Royal", "100 à 150", "Un ennemi doit avoir été immobilisé pendant un tour (aucun PM utilisé) avant d'être achevé."),
  s("Fraktale", "100 à 150", "Les ennemis ne doivent pas se blesser entre eux."),
  s("Blop Multicolore Royal", "100 à 150", "Concentrer toutes les attaques sur le Blop Multicolore Royal jusqu'à sa mort."),
  s("Crocabulia", "100 à 150", "Achever les coquilles avant leur troisième tour, sans qu'aucun allié ne subisse leur explosion."),
  s("Capitaine Ékarlatte", "100 à 150", "Finir chaque tour sur sa case de début de combat."),
  s("El Piko", "100 à 150", "Ne jamais blesser un allié avec le sort « Guerillero »."),
  s("Haute Truche", "100 à 150", "Déplacer un ennemi avant chaque attaque contre lui."),
  s("Nagate", "100 à 150", "Les bonbombres ne doivent subir aucun dégât."),
  s("Chêne Mou", "100 à 150", "Finir son tour aligné avec un ennemi."),
  s("Tanukouï San", "100 à 150", "Un ennemi ne doit pas être déplacé plus d'une fois avant son tour."),
  s("Tynril", "100 à 150", "Les ennemis ne doivent jamais être déplacés."),
  s("Mansot Royal", "100 à 150", "Seul le combattant désigné par le Mansot Royal à chaque début de tour peut être soigné."),
  s("Founoroshi", "100 à 150", "Aucun feu ne doit se rallumer."),
  s("Hanshi et Shihan", "100 à 150", "Frapper au contact les ennemis maîtrisant le Wukin, et à distance ceux du Wukang.", ["Hanshi"]),
  s("Sphincter Cell", "100 à 150", "Aucun allié ne doit subir le sort « Kawabunga »."),
  s("Ben le Ripate", "100 à 150", "Les alliés ne doivent subir aucun dégât d'un Hamrack."),
  s("Phossile", "100 à 150", "Ne finir son tour ni en diagonale d'un ennemi, ni en diagonale d'un allié."),
  s("Hell Mina", "100 à 150", "Infliger les dégâts correspondant à l'état imposé par Hell Mina."),
  // 150 à 200
  s("Kimbo", "150 à 200", "Chaque ennemi doit subir le glyphe du Disciple du Kimbo avant d'être touché."),
  s("Minotot", "150 à 200", "Aucun combattant ne doit subir l'effet « Destinos »."),
  s("Obsidiantre", "150 à 200", "Les ennemis ne doivent être ni attirés ni poussés."),
  s("Kanigroula", "150 à 200", "Les ennemis ne doivent subir que des dégâts au contact."),
  s("Ush Galesh", "150 à 200", "Ne jamais attaquer deux fois le même ennemi dans un même tour."),
  s("Shogun Tofugawa", "150 à 200", "Seul le boss peut subir la lanterne."),
  s("Tengu Givrefoux", "150 à 200", "Finir son tour à plus de 4 cases de tous ses alliés."),
  s("Fuji Givrefoux Nourricière", "150 à 200", "Ne jamais finir son tour aligné avec un ennemi.", ["Fuji Givrefoux"]),
  s("XLII", "150 à 200", "Achever tous les ennemis avant la vague suivante."),
  s("Père Ver", "150 à 200", "Finir son tour en diagonale d'un ennemi."),
  s("Koumiho", "150 à 200", "Ne pas utiliser le sort « Lanterne des Spiritueurs »."),
  s("Bworker", "150 à 200", "Ne jamais déplacer d'ennemi ni lui retirer de PA, de PM ou de portée."),
  s("Ougah", "150 à 200", "Ne finir son tour ni aligné ni en diagonale d'un ennemi."),
  s("Kralamoure Géant", "150 à 200", "Ne jamais finir son tour aligné avec un allié."),
  s("Korriandre", "150 à 200", "Finir son tour à plus de 3 cases de tout allié."),
  s("Toxoliath", "150 à 200", "Achever Toxoliath en dernier."),
  s("Kolosso", "150 à 200", "Ne jamais être soigné."),
  s("Glourséleste", "150 à 200", "Ne jamais subir de poussée."),
  s("Grollum", "150 à 200", "Ne pas déplacer les ennemis sous Zombi."),
  s("Ombre", "150 à 200", "Achever Ombre au contact de la silhouette et du Globilum."),
  s("Comte Razof", "150 à 200", "Aucune invocation alliée ne doit être achevée par un ennemi."),
  s("Barbéryl Clochecuivre", "150 à 200", "Aucun ennemi ne doit atteindre l'état Nimpatience V."),
  s("Merkator", "150 à 200", "Commencer ou finir son tour aligné avec un ennemi."),
  s("Nileza", "150 à 200", "Aucun allié ne doit devenir pacifiste."),
  s("Sylargh", "150 à 200", "Les Zombis ne doivent infliger aucun dégât."),
  s("Klime", "150 à 200", "Aucun allié ne doit devenir pacifiste."),
  s("Missiz Frizz", "150 à 200", "Un seul ennemi peut être attiré ou poussé par tour."),
  s("Dantinéa", "150 à 200", "Chaque coquillage ne peut être touché que par le combattant qui lui est lié."),
  // 200 et plus
  s("Comte Harebourg", "200 et plus", "Ne jamais infliger de dégâts au contact."),
  s("Roi Nidas", "200 et plus", "Être aligné ou en diagonale pour infliger des dégâts."),
  s("Reine des Voleurs", "200 et plus", "Ne pas être soigné par les Bonbombes bleues."),
  s("Chaloeil", "200 et plus", "Finir chaque tour sur une case du même numéro et de la même couleur que sa case de départ."),
  s("Capitaine Meno", "200 et plus", "Finir son tour aligné avec un combattant."),
  s("Tal Kasha", "200 et plus", "Un ennemi déjà ressuscité ne doit pas l'être une seconde fois."),
  s("Anerice", "200 et plus", "Chaque combattant doit être goulifié au moins une fois."),
  s("Ilyzaelle", "200 et plus", "Terminer le combat avant la troisième vague."),
  s("Dazak Martegel", "200 et plus", "Aucun ennemi ne doit atteindre la Nimpatience III."),
  s("Torkélonia", "200 et plus", "Achever chaque ennemi dans une phase différente."),
  s("Misère", "200 et plus", "Achever Misère en premier, en état Collecte à chaque tour."),
  s("Guerre", "200 et plus", "N'achever ni déplacer aucune arme de Guerre."),
  s("Protozorreur", "200 et plus", "Achever la malamibe avant chacun de ses tours."),
  s("Vortex", "200 et plus", "Achever tous les ennemis à la même heure."),
  s("Koutoulou", "200 et plus", "Entre deux tours du boss, faire échanger de place un ennemi et un allié au moins une fois."),
  s("Bethel Akarna", "200 et plus", "Aucun ennemi ne doit passer en état Necronyx avant la mort de Bethel."),
  s("Solar", "200 et plus", "Aucun ennemi ne doit passer en état Necronyx avant la mort de Solar."),
  s("Corruption", "200 et plus", "Seuls les alliés sans maladie peuvent infliger des dégâts."),
  s("Servitude", "200 et plus", "Ne pas tuer les Armécréantes."),
  s("Roi Imagami", "200 et plus", "Les alliés doivent achever la Reine Amirukam invoquée avant sa phase Lotus."),
  s("Reine Amirukam", "200 et plus", "Les alliés doivent achever le Roi Imagami invoqué avant sa phase Lotus."),
  s("Kabahal", "200 et plus", "Achever les ennemis uniquement avec les bras."),
  s("L'Éternel Conflit", "200 et plus", "Ne pas achever les invocations de l'Éternel Conflit."),
  s("Belladone", "200 et plus", "L'allié désigné par Belladone doit être dans sa ligne de vue au début de son tour ; échec s'il meurt."),
];

const PAR_NOM = new Map<string, SuccesBoss>();
for (const x of SUCCES_BOSS) {
  PAR_NOM.set(normaliser(x.boss), x);
  for (const a of x.alias ?? []) PAR_NOM.set(normaliser(a), x);
}

/** Défi spécial du boss d'une étape, d'après son nom (« Chouque », « Blops Royaux (Coco, …) », etc.). */
export function succesDuBoss(nomEtape: string): SuccesBoss | undefined {
  return PAR_NOM.get(normaliser(nomEtape));
}

export const SUCCES_PAR_ID = new Map(SUCCES_BOSS.map((x) => [x.id, x]));
