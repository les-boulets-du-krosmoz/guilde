import { useEffect, useMemo, useState } from "react";
import { Pastille } from "../components/Pastille";
import { ICONES_STATS } from "../data/iconesStats";
import { ilYa } from "../lib/dates";
import {
  chargerBrocante, chargerGuilde, majVente, publierVente, retirerInteret, seDireInteresse, supprimerVente,
  type DonneesGuilde, type InteretVente, type StatVente, type Vente,
} from "../lib/donnees";
import { useSession } from "../lib/session";
import type { Personnage } from "../lib/types";
import { Chargement } from "./Acces";

// Catalogue des équipements (scripts/generer-objets.py), chargé seulement quand on propose un objet.
type ObjetCatalogue = [id: number, nom: string, niveau: number, type: string, icone: number | null, stats: [libelle: string, min: number, max: number][]];
type StatSaisie = StatVente & { min: number; max: number; fixe?: boolean };
// Lignes de dégâts d'une arme (« 8 à 10 dommages Neutre », « vol Terre », « PV rendus ») : fourchette fixe, pas un jet.
const estFixe = (libelle: string) => /^(dommages |vol |pv rendus)/i.test(libelle);
/** Une ligne de caractéristique comme dans le jeu : « 289 Vitalité », « -10 Sagesse », « 8 à 10 dommages Neutre ». */
const ligneStat = (s: StatSaisie) => {
  const sep = s.libelle.startsWith("%") ? "" : " "; // « 5% Critique », comme en jeu
  return s.fixe && s.min !== s.max ? `${s.min} à ${s.max}${sep}${s.libelle}` : `${s.valeur}${sep}${s.libelle}`;
};
/** Icône de la caractéristique (comme dans l'infobulle du jeu). */
function IconeStat({ libelle }: { libelle: string }) {
  const id = ICONES_STATS[libelle];
  return id ? <img className="icone-stat" src={`/icones/stats/${id}.webp`} alt="" width={18} height={18} loading="lazy" /> : <span className="icone-stat icone-stat--vide" aria-hidden="true" />;
}

const IMG = (icone: number | null) => (icone ? `https://api.dofusdu.de/dofus3/v1/img/item/${icone}-64.png` : undefined);
const kamas = (n: number) => `${n.toLocaleString("fr-FR")} k`;
const sansAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
/** « 1 200 000 », « 1,2m », « 850k » → nombre de kamas. */
function lirePrix(t: string): number | null {
  const s = t.trim().toLowerCase().replace(/\s/g, "").replace(",", ".");
  const m = s.match(/^(\d+(?:\.\d+)?)([km]?)$/);
  if (!m) return null;
  return Math.round(Number(m[1]) * (m[2] === "m" ? 1e6 : m[2] === "k" ? 1e3 : 1));
}
const reduction = (v: Pick<Vente, "prix" | "prix_hdv">) => (v.prix_hdv && v.prix_hdv > v.prix ? Math.round((1 - v.prix / v.prix_hdv) * 100) : 0);
const jetParfait = (stats: StatVente[]) => stats.some((s) => !(s as StatSaisie).fixe) && stats.every((s) => "max" in s && ((s as StatSaisie).fixe || (s as StatSaisie).valeur >= (s as StatSaisie).max));

/** La Brocante des boulets : équipements proposés entre membres, à prix d'ami. */
export function Brocante() {
  const { membre } = useSession();
  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const [ventes, setVentes] = useState<Vente[]>([]);
  const [interets, setInterets] = useState<InteretVente[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [recherche, setRecherche] = useState("");
  const [type, setType] = useState("");
  const [tri, setTri] = useState<"recent" | "prix" | "reduction">("recent");
  const [miens, setMiens] = useState(false);
  const [formulaire, setFormulaire] = useState(false);

  const recharger = () => chargerBrocante().then(({ ventes, interets }) => { setVentes(ventes); setInterets(interets); }).catch((e) => setErreur(e.message));
  useEffect(() => {
    chargerGuilde().then(setGuilde).catch((e) => setErreur(e.message));
    recharger();
  }, []);
  // Lien direct depuis Discord : /brocante#vente-…
  useEffect(() => {
    if (!ventes.length || !window.location.hash.startsWith("#vente-")) return;
    setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "center" }), 100);
  }, [ventes.length]);

  const principal = useMemo(() => {
    const m = new Map<string, Personnage>();
    for (const p of guilde?.personnages ?? []) if (!m.has(p.membre_id) || p.est_principal) m.set(p.membre_id, p);
    return m;
  }, [guilde]);

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!guilde || !membre) return <Chargement />;
  const pseudo = (id: string | null) => (id ? guilde.membres.get(id)?.pseudo ?? "?" : "");

  const q = sansAccents(recherche.trim());
  const types = [...new Set(ventes.map((v) => v.objet_type).filter((t): t is string => !!t))].sort();
  const visibles = ventes
    .filter((v) => (!q || sansAccents(`${v.objet_nom} ${v.objet_type ?? ""} ${pseudo(v.membre_id)}`).includes(q)) && (!type || v.objet_type === type) && (!miens || v.membre_id === membre.id))
    .sort((a, b) => (a.statut === "vendu" ? 1 : 0) - (b.statut === "vendu" ? 1 : 0)
      || (tri === "prix" ? a.prix - b.prix : tri === "reduction" ? reduction(b) - reduction(a) : b.cree_le.localeCompare(a.cree_le)));

  async function action(f: () => Promise<unknown>, message?: string) {
    try { await f(); if (message) setInfo(message); await recharger(); } catch (e) { setErreur((e as Error).message); }
  }

  return (
    <main className="page">
      <div className="entete">
        <div>
          <h1>La Brocante des boulets</h1>
          <p className="discret">Les équipements que les membres proposent entre eux, à prix d'ami. « Intéressé » prévient le vendeur sur Discord.</p>
        </div>
        <button type="button" className="bouton bouton--vert" onClick={() => setFormulaire(!formulaire)}>{formulaire ? "Fermer" : "+ Proposer un objet"}</button>
      </div>

      {formulaire && <FormVente membreId={membre.id} onAnnuler={() => setFormulaire(false)} onFini={() => { setFormulaire(false); recharger(); setInfo("Ton objet est en vente."); }} onErreur={setErreur} />}
      {info && <p className="discret" role="status">{info}</p>}

      <div className="brocante-outils">
        <input type="search" placeholder="Rechercher un objet, un type, un vendeur…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Type d'objet">
          <option value="">Tous les types</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={tri} onChange={(e) => setTri(e.target.value as typeof tri)} aria-label="Tri">
          <option value="recent">Plus récents</option>
          <option value="prix">Prix croissant</option>
          <option value="reduction">Plus grosse réduction</option>
        </select>
        <label className="case"><input type="checkbox" checked={miens} onChange={() => setMiens(!miens)} /> Mes objets</label>
      </div>

      {visibles.length === 0 ? (
        <p className="vide">{ventes.length ? "Aucun objet ne correspond." : "La brocante est vide pour l'instant : propose le premier objet !"}</p>
      ) : (
        <ul className="brocante-grille">
          {visibles.map((v) => {
            const lesInterets = interets.filter((i) => i.vente_id === v.id);
            const jeSuisInteresse = lesInterets.some((i) => i.membre_id === membre.id);
            const vendeur = principal.get(v.membre_id);
            const estMien = v.membre_id === membre.id;
            const r = reduction(v);
            return (
              <li key={v.id} id={`vente-${v.id}`} className={`carte vente vente--${v.statut}`}>
                <div className="vente__haut">
                  {IMG(v.objet_icone) && <img className="vente__icone" src={IMG(v.objet_icone)} alt="" width={48} height={48} loading="lazy" />}
                  <div>
                    <strong className="vente__nom">{v.objet_nom}</strong>
                    <span className="discret-taille">{v.objet_type ?? "Équipement"} · niv. {v.objet_niveau}</span>
                  </div>
                  {jetParfait(v.stats) && <span className="etiquette etiquette--aide vente__parfait">Jet parfait</span>}
                </div>
                {/* Caractéristiques comme dans le jeu : une par ligne, la valeur puis le nom */}
                <ul className="vente__stats">
                  {v.stats.map((s, k) => {
                    const x = s as StatSaisie;
                    return (
                      <li key={k} className={x.valeur < 0 ? "vente__stat--malus" : ""} title={"max" in x && !x.fixe && x.min !== x.max ? `de ${x.min} à ${x.max}` : undefined}>
                        <IconeStat libelle={x.libelle} />{ligneStat(x)}
                      </li>
                    );
                  })}
                </ul>
                {v.note && <p className="vente__note">« {v.note} »</p>}
                <div className="vente__prix">
                  <strong>{kamas(v.prix)}</strong>
                  {v.prix_hdv && v.prix_hdv > v.prix && <><span className="vente__hdv">{kamas(v.prix_hdv)}</span><span className="vente__reduc">−{r} %</span></>}
                </div>
                <div className="vente__vendeur">
                  {vendeur && <Pastille perso={vendeur} taille={22} />}
                  <span>{pseudo(v.membre_id)} · {ilYa(v.cree_le)}</span>
                  {v.statut === "reserve" && <span className="etiquette">Réservé{v.reserve_pour ? ` pour ${pseudo(v.reserve_pour)}` : ""}</span>}
                  {v.statut === "vendu" && <span className="etiquette">Vendu</span>}
                </div>

                {!estMien && v.statut !== "vendu" && (
                  <div className="vente__actions">
                    {jeSuisInteresse ? (
                      <button type="button" className="bouton bouton--petit" onClick={() => action(() => retirerInteret(v.id, membre.id))}>✓ Intéressé · retirer</button>
                    ) : (
                      <button type="button" className="bouton bouton--vert bouton--petit"
                        onClick={() => action(async () => {
                          const r2 = await seDireInteresse(v.id, membre.id);
                          setInfo(r2.prevenu ? `${pseudo(v.membre_id)} a été prévenu sur Discord.` : r2.raison ?? null);
                        })}>Intéressé</button>
                    )}
                    {lesInterets.length > 0 && <span className="discret-taille">{lesInterets.length} intéressé{lesInterets.length > 1 ? "s" : ""}</span>}
                  </div>
                )}

                {estMien && (
                  <div className="vente__gestion">
                    {lesInterets.length > 0 && (
                      <span className="discret-taille">Intéressés : {lesInterets.map((i) => pseudo(i.membre_id)).join(", ")}</span>
                    )}
                    <div className="vente__actions">
                      {v.statut !== "vendu" && (
                        <select value={v.statut === "reserve" ? v.reserve_pour ?? "" : "__"} aria-label="Réserver pour"
                          onChange={(e) => action(() => (e.target.value === "__"
                            ? majVente(v.id, { statut: "en_vente", reserve_pour: null })
                            : majVente(v.id, { statut: "reserve", reserve_pour: e.target.value || null })))}>
                          <option value="__">En vente</option>
                          {[...new Set([...lesInterets.map((i) => i.membre_id), ...[...guilde.membres.values()].filter((m) => m.valide && m.id !== membre.id).map((m) => m.id)])].map((id) => (
                            <option key={id} value={id}>Réservé pour {pseudo(id)}{lesInterets.some((i) => i.membre_id === id) ? " (intéressé)" : ""}</option>
                          ))}
                        </select>
                      )}
                      {v.statut !== "vendu"
                        ? <button type="button" className="bouton bouton--petit" onClick={() => action(() => majVente(v.id, { statut: "vendu", vendu_le: new Date().toISOString() }))}>Vendu</button>
                        : <button type="button" className="bouton bouton--petit" onClick={() => action(() => majVente(v.id, { statut: "en_vente", vendu_le: null, reserve_pour: null }))}>Remettre en vente</button>}
                      <button type="button" className="lien-bouton" onClick={() => { if (window.confirm(`Retirer « ${v.objet_nom} » de la brocante ?`)) action(() => supprimerVente(v.id)); }}>Retirer</button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

/** Proposer un objet : on le choisit dans le catalogue du jeu, puis on indique les caractéristiques de SON exemplaire. */
function FormVente({ membreId, onAnnuler, onFini, onErreur }: { membreId: string; onAnnuler: () => void; onFini: () => void; onErreur: (m: string) => void }) {
  const [catalogue, setCatalogue] = useState<ObjetCatalogue[] | null>(null);
  const [recherche, setRecherche] = useState("");
  const [objet, setObjet] = useState<ObjetCatalogue | null>(null);
  const [stats, setStats] = useState<StatSaisie[]>([]);
  const [prix, setPrix] = useState("");
  const [prixHdv, setPrixHdv] = useState("");
  const [note, setNote] = useState("");
  const [enCours, setEnCours] = useState(false);
  useEffect(() => { fetch("/donnees/objets.json").then((r) => r.json()).then((d) => setCatalogue(d.objets)).catch(() => onErreur("Le catalogue des objets n'a pas pu être chargé.")); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const q = sansAccents(recherche.trim());
  const resultats = catalogue && q.length >= 2 ? catalogue.filter((o) => sansAccents(o[1]).includes(q)).slice(0, 12) : [];

  function choisir(o: ObjetCatalogue) {
    setObjet(o);
    setRecherche("");
    setStats(o[5].map(([libelle, min, max]) => ({ libelle, min, max, valeur: max, ...(estFixe(libelle) ? { fixe: true } : {}) }))); // jet maximum par défaut
  }

  async function valider() {
    if (!objet) { onErreur("Choisis d'abord un objet."); return; }
    const p = lirePrix(prix);
    if (p === null) { onErreur("Indique un prix en kamas (ex. 1 200 000, 1,2m ou 850k)."); return; }
    const ph = prixHdv.trim() ? lirePrix(prixHdv) : null;
    setEnCours(true);
    try {
      await publierVente({
        membre_id: membreId, objet_id: objet[0], objet_nom: objet[1], objet_niveau: objet[2], objet_type: objet[3], objet_icone: objet[4],
        stats, prix: p, prix_hdv: ph, note: note.trim() || null,
      });
      onFini();
    } catch (e) { onErreur((e as Error).message); } finally { setEnCours(false); }
  }

  return (
    <section className="carte form-vente">
      <h2>Proposer un objet</h2>
      {!objet ? (
        <div className="form-vente__recherche">
          <input type="search" autoFocus placeholder={catalogue ? "Nom de l'objet (au moins 2 lettres)…" : "Chargement du catalogue…"} value={recherche}
            onChange={(e) => setRecherche(e.target.value)} disabled={!catalogue} aria-label="Rechercher un objet du jeu" />
          {resultats.length > 0 && (
            <ul className="form-vente__resultats">
              {resultats.map((o) => (
                <li key={o[0]}>
                  <button type="button" onClick={() => choisir(o)}>
                    {IMG(o[4]) && <img src={IMG(o[4])} alt="" width={32} height={32} loading="lazy" />}
                    <span><strong>{o[1]}</strong> <span className="discret-taille">{o[3]} · niv. {o[2]}</span></span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {q.length >= 2 && catalogue && resultats.length === 0 && <p className="discret-taille">Aucun équipement de ce nom.</p>}
        </div>
      ) : (
        <>
          <div className="vente__haut">
            {IMG(objet[4]) && <img className="vente__icone" src={IMG(objet[4])} alt="" width={48} height={48} />}
            <div><strong className="vente__nom">{objet[1]}</strong><span className="discret-taille">{objet[3]} · niv. {objet[2]}</span></div>
            <button type="button" className="lien-bouton" onClick={() => setObjet(null)}>Changer d'objet</button>
          </div>
          <p className="discret-taille">Les caractéristiques de <strong>ton</strong> exemplaire (pré-remplies avec le jet maximum, à ajuster) :</p>
          <div className="form-vente__stats">
            {stats.map((s, k) => (s.fixe ? (
              <div key={k} className="form-vente__stat form-vente__stat--fixe"><IconeStat libelle={s.libelle} /><span>{ligneStat(s)}</span><span className="discret-taille">fixe</span></div>
            ) : (
              <label key={k} className="form-vente__stat">
                <IconeStat libelle={s.libelle} />
                <input inputMode="numeric" value={String(s.valeur)} aria-label={`${s.libelle} de ton exemplaire`}
                  onChange={(e) => setStats((l) => l.map((x, n) => (n === k ? { ...x, valeur: Number(e.target.value.replace(/[^\d-]/g, "")) || 0 } : x)))} />
                <span>{s.libelle} <span className="discret-taille">({s.min === s.max ? s.max : `${s.min} à ${s.max}`})</span></span>
              </label>
            )))}
          </div>
          <div className="fa-grille">
            <label className="fa-champ fa-4"><span>Ton prix (kamas)</span><input value={prix} onChange={(e) => setPrix(e.target.value)} placeholder="ex. 1 200 000 ou 1,2m" /></label>
            <label className="fa-champ fa-4"><span>Prix à l'HDV <span className="discret">(facultatif)</span></span><input value={prixHdv} onChange={(e) => setPrixHdv(e.target.value)} placeholder="pour afficher la réduction" /></label>
            <label className="fa-champ fa-4"><span>Note <span className="discret">(facultatif)</span></span><input maxLength={300} value={note} onChange={(e) => setNote(e.target.value)} placeholder="ex. négociable, exo PA…" /></label>
          </div>
          <div className="formulaire-annonce__actions">
            <button type="button" className="bouton bouton--vert" onClick={valider} disabled={enCours}>Mettre en vente</button>
            <button type="button" className="bouton" onClick={onAnnuler} disabled={enCours}>Annuler</button>
          </div>
        </>
      )}
    </section>
  );
}
