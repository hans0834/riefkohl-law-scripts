/**
 * Riefkohl Law — Comprehensive JSON-LD Schema Markup
 * Injects structured data based on current URL path.
 * Additive to existing schema in seo-fixes.js, conversion-booster.js, breadcrumb-schema.js.
 *
 * Schema types handled:
 *   A. Enhanced Organization (global, every page)
 *   B. Practice-area LegalService (per service page)
 *   C. Article schema (blog posts + resource articles)
 *   D. Dynamic FAQPage extraction (accordion/Q&A DOM patterns)
 */

(function() {
'use strict';

var VERSION = '1.0';
var SITE_URL = 'https://www.riefkohllaw.com';
var PATH = window.location.pathname.replace(/\/+$/, '') || '/';

console.log('Riefkohl Law: Schema markup loaded v' + VERSION);

/* ===== UTILITY: Check if a schema @type already exists ===== */
function hasSchemaType(type) {
  var scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (var i = 0; i < scripts.length; i++) {
    try {
      var data = JSON.parse(scripts[i].textContent);
      var types = data['@type'];
      if (typeof types === 'string' && types === type) return true;
      if (Array.isArray(types) && types.indexOf(type) > -1) return true;
    } catch(e) {}
  }
  return false;
}

/* ===== UTILITY: Inject a JSON-LD block into <head> ===== */
function injectSchema(schema) {
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/* ==========================================================
   A. ENHANCED ORGANIZATION SCHEMA (every page)
   Supplements existing Attorney/LegalService schemas with
   missing fields: legalName, sameAs, knowsAbout, detailed
   founder Person, bar admissions.
   ========================================================== */
function injectOrganizationSchema() {
  /* Check if an enhanced org schema with @id already has legalName */
  var scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (var i = 0; i < scripts.length; i++) {
    try {
      var data = JSON.parse(scripts[i].textContent);
      if (data.legalName === 'Riefkohl LLC') return; /* Already enhanced */
    } catch(e) {}
  }

  var schema = {
    '@context': 'https://schema.org',
    '@type': ['Attorney', 'LegalService'],
    '@id': SITE_URL + '/#firm',
    'name': 'Riefkohl Law',
    'legalName': 'Riefkohl LLC',
    'alternateName': 'Riefkohl Law Offices',
    'url': SITE_URL,
    'telephone': '+1-787-236-1657',
    'email': 'hans.riefkohl@riefkohllaw.com',
    'description': 'Puerto Rico law firm specializing in trusts and estate planning, Act 60 tax incentives, corporate law, and bankruptcy. Bilingual attorney licensed in PR, DC, and federal courts.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '273 Ponce de León Ave.',
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
    'areaServed': [
      { '@type': 'State', 'name': 'Puerto Rico' },
      { '@type': 'Country', 'name': 'United States' }
    ],
    'priceRange': '$$',
    'knowsAbout': [
      'Act 60 Tax Incentives',
      'Puerto Rico Trusts',
      'Puerto Rico Trust Act (Law 219-2012)',
      'Estate Planning',
      'Corporate Law',
      'Business Formation',
      'Government Contracts',
      'Bankruptcy',
      'Forced Heirship (Legítima)',
      'Act 38-2026'
    ],
    'knowsLanguage': ['en', 'es'],
    'sameAs': [
      'https://www.linkedin.com/in/riefkohl'
    ],
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '17:00'
    },
    'founder': {
      '@type': 'Person',
      '@id': SITE_URL + '/#attorney',
      'name': 'Hans E. Riefkohl Hernández',
      'givenName': 'Hans',
      'familyName': 'Riefkohl',
      'jobTitle': 'Founder & Managing Attorney',
      'url': SITE_URL + '/about',
      'sameAs': ['https://www.linkedin.com/in/riefkohl'],
      'knowsLanguage': ['en', 'es'],
      'alumniOf': [
        { '@type': 'CollegeOrUniversity', 'name': 'University of Puerto Rico School of Law' },
        { '@type': 'CollegeOrUniversity', 'name': 'Villanova University' }
      ],
      'hasCredential': [
        { '@type': 'EducationalOccupationalCredential', 'credentialCategory': 'Bar Admission', 'name': 'Puerto Rico Bar' },
        { '@type': 'EducationalOccupationalCredential', 'credentialCategory': 'Bar Admission', 'name': 'District of Columbia Bar' },
        { '@type': 'EducationalOccupationalCredential', 'credentialCategory': 'Bar Admission', 'name': 'U.S. Federal Courts' }
      ],
      'worksFor': { '@id': SITE_URL + '/#firm' },
      'description': 'Puerto Rico attorney with experience at DLA Piper and as Lead Transactions Counsel at LUMA Energy. Judicial clerkships at the Puerto Rico Supreme Court and U.S. federal courts.'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Legal Services',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Puerto Rico Trusts & Estate Planning', 'url': SITE_URL + '/estate-planning' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Act 60 Tax Incentives Advisory', 'url': SITE_URL + '/act-60-tax-incentives' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Business Formation & Corporate Law', 'url': SITE_URL + '/business-formation' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Government Contracts', 'url': SITE_URL + '/government-contracts' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Bankruptcy & Creditor Representation', 'url': SITE_URL + '/espanol-quiebras' } }
      ]
    },
    'potentialAction': {
      '@type': 'ReserveAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': SITE_URL + '/calendly',
        'actionPlatform': ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform']
      },
      'name': 'Book a Free Strategy Call'
    }
  };

  injectSchema(schema);
}

/* ==========================================================
   B. PRACTICE-AREA LEGALSERVICE SCHEMAS
   One specific LegalService per practice area page.
   ========================================================== */
var PRACTICE_AREAS = {
  '/act-60-tax-incentives': {
    name: 'Act 60 Tax Incentives Advisory',
    serviceType: 'Tax Incentive Advisory',
    description: 'Legal advisory for Puerto Rico Act 60 (formerly Acts 20/22) tax incentive decrees. Export services (Chapter 3) and individual investor (Chapter 2) applications, compliance, IRS audit defense, and income sourcing analysis.'
  },
  '/puerto-rico-trusts': {
    name: 'Puerto Rico Trusts — Fideicomisos',
    serviceType: 'Trust Formation & Administration',
    description: 'Formation and administration of irrevocable trusts under Puerto Rico Law 219-2012 (Trust Act). Asset protection trusts, special needs trusts, ILITs, SLATs, and fiduciary services.'
  },
  '/estate-planning': {
    name: 'Puerto Rico Estate Planning',
    serviceType: 'Estate Planning',
    description: 'Comprehensive estate planning for Puerto Rico residents and Act 60 decree holders. Wills, trusts, probate avoidance, forced heirship (legítima) strategies, and pour-over wills.'
  },
  '/business-formation': {
    name: 'Business Formation & Corporate Law',
    serviceType: 'Business Formation',
    description: 'Puerto Rico LLC formation, corporate governance, transactional advisory, and Act 60 entity structuring. Operating agreements, bylaws, and registered agent services.'
  },
  '/government-contracts': {
    name: 'Government Contracts Law',
    serviceType: 'Government Contracts Advisory',
    description: 'Federal and Puerto Rico government contract advisory. Bid protests, compliance reviews, procurement law, small business certifications, and contract disputes.'
  }
};

function injectPracticeAreaSchema() {
  var config = PRACTICE_AREAS[PATH];
  if (!config) return;

  /* Check for existing practice-area-specific LegalService with serviceType */
  var scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (var i = 0; i < scripts.length; i++) {
    try {
      var data = JSON.parse(scripts[i].textContent);
      if (data.serviceType === config.serviceType) return;
    } catch(e) {}
  }

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': SITE_URL + PATH + '#service',
    'name': config.name,
    'description': config.description,
    'serviceType': config.serviceType,
    'url': SITE_URL + PATH,
    'provider': {
      '@id': SITE_URL + '/#firm'
    },
    'areaServed': [
      { '@type': 'State', 'name': 'Puerto Rico' },
      { '@type': 'Country', 'name': 'United States' }
    ],
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': SITE_URL + '/calendly',
      'servicePhone': {
        '@type': 'ContactPoint',
        'telephone': '+1-787-236-1657',
        'contactType': 'customer service',
        'availableLanguage': ['English', 'Spanish']
      }
    }
  };

  injectSchema(schema);
}

/* ==========================================================
   C. ARTICLE SCHEMA (blog posts + resource articles)
   ========================================================== */
function injectArticleSchema() {
  var isBlogPost = /^\/blog\/[a-z0-9]/.test(PATH) &&
    PATH.indexOf('/blog/category/') !== 0 &&
    PATH.indexOf('/blog/tag/') !== 0;

  var isResourceArticle = /^\/resources\/[a-z0-9]/.test(PATH);

  if (!isBlogPost && !isResourceArticle) return;

  /* Don't duplicate */
  if (hasSchemaType('Article') || hasSchemaType('BlogPosting')) return;

  /* Extract metadata from the page */
  var title = '';
  var description = '';
  var datePublished = '';
  var dateModified = '';
  var image = '';

  /* Title: prefer og:title, then <title>, then first H1 */
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) title = ogTitle.getAttribute('content') || '';
  if (!title) {
    var titleEl = document.querySelector('title');
    if (titleEl) title = titleEl.textContent.split('—')[0].split('|')[0].trim();
  }
  if (!title) {
    var h1 = document.querySelector('h1');
    if (h1) title = h1.textContent.trim();
  }

  /* Description: prefer meta description */
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) description = metaDesc.getAttribute('content') || '';

  /* Date: look for meta tags and common date elements */
  var articleDate = document.querySelector('meta[property="article:published_time"]');
  if (articleDate) datePublished = articleDate.getAttribute('content');
  if (!datePublished) {
    var ogDate = document.querySelector('meta[property="og:article:published_time"]');
    if (ogDate) datePublished = ogDate.getAttribute('content');
  }
  /* Try Squarespace date elements */
  if (!datePublished) {
    var dateEl = document.querySelector('.Blog-meta-item--date time, time.blog-date, .entry-dateline time, time[datetime]');
    if (dateEl) datePublished = dateEl.getAttribute('datetime') || '';
  }

  var articleMod = document.querySelector('meta[property="article:modified_time"]');
  if (articleMod) dateModified = articleMod.getAttribute('content');

  /* Image: prefer og:image */
  var ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) image = ogImage.getAttribute('content') || '';

  var schema = {
    '@context': 'https://schema.org',
    '@type': isBlogPost ? 'BlogPosting' : 'Article',
    'headline': title,
    'url': SITE_URL + PATH,
    'author': {
      '@type': 'Person',
      '@id': SITE_URL + '/#attorney',
      'name': 'Hans E. Riefkohl'
    },
    'publisher': {
      '@type': 'Organization',
      '@id': SITE_URL + '/#firm',
      'name': 'Riefkohl Law',
      'url': SITE_URL
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': SITE_URL + PATH
    },
    'inLanguage': PATH.indexOf('espanol') > -1 || PATH.indexOf('recursos-') > -1 ? 'es' : 'en'
  };

  if (description) schema.description = description;
  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  if (image) {
    schema.image = {
      '@type': 'ImageObject',
      'url': image
    };
  }

  injectSchema(schema);
}

/* ==========================================================
   D. DYNAMIC FAQ EXTRACTION
   Scans the DOM for Q&A patterns and generates FAQPage schema.
   Targets pages that have FAQ content but no hardcoded FAQPage.
   ========================================================== */

/* Pages where we should attempt dynamic FAQ extraction */
var FAQ_SCAN_PAGES = [
  '/act-60-resource-center',
  '/resources-faq',
  '/recursos-preguntas-frecuentes'
];

function extractFAQsFromDOM() {
  /* Only run on designated pages and if no FAQPage schema exists */
  var shouldScan = false;
  for (var p = 0; p < FAQ_SCAN_PAGES.length; p++) {
    if (PATH === FAQ_SCAN_PAGES[p]) { shouldScan = true; break; }
  }
  if (!shouldScan) return;
  if (hasSchemaType('FAQPage')) return;

  var faqs = [];

  /* Strategy 1: Squarespace accordion blocks (.sqs-block-accordion) */
  var accordionItems = document.querySelectorAll('.accordion-item, .sqs-block-accordion .accordion-item__title, [data-animation-role="title"]');
  if (accordionItems.length > 0) {
    for (var a = 0; a < accordionItems.length; a++) {
      var item = accordionItems[a];
      var questionEl = item.querySelector('.accordion-item__title, [data-animation-role="title"]') || item;
      var answerEl = item.querySelector('.accordion-item__description, .accordion-item__content, [data-animation-role="content"]');

      if (!answerEl) {
        /* Try next sibling */
        answerEl = item.nextElementSibling;
      }

      if (questionEl && answerEl) {
        var q = questionEl.textContent.trim();
        var ans = answerEl.textContent.trim();
        if (q && ans && q.length > 5 && ans.length > 10) {
          faqs.push({ question: q, answer: ans });
        }
      }
    }
  }

  /* Strategy 2: H3/H4 followed by paragraphs (common Q&A pattern) */
  if (faqs.length === 0) {
    var headings = document.querySelectorAll('h3, h4');
    for (var h = 0; h < headings.length; h++) {
      var heading = headings[h];
      var text = heading.textContent.trim();

      /* Heuristic: looks like a question if it ends with '?' or starts with common question words */
      var isQuestion = text.indexOf('?') > -1 ||
        /^(what|how|who|when|where|why|can|do|does|is|are|should|will|¿|qué|cómo|cuándo|dónde|por qué|cuál)/i.test(text);

      if (!isQuestion) continue;

      /* Collect following paragraph(s) as the answer */
      var answerParts = [];
      var sibling = heading.nextElementSibling;
      while (sibling && sibling.tagName !== 'H3' && sibling.tagName !== 'H4' && sibling.tagName !== 'H2') {
        if (sibling.tagName === 'P' || sibling.tagName === 'UL' || sibling.tagName === 'OL') {
          answerParts.push(sibling.textContent.trim());
        }
        sibling = sibling.nextElementSibling;
      }

      var answer = answerParts.join(' ').trim();
      if (answer.length > 10) {
        faqs.push({ question: text, answer: answer });
      }
    }
  }

  /* Only inject if we found at least 2 Q&A pairs */
  if (faqs.length < 2) return;

  /* Limit to 10 FAQs for schema sanity */
  if (faqs.length > 10) faqs = faqs.slice(0, 10);

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(function(faq) {
      return {
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      };
    })
  };

  injectSchema(schema);
}

/* ==========================================================
   INITIALIZATION
   Wait for DOM ready, then inject schemas.
   ========================================================== */
function init() {
  injectOrganizationSchema();
  injectPracticeAreaSchema();
  injectArticleSchema();
  extractFAQsFromDOM();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
