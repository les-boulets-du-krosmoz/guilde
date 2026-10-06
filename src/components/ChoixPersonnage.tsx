import { useEffect, useRef, useState } from "react";
import { usePlacementDansEcran } from "../lib/placement";
import type { Membre, Personnage } from "../lib/types";
import { Pastille } from "./Pastille";

const sansAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/**
 * Liste déroulante de personnages avec recherche : les personnages principaux d'abord,
 * puis une ligne « Mules » qui déplie les personnages secondaires. Une recherche parcourt tout.
 */
export function ChoixPersonnage({ persos, membres, valeur, moiId, onChoix, actif = true }: {
  persos: Personnage[];
  membres: Map<string, Membre>;
  valeur: Personnage;
  moiId?: string;
  onChoix: (p: Personnage) => void;
  actif?: boolean;
}) {
  const [ouvert, setOuvert] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [mulesOuvertes, setMulesOuvertes] = useState(false);
  const boite = useRef<HTMLDivElement>(null);
  const liste = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLInputElement>(null);
  const place = usePlacementDansEcran(ouvert, boite, liste);

  useEffect(() => {
    if (!ouvert) return;
    champ.current?.focus();
    const dehors = (e: MouseEvent) => { if (!boite.current?.contains(e.target as Node)) setOuvert(false); };
    const echap = (e: KeyboardEvent) => { if (e.key === "Escape") setOuvert(false); };
    document.addEventListener("mousedown", dehors);
    document.addEventListener("keydown", echap);
    return () => { document.removeEventListener("mousedown", dehors); document.removeEventListener("keydown", echap); };
  }, [ouvert]);

  const pseudo = (p: Personnage) => membres.get(p.membre_id)?.pseudo ?? "";
  const tri = (a: Personnage, b: Personnage) => a.nom.localeCompare(b.nom);
  const q = sansAccents(recherche.trim());
  const correspond = (p: Personnage) => !q || sansAccents(`${p.nom} ${pseudo(p)} ${p.classe}`).includes(q);
  const principaux = persos.filter((p) => p.est_principal && correspond(p)).sort(tri);
  const mules = persos.filter((p) => !p.est_principal && correspond(p)).sort(tri);
  const voirMules = mulesOuvertes || q.length > 0;

  const choisir = (p: Personnage) => { onChoix(p); setOuvert(false); setRecherche(""); };
  const ligne = (p: Personnage) => (
    <button key={p.id} type="button" role="option" aria-selected={p.id === valeur.id}
      className={`choix-perso__item ${p.id === valeur.id ? "choix-perso__item--choisi" : ""}`} onClick={() => choisir(p)}>
      <Pastille perso={p} taille={22} lien={false} infobulle={p.nom} />
      <span className="choix-perso__nom">{p.nom}</span>
      <span className="discret">{p.classe} {p.niveau}{pseudo(p) && pseudo(p) !== p.nom ? ` · ${pseudo(p)}` : ""}{p.membre_id === moiId ? " · moi" : ""}</span>
    </button>
  );

  return (
    <div className="choix-perso" ref={boite}>
      <button type="button" className={`choix-perso__bouton ${actif ? "choix-perso__bouton--actif" : ""}`} aria-haspopup="listbox" aria-expanded={ouvert} onClick={() => setOuvert(!ouvert)}>
        <Pastille perso={valeur} taille={22} lien={false} infobulle={valeur.nom} />
        {valeur.nom} <span className="discret">({valeur.classe} {valeur.niveau})</span>
        <span className="menu-statut__fleche" aria-hidden="true">▾</span>
      </button>
      {ouvert && (
        <div className="choix-perso__liste" ref={liste} style={place}>
          <input ref={champ} type="search" placeholder="Rechercher un personnage, un joueur ou une classe…" value={recherche}
            onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher un personnage" />
          <div role="listbox" aria-label="Personnages" className="choix-perso__options">
            {principaux.map(ligne)}
            {mules.length > 0 && (
              <>
                {!q && (
                  <button type="button" className="choix-perso__mules" aria-expanded={mulesOuvertes} onClick={() => setMulesOuvertes(!mulesOuvertes)}>
                    <span aria-hidden="true">{mulesOuvertes ? "▾" : "▸"}</span> Mules ({mules.length})
                  </button>
                )}
                {voirMules && mules.map(ligne)}
              </>
            )}
            {principaux.length === 0 && mules.length === 0 && <span className="discret choix-perso__vide">Aucun personnage ne correspond.</span>}
          </div>
        </div>
      )}
    </div>
  );
}
