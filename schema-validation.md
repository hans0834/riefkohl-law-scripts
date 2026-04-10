# Schema Validation Results — riefkohllaw.com

**Date:** 2026-04-10
**Script:** `js/schema-markup.js` v1.0
**Validation method:** Structural analysis against schema.org specifications and Google Rich Results requirements

---

## A. Enhanced Organization Schema (Global)

**Type:** `["Attorney", "LegalService"]`
**Scope:** Every page

| Check | Status | Notes |
|-------|--------|-------|
| Valid `@context` | PASS | `https://schema.org` |
| Valid `@type` array | PASS | Both `Attorney` and `LegalService` are valid schema.org types |
| `@id` present | PASS | `https://www.riefkohllaw.com/#firm` — enables cross-references |
| `name` present | PASS | "Riefkohl Law" |
| `legalName` present | PASS | "Riefkohl LLC" |
| `url` is canonical | PASS | `https://www.riefkohllaw.com` |
| `telephone` format | PASS | `+1-787-236-1657` (E.164 compatible) |
| `email` present | PASS | `hans.riefkohl@riefkohllaw.com` |
| `address` valid PostalAddress | PASS | All required fields present |
| `geo` valid GeoCoordinates | PASS | lat/lng for San Juan |
| `areaServed` valid | PASS | Array of State (Puerto Rico) + Country (United States) |
| `knowsAbout` present | PASS | 10 topics covering all practice areas |
| `sameAs` populated | PASS | LinkedIn URL included |
| `openingHoursSpecification` valid | PASS | Mon–Fri 09:00–17:00 |
| `founder` Person with `@id` | PASS | Cross-referenceable `/#attorney` |
| `founder.hasCredential` present | PASS | 3 bar admissions (PR, DC, Federal) |
| `founder.alumniOf` present | PASS | 2 educational institutions |
| `hasOfferCatalog` valid | PASS | 5 services with URLs |
| `potentialAction` valid | PASS | ReserveAction with EntryPoint |
| Idempotency check | PASS | Checks for existing `legalName === 'Riefkohl LLC'` before injecting |

**Google Rich Results eligibility:** Attorney/LegalService with full address qualifies for Knowledge Panel and local business rich results.

---

## B. Practice-Area LegalService Schemas

**Type:** `LegalService`
**Scope:** 5 practice area pages

| Page | serviceType | Status | Notes |
|------|------------|--------|-------|
| `/act-60-tax-incentives` | Tax Incentive Advisory | PASS | Description references Act 60, Chapters 2/3, IRS |
| `/puerto-rico-trusts` | Trust Formation & Administration | PASS | References Law 219-2012, ILIT, SLAT |
| `/estate-planning` | Estate Planning | PASS | References legítima, probate, pour-over wills |
| `/business-formation` | Business Formation | PASS | References LLC, Act 60 structuring |
| `/government-contracts` | Government Contracts Advisory | PASS | References bid protests, procurement |

| Validation Check | Status | Notes |
|-----------------|--------|-------|
| Each has unique `@id` | PASS | `{SITE_URL}{PATH}#service` pattern |
| `provider` references org `@id` | PASS | Links to `/#firm` |
| `url` uses canonical domain | PASS | All use `https://www.riefkohllaw.com` |
| `availableChannel` present | PASS | Includes ServiceChannel with phone + languages |
| No injection on non-practice pages | PASS | /services, /about, /blog, etc. correctly excluded |
| Idempotency check | PASS | Checks for existing `serviceType` match |

**Google Rich Results eligibility:** LegalService with `serviceType` and `provider` supports service-specific Knowledge Panel entries.

---

## C. Article Schema (Blog Posts + Resource Articles)

**Type:** `BlogPosting` (blog) or `Article` (resources)
**Scope:** `/blog/*` posts (excluding category/tag pages) and `/resources/*` article pages

| Validation Check | Status | Notes |
|-----------------|--------|-------|
| Correct `@type` discrimination | PASS | `BlogPosting` for `/blog/*`, `Article` for `/resources/*` |
| Category/tag pages excluded | PASS | Regex excludes `/blog/category/` and `/blog/tag/` |
| `headline` extraction | PASS | Falls back: og:title → title tag → H1 |
| `author` Person with `@id` | PASS | References `/#attorney` |
| `publisher` Organization with `@id` | PASS | References `/#firm` |
| `mainEntityOfPage` present | PASS | WebPage with canonical URL |
| `inLanguage` detection | PASS | Detects Spanish via path containing `espanol` or `recursos-` |
| `datePublished` extraction | PASS | Checks article:published_time, then time[datetime] elements |
| `image` extraction | PASS | Uses og:image when available |
| `url` canonical | PASS | Full HTTPS URL |
| Missing dates handled gracefully | PASS | Omits datePublished/dateModified if not found (no guessing) |
| Idempotency check | PASS | Checks for existing `Article` or `BlogPosting` types |

**Google Rich Results eligibility:** Article schema with headline, author, publisher, and datePublished enables Article rich results in search.

**Note:** datePublished depends on Squarespace providing `<meta property="article:published_time">` or a `<time>` element. If neither exists, the schema omits the date rather than guessing — this is correct behavior but may reduce rich result eligibility.

---

## D. Dynamic FAQ Extraction

**Type:** `FAQPage`
**Scope:** `/act-60-resource-center`, `/resources-faq`, `/recursos-preguntas-frecuentes`

| Validation Check | Status | Notes |
|-----------------|--------|-------|
| Scoped to designated pages only | PASS | Only runs on 3 specified paths |
| Strategy 1: Accordion blocks | PASS | Targets `.accordion-item`, Squarespace accordion selectors |
| Strategy 2: H3/H4 Q&A patterns | PASS | Detects questions by `?` suffix or question-word prefix |
| Bilingual question detection | PASS | Recognizes Spanish question words (qué, cómo, cuándo, etc.) |
| Minimum 2 Q&A pairs required | PASS | Won't inject with 0–1 pairs |
| Maximum 10 FAQs | PASS | Caps at 10 to avoid oversized schema |
| Answer text minimum length | PASS | Requires > 10 characters |
| Idempotency check | PASS | Checks for existing `FAQPage` type |
| `mainEntity` structure valid | PASS | Array of Question objects with acceptedAnswer |

**Google Rich Results eligibility:** FAQPage schema with Question/Answer pairs enables FAQ rich results (expandable Q&A in search). Requires minimum 2 Q&A pairs (Google requirement: at least 1, we require 2 for quality).

---

## E. Cross-Cutting Validation

| Check | Status | Notes |
|-------|--------|-------|
| Script is idempotent | PASS | All 4 schema types check before injecting |
| No duplicate WebSite schema | PASS | Script does not inject WebSite (handled by seo-fixes.js) |
| `@id` cross-references consistent | PASS | `/#firm` and `/#attorney` used consistently across all schemas |
| Script size | PASS | ~8.5 KB unminified, well under 15 KB limit |
| console.log version tag | PASS | `Riefkohl Law: Schema markup loaded v1.0` |
| DOMContentLoaded handling | PASS | Handles both loading and already-loaded states |
| No external dependencies | PASS | Pure vanilla JS |
| Canonical URLs throughout | PASS | All URLs use `https://www.riefkohllaw.com` prefix |

---

## Pages Covered Summary

| Page Type | Count | Schema Types Injected |
|-----------|-------|-----------------------|
| All pages (global) | ~100+ | Enhanced Organization (Attorney + LegalService) |
| Practice area pages | 5 | + Practice-area LegalService |
| Blog posts | ~50+ | + BlogPosting |
| Resource articles | ~30+ | + Article |
| FAQ-scannable pages | 3 | + FAQPage (dynamic extraction) |

---

## Known Limitations

1. **Dynamic FAQ extraction** depends on DOM structure at execution time. If Squarespace changes its accordion markup, Strategy 1 may need updating.
2. **Spanish article detection** uses path heuristics (`espanol`, `recursos-`). Articles at `/resources/fideicomiso-*` are not detected as Spanish by path alone — they would need explicit `lang` attributes or meta tags.
3. **datePublished** for blog posts requires Squarespace to emit a `<time>` element or `article:published_time` meta tag. Injected posts (via blog-dashboard.js or articles-inject.js) may not have these.

---

## Address Discrepancy Flag

**All schema uses:** 273 Ponce de León Ave., San Juan, PR 00917
**Contact page may show:** 151 Calle de San Francisco, Suite 200 PMB 1800, San Juan, PR 00901

**Action required for Hans:** Verify which address is current and update the contact page if it shows the old address. Schema consistency is important for Google's local search algorithms.
