# Codebase Concerns

**Analysis Date:** 2026-02-16

## Tech Debt

**Design Spec Divergence:**
- Issue: The implemented site substantially diverges from the design spec in `vanguard-claude-code-prompt.md`. The spec calls for fonts "Instrument Serif", "Inter", and "JetBrains Mono" but the build uses "Syne", "Manrope", and "IBM Plex Mono". The spec defines an indigo accent (`#4F46E5`) color palette but the build uses a cyan/gold palette (`--primary-accent: 198 93% 61%` and `--secondary-accent: 39 88% 66%`). The spec calls for a light/dark mixed layout (off-white sections for Services, Who We Help) but the build is dark-mode-only throughout. Multiple spec sections are missing entirely: Problem Statement, Who We Help (client archetypes), Final CTA section, and the full 4-column footer.
- Files: `vanguard-claude-code-prompt.md`, `index.html`, `css/main.css` (lines 6-46)
- Impact: The spec was presumably the stakeholder-approved design direction. The current implementation is a creative reinterpretation rather than a faithful build. If the spec is still the source of truth, this is a significant gap.
- Fix approach: Decide whether to update the spec to match the current build (making it the new canonical design), or bring the build into alignment with the spec. The current build quality is high, so updating the spec is likely the pragmatic choice.

**Orphan CSS File:**
- Issue: `css/visuals.css` (228 lines) defines styles for `.visual-container`, `.visual-wireframe`, `.visual-nodes`, `.visual-chart`, and related classes, but is never linked in `index.html` and no corresponding HTML elements exist in the markup.
- Files: `css/visuals.css`
- Impact: Dead code. Increases repo size and causes confusion for future contributors who may think these components exist or are needed.
- Fix approach: Delete `css/visuals.css` or integrate its components into the page if the visual elements are planned features.

**Empty Directories:**
- Issue: Both `scripts/` and `assets/` directories are completely empty. They were created at repo init but contain no files.
- Files: `scripts/`, `assets/`
- Impact: Misleading directory structure. Suggests content or build scripts that do not exist.
- Fix approach: Remove both directories unless they are being reserved for planned content. If images or other assets are planned, add a `.gitkeep` with a comment or remove entirely.

**No Minification or Build Pipeline:**
- Issue: CSS is split across 5 files (`css/main.css`, `css/hero.css`, `css/bento.css`, `css/form.css`, `css/visuals.css`) loaded as separate HTTP requests. No build tool concatenates or minifies them. JS is a single unminified file.
- Files: `index.html` (lines 35-39), all `css/*.css` files, `js/main.js`
- Impact: 4 blocking CSS requests (visuals.css not loaded, so effectively 4) plus 1 JS request. Total unminified CSS is ~38KB, JS is ~6KB. For a small site this is acceptable but leaves performance gains on the table.
- Fix approach: Either consolidate into a single CSS file or add a simple build step (e.g., a concatenation script). Low priority for a site this size.

## Known Bugs

**Email Field Has No Custom Validation:**
- Symptoms: The form uses `novalidate` on the `<form>` element, disabling native browser validation. The JS validates phone with a custom `validatePhone()` function and checks all required fields for non-empty values, but email fields only get the "not empty" check. A user can submit "asdf" as an email and it will pass validation and trigger the `mailto:` redirect.
- Files: `js/main.js` (lines 131-163), `index.html` (line 435, 444)
- Trigger: Enter any non-empty string in the email field and submit the form.
- Workaround: The mailto link still opens the user's email client, so the bad email is only in the body text sent to the business -- it does not cause a technical failure. But it means invalid submissions can reach the business inbox.

**Form Success Overlay Never Hides:**
- Symptoms: After successful form submission, `formSuccess` element is set to `display: block` and `form.reset()` is called, but the success overlay is never hidden if the user wants to submit again. The overlay persists indefinitely.
- Files: `js/main.js` (lines 183-186), `css/form.css` (lines 207-229)
- Trigger: Submit the form successfully, then try to fill it out again.
- Workaround: Refresh the page.

**mailto: Approach Is Unreliable for Lead Capture:**
- Symptoms: The form submission uses `window.location.href = mailto:...` which requires the user to have a configured email client. On many machines (especially mobile or web-only users), this fails silently or opens an unwanted app. The form shows "Brief received" immediately even though no data has actually been sent.
- Files: `js/main.js` (lines 181-186)
- Trigger: Submit the form on a device without a configured email client.
- Workaround: The success message includes a fallback email link. But for a "conversion-focused" agency site, this is a significant lead leak.

## Security Considerations

**No CSRF or Spam Protection on Form:**
- Risk: The contact form has no CAPTCHA, honeypot field, rate limiting, or any bot protection. Since it uses `mailto:` rather than a server endpoint, this is partially mitigated (bots cannot directly submit data to a server), but automated form interactions could still trigger mailto URIs in certain environments.
- Files: `index.html` (lines 435-483), `js/main.js` (lines 114-195)
- Current mitigation: The mailto approach inherently limits automated abuse since it requires a local email client.
- Recommendations: If/when the form is connected to a real backend (webhook, API, etc.), add a honeypot field, reCAPTCHA, or Cloudflare Turnstile before going live.

**No Content Security Policy:**
- Risk: No CSP meta tag or headers defined. The inline SVG data URI for the favicon and the Google Fonts CDN are the only external resources, but adding CSP would harden against injection if the site ever gains dynamic content.
- Files: `index.html` (head section)
- Current mitigation: Static HTML with no user-generated content or dynamic rendering. Low risk currently.
- Recommendations: Add a `<meta http-equiv="Content-Security-Policy">` tag restricting script-src, style-src, and font-src to self and Google Fonts domains.

**OG Image References Non-Existent Asset:**
- Risk: Both `og:image` and `twitter:image` meta tags reference `https://vanguarddigital.com.au/og-image.jpg` but no `og-image.jpg` file exists in the repository. Social media previews will show a broken or missing image.
- Files: `index.html` (lines 20, 25)
- Current mitigation: None.
- Recommendations: Create and add an `og-image.jpg` (1200x630px recommended) to the project root.

## Performance Bottlenecks

**Render-Blocking Google Fonts Load:**
- Problem: Three font families (Syne, Manrope, IBM Plex Mono) with multiple weights are loaded via a single Google Fonts stylesheet request. This is render-blocking since it is a `<link rel="stylesheet">` in the `<head>`.
- Files: `index.html` (lines 29-33)
- Cause: The `display=swap` parameter helps with FOIT (flash of invisible text), and `preconnect` hints are present, which is good. But the combined request still loads ~15 font files for 3 families with multiple weights (400, 500, 600, 700, 800 for Manrope and Syne; 400, 500, 700 for IBM Plex Mono).
- Improvement path: Subset fonts to only the weights actually used. Manrope 800 is used only for `.form-submit-btn`, Syne 400 and 500 appear unused. Self-hosting fonts with `font-display: swap` and `preload` for critical weights would eliminate the Google Fonts round-trip.

**backdrop-filter Without Consistent Vendor Prefix:**
- Problem: `backdrop-filter: blur()` is used in 4 locations across the CSS, but `-webkit-backdrop-filter` is only present in 1 of those locations (`css/main.css` line 254 for `.glass`). The navbar scrolled state, mobile nav overlay, and visuals.css chart line all lack the webkit prefix.
- Files: `css/main.css` (line 336, 743), `css/visuals.css` (line 214)
- Cause: Inconsistent application during development.
- Improvement path: Add `-webkit-backdrop-filter` alongside every `backdrop-filter` declaration for Safari compatibility.

**Fixed Noise Overlay on body::before:**
- Problem: `body::before` renders an inline SVG noise texture as a `position: fixed` full-viewport overlay at all times. This forces the GPU to composite an extra full-screen layer on every scroll frame.
- Files: `css/main.css` (lines 76-84)
- Cause: Design choice for subtle texture effect.
- Improvement path: The opacity is 0.065, making it nearly invisible. Consider removing it entirely or using `will-change: transform` and testing on lower-powered devices. On mobile, this adds unnecessary compositing cost.

## Fragile Areas

**Reveal Animation System:**
- Files: `css/main.css` (lines 222-247), `js/main.js` (lines 57-77)
- Why fragile: Every `.reveal` element starts at `opacity: 0; transform: translateY(24px)`. If JavaScript fails to load or the IntersectionObserver does not fire (e.g., in older browsers, print stylesheets, or if elements are above the fold and the observer misses them on page load), content remains invisible. The delay classes (`d-100` through `d-400`) compound this risk -- if the parent reveal does not trigger, delayed children stay hidden.
- Safe modification: Always test with JS disabled. Consider adding a `<noscript>` style that sets `.reveal { opacity: 1; transform: none; }` as a fallback.
- Test coverage: No automated tests exist.

**Mobile Nav Breakpoint Hardcoded in JS:**
- Files: `js/main.js` (line 53)
- Why fragile: The resize handler checks `window.innerWidth > 760` to close the mobile nav, but the CSS breakpoint for showing the hamburger is `max-width: 760px` in `css/main.css` (line 718). If the CSS breakpoint is changed, the JS value must be updated manually. There is no shared constant.
- Safe modification: Always update both `js/main.js` line 53 and `css/main.css` line 718 together.
- Test coverage: None.

**12-Column Bento Grid Spanning:**
- Files: `css/bento.css` (lines 8-131)
- Why fragile: The bento grid uses a 12-column system with hardcoded span values (`.bento-lg` = span 8, `.bento-md` = span 4, `.bento-sm` = span 4, `.bento-wide` = span 8). Adding or removing case study cards requires manually recalculating spans to ensure rows fill completely. A 5th card added as `bento-sm` (span 4) would not fit the current layout math without adjusting other cards.
- Safe modification: When adding/removing bento items, verify the column spans per row sum to 12 or use the mobile breakpoint where everything becomes span 12.
- Test coverage: None.

## Scaling Limits

**Single-Page Architecture:**
- Current capacity: One page with all content inline.
- Limit: Adding blog posts, portfolio pages, or dynamic content requires either duplicating the full layout boilerplate or moving to a templating/build system.
- Scaling path: If multi-page is needed, adopt a simple static site generator (e.g., 11ty) or at minimum create a shared header/footer partial system.

**mailto: Form Submission:**
- Current capacity: Works for very low volume where every lead manually sends an email.
- Limit: No data persistence, no CRM integration, no analytics on form submissions. Every lead depends on the visitor's email client functioning correctly.
- Scaling path: Replace with a webhook endpoint (e.g., n8n webhook, Formspree, Netlify Forms, or a custom API). This is the single highest-impact change for lead capture reliability.

## Dependencies at Risk

**Google Fonts CDN:**
- Risk: External dependency on `fonts.googleapis.com` and `fonts.gstatic.com`. If Google Fonts CDN has an outage or is blocked (some privacy-focused networks block Google tracking domains), fonts fall back to system sans-serif/serif/monospace. The visual design degrades significantly since the typography is core to the premium aesthetic.
- Impact: Layout shift and visual degradation during outage or in restricted networks.
- Migration plan: Self-host font files (download WOFF2 from Google Fonts, place in a local `fonts/` directory, update `@font-face` declarations in CSS).

## Missing Critical Features

**No Analytics:**
- Problem: No Google Analytics, Plausible, Fathom, or any analytics script. No way to measure traffic, conversions, or user behavior.
- Blocks: Cannot measure ROI of the site, cannot identify which sections users engage with, cannot track CTA click-through rates. For a "conversion-focused" agency site, this is a critical gap.

**No Structured Data (Schema.org):**
- Problem: No JSON-LD or microdata for LocalBusiness, Organization, or FAQ schema. The FAQ section is a natural candidate for FAQ schema markup which would enhance search result appearance.
- Blocks: Missed SEO opportunity for rich snippets in Google search results.

**No Privacy Policy or Terms:**
- Problem: The site collects name, email, phone, and project details via the form but has no linked privacy policy.
- Blocks: May not comply with Australian Privacy Act requirements, especially if form data is eventually sent to a server. The ABN suggests this is a registered business entity subject to APP (Australian Privacy Principles).

**No 404 Page:**
- Problem: No custom 404 page exists. Visitors hitting a bad URL will see the server's default error page.
- Blocks: Poor user experience for mistyped URLs or broken external links.

## Test Coverage Gaps

**No Tests of Any Kind:**
- What's not tested: The entire codebase -- form validation logic, phone number regex, mobile nav toggle behavior, IntersectionObserver reveal system, FAQ accordion mutual exclusion, and magnetic button effects.
- Files: `js/main.js` (all 200 lines), all CSS files
- Risk: Any change to form validation (`js/main.js` lines 120-163) could silently break lead capture. The phone validation regex (line 122) is particularly complex and untested -- it may reject valid Australian numbers or accept invalid ones. For example, it accepts `+61` prefixed numbers but the two regex branches overlap (the first already matches mobile numbers starting with `04`).
- Priority: High for form validation logic, Medium for UI interactions.

**No Cross-Browser Testing Evidence:**
- What's not tested: Safari webkit prefix coverage is inconsistent (see backdrop-filter issue above). No evidence of testing on Firefox, Edge, or mobile browsers.
- Files: All CSS files
- Risk: Glass morphism effects (`backdrop-filter`) may not render on older Safari without `-webkit-` prefix. The `text-wrap: balance` property in `css/main.css` line 148 has limited browser support.
- Priority: Medium.

**No Lighthouse or Performance Audit:**
- What's not tested: Page load performance, accessibility score, SEO score, best practices score.
- Files: Entire site
- Risk: The noise overlay, multiple font loads, and glass effects may cause poor Lighthouse scores on mobile. The `prefers-reduced-motion` media query in `css/main.css` line 792 is present (good), but it uses `!important` on all transitions which could interfere with critical state changes like the mobile nav.
- Priority: Medium.

---

*Concerns audit: 2026-02-16*
