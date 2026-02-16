# CLAUDE CODE PROMPT — Vanguard Digital Solutions

> Paste everything below this line into Claude Code

---

Build a premium, conversion-focused single-page landing site for **Vanguard Digital Solutions** — an AI agency based in Melbourne, Australia. This is our own agency site so it needs to be the best work we've ever done. Think $50K agency build — not a template, not vibe-coded, not AI slop.

**Tech:** Single `index.html` file. Pure HTML, CSS, vanilla JS. No frameworks, no build tools. Google Fonts via CDN only. Self-contained, deployable anywhere.

---

## BRAND

- **Company:** Vanguard Digital Solutions Pty Ltd
- **ABN:** 41 695 249 793
- **ACN:** 695 249 793
- **Location:** Melbourne, Australia
- **Website:** vanguarddigital.com.au
- **Email:** hello@vanguarddigital.com.au (placeholder)

---

## COLOUR PALETTE (CSS custom properties)

```
--midnight: #0A0A0F        /* hero, nav, footer, dark sections */
--surface: #111116         /* slightly lighter dark */
--slate: #1A1A22           /* cards on dark backgrounds */
--white: #FFFFFF
--off-white: #F5F5F7       /* light section backgrounds */
--grey-100: #E8E8ED        /* borders */
--grey-400: #8A8A9A        /* secondary text */
--grey-600: #5A5A6A        /* muted text */
--accent: #4F46E5          /* indigo — primary CTA */
--accent-light: #6366F1    /* hover */
--accent-glow: rgba(79,70,229,0.15)
--green: #10B981           /* trust/success */
```

## TYPOGRAPHY

- **Headings:** `"Instrument Serif", serif` — editorial, premium, NOT generic
- **Body:** `"Inter", sans-serif` — clean reading font
- **Labels/numbers:** `"JetBrains Mono", monospace` — techy credibility

## DESIGN DIRECTION

Dark-mode-first. Think Linear.app meets a premium consulting firm. Clean, spacious, confident. No gradients-on-everything, no floating 3D blobs, no glassmorphism. Sharp typography, intentional spacing, quiet confidence. A business owner should look at this and think "these people clearly know what they're doing — I need to call them."

**CONVERSION PHILOSOPHY:** Every scroll position should have a CTA visible or nearby. The page is a funnel — awareness → interest → desire → action. Multiple "Book a Strategy Call" touchpoints. Urgency without desperation. Social proof at every turn. Remove all friction from the decision to reach out.

---

## GLOBAL DESIGN RULES

- Max container: 1200px centred, 24px horizontal padding
- Section padding: 120px vertical (80px mobile)
- Scroll animations: IntersectionObserver fade-up on each element, staggered 0.08s delay. Transition: opacity 0.6s ease, transform 0.6s ease. Start: opacity 0, translateY(30px)
- Cards: bg var(--slate), border 1px solid rgba(255,255,255,0.06), border-radius 16px, padding 40px. Hover: border-color rgba(79,70,229,0.3), box-shadow 0 0 40px var(--accent-glow). Transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)
- Primary button: var(--accent) bg, white text, 14px 32px padding, border-radius 10px, font-weight 600. Hover: var(--accent-light), translateY(-2px), shadow
- Secondary button: transparent, 1.5px solid rgba(255,255,255,0.15), white text. Hover: border-color var(--accent), color var(--accent-light)
- NO emoji as icons — use inline SVG paths (Lucide style)
- NO placeholder images with broken icons — use solid colour blocks or CSS patterns
- Every interactive element has a smooth hover transition
- Mobile breakpoint: 768px — everything stacks, hamburger nav

---

## SECTION-BY-SECTION BUILD

### 1. NAVBAR (fixed)

Full-width, var(--midnight) bg, backdrop-filter: blur(16px), rgba(10,10,15,0.9). Thin 1px border-bottom rgba(255,255,255,0.06).

**Left:** "VANGUARD" — JetBrains Mono, 0.85rem, 700 weight, letter-spacing 0.12em, white. Small indigo dot (6px circle) before text as brand mark.

**Right:** Links — Services, Process, Results, Contact — Inter 0.9rem, 500 weight, var(--grey-400), hover: white. After links: primary indigo CTA button **"Book a Strategy Call"**.

**Mobile:** Clean hamburger → full-screen dark overlay, large centred nav links.

Add `.scrolled` class via JS when user scrolls past 50px — slightly darker bg.

---

### 2. HERO (conversion-optimised)

100vh, var(--midnight). Centred vertically + horizontally, text-align centre.

From top to bottom:

**Pill badge:** border 1px solid rgba(79,70,229,0.3), border-radius 50px, padding 8px 20px, bg rgba(79,70,229,0.08). Green pulsing dot (8px, CSS pulse animation) + text **"Now taking Q1 2026 clients"** — Inter 0.8rem, var(--grey-400). This creates urgency.

**H1** (mt 32px): **"We Build AI Systems That Grow Your Business"** — Instrument Serif, clamp(2.8rem, 5.5vw, 5rem), white, letter-spacing -0.03em, line-height 1.1, max-width 800px.

**Subtitle** (mt 24px): "AI-powered websites, smart automation, and lead generation systems for trades, local businesses, and startups across Australia." — Inter 1.15rem, var(--grey-400), line-height 1.7, max-width 580px.

**Two buttons** (mt 40px, 16px gap, centred):
- Primary: **"Book a Free Strategy Call →"**
- Secondary outline: **"See What We Do ↓"** (smooth scrolls to services)

**Trust bar** (mt 56px): 3 items separated by subtle vertical lines (1px rgba white 0.08):
- "🟢 Melbourne Based" (use a small CSS green dot, not emoji)
- "ABN Registered"
- "AI-First Agency"
All in JetBrains Mono, 0.8rem, var(--grey-600), tracked 0.06em.

**Scroll indicator** (mt 80px): CSS-only animated chevron, slowly bouncing, rgba white 0.15.

---

### 3. SOCIAL PROOF BAR (conversion booster — right below hero fold)

Thin section, var(--surface) bg, padding 40px vertical. A single centred row of quick stats. This creates instant credibility before they even get to services.

4 stats in a horizontal row (2x2 on mobile), separated by subtle borders:

- **"48hr"** → "Website turnaround"
- **"20+"** → "Hours/week saved with automation"
- **"100%"** → "Australian owned & operated"
- **"$0"** → "Strategy call — always free"

Numbers in JetBrains Mono, 2rem, var(--accent), bold. Labels in Inter, 0.85rem, var(--grey-400). This section is quick — not a full section, more of a confidence strip.

---

### 4. PROBLEM STATEMENT (editorial moment — dark bg)

var(--midnight) bg. This is NOT a typical section with cards. It's a large, punchy editorial text block. Let it breathe.

Centred, max-width 700px:

**Label:** "THE REALITY" — JetBrains Mono, 0.75rem, var(--accent), tracked 0.14em

**Statement** (mt 20px): "Most businesses are leaving money on the table because they don't have the right digital systems." — Instrument Serif, clamp(1.6rem, 3vw, 2.4rem), white, line-height 1.35

**Body** (mt 24px): "No website. Or a website from 2014 that's quietly killing your reputation. Manual processes eating up 20 hours a week. Leads going cold because no one followed up. Competitors using AI to move faster while you're stuck doing everything by hand. Sound familiar?" — Inter 1.05rem, var(--grey-400), line-height 1.75

**Kicker** (mt 20px): "That's exactly what we fix." — Inter 1.1rem, white, font-weight 600

No buttons, no cards. Just a powerful text moment.

---

### 5. SERVICES (light section — off-white bg, creates contrast)

**Label:** "WHAT WE DO" — JetBrains Mono, 0.75rem, var(--accent), tracked 0.14em
**H2:** "Four Ways We Grow Your Business" — Instrument Serif, clamp(2rem, 3.5vw, 3rem), var(--midnight)
**Subtitle:** "End-to-end AI solutions — from getting you online to automating your entire operation." — Inter 1.05rem, var(--grey-600), max-width 540px

2x2 grid (1 column mobile), 24px gap, mt 56px. Cards have WHITE bg (since section is off-white), border 1px solid var(--grey-100). Hover: border-color var(--accent), subtle accent glow shadow.

**Card 1 — AI-Powered Websites**
Inline SVG icon: globe, in indigo.
"We design and build high-converting websites using AI tools — fast, modern, and built to turn visitors into paying customers. Perfect for trades, cafes, retail, and service businesses."
Small list (styled as • bullets, not <li>): Custom design, not templates • Mobile-first • SEO-ready from day one • Built in days, not months

**Card 2 — AI Automation & Workflows**
Icon: zap/lightning SVG, indigo.
"We build AI systems that automate the repetitive work draining your time — follow-ups, bookings, onboarding, data entry, reporting. You focus on the work. The systems run behind it."
List: CRM & email automation • AI chatbots • Booking systems • Custom workflows

**Card 3 — AI Consulting & Strategy**
Icon: lightbulb SVG, indigo.
"Not sure where AI fits? We audit your operations, find the highest-impact opportunities, and build a clear roadmap — no jargon, no fluff, just practical steps that save time and money."
List: AI readiness audit • Tool selection & setup • Team training • Ongoing advisory

**Card 4 — Lead Generation Systems**
Icon: target SVG, indigo.
"We build lead generation machines — websites that capture enquiries, ad systems that find the right people, and automations that convert leads while you sleep. More customers, less chasing."
List: Google & Meta ads • Landing pages • Lead capture & CRM • Automated follow-up

**Below grid** (mt 48px, centred): Primary CTA → **"Book a Free Strategy Call →"**

---

### 6. PROCESS (dark bg — var(--midnight))

**Label:** "HOW IT WORKS" — JetBrains Mono, accent
**H2:** "Simple Process. Serious Results." — Instrument Serif, white
**Subtitle:** "No 12-week timelines, no scope creep. Just clear steps from conversation to results."

4 steps in horizontal row (single column mobile). Each step:

- Large number "01" etc — JetBrains Mono, 3rem, var(--accent), opacity 0.3
- Title — Inter 1.1rem, white, 600 weight
- Description — Inter 0.95rem, var(--grey-400), 2 lines
- Subtle horizontal connector line between steps (desktop only, 1px rgba white 0.06)

**01 — Discovery Call** → "Free 30-minute call. We learn your business, your goals, and what's costing you time or money right now."
**02 — Strategy & Quote** → "We come back with a clear plan — what we'll build, what it costs, when it's done. No surprises, no hidden fees."
**03 — Build & Launch** → "We build fast. You get progress updates. We launch when it's ready — usually 1-3 weeks depending on scope."
**04 — Optimise & Grow** → "Post-launch, we monitor and improve. Your systems get smarter and your results compound over time."

**Below steps** (mt 48px, centred): **"Start With a Free Call →"** primary CTA

---

### 7. WHO WE HELP (off-white bg — social proof / client archetypes)

**Label:** "WHO WE WORK WITH" — JetBrains Mono, accent
**H2:** "Built for Businesses Like Yours" — Instrument Serif, midnight

3 cards in a row (1 col mobile). Each represents a client type with a specific conversion hook:

**(1) Trades & Local Businesses**
"Electricians, plumbers, landscapers, cleaners, cafes — if you don't have a website or yours looks like it was built in 2012, we get you online fast with a site that actually brings in work."
**Bold stat:** "Websites delivered in as little as 48 hours"
Small CTA link: "Get your business online →"

**(2) Growing SMBs**
"You've got the business but you're drowning in admin. We plug in AI automation — CRM, follow-ups, booking, reporting — so you can scale without hiring another admin."
**Bold stat:** "Save 20+ hours per week with smart automation"
Small CTA link: "Automate your operations →"

**(3) Startups & New Ventures**
"Move fast, validate ideas, look legit to customers and investors. We build MVPs, landing pages, and lead gen systems at startup speed and startup budgets."
**Bold stat:** "From idea to live product in 1-3 weeks"
Small CTA link: "Launch your idea →"

All small CTA links scroll to the contact/CTA section.

---

### 8. FAQ (dark bg — objection handling for conversions)

**Label:** "COMMON QUESTIONS" — JetBrains Mono, accent
**H2:** "Got Questions? Good." — Instrument Serif, white

Accordion-style FAQ. Each question is a clickable row — click expands/collapses the answer with smooth max-height transition. Plus icon rotates to X on open.

**Q: How much does it cost?**
A: "It depends on what you need. A high-converting website starts from around $1,500. Automation builds vary depending on complexity. Every project gets a clear, fixed quote upfront — no hourly billing surprises. Book a free call and we'll give you a straight answer."

**Q: How long does it take?**
A: "Most websites are delivered within 1-2 weeks. Automation projects typically take 2-4 weeks. Simple landing pages can be done in 48 hours. We move fast because we use AI-powered tools and proven systems."

**Q: I'm not technical — will I understand what you're building?**
A: "Absolutely. We explain everything in plain English. You'll get progress updates, walkthrough videos, and we don't hand anything over until you're 100% comfortable using it."

**Q: Do you work with businesses outside Melbourne?**
A: "Yes. We're based in Melbourne but work with clients across Australia. Everything is done remotely — calls, builds, and delivery."

**Q: What if I just need a website and nothing else?**
A: "That's completely fine. Many of our clients start with a website and add automation or lead gen later as they grow. No pressure to buy more than you need."

**Q: What makes you different from other web agencies?**
A: "We're AI-first. That means we build faster, smarter, and more cost-effectively than traditional agencies. You get premium quality at a fraction of the time and cost because we leverage AI at every step of the process."

---

### 9. FINAL CTA (conversion-critical — dark bg with visual impact)

Full-width, var(--midnight) bg with subtle radial gradient: rgba(79,70,229,0.06) in a large soft circle behind the text. Creates depth.

Centred:

**H2:** "Ready to Stop Leaving Money on the Table?" — Instrument Serif, white, clamp(2rem, 4vw, 3.2rem)
**Subtitle:** "Book a free 30-minute strategy call. No sales pitch — just an honest conversation about where AI can help your business grow." — Inter 1.05rem, var(--grey-400), max-width 560px
**Two buttons** (mt 32px): Primary **"Book a Free Strategy Call →"** and secondary outline **"hello@vanguarddigital.com.au"**
**Below** (mt 40px): "Melbourne, Australia • Vanguard Digital Solutions Pty Ltd • ABN 41 695 249 793" — JetBrains Mono, 0.75rem, var(--grey-600)

---

### 10. FOOTER

var(--midnight), border-top 1px rgba white 0.06. Minimal.

4-column grid (2-col tablet, 1-col mobile):

**Col 1:** "VANGUARD" logo text + "AI-powered growth for modern Australian businesses." var(--grey-600) + "Melbourne, Australia"
**Col 2:** "Services" — AI Websites, AI Automation, AI Consulting, Lead Generation (as links)
**Col 3:** "Company" — Services, Process, Results, FAQ, Contact (as smooth-scroll links)
**Col 4:** "Get In Touch" — hello@vanguarddigital.com.au, vanguarddigital.com.au, "Book a Strategy Call" in accent colour

Divider. Bottom bar:
Left: "© 2026 Vanguard Digital Solutions Pty Ltd. All rights reserved."
Right: "ABN 41 695 249 793"
Both 0.8rem, var(--grey-600).

---

## RESPONSIVE RULES

- **Desktop (>1024px):** Full layouts as described
- **Tablet (768-1024px):** Service cards 2-col, process steps 2x2, footer 2-col, stat bar 2x2
- **Mobile (<768px):** Everything single column, hero H1 scales down, buttons stack full-width, hamburger nav with full-screen overlay, section padding 80px, cards full-width with 20px padding

---

## CONVERSION OPTIMISATION CHECKLIST

- [ ] CTA button visible at every scroll position (nav is fixed with CTA, plus section CTAs)
- [ ] At least 5 "Book a Strategy Call" touchpoints across the page
- [ ] Urgency cue in hero (Q1 2026 availability badge)
- [ ] Objection handling via FAQ section
- [ ] Trust signals: ABN, Melbourne-based, stats bar
- [ ] Zero friction: no forms to fill, just "book a call" — lower barrier
- [ ] Speed/cost signals: "48 hours", "from $1,500", "free strategy call"
- [ ] Client archetypes so visitors self-identify ("that's me")

## FINAL QUALITY CHECKS

- [ ] Scroll through entire page — every section feels like the SAME website
- [ ] Enough whitespace everywhere — when in doubt, add more
- [ ] All hover states smooth and visible
- [ ] Mobile version looks INTENTIONALLY designed, not squished desktop
- [ ] Would you hire this agency based on this site? If not, keep refining
- [ ] Zero template energy. Zero AI slop. Premium only.

Save as `index.html`. Clean, well-commented code. Production-ready.
