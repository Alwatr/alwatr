/**
 * @package @alwatr/flux
 *
 * `createListDirective` — a factory that turns the repetitive "subscribe to a list signal and
 * render its rows" pattern into a single declarative configuration object.
 *
 * ### Why this exists
 *
 * Rendering a dynamic list the manual way means writing a dedicated `LitDirective` subclass for
 * every list: a `@state` accessor, an `init_()` that subscribes to the source signal, and a
 * `render_()` that calls `repeat(...)`. That boilerplate is identical from list to list — only
 * the signal, the key function, and the row template ever change.
 *
 * `createListDirective` captures exactly those three moving parts in a config object and returns
 * a ready-to-register lazy directive. Under the hood it still uses `lit-html`'s keyed `repeat`,
 * so you get battle-tested, surgical, keyed reconciliation (create / remove / move only the rows
 * that actually changed) with zero per-list code.
 *
 * ### How it fits the Alwatr architecture
 *
 * - **Headless infrastructure** — the factory ships no markup and no styling tokens; the App layer
 *   supplies the row template (a `lit-html` `html` result). It is a portal mechanism, not a view.
 * - **Unidirectional data flow** — data flows down from the source signal into the rows; rows fire
 *   intents up through the usual `on-<event>` ActionService delegation (e.g.
 *   `on-click="ui_item_clicked:${item.id}"`). The directive never owns or mutates state.
 * - **Tree-shaking & lazy signals** — the source is provided as a *thunk* (`() => signal.instance`),
 *   never an eagerly-resolved signal. The thunk is invoked inside `init_()`, so the signal's lazy
 *   `.instance` evaluation guarantee is preserved and importing this module triggers no side effects.
 */

import {LitDirective, lazyDirective, type RegisterDirectiveFunction} from '@alwatr/directive';
import type {IReadonlySignal} from '@alwatr/signal';

import {repeat, type ItemTemplate, type KeyFn} from './lit-html.js';

/**
 * Declarative configuration for a dynamic list directive.
 *
 * @template T The shape of a single list item (the element type of the source array).
 */
export interface ListDirectiveConfig<T> {
  /**
   * The attribute name that activates the directive on an element (e.g. `'shop_list'` for
   * `<ul shop_list></ul>`). Must be unique across all registered directives.
   */
  name: string;

  /**
   * A thunk that returns the source signal holding the list.
   *
   * Provided as a function — not the signal itself — so the signal is resolved lazily inside the
   * directive's `init_()` rather than at module-import time. This preserves the `lazy().instance`
   * evaluation guarantee and keeps the module free of import-time side effects.
   *
   * @example
   * ```ts
   * source: () => state_shop_list.instance,
   * ```
   */
  source: () => IReadonlySignal<readonly T[]>;

  /**
   * Returns a stable, unique identity for an item, used by `repeat` for keyed reconciliation.
   *
   * A correct key is what lets the directive *move* an existing DOM row instead of destroying and
   * recreating it — preserving focus, input state, scroll position, and CSS transitions across
   * reorders. Never key by array index for a mutable list.
   *
   * @example
   * ```ts
   * key: (shop) => shop.meta.id,
   * ```
   */
  key: KeyFn<T>;

  /**
   * Returns the `lit-html` template for a single row.
   *
   * Receives the item and its current index. Because it is a full `lit-html` template function it
   * supports per-row dynamic action payloads, nested templates, and conditional structure.
   *
   * @example
   * ```ts
   * row: (shop) => html`
   *   <li on-click="ui_shop_clicked:${shop.meta.id}">${shop.content.title}</li>
   * `,
   * ```
   */
  row: ItemTemplate<T>;

  /**
   * Optional template rendered when the list is empty. When omitted, an empty list renders nothing.
   *
   * @example
   * ```ts
   * empty: () => html`<p class="muted">No items yet.</p>`,
   * ```
   */
  empty?: () => unknown;
}

/**
 * Creates a registerable, dynamic list directive from a declarative configuration.
 *
 * The returned function follows the same contract as {@link lazyDirective}'s output: calling it
 * registers the directive (and, when `autoBootstrap` is `true`, immediately initializes every
 * matching element on the page). Registration is the only side effect — defining the directive
 * via this factory does nothing until the returned function is invoked during bootstrap.
 *
 * @template T The shape of a single list item.
 * @param config The list directive configuration (name, source thunk, key, row template, empty template).
 * @returns A registration function: `(autoBootstrap, bootstrapRoot?) => void`.
 *
 * @example — Define once, use declaratively
 * ```ts
 * // directive/shop-list.ts — definition (zero side effects on import)
 * import {createListDirective, html} from '@alwatr/flux';
 * import {state_shop_list} from '../domain/state_shop_list.js';
 *
 * export const registerShopListDirective = createListDirective({
 *   name: 'shop_list',
 *   source: () => state_shop_list.instance,
 *   key: (shop) => shop.meta.id,
 *   row: (shop) => html`
 *     <li on-click="ui_shop_clicked:${shop.meta.id}">${shop.content.title}</li>
 *   `,
 *   empty: () => html`<p class="muted">No shops to display.</p>`,
 * });
 * ```
 *
 * ```ts
 * // bootstrap.ts — registration
 * registerShopListDirective(true);
 * ```
 *
 * ```html
 * <!-- view — the whole list, surgically reconciled, with no per-list directive code -->
 * <ul shop_list></ul>
 * ```
 */
export function createListDirective<T>(config: ListDirectiveConfig<T>): RegisterDirectiveFunction {
  const {name, source, key, row, empty} = config;

  /**
   * Anonymous `LitDirective` specialized for this one list. Captures `source`, `key`, `row`, and
   * `empty` from the enclosing factory scope, so no per-list subclass needs to be authored.
   */
  class ListDirective extends LitDirective {
    /** The latest snapshot of the list, mirrored from the source signal. */
    protected items_: readonly T[] = [];

    protected override init_(): void {
      // Resolve the signal lazily here (not at factory-call or import time) to honor the
      // `lazy().instance` contract. `subscribe_` auto-unsubscribes when the directive is destroyed.
      // The signal invokes the callback immediately with its current value, so the first render is
      // scheduled right after `init_()` — no separate priming step needed.
      this.subscribe_(source(), (items) => {
        this.items_ = items ?? [];
        this.requestUpdate(); // batched: collapses to a single render_() per macrotask
      });
    }

    protected override render_(): unknown {
      if (this.items_.length === 0 && empty !== undefined) {
        return empty();
      }
      // Keyed reconciliation: lit-html moves/creates/removes only the rows whose key changed.
      return repeat(this.items_, key, row);
    }
  }

  return lazyDirective(name, ListDirective);
}
