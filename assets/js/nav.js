/* nav.js — sheet observation, footer rail, progress, keyboard navigation.
   Every behaviour here is an enhancement. With JS disabled the rail is a
   plain anchor list, the footer shows "Sheet 1 of N" from CSS, and the
   document reads top to bottom unchanged. */

(function () {
  "use strict";

  var sheets = Array.prototype.slice.call(document.querySelectorAll(".body .sheet"));
  var links  = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var count  = document.querySelector(".sheet-count");
  var fill   = document.querySelector(".rail-progress i");
  var total  = sheets.length;

  if (!sheets.length) return;

  /* ── Active sheet ────────────────────────────────────────────────── */

  var active = -1;

  function setActive(i) {
    if (i === active) return;
    active = i;

    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + sheets[i].id;
      if (on) { a.setAttribute("aria-current", "true"); }
      else    { a.removeAttribute("aria-current"); }
    });

    if (count) {
      /* data-live suppresses the CSS fallback so the two can't both render */
      count.setAttribute("data-live", "");
      count.textContent = "Sheet " + (i + 1) + " of " + total;
    }
  }

  if ("IntersectionObserver" in window) {
    /* Track the sheet nearest the top of the viewport rather than whichever
       fires last, so fast scrolls land on the right one. */
    var seen = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen.set(e.target, e); });

      var best = -1, bestTop = Infinity;
      sheets.forEach(function (s, i) {
        var e = seen.get(s);
        if (!e || !e.isIntersecting) return;
        var top = Math.abs(e.boundingClientRect.top);
        if (top < bestTop) { bestTop = top; best = i; }
      });
      if (best >= 0) setActive(best);
    }, { rootMargin: "-10% 0px -70% 0px", threshold: 0 });

    sheets.forEach(function (s) { io.observe(s); });
  }

  /* ── Scroll progress ─────────────────────────────────────────────── */

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      if (!fill) return;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      fill.style.setProperty("--progress", Math.min(1, Math.max(0, p)).toFixed(4));
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  setActive(0);

  /* ── Keyboard ────────────────────────────────────────────────────── */

  var dialog = document.getElementById("shortcuts");
  var helpBtn = document.getElementById("help-toggle");
  var closeBtn = document.getElementById("shortcuts-close");
  var lastG = 0;

  function go(i) {
    var target = sheets[Math.min(sheets.length - 1, Math.max(0, i))];
    if (target) target.scrollIntoView({ block: "start" });
  }

  function openHelp() {
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");   /* <dialog> unsupported: still readable */
  }

  function closeHelp() {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  if (helpBtn) helpBtn.addEventListener("click", openHelp);
  if (closeBtn) closeBtn.addEventListener("click", closeHelp);

  document.addEventListener("keydown", function (e) {
    /* Never intercept a modified chord, and never steal keys from a field
       or from a focused link the reader is about to activate. */
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    var el = document.activeElement;
    var tag = el ? el.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" ||
        (el && el.isContentEditable) || tag === "A") return;

    if (e.key === "Escape") { closeHelp(); return; }
    if (dialog && dialog.open && e.key !== "?") return;

    switch (e.key) {
      case "j": case "ArrowDown":  go(active + 1); e.preventDefault(); break;
      case "k": case "ArrowUp":    go(active - 1); e.preventDefault(); break;
      case "p": window.print(); e.preventDefault(); break;
      case "m": if (window.SKMode) window.SKMode.toggle(); e.preventDefault(); break;
      case "?": openHelp(); e.preventDefault(); break;
      case "g":
        /* gg — two presses inside 500ms returns to the cover */
        if (Date.now() - lastG < 500) {
          window.scrollTo({ top: 0 });
          lastG = 0;
        } else {
          lastG = Date.now();
        }
        break;
      default: break;
    }
  });
})();
