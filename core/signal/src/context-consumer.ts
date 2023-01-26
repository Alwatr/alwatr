import {Stringifyable} from '@alwatr/type';

import {_addSignalListener, _getSignalDetail, _removeSignalListener, _requestSignal, _untilNextSignal} from './core.js';

import type {SignalInterface, BoundSignalInterface} from './signal-interface-type.js';

export type AllowContextConsumerMethods = 'getValue' | 'untilNext' | 'subscribe' | 'unsubscribe' | 'request';
export type BoundContextConsumerInterface<T extends Stringifyable> = Pick<
  BoundSignalInterface<T>,
  AllowContextConsumerMethods & 'id'
>;
export interface ContextConsumerInterface extends Pick<SignalInterface, AllowContextConsumerMethods> {
  /**
   * Bind signal consumer to special signal id.
   */
  readonly bind: <T extends Stringifyable>(signalId: string) => BoundContextConsumerInterface<T>;
}

/**
 * Context consumer (signal consumer for context).
 */
export const contextConsumer: ContextConsumerInterface = {
  getValue: _getSignalDetail,
  untilNext: _untilNextSignal,
  subscribe: _addSignalListener,
  unsubscribe: _removeSignalListener,
  request: _requestSignal,
  bind: <T extends Stringifyable>(signalId: string) =>
    <BoundContextConsumerInterface<T>>{
      id: signalId,
      getValue: _getSignalDetail.bind(null, signalId),
      untilNext: _untilNextSignal.bind(null, signalId),
      subscribe: _addSignalListener.bind(null, signalId),
      unsubscribe: _removeSignalListener,
      request: _requestSignal.bind(null, signalId),
    },
};
