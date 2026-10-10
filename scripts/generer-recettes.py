#!/usr/bin/env python3
"""
Génère public/donnees/recettes/<métier>.json (une page « Mes métiers » les charge à la demande) à partir des données
du jeu publiées par dofusdude/dofus3-main : pour chaque recette du métier, l'objet fabriqué, son niveau et ses ingrédients.
    python3 scripts/generer-recettes.py 3.6.12.16
"""
import json, re, sys, pathlib, tempfile, urllib.request, unicodedata

version = sys.argv[1] if len(sys.argv) > 1 else "3.6.12.16"
base = f"https://github.com/dofusdude/dofus3-main/releases/download/{version}/"
tmp = pathlib.Path(tempfile.gettempdir()) / f"dofus3-{version}"
tmp.mkdir(exist_ok=True)
def charger(nom):
    f = tmp / nom
    if not f.exists():
        print("téléchargement", nom)
        urllib.request.urlretrieve(base + nom, f)
    return json.load(open(f, encoding="utf-8"))
def refs(nom, cle="id"):
    return {r["data"][cle]: r["data"] for r in charger(nom)["references"]["RefIds"] if cle in r["data"]}

fr = charger("fr.json")["entries"]
T = lambda i: (fr.get(str(i)) or "").strip()
objets, recettes, metiers = refs("items.json"), refs("recipes.json", "resultId"), refs("jobs.json")
slug = lambda t: re.sub(r"[^a-z0-9]+", "-", unicodedata.normalize("NFD", t).encode("ascii", "ignore").decode().lower()).strip("-")

racine = pathlib.Path(__file__).resolve().parent.parent
sortie = racine / "public/donnees/recettes"
sortie.mkdir(parents=True, exist_ok=True)
index = {}
par_metier = {}
for r in recettes.values():
    m = metiers.get(r["jobId"])
    if not m or r["resultId"] not in objets: continue
    par_metier.setdefault(T(m["nameId"]), []).append(r)
for nom_metier, liste in sorted(par_metier.items()):
    if nom_metier in ("Base", ""): continue  # recettes sans métier (atelier de base)
    utiles, recettes_json = {}, []
    for r in sorted(liste, key=lambda x: (x["resultLevel"], T(objets[x["resultId"]]["nameId"]))):
        o = objets[r["resultId"]]
        ingr = [[i, q] for i, q in zip(r["ingredientIds"]["Array"], r["quantities"]["Array"]) if i in objets]
        for i, _ in ingr:
            oi = objets[i]; utiles[i] = [T(oi["nameId"]), oi.get("iconId"), oi.get("level", 0)]
        recettes_json.append([r["resultId"], T(o["nameId"]), r["resultLevel"], o.get("iconId"), ingr])
    fichier = f"{slug(nom_metier)}.json"
    (sortie / fichier).write_text(json.dumps({"metier": nom_metier, "recettes": recettes_json, "objets": utiles}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    index[nom_metier] = {"fichier": fichier, "recettes": len(recettes_json)}
    print(f"{nom_metier:12} {len(recettes_json):4} recettes → {fichier} ({(sortie / fichier).stat().st_size // 1024} Ko)")
(sortie / "index.json").write_text(json.dumps({"version": version, "metiers": index}, ensure_ascii=False, indent=1), encoding="utf-8")
