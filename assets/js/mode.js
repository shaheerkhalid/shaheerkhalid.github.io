/* mode.js — screen / paper mode.
   Loaded synchronously in <head>, before any paint, so the document never
   flashes the wrong ground. External rather than inline so the CSP does
   not need script-src 'unsafe-inline'. */

(function () {
  "use strict";

  var KEY = "sk-cp-01-mode";
  var root = document.documentElement;

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      return (v === "paper" || v === "screen") ? v : null;
    } catch (e) { return null; }   // private mode, disabled storage
  }

  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* preference is not critical */ }
  }

  /* Applied immediately — this is the whole point of loading synchronously. */
  set(read() || "screen");

  function set(mode) {
    root.setAttribute("data-mode", mode);
  }

  function current() {
    return root.getAttribute("data-mode") === "paper" ? "paper" : "screen";
  }

  function toggle() {
    var next = current() === "paper" ? "screen" : "paper";
    set(next);
    write(next);
    sync();
  }

  var btn;

  function sync() {
    if (!btn) return;
    var isPaper = current() === "paper";
    /* The label names the mode you would switch TO, in the document's own
       vocabulary — never "dark" or "light". */
    btn.textContent = isPaper ? "Screen" : "Paper";
    btn.setAttribute("aria-pressed", String(isPaper));
    btn.setAttribute("aria-label", isPaper
      ? "Switch to screen mode"
      : "Switch to paper mode");
  }

  document.addEventListener("DOMContentLoaded", function () {
    btn = document.getElementById("mode-toggle");
    if (btn) {
      btn.addEventListener("click", toggle);
      sync();
    }
  });

  /* nav.js binds the "m" shortcut to this. */
  window.SKMode = { toggle: toggle };
})();
