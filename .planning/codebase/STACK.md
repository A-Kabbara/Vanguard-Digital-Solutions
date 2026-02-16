# Technology Stack

**Analysis Date:** 2026-02-16

## Languages

**Primary:**
- HTML5 - Single-page structure in `index.html`
- CSS3 - Five modular stylesheets in `css/` directory
- JavaScript (ES6+) - Single interaction controller in `js/main.js`

**Secondary:**
- None. This is a pure vanilla web project with zero transpilation or preprocessing.

## Runtime

**Environment:**
- Browser-only. No server-side runtime required.
- No Node.js, Python, or any backend runtime.
- Static files served directly from any web server or CDN.

**Package Manager:**
- None. No `package.json`, `node_modules`, or dependency management.
- All external resources loaded via CDN `<link>` tags.

## Frameworks

**Core:**
- None. Zero frameworks. Pure vanilla HTML/CSS/JS.
- No React, Vue, Angular, Svelte, or any UI framework.
- No Tailwind, Bootstrap, or CSS framework.

**Testing:**
- None detected. No test framework, no test files.

**Build/Dev:**
- None. No build tools, bundlers, or task runners.
- No Webpack, Vite, Parcel, esbuild, or Rollup.
- No TypeScript compiler, SASS/LESS preprocessor.
- No minification or optimization pipeline.
- Files are authored and deployed as-is.

## Key Dependencies

**Critical (CDN-loaded):**
- Google Fonts API - Three font families loaded via `fonts.googleapis.com`:
  - `Syne` (weights: 400-800) - Heading font (`--font-heading`)
  - `Manrope` (weights: 400-800) - Body font (`--font-body`)
  - `IBM Plex Mono` (weights: 400, 500, 700) - Monospace/label font (`--font-mono`)

**Infrastructure:**
- None. No runtime dependencies beyond the browser itself.

## CSS Architecture

**Design Token System (CSS Custom Properties in `:root`):**
- Color tokens: `--bg-900`, `--bg-850`, `--bg-800`, `--primary-accent`, `--secondary-accent`, `--text-strong`, `--text-body`, `--text-dim`
- Glass morphism tokens: `--glass-bg`, `--glass-border`, `--glass-shadow`
- Typography: `--font-heading`, `--font-body`, `--font-mono`
- Fluid type scale: `--fs-xs` through `--fs-hero` using `clamp()` functions
- Spacing scale: `--space-xs` through `--space-xl`
- Border radius: `--radius-sm` (12px), `--radius-md` (20px), `--radius-lg` (30px)
- Transitions: `--transition-smooth`, `--transition-soft`

**File Organization:**
- `css/main.css` (800 lines) - Design tokens, reset, typography, navigation, layout utilities, section styles, responsive breakpoints, accessibility
- `css/hero.css` (332 lines) - Hero section with browser mockup, floating card, responsive overrides
- `css/bento.css` (242 lines) - 12-column bento grid for case studies and services, service cards
- `css/form.css` (269 lines) - Contact form layout, validation states, success overlay
- `css/visuals.css` (228 lines) - Decorative visual elements (wireframe mockup, node diagram, chart bars)

**CSS Techniques Used:**
- CSS Grid (`grid-template-columns: repeat(12, minmax(0, 1fr))`)
- Flexbox throughout for alignment
- `clamp()` for fluid typography
- `backdrop-filter: blur()` for glassmorphism
- CSS custom properties for theming
- `@media (prefers-reduced-motion: reduce)` for accessibility
- Inline SVG data URIs for noise textures and select arrows
- `text-wrap: balance` for headings

## JavaScript Architecture

**Single Class Pattern:**
- `js/main.js` (200 lines) - One `App` class instantiated on `DOMContentLoaded`
- No modules, no imports, no bundling. Single `<script defer>` tag.

**Browser APIs Used:**
- `IntersectionObserver` - Scroll-reveal animations (threshold 0.12, rootMargin -80px)
- `matchMedia('(pointer: fine)')` - Magnetic button effect detection
- `FormData` API - Contact form data extraction
- `mailto:` protocol - Form submission (no server-side processing)
- Native `<details>/<summary>` - FAQ accordion with JS accordion-mode (one-open-at-a-time)

**No Polyfills Required:**
- All APIs used are widely supported in modern browsers (IntersectionObserver, CSS Grid, Custom Properties, backdrop-filter)

## Configuration

**Environment:**
- No environment variables. No `.env` files.
- No build-time or runtime configuration.
- Email address `hello@vanguarddigital.com.au` is hardcoded in `index.html` and `js/main.js`.
- Canonical URL `https://vanguarddigital.com.au/` is hardcoded in meta tags.

**SEO/Meta:**
- Full Open Graph meta tags configured in `index.html` (lines 14-25)
- Twitter card meta tags configured
- Canonical URL set
- `robots` meta set to `index,follow`
- Theme color: `#0a111c`
- Inline SVG favicon (data URI, no external file)

## Platform Requirements

**Development:**
- Any text editor
- Any local HTTP server (or just open `index.html` in a browser)
- No build step, no compilation, no installation

**Production:**
- Any static file hosting (Netlify, Vercel, GitHub Pages, S3, nginx, Apache)
- Requires HTTPS for `backdrop-filter` to work in some contexts
- Requires internet connection for Google Fonts CDN (no local font fallback configured)

**Browser Support:**
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- `backdrop-filter` requires Safari 9+ / Chrome 76+ / Firefox 103+
- `IntersectionObserver` requires Chrome 51+ / Firefox 55+ / Safari 12.1+
- `prefers-reduced-motion` media query for reduced-motion users
- `text-wrap: balance` is progressive enhancement (Chrome 114+, Firefox 121+)

## Responsive Breakpoints

Defined across CSS files:
- `1180px` - Proof section and process grid collapse (`css/main.css` line 686)
- `1120px` - Hero grid collapses to single column (`css/hero.css` line 284)
- `1100px` - Contact layout collapses to single column (`css/form.css` line 231)
- `1020px` - Bento grid items go full-width (`css/bento.css` line 224)
- `980px` - Nav links shrink, FAQ goes single column (`css/main.css` line 700)
- `760px` - Mobile breakpoint: hamburger nav, stacked layouts (`css/main.css` line 718)

---

*Stack analysis: 2026-02-16*
