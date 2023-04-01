import {customElement, html, property, state, UnresolvedMixin} from '@alwatr/element';
import {finiteStateMachineConsumer} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {topAppBarContextProvider} from '@alwatr/pwa-helper/context.js';

import {buttons} from '../../manager/buttons.js';
import {OrderDetailFsm} from '../../manager/controller/order-detail.js';
import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-detail': AlwatrPageOrderDetail;
  }
}

/**
 * Alwatr Customer Order Management Order Detail Page.
 */
@customElement('alwatr-page-order-detail')
export class AlwatrPageOrderDetail extends UnresolvedMixin(AlwatrOrderDetailBase) {
  protected fsm = finiteStateMachineConsumer<OrderDetailFsm>('order_detail_fsm_' + this.ali, 'order_detail_fsm');

  @state()
    gotState = this.fsm.getState().target;

  private _orderId: number | null = null;
  set orderId(orderId) {
    this._orderId = orderId;
    this.fsm.setContext({orderId: this._orderId});
  }

  @property({type: Number})
  get orderId(): number | null {
    return this._orderId;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this._addSignalListeners(this.fsm.defineSignals([
      {
        callback: (): void => {
          this.gotState = this.fsm.getState().target;
        },
        receivePrevious: 'NextCycle',
      },
      {
        signalId: buttons.reloadOrderStorage.clickSignalId,
        transition: 'context_request_complete', // FIXME: set correct transition for reloading
      },
    ]));
  }

  protected override render(): unknown {
    this._logger.logMethod('render');

    return this.fsm.render({
      pending: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_order_list_headline',
          startIcon: buttons.backToOrderList,
          endIconList: [buttons.reloadOrderStorage],
        });

        const content: IconBoxContent = {
          headline: message('loading'),
          icon: 'cloud-download-outline',
          tinted: 1,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },

      detail: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_order_list_headline',
          startIcon: buttons.backToOrderList,
          endIconList: [buttons.reloadOrderStorage],
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const order = this.fsm.getContext().orderStorage!.data[this.fsm.getContext().orderId!];
        return [
          this.render_part_status(order),
          this.render_part_item_list(order.itemList, this.fsm.getContext().productStorage),
          this.render_part_shipping_info(order.shippingInfo),
          this.render_part_summary(order),
        ];
      },

      notFound: () => {
        const content: IconBoxContent = {
          headline: message('page_order_detail_not_found'),
          icon: 'close',
          tinted: 1,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },
    });
  }
}
