# Project Architecture Blueprint

> Généré automatiquement le 3 septembre 2025

---

## 1. Architecture Detection and Analysis

### Stack technologique détecté
- **Framework principal** : Next.js (React, Node.js)
- **Langage** : TypeScript
- **UI** : Tailwind CSS
- **Gestion des assets** : Dossier `public/`
- **Organisation** : Monolithique, modulaire, orientée composants
- **Outils** : Microsoft Clarity (analytics), ESLint, Prettier

### Pattern architectural détecté
- **Pattern principal** : Monolithique modulaire (inspiré Layered + Feature-based)
- **Organisation** :
  - Séparation claire entre UI, logique métier, données statiques, utilitaires, assets
  - Découpage par feature et par type de composant
  - Utilisation de hooks personnalisés pour l’extension
- **Flux de dépendances** :
  - Les composants UI consomment des données et utilitaires
  - Les pages (dans `app/`) orchestrent la composition
  - Les assets et données sont injectés via props ou import statique

---

## 2. Architectural Overview
- **Approche** : Modularité, réutilisabilité, séparation des responsabilités, extensibilité
- **Principes** :
  - UI découplée de la logique métier
  - Données statiques séparées du code
  - Utilisation de hooks pour l’injection de comportements
  - Convention de nommage stricte
- **Frontières** :
  - `app/` = point d’entrée, composition, providers
  - `components/` = UI, widgets, features
  - `lib/` = utilitaires, hooks
  - `data/` = données statiques
  - `public/` = assets statiques
- **Adaptations** :
  - Utilisation de composants clients pour analytics (Clarity)
  - CSP personnalisée pour sécurité

---

## 3. Architecture Visualization

```
[app/ (pages, layout, providers)]
   |
   |---> [components/ (UI, features)]
   |         |
   |         |---> [lib/utils/ (hooks, helpers)]
   |         |---> [data/ (données statiques)]
   |
   |---> [public/ (assets)]
```

- **Flux** :
  - `app/` orchestre, importe les composants, applique les providers
  - `components/` consomme `lib/` et `data/`
  - `public/` est consommé par tous

```
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 .next/ 🚫 (auto-hidden)
├── 📁 .vscode/ 🚫 (auto-hidden)
├── 📁 Doc/
│   ├── 📁 favicon_io/
│   │   └── 📄 a colller dans head.txt
│   ├── 🖼️ apple-touch-icon.png
│   ├── 🖼️ favicon.ico
│   └── 🎨 web-dev-commandments.css
├── 📁 app/
│   ├── 📄 ClientClarity.tsx
│   ├── 🎨 accessibility-cards.css
│   ├── 🎨 globals.css
│   ├── 📄 layout.tsx
│   ├── 📄 not-found.tsx
│   ├── 📄 page.tsx
│   ├── 📄 provider.tsx
│   └── 🎨 web-dev-commandments.css
├── 📁 components/
│   ├── 📁 Deleted_comp/
│   │   ├── 📁 Grid/
│   │   │   └── 📄 Grid.tsx
│   │   ├── 📄 Projects.tsx
│   │   ├── 📄 Projects_test.tsx
│   │   ├── 📄 TestCursor.tsx
│   │   ├── 📄 Timeline.tsx
│   │   ├── 📄 TimelineRefacto.tsx
│   │   └── 📄 Title.tsx
│   ├── 📁 WebDevCommandments/
│   │   └── 📄 web-dev-commandments.tsx
│   ├── 📁 ui/
│   │   ├── 📁 Contact_ui/
│   │   │   ├── 📄 Input.tsx
│   │   │   ├── 📄 Label.tsx
│   │   │   └── 📄 Textarea.tsx
│   │   ├── 📁 Deleted_ui/
│   │   │   ├── 📁 Bento-projects/
│   │   │   │   ├── 📁 Orbiting-Circles/
│   │   │   │   │   ├── 📄 OrbitingCirclesLg.tsx
│   │   │   │   │   └── 📄 OrbitingCirclesSm.tsx
│   │   │   │   ├── 📄 BentoGrid.tsx
│   │   │   │   ├── 📄 Globe.tsx
│   │   │   │   ├── 📄 GradientBg.tsx
│   │   │   │   ├── 📄 GridGlobe.tsx
│   │   │   │   └── 📄 Orbiting-circles.tsx
│   │   │   ├── 📁 Projects/
│   │   │   │   ├── 📄 Bar.tsx
│   │   │   │   ├── 📄 ButtonsCard.tsx
│   │   │   │   ├── 📄 Navbar.tsx
│   │   │   │   ├── 📄 ProjectCard.tsx
│   │   │   │   ├── 📄 ProjectsNavbar.tsx
│   │   │   │   └── 📄 Sidebar.tsx
│   │   │   ├── 📄 Cursor.tsx
│   │   │   └── 📄 Tailwindcss-buttons.tsx
│   │   ├── 📁 Hero_ui/
│   │   │   ├── 📄 Spotlight.tsx
│   │   │   └── 📄 TextGenerateEffect.tsx
│   │   ├── 📁 IconCloud_ui/
│   │   ├── 📁 Projects_ui/
│   │   │   ├── 📄 BackdropModal.tsx
│   │   │   └── 📄 ProjectsRefactorButton.tsx
│   │   ├── 📁 Skills_ui/
│   │   │   └── 📄 MovingBorders.tsx
│   │   ├── 📁 Tools_ui/
│   │   │   ├── 📄 Icon-cloud.tsx
│   │   │   └── 📄 IconCloudComp.tsx
│   │   ├── 📄 Background-gradient.tsx
│   │   ├── 📄 Badge.tsx
│   │   ├── 📄 BlurImage.tsx
│   │   ├── 📄 FloatingNavbar.tsx
│   │   └── 📄 Icon.tsx
│   ├── 📄 About.tsx
│   ├── 📄 Contact.tsx
│   ├── 📄 Footer.tsx
│   ├── 📄 Hero.tsx
│   ├── 📄 MagicButton.tsx
│   ├── 📄 ProjectsRefactor.tsx
│   └── 📄 Skills.tsx
├── 📁 data/
│   ├── 📄 globe.json
│   ├── 📄 index.ts
│   ├── 📄 projectRefactoData.ts
│   └── 📄 projects.ts
├── 📁 lib/
│   └── 📁 utils/
│       ├── 📄 clarity.ts
│       └── 📄 cn.ts
├── 📁 node_modules/ 🚫 (auto-hidden)
├── 📁 public/
│   ├── 📁 about-assets/
│   │   └── 🖼️ portrait.png
│   ├── 📁 deleted/
│   │   ├── 🖼️ Logo-round.png
│   │   ├── 🖼️ b1.svg
│   │   ├── 🖼️ b4.svg
│   │   ├── 🖼️ b5.svg
│   │   ├── 🖼️ favicon.ico
│   │   ├── 🖼️ favicon.png
│   │   ├── 🖼️ levis_logo-250.png
│   │   ├── 🖼️ maa-logo-sm.png
│   │   └── 📄 robots.ts 
│   ├── 📁 gridItems-assets/
│   │   ├── 🖼️ DiscotechV2.jpg
│   │   ├── 🖼️ codeEditor-oshop-front1-s.png
│   │   ├── 🖼️ codeEditorGithub.png
│   │   └── 🖼️ grid.svg
│   ├── 📁 projectRefactor-assets/
│   │   ├── 📄 .keep
│   │   ├── 🖼️ Express-mongodb-api.png
│   │   ├── 🖼️ Recipe-Front.png
│   │   ├── 🖼️ Recipes-API.png
│   │   ├── 🖼️ discotech-transp.png
│   │   ├── 🖼️ github-explorer.png
│   │   ├── 🖼️ meteo-widget.png
│   │   ├── 🖼️ oshop-back2.png
│   │   ├── 🖼️ oshop-front1.png
│   │   ├── 🖼️ pokedex.png
│   │   ├── 🖼️ portfolio.png
│   │   ├── 🖼️ script-runner-game.png
│   │   ├── 🖼️ sound-pad.png
│   │   ├── 🖼️ spotify-cont.png
│   │   ├── 🖼️ task-manager.png
│   │   └── 🖼️ textToSpeech.png
│   ├── 📁 skills-assets/
│   │   ├── 🖼️ exp1.svg
│   │   ├── 🖼️ exp2.svg
│   │   ├── 🖼️ exp3.svg
│   │   └── 🖼️ exp4.svg
│   ├── 📁 socialMedia-assets/
│   │   ├── 🖼️ githubicon.svg
│   │   └── 🖼️ link.svg
│   ├── 📁 timelineData-assets/
│   │   ├── 🖼️ Logo.png
│   │   ├── 🖼️ dafy-logo-300.png
│   │   ├── 🖼️ ebay-logo-208.jpeg
│   │   ├── 🖼️ levis_logo.png
│   │   └── 🖼️ maa-logo-300.png
│   ├── 🖼️ android-chrome-192x192.png
│   ├── 🖼️ android-chrome-512x512.png
│   ├── 🖼️ apple-touch-icon.png
│   ├── 🖼️ favicon-16x16.png
│   ├── 🖼️ favicon-32x32.png
│   ├── 🖼️ favicon.ico
│   ├── 🖼️ footer-grid.svg
│   ├── 🖼️ git.svg
│   ├── 🖼️ logo192.png
│   ├── 🖼️ next.svg
│   ├── 📄 robots.txt
│   ├── 📄 site.webmanifest
│   ├── 📄 sitemap.xml
│   ├── 🖼️ twit.svg
│   └── 🖼️ vercel.svg
├── 📄 .env.local 🚫 (auto-hidden)
├── 📄 .eslintrc.json
├── 🚫 .gitignore
├── 📄 .hintrc
├── 📝 Project_Architecture_Blueprint.md
├── 📝 Project_Folders_Structure_Blueprint.md
├── 📖 README.md
├── 📄 components.json
├── 📄 data.ts
├── 📄 next-env.d.ts 🚫 (auto-hidden)
├── 📄 next.config.mjs
├── 📄 package-lock.json
├── 📄 package.json
├── ⚙️ pnpm-lock.yaml
├── 📄 postcss.config.mjs
├── 📄 prettier.config.js
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
├── 📄 types.ts
└── 📄 webpack.config.js
```

---

## 4. Core Architectural Components

### app/
- **Rôle** : Point d’entrée, composition, providers globaux, styles globaux
- **Structure** : layout.tsx, page.tsx, provider.tsx, fichiers CSS globaux
- **Interactions** : Importe les composants, applique les providers, gère le routage
- **Extension** : Ajout de pages, providers, middlewares

### components/
- **Rôle** : UI réutilisable, widgets, features
- **Structure** : Organisation par feature ou type, sous-dossiers pour UI, archives, etc.
- **Interactions** : Consomme données, utilitaires, assets
- **Extension** : Ajout de nouveaux composants, factorisation, sous-dossiers par feature

### lib/utils/
- **Rôle** : Hooks personnalisés, helpers
- **Structure** : Fichiers utilitaires (ex : clarity.ts, cn.ts)
- **Interactions** : Utilisé par les composants et pages
- **Extension** : Ajout de nouveaux hooks, helpers

### data/
- **Rôle** : Données statiques, mocks, configs de données
- **Structure** : Fichiers TypeScript ou JSON
- **Interactions** : Importés dans les composants/features
- **Extension** : Ajout de nouveaux fichiers de données

### public/
- **Rôle** : Assets statiques accessibles côté client
- **Structure** : Images, SVG, manifestes, organisation par feature
- **Interactions** : Utilisé dans les composants, pages, styles
- **Extension** : Ajout d’assets, organisation par sous-dossier

---

## 5. Architectural Layers and Dependencies
- **Layers** :
  - Présentation (components/)
  - Composition (app/)
  - Utilitaires (lib/)
  - Données (data/)
  - Assets (public/)
- **Règles** :
  - Pas de dépendance circulaire
  - Les composants UI ne doivent pas accéder directement à la configuration ou aux assets sans passer par props/import
  - Les hooks/utilitaires ne dépendent pas de l’UI
- **Injection** :
  - Utilisation de hooks et de props pour l’injection de dépendances

---

## 6. Data Architecture
- **Domain model** : Données structurées dans `data/` (TS/JSON)
- **Relations** : Agrégation via import/export, pas de relations complexes
- **Accès** : Import statique, pas de repository pattern (pas de backend)
- **Transformation** : Mapping via helpers ou directement dans les composants
- **Validation** : Validation légère côté composant

---

## 7. Cross-Cutting Concerns Implementation
- **Authentification/Autorisation** : Non implémenté (portfolio public)
- **Gestion des erreurs** : Try/catch dans hooks, gestion d’état dans les composants
- **Logging/Monitoring** : Microsoft Clarity (analytics), pas de logging custom
- **Validation** : Validation d’entrée dans les composants (props, types)
- **Configuration** : Fichiers racine, variables d’environnement, CSP dans next.config.mjs

---

## 8. Service Communication Patterns
- **Boundaries** : Monolithique, pas de microservices
- **Protocoles** : HTTP (Next.js), import statique
- **Communication** : Synchrone, via props/import
- **API** : Non applicable (pas d’API exposée)

---

## 9. Technology-Specific Architectural Patterns
### React/Next.js
- **Composition** : Composants fonctionnels, hooks, providers
- **State management** : State local, pas de store global
- **Effets** : useEffect, hooks custom
- **Routage** : App Router (dossier app/)
- **Data fetching** : Import statique, pas de SSR/ISR détecté
- **Optimisation** : Découpage en petits composants, lazy loading possible

### Tailwind CSS
- **Pattern** : Utilisation utilitaire, classes dans JSX
- **Organisation** : Styles globaux dans app/, spécifiques par feature

---

## 10. Implementation Patterns
- **Interfaces** : Props typées, pas d’interface complexe
- **Services** : Hooks custom (ex : useClarity)
- **Repositories** : Non applicable
- **Contrôleurs** : Non applicable
- **Domain Model** : Types et interfaces dans data/

---

## 11. Testing Architecture
- **Stratégie** : Non détectée (tests à ajouter)
- **Recommandation** :
  - Unitaires : à côté des composants ou dans __tests__/
  - Intégration : à prévoir pour les hooks et providers
  - Outils : Jest, React Testing Library (à intégrer)

---

## 12. Deployment Architecture
- **Topologie** : Déploiement statique ou serverless (Vercel, Netlify, etc.)
- **Adaptations env** : Variables d’environnement, CSP dynamique
- **Dépendances runtime** : Next.js, Node.js, Tailwind
- **Containerisation** : Non détectée (possible via Docker)
- **Cloud** : Prêt pour hébergement cloud

---

## 13. Extension and Evolution Patterns
- **Ajout de features** :
  - Créer un composant dans components/ ou une page dans app/
  - Organiser par feature ou type
  - Ajouter les assets dans public/
  - Ajouter les données dans data/
- **Modification** :
  - Refactoriser en gardant la séparation des responsabilités
  - Mettre à jour ce blueprint et la documentation
- **Intégration** :
  - Ajouter des hooks dans lib/utils/
  - Ajouter des providers dans app/

---

## 14. Architectural Pattern Examples

### Séparation des couches
```tsx
// components/ui/Badge.tsx
export function Badge({ label }: { label: string }) {
  return <span className="px-2 py-1 bg-gray-200 rounded">{label}</span>;
}

// Utilisation dans app/page.tsx
import { Badge } from '../components/ui/Badge';

export default function Home() {
  return <Badge label="Portfolio" />;
}
```

### Hook custom
```ts
// lib/utils/clarity.ts
import { useEffect } from 'react';
export function useClarity() {
  useEffect(() => {
    // ...initialisation Clarity
  }, []);
}
```

### Extension d’un composant
```tsx
// components/ui/FloatingNavbar.tsx
export function FloatingNavbar({ children }: { children: React.ReactNode }) {
  return <nav className="fixed top-0 w-full">{children}</nav>;
}
```

---

## 15. Architecture Governance
- **Consistance** : Convention de nommage, structure de dossier, Prettier, ESLint
- **Automatisation** : Linting, formatage, scripts de build
- **Revue** : Documentation (ce blueprint, README), revue manuelle

---

## 16. Blueprint for New Development
- **Workflow** :
  - Créer un composant dans components/ ou une page dans app/
  - Ajouter les hooks dans lib/utils/
  - Ajouter les assets dans public/
  - Ajouter les données dans data/
  - Ajouter les tests dans __tests__/
- **Templates** :
  - Composant : `components/ui/NouveauComposant.tsx`
  - Hook : `lib/utils/useNouveauHook.ts`
  - Page : `app/ma-nouvelle-page/page.tsx`
- **Pièges à éviter** :
  - Mélanger logique métier et UI
  - Ajouter des dépendances circulaires
  - Oublier la documentation
  - Négliger les tests
- **Mise à jour** :
  - Mettre à jour ce document à chaque refonte majeure

---

> Ce blueprint doit être révisé à chaque évolution majeure de l’architecture ou de la stack.
