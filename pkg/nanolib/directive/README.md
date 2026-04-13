# @alwatr/directive

**Connect your TypeScript classes to the DOM, declaratively.**

@alwatr/directive is a lightweight, zero-dependency library that brings the power of directives to vanilla TypeScript. It provides a clean, organized way to attach custom behaviors to DOM elements using CSS selectors, bridging the gap between your logic and your UI without the need for a heavy framework.

## Why Directive?

In modern web development, we often need to add dynamic behavior to elements: a custom tooltip, a special click handler, an element that loads data, etc. While frameworks handle this, vanilla projects can quickly become cluttered with `document.querySelector` calls and manual event listener management.

Directive solves this by letting you encapsulate behavior in dedicated classes and declaratively link them to your HTML.

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
npm i @alwatr/directive

# yarn
yarn add @alwatr/directive

# pnpm
pnpm i @alwatr/directive
```

## How It Works

Directive is built around three core concepts:

1. **`@directive(selector)`**: A class decorator that registers your class. You tell Directive, "any element matching this `selector` should be managed by this class."
2. **`DirectiveBase`**: An abstract class that your directives should extend. It provides the connected `element`, a dedicated `logger`, and an `update_` method to encapsulate your logic.
3. **`bootstrapDirectives(root?)`**: A function that scans the DOM for elements matching registered selectors and creates an instance of the corresponding class for each one.

## Usage

Let's create a simple "click-to-copy" directive.

### 1. Create a Directive

A directive is a class that extends `DirectiveBase` to encapsulate its logic. All initialization logic should be placed in the `update_` method.

```typescript
// src/copy-button.ts
import {directive, DirectiveBase} from '@alwatr/directive';

@directive('[data-copy-button]')
export class CopyButtonDirective extends DirectiveBase {
  private originalText!: string;

  protected override init_(): void {
    super.init_();
    this.originalText = this.element_.textContent ?? 'Copy';
    this.element_.addEventListener('click', () => this.handleClick());
  }

  private async handleClick(): Promise<void> {
    const textToCopy = this.element_.dataset.copyText ?? 'No text to copy!';

    try {
      await navigator.clipboard.writeText(textToCopy);
      this.element_.textContent = 'Copied!';
      this.logger_.logMethod?.('handleClick', 'copied');
    } catch (err) {
      this.logger_.error('handleClick', 'Failed to copy', err);
      this.element_.textContent = 'Failed!';
    }

    setTimeout(() => {
      this.element_.textContent = this.originalText;
    }, 2000);
  }
}
```

### 2. Bootstrap Your Application

In your main entry point, import your directives and call `bootstrapDirectives` once the DOM is ready.

```typescript
// src/main.ts
import {bootstrapDirectives} from '@alwatr/directive';
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
    <title>Directive Demo</title>
    <script
      type="module"
      src="dist/main.js"
    ></script>
  </head>
  <body>
    <!-- This button will now have the copy-on-click behavior -->
    <button
      data-copy-button
      data-copy-text="Hello, Directive!"
    >
      Copy Text
    </button>
  </body>
</html>
```

## API Reference

### `@directive(selector: string)`

A class decorator that registers your class as a directive for elements matching the given CSS `selector`.

- **`selector`**: A valid CSS selector string.

The decorated class **must** extend `DirectiveBase`. Directive will instantiate it for each matching element.

### `DirectiveBase`

An abstract class that your directive classes must extend. It provides the following protected properties and methods:

- **`constructor(element: HTMLElement, selector: string)`**: The base constructor automatically called by Directive. It initializes the `element_`, `selector_`, and `logger_` properties and then calls `update_()`. You should not need to override it.
- **`element_: HTMLElement`** (readonly): The DOM element the directive is attached to.
- **`selector_: string`** (readonly): The CSS selector that matched the element.
- **`logger_`** (readonly): A dedicated logger instance pre-configured for the directive (`directive:selector`).
- **`update_(): void`**: An abstract method that you **must** implement. This is where you should put your directive's initialization logic (e.g., adding event listeners). It's called automatically by the constructor.
- **`dispatch_(eventName: string, detail?: unknown): void`**: A helper method to dispatch a `CustomEvent` from the `element_`.

### `bootstrapDirectives(rootElement: Element | Document = document.body)`

Scans a DOM tree for elements that match registered directive selectors and instantiates their corresponding directive classes.

- **`rootElement`** (optional): The root element to scan. Defaults to `document.body`.

This function is idempotent. It marks processed elements with a `_directiveConnected` attribute to ensure that it never initializes a directive on the same element twice. This is particularly useful for SPAs.

#### Example: Dynamic Content

```typescript
// Imagine new content is added to the page
const newContent = document.createElement('div');
newContent.innerHTML = '<button data-copy-button data-copy-text="New Content">Copy New</button>';
document.body.appendChild(newContent);

// You can safely bootstrap again, and it will only process the new button
bootstrapDirectives(newContent);
```

## Sponsors

The following companies, organizations, and individuals support `nanolib` ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
