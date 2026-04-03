# Articles Integration Plan — Riefkohl Law Resources Section

**Date:** 2026-03-15
**Author:** Claude Code (Session 6)
**Status:** IN PROGRESS

---

## Objective

Integrate 14 in-depth legal articles from the `Articles/` folder into the riefkohllaw.com resources section, maximizing visitor engagement and SEO performance while avoiding content redundancy.

---

## Article Inventory (14 Articles)

| # | Title | Words | Topic Category |
|---|-------|-------|---------------|
| 01 | What Is a Puerto Rico Trust? | ~4,800 | Trust Fundamentals |
| 03 | Trust Planning for Act 60 Investors | ~4,200 | Act 60 Planning |
| 04 | Modifying Irrevocable Trusts | ~11,000 | Trust Administration |
| 05 | Avoiding Probate & Legítima | ~5,800 | Estate Planning |
| 06 | Asset Protection Trusts | ~7,200 | Asset Protection |
| 07 | Special Needs Trusts & Medicaid | ~10,500 | Special Planning |
| 08 | ILITs and SLATs | ~12,500 | Advanced Tax Planning |
| 09 | Trust Taxation | ~5,500 | Tax Planning |
| 10 | Landmark Trust Cases | ~12,500 | Case Law |
| 11 | Trust Costs | ~13,000 | Practical Guide |
| 12 | Fiduciary Duties | ~12,000 | Trust Administration |
| 13 | Family Trust Pitfalls | ~15,000 | Risk Avoidance |
| 14 | The Foreign Trust Trap | ~3,500 | International/Tax |
| 15 | Bringing Your Mainland Trust to PR | ~4,500 | Act 60 Planning |

**Total: ~121,500 words of new content**

---

## Redundancy Analysis Summary

**0 articles need to be skipped.** All 14 add substantial new content.

| Overlap Level | Articles | Action |
|---------------|----------|--------|
| None (entirely new topics) | 04, 07, 08, 11, 14 | Add as-is |
| Minor overlap | 03, 09, 13, 15 | Add as-is |
| Significant overlap (existing content is shallow) | 01, 05, 06, 10, 12 | Add + cross-link existing pages |

**Key finding:** Existing resource pages are 100-1,500 word introductions. New articles are 3,500-15,000 word practitioner-grade analyses. No near-duplicates exist.

### Cross-Link Plan for Overlapping Content

1. **Article 05 (Probate/Legítima)** ↔ `/resources-forced-heirship` + blog post 04
2. **Article 06 (Asset Protection)** ↔ `/resources/asset-protection-irrevocable-trusts` + blog post 05
3. **Article 10 (Landmark Cases)** ↔ `/resources-cases` — existing page becomes "teaser" linking to comprehensive article
4. **Article 12 (Fiduciary Duties)** ↔ `/resources-fiduciary-duties` — existing page becomes intro linking to deep dive
5. **Article 01 (What Is a PR Trust)** ↔ `/resources/complete-guide-puerto-rico-trusts` + blog post 06

---

## Organization Strategy

### Category Structure (4 hubs)

The 14 articles form a natural **13-part series** (numbered 1-13, plus 2 standalone articles) about Puerto Rico trust law for Act 60 investors. We organize them into 4 intuitive categories:

#### 1. Trust Foundations (Articles 01, 03, 15)
- What Is a PR Trust? (foundational — entry point)
- Trust Planning for Act 60 Investors (decision framework)
- Bringing Your Mainland Trust to PR (transition guide)

#### 2. Trust Types & Strategies (Articles 04, 06, 07, 08)
- Modifying Irrevocable Trusts (flexibility)
- Asset Protection Trusts (creditor protection)
- Special Needs Trusts & Medicaid (disability/care)
- ILITs and SLATs (advanced estate tax)

#### 3. Legal & Tax Framework (Articles 05, 09, 10, 12, 14)
- Avoiding Probate & Legítima (succession law)
- Trust Taxation (federal + PR tax)
- Landmark Trust Cases (case law)
- Fiduciary Duties (trustee obligations)
- The Foreign Trust Trap (IRS classification)

#### 4. Practical Guides (Articles 11, 13)
- Trust Costs (pricing transparency)
- Family Trust Pitfalls (risk avoidance)

### Article Hub Design

A new "Trust Law Series" section on `/resources` with:
- Dedicated hub card section with series branding
- Category groupings with icons
- Reading order indicators (Part 1 of 13, etc.)
- Progressive disclosure: brief descriptions → click to full article
- Cross-links between related articles and existing resources
- "Start Here" callout for Article 01

---

## SEO Strategy

### Per-Article SEO (added to seo-fixes.html)

Each article page gets:
1. **Unique H1** (injected via resources-fix.html hero)
2. **Unique meta description** (130-155 chars, keyword-rich)
3. **Canonical URL** (self-referencing)
4. **Target keyword** mapped to each article
5. **Article structured data** (schema.org/Article with author, datePublished, publisher)

### Target Keywords by Article

| Article | Target Keyword | Monthly Search Vol (est.) |
|---------|---------------|--------------------------|
| 01 | puerto rico trust fideicomiso | Medium |
| 03 | act 60 trust planning puerto rico | Medium-High |
| 04 | modify irrevocable trust puerto rico | Low-Medium |
| 05 | avoid probate puerto rico legitima | Medium |
| 06 | puerto rico asset protection trust | Medium-High |
| 07 | special needs trust puerto rico medicaid | Low-Medium |
| 08 | irrevocable life insurance trust puerto rico | Low |
| 09 | puerto rico trust taxation act 60 | Medium |
| 10 | puerto rico trust case law | Low |
| 11 | cost of trust puerto rico | Medium |
| 12 | trustee fiduciary duties puerto rico | Low-Medium |
| 13 | family trust mistakes puerto rico | Low-Medium |
| 14 | foreign trust IRS classification puerto rico | Medium |
| 15 | mainland trust puerto rico act 60 | Medium |

### Hub-Level SEO Benefits
- **Internal linking mesh:** Each article links to 3-5 other articles in the series + existing resources
- **Topical authority:** 14 deeply-linked articles on PR trust law signals expertise to Google
- **Long-tail capture:** Each article targets specific questions Act 60 investors search for
- **Content freshness:** New indexable pages with current (2026) legal analysis

---

## Implementation Steps

### Step 1: Convert Articles to PAGES Object Entries
- Convert each markdown/HTML article to JavaScript string content
- Add to the PAGES object in resources-fix.html
- URL pattern: `/resources/[article-slug]`

### Step 2: Create Article Hub Section
- Add new "Trust Law Article Series" section to the `/resources` hub
- Category groupings with descriptions
- Reading order guidance

### Step 3: Cross-Link Existing Resources
- Update 5 existing resource pages with "Deep Dive" links to new articles
- Add "Related Articles" sections

### Step 4: SEO Metadata
- Add meta descriptions and H1 overrides to seo-fixes.html
- Add Article schema markup

### Step 5: Handoff Memo
- Document all decisions and deployment instructions

---

## URL Scheme

```
/resources/what-is-puerto-rico-trust               → Article 01
/resources/act-60-trust-planning                    → Article 03
/resources/modifying-irrevocable-trusts             → Article 04
/resources/avoiding-probate-legitima                → Article 05
/resources/asset-protection-trusts-pr               → Article 06
/resources/special-needs-trusts-medicaid            → Article 07
/resources/ilits-and-slats                          → Article 08
/resources/trust-taxation-act-60                    → Article 09
/resources/landmark-trust-cases                     → Article 10
/resources/trust-costs-puerto-rico                  → Article 11
/resources/fiduciary-duties-trustees                → Article 12
/resources/family-trust-pitfalls                    → Article 13
/resources/foreign-trust-trap                       → Article 14
/resources/mainland-trust-to-puerto-rico            → Article 15
```

---

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Code injection size limit | resources-fix.html is already ~80KB; adding 14 articles could push to ~300KB+. May need to split into separate injection file or lazy-load. |
| Page load performance | Articles are text-heavy; minimal performance impact. Lazy-load article content on navigation. |
| Squarespace page creation | Each `/resources/[slug]` URL needs a corresponding blank Squarespace page. |
| Content accuracy | Articles include reviewer notes and case citations — legal accuracy validated. |

---

## Decision Log

1. **Add all 14 articles (not skip any):** Despite overlap with 5 existing pages, the new articles are 5-50x deeper. They serve a different audience (sophisticated investors, practitioners) vs. existing pages (general public intro).

2. **Organize as "Trust Law Series" hub:** Rather than scatter articles across existing categories, group them as a branded series. This creates a compelling "start-to-finish" reading experience and signals topical authority.

3. **Keep existing resource pages intact:** Rather than replace `/resources-cases` or `/resources-fiduciary-duties` with the new articles, keep the brief intros and add prominent "Read the full analysis →" links. This serves both quick-reference visitors and deep-dive readers.

4. **URL pattern `/resources/[slug]`:** Consistent with existing blog-post resources. Keeps all content under the resources umbrella for SEO topic clustering.

5. **Separate injection file for articles:** Given the volume (~120K words), create a new `articles-inject.html` file rather than bloating resources-fix.html further. This keeps deployment manageable and allows independent updates.
