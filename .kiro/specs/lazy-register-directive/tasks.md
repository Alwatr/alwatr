# Implementation Plan

- [x] 1. Add `lazyDirective` factory to `@alwatr/directive`
  - In `pkg/nanolib/directive/src/directive-decorator.ts`, add exported function `lazyDirective<T extends DirectiveBase>(name: string, constructor: DirectiveConstructor<T>): () => void`
  - The returned function, when called, checks `directiveRegistry_.has(name)` — if true, logs `accident` and returns; otherwise calls `directiveRegistry_.set(name, constructor)`
  - No side effects at import time — only creates a closure
  - No changes to the existing `directive` decorator
  - _Requirements: 2.3, 3.6_

- [x] 2. Refactor `@alwatr/on` directive to use lazy registration
  - In `pkg/nanolib/on/src/directive.ts`, replace `import {directive, DirectiveBase}` with `import {lazyDirective, DirectiveBase}` from `@alwatr/directive`
  - Remove `@directive('alwatr-on')` decorator from `AlwatrActionDirective`
  - After the class definition, add: `export const registerAlwatrOnDirective = lazyDirective('alwatr-on', AlwatrActionDirective);`
  - No changes to `AlwatrActionDirective` class logic
  - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3. Type check both packages
  - Run `bun run build:ts` in `pkg/nanolib/directive`
  - Run `bun run build:ts` in `pkg/nanolib/on`
  - Fix any type errors
