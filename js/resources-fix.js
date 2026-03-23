
(function(){
'use strict';
var path = window.location.pathname.replace(/\/$/,'');

/* ============================================
   RESOURCE SUBPAGE CONTENT INJECTION
   ============================================ */
var PAGES = {

'/resources-faq': {
  title: 'Estate Planning FAQ',
  subtitle: 'Answers to the most common questions about estate planning in Puerto Rico.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'

  +'<div class="rl-faq"><button class="rl-faq-q" aria-expanded="false">What is estate planning, and why is it important in Puerto Rico?</button>'
  +'<div class="rl-faq-a"><p>Estate planning is the process of arranging for the management and distribution of your assets during your lifetime and after death. In Puerto Rico, it is especially important because the jurisdiction follows a civil law system derived from Spanish law, which includes forced heirship rules that may limit how you distribute your estate. Proper planning ensures your wishes are honored while complying with local law.</p></div></div>'

  +'<div class="rl-faq"><button class="rl-faq-q" aria-expanded="false">What is the difference between a will and a trust under Puerto Rico law?</button>'
  +'<div class="rl-faq-a"><p>A will (<em>testamento</em>) is a document that takes effect only upon your death and must go through the probate process. A trust (<em>fideicomiso</em>) can take effect during your lifetime and operates outside of probate, potentially allowing faster and more private asset distribution. Puerto Rico trusts are governed by the Puerto Rico Trust Act (Ley 219-2012), which offers significant planning flexibility.</p></div></div>'

  +'<div class="rl-faq"><button class="rl-faq-q" aria-expanded="false">What is forced heirship (leg\u00edtima)?</button>'
  +'<div class="rl-faq-a"><p>Under Puerto Rico\u2019s Civil Code, a portion of your estate is reserved by law for certain heirs, known as <em>legitimarios</em> (forced heirs). Under the 2020 Civil Code (Ley 55-2020), the legitimate portion (<em>leg\u00edtima</em>) is one-half of the estate, reserved for descendants. The remaining half is freely disposable. This system restricts your ability to disinherit children but provides more flexibility than the prior three-thirds rule.</p></div></div>'

  +'<div class="rl-faq"><button class="rl-faq-q" aria-expanded="false">Do I need to go through probate in Puerto Rico?</button>'
  +'<div class="rl-faq-a"><p>If you hold assets solely in your name at the time of death, your heirs generally must obtain a <em>declaratoria de herederos</em> (judicial declaration of heirship) to establish who the legal heirs are and in what proportion they inherit. Additional steps are then required to collect, administer, and partition the estate\u2019s assets. Assets held in trust, joint accounts, or with designated beneficiaries can bypass this process entirely. Proper estate planning can significantly reduce or eliminate the need for court proceedings.</p></div></div>'

  +'<div class="rl-faq"><button class="rl-faq-q" aria-expanded="false">What happens if I die without a will in Puerto Rico?</button>'
  +'<div class="rl-faq-a"><p>If you die intestate (without a valid will), Puerto Rico\u2019s Civil Code determines how your assets are distributed. Generally, your estate passes to your descendants first, then to your surviving spouse, parents, and other relatives in a statutory order of succession. The court will appoint an administrator, and the process can be significantly longer and more expensive than with a proper estate plan in place.</p></div></div>'

  +'<div class="rl-faq"><button class="rl-faq-q" aria-expanded="false">Can I create an irrevocable trust in Puerto Rico?</button>'
  +'<div class="rl-faq-a"><p>Yes. Puerto Rico\u2019s Trust Act permits both revocable and irrevocable trusts. Irrevocable trusts are often used for asset protection, tax planning, and ensuring assets pass outside of probate. Once established, the grantor generally cannot modify or revoke the trust without the beneficiaries\u2019 consent, which provides stronger creditor protection.</p></div></div>'

  +'<div class="rl-faq"><button class="rl-faq-q" aria-expanded="false">How does Act 60 affect my estate planning?</button>'
  +'<div class="rl-faq-a"><p>Act 60 (formerly Acts 20 and 22) provides significant tax incentives for individuals and businesses that relocate to Puerto Rico. However, these incentives apply primarily to income and capital gains earned after becoming a <em>bona fide</em> resident. Estate planning for Act 60 decree holders often involves coordinating federal estate tax obligations, structuring trusts to protect incentivized assets, and considering dual-will architecture for assets in multiple jurisdictions.</p></div></div>'

  +'<div class="rl-faq"><button class="rl-faq-q" aria-expanded="false">What types of powers of attorney should I have?</button>'
  +'<div class="rl-faq-a"><p>In Puerto Rico, it is advisable to have both a general durable power of attorney (<em>poder general duradero</em>) for financial matters and a healthcare directive or power of attorney for medical decisions. These documents ensure that trusted individuals can manage your affairs if you become incapacitated, without requiring court intervention.</p></div></div>'

  +'<div class="rl-sub-cta"><p><strong>Have more questions?</strong></p><p>Schedule a consultation to discuss your estate planning needs.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources-wills-vs-trusts': {
  title: 'Wills vs. Trusts in Puerto Rico',
  subtitle: 'Understanding which estate planning tool is right for your situation.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>Overview</h2>'
  +'<p>Both wills and trusts are essential estate planning tools in Puerto Rico, but they serve different purposes and operate under distinct legal frameworks. Understanding their differences is key to building an effective estate plan.</p>'

  +'<h2>Wills (Testamento)</h2>'
  +'<p>A will is a legal document in which you declare how your assets should be distributed after death. In Puerto Rico, wills must comply with the Civil Code\u2019s formalities, including being executed before a notary public. Under the 2020 Civil Code (Art. 1644), witnesses are no longer mandatory for open wills unless requested by the testator or the notary.</p>'
  +'<h3>Types of Wills in Puerto Rico</h3>'
  +'<ul><li><strong>Open will (<em>testamento abierto</em>):</strong> Executed before a notary public; the most common and standard form under the current Civil Code. Under Art. 1644 of Ley 55-2020, witnesses are no longer mandatory unless requested by the testator or notary.</li>'
  +'<li><strong>Holographic will (<em>testamento ol\u00f3grafo</em>):</strong> Written entirely in the testator\u2019s handwriting; requires judicial validation after death.</li></ul>'
  +'<p><em>Note: Under the prior Civil Code, Puerto Rico also recognized closed wills (<em>testamento cerrado</em>). The 2020 Civil Code (Ley 55-2020) eliminated this form. Legacy closed wills executed before November 28, 2020 may still be valid under transitional rules.</em></p>'
  +'<h3>Advantages of a Will</h3>'
  +'<ul><li>Relatively simple and inexpensive to create</li><li>Can appoint guardians for minor children</li><li>Can be updated or revoked at any time during your lifetime</li><li>Familiar and widely understood legal instrument</li></ul>'
  +'<h3>Limitations</h3>'
  +'<ul><li>Requires a court-supervised succession process (<em>declaratoria de herederos</em>) to identify heirs and authorize asset transfers</li><li>Becomes public record after death</li><li>Does not provide asset protection during your lifetime</li><li>Subject to forced heirship restrictions</li></ul>'

  +'<h2>Trusts (Fideicomiso)</h2>'
  +'<p>Puerto Rico trusts are governed by the Puerto Rico Trust Act (Ley 219-2012), which provides a flexible and powerful planning tool. A trust is a legal arrangement where a grantor (fideicomitente) transfers assets to a trustee (fiduciario) for the benefit of beneficiaries (fideicomisarios).</p>'
  +'<h3>Types of Trusts</h3>'
  +'<ul><li><strong>Revocable trust:</strong> The grantor retains the right to modify or dissolve the trust during their lifetime.</li>'
  +'<li><strong>Irrevocable trust:</strong> Once created, the grantor generally cannot change the trust\u2019s terms, providing stronger asset protection.</li>'
  +'<li><strong>Asset protection trust:</strong> Designed to shield assets from creditors while allowing beneficiaries to benefit from the trust.</li></ul>'
  +'<h3>Advantages of a Trust</h3>'
  +'<ul><li>Avoids probate entirely</li><li>Maintains privacy (not a public record)</li><li>Can provide asset protection from creditors</li><li>Effective for managing assets across multiple jurisdictions</li><li>Provides for incapacity planning</li></ul>'
  +'<h3>Limitations</h3>'
  +'<ul><li>More complex and costly to establish than a will</li><li>Requires proper funding (assets must be titled in the trust)</li><li>Ongoing administration and fiduciary responsibilities</li></ul>'

  +'<h2>Which Is Right for You?</h2>'
  +'<p>Most comprehensive estate plans in Puerto Rico include both a will and a trust. The will serves as a safety net for assets not held in trust, while the trust handles the bulk of the estate planning objectives\u2014privacy, probate avoidance, and asset protection. The right combination depends on your family structure, assets, and goals.</p>'

  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0 0 8px;font-size:.88rem;"><strong>Related articles from our Trust Law Series:</strong></p><ul style="margin:0;padding:0 0 0 18px;font-size:.85rem;"><li><a href="/resources/trust-vs-will-puerto-rico" style="color:#a68c42;">Trust vs. Will: Which Do You Need?</a> \u2014 Side-by-side comparison under PR law</li><li><a href="/resources/modifying-irrevocable-trusts" style="color:#a68c42;">Modifying &amp; Decanting Irrevocable Trusts</a> \u2014 When and how changes are possible</li><li><a href="/resources/family-trust-pitfalls" style="color:#a68c42;">Common Family Trust Mistakes</a> \u2014 Pitfalls to avoid in trust planning</li></ul></div>'
  +'<div class="rl-sub-cta"><p><strong>Need help deciding?</strong></p><p>Our attorneys can evaluate your situation and recommend the best approach.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources-forced-heirship': {
  title: 'Forced Heirship (Leg\u00edtima)',
  subtitle: 'How Puerto Rico\u2019s forced heirship rules affect your estate plan.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>What Is Forced Heirship?</h2>'
  +'<p>Forced heirship is a legal principle in civil law jurisdictions, including Puerto Rico, that reserves a mandatory portion of a deceased person\u2019s estate for certain close relatives\u2014descendants and, under the 2020 Civil Code, the surviving spouse. This means you cannot freely dispose of your entire estate; a portion must pass to your forced heirs (<em>herederos forzosos</em> or <em>legitimarios</em>).</p>'

  +'<h2>The 2020 Civil Code (Ley 55-2020)</h2>'
  +'<p>Puerto Rico\u2019s new Civil Code, enacted as Ley 55-2020 and effective November 28, 2020, significantly reformed the forced heirship system. Under the previous code, the estate was divided into thirds: one-third as the <em>leg\u00edtima estricta</em>, one-third as the <em>mejora</em> (improvement third), and one-third as free disposition. The new code simplifies this to a two-part system.</p>'

  +'<h3>Current Structure</h3>'
  +'<ul><li><strong>Leg\u00edtima (one-half):</strong> Reserved for forced heirs (children, their descendants by representation, and the surviving spouse). This half must be distributed equally among all forced heirs.</li>'
  +'<li><strong>Free disposition (one-half):</strong> The testator may distribute this portion to anyone, including a favored child, a spouse, a charity, or any third party.</li></ul>'

  +'<h3>Who Are Forced Heirs?</h3>'
  +'<ul><li><strong>Descendants:</strong> Children are the primary forced heirs. If a child predeceases the testator, that child\u2019s descendants inherit by right of representation.</li>'
  +'<li><strong>Surviving spouse:</strong> Under the 2020 Civil Code, the surviving spouse is a forced heir in the first order of succession, sharing the leg\u00edtima equally with the children.</li>'
  +'<li><strong>Ascending heirs:</strong> If there are no descendants, parents may have limited forced heirship rights depending on the circumstances.</li></ul>'

  +'<h2>Key Changes from the Prior Code</h2>'
  +'<ul><li>The <em>mejora</em> (improvement third) has been eliminated</li>'
  +'<li>The forced portion was reduced from two-thirds to one-half</li>'
  +'<li>Greater testamentary freedom to dispose of assets</li>'
  +'<li>The right of representation for grandchildren was preserved</li></ul>'

  +'<h2>Planning Around Forced Heirship</h2>'
  +'<p>While forced heirship cannot be avoided entirely for Puerto Rico assets, there are legitimate strategies to plan around its impact:</p>'
  +'<ul><li><strong>Trust planning:</strong> Properly structured trusts can provide flexibility within forced heirship constraints.</li>'
  +'<li><strong>Lifetime gifts:</strong> Gifts made during your lifetime may reduce the estate subject to forced heirship, though collation rules may apply.</li>'
  +'<li><strong>Multi-jurisdictional planning:</strong> Assets located outside Puerto Rico may be governed by different succession laws.</li>'
  +'<li><strong>Insurance and beneficiary designations:</strong> Life insurance proceeds payable to named beneficiaries generally fall outside the estate for forced heirship purposes.</li></ul>'

  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:.88rem;"><strong>Want the deep dive?</strong> Read our comprehensive analysis: <a href="/resources/avoiding-probate-legitima" style="color:#a68c42;font-weight:600;">Avoiding Probate in Puerto Rico: Trusts and the Leg\u00edtima \u2192</a></p></div>'

  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0 0 8px;font-size:.88rem;"><strong>Related articles:</strong></p><ul style="margin:0;padding:0 0 0 18px;font-size:.85rem;"><li><a href="/resources/forced-heirship-estate-plan" style="color:#a68c42;">How Forced Heirship Affects Your Estate Plan</a> \u2014 Strategies that work within the leg\u00edtima</li><li><a href="/resources/special-needs-trusts-medicaid" style="color:#a68c42;">Special Needs Trusts &amp; Medicaid Planning</a> \u2014 Protecting beneficiaries with disabilities</li><li><a href="/resources/ilits-and-slats" style="color:#a68c42;">ILITs and SLATs</a> \u2014 Advanced insurance and spousal trust strategies</li></ul></div>'

  +'<div class="rl-sub-cta"><p><strong>Need to plan around forced heirship?</strong></p><p>Our team can help structure your estate to maximize flexibility while complying with Puerto Rico law.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources-fiduciary-duties': {
  title: 'Fiduciary Duties',
  subtitle: 'Understanding the responsibilities of trustees and executors in Puerto Rico.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>What Is a Fiduciary?</h2>'
  +'<p>A fiduciary is a person or entity entrusted with the legal responsibility to manage assets or affairs on behalf of another. In Puerto Rico estate planning, the most common fiduciary roles are trustees (<em>fiduciarios</em>) of trusts and executors (<em>albaceas</em>) of estates.</p>'

  +'<h2>Core Fiduciary Duties</h2>'
  +'<h3>Duty of Loyalty</h3>'
  +'<p>The fiduciary must act solely in the interest of the beneficiaries, not for personal gain. This means avoiding conflicts of interest and never engaging in self-dealing transactions unless expressly authorized by the trust instrument or applicable law.</p>'
  +'<h3>Duty of Care (Prudence)</h3>'
  +'<p>A fiduciary must manage trust or estate assets with the skill and diligence that a reasonably prudent person would exercise. For investment decisions, this generally means diversifying assets, considering the beneficiaries\u2019 needs, and following a rational investment strategy.</p>'
  +'<h3>Duty of Impartiality</h3>'
  +'<p>When there are multiple beneficiaries, the fiduciary must balance the interests of all parties fairly. This is particularly important when a trust has both income beneficiaries and remainder beneficiaries with potentially competing interests.</p>'
  +'<h3>Duty to Inform and Account</h3>'
  +'<p>Fiduciaries must keep accurate records and provide regular accountings to beneficiaries. Under Puerto Rico\u2019s Trust Act, the trustee has an affirmative obligation to provide information about the trust\u2019s administration to qualified beneficiaries.</p>'
  +'<h3>Duty Not to Delegate Improperly</h3>'
  +'<p>While a fiduciary may hire professionals (accountants, attorneys, investment advisors), they cannot abdicate their core decision-making responsibilities. Delegation must be prudent and properly supervised.</p>'

  +'<h2>Trustee vs. Executor Responsibilities</h2>'
  +'<h3>Trustee Responsibilities</h3>'
  +'<ul><li>Managing and investing trust assets according to the trust document</li>'
  +'<li>Making distributions to beneficiaries as directed by the trust terms</li>'
  +'<li>Filing trust tax returns and paying applicable taxes</li>'
  +'<li>Providing annual accountings to beneficiaries</li>'
  +'<li>Maintaining trust records and documentation</li></ul>'

  +'<h3>Executor Responsibilities</h3>'
  +'<ul><li>Locating and securing the decedent\u2019s assets</li>'
  +'<li>Paying debts, taxes, and expenses of the estate</li>'
  +'<li>Filing the will for probate and obtaining court authority</li>'
  +'<li>Distributing assets according to the will\u2019s terms</li>'
  +'<li>Providing a final accounting to the court and beneficiaries</li></ul>'

  +'<h2>Liability and Protection</h2>'
  +'<p>Fiduciaries who breach their duties can be held personally liable for losses. However, many trust instruments include exculpation clauses that limit liability for good-faith decisions. Fiduciaries should maintain detailed records, seek professional advice when needed, and consider fiduciary liability insurance for larger estates.</p>'

  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:.88rem;"><strong>Want the deep dive?</strong> Read our comprehensive analysis: <a href="/resources/fiduciary-duties-trustees" style="color:#a68c42;font-weight:600;">Fiduciary Duties Under Puerto Rico Trust Law \u2192</a></p></div>'

  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:.88rem;"><strong>See also:</strong> <a href="/resources/family-trust-pitfalls" style="color:#a68c42;font-weight:600;">Common Family Trust Mistakes \u2192</a> \u2014 Pitfalls trustees and families should avoid</p></div>'

  +'<div class="rl-sub-cta"><p><strong>Serving as a trustee or executor?</strong></p><p>We can guide you through your fiduciary obligations and help you fulfill them properly.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources-act60': {
  title: 'Estate Planning for Act 60 Decree Holders',
  subtitle: 'Essential strategies for protecting your tax incentives through proper planning.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>Understanding Act 60 and Estate Planning</h2>'
  +'<p>Act 60 (the Puerto Rico Incentives Code, consolidating former Acts 20, 22, and others) provides significant tax benefits to individuals and businesses that establish bona fide residency in Puerto Rico. While Act 60 primarily addresses income and capital gains taxation, its benefits create unique estate planning considerations that require careful coordination.</p>'

  +'<h2>Key Considerations</h2>'
  +'<h3>Federal Estate Tax Exposure</h3>'
  +'<p>Puerto Rico residents remain subject to the federal estate tax. While Act 60 may reduce income tax obligations, your estate may still face federal estate tax if it exceeds the applicable exclusion amount. Proper planning can minimize or eliminate this exposure through trusts, gifting strategies, and other techniques.</p>'

  +'<h3>Dual-Will Architecture</h3>'
  +'<p>Many Act 60 decree holders maintain assets in both Puerto Rico and U.S. states. A dual-will strategy uses separate wills for each jurisdiction\u2014a Puerto Rico will for local assets governed by civil law, and a stateside will for common-law assets. This approach avoids conflicts between jurisdictions and ensures each set of assets is administered under the appropriate legal framework.</p>'

  +'<h3>Trust Structures for Act 60 Holders</h3>'
  +'<p>Puerto Rico trusts can be powerful tools for Act 60 decree holders. Key structures include:</p>'
  +'<ul><li><strong>Puerto Rico irrevocable trusts:</strong> Can hold assets outside the grantor\u2019s estate while potentially benefiting from Puerto Rico\u2019s trust-friendly laws.</li>'
  +'<li><strong>Asset protection trusts:</strong> Protect incentivized assets from potential creditor claims.</li>'
  +'<li><strong>Multi-generational trusts:</strong> Allow multi-generational wealth transfer while maintaining trust benefits across generations.</li></ul>'

  +'<h3>Residency and Domicile Planning</h3>'
  +'<p>Maintaining bona fide Puerto Rico residency is critical for Act 60 benefits. Your estate plan should be consistent with your residency position. Key documentation includes Puerto Rico-situs bank accounts, local property ownership, voter registration, and driver\u2019s license\u2014all of which support your domicile claim for both tax and estate planning purposes.</p>'

  +'<h3>Coordination with Pre-Move Assets</h3>'
  +'<p>Assets acquired before relocating to Puerto Rico may have different tax treatment than those acquired after establishing residency. Your estate plan should clearly identify and separate pre-move and post-move assets, as this distinction affects capital gains treatment and, in turn, estate valuation.</p>'

  +'<h2>Common Pitfalls</h2>'
  +'<ul><li>Failing to update an existing estate plan after relocating to Puerto Rico</li>'
  +'<li>Using only a mainland U.S. will, which may conflict with Puerto Rico\u2019s civil law system</li>'
  +'<li>Overlooking forced heirship rules when structuring asset distribution</li>'
  +'<li>Neglecting to coordinate federal estate tax planning with Act 60 income tax benefits</li>'
  +'<li>Inconsistent residency documentation that undermines domicile claims</li></ul>'

  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0 0 8px;font-size:.88rem;"><strong>Related articles for Act 60 decree holders:</strong></p><ul style="margin:0;padding:0 0 0 18px;font-size:.85rem;"><li><a href="/resources/trust-taxation-act-60" style="color:#a68c42;">Trust Taxation &amp; Act 60 Benefits</a> \u2014 How trusts interact with Act 60 tax incentives</li><li><a href="/resources/foreign-trust-trap" style="color:#a68c42;">The Foreign Trust Trap</a> \u2014 Classification risks for mainland-created trusts</li><li><a href="/resources/mainland-trust-to-puerto-rico" style="color:#a68c42;">Migrating a Mainland Trust to Puerto Rico</a> \u2014 Steps and considerations for redomiciling</li></ul></div>'
  +'<div class="rl-sub-cta"><p><strong>Act 60 decree holder?</strong></p><p>We specialize in helping decree holders build estate plans that protect their incentives.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources-cases': {
  title: 'Case Highlights',
  subtitle: 'Key judicial decisions that shape Puerto Rico trust and estate law.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<p>Puerto Rico\u2019s trust and estate law is shaped by judicial decisions from the Puerto Rico Supreme Court, the U.S. District Court for the District of Puerto Rico, and the U.S. Court of Appeals for the First Circuit. Below are key areas where case law has provided important guidance for estate planners and fiduciaries.</p>'

  +'<div class="rl-case-card"><h3>Forced Heirship Challenges</h3>'
  +'<p>Puerto Rico courts have consistently upheld the forced heirship system, rejecting attempts to bypass the <em>leg\u00edtima</em> through inter vivos transfers that are found to be simulated or made in fraud of heirs\u2019 rights. Courts apply a collation analysis (<em>colaci\u00f3n</em>) to bring certain lifetime gifts back into the estate for distribution purposes. Recent decisions under the 2020 Civil Code are beginning to clarify the application of the new one-half <em>leg\u00edtima</em> rule.</p></div>'

  +'<div class="rl-case-card"><h3>Trust Validity and Formation</h3>'
  +'<p>Since the enactment of the Puerto Rico Trust Act in 2012, courts have addressed questions regarding proper trust formation, the distinction between revocable and irrevocable trusts, and the enforceability of trust provisions that conflict with public policy. Key rulings have reinforced the Act\u2019s intent to create a modern, flexible trust framework while respecting Puerto Rico\u2019s civil law traditions.</p></div>'

  +'<div class="rl-case-card"><h3>Fiduciary Breach and Liability</h3>'
  +'<p>Puerto Rico courts have addressed trustee liability for breach of fiduciary duty, including cases involving self-dealing, imprudent investments, and failure to provide accountings. These decisions establish that fiduciaries must act with the care and diligence of a prudent person and can face personal liability, including damages and removal, for violations of their duties.</p></div>'

  +'<div class="rl-case-card"><h3>Domicile and Residency Disputes</h3>'
  +'<p>With the growth of Act 60 relocations, courts have been asked to determine an individual\u2019s domicile for tax and estate purposes. Decisions focus on objective factors\u2014where the individual maintains a home, conducts business, votes, and has social and family ties. These cases are critical for estate planning because domicile determines which jurisdiction\u2019s succession laws apply.</p></div>'

  +'<div class="rl-case-card"><h3>Will Contest and Testamentary Capacity</h3>'
  +'<p>Will contests in Puerto Rico often involve claims of lack of testamentary capacity, undue influence, or failure to comply with formal requirements. Courts apply a presumption of testamentary capacity and require clear evidence to invalidate a will. Notarized open wills (<em>testamento abierto</em>) receive the strongest presumption of validity.</p></div>'

  +'<div class="rl-case-card"><h3>Government Contract and Procurement Disputes</h3>'
  +'<p>Our practice also addresses significant government contracting cases, including bid protests, contract interpretation disputes, and procurement compliance challenges. Key decisions from Puerto Rico courts and federal tribunals have established important precedents regarding standing in bid protests, the scope of government immunity in contract disputes, and the application of federal procurement regulations in Puerto Rico.</p></div>'

  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:.88rem;"><strong>Want the full case-by-case analysis?</strong> Read our in-depth article: <a href="/resources/landmark-trust-cases" style="color:#a68c42;font-weight:600;">Landmark Puerto Rico Trust Cases You Should Know \u2192</a></p></div>'

  +'<p style="font-size:.85rem;color:#a8a298;font-style:italic;margin-top:24px;">This page provides general educational information about areas of law addressed in Puerto Rico case decisions. For analysis of specific cases and their impact, visit our <a href="/blog" style="color:#a68c42;">Blog</a>.</p>'

  +'<div class="rl-sub-cta"><p><strong>Need case-specific guidance?</strong></p><p>Our attorneys can analyze how relevant decisions affect your legal situation.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources-glossary': {
  title: 'Bilingual Glossary',
  subtitle: 'Essential estate planning terms in English and Spanish.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<p>Puerto Rico\u2019s legal system operates in both English and Spanish. Understanding key estate planning terms in both languages is essential for effective communication with attorneys, courts, and family members.</p>'
  +'<table class="rl-glossary-table"><thead><tr><th>English</th><th>Espa\u00f1ol</th><th>Definition</th></tr></thead><tbody>'
  +'<tr><td>Beneficiary</td><td>Beneficiario</td><td>A person or entity designated to receive assets from a trust, will, or insurance policy.</td></tr>'
  +'<tr><td>Trust</td><td>Fideicomiso</td><td>A legal arrangement where assets are held by a trustee for the benefit of beneficiaries.</td></tr>'
  +'<tr><td>Trustee</td><td>Fiduciario</td><td>The person or entity responsible for managing trust assets according to the trust terms.</td></tr>'
  +'<tr><td>Grantor / Settlor</td><td>Fideicomitente</td><td>The person who creates and funds a trust.</td></tr>'
  +'<tr><td>Will / Testament</td><td>Testamento</td><td>A legal document declaring how a person\u2019s assets should be distributed after death.</td></tr>'
  +'<tr><td>Testator</td><td>Testador(a)</td><td>The person who makes a will.</td></tr>'
  +'<tr><td>Executor</td><td>Albacea</td><td>The person appointed to carry out the terms of a will and administer the estate.</td></tr>'
  +'<tr><td>Forced Heirship</td><td>Leg\u00edtima</td><td>The portion of an estate reserved by law for certain heirs (descendants and surviving spouse under the 2020 Civil Code).</td></tr>'
  +'<tr><td>Forced Heir</td><td>Heredero Forzoso / Legitimario</td><td>A person entitled by law to a share of the estate: descendants, and the surviving spouse under the 2020 Civil Code.</td></tr>'
  +'<tr><td>Declaratoria de Herederos</td><td>Declaratoria de Herederos</td><td>A judicial proceeding to identify legal heirs, establish inheritance shares, and authorize the transfer of assets. Required whether or not a will exists; additional steps follow for asset collection, administration, and partition.</td></tr>'
  +'<tr><td>Power of Attorney</td><td>Poder</td><td>A legal document authorizing someone to act on your behalf in legal or financial matters.</td></tr>'
  +'<tr><td>Intestate</td><td>Intestado(a) / Ab Intestato</td><td>Dying without a valid will; the estate is distributed according to statutory rules.</td></tr>'
  +'<tr><td>Irrevocable Trust</td><td>Fideicomiso Irrevocable</td><td>A trust that cannot be modified or dissolved by the grantor after its creation.</td></tr>'
  +'<tr><td>Asset Protection</td><td>Protecci\u00f3n de Activos</td><td>Legal strategies to shield assets from creditors, lawsuits, and judgments.</td></tr>'
  +'<tr><td>Notary Public</td><td>Notario(a)</td><td>In Puerto Rico, an attorney authorized to authenticate legal documents, including wills.</td></tr>'
  +'<tr><td>Succession</td><td>Sucesi\u00f3n</td><td>The process by which a deceased person\u2019s rights and obligations pass to their heirs.</td></tr>'
  +'<tr><td>Collation</td><td>Colaci\u00f3n</td><td>The process of adding the value of lifetime gifts back to the estate for distribution calculations.</td></tr>'
  +'<tr><td>Deed of Gift</td><td>Escritura de Donaci\u00f3n</td><td>A legal document transferring ownership of property as a gift during the donor\u2019s lifetime.</td></tr>'
  +'<tr><td>Civil Code</td><td>C\u00f3digo Civil</td><td>The primary body of law governing private legal matters in Puerto Rico, including succession.</td></tr>'
  +'<tr><td>Will Contest</td><td>Impugnaci\u00f3n de Testamento</td><td>A legal challenge to the validity of a will, typically based on capacity, undue influence, or formality defects.</td></tr>'
  +'</tbody></table>'

  +'<div class="rl-sub-cta"><p><strong>Need bilingual legal counsel?</strong></p><p>Our team is fully bilingual and serves clients in both English and Spanish.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources-process': {
  title: 'What to Expect',
  subtitle: 'A step-by-step guide to the estate planning process at Riefkohl Law.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<p>Estate planning is a collaborative process. Here is what you can expect when you work with our team, from the first conversation to the execution of your documents.</p>'

  +'<div class="rl-timeline">'
  +'<div class="rl-step"><div class="rl-step-title">Step 1: Free Strategy Call</div><div class="rl-step-desc">We begin with a complimentary consultation to understand your goals, family situation, and assets. This call helps us determine the scope of your estate plan and provide an initial assessment.</div><div class="rl-step-time">Duration: 30\u201345 minutes</div></div>'

  +'<div class="rl-step"><div class="rl-step-title">Step 2: Information Gathering</div><div class="rl-step-desc">After the initial consultation, we provide a questionnaire and checklist of documents we need\u2014asset inventories, existing estate documents, insurance policies, and family information. This stage ensures we have a complete picture of your situation.</div><div class="rl-step-time">Duration: 1\u20132 weeks (client-dependent)</div></div>'

  +'<div class="rl-step"><div class="rl-step-title">Step 3: Plan Design</div><div class="rl-step-desc">Our attorneys analyze your information and design a customized estate plan. We consider Puerto Rico\u2019s forced heirship rules, tax implications, asset protection strategies, and your specific goals. We then present our recommendations in a clear, detailed proposal.</div><div class="rl-step-time">Duration: 1\u20132 weeks</div></div>'

  +'<div class="rl-step"><div class="rl-step-title">Step 4: Review Meeting</div><div class="rl-step-desc">We meet with you to walk through the proposed plan, explain each document\u2019s purpose, and answer your questions. This is a collaborative session where we refine the plan based on your feedback and ensure you are fully comfortable with every provision.</div><div class="rl-step-time">Duration: 60\u201390 minutes</div></div>'

  +'<div class="rl-step"><div class="rl-step-title">Step 5: Document Drafting</div><div class="rl-step-desc">Our team drafts all estate planning documents, which may include wills, trusts, powers of attorney, healthcare directives, and trust funding instructions. Each document is reviewed for accuracy and compliance with Puerto Rico law.</div><div class="rl-step-time">Duration: 1\u20132 weeks</div></div>'

  +'<div class="rl-step"><div class="rl-step-title">Step 6: Execution and Signing</div><div class="rl-step-desc">We schedule a signing session, typically at our office in San Juan or via a convenient arrangement. For wills, a Puerto Rico notary public officiates the execution (witnesses are no longer mandatory under Art. 1644 of the 2020 Civil Code unless requested). Trust documents and powers of attorney are also formally executed.</div><div class="rl-step-time">Duration: 1\u20132 hours</div></div>'

  +'<div class="rl-step"><div class="rl-step-title">Step 7: Trust Funding and Implementation</div><div class="rl-step-desc">After signing, we assist with funding your trust\u2014transferring titles, updating beneficiary designations, and retitling accounts. We provide a detailed checklist and can coordinate directly with your financial institutions.</div><div class="rl-step-time">Duration: 2\u20134 weeks</div></div>'

  +'<div class="rl-step"><div class="rl-step-title">Ongoing: Periodic Review</div><div class="rl-step-desc">Life changes\u2014marriage, children, significant asset changes, new legislation\u2014may require updates to your plan. We recommend reviewing your estate plan every 3\u20135 years or whenever major life events occur.</div><div class="rl-step-time">Ongoing relationship</div></div>'
  +'</div>'

  +'<div class="rl-sub-cta"><p><strong>Ready to get started?</strong></p><p>Begin with a free strategy call to discuss your estate planning needs.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
}

,

'/resources/act-60-estate-planning-mistakes': {
  title: '5 Critical Mistakes Act 60 Holders Make with Estate Planning',
  subtitle: 'How to protect your tax benefits through proper planning under Puerto Rico law.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>Mistake 1: Not Updating Your Will After Relocating</h2>'
  +'<p>Puerto Rico is a civil law jurisdiction. The estate and succession rules are fundamentally different from common law states. Under the Civil Code (Ley 55-2020), a portion of your estate\u2014the <em>leg\u00edtima</em>\u2014is reserved by law for your children. If your mainland will attempts to leave everything to a spouse or trust without accounting for the <em>leg\u00edtima</em>, a Puerto Rico court can invalidate those provisions.</p>'
  +'<p><strong>What to do:</strong> Have a Puerto Rico-licensed attorney review your existing will. Consider a dual-will architecture\u2014one for Puerto Rico assets and one for assets elsewhere.</p>'
  +'<h2>Mistake 2: Ignoring Forced Heirship Rules</h2>'
  +'<p>Under the Civil Code (Ley 55-2020), one-half of your estate is reserved for your forced heirs\u2014your children and surviving spouse, who share the <em>leg\u00edtima</em> equally. The remaining one-half can go to anyone you choose.</p>'
  +'<p><strong>What to do:</strong> Work with an attorney who understands both civil law forced heirship and the trust structures available under <a href="/puerto-rico-trusts">Puerto Rico Law 219-2012</a>.</p>'
  +'<h2>Mistake 3: Using Only a Mainland Trust</h2>'
  +'<p>Mainland revocable living trusts were not designed with Puerto Rico\u2019s legal framework in mind. Trust recognition, governing law conflicts, and forced heirship interaction all create issues. A mainland trust does not override Puerto Rico\u2019s forced heirship rules.</p>'
  +'<p><strong>What to do:</strong> Have your existing trust reviewed by a Puerto Rico attorney who understands Law 219-2012. Create a new Puerto Rico trust that works alongside your existing structures.</p>'
  +'<h2>Mistake 4: Not Coordinating Federal and PR Estate Tax</h2>'
  +'<p>While Puerto Rico abolished its local estate tax through Act 76-2017, federal estate tax still applies, and residency issues can trigger state-level estate taxes in your prior domicile. Without proper planning, your estate may face unexpected tax exposure.</p>'
  +'<p><strong>What to do:</strong> Engage an attorney and tax advisor who can model your estate tax exposure under both federal and Puerto Rico law. Consider lifetime gifting, ILITs, and charitable planning while the federal exemption is still high.</p>'
  +'<h2>Mistake 5: Failing to Maintain Residency Documentation</h2>'
  +'<p>If your residency is challenged posthumously, your estate could be treated as domiciled in your prior state, triggering state estate tax. Your Puerto Rico trust structures may be recharacterized, and Act 60 income tax benefits could be clawed back.</p>'
  +'<p><strong>What to do:</strong> Maintain meticulous records of your presence in Puerto Rico: flight records, credit card statements, doctor visits, voter registration, community involvement. Instruct your estate planning attorney on where these records are stored.</p>'
  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0 0 8px;font-size:.88rem;"><strong>Related articles:</strong></p><ul style="margin:0;padding:0 0 0 18px;font-size:.85rem;"><li><a href="/resources/trust-taxation-act-60" style="color:#a68c42;">Trust Taxation &amp; Act 60 Benefits</a> \u2014 How trusts interact with Act 60 tax incentives</li><li><a href="/resources/mainland-trust-to-puerto-rico" style="color:#a68c42;">Migrating a Mainland Trust to Puerto Rico</a> \u2014 Steps for redomiciling your trust</li><li><a href="/resources/foreign-trust-trap" style="color:#a68c42;">The Foreign Trust Trap</a> \u2014 Classification risks for mainland-created trusts</li></ul></div>'
  +'<div class="rl-sub-cta"><p><strong>Ready to review your estate plan?</strong></p><p>Schedule a free strategy call to discuss how your Act 60 decree interacts with your estate planning needs.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources/trust-vs-will-puerto-rico': {
  title: 'Puerto Rico Trust vs. Will: Which Do You Need?',
  subtitle: 'How each tool works under Puerto Rico law, and when you need both.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>How Wills Work in Puerto Rico</h2>'
  +'<p>A will (<em>testamento</em>) directs how your assets are distributed after death. Under the current Civil Code (Ley 55-2020), Puerto Rico recognizes two forms: open wills (before a notary) and holographic wills (handwritten). Wills are subject to forced heirship\u2014one-half of your estate is reserved for your forced heirs (children and surviving spouse). Wills also do not avoid the court-supervised succession process, which can take months to over a year.</p>'
  +'<h2>How Trusts Work in Puerto Rico</h2>'
  +'<p>Trusts (<em>fideicomiso</em>) are governed by <a href="/puerto-rico-trusts">Law 219-2012</a>. A <strong>revocable trust</strong> avoids probate and provides incapacity planning but does not protect assets from creditors. An <strong>irrevocable trust</strong> provides asset protection, estate tax reduction, and multi-generational planning. <strong>Multi-generational trusts</strong> can last for the life of the last surviving beneficiary named in the trust instrument, plus 30 years.</p>'
  +'<h2>Key Differences</h2>'
  +'<ul><li><strong>Probate avoidance:</strong> Will\u2014No. Trust\u2014Yes.</li>'
  +'<li><strong>Asset protection:</strong> Will\u2014No. Trust (irrevocable)\u2014Yes.</li>'
  +'<li><strong>Incapacity planning:</strong> Will\u2014No. Trust\u2014Yes.</li>'
  +'<li><strong>Privacy:</strong> Will\u2014Public (probate). Trust\u2014Private.</li>'
  +'<li><strong>Cost:</strong> Will\u2014$1,500\u2013$3,000. Revocable trust\u2014$7,500\u2013$15,000. Irrevocable trust\u2014$15,000\u2013$50,000+.</li></ul>'
  +'<h2>Trusts and Forced Heirship</h2>'
  +'<p>A trust does not automatically override forced heirship. However, a well-structured trust can work within the framework\u2014providing income to a spouse while preserving principal for children, and using the <em>libre disposici\u00f3n</em> half to benefit non-heirs or to provide additional flexibility in how assets are distributed.</p>'
  +'<h2>When You Need Both</h2>'
  +'<p>A trust only controls assets transferred into it. A \u201cpour-over will\u201d acts as a safety net, directing any remaining assets into the trust at death. You also need a will to name guardians for minor children and designate an executor.</p>'
  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:.88rem;"><strong>See also:</strong> <a href="/resources-wills-vs-trusts" style="color:#a68c42;font-weight:600;">Wills vs. Trusts in Puerto Rico \u2192</a> \u2014 Our resource guide with side-by-side overview</p></div>'
  +'<div class="rl-sub-cta"><p><strong>Not sure which approach is right?</strong></p><p>We\u2019ll review your situation and recommend a plan that fits your assets and goals under Puerto Rico law.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources/forced-heirship-estate-plan': {
  title: 'How Forced Heirship Affects Your Estate Plan',
  subtitle: 'Understanding Puerto Rico\u2019s leg\u00edtima and planning strategies that work within it.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>What Is the Leg\u00edtima?</h2>'
  +'<p>The <em>leg\u00edtima</em> is the portion of your estate that Puerto Rico law reserves for forced heirs (<em>herederos forzosos</em>). Under the Civil Code (Ley 55-2020), your estate is divided into two parts:</p>'
  +'<ul><li><strong>Leg\u00edtima (1/2):</strong> Divided equally among all forced heirs (children and surviving spouse). No discretion.</li>'
  +'<li><strong>Libre disposici\u00f3n (1/2):</strong> Can go to anyone you choose.</li></ul>'
  +'<h2>Who Are Forced Heirs?</h2>'
  +'<p>Children and the surviving spouse are forced heirs under the 2020 Civil Code. If a child predeceases you, grandchildren step in by right of representation. Parents become forced heirs only if you have no descendants. The 2020 Code elevated the surviving spouse from usufruct-only rights to full forced heir status, sharing the <em>leg\u00edtima</em> equally with children.</p>'
  +'<h2>Common Conflicts for Mainland Transplants</h2>'
  +'<ul><li><strong>\u201cEverything to my spouse\u201d plans</strong> \u2014 Children are entitled to their <em>leg\u00edtima</em> at your death, not after the surviving spouse dies.</li>'
  +'<li><strong>Disinheritance</strong> \u2014 Only permitted for specific, enumerated grounds (e.g., attempted murder of the parent).</li>'
  +'<li><strong>Unequal distributions</strong> \u2014 The <em>leg\u00edtima</em> must be divided equally among all forced heirs.</li>'
  +'<li><strong>Trust-based plans</strong> \u2014 A trust does not override the <em>leg\u00edtima</em>.</li></ul>'
  +'<h2>Planning Strategies</h2>'
  +'<ul><li><strong>Use the libre disposici\u00f3n strategically</strong> to favor one heir (e.g., a child in the family business or a surviving spouse).</li>'
  +'<li><strong>Lifetime giving</strong> can reduce the estate, but collation rules may apply.</li>'
  +'<li><strong>Irrevocable trusts</strong> under <a href="/puerto-rico-trusts">Law 219-2012</a> can provide income to a spouse while preserving forced heirs\u2019 rights.</li>'
  +'<li><strong>Dual-will architecture</strong> separates Puerto Rico assets from non-PR assets.</li>'
  +'<li><strong>Life insurance</strong> proceeds are generally not part of the <em>leg\u00edtima</em> calculation.</li></ul>'
  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:.88rem;"><strong>See also:</strong> <a href="/resources-forced-heirship" style="color:#a68c42;font-weight:600;">Forced Heirship (Leg\u00edtima) Resource Guide \u2192</a> \u2014 Overview with planning strategies and key changes under Ley 55-2020</p></div>'
  +'<div class="rl-sub-cta"><p><strong>Need to update your estate plan for forced heirship?</strong></p><p>We help clients structure plans that respect the <em>leg\u00edtima</em> while maximizing flexibility.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources/asset-protection-irrevocable-trusts': {
  title: 'Puerto Rico Asset Protection with Irrevocable Trusts',
  subtitle: 'How Law 219-2012 shields your wealth from creditors, lawsuits, and divorce.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>Why Puerto Rico for Asset Protection?</h2>'
  +'<p>Law 219-2012 provides a modern trust statute with strong creditor protections based on the autonomous estate doctrine, and long trust duration. Puerto Rico\u2019s civil law system means certain doctrines creditors use on the mainland may not apply here. Note: Puerto Rico does not have an explicit self-settled asset protection trust (DAPT) statute; creditor protection depends on proper trust structuring, irrevocability, and independent trusteeship.</p>'
  +'<h2>How Irrevocable Trusts Protect Assets</h2>'
  +'<p>Assets you no longer own cannot be seized by your creditors. When you transfer assets into an irrevocable trust, the trustee holds legal title. Three key requirements:</p>'
  +'<ul><li><strong>Irrevocability</strong> \u2014 The transfer must be permanent.</li>'
  +'<li><strong>Independent trustee</strong> \u2014 Not the settlor or spouse. A professional trustee provides the strongest protection.</li>'
  +'<li><strong>Completed transfer</strong> \u2014 Assets must actually be retitled in the trust\u2019s name.</li></ul>'
  +'<h2>What It Protects Against</h2>'
  +'<ul><li>Tort judgments (car accidents, malpractice)</li><li>Business liabilities (even if the corporate veil is pierced)</li><li>Divorce (if established before marriage or proceedings)</li><li>Professional liability</li><li>Creditor claims against beneficiaries (spendthrift provisions)</li></ul>'
  +'<h2>What It Cannot Protect Against</h2>'
  +'<ul><li><strong>Fraudulent transfers</strong> \u2014 Transfers made to defraud existing creditors can be voided.</li><li><strong>Federal tax liens</strong> \u2014 IRS collection powers can reach trust assets in certain cases.</li><li><strong>Pre-existing obligations</strong> \u2014 Child support, alimony, and prior court orders.</li></ul>'
  +'<h2>Timing Is Everything</h2>'
  +'<p>The most important variable is timing. Establish your trust <strong>before</strong> any claim arises. Transferring assets after a lawsuit is filed is almost certainly a fraudulent transfer. The lesson: establish your asset protection trust while the sun is shining.</p>'
  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:.88rem;"><strong>Want the deep dive?</strong> Read our comprehensive analysis: <a href="/resources/asset-protection-trusts-pr" style="color:#a68c42;font-weight:600;">Asset Protection Trusts Under the PR Trust Act \u2192</a></p></div>'
  +'<div class="rl-sub-cta"><p><strong>Ready to protect your assets?</strong></p><p>We design irrevocable trusts under Law 219-2012 tailored to your risk profile and goals.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources/complete-guide-puerto-rico-trusts': {
  title: 'The Complete Guide to Puerto Rico Trusts',
  subtitle: 'Everything you need to know about trusts under Law 219-2012.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Back to Resources</a>'
  +'<h2>What Is a Trust in Puerto Rico?</h2>'
  +'<p>A trust (<em>fideicomiso</em>) is a legal arrangement where a settlor (<em>fideicomitente</em>) transfers assets to a trustee (<em>fiduciario</em>) for the benefit of beneficiaries (<em>fideicomisarios</em>). Law 219-2012 created a modern, flexible trust statute tailored to Puerto Rico\u2019s civil law system.</p>'
  +'<h2>Types of Trusts</h2>'
  +'<h3>Revocable Trusts</h3>'
  +'<p>Can be modified or revoked at any time. Provides probate avoidance and incapacity planning, but no asset protection. All income is reported on the settlor\u2019s personal tax return.</p>'
  +'<h3>Irrevocable Trusts</h3>'
  +'<p>Cannot be modified after creation. Provides asset protection, estate tax reduction, and multi-generational planning. Must be structured to respect <a href="/resources/forced-heirship-estate-plan">forced heirship rules</a>.</p>'
  +'<h3>Multi-Generational Trusts</h3>'
  +'<p>Designed to last multiple generations (life + 30 years under Law 219-2012). Assets pass without probate or estate tax at each generation.</p>'
  +'<h3>Special Purpose Trusts</h3>'
  +'<p>Charitable trusts, special needs trusts, life insurance trusts (ILITs), and business succession trusts.</p>'
  +'<h2>Creating a Trust: 5 Steps</h2>'
  +'<ol><li><strong>Define objectives</strong> \u2014 Probate avoidance? Asset protection? Estate tax reduction?</li>'
  +'<li><strong>Select the trustee</strong> \u2014 Individual, professional, or co-trustees. Independent trustees are essential for asset protection.</li>'
  +'<li><strong>Draft the trust instrument</strong> \u2014 Must address distribution standards, trustee powers, spendthrift provisions, forced heirship compliance, and governing law.</li>'
  +'<li><strong>Fund the trust</strong> \u2014 Transfer assets by deed, account retitling, or assignment. An unfunded trust provides no protection.</li>'
  +'<li><strong>Ongoing administration</strong> \u2014 Investment management, recordkeeping, tax filing, distributions, and accounting.</li></ol>'
  +'<h2>Tax Considerations</h2>'
  +'<ul><li>Federal income tax: grantor trusts (taxed to settlor) vs. non-grantor trusts (taxed to trust)</li>'
  +'<li>Puerto Rico income tax depends on trust situs, residency, and income source</li>'
  +'<li>Irrevocable trust assets generally removed from federal taxable estate</li>'
  +'<li>Federal estate tax exemption of $15M per individual (made permanent by the One Big Beautiful Bill Act with inflation indexing)</li></ul>'
  +'<h2>Common Mistakes</h2>'
  +'<ul><li>Failing to fund the trust after creation</li><li>Choosing the wrong trustee</li><li>Ignoring forced heirship</li><li>Retaining too much control (undermines asset protection)</li><li>Not updating the trust after life changes</li><li>Using a mainland trust without Puerto Rico review</li></ul>'
  +'<div style="background:#f8f6f0;border-left:4px solid #bfa35d;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;"><p style="margin:0 0 8px;font-size:.88rem;"><strong>Go deeper with our Trust Law Series:</strong></p><ul style="margin:0;padding:0 0 0 18px;font-size:.85rem;"><li><a href="/resources/what-is-puerto-rico-trust" style="color:#a68c42;">What Is a Puerto Rico Trust?</a> \u2014 The autonomous estate concept</li><li><a href="/resources/act-60-trust-planning" style="color:#a68c42;">Trust Planning for Act 60 Investors</a> \u2014 Mainland vs. PR trust decision</li><li><a href="/resources/trust-costs-puerto-rico" style="color:#a68c42;">Trust Costs</a> \u2014 Transparent pricing breakdown</li><li><a href="/resources/modifying-irrevocable-trusts" style="color:#a68c42;">Modifying &amp; Decanting Irrevocable Trusts</a> \u2014 When and how changes are possible</li><li><a href="/resources/special-needs-trusts-medicaid" style="color:#a68c42;">Special Needs Trusts &amp; Medicaid</a> \u2014 Protecting beneficiaries with disabilities</li><li><a href="/resources/ilits-and-slats" style="color:#a68c42;">ILITs and SLATs</a> \u2014 Advanced insurance and spousal trust strategies</li></ul></div>'
  +'<div class="rl-sub-cta"><p><strong>Ready to explore trust planning?</strong></p><p>We create trusts under Law 219-2012 tailored to your assets, family, and goals.</p><a href="/calendly">Book a Free Strategy Call</a></div>'
  }
},

'/resources/fideicomiso-irrevocable-puerto-rico': {
  title: 'Fideicomiso Irrevocable en Puerto Rico',
  subtitle: 'Gu\u00eda completa bajo la Ley 219-2012: protecci\u00f3n de activos, beneficios contributivos y planificaci\u00f3n sucesoral.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Volver a Recursos</a>'
  +'<h2>\u00bfQu\u00e9 es un fideicomiso irrevocable?</h2>'
  +'<p>Un fideicomiso irrevocable es un acuerdo legal donde el fideicomitente transfiere activos a un fiduciario, quien los administra en beneficio de los fideicomisarios. Una vez creado, <strong>no puede modificarse ni revocarse unilateralmente</strong>. Esta cesi\u00f3n de control es lo que le da su poder: protecci\u00f3n de activos, beneficios contributivos y planificaci\u00f3n sucesoral.</p>'
  +'<h2>La Ley 219-2012</h2>'
  +'<p>Antes de 2012, Puerto Rico carec\u00eda de un estatuto integral de fideicomisos. La Ley 219-2012 cre\u00f3 un marco legal moderno con reconocimiento pleno ante los tribunales, flexibilidad en la estructura, separaci\u00f3n patrimonial y compatibilidad con el derecho civil.</p>'
  +'<h2>Beneficios contributivos</h2>'
  +'<ul><li><strong>Reducci\u00f3n del patrimonio imponible:</strong> Los activos en el fideicomiso se excluyen del caudal relicto.</li>'
  +'<li><strong>Planificaci\u00f3n con la contribuci\u00f3n sobre ingresos:</strong> Los ingresos pueden tributar al fideicomiso como entidad separada.</li>'
  +'<li><strong>Para titulares de Ley 60:</strong> Los beneficios del fideicomiso se suman a las exenciones del decreto, pero las exenciones de Ley 60 <strong>no aplican</strong> al impuesto sobre caudal relicto.</li></ul>'
  +'<h2>Protecci\u00f3n de activos</h2>'
  +'<p>Los activos transferidos constituyen un patrimonio separado. Los acreedores personales no pueden reclamar los activos del fideicomiso, con la excepci\u00f3n de transferencias fraudulentas\u2014transferencias realizadas cuando ya era insolvente o con intenci\u00f3n de defraudar acreedores.</p>'
  +'<h2>Fideicomiso irrevocable y la leg\u00edtima</h2>'
  +'<p>Un fideicomiso <strong>no puede eludir la leg\u00edtima</strong>. Sin embargo, puede proporcionar flexibilidad: proveer para el c\u00f3nyuge mientras preserva los derechos de los hijos, utilizar la mitad de libre disposici\u00f3n, y estructurar distribuciones para proteger a herederos j\u00f3venes.</p>'
  +'<h2>C\u00f3mo crear un fideicomiso irrevocable</h2>'
  +'<ol><li>Defina sus objetivos</li><li>Seleccione al fiduciario</li><li>Identifique los activos</li><li>Redacte el instrumento con un abogado de Puerto Rico</li><li>Transfiera los activos</li><li>Administraci\u00f3n continua</li></ol>'
  +'<div class="rl-sub-cta"><p><strong>\u00bfListo para explorar si un fideicomiso irrevocable es adecuado?</strong></p><p>Agende una consulta gratuita para discutir c\u00f3mo la Ley 219-2012 puede beneficiar su planificaci\u00f3n patrimonial.</p><a href="/calendly">Agendar Consulta Gratuita</a></div>'
  }
},

'/resources/planificacion-sucesoral-puerto-rico': {
  title: 'Planificaci\u00f3n Sucesoral en Puerto Rico',
  subtitle: 'Lo que todo residente debe saber: leg\u00edtima, testamentos, fideicomisos y m\u00e1s.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Volver a Recursos</a>'
  +'<h2>Componentes esenciales</h2>'
  +'<h3>1. El testamento</h3>'
  +'<p>Bajo el C\u00f3digo Civil actual (Ley 55-2020), Puerto Rico reconoce dos tipos de testamento: el <strong>testamento abierto</strong> (ante notario\u2014ya no requiere testigos obligatoriamente bajo el Art. 1644, salvo que lo solicite el testador o el notario) y el <strong>testamento ol\u00f3grafo</strong> (escrito a mano, m\u00e1s vulnerable a impugnaci\u00f3n). <em>Nota: El testamento cerrado fue eliminado por la Ley 55-2020.</em></p>'
  +'<h3>2. La leg\u00edtima</h3>'
  +'<p>Bajo el C\u00f3digo Civil (Ley 55-2020), la mitad de su patrimonio est\u00e1 reservada para sus herederos forzosos\u2014sus hijos y c\u00f3nyuge sobreviviente, quienes comparten la <em>leg\u00edtima</em> en partes iguales. No puede desheredar a un hijo excepto en circunstancias muy limitadas.</p>'
  +'<h3>3. Fideicomisos</h3>'
  +'<p>Los <a href="/puerto-rico-trusts">fideicomisos bajo la Ley 219-2012</a> evitan la declaratoria de herederos, proporcionan planificaci\u00f3n de incapacidad, protegen activos y mantienen privacidad.</p>'
  +'<h3>4. Poderes legales</h3>'
  +'<p>Un <strong>poder general duradero</strong> autoriza a alguien a manejar sus asuntos financieros si queda incapacitado. Sin este documento, su familia necesitar\u00eda solicitar tutela judicial.</p>'
  +'<h3>5. Directiva anticipada de salud</h3>'
  +'<p>Establece sus deseos sobre tratamiento m\u00e9dico y designa un agente de salud para tomar decisiones en su nombre.</p>'
  +'<h2>Errores comunes</h2>'
  +'<ul><li>No tener plan alguno</li><li>Usar un testamento de otro estado sin revisi\u00f3n</li><li>No actualizar despu\u00e9s de cambios de vida</li><li>Ignorar la coordinaci\u00f3n entre jurisdicciones</li><li>No considerar la contribuci\u00f3n federal sobre caudal relicto</li></ul>'
  +'<div class="rl-sub-cta"><p><strong>\u00bfNecesita crear o actualizar su plan sucesoral?</strong></p><p>Evaluaremos su situaci\u00f3n y le recomendaremos la estructura que mejor proteja a su familia.</p><a href="/calendly">Agendar Consulta Gratuita</a></div>'
  }
},

'/resources/ley-60-guia-inversionistas': {
  title: 'Ley 60: Gu\u00eda para Inversionistas',
  subtitle: 'Requisitos de residencia, beneficios contributivos, proceso de solicitud y errores comunes.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Volver a Recursos</a>'
  +'<h2>Beneficios contributivos clave</h2>'
  +'<p><em>Los beneficios espec\u00edficos dependen de los t\u00e9rminos del decreto, la fecha de solicitud y la legislaci\u00f3n vigente. Las condiciones est\u00e1n sujetas a cambios legislativos; consulte con un abogado antes de tomar decisiones.</em></p>'
  +'<ul><li><strong>Exenci\u00f3n sobre ganancias de capital</strong> acumuladas despu\u00e9s de establecer residencia (el porcentaje depende del decreto otorgado)</li>'
  +'<li><strong>Exenci\u00f3n sobre intereses y dividendos</strong> de fuentes dentro de Puerto Rico (seg\u00fan t\u00e9rminos del decreto)</li>'
  +'<li><strong>4% sobre servicios de exportaci\u00f3n</strong> (Cap\u00edtulo 3)</li>'
  +'<li><strong>Exenci\u00f3n de contribuciones federales</strong> sobre ingreso de fuente puertorrique\u00f1a (IRC \u00a7933)</li></ul>'
  +'<p><strong>No est\u00e1 exento:</strong> Ingresos de fuente estadounidense, ganancias pre-mudanza, impuesto sobre caudal relicto, ni contribuciones sobre n\u00f3mina.</p>'
  +'<h2>Requisitos de residencia (IRC \u00a7937)</h2>'
  +'<p>Debe cumplir <strong>las tres pruebas</strong> simult\u00e1neamente para cualificar como residente bona fide:</p>'
  +'<ul><li><strong>Prueba de presencia f\u00edsica:</strong> Al menos 183 d\u00edas en Puerto Rico durante el a\u00f1o contributivo</li>'
  +'<li><strong>Prueba de hogar contributivo (<em>Tax Home Test</em>):</strong> Su lugar principal de actividad econ\u00f3mica debe estar en PR</li>'
  +'<li><strong>Prueba de conexi\u00f3n m\u00e1s estrecha (<em>Closer Connection Test</em>):</strong> Residencia principal, registro de votante, licencia de conducir, cuentas bancarias, m\u00e9dico y participaci\u00f3n comunitaria en PR</li></ul>'
  +'<p><em>Nota: Los 183 d\u00edas por s\u00ed solos no son suficientes. El incumplimiento de cualquiera de las tres pruebas puede resultar en la descalificaci\u00f3n de su residencia.</em></p>'
  +'<h2>Proceso de solicitud (general)</h2>'
  +'<ol><li>Establezca residencia bona fide en Puerto Rico (propiedad, licencia, registro de votante, cuentas bancarias)</li>'
  +'<li>Prepare y presente solicitud ante el DDEC</li>'
  +'<li>Revisi\u00f3n y aprobaci\u00f3n (puede tomar varios meses)</li>'
  +'<li>Cumplimiento continuo con las obligaciones t\u00edpicas del decreto (informes anuales, donaci\u00f3n caritativa, compra de propiedad residencial dentro del plazo establecido)</li></ol>'
  +'<p><em>Las obligaciones espec\u00edficas del decreto pueden variar seg\u00fan la fecha de solicitud y enmiendas legislativas. Verifique los requisitos vigentes antes de solicitar.</em></p>'
  +'<h2>Ley 60 y planificaci\u00f3n sucesoral</h2>'
  +'<p>Los beneficios de Ley 60 <strong>no se extienden al impuesto sobre caudal relicto</strong>. Su patrimonio sigue sujeto al impuesto federal. Puerto Rico tiene reglas de herencia forzosa que no existen en estados continentales. Un <a href="/resources/fideicomiso-irrevocable-puerto-rico">fideicomiso irrevocable</a> puede reducir su patrimonio imponible.</p>'
  +'<h2>Errores comunes</h2>'
  +'<ul><li>Asumir que comprar una casa es suficiente para residencia</li><li>No mantener registros de presencia</li><li>Ignorar las reglas de fuente de ingresos</li><li>No cumplir con los requisitos del decreto</li><li>No planificar la sucesi\u00f3n\u2014los beneficios mueren con usted</li></ul>'
  +'<div class="rl-sub-cta"><p><strong>\u00bfConsiderando mudarse bajo Ley 60?</strong></p><p>Asesoramos en todas las etapas\u2014desde planificaci\u00f3n pre-mudanza hasta cumplimiento y planificaci\u00f3n sucesoral.</p><a href="/calendly">Agendar Consulta</a></div>'
  }
},

'/resources/declaratoria-de-herederos-puerto-rico': {
  title: 'Proceso de Declaratoria de Herederos',
  subtitle: 'Gu\u00eda del proceso sucesorio en Puerto Rico: requisitos, plazos, costos y c\u00f3mo evitarlo.',
  content: function(){return ''
  +'<a href="/resources" class="rl-back">&larr; Volver a Recursos</a>'
  +'<h2>\u00bfQu\u00e9 es la declaratoria de herederos?</h2>'
  +'<p>Es un procedimiento judicial mediante el cual un tribunal identifica a los herederos legales, establece la proporci\u00f3n en que heredan y autoriza la transferencia de bienes. Sin esta resoluci\u00f3n, las instituciones financieras no liberar\u00e1n cuentas y el Registro de la Propiedad no inscribir\u00e1 transferencias.</p>'
  +'<h2>El proceso paso a paso</h2>'
  +'<div class="rl-timeline">'
  +'<div class="rl-step"><div class="rl-step-title">Paso 1: Certificado de defunci\u00f3n</div><div class="rl-step-desc">Obtener copia certificada del Registro Demogr\u00e1fico.</div></div>'
  +'<div class="rl-step"><div class="rl-step-title">Paso 2: Localizar el testamento</div><div class="rl-step-desc">Consultar el \u00edndice del Colegio de Notarios. Testamentos ol\u00f3grafos requieren adveraci\u00f3n judicial.</div></div>'
  +'<div class="rl-step"><div class="rl-step-title">Paso 3: Contratar abogado</div><div class="rl-step-desc">La complejidad del procedimiento hace la representaci\u00f3n legal pr\u00e1cticamente indispensable.</div></div>'
  +'<div class="rl-step"><div class="rl-step-title">Paso 4: Presentar demanda</div><div class="rl-step-desc">Ante el Tribunal de Primera Instancia con certificado de defunci\u00f3n, testamento, inventario de bienes y certificaciones de CRIM y Hacienda.</div></div>'
  +'<div class="rl-step"><div class="rl-step-title">Paso 5: Publicaci\u00f3n de edictos</div><div class="rl-step-desc">Avisos legales en peri\u00f3dico para notificar a herederos desconocidos y acreedores.</div></div>'
  +'<div class="rl-step"><div class="rl-step-title">Paso 6: Periodo de espera</div><div class="rl-step-desc">30 a 60 d\u00edas para que acreedores y herederos presenten reclamaciones.</div></div>'
  +'<div class="rl-step"><div class="rl-step-title">Paso 7: Resoluci\u00f3n judicial</div><div class="rl-step-desc">El tribunal declara qui\u00e9nes son los herederos y en qu\u00e9 proporci\u00f3n.</div></div>'
  +'<div class="rl-step"><div class="rl-step-title">Paso 8: Transferencia</div><div class="rl-step-desc">Con la resoluci\u00f3n, los herederos pueden transferir bienes inmuebles, acceder a cuentas y completar la distribuci\u00f3n.</div></div>'
  +'</div>'
  +'<h2>Plazos t\u00edpicos</h2>'
  +'<ul><li><strong>Caso simple:</strong> 6\u201312 meses</li><li><strong>Caso moderado:</strong> 12\u201318 meses</li><li><strong>Caso complejo:</strong> 18 meses a varios a\u00f1os</li></ul>'
  +'<h2>C\u00f3mo evitar la declaratoria</h2>'
  +'<ul><li><strong>Fideicomisos:</strong> Los activos pasan directamente a los beneficiarios en semanas, no meses.</li>'
  +'<li><strong>Beneficiarios designados:</strong> P\u00f3lizas de seguro, cuentas de retiro (IRA, 401k), cuentas POD/TOD.</li>'
  +'<li><strong>Planificaci\u00f3n integral:</strong> Fideicomiso + designaciones de beneficiario + testamento como red de seguridad.</li></ul>'
  +'<div class="rl-sub-cta"><p><strong>\u00bfNecesita ayuda con una declaratoria o quiere evitarla?</strong></p><p>Le ayudaremos a navegar el proceso o a crear un plan que proteja a su familia.</p><a href="/calendly">Agendar Consulta Gratuita</a></div>'
  }
}

}; /* end PAGES */

/* ============================================
   RESOURCE CARDS INJECTION FOR MAIN /resources PAGE
   Adds card sections for migrated blog content
   ============================================ */
function injectResourceCards() {
  if (path !== '/resources') return;

  /* Find the rl-rc container (the main resources wrapper) */
  var rc = document.querySelector('.rl-rc');
  if (!rc) return;

  /* Don't double-inject */
  if (document.querySelector('.rl-extra-cards')) return;

  /* Find the CTA section at the bottom to insert before it */
  var cta = rc.querySelector('.rl-cta');

  var sections = [
    {
      heading: 'Trusts & Asset Protection',
      icon: '\uD83D\uDEE1\uFE0F',
      cards: [
        { title: 'Complete Guide to Puerto Rico Trusts', desc: 'Everything you need to know about trusts under the Puerto Rico Trust Act (Ley 219-2012) \u2014 types, benefits, and how they work within the civil law system.', url: '/resources/complete-guide-puerto-rico-trusts', featured: true },
        { title: 'Trust vs. Will in Puerto Rico', desc: 'A side-by-side comparison of wills and trusts under Puerto Rico law, including costs, probate, privacy, and which is right for your situation.', url: '/resources/trust-vs-will-puerto-rico' },
        { title: 'Asset Protection with Irrevocable Trusts', desc: 'How irrevocable trusts under Ley 219-2012 protect your assets from creditors, lawsuits, and estate taxes.', url: '/resources/asset-protection-irrevocable-trusts' }
      ]
    },
    {
      heading: 'Estate Planning',
      icon: '\uD83D\uDCCB',
      cards: [
        { title: 'Forced Heirship & Your Estate Plan', desc: 'How Puerto Rico\u2019s forced heirship rules (leg\u00EDtima) affect your estate plan and strategies to work within the system.', url: '/resources/forced-heirship-estate-plan' },
        { title: 'Act 60 & Estate Planning Mistakes', desc: 'Five critical mistakes Act 60 decree holders make with estate planning \u2014 and how to avoid them.', url: '/resources/act-60-estate-planning-mistakes' }
      ]
    },
    {
      heading: 'Act 60 Tax Incentives',
      icon: '\u2600\uFE0F',
      cards: [
        { title: 'Ley 60: Gu\u00EDa para Inversionistas', desc: 'Gu\u00EDa completa de Ley 60 para inversionistas individuales. Requisitos de residencia, beneficios contributivos y errores comunes.', url: '/resources/ley-60-guia-inversionistas', lang: 'es' }
      ]
    },
    {
      heading: 'Recursos en Espa\u00F1ol',
      icon: '\uD83C\uDDFA\uD83C\uDDF8',
      cards: [
        { title: 'Fideicomiso Irrevocable en Puerto Rico', desc: 'Gu\u00EDa completa sobre fideicomisos irrevocables bajo la Ley 219-2012. Protecci\u00F3n de activos, beneficios contributivos y planificaci\u00F3n sucesoral.', url: '/resources/fideicomiso-irrevocable-puerto-rico', lang: 'es' },
        { title: 'Planificaci\u00F3n Sucesoral en Puerto Rico', desc: 'Todo lo que necesita saber sobre planificaci\u00F3n sucesoral en Puerto Rico. Leg\u00EDtima, testamentos, fideicomisos, poderes y directivas de salud.', url: '/resources/planificacion-sucesoral-puerto-rico', lang: 'es' },
        { title: 'Declaratoria de Herederos', desc: 'El proceso de declaratoria de herederos en Puerto Rico paso a paso. Requisitos, plazos, costos y c\u00F3mo evitarlo.', url: '/resources/declaratoria-de-herederos-puerto-rico', lang: 'es' }
      ]
    }
  ];

  var html = '<div class="rl-extra-cards">';

  sections.forEach(function(sec) {
    html += '<div style="max-width:1140px;margin:0 auto 12px;padding:0 28px;">'
      + '<h2 style="font-family:var(--heading-font-font-family,Georgia,serif);font-size:1.25rem;font-weight:700;color:#1a2033;margin:36px 0 6px;padding-bottom:6px;border-bottom:2px solid rgba(191,163,93,.2);">'
      + sec.icon + ' ' + sec.heading + '</h2></div>'
      + '<div class="rl-grid">';

    sec.cards.forEach(function(card, cardIdx) {
      var langAttr = card.lang ? ' lang="' + card.lang + '"' : '';
      var isFeatured = card.featured ? ' rl-card-featured' : '';
      html += '<div class="rl-card' + isFeatured + '"' + langAttr + '>';
      if (card.featured) {
        html += '<div class="rl-icon">' + sec.icon + '</div>'
          + '<div class="rl-card-body">'
          + '<h3>' + card.title + '</h3>'
          + '<p>' + card.desc + '</p>'
          + '<a href="' + card.url + '">' + (card.lang === 'es' ? 'Leer m\u00E1s \u2192' : 'Read more \u2192') + '</a>'
          + '</div>';
      } else {
        html += '<h3>' + card.title + '</h3>'
          + '<p>' + card.desc + '</p>'
          + '<a href="' + card.url + '">' + (card.lang === 'es' ? 'Leer m\u00E1s \u2192' : 'Read more \u2192') + '</a>';
      }
      html += '</div>';
    });

    html += '</div>';
  });

  html += '</div>';

  var container = document.createElement('div');
  container.innerHTML = html;

  /* Insert before CTA if found, otherwise append at end */
  if (cta) {
    while (container.firstChild) {
      cta.parentNode.insertBefore(container.firstChild, cta);
    }
  } else {
    while (container.firstChild) {
      rc.appendChild(container.firstChild);
    }
  }
}

/* Inject content into subpages, replacing blog dashboard if present */
function injectSubpage() {
  var page = PAGES[path];
  if (!page) return;

  /* Find the target container - try multiple selectors */
  var target = document.getElementById('sections');

  /* If #sections not found, look for blog dashboard and use its parent */
  if (!target) {
    var blogDash = document.getElementById('rl-blog-dashboard');
    if (blogDash) {
      target = blogDash.parentElement;
    }
  }

  /* Fallback to common Squarespace content wrappers */
  if (!target) {
    target = document.querySelector('.page-section .content-wrapper')
          || document.querySelector('main .content-wrapper')
          || document.querySelector('main article')
          || document.querySelector('#page .content-wrapper');
  }

  if (!target) return;

  /* Check if our content already exists (don't double-inject) */
  if (document.querySelector('.rl-sub')) return;

  /* Build the subpage */
  var wrapper = document.createElement('div');
  wrapper.className = 'rl-sub';
  wrapper.innerHTML = ''
    + '<div class="rl-sub-hero"><h1>' + page.title + '</h1><p>' + page.subtitle + '</p></div>'
    + page.content()
    + '<div class="rl-sub-disclaimer" style="margin-top:32px;padding-top:20px;border-top:1px solid #e8e9ee;font-size:.78rem;color:#706b62;line-height:1.5;text-align:center;">'
    + '<p>The information on this page is for general educational purposes only and does not constitute legal or tax advice. Tax outcomes depend on individual circumstances including residency, income sourcing, decree terms, and applicable law. No attorney-client relationship is formed by viewing this content. For advice specific to your situation, <a href="/calendly" style="color:#a68c42;">schedule a consultation</a>.</p>'
    + '</div>';

  /* Insert into page, replacing existing content */
  target.innerHTML = '';
  target.appendChild(wrapper);

  /* Ensure all ancestor containers are full-width so centering works */
  var el = target;
  while (el && el !== document.body) {
    el.style.maxWidth = '100%';
    el.style.width = '100%';
    el.style.paddingLeft = '0';
    el.style.paddingRight = '0';
    el.style.marginLeft = '0';
    el.style.marginRight = '0';
    el = el.parentElement;
    /* Stop at main page section level */
    if (el && (el.id === 'sections' || el.id === 'page' || el.tagName === 'MAIN')) break;
  }

  /* Also hide the blog dashboard if it exists elsewhere on the page */
  document.querySelectorAll('#rl-blog-dashboard').forEach(function(el) {
    el.style.display = 'none';
  });

  /* Bind FAQ accordions if present */
  wrapper.querySelectorAll('.rl-faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      var answer = btn.nextElementSibling;
      if (answer) answer.setAttribute('data-open', expanded ? 'false' : 'true');
    });
  });
}

/* Run with delay to ensure Squarespace has finished rendering sections */
/* Clear header overlap: Squarespace header is position:absolute, so injected
   content needs padding-top to avoid sitting behind it */
function fixHeaderOverlap() {
  var content = document.querySelector('.rl-rc') || document.querySelector('.rl-sub');
  if (!content) return;
  var header = document.querySelector('header');
  if (!header) return;
  var headerH = header.getBoundingClientRect().height;
  if (headerH > 50) {
    var target = content.closest('#sections') || content.parentElement;
    if (target && !target.dataset.rlPadded) {
      target.style.paddingTop = (headerH + 20) + 'px';
      target.dataset.rlPadded = '1';
    }
  }
}

function run() {
  injectSubpage();
  injectResourceCards();
  fixHeaderOverlap();
}

/* Use MutationObserver to detect when Squarespace renders page content */
var injected = false;
var observer;
function tryRun() {
  if (injected) return;
  run();
  if (document.querySelector('.rl-sub') || document.querySelector('.rl-rc')) {
    injected = true;
    if (observer) observer.disconnect();
  }
}

function boot() {
  tryRun();
  if (!injected && typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver(function() { tryRun(); });
    observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
    setTimeout(function() { if (observer) observer.disconnect(); }, 8000);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
window.addEventListener('load', tryRun);

/* Fix any legacy /book-an-appointment links site-wide */
function fixBookingLinks() {
  document.querySelectorAll('a[href*="/book-an-appointment"]').forEach(function(a) {
    a.href = a.href.replace('/book-an-appointment', '/calendly');
  });
}
window.addEventListener('load', fixBookingLinks);
if (typeof MutationObserver !== 'undefined') {
  var linkObs = new MutationObserver(fixBookingLinks);
  linkObs.observe(document.body || document.documentElement, { childList: true, subtree: true });
  setTimeout(function() { linkObs.disconnect(); }, 8000);
}

})();

