/* cal.js — cal.com booking embed.

   This is the one third-party request the document makes, kept at the
   owner's explicit direction against CLAUDE.md §2 ("zero third-party
   requests"). The CSP in index.html is widened for app.cal.com and for
   nothing else.

   Two deliberate changes from the previous inline version:

   1. It lives in a file rather than a <script> block, so the CSP does not
      need script-src 'unsafe-inline' — which would have re-permitted every
      inline script on the page, not just this one.

   2. The floating bubble is gone. The embed now attaches to the primary
      "Book a call" action on sheet 08 via its data-cal-link attribute.
      The document has one unambiguous primary action; a bubble hovering
      over every sheet fought that, and covered the footer rail on mobile.

   The anchor is a working link to cal.com on its own. If this script is
   blocked or fails, the click navigates instead of opening a modal, and
   nothing is lost but the overlay. */

(function (C, A, L) {
  var p = function (a, ar) { a.q.push(ar); };
  var d = C.document;
  C.Cal = C.Cal || function () {
    var cal = C.Cal;
    var ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else {
        p(cal, ar);
      }
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

Cal("init", "30min", { origin: "https://app.cal.com" });
Cal.ns["30min"]("ui", { hideEventTypeDetails: false, layout: "month_view" });
