-- =====================================================================
-- Migration 019 : absences datées (Calendrier) et liens utiles (accueil).
--   - absences : un membre indique qu'il ne sera pas là du … au … ; les créneaux proposés en tiennent compte.
--   - liens_utiles : liens de la guilde affichés sur l'accueil, gérés par les officiers.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 018. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.absences (
  id        uuid primary key default gen_random_uuid(),
  membre_id uuid not null references public.membres(id) on delete cascade,
  debut     date not null,
  fin       date not null,
  motif     text check (motif is null or char_length(motif) <= 80),
  cree_le   timestamptz not null default now(),
  check (fin >= debut)
);
alter table public.absences enable row level security;
drop policy if exists lecture_absences on public.absences;
create policy lecture_absences on public.absences for select to authenticated using (public.est_membre_valide());
drop policy if exists ecriture_absences on public.absences;
create policy ecriture_absences on public.absences for insert to authenticated with check (membre_id = auth.uid() and public.est_membre_valide());
drop policy if exists suppression_absences on public.absences;
create policy suppression_absences on public.absences for delete to authenticated using (membre_id = auth.uid() and public.est_membre_valide());

create table if not exists public.liens_utiles (
  id          uuid primary key default gen_random_uuid(),
  titre       text not null check (char_length(titre) between 1 and 60),
  url         text not null check (url ~ '^https?://' and char_length(url) <= 500),
  description text check (description is null or char_length(description) <= 140),
  ordre       int not null default 0,
  cree_par    uuid references public.membres(id) on delete set null,
  cree_le     timestamptz not null default now()
);
alter table public.liens_utiles enable row level security;
drop policy if exists lecture_liens on public.liens_utiles;
create policy lecture_liens on public.liens_utiles for select to authenticated using (public.est_membre_valide());
-- Seuls les officiers ajoutent, modifient ou retirent des liens.
drop policy if exists ajout_liens on public.liens_utiles;
create policy ajout_liens on public.liens_utiles for insert to authenticated with check (public.est_officier() and public.est_membre_valide());
drop policy if exists modif_liens on public.liens_utiles;
create policy modif_liens on public.liens_utiles for update to authenticated using (public.est_officier() and public.est_membre_valide());
drop policy if exists suppr_liens on public.liens_utiles;
create policy suppr_liens on public.liens_utiles for delete to authenticated using (public.est_officier() and public.est_membre_valide());
