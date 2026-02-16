# Architecture

**Analysis Date:** 2026-02-16

## Pattern Overview

**Overall:** Single-page application (SPA-style) built as a static vanilla HTML/CSS/JS site with no frameworks, no build tools, and no server-side logic.

**Key Characteristics:**
- One HTML entry point (`index.html`) containing all page content as semantic sections
- CSS split into domain-specific stylesheets loaded in sequence
- Single JavaScript class (`App`) handles all client-side interactivity
- No routing -- all navigation is anchor-based smooth scrolling within the page
- No API calls or data fetching -- form submission opens a `mailto:` link
- No build step -- files are production-ready as-is, deployable to any static host

## Layers

**Markup Layer:**
- Purpose: Defines all page structure, content, and semantic meaning
- Location: `index.html`
- Contains: Full page HTML including nav, 8 content sections, footer, inline SVG icons, and meta/SEO tags
- Depends on: CSS files for presentation, `js/main.js` for interactivity
- Used by: Browser directly (no SSR, no templating)

**Presentation Layer:**
- Purpose: Visual styling split by page domain
- Location: `css/` directory
- Contains: 5 CSS files loaded in order -- `main.css` (tokens + globals), `hero.css`, `bento.css`, `form.css`. A fifth file `visuals.css` exists but is NOT linked in `index.html`.
- Depends on: CSS custom properties defined in `css/main.css` `:root`
- Used by: `index.html` via `<link>` tags

**Interaction Layer:**
- Purpose: Client-side behavior (scroll effects, nav toggle, form validation, FAQ accordion)
- Location: `js/main.js`
- Contains: Single `App` class with 6 initialization methods
- Depends on: DOM elements in `index.html` (accessed by ID and class selectors)
- Used by: `index.html` via `<script defer>`

## Data Flow

**Form Submission Flow:**

1. User fills out contact form fields (name, email, phone, service, message) in `#contactForm`
2. `App.initContactForm()` intercepts the `submit` event with `preventDefault()`
3. Client-side validation checks all `[required]` fields; phone validated against Australian regex (`/^(\+?61|0)[2-478]\d{8}$/`)
4. On pass, `FormData` is extracted, a `mailto:` URL is constructed with `encodeURIComponent`-encoded subject and body
5. Browser redirects to `mailto:hello@vanguarddigital.com.au?subject=...&body=...`
6. Success overlay `#formSuccess` is shown, form is reset
7. No server endpoint is hit -- all submission is via the user's email client

**Scroll-Triggered Reveal Flow:**

1. Elements with class `.reveal` start hidden (CSS: `opacity: 0; transform: translateY(24px)`)
2. `App.initRevealObserver()` creates an `IntersectionObserver` with `threshold: 0.12` and `rootMargin: '0px 0px -80px 0px'`
3. When an element enters the viewport, class `.reveal-active` is added (CSS transitions to `opacity: 1; translateY(0)`)
4. Staggered delays via `.d-100` through `.d-400` classes (100ms-400ms `transition-delay`)
5. Observer unobserves each element after reveal (one-shot animation)

**Navigation State Flow:**

1. `App.initNavbar()` listens to `scroll` events (passive) and toggles `.scrolled` class on `#navbar` when `scrollY > 60`
2. `.scrolled` applies darker background, blur backdrop-filter, and reduced padding
3. Mobile nav: `#navToggle` button toggles `.open` on `#navLinks` (fullscreen overlay), sets `aria-expanded`, locks body scroll
4. Escape key and window resize (>760px) close mobile nav

**State Management:**
- No client-side state management library or store
- All state is DOM-based: CSS classes (`.scrolled`, `.open`, `.active`, `.reveal-active`, `.error`) toggled on elements
- FAQ accordion state managed via native `<details>` elements with JS enforcing single-open behavior

## Key Abstractions

**Glass Card Pattern:**
- Purpose: Reusable frosted-glass card appearance used across all sections
- Examples: `.glass` class applied to `.metric-card`, `.quote-card`, `.process-card`, `.faq-item`, `.service-card`, `.browser-mockup`, `.hero-float-card`
- Pattern: `backdrop-filter: blur(14px)`, semi-transparent background, subtle border, hover glow effect via `::after` pseudo-element

**Bento Grid System:**
- Purpose: Asymmetric grid layout for case studies and services
- Examples: `.bento-grid` in `css/bento.css`, used in Client Outcomes (`#work`) and Services (`#services`) sections
- Pattern: 12-column CSS grid with size classes `.bento-lg` (8-col, 2-row), `.bento-md` (4-col, 2-row), `.bento-sm` (4-col), `.bento-wide` (8-col). Services override to `.service-card` at 6-col each.

**Section Head Pattern:**
- Purpose: Consistent section header layout across all content sections
- Examples: `.section-head` with `.section-eyebrow` (mono label), `.section-title` (heading), `.section-copy` (description)
- Pattern: Max-width 780px, optional `.center` modifier for centered alignment. Eyebrow uses secondary accent color with decorative dot via `::before`.

**Reveal Animation System:**
- Purpose: Scroll-triggered entrance animations
- Examples: `.reveal` class applied to nearly all visible content blocks in `index.html`
- Pattern: CSS handles the visual transition; JS (`IntersectionObserver`) triggers it by adding `.reveal-active`. Delay classes `.d-100` through `.d-400` provide stagger.

## Entry Points

**HTML Entry:**
- Location: `index.html`
- Triggers: Browser loading the URL directly
- Responsibilities: Renders all page content, loads CSS and JS assets

**JavaScript Entry:**
- Location: `js/main.js` (line 198-199)
- Triggers: `DOMContentLoaded` event
- Responsibilities: Instantiates the `App` class which initializes all interactive behaviors

## Error Handling

**Strategy:** Defensive null-checking with early returns; no error boundaries or logging

**Patterns:**
- Every `App` method starts with a DOM element existence check (e.g., `if (!nav) return;`, `if (!toggle || !links) return;`)
- Form validation uses per-field error messages shown via `.error` class on `.form-group` parent
- Phone input sanitization strips non-phone characters on every keystroke: `phoneInput.value.replace(/[^\d+\s()-]/g, '').slice(0, 16)`
- No try/catch blocks anywhere -- no async operations or API calls to fail
- No error logging or monitoring

## Cross-Cutting Concerns

**Accessibility:**
- Skip link (`.skip-link`) for keyboard navigation to `#mainContent`
- `aria-label` on nav, stack grid, and proof points
- `aria-hidden="true"` on decorative elements (logo mark, service icons, hero visual)
- `aria-expanded` on mobile nav toggle, dynamically updated
- `role="status"` and `aria-live="polite"` on form success overlay
- `focus-visible` outline styles on all interactive elements (secondary accent color)
- `prefers-reduced-motion` media query disables all animations and transitions

**SEO:**
- Full Open Graph and Twitter Card meta tags
- Canonical URL, meta description, robots directive
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<details>`
- `lang="en-AU"` attribute

**Performance:**
- JS loaded with `defer` attribute
- Google Fonts loaded with `preconnect` hints
- No images -- all visuals are CSS-only (gradients, shapes, pseudo-elements)
- Noise texture is an inline SVG data URI (no external request)
- Favicon is an inline SVG data URI
- `scroll` event listener uses `{ passive: true }`

**Responsive Design:**
- Three breakpoint tiers: desktop (default), tablet (~980-1180px), mobile (<=760px)
- CSS custom properties with `clamp()` for fluid typography and spacing
- Mobile nav breakpoint at 760px (hamburger menu with fullscreen overlay)
- Container uses `width: min(1240px, 100% - 3rem)` (narrower on mobile: `100% - 1.5rem`)
- All grids collapse to single column on mobile

---

*Architecture analysis: 2026-02-16*
