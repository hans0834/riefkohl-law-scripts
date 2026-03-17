// Riefkohl Law — Blog Post Formatter
// Enhances imported case law posts with proper heading structure, styling, and CTAs
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

  // CTA block HTML
  var CTA_EN = '<div class="rl-post-cta">' +
    '<h3>Need Legal Guidance?</h3>' +
    '<p>If you have questions about this area of law, our attorneys can help. We offer personalized consultations to discuss your specific situation.</p>' +
    '<a href="/book-an-appointment" class="rl-cta-btn">Schedule a Consultation</a>' +
    '<p class="rl-cta-sub">Or call us at <a href="tel:+17877221277">(787) 722-1277</a></p>' +
    '</div>';

  var CTA_ES = '<div class="rl-post-cta">' +
    '<h3>¿Necesita Asesoría Legal?</h3>' +
    '<p>Si tiene preguntas sobre esta área del derecho, nuestros abogados pueden ayudarle. Ofrecemos consultas personalizadas para discutir su situación específica.</p>' +
    '<a href="/book-an-appointment" class="rl-cta-btn">Agende una Consulta</a>' +
    '<p class="rl-cta-sub">O llámenos al <a href="tel:+17877221277">(787) 722-1277</a></p>' +
    '</div>';

  // Back to blog link
  var BACK_LINK = '<div class="rl-post-back">' +
    '<a href="/blog">&larr; Back to Blog</a>' +
    '</div>';

  var BACK_LINK_ES = '<div class="rl-post-back">' +
    '<a href="/blog">&larr; Volver al Blog</a>' +
    '</div>';

  function isSpanish() {
    var title = document.title || '';
    var body = document.body.innerText.substring(0, 500);
    return /ñ|ó|é|á|ú|í|decisión|tribunal|fideicomiso|sucesoral|planificación/i.test(title + body);
  }

  function formatPost() {
    // Find the post body content area
    var contentArea = document.querySelector('.blog-item-content-wrapper .sqs-layout') ||
                      document.querySelector('.blog-item-content-wrapper') ||
                      document.querySelector('.entry-content') ||
                      document.querySelector('[data-layout-label="Post Body"]');

    if (!contentArea) return;

    // Check if already formatted
    if (contentArea.getAttribute('data-rl-formatted')) return;
    contentArea.setAttribute('data-rl-formatted', 'true');

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

    // Add CTA block if not already present
    var hasCTA = contentArea.querySelector('.rl-post-cta') ||
                 /schedule.*consult|book.*appointment|riefkohllaw\.com/i.test(contentArea.innerHTML);
    if (!hasCTA) {
      var spanish = isSpanish();
      var ctaDiv = document.createElement('div');
      ctaDiv.innerHTML = spanish ? CTA_ES : CTA_EN;
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

  ready(function() {
    // Run formatter
    formatPost();

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
