# @alwatr/type-helper

A collection of useful TypeScript type helpers — exported as named types, no global augmentation.

## Why named exports?

Previous versions used `declare global { ... }` which required every consumer to add
`"@alwatr/type-helper"` to their tsconfig `types` array. This caused types to be invisible
when navigating to source via go-to-definition in an IDE.

All types are now plain named exports. Import them explicitly, or get them automatically
via the bundle packages (`@alwatr/core`, `@alwatr/flux`).

## Usage

Import directly:

```ts
import type {JsonObject, Nullable, DictionaryOpt} from '@alwatr/type-helper';

function save(data: JsonObject): void { ... }
function find(id: string): Nullable<User> { ... }
```

Or via the bundle packages (no extra import needed):

```ts
import type {JsonObject} from '@alwatr/core'; // non-UI bundle
import type {JsonObject} from '@alwatr/flux'; // UI bundle
```

## Available Types

### Primitives

| Type        | Definition                                                             |
| ----------- | ---------------------------------------------------------------------- |
| `Primitive` | `string \| number \| bigint \| boolean \| symbol \| null \| undefined` |
| `Falsy`     | `false \| '' \| 0 \| 0n \| null \| undefined`                          |
| `Nullish`   | `null \| undefined`                                                    |

### Functions & Classes

| Type                | Description                                      |
| ------------------- | ------------------------------------------------ |
| `Func<Args, R>`     | Generic function type                            |
| `AnyFunc`           | Alias for any callable                           |
| `VoidFunc`          | Function returning `void`                        |
| `NoopFunc`          | `() => void`                                     |
| `OmitFirstParam<F>` | Removes the first parameter from a function type |
| `Class<T, TArgs>`   | Class constructor type                           |

### Wrappers & Modifiers

| Type                       | Description                                    |
| -------------------------- | ---------------------------------------------- |
| `Nullable<T>`              | `T \| null`                                    |
| `Maybe<T>`                 | `T \| undefined`                               |
| `Awaitable<T>`             | `T \| Promise<T>`                              |
| `SingleOrArray<T>`         | `T \| T[]`                                     |
| `SingleOrReadonlyArray<T>` | `T \| readonly T[]`                            |
| `NonUndefined<T>`          | Excludes `undefined` from `T`                  |
| `Mutable<T>`               | Removes `readonly` from all properties         |
| `StrictlyRequired<T>`      | Makes all properties required and non-nullable |

### Dictionaries

| Type               | Description                          |
| ------------------ | ------------------------------------ |
| `DictionaryOpt<T>` | `{ [key: string]?: T }` — sparse map |
| `DictionaryReq<T>` | `{ [key: string]: T }` — dense map   |

### Object Utilities

| Type                  | Description                                         |
| --------------------- | --------------------------------------------------- |
| `RequiredKeys<T>`     | Union of required keys of `T`                       |
| `OptionalKeys<T>`     | Union of optional keys of `T`                       |
| `Prop<T, K>`          | Type of property `K` in `T`                         |
| `ObjectValues<T>`     | Union of all value types in `T`                     |
| `ArrayItem<T>`        | Item type of an array type                          |
| `Overwrite<M, N>`     | Overwrites properties of `M` with `N`               |
| `Simplify<T>`         | Flattens intersection types for better IDE tooltips |
| `HasAddEventListener` | Interface for objects with `addEventListener`       |

### Deep Recursive

| Type              | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `DeepReadonly<T>` | Recursively makes all properties `readonly`                |
| `DeepRequired<T>` | Recursively makes all properties required and non-nullable |
| `DeepPartial<T>`  | Recursively makes all properties optional                  |

### JSON

| Type            | Description                                            |
| --------------- | ------------------------------------------------------ |
| `JsonPrimitive` | `string \| number \| boolean \| null`                  |
| `JsonValue`     | Any JSON-compatible value                              |
| `JsonArray`     | JSON-compatible array                                  |
| `JsonObject`    | JSON-compatible object (`DictionaryOpt<JsonValue>`)    |
| `Jsonify<T>`    | Converts a TypeScript type to its JSON-compatible form |

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0
