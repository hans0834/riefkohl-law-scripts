(function(){
/* EDITOR GUARD: never run inside the Squarespace editor (same-origin frame under /config). Fails open. */
try { if (window.self !== window.top && window.top.location.pathname.indexOf('/config') === 0) return; } catch (e) {}
'use strict';

/* ================================================
   LEGAL CONTENT CORRECTIONS
   Fixes identified via comprehensive legal audit:
   1. ULLCA misattribution on /business-formation
   2. Act 60 sunset disclaimer on /act-60-tax-incentives and /business-formation
   3. Trust Registry disclosure on /puerto-rico-trusts
   4. "Zero Hourly Billing" contradiction on /about
   5. Notarial tariff disclaimer on /services
   6. Forced heirship outdated law on /estate-planning (Ley 55-2020 updates)
   7. Closed wills eliminated on /estate-planning
   8. Witness requirement updated on /estate-planning
   9. NRNC article: estate tax exemption, $60k precision, gift tax year
  10. Act 60 compliance: charitable donation child poverty specificity
  11. About page: Judge Gelpí First Circuit elevation
  12. Act 60 disclaimer: 6-year prior residency restriction
  13. Act 60 municipal/property tax exemption percentages (75%→50%, 60%→70%)
  14. 183-day presence test: clarify all three IRC §937 tests required
  24. Act 153-2026 law-change notice across the trust cluster — the revocability
      presumption flips on Jan 30 2027, so every page still asserting
      "irrevocable by default" carries a dated callout to the new cornerstone
  26. Declaratoria de herederos: notarial route + "demanda"→"petición" (/blog/declaratoria-de-herederos-puerto-rico)
  27. Ley 60 (ES): federal vs. PR tax clarifier on "100% de exención" figures (/espanol-ley-60)
  28. Soften unsubstantiated advertising superlatives ("Expert"/"Expertise"/"trusted counsel"/"Sophisticated"/"caliber"/"extraordinarios") — site-wide
  29. Trusts page: NRNC U.S. transfer-tax caveat on estate/gift/dynasty-trust claims (/puerto-rico-trusts)
  31. Booking page (/calendly): "Free Consultation" rename + scope clarifier
      (NB: a site-wide footer "Legal Disclaimer" already exists via another script — no #30 needed)
  32. Hide duplicate Aguada blog card on /blog hub (canonical override lives in seo-fixes.js)
  33. Ley 60 (ES): three §937 residency-tests note + homepage trusts-card softening (#28 list)
   ================================================ */

var path = window.location.pathname.replace(/\/$/, '') || '/';

/* Helper: check if a node is inside one of our injected elements (rl- prefixed IDs) */
function isInsideInjectedElement(node) {
  var el = node.parentNode;
  while (el && el !== document.body) {
    if (el.id && el.id.indexOf('rl-') === 0) return true;
    el = el.parentNode;
  }
  return false;
}

/* ================================================
   1. FIX ULLCA MISATTRIBUTION (/business-formation)
   Reality: PR LLCs are governed by Chapter XIX of the
   General Corporations Act of 2009, NOT the ULLCA.
   ================================================ */
function fixULLCA() {
  if (path !== '/business-formation') return;

  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (node.nodeValue.indexOf('Puerto Rico Uniform Limited Liability Company Act') >= 0) {
      node.nodeValue = node.nodeValue.replace(
        'Puerto Rico Uniform Limited Liability Company Act',
        'General Corporations Act of 2009 (Ley General de Corporaciones)'
      );
    }
  }
}

/* ================================================
   2. ACT 60 SUNSET DISCLAIMER
   Reality: HB 505 (approved Feb 2026) ends 0% capital
   gains for applications filed after Dec 31, 2026.
   New applicants face 4% rate starting Jan 1, 2027.
   ================================================ */
function addAct60Disclaimer() {
  if (path !== '/act-60-tax-incentives' && path !== '/business-formation') return;

  /* Avoid duplicate injection */
  if (document.getElementById('rl-act60-sunset-notice')) return;

  /* Squarespace pages use .sqs-html-content as the inner content container */
  var htmlContent = document.querySelector('.sqs-html-content');
  if (!htmlContent) return;

  var notice = document.createElement('div');
  notice.id = 'rl-act60-sunset-notice';
  notice.style.cssText = 'margin:20px 0 28px;padding:18px 22px;background:#fef9e7;border:1px solid #f0c040;border-left:4px solid #d4a017;border-radius:4px;font-size:.88rem;color:#5a4a00;line-height:1.6;';
  notice.innerHTML = '<p style="margin:0 0 8px;font-weight:700;font-size:.95rem;">Important: 2026 Act 60 Legislative Changes</p>'
    + '<p style="margin:0 0 6px;">Under House Bill 505, approved by the Puerto Rico Legislature in February 2026, the <strong>0% tax rate on capital gains, interest, and dividends</strong> for Individual Resident Investors is available only for applications submitted <strong>on or before December 31, 2026</strong>.</p>'
    + '<p style="margin:0 0 6px;">Applications filed on or after January 1, 2027 will be subject to a <strong>4% preferential tax rate</strong> on passive income. Existing decree holders are grandfathered under their current terms. The program has been extended through 2055.</p>'
    + '<p style="margin:0;"><strong>If you are considering relocating to Puerto Rico, contact us immediately</strong> to begin your application before the December 31, 2026 deadline. <a href="/calendly" style="color:#8b6914;text-decoration:underline;">Schedule a strategy call</a>.</p>';

  /* Insert after the first real paragraph (skip spacer paragraphs) */
  var h1 = htmlContent.querySelector('h1');
  if (h1) {
    var sibling = h1.nextElementSibling;
    while (sibling && (sibling.textContent.trim().length < 10 || sibling.tagName !== 'P')) {
      sibling = sibling.nextElementSibling;
    }
    if (sibling && sibling.nextElementSibling) {
      htmlContent.insertBefore(notice, sibling.nextElementSibling);
      return;
    }
  }

  /* Fallback: insert after third child element */
  if (htmlContent.children.length > 3) {
    htmlContent.insertBefore(notice, htmlContent.children[3]);
  } else {
    htmlContent.appendChild(notice);
  }
}

/* Also qualify the "100% tax exemption" text inline */
function qualifyAct60Claims() {
  if (path !== '/act-60-tax-incentives' && path !== '/business-formation') return;

  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    var node = walker.currentNode;
    var text = node.nodeValue;

    /* Add asterisk to "100% tax exemption on capital gains" */
    if (text.indexOf('100% tax exemption on capital gains') >= 0 && text.indexOf('*') < 0) {
      node.nodeValue = text.replace(
        '100% tax exemption on capital gains',
        '100% tax exemption on capital gains*'
      );
    }
  }
}

/* ================================================
   3. TRUST REGISTRY DISCLOSURE (/puerto-rico-trusts)
   Reality: Act 219-2012 requires mandatory registration
   in the Special Registry of Trusts (Registro Especial
   de Fideicomisos) under penalty of absolute nullity.
   ================================================ */
function addTrustRegistryDisclosure() {
  if (path !== '/puerto-rico-trusts') return;

  /* Avoid duplicate injection */
  if (document.getElementById('rl-trust-registry-notice')) return;

  /* Squarespace pages use .sqs-html-content as the inner content container */
  var htmlContent = document.querySelector('.sqs-html-content');
  if (!htmlContent) return;

  var notice = document.createElement('div');
  notice.id = 'rl-trust-registry-notice';
  notice.style.cssText = 'margin:24px 0;padding:18px 22px;background:#fef2f2;border:1px solid #e8b4b4;border-left:4px solid #c0392b;border-radius:4px;font-size:.88rem;color:#5a1a1a;line-height:1.6;';
  notice.innerHTML = '<p style="margin:0 0 8px;font-weight:700;font-size:.95rem;">Critical Requirement: Special Registry of Trusts</p>'
    + '<p style="margin:0 0 6px;">Under the Puerto Rico Trust Act (Ley 219-2012), <strong>every trust constituted in Puerto Rico must be registered in the Special Registry of Trusts</strong> (<em>Registro Especial de Fideicomisos</em>), administered by the Office of Inspection of Notaries of the Judicial Branch.</p>'
    + '<p style="margin:0 0 6px;">This registration is a <strong>constitutive requirement</strong>, not an optional administrative step. Failure to register the trust results in <strong>absolute nullity</strong> (<em>nulidad absoluta</em>) — meaning the trust is deemed to have never legally existed, and all transferred assets revert to the grantor\'s personal estate.</p>'
    + '<p style="margin:0;">This is one of the critical reasons why trust creation in Puerto Rico requires experienced local counsel. <a href="/calendly" style="color:#8b1a1a;text-decoration:underline;">Schedule a consultation</a> to ensure your trust is properly constituted and registered.</p>';

  /* Insert before the "Trust Administration" or "Funding" section */
  var allHeadings = htmlContent.querySelectorAll('h2, h3');
  for (var i = 0; i < allHeadings.length; i++) {
    var headingText = allHeadings[i].textContent.trim().toLowerCase();
    if (headingText.indexOf('trust administration') >= 0 || headingText.indexOf('funding') >= 0) {
      htmlContent.insertBefore(notice, allHeadings[i]);
      return;
    }
  }

  /* Fallback: insert before FAQ section */
  for (var j = 0; j < allHeadings.length; j++) {
    if (allHeadings[j].textContent.trim().toLowerCase().indexOf('frequently asked') >= 0) {
      htmlContent.insertBefore(notice, allHeadings[j]);
      return;
    }
  }

  /* Final fallback: append to content */
  htmlContent.appendChild(notice);
}

/* ================================================
   4. FIX "ZERO HOURLY BILLING" CONTRADICTION (/about)
   Reality: Services page says "Hourly arrangements are
   also available." The "Zero" claim is misleading.
   ================================================ */
function fixZeroHourlyBilling() {
  if (path !== '/about' && path !== '/about-us') return;

  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (node.nodeValue.indexOf('Zero Hourly Billing') >= 0) {
      node.nodeValue = node.nodeValue.replace(
        'Zero Hourly Billing',
        'Transparent Flat-Fee Pricing'
      );
    }
    /* Also fix the body text reference */
    if (node.nodeValue.indexOf('without the overhead, the hourly billing, or the inefficiency') >= 0) {
      node.nodeValue = node.nodeValue.replace(
        'without the overhead, the hourly billing, or the inefficiency',
        'without the overhead or the inefficiency of traditional firms'
      );
    }
  }
}

/* ================================================
   4b. "NO HOURLY BILLING SURPRISES" -> "NO HOURLY BILLING" (site-wide)
   Owner directive (July 2026): remove absolute/guarantee-style flat-fee
   language such as "no surprises". Scrubs any remaining instance in
   pasted native pages (trust-costs, avoiding-probate-legitima) and any
   injected content, without requiring a Squarespace re-paste.
   ================================================ */
function fixHourlyBillingSurprises() {
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (node.nodeValue.indexOf('hourly billing surprises') >= 0) {
      node.nodeValue = node.nodeValue.replace(/hourly billing surprises/gi, 'hourly billing');
    }
  }
}

/* ================================================
   4c. CONSULTATION DURATION: "15-minute" -> "30-minute" (site-wide)
   Owner directive (July 2026): the free consultation is 30 minutes.
   The /calendly (Book an Appointment) page's native text block still
   reads "complimentary 15-minute consultation"; scrub any stray
   "15-minute" in body copy so it matches the 30-minute Calendly event.
   ================================================ */
function fixConsultationDuration() {
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (node.nodeValue.indexOf('15-minute') >= 0) {
      node.nodeValue = node.nodeValue.replace(/15-minute/g, '30-minute');
    }
  }
}

/* ================================================
   5. NOTARIAL TARIFF DISCLAIMER (/services)
   Reality: PR Arancel Notarial mandates fixed minimum
   fees for notarial acts that cannot be waived or bundled.
   ================================================ */
function addNotarialTariffDisclaimer() {
  if (path !== '/services' && path !== '/espanol-servicios') return;

  /* Avoid duplicate injection */
  if (document.getElementById('rl-notarial-tariff-notice')) return;

  var isSpanish = path.indexOf('espanol') >= 0;

  var notice = document.createElement('div');
  notice.id = 'rl-notarial-tariff-notice';
  notice.style.cssText = 'margin:20px 0 28px;padding:16px 20px;background:#f8f9fa;border:1px solid #dee2e6;border-left:4px solid #1a3a5c;border-radius:4px;font-size:.82rem;color:#495057;line-height:1.55;';

  if (isSpanish) {
    notice.innerHTML = '<p style="margin:0 0 6px;font-weight:700;font-size:.88rem;">Nota sobre Aranceles Notariales</p>'
      + '<p style="margin:0;">Las tarifas planas indicadas cubren consulta legal, dise\u00f1o estructural y preparaci\u00f3n de documentos. La otorgaci\u00f3n de escrituras p\u00fablicas est\u00e1 sujeta a <strong>aranceles notariales obligatorios</strong> (Arancel Notarial) establecidos por ley, as\u00ed como sellos de rentas internas y sellos notariales requeridos por el Estado. Estos aranceles y sellos son regulados por ley, no pueden ser dispensados ni descontados, se calculan seg\u00fan la naturaleza y valor de la transacci\u00f3n, y se facturan por separado como desembolsos requeridos.</p>';
  } else {
    notice.innerHTML = '<p style="margin:0 0 6px;font-weight:700;font-size:.88rem;">Note Regarding Notarial Fees</p>'
      + '<p style="margin:0;">The flat fees listed above cover legal consultation, structural design, and document drafting. The execution of public deeds (<em>escrituras p\u00fablicas</em>) is subject to <strong>mandatory statutory notarial tariffs</strong> (<em>Arancel Notarial</em>) and requires government internal revenue and notarial stamps. These statutory fees and stamp costs are regulated by law, cannot be waived or discounted, are calculated based on the nature and value of the transaction, and will be billed separately as required disbursements.</p>';
  }

  /* Find "Not sure which trust" paragraph — insert after it (before Business Formation section) */
  var allParagraphs = document.querySelectorAll('.sqs-html-content p');
  for (var i = 0; i < allParagraphs.length; i++) {
    if (allParagraphs[i].textContent.toLowerCase().indexOf('not sure which trust') >= 0) {
      allParagraphs[i].parentNode.insertBefore(notice, allParagraphs[i].nextElementSibling);
      return;
    }
  }

  /* Fallback: find the "Riefkohl Law is a trade name" disclaimer and insert before it */
  for (var j = allParagraphs.length - 1; j >= 0; j--) {
    if (allParagraphs[j].textContent.indexOf('Riefkohl Law is a trade name') >= 0) {
      allParagraphs[j].parentNode.insertBefore(notice, allParagraphs[j]);
      return;
    }
  }
}

/* ================================================
   6. FIX FORCED HEIRSHIP — OUTDATED LAW (/estate-planning)
   Reality: Ley 55-2020 reduced legítima from 2/3 to 1/2,
   eliminated mejora, added spouse as forced heir.
   Old article numbers (739-762) are from prior code.
   ================================================ */
function fixForcedHeirship() {
  if (path !== '/estate-planning') return;

  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    var node = walker.currentNode;
    var text = node.nodeValue;

    /* Fix "Articles 739 through 762" reference */
    if (text.indexOf('Articles 739 through 762') >= 0) {
      node.nodeValue = text.replace(
        'Under Articles 739 through 762 of the Puerto Rico Civil Code, two-thirds of your estate is reserved for your forced heirs',
        'Under the Puerto Rico Civil Code (Ley 55-2020, effective November 28, 2020), one-half of your estate is reserved for your forced heirs'
      );
    }

    /* Fix "typically your children or descendants" to include spouse */
    if (text.indexOf('typically your children or descendants') >= 0) {
      node.nodeValue = node.nodeValue.replace(
        'typically your children or descendants',
        'your children, descendants, and surviving spouse'
      );
    }
  }
}

/* Replace the three-portion paragraph with the correct two-part system */
function fixThreePortionSystem() {
  if (path !== '/estate-planning' && path.indexOf('/blog/living-trust-vs-irrevocable-trust') === -1) return;

  var allP = document.querySelectorAll('.sqs-html-content p');
  for (var i = 0; i < allP.length; i++) {
    var p = allP[i];
    if (p.textContent.indexOf('legitima estricta') >= 0 && p.textContent.indexOf('mejora') >= 0) {
      p.innerHTML = 'Under the current Civil Code (Ley 55-2020), your estate is divided into <strong>two</strong> portions: the <em>leg\u00edtima</em> (one-half reserved equally for your forced heirs\u2014your children and surviving spouse) and the <em>libre disposici\u00f3n</em> (one-half that you can freely distribute to anyone). The surviving spouse shares the <em>leg\u00edtima</em> equally with the children as a forced heir in the first order of succession. This means you cannot simply disinherit your children or leave your entire estate to a single beneficiary, as is possible in many mainland states. Proper planning with an experienced Puerto Rico estate attorney is essential to work within these requirements while still achieving your goals.';
      break;
    }
  }

  /* Blog post uses list items instead of paragraphs */
  if (path.indexOf('/blog/') === 0) {
    var allEls = document.querySelectorAll('.sqs-html-content p, .sqs-html-content li, .blog-item-content p, .blog-item-content li');
    for (var k = 0; k < allEls.length; k++) {
      var el = allEls[k];
      var txt = el.textContent;
      /* Replace "The legitima (one-third)" pattern */
      if (txt.indexOf('legitima') >= 0 && txt.indexOf('one-third') >= 0) {
        el.innerHTML = el.innerHTML.replace(/The leg[ií]tima \(one-third\)\.?\s*Must be divided equally[^.]*\.?/,
          'The <em>leg\u00edtima</em> (one-half). Must be divided equally among your forced heirs\u2014your children and surviving spouse.');
        el.innerHTML = el.innerHTML.replace(/The leg[ií]tima \(one-third\)\./,
          'The <em>leg\u00edtima</em> (one-half reserved equally for your children and surviving spouse).');
      }
      if (txt.indexOf('mejora') >= 0 && txt.indexOf('one-third') >= 0) {
        el.innerHTML = el.innerHTML.replace(/The mejora \(one-third\)\.?\s*Must go to children[^.]*\.?/,
          '<em>Note: The mejora was eliminated by Ley 55-2020. The estate is now divided into two halves: leg\u00edtima and libre disposici\u00f3n.</em>');
        el.innerHTML = el.innerHTML.replace(/The mejora \(one-third\)\./,
          '<em>(The mejora was eliminated by Ley 55-2020.)</em>');
      }
      if (txt.indexOf('free disposal') >= 0 && txt.indexOf('one-third') >= 0) {
        el.innerHTML = el.innerHTML.replace(/The free disposal portion \(one-third\)\.?\s*The only portion[^.]*\.?/,
          'The <em>libre disposici\u00f3n</em> (one-half). The portion you can freely distribute to anyone you choose.');
        el.innerHTML = el.innerHTML.replace(/The free disposal portion \(one-third\)\./,
          'The <em>libre disposici\u00f3n</em> (one-half that you can freely distribute to anyone).');
      }
    }
  }
}

/* ================================================
   7. FIX CLOSED WILLS & 8. WITNESS REQUIREMENT (/estate-planning)
   Reality: Closed wills eliminated by Ley 55-2020.
   Witnesses no longer required for open wills (Art. 1644)
   unless requested by testator or notary.
   ================================================ */
function fixWillsSection() {
  if (path !== '/estate-planning') return;

  var allP = document.querySelectorAll('.sqs-html-content p');
  for (var i = 0; i < allP.length; i++) {
    var p = allP[i];
    var text = p.textContent;

    /* Fix "recognizes closed wills" */
    if (text.indexOf('recognizes closed wills') >= 0) {
      p.innerHTML = p.innerHTML.replace(
        /Puerto Rico also recognizes closed wills and holographic wills[^.]*\./,
        'Under the prior Civil Code, Puerto Rico also recognized closed wills (<em>testamento cerrado</em>), but this form was <strong>eliminated by Ley 55-2020</strong>. Puerto Rico now recognizes only two types: open notarial wills and holographic wills (<em>testamento ol\u00f3grafo</em>), though holographic wills have strict requirements to be valid.'
      );
    }

    /* Fix "must be executed before a notary public and witnesses" */
    if (text.indexOf('executed before a notary public and witnesses') >= 0) {
      p.innerHTML = p.innerHTML.replace(
        'must be executed before a notary public and witnesses',
        'must be executed before a notary public. Under the current Civil Code (Art. 1644), witnesses are no longer mandatory for open wills unless requested by the testator or the notary'
      );
    }
  }

  /* Also fix the will checklist items that reference mejora */
  var allLi = document.querySelectorAll('.sqs-html-content li');
  for (var j = 0; j < allLi.length; j++) {
    var li = allLi[j];
    if (li.textContent.indexOf('allocate the mejora') >= 0) {
      li.innerHTML = li.innerHTML.replace(
        /allocate the mejora among forced heirs if desired/,
        'designate how the <em>libre disposici\u00f3n</em> (free disposition half) is distributed'
      );
    }
  }
}

/* ================================================
   9. FIX NRNC ARTICLE (/puerto-rico-estate-planning-nrnc-classification)
   - Estate tax exemption: $13.61M → $15M (OBBBA, signed July 2025)
   - $60,000: clarify as exemption equivalent of unified credit
   - Gift tax exclusion year: 2025 → 2026
   ================================================ */
function fixNRNCArticle() {
  if (path !== '/puerto-rico-estate-planning-nrnc-classification') return;

  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    var node = walker.currentNode;
    var text = node.nodeValue;

    /* Fix estate tax exemption amount and sunset language */
    if (text.indexOf('$13.61 million') >= 0) {
      node.nodeValue = text.replace(
        'approximately $13.61 million (scheduled to increase and then potentially revert)',
        '$15 million per individual (as set by the One Big Beautiful Bill Act, signed into law July 2025, which made the increased exemption permanent with future inflation indexing)'
      );
    }

    /* Fix gift tax exclusion year */
    if (text.indexOf('$19,000 for 2025') >= 0) {
      node.nodeValue = node.nodeValue.replace(
        '$19,000 for 2025',
        '$19,000 for 2026'
      );
    }

    /* Fix "$18,000 per beneficiary in 2025" if present */
    if (text.indexOf('$18,000 per beneficiary in 2025') >= 0) {
      node.nodeValue = node.nodeValue.replace(
        '$18,000 per beneficiary in 2025',
        '$19,000 per beneficiary in 2026'
      );
    }
  }

  /* Fix $60,000 section — add precision about unified credit vs filing threshold */
  var headings = document.querySelectorAll('.sqs-html-content h2, .sqs-html-content h3');
  for (var i = 0; i < headings.length; i++) {
    if (headings[i].textContent.indexOf('$60,000 Estate Tax Exemption') >= 0) {
      headings[i].textContent = 'The NRNC Estate Tax Unified Credit';

      /* Find the next paragraph and clarify */
      var nextP = headings[i].nextElementSibling;
      while (nextP && nextP.tagName !== 'P') nextP = nextP.nextElementSibling;
      if (nextP && nextP.textContent.indexOf('$60,000') >= 0) {
        nextP.innerHTML = 'One of the most significant consequences of NRNC classification is the reduced estate tax exemption. While U.S. citizens and residents currently benefit from an estate tax exemption of <strong>$15 million</strong> per individual (under the One Big Beautiful Bill Act, signed July 2025), NRNCs are subject to a unified credit of only <strong>$13,000</strong> under IRC \u00a72102(b)\u2014the equivalent of an exemption of approximately $60,000. Note: $60,000 is also the filing threshold for Form 706-NA, but the actual tax benefit is calculated from the unified credit, which may result in an effective exemption <em>lower</em> than $60,000 depending on how the estate\u2019s assets are distributed between U.S.-situs and worldwide holdings (see IRC \u00a72102(b)(2) for the proportional credit calculation applicable to \u00a72209 NRNCs).';
      }
      break;
    }
  }
}

/* ================================================
   10. FIX COMPLIANCE ARTICLE — CHARITABLE DONATION
   (/act-60-compliance-requirements-audit-triggers)
   Reality: At least $5,000 must go to organizations
   focused on eradicating child poverty (CECFL list),
   not just any PR nonprofit.
   ================================================ */
function fixComplianceCharitableDonation() {
  if (path !== '/act-60-compliance-requirements-audit-triggers' &&
      path !== '/act-60-tax-incentives') return;

  var allP = document.querySelectorAll('.sqs-html-content p, .sqs-code-container p');
  for (var i = 0; i < allP.length; i++) {
    var p = allP[i];
    /* Fix compliance article — clarify CECFL allocation ($10K total, $5K child poverty) */
    if (p.textContent.indexOf('$5,000 directed to a qualifying Puerto Rico nonprofit organization') >= 0) {
      p.innerHTML = p.innerHTML.replace(
        'at least $5,000 directed to a qualifying Puerto Rico nonprofit organization',
        'at least $5,000 directed to an organization approved by the <em>Comisi\u00f3n Especial Conjunta de Fondos Legislativos para Impacto Comunitario</em> (CECFL) that works to <strong>eradicate child poverty</strong> in Puerto Rico'
      );
    }
  }

  /* Fix Act 60 page inline references to "$10,000 annual charitable donation" */
  if (path === '/act-60-tax-incentives') {
    var allEls = document.querySelectorAll('.sqs-html-content li, .sqs-code-container li, .sqs-html-content p, .sqs-code-container p');
    for (var j = 0; j < allEls.length; j++) {
      var el = allEls[j];
      var elText = el.textContent;
      /* Pattern: "...donation of $10,000 to qualifying Puerto Rico nonprofits" — add CECFL detail */
      if (elText.indexOf('$10,000 to qualifying') >= 0) {
        el.innerHTML = el.innerHTML.replace(
          /(?:charitable )?donation of \$10,000 to qualifying Puerto Rico nonprofits\.?/,
          'charitable donation of $10,000 (at least $5,000 to CECFL-approved organizations focused on eradicating child poverty).'
        );
      }
      /* Pattern: "$10,000 annual charitable donations" — add CECFL detail */
      if (elText.indexOf('$10,000 annual charitable donation') >= 0) {
        el.innerHTML = el.innerHTML.replace(
          /\$10,000 annual charitable donations?/,
          '$10,000 annual charitable donation (at least $5,000 to CECFL-approved organizations focused on eradicating child poverty)'
        );
      }
    }
  }
}

/* ================================================
   11. FIX JUDGE GELPÍ REFERENCE (/about)
   Reality: Judge Gelpí was elevated to the U.S. Court
   of Appeals for the First Circuit in October 2021.
   ================================================ */
function fixJudgeGelpiReference() {
  if (path !== '/about' && path !== '/about-us') return;

  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (node.nodeValue.indexOf('Judge Gustavo A. Gelp') >= 0 &&
        node.nodeValue.indexOf('District Court for the District of Puerto Rico') >= 0 &&
        node.nodeValue.indexOf('First Circuit') < 0) {
      node.nodeValue = node.nodeValue.replace(
        'Judge Gustavo A. Gelp\u00ed at the U.S. District Court for the District of Puerto Rico',
        'Judge Gustavo A. Gelp\u00ed (now of the U.S. Court of Appeals for the First Circuit) at the U.S. District Court for the District of Puerto Rico'
      );
    }
  }
}

/* ================================================
   12. ADD 6-YEAR RESIDENCY RESTRICTION TO ACT 60 DISCLAIMER
   Reality: HB 505 also added a requirement that new
   applicants (post-2026) must not have been PR residents
   for at least 6 years prior to applying.
   ================================================ */
function updateAct60Disclaimer() {
  /* Runs after addAct60Disclaimer — updates the existing notice */
  var notice = document.getElementById('rl-act60-sunset-notice');
  if (!notice) return;

  /* Only add if not already present */
  if (notice.innerHTML.indexOf('6 years') >= 0) return;

  var lastP = notice.querySelectorAll('p');
  if (lastP.length >= 2) {
    /* Insert new paragraph before the CTA */
    var newP = document.createElement('p');
    newP.style.cssText = 'margin:0 0 6px;';
    newP.innerHTML = 'New applicants filing after 2026 must also demonstrate they were <strong>not a Puerto Rico resident for at least 6 years</strong> prior to their application.';
    notice.insertBefore(newP, lastP[lastP.length - 1]);
  }
}

/* ================================================
   13. FIX ACT 60 MUNICIPAL/PROPERTY TAX EXEMPTION PERCENTAGES
   Reality: Municipal license tax exemption = 50% (not 75%).
   Property tax exemption = 75% (not 60%).
   These were swapped/incorrect across multiple pages.
   ================================================ */
function fixAct60ExemptionPercentages() {
  var targets = ['/act-60-tax-incentives', '/business-formation'];
  var isTarget = false;
  for (var t = 0; t < targets.length; t++) {
    if (path === targets[t]) { isTarget = true; break; }
  }
  /* Also fix on blog posts about Act 60 */
  if (path.indexOf('/blog/') === 0) isTarget = true;
  if (!isTarget) return;

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (isInsideInjectedElement(node)) continue;

    var text = node.nodeValue;

    /* Fix "75% exemption on municipal" -> "50% exemption on municipal"
       Use proximity-aware regex: only change 75% when followed (within ~40 chars) by municipal/patente */
    if (text.indexOf('75%') >= 0 && (text.indexOf('municipal') >= 0 || text.indexOf('patente') >= 0)) {
      node.nodeValue = text.replace(/75%([\s\w]{0,40})(municipal|patente)/g, '50%$1$2');
    }

    /* Fix "60% exemption on...property" -> "75% exemption on...property"
       Use proximity-aware regex: only change 60% when followed (within ~40 chars) by property */
    text = node.nodeValue; /* re-read after possible change */
    if (text.indexOf('60%') >= 0 && text.indexOf('property') >= 0) {
      node.nodeValue = text.replace(/60%([\s\w]{0,40})(property)/g, '75%$1$2');
    }
  }
}

/* ================================================
   14. CLARIFY 183-DAY PRESENCE TEST
   Reality: Bona fide residency under IRC §937 requires
   THREE tests: (1) 183-day presence, (2) tax home,
   (3) closer connection. 183 days alone is NOT sufficient.
   This fix adds a clarification note after any paragraph
   on Act 60 pages that mentions "183 days" without also
   mentioning "tax home" or "three tests."
   ================================================ */
function clarify183DayPresenceTest() {
  var act60Pages = ['/act-60-tax-incentives', '/resources/ley-60-guia-inversionistas'];
  var isAct60 = false;
  for (var t = 0; t < act60Pages.length; t++) {
    if (path === act60Pages[t]) { isAct60 = true; break; }
  }
  if (!isAct60) return;

  /* Find paragraphs and list items that mention 183 days without full context */
  var elements = document.querySelectorAll('p, li');
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var text = el.textContent || '';
    if (text.indexOf('183') < 0) continue;
    /* Skip if already clarified (mentions all three tests or tax home) */
    if (text.indexOf('tax home') >= 0 || text.indexOf('hogar contributivo') >= 0 ||
        text.indexOf('three test') >= 0 || text.indexOf('tres prueba') >= 0 ||
        text.indexOf('IRC') >= 0 || text.indexOf('\u00a7937') >= 0) continue;
    /* Skip if already has our clarification marker */
    if (el.getAttribute('data-183-clarified')) continue;
    el.setAttribute('data-183-clarified', 'true');

    /* Add inline clarification */
    var note = document.createElement('em');
    note.style.display = 'block';
    note.style.fontSize = '0.9em';
    note.style.marginTop = '4px';
    note.style.color = '#555';
    note.textContent = 'Note: 183 days of physical presence is only one of three IRC \u00a7937 bona fide residency tests. You must also satisfy the Tax Home Test and the Closer Connection Test.';
    if (document.documentElement.lang === 'es' || path.indexOf('ley-60') >= 0 || path.indexOf('guia-inversionistas') >= 0) {
      note.textContent = 'Nota: 183 d\u00edas de presencia f\u00edsica es solo una de las tres pruebas de residencia bona fide del IRC \u00a7937. Tambi\u00e9n debe cumplir la Prueba de Hogar Contributivo y la Prueba de Conexi\u00f3n M\u00e1s Estrecha.';
    }
    el.parentNode.insertBefore(note, el.nextSibling);
  }
}

/* ================================================
   15. ADD SMALL BUSINESS 100% EXEMPTION NOTE
   Reality: Businesses under $3M volume qualify for
   100% property & municipal exemption for first 5 years.
   ================================================ */
function addSmallBusinessExemptionNote() {
  if (path !== '/act-60-tax-incentives' && path !== '/business-formation') return;
  if (document.getElementById('rl-small-biz-exemption-note')) return;

  /* Find elements mentioning property tax or municipal tax exemptions */
  var elements = document.querySelectorAll('.sqs-html-content li, .sqs-html-content p, .sqs-code-container li, .sqs-code-container p');
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var text = el.textContent || '';
    if ((text.indexOf('75%') >= 0 && text.indexOf('property') >= 0) ||
        (text.indexOf('50%') >= 0 && text.indexOf('municipal') >= 0)) {
      /* Check if the note already exists nearby */
      if (el.parentNode.querySelector('#rl-small-biz-exemption-note')) return;
      var note = document.createElement('p');
      note.id = 'rl-small-biz-exemption-note';
      note.style.cssText = 'margin:8px 0 16px;padding:10px 14px;background:#f0f7f0;border-left:3px solid #27ae60;border-radius:0 4px 4px 0;font-size:.84rem;color:#2d572c;line-height:1.5;';
      note.innerHTML = '<strong>Small business benefit:</strong> Businesses with annual gross income under $3 million may qualify for <strong>100% exemption</strong> on both property and municipal license taxes during the first five years of operations.';
      /* Insert after the last matching element in the same list/section */
      el.parentNode.insertBefore(note, el.nextSibling);
      return;
    }
  }
}

/* ================================================
   16. FIX CONFLICTING ACT 38-2026 / HB 505 DATES
   Reality: Some pages say 0% ends "after 2025" or
   "starting January 1, 2026" — the correct deadline
   is December 31, 2026 (4% applies Jan 1, 2027+).
   ================================================ */
function fixConflictingAct38Dates() {
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    /* Skip nodes inside our own injected elements */
    if (isInsideInjectedElement(node)) continue;
    var text = node.nodeValue;

    /* Fix "after 2025" in context of Act 60 rate changes */
    if (text.indexOf('after 2025') >= 0 && (text.indexOf('4%') >= 0 || text.indexOf('capital gains') >= 0 || text.indexOf('Act 60') >= 0)) {
      node.nodeValue = text.replace('after 2025', 'for applications filed on or after January 1, 2027');
    }

    /* Fix "starting January 1, 2026" -> "starting January 1, 2027" */
    text = node.nodeValue;
    if (text.indexOf('starting January 1, 2026') >= 0 && (text.indexOf('4%') >= 0 || text.indexOf('new rate') >= 0 || text.indexOf('Act 60') >= 0)) {
      node.nodeValue = text.replace('starting January 1, 2026', 'starting January 1, 2027');
    }

    /* Fix "new investors face the 4% rate starting...2026" pattern */
    text = node.nodeValue;
    if (text.indexOf('2026') >= 0 && text.indexOf('4% rate') >= 0 && text.indexOf('new') >= 0 && text.indexOf('2027') < 0) {
      node.nodeValue = text.replace(/face[sd]? (?:a |the )?4% rate (?:starting |beginning |from )(?:January 1, )?2026/,
        'face a 4% rate for applications filed on or after January 1, 2027');
    }
  }
}

/* ================================================
   17. FIX "4% FOR ALL RESIDENTS" CLAIM
   Reality: The enacted Act 38-2026 ties the 4% rate
   exclusively to Act 60 decree holders, NOT all PR
   residents. The earlier HB 505 draft language about
   extending 4% to all residents was not enacted.
   ================================================ */
function fixFourPercentAllResidentsClaim() {
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (isInsideInjectedElement(node)) continue;
    var text = node.nodeValue;

    /* Fix "even without an Act 60 decree" claim */
    if (text.indexOf('without an Act 60 decree') >= 0 && text.indexOf('4%') >= 0) {
      node.nodeValue = text.replace(
        /[Ee]ven without an Act 60 decree,?\s*residents may pay just 4% on capital gains/,
        'Under Act 38-2026, Individual Resident Investor decree holders who apply after December 31, 2026 will pay 4% on post-residency capital gains, interest, and dividends'
      );
    }

    /* Fix "4% for all residents" or "all Puerto Rico residents" in context of capital gains */
    text = node.nodeValue;
    if (text.indexOf('all residents') >= 0 && text.indexOf('4%') >= 0 && text.indexOf('capital gains') >= 0) {
      node.nodeValue = text.replace(
        /4%[^.]*all (?:Puerto Rico )?residents/,
        '4% preferential rate for Act 60 Individual Resident Investor decree holders (applications filed after December 31, 2026)'
      );
    }
  }
}

/* ================================================
   18. ADD CHARITABLE DONATION RESTRICTION NOTE
   Reality: Annual donation is $10,000 (at least $5,000
   to CECFL child-poverty orgs). Separate $5,000 annual
   report fee. Donations cannot go to entities controlled
   by relatives within 4th degree consanguinity /
   2nd degree affinity.
   ================================================ */
function updateCharitableDonationHB505() {
  /* Add restriction note after charitable donation list items or paragraphs */
  if (path !== '/act-60-tax-incentives' && path !== '/act-60-compliance-requirements-audit-triggers') return;
  if (document.getElementById('rl-donation-restrictions-note')) return;

  var elements = document.querySelectorAll('.sqs-html-content li, .sqs-html-content p, .sqs-code-container li, .sqs-code-container p');
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if ((el.textContent.indexOf('$10,000') >= 0 || el.textContent.indexOf('charitable') >= 0) &&
        el.textContent.indexOf('donation') >= 0) {
      /* Check if note already exists */
      if (el.parentNode.querySelector('#rl-donation-restrictions-note')) return;
      var note = document.createElement('p');
      note.id = 'rl-donation-restrictions-note';
      note.style.cssText = 'margin:6px 0 14px;padding:10px 14px;background:#fdf6ec;border-left:3px solid #e67e22;border-radius:0 4px 4px 0;font-size:.82rem;color:#7d4e00;line-height:1.5;';
      note.innerHTML = '<strong>Donation restrictions:</strong> At least half of the $10,000 annual donation must go to CECFL-approved organizations dedicated to <strong>eradicating child poverty</strong> in Puerto Rico. Donations <strong>cannot</strong> be made to entities controlled by relatives within the fourth degree of consanguinity or second degree of affinity. In addition to the donation, decree holders pay a <strong>$5,000 annual report fee</strong>.';
      el.parentNode.insertBefore(note, el.nextSibling);
      return;
    }
  }
}

/* ================================================
   19. ADD PRE-MOVE CAPITAL GAINS TREATMENT
   Reality: Pre-move appreciation is NOT exempt.
   Within 10 years: federal rate. After 10 years: 5% PR.
   Split holding period for crypto and other assets.
   ================================================ */
function addPreMoveCapitalGainsNote() {
  if (path !== '/act-60-tax-incentives') return;
  if (document.getElementById('rl-premove-gains-note')) return;

  /* Find the "100% tax exemption on capital gains" element */
  var elements = document.querySelectorAll('.sqs-html-content p, .sqs-html-content li, .sqs-code-container p, .sqs-code-container li');
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if (el.textContent.indexOf('capital gains accrued after') >= 0 || el.textContent.indexOf('100% tax exemption on capital gains') >= 0) {
      var note = document.createElement('div');
      note.id = 'rl-premove-gains-note';
      note.style.cssText = 'margin:12px 0 18px;padding:16px 20px;background:#f5f0ff;border:1px solid #d4c5f0;border-left:4px solid #7c3aed;border-radius:4px;font-size:.86rem;color:#3b1f6e;line-height:1.6;';
      note.innerHTML = '<p style="margin:0 0 8px;font-weight:700;font-size:.92rem;">What About Pre-Move Capital Gains?</p>'
        + '<p style="margin:0 0 6px;">The 0% (or 4% for post-2026 applicants) exemption applies <strong>only to gains accrued after</strong> you become a bona fide Puerto Rico resident. Appreciation that occurred <strong>before</strong> your move is treated differently:</p>'
        + '<ul style="margin:6px 0;padding:0 0 0 20px;">'
        + '<li style="margin:0 0 4px;"><strong>Realized within 10 years of residency:</strong> Subject to U.S. federal capital gains tax rates</li>'
        + '<li style="margin:0 0 4px;"><strong>Realized after 10 years of PR residency:</strong> Subject to a 5% Puerto Rico tax rate</li>'
        + '<li style="margin:0;"><strong>Cryptocurrency and other assets:</strong> A "split holding period" analysis is required to bifurcate pre-move vs. post-move appreciation. The IRS has issued memorandums specifically targeting aggressive sourcing of pre-residency crypto gains to Puerto Rico.</li>'
        + '</ul>'
        + '<p style="margin:6px 0 0;"><a href="/calendly" style="color:#5b21b6;text-decoration:underline;">Schedule a consultation</a> to discuss the tax treatment of your specific asset portfolio before relocating.</p>';
      el.parentNode.insertBefore(note, el.nextSibling);
      return;
    }
  }
}

/* ================================================
   20. DISCLOSE SPECIFIC APPLICATION FEES
   Reality: Site mentions "required fees" without
   specifying amounts. Prospects need this for due diligence.
   ================================================ */
function addFeeDisclosure() {
  if (path !== '/act-60-tax-incentives') return;
  if (document.getElementById('rl-fee-disclosure')) return;

  /* Find a reference to "required fees" or "application" in context of fees */
  var elements = document.querySelectorAll('.sqs-html-content p, .sqs-html-content li, .sqs-code-container p, .sqs-code-container li');
  var insertAfter = null;
  for (var i = 0; i < elements.length; i++) {
    var text = elements[i].textContent || '';
    if ((text.indexOf('required fees') >= 0 || text.indexOf('application fee') >= 0 || text.indexOf('filing fee') >= 0) ||
        (text.indexOf('annual report') >= 0 && text.indexOf('fee') >= 0)) {
      insertAfter = elements[i];
      break;
    }
  }

  /* If no match, find the compliance/requirements section */
  if (!insertAfter) {
    var headings = document.querySelectorAll('.sqs-html-content h2, .sqs-html-content h3');
    for (var j = 0; j < headings.length; j++) {
      var hText = headings[j].textContent.toLowerCase();
      if (hText.indexOf('compliance') >= 0 || hText.indexOf('requirement') >= 0 || hText.indexOf('cost') >= 0) {
        insertAfter = headings[j];
        break;
      }
    }
  }

  if (!insertAfter) return;

  var table = document.createElement('div');
  table.id = 'rl-fee-disclosure';
  table.style.cssText = 'margin:16px 0 24px;padding:18px 22px;background:#f8f9fa;border:1px solid #dee2e6;border-radius:6px;font-size:.86rem;line-height:1.6;';
  table.innerHTML = '<p style="margin:0 0 10px;font-weight:700;font-size:.92rem;">Act 60 Application & Annual Fees</p>'
    + '<table style="width:100%;border-collapse:collapse;font-size:.84rem;">'
    + '<thead><tr style="border-bottom:2px solid #bfa35d;text-align:left;"><th style="padding:6px 10px;">Fee Type</th><th style="padding:6px 10px;">Individual Investor (Ch. 2)</th><th style="padding:6px 10px;">Export Services (Ch. 3)</th></tr></thead>'
    + '<tbody>'
    + '<tr style="border-bottom:1px solid #e9ecef;"><td style="padding:6px 10px;">Application fee</td><td style="padding:6px 10px;"><strong>$5,000</strong></td><td style="padding:6px 10px;"><strong>$1,000</strong></td></tr>'
    + '<tr style="border-bottom:1px solid #e9ecef;"><td style="padding:6px 10px;">Entity registration</td><td style="padding:6px 10px;">$250</td><td style="padding:6px 10px;">$150</td></tr>'
    + '<tr style="border-bottom:1px solid #e9ecef;"><td style="padding:6px 10px;">Annual report fee</td><td style="padding:6px 10px;"><strong>$5,000</strong></td><td style="padding:6px 10px;"><strong>$500</strong></td></tr>'
    + '<tr><td style="padding:6px 10px;">Annual charitable donation</td><td style="padding:6px 10px;">$10,000</td><td style="padding:6px 10px;">N/A</td></tr>'
    + '</tbody></table>'
    + '<p style="margin:8px 0 0;font-size:.8rem;color:#6c757d;"><em>Fees are subject to change. Contact our office for current fee schedules and a complete cost analysis.</em></p>';

  insertAfter.parentNode.insertBefore(table, insertAfter.nextSibling);
}

/* ================================================
   21. FIX CRYPTOCURRENCY OVERSIMPLIFICATION
   Reality: Marketing says "0% tax on crypto acquired
   after moving" without mentioning split holding period
   or IRS enforcement memorandums.
   ================================================ */
function fixCryptoOversimplification() {
  /* Skip if the pre-move capital gains note already covers crypto (avoids duplicate content) */
  if (document.getElementById('rl-premove-gains-note')) return;

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    var text = node.nodeValue;

    /* Skip nodes inside elements we injected */
    if (node.parentNode.id && node.parentNode.id.indexOf('rl-') === 0) continue;

    /* Find "crypto" mentions alongside "0%" or "tax exemption" */
    if ((text.indexOf('crypto') >= 0 || text.indexOf('cryptocurrency') >= 0 || text.indexOf('digital asset') >= 0) &&
        (text.indexOf('0%') >= 0 || text.indexOf('tax exemption') >= 0 || text.indexOf('tax-free') >= 0)) {
      /* Don't modify if already clarified */
      if (text.indexOf('split holding') >= 0 || text.indexOf('pre-residency') >= 0) continue;
      if (node.parentNode.getAttribute('data-crypto-clarified')) continue;
      node.parentNode.setAttribute('data-crypto-clarified', 'true');

      var note = document.createElement('em');
      note.style.cssText = 'display:block;margin-top:6px;font-size:.88em;color:#555;line-height:1.5;';
      note.innerHTML = '<strong>Important:</strong> This exemption applies only to gains accrued <em>after</em> establishing bona fide PR residency. Pre-residency crypto holdings are subject to a "split holding period" analysis, and pre-move appreciation remains subject to U.S. federal capital gains taxes. The IRS has issued enforcement memorandums specifically targeting aggressive crypto sourcing to Puerto Rico.';
      node.parentNode.appendChild(note);
    }
  }
}

/* ================================================
   22. CLARIFY EMPLOYMENT REQUIREMENTS ($3M THRESHOLD)
   Reality: One FTE for businesses under $3M revenue;
   three FTEs for industrial incentives. The owner can
   count as the employee.
   ================================================ */
function fixEmploymentRequirements() {
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (isInsideInjectedElement(node)) continue;
    var text = node.nodeValue;

    if (text.indexOf('at least one full-time employee in addition to the owner') >= 0) {
      node.nodeValue = text.replace(
        'at least one full-time employee in addition to the owner within the first two years',
        'at least one full-time Puerto Rico\u2013resident employee (which may include the business owner). Businesses with annual gross income exceeding $3 million have higher employment thresholds; industrial incentive grantees must maintain at least three employees'
      );
    }

    /* Also fix "typically at least one full-time employee" variant */
    text = node.nodeValue;
    if (text.indexOf('typically at least one full-time employee') >= 0 && text.indexOf('in addition to the owner') >= 0) {
      node.nodeValue = text.replace(
        /typically at least one full-time employee in addition to the owner[^).]*/,
        'at least one full-time Puerto Rico\u2013resident employee (the owner may count). Businesses exceeding $3M gross income have higher thresholds'
      );
    }
  }
}

/* ================================================
   23. FIX DECREE DURATION DESCRIPTION
   Reality: Ch. 3 = 15 years + 15-year extension (30 total).
   Ch. 2 = tied to statutory period (now 2055 under HB 505).
   "15 years with option to extend" is vague/inaccurate.
   ================================================ */
function fixDecreeDuration() {
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (isInsideInjectedElement(node)) continue;
    var text = node.nodeValue;

    if (text.indexOf('15 years with the option to extend') >= 0 || text.indexOf('15 years with an option to extend') >= 0) {
      node.nodeValue = text.replace(
        /15 years with (?:the |an )?option to extend/,
        '15 years, with an extension of 15 additional years for a total of up to 30 years (Export Services, Ch. 3). For Individual Resident Investors (Ch. 2), benefits are available through December 31, 2055 under Act 38-2026'
      );
    }
  }
}

/* ================================================
   24. ACT 153-2026 LAW-CHANGE NOTICE (trust cluster)
   Was: "PR trusts are irrevocable by default" on
   /estate-planning. Act 153-2026 \u2014 signed Jul 30 2026,
   effective Jan 30 2027 \u2014 reverses that presumption, so
   the old notice became affirmatively wrong and the whole
   trust cluster still asserts the pre-2026 rule in its
   native body copy.

   Rather than re-paste a dozen native pages, this stamps a
   dated law-change callout on every page in the cluster and
   points readers at the new cornerstone. Body copy on those
   pages is corrected on its own schedule; this guarantees no
   visitor (or crawler, or LLM) reads the stale rule without
   also reading that it changed.
   ================================================ */

/* The two cornerstone pages must exist in Squarespace before anything links to
   them — 24 pages pointing at a 404 is worse than 24 pages with no link.
   FLIP TO true the moment /resources/revocable-trusts-puerto-rico and
   /resources/fideicomisos-revocables-puerto-rico are published. Same flag lives
   in js/resources-fix.js (ACT153_PAGES_LIVE) — flip both together.
   While false the notice still runs: the law change is true regardless, and a
   reader of stale copy should see it. Only the deep link is withheld. */
var ACT153_PAGES_LIVE = true;

/* Exact paths carrying the old irrevocable-by-default rule. */
var ACT153_NOTICE_PAGES = [
  '/estate-planning',
  '/puerto-rico-trusts',
  '/espanol-fideicomisos',
  '/resources/complete-guide-puerto-rico-trusts',
  '/resources/what-is-puerto-rico-trust',
  '/resources/trust-vs-will-puerto-rico',
  '/resources/asset-protection-trusts-pr',
  '/resources/asset-protection-irrevocable-trusts',
  '/resources/modifying-irrevocable-trusts',
  '/resources/act-60-trust-planning',
  '/resources/mainland-trust-to-puerto-rico',
  '/resources/ilits-and-slats',
  '/resources/family-trust-pitfalls',
  '/resources/fiduciary-duties-trustees',
  '/resources/trust-taxation-act-60',
  '/resources/trust-costs-puerto-rico',
  '/resources/special-needs-trusts-medicaid',
  '/resources/estate-planning-act-60-relocatees',
  '/resources/avoiding-probate-legitima',
  /* Spanish */
  '/resources/que-es-un-fideicomiso-en-puerto-rico',
  '/resources/fideicomiso-irrevocable-puerto-rico',
  '/resources/cuanto-cuesta-un-fideicomiso-en-puerto-rico',
  '/resources/como-evitar-el-proceso-sucesorio-en-puerto-rico',
  '/resources/planificacion-sucesoral-puerto-rico',
  '/resources/planificacion-sucesoral-ley-60-nuevos-residentes',
  '/blog/cpa-bridge-trust-advice',
  '/blog/cpa-bridge-trust-advice-es'
];

/* Spanish-language pages get the Spanish notice. */
var ACT153_ES_PAGES = [
  '/espanol-fideicomisos',
  '/blog/cpa-bridge-trust-advice-es',
  '/resources/que-es-un-fideicomiso-en-puerto-rico',
  '/resources/fideicomiso-irrevocable-puerto-rico',
  '/resources/cuanto-cuesta-un-fideicomiso-en-puerto-rico',
  '/resources/como-evitar-el-proceso-sucesorio-en-puerto-rico',
  '/resources/planificacion-sucesoral-puerto-rico',
  '/resources/planificacion-sucesoral-ley-60-nuevos-residentes'
];

function addTrustIrrevocabilityNotice() {
  /* Never on the two pages that are themselves about Act 153-2026. */
  if (path === '/resources/revocable-trusts-puerto-rico') return;
  if (path === '/resources/fideicomisos-revocables-puerto-rico') return;

  var applies = ACT153_NOTICE_PAGES.indexOf(path) >= 0 ||
                path.indexOf('/resources/trust-law-series/') === 0;
  if (!applies) return;

  if (document.getElementById('rl-act153-notice')) return;

  /* The native /resources pages live in a Code block, NOT an .sqs-html-content
     block — on those pages .sqs-html-content is an unrelated stub near the page
     footer, so scoping the search to it dropped the notice ~9,500px down, below
     the whole article. Anchor on .rl-sub (the native wrapper) first and fall back
     to .sqs-html-content only for ordinary Squarespace pages. */
  var sub = document.querySelector('.rl-sub');
  var htmlContent = document.querySelector('.sqs-html-content');
  if (!sub && !htmlContent) return;

  var isES = ACT153_ES_PAGES.indexOf(path) >= 0;

  var notice = document.createElement('div');
  notice.id = 'rl-act153-notice';
  notice.style.cssText = 'margin:24px 0;padding:18px 22px;background:#fff8f0;border:1px solid #f0d4a8;border-left:4px solid #d4870e;border-radius:4px;font-size:.88rem;color:#5a3e00;line-height:1.6;';

  if (isES) {
    notice.innerHTML =
      '<p style="margin:0 0 8px;font-weight:700;font-size:.95rem;">Actualizaci\u00f3n legislativa &mdash; Ley 153-2026 (vigente el 30 de enero de 2027)</p>'
      + '<p style="margin:0 0 6px;">La <strong>Ley 153-2026</strong>, firmada el 30 de julio de 2026, reconoce expresamente el <strong>fideicomiso revocable</strong> en Puerto Rico e <strong>invierte la presunci\u00f3n</strong> de la Ley 219-2012. Desde el 30 de enero de 2027, la escritura que nada diga sobre revocabilidad se presume <em>revocable</em>. Todo instrumento otorgado bajo la norma anterior merece una revisi\u00f3n.</p>'
      + (ACT153_PAGES_LIVE
          ? '<p style="margin:0;"><a href="/resources/fideicomisos-revocables-puerto-rico" style="color:#8b5e00;text-decoration:underline;">Lea qu\u00e9 cambia con la Ley 153-2026</a> o <a href="/espanol-cita" style="color:#8b5e00;text-decoration:underline;">agende una consulta</a> para revisar su instrumento antes de que entre en vigor.</p>'
          : '<p style="margin:0;"><a href="/espanol-cita" style="color:#8b5e00;text-decoration:underline;">Agende una consulta</a> para revisar su instrumento antes de que entre en vigor.</p>');
  } else {
    notice.innerHTML =
      '<p style="margin:0 0 8px;font-weight:700;font-size:.95rem;">Law change &mdash; Act 153-2026, effective January 30, 2027</p>'
      + '<p style="margin:0 0 6px;"><strong>Act 153-2026</strong>, signed July 30, 2026, expressly recognizes the <strong>revocable trust</strong> in Puerto Rico and <strong>reverses the presumption</strong> set by Law 219-2012. From January 30, 2027, a trust deed that says nothing about revocability is presumed <em>revocable</em>. Any instrument drafted under the earlier rule is worth a review.</p>'
      + (ACT153_PAGES_LIVE
          ? '<p style="margin:0;"><a href="/resources/revocable-trusts-puerto-rico" style="color:#8b5e00;text-decoration:underline;">Read what Act 153-2026 changes</a>, or <a href="/calendly" style="color:#8b5e00;text-decoration:underline;">schedule a consultation</a> to review your instrument before it takes effect.</p>'
          : '<p style="margin:0;"><a href="/calendly" style="color:#8b5e00;text-decoration:underline;">Schedule a consultation</a> to review your instrument before it takes effect.</p>');
  }

  /* Native page: drop it above the first body heading, i.e. below the hero, the
     back-link and the "current as of" line \u2014 the first thing read before any of
     the stale copy. Ordinary page: top of the content block. */
  if (sub) {
    var firstH2 = sub.querySelector('h2');
    if (firstH2) {
      sub.insertBefore(notice, firstH2);
      return;
    }
    var hero = sub.querySelector('.rl-sub-hero');
    if (hero && hero.parentNode) {
      hero.parentNode.insertBefore(notice, hero.nextSibling);
      return;
    }
    sub.insertBefore(notice, sub.firstChild);
    return;
  }
  htmlContent.insertBefore(notice, htmlContent.firstChild);
}

/* ================================================
   24b. CORRECT THE SUPERSEDED IRREVOCABILITY PROSE
   The banner above warns that the rule changed, but the
   body copy still states the old rule as fact \u2014 and on the
   pages in schema-markup.js's FAQ_SCAN_PAGES that prose is
   scraped into FAQPage structured data, so Google is being
   fed the superseded rule as an answer. Verified live on
   /resources/trust-vs-will-puerto-rico.

   These are exact sentences from the native page bodies.
   Rewriting them here fixes the visible page and the
   extracted schema together; legal-content-fixes.js is
   module 14 and schema-markup.js is module 15, so this runs
   first. Re-pasting the corrected native HTML later makes
   these no-ops \u2014 they simply stop matching.
   ================================================ */
var IRREVOCABILITY_PROSE_FIXES = [
  ['all Puerto Rico trusts are irrevocable by default.',
   'Puerto Rico trusts were irrevocable by default until Act 153-2026 took effect on January 30, 2027; a deed silent on revocability is now presumed revocable.'],
  ['all trusts are irrevocable by default',
   'trusts were irrevocable by default until Act 153-2026 took effect on January 30, 2027'],
  ['trusts are irrevocable by default.',
   'trusts were irrevocable by default until Act 153-2026 took effect on January 30, 2027, which reversed the presumption.'],
  ['Under Law 219-2012 all trusts are irrevocable, though you can reserve broad modification rights under \u00a73352h.',
   'Under Law 219-2012 all trusts were irrevocable, but Act 153-2026 reversed that on January 30, 2027: a deed silent on revocability is now presumed revocable, and any settlor may create a revocable trust.'],
  ['Under the Puerto Rico Trust Act (Ley 219-2012), all trusts are irrevocable\u2014with one exception',
   'Under the Puerto Rico Trust Act (Ley 219-2012), all trusts were irrevocable until Act 153-2026 took effect on January 30, 2027\u2014with one earlier exception'],
  ['The Fundamental Rule: All Puerto Rico Trusts Are Irrevocable',
   'The Former Rule: All Puerto Rico Trusts Were Irrevocable (changed by Act 153-2026)'],
  ['Under the Trust Act, all Puerto Rico trusts are irrevocable.',
   'Under the Trust Act as it stood before Act 153-2026, all Puerto Rico trusts were irrevocable. Act 153-2026 reversed that presumption effective January 30, 2027.'],
  /* Spanish */
  ['Bajo la Ley de Fideicomisos, todos los fideicomisos de Puerto Rico son irrevocables.',
   'Bajo la Ley de Fideicomisos antes de la Ley 153-2026, todos los fideicomisos de Puerto Rico eran irrevocables. La Ley 153-2026 invirti\u00f3 esa presunci\u00f3n a partir del 30 de enero de 2027.'],
  ['los fideicomisos en Puerto Rico son irrevocables por defecto.',
   'los fideicomisos en Puerto Rico fueron irrevocables por defecto hasta que la Ley 153-2026 entr\u00f3 en vigor el 30 de enero de 2027, que invirti\u00f3 la presunci\u00f3n.'],
  /* CPA-bridge blog posts (published). The Squarespace rich-text editor rejects a
     programmatic body replacement, so these are corrected in the DOM. Both told the
     reader Puerto Rico is the OPPOSITE of the mainland \u2014 now exactly backwards. */
  ['Trusts in Puerto Rico are irrevocable by default.',
   'Revocability is the default in Puerto Rico \u2014 as of January 30, 2027.'],
  ['Unlike many mainland jurisdictions where trusts are presumed revocable unless stated otherwise, Puerto Rico law presumes irrevocability. This is a critical distinction. If the trust instrument does not explicitly reserve the right to revoke or amend, the grantor loses control of the assets permanently.',
   'Act 153-2026 reversed the rule that had governed since 2012, bringing Puerto Rico in line with most mainland jurisdictions: a deed that says nothing about revocability is now presumed revocable. This is a critical distinction, and it now cuts the other way. If your goal is asset protection, the deed must state irrevocability expressly \u2014 while the settlor keeps the power to revoke, creditors can reach the trust assets as if the trust did not exist.'],
  ['Los fideicomisos en Puerto Rico son irrevocables por defecto.',
   'En Puerto Rico la revocabilidad es la norma supletoria \u2014 desde el 30 de enero de 2027.'],
  ['A diferencia de muchas jurisdicciones continentales donde los fideicomisos se presumen revocables a menos que se establezca lo contrario, la ley de Puerto Rico presume la irrevocabilidad. Esta es una distinci\u00f3n cr\u00edtica. Si el instrumento del fideicomiso no reserva expl\u00edcitamente el derecho a revocar o enmendar, el fideicomitente pierde el control de los activos permanentemente.',
   'La Ley 153-2026 invirti\u00f3 la regla vigente desde 2012 y aline\u00f3 a Puerto Rico con la mayor\u00eda de las jurisdicciones continentales: la escritura que nada diga sobre revocabilidad se presume revocable. La distinci\u00f3n sigue siendo cr\u00edtica, pero ahora corta al rev\u00e9s. Si busca protecci\u00f3n de activos, la escritura debe declarar la irrevocabilidad expresamente \u2014 mientras el fideicomitente conserve la facultad de revocar, sus acreedores pueden alcanzar los bienes como si el fideicomiso no existiera.'],
];

/* ================================================
   24c. BROADEN THE TRUST SERVICE COPY
   The homepage and /services describe the practice as
   "irrevocable trusts" only. The firm drafts both, and
   since Act 153-2026 the revocable trust is squarely part
   of Puerto Rico practice — so the old wording now
   under-describes the offering and reads as a limit.

   These are exact strings from the native Squarespace
   bodies. Re-typing them in the CMS makes these no-ops.
   ================================================ */
var TRUST_SERVICE_SCOPE_FIXES = [
  /* Homepage — hidden intro paragraph (still crawlable) */
  ['estate planning, irrevocable trusts, and asset protection',
   'estate planning, revocable and irrevocable trusts, and asset protection'],
  /* Homepage — practice card, scraped from the native H3 by homepage-services.js
     (module 4) before this runs. Also drops the "across generations" dynasty
     implication that softenAdvertisingLanguage() used to handle. */
  ['Tax-efficient irrevocable trusts that preserve wealth across generations',
   'Tax-efficient revocable and irrevocable trusts that help preserve family wealth'],
  /* /services — intro paragraph */
  ['structuring an irrevocable trust',
   'structuring a revocable or irrevocable trust'],
  /* /services — practice area description */
  ['We structure irrevocable trusts, asset protection trusts, and special needs trusts',
   'We structure revocable and irrevocable trusts, asset protection trusts, and special needs trusts'],
  /* /services — flat-fee tier inclusion line */
  ['Standard irrevocable trust',
   'Standard trust (revocable or irrevocable)'],
  /* /resources/why-law-firm-act-60 — native Code-block body. Already corrected in
     migration/native-html/, so a future re-paste turns this into a no-op. */
  ['involves irrevocable trust formation',
   'involves revocable or irrevocable trust formation'],
  /* Spanish — /espanol intro (mirror of the homepage paragraph above) */
  ['planificación sucesoral, fideicomisos irrevocables y protección de activos',
   'planificación sucesoral, fideicomisos revocables e irrevocables y protección de activos'],
  /* Spanish — /espanol-servicios estate planning blurb */
  ['Desde testamentos hasta fideicomisos irrevocables bajo la Ley 219',
   'Desde testamentos hasta fideicomisos revocables e irrevocables bajo la Ley 219'],
];

var TRUST_SERVICE_SCOPE_PATHS = [
  '/', '/services', '/pricing', '/resources/why-law-firm-act-60',
  '/espanol', '/espanol-servicios'
];

function fixTrustServiceScope() {
  if (TRUST_SERVICE_SCOPE_PATHS.indexOf(path) === -1) return;

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  var nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var parentTag = node.parentNode && node.parentNode.tagName;
    if (parentTag === 'SCRIPT' || parentTag === 'STYLE') continue;
    var text = node.nodeValue, orig = text;
    for (var j = 0; j < TRUST_SERVICE_SCOPE_FIXES.length; j++) {
      var find = TRUST_SERVICE_SCOPE_FIXES[j][0];
      if (text.indexOf(find) >= 0) {
        text = text.split(find).join(TRUST_SERVICE_SCOPE_FIXES[j][1]);
      }
    }
    if (text !== orig) node.nodeValue = text;
  }
}

function fixStaleIrrevocabilityProse() {
  if (path === '/resources/revocable-trusts-puerto-rico') return;
  if (path === '/resources/fideicomisos-revocables-puerto-rico') return;

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  var nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (isInsideInjectedElement(node)) continue;   /* never rewrite our own banner */
    for (var j = 0; j < IRREVOCABILITY_PROSE_FIXES.length; j++) {
      var find = IRREVOCABILITY_PROSE_FIXES[j][0];
      if (node.nodeValue.indexOf(find) >= 0) {
        node.nodeValue = node.nodeValue.split(find).join(IRREVOCABILITY_PROSE_FIXES[j][1]);
      }
    }
  }
}

/* ================================================
   25. FIRM NAME — "Riefkohl LLC" → "Riefkohl Law"
   The site should refer to the firm as "Riefkohl Law"
   everywhere. Remove the "d/b/a" / "trade name of"
   constructions and any standalone "Riefkohl LLC".
   Runs site-wide on Squarespace-native text.
   Replacements are ordered: the longer d/b/a phrases
   must run before the standalone catch-all.
   ================================================ */
function fixFirmLegalName() {
  var REPLACEMENTS = [
    /* Footer call-to-action block */
    [/Riefkohl LLC\s+doing business as\s*\(d\/b\/a\)\s*Riefkohl Law/g, 'Riefkohl Law'],
    /* Page disclaimer ("Riefkohl Law is a trade name of Riefkohl LLC.") */
    [/Riefkohl Law is a trade name of Riefkohl LLC/g, 'Riefkohl Law'],
    /* Any other "d/b/a" construction, in case wording varies */
    [/Riefkohl LLC\s*,?\s*(?:doing business as|d\/b\/a)\s*\(?d?\/?b?\/?a?\)?\s*Riefkohl Law/g, 'Riefkohl Law'],
    /* Standalone catch-all — must run last */
    [/Riefkohl LLC/g, 'Riefkohl Law']
  ];

  function applyReplacements(str) {
    var out = str;
    for (var r = 0; r < REPLACEMENTS.length; r++) {
      if (out.indexOf('Riefkohl LLC') < 0) break;
      out = out.replace(REPLACEMENTS[r][0], REPLACEMENTS[r][1]);
    }
    return out;
  }

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (node.nodeValue.indexOf('Riefkohl LLC') < 0) continue;
    var parentTag = node.parentNode && node.parentNode.tagName;
    if (parentTag === 'SCRIPT' || parentTag === 'STYLE') continue;
    node.nodeValue = applyReplacements(node.nodeValue);
  }

  /* Fix the document title if it carries the old name */
  if (document.title && document.title.indexOf('Riefkohl LLC') >= 0) {
    document.title = applyReplacements(document.title);
  }
}

/* ================================================
   CLEANUP: Fix double-word artifacts from replacements
   ================================================ */
function cleanupDoubleWords() {
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    var text = node.nodeValue;
    if (text.indexOf('charitable charitable') >= 0) {
      node.nodeValue = text.replace(/charitable charitable/g, 'charitable');
    }
    if (text.indexOf('donation donation') >= 0) {
      node.nodeValue = node.nodeValue.replace(/donation donation/g, 'donation');
    }
  }
}

/* ================================================
   26. DECLARATORIA DE HEREDEROS — NOTARIAL ROUTE
   (/blog/declaratoria-de-herederos-puerto-rico)
   Reality: An intestate declaratoria de herederos can be
   obtained NOTARIALLY (acta de notoriedad) under the Ley de
   Asuntos No Contenciosos Ante Notario (Ley 282-1999) when
   the heirs are of age and in agreement. The judicial route
   is a PETICIÓN of voluntary jurisdiction (jurisdicción
   voluntaria), not a contested "demanda". The article
   presented the process as exclusively judicial and called
   the filing a "demanda".
   ================================================ */
function fixDeclaratoriaNotarial() {
  if (path !== '/blog/declaratoria-de-herederos-puerto-rico') return;

  /* Paragraph-level rewrites for the two "exclusively judicial" sentences.
     Matched on stable ASCII substrings so whitespace/dash variants don't break it. */
  var blocks = document.querySelectorAll('p');
  for (var i = 0; i < blocks.length; i++) {
    var p = blocks[i];
    var txt = p.textContent || '';

    /* Intro: "...La ley requiere un proceso judicial — la declaratoria de herederos — para..." */
    if (txt.indexOf('no pueden simplemente tomar posesi') >= 0 &&
        txt.indexOf('requiere un proceso judicial') >= 0) {
      p.innerHTML = 'Cuando una persona fallece en Puerto Rico, sus herederos no pueden simplemente tomar posesión de sus bienes. La declaratoria de herederos es el proceso legal —que puede tramitarse por vía notarial o judicial— para determinar legalmente quiénes son los herederos, en qué proporción heredan y autorizar la transferencia de los bienes del difunto.';
      continue;
    }

    /* Definition: "...es un procedimiento judicial mediante el cual un tribunal de Puerto Rico emite una resolución que:" */
    if (txt.indexOf('es un procedimiento judicial mediante el cual un tribunal') >= 0) {
      p.innerHTML = 'La declaratoria de herederos es un procedimiento —notarial o judicial— mediante el cual se emite una resolución judicial o un acta notarial de notoriedad que:';

      /* Insert a route-clarification note immediately after this paragraph */
      if (!document.getElementById('rl-declaratoria-notarial-note')) {
        var note = document.createElement('div');
        note.id = 'rl-declaratoria-notarial-note';
        note.style.cssText = 'margin:14px 0;padding:14px 18px;background:#f0f5fb;border:1px solid #c9dcef;border-left:4px solid #1a3a5c;border-radius:4px;font-size:.9rem;color:#23425f;line-height:1.6;';
        note.innerHTML = '<strong>Vía notarial vs. judicial:</strong> Cuando todos los herederos son mayores de edad y están de acuerdo, la declaratoria de herederos puede otorgarse ante notario mediante un <em>acta de notoriedad</em> (Ley de Asuntos No Contenciosos Ante Notario, Ley Núm. 282-1999), sin acudir al tribunal. La vía judicial es necesaria cuando hay desacuerdo entre los herederos, herederos menores o incapacitados, o herederos no localizados. Los pasos descritos a continuación corresponden a la vía judicial.';
        p.parentNode.insertBefore(note, p.nextSibling);
      }
      continue;
    }
  }

  /* "demanda" → "petición" (the filing is a petición de jurisdicción voluntaria) */
  var DEM = [
    ['Presentar la demanda de declaratoria', 'Presentar la petición de declaratoria'],
    ['presenta una demanda ante el Tribunal', 'presenta una petición ante el Tribunal'],
    ['La demanda incluye', 'La petición incluye']
  ];
  var nodes = document.querySelectorAll('h1, h2, h3, h4, p, li');
  for (var k = 0; k < nodes.length; k++) {
    var el = nodes[k];
    for (var d = 0; d < DEM.length; d++) {
      if (el.textContent.indexOf(DEM[d][0]) >= 0) {
        el.innerHTML = el.innerHTML.split(DEM[d][0]).join(DEM[d][1]);
      }
    }
  }
}

/* ================================================
   27. LEY 60 (ES) — FEDERAL vs. PR TAX CLARIFIER
   (/espanol-ley-60)
   Reality: The "100% de exención" figures are Puerto Rico
   income-tax benefits. Federally, a bona fide PR resident
   excludes ONLY Puerto Rico–source income (IRC §933);
   U.S.-source dividends/interest, and pre-residency
   appreciation, remain subject to U.S. federal tax.
   ================================================ */
function addLey60FederalClarifierES() {
  if (path !== '/espanol-ley-60') return;
  if (document.getElementById('rl-ley60-federal-note')) return;

  var els = document.querySelectorAll('p, li');
  for (var i = 0; i < els.length; i++) {
    var t = els[i].textContent || '';
    if (t.indexOf('dividendos e intereses') >= 0 && t.indexOf('residente bona fide') >= 0) {
      var note = document.createElement('p');
      note.id = 'rl-ley60-federal-note';
      note.style.cssText = 'margin:10px 0 16px;padding:12px 16px;background:#f0f5fb;border-left:3px solid #1a3a5c;border-radius:0 4px 4px 0;font-size:.84rem;color:#23425f;line-height:1.55;';
      note.innerHTML = '<strong>Nota sobre impuestos federales:</strong> Estas exenciones del 100% aplican al <strong>impuesto sobre ingresos de Puerto Rico</strong> bajo el decreto de Ley 60. A nivel federal, un residente bona fide de Puerto Rico excluye únicamente el ingreso de <strong>fuente de Puerto Rico</strong> (Sección 933 del Código de Rentas Internas federal); los dividendos e intereses de fuente estadounidense, y la apreciación acumulada antes de establecer residencia, permanecen sujetos a impuesto federal.';
      els[i].parentNode.insertBefore(note, els[i].nextSibling);
      return;
    }
  }
}

/* ================================================
   28. SOFTEN ADVERTISING SUPERLATIVES (site-wide)
   Reality: PR's Cánones de Ética Profesional and the
   spirit of ABA Model Rule 7.1/7.4 disfavor "expert"/
   "specialist" self-designations and unsubstantiated
   superlatives. Reframe around verifiable experience.
   ================================================ */
function softenAdvertisingLanguage() {
  var REPL = [
    ['Big-Firm Expertise', 'Big-Firm Experience'],
    ['Puerto Rico’s trusted counsel', 'Puerto Rico counsel'],
    ["Puerto Rico's trusted counsel", 'Puerto Rico counsel'],
    ['Expert Act 60 guidance', 'Experienced Act 60 guidance'],
    ['expert legal guidance', 'experienced legal guidance'],
    ['Sophisticated Legal Counsel', 'Experienced Legal Counsel'],
    ['the caliber of counsel your business and family demand', 'experienced counsel for your business and family'],
    ['incentivos contributivos extraordinarios', 'incentivos contributivos significativos']
    /* The homepage practice card ("...preserve wealth across generations") is handled
       by fixTrustServiceScope() above, which also widens it to both trust types. */
  ];

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    var parentTag = node.parentNode && node.parentNode.tagName;
    if (parentTag === 'SCRIPT' || parentTag === 'STYLE') continue;
    if (isInsideInjectedElement(node)) continue;
    var text = node.nodeValue, orig = text;
    for (var r = 0; r < REPL.length; r++) {
      if (text.indexOf(REPL[r][0]) >= 0) text = text.split(REPL[r][0]).join(REPL[r][1]);
    }
    if (text !== orig) node.nodeValue = text;
  }
}

/* ================================================
   29. TRUSTS PAGE — NRNC U.S. TRANSFER-TAX CAVEAT
   (/puerto-rico-trusts)
   Reality: A U.S. citizen domiciled in Puerto Rico is
   generally a "non-resident, not a citizen" (NRNC) for
   U.S. federal estate/gift tax (IRC §2209): federal tax
   reaches only U.S.-situs assets, with a ~$60,000 exemption
   equivalent (IRC §2102(b)). PR-situs assets fall outside.
   So generic estate/gift/dynasty "transfer-tax savings"
   may not apply to a typical PR-resident client; and
   Ley 219-2012 caps trust duration (no perpetual dynasty).
   ================================================ */
function addTrustNRNCTransferTaxNote() {
  if (path !== '/puerto-rico-trusts') return;
  if (document.getElementById('rl-trust-nrnc-note')) return;

  var htmlContent = document.querySelector('.sqs-html-content');
  if (!htmlContent) return;

  var notice = document.createElement('div');
  notice.id = 'rl-trust-nrnc-note';
  notice.style.cssText = 'margin:24px 0;padding:18px 22px;background:#f5f0ff;border:1px solid #d4c5f0;border-left:4px solid #7c3aed;border-radius:4px;font-size:.88rem;color:#3b1f6e;line-height:1.6;';
  notice.innerHTML = '<p style="margin:0 0 8px;font-weight:700;font-size:.95rem;">A Note on Transfer Taxes for Puerto Rico Residents</p>'
    + '<p style="margin:0 0 6px;">The estate-, gift-, and "dynasty"-trust transfer-tax advantages described above are most relevant to clients who hold <strong>U.S.-situs assets</strong> or are otherwise subject to U.S. federal transfer tax. A U.S. citizen who is a bona fide <strong>domiciliary of Puerto Rico</strong> is generally treated as a <em>non-resident, not a citizen</em> (NRNC) for U.S. federal estate and gift tax (IRC §2209). Federal estate tax then reaches only U.S.-situs assets, with a unified credit equivalent to roughly a <strong>$60,000</strong> exemption (IRC §2102(b)) rather than the multimillion-dollar exemption available to U.S. domiciliaries — while Puerto Rico-situs assets generally fall outside the U.S. estate tax base.</p>'
    + '<p style="margin:0 0 6px;">In addition, Puerto Rico’s Trust Act (Ley 219-2012) imposes a maximum statutory duration on trusts, so a perpetual, common-law-style “dynasty trust” is not available in Puerto Rico the way it is in some U.S. states.</p>'
    + '<p style="margin:0;">Whether — and how — these strategies benefit you depends on your residency, the situs of your assets, and your beneficiaries’ residency. <a href="/calendly" style="color:#5b21b6;text-decoration:underline;">Schedule a consultation</a> for an analysis of your specific situation.</p>';

  var headings = htmlContent.querySelectorAll('h2, h3');
  var anchors = ['trust planning for act 60', 'private interest foundation', 'trust administration', 'funding your', 'frequently asked'];
  for (var a = 0; a < anchors.length; a++) {
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].textContent.trim().toLowerCase().indexOf(anchors[a]) >= 0) {
        headings[i].parentNode.insertBefore(notice, headings[i]);
        return;
      }
    }
  }
  htmlContent.appendChild(notice);
}

/* ================================================
   31. BOOKING PAGE — "FREE CONSULTATION" SCOPE (/calendly)
   Reality: A "Free Strategy Call" with no scope/qualifier
   can imply free substantive legal advice. Rename the page
   heading to "Free Consultation" and add a clarifier that
   the call does not create an attorney-client relationship.
   (Tracked CTA buttons are left unchanged.)
   ================================================ */
function addBookingQualifier() {
  if (path !== '/calendly') return;

  /* Rename the heading "Schedule Your Free Strategy Call" -> "...Free Consultation" */
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    var parentTag = node.parentNode && node.parentNode.tagName;
    if (parentTag === 'SCRIPT' || parentTag === 'STYLE' || parentTag === 'A' || parentTag === 'BUTTON') continue;
    if (node.nodeValue.indexOf('Schedule Your Free Strategy Call') >= 0) {
      node.nodeValue = node.nodeValue.replace('Schedule Your Free Strategy Call', 'Schedule Your Free Consultation');
    }
  }

  /* Add a scope clarifier after the "No obligation..." line */
  if (document.getElementById('rl-booking-qualifier')) return;
  var els = document.querySelectorAll('p, h2, h3');
  for (var i = 0; i < els.length; i++) {
    var t = els[i].textContent || '';
    if (t.indexOf('No obligation') >= 0 && t.indexOf('clarity on your next step') >= 0) {
      var note = document.createElement('p');
      note.id = 'rl-booking-qualifier';
      note.style.cssText = 'margin:10px auto 0;max-width:640px;font-size:.8rem;color:#6c757d;line-height:1.5;';
      note.innerHTML = 'This free 30-minute call is an initial consultation to understand your situation and outline possible next steps. It does not create an attorney-client relationship and is not legal advice; any representation begins only with a signed engagement agreement.';
      els[i].parentNode.insertBefore(note, els[i].nextSibling);
      return;
    }
  }
}

/* ================================================
   32. HIDE DUPLICATE BLOG CARD (/blog)
   Two published posts share the title "Supremo error...
   (Parte 1)": /blog/mun-de-aguada-v-w-construction-2 (a
   thin raw-import duplicate) and -3 (the full, formatted
   version). Hide the -2 card on the hub; the canonical
   override in seo-fixes.js points -2 at -3 for search.
   ================================================ */
function hideDuplicateBlogCard() {
  if (path !== '/blog') return;
  var links = document.querySelectorAll('a[href$="mun-de-aguada-v-w-construction-2"]');
  for (var i = 0; i < links.length; i++) {
    var card = links[i].closest('article.hentry') || links[i].closest('article') || links[i].closest('.blog-item, li');
    if (card) card.style.display = 'none';
  }
}

/* ================================================
   33. LEY 60 (ES) — THREE §937 RESIDENCY TESTS (/espanol-ley-60)
   Reality: Bona fide residency requires THREE tests
   (presence, tax home, closer connection), and 183 days
   is only one way to satisfy the presence test. Mirrors the
   clarification the English Act 60 page already carries.
   ================================================ */
function addLey60ThreeTestsES() {
  if (path !== '/espanol-ley-60') return;
  if (document.getElementById('rl-ley60-3tests-note')) return;

  var els = document.querySelectorAll('p, li');
  for (var i = 0; i < els.length; i++) {
    var t = els[i].textContent || '';
    if (t.indexOf('183 días o más de presencia física en Puerto Rico') >= 0) {
      var note = document.createElement('p');
      note.id = 'rl-ley60-3tests-note';
      note.style.cssText = 'margin:10px 0 16px;padding:12px 16px;background:#f0f5fb;border-left:3px solid #1a3a5c;border-radius:0 4px 4px 0;font-size:.84rem;color:#23425f;line-height:1.55;';
      note.innerHTML = '<strong>Las tres pruebas de residencia bona fide:</strong> Bajo la Sección 937 del Código de Rentas Internas federal, la residencia bona fide exige cumplir <strong>tres</strong> pruebas, no solo los 183 días: (1) la <strong>prueba de presencia</strong>; (2) la <strong>prueba de hogar contributivo</strong> (<em>tax home</em>) —su principal lugar de negocios o empleo debe estar en Puerto Rico—; y (3) la <strong>prueba de conexión más estrecha</strong> (<em>closer connection</em>) —sus vínculos deben ser más estrechos con Puerto Rico que con EE. UU. o cualquier país extranjero. Además, los 183 días son solo una de varias formas de satisfacer la prueba de presencia.';
      els[i].parentNode.insertBefore(note, els[i].nextSibling);
      return;
    }
  }
}

function fixHeaderInjectionOverlap() {
  /* The Squarespace header is transparent + position:absolute, so elements
     injected at the top of the document flow (homepage urgency banner, blog
     post breadcrumbs) can render underneath the logo at widths where they
     wrap taller than the gap above it. Push each one below the header's
     footprint — only when it actually overlaps. */
  var header = document.querySelector('header.header') || document.querySelector('header');
  if (!header) return;

  function adjust() {
    if (getComputedStyle(header).position !== 'absolute') return;
    var headerBottom = header.offsetTop + header.offsetHeight;
    ['.rl-urgency-banner', 'nav.rl-breadcrumb'].forEach(function(sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      el.style.marginTop = '';
      var top = el.getBoundingClientRect().top + window.pageYOffset;
      if (top < headerBottom) {
        el.style.marginTop = Math.ceil(headerBottom - top) + 'px';
      }
    });
  }

  adjust();
  if (!window.__rlHeaderOverlapBound) {
    window.__rlHeaderOverlapBound = true;
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(adjust, 150);
    });
    setTimeout(adjust, 2500);
  }
}

/* ================================================
   EXECUTE ALL LEGAL CONTENT FIXES
   ================================================ */
function fixSpanishBookingCta() {
  /* /espanol-cita: the native CTA button still carries English text. */
  if (window.location.pathname !== '/espanol-cita') return;
  var btns = document.querySelectorAll('a.sqs-block-button-element');
  for (var i = 0; i < btns.length; i++) {
    if (btns[i].textContent.trim() === 'Book Your Free Strategy Call') {
      btns[i].textContent = 'Reserve su consulta gratuita de 30 minutos';
    }
  }
}

/* ================================================
   /espanol-cita: FLATTEN THE MANGLED "DESPUÉS DE
   COORDINAR SU CONSULTA" NUMBERED LIST
   The native text block nests each successive step in
   a child <ol start="2"/"3"/"4"> and traps the closing
   copy — including the "Dé el primer paso" <h2> — inside
   list items, so the heading renders as list item 6-8.
   Editor-side repair is unsafe (the page editor's paste
   normalizes away both the list and the small-text
   style), so restructure the rendered DOM instead:
   steps 1-4 become one flat list; the closing copy is
   lifted out below it. Idempotent — bails once the <ol>
   after the heading has no nested <ol>.
   ================================================ */
function fixEspanolCitaListNesting() {
  if (window.location.pathname !== '/espanol-cita') return;
  var h2s = document.querySelectorAll('.sqs-html-content h2');
  var ol = null;
  for (var i = 0; i < h2s.length; i++) {
    if (h2s[i].textContent.indexOf('Después de coordinar su consulta') >= 0) {
      var next = h2s[i].nextElementSibling;
      if (next && next.tagName === 'OL') ol = next;
      break;
    }
  }
  if (!ol || !ol.querySelector('ol')) return;
  var frags = Array.prototype.slice.call(ol.querySelectorAll('p, h2'));
  var stepLead = /^(Recibirá|El Lcdo\. Riefkohl le contactará|Conversaremos|Si decide proceder)/;
  var flat = document.createElement('ol');
  flat.setAttribute('data-rte-list', 'default');
  var trailing = [];
  for (var j = 0; j < frags.length; j++) {
    var el = frags[j];
    if (el.tagName === 'P' && !el.textContent.trim()) continue;
    if (el.tagName === 'P' && stepLead.test(el.textContent.trim())) {
      var li = document.createElement('li');
      li.appendChild(el);
      flat.appendChild(li);
    } else {
      trailing.push(el);
    }
  }
  ol.parentNode.insertBefore(flat, ol);
  var ref = flat;
  for (var k = 0; k < trailing.length; k++) {
    ref.insertAdjacentElement('afterend', trailing[k]);
    ref = trailing[k];
  }
  ol.parentNode.removeChild(ol);
}

function runLegalFixes() {
  fixULLCA();
  addAct60Disclaimer();
  updateAct60Disclaimer();
  qualifyAct60Claims();
  addTrustRegistryDisclosure();
  fixZeroHourlyBilling();
  fixHourlyBillingSurprises();
  fixConsultationDuration();
  addNotarialTariffDisclaimer();
  fixForcedHeirship();
  fixThreePortionSystem();
  fixWillsSection();
  fixNRNCArticle();
  fixComplianceCharitableDonation();
  fixJudgeGelpiReference();
  fixAct60ExemptionPercentages();
  clarify183DayPresenceTest();
  /* Clean up any double-word artifacts from prior replacements */
  cleanupDoubleWords();
  /* CPA Legal Claims Check — new fixes */
  addSmallBusinessExemptionNote();
  fixConflictingAct38Dates();
  fixFourPercentAllResidentsClaim();
  updateCharitableDonationHB505();
  addPreMoveCapitalGainsNote();
  addFeeDisclosure();
  fixCryptoOversimplification();
  fixEmploymentRequirements();
  fixDecreeDuration();
  /* Correct the superseded prose BEFORE schema-markup.js (module 15) scrapes
     the page's FAQ answers into FAQPage structured data. */
  fixStaleIrrevocabilityProse();
  /* Homepage/services copy said "irrevocable trusts" only — the firm drafts both */
  fixTrustServiceScope();
  addTrustIrrevocabilityNotice();
  fixFirmLegalName();
  /* Declaratoria notarial route + Ley 60 ES federal/PR tax clarifier */
  fixDeclaratoriaNotarial();
  addLey60FederalClarifierES();
  /* Advertising language + trusts NRNC caveat */
  softenAdvertisingLanguage();
  addTrustNRNCTransferTaxNote();
  /* Booking page "Free Consultation" scope clarifier */
  addBookingQualifier();
  /* Hide duplicate Aguada blog card on the hub */
  hideDuplicateBlogCard();
  /* Ley 60 ES: three §937 residency tests note */
  addLey60ThreeTestsES();
  /* Top-injected elements vs. the transparent absolute header */
  fixHeaderInjectionOverlap();
  /* Spanish booking CTA text */
  fixSpanishBookingCta();
  /* /espanol-cita: flatten the mangled numbered list */
  fixEspanolCitaListNesting();
}

/* Run on DOMContentLoaded and again after a delay for dynamic content */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    runLegalFixes();
    setTimeout(runLegalFixes, 1000);
  });
} else {
  runLegalFixes();
  setTimeout(runLegalFixes, 1000);
}

})();
