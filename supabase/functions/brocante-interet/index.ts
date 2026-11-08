// La Brocante des boulets sur Discord, deux actions :
//   - « vente » : annonce un objet qui vient d'être mis en vente (une seule fois, par son vendeur) ;
//   - « interet » (par défaut) : prévient le vendeur qu'un membre est intéressé (une fois par membre et par objet).
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

  const { vente_id, action } = await req.json().catch(() => ({}));
  const { data: v } = await admin.from("brocante").select("*").eq("id", vente_id).single();
  if (!v) return json({ erreur: "Objet introuvable" }, 404);
  const site = Deno.env.get("SITE_URL") ?? "https://guilde-nine.vercel.app";

  if (action === "vente") {
    // Seul le vendeur annonce son objet, et une seule fois.
    if (v.membre_id !== user.id) return json({ erreur: "Ce n'est pas ton objet" }, 403);
    if (v.discord_le) return json({ poste: false, raison: "Déjà annoncé" });
    const { data: vendeur } = await admin.from("membres").select("pseudo").eq("id", v.membre_id).single();
    const stats = (Array.isArray(v.stats) ? v.stats : []).slice(0, 15)
      .map((s: { libelle: string; valeur: number; min?: number; max?: number; fixe?: boolean }) =>
        s.fixe && s.min !== undefined && s.min !== s.max ? `${s.min} à ${s.max} ${s.libelle}` : `${s.valeur}${String(s.libelle).startsWith("%") ? "" : " "}${s.libelle}`)
      .join("\n");
    const reduc = v.prix_hdv && v.prix_hdv > v.prix ? ` (−${Math.round((1 - v.prix / v.prix_hdv) * 100)} % sur l'HDV)` : "";
    const message = {
      content: `🛍️ Nouvel objet à la Brocante des boulets, proposé par **${vendeur?.pseudo ?? "un membre"}**`,
      embeds: [{
        title: `${String(v.objet_nom).slice(0, 120)} · niv. ${v.objet_niveau}`,
        url: `${site}/brocante#vente-${v.id}`,
        color: 0xe0b25c,
        description: `**${kamas(v.prix)}**${reduc}\n\n${stats}${v.note ? `\n\n« ${String(v.note).slice(0, 300)} »` : ""}`,
        ...(v.objet_icone ? { thumbnail: { url: `${site}/icones/objets/${v.objet_icone}.webp` } } : {}), // image hébergée par le site
        footer: { text: "Clique sur le titre, puis « Intéressé » pour prévenir le vendeur." },
      }],
      allowed_mentions: { parse: [] }, // aucune mention : une annonce, pas une notification
    };
    const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(message) }).catch(() => null);
    if (!r?.ok) return json({ poste: false, raison: "Discord n'a pas accepté le message" }, 502);
    await admin.from("brocante").update({ discord_le: new Date().toISOString() }).eq("id", v.id);
    return json({ poste: true });
  }

  if (v.membre_id === user.id) return json({ poste: false, raison: "C'est ton propre objet" });
  // L'intérêt doit avoir été enregistré par le site, et ne pas avoir déjà été signalé.
  const { data: interet } = await admin.from("brocante_interets").select("discord_le").eq("vente_id", v.id).eq("membre_id", user.id).single();
  if (!interet) return json({ erreur: "Intérêt non enregistré" }, 400);
  if (interet.discord_le) return json({ poste: false, raison: "Le vendeur a déjà été prévenu" });

  const { data: membres } = await admin.from("membres").select("id, pseudo, discord_id").in("id", [v.membre_id, user.id]);
  const vendeur = membres?.find((m: { id: string }) => m.id === v.membre_id);
  const acheteur = membres?.find((m: { id: string }) => m.id === user.id);
  if (!vendeur?.discord_id) return json({ poste: false, raison: "Vendeur sans compte Discord" });
  const message = {
    content: `🛍️ <@${vendeur.discord_id}> : **${acheteur?.pseudo ?? "Un membre"}** est intéressé par ton **${String(v.objet_nom).slice(0, 120)}** (${kamas(v.prix)}) à la Brocante des boulets. ${site}/brocante#vente-${v.id}`,
    allowed_mentions: { users: [vendeur.discord_id] }, // seul le vendeur est notifié
  };
  const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(message) }).catch(() => null);
  if (!r?.ok) return json({ poste: false, raison: "Discord n'a pas accepté le message" }, 502);
  await admin.from("brocante_interets").update({ discord_le: new Date().toISOString() }).eq("vente_id", v.id).eq("membre_id", user.id);
  return json({ poste: true });
});
