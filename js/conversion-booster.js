
(function(){
/* EDITOR GUARD: never run inside the Squarespace editor (same-origin frame under /config). Fails open. */
try { if (window.self !== window.top && window.top.location.pathname.indexOf('/config') === 0) return; } catch (e) {}
'use strict';

var PHONE = '(787) 236-1657';
var PHONE_TEL = 'tel:+17872361657';
var BOOK_URL = '/calendly';
var PATH = window.location.pathname.replace(/\/+$/, '') || '/';
var IS_ES = PATH.indexOf('/espanol') === 0 || PATH.indexOf('/recursos-') === 0;

/* ===== SVG ICONS ===== */
var PHONE_SVG = '<svg class="rl-call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>';
var PHONE_SVG_STICKY = '<svg class="rl-sticky-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>';
var CALENDAR_SVG = '<svg class="rl-sticky-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';

/* ===== 1. CLICK-TO-CALL BANNER ===== */
function createCallBanner() {
  if (document.querySelector('.rl-call-banner')) return;

  var banner = document.createElement('div');
  banner.className = 'rl-call-banner';
  banner.setAttribute('role', 'banner');
  banner.setAttribute('aria-label', IS_ES ? 'Información de contacto' : 'Contact information');

  var callText = IS_ES ? 'Llame ahora' : 'Call now';
  var ctaText = IS_ES ? 'Consulta gratuita' : 'Free Strategy Call';
  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  banner.innerHTML =
    '<a href="' + PHONE_TEL + '" aria-label="' + callText + ': ' + PHONE + '">' +
      PHONE_SVG + PHONE +
    '</a>' +
    '<span class="rl-call-sep">|</span>' +
    '<span class="rl-call-text">' +
      '<a href="' + bookUrl + '">' + ctaText + ' &rarr;</a>' +
    '</span>';

  // Insert at very top of body, before the header
  var header = document.querySelector('header') || document.querySelector('.header');
  if (header && header.parentNode) {
    header.parentNode.insertBefore(banner, header);
  } else {
    document.body.insertBefore(banner, document.body.firstChild);
  }
}

/* ===== 2. STICKY MOBILE CTA BAR ===== */
function createStickyBar() {
  if (document.querySelector('.rl-sticky-cta')) return;

  var bar = document.createElement('div');
  bar.className = 'rl-sticky-cta';
  bar.setAttribute('role', 'navigation');
  bar.setAttribute('aria-label', IS_ES ? 'Acciones de contacto' : 'Contact actions');

  var callLabel = IS_ES ? 'Llamar' : 'Call Now';
  var bookLabel = IS_ES ? 'Agendar Cita' : 'Book Consult';
  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  bar.innerHTML =
    '<a href="' + PHONE_TEL + '" class="rl-sticky-call" aria-label="' + callLabel + ' ' + PHONE + '">' +
      PHONE_SVG_STICKY +
      '<span>' + callLabel + '</span>' +
    '</a>' +
    '<div class="rl-sticky-divider"></div>' +
    '<a href="' + bookUrl + '" class="rl-sticky-book" aria-label="' + bookLabel + '">' +
      CALENDAR_SVG +
      '<span>' + bookLabel + '</span>' +
    '</a>';

  document.body.appendChild(bar);
}

/* ===== 2b. PERSISTENT DESKTOP "BOOK A CONSULTATION" CTA ===== */
/* Always-visible booking button on desktop (mobile uses the sticky bar). */
function createDesktopBookButton() {
  if (document.querySelector('.rl-desktop-book')) return;

  var label = IS_ES ? 'Agende una consulta gratis' : 'Book a Free Consultation';
  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  var a = document.createElement('a');
  a.className = 'rl-desktop-book';
  a.href = bookUrl;
  a.setAttribute('aria-label', label);
  a.innerHTML = CALENDAR_SVG + '<span>' + label + '</span>';
  document.body.appendChild(a);
}

/* ===== 3. LOCALBUSINESS SCHEMA ===== */
function injectLocalBusinessSchema() {
  // Only inject on key pages, not every blog post
  var schemaPages = ['/', '/services', '/about', '/about-us', '/contact', '/calendly',
    '/espanol', '/espanol-servicios', '/espanol-sobre-nosotros', '/espanol-contacto', '/espanol-cita'];
  if (schemaPages.indexOf(PATH) === -1) return;

  // Don't duplicate
  var existing = document.querySelectorAll('script[type="application/ld+json"]');
  for (var i = 0; i < existing.length; i++) {
    if (existing[i].textContent.indexOf('LegalService') > -1) return;
  }

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': 'https://www.riefkohllaw.com/#organization',
    'name': 'Riefkohl Law',
    'alternateName': 'Riefkohl Law Office',
    'description': 'Puerto Rico law firm focused on trusts, estate planning, Act 60 tax incentives, business formation, and government contracts.',
    'url': 'https://www.riefkohllaw.com',
    'telephone': '+1-787-236-1657',
    'email': 'hans@riefkohllaw.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '273 Ponce de Leon Ave.',
      'addressLocality': 'San Juan',
      'addressRegion': 'PR',
      'postalCode': '00917',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 18.4195,
      'longitude': -66.0625
    },
    'areaServed': [
      {
        '@type': 'State',
        'name': 'Puerto Rico'
      }
    ],
    'priceRange': '$$',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '17:00'
      }
    ],
    'founder': {
      '@type': 'Person',
      'name': 'Hans E. Riefkohl',
      'jobTitle': 'Managing Attorney'
    },
    'knowsLanguage': ['en', 'es'],
    'potentialAction': [
      {
        '@type': 'ReserveAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://www.riefkohllaw.com/calendly',
          'actionPlatform': ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform']
        },
        'name': 'Book a Free Strategy Call',
        'description': 'Schedule a free initial consultation with Riefkohl Law'
      },
      {
        '@type': 'CommunicateAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'tel:+17872361657'
        },
        'name': 'Call Riefkohl Law'
      }
    ],
    /* Google Business Profile + LinkedIn — consolidates the firm entity and
       feeds the knowledge panel / local pack. */
    'sameAs': [
      'https://www.google.com/maps?cid=3671070211869856657',
      'https://www.linkedin.com/in/riefkohl'
    ],
    'hasMap': 'https://www.google.com/maps?cid=3671070211869856657'
    /* REVIEW-READY: once the firm has real Google reviews, add aggregateRating
       here so stars can appear in rich results, e.g.:
         'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '5.0', 'reviewCount': '12' }
       Only ever populate this from REAL review data — fabricated or self-serving
       ratings violate Google's structured-data guidelines and risk a penalty. */
  };

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/* ===== 4. PAGE-SPECIFIC CTA BLOCKS ===== */
function injectPageCTAs() {
  if (document.querySelector('.rl-page-cta')) return;

  var ctaConfig = {
    '/act-60-tax-incentives': {
      heading: IS_ES ? '¿Listo para ahorrar con la Ley 60?' : 'Ready to Save on Taxes with Act 60?',
      body: IS_ES
        ? 'Obtenga una evaluación personalizada de su elegibilidad para el programa de incentivos contributivos más poderoso de Puerto Rico.'
        : 'Get a personalized assessment of your eligibility for Puerto Rico\'s most powerful tax incentive program.',
      btn: IS_ES ? 'Reserve Su Consulta Gratuita' : 'Book Your Free Strategy Call',
      secondary: IS_ES ? 'O llame al (787) 236-1657' : 'Or call (787) 236-1657'
    },
    '/act-60-federal-residency-test-puerto-rico': {
      heading: 'Not Sure If You Pass the Residency Test?',
      body: 'Puerto Rico\'s residency tests have specific safe harbors and traps for newcomers. A 30-minute consultation will tell you exactly where you stand.',
      btn: 'Book Your Act 60 Compliance Review',
      secondary: 'Or call (787) 236-1657'
    },
    '/act-60-compliance-requirements-audit-triggers': {
      heading: 'Stay Compliant. Avoid the Audit.',
      body: 'Act 60 compliance has strict annual reporting and residency requirements. We review your situation, identify gaps, and help you stay protected.',
      btn: 'Book a Compliance Consultation',
      secondary: 'Or call (787) 236-1657'
    },
    '/act-60-income-sourcing-rules-puerto-rico': {
      heading: 'Is Your Income Properly Sourced to Puerto Rico?',
      body: 'Incorrect income sourcing is the #1 reason the IRS challenges Act 60 benefits. Get clarity on your specific situation before filing.',
      btn: 'Book an Income Sourcing Review',
      secondary: 'Or call (787) 236-1657'
    },
    '/act-60-year-of-move-safe-harbor-transition-year': {
      heading: 'Planning Your Move to Puerto Rico?',
      body: 'The year-of-move transition rules determine when your Act 60 benefits begin. Get the timing right to maximize your tax savings from day one.',
      btn: 'Book a Pre-Move Strategy Call',
      secondary: 'Or call (787) 236-1657'
    },
    '/puerto-rico-estate-planning-nrnc-classification': {
      heading: 'Act 60 Decree Holder? Your Estate Plan Matters.',
      body: 'NRNC classification affects how your assets are taxed at death. A properly structured estate plan protects your Act 60 benefits for your heirs.',
      btn: 'Book an Estate Planning Consultation',
      secondary: 'Or call (787) 236-1657'
    },
    '/puerto-rico-trusts': {
      heading: IS_ES ? 'Proteja sus activos con un fideicomiso en Puerto Rico' : 'Protect Your Assets with a Puerto Rico Trust',
      body: IS_ES
        ? 'Descubra cómo un fideicomiso puede proteger el patrimonio de su familia, evitar la sucesión testamentaria y aprovechar las leyes favorables de Puerto Rico.'
        : 'Learn how a fideicomiso can protect your family\'s wealth, avoid probate, and take advantage of Puerto Rico\'s favorable trust laws.',
      btn: IS_ES ? 'Reserve una Consulta Gratuita' : 'Book a Free Trust Consultation',
      secondary: IS_ES ? 'O llame al (787) 236-1657' : 'Or call (787) 236-1657'
    },
    '/about': {
      heading: 'Ready to Discuss Your Legal Needs?',
      body: 'Schedule a free 30-minute strategy call. We\'ll review your situation, answer your questions, and outline a clear path forward\u2014with clear flat-fee pricing for most matters.',
      btn: 'Book Your Free Strategy Call',
      secondary: 'Or call (787) 236-1657'
    },
    '/about-us': {
      heading: 'Ready to Discuss Your Legal Needs?',
      body: 'Schedule a free 30-minute strategy call. We\'ll review your situation, answer your questions, and outline a clear path forward\u2014with clear flat-fee pricing for most matters.',
      btn: 'Book Your Free Strategy Call',
      secondary: 'Or call (787) 236-1657'
    },
    '/blog': {
      heading: 'Have Questions About What You\'re Reading?',
      body: 'Our articles provide general guidance, but every situation is different. Get personalized advice in a free strategy call.',
      btn: 'Book a Free Strategy Call',
      secondary: 'Or call (787) 236-1657'
    },
    '/services': {
      heading: 'Let\'s Find the Right Service for You',
      body: 'Not sure where to start? A 30-minute strategy call will help us understand your needs and recommend the best approach\u2014flat fee, no hourly billing.',
      btn: 'Book Your Free Strategy Call',
      secondary: 'Or call (787) 236-1657'
    }
  };

  var config = ctaConfig[PATH];
  if (!config) return;

  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  var cta = document.createElement('div');
  cta.className = 'rl-page-cta';
  cta.style.cssText = 'max-width:680px;margin:48px auto;padding:40px 36px;background:linear-gradient(160deg,#1a2033 0%,#243047 100%);border-radius:10px;text-align:center;box-sizing:border-box;';
  cta.innerHTML =
    '<h2 style="font-family:var(--heading-font-font-family,Georgia,serif);font-size:1.5rem;font-weight:700;color:#fff;margin:0 0 12px;letter-spacing:-.02em;">' + config.heading + '</h2>' +
    '<p style="color:rgba(255,255,255,.6);font-size:.9rem;line-height:1.6;margin:0 0 24px;max-width:500px;margin-left:auto;margin-right:auto;">' + config.body + '</p>' +
    '<a href="' + bookUrl + '" style="display:inline-block;padding:14px 28px;background:#bfa35d;color:#1a2033;font-size:.85rem;font-weight:700;text-decoration:none;border-radius:6px;transition:background .25s;">' + config.btn + '</a>' +
    '<p style="color:rgba(255,255,255,.4);font-size:.8rem;margin-top:14px;">' + config.secondary + '</p>';

  // Insert before the footer signup or at end of main content
  var mainContent = document.querySelector('article .entry-content') ||
                    document.querySelector('.blog-item-content-wrapper') ||
                    document.querySelector('.sqs-layout');
  var footerSignup = document.querySelector('.rl-footer-signup');
  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');

  if (footerSignup) {
    footerSignup.parentNode.insertBefore(cta, footerSignup);
  } else if (footer) {
    footer.parentNode.insertBefore(cta, footer);
  } else if (mainContent) {
    mainContent.appendChild(cta);
  }
}

/* ===== 5. HOMEPAGE URGENCY BANNER ===== */
function injectUrgencyBanner() {
  if (PATH !== '/' && PATH !== '' && PATH !== '/home') return;
  if (document.querySelector('.rl-urgency-banner')) return;

  var banner = document.createElement('div');
  banner.className = 'rl-urgency-banner';
  banner.setAttribute('role', 'alert');
  banner.innerHTML =
    '<span class="rl-urgency-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true" style="vertical-align:-2px;margin-right:2px"><circle cx="12" cy="12" r="9"></circle><path d="M12 7.5v5l3 2"></path></svg></span>' +
    '<span><strong>Act 60 Alert:</strong> 0% capital gains rate for Individual Investors ends December 31, 2026. New decrees from 2027 receive 4% rate. ' +
    '<a href="/act-60-tax-incentives">Learn more \u2192</a></span>';

  // Insert at the top of the first content section so it clears the
  // absolutely-positioned site header at every viewport width. (Inserting
  // next to the call banner rendered it underneath the logo.)
  // Squarespace renamed the sections container (#sections -> article#page-regions),
  // so match on .page-section alone — anchoring on the old id silently dropped the
  // banner into the fallback branch, where it overlapped the logo.
  var firstContent = document.querySelector('.page-section .sqs-html-content');
  if (firstContent) {
    firstContent.insertBefore(banner, firstContent.firstChild);
  } else {
    var callBanner = document.querySelector('.rl-call-banner');
    if (callBanner && callBanner.nextSibling) {
      callBanner.parentNode.insertBefore(banner, callBanner.nextSibling);
    } else {
      var header = document.querySelector('header') || document.querySelector('.header');
      if (header && header.nextSibling) {
        header.parentNode.insertBefore(banner, header.nextSibling);
      }
    }
  }
}

/* ===== 6. ACT 60 ABOVE-THE-FOLD HERO ===== */
function injectAct60Hero() {
  if (PATH !== '/act-60-tax-incentives') return;
  if (document.querySelector('.rl-act60-hero')) return;

  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  var hero = document.createElement('div');
  hero.className = 'rl-act60-hero';
  hero.innerHTML =
    '<div class="rl-act60-hero-inner">' +
      '<div class="rl-act60-hero-badge">Puerto Rico Act 60 Attorney</div>' +
      '<h2>Relocating to Puerto Rico? Get Your Act\u00A060 Decree Right the First Time.</h2>' +
      '<p class="rl-act60-hero-subtitle">Applications, compliance, income sourcing, and IRS defense\u2014from the firm that lives and practices in San Juan.</p>' +
      '<div class="rl-act60-hero-benefits">' +
        '<div class="rl-act60-hero-benefit"><span class="rl-act60-hero-benefit-icon">\u2713</span> Decree Application Prepared & Filed</div>' +
        '<div class="rl-act60-hero-benefit"><span class="rl-act60-hero-benefit-icon">\u2713</span> Income Sourcing Structured for IRS Scrutiny</div>' +
        '<div class="rl-act60-hero-benefit"><span class="rl-act60-hero-benefit-icon">\u2713</span> Annual Compliance Handled</div>' +
        '<div class="rl-act60-hero-benefit"><span class="rl-act60-hero-benefit-icon">\u2713</span> Clear Flat-Fee Pricing</div>' +
      '</div>' +
      '<a href="' + bookUrl + '" class="rl-act60-hero-cta">Book Your Free Act 60 Strategy Call</a>' +
      '<p class="rl-act60-hero-secondary">Or call <a href="' + PHONE_TEL + '">' + PHONE + '</a></p>' +
      '<div class="rl-act60-hero-urgency"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true" style="vertical-align:-2px;margin-right:2px"><circle cx="12" cy="12" r="9"></circle><path d="M12 7.5v5l3 2"></path></svg> 0% IRI capital gains rate ends Dec 31, 2026 \u2014 4% rate applies to new decrees from 2027. Act now.</div>' +
    '</div>';

  // Insert after the call banner, before page content
  var callBanner = document.querySelector('.rl-call-banner');
  var header = document.querySelector('header') || document.querySelector('.header');
  var insertAfter = callBanner || header;

  if (insertAfter && insertAfter.nextSibling) {
    insertAfter.parentNode.insertBefore(hero, insertAfter.nextSibling);
  }
}

/* ===== 6. ACT 60 MID-PAGE CTA ===== */
function injectAct60MidCTA() {
  if (PATH !== '/act-60-tax-incentives') return;
  if (document.querySelector('.rl-mid-cta')) return;

  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  // Find the "Chapter 2" heading to insert a CTA between Chapter 3 and Chapter 2 sections
  var allHeadings = document.querySelectorAll('h2, h3, [class*="heading"]');
  var chapter2Heading = null;
  for (var i = 0; i < allHeadings.length; i++) {
    var text = allHeadings[i].textContent || '';
    if (text.indexOf('Chapter 2') > -1 && text.indexOf('Individual') > -1) {
      chapter2Heading = allHeadings[i];
      break;
    }
  }

  if (chapter2Heading) {
    var midCta = document.createElement('div');
    midCta.className = 'rl-mid-cta';
    midCta.innerHTML =
      '<h3>Not Sure Which Act 60 Program Fits Your Situation?</h3>' +
      '<p>Chapter 3 for export businesses (4% corporate rate) or Chapter 2 for individual investors (capital gains benefits)\u2014a 30-minute call will clarify your best path.</p>' +
      '<a href="' + bookUrl + '">Get Your Free Eligibility Assessment</a>';

    // Insert before the Chapter 2 heading (or its parent block)
    var target = chapter2Heading.closest('.sqs-block') || chapter2Heading.parentElement || chapter2Heading;
    target.parentNode.insertBefore(midCta, target);
  }
}

/* ===== 7. ACT 60 CONTENT SECTIONS (Who This Is For, Mistakes, Pricing, Testimonials, Bio, Local, Countdown, Comparison, Lead Magnet) ===== */
function injectAct60Sections() {
  if (PATH !== '/act-60-tax-incentives') return;
  if (document.querySelector('.rl-act60-section')) return;

  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;
  var container = document.createElement('div');
  container.className = 'rl-act60-section';

  // --- WHO THIS IS FOR (#8) ---
  container.innerHTML =
    '<h2 class="rl-act60-section-title">Who Is Act 60 For?</h2>' +
    '<p class="rl-act60-section-subtitle">Two programs, two client profiles. Find yours below.</p>' +
    '<div class="rl-act60-personas">' +
      '<div class="rl-act60-persona">' +
        '<span class="rl-act60-persona-badge">Chapter 3</span>' +
        '<h3>Business Owners &amp; Export Services</h3>' +
        '<p class="rl-act60-persona-rate">4% Corporate Tax Rate</p>' +
        '<ul>' +
          '<li>Consulting, SaaS, tech, and professional services</li>' +
          '<li>Income sourcing &amp; employment nexus structuring</li>' +
          '<li>Export services compliance &amp; annual reporting</li>' +
          '<li>100% PR income tax exemption on distributions to BFR shareholders</li>' +
        '</ul>' +
        '<a href="' + bookUrl + '" class="rl-act60-persona-cta">Book Export Services Consultation</a>' +
      '</div>' +
      '<div class="rl-act60-persona">' +
        '<span class="rl-act60-persona-badge">Chapter 2</span>' +
        '<h3>Individual Investors</h3>' +
        '<p class="rl-act60-persona-rate">0% Capital Gains (through 2026) \u2192 4% (2027+)</p>' +
        '<ul>' +
          '<li>Capital gains, crypto, and investment income</li>' +
          '<li>Bona fide residency &amp; presence test compliance</li>' +
          '<li>State departure audit preparation</li>' +
          '<li>Estate planning coordination with Act 60 benefits</li>' +
        '</ul>' +
        '<a href="' + bookUrl + '" class="rl-act60-persona-cta">Book Investor Relocation Call</a>' +
      '</div>' +
    '</div>';

  // --- COMMON MISTAKES (#9) ---
  container.innerHTML +=
    '<h2 class="rl-act60-section-title">Mistakes That Cost Act 60 Holders Their Benefits</h2>' +
    '<p class="rl-act60-section-subtitle">These are the issues we see most often\u2014and the ones the IRS targets.</p>' +
    '<div class="rl-act60-mistakes">' +
      '<div class="rl-act60-mistake">' +
        '<div class="rl-act60-mistake-icon">\u26A0</div>' +
        '<h4>Filing Without an Income Sourcing Analysis</h4>' +
        '<p>Incorrect income sourcing is the #1 reason the IRS challenges Act 60 benefits. Without proper analysis, you risk full clawback of exemptions.</p>' +
      '</div>' +
      '<div class="rl-act60-mistake">' +
        '<div class="rl-act60-mistake-icon">\u26A0</div>' +
        '<h4>Failing the Bona Fide Residency Test</h4>' +
        '<p>Spending too many days on the mainland, maintaining a U.S. home, or weak ties to Puerto Rico can void your decree retroactively.</p>' +
      '</div>' +
      '<div class="rl-act60-mistake">' +
        '<div class="rl-act60-mistake-icon">\u26A0</div>' +
        '<h4>Missing Annual Reporting Deadlines</h4>' +
        '<p>Act 60 requires annual compliance reports, charitable donations, and employment commitments. Missing any can trigger revocation proceedings.</p>' +
      '</div>' +
      '<div class="rl-act60-mistake">' +
        '<div class="rl-act60-mistake-icon">\u26A0</div>' +
        '<h4>Ignoring Estate Planning</h4>' +
        '<p>Act 60 does not shield your estate from federal estate tax. Without proper trust structures, your heirs may lose the benefits you relocated for.</p>' +
      '</div>' +
    '</div>';

  // --- PRICING (#10) ---
  container.innerHTML +=
    '<h2 class="rl-act60-section-title">Transparent, Flat-Fee Pricing</h2>' +
    '<p class="rl-act60-section-subtitle">No hourly billing. Clear flat-fee pricing discussed up front.</p>' +
    '<div class="rl-act60-pricing" style="max-width:560px;margin:24px auto 0;">' +
      '<div class="rl-act60-price-card" style="background:var(--rl-white,#fff);border:1.5px solid var(--rl-warm-200,#e7e2d8);border-radius:var(--rl-r,10px);padding:28px 24px;text-align:center;">' +
        '<h4 style="font-size:1rem;color:var(--rl-navy,#1a2033);margin:0 0 12px;">Act 60 Decree Application &amp; Advisory</h4>' +
        '<div class="rl-act60-price-amount" style="font-family:var(--heading-font-font-family,Georgia,serif);font-size:1.6rem;font-weight:700;color:var(--rl-gold-dark,#a3842f);margin:0 0 12px;">Flat fees from $1,700</div>' +
        '<p style="font-size:.85rem;color:var(--rl-warm-600,#5b5647);line-height:1.5;margin:0;">Excludes U.S. residency and income-sourcing tax advice, which are scoped and quoted separately.</p>' +
      '</div>' +
    '</div>' +
    '<p class="rl-act60-price-disclaimer" style="max-width:560px;margin:16px auto 0;text-align:center;font-size:.82rem;color:var(--rl-warm-600,#5b5647);line-height:1.55;">The prices shown are representative examples that reflect what many engagements look like. The fee for each matter is determined based on your specific circumstances.</p>';

  // --- COUNTDOWN TIMER (#18) + RATE COMPARISON (#19) ---
  container.innerHTML +=
    '<h2 class="rl-act60-section-title">The 0% Capital Gains Window Is Closing</h2>' +
    '<div class="rl-act60-countdown" id="rl-countdown"></div>' +
    '<p class="rl-act60-section-subtitle">Days remaining to apply under the 0% IRI capital gains rate. Decrees granted from 2027 will receive 4%.</p>' +
    '<table class="rl-act60-compare">' +
      '<thead><tr>' +
        '<th>Tax Benefit</th>' +
        '<th>Apply by Dec 31, 2026</th>' +
        '<th>Apply 2027+</th>' +
      '</tr></thead>' +
      '<tbody>' +
        '<tr>' +
          '<td>Capital Gains Rate</td>' +
          '<td class="rl-highlight">0%</td>' +
          '<td>4%</td>' +
        '</tr>' +
        '<tr>' +
          '<td>On a $1M Gain</td>' +
          '<td class="rl-compare-savings">You keep $1,000,000</td>' +
          '<td>You keep $960,000</td>' +
        '</tr>' +
        '<tr>' +
          '<td>On a $5M Gain</td>' +
          '<td class="rl-compare-savings">You keep $5,000,000</td>' +
          '<td>You keep $4,800,000</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Corporate Tax (Ch. 3)</td>' +
          '<td class="rl-highlight">4%</td>' +
          '<td>4% (unchanged)</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Distribution Exemption</td>' +
          '<td class="rl-highlight">100%</td>' +
          '<td>100% (unchanged)</td>' +
        '</tr>' +
      '</tbody>' +
    '</table>';

  // --- TESTIMONIALS (#12) ---
  container.innerHTML +=
    '<h2 class="rl-act60-section-title">What Clients Say</h2>' +
    '<div class="rl-act60-testimonials">' +
      '<div class="rl-act60-testimonial">' +
        '<blockquote>Hans made a complex relocation process feel manageable. He structured our income sourcing properly from day one, and we passed our first compliance review without a single issue. Having a lawyer who actually practices in Puerto Rico made all the difference.</blockquote>' +
        '<cite>\u2014 Former California tech founder, relocated 2024</cite>' +
      '</div>' +
      '<div class="rl-act60-testimonial">' +
        '<blockquote>We had been working with a mainland CPA on our Act 60 application and quickly realized we needed local counsel. Hans identified three compliance gaps our CPA missed and built an estate plan that protects our decree benefits for our children.</blockquote>' +
        '<cite>\u2014 Individual Investor, Chapter 2 decree holder</cite>' +
      '</div>' +
    '</div>';

  // --- ATTORNEY BIO (#13) ---
  container.innerHTML +=
    '<h2 class="rl-act60-section-title">Your Attorney</h2>' +
    '<div class="rl-act60-bio">' +
      '<div class="rl-act60-bio-photo">HR</div>' +
      '<div class="rl-act60-bio-text">' +
        '<h3>Hans E. Riefkohl</h3>' +
        '<div class="rl-act60-bio-title">Managing Attorney</div>' +
        '<p>I founded Riefkohl Law because I saw too many mainland professionals relocating to Puerto Rico with advice from firms that had never practiced here. Act 60 is not just a tax filing\u2014it is a life restructuring that touches income sourcing, residency, estate planning, and ongoing compliance. I handle all of it, personally, from my office in San Juan.</p>' +
        '<div class="rl-act60-bio-credentials">' +
          '<span class="rl-act60-bio-credential">Puerto Rico Bar</span>' +
          '<span class="rl-act60-bio-credential">U.S. District Court, PR</span>' +
          '<span class="rl-act60-bio-credential">Bilingual (EN/ES)</span>' +
          '<span class="rl-act60-bio-credential">Based in San Juan, PR</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  // --- LOCAL ADVANTAGE (#14) ---
  container.innerHTML +=
    '<div class="rl-act60-local">' +
      '<div class="rl-act60-local-icon">\uD83C\uDFDD</div>' +
      '<h3>Based in San Juan. Not Advising from the Mainland.</h3>' +
      '<p>We practice Puerto Rico law from Puerto Rico. We file with DDEC in person. We know the local tax office, the courts, and the compliance landscape because we work in it every day\u2014not from a satellite office 1,500 miles away.</p>' +
    '</div>';

  // --- LEAD MAGNET (#15) ---
  // The downloadable Act 60 checklist is delivered by email-signup.js's inline
  // CTA on this page (working PDF download + lead_magnet_download tracking).
  // A duplicate email box previously lived here with no submit handler \u2014 it
  // captured nothing and misled visitors, so it was removed. To add real email
  // capture, wire a provider-backed form here instead of a dead <input>.

  // Insert all sections before the footer, after main content
  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');
  var pageCta = document.querySelector('.rl-page-cta');
  if (pageCta) {
    pageCta.parentNode.insertBefore(container, pageCta);
  } else if (footer) {
    footer.parentNode.insertBefore(container, footer);
  }

  // --- COUNTDOWN TIMER LOGIC (#18) ---
  var countdownEl = document.getElementById('rl-countdown');
  if (countdownEl) {
    var deadline = new Date('2026-12-31T23:59:59-04:00').getTime();
    function updateCountdown() {
      var now = Date.now();
      var diff = deadline - now;
      if (diff <= 0) {
        countdownEl.innerHTML = '<p style="color:#bfa35d;font-weight:700;">The 0% rate deadline has passed.</p>';
        return;
      }
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins = Math.floor((diff % 3600000) / 60000);
      var secs = Math.floor((diff % 60000) / 1000);
      countdownEl.innerHTML =
        '<div class="rl-act60-countdown-unit"><div class="rl-act60-countdown-num">' + days + '</div><div class="rl-act60-countdown-label">Days</div></div>' +
        '<div class="rl-act60-countdown-unit"><div class="rl-act60-countdown-num">' + hours + '</div><div class="rl-act60-countdown-label">Hours</div></div>' +
        '<div class="rl-act60-countdown-unit"><div class="rl-act60-countdown-num">' + mins + '</div><div class="rl-act60-countdown-label">Minutes</div></div>' +
        '<div class="rl-act60-countdown-unit"><div class="rl-act60-countdown-num">' + secs + '</div><div class="rl-act60-countdown-label">Seconds</div></div>';
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

/* ===== 8. REWORKED MID-PAGE CTA — both audiences (#11) ===== */

/* ===== 9. EXIT-INTENT POPUP (#16) ===== */
function injectExitPopup() {
  if (PATH !== '/act-60-tax-incentives') return;
  if (document.querySelector('.rl-exit-overlay')) return;

  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;
  var overlay = document.createElement('div');
  overlay.className = 'rl-exit-overlay';
  overlay.innerHTML =
    '<div class="rl-exit-popup">' +
      '<button class="rl-exit-close" aria-label="Close">\u00D7</button>' +
      '<h3>Before You Go\u2014</h3>' +
      '<p>The 0% capital gains rate expires December 31, 2026. A 30-minute call is all it takes to find out if you qualify and start the process.</p>' +
      '<a href="' + bookUrl + '" class="rl-exit-cta">Book Your Free Strategy Call</a>' +
      '<span class="rl-exit-urgency"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true" style="vertical-align:-2px;margin-right:2px"><circle cx="12" cy="12" r="9"></circle><path d="M12 7.5v5l3 2"></path></svg> New decrees from 2027 receive 4% rate</span>' +
    '</div>';

  document.body.appendChild(overlay);

  // Close handlers
  var closeBtn = overlay.querySelector('.rl-exit-close');
  closeBtn.addEventListener('click', function() { overlay.classList.remove('rl-show'); });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('rl-show');
  });

  // Exit-intent detection (desktop: mouseleave top, mobile: scroll-up after 60%)
  var shown = false;
  var scrolledPast60 = false;

  // Desktop: mouse leaves viewport at top
  document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !shown) {
      shown = true;
      overlay.classList.add('rl-show');
    }
  });

  // Mobile: user scrolls back up after reaching 60%
  window.addEventListener('scroll', function() {
    var pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (pct > 0.6) scrolledPast60 = true;
  });
  var lastScrollY = 0;
  window.addEventListener('scroll', function() {
    if (scrolledPast60 && window.scrollY < lastScrollY && !shown) {
      var upDelta = lastScrollY - window.scrollY;
      if (upDelta > 100) {
        shown = true;
        overlay.classList.add('rl-show');
      }
    }
    lastScrollY = window.scrollY;
  });
}

/* ===== 10. WHATSAPP BUTTON (#17) ===== */
function injectWhatsApp() {
  if (document.querySelector('.rl-whatsapp')) return;

  // WhatsApp business number — same as office phone
  var waNumber = '17872361657';
  // Context-aware opener so the prefilled message matches the page topic
  // (previously hardcoded to Act 60 on every page, including the firm's
  // highest-revenue trust/estate pages). Now also bilingual: WhatsApp is the
  // default business channel in PR/LatAm, so Spanish-speaking visitors get a
  // Spanish opener.
  var path = (location.pathname || '').toLowerCase();
  // IS_ES only covers /espanol* and /recursos-*; Spanish content also lives at
  // /resources/<spanish-slug>, so detect those slugs here too.
  var waIsEs = IS_ES || /fideicomiso|sucesoral|patrimonial|herede|impuestos|requisitos|que-es-|como-evitar|cuanto-cuesta|nuevos-residentes|relocalizados|ley-60|pagas-|-es$/.test(path);
  var topic;
  if (/trust|estate|fideicomiso|sucesoral|patrimonial|heir|herede|probate|legitima|will|testamento/.test(path)) {
    topic = 'trust';
  } else if (/act-60|act60|ley-60|ley60|residency|residencia|export-services/.test(path)) {
    topic = 'act60';
  } else if (/business|formation|corporate|corporativo|llc|negocio/.test(path)) {
    topic = 'business';
  } else {
    topic = 'general';
  }
  var waMsg;
  if (waIsEs) {
    waMsg = topic === 'trust' ? 'Hola, me gustaría hablar sobre fideicomisos y planificación patrimonial en Puerto Rico.'
      : topic === 'act60' ? 'Hola, quisiera obtener más información sobre los incentivos de la Ley 60 en Puerto Rico.'
      : topic === 'business' ? 'Hola, me gustaría hablar sobre crear o estructurar un negocio en Puerto Rico.'
      : 'Hola, quisiera coordinar una consulta con Riefkohl Law.';
  } else {
    waMsg = topic === 'trust' ? 'Hi, I\'d like to talk about trusts and estate planning in Puerto Rico.'
      : topic === 'act60' ? 'Hi, I\'m interested in learning more about Act 60 tax incentives in Puerto Rico.'
      : topic === 'business' ? 'Hi, I\'d like to talk about forming or structuring a business in Puerto Rico.'
      : 'Hi, I\'d like to schedule a consultation with Riefkohl Law.';
  }
  var waText = encodeURIComponent(waMsg);

  var btn = document.createElement('a');
  btn.className = 'rl-whatsapp';
  btn.href = 'https://wa.me/' + waNumber + '?text=' + waText;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.setAttribute('aria-label', waIsEs ? 'Chatear por WhatsApp' : 'Chat on WhatsApp');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  document.body.appendChild(btn);
}

/* ===== 11. ACT 60 PERSONA LANDING PAGES (#20) ===== */
function injectPersonaPages() {
  // The three Act 60 persona landing pages that used to live here were
  // removed: their URLs 404 and will not be built (decision on record --
  // /act-60-tax-incentives owns that topic cluster). The empty map makes
  // this function a safe no-op (the config lookup below returns undefined)
  // and stops persona content from being injected into Squarespace's 404
  // page shell.
  var pages = {};

  var config = pages[PATH];
  if (!config) return;
  if (document.querySelector('.rl-act60-persona-page')) return;

  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  // Build benefits HTML
  var benefitsHtml = config.benefits.map(function(b) {
    return '<div class="rl-act60-hero-benefit"><span class="rl-act60-hero-benefit-icon">\u2713</span> ' + b + '</div>';
  }).join('');

  // Build who-for list
  var whoHtml = config.whoFor.map(function(w) {
    return '<li>' + w + '</li>';
  }).join('');

  // Build requirements list
  var reqHtml = config.requirements.map(function(r) {
    return '<li>' + r + '</li>';
  }).join('');

  var page = document.createElement('div');
  page.className = 'rl-act60-persona-page';

  // Hero
  var hero = document.createElement('div');
  hero.className = 'rl-act60-hero';
  hero.innerHTML =
    '<div class="rl-act60-hero-inner">' +
      '<div class="rl-act60-hero-badge">' + config.badge + '</div>' +
      '<h2 style="font-size:1.5rem;">' + config.h1 + '</h2>' +
      '<p class="rl-act60-hero-subtitle">' + config.subtitle + '</p>' +
      '<div class="rl-act60-hero-benefits" style="flex-direction:column;align-items:center;gap:8px;">' + benefitsHtml + '</div>' +
      '<a href="' + bookUrl + '" class="rl-act60-hero-cta" style="margin-top:24px;">' + config.ctaBtn + '</a>' +
      '<p class="rl-act60-hero-secondary">Or call <a href="' + PHONE_TEL + '">' + PHONE + '</a></p>' +
    '</div>';

  // Content sections
  var content = document.createElement('div');
  content.className = 'rl-act60-section';
  content.innerHTML =
    '<h2 class="rl-act60-section-title">Who This Is For</h2>' +
    '<div class="rl-act60-persona" style="max-width:600px;margin:0 auto 40px;">' +
      '<ul>' + whoHtml + '</ul>' +
    '</div>' +
    '<h2 class="rl-act60-section-title">Requirements &amp; Eligibility</h2>' +
    '<div class="rl-act60-persona" style="max-width:600px;margin:0 auto 40px;">' +
      '<ul>' + reqHtml + '</ul>' +
    '</div>' +
    '<div class="rl-mid-cta">' +
      '<h3>' + config.ctaHeading + '</h3>' +
      '<p>' + config.ctaBody + '</p>' +
      '<a href="' + bookUrl + '">' + config.ctaBtn + '</a>' +
    '</div>';

  // Insert into page
  var callBanner = document.querySelector('.rl-call-banner');
  var header = document.querySelector('header') || document.querySelector('.header');
  var insertAfter = callBanner || header;
  if (insertAfter && insertAfter.nextSibling) {
    insertAfter.parentNode.insertBefore(hero, insertAfter.nextSibling);
  }

  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');
  if (footer) {
    footer.parentNode.insertBefore(content, footer);
  }
}

/* ===== 12. AUTO-LINK "Act 60" TO /act-60-tax-incentives (#22) ===== */
function autoLinkAct60() {
  // Only run on article and blog pages — not on the Act 60 page itself
  if (PATH === '/act-60-tax-incentives' || PATH.indexOf('/act-60-') === 0) return;

  // Target rendered article/blog content areas
  var containers = document.querySelectorAll('.rl-sub, .rl-article-body, .blog-item-content-wrapper, .entry-content, .sqs-html-content');
  if (!containers.length) return;

  containers.forEach(function(container) {
    // Skip if already processed
    if (container.getAttribute('data-act60-linked')) return;
    container.setAttribute('data-act60-linked', '1');

    // Walk text nodes and link first occurrence of "Act 60" that isn't already inside a link
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        // Skip if inside an anchor, button, heading, script, or style
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        var tag = parent.tagName;
        if (tag === 'A' || tag === 'BUTTON' || tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (parent.closest('a')) return NodeFilter.FILTER_REJECT;
        if (/Act\s*60/i.test(node.textContent)) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_REJECT;
      }
    });

    var linked = false;
    var node;
    while ((node = walker.nextNode()) && !linked) {
      var match = node.textContent.match(/Act\s*60/i);
      if (!match) continue;

      var idx = match.index;
      var before = node.textContent.substring(0, idx);
      var linkText = match[0];
      var after = node.textContent.substring(idx + linkText.length);

      var beforeNode = document.createTextNode(before);
      var link = document.createElement('a');
      link.href = '/act-60-tax-incentives';
      link.textContent = linkText;
      link.style.cssText = 'color:#bfa35d;text-decoration:underline;font-weight:600;';
      var afterNode = document.createTextNode(after);

      var parent = node.parentNode;
      parent.insertBefore(beforeNode, node);
      parent.insertBefore(link, node);
      parent.insertBefore(afterNode, node);
      parent.removeChild(node);

      linked = true; // Only link first occurrence per container
    }
  });
}

/* ===== 13. ACT 60-SPECIFIC STICKY CTA (#23) ===== */
function updateStickyCTA() {
  if (PATH !== '/act-60-tax-incentives') return;
  var bookBtn = document.querySelector('.rl-sticky-cta .rl-sticky-book span');
  if (bookBtn) bookBtn.textContent = 'Book Act 60 Call';
}

/* ===== BOOT ===== */
function run() {
  try {
    createCallBanner();
    createStickyBar();
    createDesktopBookButton();
    /* injectLocalBusinessSchema(); — firm entity centralized in schema-markup.js (@id .../#firm)
       to avoid duplicate/conflicting LegalService schemas. */
    injectUrgencyBanner();
    injectAct60Hero();
    injectAct60MidCTA();
    injectAct60Sections();
    injectPersonaPages();
    injectPageCTAs();
    injectExitPopup();
    injectWhatsApp();
    updateStickyCTA();
    autoLinkAct60();
  } catch(e) {
    console.error('[rl-conversion]', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}

})();
