// import {FiniteStateMachine} from '@alwatr/fsm';
// import {redirect} from '@alwatr/router';
// import {eventListener} from '@alwatr/signal';

// import {fetchOrderStorage} from '../context-provider/order-storage.js';
// import {orderStorageContextConsumer, topAppBarContextProvider} from '../context.js';

// import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
// import type {Order} from '@alwatr/type/customer-order-management.js';

// export const pageOrderListStateMachine = new FiniteStateMachine({
//   id: 'page-order-list',
//   initial: 'pending',
//   context: {
//     orderStorage: <AlwatrDocumentStorage<Order> | null>null,
//   },
//   states: {
//     $all: {
//       on: {
//       },
//     },
//     pending: {
//       on: {
//         CONTEXT_LOADED: 'list',
//       },
//     },
//     list: {
//       on: {
//         REQUEST_UPDATE: 'reloading',
//       },
//     },
//     reloading: {
//       on: {
//         CONTEXT_LOADED: 'list',
//       },
//     },
//   },
// } as const);

// export const buttons = {
//   backToHome: {
//     icon: 'arrow-back-outline',
//     flipRtl: true,
//     clickSignalId: 'back_to_home_click_event',
//   },
//   reload: {
//     icon: 'reload-outline',
//     // flipRtl: true,
//     clickSignalId: pageOrderListStateMachine.config.id + '_reload_click_event',
//   },
//   newOrder: {
//     icon: 'add-outline',
//     clickSignalId: pageOrderListStateMachine.config.id + '_new_order_click_event',
//   },
//   orderDetail: {
//     clickSignalId: pageOrderListStateMachine.config.id + '_order_detail_click_event',
//   },
// } as const;

// pageOrderListStateMachine.signal.subscribe(async (state) => {
//   // logger.logMethodArgs('pageOrderListFsm.changed', state);
//   switch (state.by) {
//     case 'REQUEST_UPDATE': {
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       topAppBarContextProvider.setValue({
//         headlineKey: 'loading',
//         startIcon: buttons.backToHome,
//         endIconList: [buttons.newOrder, buttons.reload],
//       });
//       await fetchOrderStorage();
//       topAppBarContextProvider.setValue({
//         headlineKey: 'page_order_list_headline',
//         startIcon: buttons.backToHome,
//         endIconList: [buttons.newOrder, buttons.reload],
//       });
//       pageOrderListStateMachine.transition('CONTEXT_LOADED');
//       break;
//     }
//   }

//   if (state.to === 'loading') {
//     if (pageOrderListStateMachine.context.orderStorage != null) {
//       pageOrderListStateMachine.transition('CONTEXT_LOADED');
//     }
//   }
// });

// orderStorageContextConsumer.subscribe((orderStorage) => {
//   pageOrderListStateMachine.transition('CONTEXT_LOADED', {orderStorage});
// });

// eventListener.subscribe<ClickSignalType>(buttons.reload.clickSignalId, () => {
//   pageOrderListStateMachine.transition('REQUEST_UPDATE');
// });

// eventListener.subscribe<ClickSignalType>(buttons.newOrder.clickSignalId, () => {
//   redirect({
//     sectionList: ['new-order'],
//   });
// });

// eventListener.subscribe<ClickSignalType<Order>>(buttons.orderDetail.clickSignalId, (event) => {
//   redirect({
//     sectionList: ['order-detail', event.detail.id],
//   });
// });
