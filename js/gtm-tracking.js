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

/* ===== UTM / REFERRAL ATTRIBUTION ===== */
function setupUtmTracking() {
  var params = new URLSearchParams(window.location.search);
  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref'];
  var hasUtm = false;
  var attribution = {};

  for (var i = 0; i < utmKeys.length; i++) {
    var val = params.get(utmKeys[i]);
    if (val) {
      attribution[utmKeys[i]] = val;
      hasUtm = true;
    }
  }

  if (!hasUtm) return;

  /* Persist in sessionStorage so attribution survives page navigation */
  try {
    sessionStorage.setItem('rl_attribution', JSON.stringify(attribution));
  } catch(e) { /* private browsing */ }

  /* Detect CPA referral (ref=cpa, ref=duffycpa, utm_source contains 'cpa', etc.) */
  var ref = (attribution.ref || '').toLowerCase();
  var source = (attribution.utm_source || '').toLowerCase();
  var isCpaReferral = ref.indexOf('cpa') > -1 || source.indexOf('cpa') > -1;

  /* Fire attribution event */
  trackEvent('referral_visit', {
    event_category: 'attribution',
    utm_source: attribution.utm_source || '',
    utm_medium: attribution.utm_medium || '',
    utm_campaign: attribution.utm_campaign || '',
    ref: attribution.ref || '',
    is_cpa_referral: isCpaReferral,
    page_path: window.location.pathname
  });

  if (isCpaReferral) {
    trackEvent('cpa_referral_visit', {
      event_category: 'attribution',
      event_label: ref || source,
      ref_partner: ref || source,
      page_path: window.location.pathname
    });
    /* Flag session for CPA-specific messaging */
    try {
      sessionStorage.setItem('rl_cpa_referral', ref || source);
    } catch(e) { /* private browsing */ }
  }
}

/* Helper: Get stored attribution data (for use by other scripts) */
window.rlGetAttribution = function() {
  try {
    var data = sessionStorage.getItem('rl_attribution');
    return data ? JSON.parse(data) : null;
  } catch(e) { return null; }
};

/* Helper: Check if current visitor is a CPA referral */
window.rlIsCpaReferral = function() {
  try {
    return !!sessionStorage.getItem('rl_cpa_referral');
  } catch(e) { return false; }
};

/* Helper: Get CPA partner name */
window.rlGetCpaPartner = function() {
  try {
    return sessionStorage.getItem('rl_cpa_referral') || '';
  } catch(e) { return ''; }
};

/* ===== TRACK OUTBOUND LINKS ===== */
function setupOutboundTracking() {
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';

    // Outbound links (not internal, not tel/mailto)
    if (href.indexOf('http') === 0 && href.indexOf('riefkohllaw.com') === -1 && href.indexOf('hans0834.github.io') === -1) {
      trackEvent('outbound_click', {
        event_category: 'engagement',
        event_label: href.substring(0, 100),
        link_text: (link.textContent || '').trim().substring(0, 50),
        page_path: window.location.pathname
      });
    }

    // WhatsApp clicks
    if (href.indexOf('wa.me') > -1 || href.indexOf('whatsapp') > -1) {
      trackEvent('whatsapp_click', {
        event_category: 'conversion',
        event_label: (link.textContent || '').trim().substring(0, 50),
        page_path: window.location.pathname
      });
    }

    // Exit-intent popup interactions
    if (link.closest('.rl-exit-popup')) {
      trackEvent('exit_intent_click', {
        event_category: 'conversion',
        event_label: href === '/calendly' || href === '/espanol-cita' ? 'book_consultation' : 'other',
        page_path: window.location.pathname
      });
    }
  });
}

/* ===== TRACK BLOG ENGAGEMENT ===== */
function setupBlogEngagement() {
  var path = window.location.pathname;
  if (path.indexOf('/blog/') !== 0) return;

  // Track TOC clicks
  document.addEventListener('click', function(e) {
    var link = e.target.closest('.rl-toc a');
    if (link) {
      trackEvent('toc_click', {
        event_category: 'engagement',
        event_label: (link.textContent || '').trim().substring(0, 60),
        page_path: path
      });
    }

    // Track related post clicks
    var relLink = e.target.closest('.rl-related-posts a');
    if (relLink) {
      trackEvent('related_post_click', {
        event_category: 'engagement',
        event_label: relLink.getAttribute('href') || '',
        page_path: path
      });
    }
  });

  // Track CTA engagement in blog posts
  document.addEventListener('click', function(e) {
    var ctaLink = e.target.closest('.rl-post-cta a');
    if (ctaLink) {
      trackEvent('blog_cta_click', {
        event_category: 'conversion',
        event_label: (ctaLink.textContent || '').trim().substring(0, 50),
        blog_slug: path.replace('/blog/', ''),
        page_path: path
      });
    }
  });
}

/* ===== BOOT ===== */
function run() {
  try {
    setupUtmTracking();
    setupClickTracking();
    setupOutboundTracking();
    setupScrollTracking();
    setupTimeTracking();
    trackCalendlyPageView();
    setupBlogEngagement();
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
