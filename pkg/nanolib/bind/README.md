# 🔗 @alwatr/bind

**A high-performance, lightweight reactive DOM binding utility for unidirectional data flow.**

`@alwatr/bind` is a framework-agnostic, low-overhead library that maps reactive data sources (Signals) directly into HTML elements using declarative attributes. It allows you to build highly dynamic, interactive, and responsive user interfaces with **zero virtual DOM overhead**, **surgical DOM updates**, and **complete compile-time type safety**.

---

## 🧠 Architectural Philosophy

In traditional modern frameworks, updating state triggers virtual DOM reconciliation or component-wide re-renders. `@alwatr/bind` takes a different, highly optimized approach:

1. **Reactive Projections (ViewModels)**: Instead of binding raw, complex domain signals directly to the UI, you define flat **ViewModels** inside namespaces. These ViewModels project complex domain states into flat records of presentation-ready primitives (`string`, `number`, `boolean`, `null`, `undefined`).
2. **Surgical DOM Updates**: Attributes on DOM elements act as binding anchors. The library hooks directly into the ViewModel's updates and modifies only the targeted text nodes or attributes—without re-running components or diffing trees.
3. **Decoupled Binding**: Views declare _what_ to bind in HTML (`bind_text="user.fullName"`), and the JS controller defines _how_ that data gets derived. This keeps your HTML extremely readable and completely separates presentation from business logic.

---

## ✨ Key Features

- ⚡ **Zero Virtual DOM Overhead**: Updates map directly to `element.textContent`, `element.value`, or attributes.
- 🎯 **Surgical Reactivity**: Only the DOM elements bound to the modified properties will re-render.
- 🛡️ **Cursor Preservation Guard (`bind_value`)**: Binds input element values securely, checking for changes before writing to the DOM. This guards against the browser resetting the text cursor position while typing in an input field.
- 💡 **Presence-Aware Attribute Binding (`bind_attrib`)**:
  - `boolean` values toggle the _presence_ of the attribute (perfect for `disabled`, `checked`, `hidden`).
  - `null`/`undefined` values _remove_ the attribute from the DOM.
  - Primitive values set the attribute value as a string.
- 💤 **Lazy Viewport Evaluation (`lazy_bind`)**: Defer binding registration and signal subscription until the element physically enters the viewport (using `IntersectionObserver` via `@alwatr/directive`). This is ideal for off-screen cards, slow-loading inputs, or heavy dashboard elements.

---

## 🚀 Quick Start

### 1. Register Bind Directives

Call `setupBindDirectives()` at your application's bootstrap phase to register the directives.

```typescript
import {setupBindDirectives} from '@alwatr/bind';

// Register bind_text, bind_value, and bind_attrib directives
setupBindDirectives();
```

### 2. Define your Domain Signal

Define the single source of truth for your feature.

```typescript
import {createState} from '@alwatr/signal';

interface User {
  firstName: string;
  lastName: string;
  cart: Array<{id: number; price: number}>;
  isLoading: boolean;
}

export const userSignal = createState<User>({
  name: 'user-domain-signal',
  initialValue: {
    firstName: 'Ali',
    lastName: 'Mihandoost',
    cart: [],
    isLoading: false,
  },
});
```

### 3. Create a Presentation ViewModel

Project your rich domain model into a flat record of presentation-ready primitives.

```typescript
import {service_binding} from '@alwatr/bind';
import {userSignal} from './user-signal.js';

// Registers 'user.fullName', 'user.cartIsEmpty', and 'user.showLoading'
service_binding.createViewModel('user', userSignal, (u) => ({
  fullName: `${u.firstName} ${u.lastName}`,
  firstName: u.firstName,
  cartIsEmpty: u.cart.length === 0,
  showLoading: u.isLoading,
}));
```

### 4. Declare Bindings in HTML

Use the declarative attributes to bind elements to the ViewModel.

```html
<!-- Binds textContent to 'user.fullName' -->
<h2 bind_text="user.fullName">Loading user...</h2>

<!-- Binds input value with cursor position preservation -->
<input
  type="text"
  bind_value="user.firstName"
  on-input="ui_edit_first_name:$value"
/>

<!-- Binds 'disabled' attribute based on boolean state, and 'aria-busy' based on loading -->
<button bind_attrib="disabled=user.cartIsEmpty; aria-busy=user.showLoading">Checkout</button>

<!-- Lazy loading: updates only when scroll brings the card into viewport -->
<div
  bind_text="user.fullName"
  lazy_bind
></div>
```

---

## 📚 API Reference

### `setupBindDirectives()`

Initializes and registers the `@alwatr/bind` directives eagerly/lazily. Must be called before DOM parsing (typically at entrypoint load).

### `service_binding`

A singleton registry of presentation view models.

#### `service_binding.createViewModel(namespace, sourceSignal, project)`

Registers a reactive ViewModel.

- **`namespace`** (`string`): Unique namespace identifier (e.g., `'user'`).
- **`sourceSignal`** (`IReadonlySignal<S>`): The source signal holding domain state.
- **`project`** (`(value: S) => Record<string, BindingValue>`): The projection function.

#### `service_binding.getViewModel(namespace)`

Retrieves the read-only computed signal mapping of the namespace. Returns `null` if not found.

#### `service_binding.removeViewModel(namespace)`

Destroys the ViewModel computed signal, unsubscribing from the source signal, and removes it from the registry.

---

## 🧩 HTML Attribute Directives

### `bind_text="namespace.property"`

Sets the element's `textContent` to the string value of the ViewModel's property. Maps `null`/`undefined` to `''`.

### `bind_value="namespace.property"`

Sets the element's `value` attribute (for inputs, selects, textareas). Features a **DOM write guard**:

```typescript
if (inputEl.value !== nextValue) {
  inputEl.value = nextValue;
}
```

This ensures that user input typing feels smooth and the text cursor does not reset or jump to the end of the input field.

### `bind_attrib="attr1=namespace.prop1; attr2=namespace.prop2"`

Binds element attributes to ViewModel properties. Multiple attributes are semicolon-separated.

- **Boolean values**:
  - `true`: Sets the attribute with an empty string value (e.g., `disabled=""`).
  - `false`: Removes the attribute entirely from the element.
- **Nullish values (`null`/`undefined`)**: Removes the attribute entirely.
- **Other values**: Sets the attribute value coerced as a string.

### `lazy_bind`

When placed alongside any of the above binding attributes, the directive delays its ViewModel subscription and DOM update cycle until the element intersects with the viewport. This dramatically boosts initial boot time and reduces active subscriptions for long or heavy pages.

---

## 📄 License

Licensed under the **MPL-2.0** License.
