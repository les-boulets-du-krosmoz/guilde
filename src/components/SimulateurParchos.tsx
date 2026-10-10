import { useState } from "react";
import { supabase } from "../lib/supabase";

// Parchemins de caractéristique achetés aux marchands des temples de classe contre des avitons.
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

/** Une caractéristique, de `depart` vers 100, avec `avitons` : ce qu'on achète à chaque palier et où on arrive. */
export function simuler(depart: number, avitons: number) {
  let niveau = depart; // où on arrive vraiment avec les avitons
  let prevu = depart; // où on serait en complétant chaque palier (pour compter les parchemins nécessaires)
  let reste = avitons;
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

/** Avitons gagnés avec les avis livrés, et simulateur de parchotage d'une caractéristique. */
export function SimulateurParchos({ personnageId, modifiable, soldeInitial, soldeLeInitial, gagnesDepuis, nbAvisDepuis, totalGagne, alitons, kamasGlace }: {
  personnageId: string;
  modifiable: boolean;
  /** Avitons restants saisis par le membre (null = jamais saisi) et date de la saisie. */
  soldeInitial: number | null;
  soldeLeInitial: string | null;
  /** Avitons des avis livrés depuis la saisie : ils s'ajoutent au solde. */
  gagnesDepuis: number;
  nbAvisDepuis: number;
  /** Total gagné avec tous les avis livrés (affiché tant qu'aucun solde n'est saisi). */
  totalGagne: number;
  alitons: number;
  kamasGlace: number;
}) {
  const [solde, setSolde] = useState(soldeInitial);
  const [soldeLe, setSoldeLe] = useState(soldeLeInitial);
  const [depuis, setDepuis] = useState({ avitons: gagnesDepuis, avis: nbAvisDepuis });
  const [saisieSolde, setSaisieSolde] = useState<string | null>(null); // null = pas en cours d'édition
  const [erreur, setErreur] = useState<string | null>(null);
  const reste = solde === null ? totalGagne : solde + depuis.avitons;
  const [saisie, setSaisie] = useState(String(reste));
  const [deja, setDeja] = useState("0");
  const avitons = /^\d+$/.test(saisie.trim()) ? Number(saisie) : 0;
  const depart = /^\d+$/.test(deja.trim()) ? Math.min(MAX, Number(deja)) : 0;
  const r = simuler(depart, avitons);
  // Ce qui reste après cette caractéristique, appliqué à une autre en partant de 0.
  const suivante = r.niveau >= MAX && r.reste > 0 ? simuler(0, r.reste).niveau : 0;

  async function enregistrerSolde() {
    const v = (saisieSolde ?? "").trim();
    if (!/^\d+$/.test(v)) {
      setErreur("Indique un nombre entier d'avitons.");
      return;
    }
    const maintenant = new Date().toISOString();
    const { error } = await supabase.from("personnages").update({ avitons_solde: Number(v), avitons_solde_le: maintenant }).eq("id", personnageId);
    if (error) {
      setErreur("Enregistrement impossible : " + error.message);
      return;
    }
    setSolde(Number(v));
    setSoldeLe(maintenant);
    setDepuis({ avitons: 0, avis: 0 }); // les prochains avis livrés s'ajouteront à ce nouveau solde
    setSaisie(v); // le simulateur repart du solde saisi
    setSaisieSolde(null);
    setErreur(null);
  }

  const dateSolde = soldeLe ? new Date(soldeLe).toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "";

  return (
    <section className="carte avitons">
      <div className="doplons__total">
        <strong>{nb(reste)} avitons</strong> {solde === null ? "gagnés avec les avis livrés" : "restants"}
        <span className="discret">
          {solde === null
            ? " (dépenses non comptées)"
            : ` : ${nb(solde)} indiqués le ${dateSolde}${depuis.avis > 0 ? `, + ${nb(depuis.avitons)} gagnés depuis (${depuis.avis} avis)` : ""}`}
          {(alitons > 0 || kamasGlace > 0) && <> (et {[alitons > 0 && `${nb(alitons)} alitons`, kamasGlace > 0 && `${nb(kamasGlace)} kamas de glace`].filter(Boolean).join(", ")})</>}
        </span>
        {modifiable && saisieSolde === null && (
          <> · <button type="button" className="lien-bouton" onClick={() => setSaisieSolde(String(reste))}>{solde === null ? "Indiquer mes avitons restants" : "Corriger mon solde"}</button></>
        )}
      </div>
      {modifiable && saisieSolde !== null && (
        <div className="doplons__depenses">
          <label htmlFor="avitons-solde">Avitons restants (dans ton inventaire)</label>
          <input id="avitons-solde" inputMode="numeric" value={saisieSolde} onChange={(e) => setSaisieSolde(e.target.value)} onKeyDown={(e) => e.key === "Enter" && enregistrerSolde()} />
          <button type="button" className="bouton bouton--vert" onClick={enregistrerSolde}>Enregistrer</button>
          <button type="button" className="bouton" onClick={() => { setSaisieSolde(null); setErreur(null); }}>Annuler</button>
          <span className="discret">Les avis que tu livreras ensuite s'ajouteront tout seuls.</span>
          {erreur && <span className="erreur" role="alert">{erreur}</span>}
        </div>
      )}

      <details className="doplons__simu">
        <summary>Simulateur de parchemins</summary>
        <div className="doplons__reglages">
          <div className="champ">
            <label htmlFor="doplons-dispo">Avitons disponibles</label>
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
              ? <>La caractéristique monte à <strong>100</strong> pour {nb(r.coutTotal)} avitons. Il te restera {nb(r.reste)} avitons{suivante > 0 && <>, de quoi monter une autre caractéristique jusqu'à <strong>{suivante}</strong></>}.</>
              : <>La caractéristique monte de {depart} à <strong>{r.niveau}</strong>. Pour aller jusqu'à 100, il faut {nb(r.coutTotal)} avitons au total, soit {nb(r.coutTotal - (avitons - r.reste))} de plus.</>}
        </p>
      </details>
    </section>
  );
}
