/* Riefkohl Law — Google Tag Manager + Conversion Event Tracking */
/* Source: gtm-conversion-tracking.html */
/* SETUP: Replace GTM-XXXXXXX with your GTM Container ID */

/* Google Tag Manager */
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');

/* Conversion Event Tracking */
(function(){
'use strict';

window.dataLayer = window.dataLayer || [];

/* ===== HELPER: Push event to both dataLayer (GTM) and gtag (GA4 direct) ===== */
function trackEvent(eventName, params) {
  params = params || {};

  // GTM dataLayer
  var dlEvent = { event: eventName };
  for (var key in params) {
    if (params.hasOwnProperty(key)) dlEvent[key] = params[key];
  }
  window.dataLayer.push(dlEvent);

  // GA4 gtag (if loaded directly — works as fallback)
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

/* ===== TRACK CLICKS ON CONVERSION ELEMENTS ===== */
function setupClickTracking() {
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var text = (link.textContent || '').trim().substring(0, 60);

    // 1. Phone call clicks
    if (href.indexOf('tel:') === 0) {
      trackEvent('phone_call_click', {
        event_category: 'conversion',
        event_label: text,
        link_url: href,
        page_path: window.location.pathname
      });
      return;
    }

    // 2. Calendly / booking clicks
    if (href === '/calendly' || href === '/espanol-cita' || href === '/book-an-appointment') {
      trackEvent('booking_click', {
        event_category: 'conversion',
        event_label: text,
        link_url: href,
        page_path: window.location.pathname
      });
      return;
    }

    // 3. Contact page clicks
    if (href === '/contact' || href === '/espanol-contacto') {
      trackEvent('contact_click', {
        event_category: 'conversion',
        event_label: text,
        link_url: href,
        page_path: window.location.pathname
      });
      return;
    }

    // 4. Email signup CTA clicks (if link points to signup)
    if (href.indexOf('#rl-') === 0 && href.indexOf('signup') > -1) {
      trackEvent('email_signup_click', {
        event_category: 'engagement',
        event_label: text,
        page_path: window.location.pathname
      });
      return;
    }
  });

  // 5. Email form submissions
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (form.classList.contains('rl-signup-form')) {
      trackEvent('email_signup_submit', {
        event_category: 'conversion',
        event_label: form.closest('.rl-footer-signup') ? 'footer_newsletter' : 'inline_lead_magnet',
        page_path: window.location.pathname
      });
    }
  });
}

/* ===== TRACK SCROLL DEPTH (for content engagement) ===== */
function setupScrollTracking() {
  var thresholds = [25, 50, 75, 90];
  var fired = {};

  function checkScroll() {
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    var pct = Math.round((window.scrollY / scrollHeight) * 100);

    for (var i = 0; i < thresholds.length; i++) {
      var t = thresholds[i];
      if (pct >= t && !fired[t]) {
        fired[t] = true;
        trackEvent('scroll_depth', {
          event_category: 'engagement',
          event_label: t + '%',
          scroll_pct: t,
          page_path: window.location.pathname
        });
      }
    }
  }

  var scrollTimer;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(checkScroll, 200);
  }, { passive: true });
}

/* ===== TRACK TIME ON PAGE (engagement quality signal) ===== */
function setupTimeTracking() {
  var intervals = [30, 60, 120, 300]; // seconds
  var firedTime = {};

  intervals.forEach(function(sec) {
    setTimeout(function() {
      if (document.visibilityState !== 'hidden') {
        firedTime[sec] = true;
        trackEvent('time_on_page', {
          event_category: 'engagement',
          event_label: sec + 's',
          time_seconds: sec,
          page_path: window.location.pathname
        });
      }
    }, sec * 1000);
  });
}

/* ===== TRACK CALENDLY PAGE VIEW (conversion funnel) ===== */
function trackCalendlyPageView() {
  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/calendly' || path === '/espanol-cita') {
    trackEvent('booking_page_view', {
      event_category: 'conversion',
      event_label: path,
      page_path: path
    });
  }
}

/* ===== BOOT ===== */
function run() {
  try {
    setupClickTracking();
    setupScrollTracking();
    setupTimeTracking();
    trackCalendlyPageView();
  } catch(e) {
    console.error('[rl-tracking]', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}

})();
