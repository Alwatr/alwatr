// import {
//   customElement,
//   FiniteStateMachineController,
//   html,
//   property,
//   state,
//   UnresolvedMixin,
// } from '@alwatr/element';
// import {message} from '@alwatr/i18n';
// import {topAppBarContextProvider} from '@alwatr/pwa-helper/context.js';
// import {redirect} from '@alwatr/router';
// import {requestableContextConsumer} from '@alwatr/signal';
// import '@alwatr/ui-kit/chat/chat.js';
// import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

// import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';

// import type {AlwatrDocumentStorage} from '@alwatr/type';
// import type {Order, Product} from '@alwatr/type/customer-order-management.js';
// import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

// declare global {
//   interface HTMLElementTagNameMap {
//     'alwatr-page-order-tracking': AlwatrPageOrderDetail;
//   }
// }

// const orderStorageContextConsumer =
//   requestableContextConsumer.bind<AlwatrDocumentStorage<Order>>('order-storage-context');

// const productStorageContextConsumer =
//   requestableContextConsumer.bind<AlwatrDocumentStorage<Product>>('product-storage-tile-context');

// const buttons = {
//   backToOrderList: {
//     icon: 'arrow-back-outline',
//     flipRtl: true,
//     clickSignalId: 'order_tracking_back_to_order_list_event',
//   },
//   reload: {
//     icon: 'reload-outline',
//     flipRtl: true,
//     clickSignalId: 'order_tracking_reload_event',
//   },
// } as const;

// /**
//  * Alwatr Customer Order Management Order Tracking Page.
//  */
// @customElement('alwatr-page-order-tracking')
// export class AlwatrPageOrderDetail extends UnresolvedMixin(AlwatrOrderDetailBase) {
//   private _stateMachine = new FiniteStateMachineController(this, {
//     id: 'order_tracking_' + this.ali,
//     initial: 'pending',
//     context: {
//       orderId: <number | null> null,
//       orderStorage: <AlwatrDocumentStorage<Order> | null> null,
//       productStorage: <AlwatrDocumentStorage<Product> | null> null,
//     },
//     stateRecord: {
//       '$all': {
//         entry: (): void => {
//           this.gotState = this._stateMachine.state.target;
//         },
//         on: {},
//       },
//       'pending': {
//         entry: (): void => {
//           const orderContext = orderStorageContextConsumer.getValue();
//           const productContext = productStorageContextConsumer.getValue();
//           if (orderContext.state === 'initial') {
//             orderStorageContextConsumer.request(null);
//           }
//           if (productContext.state === 'initial') {
//             productStorageContextConsumer.request(null);
//           }
//         },
//         on: {
//           context_request_initial: {},
//           context_request_pending: {},
//           context_request_error: {
//             target: 'contextError',
//           },
//           context_request_complete: {
//             target: 'tracking',
//             condition: (): boolean => {
//               if (this.orderId == null) {
//                 this._stateMachine.transition('not_found');
//                 return false;
//               }
//               if (orderStorageContextConsumer.getValue().state === 'complete' &&
//                   productStorageContextConsumer.getValue().state === 'complete'
//               ) return true;
//               return false;
//             },
//           },
//           context_request_reloading: {
//             target: 'reloading',
//           },
//         },
//       },
//       'contextError': {
//         on: {
//           request_context: {
//             target: 'pending',
//             actions: (): void => {
//               orderStorageContextConsumer.request(null);
//               productStorageContextConsumer.request(null);
//             },
//           },
//         },
//       },
//       'tracking': {
//         on: {
//           request_context: {
//             target: 'reloading',
//             actions: (): void => {
//               orderStorageContextConsumer.request(null);
//               productStorageContextConsumer.request(null);
//             },
//           },
//           not_found: {
//             target: 'notFound',
//           },
//         },
//       },
//       'notFound': {
//         on: {},
//       },
//       'reloading': {
//         on: {
//           context_request_error: {
//             target: 'tracking',
//             actions: (): void =>
//               snackbarSignalTrigger.request({messageKey: 'fetch_failed_description'}),
//           },
//           context_request_complete: {
//             target: 'tracking',
//             condition: (): boolean => {
//               if (orderStorageContextConsumer.getValue().state === 'complete' &&
//                   productStorageContextConsumer.getValue().state === 'complete'
//               ) return true;
//               return false;
//             },
//           },
//         },
//       },
//     },
//     signalList: [
//       {
//         signalId: buttons.backToOrderList.clickSignalId,
//         actions: (): void => {redirect({sectionList: ['order-list']});},
//       },
//       {
//         signalId: buttons.reload.clickSignalId,
//         transition:
//         'request_context',
//       },
//     ]});

//   @state()
//     gotState = this._stateMachine.state.target;

//   @property({type: Number})
//   get orderId(): number {
//     return this.orderId;
//   }
//   set orderId(orderId: number) {
//     this._stateMachine.transition('context_request_complete', {orderId});
//   }

//   override connectedCallback(): void {
//     super.connectedCallback();

//     this._addSignalListener(
//         orderStorageContextConsumer.subscribe((context) => {
//           this._stateMachine.transition(`context_request_${context.state}`, {orderStorage: context.content});
//         }, {receivePrevious: 'NextCycle'}),
//     );

//     this._addSignalListener(
//         productStorageContextConsumer.subscribe((context) => {
//           this._stateMachine.transition(`context_request_${context.state}`, {productStorage: context.content});
//         }, {receivePrevious: 'NextCycle'}),
//     );
//   }

//   protected override render(): unknown {
//     this._logger.logMethod('render');

//     return this._stateMachine.render({
//       'pending': () => {
//         topAppBarContextProvider.setValue({
//           headlineKey: 'page_order_tracking_headline',
//           startIcon: buttons.backToOrderList,
//           endIconList: [buttons.reload],
//         });
//         const content: IconBoxContent = {
//           headline: message('loading'),
//           icon: 'cloud-download-outline',
//           tinted: 1,
//         };
//         return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
//       },

//       'contextError': () => {
//         topAppBarContextProvider.setValue({
//           headlineKey: 'page_order_tracking_headline',
//           startIcon: buttons.backToOrderList,
//           endIconList: [buttons.reload],
//         });
//         const content: IconBoxContent = {
//           icon: 'cloud-offline-outline',
//           tinted: 1,
//           headline: message('fetch_failed_headline'),
//           description: message('fetch_failed_description'),
//         };
//         return html`
//           <alwatr-icon-box .content=${content}></alwatr-icon-box>
//           <alwatr-button .icon=${buttons.reload.icon} .clickSignalId=${buttons.reload.clickSignalId}>
//             ${message('retry')}
//           </alwatr-button>
//         `;
//       },

//       'reloading': 'tracking',

//       'tracking': () => {
//         topAppBarContextProvider.setValue({
//           headlineKey: 'page_order_tracking_headline',
//           startIcon: buttons.backToOrderList,
//           endIconList: [{...buttons.reload, disabled: this.gotState === 'reloading'}],
//         });
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         const order = this._stateMachine.context.orderStorage!.data[this._stateMachine.context.orderId!];
//         return [
//           html`<alwatr-order-status-box .content=${order}></alwatr-order-status-box>`,
//           html`<alwatr-chat></alwatr-chat>`,
//         ];
//       },

//       'notFound': () => {
//         const content: IconBoxContent = {
//           headline: message('page_order_tracking_not_found'),
//           icon: 'close',
//           tinted: 1,
//         };
//         return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
//       },
//     });
//   }
// }
