import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "../components/Badge";
import { IconeMetier } from "../components/IconeMetier";
import { Pastille } from "../components/Pastille";
import { AVIS } from "../data/avis";
import { DOFUS } from "../data/dofus";
import { ouEstLaQuete } from "../data/series";
import { ilYa } from "../lib/dates";
import { chargerAides, chargerDatesQuetes, chargerMetamob, chargerMetiers, compterAvisLivres, retirerAide, type ResumeMetamob } from "../lib/donnees";
import { avancement, etapeActuelle } from "../lib/quetes";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import { estDispo, type AideEtape, type Membre, type MetierMembre, type Personnage } from "../lib/types";
import { Chargement } from "./Acces";

type Donnees = {
  perso: Personnage;
  proprietaire: Membre | null;
  autres: Personnage[];
  metiers: MetierMembre[];
  faites: Set<string>;
  dates: Map<string, string>;
  avisLivres: number;
  aides: AideEtape[];
};

export function Profil() {
  const { id } = useParams();
  const { membre: moi } = useSession();
  const [d, setD] = useState<Donnees | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  const charger = useCallback(async () => {
    if (!id) return;
    try {
      const { data: perso, error } = await supabase.from("personnages").select("*").eq("id", id).single();
      if (error || !perso) throw new Error("Ce personnage n'existe pas ou plus.");
      const p = perso as Personnage;
      const [proprio, autres, metiers, quetes, avisLivres, aides] = await Promise.all([
        supabase.from("membres").select("*").eq("id", p.membre_id).single(),
        supabase.from("personnages").select("*").eq("membre_id", p.membre_id).neq("id", p.id).order("nom"),
        chargerMetiers(p.membre_id),
        chargerDatesQuetes(p.id),
        compterAvisLivres(p.id),
        chargerAides(undefined, p.id),
      ]);
      setD({
        perso: p,
        proprietaire: (proprio.data as Membre) ?? null,
        autres: (autres.data as Personnage[]) ?? [],
        metiers: [...metiers].sort((a, b) => b.niveau - a.niveau),
        faites: new Set(quetes.keys()),
        dates: quetes,
        avisLivres,
        aides,
      });
    } catch (e) {
      setErreur((e as Error).message);
    }
  }, [id]);

  useEffect(() => {
    setD(null);
    charger();
  }, [charger]);

  async function retirerUneAide(queteId: string) {
    if (!d) return;
    try {
      await retirerAide(d.perso.id, queteId);
      setD({ ...d, aides: d.aides.filter((a) => a.quete_id !== queteId) });
    } catch (e) {
      setErreur((e as Error).message);
    }
  }

  async function retirerImage() {
    if (!d || !window.confirm(`Retirer l'image de ${d.perso.nom} ?`)) return;
    const { error } = await supabase.rpc("retirer_image", { p_personnage_id: d.perso.id });
    if (error) setErreur("L'image n'a pas été retirée : " + error.message);
    else charger();
  }

  if (erreur) return <main className="page"><p className="erreur" role="alert">{erreur}</p></main>;
  if (!d) return <Chargement />;

  const { perso, proprietaire, autres, metiers, faites, dates, avisLivres, aides } = d;
  // Un badge par Dofus obtenu, daté par la dernière quête de la série.
  const badges = DOFUS.filter((x) => x.quetes.length > 0 && etapeActuelle(x, faites) === x.quetes.length).map((x) => ({
    dofus: x,
    date: dates.get([...x.quetes].reverse().find((q) => !q.facultative)?.id ?? ""),
  }));
  const estAMoi = perso.membre_id === moi?.id;
  // Cocher une quête compte comme une mise à jour de la fiche (même règle que le tableau de bord).
  const derniereMaj = [perso.maj_le, ...dates.values()].reduce((a, b) => (b > a ? b : a));
  // Bonta : bleu (pureté) · Brâkmar : rouge sombre (enfer) · Neutre : sans couleur.
  const classeAlignement =
    perso.alignement === "Bonta" ? "badge--bonta" : perso.alignement === "Brâkmar" ? "badge--brakmar" : "";

  return (
    <main className="page">
      <section className="carte profil">
        <Pastille perso={perso} dispo={estDispo(proprietaire ?? undefined, perso.id)} taille={112} lien={false} />
        <div className="profil__infos">
          <div className="profil__titre">
            <h1>{perso.nom}</h1>
            <span className="profil__classe">{perso.classe} niveau {perso.niveau}</span>
          </div>
          <div className="badges">
            <span className={`badge ${classeAlignement}`}>{perso.alignement}</span>
            {perso.ordre && <span className={`badge ${classeAlignement}`}>{perso.ordre}{perso.rang_ordre !== null && `, rang ${perso.rang_ordre}`}</span>}
            {perso.niveau_quete_alignement !== null && (
              <span className={`badge ${classeAlignement}`}>Quête d'alignement niv. {perso.niveau_quete_alignement}</span>
            )}
            <span className="badge">{perso.est_principal ? "Personnage principal" : "Mule"}</span>
            <span className="badge">Compte de @{proprietaire?.pseudo ?? "?"}</span>
          </div>
          {badges.length > 0 && (
            <div className="badges-dofus" aria-label="Badges des Dofus obtenus">
              {badges.map((b) => <Badge key={b.dofus.id} dofus={b.dofus} date={b.date} />)}
            </div>
          )}
          <p className="discret">Fiche mise à jour {ilYa(derniereMaj)}</p>
          {autres.length > 0 && (
            <div className="profil__autres">
              <span className="discret">Même compte :</span>
              {autres.map((a) => (
                <Link key={a.id} to={`/perso/${a.id}`} className="puce">{a.nom}, {a.classe} {a.niveau}</Link>
              ))}
            </div>
          )}
        </div>
        <div className="profil__actions">
          {estAMoi && <Link to="/mon-compte" className="bouton bouton--or">Modifier la fiche</Link>}
          {!estAMoi && moi?.est_officier && perso.image_url && (
            <button type="button" className="bouton" onClick={retirerImage}>Retirer l'image</button>
          )}
        </div>
      </section>

      <div className="deux-colonnes">
        <section className="carte">
          <h2>Métiers du compte</h2>
          {metiers.length === 0 ? (
            <p className="vide">Aucun métier renseigné.</p>
          ) : (
            <ul className="liste-metiers">
              {metiers.map((m) => (
                <li key={m.metier}>
                  <Link to={`/metiers/${encodeURIComponent(m.metier)}`} className="metier__nom">
                    <IconeMetier metier={m.metier} taille={30} />
                    {m.metier}
                  </Link>
                  <div className="barre" aria-hidden="true"><div style={{ width: `${m.niveau / 2}%` }} /></div>
                  <strong>{m.niveau}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="carte">
          <h2>Dofus</h2>
          <ul className="grille-dofus">
            {DOFUS.map((dofus) => {
              const total = dofus.quetes.length;
              const obtenu = total > 0 && etapeActuelle(dofus, faites) === total;
              const [faitesN, totalN] = avancement(dofus, faites);
              const statut =
                total === 0 ? "Données à venir"
                : obtenu ? "Obtenu"
                : faitesN === 0 ? "Pas commencé"
                : `${faitesN} / ${totalN} quêtes`;
              const classe = total === 0 ? "dofus--vide" : obtenu ? "dofus--ok" : faitesN > 0 ? "dofus--cours" : "";
              return (
                <li key={dofus.id}>
                  {total > 0 ? (
                    <Link
                      to={`/quetes/${perso.id}?dofus=${dofus.id}`}
                      className={`dofus dofus--lien ${classe}`}
                      style={{ "--dofus": dofus.couleur, "--dofus-accent": dofus.accent ?? dofus.couleur } as React.CSSProperties}
                      aria-label={`Dofus ${dofus.nom}, ${statut}. Voir les étapes`}
                    >
                      <span className="dofus__oeuf" style={{ background: dofus.couleur }} aria-hidden="true" />
                      <div className="dofus__texte">
                        <strong>{dofus.nom}</strong>
                        <span className="dofus__statut">{statut}</span>
                      </div>
                      <span className="dofus__voir" aria-hidden="true">Voir les étapes</span>
                    </Link>
                  ) : (
                    <div className={`dofus ${classe}`}>
                      <span className="dofus__oeuf" style={{ background: dofus.couleur }} aria-hidden="true" />
                      <div className="dofus__texte">
                        <strong>{dofus.nom}</strong>
                        <span className="dofus__statut">{statut}</span>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {aides.length > 0 && (
        <section className="carte">
          <h2>Peut aider sur</h2>
          <ul className="entraide__liste">
            {aides.map((a) => {
              const ou = ouEstLaQuete(a.quete_id);
              if (!ou) return null; // étape retirée du site depuis
              const serie = ou.categorie.estDofus ? `Dofus ${ou.serie.nom}` : ou.serie.nom;
              return (
                <li key={a.quete_id}>
                  <Link to={`/quetes/${perso.id}?cat=${ou.categorie.id}&dofus=${ou.serie.id}`}>{ou.quete.nom}</Link>
                  <span className="discret">{serie}</span>
                  {a.note && <span>{a.note}</span>}
                  <span className="discret discret-taille">{ilYa(a.cree_le)}</span>
                  {estAMoi && <button type="button" className="lien-bouton" onClick={() => retirerUneAide(a.quete_id)}>Retirer</button>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="carte">
        <h2>Chasses</h2>
        <ul className="liste-jauges">
          <li>
            <Link to={`/avis/${perso.id}`} className="jauge__nom">Avis de recherche</Link>
            <div className="barre" aria-hidden="true"><div style={{ width: `${(avisLivres / AVIS.length) * 100}%` }} /></div>
            <strong>{avisLivres} / {AVIS.length}</strong>
          </li>
          <JaugeMetamob perso={perso} proprietaire={proprietaire} estAMoi={estAMoi} />
        </ul>
      </section>
    </main>
  );
}

/** Pierres d'archimonstres et de boss réunies pour le Dofus Ocre, lues sur Metamob. */
function JaugeMetamob({ perso, proprietaire, estAMoi }: { perso: Personnage; proprietaire: Membre | null; estAMoi: boolean }) {
  const [resume, setResume] = useState<ResumeMetamob | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const lien = proprietaire?.metamob && /^https:\/\/(www\.)?metamob\.fr\//i.test(proprietaire.metamob) ? proprietaire.metamob : null;

  const charger = useCallback(async (forcer = false) => {
    if (!proprietaire?.metamob) return;
    setEnCours(true);
    setErreur(null);
    try {
      setResume(await chargerMetamob(proprietaire.id, forcer));
    } catch (e) {
      setErreur((e as Error).message);
    }
    setEnCours(false);
  }, [proprietaire]);

  useEffect(() => {
    charger();
  }, [charger]);

  const libelle = lien
    ? <a href={lien} target="_blank" rel="noreferrer" className="jauge__nom">Pierres du Dofus Ocre</a>
    : <span className="jauge__nom">Pierres du Dofus Ocre</span>;

  if (!proprietaire?.metamob) {
    return (
      <li>
        {libelle}
        <span className="discret jauge__ligne">
          {estAMoi ? <>Ajoute ton profil Metamob dans <Link to="/mon-compte">Mon compte</Link>.</> : "Pas de profil Metamob renseigné."}
        </span>
      </li>
    );
  }
  if (erreur) return <li>{libelle}<span className="erreur jauge__ligne">{erreur}</span></li>;
  if (!resume) return <li>{libelle}<span className="discret jauge__ligne">Chargement…</span></li>;

  // La quête Metamob de ce personnage : même nom, sans tenir compte des majuscules.
  const quete = resume.quetes.find((q) => q.personnage.trim().toLowerCase() === perso.nom.trim().toLowerCase());
  if (!quete) {
    const autres = resume.quetes.map((q) => q.personnage).filter(Boolean);
    return (
      <li>
        {libelle}
        <span className="discret jauge__ligne">
          Aucune quête Ocre publique au nom de {perso.nom} sur Metamob
          {autres.length > 0 ? ` (quêtes trouvées : ${autres.join(", ")}).` : "."}
        </span>
      </li>
    );
  }

  const possedes = quete.archis.possedes + quete.boss.possedes;
  const total = quete.archis.total + quete.boss.total;
  return (
    <li>
      {libelle}
      <div className="barre" aria-hidden="true"><div style={{ width: `${total ? (possedes / total) * 100 : 0}%` }} /></div>
      <strong>{possedes} / {total}</strong>
      <span className="discret jauge__ligne">
        Archimonstres {quete.archis.possedes} / {quete.archis.total}, boss {quete.boss.possedes} / {quete.boss.total}, étape {quete.etape} / {quete.etapes}.
        {resume.maj_le && ` Lu sur Metamob ${ilYa(resume.maj_le)}.`}{" "}
        <button type="button" className="lien-bouton" onClick={() => charger(true)} disabled={enCours}>Actualiser</button>
      </span>
    </li>
  );
}
