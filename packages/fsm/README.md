# Flux: Finite State Machine

A robust TypeScript library for implementing Flux (Finite) State Machines, enabling clear and organized management of application state and transitions.

## Features

* **Clear State Management:**  Model your application's behavior with well-defined states and transitions.
* **TypeScript Support:** Written in TypeScript with full type definitions for improved code quality and developer experience.
* **Flexible Actions:**  Attach custom actions to state transitions and events.
* **Observable Integration:**  Built-in integration with `@alwatr/observable` for reactive state updates.
* **Built-in Logging:**  Integrated logging for debugging and monitoring state machine behavior.

## Installation

```bash
npm install @alwatr/fsm
```

## Usage

```typescript
import {FluxStateMachineBase} from '@alwatr/fsm';

// Define your states and events
type MyState = 'idle' | 'loading' | 'success' | 'error';
type MyEvent = 'fetch' | 'success' | 'error';

class MyStateMachine extends FluxStateMachineBase<MyState, MyEvent> {
  constructor() {
    super({
      name: 'my-state-machine',
      initialState: 'idle',
    });

    // Define state transitions
    this.stateRecord_ = {
      idle: {
        fetch: 'loading',
      },
      loading: {
        success: 'success',
        error: 'error',
      },
      success: {}, // Terminal state
      error: {},    // Terminal state
    };

    // Define actions (optional)
    this.actionRecord_ = {
      'on_fetch': this.handleFetch,
      'on_success': this.handleSuccess,
      'on_error': this.handleError,
    };
  }

  // ... (Implement your action methods: handleFetch, handleSuccess, handleError)

  // Trigger a state transition
  fetchData() {
    this.transition_('fetch'); 
  }
}
```

## API

### `FluxStateMachineBase<S extends string, E extends string>`

* **`constructor(config: {name: string; loggerPrefix?: string; initialState: S})`:**
  * `config.name`: The name of the state machine (used for logging).
  * `config.loggerPrefix`: Optional prefix for log messages.
  * `config.initialState`: The initial state of the machine.

* **`stateRecord_: StateRecord<S, E>`:**  Defines the states and their possible transitions based on events.

* **`actionRecord_: ActionRecord<S, E>`:**  Binds action names to class methods for execution during transitions.

* **`transition_(event: E)`:**  Triggers a state transition based on the provided event.

* **`shouldTransition_(_eventDetail: StateEventDetail<S, E>): MaybePromise<boolean>`:**  (Optional) Allows you to define custom conditions for transitions.

* **`postTransition__(eventDetail: StateEventDetail<S, E>)`:**  Executes actions associated with state transitions and events.

* **`execAction__(name: ActionName<S, E>, eventDetail: StateEventDetail<S, E>)`:**  Executes a specific action if defined in the `actionRecord_`.

* **`resetToInitialState_()`:**  Resets the machine to its initial state without notifying subscribers.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

[![Exir Studio](https://avatars.githubusercontent.com/u/181194967?s=200&v=4)](https://exirstudio.com)

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

