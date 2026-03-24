
(function(){
'use strict';

/* ================================================
   PAGE-SPECIFIC SEO CONFIGURATION
   ================================================ */
var SEO = {
  '/': {
    h1: 'Puerto Rico Law Firm — Trusts, Estate Planning & Business Law',
    meta: 'Puerto Rico law firm focused on trusts, estate planning, Act 60 tax incentives, and business law. Free strategy call. (787) 236-1657.',
    schema: null
  },
  '/services': {
    h1: 'Legal Services & Flat-Fee Pricing',
    meta: 'Transparent flat-fee legal services in Puerto Rico. Trusts, estate planning, business formation, Act 60 advisory, and government contracts.',
    schema: null
  },
  '/about': {
    h1: 'About Hans E. Riefkohl — Founder & Managing Attorney',
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
    meta: 'Puerto Rico trust attorney focused on irrevocable trusts under Law 219-2012, asset protection, and fiduciary services. Free consultation.',
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
        },
        {
          '@type': 'Question',
          'name': 'What legal documents do I need after getting my Act 60 decree?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'After receiving your Act 60 decree, you should update or create several legal documents: a Puerto Rico-compliant will that accounts for forced heirship rules, a trust under Law 219-2012 for asset protection and tax planning, updated powers of attorney valid under PR law, healthcare directives, and domicile change documentation. Your mainland estate plan likely needs revision to work within Puerto Rico\'s civil law framework.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does the 2055 extension affect estate planning for Act 60 holders?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Act 38-2026 extended the Act 60 program through 2055, creating a 30-year planning horizon. This makes multi-generational trust structures more practical and increases the importance of coordinating your estate plan with your decree benefits. Since decrees are non-transferable at death, strategic trust planning is essential to preserve wealth accumulated under the incentive.'
          }
        }
      ]
    }
  },
  '/act-60-tax-incentives': {
    h1: 'Act 60 Tax Incentives — 4% Corporate Rate & Individual Investor Decrees in Puerto Rico',
    meta: 'Puerto Rico Act 60 attorney: 4% corporate tax for export services, individual investor decrees (0% capital gains through 2026 — new 4% rate from 2027). Application guidance, compliance, IRS audit defense. Free strategy call.',
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
          'name': 'How do I qualify for Act 60 individual investor benefits?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'To qualify, you must become a bona fide resident of Puerto Rico by satisfying all three tests under IRC §937: (1) physical presence of at least 183 days per year, (2) a tax home in Puerto Rico, and (3) a closer connection to Puerto Rico than to any other jurisdiction. All three tests must be met — 183 days alone is not sufficient. Additional decree obligations such as charitable donations and property purchase also apply. Consult an attorney to confirm current eligibility requirements.'
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
          'name': 'What is Act 38-2026 and how does it affect Act 60 decrees?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Act 38-2026 extended the Act 60 Individual Resident Investor incentive program through December 31, 2055. This 30-year extension makes long-term estate planning and multi-generational trust strategies significantly more viable for decree holders. Existing decree holders should review their estate plans to take advantage of the extended planning horizon.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does Act 38-2026 affect my estate plan?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. The extension of Act 60 incentives to 2055 means your estate plan should account for a much longer planning horizon. Multi-generational trust structures become more practical, and strategies for preserving wealth accumulated under your decree — including decree succession planning and coordination with forced heirship rules — should be reviewed with an attorney.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I need a lawyer in addition to my CPA for Act 60?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. While your CPA handles tax compliance and filing, an attorney addresses the legal structures that protect your Act 60 benefits — trust creation under Law 219-2012, domicile change documentation, property purchase review, estate planning that accounts for forced heirship, and decree succession planning. These are legal matters that fall outside the scope of accounting services.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is decree succession planning?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Act 60 decrees are personal and non-transferable — they do not pass to your heirs at death. Decree succession planning involves structuring your estate to preserve the wealth accumulated under your decree\'s tax benefits, using tools like irrevocable trusts, strategic asset titling, and coordination with forced heirship rules under Puerto Rico\'s Civil Code.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can my CPA set up a trust for me in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Trust creation in Puerto Rico requires legal counsel. Puerto Rico trusts are governed by Law 219-2012 and operate under a civil law framework that differs significantly from mainland common law trusts. The trust instrument must comply with specific statutory requirements, and only an attorney can draft, review, and execute the trust deed and ensure compliance with forced heirship rules.'
          }
        }
      ]
    }
  },
  '/business-formation': {
    h1: 'Puerto Rico Business Formation — LLC, Corp & Startup Services',
    meta: 'Puerto Rico business formation attorney. LLC, corporation, and startup legal services. Flat-fee pricing. Bilingual counsel. Free strategy call.',
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
            'text': 'Los fideicomisos de Puerto Rico operan bajo un marco de derecho civil (Ley 219-2012) en lugar del derecho com\u00fan. Las diferencias clave incluyen: los fideicomisos son irrevocables por defecto, las reglas de leg\u00edtima pueden afectar la planificaci\u00f3n del fideicomiso, y los fideicomisos de PR pueden ofrecer ventajas \u00fanicas de protecci\u00f3n de activos y planificaci\u00f3n contributiva.'
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
    h1: 'Incentivos Contributivos Ley 60 — Asesoria Legal en Puerto Rico',
    meta: 'Abogado de Ley 60 en Puerto Rico. Servicios de exportacion, inversionistas individuales, cumplimiento y planificacion para relocalizados.',
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
    meta: 'Comprehensive Act 60 resource center. Residency tests, income sourcing, compliance, audit triggers, and planning guides for Puerto Rico relocators.',
    schema: null
  },
  '/act-60-federal-residency-test-puerto-rico': {
    h1: 'Act 60 Federal Residency Test — Bona Fide PR Resident Requirements',
    meta: 'Federal residency test for Act 60 decree holders. Presence test, tax home test, closer connection test, and safe harbor rules for Puerto Rico.',
    schema: null
  },
  '/act-60-income-sourcing-rules-puerto-rico': {
    h1: 'Act 60 Income Sourcing Rules — Puerto Rico vs. U.S. Source Income',
    meta: 'Income sourcing rules for Act 60 investors. How the IRS classifies Puerto Rico vs. U.S. source income and why it matters for your decree benefits.',
    schema: null
  },
  '/act-60-compliance-requirements-audit-triggers': {
    h1: 'Act 60 Compliance Requirements & Audit Triggers',
    meta: 'Act 60 compliance checklist and common IRS audit triggers. Annual reporting, charitable donations, property requirements, and red flags to avoid.',
    schema: null
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
    schema: null
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
    meta: 'Puerto Rico trusts (fideicomisos) are autonomous estates under Law 219-2012, not fiduciary relationships. Learn how this distinction affects Act 60 investors.',
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
    meta: 'Puerto Rico\u2019s autonomous estate doctrine offers distinctive asset protection advantages over mainland DAPTs. Learn the three-layer creditor protection structure.',
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
  '/resources/act-38-2026-trust-planning': {
    h1: 'Act 38-2026 and Long-Term Trust Planning: What the 2055 Extension Means',
    meta: 'Act 38-2026 extended Act 60 incentives to 2055. Learn how this 30-year horizon changes trust planning strategies for decree holders in Puerto Rico.',
    schema: null
  },

  /* ---- CPA Legal Claims Check — New Resource Pages ---- */
  '/resources/act-38-2026-hb-505': {
    h1: 'Act 38-2026 (HB 505): What Changed for Act 60 Investors',
    meta: 'Comprehensive legal analysis of Act 38-2026 (HB 505): new 4% rate for post-2026 applicants, grandfathering provisions, $15K donation, program extension to 2055.',
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
    meta: 'Act 52-2022 requires biennial compliance certification for all Act 60 decree holders. Learn about AUP engagements and what happens if you don\u2019t renew.',
    schema: null
  },
  '/resources/bona-fide-residency-guide': {
    h1: 'Complete Guide to Bona Fide Residency Under IRC \u00a7937',
    meta: 'All three IRC \u00a7937 residency tests explained: presence (with five alternative paths), tax home, and closer connection. Plus the difference between requirements and supporting evidence.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What are the three tests for bona fide residency in Puerto Rico?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'IRC \u00a7937(a) requires satisfying three tests: (1) the Presence Test (183 days or alternative paths), (2) the Tax Home Test (your principal place of business must be in PR), and (3) the Closer Connection Test (no closer connection to the U.S. or another country). All three must be met simultaneously.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is the 183-day rule the only way to satisfy the presence test?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. The regulations under \u00a71.937-1 provide five alternative paths, including a 549-day/three-year test, a no-significant-connection test, a year-of-move safe harbor, and transitional rules for existing PR residents.'
          }
        }
      ]
    }
  },

  /* ---- Migrated Blog Post SEO (existing resource subpages) ---- */
  '/resources/act-60-estate-planning-mistakes': {
    h1: '5 Critical Mistakes Act 60 Holders Make with Estate Planning',
    meta: 'The five most common estate planning mistakes Act 60 decree holders make when relocating to Puerto Rico, and how to avoid them.',
    schema: null
  },
  '/resources/trust-vs-will-puerto-rico': {
    h1: 'Puerto Rico Trust vs. Will: Which Do You Need?',
    meta: 'Side-by-side comparison of trusts and wills under Puerto Rico law. Probate, costs, privacy, asset protection, and when you need both.',
    schema: null
  },
  '/resources/forced-heirship-estate-plan': {
    h1: 'How Forced Heirship Affects Your Estate Plan',
    meta: 'Understanding Puerto Rico\u2019s leg\u00EDtima and planning strategies that work within forced heirship rules under the 2020 Civil Code.',
    schema: null
  },
  '/resources/asset-protection-irrevocable-trusts': {
    h1: 'Asset Protection with Irrevocable Trusts in Puerto Rico',
    meta: 'How irrevocable trusts under Puerto Rico Law 219-2012 protect assets from creditors, lawsuits, and estate taxes.',
    schema: null
  },
  '/resources/complete-guide-puerto-rico-trusts': {
    h1: 'Complete Guide to Puerto Rico Trusts',
    meta: 'Everything you need to know about trusts under Puerto Rico Law 219-2012. Types, benefits, costs, and estate planning strategies.',
    schema: null
  },
  '/resources/fideicomiso-irrevocable-puerto-rico': {
    h1: 'Fideicomiso Irrevocable en Puerto Rico: Gu\u00EDa Completa',
    meta: 'Gu\u00EDa completa sobre fideicomisos irrevocables bajo la Ley 219-2012. Protecci\u00F3n de activos, beneficios contributivos y planificaci\u00F3n sucesoral.',
    schema: null
  },
  '/resources/planificacion-sucesoral-puerto-rico': {
    h1: 'Planificaci\u00F3n Sucesoral en Puerto Rico',
    meta: 'Todo lo que necesita saber sobre planificaci\u00F3n sucesoral en Puerto Rico. Leg\u00EDtima, testamentos, fideicomisos, poderes y directivas de salud.',
    schema: null
  },
  '/resources/ley-60-guia-inversionistas': {
    h1: 'Ley 60: Gu\u00EDa Completa para Inversionistas Individuales',
    meta: 'Gu\u00EDa completa de Ley 60 para inversionistas individuales. Requisitos de residencia, beneficios contributivos y errores comunes.',
    schema: null
  },
  '/resources/declaratoria-de-herederos-puerto-rico': {
    h1: 'Proceso de Declaratoria de Herederos en Puerto Rico',
    meta: 'Gu\u00EDa del proceso de declaratoria de herederos en Puerto Rico. Requisitos, plazos, costos y c\u00F3mo evitarlo con fideicomisos.',
    schema: null
  },

  /* ---- CPA Referral Landing Page ---- */
  '/cpa-referral': {
    h1: 'For CPA-Referred Clients — Estate Planning & Trust Services',
    meta: 'Your CPA handles the tax strategy. We handle the legal structure. Puerto Rico trust creation, estate planning, and decree compliance for Act 60 holders.',
    schema: null
  },

  /* ---- CPA Bridge + Content Gap Blog Posts ---- */
  '/blog/irs-audit-triggers-act60': {
    h1: 'What Triggers an IRS Act 60 Audit: The 7 Red Flags',
    meta: 'Learn the 7 red flags that trigger IRS audits of Act 60 decree holders. Income sourcing errors, presence test failures, and how to protect yourself.',
    schema: null
  },
  '/blog/irs-audit-process-act60': {
    h1: 'What to Expect During an Act 60 Compliance Examination',
    meta: 'Step-by-step guide to the IRS Act 60 audit process. Document requests, interviews, residency examinations, and why you need legal counsel.',
    schema: null
  },
  '/blog/audit-proof-presence-test-act60': {
    h1: 'How to Build an Audit-Proof Presence Test File',
    meta: 'Comprehensive guide to documenting your Act 60 bona fide residency. Physical presence, tax home, closer connection — with annual checklist.',
    schema: null
  },
  '/blog/act60-divorce-family-law': {
    h1: 'Act 60 and Divorce: What Happens to Your Decree in a Puerto Rico Family Law Case?',
    meta: 'How divorce affects your Act 60 decree, community property, presence test, and estate plan under Puerto Rico civil law.',
    schema: null
  },
  '/blog/leaving-puerto-rico-exit-planning': {
    h1: 'Leaving Puerto Rico: Exit Planning for Act 60 Decree Holders',
    meta: 'Tax implications of relinquishing your Act 60 decree. Exit year income sourcing, state re-entry rules, and orderly departure steps.',
    schema: null
  },
  '/blog/act60-crypto-digital-assets': {
    h1: 'Act 60 and Cryptocurrency: Conservative Compliance for Digital Asset Investors',
    meta: 'Audit-proof crypto structuring under Act 60. Income sourcing for digital assets, IRS scrutiny, and conservative compliance strategies.',
    schema: null
  },
  '/blog/build-act60-advisory-team': {
    h1: 'How to Build Your Act 60 Advisory Team: The 5 Professionals Every Decree Holder Needs',
    meta: 'The 5 professionals every Act 60 decree holder needs: attorney, CPA, real estate agent, insurance advisor, and wealth manager.',
    schema: null
  },
  '/blog/act60-vs-international-alternatives': {
    h1: 'Act 60 vs. Dubai, Portugal, and Other International Tax Alternatives',
    meta: 'Compare Act 60 to Dubai, Portugal NHR, Cayman Islands, and other global tax optimization options. Advantages, disadvantages, and who wins.',
    schema: null
  },

  /* ---- Pricing Page ---- */
  '/pricing': {
    h1: 'Transparent Flat-Fee Pricing — No Hourly Billing',
    meta: 'Riefkohl Law offers flat-fee pricing for all services. Trusts, estate planning, Act 60 advisory, and business formation. Know your investment upfront.',
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
  var pageTitle = config ? config.h1 : document.title.split('—')[0].split('|')[0].trim();
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
   EXECUTE ALL FIXES
   ================================================ */
function runFixes() {
  fixMeta();
  fixCanonical();
  injectFAQSchema();
  injectAttorneySchema();
  injectPersonSchema();
  fixOpenGraphAndTwitter();
  fixLangAttribute();

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
   12. HREFLANG TAGS FOR EN/ES PAGES
   ================================================ */

/* Blog post pairs */
var HREFLANG_PAIRS = [
  ['banking-insurance-trust-disputes-puerto-rico', 'banking-insurance-trust-disputes-puerto-rico-es'],
  ['breach-fiduciary-duty-trust-cases-puerto-rico', 'breach-fiduciary-duty-trust-cases-puerto-rico-es'],
  ['trust-beneficiary-rights-liquidation-puerto-rico', 'trust-beneficiary-rights-liquidation-puerto-rico-es'],
  ['public-government-trust-governance-puerto-rico', 'public-government-trust-governance-puerto-rico-es'],
  ['notable-trust-law-cases-puerto-rico', 'notable-trust-law-cases-puerto-rico-es'],
  ['testamentary-trust-succession-disputes-puerto-rico', 'testamentary-trust-succession-disputes-puerto-rico-es'],
  ['trust-property-disputes-puerto-rico', 'trust-property-disputes-puerto-rico-es'],
  ['trust-validity-challenges-puerto-rico', 'trust-validity-challenges-puerto-rico-es'],
  ['family-law-trusts-trustee-removal-puerto-rico', 'family-law-trusts-trustee-removal-puerto-rico-es'],
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
  ['/blog', '/espanol-blog'],
  ['/act-60-tax-incentives', '/espanol-ley-60'],
  ['/resources', '/recursos-es']
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

})();

