# Flux: Remote Context

A powerful TypeScript library for managing remote context data with offline-first support and automatic revalidation.

## Features

* **Offline-First:**  Prioritizes cached data for a seamless user experience even without a network connection.
* **Automatic Revalidation:**  Keeps your context up-to-date by intelligently fetching fresh data from the server.
* **State Management:**  Built-in state machine tracks the context's lifecycle (initial, loading, offline check, etc.).
* **TypeScript Support:**  Written in TypeScript with full type definitions for improved code quality and developer experience.
* **Customizable:**  Extend the base class to tailor behavior to your specific needs.
* **Built-in Logging:**  Integrated logging for debugging and monitoring context updates.

## Installation

```bash
npm install @alwatr/remote-context
```

## Usage

```typescript
import {AlwatrRemoteContextStateMachine} from '@alwatr/remote-context';

const myContext = new AlwatrRemoteContextStateMachine<{data: string[]}>({
  name: 'my-context',
  url: '/api/context',
  method: 'GET',
});

// Trigger initial fetch (will attempt to use cache first)
myContext.request();

// Access the context (may be cached or freshly fetched)
console.log('Current context:', myContext.context);

// Subscribe to context updates
myContext.subscribe(({state, context}) => {
  if (state === 'complete') {
    console.log('Updated context:', context);
  } else if (state === 'failed') {
    console.error('Context fetch failed!');
  }
});
```

## API

### Core Classes

* **`AlwatrRemoteContextStateMachineBase`**
  * Base class providing core functionality for managing remote context with offline support and revalidation.
  * Extend this class to create custom context state machines with additional states or events.

* **`AlwatrRemoteContextStateMachine`**
  * Concrete implementation for fetching and managing remote context data.
  * Provides access to `state` and `context`.
  * Handles offline checks, automatic revalidation, and state transitions.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.


### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

