# Session 7 Postmortem: Lost Homepage & Services Page Visuals

## What Happened

During Session 6, the 14-article Trust Law Series (`articles-inject.html`) needed to be deployed via Squarespace Code Injection. At ~3,198 lines / ~80KB, the file exceeded the Code Injection character limit. To work around this, the article script was moved to GitHub Pages (`hans0834.github.io/riefkohl-law-assets/articles-inject.js`) and loaded via a `<script>` tag.

During that process, **two files were dropped from the Code Injection header** and never re-added:

1. **`homepage-services-redesign.html`** — The CSS and JavaScript that transformed the homepage and services page from plain Squarespace text into a premium card-based layout with hero sections, practice area cards, pricing tiers, differentiators grid, and styled CTAs.

2. **`images-injection.html`** — The CSS and JavaScript that placed illustrations throughout both pages: hero background images, practice area card photos, accent images in service sections, and decorative images above key content areas.

The result was that both pages reverted to plain, unstyled text — losing all the premium visual design work from earlier sessions.

## Root Cause

The Squarespace Code Injection header has a **character limit** (not precisely documented by Squarespace, but practically around 200K characters). When Session 6 attempted to add the large articles script, space ran out. The redesign and images files were removed to make room, and after the articles script was moved to GitHub Pages (freeing up the space), the removed files were **never restored**.

This was essentially a manual error during a complex multi-step deployment under context pressure (the session was running long and approaching context limits).

## What Was Fixed (Session 7)

### 1. Homepage & Services Page Layout Restored
- Extracted the JavaScript from `homepage-services-redesign.html` into a standalone `homepage-redesign.js`
- Pushed it to the GitHub Pages repo (`hans0834/riefkohl-law-assets`)
- Added the CSS inline to Code Injection (to prevent flash of unstyled content) and loaded the JS via `<script src="https://hans0834.github.io/riefkohl-law-assets/homepage-redesign.js"></script>`

### 2. Illustrations/Images Restored
- Extracted the JavaScript from `images-injection.html` into a standalone `images-injection.js`
- Pushed it to the same GitHub Pages repo
- Added the images CSS inline to Code Injection and loaded the JS via script tag
- This file must load AFTER the redesign script (it injects images into DOM elements created by the redesign)

### 3. Resources Page Header Overlap Fixed
- The resources page hero section was overlapping with the site header/logo
- Root cause: the resources script replaces Squarespace's page section (which normally has `padding-top` matching the header height) with custom content that didn't account for the absolutely-positioned header
- Fix: added a `fixHeaderOverlap()` function that dynamically reads the header height and applies matching `padding-top` to the injected content container

## Current Architecture

The Code Injection header now contains these components (in order):

| Component | Type | Source |
|-----------|------|--------|
| `seo-fixes.html` | Inline CSS + JS | Code Injection |
| `resources-fix.html` | Inline CSS + JS | Code Injection |
| `blog-deploy-clean.html` | Inline CSS + JS | Code Injection |
| `articles-inject.js` | Script tag | GitHub Pages |
| `homepage-redesign.css` | Inline CSS | Code Injection |
| `homepage-redesign.js` | Script tag | GitHub Pages |
| `images-injection.css` | Inline CSS | Code Injection |
| `images-injection.js` | Script tag | GitHub Pages |

**Total Code Injection size:** ~168,000 characters

## Recommendations & Best Practices

### 1. Never Remove Code Without a Rollback Plan
Before removing any code from the Code Injection header, document exactly what was removed and why. Keep a checklist of items that need to be re-added after the operation is complete.

### 2. Use GitHub Pages for All Large Scripts
Any script over ~200 lines should be hosted on GitHub Pages rather than inline in Code Injection. This:
- Reduces the risk of hitting character limits
- Makes version control easier (changes are tracked in git)
- Allows the file to be edited independently without touching Code Injection

**Current GitHub Pages repo:** `hans0834/riefkohl-law-assets` (deployed from `main` branch)

### 3. Keep CSS Inline, JS External
CSS should remain inline in Code Injection to prevent a "flash of unstyled content" (FOUC) — where the page briefly appears unstyled before the external CSS loads. JavaScript can safely be loaded externally since it runs after the DOM is ready anyway.

### 4. Maintain a Code Injection Manifest
Keep a document listing every component in the Code Injection header, its purpose, its load order dependencies, and where the source file lives locally. This makes it easy to verify nothing was accidentally dropped. A suggested format:

```
1. seo-fixes        — SEO meta tags, H1 fixes, schema     (inline, no dependencies)
2. resources-fix    — Resources page content + styling     (inline, no dependencies)
3. blog-dashboard   — Blog management dashboard            (inline, no dependencies)
4. articles-inject  — Trust Law Series article content     (GitHub Pages, depends on resources-fix)
5. homepage-redesign — Homepage + services page layout     (CSS inline + JS on GitHub Pages)
6. images-injection  — Illustrations for home + services   (CSS inline + JS on GitHub Pages, depends on #5)
```

### 5. Test After Every Deployment
After saving Code Injection changes, always navigate to every affected page and visually verify the changes are live. The pages to check are:
- Homepage (`/`)
- Services (`/services`)
- Resources (`/resources`)
- Any resource subpage (e.g., `/resources/faq`)
- Blog listing (`/blog`)
- A blog post

### 6. Use Separate Sessions for Unrelated Changes
When possible, avoid making large structural changes (like moving scripts to GitHub Pages) in the same session as content additions. This reduces the chance of accidentally losing existing work during complex operations.

### 7. Consider Moving More Code to GitHub Pages
The three large inline scripts (`seo-fixes`, `resources-fix`, `blog-deploy-clean`) could also be moved to GitHub Pages to further reduce Code Injection size and risk. This would bring the inline Code Injection down to just CSS blocks and `<script>` tags, making it much easier to manage and audit.
