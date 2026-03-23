/* Riefkohl Law — Auto-Injected Newsletter Bar + Blog Lead Magnets */
/* Source: email-signup-form.html */
/* NOTE: Replace YOUR_FORM_ACTION_URL with your email provider's form action URL */
/* RECOMMENDED: MailerLite (free up to 1,000 subscribers) */

(function(){
'use strict';

var PATH = window.location.pathname.replace(/\/+$/, '') || '/';
var IS_ES = PATH.indexOf('/espanol') === 0 || PATH.indexOf('/recursos-') === 0;

/* ===== FOOTER NEWSLETTER BAR (injected site-wide) ===== */
function injectFooterSignup() {
  if (document.querySelector('.rl-footer-signup')) return;

  // Disabled site-wide: no email provider configured yet, download doesn't exist
  return;

  var heading = IS_ES
    ? 'Descarga Gratuita: Lista de Verificación para Fideicomisos en Puerto Rico'
    : 'Free: Puerto Rico Trust Planning Checklist';
  var desc = IS_ES
    ? '7 pasos esenciales antes de reunirse con un abogado de planificación patrimonial. Obtenga la lista y reciba estrategias legales semanales sobre Puerto Rico.'
    : '7 essential steps to take before meeting with an estate planning attorney. Get the checklist and receive weekly Puerto Rico legal insights.';
  var placeholder = IS_ES ? 'Su correo electrónico' : 'Your email address';
  var btnText = IS_ES ? 'Obtener la Lista' : 'Get the Checklist';
  var successText = IS_ES ? '¡Gracias! Revise su correo.' : 'Thank you! Check your inbox.';
  var privacyText = IS_ES
    ? 'Respetamos su privacidad. Cancele cuando quiera. <a href="/privacy-policy">Política de Privacidad</a>'
    : 'We respect your privacy. Unsubscribe anytime. <a href="/privacy-policy">Privacy Policy</a>';
  var badge = IS_ES ? 'Guía Gratuita' : 'Free Download';

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
