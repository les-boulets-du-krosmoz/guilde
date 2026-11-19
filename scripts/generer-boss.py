"""Fiches du jeu des boss (page Donjons > Guides) : caractéristiques dans src/data/bossStats.ts et portrait
dans public/icones/boss/<slug>.webp, à partir des données extraites par dofusdude/dofus3-main.

Usage : python3 scripts/generer-boss.py [version] slug=idMonstre [slug=idMonstre ...]
Exemple : python3 scripts/generer-boss.py 3.7.14.18 ombre=3564
Sans argument slug=id, toutes les fiches déjà présentes sont rafraîchies (même numéro de monstre, retrouvé par son nom).
Le slug doit être celui de la fiche dans src/data/guidesBoss.ts.
Données 3.6 et 3.7 acceptées (les résistances s'appellent neutralResistance… en 3.6, reductionNeutral… en 3.7).
Caractéristiques au grade 1 : celui d'un combat à 4 personnages ou moins (le grade 5 correspond à 8 personnages ;
ex. Maître Corbac 4 500 PV au grade 1 = « butin 4 », 6 600 au grade 5 = « butin 8 »). Seuls les PV changent en général.
"""
import io, json, pathlib, sys, tarfile, urllib.request
from PIL import Image

RACINE = pathlib.Path(__file__).resolve().parent.parent
args = sys.argv[1:]
version = args.pop(0) if args and "=" not in args[0] else "3.7.14.18"
CACHE = pathlib.Path("/tmp/d3") / version  # un dossier par version : sinon une autre version déjà téléchargée serait relue
choix = {a.split("=")[0]: int(a.split("=")[1]) for a in args}
RES = lambda g, e: g[f"{e}Resistance"] if f"{e}Resistance" in g else g[f"reduction{e.capitalize()}"]

def fichier(nom):
    CACHE.mkdir(parents=True, exist_ok=True)
    f = CACHE / nom
    if not f.exists():
        urllib.request.urlretrieve(f"https://github.com/dofusdude/dofus3-main/releases/download/{version}/{nom}", f)
    return f

fr = json.load(open(fichier("fr.json")))["entries"]
T = lambda i: (fr.get(str(i)) or "").strip()
mons = {r["data"]["id"]: r["data"] for r in json.load(open(fichier("monsters.json")))["references"]["RefIds"] if "id" in r["data"]}
images = tarfile.open(fichier("monster_images_128.tar.gz"))
par_nom = {pathlib.Path(n).name: n for n in images.getnames()}

p = RACINE / "src/data/bossStats.ts"; s = p.read_text(encoding="utf-8")
marque = "STATS_BOSS: Record<string, StatsBoss> = "
debut = s.index(marque) + len(marque); fin = s.rstrip().rindex(";")
stats = json.loads(s[debut:fin])
if not choix:  # rafraîchir l'existant
    for slug, st in stats.items():
        # même nom possible pour deux monstres (ex. deux Maître Corbac) : on garde celui qui a le même nombre de PA, PM et niveau
        noms = [i for i, m in mons.items() if T(m.get("nameId")) == st["nom"]]
        meme = [i for i in noms if all(mons[i]["grades"]["Array"][0][k] == st[c] for k, c in (("actionPoints", "pa"), ("movementPoints", "pm"), ("level", "niveau")))]
        choix[slug] = (meme or noms)[0]
        if len(meme) != 1: print("à vérifier, plusieurs monstres possibles :", slug, noms)

for slug, mid in choix.items():
    m = mons[mid]; g = m["grades"]["Array"][0]  # grade 1 = groupe de 4
    stats[slug] = {"nom": T(m["nameId"]), "niveau": g["level"], "pv": g["lifePoints"], "pa": g["actionPoints"], "pm": g["movementPoints"],
                   "res": [RES(g, e) for e in ("neutral", "earth", "fire", "water", "air")]}
    f = par_nom.get(f"{m['gfxId']}-128.png")
    if not f:
        print("portrait introuvable :", slug); continue
    im = Image.open(io.BytesIO(images.extractfile(f).read())).convert("RGBA")
    bb = im.getbbox(); im = im.crop(bb) if bb else im
    c = max(im.size); carre = Image.new("RGBA", (c, c)); carre.paste(im, ((c - im.width) // 2, (c - im.height) // 2), im)
    carre.resize((112, 112), Image.LANCZOS).save(RACINE / f"public/icones/boss/{slug}.webp", "WEBP", quality=88, method=6)
    print(slug, stats[slug])

p.write_text(s[:debut] + json.dumps(stats, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
