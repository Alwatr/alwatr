import {SignalObject} from './type';

/**
 * Signal stack database.
 */
const signalStack: {
  [SignalName in keyof VatrSignals]?: SignalObject<SignalName>;
} = {};

/**
 * Access to signal option, Make new signal with default options if not exist.
 */
export function getSignalObject<SignalName extends keyof VatrSignals>(
    signalName: SignalName,
): SignalObject<SignalName> {
  if (!signalStack[signalName]) {
    signalStack[signalName] = {
      disabled: false,
      priorityListenerList: [],
      listenerList: [],
    };
  }
  return signalStack[signalName] as unknown as SignalObject<SignalName>;
}
