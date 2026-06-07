# Autonomous Codex

Use the project launcher to run Codex with the `azi4a2-autonomous` permission
profile:

```sh
./codex-auto
```

For a non-interactive task:

```sh
./codex-auto exec "Continue the Astro migration, verify the build and audits, and document unresolved issues."
```

The launcher automatically permits non-interactive runs in this mounted
workspace even when Codex cannot discover its Git metadata.

The profile:

- never pauses for approval
- limits filesystem access to minimal runtime files plus this project
- allows writes in this project
- keeps `.codex` and `www.azinstitute4autism.com` read-only
- permits normal Git operations, including staging and committing
- enables live web search and outbound network retrievals

Outbound network access is domain-unrestricted because package installation and
retrieval sources vary. The sandbox cannot distinguish a retrieval from another
outbound request, so do not place secrets in project files or task prompts.

The profile is stored outside the workspace at:

```txt
~/.codex/azi4a2-autonomous.config.toml
```

Do not add `--sandbox`; legacy sandbox flags override the custom permission
profile. Do not use `--dangerously-bypass-approvals-and-sandbox`.

## Verification

The nested setup smoke test confirmed that the project is readable and
`~/.codex/auth.json` is not readable. In the current host session, sandboxed
shell retrievals resolved domains but were reset by the beta network proxy.
After launching `./codex-auto` directly, verify shell retrievals with:

```sh
curl -fsS https://registry.npmjs.org/astro >/dev/null
```

Live web search is separate from shell network access and remains enabled.
