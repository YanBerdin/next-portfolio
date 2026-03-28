---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:

- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:

- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

## When to Use This Skill

Use this skill when the user requests:

- Building web components, pages, or applications with a focus on design quality
- Creating distinctive, polished frontend interfaces
- Implementing high-impact visual effects and animations
- Avoiding generic AI aesthetics in frontend design

---

## Project Context

Rouge Cardinal Company is a professional theater company website built with:

- **Frontend**: Next.js 16 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (Auth + PostgreSQL)
- **Deployment**: Vercel

**Target Audience**:

- General public (theater enthusiasts)
- Press professionals
- Internal administrators
- Cultural organizers

## Design Philosophy

**Core Aesthetic**: Elegant, theatrical, refined yet expressive

**Tone**: Pick from these theatrical-inspired directions:

- **Dramatic Minimalism**: Generous negative space with powerful red accents
- **Editorial Sophistication**: Magazine-like layouts with serif headlines
- **Dark Stage**: Deep blacks with spotlight-like highlights
- **Theatrical Contrast**: Bold asymmetry with dramatic shadows
- **Refined Brutalism**: Raw geometry softened with warm tones

**Brand Identity**:

- Cardinal red (`#ad0000`) as the signature color
- Warm beige (`#faf4e7`) for contrast and readability
- Deep blacks (`#1C1C1C`) for theatrical depth
- Sophisticated serif displays paired with clean sans-serif UI

## Visual Design Principles

### Typography Hierarchy

```css
/* Display Typography (Theatrical Headlines) */
H1/H2 Large: Playfair Display, Cormorant Garamond, or Cinzel
  - Use sparingly for hero sections and major announcements
  - Pair with dramatic letter-spacing and generous line-height
  - Size: 3.5rem–6rem on desktop

/* Body & UI Typography */
Body/UI: Geist Sans (already configured)
  - Clean, readable, modern
  - Letter-spacing: var(--tracking-normal) = 0.025em
  - Use for navigation, body text, buttons, forms

/* Implementation Rules */
- Reserve display serifs for H1/H2 only
- Use Geist Sans for H3–H6 with weight variations
- Maintain consistent vertical rhythm (--space-* variables)
```

### Color Palette & Usage

**Primary Palette** (from globals.css):

```css
--primary: #ad0000          /* Cardinal Red - CTAs, accents */
--background: #faf4e7       /* Warm Beige - light mode */
--foreground: #1C1C1C       /* Deep Black - text */
--border-primary: #e84133   /* Accent borders */

/* Dark Mode */
--background (dark): #1C1C1C
--foreground (dark): #faf4e7
```

**Color Application Rules**:

- **Cardinal Red**: Primary CTAs, hover states, active links, dramatic accents
- **Deep Black**: Backgrounds for hero sections, cards in light mode
- **Warm Beige**: Alternate sections, press areas, light backgrounds
- **Use Sparingly**: Red should be impactful, not overwhelming (10-15% of screen)

### Spatial Composition

**Layout Principles**:

- **Generous Negative Space**: Use at least `--space-2xl` (4rem+) between sections
- **Asymmetric Grids**: Break traditional center alignment for visual interest
- **Diagonal Flow**: Guide eye movement with angled elements or overlays
- **Overlap Technique**: Images slightly overflow card edges for dynamism
- **Dark-First Approach**: Hero and upstream sections in dark, info/press in beige

**Spacing Scale** (use CSS variables):

```css
--space-sm: 0.5rem
--space-md: 1rem
--space-lg: 1.5rem
--space-xl: 2rem
--space-2xl: 4rem
--space-3xl: 6rem
```

### Visual Effects & Atmosphere

**Shadows** (theatrical depth):

```css
/* Soft base for cards */
--shadow-soft: 0 10px 30px rgba(10,10,10,0.25)

/* Dramatic hover */
--shadow-hover: 0 18px 45px rgba(10,10,10,0.32)

/* Use from globals.css */
--shadow-lg, --shadow-xl, --shadow-2xl
```

**Image Treatment**:

- Increase contrast (+10-15%)
- Add subtle grain texture overlay
- Apply vignette for edge darkening
- Use `object-cover` with gradient masks for text legibility
- Consistent aspect ratios per content type

**Backgrounds & Textures**:

- Gradient meshes with cardinal-to-black transitions
- Noise textures (subtle, < 5% opacity)
- Layered transparencies for glass effects
- Custom `.liquid-glass` utilities (already in globals.css)

## Component Design Guidelines

### Buttons & CTAs

**Primary CTA** (Cardinal Red):

```tsx
<Button
  variant="default" 
  size="lg" 
  asChild>
</Button>
```

- Filled cardinal red background
- White text with text-shadow
- Medium rounded corners (--radius: 0.5rem)
- Box-shadow for depth
- **Use for**: Booking, donations, press kit downloads

**Secondary CTA** (Outlined):

```tsx
<Button
  variant="outline"
  size="lg"
  className="bg-white/30 border-white/50 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
  asChild>
</Button>
```

- Subtle border with hover fill
- Glassmorphism effect on hover
- **Use for**: Alternative actions, navigation

**Rules**:

- Only ONE primary CTA per screen region
- Secondary for supporting actions
- Minimum 44×44px touch targets (accessibility)

### Cards & Content Blocks

**Standard Card Pattern**:

```tsx
<Card className="">
  {/* Content with generous padding */}
</Card>
```

**Hover Behaviors**:

- `translateY(-2px)` lift effect
- Shadow increase (--shadow-lg → --shadow-xl)
- Scale subtle elements (0.98 → 1)
- Duration: 300ms with ease-out

### Navigation & Headers

**Header Behavior** (already implemented):

- Transparent on page load
- Glass blur on scroll (`.header-scrolled`)
- Smooth backdrop-filter transition
- Maintains logo stability (no floating animations)

**Header Variants**:

- `.liquid-glass`: Standard glassmorphism
- `.liquid-glass-header`: Navigation bars
- `.liquid-glass-mobile`: Mobile menu overlays

**Navigation Links**:

```tsx
<Link className="nav-link-glass">
  Spectacles
</Link>
```

- Subtle hover states with contrast adaptation
- Active state indication (`.active`)
- Accessible focus rings (cardinal red)

## Animation & Motion Strategy

### Page Load Animation

**Hero Reveal** (implement once per page):

```css
// Stagger appearance: H1 → subheading → CTAs
animation: fade-in-up 420ms cubic-bezier(.22,.9,.32,1)
animation-delay: 0ms, 120ms, 240ms
```

**Timing**:

- H1: 0ms delay, 420ms duration
- Subheading: 120ms delay, 380ms duration
- CTAs: 240ms delay, 320ms duration
- Use `translate-y: 20px → 0` + opacity transition

### Micro-Interactions

**Buttons**:

```css
hover: scale(0.98 → 1) + background darken
active: scale(0.96) + shadow reduce
transition: 180ms ease-out
```

**Cards**:

```css
hover: translateY(-2px) + shadow increase
transition: 300ms cubic-bezier(.4,0,.2,1)
```

**Images/Media**:

```css
hover: scale(1.05) + filter adjust
transition: 500ms ease-out
overflow: hidden (on parent)
```

### Accessibility Considerations

- **Reduced Motion**: Respect `prefers-reduced-motion`
- **No Autoplay**: Avoid long autoplay animations (>500ms)
- **Keyboard Focus**: Visible rings with `--ring: #ad0000`
- **Carousel Controls**: Arrow keys + `aria-live` regions

## Content-Specific Guidelines

### Hero Sections

**Layout**:

- Full viewport height (min-h-screen)
- Dark background with dramatic image
- Large serif headline (4-6rem)
- Generous padding (space-3xl)
- Single primary CTA, centered or left-aligned

**Image Treatment**:

- Dark overlay (40-60% opacity)
- Vignette effect for text legibility
- High contrast image with grain texture

### Show/Production Cards

**Structure**:

```tsx
            <Card
              key={item.id}
              className={`card-hover animate-fade-in-up w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm flex flex-col`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <div
                  className="h-48 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-center card-date text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(item.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors card-title">
                  <Link href={`/actualites/${item.id}`}>{item.title}</Link>
                </h3>
                <p className="leading-relaxed card-text">
                  {item.short_description}
                </p>
              </CardContent>

              <CardFooter className="mt-auto">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className=""
                  asChild
                >
                  <Link href={`/actualites/${item.id}`}>
                    Lire la suite
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
```

**Visual Hierarchy**:

- Image dominance (60% of card height)
- Clear title hierarchy
- Metadata in muted colors
- Action buttons at bottom

### Press/Professional Sections

**Aesthetic Shift**:

- Switch to warm beige background (`--background`)
- Increase contrast for readability
- Use structured layouts (grids, lists)
- Professional typography (no decorative serifs here)

**Components**:

- Download buttons with file icons
- Contact forms with clear labels
- Media gallery with thumbnails

## Implementation Best Practices

### shadcn/ui Integration

**Base Components** (use as building blocks):

- Button, Input, Card, Dialog, Select
- Override with design tokens via Tailwind config
- Create wrappers for consistency:

```tsx
// components/ui/primary-button.tsx
export function PrimaryButton({ children, ...props }) {
  return (
    <Button className="liquid-glass-black" {...props}>
      {children}
    </Button>
  )
}
```

### CSS Variables Usage

**Always prefer** CSS variables from globals.css:

```tsx
// Good
className="bg-primary text-primary-foreground"

// Avoid
className="bg-[#ad0000] text-white"
```

**Custom Utilities**:

- `.liquid-glass` for glassmorphism
- `.hero-gradient` for hero backgrounds
- `.card-hover` for interactive cards
- `.nav-link-glass` for navigation links

### Performance Optimization

**Images**:

- Use Next.js `<Image>` component
- Lazy loading for below-fold content
- WebP with fallbacks
- Responsive sizes via srcset

**Animations**:

- CSS transforms over position/width changes
- `will-change` for frequently animated elements
- Limit simultaneous animations (max 3-4)

**Bundle Size**:

- Import only needed shadcn components
- Tree-shake unused CSS utilities
- Code-split heavy components

## Quality Checklist

Before delivering any frontend component, verify:

- [ ] Uses project color palette (cardinal red, warm beige, deep black)
- [ ] Typography hierarchy follows rules (serif for H1/H2 large only)
- [ ] Spacing uses design tokens (--space-* variables)
- [ ] Shadows applied correctly (--shadow-* utilities)
- [ ] Animations respect reduced-motion preference
- [ ] Touch targets minimum 44×44px
- [ ] Keyboard navigation functional
- [ ] Focus states visible (cardinal red rings)
- [ ] Contrast ratios meet WCAG AA (4.5:1 body, 3:1 large text)
- [ ] Dark mode tested and functional
- [ ] Mobile responsive (breakpoints: 640px, 768px, 1024px, 1280px)
- [ ] No generic AI aesthetics (Inter, purple gradients, predictable layouts)
- [ ] Theatrical sophistication maintained throughout

## Anti-Patterns to Avoid

**Never Use**:

- Generic font families (Inter, Roboto, Arial except as fallbacks)
- Purple gradients on white (cliché AI design)
- Predictable center-aligned hero sections
- Overused Space Grotesk or similar trendy fonts
- Floating/bouncing logo animations
- Auto-playing carousels without pause controls
- Low-contrast text on cardinal red without treatment
- Excessive glass effects (use sparingly for impact)

## Collaboration Notes

**For Developers**:

- All color values in globals.css as CSS variables
- Tailwind config extends with project tokens
- shadcn components in `components/ui/`
- Custom utilities in `@layer components`

**For Designers**:

- Design tokens documented in globals.css
- Component library: shadcn/ui base + custom wrappers
- Spacing scale: 0.5rem increments up to 6rem
- Always design with dark mode variant

**For Content Creators**:

- Image specs: 1920×1080 for hero, 800×600 for cards
- Video: 16:9 aspect ratio, max 2min autoplay
- Copy: Short headlines (< 60 chars), concise descriptions (< 160 chars)
