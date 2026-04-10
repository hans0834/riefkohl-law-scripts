# Schema Markup Audit — riefkohllaw.com

**Date:** 2026-04-10
**Audited by:** Claude Code (automated)

---

## Summary

The site already has substantial JSON-LD schema coverage via three custom scripts and Squarespace's auto-generated markup. This audit catalogs all existing schema and identifies gaps.

---

## Existing Schema by Source

### 1. Squarespace Auto-Generated (every page)
| Type | Scope | Notes |
|------|-------|-------|
| `WebSite` | Every page | Basic — name, url, image. Uses `http://schema.org` context (outdated). No `SearchAction`. |

### 2. `js/seo-fixes.js`
| Type | Scope | Notes |
|------|-------|-------|
| `Attorney` | Every page (sitewide) | Name, description, url, telephone, email, address, geo, priceRange, openingHours, areaServed, founder (Person), makesOffer, knowsLanguage |
| `FAQPage` | Practice area pages + /services | Hardcoded Q&A pairs: /puerto-rico-trusts (4 Qs), /estate-planning (3 Qs), /act-60-tax-incentives (5 Qs), /business-formation (5 Qs), /government-contracts (5 Qs), /services (6 Qs), /espanol-fideicomisos, /espanol-ley-60 |
| `Person` | /about, /about-us | Hans E. Riefkohl — jobTitle, worksFor, sameAs (LinkedIn), alumniOf (UPR Law, Villanova) |
| `WebSite` | Homepage only | Enhanced with `SearchAction` targeting /blog search, `inLanguage` |

### 3. `js/conversion-booster.js`
| Type | Scope | Notes |
|------|-------|-------|
| `LegalService` | Key pages only (/, /services, /about, /contact, /calendly + Spanish equivalents) | @id, name, alternateName, description, url, telephone, email, address, geo, areaServed, priceRange, openingHours, founder (Person), knowsLanguage, potentialAction (ReserveAction + CommunicateAction), sameAs (empty array) |

### 4. `js/breadcrumb-schema.js`
| Type | Scope | Notes |
|------|-------|-------|
| `BreadcrumbList` | All pages with defined breadcrumb paths | Mapped by URL path. Covers services, resources, blog, about, contact, practice areas, Act 60 subpages, Spanish pages |

---

## Gaps Identified

### A. Missing Schema Types
| Gap | Pages Affected | Impact |
|-----|---------------|--------|
| **No practice-area-specific `LegalService`** | /act-60-tax-incentives, /puerto-rico-trusts, /estate-planning, /business-formation, /government-contracts | Google can't distinguish individual services for rich results |
| **No `Article` schema** | All /blog/* posts and /resources/* articles (~100+ pages) | Blog posts and Trust Law Series articles miss Article rich results |
| **No dynamic FAQ extraction** | /act-60-resource-center (extensive educational content) | Page has Q&A content but no structured FAQPage schema |
| **No `ProfessionalService` detail** | /pricing | Pricing page has no schema tying fees to services |

### B. Data Issues in Existing Schema
| Issue | File | Details |
|-------|------|---------|
| **Wrong email** | `conversion-booster.js` line 96 | Uses `info@riefkohllaw.com` — should be `hans@riefkohllaw.com` |
| **Empty `sameAs`** | `conversion-booster.js` line 151 | `sameAs: []` — should include LinkedIn: `https://www.linkedin.com/in/riefkohl` |
| **Missing `legalName`** | Both Attorney and LegalService schemas | Neither includes `"legalName": "Riefkohl LLC"` |
| **Missing `knowsAbout`** | Both Attorney and LegalService schemas | Not present in either schema block |
| **Duplicate `@type` check is fragile** | `seo-fixes.js` line 1341 | Checks for exact `'Attorney'` or `'LegalService'` but not array types like `["Attorney", "LegalService"]` |
| **Squarespace WebSite duplicate** | Every page | Both Squarespace and seo-fixes.js inject `WebSite` on homepage (2 blocks) |

### C. Missing from Person/Attorney Schema
- No bar admissions (PR, DC, federal courts)
- No prior experience (DLA Piper, LUMA Energy, judicial clerkships)
- No `hasCredential` property
- Founder `Person` object is minimal (name + jobTitle only)

---

## Address Discrepancy

**Canonical (used in all schema):** 273 Ponce de León Ave., San Juan, PR 00917
**Contact page may show:** 151 Calle de San Francisco, Suite 200 PMB 1800, San Juan, PR 00901

**Action required:** Hans should verify which address is current and update the contact page if needed. All schema uses 273 Ponce de León Ave.

---

## Recommendation

Create `js/schema-markup.js` to inject:
1. Enhanced Organization schema with `legalName`, `sameAs`, `knowsAbout` (only if not already present)
2. Practice-area-specific `LegalService` schemas on each service page
3. `Article` schema on blog posts and resource articles
4. Dynamic FAQ extraction helper for /act-60-resource-center

The script should be additive — it checks for existing schema types before injecting to avoid duplicates.
