// Strats des combats tactiques des quêtes de Dofus, ouvertes depuis l'étiquette « Tactique solo » de l'étape.
// Pas de notion de classe : on joue le plus souvent un personnage imposé. `transformation` le dit combat par combat ;
// s'il manque, on ne sait pas encore si le personnage du joueur compte.

export type GuideCombat = {
  quete?: string; // identifiant de l'étape de quête sur le site ; absent si la quête n'est pas suivie
  nomQuete?: string; // nom de la quête quand elle n'est pas suivie par le site
  adversaire: string; // exactement comme dans tactique(...)
  statut: "brouillon" | "verifie";
  /** Personnage ou incarnation imposés pendant le combat. */
  transformation?: string;
  objectif?: string[];
  mecaniques?: string[];
  astuces?: string[];
  avertissements?: string[];
  /** « astuce » : combat ordinaire (étiquette inchangée) qui a seulement des astuces ; absent = combat tactique. */
  genre?: "astuce";
  /** Outil interactif affiché sous la fiche. */
  outil?: "memoire";
};

export const COMBATS_TACTIQUES: GuideCombat[] = [
  {
    quete: "iv-6", adversaire: "Rainikrone", statut: "brouillon",
    transformation: "Une Minikrone : 1 PV et 0 PM. Son seul sort utile, Pirouette majestueuse, vous téléporte sur une case colorée ; Ragequit permet d'abandonner.",
    objectif: ["Atteindre les 4 cases roses : chacune retire 1 PV à la Rainikrone, qui en a 4."],
    mecaniques: [
      "Impossible de mourir dans ce combat, sauf en abandonnant avec Ragequit.",
      "La case où vous arrivez réagit selon sa couleur. Jaune : elle devient rouge et vous envoie une case plus loin. Rouge : elle devient verte et fait changer de couleur les cases qui la touchent (jaune, puis rouge, vert, noir, et de nouveau jaune). Vert : elle devient jaune et vous renvoie à la case précédente. Noir : elle devient rouge et vous renvoie à la dernière case sans couleur traversée (le centre ou un bord). Rose : la Rainikrone perd 1 PV.",
      "Les effets peuvent s'enchaîner d'une case à l'autre.",
    ],
    astuces: [
      "Avant chaque bond, suivez l'effet jusqu'au bout : une case jaune vous pousse une case plus loin, et si celle-ci est noire, vous repartez du début.",
      "Une case rouge fait tourner la couleur de ses voisines : servez-vous-en pour changer une case noire gênante.",
    ],
  },
  {
    quete: "iv-10", adversaire: "Hyrkul", statut: "brouillon",
    transformation: "Votre propre personnage : pas de transformation dans ce combat.",
    objectif: ["En deux temps : détruire d'abord le phylactère d'Hyrkul, puis vaincre Hyrkul."],
    mecaniques: [
      "Hyrkul a 100 % de résistances partout : il faut les faire baisser avec les pylônes (les murs de la carte) avant de pouvoir le blesser.",
      "Une fois le phylactère détruit, certains pylônes s'éclairent en bleu sur une de leurs faces. Les pylônes actifs font baisser ses résistances et le blessent ; chacun ne sert qu'une fois.",
      "Au corps à corps, Hyrkul frappe très fort (environ 2 800), vous retire 20 % de résistances jusqu'à la fin du combat et peut vous enlever 10 PM, sans esquive possible.",
      "Chaque tentative de lui retirer des PM ou de le déplacer lui donne 2 PM.",
    ],
    astuces: [
      "Gardez vos distances : c'est au contact qu'il est dangereux.",
      "Placez-le au croisement de deux pylônes actifs pour les faire agir ensemble.",
      "Ne lui retirez pas de PM et ne le poussez pas : il en sortirait plus mobile.",
      "L'incarnation des Dagues d'Hichète aide beaucoup : elle rend invisible et donne des PM pour lui échapper.",
    ],
    avertissements: ["Le fonctionnement exact des pylônes est décrit de façon différente selon les guides : à confirmer en jeu."],
  },
  {
    quete: "eb-6", adversaire: "Crocoburio", statut: "brouillon",
    transformation: "Votre propre personnage, avec deux sorts en plus : un pour planter l'épée Crocobur devant vous, un pour la reprendre.",
    objectif: ["Capturer dans l'épée les trois forces que libère Crocoburio. Le combat s'arrête dès que la troisième est capturée."],
    mecaniques: [
      "Le combat avance par phases, selon les PV de Crocoburio. À chaque nouvelle phase, il invoque deux Âmes de Guerrier Crocodaille et une de ses forces (Force, Puissance, puis Esprit de Crocoburio).",
      "Pour capturer une force, plantez l'épée à son contact. Si une force arrive au contact de Crocoburio, elle le soigne de 2 500 PV.",
      "Si l'épée meurt, tuée par Crocoburio ou par un Guerrier Crocodaille, le combat est à recommencer.",
      "Tous les 3 tours, Bouclier d'écailles lui donne 500 points de bouclier pour un tour. Ses coups rendent insoignable et érodent de plus en plus fort au fil des phases.",
    ],
    astuces: [
      "Dès qu'une force apparaît, interceptez-la avec l'épée avant qu'elle n'atteigne Crocoburio.",
      "Reprenez l'épée quand elle est menacée : la perdre fait recommencer tout le combat.",
      "Frappez Crocoburio entre ses boucliers, pour changer de phase plus vite.",
    ],
  },
  {
    quete: "eb-10", adversaire: "Grougalorasalar", statut: "brouillon",
    transformation: "Un crocodaille placé au centre de la carte, sans PM. Vous ne perdez aucun PV dans ce combat.",
    objectif: ["Faire arriver Crocoburio (en bas à gauche) jusqu'au Dofus Ébène avant son père Grougalorasalar (en bas à droite). Crocoburio doit avancer de 14 cases, Grougalorasalar de 8 seulement."],
    mecaniques: [
      "Au début de chaque tour, des piliers apparaissent sur la carte.",
      "Vos sorts posent des glyphes blancs ou noirs selon un motif fixe autour de vous : sur le pilier en face, sur ceux en diagonale, ou sur des cases sans pilier.",
      "Un glyphe blanc sous un pilier fait avancer Crocoburio d'une case ; un glyphe noir sous un pilier fait avancer Grougalorasalar.",
    ],
    astuces: [
      "À chaque tour, repérez d'abord où sont les piliers, puis choisissez le sort qui met du blanc sous un pilier sans mettre de noir sous un autre.",
      "Grougalorasalar part avec 6 cases d'avance : chaque glyphe noir mal placé compte, ne prenez aucun risque.",
    ],
  },
  {
    quete: "tu-2", adversaire: "Esprit de Bolgrot", statut: "brouillon",
    transformation: "L'Ombre Astrale : 40 PV, 10 PA et 0 PM. On ne se déplace qu'en bondissant.",
    objectif: ["Détruire toutes les flammes avant qu'elles ne vous rattrapent. L'Esprit de Bolgrot, lui, ne fait rien."],
    mecaniques: [
      "Les flammes arrivent à partir du tour 2, 6 de plus à chaque tour, jusqu'à 36 en tout. Des glyphes violets montrent à l'avance où elles vont apparaître.",
      "Bond astral (1 case, 1 PA, sans limite) et Bond double (1 à 2 cases, 2 PA, 2 fois par tour) vous téléportent. Sur une flamme, le bond la détruit, vous prenez sa place et regagnez 1 PV. Dans le vide, il coûte 1 PV.",
      "Après chaque bond, les flammes autour de la case d'arrivée, diagonales comprises, reculent d'une case. Puis toutes les flammes se rapprochent de vous d'une case.",
      "Défaite immédiate si une flamme proche de vous ne peut pas bouger, par exemple bloquée par une autre flamme ou par le bord de la carte, ou si une flamme peut se poser sur votre case.",
      "Immobilisme attire toutes les flammes vers la case visée. Il coûte 5 PV, mais aucune flamme ne peut vous tuer au moment où vous le lancez.",
    ],
    astuces: [
      "Au tour 1, placez-vous près d'un groupe de glyphes violets, pour détruire plusieurs flammes dès leur arrivée.",
      "Détruisez-en au moins 3 au tour 2, puis visez les flammes qui se regroupent, surtout celles disposées en escalier : elles s'enchaînent d'un bond à l'autre.",
      "Avant chaque bond, regardez les flammes autour de la case d'arrivée : si l'une d'elles recule sur une autre flamme ou contre un bord, c'est la défaite. C'est la cause de la plupart des échecs.",
      "Restez loin des bords, et gardez Immobilisme pour une situation désespérée : il coûte cher en PV.",
      "Les tours sont courts : préparez votre prochain bond pendant que les flammes avancent.",
    ],
    avertissements: ["Le nombre de flammes, leur rythme d'arrivée, la portée et le coût des bonds viennent d'un seul guide : à confirmer en jeu. Le reste suit la description des sorts dans le jeu."],
  },
  {
    quete: "em-8", adversaire: "Dark Vlad", statut: "verifie",
    transformation: "Un dragon, dont les sorts ont 5 tours de relance.",
    objectif: ["Vaincre Dark Vlad."],
    mecaniques: [
      "Ses sorts volent de la vie : à chaque coup qu'il vous porte, il se soigne de la moitié des dégâts infligés, et vous perdez 50 % de résistances jusqu'à la fin du combat.",
      "Après 2 ou 3 coups reçus, le combat devient très difficile.",
      "Un sort supplémentaire remet à zéro tous vos temps de relance. Il s'obtient pendant la quête : quand Malo Crâne vous parle, après le combat contre les Trois Crânes sur Incarnam, choisissez « Garder le silence ».",
    ],
    astuces: [
      "Alternez : frappez, puis éloignez-vous pour garder la distance. Le but est qu'il ne vous touche jamais.",
      "Prenez le sort de remise à zéro des relances : il simplifie beaucoup le combat.",
    ],
  },
  {
    quete: "tu-10", adversaire: "Furye", statut: "verifie",
    transformation: "L'Ombre Astrale, qui se bat à travers les esprits qu'elle invoque.",
    objectif: ["Tenir jusqu'au tour 35 : Larme du Destin devient alors lançable et sert à tuer Furye."],
    mecaniques: [
      "Des monstres arrivent tout au long du combat, et les prochains sont visibles à l'avance. Ils avancent vers vous et peuvent changer de colonne.",
      "Vous placez vous-même vos esprits, et aucun ne bouge (0 PM) : leur place est définitive, sauf si un Sanglier les pousse.",
      "Dans l'ordre : Tofu, Sanglier, Prespic, Chafer, puis Furye. Le Prespic tue d'un coup un esprit à son contact. Le Chafer frappe fort en croix, mais perd 40 PV par tour et meurt seul au bout de 5 tours.",
      "Cyanog frappe tous les adversaires alignés avec lui, et ses dégâts montent de 2 à chaque tour sur le terrain (6, puis 8, puis 10…). Kelpe donne 1 PA par tour. Norie explose à sa mort, à 2 cases autour d'elle. Verak bloque le passage. Affaiblir inflige 30 dégâts.",
    ],
    astuces: [
      "Le but : ralentir les monstres tout en gardant assez de dégâts pour les tuer avant d'être submergé.",
      "Commencez par une rangée de Kelpe pour gagner des PA à chaque tour, puis une rangée de Cyanog pour les protéger et frapper.",
      "Ça ne suffit vite plus : renforcez une Norie avec Source de Puissance et placez-la sur le chemin des monstres, là où ils vont se regrouper. Ils la ciblent, et elle explose dès qu'elle meurt, inutile d'attendre la fin de Source de Puissance : son explosion touche tout à 2 cases, emportez-en le plus possible.",
      "Les Prespics ignorent Norie, sauf si elle se trouve sur la case où ils finissent leur tour. Contre eux : Affaiblir, l'explosion d'une Norie et un coup de Cyanog suffisent en général.",
      "Contre un Chafer : invoquez les Verak loin de votre base, pour que ses dégâts en croix ne touchent pas vos autres esprits, et pas trop près d'un Prespic, qui tuerait le Verak et laisserait passer le Chafer.",
    ],
  },
  {
    quete: "po-8", adversaire: "Minogolem séculaire", statut: "verifie",
    transformation: "Une momie avec 50 PV et 1 PM, qui perd 1 PV à chaque tour. Ses sorts servent à se déplacer (Déplacement rapide, Décalage, Placidité) et ont un temps de relance très long ; Ragequit permet d'abandonner le combat si vous êtes coincé.",
    objectif: ["Traverser le labyrinthe jusqu'à la case d'arrivée."],
    mecaniques: [
      "Les quatre Minogolems (séculaire, d'or, de sang et de sel) ne sont pas dans l'arène : ils se tiennent sur des plateformes au nord, au sud, à l'est et à l'ouest.",
      "À chaque tour, le séculaire échange sa place avec l'un des trois autres. Ses états, qui se lisent comme sur n'importe quel monstre, annoncent ses 3 prochains échanges.",
      "Après l'échange, il pose un mur de pierre collé à votre personnage, du côté opposé à sa nouvelle plateforme, et ce mur bloque le passage. Exemple : l'or au nord et le séculaire à l'est ; après l'échange, le séculaire est au nord et le mur apparaît juste au sud de vous.",
    ],
    astuces: [
      "Avant chaque déplacement, regardez les états du séculaire pour savoir de quel côté tombera le prochain mur.",
      "Placez-vous pour que le mur tombe sur un élément du décor : il n'apparaît pas, et votre route reste libre.",
      "N'hésitez pas à rester sur place : avancer au mauvais moment peut faire tomber le mur sur le seul passage vers l'arrivée.",
    ],
  },
  {
    quete: "dk-2", adversaire: "Yokai de la bibliothèque", statut: "brouillon",
    transformation: "Votre propre personnage, avec un sort temporaire : Yokaido Do.",
    objectif: ["Rendre les 5 Yokai somnolents pendant le même tour, avec Yokaido Do."],
    mecaniques: [
      "Les Yokai (deux braillards, deux bruyants et un hilare) ne subissent presque aucun dégât : inutile de les frapper.",
      "Yokaido Do retire 1 PM jusqu'à la fin du combat, cumulable, et ne peut viser la même cible qu'une fois par tour.",
    ],
    astuces: [
      "Rassemblez-les d'abord avec vos sorts de placement, puis lancez Yokaido Do sur les cinq dans le même tour.",
      "Un personnage mobile, avec des PM et de la portée, s'en sort bien mieux.",
    ],
  },
  {
    quete: "dk-2", adversaire: "Maître Kwatimbe", statut: "brouillon", genre: "astuce",
    transformation: "Votre propre personnage. Gardez le Pandaclier équipé pendant tout le combat : sans lui, la quête ne se valide pas.",
    mecaniques: [
      "Maître Kwatimbe est invulnérable dès le début du combat.",
      "Il ne perd cette invulnérabilité qu'en essayant de fuir votre corps à corps et en perdant des PA ou des PM à cause du tacle.",
      "Chaque coup au corps à corps lui retire 10 de fuite, jusqu'à la fin du combat.",
    ],
    astuces: [
      "Montez votre tacle au maximum.",
      "Ne lui retirez pas trop de fuite : s'il ne peut plus bouger du tout, il n'essaie plus de fuir et reste invulnérable.",
      "Les invocations aident à l'entourer et à le tacler.",
    ],
  },
  {
    quete: "dk-4", adversaire: "Kaskouïs", statut: "brouillon", genre: "astuce",
    astuces: ["Les Kaskouïs sont invulnérables dans leur glyphe : sortez-les-en pour pouvoir les blesser."],
  },
  {
    quete: "dk-4", adversaire: "Tanuki Durtouki", statut: "brouillon", genre: "astuce",
    astuces: ["Comme les Kaskouïs, il faut le sortir de son glyphe pour pouvoir le blesser."],
  },
  {
    quete: "dk-6", adversaire: "Firefoux", statut: "brouillon", genre: "astuce",
    objectif: ["Protéger le Qilin de papier : s'il meurt, le combat est perdu."],
  },
  {
    quete: "dk-8", adversaire: "Maître Pandore", statut: "brouillon", genre: "astuce",
    astuces: ["Ignorez ses invocations : Ikunochi s'en charge. Concentrez-vous sur Maître Pandore."],
  },
  {
    // Quête qui n'est suivie nulle part sur le site : la fiche n'apparaît que dans l'onglet Combats tactiques.
    nomQuete: "Le serment de l'ambre", adversaire: "Reine cornue", statut: "brouillon", outil: "memoire",
    objectif: ["Vaincre la Reine cornue."],
    mecaniques: [
      "Vous restez bloqué sur l'îlot central. Les quatre îlots autour cachent chacun 8 monstres invisibles, soit 32 en tout : des Malépik, des Malbois, des Maltrio et des Malzerb.",
      "Les monstres ne bougent pas, mais changent de place à chaque combat. Seule la Reine se déplace.",
      "Le sort de repérage se lance sur soi et repère, sur toute la carte, les monstres invisibles en ligne de vue. Un monstre invisible ne bloque pas la ligne de vue.",
      "Un sort en croix révèle la nature des monstres touchés. Les monstres se libèrent par paires de même nature, comme dans un jeu de mémoire.",
    ],
    astuces: [
      "Reportez au fur et à mesure sur la carte ci-dessous ce que vous voyez en jeu : cases occupées, nature des monstres, cases libérées.",
      "Lancez le repérage depuis les cases numérotées, dans l'ordre : à elles cinq, elles voient presque toute la carte. Sur les cases en pointillés, aucune position ne voit : il faut y découvrir la nature directement.",
      "Quand un îlot a ses 8 monstres, ses autres cases sont vides : inutile d'y chercher.",
      "Restez à l'abri derrière les blocs d'ambre quand la Reine se rapproche.",
    ],
    avertissements: ["Quelques cases sont vues ou non selon qu'une ligne de vue frôle le coin d'un bloc d'ambre : la carte les classe au mieux, à vérifier en jeu."],
  },
];

/** Une fiche suffit à faire d'un combat un combat tactique : utile pour les quêtes reprises du jeu, que le script d'import réécrit. */
// Un nom de fiche couvre aussi les variantes avec position (« Kaskouïs » pour « Kaskouïs en [27,-28] »).
export const guideCombat = (quete: string, adversaire: string) =>
  COMBATS_TACTIQUES.find((g) => !!g.quete && g.quete === quete && (g.adversaire === adversaire || adversaire.startsWith(`${g.adversaire} `)));
