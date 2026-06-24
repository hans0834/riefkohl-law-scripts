# Migration Deploy Runbook — Native HTML for `/resources/*`

**Goal:** move each page's article body out of client-side JS and into a **native Squarespace Code block** so it ships in raw HTML and Google can index it. This is the firm's #1 SEO lever — 29 high-value pages currently render only ~80 words of raw HTML (everything else is JS-injected and crawler-invisible).

**Status as of this runbook:** 3 pages already migrated (`complete-guide-puerto-rico-trusts`, `forced-heirship-estate-plan`, `trust-vs-will-puerto-rico`). **29 pending**, listed below in priority order (highest SEO/revenue impact first; ★ = GSC-confirmed *Crawled – currently not indexed*, i.e. Google has already tried and bounced for thin content — fix these first).

All infrastructure is already deployed and live: the editor-skip guard (script stays out of the editor), the no-duplication guard (live JS bails when it sees `.rl-sub`), and the `:has(.rl-sub)` CSS that makes the native block render full-width. **Pasting the content is the only remaining step.**

Pre-generated, deploy-ready HTML for every page lives in `migration/native-html/{slug}.html` and is served at `https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/{slug}.html`.

---

## One-time setup (do once at the start of the session)

1. Sign in to Squarespace admin (the editing domain, e.g. `octagon-parakeet-dn35.squarespace.com`). Keep this tab authenticated.
2. Open your browser DevTools **Console** — you'll paste a one-line snippet there for each page.

> **Why the console snippet?** Squarespace's Code-block editor is a CodeMirror 6 contenteditable. Clipboard paste and form-fill do **not** work reliably in it; `document.execCommand('insertText')` does. The snippet fetches the pre-generated HTML and inserts it in one shot.

## Per-page steps (repeat for each row in the table)

1. Go to `https://riefkohllaw.com/resources/{slug}` and click **Edit** → the page is empty, showing **ADD SECTION**.
2. **ADD SECTION → Add Blank** → click the new section → **ADD BLOCK** → search `code` → choose **Code**. (It inserts `<p>Hello, World!</p>`; HTML mode, *Display Source* OFF — leave both as-is.)
3. **Double-click the Code block** to open the CM6 editor.
4. Paste the page's **Console snippet** (from the table) into DevTools Console and press Enter. It should print `len=…` (a few thousand). The content appears in the block.
5. Click outside the dialog to apply → click **SAVE**.
6. Move to the next page. (Batch-verify all of them at the end — see *Verification*.)

If a snippet prints `len=…` but nothing appears: make sure the Code block's CM6 editor is focused (step 3) before running it, then re-run.

---

## Pending pages — priority order

| # | ★ | Page (slug) | Category | Words | URL to edit |
|--:|:-:|---|---|--:|---|
| 1 | ★ | `asset-protection-trusts-pr` | Estate/Trust (highest revenue) | 4,487 | [/resources/asset-protection-trusts-pr](https://riefkohllaw.com/resources/asset-protection-trusts-pr) |
| 2 | ★ | `ilits-and-slats` | Estate/Trust (highest revenue) | 4,332 | [/resources/ilits-and-slats](https://riefkohllaw.com/resources/ilits-and-slats) |
| 3 | ★ | `fiduciary-duties-trustees` | Estate/Trust (highest revenue) | 4,201 | [/resources/fiduciary-duties-trustees](https://riefkohllaw.com/resources/fiduciary-duties-trustees) |
| 4 | ★ | `landmark-trust-cases` | Estate/Trust (highest revenue) | 3,743 | [/resources/landmark-trust-cases](https://riefkohllaw.com/resources/landmark-trust-cases) |
| 5 |  | `family-trust-pitfalls` | Estate/Trust (highest revenue) | 5,791 | [/resources/family-trust-pitfalls](https://riefkohllaw.com/resources/family-trust-pitfalls) |
| 6 |  | `trust-taxation-act-60` | Estate/Trust (highest revenue) | 4,413 | [/resources/trust-taxation-act-60](https://riefkohllaw.com/resources/trust-taxation-act-60) |
| 7 |  | `modifying-irrevocable-trusts` | Estate/Trust (highest revenue) | 3,550 | [/resources/modifying-irrevocable-trusts](https://riefkohllaw.com/resources/modifying-irrevocable-trusts) |
| 8 |  | `special-needs-trusts-medicaid` | Estate/Trust (highest revenue) | 3,016 | [/resources/special-needs-trusts-medicaid](https://riefkohllaw.com/resources/special-needs-trusts-medicaid) |
| 9 |  | `trust-costs-puerto-rico` | Estate/Trust (highest revenue) | 3,012 | [/resources/trust-costs-puerto-rico](https://riefkohllaw.com/resources/trust-costs-puerto-rico) |
| 10 |  | `avoiding-probate-legitima` | Estate/Trust (highest revenue) | 2,961 | [/resources/avoiding-probate-legitima](https://riefkohllaw.com/resources/avoiding-probate-legitima) |
| 11 |  | `mainland-trust-to-puerto-rico` | Estate/Trust (highest revenue) | 2,846 | [/resources/mainland-trust-to-puerto-rico](https://riefkohllaw.com/resources/mainland-trust-to-puerto-rico) |
| 12 |  | `foreign-trust-trap` | Estate/Trust (highest revenue) | 2,523 | [/resources/foreign-trust-trap](https://riefkohllaw.com/resources/foreign-trust-trap) |
| 13 |  | `what-is-puerto-rico-trust` | Estate/Trust (highest revenue) | 2,306 | [/resources/what-is-puerto-rico-trust](https://riefkohllaw.com/resources/what-is-puerto-rico-trust) |
| 14 |  | `act-60-trust-planning` | Estate/Trust (highest revenue) | 2,007 | [/resources/act-60-trust-planning](https://riefkohllaw.com/resources/act-60-trust-planning) |
| 15 |  | `act-60-estate-planning-mistakes` | Estate/Trust (highest revenue) | 605 | [/resources/act-60-estate-planning-mistakes](https://riefkohllaw.com/resources/act-60-estate-planning-mistakes) |
| 16 |  | `asset-protection-irrevocable-trusts` | Estate/Trust (highest revenue) | 366 | [/resources/asset-protection-irrevocable-trusts](https://riefkohllaw.com/resources/asset-protection-irrevocable-trusts) |
| 17 |  | `fideicomiso-irrevocable-puerto-rico` | Spanish — Estate | 369 | [/resources/fideicomiso-irrevocable-puerto-rico](https://riefkohllaw.com/resources/fideicomiso-irrevocable-puerto-rico) |
| 18 |  | `declaratoria-de-herederos-puerto-rico` | Spanish — Estate | 347 | [/resources/declaratoria-de-herederos-puerto-rico](https://riefkohllaw.com/resources/declaratoria-de-herederos-puerto-rico) |
| 19 |  | `planificacion-sucesoral-puerto-rico` | Spanish — Estate | 307 | [/resources/planificacion-sucesoral-puerto-rico](https://riefkohllaw.com/resources/planificacion-sucesoral-puerto-rico) |
| 20 |  | `bona-fide-residency-puerto-rico` | Act 60 | 2,900 | [/resources/bona-fide-residency-puerto-rico](https://riefkohllaw.com/resources/bona-fide-residency-puerto-rico) |
| 21 |  | `act-38-2026-hb-505` | Act 60 | 1,047 | [/resources/act-38-2026-hb-505](https://riefkohllaw.com/resources/act-38-2026-hb-505) |
| 22 |  | `compliance-certificate-act-52` | Act 60 | 769 | [/resources/compliance-certificate-act-52](https://riefkohllaw.com/resources/compliance-certificate-act-52) |
| 23 |  | `irs-enforcement-act-60` | Act 60 | 763 | [/resources/irs-enforcement-act-60](https://riefkohllaw.com/resources/irs-enforcement-act-60) |
| 24 |  | `why-law-firm-act-60` | Act 60 | 559 | [/resources/why-law-firm-act-60](https://riefkohllaw.com/resources/why-law-firm-act-60) |
| 25 |  | `annual-compliance-calendar` | Act 60 | 511 | [/resources/annual-compliance-calendar](https://riefkohllaw.com/resources/annual-compliance-calendar) |
| 26 |  | `ddec-revocation-procedures` | Act 60 | 487 | [/resources/ddec-revocation-procedures](https://riefkohllaw.com/resources/ddec-revocation-procedures) |
| 27 |  | `federal-reporting-act-60` | Act 60 | 453 | [/resources/federal-reporting-act-60](https://riefkohllaw.com/resources/federal-reporting-act-60) |
| 28 |  | `act-60-decree-comparison` | Act 60 | 408 | [/resources/act-60-decree-comparison](https://riefkohllaw.com/resources/act-60-decree-comparison) |
| 29 |  | `ley-60-guia-inversionistas` | Spanish — Act 60 | 455 | [/resources/ley-60-guia-inversionistas](https://riefkohllaw.com/resources/ley-60-guia-inversionistas) |

---

## Console snippets (one per page, in priority order)

Copy the snippet for the page you're on, paste into Console, Enter.

**1. Asset Protection Trusts Under the PR Trust Act** — `asset-protection-trusts-pr`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/asset-protection-trusts-pr.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**2. ILITs and SLATs: Advanced Trust Planning for Puerto Rico Residents** — `ilits-and-slats`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/ilits-and-slats.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**3. Fiduciary Duties Under Puerto Rico Trust Law** — `fiduciary-duties-trustees`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/fiduciary-duties-trustees.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**4. Landmark Puerto Rico Trust Cases You Should Know** — `landmark-trust-cases`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/landmark-trust-cases.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**5. Family Trust Planning Pitfalls: When Good Intentions Go Wrong** — `family-trust-pitfalls`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/family-trust-pitfalls.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**6. Trust Taxation and Act 60: A 2026 Regulatory Perspective** — `trust-taxation-act-60`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/trust-taxation-act-60.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**7. How Modifiable Are Puerto Rico’s Irrevocable Trusts?** — `modifying-irrevocable-trusts`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/modifying-irrevocable-trusts.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**8. Special Needs Trusts and Medicaid Planning in Puerto Rico** — `special-needs-trusts-medicaid`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/special-needs-trusts-medicaid.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**9. The Costs of Creating, Administering, and Terminating a Trust in Puerto Rico** — `trust-costs-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/trust-costs-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**10. Avoiding Probate in Puerto Rico: Trusts and the Legítima** — `avoiding-probate-legitima`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/avoiding-probate-legitima.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**11. Bringing Your Mainland Trust to Puerto Rico** — `mainland-trust-to-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/mainland-trust-to-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**12. The Foreign Trust Trap** — `foreign-trust-trap`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/foreign-trust-trap.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**13. What Is a Puerto Rico Trust? A Guide for Act 60 Investors** — `what-is-puerto-rico-trust`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/what-is-puerto-rico-trust.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**14. Trust Planning for Act 60 Investors: Mainland Revocable Trust vs. PR’s Irrevocable Trust** — `act-60-trust-planning`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/act-60-trust-planning.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**15. 5 Critical Mistakes Act 60 Holders Make with Estate Planning** — `act-60-estate-planning-mistakes`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/act-60-estate-planning-mistakes.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**16. Puerto Rico Asset Protection with Irrevocable Trusts** — `asset-protection-irrevocable-trusts`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/asset-protection-irrevocable-trusts.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**17. Fideicomiso Irrevocable en Puerto Rico** — `fideicomiso-irrevocable-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/fideicomiso-irrevocable-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**18. Proceso de Declaratoria de Herederos** — `declaratoria-de-herederos-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/declaratoria-de-herederos-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**19. Planificación Sucesoral en Puerto Rico** — `planificacion-sucesoral-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/planificacion-sucesoral-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**20. Puerto Rico Bona Fide Residency & the Source-of-Income Rules** — `bona-fide-residency-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/bona-fide-residency-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**21. Act 38-2026 (HB 505): What Changed for Act 60 Investors** — `act-38-2026-hb-505`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/act-38-2026-hb-505.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**22. Compliance Certificates & Agreed-Upon Procedures Under Act 52-2022** — `compliance-certificate-act-52`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/compliance-certificate-act-52.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**23. IRS Enforcement of Act 60: Campaign 685 & Criminal Prosecutions** — `irs-enforcement-act-60`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/irs-enforcement-act-60.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**24. Why Hire a Law Firm for Act 60 Planning?** — `why-law-firm-act-60`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/why-law-firm-act-60.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**25. Act 60 Annual Compliance Calendar & Filing Deadlines** — `annual-compliance-calendar`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/annual-compliance-calendar.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**26. DDEC Decree Revocation: Procedures, Consequences & Tax Reversion** — `ddec-revocation-procedures`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/ddec-revocation-procedures.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**27. Federal Reporting Obligations for Act 60 Decree Holders** — `federal-reporting-act-60`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/federal-reporting-act-60.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**28. Act 60 Decree Comparison: Pre-2020 vs. 2020–2025 vs. Post-2026** — `act-60-decree-comparison`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/act-60-decree-comparison.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**29. Ley 60: Guía para Inversionistas** — `ley-60-guia-inversionistas`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/ley-60-guia-inversionistas.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

---

## Verification (run after the session, or anytime)

From `migration/`:
```bash
python3 verify-migration.py            # checks all pages, lists MIGRATED vs pending
python3 verify-migration.py asset-protection-trusts-pr ilits-and-slats   # spot-check specific slugs
```
A page flips to **MIGRATED ✓** when its raw HTML shows `.rl-sub` and >300 visible words — exactly what Googlebot sees. Re-run until PENDING is 0.

## After all pages are migrated

1. In Google Search Console, use **URL Inspection → Request Indexing** for the ★ pages first (they were already crawled and rejected, so a re-crawl request matters most).
2. Re-submit `https://riefkohllaw.com/sitemap.xml` (Sitemaps report) to nudge re-crawl of the rest.
3. Expect indexing changes over ~1–3 weeks; track in GSC *Pages* report (the 34 'Crawled – currently not indexed' count should fall).

---

## NEW Spanish pages (optional — do AFTER the 29 migrations above)

Puerto Rico is bilingual but the site had ~25 English resource pages vs. only ~4 Spanish. These are faithful Spanish translations of the top three foundational/commercial-intent trust pages — net-new crawlable Spanish content for local search. SEO metadata (title, meta description, FAQ schema) is **already wired** in `seo-fixes.js`; it activates automatically once the page exists.

**These pages do NOT exist in Squarespace yet** — unlike the 29 above, you must CREATE the page first:

1. Squarespace admin → **Pages** → **+** → add a blank page.
2. Page **Settings**: set the **URL slug** to `resources/<slug>` (the slash nests it under /resources, the same pattern all resource pages use). Set the navigation title; you can leave it under "Not Linked".
3. Then follow the same per-page steps as above (ADD SECTION → Add Blank → ADD BLOCK → Code → double-click → paste the console snippet → SAVE).

| # | New page (slug) | Translated from |
|--:|---|---|
| 1 | `que-es-un-fideicomiso-en-puerto-rico` | `what-is-puerto-rico-trust` |
| 2 | `como-evitar-el-proceso-sucesorio-en-puerto-rico` | `avoiding-probate-legitima` |
| 3 | `cuanto-cuesta-un-fideicomiso-en-puerto-rico` | `trust-costs-puerto-rico` |

### Console snippets

**1. ¿Qué es un fideicomiso en Puerto Rico?** — `que-es-un-fideicomiso-en-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/que-es-un-fideicomiso-en-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**2. Cómo evitar el proceso sucesorio en Puerto Rico** — `como-evitar-el-proceso-sucesorio-en-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/como-evitar-el-proceso-sucesorio-en-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

**3. ¿Cuánto cuesta un fideicomiso en Puerto Rico?** — `cuanto-cuesta-un-fideicomiso-en-puerto-rico`
```js
const c=await fetch('https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/cuanto-cuesta-un-fideicomiso-en-puerto-rico.html').then(r=>r.text());const cm=document.querySelector('.cm-content');cm.focus();document.execCommand('selectAll',false,null);document.execCommand('insertText',false,c);'len='+c.length
```

### After publishing these 3 pages — add hreflang pairs

Once the Spanish pages render live (verify with `verify-migration.py <slug>`), wire them to their English equivalents for bilingual SEO. In `js/seo-fixes.js`, find `CORE_HREFLANG_PAIRS` and add:

```js
  ['/resources/what-is-puerto-rico-trust', '/resources/que-es-un-fideicomiso-en-puerto-rico'],
  ['/resources/avoiding-probate-legitima', '/resources/como-evitar-el-proceso-sucesorio-en-puerto-rico'],
  ['/resources/trust-costs-puerto-rico', '/resources/cuanto-cuesta-un-fideicomiso-en-puerto-rico'],
```

Do NOT add these before the Spanish pages exist — hreflang pointing at a 404 hurts SEO (the file has a comment to this effect).

> Optional polish: add these 3 pages to the `/resources` index cross-links in `js/resources-fix.js` so they appear in the Resources listing, and cross-link the 3 Spanish pages to each other instead of to their English siblings.
