import {
  customElement,
  FiniteStateMachineController,
  html,
  property,
  state,
  UnresolvedMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {topAppBarContextProvider} from '@alwatr/pwa-helper/src/context.js';
import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';
import {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import {Order, Product} from '@alwatr/type/src/customer-order-management.js';
import {IconBoxContent} from '@alwatr/ui-kit/src/card/icon-box.js';

import {fetchOrderStorage} from '../../manager/context-provider/order-storage.js';
import {fetchProductStorage} from '../../manager/context-provider/product-storage.js';
import {orderStorageContextConsumer, productStorageContextConsumer} from '../../manager/context.js';
import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-detail': AlwatrPageOrderDetail;
  }
}

const buttons = {
  backToOrderList: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'order_detail_back_to_order_list_event',
  },
  reload: {
    icon: 'reload-outline',
    flipRtl: true,
    clickSignalId: 'order_detail_reload_event',
  },
} as const;

/**
 * Alwatr Customer Order Management Order Detail Page.
 */
@customElement('alwatr-page-order-detail')
export class AlwatrPageOrderDetail extends UnresolvedMixin(AlwatrOrderDetailBase) {
  private _stateMachine = new FiniteStateMachineController(this, {
    id: 'fsm-order-detail-' + this.ali,
    initial: 'pending',
    context: {
      orderId: <number | null> null,
      orderStorage: <AlwatrDocumentStorage<Order> | null> null,
      productStorage: <AlwatrDocumentStorage<Product> | null> null,
    },
    stateRecord: {
      '$all': {
        entry: (): void => {
          this.gotState = this._stateMachine.state.target;
        },
        on: {
        },
      },
      'pending': {
        entry: (): void => {
          if (productStorageContextConsumer.getValue() == null) {
            fetchProductStorage();
          }
          if (orderStorageContextConsumer.getValue() == null) {
            fetchOrderStorage();
          }
        },
        on: {
          LOADED_SUCCESS: {
            target: 'detail',
            condition: () => {
              if (this._stateMachine.context.orderStorage == null ||
                 this._stateMachine.context.productStorage == null
              ) return false;
              return true;
            },
            actions: () => {
              if (this._stateMachine.context.orderId == null ||
                this._stateMachine.context.orderStorage?.data[this._stateMachine.context.orderId] == null
              ) this._stateMachine.transition('NOT_FOUND');
            },
          },
        },
      },
      'detail': {
        on: {
          REQUEST_UPDATE: {
            target: 'reloading',
            actions: this._requestUpdateAction,
          },
          NOT_FOUND: {
            target: 'notFound',
          },
        },
      },
      'reloading': {
        on: {
          LOADED_SUCCESS: {
            target: 'detail',
          },
          // LOAD_FAILED: {
          //   target: 'detail',
          // },
        },
      },
      'notFound': {
        on: {},
      },
    }} as const);

  @state()
    gotState = this._stateMachine.state.target;

  @property({type: Number})
  get orderId(): number {
    return this.orderId;
  }
  set orderId(orderId: number) {
    this.orderId = orderId;
    this._stateMachine.transition('LOADED_SUCCESS', {orderId});
  }

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToOrderList,
      endIconList: [buttons.reload],
    });

    this._signalListenerList.push(
        productStorageContextConsumer.subscribe((productStorage) => {
          this._stateMachine.transition('LOADED_SUCCESS', {productStorage});
        }),
    );

    this._signalListenerList.push(
        orderStorageContextConsumer.subscribe((orderStorage) => {
          this._stateMachine.transition('LOADED_SUCCESS', {orderStorage});
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.backToOrderList.clickSignalId, () => {
          redirect({sectionList: ['order-list']});
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.reload.clickSignalId, () => {
          this._stateMachine.transition('REQUEST_UPDATE');
        }),
    );
  }

  protected override render(): unknown {
    this._logger.logMethod('render');

    return this._stateMachine.render({
      'pending': () => {
        const content: IconBoxContent = {
          headline: message('loading'),
          icon: 'cloud-download-outline',
          tinted: 1,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },

      'reloading': 'detail',

      'detail': () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const order = this._stateMachine.context.orderStorage!.data[this._stateMachine.context.orderId!];
        return [
          this.render_part_status(order),
          this.render_part_item_list(order.itemList, this._stateMachine.context.productStorage),
          this.render_part_shipping_info(order.shippingInfo),
          this.render_part_summary(order),
        ];
      },

      'notFound': () => {
        const content: IconBoxContent = {
          headline: message('page_order_detail_not_found'),
          icon: 'close',
          tinted: 1,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },
    });
  }

  private async _requestUpdateAction(): Promise<void> {
    topAppBarContextProvider.setValue({
      headlineKey: 'loading',
      startIcon: buttons.backToOrderList,
      endIconList: [buttons.reload],
    });
    await fetchOrderStorage();
    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToOrderList,
      endIconList: [buttons.reload],
    });
    this._stateMachine.transition('LOADED_SUCCESS');
  }
}
