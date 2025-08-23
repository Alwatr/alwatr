# @alwatr/synapse

**Connect your TypeScript classes to the DOM, declaratively.**

@alwatr/synapse is a lightweight, zero-dependency library that brings the power of directives to vanilla TypeScript. It provides a clean, organized way to attach custom behaviors to DOM elements using CSS selectors, bridging the gap between your logic and your UI without the need for a heavy framework.

## Why Synapse?

In modern web development, we often need to add dynamic behavior to elements: a custom tooltip, a special click handler, an element that loads data, etc. While frameworks handle this, vanilla projects can quickly become cluttered with `document.querySelector` calls and manual event listener management.

Synapse solves this by letting you encapsulate behavior in dedicated classes and declaratively link them to your HTML.

- **Clean & Organized:** Keep your UI logic in self-contained, reusable classes.
- **Declarative:** Simply add a class or attribute to your HTML to activate a behavior.
- **Lightweight:** Adds minimal overhead to your project. No virtual DOM, no complex lifecycle.
- **Idempotent:** Perfect for single-page applications (SPAs) where content is loaded dynamically. You can re-run the bootstrap process on new content without affecting existing elements.

## Features

- **Declarative:** Use CSS selectors to bind behavior to DOM elements.
- **Lightweight:** Tiny footprint with zero dependencies.
- **Idempotent:** Safely re-bootstrap on new content without affecting existing elements.
- **Vanilla TypeScript:** No framework required.

## Installation

```bash
# npm
npm i @alwatr/synapse

# yarn
yarn add @alwatr/synapse

# pnpm
pnpm i @alwatr/synapse
```

## How It Works

Synapse is built around two core concepts:

1. **`@directive(selector)`**: A class decorator that registers a class. You tell Synapse, "any element matching this `selector` should be managed by this class."
2. **`bootstrapDirectives(root?)`**: A function that scans the DOM for elements matching registered selectors and creates an instance of the corresponding class for each one.

## Usage

Let's create a simple "click-to-copy" directive.

### 1. Create a Directive

A directive is a class that receives the target `HTMLElement` in its constructor.

```typescript
// src/copy-button.ts
import {directive} from '@alwatr/synapse';

@directive('[data-copy-button]')
export class CopyButtonDirective {
  private readonly originalText: string;

  constructor(element: HTMLElement) {
    this.originalText = element.textContent ?? 'Copy';

    element.addEventListener('click', this.handleClick.bind(this));
  }

  async handleClick(event: MouseEvent): Promise<void> {
    const element = event.currentTarget as HTMLElement;
    const textToCopy = element.dataset.copyText ?? 'No text to copy!';

    try {
      await navigator.clipboard.writeText(textToCopy);
      element.textContent = 'Copied!';
    } catch (err) {
      console.error('Failed to copy:', err);
      element.textContent = 'Failed!';
    }

    setTimeout(() => {
      element.textContent = this.originalText;
    }, 2000);
  }
}
```

### 2. Bootstrap Your Application

In your main entry point, import your directives and call `bootstrapDirectives` once the DOM is ready.

```typescript
// src/main.ts
import {bootstrapDirectives} from '@alwatr/synapse';
import './copy-button.js'; // Import the directive to register it

document.addEventListener('DOMContentLoaded', () => {
  bootstrapDirectives();
});
```

### 3. Use it in HTML

Now, you can use the directive declaratively in your HTML.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Synapse Demo</title>
  <script type="module" src="dist/main.js"></script>
</head>
<body>
  <!-- This button will now have the copy-on-click behavior -->
  <button data-copy-button data-copy-text="Hello, Synapse!">Copy Text</button>
</body>
</html>
```

## API Reference

### `@directive(selector: string)`

A class decorator that registers your class as a directive for elements matching the given CSS `selector`.

- **`selector`**: A valid CSS selector string.

The decorated class **must** have a constructor that accepts a single `HTMLElement` argument.

### `bootstrapDirectives(rootElement: Element | Document = document.body)`

Scans a DOM tree for elements that match registered directive selectors and instantiates their corresponding directive classes.

- **`rootElement`** (optional): The root element to scan. Defaults to `document.body`.

This function is idempotent. It marks processed elements with a `_synapseConnected` attribute to ensure that it never initializes a directive on the same element twice. This is particularly useful for SPAs.

#### Example: Dynamic Content

```typescript
// Imagine new content is added to the page
const newContent = document.createElement('div');
newContent.innerHTML = '<button data-copy-button data-copy-text="New Content">Copy New</button>';
document.body.appendChild(newContent);

// You can safely bootstrap again, and it will only process the new button
bootstrapDirectives(newContent);
```
