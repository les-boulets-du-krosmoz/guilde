-- =====================================================================
-- Migration 003 : avis de recherche
-- À exécuter une fois dans Supabase > SQL Editor. Peut être relancée sans risque.
-- =====================================================================

-- Un avis par personnage : en chasse (quête prise en jeu) ou livré.
-- Pas de ligne = pas encore pris.
create table if not exists public.avis_personnage (
  personnage_id  uuid not null references public.personnages (id) on delete cascade,
  avis_id        text not null,
  etat           text not null check (etat in ('en_cours', 'livre')),
  maj_le         timestamptz not null default now(),
  primary key (personnage_id, avis_id)
);

drop trigger if exists avis_maj on public.avis_personnage;
create trigger avis_maj before update on public.avis_personnage
  for each row execute function public.toucher_maj();

alter table public.avis_personnage enable row level security;

drop policy if exists lecture_avis on public.avis_personnage;
create policy lecture_avis on public.avis_personnage for select to authenticated
  using (public.est_membre_valide());

drop policy if exists ecriture_avis on public.avis_personnage;
create policy ecriture_avis on public.avis_personnage for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());
