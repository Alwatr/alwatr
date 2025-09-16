## Alwatr Signal — Copilot instructions (short)

This is a TypeScript monorepo (Yarn v4 workspaces + lerna-lite). The active implementation lives in `packages/signal`. `deprecated/` contains historical experiments — do not reuse or reference it in new code.

What you need to know to be productive
- Core primitives: `StateSignal`, `ComputedSignal`, `EffectSignal`, `EventSignal` (see `packages/signal/src/*`).
- signal identity: every signal requires a `name` (convention: `domain-concept`, e.g. `user-firstName`).
- Lifecycle: `ComputedSignal` and `EffectSignal` must call `.destroy()` when no longer needed — otherwise subscriptions leak. `StateSignal` holds an internal value and also exposes `.destroy()`.
- Async model (important):
  - `StateSignal` / `EventSignal` notify on the microtask queue (Promise -> next microtask).
  - `ComputedSignal` / `EffectSignal` batch and run on the macrotask queue (next macrotask via setTimeout/delay). Rely on this when changing scheduling logic.

Build, test, lint workflows (exact commands)
- Install: use Yarn v4 (project `packageManager: yarn@4.9.4`).
- Full build: `yarn build` (runs `lerna run build`).
- Build single package: `cd packages/signal && yarn build` or `yarn workspace @alwatr/signal run build`.
- Watch: `yarn watch` (parallel watch across packages) or `yarn workspace @alwatr/signal run watch` for local edits.
- Tests: `yarn test` — note tests set NODE_OPTIONS to include `--enable-source-maps --experimental-vm-modules`. Preserve that in CI or when running Jest manually.
- Lint/format: `yarn lint` / `yarn format` (`eslint` + `prettier`). Root scripts run `lerna` and package-level scripts.

Project conventions and gotchas
- Minimal external deps in core: prefer internal `@alwatr/*` helpers. Avoid adding heavy third-party libs to `packages/signal`.
- Public API changes: if you change exports or types in `packages/signal`, update `packages/signal/package.json` (`exports` and `types`) and add unit tests.
- Tests & Node: project's engines require Node >=18.16.0. Jest runs with experimental vm modules — don't remove NODE_OPTIONS.
- Logging/tracing: signals use `name` in logs (see `createLogger` usage in `state-signal.ts`, `computed-signal.ts`) — keep ids stable and descriptive.

Common reference files
- Implementation: `packages/signal/src/{state-signal.ts,computed-signal.ts,effect-signal.ts,event-signal.ts,signal-base.ts}`
- Types: `packages/signal/src/type.ts`
- Package config & build scripts: `packages/signal/package.json`
- Repo build & release: `package.json` (root), `lerna.json` (lerna-lite config)

Rules for automated agents (concrete)
- Never edit or reference code in `deprecated/` — it's intentionally incompatible.
- Preserve TypeScript types and public exports. If you rename or remove exports, update `exports` in `packages/signal/package.json` and add tests.
- When adding or editing Computed/Effect signals, ensure `.destroy()` is called in teardown paths (tests, demos, or components).
- Keep changes small and focused to `packages/signal/src/*` unless a cross-package change is required — run `yarn build` & `yarn test` before opening a PR.

Quick examples (from repo)
- Create a StateSignal: see `packages/signal/src/state-signal.ts` and README examples — use `name` and `initialValue`.
- ComputedSignal must subscribe to deps and be destroyed: see `packages/signal/src/computed-signal.ts` for the pattern using an internal `StateSignal` and macrotask batching.

If anything in these instructions is unclear or you want the agent to expand automated test examples / lifecycle patterns, tell me which part to expand and I will iterate.
Happy to expand any section or add short examples/tests on demand.
