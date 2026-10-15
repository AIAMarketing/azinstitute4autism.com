# Phase 8 visual and accessibility verification — 2026-10-14

**Checkpoint preparation — 2026-10-15:** The [exact checkpoint manifest](phase-8-checkpoint-manifest-2026-10-15.md)
records final revalidation (156 tests, including Library 53), current publication
metrics, preserved release gates and the source-matching **18:21** offline report.
The [badge correction](phase-8-badge-correction-evidence-2026-10-15.json) supersedes
the earlier white-background derivative and its captures/hash. Current Spanish
artwork preserves original geometry/alpha outside the APROBADO lettering.
Earlier browser failures, capture results and file counts below are dated history;
they are not the latest technical state. Checkpoint preparation is now authorized;
no staging, commit, production activation or human approval has occurred.


**Consolidated continuation — 2026-10-15:** [Consolidated follow-up](phase-8-consolidated-followup-2026-10-15.md)
records the Spanish HSA/FSA localization carryover, Spanish privacy collection-heading
carryover, and Tour carousel correction. Final validation: 156 regression tests,
21 targeted Chromium checks plus two computed-contrast probes, 122-route static
smoke, 50 new hashed screenshot references, unchanged publication counts and
restored staging safeguards. **PHASE 8 TECHNICALLY READY FOR CHECKPOINT REVIEW**;
all human-review/Phase 9 gates remain open. Historical results below are preserved.

**Follow-up disposition (2026-10-15): PHASE 8 TECHNICALLY READY FOR CHECKPOINT REVIEW.**
The [bounded follow-up](phase-8-browser-verification-2026-10-15.md#bounded-follow-up--2026-10-15)
closes the actionable Arabic-label, heading and contrast findings; documents
native-dialog behavior and real 200% zoom; and records 154 regression tests and
30 focused browser checks passing. This is not human acceptance or permission
to prepare the checkpoint. Historical observations below remain unchanged.

**Dated continuation:** [2026-10-15 browser verification](phase-8-browser-verification-2026-10-15.md)
now records successful system-Chromium execution and further bounded fixes.
The browser-unavailable observations below remain the historical October 14
attempt, not the latest browser status. Human acceptance remains pending.

**PHASE 8 PARTIALLY VERIFIED — MANUAL OR ENVIRONMENT GATES REMAIN**

## Scope and baseline

Branch `faithful-astro-migration`, HEAD `8e64d322092b1fa6e0f648ddf26a665c80588198`, parent `b5bc95bc2b8e36c58e8b4d8ab4b11391374a7883`. Index and tracked working tree were initially empty/clean. The five protected/excluded paths remain untouched. An additional `.phase7-stage-paths.nul` was already untracked: it is the previous checkpoint staging aid, preserved and excluded, not Phase 8 implementation.

Read AGENTS.md, MIGRATION_BRIEF.md, AUTONOMOUS-CODEX.md, the living handoff, relevant migration/Phase 6C and Phase 7 records, accessibility audit and Phase 9 decision register. Phase 8 concerns visual/accessibility verification only. Phase 9 decisions and Phase 10 deployment QA remain separate. SESSION_HANDOFF.md is unchanged; no acceptance is asserted for the user.

## Environment and actual browser transport

Node 24.18.0, npm 11.16.0, Astro 7.1.5; existing Nix-provided environment, Linux 6.18.43 x86_64 GNU/Linux. Node native test runner; Cheerio 1.1.0 for generated DOM rules. No dependencies installed or upgraded. `TMPDIR=/tmp` avoids the known inaccessible inherited Nix directory. `ASTRO_TELEMETRY_DISABLED=1` was used for builds/checks.

No Chromium/Chrome executable was available in PATH. The available remote Playwright operation was supplied an external-request-blocking context before navigation to the actual loopback Astro page. It returned **Transport closed**, before confirming page URL/title/content or a screenshot. No browser/version or usable transport was established. No repeated remote restarts were attempted.

Astro preview started on `127.0.0.1:4321`. A separate execution's loopback request failed to connect. A bounded diagnostic launched preview on `127.0.0.1:4322` and fetched `/es/privacy-policy` in the **same execution**: HTTP 200, title `Política de privacidad | Arizona Institute for Autism`. That diagnostic stopped its preview on exit. This proves same-context HTTP availability, not cross-context browser reachability or host-browser acceptance. No public bind/domain/nginx configuration was created.

| Coverage | Actual result |
|---|---|
| Published routes inspected statically | 122/122; zero hard-rule failures |
| Additional semantic review findings | Two heading-level jumps |
| Actual Astro routes opened in browser | 0; not run successfully |
| Full-page desktop / mobile screenshots | 0 / 0 |
| Actual keyboard interactions / no-JS routes | 0 / 0 |
| Automated browser accessibility engine | Not run; no axe/WCAG conformance claim |
| Native CSS contrast regression tests | 3 passing |
| Actual diagram rasterizations inspected | Three; not browser screenshots |
| Real screen-reader sessions | 0; Pending |
| Human visual/language/clinical sign-offs | None received; Pending |

## Network safety and source-design evidence

No production API, form submission, conversion, authentication, payment, or production browser interaction was performed. Browser transport failed before request observation; therefore **zero observed attempts or blocks is not evidence of a successfully enforced browser interception session**. Static checks and image rendering do not execute page scripts. The only successful page request was loopback HTTP. Public W3C accessibility references were consulted; no fresh HubSpot crawl or certificate-insecure source retrieval was performed.

The future host runner blocks every non-loopback request and every non-GET/HEAD request, blocks WebSockets/service workers and records only method/origin/path. A production API attempt is a prevented request and a stop/review condition, not a pass. Ordinary headless/noindex configuration is not an API isolation mechanism. The existing likes/views fallback and credentialed requests remain P9-04; no implementation change was made there.

Contact code still automatically loads Leaflet from unpkg and tiles from OpenStreetMap when JavaScript runs. Both will be blocked in the initial host procedure. Source inspection shows an empty map container when scripts fail, while the adjacent contact/address text remains available. This is a predicted fallback, not observed browser behavior. Payment, careers, social, portal and telephone links were inspected without opening transactions or authentication. Forms retain empty actions and disabled submit controls; no Enter-key/script-submit test was executed. Full submission isolation remains unproved and is a Phase 9 decision.

Accepted source design is the existing source-backed implementation and dated migration records, including Phase 6C media/evidence and Phase 7 localization. No current full-page source/browser comparison was possible. Cache-qualified observations do not prove origin freshness. Spanish privacy additionally retains its failed-standard-TLS/insecure-fallback provenance qualification and mandatory trusted-source comparison (P9-07). All full-page visual comparisons below are **Not tested**, not accepted matches. Two contrast changes are deliberate accessibility deviations from the inherited palette, not a redesign.

## Bounded corrections and issue register

| ID | Severity / state | Reproduction and evidence | Correction or next action / owner |
|---|---|---|---|
| P8-A11Y-001 | Major; CSS correction verified, browser pending | Inspect inline prose/FAQ links on white or tint backgrounds. Original orange #ff914d yields 2.23:1 / 2.01:1; normal text requires 4.5:1. Links lacked persistent underlines. | Existing primary #254080 gives 9.89:1 / 8.89:1; added underlines, preserved wording/buttons. `blog.css`, `FAQAccordion.astro`. Automated contrast tests pass; Phase 8 reviewer checks actual backgrounds/cascade. |
| P8-A11Y-002 | Major; CSS correction verified, browser pending | Tab to navigation, language menu, article byline or diagram region. Authored #ffbd59 outline has 1.66:1 / 1.49:1 against white/tint. | Changed only outline color to existing primary, retaining 3px width/offset in MainNav, MobileNav, LanguageSwitcher, BlogPostLayout and blog.css. Test against adjacent light backgrounds passes; clipping/focus interaction pending. |
| P8-A11Y-003 | Minor; review pending | `/library/aba-therapy-dtt-net-guide` H1→H3 “Insight into Discrete Trial Training (DTT):”; `/schedule-consultation` H1→H3 “Start Here”. | Source-inherited heading skips; not automatically a WCAG failure. Review intended structure/source typography before promoting headings. Phase 8 editorial/accessibility reviewer. No content change. |
| P8-A11Y-004 | Minor; browser verification pending | Open EN/ES Contact with external requests blocked or JS disabled. Code supplies an empty map region, contact/address text remains outside it. | Verify fallback discoverability and accessible map name; consider a bounded localized fallback if essential information proves unavailable. Phase 8 reviewer; provider/API decisions P9. No network change. |
| P8-BROWSER-001 | Major verification gate; unresolved | Actual loopback navigation via remote Playwright returns Transport closed; separate-context loopback GET fails. | Host reviewer runs isolated procedure below. Do not classify static tests as responsive/keyboard acceptance. |
| P8-VIS-001 | Informational; source-evidence uncertainty | All full-page comparisons, typography/crops, responsive breakpoints, 200% zoom and actual clipping are untested. Global overflow hiding can mask defects. | Review source-qualified desktop/mobile captures; measure clipped elements and region scrolling, not just document scroll width. Phase 8 visual reviewer. |
| P8-RTL-001 | Informational; browser/fluent review pending | Three Arabic SVGs rasterize without visibly exposed English labels or clipped Arabic in this renderer. Browser WebP/font fallback and 390px scrolling untested. | Fluent Arabic and clinical reviewer approve labels/causal relationships; browser reviewer checks scroll/focus and actual font rendering. |
| P8-A11Y-005 | Informational; acceptance pending | No real assistive-technology or whole-site rendered contrast audit performed. | Screen-reader tester records OS/browser/AT versions and route-specific results. Review remaining button/hover/icon/eyebrow contrasts, focus, 200% text and reflow. |

Standards basis: [WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Ratios are computed from authored tokens, not sampled browser pixels. The three tests enforce these bounded selectors; they do not certify all colors, states, backgrounds or WCAG compliance.

## Static semantics, keyboard and progressive enhancement

`tools/audit-phase8.mjs` derives eligible routes from the existing publication manifest, catalog, pagination and author utilities. It checks generated route presence, lang/dir, nonempty title, one main/H1, policy canonical, staging robots/no hreflang, duplicate IDs, field labels, button/summary names, alt-attribute presence, ARIA ID references, local assets, fragments, and named focusable diagram regions. Title/H1 presence is not editorial approval; existing SEO tests cover specific metadata. Alt presence is not a fresh visual judgment of every image. Browser DOM parsing, accessible-name computation and interaction remain separate.

All 122 routes pass these hard rules. Two heading jumps are review warnings; no headerless-table warning was found. Existing tests also preserve 182 visible/schema-aligned FAQ answers in 30 articles. No content wording, article dates, metadata, biographies, translation relationships, image assets or forms were changed.

Source inspection confirms native FAQ/details and image anchors, navigation focus-within styles, Escape handlers for mobile/language menus, locale-specific form labels, search live-region/lazy-loading implementation, native service dialogs, and named Arabic diagram regions. This does **not** establish actual Tab/Shift-Tab order, Escape/focus return, service-dialog focus containment, browser Back, no-JS operation or screen-reader output. Service drawers can open after a delay; include this state in host review. Contact obfuscation behavior and no-JS instructions remain an explicit check, not modified here.

## Arabic diagram evidence

All assets remain unchanged in `public/assets/images/` and appear in `/ar/library/aba-school-readiness-guide`.

| Asset | Dimensions/viewBox | Text nodes | Raster observation |
|---|---|---:|---|
| antecedent-behavior-consequence_ar.svg | 800×450 / 0 0 800 450 | 8 | Arabic headings and card labels visible; no exposed English or clipped text detected; LTR causal sequence retained. |
| reduce-environmental-distractions_ar.svg | 800×450 / 0 0 800 450 | 5 | Arabic calm-corner panel covers original labels; lines remain inside panel. |
| reinforcement-replacement-behavior_ar.svg | 800×533 / 0 0 800 533 | 28 | Two labeled behavioral paths and conclusion fit; source arrows retained; no exposed English or clipped Arabic detected. |

Rendering used existing Sharp 0.35.3/libvips 8.18.3/librsvg 2.62.90 with installed DejaVu fonts. Embedded WebP was losslessly decoded to temporary PNG backing for this renderer, exactly as the prior inspection workaround; production SVGs were not altered. Density 144 renders are `/tmp/aia-phase8/{asset-basename}.png`; these temporary raster artifacts are not browser screenshots, source captures or proposed checkpoint assets. The exact rendering recipe is `/tmp/aia-phase8/render-diagrams.mjs`. Temporary evidence is not guaranteed to survive; preserve selected images separately only after review.

Generated article has three Arabic-named `role=region`, `tabindex=0` wrappers, Arabic alternatives and adjacent prose/three semantic tables. At narrow widths CSS keeps 720px image width with region overflow; the corrected outline is primary blue. Actual 390px containment, arrow-key scrolling, focus visibility, browser fonts and screen-reader reading remain Pending. Raster inspection is not fluent-Arabic or clinical approval.

## Route and representative viewport matrix

Population is the actual **122 eligible generated HTML routes**, not drafts or the 133 historical route dispositions. `/ar` remains unpublished. Every row has static Pass; “R” selects the 50 representative routes for full-page 1440×900 and 390×844 capture, plus no-JS review. All browser/visual/reviewer results remain Pending. Other routes require desktop automated smoke and sampling if new defects arise. The durable JSON records exact title/H1, locale, form and diagram observations per route.

| Route | Locale | Static | Representative 1440/390 + no-JS | Browser / reviewer |
|---|---|---|---|---|
| `/` | en | Pass | R | Not tested / Pending |
| `/aba-therapy` | en | Pass | R | Not tested / Pending |
| `/aba-therapy-intake-process` | en | Pass | R | Not tested / Pending |
| `/about` | en | Pass | R | Not tested / Pending |
| `/ar/library` | ar | Pass | R | Not tested / Pending |
| `/ar/library/aba-school-readiness-guide` | ar | Pass | R | Not tested / Pending |
| `/ar/library/author/rula-diab` | ar | Pass | R | Not tested / Pending |
| `/ar/library/autism-self-advocacy-skills-aba` | ar | Pass | Desktop smoke | Not tested / Pending |
| `/ar/library/behavior-management-functions-guide` | ar | Pass | Desktop smoke | Not tested / Pending |
| `/ar/library/executive-functioning-skills-autism` | ar | Pass | Desktop smoke | Not tested / Pending |
| `/ar/library/first-then-cards-autism-transitions` | ar | Pass | R | Not tested / Pending |
| `/ar/library/positive-reinforcement-techniques` | ar | Pass | R | Not tested / Pending |
| `/ar/library/proactive-reactive-aba-strategies-guide` | ar | Pass | Desktop smoke | Not tested / Pending |
| `/autism-evaluations` | en | Pass | R | Not tested / Pending |
| `/careers` | en | Pass | R | Not tested / Pending |
| `/client-consultation` | en | Pass | R | Not tested / Pending |
| `/client-forms` | en | Pass | R | Not tested / Pending |
| `/contact` | en | Pass | R | Not tested / Pending |
| `/donate-autism-giveback` | en | Pass | R | Not tested / Pending |
| `/employee-portal` | en | Pass | R | Not tested / Pending |
| `/es` | es | Pass | R | Not tested / Pending |
| `/es/aba-therapy` | es | Pass | R | Not tested / Pending |
| `/es/aba-therapy-intake-process` | es | Pass | R | Not tested / Pending |
| `/es/autism-evaluations` | es | Pass | R | Not tested / Pending |
| `/es/client-consultation` | es | Pass | R | Not tested / Pending |
| `/es/contact` | es | Pass | R | Not tested / Pending |
| `/es/learner-social-club` | es | Pass | R | Not tested / Pending |
| `/es/library` | es | Pass | R | Not tested / Pending |
| `/es/library/aba-school-readiness-arizona` | es | Pass | R | Not tested / Pending |
| `/es/library/author/rula-diab` | es | Pass | R | Not tested / Pending |
| `/es/library/author/rula-diab/page/2` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/autism-evaluation-what-to-expect` | es | Pass | R | Not tested / Pending |
| `/es/library/autism-family-self-care-tips` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/autism-self-advocacy-skills-aba` | es | Pass | R | Not tested / Pending |
| `/es/library/emotional-regulation-aba` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/enhancing-generalization-skills` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/executive-functioning-skills-autism` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/first-then-cards-autism-transitions` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/page/2` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/parents-guide-to-autism-and-aba` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/library/positive-reinforcement-techniques` | es | Pass | R | Not tested / Pending |
| `/es/library/social-pragmatic-communication-autism` | es | Pass | Desktop smoke | Not tested / Pending |
| `/es/privacy-policy` | es | Pass | R | Not tested / Pending |
| `/es/services` | es | Pass | R | Not tested / Pending |
| `/faqs` | en | Pass | R | Not tested / Pending |
| `/insurance` | en | Pass | R | Not tested / Pending |
| `/learner-social-club` | en | Pass | R | Not tested / Pending |
| `/library` | en | Pass | R | Not tested / Pending |
| `/library/aac-visual-supports-autism` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/aba-school-readiness-arizona` | en | Pass | R | Not tested / Pending |
| `/library/aba-school-readiness-guide` | en | Pass | R | Not tested / Pending |
| `/library/aba-therapy-benefits` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/aba-therapy-dtt-net-guide` | en | Pass; heading review | Desktop smoke | Not tested / Pending |
| `/library/aba-therapy-prompting-parenting-benefits` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/aba-therapy-summer-routine-tips` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/aba-toilet-training-child-autism` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/aia-world-autism-community-day-celebration` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/asd-sensory-friendly-recipes-pancakes` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/author/rula-diab` | en | Pass | R | Not tested / Pending |
| `/library/author/rula-diab/page/2` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/author/rula-diab/page/3` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/author/rula-diab/page/4` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/author/rula-diab/page/5` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/author/rula-diab/page/6` | en | Pass | R | Not tested / Pending |
| `/library/autism-after-school-meltdowns` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-back-to-school-transition` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-daily-living-skills-challenges` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-evaluation-diagnosis-arizona-parent-guide` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-evaluation-what-to-expect` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-fall-break-routine-tips-halloween-thanksgiving` | en | Pass | R | Not tested / Pending |
| `/library/autism-family-self-care-tips` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-friendships-social-play-support` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-self-advocacy-skills-aba` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-social-skills-by-age` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/autism-therapy-rapport-strategies` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/behavior-management-functions-guide` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/behavior-modification-techniques-reinforcement-theory` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/communication-social-skills-autistic-children-guide` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/community-highlight-meet-rula-diab` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/critical-thinking-skills` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/does-aba-therapy-replace-school` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/early-signs-autism-by-age` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/emotional-regulation-aba` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/enhancing-generalization-skills` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/executive-functioning-skills-autism` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/first-then-cards-autism-transitions` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/halloween-and-autism` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/heart-full-of-gratitude` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/how-many-hours-aba-child-need` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/individualized-aba-therapy` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/integrated-aba-model-announcement` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/managing-aggressive-behavior-outbursts` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/meet-rula-diab-bcba` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/new-aia-scottsdale-office` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/new-year-2024-autism-holiday-tips` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/new-year-goals-2023` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/november-2022-aia-update` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/page/2` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/page/3` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/page/4` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/page/5` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/page/6` | en | Pass | R | Not tested / Pending |
| `/library/parents-guide-to-autism-and-aba` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/picky-eating-autism-parent-guide` | en | Pass | R | Not tested / Pending |
| `/library/play-leisure-skills` | en | Pass | R | Not tested / Pending |
| `/library/positive-reinforcement-techniques` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/proactive-reactive-aba-strategies-guide` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/reduce-behavior-management` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/repetitive-behavior` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/sensory-processing` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/sleep-issues-autistic-children` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/social-pragmatic-communication-autism` | en | Pass | Desktop smoke | Not tested / Pending |
| `/library/understanding-autism-support` | en | Pass | Desktop smoke | Not tested / Pending |
| `/privacy-policy` | en | Pass | R | Not tested / Pending |
| `/referrals` | en | Pass | R | Not tested / Pending |
| `/schedule-consultation` | en | Pass; heading review | R | Not tested / Pending |
| `/search` | en | Pass | R | Not tested / Pending |
| `/services` | en | Pass | R | Not tested / Pending |
| `/team` | en | Pass | R | Not tested / Pending |
| `/tour` | en | Pass | R | Not tested / Pending |

The representative set covers home EN/ES; services, ABA/evaluation/social club/intake EN/ES; contact/consultation EN/ES and referrals; privacy EN/ES; team/about; FAQs; three Library roots; both English page-6 routes; search; rewritten table/FAQ/image articles; Spanish school readiness/evaluation/reinforcement/self-advocacy; Arabic antecedent/first-then/reinforcement; three author locales; client forms/employee portal/careers/insurance/donation/tour/scheduling. The runner checks every selected URL against the generated manifest and does not invent missing translations. Additional source-sensitive article links (AAC, self-advocacy, ABC worksheet) belong in the manual checklist.

## Validation and publication invariants

All suites ran sequentially, with no shared-fixture overlap.

| Command from www | Actual result |
|---|---|
| npm run check | 95 files, 0 errors, 0 warnings, 0 hints |
| npm run test:markdown | 20 passing |
| npm run test:publication | 33 passing |
| npm run test:seo | 35 passing |
| npm run test:library | 49 passing |
| npm run test:routes | 10 passing |
| node --test tools/phase8.test.mjs | 3 passing |
| node --check tools/phase8-browser.mjs | Syntax passes; execution not claimed |
| npm run build | Pass, 122 pages |
| PUBLIC_ALLOW_INDEXING=true npm run build | Pass, 122 pages |
| npm run audit:links | 0 broken internal links |
| npm run audit:images | 0 missing mapped page images |
| npm run audit:blog | 0 blog-content failures |
| node --experimental-strip-types tools/audit-phase8.mjs /tmp/aia-phase8/static-final.json | 122 routes; 0 failures, 2 review warnings |
| Final npm run build | Pass, restored normal staging |
| git diff --check | Pass |

Standard test total 147, plus 3 focused Phase 8 tests = 150 passing. Logs are `/tmp/aia-phase8/{check,test-markdown,test-publication,test-seo,test-library,test-routes,test-phase8,build,indexing,final-staging,audit-links,audit-images,audit-blog}.log`. npm emits an inherited unknown `http-proxy` configuration warning; application diagnostics are zero. A diagnostic attempted to read Sharp's unexported package.json; version was instead obtained through `sharp.versions`. One initial static-tool invocation used repository root instead of www and was rerun from the documented directory. Neither required application changes.

| Metric | Phase 7 | Phase 8 indexing-enabled | Final staging |
|---|---:|---:|---:|
| HTML / unique canonicals | 122 / 122 | 122 / 122 | 122 / 122 |
| Sitemap URLs | 108 | 108 | 0 |
| Hreflang links / routes | 180 / 55 | 180 / 55 | 0 / 0 |
| Translation sets | 25 | 25 | Relationships retained; output suppressed |
| Library records | 74 (55/12/7) | 74 (55/12/7) | Same |
| Search records | 55/12/7 | 55/12/7 | Same |
| Author archives / redirects | 9 / 9 | 9 / 9 | Same definitions |
| FAQ answers / articles | 182 / 30 | 182 / 30 | 182 / 30 |
| Robots | Mode-dependent | 108 index,follow; 14 noindex,follow | 122 noindex,nofollow |

English Library/author page 6 each retain five cards, self canonicals and no hreflang. Indexing-enabled author archives remain noindex,follow and sitemap-excluded. All publication rules, external syndicated canonical exceptions, pagination ordering and redirects are unchanged. No production activation is implied by testing a local indexing-enabled artifact.

The explicit Phase 7 evidence check correctly failed after CSS changes: “Application source/assets changed since evidence capture.” A new schema-2 report was therefore necessary:

- `route-reconciliation-2026-10-14-offline-07-32-07-044Z.json`
- Explicit source: `route-reconciliation-2026-10-14-offline.json`; 70 historical production requests reused, **zero new requests**.
- 133 route dispositions, 122 local generated routes, nine local redirect definitions.
- Source fingerprint `b50256cbf182e6a9711c55e0699f0bd0f734fdde645e0f9909776c07b8620b78`.
- Explicit `--check --evidence reports/route-reconciliation-2026-10-14-offline-07-32-07-044Z.json` passes without network or writes.
- Report's historical production-sitemap count 102 is distinct from current indexing-enabled Astro sitemap count 108. Route presence is not body/visual fidelity or deployed hosting validation.

No old report was overwritten. Final dist is normal staging. No source fingerprint change arose from documentation.

## Evidence files, ownership and acceptance

New durable evidence: this report, `phase-8-static-evidence-2026-10-14.json`, the new schema-2 reconciliation, and `phase-8-host-browser-verification-2026-10-14.md`. New tools: audit-phase8.mjs, phase8.test.mjs, phase8-browser.mjs. Six application files contain only bounded CSS corrections; accessibility-audit.md and migration-summary.md receive dated findings. No new production asset, dependency, screenshot cache, browser profile, trace, credential or patient data is included.

The host runner is **unexecuted in this environment**; syntax and selected-route membership were checked. Its observations/screenshots must be reviewed, not automatically counted as acceptance. Use the [host-browser procedure](phase-8-host-browser-verification-2026-10-14.md) to record reviewer/date/device/result/evidence/issues. No browser, keyboard, language, clinical, accessibility or privacy owner has signed off in this session.

All P9-01–P9-10 remain Pending: landing-page ownership/provisional consultation CTA; employee portal access/security; forms/submission APIs/privacy; likes/views isolation/cookies; analytics/consent/Ads; clinical/organizational claims and credentials; both privacy policies and trusted Spanish-source comparison; author SEO; hosting/TLS/routes/rollback; production release. Fluent Spanish/Arabic, diagram terminology, actual desktop/mobile/keyboard/no-JS and real screen-reader acceptance remain open. The Spanish reinforcement tip was corrected in Phase 7 and is not reintroduced as an implementation discrepancy.

Recommendation: retain these bounded technical improvements for review, complete isolated host-browser and human accessibility/language checks before Phase 8 acceptance, and do not infer deployment authorization. No staging, commit, push, merge, deployment, handoff advancement, integration activation or Phase 9 implementation occurred.

## Final structural review

Eight modified tracked paths and seven new Phase 8 paths. Six pre-existing
untracked paths remain excluded (the five protected/superseded paths plus the
old Phase 7 staging aid). The index is empty. Tracked stat excludes all new files.
The final Astro check, including the optional browser runner, covers 95 files
with zero diagnostics. Loopback preview was stopped after verification.

```text
 M www/reports/accessibility-audit.md
 M www/reports/migration-summary.md
 M www/src/components/FAQAccordion.astro
 M www/src/components/LanguageSwitcher.astro
 M www/src/components/MainNav.astro
 M www/src/components/MobileNav.astro
 M www/src/layouts/BlogPostLayout.astro
 M www/src/styles/blog.css
?? .phase7-stage-paths.nul
?? merge-plan.md
?? www/reports/phase-8-host-browser-verification-2026-10-14.md
?? www/reports/phase-8-static-evidence-2026-10-14.json
?? www/reports/phase-8-visual-accessibility-acceptance-2026-10-14.md
?? www/reports/route-reconciliation-2026-10-11-offline.json
?? www/reports/route-reconciliation-2026-10-12-offline.json
?? www/reports/route-reconciliation-2026-10-13-offline-06-16-06-857Z.json
?? www/reports/route-reconciliation-2026-10-13-offline.json
?? www/reports/route-reconciliation-2026-10-14-offline-07-32-07-044Z.json
?? www/tools/audit-phase8.mjs
?? www/tools/phase8-browser.mjs
?? www/tools/phase8.test.mjs
```

```text
 www/reports/accessibility-audit.md        | 30 ++++++++++++++++++
 www/reports/migration-summary.md          | 51 +++++++++++++++++++++++++++++++
 www/src/components/FAQAccordion.astro     |  6 ++--
 www/src/components/LanguageSwitcher.astro |  2 +-
 www/src/components/MainNav.astro          |  2 +-
 www/src/components/MobileNav.astro        |  2 +-
 www/src/layouts/BlogPostLayout.astro      |  2 +-
 www/src/styles/blog.css                   |  6 ++--
 8 files changed, 92 insertions(+), 9 deletions(-)
```
