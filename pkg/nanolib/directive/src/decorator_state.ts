/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Directive} from './directive_base_class.js';

/**
 * A property decorator that marks an accessor as reactive local state.
 *
 * When the accessor's value is set, `requestUpdate()` is called automatically on the directive
 * instance, scheduling a batched re-render for the next macrotask.
 *
 * This is the primary way to drive `LitDirective` re-renders from **local** state changes
 * (values owned by the directive itself). For **shared** application state, subscribe to a
 * `StateSignal` inside `init_()` and call `requestUpdate()` from the subscription callback —
 * see the signal example below.
 *
 * The decorator performs a **shallow equality check for primitives**: if the new value is
 * identical to the current value (via `Object.is`) and is a primitive (or `null`), the update
 * is skipped. For object and array values no equality check is performed — every `set` call
 * schedules an update regardless of whether the reference changed.
 *
 * @remarks
 * The `name`, `cache`, and `root` parameters are accepted for API symmetry with `@attribute`
 * but are currently unused. They are reserved for future use (e.g. persisting state to an
 * attribute or reading the initial value from the DOM).
 *
 * @example — Local state (owned by the directive)
 * ```ts
 * import {directive, LitDirective, state} from '@alwatr/directive';
 * import {html} from 'lit-html';
 *
 * @directive('like-button')
 * class LikeButtonDirective extends LitDirective {
 *   \@state()
 *   accessor liked_: string | null = null;
 *
 *   protected override init_(): void {
 *     this.liked_ = 'false'; // triggers first render
 *     this.on_('click', () => {
 *       this.liked_ = this.liked_ === 'true' ? 'false' : 'true'; // triggers re-render
 *     });
 *   }
 *
 *   protected override render_() {
 *     return html`<button class=${this.liked_ === 'true' ? 'liked' : ''}>♥</button>`;
 *   }
 * }
 * ```
 *
 * @example — Shared state via `StateSignal` subscription
 * ```ts
 * import {directive, LitDirective, state} from '@alwatr/directive';
 * import {html} from 'lit-html';
 * import {cartSignal} from '../signals/cart.js';
 *
 * @directive('cart-badge')
 * class CartBadgeDirective extends LitDirective {
 *   \@state()
 *   accessor count_: string | null = null;
 *
 *   protected override init_(): void {
 *     // Subscribe to the shared signal; each emission sets count_ and triggers a re-render.
 *     const sub = cartSignal.subscribe((cart) => {
 *       this.count_ = String(cart.items.length);
 *     });
 *     this.addDestroyHook(() => sub.unsubscribe());
 *   }
 *
 *   protected override render_() {
 *     return html`<span class="badge">${this.count_ ?? '0'}</span>`;
 *   }
 * }
 * ```
 */
export function state<T, D extends Directive = Directive>() {
  return function (
    _target: ClassAccessorDecoratorTarget<D, T>,
    context: ClassAccessorDecoratorContext<D, T>,
  ): ClassAccessorDecoratorResult<D, T> {
    if (context.kind !== 'accessor') {
      throw new Error('@state can only be used with the "accessor" keyword');
    }

    const privateKey = Symbol(`${String(context.name)}__state`);

    return {
      init(initialValue: T) {
        (this as any)[privateKey] = initialValue;
        return initialValue;
      },
      get(this: D) {
        return (this as any)[privateKey] as T;
      },
      set(this: D, newValue) {
        const oldValue = (this as any)[privateKey] as T;
        // For primitives (including null), do not notify if the value is the same.
        if (Object.is(oldValue, newValue) && (typeof newValue !== 'object' || newValue === null)) {
          return;
        }
        (this as any)[privateKey] = newValue;
        this.requestUpdate();
      },
    };
  };
}
