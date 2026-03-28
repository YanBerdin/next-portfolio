# Instruction : Implémentation WCAG 2.5.5 Target Size (Level AAA)

## Contexte validé

Le Success Criterion 2.5.5 Target Size de WCAG 2.1 (niveau AAA) exige que les cibles d'entrée pointer soient d'au moins 44 par 44 pixels CSS, sauf exceptions définies.

## Règles d'implémentation obligatoires

### 1. Taille minimale standard

- **Règle principale** : Tous les éléments interactifs (boutons, liens, icônes cliquables) doivent mesurer **au minimum 44 × 44 pixels CSS**
- **Unité** : Utiliser exclusivement les pixels CSS, pas les pixels physiques
- **Application** : Cette règle s'applique à la zone tactile/cliquable totale, pas seulement à l'élément visible

### 2. Exceptions autorisées (ne pas appliquer la règle 44x44)

#### Exception 1 : Cibles équivalentes

- Si plusieurs cibles effectuent la même action sur la page
- Une seule cible doit respecter 44×44px, les autres peuvent être plus petites
- **Code à implémenter** : Identifier les doublons fonctionnels et s'assurer qu'au moins un respecte la taille

#### Exception 2 : Éléments inline dans le texte

- Les liens dans une phrase ou un bloc de texte sont exclus
- Inclut : liens dans paragraphes, notes de bas de page, icônes d'aide en fin de phrase
- **Important** : Si le lien constitue la phrase entière, alors la règle 44×44 s'applique

#### Exception 3 : Contrôle par l'agent utilisateur

- Éléments dont la taille est déterminée par le navigateur
- L'auteur n'a pas modifié la taille via CSS
- **Code** : Ne pas forcer de styles sur les contrôles natifs sauf nécessité

#### Exception 4 : Présentation essentielle

- Quand modifier la taille changerait fondamentalement l'information
- Utiliser avec parcimonie et justification documentée

### 3. Implémentation technique

#### CSS requis

```css
/* Taille minimale pour boutons/liens */
.interactive-element {
    min-width: 44px;
    min-height: 44px;
    /* Ou utiliser padding pour atteindre 44x44 */
}

/* Zone tactile étendue si élément visuel plus petit */
.small-visual-element {
    position: relative;
    /* L'élément visuel peut rester petit */
}

.small-visual-element::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 44px;
    min-height: 44px;
    /* Zone tactile invisible mais fonctionnelle */
}
```

#### Vérifications automatisées à implémenter

1. Scanner tous les éléments avec `cursor: pointer`, `onclick`, `href`, `role="button"`
2. Mesurer la zone cliquable réelle (incluant padding)
3. Alerter si < 44×44px sans exception valide
4. Vérifier l'espacement entre cibles adjacentes

### 4. Bonnes pratiques complémentaires

#### Recommandations au-delà du minimum

- **Cibles fréquentes** : Préférer 48×48px ou plus
- **Actions irréversibles** : Augmenter la taille et ajouter confirmation
- **Bords d'écran** : Prévoir plus d'espace
- **Séquences d'actions** : Tailles généreuses pour fluidifier le parcours

#### Gestion responsive

```css
/* Adaptation mobile */
@media (max-width: 768px) {
    .interactive-element {
        min-width: 48px; /* Plus généreux sur mobile */
        min-height: 48px;
    }
}
```

### 5. Tests de validation requis

#### Contrôles manuels

- [ ] Mesurer visuellement les zones tactiles
- [ ] Tester sur appareil tactile réel
- [ ] Vérifier avec des utilisateurs ayant des difficultés motrices si possible

#### Contrôles automatisés

- [ ] Audit des dimensions calculées via JavaScript
- [ ] Test des zones de chevauchement
- [ ] Validation des exceptions appliquées

### 6. Documentation obligatoire

Pour chaque exception appliquée, documenter :

- Type d'exception utilisée
- Justification technique
- Alternative d'accessibilité proposée (si applicable)

## Objectif d'accessibilité

Cette implémentation vise à rendre les interfaces utilisables par :

- Personnes avec tremblements ou faible dextérité
- Utilisateurs malvoyants
- Personnes utilisant un seul doigt/poing
- Navigation en environnement instable (transports)
- Utilisation d'une seule main

**Priorité** : Niveau AAA - Implémentation recommandée pour une accessibilité optimale
