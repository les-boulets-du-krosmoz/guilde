import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Pastille } from "../components/Pastille";
import { ilYa } from "../lib/dates";
import { chargerGuilde, chargerMetamobGuilde, type DonneesGuilde, type MetamobGuilde, type QueteMetamob } from "../lib/donnees";
import { useSession } from "../lib/session";
import type { Personnage } from "../lib/types";
import { Chargement } from "./Acces";

const sansAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Un membre qui possède un archi : son pseudo, son personnage, la quantité, et s'il en a en trop (donc à échanger). */
type Detenteur = { membre_id: string; pseudo: string; personnage: string; quantite: number; enTrop: boolean };

/**
 * Archimonstres (quête du Dofus Ocre, d'après Metamob) : l'avancement de chaque membre, puis les archis
 * qui te manquent avec, pour chacun, les membres de la guilde qui l'ont.
 */
export function Archimonstres() {
  const { membre } = useSession();
  const [guilde, setGuilde] = useState<DonneesGuilde | null>(null);
  const [meta, setMeta] = useState<MetamobGuilde | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [maQuete, setMaQuete] = useState(0);
  const [tous, setTous] = useState(false);
  const [seulementDetenus, setSeulementDetenus] = useState(false);
  const [recherche, setRecherche] = useState("");
  const relances = useRef(0);

  useEffect(() => { chargerGuilde().then(setGuilde).catch((e) => setErreur(e.message)); }, []);
  // Les résumés se remplissent par lots (limite de Metamob) : tant qu'il en reste, on relance toutes les 20 s.
  useEffect(() => {
    let actif = true;
    let minuteur: ReturnType<typeof setTimeout>;
    const charger = () => chargerMetamobGuilde().then((d) => {
      if (!actif) return;
      setMeta(d);
      if (d.restants > 0 && relances.current < 20) { relances.current++; minuteur = setTimeout(charger, 20000); }
    }).catch((e) => actif && setErreur(e.message));
    charger();
    return () => { actif = false; clearTimeout(minuteur); };
  }, []);

  const principal = useMemo(() => {
    const m = new Map<string, Personnage>();
    for (const p of guilde?.personnages ?? []) if (!m.has(p.membre_id) || p.est_principal) m.set(p.membre_id, p);
    return m;
  }, [guilde]);

  if (erreur && !meta) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!guilde || !meta || !membre) return <Chargement />;
  const pseudoSite = (id: string) => guilde.membres.get(id)?.pseudo ?? "?";

  const lignes = [...meta.membres].sort((a, b) => {
    const ta = a.donnees?.quetes?.[0]?.archis?.possedes ?? -1, tb = b.donnees?.quetes?.[0]?.archis?.possedes ?? -1;
    return tb - ta || pseudoSite(a.membre_id).localeCompare(pseudoSite(b.membre_id));
  });

  // Mes quêtes Ocre, et la quête choisie
  const moi = meta.membres.find((l) => l.membre_id === membre.id);
  const mesQuetes = moi?.donnees?.quetes ?? [];
  const quete: QueteMetamob | undefined = mesQuetes[Math.min(maQuete, mesQuetes.length - 1)];

  // Qui possède chaque archi (hors moi) ; « en trop » = plus que ce qu'il lui faut (ou étape déjà passée)
  const etapeArchi = new Map(meta.catalogue.map((a) => [a.id, a.etape]));
  const detenteurs = new Map<number, Detenteur[]>();
  for (const l of meta.membres) {
    if (l.membre_id === membre.id) continue;
    for (const q of l.donnees?.quetes ?? []) {
      for (const [id, quantite] of Object.entries(q.possession ?? {})) {
        const etape = etapeArchi.get(Number(id));
        const besoin = etape !== undefined && etape < q.etape ? 0 : (q.parallele ?? 1);
        const liste = detenteurs.get(Number(id)) ?? [];
        liste.push({ membre_id: l.membre_id, pseudo: pseudoSite(l.membre_id), personnage: q.personnage, quantite, enTrop: quantite > besoin });
        detenteurs.set(Number(id), liste);
      }
    }
  }
  for (const l of detenteurs.values()) l.sort((a, b) => Number(b.enTrop) - Number(a.enTrop) || b.quantite - a.quantite);

  const manque = (id: number, etape: number) => !!quete && etape >= quete.etape && (quete.possession?.[id] ?? 0) < (quete.parallele ?? 1);
  const q = sansAccents(recherche.trim());
  const archis = meta.catalogue
    .filter((a) => tous || manque(a.id, a.etape))
    .filter((a) => !q || sansAccents(a.nom).includes(q))
    .filter((a) => !seulementDetenus || (detenteurs.get(a.id)?.length ?? 0) > 0);
  const nbManquants = meta.catalogue.filter((a) => manque(a.id, a.etape)).length;
  const nbTrouvables = meta.catalogue.filter((a) => manque(a.id, a.etape) && (detenteurs.get(a.id)?.length ?? 0) > 0).length;

  return (
    <main className="page archis">
      <div className="entete">
        <div>
          <h1>Archimonstres</h1>
          <p className="discret">La quête du Dofus Ocre de chacun, d'après Metamob. Le pseudo Metamob se règle dans <Link to="/mon-compte">Mon compte</Link> (sinon, le nom de ton personnage principal est utilisé).</p>
        </div>
      </div>
      {meta.alerte && <p className="erreur" role="alert">{meta.alerte}</p>}
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
      {meta.restants > 0 && <p className="discret-taille" role="status">⏳ Lecture de Metamob en cours : encore {meta.restants} membre{meta.restants > 1 ? "s" : ""} à charger (par petits lots, pour respecter la limite de Metamob).</p>}

      <section className="carte archis__section">
        <h2>La guilde</h2>
        <ul className="archis__membres">
          {lignes.map((l) => {
            const perso = principal.get(l.membre_id);
            const d = l.donnees;
            return (
              <li key={l.membre_id} className={l.membre_id === membre.id ? "archis__membre--moi" : ""}>
                <div className="archis__qui">
                  {perso && <Pastille perso={perso} taille={26} />}
                  <div><strong>{pseudoSite(l.membre_id)}</strong>{l.pseudo && <span className="discret-taille"> · Metamob : {l.pseudo}</span>}</div>
                </div>
                {!l.pseudo || d?.introuvable ? (
                  <span className="archis__statut">Pas inscrit sur Metamob</span>
                ) : !d ? (
                  <span className="discret-taille">chargement…</span>
                ) : d.quetes.length === 0 ? (
                  <span className="archis__statut">Aucune quête Ocre publique</span>
                ) : (
                  <div className="archis__quetes">
                    {d.quetes.map((qq, k) => (
                      <div key={k} className="archis__quete">
                        <span className="discret-taille">{qq.personnage || "Quête"} · étape {qq.etape}/{qq.etapes}</span>
                        <span className="archis__barre" title={`${qq.archis.possedes} archis sur ${qq.archis.total}`}>
                          <span style={{ width: `${qq.archis.total ? (100 * qq.archis.possedes) / qq.archis.total : 0}%` }} />
                        </span>
                        <span><strong>{qq.archis.possedes}</strong><span className="discret-taille"> / {qq.archis.total} archis</span></span>
                      </div>
                    ))}
                    {l.maj_le && <span className="discret-taille archis__maj">{ilYa(l.maj_le)}</span>}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="carte archis__section">
        <h2>{tous ? "Tous les archis" : "Les archis qui te manquent"}</h2>
        {!moi?.pseudo || moi.donnees?.introuvable ? (
          <p className="vide">Ton profil Metamob est introuvable : indique ton pseudo Metamob dans <Link to="/mon-compte">Mon compte</Link>.</p>
        ) : !moi.donnees ? (
          <p className="discret">Ta quête est en cours de lecture…</p>
        ) : !quete ? (
          <p className="vide">Aucune quête Ocre publique sur ton profil Metamob.</p>
        ) : (
          <>
            <div className="archis__outils">
              {mesQuetes.length > 1 && (
                <select value={maQuete} onChange={(e) => setMaQuete(Number(e.target.value))} aria-label="Quête">
                  {mesQuetes.map((qq, k) => <option key={k} value={k}>{qq.personnage || `Quête ${k + 1}`}</option>)}
                </select>
              )}
              <input type="search" placeholder="Rechercher un archi…" value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label="Rechercher un archi" />
              <label className="case"><input type="checkbox" checked={tous} onChange={() => setTous(!tous)} /> Tous les archis</label>
              <label className="case"><input type="checkbox" checked={seulementDetenus} onChange={() => setSeulementDetenus(!seulementDetenus)} /> Seulement ceux qu'un membre possède</label>
            </div>
            <p className="discret-taille">
              Il te manque <strong>{nbManquants}</strong> archi{nbManquants > 1 ? "s" : ""} (étape {quete.etape} et suivantes, {quete.parallele ?? 1} exemplaire{(quete.parallele ?? 1) > 1 ? "s" : ""} de chaque) ;
              {" "}<strong>{nbTrouvables}</strong> sont chez au moins un membre de la guilde. <span className="archis__trop">En vert</span> : il en a en trop, donc à échanger.
            </p>
            {archis.length === 0 ? (
              <p className="vide">{nbManquants === 0 && !tous ? "Il ne te manque aucun archi : bravo !" : "Aucun archi ne correspond."}</p>
            ) : (
              <ul className="archis__liste">
                {archis.map((a) => {
                  const qui = detenteurs.get(a.id) ?? [];
                  const mien = quete.possession?.[a.id] ?? 0;
                  return (
                    <li key={a.id} className={manque(a.id, a.etape) ? "archis__archi--manque" : ""}>
                      <div className="archis__archi-tete">
                        <strong>{a.nom}</strong>
                        <span className="discret-taille">étape {a.etape} · tu en as {mien}/{quete.parallele ?? 1}</span>
                      </div>
                      {qui.length === 0 ? (
                        <span className="discret-taille">Personne dans la guilde</span>
                      ) : (
                        <ul className="archis__detenteurs">
                          {qui.map((d, k) => (
                            <li key={k} className={d.enTrop ? "archis__trop" : ""} title={d.enTrop ? "En a en trop : à échanger" : "En a, mais en a besoin"}>
                              {d.pseudo}{d.personnage ? ` (${d.personnage})` : ""} ×{d.quantite}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}
