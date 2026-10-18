// Généré par scripts/generer-quetes-dofus.py : quêtes liées à chaque donjon (vaincre son boss, ou une action dans une de ses
// salles : objet à récupérer, élément à cliquer…), d'après les données du jeu. « objectif » = action · salle.
// Clé : nom du donjon. Un identifiant « dql-… » n'appartient à aucune série du site.
export type QueteLieeDonjon = { id: string; nom: string; niveau: number; objectif: string; serie?: string };

export const QUETES_DONJONS: Record<string, QueteLieeDonjon[]> = {
 "Donjon des Bworks": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "Vaincre Bworkette · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "alb-65",
   "nom": "Du repos mais pas trop...",
   "niveau": 51,
   "objectif": "Vaincre Bworkette · salle du boss"
  },
  {
   "id": "dql-2411",
   "nom": "Toute possession dépossède",
   "niveau": 200,
   "objectif": "Découvrir ce qu'est devenue la Bworkette · salle du boss"
  }
 ],
 "Donjon des Forgerons": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "Vaincre Coffre des Forgerons · salle du boss ; Découvrir la Sortie du Donjon des Forgerons",
   "serie": "tour-du-monde"
  },
  {
   "id": "alb-66",
   "nom": "Recouvrement de dette à la Tabasse",
   "niveau": 52,
   "objectif": "Vaincre Coffre des Forgerons · salle du boss"
  }
 ],
 "Clos des Blops": [
  {
   "id": "alb-73",
   "nom": "Le Tabi d'Amayiro",
   "niveau": 59,
   "objectif": "Récupérer de l'huile de Blop Royal dans le Clos des Blops · salle 5"
  },
  {
   "id": "dql-2505",
   "nom": "Entre quatre blops",
   "niveau": 60,
   "objectif": "Vaincre un Blop Royal sur sa carte en un seul combat · salle 5 ; Aller jusqu'à cette salle · salle 6",
   "serie": "emma-tom-pouce"
  }
 ],
 "Pitons Rocheux des Craqueleurs": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "Vaincre Craqueleur Légendaire · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "alb-76",
   "nom": "La fureur du Holbaïd",
   "niveau": 72,
   "objectif": "Vaincre Craqueleur Légendaire · salle du boss"
  },
  {
   "id": "alk-396",
   "nom": "Taxe gratuite",
   "niveau": 72,
   "objectif": "Vaincre Craqueleur Légendaire · salle du boss"
  }
 ],
 "Laboratoire de Brumen Tinctorias": [
  {
   "id": "dql-908",
   "nom": "Histoire de chiens",
   "niveau": 70,
   "objectif": "Vaincre Nelween · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-1861",
   "nom": "Les morts vivants",
   "niveau": 70,
   "objectif": "Voler des potions · salle 1 ; Prélever du liquide · salle 2 ; Copier des notes · salle 3 ; Prélever des échantillons sur les Maciens · salle 3 ; Voler des potions · salle 4 ; Prélever des échantillons sur Nelween · salle 5"
  },
  {
   "id": "alk-403",
   "nom": "Du venin sinon rien",
   "niveau": 79,
   "objectif": "Vaincre Nelween · salle du boss"
  },
  {
   "id": "alb-83",
   "nom": "Poison de scorbute pour la prison",
   "niveau": 79,
   "objectif": "Vaincre Nelween · salle du boss"
  }
 ],
 "Domaine Ancestral": [
  {
   "id": "sy-2444",
   "nom": "Comme un corbac sur sa branche",
   "niveau": 90,
   "objectif": "Interrompre le rituel de l'Abraknyde Ancestral en malmenant ses serviteurs · salle du boss ; Insister jusqu'à ce que l'Abraknyde Ancestral tienne sa promesse · salle du boss"
  },
  {
   "id": "sy-1620",
   "nom": "Munster lève le mystère",
   "niveau": 90,
   "objectif": "Se rendre au cœur du Domaine Ancestral · salle 5 ; Vaincre Abraknyde Ancestral · salle du boss"
  },
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "Vaincre Abraknyde Ancestral · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "alb-87",
   "nom": "Vengeance par procuration",
   "niveau": 93,
   "objectif": "Arracher son gland à l'Abraknyde Ancestral · salle 5"
  }
 ],
 "Caverne du Koulosse": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "Vaincre Koulosse · salle du boss ; Aller jusqu'à cette salle · sortie",
   "serie": "tour-du-monde"
  },
  {
   "id": "alcv-109",
   "nom": "Apprentissage : Écuyer",
   "niveau": 100,
   "objectif": "Récupérer des champignons dans l'Antre du Koulosse · salle 1 ; Brûler les champignons et la mixture de Merlan l'Enchaîneur dans l'Antre du Koulosse · salle 6"
  },
  {
   "id": "alb-94",
   "nom": "C'est stupéfiant",
   "niveau": 100,
   "objectif": "Vaincre Koulosse · salle du boss ; Parler à Koulosse · sortie"
  }
 ],
 "Donjon des Scarafeuilles": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "Vaincre Scarabosse Doré · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "aloa-110",
   "nom": "Apprentissage : Espion Silencieux",
   "niveau": 100,
   "objectif": "Trouver les trois renégats. Ils sont cachés à l'ouest du Donjon des Scarafeuilles"
  }
 ],
 "Tanière du Meulou": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "Vaincre Meulou · salle du boss ; Aller jusqu'à cette salle · sortie",
   "serie": "tour-du-monde"
  },
  {
   "id": "alcs-112",
   "nom": "Apprentissage : Surineur",
   "niveau": 100,
   "objectif": "Trouver le butin caché dans la troisième salle de la Tanière du Meulou · salle 3"
  },
  {
   "id": "alk-414",
   "nom": "Mulanthropie",
   "niveau": 100,
   "objectif": "Vaincre Meulou · salle du boss"
  }
 ],
 "Clairière du Chêne Mou": [
  {
   "id": "dql-1653",
   "nom": "Plongeon et dragon",
   "niveau": 100,
   "objectif": "Vaincre Chêne Mou · salle du boss"
  },
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "Vaincre Chêne Mou · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "ales-121",
   "nom": "Apprentissage : Adepte des Écrits",
   "niveau": 140,
   "objectif": "Explorer la Clairière du Chêne Mou à la recherche d'Eni Hoube ; Sortir l'eni Hoube de la Clairière du Chêne Mou · salle 4 ; Sortir l'eni Hoube de la Clairière du Chêne Mou · salle 5"
  },
  {
   "id": "sy-1621",
   "nom": "L'art de la langue de bois",
   "niveau": 140,
   "objectif": "Entrer dans la Clairière du Chêne Mou et se présenter devant le maître des lieux · salle 5 ; Vaincre Chêne Mou · salle du boss"
  },
  {
   "id": "dql-2131",
   "nom": "Un pouvoir mérydique",
   "niveau": 200,
   "objectif": "Vaincre Chêne Mou · salle du boss"
  }
 ],
 "Fabrique de foux d'artifice": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "Vaincre Founoroshi · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "alem-124",
   "nom": "Apprentissage : Adepte des Douleurs",
   "niveau": 140,
   "objectif": "Trouver 1 Langue Hiyeu · salle 5"
  },
  {
   "id": "dql-1660",
   "nom": "La bénédiction de Viti",
   "niveau": 140,
   "objectif": "Vaincre Founoroshi · salle du boss"
  },
  {
   "id": "dql-2154",
   "nom": "Le festival de la lanterne",
   "niveau": 140,
   "objectif": "Vaincre Founoroshi · salle du boss ; Décider de rencontrer l'esprit du feu avec Ozulan ou Founoroshi · salle du boss"
  }
 ],
 "Donjon des Squelettes": [
  {
   "id": "dql-153",
   "nom": "Le maître des clefs",
   "niveau": 30,
   "objectif": "Vaincre Chafer Rōnin · salle du boss",
   "serie": "tour-du-monde"
  }
 ],
 "Donjon des Tofus": [
  {
   "id": "dql-153",
   "nom": "Le maître des clefs",
   "niveau": 30,
   "objectif": "Vaincre Batofu · salle du boss",
   "serie": "tour-du-monde"
  }
 ],
 "Donjon des Larves": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "Vaincre Shin Larve · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "alk-386",
   "nom": "Pauvre larve... dorée",
   "niveau": 52,
   "objectif": "Entrer dans le Donjon des Larves avec la Larve Dorée ; Vaincre Larve Dorée · onzième salle"
  }
 ],
 "Refuge sylvestre": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "Vaincre Rakoopeur · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2466",
   "nom": "Association de fureteurs",
   "niveau": 50,
   "objectif": "Vaincre Rakoopeur · salle du boss ; Parlez à Rakoopeur à nouveau · salle du boss ; Parlez à Rakoopeur une dernière fois · salle du boss"
  },
  {
   "id": "dql-2465",
   "nom": "Dans la gueule du trankilou",
   "niveau": 50,
   "objectif": "Inspecter les souterrains à la recherche de Rakoopeur · salle du boss"
  }
 ],
 "Antre du Dragon Cochon": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "Vaincre Dragon Cochon · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1653",
   "nom": "Plongeon et dragon",
   "niveau": 100,
   "objectif": "Vaincre Dragon Cochon · salle du boss"
  }
 ],
 "Garde-manger du Rat Blanc": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "Vaincre Rat Blanc · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2434",
   "nom": "La Geste de Ratagnan",
   "niveau": 110,
   "objectif": "Vaincre Rat Blanc · salle du boss ; Discuter avec le Rat Blanc · salle du boss"
  },
  {
   "id": "dql-2433",
   "nom": "Le pacte des profondeurs",
   "niveau": 110,
   "objectif": "Interroger l'envoyée du Rat Blanc · salle du boss"
  },
  {
   "id": "alb-257",
   "nom": "Vin diou",
   "niveau": 111,
   "objectif": "Vaincre Rat Blanc · salle du boss"
  }
 ],
 "Sousouricière du Rat Noir": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "Vaincre Rat Noir · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2432",
   "nom": "Fait comme un rat",
   "niveau": 110,
   "objectif": "Trouver Stanis Ast dans la Sousouricière du Rat Noir ; Vaincre Rat Noir · salle du boss"
  },
  {
   "id": "alk-246",
   "nom": "Triple X",
   "niveau": 111,
   "objectif": "Vaincre Rat Noir · salle du boss ; Utiliser l'antidote du Rat Noir · salle du boss"
  }
 ],
 "Bibliothèque du Maître Corbac": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "Vaincre Maître Corbac · salle du boss ; Aller jusqu'à cette salle · antichambre",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1521",
   "nom": "Le livre des Taures",
   "niveau": 110,
   "objectif": "Voler le Livre des Taures au Maître Corbac et donner le livre à Mériana · salle du boss"
  },
  {
   "id": "dql-1775",
   "nom": "Voler dans les plumes",
   "niveau": 110,
   "objectif": "Parler à Natacha Manka · salle du trône ; Vaincre Maître Corbac · salle du boss ; Rapporter 1 × Guide du Maître Corbac · antichambre"
  },
  {
   "id": "dql-2136",
   "nom": "L'avis de la Mort",
   "niveau": 200,
   "objectif": "Parler à Virgil pour entrer dans la salle du trône du Maître Corbac · salle du boss"
  },
  {
   "id": "dql-2122",
   "nom": "Les quatre volontés",
   "niveau": 200,
   "objectif": "Parler au responsable chargé d'organiser les visites du labyrinthe du Maître Corbac · salle du boss ; Rejoindre Hiboukin dans l'une des salles au centre de la bibliothèque du Maître Corbac"
  }
 ],
 "Serre du Royalmouth": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "Vaincre Royalmouth · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "gl-619",
   "nom": "Antiroyaliste",
   "niveau": 120,
   "objectif": "Aller jusqu'à cette salle · salle 6 ; Vaincre Royalmouth · salle du boss"
  },
  {
   "id": "dql-695",
   "nom": "Monarchie absolue",
   "niveau": 120,
   "objectif": "Vaincre Royalmouth · salle du boss"
  },
  {
   "id": "dql-1529",
   "nom": "Le pouvoir derrière le trône",
   "niveau": 130,
   "objectif": "Trouver Gavroch dans la serre du Royalmouth ; Vaincre Royalmouth · salle du boss"
  },
  {
   "id": "frq-678",
   "nom": "Chaud du S.L.I.P.",
   "niveau": 180,
   "objectif": "Vaincre le Royalmouth dans sa serre, sans autre équipement qu'un slip, ou string, ou caleçon · salle du boss"
  },
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "niveau": 190,
   "objectif": "Braver les dangers de La serre du Royalmouth"
  }
 ],
 "Centre du Labyrinthe du Minotoror": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "Vaincre Minotoror · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1522",
   "nom": "Taures et détours",
   "niveau": 120,
   "objectif": "Se rendre dans le donjon ; Vaincre Minotoror · salle du boss ; Jeter le sortilège de vérité sur le trône de l'antichambre du Minotoror ; Parler à Minotot"
  }
 ],
 "Tofulailler Royal": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "Vaincre Tofu Royal · salle du boss",
   "serie": "tour-du-monde"
  }
 ],
 "Antre de Crocabulia": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "Vaincre Crocabulia · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2036",
   "nom": "Le forgeur de légende",
   "niveau": 120,
   "objectif": "Vaincre Crocabulia · salle du boss ; Tremper l'épée dans le sang de Crocabulia · salle du boss"
  },
  {
   "id": "dql-2044",
   "nom": "Un nouvel héritier",
   "niveau": 200,
   "objectif": "Libérer l'âme de Crocoburio pour qu'elle entre dans l'œuf de Crocabulia · salle du boss"
  }
 ],
 "Repaire de Skeunk": [
  {
   "id": "dql-2035",
   "nom": "L'épée du rocher",
   "niveau": 120,
   "objectif": "Récupérer de la poudre scintillante dans la bouate à maquillage de Skeunk · sortie"
  },
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "Vaincre Skeunk · salle du boss ; Aller jusqu'à cette salle · sortie",
   "serie": "tour-du-monde"
  }
 ],
 "Atelier du Tanukouï San": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "Vaincre Tanukouï San · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2152",
   "nom": "Au nom de l'Art",
   "niveau": 130,
   "objectif": "Entrer dans l'Atelier du Tanukouï San ; Vaincre Tanukouï San · salle du boss"
  }
 ],
 "Salle du Minotot": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "Vaincre Minotot · salle du boss",
   "serie": "tour-du-monde"
  }
 ],
 "Grotte du Bworker": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "Vaincre Bworker · salle du boss",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1782",
   "nom": "La dernière pierre",
   "niveau": 180,
   "objectif": "Vaincre Bworker · salle du boss"
  }
 ],
 "Volière de la Haute Truche": [
  {
   "id": "alk-272",
   "nom": "Assassinat effectué",
   "niveau": 135,
   "objectif": "Chercher la méthode d'élevage aviaire dans la Volière de la Haute Truche"
  },
  {
   "id": "alk-273",
   "nom": "Le magnanime",
   "niveau": 135,
   "objectif": "Chercher la méthode d'élevage aviaire dans la Volière de la Haute Truche"
  },
  {
   "id": "alk-274",
   "nom": "Les kamas résolvent tout",
   "niveau": 135,
   "objectif": "Chercher la méthode d'élevage aviaire dans la Volière de la Haute Truche"
  }
 ],
 "Repaire de Sphincter Cell": [
  {
   "id": "dql-1661",
   "nom": "La bénédiction de Thomahon",
   "niveau": 150,
   "objectif": "Vaincre Sphincter Cell · salle du boss"
  },
  {
   "id": "dql-914",
   "nom": "Tour de rein",
   "niveau": 150,
   "objectif": "Vaincre Sphincter Cell · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "alk-309",
   "nom": "Une faille dans sa carapace",
   "niveau": 155,
   "objectif": "Récupérer les clefs dans le Repaire de Sphincter Cell · salle 5"
  }
 ],
 "Grotte de Kanigroula": [
  {
   "id": "dql-1475",
   "nom": "Chachyène de vie",
   "niveau": 160,
   "objectif": "Vaincre Kanigroula · salle du boss"
  },
  {
   "id": "alk-317",
   "nom": "Légitime défense",
   "niveau": 160,
   "objectif": "Infliger une correction au chef des Kanigs · chambre matriarcale"
  },
  {
   "id": "dql-1662",
   "nom": "La bénédiction de Foluk",
   "niveau": 170,
   "objectif": "Vaincre Kanigroula · salle du boss"
  }
 ],
 "Laboratoire de Nileza": [
  {
   "id": "alb-457",
   "nom": "L'Éclat de l'Aube",
   "niveau": 180,
   "objectif": "Chercher des notes de Nileza sur l'îlot Estitch · salle du boss"
  },
  {
   "id": "alk-332",
   "nom": "Le roi Estitch",
   "niveau": 180,
   "objectif": "Chercher des notes de Nileza sur l'îlot Estitch · salle du boss"
  },
  {
   "id": "frq-1323",
   "nom": "Au-delà du mur",
   "niveau": 200,
   "objectif": "Chercher des traces du passage de Jean Neige dans le Laboratoire de Nileza · salle du boss ; Expliquer à Nileza par les armes que vous êtes venu en paix · salle du boss"
  },
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "niveau": 200,
   "objectif": "Vaincre Nileza · salle du boss"
  },
  {
   "id": "frq-1328",
   "nom": "Mille et un jours, un destin",
   "niveau": 200,
   "objectif": "S'éloigner de Nileza pour qu'il termine la préparation de la potion · salle du boss ; Constater les effets de la potion de Nileza · salle du boss"
  },
  {
   "id": "dql-1311",
   "nom": "Porte, Nileza, trésor",
   "niveau": 200,
   "objectif": "Laboratoire de Nileza - Sortie"
  },
  {
   "id": "dql-1912",
   "nom": "Une voix de crystal",
   "niveau": 200,
   "objectif": "Rencontrer Nileza · salle du boss ; Découvrir qui a créé le crystal évoqué par Nileza · salle du boss"
  }
 ],
 "Nid du Kwakwa": [
  {
   "id": "dql-1196",
   "nom": "Qui vole un œuf cherche l'embrouille",
   "niveau": 20,
   "objectif": "Fouiller les buissons près du nid du Kwakwa"
  },
  {
   "id": "dql-898",
   "nom": "Donjon douillet",
   "niveau": 50,
   "objectif": "Vaincre Kwakwa · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-681",
   "nom": "L'Ascension",
   "niveau": 50,
   "objectif": "Vaincre Kwakwa · salle du boss"
  },
  {
   "id": "alk-385",
   "nom": "Pauvre larve",
   "niveau": 51,
   "objectif": "Vaincre Kwakwa · salle du boss ; Récupérer un Œuf de Kwakwa · salle du boss"
  }
 ],
 "Gelaxième Dimension": [
  {
   "id": "alk-393",
   "nom": "Des capes typiques",
   "niveau": 59,
   "objectif": "Récupérer du glucide aminé dans la Gélaxième Dimension · sortie"
  },
  {
   "id": "dql-906",
   "nom": "Gelée bien eue",
   "niveau": 60,
   "objectif": "Vaincre Gelée Royale Bleuet · salle du boss ; Vaincre Gelée Royale Menthe · salle du boss ; Vaincre Gelée Royale Fraise · salle du boss ; Vaincre Gelée Royale Citron · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Antre de la Reine Nyée": [
  {
   "id": "sy-1619",
   "nom": "Arak-haï en pagaille",
   "niveau": 90,
   "objectif": "Trouver la reine des Arak-haï · salle 5 ; Vaincre Reine Nyée · salle du boss"
  },
  {
   "id": "sy-2444",
   "nom": "Comme un corbac sur sa branche",
   "niveau": 90,
   "objectif": "Récupérer le trésor volé par la Reine Nyée · salle 5"
  },
  {
   "id": "dql-2509",
   "nom": "Tour du propriétaire",
   "niveau": 90,
   "objectif": "Vaincre Reine Nyée · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "alk-407",
   "nom": "Un assassin... à Bonta ?",
   "niveau": 93,
   "objectif": "Vaincre Reine Nyée · salle du boss"
  }
 ],
 "Temple du Grand Ougah": [
  {
   "id": "aloa-425",
   "nom": "Apprentissage : Assassin Suprême",
   "niveau": 180,
   "objectif": "Chercher Dike Tarak dans le Temple du Grand Ougah"
  },
  {
   "id": "alcs-422",
   "nom": "Apprentissage : Champion du Chaos",
   "niveau": 180,
   "objectif": "Récupérer un éclat de roche lunaire gardé par Ougah · salle du boss"
  },
  {
   "id": "ales-423",
   "nom": "Apprentissage : Maître des Parchemins",
   "niveau": 180,
   "objectif": "Trouver la statuette de Sumens cachée dans le Temple du Grand Ougah"
  },
  {
   "id": "alem-424",
   "nom": "Apprentissage : Maître des Sévices",
   "niveau": 180,
   "objectif": "Trouver une Statuette de Sumens cachée dans le Temple du Grand Ougah"
  },
  {
   "id": "aloas-426",
   "nom": "Apprentissage : Psychopathe",
   "niveau": 180,
   "objectif": "Récupérer la Statuette de Sumens dans le Temple du Grand Ougah"
  },
  {
   "id": "dql-1866",
   "nom": "Appui sur le champignon",
   "niveau": 180,
   "objectif": "Souiller une statue d'Ougah · salle 1 ; Piétiner des champignons sacrés d'Ougah · salle 2 ; Griffonner par-dessus une représentation d'Ougah · salle 3 ; Glisser des suppositoires dans les orifices du Champrout sacré · salle 8 ; Vaincre Ougah · salle du boss"
  },
  {
   "id": "dql-1784",
   "nom": "Les coûts du sort",
   "niveau": 180,
   "objectif": "Vaincre Ougah · salle du boss"
  },
  {
   "id": "dql-916",
   "nom": "Tour de force",
   "niveau": 180,
   "objectif": "Vaincre Ougah · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-2131",
   "nom": "Un pouvoir mérydique",
   "niveau": 200,
   "objectif": "Vaincre Ougah · salle du boss"
  }
 ],
 "Excavation du Mansot Royal": [
  {
   "id": "frq-577",
   "nom": "Pêche en eaux gelées",
   "niveau": 130,
   "objectif": "Récupérer l'Alliance de Damar sur le Mansot Royal et l'apporter à Valy Domidat · salle du boss"
  },
  {
   "id": "dql-1660",
   "nom": "La bénédiction de Viti",
   "niveau": 140,
   "objectif": "Vaincre Mansot Royal · salle du boss"
  },
  {
   "id": "gl-620",
   "nom": "Les joyeux de la couronne",
   "niveau": 140,
   "objectif": "Aller jusqu'à cette salle · salle 5 ; Vaincre Mansot Royal · salle du boss"
  },
  {
   "id": "dql-696",
   "nom": "Monarchie parlementaire",
   "niveau": 140,
   "objectif": "Vaincre Mansot Royal · salle du boss"
  },
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "niveau": 190,
   "objectif": "Braver les dangers de l'Excavation du Mansot Royal"
  }
 ],
 "Hypogée de l'Obsidiantre": [
  {
   "id": "dql-1661",
   "nom": "La bénédiction de Thomahon",
   "niveau": 150,
   "objectif": "Vaincre Obsidiantre · salle du boss"
  },
  {
   "id": "gl-622",
   "nom": "Lavomatique",
   "niveau": 160,
   "objectif": "Aller jusqu'à cette salle · salle 6 ; Vaincre Obsidiantre · salle du boss"
  },
  {
   "id": "dql-698",
   "nom": "Pour qui sonne le glagla",
   "niveau": 160,
   "objectif": "Vaincre Obsidiantre · salle du boss"
  },
  {
   "id": "gl-594",
   "nom": "À la recherche de Dan Lavy",
   "niveau": 160,
   "objectif": "Fouiller l'hypogée de l'Obsidiantre à la recherche des restes de Dan Lavy ; Vaincre Gros Med"
  },
  {
   "id": "gl-1318",
   "nom": "Mission Solution",
   "niveau": 170,
   "objectif": "Se vêtir d'un Slip Iholo et rencontrer Surlah Taite de nuit dans l'Hypogée de l'Obsidiantre · antichambre du S.L.I.P. ; Rapporter 10 × Cœur de Blérice · antichambre du S.L.I.P. ; Rapporter 1 × Huile de Kokoko · antichambre du S.L.I.P. ; Invoquer le S.L.I.P · antichambre du S.L.I.P. ; Vaincre S.L.O.P. · antichambre du S.L.I.P. ; Parler à Surlah Taite · antichambre du S.L.I.P."
  },
  {
   "id": "frq-678",
   "nom": "Chaud du S.L.I.P.",
   "niveau": 180,
   "objectif": "Récupérer une Plante soufrière après l'Obsidiantre · salle du boss"
  },
  {
   "id": "gl-596",
   "nom": "Dépôt de ravitaillement",
   "niveau": 180,
   "objectif": "Rejoindre Lulu Cotte dans l'hypogée de l'Obsidiantre, la nuit"
  },
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "niveau": 190,
   "objectif": "Braver les dangers de l'Hypogée de l'Obsidiantre"
  },
  {
   "id": "dql-1789",
   "nom": "Le dragon des flammes",
   "niveau": 190,
   "objectif": "Explorer l'Hypogée de l'Obsidiantre ; S'approcher du courant brûlant · salle 1"
  }
 ],
 "Cavernes du Kolosso": [
  {
   "id": "dql-701",
   "nom": "C'est Rébro",
   "niveau": 190,
   "objectif": "Vaincre Kolosso · salle du boss"
  },
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "niveau": 190,
   "objectif": "Braver les dangers des Cavernes du Kolosso"
  },
  {
   "id": "gl-625",
   "nom": "Là-haut sur la montagne",
   "niveau": 190,
   "objectif": "Vaincre Kolosso · salle du boss"
  },
  {
   "id": "gl-597",
   "nom": "Un ami qui ne vous veut pas que du bien",
   "niveau": 190,
   "objectif": "Aller jusqu'à cette salle · salle 4 ; Aider Francis à sortir des cavernes sain et sauf · salle 5"
  },
  {
   "id": "frq-2017",
   "nom": "Nincassable",
   "niveau": 200,
   "objectif": "Tester les capacités de Dundivad en affrontant les Bléros du Professeur Xa · salle du boss"
  }
 ],
 "Épave du Grolandais violent": [
  {
   "id": "gl-621",
   "nom": "Fais dodo, t'auras du gâteau",
   "niveau": 150,
   "objectif": "Aller jusqu'à cette salle · salle 5 ; Vaincre Ben le Ripate · salle du boss"
  },
  {
   "id": "dql-1661",
   "nom": "La bénédiction de Thomahon",
   "niveau": 150,
   "objectif": "Vaincre Ben le Ripate · salle du boss"
  },
  {
   "id": "dql-697",
   "nom": "Piwates des sept mers et demies",
   "niveau": 150,
   "objectif": "Vaincre Ben le Ripate · salle du boss"
  },
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "niveau": 190,
   "objectif": "Braver les dangers de l'Epave du Grolandais Violent"
  }
 ],
 "Tanière Givrefoux": [
  {
   "id": "gl-623",
   "nom": "C'est frais, mais c'est pas grave",
   "niveau": 170,
   "objectif": "Aller jusqu'à cette salle · salle 5 ; Vaincre Tengu Givrefoux · salle du boss ; Aller jusqu'à cette salle · sortie vers la forêt pétrifiée"
  },
  {
   "id": "dql-699",
   "nom": "Guerriers foux",
   "niveau": 170,
   "objectif": "Vaincre Tengu Givrefoux · salle du boss ; Aller jusqu'à cette salle · chemin vers la forêt pétrifiée"
  },
  {
   "id": "dql-690",
   "nom": "Porte, Tengu Givrefoux, trésor",
   "niveau": 170,
   "objectif": "Aller jusqu'à cette salle · sortie vers la forêt pétrifiée"
  },
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "niveau": 190,
   "objectif": "Braver les dangers de la Tanière Givrefoux"
  }
 ],
 "Antre du Korriandre": [
  {
   "id": "dql-1662",
   "nom": "La bénédiction de Foluk",
   "niveau": 170,
   "objectif": "Vaincre Korriandre · salle du boss"
  },
  {
   "id": "dql-700",
   "nom": "Donjon sans dragon",
   "niveau": 180,
   "objectif": "Vaincre Korriandre · salle du boss"
  },
  {
   "id": "sy-2486",
   "nom": "Les derniers d'entre nous",
   "niveau": 180,
   "objectif": "Affronter le Korriandre et les Sylvesprits pour se frayer un chemin dans l'antre · salle 5"
  },
  {
   "id": "gl-624",
   "nom": "Sans ma barbe, quelle barbe",
   "niveau": 180,
   "objectif": "Aller jusqu'à cette salle · salle 5 ; Vaincre Korriandre · salle du boss"
  },
  {
   "id": "alb-1719",
   "nom": "Gelé à pierre fendre",
   "niveau": 185,
   "objectif": "Vaincre Korriandre · salle du boss"
  },
  {
   "id": "alk-1720",
   "nom": "Marqué d'une pierre blanche",
   "niveau": 185,
   "objectif": "Vaincre Korriandre · salle du boss"
  },
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "niveau": 190,
   "objectif": "Braver les dangers de l'Antre du Korriandre"
  }
 ],
 "Antichambre des Gloursons": [
  {
   "id": "gl-653",
   "nom": "Donjons et trouffions",
   "niveau": 190,
   "objectif": "Braver les dangers de l'Antichambre des Gloursons"
  },
  {
   "id": "dql-702",
   "nom": "Glourson et lumière",
   "niveau": 190,
   "objectif": "Vaincre Glourséleste · salle du boss"
  },
  {
   "id": "gl-626",
   "nom": "Le pic qui glace",
   "niveau": 190,
   "objectif": "Aller jusqu'à cette salle · salle du boss ; Vaincre Glourséleste · salle du boss"
  }
 ],
 "Donjon du Comte Harebourg": [
  {
   "id": "gl-1327",
   "nom": "Le givre des révélations",
   "niveau": 200,
   "objectif": "Vaincre Comte Harebourg · salle du boss"
  },
  {
   "id": "dql-1331",
   "nom": "Les marcheurs blancs",
   "niveau": 200,
   "objectif": "Capturer le Comte Harebourg · salle du boss"
  },
  {
   "id": "dql-630",
   "nom": "On recherche le Comte Harebourg",
   "niveau": 200,
   "objectif": "Vaincre Comte Harebourg · salle du boss"
  },
  {
   "id": "dql-1315",
   "nom": "Porte, Comte Harebourg, trésor",
   "niveau": 200,
   "objectif": "Donjon du Comte Harebourg - Sortie"
  },
  {
   "id": "dql-2049",
   "nom": "S'armer contre le destin",
   "niveau": 200,
   "objectif": "Arracher un éclat de destin brisé au Comte Harebourg · grande aiguille"
  },
  {
   "id": "gl-1310",
   "nom": "Un comte de faits divers",
   "niveau": 200,
   "objectif": "Vaincre Comte Harebourg · salle du boss"
  }
 ],
 "Village Kanniboul": [
  {
   "id": "dql-673",
   "nom": "T'as les boules",
   "niveau": 55,
   "objectif": "Vaincre Kanniboul Ebil · salle du boss"
  },
  {
   "id": "dql-904",
   "nom": "Un Kanniboul versé",
   "niveau": 60,
   "objectif": "Vaincre Kanniboul Ebil · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dko-1668",
   "nom": "Un indigeste chez les indigènes",
   "niveau": 60,
   "objectif": "Vaincre Kanniboul Ebil · salle du boss"
  }
 ],
 "Maison Fantôme": [
  {
   "id": "dql-897",
   "nom": "Donjon en lambeaux",
   "niveau": 40,
   "objectif": "Vaincre Boostache · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-675",
   "nom": "Fantômes contre fantômes",
   "niveau": 40,
   "objectif": "Vaincre Boostache · salle du boss"
  }
 ],
 "Château du Wa Wabbit": [
  {
   "id": "dql-905",
   "nom": "Le Wa Pythie",
   "niveau": 60,
   "objectif": "Vaincre Wa Wabbit · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "cw-834",
   "nom": "Le château du Wa",
   "niveau": 60,
   "objectif": "Vaincre Wa Wabbit · salle du boss"
  }
 ],
 "Château Ensablé": [
  {
   "id": "dql-896",
   "nom": "Donjon en mousse",
   "niveau": 20,
   "objectif": "Vaincre Mob l'Éponge · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Grotte Hesque": [
  {
   "id": "sy-2443",
   "nom": "Après lui, le déluge",
   "niveau": 50,
   "objectif": "Vaincre Corailleur Magistral · salle du boss ; Trouver de l'ambre antédiluvien dans la Grotte Hesque"
  },
  {
   "id": "dql-899",
   "nom": "Donjon magistral",
   "niveau": 50,
   "objectif": "Vaincre Corailleur Magistral · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Cale de l'Arche d'Otomaï": [
  {
   "id": "dql-907",
   "nom": "Chéri fais-moi peur",
   "niveau": 70,
   "objectif": "Vaincre Gourlo le Terrible · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Cimetière des Mastodontes": [
  {
   "id": "dql-909",
   "nom": "Le fossile et le marteau",
   "niveau": 80,
   "objectif": "Vaincre Mantiscore · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-1805",
   "nom": "Le roi scorpion",
   "niveau": 80,
   "objectif": "Vaincre Mantiscore · salle du boss"
  },
  {
   "id": "dql-1819",
   "nom": "Sans chair et en os",
   "niveau": 80,
   "objectif": "Récupérer un échantillon de vertèbre osseuse · salle 3 ; Récupérer un échantillon de défense osseuse · salle 4 ; Récupérer un échantillon de rotule osseuse · dernière Salle"
  }
 ],
 "Arbre de Moon": [
  {
   "id": "dko-1670",
   "nom": "Rendez-vous avec la lune",
   "niveau": 100,
   "objectif": "Vaincre Moon · salle du boss"
  },
  {
   "id": "dql-910",
   "nom": "Tour d'horizon",
   "niveau": 100,
   "objectif": "Vaincre Moon · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Goulet du Rasboul": [
  {
   "id": "dql-911",
   "nom": "Tour à tour",
   "niveau": 110,
   "objectif": "Vaincre Silf le Rasboul Majeur · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Antre du Blop Multicolore Royal": [
  {
   "id": "dql-912",
   "nom": "Tour de table",
   "niveau": 120,
   "objectif": "Vaincre Blop Multicolore Royal · salle du boss ; Sortie de l'Antre du Blop Multicolore Royal · grande salle",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-1524",
   "nom": "Il faut battre le lait quand il est chaud",
   "niveau": 130,
   "objectif": "Vaincre Blop Multicolore Royal · salle du boss"
  }
 ],
 "Laboratoire du Tynril": [
  {
   "id": "dql-1660",
   "nom": "La bénédiction de Viti",
   "niveau": 140,
   "objectif": "Vaincre Tynril Perfide · salle du boss"
  },
  {
   "id": "dql-913",
   "nom": "Tour de passe-passe",
   "niveau": 140,
   "objectif": "Vaincre Tynril Perfide · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Canopée du Kimbo": [
  {
   "id": "dql-1661",
   "nom": "La bénédiction de Thomahon",
   "niveau": 150,
   "objectif": "Vaincre Kimbo · salle du boss"
  },
  {
   "id": "dql-915",
   "nom": "Tour de main",
   "niveau": 160,
   "objectif": "Vaincre Kimbo · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-2131",
   "nom": "Un pouvoir mérydique",
   "niveau": 200,
   "objectif": "Vaincre Kimbo · salle du boss"
  }
 ],
 "Aquadôme de Merkator": [
  {
   "id": "alem-1920",
   "nom": "Apprentissage : Gardien des Tortures",
   "niveau": 200,
   "objectif": "Vaincre Merkator · salle du boss"
  },
  {
   "id": "ales-1917",
   "nom": "Apprentissage : Gardien du Savoir",
   "niveau": 200,
   "objectif": "Vaincre Merkator · salle du boss"
  },
  {
   "id": "alcv-1916",
   "nom": "Apprentissage : Héros Légendaire",
   "niveau": 200,
   "objectif": "Vaincre Merkator · salle du boss"
  },
  {
   "id": "alcs-1919",
   "nom": "Apprentissage : Héros de l'Apocalypse",
   "niveau": 200,
   "objectif": "Vaincre Merkator · salle du boss"
  },
  {
   "id": "aloa-1918",
   "nom": "Apprentissage : Maître des Illusions",
   "niveau": 200,
   "objectif": "Vaincre Merkator · salle du boss"
  },
  {
   "id": "aloas-1921",
   "nom": "Apprentissage : Maître des Ombres",
   "niveau": 200,
   "objectif": "Vaincre Merkator · salle du boss"
  },
  {
   "id": "dql-1444",
   "nom": "Pollution, je dis non",
   "niveau": 200,
   "objectif": "Vaincre Merkator · salle du boss"
  },
  {
   "id": "dql-1443",
   "nom": "Prise de notes",
   "niveau": 200,
   "objectif": "Récupérer des notes dans la Salle du Bathyscaphe ; Récupérer des notes dans la Salle des Bulles ; Récupérer des notes dans la Salle des Globes ; Récupérer des notes dans la Salle du Périscope ; Récupérer des notes dans la Salle des Trésors"
  },
  {
   "id": "dql-917",
   "nom": "Tour nage",
   "niveau": 200,
   "objectif": "Vaincre Merkator · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Antre du Kralamoure Géant": [
  {
   "id": "dql-918",
   "nom": "Le tour est joué",
   "niveau": 200,
   "objectif": "Vaincre Kralamoure Géant · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Donjon de la mine de Sakaï": [
  {
   "id": "gl-919",
   "nom": "Au fion du trou",
   "niveau": 190,
   "objectif": "Vaincre Grolloum · salle du boss"
  },
  {
   "id": "dql-1461",
   "nom": "L'armée des ombres",
   "niveau": 190,
   "objectif": "Trouver les chaînes alchimiques forgées par Ereziah · salle 2"
  },
  {
   "id": "alk-1727",
   "nom": "La vengeance est un plat qui se mange froid",
   "niveau": 190,
   "objectif": "Vaincre Grolloum · salle du boss"
  },
  {
   "id": "alb-1730",
   "nom": "Ça fait froid dans le dos",
   "niveau": 190,
   "objectif": "Vaincre Grolloum · salle du boss"
  }
 ],
 "Transporteur de Sylargh": [
  {
   "id": "dql-1915",
   "nom": "Il est temps de mourir",
   "niveau": 200,
   "objectif": "Entrer dans le transporteur de Sylargh ; Vaincre Sylargh · salle du boss"
  },
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "niveau": 200,
   "objectif": "Vaincre Sylargh · salle du boss"
  },
  {
   "id": "gl-1334",
   "nom": "La vie de château",
   "niveau": 200,
   "objectif": "Affirmer votre supériorité intellectuelle en dévoilant les intentions de Sylargh · salle du boss"
  },
  {
   "id": "frq-1337",
   "nom": "Les desseins de Sylargh",
   "niveau": 200,
   "objectif": "Lire le message de Sylargh · salle du boss ; Fouiller le transporteur de Sylargh à la recherche d'un indice · salle 3"
  },
  {
   "id": "frq-1320",
   "nom": "Moteur à explosion",
   "niveau": 200,
   "objectif": "Escorter Idrissa Boteur jusqu'au point de ravitaillement du transporteur de Sylargh"
  }
 ],
 "Salons privés de Klime": [
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "niveau": 200,
   "objectif": "Vaincre Klime · salle du boss"
  },
  {
   "id": "gl-1334",
   "nom": "La vie de château",
   "niveau": 200,
   "objectif": "Confisquer la peau magique tannée par Klime · salle du boss"
  },
  {
   "id": "frq-1338",
   "nom": "Vous avez demandé la peau lisse ?",
   "niveau": 200,
   "objectif": "Trouver la peau magique tannée par Klime · salle 3"
  }
 ],
 "Forgefroide de Missiz Frizz": [
  {
   "id": "alk-1898",
   "nom": "Sueurs froides",
   "niveau": 197,
   "objectif": "Vaincre Missiz Frizz · salle du boss"
  },
  {
   "id": "alb-1897",
   "nom": "À glacer le sang",
   "niveau": 197,
   "objectif": "Vaincre Missiz Frizz · salle du boss"
  },
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "niveau": 200,
   "objectif": "Vaincre Missiz Frizz · salle du boss"
  },
  {
   "id": "frq-1339",
   "nom": "La dernière carte",
   "niveau": 200,
   "objectif": "Vaincre Missiz Frizz · salle du boss"
  },
  {
   "id": "gl-1334",
   "nom": "La vie de château",
   "niveau": 200,
   "objectif": "Réduire à néant les plans de Missiz Frizz · salle du boss"
  }
 ],
 "Théâtre de Dramak": [
  {
   "id": "dql-1425",
   "nom": "Ainsi font les petites marionnettes",
   "niveau": 100,
   "objectif": "Vaincre Dramak · salle 4 ; Vaincre Maître des Pantins · salle du boss"
  },
  {
   "id": "dql-1432",
   "nom": "Tour de marionnettes",
   "niveau": 100,
   "objectif": "Vaincre Maître des Pantins · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Terrier du Wa Wabbit": [
  {
   "id": "dql-1431",
   "nom": "Un défilé de Wobots",
   "niveau": 80,
   "objectif": "Vaincre Wa Wobot · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Pyramide d'Ombre": [
  {
   "id": "dql-1461",
   "nom": "L'armée des ombres",
   "niveau": 190,
   "objectif": "Vaincre Ombre · salle du boss"
  },
  {
   "id": "dql-1785",
   "nom": "Une ombre au tableau",
   "niveau": 190,
   "objectif": "Escorter Nabrisa jusqu'à la Pyramide d'Ombre ; Vaincre Ombre · salle du boss ; Capturer l'âme d'Ombre avec l'aide de Nabrisa · salle du boss"
  },
  {
   "id": "dql-1559",
   "nom": "Courir après des ombres",
   "niveau": 200,
   "objectif": "Chercher les voleurs d'ombre · salle du boss ; Écouter les voleurs d'ombre · salle du boss"
  }
 ],
 "Palais du roi Nidas": [
  {
   "id": "ve-3",
   "nom": "Orichomania",
   "niveau": 100,
   "objectif": "Mesurer le taux d'orichor dans la banque du Palais du roi Nidas"
  },
  {
   "id": "dql-1908",
   "nom": "Casse en Enutrosor",
   "niveau": 200,
   "objectif": "Vaincre Roi Nidas · salle du boss"
  },
  {
   "id": "dql-1514",
   "nom": "Coiffeur de génie",
   "niveau": 200,
   "objectif": "Vaincre Roi Nidas · salle du boss"
  },
  {
   "id": "dql-1495",
   "nom": "Un morceau de roi",
   "niveau": 200,
   "objectif": "Prélever de façon violente un poil de nez sur le roi Nidas · salle des coffres"
  }
 ],
 "Galerie du Phossile": [
  {
   "id": "dql-1500",
   "nom": "La pelle de la Phorrée",
   "niveau": 150,
   "objectif": "Vaincre Phossile · salle du boss ; Parler à Dyane Phossé à l'intérieur de la galerie du Phossile"
  },
  {
   "id": "dql-1662",
   "nom": "La bénédiction de Foluk",
   "niveau": 170,
   "objectif": "Vaincre Phossile · salle du boss"
  }
 ],
 "Ring du Capitaine Ekarlatte": [
  {
   "id": "dql-1526",
   "nom": "L'anneau de Tot",
   "niveau": 130,
   "objectif": "Vaincre Capitaine Ekarlatte · salle du boss"
  },
  {
   "id": "dql-1543",
   "nom": "Un ring pour les gouverner tous",
   "niveau": 130,
   "objectif": "Vaincre Capitaine Ekarlatte · salle du boss"
  }
 ],
 "Cave du Toxoliath": [
  {
   "id": "dql-1547",
   "nom": "L'art me ment",
   "niveau": 180,
   "objectif": "Vaincre Toxoliath · salle du boss"
  }
 ],
 "Trône de la Cour Sombre": [
  {
   "id": "dql-2043",
   "nom": "L'œuf de Crocabulia",
   "niveau": 200,
   "objectif": "Récupérer l'objet détenu par la Reine des Voleurs · traversée"
  },
  {
   "id": "dql-1552",
   "nom": "La cour des miracles",
   "niveau": 200,
   "objectif": "Vaincre Reine des Voleurs · salle du boss"
  }
 ],
 "Ventre de la Baleine": [
  {
   "id": "frq-1569",
   "nom": "Grand corps malade",
   "niveau": 200,
   "objectif": "Rapporter 1 × Inoculateur de Ninae Charpe · salle 4"
  },
  {
   "id": "frq-1568",
   "nom": "Qui dit baume",
   "niveau": 200,
   "objectif": "Vaincre Protozorreur · salle du boss"
  }
 ],
 "Œil de Vortex": [
  {
   "id": "dql-1582",
   "nom": "La vérité est au fond du puits",
   "niveau": 200,
   "objectif": "Vaincre Vortex · salle du boss"
  },
  {
   "id": "dql-2049",
   "nom": "S'armer contre le destin",
   "niveau": 200,
   "objectif": "Arracher un éclat de destin brisé à Vortex · salle des heures perdues"
  },
  {
   "id": "dql-1945",
   "nom": "Toucher le fond",
   "niveau": 200,
   "objectif": "Emprunter le vortex sous-marin · salle du boss"
  }
 ],
 "Horologium de XLII": [
  {
   "id": "dql-1586",
   "nom": "La Vie, l'Hormonde et le Reste",
   "niveau": 170,
   "objectif": "Vaincre XLII · salle du boss"
  }
 ],
 "Mégalithe de Fraktale": [
  {
   "id": "dql-2062",
   "nom": "Chaque chose en son temps",
   "niveau": 50,
   "objectif": "Entrer dans le Mégalithe et voir comment Fraktale réagit en présence du pixel perpétuel · salle du boss"
  },
  {
   "id": "dql-2035",
   "nom": "L'épée du rocher",
   "niveau": 120,
   "objectif": "Vaincre Fraktale · salle du boss"
  },
  {
   "id": "dql-1593",
   "nom": "Prisonniers du temps",
   "niveau": 120,
   "objectif": "Vaincre Fraktale · salle du boss"
  }
 ],
 "Crypte de Kardorim": [
  {
   "id": "ag-1638",
   "nom": "Cryptologie",
   "niveau": 10,
   "objectif": "Aller jusqu'à cette salle · salle du boss ; Vaincre Kardorim · salle du boss"
  }
 ],
 "Bateau du Chouque": [
  {
   "id": "dql-2507",
   "nom": "C'est du bateau",
   "niveau": 90,
   "objectif": "Vaincre Le Chouque · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dko-1669",
   "nom": "Squelettes et amulette",
   "niveau": 90,
   "objectif": "Vaincre Le Chouque · salle du boss"
  }
 ],
 "Plateau de Ush": [
  {
   "id": "dql-1710",
   "nom": "En rouge et noir",
   "niveau": 160,
   "objectif": "Vaincre Ush Galesh · salle du boss"
  },
  {
   "id": "dql-1698",
   "nom": "GaBuZoMeu",
   "niveau": 160,
   "objectif": "Récupérer la flamme de Ush Galesh · salle du boss"
  }
 ],
 "Défi du Chalœil": [
  {
   "id": "dql-1702",
   "nom": "De l'autre côté du Chalœil",
   "niveau": 200,
   "objectif": "Vaincre Chalœil · salle du boss"
  },
  {
   "id": "dql-1905",
   "nom": "Le dragon blanc",
   "niveau": 200,
   "objectif": "Entrer dans la salle du Chalœil · salle du boss ; Vaincre Chalœil · salle du boss"
  }
 ],
 "Miausolée du Pounicheur": [
  {
   "id": "dql-1705",
   "nom": "Testé et approuvé",
   "niveau": 110,
   "objectif": "Entrer dans le miausolée du pounicheur ; Vaincre Pounicheur · salle du boss"
  }
 ],
 "Temple Maudit d'Araknas": [
  {
   "id": "alb-1721",
   "nom": "L'ascension de Qu'Tan",
   "niveau": 186,
   "objectif": "Vaincre Qu'Tan · salle 3 ; Parler à Qu'Tan · autel d'Araknas"
  },
  {
   "id": "alk-1722",
   "nom": "L'essor de Qu'Tan",
   "niveau": 186,
   "objectif": "Vaincre Qu'Tan · salle 3 ; Parler à Qu'Tan · autel d'Araknas"
  }
 ],
 "Vaisseau du Capitaine Meno": [
  {
   "id": "dql-1735",
   "nom": "Piège de crystal",
   "niveau": 200,
   "objectif": "Entrer dans le vaisseau du Capitaine Meno ; Vaincre Capitaine Meno · salle du boss"
  },
  {
   "id": "dql-1912",
   "nom": "Une voix de crystal",
   "niveau": 200,
   "objectif": "Donner les partitions au capitaine Meno · salle du boss"
  }
 ],
 "Palais de Dantinéa": [
  {
   "id": "dql-1792",
   "nom": "Mississitudes",
   "niveau": 200,
   "objectif": "Entrer dans le palais de Dantinéa ; Vaincre Dantinéa · salle du boss"
  },
  {
   "id": "dql-1737",
   "nom": "Reine de beauté",
   "niveau": 200,
   "objectif": "Vaincre Dantinéa · salle du boss"
  }
 ],
 "Temple de Koutoulou": [
  {
   "id": "dql-1759",
   "nom": "De mal en impie",
   "niveau": 200,
   "objectif": "Entrer dans le temple de Koutoulou ; Vaincre Larve de Koutoulou · salle du boss"
  }
 ],
 "Caverne d'El Piko": [
  {
   "id": "dql-1802",
   "nom": "L'Étoile de la Mer",
   "niveau": 130,
   "objectif": "Vaincre El Piko · salle du boss"
  },
  {
   "id": "dql-1807",
   "nom": "Le monde entier est un cactus",
   "niveau": 130,
   "objectif": "Aller jusqu'à cette salle · salle 5 ; Vaincre El Piko · salle du boss"
  }
 ],
 "Boyau du Père Ver": [
  {
   "id": "dql-1831",
   "nom": "Le mystère des vers",
   "niveau": 170,
   "objectif": "Entrer dans le Boyau du Père Ver ; Vaincre Père Ver · salle du boss"
  }
 ],
 "Chambre de Tal Kasha": [
  {
   "id": "dql-1833",
   "nom": "Le secret de la pyramide",
   "niveau": 200,
   "objectif": "Entrer dans la Chambre de Tal Kasha avec Chanisa ; Vaincre Tal Kasha · salle du boss"
  },
  {
   "id": "dql-1909",
   "nom": "Nordalie",
   "niveau": 200,
   "objectif": "Entrer dans la Chambre de Tal Kasha ; Vaincre Tal Kasha · salle du boss"
  }
 ],
 "Camp du Comte Razof": [
  {
   "id": "dql-1854",
   "nom": "La valse des manuels",
   "niveau": 190,
   "objectif": "Aller jusqu'à cette salle · salle 5 ; Parler à Minikrone Effrayée · salle 5 ; Vaincre Comte Razof · salle du boss ; Fouiller le camp du Comte Razof à la recherche des manuels scolaires"
  }
 ],
 "Manoir des Katrepat": [
  {
   "id": "dql-1875",
   "nom": "Entretien avec une Vampyre",
   "niveau": 200,
   "objectif": "Entrer dans le manoir des Katrepat ; Vaincre Anerice la Shushess · salle du boss"
  },
  {
   "id": "dql-1913",
   "nom": "Le mort dans l'âme",
   "niveau": 200,
   "objectif": "Obtenir par la force une audience avec Anerice · salle 5"
  }
 ],
 "Chapiteau des Magik Riktus": [
  {
   "id": "dql-1881",
   "nom": "La grande parade",
   "niveau": 90,
   "objectif": "Aller jusqu'à cette salle · salle 5 ; Vaincre Choudini · salle du boss ; Parler à Choudini · sortie ; Parler à MC Dimote · sortie ; Parler à Chourave · sortie ; Parler à Magik Ermitus · sortie"
  },
  {
   "id": "dql-2508",
   "nom": "Le spectacle vivant",
   "niveau": 90,
   "objectif": "Vaincre Choudini · salle du boss ; Aller jusqu'à cette salle · sortie",
   "serie": "emma-tom-pouce"
  }
 ],
 "Belvédère d'Ilyzaelle": [
  {
   "id": "alb-1901",
   "nom": "Fée d'hiver",
   "niveau": 199,
   "objectif": "Aller jusqu'à cette salle · blessure d'Erazal ; Vaincre Ilyzaelle · salle du boss"
  },
  {
   "id": "alk-1902",
   "nom": "Lettre à Ilyz",
   "niveau": 199,
   "objectif": "Aller jusqu'à cette salle · blessure d'Erazal ; Vaincre Ilyzaelle · salle du boss"
  },
  {
   "id": "dql-1909",
   "nom": "Nordalie",
   "niveau": 200,
   "objectif": "Reprendre le chemin du Belvédère d'Ilyzaelle"
  },
  {
   "id": "dql-2480",
   "nom": "Une dernière volonté",
   "niveau": 200,
   "objectif": "Vous frayer un chemin jusqu'à Ilyzaelle · blessure d'Erazal ; Annoncer à Ilyzaelle que le roi se porte volontaire · salle du boss"
  }
 ],
 "Trône de Sang": [
  {
   "id": "dql-2133",
   "nom": "Veilleur sous surveillance",
   "niveau": 50,
   "objectif": "Entrer dans le domaine de Guerre en utilisant le portail · salle du boss"
  },
  {
   "id": "dql-2115",
   "nom": "Au-delà de la gloire",
   "niveau": 200,
   "objectif": "Retourner voir Filco Norse dans la dimension de Guerre · salle du boss"
  },
  {
   "id": "dql-1940",
   "nom": "La guerre des Marches",
   "niveau": 200,
   "objectif": "Lire l'ouvrage sur la guerre des marches · salle du boss"
  },
  {
   "id": "dql-2418",
   "nom": "La loi du plus faible",
   "niveau": 200,
   "objectif": "Forcer le Bwariok à laisser sa place de chef de guerre · salle du boss ; Clamer la supériorité de Gob'Li'Terr en tant que chef de guerre · salle du boss"
  },
  {
   "id": "dql-2407",
   "nom": "Le dernier rempart",
   "niveau": 200,
   "objectif": "Prévenir Migi Ude qu'un nouveau conseil de guerre va avoir lieu dans la cellule de crise et que sa présence est requise · salle du boss"
  },
  {
   "id": "dql-2111",
   "nom": "Le jour le plus long",
   "niveau": 200,
   "objectif": "Vaincre les Généraux de Guerre · salle du boss ; Vaincre Guerre · salle du boss ; Parler à nouveau avec Guerre · salle du boss"
  },
  {
   "id": "dql-2122",
   "nom": "Les quatre volontés",
   "niveau": 200,
   "objectif": "Empêcher Guerre de mettre le Krosmoz à feu et à sang · salle du boss"
  },
  {
   "id": "dql-2138",
   "nom": "Prise de conscience",
   "niveau": 200,
   "objectif": "Empêcher la guerre de Cania d'éclater · salle du boss"
  },
  {
   "id": "dql-2116",
   "nom": "Voyage au bout de l'Externam",
   "niveau": 200,
   "objectif": "Jouer du tambour de guerre sur un lieu propice et survivre à la bataille · salle du boss"
  }
 ],
 "Tour de Solar": [
  {
   "id": "dql-1954",
   "nom": "Les cœurs livides",
   "niveau": 200,
   "objectif": "Entrer dans la Tour de Solar ; Vaincre Solar · salle du boss"
  },
  {
   "id": "dql-2044",
   "nom": "Un nouvel héritier",
   "niveau": 200,
   "objectif": "Calmer la faim de Crocobur en lui faisant goûter à l'âme de Solar · salle 5"
  }
 ],
 "Tour de Bethel": [
  {
   "id": "dql-1954",
   "nom": "Les cœurs livides",
   "niveau": 200,
   "objectif": "Entrer dans la Tour de Bethel ; Vaincre Bethel Akarna · salle du boss"
  },
  {
   "id": "dql-2038",
   "nom": "À la recherche de Crocoburio",
   "niveau": 200,
   "objectif": "Affronter Bethel dans sa tour · salle 5"
  }
 ],
 "Cache de Kankreblath": [
  {
   "id": "dql-2003",
   "nom": "Donjon rikiki",
   "niveau": 40,
   "objectif": "Vaincre Kankreblath · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Grange du Tournesol Affamé": [
  {
   "id": "dql-2005",
   "nom": "Le tour du monde",
   "niveau": 20,
   "objectif": "Vaincre Tournesol Affamé · salle du boss",
   "serie": "tour-du-monde"
  }
 ],
 "Cour du Bouftou Royal": [
  {
   "id": "dql-2006",
   "nom": "Revenons à nos bouftons",
   "niveau": 30,
   "objectif": "Vaincre Bouftou Royal · salle du boss",
   "serie": "tour-du-monde"
  }
 ],
 "Brasserie du roi Dazak": [
  {
   "id": "frq-2011",
   "nom": "De Brikke et de Brokke",
   "niveau": 200,
   "objectif": "Entrer dans la Brasserie du roi Dazak ; Demander violemment une audience avec le roi Dazak Martegel · salle 5"
  },
  {
   "id": "dql-2041",
   "nom": "Le dragon noir",
   "niveau": 200,
   "objectif": "Discuter avec le roi Dazak Martegel après lui avoir montré que vous n'êtes pas son ennemi · salle du boss"
  }
 ],
 "Fonderie des Waddicts": [
  {
   "id": "dql-2068",
   "nom": "Les aléas de la Chocolaterie",
   "niveau": 60,
   "objectif": "Vaincre Mawabouaino · salle du boss"
  }
 ],
 "Croquanterie": [
  {
   "id": "dql-2068",
   "nom": "Les aléas de la Chocolaterie",
   "niveau": 60,
   "objectif": "Vaincre Croqueleur · salle du boss"
  }
 ],
 "Temple du dieu Kao": [
  {
   "id": "dql-2068",
   "nom": "Les aléas de la Chocolaterie",
   "niveau": 60,
   "objectif": "Vaincre Prêtresse de Kao · salle du boss"
  }
 ],
 "Épreuve de Draegnerys": [
  {
   "id": "dql-2506",
   "nom": "C'est radical ici",
   "niveau": 70,
   "objectif": "Vaincre Draegnerys · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "vu-2079",
   "nom": "La mère des Dragoeufs",
   "niveau": 200,
   "objectif": "Combattre des aventuriers dans le sanctuaire des Dragoeufs jusqu'à ce que Draegnerys soit satisfaite · salle du boss"
  }
 ],
 "Sanctuaire de Torkélonia": [
  {
   "id": "dql-2087",
   "nom": "Le sens du sacrifice",
   "niveau": 200,
   "objectif": "Vaincre Torkélonia · salle du boss"
  }
 ],
 "Tempête de l'Eliocalypse": [
  {
   "id": "dql-2119",
   "nom": "Avis de tempête",
   "niveau": 200,
   "objectif": "Vaincre Misère · salle du boss"
  },
  {
   "id": "dql-2113",
   "nom": "Briser ses chaines",
   "niveau": 200,
   "objectif": "Vaincre Servitude · salle du boss"
  },
  {
   "id": "dql-2111",
   "nom": "Le jour le plus long",
   "niveau": 200,
   "objectif": "Vaincre Guerre · salle du boss"
  },
  {
   "id": "dql-2132",
   "nom": "Mort et renouveau",
   "niveau": 200,
   "objectif": "Vaincre Corruption · salle du boss"
  }
 ],
 "Fers de la Tyrannie": [
  {
   "id": "dql-2133",
   "nom": "Veilleur sous surveillance",
   "niveau": 50,
   "objectif": "Entrer dans le domaine de Servitude en utilisant le portail · salle du boss ; Vaincre les laquais de Servitude · salle du boss"
  },
  {
   "id": "dql-2113",
   "nom": "Briser ses chaines",
   "niveau": 200,
   "objectif": "Tenter de détruire la première chaine de Servitude · salle du boss ; Tenter de détruire la deuxième chaine de Servitude · salle du boss ; Tenter de détruire la troisième chaine de Servitude · salle du boss ; Tenter de détruire la quatrième chaine de Servitude · salle du boss ; Tenter de détruire la cinquième chaine de Servitude · salle du boss ; Vaincre Servitude · salle du boss"
  },
  {
   "id": "dql-2122",
   "nom": "Les quatre volontés",
   "niveau": 200,
   "objectif": "Contrecarrer les plans de Servitude · salle du boss"
  },
  {
   "id": "dql-2114",
   "nom": "Une boite pour les asservir tous",
   "niveau": 200,
   "objectif": "Vaincre Bavdur accompagné des sbires de Servitude · salle du boss ; Mener Servitude dans le passé · salle du boss ; Vaincre les 5 Chaines de Servitude · salle du boss"
  }
 ],
 "Sentence de la Balance": [
  {
   "id": "dql-2133",
   "nom": "Veilleur sous surveillance",
   "niveau": 50,
   "objectif": "Entrer dans le domaine de Misère en utilisant le portail · salle du boss"
  },
  {
   "id": "dql-2119",
   "nom": "Avis de tempête",
   "niveau": 200,
   "objectif": "Vaincre Misère · salle du boss ; Interroger les collecteurs d'impôts présents dans l'Oasis pour recueillir des informations sur la voleuse de Misère · salle du boss ; Chercher des indices à propos de la voleuse de Misère dans le désert · salle du boss ; Repousser la garde personnelle de Misère · salle du boss"
  },
  {
   "id": "dql-2117",
   "nom": "Le vent se lève",
   "niveau": 200,
   "objectif": "Interroger les habitants du désert de Misère pour trouver un moyen d'entrer dans l'enceinte de l'Oasis · salle du boss"
  },
  {
   "id": "dql-2122",
   "nom": "Les quatre volontés",
   "niveau": 200,
   "objectif": "Découvrir ce que cache Misère · salle du boss"
  },
  {
   "id": "dql-2118",
   "nom": "Tournent les vents",
   "niveau": 200,
   "objectif": "Trouver le convoi pour la Sentence de la Balance"
  }
 ],
 "Arbre de Mort": [
  {
   "id": "dql-2133",
   "nom": "Veilleur sous surveillance",
   "niveau": 50,
   "objectif": "Entrer dans le domaine de Corruption en utilisant le portail · salle du boss"
  },
  {
   "id": "dql-2122",
   "nom": "Les quatre volontés",
   "niveau": 200,
   "objectif": "Déjouer les noirs desseins de Corruption · salle du boss"
  },
  {
   "id": "dql-2130",
   "nom": "Les racines du mal",
   "niveau": 200,
   "objectif": "Tenter de pénétrer dans l'Arbre de Mort ; Retourner à l'arbre de mort transformé en Gangredogue ; Examiner le cœur de l'arbre de mort ; Évoquer la corruption de l'endroit avec Rathrosk · salle du boss"
  },
  {
   "id": "dql-2132",
   "nom": "Mort et renouveau",
   "niveau": 200,
   "objectif": "Retourner à l'arbre de mort pour utiliser le pouvoir de l'idole ; Chercher un endroit préservé de la corruption · salle du boss ; Tenter de communiquer avec l'arbre de mort ; Vaincre Corruption · salle du boss ; Faire admettre à Corruption sa défaite · salle du boss"
  },
  {
   "id": "dql-2408",
   "nom": "Par ce serment s'écrit le monde",
   "niveau": 200,
   "objectif": "Mettre fin à la corruption du mildiou · salle du boss"
  },
  {
   "id": "dql-2479",
   "nom": "Par l'héritage qui vous lie",
   "niveau": 200,
   "objectif": "Vaincre les envoyés de Corruption · salle du boss"
  },
  {
   "id": "dql-2131",
   "nom": "Un pouvoir mérydique",
   "niveau": 200,
   "objectif": "Prélever un fragment de corruption sur le bourgeon parasite · salle du boss"
  }
 ],
 "Bambusaie de Damadrya": [
  {
   "id": "sy-2445",
   "nom": "Rester planté là",
   "niveau": 110,
   "objectif": "Vaincre Damadrya · salle du boss"
  },
  {
   "id": "dql-2151",
   "nom": "Sous le bois de sa colère",
   "niveau": 110,
   "objectif": "Continuer l'exploration de la bambusaie · salle 5 ; Affronter la gardienne de la bambusaie · salle 5"
  }
 ],
 "Vallée de la Dame des eaux": [
  {
   "id": "dql-2153",
   "nom": "La jetée des enfants perdus",
   "niveau": 130,
   "objectif": "Entrer dans la Vallée de la Dame des eaux ; Vaincre Nagate la Dame des eaux · salle 5"
  }
 ],
 "Dojo du Vent": [
  {
   "id": "dql-2155",
   "nom": "L'équilibre des forces",
   "niveau": 140,
   "objectif": "Entrer dans le Dojo du Vent ; Vaincre Hanshi · salle du boss"
  }
 ],
 "Demeure des Esprits": [
  {
   "id": "sy-2447",
   "nom": "Quand les esprits s'échauffent",
   "niveau": 170,
   "objectif": "Attirer l'attention de la Kitsoune à neuf queues par une démonstration de force · salle 5 ; Passer un marché avec Koumiho · salle du boss"
  },
  {
   "id": "dg-2180",
   "nom": "Requiem pour un Yokai",
   "niveau": 170,
   "objectif": "Aller jusqu'à cette salle · salle 1 ; Vaincre Koumiho · salle du boss ; Emporter une flamme du Kitsounebi de Koumiho · salle du boss"
  },
  {
   "id": "dql-2162",
   "nom": "Si loin, si proches",
   "niveau": 170,
   "objectif": "Trouver le Bakénéko qui a permis la libération de Koumiho · salle du boss"
  }
 ],
 "Tombe du Shogun Tofugawa": [
  {
   "id": "dg-2179",
   "nom": "Maudite disparition",
   "niveau": 160,
   "objectif": "Aller jusqu'à cette salle · salle 1 ; Vaincre Shogun Tofugawa · salle du boss"
  }
 ],
 "Mémoire d'Orukam": [
  {
   "id": "ta-2201",
   "nom": "Deux souffles, une inspiration",
   "niveau": 200,
   "objectif": "Explorer la Mémoire d'Orukam ; Vaincre Roi Imagami · salle du boss ; Décrypter le sens des mots-esprits dans la dernière salle de la Mémoire d'Orukam"
  }
 ],
 "Souvenir d'Imagiro": [
  {
   "id": "ta-2201",
   "nom": "Deux souffles, une inspiration",
   "niveau": 200,
   "objectif": "Explorer le Souvenir d'Imagiro ; Vaincre Reine Amirukam · salle du boss ; Décrypter le sens des mots-esprits dans la dernière salle du Souvenir d'Imagiro"
  }
 ],
 "Rituel de Kabahal": [
  {
   "id": "dql-2412",
   "nom": "Le chant du Pandamonium",
   "niveau": 200,
   "objectif": "Affronter les Possédés et leur chaman démoniaque · salle 5"
  },
  {
   "id": "dql-2417",
   "nom": "Un vrai petit garçon",
   "niveau": 200,
   "objectif": "Vaincre Kabahal · salle du boss ; Parler à Getteppo · salle 5"
  }
 ],
 "Bataille de l'Aurore Pourpre": [
  {
   "id": "dql-2421",
   "nom": "La danse de la dissonance",
   "niveau": 200,
   "objectif": "Survivre à l'Éternel Conflit · salle du boss"
  },
  {
   "id": "sy-2488",
   "nom": "Qui nous protège du Protecteur ?",
   "niveau": 200,
   "objectif": "Obtenir le sigil de Raval"
  },
  {
   "id": "dql-2441",
   "nom": "Soldats d'infortune",
   "niveau": 200,
   "objectif": "En savoir plus sur le rôle joué par les Astrubiens dans l'éternel conflit · salle du boss"
  }
 ],
 "Akadémie des Gobs": [
  {
   "id": "dql-2455",
   "nom": "De joyeux petits arbres",
   "niveau": 40,
   "objectif": "Vaincre Directeur Grunob · salle du boss"
  },
  {
   "id": "dql-2504",
   "nom": "Donjon éducatif",
   "niveau": 40,
   "objectif": "Vaincre Directeur Grunob · salle du boss",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "sy-2442",
   "nom": "La raison du plus fort",
   "niveau": 40,
   "objectif": "Entrer dans l'Akadémie des Gobs ; Vaincre Directeur Grunob · salle du boss"
  }
 ],
 "Tertre du long sommeil": [
  {
   "id": "dql-2451",
   "nom": "Arrête-la si tu peux",
   "niveau": 150,
   "objectif": "Conduire Karnhell auprès d'Hell Mina · salle du boss ; Suivre Hell Mina à l'intérieur du Tumulus · salle du boss ; Vaincre Hell Mina · salle du boss"
  }
 ],
 "Bastion des Marteaux-Aigris": [
  {
   "id": "dql-2472",
   "nom": "L'île maudite",
   "niveau": 190,
   "objectif": "Se rendre là où se trouve Barbéryl Clochecuivre, en faisant toujours preuve de discrétion · salle du boss ; Se faufiler dans le Bastion des Marteaux-Aigris · salle 1 ; Vaincre Barbéryl Clochecuivre · salle du boss"
  }
 ],
 "Chambre des maléfices": [
  {
   "id": "dql-2478",
   "nom": "La graine de la révolte",
   "niveau": 200,
   "objectif": "Vaincre les sentinelles de Belladone · salle du boss"
  },
  {
   "id": "dql-2475",
   "nom": "La sorcière exilée",
   "niveau": 200,
   "objectif": "Vaincre Belladone · salle du boss"
  }
 ],
 "Repaire du Kharnozor": [
  {
   "id": "dql-2510",
   "nom": "Tour d'honneur",
   "niveau": 100,
   "objectif": "Vaincre Kharnozor · salle du boss",
   "serie": "emma-tom-pouce"
  }
 ],
 "Poste de contrôle du Supervizœuf": [
  {
   "id": "dql-2522",
   "nom": "Têtes de ponte",
   "niveau": 170,
   "objectif": "Vaincre Supervizœuf · salle du boss"
  }
 ],
 "Breuil du Vénérable": [
  {
   "id": "dql-2531",
   "nom": "Devoir de réserve",
   "niveau": 200,
   "objectif": "Vaincre Vénérable Endormi · salle du boss"
  }
 ]
};
