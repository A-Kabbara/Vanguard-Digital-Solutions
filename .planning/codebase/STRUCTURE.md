# Codebase Structure

**Analysis Date:** 2026-02-16

## Directory Layout

```
C:\N8N\Agency\Website\
├── css/                            # All stylesheets, split by page domain
│   ├── main.css                    # Design tokens, global resets, nav, sections, utilities (800 lines)
│   ├── hero.css                    # Hero section and browser mockup visual (331 lines)
│   ├── bento.css                   # Bento grid, case study cards, service cards (241 lines)
│   ├── form.css                    # Contact form, input styles, validation states (268 lines)
│   └── visuals.css                 # Decorative visuals: wireframe, nodes, chart (227 lines) -- NOT LINKED
├── js/
│   └── main.js                     # All client-side interactivity (199 lines)
├── assets/                         # Empty -- no images or media assets used
├── scripts/                        # Empty -- no build or utility scripts
├── .planning/
│   └── codebase/                   # Architecture documentation (this file)
├── index.html                      # Single-page HTML entry point (506 lines)
└── vanguard-claude-code-prompt.md  # Original design specification/brief (311 lines)
```

## Directory Purposes

**`css/`:**
- Purpose: All presentation styles, organized by page section/concern
- Contains: 5 `.css` files
- Key files:
  - `css/main.css`: Design tokens (`:root` custom properties), CSS reset, typography classes (`.h-font`, `.mono`, `.gradient-text`), layout utilities (`.container`, `.section-padding`), glassmorphism (`.glass`), buttons (`.btn`, `.btn-primary`, `.btn-secondary`), navbar, proof strip, quote band, stack chips, process section, FAQ section, footer, reveal animation system, and all responsive breakpoints for global components
  - `css/hero.css`: Hero section layout, hero badge, browser mockup wireframe UI, floating card, hero-specific responsive rules
  - `css/bento.css`: 12-column bento grid system with size classes, case study card styles, service card styles, service icon boxes, service-specific responsive rules
  - `css/form.css`: Contact section layout (split aside + form), all form input types, validation error states, success overlay, form-specific responsive rules
  - `css/visuals.css`: CSS-only decorative illustrations (wireframe mockup, automation node diagram, bar chart). **Note: This file is NOT linked in `index.html` and its classes are NOT used in the HTML.** It appears to be unused/leftover code.

**`js/`:**
- Purpose: Client-side behavior
- Contains: Single file `main.js`
- Key files: `js/main.js` -- a single `App` class with 6 methods:
  - `initNavbar()`: Scroll-based `.scrolled` class toggle on `#navbar`
  - `initMobileNav()`: Hamburger menu open/close with keyboard and resize handling
  - `initRevealObserver()`: IntersectionObserver for `.reveal` scroll animations
  - `initMagneticEffects()`: Mouse-following magnetic effect on hero and nav CTA buttons (desktop only, fine pointer only)
  - `initFaq()`: Accordion behavior on `<details>` elements (single-open)
  - `initContactForm()`: Form validation, phone sanitization, `mailto:` submission

**`assets/`:**
- Purpose: Intended for static media assets (images, icons, etc.)
- Contains: Empty -- no assets exist. All visuals are CSS-only or inline SVG.
- Generated: No
- Committed: Yes (empty directory)

**`scripts/`:**
- Purpose: Intended for build or utility scripts
- Contains: Empty
- Generated: No
- Committed: Yes (empty directory)

## Key File Locations

**Entry Points:**
- `index.html`: The one and only HTML page; loads all CSS and JS

**Configuration:**
- No configuration files exist (no package.json, no build config, no .env)
- Design tokens are in `css/main.css` `:root` block (lines 6-46)

**Core Logic:**
- `js/main.js`: All JavaScript logic (form validation, nav, scroll animations)

**Styles by Section:**
- Navbar, footer, global utilities: `css/main.css`
- Hero section: `css/hero.css`
- Case studies + services grids: `css/bento.css`
- Contact form: `css/form.css`

**Design Spec:**
- `vanguard-claude-code-prompt.md`: Original build brief (note: the actual implementation diverged significantly from this spec -- different fonts, different color palette, dark-mode glassmorphism instead of light sections)

## Naming Conventions

**Files:**
- CSS files: lowercase, single-word domain names (`main.css`, `hero.css`, `bento.css`, `form.css`, `visuals.css`)
- JS files: lowercase (`main.js`)
- HTML files: lowercase (`index.html`)
- Documentation: lowercase with hyphens (`vanguard-claude-code-prompt.md`)

**CSS Classes:**
- Component names: lowercase with hyphens (`hero-badge`, `nav-container`, `contact-form`)
- Modifier/variant classes: hyphenated (`bento-lg`, `bento-sm`, `btn-primary`, `btn-secondary`)
- Utility classes: short descriptive names (`glass`, `mono`, `container`, `reveal`)
- State classes: past-tense or descriptive (`scrolled`, `open`, `active`, `error`, `reveal-active`)
- Animation delay classes: `d-100`, `d-200`, `d-300`, `d-400` (100ms increments)
- Section-scoped prefixes: `hero-*`, `nav-*`, `form-*`, `case-*`, `service-*`, `process-*`, `faq-*`, `browser-*`, `metric-*`, `proof-*`, `stack-*`, `footer-*`, `contact-*`

**HTML IDs:**
- camelCase for JavaScript-accessed elements: `navbar`, `navToggle`, `navLinks`, `mainContent`, `contactForm`, `formSuccess`, `fullName`, `email`, `phone`, `service`, `message`
- Section anchors: lowercase (`hero`, `work`, `services`, `approach`, `faq`, `contact`)

## CSS Load Order (matters for cascade)

1. `css/main.css` -- Must load first (defines all custom properties and base styles)
2. `css/hero.css` -- Hero section styles
3. `css/bento.css` -- Grid and card styles for work/services sections
4. `css/form.css` -- Contact form styles
5. `css/visuals.css` -- **NOT loaded** (not linked in `index.html`)

## Where to Add New Code

**New Page Section:**
- Add HTML section in `index.html` within `<main id="mainContent">` between existing sections
- Add a new CSS file in `css/` following the single-domain pattern (e.g., `css/testimonials.css`)
- Link the new CSS file in `index.html` `<head>` after existing CSS links
- Use existing utility classes: `.container` for width, `.section-padding` for spacing, `.glass` for card styling, `.reveal` for scroll animation
- Follow the `.section-head` pattern for section headers: `.section-eyebrow` (mono label) + `.section-title` (heading) + `.section-copy` (description)
- Add section anchor ID to nav links in both `<nav>` and `<footer>`

**New Interactive Behavior:**
- Add a new method to the `App` class in `js/main.js`
- Call the method from the `constructor()` (lines 7-13)
- Follow the existing pattern: check for element existence first, then attach event listeners

**New Form Fields:**
- Add HTML input within `#contactForm` in `index.html`
- Use existing classes: `.form-group`, `.form-label`, `.form-input` / `.form-select` / `.form-textarea`
- Add `required` attribute if mandatory; add `.form-error-msg` span for validation message
- Update the `mailto:` body construction in `js/main.js` `initContactForm()` (line 177)

**New CSS Variables:**
- Add to `:root` block in `css/main.css` (lines 6-46)
- Follow existing naming: `--bg-*` for backgrounds, `--text-*` for text colors, `--fs-*` for font sizes, `--space-*` for spacing, `--radius-*` for border radii

**New Responsive Breakpoints:**
- Add `@media` queries at the bottom of the relevant CSS file
- Existing breakpoints: `1180px`, `1120px`, `1100px`, `1020px`, `980px`, `760px`
- Mobile-first breakpoint is `760px` (matches hamburger nav threshold in JS at line 53)

## Special Directories

**`.git/`:**
- Purpose: Git version control
- Generated: Yes
- Committed: N/A (is the repo itself)

**`.planning/`:**
- Purpose: GSD planning and architecture documentation
- Generated: By GSD mapping process
- Committed: No (untracked per git status)

**`assets/`:**
- Purpose: Placeholder for future static assets (images, fonts, etc.)
- Generated: No
- Committed: Yes (empty)
- Note: Currently unused -- all visuals are pure CSS

**`scripts/`:**
- Purpose: Placeholder for future utility/build scripts
- Generated: No
- Committed: Yes (empty)
- Note: Currently unused -- no build process exists

## Section Map (index.html)

The single HTML file contains these sections in order, each with an anchor ID:

| Line Range | Section ID   | Purpose                          | CSS File     |
|------------|-------------|----------------------------------|-------------|
| 46-63      | (navbar)     | Fixed navigation bar             | `main.css`  |
| 66-144     | `#hero`      | Hero with headline, CTAs, mockup | `hero.css`  |
| 146-177    | (proof-strip)| Metrics and sector pills         | `main.css`  |
| 179-187    | (quote-band) | Client testimonial blockquote    | `main.css`  |
| 189-242    | `#work`      | Client outcomes bento grid       | `bento.css` |
| 244-323    | `#services`  | Service offerings bento grid     | `bento.css` |
| 325-344    | (stack)      | Platform integration chips       | `main.css`  |
| 346-382    | `#approach`  | 4-step delivery process          | `main.css`  |
| 384-417    | `#faq`       | FAQ accordion                    | `main.css`  |
| 419-485    | `#contact`   | Contact form + sidebar info      | `form.css`  |
| 488-503    | (footer)     | Footer links and legal info      | `main.css`  |

---

*Structure analysis: 2026-02-16*
