## Alwatr Signal — Copilot instructions (short)

This repo is a TypeScript monorepo (Yarn v4 workspaces + lerna-lite). The active, modern implementation lives in `packages/signal`. Avoid touching `deprecated/` — it contains historical experiments and incompatible patterns.

Key points an AI coding agent must know (actionable):

- Architecture: `packages/signal` implements a small reactive system built from four signal primitives: `StateSignal`, `ComputedSignal`, `EffectSignal`, `EventSignal`. See `packages/signal/src/*.ts` (e.g. `state-signal.ts`, `computed-signal.ts`, `effect-signal.ts`, `event-signal.ts`).
- Conventions: every signal must include a `signalId` (format: `domain-concept`). Computed/Effect signals must call `.destroy()` when disposed to avoid leaks. Strong TypeScript types are required.
- Async model: `StateSignal`/`EventSignal` use microtasks (batched via Promise microtask). `ComputedSignal`/`EffectSignal` schedule work on macrotasks (setTimeout) to dedupe recomputations — rely on this behavior when changing scheduling logic.

- Build & test (repo-level):
  - Install: use Yarn v4 (repo `packageManager: yarn@4.9.4`).
  - Build all packages: `yarn build` (runs `lerna run build`).
  - Build single package: `cd packages/signal && yarn build` (or run package scripts `yarn build:ts` / `yarn build:es`).
  - Watch all: `yarn watch` (lerna parallel watch).
  - Tests: `yarn test` (Jest). Tests set NODE_OPTIONS with `--enable-source-maps --experimental-vm-modules` — preserve that when invoking Jest in CI.

- Lint/format: root provides `yarn lint` and `yarn format` (Prettier + ESLint). Use `yarn run lint` before commits.

- Packaging & release: lerna-lite is configured (see `lerna.json`) and uses conventional commits for changelogs. Releases are gated to branch `next` and use signed tags.

- Dependencies: core signal code prefers zero external third-party deps; it uses internal `@alwatr/*` helpers. When adding deps, prefer internal packages and keep the core small.

- Important files to reference in PRs or when editing behaviour:
  - `packages/signal/src/*` — implementation and tests (e.g. `state-signal.ts`, `computed-signal.ts`, `effect-signal.ts`).
  - `packages/signal/package.json` — package build/test scripts and exports.
  - `package.json` (root) & `lerna.json` — workspace scripts, Node/Yarn engines, release config.

- Release / CI expectations for contributors: keep TypeScript builds green (`tsc --build`), run `yarn build` and `yarn test`, follow conventional commit types (`feat`, `fix`, `perf`, `chore`, `deps`, etc.).

Examples you can use in edits or tests:

- Creating a StateSignal (use `signalId`):
  - See `packages/signal/README.md` for API examples and the repo README for end-to-end samples.

Agent-specific rules (do not infer — follow these):

- Never introduce references to `deprecated/` code in new features. Use `packages/signal` patterns instead.
- Preserve TypeScript types and exports in `packages/signal/package.json` (`exports` -> `dist/*`). If you change public API, update `exports` and `types` and add tests.
- Small edits only: Prefer modifying `packages/signal/src/*` and tests under the same package. For cross-package changes, run full `yarn build` and `yarn test` before requesting a PR.

If anything above is unclear or you want more detail (examples of signal lifecycles, typical unit-test structure, or release steps), tell me which section to expand and I will iterate.

Happy to expand any section or add short examples/tests on demand.
