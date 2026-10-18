-- =====================================================================
-- Migration 022 : quêtes « en cours » (parcours optimisé du Dofus des Glaces : à faire, en cours, terminée).
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 021. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.quetes_en_cours (
  personnage_id uuid not null references public.personnages(id) on delete cascade,
  quete_id      text not null check (char_length(quete_id) <= 80),
  cree_le       timestamptz not null default now(),
  primary key (personnage_id, quete_id)
);
alter table public.quetes_en_cours enable row level security;
drop policy if exists lecture_quetes_en_cours on public.quetes_en_cours;
create policy lecture_quetes_en_cours on public.quetes_en_cours for select to authenticated using (public.est_membre_valide());
-- Seulement sur ses propres personnages, comme les quêtes terminées.
drop policy if exists ecriture_quetes_en_cours on public.quetes_en_cours;
create policy ecriture_quetes_en_cours on public.quetes_en_cours for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid()) and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid()) and public.est_membre_valide());
