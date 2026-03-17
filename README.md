# Riefkohl Law Site Scripts

Custom scripts for [riefkohllaw.com](https://www.riefkohllaw.com), deployed via Squarespace Code Injection + GitHub Pages.

## Architecture

The Squarespace Code Injection header contains a lightweight loader (`code-injection-header.html`) that references these externally hosted files. This replaces the previous approach of pasting 628KB of code directly into the Squarespace editor.

## Files

### CSS (`/css/`)
- `all-styles.css` — Combined CSS (all styles in one file)
- Individual CSS files for each script module

### JavaScript (`/js/`)
Scripts load in this order:
1. `seo-fixes.js` — SEO fixes (H1, meta, schema, canonicals)
2. `homepage-services.js` — Homepage and services visual design
3. `images-injection.js` — Branded illustration images
4. `resources-fix.js` — Resources page subpages and cross-links
5. `blog-dashboard.js` — Blog dashboard with filtering/search
6. `articles-inject.js` — 15-article Trust Law Series
7. `breadcrumb-schema.js` — BreadcrumbList structured data
8. `post-formatter.js` — Auto-formats imported case law posts

## Deployment

1. Push changes to `main` branch
2. GitHub Pages serves files from `https://hans0834.github.io/riefkohl-law-scripts/`
3. Changes go live on the website automatically

## Squarespace Setup

The Code Injection header should contain only the content from `code-injection-header.html`.
