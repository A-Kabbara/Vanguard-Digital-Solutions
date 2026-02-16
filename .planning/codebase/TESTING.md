# Testing Patterns

**Analysis Date:** 2026-02-16

## Test Framework

**Runner:** None

There is no automated test framework, test runner, or testing library in this project. No `package.json`, no test configuration files, no test directories, no test files of any kind.

**This is a zero-dependency vanilla HTML/CSS/JS site.** Testing is entirely manual.

## Validation Approach

Since there are no automated tests, quality assurance relies on:

1. **Manual browser testing** - Open `index.html` directly in a browser
2. **CSS design token consistency** - All values flow from `:root` custom properties in `css/main.css`
3. **HTML validation** - Standard HTML5 semantics, can be validated via [W3C Validator](https://validator.w3.org/)
4. **Accessibility audit** - Built-in a11y features need manual or tool-based verification

## Browser Support

**Target:** Modern evergreen browsers. The codebase uses features requiring:

**CSS features used (and their support implications):**
- `clamp()` - Chrome 79+, Firefox 75+, Safari 13.1+
- `min()` in width - Chrome 79+, Firefox 75+, Safari 13.1+
- `backdrop-filter` - Chrome 76+, Safari 9+ (with `-webkit-` prefix, which IS included)
- `text-wrap: balance` - Chrome 114+, Firefox 121+ (**not supported in Safari as of early 2026**)
- CSS custom properties - Chrome 49+, Firefox 31+, Safari 9.1+
- `inset` shorthand - Chrome 87+, Firefox 66+, Safari 14.1+
- `grid` layout - Chrome 57+, Firefox 52+, Safari 10.1+
- `::selection` - All modern browsers
- `scroll-behavior: smooth` - Chrome 61+, Firefox 36+, Safari 15.4+
- `isolation: isolate` - Chrome 41+, Firefox 36+, Safari 8+
- `appearance: none` on form elements - Chrome 84+, Firefox 80+, Safari 15.4+

**JS features used:**
- `class` syntax - ES6, all modern browsers
- `IntersectionObserver` - Chrome 51+, Firefox 55+, Safari 12.1+
- `window.matchMedia()` - Chrome 9+, Firefox 6+, Safari 5.1+
- Arrow functions - Chrome 45+, Firefox 22+, Safari 10+
- Template literals - Chrome 41+, Firefox 34+, Safari 9+
- `FormData` - Chrome 7+, Firefox 4+, Safari 5+
- `for...of` via `.forEach()` on NodeList - Chrome 51+, Firefox 50+, Safari 10+
- `{ passive: true }` event listener option - Chrome 51+, Firefox 49+, Safari 10+

**Minimum effective browser support:** Chrome 114+, Firefox 121+, Safari 15.4+ (with `text-wrap: balance` being the most restrictive CSS feature, though it degrades gracefully).

**Vendor prefixes present:**
- `-webkit-background-clip: text` in `css/main.css` (line 159)
- `-webkit-backdrop-filter: blur()` in `css/main.css` (line 254)
- `-webkit-font-smoothing` in `css/main.css` (line 60)
- `-moz-osx-font-smoothing` in `css/main.css` (line 61)
- `-webkit-details-marker` removal in `css/main.css` (line 616)

## Accessibility Considerations

**What IS implemented:**

- Skip-to-content link: `<a class="skip-link" href="#mainContent">Skip to content</a>` in `index.html` (line 44)
- `lang="en-AU"` on `<html>` element
- Semantic landmarks: `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>`
- `aria-label="Primary"` on `<nav>` element
- `aria-expanded` on mobile nav toggle, kept in sync by JS
- `aria-hidden="true"` on decorative elements (logo mark, service icons, hero visual mockup)
- `aria-label` on proof metrics section and stack grid
- `role="status"` and `aria-live="polite"` on form success message (`#formSuccess`)
- Native `<details>/<summary>` for FAQ accordion (keyboard accessible by default)
- Proper `<label for="id">` associations on all form fields
- Focus-visible styles on all interactive elements in `css/main.css` (lines 676-684):
  ```css
  a:focus-visible, button:focus-visible, input:focus-visible,
  select:focus-visible, textarea:focus-visible, summary:focus-visible {
      outline: 2px solid hsla(var(--secondary-accent), 0.96);
      outline-offset: 2px;
  }
  ```
- `prefers-reduced-motion: reduce` media query disabling all animations and transitions in `css/main.css` (lines 792-800)
- Form error messages use visible text (`.form-error-msg`) toggled via CSS `.error` class

**What needs manual verification:**

- **Color contrast ratios**: Body text is `hsl(210 32% 95%)` on dark backgrounds around `hsl(218 43% 7%)`. The dimmer text `hsl(215 12% 60%)` used for `.text-dim` may not meet WCAG AA 4.5:1 contrast ratio against the dark background. Verify with a contrast checker.
- **Touch target sizes**: Nav links and small chips (`.hero-chip`, `.sector-pill`, `.stack-chip`) may be smaller than the 44x44px WCAG recommended touch target. The pills have small padding (`0.42rem 0.72rem`).
- **Keyboard navigation order**: The mobile nav overlay uses `visibility: hidden` / `visibility: visible` toggling. Verify that hidden nav links are not focusable when the overlay is closed.
- **Screen reader experience**: The `.gradient-text` class uses `color: transparent` and `-webkit-text-fill-color: transparent`, which some screen readers may interpret differently. Verify headings are announced correctly.
- **Form error announcements**: Error messages (`.form-error-msg`) are toggled via CSS `display: none/block`, NOT via `aria-live`. Screen readers may not announce dynamically appearing errors. Consider adding `aria-describedby` linking fields to their error messages and `aria-invalid="true"` on invalid fields.
- **Scroll-reveal hidden content**: Elements with `.reveal` start at `opacity: 0`. If JS fails to load, ALL content with `.reveal` class remains invisible. There is no `<noscript>` fallback and no CSS-only fallback for the reveal state.

## Manual Testing Checklist

**Layout and Responsiveness:**
- [ ] Desktop (>1180px): Full bento grid, 4-column process, 2-column FAQ, side-by-side contact
- [ ] Tablet (~980px): Nav links shrink, FAQ single column, proof grid 2-column
- [ ] Mobile (<=760px): Hamburger nav, single-column everything, full-width buttons
- [ ] Hero section grid collapses at 1120px
- [ ] Contact layout collapses at 1100px
- [ ] Bento grid collapses at 1020px
- [ ] No horizontal overflow at any viewport width (check `overflow-x: hidden` on body)

**Navigation:**
- [ ] Navbar adds `.scrolled` class after scrolling past 60px
- [ ] Mobile hamburger opens/closes correctly
- [ ] Clicking nav link closes mobile menu
- [ ] Escape key closes mobile menu
- [ ] Resizing window above 760px closes mobile menu
- [ ] `aria-expanded` updates correctly on toggle
- [ ] Body scroll locked when mobile nav is open

**Scroll Reveal Animations:**
- [ ] Elements fade up as they enter viewport (threshold 0.12, rootMargin -80px bottom)
- [ ] Staggered delays work: `.d-100` through `.d-400`
- [ ] Elements only animate once (observer unobserves after triggering)
- [ ] Animations disabled when `prefers-reduced-motion: reduce` is active

**Interactive Elements:**
- [ ] Magnetic button effect works on desktop with fine pointer (hero CTAs and nav CTA)
- [ ] Magnetic effect disabled on touch devices and screens < 1024px
- [ ] Glass card hover glow appears on `.glass` elements
- [ ] Service card left-border color changes on hover
- [ ] FAQ accordion: opening one closes others
- [ ] FAQ plus icon rotates to X on open

**Contact Form:**
- [ ] Required fields show error state when empty on submit
- [ ] Phone validates as Australian format (04xx, 02-08xx with +61 prefix support)
- [ ] Phone input strips non-numeric characters (except `+`, spaces, parens, hyphens)
- [ ] Phone input limited to 16 characters
- [ ] Error clears when user starts typing in errored field
- [ ] Valid submit opens `mailto:` with pre-filled subject and body
- [ ] Success overlay appears after submit
- [ ] Form resets after successful submission
- [ ] Email field validates via native `type="email"` (no custom regex)

**Smooth Scrolling:**
- [ ] Anchor links (`#work`, `#services`, `#approach`, `#faq`, `#contact`) scroll smoothly
- [ ] `scroll-margin-top: 98px` on `[id]` elements accounts for fixed navbar height

## Performance Testing

**Key checks:**
- [ ] Google Fonts loaded with `rel="preconnect"` for both `fonts.googleapis.com` and `fonts.gstatic.com`
- [ ] Font display set to `swap` in Google Fonts URL
- [ ] JS loaded with `defer` attribute (non-blocking)
- [ ] No external JS dependencies (zero HTTP requests beyond fonts)
- [ ] Body background uses inline SVG data URI for noise texture (no image request)
- [ ] Favicon uses inline SVG data URI (no file request)
- [ ] `assets/` and `scripts/` directories are empty (no unused asset bloat)
- [ ] Scroll listener uses `{ passive: true }`

**Total assets to load:**
1. `index.html` (~24KB)
2. `css/main.css` (~16KB)
3. `css/hero.css` (~7KB)
4. `css/bento.css` (~5KB)
5. `css/form.css` (~6KB)
6. `js/main.js` (~6KB)
7. Google Fonts CSS + WOFF2 files (3 font families: Syne, Manrope, IBM Plex Mono)

Total self-hosted: ~64KB (before gzip). No images. No third-party JS.

## How to Add Tests

If automated testing is desired in the future:

**Recommended approach for this type of project:**
1. Add a `package.json` with `vitest` or `jest` + `jsdom` for unit testing the `App` class
2. Use Playwright or Cypress for E2E visual/interaction testing
3. Use `axe-core` or `pa11y` for automated accessibility auditing
4. Use `lighthouse` CLI for performance scoring

**What to test first (highest risk):**
1. Form validation logic (`validatePhone` regex, required field checks, error toggling)
2. Mobile nav state management (open/close, escape key, resize cleanup)
3. Accessibility: color contrast, keyboard navigation, screen reader announcements
4. Cross-browser rendering of `backdrop-filter`, `text-wrap: balance`, `clamp()`

## Known Gaps

**JS failure mode:** If `js/main.js` fails to load or execute:
- ALL `.reveal` elements remain invisible (`opacity: 0`)
- Mobile navigation is non-functional (hamburger does nothing)
- Form validation is bypassed (HTML `novalidate` prevents native validation)
- FAQ accordion still works (native `<details>` element)
- Smooth scrolling still works (CSS `scroll-behavior: smooth`)

**No `<noscript>` tag** is present to warn users or provide fallback styles.

**`css/visuals.css` is not linked** in `index.html` despite existing in the `css/` directory. Its styles (wireframe, node, chart visual components) are unreachable.

---

*Testing analysis: 2026-02-16*
