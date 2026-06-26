# Deploy: Crawlable /resources Hub + Cleanups — 2026-06-26

**Why this matters (the headline fix):** The `/resources` page is only ~86 words of
raw HTML. Its Trust Law Series links were JavaScript-injected, so Googlebot saw a
near-empty page with **zero crawlable links** into the firm's highest-revenue
(trust / estate-planning) content. The 14 articles themselves are already native and
indexable — but Google couldn't *discover* them through the hub or pass internal-link
authority into them. This deploy fixes that.

---

## 1. Already shipped by code push (live in ~2-3 min, no action needed)

Pushed to `main` (`hans0834/riefkohl-law-scripts`):

| File | Change | Effect |
|---|---|---|
| `migration/native-html/resources-index.html` | **NEW** — native crawlable hub: real `<a href>` links to all 14 Trust Law articles + 2 cornerstone guides | Served on the CDN, ready to paste (step 2) |
| `js/post-formatter.js` | Fixed dead related-link `avoiding-probate-forced-heirship` → `avoiding-probate-legitima` | Removes a 404 link shown on estate-planning blog posts |
| `js/legal-content-fixes.js` | Removed dead `/resources/act-60-guide` from the 183-day clarifier list | Cleanup; that page 404s |
| `js/seo-fixes.js` | OG/Twitter image hardening: upgrades any `http://` social image to `https://` and mirrors it into `twitter:image` | Stops LinkedIn/Facebook/WhatsApp from dropping the preview card due to mixed content (the **size** fix still needs step 4) |

Verify the push served: open
`https://hans0834.github.io/riefkohl-law-scripts/js/seo-fixes.js` → should be HTTP 200.

---

## 2. ⭐ Paste the native hub onto /resources (the main win — ~10 min)

This is the step that makes the trust links crawlable. The block carries class
`rl-article-hub`; the JS series hub already self-suppresses when that class is present,
so **there is no visual duplication** — the page just renders this version, now in raw HTML.

1. Squarespace → **Pages → Resources** → **Edit**.
2. Add a **Code block** near the bottom of the page body (below the intro, above the
   footer CTA is ideal).
3. Click into the Code block's code editor so the cursor is inside it, then open the
   browser **Console** (⌥⌘J) and run — this fetches the pre-built HTML and types it in:
   ```js
   (async()=>{const u='https://hans0834.github.io/riefkohl-law-scripts/migration/native-html/resources-index.html';const html=await (await fetch(u)).text();document.execCommand('insertText',false,html);console.log('inserted len='+html.length);})()
   ```
   (Same CM6 method as `migration/DEPLOY-RUNBOOK.md`.) If the console is blocked, open
   `resources-index.html` from the repo and paste its contents into the Code block manually.
4. **Save.** Hard-refresh `/resources` (⇧⌘R). Confirm the "Puerto Rico Trust Law for
   Act 60 Investors" hub renders **once** (not twice) with working links.
5. **Verify crawlability** (Terminal):
   ```bash
   curl -s -A "Mozilla/5.0" -L https://www.riefkohllaw.com/resources \
     | grep -oE 'href="/resources/[a-z0-9-]+"' | sort -u | wc -l
   ```
   Should jump from **0** to **16**. Then request a re-crawl of `/resources` in Google
   Search Console (URL Inspection → Request Indexing).

---

## 3. 301-redirect the 4 orphan Act 60 404s (~5 min)

These four URLs return 404. They are not linked anywhere in the current site or sitemap,
so nothing is recreated — a 301 sends any old bookmark/backlink/residual-index traffic to
the correct live page (all targets verified HTTP 200 on 2026-06-26).

Squarespace → **Settings → Advanced → URL Mappings** → paste:

```
/act-60-resource-center/act-60-residency-requirements -> /resources/bona-fide-residency-puerto-rico 301
/act-60-resource-center/act-60-income-sourcing -> /act-60-income-sourcing-rules-puerto-rico 301
/act-60-resource-center/act-60-audit-triggers -> /resources/irs-enforcement-act-60 301
/act-60-resource-center/act-60-compliance-checklist -> /resources/compliance-certificate-act-52 301
```

Save, then re-check: `curl -s -o /dev/null -w "%{http_code}\n" -L https://www.riefkohllaw.com/act-60-resource-center/act-60-residency-requirements` → should be `200` (after the 301).

---

## 4. Replace the broken social-share image (~30 min, sitewide in one setting)

Current `og:image` is a **480×480 email-signature** served over insecure `http://` —
so shared links render blank or as a tiny thumbnail. Step 1 fixed the `http→https` half;
this fixes the size/branding half for all 1,510 pages at once.

1. Create a **1200×630 PNG** card: firm name "Riefkohl Law", line "Trusts, Estate Planning
   & Act 60 — San Juan, Puerto Rico", logo, dark `#1a2033` background, gold `#bfa35d` accent.
2. Squarespace → **Settings → Marketing → Social Sharing** (a.k.a. *Social Image*) → upload it.
3. Verify: paste `https://www.riefkohllaw.com` into the
   [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — the new card should appear.

---

## 5. Email capture — the one item still blocked on you (next, not today)

The lead magnets are currently **open PDF downloads with no email field**, so no list is
built and the written 5-email welcome sequence has nothing to send to. To turn this into
real capture you must first:

1. Create a free **Formspree** (or MailerLite) account → get a form endpoint URL.
2. Send me that URL. I'll then: gate the Act 60 checklist behind an email form that POSTs
   to it and delivers the PDF on submit, and (once a trust-planning checklist PDF exists)
   extend the prominent inline magnet to the trust cornerstone pages and `/blog`.

This is sequenced after the hub because it depends on your account + a strategic call
(gating downloads trades download volume for a nurturable list).

---

## Note for whoever pushes next
A separate, **owner-coupled** change set is intentionally left uncommitted in the working
tree: `js/resources-fix.js` (4 new Act 60 resource cards) + matching SEO entries (stashed)
+ `migration/native-html/act-60-*` / `ley-60-*` / `leaving-*` pages. Per
`NEW-PAGES-DEPLOY-2026-06-26.md`, those cards link to slugs that **don't exist yet** —
do not push them until the blank Squarespace pages are created, or they become new 404 links.
