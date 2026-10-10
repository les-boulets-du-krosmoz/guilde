-- =====================================================================
-- Migration 016 : ordre exigé par une recherche de groupe, et places réglables aussi pour les quêtes.
--   - annonces.ordre : nom de l'ordre exigé (ex. « Œil Attentif ») ; ordre_min reste le rang minimum.
--   - places : de 2 à 50 (un donjon reste limité à 8 par le site) ; la limite vaut pour tous les types.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 015. Peut être relancée sans risque.
-- =====================================================================

alter table public.annonces add column if not exists ordre text check (ordre is null or char_length(ordre) <= 40);

alter table public.annonces drop constraint if exists places_valides;
alter table public.annonces add constraint places_valides check (places is null or places between 2 and 50);

create or replace function public.limite_places_donjon() returns trigger language plpgsql as $$
declare
  limite int;
begin
  -- Donjon : 8 par défaut ; quête : seulement si l'organisateur a fixé un nombre de places.
  select case when type = 'donjon' then coalesce(places, 8) else places end into limite from public.annonces where id = new.annonce_id;
  if limite is not null and (select count(*) from public.annonces_participants where annonce_id = new.annonce_id) >= limite then
    raise exception 'Les % places de ce groupe sont prises.', limite;
  end if;
  return new;
end $$;
