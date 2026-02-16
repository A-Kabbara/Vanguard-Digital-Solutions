# Architecture: Premium Single-Page Agency Website

**Domain:** Conversion-focused single-page agency website (vanilla HTML/CSS/JS)
**Researched:** 2026-02-16
**Overall confidence:** HIGH (principles are well-established; applied to existing codebase context)

---

## 1. Section Ordering for Maximum Conversion

The section flow follows a modified AIDA (Attention-Interest-Desire-Action) funnel. Each section has a specific psychological job. The ordering is non-negotiable for conversion -- rearranging breaks the persuasion sequence.

### Recommended Flow (9 sections + nav + footer)

| Order | Section | AIDA Stage | Psychological Job | Anchor ID |
|-------|---------|------------|-------------------|-----------|
| 0 | **Fixed Navbar** | (persistent) | Omnipresent CTA availability; brand presence | -- |
| 1 | **Hero** | Attention | Arrest attention. State what you do and for whom in one sentence. Single clear CTA. | `#hero` |
| 2 | **Problem / Pain** | Interest | Agitate the visitor's current frustration. Make them feel understood. No solution yet -- tension only. | `#problem` |
| 3 | **Services** | Interest | Present the solution categories. Visitor maps their need to your offering. | `#services` |
| 4 | **Process** | Desire | Remove uncertainty about what happens after they reach out. "Here's how simple it is." | `#process` |
| 5 | **Who We Help** | Desire | Visitor self-identifies with an archetype. "That's me." Deepens relevance. | `#clients` |
| 6 | **Social Proof** | Desire | Testimonials, metrics, trust signals. Other people like them have done this. | `#results` |
| 7 | **FAQ** | Desire | Handle remaining objections. Remove final friction. | `#faq` |
| 8 | **Final CTA** | Action | One focused conversion moment. No distractions. The "ask." | `#contact` |
| 9 | **Footer** | (persistent) | Legal, navigation, secondary contact. Safety net for those who scroll past. | -- |

### Why This Order (Not Another)

**Hero before Problem:** The hero earns 3-5 seconds of attention. If the headline resonates, the visitor scrolls. If the problem section came first, there is no hook -- the visitor has no reason to care about pain points from a company they do not yet know.

**Problem before Services:** Presenting solutions before establishing the problem creates "so what?" resistance. The problem section makes the visitor nod ("yes, that's me") which primes them to receive the services section as relief rather than a sales pitch.

**Services before Process:** The visitor needs to know *what* you do before they care *how* you do it. Process without context is meaningless.

**Process before Who We Help:** Process reduces anxiety ("is this going to be complicated?"). Once the visitor knows the path is simple, the archetypes section lets them see themselves in the journey.

**Social Proof after Who We Help:** Social proof is most effective when the visitor has already self-identified. A testimonial from "a trades business" hits harder after the visitor just read the trades archetype and thought "that's me."

**FAQ before Final CTA:** FAQ handles the last objections standing between the visitor and conversion. Placing it immediately before the CTA means the visitor arrives at the contact form with objections resolved.

**Final CTA as its own section:** The contact form should NOT be buried in the footer or combined with FAQ. It deserves a dedicated, visually distinct section that signals "this is the moment to act."

### CTA Placement Strategy

A CTA should be visible or within one scroll at all times:

1. **Navbar** -- persistent "Book a Call" button (always visible)
2. **Hero** -- primary CTA + secondary scroll CTA
3. **Services** -- CTA after service cards
4. **Process** -- CTA after final step
5. **Final CTA section** -- the dedicated conversion section with full form

This gives 5 CTA touchpoints without being aggressive. The nav CTA handles anyone who is ready at any scroll position.

---

## 2. CSS Architecture

### File Organization Strategy

The existing codebase splits CSS by page section (hero.css, bento.css, form.css). This works but creates a problem: global patterns (cards, grids, typography utilities) end up stuffed into main.css, which becomes a 800-line monolith. The redesign should split by *concern layer*, not by *page section*.

**Recommended structure (7 files):**

```
css/
  tokens.css          -- Design tokens only (custom properties on :root)
  reset.css           -- Box model reset, base element styles, body
  typography.css      -- Font-face, type scale, heading/body/mono/label classes
  layout.css          -- Container, grid systems, section spacing, responsive
  components.css      -- Cards, buttons, badges, pills, accordions, form inputs
  sections.css        -- Section-specific overrides (hero, services, faq, etc.)
  utilities.css       -- Reveal animations, screen-reader-only, visually-hidden
```

**Why this split (not section-based):**

- **Tokens are isolated.** Changing the color palette means editing one file. No hunting through 4 files for HSL values.
- **Components are reusable.** A card style in `components.css` works in services, social proof, and who-we-help sections without duplication.
- **Section-specific CSS is thin.** If components and layout handle 90% of styling, `sections.css` only contains the unique layout or spacing overrides for specific sections. This file stays small.
- **Load order is explicit and predictable:** tokens > reset > type > layout > components > sections > utilities. Each layer depends only on layers above it.

### Design Token Architecture (Three Tiers)

The existing site uses raw HSL values as tokens (`--primary-accent: 198 93% 61%`). This works but is single-tier -- there is no semantic layer. The redesign should use three tiers:

**Tier 1: Primitive tokens (raw values)**
```css
:root {
  /* Primitives -- never used directly in components */
  --raw-neutral-950: #0A0A0F;
  --raw-neutral-900: #111116;
  --raw-neutral-800: #1A1A22;
  --raw-neutral-100: #E8E8ED;
  --raw-neutral-50: #F5F5F7;
  --raw-neutral-0: #FFFFFF;
  --raw-grey-400: #8A8A9A;
  --raw-grey-600: #5A5A6A;
  --raw-accent-500: #4F46E5;
  --raw-accent-400: #6366F1;
  --raw-success-500: #10B981;
}
```

**Tier 2: Semantic tokens (purpose-named, reference primitives)**
```css
:root {
  /* Semantic -- these are what components use */
  --color-bg-page: var(--raw-neutral-950);
  --color-bg-surface: var(--raw-neutral-900);
  --color-bg-card: var(--raw-neutral-800);
  --color-bg-elevated: var(--raw-neutral-100);
  --color-text-primary: var(--raw-neutral-0);
  --color-text-secondary: var(--raw-grey-400);
  --color-text-muted: var(--raw-grey-600);
  --color-accent: var(--raw-accent-500);
  --color-accent-hover: var(--raw-accent-400);
  --color-success: var(--raw-success-500);
  --color-border: rgba(255, 255, 255, 0.06);
  --color-border-hover: rgba(79, 70, 229, 0.3);
}
```

**Tier 3: Component tokens (optional, only when needed)**
```css
:root {
  --btn-primary-bg: var(--color-accent);
  --btn-primary-bg-hover: var(--color-accent-hover);
  --card-bg: var(--color-bg-card);
  --card-border: var(--color-border);
  --card-border-hover: var(--color-border-hover);
}
```

**Why three tiers matters:** When switching from the current cyan/gold palette to the spec's indigo palette, only Tier 1 changes. Tier 2 and 3 stay untouched. Every component automatically gets the new colors. Single-tier tokens require a find-and-replace across every file.

### CSS Load Order in HTML

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/typography.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/sections.css">
<link rel="stylesheet" href="css/utilities.css">
```

Each file depends only on `tokens.css`. The cascade order ensures that section-specific overrides in `sections.css` can override component defaults in `components.css` without specificity wars.

### Responsive Strategy

**Three breakpoints, mobile-first is NOT required for this project.** The existing codebase uses desktop-first (max-width queries). For a dark premium agency site where the desktop experience is the primary design target, desktop-first is the pragmatic choice.

| Breakpoint | Target | Query |
|-----------|--------|-------|
| Default | Desktop (>1024px) | No query needed |
| 1024px | Tablet | `@media (max-width: 1024px)` |
| 640px | Mobile | `@media (max-width: 640px)` |

**Consolidate breakpoints.** The existing site has 6 different breakpoints (1180, 1120, 1100, 1020, 980, 760). This is too many. Three breakpoints is sufficient. Each CSS file contains its own media queries for the components it owns (co-located, not a separate responsive.css file).

**Why 1024/640 instead of the existing 760/980/1180:**
- 1024px catches iPads and smaller laptops in one query instead of three overlapping ones (980, 1020, 1100, 1120, 1180).
- 640px is the true phone breakpoint (iPhone 14 Pro Max is 430px logical, most phones are under 430px). The existing 760px is unnecessarily wide -- it catches small tablets that do not need single-column layout.

### Key CSS Patterns to Implement

**Container:**
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}
```

**Section spacing (consistent vertical rhythm):**
```css
.section {
  padding-block: var(--space-section); /* e.g., clamp(5rem, 8vw, 8rem) */
}
```

**Card pattern (no glassmorphism):**
```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  padding: 2.5rem;
  transition: border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.card:hover {
  border-color: var(--card-border-hover);
  box-shadow: 0 0 40px rgba(79, 70, 229, 0.08);
}
```

Note: No `backdrop-filter`. No semi-transparent backgrounds. The PROJECT.md explicitly states "NO glassmorphism." The redesign uses opaque, solid-color surfaces with subtle border and shadow hover effects.

---

## 3. JavaScript Organization

### Native ES Modules (No Build Required)

The existing site uses a single `App` class in one file loaded via `<script defer>`. For the redesign, use native ES modules with `<script type="module">` -- this is supported in all modern browsers and automatically defers execution.

**Recommended structure:**

```
js/
  main.js              -- Entry point. Imports and initializes all modules.
  modules/
    navbar.js           -- Scroll class toggle, mobile hamburger
    reveal.js           -- IntersectionObserver scroll animations
    faq.js              -- Accordion single-open behavior
    form.js             -- Contact form validation and submission
    magnetic.js         -- Magnetic button hover effect (optional)
```

**Entry point pattern (`js/main.js`):**
```javascript
import { initNavbar } from './modules/navbar.js';
import { initReveal } from './modules/reveal.js';
import { initFaq } from './modules/faq.js';
import { initForm } from './modules/form.js';

initNavbar();
initReveal();
initFaq();
initForm();
```

**Module pattern (`js/modules/navbar.js`):**
```javascript
export function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
```

**HTML entry:**
```html
<script type="module" src="js/main.js"></script>
<!-- No defer needed -- type="module" is deferred automatically -->
```

### Why ES Modules Over a Single Class

- **Separation of concerns.** Each module handles one behavior. A bug in form validation does not require reading through navbar code.
- **No build step required.** `type="module"` works natively in all modern browsers (95%+ support). The site does not need a bundler.
- **Scoping is automatic.** Module variables are scoped to the module, not global. No accidental global pollution from the current single-class pattern.
- **Tree-shaking by humans.** If a feature is removed (e.g., magnetic buttons), delete the file and remove the import line. No dead code to hunt through a monolith class.

### Important Gotcha: Local Development

ES modules require a server -- they do not work with `file://` protocol due to CORS. Development requires a local HTTP server. Options:
- `npx serve .` (one-time, no install needed)
- VS Code Live Server extension
- Python: `python -m http.server 8080`

This is a minor friction cost. Document it in a README or dev setup note.

### Form Submission Architecture

The current mailto: approach must be replaced with a webhook. The form module should:

```javascript
// js/modules/form.js
async function submitForm(formData) {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!response.ok) throw new Error('Submission failed');
  return response;
}
```

The webhook URL should be a constant at the top of form.js (or in a separate config.js if preferred). Since there is no .env system in a vanilla site, the URL is hardcoded -- but isolated to one location.

---

## 4. HTML Structure for Maximum Semantic Quality

### Document Outline

```html
<!DOCTYPE html>
<html lang="en-AU">
<head>
  <!-- Meta, fonts, CSS links -->
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header>
    <nav aria-label="Primary">
      <!-- Logo, links, CTA button -->
    </nav>
  </header>

  <main id="main">
    <section id="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">...</h1>
    </section>

    <section id="problem" aria-labelledby="problem-heading">
      <h2 id="problem-heading">...</h2>
    </section>

    <section id="services" aria-labelledby="services-heading">
      <h2 id="services-heading">...</h2>
      <article>...</article> <!-- One per service -->
    </section>

    <section id="process" aria-labelledby="process-heading">
      <h2 id="process-heading">...</h2>
      <ol> <!-- Ordered list -- process steps are sequential -->
        <li>...</li>
      </ol>
    </section>

    <section id="clients" aria-labelledby="clients-heading">
      <h2 id="clients-heading">...</h2>
      <article>...</article> <!-- One per client archetype -->
    </section>

    <section id="results" aria-labelledby="results-heading">
      <h2 id="results-heading">...</h2>
      <blockquote>...</blockquote>
    </section>

    <section id="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">...</h2>
      <details><summary>...</summary><p>...</p></details>
    </section>

    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">...</h2>
      <form>...</form>
    </section>
  </main>

  <footer>
    <!-- 4-column footer -->
  </footer>
</body>
</html>
```

### Key Semantic Decisions

**`<header>` wrapping `<nav>`:** The existing site has a bare `<nav>` as the first element. Wrapping it in `<header>` is semantically correct -- the nav is part of the site header landmark. Screen readers announce landmarks, and `<header>` provides clearer structure.

**`aria-labelledby` on every `<section>`:** Each section references its heading via `aria-labelledby`. This gives screen reader users a clear table of contents when navigating by landmarks.

**`<article>` for independent content blocks:** Services and client archetypes are each self-contained content units. Using `<article>` rather than `<div>` signals that each card is independently meaningful.

**`<ol>` for process steps:** The current site uses a grid of `<article>` elements for process steps. But process steps are sequential -- `<ol>` is the correct semantic element. The visual design can still show them as cards using CSS on the `<li>` elements.

**Native `<details>/<summary>` for FAQ:** The existing site already does this correctly. Keep it. Native HTML accordion requires zero JavaScript for basic open/close behavior. JS is only needed for the single-open constraint.

**Single `<h1>` per page:** The hero heading is the only `<h1>`. All section headings are `<h2>`. Subheadings within sections are `<h3>`. No heading level is skipped.

### Structured Data (Schema.org)

Add JSON-LD structured data for SEO rich snippets:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Vanguard Digital",
  "url": "https://vanguarddigital.com.au",
  "description": "AI agency building websites, automation, and lead generation systems for Australian businesses.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressCountry": "AU"
  },
  "areaServed": "AU"
}
</script>
```

Add FAQ schema for the FAQ section (eligible for Google rich snippets):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
</script>
```

---

## 5. Build Order (What Depends on What)

The rebuild should proceed in this order. Each phase depends on the phases before it.

### Phase 1: Foundation (tokens + reset + typography + layout)

**Build:** `tokens.css`, `reset.css`, `typography.css`, `layout.css`
**Why first:** Every other phase depends on the token system and base styles. Getting the container, spacing scale, and type scale right means every subsequent section "just works" without ad-hoc overrides.
**Dependency:** None. This is the root.
**Delivers:** An empty page with correct background, font rendering, container, and spacing -- the "blank canvas" that already feels premium.

### Phase 2: Components (cards, buttons, badges, form inputs)

**Build:** `components.css`
**Why second:** Components are reused across multiple sections. Building them before any section ensures consistency. A card built here will be used in services, who-we-help, and social proof sections.
**Dependency:** Phase 1 (tokens, typography, layout).
**Delivers:** A component library that can be demonstrated in isolation.

### Phase 3: HTML Structure (full semantic markup, no section styling)

**Build:** `index.html` (complete markup for all 9 sections + nav + footer)
**Why third:** With tokens, layout, and components in place, the full HTML can be written in one pass. All content goes in now. Using component classes from Phase 2 means sections already have basic visual structure.
**Dependency:** Phase 1 + Phase 2 (layout containers and component classes exist).
**Delivers:** A fully semantic, accessible HTML page that is readable and navigable even without section-specific CSS.

### Phase 4: Section-Specific Styling

**Build:** `sections.css` (hero layout, problem section typography, process grid, FAQ styling, contact form layout, footer columns)
**Why fourth:** Most of the visual work is already done by components and layout. This phase handles only section-unique concerns: the hero's full-viewport height, the problem section's editorial typography, the process section's step connector lines, the footer's 4-column grid.
**Dependency:** Phase 3 (HTML structure exists to style against).
**Delivers:** The complete visual design, static.

### Phase 5: Interaction Layer (JS modules)

**Build:** `js/main.js` + `js/modules/navbar.js`, `reveal.js`, `faq.js`, `form.js`
**Why fifth:** JavaScript is enhancement, not structure. The page should be fully functional and visually complete before JS is added. Scroll reveals, form validation, and mobile nav are progressive enhancements.
**Dependency:** Phase 4 (CSS classes that JS toggles must exist, e.g., `.scrolled`, `.reveal-active`).
**Delivers:** Interactive behaviors. The page goes from static to alive.

### Phase 6: Utilities + Polish

**Build:** `utilities.css` (reveal animation CSS, screen-reader-only class), structured data JSON-LD, OG image, meta tags finalization
**Why last:** Polish depends on everything else being stable. Reveal animations require the final DOM structure. Structured data requires final content. OG image requires the final visual design to screenshot.
**Dependency:** Phase 5 (reveal system needs JS observer + CSS classes coordinated).
**Delivers:** Production-ready site.

### Dependency Graph

```
Phase 1: Foundation
  |
  v
Phase 2: Components
  |
  v
Phase 3: HTML Structure
  |
  v
Phase 4: Section Styling
  |
  v
Phase 5: JS Interactions
  |
  v
Phase 6: Polish + Utilities
```

Each phase is strictly sequential. No phase can be parallelized because each builds on the output of the previous.

---

## 6. Anti-Patterns to Avoid

### Anti-Pattern: Glassmorphism Everywhere

**What the existing site does:** `.glass` class with `backdrop-filter: blur(14px)` applied to nearly every card surface. Semi-transparent backgrounds throughout.
**Why it's wrong for the redesign:** PROJECT.md explicitly states "NO glassmorphism." Beyond the directive, glassmorphism has become a visual cue for "AI-generated site" in 2026. It screams template.
**Instead:** Use opaque solid-color surfaces (`var(--card-bg)`) with subtle 1px borders and hover-state border color changes. The premium feel comes from spacing and typography, not blur effects.

### Anti-Pattern: Gradient Text as Default Heading Style

**What the existing site does:** `.gradient-text` applied to most section headings.
**Why it's wrong:** Gradient text on every heading creates monotony. It becomes wallpaper -- the eye stops registering it. Gradient text is also invisible to users who override colors for accessibility.
**Instead:** Use solid white headings as default. Reserve gradient or accent color for one or two moments of emphasis (e.g., the hero headline only).

### Anti-Pattern: Decorative Dots on Every List and Eyebrow

**What the existing site does:** Glowing colored dots via `::before` pseudo-elements on list items, section eyebrows, case study meta labels, and service points. Every list has them.
**Why it's wrong:** When every element has a glowing dot, none of them are special. The motif becomes noise.
**Instead:** Use simple, understated list markers. Reserve accent-colored indicators for a single, consistent location (e.g., section eyebrows only).

### Anti-Pattern: Too Many Font Families

**What the existing site does:** Three font families (Syne, Manrope, IBM Plex Mono) with 3-5 weights each. ~15 font files loaded.
**Why it's wrong:** Three font families is one too many for a single-page site. Each font adds ~50-200KB. More critically, three families fighting for attention dilutes the typographic voice.
**Instead:** Two font families maximum. One serif or distinctive sans for headings. One clean sans for body. Monospace is optional and should be used sparingly (labels, numbers) -- if used, load one weight only.

### Anti-Pattern: 6+ Breakpoints

**What the existing site does:** Breakpoints at 1180, 1120, 1100, 1020, 980, and 760px.
**Why it's wrong:** Six breakpoints means six sets of layout rules to maintain. Many are within 40px of each other (1100 vs 1120) which is fragile -- a window resize can trigger multiple breakpoint changes in rapid succession.
**Instead:** Three breakpoints: default (desktop), 1024px (tablet), 640px (mobile). Design layouts that flex naturally between breakpoints using fluid values (`clamp()`, `min()`, `fr` units).

---

## 7. Performance Considerations

### Font Loading Strategy

**Self-host fonts** rather than using Google Fonts CDN. This eliminates:
- DNS lookup to `fonts.googleapis.com`
- Connection to `fonts.gstatic.com`
- Render-blocking CSS request for font declarations
- Privacy concerns (Google tracks font requests)

Place WOFF2 files in a `fonts/` directory. Use `@font-face` with `font-display: swap` in `typography.css`. Preload the critical weight:

```html
<link rel="preload" href="fonts/heading-700.woff2" as="font" type="font/woff2" crossorigin>
```

### Remove Noise Texture Overlay

The existing `body::before` noise texture SVG forces GPU compositing on every scroll frame. For a dark premium site, the noise is nearly invisible (opacity 0.065) and adds measurable scroll jank on mobile. Remove it.

### CSS File Count vs Performance

Seven CSS files means seven HTTP requests. On HTTP/2 (which all modern hosts support), this is not a meaningful performance penalty -- multiplexing handles parallel requests efficiently. The developer experience benefit of organized files outweighs the negligible cost. If performance testing later shows this matters, a simple concatenation script (no bundler needed) can combine files for production.

---

## Sources

- [AIDA Model: Improve Your Website in Every Stage - SiteTuners](https://sitetuners.com/blog/rules-for-each-stage-of-the-aida-model-to-improve-your-website/)
- [13 Essential Landing Page Sections For A High Converting Design - Magic UI](https://magicui.design/blog/landing-page-sections)
- [Landing Page Structure: Anatomy & Best Practices - involve.me](https://www.involve.me/blog/landing-page-structure)
- [How to Crack the Code: Optimal Landing Page Structure - Thrive Themes](https://thrivethemes.com/optimal-landing-page-structure/)
- [JavaScript modules - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [The vanilla JS revealing module pattern - Go Make Things](https://gomakethings.com/the-vanilla-js-revealing-module-pattern/)
- [Going Buildless: ES Modules - Modern Web](https://modern-web.dev/guides/going-buildless/es-modules/)
- [The developer's guide to design tokens and CSS variables - Penpot](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/)
- [Best Practices For Naming Design Tokens - Smashing Magazine](https://www.smashingmagazine.com/2024/05/naming-best-practices/)
- [Naming Tokens in Design Systems - Nathan Curtis / EightShapes](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676)
- [HTML: A good basis for accessibility - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)
- [Organizing your CSS - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing)
- [Vanilla CSS Design System - GitHub](https://github.com/pattespatte/vanilla-css-design-system)
- [The Case for Vanilla JavaScript in 2026 - Medium](https://medium.com/@mkuk/the-case-for-vanilla-javascript-in-2026-92d7153a9f68)
- [10 Best SaaS Website Designs of 2026 - Azuro Digital](https://azurodigital.com/saas-website-examples/)
