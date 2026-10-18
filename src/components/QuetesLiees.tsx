import { QUETES_DONJONS, type QueteLieeDonjon } from "../data/quetesDonjons";
import { ouEstLaQuete, TOUTES_LES_QUETES } from "../data/series";
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
/** Série et numéro d'étape d'une quête liée (« Dofus Sylvestre, étape 21 », « Brâkmar n° 87 »), pour comprendre d'où vient sa case. */
function origine(id: string): string | null {
  const o = ouEstLaQuete(id);
  if (!o) return null;
  const rang = o.quete.numero ?? o.serie.quetes.findIndex((x) => x.id === id) + 1;
  const nom = o.categorie.estDofus ? `Dofus ${o.serie.nom}` : o.serie.nom;
  return o.quete.numero !== undefined ? `${nom} n° ${rang}` : `${nom}, étape ${rang}`;
}

export function QuetesLiees({ donjon, faites, modifiable, onBasculer, bossVaincu, boss }: {
  donjon: string;
  faites: Set<string>;
  modifiable: boolean;
  onBasculer: (queteId: string, faite: boolean) => void;
  /** Le boss du donjon est-il marqué vaincu (étape ou succès « Vaincre ») ? null = on ne sait pas. */
  bossVaincu?: boolean | null;
  boss?: string;
}) {
  const liste = quetesLiees(donjon);
  if (!liste.length) return null;
  const nb = liste.filter((q) => faites.has(q.id)).length;
  // Croisement avec le donjon : une quête qui demande de vaincre ce boss, cochée alors que le boss n'est pas marqué vaincu.
  const aVerifier = (q: (typeof liste)[number]) =>
    bossVaincu === false && faites.has(q.id) && !!boss && q.objectif.toLowerCase().includes(`vaincre ${boss.toLowerCase()}`);
  return (
    <div className="quetes-liees">
      <span className="quetes-liees__titre">
        Quêtes liées <span className={nb === liste.length ? "vert" : "discret"}>({nb} / {liste.length})</span>
        {boss && bossVaincu != null && <span className="discret"> · {boss} {bossVaincu ? "vaincu ✓" : "pas encore vaincu"}</span>}
      </span>
      <ul>
        {liste.map((q) => (
          <li key={q.id} className={faites.has(q.id) ? "quetes-liees--faite" : ""}>
            <label className="case">
              <input type="checkbox" checked={faites.has(q.id)} disabled={!modifiable} onChange={() => onBasculer(q.id, !faites.has(q.id))} />
              <span className="quetes-liees__nom">{q.nom}</span>
            </label>
            <span className="discret-taille">niv. {q.niveau}{origine(q.id) && <> · {origine(q.id)}</>}</span>
            {aVerifier(q) && (
              <span className="quetes-liees__alerte" title="Cette case vient de la série indiquée (cochée avec les étapes précédentes, par exemple). Décoche-la si tu ne l'as pas faite.">
                ⚠ cochée, mais {boss} n'est pas encore marqué vaincu : à vérifier
              </span>
            )}
            {/* Ce qu'il faut faire dans ce donjon, avec la salle : affiché au survol de la quête (ou quand sa case a le focus) */}
            <ul className="quetes-liees__infobulle" role="tooltip">
              {q.objectif.split(" ; ").map((a, k) => {
                const [action, salle] = a.split(" · ");
                return <li key={k}>{action}{salle && <strong className="quetes-liees__salle"> · {salle}</strong>}</li>;
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
