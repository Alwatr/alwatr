/**
 * @package @alwatr/directive
 *
 * This file defines `LitDirective` — a `Directive` subclass that integrates `lit-html` for
 * declarative template rendering. Extend it when you want to manage a directive's DOM output
 * through a `render_()` method that returns a `lit-html` `TemplateResult`.
 */

import {render} from 'lit-html';
import {Directive} from './directive_base_class.js';

/**
 * A `Directive` subclass that renders its DOM output using `lit-html`.
 *
 * Extend `LitDirective` instead of `Directive` when you want to describe the directive's view
 * as a declarative `lit-html` template. Every time `requestUpdate()` is called — either
 * manually or automatically by a `@state`-decorated accessor — `update_()` runs, which calls
 * `render_()` and passes the result to `lit-html`'s `render()`.
 *
 * The update cycle is always **batched**: multiple `requestUpdate()` calls within the same
 * macrotask collapse into a single `render_()` invocation.
 *
 * By default the template is rendered into `this.element_`. Override `rootElement_` to redirect
 * rendering into a different container (e.g. a Shadow DOM root or a child element).
 *
 * ---
 *
 * ### Update cycle
 *
 * ```
 * state change (set @state accessor  OR  signal subscription callback)
 *   │
 *   └─ requestUpdate()          ← schedules one macrotask (batched)
 *        │
 *        ├─ shouldUpdate_()?    ← return false to abort (skip render entirely)
 *        ├─ update_()           ← calls render_() via lit-html render()
 *        └─ updated_()          ← post-render hook (focus, measure, etc.)
 * ```
 *
 * Override `shouldUpdate_()` to conditionally skip a render — for example, while data is still
 * loading or while the element is inside a hidden panel. Return `false` to abort; return `true`
 * or `void` to proceed normally.
 *
 * ---
 *
 * @example — Local state with `@state`
 * ```ts
 * import {directive, LitDirective, state} from '@alwatr/directive';
 * import {html} from 'lit-html';
 *
 * @directive('like-button')
 * export class LikeButtonDirective extends LitDirective {
 *   \@state()
 *   accessor liked_: string | null = null;
 *
 *   protected override init_(): void {
 *     this.liked_ = 'false'; // first assignment triggers the initial render
 *     this.on_('click', () => {
 *       this.liked_ = this.liked_ === 'true' ? 'false' : 'true';
 *     });
 *   }
 *
 *   protected override render_() {
 *     return html`<button class=${this.liked_ === 'true' ? 'liked' : ''}>♥</button>`;
 *   }
 * }
 * ```
 *
 * @example — Shared state via `StateSignal`
 * ```ts
 * import {directive, LitDirective, state} from '@alwatr/directive';
 * import {html} from 'lit-html';
 * import {cartSignal} from '../signals/cart.js';
 *
 * @directive('cart-badge')
 * export class CartBadgeDirective extends LitDirective {
 *   \@state()
 *   accessor count_: string | null = null;
 *
 *   protected override init_(): void {
 *     // cartSignal.subscribe() calls the callback immediately with the current value,
 *     // so the first render happens right after init_() without any extra trigger.
 *     const sub = cartSignal.subscribe((cart) => {
 *       this.count_ = String(cart.items.length); // @state setter calls requestUpdate()
 *     });
 *     this.addDestroyHook(() => sub.unsubscribe());
 *   }
 *
 *   protected override render_() {
 *     return html`<span class="badge">${this.count_ ?? '0'}</span>`;
 *   }
 * }
 * ```
 *
 * ```html
 * <div cart-badge></div>
 * ```
 */
export abstract class LitDirective extends Directive {
  /**
   * The element into which `lit-html` renders the template.
   *
   * Defaults to `this.element_` (the directive's bound element). Override this field in your
   * subclass to redirect rendering — for example, into a Shadow DOM root or a dedicated child
   * container — without changing any other lifecycle logic.
   *
   * @example
   * ```ts
   * @directive('shadow-card')
   * class ShadowCardDirective extends LitDirective {
   *   protected override rootElement_ = this.element_.attachShadow({mode: 'open'});
   *
   *   protected override render_() {
   *     return html`<slot></slot>`;
   *   }
   * }
   * ```
   */
  protected rootElement_?: HTMLElement | ShadowRoot | DocumentFragment;

  /**
   * Renders the `lit-html` template returned by `render_()` into `rootElement_` (or `element_`).
   *
   * This method is called automatically by `requestUpdate()` during each scheduled update cycle.
   * Do not call it directly — use `requestUpdate()` instead to ensure batching.
   */
  protected override update_(): void {
    const rootElement = this.rootElement_ ?? this.element_;
    render(this.render_(), rootElement, {host: this});
  }

  /**
   * Returns the `lit-html` template to render on each update cycle.
   *
   * Implement this method in your subclass to describe the directive's DOM output declaratively.
   * It is called by `update_()` on every scheduled render — keep it pure and side-effect-free.
   *
   * @returns A `lit-html` `TemplateResult` (or any value accepted by `lit-html`'s `render()`).
   *
   * @example
   * ```ts
   * protected override render_() {
   *   return html`<span class="badge">${this.count_}</span>`;
   * }
   * ```
   */
  protected abstract render_(): unknown;
}
