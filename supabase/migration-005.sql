-- =====================================================================
-- Migration 005 : rang dans l'ordre (1 à 5), pour les cadenas des avis d'alignement
-- À exécuter une fois dans Supabase > SQL Editor, après les migrations 003 et 004.
-- Peut être relancée sans risque.
-- =====================================================================

alter table public.personnages add column if not exists rang_ordre int;

alter table public.personnages drop constraint if exists rang_ordre_bornes;
alter table public.personnages add constraint rang_ordre_bornes check (rang_ordre is null or rang_ordre between 1 and 5);

-- Un personnage neutre n'a pas de rang.
alter table public.personnages drop constraint if exists rang_ordre_aligne;
alter table public.personnages add constraint rang_ordre_aligne check (alignement <> 'Neutre' or rang_ordre is null);
