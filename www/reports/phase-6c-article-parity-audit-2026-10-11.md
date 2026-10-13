# Phase 6C Supplemental Library Article Parity Audit — 2026-10-11

## Decision summary

This audit compared all 74 Library records in the local Astro content collection with the corresponding public HubSpot article bodies. It made no content, route, publication-policy, redirect, or application change. The existing Phase 6C implementation remains unstaged and uncommitted.

The audit found **eight articles with parity confirmed**, **60 with minor drift**, **four with material drift**, and **two requiring an explicit human decision**. No route was classified as freshness unverified because every requested public route returned HTTP 200 with an independently extracted HubSpot article body; however, every result remains cache-qualified rather than proof of current origin state. The known self-advocacy/Halloween paragraph is now independently confirmed and is missing locally.

The highest-priority reconciliation set is: the rewritten English and Spanish school-readiness articles; the rewritten English antecedent/consequence article; the revised fall-break article; the missing Halloween cross-link passages; and the two explicit approval gates involving age/program language and `/lp/early-intervention`.

## Scope and method

- Inventory source: the actual files under `src/content/blog/{en,es,ar}`. The inventory is 55 English, 12 Spanish, and seven Arabic records. All are present in the current generated Astro output.
- Public retrieval: one rate-limited, read-only GET per canonical local route, using the public origin and `Cache-Control: no-cache`; no forms, previews, authenticated APIs, asset crawl, or analytics execution. `robots.txt` allowed these paths.
- Retrieval window: `2026-10-11T07:33:22.839Z` through `2026-10-11T07:34:40.388Z`. All 74 requests returned HTTP 200 at the requested URL with no redirect.
- Every response declared `s-maxage=36000, max-age=5` and HubSpot `PreRenderedContentResolver`. Cache results were 27 `MISS`, 25 `REVALIDATED`, and 22 `HIT`. HTTP `Last-Modified` values ranged from 2026-10-03 through 2026-10-07. These headers do not establish fresh origin state.
- Semantic extraction compared head metadata, visible H1/byline/date, BlogPosting and FAQPage JSON-LD, article text, H2/H3 order, links and anchor text, tables, figures, images and alt text, and previous/next/related relationships. Whitespace, equivalent entities, typographic apostrophes, self-hosted image path changes, and Markdown-versus-HubSpot wrapper markup were normalized. Fifty-one visible bodies were token-identical and 68 were at least 99% aligned after normalization. The four material rewrites, the self-advocacy addition, and intentional static contact-obfuscation fallbacks explain the lower comparisons.
- The current normal staging output was used as the local rendered representation. Its global `noindex,nofollow` is a deployment safeguard and was not treated as article drift. Accepted production-policy behavior was reviewed separately.
- No browser engine or screen reader was used for this supplemental audit. The public article bodies were verified from returned HTML. The disputed self-advocacy passage was additionally confirmed through an independent rendered-page text view on 2026-10-11.

## Source freshness limits

The public responses are useful current public representations, but they are still HubSpot/CDN prerenders. A `MISS` or `REVALIDATED` response is stronger evidence than a historical saved response, but neither proves that an unpublished origin revision does not exist. A `HIT` can be current or stale. The matrix therefore records cache status, response time, `Last-Modified`, and a short SHA-256 prefix for the exact HTML compared. If the public page changes again, the comparison must be rerun.

The self-advocacy discrepancy demonstrates why this qualification matters: an earlier retrieval lacked the passage, while both the public text renderer and the direct HTML retrieved on 2026-10-11 contain it.

## Classification and issue-key legend

- **Parity confirmed:** no material semantic difference detected using the current public evidence.
- **Minor drift:** smaller metadata, link, footer relationship, alt-text, timestamp, or semantic-markup differences.
- **Material drift:** a substantive rewrite, changed FAQ set, missing sections, or materially different media.
- **Review required:** correction depends on a clinical, organizational, route-ownership, or editorial decision.
- **Freshness unverified:** source evidence was insufficient. No article fell into this class in this pass.

Issue keys: `A` source featured-image alt missing locally; `A+` useful local alt added where source is empty; `U` source `dateModified` absent locally; `B` substantive body rewrite; `Q` meaningful FAQ/schema drift; `X9` missing contextual link to one of the nine Phase 6C articles; `T` table semantics lost; `E` eligibility/program wording review; `LP` `/lp/early-intervention` ownership gate; `H` visible H1 drift; `M` title/description drift; `F` previous/next/related drift; `L` other link-target drift; `C` public source omits a canonical element while Astro deliberately emits a validated self-canonical; `I` materially different image inventory; `S` accepted syndicated noindex/external-canonical exception.

## Complete 74-article parity matrix

All published dates and visible author attributions matched at the date level and displayed author level. The `Updated` column is the source BlogPosting `dateModified`; `— local` means Astro has no `updatedDate`. Evidence values are `cache/status @ observation-time; HTTP Last-Modified; body SHA-256 prefix`.

| # | Route | Classification | Words source/local | Updated | Evidence | Findings |
|---:|---|---|---:|---|---|---|
| 1 | [`/ar/library/aba-school-readiness-guide`](https://www.azinstitute4autism.com/ar/library/aba-school-readiness-guide) | Minor drift | 384/384 | 2025-11-22 / — local | MISS/200 @ 07:33:22Z; LM 03 Oct 2026; `c57cf00d7c4a` | A,U,H |
| 2 | [`/ar/library/autism-self-advocacy-skills-aba`](https://www.azinstitute4autism.com/ar/library/autism-self-advocacy-skills-aba) | Minor drift | 455/455 | 2025-09-09 / — local | REVALIDATED/200 @ 07:33:24Z; LM 03 Oct 2026; `0b5f78789785` | A,U |
| 3 | [`/ar/library/behavior-management-functions-guide`](https://www.azinstitute4autism.com/ar/library/behavior-management-functions-guide) | Minor drift | 269/269 | 2025-09-09 / — local | REVALIDATED/200 @ 07:33:25Z; LM 03 Oct 2026; `d9befd82e128` | A,U |
| 4 | [`/ar/library/executive-functioning-skills-autism`](https://www.azinstitute4autism.com/ar/library/executive-functioning-skills-autism) | Minor drift | 675/675 | 2025-09-09 / — local | MISS/200 @ 07:33:26Z; LM 03 Oct 2026; `cd36c8ef498f` | A,U |
| 5 | [`/ar/library/first-then-cards-autism-transitions`](https://www.azinstitute4autism.com/ar/library/first-then-cards-autism-transitions) | Minor drift | 372/372 | 2025-12-02 / — local | REVALIDATED/200 @ 07:33:27Z; LM 03 Oct 2026; `bbbf06a2c9a9` | A,U,H,L |
| 6 | [`/ar/library/positive-reinforcement-techniques`](https://www.azinstitute4autism.com/ar/library/positive-reinforcement-techniques) | Minor drift | 823/823 | 2025-09-09 / — local | REVALIDATED/200 @ 07:33:28Z; LM 03 Oct 2026; `992fddfee853` | A,U |
| 7 | [`/ar/library/proactive-reactive-aba-strategies-guide`](https://www.azinstitute4autism.com/ar/library/proactive-reactive-aba-strategies-guide) | Minor drift | 464/464 | 2025-07-19 / — local | REVALIDATED/200 @ 07:33:29Z; LM 03 Oct 2026; `78c85639e3d1` | A,U,L |
| 8 | [`/es/library/aba-school-readiness-arizona`](https://www.azinstitute4autism.com/es/library/aba-school-readiness-arizona) | Material drift | 5222/924 | 2026-09-25 / — local | MISS/200 @ 07:33:30Z; LM 03 Oct 2026; `3b8e9f9495dd` | A,U,B,Q,X9,H,M,F,I |
| 9 | [`/es/library/autism-evaluation-diagnosis-arizona-parent-guide`](https://www.azinstitute4autism.com/es/library/autism-evaluation-diagnosis-arizona-parent-guide) | Minor drift | 1284/1284 | 2026-01-22 / — local | HIT/200 @ 07:33:31Z; LM 03 Oct 2026; `2c7df1098b06` | A,U,F |
| 10 | [`/es/library/autism-evaluation-what-to-expect`](https://www.azinstitute4autism.com/es/library/autism-evaluation-what-to-expect) | Minor drift | 1534/1534 | 2026-05-12 / — local | MISS/200 @ 07:33:32Z; LM 03 Oct 2026; `2307eb755998` | A,U,T,L |
| 11 | [`/es/library/autism-family-self-care-tips`](https://www.azinstitute4autism.com/es/library/autism-family-self-care-tips) | Minor drift | 622/622 | 2026-04-09 / — local | MISS/200 @ 07:33:33Z; LM 03 Oct 2026; `57e82e78c21f` | A,U,L |
| 12 | [`/es/library/autism-self-advocacy-skills-aba`](https://www.azinstitute4autism.com/es/library/autism-self-advocacy-skills-aba) | Minor drift | 553/553 | 2026-04-09 / — local | MISS/200 @ 07:33:34Z; LM 03 Oct 2026; `4f0a32468331` | A,U |
| 13 | [`/es/library/emotional-regulation-aba`](https://www.azinstitute4autism.com/es/library/emotional-regulation-aba) | Minor drift | 1297/1297 | 2025-11-22 / — local | HIT/200 @ 07:33:35Z; LM 03 Oct 2026; `af48d580b542` | A,U,F |
| 14 | [`/es/library/enhancing-generalization-skills`](https://www.azinstitute4autism.com/es/library/enhancing-generalization-skills) | Minor drift | 371/373 | 2026-04-09 / — local | REVALIDATED/200 @ 07:33:36Z; LM 03 Oct 2026; `c43c16e5932a` | A,U,F,L |
| 15 | [`/es/library/executive-functioning-skills-autism`](https://www.azinstitute4autism.com/es/library/executive-functioning-skills-autism) | Minor drift | 785/785 | 2026-04-09 / — local | REVALIDATED/200 @ 07:33:37Z; LM 03 Oct 2026; `f736b39b05c1` | A,U,H |
| 16 | [`/es/library/first-then-cards-autism-transitions`](https://www.azinstitute4autism.com/es/library/first-then-cards-autism-transitions) | Minor drift | 467/467 | 2026-04-09 / — local | MISS/200 @ 07:33:38Z; LM 03 Oct 2026; `9b594c6dbfbf` | A,U,F,L |
| 17 | [`/es/library/parents-guide-to-autism-and-aba`](https://www.azinstitute4autism.com/es/library/parents-guide-to-autism-and-aba) | Minor drift | 2131/2131 | 2026-05-07 / — local | HIT/200 @ 07:33:40Z; LM 03 Oct 2026; `447c941757dc` | A,U,H |
| 18 | [`/es/library/positive-reinforcement-techniques`](https://www.azinstitute4autism.com/es/library/positive-reinforcement-techniques) | Minor drift | 933/933 | 2026-04-09 / — local | MISS/200 @ 07:33:41Z; LM 03 Oct 2026; `4c5b0fc8d8e8` | A,U,F |
| 19 | [`/es/library/social-pragmatic-communication-autism`](https://www.azinstitute4autism.com/es/library/social-pragmatic-communication-autism) | Minor drift | 1600/1600 | 2026-01-22 / — local | MISS/200 @ 07:33:42Z; LM 03 Oct 2026; `b119eba501d6` | A,U,F |
| 20 | [`/library/aac-visual-supports-autism`](https://www.azinstitute4autism.com/library/aac-visual-supports-autism) | Minor drift | 1378/1360 | 2026-10-03 / — local | HIT/200 @ 07:33:43Z; LM 05 Oct 2026; `306c78f6e420` | A,U,X9,F |
| 21 | [`/library/aba-school-readiness-arizona`](https://www.azinstitute4autism.com/library/aba-school-readiness-arizona) | Material drift | 3988/729 | 2026-09-17 / — local | REVALIDATED/200 @ 07:33:44Z; LM 03 Oct 2026; `0d5bd0c47258` | A,U,B,Q,X9,H,M,F,I |
| 22 | [`/library/aba-school-readiness-guide`](https://www.azinstitute4autism.com/library/aba-school-readiness-guide) | Material drift | 3083/384 | 2026-08-13 / — local | REVALIDATED/200 @ 07:33:45Z; LM 03 Oct 2026; `d871d5364723` | A,U,B,Q,H,M,F,L,I |
| 23 | [`/library/aba-therapy-benefits`](https://www.azinstitute4autism.com/library/aba-therapy-benefits) | Minor drift | 384/386 | 2025-09-16 / — local | HIT/200 @ 07:33:46Z; LM 03 Oct 2026; `220a4210f35a` | A,U,M,L,C |
| 24 | [`/library/aba-therapy-dtt-net-guide`](https://www.azinstitute4autism.com/library/aba-therapy-dtt-net-guide) | Minor drift | 393/393 | 2025-04-18 / — local | REVALIDATED/200 @ 07:33:47Z; LM 03 Oct 2026; `914e7915de6b` | A,U,F |
| 25 | [`/library/aba-therapy-prompting-parenting-benefits`](https://www.azinstitute4autism.com/library/aba-therapy-prompting-parenting-benefits) | Minor drift | 140/140 | 2025-04-18 / — local | MISS/200 @ 07:33:48Z; LM 03 Oct 2026; `b1304aaa230f` | A,U,F |
| 26 | [`/library/aba-therapy-summer-routine-tips`](https://www.azinstitute4autism.com/library/aba-therapy-summer-routine-tips) | Review required | 1435/1429 | 2026-10-04 / — local | REVALIDATED/200 @ 07:33:49Z; LM 04 Oct 2026; `34f918fddec3` | A,U,E,F |
| 27 | [`/library/aba-toilet-training-child-autism`](https://www.azinstitute4autism.com/library/aba-toilet-training-child-autism) | Minor drift | 409/411 | 2025-09-16 / — local | HIT/200 @ 07:33:50Z; LM 03 Oct 2026; `d4b6add79a29` | A,U,L |
| 28 | [`/library/aia-world-autism-community-day-celebration`](https://www.azinstitute4autism.com/library/aia-world-autism-community-day-celebration) | Minor drift | 317/319 | 2026-05-12 / — local | MISS/200 @ 07:33:51Z; LM 03 Oct 2026; `e4e4fb4d7f41` | A,U,F,C |
| 29 | [`/library/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake`](https://www.azinstitute4autism.com/library/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake) | Minor drift | 605/607 | 2025-05-21 / — local | REVALIDATED/200 @ 07:33:52Z; LM 03 Oct 2026; `f03f35ed9f2a` | A,U,L |
| 30 | [`/library/asd-sensory-friendly-recipes-pancakes`](https://www.azinstitute4autism.com/library/asd-sensory-friendly-recipes-pancakes) | Minor drift | 751/753 | 2025-09-16 / — local | MISS/200 @ 07:33:53Z; LM 03 Oct 2026; `d783051509e3` | A,U,C |
| 31 | [`/library/autism-after-school-meltdowns`](https://www.azinstitute4autism.com/library/autism-after-school-meltdowns) | Parity confirmed | 3347/3347 | 2026-09-02 / 2026-09-02 | HIT/200 @ 07:33:55Z; LM 03 Oct 2026; `c100f4325d27` | — |
| 32 | [`/library/autism-back-to-school-transition`](https://www.azinstitute4autism.com/library/autism-back-to-school-transition) | Parity confirmed | 2964/2964 | 2026-09-10 / 2026-09-10 | HIT/200 @ 07:33:56Z; LM 03 Oct 2026; `21f7fe0a207a` | — |
| 33 | [`/library/autism-daily-living-skills-challenges`](https://www.azinstitute4autism.com/library/autism-daily-living-skills-challenges) | Parity confirmed | 2523/2523 | 2026-07-09 / 2026-07-09 | HIT/200 @ 07:33:56Z; LM 03 Oct 2026; `814e39cc242f` | — |
| 34 | [`/library/autism-evaluation-diagnosis-arizona-parent-guide`](https://www.azinstitute4autism.com/library/autism-evaluation-diagnosis-arizona-parent-guide) | Minor drift | 1135/1135 | 2026-01-01 / — local | HIT/200 @ 07:33:57Z; LM 03 Oct 2026; `1b490b082a5b` | A,U |
| 35 | [`/library/autism-evaluation-what-to-expect`](https://www.azinstitute4autism.com/library/autism-evaluation-what-to-expect) | Minor drift | 1365/1365 | 2026-03-10 / — local | HIT/200 @ 07:33:58Z; LM 03 Oct 2026; `c6322821fea7` | A,U,T,L |
| 36 | [`/library/autism-fall-break-routine-tips-halloween-thanksgiving`](https://www.azinstitute4autism.com/library/autism-fall-break-routine-tips-halloween-thanksgiving) | Material drift | 1251/1366 | 2026-10-03 / — local | MISS/200 @ 07:33:59Z; LM 07 Oct 2026; `c35e91e05908` | A,U,B,Q,X9,H,M,F |
| 37 | [`/library/autism-family-self-care-tips`](https://www.azinstitute4autism.com/library/autism-family-self-care-tips) | Minor drift | 585/585 | 2026-05-12 / — local | MISS/200 @ 07:34:01Z; LM 03 Oct 2026; `ed69410848c6` | A,U,L |
| 38 | [`/library/autism-friendships-social-play-support`](https://www.azinstitute4autism.com/library/autism-friendships-social-play-support) | Minor drift | 1618/1618 | 2026-06-01 / — local | MISS/200 @ 07:34:02Z; LM 03 Oct 2026; `b2c342631653` | A,U,F |
| 39 | [`/library/autism-self-advocacy-skills-aba`](https://www.azinstitute4autism.com/library/autism-self-advocacy-skills-aba) | Minor drift | 445/425 | 2026-10-03 / — local | HIT/200 @ 07:34:03Z; LM 03 Oct 2026; `c2ce9884141e` | A,U,X9 |
| 40 | [`/library/autism-social-skills-by-age`](https://www.azinstitute4autism.com/library/autism-social-skills-by-age) | Parity confirmed | 2805/2805 | 2026-09-24 / 2026-09-24 | HIT/200 @ 07:34:04Z; LM 03 Oct 2026; `370aaa932f0e` | — |
| 41 | [`/library/autism-therapy-rapport-strategies`](https://www.azinstitute4autism.com/library/autism-therapy-rapport-strategies) | Minor drift | 350/350 | 2025-04-18 / — local | REVALIDATED/200 @ 07:34:05Z; LM 03 Oct 2026; `5ce91c364f03` | A,U |
| 42 | [`/library/behavior-management-functions-guide`](https://www.azinstitute4autism.com/library/behavior-management-functions-guide) | Minor drift | 321/321 | 2025-04-18 / — local | HIT/200 @ 07:34:06Z; LM 03 Oct 2026; `7745bb0182af` | A,U,F |
| 43 | [`/library/behavior-modification-techniques-reinforcement-theory`](https://www.azinstitute4autism.com/library/behavior-modification-techniques-reinforcement-theory) | Minor drift | 364/366 | 2025-12-02 / — local | REVALIDATED/200 @ 07:34:07Z; LM 03 Oct 2026; `4d97ec78f8d0` | A,U,L,C |
| 44 | [`/library/communication-social-skills-autistic-children-guide`](https://www.azinstitute4autism.com/library/communication-social-skills-autistic-children-guide) | Minor drift | 1821/1821 | 2026-04-02 / — local | REVALIDATED/200 @ 07:34:08Z; LM 03 Oct 2026; `51cb3998d415` | A,U,H,F |
| 45 | [`/library/community-highlight-meet-rula-diab`](https://www.azinstitute4autism.com/library/community-highlight-meet-rula-diab) | Minor drift | 761/761 | 2025-05-27 / — local | MISS/200 @ 07:34:09Z; LM 03 Oct 2026; `b0a16ee762f2` | A,U,S,M,L |
| 46 | [`/library/critical-thinking-skills`](https://www.azinstitute4autism.com/library/critical-thinking-skills) | Minor drift | 298/300 | 2025-03-09 / — local | MISS/200 @ 07:34:10Z; LM 03 Oct 2026; `e02abd46a5fd` | A,U,F,C |
| 47 | [`/library/does-aba-therapy-replace-school`](https://www.azinstitute4autism.com/library/does-aba-therapy-replace-school) | Parity confirmed | 1680/1680 | 2026-07-22 / 2026-07-22 | HIT/200 @ 07:34:11Z; LM 03 Oct 2026; `22a6f55da10a` | — |
| 48 | [`/library/early-signs-autism-by-age`](https://www.azinstitute4autism.com/library/early-signs-autism-by-age) | Minor drift | 2624/2624 | 2026-03-10 / — local | REVALIDATED/200 @ 07:34:13Z; LM 03 Oct 2026; `05300297e763` | A,U,F,L |
| 49 | [`/library/emotional-regulation-aba`](https://www.azinstitute4autism.com/library/emotional-regulation-aba) | Minor drift | 1086/1086 | 2025-11-06 / — local | REVALIDATED/200 @ 07:34:14Z; LM 03 Oct 2026; `ce8cf2fb11b3` | A,U |
| 50 | [`/library/enhancing-generalization-skills`](https://www.azinstitute4autism.com/library/enhancing-generalization-skills) | Minor drift | 316/318 | 2026-05-12 / — local | REVALIDATED/200 @ 07:34:15Z; LM 03 Oct 2026; `62e1ab4edcb3` | A,U,L |
| 51 | [`/library/executive-functioning-skills-autism`](https://www.azinstitute4autism.com/library/executive-functioning-skills-autism) | Minor drift | 640/640 | 2025-10-20 / — local | MISS/200 @ 07:34:16Z; LM 03 Oct 2026; `7d039c8d3b3c` | A,U,H |
| 52 | [`/library/first-then-cards-autism-transitions`](https://www.azinstitute4autism.com/library/first-then-cards-autism-transitions) | Minor drift | 406/406 | 2025-12-02 / — local | MISS/200 @ 07:34:17Z; LM 03 Oct 2026; `2ec8d20e8e13` | A,U,L |
| 53 | [`/library/halloween-and-autism`](https://www.azinstitute4autism.com/library/halloween-and-autism) | Parity confirmed | 1940/1940 | 2026-10-03 / 2026-10-03 | HIT/200 @ 07:34:18Z; LM 03 Oct 2026; `a27447e99a52` | — |
| 54 | [`/library/heart-full-of-gratitude`](https://www.azinstitute4autism.com/library/heart-full-of-gratitude) | Minor drift | 429/429 | 2025-12-15 / — local | MISS/200 @ 07:34:19Z; LM 03 Oct 2026; `f085f1ac74d9` | A,U |
| 55 | [`/library/how-many-hours-aba-child-need`](https://www.azinstitute4autism.com/library/how-many-hours-aba-child-need) | Review required | 2152/2152 | 2026-09-08 / 2026-09-08 | HIT/200 @ 07:34:20Z; LM 03 Oct 2026; `961555f27555` | LP |
| 56 | [`/library/individualized-aba-therapy`](https://www.azinstitute4autism.com/library/individualized-aba-therapy) | Minor drift | 388/388 | 2025-04-19 / — local | HIT/200 @ 07:34:21Z; LM 03 Oct 2026; `5eb8493e918e` | A,U,H |
| 57 | [`/library/integrated-aba-model-announcement`](https://www.azinstitute4autism.com/library/integrated-aba-model-announcement) | Minor drift | 459/461 | 2025-09-16 / — local | REVALIDATED/200 @ 07:34:22Z; LM 03 Oct 2026; `4b3ffc74199c` | A,U,L,C |
| 58 | [`/library/managing-aggressive-behavior-outbursts`](https://www.azinstitute4autism.com/library/managing-aggressive-behavior-outbursts) | Minor drift | 351/353 | 2025-03-09 / — local | MISS/200 @ 07:34:23Z; LM 03 Oct 2026; `1352419db326` | A,U,F,C |
| 59 | [`/library/meet-rula-diab-bcba`](https://www.azinstitute4autism.com/library/meet-rula-diab-bcba) | Minor drift | 737/737 | 2025-03-11 / — local | REVALIDATED/200 @ 07:34:24Z; LM 03 Oct 2026; `4b675af138d1` | A,U,C |
| 60 | [`/library/new-aia-scottsdale-office`](https://www.azinstitute4autism.com/library/new-aia-scottsdale-office) | Minor drift | 673/673 | 2025-05-27 / — local | REVALIDATED/200 @ 07:34:25Z; LM 03 Oct 2026; `9e21aec28a5a` | A,U,S,M,L |
| 61 | [`/library/new-year-2024-autism-holiday-tips`](https://www.azinstitute4autism.com/library/new-year-2024-autism-holiday-tips) | Minor drift | 310/312 | 2025-09-16 / — local | MISS/200 @ 07:34:26Z; LM 03 Oct 2026; `33adaba2062e` | A,U,L |
| 62 | [`/library/new-year-goals-2023`](https://www.azinstitute4autism.com/library/new-year-goals-2023) | Minor drift | 171/173 | 2025-03-09 / — local | REVALIDATED/200 @ 07:34:27Z; LM 03 Oct 2026; `c629f4a8ecea` | A,U,C |
| 63 | [`/library/november-2022-aia-update`](https://www.azinstitute4autism.com/library/november-2022-aia-update) | Minor drift | 171/171 | 2025-03-09 / — local | MISS/200 @ 07:34:28Z; LM 03 Oct 2026; `5520551cd4aa` | A,U,M,F,C |
| 64 | [`/library/parents-guide-to-autism-and-aba`](https://www.azinstitute4autism.com/library/parents-guide-to-autism-and-aba) | Minor drift | 1845/1845 | 2026-04-02 / — local | REVALIDATED/200 @ 07:34:30Z; LM 03 Oct 2026; `0f94dabeafa5` | A,U,H,F |
| 65 | [`/library/picky-eating-autism-parent-guide`](https://www.azinstitute4autism.com/library/picky-eating-autism-parent-guide) | Parity confirmed | 2788/2788 | 2026-10-03 / 2026-10-03 | HIT/200 @ 07:34:31Z; LM 03 Oct 2026; `5c8a6c0569fe` | A+ |
| 66 | [`/library/play-leisure-skills`](https://www.azinstitute4autism.com/library/play-leisure-skills) | Minor drift | 2161/2161 | 2026-09-09 / — local | MISS/200 @ 07:34:32Z; LM 03 Oct 2026; `e93dff4afc55` | A,U,Q,F,L |
| 67 | [`/library/positive-reinforcement-techniques`](https://www.azinstitute4autism.com/library/positive-reinforcement-techniques) | Minor drift | 775/775 | 2025-09-09 / — local | MISS/200 @ 07:34:33Z; LM 03 Oct 2026; `00876c377389` | A,U,F |
| 68 | [`/library/proactive-reactive-aba-strategies-guide`](https://www.azinstitute4autism.com/library/proactive-reactive-aba-strategies-guide) | Minor drift | 543/543 | 2025-04-19 / — local | HIT/200 @ 07:34:34Z; LM 03 Oct 2026; `8d9295606f12` | A,U,F,L |
| 69 | [`/library/reduce-behavior-management`](https://www.azinstitute4autism.com/library/reduce-behavior-management) | Minor drift | 337/337 | 2025-09-16 / — local | REVALIDATED/200 @ 07:34:35Z; LM 03 Oct 2026; `ce55fbb077af` | A,U,F,C |
| 70 | [`/library/repetitive-behavior`](https://www.azinstitute4autism.com/library/repetitive-behavior) | Minor drift | 224/226 | 2025-09-16 / — local | REVALIDATED/200 @ 07:34:36Z; LM 03 Oct 2026; `974d14002745` | A,U,L,C |
| 71 | [`/library/sensory-processing`](https://www.azinstitute4autism.com/library/sensory-processing) | Minor drift | 291/291 | 2025-04-18 / — local | MISS/200 @ 07:34:37Z; LM 03 Oct 2026; `6f33f2b8dac0` | A,U |
| 72 | [`/library/sleep-issues-autistic-children`](https://www.azinstitute4autism.com/library/sleep-issues-autistic-children) | Parity confirmed | 1971/1971 | 2026-09-28 / 2026-09-28 | HIT/200 @ 07:34:38Z; LM 03 Oct 2026; `b9955a948ca0` | — |
| 73 | [`/library/social-pragmatic-communication-autism`](https://www.azinstitute4autism.com/library/social-pragmatic-communication-autism) | Minor drift | 1353/1353 | 2025-12-02 / — local | MISS/200 @ 07:34:39Z; LM 03 Oct 2026; `047c698d8bdb` | A,U,F |
| 74 | [`/library/understanding-autism-support`](https://www.azinstitute4autism.com/library/understanding-autism-support) | Minor drift | 546/548 | 2025-09-16 / — local | HIT/200 @ 07:34:40Z; LM 03 Oct 2026; `ca4dbd1214fe` | A,U,L,C |

## Detailed findings

### Confirmed missing self-advocacy passage

The public `/library/autism-self-advocacy-skills-aba` body now contains the following sentence immediately after the examples of requesting a break, choosing, and saying no:

> Our Halloween planning guide shows how families can make room for “no,” “break,” and “all done” during a community outing.

The anchor text **Halloween planning guide** points to `/library/halloween-and-autism?hsLang=en-us`, normalized to `/library/halloween-and-autism` for comparison. The local article has neither the sentence nor the link. Evidence: direct HTTP 200 at `2026-10-11T07:34:03Z`, cache `HIT`, HTTP `Last-Modified: Sat, 03 Oct 2026 23:13:15 GMT`, exact body SHA-256 prefix `c2ce9884141e`; the independent public text renderer also displayed the sentence on 2026-10-11. This is a confirmed minor correction, not a freshness-unverified observation.

### Material body and FAQ drift

1. **`/library/aba-school-readiness-arizona`** is a complete editorial rewrite. The public page is now a parent guide to school readiness and access, with 18 body headings before the FAQ, nine FAQ items, two body infographics, Arizona readiness references, and explicit distinctions between ABA and school. The local page remains the older AIA Preparatory Academy enrollment article with seven FAQs and no body infographics. Public metadata is also different. This requires clinical/editorial review before transcription because the new copy discusses school access, support fading, educational roles, and program eligibility.
2. **`/es/library/aba-school-readiness-arizona`** is the corresponding substantive Spanish rewrite: nine public FAQs versus seven local, two missing infographics, updated metadata, and numerous current contextual links. The correction requires fluent Spanish review as well as clinical/editorial approval. The source includes some English-target Library links where no Spanish article exists; those destinations must not be “translated” by guessing.
3. **`/library/aba-school-readiness-guide`** no longer presents the short back-to-school article preserved locally. The public page is now a long article titled “Antecedent Interventions & Consequence Strategies in ABA,” with 19 substantive headings before a six-question FAQ, three comparison/example tables, three body images, and a different featured image. This is a complete replacement and must be migrated as a bounded article reconciliation, not patched paragraph by paragraph. The Arabic route remains the older school-readiness version and must not be changed by inference.
4. **`/library/autism-fall-break-routine-tips-halloween-thanksgiving`** retains its broad section structure but contains substantial current editorial changes, updated title/description/H1, revised paragraphs throughout, a new contextual link to the Halloween guide, and two replacement FAQs about returning to school and activity load. This is material drift rather than a single-link repair.

### Smaller body and link drift

- `/library/aac-visual-supports-autism` is missing one public sentence and contextual link to the Halloween article: the public anchor text is “trick-or-treating with an autistic child.”
- `/library/autism-self-advocacy-skills-aba` is missing the confirmed Halloween-planning sentence described above.
- `/library/aba-therapy-summer-routine-tips` says “ages 18 months – 17 years” in the public general resources sentence; local says “ages 2–17.” The same local/public article separately says in-clinic ABA is for ages 2–8 and Social Learners Club is for ages 8–17. Because the accepted operational baseline says general ABA eligibility is 18 months through 8 years and program-specific ranges may differ, this is a clinical/organizational review item rather than an automatic text substitution.
- `/library/play-leisure-skills` is visibly text-equivalent, but the local FAQPage answer includes the final consultation CTA while the public FAQPage JSON-LD omits that CTA. Its lightbox/image implementation also differs while preserving the substantive infographic content.
- English and Spanish `/library/autism-evaluation-what-to-expect` preserve the table text but flatten the public screening/evaluation/diagnosis table into paragraphs. This is a semantic and presentation repair, even though the wording is present.
- Minor exact-target differences remain in older records: several public homepage links use `/` where local Markdown uses `/index`; several external links include a final `.html` that local links omit; the three First/Then routes omit a source self-link around “Stay tuned” text; and several CDC/current-source links differ by suffix. Contact phone/email links that are absent from static parsing are intentionally restored by `ContactObfuscation` at runtime and are not classified as missing content.

### Links to the nine Phase 6C articles

Only contextual article-body links are counted here; navigation, cards, and related-post widgets are excluded.

| New article target | Current public source articles linking to it | Local status |
|---|---|---|
| `/library/autism-after-school-meltdowns` | English and Spanish school-readiness articles | Missing with the two material school-readiness rewrites |
| `/library/autism-back-to-school-transition` | `autism-after-school-meltdowns` | Present with matching anchor text |
| `/library/autism-daily-living-skills-challenges` | English and Spanish school-readiness articles; `picky-eating-autism-parent-guide`; `sleep-issues-autistic-children` | Missing in both school-readiness articles; present in the two new articles |
| `/library/autism-social-skills-by-age` | No contextual body link found | No missing contextual link identified |
| `/library/does-aba-therapy-replace-school` | English and Spanish school-readiness articles; `autism-back-to-school-transition`; `how-many-hours-aba-child-need` | Missing in both school-readiness rewrites; present in both new English articles |
| `/library/halloween-and-autism` | `aac-visual-supports-autism`; `autism-fall-break-routine-tips-halloween-thanksgiving`; `autism-self-advocacy-skills-aba`; `picky-eating-autism-parent-guide` | Missing in the first three; present in `picky-eating-autism-parent-guide` |
| `/library/how-many-hours-aba-child-need` | No contextual body link found | No missing contextual link identified |
| `/library/picky-eating-autism-parent-guide` | `halloween-and-autism` | Present with matching anchor text |
| `/library/sleep-issues-autistic-children` | No contextual body link found | No missing contextual link identified |

The live related-post widgets also changed on 28 routes. Those differences are listed in the matrix as `F`; they must be reconciled from current source relationships rather than inferred from chronology or manually invented.

### Metadata, dates, images, and structured data

- Published dates match on all 74 records at the calendar-date level. The historically reported Spanish self-advocacy date drift is already resolved locally: both public and local now use 2026-04-09.
- All 74 public pages expose a BlogPosting `dateModified`. The nine new Phase 6C records preserve the corresponding date. The 65 older local records have no `updatedDate`; the matrix marks those `U`. HubSpot modification timestamps may represent body, metadata, or system publication activity, so they require source-by-source reconciliation rather than bulk copying.
- All 65 pre-Phase-6C records have a nonempty public featured-image alt string and an empty local rendered featured-image alt. The nine newly migrated records preserve source-supported alt text, except `picky-eating-autism-parent-guide`, where the public featured alt is empty and local has a useful descriptive alt (`A+`). The 65-record alt gap is a bounded accessibility/content remediation batch.
- Visible H1 drift exists on 12 routes, including the four materially rewritten pages. The eight other H1 differences are the Arabic school-readiness and First/Then routes; Spanish executive-function and parent-guide routes; and English communication/social-skills, executive-function, individualized-ABA, and parent-guide routes.
- Four older local meta descriptions are truncated relative to the current source: `aba-therapy-benefits`, `community-highlight-meet-rula-diab`, `new-aia-scottsdale-office`, and `november-2022-aia-update`. The four material rewrites also have different title/description metadata.
- Thirteen public pages omit a `<link rel="canonical">`; Astro emits validated self-canonicals for those local routes under the accepted publication policy. That deliberate SEO improvement is recorded as `C`, not proposed for reversal. The two syndicated pages retain their accepted external canonicals and `noindex`; their local BlogPosting schema remains intentionally excluded.
- The public source has no robots meta on 72 articles and `noindex` on the two syndicated pages. The current normal Astro staging output is globally `noindex,nofollow`. In an authorized indexing-enabled build, the accepted manifest policy—not source-template omission—continues to govern robots, sitemap, external canonical, and hreflang behavior.
- Visible author attribution matched on all 74 pages. Astro continues to preserve `Person.name` as “Rula Diab” while keeping credentialed display text separate, an intentional structured-data improvement over the public display-name encoding.

### `/lp/early-intervention` ownership gate

Exactly one public Library article body links to `/lp/early-intervention`:

| Source article | Public anchor | Public destination | Current local destination | Disposition |
|---|---|---|---|---|
| `/library/how-many-hours-aba-child-need` | “request a consultation with Arizona Institute for Autism” | `/lp/early-intervention?hsLang=en-us` | `/client-consultation` | Pending explicit landing-page owner approval |

The public landing page and `/client-consultation` are not established equivalents. Phase 6C deliberately kept a functional local consultation destination rather than introducing an unapproved `/lp/` route. This audit does not reverse that provisional choice. Before cutover, the owner must approve one of: migrate the campaign route in its proper project, preserve it with an approved destination/redirect, or retain the local consultation destination as an explicit content deviation. No form or route work is authorized here.

### Existing known drift revisited

- **Spanish self-advocacy publication date:** resolved before this audit; public and local both use 2026-04-09.
- **English school-readiness FAQs/program copy:** confirmed as material current drift, with the Spanish counterpart similarly rewritten.
- **Eligibility/program language:** still requires clinical/organizational review. The summer article contains the 18-month/17-year general-resource sentence and the separate 2–8 and 8–17 program statements. The current school-readiness rewrites frame the 2–6 Academy as a clinical ABA program rather than a school substitute.
- **Modification timestamps:** still unreconciled for 65 older records.
- **Related-post titles and links:** current drift confirmed across 28 routes. Several inherited “Now Enrolling … Ages 2–6” titles no longer match the current source title for `aba-school-readiness-arizona`.
- **Older public clinical wording:** the current public and local copies of the syndicated Rula Diab interview remain semantically aligned, including “children and teens” language. Because the article is syndicated, externally canonicalized, and noindex locally, editorial treatment still requires source/organizational approval rather than silent rewriting.

## Per-article difference appendices

These appendices expand the matrix codes for fields that vary by route. Common `A` and `U` findings are already explicit in the matrix and are not repeated here.

### Exact title, description, and H1 differences

| Route | Field | Public source | Local Astro |
|---|---|---|---|
| `/ar/library/aba-school-readiness-guide` | h1 | العودة إلى المدرسة بسهولة \| تدخلات السلوك التحليلية (ABA) من خلال المقدمات والنتائج | العودة إلى المدرسة بسهولة \| تدخلات ABA: تعزيز بالمقدمات والنتائج |
| `/ar/library/first-then-cards-autism-transitions` | h1 | بطاقات "أولاً/ثم": تسهيل الانتقال بين الأنشطة للأطفال المصابين بالتوحّد | بطاقات أولاً/ثم: تمكين الانتقالات للأطفال المصابين بالتوحد |
| `/es/library/aba-school-readiness-arizona` | title | Preparación escolar y autismo en Arizona: guía para familias | Preparación escolar ABA en AZ \| Academia Preparatoria AIA (2 a 6 años) |
| `/es/library/aba-school-readiness-arizona` | description | Descubra cómo apoyar la preparación escolar de su hijo autista. Explore habilidades de comunicación, independencia, regulación y participación en grupo. | Programa de preparación escolar temprana que une ABA y currículo acreditado para niños de 2 a 6 años en habilidades académicas, sociales y de comunicación. |
| `/es/library/aba-school-readiness-arizona` | h1 | Preparación escolar para niños autistas en Arizona: cómo puede ayudar la terapia ABA | Preparación escolar ABA en AZ \| Academia Preparatoria AIA (2 a 6 años) |
| `/es/library/executive-functioning-skills-autism` | h1 | Habilidades de funcionamiento ejecutivo y autismo | Habilidades de funcionamiento ejecutivo y autismo: estrategias de éxito |
| `/es/library/parents-guide-to-autism-and-aba` | h1 | Guía de Autismo para Padres y Cuidadores | Cómo ayudar a su hijo autista: Una guía para padres y cuidadores |
| `/library/aba-school-readiness-arizona` | title | ABA School Readiness in Arizona: A Parent Guide | ABA School Readiness in Arizona \| AIA Preparatory Academy (Ages 2–6) |
| `/library/aba-school-readiness-arizona` | description | Learn what school readiness means for autistic children in Arizona, which skills support classroom participation, and how individualized ABA may help. | Early school readiness program mixing ABA methods with an accredited curriculum to help children ages 2–6 with academic, social, and communication skills. |
| `/library/aba-school-readiness-arizona` | h1 | ABA School Readiness for Autistic Children in Arizona | ABA School Readiness in Arizona \| AIA Preparatory Academy (Ages 2–6) |
| `/library/aba-school-readiness-guide` | title | Antecedent Interventions & Consequence Strategies in ABA | Ease Back-to-School Time \| ABA Antecedent & Consequence Interventions |
| `/library/aba-school-readiness-guide` | description | Learn how antecedent interventions and consequence strategies work in ABA, including the ABC model, practical examples, reinforcement, and behavioral function. | Ease back-to-school stress and unlock school readiness with simple antecedent and consequence strategies and step‐by‐step ABA tactics any parent can apply. |
| `/library/aba-school-readiness-guide` | h1 | Antecedent and Consequence Interventions in ABA: Strategies and Examples | Ease Back-to-School Time \| ABA Antecedent & Consequence Interventions |
| `/library/aba-therapy-benefits` | description | Discover how ABA therapy, tailored to each child's unique needs, can enhance social skills, communication, and independence in children with autism. | Discover how ABA therapy, tailored to each child |
| `/library/autism-fall-break-routine-tips-halloween-thanksgiving` | title | Autism and Fall Break: Routines and Transition Tips | Autism and Fall Break: Routines, Halloween, and Thanksgiving Tips |
| `/library/autism-fall-break-routine-tips-halloween-thanksgiving` | description | Help your autistic child navigate fall break with flexible daily routines, visual supports, quiet breaks, and plans for changing activities. | Help your child with autism enjoy fall break. Use visual schedules, First/Then cards, and sensory supports for Halloween and Thanksgiving without stress. |
| `/library/autism-fall-break-routine-tips-halloween-thanksgiving` | h1 | Autism and Fall Break: How to Keep Routines Calm and Predictable | Autism and Fall Break: Routines, Halloween, and Thanksgiving Tips |
| `/library/communication-social-skills-autistic-children-guide` | h1 | Building Communication & Social Skills in Autistic Children: A Practical Guide for Families | Building Communication & Social Skills in Autistic Children |
| `/library/community-highlight-meet-rula-diab` | description | Read about Rula Diab's mission to make ABA therapy accessible to children with Autism Spectrum Disorder through her Arizona Institute for Autism. | Read about Rula Diab |
| `/library/executive-functioning-skills-autism` | h1 | Executive Functioning Skills and Autism | Executive Functioning Skills & Autism: Success Strategies Across Ages |
| `/library/individualized-aba-therapy` | h1 | Individualized Care Plans in ABA Therapy | Personalized ABA Therapy Plans \| Schedule Your Free Consultation |
| `/library/new-aia-scottsdale-office` | description | Discover how Arizona Institute for Autism's new Scottsdale office expands autism services, empowering lives with integrity and excellence. Learn more! | Discover how Arizona Institute for Autism |
| `/library/november-2022-aia-update` | description | Nov 2022: Arizona Institute for Autism expresses gratitude to families for their support and commitment, highlighting the community's strength and unity. | Nov 2022: Arizona Institute for Autism expresses gratitude to families for their support and commitment, highlighting the community |
| `/library/parents-guide-to-autism-and-aba` | h1 | Autism Guide for Parents and Caregivers | How to Help Your Autistic Child: A Parent & Caregiver Guide |

### Exact non-contact body-link differences

Phone and email anchors supplied at runtime by the accepted obfuscation component are excluded. Material rewrites are summarized as a whole instead of repeating every missing link here.

| Route | Public-only or changed link | Local-only or changed link |
|---|---|---|
| `/ar/library/first-then-cards-autism-transitions` | ترقّبوا التحديثات → `/ar/library/first-then-cards-autism-transitions` | — |
| `/ar/library/proactive-reactive-aba-strategies-guide` | نظام PECS → `https://www.iidc.indiana.edu/irca/articles/what-is-the-picture-exchange-communication-system-or-pecs.html` | نظام PECS → `https://www.iidc.indiana.edu/irca/articles/what-is-the-picture-exchange-communication-system-or-pecs` |
| `/es/library/autism-evaluation-what-to-expect` | guía del CDC → `https://www.cdc.gov/autism/hcp/diagnosis/screening.html` | — |
| `/es/library/autism-family-self-care-tips` | Instituto de Autismo de Arizona → `/` | Instituto de Autismo de Arizona → `/index` |
| `/es/library/enhancing-generalization-skills` | https://www.azinstitute4autism.com → `/` | https://www.azinstitute4autism.com → `/index` |
| `/es/library/first-then-cards-autism-transitions` | Manténgase atento a las actualizaciones → `/es/library/first-then-cards-autism-transitions` | — |
| `/library/aac-visual-supports-autism` | trick-or-treating with an autistic child → `/library/halloween-and-autism` | — |
| `/library/aba-therapy-benefits` | https://www.azinstitute4autism.com → `/` | https://www.azinstitute4autism.com → `/index` |
| `/library/aba-toilet-training-child-autism` | www.azinstitute4autism.com → `/` | www.azinstitute4autism.com → `/index` |
| `/library/asd-sensory-friendly-recipe-thanksgiving-pumpkin-cake` | https://www.azinstitute4autism.com → `/` | https://www.azinstitute4autism.com → `/index` |
| `/library/autism-evaluation-what-to-expect` | CDC guidance → `https://www.cdc.gov/autism/hcp/diagnosis/screening.html` | — |
| `/library/autism-family-self-care-tips` | Arizona Institute for Autism → `/` | Arizona Institute for Autism → `/index` |
| `/library/autism-self-advocacy-skills-aba` | Halloween planning guide → `/library/halloween-and-autism` | — |
| `/library/behavior-modification-techniques-reinforcement-theory` | ABC model → `https://www.iidc.indiana.edu/irca/articles/observing-behavior-using-a-b-c-data.html`<br>(image link) → `/hubfs/abc-data-template-download.png`<br>https://www.azinstitute4autism.com → `/` | ABC model → `https://www.iidc.indiana.edu/irca/articles/observing-behavior-using-a-b-c-data`<br>https://www.azinstitute4autism.com → `/index` |
| `/library/community-highlight-meet-rula-diab` | https://www.azinstitute4autism.com → `/` | https://www.azinstitute4autism.com → `/index` |
| `/library/early-signs-autism-by-age` | signs and symptoms of autism → `https://www.cdc.gov/autism/signs-symptoms/index.html`<br>clinical screening for autism at 18 and 24 months → `https://www.cdc.gov/autism/hcp/diagnosis/screening.html`<br>common autism signs parents may notice → `https://www.cdc.gov/autism/signs-symptoms/index.html`<br>autism signs and symptoms → `https://www.cdc.gov/autism/signs-symptoms/index.html`<br>clinical autism screening → `https://www.cdc.gov/autism/hcp/diagnosis/screening.html` | common autism signs parents may notice → `https://www.cdc.gov/autism/signs-symptoms/index`<br>autism signs and symptoms → `https://www.cdc.gov/autism/signs-symptoms/index`<br>clinical screening for autism at 18 and 24 months → `https://www.cdc.gov/autism/hcp/diagnosis/screening`<br>clinical autism screening → `https://www.cdc.gov/autism/hcp/diagnosis/screening`<br>signs and symptoms of autism → `https://www.cdc.gov/autism/signs-symptoms/index` |
| `/library/enhancing-generalization-skills` | https://www.azinstitute4autism.com → `/` | https://www.azinstitute4autism.com → `/index` |
| `/library/first-then-cards-autism-transitions` | Stay tuned for updates → `/library/first-then-cards-autism-transitions` | — |
| `/library/how-many-hours-aba-child-need` | request a consultation with Arizona Institute for Autism → `/lp/early-intervention` | request a consultation with Arizona Institute for Autism → `/client-consultation` |
| `/library/integrated-aba-model-announcement` | https://www.azinstitute4autism.com → `/` | https://www.azinstitute4autism.com → `/index` |
| `/library/new-aia-scottsdale-office` | the original article → `https://www.scottsdale.org/airpark/features/integrity-empowerment-and-excellence-arizona-institute-for-autism-expands-to-new-office/article_79c31a18-2f35-11ee-9459-6f29f5a08420.html` | the original article → `https://www.scottsdale.org/airpark/features/integrity-empowerment-and-excellence-arizona-institute-for-autism-expands-to-new-office/article_79c31a18-2f35-11ee-9459-6f29f5a08420` |
| `/library/new-year-2024-autism-holiday-tips` | www.azinstitute4autism.com → `/` | www.azinstitute4autism.com → `/index` |
| `/library/play-leisure-skills` | × → `/library/play-leisure-skills#!`<br>(image link) → `/library/play-leisure-skills#lightbox-play-infographic`<br>(image link) → `/library/play-leisure-skills#support-play-infographic` | (image link) → `/assets/images/autistic-play-appearance-infographic.png`<br>(image link) → `/assets/images/how-to-support-playtime.png` |
| `/library/proactive-reactive-aba-strategies-guide` | PECS system → `https://www.iidc.indiana.edu/irca/articles/what-is-the-picture-exchange-communication-system-or-pecs.html` | PECS system → `https://www.iidc.indiana.edu/irca/articles/what-is-the-picture-exchange-communication-system-or-pecs` |
| `/library/repetitive-behavior` | https://www.azinstitute4autism.com → `/` | https://www.azinstitute4autism.com → `/index` |
| `/library/understanding-autism-support` | https://www.azinstitute4autism.com → `/`<br>PECS system → `https://www.iidc.indiana.edu/irca/articles/what-is-the-picture-exchange-communication-system-or-pecs.html` | PECS system → `https://www.iidc.indiana.edu/irca/articles/what-is-the-picture-exchange-communication-system-or-pecs`<br>https://www.azinstitute4autism.com → `/index` |

### Previous, next, and related-post differences

| Route | Public source | Local Astro |
|---|---|---|
| `/es/library/aba-school-readiness-arizona` | related: Por qué la regulación emocional debería ser el corazón de cada programa de ABA → `/es/library/emotional-regulation-aba` | related: Evaluación del Autismo en Arizona: Guía Paso a Paso para Padres → `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` |
| `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` | related: Preparación escolar para niños autistas en Arizona: cómo puede ayudar la terapia ABA → `/es/library/aba-school-readiness-arizona`<br>related: Guía de Autismo para Padres y Cuidadores → `/es/library/parents-guide-to-autism-and-aba` | related: Por qué mi hijo puede hablar pero aún tiene dificultades sociales → `/es/library/social-pragmatic-communication-autism`<br>related: Descubre consejos para el autocuidado de padres de niños con autismo → `/es/library/autism-family-self-care-tips` |
| `/es/library/emotional-regulation-aba` | previous: Preparación escolar para niños autistas en Arizona: cómo puede ayudar la terapia ABA → `/es/library/aba-school-readiness-arizona`<br>related: Preparación escolar para niños autistas en Arizona: cómo puede ayudar la terapia ABA → `/es/library/aba-school-readiness-arizona` | previous: Ya se inscriben alumnos: Academia Preparatoria AIA para niños de 2 a 6 años → `/es/library/aba-school-readiness-arizona`<br>related: Descubre consejos para el autocuidado de padres de niños con autismo → `/es/library/autism-family-self-care-tips` |
| `/es/library/enhancing-generalization-skills` | related: Descubre consejos para el autocuidado de padres de niños con autismo → `/es/library/autism-family-self-care-tips`<br>related: Guía de Autismo para Padres y Cuidadores → `/es/library/parents-guide-to-autism-and-aba` | related: Por qué mi hijo puede hablar pero aún tiene dificultades sociales → `/es/library/social-pragmatic-communication-autism`<br>related: Evaluación del Autismo en Arizona: Guía Paso a Paso para Padres → `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` |
| `/es/library/first-then-cards-autism-transitions` | related: Guía de Autismo para Padres y Cuidadores → `/es/library/parents-guide-to-autism-and-aba` | related: Evaluación del Autismo en Arizona: Guía Paso a Paso para Padres → `/es/library/autism-evaluation-diagnosis-arizona-parent-guide` |
| `/es/library/positive-reinforcement-techniques` | related: Qué esperar en la primera evaluación de autismo de su hijo → `/es/library/autism-evaluation-what-to-expect` | related: Guía para enseñar la autodefensa en el ABA → `/es/library/autism-self-advocacy-skills-aba` |
| `/es/library/social-pragmatic-communication-autism` | related: Preparación escolar para niños autistas en Arizona: cómo puede ayudar la terapia ABA → `/es/library/aba-school-readiness-arizona` | related: Ya se inscriben alumnos: Academia Preparatoria AIA para niños de 2 a 6 años → `/es/library/aba-school-readiness-arizona` |
| `/library/aac-visual-supports-autism` | related: How to Support ABA Therapy Over Summer Break → `/library/aba-therapy-summer-routine-tips` | related: Supporting Friendships and Social Play for Children with Autism → `/library/autism-friendships-social-play-support` |
| `/library/aba-school-readiness-arizona` | related: Why Emotional Regulation Should Be the Heart of Every ABA Program → `/library/emotional-regulation-aba`<br>related: What to Expect at Your Child’s First Autism Evaluation → `/library/autism-evaluation-what-to-expect`<br>related: Does ABA Therapy Replace School? → `/library/does-aba-therapy-replace-school` | related: November AIA Update → `/library/november-2022-aia-update`<br>related: Critical Thinking Skills for Children with Autism → `/library/critical-thinking-skills`<br>related: Master Proactive & Reactive ABA Techniques – Schedule a Consultation → `/library/proactive-reactive-aba-strategies-guide` |
| `/library/aba-school-readiness-guide` | related: Master Behavior Management: Discover the Four Functions of Behavior → `/library/behavior-management-functions-guide`<br>related: Master Proactive & Reactive ABA Techniques – Schedule a Consultation → `/library/proactive-reactive-aba-strategies-guide`<br>related: Does ABA Therapy Replace School? → `/library/does-aba-therapy-replace-school` | related: Autism Evaluation in Arizona: A Parent's Step-by-Step Guide → `/library/autism-evaluation-diagnosis-arizona-parent-guide`<br>related: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona`<br>related: Learn the Secrets to Effective Rapport Building in ABA Therapy → `/library/autism-therapy-rapport-strategies` |
| `/library/aba-therapy-dtt-net-guide` | related: Learn the Secrets to Effective Rapport Building in ABA Therapy → `/library/autism-therapy-rapport-strategies` | related: The Benefits of ABA Therapy for Children with Autism → `/library/aba-therapy-benefits` |
| `/library/aba-therapy-prompting-parenting-benefits` | related: Understanding Sensory Processing in the Context of ABA Therapy → `/library/sensory-processing` | related: Play and Leisure Skills for Children with Autism → `/library/play-leisure-skills` |
| `/library/aba-therapy-summer-routine-tips` | related: Daily Living Challenges in Autism: Eating, Sleeping & Self-Care → `/library/autism-daily-living-skills-challenges`<br>related: ABA School Readiness for Autistic Children in Arizona → `/library/aba-school-readiness-arizona`<br>related: AAC and Visual Supports 101: Helping Your Child Be Heard → `/library/aac-visual-supports-autism` | related: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona`<br>related: Executive Functioning Skills and Autism → `/library/executive-functioning-skills-autism`<br>related: Autism Guide for Parents and Caregivers → `/library/parents-guide-to-autism-and-aba` |
| `/library/aia-world-autism-community-day-celebration` | related: Learn About DTT and NET Methods for More Effective ABA Therapy → `/library/aba-therapy-dtt-net-guide` | related: Ease Back-to-School Time \| ABA Antecedent & Consequence Interventions → `/library/aba-school-readiness-guide` |
| `/library/autism-fall-break-routine-tips-halloween-thanksgiving` | previous: ABA School Readiness for Autistic Children in Arizona → `/library/aba-school-readiness-arizona`<br>related: Autism Social Skills by Age: How Social Development Changes as Kids Grow → `/library/autism-social-skills-by-age`<br>related: Halloween and Autism: Making the Holiday Comfortable, Safe, and Fun → `/library/halloween-and-autism`<br>related: AAC and Visual Supports 101: Helping Your Child Be Heard → `/library/aac-visual-supports-autism` | previous: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona`<br>related: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona`<br>related: Why Emotional Regulation Should Be the Heart of Every ABA Program → `/library/emotional-regulation-aba`<br>related: How to Support ABA Therapy Over Summer Break → `/library/aba-therapy-summer-routine-tips` |
| `/library/autism-friendships-social-play-support` | next: Daily Living Challenges in Autism: Eating, Sleeping & Self-Care → `/library/autism-daily-living-skills-challenges`<br>related: Autism Social Skills by Age: How Social Development Changes as Kids Grow → `/library/autism-social-skills-by-age` | next: —<br>related: Building Communication & Social Skills in Autistic Children: A Practical Guide for Families → `/library/communication-social-skills-autistic-children-guide` |
| `/library/behavior-management-functions-guide` | next: Antecedent and Consequence Interventions in ABA: Strategies and Examples → `/library/aba-school-readiness-guide` | next: Ease Back-to-School Time \| ABA Antecedent & Consequence Interventions → `/library/aba-school-readiness-guide` |
| `/library/communication-social-skills-autistic-children-guide` | related: ABA School Readiness for Autistic Children in Arizona → `/library/aba-school-readiness-arizona`<br>related: AAC and Visual Supports 101: Helping Your Child Be Heard → `/library/aac-visual-supports-autism` | related: Why My Child Can Talk but Still Struggles Socially → `/library/social-pragmatic-communication-autism`<br>related: What to Expect at Your Child’s First Autism Evaluation → `/library/autism-evaluation-what-to-expect` |
| `/library/critical-thinking-skills` | related: Why My Child Can Talk but Still Struggles Socially → `/library/social-pragmatic-communication-autism` | related: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona` |
| `/library/early-signs-autism-by-age` | related: Autism Guide for Parents and Caregivers → `/library/parents-guide-to-autism-and-aba` | related: The Ultimate Guide to Behavior Modification Techniques & Reinforcement Theory → `/library/behavior-modification-techniques-reinforcement-theory` |
| `/library/managing-aggressive-behavior-outbursts` | previous: Autism Play: Helping Autistic Children Build Play and Leisure Skills → `/library/play-leisure-skills` | previous: Play and Leisure Skills for Children with Autism → `/library/play-leisure-skills` |
| `/library/november-2022-aia-update` | related: Managing Aggressive Behavior Outbursts and Proper Communication with Your Child During those Moments → `/library/managing-aggressive-behavior-outbursts` | related: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona` |
| `/library/parents-guide-to-autism-and-aba` | next: AAC and Visual Supports 101: Helping Your Child Be Heard → `/library/aac-visual-supports-autism`<br>related: ABA School Readiness for Autistic Children in Arizona → `/library/aba-school-readiness-arizona` | next: —<br>related: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona` |
| `/library/play-leisure-skills` | related: Autism Social Skills by Age: How Social Development Changes as Kids Grow → `/library/autism-social-skills-by-age` | related: New Year Goals for Our Children with Autism → `/library/new-year-goals-2023` |
| `/library/positive-reinforcement-techniques` | next: ABA School Readiness for Autistic Children in Arizona → `/library/aba-school-readiness-arizona` | next: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona` |
| `/library/proactive-reactive-aba-strategies-guide` | previous: Antecedent and Consequence Interventions in ABA: Strategies and Examples → `/library/aba-school-readiness-guide`<br>related: ABA School Readiness for Autistic Children in Arizona → `/library/aba-school-readiness-arizona` | previous: Ease Back-to-School Time \| ABA Antecedent & Consequence Interventions → `/library/aba-school-readiness-guide`<br>related: Now Enrolling: AIA Preparatory Academy for Children Ages 2–6 → `/library/aba-school-readiness-arizona` |
| `/library/reduce-behavior-management` | next: Autism Play: Helping Autistic Children Build Play and Leisure Skills → `/library/play-leisure-skills` | next: Play and Leisure Skills for Children with Autism → `/library/play-leisure-skills` |
| `/library/social-pragmatic-communication-autism` | related: AAC and Visual Supports 101: Helping Your Child Be Heard → `/library/aac-visual-supports-autism` | related: Building Communication & Social Skills in Autistic Children: A Practical Guide for Families → `/library/communication-social-skills-autistic-children-guide` |

## Recommended bounded reconciliation batches

1. **Confirmed new-article cross-links:** add the source-supported Halloween sentences/links to self-advocacy and AAC, while folding the fall-break link into that article’s full rewrite. Acceptance: exact contextual sentence and anchor destination, unchanged route/publication policy, link audit passes.
2. **Material English rewrites:** separately migrate current `aba-school-readiness-arizona`, `aba-school-readiness-guide`, and `autism-fall-break-routine-tips-halloween-thanksgiving`, including metadata, headings, FAQs, tables, images, source links, and footer relations. Acceptance: source-backed body/FAQ/media parity and clinical/editorial sign-off; no inferred translations.
3. **Spanish school-readiness rewrite:** migrate only after fluent Spanish plus clinical/editorial review. Acceptance: current nine-question FAQ, current images and links, published Spanish wording, unchanged translation/SEO policy.
4. **Metadata/accessibility batch:** reconcile 65 featured-image alts, eight nonmaterial H1 differences, four truncated descriptions, and 65 source modification dates after determining which HubSpot timestamps reflect editorial changes. Acceptance: language review for Spanish/Arabic, exact image-context review, no blind timestamp copy.
5. **Link and footer batch:** update verified previous/next/related relationships and exact non-contact link targets; preserve runtime obfuscation and approved self-hosting differences. Acceptance: current source relationships, no fabricated recommendations, clean link audit.
6. **Human-decision batch:** resolve summer eligibility wording and the `/lp/early-intervention` destination. Acceptance: documented AIA/owner approval before copy or routing changes.

## Acceptance criteria for closing this audit

- Each material rewrite has a dated source evidence record and human editorial/clinical approval where indicated.
- The three confirmed missing Halloween contextual links/paragraphs are present with exact intended anchors after the applicable rewrite scope is approved.
- All source-supported body sections, FAQ questions/answers, tables, images, alt text, CTAs, and footer relationships are represented without fabricated content.
- Spanish and Arabic copy changes receive fluent-language review; no English fallback is silently inserted into article content.
- Published dates remain unchanged unless independent evidence supports a correction; `updatedDate` values are not bulk copied from HubSpot headers.
- The `/lp/early-intervention` decision is recorded by the route owner before cutover.
- Article eligibility, canonical policy, translation graph, author archive rules, sitemap policy, pagination, redirects, navigation, and search architecture remain unchanged unless a separately authorized milestone changes them.
- Focused Markdown, publication, SEO, Library, route, link, image, blog, generated-HTML, and browser/source-fidelity checks pass after implementation.

## Publication-policy boundary

This audit does not alter the currently reported Phase 6C implementation baseline: 74 Library records; 55 English, 12 Spanish, and seven Arabic; 121 generated HTML routes; 107 indexing-enabled sitemap URLs; 174 hreflang links across 53 routes; nine repository redirects; and the existing page-6 routes derived from real catalog entries. Those counts establish route completeness, not editorial parity.

## Working-tree status

The only new file created by this supplemental task is this report. The prior Phase 6C implementation remains unstaged and uncommitted. The protected root `merge-plan.md` and superseded `reports/route-reconciliation-2026-10-11-offline.json` were not read, modified, staged, overwritten, or deleted. `reports/SESSION_HANDOFF.md` remains unchanged.

### Exact status after the audit

```text
 M www/reports/blog-content-audit.md
 M www/reports/migration-summary.md
 M www/reports/page-imagery-audit.md
 M www/reports/seo-audit.md
 M www/src/data/blog-footers.json
 M www/src/utils/library-catalog.ts
 M www/tools/library.test.mjs
?? merge-plan.md
?? www/public/assets/images/aba-hours-recommendation-delivery.webp
?? www/public/assets/images/aba-therapy-replace-school.webp
?? www/public/assets/images/aba-therapy-vs-school.webp
?? www/public/assets/images/aba-to-group-transition.webp
?? www/public/assets/images/abc-worksheet.webp
?? www/public/assets/images/after-school-routine-chart.webp
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
?? www/public/assets/images/parent-pediatric-support-team-meeting.webp
?? www/public/assets/images/picky-eating-autism-parent-guide.webp
?? www/public/assets/images/prompt-fading-therapist-help-600.jpg
?? www/public/assets/images/recommended-hours-aba-therapy.webp
?? www/public/assets/images/school-readiness-planning.webp
?? www/public/assets/images/sleep-diary.webp
?? www/public/assets/images/sleep-issues-autism-bedtime-routines.webp
?? www/public/assets/images/social-demands-change-as-child-grows.webp
?? www/public/assets/images/support-tools-transition-help.webp
?? www/reports/phase-6c-article-parity-audit-2026-10-11.md
?? www/reports/phase-6c-source-evidence-2026-10-11.json
?? www/reports/route-reconciliation-2026-10-11-offline-04-58-33-208Z.json
?? www/reports/route-reconciliation-2026-10-11-offline.json
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
