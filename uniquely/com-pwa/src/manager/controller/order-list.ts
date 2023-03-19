// import {finiteStateMachineProvider, type FsmTypeHelper} from '@alwatr/fsm';
// import {requestableContextConsumer} from '@alwatr/signal';
// import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

// import type {RequestableContext} from '@alwatr/signal/type.js';
// import type {AlwatrDocumentObject, AlwatrDocumentStorage} from '@alwatr/type';
// import type {Order} from '@alwatr/type/customer-order-management.js';

// const orderStorageContextConsumer =
//   requestableContextConsumer.bind<AlwatrDocumentStorage<Order>>('order-storage-context');

// export type OrderStorageContext<T extends AlwatrDocumentObject = Order> = {
//   orderStorage?: AlwatrDocumentStorage<T>;
// };

// export const orderListFsmConstructor = finiteStateMachineProvider.defineConstructor('order_list_fsm', {
//   context: <OrderStorageContext>{},
//   initial: 'pending',
//   stateRecord: {
//     $all: {
//       on: {},
//     },
//     pending: {
//       entry: 'initial_request_order_storage',
//       on: {
//         context_request_initial: {},
//         context_request_pending: {},
//         context_request_error: {
//           target: 'contextError',
//         },
//         context_request_complete: {
//           target: 'list',
//         },
//         context_request_reloading: {
//           target: 'reloading',
//         },
//       },
//     },
//     contextError: {
//       on: {
//         request_context: {
//           target: 'pending',
//           actions: 'request_order_storage',
//         },
//       },
//     },
//     list: {
//       on: {
//         request_context: {
//           target: 'reloading',
//           actions: 'request_order_storage',
//         },
//       },
//     },
//     reloading: {
//       on: {
//         context_request_error: {
//           target: 'list',
//           actions: 'notify_error',
//         },
//         context_request_complete: {
//           target: 'list',
//         },
//       },
//     },
//   },
// });

// export type OrderListFsm = FsmTypeHelper<typeof orderListFsmConstructor>;

// // entries actions
// finiteStateMachineProvider.defineActions<OrderListFsm>('order_list_fsm', {
//   initial_request_order_storage: (): void => {
//     const orderContext = orderStorageContextConsumer.getValue();
//     if (orderContext.state === 'initial') {
//       orderStorageContextConsumer.request(null);
//     }
//   },
//   request_order_storage: (): void => {
//     orderStorageContextConsumer.request(null);
//   },
//   notify_error: (): void =>
//     snackbarSignalTrigger.request({
//       messageKey: 'fetch_failed_description',
//     }),
// });

// finiteStateMachineProvider.defineSignals<OrderListFsm>('order_list_fsm', [
//   {
//     signalId: orderStorageContextConsumer.id,
//     callback: (context: RequestableContext<AlwatrDocumentStorage<Order>>, fsmInstance): void => {
//       fsmInstance.transition(`context_request_${context.state}`, {orderStorage: context.content});
//     },
//     receivePrevious: 'NextCycle',
//   },
// ]);
