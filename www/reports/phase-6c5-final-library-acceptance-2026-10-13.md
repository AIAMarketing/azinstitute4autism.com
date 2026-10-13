# Phase 6C.5 — Final Library parity validation and checkpoint readiness — 2026-10-13

**Recommendation: Technically ready with documented nontechnical release gates.** This is implementation review evidence, not user acceptance, professional approval or production authorization. No staging, commit, push, deployment or handoff transition occurred.

## Starting state and scope

Verified branch `faithful-astro-migration`, HEAD `a699d467f19fafbfdda5fce1ce6226baa6e5fc3c`, empty staging area. Starting cumulative status: 75 modified tracked files, two deleted Markdown files replaced by MDX, and 71 untracked files. Existing Phase 6C–6C.4 work and protected files were preserved. Repository policy, migration brief, ratification, living handoff and dated phase reports were reviewed. The handoff still identifies Phase 6B.5 as the last accepted checkpoint.

## Evidence and comparison method

The actual content collection and shared publication helpers yield 55 English, 12 Spanish and seven Arabic articles. All 74 built articles were compared with saved public bodies: 66 October 11 supplemental-audit responses, two later Phase 6C.2 responses and six bounded October 13 Phase 6C.4 responses. Metadata also uses the October 12 Phase 6C.3 evidence. No new public request, production crawl, form, query or conversion was made in this phase. Exact route-specific source times, final URLs, cache qualifiers, hashes, metadata, structure and decisions are in [the final evidence JSON](phase-6c5-final-parity-evidence-2026-10-13.json).

Comparison covered titles/descriptions/H1, original and supported modified dates, authors/canonicals/eligibility, opening and closing paragraphs, all body text, heading order, lists, tables, FAQs, images/alternatives, contextual/external links, CTA and footer relationships. Equivalent whitespace, HTML entities, typographic apostrophes/quotes and markup were normalized; changed words, link destinations and structural losses were not hidden. Native FAQ disclosure headings differ from HubSpot heading wrappers by design. All final visible FAQ answers were compared separately with their emitted schema. Image identity/localization relies on source-backed asset provenance and the earlier individual featured-image review; this was not a fresh visual re-review of all 74 hero images.

All body evidence is cache-qualified HubSpot/prerender output. HIT/MISS/REVALIDATED does not establish origin freshness. These classifications describe parity with the dated publicly observed versions, not independently current origin content or full browser-rendered parity. The Halloween guide has a complete recovered body from public GET evidence, but its independent web-reader retrieval failed in Phase 6C; that special freshness limitation remains. The original 74-article diagnostic audit and prior phase evidence are unchanged.

## Final classification totals

| Classification | Articles |
|---|---:|
| Parity confirmed | 10 |
| Parity with accepted intentional deviations | 58 |
| Minor discrepancy remaining | 1 |
| Material discrepancy remaining | 0 |
| Human review required | 5 |
| Insufficient verification | 0 |

“Accepted intentional deviations” means previously authorized implementation choices (descriptive alt, explicit canonicals, obfuscation, localized navigation annotations or static image interaction), not an assertion of human acceptance of this milestone. Human-review classifications identify the new Arabic translation, both localized self-advocacy additions, summer eligibility disagreement and the consultation CTA ownership gate. All other Spanish/Arabic rows still have a secondary fluent-language review requirement. No article is marked insufficient solely because its dated evidence is cached; none is claimed freshly verified at origin.

### Complete 74-article matrix

H/T/I/Q = substantive headings (including any post-FAQ conclusion) / semantic tables / body images / FAQ answers. Exact headings, publication/modification dates, metadata, alt, source provenance and exceptions are in the evidence JSON.

| Article route | Final classification | H/T/I/Q | Decision or remaining review |
|---|---|---|---|
| `/ar/library/aba-school-readiness-guide` | Human review required | 20/3/3/6 | New complete Arabic translation follows current English, not the superseded public Arabic body; fluent/clinical/diagram acceptance pending. Specific school-access/program/clinical qualifications require professional/AIA review. Fluent review pending. |
| `/ar/library/autism-self-advocacy-skills-aba` | Human review required | 3/0/0/0 | New localized Halloween passage and English destination notice require fluent review. Fluent review pending. |
| `/ar/library/behavior-management-functions-guide` | Parity with intentional deviations | 1/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Footer labels for antecedent/consequence use the accepted current Arabic H1 instead of the superseded public back-to-school title; relationships retained. Fluent review pending. |
| `/ar/library/executive-functioning-skills-autism` | Parity with intentional deviations | 9/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Footer labels for antecedent/consequence use the accepted current Arabic H1 instead of the superseded public back-to-school title; relationships retained. Fluent review pending. |
| `/ar/library/first-then-cards-autism-transitions` | Parity with intentional deviations | 6/1/1/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; H1 retains equivalent Arabic fathatan placement in أولًا versus source أولاً; wording and meaning unchanged. Fluent review pending. |
| `/ar/library/positive-reinforcement-techniques` | Parity with intentional deviations | 14/5/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Footer labels for antecedent/consequence use the accepted current Arabic H1 instead of the superseded public back-to-school title; relationships retained. Fluent review pending. |
| `/ar/library/proactive-reactive-aba-strategies-guide` | Parity with intentional deviations | 2/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/es/library/aba-school-readiness-arizona` | Parity with intentional deviations | 18/1/2/9 | Retain accepted (en inglés) labels on seven English-target contextual links. Fluent review pending. |
| `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` | Parity with intentional deviations | 10/3/0/6 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/es/library/autism-evaluation-what-to-expect` | Parity with intentional deviations | 9/1/0/8 | Restored source 3-column/3-row semantic table; words and CDC link preserved. Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/es/library/autism-family-self-care-tips` | Parity with intentional deviations | 3/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/es/library/autism-self-advocacy-skills-aba` | Human review required | 3/0/0/0 | New localized Halloween passage and English destination notice require fluent review. Fluent review pending. |
| `/es/library/emotional-regulation-aba` | Parity with intentional deviations | 14/1/0/6 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/es/library/enhancing-generalization-skills` | Parity with intentional deviations | 3/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Intentional static ContactObfuscation fallback; runtime component unchanged. Fluent review pending. |
| `/es/library/executive-functioning-skills-autism` | Parity with intentional deviations | 9/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/es/library/first-then-cards-autism-transitions` | Parity with intentional deviations | 6/1/1/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/es/library/parents-guide-to-autism-and-aba` | Parity with intentional deviations | 10/2/2/6 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/es/library/positive-reinforcement-techniques` | Minor discrepancy remaining | 14/5/0/0 | One source-inherited English Tip paragraph remains under “Por qué el refuerzo positivo es importante en el ABA”. Meaning is aligned, but Spanish localization is incomplete; request a bounded fluent-reviewed translation. Fluent review pending. |
| `/es/library/social-pragmatic-communication-autism` | Parity with intentional deviations | 14/1/0/6 | Separated opening H2 from its following quoted paragraph; no wording change. Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. Fluent review pending. |
| `/library/aac-visual-supports-autism` | Parity with intentional deviations | 5/1/0/8 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/aba-school-readiness-arizona` | Parity confirmed | 18/1/2/9 | Matches selected public evidence. |
| `/library/aba-school-readiness-guide` | Parity confirmed | 20/3/3/6 | Matches selected public evidence. |
| `/library/aba-therapy-benefits` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/aba-therapy-dtt-net-guide` | Parity with intentional deviations | 3/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/aba-therapy-prompting-parenting-benefits` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/aba-therapy-summer-routine-tips` | Human review required | 10/1/2/9 | Local 2–17 and 2–8 age statements differ from public 18 months–17 years and 18 months–8 years. Program scope and approved general ABA baseline require AIA clinical/organizational decision. |
| `/library/aba-toilet-training-child-autism` | Parity with intentional deviations | 16/0/0/0 | Separated ten inline H3 labels from adjoining list prose, preserving all words and source list structure. Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/aia-world-autism-community-day-celebration` | Parity with intentional deviations | 4/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake` | Parity with intentional deviations | 4/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/asd-sensory-friendly-recipes-pancakes` | Parity with intentional deviations | 7/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/autism-after-school-meltdowns` | Parity confirmed | 24/1/5/3 | Matches selected public evidence. |
| `/library/autism-back-to-school-transition` | Parity confirmed | 18/1/2/3 | Matches selected public evidence. |
| `/library/autism-daily-living-skills-challenges` | Parity confirmed | 7/1/2/6 | Matches selected public evidence. |
| `/library/autism-evaluation-diagnosis-arizona-parent-guide` | Parity with intentional deviations | 10/3/0/6 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/autism-evaluation-what-to-expect` | Parity with intentional deviations | 9/1/0/8 | Restored source 3-column/3-row semantic table; words and CDC link preserved. Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/autism-fall-break-routine-tips-halloween-thanksgiving` | Parity confirmed | 9/2/2/6 | Matches selected public evidence. |
| `/library/autism-family-self-care-tips` | Parity with intentional deviations | 3/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/autism-friendships-social-play-support` | Parity with intentional deviations | 6/1/1/8 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/autism-self-advocacy-skills-aba` | Parity with intentional deviations | 3/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/autism-social-skills-by-age` | Parity confirmed | 13/1/3/3 | Matches selected public evidence. |
| `/library/autism-therapy-rapport-strategies` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/behavior-management-functions-guide` | Parity with intentional deviations | 1/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/behavior-modification-techniques-reinforcement-theory` | Parity with intentional deviations | 4/0/1/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged.; Source /hubfs/abc-data-template-download.png uses identical self-hosted /assets/images/abc-data-template-download.png (SHA-256 matched). |
| `/library/communication-social-skills-autistic-children-guide` | Parity with intentional deviations | 10/1/0/6 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/community-highlight-meet-rula-diab` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Accepted syndicated external canonical/noindex/schema exclusion retained. |
| `/library/critical-thinking-skills` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/does-aba-therapy-replace-school` | Parity confirmed | 7/1/2/4 | Matches selected public evidence. |
| `/library/early-signs-autism-by-age` | Parity with intentional deviations | 25/1/0/6 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/emotional-regulation-aba` | Parity with intentional deviations | 14/1/0/6 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/enhancing-generalization-skills` | Parity with intentional deviations | 3/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/executive-functioning-skills-autism` | Parity with intentional deviations | 9/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/first-then-cards-autism-transitions` | Parity with intentional deviations | 6/1/1/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/halloween-and-autism` | Parity confirmed | 11/1/2/3 | Matches selected public evidence. |
| `/library/heart-full-of-gratitude` | Parity with intentional deviations | 1/0/1/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/how-many-hours-aba-child-need` | Human review required | 11/0/2/7 | Source /lp/early-intervention is provisionally /client-consultation locally; ownership/equivalence awaits Phase 9 owner decision. |
| `/library/individualized-aba-therapy` | Parity with intentional deviations | 3/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/integrated-aba-model-announcement` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/managing-aggressive-behavior-outbursts` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/meet-rula-diab-bcba` | Parity with intentional deviations | 3/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained. |
| `/library/new-aia-scottsdale-office` | Parity with intentional deviations | 4/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Accepted syndicated external canonical/noindex/schema exclusion retained. |
| `/library/new-year-2024-autism-holiday-tips` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/new-year-goals-2023` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/november-2022-aia-update` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained. |
| `/library/parents-guide-to-autism-and-aba` | Parity with intentional deviations | 10/2/2/6 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/picky-eating-autism-parent-guide` | Parity with intentional deviations | 24/1/4/5 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/play-leisure-skills` | Parity with intentional deviations | 13/0/2/4 | Moved existing closing CTA out of final FAQ into its source-supported position after accordion; four Q/A unchanged otherwise. Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Two static full-size self-hosted image links replace HubSpot lightboxes; duplicate hidden expansions and orphan close symbols removed. |
| `/library/positive-reinforcement-techniques` | Parity with intentional deviations | 14/5/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/proactive-reactive-aba-strategies-guide` | Parity with intentional deviations | 2/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/reduce-behavior-management` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/repetitive-behavior` | Parity with intentional deviations | 1/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |
| `/library/sensory-processing` | Parity with intentional deviations | 0/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/sleep-issues-autistic-children` | Parity confirmed | 13/1/2/7 | Matches selected public evidence. |
| `/library/social-pragmatic-communication-autism` | Parity with intentional deviations | 14/1/0/6 | Separated opening H2 from its following quoted paragraph; no wording change. Reviewed descriptive featured alt replaces source wording; locale review remains where applicable. |
| `/library/understanding-autism-support` | Parity with intentional deviations | 6/0/0/0 | Reviewed descriptive featured alt replaces source wording; locale review remains where applicable.; Source omits canonical; approved self-canonical retained.; Intentional static ContactObfuscation fallback; runtime component unchanged. |

## Narrow final corrections

These corrections restore structure or visual containment without rewriting substantive guidance, frontmatter, dates, author identities, image descriptions, footer recommendations, publication policy or navigation. A phase-start versus final generated-body comparison confirms unchanged word/punctuation sequences on all 74 articles; existing frontmatter blocks also remain unchanged from the Phase 6C.4 snapshot.

- `www/src/content/blog/es/autism-evaluation-what-to-expect.mdx` — Restored source 3-column/3-row semantic table; words and CDC link preserved.
- `www/src/content/blog/es/social-pragmatic-communication-autism.mdx` — Separated opening H2 from its following quoted paragraph; no wording change.
- `www/src/content/blog/en/aba-toilet-training-child-autism.mdx` — Separated ten inline H3 labels from adjoining list prose, preserving all words and source list structure.
- `www/src/content/blog/en/autism-evaluation-what-to-expect.mdx` — Restored source 3-column/3-row semantic table; words and CDC link preserved.
- `www/src/content/blog/en/play-leisure-skills.mdx` — Moved existing closing CTA out of final FAQ into its source-supported position after accordion; four Q/A unchanged otherwise.
- `www/src/content/blog/en/social-pragmatic-communication-autism.mdx` — Separated opening H2 from its following quoted paragraph; no wording change.
- `www/src/styles/blog.css` — one scoped inline-H3 rule preserves the public toilet-training label/prose presentation.
- `www/public/assets/images/reinforcement-replacement-behavior_ar.svg` — wraps the existing Arabic Path A subtitle into two lines; wording unchanged.
- `www/public/assets/images/reduce-environmental-distractions_ar.svg` — moves the poster overlay from y=45 to y=35, concealing exposed original English title pixels.
- `www/tools/library.test.mjs` — meaningful table row/header/link and FAQ-boundary assertions; one new generated-heading/list-structure test. Library test count increases from 44 to 45.

## Nine restored English articles

Each remains complete in the selected public evidence, with Rula Diab attribution, local canonical, metadata-only English search inclusion, valid body/featured assets, source-backed footers and BlogPosting/FAQPage output. No manual page or article registry was added.

| Route suffix under `/library/` | Publication / modification | Body words | Body images | FAQs |
|---|---|---:|---:|---:|
| `autism-after-school-meltdowns` | 2026-09-01 / 2026-09-02 | 3350 | 5 | 3 |
| `autism-back-to-school-transition` | 2026-09-10 / 2026-09-10 | 2961 | 2 | 3 |
| `autism-daily-living-skills-challenges` | 2026-07-01 / 2026-07-09 | 2524 | 2 | 6 |
| `autism-social-skills-by-age` | 2026-09-24 / 2026-09-24 | 2801 | 3 | 3 |
| `does-aba-therapy-replace-school` | 2026-07-08 / 2026-07-22 | 1681 | 2 | 4 |
| `halloween-and-autism` | 2026-10-01 / 2026-10-03 | 1946 | 2 | 3 |
| `how-many-hours-aba-child-need` | 2026-09-08 / 2026-09-08 | 2157 | 2 | 7 |
| `picky-eating-autism-parent-guide` | 2026-08-01 / 2026-10-03 | 2795 | 4 | 5 |
| `sleep-issues-autistic-children` | 2026-09-28 / 2026-09-28 | 1972 | 2 | 7 |

These nine articles introduced 33 source-backed raster assets during Phase 6C. Phase 6C.2 added eight more; three separate Arabic SVGs preserve embedded source artwork. All 41 new raster paths and three SVG paths are listed in the checkpoint manifest. No new raster image was added in this final phase.

## Five major reconciliations

| Route | Final result |
|---|---|
| `/library/aba-school-readiness-arizona` | Complete current parent guide; 18 substantive headings, one table, two infographics, nine FAQs. General ABA and Preparatory Academy qualifications retained; clinical/AIA approval pending. |
| `/es/library/aba-school-readiness-arizona` | Current published Spanish guide; 18 headings, one table, two Spanish infographics, nine FAQs; seven English destination annotations retained. Fluent/clinical review pending. |
| `/library/aba-school-readiness-guide` | Complete antecedent/consequence rewrite; 19 headings before FAQ plus the concluding AIA support heading after it; three tables, three images, six FAQs, ABC, references and conclusion. |
| `/ar/library/aba-school-readiness-guide` | Complete new Arabic counterpart to revised English; same section sequence, three tables, three Arabic diagrams and six FAQs. Old public Arabic is intentionally superseded locally; no invented Arabic modification date. |
| `/library/autism-fall-break-routine-tips-halloween-thanksgiving` | Nine substantive headings, two tables, two body images, six FAQs and one Halloween contextual link; current metadata and relationships retained. |

## All 19 translation relationships

Inventory uses explicit validated translation keys, not slug guessing. Twelve Spanish and seven Arabic relationships remain; no counterpart or key was added/removed. Seventeen pairs are classified substantively equivalent by this comparison, including source-recovered Spanish school readiness and the two self-advocacy additions. One Arabic pair is technically reconciled but awaits human semantic approval, and one Spanish pair has minor untranslated copy. This is not professional linguistic certification.

| English route | Locale / counterpart | Final classification | Review or exception |
|---|---|---|---|
| `/library/autism-evaluation-what-to-expect` | es: `/es/library/autism-evaluation-what-to-expect` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/autism-family-self-care-tips` | es: `/es/library/autism-family-self-care-tips` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/autism-self-advocacy-skills-aba` | es: `/es/library/autism-self-advocacy-skills-aba` | Substantively equivalent | Substantive alignment retained; new localized Halloween sentence ahead of public locale capture, fluent review pending. |
| `/library/enhancing-generalization-skills` | es: `/es/library/enhancing-generalization-skills` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/executive-functioning-skills-autism` | es: `/es/library/executive-functioning-skills-autism` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/first-then-cards-autism-transitions` | es: `/es/library/first-then-cards-autism-transitions` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/parents-guide-to-autism-and-aba` | es: `/es/library/parents-guide-to-autism-and-aba` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/positive-reinforcement-techniques` | es: `/es/library/positive-reinforcement-techniques` | Minor translation drift | One source-inherited English Tip paragraph remains under “Por qué el refuerzo positivo es importante en el ABA”. Meaning is aligned, but Spanish localization is incomplete; request a bounded fluent-reviewed translation. |
| `/library/autism-evaluation-diagnosis-arizona-parent-guide` | es: `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/social-pragmatic-communication-autism` | es: `/es/library/social-pragmatic-communication-autism` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/emotional-regulation-aba` | es: `/es/library/emotional-regulation-aba` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/aba-school-readiness-arizona` | es: `/es/library/aba-school-readiness-arizona` | Substantively equivalent | Recovered current public Spanish guide; fluent/clinical/organizational acceptance pending. |
| `/library/first-then-cards-autism-transitions` | ar: `/ar/library/first-then-cards-autism-transitions` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/positive-reinforcement-techniques` | ar: `/ar/library/positive-reinforcement-techniques` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/proactive-reactive-aba-strategies-guide` | ar: `/ar/library/proactive-reactive-aba-strategies-guide` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/executive-functioning-skills-autism` | ar: `/ar/library/executive-functioning-skills-autism` | Substantively equivalent | Retained; routine fluent review pending |
| `/library/autism-self-advocacy-skills-aba` | ar: `/ar/library/autism-self-advocacy-skills-aba` | Substantively equivalent | Substantive alignment retained; new localized Halloween sentence ahead of public locale capture, fluent review pending. |
| `/library/aba-school-readiness-guide` | ar: `/ar/library/aba-school-readiness-guide` | Technically reconciled; human semantic acceptance pending | Full Arabic replacement plus diagrams follows revised English; public Arabic superseded; no defensible new locale modification date. |
| `/library/behavior-management-functions-guide` | ar: `/ar/library/behavior-management-functions-guide` | Substantively equivalent | Retained; routine fluent review pending |

The Spanish reinforcement article retains an entire English “Tip” paragraph under “Por qué el refuerzo positivo es importante en el ABA”, including the specific/generic praise examples. The same paragraph is in the captured public Spanish version. It does not change the clinical meaning but is incomplete localization. It was not silently rewritten in this final audit; a bounded fluent-reviewed correction is recommended.

## Metadata, schema and clinical exceptions

- All 74 featured images retain intentional informative classification and nonempty article-language alternatives; no decorative exception was introduced. Asset references resolve. Professional language review of alternatives remains pending.
- The four formerly truncated descriptions are complete. Titles/descriptions agree with selected evidence except the intentionally new Arabic guide. The Arabic First/Then H1 differs only in fathatan placement (`أولًا` versus `أولاً`), not wording/meaning; this orthographic variation is explicitly recorded rather than counted as a missing heading.
- Original publication dates match selected source dates at calendar-date resolution. Seventy-three modification dates remain source-backed CMS metadata; the Arabic guide intentionally omits `updatedDate`. HTTP Last-Modified/prerender timestamps are not publication dates. Spanish self-advocacy’s previously reported date drift is resolved: `2026-04-09`.
- 72 BlogPosting entities identify the same Person; the two externally canonicalized syndicated posts emit none under the approved policy. Thirty FAQPage entities contain 182 answers, exactly matching visible FAQ content. The public source has six fewer because its Arabic guide is obsolete.
- Summer-routine review remains unresolved: local general ages `2–17` versus public `18 months–17 years`; local in-clinic ages `2–8` versus current public `18 months–8 years`; Social Learners Club retains its program-specific range. AIA must reconcile these with the approved general ABA baseline of 18 months through eight years. No automatic clinical substitution was made.
- AIA/clinical/editorial reviewers must assess school access and school-versus-ABA distinctions, Preparatory Academy ages 2–6 and 1:2 staffing, reinforcement/function/ignoring/extinction/safety guidance, expected outcomes, and public author credentials. Source-published claims are not independently organizationally verified here.
- Source-inherited `azinsitute4autism.com` spelling in older contact calls to action remains an owner/editorial check; ContactObfuscation was not changed.

## Arabic diagrams and accessibility

| SVG | Dimensions/viewBox | Final inspection |
|---|---|---|
| `antecedent-behavior-consequence_ar.svg` | 800×450 / `0 0 800 450` | Arabic labels and cards remain within frame; source panel order/arrows preserved; no English label exposure seen. |
| `reduce-environmental-distractions_ar.svg` | 800×450 / `0 0 800 450` | Fixed visible English title remnants by raising overlay 10px; final raster covers them and retains legible Arabic poster labels. |
| `reinforcement-replacement-behavior_ar.svg` | 800×533 / `0 0 800 533` | Fixed subtitle panel overflow by line wrapping; original English labels remain concealed; causal arrows and color distinctions retained. |

Inspection used actual 2× rasterizations, not SVG text inspection alone. Initial preview attempts lacked a usable Fontconfig configuration and did not render embedded WebP, so temporary inspection copies used installed DejaVu fonts and losslessly decoded PNG backing. No raster source or production image format was replaced. This renderer result cannot guarantee browser font fallback. Final SVG XML, titles, Arabic labels, embedded source references and MDX alternatives were inspected. All three focusable `role=region` wrappers retain Arabic accessible names, `tabindex=0`, 720px narrow-screen minimum image width, confined overflow CSS and focus outlines. Adjacent Arabic prose and tables preserve the information. Actual browser overflow/scroll/focus, fluent Arabic and screen-reader acceptance remain pending.

## Links, footer relationships and functional browsing

All 74 rendered previous/next/related structures match the final Phase 6C.4 data, allowing only typographic apostrophes. Its 37 corrected records and nine new articles’ relationships remain unchanged. Publication-aware tests verify eligibility, locale, label/order, no duplicate/self recommendations, every internal body destination and fragments. No obsolete school-readiness card title was reintroduced.

The 13 homepage normalizations, ten exact external URL corrections, two CDC links and three First/Then self-links remain. English/Spanish/Arabic self-advocacy, AAC and fall-break each retain one intended Halloween link; localized self-advocacy identifies the English-only destination. No invented translated Halloween URL exists. Links to the nine restored articles resolve. The ABC worksheet and two play/leisure full-size images use valid self-hosted anchors; all four picky-eating fragments resolve to unique IDs. Browser Back, focus and live remote text-fragment behavior still need human browser testing.

The Scottsdale original reference remains source-supported; prior requests returned 429, so live reachability is unverified, not declared broken. `/library/how-many-hours-aba-child-need` retains provisional `/client-consultation` instead of source `/lp/early-intervention`. This is a Phase 9 owner gate, not approved equivalence. No landing page, redirect or backend was created.

## Pagination, search and publication modes

| Metric | Final |
|---|---:|
| Articles / search records | 55 English / 12 Spanish / 7 Arabic = 74 |
| HTML / unique canonical targets | 121 / 121 |
| Author archive routes | 9 |
| Indexing-enabled sitemap | 107 |
| Indexing-enabled hreflang | 174 links on 53 routes |
| Repository redirects | 9, unchanged |
| Staging robots | 121 × `noindex,nofollow` |
| Staging sitemap / hreflang | 0 / 0 |

English Library and author slices are `10/10/10/10/10/5`; Spanish slices are `10/2`; Arabic has `7` on its sole root. Both English page-6 routes contain, in order:

- `/library/critical-thinking-skills`
- `/library/november-2022-aia-update`
- `/library/managing-aggressive-behavior-outbursts`
- `/library/play-leisure-skills`
- `/library/reduce-behavior-management`

Both page-6 routes self-canonicalize, identify page 6 as current and link back to the corresponding page 5. No page 7, HTML page-one alias or `/ar` homepage is generated. Library page 6 is indexable/sitemap-eligible in indexing mode; author page 6 remains `noindex,follow` and sitemap/hreflang-excluded. The source-supported ordering is derived from original publication dates and route tie-breaks, unaffected by modification dates.

Search indexes remain metadata-only with 55/12/7 records. Library tests retain Unicode/diacritic/tatweel normalization, locale scoping, hostile-input safety and query handling; the accepted client lazy-loader and navigation code are unchanged. No new browser network/performance session was possible, so Phase 6B.5 measurements are historical evidence rather than newly measured performance. Ordinary cards, pagination, image links, native FAQ and language navigation remain in static HTML; no-JavaScript interaction still needs browser confirmation.

## Automated validation and environment

| Command (from `www`, `TMPDIR=/tmp`) | Final result |
|---|---|
| `npm run check` | 91 files; zero errors, warnings or hints |
| `npm run test:markdown` | 20 passed |
| `npm run test:publication` | 33 passed |
| `npm run test:seo` | 35 passed |
| `npm run test:library` | 45 passed, including final asset correction |
| `npm run test:routes` | 10 passed |
| `npm run build` | 121 HTML routes; normal staging restored last |
| `PUBLIC_ALLOW_INDEXING=true npm run build` | 121 HTML, 107 sitemap, 174/53 hreflang, 121 unique canonicals |
| `npm run audit:links` | Zero broken internal links |
| `npm run audit:images` | Zero missing mapped images |
| `npm run audit:blog` | Zero failures |
| `git diff --check` | Passed |

Suites ran sequentially. The initial matrix passed; relevant/full checks were repeated after the bounded corrections, with the final SVG-only mask adjustment followed by Library tests, both builds and all three audits. No test expectation was weakened to conceal a discrepancy. Temporary inspection scripts initially hit an incorrect module/path and missing font setup; those were tooling issues corrected outside the repository. npm emits an existing `http-proxy` configuration deprecation warning. No dependency was added. One redundant route recheck was accidentally invoked from the repository root and failed with npm `ENOENT` (no root package.json); rerunning the same read-only check from `www` passed without source changes.

Additional generated-output checks verified all FAQ visibility/schema pairs, eligible BlogPosting counts/dates/Person, all image paths, locale/RTL, canonical uniqueness and archive slices. The full test coverage uses the shared publication manifest, not a second eligibility list. Inspection outputs and logs are in `/tmp/aia-phase6c5`; the compact reproducible results are recorded in the evidence JSON.

### Offline route evidence

Initial explicit read-only check of `route-reconciliation-2026-10-13-offline-03-01-03-889Z.json` passed before application changes. The final corrections required a new schema-2 artifact:

- `route-reconciliation-2026-10-13-offline-06-21-20-316Z.json`
- Source fingerprint: `f11726b057b1d2f0a59ee1b952d847712caab05cf2f1539b36e80442372f2b00`
- 133 dispositions, 121 local generated routes, nine local redirects, 70 inherited production requests.
- The summary’s 102 sitemap observations refer to inherited **production** evidence, not the newly generated indexing-enabled sitemap of 107 URLs.

Commands executed:

```sh
npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-13-offline-03-01-03-889Z.json
npm run audit:routes -- --offline --evidence reports/route-reconciliation-2026-10-13-offline-03-01-03-889Z.json
npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-13-offline-06-21-20-316Z.json
```

The earlier Phase 6C.5 `route-reconciliation-2026-10-13-offline-06-16-06-857Z.json` predates the final calm-corner mask correction; preserve it locally but exclude it from the proposed checkpoint. No inherited production observations were rewritten. The final explicit consistency check passes with no network or writes. Repository redirects were not deployed or HTTP-retested here; earlier isolated nginx evidence remains historical.

## Manual acceptance form

No Phase 6C.5 human, screen-reader or professional language acceptance is recorded. The bounded remote Playwright attempt returned `Transport closed`; no successful local desktop/mobile browser session is claimed. Complete the following at desktop and approximately 390×844, recording reviewer, date, viewport, pass/fail and any issue.

| Review set | Exact routes / action | Status / reviewer / date |
|---|---|---|
| Major English articles | `/library/aba-school-readiness-arizona`, `/library/aba-school-readiness-guide`, `/library/autism-fall-break-routine-tips-halloween-thanksgiving`: full body, images, tables, all FAQs, related links | Pending |
| Major translations | `/es/library/aba-school-readiness-arizona`, `/ar/library/aba-school-readiness-guide`: fluent comparison, clinical terms, all graphics, RTL and table/diagram scrolling | Pending |
| Halloween links | `/library/autism-self-advocacy-skills-aba`, `/es/library/autism-self-advocacy-skills-aba`, `/ar/library/autism-self-advocacy-skills-aba`, `/library/aac-visual-supports-autism`: one contextual link, valid English destination/language notice | Pending |
| Functional links | `/library/play-leisure-skills`, `/library/behavior-modification-techniques-reinforcement-theory`, `/library/picky-eating-autism-parent-guide`: image open/Back, worksheet, four fragments, FAQ/CTA boundary | Pending |
| Restored structure | English/Spanish `/library/autism-evaluation-what-to-expect` and `/library/social-pragmatic-communication-autism`; English `/library/aba-toilet-training-child-autism`: semantic tables, heading/prose separation | Pending |
| Final pages | `/library/page/6`, `/library/author/rula-diab/page/6`: five cards, page-5 previous, current state, no page 7, dates and bylines | Pending |
| All nine restored articles | Routes listed in the nine-article table above; full-page body/image/FAQ/source comparison | Pending |
| Locale roots | `/es/library`, `/ar/library`, `/library`: header, language navigation, footer, responsive layout | Pending |
| Accessibility | All review routes: keyboard focus/FAQ/disclosures, JavaScript disabled, no page overflow; real screen-reader landmarks/headings/links and diagram regions | Pending |

## Separate readiness and approval gates

- **Technical:** tests and generated-output audits pass; narrow structural/visual defects corrected; complete evidence and explicit proposed file manifest prepared. No unresolved material source-code regression identified.
- **Editorial/accessibility:** AIA clinical/editorial review of eligibility and the specified guidance, fluent Spanish/Arabic review (including the untranslated Spanish tip), organizational claims/credentials, Arabic visual-language acceptance, desktop/mobile keyboard/no-JavaScript review and a real screen-reader session remain. These are not marked passed by automated checks.
- **Production:** owner approval of `/lp/early-intervention`, forms/backend privacy/PHI and activation review, analytics/consent/advertising decisions, author archive SEO gates, Contabo nginx slashless/HTTPS/query/redirect/404 verification and organizational release approval remain separate. No production transition is authorized.

**Recommendation: Technically ready with documented nontechnical release gates.** Request user review of this evidence and the bounded corrections. Do not declare Phase 6C accepted or prepare its checkpoint until explicitly authorized. No next implementation milestone was begun.

## Checkpoint manifest and structural diff

The [explicit proposed checkpoint manifest](phase-6c5-checkpoint-manifest-2026-10-13.md) categorizes every changed path: required implementation, relevant historical evidence, final evidence and excluded intermediates/protected files. Historical phase-completion reports remain valuable provenance even though their fingerprints describe earlier source versions; they are not the final source-matching artifact. The separately authorized future handoff edit is intentionally absent.

<!-- STRUCTURAL_STATUS -->

Final status: **75 modified tracked, 2 deleted tracked, 76 untracked, zero staged**. The proposal includes 148 paths and excludes 5 local paths. No unexpected modifications were found. `merge-plan.md` remains untracked and untouched; no read or checksum was performed.

`git diff --stat` (tracked files only; new assets/content/reports are listed separately in the manifest):

```text
 www/reports/accessibility-audit.md                 |  81 ++-
 www/reports/blog-content-audit.md                  |   6 +-
 www/reports/migration-summary.md                   | 554 +++++++++++++++++
 www/reports/page-imagery-audit.md                  |   2 +-
 www/reports/seo-audit.md                           |  53 +-
 .../content/blog/ar/aba-school-readiness-guide.md  |  44 --
 .../blog/ar/autism-self-advocacy-skills-aba.md     |   4 +
 .../blog/ar/behavior-management-functions-guide.md |   2 +
 .../blog/ar/executive-functioning-skills-autism.md |   2 +
 .../blog/ar/first-then-cards-autism-transitions.md |   5 +-
 .../blog/ar/positive-reinforcement-techniques.md   |   2 +
 .../ar/proactive-reactive-aba-strategies-guide.md  |   4 +-
 .../content/blog/en/aac-visual-supports-autism.mdx |   4 +
 .../blog/en/aba-school-readiness-arizona.mdx       | 356 ++++++++---
 .../content/blog/en/aba-school-readiness-guide.md  |  44 --
 www/src/content/blog/en/aba-therapy-benefits.mdx   |   6 +-
 .../content/blog/en/aba-therapy-dtt-net-guide.md   |   2 +
 .../en/aba-therapy-prompting-parenting-benefits.md |   2 +
 .../blog/en/aba-therapy-summer-routine-tips.mdx    |   2 +
 .../blog/en/aba-toilet-training-child-autism.mdx   |  24 +-
 .../aia-world-autism-community-day-celebration.mdx |   2 +
 ...y-friendly-recipe-thanksgiving-pumpkin-cake.mdx |   4 +-
 .../en/asd-sensory-friendly-recipes-pancakes.mdx   |   2 +
 ...m-evaluation-diagnosis-arizona-parent-guide.mdx |   2 +
 .../blog/en/autism-evaluation-what-to-expect.mdx   |  22 +-
 ...l-break-routine-tips-halloween-thanksgiving.mdx | 209 ++-----
 .../blog/en/autism-family-self-care-tips.md        |   4 +-
 .../en/autism-friendships-social-play-support.mdx  |   2 +
 .../blog/en/autism-self-advocacy-skills-aba.md     |   4 +
 .../blog/en/autism-therapy-rapport-strategies.md   |   2 +
 .../blog/en/behavior-management-functions-guide.md |   2 +
 ...odification-techniques-reinforcement-theory.mdx |   8 +-
 ...ation-social-skills-autistic-children-guide.mdx |   3 +
 .../blog/en/community-highlight-meet-rula-diab.md  |   6 +-
 .../content/blog/en/critical-thinking-skills.mdx   |   2 +
 .../content/blog/en/early-signs-autism-by-age.mdx  |  12 +-
 .../content/blog/en/emotional-regulation-aba.mdx   |   2 +
 .../blog/en/enhancing-generalization-skills.mdx    |   4 +-
 .../blog/en/executive-functioning-skills-autism.md |   3 +
 .../blog/en/first-then-cards-autism-transitions.md |   4 +-
 www/src/content/blog/en/heart-full-of-gratitude.md |   2 +
 .../content/blog/en/individualized-aba-therapy.md  |   3 +
 .../blog/en/integrated-aba-model-announcement.mdx  |   4 +-
 .../en/managing-aggressive-behavior-outbursts.mdx  |   2 +
 www/src/content/blog/en/meet-rula-diab-bcba.md     |   2 +
 .../content/blog/en/new-aia-scottsdale-office.md   |   6 +-
 .../blog/en/new-year-2024-autism-holiday-tips.mdx  |   4 +-
 www/src/content/blog/en/new-year-goals-2023.mdx    |   2 +
 .../content/blog/en/november-2022-aia-update.md    |   4 +-
 .../blog/en/parents-guide-to-autism-and-aba.mdx    |   3 +
 www/src/content/blog/en/play-leisure-skills.mdx    |  18 +-
 .../blog/en/positive-reinforcement-techniques.md   |   2 +
 .../en/proactive-reactive-aba-strategies-guide.md  |   4 +-
 .../content/blog/en/reduce-behavior-management.mdx |   2 +
 www/src/content/blog/en/repetitive-behavior.mdx    |   4 +-
 www/src/content/blog/en/sensory-processing.md      |   2 +
 .../en/social-pragmatic-communication-autism.mdx   |   6 +-
 .../blog/en/understanding-autism-support.mdx       |   6 +-
 .../blog/es/aba-school-readiness-arizona.mdx       | 606 ++++++++++++++++---
 ...m-evaluation-diagnosis-arizona-parent-guide.mdx |   2 +
 .../blog/es/autism-evaluation-what-to-expect.mdx   |  22 +-
 .../blog/es/autism-family-self-care-tips.md        |   4 +-
 .../blog/es/autism-self-advocacy-skills-aba.md     |   4 +
 .../content/blog/es/emotional-regulation-aba.mdx   |   2 +
 .../blog/es/enhancing-generalization-skills.mdx    |   4 +-
 .../blog/es/executive-functioning-skills-autism.md |   3 +
 .../blog/es/first-then-cards-autism-transitions.md |   4 +-
 .../blog/es/parents-guide-to-autism-and-aba.mdx    |   3 +
 .../blog/es/positive-reinforcement-techniques.md   |   2 +
 .../es/social-pragmatic-communication-autism.mdx   |   6 +-
 www/src/data/blog-footers.json                     | 661 ++++++++++++++-------
 www/src/styles/blog.css                            |  18 +
 www/src/utils/library-catalog.ts                   |   5 +-
 www/tools/audit-blog-content.mjs                   |   2 +-
 www/tools/library.test.mjs                         | 357 ++++++++++-
 www/tools/markdown.test.mjs                        |   8 +-
 www/tools/seo.test.mjs                             |  28 +-
 77 files changed, 2561 insertions(+), 754 deletions(-)
```

`git status --short`:

```text
 M www/reports/accessibility-audit.md
 M www/reports/blog-content-audit.md
 M www/reports/migration-summary.md
 M www/reports/page-imagery-audit.md
 M www/reports/seo-audit.md
 D www/src/content/blog/ar/aba-school-readiness-guide.md
 M www/src/content/blog/ar/autism-self-advocacy-skills-aba.md
 M www/src/content/blog/ar/behavior-management-functions-guide.md
 M www/src/content/blog/ar/executive-functioning-skills-autism.md
 M www/src/content/blog/ar/first-then-cards-autism-transitions.md
 M www/src/content/blog/ar/positive-reinforcement-techniques.md
 M www/src/content/blog/ar/proactive-reactive-aba-strategies-guide.md
 M www/src/content/blog/en/aac-visual-supports-autism.mdx
 M www/src/content/blog/en/aba-school-readiness-arizona.mdx
 D www/src/content/blog/en/aba-school-readiness-guide.md
 M www/src/content/blog/en/aba-therapy-benefits.mdx
 M www/src/content/blog/en/aba-therapy-dtt-net-guide.md
 M www/src/content/blog/en/aba-therapy-prompting-parenting-benefits.md
 M www/src/content/blog/en/aba-therapy-summer-routine-tips.mdx
 M www/src/content/blog/en/aba-toilet-training-child-autism.mdx
 M www/src/content/blog/en/aia-world-autism-community-day-celebration.mdx
 M www/src/content/blog/en/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake.mdx
 M www/src/content/blog/en/asd-sensory-friendly-recipes-pancakes.mdx
 M www/src/content/blog/en/autism-evaluation-diagnosis-arizona-parent-guide.mdx
 M www/src/content/blog/en/autism-evaluation-what-to-expect.mdx
 M www/src/content/blog/en/autism-fall-break-routine-tips-halloween-thanksgiving.mdx
 M www/src/content/blog/en/autism-family-self-care-tips.md
 M www/src/content/blog/en/autism-friendships-social-play-support.mdx
 M www/src/content/blog/en/autism-self-advocacy-skills-aba.md
 M www/src/content/blog/en/autism-therapy-rapport-strategies.md
 M www/src/content/blog/en/behavior-management-functions-guide.md
 M www/src/content/blog/en/behavior-modification-techniques-reinforcement-theory.mdx
 M www/src/content/blog/en/communication-social-skills-autistic-children-guide.mdx
 M www/src/content/blog/en/community-highlight-meet-rula-diab.md
 M www/src/content/blog/en/critical-thinking-skills.mdx
 M www/src/content/blog/en/early-signs-autism-by-age.mdx
 M www/src/content/blog/en/emotional-regulation-aba.mdx
 M www/src/content/blog/en/enhancing-generalization-skills.mdx
 M www/src/content/blog/en/executive-functioning-skills-autism.md
 M www/src/content/blog/en/first-then-cards-autism-transitions.md
 M www/src/content/blog/en/heart-full-of-gratitude.md
 M www/src/content/blog/en/individualized-aba-therapy.md
 M www/src/content/blog/en/integrated-aba-model-announcement.mdx
 M www/src/content/blog/en/managing-aggressive-behavior-outbursts.mdx
 M www/src/content/blog/en/meet-rula-diab-bcba.md
 M www/src/content/blog/en/new-aia-scottsdale-office.md
 M www/src/content/blog/en/new-year-2024-autism-holiday-tips.mdx
 M www/src/content/blog/en/new-year-goals-2023.mdx
 M www/src/content/blog/en/november-2022-aia-update.md
 M www/src/content/blog/en/parents-guide-to-autism-and-aba.mdx
 M www/src/content/blog/en/play-leisure-skills.mdx
 M www/src/content/blog/en/positive-reinforcement-techniques.md
 M www/src/content/blog/en/proactive-reactive-aba-strategies-guide.md
 M www/src/content/blog/en/reduce-behavior-management.mdx
 M www/src/content/blog/en/repetitive-behavior.mdx
 M www/src/content/blog/en/sensory-processing.md
 M www/src/content/blog/en/social-pragmatic-communication-autism.mdx
 M www/src/content/blog/en/understanding-autism-support.mdx
 M www/src/content/blog/es/aba-school-readiness-arizona.mdx
 M www/src/content/blog/es/autism-evaluation-diagnosis-arizona-parent-guide.mdx
 M www/src/content/blog/es/autism-evaluation-what-to-expect.mdx
 M www/src/content/blog/es/autism-family-self-care-tips.md
 M www/src/content/blog/es/autism-self-advocacy-skills-aba.md
 M www/src/content/blog/es/emotional-regulation-aba.mdx
 M www/src/content/blog/es/enhancing-generalization-skills.mdx
 M www/src/content/blog/es/executive-functioning-skills-autism.md
 M www/src/content/blog/es/first-then-cards-autism-transitions.md
 M www/src/content/blog/es/parents-guide-to-autism-and-aba.mdx
 M www/src/content/blog/es/positive-reinforcement-techniques.md
 M www/src/content/blog/es/social-pragmatic-communication-autism.mdx
 M www/src/data/blog-footers.json
 M www/src/styles/blog.css
 M www/src/utils/library-catalog.ts
 M www/tools/audit-blog-content.mjs
 M www/tools/library.test.mjs
 M www/tools/markdown.test.mjs
 M www/tools/seo.test.mjs
?? merge-plan.md
?? www/public/assets/images/aba-hours-recommendation-delivery.webp
?? www/public/assets/images/aba-therapy-replace-school.webp
?? www/public/assets/images/aba-therapy-vs-school.webp
?? www/public/assets/images/aba-to-group-transition.webp
?? www/public/assets/images/abc-worksheet.webp
?? www/public/assets/images/after-school-routine-chart.webp
?? www/public/assets/images/antecedent-behavior-consequence.webp
?? www/public/assets/images/antecedent-behavior-consequence_ar.svg
?? www/public/assets/images/antecedent-consequence.webp
?? www/public/assets/images/autism-after-school-meltdowns_HERO.webp
?? www/public/assets/images/autism-food-symptom-observations.webp
?? www/public/assets/images/autism-social-skills-by-age_hero-1.webp
?? www/public/assets/images/back-to-school.webp
?? www/public/assets/images/bedtime-sensory-comfort.webp
?? www/public/assets/images/collaborative-play.webp
?? www/public/assets/images/daily-living-challenges-autism.webp
?? www/public/assets/images/divided-meal-plate-food-introduction-400.jpg
?? www/public/assets/images/first-then-visual-support-after-school.webp
?? www/public/assets/images/food-chaining-example.webp
?? www/public/assets/images/food-preferences-characteristics-infographic.webp
?? www/public/assets/images/halloween-and-autism_hero2.webp
?? www/public/assets/images/halloween-and-autism_simple-visual-schedule.webp
?? www/public/assets/images/halloween-porch-candy-teal-pumpking-bookmarks.webp
?? www/public/assets/images/last-straw-vs-whole-story.webp
?? www/public/assets/images/learning-skill-generalization.webp
?? www/public/assets/images/masking-school-decompressing-home-dyptich.webp
?? www/public/assets/images/morning-routine-schedule.webp
?? www/public/assets/images/one-to-one-to-group-progression.webp
?? www/public/assets/images/one-to-one-to-group-progression_es.webp
?? www/public/assets/images/parent-pediatric-support-team-meeting.webp
?? www/public/assets/images/picky-eating-autism-parent-guide.webp
?? www/public/assets/images/prompt-fading-therapist-help-600.jpg
?? www/public/assets/images/recommended-hours-aba-therapy.webp
?? www/public/assets/images/reduce-environmental-distractions.webp
?? www/public/assets/images/reduce-environmental-distractions_ar.svg
?? www/public/assets/images/reinforcement-replacement-behavior.webp
?? www/public/assets/images/reinforcement-replacement-behavior_ar.svg
?? www/public/assets/images/school-readiness-planning.webp
?? www/public/assets/images/school-readiness-supports-infographic.webp
?? www/public/assets/images/school-readiness-supports-infographic_es.webp
?? www/public/assets/images/sleep-diary.webp
?? www/public/assets/images/sleep-issues-autism-bedtime-routines.webp
?? www/public/assets/images/social-demands-change-as-child-grows.webp
?? www/public/assets/images/support-tools-transition-help.webp
?? www/reports/phase-6c-article-parity-audit-2026-10-11.md
?? www/reports/phase-6c-source-evidence-2026-10-11.json
?? www/reports/phase-6c2-source-evidence-2026-10-11.json
?? www/reports/phase-6c2-translation-equivalence-2026-10-11.md
?? www/reports/phase-6c3-metadata-reconciliation-2026-10-12.md
?? www/reports/phase-6c3-source-evidence-2026-10-12.json
?? www/reports/phase-6c4-link-evidence-2026-10-13.json
?? www/reports/phase-6c4-link-reconciliation-2026-10-13.md
?? www/reports/phase-6c5-checkpoint-manifest-2026-10-13.md
?? www/reports/phase-6c5-final-library-acceptance-2026-10-13.md
?? www/reports/phase-6c5-final-parity-evidence-2026-10-13.json
?? www/reports/route-reconciliation-2026-10-11-offline-04-58-33-208Z.json
?? www/reports/route-reconciliation-2026-10-11-offline-20-48-03-927Z.json
?? www/reports/route-reconciliation-2026-10-11-offline.json
?? www/reports/route-reconciliation-2026-10-12-offline-22-12-30-166Z.json
?? www/reports/route-reconciliation-2026-10-12-offline.json
?? www/reports/route-reconciliation-2026-10-13-offline-03-01-03-889Z.json
?? www/reports/route-reconciliation-2026-10-13-offline-06-16-06-857Z.json
?? www/reports/route-reconciliation-2026-10-13-offline-06-21-20-316Z.json
?? www/reports/route-reconciliation-2026-10-13-offline.json
?? www/src/content/blog/ar/aba-school-readiness-guide.mdx
?? www/src/content/blog/en/aba-school-readiness-guide.mdx
?? www/src/content/blog/en/autism-after-school-meltdowns.mdx
?? www/src/content/blog/en/autism-back-to-school-transition.mdx
?? www/src/content/blog/en/autism-daily-living-skills-challenges.mdx
?? www/src/content/blog/en/autism-social-skills-by-age.mdx
?? www/src/content/blog/en/does-aba-therapy-replace-school.mdx
?? www/src/content/blog/en/halloween-and-autism.mdx
?? www/src/content/blog/en/how-many-hours-aba-child-need.mdx
?? www/src/content/blog/en/picky-eating-autism-parent-guide.mdx
?? www/src/content/blog/en/sleep-issues-autistic-children.mdx
```
