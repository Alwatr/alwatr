import {createLogger} from '@vatr/logger';
import {getSignalObject} from './core';
import type {ListenerOptions, DispatchOptions, ListenerCallback, ListenerObject} from './type';

const log = createLogger('vatr/signal');

/**
 * Add new listener to specific signal.
 *
 * @example
 * const listener = addSignalListener('route-change', money => console.log(money));
 */
export function addSignalListener<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
    signalCallback: ListenerCallback<SignalName>,
    options?: Partial<ListenerOptions>,
): symbol {
  log('addSignalListener(`%s`, %o)', signalName, options);

  const signal = getSignalObject(signalName);
  const listener: ListenerObject<SignalName> = {
    id: Symbol('Vatr Signal Listener'),
    once: options?.once ?? false,
    disabled: options?.disabled ?? false,
    callback: signalCallback,
  };

  if (options?.priority) {
    signal.priorityListenerList.push(listener);
  } else {
    signal.listenerList.push(listener);
  }

  // Run callback for old dispatch signal
  if (!options?.once && 'value' in signal) {
    if (options?.receivePrevious === 'Immediate') {
      log('addSignalListener(`%s`): run callback(immediately)', signalName);
      try {
        signalCallback(signal.value);
      } catch (err) {
        console.error('addSignalListener(`%s`): signalCallback error! %o', signalName, err);
      }
    } else if (options?.receivePrevious === true) {
      requestAnimationFrame(() => {
        log('addSignalListener: run callback(delay): %s', signalName);
        signalCallback(signal.value);
      });
    }
  }

  return listener.id;
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
  log('addSignalListener: `%s`', signalName);
  const signal = getSignalObject(signalName);

  let listenerIndex = signal.listenerList.findIndex((_listener) => _listener.id === listenerId);
  if (listenerIndex !== -1) { // found in listener list.
    signal.priorityListenerList.splice(listenerIndex, 1);
  } else { // not found try to find in priority listener list.
    listenerIndex = signal.priorityListenerList.findIndex((_listener) => _listener.id === listenerId);
    signal.priorityListenerList.splice(listenerIndex, 1);
  }
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
 * setSignalProvider('content-change', async (requestParam) => {
 *   const content = await fetchNewContent(requestParam);
 *   if (content != null) {
 *     return content; // dispatchSignal('content-change', content);
 *   }
 *   else {
 *     dispatchSignal('content-not-found');
 *   }
 * }
 */
export function setSignalProvider<SignalName extends keyof VatrSignals>(
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

// @TODO: getSignalOptions(signalName);
// @TODO: setSignalOptions(signalName, {...});
// @TODO: getListenerOptions(listenerId);
// @TODO: setListenerOptions(listenerId, {...});
