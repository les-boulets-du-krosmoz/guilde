import { QUETES_DONJONS, type QueteLieeDonjon } from "../data/quetesDonjons";
import { TOUTES_LES_QUETES } from "../data/series";
import { donjonDuBoss } from "../data/succesDonjons";

const norme = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
// Une quête liée qui porte le nom d'une étape d'une série du site (ex. une quête d'un Dofus primordial) est la même quête :
// on reprend l'identifiant de l'étape, pour qu'elle soit cochée aux deux endroits.
const ETAPES_PAR_NOM = new Map(TOUTES_LES_QUETES.map((q) => [norme(q.nom), q.id]));
// Quête du Tour du monde ou d'Emma Tom Pouce : c'est l'étape de ce donjon dans la série (vaincre le Rasboul chez Emma
// = la quête « Tour à tour »). On reprend l'identifiant de l'étape : cocher l'une coche l'autre.
const etapeDeSerie = (serie: string, donjon: string) =>
  TOUTES_LES_QUETES.find((e) => e.dofus === serie && donjonDuBoss(e.nom)?.nom === donjon)?.id;
const resoudre = (donjon: string, q: QueteLieeDonjon): QueteLieeDonjon => {
  const etape = q.serie ? etapeDeSerie(q.serie, donjon) : undefined;
  if (etape) return { ...q, id: etape };
  return q.id.startsWith("dql-") && ETAPES_PAR_NOM.has(norme(q.nom)) ? { ...q, id: ETAPES_PAR_NOM.get(norme(q.nom))! } : q;
};
const RESOLUES: Record<string, QueteLieeDonjon[]> = Object.fromEntries(Object.entries(QUETES_DONJONS).map(([d, l]) => [d, l.map((q) => resoudre(d, q))]));

export const quetesLiees = (donjon: string | undefined) => (donjon ? RESOLUES[donjon] ?? [] : []);
/** Identifiants de toutes les quêtes liées (pour savoir lesquelles un personnage a faites). */
export const TOUS_IDS_LIEES = [...new Set(Object.values(RESOLUES).flat().map((q) => q.id))];

/**
 * Quêtes liées à un donjon (un objectif demande de vaincre son boss), à cocher pour le personnage.
 * Seulement l'essentiel pour préparer la sortie : nom, niveau, ce qu'il faut faire dans ce donjon.
 */
export function QuetesLiees({ donjon, faites, modifiable, onBasculer }: {
  donjon: string;
  faites: Set<string>;
  modifiable: boolean;
  onBasculer: (queteId: string, faite: boolean) => void;
}) {
  const liste = quetesLiees(donjon);
  if (!liste.length) return null;
  const nb = liste.filter((q) => faites.has(q.id)).length;
  return (
    <div className="quetes-liees">
      <span className="quetes-liees__titre">Quêtes liées <span className={nb === liste.length ? "vert" : "discret"}>({nb} / {liste.length})</span></span>
      <ul>
        {liste.map((q) => (
          <li key={q.id} className={faites.has(q.id) ? "quetes-liees--faite" : ""}>
            <label className="case">
              <input type="checkbox" checked={faites.has(q.id)} disabled={!modifiable} onChange={() => onBasculer(q.id, !faites.has(q.id))} />
              <span className="quetes-liees__nom">{q.nom}</span>
            </label>
            <span className="discret-taille">niv. {q.niveau} · {q.objectif}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
