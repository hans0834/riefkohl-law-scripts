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
var LEAD_MAGNETS = {
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
  /* Act 38-2026 / Act 60 pages */
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

function getLeadMagnet() {
  if (IS_CPA_REF) return LEAD_MAGNETS.cpa;
  if (IS_ACT60_PAGE) return LEAD_MAGNETS.act38;
  if (IS_HOMEPAGE) return LEAD_MAGNETS.premove;
  return LEAD_MAGNETS.default;
}

/* ===== FOOTER NEWSLETTER BAR (injected site-wide) ===== */
function injectFooterSignup() {
  if (document.querySelector('.rl-footer-signup')) return;

  // Disabled site-wide: no email provider configured yet, download doesn't exist
  return;

  var magnet = getLeadMagnet();
  var heading = IS_ES ? magnet.heading_es : magnet.heading_en;
  var desc = IS_ES ? magnet.desc_es : magnet.desc_en;
  var placeholder = IS_ES ? 'Su correo electrónico' : 'Your email address';
  var btnText = IS_ES ? magnet.btn_es : magnet.btn_en;
  var successText = IS_ES ? '¡Gracias! Revise su correo.' : 'Thank you! Check your inbox.';
  var privacyText = IS_ES
    ? 'Respetamos su privacidad. Cancele cuando quiera. <a href="/privacy-policy">Política de Privacidad</a>'
    : 'We respect your privacy. Unsubscribe anytime. <a href="/privacy-policy">Privacy Policy</a>';
  var badge = IS_ES ? magnet.badge_es : magnet.badge_en;

  var bar = document.createElement('div');
  bar.className = 'rl-footer-signup';
  bar.innerHTML =
    '<div class="rl-footer-signup-inner">' +
      '<div class="rl-footer-signup-badge">' + badge + '</div>' +
      '<h4>' + heading + '</h4>' +
      '<p>' + desc + '</p>' +
      '<form class="rl-signup-form" action="YOUR_FORM_ACTION_URL" method="POST">' +
        '<input type="email" name="email" class="rl-signup-input" placeholder="' + placeholder + '" required aria-label="' + placeholder + '">' +
        '<button type="submit" class="rl-signup-btn">' + btnText + '</button>' +
      '</form>' +
      '<div class="rl-signup-success">' + successText + '</div>' +
      '<p class="rl-signup-privacy">' + privacyText + '</p>' +
    '</div>';

  // Handle form submission: prevent blank page if action URL is not configured
  var form = bar.querySelector('.rl-signup-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      var action = form.getAttribute('action') || '';
      // If action is still the placeholder or empty, show success inline instead of navigating
      if (!action || action === 'YOUR_FORM_ACTION_URL' || action.indexOf('YOUR_') > -1) {
        e.preventDefault();
        var successDiv = bar.querySelector('.rl-signup-success');
        if (successDiv) {
          form.style.display = 'none';
          successDiv.style.display = 'block';
        }
        return;
      }
      // If real action URL is set, submit via fetch to avoid page navigation
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      var formData = new FormData(form);
      fetch(action, { method: 'POST', body: formData, mode: 'no-cors' })
        .then(function() {
          form.style.display = 'none';
          var successDiv = bar.querySelector('.rl-signup-success');
          if (successDiv) successDiv.style.display = 'block';
        })
        .catch(function() {
          // On error, show success anyway (no-cors won't return status)
          form.style.display = 'none';
          var successDiv = bar.querySelector('.rl-signup-success');
          if (successDiv) successDiv.style.display = 'block';
        });
    });
  }

  // Insert before footer or at end of body
  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');
  if (footer) {
    footer.parentNode.insertBefore(bar, footer);
  } else {
    document.body.appendChild(bar);
  }

  // Handle form submission — redirect to booking page until email provider is configured
  var form = bar.querySelector('.rl-signup-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      var action = form.getAttribute('action') || '';
      // If the form action is still the placeholder, handle gracefully
      if (action === 'YOUR_FORM_ACTION_URL' || action === '' || action === '#') {
        e.preventDefault();
        var emailInput = form.querySelector('.rl-signup-input');
        var email = emailInput ? emailInput.value : '';
        // Show success message
        var successEl = bar.querySelector('.rl-signup-success');
        if (successEl) {
          successEl.style.display = 'block';
          successEl.textContent = IS_ES
            ? '\u00A1Gracias por su inter\u00E9s! Agende una consulta gratuita para recibir su gu\u00EDa personalizada.'
            : 'Thanks for your interest! Book a free strategy call to get your personalized Act 60 guide.';
        }
        form.style.display = 'none';
        // After a brief pause, redirect to booking
        var bookUrl = IS_ES ? '/espanol-cita' : '/calendly';
        setTimeout(function() {
          window.location.href = bookUrl + (email ? '?email=' + encodeURIComponent(email) : '');
        }, 2500);
      }
      // If a real action URL is configured, let the form submit normally
    });
  }
}

/* ===== BOOT ===== */
function run() {
  try {
    injectFooterSignup();
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
