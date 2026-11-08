-- =====================================================================
-- Migration 025 : catalogue des archimonstres de la quête Ocre (lu sur Metamob), pour la page Archimonstres.
-- Rempli par la fonction metamob ; lisible par les membres validés. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.metamob_archis (
  id     int primary key,
  nom    text not null,
  etape  int  not null default 0,
  maj_le timestamptz not null default now()
);
alter table public.metamob_archis enable row level security;
drop policy if exists lecture_metamob_archis on public.metamob_archis;
create policy lecture_metamob_archis on public.metamob_archis for select to authenticated using (public.est_membre_valide());
-- (écriture : seulement par la fonction metamob, avec la clé de service)
