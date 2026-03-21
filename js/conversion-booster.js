/* Riefkohl Law — Conversion Optimization: Click-to-Call, Sticky Mobile CTA, LocalBusiness Schema */
/* Source: conversion-booster.html */

(function(){
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

/* ===== 1. TOP BANNER — VALUE-DRIVEN CTA ===== */
function createCallBanner() {
  if (document.querySelector('.rl-call-banner')) return;

  var banner = document.createElement('div');
  banner.className = 'rl-call-banner';
  banner.setAttribute('role', 'banner');
  banner.setAttribute('aria-label', IS_ES ? 'Contenido destacado' : 'Featured content');

  var promoText = IS_ES
    ? 'Nuevo: Serie de 15 art\u00edculos sobre fideicomisos en Puerto Rico'
    : 'New: 15-Part Trust Law Series \u2014 Free Estate Planning Resources';
  var linkText = IS_ES ? 'Leer ahora' : 'Read now';
  var linkUrl = '/resources';

  banner.innerHTML =
    '<span class="rl-call-text">' + promoText + '</span>' +
    '<span class="rl-call-sep">|</span>' +
    '<a href="' + linkUrl + '">' + linkText + ' &rarr;</a>';

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
    'description': 'Puerto Rico law firm specializing in trusts, estate planning, Act 60 tax incentives, business formation, and government contracts.',
    'url': 'https://www.riefkohllaw.com',
    'telephone': '+1-787-236-1657',
    'email': 'info@riefkohllaw.com',
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

/* ===== BOOT ===== */
function run() {
  try {
    createCallBanner();
    createStickyBar();
    injectLocalBusinessSchema();
    injectAct60Hero();
    injectAct60MidCTA();
    injectPageCTAs();
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
