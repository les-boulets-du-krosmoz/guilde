import { useState } from "react";
import { supabase } from "../lib/supabase";

// Parchemins de caractéristique achetés aux marchands des temples de classe contre des doplons.
// Chaque type ne s'utilise que tant que la caractéristique parchotée est sous son seuil ; maximum 100.
// On parchote une caractéristique à la fois : le simulateur raisonne sur une seule caractéristique.
type Type = { id: string; nom: string; prix: number; gain: number; seuil: number };
export const TYPES: Type[] = [
  { id: "petit", nom: "Petit", prix: 20, gain: 1, seuil: 25 },
  { id: "normal", nom: "Normal", prix: 60, gain: 1, seuil: 50 },
  { id: "grand", nom: "Grand", prix: 140, gain: 1, seuil: 80 },
  { id: "puissant", nom: "Puissant", prix: 340, gain: 2, seuil: 100 },
];
const MAX = 100;
const nb = (n: number) => n.toLocaleString("fr-FR");

/** Parchemins nécessaires pour passer de `depart` au seuil de chaque type, dans l'ordre des paliers. */
function besoin(t: Type, niveau: number): number {
  if (niveau >= t.seuil) return 0;
  return Math.ceil((t.seuil - niveau) / t.gain);
}

/** Une caractéristique, de `depart` vers 100, avec `doplons` : ce qu'on achète à chaque palier et où on arrive. */
export function simuler(depart: number, doplons: number) {
  let niveau = depart; // où on arrive vraiment avec les doplons
  let prevu = depart; // où on serait en complétant chaque palier (pour compter les parchemins nécessaires)
  let reste = doplons;
  const achats = new Map<string, { pris: number; besoin: number }>();
  let bloque = false;
  for (const t of TYPES) {
    const n = besoin(t, prevu);
    prevu = Math.min(MAX, prevu + n * t.gain);
    const pris = bloque ? 0 : Math.min(n, Math.floor(reste / t.prix));
    achats.set(t.id, { pris, besoin: n });
    reste -= pris * t.prix;
    niveau = Math.min(MAX, niveau + pris * t.gain);
    if (pris < n) bloque = true; // on ne saute pas un palier : le type suivant ne serait pas encore utilisable
  }
  const coutTotal = TYPES.reduce((s, t) => s + (achats.get(t.id)!.besoin * t.prix), 0);
  return { niveau, reste, achats, coutTotal };
}

/** Doplons gagnés avec les avis livrés, et simulateur de parchotage d'une caractéristique. */
export function SimulateurParchos({ personnageId, modifiable, depensesInitiales, doplonsGagnes, alitons, kamasGlace }: {
  personnageId: string;
  modifiable: boolean;
  depensesInitiales: number;
  doplonsGagnes: number;
  alitons: number;
  kamasGlace: number;
}) {
  const [depenses, setDepenses] = useState(depensesInitiales);
  const [saisieDepenses, setSaisieDepenses] = useState<string | null>(null); // null = pas en cours d'édition
  const [erreur, setErreur] = useState<string | null>(null);
  const reste = Math.max(0, doplonsGagnes - depenses);
  const [saisie, setSaisie] = useState(String(reste));
  const [deja, setDeja] = useState("0");
  const doplons = /^\d+$/.test(saisie.trim()) ? Number(saisie) : 0;
  const depart = /^\d+$/.test(deja.trim()) ? Math.min(MAX, Number(deja)) : 0;
  const r = simuler(depart, doplons);
  // Ce qui reste après cette caractéristique, appliqué à une autre en partant de 0.
  const suivante = r.niveau >= MAX && r.reste > 0 ? simuler(0, r.reste).niveau : 0;

  async function enregistrerDepenses() {
    const v = (saisieDepenses ?? "").trim();
    if (!/^\d+$/.test(v)) {
      setErreur("Indique un nombre entier de doplons.");
      return;
    }
    const { error } = await supabase.from("personnages").update({ doplons_depenses: Number(v) }).eq("id", personnageId);
    if (error) {
      setErreur("Enregistrement impossible : " + error.message);
      return;
    }
    const n = Number(v);
    setDepenses(n);
    setSaisie(String(Math.max(0, doplonsGagnes - n))); // le simulateur repart du nouveau reste
    setSaisieDepenses(null);
    setErreur(null);
  }

  return (
    <section className="carte doplons">
      <div className="doplons__total">
        <strong>{nb(reste)} doplons</strong> restants
        <span className="discret">
          {" "}: {nb(doplonsGagnes)} gagnés avec les avis livrés{depenses > 0 && `, ${nb(depenses)} dépensés`}
          {(alitons > 0 || kamasGlace > 0) && <> (et {[alitons > 0 && `${nb(alitons)} alitons`, kamasGlace > 0 && `${nb(kamasGlace)} kamas de glace`].filter(Boolean).join(", ")})</>}
        </span>
        {modifiable && saisieDepenses === null && (
          <> · <button type="button" className="lien-bouton" onClick={() => setSaisieDepenses(String(depenses))}>{depenses > 0 ? "Modifier les dépenses" : "Indiquer les doplons dépensés"}</button></>
        )}
      </div>
      {modifiable && saisieDepenses !== null && (
        <div className="doplons__depenses">
          <label htmlFor="doplons-depenses">Doplons déjà dépensés</label>
          <input id="doplons-depenses" inputMode="numeric" value={saisieDepenses} onChange={(e) => setSaisieDepenses(e.target.value)} onKeyDown={(e) => e.key === "Enter" && enregistrerDepenses()} />
          <button type="button" className="bouton bouton--vert" onClick={enregistrerDepenses}>Enregistrer</button>
          <button type="button" className="bouton" onClick={() => { setSaisieDepenses(null); setErreur(null); }}>Annuler</button>
          {erreur && <span className="erreur" role="alert">{erreur}</span>}
        </div>
      )}

      <details className="doplons__simu">
        <summary>Simulateur de parchemins</summary>
        <div className="doplons__reglages">
          <div className="champ">
            <label htmlFor="doplons-dispo">Doplons disponibles</label>
            <input id="doplons-dispo" inputMode="numeric" value={saisie} onChange={(e) => setSaisie(e.target.value)} />
          </div>
          <div className="champ">
            <label htmlFor="doplons-deja">Déjà parchoté dans la caractéristique</label>
            <input id="doplons-deja" inputMode="numeric" value={deja} onChange={(e) => setDeja(e.target.value)} />
          </div>
        </div>

        <table className="doplons__table">
          <thead>
            <tr><th>Parchemin</th><th>Prix</th><th>Nécessaires</th><th>À prendre</th></tr>
          </thead>
          <tbody>
            {TYPES.map((t) => {
              const a = r.achats.get(t.id)!;
              return (
                <tr key={t.id} className={a.besoin === 0 ? "doplons__passe" : ""}>
                  <td>{t.nom} <span className="discret">(+{t.gain}, jusqu'à {t.seuil})</span></td>
                  <td>{t.prix}</td>
                  <td>{a.besoin}</td>
                  <td><strong>{a.pris}</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="doplons__bilan">
          {depart >= MAX
            ? <>Cette caractéristique est déjà à 100.</>
            : r.niveau >= MAX
              ? <>La caractéristique monte à <strong>100</strong> pour {nb(r.coutTotal)} doplons. Il te restera {nb(r.reste)} doplons{suivante > 0 && <>, de quoi monter une autre caractéristique jusqu'à <strong>{suivante}</strong></>}.</>
              : <>La caractéristique monte de {depart} à <strong>{r.niveau}</strong>. Pour aller jusqu'à 100, il faut {nb(r.coutTotal)} doplons au total, soit {nb(r.coutTotal - (doplons - r.reste))} de plus.</>}
        </p>
      </details>
    </section>
  );
}
