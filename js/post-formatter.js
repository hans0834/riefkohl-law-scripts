// Riefkohl Law — Blog Post Formatter
// Enhances blog posts with proper heading structure, styling, CTAs, and related posts
// Runs on individual blog post pages only
(function(){
  'use strict';

  // Only run on individual blog post pages (not the blog listing)
  var path = window.location.pathname;
  if (!/^\/blog\/[a-z0-9]/.test(path)) return;
  // Don't run on the blog listing page itself
  if (path === '/blog' || path === '/blog/') return;

  // Wait for DOM ready
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // Section headers to promote to H2 (case-insensitive match)
  var SECTION_HEADERS = [
    // English - case analysis structure
    'Relevant Facts',
    'Legal Issues',
    'Issues Presented',
    'Positions of the Parties',
    'Decision of the Court and Reasons',
    'Decision of the Court',
    'Decision by the Court',
    'Reasons for the Decision',
    "Court's Analysis",
    "The Court's Analysis",
    'Analysis',
    'Holding',
    'Background',
    'Practical Implications',
    'Key Takeaways',
    'The Bottom Line',
    'Significance',
    'Applicable Law',
    'Procedural History',
    'Conclusion',
    // Spanish equivalents
    'Hechos Relevantes',
    'Hechos pertinentes',
    'Cuestiones Legales',
    'Posiciones de las Partes',
    'Decisión del Tribunal',
    'Razones de la Decisión',
    'Análisis del Tribunal',
    'Implicaciones Prácticas',
    'Conclusión'
  ];

  // Build a lookup map (lowercase) for fast matching
  var headerMap = {};
  SECTION_HEADERS.forEach(function(h) {
    headerMap[h.toLowerCase()] = h;
  });

  // Context-aware CTA blocks based on post category
  var CTA_CONFIGS = {
    'trusts': {
      en: { h: 'Considering a Puerto Rico Trust?', p: 'Find out how a fideicomiso can protect your assets, reduce taxes, and bypass probate. Your first consultation is free \u2014 flat fee, no hourly billing.' },
      es: { h: '\u00bfConsidera un Fideicomiso en Puerto Rico?', p: 'Descubra c\u00f3mo un fideicomiso puede proteger sus activos, reducir impuestos y evitar la sucesi\u00f3n testamentaria. Su primera consulta es gratis.' }
    },
    'estate-planning': {
      en: { h: 'Is Your Estate Plan Ready for Puerto Rico?', p: 'Forced heirship rules mean your mainland estate plan may not work here. Get a free review with a PR-licensed attorney.' },
      es: { h: '\u00bfEst\u00e1 Listo Su Plan Sucesoral?', p: 'Las reglas de leg\u00edtima de Puerto Rico significan que su plan de la jurisdicci\u00f3n anterior podr\u00eda no funcionar aqu\u00ed. Obtenga una revisi\u00f3n gratuita.' }
    },
    'act-60': {
      en: { h: 'Act 60 Decree Holder? Protect Your Benefits.', p: 'Estate planning mistakes can put your Act 60 benefits at risk. Talk to an attorney who understands both the tax code and PR trust law.' },
      es: { h: '\u00bfTiene Decreto de Ley 60? Proteja Sus Beneficios.', p: 'Errores en la planificaci\u00f3n sucesoral pueden poner en riesgo sus beneficios de Ley 60. Hable con un abogado que entiende ambas \u00e1reas.' }
    },
    'default': {
      en: { h: 'Need Legal Guidance?', p: 'Get personalized advice from a DLA Piper\u2013trained attorney in San Juan. Your first consultation is free \u2014 flat fee, no surprises.' },
      es: { h: '\u00bfNecesita Asesor\u00eda Legal?', p: 'Obtenga asesoramiento personalizado de un abogado en San Juan. Su primera consulta es gratis \u2014 tarifa fija, sin sorpresas.' }
    }
  };

  function getPostCTA(category, isSpanish) {
    var cfg = CTA_CONFIGS[category] || CTA_CONFIGS['default'];
    var lang = isSpanish ? cfg.es : cfg.en;
    var btnText = isSpanish ? 'Agende Su Consulta Gratuita' : 'Book Your Free Consultation';
    var subText = isSpanish
      ? 'O ll\u00e1menos al <a href="tel:+17872361657">(787) 236-1657</a>'
      : 'Or call <a href="tel:+17872361657">(787) 236-1657</a>';
    return '<div class="rl-post-cta">' +
      '<h3>' + lang.h + '</h3>' +
      '<p>' + lang.p + '</p>' +
      '<a href="/calendly" class="rl-cta-btn">' + btnText + '</a>' +
      '<p class="rl-cta-sub">' + subText + '</p>' +
      '</div>';
  }

  // Fallback CTA for posts where category detection fails
  var CTA_EN = getPostCTA('default', false);
  var CTA_ES = getPostCTA('default', true);

  // Back to blog link
  var BACK_LINK = '<div class="rl-post-back">' +
    '<a href="/blog">&larr; Back to Blog</a>' +
    '</div>';

  var BACK_LINK_ES = '<div class="rl-post-back">' +
    '<a href="/blog">&larr; Volver al Blog</a>' +
    '</div>';

  /* ================================================
     RELATED POSTS — Cross-linking map
     ================================================
     Each category maps to a list of {url, title} objects.
     Posts link to others in the same category for SEO internal linking. */
  var RELATED_POSTS = {
    'trusts': [
      {url: '/blog/the-complete-guide-to-puerto-rico-trusts-under-law-219-2012', title: 'The Complete Guide to Puerto Rico Trusts Under Law 219-2012'},
      {url: '/blog/puerto-rico-asset-protection-how-irrevocable-trusts-shield-your-wealth', title: 'How Irrevocable Trusts Shield Your Wealth'},
      {url: '/blog/puerto-rico-trust-vs-will-which-do-you-need', title: 'Puerto Rico Trust vs. Will: Which Do You Need?'},
      {url: '/blog/banking-insurance-trust-disputes-puerto-rico', title: 'Banking & Insurance Trust Disputes in Puerto Rico'},
      {url: '/blog/breach-fiduciary-duty-trust-cases-puerto-rico', title: 'Breach of Fiduciary Duty Cases in Puerto Rico'},
      {url: '/blog/trust-validity-challenges-puerto-rico', title: 'Trust Validity Challenges in Puerto Rico'},
      {url: '/blog/trust-property-disputes-puerto-rico', title: 'Trust Property Disputes in Puerto Rico'},
      {url: '/blog/family-law-trusts-trustee-removal-puerto-rico', title: 'Family Law Trusts & Trustee Removal'},
      {url: '/resources/what-is-a-puerto-rico-trust', title: 'What Is a Puerto Rico Trust? (Article Series)'}
    ],
    'estate-planning': [
      {url: '/blog/how-forced-heirship-affects-your-estate-plan-in-puerto-rico', title: 'How Forced Heirship Affects Your Estate Plan'},
      {url: '/blog/puerto-rico-trust-vs-will-which-do-you-need', title: 'Puerto Rico Trust vs. Will: Which Do You Need?'},
      {url: '/blog/the-complete-guide-to-puerto-rico-trusts-under-law-219-2012', title: 'Complete Guide to Puerto Rico Trusts'},
      {url: '/blog/testamentary-trust-succession-disputes-puerto-rico', title: 'Testamentary & Succession Disputes'},
      {url: '/blog/trust-beneficiary-rights-liquidation-puerto-rico', title: 'Trust Beneficiary Rights & Liquidation'},
      {url: '/resources/avoiding-probate-forced-heirship', title: 'Avoiding Probate & Forced Heirship (Article Series)'}
    ],
    'act-60': [
      {url: '/blog/5-critical-mistakes-act-60-decree-holders-make-with-estate-planning', title: '5 Critical Mistakes Act 60 Decree Holders Make'},
      {url: '/blog/irs-scrutiny-of-act-60-decree-holders-what-you-need-to-know-2026', title: 'IRS Scrutiny of Act 60 Decree Holders in 2026'},
      {url: '/blog/the-complete-guide-to-puerto-rico-trusts-under-law-219-2012', title: 'Complete Guide to Puerto Rico Trusts'},
      {url: '/act-60-resource-center', title: 'Act 60 Resource Center'},
      {url: '/resources/trust-planning-act-60-investors', title: 'Trust Planning for Act 60 Investors (Article Series)'}
    ],
    'business-law': [
      {url: '/blog/buslaw-01-llc-fiduciary-duties-deadlock-dissolution', title: 'LLC Fiduciary Duties & Deadlock Dissolution'},
      {url: '/blog/buslaw-02-fiduciary-duty-pleading-standards', title: 'Fiduciary Duty Pleading Standards'},
      {url: '/blog/buslaw-05-restrictive-covenant-blue-penciling', title: 'Restrictive Covenant Blue-Penciling'},
      {url: '/blog/buslaw-07-trust-beneficiary-standing', title: 'Trust Beneficiary Standing'},
      {url: '/blog/buslaw-03-post-closing-fraud-claims-mipa', title: 'Post-Closing Fraud Claims'},
      {url: '/blog/buslaw-04-private-equity-fraud-allegations', title: 'Private Equity Fraud Allegations'}
    ],
    'pr-law': [
      {url: '/blog/prlaw-01-private-operator-exemption', title: 'Private Operator Exemption from Procurement Law'},
      {url: '/blog/prlaw-02-bankruptcy-related-to-jurisdiction', title: 'Bankruptcy Related-To Jurisdiction'},
      {url: '/blog/prlaw-05-dual-tracking-protections', title: 'Dual-Tracking Protections'},
      {url: '/blog/prlaw-08-federal-district-court-jurisdiction', title: 'Federal District Court Jurisdiction'},
      {url: '/blog/public-government-trust-governance-puerto-rico', title: 'Public & Government Trust Governance'}
    ],
    'wills-estates': [
      {url: '/blog/how-forced-heirship-affects-your-estate-plan-in-puerto-rico', title: 'How Forced Heirship Affects Your Estate Plan'},
      {url: '/blog/puerto-rico-trust-vs-will-which-do-you-need', title: 'Puerto Rico Trust vs. Will: Which Do You Need?'},
      {url: '/blog/willsanalysis-01-percapitawithoutrepresentation', title: 'Per Capita Without Representation Distribution'},
      {url: '/blog/willsanalysis-03-unduinfluencecaretaker', title: 'Undue Influence by Caretaker'},
      {url: '/blog/willsanalysis-04-executorsdeedsvoid', title: "Executor's Deeds Void Ab Initio"},
      {url: '/blog/testamentary-trust-succession-disputes-puerto-rico', title: 'Testamentary & Succession Disputes'}
    ],
    'fideicomisos': [
      {url: '/blog/fideicomiso-irrevocable-en-puerto-rico-guia-completa-bajo-la-ley-219-2012', title: 'Fideicomiso Irrevocable en Puerto Rico'},
      {url: '/blog/planificacion-sucesoral-en-puerto-rico-lo-que-todo-residente-debe-saber', title: 'Planificaci\u00f3n Sucesoral en Puerto Rico'},
      {url: '/blog/proceso-de-declaratoria-de-herederos-en-puerto-rico', title: 'Declaratoria de Herederos en Puerto Rico'},
      {url: '/blog/ley-60-guia-para-inversionistas-individuales-que-se-mudan-a-puerto-rico', title: 'Ley 60: Gu\u00eda para Inversionistas'},
      {url: '/blog/banking-insurance-trust-disputes-puerto-rico-es', title: 'Disputas Bancarias y de Seguros'},
      {url: '/blog/trust-validity-challenges-puerto-rico-es', title: 'Impugnaciones de Validez de Fideicomisos'}
    ]
  };

  /* Determine which category a post belongs to based on its slug */
  function getPostCategory(slug) {
    // Spanish posts
    if (/fideicomiso|planificacion-sucesoral|declaratoria-de-herederos|ley-60-guia/.test(slug) ||
        /-es$/.test(slug)) return 'fideicomisos';
    // Trust law
    if (/trustlaw-|trust.*dispute|trust.*valid|trust.*property|fiduciar.*trust|breach.*fiduciar|banking.*insurance|family.*trust|trustee|beneficiary.*right|liquidation|no-contest|cy-pres|adr-provision|elder-abuse|statute-of-limitations|arbitration.*award|statutory-accounting|settlor|irrevocabl|complete-guide.*trust|trust-vs-will|asset-protection/.test(slug)) return 'trusts';
    // Wills & estates
    if (/willsanalysis|willssummary|forced-heirship|testamentary|succession/.test(slug)) return 'wills-estates';
    // Act 60
    if (/act-60|act60|irs-scrutiny/.test(slug)) return 'act-60';
    // Business law
    if (/buslaw-|llc|corporate|merger|covenant|private-equity|polar-star/.test(slug)) return 'business-law';
    // PR law
    if (/prlaw-|municipality|government.*trust.*governance|private-operator|dual-tracking|motor-vehicle|public-information|federal-district/.test(slug)) return 'pr-law';
    // Case law posts with v. patterns
    if (/\bv\b-|et-al/.test(slug)) return 'trusts';
    // Estate planning
    if (/estate|probate/.test(slug)) return 'estate-planning';
    return 'trusts'; // default
  }

  function isSpanish() {
    var title = document.title || '';
    var body = document.body.innerText.substring(0, 500);
    return /ñ|ó|é|á|ú|í|decisión|tribunal|fideicomiso|sucesoral|planificación/i.test(title + body);
  }

  /* Build related posts HTML for the current post */
  function buildRelatedPosts(slug) {
    var category = getPostCategory(slug);
    var pool = RELATED_POSTS[category];
    if (!pool) return '';

    // Filter out the current post
    var currentPath = '/blog/' + slug;
    var candidates = pool.filter(function(p) { return p.url !== currentPath; });

    // Pick up to 3 related posts
    var selected = candidates.slice(0, 3);
    if (selected.length === 0) return '';

    var spanish = isSpanish();
    var heading = spanish ? 'Art\u00edculos Relacionados' : 'Related Articles';

    var html = '<div class="rl-related-posts">' +
      '<h3>' + heading + '</h3>' +
      '<ul>';
    selected.forEach(function(p) {
      html += '<li><a href="' + p.url + '">' + p.title + '</a></li>';
    });
    html += '</ul></div>';
    return html;
  }

  /* Build series navigation for sequential posts (trustlaw, buslaw, prlaw, wills) */
  function buildSeriesNav(slug) {
    var series = null, prefix = '', label = '', count = 0;

    if (/^trustlaw-(\d+)/.test(slug)) {
      prefix = 'trustlaw'; label = 'Trust Law Case Analysis'; count = 8;
    } else if (/^buslaw-(\d+)/.test(slug)) {
      prefix = 'buslaw'; label = 'Business Law Case Analysis'; count = 7;
    } else if (/^prlaw-(\d+)/.test(slug)) {
      prefix = 'prlaw'; label = 'Puerto Rico Law Case Analysis'; count = 8;
    } else if (/^willsanalysis-(\d+)/.test(slug)) {
      prefix = 'willsanalysis'; label = 'Wills & Estates Case Analysis'; count = 5;
    } else if (/^willssummary-(\d+)/.test(slug)) {
      prefix = 'willssummary'; label = 'Wills & Estates Case Summaries'; count = 5;
    }

    if (!prefix) return '';

    var match = slug.match(/(\d+)/);
    if (!match) return '';
    var num = parseInt(match[1], 10);

    var html = '<nav class="rl-series-nav" aria-label="' + label + ' series navigation">';
    html += '<span class="rl-series-label">' + label + ' \u2014 Post ' + num + ' of ' + count + '</span>';
    html += '<div class="rl-series-links">';

    if (num > 1) {
      var prevSlug = slug.replace(/\d+/, ('0' + (num - 1)).slice(-2));
      html += '<a href="/blog/' + prevSlug + '" class="rl-series-prev">&larr; Previous</a>';
    }
    if (num < count) {
      var nextSlug = slug.replace(/\d+/, ('0' + (num + 1)).slice(-2));
      html += '<a href="/blog/' + nextSlug + '" class="rl-series-next">Next &rarr;</a>';
    }

    html += '</div></nav>';
    return html;
  }

  function formatPost() {
    // Find the post body content area (try multiple selectors for different Squarespace versions)
    var contentArea = document.querySelector('.blog-item-content-wrapper .sqs-layout') ||
                      document.querySelector('.blog-item-content-wrapper') ||
                      document.querySelector('.entry-content') ||
                      document.querySelector('[data-layout-label="Post Body"]') ||
                      document.querySelector('article .sqs-layout') ||
                      document.querySelector('.sqs-layout');

    if (!contentArea) return;

    // Check if already formatted
    if (contentArea.getAttribute('data-rl-formatted')) return;
    contentArea.setAttribute('data-rl-formatted', 'true');

    // Add reading time estimate
    if (!document.querySelector('.rl-reading-time')) {
      var wordCount = (contentArea.textContent || '').split(/\s+/).length;
      var minutes = Math.max(1, Math.round(wordCount / 225));
      var spanish = isSpanish();
      var timeLabel = spanish
        ? minutes + ' min de lectura'
        : minutes + ' min read';
      var timeBadge = document.createElement('div');
      timeBadge.className = 'rl-reading-time';
      timeBadge.style.cssText = 'display:inline-flex;align-items:center;gap:5px;padding:4px 12px;background:#f9f9fb;border:1px solid #e8e9ee;border-radius:100px;font-size:.75rem;color:#706b62;font-weight:500;margin-bottom:20px;';
      timeBadge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ' + timeLabel;
      var topWrapper = document.querySelector('.blog-item-top-wrapper') || document.querySelector('.blog-item-wrapper header');
      if (topWrapper) {
        topWrapper.parentNode.insertBefore(timeBadge, topWrapper.nextSibling);
      } else {
        contentArea.insertBefore(timeBadge, contentArea.firstChild);
      }
    }

    // Check if post already has proper H2/H3 structure
    var existingHeadings = contentArea.querySelectorAll('h2, h3');
    var alreadyStructured = existingHeadings.length >= 2;

    if (!alreadyStructured) {
      // PASS 1: Promote known section headers from <p> to <h2>
      var paragraphs = contentArea.querySelectorAll('p');
      paragraphs.forEach(function(p) {
        var text = p.textContent.trim();
        // Remove any number prefix like "6. " or "21. "
        var cleaned = text.replace(/^\d+\.\s*/, '');
        var lower = cleaned.toLowerCase();

        if (headerMap[lower] && cleaned.length < 80) {
          var h2 = document.createElement('h2');
          h2.className = 'rl-auto-heading';
          h2.textContent = headerMap[lower]; // Use the properly-cased version
          p.parentNode.replaceChild(h2, p);
        }
      });

      // PASS 2: Promote <strong>-only paragraphs that look like headers
      paragraphs = contentArea.querySelectorAll('p'); // re-query after changes
      paragraphs.forEach(function(p) {
        // Check if paragraph contains only a <strong> element
        var children = p.childNodes;
        var strongOnly = false;
        if (children.length === 1 && children[0].nodeName === 'STRONG') {
          strongOnly = true;
        } else if (children.length === 1 && children[0].nodeName === '#text') {
          // Check for **markdown bold** pattern
          var text = children[0].textContent.trim();
          var match = text.match(/^\*\*(.+)\*\*$/);
          if (match) {
            // Convert markdown bold to proper heading
            var h3 = document.createElement('h3');
            h3.className = 'rl-auto-heading';
            h3.textContent = match[1];
            p.parentNode.replaceChild(h3, p);
            return;
          }
        }

        if (strongOnly) {
          var strongText = children[0].textContent.trim();
          var cleanStrong = strongText.replace(/^\*\*|\*\*$/g, '').replace(/^#+\s*/, '');
          // If it looks like a section header (short, title-case-ish, known pattern)
          if (cleanStrong.length < 80) {
            var lowerStrong = cleanStrong.toLowerCase();
            if (headerMap[lowerStrong]) {
              var h2 = document.createElement('h2');
              h2.className = 'rl-auto-heading';
              h2.textContent = headerMap[lowerStrong];
              p.parentNode.replaceChild(h2, p);
            } else if (/^(citation|case|court|facts|issues|holding|analysis|decision|background|conclusion|significance|procedural|applicable)/i.test(cleanStrong)) {
              var h3 = document.createElement('h3');
              h3.className = 'rl-auto-heading';
              h3.textContent = cleanStrong.replace(/:\s*$/, '');
              p.parentNode.replaceChild(h3, p);
            }
          }
        }
      });

      // PASS 3: Clean up number prefixes in first paragraph
      var firstP = contentArea.querySelector('p');
      if (firstP) {
        var firstText = firstP.textContent.trim();
        // Remove "21. Case Name\n" prefix that duplicates the title
        var titleEl = document.querySelector('.blog-item-title h1, .entry-title');
        if (titleEl) {
          var title = titleEl.textContent.trim();
          var numMatch = firstText.match(/^\d+\.\s*/);
          if (numMatch) {
            var afterNum = firstText.substring(numMatch[0].length);
            // If the text after the number matches the post title, remove that paragraph
            if (afterNum.substring(0, title.length).toLowerCase() === title.toLowerCase()) {
              firstP.style.display = 'none';
            }
          }
        }
      }

      // PASS 4: Convert remaining **markdown** patterns to <strong>
      paragraphs = contentArea.querySelectorAll('p');
      paragraphs.forEach(function(p) {
        if (/\*\*/.test(p.innerHTML) && !/<strong/.test(p.innerHTML)) {
          p.innerHTML = p.innerHTML.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        }
      });
    }

    // Get slug for related posts
    // Auto-generate Table of Contents for long posts (4+ headings)
    var tocHeadings = contentArea.querySelectorAll('h2, h3');
    if (tocHeadings.length >= 4 && !contentArea.querySelector('.rl-toc')) {
      var spanish = isSpanish();
      var tocHtml = '<div class="rl-toc">' +
        '<p class="rl-toc-title">' + (spanish ? 'En Este Art\u00edculo' : 'In This Article') + '</p><ol>';
      for (var ti = 0; ti < tocHeadings.length; ti++) {
        var th = tocHeadings[ti];
        var anchor = 'section-' + ti;
        th.id = anchor;
        var indent = th.tagName === 'H3' ? ' class="rl-toc-indent"' : '';
        tocHtml += '<li' + indent + '><a href="#' + anchor + '">' + th.textContent.trim() + '</a></li>';
      }
      tocHtml += '</ol></div>';
      var tocDiv = document.createElement('div');
      tocDiv.innerHTML = tocHtml;
      contentArea.insertBefore(tocDiv.firstChild, contentArea.firstChild);
    }

    var slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');

    // Add series navigation (for numbered series posts)
    var seriesNav = buildSeriesNav(slug);
    if (seriesNav && !contentArea.querySelector('.rl-series-nav')) {
      var seriesDiv = document.createElement('div');
      seriesDiv.innerHTML = seriesNav;
      // Insert series nav at top of content
      contentArea.insertBefore(seriesDiv.firstChild, contentArea.firstChild);
    }

    // --- DISCLAIMERS & JURISDICTIONAL NOTES ---
    // Uses page title matching (not slug) since Squarespace slugs may be random IDs
    if (!contentArea.querySelector('.rl-disclaimer')) {
      var pageTitle = (document.querySelector('h1') || {}).textContent || document.title || '';
      pageTitle = pageTitle.toLowerCase().trim();
      var bodySnippet = (contentArea.innerText || '').substring(0, 2000).toLowerCase();
      var disclaimerHtml = '';

      // --- 1. Non-PR case law posts: jurisdictional note ---
      // Match by case party names in the title (v. pattern) + state court references in body
      var NON_PR_COURTS = [
        {pattern: /new york|surrogate.s court|n\.y\.|nyc/i, state: 'New York'},
        {pattern: /louisiana|la\. app|la\. sup/i, state: 'Louisiana'},
        {pattern: /florida|fla\.|fl dist/i, state: 'Florida'},
        {pattern: /texas|tex\.|txapp/i, state: 'Texas'},
        {pattern: /mississippi|miss\./i, state: 'Mississippi'},
        {pattern: /california|cal\.|calapp/i, state: 'California'},
        {pattern: /west virginia|w\. ?va/i, state: 'West Virginia'},
        {pattern: /massachusetts|mass\./i, state: 'Massachusetts'},
        {pattern: /arkansas|ark\./i, state: 'Arkansas'},
        {pattern: /new jersey|n\.j\./i, state: 'New Jersey'},
        {pattern: /maryland|md\. app/i, state: 'Maryland'}
      ];

      // Only check if the title looks like a case name (contains " v. " or " v " or "in re")
      var isCasePost = /\bv\.?\s|in re\b/i.test(pageTitle);
      // And it's not a PR case (no "puerto rico" or "P.R." in body's court reference)
      var isPRCase = /supreme court of puerto rico|tribunal supremo|p\.r\. \d|tspr|d\. ?p\.?r\./i.test(bodySnippet);

      if (isCasePost && !isPRCase) {
        var detectedState = '';
        for (var i = 0; i < NON_PR_COURTS.length; i++) {
          if (NON_PR_COURTS[i].pattern.test(bodySnippet)) {
            detectedState = NON_PR_COURTS[i].state;
            break;
          }
        }
        if (detectedState) {
          disclaimerHtml = '<div class="rl-disclaimer rl-jurisdictional-note" style="background:#faf8f4;border-left:4px solid #bfa35d;padding:16px 20px;margin:32px 0 24px;border-radius:0 8px 8px 0;font-size:.88rem;line-height:1.6;color:#555;">'
            + '<p style="margin:0 0 8px;font-weight:600;color:#333;">Important Jurisdictional Note</p>'
            + '<p style="margin:0;">This case was decided under the law of ' + detectedState + '. Puerto Rico is a civil-law jurisdiction with a fundamentally different legal framework. Puerto Rico trusts are governed by Law 219-2012, and succession is governed by the Civil Code (Ley 55-2020), which includes forced heirship rules that have no equivalent in most U.S. states. The holding in this case does not apply as precedent in Puerto Rico courts. This summary is published for educational purposes to illustrate how trust and estate issues arise in practice; consult a Puerto Rico attorney for guidance on how local law applies to your situation.</p>'
            + '</div>';
        }
      }

      // --- 2. Per-article disclaimer for trust / estate / Act 60 blog posts ---
      // Match by title keywords
      var EN_DISCLAIMER_TITLES = [
        /critical mistakes.*act 60|act 60.*estate planning/i,
        /trust vs\.? will|will vs\.? trust/i,
        /irs scrutiny.*act 60|act 60.*irs/i,
        /forced heirship.*estate plan/i,
        /asset protection.*irrevocable trust|irrevocable trust.*asset protection/i,
        /complete guide.*puerto rico trust/i,
        /living trust vs.*irrevocable/i
      ];
      var ES_DISCLAIMER_TITLES = [
        /fideicomiso irrevocable/i,
        /planificaci.n sucesoral/i,
        /ley 60.*gu.a.*inversionistas|gu.a.*inversionistas.*ley 60/i,
        /declaratoria de herederos/i,
        /para qu. sirve.*fideicomiso/i
      ];

      if (!disclaimerHtml) {
        var matchEN = EN_DISCLAIMER_TITLES.some(function(rx) { return rx.test(pageTitle); });
        var matchES = ES_DISCLAIMER_TITLES.some(function(rx) { return rx.test(pageTitle); });

        if (matchEN) {
          disclaimerHtml = '<div class="rl-disclaimer" style="background:#faf8f4;border-left:4px solid #bfa35d;padding:16px 20px;margin:32px 0 24px;border-radius:0 8px 8px 0;font-size:.85rem;line-height:1.6;color:#666;font-style:italic;">'
            + '<p style="margin:0;">Disclaimer: This article is for general informational purposes only and does not constitute legal or tax advice. No attorney-client relationship is created by reading this content. Tax laws and regulations change frequently; the information here reflects the law as of the publication date and may not reflect subsequent changes. Consult a qualified attorney regarding your specific situation.</p>'
            + '</div>';
        } else if (matchES) {
          disclaimerHtml = '<div class="rl-disclaimer" style="background:#faf8f4;border-left:4px solid #bfa35d;padding:16px 20px;margin:32px 0 24px;border-radius:0 8px 8px 0;font-size:.85rem;line-height:1.6;color:#666;font-style:italic;">'
            + '<p style="margin:0;">Aviso: Este art\u00edculo es solo para fines informativos generales y no constituye asesoramiento legal ni tributario. La lectura de este contenido no crea una relaci\u00f3n abogado-cliente. Las leyes y regulaciones tributarias cambian con frecuencia; la informaci\u00f3n aqu\u00ed refleja la ley vigente a la fecha de publicaci\u00f3n y puede no reflejar cambios posteriores. Consulte con un abogado cualificado respecto a su situaci\u00f3n particular.</p>'
            + '</div>';
        }
      }

      if (disclaimerHtml) {
        var discDiv = document.createElement('div');
        discDiv.innerHTML = disclaimerHtml;
        contentArea.appendChild(discDiv.firstChild);
      }
    }

    // Add social share buttons
    if (!contentArea.querySelector('.rl-share-bar')) {
      var pageUrl = encodeURIComponent(window.location.href);
      var pageTitle = encodeURIComponent(document.title || '');
      var shareBar = document.createElement('div');
      shareBar.className = 'rl-share-bar';
      shareBar.innerHTML =
        '<span class="rl-share-label">' + (isSpanish() ? 'Compartir:' : 'Share:') + '</span>' +
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl + '" target="_blank" rel="noopener" class="rl-share-btn rl-share-li" aria-label="Share on LinkedIn" title="Share on LinkedIn">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' +
        '</a>' +
        '<a href="https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle + '" target="_blank" rel="noopener" class="rl-share-btn rl-share-tw" aria-label="Share on X" title="Share on X">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
        '</a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + pageUrl + '" target="_blank" rel="noopener" class="rl-share-btn rl-share-fb" aria-label="Share on Facebook" title="Share on Facebook">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
        '</a>' +
        '<a href="mailto:?subject=' + pageTitle + '&body=' + pageUrl + '" class="rl-share-btn rl-share-em" aria-label="Share via email" title="Share via email">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
        '</a>';
      contentArea.appendChild(shareBar);
    }

    // Add related posts before CTA
    var relatedHtml = buildRelatedPosts(slug);
    if (relatedHtml && !contentArea.querySelector('.rl-related-posts')) {
      var relDiv = document.createElement('div');
      relDiv.innerHTML = relatedHtml;
      contentArea.appendChild(relDiv.firstChild);
    }

    // Add CTA block if not already present — context-aware based on post category
    var hasCTA = contentArea.querySelector('.rl-post-cta') ||
                 /schedule.*consult|book.*appointment|riefkohllaw\.com/i.test(contentArea.innerHTML);
    if (!hasCTA) {
      var spanish = isSpanish();
      var postCategory = getPostCategory(slug);
      var ctaHtml = getPostCTA(postCategory, spanish);
      var ctaDiv = document.createElement('div');
      ctaDiv.innerHTML = ctaHtml;
      contentArea.appendChild(ctaDiv.firstChild);
    }

    // Add back-to-blog link if not present
    var hasBack = contentArea.querySelector('.rl-post-back');
    if (!hasBack) {
      var spanish = isSpanish();
      var backDiv = document.createElement('div');
      backDiv.innerHTML = spanish ? BACK_LINK_ES : BACK_LINK;
      contentArea.appendChild(backDiv.firstChild);
    }
  }

  // Open Graph meta tags for social sharing
  function injectOpenGraphMeta() {
    // Don't override if Squarespace already set OG tags
    if (document.querySelector('meta[property="og:title"]')) return;

    var title = document.title || '';
    var desc = (document.querySelector('meta[name="description"]') || {}).content || title;
    var url = window.location.href;
    var img = document.querySelector('.blog-item-wrapper img, article img');
    var imgUrl = img ? img.src : 'https://www.riefkohllaw.com/favicon.ico';

    var tags = [
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc.substring(0, 200) },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: 'Riefkohl Law' },
      { property: 'og:locale', content: isSpanish() ? 'es_PR' : 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc.substring(0, 200) }
    ];

    if (imgUrl) {
      tags.push({ property: 'og:image', content: imgUrl });
      tags.push({ name: 'twitter:image', content: imgUrl });
    }

    tags.forEach(function(t) {
      var meta = document.createElement('meta');
      if (t.property) meta.setAttribute('property', t.property);
      if (t.name) meta.setAttribute('name', t.name);
      meta.setAttribute('content', t.content);
      document.head.appendChild(meta);
    });
  }

  // Article structured data (schema.org)
  function injectArticleSchema() {
    // Don't duplicate
    var existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < existing.length; i++) {
      if (existing[i].textContent.indexOf('"Article"') > -1 ||
          existing[i].textContent.indexOf('"BlogPosting"') > -1) return;
    }

    var title = (document.querySelector('h1.blog-title') || document.querySelector('h1') || {}).textContent || document.title || '';
    var desc = (document.querySelector('meta[name="description"]') || {}).content || '';
    var dateEl = document.querySelector('time.blog-date, .dt-published, time[datetime]');
    var datePublished = dateEl ? (dateEl.getAttribute('datetime') || dateEl.textContent) : '';
    var url = window.location.href;
    var contentArea = document.querySelector('.blog-item-content-wrapper .sqs-layout') ||
                      document.querySelector('.blog-item-content-wrapper') ||
                      document.querySelector('.entry-content');
    var wordCount = contentArea ? (contentArea.textContent || '').split(/\s+/).length : 0;

    var schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': title.trim().substring(0, 110),
      'description': desc || title.trim().substring(0, 160),
      'url': url,
      'author': {
        '@type': 'Person',
        '@id': 'https://www.riefkohllaw.com/#attorney',
        'name': 'Hans E. Riefkohl',
        'url': 'https://www.riefkohllaw.com/about'
      },
      'publisher': {
        '@type': 'LegalService',
        '@id': 'https://www.riefkohllaw.com/#organization',
        'name': 'Riefkohl Law',
        'url': 'https://www.riefkohllaw.com'
      },
      'inLanguage': isSpanish() ? 'es' : 'en',
      'wordCount': wordCount,
      'isAccessibleForFree': true
    };

    if (datePublished) {
      schema.datePublished = datePublished;
      schema.dateModified = datePublished;
    }

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Reading progress bar for blog posts
  function initProgressBar() {
    if (document.querySelector('.rl-progress-bar')) return;
    var bar = document.createElement('div');
    bar.className = 'rl-progress-bar';
    bar.style.cssText = 'position:fixed;top:0;left:0;width:0;height:3px;background:linear-gradient(90deg,#bfa35d,#d4b96a);z-index:99999;transition:width .15s ease-out;pointer-events:none;';
    document.body.appendChild(bar);

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var docHeight = document.documentElement.scrollHeight - window.innerHeight;
          var progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
          bar.style.width = progress + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  ready(function() {
    // Run formatter
    formatPost();
    initProgressBar();
    injectArticleSchema();
    injectOpenGraphMeta();

    // Also watch for Squarespace AJAX page loads
    var observer = new MutationObserver(function(mutations) {
      var shouldRun = mutations.some(function(m) {
        return m.addedNodes.length > 0;
      });
      if (shouldRun && /^\/blog\/[a-z0-9]/.test(window.location.pathname)) {
        setTimeout(formatPost, 300);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
