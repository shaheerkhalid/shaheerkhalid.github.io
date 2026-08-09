/* redact.js — redaction reveal and CVSS vector expansion.

   Both behaviours already work without JS: the markup uses real <button>
   elements and the reveal is driven by :hover and :focus-visible in CSS.
   This file adds tap-to-toggle for touch, where neither fires usefully,
   and keeps aria-expanded truthful for screen readers.

   Nothing here reveals hidden content, because there is none. The
   redaction bars are empty elements; the note beside them repeats
   metadata already printed in the entry header. */

(function () {
  "use strict";

  function wire(el) {
    el.setAttribute("aria-expanded", "false");

    el.addEventListener("click", function () {
      var open = el.getAttribute("aria-expanded") === "true";
      el.setAttribute("aria-expanded", String(!open));
    });

    /* Collapse when focus leaves, so a tapped item doesn't stay open
       behind the reader's back. */
    el.addEventListener("blur", function () {
      el.setAttribute("aria-expanded", "false");
    });
  }

  document.querySelectorAll("button.redact").forEach(wire);

  /* Severity chips.

     A chip only becomes interactive when it actually carries a vector in
     data-vector. None do yet — see the TODO(shaheer) markers on sheet 03 —
     so today every chip renders as a static span and there is nothing to
     expand. When a vector is supplied, promoting the span to
     <button class="chip" data-vector="..."> is all that is needed; this
     code then picks it up with no further change.

     A vector is never derived from a score. */
  document.querySelectorAll("button.chip[data-vector]").forEach(function (el) {
    var vec = el.querySelector(".vec");
    if (vec && !vec.textContent.trim()) {
      vec.textContent = el.getAttribute("data-vector");
    }
    wire(el);
  });
})();
