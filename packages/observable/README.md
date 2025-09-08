# Flux: Observable

A lightweight and flexible TypeScript library for implementing the observer pattern (similar to signals) with events, subscriptions, and convenient features.

## Features

* **Simple and Intuitive:**  Easy-to-use API for subscribing to and emitting events.
* **TypeScript Support:** Written in TypeScript with full type definitions for improved code quality and developer experience.
* **Flexible Options:**  Control subscription behavior with options like `once`, `priority`, and `receivePrevious`.
* **Asynchronous Support:**  Handle asynchronous events with Promise-based callbacks.
* **Built-in Logging:**  Integrated logging for debugging and monitoring.

## Installation

```bash
npm install @alwatr/observable
```

## API

### `AlwatrObservable`

* **`constructor(config: {name: string; loggerPrefix?: string})`:** Creates a new `AlwatrObservable` instance.
  * `config.name`: The name of the signal (used for logging).
  * `config.loggerPrefix`: Optional prefix for log messages.

* **`subscribe(listenerCallback: ListenerCallback<this, T>, options: SubscribeOptions = {}): SubscribeResult`:** Subscribes to the signal.
  * `listenerCallback`: The function to be called when an event is emitted.
  * `options`:
    * `once`: If `true`, the listener will be automatically unsubscribed after the first event.
    * `priority`: If `true`, the listener will be executed before other listeners.
    * `receivePrevious`: If `true`, the listener will be immediately called with the last emitted event (if available).
    * `disabled`: If `true`, the listener will not be executed.

* **`unsubscribe(listenerCallback: ListenerCallback<this, T>)`:** Unsubscribes a listener from the signal.

* **`notify_(message: T)`:** Emits an event to all subscribers.
  * `message`: The data to be sent to the subscribers.

* **`clearMessage_()`:** Clears the current message without notifying subscribers.
* **`untilNewNotify_()`:** Returns a Promise that resolves with the next emitted event.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.


### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

