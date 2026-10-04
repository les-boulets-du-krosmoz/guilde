import { useState } from "react";
import { OCRE_ARCHIS_TOTAL, OCRE_BOSS_TOTAL } from "../data/constantes";
import { enregistrerOcre, type SaisieOcre } from "../lib/donnees";

type Initial = { archis?: number | null; archisTotal?: number | null; boss?: number | null; bossTotal?: number | null };

/** Archimonstres et boss du Dofus Ocre, saisis à la main : réunis / total, pour un personnage. */
export function FormulaireOcre({ personnageId, initial, onFini, onAnnuler }: {
  personnageId: string;
  initial: Initial;
  onFini: () => void;
  onAnnuler?: () => void;
}) {
  const texte = (v?: number | null) => (v === null || v === undefined ? "" : String(v));
  const [v, setV] = useState({
    archis: texte(initial.archis),
    archisTotal: texte(initial.archisTotal ?? OCRE_ARCHIS_TOTAL),
    boss: texte(initial.boss),
    bossTotal: texte(initial.bossTotal ?? OCRE_BOSS_TOTAL),
  });
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  async function enregistrer() {
    const n = (x: string) => (/^\d+$/.test(x.trim()) ? Number(x) : NaN);
    const saisie: SaisieOcre = { archis: n(v.archis), archisTotal: n(v.archisTotal), boss: n(v.boss), bossTotal: n(v.bossTotal) };
    if (Object.values(saisie).some(Number.isNaN) || saisie.archisTotal === 0 || saisie.bossTotal === 0) {
      setErreur("Remplis les quatre nombres (les totaux ne peuvent pas valoir 0).");
      return;
    }
    if (saisie.archis > saisie.archisTotal || saisie.boss > saisie.bossTotal) {
      setErreur("Le nombre réuni ne peut pas dépasser le total.");
      return;
    }
    setEnCours(true);
    try {
      await enregistrerOcre(personnageId, saisie);
      setErreur(null);
      onFini();
    } catch (e) {
      setErreur("Enregistrement impossible : " + (e as Error).message);
    }
    setEnCours(false);
  }

  const champ = (cle: keyof typeof v, libelle: string) => (
    <input inputMode="numeric" aria-label={libelle} value={v[cle]} onChange={(e) => setV({ ...v, [cle]: e.target.value })} />
  );

  return (
    <div className="ocre-saisie__bloc">
      <div className="ocre-saisie">
        <label>
          Archimonstres
          <span className="ocre-saisie__paire">{champ("archis", "Archimonstres réunis")} / {champ("archisTotal", "Total d'archimonstres")}</span>
        </label>
        <label>
          Boss
          <span className="ocre-saisie__paire">{champ("boss", "Boss réunis")} / {champ("bossTotal", "Total de boss")}</span>
        </label>
        <button type="button" className="bouton bouton--vert" onClick={enregistrer} disabled={enCours}>Enregistrer</button>
        {onAnnuler && <button type="button" className="bouton" onClick={onAnnuler}>Annuler</button>}
      </div>
      {erreur && <span className="erreur" role="alert">{erreur}</span>}
    </div>
  );
}
