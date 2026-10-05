// Poste une nouvelle annonce de sortie dans le salon Discord des sorties. Appelée par le site juste après la création.
// Une annonce n'est postée qu'une fois, et seulement à la demande de son auteur.
// Avec { invitations: true } : mentionne les membres invités qui ne l'ont pas encore été (auteur ou officier).
// Variables : DISCORD_WEBHOOK_ANNONCES (salon des sorties), SITE_URL (facultatif).
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const webhook = Deno.env.get("DISCORD_WEBHOOK_ANNONCES");
  if (!webhook) return json({ poste: false, raison: "Aucun salon configuré" });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  const { data: { user } } = await admin.auth.getUser(jwt);
  if (!user) return json({ erreur: "Session invalide" }, 401);

  const { annonce_id, details, invitations } = await req.json().catch(() => ({}));
  const { data: a } = await admin.from("annonces").select("*").eq("id", annonce_id).single();
  if (!a) return json({ erreur: "Annonce introuvable" }, 404);
  const site = Deno.env.get("SITE_URL") ?? "https://guilde-nine.vercel.app";

  if (invitations) {
    const { data: moi } = await admin.from("membres").select("pseudo, est_officier").eq("id", user.id).single();
    if (a.auteur_id !== user.id && !moi?.est_officier) return json({ erreur: "Seul l'auteur peut inviter" }, 403);
    const { data: inv } = await admin.from("annonces_invitations").select("membre_id").eq("annonce_id", a.id).is("discord_le", null);
    const ids = (inv ?? []).map((x: { membre_id: string }) => x.membre_id);
    if (ids.length === 0) return json({ poste: false, raison: "Aucune nouvelle invitation" });
    const { data: invites } = await admin.from("membres").select("id, discord_id").in("id", ids);
    const discordIds = (invites ?? []).map((m: { discord_id: string }) => m.discord_id).filter(Boolean);
    const quand = a.date_prevue
      ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date(a.date_prevue))
      : "date à fixer";
    const message = {
      content: `📨 ${discordIds.map((d: string) => `<@${d}>`).join(" ")} : **${moi?.pseudo ?? "Un membre"}** t'invite à « ${String(a.titre).slice(0, 120)} » (${quand}). Accepte ou refuse sur le site : ${site}/annonces#annonce-${a.id}`,
      allowed_mentions: { users: discordIds }, // seuls les invités sont notifiés
    };
    const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(message) }).catch(() => null);
    if (!r?.ok) return json({ poste: false, raison: "Discord n'a pas accepté le message" }, 502);
    await admin.from("annonces_invitations").update({ discord_le: new Date().toISOString() }).eq("annonce_id", a.id).in("membre_id", ids);
    return json({ poste: true, mentions: discordIds.length });
  }

  if (a.auteur_id !== user.id) return json({ erreur: "Seul l'auteur peut annoncer sa sortie" }, 403);
  if (a.annonce_discord_le) return json({ poste: false, raison: "Déjà annoncée" });

  const { data: auteur } = await admin.from("membres").select("pseudo, avatar_url").eq("id", user.id).single();
  const quand = a.date_prevue
    ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date(a.date_prevue))
    : "Date à fixer";
  // Les détails (donjon, succès, conditions) sont préparés par le site ; on borne leur taille.
  const lignes = (Array.isArray(details) ? details : []).map(String).slice(0, 12).map((l: string) => `• ${l.slice(0, 200)}`);
  const corps = {
    content: `📅 Nouvelle sortie proposée par **${auteur?.pseudo ?? "un membre"}**`,
    allowed_mentions: { parse: [] }, // aucune mention ne notifie, même écrite dans le titre
    embeds: [{
      title: `${a.type === "donjon" ? "🏰" : "📜"} ${a.titre}`.slice(0, 250),
      url: `${site}/annonces#annonce-${a.id}`,
      description: [quand, a.description ? `\n${String(a.description).slice(0, 1500)}` : "", lignes.length ? `\n${lignes.join("\n")}` : ""].join(""),
      color: a.type === "donjon" ? 0xd6a521 : 0x5fbf8a,
      ...(auteur?.avatar_url ? { thumbnail: { url: auteur.avatar_url } } : {}),
      footer: { text: "Inscriptions sur le site de la guilde" },
    }],
  };
  const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corps) }).catch(() => null);
  if (!r?.ok) return json({ poste: false, raison: "Discord n'a pas accepté le message" }, 502);
  await admin.from("annonces").update({ annonce_discord_le: new Date().toISOString() }).eq("id", a.id);
  return json({ poste: true });
});
