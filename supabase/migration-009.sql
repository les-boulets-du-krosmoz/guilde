-- =====================================================================
-- Migration 009 : succès de donjon visés ou faits, par personnage (Tour du monde, Emma Tom Pouce, Frigost…).
-- Nouvelle table : rien ne change pour les données existantes.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 008. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.succes_donjon (
  personnage_id uuid not null references public.personnages(id) on delete cascade,
  succes_id     text not null check (char_length(succes_id) between 1 and 160),
  statut        text not null check (statut in ('vise', 'fait')),
  maj_le        timestamptz not null default now(),
  primary key (personnage_id, succes_id)
);

alter table public.succes_donjon enable row level security;

-- Toute la guilde voit qui vise quoi ; chacun ne gère que les succès de ses propres personnages.
drop policy if exists lecture_succes on public.succes_donjon;
create policy lecture_succes on public.succes_donjon for select to authenticated
  using (public.est_membre_valide());

drop policy if exists ecriture_succes on public.succes_donjon;
create policy ecriture_succes on public.succes_donjon for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());
