import {
  customElement,
  html,
  nothing,
  StateMachineMixin,
  UnresolvedMixin,
} from '@alwatr/element';
import { message } from '@alwatr/i18n';

import {buttons, pageNewOrderStateMachine} from '../../manager/controller/new-order.js';
import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';
import '../stuff/order-shipping-form.js';
import '../stuff/select-product.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-new-order': AlwatrPageNewOrder;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-new-order')
export class AlwatrPageNewOrder extends StateMachineMixin(
    pageNewOrderStateMachine,
    UnresolvedMixin(AlwatrOrderDetailBase),
) {
  protected override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_state_${this.stateMachine.state.to}`]?.();
  }

  protected render_state_loading(): unknown {
    this._logger.logMethod('render_state_loading');
    return this.render_part_message('loading');
  }

  protected render_state_edit(): unknown {
    this._logger.logMethod('render_state_detail');
    const order = this.stateMachine.context.order;
    return [
      // this.render_part_status(order),
      this.render_part_item_list(order.itemList ?? [], this.stateMachine.context.productStorage, true),
      order.shippingInfo ? this.render_part_shipping_info(order.shippingInfo) : nothing,
      order.itemList?.length ? this.render_part_summary(order) : nothing,
      this.render_part_submit(),

    ];
  }

  protected render_state_review(): unknown {
    this._logger.logMethod('render_state_review');
    const order = this.stateMachine.context.order;
    if (!(order.itemList?.length && order.shippingInfo)) {
      this.stateMachine.transition('BACK');
      return;
    }
    // else
    return [
      this.render_part_status(order),
      this.render_part_item_list(order.itemList, this.stateMachine.context.productStorage),
      this.render_part_shipping_info(order.shippingInfo),
      this.render_part_summary(order),
      this.render_part_submit(),
    ];
  }

  protected render_state_selectProduct(): unknown {
    this._logger.logMethod('render_state_selectProduct');
    return html`<alwatr-select-product></alwatr-select-product>`;
  }

  protected render_state_shippingForm(): unknown {
    this._logger.logMethod('render_state_shippingForm');
    return html`<alwatr-page-order-shipping-form></alwatr-page-order-shipping-form>`;
  }

  protected render_state_submitting(): unknown {
    this._logger.logMethod('render_state_submitting');
    return html`render_state_submitting`;
  }

  protected render_state_submitSuccess(): unknown {
    this._logger.logMethod('render_state_submitSuccess');
    return html`render_state_submitSuccess`;
  }

  protected render_state_submitFailed(): unknown {
    this._logger.logMethod('render_state_submitFailed');
    return html`render_state_submitFailed`;
  }

  protected render_part_submit(): unknown {
    return html`
      <div class="btn-container">
      <alwatr-button
          elevated
          .icon=${buttons.editItems.icon}
          .clickSignalId=${buttons.editItems.clickSignalId}
        >${message('page_new_order_edit_items')}</alwatr-button>
        <alwatr-button
          elevated
          .icon=${buttons.submit.icon}
          .clickSignalId=${buttons.submit.clickSignalId}
          ?disabled=${!pageNewOrderStateMachine.context.order.itemList?.length}
        >${message('page_new_order_next')}</alwatr-button>
      </div>
    `;
  }
}
