-- =====================================================================
-- Migration 004 : profil Metamob (archimonstres du Dofus Ocre)
-- À exécuter une fois dans Supabase > SQL Editor. Peut être relancée sans risque.
-- =====================================================================

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
