---
name: plume-naturelle
description: >
  Transforme un texte généré par IA en texte indiscernable d'une écriture humaine. Trigger dès
  que l'utilisateur mentionne : humaniser, rendre naturel, anti-détection, anti-IA, "ça sonne
  faux", "ça fait ChatGPT", "mon prof va voir que c'est de l'IA", réécrire, reformuler, "trop
  lisse", "trop parfait", "manque de personnalité", filtre anti-IA, désIA-iser, "rendre humain",
  plagiat IA, détecteur IA, Turnitin, Compilatio, GPTZero, "style trop propre", "on dirait un
  robot". Trigger aussi quand un texte soumis à relecture présente des patterns IA évidents.
  TOUJOURS utiliser ce skill pour toute demande de réécriture visant à rendre un texte plus
  naturel ou indétectable comme IA.
version: 1.2.0
---

# Plume Naturelle -Moteur de réécriture anti-IA pour le français

## Principe directeur

Un texte bien humanisé n'est pas simplement un texte dont on a retiré les patterns IA.
C'est un texte dans lequel on a **injecté une voix réelle**.

Retirer les patterns est nécessaire mais insuffisant. Le but final est qu'un professeur,
un recruteur ou un pair lise le texte et pense : « cette personne réfléchit et écrit. »

Deux textes peuvent être grammaticalement parfaits, factuellement corrects, et bien
structurés -l'un sonne comme une machine, l'autre comme un être humain. La différence
tient à des dizaines de micro-signaux : le rythme des phrases, le choix d'un mot concret
plutôt qu'un mot abstrait, une hésitation assumée, un exemple vécu, une parenthèse qui
trahit la pensée en cours. Ce skill traque systématiquement les signaux artificiels et
les remplace par ces micro-signaux humains.

**Règle cardinale** : ne jamais mentionner que le texte a été « humanisé », « réécrit
pour sembler humain », ou « nettoyé des patterns IA ». Le texte final ne doit contenir
aucune trace de ce processus. Il doit simplement *être* un bon texte.

---

## Étape 0 -Diagnostic rapide (OBLIGATOIRE)

Avant toute réécriture, scanner le texte et compter :

| Signal recherché | Seuil d'alerte |
|---|---|
| Tirets cadratins (— ou –) | > 0 dans tout le texte |
| « De plus » / « En outre » / « Par ailleurs » | > 1 par paragraphe |
| Triades (X, Y et Z) | > 2 par page |
| Superlatifs vides (crucial, fondamental, essentiel, majeur) | > 3 par page |
| Participes présents en -ant (permettant, assurant, favorisant) | > 3 par paragraphe |
| Variance de longueur de phrase (si toutes entre 15-20 mots) | Drapeau rouge |
| « Il convient de » / « Force est de constater » | > 0 |
| « Dans un monde en constante évolution » | > 0 (éliminatoire) |
| Listes à puces avec en-têtes en gras | > 1 par section |
| Absence totale de première personne (quand le format l'autorise) | Drapeau rouge |
| Vocabulaire IA récurrent (cf. liste Phase 2) | > 5 par page |
| Phrases d'ouverture formulaïques | > 0 |
| Raisonnement sur-explicite (chaque étape détaillée sans saut) | Drapeau rouge |
| Exemples génériques/hypothétiques (« Imaginons une entreprise X ») | > 0 |
| Registre uniformément soutenu sans variation | Drapeau rouge |
| Neutralité systématique / « le pour et le contre » sans trancher | Drapeau rouge |
| Structure en sablier (intro/plan annoncé/corps symétrique/conclusion récap) | Drapeau rouge |
| Fluff d'audience universelle (redéfinition de termes évidents) | > 0 |
| Absence de micro-révisions en ligne (enfin, plutôt, non en fait) | Drapeau rouge |
| Doublons paraphrastiques (même idée reformulée 2 fois) | > 1 par page |
| Texte trop correct sans idiolecte personnel | Drapeau rouge |
| Aucune trace de coût cognitif (arbitrage, hésitation, choix imparfait) | Drapeau rouge |
| Isotopie métaphorique persistante (même champ lexical sur > 2 paragraphes) | Drapeau rouge |
| Concessions préemptives intégrées (thèse + antithèse dans la même phrase) | > 1 par page |
| Ton constant sans montée en intensité | Drapeau rouge |
| Énumération ordinale "La première... La deuxième..." (scaffolding) | > 0 par § |
| Thèse-méta en tête de § (assertion abstraite en ouverture) | > 2 par page |
| Phrases aphoristiques finales de § (punchline courte) | > 3 par page |
| "Pas X : Y" / "X n'est pas A. C'est B." (définition binaire) | > 1 par page |
| Scaffolding "D'abord/Ensuite/Enfin" argumentatif | > 0 par page |
| Cleft obsessionnel "Ce qui X, c'est Y" | > 2 par page |
| Cascade d'autorités ("A affirme X. B confirme Y.") | > 0 |
| "Dit autrement" / "Autrement dit" / "En clair" (marqueur reformulation) | > 0 |
| Conclusion / Résumé / Abstract non retravaillés (zone rouge) | Drapeau rouge |

### Calcul du score

Additionner le nombre total d'occurrences détectées.

| Score | Niveau | Action |
|---|---|---|
| 0-3 | Léger | Retouches ciblées, le texte est déjà proche du naturel |
| 4-8 | Modéré | Réécriture partielle, plusieurs paragraphes à reprendre |
| 9+ | Réécriture profonde | Le texte doit être fondamentalement repensé |

**Toujours afficher le diagnostic à l'utilisateur avant de réécrire.**

Format du diagnostic :

```
DIAGNOSTIC PLUME NATURELLE
═══════════════════════════
Score : [X] → [Léger / Modéré / Réécriture profonde]

Détail :
  - Tirets cadratins : [n]
  - Connecteurs mécaniques (De plus, En outre...) : [n]
  - Triades : [n]
  - Superlatifs vides : [n]
  - Participes -ant superficiels : [n]
  - Variance de phrase : [OK / Faible]
  - Formules clichées : [liste]
  - Vocabulaire IA : [liste des mots détectés]
  - Biais de neutralité : [Oui / Non]
  - Structure en sablier : [Oui / Non]
  - Fluff d'audience universelle : [n phrases]
  - Micro-révisions en ligne : [Présentes / Absentes]
  - Doublons paraphrastiques : [n]
  - Idiolecte personnel : [Présent / Absent]
  - Coût cognitif visible : [Oui / Non]
  - Énumération ordinale (La 1ère/2ème/3ème) : [n]
  - Thèse-méta en tête de § : [n]
  - Aphorismes finaux : [n]
  - Définitions binaires (Pas X : Y) : [n]
  - Scaffolding D'abord/Ensuite/Enfin : [n]
  - Clefts "Ce qui X, c'est Y" : [n]
  - Cascades d'autorités : [n]
  - Marqueurs reformulation (Dit autrement...) : [n]
  - Zones rouges (Résumé / Abstract / Conclusion) : [retravaillées / brutes]

Patterns dominants : [les 3 principaux problèmes]
```

---

## Phase 1 -Patterns de contenu

### Pattern 1 : Inflation de l'importance

L'IA a tendance à gonfler l'importance de tout ce qu'elle décrit. Chaque événement
« marque un tournant », chaque innovation est « révolutionnaire », chaque tendance
« transforme en profondeur ».

**Avant :**
> La mise en place du prélèvement à la source a marqué un tournant décisif dans
> l'histoire de la fiscalité française, transformant en profondeur la relation entre
> le contribuable et l'administration fiscale.

**Après :**
> Le prélèvement à la source, entré en vigueur en janvier 2019, a changé la manière
> dont l'impôt est collecté : c'est l'employeur qui verse directement, et non plus le
> contribuable qui paie avec un an de décalage. En pratique, ça a surtout simplifié les
> choses pour les salariés -mais compliqué la vie des gestionnaires de paie.

**Règle** : énoncer le fait simplement. Si c'est vraiment important, le lecteur le verra
sans qu'on le lui dise.

### Pattern 2 : Mise en valeur excessive de la notabilité

L'IA liste des sources, des auteurs ou des institutions pour donner une impression de
sérieux, mais sans les contextualiser ni les relier à l'argument.

**Avant :**
> De nombreux auteurs, parmi lesquels Porter (1985), Mintzberg (1994) et Drucker (2001),
> ont souligné l'importance de la stratégie dans la compétitivité des entreprises.

**Après :**
> Porter a posé le cadre avec la chaîne de valeur en 1985 ; trente ans plus tard, le
> modèle tient encore, mais il suppose une entreprise intégrée -ce qui ne correspond
> plus au fonctionnement de beaucoup de PME qui externalisent presque tout.

**Règle** : ne citer que ce qui sert l'argument. Une référence bien exploitée vaut mieux
que trois noms lâchés en passant.

### Pattern 3 : Analyses superficielles en -ant

Le participe présent est le refuge favori de l'IA quand elle veut donner l'illusion de
la profondeur sans rien expliquer. « Permettant de... assurant... favorisant... » -ces
constructions n'expliquent jamais *comment*.

**Avant :**
> L'automatisation des processus comptables permet d'améliorer la productivité,
> favorisant une meilleure allocation des ressources et assurant une fiabilité accrue
> des données financières.

**Après :**
> Quand le rapprochement bancaire se fait automatiquement, le collaborateur qui y passait
> deux heures par client peut consacrer ce temps à l'analyse. Le risque d'erreur de
> saisie disparaît -et avec lui, les heures perdues à chercher d'où vient l'écart de
> 12 centimes en fin de mois.

**Règle** : remplacer chaque -ant par un mécanisme concret. Si on ne peut pas expliquer
le *comment*, c'est que la phrase ne dit rien.

### Pattern 4 : Langage promotionnel

L'IA écrit comme une plaquette commerciale. Tout est « au coeur de », le patrimoine est
toujours « riche », la dynamique est « positive », l'approche est « innovante ».

**Avant :**
> Au coeur de la stratégie de transformation, le cabinet mise sur une approche innovante
> et dynamique, tirant parti de son riche patrimoine d'expertise pour accompagner ses
> clients dans leur parcours de modernisation.

**Après :**
> Le cabinet a choisi de commencer par la dématérialisation des factures fournisseurs,
> parce que c'est là que le volume est le plus important et que le retour sur
> investissement est le plus rapide.

**Règle** : remplacer les adjectifs promotionnels par des faits. Si le cabinet est
vraiment innovant, montrer ce qu'il fait -pas le dire.

### Pattern 5 : Attributions vagues

« Les experts s'accordent à dire... », « Selon plusieurs études... », « Il est largement
reconnu que... » -quand l'IA ne sait pas citer une source précise, elle invente une
autorité floue.

**Avant :**
> Selon plusieurs études récentes, la digitalisation des cabinets comptables est un
> facteur clé de leur pérennité.

**Après :**
> L'enquête annuelle de l'Ordre des experts-comptables (2023) montre que 34 % des
> cabinets de moins de 10 salariés n'ont pas encore dématérialisé leur production.

**Règle** : soit on a la source et on la cite précisément, soit on reformule en opinion
assumée (« je pense que... », « il me semble que... ») ou en observation de terrain.

### Pattern 6 : Section « défis et perspectives » formulaïque

L'IA conclut presque toujours par un paragraphe sur les « défis » (minimisés) suivi
d'une note d'optimisme (maximisée). C'est un tic reconnaissable à dix mètres.

**Avant :**
> Malgré les défis liés à la résistance au changement et aux coûts d'investissement,
> l'avenir s'annonce prometteur pour les cabinets qui sauront s'adapter aux nouvelles
> technologies.

**Après :**
> Le principal frein, au cabinet Leroy, n'est pas le budget -c'est le temps. Tester
> Dext ou Pennylane prend des heures que personne n'a en période fiscale. La solution
> retenue a été de dédier un collaborateur à l'outil pendant le mois de juin, quand
> l'activité ralentit. Est-ce que ça a marché ? Partiellement. Le logiciel tourne, mais
> la moitié de l'équipe ne l'utilise pas encore.

**Règle** : les difficultés méritent d'être décrites avec la même précision que les
succès. Un vrai mémoire professionnel montre ce qui n'a *pas* marché aussi.

---

## Phase 2 -Patterns de langue

### Pattern 7 : Vocabulaire IA français

L'IA en français a un lexique restreint et répétitif. Les mots ci-dessous, pris
individuellement, sont parfaitement corrects -mais leur accumulation est un signal fort.

#### Table de remplacement

| Mot / expression IA | Remplacement(s) naturel(s) |
|---|---|
| De plus | ∅ (supprimer) / Et / Aussi |
| En outre | ∅ / Par-dessus le marché (si registre le permet) |
| Par ailleurs | ∅ / Autre chose : / Sur un autre plan |
| Crucial | Important / Clé / Décisif (si vraiment décisif) |
| Fondamental | De base / Essentiel / Central |
| Essentiel | Nécessaire / Indispensable / Dont on ne peut pas se passer |
| En termes de | Pour / Côté / Sur le plan de |
| Dans le cadre de | Pendant / Pour / À l'occasion de |
| Au sein de | Dans / Chez / À |
| S'inscrit dans | Fait partie de / Rejoint / Relève de |
| Met en lumière | Montre / Révèle / Fait apparaître |
| Enjeu majeur | Problème / Question / Difficulté / Sujet |
| Levier | Moyen / Outil / Ce qui permet de |
| Paradigme | Modèle / Cadre / Façon de voir |
| Holistique | Global / D'ensemble / Complet |
| Synergie | Collaboration / Complémentarité / Travail commun |
| Écosystème (hors biologie) | Environnement / Réseau / Milieu |
| Constitue un | Est un |
| Représente un | Est un |
| Il convient de | Il faut / On doit / Mieux vaut |
| Force est de constater | On voit bien que / Il faut reconnaître que |
| Dans un monde en constante évolution | ∅ (supprimer entièrement) |
| S'avère être | Est / Se révèle |
| Joue un rôle prépondérant | Compte beaucoup / Pèse lourd / A du poids |
| Fait l'objet de | Fait / Subit / Reçoit |
| De manière significative | Beaucoup / Nettement / Vraiment |
| Vise à | Cherche à / Veut / A pour but de |
| Impactant | Qui touche / Qui affecte / Qui change |
| Résilience (hors psychologie) | Résistance / Capacité à tenir / Solidité |
| Proactif | Qui anticipe / Qui prend les devants |
| Partie prenante | Acteur concerné / Personne impliquée |
| Optimiser | Améliorer / Rendre plus efficace |
| Piloter (la performance) | Suivre / Gérer / Surveiller |
| Tapisserie (au sens figuré) | Ensemble / Mosaïque / Patchwork (si registre le permet) |
| Naviguer dans (hors nautisme) | Gérer / Se débrouiller avec / Composer avec |
| Orchestrer | Organiser / Coordonner / Mettre en place |
| Plonger dans | Examiner / Étudier / Regarder de près |
| Il est primordial de | Il faut / C'est nécessaire de |
| En fin de compte | Au final / Bref / Pour résumer |
| Paysage (au sens figuré) | Contexte / Situation / Environnement |
| Indéniablement | Clairement / C'est un fait / ∅ |
| Intrinsèquement | En soi / Par nature / Fondamentalement |
| Catalyseur | Déclencheur / Ce qui a lancé / Moteur |
| Prisme (au sens figuré) | Angle / Point de vue / Sous l'angle de |
| Tant... que... (en ouverture) | ∅ (reformuler sans cette structure) |
| À l'aune de | Selon / D'après / En fonction de |
| Souligner (que) | Dire / Montrer / Pointer / ∅ |
| Façonner | Construire / Influencer / Modifier |
| Témoigner de | Montrer / Révéler / Prouver |
| Dans un monde où | ∅ (supprimer entièrement, variante de "constante évolution") |
| Consiste à (4-7x) | Est / Revient à / C'est |
| Dans ce contexte (5-9x) | ∅ / Ici / Dans ce cas |
| À ce stade (4-8x) | ∅ / Pour l'instant / Maintenant |
| Plus précisément (4-7x) | ∅ / C'est-à-dire / Concrètement |
| Prendre en compte (3-5x) | Inclure / Compter / Tenir compte de |
| Robuste (hors technique) (3-5x) | Solide / Fiable / Qui tient |
| Pertinent (2-4x) | Adapté / Utile / Qui colle |
| Nuancé (3-6x) | Mesuré / Modéré / Pas tranché |
| Permet de (5-8x) | Sert à / Rend possible / [verbe direct] |
| Il s'agit de (4-7x) | C'est / On parle de / Le sujet est |
| Le point clé est le suivant | ∅ (dire directement) |
| Le problème n'est pas tant X que Y | Reformuler sans cette structure |
| La vraie difficulté, c'est que | ∅ / Le problème c'est que |
| Cristalliser (hors chimie) (4x) | Fixer / Résumer / Concentrer |
| Sous-jacent (4x) | Derrière / Caché / En dessous |
| En filigrane (3x) | En arrière-plan / Discrètement / Derrière tout ça |
| Une myriade de (6x) | Beaucoup de / Des dizaines de / [chiffre précis] |
| S'inscrire dans une dynamique (4x) | Faire partie de / Suivre le mouvement |
| Inéluctablement (3x) | Forcément / Nécessairement / ∅ |
| Un équilibre délicat (6x) | Un compromis / Une tension / Un arbitrage |
| Dichotomie (4x) | Opposition / Séparation / Choix entre |
| Faire figure de (3x) | Passer pour / Être vu comme / Sembler |
| Tirer parti de (4x) | Profiter de / Utiliser / Exploiter |
| Mettre en exergue (3x) | Souligner / Montrer / Pointer |

*Les multiplicateurs (ex: 5-8x) indiquent la fréquence d'utilisation par les LLM
par rapport à un francophone moyen, selon l'auto-analyse de ChatGPT 5.4.*

**Règle** : aucun de ces mots n'est interdit. Mais si le texte en contient plus de cinq
par page, c'est un signal. Varier, concrétiser, simplifier.

### Pattern 8 : Évitement du verbe « être »

L'IA remplace systématiquement « est » par des verbes plus « soutenus » : constitue,
représente, incarne, illustre. En français naturel, « être » est le verbe le plus
courant -et c'est normal.

**Avant :**
> La comptabilité analytique constitue un outil indispensable qui représente un pilier
> de la gestion moderne.

**Après :**
> La comptabilité analytique est un outil de gestion. Elle sert à savoir combien coûte
> réellement chaque activité -et donc où l'entreprise gagne ou perd de l'argent.

**Règle** : ne pas fuir « être ». C'est souvent le choix le plus clair.

### Pattern 9 : Parallélismes négatifs

L'IA adore la structure « Il ne s'agit pas seulement de X, mais aussi/surtout de Y ».
C'est un tic rhétorique reconnaissable.

**Avant :**
> Il ne s'agit pas seulement d'automatiser les tâches, mais de repenser en profondeur
> l'organisation du travail.

**Après :**
> Automatiser les tâches ne suffit pas si l'organisation reste la même. Le vrai sujet,
> c'est de décider qui fait quoi une fois que le logiciel gère la saisie.

**Règle** : dire directement ce qu'on veut dire, sans la double négation.

### Pattern 10 : Règle de trois systématique

L'IA énumère presque toujours par trois : « la productivité, la qualité et la
satisfaction client » ; « innover, collaborer et s'adapter ». Deux ou quatre, presque
jamais.

**Avant :**
> Cette approche améliore la productivité, la qualité et la satisfaction client.

**Après :**
> En pratique, les délais de production ont baissé -et les clients reçoivent leurs
> bilans plus tôt. Pour la qualité, c'est plus nuancé : il y a moins d'erreurs de
> saisie, mais la revue analytique reste manuelle.

**Règle** : casser les triades. Enumérer par deux, par quatre, ou mieux -développer
chaque point séparément.

### Pattern 11 : Variation synonymique excessive

L'IA évite de répéter un mot en le remplaçant par un quasi-synonyme à chaque occurrence.
Un cabinet devient « la structure », puis « l'entité », puis « le bureau d'expertise ».
En français académique, la répétition d'un terme technique est non seulement acceptable
mais souhaitable pour la clarté.

**Avant :**
> Le cabinet a mis en place un nouvel outil. Cette structure a formé ses collaborateurs.
> L'entité a constaté une amélioration notable de sa productivité.

**Après :**
> Le cabinet a mis en place Pennylane en septembre. Trois mois après, les quatre
> collaborateurs qui l'utilisent traitent en moyenne 15 dossiers de plus par mois. Les
> deux qui ne l'utilisent pas encore disent manquer de temps pour se former.

**Règle** : appeler un chat un chat. Répéter le mot juste plutôt que chercher un synonyme
qui brouille la lecture.

### Pattern 12 : Fausses gammes

L'IA produit des énumérations qui sonnent bien mais ne disent rien : « du diagnostic
à la mise en oeuvre, de la stratégie à l'opérationnel, de la théorie à la pratique ».

**Avant :**
> Du diagnostic initial à la mise en oeuvre finale, de la réflexion stratégique à
> l'action opérationnelle, ce mémoire couvre l'ensemble du processus.

**Après :**
> Ce mémoire décrit les trois étapes du projet : le choix de l'outil (septembre), le
> paramétrage (octobre-novembre) et les deux premiers mois d'utilisation (décembre-
> janvier).

**Règle** : remplacer les gammes par une description factuelle de ce qui est couvert.

---

## Phase 3 -Patterns de style

### Pattern 13 : Tirets cadratins en excès

Le tiret cadratin (— ou –) est le signe de ponctuation préféré de l'IA. Un texte humanisé ne doit en contenir aucun. Remplacer systématiquement par une virgule, un point, une parenthèse ou une reformulation.

**Avant :**
> La digitalisation -qui touche tous les secteurs -impose aux cabinets -qu'ils soient
> grands ou petits -de repenser leurs processus -sous peine de perdre en compétitivité.

**Après :**
> La digitalisation touche tous les secteurs, y compris les petits cabinets. Ceux qui ne
> repensent pas leurs processus risquent de perdre des clients au profit de confrères
> mieux outillés.

**Règle** : maximum deux tirets cadratins par page. Préférer les virgules, les
parenthèses, ou simplement couper la phrase en deux.

### Pattern 14 : Gras mécanique

L'IA met en gras tous les mots qu'elle juge importants. Le résultat : une page où tout
est souligné, donc rien ne ressort.

**Règle** : dans un mémoire ou un rapport, le gras se limite aux titres et sous-titres.
Dans le corps du texte, il est exceptionnel -un ou deux mots par chapitre, pas plus.
En cas de doute, supprimer tout le gras dans le corps du texte.

### Pattern 15 : Listes à puces avec en-têtes en gras

C'est le format « blog post » de l'IA :
- **Premier point :** explication du premier point
- **Deuxième point :** explication du deuxième point
- **Troisième point :** explication du troisième point

Dans un texte académique ou professionnel, convertir en prose. Les listes à puces sont
acceptables pour des énumérations factuelles courtes (liste de logiciels, dates, étapes),
mais pas pour développer des idées.

**Règle** : si chaque puce fait plus d'une ligne, c'est un paragraphe déguisé. Le
transformer en paragraphe.

### Pattern 16 : Majuscules dans les titres (Title Case)

L'IA produit parfois des titres en Title Case anglais : « Les Enjeux De La Transformation
Digitale ». En français, seul le premier mot prend la majuscule (sauf noms propres).

**Correct** : « Les enjeux de la transformation digitale »

**Règle** : appliquer systématiquement la convention française. Un titre en Title Case
est un signal IA immédiat pour un lecteur francophone.

### Pattern 17 : Emojis

Dans un texte académique ou professionnel, aucun emoji. Jamais. Même dans un email
professionnel, la prudence s'impose.

**Règle** : supprimer tous les emojis. Sans exception dans les mémoires, rapports,
dissertations et lettres de motivation.

### Pattern 18 : Guillemets et typographie française

L'IA mélange souvent les guillemets droits (""), les guillemets anglais ("") et les
guillemets français (« »). En français, la norme est :

- Guillemets français « » pour les citations (avec espace insécable à l'intérieur)
- Guillemets anglais " " pour les citations à l'intérieur d'une citation
- Jamais de guillemets droits dans un texte final

Autres points de typographie française :
- Espace insécable avant : ; ! ? et les guillemets fermants
- Espace insécable après les guillemets ouvrants
- Points de suspension : trois points (…) et non trois points séparés (...)

**Règle** : vérifier systématiquement la typographie française. Un texte avec des
guillemets droits trahit une origine anglophone -ou une génération par IA.

---

## Phase 4 -Patterns de communication

### Pattern 19 : Artefacts de chatbot

Ce sont les traces les plus évidentes d'un texte copié-collé depuis un chatbot sans
relecture :

- « J'espère que cela vous aide ! »
- « N'hésitez pas à me demander si vous avez d'autres questions. »
- « Voici un exemple de... »
- « Bien sûr ! Voici... »
- « Je serais ravi de vous aider avec... »

**Règle** : supprimer intégralement. Si ces phrases apparaissent dans un texte soumis
à humanisation, c'est un signal que le texte n'a subi aucune relecture -prévoir une
réécriture profonde.

### Pattern 20 : Disclaimers de connaissance

L'IA se protège avec des formulations prudentes qui n'apparaissent jamais dans un vrai
mémoire ou rapport :

- « À ma connaissance... »
- « Il est difficile de dire avec certitude... »
- « Les informations disponibles suggèrent que... »
- « Il est important de préciser que je ne suis pas un expert en... »
- « Selon les données auxquelles j'ai accès... »

**Règle** : supprimer. Dans un mémoire, l'auteur est censé maîtriser son sujet. Si une
information est incertaine, le dire autrement : « Les données sur ce point sont rares »
ou « Aucune étude n'a mesuré cet effet précisément ».

### Pattern 21 : Ton servile

L'IA complimente l'utilisateur et adopte un ton de service client :

- « Excellente question ! »
- « Vous avez tout à fait raison ! »
- « C'est un sujet passionnant ! »
- « Merci pour cette question pertinente. »

**Règle** : ces formulations n'ont rien à faire dans un texte académique. Si elles
apparaissent, c'est que le texte est un copier-coller brut du chatbot. Supprimer et
signaler à l'utilisateur.

---

## Phase 5 -Remplissage et couverture

### Pattern 22 : Phrases de remplissage

L'IA utilise des locutions qui allongent les phrases sans rien apporter :

| Remplissage | Remplacement |
|---|---|
| Afin de | Pour |
| En raison du fait que | Parce que / Car |
| Il est important de noter que | ∅ (supprimer, dire directement) |
| Il est intéressant de constater que | ∅ (constater directement) |
| Il va sans dire que | ∅ (dire directement) |
| Dans cette optique | ∅ / Donc / Alors |
| À cet égard | ∅ / Sur ce point |
| En ce qui concerne | Pour / Sur |
| Eu égard à | Vu / Étant donné |
| Il est à noter que | ∅ |
| On peut observer que | ∅ |
| Cela met en évidence le fait que | Cela montre que / ∅ |
| Il est possible de considérer que | On peut penser que / ∅ |

**Règle** : chaque phrase de remplissage supprimée rend le texte plus clair. En cas de
doute, supprimer.

### Pattern 23 : Couverture excessive (hedging)

L'IA empile les modalisateurs pour ne jamais rien affirmer :

**Avant :**
> Il semblerait que cette approche pourrait potentiellement permettre d'améliorer
> éventuellement certains aspects de la productivité.

**Après :**
> Cette approche a amélioré la productivité de 12 % sur les dossiers testés.

Ou, si on ne dispose pas de chiffres :

> D'après les retours de l'équipe, le traitement est plus rapide. Personne n'a mesuré
> précisément le gain, mais la responsable du pôle social estime qu'elle gagne une
> demi-journée par semaine.

**Règle** : un seul modalisateur par phrase, maximum. Si on n'est pas sûr, le dire une
fois clairement plutôt que d'empiler les « pourrait éventuellement ».

### Pattern 24 : Conclusions positives génériques

L'IA termine presque toujours sur une note optimiste et vague :

- « L'avenir s'annonce prometteur. »
- « Les perspectives sont encourageantes. »
- « Cette tendance ne devrait que s'accélérer. »
- « Les possibilités sont infinies. »

**Règle** : une conclusion doit dire quelque chose de spécifique. Qu'est-ce qui va se
passer concrètement ? Qu'est-ce que l'auteur recommande ? Qu'est-ce qui reste à faire ?

**Avant :**
> En conclusion, la transformation digitale des cabinets comptables est un processus
> incontournable dont les perspectives s'annoncent prometteuses.

**Après :**
> Le cabinet Leroy va déployer Pennylane sur l'ensemble des dossiers d'ici septembre.
> Le risque principal est la surcharge en période fiscale. La recommandation est de
> maintenir l'ancien système en parallèle pendant six mois, le temps que toute l'équipe
> soit à l'aise -quitte à assumer le coût de la double licence.

---

## Phase 6 -Patterns spécifiques au français académique

Voir `references/patterns-academiques-fr.md` pour les exemples complets avant/après.

| Pattern | Signal principal | Règle en une phrase |
|---|---|---|
| 25 -Ouvertures clichées | « Dans un monde en constante évolution » | Commencer par le concret : sujet, terrain, observation déclencheuse |
| 26 -Transitions mécaniques | « Après avoir vu X, voyons Y » | La structure est dans les titres : pas besoin de l'annoncer |
| 27 -Conclusions creuses | Résumé de ce qui précède | Conclure = répondre à la problématique, pas récapituler |
| 28 -Jargon compta/gestion vide | « Pilotage de la performance » | Chaque terme gestionnaire exige un chiffre ou un exemple concret |
| 29 -Incohérence temporelle | Mélange de temps sans logique | Choisir un système : passé composé pour la narration, présent pour l'analyse |
| 30 -Registre uniforme | Ton constant, zéro variation | Autoriser des micro-variations : parenthèse familière dans un passage narratif |
| 31 -Raisonnement sur-explicite | Chaque étape détaillée | Faire confiance au lecteur : ne pas relier chaque cause à chaque effet |
| 32 -Exemples génériques | « Imaginons une entreprise X » | Détails hyper-spécifiques : ville, outil, prénom, date exacte |
| 33 -Registre uniformément soutenu | Zéro mot courant | 1-2 mots courants par paragraphe dans les mémoires pro |
| 34 -Biais de neutralité | Pour/contre sans trancher | Un auteur a un avis. L'assumer (sauf dissertation) |
| 35 -Structure en sablier | Intro + corps symétrique + récap | Déséquilibrer les parties, supprimer la récap de conclusion |
| 36 -Fluff d'audience universelle | Redéfinir l'évident | Écrire pour son lecteur cible, pas pour tout le monde |
| 37 -Absence de micro-révisions | Fluidité parfaite | 1-2 micro-révisions par page dans les mémoires pro (« enfin », « plutôt ») |
| 38 -Redondance paraphrastique | Même idée, deux formulations | Garder la plus précise des deux, supprimer l'autre |
| 39 -Correction sans individualité | Correct mais sans tics | Choisir 2-3 tics de ponctuation + 3-4 expressions récurrentes |
| 40 -Absence de coût cognitif | Produit fini sans arbitrage | 1 trace d'arbitrage par page : « On avait deux options, on a choisi X parce que Y » |
| 41 -Persistance isotopique | Même champ métaphorique 3+ paragraphes | Mélanger les métaphores ou passer au concret |
| 42 -Concession préemptive | Thèse + antithèse dans la même phrase | Séparer : affirmer, puis nuancer dans une phrase à part |
| 43 -Aplatissement tonal | Intensité constante début-fin | Créer une courbe : neutre → engagé → retenu → conclusif |
| 44 -Pivot méta-analytique | Description → cadre conceptuel automatique | Rester dans le concret ; théorie dans sa partie dédiée |
| 45 -Auto-référence textuelle | « Dans cette section, nous verrons » | Supprimer tout commentaire méta si la structure est titrée |
| 46 -Densité adjectivale lisse | Paires d'adjectifs génériques | Jamais deux adjectifs génériques côte à côte : remplacer par un fait |
| 47 -Calques anglais | Syntaxe SVO, faux amis | Vérifier : « un francophone natif dirait-il ça comme ça ? » |
| 48 -Persistance macro-structure | Structure rigide malgré humanisation | Déséquilibrer les parties + 1 digression par chapitre + pas de récap |
| 49 -Énumération ordinale scaffolding | "La première est X. La deuxième est Y." | Fusionner étapes, hiérarchiser, intégrer dans récit |
| 50 -Thèse-méta en ouverture | Phrase-annonce abstraite en tête de § | Commencer par le détail ; supprimer l'annonce |
| 51 -Aphorisme de clôture | Phrase courte universalisante en fin de § | Terminer sur fait concret, hésitation, question |
| 52 -Définition binaire | "X n'est pas A. C'est B." / "Pas X : Y" | Affirmer directement ; intégrer la nuance dans la phrase |
| 53 -Scaffolding trois-raisons | "D'abord... Ensuite... Enfin..." | Supprimer l'annonce ; fusionner 2 raisons ; assumer 2 ou 4 |
| 54 -Cleft obsessionnel | "Ce qui X, c'est Y" répété | Max 1 par page ; ordre SVO direct |
| 55 -Cascade d'autorités | "A affirme X. B confirme Y. C ajoute Z." | Une seule autorité bien exploitée ; pas de "confirme" |

Pour exemples détaillés avant/après des patterns 49-55 : voir
`references/cadence-structurelle.md`.

---

## Phase 7 -Injection d'âme

Après suppression des patterns, le texte risque d'être propre mais sans vie.

**Signes d'un texte sans âme :** phrases identiques en longueur, aucune opinion, aucune incertitude,
pas de première personne, aucun exemple vécu.

### Les 5 injections

**1. Varier le rythme.** Phrase courte. Puis une longue qui développe, qui s'autorise un détour.
Puis courte à nouveau. Le rythme, c'est la respiration du texte.

**2. Avoir un avis.** Dans un mémoire professionnel, rapporter ne suffit pas. Réagir.
> « Pennylane fait très bien la collecte. En revanche, son module de révision est frustrant : il oblige à valider compte par compte. »

**3. Reconnaître la complexité.** Hésiter, nuancer, admettre ne pas savoir.
- « Honnêtement, je ne suis pas sûr que ce soit la bonne approche. »
- « Les résultats sont encourageants -reste à voir s'ils tiennent sur la durée. »

**4. Utiliser « je » quand le format le permet.** Dans un mémoire pro, un rapport de stage,
une lettre de motivation : l'absence de « je » est un signal IA.

**5. Laisser des aspérités.** Parenthèse, question rhétorique, précision inutile mais vivante.
- « Le taux d'erreur a baissé (enfin, sur les dossiers testés -les autres, on ne sait pas). »
- « Le directeur -qui est aussi commissaire aux comptes et formateur, autrement dit débordé -a validé en juin. »

**Précision émotionnelle :** pas « préoccupant » mais « il y a quelque chose de dérangeant
dans le fait que la moitié des cabinets n'ont toujours pas de sauvegarde automatisée ».

---

## Phase 8 -Contre-mesures statistiques (résumé)

Les détecteurs mesurent des métriques mathématiques, pas seulement des listes de mots.
Compilatio utilise GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro et d'autres LLM en pipeline.
Référence complète : `references/formules-auto-evaluation.md` et `references/prompts-detecteurs.md`.

| Métrique | Signal IA | Signal humain | Levier principal |
|---|---|---|---|
| Perplexité | Chaque mot prévisible | Mots surprenants mais corrects | Détails spécifiques : noms, chiffres, dates |
| Burstiness B | B < -0.5 (phrases uniformes) | B > 0.3 (longues + courtes alternées) | Varier : 5 mots / 40 mots dans le même paragraphe |
| TTR | < 0.04 (vocabulaire répétitif) | > 0.06 (richesse lexicale) | Termes de terrain, verbes spécifiques, hapax |
| DARL | < 1.5 (zéro ancrage réel) | > 4.5 (noms propres, dates, outils) | Collecter Q1+Q2+Q4 avant de réécrire |
| SCE_approx | > 0.40 : IA détecté | < 0.25 : zone HUMAN | Combiner toutes les métriques simultanément |

**Règle absolue :** un texte avec DARL < 1.5 sera toujours détecté, quelle que soit la qualité du style.

**Piège de la sur-humanisation :** insérer des hésitations artificielles, varier le style de manière
exagérée, concentrer les détails concrets dans 2-3 phrases seulement -ces techniques mécaniques
sont elles-mêmes détectables. La seule humanisation qui fonctionne produit un texte qu'un vrai
étudiant aurait réellement pu écrire.

---

## Zones rouges académiques

Certaines sections de mémoires et rapports sont quasi-systématiquement
détectées, même quand le corps du texte passe. Le format imposé produit
une structure normalisée que les LLM de détection reconnaissent à coup sûr.

| Zone rouge | Pourquoi flaggée | Traitement spécial |
|---|---|---|
| Résumé / Abstract | Format contraint, densité synthétique extrême | Mode Résumé/Abstract (cf. section dédiée) |
| Conclusion | "En conclusion...", récap, ouverture prospective générique | Commencer par le résultat le plus contre-intuitif ; pas de récap ; finir sur tension ouverte |
| Introduction (3 premiers §) | "Ce mémoire porte sur...", annonce de plan | Ouvrir sur scène / observation / chiffre brut ; supprimer annonces de plan si titres clairs |
| Méthodologie / Pipeline | Énumérations ordinales, listes d'étapes parallèles | Patterns 49-50-53 en priorité ; récit plutôt qu'inventaire |
| Descriptions de processus | "Il ouvre, il lit, il détermine, il saisit..." | Casser la liste d'actions en récit asymétrique |
| Annexes documentaires | Texte structuré type CLAUDE.md, README, guide | Si possible, laisser en format brut factuel ; si rédigé en prose, traiter comme corps du texte |
| Bibliographie | Format APA mécanique | Normalement exclue du calcul Compilatio ; vérifier que les citations sont bien entre guillemets |

### Règle zone rouge

Pour tout mémoire > 5000 mots qui dépasse 30 % de détection alors que
les passages narratifs avec "je" passent : la cause est dans les zones
rouges. Les retravailler **en priorité** avant de toucher au reste.

**Ordre recommandé :**
1. Résumé et abstract (Mode Résumé/Abstract)
2. Conclusion
3. Sections méthodologiques / pipeline (patterns 49-50-53)
4. Introduction (3 premiers paragraphes)
5. Corps du texte (patterns 1-48 + 51-55)

**Gain typique :** corriger les 4 premières zones rouges sur un mémoire
de 10 000 mots fait baisser le score de 15 à 20 points sans toucher à
80 % du texte.

---

## Processus complet

### Étape 0.5 : Collecte d'ancrage (OBLIGATOIRE)

Sans ancrage factuel réel, aucune technique d'humanisation ne suffit. DARL < 1.5 = échec garanti.

```
ANCRAGE EXPRESS (5 questions)
═════════════════════════════

1. OUTIL : Nom exact d'un logiciel, lieu ou auteur avec un détail technique
   (version, année, salle) ?

2. ACTEUR : Nom d'une personne ou service + une date exacte (ex: mardi 14) ?

3. CHIFFRE : Une statistique ou donnée exacte (à virgule) ?

4. BLOCAGE : Un problème inattendu ou un échec qui t'a fait perdre du temps ?
   En une phrase.

5. TIC : 2 mots de liaison que tu utilises tout le temps ?
```

**Règle :** ne jamais réécrire sans Q1 + Q2 + Q4. Si l'utilisateur refuse : « Sans ces détails,
le texte sera détecté. Les détecteurs mesurent l'ancrage dans le réel, pas seulement le style. »
Ne jamais inventer les détails à la place de l'utilisateur.

### Étape 1 : Diagnostic

Afficher le diagnostic complet (cf. Étape 0) avec DARL et DS estimés.
Attendre validation avant de réécrire, sauf si réécriture directe demandée.

```
  - DARL estimé : [valeur] → [OK > 4.5 / À risque < 1.5]
  - Densité sémantique : [valeur] → [OK > 0.5 / À risque < 0.3]
```

Si DARL < 1.5 ou DS < 0.3, bloquer et revenir à Étape 0.5.

### Étape 2 : Identification du modèle source

| Signal | Gemini | ChatGPT/GPT | Claude |
|---|---|---|---|
| Lexique | Poétique, « cristalliser », « en filigrane » | Triades, « il est essentiel », « toutefois » | « constitue un », tirets cadratins, listes gras |
| Structure | Lisse, pas argumentative | Sablier RLHF pour/contre/donc | Exhaustif, hiérarchique |

Corrections : Gemini → casser rythme + faits ; GPT → triades + marqueurs ; Claude → tirets + listes.

### Étape 3 : Réécriture brouillon

Appliquer les 48 patterns (Phases 1-6), injecter l'âme (Phase 7), contre-mesures (Phase 8).
Viser DARL > 3 par paragraphe. Distribuer les ancres sur tout le texte.

### Étape 4 : Auto-audit (double grille)

- **Surface :** tells IA résiduels, passages lisses, transitions mécaniques, « je » manquant.
- **Statistique :** variance de phrases, densité de détails, richesse lexicale, entropie variable.

### Étape 5 : Auto-évaluation mathématique

Calculer SCE_approx (cf. `references/formules-auto-evaluation.md`).
Si SCE_approx > 0.40 : identifier les métriques faibles et corriger. Boucler.

### Étape 6 : Réécriture finale

Vérification de sortie : DARL > 4.5 / DS > 0.5 / RDS > 0.35 / SCE < 0.35.
Si une condition n'est pas remplie, ne pas livrer et reboucler.

### Étape 7 : Résumé des modifications

```
MODIFICATIONS EFFECTUÉES
════════════════════════
- [n] connecteurs mécaniques supprimés ou remplacés
- [n] tirets cadratins supprimés
- [n] superlatifs vides remplacés par des termes concrets
- [n] triades cassées
- [description des changements structurels majeurs]
- [description des ajouts de voix/âme]
- Variance de longueur de phrase : [avant] → [après]
- Score diagnostic : [avant] → [après]
```

---

## Adaptation au type de document

| Type de document | Registre | « Je » | Familiarité | Exemples |
|---|---|---|---|---|
| Mémoire de recherche | Soutenu, impersonnel | Non (« nous ») | Aucune | M2, thèse |
| Mémoire professionnel | Soutenu accessible | Oui, dosé | Légère | DCG, DSCG, licence pro |
| Rapport de stage | Courant-soutenu | Oui | Modérée | BTS, DUT, L3 |
| Dissertation | Soutenu | Non | Aucune | Concours, examens |
| Lettre de motivation | Professionnel | Oui | Modérée | Candidature |
| Email professionnel | Courant | Oui | Large | Communication interne |

---

## Cas particuliers

- **Texte court (< 100 mots) :** humaniser = rendre naturel, pas allonger.
- **Texte technique (code, formules) :** humaniser uniquement les passages explicatifs.
- **Texte anglais en contexte français :** proposer de traduire *et* d'humaniser en français.
- **Humanisation « légère » :** Phases 1-5 seulement, Phase 7 minimale, pas de restructuration.
- **Humanisation « totale » :** toutes les phases + Phase 7 maximum + restructuration autorisée.
- **Long mémoire (> 5000 mots) avec score 30-50 % malgré ancrage correct :** le problème est
  structurel, pas lexical. Appliquer dans cet ordre : (1) audit des zones rouges (Résumé,
  Conclusion, Introduction, Méthodologie) ; (2) patterns 49-55 (cadence structurelle) sur
  les sections techniques ; (3) Mode Résumé/Abstract sur les synthèses ; (4) ne pas toucher
  aux passages narratifs déjà validés (risque de sur-humanisation). Objectif réaliste :
  -15 à -20 points en traitant 20-30 % du texte ciblé.
- **Résumé / abstract / 4e de couverture détecté à 80-100 % :** Mode Résumé/Abstract
  (cf. section dédiée). Réécriture complète plutôt que retouche.
- **Rapport avec pipeline / méthodologie en énumération ordinale :** Pattern 49 en priorité,
  récit avant inventaire, pas de "la première est / la deuxième est".

---

## Rappels essentiels

1. **Toujours commencer par le diagnostic.** Pas de réécriture à l'aveugle.
2. **Ne jamais mentionner le processus** dans le texte final.
3. **Le concret bat l'abstrait.** Un chiffre, un nom, une date : c'est ce qui rend vivant.
4. **La perfection est suspecte.** Les vrais textes humains ont des imperfections mineures.
5. **L'auto-audit est obligatoire.** Double grille : patterns de surface + signaux statistiques.
6. **Les détecteurs LLM sont intelligents.** Compilatio utilise Claude Opus 4.6, GPT-5.4,
   Gemini 3.1 Pro. La Phase 8 est aussi importante que les Phases 1-7.
7. **Respecter le registre du document.** Pas de familiarité dans une dissertation.
8. **Préserver le sens.** L'humanisation change la forme, pas le contenu.
9. **Ne jamais inventer de faits.** Si vague, reformuler en opinion ou demander les détails.

---

## Mode Pédagogique : Annoter plutôt que réécrire

Activé quand : « explique-moi pourquoi ça sonne IA », « annote mon texte »,
« apprends-moi à écrire mieux », « mode pédagogique ».

**Objectif :** annoter chaque passage problématique avec un code de pattern et une reformulation,
puis fournir une synthèse des 3 patterns les plus fréquents (jamais plus de 3).

```
⁽¹⁾ PATTERN : [nom du pattern]
    → Ce que ça révèle : [explication courte]
    → Reformulation naturelle : [exemple concret]

SYNTHÈSE
═══════
1. [Pattern #1] : X fois → Exercice : [exercice]
2. [Pattern #2] : Y fois → Exercice : [exercice]
TON POINT FORT : [ce qui est déjà naturel]
PROCHAIN TEXTE : concentre-toi sur [1 seul point]
```

**Règle pédagogique :** 1 correction précise intégrée vaut mieux que 15 corrections ignorées.

**Référence étendue :** `references/mode-pedagogique.md` (grille complète, exercices, progressions).

---

## Mode Oralité : Scripts de soutenance

Activé quand : « script de soutenance », « présentation orale », « discours », « pitch ».

| Écrit académique | Oral naturel |
|---|---|
| Phrases longues et construites | 12 mots max à l'oral |
| Connecteurs formels (néanmoins, toutefois) | Donc... / Et là... / En clair... / Concrètement... |
| Aucune pause signalée | [PAUSE] / [RESPIRATION] / [TRANSITION] dans le script |
| Registre uniforme | Micro-hésitations légitimes (« enfin, plus précisément... ») |

**Règles orales :** zéro participe présent en -ant, zéro triade systématique,
zéro phrase > 20 mots, zéro « il convient de noter que » à l'oral.

**Référence étendue :** `references/mode-pedagogique.md` (scripts annotés complets, gestion du stress).

---

## Mode Résumé / Abstract anti-détection

Activé quand : le texte à humaniser inclut un résumé, un abstract, une
synthèse de mémoire, ou quand l'utilisateur mentionne "mon abstract fait
100 %", "le résumé est entièrement flaggé", "je n'arrive pas à faire
baisser le score sur le résumé".

### Pourquoi les résumés sont piégés

Un résumé de mémoire, par format, concentre exactement les signaux que
les détecteurs LLM cherchent :
- Densité thématique élevée (chaque phrase résume un paragraphe entier)
- Structure canonique (problématique → méthode → résultats → apports)
- Absence de digressions, d'hésitations, de détails débordants
- Registre uniformément soutenu
- Ouverture typique "Ce mémoire porte sur / examine / étudie..."

Un résumé rédigé "proprement" sera détecté à 80-100 % presque toujours,
même quand le reste du mémoire passe.

### Règles de réécriture d'un résumé

**1. Ouvrir sur une scène ou un chiffre brut, pas sur "ce mémoire porte sur".**
- Avant : "Ce mémoire examine l'automatisation de la saisie bancaire..."
- Après : "Au Cabinet X, saisir un relevé bancaire prend 30 minutes. Multiplié par 400 clients, ça finit par peser."

**2. Casser la structure canonique.**
- Ne pas enchaîner problématique → méthode → résultats → apports dans l'ordre attendu
- Commencer par le résultat le plus marquant, ou par la difficulté principale rencontrée

**3. Un seul chiffre-ancre fort.**
- Pas de liste "88-92 %, 84 %, 25 relevés, 8 banques" dans la même phrase
- Choisir le chiffre le plus parlant et le laisser respirer

**4. Rythme cassé obligatoire.**
- Alterner phrase courte (< 10 mots) et phrase longue (> 30 mots)
- Insérer une phrase nominale si possible

**5. Supprimer toutes les transitions méta.**
- "Au-delà des résultats mesurés..."
- "Ce mémoire interroge également..."
- "La dissertation examine par ailleurs..."

**6. Finir sur tension ouverte, pas sur synthèse.**
- Pas de "le collaborateur voit ses compétences se reconfigurer"
- Oui : "Reste à voir si le taux de 84 % tient sur un an d'usage réel."

**7. Réduire de 20-30 %.**
- Un résumé IA est toujours trop dense
- Couper d'abord les phrases-transition et les doublons paraphrastiques

### Abstract anglais

Mêmes règles, renforcées : l'anglais académique est encore plus normé
que le français, et les LLM ont vu dix fois plus d'abstracts anglais à
l'entraînement. En particulier :
- Pas de "This dissertation examines / explores / investigates / analyzes"
- Préférer "At Cabinet X, bank statement entry takes 30 minutes..."
- Éviter les conclusions universalisantes type "...in their own right"

### Exemple complet

**Avant (détection typique ~90 %) :**
> Ce mémoire porte sur le développement et le déploiement d'outils
> d'automatisation au sein du Cabinet ATF. Partant du constat que la
> saisie manuelle des relevés bancaires mobilise entre 25 et 40 minutes
> par relevé sur un portefeuille de 400 clients, nous avons développé
> SAGE Parser v2, un outil Python qui automatise la transformation de
> relevés bancaires PDF en fichiers Excel directement importables dans
> SAGE Génération Experts. L'outil couvre 8 banques et a été développé
> avec Claude Code d'Anthropic. Les mesures effectuées sur 25 relevés
> réels confirment un gain de 88 à 92 % sur le temps de traitement,
> avec un taux de réussite de 84 %.

**Après (détection visée < 30 %) :**
> Au Cabinet ATF, saisir un relevé bancaire prenait entre 25 et 40
> minutes. Sur 400 clients, ça finit par peser. J'ai écrit, pendant
> l'alternance, un outil Python qui avale le PDF et sort un Excel
> directement importable dans SAGE Génération Experts : huit banques
> couvertes, parce que ce sont celles que nos clients utilisent. Le
> gain réel mesuré sur 25 relevés tourne autour de 90 %. Mais 16 %
> des fichiers sortent avec un écart que l'outil signale sans le
> résoudre. À ce stade, c'est l'humain qui tranche, et rien ne dit
> que ça tiendra à l'échelle du cabinet entier.

---

## Références internes

| Fichier | Quand le consulter |
|---|---|
| `references/audit-detecteurs-fr.md` | Audit comparatif 12 détecteurs + script Python reproductible centré français |
| `references/patterns-academiques-fr.md` | Exemples complets avant/après des patterns 25-48 |
| `references/formules-auto-evaluation.md` | Formules mathématiques, questionnaire ancrage complet 9 questions |
| `references/prompts-detecteurs.md` | Données Compilatio v4.5.3, seuils, pipeline, comparatif outils |
| `references/mode-pedagogique.md` | Grille d'annotation, exercices par pattern, scripts de soutenance |
| `references/marqueurs-ia-francais.md` | Liste noire de 60+ marqueurs IA en français |
| `references/patterns-par-discipline.md` | Patterns IA par discipline (compta, droit, SHS, info, santé, lettres) |
| `references/analyse-rapport-compilatio.md` | Interpréter un rapport Compilatio : grille de lecture, diagnostic par bloc, stratégie de correction |
| `references/cadence-structurelle.md` | Patterns 49-55 détaillés (énumération ordinale, thèse-méta, aphorisme clôture, définition binaire, scaffolding 3-raisons, cleft, cascade d'autorités) avec exemples avant/après |
| `/mnt/skills/user/soutien-academique/SKILL.md` | Règles d'écriture naturelle pour mémoires et rapports |
