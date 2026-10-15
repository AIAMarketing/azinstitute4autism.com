# Accessibility Audit

**Checkpoint preparation — 2026-10-15:** The [exact checkpoint manifest](phase-8-checkpoint-manifest-2026-10-15.md)
records final revalidation (156 tests, including Library 53), current publication
metrics, preserved release gates and the source-matching **18:21** offline report.
The [badge correction](phase-8-badge-correction-evidence-2026-10-15.json) supersedes
the earlier white-background derivative and its captures/hash. Current Spanish
artwork preserves original geometry/alpha outside the APROBADO lettering.
Earlier browser failures, capture results and file counts below are dated history;
they are not the latest technical state. Checkpoint preparation is now authorized;
no staging, commit, production activation or human approval has occurred.


## Implemented

- Semantic header, navigation, main, article, section, and footer landmarks.
- Skip link and visible keyboard focus behavior.
- Language and direction attributes for English, Spanish, and Arabic.
- Native `details` elements for mobile navigation and FAQ accordions.
- Form labels, autocomplete hints, disabled submission state, and explanatory text.
- Service inquiry drawers use native modal dialogs with focus containment,
  Escape, backdrop, and labeled close-button dismissal plus reduced-motion
  support.
- Reduced decorative image announcements through empty alt text where appropriate.
- Responsive typography and layouts without fixed text sizing.
- Language-switcher choices are limited to routes that actually exist.
- The language selector uses native `details`/`summary` disclosure semantics and
  real links. Visitor navigation is resolved independently from SEO hreflang,
  so validated noindex author roots remain reachable without adding them to the
  hreflang graph.
- Desktop, mobile, and footer navigation resolve against eligible generated
  routes. Cross-language fallbacks are explicitly identified rather than
  silently linking visitors to another language.
- Arabic footer phone, email, and Latin-script address values use narrowly
  scoped left-to-right bidi isolation while the surrounding footer remains RTL.
- Like buttons expose pressed and disabled state.
- Source-faithful colors, section hierarchy, and controls were retained while
  avoiding the source site's modal that obscures content on initial load.

## Manual Review

- Have fluent Spanish/Arabic reviewers assess the newly localized article hero
  descriptions and Arabic diagram alternatives in their full article context.
- Test keyboard and screen-reader behavior across all migrated pages.
- Perform contrast testing against final approved brand colors.
- Review extracted article heading hierarchy and any table markup.
- Confirm Arabic content and RTL reading order with a fluent reviewer.
- Review Spanish and Arabic operational labels and fallback-language notices
  with fluent reviewers. Phase 7 localizes the existing Spanish and Arabic
  author-archive labels; fluent review remains pending.
- Test the native language disclosure, mobile navigation, search announcements,
  contact links, and full-page RTL reading order with screen readers. Phase
  6B.5 validated generated markup and keyboard semantics, but no screen-reader
  executable was available in the implementation environment.
- Validate the rebuilt mobile navigation and all full-page responsive
  layouts in a browser outside the autonomous sandbox.
## Phase 6C.3 article-image update — 2026-10-12

The current 74-article Library corpus was re-audited after the Phase 6C.2
rewrites. All 74 featured images are informative in their present article
context. The 60 records that still lacked frontmatter descriptions now have
concise, locale-appropriate alt text based on direct visual inspection and the
corresponding public-page evidence. No current featured image is treated as an
accidental empty-alt fallback; this is a decision about the audited corpus, not
a rule that future decorative images must have nonempty alt text.

The three English-text diagrams in the revised Arabic antecedent/consequence
article now use separate self-hosted Arabic SVG counterparts. Each preserves
the source raster and its relationships while replacing the visible labels
with Arabic. The article also retains adjacent Arabic prose and semantic tables
that communicate the same information without relying on the images. The
causal panel order remains left-to-right where reversing it could obscure the
sequence, while Arabic labels render right-to-left within their panels.
At narrow widths, each detailed diagram sits in a keyboard-focusable,
explicitly named horizontal scroll region with a visible focus outline. This
keeps its labels at a readable minimum width without introducing page-level
horizontal overflow.

Generated-markup checks cover featured-image alt propagation to the article,
Open Graph, and Twitter metadata; localized Arabic asset references; and the
absence of the English diagram references from the Arabic body. The SVGs were
rendered locally for visual inspection at their native dimensions. A browser
was not available for desktop/390-pixel overflow checks, and no screen-reader
or fluent-Arabic review was performed. Those checks, plus clinical review of
the translated ABA terminology and diagram relationships, remain required
before cutover.

## Phase 6C.4 article-link update — 2026-10-13

Generated-HTML checks now cover every Library body link's published destination,
asset, and fragment, plus the rendered previous/next/related links. Spanish and
Arabic self-advocacy articles identify their Halloween-guide destination as
English; the two new localized sentences still require fluent-language review.

The play/leisure article retains two native image links to the full-size,
self-hosted infographics. Duplicate expanded images and orphaned lightbox close
symbols were removed. The ABC-data preview links to the existing full-size
worksheet. These static anchors do not require JavaScript; this is markup
verification, not a completed keyboard or no-JavaScript browser session.

Local Chromium failed its sandbox socket check; remote Playwright could not
reach the generated site and subsequently closed its transport. Desktop/mobile
visual checks, focus, image opening and browser Back behavior remain manual
acceptance items. No screen-reader or fluent Arabic/Spanish acceptance is
claimed. The three Phase 6C.3 Arabic diagrams still need visual-language review.

## Phase 6C.5 final verification — 2026-10-13

All 74 featured images retain the individually reviewed alternatives from Phase
6C.3. Final generated-output inspection found and corrected two flattened
screening/evaluation/diagnosis tables (English and Spanish), ten toilet-training
H3 labels that had absorbed adjacent list prose, and the opening headings in the
English/Spanish social-communication articles that had absorbed a quoted
paragraph. Words, article dates and clinical guidance were not changed. The
play/leisure closing CTA is now outside its last FAQ, matching the public page;
all 182 FAQ answers across 30 articles match their visible content and schema.

Actual raster inspection of the three Arabic SVGs found two bounded visual
issues: a replacement-behavior subtitle extended beyond its colored panel, and
a few original English calm-corner title pixels appeared above the overlay.
The subtitle now wraps and the calm-corner overlay starts 10 pixels higher.
Reinspection shows no exposed English labels or clipped Arabic text in the
inspection rasters. The previews used installed DejaVu fonts and losslessly
decoded PNG backing in temporary files because this environment's librsvg did
not render the SVGs' embedded WebP directly. Production SVGs retain their source
WebP artwork. This is raster evidence, not browser/font-fallback acceptance.

All three diagram wrappers retain a named, focusable region, narrow-screen
horizontal scrolling, a 720-pixel minimum image width and focus-outline CSS.
Browser transport remains unavailable; real desktop/390px overflow, keyboard
scrolling, no-JavaScript interactions, screen-reader and fluent Arabic checks
remain **pending**. The source-inherited English tip in the Spanish
positive-reinforcement article also remains a bounded language-review item.
See the final Phase 6C.5 report for the route-specific checklist and release gates.

## Phase 7 shared locale update — 2026-10-14

Spanish Contact and consultation forms now receive the publication locale
explicitly and render Spanish labels, service choices, instructions, submit
text and disabled-submission notices. Contact map landmark/tile alternatives
and zoom titles are localized from server-provided data. Provider/library and
contact values are unchanged. Empty form actions and disabled buttons remain;
these checks do not prove full Enter-key, scripted or no-JavaScript isolation.

Spanish and Arabic author archive eyebrows and list headings are localized.
Arabic BCBA/LBA abbreviations receive LTR isolation without changing identity,
biography or archive SEO. The Spanish reinforcement tip is now fully Spanish,
superseding the minor language finding recorded in Phase 6C.5. New wording is
still pending fluent-language and clinical/editorial acceptance. The Arabic
biography's physician-like wording versus English “clinician” is separately
flagged for organizational and fluent review; it was not silently rewritten.

The recovered Spanish privacy page preserves all ten source sections with
semantic headings, localized metadata and existing contact obfuscation.
Generated HTML tests verify labels, one H1, language, disabled form state and
translation navigation. Playwright opened about:blank, but its transport
closed on the subsequent isolated-local-preview attempt. No site browser,
keyboard, mobile, no-JavaScript or real screen-reader acceptance is claimed.
See [Phase 7 verification plan](phase-7-nonproduction-verification-plan-2026-10-14.md)
for reviewer fields and the API-isolation prerequisite for hosted review.

## Phase 8 bounded verification — 2026-10-14

Generated-HTML smoke checks now cover all 122 eligible routes: zero hard-rule
failures, two source-inherited H1→H3 review warnings (DTT/NET and schedule
consultation). These custom Cheerio rules check basic semantics, labels, alt
presence, fragments, assets and diagram regions; they are not a WCAG audit.

Two authored contrast defects were corrected without changing content or tokens:
inline prose/source-FAQ links now use primary blue and persistent underlines;
navigation/language/byline/diagram focus outlines now use primary blue. On white
and tint backgrounds the foreground contrast is 9.89:1 / 8.89:1, replacing
orange text at 2.23:1 / 2.01:1 and focus outlines at 1.66:1 / 1.49:1. Three focused
regression tests pass. Actual cascade/background/focus-clipping review remains
pending; other colors and controls have not received a complete rendered audit.

Three unchanged Arabic diagrams were rasterized and inspected again: no exposed
English labels or clipped Arabic detected in this DejaVu/librsvg rendering.
This is not browser/font-fallback or fluent-language acceptance. The earlier
statement that wrappers prevent page overflow describes CSS intent; actual
390px containment and keyboard scrolling remain unverified.

Remote browser transport closed before loading the site; only a same-execution
loopback HTTP fetch succeeded. Zero actual browser routes/screenshots, keyboard,
no-JS or real screen-reader sessions are claimed. Contact's external-map failure
fallback and all timed dialogs require actual browser checks. See the
[Phase 8 report](phase-8-visual-accessibility-acceptance-2026-10-14.md) and
[isolated host procedure](phase-8-host-browser-verification-2026-10-14.md).
All stakeholder/Phase 9 gates remain open. Phase 8 is partially verified, not
accepted, and the living handoff has not advanced.

## Phase 8 actual Chromium verification — 2026-10-15

The preceding unavailable-browser status is superseded for the system Chromium
151.0.7922.75 / Playwright 1.61.0 combination. See the
[browser report](phase-8-browser-verification-2026-10-15.md) and
[machine-readable evidence](phase-8-browser-evidence-2026-10-15.json).
All 122 routes loaded; 50 representative routes have full-page 1440/390 captures
and no-JavaScript content observations. The final source received another
122-route desktop check. Forty focused interaction checks pass; one modal focus
boundary remains Review required. No production API attempt was observed;
external map resources were blocked before transmission.

Two further bounded defects were corrected: low-contrast skip/contact/form
notice links now use primary blue and underlines; the homepage director grid
now follows the existing ≤760px single-column rule. Its scoped desktop rule had
caused 382px document width at a 320px viewport. Both homepages now pass actual
320/390/768/1440 reflow checks. Four CSS regression tests pass; full test suites
total 151 passing. These findings do not certify the rest of the palette.

All three unchanged Arabic SVGs rendered with their embedded artwork in Chromium;
inspected desktop captures showed no exposed English labels or clipped Arabic.
Named focusable regions scroll with arrow keys at 390px without page overflow.
Fluent Arabic and clinical review remain mandatory. Chromium AX-tree inspection
confirms Spanish form names/disabled state and Arabic named regions, but also
exposes inherited English “Like this article” and “Similar Blog Posts” labels.
Shared localized labels require a bounded follow-up and fluent review.

The service drawer focuses its heading, closes with Escape and restores prior
focus. Forward Tab reaches the native browser-chrome/BODY boundary before
returning to dialog controls; no background control received focus. Visible
browser/AT review remains pending, not a strict containment pass. A synthetic
fixture's scripted form submission was intercepted, demonstrating that disabled
buttons do not alone isolate submissions. No real form/server POST occurred;
P9-03 still owns the integration/isolation decision.

The two inherited heading skips, actual 200% browser zoom, broader rendered
contrast, complete source-qualified visual comparison, controlled live-map
behavior and real screen-reader acceptance remain open. Computed text resizing
and AX inspection are supplementary evidence, not substitutes. No human
sign-offs were received. All P9 decisions and the living handoff remain unchanged.

## Phase 8 bounded follow-up — 2026-10-15

[Follow-up results](phase-8-browser-verification-2026-10-15.md#bounded-follow-up--2026-10-15)
supersede the specific unresolved technical findings above. Arabic article and
archive counters/footer controls now receive publication locale explicitly;
Arabic names/views/navigation/related labels and isolated counts render correctly.
English/Spanish labels and the entire likes/views API script remain unchanged.
Fluent Arabic review is still pending.

The DTT/NET article's three primary peer sections and consultation's “Start Here”
now use H2 semantics, with identical heading text, IDs, appearance and searchable
text. Inspection established peer-section relationships; a numerical skip alone
was not treated as a WCAG violation. All-route generated audit: 122 pass, zero
hard failures or heading-review warnings.

Read More/eyebrow and selected nav/related-link states now use readable existing
primary colors. Card-author focus outlines also meet light-surface contrast.
Contact/skip links and focus clearance were rechecked. Native dialog Tab and
Shift+Tab, entry, Escape, keyboard Close and return pass at desktop/mobile.
The BODY/documentFocus=false boundary matches a minimal native control, with
background inertness preserved; no custom trap or application change was needed.

Real native tab zoom 200% passes seven high-risk pages: 1440px browser window,
720 CSS-pixel viewport, DPR 2, no page overflow. Overlapping actual viewport
captures replace an unreliable fullPage zoom capture. Both homepages pass
320/390/768/1440 and unchanged Arabic diagrams scroll/render correctly. Thirty
focused browser checks and 154 regression tests pass. This is technical
checkpoint-review readiness, not a complete WCAG audit. Human visual, fluent,
clinical/privacy, real screen-reader and source-fidelity gates remain pending;
all Phase 9 decisions remain unchanged. No production requests or activation.


## Phase 8 consolidated accessibility follow-up — 2026-10-15

See the [complete consolidated report](phase-8-consolidated-followup-2026-10-15.md)
and [evidence](phase-8-consolidated-evidence-2026-10-15.json).

- Phase 7 localization carryover: Spanish homepage now includes the faithful
  HSA/FSA translation once after ESA/before Financial Help, with a separate
  APROBADO graphic and Spanish alt. English content/artwork unchanged.
- Phase 7 structural carryover: Spanish privacy now has eleven H2 sections;
  Información que recopilamos introduces the four existing collection items.
  Policy wording/date/contact/metadata unchanged. Historical cache/insecure-TLS
  provenance and trusted-source/legal review remain unresolved.
- Phase 8 Tour defect: replace flattened duplicated gallery with one enhanced
  nine-slide carousel, caption, wraparound controls, named keyboard-operable
  thumbnails, focus, restrained live announcements and full no-JS fallback.
  Source is TLS-validated HTTP 200 but October 3 cached/prerendered content,
  observed October 15. No live-page scripts executed or fresh-origin claim.
- Preserve prior Arabic UI, headings, contrast, responsive and native-dialog
  findings. No changes to likes/views script, forms, publication architecture,
  dependencies, hosting, SESSION_HANDOFF or pending Phase 9 decisions.
- Pass: 156 regression tests; 21 targeted Chromium checks and two actual-style/
  reduced-motion probes; 122 generated-route static checks; link/image/blog
  audits and both builds. Native 200% zoom on Tour/privacy adds 26 overlapping
  frames, alongside 20 full-page captures and four crops (all outside Git).
- Counts unchanged: 122 routes/canonicals, 108 sitemap, 180 hreflang/55 routes,
  25 sets, 74 Library records, 55/12/7 search, nine archives/redirects,
  182 Library FAQ answers on 30 articles. Final staging 122 noindex,nofollow,
  empty sitemap, zero hreflang. Raw all-site FAQ population is separately 254/32.
- Final explicit source-matching offline artifact:
  [17-41-40-404Z](route-reconciliation-2026-10-15-offline-17-41-40-404Z.json),
  133 dispositions/70 reused requests. Read-only consistency check passed.

**PHASE 8 TECHNICALLY READY FOR CHECKPOINT REVIEW**, not accepted by stakeholders.
Fluent Spanish/Arabic, HSA financial claims, clinical/organizational review,
privacy/legal/trusted-source comparison, real screen reader, native-dialog AT,
Arabic diagrams, source-design and non-Chromium acceptance remain open.
P9-01 through P9-10 all Pending decision; Phase 10 cutover remains unauthorized.
No staging, commit, checkpoint preparation, deployment or integration activation.
