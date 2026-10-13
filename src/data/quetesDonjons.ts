// Généré par scripts/generer-quetes-dofus.py : quêtes liées à chaque donjon (un objectif demande de vaincre son boss),
// d'après les données du jeu. Clé : nom du donjon. Un identifiant « dql-… » n'appartient à aucune série du site.
export type QueteLieeDonjon = { id: string; nom: string; niveau: number; objectif: string; serie?: string };

export const QUETES_DONJONS: Record<string, QueteLieeDonjon[]> = {
 "Donjon des Bworks": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "vaincre Bworkette",
   "serie": "tour-du-monde"
  },
  {
   "id": "alb-65",
   "nom": "Du repos mais pas trop...",
   "niveau": 51,
   "objectif": "vaincre Bworkette"
  }
 ],
 "Donjon des Forgerons": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "vaincre Coffre des Forgerons",
   "serie": "tour-du-monde"
  },
  {
   "id": "alb-66",
   "nom": "Recouvrement de dette à la Tabasse",
   "niveau": 52,
   "objectif": "vaincre Coffre des Forgerons"
  }
 ],
 "Pitons Rocheux des Craqueleurs": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "vaincre Craqueleur Légendaire",
   "serie": "tour-du-monde"
  },
  {
   "id": "alb-76",
   "nom": "La fureur du Holbaïd",
   "niveau": 72,
   "objectif": "vaincre Craqueleur Légendaire"
  },
  {
   "id": "alk-396",
   "nom": "Taxe gratuite",
   "niveau": 72,
   "objectif": "vaincre Craqueleur Légendaire"
  }
 ],
 "Laboratoire de Brumen Tinctorias": [
  {
   "id": "dql-908",
   "nom": "Histoire de chiens",
   "niveau": 70,
   "objectif": "vaincre Nelween",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "alk-403",
   "nom": "Du venin sinon rien",
   "niveau": 79,
   "objectif": "vaincre Nelween"
  },
  {
   "id": "alb-83",
   "nom": "Poison de scorbute pour la prison",
   "niveau": 79,
   "objectif": "vaincre Nelween"
  }
 ],
 "Caverne du Koulosse": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "vaincre Koulosse",
   "serie": "tour-du-monde"
  },
  {
   "id": "alb-94",
   "nom": "C'est stupéfiant",
   "niveau": 100,
   "objectif": "vaincre Koulosse"
  }
 ],
 "Donjon des Squelettes": [
  {
   "id": "dql-153",
   "nom": "Le maître des clefs",
   "niveau": 30,
   "objectif": "vaincre Chafer Rōnin",
   "serie": "tour-du-monde"
  }
 ],
 "Donjon des Tofus": [
  {
   "id": "dql-153",
   "nom": "Le maître des clefs",
   "niveau": 30,
   "objectif": "vaincre Batofu",
   "serie": "tour-du-monde"
  }
 ],
 "Donjon des Scarafeuilles": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "vaincre Scarabosse Doré",
   "serie": "tour-du-monde"
  }
 ],
 "Donjon des Larves": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "vaincre Shin Larve",
   "serie": "tour-du-monde"
  },
  {
   "id": "alk-386",
   "nom": "Pauvre larve... dorée",
   "niveau": 52,
   "objectif": "vaincre Larve Dorée"
  }
 ],
 "Refuge sylvestre": [
  {
   "id": "dql-154",
   "nom": "Les sbires du maître",
   "niveau": 40,
   "objectif": "vaincre Rakoopeur",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2466",
   "nom": "Association de fureteurs",
   "niveau": 50,
   "objectif": "vaincre Rakoopeur"
  }
 ],
 "Domaine Ancestral": [
  {
   "id": "sy-1620",
   "nom": "Munster lève le mystère",
   "niveau": 90,
   "objectif": "vaincre Abraknyde Ancestral"
  },
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "vaincre Abraknyde Ancestral",
   "serie": "tour-du-monde"
  }
 ],
 "Antre du Dragon Cochon": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "vaincre Dragon Cochon",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1653",
   "nom": "Plongeon et dragon",
   "niveau": 100,
   "objectif": "vaincre Dragon Cochon"
  }
 ],
 "Tanière du Meulou": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "vaincre Meulou",
   "serie": "tour-du-monde"
  },
  {
   "id": "alk-414",
   "nom": "Mulanthropie",
   "niveau": 100,
   "objectif": "vaincre Meulou"
  }
 ],
 "Garde-manger du Rat Blanc": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "vaincre Rat Blanc",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2434",
   "nom": "La Geste de Ratagnan",
   "niveau": 110,
   "objectif": "vaincre Rat Blanc"
  },
  {
   "id": "alb-257",
   "nom": "Vin diou",
   "niveau": 111,
   "objectif": "vaincre Rat Blanc"
  }
 ],
 "Sousouricière du Rat Noir": [
  {
   "id": "dql-155",
   "nom": "Un juge hystérique",
   "niveau": 90,
   "objectif": "vaincre Rat Noir",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2432",
   "nom": "Fait comme un rat",
   "niveau": 110,
   "objectif": "vaincre Rat Noir"
  },
  {
   "id": "alk-246",
   "nom": "Triple X",
   "niveau": 111,
   "objectif": "vaincre Rat Noir"
  }
 ],
 "Bibliothèque du Maître Corbac": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "vaincre Maître Corbac",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1775",
   "nom": "Voler dans les plumes",
   "niveau": 110,
   "objectif": "vaincre Maître Corbac"
  }
 ],
 "Serre du Royalmouth": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "vaincre Royalmouth",
   "serie": "tour-du-monde"
  },
  {
   "id": "gl-619",
   "nom": "Antiroyaliste",
   "niveau": 120,
   "objectif": "vaincre Royalmouth"
  },
  {
   "id": "dql-695",
   "nom": "Monarchie absolue",
   "niveau": 120,
   "objectif": "vaincre Royalmouth"
  },
  {
   "id": "dql-1529",
   "nom": "Le pouvoir derrière le trône",
   "niveau": 130,
   "objectif": "vaincre Royalmouth"
  }
 ],
 "Centre du Labyrinthe du Minotoror": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "vaincre Minotoror",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1522",
   "nom": "Taures et détours",
   "niveau": 120,
   "objectif": "vaincre Minotoror"
  }
 ],
 "Tofulailler Royal": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "vaincre Tofu Royal",
   "serie": "tour-du-monde"
  }
 ],
 "Antre de Crocabulia": [
  {
   "id": "dql-156",
   "nom": "Des donjons, encore des donjons",
   "niveau": 110,
   "objectif": "vaincre Crocabulia",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2036",
   "nom": "Le forgeur de légende",
   "niveau": 120,
   "objectif": "vaincre Crocabulia"
  }
 ],
 "Repaire de Skeunk": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "vaincre Skeunk",
   "serie": "tour-du-monde"
  }
 ],
 "Atelier du Tanukouï San": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "vaincre Tanukouï San",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-2152",
   "nom": "Au nom de l'Art",
   "niveau": 130,
   "objectif": "vaincre Tanukouï San"
  }
 ],
 "Fabrique de foux d'artifice": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "vaincre Founoroshi",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1660",
   "nom": "La bénédiction de Viti",
   "niveau": 140,
   "objectif": "vaincre Founoroshi"
  },
  {
   "id": "dql-2154",
   "nom": "Le festival de la lanterne",
   "niveau": 140,
   "objectif": "vaincre Founoroshi"
  }
 ],
 "Clairière du Chêne Mou": [
  {
   "id": "dql-1653",
   "nom": "Plongeon et dragon",
   "niveau": 100,
   "objectif": "vaincre Chêne Mou"
  },
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "vaincre Chêne Mou",
   "serie": "tour-du-monde"
  },
  {
   "id": "sy-1621",
   "nom": "L'art de la langue de bois",
   "niveau": 140,
   "objectif": "vaincre Chêne Mou"
  },
  {
   "id": "dql-2131",
   "nom": "Un pouvoir mérydique",
   "niveau": 200,
   "objectif": "vaincre Chêne Mou"
  }
 ],
 "Salle du Minotot": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "vaincre Minotot",
   "serie": "tour-du-monde"
  }
 ],
 "Grotte du Bworker": [
  {
   "id": "dql-157",
   "nom": "La voie du guerrier",
   "niveau": 120,
   "objectif": "vaincre Bworker",
   "serie": "tour-du-monde"
  },
  {
   "id": "dql-1782",
   "nom": "La dernière pierre",
   "niveau": 180,
   "objectif": "vaincre Bworker"
  }
 ],
 "Nid du Kwakwa": [
  {
   "id": "dql-898",
   "nom": "Donjon douillet",
   "niveau": 50,
   "objectif": "vaincre Kwakwa",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-681",
   "nom": "L'Ascension",
   "niveau": 50,
   "objectif": "vaincre Kwakwa"
  },
  {
   "id": "alk-385",
   "nom": "Pauvre larve",
   "niveau": 51,
   "objectif": "vaincre Kwakwa"
  }
 ],
 "Antre de la Reine Nyée": [
  {
   "id": "sy-1619",
   "nom": "Arak-haï en pagaille",
   "niveau": 90,
   "objectif": "vaincre Reine Nyée"
  },
  {
   "id": "dql-2509",
   "nom": "Tour du propriétaire",
   "niveau": 90,
   "objectif": "vaincre Reine Nyée",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "alk-407",
   "nom": "Un assassin... à Bonta ?",
   "niveau": 93,
   "objectif": "vaincre Reine Nyée"
  }
 ],
 "Hypogée de l'Obsidiantre": [
  {
   "id": "dql-1661",
   "nom": "La bénédiction de Thomahon",
   "niveau": 150,
   "objectif": "vaincre Obsidiantre"
  },
  {
   "id": "gl-622",
   "nom": "Lavomatique",
   "niveau": 160,
   "objectif": "vaincre Obsidiantre"
  },
  {
   "id": "dql-698",
   "nom": "Pour qui sonne le glagla",
   "niveau": 160,
   "objectif": "vaincre Obsidiantre"
  },
  {
   "id": "gl-594",
   "nom": "À la recherche de Dan Lavy",
   "niveau": 160,
   "objectif": "vaincre Gros Med"
  }
 ],
 "Excavation du Mansot Royal": [
  {
   "id": "dql-1660",
   "nom": "La bénédiction de Viti",
   "niveau": 140,
   "objectif": "vaincre Mansot Royal"
  },
  {
   "id": "gl-620",
   "nom": "Les joyeux de la couronne",
   "niveau": 140,
   "objectif": "vaincre Mansot Royal"
  },
  {
   "id": "dql-696",
   "nom": "Monarchie parlementaire",
   "niveau": 140,
   "objectif": "vaincre Mansot Royal"
  }
 ],
 "Épave du Grolandais violent": [
  {
   "id": "gl-621",
   "nom": "Fais dodo, t'auras du gâteau",
   "niveau": 150,
   "objectif": "vaincre Ben le Ripate"
  },
  {
   "id": "dql-1661",
   "nom": "La bénédiction de Thomahon",
   "niveau": 150,
   "objectif": "vaincre Ben le Ripate"
  },
  {
   "id": "dql-697",
   "nom": "Piwates des sept mers et demies",
   "niveau": 150,
   "objectif": "vaincre Ben le Ripate"
  }
 ],
 "Tanière Givrefoux": [
  {
   "id": "gl-623",
   "nom": "C'est frais, mais c'est pas grave",
   "niveau": 170,
   "objectif": "vaincre Tengu Givrefoux"
  },
  {
   "id": "dql-699",
   "nom": "Guerriers foux",
   "niveau": 170,
   "objectif": "vaincre Tengu Givrefoux"
  }
 ],
 "Antre du Korriandre": [
  {
   "id": "dql-1662",
   "nom": "La bénédiction de Foluk",
   "niveau": 170,
   "objectif": "vaincre Korriandre"
  },
  {
   "id": "dql-700",
   "nom": "Donjon sans dragon",
   "niveau": 180,
   "objectif": "vaincre Korriandre"
  },
  {
   "id": "gl-624",
   "nom": "Sans ma barbe, quelle barbe",
   "niveau": 180,
   "objectif": "vaincre Korriandre"
  },
  {
   "id": "alb-1719",
   "nom": "Gelé à pierre fendre",
   "niveau": 185,
   "objectif": "vaincre Korriandre"
  },
  {
   "id": "alk-1720",
   "nom": "Marqué d'une pierre blanche",
   "niveau": 185,
   "objectif": "vaincre Korriandre"
  }
 ],
 "Cavernes du Kolosso": [
  {
   "id": "dql-701",
   "nom": "C'est Rébro",
   "niveau": 190,
   "objectif": "vaincre Kolosso"
  },
  {
   "id": "gl-625",
   "nom": "Là-haut sur la montagne",
   "niveau": 190,
   "objectif": "vaincre Kolosso"
  }
 ],
 "Antichambre des Gloursons": [
  {
   "id": "dql-702",
   "nom": "Glourson et lumière",
   "niveau": 190,
   "objectif": "vaincre Glourséleste"
  },
  {
   "id": "gl-626",
   "nom": "Le pic qui glace",
   "niveau": 190,
   "objectif": "vaincre Glourséleste"
  }
 ],
 "Donjon du Comte Harebourg": [
  {
   "id": "gl-1327",
   "nom": "Le givre des révélations",
   "niveau": 200,
   "objectif": "vaincre Comte Harebourg"
  },
  {
   "id": "dql-630",
   "nom": "On recherche le Comte Harebourg",
   "niveau": 200,
   "objectif": "vaincre Comte Harebourg"
  },
  {
   "id": "gl-1310",
   "nom": "Un comte de faits divers",
   "niveau": 200,
   "objectif": "vaincre Comte Harebourg"
  }
 ],
 "Village Kanniboul": [
  {
   "id": "dql-673",
   "nom": "T'as les boules",
   "niveau": 55,
   "objectif": "vaincre Kanniboul Ebil"
  },
  {
   "id": "dql-904",
   "nom": "Un Kanniboul versé",
   "niveau": 60,
   "objectif": "vaincre Kanniboul Ebil",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dko-1668",
   "nom": "Un indigeste chez les indigènes",
   "niveau": 60,
   "objectif": "vaincre Kanniboul Ebil"
  }
 ],
 "Maison Fantôme": [
  {
   "id": "dql-897",
   "nom": "Donjon en lambeaux",
   "niveau": 40,
   "objectif": "vaincre Boostache",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-675",
   "nom": "Fantômes contre fantômes",
   "niveau": 40,
   "objectif": "vaincre Boostache"
  }
 ],
 "Château du Wa Wabbit": [
  {
   "id": "dql-905",
   "nom": "Le Wa Pythie",
   "niveau": 60,
   "objectif": "vaincre Wa Wabbit",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "cw-834",
   "nom": "Le château du Wa",
   "niveau": 60,
   "objectif": "vaincre Wa Wabbit"
  }
 ],
 "Château Ensablé": [
  {
   "id": "dql-896",
   "nom": "Donjon en mousse",
   "niveau": 20,
   "objectif": "vaincre Mob l'Éponge",
   "serie": "emma-tom-pouce"
  }
 ],
 "Grotte Hesque": [
  {
   "id": "sy-2443",
   "nom": "Après lui, le déluge",
   "niveau": 50,
   "objectif": "vaincre Corailleur Magistral"
  },
  {
   "id": "dql-899",
   "nom": "Donjon magistral",
   "niveau": 50,
   "objectif": "vaincre Corailleur Magistral",
   "serie": "emma-tom-pouce"
  }
 ],
 "Gelaxième Dimension": [
  {
   "id": "dql-906",
   "nom": "Gelée bien eue",
   "niveau": 60,
   "objectif": "vaincre Gelée Royale Bleuet, vaincre Gelée Royale Citron, vaincre Gelée Royale Fraise, vaincre Gelée Royale Menthe",
   "serie": "emma-tom-pouce"
  }
 ],
 "Cale de l'Arche d'Otomaï": [
  {
   "id": "dql-907",
   "nom": "Chéri fais-moi peur",
   "niveau": 70,
   "objectif": "vaincre Gourlo le Terrible",
   "serie": "emma-tom-pouce"
  }
 ],
 "Cimetière des Mastodontes": [
  {
   "id": "dql-909",
   "nom": "Le fossile et le marteau",
   "niveau": 80,
   "objectif": "vaincre Mantiscore",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-1805",
   "nom": "Le roi scorpion",
   "niveau": 80,
   "objectif": "vaincre Mantiscore"
  }
 ],
 "Arbre de Moon": [
  {
   "id": "dko-1670",
   "nom": "Rendez-vous avec la lune",
   "niveau": 100,
   "objectif": "vaincre Moon"
  },
  {
   "id": "dql-910",
   "nom": "Tour d'horizon",
   "niveau": 100,
   "objectif": "vaincre Moon",
   "serie": "emma-tom-pouce"
  }
 ],
 "Goulet du Rasboul": [
  {
   "id": "dql-911",
   "nom": "Tour à tour",
   "niveau": 110,
   "objectif": "vaincre Silf le Rasboul Majeur",
   "serie": "emma-tom-pouce"
  }
 ],
 "Antre du Blop Multicolore Royal": [
  {
   "id": "dql-912",
   "nom": "Tour de table",
   "niveau": 120,
   "objectif": "vaincre Blop Multicolore Royal",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-1524",
   "nom": "Il faut battre le lait quand il est chaud",
   "niveau": 130,
   "objectif": "vaincre Blop Multicolore Royal"
  }
 ],
 "Laboratoire du Tynril": [
  {
   "id": "dql-1660",
   "nom": "La bénédiction de Viti",
   "niveau": 140,
   "objectif": "vaincre Tynril Perfide"
  },
  {
   "id": "dql-913",
   "nom": "Tour de passe-passe",
   "niveau": 140,
   "objectif": "vaincre Tynril Perfide",
   "serie": "emma-tom-pouce"
  }
 ],
 "Repaire de Sphincter Cell": [
  {
   "id": "dql-1661",
   "nom": "La bénédiction de Thomahon",
   "niveau": 150,
   "objectif": "vaincre Sphincter Cell"
  },
  {
   "id": "dql-914",
   "nom": "Tour de rein",
   "niveau": 150,
   "objectif": "vaincre Sphincter Cell",
   "serie": "emma-tom-pouce"
  }
 ],
 "Canopée du Kimbo": [
  {
   "id": "dql-1661",
   "nom": "La bénédiction de Thomahon",
   "niveau": 150,
   "objectif": "vaincre Kimbo"
  },
  {
   "id": "dql-915",
   "nom": "Tour de main",
   "niveau": 160,
   "objectif": "vaincre Kimbo",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-2131",
   "nom": "Un pouvoir mérydique",
   "niveau": 200,
   "objectif": "vaincre Kimbo"
  }
 ],
 "Temple du Grand Ougah": [
  {
   "id": "dql-1866",
   "nom": "Appui sur le champignon",
   "niveau": 180,
   "objectif": "vaincre Ougah"
  },
  {
   "id": "dql-1784",
   "nom": "Les coûts du sort",
   "niveau": 180,
   "objectif": "vaincre Ougah"
  },
  {
   "id": "dql-916",
   "nom": "Tour de force",
   "niveau": 180,
   "objectif": "vaincre Ougah",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dql-2131",
   "nom": "Un pouvoir mérydique",
   "niveau": 200,
   "objectif": "vaincre Ougah"
  }
 ],
 "Aquadôme de Merkator": [
  {
   "id": "alem-1920",
   "nom": "Apprentissage : Gardien des Tortures",
   "niveau": 200,
   "objectif": "vaincre Merkator"
  },
  {
   "id": "ales-1917",
   "nom": "Apprentissage : Gardien du Savoir",
   "niveau": 200,
   "objectif": "vaincre Merkator"
  },
  {
   "id": "alcv-1916",
   "nom": "Apprentissage : Héros Légendaire",
   "niveau": 200,
   "objectif": "vaincre Merkator"
  },
  {
   "id": "alcs-1919",
   "nom": "Apprentissage : Héros de l'Apocalypse",
   "niveau": 200,
   "objectif": "vaincre Merkator"
  },
  {
   "id": "aloa-1918",
   "nom": "Apprentissage : Maître des Illusions",
   "niveau": 200,
   "objectif": "vaincre Merkator"
  },
  {
   "id": "aloas-1921",
   "nom": "Apprentissage : Maître des Ombres",
   "niveau": 200,
   "objectif": "vaincre Merkator"
  },
  {
   "id": "dql-1444",
   "nom": "Pollution, je dis non",
   "niveau": 200,
   "objectif": "vaincre Merkator"
  },
  {
   "id": "dql-917",
   "nom": "Tour nage",
   "niveau": 200,
   "objectif": "vaincre Merkator",
   "serie": "emma-tom-pouce"
  }
 ],
 "Antre du Kralamoure Géant": [
  {
   "id": "dql-918",
   "nom": "Le tour est joué",
   "niveau": 200,
   "objectif": "vaincre Kralamoure Géant",
   "serie": "emma-tom-pouce"
  }
 ],
 "Donjon de la mine de Sakaï": [
  {
   "id": "gl-919",
   "nom": "Au fion du trou",
   "niveau": 190,
   "objectif": "vaincre Grolloum"
  },
  {
   "id": "alk-1727",
   "nom": "La vengeance est un plat qui se mange froid",
   "niveau": 190,
   "objectif": "vaincre Grolloum"
  },
  {
   "id": "alb-1730",
   "nom": "Ça fait froid dans le dos",
   "niveau": 190,
   "objectif": "vaincre Grolloum"
  }
 ],
 "Laboratoire de Nileza": [
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "niveau": 200,
   "objectif": "vaincre Nileza"
  }
 ],
 "Transporteur de Sylargh": [
  {
   "id": "dql-1915",
   "nom": "Il est temps de mourir",
   "niveau": 200,
   "objectif": "vaincre Sylargh"
  },
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "niveau": 200,
   "objectif": "vaincre Sylargh"
  }
 ],
 "Salons privés de Klime": [
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "niveau": 200,
   "objectif": "vaincre Klime"
  }
 ],
 "Forgefroide de Missiz Frizz": [
  {
   "id": "alk-1898",
   "nom": "Sueurs froides",
   "niveau": 197,
   "objectif": "vaincre Missiz Frizz"
  },
  {
   "id": "alb-1897",
   "nom": "À glacer le sang",
   "niveau": 197,
   "objectif": "vaincre Missiz Frizz"
  },
  {
   "id": "gl-1309",
   "nom": "Il faut mettre un terme aux maîtres",
   "niveau": 200,
   "objectif": "vaincre Missiz Frizz"
  },
  {
   "id": "frq-1339",
   "nom": "La dernière carte",
   "niveau": 200,
   "objectif": "vaincre Missiz Frizz"
  }
 ],
 "Théâtre de Dramak": [
  {
   "id": "dql-1425",
   "nom": "Ainsi font les petites marionnettes",
   "niveau": 100,
   "objectif": "vaincre Maître des Pantins"
  },
  {
   "id": "dql-1432",
   "nom": "Tour de marionnettes",
   "niveau": 100,
   "objectif": "vaincre Maître des Pantins",
   "serie": "emma-tom-pouce"
  }
 ],
 "Terrier du Wa Wabbit": [
  {
   "id": "dql-1431",
   "nom": "Un défilé de Wobots",
   "niveau": 80,
   "objectif": "vaincre Wa Wobot",
   "serie": "emma-tom-pouce"
  }
 ],
 "Pyramide d'Ombre": [
  {
   "id": "dql-1461",
   "nom": "L'armée des ombres",
   "niveau": 190,
   "objectif": "vaincre Ombre"
  },
  {
   "id": "dql-1785",
   "nom": "Une ombre au tableau",
   "niveau": 190,
   "objectif": "vaincre Ombre"
  }
 ],
 "Grotte de Kanigroula": [
  {
   "id": "dql-1475",
   "nom": "Chachyène de vie",
   "niveau": 160,
   "objectif": "vaincre Kanigroula"
  },
  {
   "id": "dql-1662",
   "nom": "La bénédiction de Foluk",
   "niveau": 170,
   "objectif": "vaincre Kanigroula"
  }
 ],
 "Galerie du Phossile": [
  {
   "id": "dql-1500",
   "nom": "La pelle de la Phorrée",
   "niveau": 150,
   "objectif": "vaincre Phossile"
  },
  {
   "id": "dql-1662",
   "nom": "La bénédiction de Foluk",
   "niveau": 170,
   "objectif": "vaincre Phossile"
  }
 ],
 "Palais du roi Nidas": [
  {
   "id": "dql-1908",
   "nom": "Casse en Enutrosor",
   "niveau": 200,
   "objectif": "vaincre Roi Nidas"
  },
  {
   "id": "dql-1514",
   "nom": "Coiffeur de génie",
   "niveau": 200,
   "objectif": "vaincre Roi Nidas"
  }
 ],
 "Ring du Capitaine Ekarlatte": [
  {
   "id": "dql-1526",
   "nom": "L'anneau de Tot",
   "niveau": 130,
   "objectif": "vaincre Capitaine Ekarlatte"
  },
  {
   "id": "dql-1543",
   "nom": "Un ring pour les gouverner tous",
   "niveau": 130,
   "objectif": "vaincre Capitaine Ekarlatte"
  }
 ],
 "Cave du Toxoliath": [
  {
   "id": "dql-1547",
   "nom": "L'art me ment",
   "niveau": 180,
   "objectif": "vaincre Toxoliath"
  }
 ],
 "Trône de la Cour Sombre": [
  {
   "id": "dql-1552",
   "nom": "La cour des miracles",
   "niveau": 200,
   "objectif": "vaincre Reine des Voleurs"
  }
 ],
 "Ventre de la Baleine": [
  {
   "id": "frq-1568",
   "nom": "Qui dit baume",
   "niveau": 200,
   "objectif": "vaincre Protozorreur"
  }
 ],
 "Œil de Vortex": [
  {
   "id": "dql-1582",
   "nom": "La vérité est au fond du puits",
   "niveau": 200,
   "objectif": "vaincre Vortex"
  }
 ],
 "Horologium de XLII": [
  {
   "id": "dql-1586",
   "nom": "La Vie, l'Hormonde et le Reste",
   "niveau": 170,
   "objectif": "vaincre XLII"
  }
 ],
 "Mégalithe de Fraktale": [
  {
   "id": "dql-2035",
   "nom": "L'épée du rocher",
   "niveau": 120,
   "objectif": "vaincre Fraktale"
  },
  {
   "id": "dql-1593",
   "nom": "Prisonniers du temps",
   "niveau": 120,
   "objectif": "vaincre Fraktale"
  }
 ],
 "Crypte de Kardorim": [
  {
   "id": "ag-1638",
   "nom": "Cryptologie",
   "niveau": 10,
   "objectif": "vaincre Kardorim"
  }
 ],
 "Bateau du Chouque": [
  {
   "id": "dql-2507",
   "nom": "C'est du bateau",
   "niveau": 90,
   "objectif": "vaincre Le Chouque",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "dko-1669",
   "nom": "Squelettes et amulette",
   "niveau": 90,
   "objectif": "vaincre Le Chouque"
  }
 ],
 "Défi du Chalœil": [
  {
   "id": "dql-1702",
   "nom": "De l'autre côté du Chalœil",
   "niveau": 200,
   "objectif": "vaincre Chalœil"
  },
  {
   "id": "dql-1905",
   "nom": "Le dragon blanc",
   "niveau": 200,
   "objectif": "vaincre Chalœil"
  }
 ],
 "Miausolée du Pounicheur": [
  {
   "id": "dql-1705",
   "nom": "Testé et approuvé",
   "niveau": 110,
   "objectif": "vaincre Pounicheur"
  }
 ],
 "Plateau de Ush": [
  {
   "id": "dql-1710",
   "nom": "En rouge et noir",
   "niveau": 160,
   "objectif": "vaincre Ush Galesh"
  }
 ],
 "Vaisseau du Capitaine Meno": [
  {
   "id": "dql-1735",
   "nom": "Piège de crystal",
   "niveau": 200,
   "objectif": "vaincre Capitaine Meno"
  }
 ],
 "Palais de Dantinéa": [
  {
   "id": "dql-1792",
   "nom": "Mississitudes",
   "niveau": 200,
   "objectif": "vaincre Dantinéa"
  },
  {
   "id": "dql-1737",
   "nom": "Reine de beauté",
   "niveau": 200,
   "objectif": "vaincre Dantinéa"
  }
 ],
 "Temple de Koutoulou": [
  {
   "id": "dql-1759",
   "nom": "De mal en impie",
   "niveau": 200,
   "objectif": "vaincre Larve de Koutoulou"
  }
 ],
 "Caverne d'El Piko": [
  {
   "id": "dql-1802",
   "nom": "L'Étoile de la Mer",
   "niveau": 130,
   "objectif": "vaincre El Piko"
  },
  {
   "id": "dql-1807",
   "nom": "Le monde entier est un cactus",
   "niveau": 130,
   "objectif": "vaincre El Piko"
  }
 ],
 "Boyau du Père Ver": [
  {
   "id": "dql-1831",
   "nom": "Le mystère des vers",
   "niveau": 170,
   "objectif": "vaincre Père Ver"
  }
 ],
 "Chambre de Tal Kasha": [
  {
   "id": "dql-1833",
   "nom": "Le secret de la pyramide",
   "niveau": 200,
   "objectif": "vaincre Tal Kasha"
  },
  {
   "id": "dql-1909",
   "nom": "Nordalie",
   "niveau": 200,
   "objectif": "vaincre Tal Kasha"
  }
 ],
 "Camp du Comte Razof": [
  {
   "id": "dql-1854",
   "nom": "La valse des manuels",
   "niveau": 190,
   "objectif": "vaincre Comte Razof"
  }
 ],
 "Manoir des Katrepat": [
  {
   "id": "dql-1875",
   "nom": "Entretien avec une Vampyre",
   "niveau": 200,
   "objectif": "vaincre Anerice la Shushess"
  }
 ],
 "Chapiteau des Magik Riktus": [
  {
   "id": "dql-1881",
   "nom": "La grande parade",
   "niveau": 90,
   "objectif": "vaincre Choudini"
  },
  {
   "id": "dql-2508",
   "nom": "Le spectacle vivant",
   "niveau": 90,
   "objectif": "vaincre Choudini",
   "serie": "emma-tom-pouce"
  }
 ],
 "Belvédère d'Ilyzaelle": [
  {
   "id": "alb-1901",
   "nom": "Fée d'hiver",
   "niveau": 199,
   "objectif": "vaincre Ilyzaelle"
  },
  {
   "id": "alk-1902",
   "nom": "Lettre à Ilyz",
   "niveau": 199,
   "objectif": "vaincre Ilyzaelle"
  }
 ],
 "Tour de Solar": [
  {
   "id": "dql-1954",
   "nom": "Les cœurs livides",
   "niveau": 200,
   "objectif": "vaincre Solar"
  }
 ],
 "Tour de Bethel": [
  {
   "id": "dql-1954",
   "nom": "Les cœurs livides",
   "niveau": 200,
   "objectif": "vaincre Bethel Akarna"
  }
 ],
 "Cache de Kankreblath": [
  {
   "id": "dql-2003",
   "nom": "Donjon rikiki",
   "niveau": 40,
   "objectif": "vaincre Kankreblath",
   "serie": "emma-tom-pouce"
  }
 ],
 "Grange du Tournesol Affamé": [
  {
   "id": "dql-2005",
   "nom": "Le tour du monde",
   "niveau": 20,
   "objectif": "vaincre Tournesol Affamé",
   "serie": "tour-du-monde"
  }
 ],
 "Cour du Bouftou Royal": [
  {
   "id": "dql-2006",
   "nom": "Revenons à nos bouftons",
   "niveau": 30,
   "objectif": "vaincre Bouftou Royal",
   "serie": "tour-du-monde"
  }
 ],
 "Fonderie des Waddicts": [
  {
   "id": "dql-2068",
   "nom": "Les aléas de la Chocolaterie",
   "niveau": 60,
   "objectif": "vaincre Mawabouaino"
  }
 ],
 "Croquanterie": [
  {
   "id": "dql-2068",
   "nom": "Les aléas de la Chocolaterie",
   "niveau": 60,
   "objectif": "vaincre Croqueleur"
  }
 ],
 "Temple du dieu Kao": [
  {
   "id": "dql-2068",
   "nom": "Les aléas de la Chocolaterie",
   "niveau": 60,
   "objectif": "vaincre Prêtresse de Kao"
  }
 ],
 "Sanctuaire de Torkélonia": [
  {
   "id": "dql-2087",
   "nom": "Le sens du sacrifice",
   "niveau": 200,
   "objectif": "vaincre Torkélonia"
  }
 ],
 "Trône de Sang": [
  {
   "id": "dql-2111",
   "nom": "Le jour le plus long",
   "niveau": 200,
   "objectif": "vaincre Guerre"
  }
 ],
 "Tempête de l'Eliocalypse": [
  {
   "id": "dql-2119",
   "nom": "Avis de tempête",
   "niveau": 200,
   "objectif": "vaincre Misère"
  },
  {
   "id": "dql-2113",
   "nom": "Briser ses chaines",
   "niveau": 200,
   "objectif": "vaincre Servitude"
  },
  {
   "id": "dql-2111",
   "nom": "Le jour le plus long",
   "niveau": 200,
   "objectif": "vaincre Guerre"
  },
  {
   "id": "dql-2132",
   "nom": "Mort et renouveau",
   "niveau": 200,
   "objectif": "vaincre Corruption"
  }
 ],
 "Fers de la Tyrannie": [
  {
   "id": "dql-2113",
   "nom": "Briser ses chaines",
   "niveau": 200,
   "objectif": "vaincre Servitude"
  }
 ],
 "Sentence de la Balance": [
  {
   "id": "dql-2119",
   "nom": "Avis de tempête",
   "niveau": 200,
   "objectif": "vaincre Misère"
  }
 ],
 "Arbre de Mort": [
  {
   "id": "dql-2132",
   "nom": "Mort et renouveau",
   "niveau": 200,
   "objectif": "vaincre Corruption"
  }
 ],
 "Dojo du Vent": [
  {
   "id": "dql-2155",
   "nom": "L'équilibre des forces",
   "niveau": 140,
   "objectif": "vaincre Hanshi"
  }
 ],
 "Tombe du Shogun Tofugawa": [
  {
   "id": "dg-2179",
   "nom": "Maudite disparition",
   "niveau": 160,
   "objectif": "vaincre Shogun Tofugawa"
  }
 ],
 "Demeure des Esprits": [
  {
   "id": "dg-2180",
   "nom": "Requiem pour un Yokai",
   "niveau": 170,
   "objectif": "vaincre Koumiho"
  }
 ],
 "Mémoire d'Orukam": [
  {
   "id": "ta-2201",
   "nom": "Deux souffles, une inspiration",
   "niveau": 200,
   "objectif": "vaincre Roi Imagami"
  }
 ],
 "Souvenir d'Imagiro": [
  {
   "id": "ta-2201",
   "nom": "Deux souffles, une inspiration",
   "niveau": 200,
   "objectif": "vaincre Reine Amirukam"
  }
 ],
 "Rituel de Kabahal": [
  {
   "id": "dql-2417",
   "nom": "Un vrai petit garçon",
   "niveau": 200,
   "objectif": "vaincre Kabahal"
  }
 ],
 "Akadémie des Gobs": [
  {
   "id": "dql-2455",
   "nom": "De joyeux petits arbres",
   "niveau": 40,
   "objectif": "vaincre Directeur Grunob"
  },
  {
   "id": "dql-2504",
   "nom": "Donjon éducatif",
   "niveau": 40,
   "objectif": "vaincre Directeur Grunob",
   "serie": "emma-tom-pouce"
  },
  {
   "id": "sy-2442",
   "nom": "La raison du plus fort",
   "niveau": 40,
   "objectif": "vaincre Directeur Grunob"
  }
 ],
 "Bambusaie de Damadrya": [
  {
   "id": "sy-2445",
   "nom": "Rester planté là",
   "niveau": 110,
   "objectif": "vaincre Damadrya"
  }
 ],
 "Tertre du long sommeil": [
  {
   "id": "dql-2451",
   "nom": "Arrête-la si tu peux",
   "niveau": 150,
   "objectif": "vaincre Hell Mina"
  }
 ],
 "Bastion des Marteaux-Aigris": [
  {
   "id": "dql-2472",
   "nom": "L'île maudite",
   "niveau": 190,
   "objectif": "vaincre Barbéryl Clochecuivre"
  }
 ],
 "Chambre des maléfices": [
  {
   "id": "dql-2475",
   "nom": "La sorcière exilée",
   "niveau": 200,
   "objectif": "vaincre Belladone"
  }
 ],
 "Épreuve de Draegnerys": [
  {
   "id": "dql-2506",
   "nom": "C'est radical ici",
   "niveau": 70,
   "objectif": "vaincre Draegnerys",
   "serie": "emma-tom-pouce"
  }
 ],
 "Repaire du Kharnozor": [
  {
   "id": "dql-2510",
   "nom": "Tour d'honneur",
   "niveau": 100,
   "objectif": "vaincre Kharnozor",
   "serie": "emma-tom-pouce"
  }
 ],
 "Poste de contrôle du Supervizœuf": [
  {
   "id": "dql-2522",
   "nom": "Têtes de ponte",
   "niveau": 170,
   "objectif": "vaincre Supervizœuf"
  }
 ],
 "Breuil du Vénérable": [
  {
   "id": "dql-2531",
   "nom": "Devoir de réserve",
   "niveau": 200,
   "objectif": "vaincre Vénérable Endormi"
  }
 ]
};
