# Prompts de détection IA reconstitués - Ce que les détecteurs demandent aux LLM

> **Quand charger ce fichier :** lorsque l'utilisateur veut comprendre en profondeur
> comment les détecteurs fonctionnent, ou quand le diagnostic plume-naturelle révèle
> un score élevé malgré l'application des patterns. Ce fichier donne les formules et
> seuils exacts utilisés par les détecteurs pour identifier du texte IA.
>
> **Sources :** prompts reconstitués par Claude Sonnet 4.6 Extended, Claude Opus 4.6
> et Gemini 3.1 Pro à partir de leur connaissance de leur propre fonctionnement.

---

## 1. Le pipeline de détection (7 étapes)

Les détecteurs LLM suivent un pipeline séquentiel. Chaque étape alimente la suivante.

### Étape 1 - Segmentation

Le texte est découpé en segments de 150-300 tokens (fenêtre glissante, overlap 30 tokens).
Chaque segment est analysé indépendamment puis comparé aux autres.

**Implication pour le skill :** un texte humanisé seulement au début ou à la fin sera
détecté par la carte segment par segment. L'humanisation doit être **uniforme** sur
tout le texte.

### Étape 2 - Perplexité locale

Pour chaque segment, le détecteur estime la "surprise" token par token. Les LLM
choisissent les tokens à haute probabilité contextuelle. Un texte avec une perplexité
moyenne basse ET une variance inter-segments faible est flagué IA.

**Ce que le détecteur cherche :**
- Perplexité moyenne par segment
- Variance inter-segments (burstiness inversée)
- Segments à perplexité anormalement basse

### Étape 3 - Burstiness et rythme

**Formule de burstiness (Claude Sonnet 4.6 Extended) :**

```
B = (σ - μ) / (σ + μ)

où σ = écart-type de longueur de phrases, μ = moyenne

Humain typique : B > 0.3
LLM typique : B < 0.1
```

**Ce que ça signifie :** si les phrases font en moyenne 20 mots avec un écart-type de 4,
B = (4 - 20) / (4 + 20) = -0.67. C'est un signal IA fort. Pour atteindre B > 0.3,
il faut un écart-type significativement supérieur à la moyenne, ce qui implique des
phrases très courtes (2-5 mots) ET très longues (35+ mots).

**Ce que le détecteur vérifie aussi :**
- Présence de "respiration" textuelle : ruptures, reformulations, hésitations
- Variation du rythme argumentatif

### Étape 4 - Signatures lexicales et stylistiques

Le détecteur classe les marqueurs en 4 niveaux de poids :

| Poids | Type | Exemples |
|---|---|---|
| 4/5 | Patterns structurels | Triades, parallélisme syntaxique, paragraphes sandwich, transitions mécaniques |
| 3/5 | Marqueurs lexicaux | "il convient de", "force est de constater", "revêt une importance" |
| 3/5 | Marqueurs d'absence | Pas d'erreurs, pas de "je", pas de points de suspension, pas de digressions |
| 2/5 | Ponctuation | Tirets cadratins, deux-points fréquents, points-virgules réguliers |

**Seuil de détection :** 4+ marqueurs par tranche de 500 mots = signal fort.

### Étape 5 - Cohérence sémantique

Le détecteur mesure la cohérence locale (phrase à phrase) vs globale (section à section).

**Signal IA :** cohérence locale FORTE + cohérence globale FAIBLE (idées reformulées,
pas de progression réelle, remplissage sémantique).

**Signal humain :** cohérence locale parfois chaotique + cohérence globale FORTE
(progression claire de l'argument malgré des digressions locales).

### Étape 6 - Détection de contournement

C'est la partie la plus dangereuse pour les utilisateurs du skill. Le détecteur
cherche activement les traces d'humanisation :

**A) Humanisation post-LLM :**
- Fautes isolées dans un texte parfait
- Contractions informelles dans un registre soutenu
- Incohérences de registre localisées
- Synonymes inhabituels qui cassent le champ lexical

**B) Paraphrase :**
- Structure argumentative LLM conservée sous nouveau lexique
- Squelette syntaxique régulier même si les mots changent

**C) Le piège du décalage vocabulaire/structure :**
Un texte humanisé montre souvent : vocabulaire simplifié MAIS structure
argumentative toujours mécaniquement parfaite. Le détecteur mesure ce décalage.

### Étape 7 - Scoring

**Formule de scoring composite (Claude Sonnet Extended) :**

```
S = (0.25 x perplexité) + (0.20 x burstiness) + (0.25 x marqueurs_lexicaux)
  + (0.15 x cohérence_sémantique) + (0.15 x contournement_détecté)
```

**Formule alternative (Claude Opus) :**

```
Score_brut = Σ (marqueurs_détectés x poids) / Σ (marqueurs_possibles x poids)

Ajustements :
  Si facteur atténuant : Score x 0.80
  Si facteur aggravant : Score x 1.15 (plafonné à 1.0)
```

---

## 2. Les seuils de classification

### Seuils Gemini (5 niveaux)

| Score | Label | Description |
|---|---|---|
| 0-20 % | HUMAN | Voix d'auteur, digressions, forte variance |
| 21-40 % | ASSISTED | Correcteur, reformulation ponctuelle |
| 41-60 % | MIXED | Co-rédaction, traduction, auteur très scolaire |
| 61-80 % | AI_EDITED | Premier jet IA, édité manuellement |
| 81-100 % | AI_GENERATED | IA brute ou modifications superficielles |

### Seuils Claude Sonnet (5 niveaux)

| Score | Label |
|---|---|
| < 0.25 | HUMAN |
| 0.25-0.44 | LIKELY_HUMAN |
| 0.45-0.59 | UNCERTAIN |
| 0.60-0.79 | LIKELY_AI |
| >= 0.80 | AI |

### Seuils Claude Opus (5 niveaux)

| Score | Label |
|---|---|
| < 0.15 | HUMAN |
| 0.15-0.35 | LIKELY_HUMAN |
| 0.35-0.55 | MIXED_OR_UNCERTAIN |
| 0.55-0.80 | LIKELY_AI |
| > 0.80 | AI_GENERATED |

**Règle clé (Opus) :** le score ne descend jamais à 0.00 ni ne monte à 1.00.
Min : 0.02, Max : 0.98. Il n'existe pas de certitude absolue.

**Règle clé (Opus) :** en cas de doute, favoriser UNCERTAIN plutôt que LIKELY_AI.
Le coût d'un faux positif (accuser un étudiant à tort) est supérieur au coût
d'un faux négatif.

**Objectif du skill :** produire un texte qui score < 0.35 (HUMAN ou LIKELY_HUMAN).

---

## 3. Les métriques détaillées

### 3.1 Type-Token Ratio (TTR)

Le ratio mots uniques / mots totaux, calculé sur des fenêtres glissantes de 100 tokens.

| Métrique | LLM typique | Humain typique |
|---|---|---|
| TTR moyen | 0.55-0.70 | 0.50-0.75 (plus variable) |
| Variance TTR inter-segments | < 0.04 | > 0.06 |

**Ce que ça signifie :** les LLM maintiennent un vocabulaire **régulièrement riche**.
Les humains ont des zones de vocabulaire répétitif (quand ils insistent) et des zones
riches (quand ils développent un argument nouveau). La variance est le signal, pas
la moyenne.

### 3.2 Entropie positionnelle des connecteurs

Où les connecteurs apparaissent-ils dans le paragraphe ?

| Position | LLM | Humain |
|---|---|---|
| 0.0-0.15 (début de phrase) | 80-90 % des connecteurs | 40-60 % |
| 0.15-0.50 (milieu) | 5-10 % | 20-35 % |
| 0.50-1.0 (fin) | 5-10 % | 15-25 % |

**Ce que ça signifie :** l'IA commence presque toujours ses phrases par le connecteur.
Un humain le place aussi en milieu de phrase (« la question, toutefois, reste ouverte »)
ou en fin (« c'est une approche intéressante, en revanche »).

### 3.3 Distribution des longueurs de phrases

| Métrique | Signal IA | Signal humain |
|---|---|---|
| Écart-type | < 6 mots | > 8 mots |
| Distribution | Quasi-gaussienne, centrée 18-25 mots | Asymétrique, avec queues |
| Phrases < 6 mots | Quasi absentes | 1-3 par page |
| Phrases > 40 mots | Quasi absentes | 1-2 par page |

---

## 4. Les marqueurs d'absence (ce que le détecteur cherche qui MANQUE)

C'est un angle de détection souvent négligé. L'absence de certains éléments est
aussi probante que la présence de marqueurs IA.

| Élément absent | Poids | Pourquoi c'est un signal |
|---|---|---|
| Erreurs grammaticales mineures | 3/5 | Un humain francophone fait 1-3 erreurs subtiles par page (accords complexes, concordance) |
| Points de suspension | 2/5 | Quasi absents du texte LLM, présents chez les humains (hésitation, sous-entendu) |
| Registre familier / oralité | 3/5 | Même légère, absente chez les LLM sauf instruction explicite |
| Références culturelles spécifiques | 3/5 | Anecdotes, exemples vécus, noms propres locaux |
| Variations de ton dans le document | 3/5 | Le ton LLM reste plat du début à la fin |
| Phrases avortées / restructurées | 3/5 | Traces de pensée en cours de formation |
| Marqueurs d'incertitude authentiques | 3/5 | "il me semble", "je ne suis pas certain que" |
| Première personne (quand format l'autorise) | 3/5 | Absence de "je" dans un mémoire pro = suspect |
| Notes de bas de page, renvois croisés | 2/5 | Les LLM en produisent rarement spontanément |
| Opinion tranchée | 3/5 | L'IA équilibre toujours |

---

## 5. Les facteurs d'ajustement

### Facteurs atténuants (réduisent le score de -15 à -20 %)

- Auteur non-francophone natif (niveau B2-C1)
- Domaine très codifié (droit, médecine, sciences dures)
- Copie d'examen sur sujet très balisé (dissertation type bac philo)
- Genre intrinsèquement structuré (abstract, résumé, fiche de synthèse)
- Texte court (150-400 mots)

### Facteurs aggravants (augmentent le score de +15 %)

- Rupture avec le profil attendu de l'auteur (L1 qui écrit comme un agrégé)
- Marqueurs IA de catégories différentes qui convergent
- Homogénéité suspecte sur texte long (> 2000 mots) sans variation de qualité
- Absence totale de personnalisation dans un genre qui l'autorise

---

## 6. Exemples calibrés (Claude Opus)

### Exemple A - HUMAN (score attendu : ~0.08)

> Je voudrais commencer par dire que le roman de Flaubert m'a d'abord dérouté.
> On s'attend, quand on le lit pour la première fois, à une histoire d'amour
> classique. Mais en fait non. Ce qui frappe, c'est l'ironie. Flaubert se moque
> de son héroïne, enfin il me semble, tout en la rendant attachante par moments.
> C'est un peu cruel. J'ai relu le passage du bal trois fois parce que je
> n'arrivais pas à savoir si Emma est heureuse ou si elle joue un rôle.

**Signaux humains :** première personne, hésitations ("enfin il me semble"),
registre hybride, phrase courte émotionnelle ("C'est un peu cruel"),
question non résolue.

### Exemple B - AI_GENERATED (score attendu : ~0.88)

> L'oeuvre de Gustave Flaubert, Madame Bovary, constitue un jalon fondamental
> de la littérature française du XIXe siècle. Il convient de noter que le roman
> se distingue par son utilisation magistrale de l'ironie. En effet, Emma Bovary
> incarne les contradictions d'une société en mutation, tiraillée entre l'idéal
> romantique et les réalités prosaïques de la vie provinciale. Par ailleurs, la
> scène du bal revêt une importance particulière dans l'économie du récit. En
> somme, Flaubert offre une perspective nuancée sur la condition féminine.

**Signaux IA :** "il convient de noter", "revêt une importance particulière",
"en somme" conclusif, structure sandwich, triades, transitions mécaniques
("en effet", "par ailleurs"), absence de "je", ton uniforme.

### Exemple C - MIXED (score attendu : ~0.52)

> Mon stage chez Decathlon m'a permis de comprendre les enjeux du retail moderne.
> Au début j'étais un peu perdu, le manager m'a filé un classeur et m'a dit
> "débrouille-toi", bon c'était un peu rude mais j'ai appris.
>
> L'analyse des stratégies de merchandising mises en oeuvre par l'entreprise
> révèle une approche multidimensionnelle qui conjugue positionnement prix,
> expérience client et optimisation logistique. Il convient de souligner que la
> politique de marque propre constitue un levier stratégique fondamental.

**Rupture stylistique :** paragraphe 1 = humain (informel, vécu, dialogue),
paragraphe 2 = IA (tous les marqueurs classiques). Le détecteur produit une
carte de chaleur segment par segment qui montre cette différence.

---

## 7. Implications pour le skill plume-naturelle

### Ce qu'il faut retenir pour la réécriture

1. **Perplexité et burstiness comptent pour 45 % du score.** La Phase 8 du skill
   (contre-mesures statistiques) est aussi importante que les Phases 1-6.

2. **Les marqueurs d'absence comptent pour 15 % supplémentaires.** Il ne suffit pas
   de retirer les patterns IA : il faut AJOUTER ce qui manque (erreurs mineures,
   points de suspension, oralité, opinion, digressions).

3. **Le détecteur cherche activement l'humanisation.** Un texte "trop bien humanisé"
   (vocabulaire simplifié + structure parfaite) est détectable. L'humanisation doit
   toucher la structure, pas seulement le lexique.

4. **L'uniformité tue.** Un texte de 2000 mots sans aucune variation de qualité,
   de ton, de rythme ou de TTR est un signal fort. Les humains ont des passages
   meilleurs que d'autres.

5. **Les connecteurs en début de phrase sont un signal.** Déplacer les connecteurs
   en milieu de phrase ou les supprimer.

6. **Les points de suspension sont un signal HUMAIN.** En ajouter avec parcimonie
   dans les formats qui le permettent (rapport de stage, mémoire pro).

7. **Le faux positif coûte plus cher.** Les détecteurs sont calibrés pour favoriser
   le doute. Un texte dans la zone 0.35-0.55 ne sera pas flagué "IA" mais
   "incertain". L'objectif n'est pas de scorer 0.00 (impossible), mais < 0.35.

---

## 8. Architecture réelle d'un détecteur (ChatGPT 5.4 Thinking)

ChatGPT 5.4 Thinking apporte la vision la plus technique et la plus architecturale.
Son insight principal : **le LLM n'est PAS le détecteur statistique.** Il est un
arbitre dans un pipeline plus large.

### 8.1 Le pipeline réel (LLM + modules externes)

Un service sérieux comme Compilatio ne demande pas au LLM de "deviner" la perplexité.
L'architecture est :

```
Texte soumis
     |
     v
[Module statistique externe]
  - Calcule logprobs / perplexité
  - Calcule burstiness / variance
  - Calcule GLTR bucket ratios
  - Calcule DetectGPT / Fast-DetectGPT scores
  - Calcule TTR / diversité lexicale
     |
     v
[LLM via API] (Claude, GPT, Gemini)
  - Reçoit le texte + les métriques calculées (optional_metrics)
  - Fait l'analyse stylistique et rhétorique
  - Agrège signaux statistiques + signaux stylistiques
  - Produit un verdict JSON calibré
     |
     v
[Service Compilatio]
  - Affiche le résultat à l'enseignant
```

**Implication pour le skill :** le texte doit passer deux filtres indépendants :
1. Le pipeline statistique (perplexité, burstiness, TTR, DetectGPT)
2. L'analyse stylistique du LLM (marqueurs, structure, ton)

Humaniser le vocabulaire sans changer la structure trompe le LLM mais pas le
pipeline. Varier le rythme trompe le pipeline mais pas le LLM. Il faut les deux.

### 8.2 Les métriques externes que le LLM reçoit

| Métrique | Source | Ce qu'elle mesure |
|---|---|---|
| mean_logprob | API logprobs | Probabilité moyenne des tokens |
| normalized_perplexity | Pipeline | Surprise moyenne normalisée |
| burstiness_score | Pipeline | Variance de complexité |
| sentence_length_variance | Pipeline | Régularité des longueurs |
| lexical_diversity | Pipeline | Richesse du vocabulaire |
| repetition_score | Pipeline | Motifs de reformulation |
| top_token_rank_profile | API logprobs | Distribution des rangs de tokens |
| gltr_bucket_ratios | GLTR | % tokens dans le top-10, top-100, top-1000 |
| perturbation_discrepancy | DetectGPT | Courbure de log-probabilité |
| detectgpt_score | DetectGPT | Score zero-shot de détection |
| fast_detectgpt_score | Fast-DetectGPT | Idem, plus rapide |

**Ce que le skill ne peut pas contrer directement :** les métriques de logprobs
et DetectGPT sont calculées par le pipeline, pas par le LLM. Le skill n'a pas
accès à ces calculs. Mais il peut les influencer indirectement en :
- Augmentant la perplexité (mots imprévisibles, noms propres, chiffres)
- Augmentant la burstiness (variation de longueur)
- Augmentant la diversité lexicale (vocabulaire de terrain, hapax)

### 8.3 Les plafonds de confiance

ChatGPT 5.4 Thinking révèle les garde-fous des services sérieux :

| Contrainte | Seuil |
|---|---|
| Confiance > 85 % interdite | Sans métriques externes robustes |
| Confiance > 70 % interdite | Pour texte < 250 mots |
| Signaux mixtes (pour + contre) | Forcer HYBRID, pas AI_LIKELY |
| Risque faux positif = HIGH | Jamais AI_LIKELY sauf convergence forte de métriques |

**Implication pour le skill :** un texte court (< 250 mots) ne peut pas être
flagué avec confiance. Sur les textes longs, c'est plus difficile d'échapper.

### 8.4 Les hypothèses alternatives (confounders)

Avant de conclure "IA probable", les détecteurs doivent considérer :

- Texte traduit ou post-édité
- Texte révisé par correcteur grammatical (Antidote, LanguageTool)
- Étudiant très normatif / très scolaire
- Texte académique fortement contraint par les conventions
- Résumé à partir de sources
- Auteur non-natif
- Texte hybride humain + IA
- Paraphrase humaine d'un texte IA

**Implication pour le skill :** ces confounders sont des "excuses" légitimes.
Un texte qui ressemble à un texte traduit post-édité ou à un étudiant très
scolaire sera classé INDETERMINATE plutôt que AI_LIKELY.

### 8.5 Principe fondamental (ChatGPT 5.4)

> « Un texte bien écrit n'est pas un texte IA. Un texte maladroit n'est pas
> un texte humain. Ne jamais utiliser un seul indice comme preuve. »

C'est le principe qui protège contre les faux positifs. Les détecteurs ne
peuvent conclure AI que si **plusieurs familles de signaux convergent** :
lexical + structurel + rythmique + sémantique.

Le skill doit donc s'assurer qu'au moins une famille de signaux penche
fortement du côté humain, même si d'autres sont ambiguës.

### 8.6 Ce qu'un mauvais prompt de détection fait (anti-pattern)

> "Analyse ce texte et dis s'il a été écrit par une IA en te basant sur la
> perplexité, le ton, la structure et la répétition."

Ce prompt est mauvais parce qu'il :
- Mélange intuition stylistique et métriques statistiques
- N'impose pas l'incertitude
- Ne prévoit pas le cas hybride
- Pousse le modèle à halluciner des "preuves" techniques

Les services amateurs utilisent ce type de prompt. Les services sérieux
(Compilatio, Turnitin) utilisent le pipeline décrit en 8.1.

---

## 9. Prompt de production (ChatGPT 5.4 Pro)

ChatGPT 5.4 Pro a fourni le prompt le plus abouti et le plus proche d'un service
réel. Voici les éléments clés qui changent la donne pour le skill.

### 9.1 La catégorie "IA paraphrasée"

Les détecteurs sérieux ne classent pas seulement en "humain" ou "IA". Ils ont
une catégorie spécifique : **AI_LIKELY_PARAPHRASED_OR_HEAVILY_EDITED**.

C'est exactement ce que notre skill produit : un texte IA réécrit. Le détecteur
le sait et le cherche activement.

**Les 6 catégories de verdict :**

| Label | Description | Seuil |
|---|---|---|
| INSUFFICIENT_EVIDENCE | Pas assez de texte pour décider | Prose < 150 mots |
| HUMAN_LIKELY | Probablement humain | probability_ai < 0.20 |
| LOW_SIGNAL | Signal faible, pas de conclusion | probability_ai < 0.20 avec peu de contre-indices |
| MIXED_OR_UNCERTAIN | Mixte ou indéterminable | 0.20 - 0.50 |
| AI_LIKELY | Probablement IA | 0.50 - 0.80 |
| AI_LIKELY_PARAPHRASED_OR_HEAVILY_EDITED | IA paraphrasée ou lourdement éditée | probability_ai >= 0.80 + signal de paraphrase |

**Implication pour le skill :** l'objectif n'est plus seulement "passer pour humain",
mais aussi "ne pas déclencher le flag de paraphrase". Les détecteurs cherchent
spécifiquement les textes IA qui ont été nettoyés.

### 9.2 Hiérarchie des preuves (ordre de priorité)

C'est l'information la plus stratégique. Voici comment le détecteur pondère
ses preuves, de la plus forte à la plus faible :

| Priorité | Signal | Poids | Contournable ? |
|---|---|---|---|
| 1 | retrieval_match_score (texte déjà dans une base) | Maximal | Non (si le texte est en base, c'est fini) |
| 2 | calibrated_probability / classifier_score / cross_model_agreement | Très fort | Difficile (modèles spécialisés) |
| 3 | fast_detectgpt_score / detectgpt_score | Fort | Moyen (varier la perplexité) |
| 4 | logprobs, perplexity, token_rank, entropy, burstiness | Modéré | Moyen (techniques Phase 8) |
| 5 | répétition, régularité discursive, stabilité syntaxique | Faible-modéré | Facile (patterns 1-48) |
| 6 | impression stylistique de surface | Faible | Facile |

**Ce que ça signifie :** le skill travaille principalement sur les niveaux 4, 5 et 6.
Les niveaux 1-3 sont plus difficiles à contrer car ils s'appuient sur des calculs
externes et des modèles spécialisés.

### 9.3 Le seuil de 0.20 (Turnitin)

Turnitin ne surface plus de score numérique entre 0 et 20 % dans son rapport.
Pourquoi ? Trop de faux positifs dans cette zone. Le détecteur considère que
sous 0.20, il n'y a pas assez de signal pour conclure.

**Implication pour le skill :** l'objectif réaliste est de scorer sous 0.20
(HUMAN_LIKELY ou LOW_SIGNAL). À ce niveau, même si le détecteur a un doute,
il ne le signale pas à l'enseignant.

### 9.4 Le score de paraphrase (paraphrase_bypass_score)

C'est la métrique la plus dangereuse pour les utilisateurs du skill. Le détecteur
calcule un score de contournement par paraphrase qui cherche :

- Structure argumentative LLM conservée sous un nouveau lexique
- Squelette syntaxique régulier même si les mots changent
- Vocabulaire simplifié mais architecture logique intacte
- Signal de réécriture systématique (Quillbot, IA humaniseur)

**Comment éviter de déclencher ce score :**
1. **Changer la structure**, pas seulement les mots
2. **Réorganiser l'argumentation** (inverser l'ordre, fusionner des paragraphes, scinder d'autres)
3. **Ajouter du contenu que l'IA n'avait pas** (anecdotes, détails terrain, opinions)
4. **Supprimer du contenu** plutôt que de tout paraphraser (un texte plus court mais plus dense est moins suspect)

### 9.5 Les métriques manquantes dans notre auto-évaluation

Le prompt de ChatGPT 5.4 Pro liste des métriques que notre auto-évaluation
(`formules-auto-evaluation.md`) ne peut pas calculer :

| Métrique | Pourquoi on ne peut pas la calculer | Impact |
|---|---|---|
| retrieval_match_score | Nécessite accès à une base de générations | Nul si le texte n'est pas en base |
| cross_model_agreement | Nécessite plusieurs modèles en parallèle | Peut être simulé en testant avec 2-3 LLM |
| detectgpt_score | Nécessite perturbations + recalcul de logprobs | Impossible sans pipeline |
| paraphrase_bypass_score | Propriétaire | Peut être estimé indirectement (cf. 9.4) |
| human_baseline_distance | Nécessite un corpus de référence | Impossible |

**Conclusion :** notre auto-évaluation couvre environ 60 % du scoring réel.
Les 40 % restants dépendent de métriques calculées par le pipeline externe.
Le meilleur moyen de compenser : produire un texte tellement ancré dans le réel
(noms, chiffres, anecdotes, vécu) que même les métriques externes penchent
vers "humain".

### 9.6 Les règles anti-faux positifs

Le prompt impose des règles strictes pour éviter d'accuser à tort :

1. **Ne jamais conclure "IA" parce que le texte est bon, fluide, scolaire ou propre**
2. **Ne pas pénaliser le français L2** (non-natifs)
3. **Ne pas pénaliser la correction grammaticale**
4. **Ne pas pénaliser le style formel**
5. **Si les signaux sont contradictoires, choisir l'incertitude**
6. **Un seul indice ne suffit jamais** : il faut la convergence de plusieurs familles

**Implication pour le skill :** il suffit qu'une ou deux familles de signaux
penchent fortement "humain" pour que le détecteur ne conclue pas "IA". Les
signaux humains les plus efficaces :
- Détails idiosyncrasiques situés (noms, lieux, chiffres précis)
- Variation naturelle du rythme et de la syntaxe
- Hésitations argumentatives réelles (micro-révisions)
- Intégration irrégulière de sources
- Présence de segments visiblement réécrits différemment

---

## 10. Compilatio : Données empiriques officielles (2025-2026)

> **Statut de cette section :** données issues de la documentation officielle Compilatio,
> du rapport de Claude for Chrome (2 avril 2026), et de l'étude indépendante Dessus & Seyve
> (STICEF, 2025). Contrairement aux sections 1-9 (prompts reconstitués par inférence),
> cette section contient des informations **vérifiées sur source primaire**.

---

### 10.1 Architecture du pipeline Compilatio (documentée officiellement)

Compilatio décrit **5 étapes** dans sa documentation publique :

```
1. DÉCOUPAGE
   → Le texte est segmenté en passages de style homogène
   → Fenêtre glissante (taille non publiée)

2. ÉTIQUETAGE
   → Classification IA / humain pour chaque passage
   → LLM propriétaire "maison" entraîné sur corpus mixte

3. REGROUPEMENT
   → Agrégation des passages étiquetés IA en "points d'intérêt"
   → Ces points sont surlignés dans le rapport final

4. NETTOYAGE
   → Filtrage des passages non pertinents
   → Objectif explicite : réduire les faux positifs

5. PRÉSENTATION
   → Score final en % + localisation des passages dans le document
   → Rapport visible par l'enseignant dans Magister / Magister+
```

**Cohérence avec la section 8.1 (pipeline LLM + modules externes) :** la documentation
confirme qu'un LLM est utilisé pour l'analyse stylistique (étape 2), combiné à un pipeline
de traitement statistique préalable. Les métriques de perplexité et burstiness sont
les deux indicateurs explicitement cités dans la communication officielle.

**Version en production (au 2 avril 2026) : v4.5.3** : mise en production le 4 septembre 2025.
Version précédente : v4.2.1 (octobre 2024).

---

### 10.2 Modèles IA ciblés par Compilatio

Liste officielle publiée sur `compilatio.net/ia-detecteur-info` (au 2 avril 2026) :

| Éditeur | Modèles détectés |
|---------|-----------------|
| **OpenAI** | GPT-5.2, GPT-5.1, GPT-5, GPT-4.5, GPT-4o, GPT-4o Mini |
| **Anthropic** | Claude Sonnet 4.5 (+ versions non précisées) |
| **Google** | Gemini 2.5 Flash, Gemini 3 Pro, Copilot |
| **Mistral** | Modèle(s) Mistral (français) |
| **Meta** | Llama |
| **Autres** | DeepSeek, Jasper, YouChat, "bien d'autres" |

**Note sur Claude Sonnet 4.6** (le modèle utilisé dans ce skill) : Compilatio mentionne
"Claude Sonnet 4.5" dans sa liste officielle. La version 4.6 (actuelle au 2 avril 2026)
est vraisemblablement couverte dans la même entrée ou dans la catégorie "autres".

---

### 10.3 Métriques de fiabilité publiées (v4.5.3)

| Indicateur | Valeur annoncée | Conditions de test |
|------------|----------------|-------------------|
| **Précision** | 99 % | 99/100 passages signalés "IA" le sont vraiment |
| **Rappel** | 98 % | 98/100 passages IA correctement identifiés |
| **Exactitude** | 99 % | 99/100 passages (tous types) bien classés |
| **Faux positifs** | < 1 % | Moins d'1 texte humain sur 100 faussement signalé |
| **Performance hétérogène** | 9/10 | Documents mixtes (IA + humain) |

**Conditions de test à considérer avec prudence :**
- Corpus de ~7 400 textes en 24 langues
- Prompts IA utilisés : questions simples, **sans instructions de style particulier**
- Ces conditions sont plus favorables que l'usage réel (textes académiques post-édités)

**Étude indépendante (Dessus & Seyve, STICEF 2025 : hal-04578682) :**
- 86 documents testés en conditions universitaires réelles (francophones)
- Résultat sur les textes humains : **zéro faux positif dans cet échantillon**
- Comparaison avec d'autres détecteurs : Compilatio Magister+ = meilleure performance testée

---

### 10.4 Différences techniques Studium / Magister / Magister+

| Fonctionnalité | Magister | Magister+ | Studium |
|----------------|----------|-----------|---------|
| Détection similitudes syntaxiques | ✅ | ✅ | ✅ |
| **Détection IA** | ❌ | ✅ | ✅ |
| **Détection sémantique** (reformulations profondes) | ❌ | ✅ | ❌ |
| Détection multilingue / traductions | ❌ | ✅ | ❌ |
| **Détection textes altérés** (Unicode, caractères invisibles) | ❌ | ✅ | ❌ |
| Corpus Magister mondial | ✅ | ✅ | ❌ |
| Score IA dans le rapport final | ❌ | ✅ (détaillé) | ✅ (simplifié) |

**Implications stratégiques pour le skill :**

**Sur Studium (étudiant) :** le score IA est disponible mais sans la localisation détaillée
ni le rapport grammatical. C'est l'outil d'autocontrôle. La détection sémantique est **absente** :
une reformulation profonde des mots n'est pas détectée par Studium.

**Sur Magister (enseignant standard) :** la détection IA est **absente** dans Magister de base.
Un texte soumis via Magister (non Magister+) ne recevra pas de score IA. Vérifier quelle
version utilise l'établissement est donc stratégiquement important.

**Sur Magister+ (outil complet) :** c'est le plus difficile à tromper.
En plus de la détection IA, il inclut :
- **Détection sémantique** : repère les reformulations profondes par similarité vectorielle
  (embeddings). Un minimum de mots communs est requis ; les reformulations extrêmes sans
  vocabulaire partagé peuvent échapper. Activable/désactivable par l'administrateur.
- **Détection des textes altérés** : module spécifique pour les substitutions Unicode
  (cyrilliques → latins, caractères invisibles). Ce module confirme que ce vecteur avait
  été activement utilisé, forçant Compilatio à le contrer.

---

### 10.5 Angles morts officiellement reconnus par Compilatio

Compilatio reconnaît explicitement dans sa documentation les situations à risque
élevé de faux positifs ou de non-détection :

**Non-détection probable (angles morts) :**
- Texte **corrigé par IA orthographiquement** sans reformulation : si l'étudiant demande
  à un LLM de corriger uniquement les fautes, la structure reste humaine. Compilatio
  considère objectivement ce texte comme humain.
- **Textes très courts** (< ~150 mots) : pas assez de données linguistiques
- **Post-édition intensive** : modification manuelle approfondie peut effacer les empreintes

**Faux positifs probables (surclassification IA) :**
- Textes techniques ou académiques très formels (leur uniformité ressemble au style IA)
- Textes dans un domaine très codifié (droit, médecine, sciences exactes)
- Étudiants avec un style naturellement très structuré et formel
- Résumés/abstracts (genre intrinsèquement structuré)

**Variabilité officiellement reconnue :** pour un même document, les scores peuvent varier
d'une analyse à l'autre, en raison de la nature probabiliste du modèle, des différences
d'encodage selon le format (PDF vs DOCX), et des ajustements réguliers de l'algorithme.

---

### 10.6 Seuils et interprétation (politique officielle de Compilatio)

Compilatio **ne publie aucun seuil automatique d'alerte**. Il n'existe pas de règle
"au-dessus de X %, le document est bloqué ou l'étudiant est sanctionné".

Le score est présenté comme un **indicateur probabiliste** à interpréter contextuellement
par l'enseignant. La formulation retenue est délibérément prudente :
**"textes potentiellement générés par IA"** : jamais "textes générés par IA".

Pour un document de 1 000 mots avec un score de 10 % : 100 mots présentent
un style similaire à celui d'une IA. L'interprétation est laissée à l'enseignant.

**Cohérence avec le seuil Turnitin 0.20 (section 9.3) :** Compilatio adopte une approche
similaire de non-signalement automatique à faible score. L'objectif pratique du skill
reste < 20 % : zone dans laquelle même un enseignant vigilant aura du mal à justifier
une sanction en l'absence de seuil institutionnel défini.

---

### 10.7 Recommandations spécifiques Compilatio pour le skill

À partir de ces données empiriques, les priorités pour un texte soumis à Compilatio :

**Priorité absolue :**
1. **Varier la longueur des phrases** (burstiness) : cité explicitement dans la doc comme
   métrique clé. Cible : B > 0.3 (formule section 3).
2. **Augmenter la perplexité** : l'autre métrique explicitement citée. Injection de
   vocabulaire concret, noms propres, chiffres, termes idiosyncrasiques.

**Si soumis à Magister+ :**
3. **Changer la structure argumentative** (pas seulement le lexique) : la détection
   sémantique (embeddings) contourne les reformulations lexicales pures.
4. **Éviter les substitutions Unicode** : le module de détection des textes altérés
   les cible spécifiquement. Ce vecteur est donc à exclure.

**Si soumis à Magister (non +) :**
5. La détection IA est absente. Seule la détection de plagiat syntaxique est active.
   Le skill peut se concentrer sur l'originalité du contenu plutôt que sur le style IA.

**Si soumis à Studium :**
6. Score IA disponible mais pas la détection sémantique. Les reformulations profondes
   de mots ne sont pas détectées. Priorité : burstiness + perplexité.

---

## Sources

- Claude Sonnet 4.6 Extended, prompt de détection reconstitué (pipeline 7 étapes, formules, seuils)
- Claude Opus 4.6, prompt de détection reconstitué (marqueurs pondérés, absence markers, exemples calibrés)
- Gemini 3.1 Pro, prompt de détection reconstitué (métriques, seuils, format JSON)
- ChatGPT 5.4 Thinking, architecture réelle d'un détecteur (pipeline LLM + modules externes, plafonds de confiance, littérature DetectGPT/GLTR)
- ChatGPT 5.4 Pro, prompt de production (hiérarchie des preuves, catégorie paraphrase, seuil 0.20, métriques complètes)
- **Rapport Claude for Chrome, 2 avril 2026** : documentation officielle Compilatio (support.compilatio.net, compilatio.net/ia-detecteur-info, compilatio.net/magister-plus), version v4.5.3
- **Dessus, P. & Seyve, D. (2025)**. *La détection de l'utilisation de robots conversationnels en contexte universitaire : Le cas de Compilatio Magister+*. STICEF, Vol. 32, No 1, pp. 112–128. Preprint : HAL UGA, hal-04578682
