-- =====================================================================
-- Migration 020 : mode daltonien choisi par chaque membre (page Paramètres), retrouvé sur tous ses appareils.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 019. Peut être relancée sans risque.
-- =====================================================================

alter table public.membres add column if not exists mode_daltonien text;
alter table public.membres drop constraint if exists mode_daltonien_valide;
alter table public.membres add constraint mode_daltonien_valide
  check (mode_daltonien is null or mode_daltonien in ('deuteranopie', 'protanopie', 'tritanopie'));

-- Chacun ne modifie que sa propre ligne (règle existante) : on autorise seulement cette colonne en plus.
grant update (mode_daltonien) on public.membres to authenticated;
