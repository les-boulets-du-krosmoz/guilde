// ---------- Avis de recherche ----------
// Liste, récompenses et protections : page « Avis de recherche » de Dofus pour les Noobs (octobre 2026).
// Milice de chaque avis : JeuxOnLine (Astrub, Amakna, Justiciers, Sufokia, Saharach, Dimensions divines),
// récompense en kamas de glace (Frigost) ou en alitons (Bonta et Brâkmar).
// Ganos est rangé en Osavora par élimination : c'est la seule milice de la liste DPLN sans autre avis.
// Niveau requis, zone et stratégie : renseignés avis par avis (pages DPLN). Les stratégies sont
// résumées avec nos propres mots : les textes de DPLN ne doivent pas être copiés.

export type Protection = "Invulnérable" | "Invulnérable à distance" | "Réduction armes" | "Réduction en mêlée" | "Réduction à distance";

export type Region = { id: string; nom: string };

export const REGIONS: Region[] = [
  { id: "astrub", nom: "Astrub" },
  { id: "amakna", nom: "Château d'Amakna" },
  { id: "justiciers", nom: "Base des Justiciers" },
  { id: "sufokia", nom: "Sufokia" },
  { id: "saharach", nom: "Saharach" },
  { id: "frigost", nom: "Frigost" },
  { id: "enutrosor", nom: "Enutrosor" },
  { id: "srambad", nom: "Srambad" },
  { id: "xelorium", nom: "Xélorium" },
  { id: "ecaflipus", nom: "Ecaflipus" },
  { id: "osavora", nom: "Osavora" },
  { id: "alignement", nom: "Bonta et Brâkmar" },
];

export type Avis = {
  id: string;
  nom: string;
  region: string;
  /** Avitons gagnés en livrant l'avis (anciennement appelés doplons). */
  avitons?: number;
  kamasGlace?: number;
  alitons?: number;
  protection?: Protection;
  /** Page DPLN ; absent quand le guide n'existe pas encore. */
  page?: string;
  /** Niveau minimum pour prendre l'avis. */
  niveau?: number;
  /** Avis d'alignement : niveau d'alignement minimum (champ « niveau de la quête d'alignement » de la fiche). */
  alignementMin?: number;
  /** Avis d'alignement : rang minimum dans l'ordre (1 à 5). */
  ordreMin?: number;
  /** Où le recherché apparaît. */
  zone?: string;
  /** Où prendre l'avis et où le livrer. */
  milice?: string;
  /** Ce qu'il faut pour atteindre la zone (objets, quêtes), une idée par ligne. */
  acces?: string[];
  /** Résumé du combat, une idée par ligne. */
  strategie?: string[];
};

type Options = { kg?: number; p?: Protection; page?: string | null; align?: number; ordre?: number };

/** Détails connus, avis par avis. Les autres avis n'ont encore ni niveau ni stratégie. */
const ASTRUB = "Milice d'Astrub [5,-19], prison au sous-sol";
const CHATEAU = "Milice du château d'Amakna [5,-6], prison au sous-sol";

const JUSTICIERS = "Base des Justiciers [4,4], sous le dojo";
const SUFOKIA = "Entrée des Profondeurs de Sufokia [23,26], par le bassin en [23,24]";
const SAHARACH = "Sabloon de Saharach [15,-57], livraison au bureau du Shérif [15,-56]";
const ENUTROSOR = "Avant-poste des Voyageurs d'Enutrosor [-1,-1], livraison à la Tour des Voyageurs [-22,-24]";
const SRAMBAD = "Avant-poste des Voyageurs de Srambad [2,2], livraison à la Tour des Voyageurs [-22,-24]";
const XELORIUM = "Avant-poste des Voyageurs du Xélorium [1,6], livraison à la Tour des Voyageurs [-22,-24]";
const ACCES_ENUTROSOR = "Avoir l'accès à Enutrosor.";
const ACCES_SRAMBAD = "Avoir l'accès à Srambad.";
const ACCES_XELORIUM = "Avoir l'accès au Xélorium.";
const ACCES_ECAFLIPUS = "Avoir l'accès à Ecaflipus.";
const ACCES_OSAVORA = "Avoir l'accès à Osavora.";
const OSAVORA = "Avant-poste des Voyageurs d'Osavora [1,17], livraison à la Tour des Voyageurs [-22,-24]";
const BOURGADE = "Milice de la Bourgade de Frigost [-76,-42]";
const VILLAGE = "Pancartes au-dessus de la milice ensevelie [-75,-74] ; livraison à Lesson [-76,-74] de 8 h à 20 h, à Baka Laïve [-75,-74] de 20 h à 8 h";
const ALIGN = "Milice de Brâkmar [-25,33], 1er étage à gauche, ou de Bonta [-32,-57], salle en haut à gauche puis salle du haut ; livraison à Lobo Tommy (Brâkmar) ou Fée Valentine (Bonta)";
const FRIGOST3 = "Milice du château de Harebourg, dans la tour à gauche du zaap [-68,-76] ; livraison au Baron d'Ouillard, devant la tour";
const MARCHEURS = "Avoir lancé la quête « Les marcheurs blancs » auprès du Baron d'Ouillard, devant la tour en [-68,-76].";

const DETAILS: Record<string, Pick<Avis, "niveau" | "zone" | "milice" | "acces" | "strategie">> = {
  // ---------- Astrub ----------
  "fouduglen-l-ecureuil": {
    niveau: 10, zone: "Cité d'Astrub", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable.",
      "Il devient invisible 3 tours. Encerclez-le dès le premier tour : il ne peut ni se téléporter ni pousser, donc il reste en place.",
      "Son coup retire l'état invulnérable de vos personnages.",
    ],
  },
  "frakacia-leukocytine": {
    niveau: 20, zone: "Forêt d'Astrub", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable. Tant qu'elle est en vie, vos personnages ont 2 PA de moins.",
      "Aux tours 2, 5, 8…, elle rend pacifistes les personnages à 6 cases ou moins et réduit de 4 tours les effets des autres : éloignez-vous le tour d'avant.",
      "Son coup au contact retire 20 % de résistances neutre et terre pendant 2 tours.",
    ],
  },
  "ogivol-scalarcin": {
    niveau: 41, zone: "Bordure de Brâkmar", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable, mais il esquive tous les coups au corps à corps en reculant : frappez-le uniquement à distance.",
      "Ses sorts portent à 4 cases : restez à 9 cases de lui, 10 quand il est invisible car il gagne 1 PM.",
      "Il peut devenir invisible 3 tours et invoquer un double qui ne frappe pas.",
    ],
  },
  "brumen-tinctorias": {
    niveau: 40, zone: "Désolation de Sidimote, Landes de Sidimote", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable, peu dangereux.",
      "Pendant tout le combat, chaque PA utilisé vous coûte 1 PV.",
      "Il soigne son groupe et donne 2 PA aux monstres proches : tuez-le en premier.",
    ],
  },
  "marzwel-le-gobelin": {
    niveau: 40, zone: "Massif de Cania, Plaines de Cania", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable. Vos personnages ont 10 tacle de moins : il fuit facilement.",
      "Il frappe jusqu'à 13 cases et retire 300 de puissance pour un tour.",
      "De près, il vole 1 PM et repousse de 2 cases.",
    ],
  },
  "aermyne-braco-scalptaras": {
    niveau: 60, zone: "Forêt de Kaliptus, Montagne des Koalaks", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable.",
      "À partir de son 2e tour, chaque tentative de retrait lui donne 4 PA ou 3 PM, sans limite : ne lui retirez rien.",
      "Elle soigne et renforce ses alliés : tuez-la vite.",
      "Au contact, elle frappe fort et repousse de 3 cases.",
    ],
  },
  "musha-l-oni": {
    niveau: 60, zone: "Baie de Cania", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable, mais 90 % de résistance partout sauf en eau (0 %) : venez avec un personnage eau.",
      "Sa faiblesse est peut-être variable d'un combat à l'autre (à confirmer).",
      "Il révèle les invisibles à chaque tour.",
      "Il désenvoûte, retire de la portée et échange sa place avec vous.",
    ],
  },
  "qil-bil": {
    niveau: 50, zone: "Cimetière des Torturés, Brâkmar", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable.",
      "Chaque poussée ou tentative de retrait de PM lui donne un bouclier de 10 % de ses PV restants : ne le poussez pas, ne lui retirez pas de PM.",
      "Les pièges et glyphes le renforcent : évitez-les.",
      "Il frappe de près, retire des PA et repousse tout ce qui est à son contact.",
    ],
  },
  "rok-gnorok": {
    niveau: 70, zone: "Lacs enchantés, Montagne des Koalaks", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable. Il gagne 20 de puissance à chaque tour, sans limite : ne faites pas durer le combat.",
      "Il ne frappe qu'au contact et en zone : à 9 cases de lui au début de son tour, vous êtes à l'abri.",
      "Deux tours sur trois, il réduit les dégâts reçus : désenvoûtez-le si vous pouvez.",
    ],
  },
  "padgref-demoel": {
    niveau: 110, zone: "Bois de Litneg, Plaines de Cania", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable.",
      "Chaque coup reçu lui donne +100 dans les quatre éléments pendant 5 tours, une fois par tour.",
      "Dès le tour 3, puis tous les 2 tours, il frappe au corps à corps pour 30 % de sa vie max.",
      "Il échange sa place avec un monstre et attire de 5 cases : restez loin de lui et de son groupe.",
    ],
  },
  zatoishwan: {
    niveau: 130, zone: "Feudala, île de Pandala", milice: ASTRUB,
    strategie: [
      "Pas d'état invulnérable, mais il encaisse moins au corps à corps : frappez à distance.",
      "Au contact, il frappe très fort et repousse de 4 cases : à 8 cases de lui au début de son tour, vous êtes à l'abri.",
      "À partir du tour 3, puis tous les 4 tours, il se soigne, se renforce et renvoie une partie des dégâts.",
    ],
  },

  // ---------- Château d'Amakna ----------
  "tyranne-la-terrible": {
    niveau: 60, zone: "Forêt Sombre, Forêt des Abraknydes", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable. Chaque coup que vous lui portez vous fait échanger de place avec elle.",
      "Si vous subissez des dommages de poussée, vous êtes repoussé de 6 cases, et vos alliés à votre contact aussi.",
      "Ne restez pas groupés : elle gagne des dommages de poussée selon le nombre de personnages autour d'elle.",
      "Au contact, elle retire 4 PM.",
    ],
  },
  "carlita-de-l-aguerfelde": {
    niveau: 80, zone: "Hauts des Hurlements, Landes de Sidimote", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable. Tant qu'elle vit, chaque monstre du groupe a 2 000 PV de plus : tuez-la en premier.",
      "Elle pose jusqu'à 2 pièges d'une case par tour. Un piège retire 15 PM et met Pesanteur et Inébranlable pendant 2 tours : bougez le moins possible.",
      "Sur un personnage piégé, elle se jette au contact et frappe autour de 3 000.",
    ],
  },
  naganita: {
    niveau: 80, zone: "Île de Kartonpath", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable. Au début de son tour, les personnages à plus de 2 cases d'elle deviennent pacifistes : soyez à 2 cases ou moins à ce moment-là.",
      "Chaque tour, elle repousse de 6 cases ceux qui l'entourent : calez-vous contre un obstacle ou une invocation fixe.",
      "Elle se soigne de 200 PV par personnage ou invocation loin d'elle : n'invoquez pas à distance.",
    ],
  },
  trukipik: {
    niveau: 80, zone: "Jungle interdite, île de Moon", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable. Au début de son tour, les personnages à plus de 2 cases de lui deviennent pacifistes : soyez à 2 cases ou moins à ce moment-là.",
      "Chaque tour, il repousse de 6 cases ceux qui l'entourent : calez-vous contre un obstacle ou une invocation fixe.",
      "Il se soigne de 200 PV par personnage ou invocation loin de lui : n'invoquez pas à distance.",
    ],
  },
  "nenufor-tilotus": {
    niveau: 100, zone: "Tourbière sans fond, île d'Otomaï", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable.",
      "Tous les 2 tours, il invoque un Nufor qui se multiplie autour de lui, jusqu'à 12 : tuez le premier dès qu'il apparaît.",
      "Son sort de feu, qui retire 2 PM, se répète une fois par Nufor que vous avez en ligne de vue.",
      "Chaque tour, il pose un glyphe qui retire jusqu'à 6 PM, puis frappe au début de son tour suivant tout ce qui est à 4 cases ou moins : restez plus loin.",
    ],
  },
  "ali-grothor": {
    niveau: 110, zone: "Tourbière nauséabonde, île d'Otomaï", milice: CHATEAU,
    strategie: [
      "Il est invulnérable 2 tours sur 3. D'office, on ne peut le frapper qu'aux tours 1, 4, 7…",
      "Pendant ces tours, vos personnages ont « Grillade » : au début de son tour, chacun brûle de 500 PV et en inflige autant à tout ce qui est à 2 cases ou moins. Gardez plus de 2 cases entre vous.",
      "Un personnage sous Grillade qui commence son tour à 2 cases ou moins d'Ali lui retire l'invulnérabilité.",
      "Un soigneur qui joue en dernier retire l'état Foudroyé, qui renforce ses sorts contre vous.",
      "Ne lui retirez pas de portée : chaque tentative lui donne 1 PM.",
    ],
  },
  fojumo: {
    niveau: 120, zone: "Cirque de Cania, Plaines de Cania", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable. Il invoque un double par personnage dans le combat : inutile de tous les tuer, ils disparaissent à la mort du vrai Fojumo.",
      "Tous les 4 tours, il pose un grand glyphe qui rend invisibles et intaclables les monstres qui s'y trouvent.",
      "Les doubles posent une marque au contact : le personnage marqué prend beaucoup plus cher au coup suivant du vrai Fojumo.",
      "Il échange sa place avec un allié et leur donne 100 de puissance et 2 PM à tous les deux.",
    ],
  },
  "anatak-diskedor": {
    niveau: 140, zone: "Dents de Pierre, Plaines de Cania", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable. Il se renforce sur un cycle de 4 tours : +500 de puissance au tour 1, +1 000 de puissance et des critiques au tour 2.",
      "Aux tours 3, 7, 11…, il peut tuer d'un coup, au contact, un personnage Foudroyé (touché par son coup au contact les tours précédents) : éloignez ce personnage de lui.",
      "Il se téléporte vers sa cible : même loin, un personnage Foudroyé n'est pas à l'abri.",
      "Son attaque en zone autour de lui rend insoignable : ne restez pas groupés.",
    ],
  },
  "le-guerrier-du-ko": {
    niveau: 160, zone: "Mont Torrideau, île de Frigost", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable, mais il a trois façons de tuer d'un coup.",
      "Quand vous frappez un monstre, vos personnages alignés ou en diagonale avec ce monstre meurent : vérifiez les lignes avant chaque attaque et jouez à distance.",
      "Chaque tour, il tue les personnages alignés avec lui qui ont 50 % de leurs PV ou moins : restez au-dessus de la moitié.",
      "Chaque tour, il marque un personnage : si celui-ci finit son tour avec un monstre à 6 cases ou moins, il meurt. Éloignez-le de tous les monstres.",
    ],
  },
  "le-shushu-debruk-sayl": {
    niveau: 160, zone: "Gisgoul, Landes de Sidimote", milice: CHATEAU,
    strategie: [
      "Il est invulnérable en permanence. Il ne devient vulnérable, pendant 2 tours, qu'en lançant un sort à 16 PA, alors qu'il n'en a que 11.",
      "Au début de son tour, il vole 3 PA à chaque personnage ou invocation à 3 cases ou moins : placez exactement 2 invocations près de lui pour qu'il monte à 17 PA.",
      "À 20 PA ou plus, il se soigne entièrement : jamais plus de 2 voleurs de PA à côté de lui, et éloignez-les ensuite.",
      "S'il atteint quand même 20 PA, rendez-le insoignable.",
      "Ses sorts frappent en croix et en diagonale : ne restez pas alignés entre vous.",
    ],
  },
  predagob: {
    niveau: 170, zone: "Nimotopia", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable, mais il redevient invisible à chaque début de tour. Le frapper le révèle jusqu'à son tour suivant : utilisez des sorts de zone pour le trouver.",
      "Une fois trouvé, éloignez-le à 10 cases d'un personnage : au tour suivant, il viendra au contact de celui-ci et sera facile à retrouver.",
      "Chaque tour, il pose une mine sur un personnage. En fin de tour, elle frappe fort et retire des PA à tous ceux à 3 cases ou moins : isolez ce personnage.",
      "N'invoquez pas : il tue les invocations d'un coup et se soigne dessus. Évitez aussi la terre, il a 70 % de résistance.",
    ],
  },
  "le-grand-kongoku": {
    niveau: 180, zone: "Salles des Embruns, Baie de Sufokia", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable. Au tour 1, il invoque une Cocolune fixe : tant qu'elle est là, vous êtes sous Pesanteur. Inutile de la tuer, elle revient au tour suivant.",
      "Au début de son tour, la Cocolune attire tout le monde de 10 cases, puis rend pacifiste chaque personnage qu'elle voit : prévoyez de rester hors de sa vue après l'attraction.",
      "Entourez-la d'invocations fixes pour lui couper la vue. Si elle voit le Kongoku, il gagne 500 de puissance et 5 000 PV.",
      "Il se téléporte au contact et repousse de 20 cases : les états Inébranlable, Enraciné ou Indéplaçable aident beaucoup. Tuez-le en premier, de préférence en eau ou en air.",
    ],
  },
  simbadas: {
    niveau: 70, zone: "Route des Roulottes, Landes de Sidimote", milice: CHATEAU,
    strategie: [
      "Pas d'état invulnérable. Vos personnages ont 10 de portée en moins pendant tout le combat : prévoyez du corps à corps.",
      "Chaque mort dans votre équipe lui donne 4 PM et 400 de puissance, sans limite : gardez tout le monde en vie.",
    ],
  },

  // ---------- Base des Justiciers ----------
  "les-guman": {
    niveau: 10, zone: "Champ des Ingalsse, Amakna", milice: JUSTICIERS,
    strategie: [
      "Deux recherchés, Ambi Guman et son acolyte Exi Guman, sans état invulnérable.",
      "Chaque coup reçu donne à Ambi et à ses alliés 50 de puissance et 1 de portée : tuez-le en peu de coups, mais forts.",
      "À sa mort, Exi soigne entièrement ses alliés et leur donne 100 de puissance : tuez-le en dernier.",
      "Ambi fait apparaître une Citwouillette qui vole des PA et des caractéristiques autour d'elle : restez à plus de 3 cases, ou tuez-la tout de suite (130 PV).",
    ],
  },
  gadoo: {
    niveau: 40, zone: "Marécages sans fond, Montagne des Koalaks", milice: JUSTICIERS,
    strategie: [
      "Pas d'état invulnérable, mais les armes ne lui font rien et il a 100 % de résistance neutre : n'utilisez que des sorts.",
      "Évitez l'eau, qui le soigne de 100 PV par coup, et la terre : 40 % de résistance, et chaque coup le renforce. Le feu et l'air sont les meilleurs choix.",
      "Tous les 3 tours, il pose en croix un malus qui s'aggrave pendant 3 tours, jusqu'à vous faire passer votre tour : désenvoûtez vite le personnage touché et ne restez pas collés.",
      "Il ne peut être ni poussé ni porté.",
    ],
  },
  "amy-l-empoisonneuse": {
    niveau: 120, zone: "Jungle obscure, île d'Otomaï", milice: JUSTICIERS,
    strategie: [
      "Pas d'état invulnérable, mais elle renvoie 100 dommages par coup, et ses ronces 50. Elle a de grosses faiblesses dans tous les éléments : tuez-la vite, les sorts de vol de vie soignent bien.",
      "Aux tours 1, 7, 13…, elle enferme chaque personnage dans un carré de ronces et met Pesanteur. Percez-vous un chemin, et ne la laissez pas commencer son tour au contact de ronces : elle gagne un bouclier de 1 000 par ronce.",
      "Chaque tour, un personnage subit la moitié des dégâts infligés à Amy : protégez-le, ou acceptez de le sacrifier pour finir le combat.",
      "Son poison passe d'un personnage à ceux qui l'entourent : gardez au moins 3 cases entre vous.",
      "Chaque tentative de retrait de PA ou de PM lui donne un bouclier d'environ 1 600 : ne lui en retirez jamais.",
      "Quand un de vos personnages meurt, elle le remplace par un Abrakleur Sombre qui se bat contre vous.",
    ],
  },
  "l-hyperscampe": {
    niveau: 180, zone: "Salles des Abîmes, Base Abyssale (à côté du donjon de Merkator)", milice: JUSTICIERS,
    acces: [
      "La zone se traverse normalement avec des Piles Steamer.",
      "Sans Pile Steamer : prenez le grand ascenseur des Salles des Embruns, débloqué par la quête « Relevez les niveaux », puis revenez en arrière dans les Salles des Abîmes.",
    ],
    strategie: [
      "Il est invulnérable en permanence. Chaque tour, il pose 3 ou 4 glyphes bleus autour d'un personnage : il faut que 3 personnages finissent leur tour sur 3 glyphes différents pour qu'il soit vulnérable au tour suivant.",
      "Si un de vos personnages est mort, 2 glyphes suffisent ; si deux sont morts, un seul suffit. Des compagnons à sacrifier rendent le combat plus simple.",
      "Recommencez chaque tour, sinon il redevient invulnérable.",
      "Ne le mettez jamais sous Pesanteur : il ne pose plus de glyphes et redevient invulnérable.",
      "Restez loin des murs et des cases vides, sinon il pose moins de 3 glyphes et le tour est perdu.",
    ],
  },

  // ---------- Sufokia ----------
  buldalazred: {
    niveau: 180, zone: "Tréfonds des Trithons, Profondeurs de Sufokia", milice: SUFOKIA,
    acces: ["Grotte en [21,26] : il faut 1 Lest anti-tourbillon."],
    strategie: [
      "Pas d'état invulnérable et peu de résistances : concentrez-vous sur lui dès le premier tour.",
      "Il pose jusqu'à 2 pièges par tour. Un piège déclenché attire tout le monde de 3 cases vers lui et révèle un glyphe noir : un personnage qui commence ou finit son tour dedans meurt.",
      "Bougez peu, et gardez toujours 3 PM en réserve pour sortir du glyphe.",
      "Au début de son tour, il attire de 3 cases ceux qu'il voit : les états Indéplaçable, Inébranlable ou Enraciné protègent de toutes ces attirances.",
    ],
  },
  "le-homard-medali": {
    niveau: 180, zone: "Vestiges engloutis, Profondeurs de Sufokia", milice: SUFOKIA,
    acces: ["Porte en [23,27] : il faut 1 Volant hydraulique."],
    strategie: [
      "Il n'est pas invulnérable au départ, mais le devient quand il touche quelqu'un avec son coup à 2 à 5 cases. Un coup au contact lui retire l'invulnérabilité.",
      "Au début de son tour, il gagne 15 de puissance par personnage à plus de 3 cases de lui, sans limite.",
      "Première option, à distance : repoussez-le et retirez-lui des PM pour qu'il ne touche personne. À plus de 12 cases, vous êtes hors de sa portée.",
      "Seconde option, au contact : collez-le, frappez-le au contact en début de tour pour casser l'invulnérabilité, et tuez-le vite. Son coup au contact marque la cible, puis lui retire 20 % de ses PV au coup suivant.",
    ],
  },
  takomako: {
    niveau: 180, zone: "Abîme de R'lyugluglu, Profondeurs de Sufokia", milice: SUFOKIA,
    acces: ["Grotte en [26,26] : il faut 1 Statuette de Snedon."],
    strategie: [
      "Il devient invulnérable pour le tour si personne n'est à 5 cases ou moins de lui au début de son tour : gardez toujours quelqu'un près de lui, de préférence un tank.",
      "Il gagne 1 PM par tour, jusqu'à 10. Son coup porte à 10 cases sans ligne de vue et frappe d'autant plus fort qu'il lui reste de PM : tuez-le vite, ou retirez-lui tous ses PM d'un coup.",
      "Chaque coup fait monter la Folie. À 2, vos sorts touchent aussi vos alliés proches ; à 10, le personnage meurt. Elle baisse de 1 au début de chacun de vos tours.",
      "Il rend 2 personnages pacifistes et insoignables par tour, en ligne et avec ligne de vue : sortez de ses lignes.",
    ],
  },

  // ---------- Saharach ----------
  tournade: {
    niveau: 60, zone: "Dunes des ossements, Saharach", milice: SAHARACH,
    strategie: [
      "Pas d'état invulnérable. Elle ne frappe qu'à courte portée : repoussez-la, et elle ne pourra presque rien faire.",
      "Entre 6 et 8 cases, elle vous attire de 3 cases, vole 2 PM et retire 50 % de résistances.",
      "À 2 cases ou moins, elle rend pacifiste, retire 10 de portée et empoisonne : restez à 7 cases d'elle, moins si vous lui retirez des PM.",
      "Elle gagne 620 PV par personnage à 5 cases ou moins quand elle frappe : ne restez pas groupés. Frappez en eau.",
    ],
  },
  "le-roi-camole": {
    niveau: 110, zone: "Territoire Cacterre, Saharach", milice: SAHARACH,
    strategie: [
      "Pas d'état invulnérable. Ne le laissez pas vous frapper au contact : il repousse de 4 cases et devient invisible. Restez à plus de 7 cases.",
      "Il fait pousser des Cactrucs autour d'une cible. Un Cactruc frappé blesse ceux qui le touchent, et le Roi frappe aussi les personnages collés à un Cactruc : ne restez pas à leur contact.",
      "Au début de son tour, il gagne 8 de puissance par Cactruc présent : tuez-en un maximum avant son tour, ou concentrez-vous sur lui.",
    ],
  },
  "ka-youloud": {
    niveau: 150, zone: "Gorge des Vents Hurlants, Saharach", milice: SAHARACH,
    strategie: [
      "C'est l'un des avis les plus durs. Pas d'état invulnérable, mais son comportement change selon ses PV au début de son tour : au-dessus de 70 %, entre 41 et 70 %, puis 40 % ou moins.",
      "La méthode la plus simple est de lui retirer des PA. Tous ses sorts coûtent 3 PA et il esquive mal : à 2 PA, il ne peut plus rien faire.",
      "Au-dessus de 70 %, il frappe très fort à 5 cases autour de lui et retire jusqu'à 10 PM, 10 de portée et des résistances.",
      "Entre 41 et 70 %, il se soigne d'environ 1 200 PV deux fois par tour : rendez-le insoignable.",
      "À 40 % ou moins, il peut tuer d'un coup au contact un personnage touché par son attaque de zone : finissez-le vite.",
      "Il se téléporte de 5 cases deux fois par tour, mais Pesanteur l'en empêche. Il ne peut pas être porté, et tous ses malus se désenvoûtent. Dispersez-vous dès le placement.",
    ],
  },
  "le-khepricorne": {
    niveau: 180, zone: "Pyramide Maudite, Saharach", milice: SAHARACH,
    strategie: [
      "Il est invulnérable au départ. Frappez-le une fois, même pour 0 : il devient vulnérable pendant 3 tours à partir de son tour suivant. Faites-le tout de suite, car tant qu'il est invulnérable, il vous vole des caractéristiques à chaque coup.",
      "Une fois vulnérable, il invoque une Boule Puante et ne peut viser qu'elle : il la pousse sur 28 cases, frappe autour d'elle et attire les personnages vers elle. Restez loin de la Boule, et jamais aligné avec elle.",
      "Ne les séparez pas de plus de 10 cases, sinon il frappe tout le monde au début de son tour.",
      "À plus de 6 cases de lui, vous perdez 6 de portée et 3 PA, mais il ne peut rien vous faire. Frappez en eau ou en air.",
      "Ne restez pas collé aux Boulettes Puantes qu'il fait apparaître autour de vous.",
    ],
  },

  // ---------- Enutrosor ----------
  "la-maxi-malle": {
    niveau: 80, zone: "Creuset des Fortunés, Enutrosor", milice: ENUTROSOR, acces: [ACCES_ENUTROSOR],
    strategie: [
      "Pas d'état invulnérable.",
      "Chaque poussée lui donne 1 PM, sans limite : ne la poussez pas, retirez-lui plutôt des PM.",
      "Chaque coup qu'elle reçoit renforce son attaque au contact : frappez peu, mais fort, idéalement en un seul tour.",
      "Restez à distance : au contact, elle frappe autour d'elle, repousse et retire 200 de puissance. Elle vole aussi des PM et met Pesanteur en zone.",
    ],
  },
  aigripoil: {
    niveau: 130, zone: "Carrière Aurifère, Enutrosor", milice: ENUTROSOR, acces: [ACCES_ENUTROSOR],
    strategie: [
      "Pas d'état invulnérable, mais il tue d'un coup au contact, une fois tous les 3 tours.",
      "Il gagne 1 PM à chaque fin de tour, sans limite : tuez-le vite, en feu ou en eau.",
      "Il attire de 3 cases en ligne, jusqu'à 7 cases et avec ligne de vue : restez loin, hors de ses lignes, derrière un obstacle.",
      "Laissez-le tuer une invocation au contact : vous serez tranquilles pendant 3 tours.",
    ],
  },

  voldelor: {
    niveau: 180, zone: "Retraite des Éternels, Enutrosor", milice: ENUTROSOR, acces: [ACCES_ENUTROSOR],
    strategie: [
      "Pas d'état invulnérable. Quand on le frappe, il se marque pour 1 tour, et marque aussi le premier personnage qui l'a touché.",
      "Il tue d'un coup le personnage marqué s'il l'atteint avec son attaque de zone : avant son tour, éloignez ce personnage à plus de 9 cases.",
      "Il peut aussi échanger sa place avec le personnage marqué, à n'importe quelle distance. Un Pandawa qui porte ce personnage le protège des deux attaques.",
      "Éliminez d'abord les autres monstres sans le toucher. Ne restez pas groupés, car son attaque de zone le soigne. Frappez en eau ou en terre.",
    ],
  },

  // ---------- Srambad ----------
  panteroz: {
    niveau: 110, zone: "Ruelles des Eaux-Suaires, Srambad", milice: SRAMBAD, acces: [ACCES_SRAMBAD],
    strategie: [
      "Pas d'état invulnérable, mais elle ne subit presque rien à distance : il faut la frapper au contact. Elle combat toujours seule.",
      "Au début de son tour, elle rend silencieux les personnages à 2 cases ou moins et tue les invocations proches : frappez-la, puis éloignez-vous.",
      "Son coup au contact est très fort : soyez à plus de 8 cases d'elle au début de son tour.",
      "Ne l'érodez pas : une de ses attaques frappe à hauteur de la moitié de ses PV érodés.",
    ],
  },
  "la-mouchame": {
    niveau: 160, zone: "Catacombres, Srambad", milice: SRAMBAD, acces: [ACCES_SRAMBAD],
    strategie: [
      "Pas d'état invulnérable. Elle combat seule, mais invoque 7 doubles qui partagent tous les dégâts avec elle : frappez le groupe avec des sorts de zone.",
      "Tant qu'elles ont plus de la moitié de leurs PV, chaque coup reçu leur donne 50 de puissance.",
      "Sous la moitié, leur coup au contact tue la cible 3 tours plus tard : finissez vite, et restez à plus de 7 cases.",
    ],
  },
  gein: {
    niveau: 180, zone: "Hauts Ténébreux, Srambad", milice: SRAMBAD, acces: [ACCES_SRAMBAD],
    strategie: [
      "Il est invulnérable et invisible en permanence, sauf pendant son tour, et combat seul. S'il est encore en vie au tour 11, toute l'équipe meurt.",
      "Chaque invocation lancée devient un crâne fixe. Frapper un crâne rend Gein visible et vulnérable s'il est à 2 cases ou moins de ce crâne, le temps du tour du personnage qui frappe.",
      "À la fin de chaque tour, il se téléporte à la case symétrique par rapport au personnage qui joue ensuite, ou revient à sa case de départ si celle-ci est prise. Un crâne qui brille en bleu signale que Gein est à son contact.",
      "Le plus simple est de le coincer contre un crâne et de lui mettre Pesanteur : il ne bougera plus.",
      "Ne restez pas alignés avec les crânes, et éloignez-vous-en aux tours 3, 5, 7… Méfiez-vous de ses poisons, qui blessent à chaque PA ou PM utilisé.",
    ],
  },

  // ---------- Xélorium ----------
  morblok: {
    niveau: 100, zone: "Chemins d'hier, Xélorium", milice: XELORIUM, acces: [ACCES_XELORIUM],
    strategie: [
      "Pas d'état invulnérable, mais il réduit tous les dégâts reçus de 30 %.",
      "Il renvoie la moitié des dégâts qu'il reçoit à tout ce qui est à 2 cases ou moins de lui : restez plus loin.",
      "Chaque attaque punit l'attaquant et ses voisins selon l'élément : l'eau retire 1 PA, le feu raccourcit les effets, l'air retire 50 de puissance, la terre et le neutre renvoient la moitié des dégâts. Frappez en eau ou en feu, sans rester groupés.",
    ],
  },
  hin: {
    niveau: 150, zone: "Jour présent, Xélorium", milice: XELORIUM, acces: [ACCES_XELORIUM],
    strategie: [
      "Pas d'état invulnérable. À partir du tour 2, au début de son tour, il tue tout personnage à 10 cases ou plus de lui : restez à 9 cases ou moins.",
      "Son attaque de zone repousse de 3 cases et retire 3 PM, puis il s'éloigne : gardez assez de PM pour revenir à moins de 10 cases.",
      "Pendant tout le combat, chaque PM utilisé vous coûte des PV : bougez le moins possible.",
      "2 tours sur 4, chaque coup qu'il reçoit repousse l'attaquant de 3 cases et lui donne 1 PM, à lui : frappez peu de fois, mais fort.",
    ],
  },

  sicogne: {
    niveau: 180, zone: "Lendemains incertains, Xélorium", milice: XELORIUM, acces: [ACCES_XELORIUM],
    strategie: [
      "Pas d'état invulnérable : concentrez-vous sur lui et tuez-le vite, de préférence en feu.",
      "Si vous tentez de quitter son contact et que vous êtes taclé, vous mourez, ainsi que tous ceux qui sont à son contact. Ne fuyez que si la fuite est sûre à 100 %, et restez à distance.",
      "Le pousser, l'attirer, le téléporter ou échanger de place avec lui met fin à votre tour : faites-le en dernière action.",
      "Chaque monstre pose un glyphe sous lui. Entrer dedans vous fait échanger de place avec ce monstre ; celui de Sicogne met aussi fin à votre tour.",
      "Il tue toutes les invocations à chaque tour : inutile d'invoquer.",
    ],
  },

  // ---------- Osavora ----------
  ganos: {
    niveau: 180, zone: "Osavane, Osavora", milice: OSAVORA, acces: [ACCES_OSAVORA],
    strategie: [
      "Pas d'état invulnérable, mais plus le combat dure, plus il devient fort (dégâts, PM, tacle, fuite), jusqu'au tour 10 : tuez-le vite.",
      "Au début de son tour, il repousse de 20 cases le personnage aligné le plus proche : sortez de ses lignes, ou placez une invocation entre vous et lui.",
      "À 70 % puis à 30 % de ses PV, il change de phase et ne peut plus être frappé jusqu'à son tour suivant.",
      "En phase de chasse, il ne frappe qu'au contact : restez loin. En phase de repos, il frappe à distance : retirez-lui de la portée. En phase de naissance, son attaque dépend des PV qu'il a perdus et devient très dangereuse en fin de combat.",
      "Gardez-le à distance avec du retrait de PM et des sorts de placement.",
    ],
  },

  // ---------- Frigost, la Bourgade ----------
  bouflouth: {
    niveau: 100, zone: "Champs de glace, Frigost", milice: BOURGADE,
    strategie: [
      "Pas d'état invulnérable. Il ne frappe qu'au contact : à plus de 7 cases de lui, il ne vous touche jamais.",
      "À partir du tour 6, puis tous les 5 tours, il peut tuer d'un coup un personnage à son contact.",
      "Chaque poussée lui donne 1 PM : ne le poussez pas, sauf pour l'envoyer très loin.",
      "Méfiez-vous du Boufmouth légendaire s'il l'accompagne : il peut lui donner des PM ou vous pousser vers lui.",
    ],
  },
  "monsieur-pingouin": {
    niveau: 110, zone: "Lac gelé, Frigost", milice: BOURGADE,
    strategie: [
      "Pas d'état invulnérable. Au tour 1, vous ne pouvez pas bouger (Pesanteur et -100 PM) : profitez-en pour vous renforcer.",
      "Son coup au contact peut, au hasard, vous faire passer votre tour : restez à plus de 6 cases de lui.",
      "Il marque parfois un personnage, qui encaisse alors les dégâts de tous ses alliés à 6 cases ou moins : écartez-vous de lui s'il ne peut pas tanker.",
      "Méfiez-vous des pingouins qui l'accompagnent : certains lui donnent des PM ou échangent leur place avec vous.",
    ],
  },
  katigrou: {
    niveau: 120, zone: "Forêt des pins perdus, Frigost", milice: BOURGADE,
    strategie: [
      "Pas d'état invulnérable. Son coup au contact frappe plus fort à mesure qu'il perd des PV : une fois entamé, finissez-le vite et restez à plus de 6 cases.",
      "Il se téléporte au contact jusqu'à 12 cases : mettez-lui Pesanteur.",
      "Au début de son tour, il vole 1 PA à chaque personnage à son contact.",
      "L'érosion réduit la force de son coup au contact.",
    ],
  },

  fantomayte: {
    niveau: 130, zone: "Berceau d'Alma, Frigost", milice: BOURGADE,
    strategie: [
      "Pas d'état invulnérable, mais elle peut renvoyer les dégâts pendant 3 tours : désenvoûtez-la.",
      "Tout personnage poussé, attiré, téléporté ou qui échange sa place perd 100 de puissance pendant 2 tours. Ne déplacez pas vos alliés ; les états Inébranlable et Indéplaçable aident.",
      "Calez chaque personnage dans un coin, deux murs autour de lui : ses poussées ne le déplacent plus.",
      "Elle se téléporte jusqu'à 15 cases, frappe et repousse de 4 cases les personnages autour de son point d'arrivée.",
    ],
  },
  "vengeuse-masquee": {
    niveau: 140, zone: "Larmes d'Ouronigride, Frigost", milice: BOURGADE,
    strategie: [
      "Pas d'état invulnérable, mais 200 % de résistance neutre et eau (25 % en terre, feu et air, d'après les données du jeu) : frappez en terre, en feu ou en air.",
      "Chaque retrait de portée lui donne 50 % de résistances pendant 2 tours : ne lui en retirez pas pendant que vous la frappez.",
      "Elle frappe fort jusqu'à 15 cases, et très fort au contact en volant de la chance : restez à plus de 11 cases d'elle.",
      "Elle donne à tout son groupe dommages, PM, critiques et portée, presque sans interruption : désenvoûtez-la dès que possible.",
    ],
  },
  "le-yechti": {
    niveau: 150, zone: "Crevasse Perge, Frigost", milice: BOURGADE,
    strategie: [
      "Il est invulnérable en permanence. À partir du tour 2, il devient vulnérable pour 1 tour quand il tue d'un coup quelqu'un à son contact : offrez-lui une invocation.",
      "Il ne peut pas être porté. Une fois vulnérable, il se soigne de 800 PV et ne peut plus être poussé pendant ce tour.",
      "Méthode prudente sur deux tours : repoussez-le loin et placez une invocation près de lui, puis frappez au maximum quand il est vulnérable. Recommencez.",
      "Il se téléporte de 5 à 6 cases pour venir au contact : mettez-lui Pesanteur.",
      "Quand il est vulnérable, il frappe plus fort, dont une attaque qui touche toute l'équipe tous les 4 tours.",
    ],
  },
  "le-docteur-eggob": {
    niveau: 170, zone: "Forêt enneigée, île de Sakaï", milice: BOURGADE,
    strategie: [
      "Pas d'état invulnérable, mais 200 % de résistance neutre : n'utilisez pas le neutre.",
      "Il invoque un Œuf de la Mort au contact d'un personnage. L'Œuf attire ceux qui sont alignés avec lui, puis explose à son 2e tour et tue tout ce qui est à 4 cases ou moins. Ne restez jamais aligné avec un Œuf, ni à 4 cases ou moins.",
      "Ses Gobus explosent à leur 2e tour, avec un effet au hasard dans un rayon de 2 cases : éloignez-vous.",
      "Son attaque en ligne porte à l'infini, rend insoignable et empoisonne : retirez-lui des PM, ou faites-le tacler par un tank.",
      "Il rend un allié invulnérable pour 1 tour : désenvoûtez ce monstre.",
    ],
  },

  // ---------- Frigost, le Village enseveli ----------
  "fuji-givrefoux": {
    niveau: 150, zone: "Cavernes des Givrefoux, Frigost : dans la zone avant le donjon, pas en tant que boss du donjon. Givrihaltès, en [-80,-75], indique si elle est là.", milice: VILLAGE,
    strategie: [
      "Pas d'état invulnérable, mais une fois par tour elle tue d'un coup un personnage à son contact et le remplace par un monstre.",
      "Elle ne frappe qu'en diagonale, à 3 ou 4 cases : restez alignés avec elle, à plus de 5 cases.",
      "Chaque monstre tué lui donne 1 000 de dommages et 1 PM pour un tour : comptez ce PM en plus avant de tuer un monstre.",
      "Tous les personnages du combat l'obtiennent, même sans la quête, et gagnent 1 kama de glace.",
    ],
  },

  dremoan: {
    niveau: 160, zone: "Forêt pétrifiée, Frigost", milice: VILLAGE,
    strategie: [
      "Il est invulnérable tant qu'il n'a pas créé de Germe, ce qui n'arrive pas avant son tour 3. Ensuite, il reste vulnérable jusqu'à la fin.",
      "S'il est accompagné de monstres, tuez-en un seul : il le ressuscite, puis le change en Germe. S'il est seul, lancez une seule invocation, qu'il changera en Germe. N'en créez pas plus d'un, les Germes sont pénibles.",
      "Aux tours 3, 8, 13…, il immobilise toute l'équipe (Pesanteur, -100 PM). Il se désenvoûte à chaque tour.",
      "Frappez en feu, ses autres résistances sont fortes. Tuez-le vite, car il se soigne de 3 600 PV aux tours 6, 11 et 16.",
      "À sa mort, il tue tout ce qui est à 3 cases ou moins de lui, et chaque Germe tout ce qui est à 2 cases ou moins : écartez-vous avant le coup final.",
    ],
  },
  flasho: {
    niveau: 170, zone: "Crocs de verre, Frigost", milice: VILLAGE,
    strategie: [
      "Pas d'état invulnérable, mais au tour 7 il se soigne entièrement, revient à sa case de départ, désenvoûte tout le monde, tue les invocations et retire 4 PA. Tuez-le avant.",
      "Ne lui retirez ni PA ni PM et ne le poussez pas : il gagne des PM ou 300 de dommages.",
      "Les armes au contact ne le touchent jamais : il recule à chaque coup.",
      "Ne le rendez pas pacifiste : il s'en libère et frappe toute l'équipe.",
      "Il échange sa place avec une invocation fixe, jusqu'à 20 cases.",
    ],
  },
  "viti-glourson": {
    niveau: 170, zone: "Ruche des Gloursons, Frigost (dans la ruche, pas au Mont Torrideau)", milice: VILLAGE,
    strategie: [
      "Pas d'état invulnérable, mais chaque coup lui donne 30 % de résistance dans l'élément utilisé, pendant 2 tours. Frappez une seule fois par élément, avec vos plus gros sorts, et changez d'élément.",
      "Chaque désenvoûtement lui retire 30 % de résistance dans tous les éléments pendant 2 tours.",
      "Il ne peut être ni poussé ni déplacé. Ne lui retirez pas de PA : il renverrait des dégâts.",
      "Tous les 3 tours, il peut retirer tous les PA et PM d'un personnage pour 3 tours, de 5 à 20 cases : désenvoûtez le personnage touché.",
      "Chaque monstre tué lui donne 3 PA, et sa mort soigne entièrement les monstres restants : tuez-le en premier. Évitez de porter quoi que ce soit avec un Pandawa.",
    ],
  },

  // ---------- Frigost III ----------
  "le-chevalier-de-glace": {
    niveau: 180, zone: "Bastion des froides légions, Frigost III", milice: FRIGOST3, acces: [MARCHEURS],
    strategie: [
      "Pas invulnérable au départ, mais le pousser ou lui retirer des PA ou des PM le rend invulnérable pendant 2 tours. Les sorts du Pandawa pour porter et jeter ne déclenchent pas cet effet.",
      "Tout personnage qui subit des dommages de poussée meurt sur le coup : ne vous poussez jamais entre alliés, et méfiez-vous des Verglasseurs.",
      "Son attaque à 2 cases ou moins frappe très fort : restez à distance, ou bloquez-le au contact d'un tank.",
      "Il se téléporte de 5 cases tous les 4 tours et peut échanger sa place avec un monstre jusqu'à 14 cases : gardez les monstres loin de votre équipe.",
      "Frappez en eau ou en feu, ses faiblesses ; évitez la terre.",
    ],
  },
  "culbutoeuf": {
    niveau: 190, zone: "Tour de la Clepsydre, Frigost III", milice: FRIGOST3, acces: [MARCHEURS, "Pour entrer dans la Tour de la Clepsydre, avoir fait au moins une fois les donjons de Sylargh, Nileza, Klime et Missiz Frizz."],
    strategie: [
      "Pas d'état invulnérable, mais au contact il ne subit presque rien : frappez-le uniquement à distance, en terre ou en air.",
      "Toute l'équipe a 2 PM de moins pendant tout le combat, et personne ne peut être poussé ni attiré : prévoyez au moins 6 PM par personnage. Le Pandawa peut encore porter et jeter.",
      "Chaque échange de place ou téléportation retire 50 % de résistances au personnage, sans limite : évitez-les.",
      "Ne le laissez pas venir à votre contact : il frappe très fort autour de lui et retire PM, puissance et beaucoup d'érosion. Désenvoûtez les personnages touchés. Un tank peut le tacler.",
    ],
  },
  "glourdorak": {
    niveau: 180, zone: "Jardins d'Hiver, Frigost III", milice: FRIGOST3, acces: [MARCHEURS],
    strategie: [
      "Invulnérable en permanence. Chaque tour, il marque un personnage situé à 3 à 6 cases de lui : si ce personnage finit son tour à son contact, Glourdorak devient vulnérable jusqu'au tour suivant de ce personnage.",
      "Un même personnage ne peut pas être marqué deux tours de suite : laissez vos personnages les plus solides à 3 à 6 cases de lui, cachez les plus fragiles.",
      "Le personnage qui le rend vulnérable ne peut pas le frapper lui-même, sauf si un autre personnage marqué joue avant lui et le rend vulnérable à nouveau.",
      "Son coup au contact frappe extrêmement fort : prévoyez des résistances et des soins. Quand il est vulnérable, frappez fort puis repoussez-le à plus de 7 cases, hors de sa vue. Il ne peut pas être porté.",
      "Au tour 5, il désenvoûte toute l'équipe et tue les invocations.",
    ],
  },

  "mekamouth": {
    niveau: 180, zone: "Remparts à vent, Frigost III", milice: FRIGOST3, acces: [MARCHEURS],
    strategie: [
      "Invulnérable en permanence. Il devient vulnérable pour 1 tour s'il finit son tour dans un glyphe bleu en forme de croix, qu'il pose lui-même et qui reste jusqu'à la fin du combat.",
      "Le plus simple : bloquez-le dans un coin, entre deux murs et deux invocations fixes (Cawottes, arbres, bombes…). Il lancera ses glyphes sur elles et finira ses tours dans le glyphe qui le rend vulnérable. Tous les 6 tours, il tue une de ces invocations : remettez-en une.",
      "Ses glyphes ne se lancent qu'en ligne, mais sans ligne de vue : ne finissez jamais votre tour aligné avec lui.",
      "Toute l'équipe a 2 PA de moins pendant le combat, et chaque PM utilisé coûte des PV : bougez peu.",
      "Ses glyphes le soignent, lui donnent des résistances et beaucoup de PV : érodez-le au maximum et frappez en eau ou en air.",
    ],
  },

  "le-psikopompe": {
    niveau: 180, zone: "Tannerie Écarlate, Frigost III", milice: FRIGOST3, acces: [MARCHEURS],
    strategie: [
      "Invulnérable en permanence. Une tentative de retrait de PM le rend vulnérable pour 1 tour, mais lui donne aussi une portée énorme pendant 2 tours : placez-vous hors de sa vue avant de le faire.",
      "Un personnage touché par sa « Sentence » meurt s'il reçoit un soin dans les 2 tours qui suivent : vérifiez les effets avant chaque soin.",
      "Au début de son tour, chaque personnage blesse les alliés collés à lui : ne finissez jamais votre tour au contact d'un allié.",
      "Son coup au contact dépend de ses PV restants : restez loin tant qu'il est en pleine forme. Une fois vulnérable, il peut le lancer en ligne à n'importe quelle distance.",
      "Il ne peut ni se téléporter ni pousser : bloquez-le au contact d'un tank, ou dans un coin. Désenvoûtez son renvoi de sorts, et frappez en terre ou en feu.",
    ],
  },

  "comte-harebourg": {
    zone: "Donjon du Comte Harebourg, en haut de la Tour de la Clepsydre [-59,-88] : l'avis est le boss du donjon.", milice: FRIGOST3, acces: [MARCHEURS, "Niveau 180 ou plus (à confirmer).", "Pour entrer dans le donjon : avoir vaincu Nileza, Missiz Frizz, Klime et Sylargh (à confirmer), et avoir la clef du donjon.", "Au bout de la salle 4, parlez à Dorléans. La première fois, vous ne pouvez affronter le Comte que seul ; ensuite, vous pouvez aussi le combattre avec un de ses lieutenants de Frigost III (Nileza, Klime, Missiz Frizz ou Sylargh)."],
    strategie: [
      "Pendant tout le combat, vos sorts partent dans une autre direction (90°, 180° ou 270°) selon votre pourcentage de PV au début du tour ; chaque coup porté au contact décale encore de 90°. Le plus simple : jouez en ligne ou en diagonale de votre cible.",
      "Il n'est vulnérable que les tours pairs. Ces tours-là, le frapper le téléporte à la case symétrique par rapport à vous : s'il échange ainsi sa place avec quelqu'un, il devient vulnérable.",
      "Si la case symétrique est impossible (obstacle, hors de la carte), toute l'équipe meurt : vérifiez avant chaque coup. S'il échange sa place avec une de vos invocations, vos alliés à 3 cases de sa position de départ meurent.",
      "Au début de son tour, il pose une croix autour de lui, centre compris : tout personnage qui commence son tour dedans meurt.",
      "Tuez le Cycloïde en premier, puis les autres monstres. La première fois, gardez le Comte pour la fin, le temps de prendre en main les directions.",
    ],
  },

  // ---------- Bonta et Brâkmar ----------
  "sam-sagaz": {
    zone: "Prairies d'Astrub", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, niveau d'alignement 1 ou plus."],
    strategie: [
      "Invulnérable en permanence. Il invoque un Bolesh : tuez-le pendant qu'il est collé à Sam, qui devient vulnérable pour 2 tours.",
      "Ne tuez pas le Bolesh ailleurs : Sam ne le réinvoque que tous les 4 tours, et le Bolesh meurt de lui-même au bout de 4 tours.",
      "Sam ne frappe qu'au contact, ou en zone s'il a quelqu'un au contact : restez à plus de 6 cases de lui. Son invocation dévoile les personnages invisibles.",
    ],
  },

  "maitre-boulet": {
    zone: "Bord de la forêt maléfique, Amakna", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, niveau d'alignement 1 ou plus."],
    strategie: [
      "Pas d'état invulnérable. Toute l'équipe a 2 PM de moins pendant le combat.",
      "Ne lui retirez pas de PM : il gagnerait des PM et de la puissance.",
      "Il ne frappe qu'au contact : restez à plus de 6 cases de lui.",
      "Un personnage touché par son coup est blessé s'il reçoit un soin et perd 1 PM s'il est déplacé, pendant 1 tour.",
      "Tuez son Tournesol à chaque fois qu'il l'invoque. Frappez en neutre, sa faiblesse.",
    ],
  },

  "roub-ignolles": {
    zone: "Cimetière, Amakna", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, niveau d'alignement 10 ou plus."],
    strategie: [
      "Pas d'état invulnérable. Au début de chaque tour, il pose des bombes en diagonale juste à côté de lui, 4 au maximum.",
      "Une bombe explose quand on la tue, ou d'elle-même au bout de 4 tours. Plus elle est ancienne, plus son explosion est large, jusqu'à 3 cases autour d'elle : restez à plus de 3 cases des bombes.",
      "Il peut échanger sa place avec une bombe, qui explosera au tour suivant : s'il approche de votre équipe, tuez les bombes tant qu'elles sont jeunes, sans être collé à elles.",
      "Ne restez pas en diagonale juste à côté de lui : vous seriez blessé à la pose des bombes.",
    ],
  },

  "bouss-baybe": {
    zone: "Plaine des Porkass, Plaines de Cania", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, niveau d'alignement 10 ou plus."],
    strategie: [
      "Pas d'état invulnérable et peu dangereuse elle-même, mais elle donne à tous les monstres du combat 2 PA, 4 PM et 100 de puissance.",
      "Au début de son tour, elle attire de 2 cases tous les personnages alignés avec elle, en ligne ou en diagonale : finissez vos tours hors de ses lignes et diagonales, à distance.",
      "N'invoquez pas : tous les 2 tours, elle tue une invocation et la remplace par un Porkass renforcé.",
      "Ne restez pas groupés : son sort qui retire 200 de puissance et rend affaibli touche une petite croix.",
    ],
  },

  "nono-le-wobot": {
    zone: "Îlot de la Couronne, île des Wabbits", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 1 ou plus."],
    strategie: [
      "Pas d'état invulnérable, mais il réduit les dégâts reçus au contact et à l'arme : frappez-le à distance, avec des sorts.",
      "Son coup au contact retire 100 % de résistance neutre, cumulable : restez à plus de 4 cases de lui.",
      "Il frappe en zone à n'importe quelle distance, sans ligne de vue. S'il marque un personnage, cette attaque frappe plus fort sur lui et laisse une zone qui brûle autour : écartez-vous de ce personnage.",
      "Le personnage marqué dévoile les invisibles à 3 cases ou moins : si vous jouez invisible, restez loin de lui.",
    ],
  },

  "armada-l-invincible": {
    zone: "Arche d'Otomaï, île d'Otomaï", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 1 ou plus."],
    strategie: [
      "Elle et tous les monstres qui l'accompagnent sont invulnérables. Ils ne deviennent vulnérables qu'une fois Armada morte : concentrez-vous sur elle.",
      "Pour la rendre vulnérable 2 tours : placez un personnage à son contact, puis faites un coup critique ou frappez à l'arme avec n'importe quel personnage.",
      "Quand elle porte son effet de protection (2 tours, tous les 4 tours), la rendre vulnérable lui donne un gros bouclier et réduit les dégâts reçus : attendez la fin de cet effet.",
      "Méfiez-vous du Flib s'il l'accompagne : il peut rendre tous les monstres invisibles pendant 1 tour.",
    ],
  },

  "dragodingo": {
    zone: "Territoire des Dragodindes Sauvages, montagne des Koalaks", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 1 ou plus."],
    strategie: [
      "Pas d'état invulnérable. Chaque tour, elle change d'humeur au hasard : elle gagne de la fuite, de l'esquive PA/PM ou de la puissance, et ses sorts changent d'effet.",
      "Selon l'humeur, ses coups peuvent retirer des PM, rendre insoignable, éroder, affaiblir ou faire subir plus de dégâts.",
      "Elle a 15 PM et fuit loin : bloquez-la dans un coin ou faites-la tacler.",
      "Son souffle touche une ligne de 4 cases devant elle : ne restez pas alignés près d'elle.",
    ],
  },

  "degolas": {
    zone: "Chemin du Crâne, île de Moon", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 1 ou plus."],
    strategie: [
      "Pas d'état invulnérable. Presque tous ses sorts retirent ou volent de la portée : restez assez près de lui pour pouvoir le frapper quand même.",
      "Sa flèche en ligne touche plusieurs cases et repousse le premier personnage de 3 cases : ne restez pas alignés entre vous, sinon vous subissez aussi des dégâts de poussée.",
      "Aux tours 4, 7, 10…, il a beaucoup plus de chances de faire des coups critiques : prévoyez de quoi encaisser ces tours-là.",
    ],
  },

  "le-prince-marchand": {
    zone: "Territoire des Porcos, Amakna", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 2 ou plus."],
    strategie: [
      "Pas d'état invulnérable. Il ne frappe qu'au contact, en petite croix : restez à distance et ne restez pas collés entre vous.",
      "Chaque personnage touché par ce coup lui donne de la puissance et réduit les dégâts qu'il reçoit : qu'il ne touche qu'un personnage à la fois.",
      "Il se rapproche vite : il s'attire de 2 cases vers vous, attire aussi ceux qui sont autour, et vole des PA, des PM et de la portée.",
      "Régulièrement, il fait subir les dégâts maximum des monstres aux personnages proches de lui. Un personnage avec un état invulnérable qu'il touche perd 100 % de résistances.",
      "Ne frappez pas en neutre : il y résiste à 50 %.",
    ],
  },

  "gobrechaun": {
    zone: "Plaines herbeuses, île d'Otomaï", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 2 ou plus."],
    strategie: [
      "Les tours impairs, il esquive tous les coups au contact : frappez-le à distance. Les tours pairs, il est invulnérable à distance : frappez-le au contact.",
      "Chaque fois qu'un monstre est frappé, déplacé, désenvoûté ou visé par un retrait de PA, PM ou portée, il gagne un bonus au hasard pour 1 tour, parfois une invulnérabilité. Frappez-le avec peu de coups, mais forts.",
      "Vos personnages reçoivent de la même façon un malus au hasard quand ils subissent ces effets : tuez vite les monstres qui l'accompagnent.",
      "Son attaque à distance empoisonne selon les PM utilisés : touché, bougez peu ou désenvoûtez-vous.",
    ],
  },

  "la-vashkiwi": {
    zone: "Île du Minotoror", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 2 ou plus."],
    strategie: [
      "Pas d'état invulnérable, et elle ne frappe pas elle-même : ce sont ses Fontaines, invulnérables et fixes, qui blessent. Elle en pose une par tour, chacune disparaît au bout de 2 tours.",
      "Chaque Fontaine marque des cases jusqu'à 5 cases autour d'elle, qui blessent et retirent de la puissance : restez à plus de 5 cases des Fontaines.",
      "Au début de son tour, chaque personnage blesse aussi ses alliés à 2 cases ou moins : ne restez pas groupés.",
      "Ne retirez ni PA ni PM aux monstres qu'elle protège. Si elle se protège elle-même, désenvoûtez-la. Frappez en feu ou en eau.",
    ],
  },

  "jerart-dupaindur": {
    zone: "Terrdala, île de Pandala", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 2 ou plus."],
    strategie: [
      "Pas d'état invulnérable, mais les tours impairs il invoque une Bouteille qui lui donne 80 % de résistances partout tant qu'il est à 10 cases ou moins d'elle.",
      "Tuez chaque Bouteille le tour même où elle apparaît : il redevient frappable au tour pair suivant. Si elle survit, elle relance la protection et vous n'aurez jamais de tour pour le frapper.",
      "Autre méthode : collez-le contre un bord et bloquez toutes les cases autour de lui, au contact et en diagonale, avec des personnages ou des invocations fixes. Il ne pourra plus invoquer ; gardez ce placement aussi les tours pairs.",
      "Au début de leur tour, lui et ses Bouteilles attirent tout le monde de 4 cases. Tuez d'abord les monstres qui l'accompagnent.",
    ],
  },

  "sans-visage": {
    zone: "Dimension Obscure, Amakna", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, niveau d'alignement 80 ou plus (à confirmer)."],
    strategie: [
      "Il est invisible au début du combat, et le reste tant qu'on ne le frappe pas.",
      "Chaque personnage doit le toucher à chaque tour : un personnage qui ne le frappe pas lui donne des PV et de l'esquive PA/PM, sans limite.",
      "Si personne ne le frappe pendant un tour entier, il peut tuer d'un coup un personnage à 2 cases ou moins de lui : dans ce cas, éloignez-vous.",
      "Il invoque des Bak, invulnérables à distance. S'il commence son tour sur le glyphe d'un Bak, son attaque peut aussi tuer : éloignez-le des Bak ou tuez-les au contact (à confirmer).",
      "Évitez le neutre, qu'il résiste bien ; l'eau et l'air passent mieux (à confirmer).",
    ],
  },

  "darma": {
    zone: "Village de la Canopée, île d'Otomaï", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 3 ou plus."],
    strategie: [
      "Pas d'état invulnérable, mais les glyphes et les pièges ne lui font presque rien : frappez-la directement.",
      "Ses tours impairs, elle pose une zone autour de chaque monstre jusqu'à 3 cases : y commencer son tour blesse et retire 6 de portée. Avant ces tours-là, placez-vous à plus de 3 cases de tous les monstres.",
      "Ses tours pairs, elle blesse et retire 4 PA à tout personnage à plus de 3 cases d'un monstre. Avant ces tours-là, placez-vous à exactement 3 cases d'un monstre.",
      "Elle frappe aussi tout ce qui est à 2 cases ou moins de chaque monstre. Tous les 4 tours, elle rend son groupe invisible pendant 1 tour.",
      "Ne frappez pas en neutre : elle y résiste à 50 %.",
    ],
  },

  "mogligli": {
    zone: "Landes de Cania, plaines de Cania", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 3 ou plus."],
    strategie: [
      "Pas d'état invulnérable. Au début du combat, il invoque au hasard un compagnon invulnérable qui reste jusqu'à la fin : ignorez-le et concentrez-vous sur Mogligli.",
      "Si c'est Balours, restez à plus de 3 cases de lui (il retire PM et fuite et immobilise). Si c'est Bagarra, évitez son contact (il échange sa place avec vous). Mulibre se contente de protéger les monstres.",
      "Son attaque repousse de 6 cases tous les personnages alignés avec sa cible : ne restez pas alignés entre vous, surtout près d'un bord.",
      "Il frappe au contact et à courte portée, et dévoile les personnages invisibles.",
    ],
  },

  "glandaf-l-aigri": {
    zone: "Tronc de l'arbre Hakam, île d'Otomaï", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 3 ou plus."],
    strategie: [
      "Pas d'état invulnérable. Au début de son tour, il retire 2 PM aux personnages à 3 cases ou moins de lui, et en donne à ses alliés.",
      "Il frappe aussi tout ce qui est à 3 cases ou moins de lui et de chaque monstre : restez à plus de 3 cases de tous les monstres.",
      "Ne restez pas à exactement 4 cases de lui : il y frappe fort, sans ligne de vue, et vous fait subir plus de dégâts. Au contact, il vole des PA et repousse.",
      "Frappez en terre ; évitez le feu et l'eau, qu'il résiste très bien.",
    ],
  },

  "crasper": {
    zone: "Mont des Tombeaux, île de Grobe", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 3 ou plus."],
    strategie: [
      "Pas d'état invulnérable, mais les armes ne lui font rien : frappez-le uniquement avec des sorts, de préférence en terre. Il ne peut pas être poussé.",
      "Il ne frappe qu'au contact, où il rend aussi pacifiste : restez à plus de 7 cases de lui.",
      "À la fin de son tour, il échange sa place avec un personnage à plus de 4 cases de lui : prévoyez de vous éloigner à nouveau.",
      "Son sort de zone (5 cases autour de la cible) érode et empoisonne selon les PA et PM utilisés : restez espacés, et si vous êtes touché, bougez peu ou désenvoûtez-vous.",
    ],
  },

  "carter-le-pillard": {
    zone: "Caverne des Fungus, landes de Sidimote", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 4 ou plus."],
    strategie: [
      "Il ne bouge pas, ne peut pas être déplacé, et il est invulnérable à distance, sans moyen de lever cet état : il faut le frapper au contact.",
      "Autour de lui, une zone grandit d'une case par tour : elle frappe fort en air et retire puissance, résistances et portée. Préparez vos personnages au contact : résistance air, soins, boosts.",
      "Astuce s'il a des monstres : quand il pose sa zone marron sur des monstres, il encaisse leurs dégâts à leur place. Frappez alors ces monstres, même à distance.",
      "Tuez son champignon (1 PV) à côté de vos personnages : ils gagnent 300 de puissance. Ne finissez pas votre tour dans sa zone bleue, sinon vous passez le suivant.",
      "Frappez en terre ou en eau ; jamais en air, il y est insensible.",
    ],
  },

  "le-fantome-braideur": {
    zone: "Caserne du Jour sans fin, Frigost", milice: ALIGN, acces: ["Être aligné à Bonta ou Brâkmar, ordre 5."],
    strategie: [
      "Pas d'état invulnérable, mais elle réduit de 75 % les dégâts reçus à distance : frappez-la au contact. À distance, misez sur l'érosion.",
      "Toute l'équipe est sous Pesanteur pendant le combat, et elle retire beaucoup de PM en zone : un Pandawa qui la jette vers vos personnages, ou des sorts qui vous attirent vers elle, aident beaucoup.",
      "Sous la moitié de ses PV, elle invoque 3 copies d'elle-même, réinvoquées dès qu'elles meurent : ignorez-les. Boostez-vous avant de la passer sous 50 %, puis finissez-la vite.",
      "Son tir en ligne repousse de 6 cases avec de gros dégâts de poussée : ne restez pas alignés, et restez espacés.",
      "Frappez en feu, en terre ou en neutre ; évitez l'eau et l'air.",
    ],
  },

  // ---------- Ecaflipus ----------
  atcham: {
    niveau: 180,
    zone: "Temple de Kerubim, Ecaflipus (il apparaît sous le nom de Fou)",
    acces: [ACCES_ECAFLIPUS],
    milice: "Avant-poste des Voyageurs d'Ecaflipus [-1,-6], livraison à la Tour des Voyageurs [-22,-24]",
    strategie: [
      "Trois monstres : Chi (pierre), Fou (ciseaux), Mi (feuille). Si l'un meurt, les deux autres aussi.",
      "À chaque tour de Fou, chaque personnage reçoit pierre, feuille ou ciseaux : ne frappez que le monstre que votre symbole bat.",
      "Mauvaise cible : 3 tours pacifiste et 300 % des dégâts renvoyés.",
    ],
  },
};

/** Avis payé en avitons (et parfois en kamas de glace). */
function av(id: string, nom: string, region: string, avitons: number, o: Options = {}): Avis {
  return { id, nom, region, avitons, kamasGlace: o.kg, protection: o.p, page: o.page === null ? undefined : o.page ?? `on-recherche-${id}` };
}
/** Avis d'alignement, payé en alitons. */
function al(id: string, nom: string, alitons: number, o: Options = {}): Avis {
  return { id, nom, region: "alignement", alitons, protection: o.p, alignementMin: o.align, ordreMin: o.ordre, page: o.page === null ? undefined : o.page ?? `on-recherche-${id}` };
}

const INV: Protection = "Invulnérable";
const INV_DIST: Protection = "Invulnérable à distance";

export const AVIS: Avis[] = [
  // Astrub
  av("fouduglen-l-ecureuil", "Fouduglen l'Écureuil", "astrub", 120),
  av("frakacia-leukocytine", "Frakacia Leukocytine", "astrub", 180),
  av("ogivol-scalarcin", "Ogivol Scalarcin", "astrub", 300),
  av("brumen-tinctorias", "Brumen Tinctorias", "astrub", 360),
  av("marzwel-le-gobelin", "Marzwel le Gobelin", "astrub", 360),
  av("aermyne-braco-scalptaras", "Aermyne 'Braco' Scalptaras", "astrub", 480),
  av("musha-l-oni", "Musha l'Oni", "astrub", 480),
  av("qil-bil", "Qil Bil", "astrub", 480),
  av("rok-gnorok", "Rok Gnorok", "astrub", 600),
  av("padgref-demoel", "Padgref Demoël", "astrub", 1080),
  av("zatoishwan", "Zatoïshwan", "astrub", 1320),

  // Château d'Amakna
  av("simbadas", "Simbadas", "amakna", 600),
  av("tyranne-la-terrible", "Tyranne la Terrible", "amakna", 600),
  av("carlita-de-l-aguerfelde", "Carlita de l'Aguerfelde", "amakna", 720),
  av("naganita", "Naganita", "amakna", 720),
  av("trukipik", "Trukipik", "amakna", 720),
  av("nenufor-tilotus", "Nenufor Tilotus", "amakna", 960),
  av("ali-grothor", "Ali Grothor", "amakna", 1080),
  av("fojumo", "Fojumo", "amakna", 1200),
  av("anatak-diskedor", "Anatak Diskedor", "amakna", 1440),
  av("le-guerrier-du-ko", "Guerrier du K.O.", "amakna", 1680),
  av("le-shushu-debruk-sayl", "Shushu Debruk'Sayl", "amakna", 1680, { p: INV }),
  av("predagob", "Predagob", "amakna", 1800),
  av("le-grand-kongoku", "Grand Kongoku", "amakna", 2040),

  // Base des Justiciers
  av("les-guman", "Guman", "justiciers", 180),
  av("gadoo", "Gadoo", "justiciers", 360, { p: "Réduction armes" }),
  av("amy-l-empoisonneuse", "Amy l'empoisonneuse", "justiciers", 1200),
  av("l-hyperscampe", "Hyperscampe", "justiciers", 2040, { p: INV }),

  // Sufokia
  av("buldalazred", "Buldalazred", "sufokia", 2040),
  av("le-homard-medali", "Homard Medali", "sufokia", 2040, { p: INV }),
  av("takomako", "Takomako", "sufokia", 2040, { p: INV }),

  // Saharach
  av("tournade", "Tournade", "saharach", 420),
  av("le-roi-camole", "Roi Camole", "saharach", 1080),
  av("ka-youloud", "Ka'Youloud", "saharach", 1560),
  av("le-khepricorne", "Khepricorne", "saharach", 2040, { p: INV }),

  // Frigost (trois milices : la Bourgade, le Village enseveli et Frigost III)
  av("bouflouth", "Bouflouth", "frigost", 960, { kg: 2 }),
  av("monsieur-pingouin", "Monsieur Pingouin", "frigost", 1080, { kg: 1 }),
  av("katigrou", "Katigrou", "frigost", 1200, { kg: 2 }),
  av("fantomayte", "Fantômayte", "frigost", 1320, { kg: 3 }),
  av("vengeuse-masquee", "Vengeuse Masquée", "frigost", 1440, { kg: 3 }),
  av("fuji-givrefoux", "Fuji Givrefoux", "frigost", 1560, { kg: 4 }),
  av("le-yechti", "YeCh'Ti", "frigost", 1560, { kg: 3, p: INV }),
  av("dremoan", "Dremoan", "frigost", 1680, { kg: 4, p: INV }),
  av("le-docteur-eggob", "Docteur Eggob", "frigost", 1860, { kg: 4 }),
  av("flasho", "Flasho", "frigost", 1860, { kg: 4 }),
  av("viti-glourson", "Viti Glourson", "frigost", 1860, { kg: 4 }),
  av("le-chevalier-de-glace", "Chevalier de Glace", "frigost", 2040, { kg: 5, p: INV }),
  av("comte-harebourg", "Comte Harebourg", "frigost", 2040, { kg: 5, p: INV, page: "donjon-du-comte-harebourg" }),
  av("culbutoeuf", "Culbutoeuf", "frigost", 2040, { kg: 5, p: "Réduction en mêlée" }),
  av("glourdorak", "Glourdorak", "frigost", 2040, { kg: 5, p: INV }),
  av("mekamouth", "Mekamouth", "frigost", 2040, { kg: 5, p: INV }),
  av("le-psikopompe", "Psikopompe", "frigost", 2040, { kg: 5, p: INV }),

  // Dimensions divines
  av("la-maxi-malle", "Maxi-Malle", "enutrosor", 720),
  av("aigripoil", "Aigripoil", "enutrosor", 1320),
  av("voldelor", "Voldelor", "enutrosor", 2040),
  av("panteroz", "Pantèroz", "srambad", 1080, { p: "Réduction à distance" }),
  av("la-mouchame", "Mouchâme", "srambad", 1680),
  av("gein", "Gein", "srambad", 2040, { p: INV }),
  av("morblok", "Morblok", "xelorium", 960),
  av("hin", "Hin", "xelorium", 1560),
  av("sicogne", "Sicogne", "xelorium", 2040),
  av("atcham", "Atcham", "ecaflipus", 2040),
  av("ganos", "Ganos", "osavora", 2040),

  // Bonta et Brâkmar (alitons)
  al("sam-sagaz", "Sam Sagaz", 2, { p: INV, align: 1 }),
  al("maitre-boulet", "Maître Boulet", 3, { align: 1 }),
  al("roub-ignolles", "Roub' Ignolles", 4, { align: 10 }),
  al("bouss-baybe", "Bouss Baybe", 5, { align: 10 }),
  al("nono-le-wobot", "Nono le Wobot", 6, { ordre: 1 }),
  al("armada-l-invincible", "Armada l'Invincible", 7, { p: INV, ordre: 1 }),
  al("dragodingo", "Dragodingo", 8, { ordre: 1 }),
  al("degolas", "Degolas", 9, { ordre: 1 }),
  al("le-prince-marchand", "Prince Marchand", 10, { ordre: 2 }),
  al("gobrechaun", "Gobrechaun", 11, { p: INV_DIST, ordre: 2 }),
  al("la-vashkiwi", "Vashkiwi", 12, { ordre: 2 }),
  al("jerart-dupaindur", "Jérart Dupaindur", 13, { ordre: 2 }),
  al("darma", "Darma", 14, { ordre: 3 }),
  al("mogligli", "Mogligli", 15, { ordre: 3 }),
  al("glandaf-l-aigri", "Glandaf l'Aigri", 16, { ordre: 3 }),
  al("crasper", "Crasper", 17, { p: "Réduction armes", ordre: 3 }),
  al("carter-le-pillard", "Carter le Pillard", 18, { p: INV_DIST, ordre: 4 }),
  al("sans-visage", "Sans Visage", 19, { page: null, align: 80 }),
  al("le-fantome-braideur", "Le Fantôme Braïdeur", 20, { ordre: 5 }),
];

for (const a of AVIS) Object.assign(a, DETAILS[a.id]);

export const AVIS_PAR_ID = new Map(AVIS.map((a) => [a.id, a]));

export const nomRegion = (id: string) => REGIONS.find((r) => r.id === id)?.nom ?? id;

export const urlAvis = (a: Avis) => (a.page ? `https://www.dofuspourlesnoobs.com/${a.page}.html` : undefined);

export function recompense(a: Avis): string {
  if (a.alitons !== undefined) return `${a.alitons} alitons`;
  const base = `${(a.avitons ?? 0).toLocaleString("fr-FR")} avitons`;
  return a.kamasGlace ? `${base} + ${a.kamasGlace} kamas de glace` : base;
}
