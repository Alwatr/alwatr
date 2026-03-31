# Flux: Fetch State Machine

A powerful TypeScript library for managing asynchronous fetch requests with a built-in state machine.

## Features

* **Streamlined Fetch Handling:**  Simplify the complexities of fetch requests with clear state management.
* **State Machine Integration:**  Built-in state machine tracks request progress (initial, loading, failed, complete).
* **Flexible Customization:**  Extend base classes to tailor behavior to your specific needs.
* **JSON Support:**  Specialized class for handling JSON responses (`AlwatrJsonFetchStateMachine`).
* **TypeScript Support:** Written in TypeScript with full type definitions for improved code quality and developer experience.
* **Built-in Logging:**  Integrated logging for debugging and monitoring fetch operations.

## Installation

```bash
npm install @alwatr/fetch-state-machine
```

## Usage

### Basic Fetch

```typescript
import {AlwatrFetchStateMachine} from '@alwatr/fetch-state-machine';

const fetcher = new AlwatrFetchStateMachine({
  url: '/api/data',
  method: 'GET',
});

fetcher.request();

// Access state and response
console.log('Current state:', fetcher.state); // 'loading'

// Wait for completion
fetcher.subscribe(({state}) => {
  if (state === 'complete') {
    console.log('Response:', fetcher.rawResponse);
  } else if (state === 'failed') {
    console.error('Fetch failed!');
  }
});
```

### JSON Fetch

```typescript
import {AlwatrJsonFetchStateMachine} from '@alwatr/fetch-state-machine';

const jsonFetcher = new AlwatrJsonFetchStateMachine<{data: string[]}>({
  url: '/api/users',
  method: 'GET',
});

jsonFetcher.request();

// Wait for JSON response
jsonFetcher.subscribe(({state}) => {
  if (state === 'complete') {
    console.log('JSON Data:', jsonFetcher.jsonResponse);
  }
});
```

## API

### Core Classes

* **`AlwatrFetchStateMachineBase`**
  * Base class providing core fetch functionality and state management.
  * Extend this class to create custom fetch state machines with additional states or events.

* **`AlwatrFetchStateMachine`**
  * Concrete implementation for handling general fetch requests.
  * Provides access to `state` and `rawResponse`.

* **`AlwatrJsonFetchStateMachineBase`**
  * Base class for handling fetch requests that return JSON data.
  * Automatically parses JSON responses.
  * Extend this class for custom JSON fetch state machines.

* **`AlwatrJsonFetchStateMachine`**
  * Concrete implementation for fetching and parsing JSON data.
  * Provides access to `state`, `jsonResponse`, and `rawResponse`.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.


### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

