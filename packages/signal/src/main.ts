/**
 * @package @alwatr/signal
 *
 * This is the main entry point for the Alwatr Signal package.
 * It exports the two main signal classes, `StateSignal` and `EventSignal`,
 * along with the necessary types for interacting with them.
 *
 * @example
 * import { StateSignal, EventSignal } from '@alwatr/signal';
 *
 * // A signal for managing application theme state
 * const themeSignal = new StateSignal({ signalId: 'theme', initialValue: 'light' });
 *
 * // A signal for handling user click events
 * const userClickSignal = new EventSignal({ signalId: 'user-click' });
 */

export {StateSignal} from './state-signal.js';
export {EventSignal} from './event-signal.js';

// Exporting core types for consumers of the library.
export type {ListenerCallback, SubscribeOptions, SubscribeResult, SignalConfig, StateSignalConfig} from './type.js';
