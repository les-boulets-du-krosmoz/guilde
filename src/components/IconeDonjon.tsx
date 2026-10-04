/** Icône des succès d'un donjon telle qu'en jeu (ou portrait du boss) ; 🏆 si le jeu n'en fournit aucune. */
export function IconeDonjon({ fichier, taille = 28, titre = "Succès du donjon" }: { fichier: string; taille?: number; titre?: string }) {
  if (!fichier) return <span className="icone-donjon icone-donjon--vide" style={{ width: taille, height: taille }} title={titre} role="img" aria-label={titre}>🏆</span>;
  return <img className="icone-donjon" src={`/icones/donjons/${fichier}`} width={taille} height={taille} alt={titre} title={titre} />;
}

export const imageDonjon = (fichier: string) => (fichier ? `/icones/donjons/${fichier}` : undefined);
