# Riefkohl Law SEO Implementation — Multi-Session Roadmap

## Session Overview

| Session | Focus | Status | Est. Duration |
|---------|-------|--------|---------------|
| Session 1 | Audit + Critical code fixes + Strategy docs | COMPLETE | Done |
| Session 2 | Deploy SEO fixes + Squarespace content edits | COMPLETE | Done |
| Session 3 | Blog content creation (trusts + Act 60 posts) | COMPLETE | Done |
| Session 4 | Spanish content + lead magnet creation | COMPLETE | Done |
| Session 5 | Publish all blog posts + verification + remaining items | COMPLETE | Done |
| Session 6 | Trust Law article series integration into resources | COMPLETE | Done |
| Session 7 | Case law blog posts (25 posts) + SEO optimization | COMPLETE | Done |
| Session 8 | Code review and content/bug fixes | COMPLETE | Done |
| Session 9 | Content expansion, translations, deployment readiness | COMPLETE | Done |
| Session 10 | Performance, accessibility, SEO, email sequence | COMPLETE | Done |

---

## Session 1 — COMPLETED

### What was accomplished:
1. Full SEO audit (47,000+ word report) saved to `riefkohl-law-seo-audit-2026-03-13.md`
2. SEO fix script created (`seo-fixes.html`) that:
   - Dynamically sets unique H1 tags for every page (English + Spanish)
   - Sets unique meta descriptions for every page
   - Adds self-referencing canonical tags
   - Injects FAQPage schema on /puerto-rico-trusts, /estate-planning, /act-60-tax-incentives
   - Fixes staging URL leaks (replaces octagon-parakeet links with production domain)
   - Adds alt text to images missing it
3. Google Business Profile setup document (`google-business-profile-setup.md`)
4. Legal directory listings content (`directory-listings-content.md`)
5. Blog content strategy with 20+ article outlines (`blog-content-strategy.md`)
6. Resources page already has content via `resources-fix.html` (FAQ, glossary, guides)

### Files created this session:
- `riefkohl-law-seo-audit-2026-03-13.md` — Full audit report
- `seo-fixes.html` — Code injection script for SEO fixes
- `google-business-profile-setup.md` — GBP setup guide
- `directory-listings-content.md` — Directory listing content
- `blog-content-strategy.md` — Content calendar and post outlines
- `implementation-roadmap.md` — This file

### Pre-existing files in the project:
- `blog-deploy-clean.html` — Blog dashboard code (deployed via Squarespace code injection)
- `blog-dashboard.html` — Source version of blog dashboard
- `resources-fix.html` — Resources page content injection (FAQ, glossary, etc.)

---

## Session 2 — COMPLETED

### What was accomplished:
1. Deployed seo-fixes.html to Squarespace Code Injection header (appended after existing scripts)
2. Fixed staging URL on /puerto-rico-trusts (changed octagon-parakeet link to /contact in Squarespace editor)
3. Fixed contact page meta description (Guaynabo → San Juan) in existing code injection script
4. Set unique SEO title tags and meta descriptions in Squarespace page settings for all 9 priority pages:
   - Home (site-wide), Services, About, Contact, Blog, Government Contracts, Act 60 Tax Incentives, Business Formation, Puerto Rico Trusts, Estate Planning
5. Verified all fixes on live site: unique H1s, meta descriptions, canonical tags, FAQ schema on 3 pages, zero staging URL leaks
6. Provided owner instructions for Google Business Profile and directory listings

### Original handoff memo (for reference):

**Context:** The seo-fixes.html script needs to be deployed via Squarespace code injection. It should be added to the HEADER code injection (Settings > Advanced > Code Injection > Header) AFTER the existing blog-deploy-clean.html and resources-fix.html scripts. Order matters — seo-fixes.html should run after the blog dashboard renders so it can override the H1.

**Tasks:**

1. **Deploy seo-fixes.html to Squarespace**
   - Go to Squarespace > Settings > Advanced > Code Injection > Header
   - Add the contents of seo-fixes.html AFTER existing code
   - Save and verify on live site

2. **Fix the staging URL manually in Squarespace editor**
   - Go to Pages > /puerto-rico-trusts in Squarespace
   - Find the "contact page" link near the bottom (in the "Schedule Your Trust Planning Consultation" section)
   - Change href from `https://octagon-parakeet-dn35.squarespace.com/contact` to `/contact`
   - This is a belt-and-suspenders fix (seo-fixes.html also catches it, but fixing in content is better)

3. **Fix the contact page meta description in Squarespace**
   - Go to Pages > /contact > Settings (gear icon) > SEO
   - Change the SEO description from "Contact Riefkohl Law in Guaynabo..." to:
   - "Contact Riefkohl Law in San Juan, PR. Call (787) 236-1657 or book a free strategy call for estate planning, trusts, and business law."

4. **Set unique meta descriptions in Squarespace page settings**
   - For each page, go to Page Settings > SEO tab
   - Copy the meta description from the SEO config in seo-fixes.html
   - This gives Squarespace the native meta desc (belt-and-suspenders with the JS fix)
   - Priority pages: /, /services, /about, /contact, /puerto-rico-trusts, /estate-planning, /act-60-tax-incentives, /business-formation, /government-contracts

5. **Shorten title tags in Squarespace page settings**
   - These pages have title tags over 60 chars — shorten them:
   - /services: "Legal Services & Pricing | Riefkohl Law PR"
   - /about: "About Hans Riefkohl | Puerto Rico Attorney"
   - /blog: "Legal Blog | Riefkohl Law Puerto Rico"
   - /act-60-tax-incentives: "Act 60 Tax Incentives | Riefkohl Law PR"
   - /business-formation: "Business Formation Attorney | Riefkohl Law PR"
   - /government-contracts: "Government Contracts Attorney | Riefkohl Law PR"

6. **Verify all fixes are working**
   - Check each page in browser: right-click > View Source > search for the H1, meta description, canonical, and FAQ schema
   - Use Google's Rich Results Test (https://search.google.com/test/rich-results) to verify FAQ schema on /puerto-rico-trusts, /estate-planning, /act-60-tax-incentives
   - Use Google Search Console URL Inspection to check how Google renders key pages

7. **Claim Google Business Profile**
   - Follow instructions in `google-business-profile-setup.md`
   - This is an owner task (requires Google account and verification)

8. **Begin directory listings**
   - Start with Avvo and Justia (highest impact)
   - Follow `directory-listings-content.md` for content

---

## Session 3 — COMPLETED

### What was accomplished:
1. Wrote 5 full English blog posts (1,700-2,000 words each) with SEO metadata, internal links, and CTAs
2. Wrote 1 pillar content piece (~3,800 words) on Puerto Rico trusts under Law 219-2012
3. Checked existing site content (Act 60 Resource Center, resource subpages) to avoid duplication
4. Rewrote IRS Scrutiny post to take a 2026-specific angle, linking to existing resource pages instead of duplicating

### Files created (all in `blog-posts/`):
- `01-act60-estate-planning-mistakes.md` — 5 Critical Mistakes Act 60 Holders Make with Estate Planning (~1,800 words)
- `02-trust-vs-will-puerto-rico.md` — Puerto Rico Trust vs. Will: Which Do You Need? (~1,700 words)
- `03-irs-scrutiny-act60.md` — IRS Scrutiny of Act 60 Holders: What You Need to Know in 2026 (~1,800 words)
- `04-forced-heirship-estate-plan.md` — How Forced Heirship Affects Your Estate Plan in Puerto Rico (~2,000 words)
- `05-asset-protection-irrevocable-trusts.md` — Puerto Rico Asset Protection: How Irrevocable Trusts Shield Your Wealth (~2,000 words)
- `06-pillar-complete-guide-puerto-rico-trusts.md` — The Complete Guide to Puerto Rico Trusts Under Law 219-2012 (~3,800 words)

### Notes:
- Each file includes SEO metadata block (title tag, meta description, target keyword, categories/tags, internal links)
- Posts reference specific legal citations (Law 219-2012, Ley 55-2020, IRC Section 937, etc.)
- Post 3 was rewritten to avoid duplicating the Act 60 Resource Center content (residency tests, audit triggers, income sourcing are already covered there)
- All posts need to be published to Squarespace blog — moved to Session 5

---

## Session 4 — COMPLETED

### What was accomplished:
1. Wrote 4 full Spanish blog posts (1,800-2,500 words each) with SEO metadata, internal links, and CTAs
2. Created 2 lead magnet content outlines (ready for PDF design)
3. Created email signup form code with 3 variants (inline, checklist, footer) and setup instructions

### Files created:
- `blog-posts/07-fideicomiso-irrevocable-puerto-rico.md` — Fideicomiso Irrevocable en Puerto Rico (~2,400 words)
- `blog-posts/08-planificacion-sucesoral-puerto-rico.md` — Planificación Sucesoral en Puerto Rico (~2,200 words)
- `blog-posts/09-ley-60-guia-inversionistas.md` — Ley 60: Guía para Inversionistas (~2,300 words)
- `blog-posts/10-declaratoria-de-herederos-puerto-rico.md` — Declaratoria de Herederos en Puerto Rico (~2,100 words)
- `lead-magnet-act60-trusts.md` — PDF outline: Act 60 + trusts guide
- `lead-magnet-estate-planning-checklist.md` — PDF outline: estate planning checklist
- `email-signup-form.html` — Email capture form code (3 variants) with provider setup instructions

---

## Session 5 — COMPLETED

### What was accomplished:
1. Created comprehensive blog publishing guide with metadata for all 10 posts and recommended 3-week schedule
2. Created BreadcrumbList schema code for all site pages with auto-detection for blog posts
3. Wrote final status report with complete file inventory, issue resolution status, and owner action items

### Files created:
- `blog-publishing-guide.md` — Step-by-step guide for publishing all 10 posts to Squarespace
- `breadcrumb-schema.html` — BreadcrumbList structured data (ready for Code Injection Header)
- `final-status-report.md` — Complete project status report

### Notes:
- Blog posts need to be manually published to Squarespace by the owner (no browser automation was available)
- BreadcrumbList schema should be appended to the Code Injection Header after existing scripts
- Owner action items (GBP, directories, reviews, email provider setup) documented in final report

---

## Session 6 — COMPLETED

### What was accomplished:
1. Analyzed all 14 articles in the `Articles/` folder (~121,500 words total) and audited for redundancy against existing content
2. Created `articles-inject.html` (3,198 lines, ~380KB) — separate code injection file containing all 14 Trust Law articles, article hub, series navigation, Article schema, and styling
3. Updated `resources-fix.html` with cross-links from 5 existing resource pages to new articles
4. Updated `seo-fixes.html` with 14 new SEO entries (unique H1 + meta description per article)
5. Added Article schema (schema.org/Article) markup on all 14 article pages

### Files created/modified:
- `articles-inject.html` — **NEW** — 14 articles + hub page + series navigation + Article schema
- `resources-fix.html` — **UPDATED** — 5 cross-link additions to new articles
- `seo-fixes.html` — **UPDATED** — 14 new SEO entries
- `articles-integration-plan.md` — **NEW** — Implementation plan
- `session-6-handoff-memo.md` — **NEW** — Deployment instructions and decisions

### Key decisions:
- Separate injection file rather than merging into `resources-fix.html` (maintainability — resources-fix.html already 80KB)
- Kept existing resource pages as quick-reference introductions; articles serve as deep-dive companions
- All 14 articles included (despite 5 having surface-level overlap, each adds 5-50x more depth)
- Article hub placed prominently on `/resources` page before existing extra-cards section
- Series navigation at bottom of every article for cross-engagement

### Notes:
- Owner must create 14 blank Squarespace pages at `/resources/[slug]` URLs before deploying
- `articles-inject.html` goes in Code Injection Header after existing scripts
- Updated `resources-fix.html` and `seo-fixes.html` must be redeployed

---

## Session 7 — COMPLETED

### What was accomplished:
1. Added 25 case law blog posts from `blog-posts/March 15 2026/` — 9 category summary posts (pillar content) + 16 individual case analyses
2. SEO-optimized all 25 posts with metadata blocks (title tag, meta description, slug, keywords, categories, tags), keyword-rich intros, CTAs linking to /calendly, and internal cross-links
3. Updated `seo-fixes.html` with 25 new entries (unique H1 + meta description per blog post URL)
4. Established consistent category/tag taxonomy across all posts (Trust Law, Case Analysis, Estate Planning, Fiduciary Duty, Asset Protection, etc.)

### Files created/modified:
- 25 blog post files in `blog-posts/March 15 2026/` — **UPDATED** — SEO metadata, intros, CTAs added
- `seo-fixes.html` — **UPDATED** — 25 new SEO entries
- `session-7-plan.md` — **NEW** — Implementation plan
- `session-7-handoff-memo.md` — **NEW** — Deployment instructions and decisions

### Key decisions:
- Case analyses placed in blog (not resources section) since they are commentary, not educational articles like the Trust Law Series
- Category summaries serve as pillar content creating topic cluster authority
- Individual cases as standalone posts for long-tail keyword targeting
- Recommended staggered publishing schedule (3-6 weeks) for better SEO indexing

### Notes:
- Owner must deploy 25 blog posts to Squarespace and redeploy seo-fixes.html
- Recommended publishing order: category summaries first (pillar content), then individual cases 2-3 per week

---

## Session 8 — COMPLETED

### What was accomplished:
1. Fixed ~30 broken cross-reference URLs in `articles-inject.html` (internal links between articles were pointing to wrong slugs)
2. Fixed broken HTML nesting in `articles-inject.html` hub page (malformed markup preventing proper rendering)
3. Fixed templated/boilerplate content in 16 individual case law blog posts (placeholder text, generic language replaced with case-specific content)
4. Fixed factual errors across articles and blog posts: estate tax exemption amounts, witness requirements for wills, libre disposicion fraction
5. Fixed back-to-top button bug in `blog-deploy-clean.html`
6. Removed working-document text from `commonwealth-v-valenti.md`

### Files modified:
- `articles-inject.html` — **FIXED** — ~30 broken cross-reference URLs + hub page HTML nesting
- `blog-deploy-clean.html` — **FIXED** — Back-to-top button bug
- `commonwealth-v-valenti.md` — **FIXED** — Removed working-document text
- 16 individual case law blog posts — **FIXED** — Templated/boilerplate content replaced with case-specific details
- Multiple articles/posts — **FIXED** — Factual corrections (estate tax exemption, witness requirements, libre disposicion)

### Notes:
- This was a quality assurance session — no new content created, focused on fixing errors in Sessions 6-7 output
- All fixes should be included when deploying `articles-inject.html`, `blog-deploy-clean.html`, and blog posts

---

## Ongoing (Beyond Sessions) — Owner Tasks

These require the site owner to handle personally:

- [ ] Claim and verify Google Business Profile (requires Google account)
- [ ] Create Avvo, Justia, FindLaw, Martindale profiles (requires bar number, credentials)
- [ ] Request Google reviews from past clients
- [ ] Publish 10 blog posts from Sessions 3-4 to Squarespace
- [ ] Create 14 blank Squarespace pages for Trust Law articles and deploy `articles-inject.html`
- [ ] Deploy 25 case law blog posts from Session 7 to Squarespace
- [ ] Redeploy updated `seo-fixes.html`, `resources-fix.html`, and `blog-deploy-clean.html`
- [ ] Monitor Google Search Console weekly for crawl errors and ranking changes
- [ ] Request peer endorsements on Avvo and Martindale
- [ ] Consider adding a chat widget (Intercom, Drift, or similar)
- [ ] Plan and publish 8-10 blog posts per month per content strategy

---

## Session 9 — COMPLETED

### What was accomplished:
1. Verified no editorial tags (`[VERIFY]`, `[EXPAND]`, `REVIEWER NOTES`) or placeholder contact info leaked into deployed files
2. Customized CTAs for all 16 non-PR case law posts (grouped by topic: trust/estate, family law, employment/property/litigation)
3. Wrote Article 2: "Types of Trusts Available Under Puerto Rico Law" — fills the series gap between Part 1 and Part 3
4. Fully integrated Article 2 into `articles-inject.html` (new entry, SERIES_NAV, hub card, byline updates, link fixes)
5. Added Article 2 SEO entry to `seo-fixes.html` (now 58 entries total)
6. Translated all 9 case law category summary posts to Spanish (professional legal Spanish for PR audience)
7. Fixed escaped parentheses (`\(1\)`) in 6 case law posts
8. Created consolidated deployment checklist (`deployment-checklist.md`) with all pending owner tasks
9. Completed performance audit: 574KB total injection payload, all path-conditional, medium impact
10. Completed accessibility audit: blog dashboard good (ARIA), articles-inject needs ARIA landmarks

### Files created:
- `Articles/Article_02_Types_of_Trusts.md`
- `blog-posts/March 15 2026/*-es.md` (9 Spanish translation files)
- `deployment-checklist.md`
- `session-9-handoff-memo.md`

### Files modified:
- `articles-inject.html` (Article 2, SERIES_NAV, bylines, hub)
- `seo-fixes.html` (Article 2 SEO entry)
- 16 individual case law posts (CTA customization)
- 6 case law posts (escaped parentheses fix)
- `implementation-roadmap.md` (this file)

### See:
- `session-9-handoff-memo.md` for full details
- `deployment-checklist.md` for all pending owner tasks

---

## Session 10 — COMPLETED

### Focus: Performance optimization, accessibility, SEO expansion, email marketing

### Accomplishments:
1. Implemented accessibility fixes in `articles-inject.html`: `role="main"`, `role="navigation"`, `aria-label`, `aria-current="page"` on series nav, `<div>` → `<nav>` semantic element
2. Added `focus-visible` CSS for back-to-top button in `blog-deploy-clean.html`
3. Replaced setTimeout retry pattern with MutationObserver in `articles-inject.html` and `resources-fix.html` (eliminates ~20 unnecessary async calls)
4. Added 9 Spanish blog post SEO entries to `seo-fixes.html` (now 67 total entries)
5. Added hreflang tags (EN/ES/x-default) for 9 bilingual blog post pairs via `seo-fixes.html`
6. Created 5-email automated welcome sequence (`email-welcome-sequence.md`)

### Files created:
- `email-welcome-sequence.md`
- `session-10-handoff-memo.md`

### Files modified:
- `articles-inject.html` (ARIA accessibility, MutationObserver)
- `blog-deploy-clean.html` (focus-visible styles)
- `resources-fix.html` (MutationObserver)
- `seo-fixes.html` (9 Spanish SEO entries, hreflang tags)
- `implementation-roadmap.md` (this file)

### See:
- `session-10-handoff-memo.md` for full details
