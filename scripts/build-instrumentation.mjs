#!/usr/bin/env node
/*
 * build-instrumentation.mjs — renders sheet 09 from live sources at build time.
 *
 * WHY BUILD TIME. Both sources need a credential: GitHub's contribution
 * calendar is GraphQL-only (there is no REST equivalent) and the Anthropic
 * usage report is an Admin API endpoint. A credential in a public static page
 * is a published credential, so neither can be fetched from the browser.
 *
 * This runs in CI with secrets, writes the numbers straight into index.html
 * between markers, and commits the result. The shipped page therefore makes
 * NO request for this data at all — which also means it needs no new CSP
 * allowance, works with JS disabled, and prints.
 *
 * Usage:  node scripts/build-instrumentation.mjs
 * Env:    GITHUB_TOKEN         read:user (or any token that can read the
 *                              public contribution calendar)
 *         GITHUB_LOGIN         defaults to shaheerkhalid
 *         ANTHROPIC_ADMIN_KEY  org admin key; omit and the Claude block
 *                              renders an explicit pending state
 *
 * Missing credentials never fabricate a number. Each half degrades to a
 * stated "not available" rather than a plausible-looking zero.
 */

import { readFileSync, writeFileSync } from "node:fs";

const HTML = new URL("../index.html", import.meta.url);
const LOGIN = process.env.GITHUB_LOGIN || "shaheerkhalid";
const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const ADMIN_KEY = process.env.ANTHROPIC_ADMIN_KEY;

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
const num = (n) => n.toLocaleString("en-US");

/* ── GitHub ───────────────────────────────────────────────────────────── */

async function github() {
  if (!GH_TOKEN) return { ok: false, reason: "GITHUB_TOKEN not set" };

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks { firstDay contributionDays { date contributionCount weekday } }
          }
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          restrictedContributionsCount
        }
      }
    }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "sk-cp-01-instrumentation",
    },
    body: JSON.stringify({ query, variables: { login: LOGIN } }),
  });

  if (!res.ok) return { ok: false, reason: `GitHub HTTP ${res.status}` };
  const json = await res.json();
  if (json.errors) return { ok: false, reason: json.errors[0]?.message || "GraphQL error" };

  const c = json.data?.user?.contributionsCollection;
  if (!c) return { ok: false, reason: `no such user: ${LOGIN}` };

  return {
    ok: true,
    total: c.contributionCalendar.totalContributions,
    commits: c.totalCommitContributions,
    prs: c.totalPullRequestContributions,
    issues: c.totalIssueContributions,
    restricted: c.restrictedContributionsCount,
    weeks: c.contributionCalendar.weeks,
  };
}

/* ── Anthropic Admin API ──────────────────────────────────────────────── */

async function anthropic() {
  if (!ADMIN_KEY) return { ok: false, reason: "ANTHROPIC_ADMIN_KEY not set" };

  const since = new Date(Date.now() - 30 * 864e5).toISOString().replace(/\.\d+Z$/, "Z");
  const url = new URL("https://api.anthropic.com/v1/organizations/usage_report/messages");
  url.searchParams.set("starting_at", since);
  url.searchParams.set("bucket_width", "1d");
  url.searchParams.set("limit", "31");

  /* Admin keys authenticate with x-api-key; OAuth tokens with Bearer. */
  const auth = ADMIN_KEY.startsWith("sk-ant-")
    ? { "x-api-key": ADMIN_KEY }
    : { Authorization: `Bearer ${ADMIN_KEY}` };

  const totals = { uncached: 0, output: 0, cacheRead: 0, cacheCreate: 0 };
  let days = 0;
  let page = null;

  /* The report paginates; a 30-day window can exceed one page when grouped. */
  for (let guard = 0; guard < 20; guard++) {
    if (page) url.searchParams.set("page", page);
    const res = await fetch(url, {
      headers: { ...auth, "anthropic-version": "2023-06-01" },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, reason: `Anthropic HTTP ${res.status}${body ? `: ${body.slice(0, 120)}` : ""}` };
    }
    const json = await res.json();
    for (const bucket of json.data || []) {
      let bucketHadUsage = false;
      for (const r of bucket.results || []) {
        totals.uncached += r.uncached_input_tokens || 0;
        totals.output += r.output_tokens || 0;
        totals.cacheRead += r.cache_read_input_tokens || 0;
        totals.cacheCreate +=
          (r.cache_creation?.ephemeral_1h_input_tokens || 0) +
          (r.cache_creation?.ephemeral_5m_input_tokens || 0);
        bucketHadUsage = true;
      }
      if (bucketHadUsage) days++;
    }
    if (!json.has_more) break;
    page = json.next_page;
    if (!page) break;
  }

  return { ok: true, ...totals, days, since: since.slice(0, 10) };
}

/* ── Heatmap ──────────────────────────────────────────────────────────────
   Achromatic by construction: five levels map onto the ink ramp, so the
   graph introduces no chromatic event and --critical stays reserved for
   severity. Levels are quantiles of the non-zero days, not fixed
   thresholds — a fixed scale renders an entire year as one flat tone when
   the busiest day is in single digits.                                     */

function heatmap(weeks) {
  const CELL = 9, GAP = 3, PITCH = CELL + GAP, TOP = 14;
  const days = weeks.flatMap((w) => w.contributionDays);
  const nonzero = days.map((d) => d.contributionCount).filter((n) => n > 0).sort((a, b) => a - b);
  const q = (p) => (nonzero.length ? nonzero[Math.min(nonzero.length - 1, Math.floor(nonzero.length * p))] : 1);
  const cuts = [q(0.25), q(0.5), q(0.75)];
  const level = (n) => (n === 0 ? 0 : n <= cuts[0] ? 1 : n <= cuts[1] ? 2 : n <= cuts[2] ? 3 : 4);

  const w = weeks.length * PITCH - GAP;
  const h = TOP + 7 * PITCH - GAP;

  const months = [];
  let last = "";
  weeks.forEach((week, i) => {
    const m = new Date(week.firstDay + "T00:00:00Z").toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    if (m !== last && i < weeks.length - 1) { months.push({ x: i * PITCH, label: m.toUpperCase() }); last = m; }
  });

  const cells = weeks
    .map((week, x) =>
      week.contributionDays
        .map((d) => {
          const y = TOP + d.weekday * PITCH;
          return `<rect x="${x * PITCH}" y="${y}" width="${CELL}" height="${CELL}" class="hm-${level(d.contributionCount)}"><title>${d.date}: ${d.contributionCount} contribution${d.contributionCount === 1 ? "" : "s"}</title></rect>`;
        })
        .join(""),
    )
    .join("");

  const labels = months
    .map((m) => `<text x="${m.x}" y="8" class="hm-label">${m.label}</text>`)
    .join("");

  return `<svg class="heatmap" viewBox="0 0 ${w} ${h}" role="img" aria-label="GitHub contribution calendar for the trailing 52 weeks. Totals are stated in the table below." preserveAspectRatio="xMinYMin meet">${labels}${cells}</svg>`;
}

/* ── Render ───────────────────────────────────────────────────────────── */

function field(label, value, note) {
  return `        <div class="inst-field"><span class="k">${esc(label)}</span><span class="v${note ? " todo" : ""}">${esc(value)}</span></div>`;
}

function renderGitHub(g, stamp) {
  if (!g.ok) {
    return [
      `      <p class="sub">GitHub · trailing 52 weeks</p>`,
      `      <p class="todo">Not available at last build — ${esc(g.reason)}.</p>`,
    ].join("\n");
  }
  return [
    `      <p class="sub">GitHub · trailing 52 weeks · refreshed ${esc(stamp)}</p>`,
    `      ${heatmap(g.weeks)}`,
    `      <div class="inst-grid">`,
    field("Contributions", num(g.total)),
    field("Commits", num(g.commits)),
    field("Pull requests", num(g.prs)),
    field("Issues", num(g.issues)),
    `      </div>`,
    `      <p class="note-body">Public repositories only. Client engagements are performed in`,
    `        customer-controlled repositories under NDA and are not represented here; this`,
    `        graph therefore understates delivery by design.</p>`,
  ].join("\n");
}

function renderClaude(a, stamp) {
  if (!a.ok) {
    return [
      `      <p class="sub">Anthropic API · rolling 30 days</p>`,
      `      <!-- TODO(shaheer): add ANTHROPIC_ADMIN_KEY as a repository secret to`,
      `           populate this block. Until then it states its own absence rather`,
      `           than rendering a zero that would read as a real measurement. -->`,
      `      <p class="todo">Not available at last build — ${esc(a.reason)}.</p>`,
    ].join("\n");
  }
  const billable = a.uncached + a.output;
  return [
    `      <p class="sub">Anthropic API · rolling 30 days from ${esc(a.since)} · refreshed ${esc(stamp)}</p>`,
    `      <div class="inst-grid">`,
    field("Input (uncached)", num(a.uncached)),
    field("Output", num(a.output)),
    field("Cache read", num(a.cacheRead)),
    field("Cache write", num(a.cacheCreate)),
    field("Priced tokens", num(billable)),
    field("Active days", num(a.days)),
    `      </div>`,
    `      <p class="note-body">Cache reads are re-reads of context already counted and are`,
    `        reported separately rather than folded into a headline figure.</p>`,
  ].join("\n");
}

function splice(html, name, body) {
  const start = `<!-- instrumentation:${name}:start -->`;
  const end = `<!-- instrumentation:${name}:end -->`;
  const i = html.indexOf(start);
  const j = html.indexOf(end);
  if (i === -1 || j === -1) throw new Error(`markers for "${name}" not found in index.html`);
  return html.slice(0, i + start.length) + "\n" + body + "\n      " + html.slice(j);
}

const [g, a] = await Promise.all([github(), anthropic()]);
const stamp = new Date().toISOString().slice(0, 10);

let html = readFileSync(HTML, "utf8");
html = splice(html, "github", renderGitHub(g, stamp));
html = splice(html, "claude", renderClaude(a, stamp));
writeFileSync(HTML, html);

console.log(`github  : ${g.ok ? `${g.total} contributions, ${g.weeks.length} weeks` : `unavailable (${g.reason})`}`);
console.log(`claude  : ${a.ok ? `${num(a.uncached + a.output)} priced tokens over ${a.days} active days` : `unavailable (${a.reason})`}`);
console.log(`written : index.html`);
