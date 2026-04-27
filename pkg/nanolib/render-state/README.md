# @alwatr/render-state

**State-based rendering utility for Unidirectional Data Flow architectures.**

`@alwatr/render-state` provides a clean, type-safe utility for mapping application state values to render functions — the missing piece between your state signals and your UI templates.

---

## Why `@alwatr/render-state`?

In reactive applications, you often need to render different UI based on the current state of a signal or FSM. Without a utility, this leads to verbose `if/else` chains or `switch` statements scattered throughout your rendering code.

`renderState` gives you a **declarative render map** — a plain object that maps each state value to a render function, with a `_default` fallback for unhandled states.

---

## Installation

```bash
bun add @alwatr/render-state
# or
npm i @alwatr/render-state
```

---

## Quick Start

```typescript
import {renderState} from '@alwatr/render-state';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

const currentState: LoadingState = 'loading';

const result = renderState(currentState, {
  idle: () => '<p>Ready to load</p>',
  loading: () => '<p>Loading...</p>',
  success: () => '<p>Data loaded successfully!</p>',
  error: () => '<p>Something went wrong.</p>',
  _default: 'idle', // Fallback to 'idle' render for unknown states
});

console.log(result); // '<p>Loading...</p>'
```

---

## API Reference

### `renderState<R, T>(state, renderRecord, thisArg?)`

Maps a state value to a render function and executes it.

```typescript
function renderState<R, T extends string>(
  state: T,
  renderRecord: Record<T | '_default', undefined | T | (() => R)>,
  thisArg?: unknown,
): R | undefined;
```

**Parameters:**

- `state` — the current state value (must be a string)
- `renderRecord` — an object mapping each state to a render function or alias
- `thisArg` — optional `this` context for render functions

**Render record values:**

| Value type  | Behavior                                                    |
| ----------- | ----------------------------------------------------------- |
| `() => R`   | Calls the function and returns the result                   |
| `string`    | Treats as an alias — looks up that key in the render record |
| `undefined` | Falls through to `_default`                                 |

**`_default` key:**

- If the current state has no matching render function, `_default` is used
- `_default` can be a function (direct fallback) or a string (alias to another state's render)
- If `_default` is also `undefined`, logs an error and returns `undefined`

---

## Advanced Usage

### State Aliasing

Multiple states can share the same render function via string aliases:

```typescript
type OrderState = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

renderState(currentOrderState, {
  pending: () => renderPendingUI(),
  processing: 'pending', // Alias — uses the 'pending' render function
  shipped: () => renderShippedUI(),
  delivered: () => renderDeliveredUI(),
  cancelled: () => renderCancelledUI(),
  refunded: 'cancelled', // Alias — uses the 'cancelled' render function
  _default: 'pending',
});
```

### With `lit-html` Templates

`renderState` pairs naturally with `lit-html` for reactive UI rendering:

```typescript
import {renderState} from '@alwatr/render-state';
import {html, render} from 'lit-html';

type FetchState = 'idle' | 'loading' | 'success' | 'error';

function renderApp(state: FetchState, data?: string[]) {
  render(
    renderState(state, {
      idle: () => html`
        <button @click=${fetchData}>Load Data</button>
      `,
      loading: () => html`
        <div class="spinner">Loading...</div>
      `,
      success: () => html`
        <ul>
          ${data?.map(
            (item) => html`
              <li>${item}</li>
            `,
          )}
        </ul>
      `,
      error: () => html`
        <p class="error">
          Failed to load.
          <button @click=${fetchData}>Retry</button>
        </p>
      `,
      _default: 'idle',
    }),
    document.getElementById('app')!,
  );
}
```

### With Signal Subscriptions

```typescript
import {createStateSignal} from '@alwatr/flux';
import {renderState} from '@alwatr/flux';

type AppState = 'auth' | 'home' | 'settings' | 'loading';

const appStateSignal = createStateSignal<AppState>({
  name: 'app-state',
  initialValue: 'loading',
});

appStateSignal.subscribe((state) => {
  const content = renderState(state, {
    loading: () => renderLoadingScreen(),
    auth: () => renderAuthPage(),
    home: () => renderHomePage(),
    settings: () => renderSettingsPage(),
    _default: 'loading',
  });

  document.getElementById('root')!.innerHTML = content ?? '';
});
```

---

## 🌊 Part of Alwatr Flux

`@alwatr/render-state` is a utility in the [Alwatr Flux](https://github.com/Alwatr/alwatr/tree/next/pkg/flux) architecture — a complete Unidirectional Data Flow system for building scalable Progressive Web Applications.

In the Flux architecture, `renderState` lives at the boundary between the **State Layer** and the **View Layer**. It translates signal values into UI output without any coupling to the state management system itself.

```
State Layer (@alwatr/signal)
  ↓ signal.subscribe(state => ...)
renderState(state, renderMap)  ← @alwatr/render-state
  ↓
View Layer (HTML / lit-html templates)
```

```typescript
// Use @alwatr/flux for the complete architecture
import {renderState, createStateSignal, onAction} from '@alwatr/flux';

// Or use @alwatr/render-state standalone
import {renderState} from '@alwatr/render-state';
```

→ [View the complete Flux documentation](https://github.com/Alwatr/alwatr/tree/next/pkg/flux)

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
