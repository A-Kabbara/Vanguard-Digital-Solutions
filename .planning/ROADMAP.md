# Roadmap: Vanguard Digital Website Redesign

## Overview

Transform the existing Vanguard Digital agency website from a glassmorphism template into a premium, hand-crafted single-page site that converts Australian business owners into booked calls. The redesign proceeds layer-by-layer: design foundation first, then reusable components, then page structure and navigation, then each visual section (hero, content, FAQ/form, footer), then progressive enhancement (interactions, accessibility/SEO, performance). Every phase builds on the previous, and no phase ships partial features. The #1 quality gate throughout is that nothing looks AI-generated.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Design Foundation** - Token system, typography, color palette, spacing scale, and CSS reset
- [x] **Phase 2: Component Library** - Reusable cards, buttons, badges, and form inputs with hover states
- [x] **Phase 3: Page Structure & Navigation** - Semantic HTML skeleton, sticky navbar, mobile menu, section landmarks
- [x] **Phase 4: Hero Section** - Full-viewport hero with CTAs, trust strip, grain texture, and anti-AI distinctive elements
- [x] **Phase 5: Content Sections** - Problem, services, process, who we help, social proof, and final CTA with custom SVG icons
- [x] **Phase 6: FAQ & Contact Form** - FAQ accordion, contact form with validation, webhook submission, and spam protection
- [x] **Phase 7: Footer** - 4-column footer with navigation, services, contact info, and legal
- [x] **Phase 8: Interactions & Animations** - Scroll-triggered reveals, staggered delays, smooth scroll, reduced motion support
- [x] **Phase 9: Accessibility & SEO** - ARIA attributes, structured data, meta tags, contrast audit, screen reader landmarks
- [x] **Phase 10: Performance & Polish** - Zero-dependency audit, font loading, LCP optimization, deployment readiness

## Phase Details

### Phase 1: Design Foundation
**Goal**: The blank canvas already feels premium -- correct background, font rendering, spacing, and color tokens are in place so every subsequent phase inherits a cohesive visual system.
**Depends on**: Nothing (first phase)
**Requirements**: DES-01, DES-02, DES-03, DES-04, DES-08, DES-09, DES-10, LAY-02, LAY-03, LAY-06
**Success Criteria** (what must be TRUE):
  1. Opening the page in a browser shows the correct off-black background, off-white text in Inter, and no trace of the old Syne/Manrope/glassmorphism styling
  2. CSS custom properties define all colors, spacing, and type sizes -- no magic numbers in component or section CSS
  3. A test heading in Instrument Serif and a test paragraph in Inter render at correct fluid sizes from 375px to 1440px viewport width
  4. Container is centered at max 1120px with responsive padding that adjusts across desktop, tablet (1024px), and mobile (640px) breakpoints
  5. No pure black (#000) or pure white (#FFF) appears anywhere -- all values are off-black/off-white per the palette
**Plans**: 4 plans

Plans:
- [ ] 01-01-PLAN.md -- Tokens, reset, and index.html head (Wave 1: tokens.css + reset.css + font/CSS link updates + delete visuals.css)
- [ ] 01-02-PLAN.md -- Typography system (Wave 2: typography.css with heading/body/mono classes and fluid type scale)
- [ ] 01-03-PLAN.md -- Layout system (Wave 2: layout.css with container, spacing, breakpoints, utilities)
- [ ] 01-04-PLAN.md -- Visual verification (Wave 3: test section, automated checks, human visual confirmation)

### Phase 2: Component Library
**Goal**: Reusable UI components (cards, buttons, badges, form inputs) exist with proper dark-theme styling, varied border radii, and meaningful hover states -- ready to drop into any section.
**Depends on**: Phase 1
**Requirements**: DES-05, DES-07, INT-04
**Success Criteria** (what must be TRUE):
  1. Cards use solid dark backgrounds with 1px low-opacity borders -- no glassmorphism, no backdrop-filter
  2. Border radius varies by component type: buttons 12px, cards 16px, some elements sharp 0px
  3. Every interactive element (buttons, cards, links) has a visible hover state: buttons scale + shadow, cards lift or border shift, links show animated underline
  4. Components look correct on both desktop and mobile viewports
**Plans**: TBD

Plans:
- [ ] 02-01: Card, button, and badge components
- [ ] 02-02: Form input components and link hover states

### Phase 3: Page Structure & Navigation
**Goal**: The full page skeleton is navigable -- a visitor can scroll through all section landmarks with proper headings, use the sticky navbar to jump between sections, and use the mobile hamburger menu on small screens.
**Depends on**: Phase 2
**Requirements**: LAY-01, LAY-07, NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, NAV-06, A11Y-01, A11Y-02, A11Y-03
**Success Criteria** (what must be TRUE):
  1. Page contains 10 distinct sections in correct AIDA funnel order: Nav, Hero, Problem, Services, Who We Help, Process, Social Proof, FAQ, Final CTA, Footer
  2. Fixed navbar shows "VANGUARD" wordmark (JetBrains Mono with accent dot) on left, section links + "Book a Call" accent button on right
  3. Scrolling down darkens the navbar background and adds a bottom border
  4. On mobile (under 640px), navigation collapses to hamburger menu with full-screen overlay that locks body scroll, closes on escape key, and auto-closes on resize above breakpoint
  5. Skip link exists and jumps to main content on keyboard focus; all headings follow h1 > h2 hierarchy with single h1 in hero
**Plans**: TBD

Plans:
- [ ] 03-01: Semantic HTML skeleton (all 10 sections with heading hierarchy and landmarks)
- [ ] 03-02: Sticky navbar with scroll behavior and desktop links
- [ ] 03-03: Mobile hamburger menu with overlay, scroll lock, and auto-close

### Phase 4: Hero Section
**Goal**: A visitor landing on the page understands what Vanguard Digital does, who it serves, and why they should care -- all within 3 seconds -- and has a clear path to book a call.
**Depends on**: Phase 3
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06, HERO-07, HERO-08, DES-06
**Success Criteria** (what must be TRUE):
  1. Hero occupies full viewport height with centered content answering what/who/why in under 3 seconds of reading
  2. Pill badge with green pulse dot shows availability text (e.g., "Now taking Q1 2026 clients")
  3. Two CTAs are visible: primary "Book a Free Strategy Call" (solid accent fill) and secondary "See What We Build" (outline style)
  4. Trust strip shows 3-4 signals (Melbourne Based, ABN Registered, AI-First Agency) with distinctive asymmetric placement
  5. Background uses subtle dot-grid or grain texture (SVG filter, 2-5% opacity) -- no gradient blobs, no floating shapes -- and hero has at least one distinctive element that breaks the centered-hero AI pattern
**Plans**: TBD

Plans:
- [ ] 04-01: Hero HTML structure and content (headline, subtitle, CTAs, trust strip)
- [ ] 04-02: Hero visual styling (full-viewport layout, grain texture, asymmetric elements, anti-AI details)

### Phase 5: Content Sections
**Goal**: A visitor scrolling past the hero encounters a compelling narrative: their pain points articulated, services that solve them, client archetypes they identify with, a clear process, social proof, and a strong final call to action -- all with layout variety that avoids template uniformity.
**Depends on**: Phase 4
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-07, CONT-08, CONT-09, LAY-04, LAY-05, ICON-01, ICON-02, ICON-03
**Success Criteria** (what must be TRUE):
  1. Problem section uses pure editorial typography (large serif statement, bold kicker) with NO cards, NO icons, NO grids -- visually distinct from every other section
  2. Services section shows 4 cards in 2x2 grid (AI-Powered Websites, AI Receptionist, Google Review Agent, Lead Generation Engine) each with custom inline SVG icon and concrete outcome statement
  3. Process section shows 4 ordered steps (Discovery Call, Strategy & Quote, Build & Launch, Optimise) with visual connectors and custom SVG icons
  4. At least 2 sections break the grid pattern entirely, and section alignments vary (centered, left-aligned, offset) across the page
  5. All copy uses natural Australian English with contractions, no AI vocabulary (delve, harness, leverage, cutting-edge), and no pricing -- all messaging points to "book a call"
**Plans**: TBD

Plans:
- [ ] 05-01: Problem/pain section (editorial typography layout)
- [ ] 05-02: Services section with custom SVG icons and 2x2 grid
- [ ] 05-03: Who We Help section (3 client archetype cards)
- [ ] 05-04: Process section with step connectors and SVG icons
- [ ] 05-05: Social proof section (stats strip, placeholder-ready for testimonials)
- [ ] 05-06: Final CTA section (distinctive visual treatment, large serif headline, dual buttons)

### Phase 6: FAQ & Contact Form
**Goal**: A visitor can get answers to common objections via the FAQ and submit their details through a working contact form that reliably captures leads via webhook -- no more lost submissions.
**Depends on**: Phase 5
**Requirements**: CONT-06, FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06, INT-03
**Success Criteria** (what must be TRUE):
  1. FAQ section displays 6 questions (cost, timeline, technical ability, remote work, scope, differentiation) with accordion behavior -- clicking one closes any other open item
  2. Contact form shows fields for name, email, phone, service (dropdown), and message with clear labels
  3. Submitting with invalid data shows per-field error messages: email format check, Australian phone regex, required field indicators
  4. Successful submission POSTs to a webhook endpoint (not mailto:), shows a visible success state, and allows re-submission without page reload
  5. A hidden honeypot field exists for spam protection, and network failures show a user-friendly error message with retry guidance
**Plans**: TBD

Plans:
- [ ] 06-01: FAQ section with accordion single-open behavior
- [ ] 06-02: Contact form HTML, styling, and client-side validation
- [ ] 06-03: Form webhook submission, success/error states, honeypot spam protection

### Phase 7: Footer
**Goal**: The page ends with a structured, professional footer that reinforces Vanguard Digital's legitimacy and gives visitors multiple ways to navigate or make contact.
**Depends on**: Phase 6
**Requirements**: FOOT-01, FOOT-02, FOOT-03
**Success Criteria** (what must be TRUE):
  1. Footer displays 4 columns: Logo + tagline, Services links, Company links, Contact info + booking link
  2. Bottom bar shows copyright and ABN number
  3. Footer communicates Australia-wide service with Melbourne base, and collapses gracefully to stacked layout on mobile
**Plans**: TBD

Plans:
- [ ] 07-01: 4-column footer layout with all content and responsive collapse

### Phase 8: Interactions & Animations
**Goal**: The page feels alive and responsive -- elements reveal on scroll with purposeful animation, and all motion respects user preferences.
**Depends on**: Phase 7
**Requirements**: INT-01, INT-02, INT-05, INT-06
**Success Criteria** (what must be TRUE):
  1. Sections and elements fade in with translateY(20px) + opacity transition as they scroll into view, using IntersectionObserver
  2. Grouped elements (e.g., service cards, process steps) reveal with staggered delays (100-400ms increments) rather than all at once
  3. Smooth scroll behavior works for all anchor navigation (navbar links, CTAs pointing to sections)
  4. Setting `prefers-reduced-motion: reduce` in OS settings disables all animations and transitions completely
**Plans**: TBD

Plans:
- [ ] 08-01: Scroll-triggered reveal animations with IntersectionObserver
- [ ] 08-02: Staggered group reveals and smooth scroll behavior
- [ ] 08-03: Reduced motion support and animation quality audit

### Phase 9: Accessibility & SEO
**Goal**: The site is fully navigable by screen readers with proper landmarks, meets WCAG AA contrast, and provides rich structured data for search engines.
**Depends on**: Phase 8
**Requirements**: A11Y-04, A11Y-05, A11Y-06, A11Y-07, A11Y-08, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08
**Success Criteria** (what must be TRUE):
  1. Every `<section>` has `aria-labelledby` pointing to its heading; mobile nav toggle and FAQ items have `aria-expanded` updated dynamically
  2. All interactive elements show a visible `focus-visible` outline in accent color when navigated by keyboard
  3. Form success and error messages use `role="status"` and `aria-live="polite"` so screen readers announce them
  4. Full Open Graph tags, Twitter Card tags, canonical URL (`https://vanguarddigital.com.au/`), `lang="en-AU"`, and meta description are present in the document head
  5. LocalBusiness JSON-LD (name, Melbourne address, ABN, services) and FAQPage JSON-LD (all 6 FAQ items) are embedded as structured data
**Plans**: TBD

Plans:
- [ ] 09-01: ARIA attributes, landmarks, and focus-visible styles
- [ ] 09-02: Meta tags, Open Graph, Twitter Cards, and canonical URL
- [ ] 09-03: JSON-LD structured data (LocalBusiness + FAQPage) and contrast audit

### Phase 10: Performance & Polish
**Goal**: The site loads fast, has zero external JS dependencies, deploys anywhere with no build step, and passes a final "does this look AI-generated?" quality check.
**Depends on**: Phase 9
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06
**Success Criteria** (what must be TRUE):
  1. Zero external JavaScript dependencies -- all JS is vanilla, loaded with `defer` or `type="module"`
  2. Google Fonts loaded with `preconnect` hints and `display=swap`; no other external resources besides fonts
  3. No `<img>` tags in the page -- all visuals are CSS-only or inline SVG
  4. Lighthouse Performance score is 90+ and LCP is under 1.5 seconds on simulated 4G
  5. The complete site can be deployed by copying files to any static host with zero build step, zero configuration
**Plans**: TBD

Plans:
- [ ] 10-01: Font loading optimization and resource audit
- [ ] 10-02: Lighthouse performance audit and LCP optimization
- [ ] 10-03: Final quality review (AI-generated test, cross-browser, deployment verification)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 > 2 > 3 > 4 > 5 > 6 > 7 > 8 > 9 > 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design Foundation | 4/4 | Complete | 2026-02-16 |
| 2. Component Library | 2/2 | Complete | 2026-02-16 |
| 3. Page Structure & Navigation | 3/3 | Complete | 2026-02-16 |
| 4. Hero Section | 2/2 | Complete | 2026-02-16 |
| 5. Content Sections | 6/6 | Complete | 2026-02-16 |
| 6. FAQ & Contact Form | 3/3 | Complete | 2026-02-16 |
| 7. Footer | 1/1 | Complete | 2026-02-16 |
| 8. Interactions & Animations | 3/3 | Complete | 2026-02-16 |
| 9. Accessibility & SEO | 3/3 | Complete | 2026-02-16 |
| 10. Performance & Polish | 3/3 | Complete | 2026-02-16 |
