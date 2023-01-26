import {_dispatchSignal, _expireSignal, _getSignalDetail} from './core.js';

import type {SignalInterface, BoundSignalInterface} from './signal-interface-type.js';

type AllowMethods = 'getDetail' | 'dispatch' | 'expire';
export type BoundSignalConsumerInterface<T extends Record<string, unknown>> = Pick<
  BoundSignalInterface<T>,
  AllowMethods & 'id'
>;
export interface SignalProviderInterface extends Pick<SignalInterface, AllowMethods> {
  /**
   * Bind signal provider to special signal id.
   */
  readonly bind: <T extends Record<string, unknown>>(signalId: string) => BoundSignalConsumerInterface<T>;
}

/**
 * Simple signals provider (event sender).
 */
export const signalProvider: SignalProviderInterface = {
  getDetail: _getSignalDetail,
  dispatch: _dispatchSignal,
  expire: _expireSignal,
  bind: <T extends Record<string, unknown>>(signalId: string) => <BoundSignalConsumerInterface<T>>{
    id: signalId,
    getDetail: _getSignalDetail.bind(null, signalId),
    dispatch: _dispatchSignal.bind(null, signalId),
    expire: _expireSignal.bind(null, signalId),
  },
};

/**
 * Bind signalProvider.dispatch to special signal id.
 */
export const bindSignalDispatch = <T extends Record<string, unknown>>(
  signalId: string,
): OmitFirstParam<typeof _dispatchSignal<T>> => _dispatchSignal.bind(null, signalId);
