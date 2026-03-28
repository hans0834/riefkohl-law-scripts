// Riefkohl Law BreadcrumbList Schema — Structured Data
// DEPLOY: Add to seo-fixes.html or append to Code Injection Header
// PURPOSE: Adds BreadcrumbList schema.org structured data for rich search results

(function(){
'use strict';

/* BreadcrumbList Schema Generator */
var path = window.location.pathname.replace(/\/+$/, '') || '/';

/* Page hierarchy mapping */
var breadcrumbs = {
  '/': null, /* Homepage — no breadcrumb needed */
  '/services': [
    { name: 'Home', url: '/' },
    { name: 'Legal Services', url: '/services' }
  ],
  '/about': [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ],
  '/about-us': [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about-us' }
  ],
  '/contact': [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ],
  '/blog': [
    { name: 'Home', url: '/' },
    { name: 'Legal Blog', url: '/blog' }
  ],
  '/resources': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' }
  ],
  '/puerto-rico-trusts': [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Puerto Rico Trusts', url: '/puerto-rico-trusts' }
  ],
  '/estate-planning': [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Estate Planning', url: '/estate-planning' }
  ],
  '/act-60-tax-incentives': [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Act 60 Tax Incentives', url: '/act-60-tax-incentives' }
  ],
  '/business-formation': [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Business Formation', url: '/business-formation' }
  ],
  '/government-contracts': [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Government Contracts', url: '/government-contracts' }
  ],
  '/act-60-resource-center': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' }
  ],
  '/calendly': [
    { name: 'Home', url: '/' },
    { name: 'Book a Consultation', url: '/calendly' }
  ],

  /* Spanish core pages */
  '/espanol': [
    { name: 'Inicio', url: '/espanol' }
  ],
  '/espanol-servicios': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Servicios', url: '/espanol-servicios' }
  ],
  '/espanol-sobre-nosotros': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Sobre Nosotros', url: '/espanol-sobre-nosotros' }
  ],
  '/espanol-contacto': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Contacto', url: '/espanol-contacto' }
  ],
  '/espanol-fideicomisos': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Servicios', url: '/espanol-servicios' },
    { name: 'Fideicomisos', url: '/espanol-fideicomisos' }
  ],
  '/espanol-ley-60': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Servicios', url: '/espanol-servicios' },
    { name: 'Ley 60', url: '/espanol-ley-60' }
  ],
  '/espanol-cita': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Agendar Cita', url: '/espanol-cita' }
  ],
  '/espanol-blog': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Blog Legal', url: '/espanol-blog' }
  ],
  '/espanol-corporativo': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Servicios', url: '/espanol-servicios' },
    { name: 'Corporativo', url: '/espanol-corporativo' }
  ],
  '/espanol-quiebras': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Servicios', url: '/espanol-servicios' },
    { name: 'Quiebras', url: '/espanol-quiebras' }
  ],
  '/corporate': [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Corporate & Transactional', url: '/corporate' }
  ],

  /* Act 60 Resource Center subpages */
  '/act-60-federal-residency-test-puerto-rico': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'Federal Residency Test', url: '/act-60-federal-residency-test-puerto-rico' }
  ],
  '/act-60-income-sourcing-rules-puerto-rico': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'Income Sourcing Rules', url: '/act-60-income-sourcing-rules-puerto-rico' }
  ],
  '/act-60-compliance-requirements-audit-triggers': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'Compliance & Audit Triggers', url: '/act-60-compliance-requirements-audit-triggers' }
  ],
  '/act-60-working-days-allocation-services-income-sourcing': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'Working Days Allocation', url: '/act-60-working-days-allocation-services-income-sourcing' }
  ],
  '/act-60-software-technology-income-classification-sourcing': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'Software & Technology Income', url: '/act-60-software-technology-income-classification-sourcing' }
  ],
  '/act-60-state-departure-audit-domicile-change': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'State Departure Audit', url: '/act-60-state-departure-audit-domicile-change' }
  ],
  '/act-60-year-of-move-safe-harbor-transition-year': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'Year of Move Safe Harbor', url: '/act-60-year-of-move-safe-harbor-transition-year' }
  ],
  '/act-60-export-services-chapter-3-compliance': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'Export Services Compliance', url: '/act-60-export-services-chapter-3-compliance' }
  ],
  '/act-60-residency-compliance-checklist-reference-tables': [
    { name: 'Home', url: '/' },
    { name: 'Act 60 Resource Center', url: '/act-60-resource-center' },
    { name: 'Compliance Checklist', url: '/act-60-residency-compliance-checklist-reference-tables' }
  ],

  /* Resource subpages (EN) */
  '/resources-faq': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'FAQ', url: '/resources-faq' }
  ],
  '/resources-wills-vs-trusts': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'Wills vs. Trusts', url: '/resources-wills-vs-trusts' }
  ],
  '/resources-forced-heirship': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'Forced Heirship', url: '/resources-forced-heirship' }
  ],
  '/resources-fiduciary-duties': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'Fiduciary Duties', url: '/resources-fiduciary-duties' }
  ],
  '/resources-act60': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'Act 60 Overview', url: '/resources-act60' }
  ],
  '/resources-cases': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'Trust Law Cases', url: '/resources-cases' }
  ],
  '/resources-glossary': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'Legal Glossary', url: '/resources-glossary' }
  ],
  '/resources-process': [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: 'What to Expect', url: '/resources-process' }
  ],

  /* CPA Referral Landing Page */
  '/cpa-referral': [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'CPA-Referred Clients', url: '/cpa-referral' }
  ],

  /* Pricing Page */
  '/pricing': [
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' }
  ],

  /* Resource subpages (ES) */
  '/recursos-es': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' }
  ],
  '/recursos-preguntas-frecuentes': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' },
    { name: 'Preguntas Frecuentes', url: '/recursos-preguntas-frecuentes' }
  ],
  '/recursos-testamentos-fideicomisos': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' },
    { name: 'Testamentos vs. Fideicomisos', url: '/recursos-testamentos-fideicomisos' }
  ],
  '/recursos-legitima': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' },
    { name: 'Leg\u00edtima', url: '/recursos-legitima' }
  ],
  '/recursos-deberes-fiduciarios': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' },
    { name: 'Deberes Fiduciarios', url: '/recursos-deberes-fiduciarios' }
  ],
  '/recursos-act60-es': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' },
    { name: 'Ley 60', url: '/recursos-act60-es' }
  ],
  '/recursos-casos-es': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' },
    { name: 'Casos', url: '/recursos-casos-es' }
  ],
  '/recursos-glosario': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' },
    { name: 'Glosario', url: '/recursos-glosario' }
  ],
  '/recursos-que-esperar': [
    { name: 'Inicio', url: '/espanol' },
    { name: 'Recursos', url: '/recursos-es' },
    { name: 'Qu\u00e9 Esperar', url: '/recursos-que-esperar' }
  ]
};

/* Check for blog post pages (paths starting with /blog/) */
var isBlogPost = path.indexOf('/blog/') === 0 && path !== '/blog';

/* Check for resource article pages (paths starting with /resources/) */
var isResourceArticle = path.indexOf('/resources/') === 0 && path !== '/resources';

var crumbs = breadcrumbs[path];

if (!crumbs && isBlogPost) {
  /* Auto-generate breadcrumb for blog posts */
  var postTitle = document.title.split('|')[0].split('—')[0].trim();
  crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Legal Blog', url: '/blog' },
    { name: postTitle, url: path }
  ];
}

if (!crumbs && isResourceArticle) {
  /* Auto-generate breadcrumb for resource articles (trust law series) */
  var articleTitle = document.title.split('|')[0].split('—')[0].trim();
  crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/resources' },
    { name: articleTitle, url: path }
  ];
}

if (crumbs && crumbs.length > 0) {
  var baseUrl = 'https://www.riefkohllaw.com';
  var schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': crumbs.map(function(c, i) {
      return {
        '@type': 'ListItem',
        'position': i + 1,
        'name': c.name,
        'item': baseUrl + c.url
      };
    })
  };

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);

  /* ===== VISUAL BREADCRUMB TRAIL ===== */
  /* Render a visible breadcrumb on pages with 2+ levels */
  if (crumbs.length >= 2 && !document.querySelector('.rl-breadcrumb')) {
    var nav = document.createElement('nav');
    nav.className = 'rl-breadcrumb';
    nav.setAttribute('aria-label', 'Breadcrumb');

    var ol = document.createElement('ol');
    crumbs.forEach(function(c, i) {
      var li = document.createElement('li');
      if (i < crumbs.length - 1) {
        var a = document.createElement('a');
        a.href = c.url;
        a.textContent = c.name;
        li.appendChild(a);
      } else {
        li.textContent = c.name;
        li.setAttribute('aria-current', 'page');
      }
      ol.appendChild(li);
    });

    nav.appendChild(ol);

    // Insert after header/call banner, before main content
    function insertBreadcrumb() {
      var callBanner = document.querySelector('.rl-call-banner');
      var header = document.querySelector('header') || document.querySelector('.header');
      var mainContent = document.querySelector('main') || document.querySelector('#page') || document.querySelector('.page-section');
      var insertPoint = mainContent || (callBanner ? callBanner.nextElementSibling : null) || (header ? header.nextElementSibling : null);

      if (insertPoint && insertPoint.parentNode) {
        insertPoint.parentNode.insertBefore(nav, insertPoint);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertBreadcrumb);
    } else {
      insertBreadcrumb();
    }
  }
}

})();
