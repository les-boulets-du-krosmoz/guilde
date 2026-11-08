-- =====================================================================
-- Migration 026 : songes déclarés par les membres (butin obtenu dont les légendes, Bribes, profondeur atteinte,
-- songe terminé ou perdu avant le combat final, taux de butin vus en jeu),
-- pour le classement de la page Songes infinis et les coefficients de drop observés par palier.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 025. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.songes_runs (
  id         uuid primary key default gen_random_uuid(),
  membre_id  uuid not null references public.membres(id) on delete cascade,
  intensite  text not null check (intensite in ('Rêve I','Rêve II','Rêve III','Paradoxe I','Paradoxe II','Paradoxe III','Paradoxe IV','Cauchemar I','Cauchemar II','Cauchemar III')),
  vagues     int  not null default 0 check (vagues between 0 and 999),
  bribes     int  not null default 0 check (bribes between 0 and 1000000),
  -- quantités obtenues, par objet : { "reflet-onirique": 120, "rune-legendaire": 1, "legende:Brumaire": 1, … }
  butin      jsonb not null default '{}',
  -- taux de butin affichés en jeu, par palier : { "1": 190, "3": 238 }
  taux       jsonb not null default '{}',
  -- profondeur atteinte (1 à 26) et songe terminé (arrivé au combat final) ou perdu avant
  profondeur int  not null default 26 check (profondeur between 1 and 26),
  termine    boolean not null default true,
  cree_le    timestamptz not null default now()
);
alter table public.songes_runs add column if not exists profondeur int not null default 26;
alter table public.songes_runs add column if not exists termine boolean not null default true;
alter table public.songes_runs enable row level security;
drop policy if exists lecture_songes_runs on public.songes_runs;
create policy lecture_songes_runs on public.songes_runs for select to authenticated using (public.est_membre_valide());
drop policy if exists ajout_songes_runs on public.songes_runs;
create policy ajout_songes_runs on public.songes_runs for insert to authenticated with check (membre_id = auth.uid() and public.est_membre_valide());
drop policy if exists modif_songes_runs on public.songes_runs;
create policy modif_songes_runs on public.songes_runs for update to authenticated using (membre_id = auth.uid() and public.est_membre_valide());
drop policy if exists suppr_songes_runs on public.songes_runs;
create policy suppr_songes_runs on public.songes_runs for delete to authenticated
  using ((membre_id = auth.uid() or public.est_officier()) and public.est_membre_valide());
