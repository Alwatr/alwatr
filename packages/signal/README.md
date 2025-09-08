# Flux: Signal

A simple and efficient TypeScript library for event-driven communication using signals.

## Features

* **Lightweight and focused:**  Provides a streamlined implementation of the signal pattern for event handling.
* **TypeScript Support:**  Written in TypeScript with full type definitions for improved code quality and developer experience.
* **Easy to use:**  Intuitive API for emitting and subscribing to events with strongly-typed messages.
* **Asynchronous Support:**  Handle asynchronous events with Promise-based `untilNewNotify` method.
* **Built-in Logging:**  Integrated logging for debugging and monitoring.

## Installation

```bash
npm install @alwatr/signal
```

## Usage

```typescript
import {AlwatrSignal} from '@alwatr/signal';

// Create a new signal
const mySignal = new AlwatrSignal<{message: string}>({name: 'my-signal'});

// Subscribe to the signal
const subscription = mySignal.subscribe((message) => {
  console.log('Received message:', message);
});

// Emit an event
mySignal.notify({message: 'Hello, world!'});

// Wait for the next event asynchronously
const nextMessage = await mySignal.untilNewNotify();
console.log('Next message:', nextMessage);

// Unsubscribe when done
subscription.unsubscribe();
```

## API

### `AlwatrSignal`

* **`constructor(config: {name: string; loggerPrefix?: string})`:** Creates a new `AlwatrSignal` instance.
  * `config.name`: The name of the signal (used for logging).
  * `config.loggerPrefix`: Optional prefix for log messages.

* **`subscribe(listenerCallback: ListenerCallback<this, T>, options: SubscribeOptions = {}): SubscribeResult`:**  (Inherited from `AlwatrObservable`) Subscribes to the signal.
  * `listenerCallback`: The function to be called when an event is emitted.
  * `options`:
    * `once`: If `true`, the listener will be automatically unsubscribed after the first event.
    * `priority`: If `true`, the listener will be executed before other listeners.
    * `receivePrevious`: If `true`, the listener will be immediately called with the last emitted event (if available).
    * `disabled`: If `true`, the listener will not be executed.

* **`unsubscribe(listenerCallback: ListenerCallback<this, T>)`:**  (Inherited from `AlwatrObservable`) Unsubscribes a listener from the signal.

* **`notify(message: T)`:** Emits an event to all subscribers.
  * `message`: The data to be sent to the subscribers.

* **`untilNewNotify()`:** Returns a Promise that resolves with the next emitted event.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.


### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

