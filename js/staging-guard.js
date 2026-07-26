/* ============================================================================
   STAGING-DOMAIN GUARD  —  added 2026-07-26
   Problem: the Squarespace built-in domain (octagon-parakeet-dn35.squarespace.com)
   serves every page with HTTP 200. It already emits a correct rel=canonical to
   www.riefkohllaw.com, but Google has indexed it anyway and it ranks on page 1
   for the brand query, competing with the real site.
   Squarespace has no setting that 301s the built-in domain, so this is the
   strongest lever available: noindex it, then send visitors to the real host.

   Safety: no-op on www.riefkohllaw.com. Never redirects the Squarespace editor
   or a logged-in author. Wrapped so it can never throw and can never block the
   rest of this file.
   Bypass for manual testing: append ?nostagingredirect=1
   ========================================================================== */
(function () {
  try {
    if (!/(^|\.)squarespace\.com$/i.test(location.hostname)) return;   // live site → nothing to do

    // Always mark this host as non-indexable, even when we do not redirect.
    if (!document.querySelector('meta[name="robots"][data-staging-guard]')) {
      var m = document.createElement('meta');
      m.setAttribute('name', 'robots');
      m.setAttribute('content', 'noindex, nofollow');
      m.setAttribute('data-staging-guard', '1');
      (document.head || document.documentElement).appendChild(m);
    }

    // Do NOT redirect when someone is actually working on the site.
    if (/[?&]nostagingredirect=1/.test(location.search)) return;       // explicit bypass
    if (window.self !== window.top) return;                            // editor renders in an iframe
    if (/^\/config(\/|$)/.test(location.pathname)) return;             // Squarespace admin
    try {
      var ctx = window.Static && window.Static.SQUARESPACE_CONTEXT;
      if (ctx && ctx.authenticatedAccount) return;                     // logged-in author
    } catch (e) {}

    var target = 'https://www.riefkohllaw.com' +
                 location.pathname + location.search + location.hash;
    if (location.href !== target) location.replace(target);
  } catch (e) { /* never break the site */ }
})();
