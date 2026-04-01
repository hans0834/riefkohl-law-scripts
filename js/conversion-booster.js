/* Riefkohl Law — Conversion Optimization: Click-to-Call, Sticky Mobile CTA, LocalBusiness Schema */
/* Source: conversion-booster.html */

(function(){
'use strict';

var PHONE = '(787) 236-1657';
var PHONE_TEL = 'tel:+17872361657';
var WHATSAPP_URL = 'https://wa.me/17872361657?text=Hi%2C%20I%27d%20like%20to%20discuss%20Act%2060%20legal%20services.';
var BOOK_URL = '/calendly';
var PATH = window.location.pathname.replace(/\/+$/, '') || '/';
var IS_ES = PATH.indexOf('/espanol') === 0 || PATH.indexOf('/recursos-') === 0;

/* ===== SVG ICONS ===== */
var PHONE_SVG = '<svg class="rl-call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>';
var PHONE_SVG_STICKY = '<svg class="rl-sticky-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>';
var CALENDAR_SVG = '<svg class="rl-sticky-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
var WHATSAPP_SVG = '<svg class="rl-sticky-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

/* ===== 1. TOP BANNER — VALUE-DRIVEN CTA ===== */
function createCallBanner() {
  if (document.querySelector('.rl-call-banner')) return;

  var isCpaRef = typeof window.rlIsCpaReferral === 'function' && window.rlIsCpaReferral();

  var banner = document.createElement('div');
  banner.className = 'rl-call-banner';
  banner.setAttribute('role', 'banner');
  banner.setAttribute('aria-label', IS_ES ? 'Contenido destacado' : 'Featured content');

  if (isCpaRef && !IS_ES) {
    /* CPA-referred visitor — show referral-specific banner */
    banner.innerHTML =
      '<a href="tel:+17872361657" aria-label="Call (787) 236-1657">' + PHONE_SVG + '(787) 236-1657</a>' +
      '<span class="rl-call-sep">|</span>' +
      '<a href="mailto:hans@riefkohllaw.com" aria-label="Email hans@riefkohllaw.com">hans@riefkohllaw.com</a>' +
      '<span class="rl-call-sep">|</span>' +
      '<span class="rl-call-text">Referred by your CPA?</span>' +
      '<span class="rl-call-sep">|</span>' +
      '<a href="/calendly">Book your complimentary estate planning review &rarr;</a>';
  } else {
    /* Default banner */
    banner.innerHTML =
      '<a href="tel:+17872361657" aria-label="Call (787) 236-1657">' + PHONE_SVG + '(787) 236-1657</a>' +
      '<span class="rl-call-sep">|</span>' +
      '<a href="mailto:hans@riefkohllaw.com" aria-label="Email hans@riefkohllaw.com">hans@riefkohllaw.com</a>' +
      '<span class="rl-call-sep">|</span>' +
      '<span class="rl-call-text">' + (IS_ES ? 'Serie de Fideicomisos en PR' : '12-Part Trust Law Series') + '</span>' +
      '<span class="rl-call-sep">|</span>' +
      '<a href="/resources">' + (IS_ES ? 'Leer ahora' : 'Read now') + ' &rarr;</a>';
  }

  // Insert at very top of body, before the header
  var header = document.querySelector('header') || document.querySelector('.header');
  if (header && header.parentNode) {
    header.parentNode.insertBefore(banner, header);
  } else {
    document.body.insertBefore(banner, document.body.firstChild);
  }

  // Push header down so it doesn't overlap the banner
  adjustHeaderForBanner();
  window.addEventListener('resize', adjustHeaderForBanner);
}

function adjustHeaderForBanner() {
  var banner = document.querySelector('.rl-call-banner');
  var header = document.querySelector('#header, header.header');
  if (!banner || !header) return;
  var bannerH = banner.offsetHeight;
  header.style.top = bannerH + 'px';
}

/* ===== 2. STICKY MOBILE CTA BAR ===== */
function createStickyBar() {
  if (document.querySelector('.rl-sticky-cta')) return;

  var bar = document.createElement('div');
  bar.className = 'rl-sticky-cta';
  bar.setAttribute('role', 'navigation');
  bar.setAttribute('aria-label', IS_ES ? 'Acciones de contacto' : 'Contact actions');

  var isCpaRef = typeof window.rlIsCpaReferral === 'function' && window.rlIsCpaReferral();
  var callLabel = IS_ES ? 'Llamar' : 'Call Now';
  var bookLabel = IS_ES ? 'Agendar Cita' : (isCpaRef ? 'Free CPA-Client Consult' : 'Book Consult');
  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  var waLabel = IS_ES ? 'WhatsApp' : 'WhatsApp';

  bar.innerHTML =
    '<a href="' + PHONE_TEL + '" class="rl-sticky-call" aria-label="' + callLabel + ' ' + PHONE + '">' +
      PHONE_SVG_STICKY +
      '<span>' + callLabel + '</span>' +
    '</a>' +
    '<div class="rl-sticky-divider"></div>' +
    '<a href="' + WHATSAPP_URL + '" class="rl-sticky-wa" aria-label="' + waLabel + '" target="_blank" rel="noopener">' +
      WHATSAPP_SVG +
      '<span>' + waLabel + '</span>' +
    '</a>' +
    '<div class="rl-sticky-divider"></div>' +
    '<a href="' + bookUrl + '" class="rl-sticky-book" aria-label="' + bookLabel + '">' +
      CALENDAR_SVG +
      '<span>' + bookLabel + '</span>' +
    '</a>';

  document.body.appendChild(bar);
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
    'sameAs': []
  };

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);

  // Attorney Person schema — helps Google Knowledge Panel
  var personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    '@id': 'https://www.riefkohllaw.com/#attorney',
    'name': 'Hans E. Riefkohl',
    'givenName': 'Hans',
    'familyName': 'Riefkohl',
    'jobTitle': 'Managing Attorney',
    'description': 'Puerto Rico attorney specializing in trusts, estate planning, Act 60 tax incentives, business formation, and government contracts.',
    'url': 'https://www.riefkohllaw.com/about',
    'telephone': '+1-787-236-1657',
    'email': 'hans@riefkohllaw.com',
    'worksFor': {
      '@id': 'https://www.riefkohllaw.com/#organization'
    },
    'alumniOf': [
      {
        '@type': 'Organization',
        'name': 'DLA Piper',
        'description': 'Global law firm'
      },
      {
        '@type': 'CollegeOrUniversity',
        'name': 'Villanova University',
        'description': 'BBA cum laude, JD summa cum laude'
      }
    ],
    'hasCredential': [
      {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'Bar Admission',
        'recognizedBy': { '@type': 'Organization', 'name': 'Supreme Court of Puerto Rico' }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'Bar Admission',
        'recognizedBy': { '@type': 'Organization', 'name': 'District of Columbia Bar' }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'Bar Admission',
        'recognizedBy': { '@type': 'Organization', 'name': 'U.S. District Court for the District of Puerto Rico' }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'Bar Admission',
        'recognizedBy': { '@type': 'Organization', 'name': 'U.S. Court of Appeals for the First Circuit' }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'Professional License',
        'name': 'Notary Public',
        'recognizedBy': { '@type': 'Organization', 'name': 'Government of Puerto Rico' }
      }
    ],
    'knowsAbout': ['Puerto Rico Trusts', 'Estate Planning', 'Act 60 Tax Incentives', 'Business Formation', 'Government Contracts', 'Forced Heirship', 'Fideicomisos'],
    'knowsLanguage': ['en', 'es'],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '273 Ponce de Leon Ave.',
      'addressLocality': 'San Juan',
      'addressRegion': 'PR',
      'postalCode': '00917',
      'addressCountry': 'US'
    },
    'sameAs': []
  };

  var personScript = document.createElement('script');
  personScript.type = 'application/ld+json';
  personScript.textContent = JSON.stringify(personSchema);
  document.head.appendChild(personScript);
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
    '/puerto-rico-trusts': {
      heading: IS_ES ? 'Proteja sus activos con un fideicomiso en Puerto Rico' : 'Protect Your Assets with a Puerto Rico Trust',
      body: IS_ES
        ? 'Descubra cómo un fideicomiso puede proteger el patrimonio de su familia, evitar la sucesión testamentaria y aprovechar las leyes favorables de Puerto Rico.'
        : 'Learn how a fideicomiso can protect your family\'s wealth, avoid probate, and take advantage of Puerto Rico\'s favorable trust laws.',
      btn: IS_ES ? 'Reserve una Consulta Gratuita' : 'Book a Free Trust Consultation',
      secondary: IS_ES ? 'O llame al (787) 236-1657' : 'Or call (787) 236-1657'
    },
    '/estate-planning': {
      heading: IS_ES ? '¿Tiene un plan sucesoral actualizado?' : 'Is Your Estate Plan Up to Date?',
      body: IS_ES
        ? 'La legítima de Puerto Rico requiere planificación cuidadosa. Proteja a su familia con un plan que funcione bajo las leyes de PR.'
        : 'Puerto Rico\'s forced heirship rules (legítima) mean estate planning here is different. Protect your family with a plan built for PR law.',
      btn: IS_ES ? 'Consulta Gratuita de 15 Minutos' : 'Get Your Free 15-Minute Review',
      secondary: IS_ES ? 'O llame al (787) 236-1657' : 'Or call (787) 236-1657'
    },
    '/business-formation': {
      heading: IS_ES ? '¿Listo para formar su negocio en Puerto Rico?' : 'Ready to Form Your Puerto Rico Business?',
      body: IS_ES
        ? 'LLC, corporación, o sociedad — estructuraremos su entidad para máxima protección y eficiencia contributiva desde el primer día.'
        : 'LLC, corporation, or partnership — we\'ll structure your entity for maximum protection and tax efficiency from day one. Flat fee, no surprises.',
      btn: IS_ES ? 'Reserve Su Consulta Gratuita' : 'Book Your Free Strategy Call',
      secondary: IS_ES ? 'O llame al (787) 236-1657' : 'Or call (787) 236-1657'
    },
    '/government-contracts': {
      heading: IS_ES ? '¿Necesita ayuda con contratos gubernamentales?' : 'Need Help with Government Contracts?',
      body: IS_ES
        ? 'Desde propuestas hasta cumplimiento, proteja los intereses de su empresa en contratación pública.'
        : 'From proposal review to compliance and disputes, protect your business interests in government procurement.',
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
    '/about': {
      heading: 'Ready to Discuss Your Legal Needs?',
      body: 'Schedule a free 30-minute strategy call. We\'ll review your situation, answer your questions, and outline a clear path forward\u2014flat fee, no surprises.',
      btn: 'Book Your Free Strategy Call',
      secondary: 'Or call (787) 236-1657'
    },
    '/about-us': {
      heading: 'Ready to Discuss Your Legal Needs?',
      body: 'Schedule a free 30-minute strategy call. We\'ll review your situation, answer your questions, and outline a clear path forward\u2014flat fee, no surprises.',
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
    '<p style="color:rgba(255,255,255,.8);font-size:.85rem;margin-top:14px;">' + config.secondary + '</p>';

  // Insert before the footer signup or at end of main content
  var footerSignup = document.querySelector('.rl-footer-signup');
  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');

  if (footerSignup) {
    footerSignup.parentNode.insertBefore(cta, footerSignup);
  } else if (footer) {
    footer.parentNode.insertBefore(cta, footer);
  } else {
    document.body.appendChild(cta);
  }
}

/* ===== 5. ACT 60 ABOVE-THE-FOLD HERO ===== */
function injectAct60Hero() {
  if (PATH !== '/act-60-tax-incentives') return;
  if (document.querySelector('.rl-act60-hero')) return;

  var bookUrl = IS_ES ? '/espanol-cita' : BOOK_URL;

  var hero = document.createElement('div');
  hero.className = 'rl-act60-hero';
  hero.innerHTML =
    '<div class="rl-act60-hero-inner">' +
      '<div class="rl-act60-hero-badge">Puerto Rico Act 60 Attorney</div>' +
      '<h2>4% Corporate Tax Rate for Export Services.<br>Reduced Rates on Capital Gains for Investors.</h2>' +
      '<p class="rl-act60-hero-subtitle">Riefkohl Law helps businesses and individuals secure Act 60 tax decrees, structure operations for compliance, and defend benefits under IRS scrutiny.</p>' +
      '<div class="rl-act60-hero-benefits">' +
        '<div class="rl-act60-hero-benefit"><span class="rl-act60-hero-benefit-icon">\u2713</span> 4% Corporate Tax on Export Income</div>' +
        '<div class="rl-act60-hero-benefit"><span class="rl-act60-hero-benefit-icon">\u2713</span> 100% Exemption on Distributions</div>' +
        '<div class="rl-act60-hero-benefit"><span class="rl-act60-hero-benefit-icon">\u2713</span> Capital Gains Benefits for Investors</div>' +
      '</div>' +
      '<a href="' + bookUrl + '" class="rl-act60-hero-cta">Book Your Free Act 60 Strategy Call</a>' +
      '<p class="rl-act60-hero-secondary">Or call <a href="' + PHONE_TEL + '">' + PHONE + '</a></p>' +
      '<div class="rl-act60-hero-urgency">\u23F1 0% IRI capital gains rate ends Dec 31, 2026 \u2014 4% rate applies to new decrees from 2027. Act now.</div>' +
    '</div>';

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
      '<h3>Does Your Business Qualify for the 4% Rate?</h3>' +
      '<p>Find out if your export services, consulting, technology, or professional services business is eligible for Act 60 Chapter 3 benefits.</p>' +
      '<a href="' + bookUrl + '">Get Your Free Eligibility Assessment</a>';

    var target = chapter2Heading.closest('.sqs-block') || chapter2Heading.parentElement || chapter2Heading;
    target.parentNode.insertBefore(midCta, target);
  }
}

/* ===== 7. ABOUT PAGE CTA ENHANCEMENT ===== */
function enhanceAboutPage() {
  if (PATH !== '/about' && PATH !== '/about-us' && PATH !== '/espanol-sobre-nosotros') return;
  if (document.querySelector('.rl-about-cta')) return;

  var bookUrl = IS_ES ? '/espanol-cita' : '/calendly';

  // Add a CTA block at the bottom of the about page
  var cta = document.createElement('div');
  cta.className = 'rl-about-cta';
  cta.style.cssText = 'max-width:720px;margin:48px auto;padding:40px 36px;background:linear-gradient(160deg,#1a2033 0%,#243047 100%);border-radius:12px;text-align:center;box-sizing:border-box;';
  cta.innerHTML =
    '<p style="display:inline-block;padding:4px 14px;background:rgba(191,163,93,.15);color:#bfa35d;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;border-radius:100px;margin-bottom:16px;">' +
      (IS_ES ? 'CONSULTA GRATUITA' : 'FREE CONSULTATION') + '</p>' +
    '<h2 style="font-family:var(--heading-font-font-family,Georgia,serif);font-size:1.5rem;font-weight:700;color:#fff;margin:0 0 12px;letter-spacing:-.02em;">' +
      (IS_ES ? 'Hablemos de Su Situaci\u00f3n Legal' : 'Let\u2019s Talk About Your Legal Needs') + '</h2>' +
    '<p style="color:rgba(255,255,255,.6);font-size:.92rem;line-height:1.6;margin:0 0 24px;max-width:540px;margin-left:auto;margin-right:auto;">' +
      (IS_ES
        ? 'Agende una llamada de 15 minutos para discutir sus necesidades. Sin compromiso, sin cargos. Tarifa fija para todos nuestros servicios.'
        : 'Schedule a 15-minute call to discuss your situation. No obligation, no charge. Flat fee quoted upfront for all services.') + '</p>' +
    '<a href="' + bookUrl + '" style="display:inline-block;padding:15px 32px;background:#bfa35d;color:#1a2033 !important;font-size:.88rem;font-weight:700;text-decoration:none;border-radius:8px;transition:background .25s,transform .15s;">' +
      (IS_ES ? 'Agendar Consulta Gratuita' : 'Book Your Free Strategy Call') + '</a>' +
    '<p style="color:rgba(255,255,255,.75);font-size:.85rem;margin-top:14px;">' +
      (IS_ES ? 'O llame al ' : 'Or call ') + '<a href="' + PHONE_TEL + '" style="color:#bfa35d !important;text-decoration:none;font-weight:600;">' + PHONE + '</a></p>';

  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');
  if (footer) {
    footer.parentNode.insertBefore(cta, footer);
  }
}

/* ===== 8. EXIT-INTENT ENGAGEMENT POPUP ===== */
function initExitIntent() {
  // Don't show on /calendly (they're already converting) or if already dismissed
  if (PATH === '/calendly' || PATH === '/espanol-cita') return;
  try { if (sessionStorage.getItem('rl-exit-dismissed')) return; } catch(e) {}

  var shown = false;
  var bookUrl = IS_ES ? '/espanol-cita' : '/calendly';

  function showPopup() {
    if (shown) return;
    shown = true;

    var overlay = document.createElement('div');
    overlay.className = 'rl-exit-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', IS_ES ? 'Oferta especial' : 'Special offer');

    var heading = IS_ES
      ? '\u00BFAntes de irse? Su consulta es gratis.'
      : 'Before You Go \u2014 Your First Consultation Is Free';
    var body = IS_ES
      ? 'Hable con un abogado sobre fideicomisos, planificaci\u00F3n sucesoral, Ley 60, o formaci\u00F3n de negocios. Sin compromiso, sin cargos.'
      : 'Talk to an attorney about trusts, estate planning, Act\u00A060, or business formation. No obligation, no charge for the first call.';
    var btnText = IS_ES ? 'Reservar Mi Consulta Gratuita' : 'Book My Free Consultation';
    var dismissText = IS_ES ? 'No gracias, continuar navegando' : 'No thanks, I\u2019ll keep browsing';

    overlay.innerHTML =
      '<div class="rl-exit-popup">' +
        '<button class="rl-exit-close" aria-label="Close">&times;</button>' +
        '<div class="rl-exit-badge">' + (IS_ES ? 'OFERTA LIMITADA' : 'FREE CONSULTATION') + '</div>' +
        '<h2>' + heading + '</h2>' +
        '<p>' + body + '</p>' +
        '<a href="' + bookUrl + '" class="rl-exit-cta">' + btnText + '</a>' +
        '<p class="rl-exit-phone">' + (IS_ES ? 'O llame al ' : 'Or call ') + '<a href="' + PHONE_TEL + '">' + PHONE + '</a></p>' +
        '<button class="rl-exit-dismiss">' + dismissText + '</button>' +
      '</div>';

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(function() {
      overlay.style.opacity = '1';
      overlay.querySelector('.rl-exit-popup').style.transform = 'translateY(0) scale(1)';
    });

    function dismiss() {
      overlay.style.opacity = '0';
      overlay.querySelector('.rl-exit-popup').style.transform = 'translateY(20px) scale(.97)';
      setTimeout(function() { overlay.remove(); }, 300);
      try { sessionStorage.setItem('rl-exit-dismissed', '1'); } catch(e) {}
    }

    overlay.querySelector('.rl-exit-close').addEventListener('click', dismiss);
    overlay.querySelector('.rl-exit-dismiss').addEventListener('click', dismiss);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) dismiss();
    });

    /* Focus trap + keyboard handling */
    var popup = overlay.querySelector('.rl-exit-popup');
    var focusable = popup.querySelectorAll('button, a[href]');
    var firstFocusable = focusable[0];
    var lastFocusable = focusable[focusable.length - 1];
    firstFocusable.focus();

    overlay.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { dismiss(); return; }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) { e.preventDefault(); lastFocusable.focus(); }
      } else {
        if (document.activeElement === lastFocusable) { e.preventDefault(); firstFocusable.focus(); }
      }
    });
  }

  // Desktop: mouse leaves viewport toward top
  document.addEventListener('mouseout', function(e) {
    if (e.clientY < 5 && e.relatedTarget == null) showPopup();
  });

  // Mobile fallback: show after 45 seconds of engagement
  setTimeout(function() {
    if (!shown && window.innerWidth < 768) showPopup();
  }, 45000);
}

/* ===== COOKIE CONSENT BANNER ===== */
function initCookieConsent() {
  if (localStorage.getItem('rl_cookie_consent')) return;
  if (document.querySelector('.rl-cookie-banner')) return;

  var banner = document.createElement('div');
  banner.className = 'rl-cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', IS_ES ? 'Consentimiento de cookies' : 'Cookie consent');

  var text = IS_ES
    ? 'Este sitio usa cookies para mejorar su experiencia y analizar el tr\u00e1fico.'
    : 'This site uses cookies to improve your experience and analyze traffic.';
  var linkText = IS_ES ? 'Pol\u00edtica de Privacidad' : 'Privacy Policy';
  var acceptText = IS_ES ? 'Aceptar' : 'Accept';

  banner.innerHTML =
    '<div class="rl-cookie-inner">' +
      '<p class="rl-cookie-text">' + text +
        ' <a href="/privacy-policy" class="rl-cookie-link">' + linkText + '</a>' +
      '</p>' +
      '<button class="rl-cookie-accept" type="button">' + acceptText + '</button>' +
    '</div>';

  document.body.appendChild(banner);

  banner.querySelector('.rl-cookie-accept').addEventListener('click', function() {
    localStorage.setItem('rl_cookie_consent', '1');
    banner.classList.add('rl-cookie-hiding');
    setTimeout(function() { banner.remove(); }, 400);
  });

  /* Show with slight delay so it doesn't compete with page load */
  setTimeout(function() { banner.classList.add('rl-cookie-visible'); }, 1500);
}

/* ===== BOOT ===== */
function run() {
  try {
    createCallBanner();
    createStickyBar();
    injectLocalBusinessSchema();
    injectAct60Hero();
    injectAct60MidCTA();
    injectPageCTAs();
    enhanceAboutPage();
    initExitIntent();
    initCookieConsent();
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
