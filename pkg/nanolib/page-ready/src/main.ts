/**
 * @alwatr/page-ready — Lightweight page identity signal for MPA routing.
 *
 * Reads the `page-id` attribute from the first matching element in the document
 * and dispatches a named signal so any part of the application can react to the
 * current page without coupling to a full router.
 *
 * ## Usage
 *
 * ```html
 * <!-- page-id can be placed on any element, not just <body> -->
 * <body page-id="home">…</body>
 * ```
 *
 * ```ts
 * import {onPageReady, subscribePageReady, dispatchPageReady} from '@alwatr/page-ready';
 *
 * // Subscribe to a specific page before dispatching.
 * onPageReady('home', () => initHomePage());
 *
 * // Or subscribe to ALL pages — handler receives the page ID.
 * subscribePageReady((pageId) => analytics.trackPageView(pageId));
 *
 * // Call once at bootstrap — finds [page-id] anywhere in the document and notifies subscribers.
 * dispatchPageReady();
 * ```
 *
 * ## Public API
 *
 * - `onPageReady(pageId, handler)` — subscribe to a **specific** page becoming ready
 * - `subscribePageReady(handler)` — subscribe to **all** page-ready events; handler receives the page ID
 * - `dispatchPageReady()` — find `[page-id]` via `querySelector` and notify subscribers
 */
export * from './page-ready.js';
