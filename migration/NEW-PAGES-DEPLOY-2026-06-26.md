# Deploy: 3 New Act 60 Pages (from the IRI Planning Guide) — 2026-06-26

Three **net-new** native pages, written to convert deadline-driven HNW traffic. Unlike the migration runbook (which moves *existing* JS-injected pages to native HTML), these slugs **do not exist yet** — a blank Squarespace page must be created at each before pasting.

| Slug (`/resources/...`) | Source HTML | Type |
|---|---|---|
| `act-60-filing-date-vs-move-date-deadline` | `migration/native-html/act-60-filing-date-vs-move-date-deadline.html` | Deadline explainer (3-date table) |
| `act-60-gilti-subpart-f-cfc-business-owners` | `migration/native-html/act-60-gilti-subpart-f-cfc-business-owners.html` | Business-owner / structuring upsell |
| `act-60-savings-calculator` | `migration/native-html/act-60-savings-calculator.html` | Interactive 0%-vs-4% calculator |
| `ley-60-fecha-limite-2026` | `migration/native-html/ley-60-fecha-limite-2026.html` | 🇪🇸 Spanish twin of the deadline page (hreflang-paired) |
| `leaving-california-for-puerto-rico` | `migration/native-html/leaving-california-for-puerto-rico.html` | Geo landing page — CA / FTB departure-audit defense |
| `leaving-new-york-for-puerto-rico` | `migration/native-html/leaving-new-york-for-puerto-rico.html` | Geo landing page — NY statutory-residency departure |
| `act-60-who-should-not-apply` | `migration/native-html/act-60-who-should-not-apply.html` | Red-flags / disqualifier pillar page |
| `act-60-true-cost-is-it-worth-it` | `migration/native-html/act-60-true-cost-is-it-worth-it.html` | Cost + break-even ("is it worth it?") page |
| `act-60-eligibility-quiz` | `migration/native-html/act-60-eligibility-quiz.html` | Interactive eligibility quiz (disqualifier-aware) |

## ⚠ VERIFY BEFORE PUBLISHING (attorney sign-off)
1. ✅ **RESOLVED — Legacy look-back window.** Confirmed by HR (2026-06-26): the legacy window is the fixed **Jan 17, 2006 – Jan 17, 2012** (filings on/before Dec 31, 2026); it becomes a **rolling 6-year** look-back for filings on/after Jan 1, 2027. The "15-year" figure in `legal-content-fixes.js` refers to **decree duration**, not a look-back — no conflict. The deadline page now states the precise dates.
2. **Pre-move filing on a sworn statement of intent** (deadline page) — framed as "subject to current DDEC practice." HR to confirm whether DDEC currently accepts a complete IRI application filed before physical relocation on a sworn statement of intent; if yes, the page can state it plainly rather than hedged.
3. **GILTI/NCTI** (business-owner page) — the page deliberately states **no precise federal rate** and flags OBBBA's 2026 revision/NCTI rename as "confirm with your CPA." Confirm the rename framing matches your house style.

## Steps
1. **Push code** (deploys SEO + the `/resources` index cards):
   - `js/seo-fixes.js` — added 9 SEO entries (title, meta, FAQPage schema) for the 9 slugs above, plus an EN↔ES hreflang pair (deadline page ↔ Spanish twin) in `CORE_HREFLANG_PAIRS`.
   - `js/resources-fix.js` — added 8 cards to the "Act 60 Tax Incentives" group (deadline, calculator, eligibility quiz `featured`; GILTI; CA + NY geo; who-should-not; true-cost) and 1 card to "Recursos en Español" (the Spanish twin).
   - **Eligibility quiz slug:** use `/resources/act-60-eligibility-quiz` (this supersedes the older `/act60-assessment` staging in `docs/deployment-checklist.md` A14 — do NOT also build `/act60-assessment`, to avoid two competing pages). The quiz captures leads two ways: the `/calendly` CTA and a prefilled **mailto to hans@riefkohllaw.com** (works with no backend). To capture emails passively later, wire the site email provider and swap the mailto for a form post.
   - Commit + push to `main`; after ~2–3 min verify `https://hans0834.github.io/riefkohl-law-scripts/js/seo-fixes.js` returns 200.
   - **Publish the English deadline page and its Spanish twin together** so the hreflang pair never points at a 404.

### Geo pages (CA / NY) — sourcing notes for your review
Both were web-researched and adversarially legal-reviewed. Key authorities cited (spot-check against your own knowledge): **CA** — R&TC §17014 (residency two-prong), FTB Pub. 1031, *Appeal of Stephen D. Bragg* (closest-connection factors), the 546-day employment safe harbor with the $200k-per-spouse intangible ceiling, RSU/option workday allocation (*Appeal of Stabile*, *Cremel & Koeppel*), 4 U.S.C. §114. **NY** — Tax Law §605(b)(1) + 20 NYCRR 105.20 (domicile + statutory residency), *Matter of Gaied* (abode must be used as a residence), the 548-day "foreign country" safe harbor and the reasoned (not case-law-quoted) conclusion that **Puerto Rico is a U.S. possession, not a foreign country**, so it likely doesn't qualify — the NY page is explicitly transparent that this rests on PR's possession status + NY's extension instructions, not an on-point holding.
2. **Create each page in Squarespace** at `/resources/{slug}` (blank page) → add a **Code block** → paste the native HTML. Use the same CM6 console-snippet method as the migration runbook (the files are served at `https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/{slug}.html` once pushed):
   ```js
   (async()=>{const u='https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/SLUG.html';const html=await (await fetch(u)).text();document.execCommand('insertText',false,html);console.log('len='+html.length);})()
   ```
   (Focus the Code block's CM6 editor first; replace `SLUG`.)
3. **Save** each page. Hard-refresh and confirm: the `.rl-sub` block renders full-width, FAQ accordions toggle, and the calculator computes.

## Notes
- Calculator was verified locally: math correct across scenarios (incl. years=0 guard, empty fields), labels tied to inputs, `aria-live` results, post-move-only guardrail prominent. All copy is ASCII-safe (em-dashes are `&mdash;` entities).
- Internal links: the 3 pages cross-link to each other and to existing pages (`act-38-2026-hb-505`, `act-60-decree-comparison`, `bona-fide-residency-puerto-rico`, `annual-compliance-calendar`, `federal-reporting-act-60`, `act-60-export-services`, `pre-move-post-move-appreciation`, `/calendly`). All verified to exist.
- **Optional higher-converting placement:** embed the calculator widget (the `.r60calc` block) inside the deadline page or near the `conversion-booster` countdown, per the roadmap, instead of only on its own page.
- **Spanish twins** (`/espanol-ley-60-fecha-limite-2026`, etc.) are recommended follow-ups per the roadmap; not built yet.
