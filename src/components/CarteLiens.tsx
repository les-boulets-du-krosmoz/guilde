import { useEffect, useState } from "react";
import { chargerLiens, enregistrerLien, supprimerLien, type LienUtile } from "../lib/donnees";
import { useSession } from "../lib/session";

type Brouillon = { id?: string; titre: string; url: string; description: string };
const VIDE: Brouillon = { titre: "", url: "", description: "" };

/** Liens utiles de la guilde (Metamob, élevage, Almanax…) : tout le monde les voit, les officiers les gèrent. */
export function CarteLiens() {
  const { membre } = useSession();
  const [liens, setLiens] = useState<LienUtile[]>([]);
  const [brouillon, setBrouillon] = useState<Brouillon | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const officier = !!membre?.est_officier;

  const recharger = () => chargerLiens().then(setLiens).catch(() => {});
  useEffect(() => { recharger(); }, []);

  async function valider() {
    if (!brouillon || !membre) return;
    const titre = brouillon.titre.trim();
    let url = brouillon.url.trim();
    if (url && !/^https?:\/\//i.test(url)) url = `https://${url}`;
    if (!titre || !url) { setErreur("Il faut un titre et une adresse."); return; }
    try { new URL(url); } catch { setErreur("Cette adresse n'est pas valide."); return; }
    try {
      await enregistrerLien({ id: brouillon.id, titre, url, description: brouillon.description.trim() || null, ordre: brouillon.id ? liens.find((l) => l.id === brouillon.id)?.ordre ?? 0 : liens.length }, membre.id);
      setBrouillon(null); setErreur(null); await recharger();
    } catch (e) { setErreur((e as Error).message); }
  }

  async function retirer(l: LienUtile) {
    if (!window.confirm(`Retirer le lien « ${l.titre} » ?`)) return;
    try { await supprimerLien(l.id); await recharger(); } catch (e) { setErreur((e as Error).message); }
  }

  if (liens.length === 0 && !officier) return null; // rien à montrer tant qu'aucun officier n'a ajouté de lien

  return (
    <section className="carte liens-utiles">
      <h2>Liens utiles</h2>
      {liens.length === 0 && <p className="discret">Aucun lien pour l'instant.</p>}
      <ul className="liens-utiles__liste">
        {liens.map((l) => (
          <li key={l.id}>
            <div className="liens-utiles__haut">
              <a href={l.url} target="_blank" rel="noreferrer">{l.titre}</a>
              {officier && (
                <span className="liens-utiles__gestion">
                  <button type="button" className="lien-bouton" aria-label={`Modifier ${l.titre}`} onClick={() => setBrouillon({ id: l.id, titre: l.titre, url: l.url, description: l.description ?? "" })}>✎</button>
                  <button type="button" className="lien-bouton" aria-label={`Retirer ${l.titre}`} onClick={() => retirer(l)}>×</button>
                </span>
              )}
            </div>
            {l.description && <span className="discret-taille">{l.description}</span>}
          </li>
        ))}
      </ul>
      {officier && (brouillon ? (
        <div className="liens-utiles__form">
          <input maxLength={60} placeholder="Titre (ex. Metamob)" value={brouillon.titre} onChange={(e) => setBrouillon({ ...brouillon, titre: e.target.value })} aria-label="Titre du lien" />
          <input maxLength={500} placeholder="Adresse (https://…)" value={brouillon.url} onChange={(e) => setBrouillon({ ...brouillon, url: e.target.value })} aria-label="Adresse du lien" />
          <input maxLength={140} placeholder="Description courte (facultatif)" value={brouillon.description} onChange={(e) => setBrouillon({ ...brouillon, description: e.target.value })} aria-label="Description" />
          <div className="liens-utiles__actions">
            <button type="button" className="bouton bouton--vert bouton--petit" onClick={valider}>{brouillon.id ? "Enregistrer" : "Ajouter"}</button>
            <button type="button" className="bouton bouton--petit" onClick={() => { setBrouillon(null); setErreur(null); }}>Annuler</button>
          </div>
        </div>
      ) : (
        <button type="button" className="lien-bouton liens-utiles__plus" onClick={() => setBrouillon(VIDE)}>+ Ajouter un lien</button>
      ))}
      {erreur && <p className="erreur discret-taille" role="alert">{erreur}</p>}
    </section>
  );
}
