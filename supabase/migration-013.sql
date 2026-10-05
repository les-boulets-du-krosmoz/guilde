-- =====================================================================
-- Migration 013 : invitations aux sorties. L'auteur d'une annonce invite des membres ; chacun accepte
-- (en s'inscrivant avec un personnage) ou refuse depuis le site. Mention Discord à l'envoi.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 012. Peut être relancée sans risque.
-- =====================================================================

create table if not exists public.annonces_invitations (
  annonce_id  uuid not null references public.annonces(id) on delete cascade,
  membre_id   uuid not null references public.membres(id) on delete cascade,  -- la personne invitée
  invite_par  uuid not null references public.membres(id) on delete cascade,
  statut      text not null default 'en_attente' check (statut in ('en_attente', 'acceptee', 'refusee')),
  cree_le     timestamptz not null default now(),
  repondu_le  timestamptz,
  discord_le  timestamptz,                                                    -- mention Discord envoyée
  primary key (annonce_id, membre_id)
);

alter table public.annonces_invitations enable row level security;

drop policy if exists lecture_invitations on public.annonces_invitations;
create policy lecture_invitations on public.annonces_invitations for select to authenticated using (public.est_membre_valide());

-- Inviter : l'auteur de l'annonce (ou un officier), en son propre nom.
drop policy if exists envoi_invitations on public.annonces_invitations;
create policy envoi_invitations on public.annonces_invitations for insert to authenticated
  with check (invite_par = auth.uid()
              and (exists (select 1 from public.annonces a where a.id = annonce_id and a.auteur_id = auth.uid()) or public.est_officier())
              and public.est_membre_valide());

-- Répondre : seulement la personne invitée, sur sa propre invitation.
drop policy if exists reponse_invitations on public.annonces_invitations;
create policy reponse_invitations on public.annonces_invitations for update to authenticated
  using (membre_id = auth.uid() and public.est_membre_valide())
  with check (membre_id = auth.uid());

-- Annuler : l'auteur de l'annonce, un officier, ou l'invité lui-même.
drop policy if exists annulation_invitations on public.annonces_invitations;
create policy annulation_invitations on public.annonces_invitations for delete to authenticated
  using ((membre_id = auth.uid()
          or exists (select 1 from public.annonces a where a.id = annonce_id and a.auteur_id = auth.uid())
          or public.est_officier())
         and public.est_membre_valide());
