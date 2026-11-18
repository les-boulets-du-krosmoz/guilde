# Inventaire des combats tactiques

Document de travail (pas affiché sur le site). Les données du jeu ne marquent pas les combats tactiques : un combat
tactique y est un combat de quête comme un autre. Chacun des combats des quêtes du site a donc été classé selon son adversaire,
d'après les données du jeu 3.6.12.16 :

- **Confirmés** (10) : déjà marqués « Tactique solo » dans src/data/dofus.ts.
- **À vérifier, monstre de quête** (100) : l'adversaire n'existe que pour une quête. C'est le cas de tous les combats
  tactiques connus, mais aussi de combats ordinaires : c'est un filtre, pas une preuve.
- **À vérifier, adversaire non reconnu** (24) : nom écrit à la main dans dofus.ts, à classer à la lecture.
- **Écartés** (111) : monstres qu'on croise en zone, non listés ici.

Pour trancher : cocher la colonne « Tactique ? » (oui / non), puis marquer les « oui » avec tactique(...) dans dofus.ts
et écrire leur fiche dans src/data/combatsTactiques.ts, avec `transformation` si le personnage est imposé.
« Affiché » = l'étiquette que voient les membres aujourd'hui.

## Confirmés

### Émeraude (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| em-8 · Ultime réminiscence | Dark Vlad | Tactique solo | oui |

### Pourpre (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| po-8 · Une âme en peine | Minogolem séculaire | Tactique solo | oui |

### Turquoise (2)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| tu-2 · Extinction des feux | Esprit de Bolgrot | Tactique solo | oui |
| tu-10 · Une âme en colère | Furye | Tactique solo | oui |

### Ivoire (2)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| iv-6 · Le bonheur est dans le spray | Rainikrone | Tactique solo | oui |
| iv-10 · Il est temps de mourir | Hyrkul | Tactique solo | oui |

### Ébène (2)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| eb-6 · Une douloureuse séparation | Crocoburio | Tactique solo | oui |
| eb-10 · Un nouvel héritier | Grougalorasalar | Tactique solo | oui |

### Domakuro (2)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| dk-2 · À la croisée des mondes | Yokai de la bibliothèque | Tactique solo | oui |
| dk-2 · À la croisée des mondes | Maître Kwatimbe | Tactique solo | oui |

## À vérifier : monstre de quête

### Émeraude (8)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| em-1 · Retourner voir le Dark Vlad, toujours sans mourir | Hell Mina Ensorcelée | Solo obligatoire |  |
| em-2 · Qui botte le cul des Culs Bottés ? | Cordonnier Sombre, Boulanger Sombre, Mineur Sombre | Solo obligatoire |  |
| em-3 · Le voleur d'âmes | Esprit de Tonam Etamwa | Combat de groupe |  |
| em-4 · L'amour perdu de Nabur | Chef des Pillards, Pillarde Cruelle, Pillard Irascible | Solo obligatoire |  |
| em-5 · Naissance d'une vocation | Profana Tryss, Nikono Klaste | Solo obligatoire |  |
| em-6 · Les bandits de Cania | Nomekop le Crapoteur, Eratz le Revendicateur, Edasse le Trouble Fête | Combat de groupe |  |
| em-7 · Draconanthropie | Rasamoune le Vert | Combat de groupe |  |
| em-8 · Ultime réminiscence | Bandit Chafer | Combat de groupe |  |

### Pourpre (5)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| po-1 · Le livre des Taures | Roublards Riko et Chypel | Combat de groupe |  |
| po-4 · Regrets d'éternailes | Araknesprit | Combat de groupe |  |
| po-5 · L'anneau de Tot | Vensitard Smisse, Sramouraï, Kartouche | Combat |  |
| po-7 · Le trésor de Totankama | Momie Nova (chasse légendaire) | Combat |  |
| po-9 · Le pouvoir derrière le trône | Soun Rinos (avec Gavroch) | Solo obligatoire |  |

### Turquoise (6)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| tu-1 · Plongeon et dragon | Gardienne du Sanctuaire | Combat de groupe |  |
| tu-2 · Extinction des feux | Ombre Vengeresse | Combat de groupe |  |
| tu-3 · On dirait le Sud | Ombres Vengeresses | Combat |  |
| tu-3 · On dirait le Sud | Ombre Vengeresse et Ombre Ailée | Combat |  |
| tu-7 · Autel du Nord | Robot Expérimental (avec l'Automate Brigandin) | Solo obligatoire |  |
| tu-10 · Une âme en colère | Esprits Kelpe, Verak, Goémus, Cyanog, Norie | Combat |  |

### Ivoire (9)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| iv-1 · Le Dragon Blanc | Miliciens de Brâkmar (3 vagues) | Combat |  |
| iv-3 · Le Pays gris | Mane Curieux (survivre 5 tours) | Combat |  |
| iv-4 · Casse en Enutrosor | Serviteurs d'Hyrkul | Combat de groupe |  |
| iv-4 · Casse en Enutrosor | Coffret précieux | Combat de groupe |  |
| iv-5 · Le guerrier noir | Bwork Bibliophile | Combat de groupe |  |
| iv-6 · Le bonheur est dans le spray | Chazrael | Combat de groupe |  |
| iv-6 · Le bonheur est dans le spray | Colère d'Ougah | Combat de groupe |  |
| iv-8 · Le mort dans l'âme | Abraknyde Sinistre | Combat |  |
| iv-10 · Il est temps de mourir | Vieux Fauchalak | Combat de groupe |  |

### Ébène (17)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| eb-1 · L'épée du rocher | Craqueleurs de Verre | Combat |  |
| eb-1 · L'épée du rocher | Gardienne de l'épée | Combat |  |
| eb-2 · Le forgeur de légende | Feu de forge volcanique | Combat |  |
| eb-2 · Le forgeur de légende | Sourcier Koalak | Combat |  |
| eb-2 · Le forgeur de légende | Gardiens de l'épée | Combat |  |
| eb-4 · À la recherche de Crocoburio | Bruce Epett | Combat |  |
| eb-5 · Le creuset de Mériana | Fuite d'eau | Combat |  |
| eb-5 · Le creuset de Mériana | 3 Chafers Millénaires | Combat |  |
| eb-6 · Une douloureuse séparation | Vapeurs Délétères | Combat |  |
| eb-6 · Une douloureuse séparation | Miliciens corrompus (avec Joris Jurgen) | Combat |  |
| eb-7 · Le dragon noir | Moskitos Géants et Gloutovores Affamés | Combat |  |
| eb-7 · Le dragon noir | Guerriers Crocodailles | Combat |  |
| eb-8 · La vengeance du dernier empereur | Shushen, Shushkebab, Shushuaïa | Combat |  |
| eb-8 · La vengeance du dernier empereur | Bulak | Solo obligatoire |  |
| eb-9 · L'oeuf de Crocabulia | Chasseuses de Poison | Combat |  |
| eb-10 · Un nouvel héritier | Crocobur | Combat |  |
| eb-10 · Un nouvel héritier | Gloots Marécageux (4 vagues) | Combat |  |

### Veilleurs (3)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| ve-3 · Orichomania | Berserkoffre Affectueux | Combat de groupe |  |
| ve-10 · Le disparu de Sufokia | Marie Ride | Combat de groupe |  |
| ve-14 · C'est dans la boîte | Dévoreur de livres | Combat de groupe |  |

### Domakuro (6)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| dk-3 · Sous le bois de sa colère | Négociant amaknéen [18,-29] | Combat de groupe |  |
| dk-4 · Au nom de l'Art | Tanuki Durtouki [26,-27] : le sortir de son glyphe | Solo obligatoire |  |
| dk-5 · La jetée des enfants perdus | Chasseur enutrof [20,-24] | Combat de groupe |  |
| dk-7 · L'équilibre des forces | Gardes Kozaru [21,-35] | Combat de groupe |  |
| dk-8 · Sang d'encre | Assassins Pandikazes [19,-34], avec Ikunochi | Solo obligatoire |  |
| dk-8 · Sang d'encre | Maître Pandore : ignorer les invocations, Ikunochi s'en charge | Solo obligatoire |  |

### Dorigami (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| dg-2180 · Requiem pour un Yokai | Péki Garou | Combat de groupe |  |

### Cawotte (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| cw-841 · Expédition culinaire | 4 × Wabbit Squelette agressif | Combat de groupe |  |

### Argenté (8)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| ag-1959 · On marche sur des œufs | Nowa | Combat de groupe |  |
| ag-718 · Attention à la Bête ! | Créature d'Otomaï | Combat de groupe |  |
| ag-1998 · Qui sème le vent récolte l'Artempeth | Rose Artempeth | Combat de groupe |  |
| ag-2007 · L'invasion des profanateurs de sépultures | Gargrouille en colère | Combat de groupe |  |
| ag-2007 · L'invasion des profanateurs de sépultures | Garglyphe en colère | Combat de groupe |  |
| ag-2007 · L'invasion des profanateurs de sépultures | La Ouassingue en colère | Combat de groupe |  |
| ag-2007 · L'invasion des profanateurs de sépultures | Selim Llenneb | Combat de groupe |  |
| ag-2008 · Le repos est dans le champ | Klaüs Konbah | Combat de groupe |  |

### Tacheté (2)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| ta-2200 · Main dans la main | Sumowa | Combat de groupe |  |
| ta-2200 · Main dans la main | Shinobi novice | Combat de groupe |  |

### Dokoko (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| dko-1669 · Squelettes et amulette | L'Égorgeur | Combat de groupe |  |

### Glaces (11)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| gl-592 · Il préfère la mort en mer | Esprit rebelle | Combat de groupe |  |
| gl-595 · À qui profite le boufmouth | 3 × Boufmouth dressé | Combat de groupe |  |
| gl-598 · Maya la belle | 3 × Gloursaya énervé | Combat de groupe |  |
| gl-1317 · Malédiction ! | Gardien du Destin | Combat de groupe |  |
| gl-1318 · Mission Solution | S.L.O.P. | Combat de groupe |  |
| gl-1318 · Mission Solution | 2 × Tueur Tromatique Frigorifié | Combat de groupe |  |
| gl-1318 · Mission Solution | Epouvantail de Frostiz Transgénisé | Combat de groupe |  |
| gl-1318 · Mission Solution | Djaulien Perdu | Combat de groupe |  |
| gl-1333 · La machine à démonter le temps | Habitant de Frigost | Combat de groupe |  |
| gl-1333 · La machine à démonter le temps | Ouvrière du Comte | Combat de groupe |  |
| gl-1333 · La machine à démonter le temps | S. Bill Sberg | Combat de groupe |  |

### Sylvestre (2)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| sy-2194 · Protection divine | Dopeul Maléfique | Combat de groupe |  |
| sy-1621 · L'art de la langue de bois | La Comploteuse | Combat de groupe |  |

### Quêtes de Frigost (19)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| frq-542 · Pauvre Kiki | 8 × Rat Bougri délavé | Combat de groupe |  |
| frq-634 · Groméo et Ginette | Kanimodo | Combat de groupe |  |
| frq-603 · Monstre aux plantes | Kordis | Combat de groupe |  |
| frq-677 · Un remède à tous les maux | La Créature | Combat de groupe |  |
| frq-1286 · Lumière sur l'ombre | Craqueleur de Glace | Combat de groupe |  |
| frq-1287 · Qu'est-ce qu'on a fait des tuyaux ? | Dolores Kimo | Combat de groupe |  |
| frq-1288 · Lâcher les gaz | 2 × Créature de gaz | Combat de groupe |  |
| frq-608 · Inferno | Pougnette enragée | Combat de groupe |  |
| frq-609 · Tous pour un | Ondine démoniaque | Combat de groupe |  |
| frq-1319 · Rappel à la vie | Biofiente | Combat de groupe |  |
| frq-1320 · Moteur à explosion | 3 × Ravisseur Kanimate | Combat de groupe |  |
| frq-1322 · Mutinerie chez les Armutins | Frimaraudeur | Combat de groupe |  |
| frq-1323 · Au-delà du mur | Stalak errant | Combat de groupe |  |
| frq-1324 · Crise d'ex-Emma | Emma Sculai | Combat de groupe |  |
| frq-1335 · Le tour de guet | Messager Grippé | Combat de groupe |  |
| frq-2016 · Le gang des postiches | Aventurière démasquée | Combat de groupe |  |
| frq-2016 · Le gang des postiches | Aventurier pris sur le fait | Combat de groupe |  |
| frq-2016 · Le gang des postiches | Aventurier repéré | Combat de groupe |  |
| frq-2019 · Les ennemis de mes ennemis sont mes ennemis | Ratse | Combat de groupe |  |

### Brâkmar (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| alk-381 · La mise à mort | Écureuil bagarreur | Combat de groupe |  |

## À vérifier : adversaire non reconnu

### Émeraude (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| em-8 · Ultime réminiscence | Les Trois Crânes | Combat de groupe |  |

### Pourpre (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| po-3 · Il faut battre le lait quand il est chaud | Roublards (avec Gavroch) | Solo obligatoire |  |

### Turquoise (3)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| tu-2 · Extinction des feux | Obscuranti | Combat |  |
| tu-5 · La méchante sorcière de l'Est | Tous les monstres du Berceau d'Alma, 7 fois | Combat de groupe |  |
| tu-9 · Il était une foi dans l'Ouest | Craqueleur de la Baie de Cania | Combat de groupe |  |

### Ocre (1)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| oc-1 · L'éternelle moisson | Tous les archimonstres et boss de donjon à capturer pour Otomaï | Combat |  |

### Ivoire (3)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| iv-6 · Le bonheur est dans le spray | Chasseurs de Likrone | Combat de groupe |  |
| iv-6 · Le bonheur est dans le spray | Compère Tifoux | Combat de groupe |  |
| iv-9 · Nordalie | Hyrkul le Tendancieux (avec deux Centorors) | Combat |  |

### Ébène (3)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| eb-4 · À la recherche de Crocoburio | Monstres de la Forêt des Pins Perdus | Combat |  |
| eb-4 · À la recherche de Crocoburio | Boîboites à outils | Combat de groupe |  |
| eb-9 · L'oeuf de Crocabulia | Clan Smisse | Combat |  |

### Domakuro (12)

| Étape | Adversaire | Affiché | Tactique ? |
|---|---|---|---|
| dk-1 · Le réveil de Pandala | Chaque Sidoa de la Carrière d'Astrub, 5 fois (Martoa, Sherpoa, Douzdoa, Pikdoa) | Combat de groupe |  |
| dk-2 · À la croisée des mondes | 3 Pandissidans, sous la banque en [20,-30] | Solo obligatoire |  |
| dk-3 · Sous le bois de sa colère | Combat à vagues de Bamboutos, devant la Bambusaie en [26,-30] | Combat de groupe |  |
| dk-3 · Sous le bois de sa colère | Fruits de l'arbre Goroku [26,-32] | Combat de groupe |  |
| dk-4 · Au nom de l'Art | Kaskouïs en [27,-28] : les sortir de leur glyphe pour les rendre vulnérables | Combat de groupe |  |
| dk-4 · Au nom de l'Art | Kaskouïs en [25,-24] | Combat de groupe |  |
| dk-5 · La jetée des enfants perdus | Kwapas autour de Yuminh [18,-25] | Combat de groupe |  |
| dk-5 · La jetée des enfants perdus | Kwapas devant la Vallée [22,-24], avec Kwatalo | Solo obligatoire |  |
| dk-6 · Le festival de la lanterne | Feux follets, à la Lanterne primordiale [17,-32] | Combat de groupe |  |
| dk-6 · Le festival de la lanterne | Firefoux, pour protéger le Qilin de papier [18,-34] : il ne doit pas mourir | Solo obligatoire |  |
| dk-7 · L'équilibre des forces | 2 Poseurs de bombe en [19,-32] | Solo obligatoire |  |
| dk-7 · L'équilibre des forces | 2 Poseurs de bombe en [19,-33] | Solo obligatoire |  |
