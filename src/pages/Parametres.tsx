import { useEffect, useState } from "react";
import { appliquerModeDaltonien, appliquerPolice, chargerPoliceEpaisse, MODES_DALTONIENS, POLICES } from "../lib/affichage";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import type { ModeDaltonien, Police } from "../lib/types";

/** Paramètres d'affichage : mode daltonien (palette adaptée et formes en plus des couleurs). */
export function Parametres() {
  const { membre } = useSession();
  const [mode, setMode] = useState<ModeDaltonien | null>((document.documentElement.dataset.daltonien as ModeDaltonien | undefined) ?? membre?.mode_daltonien ?? null);
  const [etat, setEtat] = useState<string | null>(null);
  const [police, setPolice] = useState<Police | null>((document.documentElement.dataset.police as Police | undefined) ?? membre?.police ?? null);
  const [etatPolice, setEtatPolice] = useState<string | null>(null);
  // Pour l'aperçu, la police épaisse est chargée dès l'ouverture de la page.
  useEffect(() => { chargerPoliceEpaisse(); }, []);

  async function choisirPolice(p: Police | null) {
    setPolice(p);
    appliquerPolice(p);
    if (!membre) return;
    const { error } = await supabase.from("membres").update({ police: p }).eq("id", membre.id);
    setEtatPolice(error ? "Enregistrée sur cet appareil seulement (le compte n'a pas pu être mis à jour)." : "Enregistrée : tu la retrouveras sur tous tes appareils.");
  }

  async function choisir(m: ModeDaltonien | null) {
    setMode(m);
    appliquerModeDaltonien(m); // tout de suite, sur tout le site
    if (!membre) return;
    const { error } = await supabase.from("membres").update({ mode_daltonien: m }).eq("id", membre.id);
    setEtat(error ? "Enregistré sur cet appareil seulement (le compte n'a pas pu être mis à jour)." : "Enregistré : tu le retrouveras sur tous tes appareils.");
  }

  return (
    <main className="page page--etroite">
      <div className="entete">
        <div>
          <h1>Paramètres</h1>
          <p className="discret">Réglages d'affichage, rien que pour toi.</p>
        </div>
      </div>

      <section className="carte">
        <h2>Mode daltonien</h2>
        <p className="discret">
          Remplace les couleurs qui portent une information (statuts, succès, quêtes, Dofus) par une palette adaptée,
          et ajoute à chaque statut un symbole plein (● dispo, ■ absent, ✖ indispo, ◆ en vacances) pour ne jamais dépendre de la couleur seule. Si les jaunes sont difficiles à distinguer, choisis la tritanopie : elle retire tout le jaune et le doré du site.
        </p>
        <div className="modes-daltoniens" role="radiogroup" aria-label="Mode daltonien">
          {MODES_DALTONIENS.map((m) => (
            <label key={m.id ?? "aucun"} className={`mode-daltonien ${mode === m.id ? "mode-daltonien--choisi" : ""}`}>
              <input type="radio" name="daltonien" checked={mode === m.id} onChange={() => choisir(m.id)} />
              <div className="mode-daltonien__texte">
                <strong>{m.nom}</strong>
                <span className="discret-taille">{m.detail}</span>
              </div>
              {/* Aperçu de la palette de ce mode */}
              <div className="mode-daltonien__apercu" data-daltonien={m.id ?? undefined} data-apercu="">
                <span className="pastille pastille--dispo" title="Dispo" />
                <span className="pastille pastille--absent" title="Absent" />
                <span className="pastille pastille--indispo" title="Indispo" />
                <span className="pastille pastille--absence" title="En vacances" />
                <span className="mode-daltonien__succes vert">✓</span>
                <span className="mode-daltonien__succes statut-texte--indispo">✗</span>
                <span className="barre-double mode-daltonien__barre"><div style={{ width: "45%" }} /><div style={{ width: "30%" }} /></span>
              </div>
            </label>
          ))}
        </div>
        {etat && <p className="discret-taille" role="status">{etat}</p>}
      </section>

      <section className="carte">
        <h2>Police</h2>
        <p className="discret">La police de tout le site, pour toi seulement.</p>
        <div className="modes-daltoniens" role="radiogroup" aria-label="Police">
          {POLICES.map((p) => (
            <label key={p.id ?? "site"} className={`mode-daltonien ${police === p.id ? "mode-daltonien--choisi" : ""}`}>
              <input type="radio" name="police" checked={police === p.id} onChange={() => choisirPolice(p.id)} />
              <div className="mode-daltonien__texte">
                <strong>{p.nom}</strong>
                <span className="discret-taille">{p.detail}</span>
              </div>
              {/* Aperçu dans la police elle-même */}
              <span className="police__apercu" style={{ fontFamily: p.famille, fontWeight: p.id === "epaisse" ? 700 : 400 }}>
                Les boulets du Krosmoz · Dofus des Glaces 0123
              </span>
            </label>
          ))}
        </div>
        {etatPolice && <p className="discret-taille" role="status">{etatPolice}</p>}
      </section>
    </main>
  );
}
