import {createLogger, globalAlwatr} from '@alwatr/logger';

import type {
  DispatchOptions,
  ListenerCallback,
  ListenerObject,
  ListenerOptions,
  SignalObject,
  ProviderFunction,
  ProviderOptions,
  SignalStorage,
} from './type.js';

export const logger = createLogger('alwatr/signal');

globalAlwatr.registeredList.push({
  name: '@alwatr/signal',
  version: _ALWATR_VERSION_,
});

/**
 * Listener `id`
 */
let _lastListenerId = 0;

const debounceTimeout = 5;

/**
 * Signal stack database.
 */
const _signalStorage: SignalStorage = {};

/**
 * Get signal object by id, If not available, it will create a new signal with default options.
 *
 * Example:
 *
 * ```ts
 * const signal = _getSignalObject('content-change');
 * signal.disabled = true;
 * ```
 */
export function _getSignalObject<T extends Record<string, unknown>>(id: string): SignalObject<T> {
  const signal = <SignalObject<T>>_signalStorage[id];
  if (signal == null) {
    _signalStorage[id] = {
      id,
      disabled: false,
      debounced: false,
      listenerList: [],
    };
  }
  return _signalStorage[id] as SignalObject<T>;
}

/**
 * Call all listeners callback of special signal.
 */
function __callListeners<T extends Record<string, unknown>>(signal: SignalObject<T>): void {
  logger.logMethodArgs('__callListeners', {signalId: signal.id, signalDetail: signal.detail});
  if (signal.detail === undefined) {
    // null is a valid detail for signal.
    logger.accident('__callListeners', 'no_signal_detail', 'signal must have a detail', {
      signalId: signal.id,
    });
    return;
  }

  for (const listener of signal.listenerList) {
    if (listener.disabled) continue;
    try {
      const ret = listener.callback(signal.detail);
      if (ret instanceof Promise) {
        ret.catch((err) =>
          logger.error('__callListeners', 'call_listener_failed', err, {
            signalId: signal.id,
          }),
        );
      }
    }
    catch (err) {
      logger.error('__callListeners', 'call_listener_failed', err, {
        signalId: signal.id,
      });
    }
  }

  signal.listenerList
      .filter((listener) => !listener.disabled && listener.once)
      .forEach((listener) => _removeSignalListener(listener));
}

/**
 * Adds a new listener to a signal.
 *
 * Example:
 *
 * ```ts
 * const signal = _getSignalObject('content-change')
 * const listener = _addSignalListener(signal, (content) => console.log(content));
 * ```
 */
export function _addSignalListener<T extends Record<string, unknown>>(
    signal: string | SignalObject<T>,
    listenerCallback: ListenerCallback<T>,
    options: ListenerOptions = {},
): ListenerObject<T> {
  const _signal = typeof signal === 'string' ? _getSignalObject<T>(signal) : signal;
  options.once ??= false;
  options.disabled ??= false;
  options.receivePrevious ??= 'AnimationFrame';
  options.priority ??= false;

  logger.logMethodArgs('_addSignalListener', {signal: _signal.id, options});

  const listener: ListenerObject<T> = {
    id: ++_lastListenerId,
    signalId: _signal.id,
    once: options.once,
    disabled: options.disabled,
    callback: listenerCallback,
  };

  const callbackCall = _signal.detail !== undefined && options.receivePrevious !== 'No';
  if (callbackCall) {
    // Run callback for old dispatch signal

    const callback = (): void => {
      try {
        if (_signal.detail !== undefined) listenerCallback(_signal.detail);
      }
      catch (err) {
        logger.error('_addSignalListener', 'call_signal_callback_failed', err, {
          signalId: _signal.id,
        });
      }
    };

    if (options.receivePrevious === 'AnimationFrame') {
      requestAnimationFrame(callback);
    }
    else {
      setTimeout(callback, options.receivePrevious === 'NextCycle' ? 0 : debounceTimeout);
    }
  }

  // if once then must remove listener after fist callback called! then why push it to listenerList?!
  if (!(callbackCall && options.once)) {
    if (options.priority === true) {
      _signal.listenerList.unshift(listener);
    }
    else {
      _signal.listenerList.push(listener);
    }
  }

  return listener;
}

/**
 * Removes a listener from the signal.
 */
export function _removeSignalListener(
    listener: Pick<ListenerObject<Record<string, unknown>>, 'id' | 'signalId'>,
): void {
  logger.logMethodArgs('_removeSignalListener', {signalId: listener.signalId, listenerId: listener.id});
  const signal = _getSignalObject(listener.signalId);
  const listenerIndex = signal.listenerList.findIndex((_listener) => _listener.id === listener.id);
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
export function _dispatchSignal<T extends Record<string, unknown>>(
    signal: SignalObject<T> | string,
    detail: T,
    options: DispatchOptions = {},
): void {
  const _signal = typeof signal === 'string' ? _getSignalObject<T>(signal) : signal;
  options.debounce ??= 'AnimationFrame';

  logger.logMethodArgs('_dispatchSignal', {signalId: _signal.id, detail, options});

  // set detail before check signal.debounced for act like throttle (call listeners with last dispatch detail).
  _signal.detail = detail;

  if (_signal.disabled) return; // signal is disabled.

  // Simple debounce noise filtering
  if (options.debounce !== 'No' && _signal.debounced === true) return; // last dispatch in progress.

  if (options.debounce === 'No') {
    // call listeners immediately.
    __callListeners(_signal);
    return;
  }
  // else
  _signal.debounced = true;
  const callListeners = (): void => {
    __callListeners(_signal);
    _signal.debounced = false;
  };
  options.debounce === 'AnimationFrame'
    ? requestAnimationFrame(callListeners)
    : setTimeout(callListeners, debounceTimeout);
}

/**
 * Get current signal detail
 */
export function _getSignalDetail<T extends Record<string, unknown>>(signal: string | SignalObject<T>): T | undefined {
  const _signal = typeof signal === 'string' ? _getSignalObject<T>(signal) : signal;
  return _signal.detail;
}

/**
 * Defines the provider of the signal that will be called when the signal requested (addRequestSignalListener).
 */
export function _setSignalProvider<TSignal extends Record<string, unknown>, TRequest extends Record<string, unknown>>(
    signalId: string,
    signalProvider: ProviderFunction<TSignal, TRequest>,
    options: ProviderOptions = {},
): ListenerObject<TRequest> {
  options.debounce ??= 'AnimationFrame';
  options.receivePrevious ??= 'AnimationFrame';

  logger.logMethodArgs('_setSignalProvider', {signalId: signalId, options});

  const requestSignal = _getSignalObject<TRequest>('request-' + signalId);

  if (requestSignal.listenerList.length > 0) {
    logger.accident(
        '_setSignalProvider',
        'another_signal_provider_exist',
        'Another provider exist! It will be removed to fix the problem',
        {
          signalId,
        },
    );
    requestSignal.listenerList = [];
  }

  const _callback = async (requestParam: TRequest): Promise<void> => {
    const signalDetail = await signalProvider(requestParam);
    if (signalDetail !== undefined) {
      // null is a valid detail for signal.
      _dispatchSignal(signalId, signalDetail, {debounce: options.debounce});
    }
  };

  return _addSignalListener<TRequest>(requestSignal, _callback, {
    receivePrevious: options.receivePrevious,
  });
}
