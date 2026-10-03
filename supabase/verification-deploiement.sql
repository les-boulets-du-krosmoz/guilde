-- =====================================================================
-- Vérification avant / après déploiement — LECTURE SEULE, ne modifie rien.
-- À lancer dans Supabase > SQL Editor juste avant les migrations, puis juste après :
-- les nombres de lignes doivent être identiques (ou plus grands si des membres ont joué entre-temps).
-- =====================================================================

-- 1. Nombre de lignes des tables qui existent déjà en production.
select 'membres' as table_, count(*) as lignes from public.membres
union all select 'personnages', count(*) from public.personnages
union all select 'metiers_membre', count(*) from public.metiers_membre
union all select 'quetes_terminees', count(*) from public.quetes_terminees
union all select 'ressources_cochees', count(*) from public.ressources_cochees
union all select 'dofus_souhaites', count(*) from public.dofus_souhaites
order by 1;

-- 2. Ce que les migrations 003 à 007 doivent avoir créé (après coup : tout doit être à « oui »).
select 'table avis_personnage (003)' as element,
       case when to_regclass('public.avis_personnage') is not null then 'oui' else 'NON' end as present
union all select 'colonne membres.metamob (004)',
       case when exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'membres' and column_name = 'metamob') then 'oui' else 'NON' end
union all select 'table metamob_cache (004)',
       case when to_regclass('public.metamob_cache') is not null then 'oui' else 'NON' end
union all select 'colonne personnages.rang_ordre (005)',
       case when exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'personnages' and column_name = 'rang_ordre') then 'oui' else 'NON' end
union all select 'table aides_etapes (006)',
       case when to_regclass('public.aides_etapes') is not null then 'oui' else 'NON' end
union all select 'colonnes personnages.ocre_* (007)',
       case when exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'personnages' and column_name = 'ocre_saisi_le') then 'oui' else 'NON' end;
