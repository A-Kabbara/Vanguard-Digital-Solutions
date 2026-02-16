# Phase 1: Design Foundation - Research

**Researched:** 2026-02-16
**Domain:** CSS design tokens, typography system, color palette, layout foundations for a dark-theme single-page agency site
**Confidence:** HIGH

## Summary

Phase 1 replaces the existing site's entire visual foundation -- HSL color tokens, Syne/Manrope/IBM Plex Mono fonts, glassmorphism variables, and inconsistent breakpoints -- with a new three-tier design token system, new font stack (Instrument Serif + Inter + JetBrains Mono), the specified off-black/off-white/indigo color palette, a fluid type scale, a consistent spacing scale, and three consolidated responsive breakpoints.

The technical domain is well-understood: CSS custom properties, `clamp()` for fluid values, Google Fonts loading, and media queries. No external libraries are needed. The primary risk areas are (a) the accent color `#635BFF` failing WCAG AA for normal body text -- verified below, and (b) Instrument Serif being limited to a single weight (Regular 400) plus Italic, which constrains heading weight hierarchy.

**Primary recommendation:** Implement the three-tier token system using hex values (not OKLCH) for primitives, with `color-mix()` reserved for derived hover/glow states. Use hex because the spec defines exact hex values and hex requires no browser support concerns. Define all tokens in a single `css/tokens.css` file, reset in `css/reset.css`, typography in `css/typography.css`, and layout in `css/layout.css`. Load via four `<link>` tags in `index.html`, replacing all current CSS links.

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|---|---|---|---|
| CSS Custom Properties | Living Standard | Three-tier design token system | Native, zero-dependency, supported in all evergreen browsers (97%+). Exactly what the requirement DES-01 calls for. |
| CSS `clamp()` | Living Standard | Fluid typography and spacing | 96%+ support. The existing site already uses this correctly. Required by DES-08. |
| Google Fonts API v2 | Current | Load Instrument Serif, Inter, JetBrains Mono | Free, CDN-cached, `font-display: swap` support. Required by DES-02. |
| CSS Media Queries | Living Standard | Three responsive breakpoints (desktop default, 1024px, 640px) | Universal support. Required by LAY-06. |

### Supporting

| Technology | Version | Purpose | When to Use |
|---|---|---|---|
| `color-mix()` | Living Standard | Derived hover/border/glow states from accent | Use for `--color-accent-hover`, `--color-accent-glow`, etc. Support ~93%+ in 2026. |
| CSS Native Nesting | Living Standard | Cleaner stylesheet organization | Use within component and section CSS files. 90%+ support. Optional for Phase 1 but recommended. |
| `@layer` (Cascade Layers) | Living Standard | Explicit cascade ordering | 95%+ support. Use to declare layer order: `@layer reset, tokens, typography, layout`. Prevents specificity conflicts as later phases add component/section CSS. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|---|---|---|
| Hex primitives | OKLCH color system | OKLCH is perceptually uniform and ideal for derived states, but the spec defines exact hex values. Using OKLCH would require converting spec values and introduces a translation layer. Use hex for primitives, `color-mix()` in oklch space for derived states if needed. |
| Google Fonts CDN | Self-hosted WOFF2 | Self-hosting eliminates third-party DNS lookup and privacy concerns. But adds file management complexity. Google Fonts CDN is simpler for Phase 1; self-hosting can be done in Phase 10 (Performance) if needed. |
| Four CSS files | Single file with `@layer` sections | Single file reduces HTTP requests from 4 to 1. But splitting by concern (tokens/reset/typography/layout) makes each file focused and maintainable. HTTP/2 multiplexing makes the cost negligible. Separate files are better for this project's phased approach where later phases add more files. |

**Installation:** None required. This is vanilla CSS loaded via `<link>` tags. Google Fonts loaded via `<link>` to their CDN.

## Architecture Patterns

### Recommended File Structure

```
css/
  tokens.css        # Tier 1+2+3 design tokens (custom properties on :root)
  reset.css         # Box model reset, base element styles, body background
  typography.css    # @font-face refs, type scale, heading/body/mono classes
  layout.css        # Container, spacing scale, section padding, breakpoints
```

All four files loaded in this order in `index.html <head>`. Later phases will add `components.css`, `sections.css`, `utilities.css`.

### Pattern 1: Three-Tier Token Architecture

**What:** Primitive tokens hold raw values. Semantic tokens reference primitives and describe purpose. Component tokens (optional, Phase 2+) scope to specific UI elements.

**When to use:** Every color, spacing, type size, and radius value goes through this system. No magic numbers anywhere in the CSS.

**Example:**

```css
/* --- tokens.css --- */

/* ============================================
   TIER 1: PRIMITIVES (raw values, never used directly in components)
   ============================================ */
:root {
  /* Background palette */
  --raw-bg-primary: #08090E;
  --raw-bg-surface: #0F1117;
  --raw-bg-subtle: #161820;

  /* Text palette */
  --raw-text-primary: #F0F0F5;
  --raw-text-secondary: #9B9BA8;

  /* Accent palette */
  --raw-accent: #635BFF;

  /* Spacing base values */
  --raw-space-unit: 0.25rem;  /* 4px base unit */

  /* Radius base values */
  --raw-radius-sm: 8px;
  --raw-radius-md: 12px;
  --raw-radius-lg: 16px;
  --raw-radius-xl: 20px;
  --raw-radius-pill: 999px;
}

/* ============================================
   TIER 2: SEMANTIC (purpose-named, what components use)
   ============================================ */
:root {
  /* Backgrounds */
  --color-page: var(--raw-bg-primary);
  --color-surface: var(--raw-bg-surface);
  --color-surface-raised: var(--raw-bg-subtle);

  /* Text */
  --color-text: var(--raw-text-primary);
  --color-text-muted: var(--raw-text-secondary);

  /* Accent + derived states */
  --color-accent: var(--raw-accent);
  --color-accent-hover: color-mix(in srgb, var(--raw-accent) 85%, white);
  --color-accent-subtle: color-mix(in srgb, var(--raw-accent) 12%, transparent);
  --color-accent-glow: color-mix(in srgb, var(--raw-accent) 20%, transparent);

  /* Borders */
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: color-mix(in srgb, var(--raw-accent) 40%, transparent);

  /* Interactive */
  --color-focus-ring: var(--raw-accent);

  /* Selection */
  --color-selection-bg: color-mix(in srgb, var(--raw-accent) 35%, transparent);
  --color-selection-text: var(--raw-text-primary);
}
```

**Why this pattern:** Changing the color palette means editing only Tier 1 values. Tier 2 semantic tokens stay the same. Every future component (`components.css`, `sections.css`) references Tier 2 names. The existing site uses single-tier tokens (`--primary-accent: 198 93% 61%`) which require find-and-replace across all files to change the palette.

### Pattern 2: Fluid Type Scale with clamp()

**What:** Each font size token uses `clamp(min, preferred, max)` to scale fluidly between 375px and 1440px viewports.

**Formula:** `preferred = min + (max - min) * ((100vw - 375px) / (1440px - 375px))`

Simplified: `preferred = minRem + slope * vw` where `slope = (maxRem - minRem) / (1440/16 - 375/16) * 100`

**Example:**

```css
/* --- typography.css --- */
:root {
  --fs-xs:   clamp(0.75rem,  0.71rem + 0.19vw,  0.875rem);
  --fs-sm:   clamp(0.875rem, 0.83rem + 0.19vw,  1rem);
  --fs-base: clamp(1rem,     0.95rem + 0.24vw,  1.125rem);
  --fs-lg:   clamp(1.25rem,  1.10rem + 0.56vw,  1.5rem);
  --fs-xl:   clamp(1.75rem,  1.40rem + 1.22vw,  2.75rem);
  --fs-2xl:  clamp(2.25rem,  1.80rem + 1.69vw,  3.5rem);
  --fs-hero: clamp(2.5rem,   1.95rem + 2.82vw,  5.5rem);
}
```

**Source:** Smashing Magazine's fluid typography guide and fluid-type-scale.com calculator, verified against the existing site's working clamp() values.

### Pattern 3: Spacing Scale

**What:** A set of spacing tokens from 4px to ~160px that maintain consistent vertical rhythm.

**Example:**

```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* Fluid section spacing */
  --space-section: clamp(4rem, 3rem + 3.5vw, 6.5rem);
  --space-section-lg: clamp(5rem, 3.5rem + 4.5vw, 8rem);
}
```

**Why this over the current system:** The existing site uses named sizes (`--space-xs` through `--space-xl`) with only 5 values. This is too coarse -- there is no value between 1rem and 2rem, which forces magic numbers. A numbered scale provides granularity without naming friction.

### Anti-Patterns to Avoid

- **Glassmorphism token carryover:** The current site defines `--glass-bg`, `--glass-border`, `--glass-shadow`. Do NOT carry these into the new token system. The entire `.glass` class and its tokens must be deleted. Requirement DES-10 explicitly bans glassmorphism.

- **HSL-with-raw-value pattern:** The current site stores `--primary-accent: 198 93% 61%` (raw HSL components) and uses `hsl(var(--primary-accent))` at every usage site. This is fragile, hard to read, and does not work with `color-mix()`. Use full color values in the new system.

- **Pure black or pure white:** Requirement DES-04 bans `#000000` and `#FFFFFF`. The spec colors are off-black (#08090E) and off-white (#F0F0F5). Verify no pure black/white leaks in anywhere -- including `color: #fff` on headings (the current site has this on lines 210, 354, 379, 460, 583, etc.).

- **Multiple `:root` blocks scattered across files:** Define ALL tokens in `tokens.css` on a single `:root` block (or clearly separated blocks within that file). The current site puts tokens in `:root` at the top of `main.css` AND overrides them inside a `@media (max-width: 760px)` block at the bottom. Keep responsive token overrides co-located with their base definitions in `tokens.css`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Fluid typography values | Manual clamp() calculations | Fluid Type Scale Calculator (fluid-type-scale.com) or Utopia (utopia.fyi) | Easy to miscalculate the preferred value in clamp(). The calculators produce mathematically correct values given min/max size and viewport range. |
| Contrast ratio checking | Eyeballing contrast | WebAIM Contrast Checker or browser DevTools accessibility inspector | WCAG AA requires 4.5:1 for normal text. Cannot be judged visually. Every text/background pair in the token system must be verified programmatically. |
| Color derived states | Manual opacity variants | `color-mix()` function | Writing `rgba(99, 91, 255, 0.12)` manually for every alpha variant is error-prone and does not update when the accent color changes. `color-mix(in srgb, var(--color-accent) 12%, transparent)` stays correct automatically. |
| Font loading optimization | Custom font-face with subsetting | Google Fonts API v2 with `&display=swap` | Google Fonts handles subsetting, WOFF2 delivery, and CDN caching. Manual self-hosting adds complexity with minimal benefit for Phase 1. |

**Key insight:** The design foundation phase is about establishing correct values and relationships, not about visual polish. Every decision here (every token name, every spacing value, every font weight) becomes the API that all subsequent phases consume. Getting the API wrong means every subsequent phase fights the foundation instead of building on it.

## Common Pitfalls

### Pitfall 1: Accent Color Fails WCAG AA for Body Text

**What goes wrong:** The spec accent `#635BFF` (electric indigo) is used for body-sized text and fails WCAG AA contrast.

**Why it happens:** `#635BFF` has a relative luminance of 0.1735. Against `#08090E` (luminance 0.0028), the contrast ratio is **4.23:1** -- below the 4.5:1 AA minimum for normal text. Against `#0F1117` it drops to **4.02:1**. Against `#161820` it is **3.77:1**.

**Verified calculation (computed during research):**

| Foreground | Background | Ratio | AA Normal (4.5:1) | AA Large (3:1) |
|---|---|---|---|---|
| #F0F0F5 (text primary) | #08090E (bg primary) | **17.51:1** | PASS | PASS |
| #F0F0F5 (text primary) | #0F1117 (bg surface) | **16.61:1** | PASS | PASS |
| #F0F0F5 (text primary) | #161820 (bg subtle) | **15.59:1** | PASS | PASS |
| #9B9BA8 (text secondary) | #08090E (bg primary) | **7.24:1** | PASS | PASS |
| #9B9BA8 (text secondary) | #0F1117 (bg surface) | **6.87:1** | PASS | PASS |
| #9B9BA8 (text secondary) | #161820 (bg subtle) | **6.45:1** | PASS | PASS |
| #635BFF (accent) | #08090E (bg primary) | **4.23:1** | **FAIL** | PASS |
| #635BFF (accent) | #0F1117 (bg surface) | **4.02:1** | **FAIL** | PASS |
| #635BFF (accent) | #161820 (bg subtle) | **3.77:1** | **FAIL** | PASS |

**How to avoid:** Do NOT use `#635BFF` for body-sized text (under 18pt/24px or under 14pt/19px bold). The accent color is safe for:
- Large headings (24px+ or 19px+ bold) -- passes AA at 3:1
- Button text on accent-colored backgrounds (white/off-white text ON accent bg)
- Decorative elements (borders, glows, indicators) where contrast is not required
- Interactive element labels IF they are 18pt+ or bold 14pt+

For accent-colored body text, lighten to approximately `#7B75FF` or `#8A85FF` (needs verification, but increasing lightness to ~0.55-0.60 in OKLCH should cross the 4.5:1 threshold). Define this as a separate token: `--color-accent-text: #7B75FF`.

**Warning signs:** Accent color appearing on links, labels, small badges, or body paragraphs at sizes under 24px.

### Pitfall 2: Instrument Serif is Single-Weight Only

**What goes wrong:** Headings all look the same because Instrument Serif only comes in Regular (400) weight. No bold, no light, no variable weight axis.

**Why it happens:** Instrument Serif is a display font with only Regular 400 and Italic styles on Google Fonts. Unlike Inter (which is variable 100-900), there is no weight variation available.

**How to avoid:** Create heading hierarchy through size and spacing, not weight:
- H1 (hero): `--fs-hero` (2.5-5.5rem) -- size alone creates hierarchy
- H2 (section): `--fs-2xl` or `--fs-xl` -- distinctly smaller than H1
- H3 (card/subsection): `--fs-lg` -- clear step down from H2
- Use `letter-spacing` variation: tighter tracking on larger sizes (-0.03em to -0.04em), normal on smaller
- Use `font-style: italic` on Instrument Serif for specific emphasis moments (available as a separate style)
- Weight hierarchy comes from Inter (body font) at 400/500/600/700, not from headings

### Pitfall 3: Font Loading Causes Layout Shift (CLS)

**What goes wrong:** Text renders in fallback font (system sans-serif), then jumps when Google Fonts loads. Visible on every page load.

**Why it happens:** Google Fonts are external resources. With `font-display: swap`, the browser shows fallback text immediately, then swaps to the web font. If the web font has different metrics (x-height, character width), text reflows.

**How to avoid:**
1. Use `preconnect` hints (already in current site): `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
2. Set `font-display=swap` in the Google Fonts URL (already done)
3. Define a fallback font stack with similar metrics:
   - Instrument Serif: `'Instrument Serif', Georgia, 'Times New Roman', serif`
   - Inter: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
   - JetBrains Mono: `'JetBrains Mono', 'Fira Code', 'Consolas', monospace`
4. Use `size-adjust` on `@font-face` if CLS is measurable (Phase 10 optimization)

### Pitfall 4: Magic Numbers Creep In Despite Token System

**What goes wrong:** A developer writes `padding: 1.2rem` or `color: rgba(255, 255, 255, 0.06)` directly instead of using tokens. The token system becomes advisory rather than enforced.

**Why it happens:** Token names are longer than raw values. Writing `var(--space-4)` takes more effort than `1rem`. Without discipline, tokens are bypassed "just this once" which compounds.

**How to avoid:**
1. The CSS reset and base styles in `reset.css` must use ONLY token references -- zero magic numbers
2. Establish the rule: if a value is not a token, it must have a CSS comment explaining why (e.g., `/* browser mockup dots -- decorative, not in token system */`)
3. Keep a "banned values" list in a comment at the top of `tokens.css`: no `#000`, no `#FFF`, no `#fff`, no `white`, no `black`
4. Verification step: grep the final CSS files for hex values, `rgba()`, and pixel values not in the token system

### Pitfall 5: Breakpoint Mismatch Between CSS and JS

**What goes wrong:** CSS media queries use one set of breakpoints, JavaScript uses different values. The mobile nav hamburger appears at a different width than the CSS mobile layout.

**Why it happens:** The current site has this exact bug: CSS uses `760px` for mobile, JS checks `window.innerWidth > 760`. The numbers match here, but the existing site also has breakpoints at 980, 1020, 1100, 1120, and 1180 that do not correspond to any JS logic.

**How to avoid:**
1. Define exactly three breakpoints: default (desktop), 1024px (tablet), 640px (mobile)
2. Document them in a comment at the top of `layout.css`
3. Use CSS custom properties for breakpoints where possible (note: CSS custom properties do NOT work inside media query values, so breakpoints must be hardcoded values -- but document them centrally)
4. When JS is added in Phase 5+, use `window.matchMedia('(max-width: 640px)')` with the same value as CSS

## Code Examples

### Google Fonts Loading (index.html head)

```html
<!-- Font loading: preconnect + single request for all three families -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:opsz,wght@14..32,400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Notes:**
- Instrument Serif: Regular + Italic (only weights available)
- Inter: Variable font with optical size axis (14-32) and weights 400-700
- JetBrains Mono: 400 + 500 (minimal for labels)
- Single URL request for all three families

### CSS Reset (reset.css)

```css
/* Box model and base resets */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-body);
  font-size: var(--fs-base);
  line-height: 1.65;
  color: var(--color-text);
  background-color: var(--color-page);
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

/* Remove default list styles - lists styled via component classes */
ul, ol {
  list-style: none;
}

/* Scroll margin for anchor targets */
[id] {
  scroll-margin-top: 6rem;
}

/* Selection */
::selection {
  color: var(--color-selection-text);
  background: var(--color-selection-bg);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Key differences from current site:**
- No radial gradient blobs on `body` (DES-10: no gradient blobs)
- No `body::before` noise texture overlay (removed from foundation, may be added selectively in Phase 4)
- No `body::after` ambient gradient (DES-10)
- Uses `var(--color-page)` not `hsl(var(--bg-900))`
- Uses `var(--color-text)` not `hsl(var(--text-strong))`
- No pure white or pure black anywhere (DES-04)

### Typography Classes (typography.css)

```css
/* Font family tokens */
:root {
  --font-heading: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}

/* Heading styles */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 400;  /* Instrument Serif only has 400 */
  line-height: 1.08;
  letter-spacing: -0.03em;
  text-wrap: balance;
  color: var(--color-text);
}

h1 { font-size: var(--fs-hero); }
h2 { font-size: var(--fs-2xl); }
h3 { font-size: var(--fs-xl); }
h4 { font-size: var(--fs-lg); }

/* Body text */
p {
  font-size: var(--fs-base);
  line-height: 1.65;
  text-wrap: pretty;
}

/* Mono utility */
.mono {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* Small text */
small, .text-sm {
  font-size: var(--fs-sm);
}
```

### Container and Layout (layout.css)

```css
/* Container */
.container {
  width: 100%;
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: var(--space-6);  /* 24px */
}

/* Section spacing */
.section {
  padding-block: var(--space-section);
}

/* Breakpoints: desktop (default), tablet (1024px), mobile (640px) */
@media (max-width: 1024px) {
  .container {
    padding-inline: var(--space-6);  /* 24px, same */
  }
}

@media (max-width: 640px) {
  .container {
    padding-inline: var(--space-4);  /* 16px */
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| HSL raw components in CSS vars | Full color values (hex, oklch, or color functions) | 2024+ (color-mix/oklch matured) | No more `hsl(var(--color))` boilerplate. Colors work directly with `color-mix()`. |
| Sass/PostCSS for nesting | Native CSS nesting | 2024 (all browsers shipped) | No build step needed for nested selectors. The `&` parent selector works natively. |
| Sass color functions | `color-mix()` in CSS | 2023+ (Chrome 111, Safari 16.2, Firefox 113) | Derived color states (hover, glow) computed by the browser, not a preprocessor. |
| Multiple breakpoints per component | 3 consolidated breakpoints | Best practice for maintainability | Reduce from 6 breakpoints to 3. Fluid values (`clamp()`, `min()`, `fr`) handle intermediate sizes. |
| `font-display: swap` only | `preconnect` + `font-display: swap` + fallback stack matching | 2023+ (Core Web Vitals focus) | Reduces CLS from font loading. Preconnect establishes connection early. |
| Flat CSS with BEM naming | Native nesting with `&` | 2024+ | Cleaner file structure, explicit parent-child relationships without long class names. |

**Deprecated/outdated:**
- HSL raw-component-in-variable pattern (`--color: 198 93% 61%` + `hsl(var(--color))`): Replaced by storing full color values and using `color-mix()` for alpha/derived states
- Single-tier token systems: Replaced by three-tier (primitive > semantic > component) for maintainability
- `body::before` noise texture: Performance cost (forces GPU compositing on scroll) outweighs nearly-invisible visual benefit

## Open Questions

1. **Accent color for body text -- exact lightened value**
   - What we know: `#635BFF` fails AA for normal text. Needs lightening to ~`#7B75FF` or higher.
   - What's unclear: The exact hex value that crosses 4.5:1 against all three backgrounds while still reading as "electric indigo."
   - Recommendation: During implementation, use a contrast checker tool to find the minimum lightness increase. Create a `--color-accent-text` token for this value. The planner should include a verification task.

2. **Instrument Serif rendering on Windows**
   - What we know: Instrument Serif is a newer font (released 2022). Serif fonts historically render worse on Windows due to ClearType limitations at small sizes.
   - What's unclear: Whether Instrument Serif at `--fs-lg` (1.25-1.5rem, approx 20-24px) renders cleanly on Windows Chrome/Edge.
   - Recommendation: The planner should include a Windows rendering verification step. If it renders poorly at small sizes, restrict Instrument Serif to H1/H2 only and use Inter for H3/H4.

3. **`color-mix()` fallback for older browsers**
   - What we know: `color-mix()` has ~93% support. The ~7% without support are mostly older Safari (15.x) and older Android browsers.
   - What's unclear: Whether this project needs to support those browsers given the "modern evergreen browsers" constraint.
   - Recommendation: Use `color-mix()` for derived states (hover, glow, subtle backgrounds) but provide a hardcoded hex fallback value as a comment next to each derived token. If browser testing reveals issues, the fallback can be added as a CSS variable with the same name defined before the `color-mix()` version (cascade overrides).

## Sources

### Primary (HIGH confidence)

- **WCAG 2.2 Contrast Requirements** (W3C) - https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html - Verified 4.5:1 AA minimum for normal text, 3:1 for large text
- **MDN: oklch()** - https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch - Browser support and syntax verified
- **MDN: color-mix()** - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix - Browser support and syntax verified
- **MDN: @layer** - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer - Cascade layers syntax and support verified
- **Can I Use: CSS Nesting** - https://caniuse.com/css-nesting - 90%+ browser support confirmed
- **Can I Use: CSS Cascade Layers** - https://caniuse.com/css-cascade-layers - 95%+ browser support confirmed
- **Google Fonts: Instrument Serif** - https://fonts.google.com/specimen/Instrument+Serif - Only Regular 400 + Italic confirmed
- **Google Fonts: Inter** - https://fonts.google.com/specimen/Inter - Variable font, weight 100-900, optical size axis 14-32 confirmed
- **Google Fonts: JetBrains Mono** - https://fonts.google.com/specimen/JetBrains+Mono - Weights 400/500 available
- **Contrast ratio calculations** - Computed programmatically during research using WCAG relative luminance formula. All 9 foreground/background pairs verified.
- **Existing codebase analysis** - `C:\N8N\Agency\Website\css\main.css` (800 lines), `C:\N8N\Agency\Website\index.html` (506 lines), all CSS/JS files read and analyzed

### Secondary (MEDIUM confidence)

- **Smashing Magazine: Modern Fluid Typography Using CSS Clamp** - https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/ - clamp() formula and calculation method
- **Fluid Type Scale Calculator** - https://www.fluid-type-scale.com/ - Tool for generating correct clamp() values
- **Penpot: Developer's guide to design tokens and CSS variables** - https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/ - Three-tier token architecture patterns
- **The Modern CSS Toolkit: What Actually Matters in 2026** - https://www.nickpaolini.com/blog/modern-css-toolkit-2026 - OKLCH and color-mix() ecosystem status
- **WebAIM: Contrast Checker** - https://webaim.org/resources/contrastchecker/ - Contrast verification tool
- **Evil Martians: OKLCH in CSS** - https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl - OKLCH advantages over HSL
- **Request Metrics: 5 Tips to Make Google Fonts Faster** - https://requestmetrics.com/web-performance/5-tips-to-make-google-fonts-faster/ - Font loading optimization
- **Project research: STACK.md** - `C:\N8N\Agency\Website\.planning\research\STACK.md` - Stack recommendations for this specific project
- **Project research: ARCHITECTURE.md** - `C:\N8N\Agency\Website\.planning\research\ARCHITECTURE.md` - CSS architecture patterns
- **Project research: PITFALLS.md** - `C:\N8N\Agency\Website\.planning\research\PITFALLS.md` - Dark theme contrast pitfalls

### Tertiary (LOW confidence)

- None. All findings for Phase 1 are verified against primary or secondary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Vanilla CSS custom properties, clamp(), Google Fonts. No libraries, no risk of version issues.
- Architecture: HIGH - Three-tier token pattern is well-documented and proven. File structure follows established conventions.
- Pitfalls: HIGH - Contrast ratios computed programmatically, not estimated. Font weight limitation verified against Google Fonts catalog. All findings are specific and actionable.

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (stable domain, slow-moving standards)
