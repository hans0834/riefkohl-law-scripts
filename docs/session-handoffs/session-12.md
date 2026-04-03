# Session 12 Handoff Memo — Liability Audit & Critical Fixes

**Date:** 2026-03-19

## Completed This Session

1. **Deployed updated local files to GitHub** — legal-content-fixes.js, articles-inject.js, resources-fix.js, seo-fixes.js, lead magnets, email sequence, directory listings
2. **Verified 400+ statements** — critical errors fixed, non-critical flagged in liability audit spreadsheet (`liability-audit-database.xlsx`)
3. **Marked 3 blog post files as DO NOT PUBLISH:**
   - `blog-posts/March 15 2026/Trust Property Disputes - Summaries.md` — 8/8 cases placeholder templates
   - `blog-posts/March 15 2026/Breach of Fiduciary Duty - Summaries.md` — 8/11 cases placeholder text
   - `blog-posts/March 15 2026/Procedural Beneficiary & Liquidation - Summaries.md` — 6/9 cases placeholder text
4. **Fixed decanting contradiction in Article 10** — removed false claim that Act 219-2012 "introduced statutory decanting powers"; corrected in both `Article_10_Landmark_Trust_Cases.md` and `articles-inject.html`
5. **Added Fix #13 to legal-content-fixes.html** — `fixAct60ExemptionPercentages()` corrects municipal tax exemption from 75%→50% and property tax from 60%→70% on Act 60 pages. Deployed to GitHub.

### Other Fixes Applied
- **Federal estate tax exemption**: $13.61M → $15M (permanent under OBBBA) in lead magnets and resources-fix.html
- **Email welcome sequence**: Fixed "all PR trusts are irrevocable" to include Act 60 §45147(b) revocable trust exception
- **Wills witness requirement**: Removed outdated witness language (no longer required under Art. 1644, Ley 55-2020) in resources-fix.html
- **Experience claim**: "8+ years" → "over a decade" in seo-fixes.html and directory-listings-content.md
- **"$7M sunset" language**: Removed from resources-fix.html (OBBBA made exemption permanent)

## Key File Created
- **`liability-audit-database.xlsx`** — Spreadsheet with 441+ statements catalogued by source, category, severity, jurisdiction, language, and verification status

## Remaining Items (Require Owner Action)

### Westlaw/Microjuris Verification Needed
- **Gil Ensenat v. Marini Roman** — Year on site is 2009; appears to be 2006 (167 D.P.R. 553). Holding may be about prenuptial nullity, not trust/community property as stated. Appears in email welcome sequence, Articles 1, 5, 6.
- **Rodriguez Toro v. Diaz Lopez** — Year should be 2020, not 2021. Appears in Articles 5, 10, 13 and resources.
- **4 unverified TCA cases:**
  - Fideicomiso El Puente GNR (2024)
  - Sucesion Diaz Marquez v. Banco Popular (2019)
  - Firstbank v. Ramallo (2025)
  - Valentin Perez (2022)

### Blog Posts Needing Actual Case Holdings
- Trust Property Disputes — 8 cases need real holdings
- Breach of Fiduciary Duty — 8 cases need real holdings
- Procedural Beneficiary & Liquidation — 6 cases need real holdings

### Legislative Monitoring
- **SB 773** — Check if the bill to introduce statutory revocable trusts passed the PR House since January 2026
- **HB 505 / FOMB** — Monitor whether Fiscal Oversight Board has approved Act 38-2026

### Content Clarification
- **183-day presence test** — Site should clarify that 183 days alone is insufficient; all three IRC §937 tests must be met

## Deployment Notes
All fixes are deployed to GitHub (`hans0834/riefkohl-law-scripts`, branch `main`). The Squarespace Code Injection Header loads scripts from `https://hans0834.github.io/riefkohl-law-scripts/js/`. No additional deployment steps needed for the fixes made this session — they are live.
