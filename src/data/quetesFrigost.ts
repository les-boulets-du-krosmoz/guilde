import { donjon, DPLN, q, res, texte, type Dofus } from "./dofus";

// Frigost : les donjons de l'île dans l'ordre où le jeu les ouvre. Chaque donjon débloque la zone suivante.
// Ordre recoupé entre plusieurs guides et réponses du forum officiel ; boss, positions et niveaux : liste des donjons de DPLN.
// Préfixe : « frg- ».

const F = "frigost";

export const FRIGOST: Dofus = {
  id: F,
  nom: "Donjons de Frigost",
  succes: "",
  unite: "boss",
  couleur: "#9cc7e0",
  notes: [
    "Royalmouth et Mansot Royal, dans l'ordre que vous voulez, ouvrent le Berceau d'Alma ; ensuite, chaque boss ouvre la zone et le donjon suivants",
    "Après le Glourséleste, les remparts de Frigost III ouvrent les donjons des 4 sbires du Comte, dans l'ordre que vous voulez ; le Comte demande les 4",
  ],
  sources: [DPLN("donjons.html")],
  quetes: [
    // Frigost I
    q(F, "frg-royalmouth", "Royalmouth", 120, [], {
      prerequis: [texte("Avoir accès à Frigost : bateau en [-34,-16], niveau 50 minimum")],
      contenu: [donjon("Serre du Royalmouth [-84,-49], dans les Champs de glace")],
    }),
    q(F, "frg-mansot-royal", "Mansot Royal", 140, [], {
      prerequis: [texte("Avoir accès à Frigost : bateau en [-34,-16], niveau 50 minimum")],
      contenu: [donjon("Excavation du Mansot Royal [-64,-55], au milieu du Lac gelé")],
    }),
    q(F, "frg-ben-le-ripate", "Ben le Ripate", 150, ["frg-royalmouth", "frg-mansot-royal"], {
      contenu: [donjon("Épave du Grolandais violent [-60,-84], dans le Berceau d'Alma")],
      ressources: [res("frg-r-clef-ben", "Clef de l'Épave du Grolandais Violent")],
    }),
    q(F, "frg-obsidiantre", "Obsidiantre", 160, ["frg-ben-le-ripate"], {
      contenu: [donjon("Hypogée de l'Obsidiantre [-71,-83], dans les Larmes d'Ouronigride")],
    }),
    // Frigost II
    q(F, "frg-tengu-givrefoux", "Tengu Givrefoux", 170, ["frg-obsidiantre"], {
      contenu: [donjon("Tanière Givrefoux [-80,-75]")],
    }),
    q(F, "frg-korriandre", "Korriandre", 180, ["frg-tengu-givrefoux"], {
      contenu: [donjon("Antre du Korriandre [-73,-69]")],
    }),
    q(F, "frg-kolosso", "Kolosso", 190, ["frg-korriandre"], {
      contenu: [donjon("Cavernes du Kolosso [-61,-69], dans les Crocs de verre (avec le Professeur Xa)")],
    }),
    q(F, "frg-glourseleste", "Glourséleste", 190, ["frg-kolosso"], {
      contenu: [donjon("Antichambre des Gloursons [-63,-75]")],
    }),
    // Frigost III
    q(F, "frg-nileza", "Nileza", 200, ["frg-glourseleste"], { contenu: [donjon("Laboratoire de Nileza [-61,-74]")] }),
    q(F, "frg-missiz-frizz", "Missiz Frizz", 200, ["frg-glourseleste"], { contenu: [donjon("Forgefroide de Missiz Frizz [-70,-81]")] }),
    q(F, "frg-klime", "Klime", 200, ["frg-glourseleste"], { contenu: [donjon("Salons privés de Klime [-63,-86]")] }),
    q(F, "frg-sylargh", "Sylargh", 200, ["frg-glourseleste"], { contenu: [donjon("Transporteur de Sylargh [-53,-84]")] }),
    q(F, "frg-comte-harebourg", "Comte Harebourg", 200, ["frg-nileza", "frg-missiz-frizz", "frg-klime", "frg-sylargh"], {
      prerequis: [texte("Au bout de la salle 4, parler à Dorléans pour lancer le combat")],
      contenu: [donjon("Donjon du Comte Harebourg [-61,-79], en haut de la Tour de la Clepsydre")],
      ressources: [res("frg-r-clef-comte", "Clef du donjon du Comte Harebourg")],
    }),
  ],
};

export const SERIES_FRIGOST: Dofus[] = [FRIGOST];
