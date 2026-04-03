# Mission: Consolidate All Riefkohl Law Code into GitHub

You are migrating ALL code, content, and automation for riefkohllaw.com into a
single, well-organized GitHub repository. The goal is to eliminate the fragmented
state where code lives in 3 places (local folder, GitHub, Squarespace editor)
and create a single source of truth that prevents accidental overwrites.

## Context & History

The site riefkohllaw.com runs on Squarespace. Over 12 sessions, code was built
across:

1. **Local folder:** `/Users/hansriefkohl/Downloads/Claude Code/Riefkohl Law updates/`
   (~300 files, ~50MB excluding venv). Contains the "source" HTML files, blog
   post markdown, articles, lead magnets, documentation, Python tools, JSON data,
   and media.

2. **GitHub repo `hans0834/riefkohl-law-scripts`** (main deployment repo):
   Already has 13 JS files, 10 CSS files, code-injection-header.html, blog-posts/,
   files/, README.md, SETUP-GUIDE.md. Served via GitHub Pages at
   https://hans0834.github.io/riefkohl-law-scripts/. This is what Squarespace
   actually loads — the Code Injection Header contains only `<script>` and `<link>`
   tags pointing to this repo's GitHub Pages URL.

3. **Squarespace Code Injection Header:** Contains ONLY the loader HTML from
   `code-injection-header.html` (32 lines of `<script>`/`<link>` tags). All actual
   code is already externalized to GitHub Pages. No other code lives in
   Squarespace's code injector — it's just the loader.

4. **Older repo `hans0834/riefkohl-law-assets`** — redundant, 3 JS files from
   March 16 that are already superseded by riefkohl-law-scripts. **DECISION: Archive it.**

5. **`matter-launch-system/`** — 46MB Python app for legal document assembly.
   **DECISION: Migrate to its own repo at `hans0834/matter-launch-system`.**
   This is a separate project and should not live in the website repo.

## CRITICAL SAFETY RULES (from past incidents)

- **NEVER replace Squarespace's Code Injection Header** without first reading
  and preserving ALL existing scripts. In Session 10→11, two visual scripts were
  accidentally omitted, breaking the homepage for ~24 hours.
- **The code-injection-header.html in GitHub IS the canonical reference** for
  what's in Squarespace. Any update to Squarespace must match this file exactly.
- **All 14 scripts + 1 CSS file must remain in the loader**, in order:
  gtm-tracking.js, all-styles.css, seo-fixes.js, homepage-services.js,
  images-injection.js, resources-fix.js, blog-dashboard.js, articles-inject.js,
  breadcrumb-schema.js, post-formatter.js, conversion-booster.js, email-signup.js,
  service-crosslinks.js, legal-content-fixes.js

---

## Step-by-Step Plan

### PHASE 1: AUDIT & INVENTORY (Read-only, no changes)

#### 1.1 — Catalog what's already in GitHub
- Clone or pull `hans0834/riefkohl-law-scripts` to ensure local copy is current
- List every file in the repo with `git ls-files`
- Record the exact file list and sizes

#### 1.2 — Catalog every file in the local folder
- List all files in `/Users/hansriefkohl/Downloads/Claude Code/Riefkohl Law updates/`
- Classify each file into one of these categories:
  - **A. Already in GitHub** (duplicate of what's in riefkohl-law-scripts)
  - **B. Source HTML** (the original .html files that were compiled into .js/.css)
  - **C. Blog posts** (markdown files ready to publish)
  - **D. Articles** (Trust Law Series source files)
  - **E. Documentation/planning** (handoff memos, audits, checklists, strategies)
  - **F. Lead magnets** (downloadable content pieces)
  - **G. Data files** (JSON, CSV, XML exports)
  - **H. Python tools** (build scripts, converters, servers)
  - **I. Media** (images, illustrations, screenshots, PDFs, logos)
    - Illustrations (27MB) tracked via **Git LFS** — NOT committed as regular git objects
  - **J. Matter-launch-system** (legal document assembly app — migrates to its own repo)
  - **K. Obsolete/temporary** (test files, chunks, base64 encoded, .venv, backups)
  - **L. Credentials/secrets** (cert.pem, key.pem — NEVER commit)

#### 1.3 — Diff check: local JS/CSS vs GitHub JS/CSS
- Compare every file in `github-deploy/js/` and `github-deploy/css/` against
  the corresponding file in `riefkohl-law-scripts/js/` and
  `riefkohl-law-scripts/css/`
- Flag any differences (the github-deploy/ folder may be stale)
- The riefkohl-law-scripts repo is authoritative for deployed code

#### 1.4 — Produce an inventory report
- Create a markdown table showing every file, its category, whether it's already
  in GitHub, and the recommended action (add/skip/archive)
- **Present this to the user for review BEFORE making any changes**

---

### PHASE 2: RESTRUCTURE THE REPOSITORY

After user approval of the inventory, restructure `hans0834/riefkohl-law-scripts`
with this directory layout:

```
riefkohl-law-scripts/
├── code-injection-header.html     # (existing) The Squarespace loader
├── README.md                      # (update) Comprehensive project README
├── SETUP-GUIDE.md                 # (existing)
├── DEPLOYMENT.md                  # (new) How deployment works, safety rules
│
├── js/                            # (existing) Deployed JavaScript modules
│   ├── gtm-tracking.js
│   ├── seo-fixes.js
│   ├── homepage-services.js
│   ├── images-injection.js
│   ├── resources-fix.js
│   ├── blog-dashboard.js
│   ├── articles-inject.js
│   ├── breadcrumb-schema.js
│   ├── post-formatter.js
│   ├── conversion-booster.js
│   ├── email-signup.js
│   ├── service-crosslinks.js
│   └── legal-content-fixes.js
│
├── css/                           # (existing) Deployed CSS
│   ├── all-styles.css
│   └── [module-specific .css files]
│
├── src/                           # (NEW) Source HTML files
│   ├── seo-fixes.html
│   ├── homepage-services-redesign.html
│   ├── images-injection.html
│   ├── resources-fix.html
│   ├── blog-deploy-clean.html
│   ├── articles-inject.html
│   ├── breadcrumb-schema.html
│   ├── conversion-booster.html
│   ├── email-signup-form.html
│   └── legal-content-fixes.html
│
├── blog-posts/                    # (expand) All blog post markdown
│   ├── english/                   # 6 English posts + 25 case law posts
│   ├── spanish/                   # 4 Spanish posts + 9 translations
│   └── README.md                  # Publishing instructions
│
├── articles/                      # (NEW) Trust Law Series source files
│   ├── Article_01_What_Is_PR_Trust.md
│   ├── ...through Article_15...
│   └── README.md
│
├── lead-magnets/                  # (NEW) Lead magnet content
│   ├── act38-2026-checklist.md
│   ├── act60-trusts.md
│   ├── compliance-calendar-2026.md
│   ├── cpa-client-guide.md
│   ├── estate-planning-checklist.md
│   └── pre-move-checklist.md
│
├── files/                         # (existing) PDFs served via GitHub Pages
│   └── handler-v-centerview-2026.pdf
│
├── email/                         # (NEW) Email sequences
│   ├── welcome-sequence.md
│   └── welcome-sequence-cpa.md
│
├── docs/                          # (NEW) Documentation & planning
│   ├── deployment-checklist.md
│   ├── seo-audit-2026-03-13.md
│   ├── implementation-roadmap.md
│   ├── blog-content-strategy.md
│   ├── blog-publishing-guide.md
│   ├── google-business-profile-setup.md
│   ├── directory-listings-content.md
│   ├── homepage-conversion-audit.md
│   └── session-handoffs/
│       ├── session-6.md
│       ├── session-9.md
│       ├── session-10.md
│       └── session-12.md
│
├── tools/                         # (NEW) Python scripts & utilities
│   ├── convert_to_wxr.py
│   ├── build-liability-db-final.py
│   └── serve-posts.py
│
├── data/                          # (NEW) Structured data
│   ├── posts-full.json
│   ├── posts-metadata.json
│   ├── squarespace-import.xml
│   ├── squarespace-import-v2.xml
│   ├── squarespace-import-test.xml
│   └── squarespace-import-v2-test.xml
│
├── media/                         # (NEW) Images & illustrations — tracked via Git LFS
│   ├── illustrations/             # Branded SVG/PNG illustrations (Git LFS)
│   └── logo/                      # Logo files (Git LFS)
│
├── .gitattributes                 # (NEW) Git LFS tracking rules for media
├── .gitignore                     # (NEW) Exclude secrets, .venv, .DS_Store
└── .github/
    └── CODEOWNERS                 # (NEW, optional) Protect main branch
```

---

### PHASE 3: EXECUTE THE MIGRATION

#### 3.1 — Set up Git LFS and create .gitignore/.gitattributes FIRST

```bash
# Initialize Git LFS in the repo
cd riefkohl-law-scripts
git lfs install

# Track image/media file types with LFS
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.jpeg"
git lfs track "*.svg"
git lfs track "*.gif"
git lfs track "*.webp"
git lfs track "*.ico"
git lfs track "media/**"
```

This creates `.gitattributes` with LFS tracking rules. Commit it before adding media files.

```gitignore
# .gitignore
.DS_Store
.venv/
*.pem
cert.pem
key.pem
node_modules/
__pycache__/
*.pyc
backups-*/
```

#### 3.2 — Create new directories and copy files
- For each file in the inventory marked "add", copy it to the correct location
  in the repo
- Use `cp` commands, NOT moves — keep the originals in the local folder as backup
- Do this in batches by category to keep commits logical

#### 3.3 — Commit in logical groups (one commit per category):
1. "Add .gitignore, .gitattributes (Git LFS), and project structure"
2. "Add source HTML files to src/"
3. "Add blog posts (English and Spanish) to blog-posts/"
4. "Add Trust Law Series articles to articles/"
5. "Add lead magnets to lead-magnets/"
6. "Add email sequences to email/"
7. "Add documentation to docs/"
8. "Add Python tools to tools/"
9. "Add structured data and Squarespace XML imports to data/"
10. "Add media assets to media/ (via Git LFS)"
11. "Update README with full project documentation"
12. "Add DEPLOYMENT.md with safety rules and workflow"

#### 3.4 — Migrate matter-launch-system to its own repo
This is a separate step from the main site migration:
1. Create new repo: `gh repo create hans0834/matter-launch-system --public --description "Legal document assembly system for Riefkohl Law"`
2. Copy the entire `matter-launch-system/` directory to a fresh local clone
3. Exclude `.venv/` via .gitignore
4. Commit and push
5. Verify the repo is accessible on GitHub

#### 3.5 — Archive riefkohl-law-assets
```bash
gh repo archive hans0834/riefkohl-law-assets --yes
```
This makes the redundant repo read-only while preserving its history.

#### 3.6 — Push each commit and verify GitHub Pages still works
After EACH push:
- Wait 30 seconds for GitHub Pages to rebuild
- Verify `https://hans0834.github.io/riefkohl-law-scripts/js/seo-fixes.js` loads (HTTP 200)
- Verify `https://hans0834.github.io/riefkohl-law-scripts/css/all-styles.css` loads (HTTP 200)
- If anything breaks, revert immediately with `git revert HEAD`

---

### PHASE 4: VERIFICATION & SAFETY

#### 4.1 — Full deployment verification
- Confirm code-injection-header.html is unchanged (diff against known good)
- Confirm all 13 JS files in js/ are byte-identical to before migration
- Confirm all CSS files in css/ are byte-identical to before migration
- Load riefkohllaw.com and verify the homepage renders correctly

#### 4.2 — Create DEPLOYMENT.md with these rules:

```markdown
# Deployment Guide for riefkohllaw.com

## How It Works
1. All site code lives in this GitHub repo
2. GitHub Pages serves files at https://hans0834.github.io/riefkohl-law-scripts/
3. Squarespace loads scripts via code-injection-header.html
   (in Settings → Advanced → Code Injection → Header)
4. To update the site: edit files here → push to main → changes go live automatically

## Safety Rules
- NEVER modify code-injection-header.html without verifying ALL 14 entries
- NEVER force-push to main
- The js/ and css/ directories are LIVE — any push immediately affects the site
- Test changes locally before pushing when possible
- The src/ directory contains source HTML files — these are reference copies,
  NOT what Squarespace loads

## Script Load Order (must be maintained)
1. gtm-tracking.js (must load first)
2. all-styles.css
3. seo-fixes.js
4. homepage-services.js
5. images-injection.js
6. resources-fix.js
7. blog-dashboard.js
8. articles-inject.js
9. breadcrumb-schema.js
10. post-formatter.js
11. conversion-booster.js
12. email-signup.js
13. service-crosslinks.js
14. legal-content-fixes.js

## What NOT to Commit
- .pem files (SSL certificates/keys)
- .env files
- API keys or credentials
- Virtual environments (.venv/)
```

#### 4.3 — Final inventory reconciliation
Produce a final report listing:
- Every file now in GitHub (riefkohl-law-scripts) ✅
- Every file now in GitHub (matter-launch-system) ✅
- Confirmation that riefkohl-law-assets is archived ✅
- Files intentionally excluded and why (secrets, temp files, backups, private marketing docs)
- Git LFS status: confirm media files are tracked via LFS, not regular git

---

## Files to EXCLUDE from GitHub (with reasons)

| File/Directory | Reason |
|---|---|
| `cert.pem`, `key.pem` | SSL credentials — NEVER commit |
| `.venv/` | Python virtual environment, recreatable |
| `backups-2026-03-16/` | Superseded by git history |
| `deploy_b64.txt` | Base64 encoded deployment artifact, obsolete |
| `rc_*`, `sp-*` files | Temporary chunks, obsolete |
| `test-fixes-preview.html`, `test-preview.html` | Local testing artifacts |
| `act60-planner/` | 46MB binary, separate project |
| `matter-launch-system/` | Migrated to its own repo: `hans0834/matter-launch-system` |
| `riefkohl-docassemble-engine/` | Separate project |
| `Screenshots from April 1 2026/` | 11MB of PNGs, not source code |
| CPA outreach files (`cpa-co-marketing-one-pager.md`, `cpa-referral-outreach-*.md`) | Private/local — outreach materials |
| `linkedin-thought-leadership-program.md`, `linkedin-posts-draft.md` | Private/local — marketing materials |
| `competitors.md` | Private/local — competitive analysis |
| `proprietary-service-branding.md` | Private/local — internal branding strategy |
| `pricing-page-content.md` | Private/local — pricing strategy |
| `testimonial-case-study-templates.md` | Private/local — templates |
| `firm-profile.md` | Private/local — internal positioning |
| `act60-readiness-assessment.md` | Private/local — internal tool |
| `.claude/` | Claude Code config, not project code |
| `activity-log-raw.csv` | Ephemeral data |
| `The.txt` | Unknown/temporary |
| JSON chunk files (`post-*-chunked.json`, `post-*-subpieces.json`) | Derived data |
| `code-injection-header-combined.html` | Obsolete combined version |
| `liability-statement-database.xlsx` | Binary, better tracked separately |
| `Claude_Code_Homepage_Audit_Prompt.docx` | Meta-document, not project code |

---

## SELF-CHECK PROTOCOL

Before declaring the migration complete, run these checks:

```bash
# 1. No changes to deployed files
cd riefkohl-law-scripts && git diff origin/main -- js/ css/ code-injection-header.html
# → Must show NO changes (zero diff)

# 2. GitHub Pages still serving
curl -s -o /dev/null -w "%{http_code}" https://hans0834.github.io/riefkohl-law-scripts/js/seo-fixes.js
# → Must return 200

# 3. CSS still serving
curl -s -o /dev/null -w "%{http_code}" https://hans0834.github.io/riefkohl-law-scripts/css/all-styles.css
# → Must return 200

# 4. Clean commit history
git log --oneline -15
# → Verify commit history is clean and logical

# 5. Total file count
git ls-files | wc -l
# → Record total file count

# 6. No secrets committed
git ls-files | grep -E '\.(pem|env|key)$'
# → Must return NOTHING

# 7. Code injection header matches Squarespace
# Compare code-injection-header.html against the version currently in
# Squarespace (via browser) — must match exactly

# 8. Git LFS is tracking media files correctly
git lfs ls-files
# → Should list all files in media/ directory

# 9. matter-launch-system repo exists and has content
gh repo view hans0834/matter-launch-system --json name,description
# → Must return valid JSON

# 10. riefkohl-law-assets is archived
gh repo view hans0834/riefkohl-law-assets --json isArchived
# → Must show "isArchived": true

# 11. No private/marketing docs accidentally committed
git ls-files | grep -E '(competitors|linkedin|cpa-referral|cpa-co-marketing|pricing-page|firm-profile|proprietary|testimonial)'
# → Must return NOTHING
```

---

## Benefits After Migration

1. **Single source of truth** — no more "is the latest version in the folder or GitHub?"
2. **Git history protects against overwrites** — every change is tracked and revertable
3. **Faster updates** — edit → push → live (no browser automation needed for code changes)
4. **Blog post publishing** — posts stored in git, can be bulk-deployed via Squarespace API or import
5. **Collaboration-ready** — anyone can review changes via pull requests
6. **The matter-launch-system gets its own repo** — clean separation of concerns
7. **Media via Git LFS** — illustrations and logos tracked without bloating git history
8. **Squarespace XML imports preserved** — in data/ for future re-imports if needed
9. **Private docs stay local** — outreach, pricing, and competitive materials never hit a public repo

---

## Resolved Decisions (All 5 confirmed)

| # | Decision | Resolution |
|---|----------|------------|
| 1 | matter-launch-system | Own repo: `hans0834/matter-launch-system` |
| 2 | Illustrations (27MB) | Git LFS in `media/` directory |
| 3 | Squarespace XML imports | Include in `data/` |
| 4 | Outreach/marketing docs | Keep private/local — do NOT commit |
| 5 | Archive riefkohl-law-assets | Yes — archive via `gh repo archive` |
