import {
  customElement,
  StateMachineMixin,
  UnresolvedMixin,
} from '@alwatr/element';

import {pageOrderDetailStateMachine} from '../../manager/controller/order-detail.js';
import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-detail': AlwatrPageOrderDetail;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order-detail')
export class AlwatrPageOrderDetail extends StateMachineMixin(
    pageOrderDetailStateMachine,
    UnresolvedMixin(AlwatrOrderDetailBase),
) {
  protected override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_state_${this.stateMachine.state.target}`]?.();
  }

  protected render_state_loading(): unknown {
    this._logger.logMethod('render_state_loading');
    return this.render_part_message('loading', 'ellipsis-horizontal');
  }

  protected render_state_notFound(): unknown {
    this._logger.logMethod('render_state_notFound');
    return this.render_part_message('page_order_detail_not_found', 'close');
  }

  protected render_state_reloading(): unknown {
    this._logger.logMethod('render_state_reloading');
    return this.render_state_detail();
  }

  protected render_state_detail(): unknown {
    this._logger.logMethod('render_state_detail');

    // validate order id
    const order = this.stateMachine.context.orderStorage?.data[this.stateMachine.context.orderId ?? ''] ?? null;
    if (order === null) {
      this.stateMachine.transition('INVALID_ORDER');
      return;
    }

    return [
      this.render_part_status(order),
      this.render_part_item_list(order.itemList, this.stateMachine.context.productStorage),
      this.render_part_shipping_info(order.shippingInfo),
      this.render_part_summary(order),
    ];
  }
}
