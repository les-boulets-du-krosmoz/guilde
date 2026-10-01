# Site de guilde Dofus

React + TypeScript (Vite) pour le front, Supabase pour la base de données, la connexion Discord et deux petites fonctions serveur. Tout tient dans les offres gratuites.

## Ce que fait le site

- **Tableau de bord** (page d'accueil) : objectifs de groupe calculés à partir des quêtes en cours (un objectif apparaît dès que deux personnages en sont au même donjon ou combat de groupe d'un Dofus commencé), blocages de métier, avancement des Dofus dans la guilde, activité récente.
- **Personnages** : liste de tous les personnages de la guilde, avec recherche.
- **Profil** : un clic sur un Dofus ouvre ses étapes, à l'endroit où en est le personnage. Classe, niveau, alignement, ordre, niveau de quête d'alignement, métiers du compte, état des Dofus.
- **Métiers** : nombre de membres par palier pour chaque métier, détail trié par niveau avec filtre de niveau minimum. Les niveaux de plus de 60 jours sont signalés.
- **Mes quêtes** : cases à cocher par personnage, ressources à réunir cochables une par une (avec l'alternative quand il y en a une, ex. donjon OU pierre d'âme). Cocher une quête coche ce qui la précède, décocher décoche ce qui en dépend. Les prérequis de métier sont vérifiés automatiquement ; le lien « Trouver quelqu'un dans la guilde » n'apparaît que si le prérequis n'est pas personnel.
- **Progression guilde** : chaque personnage placé sur la quête qu'il doit faire ensuite. Cercle plein = principal, pointillé = mule, halo vert = dispo.
- **Dispo pour grouper** : 1, 2 ou 3 heures, sur le personnage de son choix (le principal par défaut).
- **Accès** : connexion Discord, réservée aux membres du serveur de la guilde. Chacun ne modifie que ses propres fiches. Un officier peut seulement retirer une image.

## Installation

### 1. Supabase

1. Crée un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, colle et exécute `supabase/schema.sql` (une seule fois, sur un projet neuf). Si tu l'as déjà exécuté avec une version plus ancienne, exécute seulement `supabase/migration-002.sql`.
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

## Ajouter un Dofus

Dans `src/data/dofus.ts`, ajoute les quêtes (identifiants avec un préfixe commun, par exemple `po-1`, `po-2`) et renseigne `quetes` dans le catalogue `DOFUS`. Chaque quête peut lister ses `ressources` (texte, `alternative` facultative, `note`). Les branches parallèles fonctionnent : une quête peut avoir plusieurs prérequis de type `quete`, y compris vers un autre Dofus.

## À savoir

- **Pause Supabase** : un projet gratuit est mis en pause après 7 jours sans activité et doit être relancé à la main depuis le tableau de bord.
- **Listes à vérifier en jeu** : classes et métiers dans `src/data/constantes.ts`, prérequis marqués `verifie: false` dans `src/data/dofus.ts`.
- **Images** : seulement des adresses `https`, liens de pièces jointes Discord refusés (ils expirent). Si l'image ne charge pas, les initiales s'affichent.
- **Un personnage sans aucune quête cochée** apparaît sur la quête 1 dans la page Progression : le site ne peut pas distinguer « pas commencé » de « en train de faire la première quête ».
