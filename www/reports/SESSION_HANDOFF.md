# AIA Astro Migration — Living Session Handoff

**Last updated:** October 9, 2026 (America/Phoenix)  
**Repository:** `AIAMarketing/azinstitute4autism.com`  
**Working branch:** `faithful-astro-migration`  
**Last completed *implementation* checkpoint:** `6f5ac3c0d233cee5fbbb62be79bc6909e6bec183` (Phase 6B.2)  
**Next planned milestone:** Phase 6B.3 — Author Archives and Linked Bylines

> This is a short, continually updated orientation document, not a replacement for
> the code, accepted project instructions, or detailed migration evidence.
> GitHub branch HEAD may be newer than the implementation checkpoint above
> because documentation-only commits can follow it. Always verify the branch.

## Start a new session

1. Verify the current GitHub HEAD of `faithful-astro-migration`; inspect recent
   commits rather than assuming the checkpoint recorded here is HEAD.
2. Read repository-root `AGENTS.md` (authoritative), `MIGRATION_BRIEF.md`,
   this handoff, and the relevant recent sections of
   `www/reports/migration-summary.md`.
3. For Library architecture, read
   `www/reports/phase-6a-library-architecture.md` **together with the
   subsequently accepted Phase 6A ratification in the migration summary**.
   The ratification supersedes conflicting proposals in the original document.
4. Inspect the relevant code before drafting the next complete Codex kickoff
   prompt. Do not presume an implementation is finished because it was planned.
5. Continue only the next explicitly approved milestone.

## Verified implementation state

- Phase 5C Team reconciliation: `34d5394b3ce765028a27b9cddd9952de3f09bfe7`.
- Phase 6A Library architecture proposal: `76a035424dc5245443476b168d8c91ea62eed27b`.
- Phase 6B.1 multilingual metadata search: `b20c253383440598c2d07bf6f852906ac00c42df`.
- **Phase 6B.2 static Library pagination and redirect definitions:
  `6f5ac3c0d233cee5fbbb62be79bc6909e6bec183`.**
  This commit has parent `b20c253383440598c2d07bf6f852906ac00c42df`,
  message `feat(library): add static pagination and page-one redirects`, and
  exactly 18 changed files. GitHub verification confirmed all three.

Other earlier milestones and acceptance details are recorded in
`www/reports/migration-summary.md`. Keep phase checkpoints separate.

### Phase 6B.2 completed behavior

- **65 eligible Library posts:** 46 English, 12 Spanish, seven Arabic.
  English pagination contains 10/10/10/10/6 cards on five pages; Spanish
  contains 10/2 on two pages; Arabic has seven on its single Library root.
- Generated numbered Library routes: `/library/page/2` through
  `/library/page/5` and `/es/library/page/2`.
- Existing metadata-only, locale-scoped Library search and Library-only
  `/search` compatibility survive pagination. Searches use the full locale
  index, even from numbered pages; clear/reset restores that archive page.
- Library first-page 301 definitions were added for `/library/page/1`,
  `/es/library/page/1`, and `/ar/library/page/1`. Isolated nginx redirect
  tests passed. **These rules have not been activated in the deployed staging
  or production nginx configuration.**
- Phase 6B.2 reported 25 Library + 34 SEO + 33 publication + 20 Markdown
  passing tests, 36 headless Chromium checks, and clean route/link/image/blog
  audits. No particular screen reader was claimed to have been tested.
- Normal staging build: **102 HTML routes**, all `noindex,nofollow`, empty
  sitemap, no hreflang. Indexing-enabled test build: **97 sitemap URLs**,
  **174 hreflang links over 53 routes**. Restore normal staging build after
  an indexing-enabled test.
- Phase 6B.1 separately received manual browser acceptance through the user's
  built-static-site nginx staging domain `https://aia.web3app.dev`.
  Do not conflate that evidence with the Phase 6B.2 headless Chromium checks.

## Ratified Library rules to retain

- Use the existing publication-eligible catalog and explicit translation
  relationships. Ten posts/page; publication date descending, normalized
  route ascending to break ties. Generate only nonempty numbered pages.
- Library page 1 is the unnumbered root. Numbered Library pages are
  self-canonical, indexable in an authorized indexing-enabled build,
  sitemap-eligible, and **not** numbered-page hreflang equivalents.
- Retain two accessible English syndicated records in listings and search;
  preserve their external canonicals, `noindex`, sitemap and hreflang exclusions.
- Embedded search is metadata-only and client-side with language-specific
  static JSON. Legacy `/search` accepts previous parameters but initially
  searches Library articles, **not** the entire website. No external search
  provider or query tracking.
- Author archives, once generated, are **initially `noindex,follow` and
  outside the sitemap**. Only reviewed, indexable author roots may later receive
  reciprocal hreflang via explicit translation keys; never infer numbered
  archive equivalents.
- Do not manufacture missing content or redirect distinct later pagination
  pages to earlier pages.

## Next: Phase 6B.3 — Author Archives and Linked Bylines

Prepare a **new, self-contained Codex CLI kickoff prompt**, grounded in the
latest source and the ratified 6A/6B decisions, for this milestone only.

Expected scope, subject to targeted inspection:

- Generate language-specific author archive roots and nonempty numbered pages
  from exact locale/author references and the shared eligible-post catalog,
  reusing the ten-item pagination helper rather than manual article lists.
- Preserve current known author URLs including
  `/library/author/rula-diab`, `/es/library/author/rula-diab`, and
  `/ar/library/author/rula-diab`. Current corpus would support five English
  author pages, two Spanish, and one Arabic. Do not invent English page 6.
- Link article cards and post bylines to the correct locale author archive.
  Share exact locale/slug author resolution with BlogPosting Person semantics;
  fail on missing/ambiguous author records. Keep author and Team membership
  separate, and do not infer employment changes.
- Reconcile published author headings and biographies only against traceable,
  sufficiently current public source material; distinguish potentially stale
  HubSpot prerenders. Add optional localized `displayName` only if warranted.
  Substantive Spanish/Arabic biography or navigation text requires human review.
- Keep author archives `noindex,follow` and outside the sitemap/hreflang graph
  at this milestone. Keep existing Library-root hreflang unchanged.
- Plan first-page author alias redirects using the existing redirect registry,
  respecting the Phase 6B.3/6B.4 boundary and separate host-activation gate.
- Preserve current search, pagination, publication, staging SEO protections,
  and static hosting. Include browser/keyboard/RTL/no-JavaScript tests.
- Do not implement Phase 6C missing articles or deploy hosting rules.

## Outstanding blockers and subsequent milestones

1. **Phase 6C:** Nine missing English Library articles must be reconciled from
   source before `/library/page/6` and
   `/library/author/rula-diab/page/6` can be accepted for cutover.
   Do not generate empty substitutes or misleading redirects.
2. **Phase 6B.4:** Complete URL, canonical, sitemap, and redirect reconciliation;
   host activation requires separate approval.
3. **Phase 6B.5:** Multilingual, RTL, accessibility, and performance acceptance.
   Spanish/Arabic search and pagination microcopy awaits human language review.
4. **Later phases:** Other content and language reconciliation (including
   missing Spanish privacy content), visual/accessibility review, operational
   integration decisions, and cutover.
5. Site remains primarily live on HubSpot; production-origin freshness is not
   proved by cached prerender responses. Stage locally or at
   `aia.web3app.dev` without activating production forms, analytics,
   advertising tags, or new PHI flows.
6. AIA general ABA ages are **18 months through 8 years**; narrower programs
   have their own eligibility and should not be conflated.

## Working protocol and handoff maintenance

1. Provide a complete, bounded Codex kickoff prompt; Codex implements locally
   and reports validation plus a structural diff **without staging/committing**.
2. Review the results and, where needed, perform manual browser acceptance
   against built static files via the user's Docker/nginx reverse-proxy staging
   setup. The user runs the serving command from the built output directory;
   `npm run preview` is not required to duplicate that environment.
3. After explicit approval, provide a narrow checkpoint commit prompt.
   Codex commits only reviewed files; **do not automatically push**. The user
   pushes, and the next session verifies GitHub HEAD.
4. No production hosting/redirect activation, forms, analytics, search logging,
   dependency upgrades, fabricated translations, or unrelated modifications
   without separate authorization.
5. Preserve the user's untracked root `merge-plan.md` (not stored on GitHub);
   user/Codex-reported SHA-256:
   `015db80cdbaf7d68799265d2070db760155c342b432ce6795f17ebc2218c641c`.
   A remote GitHub write cannot verify this local untracked file.
6. **Update this handoff at every accepted milestone transition:** refresh
   last completed implementation checkpoint, next task, acceptance numbers,
   blockers, and status of deployed-vs-repository redirects. Keep it short;
   detailed validation belongs in `migration-summary.md`. Preserve the original
   architecture proposal and dated historical records rather than rewriting
   decisions retroactively.
