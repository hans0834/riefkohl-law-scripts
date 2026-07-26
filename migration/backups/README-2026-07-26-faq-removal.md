# Page Header Code Injection backups — 2026-07-26

The five files here are the **complete original** `headerInjectCode` (Page Settings >
Advanced > Page Header Code Injection) for five money pages, captured from the live
rendered HTML before removal.

On each of these pages that field contained **nothing but** a stale `FAQPage` JSON-LD
block — no other scripts or markup. Verified via the Squarespace API
(`/api/commondata/GetCollection`): 1 script tag, 1 ld+json block, 0 bytes of other content.

## Why they were removed

`injectFAQSchema()` in `js/seo-fixes.js` used to bail out whenever a FAQPage already
existed, so on exactly these five pages the reviewed, repriced, legally-corrected FAQ in
the SEO map never loaded. Google was served the pasted version instead, which published:

- forced heirship reserving **two-thirds** of the estate (superseded by Ley 55-2020,
  which sets the legitima at **one-half**) — contradicting the page's own visible text
- estate-planning prices of $500–$1,500 / $2,000–$10,000 vs current flat fees from $1,800
- a **75%** municipal license tax exemption (correct figure is **50%**)
- the 18.5%–37.5% corporate rate that `legal-content-fixes.js` corrects on screen

## What replaced them

The SEO map in `js/seo-fixes.js` is now the single source of truth. `injectFAQSchema()`
removes any FAQPage it did not author and injects the map's version, tagged
`data-rl-faq="1"` so the 800ms retry pass cannot add a duplicate. Commit `ba5b03d`.

Where the pasted block had more questions than the map, the worthwhile ones were merged
in first so no content was lost: `/business-formation` 4 -> 6 and
`/government-contracts` 3 -> 5.

## To restore any of these

Paste the file's contents back into that page's Page Header Code Injection. Note that
`injectFAQSchema()` will now strip it at runtime, so you would also need to revert the
function to its bail-out behaviour.
