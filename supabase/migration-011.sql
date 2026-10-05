-- =====================================================================
-- Migration 011 : statut de présence (dispo / absent / indispo) et heure de dernière présence sur le site.
-- Remplace « Dispo pour grouper » (durée de 1 à 3 h). Les anciennes colonnes restent, rien n'est effacé.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 010. Peut être relancée sans risque.
-- =====================================================================

-- Dernier statut choisi : il est conservé d'une visite à l'autre. « dispo » à la première visite.
alter table public.membres add column if not exists statut text not null default 'dispo';
alter table public.membres drop constraint if exists statut_valide;
alter table public.membres add constraint statut_valide check (statut in ('dispo', 'absent', 'indispo'));

-- Mis à jour toutes les 5 minutes tant que le site est ouvert ; au-delà de 15 minutes, le membre est hors ligne.
alter table public.membres add column if not exists vu_le timestamptz;

-- Chacun peut modifier son propre statut et sa présence (la règle maj_sa_dispo limite déjà à sa propre ligne).
grant update (statut, vu_le) on public.membres to authenticated;
