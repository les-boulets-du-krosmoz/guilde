# Contexte du projet (à lire en début de session)

Site de la guilde Dofus « Les boulets du Krosmoz » : React + TypeScript + Vite, Supabase, Vercel (guilde-nine.vercel.app),
dépôt les-boulets-du-krosmoz/guilde. Site public, connexion réservée aux membres de la guilde.

## Règles et décisions
- Textes en français, dans nos mots. Jamais de reprise du contenu de Dofus pour les Noobs (leurs guides interdisent toute
  reproduction ou modification) : on peut s'en servir pour vérifier des faits et mettre un lien « Guide détaillé ».
- Sources de mécaniques : JeuxOnline, Gamosaurus, Millenium, et surtout les membres de la guilde. next-stage.fr est jugé
  peu fiable (guides apparemment générés) : ne plus l'utiliser.
- Icônes redessinées en vectoriel plutôt qu'agrandies (kamas, Donjon/Quête). Images du jeu hébergées par le site.
- Quêtes d'alignement numérotées comme en jeu ; l'ordre de l'Œil de Brâkmar s'appelle « Œil Putride ».
- Seul l'organisateur modifie une recherche de groupe ; les officiers peuvent la supprimer.
- Ressources de quêtes : plus affichées (DPLN plus fiable). Les données res() et la table ressources_cochees sont
  conservées mais inutilisées ; ne pas supprimer la table sans accord.
- Combats tactiques : pas de notion de classe (personnage généralement transformé). Le champ `transformation` le dit
  combat par combat. Fiches dans src/data/combatsTactiques.ts, ouvertes par le bouton « Strat » de l'étiquette
  « Tactique solo » (rien n'est ajouté dans l'étape quand il n'y a pas de fiche).
- Statistiques de visite (migration 027, src/lib/visites.ts, page /statistiques réservée aux officiers) : table visites
  (jour, cible, vues), aucun identifiant de membre, validé avec la guilde. Écriture uniquement par la fonction
  compter_visite (+1), lecture par statistiques_visites (officiers). Cibles : page:/chemin?onglet|cat|dofus (identifiants
  de personnage, métier, ordre retirés), boss:<slug>, strat:<quête>:<adversaire>, outil:memoire (à la première marque).
  Une ouverture par cible, par jour et par chargement du site ; rien n'est compté en local (npm run dev).
  Case « Compter mes visites » (page Statistiques) = colonne membres.hors_statistiques, vérifiée par compter_visite
  (et par le site, qui n'envoie alors rien). Valable sur tous les appareils ; le passé compté ne se retire pas.
  Renommer un slug ou un adversaire coupe son historique (l'ancienne clé s'affiche brute dans la page).
- Archive livrée en deux parties : le site (léger) et public/icones/objets (images d'équipements, à part).

## Déploiement
- Version en préparation : 1.7.0 (changelog « À publier » à jour). Migrations 021 (relancer), 023, 024, 025, 026, 027 à exécuter.
- Fonctions Supabase : metamob, brocante-interet (noms exacts, sans extension), annoncer-sortie, synchro-membres, verifier-guilde.
- Secrets : METAMOB_API_KEY, DISCORD_WEBHOOK_BROCANTE (facultatif), SUPABASE_DB_URL et SAUVEGARDE_PHRASE (GitHub, sauvegarde).

## Chantiers en cours
- Guides de boss (src/data/guidesBoss.ts, page Donjons > Guides) : 30 fiches rédigées, à relire. Points ouverts en
  « avertissements » dans chaque fiche (Reine des Voleurs : bonbombes ; Meno : délock ; Ilyzaelle : emprise ; Dazak :
  résistances ; Protozorreur : nombre de tours ; Sylargh : second kill ; Ombre : sort Paranoïa non décrit ; les 7 boss
  THL ajoutés en novembre reposent sur des guides d'avant Dofus 3, mécaniques chiffrées à confirmer en jeu).
- Fiches Frigost du 18 novembre (tengu-givrefoux, korriandre, glourseleste, grolloum) : guides d'avant Dofus 3 croisés
  avec les données 3.7 (sorts, portées, durées). Korriandre refait en 3.6 (invulnérable, délock par la Sporakne sur un
  glyphe). Ouverts : Tengu (« même tour » à un ou deux personnages, 4 tours de vulnérabilité lus dans les données, ce qui
  fait venir la Fuji), Glourséleste (infliger des dommages de poussée tue-t-il aussi ?), Grolloum (chiffres des données).
  Corrigé d'après un joueur : Yokaï à pousser ou attirer (déjà en diagonale ne compte pas), Yokaï et Yomi transformés
  quand ils ont l'état, délock au tour du Tengu, garder ses invocations et tuer ceux de la salle ; Fongeur sans danger à
  2 cases ou moins (frappe toute la carte au-delà) ; explosion du Gobus mortelle.
- Textes du jeu : depuis la 3.7, les données décrivent la mécanique de beaucoup de boss (description d'un sort,
  ex. Cohobation de Nileza, Chambranle de Sylargh, Congère de Missiz Frizz). Fiches revues avec ces textes le
  18 novembre : Nileza, Sylargh, Missiz Frizz, Merkator, Capitaine Meno, Dantinéa. Dans ces textes, « alliés » =
  vos personnages, « ennemis » = les monstres. Encore à comparer (texte disponible) : Klime, Comte Harebourg, Tal
  Kasha, Vortex, Solar, Ilyzaelle, Reine des Voleurs, Bethel, Protozorreur, Chalœil, Anerice, Larve de Koutoulou.
  Point ouvert Meno : « augmente les dommages finaux des alliés » (vos personnages ou ses monstres ?).
- Tête de mort des guides de boss : écrire « {os} » juste après le nom du monstre qui peut tuer d'un coup
  (src/components/TeteDeMort.tsx). Posée sur Tengu, Fuji, Glourmand, Glourséleste, Gobus, Kimbo, Solar, Nileza, Dantinéa, Royalmouth, Pougnette,
  Belladone, Déchireuse, Torkélonia.
- 18 novembre, suite : Royalmouth, Mansot Royal, Obsidiantre (d'après un joueur), les 4 Cavaliers + Tempête de
  l'Eliocalypse (fiche du jeu de Guerre affichée pour la Tempête), Kabahal, Belladone, Déchireuse, Vénérable Endormi,
  Éternel Conflit, Torkélonia, Barbéryl. Sources souvent d'avant Dofus 3 : avertissements dans chaque fiche.
- Kolosso refait le 19 novembre d'après un joueur (accès par les 4 reliques, mort de Xa qui renforce tous les monstres,
  Croleur vers 1 600 en critique invisible, invocations de Xa qui meurent avec lui) et les données 3.7 (lourd, soins et
  insoignable, résurrection par Xa, bonus du Kolosso à la mort de Xa). Le 19 : reliques confirmées, Croleur dangereux
  surtout après la mort de Xa, effet de Xa (+100 dommages par coup reçu, soigne les joueurs autour), méthode du Premier
  (achever Xa puis le Croleur avant son tour). Ouverts : délock à distance, chiffre du renfort, soin de l'effet de Xa et
  succès Spécial. Bonus du Kolosso (1 PM, 200 de puissance) à la mort de Xa : confirmé.
- Guides de boss, champs ajoutés le 19 novembre : zone (obligatoire, zone de jeu de l'entrée d'après subareas/areas,
  ex. « Frigost », « Osavora ») et nom (facultatif, nom affiché quand ce n'est pas celui du monstre de la fiche du jeu :
  « Les quatre Cavaliers »). Regroupement de la liste dans GROUPES (src/pages/Donjons.tsx) : une zone absente va dans
  « Autres zones ». Icônes des caractéristiques : public/icones/stats (3 PV, 4 PA, 5 PM, 8 à 11 Terre/Feu/Eau/Air) ;
  pas d'icône Neutre, remplacée par une pastille grise.
- Champ encart (facultatif) des guides : tableau à deux colonnes, étapes, schéma (public/guides/*.svg) et remarques,
  affiché sous les mécaniques. Premier usage : Comte Harebourg (schéma harebourg-confusion.svg, vue isométrique).
- Comte Harebourg refait le 19 novembre d'après un joueur et le texte 3.7 du sort Carillon (états Alternance / Mi-temps,
  décor qui tue l'équipe, glyphe de début de tour, invocation qui explose en cercle de 3). Paliers de confusion d'après
  le sort Comtoise (3646) : 90+ ¼ horaire, 75-89 ¼ anti-horaire, 60-74 et 45-59 ½ tour, 30-44 ¾ horaire, <30 ¾
  anti-horaire ; Pendultimatum (3643) : +¼ horaire par coup au corps à corps. Confirmé par le joueur : décor, glyphe (croix
  de 3 cases autour du Comte, posé à son tour), +¼ au corps à corps, +100 dommages. Délock : le 1er allié après le Comte
  se place en symétrie, le 2e frappe.
- Statut des guides de boss : « relu » (validé par un joueur qui a fait le boss, étiquette « ✓ Guide relu », plus de
  bandeau « à relire »), « brouillon », « a-rediger ». Relus le 18 novembre : Royalmouth (tuent d'un coup : celui qui lui
  inflige des dommages de poussée et celui qui en subit contre lui ; seul le Boufmouth légendaire pousse, d'après les
  données), Mansot Royal (dommages autour du soigné à chaque soin ; le vol de vie n'est pas un soin, il ne déclenche ni dommages ni délock ; la mort de ses monstres le
  renforce, celle de vos personnages reste à vérifier), Obsidiantre (8 cases
  autour de la Pougnette, explosion au 5e tour), puis Tengu, Korriandre, Glourséleste, Grolloum (points ouverts gardés
  en avertissement). Les fiches niveau 200 restent en brouillon, doutes en avertissement.
- Prochains guides de boss, dans cet ordre : 1) liés aux Dofus (Bworker, Ougah, Roi Nidas, Imagiro, Orukam) ;
  2) secondaires (Père Ver, Koumiho, Supervizœuf, Kralamoure, Papa Nowel, Kao).
- Combats tactiques : inventaire dans docs/combats-tactiques.md (245 combats classés d'après les données du jeu :
  10 confirmés dont 2 avec fiche, 124 à vérifier, 111 écartés). Les données ne marquent pas les combats tactiques :
  « monstre de quête » est un filtre, pas une preuve. Vérifier Dofus par Dofus (un guide de quêtes couvre toute la série).
- Quêtes journalières (?cat=journalieres) : src/data/quetesRepetables.ts généré par scripts/generer-quetes-repetables.py
  (repeatType 1 = jour, 2 = semaine ; Almanax et -1 exclus), avec PNJ, position et objets à apporter. Remise à zéro
  supposée à minuit (Paris) et le lundi à minuit, d'après un joueur : affichée « à confirmer » (src/components/Rebours.tsx). Les données ont aussi
  isPartyQuest (167 quêtes) : piste pour savoir quelles quêtes se font en groupe, sens à vérifier.
- Donjons > Quêtes (src/components/SuiviQuetesDonjons.tsx) : quêtes liées résolues (mêmes identifiants que les étapes
  de séries), un seul bouton par quête (à faire → en cours orange → faite verte), positionnement = table quetes_en_cours (aussi utilisée par le parcours optimisé) ;
  cocher « faite » retire le positionnement.
- Fiche avec genre « astuce » : combat ordinaire qui garde son étiquette et gagne un bouton Strat (Domakuro : Kwatimbe,
  Kaskouïs, Tanuki Durtouki, Firefoux, Maître Pandore) ; absente de l'onglet Combats tactiques. Plus d'astuce dans les noms.
- Une fiche dans combatsTactiques.ts suffit à marquer un combat tactique (étiquette « Tactique solo » + Strat), même dans
  les quêtes générées : ne pas toucher à quetesJeu.ts pour ça. « Le serment de l'ambre » (jeu de mémoire, Reine cornue)
  n'est dans aucune quête du site : sa fiche a `nomQuete` au lieu de `quete` et n'apparaît que dans l'onglet « Combats
  tactiques » de la page Quêtes (?cat=tactiques), qui liste toutes les fiches.
- Outil du Serment de l'ambre (fait ; fiche réécrite le 18 novembre, elle avait disparu de combatsTactiques.ts) : réplique de la carte, saisie à la main uniquement.
  Légende : case occupée (nature inconnue), 4 natures (couleur ou icône), case libérée. Sur la carte : les 5 positions
  où lancer le repérage, et les cases où il est inefficace (identifier la nature à la place). 32 monstres, 8 par îlot,
  4 îlots ; la Reine se déplace. Monstres placés au hasard à chaque combat. Natures : Malters (Malépik, Malbois,
  Maltrio, Malzerb). Une marque posée sur une case marquée la remplace. Fait : src/components/OutilMemoire.tsx sur la grille
  standard (560 cases). Carte corrigée par un joueur (SOL, MURS, départs J et R). Positions de repérage (5) et cases
  inefficaces (18) calculées par simulation des lignes de vue depuis l'îlot central (les monstres invisibles ne bloquent pas la vue,
  confirmé en jeu). Seule incertitude : les lignes qui frôlent un coin de bloc, signalée dans la fiche.
- Strats des combats tactiques, prochain chantier, dans cet ordre : 1) les 8 confirmés sans fiche (tous faits en novembre ; Rainikrone, Hyrkul, Crocoburio,
  Grougalorasalar et Bolgrot en brouillon, d'après les guides : Hyrkul et Crocoburio se jouent avec son propre personnage) (Dark Vlad (fait), Minogolem
  séculaire (fait, écrit d'après un joueur qui l'a passé), Esprit de Bolgrot (fait, brouillon), Furye (fait), Rainikrone, Hyrkul, Crocoburio, Grougalorasalar) et compléter les 2 Domakuro ;
  2) trier docs/combats-tactiques.md Dofus par Dofus (un guide de quêtes JeuxOnline par Dofus couvre toute la série),
  marquer les « oui » avec tactique(...) et rédiger leur fiche. Sortir au passage les astuces cachées dans des noms
  d'adversaires (Kaskouïs « les sortir de leur glyphe », Firefoux « protéger le Qilin de papier »). Mêmes règles que
  les guides de boss : nos mots, avertissement pour toute info d'une seule source ou d'avant Dofus 3.
- Le script d'import des quêtes (scripts/generer-quetes-dofus.py, quêtes reprises des données du jeu dans quetesJeu.ts)
  marque tous ses combats « groupe », sans source : 158 combats affichés « Combat de groupe » dans 17 séries. Corrigé en
  novembre : le script ne précise plus seul/groupe (étiquette « Combat »). Étiquettes : Combat de groupe, Combat solo
  (compagnon possible ou non, pas de catégorie à part), Tactique solo, Combat. Préciser seul/groupe combat par combat :
  idée d'un fichier à part (comme combatsTactiques.ts), pas encore validée.
- Liens « Guide détaillé » des 7 boss THL : page générale donjons.html de Dofus pour les Noobs, faute d'adresse exacte
  trouvée. À remplacer par l'adresse de chaque page.
- Fiche du jeu d'un boss (caractéristiques + portrait) : python3 scripts/generer-boss.py <version> slug=idMonstre
  (3.7.14.18 par défaut ; données 3.6 et 3.7 lues toutes les deux, cache par version dans /tmp/d3/<version>).
  Les 26 fiches existantes sont identiques en 3.7.
  Depuis le 19 novembre : caractéristiques au grade 1 = combat à 4 personnages (grade 5 = 8 ; vérifié sur le Maître
  Corbac, 4 500 PV « butin 4 » / 6 600 « butin 8 »). Seuls les PV changent, sauf les résistances de XLII. Les Cavaliers
  de l'Éliocalypse ont 10 grades (deux barèmes de 5) : avant, la fiche montrait le grade 10, qui n'est pas celui à 8.
  Sans slug=id, le script retrouve les monstres par leur nom et signale les noms en double (Cavaliers : 6014/6785…).
- Icônes de caractéristiques manquantes (Brocante) : attendre les numéros donnés par le propriétaire du site.
- Idées validées sur le principe, à cadrer : niveau et hauts faits de la guilde.
