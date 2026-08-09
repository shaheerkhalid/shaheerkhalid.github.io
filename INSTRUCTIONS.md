# INSTRUCTIONS.md — Build brief

Read `CLAUDE.md` first. Work the phases in order. **Stop at the end of each phase, report what changed
and what the acceptance criteria produced, and wait for confirmation before starting the next.**

---

## Objective

Refine the existing consultant profile so the controlled-document concept stops being decorative and
becomes functional. Three ideas carry the whole build:

1. **Redaction is real.** Client identity is genuinely absent, not just captioned as withheld.
2. **The document prints.** `Cmd+P` yields a paginated PDF good enough to send.
3. **Evidence replaces claims.** Shipped tooling and a redacted finding sample stand in for
   "active researcher".

Everything else is craft in service of those three.

---

## Phase 0 — Inventory and safety net

- Copy the current `index.html` to `_baseline/index.html` (gitignored, never deployed).
- Extract every piece of copy from the live page into `CONTENT.md`, organised by sheet. This is the
  source of truth for the rebuild.
- Inventory current CSS: list every colour, font size and spacing value in use, and map each to a token
  from `CLAUDE.md` §4/§5. Report any value that has no obvious token home rather than inventing one.

**Acceptance:** `CONTENT.md` exists and round-trips — every sentence on the live site appears in it.

---

## Phase 1 — Token and type layer

- Create `tokens.css` exactly as specified in `CLAUDE.md` §4.
- Self-host and subset Source Serif 4 (variable) and Commit Mono. Latin only. Report the woff2 sizes.
- Build the type scale in `base.css`: 1.2 ratio, sizes as multiples of `--baseline`, line-heights
  snapped to the 8px baseline grid.
- Apply `tabular-nums` everywhere numerals appear.
- Replace every hard-coded colour and size in the existing CSS with a token reference.

**Acceptance:** grep the codebase for `#` hex literals outside `tokens.css` — zero results. Screenshot
the credentials table showing aligned tabular figures.

---

## Phase 2 — Sheet structure and document furniture

- Each of the 8 sheets becomes a `<section class="sheet">` with consistent page margins and a fixed
  footer rail: `Sheet N of 8 · Confidential · SK / CP-01`.
- Footer rail sits at a fixed position on screen and updates its sheet number as the reader scrolls;
  it becomes a real printed footer in `print.css`.
- Left rail table of contents: sheet list with the active sheet marked and a per-sheet progress
  indicator. Collapses to a compact top bar under 768px.
- Cover sheet: add a **document control block** — Prepared by / Classification / Distribution /
  Revision / Date. Use `--stamp` for the classification marking only.
- Motion budget for the entire site: one stamp-in animation on `RECEIVED` at page load. Nothing else.
  No scroll reveals, no fade-ups.

**Acceptance:** scroll through at 1440px and 375px — footer sheet number tracks correctly, no layout
shift, TOC active state correct. Reduced-motion disables the stamp.

---

## Phase 3 — Redaction and severity chips

**Redaction (Sheet 03).** Client identity renders as a solid redaction bar in `--stamp` at ~60% opacity
over the ink. Hover/focus reveals only non-identifying metadata already published on the page (sector,
engagement type, scale) — never a name, because no name exists in the markup. Verify this by viewing
source: a reader who inspects the DOM must find nothing withheld. That is the point.

**Severity chips.** Every finding with a CVSS score gets a chip:
- Collapsed: `CVSS 8.1` in mono, `--critical` for ≥ 7.0, `--ink-muted` below.
- Expanded on hover/focus/tap: the full vector string, e.g. `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`.
- `TODO(shaheer)` for any finding where the vector isn't known — do not construct one from the score.

**Closed state.** The "all findings retested. closed." line becomes a small status marker in
`--closed`, applied per engagement.

**Acceptance:** chips work by keyboard alone. Redaction bars are legible as redaction in both modes and
in print. DOM inspection reveals no hidden client names.

---

## Phase 4 — Print stylesheet

This is the phase most likely to be done badly. Budget real time for it.

- `@page { size: A4; margin: 20mm 18mm; }` with running header and footer via page margin boxes where
  supported, plus a CSS-counter fallback for "Sheet N of 8".
- Force `--paper` mode values in print regardless of screen mode. No dark backgrounds.
- `break-before: page` on each sheet; `break-inside: avoid` on engagement blocks, table rows and
  credential rows.
- `a[href]::after { content: " (" attr(href) ")" }` for external links only — not for in-page anchors.
- Hide: TOC rail, mode toggle, skip link, keyboard hints.
- Redaction bars must print as solid bars, not as missing background colour
  (`print-color-adjust: exact`).

**Acceptance:** produce `print-test.pdf` and inspect every page. Report page count and confirm no
orphaned headings, no clipped tables, no blank pages.

---

## Phase 5 — Mode toggle and keyboard navigation

- `screen` / `paper` toggle, persisted in `localStorage`, defaulting to `screen`. Label it in the
  document's own vocabulary — "Screen / Paper", not "Dark / Light". No flash of wrong mode on load.
- Keyboard: `j`/`k` and `↑`/`↓` move between sheets, `g`+`g` to cover, `p` to print, `?` opens a small
  shortcut sheet. Never intercept keys while a modifier is held or focus is in a link.
- Shortcut sheet is a `<dialog>` with proper focus trapping and Escape to close.

**Acceptance:** toggle survives reload with no flash. Every shortcut works. Shortcut dialog is
keyboard-complete and screen-reader announced.

---

## Phase 6 — New content sheets

Three additions. Content is `TODO(shaheer)` where noted — build the structure, leave the placeholders.

**6a. Sheet 07 rebuild — Research & tooling.** Currently three sentences; the weakest sheet on the site.
Restructure as an artifact list: for each item, a name, a one-line problem statement, the stack, a
screenshot slot and a link. Reserve three slots.
`TODO(shaheer): supply tool names, one-line problem statements, screenshots, links.`
Keep the existing HackerOne/Bugcrowd paragraph beneath as supporting text, not as the headline.

**6b. New sheet — Engagement model.** Between current Sheets 03 and 04. Covers: scoping inputs,
typical engagement duration, deliverable set, retest policy, turnaround. Table layout, mono labels.
`TODO(shaheer): supply all values.`
Renumber subsequent sheets and update the TOC, footer rail counts and all anchor links.

**6c. New appendix — Revision history.** The cover claims "Rev. 04". Show Rev. 01–04 as a dated table
with a one-line change note each. `TODO(shaheer): supply dates and change notes.`

**6d. Sample finding.** Add a link on Sheet 07 to `resources/sample-finding.pdf`.
`TODO(shaheer): supply the redacted two-page finding.` If the file is absent, render the link in a
disabled state rather than shipping a 404.

**Acceptance:** confirm every anchor, TOC entry, footer count and "Sheet N of M" reflects the new total.
List every `TODO(shaheer)` in your summary.

---

## Phase 7 — Contact sheet and CTA hierarchy

Sheet 08 currently gives seven equally weighted contact routes. Restructure:

- **Primary:** book a call (cal.com) — the only visually dominant action on the sheet.
- **Secondary:** email, telephone.
- **Tertiary:** LinkedIn, GitHub, CV, sample finding — a small mono rail.
- Keep the sign-off block (`Tester of record · OSCP+ · CRTP`) as the document's closing furniture.

**Acceptance:** the primary action is unambiguous in a five-second squint test at both widths.

---

## Phase 8 — Metadata and assets

- `og-template.html`: renders the cover sheet at 1200×630, document reference and classification
  marking included, so link previews read as the cover of a controlled document. Generate `og.png`
  from it and commit both.
- Favicon: `SK` monogram or stamp mark, SVG with a PNG fallback.
- Verify all existing meta tags still resolve. Update `meta-theme-color` per mode if supported.

**Acceptance:** validate the OG card renders correctly at typical preview dimensions.

---

## Phase 9 — Audit

Run the full checklist in `CLAUDE.md` §7 and report every result with actual numbers — contrast ratios,
transferred bytes, request count, print page count. Fix anything that fails, then re-run.

---

## Definition of done

- All nine phases confirmed.
- `CLAUDE.md` §7 checklist passes end to end with reported figures.
- A single summary listing every `TODO(shaheer)` still outstanding, grouped by sheet.
- No factual claim differs from `_baseline/index.html`.

## Commits

One commit per phase. Format: `phase-N: <what changed>`. No commits that mix phases.
