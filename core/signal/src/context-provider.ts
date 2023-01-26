import {_dispatchSignal, _getSignalDetail, _setSignalProvider} from './core.js';

import type {SignalInterface, BoundSignalInterface} from './signal-interface-type.js';

export type AllowContextProviderMethods = 'getValue' | 'setValue' | 'setProvider';
export type BoundContextProviderInterface<T extends Record<string, unknown>> = Pick<
  BoundSignalInterface<T>,
  AllowContextProviderMethods & 'id'
>;
export interface ContextProviderInterface extends Pick<SignalInterface, AllowContextProviderMethods> {
  /**
   * Bind signal provider to special signal id.
   */
  readonly bind: <T extends Record<string, unknown>>(signalId: string) => BoundContextProviderInterface<T>;
}

/**
 * Context provider (signal provider for context).
 */
export const contextProvider: ContextProviderInterface = {
  getValue: _getSignalDetail,
  setValue: _dispatchSignal,
  setProvider: _setSignalProvider,
  bind: <T extends Record<string, unknown>>(signalId: string) => <BoundContextProviderInterface<T>>{
    id: signalId,
    getValue: _getSignalDetail.bind(null, signalId),
    setValue: _dispatchSignal.bind(null, signalId),
    setProvider: _setSignalProvider.bind(null, signalId),
  },
};
