# Tasks: `@alwatr/on`

## Task List

- [x] 1. Scaffold package structure
  - [x] 1.1 Create `pkg/nanolib/on/` directory with `src/` subdirectory
  - [x] 1.2 Create `package.json` following nanolib conventions
  - [x] 1.3 Create `tsconfig.json` following nanolib conventions
  - [x] 1.4 Create `LICENSE` (copy from sibling package)

- [x] 2. Implement source files
  - [x] 2.1 Create `src/main.ts` — re-exports directive and `alwatrOn`
  - [x] 2.2 Create `src/directive.ts` — `AlwatrActionDirective` class
  - [x] 2.3 Create `src/on.ts` — `alwatrOn` helper and shared `eventSignal_`

- [x] 3. Write README.md
  - [x] 3.1 Document installation, syntax format, `alwatrOn` API, and examples

- [x] 4. Build and verify
  - [x] 4.1 Run `bun run build` inside `pkg/nanolib/on/`
  - [x] 4.2 Verify `dist/` output is generated correctly
