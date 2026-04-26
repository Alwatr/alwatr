# @alwatr/page-ready

**Lightweight page identity signal for multi page applications routing.**

Reads the `page-id` HTML attribute from the document and notifies subscribers using a dedicated O(1) channel signal. Designed for SSG/SSR setups where each generated page has a different `page-id` baked into the HTML.

---

## Why `@alwatr/page-ready`?

In SSG/SSR apps, the server renders a different HTML page for each route. Each page has a `page-id` attribute somewhere in the document. Instead of a full client-side router, you just need to know _which page is currently loaded_ so you can run page-specific initialization logic.

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
<!-- Each SSG-generated page has a unique page-id — can be on any element -->
<body page-id="home">
  …
</body>
```

### 2. Subscribe and dispatch

```ts
import {onPageReady, subscribePageReady, dispatchPageReady} from '@alwatr/page-ready';

// Optionally constrain valid page IDs with a type alias
type PageId = 'home' | 'about' | 'product-detail';

// Subscribe to a specific page
onPageReady<PageId>('home', () => initHomePage());
onPageReady<PageId>('about', () => initAboutPage());

// Or subscribe to ALL pages and receive the page ID in the handler
subscribePageReady<PageId>((pageId) => {
  console.log('Page ready:', pageId);
  analytics.trackPageView(pageId);
});

// Call once at bootstrap — finds [page-id] anywhere in the document and notifies subscribers
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
            ├─ Map.get('home') → O(1) → invoke only 'home' handlers  (onPageReady)
            └─ global subscribers → invoked for every page ID         (subscribePageReady)
```

- `dispatchPageReady` scans the entire document for the first `[page-id]` element — no argument needed.
- `ChannelSignal` routes in O(1): `onPageReady` handlers for non-matching page IDs are never invoked.
- `subscribePageReady` handlers receive the dispatched page ID and are called on every dispatch.

---

## API Reference

### `onPageReady(pageId, handler)`

Subscribes to a **specific** page becoming ready. The handler is only invoked when the dispatched page ID matches `pageId`.

```ts
function onPageReady<T extends string>(pageId: T, handler: () => Awaitable<void>): SubscribeResult;
```

Pass a string literal union as the generic to constrain valid page IDs:

```ts
type PageId = 'home' | 'about' | 'product-detail';

const sub = onPageReady<PageId>('home', () => initHomePage());
sub.unsubscribe(); // stop listening when no longer needed
```

---

### `subscribePageReady(handler)`

Subscribes to **all** page-ready events. The handler is invoked on every `dispatchPageReady()` call, regardless of which page ID is dispatched. The current page ID is passed as the first argument.

```ts
function subscribePageReady<T extends string>(handler: (pageId: T) => Awaitable<void>): SubscribeResult;
```

Useful for cross-cutting concerns like analytics, logging, or layout transitions that need to react to every page change:

```ts
type PageId = 'home' | 'about' | 'product-detail';

const sub = subscribePageReady<PageId>((pageId) => {
  analytics.trackPageView(pageId);
  updateActiveNavLink(pageId);
});

sub.unsubscribe(); // stop listening when no longer needed
```

---

### `dispatchPageReady()`

Finds the first `[page-id]` element anywhere in the document and notifies all matching subscribers.

```ts
function dispatchPageReady(): void;
```

Call once at application bootstrap. Logs an accident if no `[page-id]` element is found or the attribute value is empty.

The lookup uses `document.querySelector('[page-id]')`, so the attribute can be placed on any element (`<body>`, `<main>`, `<div>`, etc.).

---

## Choosing Between `onPageReady` and `subscribePageReady`

| Use case                                    | API                  |
| ------------------------------------------- | -------------------- |
| Initialize logic for one specific page      | `onPageReady`        |
| React to every page change (analytics, nav) | `subscribePageReady` |
| Multiple pages, each with their own init    | `onPageReady` × N    |
| Single handler that branches on the page ID | `subscribePageReady` |

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
