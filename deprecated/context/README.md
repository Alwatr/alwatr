# Flux: Context

A simple yet powerful TypeScript library for managing application context and facilitating efficient communication between components.

## Features

* **Centralized Context:**  Provides a unified location to store and access global application state.
* **Reactive Updates:**  Built-in observer pattern ensures components are automatically notified when the context changes.
* **TypeScript Support:** Written in TypeScript with full type definitions for improved code quality and developer experience.
* **Intuitive API:**  Easy-to-use methods for setting, getting, and clearing context values.
* **Asynchronous Handling:**  `untilChange()` enables components to wait for context updates.
* **Built-in Logging:**  Integrated logging for debugging and monitoring.

## Installation

```bash
npm install @alwatr/context
```

## Usage

```typescript
import {AlwatrContext} from '@alwatr/context';

// Create a new context
const userContext = new AlwatrContext<{name: string; email: string}>({name: 'user-context'});

// Set the context value
userContext.setValue({name: 'Alice', email: '[email address removed]'});

// Get the current context value
const currentUser = userContext.getValue(); 
console.log('Current user:', currentUser); // {name: 'Alice', email: '[email address removed]'}

// Subscribe to context changes
const subscription = userContext.subscribe((newUser) => {
  console.log('User context updated:', newUser);
});

// Update the context
userContext.setValue({name: 'Bob', email: '[email address removed]'});

// Wait for the next context change asynchronously
const nextUser = await userContext.untilChange();
console.log('Next user:', nextUser);

// Unsubscribe when done
subscription.unsubscribe();

// Clear the context value
userContext.expire(); 
```

## API

### `AlwatrContext`

* **`constructor(config: {name: string; loggerPrefix?: string})`:** Creates a new `AlwatrContext` instance.
  * `config.name`: The name of the context (used for logging).
  * `config.loggerPrefix`: Optional prefix for log messages.

* **`getValue(): T | undefined`:**  Gets the current context value. Returns `undefined` if the context has not been set or has expired.

* **`setValue(value: T)`:**  Sets the context value and notifies all subscribers.

* **`subscribe(listenerCallback: ListenerCallback<this, T>, options: SubscribeOptions = {}): SubscribeResult`:**  (Inherited from `AlwatrObservable`) Subscribes to context changes.
  * `listenerCallback`: The function to be called when the context value changes.
  * `options`:
    * `once`: If `true`, the listener will be automatically unsubscribed after the first change.
    * `priority`: If `true`, the listener will be executed before other listeners.
    * `receivePrevious`: If `true`, the listener will be immediately called with the current context value (if available).

* **`unsubscribe(listenerCallback: ListenerCallback<this, T>)`:** (Inherited from `AlwatrObservable`) Unsubscribes a listener from context changes.

* **`expire()`:** Clears the current context value without notifying subscribers.

* **`untilChange()`:** Returns a Promise that resolves with the next context value after a change occurs.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
