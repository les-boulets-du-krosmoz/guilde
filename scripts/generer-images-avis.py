#!/usr/bin/env python3
"""
Génère la tête du monstre de chaque avis de recherche (public/icones/avis/<avis>.webp) et la liste
src/data/imagesAvis.ts, à partir des images de monstres du jeu (dofusdude/dofus3-main).
Le monstre est retrouvé par le nom de l'avis ; quelques correspondances sont précisées à la main.
    python3 scripts/generer-images-avis.py 3.6.12.16
"""
import io, json, pathlib, re, sys, tarfile, tempfile, unicodedata, urllib.request
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
fr = json.load(open(fichier("fr.json"), encoding="utf-8"))["entries"]
T = lambda i: (fr.get(str(i)) or "").strip()
monstres = {r["data"]["id"]: r["data"] for r in json.load(open(fichier("monsters.json"), encoding="utf-8"))["references"]["RefIds"]}
images = tarfile.open(fichier("monster_images_64.tar.gz"))
par_gfx = {pathlib.Path(n).name: n for n in images.getnames()}

def norm(t):
    t = t.replace("œ", "oe").replace("Œ", "Oe")
    return unicodedata.normalize("NFD", t).encode("ascii", "ignore").decode().lower().strip()

# Avis dont le monstre porte un autre nom dans le jeu.
FORCES = {"les-guman": 3525}  # Les Guman → Ambi Guman

racine = pathlib.Path(__file__).resolve().parent.parent
avis = re.findall(r'\b(?:av|al)\("([^"]+)", "([^"]+)"', (racine / "src/data/avis.ts").read_text(encoding="utf-8"))
par_nom = {}
for mid, m in monstres.items():
    par_nom.setdefault(norm(T(m["nameId"])), []).append(m)
sortie = racine / "public/icones/avis"
sortie.mkdir(parents=True, exist_ok=True)
avec, sans = [], []
for aid, nom in avis:
    candidats = [monstres[FORCES[aid]]] if aid in FORCES else par_nom.get(norm(nom), [])
    trouve = next((m for m in candidats if f"{m['gfxId']}-64.png" in par_gfx), None)
    if not trouve:
        sans.append(nom); continue
    with images.extractfile(par_gfx[f"{trouve['gfxId']}-64.png"]) as f:
        im = Image.open(io.BytesIO(f.read())).convert("RGBA")
    # Le monstre occupe peu de place dans l'image d'origine : on recadre sur lui, au carré, pour qu'il remplisse la tuile.
    boite = im.getbbox()
    if boite: im = im.crop(boite)
    c = max(im.size)
    carre = Image.new("RGBA", (c, c), (0, 0, 0, 0)); carre.paste(im, ((c - im.width) // 2, (c - im.height) // 2))
    carre.resize((64, 64), Image.LANCZOS).save(sortie / f"{aid}.webp", "WEBP", quality=90, method=6)
    avec.append(aid)
(racine / "src/data/imagesAvis.ts").write_text(
    "// Généré par scripts/generer-images-avis.py : avis dont la tête du monstre est disponible (public/icones/avis/<id>.webp).\n"
    f"export const AVIS_AVEC_IMAGE = new Set<string>({json.dumps(sorted(avec), ensure_ascii=False)});\n", encoding="utf-8")
print(f"{len(avec)} images ; sans image : {sans}")
