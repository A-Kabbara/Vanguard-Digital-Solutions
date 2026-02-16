# External Integrations

**Analysis Date:** 2026-02-16

## APIs & External Services

**Google Fonts API:**
- Service: Google Fonts CDN for web font delivery
- URL: `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Manrope:wght@400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap`
- Preconnect hints in `index.html` (lines 29-30):
  - `https://fonts.googleapis.com`
  - `https://fonts.gstatic.com` (with `crossorigin` attribute)
- Font loading strategy: `display=swap` (text remains visible during font load)
- No local font fallback files. If CDN is unreachable, the browser falls back to generic `sans-serif`, `serif`, and `monospace` system fonts as defined in CSS custom properties.
- Three font families loaded:
  - **Syne** (400-800) - Used as `--font-heading` for headings and `.h-font` class
  - **Manrope** (400-800) - Used as `--font-body` for body text
  - **IBM Plex Mono** (400, 500, 700) - Used as `--font-mono` for labels, badges, and `.mono` class

## Data Storage

**Databases:**
- None. This is a fully static site with no persistent data storage.

**File Storage:**
- Local filesystem only. All assets are self-contained.
- The `assets/` directory exists but is currently empty.
- The `scripts/` directory exists but is currently empty.

**Caching:**
- None. Standard browser caching applies to static files.

## Authentication & Identity

**Auth Provider:**
- None. No authentication system. This is a public marketing site.

## Form Submission

**Contact Form (`index.html` lines 435-483, `js/main.js` lines 114-195):**
- Submission method: `mailto:` protocol (no backend, no API endpoint)
- Target email: `hello@vanguarddigital.com.au` (hardcoded in `js/main.js` line 181)
- Process: Form data is collected via `FormData` API, formatted into a `mailto:` link with subject and body parameters, and opened via `window.location.href`
- The form relies entirely on the user's default email client
- No form data is sent to any server, API, or third-party service
- No CAPTCHA, spam protection, or bot detection
- Client-side validation only:
  - Required fields: full_name, email, phone, service
  - Australian phone validation regex: `/^(\+?61|0)[2-478]\d{8}$/` and `/^(\+?61|0)4\d{8}$/`
  - HTML5 `type="email"` for email format validation
  - Phone input sanitization: strips non-digit/phone characters, limits to 16 chars

**Form Fields:**
- Full Name (text, required)
- Email (email, required)
- Phone Number (tel, required, Australian format validated)
- Service Interested In (select dropdown, required):
  - `website-funnel` - AI Website & Funnel Build
  - `qualification` - Lead Qualification Automation
  - `sales-ops` - Sales & Handover Workflows
  - `dashboard` - Decision Dashboards
  - `full-system` - Full AI Growth System
- Project Details (textarea, optional)

## Monitoring & Observability

**Error Tracking:**
- None. No error tracking service (no Sentry, LogRocket, etc.).

**Analytics:**
- None. No Google Analytics, Plausible, Fathom, or any analytics script.
- No tracking pixels (Meta Pixel, Google Ads, LinkedIn Insight, etc.).

**Logs:**
- None. No logging infrastructure. Browser console only.

## CI/CD & Deployment

**Hosting:**
- Not configured in the codebase. Deployable to any static host.
- Git repository initialized (`.git/` directory present with `main` branch).

**CI Pipeline:**
- None detected. No GitHub Actions, no Netlify/Vercel config files.
- No `.github/workflows/`, `netlify.toml`, `vercel.json`, or similar.

**Deployment:**
- Manual. No automated deployment configured.
- The entire site is deployable by uploading `index.html`, `css/`, and `js/` to any web server.

## Environment Configuration

**Required env vars:**
- None. The site has zero environment-variable dependencies.

**Hardcoded configuration values in source:**
- Email: `hello@vanguarddigital.com.au` - in `index.html` (lines 479-480, 500) and `js/main.js` (line 181)
- Domain: `vanguarddigital.com.au` - in `index.html` meta tags (lines 12, 19-20) and browser mockup (line 101)
- OG image: `https://vanguarddigital.com.au/og-image.jpg` - in `index.html` (lines 20, 25) -- **NOTE: no `og-image.jpg` file exists in the repo**
- ABN: `41 695 249 793` - in `index.html` (lines 431-432, 492-493)
- Theme color: `#0a111c` - in `index.html` (line 7)

**Secrets location:**
- No secrets. No API keys, tokens, or credentials anywhere in the codebase.

## Webhooks & Callbacks

**Incoming:**
- None. No server-side endpoints.

**Outgoing:**
- None. The `mailto:` form submission opens the user's email client but does not make any HTTP requests.

## CDN Dependencies Summary

| Resource | CDN | Fallback | Critical |
|----------|-----|----------|----------|
| Syne font | fonts.googleapis.com | Generic sans-serif | Medium - headings degrade gracefully |
| Manrope font | fonts.googleapis.com | Generic sans-serif | Medium - body text degrades gracefully |
| IBM Plex Mono font | fonts.gstatic.com | Generic monospace | Low - labels and badges only |

## Third-Party Scripts

- None. Zero third-party JavaScript loaded. The only script is `js/main.js` which is first-party.
- No cookie consent banner needed (no tracking or third-party cookies).
- No chat widgets, support tools, or embedded content.

## SVG Icons

- All icons are inline SVGs within `index.html` (service card icons, lines 256-319).
- No external icon library (no Font Awesome, Heroicons CDN, etc.).
- Icon style: Lucide-compatible stroke-based SVGs with `stroke="currentColor"` and `stroke-width="2"`.
- Decorative elements (dots, lines, shapes) are CSS-generated pseudo-elements, not external assets.

---

*Integration audit: 2026-02-16*
