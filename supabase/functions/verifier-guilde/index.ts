// Vérifie, à chaque connexion, que l'utilisateur est bien sur le serveur Discord de la guilde.
// Appelée par le front juste après la connexion OAuth, avec le provider_token Discord.
// Variables : DISCORD_GUILD_ID (SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont fournies par Supabase)
// Facultatives : DISCORD_WEBHOOK_BIENVENUE (salon où annoncer les nouveaux comptes),
//                DISCORD_ROLE_BIENVENUE (identifiant d'un rôle à mentionner en plus, ex. les officiers).
// Le site public : SITE_URL (lien dans l'annonce).
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

/**
 * Poste le message de bienvenue. Renvoie true s'il est parti, ou s'il n'y a aucun salon configuré
 * (rien à rattraper plus tard) ; false si Discord a refusé : on réessaiera à la prochaine connexion.
 */
async function annoncerBienvenue(discordId: string, pseudo: string, avatar: string | null): Promise<boolean> {
  const webhook = Deno.env.get("DISCORD_WEBHOOK_BIENVENUE");
  if (!webhook) return true;
  const role = Deno.env.get("DISCORD_ROLE_BIENVENUE");
  const site = Deno.env.get("SITE_URL") ?? "https://guilde-nine.vercel.app";
  const corps = {
    content: `${role ? `<@&${role}> ` : ""}👋 <@${discordId}> vient de créer son compte sur le site de la guilde. Bienvenue !`,
    // Seuls le nouveau membre et, si configuré, le rôle choisi reçoivent une notification.
    allowed_mentions: { users: [discordId], roles: role ? [role] : [] },
    embeds: [{
      title: `${pseudo} a rejoint le site`,
      description: "Prochaine étape : créer sa fiche personnage dans Mon compte.",
      url: site,
      color: 0xe0b25c,
      ...(avatar ? { thumbnail: { url: avatar } } : {}),
    }],
  };
  try {
    const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corps) });
    return r.ok;
  } catch {
    return false;
  }
}

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

  // Si la migration 010 n'est pas encore passée, la colonne bienvenue_le n'existe pas : on relit sans elle
  // (pas d'annonce), plutôt que de bloquer la connexion.
  let { data: membre, error: errMembre } = await admin.from("membres").select("discord_id, avatar_url, bienvenue_le").eq("id", user.id).single();
  if (errMembre?.code === "42703") {
    const relu = await admin.from("membres").select("discord_id, avatar_url").eq("id", user.id).single();
    membre = relu.data ? { ...relu.data, bienvenue_le: "sans-migration" } : null;
  }
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
  // 404 = pas sur le serveur. Toute autre erreur (Discord indisponible, limite de débit) ne change rien.
  const guildeId = Deno.env.get("DISCORD_GUILD_ID");
  const fiche = await discord(`/users/@me/guilds/${guildeId}/member`);
  let valide = false;
  let pseudo: string = global_name ?? username;
  if (fiche.ok) {
    const m = await fiche.json();
    valide = true;
    pseudo = m.nick ?? pseudo; // pseudo du serveur en priorité
  } else if (fiche.status !== 404) {
    return json({ erreur: `Discord a répondu ${fiche.status}` }, 502);
  }

  await admin.from("membres").update({ valide, pseudo }).eq("id", user.id);

  // 4. Nouveau membre confirmé sur le serveur : on l'annonce une seule fois sur Discord.
  if (valide && !membre.bienvenue_le) {
    const annonce = await annoncerBienvenue(discordId, pseudo, nouvelAvatar);
    if (annonce) await admin.from("membres").update({ bienvenue_le: new Date().toISOString() }).eq("id", user.id);
  }
  return json({ valide, pseudo });
});
