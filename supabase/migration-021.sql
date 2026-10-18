-- =====================================================================
-- Migration 021 : La Brocante des boulets (équipements mis en vente entre membres, à prix d'ami).
--   - brocante : un objet proposé (catalogue du jeu), ses caractéristiques réelles, son prix, son état.
--   - brocante_interets : les membres intéressés (le vendeur est prévenu sur Discord, une fois par membre).
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 020. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.brocante (
  id            uuid primary key default gen_random_uuid(),
  membre_id     uuid not null references public.membres(id) on delete cascade,
  objet_id      int  not null,
  objet_nom     text not null check (char_length(objet_nom) <= 120),
  objet_niveau  int  not null default 0,
  objet_type    text check (objet_type is null or char_length(objet_type) <= 60),
  objet_icone   int,
  stats         jsonb not null default '[]',
  prix          bigint not null check (prix >= 0 and prix <= 100000000000),
  prix_hdv      bigint check (prix_hdv is null or (prix_hdv >= 0 and prix_hdv <= 100000000000)),
  note          text check (note is null or char_length(note) <= 300),
  statut        text not null default 'en_vente' check (statut in ('en_vente', 'reserve', 'vendu')),
  reserve_pour  uuid references public.membres(id) on delete set null,
  vendu_le      timestamptz,
  cree_le       timestamptz not null default now(),
  maj_le        timestamptz not null default now()
);
alter table public.brocante enable row level security;
drop policy if exists lecture_brocante on public.brocante;
create policy lecture_brocante on public.brocante for select to authenticated using (public.est_membre_valide());
drop policy if exists ajout_brocante on public.brocante;
create policy ajout_brocante on public.brocante for insert to authenticated with check (membre_id = auth.uid() and public.est_membre_valide());
drop policy if exists modif_brocante on public.brocante;
create policy modif_brocante on public.brocante for update to authenticated
  using ((membre_id = auth.uid() or public.est_officier()) and public.est_membre_valide());
drop policy if exists suppr_brocante on public.brocante;
create policy suppr_brocante on public.brocante for delete to authenticated
  using ((membre_id = auth.uid() or public.est_officier()) and public.est_membre_valide());
drop trigger if exists brocante_maj on public.brocante;
create trigger brocante_maj before update on public.brocante for each row execute function public.toucher_maj();

create table if not exists public.brocante_interets (
  vente_id   uuid not null references public.brocante(id) on delete cascade,
  membre_id  uuid not null references public.membres(id) on delete cascade,
  cree_le    timestamptz not null default now(),
  discord_le timestamptz,
  primary key (vente_id, membre_id)
);
alter table public.brocante_interets enable row level security;
drop policy if exists lecture_interets on public.brocante_interets;
create policy lecture_interets on public.brocante_interets for select to authenticated using (public.est_membre_valide());
drop policy if exists ajout_interets on public.brocante_interets;
create policy ajout_interets on public.brocante_interets for insert to authenticated with check (membre_id = auth.uid() and public.est_membre_valide());
drop policy if exists suppr_interets on public.brocante_interets;
create policy suppr_interets on public.brocante_interets for delete to authenticated using (membre_id = auth.uid() and public.est_membre_valide());
