import {ChannelSignal} from '../core/channel-signal.js';
import type {ChannelSignalConfig} from '../type.js';

/**
 * Creates a stateless multi-channel signal that acts as a typed message bus.
 *
 * `ChannelSignal` is ideal when you need a single signal to carry multiple
 * distinct message types — each identified by a `name` — rather than creating
 * a separate `EventSignal` for every event.
 *
 * The generic parameter `TMap` is a record that maps every valid message name
 * to its payload type, giving you full type safety at both dispatch and subscribe sites.
 *
 * @template TMap A record mapping message names to their payload types.
 *
 * @param config The configuration for the channel signal.
 * @returns A new instance of `ChannelSignal`.
 *
 * @example
 * ```ts
 * interface AppMessages {
 *   'open-drawer': {panel: string};
 *   'close-drawer': void;
 *   'show-toast': {message: string; type: 'info' | 'error'};
 * }
 *
 * const appChannel = createChannelSignal<AppMessages>({name: 'app-channel'});
 *
 * // Subscribe to a specific message
 * appChannel.on('show-toast', (payload) => {
 *   toast.show(payload!.message, payload!.type);
 * });
 *
 * // Dispatch a message
 * appChannel.dispatch('show-toast', {message: 'Saved!', type: 'info'});
 * appChannel.dispatch('close-drawer');
 * ```
 */
export function createChannelSignal<TMap extends object>(config: ChannelSignalConfig): ChannelSignal<TMap> {
  return new ChannelSignal<TMap>(config);
}
