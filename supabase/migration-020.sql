-- =====================================================================
-- Migration 020 : réglages d'affichage de chaque membre (page Paramètres) : mode daltonien et police,
-- retrouvés sur tous ses appareils.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 019. Peut être relancée sans risque.
-- =====================================================================

alter table public.membres add column if not exists mode_daltonien text;
alter table public.membres drop constraint if exists mode_daltonien_valide;
alter table public.membres add constraint mode_daltonien_valide
  check (mode_daltonien is null or mode_daltonien in ('deuteranopie', 'protanopie', 'tritanopie'));

-- Chacun ne modifie que sa propre ligne (règle existante) : on autorise seulement cette colonne en plus.
alter table public.membres add column if not exists police text;
alter table public.membres drop constraint if exists police_valide;
alter table public.membres add constraint police_valide check (police is null or police in ('times', 'epaisse'));

grant update (mode_daltonien, police) on public.membres to authenticated;
