import {customElement, html, property, PropertyValues, state, UnresolvedMixin} from '@alwatr/element';
import {finiteStateMachineConsumer} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import '@alwatr/ui-kit/card/icon-box.js';


import {buttons} from '../../manager/buttons.js';
import {scrollToTopCommand, topAppBarContextProvider} from '../../manager/context.js';
import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';
import '../stuff/select-product.js';

import type {NewOrderFsm} from '../../manager/controller/new-order.js';
import type {Order, OrderShippingInfo} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-new-order': AlwatrPageNewOrder;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-new-order')
export class AlwatrPageNewOrder extends UnresolvedMixin(AlwatrOrderDetailBase) {
  protected fsm = finiteStateMachineConsumer<NewOrderFsm>('new_order_fsm_' + this.ali, 'new_order_fsm');

  @state()
    gotState = this.fsm.getState().target;

  set orderId(orderId: string) {
    this.fsm.transition('change_order_id', {orderId});
  }

  @property({type: String})
  get orderId(): string {
    return this.fsm.getContext().orderId;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this._addSignalListeners(this.fsm.defineSignals([
      {
        callback: (): void => {
          const state = this.fsm.getState();
          this.gotState = state.target;
          if (state.by === 'request_update') {
            this.requestUpdate();
          }
        },
        receivePrevious: 'NextCycle',
      },
      {
        signalId: buttons.submit.clickSignalId,
        transition: 'submit',
      },
      {
        signalId: buttons.submitShippingForm.clickSignalId,
        transition: 'submit',
      },
      {
        signalId: buttons.selectProductSubmit.clickSignalId,
        transition: 'submit',
      },
      {
        signalId: buttons.editOrder.clickSignalId,
        transition: 'back',
      },
      {
        signalId: buttons.submitFinal.clickSignalId,
        transition: 'final_submit',
      },
      {
        signalId: buttons.editItems.clickSignalId,
        transition: 'select_product',
      },
      {
        signalId: buttons.retry.clickSignalId,
        transition: 'retry',
      },
      {
        signalId: buttons.editShippingForm.clickSignalId,
        transition: 'edit_shipping',
      },
      {
        signalId: buttons.showRegisteredOrderDetail.clickSignalId,
        callback: (): void => {
          redirect({sectionList: ['order-detail', this.fsm.getContext().orderId ?? '']});
        },
      },
      {
        signalId: buttons.backToOrderList.clickSignalId,
        callback: (): void => redirect({sectionList: ['order-list']}),
      },
      {
        signalId: buttons.newOrder.clickSignalId,
        callback: (): void => {
          this.fsm.transition('new_order');
        },
      },
    ]));
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('gotState')) {
      scrollToTopCommand.request({smooth: true});
    }
  }

  protected override render(): unknown {
    this._logger.logMethod?.('render');
    return this.fsm.render({
      routing: 'pending',
      pending: this._render_pending,
      notFound: this._render_notFound,
      orderDetail: this._render_orderDetail,
      newOrder: this._render_newOrder,
      contextError: this._render_contextError,
      selectProduct: this._render_selectProduct,
      shippingForm: this._render_shippingForm,
      review: this._render_review,
      submitting: this._render_submitting,
      submitSuccess: this._render_submitSuccess,
      submitFailed: this._render_submitFailed,
    }, this);
  }

  protected _render_notFound(): unknown {
    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToOrderList,
    });
    const content: IconBoxContent = {
      headline: message('page_order_detail_not_found'),
      icon: 'close',
      tinted: 1,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _render_orderDetail(): unknown {
    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToOrderList,
      endIconList: [buttons.print, buttons.reload],
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const order = this.fsm.getContext().orderStorage!.data[this.fsm.getContext().orderId];
    return html`
      ${this.render_part_status(order)}
      ${this.render_part_item_list(order.itemList, this.fsm.getContext().productStorage)}
      ${this.render_part_shipping_info(order.shippingInfo)}
      ${this.render_part_summary(order)}
    `;
  }

  protected _render_newOrder(): unknown {
    topAppBarContextProvider.setValue({
      headlineKey: 'page_new_order_headline',
      startIcon: buttons.backToHome,
    });
    const order = this.fsm.getContext().newOrder;

    return html`
      ${this.render_part_item_list(order.itemList ?? [], this.fsm.getContext().productStorage, true)}
      <div class="btn-container">
        <alwatr-button .content=${buttons.editItems}></alwatr-button>
      </div>
      ${this.render_part_shipping_info(order.shippingInfo)}
      <div class="btn-container">
        <alwatr-button .content=${buttons.editShippingForm}></alwatr-button>
      </div>
      ${this.render_part_summary(order)}
      <div class="submit-container">
        <alwatr-button .content=${buttons.submit}></alwatr-button>
      </div>
    `;
  }

  protected _render_contextError(): unknown {
    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToHome,
    });
    const content: IconBoxContent = {
      icon: 'cloud-offline-outline',
      tinted: 1,
      headline: message('fetch_failed_headline'),
      description: message('fetch_failed_description'),
    };

    return html`
      <alwatr-icon-box .content=${content}></alwatr-icon-box>
      <alwatr-button .icon=${buttons.retry.icon} .clickSignalId=${buttons.retry.clickSignalId}>
        ${message('retry')}
      </alwatr-button>
    `;
  }

  protected _render_selectProduct(): unknown {
    topAppBarContextProvider.setValue({
      headlineKey: 'page_new_order_headline',
      startIcon: buttons.backToHome,
    });

    return html`
      <alwatr-select-product
        .order=${this.fsm.getContext().newOrder}
        .productStorage=${this.fsm.getContext().productStorage}
        .finalPriceStorage=${this.fsm.getContext().finalPriceStorage}
        .priceStorage=${this.fsm.getContext().priceStorage}
      ></alwatr-select-product>
      <div class="btn-container">
        <alwatr-button .content=${buttons.selectProductSubmit} elevated></alwatr-button>
      </div>
    `;
  }

  protected _render_shippingForm(): unknown {
    const order = this.fsm.getContext().newOrder;
    return html`
      ${this.render_part_item_list(order.itemList ?? [], this.fsm.getContext().productStorage, false)}
      ${this.render_part_shipping_form(order.shippingInfo as Partial<OrderShippingInfo>)}
      <div class="btn-container">
        <alwatr-button .content=${buttons.submitShippingForm}></alwatr-button>
      </div>
    `;
  }

  protected _render_review(): unknown {
    const order = this.fsm.getContext().newOrder as Order;
    return html`
      ${this.render_part_status(order)}
      ${this.render_part_item_list(order.itemList, this.fsm.getContext().productStorage)}
      ${this.render_part_shipping_info(order.shippingInfo)}
      ${this.render_part_summary(order)}
      <div class="submit-container">
        <alwatr-button .content=${buttons.editOrder}></alwatr-button>
        <alwatr-button .content=${buttons.submitFinal}></alwatr-button>
      </div>
    `;
  }

  protected _render_submitting(): unknown {
    const content: IconBoxContent = {
      headline: message('page_new_order_submitting_message'),
      icon: 'cloud-upload-outline',
      tinted: 1,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _render_submitSuccess(): unknown {
    const content: IconBoxContent = {
      headline: message('page_new_order_submit_success_message'),
      icon: 'cloud-done-outline',
      tinted: 1,
    };
    return html`
      <alwatr-icon-box .content=${content}></alwatr-icon-box>
      <div class="submit-container">
        <alwatr-button .content=${buttons.showRegisteredOrderDetail}></alwatr-button>
        <alwatr-button .content=${buttons.newOrder}>${message('page_new_order_headline')}</alwatr-button>
      </div>
    `;
  }

  protected _render_submitFailed(): unknown {
    const content: IconBoxContent = {
      headline: message('page_new_order_submit_failed_message'),
      icon: 'cloud-offline-outline',
      tinted: 1,
    };
    return html`
      <alwatr-icon-box .content=${content}></alwatr-icon-box>
      <div class="submit-container">
        <alwatr-button .content=${buttons.retry}></alwatr-button>
      </div>
    `;
  }

  protected _render_pending(): unknown {
    topAppBarContextProvider.setValue({
      headlineKey: 'loading',
      startIcon: buttons.backToHome,
    });

    const content: IconBoxContent = {
      tinted: 1,
      icon: 'cloud-download-outline',
      headline: message('loading'),
    };

    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }
}
