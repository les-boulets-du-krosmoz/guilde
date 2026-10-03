-- =====================================================================
-- Migration 007 : archimonstres et boss du Dofus Ocre saisis à la main, quand Metamob est injoignable
-- ou que le membre n'utilise pas Metamob. Colonnes vides par défaut : rien ne change pour les fiches existantes.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 006. Peut être relancée sans risque.
-- =====================================================================

alter table public.personnages add column if not exists ocre_archis       int;
alter table public.personnages add column if not exists ocre_archis_total int;
alter table public.personnages add column if not exists ocre_boss         int;
alter table public.personnages add column if not exists ocre_boss_total   int;
alter table public.personnages add column if not exists ocre_saisi_le     timestamptz;

-- Des nombres cohérents : jamais négatifs, jamais plus que le total.
alter table public.personnages drop constraint if exists ocre_archis_coherent;
alter table public.personnages add constraint ocre_archis_coherent
  check (ocre_archis is null or (ocre_archis >= 0 and ocre_archis_total > 0 and ocre_archis <= ocre_archis_total));
alter table public.personnages drop constraint if exists ocre_boss_coherent;
alter table public.personnages add constraint ocre_boss_coherent
  check (ocre_boss is null or (ocre_boss >= 0 and ocre_boss_total > 0 and ocre_boss <= ocre_boss_total));
