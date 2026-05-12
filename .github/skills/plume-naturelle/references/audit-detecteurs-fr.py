#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations

import argparse
import math
import os
import re
from collections import Counter
from dataclasses import dataclass
from typing import Callable, Dict, Iterable, List, Sequence, Tuple

import numpy as np

try:
    import spacy
    import torch
    from transformers import AutoModelForCausalLM, AutoTokenizer
except ImportError as exc:
    raise SystemExit(
        "pip install numpy spacy transformers torch && python -m spacy download fr_core_news_lg"
    ) from exc


MODEL_NAME = os.environ.get("PN_FRENCH_LM", "dbddv01/gpt2-french-small")
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
EPS = 1e-8
FEATURES = [
    "ppl_proxy",
    "burstiness",
    "ttr",
    "zipf_slope",
    "syntax_var",
    "gltr_ratio_10_100",
]


@dataclass(frozen=True)
class Sample:
    sample_id: str
    label: str
    genre: str
    text: str


@dataclass
class Calibration:
    feature_names: List[str]
    center: np.ndarray
    scale: np.ndarray
    weights: np.ndarray
    bias: float
    threshold_human: float
    feature_thresholds: Dict[str, float]
    benchmark_auc: float
    benchmark_confusion: Dict[str, int]


BENCHMARK_SAMPLES: List[Sample] = [
    Sample(
        "H1",
        "human",
        "journal_etudiant",
        (
            "Mardi 14 janvier, j'ai note dans mon carnet une scene toute simple mais utile pour mon memoire. "
            "Le tram B est reste bloque huit minutes a l'arret Universite. Personne n'a rale tout de suite ; "
            "on a d'abord regarde les ecrans, puis le conducteur a ouvert sa cabine pour expliquer qu'un capteur "
            "de porte etait en cause. C'est ce detail qui m'interesse, pas le retard en lui-meme. Quand le systeme "
            "tombe en panne, les usagers cherchent d'abord une cause concrete, presque materielle. Une etudiante a "
            "dit : \"si c'est la porte, au moins on sait ou regarder\". J'ai recopie la phrase le soir, chez moi, "
            "parce qu'elle resume bien mon terrain : les gens acceptent plus facilement l'attente quand la panne "
            "a un nom, un objet, une date. Je pensais travailler seulement sur les flux ; en realite, c'est la "
            "pedagogie de l'incident qui revient sans cesse."
        ),
    ),
    Sample(
        "H2",
        "human",
        "rapport_stage",
        (
            "Au cabinet, la semaine du 3 mars a ete la plus utile pour comprendre pourquoi les tableaux de bord "
            "ratent parfois leur cible. On avait prepare un suivi propre, avec les bons totaux et un code couleur "
            "impeccable. Pourtant, a la reunion du jeudi, personne n'a ouvert le fichier avant que Nadia demande "
            "combien de factures restaient vraiment en attente. Le chiffre n'etait pas dans la premiere feuille. "
            "Il etait enterre plus bas, ligne 47. C'est bete, mais j'ai compris la a quoi sert un indicateur : pas "
            "a embellir un rapport, a repondre vite a une question precise. Plus tard, j'ai refait le tableau avec "
            "trois blocs seulement, dont un intitule \"ce qui coince aujourd'hui\". La version etait moins elegante, "
            "franchement, mais elle a enfin servi."
        ),
    ),
    Sample(
        "H3",
        "human",
        "memoire_pro",
        (
            "Je n'avais pas prevu de parler du scanner Fujitsu dans cette partie, puis je me suis ravise. "
            "Le 22 novembre, c'est lui qui a fait perdre une heure complete au pole social. La numerisation "
            "des arrets maladie devait aller vite ; au lieu de ca, les pages sont parties en double et l'OCR a "
            "melange les dates. On a d'abord cru a une erreur de parametrage dans Zeendoc. En fait non : le "
            "bac d'alimentation prenait deux feuilles quand le papier etait trop fin. Ce n'est pas un grand "
            "evenement, mais c'est exactement le genre de detail qu'on efface quand on raconte une digitalisation "
            "de maniere trop abstraite. Dans les entretiens, les collaborateurs ne parlent pas d'\"optimisation\". "
            "Ils parlent d'un scanner capricieux, d'un mot de passe oublie, d'un client qui envoie encore des "
            "photos floues prises dans sa voiture."
        ),
    ),
    Sample(
        "H4",
        "human",
        "note_terrain",
        (
            "Le samedi matin, au marche de Talensac, j'ai observe quelque chose que mes notes precedentes rataient. "
            "Les vendeurs n'emploient presque jamais le mot \"inflation\". Ils disent plutot : \"le cageot a pris "
            "un euro\", ou bien \"la caisse part moins vite qu'en septembre\". La difference n'est pas anodine. "
            "Le terme economique generalise ; la formule ordinaire, elle, accroche tout de suite un prix, une date, "
            "un geste. Je l'ai vu avec le fromager de l'allee centrale. Quand une cliente a hesite devant le comte "
            "18 mois, il n'a pas invoque la conjoncture. Il a montre sa facture et a dit : \"regardez novembre 2023, "
            "puis regardez cette semaine\". C'est presque une methode : partir du papier, pas du concept. Mes "
            "entretiens marcheront mieux si je garde ce principe."
        ),
    ),
    Sample(
        "H5",
        "human",
        "brouillon_recherche",
        (
            "Au depart, je voulais opposer frontalement correction automatique et apprentissage reel. C'etait trop net. "
            "En relisant mes copies de L2, surtout celles de fevrier, j'ai vu que le probleme n'est pas la correction "
            "elle-meme, mais le moment ou elle arrive. Quand l'etudiant corrige apres coup, en comparant deux versions, "
            "on observe souvent une justification, meme breve : il raye, il remplace, il hesite. Quand la phrase sort "
            "d'emblee lisse et terminee, l'activite mentale disparait du texte. Enfin, elle disparait a la lecture. "
            "C'est ce point que je dois mieux formuler : mon enjeu n'est pas de moraliser l'usage des outils, mais de "
            "retrouver des traces d'arbitrage. Sans elles, l'evaluation devient bancale, parce qu'on ne voit plus ce "
            "que l'etudiant sait faire seul."
        ),
    ),
    Sample(
        "A1",
        "ai",
        "essai_generique",
        (
            "Dans un monde en constante evolution, la transformation numerique des organisations constitue un enjeu "
            "majeur pour leur competitivite. Il ne s'agit pas seulement d'adopter de nouveaux outils, mais aussi de "
            "mettre en place une culture de l'innovation, de la collaboration et de l'agilite. De plus, les entreprises "
            "qui s'inscrivent dans cette dynamique peuvent optimiser leurs processus, ameliorer l'experience client et "
            "renforcer leur positionnement sur le marche. Toutefois, cette transition suppose une vision claire, un "
            "pilotage rigoureux et une mobilisation de l'ensemble des parties prenantes. En definitive, la digitalisation "
            "represente un levier essentiel pour assurer une croissance durable et repondre efficacement aux defis d'un "
            "environnement en mutation."
        ),
    ),
    Sample(
        "A2",
        "ai",
        "article_generique",
        (
            "Le changement climatique est un sujet fondamental qui affecte de maniere significative l'ensemble des "
            "societes contemporaines. Il convient de noter que ses consequences se manifestent a la fois sur les plans "
            "economique, social et environnemental. Par ailleurs, la lutte contre ce phenomene implique une cooperation "
            "renforcee entre les gouvernements, les entreprises et les citoyens. En outre, les politiques publiques "
            "doivent favoriser des pratiques durables, soutenir l'innovation technologique et sensibiliser les populations "
            "aux comportements responsables. Ainsi, une approche globale et holistique apparait comme indispensable pour "
            "attenuer les risques actuels et preserver les generations futures."
        ),
    ),
    Sample(
        "A3",
        "ai",
        "note_pedagogique",
        (
            "L'intelligence artificielle joue un role preponderant dans l'evolution des systemes educatifs modernes. "
            "Elle permet de personnaliser les apprentissages, d'automatiser certaines taches administratives et de fournir "
            "des retours adaptes aux besoins des apprenants. Cependant, cette integration doit etre envisagee avec prudence "
            "afin de garantir l'equite, la protection des donnees et la qualite des contenus proposes. De ce point de vue, "
            "les etablissements ont tout interet a definir un cadre clair, a former les enseignants et a encourager un usage "
            "ethique des outils disponibles. En fin de compte, l'IA represente une opportunite considerable pour transformer "
            "durablement l'education."
        ),
    ),
    Sample(
        "A4",
        "ai",
        "synthese_rh",
        (
            "Le teletravail s'impose aujourd'hui comme une modalite organisationnelle a forte valeur ajoutee. Il favorise "
            "une meilleure flexibilite, soutient l'equilibre entre vie professionnelle et vie personnelle et contribue a "
            "l'optimisation des ressources. Neanmoins, sa mise en oeuvre efficace suppose un cadre methodologique robuste, "
            "des outils collaboratifs performants et une communication fluide au sein des equipes. Dans ce contexte, les "
            "managers doivent adopter une posture proactive afin d'accompagner les collaborateurs, de prevenir l'isolement "
            "et de maintenir un niveau d'engagement eleve. Au final, le teletravail s'inscrit dans une dynamique durable "
            "d'adaptation du travail aux exigences contemporaines."
        ),
    ),
    Sample(
        "A5",
        "ai",
        "commentaire_generique",
        (
            "Les reseaux sociaux occupent une place centrale dans les pratiques communicationnelles actuelles. Ils "
            "constituent des espaces d'expression, de diffusion et d'interaction qui transforment en profondeur les "
            "relations entre individus, organisations et institutions. De plus, leur impact se mesure tant en termes de "
            "visibilite que de participation citoyenne, de construction identitaire et de circulation de l'information. "
            "Toutefois, il est essentiel de prendre en compte les risques associes a la desinformation, a la polarisation "
            "et a la dependance attentionnelle. Des lors, une education critique aux medias apparait comme un levier "
            "indispensable pour favoriser des usages responsables, nuances et pertinents des plateformes numeriques."
        ),
    ),
]


def normalize_text(text: str) -> str:
    text = text.replace("\u00a0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def slug_excerpt(text: str, limit: int = 84) -> str:
    text = normalize_text(text)
    return text if len(text) <= limit else text[: limit - 3] + "..."


def sigmoid(x: np.ndarray | float) -> np.ndarray | float:
    return 1.0 / (1.0 + np.exp(-np.clip(x, -60.0, 60.0)))


def markdown_table(rows: Sequence[Sequence[str]], headers: Sequence[str]) -> str:
    safe_rows = [[str(cell) for cell in row] for row in rows]
    widths = [len(str(h)) for h in headers]
    for row in safe_rows:
        for idx, cell in enumerate(row):
            widths[idx] = max(widths[idx], len(cell))
    header = "| " + " | ".join(str(h).ljust(widths[idx]) for idx, h in enumerate(headers)) + " |"
    sep = "|-" + "-|-".join("-" * widths[idx] for idx in range(len(headers))) + "-|"
    body = [
        "| " + " | ".join(row[idx].ljust(widths[idx]) for idx in range(len(headers))) + " |"
        for row in safe_rows
    ]
    return "\n".join([header, sep, *body])


def ensure_spacy() -> "spacy.language.Language":
    try:
        return spacy.load("fr_core_news_lg")
    except OSError as exc:
        raise SystemExit("python -m spacy download fr_core_news_lg") from exc


def ensure_lm() -> Tuple[AutoTokenizer, AutoModelForCausalLM]:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
    if tokenizer.pad_token_id is None:
        tokenizer.pad_token = tokenizer.eos_token
    model.to(DEVICE)
    model.eval()
    return tokenizer, model


def lexical_units(doc) -> List[str]:
    units: List[str] = []
    for token in doc:
        if token.is_alpha and not token.is_space and not token.is_punct:
            lemma = token.lemma_.lower().strip()
            units.append(lemma if lemma else token.text.lower())
    return units


def sentence_lengths(doc) -> List[int]:
    lengths: List[int] = []
    for sent in doc.sents:
        count = sum(1 for token in sent if token.is_alpha and not token.is_punct)
        if count:
            lengths.append(count)
    return lengths


def burstiness_from_lengths(lengths: Sequence[int]) -> float:
    if not lengths:
        return 0.0
    values = np.asarray(lengths, dtype=float)
    mu = float(values.mean())
    sigma = float(values.std())
    return float((sigma - mu) / (sigma + mu + EPS))


def ttr_from_units(units: Sequence[str]) -> float:
    if not units:
        return 0.0
    return float(len(set(units)) / max(len(units), 1))


def zipf_slope(units: Sequence[str]) -> float:
    counts = Counter(units)
    if len(counts) < 2:
        return 0.0
    freqs = np.asarray(sorted(counts.values(), reverse=True), dtype=float)
    ranks = np.arange(1, len(freqs) + 1, dtype=float)
    slope, _ = np.polyfit(np.log(ranks), np.log(freqs), 1)
    return float(slope)


def dependency_depth(token) -> int:
    children = list(token.children)
    if not children:
        return 1
    return 1 + max(dependency_depth(child) for child in children)


def syntax_variance(doc) -> float:
    depths = []
    for sent in doc.sents:
        depths.append(dependency_depth(sent.root))
    if not depths:
        return 0.0
    return float(np.var(np.asarray(depths, dtype=float)))


def causal_stats(text: str, tokenizer, model) -> Tuple[float, List[int]]:
    encoded = tokenizer(text, return_tensors="pt", add_special_tokens=True)
    input_ids = encoded["input_ids"].to(DEVICE)
    if input_ids.size(1) < 2:
        return float("nan"), []

    max_len = int(getattr(model.config, "n_positions", 1024))
    stride = max(2, max_len - 1)
    all_logprobs: List[float] = []
    all_ranks: List[int] = []
    prev_end = 1

    with torch.no_grad():
        for begin in range(0, input_ids.size(1) - 1, stride):
            end = min(begin + max_len, input_ids.size(1))
            chunk = input_ids[:, begin:end]
            logits = model(chunk).logits[0]
            pred_logits = logits[:-1]
            gold_tokens = chunk[0, 1:]
            if pred_logits.size(0) == 0:
                continue

            new_token_start = max(begin + 1, prev_end)
            offset = new_token_start - (begin + 1)
            if offset >= pred_logits.size(0):
                prev_end = end
                if end >= input_ids.size(1):
                    break
                continue

            selected_logits = pred_logits[offset:]
            selected_gold = gold_tokens[offset:]
            log_probs = torch.log_softmax(selected_logits, dim=-1)
            token_logprobs = log_probs.gather(1, selected_gold.unsqueeze(1)).squeeze(1)
            gold_scores = selected_logits.gather(1, selected_gold.unsqueeze(1))
            token_ranks = (selected_logits > gold_scores).sum(dim=1) + 1

            all_logprobs.extend(token_logprobs.detach().cpu().tolist())
            all_ranks.extend(token_ranks.detach().cpu().tolist())

            prev_end = end
            if end >= input_ids.size(1):
                break

    ppl = math.exp(-float(np.mean(all_logprobs))) if all_logprobs else float("nan")
    return float(ppl), [int(rank) for rank in all_ranks]


def gltr_ratio_10_100(ranks: Sequence[int]) -> Tuple[float, float, float]:
    if not ranks:
        return 0.0, 0.0, 0.0
    ranks_array = np.asarray(ranks, dtype=int)
    top10 = float(np.mean(ranks_array <= 10))
    top100 = float(np.mean(ranks_array <= 100))
    ratio = float(top10 / max(top100, EPS))
    return ratio, top10, top100


def compute_metrics(text: str, nlp, tokenizer, model) -> Dict[str, float]:
    clean_text = normalize_text(text)
    doc = nlp(clean_text)
    units = lexical_units(doc)
    sent_lens = sentence_lengths(doc)
    ppl_proxy, ranks = causal_stats(clean_text, tokenizer, model)
    gltr_ratio, top10_share, top100_share = gltr_ratio_10_100(ranks)
    return {
        "chars": float(len(clean_text)),
        "words": float(len(units)),
        "sentences": float(max(len(list(doc.sents)), 1)),
        "ppl_proxy": ppl_proxy,
        "burstiness": burstiness_from_lengths(sent_lens),
        "ttr": ttr_from_units(units),
        "zipf_slope": zipf_slope(units),
        "syntax_var": syntax_variance(doc),
        "gltr_ratio_10_100": gltr_ratio,
        "gltr_top10": top10_share,
        "gltr_top100": top100_share,
    }


def tie_aware_auc(labels_ai: np.ndarray, scores_ai: np.ndarray) -> float:
    n = len(scores_ai)
    order = np.argsort(scores_ai)
    sorted_scores = scores_ai[order]
    ranks = np.zeros(n, dtype=float)
    cursor = 0
    rank_start = 1.0
    while cursor < n:
        end = cursor + 1
        while end < n and sorted_scores[end] == sorted_scores[cursor]:
            end += 1
        avg_rank = (rank_start + (rank_start + (end - cursor) - 1.0)) / 2.0
        ranks[cursor:end] = avg_rank
        rank_start += end - cursor
        cursor = end
    unraveled = np.empty(n, dtype=float)
    unraveled[order] = ranks
    positives = labels_ai == 1
    n_pos = int(positives.sum())
    n_neg = int(n - n_pos)
    if n_pos == 0 or n_neg == 0:
        return 0.5
    sum_ranks_pos = float(unraveled[positives].sum())
    auc = (sum_ranks_pos - (n_pos * (n_pos + 1) / 2.0)) / max(n_pos * n_neg, 1)
    return float(auc)


def fit_calibration(metric_rows: List[Dict[str, float]], labels: List[str]) -> Calibration:
    X = np.asarray([[row[name] for name in FEATURES] for row in metric_rows], dtype=float)
    medians = np.nanmedian(X, axis=0)
    inds = np.where(np.isnan(X))
    X[inds] = np.take(medians, inds[1])

    center = X.mean(axis=0)
    scale = X.std(axis=0) + 1e-6
    Z = (X - center) / scale
    y_human = np.asarray([1 if label == "human" else 0 for label in labels], dtype=int)
    Z_h = Z[y_human == 1]
    Z_a = Z[y_human == 0]
    mu_h = Z_h.mean(axis=0)
    mu_a = Z_a.mean(axis=0)
    cov = np.cov(Z.T, bias=False) + 1e-3 * np.eye(Z.shape[1])
    weights = np.linalg.solve(cov, mu_h - mu_a)
    bias = float(-0.5 * (mu_h + mu_a) @ weights)
    human_probs = sigmoid(Z @ weights + bias).astype(float)
    ai_scores = 1.0 - human_probs
    labels_ai = np.asarray([0 if label == "human" else 1 for label in labels], dtype=int)

    best_threshold = 0.5
    best_accuracy = -1.0
    thresholds = np.unique(np.concatenate(([0.0], human_probs, [1.0])))
    for threshold in thresholds:
        pred_human = (human_probs >= threshold).astype(int)
        accuracy = float(np.mean(pred_human == y_human))
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_threshold = float(threshold)

    pred_ai = (human_probs < best_threshold).astype(int)
    tn = int(np.sum((labels_ai == 0) & (pred_ai == 0)))
    fp = int(np.sum((labels_ai == 0) & (pred_ai == 1)))
    fn = int(np.sum((labels_ai == 1) & (pred_ai == 0)))
    tp = int(np.sum((labels_ai == 1) & (pred_ai == 1)))
    thresholds_by_feature = {
        name: float(0.5 * (X[y_human == 1, idx].mean() + X[y_human == 0, idx].mean()))
        for idx, name in enumerate(FEATURES)
    }

    return Calibration(
        feature_names=list(FEATURES),
        center=center,
        scale=scale,
        weights=weights,
        bias=bias,
        threshold_human=best_threshold,
        feature_thresholds=thresholds_by_feature,
        benchmark_auc=tie_aware_auc(labels_ai, ai_scores),
        benchmark_confusion={"TN": tn, "FP": fp, "FN": fn, "TP": tp},
    )


def human_probability(metrics: Dict[str, float], calibration: Calibration) -> float:
    vector = np.asarray([metrics[name] for name in calibration.feature_names], dtype=float)
    vector = np.where(np.isnan(vector), calibration.center, vector)
    z = (vector - calibration.center) / calibration.scale
    return float(sigmoid(z @ calibration.weights + calibration.bias))


def classify(metrics: Dict[str, float], calibration: Calibration) -> Dict[str, float | str]:
    p_human = human_probability(metrics, calibration)
    score = float(round(100.0 * p_human, 2))
    label = "human_like" if p_human >= calibration.threshold_human else "ai_like"
    enriched = dict(metrics)
    enriched["robustness_score"] = score
    enriched["human_probability"] = p_human
    enriched["predicted_label"] = label
    return enriched


def replace_pairs(text: str, mapping: Sequence[Tuple[str, str]]) -> str:
    out = text
    for source, target in mapping:
        out = re.sub(source, target, out, flags=re.IGNORECASE)
    return normalize_text(out)


def attaque_paraphrase_locale(text: str) -> str:
    pairs = [
        (r"\bdans un monde en constante evolution\b", "aujourd'hui"),
        (r"\bil ne s'agit pas seulement de\b", "le sujet n'est pas juste de"),
        (r"\bconstitue\b", "est"),
        (r"\bde plus\b", "et"),
        (r"\bpar ailleurs\b", "autre point"),
        (r"\ben definitive\b", "au final"),
        (r"\blevier\b", "moyen"),
        (r"\boptimiser\b", "rendre plus efficace"),
    ]
    return replace_pairs(text, pairs)


def attaque_homoglyphes(text: str) -> str:
    homoglyphs = {
        "a": "а",
        "c": "с",
        "e": "е",
        "i": "і",
        "o": "о",
        "p": "р",
        "x": "х",
        "y": "у",
    }
    words = text.split()
    for idx, word in enumerate(words):
        if idx % 7 != 3 or len(word) < 6:
            continue
        chars = list(word)
        for pos, char in enumerate(chars):
            lower = char.lower()
            if lower in homoglyphs:
                chars[pos] = homoglyphs[lower]
                break
        words[idx] = "".join(chars)
    return normalize_text(" ".join(words))


def attaque_back_translation_mock(text: str) -> str:
    pairs = [
        (r"\bjoue un role preponderant\b", "prend une place nette"),
        (r"\bprendre en compte\b", "integrer"),
        (r"\bapparait comme indispensable\b", "devient difficile a eviter"),
        (r"\btransition\b", "passage"),
        (r"\bapproche globale et holistique\b", "approche plus large"),
        (r"\bpermet de\b", "sert a"),
        (r"\bcependant\b", "mais"),
        (r"\btoutefois\b", "mais"),
    ]
    rewritten = replace_pairs(text, pairs)
    rewritten = rewritten.replace(", ", "; ", 1)
    return normalize_text(rewritten)


def attaque_injection_variance_syntaxique(text: str) -> str:
    sentences = re.split(r"(?<=[.!?])\s+", normalize_text(text))
    rebuilt: List[str] = []
    for sentence in sentences:
        if len(sentence.split()) > 18 and "," in sentence:
            left, right = sentence.split(",", 1)
            rebuilt.append(left.strip() + ".")
            rebuilt.append("Puis " + right.strip().lstrip("et ").capitalize())
        else:
            rebuilt.append(sentence)
    if len(rebuilt) >= 3:
        rebuilt[1] = rebuilt[1].rstrip(".") + " ; bref, le point reste le meme."
    return normalize_text(" ".join(rebuilt))


def attaque_injection_ancrage(text: str) -> str:
    anchor = (
        "Le 12 fevrier 2025, a Nantes, j'ai note 17 dossiers en attente sur le tableau du pole social. "
        "Ce n'est pas theorique : le blocage venait d'un export CSV incomplet."
    )
    pieces = re.split(r"(?<=[.!?])\s+", normalize_text(text))
    if not pieces:
        return anchor
    pieces.insert(min(2, len(pieces)), anchor)
    return normalize_text(" ".join(pieces))


def attaque_dispersion_lexicale(text: str) -> str:
    replacements = [
        ("organisation", "atelier"),
        ("entreprises", "equipes"),
        ("utilisateurs", "lecteurs"),
        ("dynamique", "mouvement"),
        ("contenus", "pages"),
        ("plateformes", "services"),
        ("outil", "module"),
        ("innovation", "essai"),
    ]
    out = text
    for source, target in replacements:
        out = re.sub(rf"\b{source}\b", target, out, count=1, flags=re.IGNORECASE)
    return normalize_text(out)


def attaque_deconnecteurs_rlhf(text: str) -> str:
    pairs = [
        (r"\bde plus,\s*", ""),
        (r"\ben outre,\s*", ""),
        (r"\bpar ailleurs,\s*", ""),
        (r"\bil convient de noter que\s*", ""),
        (r"\ben fin de compte,\s*", ""),
        (r"\ben definitive,\s*", ""),
    ]
    return replace_pairs(text, pairs)


def attaque_micro_revisions(text: str) -> str:
    sentences = re.split(r"(?<=[.!?])\s+", normalize_text(text))
    if not sentences:
        return text
    if len(sentences) >= 1:
        sentences[0] = sentences[0].rstrip(".") + " ; enfin, pas partout."
    if len(sentences) >= 3:
        sentences[2] = "En pratique, " + sentences[2][0].lower() + sentences[2][1:]
    if len(sentences) >= 4:
        sentences[3] = sentences[3].rstrip(".") + ", ou plutot de facon inegale."
    return normalize_text(" ".join(sentences))


def attaque_ponctuation_mixte(text: str) -> str:
    text = normalize_text(text)
    text = text.replace(". ", " : ", 1)
    text = text.replace(". ", " ? ", 1)
    text = text.replace(". ", " (et ce n'est pas anodin). ", 1)
    return normalize_text(text)


ATTACKS: List[Tuple[str, Callable[[str], str]]] = [
    ("paraphrase_locale", attaque_paraphrase_locale),
    ("homoglyphes", attaque_homoglyphes),
    ("back_translation_mock", attaque_back_translation_mock),
    ("variance_syntaxique", attaque_injection_variance_syntaxique),
    ("ancrage_concret", attaque_injection_ancrage),
    ("dispersion_lexicale", attaque_dispersion_lexicale),
    ("deconnecteurs_rlhf", attaque_deconnecteurs_rlhf),
    ("micro_revisions_ponctuation", lambda text: attaque_ponctuation_mixte(attaque_micro_revisions(text))),
]


def aggregate_metrics(rows: Iterable[Dict[str, float]]) -> Dict[str, float]:
    rows_list = list(rows)
    return {
        key: float(np.mean([row[key] for row in rows_list]))
        for key in [
            "robustness_score",
            "ppl_proxy",
            "burstiness",
            "ttr",
            "zipf_slope",
            "syntax_var",
            "gltr_ratio_10_100",
        ]
    }


def score_text(text: str, nlp, tokenizer, model, calibration: Calibration) -> Dict[str, float | str]:
    metrics = compute_metrics(text, nlp, tokenizer, model)
    return classify(metrics, calibration)


def print_script_descriptor(calibration: Calibration) -> None:
    threshold_rows = [
        [name, f"{calibration.feature_thresholds[name]:.4f}"]
        for name in calibration.feature_names
    ]
    meta_rows = [
        ["fichier", "plume-naturelle/references/audit-detecteurs-fr.py"],
        ["modele_proxy", MODEL_NAME],
        ["spaCy", "fr_core_news_lg"],
        ["features", ", ".join(calibration.feature_names)],
        ["seuil_humain_calibre", f"{calibration.threshold_human:.4f}"],
        ["device", DEVICE],
    ]
    print("## 3. Script")
    print()
    print(markdown_table(meta_rows, ["champ", "valeur"]))
    print()
    print(markdown_table(threshold_rows, ["metrique", "seuil_fr_calibre"]))
    print()


def print_benchmark(
    samples: Sequence[Sample],
    scored_rows: Sequence[Dict[str, float | str]],
    calibration: Calibration,
) -> None:
    benchmark_rows = []
    for sample, scored in zip(samples, scored_rows):
        benchmark_rows.append(
            [
                sample.sample_id,
                sample.label,
                sample.genre,
                f"{int(scored['words'])}",
                f"{float(scored['robustness_score']):.2f}",
                str(scored["predicted_label"]),
                slug_excerpt(sample.text),
            ]
        )

    confusion_rows = [
        [key, str(value)]
        for key, value in calibration.benchmark_confusion.items()
    ]
    roc_rows = [[f"{calibration.benchmark_auc:.4f}"]]

    print("## 4. Banc de test")
    print()
    print(markdown_table(
        benchmark_rows,
        ["id", "label", "genre", "mots", "score_0_100", "prediction", "extrait"],
    ))
    print()
    print(markdown_table(confusion_rows, ["matrice_confusion", "valeur"]))
    print()
    print(markdown_table(roc_rows, ["roc_auc"]))
    print()


def print_attacks(
    ai_samples: Sequence[Sample],
    nlp,
    tokenizer,
    model,
    calibration: Calibration,
) -> None:
    baseline_scored = [score_text(sample.text, nlp, tokenizer, model, calibration) for sample in ai_samples]
    baseline_agg = aggregate_metrics(baseline_scored)
    rows = []
    for attack_name, attack_fn in ATTACKS:
        attacked_scored = [
            score_text(attack_fn(sample.text), nlp, tokenizer, model, calibration)
            for sample in ai_samples
        ]
        attacked_agg = aggregate_metrics(attacked_scored)
        rows.append(
            [
                attack_name,
                f"{baseline_agg['robustness_score']:.2f}",
                f"{attacked_agg['robustness_score']:.2f}",
                f"{attacked_agg['robustness_score'] - baseline_agg['robustness_score']:+.2f}",
                f"{baseline_agg['ppl_proxy']:.2f}",
                f"{attacked_agg['ppl_proxy']:.2f}",
                f"{baseline_agg['burstiness']:.4f}",
                f"{attacked_agg['burstiness']:.4f}",
                f"{baseline_agg['syntax_var']:.4f}",
                f"{attacked_agg['syntax_var']:.4f}",
                f"{baseline_agg['gltr_ratio_10_100']:.4f}",
                f"{attacked_agg['gltr_ratio_10_100']:.4f}",
            ]
        )
    print("## 5. Attaques")
    print()
    print(markdown_table(
        rows,
        [
            "attaque",
            "score_avant",
            "score_apres",
            "delta",
            "ppl_avant",
            "ppl_apres",
            "burst_avant",
            "burst_apres",
            "sigma2D_avant",
            "sigma2D_apres",
            "gltr_avant",
            "gltr_apres",
        ],
    ))
    print()


def print_single_text(text: str, nlp, tokenizer, model, calibration: Calibration) -> None:
    scored = score_text(text, nlp, tokenizer, model, calibration)
    rows = [
        ["robustness_score_0_100", f"{float(scored['robustness_score']):.2f}"],
        ["predicted_label", str(scored["predicted_label"])],
        ["ppl_proxy", f"{float(scored['ppl_proxy']):.4f}"],
        ["burstiness", f"{float(scored['burstiness']):.4f}"],
        ["ttr", f"{float(scored['ttr']):.4f}"],
        ["zipf_slope", f"{float(scored['zipf_slope']):.4f}"],
        ["sigma2_D", f"{float(scored['syntax_var']):.4f}"],
        ["gltr_ratio_10_100", f"{float(scored['gltr_ratio_10_100']):.4f}"],
        ["gltr_top10", f"{float(scored['gltr_top10']):.4f}"],
        ["gltr_top100", f"{float(scored['gltr_top100']):.4f}"],
        ["words", f"{int(scored['words'])}"],
        ["sentences", f"{int(scored['sentences'])}"],
    ]
    print("## texte_cible")
    print()
    print(markdown_table(rows, ["metrique", "valeur"]))
    print()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Audit francophone de robustesse anti-detection.")
    parser.add_argument("--text", type=str, default="", help="Texte a evaluer.")
    parser.add_argument("--file", type=str, default="", help="Fichier texte UTF-8 a evaluer.")
    parser.add_argument("--skip-benchmark", action="store_true", help="N'affiche pas le banc de test.")
    return parser.parse_args()


def read_user_text(args: argparse.Namespace) -> str:
    if args.file:
        with open(args.file, "r", encoding="utf-8") as handle:
            return handle.read()
    return args.text


def main() -> None:
    args = parse_args()
    nlp = ensure_spacy()
    tokenizer, model = ensure_lm()

    metric_rows = [compute_metrics(sample.text, nlp, tokenizer, model) for sample in BENCHMARK_SAMPLES]
    calibration = fit_calibration(metric_rows, [sample.label for sample in BENCHMARK_SAMPLES])
    scored_rows = [classify(row, calibration) for row in metric_rows]

    print_script_descriptor(calibration)
    if not args.skip_benchmark:
        print_benchmark(BENCHMARK_SAMPLES, scored_rows, calibration)
        ai_samples = [sample for sample in BENCHMARK_SAMPLES if sample.label == "ai"]
        print_attacks(ai_samples, nlp, tokenizer, model, calibration)

    user_text = normalize_text(read_user_text(args))
    if user_text:
        print_single_text(user_text, nlp, tokenizer, model, calibration)


if __name__ == "__main__":
    main()
