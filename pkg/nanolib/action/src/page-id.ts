import {Directive, lazyDirective} from '@alwatr/directive';
import {dispatchAction} from './method.js';

// ─── Directive Class ──────────────────────────────────────────────────────────

/**
 * Directive that announces the current page identity as an action signal.
 *
 * Activated by the `page-id` HTML attribute. On bootstrap the directive reads
 * the attribute value as the page identifier, dispatches a `'page-ready'`
 * action with that value as the payload, and immediately self-destructs — no
 * persistent listener is registered.
 *
 * Typical placement is on the `<body>` or the top-level page container so that
 * any part of the application can react to route changes by subscribing to the
 * `'page-ready'` action via `onAction`.
 *
 * @example
 * ```html
 * <!-- Dispatches dispatchAction('page-ready', 'home') on bootstrap -->
 * <body page-id="home">…</body>
 * ```
 */
export class PageIdDirective extends Directive {
  /**
   * Reads the `page-id` attribute value, dispatches `'page-ready'` with it as
   * the payload, then destroys the directive.
   *
   * Logs an accident and returns early if the attribute value is empty.
   */
  protected override init_(): void {
    const pageId = this.attributeValue.trim();
    this.logger_.logMethodArgs?.('init_', {pageId});

    if (!pageId) {
      this.logger_.accident('init_', 'empty_page_id');
      return;
    }

    dispatchAction('page-ready', pageId);
    this.destroy();
  }
}

// ─── Lazy Registration ────────────────────────────────────────────────────────

/**
 * Registers `PageIdDirective` under the `page-id` attribute name.
 *
 * This is a **lazy** registration: calling this function is the only way to
 * opt-in to `page-id` support. If it is never called, the entire directive
 * module is tree-shaken from the bundle.
 *
 * Call it once, before `bootstrapDirectives()`, at your application entry point.
 *
 * @example
 * ```ts
 * import {registerPageIdDirective, onAction} from '@alwatr/action';
 * import {bootstrapDirectives} from '@alwatr/directive';
 *
 * registerPageIdDirective();
 * bootstrapDirectives();
 *
 * // React to every page change
 * onAction('page-ready', (pageId) => {
 *   console.log('navigated to:', pageId); // e.g. 'home', 'about', 'product-detail'
 * });
 * ```
 *
 * ```html
 * <body page-id="home">…</body>
 * ```
 */
export const registerPageIdDirective = lazyDirective('page-id', PageIdDirective);
