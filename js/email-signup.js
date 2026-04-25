/* Riefkohl Law — Auto-Injected Newsletter Bar + Blog Lead Magnets */
/* Source: email-signup-form.html */
/* NOTE: Replace YOUR_FORM_ACTION_URL with your email provider's form action URL */
/* RECOMMENDED: MailerLite (free up to 1,000 subscribers) */

(function(){
'use strict';

var PATH = window.location.pathname.replace(/\/+$/, '') || '/';
var IS_ES = PATH.indexOf('/espanol') === 0 || PATH.indexOf('/recursos-') === 0;
var IS_ACT60_PAGE = PATH.indexOf('/act-60') > -1 || PATH.indexOf('/ley-60') > -1 || PATH.indexOf('/cpa-referral') > -1;
var IS_CPA_REF = typeof window.rlIsCpaReferral === 'function' && window.rlIsCpaReferral();

/* ===== LEAD MAGNET CONFIGURATION ===== */
/* Select the most relevant lead magnet based on page context and referral source */
/* Magnets with a download_url deliver a PDF directly. Magnets without route to booking. */
var PDF_BASE = 'https://hans0834.github.io/riefkohl-law-scripts/files';
var LEAD_MAGNETS = {
  /* Act 60 Tax Incentives — top SEO landing page, eligibility-focused */
  eligibility: {
    heading_en: 'Free PDF: The Act 60 Eligibility Checklist',
    heading_es: 'PDF Gratuito: Lista de Verificación de Elegibilidad para la Ley 60',
    desc_en: 'A 4-page screening tool covering bona fide PR residency, Chapter 2 vs Chapter 3, and the disqualifiers that stop applications cold. Read it before you book a call.',
    desc_es: 'Herramienta de evaluación de 4 páginas: residencia bona fide en PR, Capítulo 2 vs Capítulo 3, y los factores que descalifican aplicaciones. Léala antes de coordinar consulta.',
    badge_en: 'Free PDF',
    badge_es: 'PDF Gratuito',
    btn_en: 'Download the Checklist (PDF)',
    btn_es: 'Descargar la Lista (PDF)',
    download_url: PDF_BASE + '/act60-eligibility-checklist.pdf'
  },
  /* CPA-referred visitors on any page */
  cpa: {
    heading_en: 'Free Guide: What Your Act 60 CPA Can\'t Do For You',
    heading_es: 'Guía Gratuita: Lo Que Su Contador de Ley 60 No Puede Hacer Por Usted',
    desc_en: 'The 6 legal needs every Act 60 decree holder has — that only an attorney can address. Trusts, forced heirship, decree succession, and more.',
    desc_es: 'Las 6 necesidades legales que todo decreto Ley 60 tiene — que solo un abogado puede atender.',
    badge_en: 'CPA Clients',
    badge_es: 'Clientes CPA',
    btn_en: 'Get the Guide',
    btn_es: 'Obtener la Guía'
  },
  /* Act 38-2026 / other Act 60 pages (resource center, residency test, etc.) */
  act38: {
    heading_en: 'Free Checklist: 7 Estate Planning Steps After the 2055 Extension',
    heading_es: 'Lista de Verificación: 7 Pasos de Planificación Sucesoral Tras la Extensión al 2055',
    desc_en: 'Act 38-2026 extended Act 60 to 2055. Is your estate plan ready for a 30-year horizon? Get the checklist.',
    desc_es: 'La Ley 38-2026 extendió la Ley 60 hasta 2055. ¿Está listo su plan sucesoral para un horizonte de 30 años?',
    badge_en: 'Act 38-2026',
    badge_es: 'Ley 38-2026',
    btn_en: 'Get the Checklist',
    btn_es: 'Obtener la Lista'
  },
  /* Pre-move checklist for homepage and general pages */
  premove: {
    heading_en: 'Free: The Pre-Move Puerto Rico Legal Checklist',
    heading_es: 'Gratis: Lista Legal Pre-Mudanza a Puerto Rico',
    desc_en: '12 legal steps to complete before, during, and after your move to PR. Don\'t leave your estate plan, business structure, or compliance to chance.',
    desc_es: '12 pasos legales para completar antes, durante y después de su mudanza a PR.',
    badge_en: 'Moving to PR?',
    badge_es: '¿Mudándose a PR?',
    btn_en: 'Get the Checklist',
    btn_es: 'Obtener la Lista'
  },
  /* Default trust planning checklist */
  default: {
    heading_en: 'Free: Puerto Rico Trust Planning Checklist',
    heading_es: 'Descarga Gratuita: Lista de Verificación para Fideicomisos en Puerto Rico',
    desc_en: '7 essential steps to take before meeting with an estate planning attorney. Get the checklist and receive weekly Puerto Rico legal insights.',
    desc_es: '7 pasos esenciales antes de reunirse con un abogado de planificación patrimonial. Obtenga la lista y reciba estrategias legales semanales sobre Puerto Rico.',
    badge_en: 'Free Download',
    badge_es: 'Guía Gratuita',
    btn_en: 'Get the Checklist',
    btn_es: 'Obtener la Lista'
  }
};

var IS_HOMEPAGE = PATH === '/' || PATH === '/espanol';
/* English Act 60 landing page: gets the downloadable eligibility checklist PDF.
 * /espanol-ley-60 is intentionally excluded — Spanish PDF version is a future item. */
var IS_ACT60_LANDING = PATH === '/act-60-tax-incentives';

function getLeadMagnet() {
  if (IS_CPA_REF) return LEAD_MAGNETS.cpa;
  /* Top Act 60 landing pages get the eligibility checklist (downloadable PDF) */
  if (IS_ACT60_LANDING) return LEAD_MAGNETS.eligibility;
  if (IS_ACT60_PAGE) return LEAD_MAGNETS.act38;
  if (IS_HOMEPAGE) return LEAD_MAGNETS.premove;
  return LEAD_MAGNETS.default;
}

/* Resolve the action button for a magnet:
 *  - If magnet has download_url → button downloads the PDF (target=_blank, GTM event).
 *  - Otherwise → button routes to the booking page.
 */
function getMagnetCTA(magnet) {
  if (magnet.download_url) {
    return {
      url: magnet.download_url,
      text: IS_ES ? (magnet.btn_es || 'Descargar') : (magnet.btn_en || 'Download'),
      isDownload: true
    };
  }
  return {
    url: IS_ES ? '/espanol-cita' : '/calendly',
    text: IS_ES ? 'Agendar Consulta Gratis' : 'Book a Free Strategy Call',
    isDownload: false
  };
}

/* ===== FOOTER NEWSLETTER BAR (injected site-wide) ===== */
function injectFooterSignup() {
  if (document.querySelector('.rl-footer-signup')) return;

  var magnet = getLeadMagnet();
  var cta = getMagnetCTA(magnet);
  var heading = IS_ES ? magnet.heading_es : magnet.heading_en;
  var desc = IS_ES ? magnet.desc_es : magnet.desc_en;

  var bar = document.createElement('div');
  bar.className = 'rl-footer-signup';
  var btnAttrs = cta.isDownload
    ? ' target="_blank" rel="noopener" download data-lead-download="act60-eligibility-checklist"'
    : '';
  bar.innerHTML =
    '<div class="rl-footer-signup-inner">' +
      '<div class="rl-footer-signup-badge">' + (IS_ES ? magnet.badge_es : magnet.badge_en) + '</div>' +
      '<h4>' + heading + '</h4>' +
      '<p>' + desc + '</p>' +
      '<a href="' + cta.url + '"' + btnAttrs + ' class="rl-signup-btn rl-signup-cta-link">' + cta.text + '</a>' +
    '</div>';

  // Insert before footer or at end of body
  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');
  if (footer) {
    footer.parentNode.insertBefore(bar, footer);
  } else {
    document.body.appendChild(bar);
  }
}

/* ===== SCROLL-TRIGGERED SLIDE-IN CTA (appears once per session) ===== */
function injectSlideInCTA() {
  // Only show once per session
  if (sessionStorage.getItem('rl-cta-dismissed')) return;
  // Don't show on booking or contact pages
  if (PATH === '/calendly' || PATH === '/contact' || PATH === '/espanol-cita' || PATH === '/espanol-contacto') return;

  var magnet = getLeadMagnet();
  var cta = getMagnetCTA(magnet);
  var heading = IS_ES ? magnet.heading_es : magnet.heading_en;
  var desc = IS_ES ? magnet.desc_es : magnet.desc_en;
  var dismissText = IS_ES ? 'No gracias' : 'No thanks';
  var btnAttrs = cta.isDownload
    ? ' target="_blank" rel="noopener" download data-lead-download="act60-eligibility-checklist"'
    : '';

  var popup = document.createElement('div');
  popup.className = 'rl-slide-cta';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-label', IS_ES ? 'Recurso gratuito' : 'Free resource');
  popup.innerHTML =
    '<button class="rl-slide-cta-close" aria-label="Close">&times;</button>' +
    '<div class="rl-slide-cta-badge">' + (IS_ES ? magnet.badge_es : magnet.badge_en) + '</div>' +
    '<h4>' + heading + '</h4>' +
    '<p>' + desc + '</p>' +
    '<a href="' + cta.url + '"' + btnAttrs + ' class="rl-slide-cta-btn">' + cta.text + '</a>' +
    '<button class="rl-slide-cta-dismiss">' + dismissText + '</button>';

  document.body.appendChild(popup);

  function dismiss() {
    popup.classList.remove('rl-slide-cta-visible');
    sessionStorage.setItem('rl-cta-dismissed', '1');
    setTimeout(function() { popup.remove(); }, 400);
  }

  popup.querySelector('.rl-slide-cta-close').addEventListener('click', dismiss);
  popup.querySelector('.rl-slide-cta-dismiss').addEventListener('click', dismiss);

  // Show after 50% scroll or 45 seconds, whichever comes first
  var shown = false;
  function showPopup() {
    if (shown) return;
    shown = true;
    popup.classList.add('rl-slide-cta-visible');
  }

  var scrollTimer = setTimeout(showPopup, 45000);

  window.addEventListener('scroll', function onScroll() {
    var scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (scrollPct > 0.5) {
      clearTimeout(scrollTimer);
      showPopup();
      window.removeEventListener('scroll', onScroll);
    }
  });
}

/* ===== INLINE CTA (Act 60 landing pages only) =====
 * Inserts a prominent download block inside the page body, after the
 * intro/hero, to give research-traffic visitors a low-commitment offer
 * before they bounce. Only runs when getLeadMagnet() returns a magnet
 * with a download_url, on /act-60-tax-incentives or /espanol-ley-60.
 */
function injectInlineCTA() {
  if (!IS_ACT60_LANDING) return;
  if (document.querySelector('.rl-inline-magnet')) return;

  var magnet = getLeadMagnet();
  if (!magnet.download_url) return;
  var cta = getMagnetCTA(magnet);
  var heading = IS_ES ? magnet.heading_es : magnet.heading_en;
  var desc = IS_ES ? magnet.desc_es : magnet.desc_en;
  var badge = IS_ES ? magnet.badge_es : magnet.badge_en;

  var box = document.createElement('aside');
  box.className = 'rl-inline-magnet';
  box.setAttribute('role', 'complementary');
  box.style.cssText = 'max-width:1140px;margin:36px auto;padding:28px 32px;' +
    'background:#1a2033;color:#fff;border-radius:14px;' +
    'box-shadow:0 8px 28px rgba(26,32,51,.18);' +
    'border:1px solid rgba(191,163,93,.35);' +
    'display:flex;flex-wrap:wrap;align-items:center;gap:24px;';

  var badgeHtml = '<span style="display:inline-block;padding:4px 12px;background:#bfa35d;color:#1a2033;font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:4px;margin-bottom:10px;">' + badge + '</span>';
  var headHtml = '<h3 style="margin:0 0 8px;font-size:1.35rem;font-weight:700;color:#fff;line-height:1.25;">' + heading + '</h3>';
  var descHtml = '<p style="margin:0 0 0;font-size:.95rem;line-height:1.5;color:#d8d2bf;">' + desc + '</p>';

  var btnHtml = '<a href="' + cta.url + '" target="_blank" rel="noopener" download ' +
    'data-lead-download="act60-eligibility-checklist" ' +
    'style="flex:0 0 auto;display:inline-block;padding:14px 24px;background:#bfa35d;color:#1a2033;' +
    'font-weight:700;font-size:.95rem;text-decoration:none;border-radius:8px;white-space:nowrap;' +
    'transition:transform .2s,box-shadow .2s;" ' +
    'onmouseenter="this.style.transform=\'translateY(-1px)\';this.style.boxShadow=\'0 6px 16px rgba(191,163,93,.35)\'" ' +
    'onmouseleave="this.style.transform=\'\';this.style.boxShadow=\'\'">' +
    '↓ ' + cta.text + '</a>';

  box.innerHTML =
    '<div style="flex:1 1 320px;min-width:0;">' + badgeHtml + headHtml + descHtml + '</div>' +
    btnHtml;

  /* Insert after the first H1's containing section, or fallback to top of article */
  var article = document.querySelector('article');
  if (!article) return;
  var h1 = article.querySelector('h1');
  var anchor = h1 ? (h1.closest('section') || h1.parentElement) : null;
  if (anchor && anchor.parentElement) {
    anchor.parentElement.insertBefore(box, anchor.nextSibling);
  } else {
    article.insertBefore(box, article.firstChild);
  }
}

/* ===== Track downloads via GTM dataLayer (set by gtm-tracking.js) ===== */
function attachDownloadTracking() {
  document.addEventListener('click', function(e) {
    var a = e.target.closest && e.target.closest('a[data-lead-download]');
    if (!a) return;
    if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push({
        event: 'lead_magnet_download',
        magnet: a.getAttribute('data-lead-download') || 'unknown',
        page_path: PATH
      });
    }
  });
}

/* ===== BOOT ===== */
function run() {
  try {
    injectFooterSignup();
    injectSlideInCTA();
    injectInlineCTA();
    attachDownloadTracking();
  } catch(e) {
    console.error('[rl-email-signup]', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}

})();
