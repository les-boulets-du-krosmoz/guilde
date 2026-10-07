// Généré par scripts/generer-quetes-dofus.py à partir des données du jeu (Dofus 3.6.12.16, dofusdude/dofus3-main).
// Ne pas modifier à la main : relancer le script après une mise à jour du jeu.
import type { Quete } from "./dofus";

export const QUETES_JEU: Record<string, Quete[]> = {
 "veilleurs": [
  {
   "id": "ve-1",
   "nom": "Voyage, voyage",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 80,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "ve-2",
   "nom": "La porte d'Enutrosor",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-1",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Obtenir l'accès à la dimension Enutrosor et se présenter devant le portail"
   ]
  },
  {
   "id": "ve-3",
   "nom": "Orichomania",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-2",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Berserkoffre Affectueux"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Mesurer le taux d'orichor devant la Fabrique de Malléfisk",
    "Mesurer le taux d'orichor devant la Galerie du Phossile",
    "Mesurer le taux d'orichor dans la banque du Palais du roi Nidas",
    "Mesurer le taux d'orichor devant le panorama de la carrière Aurifère",
    "Mesurer le taux d'orichor devant le panorama de la Retraite des Éternels",
    "Trouver le caporal Gobdon"
   ]
  },
  {
   "id": "ve-4",
   "nom": "La cité de l'indicible mal",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-3",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Se rendre au lieu de rendez-vous",
    "Obtenir l'accès à la dimension Srambad et se présenter devant le portail"
   ]
  },
  {
   "id": "ve-5",
   "nom": "Messager clandestin",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-4",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Parler au Bouché"
   ]
  },
  {
   "id": "ve-6",
   "nom": "La voix de son maître",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-5",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Crocheter la porte de la maison de l'impasse des Comploteurs",
    "Ouvrir le coffre de la maison de l'impasse des Comploteurs",
    "Sortir de la prison de Srambad",
    "Parler au Coupe-Gorge"
   ]
  },
  {
   "id": "ve-7",
   "nom": "Le maître des zaaps",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-6",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Retrouver le maître près du zaap des Routes Rocailleuses",
    "Présenter le Maître des zaaps au Major Qiu",
    "Obtenir l'accès à la dimension Xélorium et se présenter devant le portail"
   ]
  },
  {
   "id": "ve-8",
   "nom": "Énergie renouvelable",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-7",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver l'endroit indiqué par l'orichomètre",
    "Ouvrir le coffre",
    "Prendre l'orichor instable dans le coffre",
    "Escorter le maître des zaaps jusqu'au temple du temps",
    "Aider le maître à fabriquer la batterie",
    "Chercher de l'aide à l'avant-poste du Xélorium"
   ]
  },
  {
   "id": "ve-9",
   "nom": "Traitement de choc",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-8",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Utiliser l'électrofoudre sur le Maître des zaaps",
    "Contacter le Doc Emiette Borgne via son Krosmoglob",
    "Dissiper les doubles à coup de marteau",
    "Taper sur la tête du maître des zaaps"
   ]
  },
  {
   "id": "ve-10",
   "nom": "Le disparu de Sufokia",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-9",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Marie Ride"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Fouiller l'endroit où travaillait Vardo",
    "Lire la page du journal de Vardo",
    "Obtenir des informations sur Vardo et sur l'Hyperscampe",
    "Trouver des contrebandiers le long du rivage sufokien",
    "Battre le groupe de contrebandiers",
    "Franchir les portes de pierre",
    "Escorter Vardo jusqu'à Sufokia"
   ]
  },
  {
   "id": "ve-11",
   "nom": "Rendez-vous avec la mort",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-10",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Se rendre au temple de Sram",
    "Trouver la personne qui vous a donné rendez-vous",
    "Réunir des preuves contre Écho et les montrer à Gein"
   ]
  },
  {
   "id": "ve-12",
   "nom": "Secret de fabrication",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [],
   "contenu": [],
   "deroule": [
    "Interroger les Voyageurs de la tour",
    "Activer le Krosmoglob de l'agent Bloude dans la prison",
    "Se servir de l'alambic dans le laboratoire",
    "Utiliser la Potion de transparence totale pour emprunter le portail en toute discrétion",
    "Chercher les traces du passage du convoi",
    "Essayer d'entrer dans la raffinerie",
    "Chercher où le code a été caché",
    "Essayer le code pour entrer dans la raffinerie",
    "Découvrir où a été transporté l'orichor",
    "Dérober de l'orichor raffiné"
   ]
  },
  {
   "id": "ve-13",
   "nom": "S'emparer des commandes",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [],
   "contenu": [],
   "deroule": [
    "Enquêter sur la récente présence de Gein à Srambad",
    "Acheter une Potion de transformation en sirène au marché de Srambad",
    "Chercher des traces du passage de Gein",
    "Chercher un témoin du vol des documents dans la prison de Srambad",
    "Chercher les hommes de main d'Al Capote récemment sortis de la prison de Srambad",
    "Interroger les commerçants du marché de Srambad",
    "Apporter 1 Anneau du Bandit ou 100000 kamas à Grima Fandanga",
    "Chercher le Râtelier Gris dans les Catacombres",
    "Chercher des traces du passage du Râtelier Gris",
    "Chercher un moyen de passer à travers les grilles",
    "Écouter la conversation entre le Râtelier Gris et Morora",
    "Vaincre les Milirats et fouiller leurs cadavres",
    "Retourner au marché pour retrouver la piste du Râtelier Gris",
    "Chercher la personne qui vous attend"
   ]
  },
  {
   "id": "ve-14",
   "nom": "C'est dans la boîte",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Dévoreur de livres"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Lire l'Historibus Compendium",
    "Trouver l'hordémon qui a vandalisé le livre",
    "Interroger le dévoreur de livres",
    "Rejoindre l'avant-poste des Voyageurs et se renseigner sur Olivie Frange",
    "Récupérer 4 Bouts de Temps",
    "Parler de nouveau à Olivie Frange"
   ]
  },
  {
   "id": "ve-15",
   "nom": "Crise d'identité",
   "dofus": "veilleurs",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-11",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Aider Gein à vaincre Écho"
   ]
  }
 ],
 "dorigami": [
  {
   "id": "dg-2179",
   "nom": "Maudite disparition",
   "dofus": "dorigami",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "externe:sang-d-encre",
     "libelle": "Sang d'encre",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Tombe du Shogun Tofugawa (Shogun Tofugawa)"
    }
   ],
   "deroule": [
    "Parler à Imagiro devant la Statue du Réceptacle",
    "Entrer dans la crypte secrète grâce à la magie des Spiritueurs",
    "Vaincre les fantômes qui veillent sur la crypte",
    "Chercher des indices à propos de la disparition du Dofus dans la crypte secrète",
    "Faire examiner les indices par un Spiritueur",
    "Survivre à l'assaut des hordes de spectres Pandissidans"
   ]
  },
  {
   "id": "dg-2198",
   "nom": "Jusqu'à leur dernier soupir",
   "dofus": "dorigami",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Étudier les légendes de Pandala pour en apprendre davantage sur la Kitsoune à neuf queues",
    "Trouver un samouraï qui pourrait en savoir plus sur le rōnin mentionné dans le conte",
    "Se rendre dans la montagne, près du temple du Vent",
    "Entrer dans le temple du Vent",
    "Parler au vieux Kozaru",
    "Rencontrer la descendante d'une voyageuse perdue",
    "Débarquer sur l'île de Grobe et parler au Nocher",
    "Boire l'élixir des Trépasseurs et se rendre au début de la route des morts",
    "Prendre une lanterne d'Externam sur la route des morts",
    "Suivre la route jusqu'à la taverne du cimetière",
    "Suivre la route jusqu'au pied du Mont des Tombeaux",
    "Suivre la route jusqu'au ponton brumeux",
    "Payer le prix de Karon",
    "Naviguer sur le fleuve Akeranzu",
    "Vaincre les Lémures dans l'Éther",
    "Reprendre le cours du voyage le long du fleuve",
    "Saluer le visiteur qui explore les ruines",
    "Continuer à naviguer jusqu'à la Mer de poussière",
    "Aider le guide et l'âme aventurière",
    "Parler au guide errant",
    "Retourner voir le vieux Kozaru au temple du Vent",
    "Récupérer le secret gardé par le vent de l'ouest",
    "Récupérer le secret gardé par le vent de l'est",
    "Récupérer le secret gardé par le vent du nord",
    "Récupérer le secret gardé par le vent du sud",
    "Confier les quatre secrets au vieux Kozaru",
    "Rapporter le Hoshinotama à la Kitsoune"
   ]
  },
  {
   "id": "dg-2180",
   "nom": "Requiem pour un Yokai",
   "dofus": "dorigami",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "dg-2179",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Demeure des Esprits (Koumiho)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Péki Garou"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Négocier les termes du marché avec le Shogun",
    "Retrouver le feu perdu de la Kitsoune",
    "Emporter une flamme du Kitsounebi de Koumiho",
    "Tenter d'entrer dans l'Antre du Péki Garou",
    "Trouver un moyen de se prémunir du Feu noir de la Malédiction",
    "Parler de vos connaissances à propos du voleur d'âmes et en acquérir davantage si nécessaire.",
    "Trouver l'endroit où repose Tonam Etamwa",
    "Graver la tombe du voleur d'âme à son nom",
    "Retrouver le Grimoire de Tonam Etamwa",
    "Tenter de communiquer avec Ronald",
    "Assister à la confrontation entre Imagiro et le Shogun dans le Plan Astral"
   ]
  }
 ],
 "cawotte": [
  {
   "id": "cw-835",
   "nom": "L'œuf ou la cawotte ?",
   "dofus": "cawotte",
   "niveauConseille": 80,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "externe:le-ch-teau-du-wa",
     "libelle": "Le château du Wa",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:des-pwinces-pas-tr-s-charmants",
     "libelle": "Des pwinces pas très charmants",
     "verifie": true
    }
   ],
   "contenu": []
  }
 ],
 "argente": [
  {
   "id": "ag-1631",
   "nom": "Réponses à tout",
   "dofus": "argente",
   "niveauConseille": 2,
   "prerequis": [],
   "contenu": [],
   "deroule": [
    "En savoir plus sur votre objectif : les Dofus Primordiaux",
    "En savoir plus sur votre destination"
   ]
  },
  {
   "id": "ag-1632",
   "nom": "Le village dans les nuages",
   "dofus": "argente",
   "niveauConseille": 3,
   "prerequis": [],
   "contenu": []
  },
  {
   "id": "ag-1634",
   "nom": "Espoirs et tragédies",
   "dofus": "argente",
   "niveauConseille": 5,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1632",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Lire le livre contant la légende de Rykke Errel",
    "Parler à un vieux de la vieille",
    "Parler à une féline pantouflarde",
    "Parler à un voleur malchanceux"
   ]
  },
  {
   "id": "ag-1635",
   "nom": "Dans la gueule du Milimilou",
   "dofus": "argente",
   "niveauConseille": 8,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1634",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Pénétrer dans l'antre du Milimilou",
    "Vaincre le Milimilou"
   ]
  },
  {
   "id": "ag-2004",
   "nom": "Destination Astrub",
   "dofus": "argente",
   "niveauConseille": 10,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1635",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Utiliser le portail pour se rendre à Astrub sur le Monde des Douze"
   ]
  },
  {
   "id": "ag-1639",
   "nom": "Transport peu commun",
   "dofus": "argente",
   "niveauConseille": 3,
   "prerequis": [],
   "contenu": [],
   "deroule": [
    "Examiner le zaap des pâturages"
   ]
  },
  {
   "id": "ag-1640",
   "nom": "Des vestiges de légende",
   "dofus": "argente",
   "niveauConseille": 5,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1639",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Examiner la stèle d'un vestige sur la route des âmes",
    "Examiner la stèle d'un vestige dans les champs",
    "Examiner la stèle d'un vestige près du lac",
    "Examiner la stèle d'un vestige dans les pâturages",
    "Examiner la stèle d'un vestige dans la forêt"
   ]
  },
  {
   "id": "ag-1641",
   "nom": "Vu du ciel",
   "dofus": "argente",
   "niveauConseille": 6,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1640",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Utiliser la longue-vue de Matu Vuh",
    "Utiliser la longue-vue de Galilea"
   ]
  },
  {
   "id": "ag-1642",
   "nom": "Mise à l'épreuve",
   "dofus": "argente",
   "niveauConseille": 3,
   "prerequis": [],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Caporale Mynerve"
     ],
     "groupe": true
    }
   ]
  },
  {
   "id": "ag-1643",
   "nom": "Champs de bataille",
   "dofus": "argente",
   "niveauConseille": 5,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1642",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Tofu Chimérique"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Pissenlit Miroitant"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Rose Vaporeuse"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Tournesol Nébuleux"
     ],
     "groupe": true
    }
   ]
  },
  {
   "id": "ag-1644",
   "nom": "Coups d'épée dans l'eau",
   "dofus": "argente",
   "niveauConseille": 6,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1643",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "2 × Petit Gloot"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "2 × Plikplok"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Grand Splatch"
     ],
     "groupe": true
    }
   ]
  },
  {
   "id": "ag-1645",
   "nom": "Décime-moi des bouftous",
   "dofus": "argente",
   "niveauConseille": 7,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1644",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Boufton Pâlichon"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Boufton Orageux"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Bouftou Nuageux"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Bouftor Éthéré"
     ],
     "groupe": true
    }
   ]
  },
  {
   "id": "ag-1646",
   "nom": "Chasse aux chapardams",
   "dofus": "argente",
   "niveauConseille": 8,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1645",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "2 × Ronronchon"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "2 × Tigrimas"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "2 × Chakrobat"
     ],
     "groupe": true
    }
   ]
  },
  {
   "id": "ag-1647",
   "nom": "Leçon d'humilité",
   "dofus": "argente",
   "niveauConseille": 8,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1646",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Kruella Freuz"
     ],
     "groupe": true
    }
   ]
  },
  {
   "id": "ag-1648",
   "nom": "Des chafers qui marchent",
   "dofus": "argente",
   "niveauConseille": 9,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1647",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Chafer Débutant"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Chafer Furtif"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Chafer Éclaireur"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Chafer Piquier"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Percy Klop"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Fouiller la tombe"
   ]
  },
  {
   "id": "ag-1649",
   "nom": "Produits naturels",
   "dofus": "argente",
   "niveauConseille": 5,
   "prerequis": [
    {
     "type": "metier",
     "metier": "Paysan",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Pêcheur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Alchimiste",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ag-1649-r1",
     "texte": "4 × Blé",
     "note": "pour fabriquer Pain d'Incarnam",
     "verifie": true
    },
    {
     "id": "ag-1649-r2",
     "texte": "4 × Goujon",
     "note": "pour fabriquer Goujon en Tranche",
     "verifie": true
    },
    {
     "id": "ag-1649-r3",
     "texte": "4 × Ortie",
     "note": "pour fabriquer Potion de Mini Soin",
     "verifie": true
    }
   ]
  },
  {
   "id": "ag-1650",
   "nom": "La hache et la pioche",
   "dofus": "argente",
   "niveauConseille": 6,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-2512",
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Bûcheron",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Mineur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ag-1650-r1",
     "texte": "10 × Bois de Frêne",
     "note": "pour fabriquer Planche Agglomérée",
     "verifie": true
    },
    {
     "id": "ag-1650-r2",
     "texte": "10 × Fer",
     "note": "pour fabriquer Ferrite",
     "verifie": true
    }
   ]
  },
  {
   "id": "ag-1651",
   "nom": "Boune un jour, boune toujours",
   "dofus": "argente",
   "niveauConseille": 7,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1650",
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Bijoutier",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Cordonnier",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Tailleur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ag-1651-r1",
     "texte": "2 × Plume Chimérique",
     "note": "pour fabriquer Le S'Mesme",
     "verifie": true
    },
    {
     "id": "ag-1651-r2",
     "texte": "2 × Goujon",
     "note": "pour fabriquer Le S'Mesme",
     "verifie": true
    },
    {
     "id": "ag-1651-r3",
     "texte": "2 × Feu Intérieur",
     "note": "pour fabriquer Le Plussain",
     "verifie": true
    },
    {
     "id": "ag-1651-r4",
     "texte": "2 × Blé",
     "note": "pour fabriquer Le Plussain",
     "verifie": true
    },
    {
     "id": "ag-1651-r5",
     "texte": "2 × Pétale Diaphane",
     "note": "pour fabriquer Les Incrustes",
     "verifie": true
    },
    {
     "id": "ag-1651-r6",
     "texte": "2 × Goujon",
     "note": "pour fabriquer Les Incrustes",
     "verifie": true
    },
    {
     "id": "ag-1651-r7",
     "texte": "2 × Peau de Gloot",
     "note": "pour fabriquer La Spamette",
     "verifie": true
    },
    {
     "id": "ag-1651-r8",
     "texte": "2 × Ortie",
     "note": "pour fabriquer La Spamette",
     "verifie": true
    },
    {
     "id": "ag-1651-r9",
     "texte": "2 × Cendres Éternelles",
     "note": "pour fabriquer La Cape S'loque",
     "verifie": true
    },
    {
     "id": "ag-1651-r10",
     "texte": "2 × Blé",
     "note": "pour fabriquer La Cape S'loque",
     "verifie": true
    },
    {
     "id": "ag-1651-r11",
     "texte": "2 × Laine Céleste",
     "note": "pour fabriquer Le Floude",
     "verifie": true
    },
    {
     "id": "ag-1651-r12",
     "texte": "2 × Ortie",
     "note": "pour fabriquer Le Floude",
     "verifie": true
    }
   ]
  },
  {
   "id": "ag-2512",
   "nom": "Le métier des aventuriers",
   "dofus": "argente",
   "niveauConseille": 6,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1649",
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Chasseur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ag-2512-r1",
     "texte": "1 × Viande Intangible",
     "note": "pour fabriquer Bouillon de Chair",
     "verifie": true
    }
   ]
  },
  {
   "id": "ag-2513",
   "nom": "Préparation au combat",
   "dofus": "argente",
   "niveauConseille": 8,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1651",
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Façonneur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Forgeron",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Bricoleur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ag-2513-r1",
     "texte": "1 × Planche Agglomérée",
     "note": "pour fabriquer La Halte Efkat",
     "verifie": true
    },
    {
     "id": "ag-2513-r2",
     "texte": "2 × Viande Intangible",
     "note": "pour fabriquer La Halte Efkat",
     "verifie": true
    },
    {
     "id": "ag-2513-r3",
     "texte": "1 × Ferrite",
     "note": "pour fabriquer Bounihimée",
     "verifie": true
    },
    {
     "id": "ag-2513-r4",
     "texte": "2 × Viande Intangible",
     "note": "pour fabriquer Bounihimée",
     "verifie": true
    },
    {
     "id": "ag-2513-r5",
     "texte": "3 × Relique d'Incarnam",
     "note": "pour fabriquer Clef de la Crypte de Kardorim",
     "verifie": true
    },
    {
     "id": "ag-2513-r6",
     "texte": "5 × Cendres Éternelles",
     "note": "pour fabriquer Clef de la Crypte de Kardorim",
     "verifie": true
    }
   ]
  },
  {
   "id": "ag-1637",
   "nom": "La galette secrète",
   "dofus": "argente",
   "niveauConseille": 7,
   "prerequis": [
    {
     "type": "metier",
     "metier": "Paysan",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ag-1637-r1",
     "texte": "10 × Blé",
     "note": "pour fabriquer Galette d'Incarnam",
     "verifie": true
    },
    {
     "id": "ag-1637-r2",
     "texte": "4 × Poudre de Perlinpainpain",
     "note": "pour fabriquer Galette d'Incarnam",
     "verifie": true
    },
    {
     "id": "ag-1637-r3",
     "texte": "2 × Œuf Chimérique",
     "note": "pour fabriquer Galette d'Incarnam",
     "verifie": true
    },
    {
     "id": "ag-1637-r4",
     "texte": "1 × Lailait",
     "note": "pour fabriquer Galette d'Incarnam",
     "verifie": true
    },
    {
     "id": "ag-1637-r5",
     "texte": "4 × Bave de Bouftou",
     "note": "pour fabriquer Galette d'Incarnam",
     "verifie": true
    },
    {
     "id": "ag-1637-r6",
     "texte": "4 × Cendres Éternelles",
     "note": "pour fabriquer Galette d'Incarnam",
     "verifie": true
    },
    {
     "id": "ag-1637-r7",
     "texte": "5 × Ortie",
     "note": "à rapporter à Pipelette",
     "verifie": true
    }
   ],
   "deroule": [
    "Lire la recette de la galette d'Incarnam"
   ]
  },
  {
   "id": "ag-1633",
   "nom": "Mort au rat !",
   "dofus": "argente",
   "niveauConseille": 7,
   "prerequis": [],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Rat Soiffé"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Inspecter la cave.",
    "Faire sortir le rat de sa cachette"
   ]
  },
  {
   "id": "ag-1638",
   "nom": "Cryptologie",
   "dofus": "argente",
   "niveauConseille": 10,
   "prerequis": [],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Crypte de Kardorim (Kardorim)"
    }
   ]
  },
  {
   "id": "ag-1655",
   "nom": "Un peu de pigment",
   "dofus": "argente",
   "niveauConseille": 6,
   "prerequis": [],
   "contenu": []
  },
  {
   "id": "ag-1958",
   "nom": "Les principes d'Archie m'aident",
   "dofus": "argente",
   "niveauConseille": 15,
   "prerequis": [],
   "contenu": [],
   "deroule": [
    "Entrer dans la Tour du Conseil d'Astrub"
   ]
  },
  {
   "id": "ag-1959",
   "nom": "On marche sur des œufs",
   "dofus": "argente",
   "niveauConseille": 15,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1958",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 10,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Nowa"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Entrer dans la taverne d'Astrub",
    "Parler avec les occupants de la taverne pour attirer l'attention d'un trafiquant",
    "Escorter Nowa et le livrer au chef Badufron"
   ]
  },
  {
   "id": "ag-2009",
   "nom": "Conseil de classe",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1959",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "ag-classe",
   "nom": "Quête de ta classe",
   "dofus": "argente",
   "niveauConseille": 12,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-2009",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Une quête différente selon la classe. Crâ : « C'est pour ta pomme » ; Ecaflip : « Au petit malheur la chance » ; Eliotrope : « Un rayon de soleil » ; Eniripsa : « Piques de solution » ; Enutrof : « La fête de la chocopépite » ; Forgelance : « La routine anodine du chevalier citadin » ; Féca : « Tournée d'inspection » ; Huppermage : « Les paroles s'envolent, les aigris restent » ; Iop : « Iop et hop » ; Osamodas : « Série animalière » ; Ouginak : « Une vie de milichien » ; Ouginak : « Ça sent le gaz » ; Pandawa : « Trempette dans un verre d'eau » ; Roublard : « Braquage à la Roublard » ; Sacrieur : « Souffre-douleur » ; Sadida : « C'est pourtant naturel » ; Sram : « Crime et châtiment » ; Steamer : « L'étrange créature de l'étang bleu » ; Xélor : « Tarot, t'es très fort » ; Zobal : « Zobal Hibaba et les 40 Roublards »",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "ag-1962",
   "nom": "Balade en forêt",
   "dofus": "argente",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-classe",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Aller au rendez-vous fixé par Badufron",
    "Vaincre les Pandawas dans la forêt d'Astrub"
   ]
  },
  {
   "id": "ag-1975",
   "nom": "Ça tombe à l'eau",
   "dofus": "argente",
   "niveauConseille": 15,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1958",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher l'origine des troubles",
    "Discuter avec les mercenaires",
    "Chercher Camille Démouleur",
    "Vaincre les gredins"
   ]
  },
  {
   "id": "ag-1976",
   "nom": "Six pieds sous terre",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1975",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les glandeurs du zaap",
    "Chercher les touristes",
    "Défendre les touristes",
    "Escorter les touristes à l'extérieur"
   ]
  },
  {
   "id": "ag-1977",
   "nom": "Tel est pris qui croyait prendre",
   "dofus": "argente",
   "niveauConseille": 25,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1976",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher des personnes à la recherche de l'escroc",
    "Attendre près du temple",
    "Discuter avec les investigateurs",
    "Escorter Hippolyte Hique à la prison"
   ]
  },
  {
   "id": "ag-1988",
   "nom": "L'histoire en mouvement",
   "dofus": "argente",
   "niveauConseille": 25,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-classe",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Récupérer le manuscrit avant qu'il ne soit détruit"
   ]
  },
  {
   "id": "ag-1989",
   "nom": "Restauration rapide",
   "dofus": "argente",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1988",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Récupérer un morceau d'écorce centenaire",
    "Récupérer du lailait de boufette",
    "Rapporter le lailait et l'écorce au Mage Ax"
   ]
  },
  {
   "id": "ag-1990",
   "nom": "De vrais rats de bibliothèque",
   "dofus": "argente",
   "niveauConseille": 35,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1989",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Affronter des rats de bibliothèque pour retrouver le parchemin"
   ]
  },
  {
   "id": "ag-1991",
   "nom": "Légende d'automne",
   "dofus": "argente",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1990",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Lire l'ouvrage créé par Prim",
    "Lire le parchemin traduit",
    "Escorter le dragon jusqu'au cimetière d'Astrub",
    "Retrouver Rathrosk dans la partie sud-est du cimetière",
    "Trouver le vieillard près de l'oiseau de feu",
    "Ramasser de la terre près de la crypte de Brutas",
    "Récupérer une relique en combattant des spectres de l'Aurore Pourpre",
    "Arracher 3 ceintures aux Gargrouilles et les placer dans l'urne avec la terre et la relique",
    "Enterrer l'urne près de la tombe du chevalier de l'automne"
   ]
  },
  {
   "id": "ag-1978",
   "nom": "Bière qui roule n'amasse pas mousse",
   "dofus": "argente",
   "niveauConseille": 15,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1959",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "ag-1979",
   "nom": "Combat de rue",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1978",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Régler le problème de Bart Cousti",
    "Régler le problème de Vaiguy",
    "Régler le problème de Jeffrey Baratourte",
    "Régler le problème de Cindy Cah"
   ]
  },
  {
   "id": "ag-1980",
   "nom": "Comme un pichon hors de l'eau",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 15,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "3 × Pichon Blanc"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "3 × Pichon Bleu"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "3 × Pichon Orange"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "3 × Pichon Vert"
     ],
     "groupe": true
    }
   ]
  },
  {
   "id": "ag-1981",
   "nom": "Déjeuner à la fourchette",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 15,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vaincre la poupée champêtre"
   ]
  },
  {
   "id": "ag-1982",
   "nom": "La coupe des vices",
   "dofus": "argente",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 20,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "4 × Boufton Blanc"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "4 × Boufton Noir"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "3 × Bouftou"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Chef de Guerre Bouftou"
     ],
     "groupe": true
    }
   ]
  },
  {
   "id": "ag-1983",
   "nom": "Les as de la cambriole",
   "dofus": "argente",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "ag-1984",
   "nom": "Crise sanitaire",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-classe",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Prélever des échantillons contaminés dans Astrub et ses environs",
    "Apporter les cinq échantillons contaminés à Nibé Lulle",
    "Prendre les explosifs",
    "Utiliser les explosifs"
   ]
  },
  {
   "id": "ag-1985",
   "nom": "Livraison par intérim",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1984",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vaincre les brutes menaçantes",
    "Prendre les caisses"
   ]
  },
  {
   "id": "ag-1986",
   "nom": "Golémancien",
   "dofus": "argente",
   "niveauConseille": 25,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1985",
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Forgeron",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Façonneur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Tailleur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Sculpteur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Bricoleur",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ag-1986-r1",
     "texte": "1 × Minerai enchanté",
     "note": "pour fabriquer Fléau d'armes",
     "verifie": true
    },
    {
     "id": "ag-1986-r2",
     "texte": "1 × Ferrite",
     "note": "pour fabriquer Fléau d'armes",
     "verifie": true
    },
    {
     "id": "ag-1986-r3",
     "texte": "1 × Support métallique",
     "note": "pour fabriquer Écu Rikulome",
     "verifie": true
    },
    {
     "id": "ag-1986-r4",
     "texte": "1 × Cuir de Scélérat Strubien",
     "note": "pour fabriquer Écu Rikulome",
     "verifie": true
    },
    {
     "id": "ag-1986-r5",
     "texte": "1 × Fil enchanté",
     "note": "pour fabriquer Tabard Nak",
     "verifie": true
    },
    {
     "id": "ag-1986-r6",
     "texte": "1 × Serviette de Plage",
     "note": "pour fabriquer Tabard Nak",
     "verifie": true
    },
    {
     "id": "ag-1986-r7",
     "texte": "1 × Crème à bois",
     "note": "pour fabriquer Corps de Quintaine",
     "verifie": true
    },
    {
     "id": "ag-1986-r8",
     "texte": "1 × Planche Contreplaquée",
     "note": "pour fabriquer Corps de Quintaine",
     "verifie": true
    },
    {
     "id": "ag-1986-r9",
     "texte": "1 × Fléau d'armes",
     "note": "pour fabriquer Quintaine",
     "verifie": true
    },
    {
     "id": "ag-1986-r10",
     "texte": "1 × Écu Rikulome",
     "note": "pour fabriquer Quintaine",
     "verifie": true
    },
    {
     "id": "ag-1986-r11",
     "texte": "1 × Tabard Nak",
     "note": "pour fabriquer Quintaine",
     "verifie": true
    },
    {
     "id": "ag-1986-r12",
     "texte": "1 × Corps de Quintaine",
     "note": "pour fabriquer Quintaine",
     "verifie": true
    }
   ]
  },
  {
   "id": "ag-1987",
   "nom": "Le rebelle de la forêt",
   "dofus": "argente",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1986",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les enfants",
    "Chercher Vangey en direction du nord",
    "Chercher Vangey",
    "Suivre les traces",
    "Fouiller la charrette",
    "Vaincre les ruffians",
    "Accompagner Vangey à la Tour du Conseil"
   ]
  },
  {
   "id": "ag-1992",
   "nom": "Chacha Blues",
   "dofus": "argente",
   "niveauConseille": 15,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 10,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Donner à boire et à manger à Soki",
    "Promener Soki sur la place du temple des Douze",
    "Promener Soki près de l'hôtel de vente des consommables",
    "Promener Soki près de la boutique de Kerubim",
    "Promener Soki près de l'hôtel de vente des équipements",
    "Ramener Soki au nord de la bibliothèque",
    "Vérifier que le chacha se porte bien",
    "Trouver des sousouris aux alentours de la bibliothèque"
   ]
  },
  {
   "id": "ag-1994",
   "nom": "Les deux font l'impair",
   "dofus": "argente",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 20,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "ag-718",
   "nom": "Attention à la Bête !",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Créature d'Otomaï"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Placer le premier appât",
    "Placer le deuxième appât",
    "Placer le troisième appât",
    "Placer le quatrième appât",
    "Placer le cinquième appât",
    "Placer le sixième appât, à l'intérieur de la mine"
   ]
  },
  {
   "id": "ag-1996",
   "nom": "La petite mission dans la prairie",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 10,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Tuer une dizaine de larves autour de l'endroit où travaillent les Gobelins",
    "Surveiller les gobelins",
    "Retrouver les fugitifs",
    "Vaincre les trois gobelins"
   ]
  },
  {
   "id": "ag-1998",
   "nom": "Qui sème le vent récolte l'Artempeth",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 10,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Alchimiste",
     "niveau": 1,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Rose Artempeth"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "ag-1998-r1",
     "texte": "1 × Fleur de Pissenlit Diabolique",
     "note": "pour fabriquer Vermifuge de Nibé Lulle",
     "verifie": true
    },
    {
     "id": "ag-1998-r2",
     "texte": "1 × Pétale de Rose Démoniaque",
     "note": "pour fabriquer Vermifuge de Nibé Lulle",
     "verifie": true
    },
    {
     "id": "ag-1998-r3",
     "texte": "1 × Pétale de Tournesol Sauvage",
     "note": "pour fabriquer Vermifuge de Nibé Lulle",
     "verifie": true
    },
    {
     "id": "ag-1998-r4",
     "texte": "1 × Langue d'Épouvanteur",
     "note": "pour fabriquer Vermifuge de Nibé Lulle",
     "verifie": true
    },
    {
     "id": "ag-1998-r5",
     "texte": "1 × Mélange de Vermifuge",
     "note": "pour fabriquer Vermifuge de Nibé Lulle",
     "verifie": true
    }
   ],
   "deroule": [
    "Arroser les plantes",
    "Utiliser le vermifuge dans le grenier",
    "Vaincre les parasites"
   ]
  },
  {
   "id": "ag-2000",
   "nom": "Bûcherons en détresse",
   "dofus": "argente",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 20,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "5 × Milimulou"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Discuter avec un bûcheron qui a survécu à l'attaque de la bête féroce",
    "Acheter du miel à l'épicerie d'Astrub",
    "Parler à l'Ecaflip",
    "Faire sortir l'Homme-Ours de sa cachette",
    "Vaincre l'Homme-Ours avec l'aide d'Artand"
   ]
  },
  {
   "id": "ag-1999",
   "nom": "Le génie se meut",
   "dofus": "argente",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 20,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher des indices",
    "Suivre les traces",
    "Vaincre les voleurs Porkass"
   ]
  },
  {
   "id": "ag-2007",
   "nom": "L'invasion des profanateurs de sépultures",
   "dofus": "argente",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Gargrouille en colère"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Garglyphe en colère"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "La Ouassingue en colère"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Selim Llenneb"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Trouver la Gargrouille en colère",
    "Examiner les tombes",
    "Trouver la Garglyphe en colère",
    "Trouver la Ouassingue en colère",
    "Prendre Finney avec vous pour suivre la piste du profanateur",
    "Retourner avec Finney sur la tombe où vous avez trouvé l'indice",
    "Suivre la direction indiquée par Finney",
    "Examiner le caveau indiqué par Finney",
    "Rejoindre Becky devant le caveau",
    "Se rendre à la cabane de Becky",
    "Récupérer les outils de crochetage",
    "Retourner au caveau",
    "Tenter de crocheter la grille grâce aux outils"
   ]
  },
  {
   "id": "ag-2008",
   "nom": "Le repos est dans le champ",
   "dofus": "argente",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Klaüs Konbah"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "ag-2008-r1",
     "texte": "3 × Poudre de Perlinpainpain",
     "note": "à rapporter à Nistracolamus",
     "verifie": true
    },
    {
     "id": "ag-2008-r2",
     "texte": "3 × Ortie",
     "note": "à rapporter à Nistracolamus",
     "verifie": true
    },
    {
     "id": "ag-2008-r3",
     "texte": "3 × Sauge",
     "note": "à rapporter à Nistracolamus",
     "verifie": true
    },
    {
     "id": "ag-2008-r4",
     "texte": "3 × Trèfle à 5 feuilles",
     "note": "à rapporter à Nistracolamus",
     "verifie": true
    },
    {
     "id": "ag-2008-r5",
     "texte": "3 × Eau Potable",
     "note": "à rapporter à Nistracolamus",
     "verifie": true
    }
   ],
   "deroule": [
    "Trouver le premier esprit",
    "Utiliser l'eau bénite",
    "Trouver le deuxième esprit",
    "Trouver Guy Al'Eudroi près de l'étang d'Astrub",
    "Trouver le troisième esprit"
   ]
  },
  {
   "id": "ag-fin-5379",
   "nom": "Parler à Rathrosk",
   "dofus": "argente",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-2008",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Parler à Rathrosk : étape du succès, à faire une fois les quêtes précédentes terminées pour obtenir le Dofus."
   ]
  }
 ],
 "vulbis": [
  {
   "id": "vu-2078",
   "nom": "Amaknanomalie",
   "dofus": "vulbis",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "externe:ce-sera-mieux-avant",
     "libelle": "Ce sera mieux avant",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Entrer dans l'anomalie signalée par l'Envoyée de Xélor",
    "Vaincre les gardiens de l'anomalie",
    "Explorer l'anomalie du village incendié",
    "Affronter le chef du village",
    "Équiper le Dofus et quitter l'anomalie",
    "Vaincre les assaillants dragoeufs",
    "Se rendre dans la dimension du Xélorium",
    "Capturer la première boule d'énergie dans l'avant-poste des Voyageurs",
    "Capturer la seconde boule d'énergie dans l'avant-poste des Voyageurs"
   ]
  },
  {
   "id": "vu-2079",
   "nom": "La mère des Dragoeufs",
   "dofus": "vulbis",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "vu-2078",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Se rendre au temple d'Osamodas",
    "Survivre à l'embuscade des dragoeufs",
    "Obtenir un parangon et le déposer au pied de la statue du dieu Osamodas",
    "Vaincre les assassins dragoeufs",
    "Combattre des aventuriers dans le sanctuaire des Dragoeufs jusqu'à ce que Draegnerys soit satisfaite",
    "Trouver l'entrée de l'antre du dragon",
    "Affronter les dragoeufs qui gardent l'entrée"
   ]
  },
  {
   "id": "vu-2080",
   "nom": "Cauchemar infini",
   "dofus": "vulbis",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "vu-2079",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Retrouver l'esprit d'Oyukipoca dans les paradoxes des Songes infinis",
    "Vaincre le cauchemar avec l'aide d'Oyukipoca",
    "Se frayer un chemin dans le temple",
    "Prier dans le temple d'Oyukipoca"
   ]
  },
  {
   "id": "vu-2081",
   "nom": "La Nuit-qui-rugit",
   "dofus": "vulbis",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "vu-2080",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Amener la déesse Ixchelonia à se manifester sur Crocuzko",
    "Prier dans le temple de Kinichinti",
    "Montrer aux Crocuzkiens la puissance du Lézard-Soleil",
    "Prier devant le puits de Chaklaplok",
    "Jeter une vingtaine d'anémones de sang dans le puits de Chaklaplok",
    "Attirer un chagouar devant l'antre de Tylezia",
    "Dompter les chagouars",
    "Guider les chagouars jusqu'au temple d'Oyukipoca",
    "Convertir un Crocodaille crocuzkien au culte d'Oyukipoca",
    "Escorter le Crocuzkien dévôt jusqu'au temple d'Oyukipoca",
    "Prier devant l'autel pour qu'Oyukipoca se manifeste",
    "Assister aux retrouvailles entre Tylezia et Oyukipoca"
   ]
  },
  {
   "id": "vu-2082",
   "nom": "Les raisons de la colère",
   "dofus": "vulbis",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "vu-2081",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Entrer dans le rêve de Terrakourial",
    "Explorer le rêve de Terrakourial",
    "Tenter d'apaiser la colère de Terrakourial",
    "Obtenir un souvenir de Maminala",
    "Obtenir une offrande du gardien du Dofus Ocre",
    "Obtenir un morceau d'écorce de l'ancienne demeure de Terrakourial",
    "Obtenir une offrande de la fille de Terrakourial",
    "Obtenir un souffle de la mère de Terrakourial",
    "Apaiser la colère de Terrakourial"
   ]
  },
  {
   "id": "vu-2083",
   "nom": "Le temps des secrets",
   "dofus": "vulbis",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "vu-2082",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "vu-2083-r1",
     "texte": "1 × Corne brisée de Crocabulia",
     "note": "à rapporter à Fraouctor",
     "verifie": true
    },
    {
     "id": "vu-2083-r2",
     "texte": "1 × Binocles du Grand Chronomaître",
     "note": "à rapporter à Fraouctor",
     "verifie": true
    }
   ],
   "deroule": [
    "Découvrir la date de la mort du fils de Tylezia",
    "Rejoindre le lieu où vous devez rencontrer Martalo",
    "Se débarrasser des chronomorphes qui perturbent le point de rendez-vous",
    "Entrer dans l'Horloge de Xélor",
    "Veiller à ce que Fraouctor ne soit pas dérangé pendant qu'il consulte les archives",
    "Voyager dans le passé avec Fraouctor",
    "Écouter la discussion entre Osamodas et le fils de Tylezia",
    "Affronter l'invocation du dieu Osamodas"
   ]
  }
 ],
 "tachete": [
  {
   "id": "ta-2200",
   "nom": "Main dans la main",
   "dofus": "tachete",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "externe:requiem-pour-un-yokai",
     "libelle": "Requiem pour un Yokai",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Sumowa"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Shinobi novice"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "ta-2200-r1",
     "texte": "1 × Pandazahi",
     "note": "pour fabriquer Bière forte",
     "verifie": true
    },
    {
     "id": "ta-2200-r2",
     "texte": "1 × Pandneken",
     "note": "pour fabriquer Bière forte",
     "verifie": true
    },
    {
     "id": "ta-2200-r3",
     "texte": "1 × Épices",
     "note": "pour fabriquer Bière forte",
     "verifie": true
    },
    {
     "id": "ta-2200-r4",
     "texte": "1 × Alcool à 99%",
     "note": "pour fabriquer Bière forte",
     "verifie": true
    }
   ],
   "deroule": [
    "Aller voir le Grandapan pour dialoguer avec la déesse Pandawa par son intermédiaire",
    "Convaincre les prêtres de Pandawa d'administrer de la limonade de Grobe au Grandapan",
    "Obtenir la recette de la bière forte auprès d'un prêtre de Pandawa",
    "Essayer de fabriquer de la bière forte dans la brasserie",
    "Chercher des indices pour localiser Sumowa",
    "Suivre la tortue sur les traces de Sumowa",
    "Continuer à suivre la tortue sur les traces de Sumowa",
    "Débusquer la tierce personne et la forcer à se dévoiler",
    "Découvrir ce que cache l'individu suspect",
    "Réparer la machine de la brasserie",
    "S'entretenir avec la déesse Pandawa par l'intermédiaire du Grandapan",
    "Trouver les deux souffles du Wukin et du Wukang pour amener Pandawa à se manifester",
    "Écouter l'argumentaire de Keltra Ekazumi",
    "Convaincre Pandawa de vous confier sa Main"
   ]
  },
  {
   "id": "ta-2201",
   "nom": "Deux souffles, une inspiration",
   "dofus": "tachete",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Mémoire d'Orukam (Roi Imagami)"
    },
    {
     "type": "donjon",
     "nom": "Souvenir d'Imagiro (Reine Amirukam)"
    }
   ],
   "deroule": [
    "Se rendre à la bibliothèque pour parler à Chochi",
    "Trouver le possesseur du dernier manuscrit de Myamowa Musashwan",
    "Vaincre les spectres terrassés par Musashwan",
    "Explorer Terrdala à la recherche d'une œuvre de Tanukang Jei",
    "Éloigner les Tsukumogami du vase antique",
    "Examiner le vase antique",
    "Survivre à l'embuscade des shinobi",
    "Recopier le caractère tracé sur un vase antique",
    "Montrer les deux caractères à Shufamukin",
    "Découvrir l'un des temples du Wukin et du Wukang sur l'île de Pandala",
    "Parler à Daoh et quitter l'un des temples pour entrer dans les Royaumes célestes d'encre et de papier",
    "Explorer la Mémoire d'Orukam",
    "Décrypter le sens des mots-esprits dans la dernière salle de la Mémoire d'Orukam",
    "Trouver le Yokianzhi du Wukin dans le Royaume d'encre",
    "Survivre à l'attaque de la Paume du chtigre pour obtenir la silhouette du Wukin",
    "Parler au dragon Orukam dans sa caverne",
    "Explorer le Souvenir d'Imagiro",
    "Décrypter le sens des mots-esprits dans la dernière salle du Souvenir d'Imagiro",
    "Trouver le Yokianzhi du Wukang dans le royaume de papier",
    "Parler au dragon Imagiro dans sa caverne",
    "Se rendre au pied du Mont Noir et Blanc",
    "Vaincre les chtigres de papier",
    "Faire des offrandes aux éléments sur le Mont Noir et Blanc",
    "Calmer les esprits",
    "Parler aux trois Kozaru",
    "Explorer le rêve du taciturne",
    "Rompre le silence pour obtenir l'héritage de Kian Zhi",
    "Parler au maître des rêves",
    "Se rendre au Palais de bambou pour s'entretenir avec la Daimya",
    "Vaincre l'exécuteur de la Paume avec l'aide de Wulan",
    "Retourner voir le Grandapan dans le temple de la Taverne interdite"
   ]
  },
  {
   "id": "ta-2202",
   "nom": "En ce jardin qui nous unit",
   "dofus": "tachete",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ta-2200",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Se rendre au temple de Pandawa en Amakna",
    "Se préparer pour le rituel de la Main de Pandawa",
    "Affronter Keltra Ekazumi et terminer vos préparatifs",
    "Créer la Main de Pandawa grâce à la volonté de la déesse",
    "Retourner sur Pandala et découvrir le jardin secret",
    "Parler à Imagiro et à Orukam dans le jardin secret",
    "Se concentrer sur le rocher et les deux Dofus",
    "Affronter le reflet du dragon"
   ]
  }
 ],
 "dokoko": [
  {
   "id": "dko-1666",
   "nom": "Partir un jour sans retour",
   "dofus": "dokoko",
   "niveauConseille": 50,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Utiliser le canon pour se rendre sur l'île de Moon"
   ]
  },
  {
   "id": "dko-1667",
   "nom": "Un parfum de vacances",
   "dofus": "dokoko",
   "niveauConseille": 50,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "dko-1666",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "3 × Grokoko"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Parler au doyen des touristes",
    "Rapporter 4 feuilles de salace marine à Gropinson Cruaulé",
    "Vaincre un Vieux Grokoko"
   ]
  },
  {
   "id": "dko-1668",
   "nom": "Un indigeste chez les indigènes",
   "dofus": "dokoko",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "dko-1667",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Village Kanniboul (Kanniboul Ebil)"
    }
   ]
  },
  {
   "id": "dko-1669",
   "nom": "Squelettes et amulette",
   "dofus": "dokoko",
   "niveauConseille": 90,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "dko-1668",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Bateau du Chouque (Le Chouque)"
    },
    {
     "type": "combat",
     "adversaires": [
      "L'Égorgeur"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Interroger le premier membre d'équipage",
    "Interroger le deuxième membre d'équipage",
    "Interroger le troisième membre d'équipage",
    "Interroger le quatrième membre d'équipage",
    "Vérifier l'alibi de Gros Bob",
    "Identifier le voleur de l'amulette"
   ]
  },
  {
   "id": "dko-1670",
   "nom": "Rendez-vous avec la lune",
   "dofus": "dokoko",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "dko-1669",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Arbre de Moon (Moon)"
    }
   ],
   "deroule": [
    "Enterrer la jeune pousse et 5 doses d'engrais de Moon au pied d'un totem"
   ]
  }
 ],
 "glaces": [
  {
   "id": "gl-612",
   "nom": "La terre banquise",
   "dofus": "glaces",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "gl-613",
   "nom": "La maire de glace",
   "dofus": "glaces",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "gl-614",
   "nom": "Full contact",
   "dofus": "glaces",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-613",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "gl-619",
   "nom": "Antiroyaliste",
   "dofus": "glaces",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Serre du Royalmouth (Royalmouth)"
    }
   ]
  },
  {
   "id": "gl-620",
   "nom": "Les joyeux de la couronne",
   "dofus": "glaces",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Excavation du Mansot Royal (Mansot Royal)"
    }
   ]
  },
  {
   "id": "gl-621",
   "nom": "Fais dodo, t'auras du gâteau",
   "dofus": "glaces",
   "niveauConseille": 150,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Épave du Grolandais violent (Ben le Ripate)"
    }
   ]
  },
  {
   "id": "gl-622",
   "nom": "Lavomatique",
   "dofus": "glaces",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Hypogée de l'Obsidiantre (Obsidiantre)"
    }
   ]
  },
  {
   "id": "gl-623",
   "nom": "C'est frais, mais c'est pas grave",
   "dofus": "glaces",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Tanière Givrefoux (Tengu Givrefoux)"
    }
   ]
  },
  {
   "id": "gl-624",
   "nom": "Sans ma barbe, quelle barbe",
   "dofus": "glaces",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Antre du Korriandre (Korriandre)"
    }
   ]
  },
  {
   "id": "gl-625",
   "nom": "Là-haut sur la montagne",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Cavernes du Kolosso (Kolosso)"
    }
   ]
  },
  {
   "id": "gl-626",
   "nom": "Le pic qui glace",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Antichambre des Gloursons (Glourséleste)"
    }
   ]
  },
  {
   "id": "gl-649",
   "nom": "Bienvenue à Frigost",
   "dofus": "glaces",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-613",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Découvrir Frigost, ses habitants et leurs problèmes"
   ]
  },
  {
   "id": "gl-650",
   "nom": "L'essentiel est dans Lac Gelé",
   "dofus": "glaces",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-649",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Aider les pêcheurs du lac gelé"
   ]
  },
  {
   "id": "gl-651",
   "nom": "Les rescapés de Frigost",
   "dofus": "glaces",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-650",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver les Frigostiens portés disparus"
   ]
  },
  {
   "id": "gl-655",
   "nom": "Frigost, une île pas comme les autres",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-650",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "gl-652",
   "nom": "Développement durable",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-650",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Aider les paysans de Frigost"
   ]
  },
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-650",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Braver les dangers de La serre du Royalmouth",
    "Braver les dangers de l'Excavation du Mansot Royal",
    "Braver les dangers de l'Epave du Grolandais Violent",
    "Braver les dangers de l'Hypogée de l'Obsidiantre",
    "Braver les dangers de la Tanière Givrefoux",
    "Braver les dangers de l'Antre du Korriandre",
    "Braver les dangers des Cavernes du Kolosso",
    "Braver les dangers de l'Antichambre des Gloursons",
    "Braver les dangers de Frigost puis parler à Lucette Brifian"
   ]
  },
  {
   "id": "gl-919",
   "nom": "Au fion du trou",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-653",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Donjon de la mine de Sakaï (Grolloum)"
    }
   ]
  },
  {
   "id": "gl-1330",
   "nom": "Les rescapés du Village Enseveli",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-651",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Aider les habitants du village Enseveli",
    "Aider les habitants du Village Enseveli"
   ]
  },
  {
   "id": "gl-1325",
   "nom": "Les derniers rescapés",
   "dofus": "glaces",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-626",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:maya-la-belle",
     "libelle": "Maya la belle",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Finir la quête Rappel à la vie",
    "Finir la quête Moteur à explosion",
    "Finir la quête La fifille à son papa",
    "Finir la quête Mutinerie chez les Armutins",
    "Finir la quête Au-delà du mur",
    "Finir la quête Crise d'ex-Emma"
   ]
  },
  {
   "id": "gl-1334",
   "nom": "La vie de château",
   "dofus": "glaces",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-626",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Montrer que vous êtes un patrouilleur consciencieux.",
    "Prouver que vous êtes un combattant émérite.",
    "Affirmer votre supériorité intellectuelle en dévoilant les intentions de Sylargh.",
    "Confisquer la peau magique tannée par Klime",
    "Réduire à néant les plans de Missiz Frizz"
   ]
  },
  {
   "id": "gl-1333",
   "nom": "La machine à démonter le temps",
   "dofus": "glaces",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-1326",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Habitant de Frigost"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Ouvrière du Comte"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "S. Bill Sberg"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Trouver le Surveillant du Temps",
    "Placer le Stabilisateur Temporel",
    "Trouver le premier paradoxe",
    "Trouver le deuxième paradoxe",
    "Trouver le troisième paradoxe",
    "Activer le Stabilisateur Temporel"
   ]
  },
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "dofus": "glaces",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-626",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Laboratoire de Nileza (Nileza)"
    },
    {
     "type": "donjon",
     "nom": "Transporteur de Sylargh (Sylargh)"
    },
    {
     "type": "donjon",
     "nom": "Salons privés de Klime (Klime)"
    },
    {
     "type": "donjon",
     "nom": "Forgefroide de Missiz Frizz (Missiz Frizz)"
    }
   ]
  },
  {
   "id": "gl-1310",
   "nom": "Un comte de faits divers",
   "dofus": "glaces",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-1309",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Donjon du Comte Harebourg (Comte Harebourg)"
    }
   ]
  },
  {
   "id": "gl-710",
   "nom": "La destinée",
   "dofus": "glaces",
   "niveauConseille": 50,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 1 minimum",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "gl-711",
   "nom": "La fatalité",
   "dofus": "glaces",
   "niveauConseille": 50,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 1 minimum",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "gl-1316",
   "nom": "La rivalité",
   "dofus": "glaces",
   "niveauConseille": 50,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "gl-1317",
   "nom": "Malédiction !",
   "dofus": "glaces",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-710",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-711",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1316",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 1 minimum",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Gardien du Destin"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Rendre service au maire de la Bourgade et aux Frigostiens",
    "Trouver des informations sur Badmorva",
    "Trouver ce qui reste de Badmorva",
    "Rapporter les offrandes demandées par le Gardien",
    "Entrer dans la Caverne du Destin"
   ]
  },
  {
   "id": "gl-1318",
   "nom": "Mission Solution",
   "dofus": "glaces",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-1317",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "S.L.O.P."
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "2 × Tueur Tromatique Frigorifié"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Epouvantail de Frostiz Transgénisé"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Djaulien Perdu"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Découvrir quelle est la secte active au village enseveli",
    "Se vêtir d'un Slip Iholo et rencontrer Surlah Taite de nuit dans l'Hypogée de l'Obsidiantre",
    "Parler à Joey Skro à la nuit tombée",
    "Invoquer le S.L.I.P.",
    "Lire le registre dans la tour des archives",
    "Fouiller les environs à la recherche d'un indice",
    "Fouiller la charrette",
    "Trouver Judas Sticau",
    "Explorer la forêt Pétrifiée à la recherche de quelque chose laissé par Djaul.",
    "Escorter le Djaulien Perdu jusqu'au zaap du Village Enseveli",
    "Assister Judas Sticau pendant le rituel de désenvoûtement."
   ]
  },
  {
   "id": "gl-1326",
   "nom": "Chaud et froid",
   "dofus": "glaces",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-1318",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver un moyen d'entrer dans les Géofourneaux",
    "Franchir la porte des Géofourneaux",
    "Trouver un moyen d'aider Hazieff Taroun",
    "Rapporter 6 Pousses de Plante Hygrade au Glourson Frileux",
    "Aller voir les 3 Nordes",
    "Fabriquer un Voile de Tristesse et quitter la Caverne du Destin",
    "Lire le message de Cantile"
   ]
  },
  {
   "id": "gl-1327",
   "nom": "Le givre des révélations",
   "dofus": "glaces",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-1326",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Donjon du Comte Harebourg (Comte Harebourg)"
    }
   ],
   "deroule": [
    "Entrer dans la Tour de la Clepsydre",
    "Faire le premier relevé de température",
    "Faire le second relevé de température",
    "Trouver l'ancien site d'exploitation du Taroudium",
    "Parler aux 3 Nordes",
    "Remplir la fiole avec le liquide de la Clepsydre",
    "Se prosterner devant Djaul",
    "Interroger Djaul à propos des origines de l'hiver éternel",
    "Parler à Djaul et donner votre opinion sur la malédiction",
    "Se prosterner devant Jiva"
   ]
  },
  {
   "id": "gl-1329",
   "nom": "Le Dofus des Glaces",
   "dofus": "glaces",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-612",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-613",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-614",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-619",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-620",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-621",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-622",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-623",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-624",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-625",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-626",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-649",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-650",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-651",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-652",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-653",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-655",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-919",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1309",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1330",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1325",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1310",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1333",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1334",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-710",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-711",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1316",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1317",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1318",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1326",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-1327",
     "verifie": true
    }
   ],
   "contenu": []
  }
 ],
 "sylvestre": [
  {
   "id": "sy-2409",
   "nom": "Au détour d'un rêve perdu",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "externe:quand-l-veil-n-est-qu-un-songe",
     "libelle": "Quand l'éveil n'est qu'un songe",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Rencontrer le personnage qui a guidé votre destinée",
    "Tenter d'ouvrir le coffret mystérieux",
    "Explorer les ruines des songes perdus",
    "Affronter la douleur avec l'aide des Onigori",
    "Discuter avec Draconiros dans la caverne du réceptacle",
    "Tenter de découvrir les origines de la douleur au temple de Sacrieur",
    "Braver les flammes de la cime maudite",
    "Faire face au Dark Vlad",
    "S'exposer au courroux de Médoroziam"
   ]
  },
  {
   "id": "sy-2420",
   "nom": "Entretemps, une renaissance",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2409",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:prise-de-conscience",
     "libelle": "Prise de conscience",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:descendre-aux-cendres",
     "libelle": "Descendre aux cendres",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Voyager dans le temps jusqu'au Sanctuaire du dernier espoir pour en savoir plus sur Allisterine",
    "Communiquer avec Entropix",
    "Emprunter le médaillon placé sur l'autel",
    "Résister aux coups du bélier divin",
    "Rejoindre les Portes d'Onékros",
    "Guider Allisterine",
    "Interroger Entropix, puis neutraliser les Cavaliers",
    "Donner le médaillon à Allisteria"
   ]
  },
  {
   "id": "sy-2449",
   "nom": "La bête au bois dormant",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2420",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:le-serment-de-l-ambre",
     "libelle": "Le serment de l'ambre",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Entrer dans le rêve de Terrakourial",
    "S'entretenir avec le maître du temple de Crâ",
    "Passer l'épreuve de la baliste de Crâ",
    "Parler à la Grande Chasseresse",
    "Explorer la Forêt Maléfique à la recherche d'une créature qui se souvient de Terrakourial",
    "Faire face au vieux moussu",
    "Pénétrer dans le bloc d'ambre caché sous le tumulus"
   ]
  },
  {
   "id": "sy-2489",
   "nom": "Flovoraison",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2488",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Converser avec les dieux",
    "Retrouver quatre graines dispersées du grand arbre d'Albuera",
    "Renouer le lien sacré avec les champignons de Valonia",
    "Dompter les esprits sauvages de la forêt de ronces",
    "Préparer le calice pour le rituel de régénération du Dofus",
    "Régénérer le Dom de Pin",
    "Utiliser le Dofus à bon escient"
   ]
  },
  {
   "id": "sy-1618",
   "nom": "C'est tout Simple",
   "dofus": "sylvestre",
   "niveauConseille": 90,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 80,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Suivre la piste d'Arbabra",
    "Continuer à suivre la piste d'Arbabra",
    "Vaincre les Arak-haï qui menacent la vie de Simple",
    "Escorter Simple jusqu'au temple de Sadida"
   ]
  },
  {
   "id": "sy-1619",
   "nom": "Arak-haï en pagaille",
   "dofus": "sylvestre",
   "niveauConseille": 90,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-1618",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "3 × Dardalaine"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "3 × Néfileuse"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "3 × Gargantûl"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "3 × Saltik"
     ],
     "groupe": true
    },
    {
     "type": "donjon",
     "nom": "Antre de la Reine Nyée (Reine Nyée)"
    }
   ],
   "deroule": [
    "Se défendre contre l'embuscade",
    "Trouver la reine des Arak-haï"
   ]
  },
  {
   "id": "sy-1620",
   "nom": "Munster lève le mystère",
   "dofus": "sylvestre",
   "niveauConseille": 90,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-1619",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Domaine Ancestral (Abraknyde Ancestral)"
    }
   ],
   "deroule": [
    "Capturer un Gargantûl solitaire près de l'orée de la forêt",
    "Se rendre au cœur du Domaine Ancestral",
    "Examiner la statue"
   ]
  },
  {
   "id": "sy-1621",
   "nom": "L'art de la langue de bois",
   "dofus": "sylvestre",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-1620",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 120,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Clairière du Chêne Mou (Chêne Mou)"
    },
    {
     "type": "combat",
     "adversaires": [
      "La Comploteuse"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Entrer dans la Clairière du Chêne Mou et se présenter devant le maître des lieux",
    "Déposer la pierre enchantée dans le seau du puits de la Forêt Sombre",
    "S'éloigner du puits, puis revenir pour surprendre la poupée"
   ]
  },
  {
   "id": "sy-2486",
   "nom": "Les derniers d'entre nous",
   "dofus": "sylvestre",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-1621",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:rester-plant-l-",
     "libelle": "Rester planté là",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 160,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver Cornelia Granpa",
    "Libérer Cornelia",
    "Traverser la mer Kantil jusqu'aux quais du Port de givre",
    "Pister le mystérieux inconnu avec l'aide de Cornelia et de Kroa",
    "Débusquer les animaux enragés et les combattre",
    "Continuer la traque",
    "Explorer la Forêt Pétrifiée",
    "Assister à la cérémonie sans se faire repérer",
    "Vaincre le colosse et les autres infectés",
    "Poursuivre la disciple",
    "Affronter le Korriandre et les Sylvesprits pour se frayer un chemin dans l'antre",
    "Neutraliser la disciple",
    "Purifier le temple mystifié",
    "S'entretenir avec les dieux de la forêt"
   ]
  },
  {
   "id": "sy-2487",
   "nom": "Cultures et turpitudes",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2486",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:par-ce-serment-s-crit-le-monde",
     "libelle": "Par ce serment s'écrit le monde",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Rejoindre Simple dans les champs des Ingalsse",
    "Aider Simple à se défendre contre les esprits du champ de citwouilles",
    "Escorter Simple jusqu'au champ d'orge",
    "Protéger Simple le temps qu'il bénisse le champ",
    "Accompagner Simple jusqu'au potager",
    "Laisser Simple bénir le potager",
    "Trouver la propriétaire du potager",
    "Se rendre sur Grobe pour rencontrer le jardinier",
    "Fouiller la cabane de jardinage",
    "Récupérer du terreau grobelin",
    "Répandre le terreau dans le premier champ avec l'aide de Simple",
    "Rendre visible la créature qui hante le champ de citwouilles",
    "Parlementer avec le gnome des jardins",
    "Vaincre le gnome des jardins",
    "Subir le jugement de Silvosse",
    "Prévenir Epuop Tik"
   ]
  },
  {
   "id": "sy-2488",
   "nom": "Qui nous protège du Protecteur ?",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2487",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:un-h-ritage-tourment-",
     "libelle": "Un héritage tourmenté",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Ouvrir le livre des Protecteurs dans le temple de Xélor",
    "Obtenir le sigil de Jiva",
    "Obtenir le sigil de Silvosse",
    "Obtenir le sigil d'Ulgrude",
    "Obtenir le sigil de Silouate",
    "Obtenir le sigil de Rosal",
    "Obtenir le sigil de Sumens",
    "Obtenir le sigil d'Hécate",
    "Obtenir le sigil de Pouchecot",
    "Obtenir le sigil de Raval",
    "Obtenir le sigil de Brumaire",
    "Obtenir le sigil de Djaul",
    "Reforger le Ménologium dans l'Horloge de Xélor et parler à Maïmane",
    "Prier dans les salles des saisons du Bibliotemple pour bénir le bouclier",
    "Se rendre au temple d'Eniripsa et parler à Elya Wood",
    "Entrer en possession du Dofus capable de guérir Silvosse",
    "Plonger le Dofus dans le chaudron",
    "Retrouver Maïmane dans la clairière de la Forêt Sombre",
    "Affronter le Protecteur de flovor",
    "Constater l'état de Silvosse",
    "Être témoin de l'ultime choix de Simple"
   ]
  },
  {
   "id": "sy-fin-15862",
   "nom": "Obtenir le Dom de Pin",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2488",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Obtenir le Dom de Pin : étape du succès, à faire une fois les quêtes précédentes terminées pour obtenir le Dofus."
   ]
  },
  {
   "id": "sy-fin-15863",
   "nom": "Parler à Silvosse",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-fin-15862",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Parler à Silvosse : étape du succès, à faire une fois les quêtes précédentes terminées pour obtenir le Dofus."
   ]
  }
 ]
};
