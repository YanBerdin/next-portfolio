Implémentation touch-hitbox

## 🎯 Objectif

Implémenter un système de boutons avec effet shrink sans tremblement, conforme WCAG.

## 📋 Prérequis

- Projet avec Tailwind CSS
- Accès aux fichiers de configuration
- Terminal pour recompiler CSS

---

## ÉTAPE 1 : Création du plugin

### 1.1 Créer le fichier plugin

```bash
# À la racine du projet
touch touch-hitbox-plugin.js
```

### 1.2 Contenu du plugin

Copiez ce code exact dans `touch-hitbox-plugin.js` :

```javascript
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function({ addUtilities }) {
  addUtilities({
    '.touch-hitbox': {
      position: 'relative',
    },
    '.touch-hitbox::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      minWidth: '44px',
      minHeight: '44px',
      zIndex: '0',
    },
  })
})
```

---

## ÉTAPE 2 : Configuration Tailwind

### 2.1 Modifier tailwind.config.js

Ajoutez le plugin dans la section `plugins` :

```javascript
module.exports = {
  content: [
    // vos chemins existants...
  ],
  theme: {
    // votre thème existant...
  },
  plugins: [
    require('./touch-hitbox-plugin.js'), // ← AJOUTER CETTE LIGNE
    // autres plugins existants...
  ],
}
```

### 2.2 Recompiler CSS

```bash
# Si vous utilisez npm
npm run build-css
# ou
npm run dev

# Si vous utilisez yarn
yarn build-css
# ou 
yarn dev
```

---

## ÉTAPE 3 : Implémentation HTML

### 3.1 Structure de base

**AVANT (avec tremblement) :**

```html
<button class="bg-blue-500 hover:scale-95 transition-transform">
  Cliquer ici
</button>
```

**APRÈS (sans tremblement) :**

```html
<button class="touch-hitbox overflow-hidden bg-blue-500">
  <span class="block transition-transform duration-150 hover:scale-95">
    Cliquer ici
  </span>
</button>
```

### 3.2 Points clés à retenir

- `touch-hitbox overflow-hidden` → sur le parent
- `hover:scale-XX transition-transform` → sur l'enfant span
- `block` → pour que le span prenne toute la largeur

---

## ÉTAPE 4 : Exemples d'usage

### 4.1 Bouton simple

```html
<button class="touch-hitbox overflow-hidden bg-blue-500 text-white px-6 py-3 rounded">
  <span class="block transition-transform duration-150 hover:scale-95">
    Bouton simple
  </span>
</button>
```

### 4.2 Bouton avec icône

```html
<button class="touch-hitbox overflow-hidden bg-green-500 text-white px-4 py-2 rounded-lg">
  <span class="flex items-center gap-2 transition-transform duration-200 hover:scale-90">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 12l-4-4h8l-4 4z"/>
    </svg>
    Avec icône
  </span>
</button>
```

### 4.3 Bouton card/carte

```html
<div class="touch-hitbox overflow-hidden bg-white shadow-lg rounded-lg p-6 cursor-pointer">
  <div class="transition-transform duration-300 ease-out hover:scale-98">
    <h3 class="font-bold text-lg">Titre de la carte</h3>
    <p class="text-gray-600">Description...</p>
  </div>
</div>
```

---

## ÉTAPE 5 : Test et validation

### 5.1 Tests à effectuer

1. **Desktop** : Survoler le bouton, vérifier absence de tremblement
2. **Mobile** : Tester sur vraie device ou émulateur
3. **DevTools** : Inspecter le pseudo-élément `::before`
4. **Accessibilité** : Vérifier la taille de cible avec l'inspecteur

### 5.2 Debugging avec DevTools

```bash
# Dans l'inspecteur, chercher :
.touch-hitbox::before {
  min-width: 44px;  ← Doit être présent
  min-height: 44px; ← Doit être présent
  position: absolute; ← Doit être présent
}
```

---

## ÉTAPE 6 : Personnalisation avancée

### 6.1 Échelles personnalisées

```html
<!-- Shrink léger -->
<span class="... hover:scale-98">Contenu</span>

<!-- Shrink moyen -->
<span class="... hover:scale-95">Contenu</span>

<!-- Shrink fort -->
<span class="... hover:scale-90">Contenu</span>
```

### 6.2 Animations personnalisées

```html
<!-- Animation lente et fluide -->
<span class="transition-transform duration-300 ease-out hover:scale-95">
  Contenu
</span>

<!-- Animation rapide -->
<span class="transition-transform duration-100 hover:scale-95">
  Contenu
</span>
```

---

## 🚨 Points d'attention

### ❌ Erreurs courantes

1. Oublier `overflow-hidden` sur le parent
2. Mettre `hover:scale-XX` sur le parent au lieu de l'enfant
3. Ne pas recompiler CSS après ajout du plugin
4. Oublier le `block` sur le span

### ✅ Bonnes pratiques

1. Toujours tester sur mobile
2. Utiliser des valeurs de scale subtiles (95-98%)
3. Prévoir des animations de durée raisonnable (150-300ms)
4. Garder une hiérarchie HTML propre

---

## 📱 Conformité WCAG

Cette solution garantit :

- ✅ **Taille minimum 44x44px** pour toutes les cibles
- ✅ **Zone de clic stable** indépendante des effets visuels
- ✅ **Compatible** avec tous types d'interaction (souris, touch, clavier)

---

## 🔧 Troubleshooting

| Problème | Solution |
|----------|----------|
| Tremblement persiste | Vérifier que `hover:` est sur l'enfant |
| Plugin non reconnu | Recompiler CSS après modification config |
| Effet non visible | Ajouter `block` sur le span enfant |
| Zone trop petite | Le plugin force 44px minimum automatiquement |

**En cas de problème persistant :** Inspecter l'élément et vérifier la présence du pseudo-élément `::before` avec les bonnes propriétés CSS.
