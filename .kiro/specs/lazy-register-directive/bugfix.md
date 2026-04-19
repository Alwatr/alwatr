# Bugfix Requirements Document

## Introduction

The `@directive('alwatr-on')` decorator in `pkg/nanolib/on/src/directive.ts` is applied at module evaluation time, creating a top-level side effect. This means that any consumer importing from `@alwatr/on` (or `@alwatr/core`, which re-exports it) immediately triggers `directiveRegistry_.set('alwatr-on', AlwatrActionDirective)` — even if the app never uses `alwatr-on` HTML attributes. As a result, bundlers (esbuild/rollup) cannot tree-shake the `AlwatrActionDirective` class or its logger, causing the directive code to appear in every app bundle regardless of usage.

The fix introduces a `lazyDirective` factory function in `@alwatr/directive` that returns a registration function. Consumers call that function explicitly to register the directive; if they never call it, the entire directive module is tree-shaken away.

---

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a consumer imports any symbol from `@alwatr/on` (e.g. `alwatrOn`) THEN the system evaluates `directive.ts` as a side effect and immediately registers `AlwatrActionDirective` in `directiveRegistry_`, even if the consumer never uses `alwatr-on` HTML attributes.

1.2 WHEN `@alwatr/core` is imported in any application THEN the system includes the `@alwatr/on` directive code (and its logger) in the final bundle because the `@directive` decorator at module level prevents tree-shaking.

1.3 WHEN a bundler (esbuild/rollup) processes a project that imports `@alwatr/on` THEN the system cannot eliminate `AlwatrActionDirective` from the output bundle, because the module has a top-level side effect (`directiveRegistry_.set(...)`).

### Expected Behavior (Correct)

2.1 WHEN a consumer imports `alwatrOn` from `@alwatr/on` without explicitly registering the directive THEN the system SHALL NOT include `AlwatrActionDirective` or its logger in the final bundle (the directive module is tree-shaken away).

2.2 WHEN a consumer calls `registerAlwatrOnDirective()` (the lazy registration function exported by `@alwatr/on`) THEN the system SHALL register `AlwatrActionDirective` in `directiveRegistry_` exactly once, making it available for `bootstrapDirectives()`.

2.3 WHEN `@alwatr/directive` exposes a `lazyDirective(name, constructor)` factory function THEN the system SHALL return a zero-argument registration function that, when called, registers the given constructor under the given name in `directiveRegistry_` — with no side effects at import time.

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a consumer calls `registerAlwatrOnDirective()` and then calls `bootstrapDirectives()` THEN the system SHALL CONTINUE TO find and initialize all `alwatr-on` attributed elements exactly as before.

3.2 WHEN `AlwatrActionDirective` is initialized on an element with a valid `alwatr-on` attribute THEN the system SHALL CONTINUE TO parse the attribute, register the DOM event listener, and dispatch the action signal correctly.

3.3 WHEN `AlwatrActionDirective` is initialized on an element with `alwatr-on="init->action-id"` THEN the system SHALL CONTINUE TO dispatch the action signal immediately and destroy itself without registering a persistent DOM listener.

3.4 WHEN `AlwatrActionDirective` is initialized on an element with `alwatr-on="input->search-query:$value"` THEN the system SHALL CONTINUE TO resolve the payload to the element's `.value` property at dispatch time.

3.5 WHEN `alwatrOn(actionId, handler)` is called THEN the system SHALL CONTINUE TO subscribe to the shared event signal and invoke `handler` only when the dispatched `actionId` matches.

3.6 WHEN `registerAlwatrOnDirective()` is called more than once THEN the system SHALL CONTINUE TO silently ignore duplicate registrations (existing `@directive` duplicate-guard behavior is preserved).

---

## Bug Condition Pseudocode

### Bug Condition Function

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type ImportEvent
  OUTPUT: boolean

  // Returns true when the bug is triggered:
  // any import from @alwatr/on causes directive registration as a side effect
  RETURN X.importedModule = '@alwatr/on'
     AND X.consumerCallsRegisterDirective = false
END FUNCTION
```

### Fix Checking Property

```pascal
// Property: Fix Checking — directive module must be tree-shakeable
FOR ALL X WHERE isBugCondition(X) DO
  bundleOutput ← bundle(X.entryPoint)
  ASSERT 'AlwatrActionDirective' NOT IN bundleOutput
  ASSERT 'alwatr/on' logger NOT IN bundleOutput
END FOR
```

### Preservation Checking Property

```pascal
// Property: Preservation Checking — existing behavior unchanged when directive is registered
FOR ALL X WHERE NOT isBugCondition(X) DO
  // i.e., consumer explicitly calls registerAlwatrOnDirective()
  ASSERT F(X) = F'(X)
  // bootstrapDirectives() still finds and initializes alwatr-on elements
  // alwatrOn() subscriptions still work correctly
END FOR
```
