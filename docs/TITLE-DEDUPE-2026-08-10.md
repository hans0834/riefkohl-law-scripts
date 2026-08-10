# Title suffix de-duplication — prepared 2026-08-10

Squarespace appends the site title (` — Riefkohl Law`) to each page's SEO title.
On these 20 URLs the SEO title *already* ends in the firm name, so the served
`<title>` says it twice. Fix is at source (Squarespace SEO title), because Google
reads the served title, not the one `seo-fixes.js` sets at runtime.

Rule: the Squarespace SEO title must NOT contain "Riefkohl Law".

Two of these also said **"Riefkohl Law LLC"**, which breaks the naming rule —
the firm presents publicly as "Riefkohl Law" only.

## Pages (11) — Page Settings > SEO > SEO Title

| URL | Current SEO title | Replace with |
|---|---|---|
| `/calendly` | Schedule a Legal Consultation | Riefkohl Law, San Juan PR | **Schedule a Legal Consultation — San Juan, PR** |
| `/contact` | Contact Riefkohl Law | San Juan, Puerto Rico Attorney | **Contact Us — San Juan, Puerto Rico Attorney** |
| `/espanol` | Riefkohl Law | Fideicomisos, sucesiones y derecho corporativo PR | **Fideicomisos, sucesiones y derecho corporativo en PR** |
| `/espanol-contacto` | Contacto | Riefkohl Law, San Juan, Puerto Rico | **Contacto — San Juan, Puerto Rico** |
| `/espanol-corporativo` | Derecho corporativo en Puerto Rico | Riefkohl Law LLC | **Derecho corporativo en Puerto Rico** |
| `/espanol-fideicomisos` | Fideicomisos y planificación sucesoral | Riefkohl Law PR | **Fideicomisos y planificación sucesoral en Puerto Rico** |
| `/espanol-quiebras` | Abogado de quiebras en Puerto Rico | Riefkohl Law LLC | **Abogado de quiebras en Puerto Rico** |
| `/espanol-servicios` | Servicios legales en Puerto Rico | Riefkohl Law | **Servicios legales en Puerto Rico** |
| `/government-contracts` | Government Contracts Attorney | Riefkohl Law PR | **Government Contracts Attorney in Puerto Rico** |
| `/resources/avoiding-probate-legitima` | Avoiding Probate & Legitima in Puerto Rico | Riefkohl Law | **Avoiding Probate & Legítima in Puerto Rico** |
| `/resources/types-of-trusts` | Types of Puerto Rico Trusts: Complete Guide 2026 | Riefkohl Law | **Types of Puerto Rico Trusts: Complete Guide 2026** |

## Blog posts (9) — Post Settings > SEO > SEO Title

Strip the trailing ` | Riefkohl Law` / ` | Riefkohl Law PR`:

| URL | Current SEO title | Replace with |
|---|---|---|
| `/blog/anthropic-v-department-of-war-preliminary-injunction` | Anthropic v. Department of War — Court Blocks Government-Wide AI Company Ban | Riefkohl Law | **Anthropic v. Department of War — Court Blocks Government-Wide AI Company Ban** |
| `/blog/clusulas-no-contest-o-in-terrorem-bajo-el-cdigo-civil-de-2020` | Cláusulas No-Contest e In Terrorem en Puerto Rico | Riefkohl Law | **Cláusulas No-Contest e In Terrorem en Puerto Rico** |
| `/blog/estate-planning-mistakes-act-60-holders` | 5 Estate Planning Mistakes Act 60 Holders Make | Riefkohl Law | **5 Estate Planning Mistakes Act 60 Holders Make** |
| `/blog/interpretacin-de-voluntad-testamentaria-bajo-el-cdigo-derogado` | Interpretación de Testamentos bajo el Código Derogado | Riefkohl Law | **Interpretación de Testamentos bajo el Código Derogado** |
| `/blog/irs-scrutiny-act-60-decree-holders-2026` | IRS Scrutiny of Act 60 Holders in 2026 | Riefkohl Law PR | **IRS Scrutiny of Act 60 Holders in 2026** |
| `/blog/lascoli-v-fahr-masonry-partnership-ownership` | Partner Promised Employee Ownership Stake — Was It Enforceable? Lascoli v. Fahr | Riefkohl Law | **Partner Promised Employee Ownership Stake — Was It Enforceable? Lascoli v. Fahr** |
| `/blog/law-firms-take-notice-when-is-someone-a-partner-and-not-just-an-employee` | When Is Someone a Partner vs. Employee? Handler v. Centerview | Riefkohl Law | **When Is Someone a Partner vs. Employee? Handler v. Centerview** |
| `/blog/puerto-rico-asset-protection-trusts` | Puerto Rico Asset Protection Trusts | Riefkohl Law | **Puerto Rico Asset Protection Trusts** |
| `/blog/trust-vs-will-puerto-rico` | Puerto Rico Trust vs. Will: Which Do You Need? | Riefkohl Law | **Puerto Rico Trust vs. Will: Which Do You Need?** |

## Applying

Pages: `POST /api/commondata/SaveCollectionSettings` with the full object from
`GetCollection`, changing only `seoData.seoTitle`. **The `X-CSRF-Token` crumb header
is mandatory** — without it the call returns 200 and saves nothing.

Posts: `PUT /api/content/blogs/{collectionId}/text-posts/{id}` — send the FULL
metadata set (`authorId`, `title`, `urlId`, `tags`, `categories`, `seoData`,
`workflowState`); a partial PUT wipes omitted fields. Do not send `body`/`excerpt`.

Verify by re-fetching each URL and confirming `Riefkohl Law` appears once in `<title>`.