-- =====================================================================
-- Migration 023 : seul l'organisateur modifie sa recherche de groupe ; les officiers peuvent toujours la supprimer.
-- À exécuter une fois dans Supabase > SQL Editor, après la migration 022. Peut être relancée sans risque.
-- =====================================================================

drop policy if exists modif_annonces on public.annonces;
create policy modif_annonces on public.annonces for update to authenticated
  using (auteur_id = auth.uid() and public.est_membre_valide());
-- (la suppression reste ouverte à l'organisateur et aux officiers : règle suppr_annonces inchangée)
