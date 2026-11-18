// Guides des boss (page Donjons > Guides). Textes rédigés par la guilde, dans nos mots : les mécaniques sont des faits
// de jeu, vérifiés en croisant plusieurs sources ; le lien « Guide détaillé » renvoie vers Dofus pour les Noobs.
// statut « brouillon » : première version à faire relire par un membre qui a fait le boss ; « a-rediger » : fiche du jeu seule.

export type GuideBoss = {
  slug: string; // image public/icones/boss/<slug>.webp et caractéristiques dans bossStats.ts
  donjon: string;
  niveau: number;
  position: string;
  dpln: string;
  statut: "brouillon" | "a-rediger";
  /** Comment entrer : clef, chemin, conditions (nombre de joueurs…). */
  acces?: string[];
  mecaniques?: string[];
  /** Rendre le boss vulnérable (« délock ») : ce qu'il faut faire pour pouvoir le frapper. */
  delock?: string[];
  strategie?: string[];
  /** Informations à vérifier en jeu (une seule source, contradiction…) : affichées en avertissement. */
  avertissements?: string[];
  /** Astuces pour les challenges du donjon (Duo, Statue, Focus…). */
  succes?: string[];
};

const DPLN = "https://www.dofuspourlesnoobs.com/";

export const GUIDES_BOSS: GuideBoss[] = [
  {
    slug: "tal-kasha", donjon: "Chambre de Tal Kasha", niveau: 200, position: "[12,-77]", dpln: `${DPLN}chambre-de-tal-kasha.html`, statut: "brouillon",
    acces: [
      "Il faut être 4 : l'ouverture de la pyramide demande deux binômes en même temps.",
      "Entrez dans la Pyramide Maudite en [9,-72] (Zaap du Port de Sarakech en [14,-55]), puis séparez l'équipe en deux groupes de deux.",
      "Un binôme va en [8,-78], l'autre en [4,-72] : dans chaque salle, un personnage se place sur la dalle et l'autre actionne le levier. Les portes en [9,-77] et [13,-74] s'ouvrent.",
      "La porte suivante, en [11,-74], s'ouvre en battant Tabasma en [14,-75] (son groupe compte autant de monstres que vous êtes de joueurs). Elle reste ouverte jusqu'à son retour.",
      "L'entrée du donjon est au cœur de la pyramide. Clef par le trousseau, ou à fabriquer (Fragments de Chakanoubis, Dents de Bandleth, Grenats de Momistik, Paupières Dorées de Rykaon, en plus des ingrédients habituels).",
    ],
    mecaniques: [
      "Tal Kasha frappe à travers ses alliés : chaque monstre de son camp sert de relais, comme une doublure qui ne bouge pas pendant son tour. Ne finissez jamais votre tour aligné avec un ennemi : son attirance en ligne n'a pas besoin de ligne de vue.",
      "Si plusieurs personnages sont à portée par un relais, c'est le plus proche du relais qui est visé.",
      "Retirer des PM à Tal Kasha fait échanger votre place avec elle (seulement la première tentative de chaque tour) : pratique pour la placer, ou pour vous sortir d'un blocage.",
      "Les monstres de la zone se protègent : quand vous frappez l'un d'eux, son allié le plus proche divise par deux vos dommages à distance et perd 2 PM jusqu'à votre prochain tour. Des dommages de poussée sur ce monstre retirent la protection.",
      "Les monstres tués reviennent à la vie : Tal Kasha les ressuscite.",
    ],
    delock: [
      "Tuer un de ses monstres laisse un glyphe à l'endroit où il est mort. Placez Tal Kasha sur ces glyphes (échange de place par retrait de PM, poussées, attirances).",
      "Il faut des glyphes de monstres différents : le glyphe d'un même monstre ne compte qu'une fois. Un monstre déjà utilisé réapparaît avec une tache blanche bien visible.",
      "Impossible de tuer le monstre et d'y placer le boss pendant le même tour de personnage : prévoyez deux personnages, ou deux tours.",
      "Une fois vulnérable, elle le reste jusqu'à la fin du combat : on ne refait l'opération qu'une fois.",
    ],
    strategie: [
      "Érodez les monstres le plus possible : ils reviennent sans cesse, et chaque nouveau glyphe vous rapproche du délock.",
      "Gardez du retrait de PM à distance : c'est l'outil principal pour l'échanger de place et la poser sur les glyphes.",
      "Vulnérable, elle gagne un saut (1 à 4 cases, en début de tour si elle ne peut frapper personne, tous les 2 tours) : l'état Pesanteur l'en empêche.",
    ],
    succes: [
      "Focus : les monstres ressuscitent sans cesse ; déplacez-les sans les frapper (libération, poussées sans dommages) et retirez-leur des PM pour les tenir à distance. Une fois Tal Kasha vulnérable, on ne peut plus toucher aux autres.",
      "Statue : beaucoup de déplacement et d'entrave chez les alliés, pour bouger les ennemis plutôt que soi.",
      "Duo (40 tours) : il faut des dommages, et du retrait de PM à distance pour la placer vite sur les glyphes.",
    ],
  },
  {
    slug: "missiz-frizz", donjon: "Forgefroide de Missiz Frizz", niveau: 200, position: "[-70,-81]", dpln: `${DPLN}forgefroide-de-missiz-frizz.html`, statut: "brouillon",
    acces: ["Clef par le trousseau, ou à fabriquer (avec le Sang de Ventrublion des salles du donjon)."],
    mecaniques: [
      "Missiz Frizz et ses monstres sont tous invulnérables et lourds (impossibles à porter) au début du combat, comme les autres boss de Frigost III.",
      "Au début de chacun de vos tours, des congères apparaissent autour de votre personnage.",
    ],
    delock: [
      "Repoussez un ennemi avec les congères générées autour de votre personnage : la poussée lui retire son invulnérabilité.",
      "Préparez votre placement à la fin du tour précédent : ce sont les congères du début de tour qui servent à délocker la cible.",
    ],
    strategie: [
      "Placez-vous pour que les congères générées en début de tour puissent repousser la cible voulue, puis frappez-la tant qu'elle est vulnérable.",
      "Éliminez d'abord ses monstres pour éviter qu'ils se protègent entre eux, et finissez par Missiz Frizz.",
      "Ne la laissez pas venir au contact sans raison : certains effets des congères peuvent jouer en sa faveur.",
    ],
    succes: ["Succès du donjon : Nomade, Collant, Score 150 et 200, Duo (40 tours).", "Pensez à capturer la salle 4 : elle sert pour les Métal Éternel de La machine à démonter le temps."],
  },
  {
    slug: "nileza", donjon: "Laboratoire de Nileza", niveau: 200, position: "[-61,-74]", dpln: `${DPLN}laboratoire-de-nileza.html`, statut: "brouillon",
    acces: ["Dans les Jardins d'Hiver (château de Harebourg). Clef par le trousseau, ou à fabriquer avec les ressources des Alchillusions du donjon."],
    mecaniques: [
      "Quand on le frappe, Nileza échange sa place avec l'attaquant, puis inflige des dommages en zone de 2 cases autour de sa case d'arrivée.",
      "Ces dommages touchent tout le monde autour de lui, y compris ses propres alliés.",
      "Il frappe d'autant plus fort que ses PV baissent : il devient très vite dangereux.",
      "Il attaque surtout en ligne, avec un sort à portée modifiable.",
    ],
    delock: ["Nileza n'est pas invulnérable : on peut le frapper dès le début du combat. Tout l'enjeu est de choisir d'où on le frappe."],
    strategie: [
      "Retournez sa mécanique contre son camp : frappez-le depuis une case entourée d'ennemis. Il atterrit à votre place et sa zone de 2 cases blesse ses propres alliés.",
      "Bien placé, chaque coup sur lui fait de gros dégâts aux autres monstres : ils tombent souvent avant lui.",
      "Avant de le frapper, vérifiez où vous atterrissez : vous prenez sa place, parfois au milieu des monstres.",
      "Ne restez pas aligné avec lui en fin de tour : son attaque principale est en ligne, et sa portée peut augmenter.",
      "Gardez assez de dégâts pour le finir vite une fois ses PV bas, puisqu'il frappe de plus en plus fort.",
    ],
  },
  {
    slug: "sylargh", donjon: "Transporteur de Sylargh", niveau: 200, position: "[-53,-84]", dpln: `${DPLN}transporteur-de-sylargh.html`, statut: "brouillon",
    mecaniques: [
      "Les monstres du combat se réinvoquent, et le boss lui-même peut être réinvoqué.",
      "Tuer un monstre réinvoqué déclenche une vérification de distance, pour le Sylargh comme pour vos personnages (voir le délock).",
    ],
    delock: [
      "Tuez un monstre réinvoqué pendant que le Sylargh se trouve à une distance de 5 à 10 cases de ce monstre.",
      "Au même moment, vos alliés doivent eux aussi être entre 5 et 10 cases du monstre tué : sinon, ils passent dans l'état Pacifiste et ne peuvent plus frapper.",
    ],
    strategie: [
      "Avant de tuer un monstre réinvoqué, vérifiez la position de tout le monde : le Sylargh et chaque allié entre 5 et 10 cases de lui.",
      "Choisissez la cible du kill en fonction du placement de l'équipe, plutôt que l'inverse.",
    ],
    avertissements: [
      "Point à vérifier : si on tue une seconde invocation en respectant la condition, perd-on l'état Pacifiste reçu au premier kill ?",
    ],
  },
  {
    slug: "klime", donjon: "Salons privés de Klime", niveau: 200, position: "[-63,-86]", dpln: `${DPLN}salons-priveacutes-de-klime.html`, statut: "brouillon",
    acces: ["Dans la Tannerie Écarlate (château de Harebourg). Clef par le trousseau, ou à fabriquer avec les cuirs des monstres du donjon et un Œil de Harrogant."],
    mecaniques: [
      "Dans la dernière salle, deux mécaniques se mettent en place : l'invulnérabilité de Klime, et l'état Pacifiste qui entre en jeu après les premiers tours.",
      "Plus Klime perd de PV, plus ses attaques font mal : ne laissez pas le combat traîner une fois qu'il est entamé.",
      "Vulnérable, il gagne Cuir à feu doux : il se téléporte, lui et ses alliés, à leur position du début de tour. Un personnage qui se trouve sur une case d'arrivée échange sa place et perd 6 PM.",
    ],
    delock: [
      "Provoquez une collision de poussée entre Klime et un allié (joueur, compagnon ou invocation) : poussez l'un contre l'autre pour générer des dommages de poussée.",
      "L'invulnérabilité ne disparaît que pour 1 tour : enchaînez les dommages juste après la poussée, avec les personnages qui jouent ensuite.",
      "D'après un guide récent, ce n'est pas possible avant le tour 3 : gardez vos poussées pour ce moment-là.",
    ],
    avertissements: ["La limite du tour 3 ne vient que d'une seule source : à confirmer en jeu."],
    strategie: [
      "Prévoyez au moins deux personnages capables de pousser, et une invocation pour servir d'appui si besoin.",
      "Organisez l'ordre de jeu : celui qui délocke joue juste avant les gros frappeurs.",
      "Méfiez-vous de Cuir à feu doux : ne restez pas sur la case de départ d'un ennemi à la fin de votre tour.",
    ],
  },
  {
    slug: "comte-harebourg", donjon: "Donjon du Comte Harebourg", niveau: 200, position: "[-61,-79]", dpln: `${DPLN}donjon-du-comte-harebourg.html`, statut: "brouillon",
    acces: ["Au sommet de la Tour de la Clepsydre, au centre de Frigost III. C'est le dernier donjon avant le Dofus des Glaces."],
    mecaniques: [
      "Confusions horaires : vos attaques sont déviées selon un angle (exprimé en degrés ou en π). Calculez où part réellement votre sort avant de le lancer.",
      "Tours impairs : si vous frappez le Comte, c'est vous qui êtes déplacé en symétrie par rapport à lui.",
      "Tours pairs : si vous frappez le Comte, c'est lui qui est déplacé en symétrie par rapport à vous.",
    ],
    delock: [
      "Le Comte perd son invulnérabilité pendant un tour complet s'il échange sa place avec un allié (un personnage ou un compagnon, pas une invocation).",
      "On le fait donc pendant les tours pairs : frappez-le de façon que sa case d'arrivée, symétrique par rapport à vous, soit celle d'un allié.",
    ],
    strategie: [
      "Préparez les tours pairs : placez un allié sur la case symétrique au Comte par rapport à celui qui va le frapper.",
      "Pendant les tours impairs, évitez de le frapper sans réfléchir : c'est vous qui seriez déplacé, parfois au mauvais endroit.",
      "Une fois délocké, il reste vulnérable un tour complet : enchaînez les gros dégâts avec toute l'équipe.",
    ],
    succes: ["Succès du donjon : Versatile, Statue et Duo (40 tours)."],
  },
  {
    slug: "kimbo", donjon: "Canopée du Kimbo", niveau: 160, position: "[-54,16]", dpln: `${DPLN}canopeacutee-du-kimbo.html`, statut: "brouillon",
    mecaniques: [
      "Ce sont les Disciples qui posent les glyphes, chacun à son tour.",
      "Un glyphe quadrille toute la carte, comme un damier : un glyphe impair couvre toutes les cases impaires, un glyphe pair toutes les cases paires. Impossible d'y échapper autrement qu'en étant sur une case de l'autre parité.",
      "L'élément de vos coups sur le Kimbo décide du type de glyphe : Terre ou Eau donnent un glyphe impair, Feu ou Air un glyphe pair. Le Neutre ne fait rien.",
      "Seul le dernier élément joué compte : frapper Eau puis Feu remplace l'effet de l'Eau par celui du Feu.",
      "Le glyphe reste en place tant qu'on continue de frapper avec un élément de la même paire.",
      "Un allié qui commence son tour sur le même glyphe que le Kimbo meurt d'un coup.",
      "Le Kimbo repousse de 2 cases : une poussée de 2 cases vous laisse sur la même parité, mais une poussée bloquée à 1 case vous fait changer de parité.",
    ],
    delock: [
      "Le Kimbo est vulnérable tant qu'il commence son tour sur le glyphe posé par un Disciple.",
      "C'est l'élément de l'équipe qui décide : on choisit où se placer, et où placer le Kimbo, en fonction de l'élément frappé (Terre/Eau : le Kimbo sur une case impaire ; Feu/Air : sur une case paire). Pas l'inverse.",
    ],
    strategie: [
      "Frappez le Kimbo à chaque tour, même si vos coups ne lui font aucun dégât : ça préserve les glyphes posés au sol.",
      "Avant de finir votre tour, placez-vous sur une case de l'autre parité que le glyphe en cours.",
      "Si un allié se trouve sur une case du glyphe et que vous jouez avant lui, poussez-le sur une case de l'autre parité pour lui éviter de mourir à son tour.",
      "Ne vous mettez pas contre un obstacle : si la poussée du Kimbo est bloquée à 1 case, vous changez de parité et risquez de commencer votre tour sur un glyphe.",
      "Mettez-vous d'accord sur la paire d'éléments à frapper : un coup dans l'autre paire en fin de tour change le glyphe pour tout le monde.",
    ],
  },
  {
    slug: "merkator", donjon: "Aquadôme de Merkator", niveau: 200, position: "[21,18]", dpln: `${DPLN}aquadocircme-de-merkator.html`, statut: "brouillon",
    acces: [
      "Dans la Base Abyssale : le succès d'exploration « Salles des Abîmes » permet d'être téléporté directement vers le donjon.",
      "Sinon, il faut traverser les trois étages (ascenseurs, leviers) en consommant des Piles Steamer (une quinzaine). Les Salles des Courants demandent de se coordonner à plusieurs.",
      "Remettez ensuite la clef (ou le trousseau) à Théo Dolith pour entrer.",
    ],
    mecaniques: [
      "Merkator réduit de 50 % les dommages de toutes vos attaques à distance.",
      "Son danger : il réduit artificiellement les PV de sa cible, qui devient une proie facile pour ses alliés.",
    ],
    delock: ["Merkator n'est pas invulnérable : tout se joue sur la distance à laquelle on le frappe."],
    strategie: [
      "Frappez-le au contact pour ne pas perdre la moitié de vos dégâts.",
      "Ne laissez pas un personnage dont les PV ont été réduits à portée de ses alliés : protégez-le ou éloignez-le.",
    ],
  },
  {
    slug: "vortex", donjon: "Œil de Vortex", niveau: 200, position: "Lendemains incertains", dpln: `${DPLN}oeil-de-vortex.html`, statut: "brouillon",
    mecaniques: [
      "Tout le donjon tient en une seule salle : 5 vagues de monstres, une tous les 5 tours. Vos boosts et invocations restent en place d'une vague à l'autre.",
      "L'Auroraire est une horloge : sa position sur la carte indique l'heure, et elle avance d'une heure au début du tour de chaque personnage. À 3, 4 ou 6 joueurs, son cycle est régulier.",
      "Au tour du Vortex, l'Auroraire frappe tous vos personnages (environ 500 Terre) et leur applique 50 % d'érosion.",
      "Ses sorts : Heuristique frappe en ligne à 8 PO sans ligne de vue et pose l'état Pacifiste (désenvoûtable) ; En temps et en heure frappe les personnages alignés avec l'Auroraire ; Morfaille frappe autour de lui au lancement et au début du tour suivant.",
      "Heurage : tous les 3 tours, il se téléporte au contact de l'Auroraire en début de tour.",
    ],
    delock: [
      "Chaque monstre doit être tué deux fois : la seconde fois à la même heure que la première, pour le « corrompre ».",
      "Une étoile jaune apparaît au-dessus d'un monstre déjà tué quand c'est la bonne heure. Un monstre corrompu reste en jeu, mais invulnérable et passif.",
      "Une fois les cinq vagues corrompues, le Vortex reste invulnérable encore un tour, puis devient vulnérable ; tous les monstres disparaissent.",
    ],
    strategie: [
      "Notez l'heure à laquelle vous tuez chaque monstre : c'est elle qui compte pour la corruption.",
      "Ne restez jamais aligné avec l'Auroraire pendant le tour du Vortex, ni à 8 cases en ligne de lui.",
      "Prévoyez du désenvoûtement pour l'état Pacifiste, et de quoi gérer l'érosion de l'Auroraire (soins, boucliers).",
      "Vulnérable, il se téléporte régulièrement près de l'Auroraire : éloignez-vous de sa position.",
    ],
    succes: ["« Heure de la mort » : tous les ennemis doivent être achevés à la même heure."],
  },
  {
    slug: "solar", donjon: "Tour de Solar", niveau: 200, position: "[-31,15]", dpln: `${DPLN}tour-de-solar.html`, statut: "brouillon",
    mecaniques: [
      "Tant que le Solar est en vie, ses alliés reviennent à la vie.",
      "Quand il meurt, il tue toute votre équipe d'un coup… sauf s'il était sous Nécronyx.",
    ],
    delock: [
      "Lancez le sort Nécronyx sur le Solar avant de lui porter le coup fatal : il meurt alors sans emporter l'équipe.",
    ],
    strategie: [
      "Gardez Nécronyx pour la fin : vérifiez qu'il est bien actif sur le Solar avant le dernier coup, et que personne ne l'achève trop tôt.",
      "Ne perdez pas trop de temps sur ses alliés : ils reviennent tant qu'il est en vie.",
    ],
    avertissements: ["Point à vérifier : Nécronyx empêche-t-il aussi ses alliés de revenir à la vie ?"],
  },
  {
    slug: "capitaine-meno", donjon: "Vaisseau du Capitaine Meno", niveau: 200, position: "[24,27]", dpln: `${DPLN}vaisseau-du-capitaine-meno.html`, statut: "brouillon",
    acces: ["Clef par le trousseau, ou à fabriquer (Baves de Mol Usk, Pinces de Crabe Yoloniste, Écailles de Gambaf, et des ressources de la mer). Le vaisseau est hors de l'eau : montures autorisées."],
    mecaniques: [
      "Des vagues de monstres apparaissent régulièrement (tous les deux tours).",
      "Un de ses sorts (12 PO, modifiable) rend la cible vulnérable (×115 % pendant 1 tour) et lui applique l'état Conducteur pendant 3 tours. Soigner le personnage retire Conducteur.",
      "Foudre marine arrive à son 3e tour de jeu.",
    ],
    strategie: ["Soignez vite les personnages sous Conducteur, surtout avant son 3e tour.", "Ne laissez pas les vagues s'accumuler : éliminez-les au fur et à mesure."],
    avertissements: ["Le moyen de le rendre vulnérable n'est pas encore renseigné : si tu le connais, dis-le aux officiers."],
  },
  {
    slug: "ilyzaelle", donjon: "Belvédère d'Ilyzaelle", niveau: 200, position: "[-72,-77]", dpln: `${DPLN}belvedere-d-ilyzaelle.html`, statut: "brouillon",
    acces: ["Dans la Caserne du Jour Sans Fin."],
    mecaniques: [
      "Ilyzaelle est possédée par les Brûlâmes. Les monstres de la zone partagent l'état Brûlure.",
      "Des monstres apparaissent près du portail : 2 tous les 3 tours pour une équipe de 4 ou moins, et un de plus par personnage supplémentaire.",
      "À certains moments, elle passe sous emprise : invulnérable, mais dans votre camp. Elle pose alors un glyphe, toujours au même endroit : il donne +400 % de dommages finaux à ceux qui sont dedans, et blesse lourdement les monstres qui y marchent.",
      "Son premier tour sous emprise, elle est invulnérable et ne bouge pas : profitez-en pour vous éloigner ou la déplacer.",
      "Hantâme, un de ses sorts, frappe fort (Feu) et érode de 40 %.",
    ],
    delock: [
      "Une fois le glyphe disparu, elle redevient vulnérable : amenez-la à 50 % de ses PV.",
      "À 50 %, elle repasse dans votre camp pour deux tours.",
    ],
    strategie: [
      "Placez vos frappeurs dans son glyphe pendant qu'elle est de votre côté : +400 % de dommages finaux.",
      "Attirez les monstres des vagues dans le glyphe.",
      "Ne restez pas groupés ni en ligne avec les monstres.",
    ],
    avertissements: ["Ce qui la fait passer sous emprise la première fois reste à préciser.", "Le retour dans votre camp à 50 % de PV vient d'une source jugée peu fiable : à vérifier."],
  },
  {
    slug: "dantinea", donjon: "Palais de Dantinéa", niveau: 200, position: "Sufokia (profondeurs)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    mecaniques: [
      "Coquillages protecteurs : chaque personnage a un coquillage numéroté qui lui est associé (même numéro que le personnage).",
      "Tant que votre coquillage est en vie, vos dommages sont réduits de 50 %, et vous subissez un malus de PM qui augmente à chaque tour, sans limite connue : -1 PM par tour (-5 PM au tour 5, et ainsi de suite).",
    ],
    delock: [
      "Tuez votre coquillage pour retrouver vos pleins dommages et arrêter le malus de PM.",
      "Faites-le très vite : chaque tour qui passe vous retire un PM de plus.",
    ],
    strategie: [
      "Repérez dès le placement le coquillage qui porte votre numéro.",
      "Commencez le combat par les coquillages, avant Dantinéa et ses gardes.",
      "Aidez un allié à tuer le sien s'il est en retard : son malus de PM finira par l'immobiliser.",
    ],
  },
  {
    slug: "protozorreur", donjon: "Ventre de la Baleine", niveau: 200, position: "Roc des Salbatroces (Frigost)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    mecaniques: [
      "Le Protozorreur et tous les Krobes de la zone sont invulnérables. Chacun a sa propre condition pour être vaincu.",
      "Il faut remplir cette condition à chaque tour, plusieurs tours de suite : le monstre meurt alors. Si on rate un tour, le compteur repart à zéro.",
      "Les dommages infligés aux monstres invulnérables sont transférés à la Malamibe, qui reste en jeu jusqu'au bout.",
      "Exemples de conditions : aucun soin pendant les tours requis pour le Tabacille (le vol de vie reste permis ; Dokoko, Dofus des Veilleurs ou Dofus Argenté font échouer) ; un autre Krobe meurt si l'on utilise une invocation.",
    ],
    delock: [
      "Quand le Protozorreur blesse un personnage, un glyphe apparaît sous lui. Placez le Protozorreur sur ce glyphe : il reçoit l'état du glyphe.",
      "Il doit garder cet état pendant le nombre de tours requis. L'état dure 3 tours : le replacer tous les 2 tours suffit.",
      "Une fois la condition remplie, il disparaît au tour du personnage qui a activé le glyphe.",
    ],
    strategie: [
      "Notez la condition de chaque Krobe avant le combat, et répartissez-les entre les joueurs.",
      "Tenez un compte des tours réussis pour chaque monstre : un seul tour raté remet tout à zéro.",
      "Gardez de quoi déplacer le Protozorreur (poussées, attirances) pour le remettre sur son glyphe.",
    ],
    succes: ["Succès du donjon : Statue, Barbare, Score 150 et 200, Duo (40 tours)."],
    avertissements: [
      "Nombre de tours : pour les monstres de la zone, 3 tours de suite depuis la mise à jour (5 avant), vérifié par la guilde. Pour le Protozorreur, un ancien guide indiquait 10 tours : la durée actuelle reste à confirmer.",
      "Les conditions des autres Krobes (dont celle de l'invocation) restent à compléter.",
    ],
  },
  {
    slug: "ben-le-ripate", donjon: "Épave du Grolandais violent", niveau: 150, position: "Frigost", dpln: `${DPLN}epave-du-grolandais-violent.html`, statut: "brouillon",
    mecaniques: [
      "Ben le Ripate invoque un monstre qui cherche à rejoindre son corps-à-corps.",
      "L'invocation ne peut être déplacée d'aucune manière (ni poussée, ni attirée, ni échangée).",
      "Lui retirer des PM lui en fait gagner : le retrait s'applique quand même ce tour-ci, mais le bonus de PM est conservé pour les tours suivants.",
    ],
    delock: ["Quand l'invocation arrive au contact de Ben, elle explose et lui retire son invulnérabilité."],
    strategie: [
      "Laissez le chemin libre à l'invocation vers Ben : ne bloquez pas sa route.",
      "Pour l'accélérer, retirez-lui des PM : elle en gagnera pour les tours suivants.",
      "Préparez vos frappeurs pour le moment où elle explose au contact de Ben.",
    ],
  },
  {
    slug: "kolosso", donjon: "Cavernes du Kolosso", niveau: 190, position: "Frigost", dpln: `${DPLN}cavernes-du-kolosso.html`, statut: "brouillon",
    mecaniques: [
      "La zone de frappe du Kolosso est énorme, en cône : s'il frappe au contact, tous les alliés placés derrière la cible sont touchés aussi.",
      "Le Professeur Xa est dans le combat : à sa mort, tous les monstres gagnent 400 dommages.",
      "Le Croleur peut se rendre invisible.",
    ],
    delock: ["Frappez le Kolosso avec une invocation placée à son contact : c'est ce qui le rend vulnérable."],
    strategie: [
      "Tuez le Croleur avant le Professeur Xa : invisible et boosté de 400 dommages, il frapperait à plus de 1 200 par coup.",
      "Ne vous alignez pas derrière un allié au contact du Kolosso : son cône vous toucherait tous.",
      "Gardez une invocation en réserve pour le délock.",
    ],
  },
  {
    slug: "reine-des-voleurs", donjon: "Trône de la Cour Sombre", niveau: 200, position: "Hauts Ténébreux (Srambad)", dpln: `${DPLN}trone-de-la-cour-sombre.html`, statut: "brouillon",
    acces: [
      "Au sommet de la pyramide de Srambad, dans les Hauts Ténébreux. On entre dans la dimension par le portail de Srambad, dont la position s'obtient par une chasse au trésor.",
      "L'Étoffe de la Cour Sombre (pour la clef) s'échange contre 5 Orichors au PNJ de l'entrée de la dimension, à côté des avis de recherche.",
    ],
    mecaniques: [
      "Tout le donjon tient en une seule salle et un seul combat : 5 vagues de monstres, une tous les 5 tours (tour 1, 6, 11, 16, 21).",
      "La spécificité du donjon : le système des bonbombes.",
      "Le Terristocrate place l'état Mort en sursis : la cible meurt si elle n'est pas soignée par une bombe désamorcée dans les 3 tours.",
      "Brume : un glyphe qui rend invisibles la Reine et ses alliés tant qu'ils sont dessus.",
    ],
    strategie: [
      "Désamorcez des bombes à l'avance : elles servent à soigner un allié en Mort en sursis avant la fin des 3 tours.",
      "Nettoyez chaque vague avant l'arrivée de la suivante, 5 tours plus tard.",
      "Restez hors des glyphes de Brume ou éloignez-en les ennemis : dessus, ils deviennent invisibles.",
    ],
    succes: ["Succès du donjon : Premier, Collant, Score 150 et 200, Trio (80 tours)."],
    avertissements: ["Le détail du système des bonbombes (comment les désamorcer, et un éventuel délock de la Reine) reste à compléter."],
  },
  {
    slug: "dazak-martegel", donjon: "Brasserie du roi Dazak", niveau: 200, position: "[-62,-70]", dpln: `${DPLN}brasserie-du-roi-dazak.html`, statut: "brouillon",
    acces: ["Sous le Mont Torrideau, dans le Royaume des Martegel. Le plus rapide : le Transporteur Frigostien de la Forêt Pétrifiée, en [-76,-66]."],
    mecaniques: [
      "Ses résistances sont trop hautes pour lui faire des dégâts en début de combat (plus de 100 % partout dans les données du jeu).",
      "La Nimpatience monte par stades : à chaque stade, il gagne 1 PM et 50 % de dommages finaux. Au stade 3, il gagne 3 PM pendant 2 tours, et son Coup de Cornes retire 25 % de vitalité à sa cible.",
      "Attention : lui infliger des dommages de poussée lui fait gagner des résistances.",
    ],
    strategie: ["Ne le poussez pas avec des dommages de poussée.", "Finissez le combat avant que la Nimpatience ne monte trop."],
    succes: ["Succès du donjon : Premier, Liberté, Score 150 et 200, Duo (40 tours)."],
    avertissements: ["Le moyen de faire baisser ses résistances n'est pas encore renseigné : si tu le connais, dis-le aux officiers."],
  },
  {
    slug: "bethel", donjon: "Tour de Bethel", niveau: 200, position: "Épaves Silencieuses", dpln: `${DPLN}tour-de-bethel.html`, statut: "brouillon",
    mecaniques: [
      "Bethel Akarna est insensible aux attaques des joueurs : seul le Dagon des Profondeurs, qu'il invoque pendant le combat, peut lui faire des dégâts.",
      "Sous son emprise, le Dagon est très dangereux : gardez-le le plus loin possible de vous.",
      "Le Zombruth gagne 40 en esquive PM et l'état Inébranlable pendant 2 tours.",
    ],
    delock: [
      "Détruisez le Monolithe : le Dagon passe dans votre camp et devient Insoumis.",
      "Amenez alors le Dagon Insoumis au corps-à-corps de Bethel Akarna pour qu'il le blesse.",
      "Recommencez l'opération jusqu'à ce que Bethel Akarna soit vaincu.",
    ],
    strategie: [
      "Appliquez l'état Nécronyx sur les Submergés et sur Bethel Akarna : ça désactive notamment sa capacité à vous repousser.",
      "Préparez de quoi déplacer le Dagon (poussées, attirances) pour le mener vite au contact de Bethel.",
    ],
    succes: ["Succès du donjon : Mystique, Zombie, Score 150 et 200, Duo (40 tours)."],
  },
  {
    slug: "xlii", donjon: "Horologium de XLII", niveau: 170, position: "[7,-2] (Xélorium)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Dans le Jour Présent, deuxième zone de Xélorium. On entre dans la dimension par le portail Xélorium, dont la position s'obtient par une chasse au portail.",
      "Le chemin jusqu'au donjon demande une Montre en avance et une Montre en retard.",
      "Pas de trousseau : la clef se fabrique. Les Poils d'Hordémon de la recette s'échangent contre 2 Orichors au collectionneur de l'avant-poste.",
    ],
    mecaniques: [
      "Une seule salle et un seul combat : 5 vagues, une tous les 5 tours. Vider une vague fait venir la suivante tout de suite, et ses monstres restent invulnérables jusqu'à leur premier tour.",
      "Le nombre de monstres par vague dépend du nombre de personnages au lancement du combat : un mort ne réduit pas les vagues suivantes.",
      "L'Auroraire tourne sur le cadran qui sert de sol. Au début, tout le monde n'inflige que 40 % de ses dégâts ; à chaque tour d'un de vos personnages, elle avance et donne 10 % de dommages aux deux camps.",
      "Un personnage placé sur la case où l'Auroraire doit avancer échange sa place avec elle.",
      "Chaque Hordémon change d'effet passé la moitié de ses PV : le Trezz gagne des résistances quand on le frappe, puis de la puissance ; le Vindeux soigne ses voisins, puis renvoie les dégâts autour de l'attaquant.",
      "XLII : Souffle démoniaque rend Pacifiste un tour (portée 1 à 3, sans ligne de vue), Coquetterie frappe autour de lui et réduit la durée de vos boosts. S'il est déplacé, il peut échanger sa place avec un autre Hordémon.",
    ],
    delock: ["XLII n'est pas invulnérable : pas de délock. Le seul frein est la baisse de dégâts du début de combat."],
    strategie: [
      "Utilisez les premiers tours, où vos dégâts sont faibles, pour vous booster et baisser ses résistances.",
      "Concentrez-vous sur XLII : sa mort fait disparaître l'Auroraire et ses effets. Pendant ce temps, faites patienter le reste de la première vague.",
      "Évitez de le déplacer, et ne finissez pas votre tour à 3 cases de lui.",
      "Achevez vite un Trezz sous la moitié de ses PV : chaque coup reçu le rend plus fort.",
    ],
    succes: [
      "Succès du donjon : Collant, Barbare, Spécial « C'est très vague ! » (finir chaque vague avant l'arrivée de la suivante), Duo (80 tours).",
      "Collant : Coquetterie touche tous les personnages autour de XLII, gardez-le loin du groupe.",
    ],
    avertissements: ["Le chemin avec les montres et les valeurs de l'Auroraire (40 % au départ, +10 % par tour) n'ont été trouvés que dans un guide d'avant Dofus 3 : à confirmer en jeu."],
  },
  {
    slug: "toxoliath", donjon: "Cave du Toxoliath", niveau: 180, position: "[8,8] (Srambad)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Dans les Catacombres, deuxième zone de Srambad. On entre dans la dimension par le portail Srambad (chasse au portail).",
      "Pas de trousseau : la clef se fabrique. Les Chitines de Nécrotique de la recette s'échangent contre 2 Orichors au collectionneur de l'avant-poste.",
    ],
    mecaniques: [
      "Une seule salle : 5 vagues, une tous les 5 tours. Vider une vague fait venir la suivante, invulnérable jusqu'à son premier tour.",
      "Le Toxoliath n'a ni invulnérabilité ni résistances hors normes. Mais chaque coup qu'on lui porte pose sur l'attaquant un poison de 2 tours, cumulable, qui frappe selon les PM utilisés pendant le tour, avant comme après le coup.",
      "Venin Salvateur : tous vos personnages subissent 50 % de dommages en plus.",
      "Les Nécrotiques aussi empoisonnent : le Scoliopode tue les invocations à son contact et rend insoignable celui qui le frappe ; le Lucrane retire la moitié de la vie de sa cible pour un tour.",
    ],
    delock: ["Pas d'invulnérabilité : le danger, c'est le poison qu'il renvoie à chaque coup."],
    strategie: [
      "Frappez-le sans bouger : mettez-vous en place un tour avant, puis restez immobile pendant les 2 tours du poison.",
      "Les portails d'un Éliotrope permettent de le toucher sans se déplacer.",
      "Prévoyez du soin : les poisons s'accumulent tout au long du combat.",
      "Gardez vos invocations loin du Scoliopode.",
    ],
    succes: [
      "Succès du donjon : Misanthrope, Circulez (aucun retrait de PM), Spécial « Relation toxique » (tuer le Toxoliath en dernier), Duo (80 tours).",
      "Circulez : temporisez avec des poussées et des protections plutôt qu'avec du retrait de PM.",
    ],
    avertissements: ["Le poison calculé sur les PM n'a été trouvé que dans un guide d'avant Dofus 3 : à confirmer en jeu, surtout ce qui compte (PM du tour entier ou seulement après le coup)."],
  },
  {
    slug: "comte-razof", donjon: "Camp du Comte Razof", niveau: 190, position: "[-68,30] (Nimotopia)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Sur l'île de Nimotopia. Le plus rapide : le zaap des Champs de Cania en [-27,-36], puis le Muldobus en [-28,-31], après les questions d'Agathe Mainate.",
      "Clef par le trousseau, ou à fabriquer avec une ressource de chaque monstre du camp (Chevrotine, Brokouillon, Nemroz, Crâmbo).",
    ],
    mecaniques: [
      "Le Comte n'est pas invulnérable, mais ses résistances dépassent 100 % dans tous les éléments (données du jeu) : sans préparation, vos coups ne lui font rien.",
      "Chaque invocation non statique présente sur le terrain lui fait perdre des résistances.",
      "Trophée de Chasse : il tue une invocation à son contact et gagne 1 PM et 200 de puissance pendant 2 tours.",
      "Chasse Gardée réduit les dégâts qu'il subit pendant un tour. Pelliste, jusqu'à 15 cases, retire des PM et pose Affaibli et Pesanteur.",
      "La Chevrotine invoque un chien qui colle sa cible, lui retire tous ses PM et la rend Pesanteur.",
    ],
    delock: [
      "Invoquez le plus possible : chaque invocation mobile en jeu fait baisser ses résistances, et on peut alors le frapper dans n'importe quel élément.",
      "Gardez vos invocations hors de son contact : chacune qu'il tue le renforce.",
    ],
    strategie: [
      "Un Osamodas, ou toute classe qui invoque beaucoup, est le meilleur atout ici.",
      "Tuez la Chevrotine en premier, avant que son chien ne bloque quelqu'un.",
      "Méfiez-vous des pièges invisibles du Nemroz (retrait de PA et de portée) et de l'attirance du Viandargh, qui retire 400 de puissance.",
    ],
    succes: ["Succès du donjon : Liberté, Premier, Spécial « Nos amies les bêtes » (aucune invocation alliée tuée par un ennemi), Duo (20 tours)."],
    avertissements: ["La perte de résistances par invocation n'est chiffrée nulle part, et la mécanique n'a été trouvée que dans un guide d'avant Dofus 3 : à vérifier en jeu."],
  },
  {
    slug: "ombre", donjon: "Pyramide d'Ombre", niveau: 190, position: "[6,13] (Dimension Obscure)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Dans la Dimension Obscure, où l'on entre depuis la même position de la forêt d'Amakna. Zaap le plus proche : Bord de la Forêt Maléfique, en [-1,13].",
      "Clef par le trousseau, ou à fabriquer avec les quatre masques des monstres de la zone (Vide, Vengeance, Violence, Vivacité).",
    ],
    mecaniques: [
      "Ombre est invulnérable. Pendant le combat, il invoque un Globilum et une Silhouette, qui servent au délock.",
      "À la fin de chacun de ses tours, le Globilum pose un glyphe autour de lui.",
      "Ombre frappe de plus en plus fort : Liaison l'attire vers vous et augmente ses coups suivants, Distorsion frappe à 3 cases autour de lui.",
      "Le Sombléro renforce ses alliés pour un tour (il rend le Brutopak invulnérable, par exemple) et fait riposter les monstres autour de celui qu'on frappe.",
    ],
    delock: [
      "Amenez la Silhouette dans le glyphe du Globilum : tant qu'elle y reste, Ombre peut être frappé, à condition qu'il ne soit pas lui-même dans le glyphe.",
      "La Silhouette ne peut être déplacée qu'une seule fois par tour de jeu : décidez à l'avance qui la bouge.",
      "Les échanges de place (Xélor, Sacrieur, Écaflip) ne semblent pas compter dans cette limite.",
      "Un personnage qui tacle bien peut la retenir dans le glyphe.",
    ],
    strategie: [
      "Tuez d'abord les autres monstres, en commençant par le Sombléro, et gardez Ombre à distance.",
      "Installez ensuite la Silhouette dans le glyphe, puis frappez Ombre.",
    ],
    succes: ["Succès du donjon : Collant, Premier, Compagnon, Spécial « Jeux d'ombres » (aucune attaque à distance sur les ennemis), Duo (26 tours)."],
    avertissements: [
      "Dans les données du jeu, Ombre possède un sort, Paranoïa, qu'aucun guide consulté ne décrit : la mécanique a pu changer depuis. Si tu l'as vu en combat, dis-le aux officiers.",
      "L'exception des échanges de place pour la Silhouette ne vient que d'une seule source, ancienne.",
    ],
  },
  {
    slug: "anerice-la-shushess", donjon: "Manoir des Katrepat", niveau: 200, position: "[-14,25]", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Dans les Terres Désacrées, juste à côté du zaap des Terres Désacrées en [-15,25].",
      "Clef par le trousseau, ou à fabriquer (dont 5 ressources de chacune des goules de la zone).",
    ],
    mecaniques: [
      "Les goules avancent d'une case vers vous à votre première attaque sur l'une d'elles, à chaque tour.",
      "Anerice n'est pas invulnérable, mais elle réduit vos dommages de 90 %.",
      "Goulification (portée 1 à 3) : elle transforme sa cible en Goule jusqu'à la fin du combat, et la Goule subit 50 % de dommages en plus.",
      "Un tour sur deux, elle peut échanger sa place avec un personnage transformé, puis frapper en zone autour de lui.",
      "La Kérigoule partage les dommages reçus entre tous les monstres pendant 2 tours.",
    ],
    delock: [
      "Faites-vous goulifier : chaque personnage transformé retire 10 points à sa réduction (80 % avec un, 60 % avec trois).",
      "Autre voie : jouer à distance avec beaucoup d'érosion, sans prendre le risque de la transformation.",
    ],
    strategie: [
      "Tuez la Kérigoule en premier : son partage de dégâts rallonge tout le combat.",
      "Tenez les goules à distance (retrait de PM, poussées).",
      "Une fois transformés, écartez-vous les uns des autres : elle arrive au contact d'une Goule et frappe tout autour.",
      "Le Gouligane rend Pacifiste : gardez du désenvoûtement.",
    ],
    succes: ["Succès du donjon : Prudent, Premier, Compagnon, Spécial « Qu'est-ce qu'elle a ma goule ? » (chaque allié goulifié au moins une fois), Duo (40 tours)."],
    avertissements: ["Les chiffres de la réduction (90 %, 10 points par Goule) n'ont été trouvés que dans un guide d'avant Dofus 3 : à vérifier en jeu."],
  },
  {
    slug: "chaloeil", donjon: "Défi du Chalœil", niveau: 200, position: "Temple de Kérubim (Écaflipus)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Dans le Temple de Kérubim, dans la dimension Écaflipus, où l'on entre par une chasse au portail.",
      "Pas de trousseau : la clef se fabrique (Carte du Grand Jeu et une ressource de chaque monstre de la zone).",
    ],
    mecaniques: [
      "Une seule salle : 5 vagues, une tous les 5 tours (tours 1, 6, 11, 16, 21). Vider une vague fait venir la suivante, à l'emplacement de départ des monstres.",
      "Le Chalœil est invulnérable jusqu'au tour 21.",
      "Le sol est couvert de dés de 1 à 6 : finir son tour sur une case donne l'état de son chiffre. Quand un monstre commence son tour sur le même chiffre qu'un personnage, celui-ci prend 200 à 300 dégâts Neutre et 20 % d'érosion (le Chalœil ne le fait pas).",
      "Gros Yeux, tous les 3 tours : le Chalœil et ses alliés gagnent un bonus selon le chiffre de leur case (esquive PM, portée, Indéplaçable, PM, soin, puissance).",
      "À la fin de son tour, des dés (obstacles) et des glyphes blancs apparaissent sur toutes les cases du même chiffre que la sienne. Passer sur un glyphe blanc soigne.",
      "Chaque monstre a une roulette : un bonus qui tourne à chaque tour dans un ordre fixe, dont 100 % de critique un tour sur trois. Leurs sorts ont des effets en plus sur un critique.",
      "Farce et Attrape : jusqu'à 3 fois par tour, il échange sa place avec une cible, alliée ou ennemie. L'état Pesanteur l'en empêche.",
    ],
    delock: ["Rien à faire : il redevient vulnérable de lui-même au tour 21. D'ici là, il faut tenir face aux vagues."],
    strategie: [
      "Avant de finir votre tour, comparez le chiffre de votre case à celui des monstres proches.",
      "Retirez-lui des PM, ou bloquez-le dans un coin avec un double de Sram ou un personnage résistant.",
      "Servez-vous des glyphes blancs pour vous soigner.",
      "Repérez le tour où un monstre a 100 % de critique : ses sorts font plus de choses ce tour-là.",
    ],
    succes: ["Succès du donjon : Liberté, Prudent, Compagnon, Spécial « Les bons comptes font les bons ennemis » (finir chaque tour sur le chiffre de sa case de départ), Trio (80 tours)."],
    avertissements: ["L'invulnérabilité jusqu'au tour 21 et le détail des bonus de Gros Yeux n'ont été trouvés que dans un guide d'avant Dofus 3 : à vérifier en jeu."],
  },
  {
    slug: "larve-de-koutoulou", donjon: "Temple de Koutoulou", niveau: 200, position: "[27,26]", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Sur le Plateau de R'lyugluglu, dans les Abysses de Sufokia. Le plus rapide : le zaapi du quai de la voie du temple, en [22,23].",
      "Clef par le trousseau, ou à fabriquer (tentacules de Grofond et de N'yalg, yeux de Shokkoth et ressources marines).",
    ],
    mecaniques: [
      "La Folie monte à chaque coup reçu des monstres, sur 10 niveaux : dès 2, vos coups renvoient des dégâts autour de vous ; dès 4, vos soins reçus sont divisés par deux ; dès 6, vous subissez le double de dégâts ; à 10, le personnage meurt. Elle redescend quand vous n'êtes pas frappé.",
      "À chaque tour, la Larve téléporte à son contact tout personnage en ligne de vue directe avec elle (pas les invocations).",
      "Chaque fois que vous frappez un monstre, votre personnage échange sa place avec l'entité la plus proche, alliée ou ennemie (hors invocations).",
      "Échanger deux fois avec le même monstre le rend invulnérable jusqu'à votre prochain tour ; deux fois avec un allié, et vos deux Folies montent.",
      "Le Shokkoth crée des doubles de vos personnages qui partagent vos dégâts. On peut les tuer en les poussant contre un monstre.",
    ],
    delock: ["Pas d'invulnérabilité de départ : tout se joue sur le placement."],
    strategie: [
      "Finissez chaque tour caché derrière un obstacle, un monstre ou une invocation.",
      "Avec du retrait de PM et du placement, coincez la Larve dans un coin derrière des obstacles.",
      "Avant de frapper, regardez qui est le plus proche de vous : c'est avec lui que vous changerez de place.",
      "Tuez d'abord le Klûtiste (zone, retrait de PM, bonus aux alliés), puis le Shokkoth.",
      "Quand votre Folie monte, éloignez-vous du combat pour la faire redescendre.",
    ],
    succes: ["Succès du donjon : Prudent, Hardi, Compagnon, Spécial « Chaises musicales » (un ennemi doit échanger avec un allié entre chacun de ses tours), Duo (40 tours)."],
    avertissements: ["La Folie et les échanges de place n'ont été trouvés que dans un guide d'avant Dofus 3 (mis à jour en 2020) : les paliers sont à vérifier en jeu."],
  },
];

const simple = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Guide d'un donjon, retrouvé par le nom du donjon ou par celui de son boss (les orthographes varient d'une source à l'autre). */
export function guideDuDonjon(donjon?: string, boss?: string): GuideBoss | undefined {
  return GUIDES_BOSS.find((g) => (!!donjon && simple(g.donjon) === simple(donjon)) || (!!boss && g.slug === simple(boss)));
}

/** Adresse qui ouvre directement la fiche du boss dans Donjons > Guides. */
export const lienGuide = (g: GuideBoss) => `/donjons?onglet=guides&boss=${g.slug}`;
