(function(){
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
   ================================================ */

var path = window.location.pathname.replace(/\/$/, '') || '/';

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
    /* Fix compliance article */
    if (p.textContent.indexOf('$5,000 directed to a qualifying Puerto Rico nonprofit organization') >= 0) {
      p.innerHTML = p.innerHTML.replace(
        'at least $5,000 directed to a qualifying Puerto Rico nonprofit organization',
        'at least $5,000 directed to an organization approved by the <em>Comisi\u00f3n Especial Conjunta de Fondos Legislativos</em> (CECFL) that works to <strong>eradicate child poverty</strong> in Puerto Rico'
      );
    }
  }

  /* Fix Act 60 page inline references to "$10,000 annual charitable donation" */
  if (path === '/act-60-tax-incentives') {
    var allEls = document.querySelectorAll('.sqs-html-content li, .sqs-code-container li, .sqs-html-content p, .sqs-code-container p');
    for (var j = 0; j < allEls.length; j++) {
      var el = allEls[j];
      if (el.textContent.indexOf('$10,000 annual charitable donations') >= 0 ||
          el.textContent.indexOf('$10,000 to qualifying Puerto Rico nonprofits') >= 0) {
        el.innerHTML = el.innerHTML.replace(
          /\$10,000[^<]*(charitable donation|to qualifying)[^<]*/,
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
   Property tax exemption = 70% (not 60%).
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
    var text = node.nodeValue;

    /* Fix "75% exemption on municipal" -> "50% exemption on municipal" */
    if (text.indexOf('75%') >= 0 && (text.indexOf('municipal') >= 0 || text.indexOf('patente') >= 0)) {
      node.nodeValue = text.replace(/75%/g, '50%');
    }

    /* Fix "60% exemption on...property" -> "70% exemption on...property" */
    text = node.nodeValue; /* re-read after possible change */
    if (text.indexOf('60%') >= 0 && text.indexOf('property') >= 0) {
      node.nodeValue = text.replace(/60%/g, '70%');
    }
  }
}

/* ================================================
   EXECUTE ALL LEGAL CONTENT FIXES
   ================================================ */
function runLegalFixes() {
  fixULLCA();
  addAct60Disclaimer();
  updateAct60Disclaimer();
  qualifyAct60Claims();
  addTrustRegistryDisclosure();
  fixZeroHourlyBilling();
  addNotarialTariffDisclaimer();
  fixForcedHeirship();
  fixThreePortionSystem();
  fixWillsSection();
  fixNRNCArticle();
  fixComplianceCharitableDonation();
  fixJudgeGelpiReference();
  fixAct60ExemptionPercentages();
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
