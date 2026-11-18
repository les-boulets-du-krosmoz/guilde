-- =====================================================================
-- Migration 027 : comptage anonyme des visites, pour savoir ce qui sert sur le site
-- (pages et onglets, guides de boss, strats des combats, outil du Serment de l'ambre).
-- Une ligne par jour et par élément consulté, avec un simple compteur : aucun identifiant de membre n'est enregistré.
-- Les membres ne peuvent qu'ajouter 1 à un compteur (fonction compter_visite) ; seuls les officiers lisent les chiffres.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 026. Peut être relancée sans risque.
-- Ajoute seulement une colonne à membres (hors_statistiques, faux par défaut) : aucune donnée existante n'est modifiée.
-- =====================================================================

create table if not exists public.visites (
  jour  date not null,
  -- « page:/quetes?cat=dofus&dofus=emeraude », « boss:xlii », « strat:em-8:dark-vlad », « outil:memoire »
  cible text not null check (cible ~ '^[a-z0-9/:=?&._-]{1,120}$'),
  vues  int  not null default 1 check (vues >= 0),
  primary key (jour, cible)
);
alter table public.visites enable row level security;
drop policy if exists lecture_visites on public.visites;
create policy lecture_visites on public.visites for select to authenticated using (public.est_officier());
-- Aucune règle d'ajout, de modification ni de suppression : on passe forcément par la fonction ci-dessous.

-- Réglage « ne pas compter mes visites », porté par le compte (donc valable sur tous les appareils).
-- Il dit seulement si un membre est compté, jamais ce qu'il ouvre : la table visites reste sans identifiant.
alter table public.membres add column if not exists hors_statistiques boolean not null default false;
grant update (hors_statistiques) on public.membres to authenticated;

-- Ajoute 1 au compteur du jour (heure de Paris). Ne renvoie rien et ignore les cibles mal formées.
create or replace function public.compter_visite(p_cible text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.est_membre_valide() then return; end if;
  if exists (select 1 from public.membres where id = auth.uid() and hors_statistiques) then return; end if;
  if p_cible is null or p_cible !~ '^[a-z0-9/:=?&._-]{1,120}$' then return; end if;
  insert into public.visites (jour, cible, vues)
  values ((now() at time zone 'Europe/Paris')::date, p_cible, 1)
  on conflict (jour, cible) do update set vues = public.visites.vues + 1;
end $$;
revoke all on function public.compter_visite(text) from public, anon;
grant execute on function public.compter_visite(text) to authenticated;

-- Totaux par élément depuis une date, pour la page Statistiques (les règles de lecture s'appliquent : officiers seulement).
create or replace function public.statistiques_visites(p_depuis date)
returns table (cible text, vues bigint, jours bigint)
language sql stable security invoker set search_path = public as $$
  select v.cible, sum(v.vues)::bigint, count(*)::bigint
  from public.visites v
  where v.jour >= p_depuis
  group by v.cible
  order by 2 desc;
$$;
revoke all on function public.statistiques_visites(date) from public, anon;
grant execute on function public.statistiques_visites(date) to authenticated;
