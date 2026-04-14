# Implementation Plan: `@on` Event Decorator

## Overview

Implement the `@on(eventType, selector?, options?)` method decorator in `pkg/nanolib/directive/src/util-decorators.ts`, following the same patterns as the existing `@query`, `@queryAll`, and `@attribute` decorators. Add property-based tests using fast-check alongside the existing example-based tests in `util-decorators.test.ts`.

## Tasks

- [x] 1. Implement the `on` decorator in `util-decorators.ts`
  - Add the exported `on` function after the existing `attribute` decorator
  - Signature: `on(eventType: keyof HTMLElementEventMap | string, selector?: string, options?: AddEventListenerOptions | boolean)`
  - Return a decorator typed to `ClassMethodDecoratorContext<DirectiveBase, (event: Event) => void>`
  - Throw `Error` with descriptive message if `context.kind !== 'method'`
  - Inside `context.addInitializer`:
    - Resolve target element: `selector ? this.element_.querySelector(selector) : this.element_`
    - If selector provided and result is `null`, call `this.logger_.warn(...)` and return early
    - Bind the decorated method to `this`: `const boundMethod = value.bind(this)`
    - Call `targetElement.addEventListener(eventType, boundMethod, options)`
    - Call `this.addDestroyHook(() => targetElement.removeEventListener(eventType, boundMethod, options))`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.3, 2.4, 3.1, 3.2_

- [x] 2. Write example-based unit tests for `@on` in `util-decorators.test.ts`
  - [x] 2.1 Add unit tests for basic `@on` behavior
    - Test: `@on` is exported from `util-decorators`
    - Test: applying `@on` to a non-method throws at decoration time
    - Test: decorated method is called when the event fires on `this.element_`
    - Test: two methods decorated with `@on('click')` both fire on a single click
    - Test: `this` inside the decorated method is the directive instance
    - Test: listener is removed after `destroy()` is called
    - Test: selector that matches a child element registers listener on that child
    - Test: selector that matches nothing logs a warning and does not throw
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 4.1, 4.2, 4.3_

  - [ ] 2.2 Write property test for Property 1: listener is invoked with the Event object
    - **Property 1: Listener is invoked with the Event object**
    - **Validates: Requirements 2.1, 2.2**
    - Use `fc.constantFrom(...domEventNames)` to generate random event type strings
    - For each generated event type: create a directive instance, dispatch the event, assert the method was called exactly once with the correct `Event` instance
    - Tag: `Feature: event-decorator, Property 1: listener is invoked with the Event object`
    - Run minimum 100 iterations

  - [ ]\* 2.3 Write property test for Property 2: `this` binding is the directive instance
    - **Property 2: `this` binding is the directive instance**
    - **Validates: Requirements 2.3**
    - Use `fc.constantFrom(...domEventNames)` to generate random event type strings
    - For each generated event type: capture `this` inside the decorated method when the event fires, assert `capturedThis === directiveInstance`
    - Tag: `Feature: event-decorator, Property 2: this binding is the directive instance`
    - Run minimum 100 iterations

  - [ ]\* 2.4 Write property test for Property 3: all `@on` listeners are removed after destroy
    - **Property 3: All `@on` listeners are removed after destroy**
    - **Validates: Requirements 3.1, 3.2, 4.3**
    - Use `fc.array(fc.constantFrom(...domEventNames), {minLength: 1, maxLength: 5})` to generate random sets of event types
    - For each generated set: create a directive with `@on` on multiple methods, call `destroy()`, dispatch all events, assert none of the decorated methods were called
    - Tag: `Feature: event-decorator, Property 3: all @on listeners are removed after destroy`
    - Run minimum 100 iterations

- [x] 3. Checkpoint — Ensure all tests pass
  - Run `bun test` in `pkg/nanolib/directive` and confirm all tests pass. Ask the user if any questions arise.
