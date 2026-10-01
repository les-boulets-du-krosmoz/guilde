// Vérifie, à chaque connexion, que l'utilisateur est bien sur le serveur Discord de la guilde.
// Appelée par le front juste après la connexion OAuth, avec le provider_token Discord.
// Variables : DISCORD_GUILD_ID (SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont fournies par Supabase)
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // 1. Qui appelle ? (jeton de session Supabase)
  const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  const { data: { user }, error } = await admin.auth.getUser(jwt);
  if (error || !user) return json({ erreur: "Session invalide" }, 401);

  const { provider_token } = await req.json().catch(() => ({}));
  if (!provider_token) return json({ erreur: "Jeton Discord manquant" }, 400);

  const discord = (path: string) =>
    fetch(`https://discord.com/api/v10${path}`, { headers: { Authorization: `Bearer ${provider_token}` } });

  // 2. Le jeton Discord appartient-il bien à cet utilisateur ?
  const moi = await discord("/users/@me");
  if (!moi.ok) return json({ erreur: "Jeton Discord refusé" }, 401);
  const { id: discordId, avatar, global_name, username } = await moi.json();

  const { data: membre } = await admin.from("membres").select("discord_id, avatar_url").eq("id", user.id).single();
  if (!membre || membre.discord_id !== discordId) return json({ erreur: "Compte Discord incohérent" }, 403);

  // Avatar Discord à jour : les personnages qui utilisaient l'ancien avatar suivent le nouveau.
  const nouvelAvatar = avatar ? `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png` : null;
  if (nouvelAvatar !== membre.avatar_url) {
    await admin.from("membres").update({ avatar_url: nouvelAvatar }).eq("id", user.id);
    if (membre.avatar_url) {
      await admin.from("personnages").update({ image_url: nouvelAvatar })
        .eq("membre_id", user.id).eq("image_url", membre.avatar_url);
    }
  }

  // 3. Est-il sur le serveur de la guilde ? Et sous quel pseudo ?
  const guildeId = Deno.env.get("DISCORD_GUILD_ID");
  let valide = false;
  let pseudo: string = global_name ?? username;

  const fiche = await discord(`/users/@me/guilds/${guildeId}/member`);
  if (fiche.ok) {
    // Pseudo du serveur en priorité, sinon nom d'affichage Discord.
    const m = await fiche.json();
    valide = true;
    pseudo = m.nick ?? pseudo;
  } else {
    // Ancienne autorisation sans guilds.members.read : on vérifie au moins l'appartenance.
    const guildes = await discord("/users/@me/guilds");
    if (!guildes.ok) return json({ erreur: "Impossible de lire les serveurs Discord" }, 502);
    const liste: { id: string }[] = await guildes.json();
    valide = liste.some((g) => g.id === guildeId);
  }

  await admin.from("membres").update({ valide, pseudo }).eq("id", user.id);
  return json({ valide, pseudo });
});
