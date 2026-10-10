-- =====================================================================
-- Migration 015 : avitons restants saisis par le membre (anciennement « doplons dépensés »).
-- Le site affiche : solde saisi + avitons des avis livrés depuis la saisie.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 014. Peut être relancée sans risque.
-- =====================================================================

alter table public.personnages add column if not exists avitons_solde int;
alter table public.personnages add column if not exists avitons_solde_le timestamptz;
alter table public.personnages drop constraint if exists avitons_solde_positif;
alter table public.personnages add constraint avitons_solde_positif check (avitons_solde is null or avitons_solde >= 0);
