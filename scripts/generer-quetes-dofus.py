#!/usr/bin/env python3
"""
Génère src/data/quetesJeu.ts : les quêtes des Dofus non primordiaux (Veilleurs, Dorigami, Cawotte, Argenté,
Vulbis, Tacheté, Dokoko, Glaces, Sylvestre) à partir des données du jeu publiées par dofusdude/dofus3-main :
ordre et enchaînement des quêtes, niveau, combats (donjons reconnus), objets à rapporter, métiers à fabriquer.
    python3 scripts/generer-quetes-dofus.py 3.6.12.16
Les identifiants des quêtes sont stables (« préfixe-numéro de quête du jeu ») : les cases cochées restent valables.
"""
import json, re, sys, pathlib, tempfile, unicodedata, urllib.request

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
NOMS_DONJONS = sorted(((T(d["nameId"]), d["id"]) for d in donjons.values() if T(d["nameId"])), key=lambda x: -len(x[0]))
def donjon_cite(texte):
    """Donjon nommé dans un objectif écrit (le plus long nom qui y figure)."""
    t = texte.lower()
    return next((dj for nom, dj in NOMS_DONJONS if nom.lower() in t), None)
def donjon_de_quete(q):
    """Donjon où se déroule une quête, s'il est nommé dans un de ses objectifs écrits."""
    for sid in q["stepIds"]["Array"]:
        for oid in etapes[sid]["objectiveIds"]["Array"]:
            o = qobj[oid]
            if o["typeId"] == 0:
                dj = donjon_cite(T(o["parameters"]["parameter0"]))
                if dj: return dj
    return None

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

def norme(t): return re.sub(r"[^a-z0-9]+", " ", unicodedata.normalize("NFD", t).encode("ascii", "ignore").decode().lower()).strip()
# Noms des quêtes des séries faites à la main (Dofus primordiaux, Domakuro…) : déjà suivies sur le site.
racine_site = pathlib.Path(__file__).resolve().parent.parent
NOMS_SITE = {norme(m) for m in re.findall(r'\bq\(\w+, "[^"]+", "([^"]+)"', (racine_site / "src/data/dofus.ts").read_text(encoding="utf-8"))}

def en_amont(ordre):
    """Quêtes à faire AVANT la série (conditions de départ « Qf » / « Qa »), dans la même zone de quêtes que la série
    (ex. les quêtes de l'île des Wabbits avant le Dofus Cawotte). Les quêtes déjà suivies ailleurs sur le site restent
    de simples prérequis."""
    zones = {quetes[q]["categoryId"] for q in ordre if q in quetes}
    vus, pile = set(ordre), list(ordre)
    trouvees = []
    while pile:
        q = quetes.get(pile.pop())
        if not q: continue
        for m in re.finditer(r"Q[fa]=(\d+)", q["startCriterion"] or ""):
            i = int(m.group(1))
            if i in vus or i not in quetes: continue
            vus.add(i)
            if quetes[i]["categoryId"] in zones and norme(T(quetes[i]["nameId"])) not in NOMS_SITE and i not in SERIES_DOFUS_QUETES:
                trouvees.append(i); pile.append(i)
    return trouvees

j = lambda v: json.dumps(v, ensure_ascii=False)
def prereq_quete(qid): return {"type": "quete", "queteId": qid, "verifie": True}

# Quêtes d'alignement (catégories 9 Bonta et 10 Brâkmar) : la chaîne de chaque camp, rangée par niveau
# d'alignement (« Pa=N »), puis les 5 quêtes d'apprentissage de chaque ordre (« Pr=… »), de Disciple à rang 5.
def chaine_camp(categorie):
    qs = [q for q in quetes.values() if q["categoryId"] == categorie and not re.search(r"Pr=\d+", q["startCriterion"] or "")]
    cle = lambda q: (int(m.group(1)) if (m := re.search(r"Pa=(\d+)", q["startCriterion"] or "")) else 999, q["levelMin"], q["id"])
    return [q["id"] for q in sorted(qs, key=cle)]
ALIGNEMENT = [  # id de série, préfixe, quêtes dans l'ordre
    ("align-bonta", "alb", chaine_camp(9)),
    ("align-coeur-vaillant", "alcv", [433, 109, 120, 421, 1916]),
    ("align-esprit-salvateur", "ales", [434, 111, 121, 423, 1917]),
    ("align-oeil-attentif", "aloa", [435, 110, 122, 425, 1918]),
    ("align-brakmar", "alk", chaine_camp(10)),
    ("align-coeur-saignant", "alcs", [436, 112, 123, 422, 1919]),
    ("align-esprit-malsain", "alem", [437, 114, 124, 424, 1920]),
    ("align-oeil-assassin", "aloas", [438, 113, 125, 426, 1921]),
]

# Quêtes de l'île de Frigost (catégorie 27) : celles que regroupent les succès de Frigost, rangées par succès,
# sans celles déjà suivies par le Dofus des Glaces (pas de quête suivie deux fois). Le thème = le nom du succès.
THEME = {}
def quetes_frigost():
    deja = SERIES_DOFUS_QUETES  # Dofus des Glaces (amont compris) et autres Dofus
    frig = {q["id"] for q in quetes.values() if q["categoryId"] == 27}
    ordre = []
    for a in sorted(ach.values(), key=lambda x: x["id"]):
        for oid in a["objectiveIds"]["Array"]:
            o = aobj.get(oid)
            for m in re.finditer(r"Qf=(\d+)", (o or {}).get("criterion") or ""):
                qid = int(m.group(1))
                if qid in frig and qid not in deja and qid not in ordre:
                    ordre.append(qid); THEME[qid] = T(a["nameId"])
    return ordre
ALIGNEMENT.append(("frigost-quetes", "frq", None))  # liste calculée après les Dofus

sortie_dofus = {}
SERIES_DOFUS_QUETES = set()  # quêtes du jeu suivies dans une page de Dofus (pour ne pas les reprendre dans Frigost)
for dofus_id, pref, aid in DOFUS + [(a, p, None) for a, p, _ in ALIGNEMENT]:
    ordre = liste_quetes(aid, set()) if aid else next(l for a, _, l in ALIGNEMENT if a == dofus_id)
    if ordre is None: ordre = quetes_frigost()
    if aid:
        ordre = en_amont(ordre)[::-1] + ordre  # le tri topologique plus bas les remet dans le bon ordre
        SERIES_DOFUS_QUETES.update(ordre)
    # Quêtes de classe (critère « PG = classe ») : une seule étape regroupe toutes les variantes.
    par_classe = [qid for qid in ordre if re.search(r"PG=\d+", quetes[qid]["startCriterion"] or "")]
    synth = f"{pref}-classe" if par_classe else None
    def id_site(qid):
        if synth and qid in par_classe: return synth
        if dofus_id == "veilleurs": return IDS_VEILLEURS.get(T(quetes[qid]["nameId"]), f"ve-{qid}")
        return f"{pref}-{qid}"
    ids_chaine = {qid: id_site(qid) for qid in ordre}
    resultat, deja = [], set()
    criteres = {}  # id du site -> conditions de départ (toutes variantes réunies)
    for qid in ordre:
        qs = id_site(qid)
        if qs in deja: continue
        deja.add(qs)
        groupe_classe = synth and qs == synth
        membres = par_classe if groupe_classe else [qid]
        q0 = quetes[membres[0]]
        crit = " ".join(quetes[m]["startCriterion"] or "" for m in membres)
        criteres[qs] = crit
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

        contenu, ressources, deroule, aide = [], {}, [], []
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
                        if "combat de groupe" not in aide: aide.append("combat de groupe")
                        mid, n = p["parameter0"], max(1, p["parameter1"])
                        nom = T(monstres[mid]["nameId"]) if mid in monstres else None
                        if not nom: continue
                        dj_cite = donjon_de_quete(quetes[m]) if p.get("dungeonOnly") else None
                        if mid in boss_donjon: c = {"type": "donjon", "nom": f"{boss_donjon[mid]} ({nom})"}
                        elif dj_cite: c = {"type": "donjon", "nom": f"{T(donjons[dj_cite]['nameId'])} ({nom})"}
                        else: c = {"type": "combat", "adversaires": [f"{n} × {nom}" if n > 1 else nom], "groupe": True}
                        if c not in contenu: contenu.append(c)
                    elif t == 3 and not objet_de_quete(p["parameter1"]):
                        note = f"à rapporter à {T(pnj[p['parameter0']]['nameId'])}" if p["parameter0"] in pnj else None
                        r = recettes.get(p["parameter1"])
                        if r and r["jobId"] in metiers_jeu:
                            metier = T(metiers_jeu[r["jobId"]]["nameId"])
                            crafteur = f"craftable par un {metier} niveau {max(1, r['resultLevel'])}"
                            note = f"{note}, {crafteur}" if note else crafteur
                            if f"objet à crafter ({metier})" not in aide: aide.append(f"objet à crafter ({metier})")
                        ajouter_res(T(objets[p["parameter1"]]["nameId"]), max(1, p["parameter2"]), note)
                    elif t == 12 and p["parameter1"] in monstres:
                        ajouter_res(f"Âme de {T(monstres[p['parameter1']]['nameId'])}", max(1, p["parameter2"]), "à capturer avec une pierre d'âme")
                    elif t == 17 and p["parameter0"] in recettes:
                        if "fabrication" not in aide: aide.append("fabrication")
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
            **({"aide": aide} if aide else {}),
            **({"theme": THEME[membres[0]]} if membres[0] in THEME else {}),
        })
    # Quêtes faites PENDANT une autre (« Qa=N » : la quête N est en cours ; « Qo>M » : un de ses objectifs est atteint).
    # Ces données n'étaient pas lues : la quête paraissait sans lien avec la suite. On la place au même niveau que N
    # (mêmes prérequis), et les quêtes qui suivent N la demandent aussi, puisqu'elle se termine avant de finir N.
    par_id = {r["id"]: r for r in resultat}
    def ancetres_de(qid, vus=None):
        vus = set() if vus is None else vus
        for p in par_id[qid]["prerequis"]:
            if p.get("type") == "quete" and p["queteId"] in par_id and p["queteId"] not in vus:
                vus.add(p["queteId"]); ancetres_de(p["queteId"], vus)
        return vus
    # L'alignement a son ordre imposé (plus bas) : ce passage ne concerne que les Dofus.
    for qs_enfant, crit in (criteres.items() if (aid or dofus_id == "frigost-quetes") else []):
        parents = set()
        for m in re.finditer(r"Qa=(\d+)", crit):
            if int(m.group(1)) in ids_chaine: parents.add(ids_chaine[int(m.group(1))])
        for m in re.finditer(r"Qo>(\d+)", crit):
            o = qobj.get(int(m.group(1)))
            if o and etapes[o["stepId"]]["questId"] in ids_chaine: parents.add(ids_chaine[etapes[o["stepId"]]["questId"]])
        parents.discard(qs_enfant)
        enfant = par_id.get(qs_enfant)
        if not enfant: continue
        deja_avant = {p["queteId"] for p in enfant["prerequis"] if p.get("type") == "quete"}
        for parent in parents:
            for p in par_id[parent]["prerequis"]:
                if (p.get("type") == "quete" and p["queteId"] in par_id and p["queteId"] not in deja_avant and p["queteId"] != qs_enfant
                        and qs_enfant not in ancetres_de(p["queteId"])):  # jamais de boucle
                    enfant["prerequis"].insert(0, prereq_quete(p["queteId"])); deja_avant.add(p["queteId"])
            for suivante in resultat:
                if suivante["id"] in (qs_enfant, parent): continue
                ids_av = {p["queteId"] for p in suivante["prerequis"] if p.get("type") == "quete"}
                if parent in ids_av and qs_enfant not in ids_av and suivante["id"] not in ancetres_de(qs_enfant):  # jamais de boucle
                    suivante["prerequis"].insert(0, prereq_quete(qs_enfant))

    # Ordre d'affichage : une étape ne vient jamais avant une étape dont elle dépend (tri topologique stable :
    # l'ordre des données est gardé tant qu'il respecte les dépendances).
    def tri_topologique(liste):
        ids = {r["id"] for r in liste}
        deps = {r["id"]: {p["queteId"] for p in r["prerequis"] if p.get("type") == "quete" and p["queteId"] in ids and p["queteId"] != r["id"]} for r in liste}
        place, sortie = set(), []
        restant = list(liste)
        while restant:
            for k, r in enumerate(restant):
                if deps[r["id"]] <= place:
                    sortie.append(r); place.add(r["id"]); restant.pop(k); break
            else:  # boucle dans les données : on garde l'ordre restant tel quel plutôt que de bloquer
                sortie += restant; break
        return sortie
    resultat = tri_topologique(resultat)

    # Alignement : le jeu impose l'ordre, une quête par niveau d'alignement, de 1 à 100. Les données ne relient pas
    # toujours deux quêtes voisines (« Pa=N » au lieu de « Qf ») : chaque quête dépend uniquement de la précédente.
    if not aid and dofus_id != "frigost-quetes":
        ids_serie = {r["id"] for r in resultat}
        for k, r in enumerate(resultat):
            r["prerequis"] = [p for p in r["prerequis"] if not (p.get("type") == "quete" and p.get("queteId") in ids_serie)]
            if k > 0:
                r["prerequis"].insert(0, prereq_quete(resultat[k - 1]["id"]))

    # Dernières étapes qui ne sont pas des quêtes, à faire une fois les quêtes terminées.
    for oid, nom in (etapes_hors_quetes(aid, set()) if aid else []):
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

# Prérequis « hors série » qui sont des étapes d'une autre série générée : on les relie à cette étape
# (ex. le Tacheté demande « Maudite disparition », suivie dans le Dorigami).
etape_par_nom = {}
# Étapes des séries faites à la main (Dofus primordiaux, Domakuro…) : « Sang d'encre » du Dorigami = l'étape du Domakuro.
for id_m, nom_m in re.findall(r'\bq\(\w+, "([^"]+)", "([^"]+)"', (racine_site / "src/data/dofus.ts").read_text(encoding="utf-8")):
    etape_par_nom.setdefault(norme(nom_m), id_m)
for liste in sortie_dofus.values():
    for r in liste: etape_par_nom.setdefault(norme(r["nom"]), r["id"])
for liste in sortie_dofus.values():
    for r in liste:
        for k, pr in enumerate(r["prerequis"]):
            if pr.get("type") == "quete" and pr.get("queteId", "").startswith("externe:") and norme(pr.get("libelle", "")) in etape_par_nom:
                r["prerequis"][k] = prereq_quete(etape_par_nom[norme(pr["libelle"])])

# ---------- Quêtes liées aux donjons ----------
# Une quête est liée à un donjon quand un de ses objectifs demande de vaincre un boss de ce donjon.
# On écarte les quêtes d'événement (Nowel, Événements) et celles qui touchent beaucoup de donjons à la fois.
categories = refs("quest_categories.json")
cat_exclues = {cid for cid, c in categories.items() if re.search(r"Événement|Nowel", T(c["nameId"]))}
boss_vers_donjons = {}
for d in donjons.values():
    for b in d["bosses"]["Array"]: boss_vers_donjons.setdefault(b, set()).add(d["id"])
# Identifiant du site pour une quête du jeu déjà suivie dans une série (pas de double suivi).
id_site_de_quete = {}
for dofus_id, liste in sortie_dofus.items():
    for r in liste:
        m = re.match(r"^[a-z]+-(\d+)$", r["id"])
        if m: id_site_de_quete[int(m.group(1))] = r["id"]
for nom_v, id_v in IDS_VEILLEURS.items():
    q = next((q for q in quetes.values() if T(q["nameId"]) == nom_v and q["id"] in liste_quetes(1187, set())), None)
    if q: id_site_de_quete[q["id"]] = id_v
# Chaînes du Tour du monde (Metag Robill) et d'Emma Tom Pouce : leurs quêtes SONT les étapes de ces séries du site.
def chaine_qf(depart):
    suivantes = {}
    for x in quetes.values():
        for m in re.finditer(r"Qf=(\d+)", x["startCriterion"] or ""): suivantes.setdefault(int(m.group(1)), []).append(x["id"])
    out, cur = [], depart
    while cur and cur not in out:
        out.append(cur); cur = (suivantes.get(cur) or [None])[0]
    return out
SERIE_DE_QUETE = {qid: "emma-tom-pouce" for qid in chaine_qf(896)}            # « Donjon en mousse » → « Le tour est joué »
SERIE_DE_QUETE.update({qid: "tour-du-monde" for qid in chaine_qf(2005)})       # « Le tour du monde » → « Le tracas du guerrier »

liees = {}
for q in quetes.values():
    if q["categoryId"] in cat_exclues: continue
    objectifs = {}
    for sid in q["stepIds"]["Array"]:
        for oid in etapes[sid]["objectiveIds"]["Array"]:
            o = qobj[oid]
            if o["typeId"] in (6, 14, 16):
                mid = o["parameters"]["parameter0"]
                djs = set(boss_vers_donjons.get(mid, ()))
                # Monstre qui n'est pas un boss mais à vaincre dans un donjon nommé par la quête (Larve Dorée, Donjon des Larves).
                if not djs and o["parameters"].get("dungeonOnly"):
                    cite = donjon_de_quete(q)
                    if cite: djs = {cite}
                for dj in djs:
                    objectifs.setdefault(dj, []).append((mid, max(1, o["parameters"]["parameter1"])))
    if not objectifs or len(objectifs) > 8: continue  # au-delà : quête générique sur tous les donjons
    for dj, liste in objectifs.items():
        faire = ", ".join(sorted({f"vaincre {T(monstres[m]['nameId'])}" + (f" ×{n}" if n > 1 else "") for m, n in liste}))
        liees.setdefault(T(donjons[dj]["nameId"]), []).append({
            "id": id_site_de_quete.get(q["id"], f"dql-{q['id']}"), "nom": T(q["nameId"]), "niveau": q["levelMin"], "objectif": faire,
            # Quête du Tour du monde ou d'Emma : le site la relie à l'étape de ce donjon dans la série.
            **({"serie": SERIE_DE_QUETE[q["id"]]} if q["id"] in SERIE_DE_QUETE else {}),
        })
for v in liees.values(): v.sort(key=lambda x: (x["niveau"], x["nom"]))
print(f"quêtes liées : {sum(len(v) for v in liees.values())} pour {len(liees)} donjons")

racine = pathlib.Path(__file__).resolve().parent.parent
(racine / "src/data/quetesDonjons.ts").write_text(
    "// Généré par scripts/generer-quetes-dofus.py : quêtes liées à chaque donjon (un objectif demande de vaincre son boss),\n"
    "// d'après les données du jeu. Clé : nom du donjon. Un identifiant « dql-… » n'appartient à aucune série du site.\n"
    "export type QueteLieeDonjon = { id: string; nom: string; niveau: number; objectif: string; serie?: string };\n\n"
    "export const QUETES_DONJONS: Record<string, QueteLieeDonjon[]> = " + json.dumps(liees, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")

texte = ("// Généré par scripts/generer-quetes-dofus.py à partir des données du jeu (Dofus " + version + ", dofusdude/dofus3-main).\n"
         "// Ne pas modifier à la main : relancer le script après une mise à jour du jeu.\n"
         "import type { Quete } from \"./dofus\";\n\n"
         "export const QUETES_JEU: Record<string, Quete[]> = " + json.dumps(sortie_dofus, ensure_ascii=False, indent=1) + ";\n")
(racine / "src/data/quetesJeu.ts").write_text(texte, encoding="utf-8")
print("→", racine / "src/data/quetesJeu.ts")
