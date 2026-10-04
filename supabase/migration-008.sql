-- =====================================================================
-- Migration 008 : doplons déjà dépensés par personnage (page des avis : doplons restants).
-- Colonne vide par défaut : rien ne change pour les fiches existantes.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 007. Peut être relancée sans risque.
-- =====================================================================

alter table public.personnages add column if not exists doplons_depenses int;

alter table public.personnages drop constraint if exists doplons_depenses_positif;
alter table public.personnages add constraint doplons_depenses_positif
  check (doplons_depenses is null or doplons_depenses >= 0);
