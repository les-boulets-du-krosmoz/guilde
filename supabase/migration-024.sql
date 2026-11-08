-- =====================================================================
-- Migration 024 : l'ordre de l'Œil de Brâkmar s'appelle « Œil Putride » dans Dofus 3 (et non plus « Œil Assassin »).
-- Renomme l'ordre partout : contrainte des personnages, personnages, recherches de groupe (ordre exigé et ordres acceptés).
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 023. Peut être relancée sans risque.
-- =====================================================================

-- 1. La contrainte accepte les deux noms le temps de la mise à jour, puis seulement le nouveau.
alter table public.personnages drop constraint if exists ordre_coherent;
alter table public.personnages add constraint ordre_coherent check (
     (alignement = 'Neutre'  and ordre is null and niveau_quete_alignement is null)
  or (alignement = 'Bonta'   and ordre in ('Cœur Vaillant', 'Esprit Salvateur', 'Œil Attentif'))
  or (alignement = 'Brâkmar' and ordre in ('Cœur Saignant', 'Esprit Malsain', 'Œil Putride', 'Œil Assassin'))
);

-- 2. Les données
update public.personnages set ordre = 'Œil Putride' where ordre = 'Œil Assassin';
update public.annonces set ordre = 'Œil Putride' where ordre = 'Œil Assassin';
update public.annonces
   set ordres = (select coalesce(jsonb_agg(case when e->>'ordre' = 'Œil Assassin' then jsonb_set(e, '{ordre}', '"Œil Putride"') else e end), '[]'::jsonb)
                   from jsonb_array_elements(ordres) e)
 where ordres::text like '%Œil Assassin%';

-- 3. La contrainte définitive : seulement « Œil Putride ».
alter table public.personnages drop constraint if exists ordre_coherent;
alter table public.personnages add constraint ordre_coherent check (
     (alignement = 'Neutre'  and ordre is null and niveau_quete_alignement is null)
  or (alignement = 'Bonta'   and ordre in ('Cœur Vaillant', 'Esprit Salvateur', 'Œil Attentif'))
  or (alignement = 'Brâkmar' and ordre in ('Cœur Saignant', 'Esprit Malsain', 'Œil Putride'))
);
