/**
 * @file page-ready.ts
 *
 * Lightweight page identity signal for MPA routing.
 *
 * ## Design
 *
 * Uses a dedicated `ChannelSignal` keyed by page identifier. This gives O(1)
 * dispatch — only the handler(s) registered for the current page ID are invoked,
 * regardless of how many pages are declared in the application.
 *
 * The signal is intentionally separate from `@alwatr/action`'s action bus:
 * page identity is a routing/lifecycle concern, not a user-interaction action.
 *
 * ## Attribute convention
 *
 * Place `page-id` anywhere in the document — `dispatchPageReady` finds it
 * automatically via `querySelector('[page-id]')`:
 *
 * ```html
 * <body page-id="home">…</body>
 * ```
 *
 * In SSG/SSR setups each generated page has a different `page-id` value baked
 * into the HTML, so `dispatchPageReady()` always reads the correct page without
 * any runtime routing logic.
 */

import {createLogger} from '@alwatr/logger';
import {createChannelSignal} from '@alwatr/signal';
import type {SubscribeResult} from '@alwatr/signal';

const logger = createLogger('page-ready');

/**
 * Internal channel keyed by page identifier.
 *
 * O(1) dispatch: routes directly to the handler set for the dispatched key,
 * never invoking handlers for other page IDs.
 *
 * @internal
 */
const pageReadyChannel_ = createChannelSignal<Record<string, void>>({name: 'page-ready'});

/**
 * Subscribes to a specific page becoming ready.
 *
 * The handler is invoked when `dispatchPageReady()` is called and the
 * `page-id` attribute in the document matches `pageId`.
 *
 * Pass a string literal union as the generic parameter to constrain which
 * page IDs are valid across your application:
 *
 * ```ts
 * type PageId = 'home' | 'about' | 'product-detail';
 *
 * onPageReady<PageId>('home', () => initHomePage());
 * ```
 *
 * @param pageId  - The page identifier to listen for (must match the `page-id` attribute value).
 * @param handler - Called with no arguments when the page is ready.
 * @returns A `SubscribeResult` with an `unsubscribe()` method for cleanup.
 *
 * @example
 * ```ts
 * import {onPageReady} from '@alwatr/page-ready';
 *
 * const sub = onPageReady('home', () => initHomePage());
 * sub.unsubscribe(); // stop listening when no longer needed
 * ```
 */
export function onPageReady<T extends string>(pageId: T, handler: () => void): SubscribeResult {
  logger.logMethodArgs?.('onPageReady', {pageId});
  return pageReadyChannel_.on(pageId, handler);
}

/**
 * Reads the `page-id` attribute from the first matching element in the document
 * and notifies all `onPageReady` subscribers registered for that page identifier.
 *
 * Finds the element via `document.querySelector('[page-id]')` — no argument
 * needed. Call once at application bootstrap after the DOM is ready.
 *
 * If no element with `page-id` is found, or the attribute value is empty,
 * an accident is logged and nothing is dispatched.
 *
 * @example
 * ```html
 * <body page-id="home">…</body>
 * ```
 * ```ts
 * import {onPageReady, dispatchPageReady} from '@alwatr/page-ready';
 *
 * onPageReady('home', () => initHomePage());
 * dispatchPageReady();
 * ```
 */
export function dispatchPageReady(): void {
  logger.logMethod?.('dispatchPageReady');

  const pageId = document.querySelector('[page-id]')?.getAttribute('page-id')?.trim();

  if (!pageId) {
    logger.accident('dispatchPageReady', 'page_id_not_found');
    return;
  }

  pageReadyChannel_.dispatch(pageId);
}
