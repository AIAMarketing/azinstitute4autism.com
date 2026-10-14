# Accessibility Audit

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
