// La page « Songes infinis » : textes et top 10 des Domi Reversi.
// Top 10 d'après la vidéo de Sapeuh « Top 10 Domi Reversi en Songe » (septembre 2026), réécrit en français,
// avec les noms du jeu ; fonctionnement d'après la version 3.5+ des Songes (mise à jour du jeu de mars 2026).

export type Rang = "S" | "A" | "B" | "C";

export type DomiReversi = {
  place: number;
  nom: string;
  /** Image dans public/icones/monstres. */
  image: string;
  rang: Rang;
  type: "Boss" | "Avis de recherche" | "Monstre";
  /** Comment faire, en quelques phrases. */
  comment: string;
  /** Ce qui peut faire rater le coup. */
  attention?: string;
  /** Il faut aussi ce sort. */
  aussi?: string;
};

export const RANGS: Record<Rang, { libelle: string; detail: string }> = {
  S: { libelle: "S", detail: "Victoire quasi assurée : on enchaîne les vagues sans jouer." },
  A: { libelle: "A", detail: "À faire dès qu'on le croise : l'équipe frappe beaucoup plus fort jusqu'à la fin." },
  B: { libelle: "B", detail: "Très fort, à faire presque à chaque fois." },
  C: { libelle: "C", detail: "Utile à connaître, mais on garde souvent son Domi Reversi pour mieux." },
};

export const TOP_DOMI: DomiReversi[] = [
  { place: 10, nom: "Dragon Cochon", image: "dragon-cochon", rang: "C", type: "Boss",
    comment: "Lancez Domi Reversi juste avant son premier tour, avec le personnage qui joue juste avant lui : il empoisonne alors toute la vague ennemie, qui meurt dès qu'elle lance un sort.",
    attention: "Les monstres invulnérables, résistants au Neutre ou dans l'état Pacifiste y échappent. Peu solide : les ennemis peuvent le tuer pendant qu'il est de votre côté. Et ses vagues sont souvent faciles sans ça." },
  { place: 9, nom: "Hin", image: "hin", rang: "C", type: "Avis de recherche",
    comment: "À son deuxième tour, il tue tout ce qui est à 10 cases ou plus de lui. Achevez le reste de la vague, isolez-le très loin des cases d'apparition, puis lancez Domi Reversi juste avant qu'il joue : la vague suivante meurt d'un coup.",
    attention: "Demande de la préparation. Le Solar reste un contre." },
  { place: 8, nom: "Solar", image: "solar", rang: "B", type: "Boss",
    comment: "Lancez Domi Reversi sur lui, puis tuez-le aussitôt : s'il meurt sans être sous Nécronyx, il emporte toute la vague. Le plus simple : Domi Reversi puis Réveil Brutal dès que la vague apparaît. Une vague longue et pénible passe en un clic.",
    aussi: "Réveil Brutal (ou Oblivion)" },
  { place: 7, nom: "Pounicheur", image: "pounicheur", rang: "B", type: "Boss",
    comment: "Achevez la vague en ne gardant que lui, puis lancez Domi Reversi : la vague suivante apparaît et il passe de votre côté. Frappez-le : son renvoi de dégâts frappe les ennemis, et très fort. Bien mené, on enchaîne plusieurs vagues.",
    attention: "Inefficace si la vague suivante contient des monstres longs à tuer (un Kimbo, par exemple). Astuce : un allié en état Pacifiste peut encore le frapper, et le renvoi part quand même." },
  { place: 6, nom: "Roi Imagami et Reine Amirukam", image: "roi-imagami", rang: "B", type: "Boss",
    comment: "Frappez le boss jusqu'à son premier seuil de vie : le Roi (ou la Reine) apparaît dans votre camp. Lancez alors Domi Reversi sur le boss en phase Lotus, puis Réveil Brutal ou Oblivion : le boss meurt et vous gardez son invocation, énorme, jusqu'à la fin du combat.",
    attention: "Certains monstres tuent les invocations d'un coup : éliminez-les en priorité, sinon vous perdez votre allié.",
    aussi: "Réveil Brutal (ou Oblivion)" },
  { place: 5, nom: "Capitaine Meno", image: "capitaine-meno", rang: "A", type: "Boss",
    comment: "Achevez la vague en gardant le Meno en vie, puis passez des tours : il donne 20 % de dommages finaux par tour. Vers +400 %, lancez Domi Reversi et tuez-le de votre côté : l'équipe garde ces dommages jusqu'à la fin du combat.",
    attention: "Le combat final dure 50 tours au maximum : si vous le croisez tard, ne passez pas trop de tours. Moins utile contre les boss à mécanique." },
  { place: 4, nom: "Professeur Xa", image: "professeur-xa", rang: "A", type: "Boss",
    comment: "Lancez Domi Reversi juste avant de l'achever, et tuez-le de votre côté : toute l'équipe gagne 1 000 dommages fixes jusqu'à la fin du combat. Plus rapide que le Meno, aucune préparation (Domi Reversi puis Réveil Brutal suffisent).",
    attention: "Assez rare à croiser." },
  { place: 3, nom: "Comte Harebourg", image: "comte-harebourg", rang: "S", type: "Boss",
    comment: "Coincez-le contre un mur ou dans un coin, rendez-le indéplaçable, éloignez vos personnages, puis lancez Domi Reversi : chaque ennemi qui le frappe est téléporté dans un obstacle et meurt. Il fait le ménage vague après vague, même tard dans le combat.",
    attention: "Un peu aléatoire : certains monstres ne le frappent pas, et un Solar ou un Merkator qui apparaît peut tout gâcher." },
  { place: 2, nom: "Kimbo", image: "kimbo", rang: "S", type: "Boss",
    comment: "Achevez la vague en gardant le Kimbo. Bloquez au besoin les cases d'apparition (invocations, Cawottes…) et faites-lui poser ses glyphes sur ces cases, en jouant sur la parité (toutes paires ou toutes impaires). Lancez alors Domi Reversi : chaque vague qui apparaît sur ses glyphes meurt. Victoire jusqu'au bout, sauf en cas de Solar.",
    attention: "La mise en place prend du temps : à faire tôt dans le combat (avant la 5e à 7e vague)." },
  { place: 1, nom: "Kaskargo", image: "kaskargo", rang: "S", type: "Monstre",
    comment: "Même principe que le Kimbo. Notez les cases d'apparition, ne gardez que le Kaskargo et votre Pandawa, et tournez autour de ces cases en portant le tonneau du Pandawa : le Kaskargo pose ses glyphes sans pouvoir échanger de place. Une fois toutes les cases couvertes, éloignez-le et lancez Domi Reversi : les vagues suivantes meurent en apparaissant.",
    attention: "Très pénible sans Pandawa. Inutile de le préparer en fin de combat : il faut du temps." },
];
