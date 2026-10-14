# Phase 7 checkpoint manifest — 2026-10-14

Status: **READY FOR USER-SIGNED PHASE 7 COMMIT** after completed validation and exact-path verification. This is technical checkpoint readiness, not production release approval. Codex has not staged or committed any path.

Branch: `faithful-astro-migration`. Required parent/starting HEAD: `b5bc95bc2b8e36c58e8b4d8ab4b11391374a7883`.
Proposed message: `feat(i18n): reconcile multilingual pages and shared forms`.

## Exact approved paths (22)

Fourteen modified tracked files and eight added files; no deletions. The original implementation comprised 13 modified and seven added files. Checkpoint preparation adds the living handoff modification and this manifest. Other preparation edits clarify existing Phase 7 report, summary and P9-07; application/test/source-evidence files are unchanged during preparation.

```text
www/README.md
www/reports/SESSION_HANDOFF.md
www/reports/accessibility-audit.md
www/reports/migration-summary.md
www/reports/seo-audit.md
www/src/components/ContactForm.astro
www/src/components/FormShell.astro
www/src/components/pages/AuthorArchive.astro
www/src/components/pages/ContactPage.astro
www/src/content/blog/es/positive-reinforcement-techniques.md
www/src/layouts/PageLayout.astro
www/tools/library.test.mjs
www/tools/publication.test.mjs
www/tools/seo.test.mjs
www/reports/phase-7-multilingual-reconciliation-2026-10-14.md
www/reports/phase-7-nonproduction-verification-plan-2026-10-14.md
www/reports/phase-7-source-evidence-2026-10-13.json
www/reports/phase-9-decision-register-2026-10-14.md
www/reports/route-reconciliation-2026-10-14-offline.json
www/src/content/pages/es/privacy-policy.mdx
www/src/utils/form-messages.ts
www/reports/phase-7-checkpoint-manifest-2026-10-14.md
```

## Five preserved exclusions

Do not read, modify, move, delete, stage or checksum the root protected file. The four superseded reports are also preserved without content inspection or modification during this preparation.

```text
merge-plan.md
www/reports/route-reconciliation-2026-10-11-offline.json
www/reports/route-reconciliation-2026-10-12-offline.json
www/reports/route-reconciliation-2026-10-13-offline.json
www/reports/route-reconciliation-2026-10-13-offline-06-16-06-857Z.json
```

Additionally exclude `.phase7-stage-paths.nul`, the temporary staging aid itself. It is not a checkpoint artifact. Build output, scratch files and unrelated paths are not included.

## Inventory clarification and privacy provenance

Manifest-derived non-Library records exclude all three Library-root records: 20 EN / 8 ES / 1 AR draft → 20 EN / 9 ES / 1 AR draft; eligible 28 → 29, EN–ES pairs 8 → 9. The final classification matrix contains 30 records including the draft. Whole pages-collection counts including roots are 21/9/2 → 21/10/2, eligible 31 → 32, pairs 9 → 10. The requested 20/9/1 → 20/10/1 mixes populations and was not forced through source changes. See the corrected [report](phase-7-multilingual-reconciliation-2026-10-14.md).

Spanish privacy evidence is cache-qualified and was retrieved after standard TLS verification failed using a fallback that disabled certificate verification. Captured-response text parity does not prove authenticated origin fidelity. Trusted-source comparison remains required before production, along with fluent Spanish and legal/privacy approval of both policies. No insecure request was repeated, no trusted replacement was invented, and no policy or source evidence was rewritten. P9-07 and all other Phase 9 decisions remain pending.

## Checkpoint revalidation — 2026-10-14

Sequential commands from www with TMPDIR=/tmp and ASTRO_TELEMETRY_DISABLED=1:

| Command | Result |
|---|---|
| npm run check | 92 files; zero errors, warnings or hints |
| npm run test:markdown | 20 passed |
| npm run test:publication | 33 passed |
| npm run test:seo | 35 passed |
| npm run test:library | 49 passed |
| npm run test:routes | 10 passed |
| npm run build | Passed; 122 pages |
| PUBLIC_ALLOW_INDEXING=true npm run build | Passed; 122 pages |
| npm run audit:links | Zero broken internal links |
| npm run audit:images | Zero missing mapped images |
| npm run audit:blog | Zero failures |
| npm run build (last build, normal staging) | Passed; 122 noindex,nofollow pages, empty sitemap, zero hreflang |
| npm run audit:routes -- --check --evidence reports/route-reconciliation-2026-10-14-offline.json | Passed against final staging output; no network or writes |
| git diff --check | Passed |

Indexing-enabled: 122 unique canonical targets, 108 sitemap URLs, 180 hreflang links on 55 routes, 25 translation sets, 74 Library records/search 55/12/7, nine author archives and nine redirects. Both English page-6 routes contain five cards. Existing author/syndicated policies preserved.

The first read-only offline check ran while indexing-enabled output was present and correctly failed with “Offline routes mismatch.” Restoring the normal build made the same saved artifact pass; no artifact regeneration or source correction. Source fingerprint remains `59753ffefd162f9110e05acea73e20147a7fc8286af132ea7b8e1748de180901`, with 133 dispositions and 70 historical requests. npm's inherited http-proxy warning is environmental. No fresh production retrieval, hosted browser test, API mutation or integration activation occurred.

## Handoff and remaining gates

[SESSION_HANDOFF.md](SESSION_HANDOFF.md) now identifies Phase 7 as the last accepted technical implementation, preserves the signed Phase 6C history, and refers to its containing future commit without inventing a SHA. Phase 8 Visual and Accessibility Acceptance is next. Clinical/organizational, fluent Spanish/Arabic, privacy/legal, trusted-source, Arabic clinical/diagram, desktop/mobile/keyboard/no-JS/screen-reader, landing/portal, form/API/isolation, analytics/consent/ads, author SEO, hosting/rollback and launch gates remain open. All ten [Phase 9 decisions](phase-9-decision-register-2026-10-14.md) remain Pending decision.

## Host-terminal procedure (user only)

Run from repository root. Verify starting branch/HEAD and review this exact list before staging. No push is included.

```bash
git branch --show-current
git rev-parse HEAD
git status --short --untracked-files=all
git add --pathspec-from-file=.phase7-stage-paths.nul --pathspec-file-nul
git diff --cached --check
git diff --cached --stat --no-renames
git diff --cached --name-status --no-renames
```

The aid contains exactly 22 unique NUL-separated `:(top,literal)` repository-relative pathspecs. Verify exact staged membership, not just count:

```bash
python3 - <<'PYVERIFY'
from pathlib import Path
import subprocess
raw = Path('.phase7-stage-paths.nul').read_bytes()
assert raw.endswith(b'\0')
items = raw[:-1].split(b'\0')
prefix = b':(top,literal)'
assert len(items) == len(set(items)) == 22
assert all(item.startswith(prefix) for item in items)
expected = {item[len(prefix):] for item in items}
actual = set(filter(None, subprocess.check_output([
    'git', 'diff', '--cached', '--name-only', '--no-renames', '-z'
]).split(b'\0')))
assert actual == expected, (actual - expected, expected - actual)
print('Exact 22-path staged set verified; compare with the approved report list.')
PYVERIFY
```

After review:

```bash
git commit -S -m "feat(i18n): reconcile multilingual pages and shared forms"
git rev-parse HEAD HEAD^
git log -1 --show-signature
git verify-commit HEAD
git show --format= --name-status --no-renames HEAD
git status --short --untracked-files=all
```

Parent must equal the starting SHA above. Verify local signature and all 22 committed paths. The five exclusions and temporary staging aid should remain untracked; the user may remove the aid after verification. No signing-configuration changes or unsigned fallback are authorized. Stop after the signed local commit; pushing remains a separate user action.
