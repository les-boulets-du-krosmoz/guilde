import { useSession } from "../lib/session";

export function Connexion() {
  const { seConnecter, erreur } = useSession();
  return (
    <main className="acces">
      <img src="/logo-512.webp" alt="Logo de la guilde Les boulets du Krosmoz" width={180} height={180} className="acces__logo" />
      <h1>Les boulets du Krosmoz</h1>
      <p>Connecte-toi avec le compte Discord que tu utilises sur le serveur de la guilde.</p>
      <button type="button" className="bouton bouton--discord" onClick={seConnecter}>
        Se connecter avec Discord
      </button>
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
    </main>
  );
}

export function NonMembre() {
  const { seDeconnecter, erreur } = useSession();
  return (
    <main className="acces">
      <img src="/logo-512.webp" alt="" width={120} height={120} className="acces__logo" />
      <h1>Accès réservé à la guilde</h1>
      <p>
        Ton compte Discord n'est pas sur le serveur de la guilde. Rejoins le serveur, puis déconnecte-toi et
        reconnecte-toi pour relancer la vérification.
      </p>
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
      <button type="button" className="bouton" onClick={seDeconnecter}>Se déconnecter</button>
    </main>
  );
}

export function Chargement() {
  return <p className="chargement" role="status">Chargement…</p>;
}
