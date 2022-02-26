import {createLogger} from '@vatr/logger';
import type {SignalObject} from './type';

export const log = createLogger('vatr/signal');
export const error = createLogger('vatr/signal', 'error', true);

/**
 * Signal stack database.
 */
const _signalStack: {
  [SignalName in keyof VatrSignals]?: SignalObject<SignalName>;
} = {};

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
      priorityListenerList: [],
    };
  }
  return _signalStack[signalName] as unknown as SignalObject<SignalName>;
}

export function _callListeners<SignalName extends keyof VatrSignals>(
    signal: SignalObject<SignalName>,
): void {
  log('callListeners(%s, %o)', signal.name, signal.value);
  for (const listener of signal.listenerList) {
    if (listener.disabled) continue;
    try {
      const ret = listener.callback(signal.value);
      if (ret instanceof Promise) {
        ret.catch((err) => error('callListeners(%s): listener.callback error! %o', signal.name, err));
      }
    } catch (err) {
      error('callListeners(%s): listener.callback error! %o', signal.name, err);
    }
    if (listener.once) _removeSignalListener(signal, listener.id);
  }
}

export function _removeSignalListener<SignalName extends keyof VatrSignals>(
    signal: SignalObject<SignalName>,
    listenerId: symbol,
): void {
  let listenerIndex = signal.listenerList.findIndex((_listener) => _listener.id === listenerId);
  if (listenerIndex !== -1) { // found in listener list.
    signal.priorityListenerList.splice(listenerIndex, 1);
  } else { // not found try to find in priority listener list.
    listenerIndex = signal.priorityListenerList.findIndex((_listener) => _listener.id === listenerId);
    signal.priorityListenerList.splice(listenerIndex, 1);
  }
}
