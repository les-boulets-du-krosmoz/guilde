#!/usr/bin/env python3
"""
Génère public/donnees/objets.json : le catalogue des équipements du jeu (nom, niveau, type, image, caractéristiques
possibles), pour La Brocante des boulets. Chargé seulement à l'ouverture de la page.
    python3 scripts/generer-objets.py 3.6.12.16
"""
import io, json, pathlib, re, sys, tarfile, tempfile, urllib.request
from PIL import Image

version = sys.argv[1] if len(sys.argv) > 1 else "3.6.12.16"
base = f"https://github.com/dofusdude/dofus3-main/releases/download/{version}/"
tmp = pathlib.Path(tempfile.gettempdir()) / f"dofus3-{version}"
tmp.mkdir(exist_ok=True)
def fichier(nom):
    f = tmp / nom
    if not f.exists():
        print("téléchargement", nom)
        urllib.request.urlretrieve(base + nom, f)
    return f
def charger(nom): return json.load(open(fichier(nom), encoding="utf-8"))

fr = charger("fr.json")["entries"]
T = lambda i: (fr.get(str(i)) or "").strip()
brut = charger("items.json")["references"]["RefIds"]
par_rid = {r["rid"]: r["data"] for r in brut}
types = {r["data"]["id"]: r["data"] for r in charger("item_types.json")["references"]["RefIds"]}
effets = {r["data"]["id"]: r["data"] for r in charger("effects.json")["references"]["RefIds"]}
# Icône de chaque caractéristique. Les images du jeu (statistics_images) ne portent qu'un numéro, sans lien fiable avec
# les caractéristiques : on n'associe que les icônes reconnues à coup sûr (cœur, étoile, botte, éléments, croix, œil).
# Une caractéristique sans icône sûre reste sans icône, plutôt qu'avec une fausse.
IMAGE_PAR_CARAC = {11: 3, 1: 4, 23: 5, 10: 8, 15: 9, 13: 10, 14: 11, 49: 33, 19: 27}  # Vitalité, PA, PM, Force, Intelligence, Chance, Agilité, Soins, Portée
IMAGE_PAR_ELEMENT = {1: 8, 2: 9, 3: 10, 4: 11}  # Terre, Feu, Eau, Air (pas d'icône sûre pour Neutre)
images_stats = tarfile.open(fichier("statistics_images_48.tar.gz"))
noms_images = {pathlib.Path(n).name: n for n in images_stats.getnames()}
def icone_effet(ef, libelle):
    c = ef.get("characteristic", -1)
    if c in IMAGE_PAR_CARAC: return IMAGE_PAR_CARAC[c]
    # Dégâts d'arme, dommages, résistances et vols d'un élément : l'icône de l'élément
    el = ef.get("elementId", -1)
    if el in IMAGE_PAR_ELEMENT and re.search(r"(dommage|résistance|vol)", libelle, re.I): return IMAGE_PAR_ELEMENT[el]
    for nom, img in (("Terre", 8), ("Feu", 9), ("Eau", 10), ("Air", 11)):
        if re.search(rf"(dommage|résistance|vol).*\b{nom}\b", libelle, re.I): return img
    return None
ICONES_UTILISEES = {}

# Équipements : amulettes, armes, anneaux, ceintures, bottes, boucliers, chapeaux, capes, familiers, Dofus et trophées
SUPER_TYPES = {1, 2, 3, 4, 5, 7, 10, 11, 12, 13}
TYPES_EXCLUS = {"Outil"}

def libelle(modele):
    """« #1{{~1~2 à }}#2 Force » → « Force » ; « -#1{{~1~2 à -}}#2 Sagesse » → (« Sagesse », malus)."""
    malus = modele.strip().startswith("-")
    t = re.sub(r"\{\{~1~2[^}]*\}\}", "", modele)
    t = re.sub(r"\{\{~[a-z]+\}\}", "", t)
    t = re.sub(r"#\d", "", t).replace("{{", "").replace("}}", "")
    return re.sub(r"\s+", " ", t).strip(" -:"), malus

catalogue = []
for r in brut:
    x = r["data"]
    if r["type"]["class"] not in ("ItemData", "WeaponData"): continue
    t = types.get(x.get("typeId"))
    if not t or t["superTypeId"] not in SUPER_TYPES or T(t["nameId"]) in TYPES_EXCLUS: continue
    nom = T(x.get("nameId"))
    if not nom: continue
    stats = []
    for e in (x.get("possibleEffects") or {}).get("Array", []):
        ef = par_rid.get(e["rid"])
        if not ef: continue
        def_effet = effets.get(ef.get("effectId"), {})
        modele = T(def_effet.get("descriptionId"))
        if "#1" not in modele: continue
        lib, malus = libelle(modele)
        if not lib: continue
        mini, maxi = ef.get("diceNum", 0), ef.get("diceSide", 0) or ef.get("diceNum", 0)
        if malus: mini, maxi = -maxi, -mini
        icone = icone_effet(def_effet, lib)
        if icone: ICONES_UTILISEES[lib] = icone
        stats.append([lib, mini, maxi])
    if not stats: continue
    catalogue.append([x["id"], nom, x.get("level", 0), T(t["nameId"]), x.get("iconId"), stats])

catalogue.sort(key=lambda c: (c[1].lower(), c[2]))
racine = pathlib.Path(__file__).resolve().parent.parent
sortie = racine / "public/donnees/objets.json"
sortie.parent.mkdir(parents=True, exist_ok=True)
sortie.write_text(json.dumps({"version": version, "objets": catalogue}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"{len(catalogue)} équipements → {sortie} ({sortie.stat().st_size // 1024} Ko)")

# Icônes des caractéristiques (public/icones/stats/<id>.webp) et correspondance nom → icône (src/data/iconesStats.ts),
# assez légère pour être chargée avec la page : les objets déjà en vente gardent ainsi leurs icônes.
dossier = racine / "public/icones/stats"
dossier.mkdir(parents=True, exist_ok=True)
import shutil
shutil.rmtree(dossier); dossier.mkdir(parents=True)
for c in sorted(set(ICONES_UTILISEES.values())):
    with images_stats.extractfile(noms_images[f"{c}-48.png"]) as f:
        Image.open(io.BytesIO(f.read())).convert("RGBA").resize((32, 32), Image.LANCZOS).save(dossier / f"{c}.webp", "WEBP", quality=90, method=6)
(racine / "src/data/iconesStats.ts").write_text(
    "// Généré par scripts/generer-objets.py : icône (public/icones/stats/<id>.webp) de chaque caractéristique, par son nom.\n"
    f"export const ICONES_STATS: Record<string, number> = {json.dumps(dict(sorted(ICONES_UTILISEES.items())), ensure_ascii=False, indent=1)};\n", encoding="utf-8")
print(f"{len(set(ICONES_UTILISEES.values()))} icônes de caractéristiques pour {len(ICONES_UTILISEES)} noms")
