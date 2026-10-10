#!/usr/bin/env python3
"""
Régénère src/data/succesDonjons.ts (tous les succès de chaque donjon) et les icônes de public/icones/
(donjons : icône du succès, ou portrait du boss à défaut ; challenges : icône de chaque condition)
à partir des données du jeu publiées par dofusdude/dofus3-main. Nécessite Pillow. À relancer après une mise à jour :
    python3 scripts/generer-succes-donjons.py 3.6.12.16
(sans argument : dernière version publiée).
"""
import json, re, sys, urllib.request, pathlib, tempfile, tarfile, io, unicodedata
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

def avec_fond(im):
    """Pose une icône sans fond sur le fond commun des icônes de succès (bleu ardoise dégradé, coins arrondis),
    pour que toutes les têtes de boss se ressemblent. Une icône qui a déjà son décor est laissée telle quelle."""
    im = im.convert("RGBA")
    transparents = sum(im.getchannel("A").histogram()[:40]) / (im.width * im.height)
    if transparents < 0.05:  # coins arrondis seuls : environ 2 % ; une tête sans décor : 10 % et plus
        return im
    w, h = im.size
    fond = Image.new("RGBA", (w, h))
    cx, cy, r = w / 2, h / 2.2, max(w, h) * 0.75
    for y in range(h):
        for x in range(w):
            t = min(1, ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5 / r)
            fond.putpixel((x, y), (round(78 - 30 * t), round(84 - 32 * t), round(120 - 42 * t), 255))
    masque = Image.new("L", (w, h), 0)
    from PIL import ImageDraw
    ImageDraw.Draw(masque).rounded_rectangle([0, 0, w - 1, h - 1], radius=max(4, w // 9), fill=255)
    fond.putalpha(masque)
    fond.alpha_composite(im)
    return fond

def enregistrer(t, chemin, cible, fond=False):
    """Copie une image de l'archive en WebP (plus léger) ; renvoie True si elle existait."""
    with t.extractfile(chemin) as f:
        im = Image.open(io.BytesIO(f.read()))
        (avec_fond(im) if fond else im).save(cible, "WEBP", quality=90, method=6)
    return True

def manuelle(d):
    """Image fournie à la main pour un donjon sans icône dans les données du jeu : public/icones/donjons/manuel-<donjon>.webp."""
    nom = re.sub(r"[^a-z0-9]+", "-", unicodedata.normalize("NFD", T(d["nameId"])).encode("ascii", "ignore").decode().lower()).strip("-")
    f = icones / "donjons" / f"manuel-{nom}.webp"
    return f.name if f.exists() else ""

PORTRAITS = []  # donjons illustrés par le portrait du boss (journal)

def icone_groupe(d, premier_succes, rang_boss):
    """Icône d'un boss du donjon : celle de ses succès dans le jeu, sinon le portrait du boss, sinon une image ajoutée à la main."""
    icone = ach[premier_succes]["iconId"]
    cible = icones / "donjons" / (f"{d['id']}.webp" if rang_boss == 0 else f"{d['id']}-{rang_boss}.webp")
    if f"{icone}-58.png" in noms_succes:
        return enregistrer(img_succes, noms_succes[f"{icone}-58.png"], cible, fond=True) and cible.name
    # Une image ajoutée à la main passe avant le portrait tiré des images de monstres.
    m = manuelle(d)
    if m:
        return m
    # Les images de monstres sont rangées par numéro graphique (gfxId), pas par numéro de monstre :
    # confondre les deux affichait un tout autre monstre (le Kimbo apparaissait en Sram).
    bosses = d["bosses"]["Array"]
    candidats = bosses[rang_boss:rang_boss + 1] + bosses
    for b in candidats:
        gfx = mon.get(b, {}).get("gfxId")
        if gfx is not None and f"{gfx}-64.png" in noms_monstres:
            with img_monstres.extractfile(noms_monstres[f"{gfx}-64.png"]) as f:
                im = Image.open(io.BytesIO(f.read())).convert("RGBA")
            # Recadrage sur la silhouette, au carré, pour que le boss remplisse l'icône.
            boite = im.getbbox()
            if boite: im = im.crop(boite)
            c = max(im.size)
            carre = Image.new("RGBA", (c, c), (0, 0, 0, 0)); carre.paste(im, ((c - im.width) // 2, (c - im.height) // 2))
            avec_fond(carre.resize((58, 58), Image.LANCZOS)).save(cible, "WEBP", quality=90, method=6)
            PORTRAITS.append((T(d["nameId"]), T(mon[b]["nameId"])))
            return cible.name
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
    # Un donjon à plusieurs boss (Tanière Givrefoux, Eliocalypse…) liste les succès boss par boss,
    # chaque série commençant par « Vaincre » : on en fait une ligne par boss.
    groupes, courant = [], []
    for aid in d["achievements"]["Array"]:
        if aid not in ach:
            continue
        est_victoire = not re.match(r"^.*? \(.+\)$", T(ach[aid]["nameId"]))
        # Nouveau boss seulement si le groupe en cours a déjà sa victoire : un donjon à un seul boss
        # dont la victoire est rangée en dernier (Laboratoire du Tynril) reste sur une seule ligne.
        a_deja_victoire = any(not re.match(r"^.*? \(.+\)$", T(ach[x]["nameId"])) for x in courant)
        if est_victoire and a_deja_victoire:
            groupes.append(courant)
            courant = []
        courant.append(aid)
    if courant:
        groupes.append(courant)

    for rang_boss, groupe in enumerate(groupes):
        succes, boss = [], ""
        for aid in groupe:
            a = ach[aid]
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
        if not boss:
            victoire = re.search(r"Vaincre (?:le |la |les |l')?(.+?) dans", T(ach[groupe[0]]["descriptionId"]))
            boss = victoire.group(1) if victoire else (", ".join(filter(None, (nom_monstre(b) for b in d["bosses"]["Array"]))) or T(d["nameId"]))
        succes.sort(key=lambda s: rang(s[1]))
        donjons.append((T(d["nameId"]), d["optimalPlayerLevel"], boss, succes, icone_groupe(d, groupe[0], rang_boss)))
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
print("portraits de boss utilisés :", PORTRAITS)
