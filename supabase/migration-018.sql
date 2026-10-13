-- =====================================================================
-- Migration 018 : disponibilités habituelles (semaine type) de chaque membre, pour la page Calendrier.
-- creneaux = numéros des cases cochées : jour × 4 + tranche (jour 0 = lundi ; tranches : matin, après-midi, soirée, nuit).
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 017. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.disponibilites (
  membre_id uuid primary key references public.membres(id) on delete cascade,
  creneaux  int[] not null default '{}',
  maj_le    timestamptz not null default now()
);

alter table public.disponibilites enable row level security;

drop policy if exists lecture_disponibilites on public.disponibilites;
create policy lecture_disponibilites on public.disponibilites for select to authenticated using (public.est_membre_valide());

-- Chacun ne remplit que ses propres disponibilités.
drop policy if exists ecriture_disponibilites on public.disponibilites;
create policy ecriture_disponibilites on public.disponibilites for insert to authenticated
  with check (membre_id = auth.uid() and public.est_membre_valide());
drop policy if exists modif_disponibilites on public.disponibilites;
create policy modif_disponibilites on public.disponibilites for update to authenticated
  using (membre_id = auth.uid() and public.est_membre_valide()) with check (membre_id = auth.uid());

drop trigger if exists disponibilites_maj on public.disponibilites;
create trigger disponibilites_maj before update on public.disponibilites for each row execute function public.toucher_maj();
