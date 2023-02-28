import {createLogger, globalAlwatr} from '@alwatr/logger';
import {requestAnimationFrame} from '@alwatr/util';

import type {
  DispatchOptions,
  ListenerFunction,
  ListenerObject,
  SubscribeOptions,
  SignalObject,
  ProviderFunction,
  ProviderOptions,
  SignalStorage,
  ListenerSpec,
} from './type.js';
import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/signal',
  version: _ALWATR_VERSION_,
});

/**
 * Listener `id`
 */
let _lastListenerAutoId = 0;

const debounceTimeout = 5;

/**
 * Signal stack database.
 */
const _signalStorage: SignalStorage = {};

export const logger = createLogger('alwatr/signal');

/**
 * Get signal object by id, If not available, it will create a new signal with default options.
 *
 * Don't use it directly.
 *
 * Example:
 *
 * ```ts
 * const signal = getSignalObject<ContentType>('content-change');
 * signal.disabled = true;
 * ```
 */
export const getSignalObject = <T extends Stringifyable>(id: string): SignalObject<T> => {
  let signal = _signalStorage[id] as SignalObject<T> | undefined;
  if (signal == null) {
    signal = _signalStorage[id] = {
      id,
      disabled: false,
      debounced: false,
      listenerList: [],
    };
  }
  return signal;
};

/**
 * Call all listeners callback of special signal.
 *
 * Used inside dispatch, Don't use it directly.
 */
export const _callListeners = <T extends Stringifyable>(signal: SignalObject<T>, detail: T): void => {
  logger.logMethodArgs('_callListeners', {signalId: signal.id, signalDetail: detail});

  const removeList: Array<ListenerObject<T>> = [];

  for (const listener of signal.listenerList) {
    if (listener.disabled) continue;
    if (listener.once) removeList.push(listener);
    try {
      const ret = listener.callback(detail);
      if (ret instanceof Promise) {
        ret.catch((err) =>
          logger.error('_callListeners', 'call_listener_failed', err, {
            signalId: signal.id,
          }),
        );
      }
    }
    catch (err) {
      logger.error('_callListeners', 'call_listener_failed', err, {
        signalId: signal.id,
      });
    }
  }

  removeList.forEach((listener) => unsubscribe(listener));
};

/**
 * Subscribe new signal listener to a signal, work like addEventListener.
 *
 * Example:
 *
 * ```ts
 * const listener = subscribe<ContentType>('content-change', (content) => console.log(content));
 * // ...
 * unsubscribe(listener);
 * ```
 */
export const subscribe = <T extends Stringifyable>(
  signalId: string,
  listenerCallback: ListenerFunction<T>,
  options: Partial<SubscribeOptions> = {},
): ListenerSpec => {
  options.once ??= false;
  options.disabled ??= false;
  options.receivePrevious ??= 'NextCycle';
  options.priority ??= false;

  logger.logMethodArgs('subscribe', {signalId, options});

  const signal = getSignalObject<T>(signalId);

  const listener: ListenerObject<T> = {
    id: ++_lastListenerAutoId,
    signalId: signal.id,
    once: options.once,
    disabled: options.disabled,
    callback: listenerCallback,
  };

  const callbackCall = signal.detail !== undefined && options.receivePrevious !== 'No';
  if (callbackCall) {
    // Run callback for old dispatch signal

    const callback = (): void => {
      try {
        if (signal.detail !== undefined) listenerCallback(signal.detail);
      }
      catch (err) {
        logger.error('subscribe', 'call_signal_callback_failed', err, {
          signalId: signal.id,
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
      signal.listenerList.unshift(listener);
    }
    else {
      signal.listenerList.push(listener);
    }
  }

  return {
    id: listener.id,
    signalId: listener.signalId,
  };
};

/**
 * Unsubscribe listener from signal, work like removeEventListener.
 *
 * Example:
 *
 * ```ts
 * const listener = subscribe<ContentType>('content-change', (content) => console.log(content));
 * // ...
 * unsubscribe(listener);
 * ```
 */
export const unsubscribe = (listener: ListenerSpec): void => {
  logger.logMethodArgs('unsubscribe', listener);
  const signal = getSignalObject(listener.signalId);
  const listenerIndex = signal.listenerList.findIndex((_listener) => _listener.id === listener.id);
  if (listenerIndex !== -1) {
    void signal.listenerList.splice(listenerIndex, 1);
  }
};

/**
 * Unsubscribe all listener from a signal, clear all listeners.
 *
 * Example:
 *
 * ```ts
 * removeAllListeners('content-change');
 * ```
 */
export const removeAllListeners = (signalId: string): void => {
  logger.logMethodArgs('removeAllListeners', signalId);
  const signal = getSignalObject(signalId);
  if (signal.listenerList.length === 0) return;
  signal.listenerList.length = 0;
  signal.listenerList = [];
};

/**
 * Dispatch (send) signal to all listeners.
 *
 * Signal detail changed immediately without any debounce.
 *
 * Example:
 *
 * ```ts
 * dispatch<ContentType>('content-change', newContent);
 * ```
 */
export const dispatch = <T extends Stringifyable>(
  signalId: string,
  detail: T,
  options: Partial<DispatchOptions> = {},
): void => {
  options.debounce ??= 'AnimationFrame';

  logger.logMethodArgs('dispatch', {signalId, detail, options});

  const signal = getSignalObject<T>(signalId);

  // set detail before check signal.debounced for act like throttle (call listeners with last dispatch detail).
  signal.detail = detail;

  if (signal.disabled) return; // signal is disabled.

  if (options.debounce === 'No') {
    return _callListeners(signal, detail);
  }

  // else
  if (options.debounce === 'NextCycle') {
    setTimeout(_callListeners, 0, signal, detail);
    return;
  }

  // else
  if (signal.debounced === true) {
    return; // last dispatch in progress.
  }

  // else
  signal.debounced = true;
  const callListeners = (): void => {
    _callListeners(signal, signal.detail ?? detail);
    signal.debounced = false;
  };
  options.debounce === 'AnimationFrame'
    ? requestAnimationFrame(callListeners)
    : setTimeout(callListeners, debounceTimeout);
};

/**
 * Get current signal detail/value.
 *
 * Return undefined if signal not dispatched before or expired.
 *
 * Example:
 *
 * ```ts
 * const currentContent = getDetail<ContentType>('content-change');
 * if (currentContent === undefined) {
 *   // signal not dispatched yet
 * }
 * ```
 */
export const getDetail = <T extends Stringifyable>(signalId: string): T | undefined => {
  return getSignalObject<T>(signalId).detail;
};

/**
 * Get the detail/value of the next received signal.
 *
 * Example:
 *
 * ```ts
 * const newContent = await untilNext<ContentType>('content-change');
 * ```
 */
export const untilNext = <T extends Stringifyable>(signalId: string): Promise<T> => {
  return new Promise((resolve) => {
    logger.logMethodArgs('untilNext', signalId);
    subscribe<T>(signalId, resolve, {
      once: true,
      priority: true,
      receivePrevious: 'No',
    });
  });
};

/**
 * Defines the provider of the context signal that will be called when the context requested.
 * Subscribe to `request-signalId`.
 *
 * Example:
 *
 * ```ts
 * setContextProvider('content-change', async (requestParam) => await fetchNewContent(requestParam));
 * ```
 */
export const setContextProvider = <TContext extends Stringifyable, TRquest extends Stringifyable>(
  signalId: string,
  signalProvider: ProviderFunction<TRquest, TContext | void>,
  options: Partial<ProviderOptions> = {},
): void => {
  options.debounce ??= 'AnimationFrame';
  options.receivePrevious ??= 'AnimationFrame';
  logger.logMethodArgs('setContextProvider', {signalId, options});
  const requestSignalId = 'request-' + signalId;
  removeAllListeners(requestSignalId);
  subscribe<TRquest>(
      requestSignalId,
      async (argumentObject): Promise<void> => {
        const signalDetail = await signalProvider(argumentObject);
        if (signalDetail !== undefined) {
          dispatch<TContext>(signalId, signalDetail, {debounce: options.debounce});
        }
      },
      {
        receivePrevious: options.receivePrevious,
      },
  );
};

/**
 * Defines the command and dispatch returned value.
 *
 * Subscribe commandFunction to request-command-signal and dispatch callback-signal with commandFunction return value.
 *
 * Example:
 *
 * ```ts
 * defineCommand<TArgument, TReturn>(
 *   'show-prompt',
 *   async (argumentObject) => {
 *      return await showPrompt(argumentObject);
 *   },
 * );
 * ```
 */
export const defineCommand = <TArgument extends StringifyableRecord, TReturn extends Stringifyable>(
  signalId: string,
  signalProvider: ProviderFunction<TArgument & {_callbackSignalId?: string}, TReturn>,
  options: Partial<Pick<ProviderOptions, 'debounce'>> = {},
): void => {
  options.debounce ??= 'AnimationFrame';
  logger.logMethodArgs('defineCommand', {commandId: signalId, options});
  const requestSignalId = 'request-' + signalId;
  removeAllListeners(requestSignalId);
  subscribe<TArgument & {_callbackSignalId?: string}>(
      requestSignalId,
      async (argumentObject) => {
        clearDetail(requestSignalId); // clean argumentObject from memory
        if (argumentObject._callbackSignalId == null) {
          signalProvider(argumentObject);
        }
        else {
          // prettier-ignore
          dispatch<TReturn>(
              argumentObject._callbackSignalId,
              await signalProvider(argumentObject),
              {debounce: options.debounce},
          );
        }
      },
      {receivePrevious: 'NextCycle'},
  );
};

/**
 * Dispatch request context signal with requestParam as detail.
 *
 * Example:
 *
 * ```ts
 * requestContext<RequestParamType>('content-change', {foo: 'bar'});
 * const newContent = await untilNext<ContentType>('content-change');
 * ```
 */
export const requestContext = <TRequest extends Stringifyable>(
  contextId: string,
  requestParam: TRequest,
  options: Partial<DispatchOptions> = {},
): void => {
  logger.logMethodArgs('requestContext', {contextId, requestParam});
  return dispatch<TRequest>(`request-${contextId}`, requestParam, options);
};

/**
 * Dispatch request command signal with commandArgument as detail.
 *
 * Example:
 *
 * ```ts
 * requestCommand<ArgumentType>('show-dialog', {foo: 'bar'});
 * ```
 */
export const requestCommand = <TArgument extends StringifyableRecord>(
  commandId: string,
  commandArgument: TArgument,
): void => {
  logger.logMethodArgs('requestCommand', {commandId, commandArgument});
  dispatch<TArgument>(`request-${commandId}`, commandArgument, {debounce: 'No'});
};

/**
 * Dispatch request command signal with commandArgument as detail and return untilNext of callback signal.
 *
 * Request command and wait for answer.
 *
 * Example:
 *
 * ```ts
 * const response = await requestCommandWithResponse<ArgumentType, ReturnType>('show-dialog', {foo: 'bar'});
 * ```
 */
export const requestCommandWithResponse = async <
  TArgument extends StringifyableRecord,
  TReturn extends Stringifyable
>(
  commandId: string,
  commandArgument: TArgument,
): Promise<TReturn> => {
  logger.logMethodArgs('requestCommand', {commandId, commandArgument});

  const _requestSignalId = `request-${commandId}`;
  const _callbackSignalId = `callback-${commandId}-${++_lastListenerAutoId}`;
  const untilCallback = untilNext<TReturn>(_callbackSignalId);

  dispatch<TArgument & {_callbackSignalId: string}>(
      _requestSignalId,
      {
        ...commandArgument,
        _callbackSignalId,
      },
      {debounce: 'NextCycle'},
  );

  const response = await untilCallback;
  destroySignal(_callbackSignalId);
  return response;
};

/**
 * Clear current signal detail without dispatch new signal.
 *
 * new subscriber options.receivePrevious not work until new signal
 *
 * Example:
 *
 * ```ts
 * clearDetail('product-list');
 * ```
 */
export const clearDetail = (signalId: string): void => {
  logger.logMethodArgs('expire', signalId);
  const signal = getSignalObject(signalId);
  delete signal.detail;
};

/**
 * Delete signal object with detail and listeners and options.
 *
 * new subscriber options.receivePrevious not work until new signal
 *
 * Example:
 *
 * ```ts
 * destroySignal('product-list');
 * ```
 */
export const destroySignal = (signalId: string): void => {
  logger.logMethodArgs('destroySignal', signalId);
  const signal = _signalStorage[signalId];
  if (signal == null) return;
  signal.listenerList.length = 0;
  delete _signalStorage[signalId];
};
