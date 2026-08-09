# CLAUDE.md — shaheerkhalid.github.io

Project-scoped rules. These override nothing in the global `~/.claude/CLAUDE.md`; they add to it.

---

## 1. What this project is

A single-page consultant profile for an offensive security consultant, deliberately designed as a
**controlled document** — not a portfolio site. Document reference `SK / CP-01`. The reader is a CISO,
security manager or procurement lead who reads pentest reports all day. The page should read as an
artifact produced by the profession, not as marketing about it.

The site is live on GitHub Pages at `https://shaheerkhalid.github.io/`. It already exists.

**Superseded 2026-08-09.** This began as "a refinement, not a redesign". It became a redesign, at the
owner's direction. The controlled-document *concept* is unchanged and still not up for
reconsideration — what changed is that the page no longer *simulates* a document on screen. The
paper simulation (cream sheets on a dark desk, staple, punch holes, per-sheet rotation, drop
shadows) is gone. Page-ness now exists only in print, where it is real.

---

## 2. Non-negotiables

| Rule | Detail |
| --- | --- |
| **Zero dependencies** | No React, no Tailwind, no build step, no bundler, no npm. Hand-written HTML, CSS and vanilla JS only. |
| **Zero third-party requests** | No Google Fonts CDN, no analytics, no trackers, no external images. Everything self-hosted. This is a security consultant's site; a single outbound request to a CDN undermines it. **One documented exception:** the cal.com booking embed (`app.cal.com`), kept at the owner's explicit direction. It is the only host the CSP admits, its init lives in `assets/js/cal.js` rather than inline, and the booking anchor works as a plain link without it. Nothing else may be added to this list without the same explicit call. |
| **Content is authoritative** | Never invent, embellish or "improve" a factual claim — client names, CVSS scores, dates, metrics, employers, certifications. Migrate copy verbatim. |
| **Placeholders are explicit** | Where new content is needed and you don't have it, insert `TODO(shaheer): <what's needed>` in the markup as an HTML comment and list it in the final summary. Never fill the gap with plausible-sounding text. |
| **Print is a first-class output** | The page says "Uncontrolled when printed". `Cmd+P` must produce a genuinely clean, paginated document. This is a feature, not an afterthought. |
| **Ask before restructuring** | Adding a sheet, removing a sheet, or changing the section order needs confirmation first. |

---

## 3. Stack & file layout

```
/
├── index.html                 # single page, all 8+ sheets
├── assets/
│   ├── css/
│   │   ├── tokens.css         # custom properties only — no selectors beyond :root / [data-mode]
│   │   ├── base.css           # reset, type scale, baseline grid
│   │   ├── document.css       # sheet layout, footer rail, redaction, chips
│   │   └── print.css          # @media print + @page
│   ├── js/
│   │   ├── nav.js             # sheet observer, progress rail, keyboard nav
│   │   ├── mode.js            # screen/paper mode toggle + persistence
│   │   └── redact.js          # redaction reveal, CVSS vector expansion
│   └── fonts/                 # self-hosted woff2, subsetted
├── resources/
│   ├── Shaheer_Khalid_CV.pdf
│   └── sample-finding.pdf     # TODO(shaheer)
├── og.png
└── og-template.html           # source for regenerating og.png
```

CSS load order is `tokens → base → document → print`. Keep it that way; do not introduce a fifth
stylesheet without asking.

---

## 4. Design tokens — canonical

Define these in `tokens.css` and **derive every colour and size from them**. No hard-coded hex values
or px sizes anywhere else in the codebase.

**Superseded 2026-08-09 — the palette is now achromatic.** `tokens.css` is the authority; the block
below records what changed and why, so the reasoning is not lost.

The warm near-black ground and the rubber-stamp violet are gone. `--critical` is the only chromatic
event on the page, with `--closed` the sole exception on a retested marker. Document furniture
(`--stamp`) kept its name and its job but lost its hue: furniture must never compete with a severity.

Three values differ from what a naive port would produce, each because it was **measured**:

| Token | Was | Is | Why |
| --- | --- | --- | --- |
| `--critical` (screen) | `#C0392B` | `#D65446` | `#C0392B` reads **3.62:1** on the dark ground and fails AA |
| `--closed` (screen) | `#6E7F5C` | `#738560` | **4.29:1** on `--surface`, likewise failing |
| `--ink-faint` (screen) | `#63636B` | `#7E7E87` | was used for real text (TOC rest state, field labels) at **3.30:1** |

A fourth token was added: `--mark`, carrying the old faint value, for decorative marks only — list
bullets and the em-dash before an entry. It sits below 4.5:1 **by design**, and nothing a reader
must read is permitted to use it. If you find yourself reaching for `--mark` on text, use
`--ink-faint`.

Measured result: 303 rendered text elements, **zero AA failures**, in both modes.

**Colour discipline — the rule that matters:** `--stamp` is for document furniture (classification
markings, revision marks, the RECEIVED stamp). `--critical` appears *only* where a severity is being
asserted. Neither is ever used to make something look nice. If you find yourself reaching for an accent
to add visual interest, the answer is more whitespace or a hairline rule instead.

**Explicitly avoid:** cream-and-terracotta (`#F4F1EA` + `#D97757`-adjacent). It is the current
house style of AI-generated design and reads as a tell. The palette above is deliberately away from it.

---

## 5. Type system

- **Body:** Source Serif 4 (variable, OFL). A serif is the point — it reads as audit report, not dev blog.
- **Utility:** Commit Mono or JetBrains Mono (OFL) for document references, sheet numbers, dates, labels,
  CVSS vectors, tooling lists.
- Self-host both as subsetted `woff2`. `font-display: swap`. Latin subset only.
- **`font-variant-numeric: tabular-nums` on every element containing numbers** — dates, CVSS scores,
  asset counts, sheet numbers, the credentials table. Proportional figures make a document look like a
  webpage; this single property does more for the conceit than anything else.
- Type scale on a 1.2 ratio, all sizes as multiples of `--baseline`. One measure: `--measure`.
- Section numbering (`01 — Summary` … `08 — Contact`) stays. It encodes a real document sequence with a
  table of contents, so it is structural, not decorative.

---

## 6. Code standards

- Semantic HTML. Each sheet is a `<section>` with an `id` and `aria-labelledby`.
- CSS: flat specificity, no nesting beyond one level, no `!important`. Use logical properties
  (`margin-block`, `padding-inline`). Watch for `.section` vs element-selector padding collisions.
- JS: no classes needed, small modules, `defer` on every script tag. Progressive enhancement —
  **every piece of content must be readable and every link usable with JS disabled.** Redaction, mode
  toggle and keyboard nav are enhancements, not requirements.
- `localStorage` is fine here (real site, not a Claude artifact) — use it only for mode preference.
- Add a strict CSP `<meta>`: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';
  font-src 'self'; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'`. No inline scripts or
  styles — if the CSP would need `unsafe-inline`, refactor instead of loosening it.
- Comment sparingly and only where intent is non-obvious.

---

## 7. Before you call anything done

Run this checklist and report results explicitly. Do not claim completion without it.

1. **Print test** — render `index.html` to PDF at A4. Every sheet starts on a new page, no orphaned
   headings, no clipped content, no dark background flooding the page, links expanded as footnotes.
2. **JS-off test** — disable JS. All content readable, all links work, nothing visually broken.
3. **Contrast** — every text/background pair ≥ 4.5:1 (≥ 3:1 for text above 24px), in both modes.
   `--ink-muted` on `--paper` is the pair that usually fails. Report the computed ratios.
4. **Keyboard** — full traversal, visible focus ring on every interactive element, skip link works.
5. **Reduced motion** — `prefers-reduced-motion: reduce` disables all transitions.
6. **Network** — DevTools shows zero third-party requests. Total transferred < 250 KB.
7. **Mobile** — 375px wide: no horizontal scroll, footer rail collapses to a compact bar,
   three-column scope grid collapses to one.
8. **Content diff** — confirm no factual claim changed from the previous `index.html`.

## 8. Out of scope

Don't add: a blog, a CMS, a dark/light auto-switcher beyond the explicit toggle, testimonials, a
contact form, animated backgrounds, scroll-triggered fade-ups, or a hero image. If a change isn't in
`INSTRUCTIONS.md`, ask first.
