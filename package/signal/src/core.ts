import {createLogger, alwatrRegisteredList} from '@alwatr/logger';
import type {
  DispatchOptions,
  ListenerCallback,
  ListenerObject,
  ListenerOptions,
  SignalObject,
  SignalProvider,
  SignalProviderOptions,
  SignalStack,
} from './type';

export const logger = createLogger('alwatr/signal');

alwatrRegisteredList.push({
  name: '@alwatr/signal',
  version: '{{ALWATR_VERSION}}',
});

/**
 * Signal stack database.
 */
const _signalStack: SignalStack = {};

/**
 * Access to signal option, Make new signal with default options if not exist.
 */
export function __getSignalObject<SignalName extends keyof AlwatrSignals>(
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

function __callListeners<SignalName extends keyof AlwatrSignals>(
    signal: SignalObject<SignalName>,
): void {
  logger.logMethodArgs('_callListeners', {signalName: signal.name, signalValue: signal.value});
  if (signal.value === undefined) {
    logger.accident('_callListeners', 'no_signal_value', 'signal must have a value', {signalName: signal.name});
    return;
  }

  for (const listener of signal.listenerList) {
    if (listener.disabled) continue;
    try {
      const ret = listener.callback(signal.value);
      if (ret instanceof Promise) {
        ret.catch((err) =>
          logger.error('_callListeners', 'call_listener_failed', (err as Error).stack || err,
              {signalName: signal.name}));
      }
    } catch (err) {
      logger.error('_callListeners', 'call_listener_failed', (err as Error).stack || err, {signalName: signal.name});
    }
  }

  signal.listenerList
      .filter((listener) => !listener.disabled && listener.once)
      .forEach((listener) => _removeSignalListener(signal.name, listener.id));
}

/**
 * Add new listener to specific signal.
 *
 * Example:
 *
 * ```ts
 * const listener = addSignalListener('content-change', (content) => console.log(content));
 * ```
 */
export function _addSignalListener<SignalName extends keyof AlwatrSignals>(
    signalName: SignalName,
    signalCallback: ListenerCallback<SignalName>,
    options?: ListenerOptions,
): ListenerObject<SignalName> {
  logger.logMethodArgs('addSignalListener', {signalName, options});

  const signal = __getSignalObject(signalName);
  const listener: ListenerObject<SignalName> = {
    id: Symbol('Alwatr signal listener for ' + signalName),
    once: options?.once ?? false,
    disabled: options?.disabled ?? false,
    callback: signalCallback,
  };

  let callbackCalled = false;

  // Run callback for old dispatch signal
  if (signal.value !== undefined) {
    if (options?.receivePrevious === 'Immediate') {
      logger.incident('addSignalListener', 'call_signal_callback', 'run callback with previous signal value!',
          {signalName, mode: 'Immediate'});
      try {
        signalCallback(signal.value);
      } catch (err) {
        logger.error('addSignalListener', 'call_signal_callback_failed', (err as Error).stack || err, {signalName});
      }
      callbackCalled = true;
    } else if (options?.receivePrevious === true) {
      requestAnimationFrame(() => {
        if (signal.value !== undefined) {
          logger.incident('addSignalListener', 'call_signal_callback', 'run callback with previous signal value!',
              {signalName, mode: 'Delay'});
          signalCallback(signal.value);
        }
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

  return listener;
}

/**
 * Remove listener from specific signal.
 *
 * Example:
 *
 * ```ts
 * const listener = addSignalListener('content-change', ...);
 * removeSignalListener('content-change', listener);
 * ```
 */
export function _removeSignalListener<SignalName extends keyof AlwatrSignals>(
    signalName: SignalName,
    listenerId: symbol,
): void {
  logger.logMethodArgs('_removeSignalListener', signalName);
  const signal = __getSignalObject(signalName);
  const listenerIndex = signal.listenerList.findIndex((_listener) => _listener.id === listenerId);
  if (listenerIndex !== -1) {
    signal.listenerList.splice(listenerIndex, 1);
  }
}

/**
 * Dispatch signal to all listeners.
 *
 * @example
 * dispatchSignal('content-change', content);
 */
export function _dispatchSignal<SignalName extends keyof AlwatrSignals>(
    signalName: SignalName,
    value: AlwatrSignals[SignalName],
    options?: DispatchOptions,
): void {
  logger.logMethodArgs('dispatchSignal', {signalName, value, options});

  const signal = __getSignalObject(signalName);
  // set value before check signal.debounced for act like throttle (call listeners with last dispatch value).
  signal.value = value;

  if (signal.disabled) return; // signal is disabled.
  if (options?.debounce && signal.debounced) return; // last dispatch in progress.

  if (!options?.debounce) {
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
 * Define signal provider, which will be called when signal requested (addRequestSignalListener).
 *
 * Example:
 *
 * ```ts
 * setSignalProvider('content-change', async (requestParam) => {
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
export function _setSignalProvider<SignalName extends keyof AlwatrRequestSignals>(
    signalName: SignalName,
    signalProvider: SignalProvider<SignalName>,
    options?: SignalProviderOptions,
): ListenerObject<SignalName> {
  logger.logMethodArgs('setSignalProvider', {signalName, options});

  // @TODO: refactor with removeSignalProvider
  const signal = __getSignalObject(`request-${signalName}` as unknown as SignalName);
  if (signal.listenerList.length > 0) {
    logger.accident('setSignalProvider', 'signal_provider_already_set', 'another provider defined and will removed'
        , {signalName});
    signal.listenerList = [];
  }

  const _callback = async (requestParam: AlwatrRequestSignals[SignalName]): Promise<void> => {
    const signalValue = await signalProvider(requestParam);
    if (signalValue !== undefined) { // null can be a valid value.
      _dispatchSignal(signalName, signalValue, {debounce: options?.debounce ?? true});
    }
  };

  return _addSignalListener(
    `request-${signalName}` as unknown as SignalName,
    _callback as unknown as ListenerCallback<SignalName>,
    {receivePrevious: options?.receivePrevious ?? true},
  );
}
