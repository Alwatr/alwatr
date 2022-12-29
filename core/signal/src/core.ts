import {createLogger} from '@alwatr/logger';
import {alwatrRegisteredList} from '@alwatr/type';

import type {
  DispatchOptions,
  ListenerCallback,
  ListenerObject,
  ListenerOptions,
  SignalObject,
  SignalProvider,
  SignalProviderOptions,
  SignalStack,
} from './type.js';

export const logger = createLogger('alwatr/signal');

alwatrRegisteredList.push({
  name: '@alwatr/signal',
  version: '{{ALWATR_VERSION}}',
});

/**
 * Listener `id`
 */
let _lastListenerId = 0;

/**
 * Signal stack database.
 */
const _signalStack: SignalStack = {};

/**
 * Get signal object by name, If not available, it will create a new signal with default options.
 *
 * Example:
 *
 * ```ts
 * const signal = _getSignalObject('content-change');
 * signal.disabled = true;
 * ```
 */
export function _getSignalObject<SignalName extends keyof AlwatrSignals>(
    signalName: SignalName,
): SignalObject<SignalName> {
  if (!_signalStack[signalName]) {
    _signalStack[signalName] = {
      name: signalName,
      disabled: false,
      debounced: false,
      listenerList: [],
    };
  }
  return _signalStack[signalName] as unknown as SignalObject<SignalName>;
}

function __callListeners<SignalName extends keyof AlwatrSignals>(signal: SignalObject<SignalName>): void {
  logger.logMethodArgs('_callListeners', {signalName: signal.name, signalValue: signal.value});
  if (signal.value === undefined) {
    // null is a valid value for signal.
    logger.accident('_callListeners', 'no_signal_value', 'signal must have a value', {
      signalName: signal.name,
    });
    return;
  }

  for (const listener of signal.listenerList) {
    if (listener.disabled) continue;
    try {
      const ret = listener.callback(signal.value);
      if (ret instanceof Promise) {
        ret.catch((err) =>
          logger.error('_callListeners', 'call_listener_failed', err, {
            signalName: signal.name,
          }),
        );
      }
    }
    catch (err) {
      logger.error('_callListeners', 'call_listener_failed', err, {
        signalName: signal.name,
      });
    }
  }

  signal.listenerList
      .filter((listener) => !listener.disabled && listener.once)
      .forEach((listener) => _removeSignalListener(signal, listener.id));
}

/**
 * Adds a new listener to the signal.
 *
 * Example:
 *
 * ```ts
 * const signal = _getSignalObject('content-change')
 * const listener = _addSignalListener(signal, (content) => console.log(content));
 * ```
 */
export function _addSignalListener<SignalName extends keyof AlwatrSignals>(
    signal: SignalObject<SignalName>,
    listenerCallback: ListenerCallback<SignalName>,
    options: ListenerOptions = {},
): ListenerObject<SignalName> {
  options.once ??= false;
  options.disabled ??= false;
  options.receivePrevious ??= true;
  options.priority ??= false;

  logger.logMethodArgs('_addSignalListener', {signalName: signal.name, options});

  const listener: ListenerObject<SignalName> = {
    id: ++_lastListenerId,
    once: options.once,
    disabled: options.disabled,
    callback: listenerCallback,
  };

  let callbackCalled = false;

  // Run callback for old dispatch signal
  if (signal.value !== undefined) {
    // null is a valid value for signal.
    if (options.receivePrevious === 'Immediate') {
      logger.incident('_addSignalListener', 'call_signal_callback', 'run callback with previous signal value', {
        signalName: signal.name,
        mode: 'Immediate',
      });
      try {
        listenerCallback(signal.value);
      }
      catch (err) {
        logger.error('_addSignalListener', 'call_signal_callback_failed', err, {
          signalName: signal.name,
        });
      }
      callbackCalled = true;
    }
    else if (options.receivePrevious === true) {
      requestAnimationFrame(() => {
        if (signal.value !== undefined) {
          // null is a valid value for signal.
          logger.incident('_addSignalListener', 'call_signal_callback', 'run callback with previous signal value', {
            signalName: signal.name,
            mode: 'Delay',
          });
          listenerCallback(signal.value);
        }
      });
      callbackCalled = true; // must be outside of requestAnimationFrame.
    }
  }

  // if once then must remove listener after fist callback called! then why push it to listenerList?!
  if (!(options.once === true && callbackCalled === true)) {
    if (options.priority === true) {
      signal.listenerList.unshift(listener);
    }
    else {
      signal.listenerList.push(listener);
    }
  }

  return listener;
}

/**
 * Removes a listener from the signal.
 *
 * Example:
 *
 * ```ts
 * const signal = _getSignalObject('content-change')
 * const listener = _addSignalListener(signal, ...);
 * _removeSignalListener(signal, listener);
 * ```
 */
export function _removeSignalListener<SignalName extends keyof AlwatrSignals>(
    signal: SignalObject<SignalName>,
    listenerId: number,
): void {
  logger.logMethodArgs('_removeSignalListener', {signalName: signal.name, listenerId});
  const listenerIndex = signal.listenerList.findIndex((_listener) => _listener.id === listenerId);
  if (listenerIndex !== -1) {
    signal.listenerList.splice(listenerIndex, 1);
  }
}

/**
 * Dispatch (send) signal to all listeners.
 *
 * @example
 * const signal = _getSignalObject('content-change')
 * _dispatchSignal(signal, content);
 */
export function _dispatchSignal<SignalName extends keyof AlwatrSignals>(
    signal: SignalObject<SignalName>,
    value: AlwatrSignals[SignalName],
    options: DispatchOptions = {},
): void {
  options.debounce ??= true;

  logger.logMethodArgs('dispatchSignal', {signalName: signal.name, value, options});

  // set value before check signal.debounced for act like throttle (call listeners with last dispatch value).
  signal.value = value;

  if (signal.disabled) return; // signal is disabled.
  if (options.debounce === true && signal.debounced === true) return; // last dispatch in progress.

  if (options.debounce !== true) {
    // call listeners immediately.
    __callListeners(signal);
    return;
  }
  // else: call listeners in next frame.
  signal.debounced = true;
  requestAnimationFrame(() => {
    __callListeners(signal);
    signal.debounced = false;
  });
}

/**
 * Defines the provider of the signal that will be called when the signal requested (addRequestSignalListener).
 *
 * Example:
 *
 * ```ts
 * const signal = _getSignalObject('content-change');
 * const requestSignal = _getSignalObject('request-content-change');
 * _setSignalProvider(signal, requestSignal, async (requestParam) => {
 *   const content = await fetchNewContent(requestParam);
 *   if (content != null) {
 *     return content; // dispatchSignal('content-change', content);
 *   }
 *   else {
 *     dispatchSignal('content-not-found');
 *   }
 * }
 * ```
 */
export function _setSignalProvider<SignalName extends keyof AlwatrSignals>(
    signal: SignalObject<SignalName>,
    requestSignal: SignalObject<SignalName>,
    signalProvider: SignalProvider<SignalName>,
    options: SignalProviderOptions = {},
): ListenerObject<SignalName> {
  options.debounce ??= true;
  options.receivePrevious ??= true;

  logger.logMethodArgs('_setSignalProvider', {signal: signal.name, requestSignal: requestSignal.name, options});

  if (requestSignal.listenerList.length > 0) {
    logger.accident(
        '_setSignalProvider',
        'another_signal_provider_exist',
        'Another provider exist! It will be removed to fix the problem',
        {
          signalName: signal.name,
        },
    );
    requestSignal.listenerList = [];
  }

  const _callback = async (requestParam: AlwatrRequestSignals[SignalName]): Promise<void> => {
    const signalValue = await signalProvider(requestParam);
    if (signalValue !== undefined) {
      // null is a valid value for signal.
      _dispatchSignal(signal, signalValue, {debounce: options.debounce});
    }
  };

  return _addSignalListener(requestSignal, _callback as unknown as ListenerCallback<SignalName>, {
    receivePrevious: options.receivePrevious,
  });
}
