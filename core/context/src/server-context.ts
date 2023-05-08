import {finiteStateMachineConsumer, type FsmConsumerInterface} from '@alwatr/fsm';

import {request, requestIfNotComplete, serverContextFsmConstructorId, setOptions} from './core.js';

import type {ServerContextFsm, ServerContextFsmContext} from './type.js';
import type {AlwatrDocumentStorage, AlwatrServiceResponseSuccessWithMeta, OmitFirstParam} from '@alwatr/type';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const serverContextConsumer = <TResponse extends AlwatrServiceResponseSuccessWithMeta = AlwatrDocumentStorage>(
  instanceId: string,
  options?: ServerContextFsm['TContext']['options'],
) => {
  const fsm = finiteStateMachineConsumer<ServerContextFsm, ServerContextFsmContext<TResponse>>(
      instanceId,
      serverContextFsmConstructorId,
  );

  if (options != null) {
    setOptions(fsm as FsmConsumerInterface<ServerContextFsm>, options);
  }

  return {
    id: instanceId,
    request: request.bind(null, fsm as FsmConsumerInterface<ServerContextFsm>) as OmitFirstParam<typeof request>,
    require: requestIfNotComplete.bind(null, fsm as FsmConsumerInterface<ServerContextFsm>) as OmitFirstParam<
      typeof requestIfNotComplete
    >,
    setOptions: setOptions.bind(null, fsm as FsmConsumerInterface<ServerContextFsm>) as OmitFirstParam<
      typeof setOptions
    >,
    getOptions: () => fsm.getContext().options,
    getResponse: () => fsm.getContext().response,
    getState: fsm.getState,
    subscribe: fsm.subscribe,
    unsubscribe: fsm.unsubscribe,
    fsm,
  } as const;
};
