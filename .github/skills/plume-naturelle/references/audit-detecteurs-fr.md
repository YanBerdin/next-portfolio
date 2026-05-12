# 1. Tableau des 12 detecteurs

| Detecteur | Metrique principale | Modele proxy suppose | Langue d'entrainement / support | Seuil public | Taux de faux positifs publies | Ref |
|---|---|---|---|---|---|---|
| GPTZero | Probabilite document + phrase; banc public explicite a FPR = 1% | Classifieur supervise multilingue de type encodeur + calibration (inf.) | EN natif; FR/ES/DE/PT ajoutes; benchmark FR public = 4k textes | Coupure produit non publiee; point de fonctionnement public a FPR = 1% | 0.484% sur benchmark FR interne 2025 | [GPTZero 2025](https://gptzero.me/news/behind-the-scenes-multilingual-detection/) |
| Originality.ai | AI score par modele Lite / Turbo / Multi | Ensemble de classifieurs transformer avec operating points distincts (inf.) | 30 langues; FR supportee explicitement | Pas de cut-off unique public; Lite/Turbo/Multi servent de seuils d'exploitation publics | 0.70% sur FR (Multi 2.0.0); 0.5% Lite EN | [Originality Multi 2.0.0](https://originality.ai/blog/multilanguage-ai-detection) / [Year in Review 2025](https://originality.ai/blog/year-in-review-2025) |
| Compilatio | Pourcentage de passages potentiellement generes par IA | Hybride segmentation + classifieur / LLM multilingue par passages (inf.) | Multilingue; FR coeur de marche; 24+ langues documentees | Aucun seuil automatique public; score probabiliste seulement | < 1.5% annonces par l'editeur | [Compilatio Detecteur IA](https://www.compilatio.net/ia-detecteur) / [Blog technique](https://www.compilatio.net/blog/comment-fonctionnent-les-detecteurs-ia) |
| Turnitin AI | AI writing percentage sur texte qualifie | Classifieur supervise segmentaire + tete paraphrase / AI-assisted (inf.) | Anglais, espagnol, japonais; FR non supporte au 21 novembre 2025 | Scores 1-19% masques; seuil de surface = 20% | < 1% annonce par l'editeur | [Using the AI Writing Report](https://guides.turnitin.com/hc/en-us/articles/22774058814093-Using-the-AI-Writing-Report) / [Academic integrity](https://www.turnitin.com/solutions/academic-integrity) |
| Copyleaks | AI score + filtres de sensibilite + sentence-level | Ensemble supervise multilingue + normalisation paraphrase / character manipulation (inf.) | 30+ langues; FR supporte officiellement | Cut-off numerique non public; sensibilite configurable | 0.2% global annonce; FPR FR non publiee | [Accuracy study](https://copyleaks.com/blog/ai-detection-accuracy-study) / [Supported languages](https://docs.copyleaks.com/reference/actions/miscellaneous/ai-detection-supported-languages/) |
| Winston AI | Human Score 0-100 + AI Prediction Map phrase par phrase | Classifieur supervise + heuristiques NLP + agrégat phrase/document (inf.) | EN prioritaire; FR supporte officiellement; 11+ langues documentees | Human Score public; coupure numerique non documentee | Non publie | [Winston FR](https://gowinston.ai/fr/) / [Languages](https://help.gowinston.ai/getting-started/which-languages-does-winston-ai-work-with) / [How detectors work](https://help.gowinston.ai/understanding-ai-detection/how-do-ai-detectors-work) |
| ZeroGPT | Pourcentage AI / Human + DeepScan phrase a phrase | Classifieur proprietaire multi-etapes + heuristiques de patterning (inf.) | Multilingue annonce; granularite exacte d'entrainement non publiee | Pas de cut-off stable documente; pourcentage rendu a l'utilisateur | Non publie; accuracy marketing 98.5% | [ZeroGPT](https://zerogpt.org/) |
| Sapling | Score probabiliste global + sentence scores + token scores | Classifieur document + phrase + token-level (inf.) | Langues d'entrainement non publiees; doc API generaliste | Score [0,1]; cut-off non public | Non publie | [Sapling AI Detector API](https://sapling.ai/docs/api/detector) |
| Crossplag | Confidence percentage + sorties Human / Mix / AI | RoBERTa fine-tune 1.5B+ params + NLP classique (doc Crossplag) | Anglais seulement; tout autre langue biaisee vers human selon l'editeur | Barre Human / Mix / AI; coupures numeriques non publiees | Non publie; l'editeur dit "rarely - if any" | [AI Content Detector](https://crossplag.com/ai-content-detector/) / [How it works](https://crossplag.com/detecting-if-a-text-is-ai-generated/) |
| GPTKit | Authenticity / Reality rate agregee sur 6 approches | Voting / stacking de 6 detecteurs (doc GPTKit) | Anglais seulement | Aucun seuil numerique public; rapports authenticity / reality | Non publie; accuracy ~93% annoncee | [GPTKit](https://gptkit.ai/) / [FAQ](https://gptkit.ai/faq) |
| Writer.com | Score 0-1 de probabilite AI | Classifieur probabiliste document-level (inf.) | Langue d'entrainement non publiee; API historique en anglais | Score [0,1]; label rendu; cut-off interne non publie | Non publie | [Writer AI Detect API](https://dev.writer.com/home/ai-detect) |
| Smodin | Score probabiliste AI vs humain + explication | Ensemble ML multilingue proprietaire (inf.) | 100+ langues annoncees; FR supportee via UI publique | Score public; minimum 1000 caracteres; cut-off interne non publie | Non publie; accuracy marketing 99.8% | [Smodin AI Detector](https://smodin.io/ai-content-detector?lang=es) |

# 2. Familles de metriques

| Famille | Formule exacte en LaTeX | Hypothese statistique sous-jacente | Attaque 1 + justification mathematique | Attaque 2 + justification mathematique | Attaque 3 + justification mathematique | DOI |
|---|---|---|---|---|---|---|
| PPL | $CE(x_{1:n})=-\frac{1}{n}\sum_{t=1}^{n}\log p_\theta(x_t\mid x_{<t})$ ; $PPL(x)=\exp(CE(x))$ | Sous $x\sim q$, $\mathbb E[CE]=H(q)+D_{KL}(q\Vert p_\theta)$ ; si $q\approx p_\theta$, le score baisse | Injection d'ancres rares : si on remplace $m$ tokens par $w_i$ avec $p_\theta(w_i\mid c_i)\ll1$, alors $\Delta CE=-\frac{1}{n}\sum_{i=1}^{m}\log p_\theta(w_i\mid c_i)>0$ | Paraphrase locale par substitutions de rang moyen : remplacer $u$ par $v$ avec $p_\theta(v\mid c)\ll p_\theta(u\mid c)$ ajoute $-\frac{1}{n}(\log p(v\mid c)-\log p(u\mid c))$ | Re-ecriture cross-model / traduction : si $q'$ s'eloigne du proxy, $D_{KL}(q'\Vert p_\theta)$ augmente donc $CE$ augmente | Mitchell 2023: 10.48550/arXiv.2301.11305 ; Sadasivan 2023: 10.48550/arXiv.2303.11156 ; Krishna 2023: 10.48550/arXiv.2303.13408 |
| Burstiness | Pour des longueurs de phrase $L_1,\dots,L_S$, $\mu_L=\frac{1}{S}\sum_jL_j$, $\sigma_L=\sqrt{\frac{1}{S}\sum_j(L_j-\mu_L)^2}$, $B=\frac{\sigma_L-\mu_L}{\sigma_L+\mu_L}$ | Les detecteurs supposent une variance de longueur faible pour les sorties lissees par LM ; l'humain produit une loi melangee | Alternance court/long : a somme de tokens quasi fixe, redistribuer les $L_j$ loin de $\mu_L$ fait croitre $\sigma_L^2=\frac{1}{S}\sum(L_j-\mu_L)^2$ | Split / merge : une partition plus inegale augmente la variance ; pour un total fixe, les partitions extremes maximisent $\sum(L_j-\mu)^2$ | Punctuation-induced multimodality : un melange de deux regimes $\lambda_1\neq\lambda_2$ a $\mathrm{Var}(L)=\mathbb E[\lambda]+\mathrm{Var}[\lambda]$, donc $B$ monte | Sadasivan 2023: 10.48550/arXiv.2303.11156 ; Liang 2023: 10.1016/j.patter.2023.100779 |
| GLTR | $R_t=\mathrm{rank}_{p_\theta(\cdot\mid x_{<t})}(x_t)$ ; $F_k=\frac{1}{n}\sum_{t=1}^{n}\mathbf1[R_t\le k]$ ; $\rho_{10/100}=\frac{\sum_t\mathbf1[R_t\le10]}{\sum_t\mathbf1[R_t\le100]}$ | Les LM sur-utilisent les tokens de tete ; le texte humain peuple davantage la longue trainee | Synonymes de rang 11-100 : si un token passe de $R_t\le10$ a $10<R_t\le100$, le numerateur baisse sans effondrer le denominateur, donc $\rho_{10/100}$ chute | Noms propres / chiffres / jargon : des tokens avec $R_t>100$ reduisent $F_{10}$ et augmentent la masse de queue | Variantes morphologiques / oralisation : deplacer un token canonique vers une variante moins frequente baisse le compte top-10 | Krishna 2023: 10.48550/arXiv.2303.13408 ; Sadasivan 2023: 10.48550/arXiv.2303.11156 |
| DetectGPT | $d(x)=\log p_\theta(x)-\frac{1}{K}\sum_{k=1}^{K}\log p_\theta(\tilde x_k)$ ; $Z(x)=\frac{d(x)}{\sigma_{\tilde x}}$ ; approximation locale $d(x)\approx-\frac{1}{2}\mathrm{tr}(H_x\Sigma)$ | Les sorties LM sont censees tomber dans des regions de courbure negative de $\log p_\theta$ ; les perturbations semantiques les degradent plus fort | Paraphrase : si $x'$ sort du voisinage du maximum local, $\|H_{x'}\|$ baisse et $d(x')\to0$ | Mixage d'auteurs / collage : la courbure locale s'annule partiellement et $\sigma_{\tilde x}$ grossit, donc $Z$ baisse par numerateur et denominateur | Bruit deja present (OCR, ponctuation, typographie) : si $\log p(\tilde x)\approx\log p(x)$, alors $d(x)\approx0$ | Mitchell 2023: 10.48550/arXiv.2301.11305 ; Krishna 2023: 10.48550/arXiv.2303.13408 |
| Watermark | $G=\sum_{t=1}^{T}g_t$ avec $g_t\in\{0,1\}$ indicateur greenlist ; sous $H_0$, $G\sim\mathrm{Binom}(T,\gamma)$ ; $z=\frac{G-\gamma T}{\sqrt{T\gamma(1-\gamma)}}$ | Le detecteur suppose un exces stable de tokens "verts" introduit par un biais de generation | Paraphrase / synonymie : si $m$ tokens verts deviennent non-verts, $\Delta z=-\frac{m}{\sqrt{T\gamma(1-\gamma)}}$ | Traduction / back-translation : changement de vocabulaire et de contexte => la greenlist du texte source n'est plus pertinente, on revient vers $H_0$ | Raccourcissement / texte mixte : a biais fixe $\epsilon$, le signal detecte evolue comme $z\approx\epsilon\sqrt{T/\gamma(1-\gamma)}$ ; si $T$ baisse, la puissance chute | Kirchenbauer 2023: 10.48550/arXiv.2301.10226 ; Krishna 2023: 10.48550/arXiv.2303.13408 |
| Classifieur supervise | $\hat y=\sigma(w^\top\phi(x)+b)$ ou, en multi-classe, $\hat y=\mathrm{softmax}(W\phi(x)+b)$ | Train/test suppose i.i.d. ; la representation $\phi(x)$ reste stable et la marge de decision est valide hors distribution | Covariate shift ESL / registre tres scolaire : si $\phi'(x)=\phi(x)+\Delta$ et $w^\top\Delta<-(w^\top\phi(x)+b)$, la decision bascule sans changement semantique | Homoglyphes / OCR / bruit de tokenisation : la semantique reste, mais l'embedding subword change ; la marge $w^\top\phi(x)+b$ se degrade | Mixage humain+IA : pour $\phi_\lambda=\lambda\phi_h+(1-\lambda)\phi_{ai}$, il existe $\lambda^\*$ tel que $w^\top\phi_\lambda+b=0$, donc incertitude maximale | Liang 2023: 10.1016/j.patter.2023.100779 ; Sadasivan 2023: 10.48550/arXiv.2303.11156 |
| Stylometrie | Distance de Mahalanobis : $S(x)=(\phi(x)-\mu_h)^\top\Sigma_h^{-1}(\phi(x)-\mu_h)$ | Le style humain / auteur est suppose stable dans un voisinage de moyenne $\mu_h$ et covariance $\Sigma_h$ | Topic shift : $\phi(x)$ change de champ lexical et $S(x)$ augmente meme pour un meme auteur | Normalisation editoriale / correction grammaticale : la variance idiolectale se contracte, $\phi(x)$ se rapproche du centre institutionnel et les distances inter-auteurs s'ecrasent | Imitation / contamination stylistique : $\phi'(x)=(1-\lambda)\phi(x)+\lambda\phi_{target}$, donc $S(x)$ peut etre reduit ou rendu ambigu sans preservation d'auteur | Liang 2023: 10.1016/j.patter.2023.100779 ; Sadasivan 2023: 10.48550/arXiv.2303.11156 |

# 3. Script

| Champ | Valeur |
|---|---|
| Fichier | `plume-naturelle/references/audit-detecteurs-fr.py` |
| Dependances | `numpy`, `transformers`, `spacy`, `fr_core_news_lg`, `torch` |
| Modele PPL/GLTR par defaut | `dbddv01/gpt2-french-small` via `PN_FRENCH_LM` |
| Sorties | `PPL proxy`, `burstiness`, `TTR`, `Zipf slope`, `sigma2_D`, `GLTR top-10/top-100`, `score 0-100` |
| Calibration | Seuils derives du mini-corpus francophone embarque |

```bash
python plume-naturelle/references/audit-detecteurs-fr.py
python plume-naturelle/references/audit-detecteurs-fr.py --text "Votre texte francais ici."
python plume-naturelle/references/audit-detecteurs-fr.py --file ./mon_texte.txt
```

# 4. Banc de test

| ID | Label | Genre | Usage |
|---|---|---|---|
| H1 | humain | journal_etudiant | ancrage daté, incident concret, rythme variable |
| H2 | humain | rapport_stage | indicateurs de gestion, details de reunion, narration situee |
| H3 | humain | memoire_pro | outillage cabinet, incident OCR, lexique metier |
| H4 | humain | note_terrain | observation de marche, prix, citation locale |
| H5 | humain | brouillon_recherche | hesitations, revisions, arbitrage explicite |
| A1 | IA brute | essai_generique | triades, connecteurs, abstraction lisse |
| A2 | IA brute | article_generique | generalites, superlatifs, causalite scolaire |
| A3 | IA brute | note_pedagogique | structuration symetrique, formule prudente |
| A4 | IA brute | synthese_rh | jargon management, teletravail, lissage |
| A5 | IA brute | commentaire_generique | macro-themes, equilibre automatique, lexique passe-partout |

| Matrice / ROC | Valeur |
|---|---|
| Matrice de confusion | calculee a l'execution par le script sur le meme corpus |
| ROC AUC | calculee a l'execution par le script sur le meme corpus |

# 5. Attaques concretes implementees

| Fonction Python | Transformation |
|---|---|
| `attaque_paraphrase_locale` | substitutions locales a cout lexical faible |
| `attaque_homoglyphes` | substitutions unicode visuellement proches |
| `attaque_back_translation_mock` | pseudo-retour de traduction sans API externe |
| `attaque_injection_variance_syntaxique` | scission / fusion de phrases pour augmenter `sigma2_D` |
| `attaque_injection_ancrage` | ajout de dates, lieux, nombres, artefacts de terrain |
| `attaque_dispersion_lexicale` | diversification de lexique abstrait repetitif |
| `attaque_deconnecteurs_rlhf` | suppression de connecteurs et formules scolaires |
| `attaque_micro_revisions` + `attaque_ponctuation_mixte` | hesitations locales, ponctuation non uniforme |

| Sortie runtime | Valeur |
|---|---|
| Avant / apres | moyennes sur les 5 textes IA bruts |
| Metriques affichees | `score_0_100`, `PPL`, `burstiness`, `sigma2_D`, `GLTR ratio` |
| Format | tableau markdown imprime par `main()` |
