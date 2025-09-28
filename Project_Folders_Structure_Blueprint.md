# Project Folder Structure Blueprint

## 1. Structural Overview

Ce projet est une application Next.js (React/Node.js) monolithique, orientée frontend, avec une structure modulaire et des conventions modernes (TypeScript, Tailwind, composants réutilisables, organisation par feature et par UI). L’organisation privilégie la séparation claire entre logique métier, UI, données, assets statiques et configuration.

- **Organisation principale** :
  - `app/` : Entrée principale, pages, providers, styles globaux, layout, composants clients spécifiques
  - `components/` : Composants UI réutilisables, organisés par domaine ou usage
  - `public/` : Assets statiques (images, SVG, manifestes, etc.)
  - `data/` : Données statiques, mocks, fichiers de configuration de données
  - `lib/` : Utilitaires, hooks personnalisés, helpers
  - `Doc/` : Documentation, assets de référence
  - Fichiers racine : configuration, scripts, manifestes, documentation

## 2. Directory Visualization (Markdown List, profondeur 3)

- app/
  - ClientClarity.tsx
  - layout.tsx
  - not-found.tsx
  - page.tsx
  - provider.tsx
  - accessibility-cards.css
  - globals.css
  - web-dev-commandments.css
- components/
  - About.tsx
  - Contact.tsx
  - Footer.tsx
  - Hero.tsx
  - MagicButton.tsx
  - ProjectsRefactor.tsx
  - Skills.tsx
  - WebDevCommandments/
    - web-dev-commandments.tsx
  - ui/
    - FloatingNavbar.tsx
    - Background-gradient.tsx
    - Badge.tsx
    - BlurImage.tsx
    - ... (autres sous-composants UI)
  - Deleted_comp/
    - (anciens composants, archives)
- public/
  - favicon.ico
  - logo192.png
  - ... (assets, images, SVG, manifestes, etc.)
- data/
  - index.ts
  - projects.ts
  - projectRefactoData.ts
  - globe.json
- lib/
  - utils/
    - clarity.ts
    - cn.ts
- Doc/
  - web-dev-commandments.css
  - ... (autres docs, images)
- .vscode/
  - settings.json
  - mcp.json
- Fichiers racine :
  - package.json, tsconfig.json, next.config.mjs, tailwind.config.ts, postcss.config.mjs, README.md, etc.

## 3. Key Directory Analysis

### app/
- Point d’entrée Next.js App Router (pages, layout, providers, styles globaux)
- Composants clients spécifiques (ex : ClientClarity)
- Styles globaux et spécifiques (accessibility-cards.css, web-dev-commandments.css)

### components/
- Composants UI réutilisables, organisés par domaine ou usage
- Dossiers par feature ou par type de composant (ui/, WebDevCommandments/, Deleted_comp/)
- Favorise la réutilisation et la maintenance

### public/
- Tous les assets statiques accessibles côté client (images, SVG, manifestes, etc.)
- Organisation par type ou par feature (projectRefactor-assets/, skills-assets/, socialMedia-assets/)

### data/
- Données statiques, mocks, fichiers de configuration de données pour les composants

### lib/
- Utilitaires, hooks personnalisés, helpers (ex : clarity.ts pour Microsoft Clarity)

### Doc/
- Documentation, assets de référence, anciens styles ou images

## 4. File Placement Patterns
- **Composants UI** : `components/` (par feature ou par type)
- **Pages/Entrées** : `app/` (layout, page, not-found, provider)
- **Données statiques** : `data/`
- **Assets** : `public/` (organisation par sous-dossier)
- **Utilitaires/Hooks** : `lib/utils/`
- **Styles globaux** : `app/globals.css`, `app/web-dev-commandments.css`, `app/accessibility-cards.css`
- **Configuration** : fichiers racine (`package.json`, `tsconfig.json`, `next.config.mjs`, etc.)
- **Tests** : (non détecté, à ajouter dans `__tests__/` ou à côté des composants)

## 5. Naming and Organization Conventions
- **Fichiers** : PascalCase pour composants, camelCase pour utilitaires, kebab-case pour CSS
- **Dossiers** : kebab-case ou camelCase, selon usage
- **Composants** : nom explicite, suffixe par type si besoin (ex : ...Button, ...Navbar)
- **Assets** : organisation par feature ou usage (projectRefactor-assets, skills-assets)
- **Configuration** : nommage standard (package.json, tsconfig.json, etc.)

## 6. Navigation and Development Workflow
- **Entrée principale** : `app/layout.tsx`, `app/page.tsx`
- **Ajout de features** : créer un dossier ou fichier dans `components/` ou `app/`
- **Ajout d’assets** : placer dans `public/` (sous-dossier si besoin)
- **Ajout de données** : placer dans `data/`
- **Ajout de hooks/utils** : placer dans `lib/utils/`
- **Ajout de styles** : dans `app/` ou par feature dans un sous-dossier
- **Tests** : à ajouter (recommandé : `__tests__/` ou à côté des composants)

## 7. Build and Output Organization
- **Build config** : `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`
- **Sortie build** : `.next/` (généré, non versionné)
- **Assets buildés** : dans `public/` (pour export statique)
- **Différences dev/prod** : gérées par Next.js et les fichiers de config

## 8. Extension and Evolution
- **Nouveaux composants** : créer dans `components/` (par feature ou type)
- **Nouveaux hooks/utils** : dans `lib/utils/`
- **Nouveaux assets** : dans `public/` (organiser par usage)
- **Nouvelles pages** : dans `app/`
- **Tests** : à ajouter pour chaque feature/composant

## 9. Structure Templates

### Nouveau composant UI
```
components/NomFeature/NouveauComposant.tsx
components/ui/NouveauComposant.tsx
```

### Nouveau hook/utilitaire
```
lib/utils/useNouveauHook.ts
```

### Nouvelle page
```
app/ma-nouvelle-page/page.tsx
```

### Nouveau style spécifique
```
app/ma-feature/ma-feature.css
```

### Nouveau test (recommandé)
```
__tests__/NouveauComposant.test.tsx
components/NomFeature/__tests__/NouveauComposant.test.tsx
```

## 10. Structure Enforcement
- **Validation** : ESLint, Prettier, conventions Next.js, scripts de build
- **Documentation** : ce blueprint, README.md, commentaires dans le code
- **Évolution** : mettre à jour ce document à chaque refonte majeure de la structure

---
Dernière mise à jour : septembre 2025
