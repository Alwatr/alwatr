import {type StringifyableFetchOptions} from '@alwatr/fetch';
import {finiteStateMachineConsumer, type FsmConsumerInterface} from '@alwatr/fsm';

import {getResponse, request, setOptions} from './core.js';

import type {RequestServiceFsm, RequestServiceFsmContext} from './type.js';
import type {AlwatrDocumentStorage, AlwatrServiceResponseSuccessWithMeta, OmitFirstParam} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const serverContextConsumer = <TResponse extends AlwatrServiceResponseSuccessWithMeta = AlwatrDocumentStorage>(
  instanceId: string,
  options?: StringifyableFetchOptions,
) => {
  const fsm = finiteStateMachineConsumer<RequestServiceFsm, RequestServiceFsmContext<TResponse>>(
      instanceId,
      'request_service_fsm',
  );

  if (options != null) {
    setOptions(fsm as FsmConsumerInterface<RequestServiceFsm>, options);
  }

  return {
    id: instanceId,
    request: request.bind(null, fsm as FsmConsumerInterface<RequestServiceFsm>) as OmitFirstParam<typeof request>,
    setOptions: setOptions.bind(null, fsm as FsmConsumerInterface<RequestServiceFsm>) as OmitFirstParam<
    typeof setOptions
    >,
    getResponse: getResponse.bind(null, fsm as FsmConsumerInterface<RequestServiceFsm>) as OmitFirstParam<
      typeof getResponse<TResponse>
    >,
    getState: fsm.getState,
    subscribe: fsm.subscribe,
    unsubscribe: fsm.unsubscribe,
    fsm,
  } as const;
};

// Demo order storage consumer
const orderStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<Order>>('order_storage_context', {
  url: '/api/order-list',
});
orderStorageContextConsumer.request({queryParameters: {userId: 123}});
orderStorageContextConsumer.getState().target;
orderStorageContextConsumer.getResponse()?.data[12].discountType;
