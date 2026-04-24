import {createLogger} from '@alwatr/logger';
import {createChannelSignal} from '@alwatr/signal';
import type {ActionRecord} from './action-record.js';

/**
 * Module-scoped logger for `@alwatr/action`.
 * Scoped to `'alwatr-action'` so log lines are easy to filter in the console.
 *
 * @internal
 */
export const logger_ = createLogger('alwatr-action');

/**
 * The action channel — a `ChannelSignal` strictly typed by `ActionRecord`.
 *
 * Only action names declared in `ActionRecord` (via declaration merging) are
 * accepted at compile time. Passing an unknown action name to `onAction` or
 * `dispatchAction` is a **compile error** — there is no string fallback.
 *
 * Uses `ChannelSignal` for O(1) routing: dispatching action `'A'` performs a
 * single `Map.get('A')` lookup and invokes only the handlers registered for
 * that specific action — never handlers for `'B'`, `'C'`, etc.
 *
 * `ActionRecord & Record<string, unknown>` satisfies the `ChannelSignal`
 * constraint (which requires an index signature) while keeping the public API
 * strictly limited to declared keys — the `Record<string, unknown>` part is
 * only visible to the internal channel, not to `onAction`/`dispatchAction`.
 *
 * @internal — not part of the public API; use `onAction` / `dispatchAction` instead.
 */
export const internalChannel_ = createChannelSignal<ActionRecord & Record<string, unknown>>({name: 'alwatr-action'});
