# Riefkohl Law — Where Everything Lives

This guide explains how the riefkohllaw.com custom code works, where every piece lives, and how to make changes without breaking anything.

---

## The Big Picture

Your website runs on Squarespace, but almost all the custom functionality lives in **this GitHub repository**. Squarespace just has a tiny "loader" that tells the browser to fetch your code from GitHub Pages.

```
Visitor loads riefkohllaw.com
  → Squarespace serves the page
  → Code Injection Header loads the loader (code-injection-header.html)
  → Loader fetches CSS from GitHub Pages (all-styles.css)
  → Loader fetches JS from GitHub Pages (11 script files)
  → Scripts run and enhance the page
```

---

## Where Things Live

### 1. Squarespace (you rarely need to touch this)

**Location:** Squarespace → Settings → Advanced → Code Injection → Header

**What's there:** The content of `code-injection-header.html` — just a list of `<link>` and `<script>` tags. About 25 lines total.

**When to edit:** Only if you add/remove a script file from the repo. You would add or remove a `<script>` line.

### 2. GitHub Repository (where you make changes)

**Location:** https://github.com/hans0834/riefkohl-law-scripts

**What's there:** All the actual code — CSS styles and JavaScript.

**When to edit:** Any time you want to change how the site looks or behaves.

### 3. GitHub Pages (automatic, don't touch)

**Location:** https://hans0834.github.io/riefkohl-law-scripts/

**What it does:** Automatically serves the files from your GitHub repo to website visitors. When you push to the `main` branch, GitHub Pages updates within a few minutes.

### 4. Local Working Files (this folder)

**Location:** `~/Downloads/Claude Code/Riefkohl Law updates/`

**What's there:** The original `.html` source files, blog posts, articles, strategy docs, and backups. These are your working copies — the "source of truth" before code gets split into JS/CSS for the GitHub repo.

---

## What Each Script Does

### Styles
| File | Purpose |
|------|---------|
| `css/all-styles.css` | **Combined CSS file** — the ONLY CSS file loaded by the site. Contains all styles from every module below. |
| `css/seo-fixes.css` | Individual module CSS (for reference) |
| `css/homepage-services.css` | Individual module CSS (for reference) |
| `css/images-injection.css` | Individual module CSS (for reference) |
| `css/resources-fix.css` | Individual module CSS (for reference) |
| `css/blog-dashboard.css` | Individual module CSS (for reference) |
| `css/articles-inject.css` | Individual module CSS (for reference) |
| `css/breadcrumb-schema.css` | Individual module CSS (for reference) |
| `css/post-formatter.css` | Individual module CSS (for reference) |
| `css/conversion-booster.css` | Individual module CSS (for reference) |
| `css/email-signup.css` | Individual module CSS (for reference) |

> **Important:** The individual CSS files exist for easier editing and reference. The site only loads `all-styles.css`. When you change a module's CSS, update BOTH the individual file AND `all-styles.css`.

### Scripts (load in this order)

| # | File | What it does | Needs setup? |
|---|------|-------------|-------------|
| 1 | `js/gtm-tracking.js` | Google Tag Manager container + tracks phone clicks, booking clicks, scroll depth, time on page | Yes — replace `GTM-XXXXXXX` with your GTM Container ID |
| 2 | `js/seo-fixes.js` | Fixes H1 tags, meta descriptions, canonical URLs, hreflang tags, FAQ schema for ~90 pages | No |
| 3 | `js/homepage-services.js` | Visual redesign of homepage (hero, cards, pricing tiers) and services page | No |
| 4 | `js/images-injection.js` | Inserts branded illustrations on homepage and services | No |
| 5 | `js/resources-fix.js` | Creates the Resources page subpages (Trusts, Act 60, etc.) and cross-links to articles | No |
| 6 | `js/blog-dashboard.js` | Blog page dashboard with category filtering, search, and bilingual toggle | No |
| 7 | `js/articles-inject.js` | Renders the 15-article Trust Law Series on their respective pages | No |
| 8 | `js/breadcrumb-schema.js` | Adds BreadcrumbList structured data (JSON-LD) for Google | No |
| 9 | `js/post-formatter.js` | Auto-formats the imported case law blog posts (headings, spacing, back links) | No |
| 10 | `js/conversion-booster.js` | Click-to-call phone banner at top of every page, sticky mobile CTA bar (Call / Book), LocalBusiness schema on key pages | No |
| 11 | `js/email-signup.js` | Newsletter signup bar above the footer on every page (except booking pages) | Yes — replace `YOUR_FORM_ACTION_URL` with your email provider's form URL |

---

## How to Make Common Changes

### Change the phone number
Edit `js/conversion-booster.js` — update the `PHONE` and `PHONE_TEL` variables at the top.

### Change the office address
Edit `js/conversion-booster.js` — update the `address` object inside `injectLocalBusinessSchema()`.

### Change the booking link
Edit `js/conversion-booster.js` — update the `BOOK_URL` variable at the top.

### Add SEO metadata for a new page
Edit `js/seo-fixes.js` — add a new entry to the SEO entries array with the page path, H1, meta description, and canonical URL.

### Add a new Trust Law article
Edit `js/articles-inject.js` — add the article content to the articles array, then update `js/resources-fix.js` to add a cross-link.

### Add a new blog post category
Edit `js/blog-dashboard.js` — add the category to the filter list.

### Change styles (colors, fonts, spacing)
Edit the relevant `css/[module].css` file AND update the same section in `css/all-styles.css`.

### Connect your email provider
Edit `js/email-signup.js` — find `YOUR_FORM_ACTION_URL` and replace it with the form action URL from MailerLite, Mailchimp, or ConvertKit.

### Set up Google Tag Manager
Edit `js/gtm-tracking.js` — find `GTM-XXXXXXX` and replace it with your GTM Container ID from tagmanager.google.com.

---

## How to Deploy Changes

### Normal workflow (edit code)
1. Edit the files in the `riefkohl-law-scripts/` folder
2. Open Terminal and run:
   ```
   cd ~/Downloads/Claude\ Code/Riefkohl\ Law\ updates/riefkohl-law-scripts
   git add .
   git commit -m "Description of what you changed"
   git push
   ```
3. Wait 2-3 minutes for GitHub Pages to update
4. Refresh your website to see changes (you may need to hard-refresh: Cmd+Shift+R)

### If you add or remove a script file
1. Do the normal workflow above
2. Also update `code-injection-header.html` to add/remove the `<script>` tag
3. Copy the full content of `code-injection-header.html`
4. Go to Squarespace → Settings → Advanced → Code Injection → Header
5. Replace everything in the Header box with the copied content
6. Click Save

---

## Mapping: Source Files → GitHub Repo Files

If you're looking at the working folder and wondering where things ended up:

| Working File (source) | GitHub Repo File |
|-----------------------|------------------|
| `seo-fixes.html` | `js/seo-fixes.js` + `css/seo-fixes.css` |
| `homepage-services-redesign.html` | `js/homepage-services.js` + `css/homepage-services.css` |
| `images-injection.html` | `js/images-injection.js` + `css/images-injection.css` |
| `resources-fix.html` | `js/resources-fix.js` + `css/resources-fix.css` |
| `blog-deploy-clean.html` | `js/blog-dashboard.js` + `css/blog-dashboard.css` |
| `articles-inject.html` | `js/articles-inject.js` + `css/articles-inject.css` |
| `breadcrumb-schema.html` | `js/breadcrumb-schema.js` + `css/breadcrumb-schema.css` |
| `conversion-booster.html` | `js/conversion-booster.js` + `css/conversion-booster.css` |
| `email-signup-form.html` | `js/email-signup.js` + `css/email-signup.css` |
| `gtm-conversion-tracking.html` | `js/gtm-tracking.js` (no CSS) |

---

## Troubleshooting

### Changes not appearing on the site
1. Check that you pushed to `main` (not a different branch)
2. Wait 2-3 minutes for GitHub Pages to rebuild
3. Hard-refresh the page (Cmd+Shift+R on Mac)
4. Check the browser console (Right-click → Inspect → Console) for errors

### Site looks broken
1. Check the browser console for red error messages
2. The error will tell you which `.js` file has the problem
3. Fix the file, push again
4. If urgent: go to Squarespace Code Injection, temporarily comment out the broken script with `<!-- -->`, and save

### Need to revert a change
```
cd ~/Downloads/Claude\ Code/Riefkohl\ Law\ updates/riefkohl-law-scripts
git log --oneline -10          # see recent commits
git revert <commit-hash>       # undo a specific commit
git push                        # deploy the revert
```

### Want to see what changed
```
cd ~/Downloads/Claude\ Code/Riefkohl\ Law\ updates/riefkohl-law-scripts
git log --oneline -20          # see recent commits
git diff HEAD~1                # see what changed in the last commit
```

---

## Safety Rules

1. **Never delete `code-injection-header.html` content from Squarespace** without having a copy. This is the only connection between Squarespace and your code.
2. **Always push to `main`** — that's the branch GitHub Pages serves.
3. **Keep backups** — the `backups-2026-03-16/` folder in the working directory has copies of all files.
4. **Test before deploying** — open the `.html` source files locally in a browser if you want to preview JS logic changes.
