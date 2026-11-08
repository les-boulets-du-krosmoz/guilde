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
    slug: "ben-le-ripate", donjon: "Épave du Grolandais violent", niveau: 150, position: "Frigost", dpln: `${DPLN}donjons.html`, statut: "brouillon",
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
    slug: "kolosso", donjon: "Cavernes du Kolosso", niveau: 190, position: "Frigost", dpln: `${DPLN}donjons.html`, statut: "brouillon",
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
];
