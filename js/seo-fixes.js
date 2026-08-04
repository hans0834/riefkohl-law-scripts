/* ============================================================================
   STAGING-DOMAIN GUARD  —  added 2026-07-26
   Problem: the Squarespace built-in domain (octagon-parakeet-dn35.squarespace.com)
   serves every page with HTTP 200. It already emits a correct rel=canonical to
   www.riefkohllaw.com, but Google has indexed it anyway and it ranks on page 1
   for the brand query, competing with the real site.
   Squarespace has no setting that 301s the built-in domain, so this is the
   strongest lever available: noindex it, then send visitors to the real host.

   Safety: no-op on www.riefkohllaw.com. Never redirects the Squarespace editor
   or a logged-in author. Wrapped so it can never throw and can never block the
   rest of this file.
   Bypass for manual testing: append ?nostagingredirect=1
   ========================================================================== */
(function () {
  try {
    if (!/(^|\.)squarespace\.com$/i.test(location.hostname)) return;   // live site → nothing to do

    // Always mark this host as non-indexable, even when we do not redirect.
    if (!document.querySelector('meta[name="robots"][data-staging-guard]')) {
      var m = document.createElement('meta');
      m.setAttribute('name', 'robots');
      m.setAttribute('content', 'noindex, nofollow');
      m.setAttribute('data-staging-guard', '1');
      (document.head || document.documentElement).appendChild(m);
    }

    // Do NOT redirect when someone is actually working on the site.
    if (/[?&]nostagingredirect=1/.test(location.search)) return;       // explicit bypass
    if (window.self !== window.top) return;                            // editor renders in an iframe
    if (/^\/config(\/|$)/.test(location.pathname)) return;             // Squarespace admin
    try {
      var ctx = window.Static && window.Static.SQUARESPACE_CONTEXT;
      if (ctx && ctx.authenticatedAccount) return;                     // logged-in author
    } catch (e) {}

    var target = 'https://www.riefkohllaw.com' +
                 location.pathname + location.search + location.hash;
    if (location.href !== target) location.replace(target);
  } catch (e) { /* never break the site */ }
})();

/* Preconnect hints — start DNS/TLS early for key external resources */
(function(){
/* EDITOR GUARD: never run inside the Squarespace editor (same-origin frame under /config). Fails open. */
try { if (window.self !== window.top && window.top.location.pathname.indexOf('/config') === 0) return; } catch (e) {}
  var hints = [
    { rel: 'preconnect', href: 'https://images.squarespace-cdn.com' },
    { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    { rel: 'dns-prefetch', href: 'https://calendly.com' }
  ];
  hints.forEach(function(h) {
    if (!document.querySelector('link[rel="' + h.rel + '"][href="' + h.href + '"]')) {
      var link = document.createElement('link');
      link.rel = h.rel;
      link.href = h.href;
      if (h.rel === 'preconnect') link.crossOrigin = '';
      document.head.appendChild(link);
    }
  });
})();

(function(){
/* EDITOR GUARD: never run inside the Squarespace editor (same-origin frame under /config). Fails open. */
try { if (window.self !== window.top && window.top.location.pathname.indexOf('/config') === 0) return; } catch (e) {}
'use strict';

/* Module-scope current path. The content-correction functions near the bottom of
   this file (fixAct60ExemptionPercentages, fixNRNCClassification, fixCorporateTaxRate,
   fixAdvertisingLanguage) reference `path` without declaring it. Without this
   declaration they threw ReferenceError on every page load, which aborted the rest
   of the module — killing injectHreflang(), both runFixes() retry timers, and all
   four legal content corrections. Functions that declare their own `var path`
   simply shadow this one, so their behaviour is unchanged. */
var path = window.location.pathname.replace(/\/$/, '') || '/';

/* ================================================
   PAGE-SPECIFIC SEO CONFIGURATION
   ================================================ */
var SEO = {
  '/': {
    h1: 'Puerto Rico Law Firm — Trusts, Estate Planning & Business Law',
    title: 'Puerto Rico Trusts, Estate Planning & Act 60 Attorney | Riefkohl Law',
    meta: 'Puerto Rico attorney for trusts, estate planning, and Act 60 tax incentives. Flat-fee pricing, bilingual service, free strategy call. (787) 236-1657.',
    schema: null
  },
  '/services': {
    h1: 'Legal Services & Flat-Fee Pricing',
    meta: 'Transparent flat-fee legal services in Puerto Rico. Trusts, estate planning, business formation, Act 60 advisory, and government contracts.',
    schema: null
  },
  '/about': {
    h1: 'About Hans E. Riefkohl — Founder & Managing Attorney',
    title: 'About Hans Riefkohl — Puerto Rico Attorney | Riefkohl Law',
    meta: 'Attorney Hans Riefkohl brings experience from DLA Piper, LUMA Energy, and the federal courts to his Puerto Rico trusts, estate planning, and corporate law practice.',
    schema: null
  },
  '/about-us': {
    h1: 'About Hans E. Riefkohl — Founder & Managing Attorney',
    meta: 'Attorney Hans Riefkohl brings experience from DLA Piper, LUMA Energy, and the federal courts to his Puerto Rico trusts, estate planning, and corporate law practice.',
    schema: null
  },
  '/contact': {
    h1: 'Contact Riefkohl Law in San Juan, Puerto Rico',
    title: 'Contact a Puerto Rico Attorney — San Juan | Riefkohl Law',
    meta: 'Contact Riefkohl Law in San Juan, PR. Call (787) 236-1657 or book a free strategy call for estate planning, trusts, and business law.',
    schema: null
  },
  '/blog': {
    h1: 'Puerto Rico Legal Blog — Case Analysis & Commentary',
    meta: 'Legal analysis, case summaries, and practical guidance on Puerto Rico trusts, estate planning, government contracts, and business law.',
    schema: null
  },
  '/resources': {
    h1: 'Legal Resources — Guides, FAQs & Tools',
    meta: 'Free legal resources for Puerto Rico estate planning, trusts, and business law. Guides, FAQs, glossary, and practical tools.',
    schema: null
  },
  '/calendly': {
    h1: 'Schedule a Free Legal Consultation',
    title: 'Schedule a Free 30-Minute Consultation | Riefkohl Law',
    meta: 'Book a complimentary strategy call with Riefkohl Law. Discuss your Puerto Rico trust, estate plan, or business matter. No obligation.',
    schema: null
  },
  '/puerto-rico-trusts': {
    h1: 'Puerto Rico Trust Attorney — Fideicomisos & Asset Protection',
    title: 'Puerto Rico Trust Attorney — Fideicomisos | Riefkohl Law',
    meta: 'Puerto Rico trust attorney: irrevocable trusts under Law 219-2012, asset protection, and flat-fee fideicomiso setup. Free consultation — (787) 236-1657.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is an irrevocable trust under Puerto Rico Law 219-2012?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'An irrevocable trust under Puerto Rico Law 219-2012 (the Puerto Rico Trust Act) is a legal arrangement where a grantor (fideicomitente) permanently transfers assets to a trustee (fiduciario) for the benefit of designated beneficiaries. Once established, the grantor generally cannot modify or revoke the trust without beneficiary consent, providing strong asset protection and estate planning benefits.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do Puerto Rico trusts differ from U.S. mainland trusts?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico trusts operate under a civil law framework (Law 219-2012) rather than common law. Key differences include: forced heirship (the legítima) constrains trust planning, the trust is an autonomous estate rather than a fiduciary relationship, and Puerto Rico trusts can offer distinct asset protection and tax planning advantages for residents and Act 60 decree holders. Revocability also works differently: trusts were irrevocable by default through January 29, 2027, but under Act 153-2026 a trust is presumed revocable from January 30, 2027 unless the deed expressly says otherwise.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What are the tax benefits of a Puerto Rico trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico trusts can provide several tax advantages, including potential estate tax savings, income tax deferral or reduction for trust assets, and asset protection from creditors. For Act 60 decree holders, properly structured trusts can help preserve tax incentive benefits while achieving estate planning goals. The specific benefits depend on the trust structure, the grantor\'s residency, and the nature of the assets.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can a Puerto Rico trust protect assets from creditors?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. An irrevocable trust established under Puerto Rico Law 219-2012 can provide significant asset protection. Once assets are properly transferred to an irrevocable trust, they are generally beyond the reach of the grantor\'s personal creditors, subject to fraudulent transfer limitations. The trust must be properly structured and funded to achieve this protection.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much does it cost to set up a trust in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico trust costs vary by complexity. At Riefkohl Law, attorney fees for a trust start at a flat $1,800 and increase for more complex structures\u2014multi-generational trusts, asset protection trusts, or trusts integrated with Act 60 planning. These figures are representative examples of what many engagements look like; the fee for each matter is determined by your specific circumstances. Separate third-party costs apply, including notarial execution fees ($300\u2013$2,000) and ODIN registration ($50\u2013$100). You receive a flat-fee quote before work begins.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is forced heirship (leg\u00edtima) and how does it affect my trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico\u2019s forced heirship rules (leg\u00edtima) under the 2020 Civil Code reserve one-half of the estate for forced heirs\u2014children and the surviving spouse share equally. An irrevocable trust can work alongside these rules, but the trust must be structured so that it does not circumvent the leg\u00edtima. Proper planning with a Puerto Rico trust attorney ensures your trust respects forced heirship while achieving your estate planning goals.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I move my mainland trust to Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'It depends. Puerto Rico enacted Section 45147 of the Trust Act to facilitate trust migrations, but mainland common-law trusts and Puerto Rico civil-law trusts differ in fundamental ways. A mainland revocable trust may not receive the same protections under PR law. In many cases, it is more effective to create a new Puerto Rico irrevocable trust and fund it with mainland assets rather than attempting a direct migration. An attorney experienced in both systems can evaluate your specific situation.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I need a Puerto Rico trust if I already have an Act 60 decree?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A trust is not required for Act 60, but it is strongly recommended for estate planning. Without a trust, your Puerto Rico assets pass through probate under civil law, subject to forced heirship. Act 60 decree holders with IRI (Individual Resident Investor) status can establish revocable trusts under PR law\u2014an option not available to non-decree holders. A properly structured trust can protect assets, avoid probate, and preserve Act 60 tax benefits for the next generation.'
          }
        }
      ]
    }
  },
  '/estate-planning': {
    h1: 'Estate Planning Attorney in Puerto Rico',
    title: 'Puerto Rico Estate Planning & Wills Attorney | Riefkohl Law',
    meta: 'How to protect your assets and avoid forced heirship in Puerto Rico. Trusts, wills, probate avoidance, and Act 60 estate strategies. Bilingual attorney \u2014 free consultation.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is forced heirship in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Forced heirship (legitima) under Puerto Rico\'s Civil Code (Ley 55-2020) reserves one-half of the estate for forced heirs — children and the surviving spouse, who share the legitima equally. The remaining half can be distributed freely. This is more flexible than the rule under the prior 1930 Civil Code, which divided the estate into thirds and left only one-third freely disposable.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I need a will if I have a trust in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Even with a trust, a pour-over will is recommended to capture any assets not transferred to the trust during your lifetime. The will serves as a safety net, directing remaining assets into your trust upon death. It can also appoint guardians for minor children.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much does estate planning cost in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Riefkohl Law offers flat-fee estate planning services, providing cost transparency from the start. The fee depends on the complexity of your plan — a basic will differs in cost from a comprehensive trust-based estate plan. Contact us for a free strategy call to discuss your needs and receive a specific quote.'
          }
        }
      ]
    }
  },
  '/act-60-tax-incentives': {
    h1: 'Act 60 Tax Incentives — 4% Corporate Rate & Individual Investor Decrees in Puerto Rico',
    title: 'Puerto Rico Act 60: 4% Rate & Investor Decrees | Riefkohl Law',
    // 2026-08-02: rewritten for CTR. The page's impressions come mostly from the
    // export-services / software 4%-corporate cluster, but the old meta led with
    // individual-investor capital gains — a query/snippet mismatch (3,424 impr, 0.4% CTR).
    // Title left unchanged: it lifted reach/rank in late June and is still settling.
    meta: 'Puerto Rico Act 60: 4% corporate rate for export-services and software firms, 0% capital gains if you file by Dec 31, 2026. Do you qualify? Free call.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is Act 60 in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Act 60 (the Puerto Rico Incentives Code of 2019) consolidates former Acts 20 and 22, providing tax incentives for businesses and individuals who relocate to Puerto Rico. Export service businesses can receive a 4% fixed corporate income tax rate under Chapter 3. For individual investors under Chapter 2, applications filed by December 31, 2026 may still qualify for 0% on capital gains; starting January 1, 2027, new decrees will carry a 4% preferential tax rate on passive income. The program has been extended through 2055. Consult an attorney to verify current eligibility and terms.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does the Act 60 4% corporate tax rate apply to software and SaaS companies?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Under Act 60 Chapter 3, Puerto Rico export-services businesses — including software development, SaaS, IT consulting, and other technology firms that serve clients located outside Puerto Rico — can qualify for a 4% fixed corporate income tax rate, plus a 100% Puerto Rico income tax exemption on distributions of qualifying earnings to bona fide PR-resident shareholders. Software and technology companies are among the most common Act 60 export-services applicants. An attorney can confirm whether your specific activities qualify.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What qualifies as an export service under Act 60 Chapter 3?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Export services are services performed from Puerto Rico for clients located outside Puerto Rico. Common qualifying activities include software development, IT and cloud services, consulting, research and development, marketing, and investment management. The service generally cannot have a nexus to the local Puerto Rico market, and at least 80% of the entity\'s gross revenue must come from clients outside Puerto Rico. An attorney can confirm whether your specific activities qualify.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I qualify for Act 60 individual investor benefits?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'To qualify, you must become a bona fide resident of Puerto Rico by satisfying all three tests under IRC §937: (1) one of five alternative presence tests under Treas. Reg. §1.937-1(c)\u2014the most common being physical presence for at least 183 days per year (alternatives include a 549-day/3-year average, a 90-day U.S. limitation, an earned income limitation, and a no-significant-connection standard), (2) a tax home in Puerto Rico, and (3) a closer connection to Puerto Rico than to the United States or any foreign country, assessed under a totality-of-circumstances analysis based on factors in Treas. Reg. §301.7701(b)-2(d). All three tests must be met. Additional decree obligations such as charitable donations and property purchase also apply. Consult an attorney to confirm current eligibility requirements.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can an Act 60 lawyer help with IRS audits?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. The IRS actively scrutinizes Act 60 decree holders, particularly regarding income sourcing and residency compliance. An experienced Act 60 attorney can help ensure your documentation supports your residency position, structure your affairs for compliance, and represent you if the IRS challenges your Act 60 benefits.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How long does the Act 60 application process take?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The Act 60 decree application is filed with Puerto Rico\'s Department of Economic Development and Commerce (DDEC). While DDEC\'s administrative target is 60\u2013120 days, actual processing times frequently range from several months to over a year from application submission to final decree issuance. The application submission date\u2014not the decree issuance date\u2014is the relevant date for grandfathering under Act 38-2026. An attorney who regularly files Act 60 applications can help avoid common delays by ensuring all documentation is complete and properly formatted from the start.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I need to sell my mainland home to qualify for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'You are not strictly required to sell your mainland home, but maintaining a home in your former state is one of the factors the IRS considers when evaluating your closer connection to Puerto Rico. Keeping a mainland home — especially as a primary residence — can weaken your residency position. Many Act 60 holders sell or convert their mainland property to a rental to reduce audit risk.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I keep my mainland business and still get Act 60 benefits?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, but the income must be properly sourced. For Chapter 3 (export services), your business must serve clients outside Puerto Rico and meet local employment requirements. For Chapter 2 (individual investor), income sourcing rules determine which capital gains qualify for preferential rates. Proper structuring with an Act 60 attorney is essential to ensure your business arrangement supports your decree.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens if I fail the Act 60 residency test?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'If the IRS determines you are not a bona fide resident of Puerto Rico, your Act 60 tax benefits can be retroactively revoked. This means capital gains, dividends, and other income you reported as exempt would be subject to full federal taxation, plus interest and potential penalties. Maintaining thorough residency documentation and working with local counsel helps protect against this risk.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much does an Act 60 lawyer cost in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Riefkohl Law offers flat-fee pricing for Act 60 services. Decree application and advisory work starts at a flat $1,700, excluding U.S. residency and income-sourcing tax advice, which are scoped and quoted separately. This is a representative example of what many engagements look like; the fee for each matter is determined by your specific circumstances. Ongoing compliance and IRS audit defense are quoted separately. All fees are quoted upfront before work begins — no hourly billing or hidden charges.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the difference between Act 60 Chapter 2 and Chapter 3?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Chapter 2 (Individual Investor) provides capital gains and passive income benefits to individuals who become bona fide PR residents. Chapter 3 (Export Services) provides a 4% corporate tax rate and 100% Puerto Rico income tax exemption on distributions of qualifying export service earnings to shareholders who are bona fide PR residents\u2014federal tax consequences depend on shareholder status and entity classification. To qualify, at least 80% of the entity\u2019s revenue must be derived from clients located outside Puerto Rico. Many relocating business owners apply for both chapters to cover personal investment income and business income separately.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does Act 60 apply to cryptocurrency and digital assets?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Capital gains from cryptocurrency, NFTs, and other digital assets can qualify for Act 60 Chapter 2 benefits, but only gains that accrue after you become a bona fide Puerto Rico resident. Pre-move appreciation remains subject to federal capital gains tax under the 10-year lookback rule (Treas. Reg. \u00a71.937-2(f))\u2014gains on assets owned before establishing PR residency are not treated as Puerto Rico-source income for federal purposes. Taxpayers may elect to split-source gains using the possession holding period method. See IRS AM 2024-005 (Dec. 2024). The IRS pays close attention to crypto holders claiming Act 60 benefits, making proper cost basis tracking and residency documentation critical.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does the Act 60 4% corporate tax rate apply to export services and software development companies?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Under Act 60 Chapter 3, Puerto Rico export-services businesses — including software development, SaaS, IT consulting, and other technology companies that serve clients located outside Puerto Rico — can qualify for a 4% corporate income tax rate, plus a 100% Puerto Rico income tax exemption on distributions of qualifying earnings to bona fide PR-resident shareholders. At least 80% of the entity\'s revenue must come from clients outside Puerto Rico. Software and technology firms are among the most common Act 60 export-services applicants. Consult an attorney to confirm your activities qualify and to structure the decree correctly.'
          }
        }
      ]
    }
  },
  '/act-60-export-services': {
    h1: 'Act 60 Export Services — 4% Corporate Tax Rate in Puerto Rico',
    title: 'Act 60 Export Services — 4% Puerto Rico Tax | Riefkohl Law',
    meta: 'Puerto Rico Act 60 Chapter 3 for export services, software, SaaS & IT firms: 4% corporate tax, 100% distribution exemption, filing, compliance & IRS defense. Free call.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Does the Act 60 4% corporate tax rate apply to software and SaaS companies?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Under Act 60 Chapter 3, Puerto Rico export-services businesses — including software development, SaaS, IT consulting, and other technology firms that serve clients located outside Puerto Rico — can qualify for a 4% corporate income tax rate, plus a 100% Puerto Rico income tax exemption on distributions of qualifying earnings to bona fide PR-resident shareholders. Software and technology companies are among the most common Act 60 export-services applicants.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What qualifies as an export service under Act 60 Chapter 3?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Export services are services performed from Puerto Rico for clients located outside Puerto Rico. Common qualifying activities include software development, IT and cloud services, consulting, research and development, marketing, investment management, and other professional services. The service generally cannot have a nexus to the local Puerto Rico market. An attorney can confirm whether your specific activities qualify.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the 80% rule for Act 60 export services?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'To hold a Chapter 3 export-services decree, at least 80% of the entity\'s gross revenue must come from clients located outside Puerto Rico. Businesses that also serve local Puerto Rico clients must monitor this threshold, because falling below 80% can jeopardize the decree. Proper structuring and bookkeeping help ensure ongoing compliance.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much does an Act 60 export services decree cost?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Riefkohl Law offers flat-fee pricing for Act 60 Chapter 3 export-services decrees. Decree application and advisory work starts at a flat $1,700, excluding U.S. residency and income-sourcing tax advice, which are scoped and quoted separately. This is a representative example of what many engagements look like; the fee for each matter is determined by your specific circumstances. All fees are quoted upfront before work begins. Government filing fees, annual reports, and ongoing compliance are billed separately.'
          }
        }
      ]
    }
  },
  '/act-60-individual-investor': {
    h1: 'Act 60 Individual Investor — Capital Gains Tax Benefits in Puerto Rico',
    title: 'Act 60 Investor Decree — 0% Capital Gains | Riefkohl Law',
    meta: 'Act 60 Chapter 2 for individual investors: 0% capital gains, file your decree before the Dec 31, 2026 deadline, residency compliance & IRS defense. Free call.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        { '@type': 'Question', 'name': 'What tax benefits does the Act 60 Individual Investor decree provide?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'As a bona fide Puerto Rico resident holding an Act 60 Chapter 2 (Individual Resident Investor) decree, you can receive a 0% Puerto Rico tax rate on capital gains, interest, and dividends that accrue after you establish residency. Decrees granted from 2027 onward carry a 4% rate on capital gains instead of 0%. The benefits apply only to gains that accrue after your move — not to appreciation built up before you relocated.' } },
        { '@type': 'Question', 'name': 'Is there a deadline to apply for the Act 60 investor decree?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Act 38-2026 extended the Act 60 program through 2055, so the incentive is not expiring. But the headline 0% capital-gains rate applies to decrees issued through December 31, 2026; decrees granted in 2027 and later carry a 4% rate. If locking in the 0% rate matters to your plan, the decree should be applied for and issued before year-end 2026.' } },
        { '@type': 'Question', 'name': 'How do I qualify as a bona fide Puerto Rico resident?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'You must satisfy three tests under IRC Section 937: the presence test (most commonly at least 183 days in Puerto Rico during the year), the tax-home test (your main place of business is in Puerto Rico), and the closer-connection test (stronger ties to Puerto Rico than to the U.S. mainland or any foreign country). Your decree benefits depend on maintaining bona fide residency every year.' } },
        { '@type': 'Question', 'name': 'Do my existing pre-move capital gains qualify for the 0% rate?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Generally no. The Puerto Rico exemption applies to gains that accrue after you become a bona fide resident. Appreciation built up before your move remains subject to U.S. federal tax, and gains realized within 10 years of becoming a resident are subject to federal tax under the source rules (Treas. Reg. Section 1.937-2(f)). Timing the sale and documenting your basis at the move date are critical.' } },
        { '@type': 'Question', 'name': 'What are the ongoing obligations of an Act 60 investor decree?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Investor decree holders must make an annual charitable donation ($10,000 per year to approved Puerto Rico nonprofits), pay a separate annual filing/report fee ($5,000), purchase a primary residence in Puerto Rico within two years of the decree, file an annual compliance report with the DDEC, and maintain bona fide residency. Missing these obligations can put the decree at risk of revocation.' } },
        { '@type': 'Question', 'name': 'Do Act 60 investors also need a Puerto Rico estate plan?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Puerto Rico is a civil-law jurisdiction with forced heirship (the legítima) that can override a mainland will, and your mainland trust may not be recognized once you change your domicile. Your Act 60 decree is also personal and does not pass to your heirs. Pairing your decree with a Puerto Rico–compliant estate plan protects both your wealth and your tax benefits.' } }
      ]
    }
  },
  '/act-60-crypto-investor': {
    h1: 'Act 60 for Cryptocurrency — Puerto Rico Crypto Tax Benefits',
    title: 'Act 60 Crypto Tax — 0% Gains on Bitcoin & Crypto | Riefkohl Law',
    meta: 'Puerto Rico Act 60 attorney for crypto investors: capital-gains benefits on Bitcoin, Ethereum & digital assets, residency structuring, cost-basis tracking & IRS defense. Free call.',
    schema: null
  },
  '/business-formation': {
    h1: 'Puerto Rico Business Formation — LLC, Corp & Startup Services',
    title: 'Puerto Rico LLC Formation — Business Attorney | Riefkohl Law',
    meta: 'Form your Puerto Rico LLC or corporation with a flat-fee business attorney: entity selection, Certificate of Organization, EIN & registered agent. Free strategy call.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What types of business entities can I form in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico offers several business entity types: Limited Liability Companies (LLCs), corporations (C-Corp and S-Corp equivalents), partnerships (general and limited), and sole proprietorships. LLCs are the most popular choice for small businesses due to their flexibility, liability protection, and pass-through taxation. The right entity depends on your business goals, tax situation, and whether you hold an Act 60 decree.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How long does it take to form an LLC in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'An LLC can typically be formed in Puerto Rico within 5-10 business days after filing the Certificate of Organization with the Puerto Rico Department of State. The process includes drafting an operating agreement, obtaining an EIN from the IRS, and registering with the Puerto Rico Treasury Department (Hacienda). Riefkohl Law offers flat-fee LLC formation services that handle all filings.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I need a local agent to form a business in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Puerto Rico requires every business entity to maintain a registered agent with a physical address in Puerto Rico for service of process. A registered agent receives legal documents and official correspondence on behalf of the business. Your attorney can serve as your registered agent or help you designate one.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much does it cost to form an LLC in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Riefkohl Law forms Puerto Rico LLCs on a flat fee, typically $2,500 to $10,000 depending on complexity — covering entity selection, the Certificate of Organization, a customized operating agreement, EIN, and registered-agent setup. The Puerto Rico Department of State filing fee (around $250) and any annual-report fees are separate. You receive a fixed quote before work begins.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can a non-resident form a business in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Puerto Rico imposes no residency requirement to form or own a business entity, so a non-resident can organize an LLC or corporation on the island. Every entity must maintain a registered agent with a physical Puerto Rico address. Note that the individual Act 60 tax benefits are a separate matter and do require you to become a bona fide Puerto Rico resident.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What are the tax advantages of forming a business in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A qualifying export-services business can obtain an Act 60 Chapter 3 decree providing a 4% fixed corporate income tax rate, a 100% exemption on distributions of earnings and profits, a 50% exemption on municipal license taxes, and a 75% exemption on personal and real property taxes. Eligibility depends on serving clients located outside Puerto Rico and meeting the conditions of the decree.'
          }
        }
      ]
    }
  },
  '/government-contracts': {
    h1: 'Government Contracts Attorney — Federal & PR Procurement',
    meta: 'Puerto Rico government contracts attorney. Bid protests, contract disputes, procurement compliance, and federal/state contracting. Free consultation.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is a bid protest in Puerto Rico government contracting?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A bid protest is a legal challenge to the award or proposed award of a government contract. In Puerto Rico, protests can be filed before the contracting agency, the General Services Administration (ASG), or through the courts under Law 73-2019. Federal contract protests go to the GAO or the Court of Federal Claims. Strict deadlines apply — typically 10-15 days from the adverse action.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What laws govern government procurement in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico government procurement is primarily governed by Law 73-2019 (the Uniform Procurement Act), which establishes bidding requirements, evaluation criteria, and protest procedures for Commonwealth agencies and municipalities. Federal contracts in Puerto Rico follow the Federal Acquisition Regulation (FAR). Municipalities may also have their own procurement ordinances.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can a small business compete for government contracts in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Both Puerto Rico and federal procurement systems include set-aside programs for small businesses, including HUBZone, 8(a), and woman-owned small business preferences. Puerto Rico also has local preference provisions under Law 73-2019. An attorney experienced in government contracts can help you navigate registration, certification, and the proposal process.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I register to bid on government contracts in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Federal contracts require registration in the System for Award Management (SAM.gov) and a Unique Entity ID (UEI), which replaced the DUNS number, along with the NAICS codes for your industry. For Puerto Rico Commonwealth contracts, suppliers register with the General Services Administration (Administracion de Servicios Generales) and must hold a current Registro Unico de Licitadores certification, together with tax and municipal clearance certificates.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What compliance requirements apply to government contractors in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Federal awards require compliance with the Federal Acquisition Regulation (FAR) and agency supplements, including Buy American Act provisions and Davis-Bacon prevailing wage requirements on construction contracts. Commonwealth contracts are governed by Law 73-2019 and require current tax clearances. Puerto Rico also requires that government contracts be registered with the Office of the Comptroller, and an unregistered contract is generally unenforceable against the government.'
          }
        }
      ]
    }
  },
  '/corporate': {
    h1: 'Corporate & Transactional Law — Puerto Rico Business Attorney',
    meta: 'Puerto Rico corporate attorney for mergers, acquisitions, joint ventures, and commercial transactions. Strategic counsel for businesses operating in PR.',
    schema: null
  },
  '/espanol-quiebras': {
    h1: 'Abogado de Quiebras en Puerto Rico — Servicios de Insolvencia',
    meta: 'Abogado de quiebras en Puerto Rico. Cap\u00edtulo 7, Cap\u00edtulo 13, reestructuraci\u00f3n de deuda y defensa de acreedores. Consulta gratuita. (787) 236-1657.',
    schema: null
  },
  '/puerto-rico-estate-planning-nrnc-classification': {
    h1: 'Estate Planning for Non-Residents with Puerto Rico Assets',
    meta: 'Estate planning guide for non-residents with Puerto Rico assets. NRNC classification, tax implications, and trust strategies for mainland investors.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is NRNC classification in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'NRNC stands for Non-Resident Non-Citizen of Puerto Rico. Under Puerto Rico tax law, U.S. mainland residents who own property or earn income in Puerto Rico are classified as NRNCs. This classification determines how their Puerto Rico-source income is taxed and what estate planning obligations apply to their PR assets upon death.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do non-residents need estate planning for Puerto Rico property?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. If you own real property, business interests, or other assets in Puerto Rico, those assets are subject to Puerto Rico\u2019s forced heirship (leg\u00edtima) rules and probate process upon death\u2014regardless of where you live. Without proper planning, your PR assets may be distributed according to Puerto Rico civil law rather than your mainland estate plan. A Puerto Rico trust or dual-will strategy can ensure your wishes are carried out.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can a mainland resident create a Puerto Rico trust for their PR assets?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. A mainland resident (NRNC) can establish an irrevocable trust under Puerto Rico Law 219-2012 to hold their PR assets. This avoids Puerto Rico probate, provides asset protection, and allows the grantor to plan around forced heirship rules. However, NRNCs cannot create revocable trusts under PR law\u2014that option is generally limited to PR residents and Act 60 decree holders.'
          }
        }
      ]
    }
  },
  /* Spanish pages */
  '/espanol': {
    h1: 'Bufete de Abogados en Puerto Rico — Fideicomisos, Sucesiones y Derecho Corporativo',
    title: 'Abogado en Puerto Rico — Fideicomisos, Ley 60 | Riefkohl Law',
    meta: 'Bufete de abogados en San Juan, PR. Fideicomisos, planificacion sucesoral, Ley 60, formacion de empresas y contratos gubernamentales. (787) 236-1657.',
    schema: null
  },
  '/espanol-servicios': {
    h1: 'Servicios Legales y Precios — Riefkohl Law',
    meta: 'Servicios legales a tarifa fija en Puerto Rico. Fideicomisos, planificacion sucesoral, formacion de empresas y asesoria Ley 60.',
    schema: null
  },
  '/espanol-sobre-nosotros': {
    h1: 'Sobre el Lcdo. Hans E. Riefkohl — Fundador',
    meta: 'Lcdo. Hans Riefkohl, fundador de Riefkohl Law. Experiencia en DLA Piper, LUMA Energy y los tribunales federales. Fideicomisos y derecho corporativo en PR.',
    schema: null
  },
  '/espanol-contacto': {
    h1: 'Contacto — Riefkohl Law, San Juan, Puerto Rico',
    meta: 'Contacte a Riefkohl Law en San Juan, PR. Llame al (787) 236-1657 o agende una consulta gratuita. Fideicomisos, sucesiones y derecho empresarial.',
    schema: null
  },
  '/espanol-cita': {
    h1: 'Agende su Consulta Legal Gratuita',
    meta: 'Agende una consulta gratuita con Riefkohl Law. Hable con un abogado sobre fideicomisos, sucesiones o asuntos empresariales en Puerto Rico.',
    schema: null
  },
  '/espanol-blog': {
    h1: 'Blog Legal — Analisis de Casos y Comentarios',
    meta: 'Blog legal de Riefkohl Law. Analisis de casos, comentarios juridicos y guias practicas sobre fideicomisos, sucesiones y derecho empresarial en PR.',
    schema: null
  },
  '/espanol-corporativo': {
    h1: 'Formacion de Empresas en Puerto Rico — LLC, Corp y Startups',
    meta: 'Abogado de formacion de empresas en Puerto Rico. LLC, corporaciones y servicios legales para startups. Tarifa fija. Consulta gratuita.',
    schema: null
  },
  '/espanol-fideicomisos': {
    h1: 'Abogado de Fideicomisos en Puerto Rico — Ley 219-2012',
    title: 'Abogado de Fideicomisos en Puerto Rico | Riefkohl Law',
    meta: 'Abogado de fideicomisos en Puerto Rico. Fideicomisos irrevocables bajo Ley 219-2012, proteccion de activos y planificacion sucesoral. Consulta gratis.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 es un fideicomiso irrevocable bajo la Ley 219-2012 de Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Un fideicomiso irrevocable bajo la Ley 219-2012 (Ley de Fideicomisos de Puerto Rico) es un arreglo legal donde un fideicomitente transfiere permanentemente activos a un fiduciario para beneficio de beneficiarios designados. Una vez establecido, el fideicomitente generalmente no puede modificar ni revocar el fideicomiso sin el consentimiento de los beneficiarios, ofreciendo fuerte protecci\u00f3n de activos y beneficios sucesorales.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfC\u00f3mo se diferencian los fideicomisos de Puerto Rico de los del continente?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Los fideicomisos de Puerto Rico operan bajo un marco de derecho civil (Ley 219-2012) en lugar del derecho com\u00fan. Las diferencias clave incluyen: la leg\u00edtima condiciona la planificaci\u00f3n, el fideicomiso es un patrimonio aut\u00f3nomo y no una relaci\u00f3n fiduciaria, y ofrece ventajas propias de protecci\u00f3n de activos y planificaci\u00f3n contributiva. La revocabilidad tambi\u00e9n cambia: los fideicomisos fueron irrevocables por defecto hasta el 29 de enero de 2027, pero bajo la Ley 153-2026 se presumen revocables desde el 30 de enero de 2027 salvo que la escritura disponga expresamente lo contrario.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfCu\u00e1les son los beneficios contributivos de un fideicomiso en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Los fideicomisos de Puerto Rico pueden proporcionar varias ventajas contributivas, incluyendo posibles ahorros en contribuciones sobre caudal relicto, diferimiento o reducci\u00f3n de impuestos sobre ingresos de activos del fideicomiso, y protecci\u00f3n de activos contra acreedores. Para tenedores de decretos bajo Ley 60, los fideicomisos estructurados adecuadamente pueden preservar los incentivos contributivos mientras logran objetivos sucesorales.'
          }
        }
      ]
    }
  },
  '/espanol-ley-60': {
    h1: 'Ley 60 de Puerto Rico (Ley 60-2019) — Incentivos Contributivos y Asesoría Legal',
    meta: 'Abogado de la Ley 60 de Puerto Rico (Ley 60-2019 / Código de Incentivos de 2019): requisitos, servicios de exportación, inversionistas individuales y cumplimiento. Consulta gratis.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 es la Ley 60 en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'La Ley 60 (C\u00f3digo de Incentivos de Puerto Rico de 2019) consolida las antiguas Leyes 20 y 22, proporcionando incentivos contributivos para empresas e individuos que se mudan a Puerto Rico. Los beneficios dependen de los t\u00e9rminos del decreto, el momento de la solicitud y la ley aplicable. Consulte a un abogado para verificar los requisitos actuales de elegibilidad.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfC\u00f3mo califico para los beneficios de inversionista individual bajo Ley 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Para calificar, debe convertirse en residente bona fide de Puerto Rico cumpliendo las tres pruebas del IRC \u00a7937: (1) presencia f\u00edsica de al menos 183 d\u00edas al a\u00f1o, (2) domicilio contributivo en Puerto Rico, y (3) conexi\u00f3n m\u00e1s estrecha con Puerto Rico que con cualquier otra jurisdicci\u00f3n. Las tres pruebas deben cumplirse — 183 d\u00edas por s\u00ed solos no son suficientes. Se aplican obligaciones adicionales del decreto, incluyendo donaciones caritativas y compra de propiedad.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfUn abogado de Ley 60 puede ayudar con auditor\u00edas del IRS?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'S\u00ed. El IRS examina activamente a los tenedores de decretos bajo Ley 60, particularmente en cuanto a la fuente de ingresos y el cumplimiento de residencia. Un abogado experimentado puede asegurar que su documentaci\u00f3n respalde su posici\u00f3n de residencia, estructurar sus asuntos para cumplimiento y representarlo si el IRS cuestiona sus beneficios.'
          }
        }
      ]
    }
  },

  /* ---- Act 60 Resource Center Subpages (10 pages) ---- */
  '/act-60-resource-center': {
    h1: 'Act 60 Resource Center — Puerto Rico Tax Incentives Guide',
    title: 'Act 60 Resource Center — Guides & Tools | Riefkohl Law',
    meta: 'Comprehensive Act 60 resource center. Residency tests, income sourcing, compliance, audit triggers, and planning guides for Puerto Rico relocators.',
    schema: null
  },
  '/act-60-federal-residency-test-puerto-rico': {
    h1: 'Act 60 Federal Residency Test — Bona Fide PR Resident Requirements',
    title: 'Act 60 Presence & Closer Connection Tests | Riefkohl Law',
    meta: 'Federal residency test for Act 60 decree holders. Presence test, tax home test, closer connection test, and safe harbor rules for Puerto Rico.',
    schema: null
  },
  '/act-60-income-sourcing-rules-puerto-rico': {
    h1: 'Act 60 Income Sourcing Rules — Puerto Rico vs. U.S. Source Income',
    meta: 'Income sourcing rules for Act 60 investors. How the IRS classifies Puerto Rico vs. U.S. source income and why it matters for your decree benefits.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How does the IRS determine if income is Puerto Rico-source or U.S.-source?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The IRS uses IRC \u00a7\u00a7861\u2013865 and Treas. Reg. \u00a71.937-2 to classify income by source. For personal services, the source is where the work is performed (working-days allocation). For capital gains on personal property, the source is the seller\u2019s tax home. For interest, dividends, rents, and royalties, different rules apply depending on the payor and asset location. Only Puerto Rico-source income qualifies for Act 60 benefits.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the 10-year lookback rule for Act 60 capital gains?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Under Treas. Reg. \u00a71.937-2(f), capital gains on assets you owned before becoming a bona fide Puerto Rico resident are not treated as PR-source income for federal tax purposes. If you sell an asset within 10 years of establishing PR residency, the pre-move appreciation is subject to federal capital gains tax. You may elect to split-source the gain using the possession holding period method.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I work remotely for mainland clients and still qualify for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, but where you physically perform the work determines the income source. Services income is sourced to where the work is done, not where the client is located. If you work from Puerto Rico serving mainland clients, that income is generally PR-source. However, days spent working on the mainland create U.S.-source income. Tracking working days meticulously is essential for compliance.'
          }
        }
      ]
    }
  },
  '/act-60-compliance-requirements-audit-triggers': {
    h1: 'Act 60 Compliance Requirements & Audit Triggers',
    meta: 'Act 60 compliance checklist and common IRS audit triggers. Annual reporting, charitable donations, property requirements, and red flags to avoid.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What are the annual compliance requirements for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Act 60 decree holders must file an annual report with DDEC, make a required charitable donation to approved Puerto Rico nonprofits (typically $10,000/year for individual investors), purchase a primary residence within two years of the decree effective date, and file Puerto Rico and federal tax returns. Failure to comply can result in decree revocation and retroactive loss of benefits.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What triggers an IRS audit of Act 60 decree holders?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Common audit triggers include: large capital gains reported as exempt on Form 8898, maintaining a home in a former state, spending significant time on the mainland, inconsistent travel records, high-value cryptocurrency dispositions, income sourcing positions that shift income to PR, and failure to file Form 8898 (Statement for Individuals Who Begin or End Bona Fide Residence in a U.S. Possession). The IRS has a dedicated compliance campaign (Campaign 685) targeting Act 60 holders.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can my Act 60 decree be revoked?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. DDEC can revoke your decree for non-compliance with its terms\u2014such as failing to make charitable donations, not purchasing a residence, or not filing annual reports. The IRS can independently determine you are not a bona fide PR resident, which retroactively disqualifies your income from Act 60 benefits. Both outcomes result in owing federal taxes on previously exempt income, plus interest and potential penalties.'
          }
        }
      ]
    }
  },
  '/act-60-working-days-allocation-services-income-sourcing': {
    h1: 'Act 60 Working Days Allocation — Services Income Sourcing',
    meta: 'Working days allocation method for Act 60 services income sourcing. How the IRS calculates PR vs. non-PR source income from personal services.',
    schema: null
  },
  '/act-60-software-technology-income-classification-sourcing': {
    h1: 'Act 60 Software & Technology Income Classification',
    meta: 'Income classification and sourcing for Act 60 software and technology companies. SaaS, licensing, digital products, and export services rules.',
    schema: null
  },
  '/act-60-state-departure-audit-domicile-change': {
    h1: 'Act 60 State Departure Audit & Domicile Change',
    meta: 'State departure audit risks when moving to Puerto Rico for Act 60. How states like California, New York, and others challenge your domicile change.',
    schema: null
  },
  '/act-60-year-of-move-safe-harbor-transition-year': {
    h1: 'Act 60 Year of Move — Safe Harbor & Transition Year Rules',
    meta: 'Safe harbor and transition year rules for the year you move to Puerto Rico under Act 60. Split-year filing, income allocation, and planning tips.',
    schema: null
  },
  '/act-60-export-services-chapter-3-compliance': {
    h1: 'Act 60 Export Services — Chapter 3 Compliance Requirements',
    meta: 'Export services compliance under Act 60 Chapter 3. Qualifying activities, client location rules, nexus considerations, and annual reporting.',
    schema: null
  },
  '/act-60-residency-compliance-checklist-reference-tables': {
    h1: 'Act 60 Residency Compliance Checklist & Reference Tables',
    meta: 'Comprehensive Act 60 compliance checklist with reference tables. Presence days tracking, documentation requirements, and deadline calendar.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How many days do I need to spend in Puerto Rico for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'To satisfy the bona fide residence test under IRC \u00a7937, you must meet one of five alternative presence tests. The most common is being physically present in Puerto Rico for at least 183 days during the tax year. Alternatives include a 549-day/3-year rolling average, a 90-day U.S. limitation test, an earned income limitation test, and a no-significant-connection standard. You must also maintain your tax home in PR and demonstrate a closer connection to PR than to any other jurisdiction.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What documentation should I keep to prove Act 60 residency?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Maintain a daily presence log with supporting evidence: flight records, credit card statements showing PR purchases, gym check-ins, medical appointments, utility bills, vehicle registration, voter registration, PR driver\u2019s license, and club or religious organization memberships. The IRS evaluates the totality of circumstances, so the more ties to Puerto Rico you can document\u2014and the fewer ties to your former state\u2014the stronger your position.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens if I spend too many days outside Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'If you fail the presence test, you may not qualify as a bona fide PR resident for that tax year, meaning your income loses Act 60 benefits and is subject to full federal taxation. Even one bad year can trigger an IRS audit that examines multiple prior years. Track your days proactively throughout the year\u2014not just at tax time\u2014so you can adjust travel plans before crossing a threshold.'
          }
        }
      ]
    }
  },

  /* ---- Resource Subpages (9 EN + 9 ES) ---- */
  '/resources-faq': {
    h1: 'Frequently Asked Questions — Puerto Rico Estate Planning & Trusts',
    meta: 'Answers to common questions about Puerto Rico estate planning, trusts under Law 219-2012, probate, and forced heirship. Free consultation available.',
    schema: null
  },
  '/resources-wills-vs-trusts': {
    h1: 'Wills vs. Trusts in Puerto Rico — Which Is Right for You?',
    meta: 'Compare wills and trusts under Puerto Rico law. Probate avoidance, asset protection, cost differences, and which estate planning tool fits your needs.',
    schema: null
  },
  '/resources-forced-heirship': {
    h1: 'Forced Heirship (Leg\u00edtima) in Puerto Rico — What You Need to Know',
    meta: 'Puerto Rico forced heirship rules under the 2020 Civil Code. How the leg\u00edtima affects your estate plan, who qualifies, and planning strategies.',
    schema: null
  },
  '/resources-fiduciary-duties': {
    h1: 'Fiduciary Duties of Trustees in Puerto Rico',
    meta: 'Understanding fiduciary duties under Puerto Rico trust law. Trustee obligations, liability standards, and beneficiary protections under Law 219-2012.',
    schema: null
  },
  '/resources-act60': {
    h1: 'Act 60 Overview — Tax Incentives for Puerto Rico Relocators',
    meta: 'Act 60 overview for individuals and businesses relocating to Puerto Rico. Tax incentive benefits, eligibility requirements, and application process.',
    schema: null
  },
  '/resources-cases': {
    h1: 'Key Trust Law Cases in Puerto Rico',
    meta: 'Collection of key Puerto Rico trust law cases. Court decisions on fiduciary duties, trust validity, beneficiary rights, and property disputes.',
    schema: null
  },
  '/resources-glossary': {
    h1: 'Legal Glossary — Puerto Rico Trust & Estate Planning Terms',
    meta: 'Bilingual glossary of Puerto Rico trust and estate planning terms. Fideicomiso, leg\u00edtima, fiduciario, and more legal terms defined in English and Spanish.',
    schema: null
  },
  '/resources-process': {
    h1: 'What to Expect — The Estate Planning Process at Riefkohl Law',
    meta: 'Step-by-step guide to the estate planning process at Riefkohl Law. Initial consultation through trust creation and ongoing administration.',
    schema: null
  },
  '/recursos-es': {
    h1: 'Recursos Legales — Gu\u00edas, Preguntas Frecuentes y Herramientas',
    meta: 'Recursos legales gratuitos para planificaci\u00f3n sucesoral, fideicomisos y derecho empresarial en Puerto Rico. Gu\u00edas, preguntas frecuentes y glosario.',
    schema: null
  },
  '/recursos-preguntas-frecuentes': {
    h1: 'Preguntas Frecuentes — Planificaci\u00f3n Sucesoral y Fideicomisos en PR',
    meta: 'Respuestas a preguntas comunes sobre planificaci\u00f3n sucesoral, fideicomisos bajo Ley 219-2012, sucesiones y leg\u00edtima en Puerto Rico.',
    schema: null
  },
  '/recursos-testamentos-fideicomisos': {
    h1: 'Testamentos vs. Fideicomisos en Puerto Rico — \u00bfCu\u00e1l Necesita?',
    meta: 'Compare testamentos y fideicomisos bajo la ley de Puerto Rico. Evitar sucesiones, protecci\u00f3n de activos y cu\u00e1l instrumento sucesoral le conviene.',
    schema: null
  },
  '/recursos-legitima': {
    h1: 'La Leg\u00edtima en Puerto Rico — Lo Que Debe Saber',
    meta: 'Reglas de leg\u00edtima hereditaria bajo el C\u00f3digo Civil de 2020. C\u00f3mo afecta su planificaci\u00f3n sucesoral, qui\u00e9n califica y estrategias de planificaci\u00f3n.',
    schema: null
  },
  '/recursos-deberes-fiduciarios': {
    h1: 'Deberes Fiduciarios del Fiduciario en Puerto Rico',
    meta: 'Obligaciones fiduciarias bajo la ley de fideicomisos de Puerto Rico. Deberes del fiduciario, est\u00e1ndares de responsabilidad y protecciones para beneficiarios.',
    schema: null
  },
  '/recursos-act60-es': {
    h1: 'Ley 60 — Incentivos Contributivos para Relocalizados a Puerto Rico',
    meta: 'Resumen de Ley 60 para individuos y empresas que se mudan a Puerto Rico. Beneficios contributivos, requisitos de elegibilidad y proceso de solicitud.',
    schema: null
  },
  '/recursos-casos-es': {
    h1: 'Casos Clave de Derecho de Fideicomisos en Puerto Rico',
    meta: 'Colecci\u00f3n de casos clave de derecho de fideicomisos en Puerto Rico. Decisiones judiciales sobre deberes fiduciarios, validez y derechos de beneficiarios.',
    schema: null
  },
  '/recursos-glosario': {
    h1: 'Glosario Legal — T\u00e9rminos de Fideicomisos y Sucesiones en PR',
    meta: 'Glosario biling\u00fce de t\u00e9rminos de fideicomisos y planificaci\u00f3n sucesoral en Puerto Rico. Fideicomiso, leg\u00edtima, fiduciario y m\u00e1s t\u00e9rminos legales.',
    schema: null
  },
  '/recursos-que-esperar': {
    h1: 'Qu\u00e9 Esperar — El Proceso de Planificaci\u00f3n Sucesoral en Riefkohl Law',
    meta: 'Gu\u00eda paso a paso del proceso de planificaci\u00f3n sucesoral en Riefkohl Law. Desde la consulta inicial hasta la creaci\u00f3n del fideicomiso.',
    schema: null
  },

  /* ---- Trust Law Article Series (14 articles) ---- */
  '/resources/what-is-puerto-rico-trust': {
    h1: 'What Is a Puerto Rico Trust? A Guide for Act 60 Investors',
    meta: 'How Puerto Rico trusts differ from mainland trusts, why they offer stronger asset protection, and what Act 60 investors need to know. A PR attorney’s guide.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is a fideicomiso under Puerto Rico law?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A fideicomiso (Puerto Rico trust) under Law 219-2012 is an autonomous estate\u2014a separate legal patrimony\u2014not a fiduciary relationship as in common-law states. A grantor (fideicomitente) transfers assets to a trustee (fiduciario) who manages them for designated beneficiaries (fideicomisarios). This civil-law structure provides distinct advantages in asset protection and estate planning.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How is a Puerto Rico trust different from a mainland U.S. trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico trusts are governed by civil law (Law 219-2012, as amended by Act 153-2026), not the Uniform Trust Code. Key differences: the trust is treated as an autonomous estate rather than a fiduciary relationship, forced heirship (leg\u00edtima) rules apply, and irrevocable trusts are subject to statutory duration limits. Revocability flipped on January 30, 2027: PR trusts were irrevocable by default until then, and are presumed revocable after unless the deed expressly provides otherwise. These differences create planning opportunities\u2014and traps\u2014that require an attorney experienced in both systems.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can Act 60 decree holders create revocable trusts in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Act 60 Individual Resident Investor (IRI) decree holders have been able to establish revocable trusts since 2014 under the Incentives Code, when no other grantor could. Act 153-2026 ends that exclusivity: effective January 30, 2027, any settlor may create a revocable trust in Puerto Rico. Decree holders should review how the new default rules on creditor reach-through, fiduciary duties, and Registry recording affect their existing structures.'
          }
        }
      ]
    }
  },
  '/resources/act-60-trust-planning': {
    h1: 'Trust Planning for Act 60 Investors: Mainland vs. Puerto Rico Trusts',
    meta: 'Should you keep your mainland trust or create a new one in Puerto Rico? Act 60 investors: compare asset protection, tax benefits, and flexibility before deciding.',
    schema: null
  },
  '/resources/modifying-irrevocable-trusts': {
    h1: 'How Modifiable Are Puerto Rico\u2019s Irrevocable Trusts?',
    meta: 'Puerto Rico irrevocable trusts can be modified through 4 statutory mechanisms under Law 219-2012. Consent, judicial, cy pres, and trust protector options.',
    schema: null
  },
  '/resources/avoiding-probate-legitima': {
    h1: 'Avoiding Probate in Puerto Rico: Trusts and the Leg\u00edtima',
    meta: 'How to avoid forced heirship and probate in Puerto Rico using trusts. Learn what the leg\u00edtima means for your estate and how to plan around it. Free strategy call.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How do I avoid probate in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The most effective way to avoid probate in Puerto Rico is to transfer assets into an irrevocable trust under Law 219-2012 during your lifetime. Assets held in a properly funded trust pass directly to beneficiaries without going through the probate court. Other partial strategies include joint ownership and beneficiary designations on financial accounts, but a trust provides the most comprehensive probate avoidance.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the leg\u00edtima and can I avoid it with a trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The leg\u00edtima (forced heirship) under Puerto Rico\u2019s 2020 Civil Code reserves one-half of your estate for forced heirs\u2014children and the surviving spouse share equally. You cannot use a trust to circumvent the leg\u00edtima. However, with proper planning, a trust can satisfy the leg\u00edtima while still giving you significant control over how and when heirs receive their share, including spendthrift protections and staggered distributions.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How long does probate take in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico probate can take 1\u20133 years or longer, depending on the complexity of the estate, whether the will is contested, and court backlogs. Estates with real property, multiple heirs, or assets in both Puerto Rico and the mainland often experience longer timelines. A trust-based estate plan can transfer assets to beneficiaries in weeks rather than years.'
          }
        }
      ]
    }
  },
  '/resources/asset-protection-trusts-pr': {
    h1: 'Asset Protection Trusts Under Puerto Rico\u2019s Trust Act',
    title: 'Asset Protection Trusts in Puerto Rico | Riefkohl Law',
    meta: 'Puerto Rico\u2019s autonomous estate doctrine offers distinctive asset protection advantages over mainland DAPTs. Learn the three-layer creditor protection structure.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Can a Puerto Rico trust protect my assets from creditors?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Under the Puerto Rico Trust Act (Act 219-2012), a trust is a separate legal person with its own autonomous patrimony, so trust property is no longer part of the settlor\'s or beneficiary\'s estate. Combined with creditor rights limitations and spendthrift provisions, this structure creates formidable barriers to creditor claims. Protection is qualified, however, not absolute.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are Puerto Rico trusts revocable or irrevocable?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'That changed with Act 153-2026, which the Governor signed on July 30, 2026 and which takes effect January 30, 2027. Under the prior rule, all Puerto Rico trusts were irrevocable by default and only Act 60 Individual Resident Investor decree holders could create revocable trusts. From January 30, 2027, any settlor may create one, and a deed that says nothing about revocability is presumed revocable. The Act carries no transition provision for trusts executed before that date.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is a self-settled asset protection trust valid in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico has no self-settled asset protection trust (DAPT-equivalent) statute like the roughly 20 US states that authorize them. Instead, self-settled trusts rely on general trust law and the autonomous estate doctrine, and they face scrutiny under Acci\u00f3n Pauliana, the civil law doctrine that lets creditors challenge transfers made to defraud them. To reduce this exposure, fund the trust well in advance of any creditor conflict, while you remain solvent, and limit the powers you retain.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the strongest type of Puerto Rico trust for asset protection?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A pure discretionary trust offers the maximum protection, followed by spendthrift trusts and then support trusts. In a discretionary trust, the trustee has sole and absolute discretion over distributions, so the beneficiary has only an expectancy rather than an enforceable right, leaving a creditor nothing to garnish or attach. Strong spendthrift language combined with the autonomous estate doctrine reinforces this barrier.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What are the limits of asset protection with a Puerto Rico trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Protection is qualified, not absolute. Once the trustee distributes cash or property to a beneficiary, that amount enters the beneficiary\'s personal estate and is reachable by their creditors. In addition, support obligations such as alimony or child support can pierce spendthrift restrictions, trust income may be considered when calculating spousal support, and trust assets funded with community property receive weaker divorce protection than those funded with separate property.'
          }
        }
      ]
    }
  },
  '/resources/special-needs-trusts-medicaid': {
    h1: 'Special Needs Trusts and Medicaid Planning in Puerto Rico',
    meta: 'Special needs trusts in Puerto Rico: Medicaid\u2019s any-circumstances test, first-party vs. third-party SNTs, and why PR\u2019s Plan Vital changes everything.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Does Puerto Rico Medicaid cover nursing home costs?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Puerto Rico\'s Medicaid program (Plan Vital) does not cover nursing facility services for adults. This fundamentally changes Medicaid planning compared to the mainland, because the main reason for special needs trust planning in Puerto Rico is protecting Medicaid medical coverage and the modest AABD cash benefit rather than nursing home eligibility.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the difference between a first-party and third-party special needs trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A first-party (self-settled) special needs trust is funded with the disabled beneficiary\'s own assets, requires the beneficiary to be under age 65 when created, and must repay the state for Medicaid benefits at the beneficiary\'s death. A third-party special needs trust is funded with someone else\'s assets, has no age restriction and no Medicaid payback, so remaining assets pass to family remainder beneficiaries instead of the state. This makes third-party trusts far more flexible for Act 60 families.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I keep Medicaid benefits if a relative leaves money to a disabled family member?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, if the funds are placed in a properly drafted special needs trust. The key principle is that trust distributions must supplement public benefits, not replace them, so the beneficiary should not receive large lump sums directly. Instead, the trustee pays vendors directly for items Medicaid does not cover, such as dental work, glasses, therapy, education, and adaptive equipment.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the Medicaid lookback period and how is the penalty calculated?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Any transfer of assets for less than fair market value within 60 months before applying for Medicaid can trigger a penalty period of ineligibility, calculated by dividing the total amount transferred by the average monthly nursing home cost. However, because Puerto Rico Medicaid does not cover nursing facility services, this penalty calculation is largely inapplicable in practice, and multiple sources describe the lookback as effectively dormant in Puerto Rico.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are revocable living trusts allowed in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, as of January 30, 2027. Act 153-2026 expressly recognizes the revocable trust in Puerto Rico law and reverses the old presumption, so a deed silent on revocability is now presumed revocable. Before that date, only Act 60 IRI decree holders could create one. Puerto Rico formalities still apply: the trust must be executed by public deed (escritura p\u00fablica) and recorded in the Registry of Trusts, and amendments or revocations must be recorded within ten days to bind third parties.'
          }
        }
      ]
    }
  },
  '/resources/ilits-and-slats': {
    h1: 'ILITs and SLATs: Advanced Trust Planning for Puerto Rico Residents',
    meta: 'Irrevocable life insurance trusts and spousal lifetime access trusts for Act 60 investors. Estate tax reduction with PR-specific integration.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is an ILIT and how does it reduce estate taxes?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'An Irrevocable Life Insurance Trust (ILIT) is a trust set up to own and control life insurance policies so the death benefit stays out of your taxable estate. Under IRC \u00a72042(2), if the insured holds no incidents of ownership in the policy, the death benefit does not count toward the taxable estate. For example, keeping a $5 million policy out of the estate saves $2 million in federal tax at the 40% rate.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the three-year rule for life insurance trusts?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Under IRC \u00a72035(a), any policy transferred within three years of the insured\'s death is pulled back into the taxable estate, even if all incidents of ownership were released. This is a strict look-back rule with no exceptions for gifts or charitable transfers. The practical solution is to establish and fund the ILIT first, then apply for the policy in the ILIT\'s name so the insured never owns it personally.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is a SLAT and why do married couples use it?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A Spousal Lifetime Access Trust (SLAT) is an irrevocable trust where one spouse transfers assets for the benefit of the other spouse (and usually children) during their lifetime. It removes both the transferred assets and all future appreciation from the grantor\'s taxable estate, while the family keeps indirect access through the non-grantor spouse. For instance, a $5 million portfolio that grows to $15 million only uses $5 million of lifetime exemption, with the $10 million of appreciation escaping estate tax.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Why shouldn\'t spouses create identical SLATs for each other?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Creating mirror-image trusts triggers the Reciprocal Trust Doctrine from Estate of Grace, 395 U.S. 316 (1969). If spouses each create irrevocable trusts for the other with roughly equal value and timing, the IRS can disregard both trusts and include the assets in both spouses\' taxable estates. To avoid this, couples should use different structures, trustees, beneficiaries, funding amounts, and timing rather than true mirror-image SLATs.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does Puerto Rico law affect ILIT and SLAT planning?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'ILITs and SLATs depend on irrevocability, and under Act 153-2026 irrevocability must now be stated expressly: from January 30, 2027 a Puerto Rico trust deed that is silent is presumed revocable, and any asset subject to a retained power to revoke or withdraw can be reached by the settlor\'s creditors as if the trust did not exist. Drafted correctly as irrevocable, a Puerto Rico trust\'s separate juridical personality still creates an asset-protection barrier against creditors. PR law also permits a trust protector and beneficiary-initiated modification rights that can add flexibility without destroying estate tax benefits if exercised independently of the grantor. Couples should also analyze how the leg\u00edtima, which requires one-half of the estate to pass to forced heirs under the 2020 Civil Code, interacts with SLAT planning.'
          }
        }
      ]
    }
  },
  '/resources/trust-taxation-act-60': {
    h1: 'Trust Taxation for Act 60 Investors: A 2026 Regulatory Perspective',
    meta: 'Federal grantor trust rules, the three-layer tax analysis, HB 505, and the OBBBA\u2019s impact on Puerto Rico trust planning for Act 60 decree holders.',
    schema: null
  },
  '/resources/landmark-trust-cases': {
    h1: 'Landmark Puerto Rico Trust Cases You Should Know',
    meta: '16 essential Puerto Rico trust cases from 1957 to 2025. Case-by-case analysis of the decisions that define how PR trusts actually work.',
    schema: null
  },
  '/resources/trust-costs-puerto-rico': {
    h1: 'Trust Costs in Puerto Rico: Creation, Administration & Termination',
    meta: 'What a Puerto Rico living trust costs: flat-fee attorney pricing from $1,800, plus notarial fees, ODIN registration, and the costs most firms don\u2019t disclose.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How much does it cost to create a trust in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'At Riefkohl Law, attorney fees for creating a Puerto Rico trust start at a flat $1,800 for a straightforward irrevocable trust and increase for complex multi-generational or Act 60-integrated structures. These figures are representative examples of what many engagements look like; the fee for each matter is determined by your specific circumstances. Additional third-party costs include notarial execution fees ($300\u2013$2,000), ODIN registration ($50\u2013$100), and any title transfer fees for real property. You receive a flat-fee quote before work begins.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What are the ongoing costs of maintaining a Puerto Rico trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Annual trust administration costs include trustee fees (professional trustees typically charge 0.5%\u20131.5% of trust assets), annual tax return preparation ($500\u2013$3,000), and legal review or amendment fees as needed. Self-administered trusts avoid trustee fees but require the trustee to manage compliance, record-keeping, and tax filings.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are there hidden costs when setting up a Puerto Rico trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Common overlooked costs include: property appraisal fees when transferring real estate into the trust, CRIM property tax reassessment risk, title insurance updates, and annual compliance costs. For Act 60 holders, there may also be costs for coordinating the trust with your decree structure. Ask your attorney for a comprehensive cost estimate that includes these ancillary expenses.'
          }
        }
      ]
    }
  },
  '/resources/fiduciary-duties-trustees': {
    h1: 'Fiduciary Duties Under Puerto Rico Trust Law',
    meta: 'Is your trustee meeting their legal obligations? 16 statutory duties under Puerto Rico\u2019s Trust Act, when trustees can be removed, and real case examples.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What duties does a trustee owe me under Puerto Rico trust law?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puerto Rico\'s trust framework establishes five core fiduciary duties: the duty of loyalty, the duty of care, the duty to inform, the duty of impartiality, and the investment duty. The duty of loyalty requires the trustee to act solely in the beneficiaries\' interests and is absolute, meaning it cannot be waived by an exculpatory clause or trust amendment. The duty of care holds the trustee to a prudent person standard of reasonable care, skill, and caution.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can a trustee in Puerto Rico engage in self-dealing with trust assets?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Self-dealing is prohibited under the duty of loyalty. A trustee cannot sell trust property to itself or entities it controls, purchase trust assets at favorable terms, enter contracts with undisclosed personal interests, or divert trust opportunities to personal accounts. The trustee must disclose conflicts proactively, and any clause purporting to permit self-dealing is void against public policy unless expressly authorized by statute.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How often must a Puerto Rico trustee provide accountings to beneficiaries?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The duty to inform requires the trustee to keep beneficiaries informed and provide timely, accurate accountings, with quarterly reports required at minimum. Annual reports must be filed by February 28 under Regulation 7839, issued by the Office of the Commissioner of Financial Institutions (OCIF). This duty to account is affirmative, so the beneficiary need not request it, and the trustee cannot avoid disclosure by claiming no loss occurred.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I remove my trustee in Puerto Rico if they fail to do their job?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Removal is limited to three exhaustive statutory grounds: incompatible personal interests, misappropriation or fraudulent or negligent administration, and incapacity. Courts treat removal as an extraordinary remedy with a higher bar than the bar for damages, so mere failure to account without evidence of actual misappropriation or manifest negligence may not satisfy the standard. You must file a petition in court rather than removing a trustee by letter, and standing is limited to the settlor during lifetime, any beneficiary, or the Attorney General.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can a trust document protect my trustee from all liability with an exculpation clause?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Exculpation clauses are strictly construed against the trustee, and certain fundamental duties cannot be waived. These clauses do not protect against breach of the duty of loyalty, breach of the duty of impartiality, or willful misconduct or gross negligence. To be effective at all, any exculpation clause must be conspicuous, in plain language, and specifically reference the duty being modified.'
          }
        }
      ]
    }
  },
  '/resources/family-trust-pitfalls': {
    h1: 'Family Trust Pitfalls: When Good Intentions Go Wrong',
    meta: '10 specific pitfalls that have destroyed family trusts in Puerto Rico courts. Case illustrations and surgical solutions for each.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Can I name myself or my child as the only trustee of a Puerto Rico family trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Naming the primary beneficiary as the sole trustee creates an immediate conflict of interest, because that person controls distributions to themselves while other beneficiaries get little oversight. In the Fideicomiso Caro Delui case, the oldest child held 99% of the interest and served as sole trustee, and the trust corpus fell from $1.3 million to $447,000 amid self-dealing and excessive compensation. A safer approach is an independent professional trustee, or a co-trustee structure with explicit conflict-of-interest provisions and a mandatory independent annual audit.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I have to use a notary to amend a trust or change trustees in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. In Puerto Rico, trust amendments must be executed by notarial deed (escritura p\u00fablica), and informal letters, emails, or oral instructions are void. In the Crespo Rivera case, a mother used a notarized letter rather than a full public deed to remove a trustee, and the court held the letter insufficient, voiding all the deeds the new trustee later executed. Removing or appointing a trustee requires a separate notarial deed, recorded at the property registry when real property is involved.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens if a Puerto Rico trust is not registered with the ODIN trust registry?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Registration with the ODIN Special Trust Registry (Registro de Fideicomisos) under Act 219-2012 is absolute and mandatory for all trusts, including testamentary trusts. In Allio v. Santiago Chard\u00f3n, 2026 TSPR 13, the Puerto Rico Supreme Court declared a testamentary trust entirely null and void because the registration requirements were not strictly followed, defeating the testator\'s intent. Simply mentioning a desire to create a trust in a will is legally insufficient without immediate, simultaneous registration.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I leave my Puerto Rico estate to only some of my children or exclude a spouse through a trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No, because Puerto Rico\'s Civil Code protects forced heirs through the leg\u00edtima, which is 50% of the estate divided equally among descendants and the surviving spouse, and these rights cannot be waived. In Rodr\u00edguez Toro, a court voided trust donations and ordered restitution after a parent funded a trust for second-marriage children while excluding adult children from a first marriage. Under the 2020 Civil Code, the surviving spouse is a first-order forced heir with a preferential right to the family residence.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does getting divorced automatically remove my ex-spouse from my trust in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Divorce does not automatically terminate a spouse\'s interest in a trust, so the trust must be reviewed and amended after the divorce. In Gil Ense\u00f1at v. Marini Rom\u00e1n, a husband assumed divorce ended his ex-wife\'s interest, but the trust still named her as a primary beneficiary, leading to disputes over spousal support and a five-year challenge after his death. The fix is to expressly remove the ex-spouse from all beneficiary and trustee roles by notarial deed and update related beneficiary designations.'
          }
        }
      ]
    }
  },
  '/resources/asset-protection-irrevocable-trusts': {
    h1: 'Puerto Rico Asset Protection Trusts Under Law 219-2012',
    meta: 'Learn how irrevocable trusts under Puerto Rico\'s Law 219-2012 protect your assets from creditors, lawsuits, and divorce. Schedule a free strategy call.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How do irrevocable trusts protect assets in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'When you transfer assets into an irrevocable trust, the trustee holds legal title, so assets you no longer own cannot be seized by your creditors. Protection depends on three key requirements: irrevocability, an independent trustee who is not the settlor or spouse, and a completed transfer where assets are actually retitled in the trust\'s name. Law 219-2012 provides a modern trust statute with strong creditor protections based on the autonomous estate doctrine.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What can a Puerto Rico irrevocable trust protect against?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'An irrevocable trust can protect against tort judgments such as car accidents and malpractice, business liabilities even if the corporate veil is pierced, and professional liability. With spendthrift provisions, it can also shield against creditor claims directed at beneficiaries. It may protect against divorce if the trust is established before marriage or before proceedings begin.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What can\'t an irrevocable trust protect against?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'An irrevocable trust cannot protect against fraudulent transfers, since transfers made to defraud existing creditors can be voided. It also cannot shield assets from federal tax liens, because IRS collection powers can reach trust assets in certain cases. Pre-existing obligations such as child support, alimony, and prior court orders remain enforceable as well.'
          }
        },
        {
          '@type': 'Question',
          'name': 'When should I set up an asset protection trust in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Timing is the most important variable, and you should establish your trust before any claim arises. Transferring assets after a lawsuit is filed is almost certainly a fraudulent transfer that can be voided. The lesson is to establish your asset protection trust while the sun is shining.'
          }
        }
      ]
    }
  },
  '/resources/fideicomiso-irrevocable-puerto-rico': {
    h1: 'Fideicomiso Irrevocable en Puerto Rico: Gu\u00eda Ley 219-2012',
    meta: 'Descubre c\u00f3mo un fideicomiso irrevocable bajo la Ley 219-2012 protege tus activos, reduce contribuciones y ordena tu planificaci\u00f3n sucesoral en Puerto Rico.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 es un fideicomiso irrevocable en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Es un acuerdo legal donde el fideicomitente transfiere activos a un fiduciario, quien los administra en beneficio de los fideicomisarios. Una vez creado, no puede modificarse ni revocarse unilateralmente, y esa cesi\u00f3n de control es lo que le da su poder de protecci\u00f3n de activos, beneficios contributivos y planificaci\u00f3n sucesoral.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 cambi\u00f3 con la Ley 219-2012 para los fideicomisos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Antes de 2012, Puerto Rico carec\u00eda de un estatuto integral de fideicomisos. La Ley 219-2012 cre\u00f3 un marco legal moderno con reconocimiento pleno ante los tribunales, flexibilidad en la estructura, separaci\u00f3n patrimonial y compatibilidad con el derecho civil.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfUn fideicomiso irrevocable protege mis activos de los acreedores?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'S\u00ed. Los activos transferidos constituyen un patrimonio separado, por lo que los acreedores personales no pueden reclamarlos. La excepci\u00f3n son las transferencias fraudulentas, es decir, las realizadas cuando ya era insolvente o con la intenci\u00f3n de defraudar a los acreedores.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfPuede un fideicomiso irrevocable evitar la leg\u00edtima de mis hijos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Un fideicomiso no puede eludir la leg\u00edtima. Sin embargo, ofrece flexibilidad: puede proveer para el c\u00f3nyuge mientras preserva los derechos de los hijos, utilizar la mitad de libre disposici\u00f3n y estructurar distribuciones para proteger a herederos j\u00f3venes.'
          }
        }
      ]
    }
  },
  '/resources/declaratoria-de-herederos-puerto-rico': {
    h1: 'Declaratoria de Herederos en Puerto Rico: Gu\u00eda del Proceso',
    meta: 'Conozca el proceso de declaratoria de herederos en Puerto Rico: pasos, plazos, requisitos del tribunal y c\u00f3mo evitarlo con un fideicomiso.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 es la declaratoria de herederos en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Es un procedimiento judicial mediante el cual un tribunal identifica a los herederos legales, establece la proporci\u00f3n en que heredan y autoriza la transferencia de bienes. Sin esta resoluci\u00f3n, las instituciones financieras no liberar\u00e1n cuentas y el Registro de la Propiedad no inscribir\u00e1 transferencias.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfCu\u00e1nto tiempo toma el proceso de declaratoria de herederos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Un caso simple suele tomar de 6 a 12 meses, mientras que un caso moderado toma de 12 a 18 meses. Un caso complejo puede extenderse desde 18 meses hasta varios a\u00f1os, dependiendo de las circunstancias.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 documentos se necesitan para presentar la demanda?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'La demanda se presenta ante el Tribunal de Primera Instancia y debe incluir el certificado de defunci\u00f3n, el testamento, un inventario de bienes y certificaciones del CRIM y de Hacienda. Tambi\u00e9n se requiere localizar el testamento consultando el \u00edndice del Colegio de Notarios.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfC\u00f3mo puedo evitar la declaratoria de herederos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Puede evitarla con un fideicomiso, que permite que los activos pasen directamente a los beneficiarios en semanas en lugar de meses. Tambi\u00e9n ayudan las designaciones de beneficiarios en p\u00f3lizas de seguro, cuentas de retiro y cuentas POD/TOD, idealmente como parte de una planificaci\u00f3n integral con un testamento como red de seguridad.'
          }
        }
      ]
    }
  },
  '/resources/planificacion-sucesoral-puerto-rico': {
    h1: 'Planificaci\u00f3n Sucesoral en Puerto Rico: Gu\u00eda Completa',
    meta: 'Conozca testamentos, la leg\u00edtima, fideicomisos y poderes legales bajo el C\u00f3digo Civil de Puerto Rico (Ley 55-2020). Proteja a su familia con un plan s\u00f3lido.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 tipos de testamento se reconocen en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Bajo el C\u00f3digo Civil actual (Ley 55-2020), Puerto Rico reconoce dos tipos de testamento: el testamento abierto, otorgado ante notario, y el testamento ol\u00f3grafo, escrito a mano. El testamento abierto ya no requiere testigos obligatoriamente bajo el Art. 1644, salvo que lo solicite el testador o el notario. El testamento cerrado fue eliminado por la Ley 55-2020.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 es la leg\u00edtima y puedo desheredar a un hijo en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'La leg\u00edtima es la mitad de su patrimonio que el C\u00f3digo Civil (Ley 55-2020) reserva para sus herederos forzosos: sus hijos y su c\u00f3nyuge sobreviviente, quienes la comparten en partes iguales. No puede desheredar a un hijo excepto en circunstancias muy limitadas.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfPara qu\u00e9 sirve un fideicomiso en la planificaci\u00f3n sucesoral?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Los fideicomisos bajo la Ley 219-2012 evitan la declaratoria de herederos y proporcionan planificaci\u00f3n de incapacidad. Tambi\u00e9n protegen sus activos y mantienen la privacidad de su patrimonio.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfPor qu\u00e9 necesito un poder general duradero?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Un poder general duradero autoriza a alguien de su confianza a manejar sus asuntos financieros si usted queda incapacitado. Sin este documento, su familia tendr\u00eda que solicitar la tutela judicial para poder actuar en su nombre.'
          }
        }
      ]
    }
  },
  '/resources/ley-60-guia-inversionistas': {
    h1: 'Ley 60 en Puerto Rico: Gu\u00eda para Inversionistas',
    meta: 'Gu\u00eda de Ley 60 para inversionistas en Puerto Rico: requisitos de residencia bona fide, beneficios contributivos, proceso ante el DDEC y errores comunes.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfCu\u00e1les son los requisitos de residencia para cualificar bajo la Ley 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Debe cumplir simult\u00e1neamente las tres pruebas de residente bona fide bajo el IRC \u00a7937: la prueba de presencia f\u00edsica (al menos 183 d\u00edas en Puerto Rico durante el a\u00f1o contributivo), la prueba de hogar contributivo (su lugar principal de actividad econ\u00f3mica debe estar en PR) y la prueba de conexi\u00f3n m\u00e1s estrecha. Los 183 d\u00edas por s\u00ed solos no son suficientes, y el incumplimiento de cualquiera de las tres pruebas puede resultar en la descalificaci\u00f3n de su residencia.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 beneficios contributivos ofrece la Ley 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Entre los beneficios clave est\u00e1n la exenci\u00f3n sobre ganancias de capital acumuladas despu\u00e9s de establecer residencia, la exenci\u00f3n sobre intereses y dividendos de fuentes dentro de Puerto Rico, una tasa de 4% sobre servicios de exportaci\u00f3n (Cap\u00edtulo 3) y la exenci\u00f3n de contribuciones federales sobre ingreso de fuente puertorrique\u00f1a bajo el IRC \u00a7933. Los beneficios espec\u00edficos dependen de los t\u00e9rminos del decreto, la fecha de solicitud y la legislaci\u00f3n vigente.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfLa Ley 60 elimina el impuesto sobre el caudal relicto?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Los beneficios de la Ley 60 no se extienden al impuesto sobre caudal relicto, por lo que su patrimonio sigue sujeto al impuesto federal. Adem\u00e1s, Puerto Rico tiene reglas de herencia forzosa que no existen en los estados continentales. Un fideicomiso irrevocable puede ayudar a reducir su patrimonio imponible.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfC\u00f3mo es el proceso de solicitud de la Ley 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Primero debe establecer residencia bona fide en Puerto Rico mediante propiedad, licencia de conducir, registro de votante y cuentas bancarias. Luego se prepara y presenta la solicitud ante el DDEC, cuya revisi\u00f3n y aprobaci\u00f3n puede tomar varios meses. Tras la aprobaci\u00f3n, debe cumplir continuamente con las obligaciones del decreto, como informes anuales, donaci\u00f3n caritativa y la compra de propiedad residencial dentro del plazo establecido.'
          }
        }
      ]
    }
  },
  '/resources/que-es-un-fideicomiso-en-puerto-rico': {
    h1: '\u00bfQu\u00e9 es un fideicomiso en Puerto Rico?',
    meta: 'Qu\u00e9 es un fideicomiso de Puerto Rico, el patrimonio aut\u00f3nomo y en qu\u00e9 se diferencia de un fideicomiso del territorio continental. Gu\u00eda para inversionistas de la Ley 60.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 es un fideicomiso en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Bajo la Ley 219-2012, un fideicomiso de Puerto Rico es un patrimonio aut\u00f3nomo: una persona jur\u00eddica separada con sus propios derechos y obligaciones, no solo una relaci\u00f3n fiduciaria. Cuando la escritura se otorga ante notario y se inscribe en el Registro Especial de Fideicomisos, el fideicomiso cobra existencia como entidad independiente que puede poseer propiedad, demandar y ser demandada.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfEn qu\u00e9 se diferencia de un fideicomiso del territorio continental?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'En el territorio continental, un fideicomiso es esencialmente una relaci\u00f3n en la que el fiduciario tiene el t\u00edtulo en beneficio del fideicomisario. En Puerto Rico, el fideicomiso es una persona jur\u00eddica separada, y la propiedad no pertenece al fideicomitente, al fiduciario ni al fideicomisario, sino al fideicomiso mismo. Esa separaci\u00f3n estructural es el fundamento de la protecci\u00f3n de activos de Puerto Rico.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfSon revocables los fideicomisos de Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Desde el 30 de enero de 2027, s\u00ed. La Ley 153-2026, firmada el 30 de julio de 2026, reconoce expresamente el fideicomiso revocable e invierte la presunci\u00f3n: la escritura que nada diga sobre revocabilidad se presume revocable. Hasta esa fecha todos los fideicomisos eran irrevocables por defecto, salvo los de titulares de decreto IRI de la Ley 60 bajo el C\u00f3digo de Incentivos. La Ley no contiene disposici\u00f3n transitoria para los fideicomisos ya otorgados.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfPor qu\u00e9 importa el patrimonio aut\u00f3nomo para la protecci\u00f3n de activos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Como la propiedad pertenece al fideicomiso mismo y no a ning\u00fan individuo, los acreedores del fideicomitente, del fiduciario o del fideicomisario generalmente no pueden alcanzar los activos del fideicomiso, salvo seg\u00fan lo disponga expresamente la ley. Esta barrera estructural ofrece una protecci\u00f3n a nivel de entidad que no tiene equivalente en las jurisdicciones del territorio continental.'
          }
        }
      ]
    }
  },
  '/resources/como-evitar-el-proceso-sucesorio-en-puerto-rico': {
    h1: 'C\u00f3mo evitar el proceso sucesorio en Puerto Rico',
    meta: 'C\u00f3mo los fideicomisos evitan el proceso sucesorio en Puerto Rico respetando la leg\u00edtima (herencia forzosa). Gu\u00eda de planificaci\u00f3n patrimonial para la Ley 60.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfPuedo usar un fideicomiso para evitar el proceso sucesorio en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'S\u00ed. Los bienes mantenidos en un fideicomiso debidamente dotado pasan a los beneficiarios sin pasar por el proceso sucesorio supervisado por el tribunal. Para los inversionistas de la Ley 60, esto a menudo es aconsejable, pero cualquier estrategia debe respetar la leg\u00edtima, ya que ning\u00fan fideicomiso puede anular los derechos de herencia forzosa.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 es la leg\u00edtima y puede un fideicomiso eludirla?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'La leg\u00edtima es la porci\u00f3n del caudal hereditario que la ley reserva para los herederos forzosos: los descendientes, los ascendientes (si no hay descendientes) y el c\u00f3nyuge sup\u00e9rstite. Ning\u00fan fideicomiso, testamento u otro instrumento puede prevalecer sobre estas protecciones; el Tribunal Supremo lo ha confirmado y los tribunales han anulado donaciones a fideicomisos que invad\u00edan la leg\u00edtima.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfReduce un fideicomiso la leg\u00edtima de mis herederos forzosos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. La leg\u00edtima se calcula con base en el caudal hereditario total, incluidos los bienes mantenidos en fideicomiso. Transferir bienes a un fideicomiso no reduce la leg\u00edtima: solo cambia c\u00f3mo reciben su porci\u00f3n los herederos forzosos, no si la reciben. El C\u00f3digo Civil de 2020 estableci\u00f3 un per\u00edodo de colaci\u00f3n de diez a\u00f1os para las donaciones.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfQu\u00e9 es la cautela socini?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'La cautela socini es una cl\u00e1usula que ofrece a los herederos forzosos una elecci\u00f3n: recibir la leg\u00edtima estricta de forma \u00edntegra y libre de condiciones, o recibir un beneficio mayor a trav\u00e9s del fideicomiso pero sujeto a las condiciones del testador. Es un mecanismo v\u00e1lido y reconocido en Puerto Rico para integrar la planificaci\u00f3n con fideicomisos y la herencia forzosa.'
          }
        }
      ]
    }
  },
  '/resources/cuanto-cuesta-un-fideicomiso-en-puerto-rico': {
    h1: '\u00bfCu\u00e1nto cuesta un fideicomiso en Puerto Rico?',
    meta: 'Costos reales de crear, administrar y extinguir un fideicomiso en Puerto Rico: honorarios de abogado, aranceles notariales, inscripci\u00f3n y gastos anuales. Precios transparentes.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '\u00bfCu\u00e1nto cuesta crear un fideicomiso en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'En Riefkohl Law, los honorarios de abogado comienzan en una tarifa fija de $1,800 para un fideicomiso sencillo y aumentan seg\u00fan la complejidad de la estructura (fideicomisos multigeneracionales, de protecci\u00f3n de activos o integrados con la Ley 60). Estas cifras son ejemplos representativos de lo que reflejan muchos encargos; el honorario de cada caso se determina seg\u00fan sus circunstancias particulares. A esto se suman costos de terceros: los aranceles notariales ($200\u2013$800), la inscripci\u00f3n en el Registro de la Propiedad si hay bienes inmuebles y los sellos de ODIN.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfCu\u00e1les son los costos anuales de administrar un fideicomiso?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'La administraci\u00f3n anual escala con el tama\u00f1o de los activos. Los fiduciarios institucionales suelen cobrar entre 0.5% y 1.5% de los activos bajo administraci\u00f3n, m\u00e1s cargos por transacci\u00f3n. A esto se a\u00f1aden el cumplimiento e informes (aproximadamente $2,000\u2013$5,000) y la preparaci\u00f3n de planillas contributivas. Un fiduciario individual puede costar menos, pero conlleva otros riesgos.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfCu\u00e1nto cuesta extinguir un fideicomiso?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'La extinci\u00f3n de un fideicomiso t\u00edpico con bienes inmuebles suele costar entre $4,500 y $15,000, incluyendo la escritura de extinci\u00f3n o cuenta final, los aranceles notariales y registrales, las planillas contributivas finales y la contabilidad final a los beneficiarios.'
          }
        },
        {
          '@type': 'Question',
          'name': '\u00bfEs m\u00e1s caro tener un fideicomiso o pasar por el proceso sucesorio?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'El proceso sucesorio puede consumir entre el 6% y el 13% del valor del caudal en costos judiciales, honorarios y demoras de 12 a 36 meses, sin los beneficios de protecci\u00f3n de activos ni privacidad. En la mayor\u00eda de los casos, crear y administrar un fideicomiso resulta m\u00e1s econ\u00f3mico a lo largo de la vida que la alternativa del proceso sucesorio.'
          }
        }
      ]
    }
  },
  '/resources/complete-guide-puerto-rico-trusts': {
    h1: 'The Complete Guide to Puerto Rico Trusts',
    title: 'Puerto Rico Trusts: The Complete Guide | Riefkohl Law',
    meta: 'Puerto Rico trusts explained: how they work under Law 219-2012, the types available, what they cost, and how they avoid probate and forced-heirship traps.',
    schema: null
  },
  /* ============================================================
     ACT 153-2026 REVOCABLE TRUSTS — EN/ES cornerstone pair.
     Added Aug 4 2026. Act 153-2026 was signed Jul 30 2026 and takes
     effect Jan 30 2027; it reverses the irrevocability presumption of
     Law 219-2012. Publish BOTH /resources pages together so the
     hreflang pair below never points at a 404.
     ============================================================ */
  '/resources/revocable-trusts-puerto-rico': {
    h1: 'Revocable Trusts in Puerto Rico: What Act 153-2026 Changes',
    title: 'Revocable Trusts in Puerto Rico: Act 153-2026 | Riefkohl Law',
    meta: 'Act 153-2026 legalizes revocable trusts in Puerto Rico effective Jan 30, 2027, and flips the presumption: silence now means revocable. What changes, and what to do first.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Are revocable trusts legal in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Act 153-2026, signed July 30, 2026 and effective January 30, 2027, expressly recognizes the revocable trust in Puerto Rico\'s general trust law. Before that date, only Act 60 Individual Resident Investor decree holders could create one, under the Incentives Code. From January 30, 2027, any settlor may.'
          }
        },
        {
          '@type': 'Question',
          'name': 'When does Act 153-2026 take effect?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'January 30, 2027. The Governor of Puerto Rico signed it on July 30, 2026. It amends 44 articles of the Puerto Rico Trust Act (Law 219-2012).'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens if my Puerto Rico trust deed does not say whether it is revocable?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'For trusts constituted from January 30, 2027, silence means the trust is presumed revocable, unless the deed\'s own clauses clearly show an intent that it be irrevocable. Under the prior rule the opposite was true. Act 153-2026 contains no transition provision for trusts executed before that date, so existing deeds should not be assumed to be recharacterized — but they should be reviewed.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does a revocable trust protect assets from creditors in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No, not while the power to revoke survives. Under Act 153-2026, assets that remain subject to the settlor\'s power of revocation or withdrawal can be reached by the settlor\'s creditors as if the trust did not exist. Retitling real property into the trust does not change that. A revocable trust is a management and succession tool; asset protection generally requires an irrevocable structure.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can a revocable trust override forced heirship in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Act 153-2026 keeps the prohibition on any trust, revocable or irrevocable, that encumbers the forced share (legítima). The one exception preserved in Article 10 allows a trust over the forced portion for descendants or forced heirs who are minors or incapacitated, where they are named the sole beneficiaries of income and principal.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Who does the trustee owe duties to in a Puerto Rico revocable trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The settlor, exclusively, while the settlor retains legal capacity and the power to revoke, unless the trust instrument provides otherwise. Beneficiaries hold expectant interests rather than enforceable rights until the trust becomes irrevocable through conversion, death, or a judicially decreed incapacity.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How is a revocable trust revoked in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'By public deed. If the trust instrument prescribes a method for revocation or amendment, that method is exclusive. Every amendment or revocation must be notified and recorded in the Registry of Trusts within ten days of execution, and it produces effects against third parties only once recorded.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens to a revocable trust when the settlor dies or becomes incapacitated?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'It subsists until the settlor\'s death, or until the settlor loses legal capacity over their property and person by judicial decree, unless the deed provides otherwise. At that point the trust becomes irrevocable and the beneficiaries\' interests consolidate. Because the statutory default keys to a judicial determination, the instrument should define incapacity and set its own workable procedure.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I need to redo my existing Puerto Rico trust because of Act 153-2026?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Not automatically. The Act carries no transition provision, and the new presumption should not be assumed to recharacterize deeds executed under the prior law. The reason to review is different: if a plan depends on irrevocability, that should now be stated expressly, and incapacity provisions drafted against the old defaults may no longer produce the intended result.'
          }
        }
      ]
    }
  },
  '/resources/fideicomisos-revocables-puerto-rico': {
    h1: 'Fideicomisos revocables en Puerto Rico: qué cambia con la Ley 153-2026',
    title: 'Fideicomisos Revocables en PR: Ley 153-2026 | Riefkohl Law',
    meta: 'La Ley 153-2026 reconoce el fideicomiso revocable en Puerto Rico desde el 30 de enero de 2027 e invierte la presunción: el silencio ahora significa revocable.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '¿Son legales los fideicomisos revocables en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Sí. La Ley 153-2026, firmada el 30 de julio de 2026 y vigente el 30 de enero de 2027, reconoce expresamente el fideicomiso revocable en el derecho general de fideicomisos. Antes de esa fecha solo podían constituirlo los titulares de decreto de Individuo Residente Inversionista de la Ley 60. Desde el 30 de enero de 2027 puede hacerlo cualquier fideicomitente.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cuándo entra en vigor la Ley 153-2026?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'El 30 de enero de 2027. Fue firmada el 30 de julio de 2026 y enmienda 44 artículos de la Ley de Fideicomisos de Puerto Rico (Ley 219-2012).'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Qué pasa si mi escritura de fideicomiso no dice si es revocable?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'En los fideicomisos constituidos desde el 30 de enero de 2027, el silencio implica que se presume revocable, salvo que de las propias cláusulas se desprenda claramente la intención de que sea irrevocable. Bajo la norma anterior ocurría lo contrario. La Ley no contiene disposición transitoria para escrituras anteriores, por lo que no debe asumirse que queden recalificadas, pero sí conviene revisarlas.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Protege un fideicomiso revocable los bienes frente a los acreedores?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No, mientras subsista la facultad de revocar. Bajo la Ley 153-2026, los bienes que permanezcan sujetos a la facultad de revocación o retiro pueden ser alcanzados por los acreedores del fideicomitente como si el fideicomiso no existiera. Inscribir un inmueble a nombre del fideicomiso no lo evita. La protección de activos requiere, por lo general, una estructura irrevocable.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Puede un fideicomiso revocable dejar sin efecto la legítima?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. La Ley 153-2026 mantiene la prohibición de todo fideicomiso, revocable o irrevocable, que grave la legítima. La única excepción conservada en el Artículo 10 permite constituirlo sobre la porción legítima a favor de descendientes o legitimarios menores o incapacitados, siempre que sean los únicos beneficiarios de la renta y del capital.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cómo se revoca un fideicomiso en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Mediante escritura pública. Si el instrumento dispone un método para revocarlo o enmendarlo, ese método es exclusivo. Toda enmienda o revocación debe notificarse e inscribirse en el Registro de Fideicomisos dentro de diez días del otorgamiento, y solo surte efectos frente a terceros desde su inscripción.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Tengo que rehacer mi fideicomiso por la Ley 153-2026?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No automáticamente. La Ley no trae disposición transitoria y no debe asumirse que la nueva presunción recalifique escrituras otorgadas bajo la ley anterior. La razón para revisarlo es otra: si el plan depende de la irrevocabilidad, ahora conviene decirlo expresamente, y las cláusulas de incapacidad redactadas contra las normas supletorias anteriores pueden ya no producir el resultado buscado.'
          }
        }
      ]
    }
  },
  '/resources/trust-vs-will-puerto-rico': {
    h1: 'Trust vs. Will in Puerto Rico: Which One Do You Need?',
    title: 'Trust vs. Will in Puerto Rico | Riefkohl Law',
    meta: 'Trust vs. will in Puerto Rico: how each works, what each costs, the forced-heirship rules that bind both, and when you need both. A clear side-by-side.',
    schema: null
  },
  '/resources/forced-heirship-estate-plan': {
    h1: 'Forced Heirship in Puerto Rico: What Your Mainland Will and Trust Miss',
    title: 'Forced Heirship & Your Mainland Estate Plan | Riefkohl Law',
    meta: 'Moved to Puerto Rico? Forced heirship (the legítima) can override your mainland will or trust. What changes, who your forced heirs are, and how to fix it.',
    schema: null
  },
  '/resources/foreign-trust-trap': {
    h1: 'The Foreign Trust Trap: IRS Classification After Moving to Puerto Rico',
    meta: 'Moving to Puerto Rico can accidentally make your domestic trust a foreign trust for IRS purposes. Learn the two-pronged test and how to avoid it.',
    schema: null
  },
  '/resources/mainland-trust-to-puerto-rico': {
    h1: 'Bringing Your Mainland Trust to Puerto Rico: A Guide for Act 60 Holders',
    meta: 'What Section 45147 protects (and doesn\u2019t) when you bring a mainland trust to PR. Governing law risks, civil law gaps, and practical steps.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Can I transfer my mainland revocable trust to Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'You can change the governing law of a mainland trust to Puerto Rico using Section 45147 of the Trust Act, but this does not automatically make it a Puerto Rico trust with full civil-law protections. Mainland revocable trusts may lose key features or face enforcement gaps under PR\u2019s civil law framework. In many cases, creating a new Puerto Rico irrevocable trust and funding it with mainland assets is more effective than migrating an existing trust.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is Section 45147 of the Puerto Rico Trust Act?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Section 45147 of Law 219-2012 allows trusts created under other jurisdictions to change their governing law to Puerto Rico. It preserves the validity of the trust instrument and its terms, but it does not override Puerto Rico\u2019s forced heirship rules or fill gaps where mainland trust concepts (like the Uniform Trust Code) have no civil-law equivalent. An attorney experienced in both systems should review any proposed migration.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Should Act 60 holders keep their mainland trust or create a new PR trust?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'It depends on your goals. Keeping a mainland trust is simpler but may not provide Puerto Rico\u2019s asset protection benefits or integrate well with your Act 60 decree. A new PR irrevocable trust offers stronger creditor protection, probate avoidance under civil law, and better alignment with Act 60 planning\u2014but requires transferring assets and incurring setup costs. Many Act 60 holders maintain their mainland trust for mainland assets and create a separate PR trust for Puerto Rico assets.'
          }
        }
      ]
    }
  },

  /* ---- Act 60 Tax Incentives Subpages ---- */
  '/resources/bona-fide-residency-puerto-rico': {
    title: 'Bona Fide Resident of Puerto Rico: IRS Rules | Riefkohl Law',
    h1: 'Puerto Rico Bona Fide Residency & the Source-of-Income Rules: An Act 60 Guide',
    meta: 'IRS rules for bona fide residents of Puerto Rico: the \xa7937 presence test (183 days + 4 alternatives), tax home test, and closer connection test, explained.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is a bona fide resident of Puerto Rico for federal tax purposes?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A bona fide resident is an individual who satisfies all three tests of IRC \xa7937 for the taxable year: the presence test, the tax home test, and the closer connection test. Only natural persons can qualify. Bona fide residency is the gateway to the federal income exclusion under IRC \xa7933.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I have to spend 183 days a year in Puerto Rico to qualify for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Not strictly for the presence test, which has five alternatives, some allowing fewer than 183 territory days. But you must still satisfy the tax home and closer connection tests for the entire year, and time off-island makes those harder to meet. The cleanest profile is 183-plus days in Puerto Rico with home, business, and family genuinely relocated.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does Act 60 make my U.S. dividends and interest tax-free?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Generally no. Dividends are sourced to where the paying corporation is incorporated, so a dividend from a U.S. corporation stays U.S.-source and federally taxable. Interest is sourced to the residence of the payor. The exclusion and the Act 60 rate apply mainly to Puerto Rico-source capital gains on post-move assets, services, and business income.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens to capital gains on assets I owned before moving to Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Appreciation that accrued before you became a bona fide resident is generally treated as U.S.-source and stays subject to federal capital gains tax even if you sell after the move (the 10-year lookback under Treas. Reg. \xa71.937-2(f)). A special mark-to-market election may change the result and should be planned before any sale.'
          }
        }
      ]
    }
  },
  '/resources/act-38-2026-hb-505': {
    h1: 'Act 38-2026 (HB 505): What Changed for Act 60 Investors',
    meta: 'Act 38-2026 (HB 505): the 4% rate for post-2026 applicants, the $10K donation + $5K report fee, the 6-year non-residency rule, and program extension to 2055.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is the new tax rate under Act 38-2026 for Act 60 investors?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Applications filed on or after January 1, 2027 will be subject to a 4% preferential tax rate on post-residency capital gains, interest, and dividends. The 0% rate is available only for applications submitted on or before December 31, 2026.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are existing Act 60 decree holders affected by Act 38-2026?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Existing decree holders are grandfathered under their current terms and retain the 0% rate. Applications filed before December 31, 2026 also qualify for the grandfathered 0% rate.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How long is the Act 60 program extended under Act 38-2026?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Act 38-2026 extends the Individual Resident Investor program through December 31, 2055, from the prior 2035 sunset date.'
          }
        }
      ]
    }
  },
  '/resources/act-60-filing-date-vs-move-date-deadline': {
    h1: 'Act 60 Deadline: Move by December 31, 2026, or Just File?',
    meta: 'Under Act 38-2026, your Act 60 filing date (not your move date) preserves the 0% rate. What the December 31, 2026 deadline actually requires of 2027 movers.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Do I have to move to Puerto Rico by December 31, 2026?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. The December 31, 2026 cutoff is a filing deadline, not a moving deadline. To seek the legacy 0% regime, a complete Act 60 application must be filed with the DDEC by year-end. You can file before you physically relocate, based on a sworn statement of intent to become a bona fide Puerto Rico resident, though the tax benefits still require establishing bona fide Puerto Rico residency.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens if I file my Act 60 application on or after January 1, 2027?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Your application generally falls under the new 4% regime through December 31, 2055 instead of the legacy 0% regime, and two added requirements attach: a rolling six-year non-residency look-back and recordation of your Puerto Rico residence in the Property Registry within two years.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does the decree approval date affect my Act 60 tax rate?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. The filing date controls the rate. DDEC approval may come months later; the decree takes effect when you accept it under oath, and its benefits apply to qualifying income that accrues after you have established bona fide Puerto Rico residency. Retain proof of a timely, complete filing.'
          }
        }
      ]
    }
  },
  '/resources/act-60-gilti-subpart-f-cfc-business-owners': {
    h1: 'Does Act 60 Eliminate GILTI & Subpart F Tax?',
    meta: 'No. A Puerto Rico Act 60 decree does not switch off GILTI or Subpart F on your CFC, and IRC §933 does not shelter it. What business owners must plan for.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'If I move to Puerto Rico under Act 60, is my foreign company’s income tax-free?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Not automatically. If the company is a controlled foreign corporation and you are a U.S. shareholder, Subpart F and GILTI (revised and renamed Net CFC Tested Income for 2026) can tax certain earnings to you currently at the federal level. An Act 60 decree sets your Puerto Rico rate; it does not eliminate the federal inclusion, and IRC §933 does not shelter it.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does IRC §933 cover my CFC income after I move to Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Section 933 excludes Puerto Rico-source income from U.S. federal tax for a bona fide resident. A Subpart F or GILTI/NCTI inclusion is generally not Puerto Rico-source income, so §933 does not exclude it. The inclusion remains federally taxable independent of your decree.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can restructuring my company fix a GILTI or Subpart F problem?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Often, but it depends on your facts. Moving genuine operations into a properly established Puerto Rico entity can change the analysis, while a paper move that leaves the CFC offshore generally does not. Unwinding or relocating a foreign company can itself trigger U.S. tax and should be modeled with counsel and your CPA first.'
          }
        }
      ]
    }
  },
  '/resources/act-60-savings-calculator': {
    h1: 'Act 60 Savings Calculator: 0% vs. 4% Filing Deadline',
    meta: 'Free calculator: estimate the Puerto Rico tax difference between filing your Act 60 application by December 31, 2026 (0%) versus in 2027 (4%). Not tax advice.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How accurate is the Act 60 savings calculator?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'It is a simplified illustration, not a tax projection. It applies a flat 0% (legacy) or 4% (new regime) Puerto Rico rate to the covered income and post-move gains you enter. It does not separate pre-move from post-move gains, model federal tax, or account for program fees and the annual charitable contribution.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Why doesn’t the calculator count gains that built up before I move?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Because pre-move appreciation generally is not eligible for the 0%/4% rate. Under the federal 10-year lookback rule, gains that accrued before you established Puerto Rico residency typically remain U.S.-taxable. Dated valuations as of your residency start date separate pre-move from post-move gain.'
          }
        }
      ]
    }
  },
  '/resources/ley-60-fecha-limite-2026': {
    h1: 'Fecha límite de la Ley 60: ¿Mudarse en 2026 o solo radicar?',
    meta: 'Bajo la Ley 38-2026, la fecha de radicación —no la de mudanza— preserva la tasa de 0%. Qué exige la fecha límite del 31 de diciembre de 2026.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '¿Tengo que mudarme a Puerto Rico para el 31 de diciembre de 2026?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. La fecha límite del 31 de diciembre de 2026 es una fecha de radicación, no de mudanza. Lo que debe hacerse para fin de año es radicar una solicitud completa ante el DDEC para procurar el régimen heredado de 0%. Usted puede radicar antes de reubicarse físicamente, sobre la base de una declaración jurada de intención, aunque los beneficios aún requieren establecer la residencia bona fide de Puerto Rico.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Qué pasa si radico en o después del 1 de enero de 2027?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Por lo general, su solicitud queda bajo el nuevo régimen de 4% (hasta el 31 de diciembre de 2055) en lugar del régimen heredado de 0%, y se añaden dos requisitos: un periodo móvil de no residencia de seis años y la inscripción de su residencia en el Registro de la Propiedad dentro de dos años.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿La fecha de aprobación del decreto afecta mi tasa?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. La fecha de radicación determina la tasa. La aprobación del DDEC puede llegar meses después; los beneficios aplican al ingreso cualificado que se acumule después de haber establecido la residencia bona fide de Puerto Rico. Conserve la evidencia de una radicación oportuna y completa.'
          }
        }
      ]
    }
  },
  '/resources/leaving-california-for-puerto-rico': {
    h1: 'Leaving California for Puerto Rico: Surviving an FTB Residency Audit',
    meta: 'Moving from California to Puerto Rico for Act 60? California can still tax trailing RSUs, options, and CA-source income — and presumes you stayed a resident.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'If I become a Puerto Rico resident, does California automatically stop taxing me?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Puerto Rico residency for federal purposes and California residency for state purposes are separate determinations under different tests. California taxes you as a resident as long as California remains your domicile and your absence is treated as temporary or transitory, and even after you clearly become a nonresident it can still tax your California-source income.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can California still tax my RSUs or stock options after I move to Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Generally yes, for the portion attributable to California work. RSUs and nonstatutory options earned for services in California are sourced by a workday allocation, and California taxes that California-source portion even if you are a nonresident when the award vests or you exercise.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does the 546-day safe harbor make me a California nonresident automatically?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Often not, for Act 60 movers. It requires being absent under an employment-related contract for at least 546 consecutive days, and does not apply if either spouse has more than $200,000 of intangible income in a taxable year the contract is in effect, or if the principal purpose of the absence is to avoid California tax. Retirees, traders, and pure investors generally are not under a qualifying employment contract at all.'
          }
        }
      ]
    }
  },
  '/resources/leaving-new-york-for-puerto-rico': {
    h1: 'Leaving New York for Puerto Rico: The 183-Day Statutory-Residency Trap',
    meta: 'Moving from New York to Puerto Rico for Act 60? NY’s 183-day statutory-residency test and the 548-day safe harbor can still tax you. How to sever NY domicile.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'If I move to Puerto Rico but keep my New York apartment, can New York still tax me?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Potentially yes. Even if you genuinely change your domicile to Puerto Rico, keeping a New York apartment you can use at will may be treated as a permanent place of abode. If you also spend more than 183 days in New York during the year, you can be taxed as a statutory resident on your worldwide income.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does the 548-day foreign-country safe harbor work for a move to Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Almost certainly not. Puerto Rico is a U.S. territory and possession, not a foreign country, so time spent there generally should not count toward the 548-day rule’s foreign-presence requirement. Plan to rely on a genuine change of domicile, not the 548-day rule, and confirm with New York counsel.'
          }
        },
        {
          '@type': 'Question',
          'name': 'If I become a New York nonresident, do I stop owing New York tax entirely?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Even a true nonresident owes New York tax on New York-source income under Tax Law Section 631, such as wages for services performed in New York, income from a New York business, and gains from New York real property. The move year is filed as a part-year return, and New York City residency is determined separately from the state.'
          }
        }
      ]
    }
  },
  '/resources/estate-planning-act-60-relocatees': {
    h1: 'Estate Planning for Act 60 Relocatees',
    title: 'Estate Planning for Act 60 Relocatees | Riefkohl Law',
    meta: 'Your mainland estate plan doesn’t work in Puerto Rico. The 5 risks Act 60 relocatees face — forced heirship, unrecognized trusts, no decree succession — and how to fix them.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'I already have a trust from my mainland attorney. Do I need a new one?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Not necessarily, but you almost certainly need a Puerto Rico trust to work alongside it. Your mainland trust was not designed for Puerto Rico’s civil-law system and likely does not account for forced heirship, community property, or Law 219-2012. A dual-trust architecture often works best: the mainland trust handles non-PR assets and a new Puerto Rico trust handles PR-situs assets.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I disinherit my children under Puerto Rico law?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Under the 2020 Civil Code, one-half of your estate is reserved for your forced heirs (children and surviving spouse). You keep full control over the other half (libre disposición), and there are legitimate strategies to maximize flexibility within the system. For assets located outside Puerto Rico, the forced-heirship rules may not apply.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens to my Act 60 benefits if I die?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Your Act 60 decree is personal and does not transfer automatically to anyone. Income earned after your death is not covered by your decree. With a business-succession plan, appropriate entity structuring, and instructions for your family, your heirs can apply for their own decree or restructure operations to maintain tax-efficient treatment.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I really need both an Act 60 attorney and an estate-planning attorney?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'You need both skill sets — but not necessarily two firms. The problem with splitting the work is that a mainland estate attorney does not practice Puerto Rico civil law, and a pure Act 60 tax advisor does not draft trusts or wills. We handle both under one roof and one engagement, so your decree, residency, entity structure, and estate plan are designed to work together rather than contradict each other.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much does it cost to bundle Act 60 planning with a Puerto Rico estate plan?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We quote flat fees after a free initial call, not hourly billing. A Puerto Rico trust-based estate plan starts at $1,800, with a will-based plan as a lower-cost alternative; Act 60 decree work starts at $1,700 (excluding U.S. residency and income-sourcing tax advice, which are scoped separately) and depends on whether you pursue the Individual Resident Investor or Export Services chapter. These are representative examples of what many engagements look like; the fee for each matter is determined by your specific circumstances. Handled together, they are coordinated as one engagement so you are not paying two firms to duplicate the same residency and asset analysis.'
          }
        }
      ]
    }
  },
  '/resources/planificacion-sucesoral-ley-60-nuevos-residentes': {
    h1: 'Planificación Sucesoral para Nuevos Residentes bajo la Ley 60',
    title: 'Planificación Sucesoral Ley 60 Puerto Rico | Riefkohl Law',
    meta: 'El plan patrimonial continental no funciona en Puerto Rico: los 5 riesgos de la Ley 60 (legítima, fideicomisos, sucesión del decreto) y cómo resolverlos.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Ya tengo un fideicomiso de mi abogado en el continente. ¿Necesito uno nuevo?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No necesariamente, pero es casi seguro que necesita un fideicomiso de Puerto Rico que funcione junto a él. Su fideicomiso continental no fue diseñado para el sistema de derecho civil de Puerto Rico y probablemente no contempla la legítima, los bienes gananciales ni la Ley 219-2012. A menudo lo mejor es una arquitectura de doble fideicomiso: el continental maneja los bienes fuera de Puerto Rico y uno nuevo de Puerto Rico maneja los bienes con situs en la isla.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Puedo desheredar a mis hijos bajo el derecho de Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Bajo el Código Civil de 2020, la mitad de su caudal está reservada para sus herederos forzosos (hijos y cónyuge supérstite). Usted conserva pleno control sobre la otra mitad (libre disposición), y existen estrategias legítimas para maximizar la flexibilidad dentro del sistema. Para los bienes ubicados fuera de Puerto Rico, las reglas de legítima podrían no aplicar.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Qué pasa con mis beneficios de la Ley 60 si fallezco?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Su decreto de la Ley 60 es personal y no se transfiere automáticamente a nadie. El ingreso generado después de su muerte no está cubierto por su decreto. Con la planificación adecuada —un plan de sucesión del negocio, una estructura de entidad apropiada e instrucciones para su familia— sus herederos pueden solicitar su propio decreto o reestructurar las operaciones para mantener un trato contributivo eficiente.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Realmente necesito un abogado de la Ley 60 y otro de planificación patrimonial?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Necesita ambas competencias, pero no necesariamente dos bufetes. Un abogado patrimonial del continente no ejerce el derecho civil de Puerto Rico, y un asesor contributivo puro de la Ley 60 no redacta fideicomisos ni testamentos. Nosotros manejamos ambos bajo un mismo techo y un mismo encargo, de modo que su decreto, su residencia, la estructura de su entidad y su plan patrimonial se diseñan para funcionar juntos en lugar de contradecirse.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cuánto cuesta combinar la planificación de la Ley 60 con un plan patrimonial de Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Cotizamos honorarios fijos tras una llamada inicial gratuita, no facturación por hora. Un plan patrimonial de Puerto Rico basado en fideicomiso comienza en $1,800, y uno basado en testamento es una alternativa de menor costo; el trabajo del decreto de la Ley 60 comienza en $1,700 (excluyendo la asesoría sobre residencia en EE. UU. y sobre la tributación por fuente del ingreso, que se cotizan aparte). Estas cifras son ejemplos representativos de lo que reflejan muchos encargos; el honorario de cada caso se determina según sus circunstancias particulares. Cuando se manejan juntos, se coordinan como un solo encargo para que no pague a dos bufetes por duplicar el mismo análisis de residencia y de bienes.'
          }
        }
      ]
    }
  },
  '/resources/do-you-still-owe-us-taxes-in-puerto-rico': {
    h1: 'Do You Still Owe U.S. Taxes If You Move to Puerto Rico?',
    title: 'Do You Still Owe US Taxes in Puerto Rico? | Riefkohl Law',
    meta: 'Moving to Puerto Rico changes your federal taxes — it doesn’t end them. What IRC Section 933 excludes, what you still owe, and why you keep filing with the IRS.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'If I move to Puerto Rico, do I still have to file a U.S. federal tax return?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Usually, yes. A bona fide Puerto Rico resident whose income is entirely Puerto Rico-source may not need to file a Form 1040, but the moment you have any non-PR-source income — mainland wages, U.S. rentals, pre-move gains, certain business income — a federal return is generally required. In the year you move, you also file Form 8898 to report becoming a bona fide resident of a U.S. possession.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does Act 60 eliminate my U.S. federal taxes?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Act 60 is a Puerto Rico tax benefit. The federal exclusion comes from IRC Section 933 and reaches only Puerto Rico-source income, and only while you are a bona fide resident. U.S.-source income, most foreign income, self-employment tax, GILTI and Subpart F inclusions, and federal estate tax all remain. Act 60 lowers the Puerto Rico tax; Section 933 removes the federal tax on PR-source income.'
          }
        },
        {
          '@type': 'Question',
          'name': 'I am self-employed with a Puerto Rico business — do I owe Social Security and Medicare tax?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Generally yes. Section 933 excludes Puerto Rico-source income from federal income tax, but it does not exclude it from federal self-employment (SECA) tax. A self-employed bona fide Puerto Rico resident typically still owes Social Security and Medicare tax on net self-employment earnings. How you are structured — sole proprietor versus a corporation paying a reasonable salary — changes the analysis.'
          }
        }
      ]
    }
  },
  '/resources/pagas-impuestos-federales-en-puerto-rico': {
    h1: '¿Todavía Paga Impuestos Federales de EE. UU. si se Muda a Puerto Rico?',
    title: '¿Paga Impuestos Federales en Puerto Rico? | Riefkohl Law',
    meta: 'Mudarse a Puerto Rico cambia sus impuestos federales — no los elimina. Qué excluye el IRC Sección 933, qué sigue debiendo y por qué continúa radicando ante el IRS.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Si me mudo a Puerto Rico, ¿todavía tengo que radicar una planilla federal de EE. UU.?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Usualmente, sí. Un residente bona fide de Puerto Rico cuyo ingreso sea enteramente de fuente puertorriqueña quizás no necesite radicar un Formulario 1040, pero en cuanto tenga cualquier ingreso que no sea de fuente de PR — salarios del continente, alquileres en EE. UU., ganancias pre-mudanza, cierto ingreso de negocio — por lo general se requiere una planilla federal. En el año de la mudanza también radica el Formulario 8898.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿La Ley 60 elimina mis impuestos federales de EE. UU.?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. La Ley 60 es un beneficio contributivo de Puerto Rico. La exclusión federal proviene del IRC Sección 933 y solo alcanza el ingreso de fuente puertorriqueña, y solo mientras usted sea residente bona fide. El ingreso de fuente estadounidense, la mayoría del ingreso extranjero, la contribución por cuenta propia, las inclusiones de GILTI y Subpart F, y el impuesto federal sobre caudal relicto permanecen.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Trabajo por cuenta propia con un negocio en Puerto Rico — ¿debo Seguro Social y Medicare?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Por lo general, sí. La Sección 933 excluye el ingreso de fuente puertorriqueña del impuesto federal sobre ingresos, pero no de la contribución federal por cuenta propia. Un residente bona fide de Puerto Rico que trabaja por cuenta propia normalmente sigue debiendo Seguro Social y Medicare sobre su ingreso neto. Cómo esté estructurado cambia el análisis.'
          }
        }
      ]
    }
  },
  '/resources/act-60-requirements': {
    h1: 'Act 60 Requirements 2026: The Complete Eligibility Checklist',
    title: 'Act 60 Requirements 2026 — Full Checklist | Riefkohl Law',
    meta: 'Every requirement to qualify for and keep an Act 60 decree in 2026 — bona fide residency, the deadline, the home purchase, the $10K donation, and annual reporting.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What are the main requirements to qualify for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'For the Individual Resident Investor decree: become and remain a bona fide Puerto Rico resident under IRC Section 937 (the presence, tax-home, and closer-connection tests), buy a Puerto Rico principal residence within two years, make a $10,000 annual charitable donation beginning in the second year, file an annual report with a $5,000 fee, and obtain a biennial compliance certificate. The Export Services decree adds business-substance and export requirements, and your U.S. federal filing obligations continue throughout.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How many days do I need to spend in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Generally at least 183 days a year in Puerto Rico under the presence test — but that is only one of three tests. You also need your tax home and your closer connection in Puerto Rico. There are alternative day-count safe harbors, but relying on them without the tax-home and closer-connection tests is risky, and any part of a day can count differently when a former high-tax state audits your departure.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I have to buy a house in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'For the Individual Resident Investor decree, yes — you must purchase a Puerto Rico principal residence within two years of obtaining the decree, from an unrelated seller, held personally or in a qualifying trust (not through an LLC). It must be your actual principal residence. The Export Services business decree does not carry this personal-residence requirement.'
          }
        }
      ]
    }
  },
  '/resources/requisitos-ley-60': {
    h1: 'Requisitos de la Ley 60 en 2026: La Lista Completa de Elegibilidad',
    title: 'Requisitos de la Ley 60 en 2026 | Riefkohl Law',
    meta: 'Todos los requisitos para cualificar y conservar un decreto de Ley 60 en 2026 — residencia bona fide, fecha límite, compra de vivienda, donación e informes anuales.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '¿Cuáles son los requisitos principales para cualificar bajo la Ley 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Para el decreto de Inversionista Residente Individual: convertirse y mantenerse como residente bona fide de Puerto Rico bajo el IRC Sección 937 (las pruebas de presencia, hogar contributivo y conexión más estrecha), comprar una residencia principal en Puerto Rico dentro de dos años, hacer una donación caritativa anual de $10,000 a partir del segundo año, radicar un informe anual con un cargo de $5,000 y obtener un certificado de cumplimiento bienal. El decreto de Servicios de Exportación añade requisitos de sustancia y exportación.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cuántos días debo pasar en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Por lo general, al menos 183 días al año en Puerto Rico bajo la prueba de presencia — pero esa es solo una de tres pruebas. También necesita su hogar contributivo y su conexión más estrecha en Puerto Rico. Existen días alternos de refugio seguro, pero depender de ellos sin cumplir las otras dos pruebas es arriesgado, y cualquier parte de un día puede contarse distinto cuando su antiguo estado audita su salida.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Tengo que comprar una casa en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Para el decreto de Inversionista Residente Individual, sí — debe comprar una residencia principal en Puerto Rico dentro de dos años de obtener el decreto, a un vendedor no relacionado, poseída personalmente o en un fideicomiso cualificado (no mediante una LLC). Debe ser su residencia principal real. El decreto de Servicios de Exportación de negocio no conlleva este requisito.'
          }
        }
      ]
    }
  },
  '/resources/act-60-who-should-not-apply': {
    h1: 'Who Should NOT Move to Puerto Rico for Act 60: 7 Red Flags',
    meta: 'Act 60 rewards a genuine move. 7 red flags that mean Puerto Rico’s tax decree may not be worth it — and how to tell before you relocate.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Is Act 60 a scam or too good to be true?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Act 60 is a real, statutory Puerto Rico incentive program, but it is widely oversold. The decree delivers a genuine Puerto Rico tax benefit only for someone who truly relocates and meets the federal bona fide residency tests; it does not eliminate U.S. federal tax, shelter pre-move gains, or reward a paper move.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I get Act 60 benefits without really living in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. The benefits depend on becoming and remaining a bona fide Puerto Rico resident under IRC 937 — generally 183 or more days a year, a Puerto Rico tax home, and a closer connection to Puerto Rico than to the mainland. A mailbox, a part-time condo, or a decree on paper will not survive IRS or state scrutiny.'
          }
        },
        {
          '@type': 'Question',
          'name': 'I am mostly retired — is Act 60 worth it for me?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'It depends on your income. Retirement income and deferred compensation are often not covered by the decree, because they generally trace to services performed before the move. If your income is mainly a pension, the decree may shelter little of it; a large taxable portfolio or large post-move gains can change the analysis.'
          }
        }
      ]
    }
  },
  '/resources/act-60-true-cost-is-it-worth-it': {
    h1: 'What Act 60 Really Costs — and Whether It’s Worth It',
    meta: 'What does Act 60 cost per year, and is it worth it? The all-in budget (roughly a $15K/year floor) and the break-even math for Puerto Rico’s tax decree.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How much does Act 60 cost per year?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Once past the first year, the recurring government floor is roughly $15,000 a year — a $5,000 annual report fee plus a $10,000 charitable contribution split 50/50 between two qualifying Puerto Rico nonprofits (one a child-poverty organization) — plus a biennial compliance certificate and your legal and CPA fees. On top of that are the one-time application fee, the required Puerto Rico home purchase within two years, and your cost of living. Figures are set by regulation and confirmed at filing.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much do you need to make for Act 60 to be worth it?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'There is no single number; it depends on your income type and the timing of your gains. As a rough floor, the program’s roughly $15,000 annual cost means you generally need enough qualifying investment income or post-move capital gains that the Puerto Rico tax saved clearly exceeds it. Income that is mostly U.S.-source wages or retirement usually does not clear the bar. A tax-impact diagnostic answers this for your facts.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is Act 60 worth it for capital gains?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'It can be, but only for gains that accrue after you become a bona fide Puerto Rico resident. Appreciation that built up before the move generally remains U.S.-taxable under the federal 10-year lookback rule. The biggest wins are for people expecting large future gains who establish residency first and realize the gain afterward.'
          }
        }
      ]
    }
  },
  '/resources/act-60-eligibility-quiz': {
    h1: 'Act 60 Eligibility Quiz: Is Puerto Rico’s Tax Decree Right for You?',
    meta: 'Free 2-minute Act 60 self-check: is Puerto Rico’s tax decree a fit for your move and income? Educational only — not a legal eligibility determination.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Does this quiz tell me if I qualify for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. It is an educational self-check that flags whether Act 60 is likely a good fit and what to look into next. Legal eligibility for an Act 60 decree depends on your specific facts — including bona fide residency, the prior-residency look-back, and income sourcing — and can only be determined through a fact-specific review with qualified counsel.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What makes someone a good candidate for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Generally, someone who can genuinely relocate to Puerto Rico (living there 183 or more days a year with their home and family on the island), whose income is substantially investment income or who expects significant capital gains to accrue after the move, and who is prepared to maintain the annual residency, donation, and reporting obligations.'
          }
        }
      ]
    }
  },
  '/resources/irs-enforcement-act-60': {
    h1: 'IRS Enforcement of Act 60: Campaign 685, Criminal Prosecutions & Compliance Risks',
    meta: 'IRS Compliance Campaign 685 targets Act 60 decree holders. Learn about criminal prosecutions, GAO reports, and why you need attorney-client privilege.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Does the IRS have jurisdiction in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. The IRS has full enforcement jurisdiction in Puerto Rico. IRC \u00a7933 provides an exclusion from federal income tax for PR-source income of bona fide residents, but does not limit IRS authority. Act 60 decree holders must file Form 1040 and comply with FBAR and FATCA requirements.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is IRS Compliance Campaign 685?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Campaign 685 is a dedicated IRS enforcement initiative targeting Act 60/22 decree holders, with 12 staff members focused on auditing bona fide residency compliance, income sourcing, and pre-move capital gains treatment.'
          }
        }
      ]
    }
  },
  '/resources/why-law-firm-act-60': {
    h1: 'Why Hire a Law Firm for Act 60 Planning?',
    meta: 'Attorney-client privilege, entity structuring, decree negotiation, and Tax Court representation \u2014 why Act 60 planning requires legal counsel, not just a CPA.',
    schema: null
  },
  '/resources/compliance-certificate-act-52': {
    h1: 'Compliance Certificates & Agreed-Upon Procedures Under Act 52-2022',
    meta: 'Act 52-2022 requires biennial compliance certification for Act 60 decree holders: the CPA/AUP requirement, the Act 188-2024 alternative, and non-compliance risks.',
    schema: null
  },
  '/resources/act-60-decree-comparison': {
    h1: 'Act 60 Decree Comparison: Pre-2020 vs. 2020\u20132025 vs. Post-2026',
    meta: 'Side-by-side comparison of Act 60 decree requirements by era. Tax rates, charitable donations, employment, compliance, and property requirements differ by grant date.',
    schema: null
  },
  '/resources/annual-compliance-calendar': {
    h1: 'Act 60 Annual Compliance Calendar & Filing Deadlines',
    meta: 'Complete Act 60 compliance calendar: DDEC fees, annual report deadlines, FBAR, FATCA, Form 8898, charitable donation requirements, and late-filing consequences.',
    schema: null
  },
  '/resources/federal-reporting-act-60': {
    h1: 'Federal Reporting Obligations for Act 60 Decree Holders',
    meta: 'FBAR, FATCA, CFC/PFIC, Subpart F, and Form 8898 obligations for Act 60 decree holders. Your federal reporting requirements don\u2019t disappear with a PR decree.',
    schema: null
  },
  '/resources/ddec-revocation-procedures': {
    h1: 'DDEC Decree Revocation: Procedures, Consequences & Tax Reversion',
    meta: 'How Act 60 decrees get revoked by DDEC. Administrative procedures, tax reversion to standard rates, DDEC-IRS information exchange, and prevention strategies.',
    schema: null
  },

  /* ---- Session 7: Case Law Blog Posts (9 Category Summaries) ---- */
  // 2026-08-02: the site's single best organic page (41 clicks / 2,065 impr / 2.0% CTR
  // / pos 5.8 in the week of Jul 25-31) had NO entry here at all — no controlled title,
  // meta or schema. Added to capture the cost/"gratis" intent in the query cluster.
  '/blog/declaratoria-de-herederos-puerto-rico': {
    title: 'Declaratoria de Herederos PR: Costos y Pasos | Riefkohl Law',
    meta: 'Cuánto cuesta, cuánto tarda y cómo funciona la declaratoria de herederos en Puerto Rico — paso a paso, y cómo evitarla con un fideicomiso. Llamada gratis.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '¿Cuánto cuesta una declaratoria de herederos en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'El costo depende menos del valor de la herencia que del estado de los documentos del difunto: un caso con testamento, una sola propiedad con título limpio y herederos de acuerdo cuesta una fracción de lo que cuesta un caso intestado con propiedades sin inscribir o disputas familiares. El total se compone de los honorarios de abogado — la única partida negociable, y que en Riefkohl Law se cotiza por tarifa fija — más costos de terceros que nadie puede evitar: sellos y aranceles del tribunal, publicación de edictos, certificaciones del Registro Demográfico, CRIM y Hacienda, estudios de título y, si aplica, tasaciones y contribuciones sobre caudal relicto.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Existe la declaratoria de herederos gratis?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Es un procedimiento judicial y los aranceles del tribunal, la publicación de edictos y las certificaciones tienen costo aunque usted se represente por derecho propio. Si sus ingresos son limitados, puede solicitar al tribunal la exención del pago de aranceles por indigencia, y organizaciones de servicios legales sin fines de lucro en Puerto Rico atienden casos de sucesiones para personas que cualifican. Intentar el proceso sin abogado para ahorrar honorarios suele salir más caro si el Registro de la Propiedad rechaza la resolución y hay que empezar de nuevo.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cuánto tarda una declaratoria de herederos en Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Un caso simple — testamento claro, pocos bienes y herederos de acuerdo — toma de 6 a 12 meses. Un caso moderado, con varias propiedades o asuntos por resolver, toma de 12 a 18 meses. Un caso complejo — sin testamento, con múltiples herederos, disputas, propiedades en varias jurisdicciones o deudas significativas — puede tomar desde 18 meses hasta varios años.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cómo se puede evitar la declaratoria de herederos?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Un fideicomiso bajo la Ley 219-2012 transfiere los bienes a sus herederos sin pasar por el tribunal, y se prepara por tarifa fija desde $1,800 para una estructura sencilla — cifra que es un ejemplo representativo de un encargo típico; el honorario de cada caso se determina según sus circunstancias. Otras herramientas incluyen designar beneficiarios directamente en cuentas y pólizas, y la planificación sucesoral integral. Frente a la declaratoria, evitar el proceso ahorra de 6 a 18 meses de espera y mantiene el patrimonio fuera del expediente judicial público.'
          }
        }
      ]
    }
  },
  '/blog/banking-insurance-trust-disputes-puerto-rico': {
    h1: 'Banking & Insurance Trust Disputes in Puerto Rico — Case Analysis',
    meta: 'Puerto Rico case law on banking and insurance trust disputes. Court rulings on surety bonds, fraudulent transfers, mortgage foreclosure, and trust assets.',
    schema: null
  },
  '/blog/breach-fiduciary-duty-trust-cases-puerto-rico': {
    h1: 'Breach of Fiduciary Duty Cases in Puerto Rico Trust Law',
    meta: 'Key Puerto Rico court decisions on breach of fiduciary duty in trust administration. Trustee liability, imprudent investments, and beneficiary rights.',
    schema: null
  },
  '/blog/trust-beneficiary-rights-liquidation-puerto-rico': {
    h1: 'Trust Beneficiary Rights & Liquidation Procedures in Puerto Rico',
    meta: 'Puerto Rico case law on trust beneficiary standing, procedural rights, and trust liquidation. Court rulings on intervention and winding down trusts.',
    schema: null
  },
  '/blog/public-government-trust-governance-puerto-rico': {
    h1: 'Public & Government Trust Governance Cases in Puerto Rico',
    meta: 'Case analysis of Puerto Rico public trust governance, pension fund trusts, and government trustee duties. Fiduciary accountability in public trusts.',
    schema: null
  },
  '/blog/notable-trust-law-cases-puerto-rico': {
    h1: 'Notable Puerto Rico Trust Law Cases — Discovery, Tax & Fiduciary',
    meta: 'Analysis of key Puerto Rico trust cases covering discovery disputes, tax treatment of trust assets, and fiduciary breach claims.',
    schema: null
  },
  '/blog/testamentary-trust-succession-disputes-puerto-rico': {
    h1: 'Testamentary Trust & Succession Dispute Cases in Puerto Rico',
    meta: 'Puerto Rico court decisions on testamentary trusts, forced heirship disputes, and succession planning. Case analysis on leg\u00edtima, wills, and estates.',
    schema: null
  },
  '/blog/trust-property-disputes-puerto-rico': {
    h1: 'Trust Property Disputes in Puerto Rico — Case Law Analysis',
    meta: 'Puerto Rico court decisions on trust property disputes, real estate held in trust, and trustee management. Key rulings for property owners and trustees.',
    schema: null
  },
  '/blog/trust-validity-challenges-puerto-rico': {
    h1: 'Trust Validity Challenges in Puerto Rico — ODIN Registration & Nullity',
    meta: 'Puerto Rico cases on trust validity challenges, ODIN registration requirements, forced heirship violations, and trust nullity.',
    schema: null
  },
  '/blog/family-law-trusts-trustee-removal-puerto-rico': {
    h1: 'Trust in Family Law & Trustee Removal Cases — Puerto Rico',
    meta: 'Puerto Rico case law on trusts in divorce, trustee removal, and family trust disputes. Marital property in trusts and grounds for removing trustees.',
    schema: null
  },

  /* ---- Session 11: Additional Case Analysis ---- */
  '/blog/anthropic-v-department-of-war-preliminary-injunction': {
    h1: 'Anthropic v. Department of War — Court Blocks Government-Wide AI Company Ban',
    meta: 'Federal court grants preliminary injunction blocking government-wide ban on Anthropic, finding likely First Amendment retaliation, due process violations, and APA claims. Full case analysis.',
    schema: null
  },

  /* ---- Session 10: Spanish Translations of Category Summaries (9 posts) ---- */
  '/blog/banking-insurance-trust-disputes-puerto-rico-es': {
    h1: 'Disputas Bancarias y de Seguros sobre Fideicomisos en Puerto Rico',
    meta: 'Casos clave de disputas bancarias y litigios de seguros relacionados con fideicomisos en Puerto Rico. Fianzas, transferencias fraudulentas y reclamaciones fiduciarias.',
    schema: null
  },
  '/blog/breach-fiduciary-duty-trust-cases-puerto-rico-es': {
    h1: 'Casos de Incumplimiento de Deber Fiduciario — Fideicomisos de Puerto Rico',
    meta: 'Decisiones clave de los tribunales de Puerto Rico sobre incumplimiento de deber fiduciario en la administraci\u00f3n de fideicomisos. Responsabilidad del fiduciario e inversiones imprudentes.',
    schema: null
  },
  '/blog/trust-beneficiary-rights-liquidation-puerto-rico-es': {
    h1: 'Derechos de Beneficiarios y Liquidaci\u00f3n de Fideicomisos en Puerto Rico',
    meta: 'Jurisprudencia de Puerto Rico sobre legitimaci\u00f3n de beneficiarios de fideicomisos, derechos procesales y liquidaci\u00f3n de fideicomisos.',
    schema: null
  },
  '/blog/public-government-trust-governance-puerto-rico-es': {
    h1: 'Gobernanza de Fideicomisos P\u00fablicos y Gubernamentales en Puerto Rico',
    meta: 'An\u00e1lisis de casos de gobernanza de fideicomisos p\u00fablicos en Puerto Rico, fondos de pensiones y deberes fiduciarios gubernamentales.',
    schema: null
  },
  '/blog/notable-trust-law-cases-puerto-rico-es': {
    h1: 'Casos Notables de Derecho de Fideicomisos en Puerto Rico',
    meta: 'An\u00e1lisis de casos clave de fideicomisos en Puerto Rico sobre disputas de descubrimiento de prueba, tratamiento contributivo y deber fiduciario.',
    schema: null
  },
  '/blog/testamentary-trust-succession-disputes-puerto-rico-es': {
    h1: 'Fideicomisos Testamentarios y Disputas Sucesorias en Puerto Rico',
    meta: 'Decisiones judiciales de Puerto Rico sobre fideicomisos testamentarios, disputas de leg\u00edtima y planificaci\u00f3n sucesoria.',
    schema: null
  },
  '/blog/trust-property-disputes-puerto-rico-es': {
    h1: 'Disputas de Propiedad en Fideicomisos en Puerto Rico',
    meta: 'Decisiones de los tribunales de Puerto Rico sobre disputas de propiedad en fideicomisos, bienes inmuebles en fideicomiso y administraci\u00f3n de activos.',
    schema: null
  },
  '/blog/trust-validity-challenges-puerto-rico-es': {
    h1: 'Impugnaciones de Validez de Fideicomisos en Puerto Rico',
    meta: 'Casos de Puerto Rico sobre impugnaciones de validez de fideicomisos, requisitos de registro en ODIN, violaciones de leg\u00edtima hereditaria y nulidad.',
    schema: null
  },
  '/blog/family-law-trusts-trustee-removal-puerto-rico-es': {
    h1: 'Fideicomisos en Derecho de Familia y Remoci\u00f3n de Fiduciarios — Puerto Rico',
    meta: 'Jurisprudencia de Puerto Rico sobre fideicomisos en divorcios, remoci\u00f3n de fiduciarios y disputas de fideicomisos familiares.',
    schema: null
  },

  /* ---- Session 7: Case Law Blog Posts (16 Individual Cases) ---- */
  '/blog/alevras-cga-associates-v-brewster-jr': {
    h1: 'Alevras v. Brewster — Independent Contractor vs. Employee Under ABC Test',
    meta: 'NJ Appellate Division affirms dismissal of wage claims against attorney estate, finding paralegal was independent contractor under ABC test.',
    schema: null
  },
  '/blog/american-health-law-assn-v-estate-of-cunningham': {
    h1: 'American Health Law Assn v. Estate of Cunningham — Case Analysis',
    meta: 'Federal court case analysis on health law association claims against decedent estate. Trust and estate litigation implications.',
    schema: null
  },
  '/blog/andersen-estate-eileen-andersen-pr': {
    h1: 'Andersen Estate — Puerto Rico Estate Administration Case',
    meta: 'Puerto Rico estate administration case involving Eileen Andersen. Court rulings on probate procedures and estate management.',
    schema: null
  },
  '/blog/antero-resources-v-pike-case-08': {
    h1: 'Antero Resources v. Pike — Trust and Resource Dispute Analysis',
    meta: 'Federal court case on trust and resource disputes. Analysis of trust obligations in natural resource and property contexts.',
    schema: null
  },
  '/blog/chaires-v-champion-realty': {
    h1: 'Chaires v. Champion Realty — Trust Property and Real Estate Case',
    meta: 'Court analysis of trust property dispute involving real estate. Trustee obligations and property transfer in trust contexts.',
    schema: null
  },
  '/blog/commonwealth-v-valenti': {
    h1: 'Commonwealth v. Valenti — Government Trust and Regulatory Case',
    meta: 'Court decision on government and trust regulatory matters. Analysis of Commonwealth authority over trust administration.',
    schema: null
  },
  '/blog/estate-of-wallace-lucas-sr': {
    h1: 'Estate of Wallace Lucas Sr. — Estate Administration and Trust Case',
    meta: 'Court analysis of estate administration involving trust assets. Rulings on personal representative duties and estate management.',
    schema: null
  },
  '/blog/in-re-el-a-minor-ch-v-jn': {
    h1: 'In Re E.L., a Minor — Trust Beneficiary Rights for Minors',
    meta: 'Court ruling on minor beneficiary rights in trust administration. Guardianship, trust protections, and best interest standards.',
    schema: null
  },
  '/blog/in-re-kirton-morris-v-housing-authority': {
    h1: 'In Re Kirton: Morris v. Housing Authority — Trust and Housing Case',
    meta: 'Court analysis of trust and housing authority dispute. Public housing, trust assets, and beneficiary eligibility considerations.',
    schema: null
  },
  '/blog/integrated-health-services-v-estate-of-desantis': {
    h1: 'Integrated Health Services v. Estate of DeSantis — Case Analysis',
    meta: 'Federal court case on health services claims against decedent estate. Trust implications for healthcare providers and estates.',
    schema: null
  },
  '/blog/mcarthur-as-pr-of-estate-of-clarence-maurice-logan-jr': {
    h1: 'McArthur v. Estate of Logan Jr. — Personal Representative Duties',
    meta: 'Court ruling on personal representative duties in estate administration. Fiduciary obligations and estate management standards.',
    schema: null
  },
  '/blog/murphy-dependent-of-harold-r-murphy': {
    h1: 'Murphy — Dependent Benefits and Estate Claims Case Analysis',
    meta: 'Court analysis of dependent benefits claims involving estate of Harold R. Murphy. Beneficiary rights and dependency determinations.',
    schema: null
  },
  '/blog/parra-v-rapid-casting-rapid-american-corp': {
    h1: 'Parra v. Rapid Casting — Corporate Trust and Liability Case',
    meta: 'Court analysis of corporate trust and liability dispute. Trust obligations in corporate contexts and successor liability.',
    schema: null
  },
  '/blog/pereira-v-pereira': {
    h1: 'Pereira v. Pereira — Family Trust Dispute Case Analysis',
    meta: 'Court ruling on family trust dispute involving competing beneficiary claims. Trust interpretation and family law implications.',
    schema: null
  },
  '/blog/shabani-v-burton-trustee': {
    h1: 'Shabani v. Burton — Specific Performance of Trust Property Sale',
    meta: 'California appellate court affirms specific performance judgment ordering trust to transfer real property per purchase agreement.',
    schema: null
  },
  '/blog/williams-as-successor-pr-of-estate-of-adams-shirer': {
    h1: 'Williams v. Estate of Adams-Shirer \u2014 Successor PR Duties',
    meta: 'Court analysis of successor personal representative duties in estate administration. Fiduciary standards and estate management.',
    schema: null
  },

  /* ---- Session 12: March 16 2026 Case Law Posts (33 posts) ---- */

  /* TrustLaw Series (8 posts) */
  '/blog/trustlaw-01-no-contest-clause': {
    h1: 'No-Contest Clause Triggered by Declaratory Relief Petition \u2014 Trust Case Analysis',
    meta: 'Minnesota appeals court holds no-contest clause triggered by petition seeking declaratory relief on clause\u2019s own validity. Trust litigation analysis.',
    schema: null
  },
  '/blog/trustlaw-02-trial-court-judgment-vacated': {
    h1: 'Trial Court Judgment Vacated for Unadmitted Accounting Evidence',
    meta: 'Appellate court vacates trust judgment where trial court relied on unadmitted accounting evidence and entered orders against non-party succession.',
    schema: null
  },
  '/blog/trustlaw-03-cy-pres-charitable-trust': {
    h1: 'Cy Pres Applied to Redirect Charitable Trust Funds After Hospital Closure',
    meta: 'Court applies cy pres doctrine to redirect charitable trust funds after hospital closure. Trustee\u2019s due diligence in selecting replacement found inadequate.',
    schema: null
  },
  '/blog/trustlaw-04-trust-adr-provision': {
    h1: 'Trust ADR Provision Cannot Compel Arbitration of Undue Influence Challenges',
    meta: 'Court rules trust ADR provision cannot compel arbitration of undue influence challenges to trust validity. Trust dispute resolution analysis.',
    schema: null
  },
  '/blog/trustlaw-05-elder-abuse-attorneys-fees': {
    h1: 'Prevailing Elder Abuse Plaintiff Entitled to Attorney\u2019s Fees for Intertwined Defense Work',
    meta: 'California court holds prevailing elder abuse plaintiff entitled to attorney\u2019s fees for inextricably intertwined defense work in trust litigation.',
    schema: null
  },
  '/blog/trustlaw-06-statute-of-limitations': {
    h1: 'Statute of Limitations Bars Trust Beneficiaries\u2019 Claims Despite Trustee Concealment',
    meta: 'Court holds statute of limitations bars trust beneficiaries\u2019 claims despite trustee\u2019s deliberate concealment. Constructive notice of probate records is irrebuttable.',
    schema: null
  },
  '/blog/trustlaw-07-arbitration-award-priority-lien': {
    h1: 'Arbitration Award Does Not Create Priority Lien Over Competing Judgment Creditors',
    meta: 'Court rules arbitration award does not create priority lien over competing judgment creditors for escrowed funds. Trust asset priority analysis.',
    schema: null
  },
  '/blog/trustlaw-08-statutory-accounting-breach': {
    h1: 'Remedy for Statutory Accounting Breach Limited to Attorney\u2019s Fees',
    meta: 'Court limits remedy for statutory trust accounting breach to attorney\u2019s fees. Unchallenged summary judgment survives reversal of final judgment.',
    schema: null
  },

  /* BusLaw Series (7 posts) */
  '/blog/buslaw-01-llc-fiduciary-duties-deadlock-dissolution': {
    h1: 'LLC Fiduciary Duties, Corporate Opportunity & Deadlock Dissolution',
    meta: 'Delaware Chancery analyzes LLC fiduciary duties, corporate opportunity doctrine, and deadlock dissolution in litigation finance joint venture.',
    schema: null
  },
  '/blog/buslaw-02-fiduciary-duty-pleading-standards': {
    h1: 'Fiduciary Duty Pleading Standards in Joint Venture Governance Dispute',
    meta: 'Court examines fiduciary duty pleading standards and shareholder agreement interpretation in a joint venture governance dispute.',
    schema: null
  },
  '/blog/buslaw-03-post-closing-fraud-claims-mipa': {
    h1: 'Post-Closing Fraud Claims Subject to Contractual Investigation Procedures Under MIPA',
    meta: 'Court holds post-closing M&A fraud claims are subject to contractual investigation procedures under the membership interest purchase agreement.',
    schema: null
  },
  '/blog/buslaw-04-private-equity-fraud-allegations': {
    h1: 'Private Equity Fraud Allegations Fail \u2014 No Scienter or Justifiable Reliance',
    meta: 'After five-day trial, court dismisses private equity fraud allegations for lack of scienter and justifiable reliance in leveraged acquisition.',
    schema: null
  },
  '/blog/buslaw-05-restrictive-covenant-blue-penciling': {
    h1: 'Restrictive Covenant Enforcement & Blue-Penciling in Private Equity Acquisition',
    meta: 'Court analyzes restrictive covenant enforcement, blue-penciling doctrine, and founder-investor disputes in private equity home healthcare acquisition.',
    schema: null
  },
  '/blog/buslaw-06-settlor-intent-polar-star-tod': {
    h1: 'Settlor Intent as the Polar Star \u2014 Trust Language Controls Over TOD Designations',
    meta: 'Court holds trust language controls over mechanically inconsistent transfer-on-death designations. Settlor intent is the polar star of trust interpretation.',
    schema: null
  },
  '/blog/buslaw-07-trust-beneficiary-standing': {
    h1: 'Trust Beneficiary Lacks Standing to Sue in Individual Capacity for Trust Property',
    meta: 'Court holds trust beneficiary lacks standing to sue individually for trust property. Forged trust instrument cannot be challenged by improper plaintiff.',
    schema: null
  },

  /* PRLaw Series (8 posts) */
  '/blog/prlaw-01-private-operator-exemption': {
    h1: 'Private Operator Exemption from Government Procurement Law \u2014 Puerto Rico',
    meta: 'Puerto Rico appeals court holds private operator exemption shields federally-funded public housing subcontract from bidding board review under Law 73-2019.',
    schema: null
  },
  '/blog/prlaw-02-bankruptcy-related-to-jurisdiction': {
    h1: 'Bankruptcy Court Related-To Jurisdiction After Debtor Discharge \u2014 First Circuit',
    meta: 'First Circuit rules bankruptcy court related-to jurisdiction does not automatically terminate upon debtor\u2019s discharge. Case-specific inquiry required.',
    schema: null
  },
  '/blog/prlaw-03-municipality-overpayment': {
    h1: 'Municipality Ordered to Recover Overpayment to Construction Inspector',
    meta: 'Puerto Rico court orders municipality to recover overpayment where contract amendments and change orders created conflicting compensation obligations.',
    schema: null
  },
  '/blog/prlaw-04-engineer-defective-performance': {
    h1: 'Engineer\u2019s Failure to Deliver Work Product Justifies Contract Cancellation \u2014 PR Civil Code',
    meta: 'Puerto Rico court holds engineer\u2019s failure to communicate or deliver work product constitutes defective performance justifying contract cancellation.',
    schema: null
  },
  '/blog/prlaw-05-dual-tracking-protections': {
    h1: 'Dual-Tracking Protections Under Federal Regulation X and PR Law 169',
    meta: 'Court examines dual-tracking protections under Federal Regulation X and Puerto Rico Law 169. Bank not barred from foreclosure with incomplete loss mitigation application.',
    schema: null
  },
  '/blog/prlaw-06-motor-vehicle-warranty': {
    h1: 'Motor Vehicle Warranty \u2014 Dealer Bears Full Financial Responsibility on Rescission',
    meta: 'Puerto Rico court holds motor vehicle warranty regulation requires dealer to bear full financial responsibility when contract is rescinded for unremedied defect.',
    schema: null
  },
  '/blog/prlaw-07-public-information-access': {
    h1: 'Constitutional Right of Access to Public Information Requires Metadata Disclosure',
    meta: 'Puerto Rico court holds constitutional right of access to public information requires government agency to disclose document metadata in legible format.',
    schema: null
  },
  '/blog/prlaw-08-federal-district-court-jurisdiction': {
    h1: 'Federal Court Must Resolve Jurisdiction Before Discovery Sanctions \u2014 PR Medical Malpractice',
    meta: 'First Circuit holds federal district court must resolve jurisdiction before imposing discovery sanctions in Puerto Rico medical malpractice action.',
    schema: null
  },

  /* WillsAnalysis Series (5 posts) */
  '/blog/willsanalysis-01-percapitawithoutrepresentation': {
    h1: 'Per Capita Distribution Excludes Cousin from $32M Intestate Estate',
    meta: 'Nevada Supreme Court holds per capita without representation distribution excludes first cousin once removed from $32 million intestate estate.',
    schema: null
  },
  '/blog/willsanalysis-02-competingwidows': {
    h1: 'Competing Widows and Conflicting Divorce Records in Heir-Determination Proceeding',
    meta: 'Georgia court resolves competing widows claim with conflicting divorce records in heir-determination proceeding for intestate estate.',
    schema: null
  },
  '/blog/willsanalysis-03-unduinfluencecaretaker': {
    h1: 'Undue Influence Presumption Raised Against Caretaker-Beneficiary',
    meta: 'New York court raises undue influence presumption against caretaker-beneficiary despite drafting attorney\u2019s testimony of proper will execution.',
    schema: null
  },
  '/blog/willsanalysis-04-executorsdeedsvoid': {
    h1: 'Executor\u2019s Deeds Vacated as Void Where Letters Testamentary Obtained by Fraud',
    meta: 'New York court vacates executor\u2019s deeds as void ab initio where letters testamentary were obtained by false pretenses. SCPA 720 protections do not apply.',
    schema: null
  },
  '/blog/willsanalysis-05-willcontestdismissed': {
    h1: 'Will Contest Dismissed \u2014 No Undue Influence Where Decedent Independently Chose to Disinherit',
    meta: 'Court dismisses will contest finding no confidential relationship or undue influence where decedent was practicing physician who independently disinherited daughter.',
    schema: null
  },

  /* WillsSummary Series (5 posts) */
  '/blog/willssummary-01-nevada-ulvang-estate': {
    h1: 'Nevada Per Capita Distribution \u2014 $32M Intestate Estate Case Summary',
    meta: 'Summary of Nevada Supreme Court decision on per capita without representation distribution in $32 million intestate estate of Lina Ulvang.',
    schema: null
  },
  '/blog/willssummary-02-georgia-samuel-estate': {
    h1: 'Competing Widows \u2014 Georgia Heir-Determination Case Summary',
    meta: 'Summary of Georgia appellate decision upholding jury verdict recognizing second wife as legal widow based on circumstantial evidence of prior divorce.',
    schema: null
  },
  '/blog/willssummary-03-newyork-worsell-estate': {
    h1: 'Caretaker-Beneficiary Undue Influence \u2014 New York Estate Case Summary',
    meta: 'Summary of New York Surrogate\u2019s Court decision finding triable issues of undue influence against caretaker-beneficiary despite attorney testimony.',
    schema: null
  },
  '/blog/willssummary-04-newyork-oglesby-estate': {
    h1: 'Executor\u2019s Deeds Void Ab Initio \u2014 New York Estate Case Summary',
    meta: 'Summary of New York court decision vacating executor\u2019s deeds obtained through false pretenses. SCPA 720 good-faith protections inapplicable.',
    schema: null
  },
  '/blog/willssummary-05-newyork-reich-estate': {
    h1: 'Will Contest Dismissed on Summary Judgment \u2014 New York Estate Case Summary',
    meta: 'Summary of New York court dismissal of will contest. No confidential relationship or undue influence found where decedent independently disinherited daughter.',
    schema: null
  },

  /* ---- Session 12: LinkedIn Post — Builders v. PRFA ---- */
  '/blog/mapfre-v-oriental-fondos-publicos-construccion': {
    h1: 'MAPFRE v. Oriental: Fondos P\u00fablicos de Construcci\u00f3n y Compensaci\u00f3n Bancaria',
    meta: 'Tribunal de quiebras ordena a Oriental devolver $464,757 en fondos p\u00fablicos de construcci\u00f3n. An\u00e1lisis de compensaci\u00f3n bancaria, subrogaci\u00f3n equitativa y Ley 388-1951.',
    schema: null
  },

  /* ---- Session 12: Fideicomiso Blog Post ---- */
  '/blog/para-que-sirve-fideicomiso-puerto-rico': {
    h1: '\u00bfPara Qu\u00e9 Sirve un Fideicomiso en Puerto Rico? Lo Que Debes Saber Antes de Dar el Primer Paso',
    meta: 'Descubre qu\u00e9 es un fideicomiso en Puerto Rico, c\u00f3mo se diferencia de los trusts en EE.UU., para qu\u00e9 sirve y qu\u00e9 debes considerar antes de crear uno bajo la Ley 219-2012.',
    schema: null
  },

  /* ---- Session 13: Lascoli v. Fahr Masonry ---- */
  '/blog/lascoli-v-fahr-masonry-partnership-ownership': {
    h1: 'A Partner Promised an Employee an Ownership Stake. Was It Enforceable?',
    meta: 'Pennsylvania court holds that a vague promise of partnership ownership in a one-page employment contract was too indefinite to enforce \u2014 and exceeded a single partner\u2019s authority. Lessons for Puerto Rico businesses.',
    schema: null
  },

  /* ---- Session 14: Herederos no son accionistas ---- */
  '/blog/herederos-no-accionistas-administrador-judicial': {
    h1: 'Herederos no son accionistas \u2014 la información corporativa debe solicitarse a través del administrador judicial en la partición',
    meta: 'El Tribunal de Apelaciones resuelve que los herederos no tienen condición de accionistas antes de la partición. La información corporativa debe canalizarse a través de un administrador judicial.',
    schema: null
  },

  /* ---- Session 15: Enmiendas a fideicomisos pre-2012 (Ley 219) ---- */
  '/blog/enmiendas-fideicomiso-pre-2012-ley-219': {
    h1: '¿Qué ley rige un fideicomiso constituido antes de 2012 que se enmienda hoy?',
    meta: '¿Aplica la Ley 219-2012 a la enmienda de un fideicomiso creado antes de 2012? Los tribunales de Puerto Rico están divididos. Análisis y sentencia completa (PDF).',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '¿Aplica la Ley 219-2012 a un fideicomiso constituido antes de 2012?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'La Ley 219-2012 dispuso vigencia inmediata (Art. 76) pero guardó silencio sobre los fideicomisos preexistentes. El Tribunal de Apelaciones ha resuelto que no les aplica (KLCE202400164), pero el TPI de San Juan ha resuelto que sí les aplica cuando se enmiendan después de 2012. El Tribunal Supremo aún no ha resuelto la controversia.' }
        },
        {
          '@type': 'Question',
          'name': '¿Qué ley rige una enmienda hecha hoy a un fideicomiso pre-2012?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Existen dos posturas: que la enmienda se rige por la ley vigente al otorgamiento del fideicomiso (Código Civil de 1930), porque una enmienda no es una novación extintiva; o que se rige por la Ley 219-2012, porque es la única ley vigente que puede autorizar el acto nuevo. Ante la incertidumbre, la práctica prudente es redactar la enmienda de modo que sea válida bajo ambos regímenes.' }
        },
        {
          '@type': 'Question',
          'name': '¿Cuáles son las diferencias prácticas entre la Ley 219-2012 y el Código Civil de 1930?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Las principales: la Ley 219 impone un término máximo de 75 años, permite terminación judicial por frustración de propósitos, codifica deberes fiduciarios de lealtad, información e inversionista prudente, y reconoce el fideicomiso como patrimonio autónomo con personalidad jurídica plena. Bajo el Código Civil de 1930, el fiduciario solo respondía por descuido voluntario o negligencia manifiesta.' }
        }
      ]
    }
  },

  /* ---- Pricing Page ---- */
  '/pricing': {
    h1: 'Transparent Flat-Fee Pricing — No Hourly Billing',
    meta: 'Riefkohl Law offers flat-fee pricing for all services. Trusts, estate planning, Act 60 advisory, and business formation. Know your investment upfront.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Why does Riefkohl Law use flat-fee pricing?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Flat-fee pricing aligns our incentives with yours. For most matters you know the cost up front before work begins — no escalating hourly bills. This model encourages efficiency and gives you budget certainty for your legal needs.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is the initial consultation really free?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Your first strategy call with Attorney Riefkohl is completely free with no obligation. We use this call to understand your situation, explain your options, and provide a specific flat-fee quote if you decide to proceed.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What payment methods do you accept?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We accept credit cards, bank transfers (ACH), checks, and wire transfers. Payment plans are available for larger engagements. The flat fee is typically collected at the start of the engagement.'
          }
        }
      ]
    }
  }
};

/* ================================================
   1. OVERRIDE H1 TAGS
   ================================================ */
function fixH1() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var config = SEO[path];
  if (!config) return;

  /* Find the blog dashboard hero title (the duplicate H1) */
  var heroH1 = document.querySelector('.rl-bd-hero-title');
  if (heroH1 && config.h1) {
    heroH1.textContent = config.h1;
  }

  /* Also check for subpage H1 */
  var subH1 = document.querySelector('.rl-sub-hero h1');
  if (subH1 && config.h1) {
    /* Subpages already have their own H1 from resources-fix.html, leave them alone */
  }

  /* If no dashboard H1 found, look for any generic H1 */
  if (!heroH1 && !subH1) {
    var allH1s = document.querySelectorAll('h1');
    allH1s.forEach(function(h1) {
      if (h1.textContent.trim() === 'Explore Our Legal Analysis') {
        h1.textContent = config.h1;
      }
    });
  }
}

/* ================================================
   2. SET UNIQUE META DESCRIPTIONS
   ================================================ */
function fixMeta() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var config = SEO[path];
  if (!config) return;

  /* Override the SERP <title> when an explicit title is provided. Squarespace
     otherwise appends the site name to a title that already contains it,
     producing "... | Riefkohl Law — Riefkohl Law". Setting document.title here
     gives Googlebot (which renders JS) the clean, CTR-tuned title. */
  if (config.title) {
    document.title = config.title;
  }

  if (!config.meta) return;

  /* Update or create meta description */
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', config.meta);
  } else {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', config.meta);
    document.head.appendChild(metaDesc);
  }

  /* Also update OG description */
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', config.meta);
  }
}

/* ================================================
   3. ADD SELF-REFERENCING CANONICAL TAGS
   (with overrides for stale duplicate posts)
   ================================================ */
/* Stale duplicate posts canonicalize to the kept version */
var CANONICAL_OVERRIDES = {
  '/blog/mun-de-aguada-v-w-construction-2': '/blog/mun-de-aguada-v-w-construction-3',
  /* Thin asset-protection stub consolidates into the 4,300-word authority page (Part 5). */
  '/resources/asset-protection-irrevocable-trusts': '/resources/asset-protection-trusts-pr'
};

function fixCanonical() {
  var canonical = document.querySelector('link[rel="canonical"]');
  var p = window.location.pathname.replace(/\/$/, '');
  if (CANONICAL_OVERRIDES[p]) p = CANONICAL_OVERRIDES[p];
  var url = 'https://www.riefkohllaw.com' + p;
  if (url === 'https://www.riefkohllaw.com') url = 'https://www.riefkohllaw.com/';

  if (canonical) {
    canonical.setAttribute('href', url);
  } else {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);
  }
}

/* ================================================
   4. INJECT FAQ SCHEMA (FAQPage)
   ================================================ */
function injectFAQSchema() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var config = SEO[path];
  if (!config || !config.schema) return;

  /* The SEO map here is the single source of truth for FAQ content: it is the
     version that gets reviewed, repriced, and legally corrected. This used to
     bail out when any FAQPage already existed, which meant a FAQPage pasted
     into a page's own header injection silently suppressed ours — on five money
     pages that shipped an obsolete forced-heirship rule (two-thirds rather than
     the one-half set by Ley 55-2020), superseded prices, and a wrong municipal
     exemption percentage to Google.

     So: remove any FAQPage we did not author, then inject ours. Guard against
     re-injecting our own on the second runFixes() pass (idempotency is required
     — see the note at the corrections loop). */
  var ours = null;
  var existing = document.querySelectorAll('script[type="application/ld+json"]');
  for (var i = 0; i < existing.length; i++) {
    var data;
    try { data = JSON.parse(existing[i].textContent); } catch (e) { continue; }
    if (!data || data['@type'] !== 'FAQPage') continue;
    if (existing[i].getAttribute('data-rl-faq') === '1') { ours = existing[i]; continue; }
    /* A FAQPage from the Squarespace page source — stale by definition. */
    if (existing[i].parentNode) existing[i].parentNode.removeChild(existing[i]);
  }
  if (ours) return; /* already injected on an earlier pass */

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-rl-faq', '1');
  script.textContent = JSON.stringify(config.schema);
  document.head.appendChild(script);
}

/* ================================================
   5. FIX STAGING URL LEAKS
   ================================================ */
function fixStagingUrls() {
  /* Find and replace any links pointing to the staging domain */
  var stagingDomain = 'octagon-parakeet-dn35.squarespace.com';
  var productionDomain = 'www.riefkohllaw.com';

  document.querySelectorAll('a[href*="' + stagingDomain + '"]').forEach(function(link) {
    var href = link.getAttribute('href');
    link.setAttribute('href', href.replace(stagingDomain, productionDomain));
  });
}

/* ================================================
   6. ADD ALT TEXT TO IMAGES MISSING IT
   ================================================ */
function fixImageAlts() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';

  document.querySelectorAll('img:not([alt]), img[alt=""]').forEach(function(img) {
    var src = (img.getAttribute('src') || '').toLowerCase();

    /* Try to determine alt text from context */
    if (src.indexOf('logo') >= 0 || src.indexOf('original') >= 0) {
      img.setAttribute('alt', 'Riefkohl Law - Puerto Rico Law Firm');
    } else if (src.indexOf('riefkohl') >= 0 || src.indexOf('hans') >= 0 || src.indexOf('attorney') >= 0 || src.indexOf('headshot') >= 0) {
      img.setAttribute('alt', 'Hans Riefkohl - Puerto Rico Trust and Estate Planning Attorney');
    } else {
      /* Generic contextual alt based on page */
      var config = SEO[path];
      if (config && config.h1) {
        img.setAttribute('alt', config.h1);
      }
    }
  });
}

/* ================================================
   7. SITEWIDE LEGAL DISCLAIMER FOOTER
   ================================================ */
function injectDisclaimer() {
  if (document.getElementById('rl-legal-disclaimer')) return;

  var footer = document.querySelector('footer') || document.querySelector('[data-section-id]');
  if (!footer) return;

  var disc = document.createElement('div');
  disc.id = 'rl-legal-disclaimer';
  disc.style.cssText = 'max-width:1140px;margin:0 auto;padding:20px 28px 24px;border-top:1px solid #e8e9ee;text-align:center;font-size:.75rem;color:#706b62;line-height:1.5;';
  disc.innerHTML = '<p style="margin:0 0 6px;"><strong>Legal Disclaimer</strong></p>'
    + '<p style="margin:0 0 4px;">The information on this website is for general informational purposes only and does not constitute legal or tax advice. No attorney-client relationship is created by accessing this site, submitting a contact form, or scheduling a consultation. Confidential or time-sensitive information should not be sent through this website.</p>'
    + '<p style="margin:0 0 4px;">Tax results depend on individual circumstances including residency, income sourcing, and applicable law. Past results do not guarantee future outcomes.</p>'
    + '<p style="margin:0;">Attorney Advertising. Riefkohl Law \u2014 273 Ponce de Le\u00f3n Ave., San Juan, PR 00917. Licensed in Puerto Rico.</p>';

  /* Insert at the bottom of the footer or before the footer */
  var sqFooter = document.querySelector('footer');
  if (sqFooter) {
    sqFooter.appendChild(disc);
  } else {
    document.body.appendChild(disc);
  }
}

/* ================================================
   8. INJECT ATTORNEY/LOCALBUSINESS SCHEMA (SITEWIDE)
   ================================================ */
function injectAttorneySchema() {
  /* Only inject once, on every page */
  var existing = document.querySelectorAll('script[type="application/ld+json"]');
  for (var i = 0; i < existing.length; i++) {
    try {
      var data = JSON.parse(existing[i].textContent);
      if (data['@type'] === 'Attorney' || data['@type'] === 'LegalService') return;
    } catch(e) {}
  }

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    'name': 'Riefkohl Law',
    'description': 'Puerto Rico law firm focused on trusts, estate planning, Act 60 tax incentives, and business law.',
    'url': 'https://www.riefkohllaw.com',
    'telephone': '+1-787-236-1657',
    'email': 'hans@riefkohllaw.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '273 Ponce de Le\u00f3n Ave.',
      'addressLocality': 'San Juan',
      'addressRegion': 'PR',
      'postalCode': '00917',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 18.4505,
      'longitude': -66.0667
    },
    'priceRange': '$$',
    'openingHours': 'Mo-Fr 09:00-17:00',
    'areaServed': {
      '@type': 'State',
      'name': 'Puerto Rico'
    },
    'knowsLanguage': ['en', 'es'],
    'founder': {
      '@type': 'Person',
      'name': 'Hans E. Riefkohl',
      'jobTitle': 'Founder & Managing Attorney'
    },
    'makesOffer': [
      {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Trust & Estate Planning'}},
      {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Act 60 Tax Advisory'}},
      {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Business Formation'}},
      {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Government Contracts'}},
      {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Bankruptcy Services'}}
    ]
  };

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/* ================================================
   9. PERSON SCHEMA FOR /about PAGE
   ================================================ */
function injectPersonSchema() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path !== '/about' && path !== '/about-us') return;

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Hans E. Riefkohl',
    'jobTitle': 'Founder & Managing Attorney',
    'worksFor': {
      '@type': 'LegalService',
      'name': 'Riefkohl Law',
      'url': 'https://www.riefkohllaw.com'
    },
    'url': 'https://www.riefkohllaw.com/about',
    'sameAs': ['https://www.linkedin.com/in/riefkohl'],
    'knowsLanguage': ['en', 'es'],
    'alumniOf': [
      {'@type': 'EducationalOrganization', 'name': 'University of Puerto Rico School of Law'},
      {'@type': 'EducationalOrganization', 'name': 'Villanova University'}
    ]
  };

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/* ================================================
   10. OG:TITLE, OG:TYPE, AND TWITTER CARD META TAGS
   ================================================ */
function fixOpenGraphAndTwitter() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var config = SEO[path];
  /* Entries may set `title` without an `h1` (e.g. live blog posts whose H1 we do not
     want to touch), so fall back rather than emitting og:title="undefined". */
  var fallbackTitle = document.title.split('—')[0].split('|')[0].trim();
  var pageTitle = (config && (config.h1 || config.title)) || fallbackTitle;
  var pageDesc = config ? config.meta : '';
  var isBlogPost = path.indexOf('/blog/') === 0;
  var pageType = isBlogPost ? 'article' : 'website';
  var pageUrl = 'https://www.riefkohllaw.com' + (path === '/' ? '' : path);

  /* OG:title */
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', pageTitle);
  } else {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', pageTitle);
    document.head.appendChild(ogTitle);
  }

  /* OG:type */
  var ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) {
    ogType.setAttribute('content', pageType);
  } else {
    ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', pageType);
    document.head.appendChild(ogType);
  }

  /* OG:url */
  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', pageUrl);
  } else {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', pageUrl);
    document.head.appendChild(ogUrl);
  }

  /* Twitter Card meta tags */
  function setMeta(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (el) {
      el.setAttribute('content', content);
    } else {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      el.setAttribute('content', content);
      document.head.appendChild(el);
    }
  }

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', pageTitle);
  if (pageDesc) setMeta('twitter:description', pageDesc);

  /* OG:image hardening. Squarespace's global social-sharing image is served over
     insecure http:// (mixed content), which causes LinkedIn / Facebook / WhatsApp
     to drop the preview card entirely. Upgrade any http:// social image to https://
     so the card renders, and mirror it into twitter:image for the large card.
     NOTE: the underlying image is a small 480x480 email signature — a proper
     1200x630 branded card should be uploaded in Squarespace > Marketing >
     Social Sharing; this code only guarantees the URL is https. */
  function upgradeSocialImg(selector) {
    var el = document.querySelector(selector);
    if (!el) return null;
    var val = el.getAttribute('content') || '';
    if (val.indexOf('http://') === 0) {
      val = 'https://' + val.slice('http://'.length);
      el.setAttribute('content', val);
    }
    return val || null;
  }
  upgradeSocialImg('meta[property="og:image:secure_url"]');
  upgradeSocialImg('meta[property="og:image:url"]');
  var ogImg = upgradeSocialImg('meta[property="og:image"]');
  if (ogImg) setMeta('twitter:image', ogImg);
}

/* ================================================
   11. SET lang="es" FOR SPANISH PAGES
   ================================================ */
function fixLangAttribute() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var isSpanish = path.indexOf('/espanol') === 0 ||
                  path.indexOf('/recursos') === 0 ||
                  path.match(/-es$/);
  if (isSpanish) {
    document.documentElement.lang = 'es';
  }
}

/* ================================================
   9b. WEBSITE SCHEMA WITH SEARCHACTION (homepage only)
   ================================================ */
function injectWebSiteSchema() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path !== '/') return;

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Riefkohl Law',
    'url': 'https://www.riefkohllaw.com',
    'description': 'Puerto Rico law firm focused on trusts, estate planning, Act 60 tax incentives, and business law.',
    'inLanguage': ['en', 'es'],
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://www.riefkohllaw.com/blog?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/* ================================================
   ACCESSIBILITY: SKIP TO CONTENT LINK
   ================================================ */
function injectSkipLink() {
  if (document.querySelector('.rl-skip-link')) return;

  var mainContent = document.querySelector('main') || document.querySelector('#page') ||
    document.querySelector('.page-section:first-of-type') || document.querySelector('article');
  if (mainContent && !mainContent.id) mainContent.id = 'main-content';
  var targetId = mainContent ? (mainContent.id || 'main-content') : 'page';

  var link = document.createElement('a');
  link.className = 'rl-skip-link';
  link.href = '#' + targetId;
  link.textContent = 'Skip to main content';
  document.body.insertBefore(link, document.body.firstChild);
}

/* Secure all external links with noopener noreferrer */
function secureExternalLinks() {
  var host = window.location.hostname;
  var links = document.querySelectorAll('a[href^="http"]');
  for (var i = 0; i < links.length; i++) {
    try {
      var url = new URL(links[i].href);
      if (url.hostname !== host) {
        links[i].setAttribute('target', '_blank');
        var rel = (links[i].getAttribute('rel') || '').toLowerCase();
        if (rel.indexOf('noopener') < 0) rel += ' noopener';
        if (rel.indexOf('noreferrer') < 0) rel += ' noreferrer';
        links[i].setAttribute('rel', rel.trim());
      }
    } catch(e) {}
  }
}

/* ================================================
   13. SQUARESPACE PAGE CONTENT CORRECTIONS
   Fixes for content in the Squarespace editor that
   cannot be changed via code injection alone.
   ================================================ */

/* A1: Act 60 municipal/property tax exemption percentages.
   REMOVED — this was a duplicate of fixAct60ExemptionPercentages() in
   js/legal-content-fixes.js (#13), and this copy was NOT idempotent: its
   rules used unanchored global replaces, so on a second pass the corrected
   property figure ("75% ... property") re-matched the municipal rule's
   `indexOf('75%') && indexOf('municipal')` guard within the same text node
   and was wrongly rewritten to 50%. Harmless only while this whole module
   was dead; once the module ran to completion the 800ms retry corrupted a
   statutory figure on /act-60-tax-incentives.
   The legal-content-fixes.js version uses proximity-anchored regexes
   (`75%([\s\w]{0,40})(municipal|patente)`) and is idempotent, so it alone
   owns this correction. Correct values: municipal 50%, property 75%. */

/* A4: NRNC estate/gift tax — fix "born in" to domicile-based */
function fixNRNCClassification() {
  if (path !== '/puerto-rico-estate-planning-nrnc-classification') return;

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    var text = node.nodeValue;

    /* Fix imprecise "born in a U.S. territory" language */
    if (text.indexOf('born in') >= 0 && (text.indexOf('territory') >= 0 || text.indexOf('Puerto Rico') >= 0) && text.indexOf('NRNC') >= 0) {
      node.nodeValue = text.replace(
        /born in a U\.S\. territory[^.]*classified as non-?residents? not citizens?[^.]*/i,
        'Puerto Rico residents may be classified as non-resident not citizens (NRNC) for federal estate and gift tax purposes depending on citizenship status and domicile history under 8 U.S.C. \u00a71402 and IRC \u00a72209'
      );
    }

    /* Fix estate tax exemption amount ($13.61M → $15M) */
    if (text.indexOf('$13.61 million') >= 0) {
      node.nodeValue = text.replace(
        /approximately \$13\.61 million[^)]*/,
        '$15 million per individual (as set by the One Big Beautiful Bill Act, signed July 2025, which made the increased exemption permanent with future inflation indexing'
      );
    }

    /* Fix gift tax exclusion year */
    if (text.indexOf('$19,000 for 2025') >= 0) {
      node.nodeValue = node.nodeValue.replace('$19,000 for 2025', '$19,000 for 2026');
    }
  }
}

/* A6: Corporate tax rate description */
function fixCorporateTaxRate() {
  if (path !== '/act-60-tax-incentives' && path !== '/act-60-export-services') return;

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    var text = node.nodeValue;
    if (text.indexOf('18.5%') >= 0 && text.indexOf('37.5%') >= 0) {
      node.nodeValue = text.replace(
        /18\.5%\s*to\s*37\.5%/,
        '20% normal tax plus graduated surtax (combined maximum 37.5%)'
      );
    }
  }
}

/* B9: Advertising language — "maximum tax benefits" → "available tax benefits" */
function fixAdvertisingLanguage() {
  if (path.indexOf('act-60') < 0 && path.indexOf('tax-incentives') < 0) return;

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    var text = node.nodeValue;
    if (text.indexOf('maximum tax benefits') >= 0) {
      node.nodeValue = text.replace(/maximum tax benefits/g, 'available tax benefits under Act 60');
    }
  }
}

/* ================================================
   EXECUTE ALL FIXES
   ================================================ */
function runFixes() {
  fixMeta();
  fixCanonical();
  injectFAQSchema();
  /* injectAttorneySchema(); — firm entity centralized in schema-markup.js (@id .../#firm)
     to avoid duplicate/conflicting Attorney+LegalService schemas. */
  injectPersonSchema();
  injectWebSiteSchema();
  fixOpenGraphAndTwitter();
  fixLangAttribute();
  injectSkipLink();

  /* H1, staging URLs, and images need the DOM to be more fully loaded */
  fixH1();
  fixStagingUrls();
  fixImageAlts();
  injectDisclaimer();
  secureExternalLinks();

  /* Squarespace page content corrections (A1, A4, A6, B9).
     Isolated: these run last, so an exception here used to propagate out of
     runFixes() and abort everything after it in the module (hreflang, retry
     timers). Each is independent, so failure of one must not stop the others. */
  /* NB: the Act 60 exemption-percentage correction is deliberately absent —
     legal-content-fixes.js (#13) owns it. See the note above. Every function
     listed here must stay idempotent, because runFixes() is called again
     800ms later. */
  var corrections = [
    fixNRNCClassification,
    fixCorporateTaxRate,
    fixAdvertisingLanguage
  ];
  for (var c = 0; c < corrections.length; c++) {
    try { corrections[c](); } catch (err) {
      if (window.console && console.warn) {
        console.warn('[seo-fixes] content correction failed:', corrections[c].name, err);
      }
    }
  }
}

/* Run on DOMContentLoaded and again after a delay for dynamic content */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    runFixes();
    /* Retry after blog dashboard renders */
    setTimeout(runFixes, 800);
    setTimeout(fixH1, 2000);
  });
} else {
  runFixes();
  setTimeout(runFixes, 800);
  setTimeout(fixH1, 2000);
}

/* ================================================
   12. HREFLANG TAGS FOR EN/ES PAGES
   ================================================ */

/* Blog post pairs */
/* NOTE: The 9 case-law trust-dispute "-es" Spanish counterparts were removed because
   those Squarespace pages do not yet exist (they returned 404). Pointing hreflang at
   404 pages hurts SEO. Re-add each pair here once the Spanish page is published. */
var HREFLANG_PAIRS = [
  /* CPA bridge posts (Act 38-2026 + CPA content) */
  ['act-38-2026-estate-plan', 'act-38-2026-plan-sucesoral'],
  ['cpa-bridge-trust-advice', 'cpa-bridge-trust-advice-es'],
  ['cpa-bridge-legal-checklist', 'cpa-bridge-legal-checklist-es']
];

/* Core page pairs (non-blog) */
var CORE_HREFLANG_PAIRS = [
  ['/', '/espanol'],
  ['/services', '/espanol-servicios'],
  ['/about', '/espanol-sobre-nosotros'],
  ['/contact', '/espanol-contacto'],
  ['/puerto-rico-trusts', '/espanol-fideicomisos'],
  ['/calendly', '/espanol-cita'],
  /* ['/blog', '/espanol-blog'] removed — /espanol-blog page does not exist (404). */
  ['/act-60-tax-incentives', '/espanol-ley-60'],
  ['/resources', '/recursos-es'],
  /* Trust resource EN↔ES pairs — added Jun 24 2026 once the 3 Spanish pages were
     created & published at these /resources/ slugs (native crawlable content). */
  ['/resources/what-is-puerto-rico-trust', '/resources/que-es-un-fideicomiso-en-puerto-rico'],
  ['/resources/avoiding-probate-legitima', '/resources/como-evitar-el-proceso-sucesorio-en-puerto-rico'],
  ['/resources/trust-costs-puerto-rico', '/resources/cuanto-cuesta-un-fideicomiso-en-puerto-rico'],
  /* Act 60 deadline EN↔ES pair — added Jun 26 2026; publish BOTH /resources pages together so hreflang never points at a 404. */
  ['/resources/act-60-filing-date-vs-move-date-deadline', '/resources/ley-60-fecha-limite-2026'],
  /* Act 60 requirements pillar + "still owe US taxes" EN↔ES pairs — added Jul 2026; publish BOTH pages of each pair together so hreflang never points at a 404. */
  ['/resources/act-60-requirements', '/resources/requisitos-ley-60'],
  ['/resources/do-you-still-owe-us-taxes-in-puerto-rico', '/resources/pagas-impuestos-federales-en-puerto-rico'],
  /* Act 60 + estate-planning bundle EN↔ES pair — added Jul 5 2026; publish BOTH /resources pages together so hreflang never points at a 404. */
  ['/resources/estate-planning-act-60-relocatees', '/resources/planificacion-sucesoral-ley-60-nuevos-residentes'],
  /* Act 153-2026 revocable trusts EN↔ES pair — added Aug 4 2026; publish BOTH /resources pages together so hreflang never points at a 404. */
  ['/resources/revocable-trusts-puerto-rico', '/resources/fideicomisos-revocables-puerto-rico']
];

function injectHreflang() {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var base = 'https://www.riefkohllaw.com';

  /* Check blog post pairs */
  var slug = path.replace(/^\/blog\//, '');
  if (path.indexOf('/blog/') === 0) {
    for (var i = 0; i < HREFLANG_PAIRS.length; i++) {
      var en = HREFLANG_PAIRS[i][0], es = HREFLANG_PAIRS[i][1];
      if (slug === en || slug === es) {
        addHreflangLinks(base + '/blog/' + en, base + '/blog/' + es);
        return;
      }
    }
  }

  /* Check core page pairs */
  for (var j = 0; j < CORE_HREFLANG_PAIRS.length; j++) {
    var enPage = CORE_HREFLANG_PAIRS[j][0], esPage = CORE_HREFLANG_PAIRS[j][1];
    if (path === enPage || path === esPage) {
      addHreflangLinks(base + enPage, base + esPage);
      return;
    }
  }
}

function addHreflangLinks(enUrl, esUrl) {
  var linkEn = document.createElement('link');
  linkEn.rel = 'alternate'; linkEn.hreflang = 'en';
  linkEn.href = enUrl;
  var linkEs = document.createElement('link');
  linkEs.rel = 'alternate'; linkEs.hreflang = 'es';
  linkEs.href = esUrl;
  var linkDefault = document.createElement('link');
  linkDefault.rel = 'alternate'; linkDefault.hreflang = 'x-default';
  linkDefault.href = enUrl;
  document.head.appendChild(linkEn);
  document.head.appendChild(linkEs);
  document.head.appendChild(linkDefault);
}

injectHreflang();

// ── Remove incorrect S Corporation Election section from business formation blog post ──
(function removeSCorpContent() {
  if (window.location.pathname !== '/blog/how-to-form-a-company-in-puerto-rico-llc-corporation-amp-act-60-structures') return;

  function removeElements() {
    var h3s = document.querySelectorAll('h3');
    for (var i = 0; i < h3s.length; i++) {
      if (h3s[i].textContent.trim() === 'S Corporation Election') {
        var next = h3s[i].nextElementSibling;
        if (next && next.tagName === 'P' && next.textContent.indexOf('pass-through taxation') !== -1) {
          next.remove();
        }
        h3s[i].remove();
        break;
      }
    }
    // Remove "S Corp: Pass-through to shareholders..." line from tax summary
    var paragraphs = document.querySelectorAll('p');
    for (var j = 0; j < paragraphs.length; j++) {
      var txt = paragraphs[j].textContent.trim();
      if (txt.indexOf('S Corp') !== -1 && txt.indexOf('Pass-through to shareholders') !== -1) {
        paragraphs[j].remove();
        break;
      }
    }
    // Fix "waysX" typo introduced by accidental editor keystroke
    var allP = document.querySelectorAll('.entry-content p, .blog-item-content p, article p');
    for (var k = 0; k < allP.length; k++) {
      if (allP[k].textContent.indexOf('waysX') !== -1) {
        allP[k].innerHTML = allP[k].innerHTML.replace('waysX', 'ways.');
        break;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeElements);
  } else {
    removeElements();
  }
})();

/* ================================================
   13. ENHANCED 404 PAGE
   ================================================ */
(function enhance404() {
  /* Squarespace 404 pages contain class .sqs-page-error or a specific body class */
  function is404() {
    return document.body.classList.contains('collection-type-page') &&
      (document.querySelector('.sqs-page-error') ||
       document.title.indexOf('Page Not Found') >= 0 ||
       document.title.indexOf('404') >= 0);
  }

  function inject() {
    if (!is404()) return;
    var container = document.querySelector('.sqs-page-error') ||
      document.querySelector('main') ||
      document.querySelector('#page .page-section');
    if (!container) return;
    if (container.querySelector('.rl-404-help')) return;

    var isEs = window.location.pathname.indexOf('/espanol') === 0 ||
      window.location.pathname.indexOf('/recursos-') === 0;

    var wrap = document.createElement('div');
    wrap.className = 'rl-404-help';
    wrap.innerHTML = isEs
      ? '<h2>P\u00e1gina no encontrada</h2>'
        + '<p>Lo sentimos, esta p\u00e1gina no existe o fue movida. Pruebe uno de estos enlaces:</p>'
        + '<div class="rl-404-links">'
        + '<a href="/espanol">Inicio</a>'
        + '<a href="/espanol-servicios">Servicios</a>'
        + '<a href="/blog">Blog Legal</a>'
        + '<a href="/recursos-es">Recursos</a>'
        + '<a href="/espanol-contacto">Contacto</a>'
        + '<a href="/espanol-cita">Agendar Cita</a>'
        + '</div>'
        + '<p class="rl-404-cta">O ll\u00e1menos al <a href="tel:+17872361657">(787) 236-1657</a></p>'
      : '<h2>Page Not Found</h2>'
        + '<p>Sorry, this page doesn\u2019t exist or has been moved. Try one of these:</p>'
        + '<div class="rl-404-links">'
        + '<a href="/">Home</a>'
        + '<a href="/services">Services</a>'
        + '<a href="/blog">Legal Blog</a>'
        + '<a href="/resources">Resources</a>'
        + '<a href="/contact">Contact</a>'
        + '<a href="/calendly">Free Consultation</a>'
        + '</div>'
        + '<p class="rl-404-cta">Or call us at <a href="tel:+17872361657">(787) 236-1657</a></p>';

    container.appendChild(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

})();
