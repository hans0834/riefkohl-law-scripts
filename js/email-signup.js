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

  // Don't show on calendly/booking pages
  if (PATH === '/calendly' || PATH === '/espanol-cita') return;

  var heading = IS_ES
    ? 'Manténgase Informado sobre la Ley de Puerto Rico'
    : 'Stay Updated on Puerto Rico Law';
  var desc = IS_ES
    ? 'Reciba análisis legal sobre fideicomisos, planificación patrimonial y Ley 60 directamente en su bandeja de entrada.'
    : 'Get legal insights on trusts, estate planning, and Act 60 delivered to your inbox.';
  var placeholder = IS_ES ? 'Su correo electrónico' : 'Your email address';
  var btnText = IS_ES ? 'Suscribirse' : 'Subscribe';
  var successText = IS_ES ? '¡Gracias! Revise su correo.' : 'Thank you! Check your inbox.';
  var privacyText = IS_ES
    ? 'Respetamos su privacidad. Cancele cuando quiera. <a href="/privacy-policy">Política de Privacidad</a>'
    : 'We respect your privacy. Unsubscribe anytime. <a href="/privacy-policy">Privacy Policy</a>';
  var badge = IS_ES ? 'Boletín Legal' : 'Legal Newsletter';

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

  // Insert before footer or at end of body
  var footer = document.querySelector('footer') || document.querySelector('.footer-inside');
  if (footer) {
    footer.parentNode.insertBefore(bar, footer);
  } else {
    document.body.appendChild(bar);
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
