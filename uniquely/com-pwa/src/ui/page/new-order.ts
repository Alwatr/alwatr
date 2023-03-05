import {
  customElement,
  html,
  StateMachineMixin,
  UnresolvedMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {IconBoxContent} from '@alwatr/ui-kit/src/card/icon-box.js';

import {buttons, pageNewOrderStateMachine} from '../../manager/controller/new-order.js';
import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';
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
      this.render_part_btn_product(),
      this.render_part_shipping_info(order.shippingInfo),
      this.render_part_btn_shipping_edit(),
      this.render_part_summary(order),
      this.render_part_btn_submit(),
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
      this.render_part_btn_final_submit(),
    ];
  }

  protected render_state_selectProduct(): unknown {
    this._logger.logMethod('render_state_selectProduct');
    return html`<alwatr-select-product></alwatr-select-product>`;
  }

  protected render_state_shippingForm(): unknown {
    this._logger.logMethod('render_state_shippingForm');
    const order = this.stateMachine.context.order;
    return [
      this.render_part_item_list(order.itemList ?? [], this.stateMachine.context.productStorage, false),
      this.render_part_shipping_form(),
      this.render_part_btn_shipping_submit(),
    ];
  }

  protected render_state_submitting(): unknown {
    this._logger.logMethod('render_state_submitting');
    return this.render_part_message('page_new_order_submitting_message');
  }

  protected render_state_submitSuccess(): unknown {
    this._logger.logMethod('render_state_submitSuccess');
    const content: IconBoxContent = {
      headline: message('page_new_order_submit_success_message'),
      icon: 'checkmark-done',
      elevated: 1,
    };
    return [
      html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`,
      this.render_part_btn_submit_success(),
    ];
  }

  protected render_state_submitFailed(): unknown {
    this._logger.logMethod('render_state_submitFailed');
    const content: IconBoxContent = {
      headline: message('page_new_order_submit_failed_message'),
      icon: 'close',
      elevated: 1,
    };
    return [
      html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`,
      this.render_part_btn_submit_failed(),
    ];
  }

  protected render_part_btn_product(): unknown {
    return html`<div class="btn-container">
      <alwatr-button
        .icon=${buttons.editItems.icon}
        .clickSignalId=${buttons.editItems.clickSignalId}
      >${message('page_new_order_edit_items')}</alwatr-button>
    </div>`;
  }

  protected render_part_btn_shipping_edit(): unknown {
    return html`<div class="btn-container">
      <alwatr-button
        .icon=${buttons.editShippingForm.icon}
        .clickSignalId=${buttons.editShippingForm.clickSignalId}
      >${message('page_new_order_shipping_edit')}</alwatr-button>
    </div>`;
  }

  protected render_part_btn_shipping_submit(): unknown {
    return html`<div class="btn-container">
      <alwatr-button
        .icon=${buttons.submitShippingForm.icon}
        .clickSignalId=${buttons.submitShippingForm.clickSignalId}
      >${message('page_new_order_shipping_submit')}</alwatr-button>
    </div>`;
  }

  protected render_part_btn_submit(): unknown {
    return html`
      <div class="submit-container">
        <alwatr-button
          .icon=${buttons.submit.icon}
          .clickSignalId=${buttons.submit.clickSignalId}
          ?disabled=${!pageNewOrderStateMachine.context.order.itemList?.length}
        >${message('page_new_order_submit')}</alwatr-button>
      </div>
    `;
  }

  protected render_part_btn_submit_success(): unknown {
    return html`
      <div class="submit-container">
        <alwatr-button
          .icon=${buttons.detail.icon}
          .clickSignalId=${buttons.detail.clickSignalId}
        >${message('page_new_order_detail_button')}</alwatr-button>
        <!-- <alwatr-button
          .icon=${buttons.tracking.icon}
          .clickSignalId=${buttons.tracking.clickSignalId}
        >${message('page_new_order_tracking_button')}</alwatr-button> -->
        <alwatr-button
          .icon=${buttons.newOrder.icon}
          .clickSignalId=${buttons.newOrder.clickSignalId}
        >${message('page_new_order_headline')}</alwatr-button>
      </div>
    `;
  }

  protected render_part_btn_submit_failed(): unknown {
    return html`
      <div class="submit-container">
        <alwatr-button
          .icon=${buttons.retry.icon}
          .clickSignalId=${buttons.retry.clickSignalId}
        >${message('page_new_order_retry_button')}</alwatr-button>
      </div>
    `;
  }

  protected render_part_btn_final_submit(): unknown {
    return html`
      <div class="submit-container">
        <alwatr-button
          .icon=${buttons.submitFinal.icon}
          .clickSignalId=${buttons.submitFinal.clickSignalId}
        >${message('page_new_order_submit_final')}</alwatr-button>
      </div>
    `;
  }
}
