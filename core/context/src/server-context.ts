import {type StringifyableFetchOptions} from '@alwatr/fetch';
import {finiteStateMachineConsumer, type FsmConsumerInterface} from '@alwatr/fsm';

import {getResponse, request, setOptions} from './core.js';

import type {ServerContextFsm, ServerContextFsmContext} from './type.js';
import type {AlwatrDocumentStorage, AlwatrServiceResponseSuccessWithMeta, OmitFirstParam} from '@alwatr/type';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const serverContextConsumer = <TResponse extends AlwatrServiceResponseSuccessWithMeta = AlwatrDocumentStorage>(
  instanceId: string,
  options?: StringifyableFetchOptions,
) => {
  const fsm = finiteStateMachineConsumer<ServerContextFsm, ServerContextFsmContext<TResponse>>(
      instanceId,
      'request_service_fsm',
  );

  if (options != null) {
    setOptions(fsm as FsmConsumerInterface<ServerContextFsm>, options);
  }

  return {
    id: instanceId,
    request: request.bind(null, fsm as FsmConsumerInterface<ServerContextFsm>) as OmitFirstParam<typeof request>,
    setOptions: setOptions.bind(null, fsm as FsmConsumerInterface<ServerContextFsm>) as OmitFirstParam<
    typeof setOptions
    >,
    getResponse: getResponse.bind(null, fsm as FsmConsumerInterface<ServerContextFsm>) as OmitFirstParam<
      typeof getResponse<TResponse>
    >,
    getState: fsm.getState,
    subscribe: fsm.subscribe,
    unsubscribe: fsm.unsubscribe,
    fsm,
  } as const;
};
