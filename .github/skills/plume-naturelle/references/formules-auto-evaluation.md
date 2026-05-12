# Formules d'auto-évaluation anti-détection

> **Quand charger ce fichier :** après la réécriture (Étape 4), avant la livraison.
> Donner le texte réécrit + ce fichier à un LLM avec raisonnement étendu
> (Gemini 3.1 Pro Thinking High, ChatGPT 5.4 Thinking, Claude avec Extended Thinking)
> pour calculer les scores et vérifier que le texte passe.
>
> **Objectif :** estimer le score qu'un détecteur attribuerait au texte,
> identifier les zones à risque, et corriger avant livraison.

---

## 1. Score de burstiness (B)

### Formule

```
B = (σ - μ) / (σ + μ)

σ = écart-type de la longueur des phrases (en mots)
μ = moyenne de la longueur des phrases (en mots)
```

### Interprétation

| Score B | Interprétation | Action |
|---|---|---|
| B < -0.5 | Fortement IA : phrases très régulières | Réécriture profonde du rythme |
| -0.5 < B < 0.0 | Suspect : trop peu de variation | Ajouter des phrases < 6 mots et > 35 mots |
| 0.0 < B < 0.3 | Zone grise : pourrait passer | Vérifier les autres métriques |
| B > 0.3 | Zone humaine : bonne variance | OK |

### Exemple de calcul

Texte : 10 phrases de longueurs [18, 22, 19, 21, 20, 17, 23, 19, 21, 20]
- μ = 20.0
- σ = 1.7
- B = (1.7 - 20.0) / (1.7 + 20.0) = -0.84 → **Fortement IA**

Texte corrigé : [4, 32, 18, 7, 42, 12, 3, 28, 15, 39]
- μ = 20.0
- σ = 13.8
- B = (13.8 - 20.0) / (13.8 + 20.0) = -0.18 → **Zone grise haute, acceptable**

### Comment améliorer B

- Insérer 2-3 phrases de 3-5 mots par page ("Résultat : rien.", "Ça n'a pas marché.")
- Insérer 1-2 phrases de 35+ mots avec subordonnées imbriquées
- Varier entre 4 et 45 mots, pas entre 15 et 25

---

## 2. Variance du Type-Token Ratio (TTR)

### Formule

```
Pour chaque fenêtre glissante de 100 tokens :
  TTR_i = nombre de mots uniques / 100

TTR_mean = moyenne des TTR_i
TTR_var = variance des TTR_i
```

### Interprétation

| TTR_var | Interprétation | Action |
|---|---|---|
| < 0.04 | IA : richesse lexicale trop régulière | Varier le vocabulaire (zones techniques + zones simples) |
| 0.04 - 0.06 | Zone grise | Vérifier les autres métriques |
| > 0.06 | Humain : variation naturelle | OK |

### Comment améliorer TTR_var

- Créer des zones de vocabulaire répétitif (quand on insiste sur un point, répéter
  le même mot au lieu de chercher un synonyme)
- Créer des zones de vocabulaire riche (quand on développe un argument nouveau,
  utiliser le vocabulaire technique de terrain)
- Ne pas maintenir un niveau de richesse constant

---

## 3. Entropie positionnelle des connecteurs (EPC)

### Formule

```
Pour chaque connecteur détecté, calculer sa position relative dans le paragraphe :
  pos_i = index_mot_connecteur / longueur_paragraphe_en_mots

Distribution des pos_i en 3 zones :
  Z1 = proportion de connecteurs en position 0.0 - 0.15 (début)
  Z2 = proportion de connecteurs en position 0.15 - 0.50 (milieu)
  Z3 = proportion de connecteurs en position 0.50 - 1.00 (fin)

EPC = -Σ(Zi × log2(Zi)) pour Zi > 0
```

### Interprétation

| Pattern Z1/Z2/Z3 | Interprétation | Action |
|---|---|---|
| Z1 > 80 % | IA : connecteurs toujours en début | Déplacer en milieu ou fin |
| Z1 60-80 % | Suspect | Rééquilibrer |
| Z1 40-60 % | Humain : distribution naturelle | OK |
| EPC < 1.0 | IA : distribution concentrée | Disperser les connecteurs |
| EPC > 1.2 | Humain : distribution dispersée | OK |

### Comment améliorer EPC

Au lieu de :
> **En outre**, la digitalisation pose des défis.

Écrire :
> La digitalisation pose, **en outre**, des défis spécifiques.

Ou :
> La digitalisation pose des défis spécifiques, **d'ailleurs**.

Ou mieux : supprimer le connecteur entièrement.

---

## 4. Densité sémantique (DS)

### Formule

```
Pour chaque phrase, évaluer :
  info_i = 1 si la phrase apporte une information factuelle nouvelle
           (chiffre, fait, nom, date, observation concrète)
  info_i = 0.5 si la phrase développe/nuance une info précédente
  info_i = 0 si la phrase est du fluff (reformulation, transition vide,
           contextualisation inutile)

DS = Σ(info_i) / nombre_de_phrases
```

### Interprétation

| DS | Interprétation | Action |
|---|---|---|
| < 0.3 | IA : trop de fluff | Supprimer les phrases vides, ajouter des faits |
| 0.3 - 0.5 | Zone grise | Acceptable si burstiness OK |
| 0.5 - 0.7 | Humain : bon ratio info/prose | OK |
| > 0.7 | Très dense (liste de faits) | OK mais vérifier que c'est fluide |

### Comment améliorer DS

- Supprimer toute phrase qui ne dit rien de nouveau
- Remplacer les généralisations par des faits : "L'entreprise a progressé" -> "Le CA
  est passé de 1.2M à 1.5M entre 2024 et 2025"
- Supprimer les phrases de transition qui n'apportent rien
  ("Après avoir examiné X, intéressons-nous à Y")

---

## 5. Score de régularité structurelle (SRS)

### Formule

```
Pour chaque paire de paragraphes adjacents :
  delta_len_i = |longueur_para_i - longueur_para_i+1| / max(longueur_para_i, longueur_para_i+1)

SRS = 1 - moyenne(delta_len_i)
```

### Interprétation

| SRS | Interprétation | Action |
|---|---|---|
| > 0.85 | IA : paragraphes tous de même longueur | Déséquilibrer radicalement |
| 0.70 - 0.85 | Suspect | Varier les longueurs |
| < 0.70 | Humain : paragraphes de longueurs variées | OK |

### Comment améliorer SRS

- Un paragraphe de 2 phrases, suivi d'un de 8, suivi d'un de 4
- Ne jamais avoir 3 paragraphes consécutifs de longueur similaire (±20%)
- Autoriser les paragraphes d'une seule phrase

---

## 6. Ratio de Hapax Legomena (RHL)

Les hapax legomena sont des mots qui n'apparaissent qu'une seule fois dans le texte.
Les humains en produisent significativement plus que les LLM, car les LLM recyclent
un vocabulaire restreint et prévisible.

### Formule

```
RHL = nombre de mots apparaissant exactement 1 fois / nombre total de mots uniques
```

### Interprétation

| RHL | Interprétation | Action |
|---|---|---|
| < 0.40 | IA : vocabulaire trop recyclé | Introduire des termes techniques, noms propres, jargon métier |
| 0.40 - 0.55 | Zone grise | Acceptable si autres métriques OK |
| > 0.55 | Humain : vocabulaire riche et varié | OK |

### Comment améliorer RHL

- Utiliser le vocabulaire technique du terrain (lettrage, FEC, liasse, OD, BFR)
- Citer des noms propres (logiciels, personnes, lieux)
- Éviter la variation synonymique IA (le cabinet / la structure / l'entité)
  et préférer la répétition du mot juste + introduction de mots neufs ailleurs

---

## 7. Déviation de la loi de Zipf (DZ)

La loi de Zipf stipule que dans un texte naturel, la fréquence du n-ième mot le plus
fréquent est inversement proportionnelle à son rang : freq ~ 1/rang^α. Les textes
humains suivent cette loi avec α proche de 1.0. Les textes IA dévient.

### Formule

```
Pour chaque mot unique, calculer :
  rang_i = classement par fréquence décroissante (1, 2, 3...)
  freq_i = nombre d'occurrences

Régression log-log :
  log(freq_i) = -α × log(rang_i) + c

DZ = |α - 1.0|
```

### Interprétation

| DZ | Interprétation | Action |
|---|---|---|
| > 0.25 | IA : distribution lexicale anormale | Varier drastiquement le vocabulaire |
| 0.10 - 0.25 | Zone grise | Vérifier les autres métriques |
| < 0.10 | Humain : distribution naturelle | OK |

### Note

Cette formule est plus complexe à calculer. Demander au LLM évaluateur de
faire la régression log-log et de reporter α. Si α < 0.75 ou α > 1.25,
c'est un signal IA.

---

## 8. Index de diversité des débuts de phrases (IDDP)

Les LLM commencent leurs phrases de manière répétitive (même type de mot :
article, pronom, connecteur). Les humains varient davantage.

### Formule

```
Pour chaque phrase, classifier le premier mot en catégorie :
  ART = article (Le, La, Les, Un, Une, Des)
  PRO = pronom (Il, Elle, On, Je, Nous, Ils, Elles, Ce, Cela)
  CON = connecteur (De plus, En outre, Cependant, Toutefois, En effet)
  NOM = nom propre
  ADV = adverbe (Concrètement, Honnêtement, Malheureusement)
  VER = verbe (Reste, Vient, Faut)
  NUM = chiffre (200 dossiers, 3 collaborateurs)
  PRE = préposition/CC (En trois mois, Depuis septembre, Pendant le stage)
  QUE = question (Pourquoi, Comment, Est-ce que)
  AUT = autre

IDDP = nombre de catégories utilisées / 10

Puis vérifier : aucune catégorie ne dépasse 40 % des débuts de phrases.
```

### Interprétation

| IDDP | Interprétation | Action |
|---|---|---|
| < 0.4 | IA : débuts trop répétitifs | Varier les ouvertures (cf. Phase 8.3 du SKILL.md) |
| 0.4 - 0.6 | Zone grise | Vérifier qu'aucune catégorie ne domine |
| > 0.6 | Humain : bonne diversité | OK |

| Catégorie dominante | Seuil max | Si dépassé |
|---|---|---|
| ART (Le, La...) | 30 % | Commencer par des verbes, adverbes, chiffres |
| PRO (Il, Elle...) | 25 % | Varier avec noms propres, questions, CC |
| CON (De plus...) | 15 % | Supprimer la majorité des connecteurs en tête |

---

## 9. Similarité cosinus inter-paragraphes (SCIP)

Les paragraphes IA sont sémantiquement proches les uns des autres (ils "tournent
autour" du même point). Les paragraphes humains progressent : chaque paragraphe
ajoute une dimension nouvelle.

### Formule

```
Pour chaque paire de paragraphes adjacents (P_i, P_{i+1}) :
  Extraire les mots-clés significatifs (noms, verbes, adjectifs, hors mots vides)
  Construire un vecteur de fréquence pour chaque paragraphe
  Calculer la similarité cosinus :
    cos_i = (V_i · V_{i+1}) / (||V_i|| × ||V_{i+1}||)

SCIP = moyenne des cos_i
```

### Interprétation

| SCIP | Interprétation | Action |
|---|---|---|
| > 0.60 | IA : paragraphes trop similaires (redondance paraphrastique) | Supprimer les doublons, ajouter du contenu neuf |
| 0.35 - 0.60 | Zone grise | OK si progression thématique visible |
| < 0.35 | Humain : bonne progression | OK |

### Note simplifiée

Si le calcul vectoriel est trop complexe, demander au LLM évaluateur :
"Pour chaque paire de paragraphes adjacents, estime sur une échelle de 0 à 1
à quel point ils disent la même chose avec des mots différents."

---

## 10. Variance de l'entropie informationnelle par segment (VEIS)

L'IA maintient une densité informationnelle constante. Un humain alterne entre
des passages denses (analyse technique, chiffres) et des passages légers
(anecdote, transition, aparté).

### Formule

```
Pour chaque segment de ~100 mots :
  E_i = nombre d'éléments informatifs (chiffres, noms propres, faits,
        références, termes techniques) / nombre de mots du segment

VEIS = variance des E_i
```

### Interprétation

| VEIS | Interprétation | Action |
|---|---|---|
| < 0.005 | IA : densité trop constante | Alterner passages denses et légers |
| 0.005 - 0.015 | Zone grise | Acceptable |
| > 0.015 | Humain : variation naturelle | OK |

### Comment améliorer VEIS

- Après un paragraphe dense (3+ chiffres, termes techniques), insérer un
  paragraphe léger (anecdote, question, aparté)
- Autoriser des "creux" informationnels (transitions, réflexions personnelles)
- Ne pas distribuer les faits uniformément dans le texte

---

## 11. Ratio voix passive / voix active (RVPA)

Les LLM surutilisent la voix passive et les tournures impersonnelles, surtout
en français académique. Les humains utilisent plus la voix active.

### Formule

```
RVPA = nombre de constructions passives / nombre total de propositions

Constructions passives à compter :
- "il a été observé que"
- "il est démontré que"
- "une amélioration a été constatée"
- "[sujet] a été [participe passé] par [agent]"
- Tournures impersonnelles : "il convient de", "il est nécessaire de",
  "il apparaît que", "il s'avère que"
```

### Interprétation

| RVPA | Interprétation | Action |
|---|---|---|
| > 0.40 | IA : trop de passif/impersonnel | Réécrire en voix active avec sujet humain |
| 0.20 - 0.40 | Zone grise | Acceptable en contexte formel |
| < 0.20 | Humain : voix active dominante | OK |

### Comment améliorer RVPA

Au lieu de : "Il a été observé que la productivité a augmenté"
Écrire : "J'ai observé que la productivité a augmenté" (si format le permet)
Ou : "La productivité a augmenté de 15 %" (actif, factuel)

---

## 12. Coefficient de Gini des longueurs de paragraphes (CGLP)

Le coefficient de Gini mesure l'inégalité. Appliqué aux longueurs de paragraphes,
il détecte si les paragraphes sont trop uniformes (IA) ou naturellement inégaux (humain).

### Formule

```
Trier les longueurs de paragraphes en ordre croissant : L_1, L_2, ..., L_n

CGLP = (2 × Σ(i × L_i) / (n × Σ(L_i))) - (n + 1) / n
```

### Interprétation

| CGLP | Interprétation | Action |
|---|---|---|
| < 0.15 | IA : paragraphes trop égaux | Déséquilibrer radicalement |
| 0.15 - 0.30 | Zone grise | Acceptable |
| > 0.30 | Humain : inégalité naturelle | OK |

### Comment améliorer CGLP

- Un paragraphe d'1 phrase, suivi d'un de 12 lignes, suivi d'un de 4 lignes
- Ne jamais avoir 3 paragraphes consécutifs de même longueur
- Autoriser les paragraphes très courts (1-2 phrases) et très longs (10+ phrases)

---

## 13. Densité d'auto-corrections et marqueurs de pensée (DACP)

Mesure la présence de traces de pensée en cours : hésitations, corrections,
reformulations, apartés. C'est le signal le plus difficile à simuler selon
ChatGPT 5.4 (Pattern 40 du SKILL.md).

### Formule

```
Compter les marqueurs suivants dans le texte :
  - Micro-révisions : "enfin", "plutôt", "non en fait", "disons que",
    "c'est-à-dire", "ou plutôt"
  - Apartés : parenthèses contenant une réflexion personnelle
  - Questions rhétoriques : "?" dans le corps du texte (hors titres)
  - Marqueurs d'incertitude : "il me semble", "je ne suis pas sûr",
    "probablement", "à mon avis"
  - Marqueurs de coût cognitif : "le problème c'est que", "on a hésité",
    "deux options se posaient", "ce n'est pas idéal mais"

DACP = nombre total de marqueurs / (nombre de mots / 500)
```

### Interprétation

| DACP | Interprétation | Action |
|---|---|---|
| 0 | IA : aucune trace de pensée | Injecter 2-3 marqueurs par page |
| 1 - 3 | Zone grise | Acceptable, vérifier la naturalité |
| > 3 | Humain : traces de pensée visibles | OK |

---

## 14. Distance de Dépendance Syntaxique Moyenne (DDSM)

Mesure la distance en mots entre le sujet et le verbe principal. L'IA minimise
cette distance (génération gauche-droite). L'humain utilise des incises et
subordonnées qui éloignent le sujet du verbe.

### Formule

```
DDSM = (1/N) x Σ |position(verbe_i) - position(sujet_i)|

N = nombre de phrases
```

### Interprétation

| DDSM | Interprétation | Action |
|---|---|---|
| < 2.5 | IA : sujet-verbe toujours collés | Insérer des incises entre sujet et verbe |
| 2.5 - 3.5 | Zone grise | Acceptable |
| 3.5 - 6.0 | Humain : distance naturelle | OK |

### Exemple

"Le chercheur, fatigué par ses longues heures, s'endort." -> |10-2| = 8
"L'algorithme génère du texte." -> |2-1| = 1
DDSM = (8+1)/2 = 4.5 (humain)

### Comment améliorer

Transformer : "L'outil permet d'optimiser les processus."
En : "L'outil, malgré ses limites sur les cas complexes, permet d'optimiser."

---

## 15. Indice de Contagion Lexicale (ICL)

Mesure la répétition de lemmes lexicaux dans une fenêtre de 50 tokens. L'IA
"contamine" son contexte : une fois un mot généré, son embedding augmente la
probabilité de sa réapparition proche.

### Formule

```
ICL = nombre de mots lexicaux réapparaissant dans une fenêtre de 50 tokens
    / nombre total de mots lexicaux (noms, verbes, adjectifs)
```

### Interprétation

| ICL | Interprétation | Action |
|---|---|---|
| > 0.28 | IA : contagion lexicale forte | Utiliser des pronoms ou synonymes pour espacer |
| 0.12 - 0.28 | Zone grise | Acceptable |
| < 0.12 | Humain : pas de contagion | OK |

### Mécanisme

Quand un LLM génère "innovation", l'embedding de ce mot sature le contexte local
et augmente la probabilité de générer "innovation" ou "innover" juste après.
L'humain utilise spontanément des pronoms ("elle") ou change de sujet.

---

## 16. Entropie des Transitions de Ponctuation (EMTP)

La ponctuation IA suit un schéma prédictible (virgule -> point -> virgule).
L'humain utilise la ponctuation de manière expressive et erratique.

### Formule

```
Extraire la séquence ordonnée de tous les signes de ponctuation du texte.
Pour chaque paire (signe_i, signe_{i+1}), calculer la probabilité de transition.

EMTP = -Σ p(transition_ij) x log2(p(transition_ij))
```

### Interprétation

| EMTP | Interprétation | Action |
|---|---|---|
| < 1.1 bits | IA : ponctuation prévisible | Varier la ponctuation (points de suspension, parenthèses, questions) |
| 1.1 - 1.8 bits | Zone grise | Acceptable |
| > 1.8 bits | Humain : ponctuation expressive | OK |

### Comment améliorer

Ne pas enchaîner virgule-point-virgule-point en boucle. Insérer des
parenthèses, des points de suspension, des deux-points, des questions.

---

## 17. Volatilité de la Valence Émotionnelle (VVE)

L'alignement RLHF force l'IA à maintenir un ton constant. L'humain a des
trajectoires émotionnelles heurtées.

### Formule

```
Pour chaque phrase, attribuer un score de sentiment v_i de -1 à +1 :
  +1 = très positif, 0 = neutre, -1 = très négatif

VVE = sqrt( (1/(N-1)) x Σ (v_{i+1} - v_i)^2 )
```

### Interprétation

| VVE | Interprétation | Action |
|---|---|---|
| < 0.20 | IA : ton plat, neutralité RLHF | Injecter des contrastes (enthousiasme puis frustration) |
| 0.20 - 0.45 | Zone grise | Acceptable |
| > 0.45 | Humain : émotions contrastées | OK |

### Exemple

"Ce résultat est excellent." (v=0.8) puis "Mais la méthode est bancale." (v=-0.5)
Delta = (-0.5 - 0.8)^2 = 1.69 -> VVE élevée (humain)

---

## 18. Taux d'Imbrication Centrale (TIC)

L'IA génère de gauche à droite et privilégie les branchements à droite.
L'humain planifie globalement et utilise des imbrications centrales.

### Formule

```
TIC = nombre de subordonnées insérées AU MILIEU de la principale
    / nombre total de phrases

Imbrication centrale = Sujet + [subordonnée] + Verbe
Ex: "La voiture, que j'ai achetée hier, est en panne."

Branchement à droite (NON central) :
Ex: "J'ai acheté une voiture qui est en panne."
```

### Interprétation

| TIC | Interprétation | Action |
|---|---|---|
| < 0.05 | IA : jamais d'imbrication centrale | Insérer des relatives et incises entre sujet et verbe |
| 0.05 - 0.25 | Zone grise | Acceptable |
| > 0.25 | Humain : imbrication naturelle | OK |

---

## 19. Indice de Brunet (W)

Mesure de richesse lexicale stable (ne chute pas avec la longueur du texte,
contrairement au TTR). Plus W est bas, plus le vocabulaire est riche.

### Formule

```
W = N ^ (V ^ -0.165)

N = nombre total de mots
V = nombre de mots uniques
```

### Interprétation

| W | Interprétation | Action |
|---|---|---|
| > 13.5 | IA : vocabulaire pauvre et recyclé | Enrichir avec termes techniques, noms propres |
| 11.5 - 13.5 | Zone grise | Acceptable |
| < 11.5 | Humain : vocabulaire riche | OK |

---

## 20. Distance Anaphorique Moyenne (DAM)

Distance en mots entre un pronom et son antécédent. L'IA garde les pronoms
très proches pour éviter l'ambiguïté. L'humain fait confiance au lecteur.

### Formule

```
DAM = (1/N_p) x Σ (position(pronom_k) - position(antécédent_k))

N_p = nombre de liens pronominaux
```

### Interprétation

| DAM | Interprétation | Action |
|---|---|---|
| < 10 mots | IA : pronoms collés à l'antécédent | Éloigner certains pronoms, faire confiance au contexte |
| 10 - 15 mots | Zone grise | Acceptable |
| 15 - 30 mots | Humain : distances naturelles | OK |

---

## 21. Ratio de Spécificité Lexicale (RSL)

Ratio entre termes spécifiques (hyponymes) et termes génériques (hyperonymes).
L'IA utilise des mots parapluie ("outil", "problème", "approche").
L'humain est spécifique ("tournevis", "casse-tête", "méthode CAR").

### Formule

```
RSL = nombre de termes spécifiques / nombre de termes génériques

Termes génériques : outil, problème, approche, processus, démarche, aspect,
  élément, chose, situation, phénomène, domaine, secteur, structure, entité
Termes spécifiques : noms d'outils réels, de méthodes précises, de lieux,
  de personnes, de concepts nommés
```

### Interprétation

| RSL | Interprétation | Action |
|---|---|---|
| < 0.8 | IA : trop de termes parapluie | Remplacer les génériques par des noms précis |
| 0.8 - 1.5 | Zone grise | Acceptable |
| > 1.5 | Humain : vocabulaire spécifique | OK |

---

## 22. Entropie de la Distribution des Temps Verbaux (EDTV)

L'IA s'ancre dans un temps de base (présent ou passé composé). L'humain
navigue entre les temps pour exprimer antériorité, hypothèse, regret.

### Formule

```
Compter chaque temps verbal utilisé :
  présent, imparfait, passé composé, plus-que-parfait,
  futur, conditionnel, subjonctif, passé simple, infinitif

EDTV = -Σ p(temps_t) x log2(p(temps_t))
```

### Interprétation

| EDTV | Interprétation | Action |
|---|---|---|
| < 0.9 bits | IA : bloqué sur 1-2 temps | Varier les temps (conditionnel, plus-que-parfait, subjonctif) |
| 0.9 - 1.6 bits | Zone grise | Acceptable |
| > 1.6 bits | Humain : navigation temporelle riche | OK |

---

## 23. Indice de Périodicité Rythmique (IPR)

Variance du nombre de syllabes entre mots consécutifs. L'IA produit un rythme
plat (mots de 2-3 syllabes). L'humain alterne mots courts et longs.

### Formule

```
IPR = (1/(N-1)) x Σ |syllabes(mot_{i+1}) - syllabes(mot_i)|

N = nombre total de mots
```

### Interprétation

| IPR | Interprétation | Action |
|---|---|---|
| < 0.8 | IA : rythme syllabique plat | Alterner mots courts (1 syllabe) et longs (4+) |
| 0.8 - 1.3 | Zone grise | Acceptable |
| > 1.3 | Humain : rythme en dents de scie | OK |

---

## 24. Divergence KL des Bigrammes Syntaxiques (DKL-POS)

Compare la distribution des paires de catégories grammaticales (DET-NOM, NOM-ADJ,
VERB-DET) du texte avec la distribution naturelle du français.

### Formule

```
DKL = Σ P_texte(bigramme_i) x log2( P_texte(bigramme_i) / P_français(bigramme_i) )

Bigrammes à vérifier : DET-NOM, NOM-ADJ, VERB-DET, ADJ-NOM, PREP-DET,
  NOM-VERB, ADV-VERB, VERB-PREP, PRON-VERB, etc.
```

### Interprétation

| DKL | Interprétation | Action |
|---|---|---|
| > 1.2 | IA : structures syntaxiques stéréotypées | Varier (inversions, dislocations, ellipses) |
| 0.4 - 1.2 | Zone grise | Acceptable |
| < 0.4 | Humain : distribution syntaxique naturelle | OK |

### Note

Le calcul exact nécessite un étiqueteur POS. Demander au LLM évaluateur :
"Étiquette chaque mot (DET, NOM, ADJ, VERB, PREP, ADV, PRON, CONJ),
puis compte les bigrammes et identifie les surreprésentés."

---

## 25. Ratio de Densité des Mots Fonctionnels (RDMF)

L'IA "rembourre" ses phrases de mots grammaticaux pour garantir la fluidité.
L'humain est plus direct et dense en contenu.

### Formule

```
RDMF = mots fonctionnels / mots lexicaux

Mots fonctionnels : déterminants, prépositions, conjonctions, pronoms,
  auxiliaires, locutions conjonctives
Mots lexicaux : noms, verbes principaux, adjectifs, adverbes de manière
```

### Interprétation

| RDMF | Interprétation | Action |
|---|---|---|
| > 1.3 | IA : trop de remplissage grammatical | Couper les locutions ("il est important de noter que" -> dire directement) |
| 1.1 - 1.3 | Zone grise | Acceptable |
| 0.7 - 1.1 | Humain : ratio naturel | OK |

---

## 26. Autocorrélation des Fragments Averbes (AFA) - Second ordre

**Source : Gemini 3.1 Pro Thinking High**
**Cible :** Détecte une IA qui applique mécaniquement la Technique 1 (fragmentation).

Quand un LLM reçoit "insère des phrases courtes", il les répartit uniformément.
L'humain fragmente par clusters (plusieurs fragments de suite) ou par déserts
(longues zones sans fragment).

### Formule

```
Pour chaque phrase, f_i = 1 si fragment averbe (sans verbe conjugué), 0 sinon.

Calculer l'autocorrélation sur les lags k = 1, 2, 3 :
  r(k) = Σ (f_i - f_moy)(f_{i+k} - f_moy) / Σ (f_i - f_moy)^2

AFA = |r(1)| + |r(2)| + |r(3)|
```

### Interprétation

| AFA | Interprétation | Action |
|---|---|---|
| > 0.40 | DÉTECTÉ : fragments trop réguliers (IA simulant l'humain) | Regrouper les fragments en clusters, pas les espacer régulièrement |
| 0.15 - 0.40 | Zone grise | Acceptable |
| < 0.15 | Humain : fragments aléatoires | OK |

### Comment éviter la détection

Ne pas espacer les fragments mécaniquement (1 fragment toutes les 3 phrases).
Les regrouper : 3 fragments d'affilée puis 8 phrases normales, puis 2 fragments.
L'irrégularité doit être elle-même irrégulière.

---

## 27. Asymétrie Positionnelle de la Modalité Épistémique (APME) - Second ordre

**Source : Gemini 3.1 Pro Thinking High**
**Cible :** Détecte une IA qui ajoute l'incertitude en fin de phrase/paragraphe.

L'IA génère d'abord une affirmation confiante (son mode par défaut), puis se
"souvient" du prompt et ajoute l'incertitude à la fin ("Peut-être.", "On verra.").
L'humain intègre l'incertitude dès le début de sa phrase.

### Formule

```
Pour chaque paragraphe p :
  M_total(p) = nombre de marqueurs d'incertitude
    (peut-être, sans doute, on verra, ..., ?, probablement, il me semble)
  M_final(p) = nombre de ces marqueurs dans les 5 derniers tokens du paragraphe

APME = Σ M_final(p) / (Σ M_total(p) + 0.01)
```

### Interprétation

| APME | Interprétation | Action |
|---|---|---|
| > 0.80 | DÉTECTÉ : incertitude toujours en post-fixe | Distribuer l'incertitude EN AMONT dans la phrase |
| 0.35 - 0.80 | Zone grise | Acceptable |
| < 0.35 | Humain : incertitude distribuée | OK |

### Exemple

IA : "Le projet avance bien. Les équipes sont sur le pont. On verra. Peut-être."
→ APME = 2/2 = 1.0 (DÉTECTÉ)

Humain : "Le projet avance peut-être bien, mais on verra si les équipes tiennent."
→ APME = 0/2 = 0.0 (les marqueurs sont en milieu de phrase)

---

## 28. Ratio de Contraste de Perplexité (RCP) - Second ordre

**Source : Gemini 3.1 Pro Thinking High**
**Cible :** Détection globale de l'effort de simulation.

Quand une IA simule un humain, 90 % du texte reste du "pur LLM" (très prévisible)
et 10 % sont des injections de style humain (très imprévisibles). Ce grand écart
trahit la simulation.

### Formule

```
Pour chaque phrase, estimer la "rareté" (proxy de perplexité) :
  R_i = nombre de mots rares ou imprévisibles / nombre total de mots

RCP = max(R_i) / médiane(R_i)
```

### Interprétation

| RCP | Interprétation | Action |
|---|---|---|
| > 12.0 | DÉTECTÉ : pics de rareté isolés dans un texte lisse | Distribuer la rareté uniformément |
| 5.0 - 12.0 | Zone grise | Acceptable |
| 2.0 - 5.0 | Humain : rareté naturellement fluctuante | OK |

### Comment éviter la détection

Ne pas concentrer tous les détails concrets et mots rares dans 2-3 phrases "token".
Distribuer les noms propres, chiffres, jargon métier sur l'ensemble du texte.
Chaque paragraphe doit contenir au moins 1 élément imprévisible.

---

## 29. Le paradoxe de la sur-humanisation (avertissement ChatGPT 5.4)

Ce n'est pas une formule mais un principe fondamental pour l'ensemble du système.

> « Ces techniques ne prouvent pas qu'un texte est humain. Elles augmentent
> l'impression de présence, d'irrégularité et de friction discursive. Elles
> peuvent tromper certains détecteurs stylistiques faibles, sans garantir quoi
> que ce soit face à une analyse plus robuste. »
>
> « Si ces procédés sont appliqués mécaniquement, ils deviennent eux-mêmes un
> motif détectable. Une signature. Presque un tic. »
>
> -- ChatGPT 5.4

### Les règles anti-sur-humanisation

1. **Ne jamais appliquer les 5 techniques dans le même ordre** à chaque paragraphe
2. **Varier la fréquence** : pas un fragment court toutes les 3 phrases
3. **Varier le type** : pas toujours du sarcasme, pas toujours des points de suspension
4. **Ne pas forcer** : si un paragraphe n'a pas besoin d'une micro-révision, ne pas
   en mettre une juste pour "faire humain"
5. **L'incertitude doit être intégrée dans la phrase**, pas collée à la fin
6. **Les détails concrets doivent être distribués** sur tout le texte, pas concentrés
7. **La meilleure humanisation est invisible** : le lecteur ne doit pas remarquer
   les techniques, seulement le résultat

### Le test ultime

Si on peut prédire où tombera la prochaine "technique d'humanisation" dans le texte,
c'est que c'est mécanique. L'objectif est l'imprévisibilité de l'imprévisibilité.

---

## 30. Densité d'Ancrage Référentiel Local (DARL) - Couverture des 40 %

**Source : Gemini 3.1 Pro Thinking High**
**Cible :** Compenser le retrieval_match_score et l'ancrage dans le réel.

L'IA est probabiliste : elle génère les tokens les plus probables, donc les plus
génériques. Elle souffre d'une "phobie de l'hallucination" qui l'empêche d'inventer
des détails hyper-locaux. L'humain sature son texte de références de niveau 3.

### Formule

```
Pour chaque entité nommée, date, lieu ou acronyme du texte, attribuer un poids :
  w = 1 si entité globale (France, Internet, UE)
  w = 2 si entité de domaine (Pennylane, Python, DSCG, Compilatio)
  w = 3 si entité hyper-locale/personnelle (M. Dupont, le 14 mars à 10h, salle B204)

DARL = Σ w(e_i) / nombre de paragraphes
```

### Interprétation

| DARL | Interprétation | Action |
|---|---|---|
| < 1.5 | IA : texte générique, aucun ancrage | Ajouter noms, dates, lieux, acronymes précis |
| 1.5 - 4.5 | Zone grise | Enrichir avec des entités de niveau 3 |
| > 4.5 | Humain : ancrage fort dans le réel | OK |

### Pourquoi c'est décisif

Un DARL élevé fait chuter le score des détecteurs sous 20 % parce que les entités
de niveau 3 (noms de personnes, lieux précis, dates exactes) sont impossibles à
prédire pour un LLM, ce qui détruit les métriques de perplexité et de rang de tokens
du pipeline externe.

---

## 31. Indice de Distorsion Collocationnelle (IDC) - Couverture des 40 %

**Source : Gemini 3.1 Pro Thinking High**
**Cible :** Détecter le paraphrase_bypass_score (Quillbot, Wordtune).

Les outils de paraphrase remplacent les mots par des synonymes via dictionnaire
sans tenir compte des collocations naturelles du français.

### Formule

```
Pour chaque paire de mots adjacents (Nom-Adjectif ou Verbe-Nom) :
  Évaluer si la combinaison est naturelle en français.
  Si non (rupture de collocation), compter comme atypique.

IDC = N_atypiques / N_lexicaux x 100
```

### Interprétation

| IDC | Interprétation | Action |
|---|---|---|
| > 8.0 | DÉTECTÉ : texte paraphrasé mécaniquement | Réécrire les collocations cassées |
| 2.0 - 8.0 | Zone grise | Vérifier les paires suspectes |
| < 2.0 | Humain (ou IA non paraphrasée) | OK |

### Exemples de collocations cassées

| Original | Paraphrasé (détectable) | Correct |
|---|---|---|
| question importante | interrogation volumineuse | question centrale |
| résoudre un problème | solutionner une difficulté | traiter le problème |
| mener une étude | conduire une investigation | réaliser une étude |

---

## 32. Cohésion Déictique Énonciative (CDE) - Couverture des 40 %

**Source : Gemini 3.1 Pro Thinking High**
**Cible :** Mesurer si l'auteur s'est projeté dans son texte (préparation soutenance).

L'IA produit un discours "hors-sol". L'étudiant qui maîtrise son texte laisse
des traces de son processus de réflexion et de la matérialité de son document.

### Formule

```
D_ego = nombre de marques de 1ère personne impliquées dans une action cognitive
  (je pense, mon analyse, notre choix, j'ai observé, il me semble)

D_spatio = marqueurs liant le texte à son contexte de production
  (ici, ce mémoire, dans la partie précédente, comme évoqué plus haut, aujourd'hui)

CDE = (D_ego x D_spatio) / nombre de phrases
```

### Interprétation

| CDE | Interprétation | Action |
|---|---|---|
| < 0.3 | IA : discours hors-sol, aucune projection | Ajouter "je", "mon", ancrer dans le document |
| 0.3 - 1.2 | Zone grise | Enrichir selon le format |
| > 1.2 | Humain : auteur projeté dans son écrit | OK |

### Pourquoi c'est lié à la soutenance

Un CDE élevé indique que l'auteur a conscience de son propre texte. C'est le
meilleur prédicteur de réussite à l'oral : quelqu'un qui écrit "mon analyse
montre que..." est quelqu'un qui peut défendre "mon analyse" devant un jury.

---

## 33. Ratio de Dilution du Signal (RDS) - Couverture des 40 %

**Source : Gemini 3.1 Pro Thinking High**
**Cible :** Viser la zone d'invisibilité de Turnitin (< 0.20).

Turnitin ne classe pas un document de manière binaire. Si le "bruit humain"
dépasse un certain pourcentage, le classifieur préfère retourner < 20 %
pour éviter les faux positifs.

### Formule

```
V_IA = volume de texte (mots) avec caractéristiques lisses
  (faible variance, syntaxe prédictible, pas de détails concrets)

V_humain = volume de texte (mots) avec aspérités
  (DARL > 3, auto-corrections, syntaxe orale, fautes mineures,
   anecdotes, chiffres précis, noms propres)

RDS = V_humain / (V_IA + V_humain)
```

### Interprétation

| RDS | Interprétation | Action |
|---|---|---|
| < 0.15 | Détecté : pas assez de bruit humain | Ajouter massivement du contenu personnel |
| 0.15 - 0.35 | Zone limite, risque modéré | Enrichir les zones lisses |
| > 0.35 | Invisible pour Turnitin (< 20 %) | OK |

### Exemple concret

800 mots IA + 100 mots intro perso + 3 anecdotes de 50 mots = 250 mots humains.
RDS = 250 / 1050 = 0.24 (zone limite).

Pour passer : ajouter 2 anecdotes supplémentaires (100 mots) → 350/1150 = 0.30.
Ou mieux : réécrire 200 mots IA en ajoutant des détails concrets → 450/850 = 0.53.

### La règle du tiers

Pour être invisible : **au moins un tiers du texte** doit contenir des éléments
que seul l'auteur peut connaître (détails terrain, noms, dates, anecdotes, opinions).

---

## 34. Score composite estimé étendu (SCE v3)

> **AVERTISSEMENT (ChatGPT 5.4)** : Les techniques d'humanisation appliquées
> mécaniquement deviennent elles-mêmes un motif détectable. Phrase longue, phrase
> courte, aparté, "Merci.", "Oui, un tuto.", "Peut-être." - à répétition, ça sent
> la recette, pas la spontanéité. Les formules 27-30 ci-dessous détectent
> précisément cette sur-humanisation mécanique.

### Formule complète (26 métriques)

Le SCE v3 intègre les 13 métriques de base + les 12 formules de Gemini Thinking.
Chaque métrique est normalisée sur [0,1] puis pondérée.

```
SCE_v3 =
  # --- Métriques de base (60%) ---
  (0.08 x (1 - DS))                    # densité sémantique
  + (0.08 x (1 - norm_B))              # burstiness
  + (0.10 x marker_density)            # marqueurs IA
  + (0.05 x SRS)                       # régularité structurelle
  + (0.04 x (1 - norm_RHL))            # hapax legomena
  + (0.04 x DZ_norm)                   # déviation Zipf
  + (0.04 x (1 - IDDP))               # diversité débuts
  + (0.04 x SCIP_norm)                 # similarité inter-paragraphes
  + (0.04 x (1 - VEIS_norm))           # variance entropie
  + (0.03 x RVPA)                      # ratio passif
  + (0.03 x (1 - CGLP_norm))           # Gini paragraphes
  + (0.03 x (1 - DACP_norm))           # auto-corrections

  # --- Métriques Gemini (40%) ---
  + (0.04 x (1 - DDSM_norm))           # distance dépendance syntaxique
  + (0.04 x ICL_norm)                   # contagion lexicale
  + (0.04 x (1 - EMTP_norm))           # entropie transitions ponctuation
  + (0.04 x (1 - VVE_norm))            # volatilité valence émotionnelle
  + (0.04 x (1 - TIC_norm))            # imbrication centrale
  + (0.03 x W_norm)                     # indice de Brunet
  + (0.03 x (1 - DAM_norm))            # distance anaphorique
  + (0.03 x (1 - RSL_norm))            # spécificité lexicale
  + (0.03 x (1 - EDTV_norm))           # entropie temps verbaux
  + (0.02 x (1 - IPR_norm))            # périodicité rythmique
  + (0.02 x DKL_norm)                   # divergence KL syntaxique
  + (0.02 x RDMF_norm)                  # densité mots fonctionnels
```

### Normalisation des nouvelles métriques

```
DDSM_norm = min(DDSM / 6.0, 1.0)
ICL_norm = min(ICL / 0.40, 1.0)
EMTP_norm = min(EMTP / 2.5, 1.0)
VVE_norm = min(VVE / 0.60, 1.0)
TIC_norm = min(TIC / 0.40, 1.0)
W_norm = max(min((W - 10) / 5.0, 1.0), 0)   # 10-15 -> 0-1
DAM_norm = min(DAM / 30.0, 1.0)
RSL_norm = min(RSL / 2.0, 1.0)
EDTV_norm = min(EDTV / 2.0, 1.0)
IPR_norm = min(IPR / 1.8, 1.0)
DKL_norm = min(DKL / 1.5, 1.0)
RDMF_norm = max(min((RDMF - 0.7) / 1.0, 1.0), 0)  # 0.7-1.7 -> 0-1
```

### Interprétation

| SCE_v3 | Label | Objectif |
|---|---|---|
| < 0.20 | HUMAN | Cible idéale (Turnitin ne signale rien) |
| 0.20 - 0.35 | LIKELY_HUMAN | Acceptable |
| 0.35 - 0.50 | UNCERTAIN | À retravailler |
| 0.50 - 0.75 | LIKELY_AI | Réécriture nécessaire |
| > 0.75 | AI_GENERATED | Réécriture profonde |

### Version intermédiaire (SCE v2, 14 métriques de base)

Si les 12 formules Gemini sont trop complexes, utiliser seulement les 13 premières
métriques avec les pondérations d'origine (section 14 du fichier original).

### Version minimale (SCE lite, 8 métriques)

```
SCE_lite = (0.20 x (1 - DS))          # densité sémantique
         + (0.15 x (1 - norm_B))       # burstiness
         + (0.20 x marker_density)     # marqueurs IA
         + (0.10 x SRS)               # régularité structurelle
         + (0.10 x (1 - IDDP))        # diversité débuts
         + (0.10 x RVPA)              # ratio passif
         + (0.08 x (1 - DACP_norm))   # auto-corrections
         + (0.07 x (1 - CGLP_norm))   # Gini paragraphes
```

Même grille d'interprétation.

---

## 7. Prompt d'auto-évaluation (à donner au LLM)

Copier-coller ce prompt avec le texte à évaluer :

```
Tu es un évaluateur de texte. Calcule les métriques suivantes sur le texte
ci-dessous. Montre tes calculs étape par étape.

1. BURSTINESS (B)
   - Liste la longueur en mots de chaque phrase
   - Calcule μ (moyenne) et σ (écart-type)
   - Calcule B = (σ - μ) / (σ + μ)
   - Verdict : B > 0.3 = humain, B < 0 = suspect, B < -0.5 = IA

2. TTR VARIANCE
   - Découpe le texte en fenêtres de 100 tokens
   - Calcule le TTR de chaque fenêtre
   - Calcule la variance inter-fenêtres
   - Verdict : var > 0.06 = humain, var < 0.04 = IA

3. CONNECTEURS
   - Liste tous les connecteurs et leur position relative dans le paragraphe
   - Calcule Z1 (% en début), Z2 (% en milieu), Z3 (% en fin)
   - Verdict : Z1 > 80% = IA, Z1 < 60% = humain

4. DENSITÉ SÉMANTIQUE
   - Pour chaque phrase : info nouvelle (1), développement (0.5), fluff (0)
   - Calcule DS = somme / nombre de phrases
   - Verdict : DS < 0.3 = IA (trop de fluff), DS > 0.5 = humain

5. RÉGULARITÉ STRUCTURELLE
   - Liste la longueur de chaque paragraphe
   - Calcule SRS = 1 - moyenne des deltas relatifs
   - Verdict : SRS > 0.85 = IA, SRS < 0.70 = humain

6. MARQUEURS IA
   - Compte les marqueurs de la liste noire (voir ci-dessous)
   - Densité = marqueurs / (mots / 500)
   - Verdict : > 4 par 500 mots = signal fort

7. HAPAX LEGOMENA
   - Compte les mots qui n'apparaissent qu'1 seule fois
   - RHL = hapax / mots uniques totaux
   - Verdict : RHL > 0.55 = humain, RHL < 0.40 = IA

8. DIVERSITÉ DES DÉBUTS DE PHRASES
   - Classe le 1er mot de chaque phrase (article/pronom/connecteur/nom/adverbe/verbe/chiffre/question)
   - IDDP = catégories utilisées / 10, aucune catégorie > 40%
   - Verdict : IDDP > 0.6 = humain, IDDP < 0.4 = IA

9. SIMILARITÉ INTER-PARAGRAPHES
   - Pour chaque paire adjacente, estime la similarité sémantique (0-1)
   - SCIP = moyenne
   - Verdict : SCIP < 0.35 = humain, SCIP > 0.60 = IA (redondance)

10. VARIANCE DENSITÉ INFORMATIONNELLE
    - Par segment de 100 mots, compte les éléments informatifs
    - VEIS = variance des densités
    - Verdict : VEIS > 0.015 = humain, VEIS < 0.005 = IA

11. RATIO PASSIF / ACTIF
    - RVPA = constructions passives / total propositions
    - Verdict : RVPA < 0.20 = humain, RVPA > 0.40 = IA

12. GINI DES PARAGRAPHES
    - Coefficient de Gini des longueurs de paragraphes
    - Verdict : CGLP > 0.30 = humain, CGLP < 0.15 = IA

13. MARQUEURS DE PENSÉE
    - Compte : enfin, plutôt, non en fait, apartés (), questions ?, incertitudes, arbitrages
    - DACP = marqueurs / (mots / 500)
    - Verdict : DACP > 3 = humain, DACP = 0 = IA

14. SCORE COMPOSITE v2
    Calcule SCE_v2 avec les 14 métriques (ou SCE_lite avec 8)
    - Verdict : < 0.20 = HUMAN, 0.20-0.35 = LIKELY_HUMAN, > 0.35 = à retravailler

15. ZONES À RISQUE
    - Identifie les phrases/paragraphes les plus suspects
    - Propose des corrections concrètes pour chaque zone

Liste noire de marqueurs IA (non exhaustive) :
crucial, fondamental, essentiel, il convient de, force est de constater,
en outre, par ailleurs, de plus, met en lumière, constitue un, représente un,
s'inscrit dans, enjeu majeur, levier, paradigme, holistique, synergie,
écosystème, dans un monde en constante évolution, il est important de noter,
permet de, consiste à, dans ce contexte, à ce stade, robuste, pertinent,
nuancé, cristalliser, sous-jacent, une myriade de, un équilibre délicat,
inéluctablement, orchestrer, tapisserie, naviguer dans, plonger dans.

TEXTE À ÉVALUER :
[COLLER LE TEXTE ICI]
```

---

## 8. Workflow complet d'auto-évaluation

```
1. Réécrire le texte avec plume-naturelle (48 patterns + Phase 7 + Phase 8)
                    |
                    v
2. Copier le texte réécrit + le prompt d'auto-évaluation (section 7)
   dans un LLM avec raisonnement étendu
                    |
                    v
3. Lire les scores :
   - SCE_approx < 0.25 ? → Livrer
   - SCE_approx 0.25-0.40 ? → Vérifier les zones à risque, corriger si nécessaire
   - SCE_approx > 0.40 ? → Retour à l'étape 1 avec focus sur les métriques faibles
                    |
                    v
4. Vérifier les métriques individuelles :
   - B < 0 ? → Casser le rythme (phrases courtes + longues)
   - TTR_var < 0.04 ? → Varier le vocabulaire (zones répétitives + riches)
   - Z1 > 80 % ? → Déplacer les connecteurs en milieu de phrase
   - DS < 0.3 ? → Supprimer le fluff, ajouter des faits
   - SRS > 0.85 ? → Déséquilibrer les paragraphes
   - Marqueurs > 4/500 mots ? → Remplacer avec la table du SKILL.md
                    |
                    v
5. Re-scorer après corrections → Boucler jusqu'à SCE_approx < 0.40
```

---

## 9. Score de risque de paraphrase (SRP)

Les détecteurs modernes ont une catégorie spécifique pour le texte IA paraphrasé
(AI_LIKELY_PARAPHRASED_OR_HEAVILY_EDITED). Cette auto-évaluation vérifie si le
texte risque de déclencher ce flag.

### Formule

```
Pour le texte réécrit, vérifier :
  a) La structure argumentative a-t-elle changé par rapport à l'original ?
     (pas juste les mots, mais l'ORDRE des arguments, la LONGUEUR des parties)
     → structure_changed = 1 si oui, 0 si non

  b) Du contenu nouveau a-t-il été ajouté (anecdotes, détails, opinions) ?
     → new_content_ratio = mots_nouveaux / mots_total

  c) Du contenu a-t-il été supprimé (fluff, redondances) ?
     → deletion_ratio = 1 - (mots_finaux / mots_originaux)

  d) Le vocabulaire a-t-il été simplifié sans toucher la structure ?
     → vocab_only_change = 1 si structure identique + mots différents, 0 sinon

SRP = (0.3 × (1 - structure_changed))
    + (0.3 × (1 - new_content_ratio))
    + (0.2 × (1 - deletion_ratio))
    + (0.2 × vocab_only_change)
```

### Interprétation

| SRP | Risque | Action |
|---|---|---|
| > 0.70 | ÉLEVÉ : texte juste paraphrasé, détectable | Restructurer, ajouter du contenu, supprimer du fluff |
| 0.40 - 0.70 | MODÉRÉ : quelques changements structurels | Ajouter plus de contenu original |
| < 0.40 | FAIBLE : le texte a été substantiellement retravaillé | OK |

### Ce qui déclenche le flag paraphrase chez les détecteurs

- Structure argumentative IA conservée sous nouveau lexique
- Squelette syntaxique régulier même si les mots changent
- Vocabulaire simplifié mais architecture logique intacte
- Même nombre de paragraphes, même longueur, même ordre

### Ce qui l'évite

- Réorganiser l'argumentation (inverser l'ordre, fusionner, scinder)
- Ajouter du contenu que l'IA n'avait pas
- Supprimer du contenu plutôt que de tout paraphraser
- Un texte plus court mais plus dense est moins suspect

---

## 10. Limites de l'auto-évaluation

1. **Le LLM ne calcule pas les logprobs.** Les métriques de perplexité et DetectGPT
   sont calculées par le pipeline externe du détecteur. Le SCE_approx est une
   estimation indirecte, pas le score réel.

2. **Le LLM évaluateur a ses propres biais.** Si on demande à Claude d'évaluer
   un texte réécrit par Claude, il peut être biaisé (trop sévère ou trop indulgent).
   Utiliser un modèle différent pour l'évaluation si possible.

3. **Les seuils sont des approximations.** Les vrais seuils de Compilatio ou
   Turnitin sont propriétaires et calibrés sur leurs propres corpus.

4. **Un score bas ne garantit pas l'indétectabilité.** Le jugement humain
   (décalage de niveau, ressemblances entre copies, questions de soutenance)
   reste un risque indépendant du score.

5. **L'auto-évaluation n'est utile que si l'étudiant maîtrise son texte.**
   Un texte qui passe les métriques mais que l'étudiant ne peut pas défendre
   à l'oral reste un texte à risque.

6. **Le seuil réel de Turnitin est 0.20.** En dessous de 20 %, Turnitin ne
   surface même pas le score. C'est la zone à viser : pas 0.00 (impossible),
   mais < 0.20 (invisible pour l'enseignant).

7. **Notre auto-évaluation couvre maintenant ~85 % du scoring réel.** Les formules
   30-33 (DARL, IDC, CDE, RDS) compensent les métriques de pipeline externe
   (retrieval, paraphrase_bypass, cross_model_agreement). Les ~15 % restants
   (logprobs réels, DetectGPT) nécessitent un accès API que le skill n'a pas.
   Le meilleur compensateur reste un texte ancré dans le réel.

---

## 11. Métriques de Bas Niveau : Architecture Tier 2 & Tier 3

> **Note d'architecture** : Les métriques Tier 1 (formules 1-34, stylométrie, N-grammes,
> POS-tagging) couvrent le filtrage de surface. Les métriques ci-dessous opèrent au niveau
> des **log-probabilités des modèles de fondation** et de l'**analyse topologique des
> graphes syntaxiques**. Elles sont documentées ici pour compréhension du pipeline de
> détection : elles ne peuvent pas être calculées directement par ce skill sans accès
> GPU/API, mais permettent de comprendre comment contourner les détecteurs avancés.
>
> *Seuils calibrés sur architecture de référence LLaMA-3-70B / GPT-3.5. En production,
> ajuster via classifieur (XGBoost ou MLP) entraîné sur corpus propre.*

---

### Formule 35 : Perplexité Réelle (Cross-Entropy Loss sur séquence)

**Concept :** La perplexité mesure le degré de "surprise" d'un LLM face à une séquence
de tokens. Un texte généré par une IA a une entropie croisée très faible par rapport au
modèle proxy (le texte suit exactement la distribution de probabilité apprise).

**Formule mathématique :**

Soit $X = (x_1, x_2, ..., x_N)$ une séquence de tokens et $p_\theta$ la probabilité
assignée par le modèle de langage.

$$CE(X) = -\frac{1}{N} \sum_{i=1}^{N} \log p_\theta(x_i \mid x_1, ..., x_{i-1})$$

$$PPL(X) = \exp(CE(X)) = \exp \left( -\frac{1}{N} \sum_{i=1}^{N} \log p_\theta(x_i \mid x_{<i}) \right)$$

**Seuils de détection** (Proxy Model : LLaMA-3-8B ou GPT-2 XL) :

| Valeur | Interprétation |
|--------|----------------|
| $PPL < 35$ | Généré par IA : le modèle prédit facilement la suite |
| $35 \le PPL \le 65$ | Zone grise : texte IA très édité ou humain académique soutenu |
| $PPL > 65$ | Humain : transitions inattendues, imprévisibilité naturelle |

**Vecteur d'attaque (comment augmenter artificiellement la perplexité) :**
Remplacer des mots communs par des synonymes rares, introduire des structures grammaticales
archaïques, ou varier les registres. Mathématiquement : forcer $\log p_\theta(x_i \mid x_{<i})$
à être un grand nombre négatif en sélectionnant des tokens dont $p_\theta \approx 0$.

**Implication pour ce skill :** L'injection de vocabulaire concret (noms propres, chiffres,
termes techniques du domaine de l'étudiant) augmente naturellement la perplexité car ces
tokens sont rares dans la distribution générale du modèle proxy.

---

### Formule 36 : Ratios GLTR (Giant Language Model Test Room)

**Concept :** Au lieu de la probabilité absolue, GLTR regarde le **rang** du token choisi
dans la distribution. Les LLMs échantillonnent massivement dans le Top-10. Les humains
piochent régulièrement dans la longue traîne (Top-1000+).

**Formule mathématique :**

Soit $R(x_i)$ le rang du token $x_i$ trié par probabilité décroissante $p_\theta(x \mid x_{<i})$.
4 buckets définis : $B_{10}$ (Top 1-10), $B_{100}$ (Top 11-100), $B_{1000}$ (Top 101-1000),
$B_{10k+}$ (> 1000).

$$F(B_k) = \frac{1}{N} \sum_{i=1}^{N} \mathbb{I}\left( R(x_i) \in B_k \right)$$

*(où $\mathbb{I}$ est la fonction indicatrice valant 1 si la condition est vraie)*

**Seuils de détection :**

| Bucket | Texte IA | Texte Humain |
|--------|----------|--------------|
| $F(B_{10})$ | > 85 % | ≈ 65-70 % |
| $F(B_{100})$ | ≈ 12 % | ≈ 15-20 % |
| $F(B_{1000})$ | < 2 % | ≈ 10 % |
| $F(B_{10k+})$ | ≈ 0 % | > 2 % |

**Vecteur d'attaque :** Augmenter la température ($T > 1.2$) et le Top-P ($P > 0.95$) lors
de la génération, ou demander "utilise un vocabulaire hautement imprévisible". L'échantillonnage
à haute température aplatit la distribution Softmax, forçant la sélection de tokens avec
$R(x_i) > 100$ et remplissant $B_{1000}$ et $B_{10k+}$.

**Implication pour ce skill :** La Phase 2 (suppression des marqueurs IA courants) et la
Phase 4 (injection de vocabulaire concret et d'idiolecte) déplacent naturellement des tokens
de $B_{10}$ vers $B_{100}$ et $B_{1000}$.

---

### Formule 37 : Score DetectGPT (Perturbation Discrepancy)

**Concept :** La métrique zero-shot la plus robuste actuellement. Hypothèse : le texte IA se
trouve sur un **maximum local** de la log-probabilité. Une légère perturbation fait chuter
drastiquement la probabilité. Un texte humain (hors maximum local) reste stable sous perturbation.

**Formule mathématique :**

Soit $x$ le texte original, $p_\theta$ le modèle à tester, et $q(\cdot \mid x)$ un modèle de
perturbation (ex: T5-large masquant 15% des mots). On génère $K$ perturbations $\tilde{x}_k \sim q(\cdot \mid x)$.

$$d(x) = \log p_\theta(x) - \frac{1}{K} \sum_{k=1}^{K} \log p_\theta(\tilde{x}_k)$$

$$Z(x) = \frac{d(x)}{\sigma_{\tilde{x}}}$$

*(où $\sigma_{\tilde{x}}$ est l'écart-type des log-probabilités des textes perturbés)*

**Seuils de détection :**

| Valeur | Interprétation |
|--------|----------------|
| $Z(x) > 1.5$ | Texte IA : chute de probabilité statistiquement très significative |
| $Z(x) \approx 0$ ou $Z(x) < 0$ | Texte humain : la perturbation ne dégrade pas ou améliore la probabilité |

**Vecteur d'attaque : Paraphrasing Attack :** Générer avec GPT-4, puis paraphraser avec un
modèle radicalement différent (BART, Quillbot) ou modifier manuellement 20% des phrases.
Cela déplace $x$ hors du maximum local : $\log p_\theta(x)$ baisse, les perturbations
$\tilde{x}_k$ ne provoquent plus de chute drastique, $d(x) \to 0$.

**Coût computationnel :** O(K × N × V) : très élevé ($K = 100$ perturbations recommandées).
À ne déclencher qu'en Tier 3 si les scores Tier 1 & 2 sont en zone d'incertitude (40-60%).

---

### Formule 38 : Variance de la Profondeur de l'Arbre Syntaxique ($\sigma^2_D$)

**Concept :** Les LLMs génèrent des arbres de dépendance syntaxique réguliers et équilibrés
(profondeurs homogènes). Les humains écrivent de façon chaotique : une phrase courte
(profondeur 2) suivie d'une phrase très complexe (profondeur 9+). Cette hétérogénéité est
un marqueur fort de l'écriture naturelle.

**Outil requis :** parseur de dépendances (spaCy `fr_dep_news_trf` pour le français,
ou Stanford CoreNLP).

**Formule mathématique :**

Soit un document de $S$ phrases. Pour chaque phrase $j$, $D(T_j)$ = profondeur maximale
de l'arbre de dépendance (chemin le plus long racine → feuille).

$$\mu_D = \frac{1}{S} \sum_{j=1}^{S} D(T_j)$$

$$\sigma^2_D = \frac{1}{S} \sum_{j=1}^{S} \left( D(T_j) - \mu_D \right)^2$$

*(On peut également calculer la variance du Branching Factor : nombre d'enfants par nœud)*

**Seuils de détection :**

| Valeur | Interprétation | Exemple de profondeurs |
|--------|----------------|------------------------|
| $\sigma^2_D < 2.5$ | Texte IA : complexité structurelle homogène | [5, 6, 5, 5, 7, 6] |
| $\sigma^2_D > 4.5$ | Texte humain : forte hétérogénéité | [2, 8, 4, 11, 3] |

**Vecteur d'attaque : Burstiness Prompting structurel :** Demander explicitement d'alterner
phrases courtes (1-4 mots) et phrases très longues et complexes (multiples subordonnées et
incises). Cela force les $D(T_j)$ à s'éloigner de $\mu_D$ : les écarts au carré
$(D(T_j) - \mu_D)^2$ augmentent, faisant exploser $\sigma^2_D$.

**Implication pour ce skill (Tier 1 accessible) :** La variance de la longueur de phrase
(Phase 3, signal déjà présent dans le diagnostic) est une approximation de $\sigma^2_D$
sans parseur. En Tier 1, la variance des longueurs de phrases suffit pour l'estimation.

---

### Architecture Pipeline Recommandée

Pour intégrer ces 4 métriques avec les 34 formules existantes :

```
TIER 1 : O(1) / O(N) : Instantané
  ├── Formules 1-34 (métriques de surface)
  └── Formule 38 approx. : variance de longueur de phrase (proxy de σ²_D)

TIER 2 : O(N × V) : Nécessite un Forward Pass sur modèle proxy
  ├── Formule 35 : Perplexité (PPL) via LLaMA-3-8B quantifié ou GPT-2 XL
  └── Formule 36 : Ratios GLTR : rang des tokens dans la distribution

TIER 3 : O(K × N × V) : Très coûteux
  └── Formule 37 : DetectGPT
      → Ne déclencher que si score de probabilité IA Tier 1+2 entre 40% et 60%
      → K = 100 perturbations, modèle T5-large recommandé
```

**Seuil de déclenchement Tier 3 :** uniquement si Tier 1 ET Tier 2 sont en zone grise.
Un texte qui passe clairement Tier 1 (score < 3) ne nécessite pas DetectGPT.

**Conclusion pratique pour ce skill :** Sans accès GPU, les Tiers 2 & 3 sont inaccessibles
directement. La stratégie reste : maximiser les métriques Tier 1 (formules 1-34) +
appliquer les vecteurs d'attaque documentés (diversification lexicale, burstiness
structurel, paraphrase cross-modèle) pour que le texte soit défavorable aux Tiers 2 & 3
même sans les calculer.
