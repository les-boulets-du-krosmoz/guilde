-- =====================================================================
-- Migration 010 : date d'annonce de bienvenue sur Discord, pour n'annoncer chaque membre qu'une seule fois.
-- Les membres déjà inscrits sont marqués comme annoncés : seuls les nouveaux comptes seront annoncés.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 009. Peut être relancée sans risque.
-- =====================================================================

alter table public.membres add column if not exists bienvenue_le timestamptz;

-- Sans cette ligne, chaque membre actuel serait annoncé à sa prochaine connexion.
update public.membres set bienvenue_le = cree_le where bienvenue_le is null;
