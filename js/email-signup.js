/* Riefkohl Law — Auto-Injected Newsletter Bar + Blog Lead Magnets */
/* Source: email-signup-form.html */
/* Magnet CTAs route to the eligibility quiz, booking, or a Mailchimp */
/* subscribe form once MAILCHIMP_ACTION_URL is set (else booking link). */

(function(){
'use strict';

var PATH = window.location.pathname.replace(/\/+$/, '') || '/';
var IS_ES = PATH.indexOf('/espanol') === 0 || PATH.indexOf('/recursos-') === 0;
var IS_ACT60_PAGE = PATH.indexOf('/act-60') > -1 || PATH.indexOf('/ley-60') > -1 || PATH.indexOf('/cpa-referral') > -1;
var IS_CPA_REF = typeof window.rlIsCpaReferral === 'function' && window.rlIsCpaReferral();

/* ===== EMAIL CAPTURE (Mailchimp) =====
 * Paste the Mailchimp embedded-form action URL between the quotes to turn the
 * newsletter CTAs (the non-PDF magnets) into a real subscribe form. Leave it
 * empty ('') to keep the current booking-link fallback. The URL looks like:
 *   https://riefkohllaw.us21.list-manage.com/subscribe/post?u=XXXX&id=YYYY
 * (Mailchimp > Audience > Signup forms > Embedded form > copy the <form action>.)
 * On submit the form pushes an `email_signup_submit` event to the dataLayer,
 * which the live GTM container already forwards to GA4 — no GTM change needed.
 */
var MAILCHIMP_ACTION_URL = '';

/* ===== LEAD MAGNET CONFIGURATION ===== */
/* Select the most relevant lead magnet based on page context and referral source */
/* Magnets with a link_url route there (e.g. the eligibility quiz); others route to booking. */
var LEAD_MAGNETS = {
  /* Act 60 Tax Incentives — top SEO landing page, eligibility-focused */
  eligibility: {
    heading_en: 'Are You Actually Eligible for Act 60?',
    heading_es: '¿Es Realmente Elegible para la Ley 60?',
    desc_en: 'Bona fide PR residency, Chapter 2 vs Chapter 3, and the disqualifiers that stop applications cold — find out where you stand in five minutes, before you book a call.',
    desc_es: 'Residencia bona fide en PR, Capítulo 2 vs Capítulo 3, y los factores que descalifican solicitudes — descubra dónde está parado en cinco minutos, antes de coordinar consulta.',
    badge_en: 'Act 60',
    badge_es: 'Ley 60',
    btn_en: 'Take the Eligibility Quiz',
    btn_es: 'Tomar la Evaluación de Elegibilidad',
    link_url: '/resources/act-60-eligibility-quiz'
  },
  /* CPA-referred visitors on any page */
  cpa: {
    heading_en: 'What Your Act 60 CPA Can\'t Do For You',
    heading_es: 'Lo Que Su Contador de Ley 60 No Puede Hacer Por Usted',
    desc_en: 'The 6 legal needs every Act 60 decree holder has — that only an attorney can address. Trusts, forced heirship, decree succession, and more.',
    desc_es: 'Las 6 necesidades legales que todo decreto Ley 60 tiene — que solo un abogado puede atender.',
    badge_en: 'CPA Clients',
    badge_es: 'Clientes CPA',
    btn_en: 'Book a Free Strategy Call',
    btn_es: 'Agendar Consulta Gratis'
  },
  /* Act 38-2026 / other Act 60 pages (resource center, residency test, etc.) */
  act38: {
    heading_en: 'Estate Planning After the 2055 Extension',
    heading_es: 'Planificación Sucesoral Tras la Extensión al 2055',
    desc_en: 'Act 38-2026 extended Act 60 to 2055. Is your estate plan ready for a 30-year horizon? Review it with an attorney in a free strategy call.',
    desc_es: 'La Ley 38-2026 extendió la Ley 60 hasta 2055. ¿Está listo su plan sucesoral para un horizonte de 30 años? Revíselo con un abogado en una consulta gratuita.',
    badge_en: 'Act 38-2026',
    badge_es: 'Ley 38-2026',
    btn_en: 'Book a Free Strategy Call',
    btn_es: 'Agendar Consulta Gratis'
  },
  /* Pre-move checklist for homepage and general pages */
  premove: {
    heading_en: 'Moving to Puerto Rico? Plan the Legal Side First',
    heading_es: '¿Se Muda a Puerto Rico? Planifique lo Legal Primero',
    desc_en: 'There are legal steps before, during, and after your move — estate plan, business structure, compliance. Walk through yours in a free 30-minute strategy call.',
    desc_es: 'Hay pasos legales antes, durante y después de su mudanza — plan sucesoral, estructura de negocio y cumplimiento. Repáselos en una consulta gratuita de 30 minutos.',
    badge_en: 'Moving to PR?',
    badge_es: '¿Mudándose a PR?',
    btn_en: 'Book a Free Strategy Call',
    btn_es: 'Agendar Consulta Gratis'
  },
  /* Default trust planning checklist */
  default: {
    heading_en: 'Puerto Rico Legal Insights, Weekly',
    heading_es: 'Estrategias Legales de Puerto Rico, Cada Semana',
    desc_en: 'Estate planning, trusts, and Act 60 strategies — practical Puerto Rico legal insights each week. Prefer to talk? Your first strategy call is free.',
    desc_es: 'Planificación patrimonial, fideicomisos y Ley 60 — estrategias prácticas cada semana. ¿Prefiere hablar? Su primera consulta es gratis.',
    badge_en: 'Newsletter',
    badge_es: 'Boletín',
    btn_en: 'Book a Free Strategy Call',
    btn_es: 'Agendar Consulta Gratis'
  }
};

var IS_HOMEPAGE = PATH === '/' || PATH === '/espanol';
/* English Act 60 landing page: gets the eligibility-quiz inline CTA. */
var IS_ACT60_LANDING = PATH === '/act-60-tax-incentives';

function getLeadMagnet() {
  if (IS_CPA_REF) return LEAD_MAGNETS.cpa;
  /* Top Act 60 landing page gets the eligibility-quiz magnet */
  if (IS_ACT60_LANDING) return LEAD_MAGNETS.eligibility;
  if (IS_ACT60_PAGE) return LEAD_MAGNETS.act38;
  if (IS_HOMEPAGE) return LEAD_MAGNETS.premove;
  return LEAD_MAGNETS.default;
}

/* Resolve the action button for a magnet:
 *  - If magnet has link_url → button routes there (e.g. the eligibility quiz).
 *  - Otherwise → button routes to the booking page.
 */
function getMagnetCTA(magnet) {
  if (magnet.link_url) {
    return {
      url: magnet.link_url,
      text: IS_ES ? (magnet.btn_es || 'Ver más') : (magnet.btn_en || 'Learn more'),
      isDownload: false
    };
  }
  return {
    url: IS_ES ? '/espanol-cita' : '/calendly',
    text: IS_ES ? 'Agendar Consulta Gratis' : 'Book a Free Strategy Call',
    isDownload: false
  };
}

/* ===== REAL EMAIL CAPTURE (Mailchimp) ===== */

/* True when this magnet is a newsletter offer (no PDF) AND a provider URL is set. */
function emailCaptureEnabled(magnet) {
  return !magnet.link_url && !!MAILCHIMP_ACTION_URL;
}

/* Markup for the subscribe form. Reuses the existing .rl-signup-* CSS classes. */
function signupFormHtml() {
  var ph = IS_ES ? 'Su correo electrónico' : 'Your email address';
  var btn = IS_ES ? 'Suscribirse' : 'Subscribe';
  var ok = IS_ES
    ? '¡Gracias! Revise su correo para confirmar la suscripción.'
    : 'Thanks! Check your inbox to confirm your subscription.';
  var priv = IS_ES ? 'Sin spam. Cancele cuando quiera.' : 'No spam. Unsubscribe anytime.';
  /* action is set so the form still posts if JS fails; the handler intercepts it. */
  return '<form class="rl-signup-form" action="' + MAILCHIMP_ACTION_URL.replace(/&amp;/g, '&') + '" method="post" target="_blank" novalidate>' +
           '<input type="email" name="EMAIL" class="rl-signup-input" placeholder="' + ph + '" required aria-label="' + ph + '">' +
           '<button type="submit" class="rl-signup-btn">' + btn + '</button>' +
         '</form>' +
         '<div class="rl-signup-success" role="status" style="display:none;">' + ok + '</div>' +
         '<p class="rl-signup-privacy">' + priv + '</p>';
}

/* Attach the submit handler to a .rl-signup-form inside `scope`. */
function wireSignupForm(scope) {
  var form = scope.querySelector('.rl-signup-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var input = form.querySelector('input[type="email"]');
    var email = input ? input.value.trim() : '';
    if (!email) return;
    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    /* GA4 conversion event (GTM "CE - conversion events" trigger forwards it). */
    if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push({
        event: 'email_signup_submit',
        page_path: PATH,
        lang: IS_ES ? 'es' : 'en'
      });
    }

    /* Mailchimp accepts a cross-origin no-cors POST; we can't read the response,
     * so we optimistically show success. Honeypot field name is b_<u>_<id>,
     * derived from the action URL — bots that fill it are rejected. */
    var url = MAILCHIMP_ACTION_URL.replace(/&amp;/g, '&');
    var u = '', id = '', qs = (url.split('?')[1] || '');
    qs.split('&').forEach(function(p) {
      var kv = p.split('=');
      if (kv[0] === 'u') u = kv[1];
      if (kv[0] === 'id') id = kv[1];
    });
    var fd = new FormData();
    fd.append('EMAIL', email);
    if (u && id) fd.append('b_' + u + '_' + id, '');

    var done = function() {
      form.style.display = 'none';
      var okEl = scope.querySelector('.rl-signup-success');
      if (okEl) okEl.style.display = 'block';
    };
    fetch(url, { method: 'POST', body: fd, mode: 'no-cors' }).then(done).catch(done);
  });
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
  var btnAttrs = '';
  /* Newsletter magnets become a real subscribe form; link magnets stay a plain link. */
  var ctaBlock = emailCaptureEnabled(magnet)
    ? signupFormHtml()
    : '<a href="' + cta.url + '"' + btnAttrs + ' class="rl-signup-btn rl-signup-cta-link">' + cta.text + '</a>';
  bar.innerHTML =
    '<div class="rl-footer-signup-inner">' +
      '<div class="rl-footer-signup-badge">' + (IS_ES ? magnet.badge_es : magnet.badge_en) + '</div>' +
      '<h4>' + heading + '</h4>' +
      '<p>' + desc + '</p>' +
      ctaBlock +
    '</div>';

  // Insert before footer or at end of body
  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');
  if (footer) {
    footer.parentNode.insertBefore(bar, footer);
  } else {
    document.body.appendChild(bar);
  }

  wireSignupForm(bar);
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
  var btnAttrs = '';

  var popup = document.createElement('div');
  popup.className = 'rl-slide-cta';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-label', IS_ES ? 'Recurso gratuito' : 'Free resource');
  var slideCta = emailCaptureEnabled(magnet)
    ? signupFormHtml()
    : '<a href="' + cta.url + '"' + btnAttrs + ' class="rl-slide-cta-btn">' + cta.text + '</a>';
  popup.innerHTML =
    '<button class="rl-slide-cta-close" aria-label="Close">&times;</button>' +
    '<div class="rl-slide-cta-badge">' + (IS_ES ? magnet.badge_es : magnet.badge_en) + '</div>' +
    '<h4>' + heading + '</h4>' +
    '<p>' + desc + '</p>' +
    slideCta +
    '<button class="rl-slide-cta-dismiss">' + dismissText + '</button>';

  document.body.appendChild(popup);

  wireSignupForm(popup);

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
 * Inserts a prominent eligibility-quiz block inside the page body, after
 * the intro/hero, to give research-traffic visitors a low-commitment offer
 * before they bounce. Only runs when getLeadMagnet() returns a magnet
 * with a link_url, on /act-60-tax-incentives.
 */
function injectInlineCTA() {
  if (!IS_ACT60_LANDING) return;
  if (document.querySelector('.rl-inline-magnet')) return;

  var magnet = getLeadMagnet();
  if (!magnet.link_url) return;
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

  var btnHtml = '<a href="' + cta.url + '" ' +
    'style="flex:0 0 auto;display:inline-block;padding:14px 24px;background:#bfa35d;color:#1a2033;' +
    'font-weight:700;font-size:.95rem;text-decoration:none;border-radius:8px;white-space:nowrap;' +
    'transition:transform .2s,box-shadow .2s;" ' +
    'onmouseenter="this.style.transform=\'translateY(-1px)\';this.style.boxShadow=\'0 6px 16px rgba(191,163,93,.35)\'" ' +
    'onmouseleave="this.style.transform=\'\';this.style.boxShadow=\'\'">' +
    cta.text + '</a>';

  box.innerHTML =
    '<div style="flex:1 1 320px;min-width:0;">' + badgeHtml + headHtml + descHtml + '</div>' +
    btnHtml;

  /* Squarespace fluid-engine pages render the entire body inside a single
   * <section> containing a CSS-grid .fluid-engine div. Inserting a sibling
   * of fe-blocks inside the grid would break the grid-area layout, so we
   * insert the magnet INTO the .content wrapper, immediately after the
   * .fluid-engine. That puts it visually after the page body and before
   * the rl-crosslinks (which are appended to the same .content). */
  var content = document.querySelector('article .content-wrapper > .content') ||
                document.querySelector('article .content');
  if (!content) {
    var article = document.querySelector('article');
    if (article) article.insertBefore(box, article.firstChild);
    return;
  }
  var fluidEngine = content.querySelector('.fluid-engine');
  if (fluidEngine && fluidEngine.parentElement === content) {
    content.insertBefore(box, fluidEngine.nextSibling);
  } else {
    content.appendChild(box);
  }
}

/* ===== BOOT ===== */
function run() {
  try {
    injectFooterSignup();
    injectSlideInCTA();
    injectInlineCTA();
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
