import { useEffect, useRef, useState } from "react";
import { usePlacementDansEcran } from "../lib/placement";
import type { Membre, Personnage } from "../lib/types";
import { Pastille } from "./Pastille";

const sansAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/**
 * Choix de plusieurs membres (invitations), comme le choix de personnage des succès : recherche par pseudo ou par
 * personnage, personnages principaux d'abord, mules repliées à la fin. Un clic coche ou décoche, la liste reste ouverte.
 */
export function ChoixMembres({ membres, persos, choisis, onChange }: {
  membres: Membre[];
  persos: Personnage[];
  choisis: string[];
  onChange: (ids: string[]) => void;
}) {
  const [ouvert, setOuvert] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [mules, setMules] = useState(false);
  const boite = useRef<HTMLDivElement>(null);
  const liste = useRef<HTMLDivElement>(null);
  const place = usePlacementDansEcran(ouvert, boite, liste);
  useEffect(() => {
    if (!ouvert) return;
    const dehors = (e: MouseEvent) => { if (!boite.current?.contains(e.target as Node)) setOuvert(false); };
    const echap = (e: KeyboardEvent) => { if (e.key === "Escape") setOuvert(false); };
    document.addEventListener("mousedown", dehors); document.addEventListener("keydown", echap);
    return () => { document.removeEventListener("mousedown", dehors); document.removeEventListener("keydown", echap); };
  }, [ouvert]);

  const ids = new Set(membres.map((m) => m.id));
  const pseudo = (id: string) => membres.find((m) => m.id === id)?.pseudo ?? "?";
  const q = sansAccents(recherche.trim());
  const correspond = (p: Personnage) => !q || sansAccents(`${p.nom} ${pseudo(p.membre_id)} ${p.classe}`).includes(q);
  const dispo = persos.filter((p) => ids.has(p.membre_id) && correspond(p)).sort((a, b) => a.nom.localeCompare(b.nom));
  const principaux = dispo.filter((p) => p.est_principal);
  const secondaires = dispo.filter((p) => !p.est_principal);
  const basculer = (membreId: string) => onChange(choisis.includes(membreId) ? choisis.filter((x) => x !== membreId) : [...choisis, membreId]);

  const ligne = (p: Personnage) => (
    <button key={p.id} type="button" role="option" aria-selected={choisis.includes(p.membre_id)} className="choix-perso__item" onClick={() => basculer(p.membre_id)}>
      <Pastille perso={p} taille={22} lien={false} infobulle={p.nom} />
      <span className="choix-perso__nom">{p.nom}</span>
      <span className="discret">{p.classe} {p.niveau}{pseudo(p.membre_id) !== p.nom ? ` · ${pseudo(p.membre_id)}` : ""}</span>
      <span className="choix-membres__coche" aria-hidden="true">{choisis.includes(p.membre_id) ? "✓" : ""}</span>
    </button>
  );

  return (
    <div className="choix-membres" ref={boite}>
      <div className="choix-membres__champ" onClick={() => setOuvert(true)}>
        {choisis.map((id) => (
          <span key={id} className="choix-membres__etiquette">
            {pseudo(id)}
            <button type="button" aria-label={`Retirer ${pseudo(id)}`} onClick={(e) => { e.stopPropagation(); basculer(id); }}>×</button>
          </span>
        ))}
        <button type="button" className="choix-membres__ajouter" aria-haspopup="listbox" aria-expanded={ouvert} onClick={(e) => { e.stopPropagation(); setOuvert(!ouvert); }}>
          {choisis.length ? "▾ ajouter" : "Choisir des membres ▾"}
        </button>
      </div>
      {ouvert && (
        <div className="choix-perso__liste choix-membres__liste" ref={liste} style={place}>
          <input type="search" placeholder="Rechercher un membre ou un personnage…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher un membre" autoFocus />
          <div role="listbox" aria-multiselectable="true" className="choix-perso__options">
            {principaux.map(ligne)}
            {secondaires.length > 0 && (
              <>
                {!q && <button type="button" className="choix-perso__mules" aria-expanded={mules} onClick={() => setMules(!mules)}><span aria-hidden="true">{mules ? "▾" : "▸"}</span> Mules ({secondaires.length})</button>}
                {(mules || q) && secondaires.map(ligne)}
              </>
            )}
            {dispo.length === 0 && <span className="discret choix-perso__vide">Aucun membre ne correspond.</span>}
          </div>
        </div>
      )}
    </div>
  );
}
