# Deployment Guide for riefkohllaw.com

## How It Works
1. All site code lives in this GitHub repo
2. GitHub Pages serves files at https://hans0834.github.io/riefkohl-law-scripts/
3. Squarespace loads scripts via code-injection-header.html
   (in Settings > Advanced > Code Injection > Header)
4. To update the site: edit files here > push to main > changes go live automatically

## Safety Rules
- NEVER modify code-injection-header.html without verifying ALL 14 entries
- NEVER force-push to main
- The js/ and css/ directories are LIVE -- any push immediately affects the site
- Test changes locally before pushing when possible
- The src/ directory contains source HTML files -- these are reference copies,
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
- Private marketing/outreach documents
- Competitive analysis or pricing strategy docs

## Contact
Hans Riefkohl -- hans@riefkohllaw.com
