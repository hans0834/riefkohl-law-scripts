// Riefkohl Law SEO Fixes — Deployed via Squarespace Code Injection (Header)
// PURPOSE: Fix duplicate H1, duplicate meta descriptions, add FAQ schema, add canonical tags
// DEPLOY: Squarespace → Settings → Advanced → Code Injection → Header
// Mobile menu overlay fix: white text on transparent bg was unreadable

(function(){
'use strict';

/* ================================================
   PAGE-SPECIFIC SEO CONFIGURATION
   ================================================ */
var SEO = {
  '/': {
    h1: 'Puerto Rico Law Firm — Trusts, Estate Planning & Business Law',
    meta: 'Puerto Rico law firm specializing in trusts, estate planning, Act 60 tax incentives, and business law. Free strategy call. (787) 236-1657.',
    schema: null
  },
  '/services': {
    h1: 'Legal Services & Flat-Fee Pricing',
    meta: 'Transparent flat-fee legal services in Puerto Rico. Trusts, estate planning, business formation, Act 60 advisory, and government contracts.',
    schema: null
  },
  '/about': {
    h1: 'About Hans E. Riefkohl — Founder & Managing Attorney',
    meta: 'Attorney Hans Riefkohl brings 8+ years of experience from DLA Piper and LUMA Energy. Puerto Rico trusts, estate planning, and corporate law.',
    schema: null
  },
  '/about-us': {
    h1: 'About Hans E. Riefkohl — Founder & Managing Attorney',
    meta: 'Attorney Hans Riefkohl brings 8+ years of experience from DLA Piper and LUMA Energy. Puerto Rico trusts, estate planning, and corporate law.',
    schema: null
  },
  '/contact': {
    h1: 'Contact Riefkohl Law in San Juan, Puerto Rico',
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
    meta: 'Book a complimentary strategy call with Riefkohl Law. Discuss your Puerto Rico trust, estate plan, or business matter. No obligation.',
    schema: null
  },
  '/puerto-rico-trusts': {
    h1: 'Puerto Rico Trust Attorney — Fideicomisos & Asset Protection',
    meta: 'Puerto Rico trust attorney specializing in irrevocable trusts under Law 219-2012, asset protection, and fiduciary services. Free consultation.',
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
            'text': 'Puerto Rico trusts operate under a civil law framework (Law 219-2012) rather than common law. Key differences include: trusts are irrevocable by default, forced heirship rules may affect trust planning, and Puerto Rico trusts can offer unique asset protection and tax planning advantages for both residents and Act 60 decree holders.'
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
        }
      ]
    }
  },
  '/estate-planning': {
    h1: 'Estate Planning Attorney in Puerto Rico',
    meta: 'Puerto Rico estate planning attorney. Wills, trusts, probate, powers of attorney, and healthcare directives. Bilingual service. Free consultation.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is forced heirship in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Forced heirship (legitima) under Puerto Rico\'s Civil Code (Ley 55-2020) reserves one-half of the estate for forced heirs — children and the surviving spouse, who share the legitima equally. The remaining half can be distributed freely. This system provides more flexibility than the prior three-thirds rule, which reserved two-thirds.'
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
    h1: 'Act 60 Tax Incentives — Puerto Rico Tax Advisory',
    meta: 'Act 60 tax incentive attorney in Puerto Rico. Export services, individual investor decrees, compliance, and planning for relocators. Free call.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is Act 60 in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Act 60 (the Puerto Rico Incentives Code of 2019) consolidates former Acts 20 and 22, providing tax incentives for businesses and individuals who relocate to Puerto Rico. Benefits depend on decree terms, application timing, and applicable law. Historically, qualifying individual investors have received significant exemptions on capital gains and investment income, but benefit levels are subject to legislative change. Consult an attorney to verify current eligibility and terms.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I qualify for Act 60 individual investor benefits?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'To qualify, you generally must become a bona fide resident of Puerto Rico, which typically requires physical presence (at least 183 days per year), a tax home in Puerto Rico, and a closer connection to Puerto Rico than any other jurisdiction. Additional decree obligations — such as charitable donations and property purchase — apply and may vary based on application timing and current law. Consult an attorney to confirm current eligibility requirements.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can an Act 60 lawyer help with IRS audits?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. The IRS actively scrutinizes Act 60 decree holders, particularly regarding income sourcing and residency compliance. An experienced Act 60 attorney can help ensure your documentation supports your residency position, structure your affairs for compliance, and represent you if the IRS challenges your Act 60 benefits.'
          }
        }
      ]
    }
  },
  '/business-formation': {
    h1: 'Puerto Rico Business Formation — LLC, Corp & Startup Services',
    meta: 'Puerto Rico business formation attorney. LLC, corporation, and startup legal services. Flat-fee pricing. Bilingual counsel. Free strategy call.',
    schema: null
  },
  '/government-contracts': {
    h1: 'Government Contracts Attorney — Federal & PR Procurement',
    meta: 'Puerto Rico government contracts attorney. Bid protests, contract disputes, procurement compliance, and federal/state contracting. Free consultation.',
    schema: null
  },
  /* Spanish pages */
  '/espanol': {
    h1: 'Bufete de Abogados en Puerto Rico — Fideicomisos, Sucesiones y Derecho Corporativo',
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
    meta: 'Lcdo. Hans Riefkohl, fundador de Riefkohl Law. 8+ anos de experiencia en DLA Piper y LUMA Energy. Fideicomisos y derecho corporativo en PR.',
    schema: null
  },
  '/espanol-contacto': {
    h1: 'Contacto — Riefkohl Law, San Juan, Puerto Rico',
    meta: 'Contacte a Riefkohl Law en San Juan, PR. Llame al (787) 236-1657 o agende una consulta gratuita. Fideicomisos, sucesiones y derecho empresarial.',
    schema: null
  },
  '/espanol-fideicomisos': {
    h1: 'Abogado de Fideicomisos en Puerto Rico — Ley 219-2012',
    meta: 'Abogado de fideicomisos en Puerto Rico. Fideicomisos irrevocables bajo Ley 219-2012, proteccion de activos y planificacion sucesoral. Consulta gratis.',
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
  '/espanol-ley-60': {
    h1: 'Incentivos Contributivos Ley 60 — Asesoria Legal en Puerto Rico',
    meta: 'Abogado de Ley 60 en Puerto Rico. Servicios de exportacion, inversionistas individuales, cumplimiento y planificacion para relocalizados.',
    schema: null
  },
  '/espanol-corporativo': {
    h1: 'Formacion de Empresas en Puerto Rico — LLC, Corp y Startups',
    meta: 'Abogado de formacion de empresas en Puerto Rico. LLC, corporaciones y servicios legales para startups. Tarifa fija. Consulta gratuita.',
    schema: null
  },

  /* ---- Trust Law Article Series (15 articles) ---- */
  '/resources/what-is-puerto-rico-trust': {
    h1: 'What Is a Puerto Rico Trust? A Guide for Act 60 Investors',
    meta: 'Puerto Rico trusts (fideicomisos) are autonomous estates under Law 219-2012, not fiduciary relationships. Learn how this distinction affects Act 60 investors.',
    schema: null
  },
  '/resources/types-of-trusts': {
    h1: 'Types of Trusts Available Under Puerto Rico Law',
    meta: 'Survey of Puerto Rico trust types under Ley 219-2012: asset protection, estate planning, ILITs, SLATs, special needs, dynasty trusts, and the Act 60 revocable trust exception.',
    schema: null
  },
  '/resources/act-60-trust-planning': {
    h1: 'Trust Planning for Act 60 Investors: Mainland vs. Puerto Rico Trusts',
    meta: 'Should Act 60 investors keep their mainland revocable trust or create a PR irrevocable trust? Compare asset protection, tax, and flexibility tradeoffs.',
    schema: null
  },
  '/resources/modifying-irrevocable-trusts': {
    h1: 'How Modifiable Are Puerto Rico\u2019s Irrevocable Trusts?',
    meta: 'Puerto Rico irrevocable trusts can be modified through 4 statutory mechanisms under Law 219-2012. Consent, judicial, cy pres, and trust protector options.',
    schema: null
  },
  '/resources/avoiding-probate-legitima': {
    h1: 'Avoiding Probate in Puerto Rico: Trusts and the Leg\u00edtima',
    meta: 'How Act 60 investors can avoid Puerto Rico probate with trusts while respecting forced heirship (leg\u00edtima) rules under the 2020 Civil Code.',
    schema: null
  },
  '/resources/asset-protection-trusts-pr': {
    h1: 'Asset Protection Trusts Under Puerto Rico\u2019s Trust Act',
    meta: 'Puerto Rico\u2019s autonomous estate doctrine provides asset protection no mainland DAPT can match. Learn the three-layer creditor protection structure.',
    schema: null
  },
  '/resources/special-needs-trusts-medicaid': {
    h1: 'Special Needs Trusts and Medicaid Planning in Puerto Rico',
    meta: 'Special needs trusts in Puerto Rico: Medicaid\u2019s any-circumstances test, first-party vs. third-party SNTs, and why PR\u2019s Plan Vital changes everything.',
    schema: null
  },
  '/resources/ilits-and-slats': {
    h1: 'ILITs and SLATs: Advanced Trust Planning for Puerto Rico Residents',
    meta: 'Irrevocable life insurance trusts and spousal lifetime access trusts for Act 60 investors. Estate tax reduction with PR-specific integration.',
    schema: null
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
    meta: 'Transparent breakdown of Puerto Rico trust costs. Attorney fees ($1,500\u2013$35,000+), notarial fees, ODIN registration, administration, and hidden expenses.',
    schema: null
  },
  '/resources/fiduciary-duties-trustees': {
    h1: 'Fiduciary Duties Under Puerto Rico Trust Law',
    meta: 'The 16 statutory trustee duties under Puerto Rico\u2019s Trust Act, dual-track liability framework, removal standards, and 8+ case illustrations.',
    schema: null
  },
  '/resources/family-trust-pitfalls': {
    h1: 'Family Trust Pitfalls: When Good Intentions Go Wrong',
    meta: '10 specific pitfalls that have destroyed family trusts in Puerto Rico courts. Case illustrations and surgical solutions for each.',
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
    schema: null
  },

  /* ---- Session 7: Case Law Blog Posts (9 Category Summaries) ---- */
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
  if (heroH1) {
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
  if (!config || !config.meta) return;

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
   ================================================ */
function fixCanonical() {
  var canonical = document.querySelector('link[rel="canonical"]');
  var url = 'https://www.riefkohllaw.com' + window.location.pathname.replace(/\/$/, '');
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

  /* Check if FAQ schema already exists */
  var existing = document.querySelectorAll('script[type="application/ld+json"]');
  for (var i = 0; i < existing.length; i++) {
    try {
      var data = JSON.parse(existing[i].textContent);
      if (data['@type'] === 'FAQPage') return; /* Already present */
    } catch(e) {}
  }

  var script = document.createElement('script');
  script.type = 'application/ld+json';
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
      if (config) {
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
  disc.style.cssText = 'max-width:1140px;margin:0 auto;padding:20px 28px 24px;border-top:1px solid #e8e9ee;text-align:center;font-size:.72rem;color:#706b62;line-height:1.5;';
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
   EXECUTE ALL FIXES
   ================================================ */
function runFixes() {
  fixMeta();
  fixCanonical();
  injectFAQSchema();

  /* H1, staging URLs, and images need the DOM to be more fully loaded */
  fixH1();
  fixStagingUrls();
  fixImageAlts();
  injectDisclaimer();
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
   7. HREFLANG TAGS FOR EN/ES BLOG POSTS
   ================================================ */
var HREFLANG_PAIRS = [
  ['banking-insurance-trust-disputes-puerto-rico', 'banking-insurance-trust-disputes-puerto-rico-es'],
  ['breach-fiduciary-duty-trust-cases-puerto-rico', 'breach-fiduciary-duty-trust-cases-puerto-rico-es'],
  ['trust-beneficiary-rights-liquidation-puerto-rico', 'trust-beneficiary-rights-liquidation-puerto-rico-es'],
  ['public-government-trust-governance-puerto-rico', 'public-government-trust-governance-puerto-rico-es'],
  ['notable-trust-law-cases-puerto-rico', 'notable-trust-law-cases-puerto-rico-es'],
  ['testamentary-trust-succession-disputes-puerto-rico', 'testamentary-trust-succession-disputes-puerto-rico-es'],
  ['trust-property-disputes-puerto-rico', 'trust-property-disputes-puerto-rico-es'],
  ['trust-validity-challenges-puerto-rico', 'trust-validity-challenges-puerto-rico-es'],
  ['family-law-trusts-trustee-removal-puerto-rico', 'family-law-trusts-trustee-removal-puerto-rico-es']
];

function injectHreflang() {
  var slug = window.location.pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
  var base = 'https://www.riefkohllaw.com/blog/';
  for (var i = 0; i < HREFLANG_PAIRS.length; i++) {
    var en = HREFLANG_PAIRS[i][0], es = HREFLANG_PAIRS[i][1];
    if (slug === en || slug === es) {
      var linkEn = document.createElement('link');
      linkEn.rel = 'alternate'; linkEn.hreflang = 'en';
      linkEn.href = base + en;
      var linkEs = document.createElement('link');
      linkEs.rel = 'alternate'; linkEs.hreflang = 'es';
      linkEs.href = base + es;
      var linkDefault = document.createElement('link');
      linkDefault.rel = 'alternate'; linkDefault.hreflang = 'x-default';
      linkDefault.href = base + en;
      document.head.appendChild(linkEn);
      document.head.appendChild(linkEs);
      document.head.appendChild(linkDefault);
      break;
    }
  }
}
injectHreflang();

})();
