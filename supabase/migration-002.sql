-- =====================================================================
-- Migration 002 : ressources cochées et Dofus souhaités
-- À exécuter si schema.sql a déjà été lancé une première fois.
-- Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.ressources_cochees (
  personnage_id  uuid not null references public.personnages (id) on delete cascade,
  ressource_id   text not null,
  coche_le       timestamptz not null default now(),
  primary key (personnage_id, ressource_id)
);

create table if not exists public.dofus_souhaites (
  personnage_id  uuid not null references public.personnages (id) on delete cascade,
  dofus_id       text not null,
  cree_le        timestamptz not null default now(),
  primary key (personnage_id, dofus_id)
);

alter table public.ressources_cochees enable row level security;
alter table public.dofus_souhaites enable row level security;

drop policy if exists lecture_ressources on public.ressources_cochees;
create policy lecture_ressources on public.ressources_cochees for select to authenticated
  using (public.est_membre_valide());

drop policy if exists ecriture_ressources on public.ressources_cochees;
create policy ecriture_ressources on public.ressources_cochees for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());

drop policy if exists lecture_souhaits on public.dofus_souhaites;
create policy lecture_souhaits on public.dofus_souhaites for select to authenticated
  using (public.est_membre_valide());

drop policy if exists ecriture_souhaits on public.dofus_souhaites;
create policy ecriture_souhaits on public.dofus_souhaites for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());
