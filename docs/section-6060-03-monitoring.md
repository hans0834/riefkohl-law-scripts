# Section 6060.03 "Certified Professional" Designation — Monitoring & Preparation

## Background

Section 6060.03 of Act 60-2019 establishes a "Certified Professional" designation for attorneys and CPAs who meet specific qualifications related to Act 60 advisory services. Once the DDEC (Department of Economic Development and Commerce) implements the designation, it will become a credentialing differentiator in the Act 60 advisory market.

## Current Status

- **Legislation:** Enacted as part of Act 60-2019
- **DDEC implementation:** Pending — no regulations or application process published as of March 2026
- **Monitoring frequency:** Check DDEC website and announcements monthly

## What to Monitor

1. **DDEC announcements** at https://www.ddec.pr.gov and their social media channels
2. **PR Bar Association** communications regarding the new designation
3. **CPA Board** announcements (Junta Examinadora de CPA de Puerto Rico)
4. **National Law Review** and **JD Supra** for practitioner commentary
5. **Kevane Grant Thornton** and **Torres CPA Group** publications — they will likely be early adopters

## Qualification Requirements (Expected)

Based on the statutory text, the designation will likely require:
- Active license (attorney or CPA) in Puerto Rico
- Demonstrated experience in Act 60 advisory
- Completion of DDEC-approved continuing education
- Application and fee with DDEC

## Pre-Built Content (Ready to Publish When Designation Becomes Available)

### Blog Post Draft

**Title:** "What the New 'Certified Professional' Designation Means for Act 60 Advisory"
**Target keywords:** "Act 60 certified professional," "DDEC certified professional Puerto Rico"

**Outline:**
- What Section 6060.03 creates
- Who qualifies (attorneys and CPAs only — not consultants, not relocators)
- What it means for clients choosing an Act 60 advisor
- Why Riefkohl Law sought and obtained the designation
- How to verify your advisor's certification
- CTA: Schedule a consultation with a certified Act 60 professional

### Service Page Copy Update

Add to `/act-60-tax-incentives` page:
> **DDEC Certified Professional** — Hans E. Riefkohl is certified under Section 6060.03 of Act 60-2019, a designation awarded by the Department of Economic Development and Commerce to attorneys and CPAs who meet rigorous qualification standards for Act 60 advisory services.

### LocalBusiness Schema Update

When ready, add to `conversion-booster.js` LocalBusiness schema:
```json
"hasCredential": {
  "@type": "EducationalOccupationalCredential",
  "credentialCategory": "Professional Certification",
  "name": "DDEC Certified Professional — Section 6060.03, Act 60-2019"
}
```

### Press Release Template

**FOR IMMEDIATE RELEASE**

**Riefkohl Law Earns DDEC "Certified Professional" Designation for Act 60 Advisory**

*San Juan, PR — [DATE]* — Riefkohl Law announced today that managing attorney Hans E. Riefkohl has been awarded the "Certified Professional" designation by the Puerto Rico Department of Economic Development and Commerce (DDEC) under Section 6060.03 of Act 60-2019.

The designation recognizes attorneys and CPAs who meet stringent qualifications for advising clients on Puerto Rico's Act 60 tax incentive program. [Additional details based on actual DDEC requirements.]

"[Quote from Hans about the designation and commitment to client service]," said Riefkohl.

Riefkohl Law provides estate planning, trust creation, and Act 60 compliance services for individual resident investors relocating to Puerto Rico. The firm publishes a comprehensive 14-article Trust Law Series and offers flat-fee pricing for all services.

**Contact:**
Hans E. Riefkohl
Riefkohl Law
(787) 236-1657
hans@riefkohllaw.com
riefkohllaw.com

## Badge Implementation (Pre-Built in Code)

The certified professional badge CSS and JS toggle are implemented in:
- `riefkohl-law-scripts/css/all-styles.css` — Badge styles (hidden by default)
- `riefkohl-law-scripts/js/homepage-services.js` — `SHOW_CERTIFIED_BADGE = false` flag

**To activate:** Change `SHOW_CERTIFIED_BADGE` to `true` and push to GitHub.

## Action Items When Designation Becomes Available

1. [ ] Apply for designation through DDEC
2. [ ] Once obtained, flip `SHOW_CERTIFIED_BADGE = true` in `homepage-services.js`
3. [ ] Publish the prepared blog post
4. [ ] Update service page copy
5. [ ] Add credential to LocalBusiness schema
6. [ ] Send press release
7. [ ] Update Google Business Profile
8. [ ] Notify CPA referral partners
