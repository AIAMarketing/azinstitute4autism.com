# AIA Astro Migration — Living Session Handoff

**Last updated:** October 15, 2026 (UTC)
**Repository:** `AIAMarketing/azinstitute4autism.com`
**Working branch:** `faithful-astro-migration`
**Last accepted technical implementation:** Phase 8 — Visual and Accessibility Acceptance (technical checkpoint scope; human acceptance pending)
**Previous accepted checkpoint:** Phase 7, signed `8e64d322092b1fa6e0f648ddf26a665c80588198`
**Implementation checkpoint:** the commit containing this handoff update; obtain its actual SHA from Git history after the user creates the signed commit.
**Next milestone:** Phase 9 — Human-Decision Gates; then Phase 10 — Final QA/Cutover Readiness.

Phase 8 implementation is technically completed for checkpoint purposes. Editorial,
accessibility, stakeholder and production-release approval remain separate.
The user stages, signs and pushes from the host terminal; this handoff does not
authorize deployment or integration activation.

## Authority and checkpoint history

Read repository-root `AGENTS.md`, `MIGRATION_BRIEF.md` and `AUTONOMOUS-CODEX.md`,
then this handoff and the relevant [migration summary](migration-summary.md).
Later Phase 6A ratification controls conflicting original recommendations.

- Phase 5C Team: `34d5394b3ce765028a27b9cddd9952de3f09bfe7`.
- Phase 6A proposal: `76a035424dc5245443476b168d8c91ea62eed27b`.
- Phase 6B.1 search: `b20c253383440598c2d07bf6f852906ac00c42df`.
- Phase 6B.2 pagination: `6f5ac3c0d233cee5fbbb62be79bc6909e6bec183`.
- Phase 6B.3 author archives: `8646792d46a8a117ef617f5dd2582c2550b45d19`.
- Phase 6B.4 URL/SEO: `8192ea71c47a7163b40a7fad144ebbd2523282d1`.
- Phase 6B.5 multilingual navigation/RTL: the signed replacement checkpoint
  `a699d467f19fafbfdda5fce1ce6226baa6e5fc3c`; do not use its superseded unsigned SHA.

- Phase 6C Library/multilingual parity: signed checkpoint
  `b5bc95bc2b8e36c58e8b4d8ab4b11391374a7883`.

- Phase 7 multilingual reconciliation: signed checkpoint
  `8e64d322092b1fa6e0f648ddf26a665c80588198`.

Phase 6B.5 visitor navigation remains independent of SEO hreflang. Published
locale destinations, explicit fallback notices, native language disclosure,
Arabic contact bidi isolation and the two-line shared address remain intact.
`/ar` remains unpublished with an explicit English-home fallback.
ContactObfuscation is unchanged; reversed no-JavaScript strings are intentional.
The earlier Phase 6B.5 manual acceptance does not cover subsequent Phase 6C work.

## Completed Phase 6C technical sequence

- **6C:** restored nine missing English articles and source-backed self-hosted
  media; derived English Library and author page 6 from the catalog.
- **6C.1:** restored source-supported Halloween contextual links in English
  self-advocacy and AAC articles.
- **6C.2:** reconciled three materially outdated English articles and current
  published Spanish school readiness; replaced the obsolete Arabic
  antecedent/consequence body with a complete translation; audited all 19
  established translation relationships.
- **6C.3:** reconciled featured-image alternatives, source-supported headings,
  truncated descriptions and supported modification dates; retained the new
  Arabic guide's intentional modification-date omission; localized three diagrams.
- **6C.4:** reconciled contextual and external links, previous/next/related
  relationships, image links and fragments; added localized self-advocacy
  Halloween references while preserving the landing-page ownership gate.
- **6C.5:** audited all 74 articles, corrected narrow structural/accessibility
  regressions, and verified metadata, links, FAQs, translation relationships,
  pagination, search and publication policies. Technical readiness has
  documented nontechnical release gates.

Detailed evidence and reviewer checklists are in the
[final acceptance report](phase-6c5-final-library-acceptance-2026-10-13.md).
The [checkpoint manifest](phase-6c5-checkpoint-manifest-2026-10-13.md) lists 148
implementation/evidence paths; that checkpoint included its handoff as path 149.
Historical phase records retain their original context.

## Completed Phase 7 technical sequence

- Recovered Spanish privacy policy with February 19, 2025 revision date,
  localized metadata and reciprocal English/Spanish policy navigation.
- Localized actual Spanish form labels, options, instructions, disabled notices
  and Contact map text using explicitly passed publication locale; no backend enabled.
- Translated the Spanish reinforcement tip without changing article identity,
  dates or surrounding content; fluent/clinical approval remains pending.
- Localized Spanish/Arabic author headings and isolated Arabic BCBA/LBA text;
  biographies, identities and archive SEO unchanged.
- Prepared the [nonproduction verification plan](phase-7-nonproduction-verification-plan-2026-10-14.md)
  and [Phase 9 decision register](phase-9-decision-register-2026-10-14.md).
  P9-01 through P9-10 all remain **Pending decision**.

See the [Phase 7 reconciliation report](phase-7-multilingual-reconciliation-2026-10-14.md)
and [checkpoint manifest](phase-7-checkpoint-manifest-2026-10-14.md).
The non-Library matrix excludes all three Library-root content records:
20 EN / 8 ES / 1 unpublished AR draft → 20 EN / 9 ES / 1 unpublished AR draft;
28 → 29 eligible pages and 8 → 9 English–Spanish pairs. The final matrix has
30 records including the draft. Whole pages-collection counts (including roots)
are 21/9/2 → 21/10/2, with 9 → 10 English–Spanish pairs. Do not mix populations.

## Completed Phase 8 technical sequence

- Static checks and guarded Chromium smoke covered all 122 generated routes.
  The original browser pass captured 50 desktop/50 mobile full pages, checked
  50 routes without JavaScript, and passed 40 focused interactions, with one
  native-dialog review finding subsequently compared against a native control.
- Corrected prose/FAQ/contact/form link contrast and underlines, navigation,
  language-menu, skip-link, byline and diagram focus treatments; fixed the
  scoped homepage director-grid overflow at 320px.
- Localized Arabic article controls and bidi counts without changing the API
  script. Corrected DTT/NET peer sections and consultation heading semantics
  while preserving text, fragments and appearance. Native dialogs remain intact;
  Chromium's browser-chrome boundary did not establish application focus escape.
- Corrected Phase 7 carryovers: Spanish HSA/FSA section after ESA/before financial
  help, Spanish alternative text and APROBADO artwork; Spanish privacy's missing
  information-collection H2 (eleven sections/four items), with no legal-text change.
  The final Spanish badge preserves the original alpha and every pixel outside
  its lettering rectangle; the English artwork is unchanged.
- Replaced flattened Tour Markdown with one MDX publication, structured nine-photo
  data and accessible carousel: captions, thumbnails, wraparound, keyboard/focus,
  restrained announcements, no auto-rotation, full no-JavaScript fallback and
  restored consultation link. No new dependency or production integration.
- Bounded follow-up: 30 grouped Chromium checks. Consolidated pass: 21 grouped
  checks, two contrast/reduced-motion probes, five distinct routes, 20 full-page
  captures, native 200% zoom on Tour/privacy (26 overlapping frames), four crops.
  Earlier follow-up also tested seven routes at native 200% zoom. Badge correction:
  eight EN/ES checks/crops at 320/390/768/1440px. These are distinct evidence
  populations, not additional unique-site-route totals.
- Loopback-only contexts allowed only local GET/HEAD, blocked external traffic,
  WebSockets and website service workers. Map-resource attempts and a synthetic
  fixture POST were prevented; no production API/like/form/conversion request
  was transmitted. Disabled controls/noindex remain insufficient API isolation.

See [consolidated findings](phase-8-consolidated-followup-2026-10-15.md),
[browser results](phase-8-browser-verification-2026-10-15.md),
[badge correction evidence](phase-8-badge-correction-evidence-2026-10-15.json),
and the [Phase 8 checkpoint manifest and validation](phase-8-checkpoint-manifest-2026-10-15.md).
Historical failed browser attempts remain recorded. System Playwright 1.61.0 /
Chromium 151.0.7922.75 now work; the optional Nix browser-shell realization is
not independently verified. No real screen-reader session or owner sign-off occurred.

Tour's public source passed normal TLS but was cache-qualified. Spanish privacy's
capture used a certificate-insecure fallback after validation failed. Neither
establishes current origin freshness; Spanish policy additionally requires a
trusted-source comparison. No insecure retrieval was repeated.

## Verified technical baseline

| Metric | Result |
|---|---:|
| Library articles / locale search records | 55 EN / 12 ES / 7 AR = 74 |
| Generated HTML routes / unique canonical targets | 122 / 122 |
| Author archive routes | 9 |
| Indexing-enabled sitemap URLs | 108 |
| Hreflang links / participating routes | 180 / 55 |
| Validated page/article translation sets | 25 |
| Repository redirect definitions | 9, not activated on deployed hosts |
| Visible/schema-aligned FAQ answers / articles | 182 / 30 |

English Library and author pagination is `10/10/10/10/10/5`; Spanish is `10/2`,
Arabic is one seven-article root. Page 6 is derived, with no page 7 or page-one
HTML alias. Search remains locale-scoped, metadata-only and demand-loaded.
Publication ordering uses original dates, not modification dates. Existing
syndicated external-canonical/noindex exceptions remain unchanged.

Normal staging output is **122 `noindex,nofollow` HTML pages, an empty sitemap
and no hreflang**. Indexing-enabled validation is local only. No deployment,
redirect activation, form submission or production integration is authorized.

Final source-matching offline evidence is
[the Phase 8 badge-final reconciliation](route-reconciliation-2026-10-15-offline-18-21-22-820Z.json):
133 dispositions, 70 historical production requests, schema 2. Its source
fingerprint is `8453ffad597e2f2414343b634997bf204cbdd59fc00c3d8d122babef8a632cb5`.
Use this explicit evidence path for read-only checks. Earlier Phase 8 reports
are historical implementation evidence, not current fingerprints. No new crawl
is required for documentation-only checkpoint preparation.

The historical Phase 6C.5 parity classifications were 10 confirmed, 58 with accepted intentional
deviations, one minor discrepancy, five requiring human review, zero material
discrepancies and zero insufficient-verification records against the selected
evidence. Findings rely on dated, sometimes cached/prerendered public HubSpot
representations; they do not establish independent current origin freshness.
The newer Arabic antecedent/consequence translation intentionally supersedes
its outdated public Arabic body. Machine-assisted work is not professional approval.

Phase 8 checkpoint preparation revalidation on October 15 passed sequentially
with `TMPDIR=/tmp`: Astro check (101 files, zero diagnostics), Markdown 20,
publication 33, SEO 35, **Library 53**, routes 10 and Phase 8 5 tests: **156 total**.
Both build modes and link/image/blog audits pass. The final normal staging build
and explicit offline consistency check retain the publication safeguards above.
Git identity/signing remains the user’s host-terminal responsibility.

## Outstanding Stakeholder Review and Production Release Gates

- **Clinical/organizational — AIA:** approve eligibility and program-specific
  ranges against general ABA eligibility of **18 months through eight years**;
  resolve the summer-routine age discrepancy. Review Preparatory Academy ages
  2–6 and 1:2 delivery ratio, ABA versus education, Arizona educational guidance,
  functional assessment, behavior intervention, reinforcement, extinction,
  aggression, self-injury, safety, treatment/outcome claims and author roles,
  credentials and biographies, including Arabic physician-like wording versus
  English “clinician.” Source publication alone is not clinical approval.
- **Fluent Spanish/Arabic and clinical review:** revised Spanish school readiness,
  rewritten Arabic antecedent/consequence guidance and terminology, all three
  localized Arabic diagrams, localized self-advocacy Halloween additions,
  operational labels and cross-language notices remain pending.
- **Spanish tip review:** Phase 7 corrected the English tip at
  `/es/library/positive-reinforcement-techniques`. Its fluent-Spanish and
  clinical/editorial acceptance remains open; historical Phase 6C findings remain intact.
- **Privacy/legal and trusted-source approval — P9-07:** both policy claims need
  AIA privacy/legal approval. Spanish privacy was recovered from a cache-qualified
  response after standard TLS certificate validation failed; fallback disabled
  certificate verification. Matching captured text does not prove authenticated
  origin fidelity. Before production, compare against a certificate-validated
  source or owner-supplied authoritative export with provenance; no trusted
  comparison is available yet. Fluent Spanish approval remains mandatory.
  Do not repeat insecure retrieval or rewrite policies to hide this limitation.
- **Browser/accessibility:** guarded Chromium automation now covers desktop/mobile,
  keyboard, no-JavaScript, RTL/diagram scrolling and actual 200% zoom. Authorized
  visual/source-fidelity acceptance, non-Chromium coverage, native-dialog AT
  behavior, Arabic visual-language acceptance and real screen-reader testing
  remain pending. Earlier failed attempts remain historical; browser automation
  and DOM inspection do not constitute reviewer or assistive-technology approval.
- **Spanish HSA/FSA financial claims:** fluent-Spanish and organizational/financial
  review of wording, account use, pre-tax and tuition claims remains pending.
  Localized artwork is not financial eligibility or reimbursement approval.
- **Landing-page ownership — Phase 9 owner gate:** the public
  `/lp/early-intervention` CTA from `/library/how-many-hours-aba-child-need` is
  provisionally `/client-consultation` locally. These are not approved equivalents.
  Do not import the separate landing-pages repository, create a redirect or
  activate a form without explicit authorization.
- **Employee portal — P9-02:** staff/management access separation, authentication,
  authorization and employee/clinical data security remain unresolved; current
  metadata-only route is not a completed portal. See the
  [portal brief](employee-portal-migration-brief-2026-10-08.md).
- **Likes/views API — P9-04:** production fallback outside localhost includes
  credentialed stats requests and interaction writes. Empty configuration/noindex
  do not isolate it. Hosted review requires separately authorized fail-closed
  isolation and evidence of zero production API traffic.
- **Author SEO:** keep archives self-canonical, `noindex,follow` in indexing-enabled
  builds, sitemap-excluded and hreflang-excluded. Changes require explicit approval.
- **Forms/privacy/analytics/advertising:** approve form destinations and submission
  APIs, HIPAA/privacy safeguards, consent/analytics, Google Ads conversion tracking
  and each production integration's activation. No new PHI flow is authorized.
- **Hosting/release:** separately verify Contabo/NixOS deployment assumptions,
  HTTPS, canonical host, slashless URLs, query preservation, redirect targets and
  loops, real 404 responses, asset delivery, sitemap/robots, reproducible deployment,
  rollback and organizational release approval. The temporary Docker/nginx
  trailing-slash HTTPS-to-HTTP-to-HTTPS chain remains explicitly deferred.
  Static-build success does not verify these deployed behaviors.

## Next: Phase 9 — Human-Decision Gates

Begin from the actual signed Phase 8 commit supplied by the user; verify branch,
HEAD, history and working tree. Review [P9-01 through P9-10](phase-9-decision-register-2026-10-14.md)
and gather evidence/owner decisions before proposing bounded implementation:
landing-page ownership; portal security/access; forms/APIs; likes/views isolation;
analytics/consent/Ads; clinical/organizational claims; policy/legal/provenance;
author SEO; hosting/rollback; production authorization. All ten remain **Pending decision**.
Do not infer approval from a technically feasible option or this checkpoint.

Use the [nonproduction plan](phase-7-nonproduction-verification-plan-2026-10-14.md)
and [reviewer procedure](phase-8-host-browser-verification-2026-10-14.md) for remaining
human acceptance. No hosted preview before approved fail-closed integration
isolation. Phase 10 retains final QA, deployed routing/integration tests,
rollback rehearsal and cutover readiness. Neither phase is authorized for live
changes by this handoff. The user separately authorizes each implementation scope.

## Working protocol and protected local files

Preserve the Markdown-first manifest-driven architecture, explicit translation
relationships and ratified publication policies. Implement only authorized scope;
report evidence and structural diffs before the user stages or commits. Follow
`AUTONOMOUS-CODEX.md`; do not repair identity/signing or bypass sandbox restrictions.

Do not read, modify, move, delete, stage or checksum root `merge-plan.md`.
Preserve and exclude these four superseded reconciliation reports without
reading or modifying their contents:

- `www/reports/route-reconciliation-2026-10-11-offline.json`
- `www/reports/route-reconciliation-2026-10-12-offline.json`
- `www/reports/route-reconciliation-2026-10-13-offline.json`
- `www/reports/route-reconciliation-2026-10-13-offline-06-16-06-857Z.json`

Exclude root `merge-plan.md` and temporary `.phase8-stage-paths.nul` as well.
The old `.phase7-stage-paths.nul` is absent; do not recreate it.
The staging aid is for the user's host terminal only; never stage it or use a
broad Git add. The actual future checkpoint SHA comes from Git after the user
signs; do not amend merely to insert it here.
