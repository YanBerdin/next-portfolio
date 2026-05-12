# Cadence structurelle - Patterns 49 à 55

> **Quand consulter ce fichier :** texte avec ancrage factuel correct
> (chiffres, dates, noms présents) mais score Compilatio > 30 %. Surtout
> sur les mémoires et rapports longs où les sections techniques, la
> conclusion et le résumé restent détectés alors que les passages
> narratifs avec "je" passent.

---

## Principe

Un texte peut avoir les bons ingrédients (ancrage, voix, détails) et
rester détecté parce que sa **cadence phrastique** trahit l'origine LLM.
Les modèles de détection (Compilatio v4.5.3+ en pipeline Claude Opus 4.6
+ GPT-5.4 + Gemini 3.1 Pro) repèrent des motifs structurels indépendants
du vocabulaire :

- l'architecture d'un paragraphe (thèse, développement, punchline)
- l'ordre d'exposition d'un processus (ordinaux systématiques)
- le scaffolding argumentatif ("D'abord / Ensuite / Enfin")
- les cadences rhétoriques apprises ("Pas X : Y", "Ce qui X, c'est Y")

Corriger ces patterns ne suffit pas sans ancrage réel, mais ajouter de
l'ancrage ne suffit pas non plus si la cadence reste trop régulière.

**Cas typique de déclenchement :** un mémoire de 10 000 mots qui
affiche 40-50 % de détection Compilatio alors que l'étudiant a bien
nommé les outils, daté les événements, utilisé "je" et raconté des
anecdotes. Le problème est dans les sections méthodologiques, les
introductions de paragraphes, les conclusions, et surtout le résumé.

---

## Pattern 49 - Énumération ordinale scaffolding

**Signal.** Plusieurs phrases successives commencent par "La première
est... La deuxième est... La troisième est..." ou "Premièrement...
Deuxièmement... Troisièmement...". Fréquent dans les descriptions de
pipeline, de méthodologie, d'architecture logicielle.

**Pourquoi flaggé.** L'IA structure par ordinaux parce que c'est le plus
propre pour exposer N éléments. Un rédacteur humain intègre l'étape 3
dans la même phrase que l'étape 2, regroupe, saute, digresse.

**Avant.**
> Le pipeline comporte sept étapes. La première est la validation du
> fichier. La deuxième est l'extraction du texte. La troisième est la
> détection de la banque. La quatrième est l'application du parseur.
> La cinquième est le nettoyage. La sixième est la vérification de
> cohérence. La septième est l'export.

**Après.**
> Le pipeline fait sept choses, mais les trois premières s'enchaînent
> presque en une : vérifier que le fichier est un PDF valide, en
> extraire le texte, repérer les mots-clés des premières pages pour
> reconnaître la banque. Ensuite seulement vient la vraie étape
> technique, le parsing, qui varie le plus d'une banque à l'autre. Le
> reste (nettoyage, contrôle de cohérence avec le solde, export Excel)
> est plus standardisé.

**Règle.**
- Fusionner au moins deux étapes dans une même phrase
- Hiérarchiser : "la vraie étape, c'est X ; le reste est routine"
- Accepter qu'une étape soit décrite plus longuement que les autres
- Si une énumération exhaustive reste nécessaire : liste à puces
  factuelle SANS phrases d'introduction "la première est..."

---

## Pattern 50 - Thèse-méta en tête de paragraphe

**Signal.** Paragraphe qui s'ouvre sur une phrase abstraite annonçant
ce que va dire le paragraphe avant de le dire.

Exemples typiques :
- "Les retours recueillis complètent les données sur deux dimensions
  que les mesures ne capturent pas."
- "Le point de départ de ce projet n'est pas une intuition."
- "Les premières étaient techniques. Les secondes étaient
  structurelles."
- "La phase actuelle est une phase pilote."
- "Face au diagnostic établi, notre première réponse a été..."

**Pourquoi flaggé.** L'IA, entraînée sur du texte académique, reproduit
la structure "topic sentence first". Un rédacteur humain en flux de
pensée commence plus souvent par le détail, la scène, l'observation.
La thèse émerge à travers le paragraphe ou reste implicite.

**Avant.**
> Les retours recueillis durant la phase pilote complètent les données
> chiffrées sur deux dimensions que les mesures de temps ne capturent
> pas : la perception de la qualité et la confiance dans l'outil.
>
> Un alternant a traité sept ou huit relevés...

**Après.**
> Un alternant a traité sept ou huit relevés sur différentes banques
> sans qu'on ait à l'accompagner. Une collaboratrice a pointé deux
> choses en passant : la rapidité, et "le fichier Excel est clair".
> Rien de mesuré, mais ça compte autant que les minutes économisées.
> La confiance dans l'outil se joue là.

**Règle.**
- Supprimer la phrase-annonce si elle résume ce qui suit
- Commencer par l'exemple, le détail, la scène
- Laisser la thèse émerger en milieu de paragraphe, ou rester implicite

---

## Pattern 51 - Aphorisme de clôture

**Signal.** Paragraphe ou section termine sur une phrase courte,
déclarative, universalisante, qui sonne comme une maxime.

Exemples typiques :
- "La validation humaine reste non négociable."
- "Le contexte est permanent, pas à réexpliquer à chaque échange."
- "Ce sont des postures professionnelles, pas des fonctionnalités à
  installer."
- "C'est un comptable qui sait parler à une machine."
- "Elle n'est pas optionnelle."
- "La révision reste humaine."

**Pourquoi flaggé.** L'IA est entraînée sur des articles et essais où
les paragraphes "concluent" proprement. Un rédacteur humain laisse plus
souvent un paragraphe se terminer sur un détail, une question, une
précision qui déborde, voire une phrase inachevée.

**Avant.**
> La saisie cède la place au contrôle. Le contrôle demande plus de
> compréhension métier, pas moins.

**Après.**
> La saisie cède la place au contrôle. Ce que "contrôle" veut dire en
> pratique, personne ne le sait vraiment avant d'avoir essayé : chez
> moi c'est croiser les montants avec les pièces, regarder si une
> opération suspecte n'a pas été mal découpée, vérifier le solde final.
> Sur trois ou quatre relevés mal partis, j'ai mis plus de temps à
> contrôler qu'à saisir manuellement. Ça s'est tassé, mais ça fait
> réfléchir.

**Règle.**
- Supprimer la phrase aphoristique finale
- La remplacer par un fait concret, une hésitation, une précision qui
  déborde
- Ou laisser le paragraphe se terminer sur une question ouverte
- Test : si la phrase finale peut servir d'épigraphe, la couper

---

## Pattern 52 - Définition binaire "X n'est pas A. C'est B."

**Signal.** Construction explicite "X n'est pas A. C'est B." ou variante
"Pas A : B", "Pas juste A, B".

Exemples typiques :
- "Le prompt engineering n'est pas une compétence de développeur.
  C'est une compétence de quelqu'un qui sait décrire un problème
  métier."
- "Pas juste d'outil : d'approche."
- "Ce n'est pas A remplacé par B, c'est une double validation."
- "X n'est pas la même compétence que Y."

**Pourquoi flaggé.** Pattern rhétorique LLM par excellence : la
négation-affirmation produit un effet pédagogique fort mais trahit une
voix trop propre. Un humain définit plus rarement par négation
explicite ; il affirme puis nuance, ou affirme directement.

**Avant.**
> Le prompt engineering n'est pas une compétence de développeur. C'est
> une compétence de quelqu'un qui sait décrire un problème métier avec
> précision.

**Après.**
> Le prompt engineering, c'est savoir décrire un problème métier avec
> précision. N'importe quel comptable qui a déjà expliqué à un
> stagiaire comment traiter un cas particulier sait faire ça. Il faut
> juste accepter de le faire à l'écrit, en plus détaillé.

**Règle.**
- Affirmer directement la définition positive
- Si la négation est nécessaire au sens, l'intégrer en fin de phrase,
  pas en architecture
- Éviter absolument le "Pas X : Y" en phrase courte isolée
- Max 1 définition binaire par page, et uniquement si l'opposition a
  une vraie fonction argumentative

---

## Pattern 53 - Scaffolding "D'abord / Ensuite / Enfin"

**Signal.** Paragraphe structuré explicitement avec "D'abord... Ensuite...
Enfin..." ou "Premièrement... Deuxièmement... Troisièmement..." pour
justifier un choix.

Exemple typique :
> Le choix de Python s'est imposé pour trois raisons concrètes. D'abord,
> la robustesse [...]. Ensuite, le déploiement [...]. Enfin, la
> maintenabilité [...].

**Pourquoi flaggé.** Variante argumentative de la triade (Pattern 10)
que l'IA utilise systématiquement pour structurer une justification. Un
humain justifie rarement par trois raisons parfaitement parallèles. Il
en met une ou deux en avant, mentionne la troisième en passant, ou les
intègre dans un récit.

**Avant.**
> Le choix de Python s'est imposé pour trois raisons concrètes. D'abord,
> la robustesse : contrairement à VBA, Python est indépendant de
> l'environnement bureautique. Ensuite, le déploiement : un script
> portable s'exécute sans installation. Enfin, la maintenabilité :
> ajouter un parseur demande de toucher un fichier texte.

**Après.**
> Python tenait la route là où VBA cassait : pas de dépendance à la
> version d'Excel installée, pas de macros à recharger à chaque nouveau
> classeur. Et pour ajouter une banque, on touche un fichier texte au
> lieu de bricoler un module VBA. La différence, en pratique, c'est
> cinq minutes au lieu d'une demi-journée.

**Règle.**
- Supprimer l'annonce "trois raisons concrètes"
- Fusionner deux raisons dans une phrase comparative
- Intégrer la troisième raison de façon organique dans la suite
- Assumer 2 ou 4 raisons plutôt que 3 si c'est plus juste

---

## Pattern 54 - Cleft obsessionnel "Ce qui X, c'est Y"

**Signal.** Répétition de constructions clivées "Ce qui X, c'est Y" ou
"C'est Z qui a fait W" dans un même passage.

Exemples typiques :
- "Ce qui m'a frappé dès les premières semaines, c'est le temps que
  ça prend."
- "Ce qui rend la situation différente, c'est l'ordre..."
- "C'est ce calcul qui a orienté le projet."
- "C'est là que j'ai changé d'approche."

**Pourquoi flaggé.** Le clivage est un outil de mise en emphase utilisé
par tous les francophones. Mais l'IA en abuse parce qu'il construit des
phrases percutantes sans effort. Deux ou trois clivages dans un même
passage = signal fort.

**Avant.**
> Ce qui m'a frappé dès les premières semaines, c'est le temps que ça
> prend. [...] C'est ce calcul qui a orienté le projet.

**Après.**
> Le temps. Voilà ce qui m'a sauté aux yeux dès les premières semaines.
> [...] Ce calcul, fait avec ma maître d'apprentissage, a fini par
> orienter tout le projet.

Ou, plus direct encore :
> Dès les premières semaines, j'ai été frappé par le temps que ça
> prend. [...] Ce calcul a orienté le projet.

**Règle.**
- Maximum 1 cleft "Ce qui X, c'est Y" par page
- Remplacer par ordre SVO direct : "Le temps m'a frappé"
- Ou par phrase nominale isolée qui donne de l'air

---

## Pattern 55 - Cascade d'autorités

**Signal.** Enchaînement de citations d'auteurs ou d'institutions
structuré comme "Autorité A affirme X. Autorité B confirme Y. Autorité
C ajoute Z."

Exemples typiques :
- "L'OMECA le pointait dès 2021. Deloitte confirme..."
- "McKinsey chiffre le potentiel. L'OEC, de son côté, observe..."
- "Auteur A et al. (2024) identifient. Auteur B (2024) observe..."

**Pourquoi flaggé.** L'IA empile les citations parce qu'elle a été
entraînée à "sourcer" abondamment. Trois autorités alignées produisent
un effet encyclopédique qu'un rédacteur humain évite. Il choisit celle
qui sert le mieux son argument et développe.

**Avant.**
> L'OMECA le pointait dès 2021 : les tâches de saisie sont les premières
> cibles de l'automatisation (OMECA, 2021). Deloitte confirme : quand
> l'IA générative arrive dans la fonction finance, elle commence par
> les tâches transactionnelles (Deloitte, 2024). La saisie bancaire
> coche toutes les cases.

**Après.**
> Le rapport OMECA de 2021 pointe une chose que tout le monde au cabinet
> sent sans le formaliser : la saisie et la collecte, c'est ce que
> l'automatisation attaque en premier. Cinq ans plus tard, c'est
> exactement ce qui se passe chez nous.

**Règle.**
- Une seule autorité par passage, bien exploitée
- Si deux autorités nécessaires : les mettre en dialogue (A dit X,
  mais B nuance) plutôt qu'en cascade confirmative
- Jamais trois citations d'affilée sauf revue de littérature dédiée
- Supprimer les phrases "X confirme" / "Y le formalise" qui trahissent
  le scaffolding

---

## Règles transverses cadence structurelle

### 1. Casser la régularité
Si un paragraphe présente une structure trop lisible (annonce,
développement, punchline), casser au moins un des trois éléments.

### 2. Accepter le déséquilibre
Un paragraphe peut être plus long qu'un autre. Une idée peut être plus
développée que la suivante. L'IA produit du parallélisme par défaut ;
le déséquilibre est un marqueur humain.

### 3. Intégrer plutôt qu'énumérer
Chaque fois qu'une structure "1. X, 2. Y, 3. Z" apparaît, se demander
si la prose continue ne ferait pas mieux. Dans 80 % des cas, oui.

### 4. Laisser déborder
Une phrase qui déborde, une parenthèse longue, une précision inutile
mais vivante : c'est ce qui trahit une rédaction humaine.

### 5. Test de suppression
Pour chaque phrase-annonce (Pattern 50) et chaque aphorisme
(Pattern 51), la supprimer et voir si le paragraphe tient. Dans 9 cas
sur 10, il tient mieux sans.

---

## Diagnostic ciblé cadence structurelle

Quand un mémoire dépasse 30 % de détection alors que les passages
narratifs avec "je" passent : scanner explicitement ces sept patterns.

| Pattern | Où chercher en priorité |
|---|---|
| 49 - Énumération ordinale | Pipeline, méthodologie, descriptions techniques |
| 50 - Thèse-méta | Ouvertures de paragraphes dans le corps argumentatif |
| 51 - Aphorisme clôture | Fins de section, transitions |
| 52 - Définition binaire | Parties théoriques, explications conceptuelles |
| 53 - Scaffolding | Justifications de choix méthodologique |
| 54 - Cleft obsessionnel | Introduction, passages réflexifs |
| 55 - Cascade autorités | Revue de littérature, partie 1 / état de l'art |

Si 4 patterns ou plus sont présents : la cadence structurelle est la
cause principale de la détection. Les corriger fera chuter le score
plus que tout autre pattern.
