// Prévient le vendeur sur Discord quand un membre se dit intéressé par un objet de La Brocante des boulets.
// Une seule mention par membre et par objet. Appelée par le site juste après le clic sur « Intéressé ».
// Variables : DISCORD_WEBHOOK_BROCANTE (salon de la brocante ; à défaut DISCORD_WEBHOOK_ANNONCES), SITE_URL (facultatif).
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const kamas = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " k";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const webhook = Deno.env.get("DISCORD_WEBHOOK_BROCANTE") ?? Deno.env.get("DISCORD_WEBHOOK_ANNONCES");
  if (!webhook) return json({ poste: false, raison: "Aucun salon configuré" });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  const { data: { user } } = await admin.auth.getUser(jwt);
  if (!user) return json({ erreur: "Session invalide" }, 401);

  const { vente_id } = await req.json().catch(() => ({}));
  const { data: v } = await admin.from("brocante").select("*").eq("id", vente_id).single();
  if (!v) return json({ erreur: "Objet introuvable" }, 404);
  if (v.membre_id === user.id) return json({ poste: false, raison: "C'est ton propre objet" });
  // L'intérêt doit avoir été enregistré par le site, et ne pas avoir déjà été signalé.
  const { data: interet } = await admin.from("brocante_interets").select("discord_le").eq("vente_id", v.id).eq("membre_id", user.id).single();
  if (!interet) return json({ erreur: "Intérêt non enregistré" }, 400);
  if (interet.discord_le) return json({ poste: false, raison: "Le vendeur a déjà été prévenu" });

  const { data: membres } = await admin.from("membres").select("id, pseudo, discord_id").in("id", [v.membre_id, user.id]);
  const vendeur = membres?.find((m: { id: string }) => m.id === v.membre_id);
  const acheteur = membres?.find((m: { id: string }) => m.id === user.id);
  if (!vendeur?.discord_id) return json({ poste: false, raison: "Vendeur sans compte Discord" });
  const site = Deno.env.get("SITE_URL") ?? "https://guilde-nine.vercel.app";
  const message = {
    content: `🛍️ <@${vendeur.discord_id}> : **${acheteur?.pseudo ?? "Un membre"}** est intéressé par ton **${String(v.objet_nom).slice(0, 120)}** (${kamas(v.prix)}) à la Brocante des boulets. ${site}/brocante#vente-${v.id}`,
    allowed_mentions: { users: [vendeur.discord_id] }, // seul le vendeur est notifié
  };
  const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(message) }).catch(() => null);
  if (!r?.ok) return json({ poste: false, raison: "Discord n'a pas accepté le message" }, 502);
  await admin.from("brocante_interets").update({ discord_le: new Date().toISOString() }).eq("vente_id", v.id).eq("membre_id", user.id);
  return json({ poste: true });
});
