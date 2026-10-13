# AIA Astro Migration — Living Session Handoff

**Last updated:** October 13, 2026 (UTC)
**Repository:** `AIAMarketing/azinstitute4autism.com`
**Working branch:** `faithful-astro-migration`
**Last accepted technical implementation:** Phase 6C — Library Content and Multilingual Parity
**Previous accepted checkpoint:** Phase 6B.5, `a699d467f19fafbfdda5fce1ce6226baa6e5fc3c`
**Implementation checkpoint:** the commit containing this handoff update; obtain its actual SHA from Git history after the user creates the signed commit.
**Next work:** read-only production-readiness and integration-gap assessment within the existing migration roadmap.

Phase 6C is technically accepted for checkpoint preparation. Editorial,
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
implementation/evidence paths; this handoff adds the 149th checkpoint path.
Historical phase records retain their original context.

## Verified technical baseline

| Metric | Result |
|---|---:|
| Library articles / locale search records | 55 EN / 12 ES / 7 AR = 74 |
| Generated HTML routes / unique canonical targets | 121 / 121 |
| Author archive routes | 9 |
| Indexing-enabled sitemap URLs | 107 |
| Hreflang links / participating routes | 174 / 53 |
| Repository redirect definitions | 9, not activated on deployed hosts |
| Visible/schema-aligned FAQ answers / articles | 182 / 30 |

English Library and author pagination is `10/10/10/10/10/5`; Spanish is `10/2`,
Arabic is one seven-article root. Page 6 is derived, with no page 7 or page-one
HTML alias. Search remains locale-scoped, metadata-only and demand-loaded.
Publication ordering uses original dates, not modification dates. Existing
syndicated external-canonical/noindex exceptions remain unchanged.

Normal staging output is **121 `noindex,nofollow` HTML pages, an empty sitemap
and no hreflang**. Indexing-enabled validation is local only. No deployment,
redirect activation, form submission or production integration is authorized.

Final source-matching offline evidence is
[the October 13 final reconciliation](route-reconciliation-2026-10-13-offline-06-21-20-316Z.json):
133 dispositions, 70 historical production requests, schema 2. Its source
fingerprint is `f11726b057b1d2f0a59ee1b952d847712caab05cf2f1539b36e80442372f2b00`.
Use the explicit evidence path for read-only checks; do not select an excluded
intermediate automatically or recrawl production to refresh a timestamp.

The final parity classifications are 10 confirmed, 58 with accepted intentional
deviations, one minor discrepancy, five requiring human review, zero material
discrepancies and zero insufficient-verification records against the selected
evidence. Findings rely on dated, sometimes cached/prerendered public HubSpot
representations; they do not establish independent current origin freshness.
The newer Arabic antecedent/consequence translation intentionally supersedes
its outdated public Arabic body. Machine-assisted work is not professional approval.

Checkpoint preparation revalidation on October 13 passed sequentially with
`TMPDIR=/tmp`: Astro check (91 files, zero diagnostics), Markdown 20,
publication 33, SEO 35, Library 45 and route 10 tests; both build modes;
link/image/blog audits with zero failures; explicit offline consistency check;
and `git diff --check`. The last build restores normal staging safeguards.
Git identity/signing remains the user’s host-terminal responsibility.

## Outstanding Stakeholder Review and Production Release Gates

- **Clinical/organizational — AIA:** approve eligibility and program-specific
  ranges against general ABA eligibility of **18 months through eight years**;
  resolve the summer-routine age discrepancy. Review Preparatory Academy ages
  2–6 and 1:2 delivery ratio, ABA versus education, Arizona educational guidance,
  functional assessment, behavior intervention, reinforcement, extinction,
  aggression, self-injury, safety, treatment/outcome claims and author roles,
  credentials and biographies. Source publication alone is not clinical approval.
- **Fluent Spanish/Arabic and clinical review:** revised Spanish school readiness,
  rewritten Arabic antecedent/consequence guidance and terminology, all three
  localized Arabic diagrams, localized self-advocacy Halloween additions,
  operational labels and cross-language notices remain pending.
- **Minor localization:** `/es/library/positive-reinforcement-techniques` retains
  a source-inherited English tip paragraph under “Por qué el refuerzo positivo
  es importante en el ABA”. It needs bounded fluent/editorial correction;
  checkpoint preparation does not close it.
- **Browser/accessibility:** desktop and approximately 390px mobile, keyboard
  focus, JavaScript-disabled browsing, RTL reading order and diagram scrolling,
  Arabic visual-language acceptance and a real screen-reader session remain
  required. Autonomous browser attempts failed. SVG raster inspection and
  generated HTML checks do not constitute browser or assistive-technology acceptance.
- **Landing-page ownership — Phase 9 owner gate:** the public
  `/lp/early-intervention` CTA from `/library/how-many-hours-aba-child-need` is
  provisionally `/client-consultation` locally. These are not approved equivalents.
  Do not import the separate landing-pages repository, create a redirect or
  activate a form without explicit authorization.
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

## Next: production-readiness planning and verification

Start from the signed checkpoint SHA supplied by the user and verify Git history.
Begin with a read-only architecture and integration-gap inventory, not another
Library migration or live configuration change. Use the existing roadmap's
Phase 7 language/form review, Phase 8 full-page visual fidelity and Phase 9
human-decision gates; do not renumber or invent a conflicting implementation phase.

Inventory Astro/static deployment and environment configuration; hosting
assumptions; route/redirect requirements; form/API ownership; landing-page and
employee-portal decisions; privacy, consent and analytics; nonproduction browser
and accessibility acceptance; rollback and cutover sequencing. Consult the
[employee-portal decision record](employee-portal-migration-brief-2026-10-08.md)
without retrieving private staff or clinical records.

Produce a plan separating safe nonproduction technical work, stakeholder
questions, live-impacting actions and deferred activation. Stop for review before
implementation or production configuration changes. No DNS, nginx, Cloudflare,
forms, analytics, advertising or deployment authorization is implied.

## Working protocol and protected local files

Preserve the Markdown-first manifest-driven architecture, explicit translation
relationships and ratified publication policies. Implement only authorized scope;
report evidence and structural diffs before the user stages or commits. Follow
`AUTONOMOUS-CODEX.md`; do not repair identity/signing or bypass sandbox restrictions.

Do not read, modify, move, delete, stage or checksum root `merge-plan.md`.
Preserve all four superseded reconciliation files listed under exclusions in the
checkpoint manifest. Exclude those five files and temporary `.phase6c-stage-paths.nul`
from the commit. The staging aid is for the user's host terminal only.
