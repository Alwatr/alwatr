import {_addSignalListener, _getSignalDetail, _removeSignalListener, _untilNextSignal} from './core.js';

import type {SignalInterface, BoundSignalInterface} from './signal-interface-type.js';

export type AllowSignalConsumerMethods = 'addListener' | 'getDetail' | 'untilNext' | 'removeListener';
export type BoundSignalConsumerInterface<T extends Record<string, unknown>> = Pick<
  BoundSignalInterface<T>,
  AllowSignalConsumerMethods & 'id'
>;
export interface SignalConsumerInterface extends Pick<SignalInterface, Exclude<AllowSignalConsumerMethods, 'id'>> {
  /**
   * Bind signal consumer to special signal id.
   */
  readonly bind: <T extends Record<string, unknown>>(signalId: string) => BoundSignalConsumerInterface<T>;
}

/**
 * Simple signals consumer (event listener).
 */
export const signalConsumer: SignalConsumerInterface = {
  getDetail: _getSignalDetail,
  untilNext: _untilNextSignal,
  addListener: _addSignalListener,
  removeListener: _removeSignalListener,
  bind: <T extends Record<string, unknown>>(signalId: string) => <BoundSignalConsumerInterface<T>>{
    id: signalId,
    getDetail: _getSignalDetail.bind(null, signalId),
    untilNext: _untilNextSignal.bind(null, signalId),
    addListener: _addSignalListener.bind(null, signalId),
    removeListener: _removeSignalListener,
  },
};
