-- =====================================================================
-- Migration 014 : recherche de groupe ouverte ou privée, et organisateur toujours inscrit.
--   - visibilite = 'ouvert' : tout le monde peut s'inscrire ; 'prive' : seulement l'auteur et les invités.
--   - l'auteur ne peut pas retirer sa propre inscription (il supprime l'annonce s'il annule la sortie).
--   - places (donjon) : de 2 à 8, organisateur compris ; 8 si non précisé.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 013. Peut être relancée sans risque.
-- =====================================================================

alter table public.annonces add column if not exists visibilite text not null default 'ouvert';
alter table public.annonces drop constraint if exists visibilite_valide;
alter table public.annonces add constraint visibilite_valide check (visibilite in ('ouvert', 'prive'));

-- S'inscrire : avec son propre personnage, si le groupe est ouvert, si on en est l'auteur, ou si on y est invité.
drop policy if exists inscription_participants on public.annonces_participants;
create policy inscription_participants on public.annonces_participants for insert to authenticated
  with check (
    exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
    and exists (
      select 1 from public.annonces a
      where a.id = annonce_id
        and (a.visibilite = 'ouvert'
             or a.auteur_id = auth.uid()
             or exists (select 1 from public.annonces_invitations i where i.annonce_id = a.id and i.membre_id = auth.uid()))
    )
    and public.est_membre_valide()
  );

-- Se retirer ou retirer quelqu'un : jamais les personnages de l'auteur (l'organisateur reste inscrit).
drop policy if exists retrait_participants on public.annonces_participants;
create policy retrait_participants on public.annonces_participants for delete to authenticated
  using (
    not exists (select 1 from public.annonces a join public.personnages p on p.membre_id = a.auteur_id
                where a.id = annonce_id and p.id = personnage_id)
    and (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         or exists (select 1 from public.annonces a where a.id = annonce_id and a.auteur_id = auth.uid())
         or public.est_officier())
    and public.est_membre_valide()
  );

-- Donjon : nombre de places choisi par l'organisateur (2 à 8, lui compris).
alter table public.annonces add column if not exists places int;
alter table public.annonces drop constraint if exists places_valides;
alter table public.annonces add constraint places_valides check (places is null or places between 2 and 8);

create or replace function public.limite_places_donjon() returns trigger language plpgsql as $$
declare
  limite int;
begin
  select case when type = 'donjon' then coalesce(places, 8) end into limite from public.annonces where id = new.annonce_id;
  if limite is not null and (select count(*) from public.annonces_participants where annonce_id = new.annonce_id) >= limite then
    raise exception 'Les % places de ce groupe sont prises.', limite;
  end if;
  return new;
end $$;
