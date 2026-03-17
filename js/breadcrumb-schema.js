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
  '/calendly': [
    { name: 'Home', url: '/' },
    { name: 'Book an Appointment', url: '/calendly' }
  ]
};

/* Check for blog post pages (paths starting with /blog/) */
var isBlogPost = path.indexOf('/blog/') === 0 && path !== '/blog';

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
}

})();
