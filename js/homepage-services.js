// Riefkohl Law — Homepage & Services Visual Redesign
// DEPLOY: Squarespace → Settings → Advanced → Code Injection → Header
// Must load AFTER seo-fixes.html

(function(){
'use strict';

var PATH = window.location.pathname.replace(/\/+$/, '') || '/';

/* ===== UTILITY FUNCTIONS ===== */
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function el(tag, cls, html) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

/* ===== PRACTICE AREA URL MAP ===== */
var PA_URLS = {
  'Business Formation': '/business-formation',
  'Corporate & Transactional': '/services',
  'Government Contracts': '/government-contracts',
  'Bankruptcy & Restructuring': '/services',
  'Estate Planning': '/estate-planning',
  'Puerto Rico Trusts': '/puerto-rico-trusts',
  'Puerto Rico Tax Incentives': '/act-60-tax-incentives',
  'PR Tax Incentives': '/act-60-tax-incentives'
};

function getUrl(title) {
  for (var key in PA_URLS) {
    if (title.indexOf(key) > -1) return PA_URLS[key];
  }
  return '/services';
}

/* ===== SVG ICONS FOR DIFFERENTIATORS ===== */
var DIFF_ICONS = {
  'Transparent': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
  'Technology': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  'Institutional': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  'Bilingual': '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>'
};

function getIcon(title) {
  for (var key in DIFF_ICONS) {
    if (title.indexOf(key) > -1) return DIFF_ICONS[key];
  }
  return DIFF_ICONS['Institutional'];
}

/* ================================================================
   HOMEPAGE TRANSFORMS
   ================================================================ */
function transformHomepage() {
  var sec = qs('section[data-section-id="691dfd7a116174c90f703d1e"]');
  if (!sec) return;
  var block = qs('.fe-block-691dfd7aa94c1b098b7524ef', sec);
  if (!block) return;
  var htmlDiv = qs('.sqs-html-content', block);
  if (!htmlDiv) return;

  transformHero(htmlDiv, sec);
  transformPracticeAreas(htmlDiv);
  transformDifferentiators(htmlDiv);
  transformCtaSection(htmlDiv);
}

/* ----- Hero ----- */
function transformHero(htmlDiv, sec) {
  if (qs('.rl-rd-hero')) return;
  var kids = Array.from(htmlDiv.children);
  var h1 = qs('h1', htmlDiv);
  if (!h1) return;

  // Find subtitle paragraph (index 1)
  var subtitle = null;
  for (var i = 0; i < kids.length; i++) {
    if (kids[i] === h1) {
      // Next non-empty P is the subtitle
      for (var j = i + 1; j < kids.length; j++) {
        if (kids[j].tagName === 'P' && kids[j].textContent.trim().length > 20) {
          subtitle = kids[j];
          break;
        }
        if (kids[j].tagName === 'H2') break;
      }
      break;
    }
  }

  // Create hero wrapper
  var hero = el('div', 'rl-rd-hero');
  var heroH1 = el('h1', '', h1.textContent.trim());
  hero.appendChild(heroH1);

  if (subtitle) {
    var heroP = el('p', '', subtitle.textContent.trim());
    hero.appendChild(heroP);
  }

  // Add CTA button
  var ctaLink = el('a', 'rl-rd-cta-btn');
  ctaLink.href = '/calendly';
  ctaLink.textContent = 'Book Your Free Strategy Call';
  hero.appendChild(ctaLink);

  // Hide original elements
  h1.style.display = 'none';
  if (subtitle) subtitle.style.display = 'none';

  // Hide the duplicate text link "Book Your Free Strategy Call →"
  for (var k = 0; k < kids.length; k++) {
    var kid = kids[k];
    if (kid.tagName === 'P' && kid.textContent.trim().indexOf('Book Your Free Strategy Call') > -1) {
      kid.style.display = 'none';
    }
  }

  // Hide original Squarespace button block
  var btnBlock = qs('.fe-block-691dfd7af6b4223c1c4baa57', sec);
  if (btnBlock) btnBlock.style.display = 'none';
  var btnBlock2 = qs('.fe-block-691dfd7aeb32c5baec0410c3', sec);
  if (btnBlock2) btnBlock2.style.display = 'none';

  // Insert hero at the top
  htmlDiv.insertBefore(hero, htmlDiv.firstChild);
}

/* ----- Practice Areas Card Grid ----- */
function transformPracticeAreas(htmlDiv) {
  if (qs('.rl-rd-cards-grid')) return;

  var kids = Array.from(htmlDiv.children);
  var practiceH2 = null;
  var diffH2 = null;

  // Find "Practice Areas" H2 and "The Riefkohl Law Difference" H2
  for (var i = 0; i < kids.length; i++) {
    var txt = kids[i].textContent.trim();
    if (kids[i].tagName === 'H2' && txt === 'Practice Areas') practiceH2 = kids[i];
    if (kids[i].tagName === 'H2' && txt.indexOf('Riefkohl Law Difference') > -1) diffH2 = kids[i];
  }
  if (!practiceH2) return;

  // Collect all H3s between practiceH2 and diffH2
  var startIdx = kids.indexOf(practiceH2);
  var endIdx = diffH2 ? kids.indexOf(diffH2) : kids.length;
  var currentCategory = '';
  var practiceAreas = [];

  for (var j = startIdx + 1; j < endIdx; j++) {
    var child = kids[j];
    if (child.tagName !== 'H3') continue;
    var text = child.textContent.trim();
    if (!text) continue;

    // Check if this is a category header (no em-dash)
    if (text.indexOf('\u2014') === -1 && text.indexOf('—') === -1 && text.indexOf(' - ') === -1) {
      currentCategory = text;
      continue;
    }

    // Parse title — description
    var parts = text.split(/\s*[\u2014—]\s*/);
    var title = parts[0].trim();
    var desc = parts.length > 1 ? parts.slice(1).join(' — ').trim() : '';

    practiceAreas.push({
      category: currentCategory,
      title: title,
      desc: desc,
      url: getUrl(title)
    });
  }

  if (practiceAreas.length === 0) return;

  // Build the section heading
  var sectionHeading = el('h2', 'rl-rd-section-heading', 'Practice Areas');

  // Build card grid
  var grid = el('div', 'rl-rd-cards-grid');
  practiceAreas.forEach(function(pa) {
    var card = el('a', 'rl-rd-card');
    card.href = pa.url;
    card.innerHTML =
      '<div class="rl-rd-card-cat">' + escHtml(pa.category) + '</div>' +
      '<h3>' + escHtml(pa.title) + '</h3>' +
      '<p>' + escHtml(pa.desc) + '</p>' +
      '<span class="rl-rd-card-arrow">\u2192</span>';
    grid.appendChild(card);
  });

  // Hide originals
  practiceH2.style.display = 'none';
  for (var k = startIdx + 1; k < endIdx; k++) {
    kids[k].style.display = 'none';
  }

  // Insert after hidden practice H2
  practiceH2.parentNode.insertBefore(grid, practiceH2.nextSibling);
  practiceH2.parentNode.insertBefore(sectionHeading, grid);
}

/* ----- Differentiators Grid ----- */
function transformDifferentiators(htmlDiv) {
  if (qs('.rl-rd-diff-grid')) return;

  var kids = Array.from(htmlDiv.children);
  var diffH2 = null;
  var readyH2 = null;

  for (var i = 0; i < kids.length; i++) {
    var txt = kids[i].textContent.trim();
    if (kids[i].tagName === 'H2' && txt.indexOf('Riefkohl Law Difference') > -1) diffH2 = kids[i];
    if (kids[i].tagName === 'H2' && txt.indexOf('Ready to Move Forward') > -1) readyH2 = kids[i];
  }
  if (!diffH2) return;

  var startIdx = kids.indexOf(diffH2);
  var endIdx = readyH2 ? kids.indexOf(readyH2) : kids.length;

  // Collect differentiator paragraphs
  var diffs = [];
  for (var j = startIdx + 1; j < endIdx; j++) {
    var child = kids[j];
    if (child.tagName !== 'P') continue;
    var text = child.textContent.trim();
    if (text.length < 10) continue;

    // Parse "Title — Description"
    var parts = text.split(/\s*[\u2014—]\s*/);
    if (parts.length >= 2) {
      diffs.push({
        title: parts[0].trim(),
        desc: parts.slice(1).join(' — ').trim()
      });
    }
  }

  if (diffs.length === 0) return;

  // Build section heading
  var heading = el('h2', 'rl-rd-section-heading', 'The Riefkohl Law Difference');

  // Build grid
  var grid = el('div', 'rl-rd-diff-grid');
  diffs.forEach(function(d) {
    var item = el('div', 'rl-rd-diff-item');
    item.innerHTML =
      '<span class="rl-rd-diff-icon">' + getIcon(d.title) + '</span>' +
      '<h4>' + escHtml(d.title) + '</h4>' +
      '<p>' + escHtml(d.desc) + '</p>';
    grid.appendChild(item);
  });

  // Hide originals
  diffH2.style.display = 'none';
  for (var k = startIdx + 1; k < endIdx; k++) {
    kids[k].style.display = 'none';
  }

  diffH2.parentNode.insertBefore(grid, diffH2.nextSibling);
  diffH2.parentNode.insertBefore(heading, grid);
}

/* ----- CTA Section ----- */
function transformCtaSection(htmlDiv) {
  if (qs('.rl-rd-cta-section')) return;

  var kids = Array.from(htmlDiv.children);
  var readyH2 = null;

  for (var i = 0; i < kids.length; i++) {
    if (kids[i].tagName === 'H2' && kids[i].textContent.trim().indexOf('Ready to Move Forward') > -1) {
      readyH2 = kids[i];
      break;
    }
  }
  if (!readyH2) return;

  var startIdx = kids.indexOf(readyH2);

  // Find the description paragraph
  var descText = '';
  for (var j = startIdx + 1; j < kids.length; j++) {
    var txt = kids[j].textContent.trim();
    if (kids[j].tagName === 'P' && txt.length > 20) {
      descText = txt;
      break;
    }
  }

  // Build CTA section
  var cta = el('div', 'rl-rd-cta-section');
  cta.innerHTML =
    '<h2 style="color:#fff !important">Ready to Move Forward?</h2>' +
    '<p style="color:rgba(255,255,255,.75) !important">' + escHtml(descText) + '</p>' +
    '<a class="rl-rd-cta-btn" href="/calendly">Book Your Free Strategy Call</a>';

  // Hide originals from readyH2 onward
  for (var k = startIdx; k < kids.length; k++) {
    kids[k].style.display = 'none';
  }

  htmlDiv.appendChild(cta);
}

/* ================================================================
   SERVICES PAGE TRANSFORMS
   ================================================================ */
function transformServices() {
  var block = document.getElementById('block-yui_3_17_2_1_1690554311311_3753') || qs('[data-block-id="yui_3_17_2_1_1690554311311_3753"]');
  if (!block) return;
  var htmlDiv = qs('.sqs-html-content', block);
  if (!htmlDiv) return;

  transformServicesHero(htmlDiv);
  transformTrustPricing(htmlDiv);
  transformServiceCategories(htmlDiv);
  transformServicesDisclaimer(htmlDiv);
}

/* ----- Services Hero ----- */
function transformServicesHero(htmlDiv) {
  if (qs('.rl-rd-page-hero')) return;

  var kids = Array.from(htmlDiv.children);
  // H2: "Sophisticated Legal Counsel. Transparent Pricing."
  var heroH2 = kids[0];
  if (!heroH2 || heroH2.tagName !== 'H2') return;

  // Next P is the description (index 1)
  var descP = kids[1];
  var descText = descP ? descP.textContent.trim() : '';

  // Build hero
  var hero = el('div', 'rl-rd-page-hero');
  hero.innerHTML =
    '<h2>' + escHtml(heroH2.textContent.trim()) + '</h2>' +
    '<p>' + escHtml(descText) + '</p>' +
    '<a class="rl-rd-cta-btn" href="/calendly">Book Your Free Strategy Call</a>';

  // Hide originals (hero H2, desc, empty P, H4 CTA, practice areas list, empty Ps)
  for (var i = 0; i <= 7; i++) {
    if (kids[i]) kids[i].style.display = 'none';
  }

  // Add services-page class for scoped styling
  htmlDiv.classList.add('rl-rd-services-page');

  htmlDiv.insertBefore(hero, htmlDiv.firstChild);
}

/* ----- Trust Pricing Tiers ----- */
function transformTrustPricing(htmlDiv) {
  if (qs('.rl-rd-tier-grid')) return;

  var kids = Array.from(htmlDiv.children);

  // Find "Estate Planning & Puerto Rico Trusts" (P at index 8)
  var trustHeaderIdx = -1;
  for (var i = 0; i < kids.length; i++) {
    if (kids[i].textContent.trim() === 'Estate Planning & Puerto Rico Trusts') {
      trustHeaderIdx = i;
      break;
    }
  }
  if (trustHeaderIdx === -1) return;

  // Parse tiers: look for H3s starting with "Tier"
  var tiers = [];
  var currentTier = null;

  for (var j = trustHeaderIdx; j < kids.length; j++) {
    var child = kids[j];
    var text = child.textContent.trim();

    // Stop when we hit non-trust content
    if (text.indexOf('Business Formation') > -1 && child.tagName === 'P' && tiers.length > 0) break;
    if (text === 'Not sure which trust structure is right for you? Schedule a consultation and we will help you determine the best fit.') {
      // This is the consultation note after tiers
      child.style.display = 'none';
      continue;
    }

    if (child.tagName === 'H3' && text.indexOf('Tier') > -1) {
      // New tier
      if (currentTier) tiers.push(currentTier);
      // Parse "Tier N: Name"
      var tierParts = text.split(':');
      currentTier = {
        label: tierParts[0].trim(),
        name: tierParts.length > 1 ? tierParts[1].trim() : text,
        price: '',
        includes: [],
        excludes: []
      };
      child.style.display = 'none';
      continue;
    }

    if (currentTier) {
      // Price line (e.g., "$7,500 - $12,000")
      if (child.tagName === 'P' && text.match(/^\$[\d,]+/)) {
        currentTier.price = text;
        child.style.display = 'none';
        continue;
      }
      // "Includes:" or "Includes everything in Tier X, plus:" or "For:"
      if (child.tagName === 'P' && (text.indexOf('Includes') > -1 || text === 'For:')) {
        child.style.display = 'none';
        continue;
      }
      // "Excludes:" label
      if (child.tagName === 'P' && text === 'Excludes:') {
        child.style.display = 'none';
        continue;
      }
      // UL with items
      if (child.tagName === 'UL') {
        var items = qsa('li', child);
        items.forEach(function(li) {
          currentTier.includes.push(li.textContent.trim());
        });
        child.style.display = 'none';
        continue;
      }
      // Empty paragraphs
      if (child.tagName === 'P' && text.length === 0) {
        child.style.display = 'none';
        continue;
      }
    }
  }
  if (currentTier) tiers.push(currentTier);
  if (tiers.length === 0) return;

  // Hide the trust header and the H1 above it
  kids[trustHeaderIdx].style.display = 'none';
  // Also hide the H1 "Puerto Rico Legal Services & Transparent Pricing"
  for (var h = 0; h < kids.length; h++) {
    if (kids[h].tagName === 'H1') {
      kids[h].style.display = 'none';
      break;
    }
  }

  // Build section heading
  var heading = el('h2', 'rl-rd-section-heading', 'Estate Planning & Puerto Rico Trusts');

  // Build tier grid
  var grid = el('div', 'rl-rd-tier-grid');
  tiers.forEach(function(tier, idx) {
    var card = el('div', 'rl-rd-tier-card' + (idx === 1 ? ' rl-rd-popular' : ''));
    var maxItems = idx < 2 ? 5 : 4; // Show fewer items on higher tiers to keep cards balanced
    var displayItems = tier.includes.slice(0, maxItems);
    var moreCount = tier.includes.length - maxItems;

    var html = '';
    if (idx === 1) html += '<div class="rl-rd-popular-badge">Most Popular</div>';
    html += '<div class="rl-rd-tier-label">' + escHtml(tier.label) + '</div>';
    html += '<h3>' + escHtml(tier.name) + '</h3>';
    // Extract low end of price range, reduce by 75%, show as "From $X"
    var priceDisplay = tier.price;
    var pm = tier.price.match(/\$([\d,]+)/);
    if (pm) {
      var low = parseInt(pm[1].replace(/,/g, ''), 10);
      var reduced = Math.round(low * 0.25);
      priceDisplay = 'From $' + reduced.toLocaleString();
    }
    html += '<div class="rl-rd-price">' + escHtml(priceDisplay) + '</div>';
    html += '<ul>';
    displayItems.forEach(function(item) {
      html += '<li>' + escHtml(item) + '</li>';
    });
    if (moreCount > 0) {
      html += '<li style="color:var(--rl-gold-dark);font-weight:600">+ ' + moreCount + ' more included</li>';
    }
    html += '</ul>';
    html += '<a class="rl-rd-tier-cta" href="/calendly">Get Started</a>';

    card.innerHTML = html;
    grid.appendChild(card);
  });

  // Insert after trust header area
  var insertPoint = kids[trustHeaderIdx];
  insertPoint.parentNode.insertBefore(grid, insertPoint.nextSibling);
  insertPoint.parentNode.insertBefore(heading, grid);
}

/* ----- Service Categories (Non-Trust) ----- */
function transformServiceCategories(htmlDiv) {
  if (qs('.rl-rd-svc-section')) return;

  var kids = Array.from(htmlDiv.children);

  // Define the service categories to parse
  var categories = [
    { name: 'Business Formation & Corporate Services', startText: 'Business Formation & Corporate Services' },
    { name: 'Corporate & Transactional Services', startText: 'Corporate & Transactional Services' },
    { name: 'Bankruptcy & Insolvency Law', startText: 'Bankruptcy & Insolvency Law' },
    { name: 'Commercial Litigation', startText: 'Commercial Litigation' }
  ];

  categories.forEach(function(cat) {
    transformServiceCategory(htmlDiv, kids, cat);
  });
}

function transformServiceCategory(htmlDiv, kids, cat) {
  // Find the category header
  var headerIdx = -1;
  for (var i = 0; i < kids.length; i++) {
    var txt = kids[i].textContent.trim().replace(/:$/, '');
    if (txt === cat.startText || txt === cat.name) {
      headerIdx = i;
      break;
    }
  }
  if (headerIdx === -1) return;

  // Parse services until we hit next category or CTA
  var services = [];
  var currentService = null;
  var endKeywords = ['Business Formation', 'Corporate & Transactional', 'Bankruptcy', 'Commercial Litigation', 'Ready to Discuss', 'Explore Our'];

  for (var j = headerIdx + 1; j < kids.length; j++) {
    var child = kids[j];
    var text = child.textContent.trim();

    // Check if we've hit the next category
    var isEnd = false;
    for (var e = 0; e < endKeywords.length; e++) {
      if (text.indexOf(endKeywords[e]) === 0 && text !== cat.startText && j !== headerIdx) {
        isEnd = true;
        break;
      }
    }
    if (isEnd) break;

    // Service line: "Service Name — Starting at $X" or "Service Name — Custom Pricing"
    if (child.tagName === 'P' && text.length > 10 && (text.indexOf('Starting at') > -1 || text.indexOf('Custom Pricing') > -1)) {
      if (currentService) services.push(currentService);
      var parts = text.split(/\s*[\u2014—]\s*/);
      var price = '';
      var name = parts[0].trim();
      if (parts.length > 1) {
        price = parts[1].trim();
      }
      currentService = { name: name, price: price, desc: '' };
      child.style.display = 'none';
      continue;
    }

    // Description line starting with "Includes:"
    if (currentService && child.tagName === 'P' && text.indexOf('Includes:') > -1) {
      currentService.desc = text.replace('Includes: ', '').replace('Includes:', '').trim();
      child.style.display = 'none';
      continue;
    }

    // For litigation items (start with -)
    if (cat.name === 'Commercial Litigation' && child.tagName === 'P' && text.charAt(0) === '-') {
      var litParts = text.substring(1).split(':');
      if (currentService === null) {
        // Create a litigation service
      }
      services.push({
        name: litParts[0].trim(),
        price: '',
        desc: litParts.length > 1 ? litParts[1].trim() : ''
      });
      child.style.display = 'none';
      continue;
    }

    // Intro/outro paragraphs for the category
    if (child.tagName === 'P' && text.length > 20 && !currentService) {
      // Category description
      child.style.display = 'none';
      continue;
    }

    // Empty P
    if (child.tagName === 'P' && text.length === 0) {
      child.style.display = 'none';
      continue;
    }

    // CTA-style paragraphs
    if (child.tagName === 'P' && (text.indexOf('Schedule a consultation') > -1 ||
        text.indexOf('Let us help') > -1 || text.indexOf('Starting a new venture') > -1 ||
        text.indexOf('Need help') > -1)) {
      child.style.display = 'none';
      continue;
    }

    // Resource links
    if (child.tagName === 'P' && text.indexOf('Explore Our') > -1) {
      child.style.display = 'none';
      continue;
    }
  }
  if (currentService) services.push(currentService);

  // Hide the category header
  kids[headerIdx].style.display = 'none';

  if (services.length === 0) return;

  // Build section
  var section = el('div', 'rl-rd-svc-section');
  section.innerHTML = '<h3 class="rl-rd-svc-section-title">' + escHtml(cat.name) + '</h3>';

  var grid = el('div', 'rl-rd-svc-grid');
  services.forEach(function(svc) {
    var card = el('div', 'rl-rd-svc-card');
    var html = '<h4>' + escHtml(svc.name) + '</h4>';
    if (svc.price) {
      html += '<span class="rl-rd-svc-price-badge">' + escHtml(svc.price) + '</span>';
    }
    if (svc.desc) {
      html += '<p>' + escHtml(svc.desc) + '</p>';
    }
    card.innerHTML = html;
    grid.appendChild(card);
  });
  section.appendChild(grid);

  // Insert after the hidden header
  kids[headerIdx].parentNode.insertBefore(section, kids[headerIdx].nextSibling);
}

/* ----- Services Disclaimer ----- */
function transformServicesDisclaimer(htmlDiv) {
  if (qs('.rl-rd-disclaimer')) return;
  var kids = Array.from(htmlDiv.children);

  // Find H4 "Ready to Discuss" and the disclaimer text
  for (var i = kids.length - 1; i >= 0; i--) {
    var child = kids[i];
    var text = child.textContent.trim();

    // CTA H4
    if (child.tagName === 'H4' && text.indexOf('Ready to Discuss') > -1) {
      // Replace with styled CTA
      var cta = el('div', 'rl-rd-cta-section');
      cta.style.maxWidth = '800px';
      cta.innerHTML =
        '<h2 style="color:#fff !important">Ready to Discuss Your Legal Matter?</h2>' +
        '<a class="rl-rd-cta-btn" href="/calendly">Book Your Free Strategy Call</a>';
      child.style.display = 'none';
      child.parentNode.insertBefore(cta, child.nextSibling);
      continue;
    }

    // Disclaimer paragraph
    if (child.tagName === 'P' && text.indexOf('Riefkohl Law is a trade name') > -1) {
      var disc = el('div', 'rl-rd-disclaimer', escHtml(text));
      child.style.display = 'none';
      child.parentNode.insertBefore(disc, child.nextSibling);
      continue;
    }
  }
}

/* ===== HTML ESCAPING ===== */
function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ===== PRACTICE AREA SUBPAGES ===== */
var PRACTICE_PAGES = [
  '/government-contracts',
  '/business-formation',
  '/estate-planning',
  '/puerto-rico-trusts',
  '/act-60-tax-incentives'
];

function transformPracticePage() {
  document.body.classList.add('rl-rd-practice-page');
}

/* ===== BOOT SEQUENCE ===== */
function run() {
  try {
    if (PATH === '/') {
      transformHomepage();
    } else if (PATH === '/services') {
      transformServices();
    } else if (PRACTICE_PAGES.indexOf(PATH) > -1) {
      transformPracticePage();
    }
  } catch(e) {
    console.error('[rl-redesign]', e);
  }
}

function boot() {
  run();
  setTimeout(run, 500);
  setTimeout(run, 1500);
  setTimeout(run, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
window.addEventListener('load', run);

})();
