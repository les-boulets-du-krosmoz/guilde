# Site de guilde Dofus

React + TypeScript (Vite) pour le front, Supabase pour la base de données, la connexion Discord et deux petites fonctions serveur. Tout tient dans les offres gratuites.

## Ce que fait le site

- **Tableau de bord** (page d'accueil) : objectifs de groupe calculés à partir des quêtes en cours (un objectif apparaît dès que deux personnages en sont au même donjon ou combat de groupe d'un Dofus commencé, ou chassent le même avis de recherche), blocages de métier, avancement des Dofus dans la guilde, activité récente.
- **Personnages** : liste de tous les personnages de la guilde, avec recherche.
- **Profil** : un clic sur un Dofus ouvre ses étapes, à l'endroit où en est le personnage. Classe, niveau, alignement, ordre, niveau de quête d'alignement, métiers du compte, état des Dofus.
- **Métiers** : nombre de membres par palier pour chaque métier, détail trié par niveau avec filtre de niveau minimum. Les niveaux de plus de 60 jours sont signalés.
- **Mes quêtes** : cases à cocher par personnage, ressources à réunir cochables une par une (avec l'alternative quand il y en a une, ex. donjon OU pierre d'âme). Cocher une quête coche ce qui la précède, décocher décoche ce qui en dépend. Les prérequis de métier sont vérifiés automatiquement ; le lien « Trouver quelqu'un dans la guilde » n'apparaît que si le prérequis n'est pas personnel.
- **Avis de recherche** : les 82 avis rangés par milice, une ligne par avis avec la récompense, la protection et un cadenas quand le niveau requis dépasse celui de la fiche. On coche les avis livrés comme les quêtes. La ligne se déplie sur la zone, la milice, un résumé de stratégie (quand il existe) et la case « Je cherche un groupe pour cet avis » : dès que deux personnages la cochent, l'avis apparaît dans les groupes à monter.
- **Progression guilde** : chaque personnage placé sur la quête qu'il doit faire ensuite, s'il a commencé le Dofus ou coché « Je cherche un groupe pour commencer ce Dofus ». Cercle plein = principal, pointillé = mule, halo vert = dispo.
- **Dispo pour grouper** : 1, 2 ou 3 heures, sur le personnage de son choix (le principal par défaut).
- **Accès** : connexion Discord, réservée aux membres du serveur de la guilde. Chacun ne modifie que ses propres fiches. Un officier peut seulement retirer une image.

## Installation

### 1. Supabase

1. Crée un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, colle et exécute `supabase/schema.sql` (une seule fois, sur un projet neuf). Si tu l'as déjà exécuté avec une version plus ancienne, exécute seulement les migrations que tu n'as pas encore passées, dans l'ordre (`supabase/migration-002.sql`, `migration-003.sql`, `migration-004.sql`, `migration-005.sql`, `migration-006.sql`, `migration-007.sql`, `migration-008.sql`, `migration-009.sql`, puis `migration-010.sql`).
3. Note l'URL du projet et la clé `anon` (**Project Settings > API**).

### 2. Application Discord

1. Sur le [portail développeur Discord](https://discord.com/developers/applications), crée une application.
2. **OAuth2 > Redirects** : ajoute `https://<ton-projet>.supabase.co/auth/v1/callback`.
3. Copie le **Client ID** et le **Client Secret** dans Supabase : **Authentication > Providers > Discord**, et active le fournisseur.
4. Dans Supabase, **Authentication > URL Configuration** : mets l'adresse du site en *Site URL* et ajoute `http://localhost:5173` dans *Redirect URLs* pour le développement.
5. Récupère l'identifiant du serveur de la guilde : Discord > Paramètres > Avancés > Mode développeur, puis clic droit sur le serveur > *Copier l'identifiant*.

### 3. Fonctions serveur

Avec la [CLI Supabase](https://supabase.com/docs/guides/cli) :

```bash
supabase login
supabase link --project-ref <ton-projet>
supabase secrets set DISCORD_GUILD_ID=<id du serveur>
supabase functions deploy verifier-guilde
```

`verifier-guilde` s'exécute à chaque connexion et vérifie que la personne est sur le serveur.

### 4. Suppression automatique des membres partis (facultatif mais recommandé)

1. Dans l'application Discord, onglet **Bot** : crée le bot, active **Server Members Intent**, copie le jeton.
2. Invite le bot sur le serveur (OAuth2 > URL Generator, scope `bot`, aucune permission nécessaire).
3. Déploie la fonction :

```bash
supabase secrets set DISCORD_BOT_TOKEN=<jeton du bot> SYNCHRO_SECRET=<une longue chaîne aléatoire>
supabase functions deploy synchro-membres --no-verify-jwt
```

4. Active les extensions `pg_cron` et `pg_net` (**Database > Extensions**), puis planifie un passage par jour dans le SQL Editor :

```sql
select cron.schedule(
  'synchro-membres', '0 5 * * *',
  $$ select net.http_post(
       url := 'https://<ton-projet>.supabase.co/functions/v1/synchro-membres',
       headers := jsonb_build_object('x-synchro-secret', '<ta chaîne aléatoire>')
     ) $$
);
```

Le bot n'a pas besoin de tourner en permanence : la fonction appelle seulement l'API Discord une fois par jour. Si Discord renvoie une liste vide, rien n'est supprimé.

### 5. Premier officier

Après ta première connexion :

```sql
update public.membres set est_officier = true where pseudo = '<ton pseudo Discord>';
```

### 6. Lancer en local

```bash
cp .env.example .env   # puis remplis les valeurs
npm install
npm run dev
```

### 7. Mettre en ligne sur Vercel

Importe le dépôt sur [vercel.com](https://vercel.com), ajoute les variables de `.env.example`, déploie. `vercel.json` gère les routes. Ajoute l'adresse obtenue dans les *Redirect URLs* de Supabase.

## Archimonstres (Metamob)

Chaque membre colle le lien de son profil Metamob dans Mon compte. La fiche d'un personnage affiche alors les pierres d'archimonstres et de boss réunies pour le Dofus Ocre, à condition que la quête soit publique sur Metamob et porte le même nom que le personnage.

La lecture passe par la fonction `metamob`, qui garde la clé API côté serveur et garde le résultat 6 heures en cache :

1. Sur Metamob, dans ton espace, onglet API, crée une clé (une seule par compte ; elle est supprimée après 90 jours sans usage).
2. ```
   supabase secrets set METAMOB_API_KEY=<ta clé>
   supabase functions deploy metamob
   ```

Metamob limite chaque clé à 60 requêtes par minute ; un profil coûte environ 4 requêtes par quête Ocre, d'où le cache.

## Modifier les avis de recherche

La liste est dans `src/data/avis.ts`. Niveau requis, zone, milice et stratégie se renseignent dans `DETAILS`, avis par avis ; résume les stratégies avec tes mots, les textes de DPLN sont protégés. Un avis retiré de la liste disparaît du site mais sa progression reste en base ; ne change donc pas l'identifiant d'un avis existant.

## Ajouter un Dofus

Dans `src/data/dofus.ts`, ajoute les quêtes (identifiants avec un préfixe commun, par exemple `po-1`, `po-2`) et renseigne `quetes` dans le catalogue `DOFUS`. Chaque quête peut lister ses `ressources` (texte, `alternative` facultative, `note`). Les branches parallèles fonctionnent : une quête peut avoir plusieurs prérequis de type `quete`, y compris vers un autre Dofus.

## À savoir

- **Pause Supabase** : un projet gratuit est mis en pause après 7 jours sans activité et doit être relancé à la main depuis le tableau de bord.
- **Listes à vérifier en jeu** : classes et métiers dans `src/data/constantes.ts`, prérequis marqués `verifie: false` dans `src/data/dofus.ts`.
- **Images** : seulement des adresses `https`, liens de pièces jointes Discord refusés (ils expirent). Si l'image ne charge pas, les initiales s'affichent.
- **Un personnage sans aucune quête cochée** n'apparaît ni dans Progression ni dans les groupes à monter, sauf s'il a coché « Je cherche un groupe pour commencer ce Dofus ».

## Annonces Discord des nouveautés

Après chaque déploiement réussi en production, l'Action `.github/workflows/annonce-discord.yml` poste la section « À publier » de `CHANGELOG.md` dans le canal Discord des mises à jour, avec le numéro de version de `package.json`, puis vide la section.

- Secret GitHub requis : `DISCORD_WEBHOOK_URL` (Settings > Secrets and variables > Actions).
- Pour annoncer quelque chose : ajoute une ligne `- …` sous « À publier », écrite pour les membres, et pousse avec le reste.
- Rien sous « À publier » = rien de posté. Un échec de Discord n'archive rien : la section repartira au déploiement suivant.
- **Numéro de version** : champ `version` de `package.json`, affiché aussi en pied de page. À augmenter à chaque déploiement annoncé : le deuxième chiffre pour des nouveautés (1.1.0 → 1.2.0), le troisième pour de simples corrections (1.2.0 → 1.2.1).
- Le commit du bot commence par `chore(changelog)` ; `vercel.json` (`ignoreCommand`) empêche Vercel de redéployer pour lui.
- Si la branche `main` est protégée, autorise GitHub Actions à y pousser, sinon l'archivage échouera.

## Déployer sans perdre de données

Les migrations 002 à 010 n'ajoutent que des tables, des colonnes vides et des règles d'accès : aucune ne supprime ni ne modifie de données existantes, et chacune peut être relancée sans risque. Le déploiement Vercel, lui, ne touche jamais à la base.

1. **Sauvegarde** : exporte les données avant de toucher à quoi que ce soit (voir ci-dessous).
2. **État avant** : lance `supabase/verification-deploiement.sql` et garde le résultat (nombre de lignes par table).
3. **Migrations** : exécute, dans l'ordre, celles qui ne sont pas encore passées (003 à 010). L'ancien site continue de fonctionner avec elles.
4. **État après** : relance `verification-deploiement.sql` : mêmes nombres de lignes (ou plus), et toutes les lignes de la partie 2 à « oui ».
5. **Site** : seulement maintenant, pousse le code sur GitHub pour que Vercel déploie.
6. **Retour arrière** si le site pose problème : dans Vercel, remets le déploiement précédent en production. La base n'a pas besoin d'être restaurée, les migrations sont compatibles avec l'ancien site.

**Ne jamais exécuter `schema.sql` sur la base de production** : il sert uniquement à créer un projet neuf.

### Sauvegarde

- **Avec `pg_dump`** (le plus complet) : récupère la chaîne de connexion dans Supabase (bouton *Connect* du projet), puis
  `pg_dump "<chaîne de connexion>" --schema=public --data-only -f sauvegarde-AAAA-MM-JJ.sql`.
- **Sans outil** : dans le *Table Editor* de Supabase, exporte chaque table en CSV (membres, personnages, metiers_membre, quetes_terminees, ressources_cochees, dofus_souhaites).

Garde la sauvegarde hors du dépôt GitHub : elle contient les identifiants Discord des membres.

## Succès de donjon

`src/data/succesDonjons.ts` est généré à partir des données du jeu publiées par [dofusdude/dofus3-main](https://github.com/dofusdude/dofus3-main). Après une mise à jour de Dofus, relancer :

```
python3 scripts/generer-succes-donjons.py
```

Les identifiants des succès (`ach:<numéro>`) viennent du jeu : ils ne changent pas d'une version à l'autre, les succès déjà cochés restent valables.

## Annonce des nouveaux comptes sur Discord

À la première connexion d'un membre confirmé sur le serveur, la fonction `verifier-guilde` poste un message de bienvenue (avec mention du membre) dans un salon Discord. Chaque membre n'est annoncé qu'une fois ; les membres déjà inscrits avant la migration 010 ne le sont pas.

1. Dans le salon voulu : Paramètres > Intégrations > Webhooks > Nouveau webhook, puis copier l'URL.
2. Dans Supabase : Edge Functions > Secrets (ou `npx supabase secrets set …`), ajouter `DISCORD_WEBHOOK_BIENVENUE` avec cette URL.
3. Facultatif : `DISCORD_ROLE_BIENVENUE` avec l'identifiant d'un rôle à mentionner en plus (clic droit sur le rôle > Copier l'identifiant, mode développeur activé).
4. Redéployer la fonction : `npx supabase functions deploy verifier-guilde`.
