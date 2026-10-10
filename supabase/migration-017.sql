-- =====================================================================
-- Migration 017 : plusieurs ordres acceptés par une recherche de groupe (comme les métiers).
-- ordres = [{ "ordre": "Œil Attentif", "rang": 2 }, …] : l'inscrit doit faire partie de l'un d'eux, au rang indiqué.
-- Les colonnes ordre / ordre_min (migration 016) sont reprises puis ne servent plus.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 016. Peut être relancée sans risque.
-- =====================================================================

alter table public.annonces add column if not exists ordres jsonb not null default '[]';

update public.annonces
   set ordres = jsonb_build_array(jsonb_build_object('ordre', ordre, 'rang', coalesce(ordre_min, 1)))
 where ordre is not null and ordres = '[]'::jsonb;
