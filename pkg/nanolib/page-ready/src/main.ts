/**
 * @alwatr/page-ready — Lightweight page identity signal for SPA routing.
 *
 * Reads the `page-id` attribute from `document.body` and dispatches a named
 * signal so any part of the application can react to the current page without
 * coupling to a full router.
 *
 * ## Usage
 *
 * ```html
 * <body page-id="home">…</body>
 * ```
 *
 * ```ts
 * import {onPageReady, dispatchPageReady} from '@alwatr/page-ready';
 *
 * // Subscribe before dispatching so the handler is registered in time.
 * onPageReady('home', () => initHomePage());
 *
 * // Call once at bootstrap — reads document.body[page-id] and notifies subscribers.
 * dispatchPageReady();
 * ```
 *
 * ## Public API
 *
 * - `onPageReady(pageId, handler)` — subscribe to a specific page becoming ready
 * - `dispatchPageReady(element?)` — read `page-id` attribute and notify subscribers
 */
export * from './page-ready.js';
