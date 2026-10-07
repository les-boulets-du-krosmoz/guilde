import { useMemo, useState } from "react";
import { donjonDeLEtape } from "../data/donjons";
import { CATEGORIES } from "../data/series";
import { cleDonjon, donjonDuBoss, DONJONS_SUCCES, normaliser, TRANCHES, trancheDe, type Tranche } from "../data/succesDonjons";

// Guide DPLN des donjons croisés dans les séries (Tour du monde, Emma, Frigost), par ligne du tableau.
const GUIDES = new Map(
  CATEGORIES.filter((c) => !c.estDofus)
    .flatMap((c) => c.series.flatMap((s) => s.quetes))
    .flatMap((e) => {
      const dj = donjonDuBoss(e.nom);
      const guide = donjonDeLEtape(e.id);
      return dj && guide ? [[cleDonjon(dj), guide.page] as const] : [];
    }),
);
const SITE_DPLN = "https://www.dofuspourlesnoobs.com/";
import { estDispo, type Membre, type Personnage, type SuccesDonjon } from "../lib/types";
import { BoutonDefi } from "./BoutonDefi";
import { ChoixPersonnage } from "./ChoixPersonnage";
import { IconeDonjon, imageDonjon } from "./IconeDonjon";

type Props = {
  perso: Personnage;
  modifiable: boolean;
  succes: SuccesDonjon[];
  persos: Map<string, Personnage>;
  membres: Map<string, Membre>;
  onBasculer: (succesId: string, personnageId: string) => void;
  onPlusieurs: (succesIds: string[], fait: boolean, personnageId: string) => void;
  /** Membre connecté : il peut cocher pour tous ses personnages, et seulement pour eux. */
  moiMembreId?: string;
};

/**
 * Tous les succès de donjon : une ligne par boss, une case par succès (6 au plus), par tranche de niveau.
 * « Mes succès » : la checklist du personnage. « Guilde » : pour chaque succès, combien de personnages ayant
 * au moins le niveau du donjon ne l'ont pas encore (un succès pas fait est un succès qu'on souhaite faire).
 */
export function TableauSucces({ perso, modifiable, succes, persos, membres, onBasculer, onPlusieurs, moiMembreId }: Props) {
  // Personnage affiché : celui de la page au départ, puis n'importe quel personnage de la guilde.
  const [vuId, setVuId] = useState(perso.id);
  const vu = persos.get(vuId) ?? perso;
  // On ne coche que pour ses propres personnages.
  const editable = moiMembreId ? vu.membre_id === moiMembreId : modifiable && vu.id === perso.id;
  const [tranche, setTranche] = useState<Tranche>(TRANCHES[0]);
  // Comparer les succès du personnage affiché avec ceux de mon personnage (celui de la page).
  const [comparer, setComparer] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [mode, setMode] = useState<"moi" | "guilde">("moi");
  const [masquerFinis, setMasquerFinis] = useState(false);
  const [seulementDispos, setSeulementDispos] = useState(false);

  // Succès -> personnages qui l'ont réussi.
  const faits = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const s of succes) {
      if (s.statut !== "fait") continue;
      if (!m.has(s.succes_id)) m.set(s.succes_id, new Set());
      m.get(s.succes_id)!.add(s.personnage_id);
    }
    return m;
  }, [succes]);
  const mesFaits = (id: string) => faits.get(id)?.has(vu.id) ?? false;

  const reussisVu = [...faits.values()].filter((set) => set.has(vu.id)).length;
  const dispo = (p: Personnage) => estDispo(membres.get(p.membre_id), p.id);

  // Une recherche parcourt toutes les tranches ; sinon, seule la tranche choisie s'affiche.
  const q = normaliser(recherche);
  const lignes = DONJONS_SUCCES
    .filter((d) => (q ? normaliser(`${d.nom} ${d.boss}`).includes(q) : trancheDe(d.niveau) === tranche))
    .filter((d) => !(masquerFinis && mode === "moi" && d.succes.every((s) => mesFaits(s.id))));

  /** Personnages ayant au moins le niveau du donjon qui n'ont pas ce succès. */
  const aFaire = (succesId: string, niveau: number) =>
    [...persos.values()].filter((p) => p.niveau >= niveau && !(faits.get(succesId)?.has(p.id) ?? false) && (!seulementDispos || dispo(p)));

  const victoires = lignes.flatMap((d) => d.succes.filter((s) => s.libelle === "Vaincre" && !mesFaits(s.id)).map((s) => s.id));

  return (
    <section className="tableau-succes">
      <div className="onglets" role="group" aria-label="Tranche de niveau">
        {TRANCHES.map((t) => (
          <button key={t} type="button" className={`onglet ${!q && t === tranche ? "onglet--actif" : ""}`} aria-pressed={!q && t === tranche}
            onClick={() => { setTranche(t); setRecherche(""); }}>
            Niv. {t}
          </button>
        ))}
      </div>

      <div className="tableau-succes__outils">
        <input type="search" placeholder="Rechercher un donjon ou un boss…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher un donjon ou un boss" />
        <div className="onglets onglets--mini" role="group" aria-label="Affichage">
          <ChoixPersonnage persos={[...persos.values()]} membres={membres} valeur={vu} moiId={moiMembreId} actif={mode === "moi"}
            onChoix={(p) => { setVuId(p.id); setMode("moi"); }} />
          <button type="button" className={`onglet ${mode === "guilde" ? "onglet--actif" : ""}`} aria-pressed={mode === "guilde"} onClick={() => setMode("guilde")}>Guilde</button>
        </div>
        {mode === "moi" ? (
          <label className="case"><input type="checkbox" checked={masquerFinis} onChange={() => setMasquerFinis(!masquerFinis)} /> Masquer les donjons terminés</label>
        ) : (
          <label className="case"><input type="checkbox" checked={seulementDispos} onChange={() => setSeulementDispos(!seulementDispos)} /> Seulement les membres dispo</label>
        )}
        {mode === "moi" && editable && victoires.length > 0 && (
          <button type="button" className="lien-bouton" onClick={() => onPlusieurs(victoires, true, vu.id)}>Cocher toutes les victoires affichées ({victoires.length})</button>
        )}
        {mode === "moi" && modifiable && vu.id !== perso.id && (
          <label className="case"><input type="checkbox" checked={comparer} onChange={() => setComparer(!comparer)} /> Comparer avec mes succès ({perso.nom})</label>
        )}
        {mode === "moi" && (
          <span className="discret">{vu.nom} : {reussisVu} succès réussis{editable ? "" : " (lecture seule)"}</span>
        )}
      </div>

      {lignes.length === 0 ? (
        <p className="vide">Aucun donjon ne correspond.</p>
      ) : (
        <ul className="tableau-succes__lignes">
          {lignes.map((d) => {
            const restants = d.succes.filter((s) => !mesFaits(s.id)).map((s) => s.id);
            return (
              <li key={cleDonjon(d)} className="tableau-succes__ligne">
                <div className="tableau-succes__donjon">
                  <IconeDonjon fichier={d.icone} taille={32} titre={d.boss} />
                  <div>
                    {(() => {
                      const guide = GUIDES.get(cleDonjon(d));
                      return guide
                        ? <a href={`${SITE_DPLN}${guide}`} target="_blank" rel="noreferrer" title="Guide du donjon sur Dofus pour les Noobs"><strong>{d.nom}</strong></a>
                        : <strong>{d.nom}</strong>;
                    })()}
                    <span className="discret">niv. {d.niveau} · {d.boss}{q ? ` · tranche ${trancheDe(d.niveau)}` : ""}</span>
                  </div>
                </div>
                <div className="tableau-succes__cases">
                  {d.succes.map((s) => {
                    const image = s.icone ? undefined : imageDonjon(d.icone);
                    if (mode === "moi") {
                      return (
                        <BoutonDefi key={s.id} libelle={s.libelle} description={s.description} points={s.points} icone={s.icone} image={image}
                          fait={mesFaits(s.id)} faitPar={[...(faits.get(s.id) ?? [])].map((id) => persos.get(id)?.nom ?? "?")}
                          comparaison={comparer && modifiable && vu.id !== perso.id ? (faits.get(s.id)?.has(perso.id) ?? false) : undefined}
                          modifiable={editable} onBasculer={() => onBasculer(s.id, vu.id)} />
                      );
                    }
                    const qui = aFaire(s.id, d.niveau);
                    const liste = qui.map((p) => `${p.nom}${dispo(p) ? " (dispo)" : ""}`).join(", ");
                    return (
                      <BoutonDefi key={s.id} libelle={`${s.libelle} · ${qui.length}`} points={s.points} icone={s.icone} image={image}
                        description={`${s.description}\n${qui.length ? `À faire : ${liste}` : "Plus personne d'éligible ne l'a à faire."}`}
                        fait={qui.length === 0} modifiable={false} onBasculer={() => {}} />
                    );
                  })}
                </div>
                {mode === "moi" && editable && (
                  <button type="button" className="lien-bouton tableau-succes__tout"
                    onClick={() => (restants.length ? onPlusieurs(restants, true, vu.id) : onPlusieurs(d.succes.map((s) => s.id), false, vu.id))}>
                    {restants.length ? "Tout cocher" : "Tout décocher"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <p className="discret tableau-succes__legende">
        {mode === "moi"
          ? "✗ rouge : pas encore obtenu. ✓ vert : obtenu. Survole un succès pour lire sa condition."
          : "Le chiffre de chaque case : personnages ayant au moins le niveau du donjon qui n'ont pas encore ce succès. Survole pour voir qui."}
      </p>
    </section>
  );
}
