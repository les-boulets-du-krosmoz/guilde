-- =====================================================================
-- Migration 006 : « Je peux aider » — un personnage se positionne sur une étape de quête
-- (élevage, combat tactique, strat connue…), avec une note facultative.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 005. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.aides_etapes (
  personnage_id uuid not null references public.personnages(id) on delete cascade,
  quete_id      text not null check (char_length(quete_id) between 1 and 100),
  note          text check (note is null or char_length(note) <= 140),
  cree_le       timestamptz not null default now(),
  primary key (personnage_id, quete_id)
);

alter table public.aides_etapes enable row level security;

-- Toute la guilde voit qui peut aider ; chacun ne gère que les inscriptions de ses propres personnages.
drop policy if exists lecture_aides on public.aides_etapes;
create policy lecture_aides on public.aides_etapes for select to authenticated
  using (public.est_membre_valide());

drop policy if exists ecriture_aides on public.aides_etapes;
create policy ecriture_aides on public.aides_etapes for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());
