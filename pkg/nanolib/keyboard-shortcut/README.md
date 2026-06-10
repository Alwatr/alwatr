# @alwatr/keyboard-shortcut

**Global keyboard-to-action bridge for Alwatr Flux.**

Listens for `keydown` events on `document`, normalizes the pressed key combination, and dispatches a corresponding Flux action. Designed to allow modules to react to keyboard shortcuts declaratively using `onAction()` without coupling to raw DOM events.

---

## Why `@alwatr/keyboard-shortcut`?

In structured, reactive web applications, UI elements and user interactions should flow unidirectionally. Hardcoding `addEventListener('keydown')` within multiple UI components leads to fragmented shortcut management, duplicate event listeners, and difficulty in testing or overriding shortcuts.

`@alwatr/keyboard-shortcut` unifies all keyboard interactions by:

- Listening once globally on the document.
- Normalizing the keyboard combo (e.g. modifier keys ordered deterministically as `ctrl → shift → alt`).
- Dispatching standard typed Flux actions, which components can cleanly subscribe to.

---

## Installation

```bash
bun add @alwatr/keyboard-shortcut
# or
npm i @alwatr/keyboard-shortcut
```

---

## Quick Start

### 1. Initialize the shortcut listener

Call `keyboardShortcutService.setup()` at application bootstrap:

```ts
import {keyboardShortcutService} from '@alwatr/keyboard-shortcut';

keyboardShortcutService.setup();
```

### 2. Subscribe to shortcuts

Subscribe to specific key action types using `onAction` from `@alwatr/action` or `@alwatr/flux`:

```ts
import {onAction} from '@alwatr/flux';

// Close a drawer when Escape is pressed
onAction('key_escape', () => {
  closeDrawer();
});

// Save changes when Ctrl+S is pressed
onAction('key_ctrl_s', () => {
  saveChanges();
});
```

### 3. Registering new shortcuts (Type Safety)

Extend the global `ActionRecord` interface via declaration merging in your codebase to restrict and autocomplete shortcut actions:

```ts
declare module '@alwatr/action' {
  interface ActionRecord {
    key_escape: void;
    key_ctrl_s: void;
    key_ctrl_space: void;
    key_ctrl_shift_u: void;
  }
}
```

---

## Action Naming Convention

Action types are prefixed with `key_` followed by the lowercase combo joined by `_`:

| Keys pressed           | Action type            |
| ---------------------- | ---------------------- |
| Escape                 | `key_escape`           |
| Space                  | `key_space`            |
| Ctrl + S               | `key_ctrl_s`           |
| Ctrl + Space           | `key_ctrl_space`       |
| Shift + Ctrl + U       | `key_ctrl_shift_u`     |
| Alt + Enter            | `key_alt_enter`        |
| Ctrl + Shift + Alt + U | `key_ctrl_shift_alt_u` |

Modifier order is always normalized to: **ctrl → shift → alt** (note: Meta/Command key is treated as Ctrl on Apple devices).

### Text Fields Protection

To prevent intercepting normal user typing, bare shortcut actions (without modifiers, e.g. letters, numbers, Escape, Enter) are automatically ignored when the focus is inside editable elements:

- `<input>`
- `<textarea>`
- `<select>`
- Any element with `contenteditable` attribute

Shortcut combos that **include** a modifier (like `ctrlKey`, `metaKey`, or `altKey`) will still fire inside editable inputs normally (e.g. `Ctrl+S` will still trigger a save action).

---

## API Reference

### `keyboardShortcutService`

The singleton instance of `KeyboardShortcutService` used to manage the lifecycle of keyboard shortcut dispatching.

#### `.setup()`

Registers the global `keydown` event listener on `document` with `capture: true`. Safe to call multiple times (idempotent).

```ts
keyboardShortcutService.setup();
```

#### `.teardown()`

Removes the global `keydown` event listener from the document. Useful for unit tests or micro-frontend unmounting.

```ts
keyboardShortcutService.teardown();
```

---

## 🌊 Part of Alwatr Flux

`@alwatr/keyboard-shortcut` is part of the [Alwatr Flux](https://github.com/Alwatr/alwatr/tree/next/pkg/flux) architecture — a complete Unidirectional Data Flow system for building scalable Progressive Web Applications.

In the Flux architecture, it bridges physical keyboard events to the global action dispatcher, enabling clean separation of concerns between DOM event handling and business logic.

```typescript
// Use @alwatr/flux for the complete architecture
import {keyboardShortcutService, onAction} from '@alwatr/flux';

// Or use standalone
import {keyboardShortcutService} from '@alwatr/keyboard-shortcut';
import {onAction} from '@alwatr/action';
```

→ [View the complete Flux documentation](https://github.com/Alwatr/alwatr/tree/next/pkg/flux)

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
