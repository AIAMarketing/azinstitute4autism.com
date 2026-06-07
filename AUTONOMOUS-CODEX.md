# Autonomous Codex

Use the project launcher to run Codex with the `azi4a2-autonomous` permission
profile:

```sh
./codex-auto
```

Start a fresh session with this command. Running plain `codex`, opening Codex
through an editor integration, or continuing an already-running session does
not automatically activate this profile.

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
- permits read-only Git inspection
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

In the current environment, the beta network proxy permits retrievals but
sandboxed command-line tools may fail HTTPS certificate verification. Do not
disable certificate verification for package installation or sensitive
retrievals; use live web search or review the retrieval from the host instead.

## Git limitation

Codex always protects `.git` recursively in its `workspace-write` sandbox.
Agents can inspect Git state and diffs, but cannot stage or commit. This cannot
be overridden by a permissions profile.

For autonomous commits, use an outer container or VM as the security boundary,
mount only this project into it, and run Codex with full access inside that
isolated environment. Otherwise, review and commit agent changes from the host.

Writes that appear to succeed directly under `/home/alice` are made to the
sandbox's temporary in-memory root. They do not modify the host home directory.

Check the startup banner before assigning work. It should report:

```txt
approval: never
sandbox: workspace-write ... (network access enabled)
```
