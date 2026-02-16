# Coding Conventions

**Analysis Date:** 2026-02-16

## Technology Context

This is a vanilla HTML/CSS/JS single-page website with zero build tools, zero frameworks, and zero npm dependencies. All code is hand-authored. There is no package.json, no bundler, no preprocessor.

## File Organization

**CSS is split by section/concern into separate files:**
- `css/main.css`: Design tokens, reset, typography, navigation, global utilities, section base styles, footer, media queries, reduced-motion
- `css/hero.css`: Hero section layout, browser mockup, floating card
- `css/bento.css`: Bento grid system, case study cards, service cards
- `css/form.css`: Contact form, input styling, validation states, success overlay
- `css/visuals.css`: Decorative visual elements (wireframe, nodes, chart bar illustrations)

**JS is a single file:**
- `js/main.js`: All interactivity in one ES6 class

**HTML is a single file:**
- `index.html`: Complete page with all sections inline

**Load order in `index.html` `<head>`:**
1. Google Fonts preconnect + stylesheet
2. `css/main.css` (tokens and globals first)
3. `css/hero.css`
4. `css/bento.css`
5. `css/form.css`
6. `js/main.js` with `defer` attribute

Note: `css/visuals.css` exists but is NOT linked in `index.html`. It contains unused visual component styles.

## Naming Patterns

**CSS Classes - BEM-like with kebab-case:**
- Block: `.hero`, `.navbar`, `.bento-grid`, `.contact-form`
- Block-element: `.hero-badge`, `.hero-subtitle`, `.nav-links`, `.form-group`
- Modifier-style: `.bento-lg`, `.bento-md`, `.bento-sm`, `.bento-wide`
- State classes: `.scrolled`, `.open`, `.active`, `.error`, `.reveal-active`
- Delay modifiers: `.d-100`, `.d-200`, `.d-300`, `.d-400` (transition delay in ms)

**Utility classes (applied directly in HTML):**
- `.glass` - Glassmorphism card effect (background blur + border + shadow + hover glow)
- `.mono` - IBM Plex Mono uppercase text
- `.h-font` - Syne heading font
- `.gradient-text` - Gradient clipped heading text
- `.container` - Max-width centered wrapper
- `.section-padding` - Vertical section spacing
- `.reveal` - Scroll-triggered fade-up animation target
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-nav` - Button variants

**HTML IDs - camelCase for JS hooks:**
- `#navbar`, `#navToggle`, `#navLinks` - Navigation elements
- `#hero`, `#work`, `#services`, `#approach`, `#faq`, `#contact` - Section anchors
- `#mainContent` - Skip link target
- `#contactForm` - Form reference
- `#fullName`, `#email`, `#phone`, `#service`, `#message` - Form fields
- `#formSuccess` - Success overlay

**Form field `name` attributes - snake_case:**
- `full_name`, `email`, `phone`, `service`, `message`

## CSS Design Token System

All tokens are defined as CSS custom properties on `:root` in `css/main.css`.

**Color tokens use raw HSL values (NOT `hsl()` wrapped):**
```css
--bg-900: 218 43% 7%;         /* Use as: hsl(var(--bg-900)) */
--primary-accent: 198 93% 61%; /* Use as: hsla(var(--primary-accent), 0.5) */
```
This pattern allows alpha control at the usage site via `hsla()`.

**Glass effect tokens (rgba, not HSL):**
```css
--glass-bg: rgba(255, 255, 255, 0.035);
--glass-border: rgba(255, 255, 255, 0.11);
--glass-shadow: 0 22px 52px -32px rgba(1, 6, 14, 0.9);
```

**Typography tokens:**
```css
--font-heading: 'Syne', sans-serif;
--font-body: 'Manrope', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
```

**Fluid type scale using `clamp()`:**
```css
--fs-xs: clamp(0.72rem, 0.67rem + 0.2vw, 0.86rem);
--fs-sm: clamp(0.9rem, 0.82rem + 0.2vw, 1rem);
--fs-base: clamp(1rem, 0.95rem + 0.2vw, 1.12rem);
--fs-lg: clamp(1.18rem, 1.03rem + 0.55vw, 1.5rem);
--fs-xl: clamp(1.85rem, 1.45rem + 1vw, 2.7rem);
--fs-hero: clamp(2.4rem, 2rem + 2.8vw, 5rem);
```

**Spacing tokens (fluid for large sizes):**
```css
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: clamp(3rem, 2rem + 2vw, 4.5rem);
--space-xl: clamp(4.5rem, 3.3rem + 4vw, 8rem);
```

**Border radius tokens:**
```css
--radius-sm: 12px;
--radius-md: 20px;
--radius-lg: 30px;
```

**Transition presets:**
```css
--transition-smooth: all 0.38s cubic-bezier(0.23, 1, 0.32, 1);
--transition-soft: all 0.28s ease;
```

## CSS Patterns

**Container pattern:**
```css
.container {
    width: min(1240px, 100% - 3rem);
    margin: 0 auto;
}
```

**Glass card pattern (reuse via `.glass` utility):**
```css
.glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: var(--radius-md);
    position: relative;
    overflow: hidden;
    isolation: isolate;
}
```
The `.glass` class includes a `::after` pseudo-element for a hover glow effect.

**Scroll-reveal animation pattern:**
```css
.reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1),
                transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}
.reveal-active {
    opacity: 1;
    transform: translateY(0);
}
```
Add `.d-100` through `.d-400` for staggered delays.

**Section heading pattern (consistent across all sections):**
```html
<div class="section-head reveal">
  <span class="section-eyebrow mono">Label Text</span>
  <h2 class="section-title h-font gradient-text">Heading Text</h2>
  <p class="section-copy">Description text.</p>
</div>
```
Use `.section-head.center` for centered layout.

**Custom list bullet pattern (glowing dot via `::before`):**
```css
.some-list li::before {
    content: "";
    width: 6px;
    height: 6px;
    margin-top: 0.38rem;
    border-radius: 50%;
    background: hsl(var(--primary-accent));
    box-shadow: 0 0 10px hsla(var(--primary-accent), 0.5);
    flex-shrink: 0;
}
```
All `<ul>` elements use `list-style: none` with flexbox list items and CSS dot bullets.

**Hover lift pattern (consistent across cards and buttons):**
```css
.element:hover {
    transform: translateY(-2px);  /* Buttons: -2px, Cards: -5px or -6px */
    box-shadow: 0 14px 34px -16px hsla(var(--primary-accent), 0.58);
}
```

## Responsive Breakpoints

Use `max-width` media queries in descending order:
- `1180px` - Proof strip and process grid collapse
- `1120px` - Hero grid collapses to single column
- `1100px` - Contact layout collapses to single column
- `1020px` - Bento grid items go full-width
- `980px` - Nav links shrink, FAQ goes single-column
- `760px` - Mobile breakpoint: hamburger nav, single-column everything, reduced spacing

**Reduced motion support in `css/main.css`:**
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation: none !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

## JavaScript Patterns

**Single class architecture in `js/main.js`:**
```javascript
class App {
  constructor() {
    this.initNavbar();
    this.initMobileNav();
    this.initRevealObserver();
    this.initMagneticEffects();
    this.initFaq();
    this.initContactForm();
  }
  // Each method handles one feature
}
document.addEventListener('DOMContentLoaded', () => { new App(); });
```

**Guard clause pattern at top of every init method:**
```javascript
initSomething() {
    const el = document.getElementById('someId');
    if (!el) return;
    // ... rest of logic
}
```

**Event listener options:**
- Scroll listeners use `{ passive: true }` for performance
- No `preventDefault()` on scroll events

**DOM querying:**
- `document.getElementById()` for single elements
- `document.querySelectorAll()` with `.forEach()` for collections
- `.closest('.form-group')` for traversing to parent containers

**State management:**
- CSS class toggling via `classList.toggle()`, `classList.add()`, `classList.remove()`
- `aria-expanded` attribute kept in sync with nav toggle state
- `document.body.style.overflow` toggled for mobile nav overlay

**Feature detection:**
```javascript
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
if (!hasFinePointer || window.innerWidth < 1024) return;
```

## HTML Patterns

**Semantic structure:**
- `<nav>` with `aria-label="Primary"`
- `<main id="mainContent">` wrapping all sections
- `<section>` for each content block with descriptive `id`
- `<article>` for repeatable card content
- `<aside>` for contact section sidebar
- `<details>/<summary>` for FAQ accordion (native HTML)
- `<blockquote>` with `<footer>` for testimonials
- `<footer>` for site footer

**Accessibility attributes:**
- `<a class="skip-link" href="#mainContent">Skip to content</a>` as first body child
- `aria-hidden="true"` on decorative elements (logo mark, service icons, browser mockup visual)
- `aria-label` on interactive containers and landmark sections
- `aria-expanded` on nav toggle button
- `role="status"` and `aria-live="polite"` on form success message
- `lang="en-AU"` on `<html>` element

**Form field pattern:**
```html
<div class="form-group">
  <label class="form-label" for="fieldId">Label *</label>
  <input type="text" id="fieldId" name="field_name" class="form-input" placeholder="..." required>
  <span class="form-error-msg">Error message text</span>
</div>
```
Error state toggled by adding `.error` class to `.form-group`.

**SEO meta tags present:**
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- Open Graph: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<meta name="robots" content="index,follow">`
- `<meta name="theme-color" content="#0a111c">`

**SVG icons are inline (not icon font, not external files):**
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
</svg>
```

## Comments

**CSS files start with a top-level block comment:**
```css
/* Contact section and form styling */
```
or
```css
/*
  Vanguard Digital Solutions - Core Styles
  Shared tokens, typography, navigation, sections, and global utilities
*/
```

**JS file uses a JSDoc-style header:**
```javascript
/**
 * Vanguard Digital Solutions - Interaction Controller
 */
```

**Inline comments are minimal.** Only used in `css/visuals.css` for section separators:
```css
/* --- Visual 1: Website Sprint (Wireframe) --- */
```

## Form Validation

**Client-side validation in `js/main.js`:**
- HTML `required` attribute on mandatory fields
- `novalidate` on `<form>` to disable browser-native validation UI
- Custom JS validation on submit
- Australian phone regex: `/^(\+?61|0)[2-478]\d{8}$/` and `/^(\+?61|0)4\d{8}$/`
- Phone input restricted to `[\d+\s()-]` characters, max 16 chars
- Error class `.error` toggled on `.form-group` parent
- Error messages cleared on `input` event per field

**Form submission uses `mailto:` link (no backend):**
```javascript
window.location.href = `mailto:hello@vanguarddigital.com.au?subject=${subject}&body=${body}`;
```

---

*Convention analysis: 2026-02-16*
