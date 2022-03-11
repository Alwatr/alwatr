import {createLogger, vatrRegisteredList} from '@vatr/logger';
import type {SignalObject, SignalStack} from './type';

export const logger = createLogger('vatr/signal');

vatrRegisteredList.push({
  name: '@vatr/signal',
  version: '{{VATR_VERSION}}',
});

/**
 * Signal stack database.
 */
const _signalStack: SignalStack = {};

/**
 * Access to signal option, Make new signal with default options if not exist.
 */
export function _getSignalObject<SignalName extends keyof VatrSignals>(
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

export function _callListeners<SignalName extends keyof VatrSignals>(
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
    if (listener.once) _removeSignalListener(signal, listener.id);
  }
}

export function _removeSignalListener<SignalName extends keyof VatrSignals>(
    signal: SignalObject<SignalName>,
    listenerId: symbol,
): void {
  const listenerIndex = signal.listenerList.findIndex((_listener) => _listener.id === listenerId);
  if (listenerIndex !== -1) { // found in listener list.
    signal.listenerList.splice(listenerIndex, 1);
  }
}
