import {AlwatrBaseSignal} from '@alwatr/signal2';
import {FiniteStateMachine} from '@alwatr/fsm2';

import type { FetchOptions } from '../../fetch/src/type.js';

export interface ServerRequestConfig extends FetchOptions {
  name: string;
}

export class AlwatrServerRequest<TResponse> extends AlwatrBaseSignal<TResponse> {
  stateMachine = new FiniteStateMachine({
    initial: '',
  });

  constructor(protected _config: ServerRequestConfig) {
    super(_config.name, 'srv-request');
  }

  request(): void (
    fsm: FsmConsumerInterface<ServerContextFsm>,
    options?: ServerContextFsm['TContext']['options'],
    mergeOption = true,
): void => {
  logger.logMethodArgs?.('request', fsm.id);
  if (options != null) setOptions(fsm, options, mergeOption);
  fsm.transition('REQUEST');
};
}
