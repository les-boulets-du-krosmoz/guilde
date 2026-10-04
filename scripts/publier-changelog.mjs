// Lit la section « ## À publier » de CHANGELOG.md, la poste sur le webhook Discord en liste à puces avec le numéro
// de version de package.json, puis vide la section (le salon Discord sert d'historique). Sans nouveauté, ne fait rien.
// Variables : DISCORD_WEBHOOK_URL (obligatoire), SITE_URL (facultatif), CHANGELOG (chemin, pour les tests).
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";

const FICHIER = process.env.CHANGELOG ?? "CHANGELOG.md";
const TITRE_A_PUBLIER = "## À publier";
const LIMITE_DISCORD = 1900; // 2 000 caractères par message, avec une marge.

function sortie(cle, valeur) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${cle}=${valeur}\n`);
}

const texte = readFileSync(FICHIER, "utf8");
const debut = texte.indexOf(TITRE_A_PUBLIER);
if (debut === -1) {
  console.error(`Section « ${TITRE_A_PUBLIER} » introuvable dans ${FICHIER}.`);
  process.exit(1);
}
const corps = texte.indexOf("\n", debut) + 1;
const suivante = texte.indexOf("\n## ", corps);
const fin = suivante === -1 ? texte.length : suivante + 1;
const lignes = texte.slice(corps, fin).split("\n").filter((l) => /^\s*[-*] /.test(l)).map((l) => l.trim().replace(/^[-*] /, ""));

if (lignes.length === 0) {
  console.log("Rien à publier.");
  sortie("publie", "false");
  process.exit(0);
}

const webhook = process.env.DISCORD_WEBHOOK_URL;
if (!webhook) {
  console.error("Le secret DISCORD_WEBHOOK_URL n'est pas défini.");
  process.exit(1);
}

const date = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(new Date());
let version = "";
try {
  version = JSON.parse(readFileSync(process.env.PACKAGE_JSON ?? "package.json", "utf8")).version ?? "";
} catch {
  // Pas de package.json lisible : l'annonce part sans numéro.
}

// Découpe en messages de moins de 2 000 caractères, sans couper une ligne.
const entete = version ? `**Nouveautés du site — version ${version}** (${date})` : `**Nouveautés du site — ${date}**`;
const pied = process.env.SITE_URL ? `\n${process.env.SITE_URL}` : "";
const messages = [];
let courant = entete;
for (const l of lignes) {
  const puce = `\n• ${l}`;
  if (courant.length + puce.length > LIMITE_DISCORD) {
    messages.push(courant);
    courant = version ? `**Version ${version} (suite)**` : `**Nouveautés du site (suite)**`;
  }
  courant += puce;
}
if (courant.length + pied.length > LIMITE_DISCORD) {
  messages.push(courant);
  courant = pied.trim();
} else {
  courant += pied;
}
messages.push(courant);

for (const content of messages) {
  // allowed_mentions vide : un « @everyone » dans le changelog ne notifie personne.
  const reponse = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
  });
  if (!reponse.ok) {
    console.error(`Discord a refusé le message (${reponse.status}) : ${await reponse.text()}`);
    process.exit(1); // rien n'est archivé : la section sera retentée au prochain déploiement
  }
}

// La section repart vide : les lignes publiées ne restent pas dans le fichier.
writeFileSync(FICHIER, texte.slice(0, corps) + "\n" + texte.slice(fin));
console.log(`${lignes.length} nouveauté(s) postée(s) en ${messages.length} message(s).`);
sortie("publie", "true");
