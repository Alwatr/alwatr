import {
  customElement,
  css,
  html,
  LocalizeMixin,
  mapObject,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
  StateMachineMixin,
} from '@alwatr/element';
import {message, replaceNumber} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';

import {pageOrderListFsm} from '../../manager/controller/order-list.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

/**
 * List of all orders
 */
@customElement('alwatr-page-order-list')
export class AlwatrPageOrderList extends StateMachineMixin(
    pageOrderListFsm,
    UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))),
) {
  static override styles = css`
    :host {
      display: block;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    :host > * {
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_${this.stateMachine.gotState}`]?.();
  }

  render_loading(): unknown {
    return message('loading');
  }

  render_list(): unknown {
    // prettier-ignore
    return [
      mapObject(this, this.stateMachine.context.orderStorage?.data, (order) => {
        const content: IconBoxContent = {
          stated: true,
          tinted: 1,
          icon: 'receipt-outline',
          flipRtl: true,
          headline: message('order_item_headline').replace('${orderId}', replaceNumber(order.id.padStart(2, '0'))),
          description: message('order_item_status') + ': ' + message('order_status_' + order.status),
          href: `/order/${order.id}/tracking`,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      }),
      html`<alwatr-button
        icon="add-outline"
        signal-id="new-order-click-event"
        elevated
      >${message('new_order_button')}</alwatr-button>`,
    ];
  }
}
