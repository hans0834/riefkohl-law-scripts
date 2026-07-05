# Deploy Runbook — Act 60 + Estate Bundle, Schema & Review/WhatsApp (2026-07-05)

Batch of Quick-Win improvements built from the Tax Law Ventures competitive deep-dive. Two deploy channels: **(1) push to `main`** (auto-deploys JS in 2–3 min) and **(2) Squarespace paste** (native `/resources` pages).

---

## 1. What changed

### Live JS — deploy by `git push origin main` only (no Squarespace action)
| File | Change |
|---|---|
| `js/seo-fixes.js` | Added FAQPage schema to `/act-60-individual-investor` (6 Q&A, was `schema: null`). Expanded `/resources/estate-planning-act-60-relocatees` FAQ schema 3→5 Q&A (bundle framing). Added new ES SEO entry + FAQPage for `/resources/planificacion-sucesoral-ley-60-nuevos-residentes`. Added the EN↔ES hreflang pair for the bundle. |
| `js/conversion-booster.js` | WhatsApp button prefilled message is now **bilingual** (Spanish on ES pages, incl. Spanish `/resources/*` slugs) + localized aria-label. LocalBusiness schema: populated `sameAs` (GBP + LinkedIn) + `hasMap`; added a **review-ready** `aggregateRating` placeholder comment (activate only with real reviews). |
| `js/schema-markup.js` | Organization `sameAs` now includes the Google Business Profile; added `hasMap`. |

*Verified: `node --check` passes on all three; all 49 FAQPage schemas parse (187 Q&A, 0 errors).*

### Native `/resources` pages — require Squarespace paste (see §3)
| File | Change |
|---|---|
| `migration/native-html/estate-planning-act-60-relocatees.html` | EN bundle page **upgraded**: new "Why one firm should handle both your decree and your estate plan" section + 2 new bundle FAQs (5 total). |
| `migration/native-html/planificacion-sucesoral-ley-60-nuevos-residentes.html` | **NEW** — full Spanish twin of the bundle page. |
| `migration/native-html/resources-index.html` | Added an "Act 60 + Estate Planning" section (2 cards) to the crawlable `/resources` hub, linking EN + ES bundle pages. |

### Docs / content (no deploy needed)
- `email/review-request.md` — **NEW** bilingual Google-review request toolkit (email/SMS/WhatsApp templates + link setup + ethics).

---

## 2. Push the JS (goes live automatically)

```
git add js/seo-fixes.js js/conversion-booster.js js/schema-markup.js \
        migration/native-html/estate-planning-act-60-relocatees.html \
        migration/native-html/planificacion-sucesoral-ley-60-nuevos-residentes.html \
        migration/native-html/resources-index.html \
        email/review-request.md migration/ACT60-ESTATE-BUNDLE-DEPLOY-2026-07-05.md
git commit -m "Act 60 + estate bundle (EN+ES), bilingual WhatsApp, review-ready schema, FAQ schema fills"
git push origin main
```
Wait 2–3 min, then confirm `https://hans0834.github.io/riefkohl-law-scripts/js/seo-fixes.js` returns **200**.

The JS changes (schema, bilingual WhatsApp, individual-investor FAQ) take effect immediately on push — no Squarespace step for those.

## 3. Squarespace paste steps (owner / authenticated browser)

> **Do the ES page and the EN update together** — the hreflang pair points EN↔ES; if the ES page 404s, hreflang breaks.

1. **Create the ES page.** In Squarespace, add a blank page at slug **`/resources/planificacion-sucesoral-ley-60-nuevos-residentes`**. Add a Code block and paste the full contents of `migration/native-html/planificacion-sucesoral-ley-60-nuevos-residentes.html`. (Set the page's SEO title/description to match, or let `seo-fixes.js` handle it.)
2. **Update the EN page.** On the existing `/resources/estate-planning-act-60-relocatees` page, replace its Code block with the updated `migration/native-html/estate-planning-act-60-relocatees.html` (adds the bundle section + 2 FAQs).
3. **Refresh the hub.** On `/resources`, replace the `rl-article-hub` Code block with the updated `migration/native-html/resources-index.html` (adds the Act 60 + Estate Planning section).

## 4. Set up the review link (owner, ~60 sec)
Follow **STEP 0** in `email/review-request.md` to grab your one-tap `g.page/r/…/review` link, then drop it into the templates (replace `[[REVIEW_LINK]]`). Optional: make `riefkohllaw.com/review` redirect to it + print a QR for the office.

## 5. Verify after deploy
- [ ] `seo-fixes.js` returns 200; hard-refresh the two bundle pages.
- [ ] Rich Results Test (search.google.com/test/rich-results) on both bundle URLs + `/act-60-individual-investor` → FAQ detected, no errors.
- [ ] On an ES page (e.g. `/resources/fideicomiso-irrevocable-puerto-rico`), the WhatsApp button's prefilled message is in Spanish.
- [ ] View source on a schema page → LocalBusiness `sameAs` includes the GBP URL.
- [ ] hreflang: EN bundle page `<head>` has `alternate` links to the ES page and vice-versa (no 404).

## Rollback
`git revert HEAD && git push` reverts the JS. Native page pastes are reverted in Squarespace by restoring the prior Code block.
