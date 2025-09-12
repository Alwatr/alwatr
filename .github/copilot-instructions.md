# Alwatr Signal Codebase Guide for AI Agents

This document provides essential guidance for working within the Alwatr Signal codebase. Adhering to these patterns is crucial for maintaining the project's quality and consistency.

## 1. High-Level Architecture

This is a TypeScript monorepo for **Alwatr Signal**, a powerful, lightweight, and modern reactive programming library.

- **The Core:** The primary and active development is in the `packages/signal` directory. This is the modern implementation of the reactive programming model.
- **Deprecated Code:** The `deprecated` directory contains older, related concepts like `fsm`, `observable`, and `context`. **Do not use or reference code from the `deprecated` directory.** All new development should use the patterns from `packages/signal`.
- **Zero Dependencies:** The core signal library (`packages/signal`) is designed to have zero third-party dependencies. Do not add any unless absolutely necessary and approved.

## 2. Core Concept: The Signal System

The entire architecture is built around "Signals," which are special objects that hold a value or state and notify consumers when they change. Understanding the four types of signals is essential.

### a. `StateSignal`
The foundation of reactivity. It holds a mutable value. Use it to store the application's state.

- **Source:** `packages/signal/src/state-signal.ts`
- **Example:**
  ```typescript
  import {StateSignal} from '@alwatr/signal';

  // A signal to hold a simple counter.
  const counter = new StateSignal<number>({
    signalId: 'app-counter', // Convention: MUST have a unique signalId.
    initialValue: 0,
  });

  // To update the state and notify dependents:
  counter.setValue(1);
  ```

### b. `ComputedSignal`
A read-only signal that derives its value from other signals. It automatically updates when its dependencies change and memoizes the result.

- **Source:** `packages/signal/src/computed-signal.ts`
- **Example:**
  ```typescript
  import {ComputedSignal} from '@alwatr/signal';

  const doubleCounter = new ComputedSignal<string>({
    signalId: 'app-double-counter',
    deps: [counter], // Depends on the `counter` signal.
    get: () => counter.value * 2,
  });

  console.log(doubleCounter.value); // Access the computed value.
  ```

### c. `EffectSignal`
Executes a side effect (like logging, DOM updates, or API calls) in response to changes in its dependent signals.

- **Source:** `packages/signal/src/effect-signal.ts`
- **Example:**
  ```typescript
  import {EffectSignal} from '@alwatr/signal';

  const loggerEffect = new EffectSignal({
    signalId: 'app-logger', // Effects should also have a signalId.
    deps: [counter],
    run: () => {
      console.log(`Counter changed to: ${counter.value}`);
    },
  });
  ```

### d. `EventSignal`
A stateless signal for dispatching one-off events that don't have a persistent value.

- **Source:** `packages/signal/src/event-signal.ts`

## 3. Critical Conventions

- **`signalId` is Mandatory:** Every signal of any type **must** be created with a unique, descriptive `signalId`. This is crucial for debugging and tracing data flow. The format is typically `domain-concept`, e.g., `user-firstName`.
- **Type Safety:** The project is 100% TypeScript. All new code must be strongly typed. Use generics where appropriate, as seen in the signal classes.
- **Lifecycle Management:** Signals have a `destroy()` method. When a signal is no longer needed, its `destroy()` method should be called to prevent memory leaks by cleaning up subscriptions.
- **Asynchronous Flow:** Signal notifications are asynchronous and non-blocking. Do not write code that assumes synchronous state updates.
