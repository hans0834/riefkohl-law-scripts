# Riefkohl Law — Google Review Request Toolkit (EN + ES)

**Why this is the #1 priority:** Our closest Act 60 competitors are weak on reviews — Tax Law Ventures has **0 Google reviews** and is absent from the local pack, which is gated largely by review volume. Riefkohl also sits at 0 today. Whoever builds a genuine review base first wins the most visible local-search signal. Target: **10–15 authentic Google reviews in 60 days.**

**Fire the ask at three moments** (highest → lowest yield):
1. **At a natural "win" moment** — right after a decree is granted, a trust/will is signed, or a matter closes successfully. This is when satisfaction peaks.
2. **Post-consultation** — a short SMS/WhatsApp the day after a positive strategy call, even if they haven't retained yet.
3. **End of the email welcome sequence** — a soft ask appended for engaged subscribers (see Template C).

---

## STEP 0 — Get your one-tap review link (do this once, ~60 seconds)

Google's "leave a review" box opens directly from a special link. Get yours:

- **Best (one-tap):** In your Google Business Profile, click **"Ask for reviews"** (or **"Get more reviews"**). Google gives you a short link like `https://g.page/r/XXXXXXXXXXXX/review`. That link opens the review box with the stars ready. Copy it.
- **Alternative (build it yourself):** Get your Place ID from the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) (search "Riefkohl Law San Juan"), then use:
  `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`
- **Immediate fallback (opens the profile):** `https://www.google.com/maps?cid=3671070211869856657` — this opens the Riefkohl Law profile where the "Write a review" button lives (one extra tap).

Then, everywhere below, replace **`[[REVIEW_LINK]]`** with your one-tap link. Consider making a short branded redirect (e.g. `riefkohllaw.com/review` → the g.page link) and a **QR code** of it for in-office / email signature use.

> **Ethics / compliance:** Ask only for **honest** reviews. Never offer money, discounts, or anything of value in exchange for a review (violates Google's policy and ABA Model Rule 7.1 / PR bar advertising rules). Don't ghost-write reviews. When you reply to reviews, never disclose confidential client information.

---

## Template A — Post-matter review request (EMAIL)

### A (English)
**Subject:** One quick favor, [FIRST_NAME]?

Hi [FIRST_NAME],

It was a pleasure helping you with [MATTER — e.g., your Act 60 decree / your Puerto Rico estate plan]. I'm glad we got it done right.

If you have 60 seconds, would you share a short review of your experience? Honest feedback from clients like you is the single most helpful thing for a small firm — it helps other families and investors in Puerto Rico find counsel they can trust.

**[Leave a Google review →]** [[REVIEW_LINK]]

Just a sentence or two about what we worked on and how it went is perfect. Thank you — it genuinely means a lot.

Warm regards,
Hans Riefkohl
Riefkohl Law · (787) 236-1657

*If anything about your experience fell short, reply to me directly first — I want to make it right.*

### A (Español)
**Asunto:** Un pequeño favor, [FIRST_NAME]

Hola [FIRST_NAME]:

Fue un placer ayudarle con [ASUNTO — p. ej., su decreto de la Ley 60 / su plan patrimonial en Puerto Rico]. Me alegra que lo hayamos hecho bien.

Si tiene 60 segundos, ¿compartiría una breve reseña de su experiencia? La opinión honesta de clientes como usted es lo más valioso para un bufete pequeño — ayuda a otras familias e inversionistas en Puerto Rico a encontrar un abogado de confianza.

**[Deje una reseña en Google →]** [[REVIEW_LINK]]

Con una o dos oraciones sobre lo que trabajamos y cómo le fue es más que suficiente. Muchas gracias — de verdad lo aprecio.

Un cordial saludo,
Hans Riefkohl
Riefkohl Law · (787) 236-1657

*Si algo de su experiencia no estuvo a la altura, respóndame directamente primero — quiero corregirlo.*

---

## Template B — Post-consult / short nudge (SMS or WhatsApp)

### B (English)
> Hi [FIRST_NAME], thanks again for the call today. If it was helpful, a quick Google review would mean a lot to the firm: [[REVIEW_LINK]] — no worries if you're busy. — Hans, Riefkohl Law

### B (Español)
> Hola [FIRST_NAME], gracias de nuevo por la llamada de hoy. Si le fue útil, una breve reseña en Google significaría mucho para el bufete: [[REVIEW_LINK]] — sin compromiso si está ocupado/a. — Hans, Riefkohl Law

---

## Template C — Soft ask to append to the email welcome sequence

Add as a short P.S. to **Email 5** of the welcome sequence, or as a standalone "Email 6" ~5 days later, for subscribers who've engaged but may already be past clients.

### C (English)
**P.S.** — If Riefkohl Law has helped you or someone you know navigate Puerto Rico trusts, estate planning, or Act 60, a short Google review helps other families find us: **[Leave a review →]** [[REVIEW_LINK]]. Thank you.

### C (Español)
**P.D.** — Si Riefkohl Law le ha ayudado a usted o a alguien que conoce con fideicomisos, planificación patrimonial o la Ley 60 en Puerto Rico, una breve reseña en Google ayuda a que otras familias nos encuentren: **[Deje una reseña →]** [[REVIEW_LINK]]. Gracias.

---

## Cadence & mechanics

- **Timing:** Send Template A within **24–72 hours** of the win, while the experience is fresh.
- **Personalize the [MATTER] line** every time — generic asks convert worse.
- **One reminder max.** If no review after ~7 days, send Template B once, then stop.
- **Make it frictionless:** the link should open the review box in one tap. Test it on your own phone first.
- **Reply to every review** within a few days (a warm, non-confidential thank-you). Responses signal an active profile to Google and to prospects.
- **Track it:** aim for ~2 asks/week to hit 10–15 reviews in 60 days. Keep a simple list of who was asked and when.
- **Merge tags:** replace `[FIRST_NAME]` with your provider's token (Mailchimp `*|FNAME|*`, etc.); `[MATTER]` is filled manually per client.

## Where to display social proof once reviews come in
- Add a Google-reviews badge/widget to the homepage and the Act 60 + estate pages.
- Once real reviews exist, populate `aggregateRating` in the LocalBusiness schema (a placeholder note is already in `js/conversion-booster.js`) so stars can show in search results. **Only with real review data.**
