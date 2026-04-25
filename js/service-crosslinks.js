/* Riefkohl Law — Service Page Cross-Links */
/* Injects "Related Services" links at the bottom of each service page */
/* Updated to match navy/gold design system */

(function() {
  var pages = {
    "/estate-planning": [
      {href:"/puerto-rico-trusts",text:"Puerto Rico Trusts",desc:"Asset protection & fideicomisos under Law 219-2012"},
      {href:"/business-formation",text:"Business Formation",desc:"LLCs, corporations & startups"},
      {href:"/act-60-tax-incentives",text:"Act 60 Tax Incentives",desc:"4% corporate tax & capital gains benefits"},
      {href:"/government-contracts",text:"Government Contracts",desc:"Procurement, bid protests & compliance"}
    ],
    "/puerto-rico-trusts": [
      {href:"/estate-planning",text:"Estate Planning",desc:"Wills, powers of attorney & healthcare directives"},
      {href:"/business-formation",text:"Business Formation",desc:"LLCs, corporations & startups"},
      {href:"/act-60-tax-incentives",text:"Act 60 Tax Incentives",desc:"4% corporate tax & capital gains benefits"},
      {href:"/government-contracts",text:"Government Contracts",desc:"Procurement, bid protests & compliance"}
    ],
    "/business-formation": [
      {href:"/estate-planning",text:"Estate Planning",desc:"Wills, trusts & asset protection"},
      {href:"/puerto-rico-trusts",text:"Puerto Rico Trusts",desc:"Asset protection & fideicomisos under Law 219-2012"},
      {href:"/act-60-tax-incentives",text:"Act 60 Tax Incentives",desc:"4% corporate tax & capital gains benefits"},
      {href:"/government-contracts",text:"Government Contracts",desc:"Procurement, bid protests & compliance"}
    ],
    "/act-60-tax-incentives": [
      {href:"/estate-planning",text:"Estate Planning",desc:"Wills, trusts & forced heirship planning"},
      {href:"/puerto-rico-trusts",text:"Puerto Rico Trusts",desc:"Asset protection & fideicomisos under Law 219-2012"},
      {href:"/business-formation",text:"Business Formation",desc:"LLCs, corporations & startups"},
      {href:"/government-contracts",text:"Government Contracts",desc:"Procurement, bid protests & compliance"}
    ],
    "/government-contracts": [
      {href:"/estate-planning",text:"Estate Planning",desc:"Wills, trusts & asset protection"},
      {href:"/puerto-rico-trusts",text:"Puerto Rico Trusts",desc:"Asset protection & fideicomisos under Law 219-2012"},
      {href:"/business-formation",text:"Business Formation",desc:"LLCs, corporations & startups"},
      {href:"/act-60-tax-incentives",text:"Act 60 Tax Incentives",desc:"4% corporate tax & capital gains benefits"}
    ],
    "/espanol-ley-60": [
      {href:"/espanol-fideicomisos",text:"Fideicomisos en Puerto Rico",desc:"Protección patrimonial y fideicomisos bajo la Ley 219-2012"},
      {href:"/espanol-corporativo",text:"Servicios corporativos",desc:"Estructura jurídica para empresas bajo el Capítulo 3 de la Ley 60"},
      {href:"/blog/ley-60-guia-inversionistas",text:"Guía Ley 60 para inversionistas",desc:"Análisis del Capítulo 2 y errores frecuentes de cumplimiento"},
      {href:"/blog/tag/espanol",text:"Más artículos en español",desc:"Fideicomisos, sucesiones, Ley 60 y derecho corporativo"}
    ],
    "/espanol-fideicomisos": [
      {href:"/espanol-ley-60",text:"Ley 60: incentivos contributivos",desc:"Decretos del Capítulo 2 y 3, cumplimiento y planificación"},
      {href:"/espanol-corporativo",text:"Servicios corporativos",desc:"Constitución de corporaciones, LLCs y planificación empresarial"},
      {href:"/blog/fideicomiso-irrevocable-puerto-rico",text:"Fideicomiso irrevocable en PR",desc:"Cuándo conviene y cómo se estructura bajo la Ley 219-2012"},
      {href:"/blog/tag/espanol",text:"Más artículos en español",desc:"Fideicomisos, sucesiones, Ley 60 y derecho corporativo"}
    ],
    "/espanol-corporativo": [
      {href:"/espanol-ley-60",text:"Ley 60: incentivos contributivos",desc:"Decretos del Capítulo 3 para exportación de servicios"},
      {href:"/espanol-fideicomisos",text:"Fideicomisos en Puerto Rico",desc:"Protección patrimonial y planificación sucesoral"},
      {href:"/espanol-quiebras",text:"Quiebras y reestructuración",desc:"Capítulos 7, 11 y 13 — análisis de elegibilidad"},
      {href:"/blog/tag/espanol",text:"Más artículos en español",desc:"Fideicomisos, sucesiones, Ley 60 y derecho corporativo"}
    ],
    "/espanol-quiebras": [
      {href:"/espanol-corporativo",text:"Servicios corporativos",desc:"Reestructuración empresarial antes de una quiebra"},
      {href:"/espanol-fideicomisos",text:"Fideicomisos en Puerto Rico",desc:"Protección patrimonial y planificación sucesoral"},
      {href:"/espanol-ley-60",text:"Ley 60: incentivos contributivos",desc:"Decretos del Capítulo 2 y 3, cumplimiento y planificación"},
      {href:"/blog/tag/espanol",text:"Más artículos en español",desc:"Fideicomisos, sucesiones, Ley 60 y derecho corporativo"}
    ]
  };

  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  var links = pages[path];
  if (!links) return;

  var isSpanish = path.indexOf('/espanol') === 0;
  var copy = isSpanish ? {
    heading: 'Recursos relacionados',
    servicesLink: { href: '/espanol-servicios', text: 'Ver todos nuestros servicios' },
    bookLink: { href: '/espanol-cita', text: 'Coordine consulta gratuita' }
  } : {
    heading: 'Explore Our Other Practice Areas',
    servicesLink: { href: '/services', text: 'View All Services & Pricing' },
    bookLink: { href: '/calendly', text: 'Book Free Consultation' }
  };

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function() {
    if (document.querySelector('.rl-crosslinks')) return;

    var section = document.createElement('div');
    section.className = 'rl-crosslinks';
    section.style.cssText = 'max-width:1140px;margin:48px auto 0;padding:32px 28px 0;border-top:2px solid #e8e9ee;';

    var h = '<p style="margin:0 0 18px;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a68c42;">' + copy.heading + '</p>';
    h += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">';

    links.forEach(function(l) {
      h += '<a href="' + l.href + '" style="display:block;padding:16px 18px;background:#f9f9fb;border:1.5px solid #e8e9ee;border-radius:10px;text-decoration:none;transition:border-color .3s,box-shadow .3s;"' +
        ' onmouseenter="this.style.borderColor=\'#bfa35d\';this.style.boxShadow=\'0 4px 12px rgba(0,0,0,.08)\'" onmouseleave="this.style.borderColor=\'#e8e9ee\';this.style.boxShadow=\'none\'">' +
        '<span style="display:block;font-size:.95rem;font-weight:600;color:#1a2033;margin-bottom:4px;">' + l.text + ' &rarr;</span>' +
        '<span style="display:block;font-size:.8rem;color:#706b62;line-height:1.4;">' + l.desc + '</span>' +
      '</a>';
    });

    h += '</div>';
    h += '<p style="margin:20px 0 0;text-align:center;font-size:.88rem;">' +
      '<a href="' + copy.servicesLink.href + '" style="color:#a68c42;text-decoration:none;font-weight:600;">' + copy.servicesLink.text + '</a>' +
      '<span style="color:#e8e9ee;margin:0 10px;">|</span>' +
      '<a href="' + copy.bookLink.href + '" style="color:#a68c42;text-decoration:none;font-weight:600;">' + copy.bookLink.text + '</a>' +
      '<span style="color:#e8e9ee;margin:0 10px;">|</span>' +
      '<a href="tel:+17872361657" style="color:#a68c42;text-decoration:none;font-weight:600;">(787) 236-1657</a>' +
    '</p>';

    section.innerHTML = h;

    var target = document.querySelector("article .content-wrapper > .content") ||
      document.querySelector("article .content") ||
      document.querySelector("main .content") ||
      document.querySelector(".content");

    if (target) target.appendChild(section);
  });
})();
