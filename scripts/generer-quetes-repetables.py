"""Quêtes répétables (quotidiennes et hebdomadaires) d'après les données du jeu, pour l'onglet « Quêtes journalières ».

Usage : python3 scripts/generer-quetes-repetables.py [version]
Le type de répétition vient du champ repeatType des quêtes : 1 = chaque jour, 2 = chaque semaine (déduit des quêtes
concernées : quotidiennes de Frigost, contrats des Justiciers…). L'Almanax (3) a son propre outil ; -1 n'est pas compris.
"""
import json, pathlib, re, sys, tempfile, urllib.request

version = sys.argv[1] if len(sys.argv) > 1 else "3.6.12.16"
base = f"https://github.com/dofusdude/dofus3-main/releases/download/{version}/"
tmp = pathlib.Path(tempfile.gettempdir()) / f"dofus3-{version}"; tmp.mkdir(exist_ok=True)
def charger(nom):
    f = tmp / nom
    if not f.exists(): urllib.request.urlretrieve(base + nom, f)
    return json.loads(f.read_text(encoding="utf-8"))
fr = charger("fr.json")["entries"]
T = lambda i: re.sub(r"<[^>]+>", "", (fr.get(str(i)) or "")).strip()
refs = lambda d: {r["data"]["id"]: r["data"] for r in d["references"]["RefIds"] if "id" in r.get("data", {})}
quetes, categories = refs(charger("quests.json")), refs(charger("quest_categories.json"))
etapes, objectifs = refs(charger("quest_steps.json")), refs(charger("quest_objectives.json"))
pnj, objets, sous_zones = refs(charger("npcs.json")), refs(charger("items.json")), refs(charger("subareas.json"))
cartes = refs(charger("maps_information.json"))

def depart(q):
    """PNJ qui donne la quête et sa position, d'après le champ startPosition."""
    pos = (q.get("startPosition") or {}).get("Array") or []
    if not pos: return {}
    c = cartes.get(pos[0].get("mapId"), {}); r = {}
    if pos[0].get("npcId") in pnj: r["pnj"] = T(pnj[pos[0]["npcId"]]["nameId"])
    if c: r["position"] = f"[{c['posX']},{c['posY']}]" + (f" {T(sous_zones[c['subAreaId']]['nameId'])}" if c.get("subAreaId") in sous_zones else "")
    return r

def ressources(q):
    """Objets à rapporter ou à montrer (objectifs « Ramener à… » et « Montrer à… »), avec leur quantité."""
    total = {}
    for sid in q["stepIds"]["Array"]:
        for oid in etapes[sid]["objectiveIds"]["Array"]:
            o = objectifs[oid]
            if o["typeId"] in (2, 3):
                p = o["parameters"]; nom = T(objets.get(p.get("parameter1"), {}).get("nameId"))
                if nom: total[nom] = total.get(nom, 0) + max(1, p.get("parameter2") or 1)
    return [{"nom": n, "quantite": k} for n, k in total.items()]
PERIODES = {1: "jour", 2: "semaine"}
sortie = sorted(({
    "id": f"rep-{q['id']}", "nom": T(q["nameId"]), "niveau": q.get("levelMin") or 1,
    "zone": T(categories.get(q["categoryId"], {}).get("nameId")) or "Autres", "periode": PERIODES[q["repeatType"]],
    **({"evenement": True} if q.get("isEvent") else {}), **({"donjon": True} if q.get("isDungeonQuest") else {}),
    **depart(q), **({"ressources": r} if (r := ressources(q)) else {}),
} for q in quetes.values() if q.get("repeatType") in PERIODES and T(q["nameId"])), key=lambda x: (x["zone"], x["niveau"], x["nom"]))
racine = pathlib.Path(__file__).resolve().parent.parent
(racine / "src/data/quetesRepetables.ts").write_text(
    f"// Généré par scripts/generer-quetes-repetables.py à partir des données du jeu (Dofus {version}). Ne pas modifier à la main.\n"
    "export type QueteRepetable = { id: string; nom: string; niveau: number; zone: string; periode: \"jour\" | \"semaine\"; evenement?: true; donjon?: true;\n  pnj?: string; position?: string; ressources?: { nom: string; quantite: number }[] };\n\n"
    "export const QUETES_REPETABLES: QueteRepetable[] = " + json.dumps(sortie, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print(len(sortie), "quêtes :", sum(x["periode"] == "jour" for x in sortie), "par jour,", sum(x["periode"] == "semaine" for x in sortie), "par semaine,", sum("evenement" in x for x in sortie), "d'événement")
print(sorted({x["zone"] for x in sortie}))
