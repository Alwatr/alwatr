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

import type {Awaitable} from '@alwatr/type-helper';
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
export function onPageReady<T extends string>(pageId: T, handler: () => Awaitable<void>): SubscribeResult {
  DEV_MODE && logger.logMethodArgs?.('onPageReady', {pageId});
  return pageReadyChannel_.on(pageId, handler);
}

/**
 * Subscribes to **all** page-ready events, regardless of which page ID is dispatched.
 *
 * Unlike `onPageReady` — which targets a single page ID — this handler is invoked
 * every time `dispatchPageReady()` fires, and receives the dispatched page ID as
 * its first argument.
 *
 * Useful for cross-cutting concerns that must react to every page change:
 * analytics tracking, active nav-link updates, layout transitions, etc.
 *
 * Pass a string literal union as the generic parameter to get type-safe page IDs:
 *
 * ```ts
 * type PageId = 'home' | 'about' | 'product-detail';
 *
 * subscribePageReady<PageId>((pageId) => {
 *   analytics.trackPageView(pageId);
 *   updateActiveNavLink(pageId);
 * });
 * ```
 *
 * @param handler - Called with the dispatched page ID on every `dispatchPageReady()` call.
 * @returns A `SubscribeResult` with an `unsubscribe()` method for cleanup.
 *
 * @example
 * ```ts
 * import {subscribePageReady} from '@alwatr/page-ready';
 *
 * const sub = subscribePageReady((pageId) => console.log('Page ready:', pageId));
 * sub.unsubscribe(); // stop listening when no longer needed
 * ```
 */
export function subscribePageReady<T extends string>(handler: (pageId: T) => Awaitable<void>): SubscribeResult {
  DEV_MODE && logger.logMethod?.('subscribePageReady');
  return pageReadyChannel_.subscribe((message) => {
    handler(message.name as T);
  });
}

/**
 * Reads the `page-id` attribute from the first matching element in the document
 * and notifies all `onPageReady` subscribers registered for that page identifier.
 *
 * Finds the element via `document.querySelector('[page-id]')` — no argument
 * needed. Call once at application bootstrap after the DOM is ready.
 *
 * If no element with `page-id` is found in the document, an accident is logged
 * and nothing is dispatched. An empty attribute value (`page-id=""`) is treated
 * as a valid identifier and will be dispatched normally.
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
  DEV_MODE && logger.logMethod?.('dispatchPageReady');

  if (typeof document === 'undefined') {
    DEV_MODE && logger.incident?.('dispatchPageReady', 'document_not_found');
    return;
  }

  const pageId = document.querySelector('[page-id]')?.getAttribute('page-id')?.trim();

  if (pageId == null) {
    DEV_MODE && logger.accident('dispatchPageReady', 'page_id_not_found');
    return;
  }

  // An empty string is a valid page identifier — dispatch as-is.
  pageReadyChannel_.dispatch(pageId);
}
