---
inclusion: always
---

# Code Patterns & Conventions

This document captures the concrete patterns used throughout the codebase. Follow these exactly when writing new code.

## Naming Conventions

### Member Visibility via Underscore Suffix

| Visibility  | Suffix      | Example                           |
| ----------- | ----------- | --------------------------------- |
| `public`    | none        | `addProduct(id)`, `value`         |
| `protected` | single `_`  | `init_()`, `logger_`, `items_()`  |
| `private`   | double `__` | `open__`, `value__`, `toggle__()` |

This applies to methods, properties, accessors, and fields.

```ts
class MyService {
  protected readonly logger_ = createLogger('my-service'); // protected
  private cache__: Map<number, Item> = new Map();          // private

  getData(): Item[] { ... }           // public
  protected process_(): void { ... }  // protected
  private flush__(): void { ... }     // private
}
```

## Logger Patterns

### In Services (non-directive classes)

Always declare `protected readonly logger_` and use it in every method:

```ts
class ProductService {
  protected readonly logger_ = createLogger('product-service');

  getPrice(id: number): Price | null {
    this.logger_.logMethodArgs?.('getPrice', {id});
    // ...
  }
}
```

### Logger Method Selection

```ts
// Method entry (no args worth logging)
this.logger_.logMethod?.('methodName');

// Method entry with meaningful args
this.logger_.logMethodArgs?.('methodName', {productId, quantity});

// Expected edge case — recoverable, not a bug
this.logger_.incident?.('methodName', 'product_already_in_basket', {productId});

// Unexpected but non-fatal — something is wrong but app continues
this.logger_.accident('methodName', 'element_not_found', {selector});

// Fatal / build-time / truly unrecoverable
this.logger_.error('methodName', 'json_parse_failed', {error});
```

**Rule**: DOM element not found → `accident`. Item already exists → `incident`. Build failure → `error`.

## Null Safety Rules

1. **Never use `!` without a preceding guard**

   ```ts
   // ❌ Bad
   const url = item.product.content.media[0].content.url;

   // ✅ Good
   const url = item.product.content.media[0]?.content.url ?? '';
   ```

2. **Validate DOM elements in `init_()` before use**

   ```ts
   if (!this.someElement_) {
     this.logger_.accident('init_', 'element_not_found');
     this.destroy();
     return;
   }
   ```
