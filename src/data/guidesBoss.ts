// Guides des boss (page Donjons > Guides). Textes rédigés par la guilde, dans nos mots : les mécaniques sont des faits
// de jeu, vérifiés en croisant plusieurs sources ; le lien « Guide détaillé » renvoie vers Dofus pour les Noobs.
// statut « relu » : validé par un membre qui a fait le boss ; « brouillon » : première version à faire relire ; « a-rediger » : fiche du jeu seule.
// « {os} » juste après le nom d'un monstre affiche une tête de mort : il peut tuer un personnage d'un coup.
import { STATS_BOSS } from "./bossStats";

export type GuideBoss = {
  slug: string; // image public/icones/boss/<slug>.webp et caractéristiques dans bossStats.ts
  /** Nom affiché, quand ce n'est pas celui du monstre de la fiche du jeu (ex. un combat contre plusieurs boss). */
  nom?: string;
  donjon: string;
  niveau: number;
  /** Zone de jeu de l'entrée (données du jeu : subareas puis areas), sert au regroupement et à la recherche. */
  zone: string;
  position: string;
  dpln: string;
  statut: "relu" | "brouillon" | "a-rediger";
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
  /** Encart affiché sous les mécaniques : tableau à deux colonnes, étapes, schéma (public/guides) et remarques. */
  encart?: { titre: string; colonnes?: [string, string]; lignes?: [string, string][]; etapes?: string[]; image?: { src: string; alt: string; legende?: string }; notes?: string[] };
};

const DPLN = "https://www.dofuspourlesnoobs.com/";

/** Nom affiché d'une fiche : son nom propre, sinon celui du monstre dont elle montre les caractéristiques. */
export const nomDuGuide = (g: GuideBoss) => g.nom ?? STATS_BOSS[g.slug]?.nom ?? g.slug;

export const GUIDES_BOSS: GuideBoss[] = [
  {
    slug: "tal-kasha", donjon: "Chambre de Tal Kasha", niveau: 200, zone: "Saharach", position: "[12,-77]", dpln: `${DPLN}chambre-de-tal-kasha.html`, statut: "brouillon",
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
      "Focus : déplacez-les sans les frapper (libération, poussées sans dommages) et retirez-leur des PM pour les tenir à distance. Une fois Tal Kasha vulnérable, on ne peut plus toucher aux autres.",
      "Statue : beaucoup de déplacement et d'entrave chez les alliés, pour bouger les ennemis plutôt que soi.",
      "Duo (40 tours) : il faut des dommages, et du retrait de PM à distance pour la placer vite sur les glyphes.",
    ],
  },
  {
    slug: "missiz-frizz", donjon: "Forgefroide de Missiz Frizz", niveau: 200, zone: "Frigost", position: "[-70,-81]", dpln: `${DPLN}forgefroide-de-missiz-frizz.html`, statut: "brouillon",
    acces: ["Clef par le trousseau, ou à fabriquer (avec le Sang de Ventrublion des salles du donjon)."],
    mecaniques: [
      "Missiz Frizz et ses monstres sont invulnérables et lourds (impossibles à porter).",
      "Au début de chacun de vos tours, votre personnage pose un piège sur sa case : quand il se déclenche, il repousse d'une case les entités autour.",
      "Quand une entité est poussée (monstre ou personnage), elle repousse à son tour ce qui l'entoure, se soigne (15 % de sa vie) et retire pendant un tour l'invulnérabilité des monstres autour d'elle.",
      "Frapper Missiz Frizz lui fait attirer vos personnages proches et les rend Surgelés : sur un personnage Surgelé, son sort Sang froid vole de la vie.",
      "Vos personnages ne peuvent pas rester invisibles, et subir des dommages de poussée les érode et leur inflige des dommages Neutre.",
    ],
    delock: [
      "Poussez une entité tout près de la cible : la cible, comme les autres monstres autour de l'entité poussée, perd son invulnérabilité pendant un tour.",
      "Pousser un de vos propres personnages à côté de la cible marche aussi, et c'est lui qui se soigne plutôt qu'un monstre. Faites-le sans collision : des dommages de poussée l'éroderaient.",
      "Les pièges de début de tour font le travail quand un monstre y entre : placez-vous à la fin de votre tour en pensant au suivant.",
    ],
    strategie: [
      "Préparez chaque délock pour frapper aussitôt avec ceux qui jouent ensuite : l'invulnérabilité revient au bout d'un tour.",
      "Ne frappez Missiz Frizz que quand l'équipe est prête : chaque attaque attire vos personnages proches autour d'elle et les rend Surgelés.",
      "Évitez les dommages de poussée sur vos personnages : poussez dans le vide, jamais contre un obstacle ou quelqu'un.",
      "Éliminez ses monstres d'abord, et finissez par Missiz Frizz.",
    ],
    succes: [
      "Succès du donjon : Nomade, Collant, Duo (40 tours), Compagnon (à 4 au moins, avec Rapiat, Rapine, Ougicle ou Hulkrap), Spécial « Attention, sol glissant » (aucun allié ne doit subir de dommages de poussée).",
      "Pensez à capturer la salle 4 : elle sert pour les Métal Éternel de La machine à démonter le temps.",
    ],
    avertissements: ["Fiche revue d'après la description du combat dans le jeu (mise à jour 3.7). Le soin de 15 % vient des données du jeu : à vérifier en combat."],
  },
  {
    slug: "nileza", donjon: "Laboratoire de Nileza", niveau: 200, zone: "Frigost", position: "[-61,-74]", dpln: `${DPLN}laboratoire-de-nileza.html`, statut: "brouillon",
    acces: ["Dans les Jardins d'Hiver (château de Harebourg). Clef par le trousseau, ou à fabriquer avec les ressources des Alchillusions du donjon."],
    mecaniques: [
      "Quand on le frappe à distance, il échange sa place avec l'attaquant et laisse sur sa case de départ un glyphe qui blesse vos personnages (selon leur vie érodée) et leur retire du tacle et de la fuite. Le frapper au contact ne déclenche rien de tout ça.",
      "À son arrivée, il érode et inflige des dommages Air à tout ce qui est à 2 cases autour de lui, ses monstres compris, selon les dommages qu'il vient de subir.",
      "Avec Nileza{os}, un personnage qui finit son tour au contact d'un allié tue cet allié (les invocations ne comptent pas).",
      "Au début de chaque tour, il donne un état à vos personnages selon sa vie : Acide (75 % et plus), plus de dommages mais attaquer avec un sort baisse vos résistances ; Amer (40 à 74 %), plus de soins mais soigner vous blesse ; Aigre (moins de 40 %), plus de critiques mais chaque critique vous retire des PM.",
      "Tous les 2 tours, l'étau se resserre : perte de fuite (tour 2), puis de tacle (tour 4), Pesanteur (tour 6), et Insoignable à partir du tour 8.",
      "Les personnages trop loin de lui deviennent Pacifistes pendant 2 tours, et la distance tolérée diminue tous les 2 tours : 12 cases au tour 2, puis 10, 8 et 6.",
      "Il frappe jusqu'à 12 cases et repousse de 3, d'autant plus fort qu'il a perdu de la vie.",
    ],
    delock: ["Nileza n'est pas invulnérable : pas de délock. Tout l'enjeu est de choisir d'où, et comment, on le frappe."],
    strategie: [
      "À distance, retournez sa mécanique contre son camp : frappez-le depuis une case entourée de ses monstres. Il atterrit à votre place et sa zone de 2 cases les blesse. Vérifiez avant où vous atterrissez.",
      "Prévenez toute l'équipe : ne finissez jamais votre tour au contact d'un allié.",
      "Restez de plus en plus près de lui à mesure que les tours passent, sans vous coller entre vous.",
      "Finissez vite : à partir du tour 8, plus personne ne peut être soigné. Sous Amer, évitez de soigner.",
    ],
    succes: [
      "Succès du donjon : Prudent, Dernier, Duo (40 tours), Compagnon (à 4 au moins, avec Mirh, Rekto Topi, Traçon ou Logram), Spécial « Alchi-pludent » (aucun allié ne doit devenir Pacifiste).",
    ],
    avertissements: ["Fiche revue d'après la description du combat dans le jeu (mise à jour 3.7). Les distances du Pacifiste (12, 10, 8 puis 6 cases) viennent des données du jeu : à vérifier en combat."],
  },
  {
    slug: "sylargh", donjon: "Transporteur de Sylargh", niveau: 200, zone: "Frigost", position: "[-53,-84]", dpln: `${DPLN}transporteur-de-sylargh.html`, statut: "brouillon",
    mecaniques: [
      "Le Sylargh est invulnérable et lourd.",
      "Chaque monstre tué revient en invocation au début du tour du monstre suivant, entre 6 et 10 cases de ce monstre, avec 10 % de sa vie. Il gagne des dommages, devient Indéplaçable et passe son prochain tour.",
      "Quand ce monstre ressuscité meurt à nouveau, il explose : dommages Feu à tout ce qui est à 5 cases autour (vos personnages compris), bonus de dommages pour tous, et mort des autres monstres ressuscités dans la zone.",
      "Au même moment, tous vos personnages qui ont au moins 90 % de leur vie deviennent Pacifistes pendant un tour.",
    ],
    delock: [
      "Tuez un monstre ressuscité pendant que le Sylargh se trouve entre 5 et 10 cases de lui : le Sylargh perd son invulnérabilité pendant un tour.",
      "Ceux qui vont le frapper doivent avoir moins de 90 % de leur vie à ce moment-là, sinon ils sont Pacifistes.",
    ],
    strategie: [
      "Avant de tuer un ressuscité, vérifiez trois choses : le Sylargh entre 5 et 10 cases de lui, vos personnages à plus de 5 cases (l'explosion), et les frappeurs sous 90 % de vie.",
      "L'explosion achève aussi les autres ressuscités autour : pratique pour nettoyer, mais gardez-en un sous la main pour le délock suivant.",
      "Choisissez la cible du kill en fonction du placement de l'équipe, plutôt que l'inverse.",
    ],
    succes: [
      "Succès du donjon : Misanthrope, Barbare, Duo (40 tours), Compagnon (à 4 au moins, avec Haku, Manitou Zoth, Karotz, Grouillot ou Phong Huss), Spécial « Brikolère » (ne jamais achever un ressuscité à 5 cases ou moins d'un allié ou d'un autre monstre).",
      "Brikolère : le délock reste possible, mais le Sylargh doit être entre 6 et 10 cases du ressuscité, et personne d'autre à 5 cases ou moins.",
    ],
    avertissements: ["Fiche revue d'après la description du combat dans le jeu (mise à jour 3.7) : l'ancienne règle de distance pour le Pacifiste n'existe plus. La durée d'un tour (vulnérabilité, Pacifiste) vient des données du jeu."],
  },
  {
    slug: "klime", donjon: "Salons privés de Klime", niveau: 200, zone: "Frigost", position: "[-63,-86]", dpln: `${DPLN}salons-priveacutes-de-klime.html`, statut: "brouillon",
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
      "Méfiez-vous de Cuir à feu doux : ne restez pas sur la case de départ d'un ennemi à la fin de votre tour.",
    ],
  },
  {
    slug: "comte-harebourg", donjon: "Donjon du Comte Harebourg", niveau: 200, zone: "Frigost", position: "[-61,-79]", dpln: `${DPLN}donjon-du-comte-harebourg.html`, statut: "brouillon",
    acces: ["Au sommet de la Tour de la Clepsydre, au centre de Frigost III. C'est le dernier donjon avant le Dofus des Glaces."],
    mecaniques: [
      "Le Comte Harebourg est invulnérable. Il change d'état à chaque tour, et c'est cet état qui décide de qui est téléporté quand on le frappe.",
      "Tours impairs : frapper le Comte téléporte l'attaquant en symétrie par rapport à lui. Si la case est occupée, l'attaquant et l'occupant prennent des dommages Feu.",
      "Tours pairs : frapper le Comte le téléporte, lui, en symétrie par rapport à l'attaquant.",
      "Le Comte Harebourg{os} tue toute l'équipe si une de ces téléportations finit dans le décor : regardez la case d'arrivée avant chaque coup.",
      "À chaque début de tour, il pose un glyphe : un personnage qui commence son tour dedans meurt.",
      "Confusion horaire : au début de votre tour, vos sorts et armes sont déviés par une rotation autour de votre personnage, qui dépend de vos PV (voir ci-dessous).",
    ],
    encart: {
      titre: "Viser malgré la confusion",
      colonnes: ["Vos PV au début du tour", "Déviation de vos sorts"],
      lignes: [
        ["90 % et plus", "¼ de tour horaire"],
        ["75 à 89 %", "¼ de tour anti-horaire"],
        ["45 à 74 %", "½ tour"],
        ["30 à 44 %", "¾ de tour horaire, soit ¼ de tour anti-horaire"],
        ["Moins de 30 %", "¾ de tour anti-horaire, soit ¼ de tour horaire"],
      ],
      etapes: [
        "Placez-vous en ligne ou en diagonale avec votre cible : la case à viser est alors facile à repérer.",
        "Imaginez un cercle autour de vous, de rayon la distance jusqu'à la cible.",
        "Sur ce cercle, visez la case qui retombe sur la cible après la rotation, donc en tournant dans l'autre sens. Avec un ¼ de tour horaire et un monstre à 3 cases en haut à droite, visez 3 cases en haut à gauche.",
        "La ligne de vue compte aussi sur la case où le sort arrive : sans elle, le sort fait un échec critique.",
      ],
      image: { src: "/guides/harebourg-confusion.svg", alt: "Schéma : le personnage vise la case à 3 cases en haut à gauche ; après un quart de tour horaire, le sort arrive sur le monstre à 3 cases en haut à droite.", legende: "Exemple avec un ¼ de tour horaire : même distance, un quart de tour avant la cible." },
      notes: [
        "La déviation est fixée au début de votre tour : un soin qui vous fait changer de tranche ne la change pas.",
        "Chaque coup au corps à corps sur un monstre ajoute un ¼ de tour horaire à votre déviation.",
        "Les invocations ne sont pas déviées. Un sort qui passe par un portail Éliotrope garde sa déviation.",
      ],
    },
    delock: [
      "En tour pair, frappez le Comte avec un allié placé sur sa case d'arrivée, en symétrie par rapport à vous : il échange sa place avec lui et perd son invulnérabilité. Le Comte et l'allié gagnent 100 dommages pendant un tour.",
      "Il reste vulnérable jusqu'au début du prochain tour de celui qui l'a délocké. Le délock n'est possible qu'un tour sur deux.",
      "Une invocation sur la case d'arrivée délocke aussi, mais elle explose : elle tue vos personnages à 3 cases ou moins d'elle.",
    ],
    strategie: [
      "Placez en symétrie l'allié qui joue juste après le Comte : le Comte sera encore vulnérable à son tour suivant, et cet allié pourra le frapper.",
      "Faites frapper les monstres par vos invocations : elles ne sont pas déviées.",
    ],
    succes: [
      "Succès du donjon : Versatile, Statue et Duo (40 tours).",
      "Statue : ne frappez le Comte qu'en tour pair. En tour impair, c'est vous qui êtes téléporté, donc vous ne finissez pas votre tour sur votre case de départ.",
    ],
  },
  {
    slug: "kimbo", donjon: "Canopée du Kimbo", niveau: 160, zone: "Île d'Otomaï", position: "[-54,16]", dpln: `${DPLN}canopeacutee-du-kimbo.html`, statut: "brouillon",
    mecaniques: [
      "Ce sont les Disciples qui posent les glyphes, chacun à son tour.",
      "Un glyphe quadrille toute la carte, comme un damier : un glyphe impair couvre toutes les cases impaires, un glyphe pair toutes les cases paires. Impossible d'y échapper autrement qu'en étant sur une case de l'autre parité.",
      "L'élément de vos coups sur le Kimbo décide du type de glyphe : Terre ou Eau donnent un glyphe impair, Feu ou Air un glyphe pair. Le Neutre ne fait rien.",
      "Seul le dernier élément joué compte : frapper Eau puis Feu remplace l'effet de l'Eau par celui du Feu.",
      "Le glyphe reste en place tant qu'on continue de frapper avec un élément de la même paire.",
      "Un allié qui commence son tour sur le même glyphe que le Kimbo{os} meurt d'un coup.",
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
    slug: "merkator", donjon: "Aquadôme de Merkator", niveau: 200, zone: "Baie de Sufokia", position: "[21,18]", dpln: `${DPLN}aquadocircme-de-merkator.html`, statut: "brouillon",
    acces: [
      "Dans la Base Abyssale : le succès d'exploration « Salles des Abîmes » permet d'être téléporté directement vers le donjon.",
      "Sinon, il faut traverser les trois étages (ascenseurs, leviers) en consommant des Piles Steamer (une quinzaine). Les Salles des Courants demandent de se coordonner à plusieurs.",
      "Remettez ensuite la clef (ou le trousseau) à Théo Dolith pour entrer.",
    ],
    mecaniques: [
      "Merkator et ses monstres sont Indéplaçables.",
      "Il encaisse moins les attaques à distance, et chaque coup reçu à distance augmente ses dommages, sans limite.",
      "Frapper au contact un de ses monstres (ou lui) déclenche des poussées forcées autour de la cible : vos personnages placés en croix autour d'elle sont repoussés de 3 cases, et ses monstres placés en diagonale aussi.",
      "Tenter de retirer des PM à l'un d'eux lui fait voler de la vie (Feu) à l'attaquant.",
      "Au contact, il retire la moitié de la vie de sa cible pendant un tour et la rend Pesanteur : elle devient une proie facile pour ses monstres.",
      "À partir du tour 7, puis tous les 5 tours, il ressuscite le dernier monstre tué avec la moitié de sa vie.",
    ],
    delock: ["Merkator n'est pas invulnérable : tout se joue sur la distance à laquelle on le frappe."],
    strategie: [
      "Frappez-le au contact : à distance, vous perdez des dégâts et il devient plus fort à chaque coup.",
      "Avant de frapper au contact, regardez où la poussée vous enverra : contre un obstacle ou quelqu'un, vous prenez des dommages de poussée.",
      "Pas de retrait de PM sur ses monstres : chaque tentative les soigne à vos dépens.",
      "Ne laissez pas un personnage à moitié vie à portée de ses monstres : protégez-le ou éloignez-le.",
    ],
    succes: ["Succès du donjon : Mystique, Dernier, Duo (40 tours), Compagnon (à 4 au moins, avec Grüt, Gobeuf, Turyé ou Piggy Paupe), Spécial « Voyez, il y a du monde » (chaque allié commence ou finit son tour en ligne d'un ennemi)."],
    avertissements: ["Fiche revue d'après la description du combat dans le jeu (mise à jour 3.7). La poussée de 3 cases et la résurrection (tour 7, puis tous les 5 tours) viennent des données du jeu : à vérifier en combat."],
  },
  {
    slug: "vortex", donjon: "Œil de Vortex", niveau: 200, zone: "Xélorium", position: "Lendemains incertains", dpln: `${DPLN}oeil-de-vortex.html`, statut: "brouillon",
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
    slug: "solar", donjon: "Tour de Solar", niveau: 200, zone: "Landes de Sidimote", position: "[-31,15]", dpln: `${DPLN}tour-de-solar.html`, statut: "brouillon",
    mecaniques: [
      "Tant que le Solar est en vie, ses alliés reviennent à la vie.",
      "Quand le Solar{os} meurt, il tue toute votre équipe d'un coup… sauf s'il était sous Nécronyx.",
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
    slug: "capitaine-meno", donjon: "Vaisseau du Capitaine Meno", niveau: 200, zone: "Profondeurs de Sufokia", position: "[24,27]", dpln: `${DPLN}vaisseau-du-capitaine-meno.html`, statut: "brouillon",
    acces: ["Clef par le trousseau, ou à fabriquer (Baves de Mol Usk, Pinces de Crabe Yoloniste, Écailles de Gambaf, et des ressources de la mer). Le vaisseau est hors de l'eau : montures autorisées."],
    mecaniques: [
      "Il réduit de moitié les dommages qu'il subit.",
      "Ses monstres sont invulnérables. Il en invoque de nouveaux à chaque tour, sur des cases fixes. Chacun perd 1 PM par tour et meurt au bout de 4 tours.",
      "Chaque fois qu'un de vos personnages subit des dommages, le Capitaine se soigne d'autant.",
      "Il pose des glyphes sur vos personnages : au début de son tour, chacun inflige des dommages Feu autour de lui et dévoile les invisibles ; celui qui est dessus reçoit un bouclier.",
      "À partir de la fin de son 2e tour, les dommages finaux augmentent à chaque tour, sans limite.",
    ],
    delock: ["Le Capitaine Meno n'est pas invulnérable : pas de délock."],
    strategie: [
      "Concentrez tous les dégâts sur le Capitaine : ses monstres sont invulnérables et meurent seuls au bout de 4 tours. Tenez-les à distance plutôt que de les frapper.",
      "Écartez-vous des personnages qui portent un de ses glyphes : les dommages Feu touchent ceux qui sont autour, et chaque dommage reçu le soigne.",
      "Placement prudent, blocages et réduction de dommages valent plus que le soin ici : un coup évité, c'est de la vie qu'il ne récupère pas.",
    ],
    succes: [
      "Succès du donjon : Prudent, Blitzkrieg, Duo (40 tours), Compagnon (à 4 au moins, avec un Riktus : fine-lame, archer, baroudeur ou ensorceleuse), Spécial « Parfum de mutinerie » (chaque allié finit son tour en ligne d'un autre allié).",
      "Blitzkrieg : ne frappez jamais ses monstres, et le Capitaine doit mourir dans le tour où on le frappe pour la première fois.",
    ],
    avertissements: [
      "Fiche revue d'après la description du combat dans le jeu (mise à jour 3.7) : le Meno des anciens guides (Conducteur, Foudre marine) n'existe plus.",
      "La réduction de moitié vient des données du jeu. Le jeu dit aussi que le Capitaine « augmente les dommages finaux des alliés » à partir de son 2e tour : vos personnages ou ses monstres ? À vérifier en combat.",
    ],
  },
  {
    slug: "ilyzaelle", donjon: "Belvédère d'Ilyzaelle", niveau: 200, zone: "Frigost", position: "[-72,-77]", dpln: `${DPLN}belvedere-d-ilyzaelle.html`, statut: "brouillon",
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
    slug: "dantinea", donjon: "Palais de Dantinéa", niveau: 200, zone: "Profondeurs de Sufokia", position: "Sufokia (profondeurs)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    mecaniques: [
      "Au début du combat, Dantinéa invoque un Grokillage par personnage, sur des cases fixes. Chacun se lie à un personnage (même numéro que lui).",
      "Tant que votre Grokillage est en vie, vos dommages sont réduits et vous perdez des PM au début de chaque tour (non esquivables).",
      "Tous les 5 tours, Dantinéa{os} tue chaque personnage encore lié à un Grokillage, puis en réinvoque aux mêmes endroits.",
      "À chaque début de tour, les personnages alignés avec un Grokillage subissent des dommages Eau.",
      "Tous les 2 tours, elle peut échanger sa place avec un Grokillage, jusqu'à 6 cases.",
    ],
    delock: [
      "Dantinéa n'est pas invulnérable : l'urgence, ce sont les Grokillages.",
      "Tuez le vôtre avant le tour 5, sinon vous mourez. Puis recommencez avec le nouveau avant le tour 10, et ainsi de suite.",
    ],
    strategie: [
      "Repérez dès le placement le Grokillage qui porte votre numéro.",
      "Commencez par les Grokillages, avant Dantinéa et ses gardes, et aidez un allié en retard : au tour 5, il mourrait.",
      "Ne finissez pas votre tour aligné avec un Grokillage.",
    ],
    succes: [
      "Succès du donjon : Statue, Dernier, Duo (40 tours), Compagnon (à 4 au moins, avec Krosmoglob, Korbax, Masse ou le Chevalier d'Astrub), Spécial « Chasse aux coquillages » (chaque Grokillage ne doit être blessé que par le personnage auquel il est lié).",
      "Statue : vous finissez chaque tour sur votre case de départ ; choisissez-la à portée de votre Grokillage et hors de ses lignes.",
    ],
    avertissements: ["Fiche revue d'après la description du combat dans le jeu (mise à jour 3.7) : les anciens guides ne parlaient pas de la mort au tour 5. L'échange de place avec un Grokillage vient des données du jeu."],
  },
  {
    slug: "protozorreur", donjon: "Ventre de la Baleine", niveau: 200, zone: "Frigost", position: "Roc des Salbatroces (Frigost)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
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
    slug: "ben-le-ripate", donjon: "Épave du Grolandais violent", niveau: 150, zone: "Frigost", position: "Frigost", dpln: `${DPLN}epave-du-grolandais-violent.html`, statut: "brouillon",
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
    slug: "kolosso", donjon: "Cavernes du Kolosso", niveau: 190, zone: "Frigost", position: "[-61,-69]", dpln: `${DPLN}cavernes-du-kolosso.html`, statut: "brouillon",
    acces: [
      "Dans les Crocs de Verre. Le Transporteur Frigostien des Crocs de Verre, en [-66,-65], est le plus proche.",
      "Clef par le trousseau, ou à fabriquer.",
      "Quatre salles à l'entrée : chacune donne la relique du monstre le plus présent dans le combat (Blérauve, Blérice, Blérom, Fleuro).",
      "Avec les quatre reliques, parlez au PNJ de l'entrée pour aller voir le boss.",
    ],
    mecaniques: [
      "Deux boss : le Kolosso et le Professeur Xa (8 600 PV en groupe de 4).",
      "Le Kolosso est invulnérable, et lourd : on ne peut ni le pousser ni l'attirer.",
      "Au contact, il frappe en cône sur toute la carte : tous ceux qui sont derrière sa cible sont touchés aussi.",
      "Il soigne ses monstres, vous attire de 2 cases et vous rend insoignable pendant un tour.",
      "Tous les 3 tours, le Professeur Xa ressuscite le dernier monstre mort avec 25 % de sa vie. Tuer Xa emporte ses invocations avec lui.",
      "Tous les 2 tours, Xa lance un effet sur lui et sur tous ses monstres : chaque coup qu'ils reçoivent leur donne +100 dommages pendant un tour, mais soigne vos personnages autour d'eux.",
      "À la mort de Xa, tous les monstres sont renforcés. Le Kolosso gagne en plus 1 PM, 200 de puissance et un vol de vie à distance (jusqu'à 8 cases) qui retire de la fuite.",
      "Croleur : quand on le frappe, il devient invisible et esquive les coups au corps à corps en reculant d'une case. Tant que Xa vit, il reste gérable ; une fois Xa mort, invisible, il frappe autour de 1 600 en coup critique.",
    ],
    delock: [
      "Une invocation doit infliger des dommages au Kolosso : il perd son invulnérabilité pendant un tour, jusqu'au prochain tour de cette invocation.",
      "Faites-le frapper au contact : c'est la méthode qui marche à coup sûr.",
    ],
    strategie: [
      "Tuez le Croleur, puis le Professeur Xa : le Croleur renforcé par la mort de Xa est le vrai danger du combat.",
      "Si Xa ressuscite le Croleur, ne le retuez pas : tuez Xa, il l'emporte avec lui.",
      "Ne vous placez pas derrière un allié au contact du Kolosso : son cône vous toucherait tous.",
      "Gardez une invocation en vie pour le délock, et préparez les frappes du tour qui suit.",
    ],
    succes: [
      "Succès du donjon : Premier (le Professeur Xa achevé en premier), Duo (20 tours), Spécial « Alliés passés au futur » (aucun allié ne doit recevoir de soin).",
      "Premier : Xa doit mourir en premier. Descendez ses PV, puis achevez-le et tuez le Croleur dans la foulée, juste avant son tour : renforcé, il ne doit pas jouer.",
      "Spécial : pendant l'effet de Xa, chaque coup sur un monstre soigne vos personnages autour de lui. Frappez quand aucun allié n'est près de la cible, ou attendez la fin de l'effet.",
    ],
    avertissements: [
      "Délock par une invocation qui frappe à distance : les données du jeu ne demandent pas le contact, à vérifier en jeu.",
      "Renfort des monstres à la mort de Xa : à chiffrer en jeu (400 dommages d'après d'anciens guides).",
      "Spécial : le soin de l'effet de Xa fait-il échouer le succès, et jusqu'à quelle distance soigne-t-il (5 cases d'après les données) ? À vérifier.",
    ],
  },
  {
    slug: "royalmouth", donjon: "Serre du Royalmouth", niveau: 120, zone: "Frigost", position: "[-84,-49]", dpln: `${DPLN}serre-du-royalmouth.html`, statut: "relu",
    acces: [
      "Dans les Champs de glace, près de la Bourgade : un des deux premiers donjons de Frigost, avec le Mansot Royal.",
      "Clef par le trousseau, ou à fabriquer avec des ressources des Boufmouths.",
    ],
    mecaniques: [
      "Le Royalmouth{os} est invulnérable. Les dommages de poussée avec lui tuent d'un coup, dans les deux sens : le personnage qui lui en inflige (en le poussant contre un obstacle ou un personnage), et le personnage qui en subit en étant poussé contre lui.",
      "Tous les 3 tours, il invoque un Boufmouth de la zone au hasard, près de lui.",
      "Il attire en croix autour de lui (jusqu'à 3 cases) en retirant 1 PM, et vole de la vie au contact.",
      "Boufmouth Légendaire : il repousse de 4 cases. S'il vous envoie contre le Royalmouth, vous mourez.",
    ],
    delock: ["Poussez-le, sans le cogner contre un obstacle ni contre quelqu'un : la poussée lui retire son invulnérabilité."],
    strategie: [
      "Ne poussez jamais un allié contre lui : celui qui pousse et celui qui est poussé meurent tous les deux.",
      "Ne restez pas entre un Boufmouth Légendaire et le Royalmouth : sa poussée vous envoie contre le boss. Tuez le Légendaire en premier.",
    ],
    succes: [
      "Succès du donjon : Premier, Mains propres, Duo (20 tours), Spécial « Parcimonie royale » (un allié qui déplace un ennemi ne doit plus lui infliger de dommages pendant le reste de son tour).",
      "Parcimonie royale : celui qui pousse le Royalmouth pour le délocker ne peut plus le frapper ce tour-là ; ce sont les suivants qui tapent.",
      "Mains propres : les dommages de poussée sont autorisés pour achever, mais pas sur lui.",
    ],
  },
  {
    slug: "mansot-royal", donjon: "Excavation du Mansot Royal", niveau: 140, zone: "Frigost", position: "[-64,-55]", dpln: `${DPLN}excavation-du-mansot-royal.html`, statut: "relu",
    acces: [
      "Au milieu du Lac gelé : un des deux premiers donjons de Frigost, avec le Royalmouth.",
      "Clef par le trousseau, ou à fabriquer avec des ressources des Mansots.",
    ],
    mecaniques: [
      "Le Mansot Royal est invulnérable.",
      "Chaque monstre tué lui donne 1 PM et de la puissance.",
      "À chaque soin reçu par un de vos personnages, ceux qui sont à 2 cases ou moins de lui prennent des dommages. Le vol de vie n'est pas un soin : il ne déclenche rien.",
      "Il vole de la vie et échange sa place avec sa cible (jusqu'à 2 cases). Vulnérable, il frappe d'autant plus fort au contact qu'il a perdu de la vie.",
      "Mamansot : il ressuscite les monstres tués. À éliminer tôt.",
    ],
    delock: [
      "Soignez un de vos personnages placé au contact du Mansot Royal : il devient vulnérable. Le soin doit rendre de la vie : un personnage déjà au maximum ne compte pas, et le vol de vie non plus.",
      "Écartez les autres de ce personnage avant le soin : à 2 cases ou moins de lui, ils prennent des dommages.",
    ],
    strategie: [
      "Placez à son contact un personnage solide et déjà entamé, et soignez-le quand ceux qui jouent ensuite peuvent taper.",
      "Chaque monstre tué le rend plus rapide et plus fort : gardez de quoi le tuer vite une fois vulnérable.",
    ],
    succes: [
      "Succès du donjon : Collant, Dernier, Duo (20 tours), Compagnon (à 4 au moins, avec Inferno, Styx, Mandrin ou Will Killson), Spécial « Privilège royal » (chaque début de tour, le Mansot désigne un allié : lui seul peut être soigné).",
      "Privilège royal : le délock ne marche alors qu'avec le personnage désigné. Amenez-le au contact du Mansot.",
      "Collant : il faut finir son tour collé à un allié, alors qu'un soin blesse ceux qui sont à 2 cases. Soignez pour délocker seulement quand le personnage au contact est isolé.",
    ],
    avertissements: [
      "La mort d'un de vos personnages le renforce-t-elle aussi, comme celle de ses monstres ? Aucune confirmation récente : à vérifier en jeu.",
    ],
  },
  {
    slug: "obsidiantre", donjon: "Hypogée de l'Obsidiantre", niveau: 160, zone: "Frigost", position: "[-71,-83]", dpln: `${DPLN}hypogeacutee-de-lobsidiantre.html`, statut: "relu",
    acces: [
      "Dans les Larmes d'Ouronigride, après Ben le Ripate.",
      "Clef par le trousseau, ou à fabriquer.",
    ],
    mecaniques: [
      "L'Obsidiantre est invulnérable. Tant qu'il l'est, il invoque une Pougnette, puis une autre tous les 3 tours.",
      "Chaque Pougnette{os} explose à son 5e tour : elle tue d'un coup tous vos personnages à plus de 8 cases d'elle, puis meurt.",
      "À distance, il vous repousse de 2 cases (de 4 à 10 cases de lui) et vole de la vie (Feu) jusqu'à 10 cases.",
      "Vulnérable, il frappe d'autant plus fort qu'il a perdu de la vie, échange sa place avec sa cible (1 à 3 cases) et ressuscite le dernier monstre tué avec 10 % de sa vie.",
    ],
    delock: ["Poussez un de vos personnages contre l'Obsidiantre : les dommages de poussée lui retirent son invulnérabilité."],
    strategie: [
      "Restez tous à 8 cases ou moins de chaque Pougnette, et comptez ses tours : elle explose au 5e.",
      "Plus le combat traîne, plus il y a de Pougnettes à surveiller en même temps : délockez tôt.",
      "Le délock demande deux rôles : un personnage qui pousse, et un personnage poussé, aligné avec le boss. Préparez les deux avant le tour.",
    ],
    succes: [
      "Succès du donjon : Premier, Statue, Duo (20 tours), Spécial « À son hypogée » (aucun ennemi ne doit être attiré ni poussé).",
      "Statue : chacun finit ses tours sur sa case de départ, à 8 cases ou moins des Pougnettes. Choisissez bien le placement de départ.",
    ],
  },
  {
    slug: "tengu-givrefoux", donjon: "Tanière Givrefoux", niveau: 170, zone: "Frigost", position: "[-80,-75]", dpln: `${DPLN}taniegravere-givrefoux.html`, statut: "relu",
    acces: [
      "Au fond des Cavernes Givrefoux, dans la Crevasse Perge : la zone s'ouvre une fois l'Obsidiantre vaincu.",
      "Clef par le trousseau, ou à fabriquer avec des ressources des Givrefoux de la zone.",
      "La salle du boss existe en deux versions : le Tengu seul, ou le Tengu avec la Fuji Givrefoux Nourricière, qui prend la place d'une Kami. Chaque boss a ses propres succès.",
    ],
    mecaniques: [
      "Le Tengu est invulnérable. Il ne frappe qu'au contact, mais il attire de 3 cases jusqu'à 8 cases de distance.",
      "Au tour 2, puis tous les 3 tours, il invoque un Yokaï ou un Yomi Givrefoux : toujours celui des deux qui manque sur le terrain.",
      "Yomi : au contact, il retire 10 PM jusqu'à son prochain tour. Yokaï : il se téléporte et frappe autour de lui, d'autant plus fort qu'il a perdu de la vie.",
      "Kami : elle ne frappe qu'en diagonale, jusqu'à 7 cases. Ne finissez pas votre tour dans ses diagonales.",
      "Fuji Givrefoux Nourricière{os} : pas d'invulnérabilité, mais au contact elle tue un personnage et le remplace par un Givrefoux (une fois par tour, pas au premier). Elle frappe aussi en diagonale, à 3 ou 4 cases, avec 20 % d'érosion.",
      "Chaque monstre tué donne 1 PM à tous les monstres pendant un tour (cumulable), et 1 000 dommages au Tengu et à la Fuji. Tous les 3 tours, la Fuji soigne les monstres à 5 cases autour d'elle et leur donne 200 dommages pendant 2 tours.",
    ],
    delock: [
      "Dans le même tour, il faut faire deux choses : pousser un Yokaï en diagonale du Tengu, et frapper à l'arme un Yomi aligné avec le Tengu.",
      "Ce qui compte, c'est que le Yokaï soit transformé : il se transforme quand on le pousse en diagonale du Tengu. Un Yokaï en diagonale mais pas transformé ne délocke rien.",
      "Le Yomi se transforme lui aussi quand il est frappé comme il faut : la transformation montre que le monstre a l'état qui délocke le Tengu. Pas de transformation, pas de délock.",
      "Le Tengu se délocke ensuite à son propre tour de jeu : il change d'apparence et reste vulnérable pendant 4 tours.",
      "Une seule des deux conditions ne suffit pas, et elle est punie : selon celle qui manque, le Tengu{os} tue un personnage au contact ou érode toute l'équipe de 30 % pendant un tour.",
      "Si le Tengu invoque un Yokaï ou un Yomi, gardez l'invocation en vie et tuez le monstre du même type venu avec la salle : un exemplaire de chaque suffit, et il y a moins de monstres sur le terrain.",
    ],
    strategie: [
      "Décidez avant le combat qui pousse le Yokaï et qui frappe le Yomi à l'arme : une arme qui porte à plusieurs cases évite d'aller au contact du Yomi.",
      "Tenez le Yomi à distance en dehors du délock : ses 10 PM retirés bloquent un personnage tout un tour.",
      "Avec la Fuji, restez à plus de 5 cases d'elle et hors de ses diagonales, et davantage quand des monstres viennent de mourir (1 PM de plus par mort).",
      "Elle n'est pas invulnérable : on peut commencer par elle pendant que le Tengu est protégé. Évitez seulement d'enchaîner plusieurs morts juste avant le tour des monstres.",
    ],
    succes: [
      "Succès du Tengu : Premier, Statue, Duo (15 tours), Spécial « Autonomie givrée » (chaque allié finit son tour à plus de 4 cases de tous les autres).",
      "Succès de la Fuji : Dernier, Statue, Duo (20 tours), Compagnon (à 4 au moins, avec Rapiat, Rapine, Ougicle ou Hulkrap), Spécial « Émancipation maternelle » (ne jamais finir son tour en ligne d'un ennemi).",
      "Premier : délockez le Tengu dès les premiers tours, avec le Yokaï et le Yomi de la salle.",
    ],
    avertissements: [
      "Les guides détaillés de ce donjon datent d'avant Dofus 3, sauf pour les invocations du Tengu (revues en 2024) : chiffres à confirmer en jeu.",
      "La durée de vulnérabilité (4 tours) est lue dans les données du jeu : à vérifier en combat.",
      "Attirer le Yokaï (au lieu de le pousser) le transforme-t-il aussi ? Les anciens guides le disent : à vérifier en combat.",
      "« Dans le même tour » : faut-il un seul personnage, ou deux personnages qui jouent avant le Tengu suffisent-ils ? À vérifier en combat.",
      "On ne sait pas ce qui fait tomber sur la version avec la Fuji : si tu le sais, dis-le aux officiers.",
    ],
  },
  {
    slug: "korriandre", donjon: "Antre du Korriandre", niveau: 180, zone: "Frigost", position: "[-73,-69]", dpln: `${DPLN}antre-du-korriandre.html`, statut: "relu",
    acces: [
      "Dans la Forêt Pétrifiée, après le Tengu Givrefoux. Le plus rapide : le Transporteur Frigostien de la Forêt Pétrifiée, en [-76,-66].",
      "Clef par le trousseau, ou à fabriquer avec des ressources des monstres du donjon.",
    ],
    mecaniques: [
      "Au début du tour de chaque personnage, un glyphe apparaît sous lui et reste jusqu'à la fin du combat. Commencer ou finir son tour sur un glyphe tue, invocations et compagnons compris.",
      "Votre case de départ devient donc un glyphe dès votre premier tour : il faut bouger à chaque tour. La place libre diminue avec les tours, mais lentement : on a plusieurs tours de marge.",
      "Le Korriandre est invulnérable au début du combat (changement de la mise à jour 3.6, en juin 2026). Tant qu'il l'est, il invoque une Sporakne : au premier tour, puis au plus tous les 3 tours.",
      "La Sporakne a 5 PM et en perd 1 à chaque coup reçu (3 au plus). Quand on la pousse ou qu'on l'attire, elle repousse d'une case tout ce qui est aligné avec elle.",
      "Le Korriandre attire de 3 cases en ligne (jusqu'à 4 cases de distance) en retirant de la fuite, et frappe d'autant plus fort qu'il a perdu de la vie.",
      "Mérulette : la frapper à distance renvoie tous les joueurs à leur case de départ, c'est-à-dire sur un glyphe. La frapper au contact ne déclenche rien.",
    ],
    delock: [
      "Faites finir son tour à la Sporakne sur un des glyphes de vos personnages : elle meurt, et le Korriandre devient vulnérable jusqu'à la fin du combat.",
      "Elle n'attaque qu'au contact : placez un personnage ou une invocation à côté d'un glyphe, pour qu'elle s'y arrête en venant le frapper. Son coup repousse d'une case : la case derrière l'appât ne doit pas être un glyphe.",
      "La frapper avant son tour lui retire des PM et l'aide à s'arrêter au bon endroit.",
      "Vulnérable, le Korriandre gagne 1 PM et 200 de puissance, n'invoque plus de Sporakne, et peut se téléporter jusqu'à 3 cases tous les 2 tours.",
    ],
    strategie: [
      "Avant de finir votre tour, vérifiez qu'aucune poussée (Sporakne, sorts alliés) ni l'attirance du Korriandre ne peut vous déposer sur un glyphe avant votre prochain tour : vous mourriez en le commençant.",
      "Ne frappez jamais la Mérulette à distance, et prévenez l'équipe avant la salle du boss, où elle est aussi.",
      "Commencez par l'Abrazif (retrait de PA) et la Dramanite (poison selon les PA dépensés).",
      "Le Fongeur frappe toute la carte à partir de 3 cases de lui, mais rien à 2 cases ou moins : restez à son contact et bloquez-le dans un coin, il ne pourra rien faire.",
      "Un des donjons les plus abordables de Frigost pour son niveau, tant que chacun bouge à chaque tour et garde la Mérulette en tête.",
    ],
    succes: [
      "Succès du donjon : Mystique (sorts seulement, pas d'arme), Zombie (exactement 1 PM par tour), Duo (15 tours), Spécial « Pas dans mes pattes » (chaque allié finit son tour à plus de 3 cases d'un autre).",
      "Zombie : un seul PM par tour suffit pour quitter votre glyphe, mais pas pour éviter les poussées. Préparez votre chemin case par case.",
      "Mystique : la Mérulette se frappe toujours au contact, avec un sort.",
    ],
    avertissements: [
      "Le combat a changé en juin 2026 (mise à jour 3.6) : beaucoup de guides décrivent encore un Korriandre sans invulnérabilité. Si ce qui est écrit ici ne colle pas en jeu, dis-le aux officiers.",
      "La Mérulette, l'Abrazif et la Dramanite sont décrits d'après des guides d'avant Dofus 3.",
    ],
  },
  {
    slug: "glourseleste", donjon: "Antichambre des Gloursons", niveau: 190, zone: "Frigost", position: "[-63,-75]", dpln: `${DPLN}antichambre-des-gloursons.html`, statut: "relu",
    acces: [
      "Dans la Ruche des Gloursons, au Mont Torrideau : la zone s'ouvre après les Cavernes du Kolosso.",
      "Clef par le trousseau, ou à fabriquer avec des ressources des Gloursons.",
      "Le vaincre une fois ouvre Frigost III.",
    ],
    mecaniques: [
      "Pendant tout le combat, subir des dommages de poussée tue sur le coup. Le Glourmand{os} pousse : ne restez jamais entre lui et un obstacle ou un allié.",
      "Le Glourséleste est invulnérable.",
      "Le déplacer (poussée, attirance, échange de place) ou lui retirer des PM ou de la portée lui fait ressusciter les monstres déjà tués, avec toute leur vie.",
      "Le Glouragan attire tout ce qui est aligné avec lui quand on le frappe : s'il est aligné avec le Glourséleste, il le déplace, et les monstres reviennent.",
      "Tous les 2 tours, le Glourséleste{os} alourdit ses monstres et leur donne du tacle : quitter le contact de l'un d'eux tue alors, sauf à fuir sans rien perdre.",
      "Il frappe d'autant plus fort au contact qu'il a perdu de la vie, et jusqu'à 5 cases il échange sa place avec sa cible.",
      "Meliglours : il encaisse les coups destinés à un allié et lui donne 1 000 de vitalité.",
    ],
    delock: [
      "Frappez-le au contact : il devient vulnérable pendant le tour du personnage qui l'a frappé, et seulement ce tour-là.",
      "Ce coup repousse de 4 cases tout ce qui est aligné avec lui jusqu'à 4 cases, celui qui frappe compris. Un personnage repoussé contre un obstacle ou une entité prend des dommages de poussée, donc meurt.",
      "Ouvrez avec un coup au contact peu coûteux en PA, avec 4 cases libres derrière vous, puis enchaînez à distance pendant le même tour.",
    ],
    strategie: [
      "Éliminez d'abord ses monstres, en commençant par le Glourmand, sans jamais toucher au Glourséleste.",
      "Prévenez l'équipe : aucun retrait de PM ou de portée sur lui, aucune poussée. Méfiez-vous des sorts de zone qui repoussent ou volent des PM sans qu'on y pense.",
      "Ne frappez pas le Glouragan quand il est aligné avec le Glourséleste.",
      "Avant de vous attaquer à lui, reboostez et protégez l'équipe. L'érosion aide, et ne laissez pas traîner la fin : plus il perd de vie, plus il frappe fort.",
    ],
    succes: [
      "Succès du donjon : Premier, Collant, Duo (20 tours), Compagnon (à 4 au moins, avec Inferno, Styx, Mandrin ou Will Killson), Spécial « Complaisance gloursonne » (aucun retrait de PM, de PA ou de portée et aucun déplacement sur les ennemis).",
      "Premier : il faut le tuer avec tous ses monstres en vie. Prévoyez beaucoup de protection et du désenvoûtement.",
    ],
    avertissements: [
      "Les guides détaillés de ce donjon datent d'avant Dofus 3 : chiffres à confirmer en jeu.",
      "Un seul guide affirme qu'infliger des dommages de poussée tue aussi (et pas seulement en subir) : dans le doute, n'en infligez pas.",
    ],
  },
  {
    slug: "grolloum", donjon: "Donjon de la mine de Sakaï", niveau: 190, zone: "Île de Sakaï", position: "[-52,-45]", dpln: `${DPLN}donjon-de-la-mine-de-sakaiuml.html`, statut: "relu",
    acces: [
      "Dans la Forêt Enneigée de l'île de Sakaï.",
      "Clef par le trousseau, ou à fabriquer avec des ressources des monstres de l'île.",
      "Pour le Dofus des Glaces, Au fion du trou et La machine à démonter le temps demandent toutes deux ce donjon : faites-les en une seule fois.",
    ],
    mecaniques: [
      "Le Grolloum est invulnérable. Lui retirer des PM (même une simple tentative) lui donne d'énormes résistances pendant un tour.",
      "Tous les 2 tours, il ressuscite le dernier monstre tué (de 5 à 10 cases de lui), avec un quart de sa vie. Le monstre revient en Zombi : il mourra avec le Grolloum.",
      "Invulnérable, il frappe au contact sur une ligne (vol de vie Eau, retrait de portée) et se soigne. Vulnérable, il échange sa place avec un personnage à 1 à 4 cases et le frappe (Feu).",
      "Gobus{os} : il ne bouge pas. Dès son deuxième tour, il peut exploser et tue alors d'un coup chaque personnage aligné avec lui, à n'importe quelle distance et même derrière un obstacle. Il meurt dans l'explosion. Le Perkü en invoque d'autres.",
      "Gobosteur et Marôdeur retirent ou volent des PA et des PM ; le Courtilieur attire de 4 cases et frappe fort au contact.",
    ],
    delock: [
      "Tuez un monstre, puis attendez que le Grolloum le ressuscite et lui lance Gelée blanche (le Zombi gagne 200 dommages pendant un tour : vérifiez qu'il a bien l'effet, sinon attendez un tour).",
      "Achevez ce Zombi pendant qu'il est au contact du Grolloum : le Grolloum perd son invulnérabilité pendant un tour.",
      "Recommencez autant de fois qu'il le faut. Pour le placement, déplacez l'un ou l'autre (attirance, poussée, échange de place), mais sans retrait de PM sur le Grolloum.",
    ],
    strategie: [
      "Ne finissez jamais votre tour aligné avec un Gobus. Tuez en priorité le Perkü, qui en invoque.",
      "Gardez sous la main un monstre facile à achever pour le délock, et assez de dégâts pour le tour où le Grolloum est vulnérable : moins de délocks, moins de risques.",
      "Une fois vulnérable, il échange sa place avec un de vos personnages : regardez où il pourrait vous envoyer, surtout dans la ligne d'un Gobus.",
    ],
    succes: [
      "Succès du donjon : Versatile, Blitzkrieg, Duo (28 tours), Compagnon (à 4 au moins, avec Grüt, Gobeuf, Turyé ou Piggy Paupe), Spécial « On voulait l'autre » (ne jamais déplacer un ennemi Zombi).",
      "On voulait l'autre : c'est le Grolloum qu'il faut amener au contact du Zombi, pas l'inverse.",
      "Blitzkrieg : un ennemi frappé doit mourir avant son tour. Pour le Grolloum, tout se joue dans le tour du délock.",
    ],
    avertissements: [
      "Les guides détaillés de ce donjon datent d'avant Dofus 3. La résurrection à un quart de vie est lue dans les données du jeu : à confirmer en combat.",
    ],
  },
  {
    slug: "reine-des-voleurs", donjon: "Trône de la Cour Sombre", niveau: 200, zone: "Srambad", position: "Hauts Ténébreux (Srambad)", dpln: `${DPLN}trone-de-la-cour-sombre.html`, statut: "brouillon",
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
    slug: "dazak-martegel", donjon: "Brasserie du roi Dazak", niveau: 200, zone: "Frigost", position: "[-62,-70]", dpln: `${DPLN}brasserie-du-roi-dazak.html`, statut: "brouillon",
    acces: ["Sous le Mont Torrideau, dans le Royaume des Martegel. Le plus rapide : le Transporteur Frigostien de la Forêt Pétrifiée, en [-76,-66]."],
    mecaniques: [
      "Ses résistances sont trop hautes pour lui faire des dégâts en début de combat (plus de 100 % partout dans les données du jeu).",
      "La Nimpatience monte par stades : à chaque stade, il gagne 1 PM et 50 % de dommages finaux. Au stade 3, il gagne 3 PM pendant 2 tours, et son Coup de Cornes retire 25 % de vitalité à sa cible.",
      "Attention : lui infliger des dommages de poussée lui fait gagner des résistances.",
    ],
    strategie: ["Finissez le combat avant que la Nimpatience ne monte trop."],
    succes: ["Succès du donjon : Premier, Liberté, Score 150 et 200, Duo (40 tours)."],
    avertissements: ["Le moyen de faire baisser ses résistances n'est pas encore renseigné : si tu le connais, dis-le aux officiers."],
  },
  {
    slug: "bethel", donjon: "Tour de Bethel", niveau: 200, zone: "Frigost", position: "Épaves Silencieuses", dpln: `${DPLN}tour-de-bethel.html`, statut: "brouillon",
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
    slug: "xlii", donjon: "Horologium de XLII", niveau: 170, zone: "Xélorium", position: "[7,-2] (Xélorium)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
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
    slug: "toxoliath", donjon: "Cave du Toxoliath", niveau: 180, zone: "Srambad", position: "[8,8] (Srambad)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Dans les Catacombres, deuxième zone de Srambad. On entre dans la dimension par le portail Srambad (chasse au portail).",
      "Pas de trousseau : la clef se fabrique. Les Chitines de Nécrotique de la recette s'échangent contre 2 Orichors au collectionneur de l'avant-poste.",
    ],
    mecaniques: [
      "Une seule salle : 5 vagues, une tous les 5 tours. Vider une vague fait venir la suivante, invulnérable jusqu'à son premier tour.",
      "Chaque coup qu'on lui porte pose sur l'attaquant un poison de 2 tours, cumulable, qui frappe selon les PM utilisés pendant le tour, avant comme après le coup.",
      "Venin Salvateur : tous vos personnages subissent 50 % de dommages en plus.",
      "Les Nécrotiques aussi empoisonnent : le Scoliopode tue les invocations à son contact et rend insoignable celui qui le frappe ; le Lucrane retire la moitié de la vie de sa cible pour un tour.",
    ],
    delock: ["Le Toxoliath n'est pas invulnérable : pas de délock."],
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
    slug: "comte-razof", donjon: "Camp du Comte Razof", niveau: 190, zone: "Nimotopia", position: "[-68,30] (Nimotopia)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
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
    slug: "ombre", donjon: "Pyramide d'Ombre", niveau: 190, zone: "Dimension Obscure", position: "[6,13] (Dimension Obscure)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
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
    ],
    succes: ["Succès du donjon : Collant, Premier, Compagnon, Spécial « Jeux d'ombres » (aucune attaque à distance sur les ennemis), Duo (26 tours)."],
    avertissements: [
      "Dans les données du jeu, Ombre possède un sort, Paranoïa, qu'aucun guide consulté ne décrit : la mécanique a pu changer depuis. Si tu l'as vu en combat, dis-le aux officiers.",
      "L'exception des échanges de place pour la Silhouette ne vient que d'une seule source, ancienne.",
    ],
  },
  {
    slug: "anerice-la-shushess", donjon: "Manoir des Katrepat", niveau: 200, zone: "Landes de Sidimote", position: "[-14,25]", dpln: `${DPLN}donjons.html`, statut: "brouillon",
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
    slug: "chaloeil", donjon: "Défi du Chalœil", niveau: 200, zone: "Écaflipus", position: "Temple de Kérubim (Écaflipus)", dpln: `${DPLN}donjons.html`, statut: "brouillon",
    acces: [
      "Dans le Temple de Kérubim, dans la dimension Écaflipus, où l'on entre par une chasse au portail.",
      "Pas de trousseau : la clef se fabrique (Carte du Grand Jeu et une ressource de chaque monstre de la zone).",
    ],
    mecaniques: [
      "Une seule salle : 5 vagues, une tous les 5 tours (tours 1, 6, 11, 16, 21). Vider une vague fait venir la suivante, à l'emplacement de départ des monstres.",
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
    ],
    succes: ["Succès du donjon : Liberté, Prudent, Compagnon, Spécial « Les bons comptes font les bons ennemis » (finir chaque tour sur le chiffre de sa case de départ), Trio (80 tours)."],
    avertissements: ["L'invulnérabilité jusqu'au tour 21 et le détail des bonus de Gros Yeux n'ont été trouvés que dans un guide d'avant Dofus 3 : à vérifier en jeu."],
  },
  {
    slug: "larve-de-koutoulou", donjon: "Temple de Koutoulou", niveau: 200, zone: "Profondeurs de Sufokia", position: "[27,26]", dpln: `${DPLN}donjons.html`, statut: "brouillon",
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
      "Tuez d'abord le Klûtiste (zone, retrait de PM, bonus aux alliés), puis le Shokkoth.",
      "Quand votre Folie monte, éloignez-vous du combat pour la faire redescendre.",
    ],
    succes: ["Succès du donjon : Prudent, Hardi, Compagnon, Spécial « Chaises musicales » (un ennemi doit échanger avec un allié entre chacun de ses tours), Duo (40 tours)."],
    avertissements: ["La Folie et les échanges de place n'ont été trouvés que dans un guide d'avant Dofus 3 (mis à jour en 2020) : les paliers sont à vérifier en jeu."],
  },
  {
    slug: "guerre", donjon: "Trône de Sang", niveau: 200, zone: "Éliocalypse", position: "[4,-2]", dpln: `${DPLN}trone-de-sang.html`, statut: "brouillon",
    acces: [
      "Dans la Blessure de Guerre, une des dimensions de l'Éliocalypse, ouvertes depuis le Sanctuaire du dernier espoir ([15,-20]).",
      "L'entrée en [4,-2] n'est pas sur la carte du village : montez jusqu'à une grotte, redescendez, puis prenez les escaliers sur la gauche.",
      "Clef par le trousseau, ou à fabriquer avec des ressources de la Blessure de Guerre.",
    ],
    mecaniques: [
      "Guerre est invulnérable tant que des monstres l'accompagnent.",
      "Ensuite, chaque fois qu'elle perd 20 % de sa vie, elle invoque une arme : Épée, puis Marteau, Hache et Morgenstern. Les armes frappent fort dans leur zone, et la Hache lui donne un bouclier tous les 2 tours.",
      "Elle ne se sert de ses armes qu'un tour sur trois.",
      "Olgoth : invulnérable au contact tant qu'il a plus de la moitié de sa vie, puis invulnérable à distance.",
      "Macabrateur : il frappe le personnage le plus proche, à n'importe quelle distance et sans ligne de vue.",
    ],
    delock: ["Tuez tous les monstres qui l'accompagnent : elle devient vulnérable."],
    strategie: [
      "Repoussez Guerre loin de vous pendant que vous nettoyez ses monstres.",
      "Avant de finir votre tour, sortez de la zone des armes.",
    ],
    succes: [
      "Succès du donjon : Zombie, Misanthrope, Duo (40 tours), Spécial « Arsenal total » (aucune arme de Guerre ne doit être achevée ni déplacée par un allié).",
    ],
    avertissements: ["Les guides de ce donjon datent de sa sortie (2019), avant Dofus 3 : à confirmer en jeu, surtout les armes."],
  },
  {
    slug: "servitude", donjon: "Fers de la Tyrannie", niveau: 200, zone: "Éliocalypse", position: "[4,-3]", dpln: `${DPLN}fers-de-la-tyrannie.html`, statut: "brouillon",
    acces: ["Dans la Galère de Servitude, une des dimensions de l'Éliocalypse, ouvertes depuis le Sanctuaire du dernier espoir ([15,-20]). Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Servitude renvoie les dommages qu'on lui inflige (200 %). Pour le frapper sans risque, il faut l'état Traître.",
      "Pour l'avoir, finissez votre tour dans un des glyphes qu'il pose tous les 2 tours. Un glyphe donne une seule attaque sans renvoi.",
      "Il invoque une Armécréante au premier tour, puis tous les 2 tours (6 en vie au maximum).",
      "Une Armécréante qui n'a pris aucun coup direct avant son tour invoque un Iopprimé (2 au maximum chacune).",
      "Quand il tombe à 1 PV, il revient en arrière et se soigne de 25 % de sa vie.",
    ],
    delock: ["Servitude n'est pas invulnérable : pas de délock."],
    strategie: [
      "Touchez chaque Armécréante à chaque tour, même un peu : sinon elle invoque des Iopprimés.",
      "Gardez assez de dégâts pour le dernier quart de sa vie, après son retour en arrière.",
    ],
    succes: [
      "Succès du donjon : Versatile, Focus, Duo (40 tours), Spécial « Bain de foule » (aucune Armécréante invoquée ne doit être achevée par un allié).",
    ],
    avertissements: ["Guides d'avant Dofus 3, complétés avec les changements de la 3.6 (6 Armécréantes au maximum). Le nombre d'attaques par glyphe vient d'un autre combat contre Servitude : à confirmer."],
  },
  {
    slug: "misere", donjon: "Sentence de la Balance", niveau: 200, zone: "Éliocalypse", position: "[1,0]", dpln: `${DPLN}sentence-de-la-balance.html`, statut: "brouillon",
    acces: ["Dans le Désert de Misère, une des dimensions de l'Éliocalypse, ouvertes depuis le Sanctuaire du dernier espoir ([15,-20]). Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Au début, Misère n'est pas sur sa monture. À 50 % de sa vie, elle monte dessus, change de sorts et devient invulnérable pendant un tour entier.",
      "À pied, elle peut renvoyer un personnage à 2 cases sur sa case de début de tour : il devient invulnérable, mais perd 100 PA et 100 PM pendant un tour.",
      "Montée, elle échange sa place avec un personnage à 4 à 8 cases, sans ligne de vue, tous les 3 tours.",
      "Chaque coup de Balance-Fléau lui donne 200 de puissance, cumulables.",
      "Ses monstres volent des caractéristiques à chaque coup, jusqu'à leur mort. Chaque mort laisse une dépouille qu'un monstre proche peut manger pour reprendre de la vie.",
    ],
    delock: ["Pas de délock à faire."],
    strategie: [
      "Tuez-la vite : elle prend de la puissance à chaque coup de Balance-Fléau.",
      "Préparez le passage à 50 % : pendant son tour d'invulnérabilité, replacez-vous et soignez.",
      "Tuez ses monstres loin des autres, pour qu'ils ne puissent pas manger les dépouilles.",
    ],
    succes: ["Succès du donjon : Hardi, Mains propres, Duo (40 tours), Spécial « Abjecte opulence » (Misère achevée en premier, et dans l'état Collecte au moins une fois par tour)."],
    avertissements: ["Guides d'avant Dofus 3, en partie faits sur la version bêta : à confirmer en jeu (dépouilles, invulnérabilité au début du combat)."],
  },
  {
    slug: "corruption", donjon: "Arbre de Mort", niveau: 200, zone: "Éliocalypse", position: "[4,0]", dpln: `${DPLN}arbre-de-mort.html`, statut: "brouillon",
    acces: ["Dans le Royaume Corrompu, une des dimensions de l'Éliocalypse, ouvertes depuis le Sanctuaire du dernier espoir ([15,-20]). Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Corruption a l'état Kissiphrot Sipike : le frapper vous fait prendre un coup en retour. Ses monstres l'ont aussi.",
      "Maladies : chaque retrait de PA, de PM ou de portée que vous subissez (même venant d'un allié) vous donne une maladie. Il y en a 9, et elles se cumulent.",
      "Pour guérir, un personnage doit être soigné 3 fois.",
    ],
    delock: [
      "Soignez une entité au contact de Corruption (un soin suffit, même sur un personnage à pleine vie) : il perd l'état, ses monstres aussi, et il descend de sa monture.",
      "Ça ne dure que 3 tours : s'il est encore en vie, il remonte sur sa monture et reprend l'état.",
    ],
    strategie: [
      "Préparez les 3 tours avant le soin qui délocke : toute l'équipe doit pouvoir taper juste après.",
      "Évitez les retraits de PA, PM et PO dans votre propre équipe : ils donnent aussi des maladies.",
      "Gardez du soin pour guérir les maladies (3 soins par personnage).",
    ],
    succes: [
      "Succès du donjon : Collant, Mains propres, Duo (40 tours), Spécial « Immunité collective » (seuls les alliés sans maladie peuvent infliger des dommages).",
    ],
    avertissements: ["Guides d'avant Dofus 3 : à confirmer en jeu."],
  },
  {
    slug: "tempete-eliocalypse", nom: "Les quatre Cavaliers", donjon: "Tempête de l'Eliocalypse", niveau: 200, zone: "Éliocalypse", position: "Éliocalypse", dpln: `${DPLN}tempete-de-l-eliocalypse.html`, statut: "brouillon",
    acces: ["Les quatre Cavaliers dans le même combat. Chacun garde la mécanique de son donjon : voir les fiches de Guerre, Servitude, Misère et Corruption."],
    mecaniques: [
      "Guerre est invulnérable tant qu'elle n'est pas seule : elle meurt toujours en dernier.",
      "Servitude renvoie 200 % des dommages : il faut l'état Traître (finir son tour dans le glyphe qu'il pose tous les 2 tours). Il invoque une Armécréante au premier tour puis tous les 2 tours, et à 1 PV il revient en arrière en se soignant de 25 %.",
      "Misère devient invulnérable un tour quand elle monte sur sa monture, à 50 % de sa vie.",
      "Corruption : soignez une entité à son contact pour lui retirer l'état qui renvoie les coups ; ses alliés le perdent aussi. Les maladies sont là : 3 soins pour en guérir.",
    ],
    delock: ["Chaque Cavalier se traite comme dans son donjon. Guerre ne devient vulnérable qu'une fois les trois autres tombés."],
    strategie: [
      "Commencez par Corruption, le plus simple à concentrer, et ne laissez pas traîner Misère, qui prend de la puissance à chaque coup.",
    ],
    avertissements: ["Fiche faite d'après un seul guide : à confirmer en jeu. La fiche du jeu affichée est celle de Guerre."],
  },
  {
    slug: "kabahal", donjon: "Rituel de Kabahal", niveau: 200, zone: "Atoll des Possédés", position: "[43,-57]", dpln: `${DPLN}rituel-de-kabahal.html`, statut: "brouillon",
    acces: ["Sur l'Atoll des Possédés : l'entrée est dans la carcasse de la baleine, en [43,-57]. Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Kabahal ne se frappe pas directement : il faut passer par les Bras démoniaques.",
      "Ses monstres posent des runes. Au tour suivant de celui qui l'a posée, un Bras démoniaque apparaît dessus et pose un glyphe de 2 cases autour de lui.",
      "Toute entité (monstre ou personnage) qui entre dans ce glyphe reçoit un des trois sorts du Bras, au hasard : environ 700 à 800 Neutre, une fois par tour.",
      "Une rune spéciale ne fait apparaître aucun Bras : elle sert à prendre le contrôle des Bras présents.",
      "Une fois pris, le contrôle des Bras dure tout le combat. Mais si personne ne finit son tour sur une rune, la portée de leurs sorts tombe à 3 cases.",
      "À partir du tour 5, les monstres qu'il invoque ont moitié moins de vie.",
    ],
    delock: ["Prenez le contrôle des Bras en finissant votre tour sur la rune de contrôle, puis servez-vous de leurs sorts pour frapper Kabahal."],
    strategie: [
      "Gardez quelqu'un sur une rune les tours pairs, sinon la portée des Bras tombe à 3 cases.",
      "Poussez les monstres dans les glyphes des Bras pour qu'ils prennent les coups, et ne les traversez pas vous-mêmes.",
    ],
    succes: [
      "Succès du donjon : Hardi, Mains propres, Duo (40 tours), Spécial « Gros Bras » (les ennemis doivent être achevés uniquement par les Bras démoniaques).",
      "Gros Bras : entamez les monstres, puis placez-les dans les glyphes des Bras pour que ce soient eux qui les achèvent.",
    ],
    avertissements: ["Guides de 2021, avant Dofus 3, complétés avec les changements de la 2.71 : à confirmer en jeu, surtout la rune de contrôle."],
  },
  {
    slug: "belladone", donjon: "Chambre des maléfices", niveau: 200, zone: "Archipel de Valonia", position: "[29,-88]", dpln: `${DPLN}chambre-des-malefices.html`, statut: "brouillon",
    acces: ["Dans le château en ruine d'Ephedrya, sur l'archipel de Valonia : parlez à Bulbybell en [29,-88]. Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Phase 1 : Belladone reste sur son îlot, ne bouge pas et est invulnérable. Chaque monstre tué lui donne un niveau d'Ensorcellement (3 au plus), qui renforce ses sorts.",
      "Une fois tous ses monstres tués, elle quitte l'îlot et se téléporte sur le terrain, avec d'autres sorts.",
      "Sur le terrain, elle ne perd son invulnérabilité qu'à la fin de son tour, et elle a un seuil à 50 % de sa vie.",
      "Si vous êtes dans sa ligne de vue au début de son tour, elle pose autour de vous un glyphe en étoile sur toute la carte et vous empoisonne selon les PA que vous dépensez. Le glyphe de Belladone{os} tue les personnages qui commencent leur tour dedans.",
      "Son Déchaînement fantasmagorique frappe en croix et en diagonale (3 cases) et rend Insoignable le personnage au centre.",
    ],
    delock: ["Tuez tous ses monstres pour la faire descendre de son îlot."],
    strategie: [
      "Chaque monstre tué la renforce : préparez la phase sur le terrain avant de tuer le dernier.",
      "Au début de son tour, sortez de sa ligne de vue. Si elle pose son glyphe, tout le monde en sort avant la fin de son tour.",
    ],
    succes: [
      "Succès du donjon : Collant, Mains propres, Duo (40 tours), Compagnon (à 4 au moins, avec Haku, Manitou Zoth, Karotz, Grouillot ou Phong Huss), Spécial « Cible facile » (le personnage qu'elle désigne doit être dans sa ligne de vue au début de son tour suivant, et ne pas mourir).",
      "Cible facile : le désigné recevra son glyphe ; personne d'autre ne doit être dans ses lignes à ce moment-là.",
    ],
    avertissements: ["Guide de 2022, avant Dofus 3 : à confirmer en jeu (phases et seuil)."],
  },
  {
    slug: "dechireuse", donjon: "Autel de la Déchireuse", niveau: 200, zone: "Osavora", position: "[12,2]", dpln: `${DPLN}autel-de-la-dechireuse.html`, statut: "brouillon",
    acces: ["Dans le Village Rhoarim d'Osavora, en [12,2]. Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Une seule salle et 5 vagues : une tous les 5 tours (tours 1, 6, 11, 16 et 21), ou tout de suite si la précédente est éliminée. Les nouveaux monstres sont invulnérables jusqu'à la fin de leur premier tour.",
      "Au début de son tour, la Déchireuse se téléporte sur le personnage le plus proche dans sa ligne de vue, le frappe (Feu) et lui donne l'état Espèce menacée jusqu'à la fin du combat.",
      "Si la Déchireuse{os} se téléporte sur un personnage qui a déjà Espèce menacée, il meurt d'un coup. Sans personne dans sa ligne de vue, elle ne se téléporte pas.",
      "Elle gagne 1 PM par monstre aligné avec elle au début de son tour. On ne peut ni l'éroder ni la rendre Insoignable.",
      "À 1 PV, elle récupère toute sa vie et passe en Barbarisme : plus puissante, et Lourde.",
      "Un Autel de la Chasse est invoqué au début du combat (invulnérable, 100 000 PV). Un monstre qui a pris 4 coups déclenche au 5e sa Réaction saisonnière, un effet qui dépend du monstre et de la saison.",
    ],
    delock: [
      "La Déchireuse est invulnérable. Elle devient vulnérable quand l'Autel de la Chasse lui applique la Réaction saisonnière d'un de ses monstres, et ce monstre change avec la saison d'Osavora : Voracle (Naissances), Domptueuse (Chasse), Ébourifauve (Repos).",
      "Exemple en saison des Naissances : déclenchez le Voracle et placez la Déchireuse au plus près de l'Autel. À son tour, l'Autel la rend invisible : frappez-la, elle redevient visible et vulnérable.",
    ],
    strategie: [
      "Un personnage qui a déjà Espèce menacée finit son tour hors de sa ligne de vue, ou derrière quelqu'un de plus proche d'elle qui ne l'a pas encore.",
      "Tenez ses monstres hors de ses lignes : chacun lui donne 1 PM.",
    ],
    succes: ["Succès du donjon : Nomade, En ligne de mire, Trio (80 tours), Spécial « Autelière » (aucun ennemi autre que la Déchireuse ne doit subir les effets de l'Autel de la Chasse)."],
    avertissements: ["Le placement exact selon la saison (qui doit être le plus proche de l'Autel) vient d'un seul guide : à confirmer en jeu."],
  },
  {
    slug: "venerable-endormi", donjon: "Breuil du Vénérable", niveau: 200, zone: "Osavora", position: "[6,9]", dpln: `${DPLN}breuil-du-venerable.html`, statut: "brouillon",
    acces: ["Dans la Réserve Touffue d'Osavora, en [6,9]. Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Le Vénérable Endormi dort, et il est invulnérable.",
      "Un monstre frappé passe Alerté pendant 2 tours, puis Apathique pendant 2 tours. Si le Vénérable est à 3 cases ou moins d'un monstre Alerté, il se réveille.",
      "Depuis la 3.7 (octobre 2026), les Zarbivores invoquent un bébé jusqu'à 2 cases d'eux et sortent seuls de l'état Apathique au bout de 2 tours : on ne peut plus temporiser sans fin.",
    ],
    delock: ["Tuez sa Monture du Vénérable : au moment où elle meurt, il se réveille et reste vulnérable jusqu'à la fin du combat."],
    strategie: [
      "Ne frappez pas les monstres à 3 cases ou moins de lui tant que vous n'êtes pas prêts à l'affronter.",
      "Préparez la mort de la Monture : dès qu'elle tombe, il faut pouvoir taper.",
    ],
    succes: ["Succès du donjon : Premier, Hardi, Trio (80 tours), Spécial « Ça ronfle fort »."],
    avertissements: ["Guides d'avant la 3.7, qui a changé les Zarbivores : à confirmer en jeu. Ce qui se passe quand un monstre Alerté le réveille (vulnérable ou non) reste à préciser."],
  },
  {
    slug: "eternel-conflit", donjon: "Bataille de l'Aurore Pourpre", niveau: 200, zone: "Cauchemar des Ravageurs", position: "[1,0]", dpln: `${DPLN}bataille-de-l-aurore-pourpre.html`, statut: "brouillon",
    acces: ["Dans le Cauchemar des Ravageurs, en [1,0]. Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "L'Éternel Conflit est protégé par deux diablotins : tant que le Bonraphin vit, il est invulnérable à distance ; tant que le Brâklotin vit, il est invulnérable au contact.",
      "Dans tout le donjon, quand un monstre est achevé, les monstres dans sa ligne de vue deviennent invisibles pendant un tour (pas quand c'est un diablotin qui meurt).",
      "Il faut aussi finir son tour dans la ligne de vue d'un monstre, sauf quand il ne reste que le boss.",
      "Son Poing de la Cité Sombre ne sert qu'une fois par combat.",
    ],
    delock: ["Tuez le Bonraphin pour pouvoir le frapper à distance, le Brâklotin pour le frapper au contact, ou les deux."],
    strategie: [
      "Avant d'achever un monstre, regardez qui est dans sa ligne de vue : ceux-là disparaissent un tour.",
    ],
    succes: [
      "Succès du donjon : Premier, Zombie, Duo (40 tours), Spécial « Jusqu'à l'Aurore » (le Bonraphin et le Brâklotin ne doivent pas être achevés).",
      "Jusqu'à l'Aurore : sans tuer les diablotins, il faut passer par son état X, obtenu en montant ses états de haine, et le tuer en 2 tours.",
    ],
    avertissements: ["Donjon très modifié en 2.71, guides d'avant Dofus 3 : à confirmer en jeu, surtout la fin de tour en ligne de vue (ce qui arrive sinon)."],
  },
  {
    slug: "torkelonia", donjon: "Sanctuaire de Torkélonia", niveau: 200, zone: "Archipel des Écailles", position: "[-84,-16]", dpln: `${DPLN}sanctuaire-de-torkelonia.html`, statut: "brouillon",
    acces: ["Sur l'île de Crocuzko, en [-84,-16] : il faut avoir fini la quête « Perdu dans le temps ». Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Torkélonia invoque au centre une Lunorbe (invulnérable, indéplaçable) qui rend tout le monde invulnérable, elle comme ses monstres.",
      "La Lunorbe pose un glyphe bleu, en ligne ou en diagonale, qui tourne d'un cran à chaque tour, dans le sens des aiguilles d'une montre.",
      "Cycle lunaire : à chaque tour, les monstres gagnent un bonus selon la phase de la lune, de la Nouvelle Lune (tour 1) à la Pleine Lune (tour 5). Frapper la Lunorbe fait avancer le cycle.",
      "Tuer un monstre donne aux autres de la vie et l'invulnérabilité pour un tour, sauf en Nouvelle Lune et en Pleine Lune depuis la 3.7.",
      "Torkélonia{os} tue le personnage qui l'achève, sauf s'il le fait en Nouvelle Lune.",
      "Faisceau lunaire : elle frappe en ligne et en diagonale, à n'importe quelle distance.",
    ],
    delock: [
      "Pendant votre tour, placez-vous dans le glyphe bleu et infligez une ligne de dommages : l'invulnérabilité saute pour votre tour. Ne sortez pas du glyphe avant d'avoir fini de frapper.",
      "Tuer Torkélonia fait disparaître la Lunorbe et son glyphe : ses monstres deviennent vulnérables.",
    ],
    strategie: [
      "Tuez Torkélonia en premier : c'est ce qui rend le reste du combat simple.",
      "Pour le coup final, attendez la Nouvelle Lune, ou achevez-la avec une invocation.",
      "Ne restez pas alignés avec elle, ni en ligne ni en diagonale.",
    ],
    succes: [
      "Succès du donjon : Statue, Dernier, Duo (40 tours), Compagnon (à 4 au moins, avec Flamme, Goutte, Nuage, Feuille ou Ténèbre), Spécial « Lunatique » (chaque ennemi achevé en Nouvelle Lune ou en Pleine Lune, sans jamais frapper la Lunorbe pour accélérer le cycle).",
    ],
    avertissements: ["Guides de 2019 ; la 3.7 a changé les effets de la Nouvelle et de la Pleine Lune. Achever Torkélonia sans mourir : seulement en Nouvelle Lune, ou aussi en Pleine Lune ? À confirmer."],
  },
  {
    slug: "barberyl-clochecuivre", donjon: "Bastion des Marteaux-Aigris", niveau: 190, zone: "Archipel de Valonia", position: "[32,-64]", dpln: `${DPLN}bastion-des-marteaux-aigris.html`, statut: "brouillon",
    acces: ["Dans les Galeries d'Ereboria, sur l'archipel de Valonia (bateau en [36,-76]). Clef par le trousseau, ou à fabriquer."],
    mecaniques: [
      "Nimpatience : chaque fois qu'un Marteau-Aigri touche un de vos personnages, sa Nimpatience monte (2 fois par tour au plus, 5 niveaux en tout), et elle ne redescend jamais.",
      "Chaque niveau augmente ses caractéristiques. Au niveau III, il gagne un sort spécial utilisable une fois ; au niveau V, une version plus forte, utilisable à chaque tour.",
      "Barbéryl échange sa place avec les personnages marqués Clochecuivre et leur retire 100 PM pendant un tour. Si l'échange est impossible (elle ou eux sous Pesanteur), rien ne se passe.",
    ],
    delock: ["Barbéryl n'est pas invulnérable : pas de délock."],
    strategie: [
      "Prenez le moins de coups possible : chaque coup reçu fait monter la Nimpatience du monstre qui l'a donné.",
      "Tuez Barbéryl tôt, idéalement au tour 2, puis les monstres les plus proches du niveau V.",
    ],
    succes: ["Succès du donjon : Versatile, Dernier, Duo (20 tours), Compagnon (à 4 au moins, avec Haku, Manitou Zoth, Karotz, Grouillot ou Phong Huss), Spécial « Antioxydant » (aucun ennemi ne doit atteindre la Nimpatience V)."],
    avertissements: ["Guides de 2022, avant Dofus 3 ; la 3.1 a réduit ses PA (20) et la durée du retrait de PM. Vulnérable dès le début ? À confirmer en jeu."],
  },
];

const simple = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Guide d'un donjon, retrouvé par le nom du donjon ou par celui de son boss (les orthographes varient d'une source à l'autre). */
export function guideDuDonjon(donjon?: string, boss?: string): GuideBoss | undefined {
  return GUIDES_BOSS.find((g) => (!!donjon && simple(g.donjon) === simple(donjon)) || (!!boss && g.slug === simple(boss)));
}

/** Adresse qui ouvre directement la fiche du boss dans Donjons > Guides. */
export const lienGuide = (g: GuideBoss) => `/donjons?onglet=guides&boss=${g.slug}`;
