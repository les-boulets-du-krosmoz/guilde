import { useEffect, useMemo, useState } from "react";
import { IconeMetier } from "../components/IconeMetier";
import { chargerMetiers } from "../lib/donnees";
import { useSession } from "../lib/session";
import type { MetierMembre } from "../lib/types";
import { FormMetiers } from "./MonCompte";

// Recettes générées depuis les données du jeu (scripts/generer-recettes.py), chargées à la demande par métier.
type Recette = [id: number, nom: string, niveau: number, icone: number | null, ingredients: [number, number][]];
type FichierRecettes = { metier: string; recettes: Recette[]; objets: Record<string, [nom: string, icone: number | null, niveau: number]> };
type Index = { version: string; metiers: Record<string, { fichier: string; recettes: number }> };
type LignePlan = { id: number; nom: string; niveau: number; icone: number | null; quantite: number };

const IMG = (icone: number | null) => (icone ? `https://api.dofusdu.de/dofus3/v1/img/item/${icone}-64.png` : undefined);

/** Repère d'expérience, d'après les deux règles connues du jeu (le détail de l'XP par craft n'est pas publié). */
function repere(niveauRecette: number, niveauMetier: number): { texte: string; classe: string } | null {
  if (niveauRecette > niveauMetier) return { texte: "niveau trop haut", classe: "repere--haut" };
  if (niveauMetier - niveauRecette >= 100) return { texte: "plus d'XP", classe: "repere--nul" };
  if (niveauRecette === niveauMetier) return { texte: "≈ 1 niveau", classe: "repere--top" };
  return null;
}

export function MesMetiers() {
  const { membre } = useSession();
  const [mesMetiers, setMesMetiers] = useState<MetierMembre[]>([]);
  const [index, setIndex] = useState<Index | null>(null);
  const [metier, setMetier] = useState("");
  const [donnees, setDonnees] = useState<FichierRecettes | null>(null);
  const [recherche, setRecherche] = useState("");
  const [autourDeMonNiveau, setAutourDeMonNiveau] = useState(true);
  const [plan, setPlan] = useState<LignePlan[]>([]);
  // Tri par niveau (décroissant par défaut : les recettes les plus proches de ton niveau d'abord),
  // niveau de référence modifiable pour préparer un palier à venir, et affichage par pages de 50.
  const [tri, setTri] = useState<"desc" | "asc">("desc");
  const [reference, setReference] = useState<string>("");
  const [affichees, setAffichees] = useState(50);
  const [copie, setCopie] = useState(false);

  const rechargerMetiers = () => { if (membre) chargerMetiers(membre.id).then(setMesMetiers).catch(() => {}); };
  useEffect(rechargerMetiers, [membre?.id]);
  useEffect(() => { fetch("/donnees/recettes/index.json").then((r) => r.json()).then(setIndex).catch(() => {}); }, []);

  // Métier par défaut : le premier de mes métiers qui a des recettes.
  useEffect(() => {
    if (metier || !index) return;
    const miens = mesMetiers.map((m) => m.metier).filter((m) => index.metiers[m]);
    setMetier(miens[0] ?? Object.keys(index.metiers)[0]);
  }, [index, mesMetiers, metier]);

  useEffect(() => {
    if (!index || !metier || !index.metiers[metier]) return;
    setDonnees(null);
    fetch(`/donnees/recettes/${index.metiers[metier].fichier}`).then((r) => r.json()).then(setDonnees).catch(() => {});
  }, [index, metier]);

  // Le plan est gardé dans ce navigateur, par métier.
  const clePlan = membre ? `plan-crafts:${membre.id}:${metier}` : "";
  useEffect(() => {
    if (!clePlan) return;
    try { setPlan(JSON.parse(localStorage.getItem(clePlan) ?? "[]")); } catch { setPlan([]); }
  }, [clePlan]);
  const majPlan = (p: LignePlan[]) => {
    setPlan(p);
    try { localStorage.setItem(clePlan, JSON.stringify(p)); } catch { /* sans importance */ }
  };

  const niveauMetier = mesMetiers.find((m) => m.metier === metier)?.niveau ?? 1;
  const niveau = /^\d+$/.test(reference.trim()) ? Math.min(200, Math.max(1, Number(reference))) : niveauMetier;
  const q = recherche.trim().toLowerCase();
  const recettes = (donnees?.recettes ?? [])
    .filter((r) => (q ? r[1].toLowerCase().includes(q) : true) && (!autourDeMonNiveau || q || (r[2] <= niveau && niveau - r[2] < 100)))
    .sort((a, b) => (tri === "desc" ? b[2] - a[2] : a[2] - b[2]) || a[1].localeCompare(b[1]));
  // Nouvelle recherche, nouveau métier ou nouveau tri : on repart des 50 premières.
  useEffect(() => setAffichees(50), [metier, recherche, tri, autourDeMonNiveau, niveau]);

  // Liste de courses : ingrédients de tout le plan, additionnés.
  const courses = useMemo(() => {
    if (!donnees) return [];
    const total = new Map<number, number>();
    for (const l of plan) {
      const r = donnees.recettes.find((x) => x[0] === l.id);
      for (const [ing, qte] of r?.[4] ?? []) total.set(ing, (total.get(ing) ?? 0) + qte * l.quantite);
    }
    return [...total.entries()].map(([id, qte]) => ({ id, qte, info: donnees.objets[id] })).sort((a, b) => b.qte - a.qte);
  }, [plan, donnees]);

  function ajouter(r: Recette, quantite: number) {
    if (quantite < 1) return;
    const existe = plan.find((l) => l.id === r[0]);
    majPlan(existe ? plan.map((l) => (l.id === r[0] ? { ...l, quantite: l.quantite + quantite } : l))
      : [...plan, { id: r[0], nom: r[1], niveau: r[2], icone: r[3], quantite }]);
  }

  async function copierListe() {
    const texte = courses.map((c) => `${c.qte} × ${c.info?.[0] ?? c.id}`).join("\n");
    try { await navigator.clipboard.writeText(texte); setCopie(true); setTimeout(() => setCopie(false), 2000); } catch { /* presse-papiers refusé */ }
  }

  return (
    <main className="page">
      <div className="entete">
        <div>
          <h1>Mes métiers</h1>
          <p className="discret">Tes niveaux de métier, et les crafts à prévoir pour monter.</p>
        </div>
      </div>

      <FormMetiers onEnregistre={rechargerMetiers} />

      <section className="carte planif">
        <div className="carte__entete">
          <h2>Prévoir des crafts</h2>
          {index && <span className="discret">Recettes du jeu, version {index.version}</span>}
        </div>
        <div className="planif__outils">
          <label className="champ">Métier
            <select value={metier} onChange={(e) => { setMetier(e.target.value); setRecherche(""); }}>
              {index && Object.entries(index.metiers).map(([m, x]) => <option key={m} value={m}>{m} ({x.recettes} recettes)</option>)}
            </select>
          </label>
          <span className="planif__niveau"><IconeMetier metier={metier} taille={28} /> Ton niveau : <strong>{niveauMetier}</strong></span>
          <label className="champ planif__reference">Niveau de référence
            <input inputMode="numeric" placeholder={String(niveauMetier)} value={reference} onChange={(e) => setReference(e.target.value)}
              aria-describedby="planif-reference-aide" />
          </label>
          {reference && <button type="button" className="lien-bouton" onClick={() => setReference("")}>Revenir à mon niveau</button>}
          <label className="champ">Tri
            <select value={tri} onChange={(e) => setTri(e.target.value as "desc" | "asc")}>
              <option value="desc">Niveau décroissant</option>
              <option value="asc">Niveau croissant</option>
            </select>
          </label>
          <input type="search" placeholder="Rechercher une recette…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher une recette" />
          <label className="case"><input type="checkbox" checked={autourDeMonNiveau} onChange={() => setAutourDeMonNiveau(!autourDeMonNiveau)} /> Seulement les recettes qui me rapportent de l'XP</label>
        </div>
        <p className="discret planif__regle" id="planif-reference-aide">
          {reference && niveau !== niveauMetier && <><strong>Simulation au niveau {niveau}</strong> : les recettes et les repères sont calculés pour ce niveau. </>}
          Repères connus : un craft de ton niveau rapporte de quoi passer au niveau suivant ; une recette à plus de 100 niveaux sous ton métier ne rapporte plus rien.
          Le détail de l'XP par craft sera ajouté dès qu'on aura les relevés en jeu.
        </p>

        <div className="planif__grille">
          <div className="planif__recettes">
            {!donnees ? <p className="discret">Chargement des recettes…</p> : recettes.length === 0 ? <p className="vide">Aucune recette ne correspond.</p> : (
              <ul>
                {recettes.slice(0, affichees).map((r) => <LigneRecette key={r[0]} r={r} niveauMetier={niveau} objets={donnees.objets} onAjouter={ajouter} />)}
              </ul>
            )}
            {donnees && (
              <div className="planif__pagination">
                <span className="discret">{Math.min(affichees, recettes.length)} sur {recettes.length} recettes</span>
                {recettes.length > affichees && (
                  <button type="button" className="bouton" onClick={() => setAffichees(affichees + 50)}>Afficher 50 de plus</button>
                )}
              </div>
            )}
          </div>

          <aside className="planif__plan">
            <h3>Mon plan ({plan.reduce((n, l) => n + l.quantite, 0)} crafts)</h3>
            {plan.length === 0 ? <p className="discret">Ajoute des recettes pour préparer ta liste de courses.</p> : (
              <>
                <ul className="planif__lignes">
                  {plan.map((l) => (
                    <li key={l.id}>
                      {IMG(l.icone) && <img src={IMG(l.icone)} alt="" width={24} height={24} />}
                      <span>{l.quantite} × {l.nom} <span className="discret">niv. {l.niveau}</span></span>
                      <button type="button" className="lien-bouton" aria-label={`Retirer ${l.nom}`} onClick={() => majPlan(plan.filter((x) => x.id !== l.id))}>×</button>
                    </li>
                  ))}
                </ul>
                <h3>Liste de courses</h3>
                <ul className="planif__courses">
                  {courses.map((c) => (
                    <li key={c.id}>
                      {IMG(c.info?.[1] ?? null) && <img src={IMG(c.info?.[1] ?? null)} alt="" width={22} height={22} />}
                      <span><strong>{c.qte.toLocaleString("fr-FR")}</strong> × {c.info?.[0] ?? c.id}</span>
                    </li>
                  ))}
                </ul>
                <div className="planif__actions">
                  <button type="button" className="bouton" onClick={copierListe}>{copie ? "Copiée !" : "Copier la liste"}</button>
                  <button type="button" className="lien-bouton" onClick={() => majPlan([])}>Vider le plan</button>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

function LigneRecette({ r, niveauMetier, objets, onAjouter }: {
  r: Recette;
  niveauMetier: number;
  objets: FichierRecettes["objets"];
  onAjouter: (r: Recette, quantite: number) => void;
}) {
  const [qte, setQte] = useState("1");
  const rep = repere(r[2], niveauMetier);
  return (
    <li className="recette">
      {IMG(r[3]) && <img className="recette__icone" src={IMG(r[3])} alt="" width={36} height={36} loading="lazy" />}
      <div className="recette__corps">
        <div className="recette__titre">
          <strong>{r[1]}</strong> <span className="discret">niv. {r[2]}</span>
          {rep && <span className={`repere ${rep.classe}`}>{rep.texte}</span>}
        </div>
        <div className="recette__ingredients">
          {r[4].map(([id, n]) => (
            <span key={id} className="recette__ingredient" title={objets[id]?.[0]}>
              {IMG(objets[id]?.[1] ?? null) && <img src={IMG(objets[id]?.[1] ?? null)} alt="" width={18} height={18} loading="lazy" />}
              {n} × {objets[id]?.[0] ?? id}
            </span>
          ))}
        </div>
      </div>
      <div className="recette__ajout">
        <input inputMode="numeric" value={qte} onChange={(e) => setQte(e.target.value)} aria-label={`Quantité de ${r[1]}`} />
        <button type="button" className="bouton" onClick={() => onAjouter(r, Math.max(1, Number(qte) || 1))}>Ajouter</button>
      </div>
    </li>
  );
}
