// Tâche planifiée (1 fois par jour) : supprime les fiches des membres qui ont quitté le serveur Discord.
// Nécessite un bot Discord invité sur le serveur, avec l'intent "Server Members" activé.
// Pas de bot allumé en permanence : on appelle seulement l'API REST.
// Variables : DISCORD_GUILD_ID, DISCORD_BOT_TOKEN, SYNCHRO_SECRET (+ SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  // Seul le planificateur connaît le secret.
  if (req.headers.get("x-synchro-secret") !== Deno.env.get("SYNCHRO_SECRET")) {
    return new Response("Interdit", { status: 403 });
  }

  const guildId = Deno.env.get("DISCORD_GUILD_ID")!;
  const token = Deno.env.get("DISCORD_BOT_TOKEN")!;

  // Liste complète des membres du serveur (pages de 1000).
  const presents = new Set<string>();
  let apres = "0";
  for (;;) {
    const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000&after=${apres}`, {
      headers: { Authorization: `Bot ${token}` },
    });
    if (!r.ok) return new Response(`Discord a répondu ${r.status}`, { status: 502 });
    const page: { user: { id: string } }[] = await r.json();
    page.forEach((m) => presents.add(m.user.id));
    if (page.length < 1000) break;
    apres = page[page.length - 1].user.id;
  }

  // Garde-fou : une liste vide vient d'une erreur de configuration, pas d'un départ de toute la guilde.
  if (presents.size === 0) return new Response("Liste vide, rien supprimé", { status: 500 });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: membres, error } = await admin.from("membres").select("id, discord_id");
  if (error) return new Response(error.message, { status: 500 });

  const partis = (membres ?? []).filter((m) => !presents.has(m.discord_id));
  for (const m of partis) {
    // Supprimer l'utilisateur Auth supprime en cascade membre, personnages, métiers et quêtes.
    await admin.auth.admin.deleteUser(m.id);
  }
  return new Response(JSON.stringify({ supprimes: partis.length }), {
    headers: { "Content-Type": "application/json" },
  });
});
