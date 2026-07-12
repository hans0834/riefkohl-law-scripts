# Trust & Estate Cluster Upgrade — Deploy Runbook (2026-07-12)

Highest-revenue practice area (Trusts & Estate Planning). Deepened 3 thin stub pages into
full pillar content, consolidated 1 cannibalizing duplicate, and shipped supporting on-page SEO.

## A. Already LIVE via GitHub Pages push (commit this session)

These took effect automatically on push (verify `js/seo-fixes.js` returns 200 on the Pages host):

- **`js/seo-fixes.js`** — refined meta descriptions + aligned H1 for the 3 pillar pages; added a
  **canonical override** so `/resources/asset-protection-irrevocable-trusts` consolidates into the
  4,300-word authority page `/resources/asset-protection-trusts-pr`.
- **`js/schema-markup.js`** — added the 3 pillar pages to `FAQ_SCAN_PAGES`. FAQPage structured data
  now auto-generates from each page's on-page FAQ **once the deepened body is pasted** (thin versions
  have no FAQ, so nothing renders prematurely).
- **`js/legal-content-fixes.js`** — new `fixHourlyBillingSurprises()` scrubs the non-compliant phrase
  "…no hourly billing **surprises**" → "…no hourly billing" site-wide (fixes the already-pasted
  `trust-costs` and `avoiding-probate-legitima` pages live, no re-paste needed). Per your July 11 directive.
- **`js/articles-inject.js`** — same phrase scrubbed at source (2 CTAs in the Trust Law Series).
- **`js/resources-fix.js`** — the `/resources` hub "Asset Protection" card now points to the authority
  page instead of the thin stub.

## B. NEEDS A SQUARESPACE PASTE — the 3 deepened page bodies

The full pillar bodies are committed as native HTML and served at their Pages URLs, ready to paste into
each page's existing **Code Block**. (I will do this for you once a logged-in Squarespace browser session
is available; manual steps below as a fallback.)

| Page (edit at) | Paste source (fetch this) | New length |
|---|---|---|
| `/resources/complete-guide-puerto-rico-trusts` | `…/migration/native-html/complete-guide-puerto-rico-trusts.html` | 548 → ~2,600 w |
| `/resources/trust-vs-will-puerto-rico` | `…/migration/native-html/trust-vs-will-puerto-rico.html` | 411 → ~2,000 w |
| `/resources/forced-heirship-estate-plan` | `…/migration/native-html/forced-heirship-estate-plan.html` | 345 → ~1,900 w |

Pages host base: `https://hans0834.github.io/riefkohl-law-scripts`

### Paste recipe (the one that works — from prior sessions)
1. Open the page in the Squarespace editor → click the existing Code Block → pencil (Edit).
2. Switch the editor to **Mobile view** (the desktop Fluid-Engine canvas ignores programmatic scroll/focus).
3. Focus the CM6 code area, `Cmd+A` to select all, then replace with the fetched file:
   `document.execCommand('insertText', false, await fetch('<pages-url-from-table>').text())`
4. Save. Hard-refresh the live page (`Cmd+Shift+R`).

After each paste, confirm: one H1, the FAQ renders, and FAQPage schema appears
(Rich Results Test / `view-source` for `"@type":"FAQPage"`).

## C. OWNER RESIDUAL STEPS (only you can do these)

1. **Asset-protection 301 (finishes the consolidation).** Settings → Advanced → **URL Mappings**, add:
   `/resources/asset-protection-irrevocable-trusts -> /resources/asset-protection-trusts-pr 301!`
   The JS canonical override already tells Google to consolidate; this makes it a true server 301.
   After it's live, the stub's body-injection block (`resources-fix.js`) and its SEO entry can be deleted.
2. **Calendly event rename** → "Free 30-Minute Strategy Call" (carried over from the July 11 TODO).
3. **Request re-indexing** in Search Console for the 3 pillar URLs once pasted.

## D. LEGAL REVIEW FLAGS (from the adversarial fact-check — please confirm)

Every legal claim was grounded in your own vetted pages; these are the few points worth your eyes:

- **Will cost**: `trust-vs-will` describes a notarial will as "a few thousand dollars" (no hard number,
  since your cost file only prices trusts). Trust ranges match your cost file exactly ($3,500–$7,500
  revocable; $7,500–$18,000+ complex/asset-protection).
- **Revocable trust for Act 60 IRIs** cited to 13 LPRA §10854a(b) / Incentives Code §2022.07(b) — matches
  your Trust Law Series; confirm still current under Act 60 / Act 38-2026.
- **`forced-heirship`**: the disinheritance example ("an attempt against the parent's life") is a standard
  civil-law ground, phrased as an example; confirm you're comfortable publishing it.
- **Conflict-of-laws** for out-of-PR movable property of a PR-domiciled decedent is described in hedged,
  fact-specific terms (no bright-line rule stated) — intentional.

## E. What this moves

Trusts & Estate Planning is your #1 revenue area. These were thin (339–548 w) pages sitting next to
2,200–4,300-word siblings — capping rankings and cannibalizing each other. Post-deploy the cluster has a
true hub that funnels internal authority, two deep pages on high-intent queries ("trust vs will",
"forced heirship / does my mainland will work in PR"), FAQ rich-result eligibility, and one fewer
duplicate. Targets it supports: 1,000+ clicks/28d, CTR 1.3%+ (from 0.9%).
