# `@alwatr/fsm` — Declarative & Reactive Finite State Machine Engine

A tiny, production-grade, type-safe, and highly reactive Finite State Machine (FSM) engine tailored for performance-critical TypeScript applications. Built on top of `@alwatr/signal`, it natively supports synchronous state mutations, asynchronous side-effects, and persistent storage mechanisms.

---

## Architecture Overview

The Alwatr FSM architecture bridges classical statechart theory with modern unidirectional data flows. It treats application logic as a deterministic black box that accepts messages and emits discrete, readable state signals.

```
┌────────────────────────────────────────────────────────┐
│                     Alwatr Actor Model                 │
│                                                        │
│  Global Flux Bus (onAction) ──► Input Controller       │
│                                       │                │
│                                       ▼                │
│  ┌──────────────────────────────────────────────────┐  │
│  │ FsmService (The Actor Brain)                     │  │
│  │                                                  │  │
│  │   Event Mailbox (eventSignal.dispatch)           │  │
│  │        │                                         │  │
│  │        ▼                                         │  │
│  │   Transition Evaluator (Atomic / RTC)            │  │
│  │        │                                         │  │
│  │        ├──► Assigner ──► State/Context           │  │
│  │        │                                         │  │
│  │        └──► Entry/Exit Effects (Async)           │  │
│  │                  │                               │  │
│  └──────────────────┼───────────────────────────────┘  │
│                     │                                  │
│                     ▼                                  │
│  Output Bridge (Effects) ──► Global Flux Bus           │
└────────────────────────────────────────────────────────┘
```

---

## Core Philosophy

- **Declarative Logic Formulation**: Define the entire system topology—states, transitions, guard predicates, mutations, and asynchronous jobs—inside a unified, highly scannable configuration matrix.
- **Type-Safe by Design**: Leveraging intense TypeScript inference to validate event payloads, contextual mutations, and conditional flows at compile-time.
- **Run-to-Completion (RTC) Safety**: Processes every dispatched event atomically. Concurrent events are queued and evaluated sequentially to completely eliminate race conditions.
- **Fault Resiliency**: User-defined functions (`condition`, `assigner`, `effect`) are safely executed inside guarded boundaries. Exceptions are caught and captured via internal loggers without compromising machine integrity.

---

## Core Concepts & Glossary

| Term           | Domain Scope           | Description                                                                                                         |
| :------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **State**      | Finite                 | The current discrete behavioral mode of the system (e.g., `'idle'`, `'processing'`).                                |
| **Context**    | Infinite               | The extended quantitative state object containing dynamic domain data (e.g., `{ retries: 0, response: null }`).     |
| **Event**      | Message                | A structured payload containing a unique discriminator `type` string sent to trigger a state evaluation.            |
| **Transition** | Structural Rule        | A predefined path establishing how the machine moves from a source state to a target state upon receiving an event. |
| **Assigner**   | Pure Mutation          | A synchronous, deterministic function that updates a slice of the machine's extended `context`.                     |
| **Effect**     | Imperative Side-Effect | An asynchronous or synchronous block of logic executed upon entering or exiting a given finite state.               |
| **Condition**  | Guard Predicate        | A boolean evaluator that must pass (`true`) for a transition branch to be authorized.                               |

---

## Installation

```bash
npm i @alwatr/fsm
```

---

## API & Usage Blueprint

### 1. Concrete Type Instantiation

Always explicitly define your machine parameters to ensure absolute compile-time validation.

```typescript
import type {MachineEvent} from '@alwatr/fsm';

export type FileState = 'idle' | 'uploading' | 'success' | 'failed';

export interface FileContext {
  fileId: string | null;
  progress: number;
  errorMessage: string | null;
}

export type FileEvent =
  | {type: 'START_UPLOAD'; fileId: string}
  | {type: 'PROGRESS_UPDATE'; percent: number}
  | {type: 'UPLOAD_SUCCESS'}
  | {type: 'UPLOAD_FAILURE'; error: string}
  | {type: 'RETRY'};
```

### 2. Declarative Machine Configuration

Configure your state-chart seamlessly using inline functional primitives.

```typescript
import type {StateMachineConfig} from '@alwatr/fsm';
import type {FileState, FileEvent, FileContext} from './types.js';

/**
 * @context AI: Configuration model detailing the file upload lifecycle.
 * Utilizes direct functional binding to balance KISS principles with reactive UDF execution.
 */
export const fileUploadConfig: StateMachineConfig<FileState, FileEvent, FileContext> = {
  name: 'file-upload-lifecycle',
  initial: 'idle',
  context: {fileId: null, progress: 0, errorMessage: null},
  states: {
    idle: {
      on: {
        START_UPLOAD: {
          target: 'uploading',
          assigners: [(event) => ({fileId: event.fileId, progress: 0, errorMessage: null})], // Pure mutation
        },
      },
    },
    uploading: {
      on: {
        PROGRESS_UPDATE: {
          // Omission of 'target' signifies an internal transition: State remains unchanged, context updates.
          assigners: [(event) => ({progress: event.percent})],
        },
        UPLOAD_SUCCESS: {
          target: 'success',
        },
        UPLOAD_FAILURE: {
          target: 'failed',
          assigners: [(event) => ({errorMessage: event.error})],
        },
      },
    },
    failed: {
      on: {
        RETRY: {
          target: 'uploading',
          condition: (_event, context) => context.fileId !== null, // Structural Guard Gate
        },
      },
    },
    success: {},
  },
};
```

### 3. Service Allocation via the Facade Layer

Instantiate your decoupled engine safely using the standard factory interface.

```typescript
import {createFsmService} from '@alwatr/fsm';
import {fileUploadConfig} from './config.js';

// AI Note: The facade allocates memory-only signals or persistent signals seamlessly based on configuration bounds.
export const fileUploadService = createFsmService(fileUploadConfig);

// Subscribe to atomic state changes across the application view layer
fileUploadService.stateSignal.subscribe((machineState) => {
  console.log(`Current State Name: ${machineState.name}`);
  console.log(`Current Context Data:`, machineState.context);
});

// Dispatch typed messages to invoke the execution cycle
fileUploadService.eventSignal.dispatch({type: 'START_UPLOAD', fileId: 'doc_991'});
```

---

## Advanced Features

### 1. State Persistence

You can seamlessly persist the state machine's state (both the finite state name and the extended context) in `localStorage` by adding the `persistent` configuration object.

```typescript
export const fileUploadConfig: StateMachineConfig<FileState, FileEvent, FileContext> = {
  name: 'file-upload-lifecycle',
  initial: 'idle',
  context: {fileId: null, progress: 0, errorMessage: null},
  persistent: {
    schemaVersion: 1, // Must be incremented if the context shape changes
    storageKey: 'file-upload-state', // Optional. Defaults to `config.name`
  },
  states: {
    // ...
  },
};
```

### 2. Multiple Transitions (Guards & Fallbacks)

For any given event in a state, you can specify an array of transitions instead of a single transition. The FSM evaluates the conditions in order and executes the first transition whose condition returns `true` (or the first transition without a condition, acting as a fallback).

```typescript
states: {
  idle: {
    on: {
      CHECK: [
        { target: 'high', condition: (_event, context) => context.value > 100 },
        { target: 'medium', condition: (_event, context) => context.value > 5 },
        { target: 'low' }, // Unconditional fallback
      ],
    },
  },
}
```

### 3. Multiple Entry/Exit Effects

You can run multiple synchronous or asynchronous side-effects in order when entering or leaving a state by specifying an array of effects.

```typescript
states: {
  active: {
    entry: [
      (event, context) => console.log('First entry effect', event),
      async (event, context) => {
        await saveProgress(context);
      },
    ],
    exit: [
      (event, context) => console.log('Exit effect'),
    ],
  },
}
```

### 4. Event Chaining (Chained Transitions)

An entry or exit effect can optionally return a new event object (with a `type` property). If it does, the FSM will automatically dispatch and evaluate this new event next, allowing you to chain transitions together.

```typescript
states: {
  loading: {
    entry: async (event, context) => {
      try {
        await fetchData(context.fileId);
        return { type: 'AUTO_COMPLETE' }; // Automatically triggered next
      } catch (error) {
        return { type: 'UPLOAD_FAILURE', error: error.message };
      }
    },
    on: {
      AUTO_COMPLETE: { target: 'done' },
      UPLOAD_FAILURE: { target: 'failed' },
    },
  },
}
```

---

## FSM as an Actor

In highly scalable architectures, complex user interface elements or backend workflows are best structured using the **Actor Model**. Under this paradigm, every specialized system is treated as an isolated, sovereign entity called an **Actor**.

An Actor complies strictly with three architectural rules:

1. It maintains isolated local state that nobody else can mutate directly.
2. It processes events via an inbound mailbox sequentially.
3. It sends asynchronous messages to other Actors to notify them of shifts in reality.

### The Alwatr Synergy: FSM + Flux Action Bus

`@alwatr/fsm` acts as the perfect structural core for an Actor.

- **The Brain**: `FsmService` encapsulates your local state (`stateSignal`) and contextual calculations.
- **The Mailbox**: The FSM's `eventSignal` serves as the private inbound message queue.
- **The Global Nervous System**: The global `@alwatr/flux` Action Bus (`dispatchAction` / `onAction`) handles asynchronous messaging between different dockets of the system.

### Concrete Actor Workflow Implementation

By combining an Input Controller, an FsmService, and Output Effects, you construct a pure Actor that is completely decoupled from other business domains.

#### Step A: The Input Gate (The Controller Box)

The Input Controller intercepts generic global intents from the `@alwatr/flux` ecosystem, confirms target context keys, and queues them into the Actor's private FSM mailbox.

```typescript
// account-actor-controller.ts
import {onAction} from '@alwatr/flux';
import {accountFsmService} from './account-actor-service.js';

/**
 * @context AI: Input Mailbox Router for the Account Actor.
 * Intercepts generic UI actions and converts them into specific internal FSM events.
 */
export function setupAccountActorController() {
  // Catching global dialog resolutions without importing the Dialog Service directly
  onAction('ui_confirm_dialog_resolved', (action) => {
    // Structural Guard Boundary check: Ensure this confirmation belongs to this actor
    if (action.context !== 'account_purging_flow') return;

    const isApproved = action.payload === 'approve';

    // Map the external system intent safely to the internal actor machine
    accountFsmService.eventSignal.dispatch(isApproved ? {type: 'CONFIRM'} : {type: 'ABORT'});
  });
}
```

#### Step B: The Core Logic (The Actor Brain Config)

The internal machine processes the transition cleanly. When it shifts state, it uses entry/exit array hooks to broadcast outgoing signals to foreign actors.

```typescript
// account-actor-config.ts
import type {StateMachineConfig} from '@alwatr/fsm';
import {dispatchAction} from '@alwatr/flux';

export const accountActorConfig: StateMachineConfig<any, any, any> = {
  name: 'account-actor-core',
  initial: 'active',
  context: {userId: 'usr_882'},
  states: {
    active: {
      on: {
        TRIGGER_DELETE: {target: 'awaiting_confirmation'},
      },
    },
    awaiting_confirmation: {
      entry: [
        // AI Note: Outbound Messaging. The Actor sends an instruction out over the nervous system.
        () => {
          dispatchAction({
            type: 'confirm_dialog_requested',
            payload: {
              targetContext: 'account_purging_flow',
              title: 'Purge Records',
              message: 'Are you sure you want to completely erase your historical profile?',
            },
          });
        },
      ],
      on: {
        CONFIRM: {target: 'wiping_data'},
        ABORT: {target: 'active'},
      },
    },
    wiping_data: {
      entry: [
        async () => {
          // Perform isolated backend calls...
          dispatchAction({type: 'confirm_dialog_close_requested'});
        },
      ],
    },
  },
};
```

### Strategic Benefits of the Actor Pattern

1. **Absolute Multi-Domain Decoupling**: Services never invoke each other directly. They speak exclusively via event packets, guaranteeing that any single domain can be refactored or swapped out without causing regressions.
2. **Deterministic Parallelism**: Race conditions are structurally impossible. State transitions happen inside isolated microtasks while network responses queue outside the gate.
3. **AI-Agent Optimization**: The explicit segregation of Input Routing (Controllers), Context Transitions (FSM), and Outbound Signals (Effects) provides rigid, understandable boundaries that LLMs can parse and write code for with near-perfect reliability.

---

## API Reference

### `createFsmService(config)`

The primary factory utility to initiate a reactive FSM.

- **`config`**: `StateMachineConfig<TState, TEvent, TContext>` — Declarative system matrix detailing properties and state hooks.
- **Returns**: `FsmService<TState, TEvent, TContext>` — The assigned runtime manager.
  - `stateSignal`: An `IReadonlySignal` broadcasting atomic state shifts.
  - `eventSignal`: An `EventSignal` mailbox utilized to feed messages into the processing core.
  - `destroy()`: Cleans up local allocations to completely prevent memory retention issues.

### Key Types

| Type                       | Description                                                                                  |
| :------------------------- | :------------------------------------------------------------------------------------------- |
| **`MachineState<S, C>`**   | Represents the complete state, containing `name: S` and `context: C`.                        |
| **`MachineEvent<T>`**      | The base interface for events. Must have a `type: T` property.                               |
| **`StateMachineConfig`**   | The main configuration object defining `initial`, `context`, and `states`.                   |
| **`FsmPersistenceConfig`** | Configuration options for FSM state persistence (`schemaVersion`, `storageKey`).             |
| **`Transition`**           | Defines a transition with an optional `target`, `condition`, and `assigners`.                |
| **`Assigner<E, C>`**       | A synchronous function that returns a partial context object to update context.              |
| **`Effect<E, C>`**         | A synchronous or asynchronous function executed on state entry/exit. Can return a new event. |
| **`Condition<E, C>`**      | A boolean guard function that must return `true` for a transition branch to be taken.        |

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
