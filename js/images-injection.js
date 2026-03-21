// Riefkohl Law — Strategic Image Placement
// DEPLOY: Squarespace → Settings → Advanced → Code Injection → Header
// Must load AFTER homepage-services-redesign.html

(function(){
'use strict';

var SITE = 'https://images.squarespace-cdn.com/content/6341e033d606ac41fb5ed5de/';
var IMGS = {
  pen:       SITE + '96b8219f-64c2-40a6-b10e-f6a58f631cbf/1.+The+Fountain+Pen+actively+signing+vellum+paper+.png',
  oak:       SITE + '24854721-7b91-40b6-a4e6-bb223ef5043d/2.Ancient+Oak+Tree+Trunk+and+Concrete+Wall.jpg',
  blueprint: SITE + 'c5cfed01-adb5-491f-869f-6ed613f68f06/3a.+Architectural+Blueprint+and+Desk+.png',
  sapling:   SITE + '0f89c415-5c5d-4574-8b43-a0347f6058ed/3b.+Oak+Sapling+in+Precise+Concrete+Crack.jpg',
  hands:     SITE + "a991ed3a-e5da-4d7a-9b06-0832d247fb41/3c.+Hand+Layered+on+a+Child's+Hand+.jpg",
  compass:   SITE + '5781e023-563d-46f8-8187-a4ad595af34a/4.Antique+Brass+Compass+on+Nautical+Chart.jpg',
  watch:     SITE + '0e031c8e-dcd3-43ab-a509-1497bafedcc8/5.+Extreme+Macro+of+a+Mechanical+Watch+Movement+.png',
  rowboat:   SITE + '3beea16d-b880-4fc1-b1e9-c9c6fd3f512d/6.+Rowboat+on+Calm+Water.png',
  books:     SITE + 'b3fbf8b8-62e2-4837-849d-42e217bcf4af/7.+Stack+of+Premium+Leather-Bound+Books+with+Bookmark.jpg'
};

function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

function makeImg(src, alt) {
  var img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.onload = function() { img.classList.add('rl-loaded'); };
  return img;
}

/* ============================
   HOME PAGE IMAGE INJECTION
   ============================ */
function injectHomeImages() {
  /* 1. Practice area card images */
  var cards = qsa('.rl-rd-card');
  var cardMap = {
    'Corporate & Transactional': { src: IMGS.blueprint, alt: 'Architectural blueprint on desk' },
    'Bankruptcy & Restructuring': { src: IMGS.sapling, alt: 'Oak sapling growing through concrete' },
    'Estate Planning': { src: IMGS.hands, alt: 'Hands symbolizing family protection' },
    'Business Formation': { src: IMGS.pen, alt: 'Fountain pen signing legal documents' },
    'Government Contracts': { src: IMGS.compass, alt: 'Antique compass on nautical chart' },
    'Puerto Rico Trusts': { src: IMGS.books, alt: 'Stack of leather-bound legal books' },
    'Puerto Rico Tax Incentives': { src: IMGS.watch, alt: 'Mechanical watch movement representing precision' }
  };

  cards.forEach(function(card) {
    if (card.querySelector('.rl-card-img')) return; // already injected
    var h3 = card.querySelector('h3');
    if (!h3) return;
    var title = h3.textContent.trim();
    for (var key in cardMap) {
      if (title.indexOf(key) > -1) {
        var img = makeImg(cardMap[key].src, cardMap[key].alt);
        img.className = 'rl-card-img';
        // Insert image at the top of the card, before category label
        card.insertBefore(img, card.firstChild);
        break;
      }
    }
  });

  /* 3. Oak tree accent above differentiators */
  var diffHeading = null;
  qsa('.rl-rd-section-heading').forEach(function(h) {
    if (h.textContent.indexOf('Difference') > -1) diffHeading = h;
  });
  if (diffHeading && !diffHeading.previousElementSibling?.classList?.contains('rl-diff-accent-img')) {
    var wrapper = document.createElement('div');
    wrapper.className = 'rl-diff-accent-img';
    var img = makeImg(IMGS.oak, 'Ancient oak tree and concrete wall');
    wrapper.appendChild(img);
    diffHeading.parentNode.insertBefore(wrapper, diffHeading);
  }
}

/* ============================
   SERVICES PAGE IMAGE INJECTION
   ============================ */
function injectServiceImages() {
  /* 1. Services hero background */
  var svcHero = qs('.rl-rd-page-hero');
  if (svcHero && !svcHero.classList.contains('rl-has-bg')) {
    svcHero.classList.add('rl-has-bg');
  }

  /* 2. Watch image before Corporate services section */
  var svcSections = qsa('.rl-rd-svc-section');
  svcSections.forEach(function(section) {
    var title = qs('.rl-rd-svc-section-title', section);
    if (!title) return;
    var txt = title.textContent.trim();

    if (txt.indexOf('Corporate & Transactional') > -1 && !section.querySelector('.rl-svc-accent-img')) {
      var wrapper = document.createElement('div');
      wrapper.className = 'rl-svc-accent-img';
      wrapper.appendChild(makeImg(IMGS.watch, 'Mechanical watch movement representing precision'));
      title.parentNode.insertBefore(wrapper, title.nextSibling);
    }

    if (txt.indexOf('Business Formation') > -1 && !section.querySelector('.rl-svc-accent-img')) {
      var wrapperBf = document.createElement('div');
      wrapperBf.className = 'rl-svc-accent-img';
      wrapperBf.appendChild(makeImg(IMGS.pen, 'Fountain pen signing legal documents'));
      title.parentNode.insertBefore(wrapperBf, title.nextSibling);
    }

    if (txt.indexOf('Bankruptcy') > -1 && !section.querySelector('.rl-svc-accent-img')) {
      var wrapper2 = document.createElement('div');
      wrapper2.className = 'rl-svc-accent-img';
      wrapper2.appendChild(makeImg(IMGS.rowboat, 'Rowboat on calm water representing peace'));
      title.parentNode.insertBefore(wrapper2, title.nextSibling);
    }
  });

  /* 3. Books image above trust pricing tiers */
  var tierGrid = qs('.rl-rd-tier-grid');
  if (tierGrid && !tierGrid.previousElementSibling?.classList?.contains('rl-tier-accent-img')) {
    var wrapper3 = document.createElement('div');
    wrapper3.className = 'rl-tier-accent-img';
    wrapper3.appendChild(makeImg(IMGS.books, 'Stack of leather-bound books'));
    tierGrid.parentNode.insertBefore(wrapper3, tierGrid);
  }
}

/* ============================
   BOOT
   ============================ */
var PATH = window.location.pathname.replace(/\/+$/, '') || '/';

function run() {
  try {
    if (PATH === '/') injectHomeImages();
    else if (PATH === '/services') injectServiceImages();
  } catch(e) {
    console.error('[rl-images]', e);
  }
}

// Run after the redesign script has had time to transform the page
function boot() {
  setTimeout(run, 800);
  setTimeout(run, 2000);
  setTimeout(run, 4000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
window.addEventListener('load', function() { setTimeout(run, 500); });

})();
