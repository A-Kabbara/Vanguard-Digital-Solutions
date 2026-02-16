# Domain Pitfalls

**Domain:** AI agency website redesign (single-page, vanilla HTML/CSS/JS)
**Researched:** 2026-02-16
**Overall confidence:** HIGH (multiple sources cross-referenced, patterns verified against current codebase)

---

## Critical Pitfalls

Mistakes that destroy credibility or require fundamental rework.

---

### Pitfall 1: The Site Looks AI-Generated (THE #1 RISK)

**What goes wrong:** An AI agency ships a site that looks like AI made it. Visitors immediately distrust the agency's taste, judgment, and ability to deliver premium work. The irony is fatal: "If they can't make their own site look hand-crafted, why would I trust them with mine?"

**Why it happens:** AI code generators (ChatGPT, Claude, Cursor, v0) have a statistical fingerprint. They trained on millions of Tailwind tutorials, SaaS landing pages, and GitHub repos from 2019-2024. When asked to build a website without extremely specific constraints, they produce the median of everything they absorbed. The result is instantly recognizable to anyone who has seen more than a handful of AI-generated sites.

**Consequences:** Complete credibility collapse. An AI agency with an AI-looking site is like a dentist with bad teeth. No amount of good copy or conversion optimization recovers from this first impression.

**The specific AI tells to avoid (2026):**

#### Typography tells
| AI Pattern | Why It Screams AI | What To Do Instead |
|-----------|-------------------|-------------------|
| Inter as the body font | Inter is the #1 AI-default font. It appears in virtually every AI-generated site because it dominates training data. | Choose a body font with actual personality. The prompt spec suggests Inter -- consider whether this is a deliberate choice or an AI echo. If keeping Inter, the heading font MUST be distinctive enough to compensate. |
| System-safe font stacks with no personality | AI defaults to "safe" choices: Inter, Roboto, Arial, system-ui | Use fonts with character. The spec calls for Instrument Serif (headings) and JetBrains Mono (labels) -- these are good differentiators IF Instrument Serif is used with enough editorial confidence (large sizes, tight tracking, generous whitespace). |
| Uniform font weights throughout | AI applies 400/600/700 weight uniformly without typographic hierarchy | Create deliberate weight contrast. Use light weights (300) for large display text and heavy weights (700-800) for small labels. Invert expectations. |
| Generic line-heights applied everywhere | AI uses 1.5 or 1.6 line-height on all text regardless of size | Large headings need tight line-height (1.0-1.1). Body text needs generous line-height (1.6-1.7). Captions need moderate (1.4). Each text role gets its own rhythm. |

#### Color tells
| AI Pattern | Why It Screams AI | What To Do Instead |
|-----------|-------------------|-------------------|
| Purple/indigo as the primary accent (`#4F46E5`, `#6366F1`, `bg-indigo-500`) | This is THE AI color. It originates from Tailwind's demo components, which used indigo because it was "neutral enough for examples." LLMs learned "modern web = purple buttons." Every AI-generated landing page has this exact indigo. | The current spec uses `#4F46E5` (indigo) as the accent. This is a significant risk. Consider shifting to a less AI-associated accent: warm amber/gold, deep teal, sharp red, or even a muted sage. If indigo must stay, use it sparingly and pair it with an unexpected secondary color that breaks the Tailwind-demo association. |
| Purple-to-blue gradients | The most overused AI gradient. Appears on hero backgrounds, buttons, and text in virtually every AI-generated site. | Use monochromatic depth (dark-to-darker) or a single accent color at full saturation against a neutral background. If gradients are used, make them subtle and NOT purple-to-blue. |
| Evenly-distributed, "safe" color palettes | AI generates harmonious palettes with no dominant color. Everything is balanced, nothing is bold. | Pick ONE dominant brand color used sparingly. Let the dark background and white text do 95% of the work. The accent appears only at moments of decision (CTAs, key data points). |
| Accent glow effects (`box-shadow: 0 0 40px rgba(accent)`) | AI loves adding color glows on hover. The "neon underglow" effect is in every AI-generated dark-mode site. | Use subtle elevation changes (shadow-y offset, not color glow) or border-color transitions. If glow is used, keep it barely perceptible -- more "warmth" than "neon." |

#### Layout tells
| AI Pattern | Why It Screams AI | What To Do Instead |
|-----------|-------------------|-------------------|
| Three-column grid with icons | The single most common AI layout pattern. Three boxes, each with an icon at top, a heading, a paragraph. This is the skeleton of every SaaS landing page template from 2019-2024. | Use asymmetric grids (2+1, 1+2, full-width + sidebar). The spec already calls for a 2x2 service grid which is better, but ensure it does not feel like "4 identical cards in a grid." Vary card content length, add a featured/highlighted card, break the grid with a full-width element. |
| Centered hero with headline + subtitle + two buttons | This exact pattern: centered H1, subtitle paragraph, primary button + secondary outline button, all center-aligned. It is THE AI hero section. | Either go full-bleed asymmetric (text left, visual right -- the current site does this well), or if centered, add a distinctive element: an editorial pull quote, a data point, a trust indicator bar, or visual tension that breaks the centered-rectangle monotony. |
| Equal spacing between all sections | AI uses uniform `padding: 80px 0` or similar on every section, creating metronomic rhythm. | Vary section spacing intentionally. A problem-statement section that breathes with 140px padding followed by a tight 40px proof strip creates rhythm. Sections have different emotional weights and should have different spatial weights. |
| Uniform border-radius on everything | AI applies `border-radius: 12px` or `16px` to every card, button, and container. Everything has the same rounded corners. | Mix border radii deliberately. Buttons: small radius (8-10px). Cards: larger radius (16-20px). Some elements: sharp corners (0px). The contrast between sharp and soft communicates hierarchy. |

#### Content tells
| AI Pattern | Why It Screams AI | What To Do Instead |
|-----------|-------------------|-------------------|
| Vague, universal headlines | "We Build Solutions That Drive Growth" -- could apply to any business. AI generates headlines that are broad enough to be true for everyone and specific enough for no one. | Name the pain. Name the industry. Name the outcome. "Stop losing leads because nobody picked up the phone" beats "AI-Powered Growth Solutions." |
| Perfectly symmetrical copy lengths | Every card has exactly 2-3 sentences. Every bullet list has exactly 3-4 items. AI outputs are eerily uniform in length. | Let content breathe unevenly. One service card gets 4 lines because it needs explanation. Another gets 2 because it is self-evident. Real content has natural variation. |
| Emoji as design elements | AI frequently outputs emoji in headings, feature lists, and CTAs. Stars, rockets, checkmarks, lightning bolts. | Use custom inline SVG icons with consistent stroke weight. Never emoji. The spec explicitly bans this -- enforce it. |
| Generic stock photography or AI-generated images | Perfectly lit office scenes, diverse teams high-fiving, abstract 3D renders. | Use no photography rather than bad photography. CSS patterns, solid-color blocks, or typographic treatments are better than generic imagery. If images are used later, they must be real photos of real people/work. |

#### CSS tells
| AI Pattern | Why It Screams AI | What To Do Instead |
|-----------|-------------------|-------------------|
| `backdrop-filter: blur()` on everything (glassmorphism) | Glassmorphism was 2022-2023's trend. AI still generates it as a default because training data is heavy with it. Every card, nav, modal gets a frosted glass effect. | The current site uses `.glass` class extensively. The redesign should eliminate this. Use solid backgrounds with subtle border differentiation. If blur is used, restrict it to ONE element (e.g., navbar on scroll) as a functional choice, not a decorative system. |
| `translateY(-2px)` on every hover | The universal AI hover effect. Every button, card, and link lifts 2px on hover. | Vary hover behaviors. Buttons: background color shift + subtle shadow. Cards: border-color change. Links: underline animation. Different elements respond differently. |
| Noise/grain overlay on body | AI-generated dark sites frequently add an SVG noise texture to the body for "texture." It became a cliche. | The current site has this (line 76-84 of main.css). Remove it or make it genuinely invisible. If texture is desired, apply it to specific elements, not the entire viewport. |
| Gradient text on every heading | `background-clip: text` with a gradient applied to most headings. AI does this because it looks "premium" in isolation but becomes a cliche at scale. | Use gradient text on ONE key heading (the hero H1 at most). All other headings: solid white or solid grey. Restraint signals intent. |

**Detection (warning signs you are falling into this trap):**
- You open the site and your first thought is "this looks like a Vercel template"
- Swap out the logo and company name -- could this be literally any other company's site?
- Show the site to someone without context and ask "does this look AI-generated?" If they hesitate, it does.
- Compare against v0.dev output, Relume output, or a ChatGPT-generated page. If the visual language is similar, it is too generic.
- Count how many of the AI tells above are present. More than 3 = high risk. More than 5 = start over.

**Prevention strategy:**
1. Before writing any CSS, create a "NOT list" -- 10 specific visual choices the site will NOT make (e.g., "no indigo buttons", "no glassmorphism", "no three-column icon grids", "no gradient text on more than one heading")
2. For every design decision, ask: "Would ChatGPT generate this if I asked for a dark agency site?" If yes, find a different answer.
3. Introduce at least 3 "deliberate imperfections" -- asymmetric layouts, unexpected spacing, a type choice that feels slightly editorial rather than safe, a section with no cards at all (just text).
4. The problem-statement section (Section 4 in the spec) is the best opportunity for distinctiveness. It is pure editorial typography with no cards, no grids, no icons. Execute it with confidence: oversized serif type, generous margins, maybe even a left-aligned block in a page of centered content.
5. Run the "logo swap test" before shipping: if another company's logo works on this site without changing anything else, it is too generic.

---

### Pitfall 2: Glassmorphism Hangover from Current Site

**What goes wrong:** The redesign carries over glassmorphism patterns from the current site (`.glass` class, `backdrop-filter: blur()`, translucent card backgrounds, colored underglow on hover) because they are "already working." The result is a redesigned site that still looks like a 2022 Dribbble shot.

**Why it happens:** The current codebase uses `.glass` on 15+ elements. It defines `--glass-bg`, `--glass-border`, `--glass-shadow` as design tokens. The glass aesthetic is deeply embedded. Removing it feels like "losing" work.

**Consequences:** The site looks dated. Glassmorphism on dark backgrounds specifically causes legibility issues -- translucent layers pick up unwanted tints from dark content behind them, making text harder to read. Performance also suffers: `backdrop-filter: blur()` forces GPU compositing on every affected element.

**Detection:**
- `backdrop-filter` appears more than once in the CSS
- Cards have semi-transparent backgrounds (`rgba(255, 255, 255, 0.03-0.05)`)
- Colored glow effects appear on card hover (the `::after` pseudo-element glow pattern in current CSS)
- The word "glass" appears in class names

**Prevention:**
1. Delete the `.glass` class entirely in the redesign. Start with solid backgrounds.
2. Cards: use `background: var(--surface)` (solid dark) with a 1px solid border. No transparency.
3. Hover states: border-color change or subtle box-shadow with Y-offset (elevation), not color glow.
4. Reserve `backdrop-filter` exclusively for the fixed navbar when scrolled -- a functional use, not decorative.
5. If a translucent effect is genuinely needed for one special element, create a one-off class, not a system-wide token.

---

### Pitfall 3: Form Submission Remains Broken After Redesign

**What goes wrong:** The redesign focuses on visual changes and ships with the same `mailto:` form submission approach, or connects to a webhook that is not tested end-to-end. Leads are lost silently.

**Why it happens:** Form submission is "backend work" and gets deprioritized during a visual redesign. The current site's `mailto:` approach fails silently on devices without configured email clients, which is a significant portion of mobile users.

**Consequences:** The site looks beautiful but leaks every lead that does not have a desktop email client configured. For a conversion-focused agency site, this is the most expensive bug possible.

**Detection:**
- The form's `action` attribute points to `mailto:` or is empty
- Form submission code uses `window.location.href = 'mailto:...'`
- No success/error handling for network failures
- No way to verify submissions are actually received

**Prevention:**
1. Wire the form to a real webhook endpoint (n8n, Formspree, or similar) as the FIRST task, not the last.
2. Add proper error handling: network failure state, validation failure state, success state with "send another" option.
3. Test the full submission flow on mobile (iOS Safari, Android Chrome) before considering the redesign complete.
4. Add a honeypot field for basic spam protection.
5. The form success state must hide after a timeout or provide a "send another" button (the current site's success overlay never hides).

---

## Moderate Pitfalls

Mistakes that cause delays, technical debt, or conversion loss.

---

### Pitfall 4: Dark-on-Dark Contrast Failure

**What goes wrong:** Body text, secondary text, and subtle UI elements become unreadable on dark backgrounds. The design looks sophisticated in Figma but fails the squint test on real screens with varying brightness and ambient light.

**Why it happens:** Dark mode design is harder than light mode. Subtle greys that look distinct on a designer's calibrated monitor blend together on a phone screen in daylight. The current site uses HSL-based color tokens with opacity values (`--text-body: 214 16% 77%`, `--text-dim: 215 12% 60%`) that may not maintain sufficient contrast.

**Prevention:**
1. Test every text color against its background using a contrast checker. WCAG AA minimum: 4.5:1 for body text, 3:1 for large text.
2. Never use pure black (`#000`) as a background. Use a warm or cool dark grey (`#0A0A0F` from the spec is fine -- it has slight blue undertone).
3. Never use pure white (`#FFF`) for body text on very dark backgrounds. The halation effect (bright text appears to bleed) makes fine strokes blur. Use `#E8E8ED` or similar for body text, reserving pure white for headings.
4. Test on a phone outdoors. If secondary text disappears, it is too dim.
5. The spec defines `--grey-600: #5A5A6A` for "muted text." This is 3.5:1 against `#0A0A0F` -- it fails WCAG AA for body text. Use it only for decorative labels, never for meaningful content.

---

### Pitfall 5: Cookie-Cutter Section Rhythm

**What goes wrong:** Every section follows the same structure: eyebrow label, H2, subtitle, grid of cards, CTA button. The page feels like a slot machine of identical modules in alternating dark/light backgrounds.

**Why it happens:** Section templates are efficient. Reuse the same `.section-head` pattern, drop in a grid, done. AI code generators especially produce this pattern because it is the statistical average of every landing page they trained on.

**Consequences:** The page loses narrative momentum. Users experience "scroll fatigue" -- every section looks the same, so nothing feels important. The conversion funnel stalls because there is no emotional arc.

**Prevention:**
1. Map the page as an emotional journey: curiosity (hero) --> frustration (problem) --> relief (services) --> trust (proof) --> clarity (process) --> confidence (FAQ) --> urgency (CTA). Each emotion suggests a different visual treatment.
2. At least 2 sections should break the grid-of-cards pattern entirely. The problem-statement section (editorial text block, no cards) and the final CTA (focused, minimal, no grid) are natural candidates.
3. Vary section backgrounds beyond "dark/light alternation." Use a subtle gradient shift, a faint radial glow, or a different background darkness -- not a binary toggle.
4. Alternate section alignment. If services are a centered grid, the "who we help" section should be left-aligned with asymmetric cards. If the process is a horizontal timeline, the FAQ should be a single-column accordion.
5. Change the eyebrow/heading/subtitle pattern for at least one section. The problem section should have NO eyebrow and NO subtitle -- just a bold statement.

---

### Pitfall 6: Reveal Animations Feel Like a Template

**What goes wrong:** Every element fades up from 24px below with the same easing curve. Staggered delays (100ms, 200ms, 300ms) create a "waterfall" effect that looks identical to every Framer/Webflow template. The animation system becomes invisible because it is so familiar.

**Why it happens:** `translateY(24px) + opacity: 0` with IntersectionObserver is the default scroll animation pattern. It is the first thing every tutorial teaches. AI generates it automatically.

**Consequences:** The site feels like a template even if the design is custom. Animations are supposed to add polish, but generic animations subtract from perceived craft.

**Prevention:**
1. Reduce animation distance. `translateY(12px)` feels more refined than `24px` or `30px`. Premium sites use subtle movement.
2. Vary animation types across sections. Headlines: fade in place (no translate). Cards: scale from 0.97 to 1.0. Stats: counter animation. Images: clip-path reveal. Mixing types signals intentionality.
3. Use `cubic-bezier` curves that feel distinctive. The current site's `cubic-bezier(0.23, 1, 0.32, 1)` is fine. Avoid `ease-in-out` (generic) or `ease` (default).
4. Consider scroll-driven animations (CSS `animation-timeline: scroll()`) for the editorial/problem section. Content that parallaxes or reveals progressively as you scroll feels more crafted than uniform pop-ins.
5. Add a `<noscript>` fallback that sets `.reveal { opacity: 1; transform: none; }` so content is never hidden if JS fails.

---

### Pitfall 7: SEO Regression During Redesign

**What goes wrong:** The redesigned site loses existing search rankings because URL anchors change, meta tags are not updated, structured data is not added, and the canonical URL breaks.

**Why it happens:** Visual redesigns focus on CSS and HTML structure. SEO concerns (meta tags, heading hierarchy, anchor link structure, schema markup) are treated as "later" work.

**Prevention:**
1. Maintain the same `id` attributes on anchor sections (`#services`, `#contact`, etc.) so existing bookmarks and any external links to anchors still work.
2. Keep the same `<title>` and `<meta name="description">` unless intentionally improving them.
3. Add FAQ schema (JSON-LD) to the FAQ section -- this is a free SEO win that the current site misses entirely.
4. Add LocalBusiness schema (JSON-LD) with Melbourne address, ABN, and service area.
5. Verify the `og:image` actually exists (the current site references a non-existent `og-image.jpg`).
6. Ensure heading hierarchy is correct: one `<h1>`, sequential `<h2>`s, no skipped levels.

---

### Pitfall 8: Mobile Treated as Squished Desktop

**What goes wrong:** The mobile layout is the desktop layout with `grid-template-columns: 1fr`. Content that works at 1200px wide just stacks vertically at 375px. Nothing is redesigned for mobile -- it is merely reflowed.

**Why it happens:** Media queries make it easy to stack columns. The hard work -- rethinking information hierarchy, touch target sizes, thumb-zone placement, and content prioritization for small screens -- is skipped.

**Consequences:** 62%+ of traffic is mobile. A "squished" mobile experience signals low effort. Touch targets too small, text too dense, CTAs buried below the fold.

**Prevention:**
1. Design mobile layouts FIRST. Every section should have a deliberately designed mobile version, not just a column collapse.
2. Minimum touch target: 44x44px (WCAG) or 48x48px (Material Design). Test every button and link.
3. Hero section mobile: the headline must be readable at `clamp(2rem, ...)` minimum. Two stacked full-width buttons, not inline.
4. Mobile nav: the current hamburger-to-fullscreen-overlay pattern is fine. Ensure the overlay has large, well-spaced links and a clear close affordance.
5. Test the critical path on mobile: Can a user scroll from hero to CTA and submit a form without frustration? Time it. If it takes more than 3 taps to reach the form, there are too many obstacles.

---

## Minor Pitfalls

Mistakes that cause annoyance or minor quality issues.

---

### Pitfall 9: Performance Death by Decoration

**What goes wrong:** The redesigned site loads slowly because of decorative choices: multiple Google Font families with many weights, SVG noise overlays, layered radial gradients on `body`, and `backdrop-filter` on scroll-visible elements.

**Prevention:**
1. Limit Google Fonts to 2 families with maximum 3 weights each. The current site loads 3 families with 8+ weights -- this is excessive. Subset to only the weights actually used.
2. Consider self-hosting fonts (WOFF2 files) to eliminate the Google Fonts CDN round-trip. This also removes a GDPR/privacy concern.
3. Remove the SVG noise `body::before` overlay. It forces GPU compositing on every scroll frame for a nearly invisible effect.
4. Remove the layered radial gradients on `body` and `body::after`. Use solid backgrounds or a single subtle gradient.
5. Concatenate CSS files into one file to reduce HTTP requests. The current site loads 4 CSS files separately.

---

### Pitfall 10: Overbuilt Navigation for a Single Page

**What goes wrong:** The navigation has too many links, complex dropdowns, or hover effects that make it feel like a multi-page site. For a single-page site, navigation should be minimal -- its only job is to jump to anchor sections.

**Prevention:**
1. Maximum 4-5 nav links for a single-page site. The current site has 4 (Outcomes, Services, Process, FAQ) plus a CTA button -- this is correct.
2. Active-state highlighting (scrollspy) adds polish but is not critical. If added, ensure it does not jank during scroll.
3. The fixed nav CTA ("Book Strategy Call") must remain visible at all sizes. It is the most important element on the page.

---

### Pitfall 11: Inconsistent Responsive Breakpoints

**What goes wrong:** CSS media queries use different breakpoint values, or the JS mobile nav breakpoint does not match the CSS breakpoint. Elements break at widths between defined breakpoints.

**Prevention:**
1. Define breakpoints in a comment block at the top of the CSS and reference them consistently: `/* Breakpoints: tablet 1024px, mobile 768px */`
2. The current site has a JS/CSS breakpoint mismatch (JS checks `> 760`, CSS uses `max-width: 760px`). Align these in the redesign.
3. Test at awkward widths: 769px, 1023px, 320px (iPhone SE), 1440px (large desktop). These are where layouts typically break.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|------------|---------------|------------|
| Typography system | Choosing "safe" fonts that echo AI defaults | Create a NOT-list of banned fonts (Inter for body, Poppins, Open Sans, Montserrat). Test heading font at large sizes -- it must have editorial presence. |
| Color palette | Defaulting to indigo accent | If keeping indigo, pair it with an unexpected warm secondary. Better: shift accent to something less AI-associated. |
| Card/section styling | Uniform card grid with glassmorphism | Kill the `.glass` class. Use solid cards with varied layouts. Break grids with full-width editorial moments. |
| Hero section | Centered text + two buttons (the AI default) | The spec calls for centered hero. Add distinctive elements: asymmetric trust bar, editorial line breaks in the H1, a data callout, or scroll indicator with personality. |
| Contact form | Shipping with broken or untested submission | Wire webhook on day 1. Test full flow on mobile before any visual work is considered complete. |
| Animations | Uniform fade-up-from-below on everything | Mix animation types. Reduce translate distance. Add one scroll-driven animation for editorial impact. |
| Dark mode contrast | Muted text colors failing WCAG on dark backgrounds | Contrast-check every text/background combination. Ban `--grey-600` for meaningful content. |
| Performance | Heavy fonts + decorative CSS overlays | Two font families max, three weights max, no body-level noise/gradient overlays. |

---

## Sources

- [Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website) -- MEDIUM confidence (single source, but specific technical claims verified against known Tailwind defaults)
- [Escape AI Slop: Create Distinctive Frontend Designs](https://techbytes.app/posts/escape-ai-slop-frontend-design-guide/) -- MEDIUM confidence (specific CSS patterns documented)
- [Website Design Trends Most Brands Are Still Getting Wrong in 2026](https://lineanddotstudio.com/blog/website-design-trends-2026/) -- MEDIUM confidence (design industry publication)
- [Web Design Trends 2026: AI Killed the Brochure Website](https://www.utsubo.com/blog/web-design-trends-2026-decision-makers-guide) -- MEDIUM confidence
- [Top 8 Web Design Trends for AI Brands](https://www.tilipmandigital.com/resource-center/articles/web-design-trends-2026-for-ai-brands) -- MEDIUM confidence (AI brand-specific advice)
- [Dark Mode Design: Trends, Myths, and Common Mistakes](https://webwave.me/blog/dark-mode-design-trends) -- MEDIUM confidence
- [Best Practices for Dark Mode in Web Design 2026](https://natebal.com/best-practices-for-dark-mode/) -- MEDIUM confidence
- [Don't Make These Common Website Redesign Mistakes in 2026](https://digitalvolcanoes.com/blogs/dont-make-these-common-website-redesign-mistakes-in-2026) -- MEDIUM confidence
- [Website Redesign SEO: Without Losing Rankings 2026](https://www.sitecentre.com.au/blog/website-redesign-seo) -- MEDIUM confidence (Australian source, relevant context)
- [Aesthetics in the AI Era: Visual + Web Design Trends for 2026](https://medium.com/design-bootcamp/aesthetics-in-the-ai-era-visual-web-design-trends-for-2026-5a0f75a10e98) -- LOW confidence (Medium post, not verified with official source)
- Current codebase analysis: `C:\N8N\Agency\Website\.planning\codebase\CONCERNS.md` -- HIGH confidence (direct code inspection)
- Current codebase: `C:\N8N\Agency\Website\css\main.css`, `C:\N8N\Agency\Website\index.html` -- HIGH confidence (direct code inspection)

---

*Pitfalls audit: 2026-02-16*
