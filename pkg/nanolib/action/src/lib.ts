import {createLogger} from '@alwatr/logger';
import {createChannelSignal} from '@alwatr/signal';

/**
 * Module-scoped logger for `@alwatr/action`.
 * Scoped to `'alwatr-action'` so log lines are easy to filter in the console.
 *
 * @internal
 */
export const logger_ = createLogger('alwatr-action');

/**
 * The action channel — a typed `ChannelSignal` that carries every dispatched action.
 *
 * Previously this was an `EventSignal<ActionSignalPayload<unknown>>` where all
 * subscribers received every action and had to filter by `actionId` themselves
 * (O(N) per dispatch). Replacing it with `ChannelSignal` gives us O(1) routing:
 * only the handlers registered for a specific `actionId` are invoked when that
 * action is dispatched.
 *
 * The channel is typed as `Record<string, unknown>` at the module level so that
 * any string key is accepted. Individual call sites narrow the payload type
 * through the generics on `onAction` and `dispatchAction`.
 *
 * @internal — not part of the public API; use `onAction` / `dispatchAction` instead.
 */
export const internalChannel_ = createChannelSignal<Record<string, unknown>>({name: 'alwatr-action'});
