import {Stringifyable} from '@alwatr/type';

import {_dispatchSignal, _getSignalDetail} from './core.js';

import type {SignalInterface, BoundSignalInterface} from './signal-interface-type.js';

export type AllowSignalProviderMethods = 'getDetail' | 'dispatch';
export type BoundSignalProviderInterface<T extends Stringifyable> = Pick<
  BoundSignalInterface<T>,
  AllowSignalProviderMethods & 'id'
>;
export interface SignalProviderInterface extends Pick<SignalInterface, AllowSignalProviderMethods> {
  /**
   * Bind signal provider to special signal id.
   */
  readonly bind: <T extends Stringifyable>(signalId: string) => BoundSignalProviderInterface<T>;
}

/**
 * Simple signals provider (event sender).
 */
export const signalProvider: SignalProviderInterface = {
  getDetail: _getSignalDetail,
  dispatch: _dispatchSignal,
  bind: <T extends Stringifyable>(signalId: string) =>
    <BoundSignalProviderInterface<T>>{
      id: signalId,
      getDetail: _getSignalDetail.bind(null, signalId),
      dispatch: _dispatchSignal.bind(null, signalId),
    },
};
