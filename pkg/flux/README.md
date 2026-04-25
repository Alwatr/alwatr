# Alwatr Flux

UI and reactive library bundle for ECMAScript (JavaScript/TypeScript) projects.

Aggregates all UI-layer nanolibs into a single convenient import:

- [`@alwatr/signal`](../nanolib/signal) — reactive primitives: `StateSignal`, `EventSignal`, `ComputedSignal`, `EffectSignal`
- [`@alwatr/action`](../nanolib/action) — Unidirectional Data Flow action layer with global event delegation
- [`@alwatr/directive`](../nanolib/directive) — attribute-based DOM directives with lifecycle hooks
- [`@alwatr/render-state`](../nanolib/render-state) — render state management utility
- [`@alwatr/local-storage`](../nanolib/local-storage) — versioned JSON in `localStorage`
- [`@alwatr/session-storage`](../nanolib/session-storage) — versioned JSON in `sessionStorage`

## Usage

```ts
import {StateSignal, onAction, setupActionDelegation} from '@alwatr/flux';
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
