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
- Archive livrée en deux parties : le site (léger) et public/icones/objets (images d'équipements, à part).

## Déploiement
- Version en préparation : 1.7.0 (changelog « À publier » à jour). Migrations 021 (relancer), 023, 024, 025, 026 à exécuter.
- Fonctions Supabase : metamob, brocante-interet (noms exacts, sans extension), annoncer-sortie, synchro-membres, verifier-guilde.
- Secrets : METAMOB_API_KEY, DISCORD_WEBHOOK_BROCANTE (facultatif), SUPABASE_DB_URL et SAUVEGARDE_PHRASE (GitHub, sauvegarde).

## Chantiers en cours
- Guides de boss (src/data/guidesBoss.ts, page Donjons > Guides) : 19 fiches rédigées, à relire. Points ouverts en
  « avertissements » dans chaque fiche (Reine des Voleurs : bonbombes ; Meno : délock ; Ilyzaelle : emprise ; Dazak :
  résistances ; Protozorreur : nombre de tours ; Sylargh : second kill).
- Boss à ajouter ensuite : Camp du Comte Razof, Pyramide d'Ombre, Horologium de XLII, Temple de Koutoulou,
  Manoir des Katrepat, Défi du Chalœil, Toxoliath. Fiche du jeu : scripts dans l'historique (monsters.json, gfxId -> image).
- Icônes de caractéristiques manquantes (Brocante) : attendre les numéros donnés par Kevin.
- Idées validées sur le principe, à cadrer : niveau et hauts faits de la guilde.
