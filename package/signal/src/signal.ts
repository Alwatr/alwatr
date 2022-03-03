import {log, _getSignalObject, _callListeners, _removeSignalListener} from './core';
import type {ListenerOptions, DispatchOptions, ListenerCallback, ListenerObject} from './type';


/**
 * Add new listener to specific signal.
 *
 * @example
 * const listener = addSignalListener('content-change', (content) => console.log(content));
 */
export function addSignalListener<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
    signalCallback: ListenerCallback<SignalName>,
    options?: Partial<ListenerOptions>,
): symbol {
  log('addSignalListener(%s, %o)', signalName, options);

  const signal = _getSignalObject(signalName);
  const listener: ListenerObject<SignalName> = {
    id: Symbol('Vatr Signal Listener'),
    once: options?.once ?? false,
    disabled: options?.disabled ?? false,
    callback: signalCallback,
  };

  let callbackCalled = false;

  // Run callback for old dispatch signal
  if ('value' in signal) {
    if (options?.receivePrevious === 'Immediate') {
      log('addSignalListener(%s): run callback(immediately)', signalName);
      try {
        signalCallback(signal.value);
      } catch (err) {
        console.error('addSignalListener(%s): signalCallback error! %o', signalName, err);
      }
      callbackCalled = true;
    } else if (options?.receivePrevious === true) {
      requestAnimationFrame(() => {
        log('addSignalListener(%s): run callback(delay)', signalName);
        signalCallback(signal.value);
      });
      callbackCalled = true; // must be outside of requestAnimationFrame.
    }
  }

  // if once then must remove listener after fist callback called! then why push it to listenerList?!
  if (!(options?.once && callbackCalled)) {
    if (options?.priority) {
      signal.listenerList.unshift(listener);
    } else {
      signal.listenerList.push(listener);
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
  log('addSignalListener(%s)', signalName);
  const signal = _getSignalObject(signalName);
  _removeSignalListener(signal, listenerId);
}

/**
 * Dispatch signal to all listeners.
 *
 * @example
 * dispatchSignal('content-change', content);
 */
export function dispatchSignal<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
    value?: VatrSignals[SignalName],
    options?: Partial<DispatchOptions>,
): void {
  log('dispatchSignal(%s, %o, %o)', signalName, value, options);

  const signal = _getSignalObject(signalName);
  // set value before check signal.debounced for act like throttle (call listeners with last dispatch value).
  signal.value = value;

  if (signal.disabled) return; // signal is disabled.
  if (options?.debounce && signal.debounced) return; // last dispatch in progress.

  if (!options?.debounce) {
    // call listeners immediately.
    _callListeners(signal);
    return;
  }
  // else: call listeners in next frame.
  signal.debounced = true;
  requestAnimationFrame(() => {
    _callListeners(signal);
    signal.debounced = false;
  });
}

/**
 * Resolved with signal value when signal is ready base on requested options.
 * By default, dispatch request signal and wait for answer (wait new signal dispatched).
 *
 * @example
 * // dispatch request signal and wait for answer (wait for NEW signal).
 * const newContent = await requestSignal('content-change', {foo: 'bar'});
 */
export function requestSignal<SignalName extends keyof VatrRequestSignals>(
    signalName: SignalName,
    requestParam: VatrRequestSignals[SignalName],
): Promise<VatrSignals[SignalName]> {
  log('requestSignal: %s', signalName);
  dispatchSignal(
      `request-${signalName}` as unknown as SignalName,
      requestParam as unknown as VatrSignals[SignalName], // mastmalize to avoid type error
  );
  return waitForSignal(signalName);
}

/**
 * Define signal provider, which will be called when signal requested (addRequestSignalListener).
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
export function addSignalProvider<SignalName extends keyof VatrRequestSignals>(
    signalName: SignalName,
    signalCallback: (detail: VatrRequestSignals[SignalName]) => void | Promise<void>,
): symbol {
  log('addSignalProvider(%s)', signalName);
  return addSignalListener(
    `request-${signalName}` as unknown as SignalName,
    signalCallback as unknown as ListenerCallback<SignalName>,
    {receivePrevious: true},
  );
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
  log('waitForSignal(%s)', signalName);

  return new Promise((resolve) => {
    addSignalListener(signalName, resolve, {
      once: true,
      priority: true,
      receivePrevious: receivePrevious ?? false,
    });
  });
}

/**
 * Check signal dispatched before or not!
 *
 * @example
 * if(hasSignalDispatchedBefore('content-change')) { ... }
 */
export function hasSignalDispatchedBefore<SignalName extends keyof VatrSignals>(signalName: SignalName): boolean {
  const dispatched = 'value' in _getSignalObject(signalName);
  log('hasSignalDispatchedBefore(%s) => %s', signalName, dispatched);
  return dispatched;
}

/**
 * Expire the signal by clear last dispatched value.
 * hasSignalDispatchedBefore and receivePrevious etc not work until new signal.
 *
 * @example
 * hasSignalDispatchedBefore('content-change'); // true
 * expireSignal('content-change');
 * hasSignalDispatchedBefore('content-change'); // false
 */
export function expireSignal<SignalName extends keyof VatrSignals>(signalName: SignalName): void {
  log('expireSignal(%s)', signalName);
  delete _getSignalObject(signalName).value;
}

// @TODO: getSignalOptions(signalName);
// @TODO: getListenerOptions(listenerId);
// @TODO: setSignalOptions(signalName, {...});
// @TODO: setListenerOptions(listenerId, {...});
