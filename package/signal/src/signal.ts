import {createLogger} from '@vatr/logger';
import type {ListenerOptions, DispatchOptions, ListenerCallback, RequestSignalOptions} from './type';

const log = createLogger('vatr/signal');

/**
 * Add new listener to specific signal.
 *
 * @example
 * const listener = addSignalListener('route-change', money => console.log(money));
 */
export function addSignalListener<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
    signalCallback: ListenerCallback<VatrSignals[SignalName]>,
    options?: Partial<ListenerOptions>,
): symbol {
  log('addSignalListener: %o', {signalName, options});

  // return _addSignalListener(signalName, signalCallback as ListenerCallback, {
  //   once: false,
  //   capture: false,
  //   disabled: false,
  //   ...options,
  // });
}

/**
 * Remove listener from specific signal.
 *
 * @example
 * const listener = addSignalListener('content-change', ...);
 * removeSignalListener('content-change', listener);
 */
export function removeSignalListener<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
    listenerId: symbol,
): void {
  log('removeSignalListener: %s', signalName);
}

/**
 * Dispatch signal to all listeners.
 *
 * @example
 * dispatchSignal('content-change', content);
 */
export function dispatchSignal<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
    value: VatrSignals[SignalName],
    options?: Partial<DispatchOptions>,
): void {
  log('dispatchSignal: %s => %o', signalName, value);
}

/**
 * Resolved with signal value when signal is ready base on requested options.
 * By default, dispatch request signal and wait for answer (wait new signal dispatched).
 *
 * @example
 * // dispatch request signal and wait for answer (wait for NEW signal).
 * const newContent = await requestSignal('content-change', {foo: 'bar'});
 */
export async function requestSignal<SignalName extends keyof VatrRequestSignals>(
    signalName: SignalName,
    requestParam: VatrRequestSignals[SignalName],
): Promise<VatrSignals[SignalName]> {
  log('requestSignal: %s', signalName);

  return Promise.resolve(undefined);
}

/**
 * Define signal provider, which will be called when signal requested.
 *
 * @example
 * defineSignalProvider('content-change', async (requestParam) => {
 *   const content = await fetchNewContent(requestParam);
 *   if (content != null) {
 *     return content; // dispatchSignal('content-change', content);
 *   }
 *   else {
 *     dispatchSignal('content-not-found');
 *   }
 * }
 */
export function defineSignalProvider<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
    signalCallback: ListenerCallback<VatrSignals[SignalName]>,
): symbol {
  log('addSignalListener: %o', {signalName, options});

// return _addSignalListener(signalName, signalCallback as ListenerCallback, {
//   once: false,
//   capture: false,
//   disabled: false,
//   ...options,
// });
}


/**
 * Resolved with signal value when signal is ready base on requested options.
 * By default, wait new signal received.
 *
 * @param receivePrevious If true, get signal value from last dispatched signal (if any) or wait new signal received.
 *
 * @example
 * // Wait for NEW signal received.
 * const newContent = await waitForSignal('content-change');
 * // get signal value from last dispatched signal (if any) or wait new signal received.
 * const route = await waitForSignal('route-change', {receivePrevious: true});
 */
export async function waitForSignal<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
    receivePrevious?: boolean,
): Promise<VatrSignals[SignalName]> {
  log('requestSignal: %s', signalName);

  return Promise.resolve(undefined);
}

/**
 * Check signal dispatched before or not!
 *
 * @example
 * if(hasSignalDispatchedBefore('easter-egg')) { ... }
 */
export function hasSignalDispatchedBefore<SignalName extends keyof VatrSignals>(signalName: SignalName): boolean {
  const dispatched = true;
  log('hasSignalDispatchedBefore: %s => %s', signalName, dispatched);
  return dispatched;
}


