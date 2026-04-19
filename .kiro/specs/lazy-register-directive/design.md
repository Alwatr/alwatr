# Lazy Register Directive Bugfix Design

## Overview

The `@directive('alwatr-on')` decorator in `pkg/nanolib/on/src/directive.ts` executes
`directiveRegistry_.set('alwatr-on', AlwatrActionDirective)` at module evaluation time.
This top-level side effect prevents bundlers (esbuild/rollup) from tree-shaking the
`AlwatrActionDirective` class and its logger, causing them to appear in every app bundle
regardless of whether the consumer ever uses `alwatr-on` HTML attributes.

The fix introduces a `lazyDirective(name, constructor)` factory function in
`@alwatr/directive`. Instead of registering via the `@directive` decorator at class
definition time, `directive.ts` in `@alwatr/on` will export a
`registerAlwatrOnDirective` function — the return value of `lazyDirective(...)`. No
registration happens until the consumer explicitly calls that function, making the entire
directive module tree-shakeable.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug — any import from `@alwatr/on`
  causes `AlwatrActionDirective` to be registered in `directiveRegistry_` as a side effect,
  even when the consumer never uses `alwatr-on` HTML attributes.
- **Property (P)**: The desired behavior after the fix — `AlwatrActionDirective` is only
  registered when `registerAlwatrOnDirective()` is explicitly called; importing without
  calling it produces no side effects.
- **Preservation**: All existing directive behavior (attribute parsing, signal dispatch,
  `$value` resolution, `init` event, `alwatrOn()` subscriptions, duplicate guard) must
  remain unchanged after the fix.
- **`directiveRegistry_`**: The `Map<string, DirectiveConstructor>` in
  `pkg/nanolib/directive/src/lib.ts` that maps attribute names to directive constructors.
  `bootstrapDirectives()` reads this map to find and initialize directives on the page.
- **`@directive(name)`**: The existing class decorator in
  `pkg/nanolib/directive/src/directive-decorator.ts` that calls
  `directiveRegistry_.set(name, constructor)` immediately at class definition time —
  the source of the side effect.
- **`lazyDirective(name, constructor)`**: The new factory function to be added to
  `pkg/nanolib/directive/src/directive-decorator.ts`. Returns a zero-argument registration
  function with no side effects at import time.
- **`registerAlwatrOnDirective`**: The exported registration function from
  `pkg/nanolib/on/src/directive.ts`, created by `lazyDirective('alwatr-on', AlwatrActionDirective)`.
- **`AlwatrActionDirective`**: The directive class in `pkg/nanolib/on/src/directive.ts`
  that handles `alwatr-on` HTML attributes.
- **`bootstrapDirectives()`**: The function in `@alwatr/directive` that scans the DOM for
  registered directive attributes and initializes them.

## Bug Details

### Bug Condition

The bug manifests when any symbol is imported from `@alwatr/on` (or from `@alwatr/core`,
which re-exports it). At module evaluation time, the `@directive('alwatr-on')` decorator
executes `directiveRegistry_.set('alwatr-on', AlwatrActionDirective)` unconditionally.
This side effect prevents bundlers from eliminating the directive code, even when the
consumer never uses `alwatr-on` HTML attributes.

**Formal Specification:**

```
FUNCTION isBugCondition(X)
  INPUT: X of type ImportEvent
  OUTPUT: boolean

  // Returns true when the bug is triggered:
  // importing from @alwatr/on causes directive registration as a side effect,
  // without the consumer explicitly opting in.
  RETURN X.importedModule = '@alwatr/on'
     AND X.consumerCallsRegisterAlwatrOnDirective = false
     AND directiveRegistry_.has('alwatr-on') = true   // side effect already happened
END FUNCTION
```

### Examples

- **Import without usage**: A consumer imports `alwatrOn` from `@alwatr/on` to subscribe
  to action signals. Expected: `directiveRegistry_` does NOT contain `'alwatr-on'`.
  Actual (buggy): `directiveRegistry_` already contains `'alwatr-on'` as a side effect of
  the import.

- **Bundle analysis**: An app that never uses `alwatr-on` HTML attributes imports
  `@alwatr/core`. Expected: `AlwatrActionDirective` is absent from the output bundle.
  Actual (buggy): `AlwatrActionDirective` and its logger appear in the bundle because the
  module has a top-level side effect.

- **Explicit registration (correct path)**: A consumer calls `registerAlwatrOnDirective()`
  before `bootstrapDirectives()`. Expected: `directiveRegistry_` contains `'alwatr-on'`
  and all `alwatr-on` elements are initialized. This path works correctly both before and
  after the fix.

- **Edge case — duplicate registration**: `registerAlwatrOnDirective()` is called twice.
  Expected: `directiveRegistry_` still contains exactly one entry for `'alwatr-on'`; the
  second call is silently ignored.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**

- After calling `registerAlwatrOnDirective()` and `bootstrapDirectives()`, all elements
  with `alwatr-on` attributes must be found and initialized exactly as before.
- `AlwatrActionDirective` must continue to parse the `alwatr-on` attribute value using
  `syntaxRegex`, register the DOM event listener, and dispatch the action signal correctly.
- The `init` event type must continue to dispatch the action signal immediately on
  initialization and destroy the directive without registering a persistent DOM listener.
- The `$value` payload must continue to resolve to the element's `.value` property at
  dispatch time.
- `alwatrOn(actionId, handler)` subscriptions must continue to work correctly, invoking
  `handler` only when the dispatched `actionId` matches.
- Duplicate registration guard: calling `registerAlwatrOnDirective()` more than once must
  continue to be silently ignored (no duplicate entry in `directiveRegistry_`).

**Scope:**

All code paths that do NOT involve the `@directive` decorator being applied at module
evaluation time are completely unaffected by this fix. This includes:

- The `AlwatrActionDirective` class implementation (no changes to its logic).
- The `alwatrOn()` subscription method.
- The `bootstrapDirectives()` function.
- All other directives registered via `@directive(...)` (they are unaffected by the new
  `lazyDirective` addition).

## Hypothesized Root Cause

Based on the bug description and code analysis, the root cause is:

1. **Decorator Execution at Class Definition Time**: The `@directive('alwatr-on')` decorator
   is a TypeScript class decorator. In the current implementation, `directive(name)` calls
   `logger.logMethodArgs?.('@directive', name)` and returns a function that immediately
   calls `directiveRegistry_.set(name, constructor)` when the class is defined. Since class
   definitions are evaluated at module load time, this registration is a top-level side
   effect.

2. **No Lazy Registration Primitive**: `@alwatr/directive` only exposes the `@directive`
   decorator, which always registers eagerly. There is no mechanism to defer registration
   until the consumer explicitly opts in.

3. **Unconditional Re-export in `main.ts`**: `pkg/nanolib/on/src/main.ts` re-exports
   `./directive.js` unconditionally. Any import from `@alwatr/on` — even just `alwatrOn`
   from `./method.js` — causes the entire module graph to be evaluated, triggering the
   decorator side effect.

4. **`sideEffects: false` Contradiction**: The package declares `"sideEffects": false` in
   `package.json`, but the `@directive` decorator introduces a real side effect. This
   inconsistency means bundlers may or may not eliminate the code depending on their
   analysis, leading to unpredictable bundle output.

## Correctness Properties

Property 1: Bug Condition — No Side Effect on Import

_For any_ import of `@alwatr/on` where `registerAlwatrOnDirective()` is NOT called, the
fixed module SHALL NOT register `AlwatrActionDirective` in `directiveRegistry_`. Specifically,
`directiveRegistry_.has('alwatr-on')` SHALL return `false` after the import, confirming
that no side effect occurred at module evaluation time.

**Validates: Requirements 2.1, 2.3**

Property 2: Preservation — Registration Behavior When Explicitly Called

_For any_ sequence of calls where `registerAlwatrOnDirective()` IS called (one or more
times), the fixed code SHALL produce the same observable behavior as the original code
after the `@directive` decorator ran: `directiveRegistry_` contains exactly one entry for
`'alwatr-on'` mapping to `AlwatrActionDirective`, `bootstrapDirectives()` finds and
initializes all `alwatr-on` elements, and all directive lifecycle behaviors (attribute
parsing, event dispatch, `$value` resolution, `init` event, `alwatrOn()` subscriptions)
work identically to the original implementation.

**Validates: Requirements 2.2, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File 1**: `pkg/nanolib/directive/src/directive-decorator.ts`

**Change**: Add `lazyDirective` factory function

**Specific Changes**:

1. **Add `lazyDirective` export**: Implement a new exported function that accepts a
   directive `name` and `constructor`, and returns a zero-argument registration function.
   The returned function, when called, performs the same duplicate-guard check and
   `directiveRegistry_.set(...)` call that `@directive` currently does — but deferred to
   call time, not import time.

   ```typescript
   export function lazyDirective<T extends DirectiveBase>(
     name: string,
     constructor: DirectiveConstructor<T>,
   ): () => void {
     return function registerDirective(): void {
       if (directiveRegistry_.has(name)) {
         logger.accident('lazyDirective', 'duplicate_directive_registration', {name});
         return;
       }
       logger.logMethodArgs?.('lazyDirective', name);
       directiveRegistry_.set(name, constructor);
     };
   }
   ```

2. **No changes to `@directive`**: The existing decorator remains unchanged for backward
   compatibility with all other directives that use it.

---

**File 2**: `pkg/nanolib/directive/src/main.ts`

**Change**: Export `lazyDirective` from the public entry point

The existing `export * from './directive-decorator.js'` already covers this — no change
needed, since `lazyDirective` will be added to `directive-decorator.ts`.

---

**File 3**: `pkg/nanolib/on/src/directive.ts`

**Change**: Remove `@directive` decorator, use `lazyDirective` instead

**Specific Changes**:

1. **Update import**: Replace `directive` with `lazyDirective` in the import from
   `@alwatr/directive`.
2. **Remove decorator**: Delete `@directive('alwatr-on')` from `AlwatrActionDirective`.
3. **Add lazy registration export**: After the class definition, add:
   ```typescript
   export const registerAlwatrOnDirective = lazyDirective('alwatr-on', AlwatrActionDirective);
   ```
   This line has no side effect at module evaluation time — it only creates a closure.

---

**File 4**: `pkg/nanolib/on/src/main.ts`

**Change**: No structural change needed

`export * from './directive.js'` already re-exports everything from `directive.ts`,
including the new `registerAlwatrOnDirective` export. The existing re-export is sufficient.

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that
demonstrate the bug on unfixed code, then verify the fix works correctly and preserves
existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix.
Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write a test that imports from `@alwatr/on` without calling any registration
function, then asserts that `directiveRegistry_` does NOT contain `'alwatr-on'`. Run this
test on the UNFIXED code to observe the failure and confirm the root cause.

**Test Cases**:

1. **Import Without Registration Test**: Import `AlwatrActionDirective` from `@alwatr/on`
   without calling `registerAlwatrOnDirective()`, then assert
   `directiveRegistry_.has('alwatr-on') === false`. (Will fail on unfixed code — the
   `@directive` decorator registers it immediately.)

2. **Module Isolation Test**: In a fresh module scope, import only `alwatrOn` (the
   subscription method) from `@alwatr/on`, then assert `directiveRegistry_` is empty.
   (Will fail on unfixed code — importing `main.ts` evaluates `directive.ts`.)

3. **lazyDirective No-Op Test**: Call `lazyDirective('test-directive', MockDirective)` and
   assert that `directiveRegistry_` does NOT contain `'test-directive'` until the returned
   function is called. (Will fail on unfixed code — `lazyDirective` does not exist yet.)

4. **Edge Case — Empty Registry on Import**: Assert that `directiveRegistry_.size === 0`
   immediately after importing `@alwatr/on` in a fresh test environment. (May fail on
   unfixed code depending on module caching.)

**Expected Counterexamples**:

- `directiveRegistry_.has('alwatr-on')` returns `true` immediately after import, before
  any explicit registration call.
- Possible causes: `@directive` decorator executes at class definition time, which is
  module evaluation time.

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed module
produces the expected behavior (no side effect on import).

**Pseudocode:**

```
FOR ALL X WHERE isBugCondition(X) DO
  // i.e., @alwatr/on is imported but registerAlwatrOnDirective() is NOT called
  result := directiveRegistry_.has('alwatr-on')
  ASSERT result = false   // no side effect occurred
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold (i.e., the
consumer explicitly calls `registerAlwatrOnDirective()`), the fixed code produces the same
observable behavior as the original code.

**Pseudocode:**

```
FOR ALL X WHERE NOT isBugCondition(X) DO
  // i.e., registerAlwatrOnDirective() IS called
  ASSERT F(X) = F'(X)
  // directiveRegistry_ contains 'alwatr-on' → AlwatrActionDirective
  // bootstrapDirectives() initializes alwatr-on elements
  // all directive lifecycle behaviors work identically
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking
because:

- It generates many test cases automatically across the input domain (various attribute
  values, element types, event sequences).
- It catches edge cases that manual unit tests might miss (e.g., unusual payload strings,
  rapid event sequences).
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs.

**Test Plan**: Observe behavior on UNFIXED code first for all directive lifecycle paths,
then write property-based tests capturing that behavior.

**Test Cases**:

1. **Registration Idempotency**: Call `registerAlwatrOnDirective()` N times (for any N ≥ 1)
   and verify `directiveRegistry_` contains exactly one entry for `'alwatr-on'`.

2. **Attribute Parsing Preservation**: For any valid `alwatr-on` attribute value matching
   `syntaxRegex`, verify `AlwatrActionDirective` parses it identically before and after
   the fix.

3. **Signal Dispatch Preservation**: Verify that after calling `registerAlwatrOnDirective()`,
   triggering a DOM event on an `alwatr-on` element dispatches the correct action signal
   with the correct payload.

4. **`init` Event Preservation**: Verify that `alwatr-on="init->action-id"` dispatches
   immediately and destroys the directive without a persistent listener.

5. **`$value` Resolution Preservation**: Verify that `alwatr-on="input->search:$value"`
   resolves to the element's `.value` at dispatch time.

### Unit Tests

- Test that `lazyDirective(name, constructor)` returns a function without registering
  anything in `directiveRegistry_`.
- Test that calling the returned function registers the directive in `directiveRegistry_`.
- Test that calling the returned function a second time logs an `accident` and does not
  create a duplicate entry.
- Test `AlwatrActionDirective` attribute parsing for valid and invalid syntax strings.
- Test `AlwatrActionDirective` event listener registration and removal on destroy.
- Test `AlwatrActionDirective` `init` event type: immediate dispatch + self-destroy.
- Test `AlwatrActionDirective` `$value` payload resolution for input-like elements.

### Property-Based Tests

- For any valid `(name, constructor)` pair, `lazyDirective` returns a function that, when
  called exactly once, results in `directiveRegistry_.get(name) === constructor`.
- For any N ≥ 2 calls to the registration function, `directiveRegistry_` still contains
  exactly one entry for `name` (idempotency / duplicate guard).
- For any attribute value string matching `syntaxRegex`, `AlwatrActionDirective` parses
  it to the same `[eventType, actionId, payload]` triple before and after the fix.
- For any attribute value string NOT matching `syntaxRegex`, `AlwatrActionDirective` sets
  `match` to `null` and logs an `accident` without throwing.

### Integration Tests

- Full flow: call `registerAlwatrOnDirective()`, insert an element with
  `alwatr-on="click->open-drawer:main"` into the DOM, call `bootstrapDirectives()`, then
  simulate a click and verify the action signal is dispatched with
  `{actionId: 'open-drawer', actionPayload: 'main'}`.
- Context switching: verify that `alwatrOn('open-drawer', handler)` receives the dispatched
  signal correctly after the fix.
- Verify that importing `alwatrOn` from `@alwatr/on` in a test environment where
  `registerAlwatrOnDirective()` is never called results in `directiveRegistry_` not
  containing `'alwatr-on'`.
