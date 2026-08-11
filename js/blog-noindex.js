/* ============================================================================
   BLOG NOINDEX LIST  --  added 2026-08-11
   Problem: of 391 published posts, 192 are out-of-jurisdiction case summaries
   (Delaware, Iowa, Nevada, Florida, California, Washington...), federal
   gov-contracts / GAO notes, federal bankruptcy notes, and off-topic
   commercial or news items. None of them serve a Puerto Rico estate-planning
   or trust client, and at that volume they dilute the site's topical signal
   against the money pages (/estate-planning, /puerto-rico-trusts).

   Why JavaScript: Squarespace exposes no server-side noindex for blog POSTS.
   seoData.seoHidden persists through the internal API but emits no robots meta
   and does not drop the URL from sitemap.xml (verified 2026-08-11 on
   /blog/vice-group). postItemInjectCode returns HTTP 200 and silently
   discards the write. Google honours a JS-rendered robots meta after render,
   and this is already the pattern the site uses for /blog/tag/ and
   /blog/category/ pages via an inline Code Injection snippet.

   Reversible: delete a slug from the list below, or remove the script tag.
   'follow' is deliberate -- these posts still pass internal link equity to the
   Puerto Rico pages they link to.

   Trade-off accepted by the owner 2026-08-11: 47 of these 192 earned clicks in
   the trailing 3 months (176 clicks, ~7.7% of site clicks), almost all from
   out-of-state case-law searchers rather than prospective clients.
   ========================================================================== */
(function () {
  try {
    var SLUGS = [
      '1-in-re-christina-fama-chiarizia-debtor', '2025-oklahoma-senate-bill-no-2104',
      'agency-properly-rejected-proposal-submitted-to-wrong-email', 'alevras-cga-associates-v-brewster-jr',
      'allen-v-stein', 'alta-partners-llc-v-getty-images-holdings-inc',
      'american-health-law-assn-v-estate-of-cunningham', 'andersen-estate-eileen-andersen-pr',
      'antero-resources-v-pike-case-08', 'anthropic-v-department-of-war-preliminary-injunction',
      'arbitration-award-does-not-create-priority-lien-over-competing-judgment-creditors', 'awnbsb29nh266oybf08goaq0cofvwr',
      'bank-of-america-na-v-peter-f-neronha-attorney-general', 'bb-medical-services',
      'branford-quick-mart-llc-v-aldin-associates-ltd-partnership', 'bravera-wealth-v-catherine-hansen-dietemann',
      'breuning-v-breuning', 'brown-v-transworld',
      'can-a-remainder-beneficiary-challenge-trustees-for-poor-investment-returns-dill-v-offray-and-the-limits-of-prudent-investor-claims', 'caretaker-beneficiarys-will-faces-tiable-issues-of-undue-influence',
      'carnival-v-decurtis', 'ccsb-financial-corp-v-totta',
      'cd-v-rc', 'chaires-v-champion-realty',
      'chesapeake-energy-corporation', 'chicago-south-loop-hotel',
      'christopher-straub-v-melissa-henderson', 'city-of-chester-2',
      'city-of-chester-3', 'commonwealth-v-valenti',
      'competing-widows-and-conflicting-divorce-records-in-heir-determination-proceeding', 'cornice-v-four-keys',
      'culbreath-v-culbreath', 'curonix-llc-v-laura-tyler-perryman',
      'cy-pres-applied-to-redirect-charitable-trust-funds', 'david-avigdor-et-al-v-morton-avigdor-et-al',
      'dawson-v-sonju', 'deeds-by-executor-who-obtained-letters-testamentary-through-false-pretenses-are-void-ab-initio-1',
      'delaware-chancery-court-approves-orderly-trust-termination-in-insurance-company-liquidation', 'delaware-chancery-court-approves-privilege-protection-order-in-historic-du-pont-trust-litigation',
      'envision-2', 'estate-of-wallace-lucas-sr',
      'executors-deeds-vacated-as-void-ab-initio-where-letters-testamentary-were-obtained-by-false-pretenses', 'farm-credit-v-swackhammer',
      'fidelity-v-estate-of-bolton-arbitration-clause-survives-death', 'fiduciary-duty-pleading-standards-and-shareholder-agreement-interpretation-in-a-joint-venture-governance-dispute',
      'florida-appeals-court-dismisses-challenge-to-beachfront-property-judgment-after-legislative-repeal', 'florida-just-doubled-the-threshold-for-simplified-probate-what-families-need-to-know-about-cshb-1337',
      'florida-virtual-school-v-k12-inc', 'foppiano-v-valera',
      'game-plan-inc-v-uninterrupted-ip-llc', 'gary-vincent-castaldo-v-diana-mondiello',
      'geary-v-irs', 'gencanna-v-101',
      'global-capital-partners-llc-v-green-sapphire-holdings-inc', 'gretchen-hyde-v-robert-and-rochelle-oxarango',
      'gribbon-v-vosburgh', 'harrison-v-nationstar',
      'hartfield-titus-donnelly-llc-v-marketaxess-holdings-inc', 'hbk-master-funds-v-pivotal-software',
      'hembree-insurance-trust-v-maples-industries-inc', 'hignell-stark-v-city-of-new-orleans',
      'hill-v-estate-of-hill', 'holdco-opportunities-fund-v-lp-v-angulo',
      'ibew-v-winborne', 'idaho-supreme-court-clarifies-standing-requirements-for-family-limited-partnership-disputes',
      'idemia', 'in-re-ccx-inc-debtor-united-steel-paper-and-forestry-rubber-manufacturing-en',
      'in-re-certain-trusts-dated-1954-to-1970', 'in-re-cte-1-llc',
      'in-re-deborah-a-roe-debtor', 'in-re-el-a-minor-ch-v-jn',
      'in-re-francis-d-and-irene-d-griffin-foundation', 'in-re-furniture-2',
      'in-re-furniture-bankruptcy', 'in-re-hawaii-island-air',
      'in-re-kelly', 'in-re-kirton-morris-v-housing-authority',
      'in-re-lajaunie-family-irrevocable-trust', 'in-re-longhorn-merit-llc',
      'in-re-midtown', 'in-re-millennium-lab-holdings-ii-llc-opt-out-lenders-v-millennium',
      'in-re-namen-2', 'in-re-namen-bankruptcy',
      'in-re-ntl-fin-hgs-v-kelly', 'in-re-opus-east-llc',
      'in-re-phyllix-mantilla-means-stovall-and-ray-cameron-stovall-debtors', 'in-re-roberson',
      'in-re-robinson', 'in-re-rodriguez',
      'in-re-s-tek-1-llc-2', 'in-re-s-tek-1-llc-bankruptcy',
      'in-re-serta-simmons', 'in-re-simply-essentials',
      'in-re-svb-financial-group', 'in-re-topp',
      'in-re-tower-park-properties-llc', 'in-re-vital-pharma',
      'in-re-worcester-country-club-acres-llc', 'in-the-matter-of-the-james-a-and-carol-a-may-living-trust',
      'in-the-matter-of-the-niki-and-darren-irrevocable-trust', 'indigo-marketplace-llc-v-farmop-capital-llc',
      'ineligible-offeror-can-challenge-acceptability-of-winning-pr', 'iowa-supreme-court-addresses-creditor-access-to-discretionary-trust-distributions',
      'james-martinez-v-russell-m-jinks-trustee', 'janco-fs-2-llc-v-iss-facility-services-inc',
      'jury-verdict-recognizing-second-wife-as-legal-widow-upheld-based-on-circumstantial-evidence', 'k2-aerial',
      'kiss-v-lathrop', 'kostyshyn-v-trustees-of-new-castle-common',
      'kpmg-v-usa', 'law-firms-take-notice-when-is-someone-a-partner-and-not-just-an-employee',
      'law-office-of-rogelio-solis-pllc-v-curtis', 'lighthouse-v-milestone',
      'lineage-capital-ii-lp-v-robert-beadles', 'llc-fiduciary-duties-corporate-opportunity-doctrine-and-deadlock-dissolution-in-a-litigation-finance-joint-venture',
      'ludivine-m-gamo-as-executor-v-jared-merrell-et-al', 'majority-rules-not-without-proper-notice',
      'mandex-inc', 'mary-paula-zaytoun-steele-v-kevin-i-kenna-et-al',
      'mcarthur-as-pr-of-estate-of-clarence-maurice-logan-jr', 'mcgill-v-us-bank-na',
      'mckenzie-v-bdo-usa-pc', 'michael-alan-pierratt-v-william-harold-pieratt-iii-et-al',
      'middlecap-associates-llc-v-the-town-of-middletown', 'mitchell-carter-v-administrator-of-the-estate-of-james-m-shumberg',
      'moac-mall-holdings-llc', 'murphy-dependent-of-harold-r-murphy',
      'national-small-business-united-v-yellen', 'nevada-supreme-court-holds-intestacy-statute-requires-per-capita-without-representation-distribution',
      'no-contest-clause-triggered-by-declaratory-relief-petition', 'nutrien-ag-v-hall',
      'nvr-inc-v-carter-farm-llc-and-choptank-road-llc', 'off-spec-solutions-llc',
      'oggusa-v-louisville-dryer', 'pacific-links',
      'paradyme-v-uscb', 'parra-v-rapid-casting-rapid-american-corp',
      'patently-ambiguous-solicitation-must-be-challenged-before-su', 'per-capita-without-representation-distribution-excludes-first-cousin-once-removed-from-32-million-intestate-estate',
      'pereira-v-pereira', 'perspecta-inc-v-eisiminger',
      'prevailing-elder-abuse-plaintiff-entitled-to-attorneys-fees', 'private-equity-fraud-allegations-fail-after-five-day-trial-no-scienter-no-justifiable-reliance-in-leveraged-acquisition',
      'raad-v-bank-audi-sal', 'rader-v-irs',
      'reeves-v-gross', 'rem-v-northern',
      'remedy-for-statutory-accounting-breach-limited-to-attorneys-fees', 'rhode-island-supreme-court-provides-critical-guidance-on-cy-pres-doctrine-for-charitable-trusts',
      'roitburg-v-roitburg', 'rosse-family-revocable-living-trust-v-city-of-jonesboro',
      'rs-air-llc', 'sec-v-paul-marcus-amerindo-investment-advisors',
      'settlor-intent-as-the-polar-star-trust-language-controls-over-mechanically-inconsistent-transfer-on-death-designations', 'shabani-v-burton-trustee',
      'slabe-v-slabe', 'sparksoft-corporation',
      'spectrum-healthcare-2', 'spectrum-healthcare-procurement',
      'starboard-intermediate-holding-co-llc-v-ahf-funding-lp-aip-llc', 'statute-of-limitations-bars-trust-beneficiaries-claims',
      'steward-health-v-tenet-business', 'strangers-are-filing-to-control-dead-peoples-estates-how-washingtons-new-law-fights-back',
      'susan-l-halperin-v-david-g-halperin-et-al', 't-michael-glenn-trust-v-walton-county-fl',
      'tabula-rasa-healthcare-group-inc-v-mphasis-corporation', 'tharrett-v-everett',
      'the-attached-pdf-is-a-redacted-opinion-issued-by-the-united-states-cou', 'theodore-haun-as-trustee-v-kelly-pagano-et-al',
      'thomas-c-mcgill-v-us-bank-na', 'trial-court-judgment-vacated-for-unadmitted-accounting-evidence',
      'trust-adr-provision-cannot-compel-arbitration-of-undue-influence-challenges', 'trust-beneficiary-lacks-standing-to-sue-in-individual-capacity-for-trust-property-forged-trust-instrument-cannot-be-challenged-by-improper-plaintiff',
      'trustee-v-aurora-capital', 'ucc-v-irs',
      'undue-influence-presumption-raised-against-caretaker-beneficiary-despite-drafting-attorneys-testimony-of-proper-execution', 'unico-mechanical-corp',
      'us-court-of-claims', 'velger-v-carr',
      'veterans-management-services', 'vice-group',
      'warrior-service', 'werber-v-armandpour',
      'whitehead-v-myers-eviction-appeal', 'whitehead-v-myers-rule-60b-appeal',
      'will-contest-dismissed-no-confidential-relationship-or-undue-influence-where-decedent-was-practicing-physician-who-independently-chose-to-disinherit-daughter', 'will-contest-dismissed-on-summary-judgment-no-confidential-relationship-or-undue-influence-1',
      'williams-as-successor-pr-of-estate-of-adams-shirer', 'wilson-v-cross',
      'wsj-big-bankruptcies-boost-economic-fears', 'wsj-small-business-bankruptcies-rise',
    ];

    var m = location.pathname.match(/^\/blog\/([^\/?#]+)\/?$/);
    if (!m) return;                                   // not a blog post URL

    var slug = decodeURIComponent(m[1]).toLowerCase();
    if (SLUGS.indexOf(slug) === -1) return;           // post is meant to stay indexed

    if (document.querySelector('meta[name="robots"][data-blog-noindex]')) return;

    var meta = document.createElement('meta');
    meta.setAttribute('name', 'robots');
    meta.setAttribute('content', 'noindex, follow');
    meta.setAttribute('data-blog-noindex', '1');
    (document.head || document.documentElement).appendChild(meta);
  } catch (e) {
    /* never block the rest of the page */
  }
})();
