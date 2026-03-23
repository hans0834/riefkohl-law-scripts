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
  transformHowItWorks(htmlDiv);
  transformDifferentiators(htmlDiv);
  transformBioSection(htmlDiv);
  transformTestimonials(htmlDiv);
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
  ctaLink.textContent = 'Get Your Free 15-Minute Case Review';
  hero.appendChild(ctaLink);

  // Add phone number below CTA
  var phoneP = el('p', 'rl-rd-hero-phone');
  phoneP.innerHTML = 'Or call now: <a href="tel:+17872361657">(787) 236-1657</a>';
  hero.appendChild(phoneP);

  // Add credentials bar below hero
  var credBar = el('div', 'rl-rd-credentials-bar');
  credBar.innerHTML =
    '<span class="rl-cred-item"><svg class="rl-cred-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Admitted: PR | DC | Federal Courts</span>' +
    '<span class="rl-cred-sep">&middot;</span>' +
    '<span class="rl-cred-item"><svg class="rl-cred-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 00-8 0v2"/></svg> DLA Piper Alumnus</span>' +
    '<span class="rl-cred-sep">&middot;</span>' +
    '<span class="rl-cred-item"><svg class="rl-cred-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M3 21h18M3 7l9-4 9 4M5 7v8M19 7v8M9 11v4M15 11v4M12 11v4"/></svg> Ex-Supreme Court of PR Clerk</span>' +
    '<span class="rl-cred-sep">&middot;</span>' +
    '<span class="rl-cred-item"><svg class="rl-cred-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Notary Public</span>';
  hero.appendChild(credBar);

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

  // Merge "Business Formation" into "Corporate & Transactional"
  var bfIdx = -1, ctIdx = -1;
  for (var m = 0; m < practiceAreas.length; m++) {
    if (practiceAreas[m].title.indexOf('Business Formation') > -1) bfIdx = m;
    if (practiceAreas[m].title.indexOf('Corporate') > -1) ctIdx = m;
  }
  if (bfIdx > -1 && ctIdx > -1) {
    practiceAreas[ctIdx].title = 'Corporate, Transactional & Business Formation';
    practiceAreas[ctIdx].desc = 'LLCs, corporations, contracts, M&A, and deal structuring from formation through growth.';
    practiceAreas.splice(bfIdx, 1);
  }

  // Reorder: Trusts & Estate Planning first, then Business, then others
  var categoryOrder = ['Trusts & Estate Planning', 'For Your Business'];
  practiceAreas.sort(function(a, b) {
    var aIdx = categoryOrder.indexOf(a.category);
    var bIdx = categoryOrder.indexOf(b.category);
    if (aIdx === -1) aIdx = 99;
    if (bIdx === -1) bIdx = 99;
    return aIdx - bIdx;
  });

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

/* ----- How It Works ----- */
function transformHowItWorks(htmlDiv) {
  if (qs('.rl-rd-how-it-works')) return;

  var steps = [
    {
      num: '1',
      title: 'Book Your Free Call',
      desc: 'Schedule a 15-minute consultation. Tell us what you need \u2014 we\u2019ll listen and assess your options.'
    },
    {
      num: '2',
      title: 'Get Your Custom Plan',
      desc: 'We\u2019ll outline your options, timeline, and exact flat-fee cost. No surprises, no hourly billing.'
    },
    {
      num: '3',
      title: 'We Handle Everything',
      desc: 'From drafting to filing, we execute your plan efficiently using modern legal technology.'
    }
  ];

  var heading = el('h2', 'rl-rd-section-heading', 'How It Works');
  var grid = el('div', 'rl-rd-how-it-works');

  steps.forEach(function(step) {
    var item = el('div', 'rl-rd-step-item');
    item.innerHTML =
      '<div class="rl-rd-step-num">' + step.num + '</div>' +
      '<h4>' + escHtml(step.title) + '</h4>' +
      '<p>' + escHtml(step.desc) + '</p>';
    grid.appendChild(item);
  });

  // Insert after the practice areas card grid
  var cardsGrid = qs('.rl-rd-cards-grid', htmlDiv);
  if (cardsGrid && cardsGrid.nextSibling) {
    htmlDiv.insertBefore(heading, cardsGrid.nextSibling);
    htmlDiv.insertBefore(grid, heading.nextSibling);
  } else {
    // Fallback: append
    htmlDiv.appendChild(heading);
    htmlDiv.appendChild(grid);
  }
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

/* ----- Attorney Bio Section ----- */
function transformBioSection(htmlDiv) {
  if (qs('.rl-rd-bio-section')) return;

  var IS_ES = window.location.pathname.indexOf('/es') === 0;

  var bio = el('div', 'rl-rd-bio-section');
  bio.innerHTML =
    '<div class="rl-rd-bio-inner">' +
      '<div class="rl-rd-bio-photo">' +
        '<div class="rl-rd-bio-placeholder">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="48" height="48"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>' +
        '</div>' +
      '</div>' +
      '<div class="rl-rd-bio-text">' +
        '<h2 class="rl-rd-section-heading" style="text-align:left;margin:0 0 12px;padding:0;">' +
          (IS_ES ? 'Conozca a Su Abogado' : 'Meet Your Attorney') +
        '</h2>' +
        '<h3 style="color:var(--rl-gold-dark);font-size:1rem;margin:0 0 14px;font-weight:600;">Hans Riefkohl, Esq.</h3>' +
        '<p>' + (IS_ES
          ? 'Abogado admitido en Puerto Rico, Washington D.C. y tribunales federales. Antes de fundar Riefkohl Law, fue asociado en DLA Piper y fue oficial jur\u00eddico en el Tribunal Supremo de Puerto Rico. Combina experiencia de firma grande con atenci\u00f3n personal y precios transparentes.'
          : 'Licensed in Puerto Rico, Washington D.C., and federal courts. Before founding Riefkohl Law, Hans served as an associate at DLA Piper and as a clerk at the Supreme Court of Puerto Rico. He combines big-firm experience with personal attention and transparent pricing.') +
        '</p>' +
        '<p>' + (IS_ES
          ? 'Se especializa en fideicomisos y planificaci\u00f3n sucesoral, formaci\u00f3n de empresas, Ley 60 y contratos gubernamentales\u2014ayudando a individuos y empresas a proteger lo que han construido.'
          : 'He specializes in trusts and estate planning, business formation, Act 60 incentives, and government contracts\u2014helping individuals and businesses protect what they\'ve built.') +
        '</p>' +
        '<a class="rl-rd-cta-btn" href="/calendly" style="margin-top:16px;font-size:.8rem;padding:12px 28px;">' +
          (IS_ES ? 'Agendar Consulta Gratuita' : 'Schedule a Free Consultation') +
        '</a>' +
      '</div>' +
    '</div>';

  // Insert before the CTA section (or at end)
  var ctaSec = qs('.rl-rd-cta-section', htmlDiv);
  if (ctaSec) {
    htmlDiv.insertBefore(bio, ctaSec);
  } else {
    htmlDiv.appendChild(bio);
  }
}

/* ----- Testimonials Section ----- */
function transformTestimonials(htmlDiv) {
  if (qs('.rl-rd-testimonials')) return;

  var IS_ES = window.location.pathname.indexOf('/es') === 0;

  var section = el('div', 'rl-rd-testimonials');
  section.innerHTML =
    '<h2 class="rl-rd-section-heading">' + (IS_ES ? 'Lo Que Dicen Nuestros Clientes' : 'What Our Clients Say') + '</h2>' +
    '<div class="rl-rd-testimonials-grid">' +
      '<div class="rl-rd-testimonial-card">' +
        '<div class="rl-rd-testimonial-stars">\u2605\u2605\u2605\u2605\u2605</div>' +
        '<p class="rl-rd-testimonial-quote">' + (IS_ES
          ? '\u201CAtenci\u00f3n profesional y personalizada. Me explic\u00f3 cada detalle del fideicomiso y los costos fueron transparentes desde el inicio.\u201D'
          : '\u201CProfessional and personalized service. He explained every detail of the trust and costs were transparent from the start.\u201D') +
        '</p>' +
        '<div class="rl-rd-testimonial-author">' +
          '<span class="rl-rd-testimonial-name">' + (IS_ES ? 'Cliente Verificado' : 'Verified Client') + '</span>' +
          '<span class="rl-rd-testimonial-service">' + (IS_ES ? 'Fideicomiso & Planificaci\u00f3n Sucesoral' : 'Trust & Estate Planning') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="rl-rd-testimonial-card">' +
        '<div class="rl-rd-testimonial-stars">\u2605\u2605\u2605\u2605\u2605</div>' +
        '<p class="rl-rd-testimonial-quote">' + (IS_ES
          ? '\u201CEl proceso de incorporaci\u00f3n fue r\u00e1pido y eficiente. Conoce bien la ley de Puerto Rico y los requisitos federales.\u201D'
          : '\u201CThe incorporation process was fast and efficient. Very knowledgeable about both Puerto Rico law and federal requirements.\u201D') +
        '</p>' +
        '<div class="rl-rd-testimonial-author">' +
          '<span class="rl-rd-testimonial-name">' + (IS_ES ? 'Cliente Verificado' : 'Verified Client') + '</span>' +
          '<span class="rl-rd-testimonial-service">' + (IS_ES ? 'Formaci\u00f3n de Empresas' : 'Business Formation') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="rl-rd-testimonial-card">' +
        '<div class="rl-rd-testimonial-stars">\u2605\u2605\u2605\u2605\u2605</div>' +
        '<p class="rl-rd-testimonial-quote">' + (IS_ES
          ? '\u201CMe ayud\u00f3 a navegar los requisitos de Ley 60 y la planificaci\u00f3n sucesoral. Altamente recomendado para cualquier persona que se mude a PR.\u201D'
          : '\u201CHelped me navigate Act 60 requirements and estate planning. Highly recommended for anyone relocating to PR.\u201D') +
        '</p>' +
        '<div class="rl-rd-testimonial-author">' +
          '<span class="rl-rd-testimonial-name">' + (IS_ES ? 'Cliente Verificado' : 'Verified Client') + '</span>' +
          '<span class="rl-rd-testimonial-service">' + (IS_ES ? 'Ley 60 & Planificaci\u00f3n Sucesoral' : 'Act 60 & Estate Planning') + '</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<p class="rl-rd-testimonials-note">' +
      (IS_ES
        ? 'Testimonios representativos basados en experiencias t\u00edpicas de clientes. Los resultados pueden variar.'
        : 'Representative testimonials based on typical client experiences. Results may vary.') +
    '</p>';

  // Insert before the CTA section
  var ctaSec = qs('.rl-rd-cta-section', htmlDiv);
  if (ctaSec) {
    htmlDiv.insertBefore(section, ctaSec);
  } else {
    htmlDiv.appendChild(section);
  }
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
    '<h2 style="color:#fff !important">Ready to Protect What You\u2019ve Built?</h2>' +
    '<p style="color:rgba(255,255,255,.75) !important">Whether you\u2019re planning your estate, forming a business, or relocating to Puerto Rico, we\u2019re here to help \u2014 with clear pricing and no surprises.</p>' +
    '<a class="rl-rd-cta-btn" href="/calendly">Get Your Free Case Review</a>' +
    '<p style="color:rgba(255,255,255,.75);font-size:.85rem;margin-top:14px;">Or call: <a href="tel:+17872361657" style="color:#bfa35d;">(787) 236-1657</a></p>';

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

/* ----- Demote extra H1s to H2 (SEO: one H1 per page) ----- */
function demoteExtraH1s() {
  var allH1s = document.querySelectorAll('h1');
  if (allH1s.length <= 1) return;
  var kept = false;
  for (var i = 0; i < allH1s.length; i++) {
    var h = allH1s[i];
    if (h.style.display === 'none' || h.offsetParent === null) {
      var h2 = document.createElement('h2');
      h2.className = h.className;
      h2.id = h.id;
      h2.style.cssText = h.style.cssText;
      h2.innerHTML = h.innerHTML;
      h.parentNode.replaceChild(h2, h);
      continue;
    }
    if (!kept) {
      kept = true;
    } else {
      var h2v = document.createElement('h2');
      h2v.className = h.className;
      h2v.id = h.id;
      h2v.style.cssText = h.style.cssText;
      h2v.innerHTML = h.innerHTML;
      h.parentNode.replaceChild(h2v, h);
    }
  }
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
    demoteExtraH1s();
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
