/* Riefkohl Law — Service Page Cross-Links */
/* Source: Squarespace Code Injection → Footer */
/* Injects "Related Services" links at the bottom of each service page */

(function() {
  var pages = {
    "/estate-planning": [
      {href:"/puerto-rico-trusts",text:"Puerto Rico Trusts"},
      {href:"/business-formation",text:"Business Formation"},
      {href:"/act-60-tax-incentives",text:"Act 60 Tax Incentives"},
      {href:"/government-contracts",text:"Government Contracts"}
    ],
    "/puerto-rico-trusts": [
      {href:"/estate-planning",text:"Estate Planning"},
      {href:"/business-formation",text:"Business Formation"},
      {href:"/act-60-tax-incentives",text:"Act 60 Tax Incentives"},
      {href:"/government-contracts",text:"Government Contracts"}
    ],
    "/business-formation": [
      {href:"/estate-planning",text:"Estate Planning"},
      {href:"/puerto-rico-trusts",text:"Puerto Rico Trusts"},
      {href:"/act-60-tax-incentives",text:"Act 60 Tax Incentives"},
      {href:"/government-contracts",text:"Government Contracts"}
    ],
    "/act-60-tax-incentives": [
      {href:"/estate-planning",text:"Estate Planning"},
      {href:"/puerto-rico-trusts",text:"Puerto Rico Trusts"},
      {href:"/business-formation",text:"Business Formation"},
      {href:"/government-contracts",text:"Government Contracts"}
    ],
    "/government-contracts": [
      {href:"/estate-planning",text:"Estate Planning"},
      {href:"/puerto-rico-trusts",text:"Puerto Rico Trusts"},
      {href:"/business-formation",text:"Business Formation"},
      {href:"/act-60-tax-incentives",text:"Act 60 Tax Incentives"}
    ]
  };

  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  var links = pages[path];
  if (!links) return;

  var h = '<div style="margin-top:40px;padding-top:30px;border-top:1px solid #e0e0e0;">';
  h += '<p style="margin:0 0 10px;font-size:0.85em;color:#888;text-transform:uppercase;letter-spacing:0.05em;">Related Services</p>';
  h += '<p style="margin:0 0 8px;">';
  links.forEach(function(l) {
    h += '<a href="' + l.href + '" style="color:#2a5db0;text-decoration:none;margin-right:18px;font-weight:500;">' + l.text + '</a>';
  });
  h += '</p>';
  h += '<p style="margin:0;font-size:0.95em;"><a href="/services" style="color:#2a5db0;text-decoration:none;">View All Services</a> &nbsp;|&nbsp; <a href="/contact" style="color:#2a5db0;text-decoration:none;">Contact Us</a> &nbsp;|&nbsp; <a href="tel:7872361657" style="color:#2a5db0;text-decoration:none;">(787) 236-1657</a></p>';
  h += '</div>';

  var target = document.querySelector("article .content-wrapper > .content") || document.querySelector("article .content") || document.querySelector("main .content") || document.querySelector(".content");
  if (target) { var d = document.createElement("div"); d.innerHTML = h; target.appendChild(d); }
})();
