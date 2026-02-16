# Project Research Summary

**Project:** Vanguard Digital — Agency Website Redesign
**Domain:** Premium AI agency single-page website (dark theme, lead generation)
**Researched:** 2026-02-16
**Confidence:** HIGH

## Executive Summary

The Vanguard Digital redesign is a conversion-focused single-page marketing site built with vanilla HTML/CSS/JS. Research across all four domains (stack, features, architecture, and pitfalls) converges on a clear strategy: **maximum restraint, zero dependencies, and deliberate anti-AI design patterns**. This is not a typical agency site rebuild — it is a statement piece that must prove the agency's craft by avoiding every visual and technical cliche that screams "AI-generated template."

The recommended approach uses no frameworks, no build tools, and no CSS preprocessors. Modern CSS (OKLCH colors, container queries, native nesting, scroll-driven animations where appropriate) provides all necessary capabilities. The typography system (Instrument Serif headings + Inter body + JetBrains Mono labels) replaces the current Syne/Manrope/IBM Plex stack. The most critical architectural decision is eliminating glassmorphism entirely — the current site's `.glass` aesthetic is deeply embedded but must be removed completely. Solid dark surfaces with subtle borders replace all translucent effects.

The primary risk is shipping a site that looks AI-generated. Research identified 25+ specific "AI tells" (indigo accent colors, three-column icon grids, uniform spacing, gradient text on every heading, purple-to-blue gradients, glassmorphism). The brief explicitly states the site must NOT look AI-generated, yet multiple recommended defaults (Inter body font, indigo accent `#4F46E5`, centered hero with two buttons) are the exact patterns AI tools output. Mitigation requires a "NOT list" of banned patterns established before any CSS is written, and at least three deliberate asymmetries or imperfections introduced to signal human authorship. The contact form must be wired to a functional webhook (n8n preferred) from day one — the current `mailto:` approach leaks mobile leads silently.

## Key Findings

### Recommended Stack

**Zero-dependency vanilla approach is the correct call.** A single-page marketing site with a contact form does not justify React, Next.js, or any framework. The existing site already validates this — the redesign continues the no-build approach but upgrades CSS to 2026 capabilities.

**Core technologies:**
- **HTML5 (Living Standard)**: Semantic elements (`<details>`, `<dialog>`, native form validation) — no build step required
- **Modern CSS3**: Native nesting, OKLCH colors, container queries, scroll-driven animations replace what previously required Sass/PostCSS/GSAP — eliminates preprocessor build step
- **Vanilla JavaScript (ES2022+)**: IntersectionObserver for scroll reveals, form validation/submission, native ES modules with `type="module"` — no bundler needed
- **n8n webhook**: Direct POST to n8n for form submission — full control, zero cost, no third-party service

**Anti-stack (explicitly avoid):**
- Tailwind CSS (utility-class soup produces instant "template" recognition)
- GSAP/Motion libraries (CSS handles all animation needs natively)
- Any framework (React/Vue/Astro) for a single page
- Sass/PostCSS (CSS native nesting shipped in all browsers)
- Icon libraries (custom inline SVG only)

**Typography shift:** Replace Syne + Manrope + IBM Plex Mono with Instrument Serif (headings) + Inter (body) + JetBrains Mono (labels). Instrument Serif is newer and less overused than Playfair Display (AI default). Inter is industry-standard but acceptable IF the heading font provides enough editorial personality to compensate.

**Critical version requirements:** None — all recommended features have 92%+ browser support.

### Expected Features

**Table stakes (must have or site feels unfinished):**
- Instant-clarity hero section (answers "what/who/why" in <3 seconds)
- Mobile-first responsive design (62% of traffic is mobile)
- Fast load time (<3s, aim for <1.5s LCP)
- Clear service descriptions (concrete outcomes, not "we build solutions")
- Working contact form (webhook submission, visible success state, validation)
- Social proof section (structure exists even if content is placeholder-ready)
- Professional typography system (2-3 fonts max, clear hierarchy)
- Semantic HTML + accessibility basics (WCAG AA contrast, keyboard nav, reduced-motion)
- SEO fundamentals (meta tags, OG tags, LocalBusiness schema, canonical URL)
- Fixed/sticky navigation (persistent access to CTAs and anchor links)
- Proper dark theme execution (off-black backgrounds, off-white text, desaturated accents)
- Clear CTA hierarchy (one primary CTA visible in hero, nav, and final section)

**Differentiators (separate hand-crafted from template):**
- Scroll-driven micro-animations with purpose (guide attention, not decoration)
- Intentional asymmetry and layout variation (strongest anti-AI signal)
- Typographic personality (editorial serif for headlines, variable weights for hierarchy)
- Problem-first narrative structure (agitate pain before presenting solution)
- Custom SVG iconography (even simple custom icons beat generic libraries)
- Process/methodology section (shows HOW you work, reduces perceived risk)
- Cinematic hero treatment (composed visual moment, not stock photo + text)
- Texture and grain overlays (subtle noise on dark backgrounds adds warmth)
- Meaningful hover states (scale shifts, underline animations, reveal effects)
- "Who we help" client archetype section (visitors self-identify)
- Strong final CTA section before footer (catches high-intent scrollers)
- 4-column structured footer (navigation, services, contact, legal/ABN)

**Anti-features (deliberately avoid):**
- Glassmorphism cards and frosted glass effects (peak 2022-2023, now AI-template cliche)
- Gradient blob backgrounds (purple/blue floating spheres = AI starter pack)
- Generic icon library dumps (FontAwesome/Heroicons out-of-box = instant template recognition)
- AI vocabulary copy ("delve," "harness," "leverage," "cutting-edge solutions")
- Perfect symmetry everywhere (centered layout every section = AI default)
- Stock photography of diverse office workers (or AI-generated team photos)
- Uniform 8px border-radius on everything (AI HTML defaults)
- Cookie-cutter section rhythm (same height, padding, structure every section)
- Emoji in professional copy (rocket/lightning/brain emoji as section markers)
- "Welcome to [Company Name]" hero headline (most generic possible opening)
- Auto-playing hero video with sound (intrusive, accessibility-hostile)
- Pricing tiers displayed as cards (for custom-quote agency, frames work as commodity)

### Architecture Approach

**Section ordering follows modified AIDA funnel (Attention-Interest-Desire-Action).** Each section has a specific psychological job. The sequence is non-negotiable for conversion.

**Recommended flow (9 sections):**
1. Hero (Attention) — state what you do and for whom in one sentence
2. Problem/Pain (Interest) — agitate visitor's frustration, no solution yet
3. Services (Interest) — present solution categories
4. Process (Desire) — show what happens after they reach out
5. Who We Help (Desire) — visitor self-identifies with archetype
6. Social Proof (Desire) — testimonials, metrics, trust signals
7. FAQ (Desire) — handle remaining objections
8. Final CTA (Action) — focused conversion moment
9. Footer (persistent) — legal, navigation, secondary contact

**Major components:**

1. **CSS Architecture (7-file split by concern, not by section):**
   - `tokens.css` — design tokens only (three-tier system: primitives, semantic, component)
   - `reset.css` — box model reset, base element styles
   - `typography.css` — font-face, type scale, heading/body/mono classes
   - `layout.css` — container, grid systems, section spacing, responsive
   - `components.css` — cards, buttons, badges, accordions, form inputs
   - `sections.css` — section-specific overrides (thin layer)
   - `utilities.css` — reveal animations, screen-reader-only, visually-hidden

2. **JavaScript (native ES modules, no build):**
   - `js/main.js` — entry point, imports all modules
   - `js/modules/navbar.js` — scroll class toggle, mobile hamburger
   - `js/modules/reveal.js` — IntersectionObserver scroll animations
   - `js/modules/faq.js` — accordion single-open behavior
   - `js/modules/form.js` — contact form validation and webhook submission

3. **HTML (semantic structure with strict heading hierarchy):**
   - Single `<h1>` per page (hero heading only)
   - All section headings are `<h2>`
   - `aria-labelledby` on every `<section>` for screen reader landmarks
   - `<article>` for independent content blocks (services, archetypes)
   - `<ol>` for process steps (sequential, not grid of divs)
   - Native `<details>/<summary>` for FAQ (zero JS for basic open/close)
   - JSON-LD structured data for LocalBusiness and FAQPage schema

**Key patterns:**
- **Three-tier design tokens**: Primitives (raw values) → Semantic (purpose-named) → Component (optional) — allows full color palette change by editing only primitives
- **Desktop-first responsive**: Three breakpoints (default, 1024px tablet, 640px mobile) — the existing site's six breakpoints (1180, 1120, 1100, 1020, 980, 760) consolidated
- **No glassmorphism**: Solid backgrounds (`var(--color-surface)`) with 1px borders, no `backdrop-filter`, no translucent cards
- **CTA placement**: 5 touchpoints (navbar, hero, after services, after process, final CTA section) without being aggressive
- **Form submission**: Direct POST to n8n webhook with proper error handling (network failure, validation failure, success with reset)

### Critical Pitfalls

1. **The site looks AI-generated (THE #1 RISK)**
   - **Why critical:** An AI agency with an AI-looking site = complete credibility collapse
   - **Detection:** Indigo accent (`#4F46E5`), three-column icon grids, glassmorphism, purple-to-blue gradients, perfect symmetry, centered hero with two buttons, Inter body font, gradient text on every heading, uniform spacing/border-radius
   - **Prevention:** Create "NOT list" of 10 banned patterns before CSS is written. Run "logo swap test" — if another company's logo works on this site without changes, it's too generic. Introduce 3+ deliberate asymmetries. Make problem-statement section pure editorial typography with no cards/grids/icons.

2. **Glassmorphism hangover from current site**
   - **Why critical:** Current codebase uses `.glass` on 15+ elements with `backdrop-filter: blur()` throughout — this is deeply embedded
   - **Detection:** `backdrop-filter` appears >1x in CSS, cards have `rgba(255,255,255,0.03)` backgrounds, colored glow on hover
   - **Prevention:** Delete `.glass` class entirely. Cards use `background: var(--surface)` (solid) with 1px border. Reserve `backdrop-filter` exclusively for fixed navbar on scroll (functional, not decorative).

3. **Form submission remains broken after redesign**
   - **Why critical:** Visual redesign focuses on CSS, form gets deprioritized, current `mailto:` approach leaks mobile leads silently
   - **Detection:** Form `action` points to `mailto:` or is empty, no success/error handling, no way to verify submissions received
   - **Prevention:** Wire n8n webhook on day 1. Test full flow on iOS Safari + Android Chrome before any visual work considered complete. Add honeypot field for spam protection.

4. **Dark-on-dark contrast failure**
   - **Why moderate:** Subtle greys that look distinct on calibrated monitor blend together on phone in daylight
   - **Prevention:** Contrast-check every text/background combo (WCAG AA: 4.5:1 body, 3:1 large). Never pure black `#000` background. Never pure white `#FFF` body text (use `#E8E8ED`). The spec's `--grey-600: #5A5A6A` is 3.5:1 against `#0A0A0F` — fails AA for body text, use only for decorative labels.

5. **Cookie-cutter section rhythm**
   - **Why moderate:** Every section with same structure (eyebrow, H2, subtitle, grid, CTA) creates scroll fatigue
   - **Prevention:** At least 2 sections break the grid entirely (problem-statement as editorial text block, final CTA as focused minimal). Vary section alignment (centered grid → left-aligned asymmetric → horizontal timeline). Change eyebrow/heading/subtitle pattern for at least one section.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation (Tokens + Reset + Typography + Layout)
**Rationale:** Every subsequent phase depends on the token system and base styles. Getting container, spacing scale, and type scale right means sections "just work" without ad-hoc overrides.
**Delivers:** An empty page with correct background, font rendering, container, and spacing — the "blank canvas" that already feels premium.
**Addresses:** T7 (typography system), T11 (dark theme execution), elimination of glassmorphism (Pitfall 2)
**Avoids:** Dark-on-dark contrast failure (Pitfall 4) by establishing WCAG-compliant color tokens
**Research needs:** None — patterns well-documented

### Phase 2: Components (Cards, Buttons, Form Inputs)
**Rationale:** Components reused across multiple sections. Building them before any section ensures consistency.
**Delivers:** Component library demonstrable in isolation — cards, buttons, badges, form fields with proper dark-theme styling and hover states.
**Addresses:** D9 (meaningful hover states), elimination of glassmorphism
**Uses:** Token system from Phase 1
**Avoids:** Uniform border-radius (Pitfall 1) by varying radii by component type
**Research needs:** None — standard patterns

### Phase 3: HTML Structure (Full Semantic Markup)
**Rationale:** With tokens, layout, and components in place, full HTML can be written in one pass. Using component classes means sections already have basic visual structure.
**Delivers:** Fully semantic, accessible HTML page readable and navigable even without section-specific CSS.
**Addresses:** T8 (semantic HTML + a11y), T9 (SEO fundamentals), T10 (sticky nav), section ordering from architecture research
**Implements:** 9-section AIDA funnel structure with proper landmarks
**Avoids:** SEO regression (Pitfall 7) by maintaining anchor IDs, adding schema markup
**Research needs:** None — semantic patterns established

### Phase 4: Section-Specific Styling
**Rationale:** Most visual work done by components and layout. This phase handles only section-unique concerns.
**Delivers:** Complete visual design, static. Hero full-viewport height, problem section editorial typography, process step connectors, footer 4-column grid.
**Addresses:** D2 (intentional asymmetry), D4 (problem-first narrative), D7 (cinematic hero), D8 (texture/grain), D10 (client archetypes), D11 (strong final CTA), D12 (structured footer)
**Avoids:** Cookie-cutter section rhythm (Pitfall 5) by varying layouts section-to-section, breaking grids in 2+ sections
**Research needs:** LOW — may need visual inspiration for asymmetric layouts

### Phase 5: Interaction Layer (JS Modules)
**Rationale:** JavaScript is enhancement, not structure. Page should be fully functional and visually complete before JS added.
**Delivers:** Interactive behaviors — scroll reveals, form validation, mobile nav, FAQ single-open.
**Addresses:** D1 (scroll-driven animations), T5 (working contact form)
**Uses:** IntersectionObserver + native ES modules pattern from architecture research
**Avoids:** Template-looking reveal animations (Pitfall 6) by mixing animation types, reducing translate distance
**Avoids:** Broken form submission (Pitfall 3) by wiring n8n webhook with full error handling
**Research needs:** MEDIUM — n8n webhook setup + CORS configuration needs validation

### Phase 6: Polish + Utilities
**Rationale:** Polish depends on everything else being stable. Reveal animations require final DOM structure. Structured data requires final content.
**Delivers:** Production-ready site with reveal animation CSS, structured data JSON-LD, OG image, finalized meta tags.
**Addresses:** T3 (fast load time), T9 (SEO fundamentals), remaining a11y details
**Avoids:** Performance death by decoration (Pitfall 9) by auditing font weights, removing body-level overlays
**Research needs:** None — optimization patterns standard

### Phase Ordering Rationale

- **Foundation before components**: Token system must exist before components reference `var(--color-accent)` etc.
- **Components before HTML**: HTML can use component classes immediately, avoiding placeholder styling
- **HTML before section styling**: Section-specific CSS needs markup to style against
- **Section styling before JS**: JS toggles classes that must exist in CSS first (`.scrolled`, `.reveal-active`)
- **JS before polish**: Reveal animations require JS observer + CSS classes coordinated
- **Sequential, not parallel**: Each phase strictly depends on output of previous

**Key architectural insight:** The three-tier token system (primitives → semantic → component) allows the entire color palette to change by editing only primitive values. Shifting from indigo to amber accent requires changing one line.

**Key risk insight:** Multiple recommended defaults are AI tells (Inter, indigo `#4F46E5`, centered hero). These must be counterbalanced with strong differentiators (Instrument Serif, asymmetric layouts, editorial problem section) or replaced entirely.

### Research Flags

**Needs research during planning:**
- **Phase 5:** n8n webhook URL, CORS configuration, honeypot field implementation patterns
- **Phase 4:** Visual inspiration for asymmetric layouts that avoid AI tells (LOW priority — can pull from Awwwards/Linear/Stripe during planning)

**Standard patterns (skip research-phase):**
- **Phase 1:** CSS architecture and token systems well-documented (MDN, design systems guides)
- **Phase 2:** Component patterns standard across dark-mode sites
- **Phase 3:** Semantic HTML and schema markup fully documented (MDN, Schema.org)
- **Phase 6:** Performance optimization patterns well-established

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | Vanilla approach validated by existing site. Modern CSS capabilities verified across MDN, WebKit docs. No frameworks = no uncertainty. |
| Features | **MEDIUM-HIGH** | Table stakes synthesized from 20+ sources, cross-verified. Anti-features derived from AI-generation analysis (medium confidence on specific tells). Differentiators from design trend publications (medium confidence). |
| Architecture | **HIGH** | Section ordering based on AIDA conversion funnel (well-established). CSS architecture patterns verified across design system guides. ES modules approach documented in MDN. |
| Pitfalls | **HIGH** | AI tells cross-referenced across multiple sources. Glassmorphism identified in current codebase via direct inspection (high confidence). Dark-mode contrast issues verified against WCAG standards. |

**Overall confidence:** HIGH

The research is grounded in official documentation (MDN, WebKit, Schema.org) for technical capabilities, cross-referenced design publications for feature expectations, and direct codebase inspection for pitfalls. The primary uncertainty is whether the recommended defaults (Inter, indigo) can be sufficiently counterbalanced to avoid AI-template perception, or whether they should be replaced outright.

### Gaps to Address

**Gap: Indigo accent color risk**
- The spec recommends `#4F46E5` (indigo) which is THE AI default color per pitfall research
- **Resolution:** Flag this during requirements phase. Options: (1) shift to less AI-associated color (amber, teal, red), (2) keep indigo but use extremely sparingly + pair with unexpected warm secondary, (3) accept risk if other differentiators strong enough
- **Validate:** Run logo swap test and visual comparison against v0.dev output during Phase 4

**Gap: Inter as body font**
- Inter is #1 AI-default font but also industry-standard for readability
- **Resolution:** Accept Inter IF Instrument Serif provides enough editorial personality at large sizes with tight tracking. Alternative: consider replacing Inter with untrue-type-draw fonts (e.g., Satoshi, General Sans) that are premium but less AI-associated
- **Validate:** Typography test during Phase 1 with large heading samples

**Gap: Centered hero risk**
- Spec calls for centered hero which is AI default pattern
- **Resolution:** Add distinctive elements to break AI association — asymmetric trust bar, editorial line breaks in H1, data callout, scroll indicator with personality
- **Validate:** Visual comparison during Phase 4

**Gap: n8n webhook configuration**
- n8n mentioned in context but webhook URL, CORS config, error handling patterns need validation
- **Resolution:** Research during Phase 5 planning — confirm n8n instance publicly accessible, generate webhook URL, test CORS policy
- **Validate:** End-to-end form submission test on mobile before Phase 5 marked complete

## Sources

### Primary (HIGH confidence)
- MDN: CSS scroll-driven animations, oklch(), color-mix(), IntersectionObserver API, JavaScript modules, HTML accessibility
- WebKit: Scroll-driven animations guide
- Schema.org: LocalBusiness, FAQPage structured data
- Google Fonts: Instrument Serif, Inter, JetBrains Mono specimens
- n8n: Webhook node documentation
- Direct codebase inspection: `C:\N8N\Agency\Website\css\main.css`, `index.html`, `.planning\codebase\CONCERNS.md`

### Secondary (MEDIUM confidence)
- Design trend publications: Tilipman Digital, Veza Digital, Landdding, Really Good Designs, Line and Dot Studio (AI brand trends 2026)
- Agency examples: Cam Gomersall, Site Builder Report, Awwwards (design agencies)
- Dark mode guides: Tech-RZ, Design Studio UIUX, Digital Silk (best practices)
- Typography: IK Agency, Inkbot Design, Typewolf (font trends, authority fonts)
- AI detection: Originality.ai, NN/Group, Crea8ive Solution (AI-generated website signals)
- Architecture: SiteTuners, Magic UI, involve.me, Thrive Themes (AIDA model, landing page structure)
- Design systems: Penpot, Smashing Magazine, Nathan Curtis/EightShapes (design tokens, naming)
- Conversion: Orbit Media, Shadow Digital (footer design, animation best practices)

### Tertiary (LOW confidence)
- Medium posts: AI vocabulary detection, color trends (single-source, noted for awareness)
- Wix/Alignify: Web design trend lists (broad, not domain-specific)

---
*Research completed: 2026-02-16*
*Ready for roadmap: yes*
