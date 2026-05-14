# Alwatr Session Storage Provider

A modern, simple, and robust solution for managing JSON objects in the browser's `sessionStorage`. This package provides a clean, class-based API with a factory function to ensure your application's data persistence is safe and maintainable within a single browser tab or window.

[](https://www.npmjs.com/package/@alwatr/session-storage)

## Core Concepts

This library is built upon a few simple but powerful concepts:

1. **Provider Pattern**: Instead of using static functions, you create an _instance_ of a `SessionStorageProvider` for each unique data item you want to manage. This instance is configured once with a name and then used to interact with that specific item.

2. **Static Existence Check**: The static method `SessionStorageProvider.has()` allows you to check if data exists _before_ creating a provider instance. This is highly efficient for scenarios where you only need to know if the data is present, without needing the data itself.

3. **Facade Factory Function**: The `createSessionStorageProvider` function acts as a clean entry point (Facade) to the library. This simplifies the API and decouples your code from the internal class implementation.

## Installation

```bash
# Using yarn
yarn add @alwatr/session-storage

# Using npm
npm install @alwatr/session-storage

```

---

## API and Usage

### Creating a Storage Provider

```typescript
import {createSessionStorageProvider} from '@alwatr/session-storage';

interface FormDraft {
  name: string;
  email: string;
  message: string;
}

const formDraft = createSessionStorageProvider<FormDraft>({
  name: 'contact-form-draft',
  schemaVersion: 1,
});
```

### Writing, Reading, and Removing Data

```typescript
// Write
formDraft.write({name: 'Ali', email: 'ali@example.com', message: 'Hello!'});

// Read (returns null if not found or invalid JSON)
const draft = formDraft.read();

// Check existence without reading
if (formDraft.has()) {
  console.log('Draft exists');
}

// Remove
formDraft.remove();
```

### Storing Complex Types (Maps, Sets, Dates)

You can provide custom `parse` and `stringify` functions in the configuration to store complex types that aren't natively supported by `JSON.stringify`.

```typescript
const mapProvider = createSessionStorageProvider<Map<string, number>>({
  name: 'score-map',
  stringify: (map) => JSON.stringify(Array.from(map.entries())),
  parse: (str) => new Map(JSON.parse(str)),
});
```

---

## 🌊 Part of Alwatr Flux

`@alwatr/session-storage` is the **Session Persistence Layer** of the [Alwatr Flux](https://github.com/Alwatr/alwatr/tree/next/pkg/flux) architecture — a complete Unidirectional Data Flow system for building scalable Progressive Web Applications.

In the Flux architecture, `@alwatr/session-storage` provides **tab-scoped persistence**. It is used internally by `SessionStateSignal` from `@alwatr/signal` to automatically sync signal state with `sessionStorage` — perfect for form drafts, wizard steps, and temporary UI state that should survive page refreshes but not new tabs.

```typescript
// Use @alwatr/flux for the complete architecture (includes SessionStateSignal)
import {SessionStateSignal} from '@alwatr/flux';

const formDraft = new SessionStateSignal({
  name: 'contact-form',
  schemaVersion: 1,
  initialValue: {name: '', email: '', message: ''},
});

// Automatically persisted to sessionStorage on every set()
formDraft.set({name: 'Ali', email: 'ali@example.com', message: ''});

// Or use @alwatr/session-storage standalone for direct storage access
import {createSessionStorageProvider} from '@alwatr/session-storage';
```

→ [View the complete Flux documentation](https://github.com/Alwatr/alwatr/tree/next/pkg/flux)

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
