// Almanax du jour (et du lendemain) depuis l'API dofusdude, la même que notre site Almanax.
// Le jour de l'Almanax change à minuit, heure de Paris. Réponses gardées pour la session (une requête par jour).

export type JourAlmanax = {
  date: string; // AAAA-MM-JJ
  bonus: string;
  typeBonus: string;
  offrande: { nom: string; quantite: number; icone: string | null };
  kamas: number | null;
};

export const SITE_ALMANAX = "https://les-perdus-du-krosmoz.github.io/almanax/";

/** Date du jour à Paris, décalée de `decalage` jours, au format AAAA-MM-JJ. */
export function dateParis(decalage = 0): string {
  const d = new Date(Date.now() + decalage * 86400e3);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

type ReponseApi = {
  date: string;
  bonus?: { description?: string; type?: { name?: string } };
  tribute?: { item?: { name?: string; image_urls?: { icon?: string } }; quantity?: number };
  reward_kamas?: number | null;
};

export async function chargerAlmanax(date: string): Promise<JourAlmanax> {
  const cle = `almanax:${date}`;
  try {
    const garde = sessionStorage.getItem(cle);
    if (garde) return JSON.parse(garde) as JourAlmanax;
  } catch { /* stockage indisponible : on interroge l'API */ }
  const r = await fetch(`https://api.dofusdu.de/dofus3/v1/fr/almanax/${date}`);
  if (!r.ok) throw new Error(`Almanax indisponible (${r.status})`);
  const d = (await r.json()) as ReponseApi;
  const jour: JourAlmanax = {
    date,
    bonus: d.bonus?.description ?? "",
    typeBonus: d.bonus?.type?.name ?? "Bonus",
    offrande: { nom: d.tribute?.item?.name ?? "?", quantite: d.tribute?.quantity ?? 1, icone: d.tribute?.item?.image_urls?.icon ?? null },
    kamas: d.reward_kamas ?? null,
  };
  try { sessionStorage.setItem(cle, JSON.stringify(jour)); } catch { /* sans importance */ }
  return jour;
}
