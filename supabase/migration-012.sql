-- =====================================================================
-- Migration 012 : annonces de sorties (donjon ou quête), avec inscriptions des personnages.
-- Nouvelles tables : rien ne change pour les données existantes.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 011. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.annonces (
  id                 uuid primary key default gen_random_uuid(),
  auteur_id          uuid not null references public.membres(id) on delete cascade,
  titre              text not null check (char_length(titre) between 1 and 120),
  description        text check (description is null or char_length(description) <= 2000),
  type               text not null check (type in ('donjon', 'quete')),
  date_prevue        timestamptz,                          -- vide = « en attente », sans date
  donjon             text check (donjon is null or char_length(donjon) <= 200),  -- ligne du tableau des succès
  succes             text[] not null default '{}',         -- succès visés (« ach:<numéro> »)
  quete_id           text check (quete_id is null or char_length(quete_id) <= 100),
  quete_nom          text check (quete_nom is null or char_length(quete_nom) <= 120),  -- quête absente du site
  niveau_min         int check (niveau_min is null or niveau_min between 1 and 200),
  alignement_min     int check (alignement_min is null or alignement_min between 0 and 100),
  ordre_min          int check (ordre_min is null or ordre_min between 1 and 5),
  metiers            jsonb not null default '[]',          -- [{ "metier": "Paysan", "niveau": 100 }]
  annonce_discord_le timestamptz,
  cree_le            timestamptz not null default now(),
  maj_le             timestamptz not null default now()
);

create table if not exists public.annonces_participants (
  annonce_id    uuid not null references public.annonces(id) on delete cascade,
  personnage_id uuid not null references public.personnages(id) on delete cascade,
  cree_le       timestamptz not null default now(),
  primary key (annonce_id, personnage_id)
);

alter table public.annonces enable row level security;
alter table public.annonces_participants enable row level security;

-- Annonces : tout membre lit et publie ; l'auteur et les officiers modifient ou suppriment.
drop policy if exists lecture_annonces on public.annonces;
create policy lecture_annonces on public.annonces for select to authenticated using (public.est_membre_valide());
drop policy if exists creation_annonces on public.annonces;
create policy creation_annonces on public.annonces for insert to authenticated
  with check (auteur_id = auth.uid() and public.est_membre_valide());
drop policy if exists modif_annonces on public.annonces;
create policy modif_annonces on public.annonces for update to authenticated
  using ((auteur_id = auth.uid() or public.est_officier()) and public.est_membre_valide());
drop policy if exists suppr_annonces on public.annonces;
create policy suppr_annonces on public.annonces for delete to authenticated
  using ((auteur_id = auth.uid() or public.est_officier()) and public.est_membre_valide());

-- Inscriptions : chacun inscrit ou retire ses propres personnages ; l'auteur et les officiers peuvent retirer quelqu'un.
drop policy if exists lecture_participants on public.annonces_participants;
create policy lecture_participants on public.annonces_participants for select to authenticated using (public.est_membre_valide());
drop policy if exists inscription_participants on public.annonces_participants;
create policy inscription_participants on public.annonces_participants for insert to authenticated
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());
drop policy if exists retrait_participants on public.annonces_participants;
create policy retrait_participants on public.annonces_participants for delete to authenticated
  using ((exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
          or exists (select 1 from public.annonces a where a.id = annonce_id and a.auteur_id = auth.uid())
          or public.est_officier())
         and public.est_membre_valide());

-- Donjon : 8 places au plus, vérifié par la base (deux inscriptions simultanées ne peuvent pas dépasser).
create or replace function public.limite_places_donjon() returns trigger language plpgsql as $$
begin
  if (select type from public.annonces where id = new.annonce_id) = 'donjon'
     and (select count(*) from public.annonces_participants where annonce_id = new.annonce_id) >= 8 then
    raise exception 'Les 8 places de ce donjon sont prises.';
  end if;
  return new;
end $$;
drop trigger if exists places_donjon on public.annonces_participants;
create trigger places_donjon before insert on public.annonces_participants
  for each row execute function public.limite_places_donjon();

drop trigger if exists annonces_maj on public.annonces;
create trigger annonces_maj before update on public.annonces for each row execute function public.toucher_maj();

-- Ajout après coup (relançable) : nom libre d'une quête absente du site.
alter table public.annonces add column if not exists quete_nom text check (quete_nom is null or char_length(quete_nom) <= 120);
