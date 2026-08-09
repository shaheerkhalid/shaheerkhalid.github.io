# CONTENT.md — source of truth

Every piece of copy extracted verbatim from the pre-redesign `index.html`
(preserved at `_baseline/index.html`, commit `b75496d`).

**Rule:** this file is authoritative for wording. Nothing here may be reworded, embellished or
"improved" during the rebuild. Where the rebuild needs copy that does not exist here, it gets a
`TODO(shaheer)` marker instead of invented text.

---

## Head / metadata

| Field | Value |
| --- | --- |
| `<title>` | Shaheer Khalid — Consultant Profile — Offensive Security, Dubai |
| `description` | Consultant profile for Shaheer Khalid. Offensive security, penetration testing and vulnerability management across financial, healthcare, oil & gas, manufacturing and e-commerce in the UAE, Middle East and South Asia. OSCP+, CRTP. |
| `canonical` | https://shaheerkhalid.github.io/ |
| `theme-color` | #17150F |
| `og:type` | profile |
| `og:title` | Shaheer Khalid — Consultant Profile |
| `og:description` | Offensive security consultant, Dubai. Penetration testing and vulnerability management across banking, healthcare, oil & gas and e-commerce. OSCP+, CRTP. |
| `og:image` | https://shaheerkhalid.github.io/og.png — **404 at time of rebuild** |
| `twitter:card` | summary_large_image |
| `twitter:title` | Shaheer Khalid — Consultant Profile |
| `twitter:description` | Offensive security consultant, Dubai. OSCP+, CRTP. |

### JSON-LD (Person) — factual payload

- name: Shaheer Khalid
- jobTitle: Penetration Tester — Security Consultant
- email: shaheerkhalid12@gmail.com
- telephone: +971528638661
- description: Offensive security professional with 5+ years delivering penetration testing and vulnerability management across financial, healthcare, oil and gas, manufacturing and e-commerce sectors.
- address: Dubai, AE
- worksFor: Malcrove EMEA Technology L.L.C.
- alumniOf: COMSATS University
- image: https://shaheerkhalid.github.io/portrait.jpg
- knowsAbout: Penetration testing · Vulnerability management · Active Directory exploitation · Web application security · Mobile application security · Cloud security · MITRE ATT&CK · OWASP Top 10 · OWASP MASVS · NIST CSF · PCI DSS · ISO 27001 · UAE IA Standards · NESA · ADHICS
- hasCredential: OSCP+ (Offensive Security) · CRTP (Altered Security) · CEH (EC-Council)
- sameAs: https://www.linkedin.com/in/shaheer-khalid · https://github.com/shaheerkhalid

---

## Running band

- Left: `Confidential — Consultant Profile`
- Right: `SK / CP-01`
- Nav: Summary · Engagements · History · Credentials · Contact

Skip link: `Skip to summary`

---

## Cover

- Stamp: `RECEIVED` / `Rev. 04 · 2026`
- Classification line: `Confidential — prepared for the named recipient only`
- H1: `Shaheer Khalid`
- Doctype: `Consultant Profile · Offensive Security`

| Key | Value |
| --- | --- |
| Role | Penetration Tester — Security Consultant |
| Based | Dubai, United Arab Emirates · GMT+4 |
| Experience | 5+ years · UAE, wider Middle East, South Asia |
| Sectors | Financial · Healthcare · Oil & Gas · Manufacturing · E-commerce |
| Credentials | OSCP+ · CRTP · CEH · CAP · CNSS · PEH |
| Currently | Malcrove EMEA Technology L.L.C., Dubai |
| Email | shaheerkhalid12@gmail.com |
| Telephone | +971 52 863 8661 |

Contents list: Summary · Scope of practice · Selected engagements · Engagement history ·
Credentials · Tooling & frameworks · Research · Contact & sign-off

Footer: `Cover` · `Uncontrolled when printed` · `SK / CP-01`

---

## 01 — Summary
*Sub-label: Professional standing*

> Offensive security professional with **5+ years** of hands-on experience delivering penetration
> testing and vulnerability management across financial, healthcare, oil & gas, manufacturing and
> e-commerce sectors in the UAE, the wider Middle East and South Asia.

> **OSCP+ and CRTP certified**, with a track record of identifying critical RCE, IDOR, business
> logic and account takeover vulnerabilities by chaining low-risk issues into high-impact exploit
> paths. Experienced in vulnerability management at scale, AI-assisted security tooling, and
> building internal security tools.

> Delivers both technical and executive-grade reports, mentors junior testers, and contributes to
> in-house attack methodologies. Active bug bounty researcher.

---

## 02 — Scope of practice
*Sub-label: What I am engaged to do*

**Offensive security**
- Web, mobile & network penetration testing
- Vulnerability assessment & management
- Active Directory exploitation
- Cloud security testing (AWS)
- Source code review (SAST/DAST)

**Governance & compliance**
- NIST CSF, PCI DSS, ISO 27001
- UAE IA Standards, NESA, ADHICS
- Security policy & procedure development
- Threat modeling
- MITRE ATT&CK framework
- OWASP Top 10 / MASVS / ASVS

**Collaboration**
- Executive & technical reporting
- Stakeholder communication
- Developer remediation coaching
- Cross-functional team leadership
- Security awareness training
- Mentoring & knowledge transfer

---

## 03 — Selected engagements
*Sub-label: Client names withheld under NDA*

### Core banking mobile application — Financial · PK & ME
Meta: `Grey box` · `[client identity — withheld]` · `2M+ end users`
- Discovered **amount manipulation and authentication bypass** (**CVSS 8.1**) enabling unauthorised fund transfers
- Bypassed SSL pinning, root detection and runtime integrity checks using custom Frida scripts
- Led the remediation workshop with the client's DevSecOps team

### National vaccine portal — Healthcare · PK & ME
Meta: `OWASP Top 10 & MASVS L2` · `[client identity — withheld]`
- Uncovered **4 high-severity findings**, including stored XSS and broken access control
- Mobile assessment identified insecure data storage and weak crypto implementations

### Energy infrastructure — Oil & Gas · PK & ME
Meta: `Black & grey box · web, mobile and core infrastructure`
- Uncovered **critical Remote Code Execution** and business logic flaws
- Partnered with engineering to deploy compensating controls **within 7 days**

### Distributed manufacturing estate — Industrial · US, CA & ME
Meta: `Infrastructure, SAST and DAST across globally distributed facilities`
- Assessed **100+ network devices and servers**
- Delivered a unified remediation roadmap consumed by globally distributed engineering teams

### Tier-1 e-commerce platforms — E-commerce · PK & ME
Meta: `Web & API` · `[client identity — withheld]`
- Identified **IDOR and account takeover**, bypassing WAF and bot protection
- Developer-focused remediation guidance reduced recurrence on subsequent retests

Closing pen note: `— all findings retested. closed.`

> **Redaction note.** Three descriptor strings previously sat in the shipped DOM inside
> `<button class="redact">` elements, readable by anyone using View Source. The rebuild removes them
> from the markup entirely.
>
> They are **not reproduced in this file either.** GitHub Pages serves any static file in the repo
> root, so a working note committed here is as public as the page itself — recording them to prove a
> diff would have re-published exactly what the redaction exists to withhold. They survive only in
> `_baseline/index.html`, which is gitignored and never leaves the working copy, and in the pre-rebuild
> commit `b75496d`.
>
> For the record: they were generic sector descriptors, not client names. No client name has ever
> appeared in this site's markup.

---

## 04 — Engagement history
*Sub-label: 2020 — present*

### Penetration Tester — Security Consultant · May 2025 — Present
Malcrove EMEA Technology L.L.C., Dubai, UAE
- Scope and lead **15+ engagements per quarter** across web, mobile, network and Active Directory for enterprise clients in the GCC
- Manage vulnerability assessment and remediation tracking for **2,000+ assets**; built a prioritisation methodology ranking findings by asset criticality, public exposure and severity
- Chain low-severity findings into full attack paths, producing **CVSS 8.0+ disclosures** across multiple engagements
- Build internal tooling automating reconnaissance, reporting and vulnerability correlation
- Contribute TTPs to the internal methodology library; authored scripts adopted firm-wide
- Participate in Red vs Blue exercises to uplift detection engineering and ATT&CK coverage
- Mentor junior consultants and deliver C-suite and engineering briefings

### Cyber Security Analyst — Security Engineer · Nov 2022 — Aug 2024
B&S World Supply, Dubai, UAE
- Conducted **100+ assessments** across systems, networks and applications, reducing critical exposure **60% year-over-year**
- Developed policies aligned to NIST CSF, PCI DSS and ISO 27001; led the organisation through **2 external audits with zero major findings**
- Reported **200+ vulnerabilities** with prioritised guidance, achieving **70% mean-time-to-remediation improvement**
- Delivered awareness sessions to **100+ employees**; phishing simulations cut click-rate **30%**

### Penetration Tester — Security Consultant · Nov 2021 — Sep 2022
National Petroleum Construction Company (NPCC), Abu Dhabi, UAE
- Tested **20+ web applications, mobile apps and thick clients** across a critical-infrastructure oil & gas estate
- Organisation-level OSINT and attack surface mapping identified **20 externally exposed assets and credentials**
- Embedded security into the SDLC with development teams, reducing post-deployment incidents
- Produced **15+ detailed assessment reports** for IT leadership and engineering

### Penetration Tester — Security Consultant · Aug 2020 — Oct 2021
VaporVM, Lahore, Pakistan
- Host, network, web and mobile testing across **30+ client engagements**, benchmarked to OWASP Top 10 and MASVS
- Risk assessments validating compliance with international standards and contractual obligations
- Built custom tooling and lab scenarios, accelerating delivery **10%**
- Represented the firm in Capture The Flag competitions

### B.Sc. Software Engineering · 2016 — 2020
COMSATS University, Pakistan
- Coursework: network security, cryptography, database systems, software architecture
- Final year project: integrated B2C e-commerce and eLearning platform — React, Node.js, MySQL

---

## 05 — Credentials
*Sub-label: Verifiable on request*

| Certification | Issuer | Year |
| --- | --- | --- |
| Offensive Security Certified Professional (OSCP+) | Offensive Security | 2024 |
| Certified Red Team Professional (CRTP) | Altered Security | 2023 |
| Certified AppSec Practitioner (CAP) | The SecOps Group | 2023 |
| Certified Ethical Hacker (CEH) | EC-Council | 2021 |
| Certified Network Security Specialist (CNSS) | ICSI | 2020 |
| Practical Ethical Hacking (PEH) | TCM Security | 2020 |

OSCP+ verification URL (both the name cell and the year cell link to it):
`https://www.credential.net/ec140901-8481-4edd-b062-a39ee47dba15#acc.Hq85BZEP`

Pen note: `OSWE & CRTO in progress →`

---

## 06 — Tooling & frameworks
*Sub-label: What actually gets used*

- **Web application** — Burp Suite Pro · Acunetix · Nikto · AppScan · SQLMap · Shodan · manual OWASP Top 10 / ASVS testing · source code static analysis
- **Mobile application** — Frida · Objection · Logcat · Drozer · ADB · apktool · jadx · MobSF · OWASP MASVS
- **Active Directory & red team** — CrackMapExec · Impacket · BloodHound · PowerView · PowerSploit · Mimikatz · PowerUpSQL · UACme · Rubeus · Certify
- **Network VA/PT** — Nmap · Nessus · Metasploit · Hashcat · Aircrack-ng · Netcat · Ligolo-ng · Responder
- **Cloud** — AWS penetration testing · IAM misconfiguration review · S3 enumeration · cloud configuration assessment
- **Scripting & automation** — Python · Bash · PowerShell — custom internal tools for reconnaissance, reporting and vulnerability correlation. AI models (Hermes, Claude) applied to threat research and tooling development.
- **Frameworks & standards** — OWASP Top 10 · OWASP MASVS · MITRE ATT&CK · NIST CSF · PCI DSS · ISO 27001 · UAE IA Standards · NESA · ADHICS

---

## 07 — Research
*Sub-label: Outside client work*

> Active researcher on **HackerOne** and **Bugcrowd**, with valid reports accepted across a range
> of programmes.

> Focus areas: IDOR, SSRF, business logic flaws, authentication and authorisation bypass, OAuth
> misconfiguration, and account takeover.

---

## 08 — Contact & sign-off
*Sub-label: Direct line, not a ticket queue*

| Label | Value |
| --- | --- |
| Email | shaheerkhalid12@gmail.com |
| Telephone | +971 52 863 8661 |
| LinkedIn | linkedin.com/in/shaheer-khalid |
| GitHub | github.com/shaheerkhalid |
| Book a call | 30 minutes → https://cal.com/shaheer-khalid/30min |
| Full CV | resources/Shaheer_Khalid_CV.pdf |
| Based | Dubai, United Arab Emirates |
| Tester of record | Shaheer Khalid · OSCP+ · CRTP |

Footer: `Sheet 8 of 8 — End of document` · `Confidential` · `SK / CP-01`

---

## Recurring furniture

- Per-sheet footer: `Sheet N of 8` · `Confidential` · `SK / CP-01`
- Cover footer substitutes `Cover` and `Uncontrolled when printed`

---

## Content the rebuild adds — no source text exists

These are structure-only. Copy is `TODO(shaheer)`.

- **Engagement model** — scoping inputs, typical duration, deliverable set, retest policy, turnaround
- **Revision history** — Rev. 01 through Rev. 04, dates and one-line change notes
- **Research & tooling artifacts** — three slots: name, one-line problem statement, stack, screenshot, link
- **Sample finding** — `resources/sample-finding.pdf`
- **CVSS vectors** — only `CVSS 8.1` (core banking) has a published score. No vector string is
  published for any finding, and none will be constructed from a score.

---

# Appendix — CSS inventory of the baseline

Phase 0 requirement: every colour, size and spacing value in `_baseline/index.html`, mapped to a
token home. Values with no obvious home are called out rather than assigned one.

## Colours — 12 in use

| Value | Baseline name | Used for | Token home |
| --- | --- | --- | --- |
| `#17150F` | `--desk` | page background | `--paper` (screen) |
| `#12100B` | `--desk-2` | declared, **never used** | none — drop |
| `#E9E5D9` | `--paper` | sheet background | `--surface` (paper mode) |
| `#DFDACB` | `--paper-2` | declared, **never used** | none — drop |
| `#1A1814` | `--ink` / `--rule-2` | body text, heavy rules | `--ink` (paper) / `--rule` |
| `#4A463C` | `--ink-2` | paragraph text | `--ink-muted` |
| `#64604F` | `--ink-3` | metadata, footers | `--ink-faint` |
| `#B8B2A0` | `--rule` | hairlines, table borders | `--rule` |
| `#A83226` | `--red` | band, stamp, severity, focus ring, selection, skip link, hover | **split** — see below |
| `#1F4E8C` | `--pen` | handwritten annotations | none — see below |
| `#6E6A5E` | — | staple, hard-coded | none — element removed |
| `#FFFFFF` | — | band text, selection text | `--ink` |

**Two values with no clean token home:**

1. `#A83226` is doing six unrelated jobs — running band, RECEIVED stamp, severity assertion, focus
   ring, `::selection`, and every hover state. Under `--critical` discipline it cannot keep all of
   them: severity is the only one that survives as red. Band and stamp move to `--stamp`
   (achromatic), hover and focus move to `--ink`, selection moves to `--ink`/`--paper` inverted.
2. `#1F4E8C` (pen blue) has no home in an achromatic palette. The two annotations it carries —
   `— all findings retested. closed.` and `OSWE & CRTO in progress →` — become a `--closed` status
   marker and an `--ink-muted` note respectively. The Instrument Serif italic "handwriting" goes
   with it.

`rgba(0,0,0,.35/.5/.55)` are drop shadows on sheets, staple and punch holes. All three elements are
removed, so the values retire with them.

## Font sizes — 19 distinct values

`.56 .6 .62 .64 .66 .68 .72 .74 .75 .78 .8 .82 .86 .88 .9 .95 1.16rem`, plus `15px` root and
`clamp(1.75rem, 5.4vw, 2.9rem)` for the H1.

Nineteen sizes across ~30 rules is unsystematic — several differ by 0.02rem, which is below the
threshold of visible difference and cannot be intentional. All collapse onto the 1.2-ratio scale.

## Letter-spacing — 11 distinct values

`-.015 .08 .09 .1 .13 .14 .15 .16 .2 .22 .24em`. Collapses to three tracking steps: tight (headline),
normal, and wide (mono uppercase labels).

## Fonts

Courier Prime + Instrument Serif, both loaded from the Google Fonts CDN — a third-party request on
every page load. Replaced by self-hosted Source Serif 4 and Commit Mono.
