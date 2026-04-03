# Riefkohl Law — Consolidated Deployment Checklist

**Last updated:** March 19, 2026 (Session 13)
**Status:** All code and content ready. Most scripts are live via GitHub Pages. Remaining items are owner-action only.

---

## Architecture Overview

All custom code is now hosted on **GitHub Pages** and loaded via a single loader in Squarespace:

```
Visitor loads riefkohllaw.com
  → Squarespace serves the page
  → Code Injection Header loads the loader (code-injection-header.html)
  → Loader fetches CSS from GitHub Pages (all-styles.css)
  → Loader fetches JS from GitHub Pages (14 script files)
  → Scripts run and enhance the page
```

**GitHub repo:** `hans0834/riefkohl-law-scripts` (branch: `main`)
**Live URL:** `https://hans0834.github.io/riefkohl-law-scripts/`
**Setup guide:** See `SETUP-GUIDE.md` in the repo for full documentation.

### How to deploy code changes
1. Edit files in the `riefkohl-law-scripts/` folder
2. `git add . && git commit -m "description" && git push`
3. Changes go live in 2–3 minutes via GitHub Pages
4. Hard-refresh the site (Cmd+Shift+R) to verify

### Script load order (14 scripts)
| # | File | Purpose |
|---|------|---------|
| 1 | `gtm-tracking.js` | Google Tag Manager + conversion tracking |
| 2 | `seo-fixes.js` | SEO (H1, meta descriptions, canonicals, hreflang, FAQ schema) — 67+ entries |
| 3 | `homepage-services.js` | Homepage & services page visual design |
| 4 | `images-injection.js` | Branded illustration images |
| 5 | `resources-fix.js` | Resources page subpages + cross-links to articles |
| 6 | `blog-dashboard.js` | Blog dashboard with filtering/search |
| 7 | `articles-inject.js` | 15-article Trust Law Series |
| 8 | `breadcrumb-schema.js` | BreadcrumbList structured data |
| 9 | `post-formatter.js` | Auto-formats case law blog posts |
| 10 | `conversion-booster.js` | Click-to-call banner, sticky mobile CTA, LocalBusiness schema |
| 11 | `email-signup.js` | Newsletter bar + blog lead magnets |
| 12 | `service-crosslinks.js` | Related services links on service pages |
| 13 | `legal-content-fixes.js` | 14 statutory/factual corrections (ULLCA, forced heirship, OBBBA, etc.) |
| 14 | (CSS) `all-styles.css` | Combined CSS for all modules |

---

## Part A: Squarespace Configuration

### A1. Code Injection Header (one-time setup — may already be done)
- [ ] Open Squarespace: **Settings → Advanced → Code Injection → Header**
- [ ] Replace everything with the contents of `riefkohl-law-scripts/code-injection-header.html`
- [ ] This is a ~30-line file containing only `<link>` and `<script>` tags pointing to GitHub Pages
- [ ] **CRITICAL:** This is the ONLY thing that should be in the Code Injection Header
- [ ] Verify: view page source and confirm scripts load from `hans0834.github.io`

### A2. Create 15 blank Squarespace pages for Trust Law articles
Create each page under `/resources/` with these exact slugs. The article content is injected automatically by `articles-inject.js`.

- [ ] `what-is-puerto-rico-trust` (Part 1)
- [ ] `types-of-trusts` (Part 2)
- [ ] `act-60-trust-planning` (Part 3)
- [ ] `modifying-irrevocable-trusts` (Part 4)
- [ ] `avoiding-probate-legitima` (Part 5)
- [ ] `asset-protection-trusts-pr` (Part 6)
- [ ] `special-needs-trusts-medicaid` (Part 7)
- [ ] `ilits-and-slats` (Part 8)
- [ ] `trust-taxation-act-60` (Part 9)
- [ ] `landmark-trust-cases` (Part 10)
- [ ] `trust-costs-puerto-rico` (Part 11)
- [ ] `fiduciary-duties-trustees` (Part 12)
- [ ] `family-trust-pitfalls` (Part 13)
- [ ] `foreign-trust-trap` (Supplement)
- [ ] `mainland-trust-to-puerto-rico` (Supplement)
- [ ] `act-38-2026-trust-planning` (Supplement — Act 38-2026 Special Report)

### A3. Create CPA referral landing page
- [ ] Create a blank Squarespace page at `/cpa-referral`
- [ ] Content is injected automatically by `articles-inject.js`
- [ ] This page is the destination for CPA-referred visitors (via UTM links shared with CPA partners)

### A4. Import new blog posts (CPA Bridge Content — March 2026)
Import the following blog posts to Squarespace (via WXR XML or manual creation):
- [ ] `act-38-2026-estate-plan-EN.md` → slug: `act-38-2026-estate-plan`
- [ ] `act-38-2026-plan-sucesoral-ES.md` → slug: `act-38-2026-plan-sucesoral`
- [ ] `cpa-bridge-trust-advice.md` → slug: `cpa-bridge-trust-advice`
- [ ] `cpa-bridge-irs-audit-attorney.md` → slug: `cpa-bridge-irs-audit-attorney`
- [ ] `cpa-bridge-legal-checklist.md` → slug: `cpa-bridge-legal-checklist`
- [ ] `cpa-bridge-decree-succession.md` → slug: `cpa-bridge-decree-succession`
- [ ] `cpa-bridge-property-purchase.md` → slug: `cpa-bridge-property-purchase`
- [ ] `cpa-bridge-trust-advice-ES.md` → slug: `cpa-bridge-trust-advice-es`
- [ ] `cpa-bridge-legal-checklist-ES.md` → slug: `cpa-bridge-legal-checklist-es`

### A5. CPA referral outreach (manual, owner-action)
- [ ] Send outreach email to Tom Duffy CPA (template: `cpa-referral-outreach-duffy.md`)
- [ ] Send outreach email to Carbonell & Co. (template: `cpa-referral-outreach-carbonell.md`)
- [ ] Send outreach emails to Torres CPA Group, JBM Accounting, PR Advantage using `cpa-referral-outreach-template.md`
- [ ] Share CPA referral UTM links: `riefkohllaw.com/cpa-referral?ref=duffycpa`, `?ref=carbonellcpa`, etc.

### A6. Email provider setup
- [ ] Configure email provider (MailerLite recommended) with two welcome sequences:
  - Default sequence: `email-welcome-sequence.md`
  - CPA referral sequence: `email-welcome-sequence-cpa.md`
- [ ] Upload lead magnet PDFs:
  - `lead-magnet-act60-trusts.md` (convert to PDF)
  - `lead-magnet-act38-2026-checklist.md` (convert to PDF)
  - `lead-magnet-cpa-client-guide.md` (convert to PDF)
- [ ] Update `email-signup.js`: replace `YOUR_FORM_ACTION_URL` with real form action URL
- [ ] Remove the `return;` early exit on line 17 of `email-signup.js` to enable the footer signup bar

### A7. Section 6060.03 monitoring (ongoing)
- [ ] Monitor DDEC for Certified Professional designation implementation
- [ ] When available, follow action items in `section-6060-03-monitoring.md`
- [ ] Flip `SHOW_CERTIFIED_BADGE = true` in `homepage-services.js` once credential is obtained

### A8. Import Round 2 blog posts (IRS Audit Defense + Content Gap posts)
- [ ] `irs-audit-triggers-act60.md` → slug: `irs-audit-triggers-act60`
- [ ] `irs-audit-process-act60.md` → slug: `irs-audit-process-act60`
- [ ] `audit-proof-presence-test-act60.md` → slug: `audit-proof-presence-test-act60`
- [ ] `act60-divorce-family-law.md` → slug: `act60-divorce-family-law`
- [ ] `leaving-puerto-rico-exit-planning.md` → slug: `leaving-puerto-rico-exit-planning`
- [ ] `act60-crypto-digital-assets.md` → slug: `act60-crypto-digital-assets`
- [ ] `build-act60-advisory-team.md` → slug: `build-act60-advisory-team`
- [ ] `act60-vs-international-alternatives.md` → slug: `act60-vs-international-alternatives`

### A9. Create pricing page in Squarespace
- [ ] Create blank Squarespace page at `/pricing`
- [ ] Copy content from `pricing-page-content.md` into the page
- [ ] Add `/pricing` link to the site navigation
- [ ] Adjust fee ranges to actual numbers

### A10. Upload additional lead magnet PDFs
- [ ] `lead-magnet-pre-move-checklist.md` (convert to PDF)
- [ ] `lead-magnet-compliance-calendar-2026.md` (convert to PDF)

### A11. LinkedIn thought leadership (ongoing)
- [ ] Optimize Hans's LinkedIn profile per `linkedin-thought-leadership-program.md`
- [ ] Begin posting 2-3x/week using the 12 sample posts provided
- [ ] Use branded service names from `proprietary-service-branding.md` in posts

### A12. Client testimonials (ongoing)
- [ ] Send testimonial request emails using templates in `testimonial-case-study-templates.md`
- [ ] Request Google reviews from every satisfied client
- [ ] Publish at least 3 testimonials on homepage within 60 days
- [ ] Create at least 2 anonymized case studies using the templates

### A13. WhatsApp number setup
- [ ] Verify WhatsApp Business is set up on (787) 236-1657
- [ ] The sticky CTA bar now includes a WhatsApp button (auto-deployed via code push)
- [ ] Set up auto-reply or business hours on WhatsApp

### A14. Act 60 Legal Readiness Assessment (optional)
- [ ] Create assessment using Typeform, Tally, or Squarespace form block
- [ ] See `act60-readiness-assessment.md` for questions, scoring logic, and response templates
- [ ] Embed on `/act60-assessment` or on the Act 60 Resource Center page

**How to create each page:**
1. In Squarespace, go to **Pages → + → Blank Page**
2. Set the page title to anything (it will be overridden by the inject script)
3. Set the URL slug to the exact slug above
4. Make sure the page is nested under `/resources/` in the navigation
5. Publish the page

**After creating all 15 pages:** Visit each URL (e.g., `riefkohllaw.com/resources/what-is-puerto-rico-trust`) and confirm the article content renders correctly.

### A3. Two scripts need one-time configuration
- [ ] **`gtm-tracking.js`** — Edit in GitHub repo, replace `GTM-XXXXXXX` with your Google Tag Manager Container ID
- [ ] **`email-signup.js`** — Edit in GitHub repo, replace `YOUR_FORM_ACTION_URL` with your email provider's form action URL

---

## Part B: Blog Post Publishing

### B1. Publish 10 original blog posts (from `blog-posts/`)
See `blog-publishing-guide.md` for step-by-step Squarespace publishing instructions.

English posts:
- [ ] `01-act60-estate-planning-mistakes.md` *(updated Session 13: IRC §937 three-test clarification)*
- [ ] `02-trust-vs-will-puerto-rico.md`
- [ ] `03-irs-scrutiny-act60.md`
- [ ] `04-forced-heirship-estate-plan.md`
- [ ] `05-asset-protection-irrevocable-trusts.md`
- [ ] `06-pillar-complete-guide-puerto-rico-trusts.md`

Spanish posts:
- [ ] `07-fideicomiso-irrevocable-puerto-rico.md`
- [ ] `08-planificacion-sucesoral-puerto-rico.md`
- [ ] `09-ley-60-guia-inversionistas.md`
- [ ] `10-declaratoria-de-herederos-puerto-rico.md`

### B2. Publish 22 case law blog posts (from `blog-posts/March 15 2026/`)
**Recommended cadence:** 1–2 posts per day over 3–6 weeks to avoid Google's "content dump" signal.

**DO NOT PUBLISH** these 3 posts (placeholder case holdings — need Westlaw research first):
- ~~Trust Property Disputes - Summaries.md~~ — 8/8 cases placeholder templates
- ~~Breach of Fiduciary Duty - Summaries.md~~ — 8/11 cases placeholder text
- ~~Procedural Beneficiary & Liquidation - Summaries.md~~ — 6/9 cases placeholder text

Category summaries ready to publish (6 posts — English):
- [ ] Banking & Insurance Disputes - Summaries.md
- [ ] Public & Governmental Trust Governance - Summaries.md
- [ ] Standalone Cases - Summaries.md
- [ ] Testamentary & Succession Disputes - Summaries.md
- [ ] Trust Validity Challenges - Summaries.md
- [ ] Trust in Family Law & Trustee Removal - Summaries.md

Individual case posts (16 posts — non-PR cases with customized CTAs):
- [ ] alevras-cga-associates-v-brewster-jr.md
- [ ] american-health-law-assn-v-estate-of-cunningham.md
- [ ] andersen-estate-eileen-andersen-pr.md
- [ ] antero-resources-v-pike-case-08.md
- [ ] chaires-v-champion-realty.md
- [ ] commonwealth-v-valenti.md
- [ ] estate-of-wallace-lucas-sr.md
- [ ] in-re-el-a-minor-ch-v-jn.md
- [ ] in-re-kirton-morris-v-housing-authority.md
- [ ] integrated-health-services-v-estate-of-desantis.md
- [ ] mcarthur-as-pr-of-estate-of-clarence-maurice-logan-jr.md
- [ ] murphy-dependent-of-harold-r-murphy.md
- [ ] parra-v-rapid-casting-rapid-american-corp.md
- [ ] pereira-v-pereira.md
- [ ] shabani-v-burton-trustee.md
- [ ] williams-as-successor-pr-of-estate-of-adams-shirer.md

### B3. Publish 9 Spanish translations of category summaries
Publish alongside or shortly after the English versions. Same 3 DO NOT PUBLISH exclusions apply.

Ready to publish (6 posts):
- [ ] Banking & Insurance Disputes - Summaries-es.md
- [ ] Public & Governmental Trust Governance - Summaries-es.md
- [ ] Standalone Cases - Summaries-es.md
- [ ] Testamentary & Succession Disputes - Summaries-es.md
- [ ] Trust Validity Challenges - Summaries-es.md
- [ ] Trust in Family Law & Trustee Removal - Summaries-es.md

---

## Part C: Non-Code Owner Tasks

### C1. Google Business Profile
- [ ] Go to [business.google.com](https://business.google.com) and claim the listing
- [ ] Set address: 273 Ponce de Leon Ave., San Juan, PR 00917
- [ ] Add business hours, photos, services, and description
- [ ] Request verification (postcard or phone)
- [ ] See `google-business-profile-setup.md` for detailed instructions

### C2. Legal Directory Listings
Create profiles on each platform using the bio in `directory-listings-content.md`:
- [ ] Avvo
- [ ] Justia
- [ ] FindLaw
- [ ] Martindale-Hubbell

### C3. Google Reviews
- [ ] Request reviews from past clients
- [ ] Add a Google review link to email signature and post-engagement communications

### C4. Email Marketing Setup
- [ ] Choose an email provider (Mailchimp, ConvertKit, MailerLite, etc.)
- [ ] Get the form action URL from your provider
- [ ] Edit `email-signup.js` in the GitHub repo — replace `YOUR_FORM_ACTION_URL`
- [ ] Push the change to GitHub — the signup bar will go live automatically
- [ ] Set up the 5-email welcome sequence (content in `email-welcome-sequence.md`)

### C5. Google Tag Manager Setup
- [ ] Create a GTM account at [tagmanager.google.com](https://tagmanager.google.com)
- [ ] Get your Container ID (format: `GTM-XXXXXXX`)
- [ ] Edit `gtm-tracking.js` in the GitHub repo — replace `GTM-XXXXXXX`
- [ ] Push the change to GitHub — tracking will go live automatically

### C6. Google Search Console
- [ ] Verify site ownership at [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Submit sitemap (`riefkohllaw.com/sitemap.xml`)
- [ ] Monitor weekly after deploying new content
- [ ] Check for indexing errors, coverage issues

---

## Part D: Westlaw/Legal Verification Needed (Session 12)

These items require access to Westlaw or Microjuris to verify:

### Case Citation Verification
- [ ] **Gil Ensenat v. Marini Roman** — Year on site is 2009; may be 2006 (167 D.P.R. 553). Holding may be about prenuptial nullity, not trust/community property as stated. Appears in email welcome sequence, Articles 1, 5, 6.
- [ ] **Rodriguez Toro v. Diaz Lopez** — Year should be 2020, not 2021. Appears in Articles 5, 10, 13 and resources.
- [ ] **Fideicomiso El Puente GNR (2024)** — Unverified TCA case
- [ ] **Sucesion Diaz Marquez v. Banco Popular (2019)** — Unverified TCA case
- [ ] **Firstbank v. Ramallo (2025)** — Unverified TCA case
- [ ] **Valentin Perez (2022)** — Unverified TCA case

### Blog Posts Needing Real Case Holdings
- [ ] Trust Property Disputes - Summaries.md — 8 cases need real holdings
- [ ] Breach of Fiduciary Duty - Summaries.md — 8 cases need real holdings
- [ ] Procedural Beneficiary & Liquidation - Summaries.md — 6 cases need real holdings

### Legislative Monitoring
- [ ] **SB 773** — Check if the bill to introduce statutory revocable trusts passed the PR House since January 2026
- [ ] **HB 505 / FOMB** — Monitor whether Fiscal Oversight Board has approved Act 38-2026

---

## Part E: Known Remaining Issues (Low Priority)

1. ~~Source articles contain `[VERIFY]`/`[EXPAND]` tags~~ — **RESOLVED Session 9**
2. ~~Placeholder contact info in Articles 10/13~~ — **RESOLVED Session 9**
3. **Mixed URL patterns** — Original resource pages use flat paths (`/resources-faq`) while newer ones use nested (`/resources/slug`). Functionally fine but architecturally inconsistent.
4. ~~Case law posts had mismatched CTAs~~ — **RESOLVED Session 9**
5. **Escaped parentheses** — `\(1\)` in several case posts may render as literal backslashes in some markdown processors. Test when publishing to Squarespace.
6. ~~Article series gap (Part 2 missing)~~ — **RESOLVED Session 9**
7. ~~183-day presence test incomplete disclosures~~ — **RESOLVED Session 13**: All mentions now clarify all three IRC §937 tests required.
8. ~~Decanting contradiction in Article 10~~ — **RESOLVED Session 12**
9. ~~Federal estate tax exemption outdated ($13.61M)~~ — **RESOLVED Session 12**: Updated to $15M (OBBBA)
10. ~~"All PR trusts are irrevocable" in email sequence~~ — **RESOLVED Session 12**
11. ~~Wills witness requirement outdated~~ — **RESOLVED Session 12**

---

## Quick Reference: Source Files → GitHub Repo

| Working File (source) | GitHub Repo File |
|-----------------------|------------------|
| `seo-fixes.html` | `js/seo-fixes.js` + `css/seo-fixes.css` |
| `homepage-services-redesign.html` | `js/homepage-services.js` + `css/homepage-services.css` |
| `images-injection.html` | `js/images-injection.js` + `css/images-injection.css` |
| `resources-fix.html` | `js/resources-fix.js` + `css/resources-fix.css` |
| `blog-deploy-clean.html` | `js/blog-dashboard.js` + `css/blog-dashboard.css` |
| `articles-inject.html` | `js/articles-inject.js` + `css/articles-inject.css` |
| `breadcrumb-schema.html` | `js/breadcrumb-schema.js` + `css/breadcrumb-schema.css` |
| `conversion-booster.html` | `js/conversion-booster.js` + `css/conversion-booster.css` |
| `email-signup-form.html` | `js/email-signup.js` + `css/email-signup.css` |
| `gtm-conversion-tracking.html` | `js/gtm-tracking.js` (no CSS) |
| `legal-content-fixes.html` | `js/legal-content-fixes.js` (no CSS) |
| Blog posts (`.md` files) | Publish manually to Squarespace blog |

> **Important:** When editing source `.html` files, you must also extract the JS and CSS to the corresponding repo files, then push to GitHub. See `SETUP-GUIDE.md` for details.
