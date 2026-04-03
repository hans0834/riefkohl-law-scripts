# Riefkohl Law Website Management Guide

**Last updated:** April 3, 2026
**Site:** riefkohllaw.com (Squarespace + GitHub Pages)
**Owner:** Hans Riefkohl, Esq.

---

## Table of Contents

1. [How Your Website Works](#1-how-your-website-works)
2. [Repository Organization](#2-repository-organization)
3. [Making Changes with Claude Code](#3-making-changes-with-claude-code)
4. [Blog Post Management](#4-blog-post-management)
5. [Editing JavaScript & CSS (Site Behavior)](#5-editing-javascript--css-site-behavior)
6. [Routine Maintenance Tasks](#6-routine-maintenance-tasks)
7. [Content Publishing Calendar](#7-content-publishing-calendar)
8. [Emergency Procedures](#8-emergency-procedures)
9. [Appendix: File Reference](#9-appendix-file-reference)

---

## 1. How Your Website Works

Your site uses a two-layer architecture:

```
Visitor loads riefkohllaw.com
        │
        ▼
Squarespace serves the page structure
        │
        ▼
Code Injection Header loads a lightweight loader
        │
        ▼
GitHub Pages serves 13 JS files + 1 CSS file
        │
        ▼
Scripts transform the page (SEO, design, content, tracking)
```

**What this means in practice:**

- **Squarespace** handles hosting, SSL, domain, and basic page structure.
- **GitHub** (`hans0834/riefkohl-law-scripts`) hosts all custom code. Files in the `js/` and `css/` directories are **live** — any push to the `main` branch updates the website within 2–3 minutes.
- **Squarespace's Code Injection Header** contains only a loader (33 lines of `<script>` and `<link>` tags). It points to `https://hans0834.github.io/riefkohl-law-scripts/`. You should rarely need to touch it.

**The golden rule:** Edit code in GitHub, push to `main`, and changes go live automatically. No need to open the Squarespace editor for code changes.

---

## 2. Repository Organization

```
riefkohl-law-scripts/
│
├── js/                          LIVE — JavaScript served to visitors
├── css/                         LIVE — Stylesheets served to visitors
├── code-injection-header.html   Canonical reference for what's in Squarespace
│
├── src/                         Source HTML files (original monolithic versions)
├── blog-posts/                  All blog post content
│   ├── english/                 25 English posts
│   ├── spanish/                 8 Spanish posts
│   ├── case-law/                16 case law analysis posts
│   ├── category-summaries/      18 summary posts (EN + ES)
│   └── squarespace-imports/     44 imported HTML/XML files
│
├── articles/                    15-part Trust Law Series
├── lead-magnets/                6 downloadable content pieces
├── email/                       Welcome email sequences
├── docs/                        Documentation, audits, strategies
│   └── session-handoffs/        Per-session handoff memos
├── tools/                       Python build scripts
├── data/                        JSON metadata, Squarespace XML imports
├── media/                       Illustrations, logo, PDFs
├── files/                       PDFs served via GitHub Pages
│
├── README.md                    Project overview
├── DEPLOYMENT.md                Safety rules and deployment workflow
├── SETUP-GUIDE.md               One-time configuration guide
├── .gitignore                   Files excluded from version control
└── .gitattributes               Git LFS tracking rules
```

### What's live vs. what's reference material

| Directory | Live? | Description |
|-----------|-------|-------------|
| `js/` | **YES** | Pushing changes here immediately affects the website |
| `css/` | **YES** | Pushing changes here immediately affects the website |
| `files/` | **YES** | PDFs accessible via GitHub Pages URLs |
| Everything else | No | Source files, content, docs — organizational only |

---

## 3. Making Changes with Claude Code

Claude Code is your primary tool for managing the website. Here is how to use it effectively for different types of tasks.

### Starting a session

Open Claude Code in the project directory:
```
cd ~/Downloads/Claude\ Code/Riefkohl\ Law\ updates/riefkohl-law-scripts
claude
```

### Types of requests and how to phrase them

**Content changes (blog posts, articles):**
- "Write a new blog post about [topic] targeting [keyword]"
- "Translate blog post 01-act60-estate-planning-mistakes.md to Spanish"
- "Update the CTA in all CPA bridge posts to mention the new phone number"

**Code changes (site behavior, design):**
- "Add a new FAQ schema for the /bankruptcy page in seo-fixes.js"
- "Change the pricing tiers on the services page in homepage-services.js"
- "Update the phone number across all scripts"

**Bulk operations:**
- "Add SEO entries for these 5 new blog posts: [list URLs]"
- "Update all case law posts to use the new disclaimer text"
- "Rewrite the meta descriptions for all Spanish posts"

**Research and audit:**
- "Audit all internal links in the blog posts for broken URLs"
- "Check which blog posts are missing CTAs"
- "Compare what's in seo-fixes.js against what pages actually exist"

### After Claude makes changes

Claude will edit files in the repo. To deploy:

1. **Review the changes** — Claude will show you what was modified.
2. **Ask Claude to commit and push** — Say "commit and push these changes" or use `/commit`.
3. **Wait 2–3 minutes** for GitHub Pages to rebuild.
4. **Hard-refresh the site** (Cmd + Shift + R) to verify.

### Safety tips

- Always ask Claude to **read a file before editing it**. Claude does this automatically, but you can reinforce it: "Read seo-fixes.js and then update the /contact meta description."
- For changes to `js/` or `css/`, ask Claude to **verify GitHub Pages is still serving** after pushing.
- Never ask Claude to modify `code-injection-header.html` without explicitly confirming the full list of 14 scripts will be preserved.

---

## 4. Blog Post Management

### Adding a single blog post

**Step 1: Write the post**

Ask Claude:
> "Write a blog post about [topic]. Target keyword: [keyword]. Category: [Trusts & Estate Planning / Act 60 / etc.]. Language: [English/Spanish]."

Claude will create a markdown file following the established format (SEO metadata block, structured headings, internal links, CTA, disclaimer).

**Step 2: Save to the correct directory**

| Language | Directory |
|----------|-----------|
| English | `blog-posts/english/` |
| Spanish | `blog-posts/spanish/` |
| Case law analysis | `blog-posts/case-law/` |

**Step 3: Add the SEO entry**

Ask Claude:
> "Add an SEO entry for this new post in seo-fixes.js with the title tag, meta description, and slug."

This ensures the post gets a unique H1, meta description, and (optionally) FAQ schema when published on Squarespace.

**Step 4: Publish on Squarespace**

In Squarespace: Pages > Blog > + Add New Post. Copy the title, body content, and configure:
- **SEO Title** (from the metadata block)
- **Meta Description** (from the metadata block)
- **URL Slug** (from the metadata block)
- **Categories and Tags** (from the metadata block)
- **Author:** Hans Riefkohl

Alternatively, ask Claude to publish the post directly via browser if the Claude-in-Chrome extension is available.

### Adding multiple blog posts at once

Ask Claude:
> "Write 5 new blog posts on these topics: [list]. Save them to the appropriate directories and add SEO entries for all of them in seo-fixes.js."

Claude will:
1. Write all posts with proper formatting and metadata
2. Save each to the correct `blog-posts/` subdirectory
3. Add all SEO entries to `seo-fixes.js` in a single edit
4. Commit everything in one logical commit

For Squarespace publishing, you can then:
- Publish them one at a time over several days (recommended for SEO)
- Ask Claude to publish them via browser in sequence
- Use the Squarespace import XML format (files in `data/`)

### Editing a single post

Ask Claude:
> "Update blog post 03-irs-scrutiny-act60.md — change the section about penalties to reflect the 2026 IRS guidance."

Claude will read the post, make the targeted edit, and show you the diff. If the post is already published on Squarespace, you will also need to update it there (copy the changed section into the Squarespace editor).

### Editing many posts at once

Ask Claude:
> "In all English blog posts, replace the CTA 'Schedule a free consultation' with 'Book a free 15-minute strategy call at riefkohllaw.com/calendly'."

or:
> "Add this disclaimer to the bottom of every case law post that doesn't already have one: [disclaimer text]."

Claude will:
1. Scan all relevant files
2. Show you which files will be modified and what changes will be made
3. Apply the changes across all matching files
4. Commit with a descriptive message

**Tip:** For bulk edits to published Squarespace posts, the most efficient approach is to update the markdown source files in GitHub (for your records) and then ask Claude to make the corresponding changes on the live site via browser.

### Blog post format reference

Every blog post should include this metadata block at the top:

```markdown
# [Post Title]

## SEO Metadata
- **Title tag:** [Under 60 characters, includes primary keyword]
- **Meta description:** [Under 160 characters, unique, includes keyword]
- **Slug:** [url-friendly-slug]
- **Target keyword:** [Primary keyword]
- **Category:** [Practice area]
- **Tags:** [tag1, tag2, tag3]
- **Internal links:** [/path1, /path2]

---

[Body content...]

---

**Schedule a free strategy call** — [Book now](/calendly)

*Hans Riefkohl is a Puerto Rico attorney focused on [practice area].*

---

*This article is for informational purposes only and does not constitute legal advice...*
```

---

## 5. Editing JavaScript & CSS (Site Behavior)

### Understanding the script modules

| Script | What to edit it for |
|--------|-------------------|
| `seo-fixes.js` | H1 tags, meta descriptions, FAQ schemas, canonical URLs, hreflang pairs |
| `homepage-services.js` | Homepage layout, service cards, pricing tiers, hero section |
| `images-injection.js` | Which illustrations appear on which pages |
| `resources-fix.js` | Resources page subpages, Act 60 content, cross-links |
| `blog-dashboard.js` | Blog filtering, search, category display |
| `articles-inject.js` | Trust Law Series (15 articles) content and navigation |
| `breadcrumb-schema.js` | Breadcrumb structured data for Google |
| `conversion-booster.js` | Click-to-call banner, sticky CTA, LocalBusiness schema |
| `email-signup.js` | Newsletter signup bar, inline lead magnets |
| `service-crosslinks.js` | "Related services" links on service pages |
| `legal-content-fixes.js` | Statutory corrections, factual fixes across pages |
| `post-formatter.js` | Auto-formatting for case law blog posts |
| `gtm-tracking.js` | Google Tag Manager, conversion event tracking |

### Common code change requests

**"Update my phone number"**
> "Change the phone number from (787) 236-1657 to [new number] across all JS files."

**"Add a new practice area page"**
> "Add an SEO entry for /new-practice-area in seo-fixes.js, add a service card in homepage-services.js, and add cross-links in service-crosslinks.js."

**"Update pricing"**
> "Update the pricing tiers in homepage-services.js — change Trusts from $7,500 to $8,500."

**"Add a new resource subpage"**
> "Add a new subpage for [topic] in resources-fix.js with content about [details]."

### Source HTML files (in `src/`)

The `src/` directory contains the original monolithic HTML files from which the JS/CSS modules were extracted. These are **reference copies only** — they are not loaded by the website. If you need to understand the history of a module or see how it was originally structured, look here. But always edit the files in `js/` and `css/` for live changes.

---

## 6. Routine Maintenance Tasks

### Weekly (15 minutes)

| Task | How |
|------|-----|
| **Check Google Search Console** | Look for crawl errors, new indexed pages, search performance. Fix any 404s by adding redirects or correcting URLs. |
| **Review site in incognito** | Visit riefkohllaw.com in a private window. Confirm homepage loads correctly, scripts are working, no console errors. |
| **Publish 2–3 blog posts** | Follow the content calendar (Section 7). Consistent publishing signals freshness to Google. |

### Monthly (1 hour)

| Task | How |
|------|-----|
| **SEO performance review** | Check Google Search Console for keyword rankings, click-through rates, and impressions. Identify posts gaining traction and double down. |
| **Broken link audit** | Ask Claude: "Audit all internal links across blog posts and articles for broken URLs." |
| **Content freshness check** | Review published posts for outdated legal information (expired deadlines, superseded statutes, changed rates). |
| **Google Business Profile** | Respond to any reviews. Add new photos. Post a monthly update. |
| **Schema validation** | Run 2–3 key pages through [Google's Rich Results Test](https://search.google.com/test/rich-results) to confirm FAQ and LocalBusiness schema are valid. |

### Quarterly (2–3 hours)

| Task | How |
|------|-----|
| **Full SEO audit** | Ask Claude: "Run a full SEO audit — check all meta descriptions, H1s, schema, internal links, and missing entries in seo-fixes.js." |
| **Competitor check** | Review competing firms' websites for new content, features, or keywords you should target. |
| **Content gap analysis** | Ask Claude: "What high-value keywords in trusts, estate planning, and Act 60 don't have a blog post yet?" |
| **Legal content accuracy review** | Check that statutory references, tax rates, filing deadlines, and case citations are current. Ask Claude to flag anything that references a specific year or deadline. |
| **Performance check** | Run the homepage through [PageSpeed Insights](https://pagespeed.web.dev/). If scores drop, investigate which script may be causing issues. |

### Annually

| Task | How |
|------|-----|
| **Legislative update sweep** | At the start of each legislative session and after major bills pass, ask Claude: "Update all references to [law/rate/threshold] across the site." |
| **Content calendar refresh** | Review the content strategy in `docs/blog-content-strategy.md`. Adjust practice area ratios based on which posts are driving the most leads. |
| **Full site backup** | The GitHub repo is your backup. Run `git log --oneline | wc -l` to confirm full history is intact. |

### Maintenance tasks you are currently not doing

Based on the project history, these are high-impact tasks that should be prioritized:

1. **Google Business Profile** — Not yet created. This is the single highest-impact local SEO action you can take. Instructions are in `docs/google-business-profile-setup.md`.

2. **Legal directory listings** — Avvo, Justia, FindLaw, Martindale-Hubbell. Zero listings currently. Instructions in `docs/directory-listings-content.md`.

3. **Google Reviews** — Zero reviews. After creating your GBP, ask satisfied clients for reviews. Even 5–10 reviews will significantly improve local search visibility.

4. **Email marketing setup** — The welcome sequences are written (`email/welcome-sequence.md` and `email/welcome-sequence-cpa.md`) but no email provider is configured. MailerLite is recommended. The signup form code (`email-signup.js`) needs the form action URL.

5. **Blog post publishing** — 69 posts are written and ready but most are not yet published on Squarespace. Every week without publishing is lost indexing time.

6. **Google Search Console URL submission** — After publishing posts, submit new URLs for indexing. This accelerates discovery from weeks to days.

7. **Schema validation** — FAQ schemas and LocalBusiness schema are deployed but have never been validated with Google's testing tools.

8. **Regular content publishing cadence** — Google rewards consistent publishing. Aim for 3–4 posts per week during the initial publishing phase, then 2–3 per week ongoing.

---

## 7. Content Publishing Calendar

### Recommended publishing ratio

| Practice Area | Posts/Month | Priority |
|---------------|-------------|----------|
| Trusts & Estate Planning | 3–4 | Highest (revenue: $7,500–$50,000+) |
| Act 60 Tax Incentives | 2–3 | High (revenue: $5,000+) |
| CPA Bridge Content | 2 | High (referral pipeline) |
| IRS Audit Defense | 1–2 | High (revenue: $10,000–$50,000+) |
| Business Formation | 1–2 | Medium |
| Government Contracts | 1 | Low |
| Spanish translations | 3–4 | Required (bilingual audience) |

### Immediate publishing queue (ready now)

**Week 1:**
1. Complete Guide to PR Trusts (pillar post — publish first)
2. Act 60 Estate Planning Mistakes
3. Fideicomiso Irrevocable PR (Spanish)

**Week 2:**
4. Trust vs. Will in Puerto Rico
5. Planificacion Sucesoral PR (Spanish)
6. IRS Scrutiny of Act 60

**Week 3:**
7. Forced Heirship Estate Plan
8. Ley 60 Guia Inversionistas (Spanish)
9. Asset Protection Trusts
10. Declaratoria de Herederos (Spanish)

**Weeks 4–8:**
Publish case law posts at 1–2 per day, alternating with CPA bridge content.

---

## 8. Emergency Procedures

### The site looks broken

1. **Check GitHub Pages:** Visit `https://hans0834.github.io/riefkohl-law-scripts/js/seo-fixes.js` directly. If it loads, GitHub Pages is fine — the issue is likely in Squarespace.
2. **Check Squarespace Code Injection:** Log into Squarespace > Settings > Advanced > Code Injection > Header. Confirm it matches `code-injection-header.html` exactly.
3. **Check recent commits:** Run `git log --oneline -5` to see what changed recently. If a recent push broke something, revert: `git revert HEAD && git push`.

### A script is causing errors

1. Open the browser console (Cmd + Option + J) on the affected page.
2. Identify which script is throwing errors.
3. Ask Claude: "There's a console error in [script name] on the [page] page: [error message]. Fix it."
4. After fixing, push and verify.

### Code Injection Header was accidentally modified

This is the most critical failure mode. If scripts are missing from the header:

1. Open `code-injection-header.html` in the repo — this is the canonical reference.
2. Copy its **entire contents**.
3. Paste into Squarespace > Settings > Advanced > Code Injection > Header, replacing whatever is there.
4. Save and verify the site.

**All 14 entries must be present.** Missing even one script can break major site features.

### Need to roll back a change

```bash
# See recent commits
git log --oneline -10

# Revert the most recent commit
git revert HEAD
git push

# Revert a specific commit
git revert [commit-hash]
git push
```

Reverts create a new commit that undoes the change — safe and traceable.

---

## 9. Appendix: File Reference

### Script load order (must be maintained)

| # | File | Purpose |
|---|------|---------|
| 1 | `gtm-tracking.js` | Google Tag Manager + conversion tracking |
| 2 | `all-styles.css` | Combined stylesheet |
| 3 | `seo-fixes.js` | SEO (H1s, meta, schema, canonicals, hreflang, FAQ, preconnect) |
| 4 | `homepage-services.js` | Homepage and services visual design + pricing |
| 5 | `images-injection.js` | Branded illustration images |
| 6 | `resources-fix.js` | Resources subpages, cross-links, Act 60 content |
| 7 | `blog-dashboard.js` | Blog dashboard with filtering and search |
| 8 | `articles-inject.js` | 15-article Trust Law Series |
| 9 | `breadcrumb-schema.js` | BreadcrumbList structured data |
| 10 | `post-formatter.js` | Auto-formats imported case law posts |
| 11 | `conversion-booster.js` | Click-to-call banner, sticky mobile CTA, LocalBusiness schema |
| 12 | `email-signup.js` | Newsletter bar + inline blog lead magnets |
| 13 | `service-crosslinks.js` | Related services links on service pages |
| 14 | `legal-content-fixes.js` | Statutory corrections, HB 505, CPA audit fixes |

### Key documentation files

| File | What it contains |
|------|-----------------|
| `docs/deployment-checklist.md` | All remaining owner tasks with status |
| `docs/blog-publishing-guide.md` | Step-by-step Squarespace publishing instructions |
| `docs/blog-content-strategy.md` | Content calendar, keyword targets, publishing ratios |
| `docs/seo-audit-2026-03-13.md` | Full SEO audit findings |
| `docs/google-business-profile-setup.md` | GBP creation instructions |
| `docs/directory-listings-content.md` | Attorney bio for legal directories |
| `docs/homepage-conversion-audit.md` | Homepage UX/conversion analysis |
| `email/welcome-sequence.md` | 5-email welcome sequence for subscribers |
| `email/welcome-sequence-cpa.md` | CPA-specific welcome sequence |

### Related repositories

| Repository | Purpose |
|------------|---------|
| `hans0834/riefkohl-law-scripts` | Main site code, content, and documentation |
| `hans0834/matter-launch-system` | Legal document assembly system |
| `hans0834/riefkohl-law-assets` | Archived — superseded by riefkohl-law-scripts |
