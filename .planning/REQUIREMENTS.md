# Requirements

**Project:** Vanguard Digital — Agency Website Redesign
**Version:** v1
**Created:** 2026-02-16

## v1 Requirements

### Design System

- [ ] **DES-01**: Site uses three-tier design token system (primitive > semantic > component) via CSS custom properties in `:root`
- [ ] **DES-02**: Typography uses Instrument Serif (headings) + Inter (body) + JetBrains Mono (labels/mono) loaded via Google Fonts
- [ ] **DES-03**: Color palette uses off-black backgrounds (#08090E primary, #0F1117 surface, #161820 subtle), off-white text (#F0F0F5 primary, #9B9BA8 secondary), and electric indigo accent (#635BFF)
- [ ] **DES-04**: Dark theme follows WCAG AA contrast (4.5:1 body text, 3:1 large text) — no pure black or pure white
- [ ] **DES-05**: Cards use solid dark backgrounds with 1px low-opacity borders — NO glassmorphism, NO backdrop-filter on cards
- [ ] **DES-06**: Subtle grain/noise texture overlay on hero and section backgrounds (SVG filter, 2-5% opacity)
- [ ] **DES-07**: Border radius varies by component type (not uniform 8px everywhere) — buttons 12px, cards 16px, some elements sharp
- [ ] **DES-08**: Fluid type scale using `clamp()` from body to hero heading sizes
- [ ] **DES-09**: Spacing scale with consistent vertical rhythm via CSS custom properties
- [ ] **DES-10**: No gradient blobs, no floating spheres, no glassmorphism, no purple-blue ambient gradients

### Layout & Structure

- [ ] **LAY-01**: Single-page architecture with 10 distinct sections in AIDA conversion funnel order: Nav → Hero → Problem → Services → Who We Help → Process → Social Proof → FAQ → Final CTA → Footer
- [ ] **LAY-02**: Max container width 1120px centered, with responsive padding
- [ ] **LAY-03**: Section padding ~100px vertical (desktop), ~64px (mobile) with variation between sections
- [ ] **LAY-04**: At least 2 sections break the grid pattern entirely (problem section = editorial text, final CTA = minimal focused)
- [ ] **LAY-05**: Intentional asymmetry — varied section alignments (centered, left-aligned, offset) to avoid AI-template uniformity
- [ ] **LAY-06**: Mobile-first responsive design with 3 breakpoints (default desktop, 1024px tablet, 640px mobile)
- [ ] **LAY-07**: All grids collapse gracefully to single column on mobile with thumb-friendly tap targets

### Hero Section

- [ ] **HERO-01**: Full viewport height hero with centered layout, answers "what/who/why" in under 3 seconds
- [ ] **HERO-02**: Pill badge with green pulse dot and availability text (e.g., "Now taking Q1 2026 clients")
- [ ] **HERO-03**: H1 headline in Instrument Serif conveying core value proposition for Australian businesses
- [ ] **HERO-04**: Subtitle in Inter explaining the offer for trades/SMBs
- [ ] **HERO-05**: Two CTAs: primary "Book a Free Strategy Call" (solid accent) + secondary "See What We Build" (outline)
- [ ] **HERO-06**: Trust strip with 3-4 trust signals (Melbourne Based, ABN Registered, AI-First Agency)
- [ ] **HERO-07**: Subtle dot-grid or grain background pattern — no gradient blobs, no floating shapes
- [ ] **HERO-08**: Distinctive hero elements that break centered-hero AI pattern (asymmetric trust bar, editorial H1 line breaks)

### Content Sections

- [ ] **CONT-01**: Problem/pain section using pure editorial typography — large serif statement about businesses leaving money on the table, specific pain points, bold kicker. NO cards, NO icons, NO grids in this section.
- [ ] **CONT-02**: Services section with 4 service cards in 2x2 grid: AI-Powered Websites, AI Receptionist, Google Review Agent, Lead Generation Engine — each with concrete outcome statement
- [ ] **CONT-03**: Process section showing 4 steps (Discovery Call → Strategy & Quote → Build & Launch → Optimise) with visual connectors
- [ ] **CONT-04**: "Who We Help" section with 3 client archetype cards (Trades & Local, Growing SMBs, Startups & New Ventures) — each with specific pain point and outcome
- [ ] **CONT-05**: Social proof section with placeholder-ready structure (stats strip: 48hr turnaround, 20+ hours saved, 100% Aus owned, $0 strategy call) — ready for future testimonials/logos
- [ ] **CONT-06**: FAQ section with 6 questions covering cost, timeline, technical ability, remote work, scope, and differentiation — accordion behavior
- [ ] **CONT-07**: Strong final CTA section with large serif headline, subtitle, two buttons, company details (Melbourne, ABN) — different visual treatment from rest of page
- [ ] **CONT-08**: Copy uses natural Australian English, contractions, specific language — NO AI vocabulary (delve, harness, leverage, cutting-edge, solutions)
- [ ] **CONT-09**: No pricing displayed anywhere — all messaging points to "book a call" for custom quotes

### Contact Form & Lead Capture

- [ ] **FORM-01**: Contact form with fields: name, email, phone, service (dropdown), message
- [ ] **FORM-02**: Client-side validation with per-field error messages — email format, Australian phone regex, required fields
- [ ] **FORM-03**: Form submits via POST to webhook endpoint (n8n or similar) — NOT mailto:
- [ ] **FORM-04**: Visible success state after submission that allows re-submission (not permanent overlay)
- [ ] **FORM-05**: Graceful error handling for network failures with user-friendly message
- [ ] **FORM-06**: Honeypot field for spam protection (hidden field, reject if filled)

### Navigation

- [ ] **NAV-01**: Fixed/sticky navbar with smooth-scroll anchor links to all major sections
- [ ] **NAV-02**: Left: "VANGUARD" wordmark in JetBrains Mono with accent dot
- [ ] **NAV-03**: Right: Section links + "Book a Call" accent button
- [ ] **NAV-04**: On scroll: darker background + border-bottom appears (backdrop-filter allowed ONLY here)
- [ ] **NAV-05**: Mobile: hamburger menu with full-screen overlay, body scroll lock, escape key close
- [ ] **NAV-06**: Mobile nav auto-closes on resize above breakpoint and on link click

### Interactive Elements

- [ ] **INT-01**: Scroll-triggered reveal animations using IntersectionObserver — translateY(20px) + opacity fade, 0.6s ease
- [ ] **INT-02**: Staggered reveal delays for grouped elements (100-400ms increments)
- [ ] **INT-03**: FAQ accordion with single-open behavior using native `<details>/<summary>` + JS enforcement
- [ ] **INT-04**: Meaningful hover states on all interactive elements — buttons (scale + shadow), cards (lift/border), links (animated underline)
- [ ] **INT-05**: `prefers-reduced-motion` media query disables all animations and transitions
- [ ] **INT-06**: Smooth scroll behavior for anchor navigation

### Accessibility

- [ ] **A11Y-01**: Semantic HTML structure — `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<details>`
- [ ] **A11Y-02**: Single `<h1>` (hero), all section headings `<h2>`, proper heading hierarchy
- [ ] **A11Y-03**: Skip link for keyboard navigation to main content
- [ ] **A11Y-04**: `aria-labelledby` on every `<section>` for screen reader landmarks
- [ ] **A11Y-05**: `aria-expanded` on mobile nav toggle and FAQ items, dynamically updated
- [ ] **A11Y-06**: `focus-visible` outline styles on all interactive elements (accent color)
- [ ] **A11Y-07**: `role="status"` and `aria-live="polite"` on form success/error messages
- [ ] **A11Y-08**: Color contrast meets WCAG AA for all text/background combinations

### SEO & Meta

- [ ] **SEO-01**: Full Open Graph meta tags (title, description, image, URL, type)
- [ ] **SEO-02**: Twitter Card meta tags
- [ ] **SEO-03**: Canonical URL set to `https://vanguarddigital.com.au/`
- [ ] **SEO-04**: `lang="en-AU"` attribute on `<html>`
- [ ] **SEO-05**: LocalBusiness JSON-LD structured data (name, address Melbourne, ABN, services)
- [ ] **SEO-06**: FAQPage JSON-LD structured data for FAQ section
- [ ] **SEO-07**: Meta description, robots directive, theme-color meta tag
- [ ] **SEO-08**: Inline SVG favicon (no external file dependency)

### Performance

- [ ] **PERF-01**: Zero external JS dependencies — vanilla JavaScript only
- [ ] **PERF-02**: JS loaded with `defer` or `type="module"`
- [ ] **PERF-03**: Google Fonts loaded with `preconnect` hints and `display=swap`
- [ ] **PERF-04**: No images — all visuals are CSS-only (gradients, shapes, SVG icons inline)
- [ ] **PERF-05**: Target LCP under 1.5 seconds on 4G connection
- [ ] **PERF-06**: Deployable to any static host with zero build step

### Custom SVG Icons

- [ ] **ICON-01**: Custom inline SVG icons for each of the 4 services — consistent stroke weight, not from generic icon library
- [ ] **ICON-02**: SVG icons for process steps
- [ ] **ICON-03**: SVG icons for trust signals and footer elements

### Footer

- [ ] **FOOT-01**: 4-column footer: Logo + tagline | Services links | Company links | Contact info + booking link
- [ ] **FOOT-02**: Bottom bar with copyright and ABN number
- [ ] **FOOT-03**: Australia-wide positioning with Melbourne base noted

---

## v2 Requirements (Deferred)

- Interactive AI chatbot on the site (needs n8n workflow production-ready)
- Case study deep-dive pages (need real client stories)
- Video hero background (need quality video content)
- Client logo carousel in social proof section (need real client logos)
- Testimonial quotes with photos (need real testimonials)
- Analytics integration (Google Analytics / Plausible)
- Privacy policy page
- Blog / resources section

## Out of Scope

- Multi-page architecture — single page converts better at this stage
- Backend server or CMS — static site, content managed in code
- Payment processing — custom quotes, no online checkout
- Client portal or login — not needed
- Package/tier pricing display — custom quotes only
- Framework migration (React/Next.js/Astro) — vanilla HTML/CSS/JS per constraint
- AI-generated team photos or stock photography — no imagery needed

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DES-01 | Phase 1: Design Foundation | Pending |
| DES-02 | Phase 1: Design Foundation | Pending |
| DES-03 | Phase 1: Design Foundation | Pending |
| DES-04 | Phase 1: Design Foundation | Pending |
| DES-05 | Phase 2: Component Library | Pending |
| DES-06 | Phase 4: Hero Section | Pending |
| DES-07 | Phase 2: Component Library | Pending |
| DES-08 | Phase 1: Design Foundation | Pending |
| DES-09 | Phase 1: Design Foundation | Pending |
| DES-10 | Phase 1: Design Foundation | Pending |
| LAY-01 | Phase 3: Page Structure & Navigation | Pending |
| LAY-02 | Phase 1: Design Foundation | Pending |
| LAY-03 | Phase 1: Design Foundation | Pending |
| LAY-04 | Phase 5: Content Sections | Pending |
| LAY-05 | Phase 5: Content Sections | Pending |
| LAY-06 | Phase 1: Design Foundation | Pending |
| LAY-07 | Phase 3: Page Structure & Navigation | Pending |
| HERO-01 | Phase 4: Hero Section | Pending |
| HERO-02 | Phase 4: Hero Section | Pending |
| HERO-03 | Phase 4: Hero Section | Pending |
| HERO-04 | Phase 4: Hero Section | Pending |
| HERO-05 | Phase 4: Hero Section | Pending |
| HERO-06 | Phase 4: Hero Section | Pending |
| HERO-07 | Phase 4: Hero Section | Pending |
| HERO-08 | Phase 4: Hero Section | Pending |
| CONT-01 | Phase 5: Content Sections | Pending |
| CONT-02 | Phase 5: Content Sections | Pending |
| CONT-03 | Phase 5: Content Sections | Pending |
| CONT-04 | Phase 5: Content Sections | Pending |
| CONT-05 | Phase 5: Content Sections | Pending |
| CONT-06 | Phase 6: FAQ & Contact Form | Pending |
| CONT-07 | Phase 5: Content Sections | Pending |
| CONT-08 | Phase 5: Content Sections | Pending |
| CONT-09 | Phase 5: Content Sections | Pending |
| FORM-01 | Phase 6: FAQ & Contact Form | Pending |
| FORM-02 | Phase 6: FAQ & Contact Form | Pending |
| FORM-03 | Phase 6: FAQ & Contact Form | Pending |
| FORM-04 | Phase 6: FAQ & Contact Form | Pending |
| FORM-05 | Phase 6: FAQ & Contact Form | Pending |
| FORM-06 | Phase 6: FAQ & Contact Form | Pending |
| NAV-01 | Phase 3: Page Structure & Navigation | Pending |
| NAV-02 | Phase 3: Page Structure & Navigation | Pending |
| NAV-03 | Phase 3: Page Structure & Navigation | Pending |
| NAV-04 | Phase 3: Page Structure & Navigation | Pending |
| NAV-05 | Phase 3: Page Structure & Navigation | Pending |
| NAV-06 | Phase 3: Page Structure & Navigation | Pending |
| INT-01 | Phase 8: Interactions & Animations | Pending |
| INT-02 | Phase 8: Interactions & Animations | Pending |
| INT-03 | Phase 6: FAQ & Contact Form | Pending |
| INT-04 | Phase 2: Component Library | Pending |
| INT-05 | Phase 8: Interactions & Animations | Pending |
| INT-06 | Phase 8: Interactions & Animations | Pending |
| A11Y-01 | Phase 3: Page Structure & Navigation | Pending |
| A11Y-02 | Phase 3: Page Structure & Navigation | Pending |
| A11Y-03 | Phase 3: Page Structure & Navigation | Pending |
| A11Y-04 | Phase 9: Accessibility & SEO | Pending |
| A11Y-05 | Phase 9: Accessibility & SEO | Pending |
| A11Y-06 | Phase 9: Accessibility & SEO | Pending |
| A11Y-07 | Phase 9: Accessibility & SEO | Pending |
| A11Y-08 | Phase 9: Accessibility & SEO | Pending |
| SEO-01 | Phase 9: Accessibility & SEO | Pending |
| SEO-02 | Phase 9: Accessibility & SEO | Pending |
| SEO-03 | Phase 9: Accessibility & SEO | Pending |
| SEO-04 | Phase 9: Accessibility & SEO | Pending |
| SEO-05 | Phase 9: Accessibility & SEO | Pending |
| SEO-06 | Phase 9: Accessibility & SEO | Pending |
| SEO-07 | Phase 9: Accessibility & SEO | Pending |
| SEO-08 | Phase 9: Accessibility & SEO | Pending |
| PERF-01 | Phase 10: Performance & Polish | Pending |
| PERF-02 | Phase 10: Performance & Polish | Pending |
| PERF-03 | Phase 10: Performance & Polish | Pending |
| PERF-04 | Phase 10: Performance & Polish | Pending |
| PERF-05 | Phase 10: Performance & Polish | Pending |
| PERF-06 | Phase 10: Performance & Polish | Pending |
| ICON-01 | Phase 5: Content Sections | Pending |
| ICON-02 | Phase 5: Content Sections | Pending |
| ICON-03 | Phase 5: Content Sections | Pending |
| FOOT-01 | Phase 7: Footer | Pending |
| FOOT-02 | Phase 7: Footer | Pending |
| FOOT-03 | Phase 7: Footer | Pending |

---
*Created: 2026-02-16*
