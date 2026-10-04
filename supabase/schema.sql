-- =====================================================================
-- Site de guilde Dofus — schéma Supabase
-- À exécuter dans : Supabase > SQL Editor
-- =====================================================================

-- ---------- Membres (un par compte Discord) ----------
create table public.membres (
  id                   uuid primary key references auth.users (id) on delete cascade,
  discord_id           text unique not null,
  pseudo               text not null,
  avatar_url           text,
  est_officier         boolean not null default false,
  valide               boolean not null default false,  -- présent sur le serveur Discord de la guilde
  dispo_jusqua         timestamptz,
  dispo_personnage_id  uuid,
  cree_le              timestamptz not null default now()
);

-- ---------- Personnages ----------
create table public.personnages (
  id                        uuid primary key default gen_random_uuid(),
  membre_id                 uuid not null references public.membres (id) on delete cascade,
  nom                       text not null unique check (char_length(nom) between 2 and 30),
  classe                    text not null,
  niveau                    int  not null check (niveau between 1 and 200),
  alignement                text not null default 'Neutre' check (alignement in ('Neutre', 'Bonta', 'Brâkmar')),
  ordre                     text,
  niveau_quete_alignement   int check (niveau_quete_alignement >= 0),
  rang_ordre                int check (rang_ordre between 1 and 5),
  est_principal             boolean not null default false,
  image_url                 text,
  maj_le                    timestamptz not null default now(),

  constraint rang_ordre_aligne check (alignement <> 'Neutre' or rang_ordre is null),
  constraint ordre_coherent check (
       (alignement = 'Neutre'  and ordre is null and niveau_quete_alignement is null)
    or (alignement = 'Bonta'   and ordre in ('Cœur Vaillant', 'Esprit Salvateur', 'Œil Attentif'))
    or (alignement = 'Brâkmar' and ordre in ('Cœur Saignant', 'Esprit Malsain', 'Œil Assassin'))
  ),
  -- https uniquement, et pas de lien de pièce jointe Discord (ils expirent)
  constraint image_url_valide check (
    image_url is null or (
      image_url ~ '^https://'
      and image_url !~* '^https://(cdn|media)\.discordapp\.(com|net)/attachments/'
      and char_length(image_url) <= 500
    )
  )
);

-- un seul personnage principal par membre
create unique index un_principal_par_membre on public.personnages (membre_id) where est_principal;

alter table public.membres
  add constraint dispo_personnage_fk foreign key (dispo_personnage_id)
  references public.personnages (id) on delete set null;

-- ---------- Métiers (liés au compte, donc au membre) ----------
create table public.metiers_membre (
  membre_id  uuid not null references public.membres (id) on delete cascade,
  metier     text not null,
  niveau     int  not null check (niveau between 1 and 200),
  maj_le     timestamptz not null default now(),
  primary key (membre_id, metier)
);

-- ---------- Quêtes terminées (par personnage) ----------
create table public.quetes_terminees (
  personnage_id  uuid not null references public.personnages (id) on delete cascade,
  quete_id       text not null,
  termine_le     timestamptz not null default now(),
  primary key (personnage_id, quete_id)
);

-- ---------- Ressources de quête réunies (par personnage, simple case cochée) ----------
create table public.ressources_cochees (
  personnage_id  uuid not null references public.personnages (id) on delete cascade,
  ressource_id   text not null,
  coche_le       timestamptz not null default now(),
  primary key (personnage_id, ressource_id)
);

-- ---------- Dofus que le personnage veut commencer (le fait apparaître dans les objectifs de groupe) ----------
create table public.dofus_souhaites (
  personnage_id  uuid not null references public.personnages (id) on delete cascade,
  dofus_id       text not null,
  cree_le        timestamptz not null default now(),
  primary key (personnage_id, dofus_id)
);

-- ---------- Date de mise à jour automatique ----------
create or replace function public.toucher_maj() returns trigger language plpgsql as $$
begin
  new.maj_le := now();
  return new;
end $$;

create trigger personnages_maj before update on public.personnages
  for each row execute function public.toucher_maj();
create trigger metiers_maj before update on public.metiers_membre
  for each row execute function public.toucher_maj();

-- ---------- Création du membre à la première connexion Discord ----------
create or replace function public.creer_membre() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.membres (id, discord_id, pseudo, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'provider_id', new.raw_user_meta_data ->> 'sub'),
    coalesce(
      new.raw_user_meta_data -> 'custom_claims' ->> 'global_name',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      'membre'
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end $$;

create trigger a_la_creation_utilisateur after insert on auth.users
  for each row execute function public.creer_membre();

-- ---------- Fonctions d'aide pour les règles d'accès ----------
create or replace function public.est_membre_valide() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select valide from public.membres where id = auth.uid()), false);
$$;

create or replace function public.est_officier() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select est_officier and valide from public.membres where id = auth.uid()), false);
$$;

-- Un officier peut retirer l'image d'un personnage (modération), rien d'autre.
create or replace function public.retirer_image(p_personnage_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.est_officier() then
    raise exception 'Réservé aux officiers';
  end if;
  update public.personnages set image_url = null where id = p_personnage_id;
end $$;

-- ---------- Row Level Security ----------
alter table public.membres          enable row level security;
alter table public.personnages      enable row level security;
alter table public.metiers_membre   enable row level security;
alter table public.quetes_terminees enable row level security;
alter table public.ressources_cochees enable row level security;
alter table public.dofus_souhaites enable row level security;

-- Lecture : tout membre validé voit tout. Sa propre ligne reste lisible avant validation.
create policy lecture_membres on public.membres for select to authenticated
  using (public.est_membre_valide() or id = auth.uid());
create policy lecture_personnages on public.personnages for select to authenticated
  using (public.est_membre_valide());
create policy lecture_metiers on public.metiers_membre for select to authenticated
  using (public.est_membre_valide());
create policy lecture_quetes on public.quetes_terminees for select to authenticated
  using (public.est_membre_valide());
create policy lecture_ressources on public.ressources_cochees for select to authenticated
  using (public.est_membre_valide());
create policy lecture_souhaits on public.dofus_souhaites for select to authenticated
  using (public.est_membre_valide());

-- Membres : chacun ne modifie que sa dispo (les autres colonnes sont verrouillées).
revoke update on public.membres from authenticated, anon;
grant update (dispo_jusqua, dispo_personnage_id) on public.membres to authenticated;
create policy maj_sa_dispo on public.membres for update to authenticated
  using (id = auth.uid() and public.est_membre_valide())
  with check (
    id = auth.uid()
    and (dispo_personnage_id is null
         or exists (select 1 from public.personnages p where p.id = dispo_personnage_id and p.membre_id = auth.uid()))
  );

-- Personnages : le propriétaire seul.
create policy ecriture_personnages on public.personnages for all to authenticated
  using (membre_id = auth.uid() and public.est_membre_valide())
  with check (membre_id = auth.uid() and public.est_membre_valide());

-- Métiers : le propriétaire seul.
create policy ecriture_metiers on public.metiers_membre for all to authenticated
  using (membre_id = auth.uid() and public.est_membre_valide())
  with check (membre_id = auth.uid() and public.est_membre_valide());

-- Quêtes : seulement sur ses propres personnages.
create policy ecriture_quetes on public.quetes_terminees for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());

-- Ressources : seulement sur ses propres personnages.
create policy ecriture_ressources on public.ressources_cochees for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());

-- Souhaits : seulement sur ses propres personnages.
create policy ecriture_souhaits on public.dofus_souhaites for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());


-- Un avis par personnage : en chasse (quête prise en jeu) ou livré.
-- Pas de ligne = pas encore pris.
create table if not exists public.avis_personnage (
  personnage_id  uuid not null references public.personnages (id) on delete cascade,
  avis_id        text not null,
  etat           text not null check (etat in ('en_cours', 'livre')),
  maj_le         timestamptz not null default now(),
  primary key (personnage_id, avis_id)
);

drop trigger if exists avis_maj on public.avis_personnage;
create trigger avis_maj before update on public.avis_personnage
  for each row execute function public.toucher_maj();

alter table public.avis_personnage enable row level security;

drop policy if exists lecture_avis on public.avis_personnage;
create policy lecture_avis on public.avis_personnage for select to authenticated
  using (public.est_membre_valide());

drop policy if exists ecriture_avis on public.avis_personnage;
create policy ecriture_avis on public.avis_personnage for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());


-- Lien ou pseudo Metamob, saisi par le membre dans Mon compte.
alter table public.membres add column if not exists metamob text;
alter table public.membres drop constraint if exists metamob_longueur;
alter table public.membres add constraint metamob_longueur check (metamob is null or char_length(metamob) <= 200);
grant update (metamob) on public.membres to authenticated;

-- Résumé calculé par la fonction metamob, gardé quelques heures pour ménager l'API Metamob
-- (60 requêtes par minute pour la clé de la guilde). Écrit et lu uniquement par la fonction.
create table if not exists public.metamob_cache (
  membre_id  uuid primary key references public.membres (id) on delete cascade,
  pseudo     text not null,
  donnees    jsonb not null,
  maj_le     timestamptz not null default now()
);
alter table public.metamob_cache enable row level security;

-- « Je peux aider » (migration 006)

create table if not exists public.aides_etapes (
  personnage_id uuid not null references public.personnages(id) on delete cascade,
  quete_id      text not null check (char_length(quete_id) between 1 and 100),
  note          text check (note is null or char_length(note) <= 140),
  cree_le       timestamptz not null default now(),
  primary key (personnage_id, quete_id)
);

alter table public.aides_etapes enable row level security;

-- Toute la guilde voit qui peut aider ; chacun ne gère que les inscriptions de ses propres personnages.
drop policy if exists lecture_aides on public.aides_etapes;
create policy lecture_aides on public.aides_etapes for select to authenticated
  using (public.est_membre_valide());

drop policy if exists ecriture_aides on public.aides_etapes;
create policy ecriture_aides on public.aides_etapes for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());

-- Dofus Ocre saisi à la main (migration 007)

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

-- Doplons dépensés (migration 008)

alter table public.personnages add column if not exists doplons_depenses int;

alter table public.personnages drop constraint if exists doplons_depenses_positif;
alter table public.personnages add constraint doplons_depenses_positif
  check (doplons_depenses is null or doplons_depenses >= 0);

-- Succès de donjon (migration 009)

create table if not exists public.succes_donjon (
  personnage_id uuid not null references public.personnages(id) on delete cascade,
  succes_id     text not null check (char_length(succes_id) between 1 and 160),
  statut        text not null check (statut in ('vise', 'fait')),
  maj_le        timestamptz not null default now(),
  primary key (personnage_id, succes_id)
);

alter table public.succes_donjon enable row level security;

-- Toute la guilde voit qui vise quoi ; chacun ne gère que les succès de ses propres personnages.
drop policy if exists lecture_succes on public.succes_donjon;
create policy lecture_succes on public.succes_donjon for select to authenticated
  using (public.est_membre_valide());

drop policy if exists ecriture_succes on public.succes_donjon;
create policy ecriture_succes on public.succes_donjon for all to authenticated
  using (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
         and public.est_membre_valide())
  with check (exists (select 1 from public.personnages p where p.id = personnage_id and p.membre_id = auth.uid())
              and public.est_membre_valide());

-- Annonce de bienvenue sur Discord (migration 010)
alter table public.membres add column if not exists bienvenue_le timestamptz;
