# Session 7 Implementation Plan — March 15, 2026 Blog Posts

## Overview
Add 25 new case law blog entries from the `blog-posts/March 15 2026/` subfolder to the Riefkohl Law site. These include:
- **9 category summary files** (multi-case compilations by topic)
- **16 individual case analysis files** (standalone case summaries)

## Content Inventory

### Category Summary Files (Pillar Content)
| File | Topic | Approx Cases |
|------|-------|-------------|
| Banking & Insurance Disputes - Summaries.md | Bank fraud, surety bonds, insurance trust disputes | 5+ |
| Breach of Fiduciary Duty - Summaries.md | Trustee duty of care, imprudent investments | 5+ |
| Procedural Beneficiary & Liquidation - Summaries.md | Trust litigation procedure, standing | 3+ |
| Public & Governmental Trust Governance - Summaries.md | Public trusts, pension funds, government trustees | 5+ |
| Standalone Cases - Summaries.md | Miscellaneous trust law cases | 3+ |
| Testamentary & Succession Disputes - Summaries.md | Wills, forced heirship, inheritance | 5+ |
| Trust Property Disputes - Summaries.md | Real property in trust, disputes | 3+ |
| Trust Validity Challenges - Summaries.md | Trust formation, registration, nullity | 3+ |
| Trust in Family Law & Trustee Removal - Summaries.md | Divorce, trustee removal, family trusts | 3+ |

### Individual Case Files
| File | Jurisdiction | Topic Area |
|------|-------------|------------|
| alevras-cga-associates-v-brewster-jr.md | NJ Appellate | Independent contractor vs employee |
| american-health-law-assn-v-estate-of-cunningham.md | Federal | Health law / estate |
| andersen-estate-eileen-andersen-pr.md | PR | Estate administration |
| antero-resources-v-pike-case-08.md | Federal | Trust/resource disputes |
| chaires-v-champion-realty.md | State | Real property / trust |
| commonwealth-v-valenti.md | State | Government / trust |
| estate-of-wallace-lucas-sr.md | State | Estate administration |
| in-re-el-a-minor-ch-v-jn.md | State | Minor beneficiary |
| in-re-kirton-morris-v-housing-authority.md | State | Housing / trust |
| integrated-health-services-v-estate-of-desantis.md | Federal | Health services / estate |
| mcarthur-as-pr-of-estate-of-clarence-maurice-logan-jr.md | State | Personal representative |
| murphy-dependent-of-harold-r-murphy.md | State | Dependent / estate |
| parra-v-rapid-casting-rapid-american-corp.md | State | Corporate / trust |
| pereira-v-pereira.md | State | Family trust dispute |
| shabani-v-burton-trustee.md | CA Appellate | Trust property / specific performance |
| williams-as-successor-pr-of-estate-of-adams-shirer.md | State | Successor PR / estate |

## SEO Strategy

### For Each Post — Add SEO Metadata Block
Following the established format from posts 01-10:
```markdown
## SEO Metadata
- **Title tag:** [60 chars max, keyword-front-loaded]
- **Meta description:** [155 chars max, includes CTA]
- **Target keyword:** [primary search term]
- **Secondary keywords:** [2-3 related terms]
- **Category:** [from existing taxonomy]
- **Tags:** [5-7 relevant tags]
- **Internal links:** [relevant site pages]
```

### Categories to Use
- Trust Law (primary for most)
- Estate Planning
- Case Analysis
- Fiduciary Duty
- Asset Protection
- Government Contracts (where relevant)

### Tags Strategy
High-value tags to target:
- puerto-rico-trust-law, fideicomiso, fiduciary-duty, breach-of-trust
- estate-planning, succession, forced-heirship, legitima
- trustee-removal, trust-validity, trust-registration, ODIN
- asset-protection, irrevocable-trust, trust-property
- case-analysis, court-decision, appellate-court
- banking-trust, insurance-trust, public-trust

### Content Enhancements for SEO
1. **Introductions** — Add 2-3 sentence SEO-friendly intro connecting the case to practical Puerto Rico trust law
2. **Internal links** — Link to /puerto-rico-trusts, /resources, /estate-planning, relevant articles
3. **Call-to-action** — Add consultation CTA at end of each post
4. **Related reading** — Cross-link between related case summaries
5. **Practitioner takeaways** — Ensure actionable key points for search intent

### SEO Fixes File Updates
Add entries to `seo-fixes.html` for each new blog post URL with:
- Unique H1 tags
- Unique meta descriptions
- Canonical URLs

## Execution Steps
1. Process all 9 category summary files — add SEO metadata, intro, CTA, internal links
2. Process all 16 individual case files — add SEO metadata, intro, CTA, internal links
3. Update seo-fixes.html with entries for all 25 new posts
4. Create deployment handoff memo
5. Update memory with session 7 status

## Deployment Notes (for Owner)
- Each file becomes a Squarespace blog post
- Paste markdown content into Squarespace blog editor
- Set title tag and meta description in Page Settings > SEO
- Assign categories and tags in blog post settings
- Set publish date to stagger posts (2-3 per week for SEO)
- Recommended publish order: category summaries first (pillar content), then individual cases

## Decision Log
- **Category summaries as pillar content**: These multi-case compilations serve as authoritative topic pages that individual case posts can link back to, creating topic clusters for SEO
- **Individual cases as standalone posts**: Each case provides long-tail keyword targeting and fresh content signals
- **English only**: All source content is in English; Spanish translations can be a future session
- **Blog vs Articles section**: These go in the blog (not the Trust Law Series articles section) because they are case analyses/commentary, not educational articles
