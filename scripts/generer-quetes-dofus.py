#!/usr/bin/env python3
"""
Génère src/data/quetesJeu.ts : les quêtes des Dofus non primordiaux (Veilleurs, Dorigami, Cawotte, Argenté,
Vulbis, Tacheté, Dokoko, Glaces, Sylvestre) à partir des données du jeu publiées par dofusdude/dofus3-main :
ordre et enchaînement des quêtes, niveau, combats (donjons reconnus), objets à rapporter, métiers à fabriquer.
    python3 scripts/generer-quetes-dofus.py 3.6.12.16
Les identifiants des quêtes sont stables (« préfixe-numéro de quête du jeu ») : les cases cochées restent valables.
"""
import json, re, sys, pathlib, tempfile, urllib.request

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
ach, aobj = refs("achievements.json"), refs("achievement_objectives.json")
quetes, etapes, qobj = refs("quests.json"), refs("quest_steps.json"), refs("quest_objectives.json")
monstres, donjons, pnj = refs("monsters.json"), refs("dungeons.json"), refs("npcs.json")
objets, recettes, metiers_jeu = refs("items.json"), refs("recipes.json", "resultId"), refs("jobs.json")
types_objet = refs("item_types.json")
classes = refs("breeds.json")
boss_donjon = {b: T(d["nameId"]) for d in donjons.values() for b in d["bosses"]["Array"]}

# Métiers connus du site (src/data/constantes.ts) : les autres ne deviennent pas des prérequis.
METIERS_SITE = {"Alchimiste", "Bûcheron", "Chasseur", "Mineur", "Paysan", "Pêcheur", "Bijoutier", "Cordonnier", "Façonneur",
                "Forgeron", "Sculpteur", "Tailleur", "Bricoleur", "Joaillomage", "Cordomage", "Façomage", "Forgemage", "Sculptemage", "Costumage"}

DOFUS = [  # id du site, préfixe, succès du jeu qui donne le Dofus
    ("veilleurs", "ve", 1187), ("dorigami", "dg", 3078), ("cawotte", "cw", 992), ("argente", "ag", 1679),
    ("vulbis", "vu", 2198), ("tachete", "ta", 3082), ("dokoko", "dko", 1397), ("glaces", "gl", 922), ("sylvestre", "sy", 7761),
]
# Veilleurs : identifiants déjà en place sur le site (cases cochées par les membres), retrouvés par le nom.
IDS_VEILLEURS = {"Voyage, voyage": "ve-1", "La porte d'Enutrosor": "ve-2", "Orichomania": "ve-3", "La cité de l'indicible mal": "ve-4",
                 "Messager clandestin": "ve-5", "La voix de son maître": "ve-6", "Le maître des zaaps": "ve-7", "Énergie renouvelable": "ve-8",
                 "Traitement de choc": "ve-9", "Le disparu de Sufokia": "ve-10", "Rendez-vous avec la mort": "ve-11",
                 "Secret de fabrication": "ve-12", "S'emparer des commandes": "ve-13", "C'est dans la boîte": "ve-14", "Crise d'identité": "ve-15"}

def objet_de_quete(iid):
    o = objets.get(iid)
    return not o or types_objet.get(o.get("typeId"), {}).get("superTypeId") == 14

def liste_quetes(aid, vus):
    """Quêtes d'un succès dans l'ordre, sous-succès compris ; « Qo>N » (objectif de quête) mène aussi à une quête."""
    out = []
    for oid in ach[aid]["objectiveIds"]["Array"]:
        c = aobj[oid]["criterion"] or ""
        for m in re.finditer(r"(OA|Qf|Qo>)=?(\d+)", c):
            k, i = m.group(1), int(m.group(2))
            if k == "OA" and ("a", i) not in vus:
                vus.add(("a", i)); out += liste_quetes(i, vus)
            elif k == "Qf" and i in quetes and i not in vus:
                vus.add(i); out.append(i)
            elif k == "Qo>" and i in qobj:
                qid = etapes[qobj[i]["stepId"]]["questId"]
                if qid not in vus: vus.add(qid); out.append(qid)
    return out

def etapes_hors_quetes(aid, vus):
    """Objectifs de succès qui ne sont pas des quêtes (ex. « Parler à Rathrosk », « Obtenir le Dom de Pin ») :
    sans eux le succès, donc le Dofus, n'est pas validé. Un objectif d'une quête de la chaîne (« Qo ») est déjà couvert."""
    out = []
    for oid in ach[aid]["objectiveIds"]["Array"]:
        c = aobj[oid]["criterion"] or ""
        for m in re.finditer(r"OA=(\d+)", c):
            i = int(m.group(1))
            if ("a", i) not in vus: vus.add(("a", i)); out += etapes_hors_quetes(i, vus)
        reste = re.sub(r"(OA|Qf)=\d+|Qo>\d+", "", c)
        if re.search(r"[A-Za-z]{2}[=<>!]", reste) and not re.fullmatch(r"\(?Qo>\d+\)?", c.strip()):
            out.append((oid, T(aobj[oid]["nameId"])))
    return out

j = lambda v: json.dumps(v, ensure_ascii=False)
def prereq_quete(qid): return {"type": "quete", "queteId": qid, "verifie": True}

sortie_dofus = {}
for dofus_id, pref, aid in DOFUS:
    ordre = liste_quetes(aid, set())
    # Quêtes de classe (critère « PG = classe ») : une seule étape regroupe toutes les variantes.
    par_classe = [qid for qid in ordre if re.search(r"PG=\d+", quetes[qid]["startCriterion"] or "")]
    synth = f"{pref}-classe" if par_classe else None
    def id_site(qid):
        if synth and qid in par_classe: return synth
        if dofus_id == "veilleurs": return IDS_VEILLEURS.get(T(quetes[qid]["nameId"]), f"ve-{qid}")
        return f"{pref}-{qid}"
    ids_chaine = {qid: id_site(qid) for qid in ordre}
    resultat, deja = [], set()
    for qid in ordre:
        qs = id_site(qid)
        if qs in deja: continue
        deja.add(qs)
        groupe_classe = synth and qs == synth
        membres = par_classe if groupe_classe else [qid]
        q0 = quetes[membres[0]]
        crit = " ".join(quetes[m]["startCriterion"] or "" for m in membres)
        apres, prerequis = [], []
        for m in re.finditer(r"Qf=(\d+)", crit):
            i = int(m.group(1))
            if i in ids_chaine:
                cible = ids_chaine[i]
                if cible != qs and cible not in apres: apres.append(cible)
            elif i in quetes and not groupe_classe:
                lib = T(quetes[i]["nameId"])
                p = {"type": "quete", "queteId": "externe:" + re.sub(r"[^a-z0-9]+", "-", lib.lower()), "libelle": lib, "verifie": True}
                if p not in prerequis: prerequis.append(p)
        niv = re.search(r"PL>(\d+)", crit)
        if niv: prerequis.append({"type": "niveau", "niveau": int(niv.group(1)) + 1, "verifie": True})
        cote = re.search(r"Ps=(\d)", crit)
        if cote and cote.group(1) in "12":
            prerequis.append({"type": "texte", "description": "Être " + ("Bontarien" if cote.group(1) == "1" else "Brâkmarien"), "verifie": True})
        ali = re.search(r"Pa>(\d+)", crit)
        if ali: prerequis.append({"type": "texte", "description": f"Niveau d'alignement {int(ali.group(1)) + 1} minimum", "verifie": True})
        if groupe_classe:
            noms = sorted(f"{T(classes[int(re.search(r'PG=(\d+)', quetes[m]['startCriterion']).group(1))]['shortNameId'])} : « {T(quetes[m]['nameId'])} »"
                          for m in membres if int(re.search(r'PG=(\d+)', quetes[m]['startCriterion']).group(1)) in classes)
            prerequis.append({"type": "texte", "description": "Une quête différente selon la classe. " + " ; ".join(noms), "verifie": True})

        contenu, ressources, deroule = [], {}, []
        def ajouter_res(texte_objet, qte, note):
            cle = (texte_objet, note)
            ressources[cle] = ressources.get(cle, 0) + qte
        for m in membres if not groupe_classe else []:
            for sid in quetes[m]["stepIds"]["Array"]:
                for oid in etapes[sid]["objectiveIds"]["Array"]:
                    o = qobj[oid]; p = o["parameters"]; t = o["typeId"]
                    if t == 0:
                        phrase = re.sub(r"<[^>]+>", "", T(p["parameter0"])).strip()
                        if phrase and phrase not in deroule: deroule.append(phrase)
                    if t in (6, 14, 16):
                        mid, n = p["parameter0"], max(1, p["parameter1"])
                        nom = T(monstres[mid]["nameId"]) if mid in monstres else None
                        if not nom: continue
                        if mid in boss_donjon: c = {"type": "donjon", "nom": f"{boss_donjon[mid]} ({nom})"}
                        else: c = {"type": "combat", "adversaires": [f"{n} × {nom}" if n > 1 else nom], "groupe": True}
                        if c not in contenu: contenu.append(c)
                    elif t == 3 and not objet_de_quete(p["parameter1"]):
                        ajouter_res(T(objets[p["parameter1"]]["nameId"]), max(1, p["parameter2"]), f"à rapporter à {T(pnj[p['parameter0']]['nameId'])}" if p["parameter0"] in pnj else None)
                    elif t == 12 and p["parameter1"] in monstres:
                        ajouter_res(f"Âme de {T(monstres[p['parameter1']]['nameId'])}", max(1, p["parameter2"]), "à capturer avec une pierre d'âme")
                    elif t == 17 and p["parameter0"] in recettes:
                        r = recettes[p["parameter0"]]; n = max(1, p["parameter1"])
                        metier = T(metiers_jeu[r["jobId"]]["nameId"]) if r["jobId"] in metiers_jeu else ""
                        if metier in METIERS_SITE:
                            pr = {"type": "metier", "metier": metier, "niveau": max(1, r["resultLevel"]), "personnel": True, "verifie": True}
                            if pr not in prerequis: prerequis.append(pr)
                        fab = T(objets[p["parameter0"]]["nameId"]) if p["parameter0"] in objets else "l'objet"
                        for ing, qte in zip(r["ingredientIds"]["Array"], r["quantities"]["Array"]):
                            if not objet_de_quete(ing): ajouter_res(T(objets[ing]["nameId"]), qte * n, f"pour fabriquer {fab}")
        res = [{"id": f"{qs}-r{k + 1}", "texte": f"{qte} × {obj}", **({"note": note} if note else {}), "verifie": True}
               for k, ((obj, note), qte) in enumerate(ressources.items())]
        resultat.append({
            "id": qs,
            "nom": "Quête de ta classe" if groupe_classe else T(q0["nameId"]),
            "dofus": dofus_id,
            "niveauConseille": min(quetes[m]["levelMin"] for m in membres),
            "prerequis": [prereq_quete(a) for a in apres] + prerequis,
            "contenu": contenu,
            **({"ressources": res} if res else {}),
            **({"deroule": deroule} if deroule else {}),
        })
    # Dernières étapes qui ne sont pas des quêtes, à faire une fois les quêtes terminées.
    for oid, nom in etapes_hors_quetes(aid, set()):
        precedente = resultat[-1]["id"] if resultat else None
        resultat.append({
            "id": f"{pref}-fin-{oid}", "nom": nom, "dofus": dofus_id,
            "niveauConseille": resultat[-1]["niveauConseille"] if resultat else 1,
            "prerequis": [prereq_quete(precedente)] if precedente else [],
            "contenu": [],
            "deroule": [f"{nom} : étape du succès, à faire une fois les quêtes précédentes terminées pour obtenir le Dofus."],
        })
    sortie_dofus[dofus_id] = resultat
    print(f"{dofus_id:10} {len(resultat):3} étapes ({len(ordre)} quêtes du jeu)")

racine = pathlib.Path(__file__).resolve().parent.parent
texte = ("// Généré par scripts/generer-quetes-dofus.py à partir des données du jeu (Dofus " + version + ", dofusdude/dofus3-main).\n"
         "// Ne pas modifier à la main : relancer le script après une mise à jour du jeu.\n"
         "import type { Quete } from \"./dofus\";\n\n"
         "export const QUETES_JEU: Record<string, Quete[]> = " + json.dumps(sortie_dofus, ensure_ascii=False, indent=1) + ";\n")
(racine / "src/data/quetesJeu.ts").write_text(texte, encoding="utf-8")
print("→", racine / "src/data/quetesJeu.ts")
