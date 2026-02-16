# Vanguard Digital

## What This Is

A complete redesign of the Vanguard Digital agency website — a single-page site that sells AI services and web development to Australian businesses. The site must feel premium, hand-crafted, and sharp. It should convert visitors into leads through a contact form (they submit details, the team calls back). The #1 priority is that it looks and feels like a real premium agency site, not something an AI spat out.

## Core Value

Convert business owners into booked calls by making Vanguard Digital look like the premium, trustworthy AI agency they'd want to work with.

## Requirements

### Validated

- ✓ Single-page static site (vanilla HTML/CSS/JS, no frameworks) — existing
- ✓ Fixed navbar with smooth-scroll anchor links — existing
- ✓ Mobile-responsive with hamburger nav — existing
- ✓ Scroll-triggered reveal animations — existing
- ✓ FAQ accordion section — existing
- ✓ Contact form with client-side validation — existing
- ✓ SEO meta tags (OG, Twitter Card, canonical) — existing
- ✓ Accessibility basics (skip link, aria labels, semantic HTML, focus-visible, reduced-motion) — existing
- ✓ Deployable to any static host with zero build step — existing

### Active

- [ ] Complete visual redesign — premium dark aesthetic, sharp and modern, NO glassmorphism
- [ ] New typography system (not Syne/Manrope/IBM Plex Mono — something with more editorial authority)
- [ ] Updated service offerings: AI Receptionist, Google Review Agent, Lead Gen/CRM, AI Consulting, Website Development
- [ ] Contact form submits to a real endpoint (not mailto:) — webhook or API ready
- [ ] Problem/pain-point section that speaks to business owners' frustrations
- [ ] Process section showing how working with Vanguard Digital works (steps)
- [ ] Social proof section (placeholder-ready for future testimonials and case studies)
- [ ] "Who we help" section with client archetypes (trades, SMBs, startups)
- [ ] Strong final CTA section before footer
- [ ] 4-column footer with nav, services, contact info
- [ ] Australia-wide positioning (Melbourne base, serve nationally)
- [ ] Design must NOT look AI-generated — unique layout choices, intentional asymmetry, craft details
- [ ] Custom SVG icons (not generic icon library dumps)
- [ ] Proper email validation on contact form (current site has none with novalidate)
- [ ] Form success state that allows re-submission
- [ ] No pricing displayed — custom quotes only, "book a call" messaging

### Out of Scope

- Multi-page architecture — single page converts better for this stage
- Blog / resources section — not enough content yet, add later
- Client portal / login — not needed
- Payment processing — custom quotes, no online checkout
- CMS or admin panel — content managed in code for now
- Backend server — static site, form posts to external webhook
- Package/tier pricing display — custom quotes only

## Context

**Existing codebase:** Vanilla HTML/CSS/JS site (2,572 lines across 8 files). Dark glassmorphism aesthetic with Syne/Manrope/IBM Plex Mono fonts, cyan/gold accent colors, bento grid layout, case study cards, and a mailto: contact form. The site works but the design feels template-y and the form submission is unreliable (mailto: depends on email client).

**Codebase map:** Full analysis in `.planning/codebase/` (7 documents, 1,332 lines) covering stack, architecture, structure, conventions, testing, concerns, and integrations.

**Key concerns from analysis:**
- visuals.css is orphaned (228 lines, never linked)
- Form has no real email validation (novalidate + no JS email check)
- Form success overlay never hides (can't re-submit)
- mailto: approach loses leads on devices without email clients
- OG image references non-existent file
- No analytics, no structured data, no privacy policy
- Design spec diverged significantly from implementation

**Brand:** Vanguard Digital (shortened from Vanguard Digital Solutions). AI agency + web development. Melbourne-based, serves Australia-wide. ABN registered.

**Target audience:** Mix of local trades/service businesses and growing SMBs (10-50 people) who need AI automation or a professional website.

**Design direction:** Premium and sharp. Think Linear.app precision meets Stripe confidence. Dark background, clean typography, intentional whitespace, subtle animations. No glassmorphism, no gradient blobs, no generic AI agency template energy. Must look hand-crafted by a designer, not generated.

## Constraints

- **Stack**: Vanilla HTML/CSS/JS only — no frameworks, no build tools, no npm. Must stay zero-dependency.
- **Deployment**: Static hosting (any CDN/host). No server-side requirements.
- **Form**: Must be webhook-ready (n8n, Formspree, or similar). No mailto:.
- **Quality**: Must pass manual "does this look AI-generated?" test. Unique layout, intentional design choices, craft in the details.
- **Compatibility**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Mobile-first responsive.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Stay vanilla HTML/CSS/JS | Zero dependencies, instant deploy, matches team skill. No need for React/Next for a single page. | — Pending |
| Single-page architecture | Higher conversion rate for lead gen. All content visible in one scroll. Simpler to build and maintain. | — Pending |
| Dark design direction | Premium feel, differentiates from generic light agency sites. Current site is already dark — evolution not revolution of brand recognition. | — Pending |
| No pricing on site | Custom quotes let Vanguard qualify leads and price based on scope. Avoids scaring off smaller clients or undercharging larger ones. | — Pending |
| Form webhook instead of mailto | mailto: is unreliable (requires email client). Webhook captures 100% of submissions and can feed into CRM/n8n. | — Pending |

---
*Last updated: 2026-02-16 after initialization*
