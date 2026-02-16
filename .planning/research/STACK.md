# Technology Stack

**Project:** Vanguard Digital — Agency Website Redesign
**Researched:** 2026-02-16
**Overall confidence:** HIGH (vanilla stack with well-documented, mature web standards)

---

## Recommended Stack

### Core: Vanilla HTML / CSS / JS (Zero Dependencies)

| Technology | Version | Purpose | Why |
|---|---|---|---|
| HTML5 | Living Standard | Document structure | Semantic elements, `<details>`, `<dialog>`, native form validation. No build step needed. |
| CSS3 (Modern) | Living Standard | All styling, layout, animation | 2026 CSS is powerful enough to replace what previously required Sass, PostCSS, or JS animation libraries. Native nesting, `oklch()`, `color-mix()`, container queries, scroll-driven animations. |
| Vanilla JavaScript | ES2022+ | Interactivity | IntersectionObserver for reveals, form validation + submission, mobile nav, smooth scroll. No framework overhead for a single page. |

**Confidence: HIGH** -- This is the correct call. A single-page marketing site with a contact form does not need React, Next.js, Astro, or any framework. The existing site already validates this approach. Frameworks add bundle size, build complexity, and maintenance burden with zero benefit for static content.

### What NOT to Use (and Why)

| Anti-Technology | Why Not |
|---|---|
| **Tailwind CSS** | Utility classes in HTML produce "AI-generated" look instantly. Class soup (e.g., `flex items-center gap-4 rounded-lg bg-zinc-900 p-6`) screams template. Hand-written CSS with custom properties produces cleaner markup and a more intentional, crafted feel. |
| **Bootstrap / Bulma / Any CSS Framework** | Same problem -- recognizable patterns that make every site look identical. The PROJECT.md explicitly requires the site to NOT look AI-generated. |
| **GSAP / Motion / Any JS Animation Library** | Overkill. The site needs scroll reveals and subtle hover effects, not timeline sequencing or spring physics. CSS handles all of this natively in 2026. Adding 78-85KB of JS for animations a 5-line CSS rule can do is wasteful. |
| **React / Vue / Svelte / Astro** | Single-page static site. No dynamic data fetching, no component reuse across routes, no state management. A framework adds a build step, increases complexity, and produces slower initial loads for zero functional benefit. |
| **Sass / PostCSS / CSS preprocessors** | CSS native nesting (shipped in all browsers 2024+) eliminates the primary reason for Sass. `oklch()` + `color-mix()` replace Sass color functions. Custom properties replace Sass variables. Preprocessors add a build step for features CSS now has natively. |
| **Icon font libraries (Font Awesome, etc.)** | Loading 200KB+ of icons to use 8 is wasteful. Inline SVG gives full control over color, animation, and size with zero network overhead. The existing site already uses inline SVG correctly. |

**Confidence: HIGH** -- These are well-established anti-patterns for this specific project type. The reasoning is grounded in the project constraints (zero dependencies, no build tools, must not look AI-generated).

---

## CSS Architecture: The Premium Toolkit

### 1. Color System: OKLCH + color-mix()

**Confidence: HIGH** (93% browser support as of early 2026, all evergreen browsers)

Replace the existing HSL-based custom properties with OKLCH. The current site uses `--primary-accent: 198 93% 61%` which requires the verbose `hsl(var(--primary-accent))` pattern everywhere. OKLCH is perceptually uniform -- a lightness of 0.7 looks equally bright regardless of hue, unlike HSL where blue at 50% looks much darker than yellow at 50%.

**Why this matters for a dark theme:** When you derive hover states, borders, and subtle tints from your accent color, OKLCH keeps them visually balanced. HSL color manipulation produces muddy or neon results depending on hue.

**Recommended color variable pattern:**

```css
:root {
  /* Base palette */
  --color-bg: oklch(0.13 0.01 260);        /* Near-black with slight cool tint */
  --color-surface: oklch(0.17 0.01 260);    /* Card / elevated surface */
  --color-border: oklch(0.25 0.005 260);    /* Subtle borders */

  /* Text hierarchy */
  --color-text: oklch(0.93 0.01 260);       /* Primary text */
  --color-text-muted: oklch(0.65 0.01 260); /* Secondary text */
  --color-text-dim: oklch(0.45 0.01 260);   /* Tertiary / labels */

  /* Accent */
  --color-accent: oklch(0.72 0.18 250);     /* Primary action color */
  --color-accent-hover: oklch(0.78 0.20 250);
  --color-accent-subtle: oklch(0.72 0.18 250 / 0.12); /* Tinted backgrounds */

  /* Derived states using color-mix */
  --color-border-hover: color-mix(in oklch, var(--color-accent) 40%, transparent);
  --color-glow: color-mix(in oklch, var(--color-accent) 25%, transparent);
}
```

**Key insight from Linear's approach:** Linear uses LCH (the predecessor of OKLCH) to define their entire theme from just three variables: base color, accent color, and contrast. This is the pattern to follow -- define 3-4 base values, derive everything else with `oklch()` math and `color-mix()`.

### 2. Layout: CSS Grid + Subgrid + Container Queries

**Confidence: HIGH** (Grid: 97% support, Subgrid: 93%+, Container Queries: 92%+)

| Technique | Use Case | Why |
|---|---|---|
| **CSS Grid** | Page-level section layouts, card grids, footer columns | Already used in current site. Continue. |
| **Subgrid** | Aligning card contents (icon, title, description, CTA) across a row | The current bento grid has alignment issues when cards have different content lengths. Subgrid fixes this without JS. |
| **Container Queries** | Service cards, testimonial cards, FAQ items | Components respond to their container, not the viewport. Makes cards work identically whether in a 3-column or 1-column layout. |
| **Flexbox** | Inline elements, nav, button groups, small alignments | Still the right tool for 1D layouts. |

**Pattern for premium card alignment:**

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4; /* icon + title + description + cta */
}
```

### 3. Native CSS Nesting

**Confidence: HIGH** (95%+ support in all evergreen browsers since late 2024)

Replace the flat CSS structure with nesting. This eliminates the need for BEM naming in many cases and makes the relationship between parent and child styles explicit.

```css
.service-card {
  padding: 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);

  & .icon {
    color: var(--color-accent);
  }

  &:hover {
    border-color: var(--color-border-hover);

    & .icon {
      transform: translateY(-2px);
    }
  }
}
```

**Why this matters:** Nesting makes CSS files easier to scan and maintain without a preprocessor build step. It preserves the zero-dependency constraint.

### 4. The `:has()` Selector

**Confidence: HIGH** (94%+ support)

Use `:has()` for conditional styling that previously required JavaScript class toggling:

- Style a form group differently when its input is focused: `.form-group:has(input:focus)`
- Style the nav when it contains an open mobile menu: `.navbar:has(.nav-links.open)`
- Style FAQ items based on open/closed state without JS: `details:has(> summary:focus-visible)`

### 5. Fluid Typography with clamp()

**Confidence: HIGH** (the existing site already uses this correctly)

Keep the existing `clamp()` pattern for fluid type sizing. The current site's type scale is well-constructed. Recommendations for the redesign:

```css
--fs-xs:   clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);
--fs-sm:   clamp(0.875rem, 0.83rem + 0.2vw, 1rem);
--fs-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--fs-lg:   clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
--fs-xl:   clamp(1.75rem, 1.4rem + 1.2vw, 2.75rem);
--fs-hero: clamp(2.5rem, 2rem + 3vw, 5.5rem);
```

### 6. Cascade Layers

**Confidence: MEDIUM** (support is 95%+, but value is lower for a single-page site with one author)

Use `@layer` to organize CSS into reset, base, layout, components, utilities. This prevents specificity conflicts as the stylesheet grows. For a single-page site this is optional but adds maintainability:

```css
@layer reset, base, layout, components, utilities;
```

**Recommendation:** Use if the CSS exceeds 600-700 lines. Skip if it stays lean.

---

## Typography: Font Pairing

### Recommended: Instrument Serif + Inter + JetBrains Mono

**Confidence: HIGH**

| Role | Font | Weight(s) | Why |
|---|---|---|---|
| **Display / Headings** | Instrument Serif | Regular (400), Italic | Condensed editorial serif with character. NOT Playfair Display (overused in AI-generated sites). NOT Syne (current site, being replaced). Instrument Serif has a sharp, slightly compressed feel that reads as intentional and crafted. It is newer and much less common than Playfair, which means lower risk of the "I've seen this template before" reaction. |
| **Body / UI** | Inter | 400, 500, 600, 700 | The industry standard for screen readability. Used by Linear, Stripe docs, and hundreds of premium SaaS sites. Variable font version keeps the request lightweight. Large x-height, clear at small sizes, extensive character set. |
| **Mono / Labels** | JetBrains Mono | 400, 500 | Sharper and more technical than IBM Plex Mono (current site). Distinctive ligatures give a developer/tech feel that reinforces the AI agency positioning. Free and on Google Fonts. |

**Google Fonts embed (single request, variable where available):**

```
https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:opsz,wght@14..32,400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

### Alternatives Considered

| Option | Why Not |
|---|---|
| **Playfair Display + Lato** | Massively overused. Every AI website generator defaults to this pairing. Instantly recognizable as "template." |
| **Syne + Manrope + IBM Plex Mono** | This is the CURRENT site. The brief explicitly says to change fonts. |
| **Fraunces + DM Sans** | Fraunces is beautiful but its optical-size axis makes it complex to use correctly. DM Sans is slightly too rounded/friendly for the "Linear/Stripe precision" direction. |
| **Cormorant + Inter** | Cormorant is extremely thin at display sizes on dark backgrounds, creating readability issues. |
| **Geist Sans** | Not on Google Fonts. Would need self-hosting, adding complexity. Inter achieves the same clean UI look without the hosting overhead. |

**Confidence: HIGH for Inter and JetBrains Mono** (well-proven, massive adoption). **MEDIUM-HIGH for Instrument Serif** (newer font, less battle-tested at scale, but its condensed editorial character is exactly right for this brand direction. Verify rendering on Windows during implementation.)

---

## Animation Strategy

### Primary: CSS-Only (No JS Animation Libraries)

**Confidence: HIGH**

The existing site's animation needs are simple and well-served by CSS alone:

1. **Scroll-triggered reveals** (elements fade/slide in on viewport entry)
2. **Hover state transitions** (cards, buttons, nav links)
3. **FAQ accordion open/close**
4. **Navbar scroll state** (background on scroll)
5. **Subtle ambient motion** (optional -- floating elements, gradient shifts)

All five categories are achievable with CSS transitions, CSS keyframes, and a single `IntersectionObserver` in JS (for reveal triggers).

### Scroll Reveals: IntersectionObserver + CSS Transitions (Keep Current Pattern)

The existing site's approach is correct and performant:

```javascript
// JS: Toggle a class when element enters viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```css
/* CSS: Handle the animation */
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1),
              transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

[data-reveal].visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Why NOT CSS scroll-driven animations (`animation-timeline: view()`)?**

While CSS scroll-driven animations are the exciting new capability in 2026, they are NOT ready as the sole approach for this project:

- **Firefox:** Still does not support them (requires a flag). Firefox has ~3-4% market share in Australia but a broken experience for any users is unacceptable for a lead-gen site.
- **Safari 26:** Only in beta. Older Safari versions (which many iOS users still run) do not support them.
- **Progressive enhancement complexity:** You would need the IntersectionObserver JS fallback anyway for Firefox, making the CSS approach redundant code rather than a replacement.

**Recommendation:** Stick with IntersectionObserver + CSS transitions for viewport-triggered reveals. This has 97%+ browser support and is battle-tested. Consider CSS `animation-timeline: view()` as a progressive enhancement for specific decorative elements (e.g., a parallax background shift) where failure to animate is invisible.

**Confidence: HIGH** -- IntersectionObserver is the right tool. CSS scroll-driven animations are not mature enough to be the primary approach.

### Hover Interactions: CSS Transitions + Transforms

The existing site's hover patterns are solid. Key improvements for the redesign:

```css
/* Premium hover: border glow + subtle lift */
.card {
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-hover);
  box-shadow: 0 0 0 1px var(--color-border-hover),
              0 16px 48px -12px oklch(0.72 0.18 250 / 0.15);
}
```

**The easing matters:** `cubic-bezier(0.23, 1, 0.32, 1)` (the existing site's choice) is excellent -- fast start, soft deceleration. Keep it.

### Ambient Motion (Optional, LOW Priority)

For the premium feel, consider one or two subtle ambient animations:

```css
/* Slow gradient background shift */
@keyframes ambient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-bg {
  animation: ambient-shift 20s ease infinite;
  background-size: 200% 200%;
}
```

**Confidence: MEDIUM** -- Ambient animation adds polish but can also add distraction. Test carefully. Less is more.

### Reduced Motion: Required

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

The existing site already has this. Keep it.

---

## Form Submission: Direct n8n Webhook

### Recommended: POST directly to n8n Webhook (No intermediary service)

**Confidence: HIGH**

The project context mentions n8n is already in the stack (`C:\N8N\` directory exists, n8n referenced in existing site's integration list). Posting directly to an n8n webhook eliminates third-party dependencies and cost.

**How it works:**

1. Create an n8n Webhook node (HTTP Method: POST)
2. n8n generates a webhook URL: `https://your-n8n.domain/webhook/contact-form`
3. HTML form submits via `fetch()` to that URL
4. n8n processes the submission (email notification, CRM entry, Slack alert, etc.)

**Implementation pattern:**

```javascript
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch('https://n8n.yourdomain.com/webhook/contact-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      showSuccess();
      form.reset();
    } else {
      showError('Submission failed. Please try again.');
    }
  } catch {
    showError('Network error. Please email us directly.');
  }
});
```

**CORS configuration:** The n8n Webhook node allows setting permitted cross-origin domains. Set this to the production domain (e.g., `https://vanguarddigital.com.au`) rather than `*` for security.

### Fallback: Web3Forms (Free Tier)

If n8n is not publicly accessible (e.g., running locally), Web3Forms provides a free tier:

- Free plan: 250 submissions/month (sufficient for lead gen)
- No backend needed: POST to `https://api.web3forms.com/submit`
- Email delivery to inbox
- **Limitation:** Webhooks (to connect to n8n/CRM) require PRO plan ($10/month)

**Recommendation:** Use n8n directly if the instance is publicly accessible. Use Web3Forms free tier as fallback only. The n8n approach is superior because it gives full control over what happens after submission (email, CRM, Slack, Google Sheets, etc.) without paying for a third-party service.

### What NOT to Use

| Service | Why Not |
|---|---|
| **mailto:** | Current approach. Unreliable -- depends on email client. Loses leads on mobile. Replace immediately. |
| **Formspree free tier** | Webhooks and custom redirects are paid-only features. AJAX is available on free tier but email delivery alone is limiting. |
| **Netlify Forms** | Locks you into Netlify hosting. The project constraint is "any static host." |
| **Google Forms embed** | Looks terrible, cannot be styled to match the site, breaks the premium feel. |

**Confidence: HIGH for n8n direct webhook, MEDIUM for Web3Forms fallback**

---

## File Structure

### Recommended CSS Organization

```
css/
  reset.css         -- Minimal reset (box-sizing, margin, font-smoothing)
  tokens.css        -- Custom properties (colors, type, spacing, easing)
  base.css          -- Global element styles (body, headings, links, buttons)
  layout.css        -- Navbar, sections, footer, container, grid utilities
  components.css    -- Cards, form, FAQ, chips, badges, process steps
  hero.css          -- Hero section (complex enough to warrant its own file)
```

**Why split?** The current site has 4 CSS files (`main.css`, `hero.css`, `bento.css`, `form.css`) plus an orphaned `visuals.css`. The split is good but the naming is inconsistent. A token/base/layout/component split is more maintainable and conventional.

**Alternative: Single file with `@layer`:**

```css
/* styles.css */
@layer reset, tokens, base, layout, components, hero;

@layer reset { /* ... */ }
@layer tokens { /* ... */ }
/* etc. */
```

This keeps HTTP requests to 1 while maintaining logical separation. For a site this size (likely 800-1200 lines of CSS), a single file with layers is the better choice.

**Recommendation:** Single CSS file with `@layer` sections, unless the file exceeds 1500 lines, at which point split into separate files.

**Confidence: MEDIUM-HIGH** -- Both approaches work. Single file is marginally better for performance (1 request vs 6), and `@layer` provides the same organizational benefit as separate files.

### JS Organization

```
js/
  main.js           -- Single file, class-based (keep existing pattern)
```

The existing site's single `App` class pattern is correct for a single-page site. No module bundler needed. ES2022 class syntax works in all target browsers.

---

## Premium Visual Techniques (CSS Patterns)

These specific CSS patterns produce the "Linear/Stripe energy" the brief calls for:

### 1. Noise Texture Overlay

The existing site already has this (SVG noise via `body::before`). Keep it but reduce opacity slightly (0.04-0.05 instead of 0.065) for a more refined feel.

### 2. Subtle Border Glow on Hover

```css
.card:hover {
  border-color: oklch(0.72 0.18 250 / 0.4);
  box-shadow:
    0 0 0 1px oklch(0.72 0.18 250 / 0.15),
    0 8px 40px -12px oklch(0.72 0.18 250 / 0.2);
}
```

### 3. Gradient Text (Restrained)

Use only on hero heading and section headings. NOT on body text, labels, or buttons. The existing site overuses `gradient-text`. Limit to 2-3 instances per viewport.

### 4. Intentional Whitespace

Double the spacing between major sections. The current site feels compressed. Premium sites breathe. Use `clamp(6rem, 5rem + 4vw, 10rem)` between sections rather than the current `clamp(4.5rem, 3.3rem + 4vw, 8rem)`.

### 5. Micro-Typography Details

- `letter-spacing: -0.03em` on headings (existing, keep)
- `letter-spacing: 0.06em` + `text-transform: uppercase` on labels/eyebrows
- `text-wrap: balance` on headings (existing, keep)
- `text-wrap: pretty` on paragraphs (prevents orphans, 90%+ support)
- `font-feature-settings: "ss01"` on Inter for alternate glyphs (test per weight)

### 6. Drop the Glassmorphism

The PROJECT.md explicitly says "NO glassmorphism." The current site uses `.glass` extensively with `backdrop-filter: blur()`. Replace with solid dark surfaces with subtle borders:

```css
/* BEFORE (current) */
.card {
  background: rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.11);
}

/* AFTER (redesign) */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

Solid surfaces with clear hierarchy (bg < surface < elevated) feel more intentional and less trendy than glassmorphism.

### 7. Custom SVG Icons (Inline)

Continue the existing approach of inline SVG icons. For the redesign, create a consistent icon set with:

- Consistent stroke width (1.5px or 2px, pick one)
- Consistent viewBox (24x24)
- `currentColor` for stroke/fill (inherits text color)
- No filled icons -- stroke-only maintains the editorial/technical feel

Use a tool like SVGOMG (https://jakearchibald.github.io/svgomg/) to optimize each SVG before inlining.

---

## Performance Checklist

| Concern | Solution |
|---|---|
| **Font loading** | `font-display: swap` (already in Google Fonts URL). Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com` (already done). |
| **CSS blocking** | Single CSS file (or minimal files). Inline critical above-fold styles in `<style>` tag if needed. |
| **JS blocking** | `defer` attribute on script tag (already done). |
| **Images** | Use `loading="lazy"` on any below-fold images. Use WebP/AVIF format. Add `width` and `height` attributes to prevent CLS. |
| **SVG optimization** | Run through SVGOMG before inlining. |
| **Reduced motion** | `prefers-reduced-motion` media query (already implemented). |

---

## SEO and Metadata

| Item | Approach |
|---|---|
| **Structured data** | Add `LocalBusiness` and `Organization` JSON-LD schema. Melbourne address, ABN, services. |
| **OG Image** | Actually create the `og-image.jpg` (current site references a non-existent file). |
| **Canonical** | Keep existing `<link rel="canonical">`. |
| **Meta description** | Update to reflect new service offerings. |
| **Sitemap** | Single-page site does not need a sitemap. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|---|---|---|---|
| **Stack** | Vanilla HTML/CSS/JS | Astro (static output) | Build step, npm dependency, overkill for 1 page. |
| **CSS** | Native modern CSS | Tailwind | Utility classes produce recognizable "template" look. |
| **Animations** | CSS + IntersectionObserver | GSAP ScrollTrigger | 78KB JS for effects CSS handles natively. |
| **Animations** | CSS transitions | CSS scroll-driven animations | Firefox support missing. Need JS fallback anyway. |
| **Colors** | OKLCH | HSL (current) | OKLCH is perceptually uniform, better for dark themes. |
| **Form** | n8n webhook | Formspree / Web3Forms | Direct n8n gives full control, no cost, no third-party. |
| **Fonts** | Instrument Serif + Inter | Playfair + Lato | Playfair/Lato is the most overused pairing on the web. |
| **Icons** | Custom inline SVG | Font Awesome / Lucide | Icon fonts load unused icons. Inline SVG is zero overhead. |

---

## Sources

### Verified (HIGH Confidence)

- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [WebKit: Guide to Scroll-Driven Animations with CSS](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)
- [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix)
- [MDN: IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [n8n Webhook node documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Instrument Serif on Google Fonts](https://fonts.google.com/specimen/Instrument+Serif)
- [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)
- [JetBrains Mono on Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono)

### Cross-Referenced (MEDIUM Confidence)

- [The Modern CSS Toolkit: What Actually Matters in 2026](https://www.nickpaolini.com/blog/modern-css-toolkit-2026)
- [Typewolf: The 40 Best Google Fonts for 2026](https://www.typewolf.com/google-fonts)
- [The rise of Linear style design: origins, trends, and techniques](https://medium.com/design-bootcamp/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646)
- [Web3Forms documentation](https://docs.web3forms.com/getting-started/pro-features/webhooks)
- [Chrome Developers: Scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [CSS in 2026: 7 Features That Let the Browser Do the Work](https://www.southwellmedia.com/blog/css-2026-7-features-that-let-browsers-do-the-work)

### WebSearch-Only (LOW Confidence, Noted for Awareness)

- [Defining colors in modern CSS: Why it's time to switch to OKLCH?](https://medium.com/@alekswebnet/defining-colors-in-modern-css-why-its-time-to-switch-to-oklch-c6b972d98520)
- [Best Animation Libraries 2026](https://alignify.co/tools/animation-library)
- [Wix: The 11 Biggest Web Design Trends of 2026](https://www.wix.com/blog/web-design-trends)
