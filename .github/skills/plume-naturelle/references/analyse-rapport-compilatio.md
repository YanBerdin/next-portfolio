# Analyse de rapport Compilatio - Guide d'interprétation et d'action

> **Quand charger ce fichier :** lorsque l'utilisateur partage un rapport
> Compilatio (capture d'écran, copier-coller, ou lien), ou mentionne un
> score de détection IA Compilatio qu'il souhaite comprendre ou réduire.

---

## 1. Structure d'un rapport Compilatio Studium

Un rapport Compilatio contient trois sections distinctes. Chacune mesure
un aspect différent du texte.

### Section 1/3 : Synthèse

La synthèse affiche trois indicateurs :

| Indicateur | Ce qu'il mesure | Seuil critique |
|---|---|---|
| **Similitudes** | Passages retrouvés dans des sources existantes (web, mémoires, articles) | > 15 % sans citations = problème |
| **Détection IA** | Formulations stylistiquement proches d'un texte généré par IA | > 30 % = alerte, > 50 % = signal fort |
| **Textes entre guillemets** | Passages entre guillemets, révélateurs de citations | Informatif uniquement |

**Le score affiché en gros (ex. 70 %) est le taux de textes suspects.**
Il combine similitudes + détection IA. Si les similitudes sont à 0 %,
le score global correspond au taux de détection IA seul.

### Section 2/3 : Sources des similitudes

Liste les URLs, documents ou bases de données où Compilatio a trouvé
des correspondances. Si cette section est vide ou à 0 %, le texte n'est
pas du plagiat classique : c'est la détection IA qui pose problème.

### Section 3/3 : Points d'interet

Affiche le texte intégral avec les passages suspects surlignés en bleu.
Chaque zone surlignée est numérotée (1, 2, 3...) et correspond à un
bloc identifié comme potentiellement généré par IA.

---

## 2. Comment Compilatio détecte le texte IA

Compilatio v4.5.3+ utilise un pipeline multi-modèles (Claude Opus 4.6,
GPT-5.4, Gemini 3.1 Pro). Le texte est découpé en segments de 150 à
300 tokens analysés indépendamment.

Les signaux exploités par Compilatio :

| Signal | Poids | Ce que le détecteur cherche |
|---|---|---|
| Perplexité basse | Fort | Tokens trop prévisibles, choix lexicaux "évidents" |
| Burstiness faible | Fort | Phrases de longueur trop régulière (toutes 15-20 mots) |
| Marqueurs lexicaux | Moyen | "Il convient de", triades, connecteurs mécaniques |
| Cohérence locale/globale | Moyen | Cohérence phrase à phrase forte + progression globale faible |
| Absence d'idiolecte | Faible | Aucune marque personnelle, registre trop uniforme |

**Référence technique complète :** `prompts-detecteurs.md` (pipeline 7 étapes, formules, seuils).

---

## 3. Grille de lecture du score IA

| Score Compilatio | Interprétation | Risque académique | Action recommandée |
|---|---|---|---|
| 0-15 % | Texte naturel ou très bien retravaillé | Aucun | Aucune |
| 16-30 % | Quelques passages lisses, probablement retouchés | Faible | Retouches ciblées sur les passages surlignés |
| 31-50 % | Texte partiellement généré ou très assisté | Modéré | Réécriture des blocs détectés avec ancrage personnel |
| 51-70 % | Texte majoritairement généré, peu retravaillé | Elevé | Réécriture profonde avec injection de voix et de vécu |
| 71-100 % | Texte presque intégralement généré par IA | Très élevé | Réécriture complète, retour au brouillon |

---

## 4. Analyser les passages surlignés

Quand l'utilisateur partage la section 3/3 (texte surligné), identifier
pour chaque bloc numéroté le pattern IA dominant :

### Grille de diagnostic par bloc

Pour chaque passage surligné :

1. **Identifier le pattern principal** parmi les 48 patterns du skill
   (Phases 1-6)
2. **Estimer pourquoi Compilatio l'a flagué** : perplexité basse ?
   structure en sablier ? connecteurs mécaniques ?
3. **Proposer une reformulation** en appliquant le pattern correctif

Format de sortie :

```
ANALYSE RAPPORT COMPILATIO
══════════════════════════
Score global : [X] %
Similitudes : [X] % | Détection IA : [X] % | Citations : [X] %

DIAGNOSTIC PAR BLOC
───────────────────
Bloc 1 (lignes ~X-Y) :
  Pattern détecté : [nom du pattern]
  Signal probable : [perplexité / burstiness / marqueur / cohérence]
  Correction : [action concrète]

Bloc 2 (lignes ~X-Y) :
  ...

SYNTHÈSE
────────
Patterns dominants : [top 3]
Zones les plus critiques : [blocs à traiter en priorité]
Score visé après correction : [estimation]
```

---

## 5. Stratégie de correction par niveau de score

### Score 16-30 % : retouches ciblées

Les passages surlignés sont souvent des introductions de section ou des
transitions. Corriger en priorité :
- Remplacer les connecteurs mécaniques par des liaisons naturelles
- Varier la longueur des phrases dans les blocs détectés
- Ajouter un détail concret (chiffre, nom, date) par bloc

### Score 31-50 % : réécriture partielle

Les blocs détectés forment des paragraphes entiers. Il faut :
- Appliquer le questionnaire d'ancrage (Etape 0.5 du skill) pour
  chaque thème abordé dans les blocs détectés
- Casser la structure en sablier si présente
- Injecter du vécu : un exemple réel, une difficulté rencontrée,
  un choix assumé

### Score 51-70 % : réécriture profonde

La majorité du texte est flaguée. Le problème n'est plus local mais
structurel :
- Reprendre le plan : la structure elle-même trahit l'IA
- Repartir des idées (pas du texte) et rédiger avec la voix de
  l'utilisateur
- Exiger les 5 questions d'ancrage (Q1-Q5) avant toute réécriture
- Viser DARL > 4.5 et DS > 0.5 sur chaque paragraphe

### Score 71-100 % : réécriture complète

Le texte entier est détecté. Il ne sert plus de base :
- Extraire uniquement les idées et arguments du texte original
- Faire rédiger l'utilisateur en mode brouillon (mots-clés, phrases
  courtes, idées en vrac)
- Reconstruire à partir de ce brouillon humain
- Appliquer le pipeline complet (Etapes 0 à 7) sur chaque section

---

## 6. Passages non surlignés : ce qu'ils révèlent

Les zones non surlignées dans la section 3/3 sont les passages que
Compilatio considère comme humains. Les analyser permet de comprendre
ce qui fonctionne déjà :

| Zone non surlignée | Ce qu'elle a de "humain" |
|---|---|
| Passage avec un exemple vécu | Ancrage dans le réel, détails spécifiques |
| Phrase avec hésitation ou nuance | Coût cognitif visible |
| Paragraphe au rythme varié | Burstiness élevée |
| Section avec vocabulaire technique précis | Expertise réelle, pas du remplissage |

**Stratégie :** reproduire les caractéristiques des zones non surlignées
dans les zones surlignées.

---

## 7. Limites de la détection Compilatio

Informer l'utilisateur de ces nuances :

- **Compilatio indique lui-même** que le taux est "un indicateur et non
  une preuve". Le rapport invite à "vérifier auprès de l'auteur sa
  maîtrise des connaissances mentionnées".
- **Faux positifs possibles :** un style académique très normé (droit,
  médecine) peut déclencher de faux positifs car le registre est proche
  de celui d'un LLM.
- **Faux négatifs possibles :** un texte IA bien humanisé peut passer
  sous le radar.
- **Le score varie selon la longueur :** les textes courts (< 300 mots)
  sont moins fiables car les modèles manquent de contexte.
- **Les citations et passages entre guillemets** sont normalement exclus
  du calcul. Si un texte contient beaucoup de citations, le score réel
  sur le texte original est plus élevé que le score affiché.

---

## 8. Ce qu'il ne faut pas faire

| Mauvaise stratégie | Pourquoi ça ne marche pas |
|---|---|
| Ajouter des fautes d'orthographe | Les détecteurs ne se basent pas sur la grammaire |
| Remplacer des mots par des synonymes | La perplexité token par token reste basse |
| Traduire depuis une autre langue | La structure phrastique garde les patterns IA |
| Insérer des espaces/caractères invisibles | Compilatio normalise le texte avant analyse |
| Paraphraser phrase par phrase | La cohérence globale et la burstiness ne changent pas |

**Ce qui marche :** injecter du vécu, varier le rythme, casser la
structure, ajouter des détails concrets, montrer le coût cognitif.
C'est exactement ce que fait le skill Plume Naturelle dans ses 8 phases.

---

## 9. Exemple d'analyse : projet de recherche à 70 %

**Contexte :** un texte de 546 mots, 0 % similitudes, 70 % détection IA,
< 1 % citations.

**Lecture du rapport :**
- Le texte n'est pas plagié (0 % similitudes) : l'étudiant n'a pas copié
- La quasi-totalité est flaguée IA : 3 blocs sur 3 sont surlignés
- Les très rares zones non surlignées (ex. "Si cette question me
  passionne, c'est aussi parce qu'elle constitue un angle mort de la
  littérature académique") contiennent une prise de position personnelle

**Patterns détectés dans les blocs surlignés :**
- Connecteurs mécaniques : "En parallèle", "Pour tenter d'améliorer",
  "Pour mener à bien"
- Structure en sablier : constat → problématique → méthodologie → motivation
  (plan type ChatGPT)
- Analyses superficielles en -ant : absentes ici, mais rythme trop régulier
- Registre uniformément soutenu sans variation de ton
- Aucun détail inattendu : pas de chiffre précis, pas de nom de logiciel
  spécifique au-delà de Sage, pas d'anecdote située dans le temps

**Zones de force (non surlignées) :**
- La mention de "Sage Génération Experts" (détail concret)
- L'angle mort de la littérature académique (prise de position)
- Les entretiens qualitatifs avec les collaborateurs (spécificité
  méthodologique)

**Plan de correction :**
1. Reprendre le questionnaire d'ancrage : dates précises de l'alternance,
   nom du cabinet (ou pseudonyme), nombre exact de dossiers traités,
   anecdote concrète d'une erreur corrigée par le script
2. Casser la structure en sablier : commencer par l'anecdote, pas par
   le titre académique
3. Varier le rythme : phrases courtes pour les constats, longues pour
   les explications
4. Injecter du coût cognitif : "J'ai hésité entre X et Y", "Au départ,
   je pensais que... mais en réalité..."
5. Score visé : < 30 %
