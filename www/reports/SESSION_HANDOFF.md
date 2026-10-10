# AIA Astro Migration — Living Session Handoff

**Last updated:** October 10, 2026 (UTC)
**Repository:** `AIAMarketing/azinstitute4autism.com`  
**Working branch:** `faithful-astro-migration`  
**Last accepted implementation:** Phase 6B.3 — Author Archives and Linked Bylines
**Verified pre-commit parent:** `0957c06a18726a01531f5b46a1d74bc67aa58f60`
**Implementation checkpoint:** the commit containing this handoff update; obtain its actual SHA from Git history
**Next planned milestone:** Phase 6B.4 — URL and SEO Reconciliation

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
- Phase 6B.2 static Library pagination and redirect definitions:
  `6f5ac3c0d233cee5fbbb62be79bc6909e6bec183`.
- **Phase 6B.3 author archives and linked bylines: accepted in the checkpoint
  containing this handoff, with pre-commit parent
  `0957c06a18726a01531f5b46a1d74bc67aa58f60`.** The file intentionally does
  not invent the containing commit's SHA; verify it from Git history.

Other earlier milestones and acceptance details are recorded in
`www/reports/migration-summary.md`. Keep phase checkpoints separate.

### Phase 6B.3 accepted behavior

- **65 eligible Library posts:** 46 English, 12 Spanish, seven Arabic.
  Author archive pagination is 10/10/10/10/6 English, 10/2 Spanish, and seven
  Arabic, producing eight routes without a fabricated English page 6.
- Generated author routes are English `/library/author/rula-diab` plus pages
  2–5, Spanish `/es/library/author/rula-diab` plus page 2, and Arabic
  `/ar/library/author/rula-diab`.
- Exact locale/slug author resolution now supplies archives, Library cards,
  full-post bylines, catalog metadata, and BlogPosting identity. Published
  localized headings and biographies are stored in the author collection; the
  verified 755-pixel portrait is self-hosted. Underlying Person identity stays
  separate from credentialed presentation text and from Team membership.
- Archive bylines link to the correct locale route. Author archives remain
  self-canonical, `noindex,follow`, sitemap-excluded, and hreflang-excluded in
  indexing-enabled builds. Existing Library roots, search, pagination,
  syndicated exceptions, and article schema remain intact.
- Automated acceptance: 31 Library, 34 SEO, 33 publication, and 20 Markdown
  tests; 39 headless Chromium checks; clean route/link/image/blog audits; 110
  HTML routes, 97 indexing-enabled sitemap URLs, and 174 hreflang links across
  53 routes. The final staging build has all 110 pages `noindex,nofollow`, an
  empty sitemap, and no hreflang.
- The user separately completed the Phase 6B.3 manual browser checklist for all
  three languages, first/final pages, biography/portrait, bylines, mobile, RTL,
  keyboard focus, and existing Library behavior. No screen-reader test,
  professional language approval, or organizational credential verification
  is claimed.
- Spanish and Arabic biographies/headings remain ready for human language
  review; public biographical, credential, role, and employment claims remain
  ready for organizational review if required.
- Phase 6B.2's three Library `/page/1` redirect definitions remain repository
  artifacts only. They have not been activated on deployed staging or
  production hosts.
- No production deployment or cutover has been authorized.

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

## Next: Phase 6B.4 — URL and SEO Reconciliation

Prepare a bounded, separately reviewed Phase 6B.4 kickoff from the latest
committed source. Reconcile URL, canonical, sitemap, and redirect behavior,
including the three author `/page/1` aliases. Do not activate repository
redirects on deployed hosts without a separate approval gate. Phase 6B.5 then
handles multilingual, RTL, accessibility, and performance acceptance.

## Outstanding blockers and subsequent milestones

1. **Phase 6C:** Nine missing English Library articles must be reconciled from
   source before `/library/page/6` and
   `/library/author/rula-diab/page/6` can be accepted for cutover.
   Do not generate empty substitutes or misleading redirects.
2. **Phase 6B.4:** Complete URL, canonical, sitemap, and redirect reconciliation,
   including author first-page aliases; host activation requires separate
   approval.
3. **Phase 6B.5:** Multilingual, RTL, accessibility, and performance acceptance.
   This includes human review of Spanish/Arabic content and three newly observed
   defects: Arabic footer contact direction, an apparently unresponsive Arabic
   author-archive language selector, and locale-inappropriate desktop/mobile/
   footer navigation destinations. Code inspection suggests the selector is
   coupled to SEO translation edges and Arabic MainNav falls back to English,
   but those are hypotheses requiring targeted verification. Visitor language
   navigation may use explicitly validated published counterparts without
   enabling author hreflang, indexing, or sitemap participation.
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
