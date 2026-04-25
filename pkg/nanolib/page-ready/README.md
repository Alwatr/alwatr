# @alwatr/page-ready

**Lightweight page identity signal for multi page applications grouting.**

## Reads the `page-id` HTML attribute from the document and notifies subscribers using a dedicated O(1) channel signal. Designed for SSG/SSR setups where each generated page has a different `page-id` baked into the HTML.

---

## Why `@alwatr/page-ready`?

In SSG/SSR apps, the server renders a different HTML page for each route. Each page has a `page-id` attribute on `<body>`. Instead of a full client-side router, you just need to know _which page is currently loaded_ so you can run page-specific initialization logic.

`@alwatr/page-ready` solves exactly this — nothing more.

---

## Installation

```bash
bun add @alwatr/page-ready
# or
npm i @alwatr/page-ready
```

---

## Quick Start

### 1. Add `page-id` to your HTML

```html
<!-- Each SSG-generated page has a unique page-id -->
<body page-id="home">
  …
</body>
```

### 2. Subscribe and dispatch

```ts
import {onPageReady, dispatchPageReady} from '@alwatr/page-ready';

// Optionally constrain valid page IDs with a type alias
type PageId = 'home' | 'about' | 'product-detail';

onPageReady<PageId>('home', () => initHomePage());
onPageReady<PageId>('about', () => initAboutPage());

// Call once at bootstrap — finds [page-id] in the document and notifies the matching handler
dispatchPageReady();
```

---

## How It Works

```
dispatchPageReady()
  │
  └─ document.querySelector('[page-id]').getAttribute('page-id') → 'home'
       │
       └─ pageReadyChannel_.dispatch('home')
            │
            └─ Map.get('home') → O(1) → invoke only 'home' handlers
```

- `dispatchPageReady` finds the element automatically — no argument needed.
- `ChannelSignal` routes in O(1): only handlers for the current page ID are invoked.

---

## API Reference

### `onPageReady(pageId, handler)`

Subscribes to a specific page becoming ready.

```ts
function onPageReady<T extends string>(pageId: T, handler: () => void): SubscribeResult;
```

Pass a string literal union as the generic to constrain valid page IDs:

```ts
type PageId = 'home' | 'about' | 'product-detail';

const sub = onPageReady<PageId>('home', () => initHomePage());
sub.unsubscribe(); // stop listening when no longer needed
```

---

### `dispatchPageReady()`

Finds the first `[page-id]` element in the document and notifies matching subscribers.

```ts
function dispatchPageReady(): void;
```

Call once at application bootstrap. Logs an accident if no `[page-id]` element is found.

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
