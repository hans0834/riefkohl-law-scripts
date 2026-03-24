# Riefkohl Law Site Scripts

Custom scripts for [riefkohllaw.com](https://www.riefkohllaw.com), deployed via Squarespace Code Injection + GitHub Pages.

## Architecture

The Squarespace Code Injection header contains a lightweight loader (`code-injection-header.html`) that references these externally hosted files. This means you edit code here, push to GitHub, and changes go live on the website automatically — no need to touch the Squarespace editor.

## Files

### CSS (`/css/`)
- `all-styles.css` — Combined CSS (all styles in one file, loaded by the site)
- Individual CSS files per module — for reference/editing, then merged into `all-styles.css`

### JavaScript (`/js/`)
Scripts load in the order listed in `code-injection-header.html`:

| # | File | What it does |
|---|------|-------------|
| 1 | `gtm-tracking.js` | Google Tag Manager + conversion event tracking |
| 2 | `seo-fixes.js` | SEO fixes (H1, meta descriptions, schema, canonicals, hreflang) |
| 3 | `homepage-services.js` | Homepage and services page visual design |
| 4 | `images-injection.js` | Branded illustration images |
| 5 | `resources-fix.js` | Resources page subpages, cross-links, Act 60 content pages |
| 6 | `blog-dashboard.js` | Blog dashboard with filtering/search |
| 7 | `articles-inject.js` | 15-article Trust Law Series |
| 8 | `breadcrumb-schema.js` | BreadcrumbList structured data |
| 9 | `post-formatter.js` | Auto-formats imported case law blog posts |
| 10 | `conversion-booster.js` | Click-to-call banner, sticky mobile CTA, LocalBusiness schema |
| 11 | `email-signup.js` | Site-wide newsletter bar + inline blog lead magnets |
| 12 | `service-crosslinks.js` | Related services links on service pages |
| 13 | `legal-content-fixes.js` | Statutory corrections, HB 505 updates, CPA audit fixes |

## Deployment

1. Edit files in this repo
2. Push to `main` branch
3. GitHub Pages serves from `https://hans0834.github.io/riefkohl-law-scripts/`
4. Changes go live on the website automatically

## Squarespace Setup

The Code Injection **Header** should contain only the content from `code-injection-header.html` — a list of `<link>` and `<script>` tags pointing to this repo. Nothing else.

## Setup Required (one-time)

Two scripts need configuration before they work:

1. **`gtm-tracking.js`** — Replace `GTM-XXXXXXX` with your Google Tag Manager Container ID
2. **`email-signup.js`** — Replace `YOUR_FORM_ACTION_URL` with your email provider's form action URL

See `SETUP-GUIDE.md` for detailed instructions.
