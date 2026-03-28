# Instructions pour Coding Agent - Solution touch-hitbox

## CONTEXTE : Problème à résoudre

Quand on applique un effet `hover:scale-90` ou similaire directement sur un bouton, la bounding box se réduit, le curseur sort du hit-area, l'état normal se réactive, puis le curseur revient → cycle infini de tremblement.

## SOLUTION : Architecture touch-hitbox

### 1. Principe de séparation

- **Zone de détection** (hit-area) : pseudo-élément `::before` fixe, minimum 44x44px
- **Zone visuelle** : élément enfant qui peut rétrécir sans affecter la détection
- **Résultat** : Le curseur reste toujours dans la hit-area stable

### 2. Structure HTML obligatoire

```html
<button class="touch-hitbox overflow-hidden">
  <span class="block transition-transform duration-150 transform hover:scale-95">
    Contenu du bouton
  </span>
</button>
```

**Classes requises :**

- `touch-hitbox` : Active le pseudo-élément de hit-area
- `overflow-hidden` : Masque le débordement lors du scale
- Sur l'enfant : `hover:scale-XX` + transitions

### 3. Plugin Tailwind requis

Fichier : `touch-hitbox-plugin.js`

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

### 4. Configuration Tailwind

Dans `tailwind.config.js` :

```javascript
module.exports = {
  // ... autres configs
  plugins: [
    require('./touch-hitbox-plugin.js'),
    // autres plugins...
  ],
}
```

## RÈGLES D'IMPLÉMENTATION

### ✅ À FAIRE

1. **Toujours** encapsuler le contenu dans un `<span>` ou `<div>`
2. **Toujours** appliquer `hover:scale-XX` sur l'enfant, jamais sur `.touch-hitbox`
3. **Toujours** ajouter `overflow-hidden` sur le parent `.touch-hitbox`
4. **Respecter** la taille minimum 44x44px (définie dans le plugin)
5. **Tester** sur mobile et desktop

### ❌ À ÉVITER

1. **Jamais** de `hover:scale-XX` directement sur `.touch-hitbox`
2. **Jamais** modifier le `::before` pour d'autres effets visuels
3. **Ne pas** utiliser `transform` sur le parent `.touch-hitbox`
4. **Ne pas** oublier `overflow-hidden`

### 5. Variations acceptées

```html
<!-- Avec icône -->
<button class="touch-hitbox overflow-hidden">
  <span class="flex items-center gap-2 transition-transform duration-150 hover:scale-95">
    <Icon />
    Texte
  </span>
</button>

<!-- Scale différent -->
<button class="touch-hitbox overflow-hidden">
  <span class="block transition-transform duration-200 hover:scale-90">
    Contenu
  </span>
</button>

<!-- Avec ease-out -->
<button class="touch-hitbox overflow-hidden">
  <span class="block transition-transform duration-300 ease-out hover:scale-95">
    Contenu
  </span>
</button>
```

## CONFORMITÉ WCAG

- ✅ Taille minimum 44x44px garantie par `minWidth/minHeight`
- ✅ Zone de clic stable indépendante de l'effet visuel
- ✅ Compatible avec tous les dispositifs de pointage

## DÉBOGAGE

Si le tremblement persiste :

1. Vérifier que `hover:scale-XX` est sur l'enfant, pas le parent
2. Vérifier la présence de `overflow-hidden`
3. Vérifier que le plugin est bien chargé (recompiler CSS)
4. Inspecter le pseudo-élément `::before` dans les DevTools
