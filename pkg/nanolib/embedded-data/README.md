# `@alwatr/embedded-data`

Framework-agnostic utility to safely extract, parse, and validate embedded JSON data from `<script type="application/json">` DOM nodes.

Designed for **SSR-friendly state hydration** in SPAs and MPAs: the server renders initial state into a script tag, and the client reads it on boot without an extra HTTP round-trip.

---

## Why This Package Exists

Modern web applications often need to pass server-side data to the client without making an extra API call. The standard pattern is to embed JSON in the HTML:

```html
<script
  type="application/json"
  data-user-profile
>
  {"userId": 42, "name": "Ali"}
</script>
```

But extracting this data safely requires:

1. **SSR compatibility** — `document` might not exist in Node.js/Bun server contexts.
2. **Error handling** — the script tag might be missing, empty, or contain invalid JSON.
3. **Type safety** — the parsed JSON might not match the expected TypeScript type.
4. **Memory management** — the (potentially large) JSON string should be freed after extraction.

`@alwatr/embedded-data` encapsulates this entire pattern in a single, reusable class that follows the **Single Responsibility Principle**: it only handles DOM extraction and JSON parsing. Validation logic is externalized via an optional `validator` parameter (Open/Closed Principle).

---

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│              EmbeddedDataCollector<T>                     │
│                                                           │
│  constructor(attributeName, validator?)                   │
│    └─ stores attributeName_ and optional validator_       │
│                                                           │
│  collect(): T | null                                      │
│    ├─ getElement_() → querySelector script tag            │
│    ├─ extractRawData_() → read textContent, clear DOM     │
│    ├─ JSON.parse(rawData)                                 │
│    ├─ validator_?.(parsedData) → optional type-guard      │
│    └─ return validated data or null                       │
└───────────────────────────────────────────────────────────┘
```

**Flow:**

```
[HTML with <script data-foo>]
│
▼
getElement_() ──→ querySelector('[data-foo]')
│
▼
extractRawData_() ──→ element.textContent.trim()
│ element.textContent = '' ← GC hint
▼
JSON.parse()
│
▼
validator_?.(data) ──→ optional type-guard / Zod schema
│
▼
return T | null
```

---

## Installation

```sh
bun add @alwatr/embedded-data
# or
npm install @alwatr/embedded-data
```

---

## Usage

### Basic Usage (No Validation)

```ts
import {EmbeddedDataCollector} from '@alwatr/embedded-data';

// HTML: <script type="application/json" data-config>{"apiUrl": "https://api.example.com"}</script>

const collector = new EmbeddedDataCollector<{apiUrl: string}>('data-config');
const config = collector.collect();

if (config) {
  console.log('API URL:', config.apiUrl);
}
```

### With Type-Guard Validation

```ts
import {EmbeddedDataCollector} from '@alwatr/embedded-data';

interface UserProfile {
  userId: number;
  name: string;
}

function isUserProfile(data: unknown): data is UserProfile {
  return (
    typeof data === 'object'
    && data !== null
    && 'userId' in data
    && typeof (data as any).userId === 'number'
    && 'name' in data
    && typeof (data as any).name === 'string'
  );
}

// HTML: <script type="application/json" data-user>{"userId": 42, "name": "Ali"}</script>

const collector = new EmbeddedDataCollector<UserProfile>('data-user', isUserProfile);
const user = collector.collect();

if (user) {
  console.log(`User ${user.name} (ID: ${user.userId})`);
} else {
  console.error('Invalid user data');
}
```

### With Zod Schema Validation

```ts
import {EmbeddedDataCollector} from '@alwatr/embedded-data';
import {z} from 'zod';

const userSchema = z.object({
  userId: z.number(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof userSchema>;

const collector = new EmbeddedDataCollector<User>('data-user', (data) => {
  const result = userSchema.safeParse(data);
  return result.success;
});

const user = collector.collect();
```

### Lazy Initialization with `@alwatr/lazy`

Combine with `@alwatr/lazy` to defer extraction until the data is actually needed:

```ts
import {lazy} from '@alwatr/lazy';
import {EmbeddedDataCollector} from '@alwatr/embedded-data';

interface AppConfig {
  apiUrl: string;
  features: string[];
}

function isAppConfig(data: unknown): data is AppConfig {
  return typeof data === 'object' && data !== null && 'apiUrl' in data;
}

export const appConfig = lazy(() => {
  const collector = new EmbeddedDataCollector<AppConfig>('data-app-config', isAppConfig);
  return collector.collect();
});

// Later, when config is needed:
const config = appConfig.instance;
if (config) {
  console.log('API URL:', config.apiUrl);
}
```

### Centralized Data Registry Pattern

For larger applications, create a centralized registry of all embedded data sources:

```ts
// src/data/embedded-data.ts
import {lazy} from '@alwatr/lazy';
import {EmbeddedDataCollector} from '@alwatr/embedded-data';
import type {Shop, Product, User} from '../types.js';

function isShopCollection(data: unknown): data is {items: Shop[]} {
  return typeof data === 'object' && data !== null && Array.isArray((data as any).items);
}

function isProductCollection(data: unknown): data is {items: Product[]} {
  return typeof data === 'object' && data !== null && Array.isArray((data as any).items);
}

function isUser(data: unknown): data is User {
  return typeof data === 'object' && data !== null && 'userId' in data;
}

export const embeddedData = {
  shops: lazy(() => {
    const collector = new EmbeddedDataCollector<{items: Shop[]}>('data-shops', isShopCollection);
    return collector.collect();
  }),

  products: lazy(() => {
    const collector = new EmbeddedDataCollector<{items: Product[]}>('data-products', isProductCollection);
    return collector.collect();
  }),

  currentUser: lazy(() => {
    const collector = new EmbeddedDataCollector<User>('data-user', isUser);
    return collector.collect();
  }),
} as const;
```

```ts
// Usage in components
import {embeddedData} from './data/embedded-data.js';

const shops = embeddedData.shops.instance;
if (shops) {
  console.log('Loaded', shops.items.length, 'shops');
}
```

---

## API Reference

### `class EmbeddedDataCollector<T>`

#### `constructor(attributeName: string, validator?: (data: unknown) => data is T)`

Creates a new collector instance.

- **`attributeName`**: The HTML attribute used to query the script tag (e.g., `'data-config'`).
- **validator** (optional): A type-guard function or validation function (e.g., Zod schema parser) to ensure runtime type safety. Must be synchronous.

#### `collect(): T | null`

Synchronously extracts, parses, and validates the embedded JSON payload.

Returns the validated data or `null` on any failure (missing element, parse error, validation failure).

---

## Design Decisions

| Decision                                          | Rationale                                                                                                                     |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Attribute-based selector**                      | More flexible than hardcoded IDs. Allows multiple script tags with different attributes on the same page.                     |
| **`element.textContent = ''` after extraction**   | Proactive memory management — the (potentially large) JSON string can be GC'd immediately after parsing.                      |
| **Externalized validation**                       | Follows the Open/Closed Principle. The class is closed for modification but open for extension via the `validator` parameter. |
| **Sync-only validator**                           | Keeps the API simple and synchronous. Async validation belongs in the business layer, not in the data extraction layer.       |
| **SSR guard (`typeof document === 'undefined'`)** | Prevents crashes in Node.js/Bun server contexts where `document` is not available.                                            |
| **Logger with optional chaining**                 | Debug methods (`logMethod`, `logMethodArgs`) are stripped in production builds when `ALWATR_DEBUG=0`.                         |

---

## Relation to Other Packages

| Package                 | When to use instead                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `@alwatr/lazy`          | Defer extraction until the data is actually needed (combine with `EmbeddedDataCollector`).                             |
| `@alwatr/signal`        | Reactive state management — use `EmbeddedDataCollector` to hydrate the initial state, then manage updates via signals. |
| `@alwatr/fetch`         | Fetching data from HTTP APIs (not embedded in the DOM).                                                                |
| `@alwatr/local-storage` | Persisting state across sessions in the browser (not server-rendered).                                                 |

---

## HTML Setup

On the server side (SSR), render the JSON data into a script tag:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <!-- Embedded state for client-side hydration -->
    <script
      type="application/json"
      data-app-config
    >
      {
        "apiUrl": "https://api.example.com",
        "features": ["dark-mode", "analytics"]
      }
    </script>

    <script
      type="application/json"
      data-user-profile
    >
      {
        "userId": 42,
        "name": "Ali Mihandoost",
        "email": "ali@example.com"
      }
    </script>

    <!-- Your app bundle -->
    <script
      type="module"
      src="/app.js"
    ></script>
  </body>
</html>
```

On the client side, use `EmbeddedDataCollector` to extract and validate the data:

```ts
import {EmbeddedDataCollector} from '@alwatr/embedded-data';

const configCollector = new EmbeddedDataCollector('data-app-config');
const config = configCollector.collect();

const userCollector = new EmbeddedDataCollector('data-user-profile');
const user = userCollector.collect();
```

---

## License

[MPL-2.0](https://mozilla.org/MPL/2.0/) © [Alwatr](https://github.com/Alwatr)
