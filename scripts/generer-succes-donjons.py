#!/usr/bin/env python3
"""
Régénère src/data/succesDonjons.ts (tous les succès de chaque donjon) et les icônes de public/icones/
(donjons : icône du succès, ou portrait du boss à défaut ; challenges : icône de chaque condition)
à partir des données du jeu publiées par dofusdude/dofus3-main. Nécessite Pillow. À relancer après une mise à jour :
    python3 scripts/generer-succes-donjons.py 3.6.12.16
(sans argument : dernière version publiée).
"""
import json, re, sys, urllib.request, pathlib, tempfile, tarfile, io
from PIL import Image

def version_courante() -> str:
    req = urllib.request.Request("https://github.com/dofusdude/dofus3-main/releases/latest", method="HEAD")
    with urllib.request.urlopen(req) as r:
        return r.geturl().rstrip("/").split("/")[-1]

version = sys.argv[1] if len(sys.argv) > 1 else version_courante()
base = f"https://github.com/dofusdude/dofus3-main/releases/download/{version}/"
tmp = pathlib.Path(tempfile.gettempdir()) / f"dofus3-{version}"
tmp.mkdir(exist_ok=True)
def charger(nom):
    f = tmp / nom
    if not f.exists():
        print("téléchargement", nom)
        urllib.request.urlretrieve(base + nom, f)
    return json.load(open(f, encoding="utf-8"))

fr = charger("fr.json")["entries"]
T = lambda i: (fr.get(str(i)) or "").strip()
refs = lambda n: [r["data"] for r in charger(n)["references"]["RefIds"]]
ach = {a["id"]: a for a in refs("achievements.json")}
ch = {c["id"]: c for c in refs("challenges.json")}
mon = {m["id"]: m for m in refs("monsters.json")}
donjons_jeu = [d for d in refs("dungeons.json") if any(a in ach for a in d["achievements"]["Array"])]

def nom_monstre(mid):
    m = mon.get(mid)
    return T(m["nameId"]) if m else ""

def challenge(cid):
    c = ch.get(cid)
    if not c:
        return None, None, None
    tours = re.search(r"ST<(\d+)", c.get("completionCriterion") or "")
    desc = T(c["descriptionId"]).replace("{1}", tours.group(1) if tours else "?")
    desc = desc.replace("{0}", nom_monstre(c.get("targetMonsterId") or 0) or "le boss")
    return T(c["nameId"]), desc, tours.group(1) if tours else None

racine = pathlib.Path(__file__).resolve().parent.parent
icones = racine / "public/icones"
(icones / "donjons").mkdir(parents=True, exist_ok=True)
(icones / "challenges").mkdir(parents=True, exist_ok=True)

def archive(nom):
    f = tmp / nom
    if not f.exists():
        print("téléchargement", nom)
        urllib.request.urlretrieve(base + nom, f)
    t = tarfile.open(f)
    return t, {pathlib.Path(n).name: n for n in t.getnames()}

img_succes, noms_succes = archive("achievement_images.tar.gz")
img_challenges, noms_challenges = archive("challenge_images_64.tar.gz")
img_monstres, noms_monstres = archive("monster_images_64.tar.gz")

def enregistrer(t, chemin, cible):
    """Copie une image de l'archive en WebP (plus léger) ; renvoie True si elle existait."""
    with t.extractfile(chemin) as f:
        Image.open(io.BytesIO(f.read())).save(cible, "WEBP", quality=90, method=6)
    return True

def icone_donjon(d):
    icone = ach[next(a for a in d["achievements"]["Array"] if a in ach)]["iconId"]
    cible = icones / "donjons" / f"{d['id']}.webp"
    if f"{icone}-58.png" in noms_succes:
        return enregistrer(img_succes, noms_succes[f"{icone}-58.png"], cible) and cible.name
    for b in d["bosses"]["Array"]:
        if f"{b}-64.png" in noms_monstres:
            return enregistrer(img_monstres, noms_monstres[f"{b}-64.png"], cible) and cible.name
    return ""

def icone_challenge(cid):
    c = ch.get(cid)
    if not c:
        return 0
    nom = f"{c['iconId']}-64.png"
    cible = icones / "challenges" / f"{c['iconId']}.webp"
    if nom in noms_challenges:
        if not cible.exists():
            enregistrer(img_challenges, noms_challenges[nom], cible)
        return c["iconId"]
    return 0

def rang(libelle):
    return 0 if libelle == "Vaincre" else 1 if libelle.startswith("Duo") else 9 if libelle.startswith("Spécial") else 5

donjons = []
for d in donjons_jeu:
    succes, boss = [], ""
    for aid in d["achievements"]["Array"]:
        a = ach.get(aid)
        if not a:
            continue
        titre, desc = T(a["nameId"]), T(a["descriptionId"])
        m = re.match(r"^(.*?) \((.+)\)$", titre)
        libelle = m.group(2) if m else "Vaincre"
        boss = boss or (m.group(1) if m else "")
        cm = re.search(r"\[challenge,(\d+)\]", desc)
        icone_c = icone_challenge(int(cm.group(1))) if cm else 0
        if cm:
            nomC, descC, tours = challenge(int(cm.group(1)))
            if libelle == "Duo" and tours:
                libelle = f"Duo ({tours} tours)"
            texte = f"« {nomC} » : {descC}" if libelle.startswith("Spécial") and nomC else (descC or desc)
        else:
            texte = desc
        texte = re.sub(r"<[^>]+>", "", texte).replace("\u00a0", " ").strip()
        succes.append((aid, libelle, texte, a["points"], icone_c))
    boss = boss or ", ".join(filter(None, (nom_monstre(b) for b in d["bosses"]["Array"]))) or T(d["nameId"])
    succes.sort(key=lambda s: rang(s[1]))
    donjons.append((T(d["nameId"]), d["optimalPlayerLevel"], boss, succes, icone_donjon(d)))
donjons.sort(key=lambda x: (x[1], x[0]))

j = lambda v: json.dumps(v, ensure_ascii=False)
lignes = [f"  D({j(n)}, {niv}, {j(b)}, {j(ic)}, [" + ", ".join(f"S({aid}, {j(l)}, {j(t)}, {p}, {c})" for aid, l, t, p, c in s) + "])," for n, niv, b, s, ic in donjons]
cible = racine / "src/data/succesDonjons.ts"
ancien = cible.read_text(encoding="utf-8")
entete, reste = ancien.split("export const DONJONS_SUCCES: DonjonSucces[] = [\n", 1)
_, pied = reste.split("\n];\n", 1)
entete = re.sub(r"Dofus \d+(\.\d+)+", f"Dofus {version}", entete, count=1)
cible.write_text(entete + "export const DONJONS_SUCCES: DonjonSucces[] = [\n" + "\n".join(lignes) + "\n];\n" + pied, encoding="utf-8")
print(f"{len(donjons)} donjons, {sum(len(x[3]) for x in donjons)} succès → {cible}")
