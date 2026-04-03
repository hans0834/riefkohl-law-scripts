# Riefkohl Law — Complete Site Repository

All code, content, and documentation for [riefkohllaw.com](https://www.riefkohllaw.com), a Squarespace site enhanced with custom scripts deployed via GitHub Pages.

## Architecture

Squarespace's Code Injection header contains a lightweight loader (`code-injection-header.html`) that references JS/CSS files hosted here via GitHub Pages. Edit code here, push to `main`, and changes go live automatically.

See [DEPLOYMENT.md](DEPLOYMENT.md) for safety rules and the full deployment workflow.

## Repository Structure

```
js/                    Live JavaScript modules (served via GitHub Pages)
css/                   Live CSS (served via GitHub Pages)
code-injection-header.html   The Squarespace loader (canonical reference)
src/                   Source HTML files (original monolithic versions)
blog-posts/            All blog post markdown
  english/             English posts (25)
  spanish/             Spanish posts (8)
  case-law/            Case law analysis posts (16)
  category-summaries/  Category summary posts (18)
  squarespace-imports/ Squarespace import HTML/XML
articles/              Trust Law Series (15 articles)
lead-magnets/          Downloadable content (6 pieces)
email/                 Email welcome sequences
docs/                  Documentation, audits, strategies
  session-handoffs/    Per-session handoff memos
tools/                 Python build scripts and utilities
data/                  JSON metadata, Squarespace XML imports
media/                 Illustrations, logo, PDFs (Git LFS for images)
files/                 PDFs served via GitHub Pages
```

## JavaScript Modules (load order)

| # | File | Purpose |
|---|------|---------|
| 1 | `gtm-tracking.js` | Google Tag Manager + conversion tracking |
| 2 | `seo-fixes.js` | SEO (H1s, meta, schema, canonicals, hreflang, FAQ) |
| 3 | `homepage-services.js` | Homepage and services visual design + pricing |
| 4 | `images-injection.js` | Branded illustration images |
| 5 | `resources-fix.js` | Resources subpages, cross-links, Act 60 content |
| 6 | `blog-dashboard.js` | Blog dashboard with filtering/search |
| 7 | `articles-inject.js` | 15-article Trust Law Series |
| 8 | `breadcrumb-schema.js` | BreadcrumbList structured data |
| 9 | `post-formatter.js` | Auto-formats imported case law posts |
| 10 | `conversion-booster.js` | Click-to-call banner, sticky mobile CTA, LocalBusiness schema |
| 11 | `email-signup.js` | Newsletter bar + inline blog lead magnets |
| 12 | `service-crosslinks.js` | Related services links on service pages |
| 13 | `legal-content-fixes.js` | Statutory corrections, HB 505, CPA audit fixes |

## Quick Start

1. Clone this repo
2. Edit files in `js/` or `css/`
3. Push to `main` -- changes go live via GitHub Pages
4. See [SETUP-GUIDE.md](SETUP-GUIDE.md) for one-time configuration
5. See [DEPLOYMENT.md](DEPLOYMENT.md) for safety rules

## Related Repositories

- [`hans0834/matter-launch-system`](https://github.com/hans0834/matter-launch-system) -- Legal document assembly system
- `hans0834/riefkohl-law-assets` -- Archived (superseded by this repo)

## Contact

Hans Riefkohl -- hans@riefkohllaw.com | (787) 236-1657
