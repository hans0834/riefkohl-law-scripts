# Deploy: Relevo de Hacienda page — 2026-08-15

New Spanish resources page (drafted, NOT yet deployed). Source of truth:
`migration/native-html/relevo-de-hacienda-puerto-rico.html`

**Target URL:** `/resources/relevo-de-hacienda-puerto-rico`

**Why this page:** The declaratoria page is the site's #1 organic page; "relevo de
hacienda" is the adjacent, high-intent query every PR heir must search, and the site
had zero coverage (grep-verified: 1 passing mention of "caudal relicto" sitewide, no
"relevo" at all). No cannibalization risk. All legal facts verified against primary
sources on 2026-08-15: Ley 76-2017 (LexJuris), DA 18-09 (Hacienda PDF, full text
extracted), hacienda.pr.gov Herencias pages.

Key verified facts used (citations in page body):
- Sec. 2021.01(d): no estate tax, deaths after 12/31/2017, resident or not (Ley 76-2017)
- Sec. 2051.01(e): Planilla Informativa (Modelo SC 2800-C + Anejo A) due 12 months, under oath
- Sec. 2054.01(a): automatic preferential lien (incl. CRIM debts under Ley 83-1991)
- Sec. 2054.02(d)/(f)/(b): relevo / Relevo Condicionado (125% fianza, SC 6020) / Autorización Condicionada (2x value)
- SC 2655 Acta de Apertura for cajas de seguridad; citaaperturacaja@hacienda.pr.gov
- Banks may release $15,000 or 25% of funds (whichever is GREATER) pre-relevo (Ley 76-2017, Sec. 2054.05(a)(2))
- Since Dec 10 2018 all caudal relicto transactions are SURI-only; relevo downloads from Correspondencia

## Deploy steps (browser required — Claude in Chrome was down on 2026-08-15)

1. **Squarespace:** create blank page at slug `relevo-de-hacienda-puerto-rico` under
   /resources, insert a Code Block, paste the native HTML using the synthetic-dblclick
   CM6 recipe (see feedback_squarespace_codeblock_paste_recipe). Real click on Save.
2. **js/seo-fixes.js:** add the SEO entry below (path-keyed, inert until page exists —
   safe to ship first). ALSO set native Squarespace SEO title + description on the page.
3. **Resources hub:** add cross-link on /resources (native Code block) in the
   estate/sucesiones band, and consider a link from the declaratoria subpage.
4. **GSC:** request indexing for the new URL (quota ~10/day).
5. Verify live: unauthenticated curl, check H1/meta/FAQ schema render.

## seo-fixes.js entry (paste into SEO object)

```javascript
'/resources/relevo-de-hacienda-puerto-rico': {
  title: 'Relevo de Hacienda en Puerto Rico: Guía Paso a Paso',
  h1: null, // native page carries its own H1
  meta: 'Cómo obtener el relevo de Hacienda (Certificado de Cancelación de Gravamen) para una herencia en Puerto Rico: Modelo SC 2800-C, SURI, plazos y fianzas.',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      { '@type': 'Question', 'name': '¿Qué es el relevo de Hacienda en Puerto Rico?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Es el Certificado de Cancelación de Gravamen (Relevo de Herencia) que expide el Departamento de Hacienda. La Sección 2054.01 del Código de Rentas Internas impone automáticamente un gravamen a favor del Gobierno sobre todos los bienes del caudal relicto; los bancos y el Registro de la Propiedad exigen el relevo antes de liberar cuentas o inscribir traspasos.' } },
      { '@type': 'Question', 'name': '¿Todavía se paga contribución sobre herencias en Puerto Rico?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'No. Desde la Ley 76-2017, los bienes de causantes fallecidos después del 31 de diciembre de 2017 no pagan contribución sobre el caudal relicto, sean o no residentes de Puerto Rico. Pero la Planilla Informativa de Caudal Relicto (Modelo SC 2800-C) y el relevo siguen siendo obligatorios para poder transferir los bienes.' } },
      { '@type': 'Question', 'name': '¿Cuánto tiempo hay para radicar la planilla de caudal relicto?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'El administrador del caudal debe rendir la Planilla Informativa bajo juramento dentro de los doce (12) meses siguientes a la fecha del fallecimiento, conforme a la Sección 2051.01(e) del Código. La radicación se hace electrónicamente a través de SURI.' } },
      { '@type': 'Question', 'name': '¿Puede el banco liberar dinero antes del relevo?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Sí, una cantidad limitada: hasta $15,000 o el 25% del total de los fondos, la cantidad que sea mayor, sin exigir el certificado de cancelación de gravamen. El resto queda retenido hasta presentar el relevo.' } },
      { '@type': 'Question', 'name': '¿Qué pasa si el fallecido tenía deudas con Hacienda o el CRIM?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'No procede el relevo ordinario. Si las deudas están bajo revisión administrativa o judicial, puede solicitarse un Relevo de Herencia Condicionado prestando una fianza del 125% de la deuda tasada. Alternativamente, una Autorización Condicionada permite vender una partida específica si la propiedad restante vale al menos el doble de lo adeudado.' } }
    ]
  }
},
```

## Native Squarespace SEO settings (page settings dialog)

- SEO title: `Relevo de Hacienda en Puerto Rico: Guía Paso a Paso`
- SEO description: same as `meta` above.

## Follow-up candidates (same cluster, not yet written)

- Publish the existing draft `blog-posts/morir-sin-testamento-puerto-rico.md` (1,363 w,
  still 404 — it's in the 44-post publish backlog) and hreflang-pair it later with an
  EN intestacy piece.
- EN companion: "Puerto Rico estate tax lien release (relevo): what mainland heirs
  need to know" — targets stateside heirs inheriting PR property; links to this page
  as its ES pair.
