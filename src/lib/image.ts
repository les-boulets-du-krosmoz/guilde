/** Renvoie un message d'erreur, ou null si l'URL est acceptable. Même règles que la contrainte SQL. */
export function validerImageUrl(url: string): string | null {
  const u = url.trim();
  if (u === "") return null;
  if (u.length > 500) return "L'adresse est trop longue (500 caractères maximum).";
  let parsed: URL;
  try {
    parsed = new URL(u);
  } catch {
    return "Ce n'est pas une adresse valide.";
  }
  if (parsed.protocol !== "https:") return "Seules les adresses en https:// sont acceptées.";
  if (/^(cdn|media)\.discordapp\.(com|net)$/i.test(parsed.hostname) && parsed.pathname.startsWith("/attachments/")) {
    return "Les liens d'images Discord expirent au bout d'un jour. Héberge l'image ailleurs.";
  }
  return null;
}

export function initiales(nom: string): string {
  return nom.replace(/[^\p{L}\p{N}]/gu, "").slice(0, 2).toUpperCase() || "?";
}
