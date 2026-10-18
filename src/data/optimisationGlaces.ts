// Parcours optimisé du Dofus des Glaces, résumé (dans nos mots) d'une série de 3 vidéos sur l'optimisation de Frigost.
// Les quêtes sont citées par leur nom : la page en fait des liens vers leur étape quand elles existent sur le site
// (page du Dofus des Glaces ou Quêtes de Frigost) ; sinon le nom reste en gras.

/** Morceau de texte : texte simple, ou nom de quête entre « [[ ]] » (lien vers l'étape si elle est sur le site). */
export type EtapeOptimisation = { texte: string; alerte?: boolean };
export type PartieOptimisation = { titre: string; etapes: EtapeOptimisation[] };
export type Optimisation = {
  source: string;
  /** Lien vers la source (vidéos). */
  lien?: string;
  /** Mises en garde affichées en tête de l'encart. */
  alertes: string[];
  parties: PartieOptimisation[];
  /** Astuce courte affichée sur l'étape de la quête (clé : nom de la quête). */
  astuces: Record<string, string>;
};

export const OPTIMISATION_GLACES: Optimisation = {
  source: "D'après la série en trois vidéos de Magem sur l'optimisation complète du Dofus des Glaces (YouTube).",
  lien: "https://www.youtube.com/watch?v=Qm5J_FjZjOo", // épisode 1 ; les épisodes 2 et 3 suivent sur sa chaîne
  alertes: [
    "Règle d'or : dès qu'une quête de [[Développement durable]] est rendue, lance la suivante. Ses zones de récolte suivent le parcours.",
    "Le Dofus n'arrive que si [[Frigost, une île pas comme les autres]] (exploration de Frigost II) est terminée.",
    "Lulu Cotte n'est au Village Enseveli qu'entre 8 h et 20 h ; une grande partie de Frigost II se joue ensuite entre 20 h et 8 h.",
  ],
  parties: [
    {
      titre: "Frigost I : arrivée et Lac Gelé",
      etapes: [
        { texte: "Au bateau, le capitaine lance [[La terre banquise]], puis [[La maire de glace]] à l'arrivée." },
        { texte: "À la bourgade : [[Full contact]] (parler à plusieurs PNJ) et [[Bienvenue à Frigost]]. Trois de ses quatre quêtes sont déjà faites : ne fais pas encore [[Les monologues du vaccin]]." },
        { texte: "Lance la première quête de [[Développement durable]] (variante Paysan ou Alchimiste, aucun métier à monter)." },
        { texte: "Lance [[Les monologues du vaccin]], fais le donjon du Royalmouth, puis récupère dehors les 6 Échantillons de sang de Boufmouth. Rends la quête, puis l'étape de Développement durable, et lance la suivante." },
        { texte: "Rends [[Bienvenue à Frigost]] : tu obtiens la méta-quête [[L'essentiel est dans Lac Gelé]]." },
        { texte: "Fais [[Bricole Girl]], puis lance [[Star ski et Dutch]] jusqu'aux Mycoses Gelées (sur les Écumouths)." },
        { texte: "Pour les Mycoses : fais [[Scierie Bambelle]], qui débloque [[Semer ses graines]]. Cliquer sur certains éléments du décor lance des combats, dont un contre 5 Écumouths, que chaque personnage peut refaire." },
        { texte: "Carrières de glace : [[Hôtel de glace]], [[La fonte des glaces]] puis [[L'ombre et la glace]], en récoltant ses ressources (Poils de Sanglacier, Griffes de Smilomouth… : la liste complète est dans l'étape) pendant les étapes de Développement durable de la zone. Garde [[Lumière sur l'ombre]] pour la toute fin." },
        { texte: "Termine [[Star ski et Dutch]] : les skis donnent des téléportations (Royalmouth, sortie de la bourgade, Lac Gelé, transporteur). Le plus gros gain de temps du parcours." },
        { texte: "[[Promenons-nous dans les bois]] en entier, puis [[Les chasseurs]] jusqu'au donjon du Mansot Royal. Lance [[Pêche en eaux gelées]] et [[La marche de l'impératrice]]." },
        { texte: "Mansot Royal, salle par salle : les 4 premières salles, en récupérant les Mamansots ; entre deux salles, va les rendre (ski « sortie de la bourgade ») puis reviens." },
        { texte: "Dehors : termine Développement durable, [[L'ombre et la glace]] et [[La marche de l'impératrice]] ; avance [[Pêche en eaux gelées]] jusqu'au donjon." },
        { texte: "Retourne dans la salle du boss du Mansot et bats-le : [[Les chasseurs]] et [[Pêche en eaux gelées]] avancent aussi." },
        { texte: "Enchaîne [[La pêche à Mel]], [[Mel odieuse]], [[Mel au drame]] puis [[Il est frais mon pichon]], et rends [[L'essentiel est dans Lac Gelé]]." },
      ],
    },
    {
      titre: "Frigost II : Village Enseveli",
      etapes: [
        { texte: "Lance la méta-quête [[Les rescapés de Frigost]] (3 de ses 7 quêtes déjà faites) et mets à jour [[Développement durable]]." },
        { texte: "[[Il préfère la mort en mer]] : le combat contre le PNJ se fait un personnage à la fois ; le reste de l'équipe attend sur la carte de l'agression qui suit, à faire tous ensemble. Ces combats répétés donnent des ressources de Développement durable." },
        { texte: "Le mini-donjon qui suit : impossible en solo, 4 personnages au maximum, et 24 h d'attente avant de le refaire. Répartis l'équipe (2 + 3…) sans jamais laisser un personnage seul.", alerte: true },
        { texte: "Le donjon de Ben le Ripate en entier ([[Fais dodo, t'auras du gâteau]]), puis lance [[Chauffage à moindre frais]] et récolte dehors pour Développement durable." },
        { texte: "[[À la recherche de Dan Lavy]] : dans l'Obsidiantre, Dan Lavy t'envoie à la bourgade. Ne finis pas le donjon : potion de rappel, mise à jour, retour, puis Gros Med et la fin du donjon." },
        { texte: "[[À qui profite le boufmouth]] en entier." },
        { texte: "[[Malédiction !]] jusqu'au gardien de la Crevasse Perge (3 offrandes). Le Morceau de Futur tombe dans l'Obsidiantre : fais le donjon en entier ([[Lavomatique]])." },
        { texte: "Le donjon des Givrefoux ([[C'est frais, mais c'est pas grave]]). Si le Village Enseveli est envahi de Givrefoux, ses PNJ ne répondent plus : il faut vaincre et capturer l'avis Fuji Givrefoux." },
        { texte: "Entre 8 h et 20 h : lance [[Dépôt de ravitaillement]] jusqu'à parler à Lulu Cotte (présente seulement à ces heures).", alerte: true },
        { texte: "Après 20 h (jusqu'à 8 h) : [[Chaud du S.L.I.P.]] dans la salle annexe de l'Obsidiantre, puis [[Mission Solution]] jusqu'aux 10 Cœurs de Blérice ; termine Dépôt de ravitaillement et lance [[Un ami qui ne vous veut pas que du bien]].", alerte: true },
        { texte: "Le Korriandre ([[Sans ma barbe, quelle barbe]]) en récoltant pour Développement durable, puis les premières salles du Kolosso et parler à Francis, avant de finir le donjon ([[Là-haut sur la montagne]])." },
        { texte: "Les ressources du Kolosso ne s'achètent pas : refais chaque salle jusqu'à 5 fois (inutile d'acheter 5 clefs par personnage), toujours entre 20 h et 8 h." },
        { texte: "Termine [[Un ami qui ne vous veut pas que du bien]] et [[Mission Solution]] (salle 3 du donjon des Gloursons), puis [[Maya la belle]] et le donjon des Gloursons en entier ([[Le pic qui glace]])." },
      ],
    },
    {
      titre: "Frigost III et le Dofus",
      etapes: [
        { texte: "Lance [[Chaud et froid]] jusqu'aux ressources sur les monstres, puis la méta-quête [[La vie de château]] : [[Le tour de guet]], puis lance [[Guerre froide]] sans t'en occuper (elle avancera toute seule)." },
        { texte: "Lance [[Les derniers rescapés]] : [[Moteur à explosion]] (escorte avec agression, un personnage à la fois), [[La fifille à son papa]], [[Mutinerie chez les Armutins]]." },
        { texte: "[[Rappel à la vie]] : à l'étape des ressources, fais le donjon de Nileza jusqu'à la salle du boss et sors. Les ressources tombent en chemin." },
        { texte: "Ressources de Chaud et froid : Missiz Frizz jusqu'au boss en capturant la salle 4 (elle servira plus tard), puis Klime et Sylargh jusqu'à la salle 3. Complète dehors : le Scaphandre Magmatique ouvre les Géofourneaux.", alerte: true },
        { texte: "[[Au-delà du mur]] : dans la dernière salle de Nileza, clique sur l'élément de décor puis bats le boss. Termine ensuite [[Guerre froide]] avec quelques monstres dehors." },
        { texte: "Depuis tes sauvegardes de donjon : [[Les desseins de Sylargh]] et [[Vous avez demandé la peau lisse ?]] (élément de décor en salle 3), puis [[La dernière carte]] (Missiz Frizz). Le PNJ de l'entrée de Nileza termine [[Chaud et froid]]." },
        { texte: "Termine [[Les derniers rescapés]] avec [[Crise d'ex-Emma]], puis [[Lumière sur l'ombre]] au Lac Gelé." },
        { texte: "[[La machine à démonter le temps]] : Henual demande le donjon du Grolloum (avec [[Au fion du trou]]), 2 Métal Éternel (combats ta capture de la salle 4 de Missiz Frizz en arène) et 12 Rouages en Or." },
        { texte: "[[Le givre des révélations]] (donjon du Comte Harebourg, où tombent les Rouages en Or) et [[Mille et un jours, un destin]] ; rends la quête à Henual." },
        { texte: "Le PNJ du donjon du Comte fait monter au sommet de la tour de Klepsydre : [[Le Dofus des Glaces]]. N'oublie pas [[Frigost, une île pas comme les autres]] !", alerte: true },
      ],
    },
  ],
  astuces: {
    "Bienvenue à Frigost": "Ne fais pas tout de suite Les monologues du vaccin : lance d'abord Développement durable.",
    "Développement durable": "Dès qu'une de ses quêtes est rendue, lance la suivante : ses zones suivent tout le parcours.",
    "Les monologues du vaccin": "Récupère les 6 Échantillons de sang de Boufmouth en sortant du Royalmouth.",
    "Star ski et Dutch": "Les Mycoses Gelées : passe par Scierie Bambelle puis Semer ses graines (combat de 5 Écumouths).",
    "Semer ses graines": "Un des combats compte 5 Écumouths : idéal pour les Mycoses Gelées de Star ski et Dutch.",
    "La marche de l'impératrice": "Les Mamansots tombent dans les salles du Mansot Royal : rends-les entre deux salles.",
    "Les chasseurs": "Fais le Mansot Royal salle par salle et garde le boss pour la fin.",
    "Il préfère la mort en mer": "Le mini-donjon : 4 personnages au maximum, jamais seul, 24 h avant de pouvoir le refaire.",
    "À la recherche de Dan Lavy": "Ne finis pas l'Obsidiantre quand Dan Lavy t'envoie à la bourgade : potion de rappel, puis retour.",
    "Malédiction !": "Le Morceau de Futur tombe dans le donjon de l'Obsidiantre.",
    "Dépôt de ravitaillement": "Lulu Cotte n'est là qu'entre 8 h et 20 h.",
    "Mission Solution": "À faire entre 20 h et 8 h, avec les ressources du Kolosso.",
    "Rappel à la vie": "Fais le donjon de Nileza jusqu'au boss : les ressources demandées y tombent.",
    "Chaud et froid": "Capture la salle 4 de Missiz Frizz : elle donnera les Métal Éternel de La machine à démonter le temps.",
    "La machine à démonter le temps": "Les 2 Métal Éternel : combats ta capture de la salle 4 de Missiz Frizz en arène.",
    "Le Dofus des Glaces": "Il faut aussi avoir terminé Frigost, une île pas comme les autres.",
  },
};
