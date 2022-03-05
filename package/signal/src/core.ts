import {createLogger, vatrRegisteredList} from '@vatr/logger';
import type {SignalObject, SignalStack} from './type';

export const log = createLogger('vatr/signal');
export const error = createLogger('vatr/signal', 'error', true);

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
  log('_callListeners(%s, %o)', signal.name, signal.value);
  if (signal.value === undefined) {
    error('_callListeners(%s): signal must have a value!', signal.name, signal.value);
    return;
  }
  for (const listener of signal.listenerList) {
    if (listener.disabled) continue;
    try {
      const ret = listener.callback(signal.value);
      if (ret instanceof Promise) {
        ret.catch((err) => error('_callListeners(%s): listener.callback error! %o', signal.name, err));
      }
    } catch (err) {
      error('_callListeners(%s): listener.callback error! %o', signal.name, err);
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
