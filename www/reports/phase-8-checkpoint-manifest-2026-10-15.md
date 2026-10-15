# Phase 8 checkpoint manifest and final validation — 2026-10-15 UTC

**READY FOR USER-SIGNED PHASE 8 COMMIT**

Technical checkpoint preparation only. No human accessibility, language, financial,
clinical, legal/privacy or production approval is asserted. All P9-01–P9-10 remain
Pending decision. No staging, signing, push, deployment or integration activation
was performed. This document is the exact path authority for user staging.

## Starting state and inventory reconciliation

Branch `faithful-astro-migration`; HEAD `8e64d322092b1fa6e0f648ddf26a665c80588198`.
Index empty. No loopback preview process remained; the user's ordinary Chromium
and MCP service were not disturbed. No old Phase 7 staging aid exists.

Actual starting inventory: **27 modified tracked + 1 tracked deletion + 34 untracked
= 62 paths**, including the five protected exclusions. Thus **57 intended Phase 8
paths**, not the earlier 55 estimate. The two additions since that estimate are
`phase-8-badge-correction-evidence-2026-10-15.json` and the `18-21-22-820Z` offline
report. They document the subsequently authorized badge correction. No unexplained
path or commit appeared. Preparing the handoff and this manifest adds two paths:
**59 approved = 28 modified + 1 deleted + 30 added** (rename detection disabled).
The temporary staging aid is a 60th non-checkpoint working path, not an addition
to the approved set. With exclusions and aid, final status contains 65 paths.

Only documentation changed during this preparation. Application, tooling, test,
asset and historical JSON evidence bytes remain unchanged from preparation start.
All original Phase 8 changes were retained. No protected contents were inspected,
hashed or modified. Earlier Phase 8 route reports are included as historical
implementation evidence; only the 18:21 artifact matches the current source.
The four specifically excluded October 11–13 reports remain outside this scope.

## Reviewed cumulative implementation

- Contrast and persistent underlines for prose/FAQ/contact/form links; focus for
  navigation, language menu, skip link, cards, byline and Arabic diagram regions.
- Source-layout-preserving director-grid correction at 320px.
- Explicit Arabic article UI messages and number/title bidi isolation; existing
  English/Spanish behavior and the likes/views script are unchanged.
- DTT/NET peer H2 sections and consultation Start Here H2, with original words,
  fragments and H3 visual size. No numerical-skip-only WCAG conclusion.
- Native service dialogs preserved. Four Chromium scenarios and a minimal native
  control reproduced the browser-chrome boundary without application background
  focus escape; visible-browser/real-AT acceptance remains open.
- Spanish HSA/FSA localization carryover, one section after ESA/before Financial
  Help. APROBADO asset is 500×425 RGBA, identical alpha to original and identical
  color pixels outside its 192×42 lettering rectangle at (154,188). Original EN
  homepage/image remain byte-identical to HEAD. Financial/fluent review pending.
- Spanish privacy collection heading restored: eleven H2s and four list items.
  Removing the added heading/whitespace reproduces the previous policy exactly;
  date, frontmatter, links, contact and legal wording are preserved.
- Complete Tour `.md` → `.mdx` pair below: one route, identical metadata, nine
  ordered source photos/captions, controls/thumbnails, focus, restrained live
  announcements, no rotation/animation, full no-JS fallback, consultation CTA.
- Existing optional local browser environment, guarded browser scripts, focused
  tests and evidence are included. No package upgrade, new production API,
  backend, advertising, publication-policy or hosting change.

## Evidence reviewed without repeating completed browser runs

| Evidence population | Recorded result | Checkpoint evidence check |
|---|---|---|
| Initial system Chromium run | 122 unique routes, 50 desktop + 50 mobile full-page captures, 50 no-JS routes, 40 passing interactions + one native-dialog review | 100 representative capture hashes present and matching |
| Bounded follow-up | 30 grouped checks, four native-dialog scenarios, seven actual-200%-zoom routes, Arabic diagram checks | All 194 referenced capture hashes match; includes historical/superseded zoom frames |
| Consolidated follow-up | Five distinct routes, 21 grouped checks, two contrast/reduced-motion probes, 20 full-page captures, two 200%-zoom routes/26 overlapping frames, four element crops | All 50 referenced hashes match |
| Badge correction | EN/ES at 320/390/768/1440, eight passing checks and eight section captures | All eight hashes match; current asset hash matches |
| Real screen reader / authorized reviewer sign-off | Zero sessions / no sign-offs supplied | Pending; not inferred from automation |

Playwright 1.61.0 / Chromium 151.0.7922.75, DPR 1 except documented native zoom.
Counts are separate runs/populations, not additive unique routes or human approvals.
Screenshots remain under their recorded `/tmp` paths, outside Git; they are
available now but not guaranteed durable. No capture was recreated to satisfy a
reference. Source evidence and summaries, not browser profiles/cookies, are included.

Network guards allowed exact loopback GET/HEAD only, denied external origins,
WebSockets and website service workers. Earlier map requests and the isolated
synthetic fixture POST were blocked and recorded as attempts. No production
API/like/form/advertising/authentication interaction was transmitted. No new
browser session or public retrieval was needed for checkpoint preparation.

Tour public evidence: ordinary TLS validation succeeded, HTTP 200, cache HIT with
October 3 prerender observed October 15. Spanish privacy: cache-qualified capture
after failed TLS validation and certificate-insecure fallback. Neither proves
current origin freshness; Spanish additionally lacks authenticated provenance.
Trusted Spanish-source comparison, legal/privacy and fluent review remain mandatory.
No insecure retrieval or new production crawl was performed.

## Final validation (sequential, October 15)

Environment: Node 24.18.0, npm 11.16.0, Astro 7.1.5, Linux/Nix.
`TMPDIR=/tmp ASTRO_TELEMETRY_DISABLED=1` used for the established environment;
no application workaround or dependency change. Logs: `/tmp/aia-p8-checkpoint/`.

| Command from www | Actual result |
|---|---|
| `npm run check` | 101 files, 0 errors/warnings/hints |
| `npm run test:markdown` | 20 pass, 0 fail |
| `npm run test:publication` | 33 pass, 0 fail |
| `npm run test:seo` | 35 pass, 0 fail |
| `npm run test:library` | **53 pass, 0 fail** |
| `npm run test:routes` | 10 pass, 0 fail |
| `node --test tools/phase8.test.mjs` | 5 pass, 0 fail |
| Regression total | **156 pass, 0 fail** |
| `npm run build` | Pass, 122 routes |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Pass, 122 routes |
| `npm run audit:links` | 0 broken internal links |
| `npm run audit:images` | 0 missing mapped images |
| `npm run audit:blog` | 0 content audit failures |
| Final `npm run build` (normal staging) | Pass, 122 routes, last completed build |
| `node --experimental-strip-types tools/audit-phase8.mjs /tmp/aia-p8-checkpoint/static.json` | 122 routes, 0 failures/review findings |
| Explicit offline consistency check (below) | Pass, no network/writes |
| `git diff --check` | Pass |

No unexpected validation failure or source correction was required in this pass.
Library coverage directly checks HSA section order/assets, eleven privacy headings,
collection list, Arabic names/bidi, Tour inventory/one route and semantic headings.
Content comparison confirms unchanged privacy wording, Tour metadata and original
EN homepage/artwork; API script, redirects and P9 register are byte-identical to HEAD.

| Invariant | Signed Phase 7 → final Phase 8 |
|---|---|
| HTML / unique canonicals | 122/122 → 122/122 |
| Indexing sitemap | 108 → 108 |
| Hreflang links / routes | 180/55 → 180/55 |
| Validated translation sets | 25 → 25 |
| Library / locale search records | 74; 55/12/7 → unchanged |
| Author archives / redirect definitions | 9/9 → 9/9 |
| Library visible/schema FAQ answers / articles | 182/30 → 182/30 |
| Both English page-6 routes | Five cards each |
| Tour / Arabic homepage | One Tour; Arabic home unpublished |
| Final staging | 122 noindex,nofollow; sitemap 0; hreflang 0 |

Raw all-site FAQ totals include non-Library pages and are not the Library 182/30
metric. Syndicated canonicals, noindex author archives, metadata-only search,
translation graph, pagination and original publication dates remain intact.

Final explicit source-matching evidence:
`route-reconciliation-2026-10-15-offline-18-21-22-820Z.json`.
Fingerprint: `8453ffad597e2f2414343b634997bf204cbdd59fc00c3d8d122babef8a632cb5`.
Schema 2, 133 dispositions, 70 historical requests, 122 local routes. Historical
production sitemap 102 is not the current indexing-enabled sitemap 108.
After the final staging build:

```sh
npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-15-offline-18-21-22-820Z.json
```

Passed; no redundant report generated for documentation-only changes.

## Handoff and documentation disposition

`SESSION_HANDOFF.md` identifies Phase 8 as technically completed for checkpoint
purposes, signed Phase 7 as the previous checkpoint, and the future checkpoint as
the commit containing the update (no invented SHA). It preserves Phase 6C/7 history,
source qualifications, final metrics and all release gates. Next: Phase 9 decision
review/evidence gathering; no automatic integration implementation. Phase 10
retains final QA, rollback and cutover authorization.

Dated current-status pointers were added to Phase 8 acceptance, browser,
consolidated and accessibility reports; migration-summary gains current orientation
and this preparation record. Historical failures, original file/test counts and
badge-generation evidence were retained. Host-browser instructions now acknowledge
corrected headings and technical readiness while keeping human review pending.
No historical JSON/source evidence was overwritten.

## Exact approved paths

M = modified tracked; D = tracked deletion; A = currently untracked addition.
Each row is a literal repository-relative Git path. This table is machine-readable
by the verification procedure below. The two Tour paths deliberately count separately.

| Status | Path |
|---|---|
| M | `AUTONOMOUS-CODEX.md` |
| M | `flake.nix` |
| M | `www/README.md` |
| A | `www/public/assets/images/hsa-fsa-accepted-es.png` |
| M | `www/reports/SESSION_HANDOFF.md` |
| M | `www/reports/accessibility-audit.md` |
| M | `www/reports/migration-summary.md` |
| A | `www/reports/phase-8-badge-correction-evidence-2026-10-15.json` |
| A | `www/reports/phase-8-browser-evidence-2026-10-15.json` |
| A | `www/reports/phase-8-browser-verification-2026-10-15.md` |
| A | `www/reports/phase-8-checkpoint-manifest-2026-10-15.md` |
| A | `www/reports/phase-8-consolidated-evidence-2026-10-15.json` |
| A | `www/reports/phase-8-consolidated-followup-2026-10-15.md` |
| A | `www/reports/phase-8-consolidated-source-evidence-2026-10-15.json` |
| A | `www/reports/phase-8-followup-evidence-2026-10-15.json` |
| A | `www/reports/phase-8-host-browser-verification-2026-10-14.md` |
| A | `www/reports/phase-8-static-evidence-2026-10-14.json` |
| A | `www/reports/phase-8-visual-accessibility-acceptance-2026-10-14.md` |
| A | `www/reports/route-reconciliation-2026-10-14-offline-07-32-07-044Z.json` |
| A | `www/reports/route-reconciliation-2026-10-15-offline-05-28-09-425Z.json` |
| A | `www/reports/route-reconciliation-2026-10-15-offline-06-41-27-766Z.json` |
| A | `www/reports/route-reconciliation-2026-10-15-offline-17-31-09-013Z.json` |
| A | `www/reports/route-reconciliation-2026-10-15-offline-17-41-40-404Z.json` |
| A | `www/reports/route-reconciliation-2026-10-15-offline-18-21-22-820Z.json` |
| A | `www/reports/route-reconciliation-2026-10-15-offline.json` |
| M | `www/src/components/BlogCard.astro` |
| M | `www/src/components/BlogPostFooter.astro` |
| M | `www/src/components/ContactForm.astro` |
| M | `www/src/components/FAQAccordion.astro` |
| A | `www/src/components/ImageCarousel.astro` |
| M | `www/src/components/LanguageSwitcher.astro` |
| M | `www/src/components/LikeViewCounter.astro` |
| M | `www/src/components/MainNav.astro` |
| M | `www/src/components/MobileNav.astro` |
| M | `www/src/components/home/HomeDirector.astro` |
| M | `www/src/components/pages/ContactPage.astro` |
| M | `www/src/content/blog/en/aba-therapy-dtt-net-guide.md` |
| M | `www/src/content/pages/en/schedule-consultation.mdx` |
| D | `www/src/content/pages/en/tour.md` |
| A | `www/src/content/pages/en/tour.mdx` |
| M | `www/src/content/pages/es/index.md` |
| M | `www/src/content/pages/es/privacy-policy.mdx` |
| A | `www/src/data/tour-gallery.json` |
| M | `www/src/layouts/BlogPostLayout.astro` |
| M | `www/src/styles/blog.css` |
| M | `www/src/styles/components.css` |
| M | `www/src/styles/forms.css` |
| M | `www/src/styles/layout.css` |
| M | `www/src/styles/typography.css` |
| A | `www/src/utils/article-messages.ts` |
| A | `www/tools/audit-phase8.mjs` |
| M | `www/tools/library.test.mjs` |
| A | `www/tools/phase8-browser.mjs` |
| A | `www/tools/phase8-consolidated.mjs` |
| A | `www/tools/phase8-followup.mjs` |
| A | `www/tools/phase8-interactions.mjs` |
| A | `www/tools/phase8.test.mjs` |
| A | `www/tools/playwright-smoke.mjs` |
| M | `www/tools/seo.test.mjs` |

## Exact exclusions and local-only artifacts

Never inspect, stage or delete the five protected/excluded files:

- `merge-plan.md`
- `www/reports/route-reconciliation-2026-10-11-offline.json`
- `www/reports/route-reconciliation-2026-10-12-offline.json`
- `www/reports/route-reconciliation-2026-10-13-offline.json`
- `www/reports/route-reconciliation-2026-10-13-offline-06-16-06-857Z.json`

`.phase8-stage-paths.nul` is a sixth excluded working file created solely as the
user's temporary staging aid. It contains 59 unique NUL-separated entries, each
prefixed `:(top,literal)`, exactly matching the table. It excludes itself. The old
`.phase7-stage-paths.nul` is absent. No dist, caches, profiles, private environment
files, patient data or unrelated paths are approved. All five original exclusions
remain untouched and untracked. Index remains empty.

## User-controlled staging and signing

From the repository root, first verify branch/HEAD/status and an empty index:

```sh
git branch --show-current
git rev-parse HEAD
git status --short --untracked-files=all
git diff --cached --name-only
```

Expected branch `faithful-astro-migration`, HEAD
`8e64d322092b1fa6e0f648ddf26a665c80588198`. Stop on any unexplained change.

```sh
git add --pathspec-from-file=.phase8-stage-paths.nul --pathspec-file-nul
git diff --cached --check
git diff --cached --stat --no-renames
git diff --cached --name-status --no-renames
```

Verify exact membership and change types, not just a count:

```sh
python3 - <<'PYVERIFY'
from pathlib import Path
import re, subprocess
rows = re.findall(r'^\| ([AMD]) \| `([^`]+)` \|$', Path('www/reports/phase-8-checkpoint-manifest-2026-10-15.md').read_text(), re.M)
expected = {p: s for s, p in rows}
raw = Path('.phase8-stage-paths.nul').read_bytes().split(b'\0')
assert raw.pop() == b''
prefix = b':(top,literal)'
assert all(x.startswith(prefix) for x in raw)
aid = [x[len(prefix):].decode() for x in raw]
assert len(rows) == len(expected) == len(aid) == len(set(aid)) == 59
assert set(aid) == set(expected)
parts = subprocess.check_output(['git','diff','--cached','--name-status','--no-renames','-z']).decode().split('\0')
assert parts.pop() == ''
staged = dict(zip(parts[1::2], parts[0::2]))
assert staged == expected, {'missing': sorted(set(expected)-set(staged)), 'extra': sorted(set(staged)-set(expected)), 'wrong_status': [p for p in expected.keys() & staged.keys() if expected[p] != staged[p]]}
print('Exact 59-path staged manifest, change types and literal staging aid match.')
PYVERIFY
```

Only after reviewing the diff and successful membership validation, run in the
normal host terminal (Codex does not run these commands):

```sh
git commit -S -m "fix(a11y): reconcile responsive layouts and multilingual UI"
git log -1 --show-signature
git verify-commit HEAD
git rev-parse HEAD HEAD^
git show --format= --name-status --no-renames HEAD
git status --short --untracked-files=all
```

The new parent must be `8e64d322092b1fa6e0f648ddf26a665c80588198`.
Confirm 59 committed paths with renames disabled and no unexpected tracked changes.
Expected remaining untracked paths: five exclusions plus the temporary staging aid.
The user may remove only the aid after verifying the commit. Do not push automatically,
amend to insert the SHA, or alter signing configuration to bypass a signing failure.

## Remaining acceptance and next session

Pending: real screen reader, authorized full-page visual/source comparison,
non-Chromium acceptance, fluent Spanish/Arabic (including controls/credentials),
Arabic diagram clinical/language acceptance, HSA/FSA financial claims, general
clinical/organizational/program eligibility, both policies' privacy/legal approval,
and authenticated Spanish-policy comparison. Recorded browser checks are not sign-off.

P9-01 landing-page ownership; P9-02 portal security; P9-03 forms/API/privacy;
P9-04 likes/views isolation; P9-05 analytics/consent/advertising; P9-06 clinical and
organizational claims; P9-07 policies/provenance; P9-08 author SEO; P9-09 hosting,
TLS/routes/rollback; P9-10 production go/no-go: **all Pending decision**.

Phase 9 kickoff: verify the actual user-reported signed Phase 8 commit on
`faithful-astro-migration`; read policy, handoff, this manifest and decision register;
review P9-01–10 with supporting evidence, owner roles, dependencies and explicit
acceptance criteria. Gather decisions, do not infer approvals or implement unresolved
integrations. Preserve exclusions, human gates and Phase 10 cutover responsibilities.
No staging, signing, push, deployment, live configuration or integration activation.
