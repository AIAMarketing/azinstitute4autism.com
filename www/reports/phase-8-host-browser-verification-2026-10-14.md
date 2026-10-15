# Phase 8 isolated host-browser verification — 2026-10-14

Latest bounded follow-up: [technical checkpoint-review readiness](phase-8-browser-verification-2026-10-15.md#bounded-follow-up--2026-10-15).
Human acceptance remains pending. The native modal boundary below is now
reproduced in a minimal control and does not indicate background focus escape.

To repeat only the bounded follow-up with an existing working Playwright module:

```bash
node tools/phase8-followup.mjs /tmp/aia-phase8-followup-new
```

This uses the same guarded loopback preview. Native 200% zoom needs the module's
`chromium.launchPersistentContext` API and Chromium extension support; an optional
temporary module adapter must expose that API as well as `launch`. The runner
creates a fresh test profile/extension under its output folder, without changing
the normal browser profile. Website service workers and external requests remain
blocked. A temporary extension worker only controls native tab zoom; it contains
no network code. Zoom evidence uses overlapping viewport images because
Playwright fullPage clips at native zoom in this environment. To repeat just
that capture, use `PHASE8_ZOOM_ONLY=1` with a different fresh output directory.
All screenshots/profiles stay outside Git. Do not treat technical checks as
screen-reader or fluent-language sign-off.

Status update 2026-10-15: **system Chromium browser execution now succeeds;
human reviewer acceptance remains Pending**. See the
[actual browser results](phase-8-browser-verification-2026-10-15.md).
The environment failure recorded below describes the earlier attempt, not the
current system-browser result. The optional Nix shell itself remains unverified.
Read the [Phase 8 report](phase-8-visual-accessibility-acceptance-2026-10-14.md)
and [Phase 7 nonproduction plan](phase-7-nonproduction-verification-plan-2026-10-14.md).
This procedure authorizes no hosting, production request, submission, deployment,
tracking, staging or commit. Use the current uncommitted Phase 8 CSS changes for
verification; record HEAD and diff before review.

## Prerequisites and stop conditions

Environment follow-up (2026-10-14): the repository now offers a Linux Nix
`browser` shell. From the repository root run
`nix --extra-experimental-features "nix-command flakes" develop .#browser`.
It supplies a matching driver/browser from the existing lockfile and sets
`PLAYWRIGHT_MODULE` for both the smoke test and the runner below. First run
`TMPDIR=/tmp node tools/playwright-smoke.mjs` from `www` after a staging build.
That bounded probe starts its own loopback preview in the same execution and
must succeed before a full suite is attempted. It creates no production requests.
Shell realization/browser launch remain unverified in the autonomous environment:
Nix's pinned-input fetch fails CA validation and the host store/daemon is not
visible. Syntax checks alone do not establish a working browser. The following
existing-installation fallback remains available outside the Nix shell.

Use the project's existing Nix environment and locked dependencies. Record Node,
npm, OS, Playwright and Chromium versions. The repository does not add a Playwright
dependency. An **existing**, working host Playwright installation and Chromium
binary are required; the runner imports `playwright`, or an explicitly provided
`PLAYWRIGHT_MODULE=/absolute/path/to/existing/playwright/index.mjs`. It requires
`BrowserContext.routeWebSocket`. Missing module/browser/API is an environment gate,
not permission to change dependencies or bypass isolation. No `npx` download is
part of this procedure. An authorized operator must supply any missing tooling.

Do not open an ordinary unguarded browser tab to perform these tests. The runner
creates its request policy before navigation: only GET/HEAD to exactly
`http://127.0.0.1:4321` may proceed. All other requests, including unpkg, map tiles,
production API, conversion endpoints and non-GET form methods are aborted.
WebSockets and service workers are blocked. No production cookie jar or browser
profile is imported. Keep evidence in a fresh `/tmp` directory outside Git.

A blocked production API request must be recorded as a **prevented attempt** and
investigated under P9-04. Stop interaction immediately if one is observed. Do not
turn off interception to make screenshots pass. The capture runner does not
submit forms. The separate interaction runner below uses an intercepted, empty
synthetic fixture for its native-submit test; it aborts the POST before it reaches
a server. Use no personal/patient data.
Do not click payments, external portals, social links or authentication flows.

## Build and loopback preview

From `www`, first terminal:

```bash
node --version
npm --version
TMPDIR=/tmp ASTRO_TELEMETRY_DISABLED=1 npm run build
node --experimental-strip-types tools/audit-phase8.mjs /tmp/aia-phase8-host-static.json
TMPDIR=/tmp ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --host 127.0.0.1 --port 4321
```

Confirm preview says `127.0.0.1:4321`; do not use `--host 0.0.0.0`, a LAN/public
origin, or a hosted preview. The static result must show 122 routes, zero hard
failures and no Arabic homepage. The two inherited heading findings were corrected with retained styling/text;
current generated output has zero heading-review warnings. If the server uses a different port, stop and free the intended
loopback port; do not edit the safety origin casually.

Second host terminal, also from `www`:

```bash
node tools/phase8-browser.mjs /tmp/aia-phase8-host-static.json /tmp/aia-phase8-host-browser-review
node tools/phase8-interactions.mjs /tmp/aia-phase8-host-interactions
```

The output directory must not already exist; choose a new directory on each run.
If Playwright is elsewhere, set `PLAYWRIGHT_MODULE` to its existing module entry.
The runner first loads Spanish privacy, validates title/H1/robots, captures a test
full-page screenshot, and navigates to a second real route. Only after that probe
passes does it run the suite. A transport failure/blank page is not a pass.

Automated observations (now executed with system Chromium; retain fresh output
paths when reproducing):

- 122 desktop route visits at 1440×900, DPR 1; 50 selected routes at 390×844.
- Full-page desktop/mobile captures for those 50 routes, after font readiness and
  scrolling to trigger lazy images. Captures include all sections, not only heroes.
- Twelve Tab observations on Library, Spanish Contact and Arabic author archive
  at each width. These observations do not certify a correct focus sequence.
- A separate JavaScript-disabled context visiting the 50 routes at 390px.
- Sanitized blocked-request records (method/origin/path), runtime-error categories,
  route/title/lang/dir/robots, missing eager images and overflow candidates.

`results.json` can contain unresolved overflow candidates or runtime errors even
if the command exits successfully. Review **every finding**; success only means
the runner completed. Region-level overflow can be intentional. Conversely,
`overflow-x:hidden` can conceal clipping, so a false pageOverflow value is not
proof of proper reflow. Auto-opening service drawers require explicit review;
screenshots are not guaranteed to capture every timed state. CSS/font differences
from this environment must be recorded.

The interaction runner covers keyboard disclosures/search, image Back navigation,
fragments, Arabic region scrolling, no-JS controls, home reflow at 320/390/768/1440,
and the intercepted synthetic form fixture. It reports `pass`, `fail`, and
`review` separately; the native modal/browser-chrome focus boundary still requires
visible-browser and screen-reader review. Failures set a nonzero exit status;
a review item is not an acceptance pass.

## Guarded manual browser checks

For a visible browser plus paused reviewer contexts, use a fresh evidence path:

```bash
PHASE8_MANUAL=1 node tools/phase8-browser.mjs /tmp/aia-phase8-host-static.json /tmp/aia-phase8-host-manual-review
```

After observations, Playwright Inspector pauses three separate contexts:
1440px JavaScript enabled, 390px enabled, and 390px disabled. Review only within
these guarded contexts and navigate only to `http://127.0.0.1:4321` paths.
Resume Inspector after each context to continue. A production API attempt is a
stop condition; retain its sanitized evidence, stop the run and report it.
Do not use Inspector to fill or submit forms. No acceptance is inferred from
resuming the script; enter signed reviewer findings below. Stop preview with
Ctrl-C after review. Preserve only selected non-sensitive screenshots for a later
reviewed checkpoint; do not copy whole browser profiles/traces/caches into Git.

## Reviewer checklist and evidence fields

Use one row per route/state, not one general approval for the whole site:

| Reviewer / role | UTC date | Route / component | Browser, OS, AT versions | Viewport / zoom / JS | Steps | Expected / actual | Pass / fail / not tested | Evidence | Issue / owner |
|---|---|---|---|---|---|---|---|---|---|
| Pending | — | — | — | — | — | — | Not tested | — | — |

Required checks (route population and 50 representatives are in the Phase 8
report and static JSON):

1. At 1440 and 390px, inspect the entire page against qualified source-design
   evidence: header/hero/crops, typography and wrapping, spacing/backgrounds,
   cards, tables, images/captions, CTAs, FAQs, form/map fallback and footer.
   Add 768px where breakpoints need investigation. Record source URL/capture
   timestamp/cache qualification; no insecure TLS fallback or fresh broad crawl.
2. Test skip link, Tab/Shift-Tab reading order, nested desktop menus, mobile menu,
   language menu, Escape, focus visibility/clipping, FAQ Enter/Space, pagination,
   search live results and empty state. Type only nonsensitive example queries
   (meltdowns, refuerzo, التعزيز); confirm locale scoping and Unicode matching.
3. Open/close service drawers, including delayed opening; verify initial focus,
   containment and restoration. Hidden controls must not receive focus. Observe
   states without submitting forms; disabled-button explanations must be understood.
4. On EN/ES Contact and consultation, check every label/option/instruction and
   accessible name. Under blocked external resources, address/telephone fallback
   must remain usable and map failure understandable. Actual third-party map
   loading is **not** covered; separate controlled-resource review is required.
5. At 200% zoom/text resizing, check reflow and visible focus, longer Spanish
   labels, all button/hover/icon/eyebrow contrasts and overflow beyond the bounded
   selectors already fixed. Confirm the corrected DTT/NET and consultation H2 structure remains meaningful.
6. Arabic: reading order, bidi BCBA/LBA, breadcrumbs, tables, list alignment,
   author headings, navigation, alternate-language notices and correct link
   destinations. Do not reinterpret professional/clinical wording during review.
7. `/ar/library/aba-school-readiness-guide`: inspect all three diagrams at desktop
   and 390px. Tab to each named scroll region, use arrow keys, inspect both edges,
   outline, min-width behavior, no page overflow, Arabic text/font fallback and
   concealed English labels. Compare causal arrows with English assets; do not
   reverse sequences by assumption. Fluent Arabic/clinical sign-off is separate.
8. Test `/library/play-leisure-skills` full-size image links and browser Back,
   `/library/behavior-modification-techniques-reinforcement-theory` worksheet,
   `/library/picky-eating-autism-parent-guide` four fragments. Verify AAC and
   EN/ES/AR self-advocacy Halloween references and English-language notices.
9. `/library/page/6` and author page 6: five real cards, previous page works,
   no page 7, correct related titles/links. Sample new articles and all locales.
10. JavaScript disabled: core content, menu/language links, native FAQs, archives,
    images/fragments, contact obfuscation fallback, static disabled-form notices,
    metadata-only employee portal and Arabic regions. Search enhancement limits
    must be understandable; no demand for an unauthorized backend.
11. Real screen reader: record actual AT/browser/OS/version. Check navigation,
    Spanish form instructions, FAQ expanded state, search announcements, table
    headers, Arabic credentials and diagram-region names/alternatives. DOM or
    screenshot inspection is not a substitute. Gate remains Pending until run.

## Acceptance and boundaries

No human reviewer has completed this checklist in the sandbox. Phase 8 is
technically ready for checkpoint review; human acceptance remains pending. Clinical/organizational, fluent Spanish/Arabic, both privacy
policies and trusted Spanish-source comparison, diagram terminology and all
P9-01–P9-10 decisions remain pending. This procedure does not enable hosted
preview, production API isolation implementation, forms, analytics, Ads, redirects,
nginx, DNS, deployment or cutover. Phase 10 operational acceptance is separate.
