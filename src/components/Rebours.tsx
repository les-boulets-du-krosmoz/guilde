import { useEffect, useState } from "react";

// Compte à rebours jusqu'à la prochaine remise à zéro, à l'heure de Paris (celle des serveurs) :
// chaque jour à minuit, ou chaque lundi à minuit.

function partiesParis(d: Date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(d).map((x) => [x.type, x.value]));
  return { jour: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(p.weekday), minutes: Number(p.hour) * 60 + Number(p.minute) };
}

/** Minutes restantes avant la prochaine remise à zéro. */
export function minutesAvantRemise(periode: "jour" | "semaine", maintenant = new Date()): number {
  const { jour, minutes } = partiesParis(maintenant);
  const avantMinuit = 24 * 60 - minutes;
  return periode === "jour" ? avantMinuit : (6 - jour) * 24 * 60 + avantMinuit;
}

export function formaterDuree(min: number): string {
  const j = Math.floor(min / 1440), h = Math.floor((min % 1440) / 60), m = min % 60;
  if (j > 0) return `${j} j ${h} h`;
  if (h > 0) return `${h} h ${String(m).padStart(2, "0")}`;
  return `${m} min`;
}

export function Rebours({ periode }: { periode: "jour" | "semaine" }) {
  const [, setTic] = useState(0);
  useEffect(() => { const t = window.setInterval(() => setTic((n) => n + 1), 30_000); return () => window.clearInterval(t); }, []);
  return <time>{formaterDuree(minutesAvantRemise(periode))}</time>;
}
