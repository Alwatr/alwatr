import {createLogger} from '@alwatr/logger';
import {createChannelSignal} from '@alwatr/signal';

import type {Action} from './action.js';

/**
 * Module-scoped logger for `@alwatr/action`.
 * Scoped to `'alwatr-action'` so log lines are easy to filter in the console.
 *
 * @internal
 */
export const logger_ = createLogger('alwatr-action');

/**
 * The internal action channel — a `ChannelSignal` keyed by action `type`.
 *
 * Each message on this channel is a full `Action` object (AFSA), not just a
 * raw payload. Subscribers registered via `onAction('foo', handler)` receive
 * the entire `Action<'foo'>` so they have access to `context`, `meta`, and
 * `payload` in one place.
 *
 * Uses `ChannelSignal` for O(1) routing: dispatching action `'A'` performs a
 * single `Map.get('A')` lookup and invokes only the handlers registered for
 * that specific type — never handlers for `'B'`, `'C'`, etc.
 *
 * @internal — not part of the public API; use `onAction` / `dispatchAction` instead.
 */
export const internalChannel_ = createChannelSignal<Record<string, Action>>({name: 'alwatr-action'});
