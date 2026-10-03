// États de combat expliqués au survol dans les fiches des avis.
// Définitions résumées à partir de JeuxOnLine (« États et symboles ») et des fiches DPLN.
// L'ordre compte : les expressions longues passent avant les courtes (« invulnérable à distance » avant « invulnérable »).

export type Etat = { nom: string; motif: string; definition: string };

export const ETATS: Etat[] = [
  { nom: "Invulnérable à distance", motif: "invulnérables? à distance", definition: "Ne subit aucun dommage à distance : il faut le frapper au corps à corps." },
  { nom: "Invulnérable", motif: "invulnérables?|invulnérabilité", definition: "Ne subit aucun dommage tant que l'état dure." },
  { nom: "Réduction armes", motif: "réduction armes", definition: "Les dommages des armes qu'il reçoit sont réduits : privilégiez les sorts." },
  { nom: "Réduction à distance", motif: "réduction à distance", definition: "Les dommages qu'il reçoit à distance sont réduits : privilégiez le corps à corps." },
  { nom: "Réduction en mêlée", motif: "réduction en mêlée", definition: "Les dommages qu'il reçoit au corps à corps sont réduits : privilégiez la distance." },
  { nom: "Pacifiste", motif: "pacifistes?", definition: "Ne peut infliger aucun dommage tant que l'état dure." },
  { nom: "Affaibli", motif: "affaiblie?s?", definition: "Ne peut pas utiliser son arme." },
  { nom: "Insoignable", motif: "insoignables?", definition: "Ne peut pas être soigné." },
  { nom: "Pesanteur", motif: "pesanteur", definition: "Empêche les téléportations et les échanges de place." },
  { nom: "Inébranlable", motif: "inébranlables?", definition: "Ne peut être ni poussé ni attiré, mais peut être échangé de place." },
  { nom: "Indéplaçable", motif: "indéplaçables?", definition: "Ne peut pas être déplacé du tout." },
  { nom: "Enraciné", motif: "enracinée?s?", definition: "Ne peut pas être déplacé ni taclé, et ne tacle personne." },
  { nom: "Intaclable", motif: "intaclables?", definition: "Ne peut pas être taclé." },
  { nom: "Intacleur", motif: "intacleurs?", definition: "Ne peut tacler personne." },
  { nom: "Invisible", motif: "invisibles?|invisibilité", definition: "Sa position est cachée à l'adversaire jusqu'à ce qu'il frappe ou soit révélé." },
  { nom: "Foudroyé", motif: "foudroyée?s?", definition: "Marque posée par certains recherchés : leurs sorts ont un effet en plus sur vous tant que vous l'avez." },
  { nom: "Silencieux", motif: "silencieu(?:x|se|ses)", definition: "Ne peut utiliser ni ses sorts ni son arme : seuls les déplacements restent possibles." },
  { nom: "Accès aux dimensions", motif: "l'accès (?:à|au) (?:Enutrosor|Srambad|Xélorium|Ecaflipus|Osavora)", definition: "Accès permanent une fois la chasse de la dimension réussie. Le portail s'ouvre ensuite depuis la Tour des Voyageurs [-22,-24]." },
  { nom: "Folie", motif: "folie", definition: "Monte de 1 à chaque coup de certains monstres et baisse de 1 au début de chacun de vos tours. À 2, vos sorts touchent aussi vos alliés proches ; à 4, les soins reçus sont réduits de moitié ; à 6, vous subissez plus de dégâts ; à 10, le personnage meurt." },
  { nom: "Érosion", motif: "érosion", definition: "Une partie des dommages subis est retirée des PV maximum jusqu'à la fin du combat." },
  { nom: "Alliés de circonstance", motif: "alliés de circonstance", definition: "Commun à tous les recherchés : chaque monstre qui l'accompagne lui retire de la vitalité et de la puissance." },
];

const PAR_NOM = new Map(ETATS.map((e) => [e.nom.toLowerCase(), e]));

/** Définition d'un état par son nom exact (pour les étiquettes de protection). */
export const definitionEtat = (nom: string) => PAR_NOM.get(nom.toLowerCase())?.definition;

/** Découpe un texte en morceaux : chaînes simples et états reconnus. */
export function decouperEtats(texte: string): (string | { etat: Etat; texte: string })[] {
  const motif = new RegExp(`(?<![\\p{L}])(${ETATS.map((e) => e.motif).join("|")})(?![\\p{L}])`, "giu");
  const morceaux: (string | { etat: Etat; texte: string })[] = [];
  let dernier = 0;
  for (const m of texte.matchAll(motif)) {
    const debut = m.index ?? 0;
    const trouve = ETATS.find((e) => new RegExp(`^(${e.motif})$`, "iu").test(m[0]));
    if (!trouve) continue;
    if (debut > dernier) morceaux.push(texte.slice(dernier, debut));
    morceaux.push({ etat: trouve, texte: m[0] });
    dernier = debut + m[0].length;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return morceaux;
}
