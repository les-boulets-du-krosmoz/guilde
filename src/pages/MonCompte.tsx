import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Pastille } from "../components/Pastille";
import { ALIGNEMENTS, CLASSES, METIERS, METIERS_AUTRES, METIERS_CRAFT, METIERS_RECOLTE, ORDRES } from "../data/constantes";
import { ilYa } from "../lib/dates";
import { FormulaireOcre } from "../components/FormulaireOcre";
import { IconeMetier } from "../components/IconeMetier";
import { chargerMetiers, effacerOcre } from "../lib/donnees";
import { validerImageUrl } from "../lib/image";
import { useSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import type { Alignement, MetierMembre, Personnage } from "../lib/types";

export function MonCompte() {
  const { mesPersos } = useSession();
  const [edition, setEdition] = useState<string | "nouveau" | null>(mesPersos.length === 0 ? "nouveau" : null);

  return (
    <main className="page">
      <h1>Mon compte</h1>

      <section className="carte">
        <div className="carte__entete">
          <h2>Mes personnages</h2>
          {edition !== "nouveau" && (
            <button type="button" className="bouton" onClick={() => setEdition("nouveau")}>Ajouter un personnage</button>
          )}
        </div>

        {edition === "nouveau" && (
          <FormPerso estPremier={mesPersos.length === 0} onFini={() => setEdition(null)} />
        )}

        <ul className="mes-persos">
          {mesPersos.map((p) =>
            edition === p.id ? (
              <li key={p.id}><FormPerso perso={p} onFini={() => setEdition(null)} /></li>
            ) : (
              <li key={p.id} className="mes-persos__ligne">
                <Pastille perso={p} taille={40} />
                <div>
                  <Link to={`/perso/${p.id}`} className="carte__titre">{p.nom}</Link>
                  <div className="discret">
                    {p.classe} niveau {p.niveau}, {p.est_principal ? "principal" : "mule"}, mis à jour {ilYa(p.maj_le)}
                  </div>
                </div>
                <button type="button" className="bouton" onClick={() => setEdition(p.id)}>Modifier</button>
              </li>
            ),
          )}
        </ul>
      </section>

      <FormMetiers />
      <FormMetamob />
      <OcreAlaMain />
    </main>
  );
}

// ---------- Metamob ----------

function FormMetamob() {
  const { membre, rafraichir } = useSession();
  const [valeur, setValeur] = useState(membre?.metamob ?? "");
  const [message, setMessage] = useState<{ texte: string; erreur: boolean } | null>(null);
  const [enCours, setEnCours] = useState(false);

  async function enregistrer(e: FormEvent) {
    e.preventDefault();
    if (!membre) return;
    const propre = valeur.trim();
    if (propre && !/^https?:\/\/(www\.)?metamob\.fr\//i.test(propre) && !/^[\p{L}\p{N}_.-]{2,40}$/u.test(propre)) {
      setMessage({ texte: "Indique ton pseudo Metamob, ou colle le lien de ton profil.", erreur: true });
      return;
    }
    setEnCours(true);
    const { error } = await supabase.from("membres").update({ metamob: propre || null }).eq("id", membre.id);
    setEnCours(false);
    if (error) {
      setMessage({ texte: "Enregistrement impossible : " + error.message, erreur: true });
      return;
    }
    setMessage({ texte: "Enregistré.", erreur: false });
    await rafraichir();
  }

  return (
    <form className="carte" onSubmit={enregistrer}>
      <h2>Archimonstres</h2>
      <div className="champ">
        <label htmlFor="metamob">Pseudo Metamob (facultatif)</label>
        <input
          id="metamob"
          type="text"
          placeholder="Vide = nom de ton personnage principal"
          value={valeur}
          maxLength={200}
          onChange={(e) => setValeur(e.target.value)}
          aria-describedby="metamob-aide"
        />
        <span id="metamob-aide" className="discret">
          Par défaut, le site lit metamob.fr/profile/ suivi du nom de ton personnage principal. Remplis ce champ seulement si ton pseudo Metamob est différent. Ta quête du Dofus Ocre doit être publique, au nom de ton personnage.
        </span>
      </div>
      <div className="formulaire__actions">
        <button type="submit" className="bouton bouton--or" disabled={enCours}>Enregistrer</button>
        {message && <span className={message.erreur ? "erreur" : "vert"} role="status">{message.texte}</span>}
      </div>
    </form>
  );
}

/** Dofus Ocre saisi à la main, personnage par personnage (utile sans Metamob, ou quand il ne répond pas). */
function OcreAlaMain() {
  const { mesPersos, rafraichir } = useSession();
  const [ouvert, setOuvert] = useState<string | null>(null);
  if (mesPersos.length === 0) return null;

  return (
    <section className="carte">
      <h2>Dofus Ocre à la main</h2>
      <p className="discret">
        Sans Metamob, ou s'il ne répond pas, indique ici où en est chaque personnage. La fiche affiche la source la plus récente.
      </p>
      <ul className="ocre-compte__liste">
        {mesPersos.map((p) => (
          <li key={p.id}>
            <div className="ocre-compte__ligne">
              <strong>{p.nom}</strong>
              <span className="discret">
                {p.ocre_saisi_le
                  ? `Archimonstres ${p.ocre_archis} / ${p.ocre_archis_total}, boss ${p.ocre_boss} / ${p.ocre_boss_total}, saisi ${ilYa(p.ocre_saisi_le)}`
                  : "Pas de saisie"}
              </span>
              {ouvert !== p.id && (
                <button type="button" className="lien-bouton" onClick={() => setOuvert(p.id)}>{p.ocre_saisi_le ? "Modifier" : "Saisir"}</button>
              )}
              {ouvert !== p.id && p.ocre_saisi_le && (
                <button type="button" className="lien-bouton" onClick={() => effacerOcre(p.id).then(rafraichir)}>Effacer</button>
              )}
            </div>
            {ouvert === p.id && (
              <FormulaireOcre
                personnageId={p.id}
                initial={{
                  archis: p.ocre_archis,
                  archisTotal: p.ocre_archis_total, // vide : 286 par défaut
                  boss: p.ocre_boss,
                  bossTotal: p.ocre_boss_total, // vide : 51 par défaut
                }}
                onFini={() => { setOuvert(null); rafraichir(); }}
                onAnnuler={() => setOuvert(null)}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------- Personnage ----------

function FormPerso({ perso, estPremier = false, onFini }: { perso?: Personnage; estPremier?: boolean; onFini: () => void }) {
  const { membre, mesPersos, rafraichir } = useSession();
  const [nom, setNom] = useState(perso?.nom ?? "");
  const [classe, setClasse] = useState(perso?.classe ?? CLASSES[0]);
  const [niveau, setNiveau] = useState(perso?.niveau ?? 1);
  const [alignement, setAlignement] = useState<Alignement>(perso?.alignement ?? "Neutre");
  const [ordre, setOrdre] = useState(perso?.ordre ?? "");
  const [niveauAlign, setNiveauAlign] = useState<string>(perso?.niveau_quete_alignement?.toString() ?? "");
  const [rangOrdre, setRangOrdre] = useState<string>(perso?.rang_ordre?.toString() ?? "");
  const [principal, setPrincipal] = useState(perso?.est_principal ?? estPremier);
  const [image, setImage] = useState(perso?.image_url ?? "");
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const erreurImage = validerImageUrl(image);
  const ordres = ORDRES[alignement];

  function changerAlignement(a: Alignement) {
    setAlignement(a);
    setOrdre(ORDRES[a][0] ?? "");
    if (a === "Neutre") {
      setNiveauAlign("");
      setRangOrdre("");
    }
  }

  async function enregistrer(e: FormEvent) {
    e.preventDefault();
    if (!membre || erreurImage) return;
    setEnCours(true);
    setErreur(null);

    // La fiche est enregistrée d'abord, sans changer de principal : si ça échoue (nom déjà pris),
    // l'ancien principal garde son statut. Le changement de principal vient ensuite.
    const devientPrincipal = principal && !perso?.est_principal;

    const valeurs = {
      membre_id: membre.id,
      nom: nom.trim(),
      classe,
      niveau,
      alignement,
      ordre: alignement === "Neutre" ? null : ordre,
      niveau_quete_alignement: alignement === "Neutre" || niveauAlign === "" ? null : Number(niveauAlign),
      rang_ordre: alignement === "Neutre" || rangOrdre === "" ? null : Number(rangOrdre),
      est_principal: principal && !devientPrincipal,
      image_url: image.trim() || null,
    };
    const { data, error } = perso
      ? await supabase.from("personnages").update(valeurs).eq("id", perso.id).select("id").single()
      : await supabase.from("personnages").insert(valeurs).select("id").single();

    if (error || !data) {
      setEnCours(false);
      setErreur(error?.code === "23505" ? "Ce nom de personnage existe déjà." : "Enregistrement impossible : " + (error?.message ?? "erreur inconnue"));
      return;
    }

    // Un seul principal par compte : on retire le statut à l'ancien, puis on le donne à celui-ci.
    if (devientPrincipal) {
      const retrait = await supabase.from("personnages").update({ est_principal: false }).eq("membre_id", membre.id).eq("est_principal", true);
      const ajout = retrait.error ? retrait : await supabase.from("personnages").update({ est_principal: true }).eq("id", data.id);
      if (ajout.error) {
        setEnCours(false);
        await rafraichir();
        setErreur("Fiche enregistrée, mais le changement de personnage principal a échoué : " + ajout.error.message);
        return;
      }
    }
    setEnCours(false);
    await rafraichir();
    onFini();
  }

  async function supprimer() {
    if (!perso || !window.confirm(`Supprimer ${perso.nom} et toute sa progression ?`)) return;
    const { error } = await supabase.from("personnages").delete().eq("id", perso.id);
    if (error) return setErreur("Suppression impossible : " + error.message);
    await rafraichir();
    onFini();
  }

  const id = (champ: string) => `${perso?.id ?? "nouveau"}-${champ}`;

  return (
    <form className="formulaire" onSubmit={enregistrer}>
      <div className="formulaire__grille">
        <div className="champ">
          <label htmlFor={id("nom")}>Nom du personnage</label>
          <input id={id("nom")} required minLength={2} maxLength={30} value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div className="champ">
          <label htmlFor={id("classe")}>Classe</label>
          <select id={id("classe")} value={classe} onChange={(e) => setClasse(e.target.value)}>
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="champ">
          <label htmlFor={id("niveau")}>Niveau</label>
          <input id={id("niveau")} type="number" min={1} max={200} required value={niveau} onChange={(e) => setNiveau(Number(e.target.value))} />
        </div>
        <div className="champ">
          <label htmlFor={id("align")}>Alignement</label>
          <select id={id("align")} value={alignement} onChange={(e) => changerAlignement(e.target.value as Alignement)}>
            {ALIGNEMENTS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
        {ordres.length > 0 && (
          <>
            <div className="champ">
              <label htmlFor={id("ordre")}>Ordre</label>
              <select id={id("ordre")} value={ordre} onChange={(e) => setOrdre(e.target.value)}>
                {ordres.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="champ">
              <label htmlFor={id("nivalign")}>Niveau de la quête d'alignement</label>
              <input id={id("nivalign")} type="number" min={0} value={niveauAlign} onChange={(e) => setNiveauAlign(e.target.value)} />
            </div>
            <div className="champ">
              <label htmlFor={id("rang")}>Rang dans l'ordre</label>
              <select id={id("rang")} value={rangOrdre} onChange={(e) => setRangOrdre(e.target.value)}>
                <option value="">Non renseigné</option>
                {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>Rang {r}</option>)}
              </select>
            </div>
          </>
        )}
        <div className="champ champ--large">
          <label htmlFor={id("image")}>Image (lien https, facultatif)</label>
          <input id={id("image")} type="url" inputMode="url" placeholder="https://…" value={image} onChange={(e) => setImage(e.target.value)} aria-describedby={erreurImage ? id("image-aide") : undefined} />
          {erreurImage && <span id={id("image-aide")} className="erreur">{erreurImage}</span>}
          {membre?.avatar_url && image.trim() !== membre.avatar_url && (
            <button type="button" className="bouton bouton--discret champ__action" onClick={() => setImage(membre.avatar_url!)}>
              <img src={membre.avatar_url} alt="" width={24} height={24} className="mini-avatar" referrerPolicy="no-referrer" />
              Utiliser mon avatar Discord
            </button>
          )}
          {membre?.avatar_url && image.trim() === membre.avatar_url && (
            <span className="discret">Ton avatar Discord est utilisé.</span>
          )}
        </div>
        <label className="case">
          <input type="checkbox" checked={principal} onChange={(e) => setPrincipal(e.target.checked)} />
          Personnage principal{mesPersos.length > 1 ? " (remplace l'actuel)" : ""}
        </label>
      </div>
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
      <div className="formulaire__actions">
        <button type="submit" className="bouton bouton--or" disabled={enCours || !!erreurImage}>
          {perso ? "Enregistrer" : "Créer le personnage"}
        </button>
        <button type="button" className="bouton" onClick={onFini}>Annuler</button>
        {perso && <button type="button" className="bouton bouton--danger" onClick={supprimer}>Supprimer</button>}
      </div>
    </form>
  );
}

// ---------- Métiers ----------

function FormMetiers() {
  const { membre } = useSession();
  const [initial, setInitial] = useState<Map<string, MetierMembre>>(new Map());
  const [valeurs, setValeurs] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  async function charger() {
    if (!membre) return;
    const liste = await chargerMetiers(membre.id);
    setInitial(new Map(liste.map((m) => [m.metier, m])));
    setValeurs(Object.fromEntries(liste.map((m) => [m.metier, String(m.niveau)])));
  }

  useEffect(() => {
    charger();
  }, [membre?.id]);

  async function enregistrer(e: FormEvent) {
    e.preventDefault();
    if (!membre) return;
    setEnCours(true);
    setMessage(null);

    // On n'envoie que ce qui a changé, pour ne pas remettre à zéro les dates de mise à jour.
    const aEcrire: { membre_id: string; metier: string; niveau: number }[] = [];
    const aSupprimer: string[] = [];
    for (const metier of METIERS) {
      const saisi = Number(valeurs[metier] || 0);
      const avant = initial.get(metier)?.niveau ?? 0;
      if (saisi === avant) continue;
      if (saisi > 0) aEcrire.push({ membre_id: membre.id, metier, niveau: saisi });
      else aSupprimer.push(metier);
    }

    const erreurs: string[] = [];
    if (aEcrire.length) {
      const { error } = await supabase.from("metiers_membre").upsert(aEcrire);
      if (error) erreurs.push(error.message);
    }
    if (aSupprimer.length) {
      const { error } = await supabase.from("metiers_membre").delete().eq("membre_id", membre.id).in("metier", aSupprimer);
      if (error) erreurs.push(error.message);
    }
    setEnCours(false);
    setMessage(erreurs.length ? "Erreur : " + erreurs.join(" ; ") : aEcrire.length + aSupprimer.length === 0 ? "Aucun changement." : "Métiers enregistrés.");
    await charger();
  }

  // Fonction de rendu (et non composant) : sinon le champ perdrait le focus à chaque frappe.
  function champMetier(metier: string) {
    const maj = initial.get(metier)?.maj_le;
    return (
      <div key={metier} className="champ champ--ligne">
        <label htmlFor={`metier-${metier}`} className="metier-libelle">
          <IconeMetier metier={metier} taille={28} />
          {metier}
        </label>
        <input
          id={`metier-${metier}`}
          type="number"
          min={0}
          max={200}
          value={valeurs[metier] ?? ""}
          onChange={(e) => setValeurs((v) => ({ ...v, [metier]: e.target.value }))}
        />
        {maj && <span className="discret">{ilYa(maj)}</span>}
      </div>
    );
  }

  return (
    <section className="carte">
      <div className="carte__entete">
        <h2>Métiers du compte</h2>
        <span className="discret">Communs à tous tes personnages.</span>
      </div>
      <form onSubmit={enregistrer}>
        <div className="metiers-saisie">
          <fieldset className="groupe-metiers">
            <legend>Récolte</legend>
            {METIERS_RECOLTE.map(champMetier)}
          </fieldset>

          <fieldset className="groupe-metiers groupe-metiers--craft">
            <legend>Craft et forgemagie</legend>
            <div className="craft-fm__entete" aria-hidden="true"><span>Craft</span><span>Forgemagie associée</span></div>
            {METIERS_CRAFT.map(({ craft, fm }) => (
              <div key={craft} className="craft-fm">
                {champMetier(craft)}
                {fm ? champMetier(fm) : <span className="discret craft-fm__vide">pas de forgemagie</span>}
              </div>
            ))}
          </fieldset>

          <fieldset className="groupe-metiers">
            <legend>Autres</legend>
            {METIERS_AUTRES.map(champMetier)}
          </fieldset>
        </div>
        <div className="formulaire__actions">
          <button type="submit" className="bouton bouton--or" disabled={enCours}>Enregistrer les métiers</button>
          {message && <span role="status">{message}</span>}
        </div>
      </form>
    </section>
  );
}
