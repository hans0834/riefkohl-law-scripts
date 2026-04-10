# Claude Context: riefkohllaw.com

You are editing the codebase for riefkohllaw.com, a Squarespace website enhanced with custom JavaScript and CSS served via GitHub Pages.

---

## Architecture

Squarespace serves the page shell. The Code Injection Header (Settings > Advanced > Code Injection > Header) contains ONLY the loader from `code-injection-header.html` — a list of `<script>` and `<link>` tags pointing to `https://hans0834.github.io/riefkohl-law-scripts/`. All actual code lives in this repo. Pushing to `main` deploys changes to the live site within 2–3 minutes.

**The `js/` and `css/` directories are LIVE production code.** Every edit to these files affects riefkohllaw.com immediately after push.

---

## Critical Safety Rules

1. **NEVER modify `code-injection-header.html` without verifying ALL 15 entries are present.** In a past incident (Session 10→11), two scripts were accidentally omitted, breaking the homepage for ~24 hours.
2. **NEVER force-push to `main`.** This branch is served by GitHub Pages.
3. **NEVER commit secrets** (`.pem`, `.env`, API keys). The `.gitignore` covers these but be vigilant.
4. **When editing `all-styles.css`, also update the corresponding module CSS file** (e.g., `homepage-services.css`), and vice versa. The site only loads `all-styles.css` but the module files are kept in sync for maintainability.
5. **After pushing changes to `js/` or `css/`, verify GitHub Pages is still serving** by checking that `https://hans0834.github.io/riefkohl-law-scripts/js/seo-fixes.js` returns HTTP 200.
6. **The correct email is `hans@riefkohllaw.com`** (not info@).

---

## Script Load Order (must be maintained)

| # | File | Purpose | Key variables / entry points |
|---|------|---------|------------------------------|
| 1 | `js/gtm-tracking.js` | Google Tag Manager + conversion tracking | GTM ID: `GTM-N2G4Z9D8` |
| 2 | `css/all-styles.css` | Combined stylesheet (only CSS file loaded) | — |
| 3 | `js/seo-fixes.js` | H1s, meta descriptions, canonical URLs, hreflang, FAQ schema, preconnect hints, 404 page, skip-link | `SEO` object keyed by URL path; `hreflangPairs` array |
| 4 | `js/homepage-services.js` | Homepage hero, service cards, pricing tiers, "How It Works" section | Runs on `/`, `/services`, `/pricing` |
| 5 | `js/images-injection.js` | Branded illustration images | Runs on `/`, `/services` |
| 6 | `js/resources-fix.js` | Resources page subpages, Act 60 content, cross-links to articles, glossary | Runs on `/resources` and `/resources/*` subpaths |
| 7 | `js/blog-dashboard.js` | Blog filtering, search, bilingual toggle | Runs on `/blog` |
| 8 | `js/articles-inject.js` | 15-article Trust Law Series | Runs on `/resources/trust-law-series/*` — requires blank Squarespace pages at correct slugs |
| 9 | `js/breadcrumb-schema.js` | BreadcrumbList structured data (JSON-LD) | Runs on all pages |
| 10 | `js/post-formatter.js` | Auto-formats imported case law blog posts | Runs on `/blog/*` posts |
| 11 | `js/conversion-booster.js` | Click-to-call banner, sticky mobile CTA, LocalBusiness schema | `PHONE`: `(787) 236-1657`, `BOOK_URL`: `/calendly` |
| 12 | `js/email-signup.js` | Newsletter signup bar + inline lead magnets | **Needs setup:** replace `YOUR_FORM_ACTION_URL` with email provider form URL |
| 13 | `js/service-crosslinks.js` | Related services links at bottom of service pages | Runs on service pages |
| 14 | `js/legal-content-fixes.js` | Statutory corrections (forced heirship, OBBBA, Act 60 exemption %, NR/NC classification, corporate tax rate, advertising language) | Runs on all pages, applies targeted DOM corrections |
| 15 | `js/schema-markup.js` | Enhanced Organization schema, practice-area LegalService, Article/BlogPosting, dynamic FAQ extraction | Runs on all pages; additive to existing schema in seo-fixes.js and conversion-booster.js |

---

## How to Make Common Changes

### Add SEO metadata for a new page
Edit `js/seo-fixes.js`. Add an entry to the `SEO` object:
```javascript
'/your-page-path': {
  h1: 'Page Heading',
  meta: 'Meta description under 160 characters.',
  schema: null  // or a FAQPage schema object
},
```

### Add a new FAQ schema
Same file, same entry — replace `schema: null` with:
```javascript
schema: {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    { '@type': 'Question', 'name': '...', 'acceptedAnswer': { '@type': 'Answer', 'text': '...' } }
  ]
}
```

### Add an hreflang pair (EN↔ES blog posts)
In `js/seo-fixes.js`, find the `hreflangPairs` array and append:
```javascript
{ en: '/blog/english-slug', es: '/blog/spanish-slug' },
```

### Change the phone number
Edit `js/conversion-booster.js` — update `PHONE` and `PHONE_TEL` at the top. Also update the LocalBusiness schema `telephone` field and any hardcoded references in `js/seo-fixes.js`.

### Change the office address
Edit `js/conversion-booster.js` — update the `address` object inside `injectLocalBusinessSchema()`. Also update the LocalBusiness `address` in `js/seo-fixes.js`.

### Change pricing tiers
Edit `js/homepage-services.js` — search for the pricing tier objects or "From $" strings.

### Add a new Trust Law article
Edit `js/articles-inject.js` — add the article to the articles array. Then update `js/resources-fix.js` to add a cross-link, and add an SEO entry in `js/seo-fixes.js`. A blank Squarespace page must exist at the corresponding slug.

### Add a new Resources subpage
Edit `js/resources-fix.js` — add content for the new subpath. Add an SEO entry in `js/seo-fixes.js`.

### Change styles
Edit the relevant `css/[module].css` file AND update the same section in `css/all-styles.css`. The site only loads `all-styles.css`.

### Add a new blog post category
Edit `js/blog-dashboard.js` — add the category to the filter list.

---

## Source HTML → Deployed JS/CSS Mapping

The `src/` directory contains the original monolithic HTML files from which the JS/CSS modules were extracted. These are reference copies, NOT loaded by the site.

| Source (src/) | Deployed JS | Deployed CSS |
|---------------|-------------|-------------|
| `seo-fixes.html` | `js/seo-fixes.js` | `css/seo-fixes.css` |
| `homepage-services-redesign.html` | `js/homepage-services.js` | `css/homepage-services.css` |
| `images-injection.html` | `js/images-injection.js` | `css/images-injection.css` |
| `resources-fix.html` | `js/resources-fix.js` | `css/resources-fix.css` |
| `blog-deploy-clean.html` | `js/blog-dashboard.js` | `css/blog-dashboard.css` |
| `articles-inject.html` | `js/articles-inject.js` | `css/articles-inject.css` |
| `breadcrumb-schema.html` | `js/breadcrumb-schema.js` | `css/breadcrumb-schema.css` |
| `conversion-booster.html` | `js/conversion-booster.js` | `css/conversion-booster.css` |
| `email-signup-form.html` | `js/email-signup.js` | `css/email-signup.css` |
| `gtm-conversion-tracking.html` | `js/gtm-tracking.js` | (none) |
| `legal-content-fixes.html` | `js/legal-content-fixes.js` | (none) |

---

## Repository Structure

```
riefkohl-law-scripts/               244 files total
├── js/                              13 JS files — LIVE PRODUCTION
├── css/                             11 CSS files — LIVE (only all-styles.css loaded)
├── code-injection-header.html       Squarespace loader (canonical reference)
├── src/                             13 source HTML files (reference only)
├── blog-posts/
│   ├── english/                     25 posts
│   ├── spanish/                     8 posts
│   ├── case-law/                    16 case analysis posts
│   ├── category-summaries/          18 summary posts (9 EN + 9 ES)
│   └── squarespace-imports/         44 imported HTML/XML
├── articles/                        15 Trust Law Series (.md and .html)
├── lead-magnets/                    6 downloadable content pieces
├── email/                           2 welcome sequences
├── docs/                            Documentation and planning
│   ├── deployment-checklist.md      All remaining owner tasks
│   ├── blog-publishing-guide.md     Squarespace publishing steps
│   ├── blog-content-strategy.md     Content calendar and keyword targets
│   ├── website-management-guide.md  Comprehensive management guide
│   └── session-handoffs/            Per-session handoff memos
├── tools/                           6 Python scripts
├── data/                            JSON metadata + Squarespace XML imports
├── media/                           Illustrations (LFS), logo, PDFs
├── files/                           PDFs served via GitHub Pages
├── DEPLOYMENT.md                    Safety rules and deployment workflow
├── SETUP-GUIDE.md                   One-time setup instructions
├── README.md                        Project overview
├── .gitignore                       Excludes .venv, *.pem, .DS_Store, etc.
└── .gitattributes                   Git LFS tracking rules for media
```

---

## Blog Post Format

All blog posts use this structure:

```markdown
# [Post Title]

## SEO Metadata
- **Title tag:** [Under 60 chars]
- **Meta description:** [Under 160 chars]
- **Slug:** [url-slug]
- **Target keyword:** [keyword]
- **Category:** [Practice area]
- **Tags:** [comma-separated]
- **Internal links:** [/path1, /path2]

---

[Body with H2/H3 sections, internal links, legal citations]

---

**Schedule a free strategy call** — [Book now](/calendly)

*Hans Riefkohl is a Puerto Rico attorney...*

---

*This article is for informational purposes only and does not constitute legal advice...*
```

When creating new posts:
- English → `blog-posts/english/`
- Spanish → `blog-posts/spanish/`
- Case law analysis → `blog-posts/case-law/`
- Always add a corresponding SEO entry in `js/seo-fixes.js`
- For EN↔ES pairs, add an hreflang pair in `js/seo-fixes.js`

---

## Site Context

- **Owner:** Hans Riefkohl, solo law firm at 273 Ponce de Leon Ave., San Juan, PR 00917
- **Phone:** (787) 236-1657
- **Email:** hans@riefkohllaw.com
- **Practice areas (by revenue priority):**
  1. Trusts & Estate Planning ($7,500–$50,000+) — highest
  2. Act 60 Tax Incentives ($5,000+)
  3. Business Formation ($2,500–$10,000)
  4. Government Contracts
  5. Bankruptcy
- **Key legal frameworks:** Law 219-2012 (PR Trust Act), Act 60 (Tax Incentives), Act 38-2026 (extends Act 60 to 2055), Civil Code forced heirship (legítima)
- **Bilingual:** All content should be available in English and Spanish
- **Existing Act 60 Resource Center** at `/act-60-resource-center` — blog posts about Act 60 should NOT duplicate this content; link to it instead

---

## Related Repositories

| Repo | Purpose |
|------|---------|
| `hans0834/riefkohl-law-scripts` | This repo — main site code and content |
| `hans0834/matter-launch-system` | Legal document assembly system (separate project) |
| `hans0834/riefkohl-law-assets` | Archived — superseded by this repo |

---

## Deployment Checklist

After any push to `main`:
1. Wait 2–3 minutes for GitHub Pages rebuild
2. Verify `https://hans0834.github.io/riefkohl-law-scripts/js/seo-fixes.js` returns 200
3. Hard-refresh riefkohllaw.com (Cmd+Shift+R) and check the affected pages
4. If something breaks: `git revert HEAD && git push`
