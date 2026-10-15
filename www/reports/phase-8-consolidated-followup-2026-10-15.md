# Phase 8 consolidated follow-up — 2026-10-15

**Checkpoint preparation — 2026-10-15:** The [exact checkpoint manifest](phase-8-checkpoint-manifest-2026-10-15.md)
records final revalidation (156 tests, including Library 53), current publication
metrics, preserved release gates and the source-matching **18:21** offline report.
The [badge correction](phase-8-badge-correction-evidence-2026-10-15.json) supersedes
the earlier white-background derivative and its captures/hash. Current Spanish
artwork preserves original geometry/alpha outside the APROBADO lettering.
Earlier browser failures, capture results and file counts below are dated history;
they are not the latest technical state. Checkpoint preparation is now authorized;
no staging, commit, production activation or human approval has occurred.


**PHASE 8 TECHNICALLY READY FOR CHECKPOINT REVIEW**

This is a bounded implementation and Chromium-verification result, not acceptance by AIA, professional translation review, WCAG certification, production authorization, or checkpoint preparation. No staging, commit, deployment, integration activation, handoff update or Phase 9 implementation occurred.

## Verified starting state and scope

Branch `faithful-astro-migration`; HEAD `8e64d322092b1fa6e0f648ddf26a665c80588198`. Index empty. Starting cumulative Phase 8 work: **24 modified tracked files, 22 untracked paths**, including the five protected exclusions. Earlier environment, contrast, responsive, Arabic-label, heading, dialog-verification and test changes were preserved. No unexpected commit or production configuration change appeared.

Read AGENTS.md, MIGRATION_BRIEF.md, AUTONOMOUS-CODEX.md, SESSION_HANDOFF, Phase 7 reconciliation/P9 decision register, Phase 8 acceptance/browser/host reports and existing browser evidence. The user-authorized consolidated follow-up adds three corrections. Earlier verified findings are carried forward with their dated evidence, not repeated or silently relabeled.

`merge-plan.md` and the four excluded October 11–13 reconciliation reports were neither read nor modified/checksummed. `.phase7-stage-paths.nul` was **absent at this follow-up's start**; it was not removed or recreated. No checkpoint staging aid was prepared.

## Correction register

| ID | Classification | Before | Correction and verification |
|---|---|---|---|
| P8-I18N-002 | Phase 7 localization carryover | Spanish homepage omitted the English HSA/FSA section | Added `home.hsaFsa` Spanish heading/body/alt and distinct Spanish artwork. Existing component renders it once, after ESA/before Financial Help. Pass at 320/390/768/1440. English source/artwork byte-identical to HEAD. |
| P8-SEM-003 | Phase 7 structural reconciliation carryover | Spanish privacy combined collection text under Introducción, ten H2s | Inserted Información que recopilamos immediately before the collection lead-in; eleven H2s and four collection items. Wording normalized without the added heading exactly matches HEAD. Fragment and spacing verified at all four widths. |
| P8-VIS-004 | Phase 8 functional/visual defect, major before correction | Tour flattened nine photos, literal arrows and repeated thumbnail images | Structured nine-slide data and reusable progressively enhanced carousel; one active photo/caption, wraparound arrows, operable thumbnails, active state, live announcement, visible focus, stable images and nine-photo no-JS fallback. All four widths and native 200% zoom pass. |
| P8-A11Y-005 | Minor correction during verification | New live announcement initially also visible because no global `sr-only` rule exists | Component-local clipped status style retains accessibility-tree/live-region semantics. Browser verifies 1px visual status box; caption remains visible. |

### Spanish HSA/FSA

`src/content/pages/es/index.md` now uses the optional established `home.hsaFsa` field, without changing schemas, component order, or shared CSS. New heading:

> Cuentas de ahorros para gastos médicos (HSA) y cuentas de gastos flexibles (FSA)

New paragraph, translated from the existing English homepage:

> Muchas familias también pueden utilizar sus cuentas HSA y FSA para financiar la atención, ya que permiten pagar servicios clínicos que reúnen los requisitos con fondos antes de impuestos. Arizona Institute for Autism (AIA) acepta directamente tarjetas de cuentas HSA y FSA, lo que facilita la gestión de los gastos de bolsillo del tratamiento de su hijo o hija. Si participa en una de estas cuentas, ya sea patrocinada por su empleador o individual, puede aplicar fácilmente los fondos disponibles al pago de la matrícula y las cuotas de nuestros programas de ABA.

Alt: `Insignia HSA y FSA con una marca de verificación y la palabra «APROBADO»`.

The original `public/assets/images/hsa-fsa-accepted.png` was inspected before editing and remains unchanged. The separate `hsa-fsa-accepted-es.png` is a 500×425 derivative created with the built-in imagegen text-localization tool, then flattened onto white/resized for delivery using existing ImageMagick. Prompt: change only APPROVED to APROBADO; preserve HSA/FSA, blue checkmark, turquoise badge, dashed border, mint ribbon, white background, tall condensed white type, layout and proportions. Exact prompt/source/output hashes are in the evidence JSON. No other translatable embedded words appeared. HSA/FSA remain established acronyms.

Actual output and desktop/mobile crops were inspected. It preserves the recognizable artwork and composition, but is a generated derivative, not a pixel-identical patch; owner visual and fluent-Spanish acceptance remain pending. The source white-on-mint lettering is retained as artwork, with its meaning in Spanish alt text; do not claim a new comprehensive contrast certification of the source graphic. No new financial promise was introduced. Existing pre-tax/tuition/account-eligibility statements still require organizational/financial approval (P9-06).

### Spanish privacy heading

`src/content/pages/es/privacy-policy.mdx` gains only `## Información que recopilamos` and paragraph separation before `Podemos recopilar los siguientes tipos de información:`. Generated ID: `información-que-recopilamos`. Direct URL fragment `/es/privacy-policy#información-que-recopilamos` resolves correctly. Four existing collection list items follow it. Metadata, dates, links, contact component, introduction and all substantive legal text remain unchanged.

The previous ten-section test is now eleven sections with an explicit collection-list assertion. This correction does **not** authenticate the old Spanish public capture: its cached/prerendered provenance, failed TLS validation and certificate-insecure fallback remain historical limitations. No new privacy retrieval was performed. Trusted-source comparison, fluent-Spanish acceptance and privacy/legal/actual-data-flow approval remain P9-07 requirements.

### Tour source and implementation

Bounded ordinary GET of `https://www.azinstitute4autism.com/tour`, observed **2026-10-15T09:24:15Z**, returned HTTP 200 without redirect and passed normal TLS validation. Robots permits `/tour`. Response: `x-hs-cf-cache-status: HIT`, Last-Modified/prerender **2026-10-03T23:13:15Z**, cache control `s-maxage=36000, max-age=5`. No source scripts were executed. The separately read robots and Tour GETs were public read-only requests; no crawl or insecure fallback. Sanitized source evidence stores gallery HTML-derived content, CSS/script excerpts and body hash, excluding cookie values. This verifies observed public content, not independent fresh-origin parity.

Source confirms a 1000px maximum slideshow, full-aspect primary photos, overlay previous/next controls, caption strip, 80px square thumbnails, active thumbnail and first/last wraparound. All nine local assets match source filenames, alternatives, order and captions:

| Asset under `/assets/images/` | Caption |
|---|---|
| 01-aia-front-entrance.webp | Our Scottsdale Location |
| 02-aia-receptionist-area.webp | Receptionist Area |
| 03-aia-entrance-hallway.webp | Entrance Hallway |
| 04-common-room.webp | Common Room |
| 05-sensory-recreational-room.webp | Sensory-Recreational Room |
| 06-aba-academic-readiness-room-entrance.webp | Academic Readiness Room Entrance |
| 07-aba-academic-readiness-room.webp | Academic Readiness Room |
| 08-aba-academic-readiness-room-reading-corner.webp | Academic Readiness Room Reading Corner |
| 09-aia-art-gallery.webp | Art Gallery |

`tour.md` is replaced completely by `tour.mdx` because it now embeds `ImageCarousel.astro`. There is one `/tour` publication, not duplicate MD/MDX records. `src/data/tour-gallery.json` supplies the nine records. Introduction, amenities, CTA wording and frontmatter remain unchanged. The captured public CTA links to `/client-consultation?hsLang=en`; the flattened record had lost the link. Restored its valid normalized `/client-consultation` destination and verified browser navigation without submitting the form. No dependency added. No new form/integration was introduced.

Intentional accessibility differences from the source: real thumbnail buttons with names/pressed state, dark-blue active border instead of low-contrast orange; visible 3px focus; stronger control/caption backgrounds; caption below the image at widths below 480px so long text cannot obscure the photo; no unnecessary fade/auto-rotation; all nine captioned photos available without JavaScript. Primary image proportions are preserved; only thumbnails use the source square crop. Focus remains on the activated control. ArrowLeft/Right select slides when a carousel button has focus; Enter/Space use native button behavior. All thumbnail buttons are in logical tab order. Only user-triggered changes announce `Photo N of 9: caption`; initial load does not announce.

## Inherited follow-up results retained

The [preceding bounded follow-up](phase-8-browser-verification-2026-10-15.md#bounded-follow-up--2026-10-15) and its [evidence](phase-8-followup-evidence-2026-10-15.json) remain authoritative for unchanged components:

- Arabic likes/views labels, named groups, previous/next/related controls and LTR number isolation render correctly. Labels include `الإعجاب بهذا المقال`, `مشاهدات المقال`, `مشاهدات`, `الإعجابات`, `التنقل بين المقالات`, `المقال السابق`, `المقال التالي`, `مقالات ذات صلة`, `قراءة المقال كاملاً`. English/Spanish behavior unchanged. Entire likes/views script still byte-identical to signed HEAD.
- DTT/NET's three peer section headings and consultation's “Start Here” are H2s with retained H3 styling/IDs/text. These were substantive document-outline decisions, not a claim that a numeric skip alone violates WCAG. Final 122-route static outline review reports zero heading jumps.
- Four native service-dialog scenarios (1440/390, Escape/button close) verified entry, 20 Tab and 20 Shift+Tab sequences, background inertness and focus restoration. BODY/browser-chrome boundary matches the minimal native-dialog control fixture; no application focus escape established. No dialog rewrite. Real visible-browser/screen-reader acceptance remains pending.
- Existing prose/FAQ/fallback/contact/navigation/related-link contrast and focus fixes remain intact. Existing Arabic desktop/mobile diagram checks cover three regions each; keyboard horizontal scroll remains confined, with named focusable regions and adjacent text. No new diagram or article wording edits.
- Earlier seven-route native 200% zoom, 50-route no-JS coverage and 100 representative full-page captures were not blindly rerun. Their dated scope and human-review limits remain explicit.

## New Chromium verification

Environment: existing Playwright **1.61.0**, Chromium **151.0.7922.75**, Node **24.18.0**, npm **11.16.0**, Astro **7.1.5**, Linux/Nix. No package upgrades. Preview bound to `127.0.0.1:4321`. Standard widths 320/390/768/1440, DPR 1; height 844 except 1440×900. Native zoom uses the established temporary local-only extension, confirmed `chrome.tabs.getZoom() === 2`, effective 720 CSS-pixel width and DPR 2; this is not viewport-only/pinch/CSS zoom emulation.

| Coverage | Actual result this pass |
|---|---|
| Generated route/static checks | 122 passed; zero failures/review findings |
| Distinct actual browser routes opened | Five: `/`, `/es`, `/tour`, `/es/privacy-policy`, `/client-consultation` |
| Targeted grouped checks | 21 passed, zero failed |
| Additional computed-contrast/reduced-motion probes | Two viewport probes passed (390/1440) |
| Full-page captures | 20: five each at 320, 390, 768 and 1440 (includes four Tour no-JS captures) |
| Native 200% zoom | Two routes passed; 9 Tour + 17 Spanish privacy overlapping viewport captures |
| Element crops | Four: Spanish HSA/FSA and carousel focus at 390/1440 |
| New final screenshot references/hashes | 50, outside repository |
| No-JS | Tour at four widths: nine photos/captions, inactive enhancement controls hidden |
| Carousel interactions | Four width scenarios, each covering previous/next, wrap, thumbnail, Enter, Space, Left/Right, Tab/Shift+Tab and retained focus |
| New Arabic diagram sessions | Zero; six region checks from previous completed follow-up retained |
| Actual screen-reader sessions | Zero; Pending |
| Human sign-offs | None supplied; Pending |

The earlier cumulative browser evidence covers all 122 routes, 50 representative desktop and 50 mobile captures, 50 no-JS routes and 40 interaction checks; the preceding bounded follow-up additionally passed 30 grouped checks. These are separate runs/populations, not one invented consolidated test count. Tour is already among those 50 no-JS routes; its four new checks do not add four distinct routes.

Images are decoded with a bounded wait. Captures reset scroll to the document top to avoid a Chromium fullPage artifact placing an offscreen fixed skip link into the full-document image. Native-zoom captures use CDP viewport frames with 20% overlap because fullPage clips at tab zoom. First-pass fragment assertion was too strict for subpixel scrolling; it now allows a -1px top rounding tolerance and checks the entire heading remains in viewport. No application scroll behavior was changed to satisfy the test.

Actual screenshot inspection covered the Spanish graphic/section, Tour mobile/desktop/caption/thumb focus, privacy section separation, and zoom output. The source Tour gallery's captured CSS and behavior support the reconstruction. No newly captured full live HubSpot browser page/pixel comparison was performed; dated source qualification and representative-human-review requirements remain open.

Carousel computed controls: normal `rgb(37,64,128)` on 95% white, at least **8.83:1** even composited over black; hover white on source blue. Focus 3px source blue plus white separation. Small-screen controls 44×44; desktop approximately 59×64. Focus geometry stays within the page; no clipping container. Reduced-motion context has no slide animation. No horizontal page overflow at the four widths or actual 200% zoom. The Spanish HSA/FSA heading wraps without clipping and its section appears exactly once in the required position.

## Network isolation

Before every test navigation: reject non-GET/HEAD and every origin except exact loopback; close WebSockets; block website service workers; disable downloads. Synthetic/no personal data only. New targeted run and contrast probe: **zero prohibited requests attempted/blocked**, no runtime errors. Transmitted application requests were only allowed loopback GET/HEAD (individual allowed-request totals were not logged). No production API/stats/likes, forms, advertising/conversion, authentication or payment interactions occurred. Two separate public source GETs (Tour and robots) do not execute a production integration.

Prior map tests blocked Leaflet requests and verified adjacent contact fallback; their blocked attempts are not proof of absence of attempted traffic. Map behavior/provider settings were not changed or reopened. No new contact-page browser session was required by these changes. P9-03/P9-04 remain open: disabled controls and test interception are not a production security boundary; an empty API setting/noindex is not fail-closed isolation.

## Technical validation

Sequential commands from `www`, with `TMPDIR=/tmp ASTRO_TELEMETRY_DISABLED=1`:

| Command | Result |
|---|---|
| `npm run check` | 101 files, zero errors/warnings/hints; repeated by successful builds |
| `npm run test:markdown` | 20 passed |
| `npm run test:publication` | 33 passed |
| `npm run test:seo` | 35 passed |
| `npm run test:library` | 53 passed |
| `npm run test:routes` | 10 passed |
| `node --test tools/phase8.test.mjs` | 5 passed |
| Total regression tests | **156 passed** |
| `npm run build` | Passed, 122 routes |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | Passed, 122 routes |
| `npm run audit:links` | Zero broken internal links |
| `npm run audit:images` | Zero missing mapped page images; browser additionally verified new gallery/HSA assets |
| `npm run audit:blog` | Zero failures |
| Guarded consolidated Playwright runner | 21/21 grouped checks passed |
| Final `npm run build` | Normal staging restored, 122 routes |
| `git diff --check` / runner syntax | Passed |

Two initial SEO failures were corrected in tests: obsolete English-only HSA assertions, then a real fixture alias problem where gray-matter's cached Spanish data was mutated by the legacy no-HSA build. Clone fixture data before mutation; keep absent-section compatibility coverage. Library tests now assert eleven privacy H2s/four collection items, locale-specific HSA placement/assets, and the complete Tour static inventory/semantics. No publication flags were manipulated.

### Publication invariants

| Metric | Before → after |
|---|---:|
| HTML / unique canonicals | 122 → 122 / 122 → 122 |
| Indexing sitemap | 108 → 108 |
| Hreflang / participating routes | 180 → 180 / 55 → 55 |
| Validated translation sets | 25 → 25 |
| Library articles and search EN/ES/AR | 74 → 74; 55/12/7 unchanged |
| Author archives / redirects | 9 → 9 / 9 → 9 |
| Library FAQ answers/articles | 182/30 unchanged |
| Staging robots | 122 `noindex,nofollow` |
| Staging sitemap / hreflang | 0 / 0 |

Raw all-site FAQ schema counting yields 254/32 because it includes two non-Library FAQ pages. The accepted 182/30 metric is Library-only; this is a population distinction, not a regression. Canonicals, external syndicated exceptions, author noindex/sitemap/hreflang exclusions, pagination, search, translation keys, `/ar` draft status and redirect definitions remain unchanged.

New schema-2 offline evidence: [route-reconciliation-2026-10-15-offline-17-41-40-404Z.json](route-reconciliation-2026-10-15-offline-17-41-40-404Z.json), explicitly generated from the new intermediate `17-31-09-013Z` report, which reused the preceding `06-41-27-766Z` evidence, retaining 70 historical requests and 133 dispositions/122 local routes. No crawl. Explicit read-only `--check --evidence` passed. Fingerprint: `66884f2b8b3af2e1eaa7f8e3dc21ebceaa97a62650c695fd5508e6b003133c6d`. Old reports including `05-28-09-425Z`, `06-41-27-766Z` and this pass’s intermediate `17-31-09-013Z` are preserved. The latter became superseded when the source-supported Tour CTA link was restored; only `17-41-40-404Z` matches the final application.

## Exact incremental files

Paths below are relative to `www/`; all earlier Phase 8 paths remain preserved.

| File | Change |
|---|---|
| `src/content/pages/es/index.md` | Add Spanish HSA/FSA frontmatter |
| `public/assets/images/hsa-fsa-accepted-es.png` | Add localized badge; original unchanged |
| `src/content/pages/es/privacy-policy.mdx` | Add collection H2/paragraph separation only |
| `src/content/pages/en/tour.md` → `tour.mdx` | Intended MDX replacement, remove duplicated flattened gallery, embed carousel, restore source CTA link |
| `src/components/ImageCarousel.astro` | New accessible progressively enhanced component |
| `src/data/tour-gallery.json` | Nine source-backed ordered records |
| `tools/library.test.mjs` | Updated privacy coverage; two new HSA/Tour rendered tests |
| `tools/seo.test.mjs` | Updated HSA expectations; isolate cached fixture data |
| `tools/phase8-consolidated.mjs` | New guarded targeted Chromium runner, reusing established procedure |
| `reports/phase-8-consolidated-source-evidence-2026-10-15.json` | Sanitized Tour source evidence |
| `reports/phase-8-consolidated-evidence-2026-10-15.json` | Browser/static/invariance/count evidence, hashes and qualifications |
| `reports/phase-8-consolidated-followup-2026-10-15.md` | This report |
| `reports/route-reconciliation-2026-10-15-offline-17-31-09-013Z.json` | Preserved intermediate before Tour CTA restoration; superseded |
| `reports/route-reconciliation-2026-10-15-offline-17-41-40-404Z.json` | Final source-matching offline reconciliation |
| `reports/phase-8-visual-accessibility-acceptance-2026-10-14.md` | Dated continuation notice |
| `reports/phase-8-browser-verification-2026-10-15.md` | Dated continuation, preserving older evidence |
| `reports/accessibility-audit.md` | Bounded findings/results update |
| `reports/migration-summary.md` | Phase 8 consolidated implementation note |

No change to SESSION_HANDOFF.md, Phase 9 decision register, English homepage/content/image, API script, shared forms, hosting, package manifest/lock or publication implementation in this pass.

## Evidence and reproducibility

- [Consolidated evidence JSON](phase-8-consolidated-evidence-2026-10-15.json): 50 final screenshots with SHA-256, prior relevant captures, application fingerprint, source metadata and actual test results.
- [Source evidence](phase-8-consolidated-source-evidence-2026-10-15.json): Tour content/design evidence; cached-source qualification.
- `/tmp/aia-p8-consolidated/browser-complete/`: final 20 full-page + 26 native-zoom frames, results and temporary zoom helper/profile.
- `/tmp/aia-p8-consolidated/contrast-probe.json`, `contrast-probe.mjs`, `hsa-es-*.png`, `carousel-focus-*.png`: two additional actual-style/reduced-motion probes and four crops.
- `/tmp/aia-p8-consolidated/validation/`: command logs and mode counts.
- `browser-1`/`browser-final` under the same temporary root retain intermediate findings; final screenshot references point to `browser-complete` only.

With the existing system Chromium adapter (or configured browser-shell Playwright module), from `www`, first build normal staging and start `npm run preview -- --host 127.0.0.1 --port 4321`. Then:

```sh
PLAYWRIGHT_MODULE=/tmp/aia-playwright-system-chromium.mjs TMPDIR=/tmp \
  node tools/phase8-consolidated.mjs /tmp/aia-p8-consolidated-new-run
TMPDIR=/tmp node --experimental-strip-types tools/audit-phase8.mjs /tmp/aia-p8-static-new.json
npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-15-offline-17-41-40-404Z.json
```

The adapter is environment-specific, uses the existing Playwright package and system Chromium, not a dependency to commit. The tool refuses existing evidence directories and keeps artifacts outside Git. Temporary artifacts can expire; preserve selected reviewed evidence separately before cleanup, not indiscriminately in a checkpoint.

## Remaining issues and acceptance

No known material technical blocker remains in this bounded implementation. Informational/acceptance limits are not reported as passes:

| Item | Severity/status | Owner / next action |
|---|---|---|
| Current full-page HubSpot visual equality | Source uncertainty / Pending | Design/content owner compare dated source and changed pages; no current public pixel-parity claim |
| Spanish HSA wording/artwork/financial claims | Human review required | Fluent Spanish + AIA financial/organizational owner |
| Spanish privacy authenticity and legal claims | Human review required | Trusted-source comparison + fluent Spanish + privacy/legal owner, P9-07 |
| Screen-reader announcements, modal/browser boundary and RTL | Pending actual AT | Accessibility reviewer run named screen reader/browser/OS session |
| Arabic controls, clinical wording, diagrams, professional-role terminology | Pending fluent/clinical acceptance | Arabic and clinical/organizational reviewers |
| Non-Chromium behavior and authorized visual acceptance | Pending | Reviewer at desktop/mobile/200% zoom; no Safari/Firefox claim |
| Live map with permitted external resources | Pending controlled acceptance | Accessibility/privacy reviewer; address fallback already verified under blocking |

Reviewer checklist: both homepages at 320/390/768/1440 (Spanish section order, APROBADO, text/alt); privacy fragment and eleven sections; Tour all nine photos/captions, arrows/wrap/thumbnails, keyboard focus and live announcements; reduced-motion/no-JS fallback; 200% zoom; inherited Arabic diagram/label and native-dialog checks with real assistive technology. Record reviewer, date, browser/OS/device, result and evidence. No sign-offs were invented.

P9-01 landing pages, P9-02 portal, P9-03 forms/API, P9-04 likes/views, P9-05 analytics/consent/ads, P9-06 clinical/organizational claims, P9-07 policies/trusted source, P9-08 author SEO, P9-09 hosting/rollback, P9-10 launch authorization all remain **Pending decision**. Phase 10 QA/cutover authorization remains separate. No checkpoint or next-phase implementation has begun.

## Final working-tree inventory

Cumulative Phase 8 state: 27 modified tracked files, 1 intended tracked deletion, 32 untracked files; index empty. This includes earlier Phase 8 work, all five protected exclusions, and preserved intermediate evidence. No checkpoint manifest prepared.

`git status --short --untracked-files=all`:

```text
 M AUTONOMOUS-CODEX.md
 M flake.nix
 M www/README.md
 M www/reports/accessibility-audit.md
 M www/reports/migration-summary.md
 M www/src/components/BlogCard.astro
 M www/src/components/BlogPostFooter.astro
 M www/src/components/ContactForm.astro
 M www/src/components/FAQAccordion.astro
 M www/src/components/LanguageSwitcher.astro
 M www/src/components/LikeViewCounter.astro
 M www/src/components/MainNav.astro
 M www/src/components/MobileNav.astro
 M www/src/components/home/HomeDirector.astro
 M www/src/components/pages/ContactPage.astro
 M www/src/content/blog/en/aba-therapy-dtt-net-guide.md
 M www/src/content/pages/en/schedule-consultation.mdx
 D www/src/content/pages/en/tour.md
 M www/src/content/pages/es/index.md
 M www/src/content/pages/es/privacy-policy.mdx
 M www/src/layouts/BlogPostLayout.astro
 M www/src/styles/blog.css
 M www/src/styles/components.css
 M www/src/styles/forms.css
 M www/src/styles/layout.css
 M www/src/styles/typography.css
 M www/tools/library.test.mjs
 M www/tools/seo.test.mjs
?? merge-plan.md
?? www/public/assets/images/hsa-fsa-accepted-es.png
?? www/reports/phase-8-browser-evidence-2026-10-15.json
?? www/reports/phase-8-browser-verification-2026-10-15.md
?? www/reports/phase-8-consolidated-evidence-2026-10-15.json
?? www/reports/phase-8-consolidated-followup-2026-10-15.md
?? www/reports/phase-8-consolidated-source-evidence-2026-10-15.json
?? www/reports/phase-8-followup-evidence-2026-10-15.json
?? www/reports/phase-8-host-browser-verification-2026-10-14.md
?? www/reports/phase-8-static-evidence-2026-10-14.json
?? www/reports/phase-8-visual-accessibility-acceptance-2026-10-14.md
?? www/reports/route-reconciliation-2026-10-11-offline.json
?? www/reports/route-reconciliation-2026-10-12-offline.json
?? www/reports/route-reconciliation-2026-10-13-offline-06-16-06-857Z.json
?? www/reports/route-reconciliation-2026-10-13-offline.json
?? www/reports/route-reconciliation-2026-10-14-offline-07-32-07-044Z.json
?? www/reports/route-reconciliation-2026-10-15-offline-05-28-09-425Z.json
?? www/reports/route-reconciliation-2026-10-15-offline-06-41-27-766Z.json
?? www/reports/route-reconciliation-2026-10-15-offline-17-31-09-013Z.json
?? www/reports/route-reconciliation-2026-10-15-offline-17-41-40-404Z.json
?? www/reports/route-reconciliation-2026-10-15-offline.json
?? www/src/components/ImageCarousel.astro
?? www/src/content/pages/en/tour.mdx
?? www/src/data/tour-gallery.json
?? www/src/utils/article-messages.ts
?? www/tools/audit-phase8.mjs
?? www/tools/phase8-browser.mjs
?? www/tools/phase8-consolidated.mjs
?? www/tools/phase8-followup.mjs
?? www/tools/phase8-interactions.mjs
?? www/tools/phase8.test.mjs
?? www/tools/playwright-smoke.mjs
```

`git diff --stat --no-renames` (does not include untracked additions):

```text
 AUTONOMOUS-CODEX.md                                |  29 +++
 flake.nix                                          |  38 +++-
 www/README.md                                      |  34 +++
 www/reports/accessibility-audit.md                 | 142 ++++++++++++
 www/reports/migration-summary.md                   | 253 +++++++++++++++++++++
 www/src/components/BlogCard.astro                  |   4 +-
 www/src/components/BlogPostFooter.astro            |  22 +-
 www/src/components/ContactForm.astro               |   6 +
 www/src/components/FAQAccordion.astro              |   6 +-
 www/src/components/LanguageSwitcher.astro          |   4 +-
 www/src/components/LikeViewCounter.astro           |  13 +-
 www/src/components/MainNav.astro                   |   4 +-
 www/src/components/MobileNav.astro                 |   2 +-
 www/src/components/home/HomeDirector.astro         |   5 +
 www/src/components/pages/ContactPage.astro         |   6 +
 .../content/blog/en/aba-therapy-dtt-net-guide.md   |   6 +-
 www/src/content/pages/en/schedule-consultation.mdx |   2 +-
 www/src/content/pages/en/tour.md                   | 104 ---------
 www/src/content/pages/es/index.md                  |   7 +
 www/src/content/pages/es/privacy-policy.mdx        |   6 +-
 www/src/layouts/BlogPostLayout.astro               |   6 +-
 www/src/styles/blog.css                            |   7 +-
 www/src/styles/components.css                      |   2 +
 www/src/styles/forms.css                           |   1 +
 www/src/styles/layout.css                          |   4 +-
 www/src/styles/typography.css                      |   4 +-
 www/tools/library.test.mjs                         |  82 ++++++-
 www/tools/seo.test.mjs                             |  15 +-
 28 files changed, 661 insertions(+), 153 deletions(-)
```

`git diff --cached --name-only`: empty. `git diff --check`: pass. Protected exclusions untouched; SESSION_HANDOFF.md unchanged.


### 2026-10-15 — Spanish HSA/FSA badge transparency and geometry correction

User review identified an opaque white background and badge shrinkage/position drift in the initial Spanish derivative. The earlier full-image generation and white-background export were not faithful enough. This finding supersedes the Spanish badge visual-fidelity claim and image hash in the consolidated evidence; historical captures remain unchanged.

Replaced only `public/assets/images/hsa-fsa-accepted-es.png`. Built-in imagegen supplied APROBADO lettering; ImageMagick compositing retained the original English artwork and alpha outside that lettering. Both images are 500×425 RGBA. Alpha comparison: **zero differing pixels**. All changed color pixels are confined to a 192×42 lettering rectangle at x154/y188. The English source image remains byte-identical to HEAD. No layout, content, metadata, or publication changes.

Chromium 151.0.7922.75: **8/8 targeted checks pass**, EN and ES at 320/390/768/1440px, matching rendered image dimensions, one section per page, Spanish alt text, no page overflow. Eight section screenshots with SHA-256 hashes are recorded in [badge evidence](phase-8-badge-correction-evidence-2026-10-15.json), with temporary images in `/tmp/aia-p8-badge-fix`; Spanish mobile and desktop captures visually inspected. Loopback GET/HEAD-only guard, service workers blocked, WebSockets denied: zero blocked external/API requests and no production interactions.

Normal build, link audit (0 broken), image audit (0 missing mapped), and explicit offline consistency check pass. Current source-matching artifact: [18:21 offline reconciliation](route-reconciliation-2026-10-15-offline-18-21-22-820Z.json), reusing 70 historical requests with no new crawl. Final staging output: 122 noindex,nofollow pages, empty sitemap, zero hreflang. Full previous regression suite was not repeated for this asset-only correction. Fluent-Spanish/financial-claims acceptance and all existing Phase 9 gates remain pending. No staging, commit, deployment, or handoff update.
