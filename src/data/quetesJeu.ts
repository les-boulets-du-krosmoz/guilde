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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-10",
     "verifie": true
    }
   ],
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
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-10",
     "verifie": true
    }
   ],
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
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ve-10",
     "verifie": true
    }
   ],
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
   ],
   "aide": [
    "combat de groupe"
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
     "queteId": "ve-14",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "ve-13",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "ve-12",
     "verifie": true
    },
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
     "queteId": "dk-8",
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "dg-2198",
   "nom": "Jusqu'à leur dernier soupir",
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
   ],
   "aide": [
    "combat de groupe"
   ]
  }
 ],
 "cawotte": [
  {
   "id": "cw-827",
   "nom": "Intrusion chez les wabbits",
   "dofus": "cawotte",
   "niveauConseille": 40,
   "prerequis": [],
   "contenu": [],
   "ressources": [
    {
     "id": "cw-827-r1",
     "texte": "1 × Ailes de Scarafeuille Bleu",
     "note": "à rapporter à Assistant d'Otomaï",
     "verifie": true
    },
    {
     "id": "cw-827-r2",
     "texte": "1 × Ailes de Scarafeuille Blanc",
     "note": "à rapporter à Assistant d'Otomaï",
     "verifie": true
    },
    {
     "id": "cw-827-r3",
     "texte": "1 × Ailes de Scarafeuille Vert",
     "note": "à rapporter à Assistant d'Otomaï",
     "verifie": true
    },
    {
     "id": "cw-827-r4",
     "texte": "1 × Ailes de Scarafeuille Rouge",
     "note": "à rapporter à Assistant d'Otomaï",
     "verifie": true
    }
   ]
  },
  {
   "id": "cw-833",
   "nom": "Jamais deux sans trois",
   "dofus": "cawotte",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-827",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "ag-1962",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "sy-2193",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "cw-836",
   "nom": "Sauvegarder l'espèce",
   "dofus": "cawotte",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-827",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver du Bois de chauffage au centre de l'île de la Cawotte",
    "Trouver un Lombric au nord de l'île de la Cawotte",
    "Trouver des Baies sucrées au nord-est de l'île de la Cawotte",
    "Trouver un Tapis Wabbit dans les souterrains de l'île de la Cawotte"
   ]
  },
  {
   "id": "cw-837",
   "nom": "Faites l'amour, pas la guerre",
   "dofus": "cawotte",
   "niveauConseille": 45,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-836",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher l'Œuf de Wabbit caché derrière un tableau de cawotte",
    "Déterrer une Cawotte mature au centre de l'île de la Cawotte",
    "Voler du Jus de Cawotte râpée"
   ]
  },
  {
   "id": "cw-838",
   "nom": "Ça sent la cawotte",
   "dofus": "cawotte",
   "niveauConseille": 47,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-837",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Utiliser la Seringue de Lilou sur une cawotte en pleine croissance"
   ]
  },
  {
   "id": "cw-839",
   "nom": "Il y a un os, de Wabbit",
   "dofus": "cawotte",
   "niveauConseille": 50,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-838",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Sur l'îlot des Tombeaux, chercher des indices sur l'origine des Wabbits Squelettes",
    "Chercher le Wabbit enfermé dans les souterrains"
   ]
  },
  {
   "id": "cw-840",
   "nom": "Art gastronomique",
   "dofus": "cawotte",
   "niveauConseille": 52,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-839",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Récupérer 1 Calotte du Midi Layonnant",
    "Récupérer 1 Champignon du Midi Layonnant",
    "Récupérer 1 Mauvaise Helbe du Midi Layonnant",
    "Récupérer 1 Patte de Wabbit glillée"
   ]
  },
  {
   "id": "cw-841",
   "nom": "Expédition culinaire",
   "dofus": "cawotte",
   "niveauConseille": 54,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-840",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "4 × Wabbit Squelette agressif"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Examiner les traces du passage de l'expédition",
    "Lire le Carnet de voyage déchiré"
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "cw-842",
   "nom": "Voyage au centre du Wabbit",
   "dofus": "cawotte",
   "niveauConseille": 56,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-841",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Fouiller le souterrain à la recherche d'un indice",
    "Débloquer la grille pour menacer le Gawdien Wabbit"
   ]
  },
  {
   "id": "cw-843",
   "nom": "Des pwinces pas très charmants",
   "dofus": "cawotte",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-842",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vaincre les pwinces déchus et leur dérober le Necronobacon"
   ]
  },
  {
   "id": "cw-834",
   "nom": "Le château du Wa",
   "dofus": "cawotte",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-833",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Château du Wa Wabbit (Wa Wabbit)"
    }
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "cw-835",
   "nom": "L'œuf ou la cawotte ?",
   "dofus": "cawotte",
   "niveauConseille": 80,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "cw-834",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "cw-843",
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "fabrication"
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
   ],
   "aide": [
    "fabrication"
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
   ],
   "aide": [
    "fabrication"
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
   ],
   "aide": [
    "fabrication"
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
   ],
   "aide": [
    "fabrication"
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
   ],
   "aide": [
    "fabrication"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   "id": "ag-1978",
   "nom": "Bière qui roule n'amasse pas mousse",
   "dofus": "argente",
   "niveauConseille": 15,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1958",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "ag-1959",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "ag-2009",
   "nom": "Conseil de classe",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1978",
     "verifie": true
    },
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
   "id": "ag-1988",
   "nom": "L'histoire en mouvement",
   "dofus": "argente",
   "niveauConseille": 25,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-2009",
     "verifie": true
    },
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
     "type": "quete",
     "queteId": "ag-1978",
     "verifie": true
    },
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "ag-1981",
   "nom": "Déjeuner à la fourchette",
   "dofus": "argente",
   "niveauConseille": 20,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1978",
     "verifie": true
    },
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
     "type": "quete",
     "queteId": "ag-1978",
     "verifie": true
    },
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "ag-1983",
   "nom": "Les as de la cambriole",
   "dofus": "argente",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1978",
     "verifie": true
    },
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
     "queteId": "ag-2009",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "ag-1988",
     "verifie": true
    },
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
   "id": "ag-1962",
   "nom": "Balade en forêt",
   "dofus": "argente",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1984",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "ag-1988",
     "verifie": true
    },
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
   ],
   "aide": [
    "fabrication"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "fabrication",
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
     "note": "à rapporter à Fraouctor, craftable par un Bricoleur niveau 200",
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
   ],
   "aide": [
    "objet à crafter (Bricoleur)"
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
     "queteId": "dg-2180",
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
   ],
   "aide": [
    "combat de groupe",
    "fabrication"
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
   ],
   "aide": [
    "combat de groupe"
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
     "queteId": "ta-2201",
     "verifie": true
    },
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
   ]
  }
 ],
 "glaces": [
  {
   "id": "gl-589",
   "nom": "Bricole Girl",
   "dofus": "glaces",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Inspecter les environs de l'atelier des paysans"
   ]
  },
  {
   "id": "gl-590",
   "nom": "Promenons-nous dans les bois",
   "dofus": "glaces",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-589",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Discuter avec les rescapés",
    "Accompagner Staurme Sioux jusqu'au Chef Ronthé",
    "Accompagner Staurme Jauni jusqu'au Chef Ronthé",
    "Accompagner Richard Rouge jusqu'au Chef Ronthé",
    "Accompagner Grimebène jusqu'au Chef Ronthé"
   ]
  },
  {
   "id": "gl-591",
   "nom": "Les chasseurs",
   "dofus": "glaces",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-590",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 115,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Parler aux illuminés du village de glace",
    "Fouiller les abords de la caverne des mansots à la recherche de Gérard",
    "Fouiller la caverne à la recherche de Gérard"
   ]
  },
  {
   "id": "gl-543",
   "nom": "La marche de l'impératrice",
   "dofus": "glaces",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "gl-543-r1",
     "texte": "6 × Mamansot",
     "note": "à rapporter à Ken Tucky",
     "verifie": true
    }
   ],
   "deroule": [
    "Choisir de dénoncer Ken Tucky à la milice ou non"
   ]
  },
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "gl-592",
   "nom": "Il préfère la mort en mer",
   "dofus": "glaces",
   "niveauConseille": 150,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-591",
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
     "type": "niveau",
     "niveau": 120,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Esprit rebelle"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Trouver l'âme de Lafairé Danlsak, dans le Berceau d'Alma",
    "Capturer l'âme de Lafairé Danlsak et l'emmener aux récifs du nord",
    "Récupérer le butin"
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "gl-593",
   "nom": "Chauffage à moindre frais",
   "dofus": "glaces",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-592",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-621",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 125,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher des traces de Pleni l'Ancien dans les larmes d'Ouronigride",
    "Apporter une nouvelle boisson non-frigostienne au Capitaine Gneux",
    "Chercher des indices sur les créatures de vapeur des larmes d'Ouronigride"
   ]
  },
  {
   "id": "gl-594",
   "nom": "À la recherche de Dan Lavy",
   "dofus": "glaces",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-593",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-621",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Hypogée de l'Obsidiantre (Gros Med)"
    }
   ],
   "deroule": [
    "Chercher Dan Lavy dans les larmes d'Ouronigride",
    "Fouiller l'hypogée de l'Obsidiantre à la recherche des restes de Dan Lavy"
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "gl-595",
   "nom": "À qui profite le boufmouth",
   "dofus": "glaces",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-594",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-622",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-543",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 135,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "3 × Boufmouth dressé"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher un indice",
    "Faire sauter la grille",
    "Interroger les résidents",
    "Interroger le voisinage de Clarisse Tosha au sujet de ses activités"
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "gl-596",
   "nom": "Dépôt de ravitaillement",
   "dofus": "glaces",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-595",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-623",
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
    "Récupérer les caisses",
    "Chercher des indices dans la forêt pétrifiée",
    "Trouver un villageois susceptible de croire Adélaïde",
    "Rejoindre Lulu Cotte dans l'hypogée de l'Obsidiantre, la nuit",
    "Obtenir l'aide des prophètes du S.L.I.P.",
    "Récupérer 1 Bouton d'Or",
    "Délivrer le bûcheron prisonnier de la glace"
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "gl-597",
   "nom": "Un ami qui ne vous veut pas que du bien",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-596",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-624",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 145,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "gl-597-r1",
     "texte": "35 × Bois de Tremble",
     "note": "à rapporter à Aimé Ryckeno",
     "verifie": true
    }
   ],
   "deroule": [
    "Chercher le cadavre de Francis dans les crocs de verre",
    "Aider Francis à sortir des cavernes sain et sauf"
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
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "gl-598",
   "nom": "Maya la belle",
   "dofus": "glaces",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-597",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-625",
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
     "type": "combat",
     "adversaires": [
      "3 × Gloursaya énervé"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher Maya dans la Ruche des Gloursons",
    "Trafiquer les canalisations",
    "Modifier les paramètres du contrôleur des canalisations"
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
     "queteId": "gl-598",
     "verifie": true
    },
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   "id": "sy-2192",
   "nom": "Le réceptacle des Dofus",
   "dofus": "sylvestre",
   "niveauConseille": 30,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ag-1962",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Traverser le pont de Pandala",
    "Se rendre au palais de la Daimya pour remettre le message de Fallanster",
    "Se rendre à la taverne du Fermenthé",
    "Parler à la responsable de l'établissement",
    "Calmer les ivrognes",
    "Se procurer une pinte du visionnaire",
    "Parler à l'assistant du chaman près de l'escalier d'Aerdala",
    "Entrer dans la caverne cachée",
    "Boire la pinte du visionnaire devant le réceptacle",
    "Se confronter à la vision"
   ]
  },
  {
   "id": "sy-2193",
   "nom": "Un sage parmi les sages",
   "dofus": "sylvestre",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2192",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Entrer dans la maison des Lenalds pour voir Ronald",
    "Prouver que vous êtes folt et lusé comme un Lenald",
    "Parler à la doyenne des Lenalds",
    "Rencontrer la capitaine Lily au port de Madrestam",
    "Se prémunir contre la myxomawose et prendre le bateau pour l'île des Wabbits",
    "Trouver un sage lenald sur l'île de la Cawotte",
    "Retrouver le sage disparu dans les souterrains des Wabbits",
    "Vaincre les mangeuws de cawottes",
    "Escorter Ronald en lieu sûr",
    "Discuter avec Ronald pour en apprendre davantage sur les six Dofus Primordiaux"
   ]
  },
  {
   "id": "sy-2194",
   "nom": "Protection divine",
   "dofus": "sylvestre",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2193",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Dopeul Maléfique"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Parler au maître de votre temple",
    "Parler au maître des Dopeuls de votre temple",
    "Prier devant la statue du temple pour recevoir la bénédiction des Douze",
    "Aller à la bibliothèque d'Amakna",
    "Lire l'ouvrage de Wally Elconom",
    "Se rendre à l'orée enchantée de la forêt Maléfique"
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "sy-2195",
   "nom": "Voir le Dark Vlad et mourir... ou pas",
   "dofus": "sylvestre",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2194",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Obtenir auprès de Lanseuft le droit d'entrer dans la forêt Maléfique",
    "Essayer d'avoir une conversation avec le Dark Vlad",
    "Affronter les monstres maléfiques",
    "Parler à nouveau au Dark Vlad",
    "Affronter les chafers invoqués par le Iop sombre",
    "Tenter une dernière fois de discuter avec le Dark Vlad",
    "Retourner à Madrestam pour parler au sage lenald"
   ]
  },
  {
   "id": "sy-1462",
   "nom": "La magicienne des marécages",
   "dofus": "sylvestre",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2195",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "sy-1781",
   "nom": "Le Dofus et l'alchimiste",
   "dofus": "sylvestre",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-1462",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 40,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Rencontrer Otomaï"
   ]
  },
  {
   "id": "sy-2442",
   "nom": "La raison du plus fort",
   "dofus": "sylvestre",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-1462",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "sy-1781",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "externe:l-le-des-naufrag-s",
     "libelle": "L'île des naufragés",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "oc-1",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 40,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Akadémie des Gobs (Directeur Grunob)"
    }
   ],
   "deroule": [
    "Explorer le territoire des Bworks à la recherche de survivants du clan de la Forêt Maléfique",
    "Entrer dans l'Akadémie des Gobs",
    "Lire les notes de Jykel",
    "Trouver le Bwork que Jykel a engobiné",
    "Interroger Bwodigardh à propos de ce qui s'est passé dans la Forêt Maléfique",
    "Boire la potion de Jykel pour se téléporter sur l'île d'Otomaï",
    "Aider Jykel à quitter le nid"
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "sy-2443",
   "nom": "Après lui, le déluge",
   "dofus": "sylvestre",
   "niveauConseille": 50,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2442",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 40,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Grotte Hesque (Corailleur Magistral)"
    }
   ],
   "deroule": [
    "Discuter de ce que vous avez appris avec Otomaï",
    "Trouver de l'ambre antédiluvien dans la Grotte Hesque",
    "Purifier l'ambre antédiluvien grâce au pouvoir de l'anneau ocre"
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "sy-2444",
   "nom": "Comme un corbac sur sa branche",
   "dofus": "sylvestre",
   "niveauConseille": 90,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2443",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "sy-2444-r1",
     "texte": "30 × Ambre",
     "note": "pour fabriquer Ambre enchanté",
     "verifie": true
    },
    {
     "id": "sy-2444-r2",
     "texte": "6 × Ambre d'Abraknyde",
     "note": "pour fabriquer Ambre enchanté",
     "verifie": true
    },
    {
     "id": "sy-2444-r3",
     "texte": "6 × Ambre d'Abraknyde Sombre",
     "note": "pour fabriquer Ambre enchanté",
     "verifie": true
    },
    {
     "id": "sy-2444-r4",
     "texte": "6 × Métaria jaune",
     "note": "pour fabriquer Ambre enchanté",
     "verifie": true
    },
    {
     "id": "sy-2444-r5",
     "texte": "1 × Substrat de Futaie",
     "note": "pour fabriquer Ambre enchanté",
     "verifie": true
    }
   ],
   "deroule": [
    "Interrompre le rituel de l'Abraknyde Ancestral en malmenant ses serviteurs",
    "Marchander avec le plus vieux magicien de la forêt",
    "Récupérer le trésor volé par la Reine Nyée",
    "Vaincre les corbacs ancestraux",
    "Insister jusqu'à ce que l'Abraknyde Ancestral tienne sa promesse",
    "Purifier l'ambre enchanté grâce au pouvoir de l'anneau ocre",
    "Se laisser guider par la voix de la Forêt Sombre"
   ],
   "aide": [
    "fabrication"
   ]
  },
  {
   "id": "sy-2445",
   "nom": "Rester planté là",
   "dofus": "sylvestre",
   "niveauConseille": 110,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2444",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Bambusaie de Damadrya (Damadrya)"
    }
   ],
   "deroule": [
    "Trouver un endroit propice à la méditation dans la forêt de Plantala",
    "Méditer près de la source spirituelle sans se laisser distraire",
    "Parler à l'esprit serein",
    "Suivre la lumière dorée",
    "Entrer dans la Bambusaie pour retrouver la lumière",
    "Plonger dans la lumière",
    "Localiser la tombe du bûcheron pandawa",
    "Empêcher les Troolls de profaner la sépulture",
    "Parler au fantôme déraciné",
    "Ramasser la pousse de bambou et la planter près de la source spirituelle",
    "Dire au revoir à l'âme renaissante",
    "Purifier l'ambre spirituel grâce au pouvoir de l'anneau ocre",
    "Parler à l'esprit serein avant de quitter Plantala"
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "sy-2446",
   "nom": "Pas de fumée sans feu",
   "dofus": "sylvestre",
   "niveauConseille": 150,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2445",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Entrer dans le Dédale du Dark Vlad",
    "Déjouer la surveillance de la gardienne du tumulus",
    "Révéler puis examiner le sceau de Terrakourial",
    "Survivre à la morsure du feu du Dark Vlad",
    "Placer les trois ambres purifiés sur le sceau",
    "Trouver la source des flammes froides",
    "S'approcher du feu au centre du pentagramme"
   ]
  },
  {
   "id": "sy-2447",
   "nom": "Quand les esprits s'échauffent",
   "dofus": "sylvestre",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2446",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Explorer l'ancienne forêt mystifiée à la recherche de l'esprit",
    "Affronter les créatures de la forêt",
    "Tenter de capturer l'esprit",
    "Solliciter l'aide d'un spécialiste des esprits",
    "Attirer l'attention de la Kitsoune à neuf queues par une démonstration de force",
    "Passer un marché avec Koumiho",
    "Rapporter les délices des Kitsous à Jibakurei",
    "Retourner dans la cave de la chaumière et rejoindre l'esprit",
    "Imposer la volonté d'Inali à l'esprit boutefeu",
    "Examiner à nouveau le sceau de Terrakourial"
   ]
  },
  {
   "id": "sy-2448",
   "nom": "Le serment de l'ambre",
   "dofus": "sylvestre",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2447",
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
    "Se confronter au mal enfermé dans le bloc d'ambre",
    "Réparer le sceau de Terrakourial"
   ]
  },
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
     "queteId": "sy-2448",
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
   ],
   "aide": [
    "combat de groupe"
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
     "queteId": "sy-2445",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "sy-1621",
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
   "id": "sy-2489",
   "nom": "Flovoraison",
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
   "id": "sy-fin-15862",
   "nom": "Obtenir le Dom de Pin",
   "dofus": "sylvestre",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "sy-2489",
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
 ],
 "align-bonta": [
  {
   "id": "alb-55",
   "nom": "Entraînement avec Tarche",
   "dofus": "align-bonta",
   "niveauConseille": 31,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Tarche"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 1
  },
  {
   "id": "alb-56",
   "nom": "La serveuse Dame Cloude",
   "dofus": "align-bonta",
   "niveauConseille": 32,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-55",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 2
  },
  {
   "id": "alb-57",
   "nom": "Du pain pour les braves",
   "dofus": "align-bonta",
   "niveauConseille": 33,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-56",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-57-r1",
     "texte": "20 × Fougasse",
     "note": "à rapporter à Amayiro, craftable par un Paysan niveau 30",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Paysan)"
   ],
   "numero": 3
  },
  {
   "id": "alb-58",
   "nom": "Ned le dentiste",
   "dofus": "align-bonta",
   "niveauConseille": 34,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-57",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Extraire des dents de Chafer et les apporter à Ned Etsith"
   ],
   "numero": 4
  },
  {
   "id": "alb-59",
   "nom": "Entraînement avec Torche",
   "dofus": "align-bonta",
   "niveauConseille": 35,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-58",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Torche"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 5
  },
  {
   "id": "alb-60",
   "nom": "Cartes spéciales d'Amayiro",
   "dofus": "align-bonta",
   "niveauConseille": 36,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-59",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Apporter la carte et une bière Feubuk à Amayiro"
   ],
   "numero": 6
  },
  {
   "id": "alb-61",
   "nom": "À vol d'oiseau",
   "dofus": "align-bonta",
   "niveauConseille": 37,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-60",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Corbac égaré"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 7
  },
  {
   "id": "alb-62",
   "nom": "Pas de fainéants dans les rangs !",
   "dofus": "align-bonta",
   "niveauConseille": 38,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-61",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Apporter les badges des miliciens fainéants à Amayiro"
   ],
   "numero": 8
  },
  {
   "id": "alb-63",
   "nom": "Première visite à Brâkmar",
   "dofus": "align-bonta",
   "niveauConseille": 39,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-62",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver une faille dans les portes",
    "Détourner l'attention du Guerrier Brank Thoof",
    "Examiner les environs des portes"
   ],
   "numero": 9
  },
  {
   "id": "alb-64",
   "nom": "Un sanglier un peu trop agressif...",
   "dofus": "align-bonta",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-63",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Sanglier agressif"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 10
  },
  {
   "id": "alb-65",
   "nom": "Du repos mais pas trop...",
   "dofus": "align-bonta",
   "niveauConseille": 51,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-64",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Donjon des Bworks (Bworkette)"
    }
   ],
   "ressources": [
    {
     "id": "alb-65-r1",
     "texte": "10 × Bâton de Boisaille",
     "note": "à rapporter à Amayiro, craftable par un Sculpteur niveau 9",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer de la ferraille à partir de bakélélite puis l'apporter à Yennefer Ayeur"
   ],
   "aide": [
    "objet à crafter (Sculpteur)",
    "combat de groupe"
   ],
   "numero": 11
  },
  {
   "id": "alb-66",
   "nom": "Recouvrement de dette à la Tabasse",
   "dofus": "align-bonta",
   "niveauConseille": 52,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-65",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Donjon des Forgerons (Coffre des Forgerons)"
    }
   ],
   "deroule": [
    "Exiger le paiement auprès du tavernier Tabasse et retourner voir Amayiro",
    "Récupérer du liquide de forge"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 12
  },
  {
   "id": "alb-67",
   "nom": "Pot l'agent double",
   "dofus": "align-bonta",
   "niveauConseille": 53,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-66",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher l'espion Bishom Pot dans Brâkmar",
    "Passer au port de Brâkmar",
    "Rattraper les Brâkmariens avant leur arrivée à la Tour des Ordres"
   ],
   "numero": 13
  },
  {
   "id": "alb-68",
   "nom": "De la poudre aux yeux de Brâkmar",
   "dofus": "align-bonta",
   "niveauConseille": 54,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-67",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 14
  },
  {
   "id": "alb-69",
   "nom": "Une brèche à Bonta",
   "dofus": "align-bonta",
   "niveauConseille": 55,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-68",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Réquisitionner une pioche dans l'atelier des mineurs"
   ],
   "numero": 15
  },
  {
   "id": "alb-70",
   "nom": "D'égouts temps",
   "dofus": "align-bonta",
   "niveauConseille": 56,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-69",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Dérober un pot d'alcool de cawotte",
    "Fouiller les égouts à la recherche de la source du mal",
    "Récupérer du sang de Rat contaminé et l'apporter à Amayiro"
   ],
   "numero": 16
  },
  {
   "id": "alb-71",
   "nom": "L'élite squelettique",
   "dofus": "align-bonta",
   "niveauConseille": 57,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-70",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 17
  },
  {
   "id": "alb-72",
   "nom": "La foire du Trool suspectée",
   "dofus": "align-bonta",
   "niveauConseille": 58,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-71",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Faire remplir le formulaire par Leonzi Trool",
    "Rapporter le formulaire à Amayiro",
    "Acheter un Burger de Trool à Maxims, à la foire du Trool, puis l'apporter à Amayiro"
   ],
   "numero": 18
  },
  {
   "id": "alb-73",
   "nom": "Le Tabi d'Amayiro",
   "dofus": "align-bonta",
   "niveauConseille": 59,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-72",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Récupérer de l'huile de Blop Royal dans le Clos des Blops"
   ],
   "numero": 19
  },
  {
   "id": "alb-74",
   "nom": "Le fantôme de Tsog",
   "dofus": "align-bonta",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-73",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Entrez dans le caveau de Tsog",
    "Communiquez avec Tsog",
    "Trouver le coffre caché par Tsog"
   ],
   "numero": 20
  },
  {
   "id": "alb-75",
   "nom": "Des anneaux sur le bout des doigts",
   "dofus": "align-bonta",
   "niveauConseille": 71,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-74",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Larve marécageuse"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Larve céréalière"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Larve fongique"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alb-75-r1",
     "texte": "20 × Anneau d'Agilité",
     "note": "à rapporter à Amayiro, craftable par un Bijoutier niveau 9",
     "verifie": true
    }
   ],
   "deroule": [
    "Convaincre Farle et Shika Ingalsse de céder gratuitement du fourrage",
    "Négocier avec Farle et Shika Ingalsse"
   ],
   "aide": [
    "objet à crafter (Bijoutier)",
    "combat de groupe"
   ],
   "numero": 21
  },
  {
   "id": "alb-76",
   "nom": "La fureur du Holbaïd",
   "dofus": "align-bonta",
   "niveauConseille": 72,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-75",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Pitons Rocheux des Craqueleurs (Craqueleur Légendaire)"
    }
   ],
   "deroule": [
    "Ramasser un coticule"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 22
  },
  {
   "id": "alb-77",
   "nom": "Des capes Bontariennes",
   "dofus": "align-bonta",
   "niveauConseille": 73,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-76",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-77-r1",
     "texte": "10 × Cape Bontarienne",
     "note": "à rapporter à Capitaine Koda, craftable par un Tailleur niveau 1",
     "verifie": true
    },
    {
     "id": "alb-77-r2",
     "texte": "1 × Emballage de félicitations",
     "note": "à rapporter à Amayiro",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Tailleur)"
   ],
   "numero": 23
  },
  {
   "id": "alb-78",
   "nom": "Corvée de patate",
   "dofus": "align-bonta",
   "niveauConseille": 74,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-77",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-78-r1",
     "texte": "25 × Pommes de Terre épluchées",
     "note": "à rapporter à Rei Nisuc, craftable par un Base niveau 1",
     "verifie": true
    },
    {
     "id": "alb-78-r2",
     "texte": "4 × Aile de dragodinde",
     "note": "à rapporter à Rei Nisuc",
     "verifie": true
    },
    {
     "id": "alb-78-r3",
     "texte": "4 × Aile de dragodinde rousse sauvage",
     "note": "à rapporter à Rei Nisuc",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Base)"
   ],
   "numero": 24
  },
  {
   "id": "alb-79",
   "nom": "Lyeno, Abraknyde malgré lui",
   "dofus": "align-bonta",
   "niveauConseille": 75,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-78",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-79-r1",
     "texte": "1 × Colonel Lyeno",
     "note": "à rapporter à Larry Poller",
     "verifie": true
    },
    {
     "id": "alb-79-r2",
     "texte": "1 × Colonel Lyeno",
     "note": "à rapporter à Amayiro",
     "verifie": true
    }
   ],
   "deroule": [
    "Vaincre les Gobelins"
   ],
   "numero": 25
  },
  {
   "id": "alb-80",
   "nom": "Au service de Danathor",
   "dofus": "align-bonta",
   "niveauConseille": 76,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-79",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-80-r1",
     "texte": "5 × Viande Avariée",
     "note": "à rapporter à Rei Nisuc",
     "verifie": true
    }
   ],
   "deroule": [
    "Apporter les ingrédients de la liste à Danathor",
    "Déposer le blopisier dans la maison de Rimaraf"
   ],
   "numero": 26
  },
  {
   "id": "alb-81",
   "nom": "Amayiro à l'ombre du Champo",
   "dofus": "align-bonta",
   "niveauConseille": 77,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-80",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 27
  },
  {
   "id": "alb-82",
   "nom": "Le décès de Rimaraf",
   "dofus": "align-bonta",
   "niveauConseille": 78,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-81",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Donner l'identité du coupable à Amayiro"
   ],
   "numero": 28
  },
  {
   "id": "alb-83",
   "nom": "Poison de scorbute pour la prison",
   "dofus": "align-bonta",
   "niveauConseille": 79,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-82",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Laboratoire de Brumen Tinctorias (Nelween)"
    }
   ],
   "deroule": [
    "Remplir une fiole de venin de Scorbute"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 29
  },
  {
   "id": "alb-84",
   "nom": "Dike Tarak, la menace",
   "dofus": "align-bonta",
   "niveauConseille": 80,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-83",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Combattre Dike Tarak sans oublier la mise en garde d'Amayiro"
   ],
   "numero": 30
  },
  {
   "id": "alb-85",
   "nom": "Des combats pas très légaux...",
   "dofus": "align-bonta",
   "niveauConseille": 91,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-84",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Enquêter dans le port de Bonta"
   ],
   "numero": 31
  },
  {
   "id": "alb-86",
   "nom": "Mission de reconnaissance au cimetière",
   "dofus": "align-bonta",
   "niveauConseille": 92,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-85",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Évaluer les défenses des remparts"
   ],
   "numero": 32
  },
  {
   "id": "alb-87",
   "nom": "Vengeance par procuration",
   "dofus": "align-bonta",
   "niveauConseille": 93,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-86",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Arracher son gland à l'Abraknyde Ancestral"
   ],
   "numero": 33
  },
  {
   "id": "alb-88",
   "nom": "La lettre anonyme",
   "dofus": "align-bonta",
   "niveauConseille": 94,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-87",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Récupérer de la bave de Crapopo dans les lacs enchantés",
    "Amener 200 kamas et de la poussière magik à Paro Cabanne"
   ],
   "numero": 34
  },
  {
   "id": "alb-89",
   "nom": "Tabi t'a fleuri ?",
   "dofus": "align-bonta",
   "niveauConseille": 95,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-88",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-89-r1",
     "texte": "1 × Miracle",
     "note": "à rapporter à Tabi de Grace Malcean",
     "verifie": true
    }
   ],
   "deroule": [
    "Apporter un gland à un animal quelque part dans le bois de Litneg"
   ],
   "numero": 35
  },
  {
   "id": "alb-90",
   "nom": "Des badges pour la bonne cause",
   "dofus": "align-bonta",
   "niveauConseille": 96,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-89",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "8 × Membre de Commando Brâkmarien"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 36
  },
  {
   "id": "alb-91",
   "nom": "Leçon de cuisine",
   "dofus": "align-bonta",
   "niveauConseille": 97,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-90",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Amener de la cervelle de tortue de Moon et trois grappes de boules de Trukikol au cuisinier"
   ],
   "numero": 37
  },
  {
   "id": "alb-92",
   "nom": "Ras le bol de Lenglad",
   "dofus": "align-bonta",
   "niveauConseille": 98,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-91",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Mettre une râclée à William Lenglad"
   ],
   "numero": 38
  },
  {
   "id": "alb-93",
   "nom": "Dapyus n'est pas doué",
   "dofus": "align-bonta",
   "niveauConseille": 99,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-92",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "8 × Garde de la Prison"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Délivrer Houé Dapyus dans les geôles de Brâkmar et l'amener devant Amayiro"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 39
  },
  {
   "id": "alb-94",
   "nom": "C'est stupéfiant",
   "dofus": "align-bonta",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-93",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Caverne du Koulosse (Koulosse)"
    }
   ],
   "deroule": [
    "Interroger les habitants du village des éleveurs",
    "Chercher les trafiquants dans la forêt de Kaliptus"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 40
  },
  {
   "id": "alb-257",
   "nom": "Vin diou",
   "dofus": "align-bonta",
   "niveauConseille": 111,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-94",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Garde-manger du Rat Blanc (Rat Blanc)"
    }
   ],
   "deroule": [
    "Enquêter à la maison du marchand",
    "Interroger les Ecaflips de Bonta"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 41
  },
  {
   "id": "alb-258",
   "nom": "Les Ecas ne flippent pas",
   "dofus": "align-bonta",
   "niveauConseille": 112,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-257",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-258-r1",
     "texte": "1 × Cuir de Porsalu",
     "note": "à rapporter à Bowisse",
     "verifie": true
    }
   ],
   "deroule": [
    "Interroger les taverniers de Bonta"
   ],
   "numero": 42
  },
  {
   "id": "alb-259",
   "nom": "Plaine de chats",
   "dofus": "align-bonta",
   "niveauConseille": 113,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-258",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les bandits des plaines",
    "Inspecter le repaire des bandits"
   ],
   "numero": 43
  },
  {
   "id": "alb-260",
   "nom": "À l'endroit, à l'envers",
   "dofus": "align-bonta",
   "niveauConseille": 114,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-259",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Rencontrer le chef des convois",
    "Amenez le bijou à Amayiro... ou pas ?"
   ],
   "numero": 44
  },
  {
   "id": "alb-261",
   "nom": "Dans la gueule du chacha",
   "dofus": "align-bonta",
   "niveauConseille": 115,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-260",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-261-r1",
     "texte": "5 × Planche à Pâtisserie",
     "note": "à rapporter à Liroye Merline, craftable par un Bûcheron niveau 120",
     "verifie": true
    }
   ],
   "deroule": [
    "Interroger le personnel de la taverne",
    "Chercher Grimpill aux alentours de la Tour de Bonta",
    "Récupérer la clef par n'importe quel moyen",
    "Fouiller le repaire de bandits à la recherche de documents"
   ],
   "aide": [
    "objet à crafter (Bûcheron)"
   ],
   "numero": 45
  },
  {
   "id": "alb-262",
   "nom": "Alimentaire mon cher",
   "dofus": "align-bonta",
   "niveauConseille": 116,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-261",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-262-r1",
     "texte": "3 × Pemmican aux Haricots",
     "note": "à rapporter à Shere Hacanon, craftable par un Chasseur niveau 110",
     "verifie": true
    },
    {
     "id": "alb-262-r2",
     "texte": "3 × Pemmican aux Haricots",
     "note": "à rapporter à Finche Aticus, craftable par un Chasseur niveau 110",
     "verifie": true
    },
    {
     "id": "alb-262-r3",
     "texte": "3 × Pemmican aux Haricots",
     "note": "à rapporter à Trev Pelsantery, craftable par un Chasseur niveau 110",
     "verifie": true
    },
    {
     "id": "alb-262-r4",
     "texte": "1 × Ceinture de Sécurité",
     "note": "à rapporter à Ture Inge, craftable par un Cordonnier niveau 17",
     "verifie": true
    }
   ],
   "deroule": [
    "Voler le rapport à l'aide d'un complice"
   ],
   "aide": [
    "objet à crafter (Chasseur)",
    "objet à crafter (Cordonnier)"
   ],
   "numero": 46
  },
  {
   "id": "alb-263",
   "nom": "Bouc à misère",
   "dofus": "align-bonta",
   "niveauConseille": 117,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-262",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-263-r1",
     "texte": "1 × Saphir",
     "note": "à rapporter à Rekojel, craftable par un Mineur niveau 30",
     "verifie": true
    }
   ],
   "deroule": [
    "Voler du poison dans la réserve.",
    "Voler le registre des clients"
   ],
   "aide": [
    "objet à crafter (Mineur)"
   ],
   "numero": 47
  },
  {
   "id": "alb-264",
   "nom": "Flagrant délire",
   "dofus": "align-bonta",
   "niveauConseille": 118,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-263",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Fouiller la maison de Xarthan",
    "Surprendre Xarthan en flagrant délit"
   ],
   "numero": 48
  },
  {
   "id": "alb-265",
   "nom": "Quand y'en a marre de Brâkmar",
   "dofus": "align-bonta",
   "niveauConseille": 119,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-264",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 49
  },
  {
   "id": "alb-266",
   "nom": "La capture",
   "dofus": "align-bonta",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-265",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Capturer les deux comploteurs",
    "Conduire Xephirès à Amayiro"
   ],
   "numero": 50
  },
  {
   "id": "alb-280",
   "nom": "Le port salue",
   "dofus": "align-bonta",
   "niveauConseille": 131,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-266",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 51
  },
  {
   "id": "alb-281",
   "nom": "L'équipe ment",
   "dofus": "align-bonta",
   "niveauConseille": 132,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-280",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-281-r1",
     "texte": "8 × Bois d'Érable",
     "note": "à rapporter à Latem Sa",
     "verifie": true
    },
    {
     "id": "alb-281-r2",
     "texte": "12 × Bois de Frêne",
     "note": "à rapporter à Latem Sa",
     "verifie": true
    },
    {
     "id": "alb-281-r3",
     "texte": "1 × Kriptonite",
     "note": "à rapporter à Latem Sa, craftable par un Mineur niveau 120",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Mineur)"
   ],
   "numero": 52
  },
  {
   "id": "alb-282",
   "nom": "Une partie de cache-cache",
   "dofus": "align-bonta",
   "niveauConseille": 133,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-281",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-282-r1",
     "texte": "1 × Aile de Raie",
     "note": "à rapporter à Nara, craftable par un Pêcheur niveau 130",
     "verifie": true
    },
    {
     "id": "alb-282-r2",
     "texte": "1 × Bière du Chabrûlé",
     "note": "à rapporter à Nara",
     "verifie": true
    },
    {
     "id": "alb-282-r3",
     "texte": "1 × Philtre de Dragofesse",
     "note": "à rapporter à Nara, craftable par un Éleveur niveau 75",
     "verifie": true
    }
   ],
   "deroule": [
    "Convaincre Norb de vous aider",
    "Apporter les objets demandés par Bellus Sel pour accéder à la grotte",
    "Porter des sous-vêtements et retourner voir Nara"
   ],
   "aide": [
    "objet à crafter (Pêcheur)",
    "objet à crafter (Éleveur)"
   ],
   "numero": 53
  },
  {
   "id": "alb-283",
   "nom": "Pour vivre heureux",
   "dofus": "align-bonta",
   "niveauConseille": 134,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-282",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-283-r1",
     "texte": "6 × Bois de Noisetier",
     "note": "à rapporter à Nara",
     "verifie": true
    },
    {
     "id": "alb-283-r2",
     "texte": "1 × Blague de Soufre",
     "note": "à rapporter à Nara",
     "verifie": true
    },
    {
     "id": "alb-283-r3",
     "texte": "1 × Kriptonite",
     "note": "à rapporter à Nara, craftable par un Mineur niveau 120",
     "verifie": true
    },
    {
     "id": "alb-283-r4",
     "texte": "2 × Étoffe Zoth",
     "note": "à rapporter à Nara",
     "verifie": true
    }
   ],
   "deroule": [
    "Apporter 3000 Kamas ou 1 Souvenir d'Enutrof à Setag"
   ],
   "aide": [
    "objet à crafter (Mineur)"
   ],
   "numero": 54
  },
  {
   "id": "alb-284",
   "nom": "La tactique des gens d'armes",
   "dofus": "align-bonta",
   "niveauConseille": 135,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-283",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Battre Lenglad et retourner voir Amayiro",
    "Chercher des renseignements à la bibliothèque de Pandala",
    "Délivrer Dréna Nassema"
   ],
   "numero": 55
  },
  {
   "id": "alb-285",
   "nom": "La panoplie du milicien",
   "dofus": "align-bonta",
   "niveauConseille": 136,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-284",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-285-r1",
     "texte": "2 × Kriptonite",
     "note": "à rapporter à Nara, craftable par un Mineur niveau 120",
     "verifie": true
    },
    {
     "id": "alb-285-r2",
     "texte": "20 × Bois de Noisetier",
     "note": "à rapporter à Nara",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer le minerai des profondeurs"
   ],
   "aide": [
    "objet à crafter (Mineur)"
   ],
   "numero": 56
  },
  {
   "id": "alb-286",
   "nom": "Ambition ambigüe",
   "dofus": "align-bonta",
   "niveauConseille": 137,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-285",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-286-r1",
     "texte": "1 × Seau de Pinces à Linge",
     "note": "à rapporter à Jibworknouille, craftable par un Bricoleur niveau 137",
     "verifie": true
    },
    {
     "id": "alb-286-r2",
     "texte": "1 × Cocon de Ver à Soie",
     "note": "à rapporter à Maskara",
     "verifie": true
    },
    {
     "id": "alb-286-r3",
     "texte": "5 × Sépale de Nerbe",
     "note": "à rapporter à Maskara",
     "verifie": true
    }
   ],
   "deroule": [
    "Interroger les bworks mages au sujet de la Grafioze",
    "Faire le tour des bibliothèques",
    "Réunir les 6 Dofus primordiaux",
    "Invoquer un démon du 666e cercle et pactiser avec lui",
    "Vider la Mer d'Asse en moins de trois jours",
    "Faire le tour des Plaines de Cania en 80 jours, sur une main et les yeux bandés",
    "Trouver une pince à linge",
    "Accomplir le rituel d'enchantement"
   ],
   "aide": [
    "objet à crafter (Bricoleur)"
   ],
   "numero": 57
  },
  {
   "id": "alb-290",
   "nom": "Trâknar",
   "dofus": "align-bonta",
   "niveauConseille": 138,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-286",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher les documents sur les patrouilles"
   ],
   "numero": 58
  },
  {
   "id": "alb-289",
   "nom": "La Grafioze",
   "dofus": "align-bonta",
   "niveauConseille": 139,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-290",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver le Vieux Grimoire Bwork"
   ],
   "numero": 59
  },
  {
   "id": "alb-291",
   "nom": "Attaque à retardement",
   "dofus": "align-bonta",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-289",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher le plan d'attaque dans la Tour de Brâkmar",
    "Trouver le nouveau plan d'attaque dans le bureau de Ledrob Terceséc"
   ],
   "numero": 60
  },
  {
   "id": "alb-293",
   "nom": "Une rumeur intéressante",
   "dofus": "align-bonta",
   "niveauConseille": 151,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-291",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-293-r1",
     "texte": "1 × Griffe de Phorrêveur",
     "note": "à rapporter à Tavernier du Ripate",
     "verifie": true
    },
    {
     "id": "alb-293-r2",
     "texte": "1 × Peau de Métaphorreur",
     "note": "à rapporter à Tavernier du Ripate",
     "verifie": true
    },
    {
     "id": "alb-293-r3",
     "texte": "1 × Corne de Père Phorreur",
     "note": "à rapporter à Tavernier du Ripate",
     "verifie": true
    },
    {
     "id": "alb-293-r4",
     "texte": "1 × Œil de Phozami",
     "note": "à rapporter à Tavernier du Ripate",
     "verifie": true
    }
   ],
   "deroule": [
    "Interroger les taverniers d'Amakna au sujet de la Corne Edfrit"
   ],
   "numero": 61
  },
  {
   "id": "alb-294",
   "nom": "Investigations à Moon",
   "dofus": "align-bonta",
   "niveauConseille": 152,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-293",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver le gardien de la Corne Edfrit"
   ],
   "numero": 62
  },
  {
   "id": "alb-295",
   "nom": "Manière douce",
   "dofus": "align-bonta",
   "niveauConseille": 153,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-294",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-295-r1",
     "texte": "1 × Salace de poissons",
     "note": "à rapporter à Turorte, craftable par un Pêcheur niveau 153",
     "verifie": true
    }
   ],
   "deroule": [
    "Interroger les résidents de l'île de Moon"
   ],
   "aide": [
    "objet à crafter (Pêcheur)"
   ],
   "numero": 63
  },
  {
   "id": "alb-296",
   "nom": "Histoires de tortues",
   "dofus": "align-bonta",
   "niveauConseille": 154,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-295",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Sauver le bwak de feu au nord du chanil"
   ],
   "numero": 64
  },
  {
   "id": "alb-302",
   "nom": "Bandanarthrie",
   "dofus": "align-bonta",
   "niveauConseille": 155,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-296",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-302-r1",
     "texte": "1 × Tissu de Rapiéçage",
     "note": "à rapporter à Sosh, craftable par un Tailleur niveau 1",
     "verifie": true
    },
    {
     "id": "alb-302-r2",
     "texte": "1 × Teinture Orange Sanguine",
     "note": "à rapporter à Sosh, craftable par un Alchimiste niveau 155",
     "verifie": true
    }
   ],
   "deroule": [
    "Trouver le bandana de Turorte"
   ],
   "aide": [
    "objet à crafter (Tailleur)",
    "objet à crafter (Alchimiste)"
   ],
   "numero": 65
  },
  {
   "id": "alb-298",
   "nom": "Course-poursuite",
   "dofus": "align-bonta",
   "niveauConseille": 156,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-302",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Rattraper l'espion",
    "Aller voir Amayiro ou Danathor"
   ],
   "numero": 66
  },
  {
   "id": "alb-299",
   "nom": "À la poursuite d'Octolliard rouge",
   "dofus": "align-bonta",
   "niveauConseille": 157,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-298",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "3 × Poursuivant brâkmarien"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 67
  },
  {
   "id": "alb-303",
   "nom": "Une Corne Edfrit sans sel",
   "dofus": "align-bonta",
   "niveauConseille": 158,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-299",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Iop en cape brâkmarienne"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Inspecter les lieux à la recherche de la corne"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 68
  },
  {
   "id": "alb-304",
   "nom": "Un sombre pouvoir",
   "dofus": "align-bonta",
   "niveauConseille": 159,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-303",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Accomplir le rituel de Révélation"
   ],
   "numero": 69
  },
  {
   "id": "alb-333",
   "nom": "Le subterfuge de la corne",
   "dofus": "align-bonta",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-304",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Obtenir x 3 Miteters sur les Alhyènes",
    "Obtenir de la Graisse mammaire de Kanig"
   ],
   "numero": 70
  },
  {
   "id": "alb-318",
   "nom": "Un coupable idéal",
   "dofus": "align-bonta",
   "niveauConseille": 171,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-333",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Fouiller l'atelier des cordonniers à la recherche d'indices"
   ],
   "numero": 71
  },
  {
   "id": "alb-321",
   "nom": "Un peu de juge hot",
   "dofus": "align-bonta",
   "niveauConseille": 172,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-318",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Récupérer de l'hydre au miel dans la cave de Bol Pokuz"
   ],
   "numero": 72
  },
  {
   "id": "alb-325",
   "nom": "De drôles de témoins",
   "dofus": "align-bonta",
   "niveauConseille": 173,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-321",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les clients de la Taverne Alakarte",
    "Interroger les enfants du quartier",
    "Trouver un témoin dans le quartier ouest",
    "Interroger les clients de la maison d'Heticili Ufot",
    "Interroger les clients de la maison d'Heticili Ufot, la nuit"
   ],
   "numero": 73
  },
  {
   "id": "alb-326",
   "nom": "Sram d'Égoutant",
   "dofus": "align-bonta",
   "niveauConseille": 174,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-325",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-326-r1",
     "texte": "1 × Marteau de Raclage",
     "note": "à rapporter à Satirev Onivin, craftable par un Forgeron niveau 15",
     "verifie": true
    },
    {
     "id": "alb-326-r2",
     "texte": "1 × Chacharlatan",
     "note": "à rapporter à Riyou Tchevlakouk",
     "verifie": true
    }
   ],
   "deroule": [
    "Amener Gnerah à Amayiro, de gré ou de force",
    "Convaincre le Chacharlatan de vous suivre",
    "La version de Trev Pelsantery",
    "Le témoignage de S'maid",
    "L'accusation de Gnerah",
    "Votre avis",
    "Le verdict"
   ],
   "aide": [
    "objet à crafter (Forgeron)"
   ],
   "numero": 74
  },
  {
   "id": "alb-334",
   "nom": "Si j'avais un marteau",
   "dofus": "align-bonta",
   "niveauConseille": 175,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-326",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher le livre dans la bibliothèque de Brâkmar",
    "Récupérer du fluide dans la machine cassée",
    "Chercher un morceau de bois",
    "Trouver un sculpteur capable de tailler l'écorce sombre pétrifiée",
    "Trouver le Marteau de Lumière"
   ],
   "numero": 75
  },
  {
   "id": "alb-335",
   "nom": "Esprit, es-tu là ?",
   "dofus": "align-bonta",
   "niveauConseille": 176,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-334",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Comtoise"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alb-335-r1",
     "texte": "35 × Or",
     "note": "à rapporter à Maskara",
     "verifie": true
    },
    {
     "id": "alb-335-r2",
     "texte": "35 × Maïs",
     "note": "à rapporter à Maskara",
     "verifie": true
    },
    {
     "id": "alb-335-r3",
     "texte": "1 × Cuir de Maho Givrefoux",
     "note": "à rapporter à Maskara",
     "verifie": true
    },
    {
     "id": "alb-335-r4",
     "texte": "10 × Laine de Yokaï Givrefoux",
     "note": "à rapporter à Maskara",
     "verifie": true
    },
    {
     "id": "alb-335-r5",
     "texte": "1 × Esprit de Lumière",
     "note": "à rapporter à Ebru of El",
     "verifie": true
    }
   ],
   "deroule": [
    "Trouver des informations sur l'emplacement de la dalle Enutrof",
    "Désactiver la magie de la dalle Ecaflip",
    "Désactiver la magie de la dalle Xélor",
    "Désactiver la magie de la dalle Enutrof",
    "Débloquer l'accès à la grotte",
    "Ouvrir la grotte",
    "Chercher les personnes dont Nosilla Budois a fait mention"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 76
  },
  {
   "id": "alb-328",
   "nom": "Vol du Temps",
   "dofus": "align-bonta",
   "niveauConseille": 177,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-335",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Caisse Mystérieuse"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alb-328-r1",
     "texte": "1 × Sanglier des plaines",
     "note": "à rapporter à Boude Spenssour",
     "verifie": true
    }
   ],
   "deroule": [
    "Trouver un moyen d'entrer dans le repaire des Roublards",
    "Trouver une fille de la Taverne de la Bagrutte intéressée par la proposition des Roublards"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 77
  },
  {
   "id": "alb-451",
   "nom": "La mémoire en lambeaux",
   "dofus": "align-bonta",
   "niveauConseille": 178,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-328",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-451-r1",
     "texte": "5 × Pain des Champs",
     "note": "à rapporter à Nyangaspar, craftable par un Paysan niveau 170",
     "verifie": true
    },
    {
     "id": "alb-451-r2",
     "texte": "5 × Larme d'Eniripsa",
     "note": "à rapporter à Nyangaspar, craftable par un Alchimiste niveau 160",
     "verifie": true
    }
   ],
   "deroule": [
    "Inspecter la demeure de Pouere Fettard",
    "Actionner le levier pour ouvrir la grille",
    "Chercher le repaire de Dardondakal dans les Dents de Pierre",
    "Inspecter l'antre à la recherche de la Psychine"
   ],
   "aide": [
    "objet à crafter (Paysan)",
    "objet à crafter (Alchimiste)"
   ],
   "numero": 78
  },
  {
   "id": "alb-456",
   "nom": "Pense-bête",
   "dofus": "align-bonta",
   "niveauConseille": 179,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-451",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les habitants dans la Montagne des Koalaks",
    "Suivre les instructions de Surivitna",
    "Retrouver Meuh Sieurchance chez lui, au village des éleveurs"
   ],
   "numero": 79
  },
  {
   "id": "alb-457",
   "nom": "L'Éclat de l'Aube",
   "dofus": "align-bonta",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-456",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Rob Mirbelec"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Trouver les Larmes de Sacrieur",
    "Se procurer un Masque à Zag et partir chercher les Larmes de Sacrieur",
    "Chercher des notes de Nileza sur l'îlot Estitch",
    "Écouter ce que la créature chuchote",
    "Chercher le maître de la créature sur l'îlot Estitch"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 80
  },
  {
   "id": "alb-337",
   "nom": "Ingérence en Amakna",
   "dofus": "align-bonta",
   "niveauConseille": 181,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-457",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Inspecter la Milifutaie et ses environs",
    "Fouiller la zone du chemin de fer abandonné"
   ],
   "numero": 81
  },
  {
   "id": "alb-343",
   "nom": "Petites faveurs entre amis",
   "dofus": "align-bonta",
   "niveauConseille": 182,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-337",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 82
  },
  {
   "id": "alb-1715",
   "nom": "Les gardiens de la galerie",
   "dofus": "align-bonta",
   "niveauConseille": 183,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-343",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-1715-r1",
     "texte": "2 × Viande Gâtée",
     "note": "à rapporter à Musa",
     "verifie": true
    },
    {
     "id": "alb-1715-r2",
     "texte": "14 × Tanche",
     "note": "à rapporter à Musa",
     "verifie": true
    },
    {
     "id": "alb-1715-r3",
     "texte": "14 × Millet",
     "note": "à rapporter à Musa",
     "verifie": true
    }
   ],
   "deroule": [
    "Chercher Musa dans les Marécages sans fond",
    "Chercher Lars Tord dans Gisgoul",
    "Chercher Lars Tord",
    "Aider Lars Tord à obtenir le gant magique"
   ],
   "numero": 83
  },
  {
   "id": "alb-1717",
   "nom": "Le plateau de Leng",
   "dofus": "align-bonta",
   "niveauConseille": 184,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1715",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Tombe"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher Lao dans Srambad",
    "Fouiller le caveau du roi Léorictus",
    "Prendre l'urne",
    "Chercher un moyen de s'évader",
    "Échapper aux Araknes",
    "Échapper aux hommes de Leng",
    "Voler la pierre"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 84
  },
  {
   "id": "alb-1719",
   "nom": "Gelé à pierre fendre",
   "dofus": "align-bonta",
   "niveauConseille": 185,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1717",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Antre du Korriandre (Korriandre)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Rammola"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Interroger les habitués",
    "Utiliser le dissolvant",
    "Prendre la Pierre Sacrée incrustée dans la statue"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 85
  },
  {
   "id": "alb-1721",
   "nom": "L'ascension de Qu'Tan",
   "dofus": "align-bonta",
   "niveauConseille": 186,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1719",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Qu'Tan"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Utiliser le mode d'emploi",
    "Desceller l'entrée du temple maudit"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 86
  },
  {
   "id": "alb-1723",
   "nom": "Il ne faut pas se fier aux apparences",
   "dofus": "align-bonta",
   "niveauConseille": 187,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1721",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 87
  },
  {
   "id": "alb-1728",
   "nom": "On se calme",
   "dofus": "align-bonta",
   "niveauConseille": 188,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1723",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-1728-r1",
     "texte": "1 × Soupe d'Aubergine Amaknéenne",
     "note": "à rapporter à Sergent Gracia, craftable par un Chasseur niveau 188",
     "verifie": true
    }
   ],
   "deroule": [
    "Lire le livre L'invasion d'Uk'Not'Allag"
   ],
   "aide": [
    "objet à crafter (Chasseur)"
   ],
   "numero": 88
  },
  {
   "id": "alb-1729",
   "nom": "Tout est bien qui finit mal",
   "dofus": "align-bonta",
   "niveauConseille": 189,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1728",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-1729-r1",
     "texte": "1 × Saphir",
     "note": "à rapporter à Roukerol de Nerouz, craftable par un Mineur niveau 30",
     "verifie": true
    },
    {
     "id": "alb-1729-r2",
     "texte": "1 × Oreille de Blérice",
     "note": "à rapporter à Roukerol de Nerouz",
     "verifie": true
    }
   ],
   "deroule": [
    "Obtenir un mysténergiomètre",
    "Effectuer des relevés dans la Tour de Gisgoul",
    "Vaincre les gardes monstrueux"
   ],
   "aide": [
    "objet à crafter (Mineur)"
   ],
   "numero": 89
  },
  {
   "id": "alb-1730",
   "nom": "Ça fait froid dans le dos",
   "dofus": "align-bonta",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1729",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Donjon de la mine de Sakaï (Grolloum)"
    }
   ],
   "ressources": [
    {
     "id": "alb-1730-r1",
     "texte": "1 × Panterreur",
     "note": "à rapporter à Ale One",
     "verifie": true
    }
   ],
   "deroule": [
    "Utiliser un rossignol pour forcer la serrure",
    "Se débarrasser des créatures",
    "Fouiller la planque secrète"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 90
  },
  {
   "id": "alb-1885",
   "nom": "Cambriolage à durée déterminée",
   "dofus": "align-bonta",
   "niveauConseille": 191,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1730",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Acheter deux bières fraîches",
    "Interroger les parieurs sur les combats de tofus"
   ],
   "numero": 91
  },
  {
   "id": "alb-1887",
   "nom": "C'est toujours dur le matin",
   "dofus": "align-bonta",
   "niveauConseille": 192,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1885",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Fouiller le sud des égouts",
    "Interroger les rats",
    "Conduire Skav en prison",
    "Observer et écouter les passants",
    "Chercher un moyen d'entrer dans le laboratoire suite au départ de ses occupants",
    "Pénétrer dans le laboratoire",
    "Fouiller le laboratoire",
    "Interroger les habitants du port de Madrestam",
    "Chercher des traces des marins dans la jungle interdite",
    "Prendre Huguette Rhon en filature",
    "Parler aux disciples des petits dieux",
    "Vaincre les disciples des petits dieux"
   ],
   "numero": 92
  },
  {
   "id": "alb-1889",
   "nom": "Je panse donc j'essuie",
   "dofus": "align-bonta",
   "niveauConseille": 193,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1887",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-1889-r1",
     "texte": "5 × Œil de Verminocule",
     "note": "à rapporter à Ninae Charpe",
     "verifie": true
    },
    {
     "id": "alb-1889-r2",
     "texte": "5 × Antenne de Bacterrib",
     "note": "à rapporter à Ninae Charpe",
     "verifie": true
    },
    {
     "id": "alb-1889-r3",
     "texte": "3 × Perce-Neige",
     "note": "à rapporter à Benn Zin",
     "verifie": true
    },
    {
     "id": "alb-1889-r4",
     "texte": "3 × Écume de mer",
     "note": "à rapporter à Roukerol de Nerouz",
     "verifie": true
    },
    {
     "id": "alb-1889-r5",
     "texte": "1 × Sel de Baleine",
     "note": "à rapporter à Ninae Charpe",
     "verifie": true
    }
   ],
   "deroule": [
    "Chercher les Krobes altérés par le feu noir à l'aide de l'oscillateur de Ninae Charpe",
    "Prélever des cellules souches sur les Krobes altérés"
   ],
   "numero": 93
  },
  {
   "id": "alb-1891",
   "nom": "L'aube des morts-vivants",
   "dofus": "align-bonta",
   "niveauConseille": 194,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1889",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Individu Encapuchonné"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher des traces des miliciens",
    "Vaincre les geôliers Chafers",
    "Chercher des traces de l'individu encapuchonné",
    "Se renseigner à la bibliothèque sur les occupants des tombes profanées"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 94
  },
  {
   "id": "alb-1893",
   "nom": "Un chemin tout tracé",
   "dofus": "align-bonta",
   "niveauConseille": 195,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1891",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Lacame Arilla"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher des traces du passage d'Helster Dienicht",
    "Fouiller la crypte",
    "Chercher des informations sur le disciple d'Erazal"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 95
  },
  {
   "id": "alb-1895",
   "nom": "Enigma",
   "dofus": "align-bonta",
   "niveauConseille": 196,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1893",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alb-1895-r1",
     "texte": "1 × Artefact Pandawushu Vent",
     "note": "à rapporter à Maha Shoja",
     "verifie": true
    },
    {
     "id": "alb-1895-r2",
     "texte": "1 × Artefact Pandawushu Eau",
     "note": "à rapporter à Maha Shoja",
     "verifie": true
    },
    {
     "id": "alb-1895-r3",
     "texte": "1 × Artefact Pandawushu Feu",
     "note": "à rapporter à Maha Shoja",
     "verifie": true
    },
    {
     "id": "alb-1895-r4",
     "texte": "1 × Artefact Pandawushu Roc",
     "note": "à rapporter à Maha Shoja",
     "verifie": true
    }
   ],
   "deroule": [
    "Plonger la boule d'Eugaicha Ementaire dans les eaux enchantées",
    "Jeter la boule d'Eugaicha Ementaire dans la brise quadramentale",
    "Récupérer la boule d'Eugaicha Ementaire portée par la brise quadramentale",
    "Plonger la boule d'Eugaicha Ementaire dans les flammes funéraires de la pyramide maudite",
    "Éparpiller les cendres de la boule d'Eugaicha Ementaire sur la terre des anciens",
    "Boire du Bojawa et verser le reste sur les cendres",
    "Ramasser des pétales de Sutol dans la cave de Bowisse",
    "Mélanger les pétales de Sutol avec le jus de céréale sacré",
    "Boire le jus de céréale altéré",
    "Activer le totem de Maimane",
    "Vaincre les gardiens d'ossements",
    "Lire le message magique du totem de Maimane"
   ],
   "numero": 96
  },
  {
   "id": "alb-1897",
   "nom": "À glacer le sang",
   "dofus": "align-bonta",
   "niveauConseille": 197,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1895",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Forgefroide de Missiz Frizz (Missiz Frizz)"
    }
   ],
   "deroule": [
    "Interroger la Garde du Jour sans Fin",
    "Chercher des traces du passage d'Erazal dans le bastion des froides légions"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 97
  },
  {
   "id": "alb-1899",
   "nom": "À l'ombre des murs",
   "dofus": "align-bonta",
   "niveauConseille": 198,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1897",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les Voyageurs dimensionnels de Srambad",
    "Interroger les habitués de la taverne du Bourreau",
    "Interroger les commerçants du marché de Srambad",
    "Chercher les disciples d'Erazal"
   ],
   "numero": 98
  },
  {
   "id": "alb-1901",
   "nom": "Fée d'hiver",
   "dofus": "align-bonta",
   "niveauConseille": 199,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1899",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Belvédère d'Ilyzaelle (Ilyzaelle)"
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 99
  },
  {
   "id": "alb-1903",
   "nom": "L'exorciste",
   "dofus": "align-bonta",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alb-1901",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Astiquer une bitte",
    "Arrêter Erazal",
    "Récupérer des documents"
   ],
   "numero": 100
  }
 ],
 "align-coeur-vaillant": [
  {
   "id": "alcv-433",
   "nom": "Apprentissage : Disciple de Ménalt",
   "dofus": "align-coeur-vaillant",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 20 minimum",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "alcv-109",
   "nom": "Apprentissage : Écuyer",
   "dofus": "align-coeur-vaillant",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alcv-433",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 40 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alcv-109-r1",
     "texte": "40 × Edelweiss",
     "note": "à rapporter à Merlan l'Enchaîneur",
     "verifie": true
    },
    {
     "id": "alcv-109-r2",
     "texte": "10 × Bourgeon de Fourbasse",
     "note": "à rapporter à Merlan l'Enchaîneur",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer des champignons dans l'Antre du Koulosse",
    "Brûler les champignons et la mixture de Merlan l'Enchaîneur dans l'Antre du Koulosse"
   ]
  },
  {
   "id": "alcv-120",
   "nom": "Apprentissage : Chevalier de l'Espoir",
   "dofus": "align-coeur-vaillant",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alcv-109",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 60 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alcv-120-r1",
     "texte": "50 × Bauxite",
     "note": "à rapporter à Setag",
     "verifie": true
    }
   ],
   "deroule": [
    "Fouiller le campement des bworks à la recherche d'informations sur Terra Cogita",
    "Délivrer Terra Cogita"
   ]
  },
  {
   "id": "alcv-421",
   "nom": "Apprentissage : Champion Merveilleux",
   "dofus": "align-coeur-vaillant",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alcv-120",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 80 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alcv-421-r1",
     "texte": "1 × Potion de Sésanabolisant",
     "note": "à rapporter à Merlan l'Enchaîneur, craftable par un Alchimiste niveau 180",
     "verifie": true
    }
   ],
   "deroule": [
    "Prendre la relève de la garde"
   ],
   "aide": [
    "objet à crafter (Alchimiste)"
   ]
  },
  {
   "id": "alcv-1916",
   "nom": "Apprentissage : Héros Légendaire",
   "dofus": "align-coeur-vaillant",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alcv-421",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 100 minimum",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Aquadôme de Merkator (Merkator)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Captain Chafer"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Vaincre les gardiens",
    "Vaincre les héros d'antan"
   ],
   "aide": [
    "combat de groupe"
   ]
  }
 ],
 "align-esprit-salvateur": [
  {
   "id": "ales-434",
   "nom": "Apprentissage : Disciple de Jiva",
   "dofus": "align-esprit-salvateur",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 20 minimum",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "ales-111",
   "nom": "Apprentissage : Apprenti Éclairé",
   "dofus": "align-esprit-salvateur",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ales-434",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 40 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ales-111-r1",
     "texte": "1 × Potion de Guérisseur",
     "note": "à rapporter à Elviana Tirips, craftable par un Alchimiste niveau 50",
     "verifie": true
    },
    {
     "id": "ales-111-r2",
     "texte": "15 × Poudre de Perlinpainpain",
     "note": "à rapporter à Elviana Tirips",
     "verifie": true
    }
   ],
   "deroule": [
    "Utiliser la Potion de Résurrection Forcée sur les dépouilles des renégats, dans la prison de Bonta"
   ],
   "aide": [
    "objet à crafter (Alchimiste)"
   ]
  },
  {
   "id": "ales-121",
   "nom": "Apprentissage : Adepte des Écrits",
   "dofus": "align-esprit-salvateur",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ales-111",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 60 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les renégats bontariens dans la prison de Bonta",
    "Explorer la Clairière du Chêne Mou à la recherche d'Eni Hoube",
    "Sortir l'eni Hoube de la Clairière du Chêne Mou",
    "Escorter l'eni Hoube jusqu'à Elya Wood",
    "Escorter l'eni Hoube auprès des renégats bontariens dans la prison de Bonta"
   ]
  },
  {
   "id": "ales-423",
   "nom": "Apprentissage : Maître des Parchemins",
   "dofus": "align-esprit-salvateur",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ales-121",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 80 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "ales-423-r1",
     "texte": "5 × Potion de Vieillesse",
     "note": "à rapporter à Merlan l'Enchaîneur, craftable par un Alchimiste niveau 95",
     "verifie": true
    },
    {
     "id": "ales-423-r2",
     "texte": "10 × Poudre de Perlinpainpain",
     "note": "à rapporter à Merlan l'Enchaîneur",
     "verifie": true
    },
    {
     "id": "ales-423-r3",
     "texte": "14 × Mandragore",
     "note": "à rapporter à Merlan l'Enchaîneur",
     "verifie": true
    },
    {
     "id": "ales-423-r4",
     "texte": "14 × Millet",
     "note": "à rapporter à Merlan l'Enchaîneur",
     "verifie": true
    },
    {
     "id": "ales-423-r5",
     "texte": "14 × Tanche",
     "note": "à rapporter à Merlan l'Enchaîneur",
     "verifie": true
    },
    {
     "id": "ales-423-r6",
     "texte": "4 × Écorce d'Abrakne Sombre",
     "note": "à rapporter à Merlan l'Enchaîneur",
     "verifie": true
    }
   ],
   "deroule": [
    "Mettre de l'eau enchantée dans la Potion de Souvenir : Mémoire",
    "Trouver la statuette de Sumens cachée dans le Temple du Grand Ougah"
   ],
   "aide": [
    "objet à crafter (Alchimiste)"
   ]
  },
  {
   "id": "ales-1917",
   "nom": "Apprentissage : Gardien du Savoir",
   "dofus": "align-esprit-salvateur",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "ales-423",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 100 minimum",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Aquadôme de Merkator (Merkator)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Captain Chafer"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Vaincre les gardiens",
    "Vaincre les héros d'antan"
   ],
   "aide": [
    "combat de groupe"
   ]
  }
 ],
 "align-oeil-attentif": [
  {
   "id": "aloa-435",
   "nom": "Apprentissage : Disciple de Silvosse",
   "dofus": "align-oeil-attentif",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "texte",
     "description": "Être Bontarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 20 minimum",
     "verifie": true
    }
   ],
   "contenu": []
  },
  {
   "id": "aloa-110",
   "nom": "Apprentissage : Espion Silencieux",
   "dofus": "align-oeil-attentif",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "aloa-435",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 40 minimum",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "3 × Renégat bontarien"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Chef des renégats bontariens"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Trouver les trois renégats cachés dans le Territoire des Porcos",
    "Trouver les trois renégats. Ils sont cachés à l'ouest du Donjon des Scarafeuilles",
    "Trouver le chef des renégats caché au sud du Territoire des bandits"
   ],
   "aide": [
    "combat de groupe"
   ]
  },
  {
   "id": "aloa-122",
   "nom": "Apprentissage : Chasseur de Renégats",
   "dofus": "align-oeil-attentif",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "aloa-110",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 60 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "aloa-122-r1",
     "texte": "2 × Viande Macérée",
     "note": "à rapporter à Bol Pokuz",
     "verifie": true
    },
    {
     "id": "aloa-122-r2",
     "texte": "16 × Pomme de Terre",
     "note": "à rapporter à Bol Pokuz",
     "verifie": true
    },
    {
     "id": "aloa-122-r3",
     "texte": "2 × Haricot",
     "note": "à rapporter à Bol Pokuz",
     "verifie": true
    }
   ],
   "deroule": [
    "Obtenir la clef du coffre et l'utiliser"
   ]
  },
  {
   "id": "aloa-425",
   "nom": "Apprentissage : Assassin Suprême",
   "dofus": "align-oeil-attentif",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "aloa-122",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 80 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher où utiliser l'objet étrange dans les cartes environnantes",
    "Chercher Dike Tarak dans le Temple du Grand Ougah",
    "Trouver la Statuette de Sumens dans la Tour de Brâkmar puis l'apporter à Ebru Of El"
   ]
  },
  {
   "id": "aloa-1918",
   "nom": "Apprentissage : Maître des Illusions",
   "dofus": "align-oeil-attentif",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "aloa-425",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 100 minimum",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Aquadôme de Merkator (Merkator)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Captain Chafer"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Vaincre les gardiens",
    "Vaincre les héros d'antan"
   ],
   "aide": [
    "combat de groupe"
   ]
  }
 ],
 "align-brakmar": [
  {
   "id": "alk-375",
   "nom": "Cliquetis fou",
   "dofus": "align-brakmar",
   "niveauConseille": 31,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Mak Gahan"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 1
  },
  {
   "id": "alk-376",
   "nom": "Le professionnel",
   "dofus": "align-brakmar",
   "niveauConseille": 32,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-375",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 2
  },
  {
   "id": "alk-377",
   "nom": "Un coup de fouet",
   "dofus": "align-brakmar",
   "niveauConseille": 33,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-376",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-377-r1",
     "texte": "20 × Potion Raide Dite",
     "note": "à rapporter à Oto Mustam, craftable par un Alchimiste niveau 30",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Alchimiste)"
   ],
   "numero": 3
  },
  {
   "id": "alk-378",
   "nom": "Le dentiste dément",
   "dofus": "align-brakmar",
   "niveauConseille": 34,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-377",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Extraire des dents de Chafer et les apporter à Oto Mustam"
   ],
   "numero": 4
  },
  {
   "id": "alk-379",
   "nom": "La revanche de Mak",
   "dofus": "align-brakmar",
   "niveauConseille": 35,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-378",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Mak Gahan équipé"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 5
  },
  {
   "id": "alk-380",
   "nom": "La noirceur des armes blanches",
   "dofus": "align-brakmar",
   "niveauConseille": 36,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-379",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Amener toutes les caisses"
   ],
   "numero": 6
  },
  {
   "id": "alk-381",
   "nom": "La mise à mort",
   "dofus": "align-brakmar",
   "niveauConseille": 37,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-380",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Écureuil bagarreur"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 7
  },
  {
   "id": "alk-382",
   "nom": "Les gardes d'honneur... à punir",
   "dofus": "align-brakmar",
   "niveauConseille": 38,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-381",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Se renseigner dans les tavernes",
    "Faire un compte-rendu et le donner à Oto"
   ],
   "numero": 8
  },
  {
   "id": "alk-383",
   "nom": "Un oubli regrettable",
   "dofus": "align-brakmar",
   "niveauConseille": 39,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-382",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-383-r1",
     "texte": "1 × Bière de la Tabasse",
     "note": "à rapporter à Oto Mustam",
     "verifie": true
    }
   ],
   "numero": 9
  },
  {
   "id": "alk-384",
   "nom": "Tête de gland",
   "dofus": "align-brakmar",
   "niveauConseille": 40,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-383",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 30,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Croc Gland Enragé"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 10
  },
  {
   "id": "alk-385",
   "nom": "Pauvre larve",
   "dofus": "align-brakmar",
   "niveauConseille": 51,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-384",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Nid du Kwakwa (Kwakwa)"
    }
   ],
   "deroule": [
    "Récupérer un Œuf de Kwakwa"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 11
  },
  {
   "id": "alk-386",
   "nom": "Pauvre larve... dorée",
   "dofus": "align-brakmar",
   "niveauConseille": 52,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-385",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Donjon des Larves (Larve Dorée)"
    }
   ],
   "deroule": [
    "Entrer dans le Donjon des Larves avec la Larve Dorée"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 12
  },
  {
   "id": "alk-387",
   "nom": "Agent double et demi",
   "dofus": "align-brakmar",
   "niveauConseille": 53,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-386",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver Finche Aticus dans Bonta",
    "Chercher le rapport de Finche Aticus dans la taverne de la Bagrutte",
    "Chercher Karl la Saumure dans le port de Bonta"
   ],
   "numero": 13
  },
  {
   "id": "alk-388",
   "nom": "Livreur de mauvaise nouvelle",
   "dofus": "align-brakmar",
   "niveauConseille": 54,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-387",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 14
  },
  {
   "id": "alk-389",
   "nom": "Une collection digne de Xilébo",
   "dofus": "align-brakmar",
   "niveauConseille": 55,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-388",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 15
  },
  {
   "id": "alk-390",
   "nom": "D'égout pillé",
   "dofus": "align-brakmar",
   "niveauConseille": 56,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-389",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Dérober un pot d'alcool de cawotte",
    "Fouiller les égouts à la recherche de la source du mal",
    "Récupérer du sang de Rat contaminé et l'apporter à Oto Mustam"
   ],
   "numero": 16
  },
  {
   "id": "alk-391",
   "nom": "Le tabi mangeur de blops",
   "dofus": "align-brakmar",
   "niveauConseille": 57,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-390",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 17
  },
  {
   "id": "alk-392",
   "nom": "Alchimie malfaisante",
   "dofus": "align-brakmar",
   "niveauConseille": 58,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-391",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver un connaisseur en poisons magiques"
   ],
   "numero": 18
  },
  {
   "id": "alk-393",
   "nom": "Des capes typiques",
   "dofus": "align-brakmar",
   "niveauConseille": 59,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-392",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-393-r1",
     "texte": "5 × Cape Brâkmarienne",
     "note": "à rapporter à Oto Mustam, craftable par un Tailleur niveau 1",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer du glucide aminé dans la Gélaxième Dimension"
   ],
   "aide": [
    "objet à crafter (Tailleur)"
   ],
   "numero": 19
  },
  {
   "id": "alk-394",
   "nom": "Le testament du papa",
   "dofus": "align-brakmar",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-393",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Entrez dans le caveau d'Ixa Mustam",
    "Communiquez avec Ixa Mustam",
    "Trouver le coffre caché par Ixa Mustam"
   ],
   "numero": 20
  },
  {
   "id": "alk-395",
   "nom": "Amadouer ou corrompre ?",
   "dofus": "align-brakmar",
   "niveauConseille": 71,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-394",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Ver à soif vert"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Vert à soif orange"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Vert à soif bleu"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alk-395-r1",
     "texte": "1 × Emballage de corruption",
     "note": "à rapporter à Jean Balle",
     "verifie": true
    }
   ],
   "deroule": [
    "Prendre le bocal",
    "Chercher un ver à soif"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 21
  },
  {
   "id": "alk-396",
   "nom": "Taxe gratuite",
   "dofus": "align-brakmar",
   "niveauConseille": 72,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-395",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Champion de la taverne du Bworkball"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Videur de la taverne de Djaul"
     ],
     "groupe": true
    },
    {
     "type": "donjon",
     "nom": "Pitons Rocheux des Craqueleurs (Craqueleur Légendaire)"
    }
   ],
   "deroule": [
    "Apporter les chèques à Oto Mustam"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 22
  },
  {
   "id": "alk-397",
   "nom": "Par la force ou par la finesse ?",
   "dofus": "align-brakmar",
   "niveauConseille": 73,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-396",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Voler le Poumon des plaines à Azra Lazarus"
   ],
   "numero": 23
  },
  {
   "id": "alk-398",
   "nom": "Le dur travail d'éplucheur de patates",
   "dofus": "align-brakmar",
   "niveauConseille": 74,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-397",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-398-r1",
     "texte": "25 × Pommes de Terre épluchées",
     "note": "à rapporter à Sbab, craftable par un Base niveau 1",
     "verifie": true
    },
    {
     "id": "alk-398-r2",
     "texte": "4 × Aile de dragodinde",
     "note": "à rapporter à Sbab",
     "verifie": true
    },
    {
     "id": "alk-398-r3",
     "texte": "4 × Aile de dragodinde rousse sauvage",
     "note": "à rapporter à Sbab",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Base)"
   ],
   "numero": 24
  },
  {
   "id": "alk-399",
   "nom": "Cruel, mais à quel point ?",
   "dofus": "align-brakmar",
   "niveauConseille": 75,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-398",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 25
  },
  {
   "id": "alk-400",
   "nom": "Activités volcaniques",
   "dofus": "align-brakmar",
   "niveauConseille": 76,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-399",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver Raaga dans la mine Hipouce",
    "Chercher quatre échantillons de lave et les apporter à Raaga",
    "Escorter Raaga par la grotte au sud-est",
    "Défendre Raaga",
    "Continuer l'escorte de Raaga"
   ],
   "numero": 26
  },
  {
   "id": "alk-401",
   "nom": "Chasse à l'espion",
   "dofus": "align-brakmar",
   "niveauConseille": 77,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-400",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver des indices au nord, à l'extérieur de la cité",
    "Se rendre dans les salles d'interrogatoire et trouver l'espion bontarien"
   ],
   "numero": 27
  },
  {
   "id": "alk-402",
   "nom": "Un petit oubli",
   "dofus": "align-brakmar",
   "niveauConseille": 78,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-401",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver les documents et les amener à Oto Mustam"
   ],
   "numero": 28
  },
  {
   "id": "alk-403",
   "nom": "Du venin sinon rien",
   "dofus": "align-brakmar",
   "niveauConseille": 79,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-402",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Laboratoire de Brumen Tinctorias (Nelween)"
    }
   ],
   "deroule": [
    "Remplir une fiole de venin de Scorbute"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 29
  },
  {
   "id": "alk-404",
   "nom": "Le défi du maître guerrier",
   "dofus": "align-brakmar",
   "niveauConseille": 80,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-403",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 70,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Combattre Puja Mustam sans oublier la mise en garde d'Oto Mustam puis retourner voir ce dernier"
   ],
   "numero": 30
  },
  {
   "id": "alk-405",
   "nom": "Joie de courte durée",
   "dofus": "align-brakmar",
   "niveauConseille": 91,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-404",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Enquêter vers la sortie ouest",
    "Chercher les deux individus signalés par Boulor"
   ],
   "numero": 31
  },
  {
   "id": "alk-406",
   "nom": "Au combat !",
   "dofus": "align-brakmar",
   "niveauConseille": 92,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-405",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vaincre les Bontariens et retourner voir Oto Mustam"
   ],
   "numero": 32
  },
  {
   "id": "alk-407",
   "nom": "Un assassin... à Bonta ?",
   "dofus": "align-brakmar",
   "niveauConseille": 93,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-406",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Antre de la Reine Nyée (Reine Nyée)"
    }
   ],
   "deroule": [
    "Récupérer du poison dans un cadavre frais"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 33
  },
  {
   "id": "alk-408",
   "nom": "Un dentier pour l'ami Mak",
   "dofus": "align-brakmar",
   "niveauConseille": 94,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-407",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Cueillir des plantes enchantées"
   ],
   "numero": 34
  },
  {
   "id": "alk-409",
   "nom": "Un choix difficile",
   "dofus": "align-brakmar",
   "niveauConseille": 95,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-408",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Inspecter la tour de Brâkmar à la recherche de fantômes"
   ],
   "numero": 35
  },
  {
   "id": "alk-410",
   "nom": "Arrivée à bon port",
   "dofus": "align-brakmar",
   "niveauConseille": 96,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-409",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "8 × Membre de Commando Bontarien"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 36
  },
  {
   "id": "alk-411",
   "nom": "Humiliation sans précédent",
   "dofus": "align-brakmar",
   "niveauConseille": 97,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-410",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 37
  },
  {
   "id": "alk-412",
   "nom": "Opposition aux opposants",
   "dofus": "align-brakmar",
   "niveauConseille": 98,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-411",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Faire taire les opposants"
   ],
   "numero": 38
  },
  {
   "id": "alk-413",
   "nom": "À la rescousse d'un incapable",
   "dofus": "align-brakmar",
   "niveauConseille": 99,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-412",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "8 × Garde de la Prison"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Délivrer Trof Hapyus dans les geôles de Bonta et l'amener devant Oto Mustam"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 39
  },
  {
   "id": "alk-414",
   "nom": "Mulanthropie",
   "dofus": "align-brakmar",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-413",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Tanière du Meulou (Meulou)"
    }
   ],
   "deroule": [
    "Chercher un alchimiste spécialiste de la mulanthropie dans le village côtier"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 40
  },
  {
   "id": "alk-246",
   "nom": "Triple X",
   "dofus": "align-brakmar",
   "niveauConseille": 111,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-414",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Sousouricière du Rat Noir (Rat Noir)"
    }
   ],
   "deroule": [
    "Trouver un indice dans la tour de Bonta",
    "Interroger les habitués de la Taverne de la Bagrutte",
    "Utiliser l'antidote du Rat Noir"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 41
  },
  {
   "id": "alk-247",
   "nom": "X comme Xephirès",
   "dofus": "align-brakmar",
   "niveauConseille": 112,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-246",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver le Sram dans la Forêt Sombre",
    "Inspecter le bosquet à la recherche d'Exoram"
   ],
   "numero": 42
  },
  {
   "id": "alk-248",
   "nom": "Opération commando",
   "dofus": "align-brakmar",
   "niveauConseille": 113,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-247",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver l'enclos des prisonniers",
    "Délivrer Kelog Korflex",
    "Trouver un moyen de descendre, un bricoleur pourra vous aider",
    "Sortir Exoram de sa corniche",
    "Escorter Exoram jusqu'au temple Sram"
   ],
   "numero": 43
  },
  {
   "id": "alk-250",
   "nom": "Rencontre du premier type",
   "dofus": "align-brakmar",
   "niveauConseille": 114,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-248",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 44
  },
  {
   "id": "alk-251",
   "nom": "Joyau... ze fête",
   "dofus": "align-brakmar",
   "niveauConseille": 115,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-250",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-251-r1",
     "texte": "2 × Dorade au four",
     "note": "à rapporter à Oto Mustam, craftable par un Pêcheur niveau 110",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Pêcheur)"
   ],
   "numero": 45
  },
  {
   "id": "alk-252",
   "nom": "Le cristal de Kain Dharyn",
   "dofus": "align-brakmar",
   "niveauConseille": 116,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-251",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Sabine"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alk-252-r1",
     "texte": "1 × Sabine",
     "note": "à rapporter à Oto Mustam",
     "verifie": true
    },
    {
     "id": "alk-252-r2",
     "texte": "1 × Nacre",
     "note": "à rapporter à Oto Mustam, craftable par un Mineur niveau 40",
     "verifie": true
    },
    {
     "id": "alk-252-r3",
     "texte": "50 × Silicate",
     "note": "à rapporter à Oto Mustam",
     "verifie": true
    }
   ],
   "deroule": [
    "Enlever Sabine",
    "Amener un milicien qualifié face à Oto Mustam",
    "Attendre les Bontariens à la prison de Sabine",
    "Enchanter le cristal de Kain Dharyn"
   ],
   "aide": [
    "combat de groupe",
    "objet à crafter (Mineur)"
   ],
   "numero": 46
  },
  {
   "id": "alk-253",
   "nom": "Cambriolage",
   "dofus": "align-brakmar",
   "niveauConseille": 117,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-252",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 47
  },
  {
   "id": "alk-255",
   "nom": "Livraison rapide",
   "dofus": "align-brakmar",
   "niveauConseille": 118,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-253",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Jissey Pandamme"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Interroger les personnes dans la taverne",
    "Recouvrir le mobilier avec de la Pâte à Tra Khben"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 48
  },
  {
   "id": "alk-256",
   "nom": "Le moment de vérité",
   "dofus": "align-brakmar",
   "niveauConseille": 119,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-255",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Nana moche qui rit"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 49
  },
  {
   "id": "alk-445",
   "nom": "Le puits sans fond",
   "dofus": "align-brakmar",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-256",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Gardien du puits"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alk-445-r1",
     "texte": "10 × Pierre de souillure bleue impure",
     "note": "pour fabriquer Pierre de souillure bleue",
     "verifie": true
    },
    {
     "id": "alk-445-r2",
     "texte": "10 × Eau Potable",
     "note": "pour fabriquer Pierre de souillure bleue",
     "verifie": true
    },
    {
     "id": "alk-445-r3",
     "texte": "10 × Eau Potable",
     "note": "pour fabriquer Pierre de souillure jaune",
     "verifie": true
    },
    {
     "id": "alk-445-r4",
     "texte": "10 × Pierre de souillure jaune impure",
     "note": "pour fabriquer Pierre de souillure jaune",
     "verifie": true
    },
    {
     "id": "alk-445-r5",
     "texte": "10 × Pierre de souillure verte impure",
     "note": "pour fabriquer Pierre de souillure verte",
     "verifie": true
    },
    {
     "id": "alk-445-r6",
     "texte": "10 × Eau Potable",
     "note": "pour fabriquer Pierre de souillure verte",
     "verifie": true
    },
    {
     "id": "alk-445-r7",
     "texte": "3 × Cubitus de Momie Koalak",
     "note": "à rapporter à Divad Dleifrepok",
     "verifie": true
    }
   ],
   "deroule": [
    "Retourner auprès d'Oto Mustam une fois les pierres en votre possession",
    "Obtenir une Pierre des Âmes Souillées auprès du gardien"
   ],
   "aide": [
    "fabrication",
    "combat de groupe"
   ],
   "numero": 50
  },
  {
   "id": "alk-267",
   "nom": "Le carnage des plaines",
   "dofus": "align-brakmar",
   "niveauConseille": 131,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-445",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 51
  },
  {
   "id": "alk-268",
   "nom": "Dans la peau de Sphincter Cell",
   "dofus": "align-brakmar",
   "niveauConseille": 132,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-267",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver un moyen de tromper la vigilance du gardien",
    "Voler une caisse d'équipement"
   ],
   "numero": 52
  },
  {
   "id": "alk-446",
   "nom": "Le forgeron aux deux mains gauches",
   "dofus": "align-brakmar",
   "niveauConseille": 133,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-268",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Donner une prime de 1000 Kamas à Latem Sa",
    "Voler le minerai",
    "Remplacer les outils par 5 Marteaux Martel"
   ],
   "numero": 53
  },
  {
   "id": "alk-270",
   "nom": "Mon nom est poison",
   "dofus": "align-brakmar",
   "niveauConseille": 134,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-446",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver 10 ficelles pour ligoter Highlambert"
   ],
   "numero": 54
  },
  {
   "id": "alk-271",
   "nom": "Un maître ès pion",
   "dofus": "align-brakmar",
   "niveauConseille": 135,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-270",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "S'occuper du tacticien"
   ],
   "numero": 55
  },
  {
   "id": "alk-275",
   "nom": "Supermilicien",
   "dofus": "align-brakmar",
   "niveauConseille": 136,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-271",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Brute épaisse bontarienne"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alk-275-r1",
     "texte": "1 × Truchmuche",
     "note": "à rapporter à Oto Mustam",
     "verifie": true
    }
   ],
   "deroule": [
    "Inspecter les environs à la recherche d'indices",
    "Intercepter le milicien bontarien avant son arrivée à Astrub"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 56
  },
  {
   "id": "alk-276",
   "nom": "Le forgeron",
   "dofus": "align-brakmar",
   "niveauConseille": 137,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-275",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver le forgeron travaillant pour Bonta"
   ],
   "numero": 57
  },
  {
   "id": "alk-277",
   "nom": "Paranoïa aigüe",
   "dofus": "align-brakmar",
   "niveauConseille": 138,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-276",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Nara"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alk-277-r1",
     "texte": "1 × Philtre de Dragofesse",
     "note": "à rapporter à Nara, craftable par un Éleveur niveau 75",
     "verifie": true
    },
    {
     "id": "alk-277-r2",
     "texte": "1 × Langue de Truchmuche",
     "note": "à rapporter à Nara",
     "verifie": true
    },
    {
     "id": "alk-277-r3",
     "texte": "10 × Huile à frire",
     "note": "à rapporter à Nara",
     "verifie": true
    },
    {
     "id": "alk-277-r4",
     "texte": "5 × Planche de Gravure",
     "note": "à rapporter à Nara, craftable par un Bûcheron niveau 140",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Éleveur)",
    "objet à crafter (Bûcheron)",
    "combat de groupe"
   ],
   "numero": 58
  },
  {
   "id": "alk-278",
   "nom": "À la manière des Brâkmariens",
   "dofus": "align-brakmar",
   "niveauConseille": 139,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-277",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver un moyen de récupérer le butin"
   ],
   "numero": 59
  },
  {
   "id": "alk-279",
   "nom": "Le trésor de La Descemer",
   "dofus": "align-brakmar",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-278",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les habitants du port"
   ],
   "numero": 60
  },
  {
   "id": "alk-305",
   "nom": "Une rumeur alléchante",
   "dofus": "align-brakmar",
   "niveauConseille": 151,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-279",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-305-r1",
     "texte": "1 × Griffe de Phorrêveur",
     "note": "à rapporter à Tavernier du Ripate",
     "verifie": true
    },
    {
     "id": "alk-305-r2",
     "texte": "1 × Peau de Métaphorreur",
     "note": "à rapporter à Tavernier du Ripate",
     "verifie": true
    },
    {
     "id": "alk-305-r3",
     "texte": "1 × Corne de Père Phorreur",
     "note": "à rapporter à Tavernier du Ripate",
     "verifie": true
    },
    {
     "id": "alk-305-r4",
     "texte": "1 × Œil de Phozami",
     "note": "à rapporter à Tavernier du Ripate",
     "verifie": true
    }
   ],
   "deroule": [
    "Interroger les taverniers d'Amakna au sujet de la Corne Edfrit"
   ],
   "numero": 61
  },
  {
   "id": "alk-306",
   "nom": "Enquête à Moon",
   "dofus": "align-brakmar",
   "niveauConseille": 152,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-305",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver le gardien de la Corne Edfrit"
   ],
   "numero": 62
  },
  {
   "id": "alk-307",
   "nom": "Manière forte",
   "dofus": "align-brakmar",
   "niveauConseille": 153,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-306",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 62,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-307-r1",
     "texte": "1 × Salace de poissons empoisonnée",
     "note": "à rapporter à Turorte, craftable par un Pêcheur niveau 153",
     "verifie": true
    }
   ],
   "deroule": [
    "Faire parler Turorte par tous les moyens",
    "Interroger les habitants de l'île pour connaître un plat apprécié de Turorte"
   ],
   "aide": [
    "objet à crafter (Pêcheur)"
   ],
   "numero": 63
  },
  {
   "id": "alk-308",
   "nom": "Retour aux origines",
   "dofus": "align-brakmar",
   "niveauConseille": 154,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-307",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Sauver le bwak de feu au nord du chanil"
   ],
   "numero": 64
  },
  {
   "id": "alk-309",
   "nom": "Une faille dans sa carapace",
   "dofus": "align-brakmar",
   "niveauConseille": 155,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-308",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-309-r1",
     "texte": "1 × Grattoir à dos inachevé",
     "note": "pour fabriquer Grattoir à dos Spentox",
     "verifie": true
    },
    {
     "id": "alk-309-r2",
     "texte": "1 × Peau de Mob l'Éponge",
     "note": "pour fabriquer Grattoir à dos Spentox",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer les clefs dans le Repaire de Sphincter Cell"
   ],
   "aide": [
    "fabrication"
   ],
   "numero": 65
  },
  {
   "id": "alk-310",
   "nom": "Les documents avant tout",
   "dofus": "align-brakmar",
   "niveauConseille": 156,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-309",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 66
  },
  {
   "id": "alk-312",
   "nom": "On m'appelle l'Escargot",
   "dofus": "align-brakmar",
   "niveauConseille": 156,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-310",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "facultative": true
  },
  {
   "id": "alk-311",
   "nom": "Les ordres sont-ils les ordres ?",
   "dofus": "align-brakmar",
   "niveauConseille": 156,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-310",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Parler à l'espion"
   ],
   "facultative": true
  },
  {
   "id": "alk-313",
   "nom": "Contre-espion",
   "dofus": "align-brakmar",
   "niveauConseille": 157,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-310",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Intercepter l'espion"
   ],
   "numero": 67
  },
  {
   "id": "alk-314",
   "nom": "Histoires de salaces",
   "dofus": "align-brakmar",
   "niveauConseille": 158,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-313",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver Sim le Soft au sud du massif des Routes Rocailleuses",
    "Préparer de la salace fourrée au pollen dans le chaudron primordial pour la montrer à Oto Mustam"
   ],
   "numero": 68
  },
  {
   "id": "alk-315",
   "nom": "Affrontement !",
   "dofus": "align-brakmar",
   "niveauConseille": 159,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-314",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Sadida en cape bontarienne"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Fouiller l'endroit indiqué par Turorte",
    "Inspecter les lieux à la recherche de la corne"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 69
  },
  {
   "id": "alk-317",
   "nom": "Légitime défense",
   "dofus": "align-brakmar",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-315",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher une personne susceptible de vous renseigner sur les salles de jeux",
    "Interroger les habitués de la salle de jeux",
    "Découvrir la planque de Trape pour lui faire la peau",
    "Infliger une correction au chef des Kanigs"
   ],
   "numero": 70
  },
  {
   "id": "alk-319",
   "nom": "L'épée maudite",
   "dofus": "align-brakmar",
   "niveauConseille": 171,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-317",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Posséder un réceptacle pour récupérer la Corruptite",
    "Apporter la Corruptite à Domen ou Divad"
   ],
   "numero": 71
  },
  {
   "id": "alk-320",
   "nom": "Allez, ce fer...",
   "dofus": "align-brakmar",
   "niveauConseille": 172,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-319",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Tequelest"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "3 × Esprit de Lave"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alk-320-r1",
     "texte": "70 × Maïs",
     "note": "à rapporter à Zeurg",
     "verifie": true
    },
    {
     "id": "alk-320-r2",
     "texte": "1 × Pointes de Knout",
     "note": "pour fabriquer Knout Artisanal",
     "verifie": true
    },
    {
     "id": "alk-320-r3",
     "texte": "1 × Manche de Knout",
     "note": "pour fabriquer Knout Artisanal",
     "verifie": true
    },
    {
     "id": "alk-320-r4",
     "texte": "1 × Lanières de Knout",
     "note": "pour fabriquer Knout Artisanal",
     "verifie": true
    }
   ],
   "aide": [
    "fabrication",
    "combat de groupe"
   ],
   "numero": 72
  },
  {
   "id": "alk-322",
   "nom": "Poignée d'amour",
   "dofus": "align-brakmar",
   "niveauConseille": 173,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-320",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Charme Sombre Ensorcelé"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Trouver le bûcheron",
    "Mettre 1 Potion d'Étincelle au pied de l'Atelier des Sculpteurs d'Astrub",
    "Ouvrir le passage menant à la Charmaie Sombre"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 73
  },
  {
   "id": "alk-323",
   "nom": "Le Marteau des Chus",
   "dofus": "align-brakmar",
   "niveauConseille": 174,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-322",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "3 × Garde de la forge"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Esprit de Lumière"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "alk-323-r1",
     "texte": "1 × Teinture Magique Ténébreuse",
     "note": "à rapporter à Kaffra Kyper, craftable par un Alchimiste niveau 174",
     "verifie": true
    }
   ],
   "deroule": [
    "Voler le Marteau de Lumière à Kosuke Ichazum",
    "Accomplir l'exorcisme sous la Tour de Brâkmar",
    "Apporter le marteau à Oto... ou à Domen ?"
   ],
   "aide": [
    "combat de groupe",
    "objet à crafter (Alchimiste)"
   ],
   "numero": 74
  },
  {
   "id": "alk-327",
   "nom": "L'épée, ça sent mauvais",
   "dofus": "align-brakmar",
   "niveauConseille": 175,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-323",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-327-r1",
     "texte": "5 × Potion de Courant d'Air",
     "note": "pour fabriquer Lotion l'Aérol",
     "verifie": true
    },
    {
     "id": "alk-327-r2",
     "texte": "35 × Morue",
     "note": "pour fabriquer Lotion l'Aérol",
     "verifie": true
    },
    {
     "id": "alk-327-r3",
     "texte": "2 × Laine de Maho Givrefoux",
     "note": "pour fabriquer Lotion l'Aérol",
     "verifie": true
    },
    {
     "id": "alk-327-r4",
     "texte": "10 × Poudre de Perlinpainpain",
     "note": "pour fabriquer Lotion l'Aérol",
     "verifie": true
    },
    {
     "id": "alk-327-r5",
     "texte": "10 × Poudre Temporelle",
     "note": "pour fabriquer Lotion l'Aérol",
     "verifie": true
    },
    {
     "id": "alk-327-r6",
     "texte": "35 × Belladone",
     "note": "pour fabriquer Lotion l'Aérol",
     "verifie": true
    },
    {
     "id": "alk-327-r7",
     "texte": "3 × Potion de Vieillesse",
     "note": "pour fabriquer Lotion l'Aérol",
     "verifie": true
    }
   ],
   "deroule": [
    "Apporter 3 Eaux Putrides à Mulic Bere ou à Domen"
   ],
   "aide": [
    "fabrication"
   ],
   "numero": 75
  },
  {
   "id": "alk-324",
   "nom": "Plus, plus de puissance !",
   "dofus": "align-brakmar",
   "niveauConseille": 176,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-327",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vaincre les cauchemars pour imprégner la lame",
    "Faire appel aux talents d'un maître Forgemage dans l'atelier de Sotsiah Peh"
   ],
   "numero": 76
  },
  {
   "id": "alk-329",
   "nom": "Des recherches sur la corne",
   "dofus": "align-brakmar",
   "niveauConseille": 177,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-324",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les clients de la Taverne Atolmond",
    "Vaincre les contrebandiers pour accéder à l'entrepôt",
    "Voler une caisse de minerai précieux",
    "Incendier la planque"
   ],
   "numero": 77
  },
  {
   "id": "alk-330",
   "nom": "Maître chanteur",
   "dofus": "align-brakmar",
   "niveauConseille": 178,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-329",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-330-r1",
     "texte": "35 × Bois de Kaliptus",
     "note": "à rapporter à Otho Laringo",
     "verifie": true
    },
    {
     "id": "alk-330-r2",
     "texte": "35 × Bois de Bambou Sombre",
     "note": "à rapporter à Otho Laringo",
     "verifie": true
    },
    {
     "id": "alk-330-r3",
     "texte": "5 × Ébonite",
     "note": "à rapporter à Otho Laringo, craftable par un Mineur niveau 40",
     "verifie": true
    },
    {
     "id": "alk-330-r4",
     "texte": "5 × Rutile",
     "note": "à rapporter à Otho Laringo, craftable par un Mineur niveau 160",
     "verifie": true
    },
    {
     "id": "alk-330-r5",
     "texte": "5 × Estouffade de Morue",
     "note": "à rapporter à Otho Laringo, craftable par un Pêcheur niveau 170",
     "verifie": true
    },
    {
     "id": "alk-330-r6",
     "texte": "1 × Pagne de Trantroa",
     "note": "à rapporter à Alit Elfminate",
     "verifie": true
    },
    {
     "id": "alk-330-r7",
     "texte": "1 × Laine de Maho Givrefoux",
     "note": "à rapporter à Alit Elfminate",
     "verifie": true
    }
   ],
   "deroule": [
    "Voler 1 Caisse de poison dans les réserves de Brâkmar",
    "Déposer 1 Caisse de poison et 10 Poisons cinglants dans le repaire",
    "Déposer les caisses d'épées dans le repaire"
   ],
   "aide": [
    "objet à crafter (Mineur)",
    "objet à crafter (Pêcheur)"
   ],
   "numero": 78
  },
  {
   "id": "alk-331",
   "nom": "Comploteur malgré lui",
   "dofus": "align-brakmar",
   "niveauConseille": 179,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-330",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Abominable Sept des mers"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Récupérer de l'Amaryllis",
    "Interroger les villageois de l'île d'Otomaï",
    "Convaincre Hélas de Ciwillekh de glisser des marchandises de contrebande",
    "Glisser les cocktails et la potion dans les marchandises"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 79
  },
  {
   "id": "alk-332",
   "nom": "Le roi Estitch",
   "dofus": "align-brakmar",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-331",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Rob Mirbelec"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Interroger les disciples d'Otomaï sur son île",
    "Trouver des Troolls Sidimotes",
    "Se procurer un Masque à Zag et partir chercher des Troolls Sidimotes",
    "Chercher des notes de Nileza sur l'îlot Estitch",
    "Écouter ce que la créature chuchote",
    "Chercher le maître de la créature sur l'îlot Estitch"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 80
  },
  {
   "id": "alk-352",
   "nom": "Le trou d'Uk",
   "dofus": "align-brakmar",
   "niveauConseille": 181,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-332",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Combattre les Bontariens",
    "Emprunter le passage secret",
    "Chercher des volontaires pour garder la Tour de Gisgoul",
    "Débaucher des guerriers pour les mettre au service d'Uk'Not'Allag",
    "Consulter les mages de la Tour de Brâkmar",
    "Trouver un disciple pour Uk'Not'Allag"
   ],
   "numero": 81
  },
  {
   "id": "alk-474",
   "nom": "Gaspiller l'énergie ensemble",
   "dofus": "align-brakmar",
   "niveauConseille": 182,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-352",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-474-r1",
     "texte": "1 × Fée Récyde Desyros",
     "note": "à rapporter à Ledrob Terceséc",
     "verifie": true
    },
    {
     "id": "alk-474-r2",
     "texte": "1 × Potion de Guérisseur",
     "note": "à rapporter à Âme d'Hydale, craftable par un Alchimiste niveau 50",
     "verifie": true
    },
    {
     "id": "alk-474-r3",
     "texte": "1 × Hydale",
     "note": "à rapporter à Ledrob Terceséc",
     "verifie": true
    }
   ],
   "deroule": [
    "Parler au maître de la Confrérie",
    "Convaincre les Modeleurs de travailler pour Brâkmar",
    "Enlever les épouses",
    "Chercher le Sacrieur Hydale",
    "Chercher Hydale dans le cimetière d'Astrub",
    "Découvrir le catalyseur et canaliser l'énergie"
   ],
   "aide": [
    "objet à crafter (Alchimiste)"
   ],
   "numero": 82
  },
  {
   "id": "alk-1716",
   "nom": "Gemme les joyaux",
   "dofus": "align-brakmar",
   "niveauConseille": 183,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-474",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-1716-r1",
     "texte": "14 × Dolomite",
     "note": "à rapporter à Blok Znarf",
     "verifie": true
    },
    {
     "id": "alk-1716-r2",
     "texte": "14 × Bois d'Orme",
     "note": "à rapporter à Blok Znarf",
     "verifie": true
    },
    {
     "id": "alk-1716-r3",
     "texte": "14 × Mandragore",
     "note": "à rapporter à Blok Znarf",
     "verifie": true
    }
   ],
   "deroule": [
    "Ramasser une gemme",
    "Ramasser une bille",
    "Interroger les employés du Château d'Amakna",
    "Voler les plans du château",
    "Chercher Lars Tord dans Gisgoul",
    "Chercher Lars Tord",
    "Aider Lars Tord à obtenir le gant magique"
   ],
   "numero": 83
  },
  {
   "id": "alk-1718",
   "nom": "L'arakne de Leng",
   "dofus": "align-brakmar",
   "niveauConseille": 184,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1716",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Tombe"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher Lao dans Srambad",
    "Fouiller le caveau du prince Djamal Brecht",
    "Prendre l'urne",
    "Chercher un moyen de s'évader",
    "Échapper aux Araknes",
    "Échapper aux hommes de Leng",
    "Voler la pierre"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 84
  },
  {
   "id": "alk-1720",
   "nom": "Marqué d'une pierre blanche",
   "dofus": "align-brakmar",
   "niveauConseille": 185,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1718",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Antre du Korriandre (Korriandre)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Rammola"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Interroger les habitués",
    "Utiliser le dissolvant",
    "Prendre la Pierre Sacrée incrustée dans la statue"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 85
  },
  {
   "id": "alk-1722",
   "nom": "L'essor de Qu'Tan",
   "dofus": "align-brakmar",
   "niveauConseille": 186,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1720",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Qu'Tan"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Utiliser le mode d'emploi",
    "Desceller l'entrée du temple maudit"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 86
  },
  {
   "id": "alk-1724",
   "nom": "L'habit ne fait pas le moine",
   "dofus": "align-brakmar",
   "niveauConseille": 187,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1722",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "numero": 87
  },
  {
   "id": "alk-1725",
   "nom": "Les clefs du malheur",
   "dofus": "align-brakmar",
   "niveauConseille": 188,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1724",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-1725-r1",
     "texte": "1 × Soupe Populaire d'Astrub",
     "note": "à rapporter à Badufron, craftable par un Chasseur niveau 188",
     "verifie": true
    }
   ],
   "deroule": [
    "Lire le livre L'invasion d'Uk'Not'Allag"
   ],
   "aide": [
    "objet à crafter (Chasseur)"
   ],
   "numero": 88
  },
  {
   "id": "alk-1726",
   "nom": "Chaud devant !",
   "dofus": "align-brakmar",
   "niveauConseille": 189,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1725",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-1726-r1",
     "texte": "1 × Rubis",
     "note": "à rapporter à Sotsiah Peh, craftable par un Mineur niveau 50",
     "verifie": true
    },
    {
     "id": "alk-1726-r2",
     "texte": "1 × Œil de Fleuro",
     "note": "à rapporter à Sotsiah Peh",
     "verifie": true
    }
   ],
   "deroule": [
    "Absorber la chaleur du volcan",
    "Obtenir des outils de cambriolage"
   ],
   "aide": [
    "objet à crafter (Mineur)"
   ],
   "numero": 89
  },
  {
   "id": "alk-1727",
   "nom": "La vengeance est un plat qui se mange froid",
   "dofus": "align-brakmar",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1726",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Donjon de la mine de Sakaï (Grolloum)"
    }
   ],
   "ressources": [
    {
     "id": "alk-1727-r1",
     "texte": "1 × Perkü",
     "note": "à rapporter à Démolisseur Brâkmarien",
     "verifie": true
    }
   ],
   "deroule": [
    "Utiliser le Talisman de Grassimore sur les flammes froides",
    "Récupérer du matériel gobelin",
    "Simuler un cambriolage par les gobelins des glaces",
    "Se débarrasser des vigiles",
    "Voler le marteau"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 90
  },
  {
   "id": "alk-1886",
   "nom": "Mélodie en sous-sol",
   "dofus": "align-brakmar",
   "niveauConseille": 191,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1727",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Acheter une bière fraîche"
   ],
   "numero": 91
  },
  {
   "id": "alk-1888",
   "nom": "Un monde en pets",
   "dofus": "align-brakmar",
   "niveauConseille": 192,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1886",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Fouiller les égouts",
    "Interroger les rats",
    "Conduire Skav en prison",
    "Observer et écouter les passants",
    "Chercher un moyen d'entrer dans le laboratoire suite au départ de ses occupants",
    "Pénétrer dans le laboratoire",
    "Fouiller le laboratoire",
    "Interroger les habitants du port de Madrestam",
    "Chercher des traces des marins dans la jungle interdite",
    "Prendre Huguette Rhon en filature",
    "Parler aux disciples des petits dieux",
    "Vaincre les disciples des petits dieux"
   ],
   "numero": 92
  },
  {
   "id": "alk-1890",
   "nom": "Mieux vaut guérir que mourir",
   "dofus": "align-brakmar",
   "niveauConseille": 193,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1888",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-1890-r1",
     "texte": "5 × Œil de Verminocule",
     "note": "à rapporter à Ninae Charpe",
     "verifie": true
    },
    {
     "id": "alk-1890-r2",
     "texte": "5 × Antenne de Bacterrib",
     "note": "à rapporter à Ninae Charpe",
     "verifie": true
    },
    {
     "id": "alk-1890-r3",
     "texte": "3 × Perce-Neige",
     "note": "à rapporter à Benn Zin",
     "verifie": true
    },
    {
     "id": "alk-1890-r4",
     "texte": "3 × Écume de mer",
     "note": "à rapporter à Roukerol de Nerouz",
     "verifie": true
    },
    {
     "id": "alk-1890-r5",
     "texte": "1 × Sel de Baleine",
     "note": "à rapporter à Ninae Charpe",
     "verifie": true
    }
   ],
   "deroule": [
    "Chercher les Krobes altérés par le feu noir à l'aide de l'oscillateur de Ninae Charpe",
    "Prélever des cellules souches sur les Krobes altérés"
   ],
   "numero": 93
  },
  {
   "id": "alk-1892",
   "nom": "Le crépuscule des morts-vivants",
   "dofus": "align-brakmar",
   "niveauConseille": 194,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1890",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Individu Encapuchonné"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher des traces des miliciens",
    "Vaincre les geôliers Chafers",
    "Chercher des traces de l'individu encapuchonné",
    "Se renseigner à la bibliothèque sur les occupants des tombes profanées"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 94
  },
  {
   "id": "alk-1894",
   "nom": "Le faux-cul",
   "dofus": "align-brakmar",
   "niveauConseille": 195,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1892",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Lacame Arilla"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher des traces du passage d'Helster Dienicht",
    "Fouiller la crypte",
    "Chercher des informations sur le disciple d'Erazal"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 95
  },
  {
   "id": "alk-1896",
   "nom": "Cryptomane",
   "dofus": "align-brakmar",
   "niveauConseille": 196,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1894",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alk-1896-r1",
     "texte": "1 × Artefact Pandawushu Vent",
     "note": "à rapporter à Maha Shoja",
     "verifie": true
    },
    {
     "id": "alk-1896-r2",
     "texte": "1 × Artefact Pandawushu Eau",
     "note": "à rapporter à Maha Shoja",
     "verifie": true
    },
    {
     "id": "alk-1896-r3",
     "texte": "1 × Artefact Pandawushu Feu",
     "note": "à rapporter à Maha Shoja",
     "verifie": true
    },
    {
     "id": "alk-1896-r4",
     "texte": "1 × Artefact Pandawushu Roc",
     "note": "à rapporter à Maha Shoja",
     "verifie": true
    }
   ],
   "deroule": [
    "Plonger la boule d'Eugaicha Ementaire dans les eaux enchantées",
    "Jeter la boule d'Eugaicha Ementaire dans la brise quadramentale",
    "Récupérer la boule d'Eugaicha Ementaire portée par la brise quadramentale",
    "Plonger la boule d'Eugaicha Ementaire dans les flammes funéraires de la pyramide maudite",
    "Éparpiller les cendres de la boule d'Eugaicha Ementaire sur la terre des anciens",
    "Boire du Bojawa et verser le reste sur les cendres",
    "Ramasser des pétales de Sutol dans la cave de Bowisse",
    "Mélanger les pétales de Sutol avec le jus de céréale sacré",
    "Boire le jus de céréale altéré",
    "Activer le totem de Maimane",
    "Vaincre les gardiens d'ossements",
    "Lire le message magique du totem de Maimane"
   ],
   "numero": 96
  },
  {
   "id": "alk-1898",
   "nom": "Sueurs froides",
   "dofus": "align-brakmar",
   "niveauConseille": 197,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1896",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Forgefroide de Missiz Frizz (Missiz Frizz)"
    }
   ],
   "deroule": [
    "Interroger la Garde du Jour sans Fin",
    "Chercher des traces du passage d'Erazal dans le bastion des froides légions"
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 97
  },
  {
   "id": "alk-1900",
   "nom": "Sur la route d'Erazal",
   "dofus": "align-brakmar",
   "niveauConseille": 198,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1898",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Interroger les Voyageurs dimensionnels de Srambad",
    "Interroger les habitués de la taverne du Bourreau",
    "Interroger les commerçants du marché de Srambad",
    "Chercher les disciples d'Erazal"
   ],
   "numero": 98
  },
  {
   "id": "alk-1902",
   "nom": "Lettre à Ilyz",
   "dofus": "align-brakmar",
   "niveauConseille": 199,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1900",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Belvédère d'Ilyzaelle (Ilyzaelle)"
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "numero": 99
  },
  {
   "id": "alk-1904",
   "nom": "La danse macabre",
   "dofus": "align-brakmar",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1902",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 190,
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Astiquer une bitte",
    "Arrêter Erazal",
    "Récupérer des documents"
   ],
   "numero": 100
  },
  {
   "id": "alk-274",
   "nom": "Les kamas résolvent tout",
   "dofus": "align-brakmar",
   "niveauConseille": 135,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1904",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher des indices dans la bibliothèque de Bonta",
    "Chercher la méthode d'élevage aviaire dans la Volière de la Haute Truche"
   ],
   "facultative": true
  },
  {
   "id": "alk-273",
   "nom": "Le magnanime",
   "dofus": "align-brakmar",
   "niveauConseille": 135,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1904",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher des indices dans la bibliothèque de Bonta",
    "Chercher la méthode d'élevage aviaire dans la Volière de la Haute Truche"
   ],
   "facultative": true
  },
  {
   "id": "alk-272",
   "nom": "Assassinat effectué",
   "dofus": "align-brakmar",
   "niveauConseille": 135,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alk-1904",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Tacticien de Bonta"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher des indices dans la bibliothèque de Bonta",
    "Chercher la méthode d'élevage aviaire dans la Volière de la Haute Truche"
   ],
   "aide": [
    "combat de groupe"
   ],
   "facultative": true
  }
 ],
 "align-coeur-saignant": [
  {
   "id": "alcs-436",
   "nom": "Apprentissage : Disciple de Djaul",
   "dofus": "align-coeur-saignant",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 20 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vérifier la sécurité dans la salle du trône"
   ]
  },
  {
   "id": "alcs-112",
   "nom": "Apprentissage : Surineur",
   "dofus": "align-coeur-saignant",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alcs-436",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 40 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alcs-112-r1",
     "texte": "20 × Graine de Scorbute",
     "note": "à rapporter à Kaffra Kyper",
     "verifie": true
    }
   ],
   "deroule": [
    "Trouver le butin caché dans la troisième salle de la Tanière du Meulou",
    "Contaminer l'eau du puits avec 5 Poisons cinglants"
   ]
  },
  {
   "id": "alcs-123",
   "nom": "Apprentissage : Chevalier du Désespoir",
   "dofus": "align-coeur-saignant",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alcs-112",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 60 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Fouiller les mines à la recherche des statuettes"
   ]
  },
  {
   "id": "alcs-422",
   "nom": "Apprentissage : Champion du Chaos",
   "dofus": "align-coeur-saignant",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alcs-123",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 80 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alcs-422-r1",
     "texte": "1 × Weischelcreme Torte",
     "note": "à rapporter à Kaffra Kyper, craftable par un Paysan niveau 180",
     "verifie": true
    }
   ],
   "deroule": [
    "Prendre la relève de la garde",
    "Interroger les différents boulangers",
    "Récupérer un éclat de roche lunaire gardé par Ougah"
   ],
   "aide": [
    "objet à crafter (Paysan)"
   ]
  },
  {
   "id": "alcs-1919",
   "nom": "Apprentissage : Héros de l'Apocalypse",
   "dofus": "align-coeur-saignant",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alcs-422",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 100 minimum",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Aquadôme de Merkator (Merkator)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Captain Chafer"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Vaincre les gardiens",
    "Vaincre les héros d'antan"
   ],
   "aide": [
    "combat de groupe"
   ]
  }
 ],
 "align-esprit-malsain": [
  {
   "id": "alem-437",
   "nom": "Apprentissage : Disciple d'Hécate",
   "dofus": "align-esprit-malsain",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 20 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vérifier la sécurité dans la salle du trône"
   ]
  },
  {
   "id": "alem-114",
   "nom": "Apprentissage : Apprenti Sombre",
   "dofus": "align-esprit-malsain",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alem-437",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 40 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alem-114-r1",
     "texte": "1 × Potion de Guérisseur",
     "note": "à rapporter à Divad Dleifrepok, craftable par un Alchimiste niveau 50",
     "verifie": true
    },
    {
     "id": "alem-114-r2",
     "texte": "5 × Poudre de Perlinpainpain",
     "note": "à rapporter à Divad Dleifrepok",
     "verifie": true
    }
   ],
   "deroule": [
    "Lire La malédiction d'Erazal à la bibliothèque de Brâkmar"
   ],
   "aide": [
    "objet à crafter (Alchimiste)"
   ]
  },
  {
   "id": "alem-124",
   "nom": "Apprentissage : Adepte des Douleurs",
   "dofus": "align-esprit-malsain",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alem-114",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 60 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver 1 Langue Hiyeu",
    "Avec une corde d'escalade, tremper la Langue Hiyeu dans un puits enchanté"
   ]
  },
  {
   "id": "alem-424",
   "nom": "Apprentissage : Maître des Sévices",
   "dofus": "align-esprit-malsain",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alem-124",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 80 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "alem-424-r1",
     "texte": "1 × Cuivre",
     "note": "à rapporter à Terra Tibya",
     "verifie": true
    },
    {
     "id": "alem-424-r2",
     "texte": "1 × Silicate",
     "note": "à rapporter à Terra Tibya",
     "verifie": true
    },
    {
     "id": "alem-424-r3",
     "texte": "1 × Or",
     "note": "à rapporter à Terra Tibya",
     "verifie": true
    },
    {
     "id": "alem-424-r4",
     "texte": "1 × Pyrute",
     "note": "à rapporter à Terra Tibya, craftable par un Mineur niveau 180",
     "verifie": true
    },
    {
     "id": "alem-424-r5",
     "texte": "1 × Pelle Sécutrice",
     "note": "à rapporter à Terra Tibya, craftable par un Forgeron niveau 60",
     "verifie": true
    },
    {
     "id": "alem-424-r6",
     "texte": "2 × Anneau Fortifiant",
     "note": "à rapporter à Terra Tibya, craftable par un Bijoutier niveau 10",
     "verifie": true
    }
   ],
   "deroule": [
    "Descendre dans les souterrains des koalaks à l'aide d'une corde d'escalade",
    "Tremper la potion de remouflage dans l'eau enchantée",
    "Trouver une Statuette de Sumens cachée dans le Temple du Grand Ougah"
   ],
   "aide": [
    "objet à crafter (Mineur)",
    "objet à crafter (Forgeron)",
    "objet à crafter (Bijoutier)"
   ]
  },
  {
   "id": "alem-1920",
   "nom": "Apprentissage : Gardien des Tortures",
   "dofus": "align-esprit-malsain",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "alem-424",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 100 minimum",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Aquadôme de Merkator (Merkator)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Captain Chafer"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Vaincre les gardiens",
    "Vaincre les héros d'antan"
   ],
   "aide": [
    "combat de groupe"
   ]
  }
 ],
 "align-oeil-assassin": [
  {
   "id": "aloas-438",
   "nom": "Apprentissage : Disciple de Brumaire",
   "dofus": "align-oeil-assassin",
   "niveauConseille": 60,
   "prerequis": [
    {
     "type": "texte",
     "description": "Être Brâkmarien",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 20 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vérifier la sécurité dans la salle du trône"
   ]
  },
  {
   "id": "aloas-113",
   "nom": "Apprentissage : Espion Sombre",
   "dofus": "align-oeil-assassin",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "aloas-438",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 40 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "aloas-113-r1",
     "texte": "50 × Or",
     "note": "à rapporter à Setag",
     "verifie": true
    },
    {
     "id": "aloas-113-r2",
     "texte": "1 × Huile de Koode",
     "note": "à rapporter à Setag, craftable par un Paysan niveau 32",
     "verifie": true
    },
    {
     "id": "aloas-113-r3",
     "texte": "1 × Grande pierre d'âme",
     "note": "à rapporter à Divad Dleifrepok, craftable par un Mineur niveau 100",
     "verifie": true
    }
   ],
   "deroule": [
    "Apporter 1 Cocktail Moritov obtenu sur les Palmifleurs Morito à Divad Dleifrepok",
    "Se rendre dans la salle du rituel avec les personnes requises",
    "Utiliser la Pierre d'âme adouée sur la tombe de l'Enutrof Terra Tibya, près d'un pont de la rivière Kawaii"
   ],
   "aide": [
    "objet à crafter (Paysan)",
    "objet à crafter (Mineur)"
   ]
  },
  {
   "id": "aloas-125",
   "nom": "Apprentissage : Chasseur d'Âmes",
   "dofus": "align-oeil-assassin",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "aloas-113",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 60 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "aloas-125-r1",
     "texte": "1 × Vieil Os de Dragoeuf",
     "note": "à rapporter à Rigal Main Crochue",
     "verifie": true
    },
    {
     "id": "aloas-125-r2",
     "texte": "12 × Bois d'Ébène",
     "note": "à rapporter à Sotsiah Peh",
     "verifie": true
    }
   ],
   "deroule": [
    "Accomplir le rituel dans le Cimetière des Torturés"
   ]
  },
  {
   "id": "aloas-426",
   "nom": "Apprentissage : Psychopathe",
   "dofus": "align-oeil-assassin",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "aloas-125",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 80 minimum",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "aloas-426-r1",
     "texte": "6 × Os Invisible du Chafer Invisible",
     "note": "à rapporter à Uba Tessé",
     "verifie": true
    },
    {
     "id": "aloas-426-r2",
     "texte": "2 × Tissu Invisible",
     "note": "à rapporter à Uba Tessé",
     "verifie": true
    },
    {
     "id": "aloas-426-r3",
     "texte": "14 × Millet",
     "note": "à rapporter à Uba Tessé",
     "verifie": true
    },
    {
     "id": "aloas-426-r4",
     "texte": "7 × Tanche",
     "note": "à rapporter à Uba Tessé",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer la Statuette de Sumens dans le Temple du Grand Ougah",
    "Trouver la Statuette de Sumens dans la Tour de Bonta puis l'apporter à Ledrob Terceséc",
    "Déposer la statuette sur l'autel des sacrifices de la Tour de Gisgoul"
   ]
  },
  {
   "id": "aloas-1921",
   "nom": "Apprentissage : Maître des Ombres",
   "dofus": "align-oeil-assassin",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "aloas-426",
     "verifie": true
    },
    {
     "type": "texte",
     "description": "Niveau d'alignement 100 minimum",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "donjon",
     "nom": "Aquadôme de Merkator (Merkator)"
    },
    {
     "type": "combat",
     "adversaires": [
      "Captain Chafer"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Vaincre les gardiens",
    "Vaincre les héros d'antan"
   ],
   "aide": [
    "combat de groupe"
   ]
  }
 ],
 "frigost-quetes": [
  {
   "id": "frq-1328",
   "nom": "Mille et un jours, un destin",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-1327",
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
    "S'éloigner de Nileza pour qu'il termine la préparation de la potion",
    "Constater les effets de la potion de Nileza"
   ],
   "theme": "Épilogue hivernal"
  },
  {
   "id": "frq-615",
   "nom": "Les monologues du vaccin",
   "dofus": "frigost-quetes",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Rendez-vous à la taverne du Paradis frigostien à la tranche horaire prévue"
   ],
   "theme": "Jouer au docteur"
  },
  {
   "id": "frq-631",
   "nom": "Épis d'Emi",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-615",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Jouer au docteur"
  },
  {
   "id": "frq-674",
   "nom": "Le mal a dit",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-631",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-674-r1",
     "texte": "1 × Huile de Mamansot",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    }
   ],
   "deroule": [
    "Se servir dans la cave de Grand-père",
    "Apporter 1 Céréale ou 1 Plante expérimentale à Albert Paisse",
    "Obtenir 1 Ecumouth vivant auprès de Gormor l'Equarrisseur pour préparer du Jus d'Ecumouth pressé et l'apporter à Albert Paisse",
    "Récupérer les Racines Hiques et les apporter à Albert Paisse"
   ],
   "theme": "Jouer au docteur"
  },
  {
   "id": "frq-556",
   "nom": "En semant se ment",
   "dofus": "frigost-quetes",
   "niveauConseille": 110,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-556-r1",
     "texte": "10 × Frostiz",
     "note": "à rapporter à Cassiopée Hisane",
     "verifie": true
    }
   ],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-566",
   "nom": "Cent vingt trois fleurs, point comme les autres",
   "dofus": "frigost-quetes",
   "niveauConseille": 110,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-566-r1",
     "texte": "2 × Perce-Neige",
     "note": "à rapporter à Bisale Vinlenta",
     "verifie": true
    }
   ],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-557",
   "nom": "Pomdeupin vaut mieux que trois tu l'auras",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-556",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-567",
   "nom": "Botanique-nique-nique",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-566",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-558",
   "nom": "Massacre au hakapik",
   "dofus": "frigost-quetes",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-557",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-568",
   "nom": "A fleur de peau",
   "dofus": "frigost-quetes",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-567",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-559",
   "nom": "Mettre son grain de sel",
   "dofus": "frigost-quetes",
   "niveauConseille": 150,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-558",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-569",
   "nom": "Mes lys fleurs",
   "dofus": "frigost-quetes",
   "niveauConseille": 150,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-568",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-560",
   "nom": "Mauvaise graine",
   "dofus": "frigost-quetes",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-559",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-570",
   "nom": "Rose à lys, Rose à lys, oh !",
   "dofus": "frigost-quetes",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-569",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-561",
   "nom": "Champ Pomy",
   "dofus": "frigost-quetes",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-560",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-571",
   "nom": "Fleuries mais rougissent",
   "dofus": "frigost-quetes",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-570",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-562",
   "nom": "Gant graine",
   "dofus": "frigost-quetes",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-561",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-572",
   "nom": "Heureux qui, comme les lys",
   "dofus": "frigost-quetes",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-571",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-563",
   "nom": "Les graines de la discorde",
   "dofus": "frigost-quetes",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-562",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 160,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-573",
   "nom": "Le nom de la mycose",
   "dofus": "frigost-quetes",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-572",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 160,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-564",
   "nom": "Le champ des héros",
   "dofus": "frigost-quetes",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-563",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-574",
   "nom": "Crocs n'en bourrent",
   "dofus": "frigost-quetes",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-573",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-565",
   "nom": "Champ borde le château",
   "dofus": "frigost-quetes",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-564",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-575",
   "nom": "Ville fleurie",
   "dofus": "frigost-quetes",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-574",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Agriculture ou alchimie"
  },
  {
   "id": "frq-542",
   "nom": "Pauvre Kiki",
   "dofus": "frigost-quetes",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 80,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "8 × Rat Bougri délavé"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-646",
   "nom": "Star ski et Dutch",
   "dofus": "frigost-quetes",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-646-r1",
     "texte": "2 × Planche à Repasser",
     "note": "à rapporter à Justin Dwa, craftable par un Bûcheron niveau 80",
     "verifie": true
    },
    {
     "id": "frq-646-r2",
     "texte": "2 × Planche de Salut",
     "note": "à rapporter à Justin Dwa, craftable par un Bûcheron niveau 200",
     "verifie": true
    },
    {
     "id": "frq-646-r3",
     "texte": "2 × Planche à Pain",
     "note": "à rapporter à Justin Dwa, craftable par un Bûcheron niveau 160",
     "verifie": true
    },
    {
     "id": "frq-646-r4",
     "texte": "2 × Planche à Pâtisserie",
     "note": "à rapporter à Justin Dwa, craftable par un Bûcheron niveau 120",
     "verifie": true
    }
   ],
   "deroule": [
    "Trouver un cordonnier",
    "Vendre les skis rustiques",
    "Vendre les skis glissants",
    "Vendre les skis sombres",
    "Vendre les skis souples"
   ],
   "aide": [
    "objet à crafter (Bûcheron)"
   ],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-634",
   "nom": "Groméo et Ginette",
   "dofus": "frigost-quetes",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Kanimodo"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "frq-634-r1",
     "texte": "1 × Kaniglou Apprivoisé",
     "note": "à rapporter à Éric Azaraille",
     "verifie": true
    },
    {
     "id": "frq-634-r2",
     "texte": "2 × Perce-Neige",
     "note": "à rapporter à Éric Azaraille",
     "verifie": true
    },
    {
     "id": "frq-634-r3",
     "texte": "1 × Herbe à chacha",
     "note": "à rapporter à Éric Azaraille",
     "verifie": true
    }
   ],
   "deroule": [
    "Parler aux marins du port",
    "Consulter les archives de la bibliothèque",
    "Dérober les clefs à Gemfé Labelle",
    "Délivrer Heike Holo",
    "Parler à Groméo Montay et Ginette Capoué"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-554",
   "nom": "Gène et tique",
   "dofus": "frigost-quetes",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-643",
   "nom": "Manque de re-peau",
   "dofus": "frigost-quetes",
   "niveauConseille": 100,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 90,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Se rendre au quartier ouest de la bourgade de Frigost à partir de 19h00"
   ],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-617",
   "nom": "Scierie Bambelle",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-617-r1",
     "texte": "1 × Marteau de Boisaille",
     "note": "à rapporter à Bambelle, craftable par un Forgeron niveau 6",
     "verifie": true
    },
    {
     "id": "frq-617-r2",
     "texte": "4 × Huile de Koode",
     "note": "à rapporter à Bambelle, craftable par un Paysan niveau 32",
     "verifie": true
    },
    {
     "id": "frq-617-r3",
     "texte": "4 × Métaria rouge",
     "note": "à rapporter à Bambelle, craftable par un Base niveau 1",
     "verifie": true
    },
    {
     "id": "frq-617-r4",
     "texte": "5 × Bakélélite",
     "note": "à rapporter à Bambelle, craftable par un Mineur niveau 80",
     "verifie": true
    },
    {
     "id": "frq-617-r5",
     "texte": "5 × Pyrute",
     "note": "à rapporter à Bambelle, craftable par un Mineur niveau 180",
     "verifie": true
    },
    {
     "id": "frq-617-r6",
     "texte": "20 × Bois de Chêne",
     "note": "à rapporter à Bambelle",
     "verifie": true
    },
    {
     "id": "frq-617-r7",
     "texte": "35 × Bois de Tremble",
     "note": "à rapporter à Bambelle",
     "verifie": true
    },
    {
     "id": "frq-617-r8",
     "texte": "5 × Pizza au boudin de boufmouth",
     "note": "à rapporter à Bambelle",
     "verifie": true
    }
   ],
   "deroule": [
    "Duper Hugo Frais",
    "Fouiller la Tour des archives à la recherche des plans",
    "Entourlouper Valy Domidat",
    "Fouiller l'atelier des bricoleurs à la recherche des plans",
    "Modifier les réglages de la tuyauterie"
   ],
   "aide": [
    "objet à crafter (Forgeron)",
    "objet à crafter (Paysan)",
    "objet à crafter (Base)",
    "objet à crafter (Mineur)"
   ],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-618",
   "nom": "Semer ses graines",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-617",
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
    "Planter une graine"
   ],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-635",
   "nom": "Une blague vaseuse ?",
   "dofus": "frigost-quetes",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Inspecter l'extracteur"
   ],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-640",
   "nom": "Un volcan s'éteint",
   "dofus": "frigost-quetes",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-640-r1",
     "texte": "10 × Bave du Kaskargo",
     "note": "à rapporter à Kimiya",
     "verifie": true
    },
    {
     "id": "frq-640-r2",
     "texte": "1 × Pistil du Tynril",
     "note": "à rapporter à Kimiya",
     "verifie": true
    },
    {
     "id": "frq-640-r3",
     "texte": "5 × Œuf de Crapeur",
     "note": "à rapporter à Kimiya",
     "verifie": true
    }
   ],
   "deroule": [
    "Prélever de l'eau",
    "Chercher un alchimiste expert en créatures en dehors de Frigost",
    "Mettre la créature d'eau dans le bassin"
   ],
   "theme": "Problèmes et solutions"
  },
  {
   "id": "frq-599",
   "nom": "Souvenir, souvenir",
   "dofus": "frigost-quetes",
   "niveauConseille": 110,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver le propriétaire de la vieille peluche Féca"
   ],
   "theme": "Objets trouvés"
  },
  {
   "id": "frq-601",
   "nom": "Bijoux de famille",
   "dofus": "frigost-quetes",
   "niveauConseille": 150,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 130,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver le propriétaire du coffre familial"
   ],
   "theme": "Objets trouvés"
  },
  {
   "id": "frq-603",
   "nom": "Monstre aux plantes",
   "dofus": "frigost-quetes",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 160,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Kordis"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Trouver le passage dans la forêt pétrifiée"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Objets trouvés"
  },
  {
   "id": "frq-604",
   "nom": "La transe du crystal",
   "dofus": "frigost-quetes",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 170,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Faire entrer les cristaux en résonance",
    "Trouver des renseignements sur la résonance des cristaux"
   ],
   "theme": "Objets trouvés"
  },
  {
   "id": "frq-605",
   "nom": "Art nacre",
   "dofus": "frigost-quetes",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 140,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Offrir la broche en nacre à la personne appropriée"
   ],
   "theme": "Objets trouvés"
  },
  {
   "id": "frq-636",
   "nom": "Blessure de chasse",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "L'heure, c'est l'heure"
  },
  {
   "id": "frq-637",
   "nom": "Chasse dangereuse",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-636",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "L'heure, c'est l'heure"
  },
  {
   "id": "frq-638",
   "nom": "Rentrer brocouille",
   "dofus": "frigost-quetes",
   "niveauConseille": 120,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-637",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "L'heure, c'est l'heure"
  },
  {
   "id": "frq-641",
   "nom": "L'abominable YeCh'Ti",
   "dofus": "frigost-quetes",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    }
   ],
   "contenu": [],
   "theme": "L'heure, c'est l'heure"
  },
  {
   "id": "frq-642",
   "nom": "Bonmonstres de neige",
   "dofus": "frigost-quetes",
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
    "Évaluer les bonmonstres de Sufur et Elcaste",
    "Évaluer le bonmonstre de Nico",
    "Évaluer le bonmonstre de Joe Froid",
    "Évaluer le bonmonstre de Jojo Akim",
    "Évaluer le bonmonstre de Klétor"
   ],
   "theme": "L'heure, c'est l'heure"
  },
  {
   "id": "frq-644",
   "nom": "Le convoi, le sage aussi",
   "dofus": "frigost-quetes",
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
    "Combattre les givrefoux"
   ],
   "theme": "L'heure, c'est l'heure"
  },
  {
   "id": "frq-577",
   "nom": "Pêche en eaux gelées",
   "dofus": "frigost-quetes",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-577-r1",
     "texte": "35 × Bois de Tremble",
     "note": "à rapporter à Damar",
     "verifie": true
    },
    {
     "id": "frq-577-r2",
     "texte": "30 × Laine de Boufmouth",
     "note": "à rapporter à Damar",
     "verifie": true
    },
    {
     "id": "frq-577-r3",
     "texte": "15 × Laine de Boufmouth légendaire",
     "note": "à rapporter à Damar",
     "verifie": true
    },
    {
     "id": "frq-577-r4",
     "texte": "1 × Laine du Royalmouth",
     "note": "à rapporter à Damar",
     "verifie": true
    },
    {
     "id": "frq-577-r5",
     "texte": "5 × Défense du Sanglacier",
     "note": "à rapporter à Damar",
     "verifie": true
    },
    {
     "id": "frq-577-r6",
     "texte": "5 × Dent de Smilomouth",
     "note": "à rapporter à Damar",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer l'Alliance de Damar sur le Mansot Royal et l'apporter à Valy Domidat"
   ],
   "theme": "Forage à tout va"
  },
  {
   "id": "frq-579",
   "nom": "Il est frais mon pichon",
   "dofus": "frigost-quetes",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-577",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Récupérer un mansobèse apprivoisé auprès d'Ordralfabétist si nécessaire",
    "Escorter le mansobèse apprivoisé jusqu'à Aurore Boréale",
    "Escorter le mansobèse apprivoisé jusqu'à Bambelle",
    "Escorter le mansobèse apprivoisé jusqu'à Clarisse Tosha"
   ],
   "theme": "Forage à tout va"
  },
  {
   "id": "frq-581",
   "nom": "Hôtel de glace",
   "dofus": "frigost-quetes",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 110,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-581-r1",
     "texte": "5 × Scie à glace",
     "note": "à rapporter à Aurore Boréale, craftable par un Forgeron niveau 100",
     "verifie": true
    },
    {
     "id": "frq-581-r2",
     "texte": "5 × Plaque d'acier",
     "note": "à rapporter à Aurore Boréale, craftable par un Mineur niveau 100",
     "verifie": true
    },
    {
     "id": "frq-581-r3",
     "texte": "5 × Masque de protection",
     "note": "à rapporter à Aurore Boréale, craftable par un Tailleur niveau 100",
     "verifie": true
    },
    {
     "id": "frq-581-r4",
     "texte": "5 × Gants de protection",
     "note": "à rapporter à Aurore Boréale, craftable par un Bijoutier niveau 100",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Forgeron)",
    "objet à crafter (Mineur)",
    "objet à crafter (Tailleur)",
    "objet à crafter (Bijoutier)"
   ],
   "theme": "Les carrières de glace"
  },
  {
   "id": "frq-582",
   "nom": "La fonte des glaces",
   "dofus": "frigost-quetes",
   "niveauConseille": 130,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-581",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 60,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-582-r1",
     "texte": "1 × Prototype d'Abreuvoir frigostien en Bambou",
     "note": "à rapporter à Valy Domidat, craftable par un Bricoleur niveau 100",
     "verifie": true
    },
    {
     "id": "frq-582-r2",
     "texte": "1 × Prototype de Mangeoire frigostienne en Bambou",
     "note": "à rapporter à Valy Domidat, craftable par un Bricoleur niveau 100",
     "verifie": true
    },
    {
     "id": "frq-582-r3",
     "texte": "1 × Prototype de Foudroyeur frigostien en Bambou",
     "note": "à rapporter à Valy Domidat, craftable par un Bricoleur niveau 100",
     "verifie": true
    },
    {
     "id": "frq-582-r4",
     "texte": "1 × Prototype de Baffeur frigostien en Bambou",
     "note": "à rapporter à Valy Domidat, craftable par un Bricoleur niveau 100",
     "verifie": true
    }
   ],
   "deroule": [
    "Trouver des volontaires pour travailler au village de glace",
    "Escorter Zobie la mousse jusqu'à Mac Givré"
   ],
   "aide": [
    "objet à crafter (Bricoleur)"
   ],
   "theme": "Les carrières de glace"
  },
  {
   "id": "frq-632",
   "nom": "Convoi humanitaire",
   "dofus": "frigost-quetes",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-582",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "frq-674",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-623",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 150,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-632-r1",
     "texte": "10 × Poêlée Paysanne",
     "note": "à rapporter à Albert Paisse, craftable par un Chasseur niveau 100",
     "verifie": true
    },
    {
     "id": "frq-632-r2",
     "texte": "10 × Grillade Brâkmarienne",
     "note": "à rapporter à Albert Paisse, craftable par un Chasseur niveau 120",
     "verifie": true
    },
    {
     "id": "frq-632-r3",
     "texte": "10 × Marinade Sucrée-Salée",
     "note": "à rapporter à Albert Paisse, craftable par un Chasseur niveau 130",
     "verifie": true
    },
    {
     "id": "frq-632-r4",
     "texte": "10 × Boudin Noir",
     "note": "à rapporter à Albert Paisse, craftable par un Chasseur niveau 140",
     "verifie": true
    },
    {
     "id": "frq-632-r5",
     "texte": "10 × Filet Mignon",
     "note": "à rapporter à Albert Paisse, craftable par un Chasseur niveau 170",
     "verifie": true
    },
    {
     "id": "frq-632-r6",
     "texte": "10 × Potion Torboyo",
     "note": "à rapporter à Albert Paisse, craftable par un Alchimiste niveau 200",
     "verifie": true
    },
    {
     "id": "frq-632-r7",
     "texte": "10 × Poisskaille en Fricassée",
     "note": "à rapporter à Albert Paisse, craftable par un Pêcheur niveau 200",
     "verifie": true
    },
    {
     "id": "frq-632-r8",
     "texte": "30 × Pain de Frostiz",
     "note": "à rapporter à Albert Paisse, craftable par un Paysan niveau 200",
     "verifie": true
    },
    {
     "id": "frq-632-r9",
     "texte": "10 × Laine de Yokaï Givrefoux",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    },
    {
     "id": "frq-632-r10",
     "texte": "10 × Laine de Maho Givrefoux",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    },
    {
     "id": "frq-632-r11",
     "texte": "50 × Aubergine",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    },
    {
     "id": "frq-632-r12",
     "texte": "10 × Pelle Teuze",
     "note": "à rapporter à Albert Paisse, craftable par un Forgeron niveau 31",
     "verifie": true
    },
    {
     "id": "frq-632-r13",
     "texte": "10 × Pelle de Boisaille",
     "note": "à rapporter à Albert Paisse, craftable par un Forgeron niveau 6",
     "verifie": true
    },
    {
     "id": "frq-632-r14",
     "texte": "10 × Marteau de Boisaille",
     "note": "à rapporter à Albert Paisse, craftable par un Forgeron niveau 6",
     "verifie": true
    },
    {
     "id": "frq-632-r15",
     "texte": "5 × Planche de Salut",
     "note": "à rapporter à Valy Domidat, craftable par un Bûcheron niveau 200",
     "verifie": true
    }
   ],
   "aide": [
    "objet à crafter (Chasseur)",
    "objet à crafter (Alchimiste)",
    "objet à crafter (Pêcheur)",
    "objet à crafter (Paysan)",
    "objet à crafter (Forgeron)",
    "objet à crafter (Bûcheron)"
   ],
   "theme": "Jouer au docteur"
  },
  {
   "id": "frq-633",
   "nom": "Sang dessus-dessous",
   "dofus": "frigost-quetes",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-632",
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
    "Chercher des corps prisonniers de la glace dans la forêt des pins perdus",
    "Chercher des corps prisonniers de la glace dans la forêt pétrifiée",
    "Continuer à chercher des corps prisonniers de la glace dans la forêt pétrifiée",
    "Chercher d'autres corps prisonniers de la glace dans la forêt pétrifiée"
   ],
   "theme": "Jouer au docteur"
  },
  {
   "id": "frq-677",
   "nom": "Un remède à tous les maux",
   "dofus": "frigost-quetes",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-633",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 160,
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "La Créature"
     ],
     "groupe": true
    }
   ],
   "ressources": [
    {
     "id": "frq-677-r1",
     "texte": "5 × Écorce d'Abrazif",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    },
    {
     "id": "frq-677-r2",
     "texte": "5 × Lamelle de Dramanite",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    },
    {
     "id": "frq-677-r3",
     "texte": "5 × Volve de Fistulor",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    },
    {
     "id": "frq-677-r4",
     "texte": "5 × Volve de Fongeur",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    },
    {
     "id": "frq-677-r5",
     "texte": "5 × Lamelle de Mérulette",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    },
    {
     "id": "frq-677-r6",
     "texte": "1 × Patte de Korriandre",
     "note": "à rapporter à Albert Paisse",
     "verifie": true
    }
   ],
   "deroule": [
    "Chercher la créature sur le lac gelé.",
    "Chercher la créature dans le berceau d'Alma",
    "Chercher la créature dans les larmes d'Ouronigride"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Jouer au docteur"
  },
  {
   "id": "frq-583",
   "nom": "L'ombre et la glace",
   "dofus": "frigost-quetes",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-581",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "frq-582",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Trouver puis apporter 4 Lailaits de Mamansot à Mac Givré",
    "Trouver puis apporter 4 Graisses de Mansobèse à Mac Givré",
    "Trouver puis apporter 4 Graisses de Fricochère à Mac Givré",
    "Trouver puis apporter 4 Poils de Sanglacier à Mac Givré",
    "Trouver puis apporter 4 Griffes de Smilomouth à Mac Givré",
    "Trouver puis apporter 1 Glace Translucide à Mac Givré",
    "Trouver puis apporter 1 Fourrure Gelée à Mac Givré"
   ],
   "theme": "Les carrières de glace"
  },
  {
   "id": "frq-1286",
   "nom": "Lumière sur l'ombre",
   "dofus": "frigost-quetes",
   "niveauConseille": 140,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-583",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Craqueleur de Glace"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Les carrières de glace"
  },
  {
   "id": "frq-1287",
   "nom": "Qu'est-ce qu'on a fait des tuyaux ?",
   "dofus": "frigost-quetes",
   "niveauConseille": 150,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-581",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "frq-582",
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
     "queteId": "gl-589",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Dolores Kimo"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Inspecter la tuyauterie"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Les carrières de glace"
  },
  {
   "id": "frq-1288",
   "nom": "Lâcher les gaz",
   "dofus": "frigost-quetes",
   "niveauConseille": 150,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-1287",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "2 × Créature de gaz"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Les carrières de glace"
  },
  {
   "id": "frq-608",
   "nom": "Inferno",
   "dofus": "frigost-quetes",
   "niveauConseille": 160,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-594",
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
      "Pougnette enragée"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Ongles incarnés"
  },
  {
   "id": "frq-609",
   "nom": "Tous pour un",
   "dofus": "frigost-quetes",
   "niveauConseille": 170,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-595",
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
      "Ondine démoniaque"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Ongles incarnés"
  },
  {
   "id": "frq-610",
   "nom": "Voleur en tout genre",
   "dofus": "frigost-quetes",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-596",
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
    "Trouver un moyen d'ouvrir les grilles"
   ],
   "theme": "Ongles incarnés"
  },
  {
   "id": "frq-611",
   "nom": "Le travail c'est la santé",
   "dofus": "frigost-quetes",
   "niveauConseille": 190,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-597",
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
    "Trouver un moyen d'ouvrir les grilles"
   ],
   "theme": "Ongles incarnés"
  },
  {
   "id": "frq-1319",
   "nom": "Rappel à la vie",
   "dofus": "frigost-quetes",
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
     "type": "combat",
     "adversaires": [
      "Biofiente"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher des traces du passage du Professeur Imagarihs",
    "Consulter l'Extrait du Carnet du Professeur Imagarihs",
    "Récupérer des Feuilles de paie dans les bacs de plantes des jardins d'hiver"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Mais où qu'ils sont les Frigostiens ?"
  },
  {
   "id": "frq-1320",
   "nom": "Moteur à explosion",
   "dofus": "frigost-quetes",
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
     "type": "combat",
     "adversaires": [
      "3 × Ravisseur Kanimate"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Escorter Idrissa Boteur jusqu'au lieu de la diversion",
    "Fouiller le lieu de l'embuscade",
    "Récupérer la caisse d'explosifs",
    "Récupérer la caisse d'outils",
    "Escorter Idrissa Boteur jusqu'au point de ravitaillement du transporteur de Sylargh",
    "Faire diversion pour couvrir les agissements d'Idrissa Boteur"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Mais où qu'ils sont les Frigostiens ?"
  },
  {
   "id": "frq-1321",
   "nom": "La fifille à son papa",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Chercher des traces du passage de Diana dans la Tannerie Écarlate",
    "Fouiller la cave du Marquis Petrovitchi",
    "Prendre la Chachatte Rousse empaillée"
   ],
   "theme": "Mais où qu'ils sont les Frigostiens ?"
  },
  {
   "id": "frq-1322",
   "nom": "Mutinerie chez les Armutins",
   "dofus": "frigost-quetes",
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
     "type": "combat",
     "adversaires": [
      "Frimaraudeur"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Utiliser la bougie magique pour libérer la Statuette de Pashushu de la glace",
    "Aider Merrin Lencastré à accomplir l'exorcisme"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Mais où qu'ils sont les Frigostiens ?"
  },
  {
   "id": "frq-1323",
   "nom": "Au-delà du mur",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-1319",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "frq-1320",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "frq-1321",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "frq-1322",
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
      "Stalak errant"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher des traces du passage de Jean Neige dans le Laboratoire de Nileza",
    "Expliquer à Nileza par les armes que vous êtes venu en paix",
    "Fouiller l'entrepôt des pièces détachées",
    "Interroger les invités"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Mais où qu'ils sont les Frigostiens ?"
  },
  {
   "id": "frq-1324",
   "nom": "Crise d'ex-Emma",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-1323",
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
      "Emma Sculai"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Chercher Idrissa Boteur entre les crocs de verre et la forêt pétrifiée",
    "Fouiller la Tour de la Clepsydre à la recherche d'Emma Sculai",
    "Continuer les fouilles dans la Tour de la Clepsydre"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Mais où qu'ils sont les Frigostiens ?"
  },
  {
   "id": "frq-1335",
   "nom": "Le tour de guet",
   "dofus": "frigost-quetes",
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
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Messager Grippé"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Noblesse oblige"
  },
  {
   "id": "frq-1336",
   "nom": "Guerre froide",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-1335",
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
      "5 × Harrogant"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Grodruche"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Empaillé"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Cuirboule"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Ventrublion"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Stalak"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Karkanik"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Verglasseur"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Nessil"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Krakal"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Dodox"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Drosérâle"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Kanimate"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Mansordide"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Mécanofoux"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "5 × Mérulor"
     ],
     "groupe": true
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Noblesse oblige"
  },
  {
   "id": "frq-1337",
   "nom": "Les desseins de Sylargh",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-1336",
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
    "Lire le message de Sylargh",
    "Trouver quelqu'un capable de traduire le texte du message",
    "Lire le message traduit",
    "Fouiller le transporteur de Sylargh à la recherche d'un indice"
   ],
   "theme": "Noblesse oblige"
  },
  {
   "id": "frq-1338",
   "nom": "Vous avez demandé la peau lisse ?",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-1337",
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
    "Trouver la peau magique tannée par Klime"
   ],
   "theme": "Noblesse oblige"
  },
  {
   "id": "frq-1339",
   "nom": "La dernière carte",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-1338",
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
     "type": "donjon",
     "nom": "Forgefroide de Missiz Frizz (Missiz Frizz)"
    }
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Noblesse oblige"
  },
  {
   "id": "frq-678",
   "nom": "Chaud du S.L.I.P.",
   "dofus": "frigost-quetes",
   "niveauConseille": 180,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 100,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-678-r1",
     "texte": "5 × Laine de Yokaï Givrefoux",
     "note": "à rapporter à Bowisse",
     "verifie": true
    },
    {
     "id": "frq-678-r2",
     "texte": "5 × Malléole de Yomi Givrefoux",
     "note": "à rapporter à Bowisse",
     "verifie": true
    },
    {
     "id": "frq-678-r3",
     "texte": "1 × Queue de Yomi Givrefoux",
     "note": "à rapporter à Bowisse",
     "verifie": true
    },
    {
     "id": "frq-678-r4",
     "texte": "5 × Laine de Maho Givrefoux",
     "note": "à rapporter à Bowisse",
     "verifie": true
    },
    {
     "id": "frq-678-r5",
     "texte": "1 × Cuir de Maho Givrefoux",
     "note": "à rapporter à Bowisse",
     "verifie": true
    },
    {
     "id": "frq-678-r6",
     "texte": "5 × Lamelle de Dramanite",
     "note": "à rapporter à Bowisse",
     "verifie": true
    },
    {
     "id": "frq-678-r7",
     "texte": "1 × Pédoncule de Fongeur",
     "note": "à rapporter à Bowisse",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer une Plante soufrière dans Feudala",
    "Récupérer une Plante soufrière dans les Terres Désacrées",
    "Récupérer une Plante soufrière après l'Obsidiantre",
    "Vaincre le Royalmouth dans sa serre, sans autre équipement qu'un slip, ou string, ou caleçon"
   ],
   "theme": "Slip ou caleçon ?"
  },
  {
   "id": "frq-1570",
   "nom": "Ponctions létales",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Vaporiser la solution sur un krobe isolé",
    "Retourner voir Ninae Charpe en étant krobifié"
   ],
   "theme": "C'est assez"
  },
  {
   "id": "frq-1569",
   "nom": "Grand corps malade",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Nettoyer le Roc des Salbatroces",
    "Récupérer 1 Plante Ureuse dans les serres des Jardins d'Hiver",
    "Récupérer 1 Herbe Usse dans les serres des Jardins d'Hiver"
   ],
   "theme": "C'est assez"
  },
  {
   "id": "frq-1568",
   "nom": "Qui dit baume",
   "dofus": "frigost-quetes",
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
     "nom": "Ventre de la Baleine (Protozorreur)"
    }
   ],
   "ressources": [
    {
     "id": "frq-1568-r1",
     "texte": "1 × Couteaux sacrés",
     "note": "à rapporter à Jangakuq, craftable par un Forgeron niveau 200",
     "verifie": true
    }
   ],
   "deroule": [
    "Récupérer 1 Déchet toxique",
    "Fabriquer une paire de Couteaux sacrés et l'apporter à Otto Ktone",
    "Invoquer l'esprit Mansot",
    "Invoquer l'esprit Givrefoux",
    "Invoquer l'esprit Sylvain",
    "Invoquer l'esprit Glourson"
   ],
   "aide": [
    "objet à crafter (Forgeron)",
    "combat de groupe"
   ],
   "theme": "C'est assez"
  },
  {
   "id": "frq-2010",
   "nom": "Frappez, ami, et entrez",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "gl-624",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 50,
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Tenter d'ouvrir les portes du royaume des Martegel",
    "Rencontrer des Nimbos",
    "Montrer aux Nimbos que vous savez vous battre",
    "Entrer dans la taverne du Bateau ivre",
    "Discuter avec le tavernier",
    "Payer des tournées générales aux Nimbos",
    "Essayer à nouveau de passer les portes du royaume des Martegel"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2011",
   "nom": "De Brikke et de Brokke",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
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
    "Trouver Brikke la forgeronne",
    "Résoudre le problème de Brikke",
    "Parler à l'un des généraux pour rencontrer leur doyen",
    "Aider à la libération du général Dourak",
    "Trouver Volkaragnar et entendre sa version de l'histoire",
    "Parler au dragon mentionné par Volkaragnar",
    "Lire le livre « Le Crépuscule de jade »",
    "Lire le document « Les Sept Clans »",
    "Trouver l'acheteuse décrite par René Gossian",
    "Vaincre les Srams pour s'emparer du marteau",
    "Lire la note confidentielle trouvée sur la Sram",
    "Aider Brikke à réparer le marteau de Brokke",
    "Entrer dans la Brasserie du roi Dazak",
    "Demander violemment une audience avec le roi Dazak Martegel",
    "Effacer plusieurs affronts de la bible des rancunes du roi Dazak"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2012",
   "nom": "Les Ninsoumis",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
     "verifie": true
    }
   ],
   "contenu": [],
   "deroule": [
    "Se rendre sur la piste d'envol pour rencontrer les Ninsoumis",
    "Parler au chef des Ninsoumis",
    "Trouver l'endroit où les Nimbos conservent la nourriture",
    "Implorer le cuisinier de nourrir les Ninsoumis",
    "Rapporter les pains de viande avant qu'ils ne refroidissent",
    "Rapporter des couvertures aux Ninsoumis",
    "Discuter brièvement avec le général Dourak",
    "Obtenir la libération du général grâce à la parole boxée"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2013",
   "nom": "La bible des rancunes",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-2013-r1",
     "texte": "20 × Poisskaille en Fricassée",
     "note": "à rapporter à Séninchale Umo, craftable par un Pêcheur niveau 200",
     "verifie": true
    },
    {
     "id": "frq-2013-r2",
     "texte": "20 × Pain de Frostiz",
     "note": "à rapporter à Séninchale Umo, craftable par un Paysan niveau 200",
     "verifie": true
    },
    {
     "id": "frq-2013-r3",
     "texte": "20 × Pizza au boudin de boufmouth",
     "note": "à rapporter à Séninchale Umo",
     "verifie": true
    },
    {
     "id": "frq-2013-r4",
     "texte": "20 × Friswein",
     "note": "à rapporter à Séninchale Umo",
     "verifie": true
    }
   ],
   "deroule": [
    "Évoquer avec Plénie la question des dédommagements envers le clan Martegel",
    "Récupérer l'argent auprès du banquier de la Bourgade",
    "Trouver Ystrion Bannisterre",
    "Trouver une caisse à la taille idéale pour un Nimbos",
    "Récupérer une boîte à outils afin de percer des trous dans la caisse",
    "Assommer Ystrion et l'enfermer dans la caisse",
    "Remettre Ystrion à Deor Morfont"
   ],
   "aide": [
    "objet à crafter (Pêcheur)",
    "objet à crafter (Paysan)"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2014",
   "nom": "La dernière barbe avant la fin du monde",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-626",
     "verifie": true
    },
    {
     "type": "niveau",
     "niveau": 180,
     "verifie": true
    },
    {
     "type": "metier",
     "metier": "Alchimiste",
     "niveau": 10,
     "personnel": true,
     "verifie": true
    }
   ],
   "contenu": [],
   "ressources": [
    {
     "id": "frq-2014-r1",
     "texte": "10 × Orange amère",
     "note": "pour fabriquer Liqueur d'orange amère",
     "verifie": true
    },
    {
     "id": "frq-2014-r2",
     "texte": "4 × Sucre glace",
     "note": "pour fabriquer Liqueur d'orange amère",
     "verifie": true
    },
    {
     "id": "frq-2014-r3",
     "texte": "1 × Eau-de-vie vernale",
     "note": "pour fabriquer Liqueur d'orange amère",
     "verifie": true
    }
   ],
   "aide": [
    "fabrication"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2015",
   "nom": "Lâches de glace",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
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
    "Patrouiller dans les mines des Nimbos",
    "Patrouiller près de la vieille forge",
    "Patrouiller près de la piste d'envol",
    "Patrouiller près de l'enclos gelé",
    "Patrouiller près de la salle du marteau",
    "Patrouiller près de la porte de Ferfroid",
    "Patrouiller près du Bateau ivre"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2016",
   "nom": "Le gang des postiches",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
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
      "Aventurière démasquée"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Aventurier pris sur le fait"
     ],
     "groupe": true
    },
    {
     "type": "combat",
     "adversaires": [
      "Aventurier repéré"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Ninterroger le premier suspect",
    "Ninterroger la deuxième suspecte",
    "Ninterroger le troisième suspect",
    "Ninterroger la quatrième suspecte",
    "Ninterroger le cinquième suspect"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2017",
   "nom": "Nincassable",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "gl-625",
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
    "Emmener Dundivad voir le Professeur Xa devant les Cavernes du Kolosso",
    "Tester les capacités de Dundivad en affrontant les Bléros du Professeur Xa",
    "Se rendre à la mine du Jour sans fin avec Dundivad",
    "Parler au mineur désigné par Dundivad",
    "Affronter le mineur avec l'aide de Dundivad",
    "Accompagner Dundivad dans la partie nord-ouest des Crocs de Verre",
    "Combattre aux côtés de Dundivad pour vaincre Monsieur Glace"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2018",
   "nom": "Planche-Neige et les Sept Nimb'",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
     "verifie": true
    },
    {
     "type": "quete",
     "queteId": "frq-646",
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
    "Localiser l'un des voleurs de skis souples",
    "Localiser l'un des voleurs de skis sombres",
    "Vaincre les Nimbos enrubé et ronchon",
    "Localiser l'un des voleurs de skis rustiques",
    "Vaincre les Nimbos guilleret, réservé et somnolent",
    "Localiser l'un des voleurs de skis glissants",
    "Vaincre le Nimbos ninstruit"
   ],
   "theme": "Là-bas sous la montagne"
  },
  {
   "id": "frq-2019",
   "nom": "Les ennemis de mes ennemis sont mes ennemis",
   "dofus": "frigost-quetes",
   "niveauConseille": 200,
   "prerequis": [
    {
     "type": "quete",
     "queteId": "frq-2010",
     "verifie": true
    }
   ],
   "contenu": [
    {
     "type": "combat",
     "adversaires": [
      "Ratse"
     ],
     "groupe": true
    }
   ],
   "deroule": [
    "Discuter avec le chef des éclaireurs",
    "Trouver un moyen pour que les éclaireurs et les Nimbos cessent de se battre",
    "Retourner sur les lieux de l'affrontement entre les éclaireurs et les Nimbos",
    "Placer le métal maudit pour provoquer une attaque d'Armutins",
    "Combattre les Armutins avec l'aide des éclaireurs et des Nimbos"
   ],
   "aide": [
    "combat de groupe"
   ],
   "theme": "Là-bas sous la montagne"
  }
 ]
};
