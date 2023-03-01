import {
  customElement,
  css,
  html,
  StateMachineMixin,
  UnresolvedMixin,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
} from '@alwatr/element';
import {message, replaceNumber} from '@alwatr/i18n';
import '@alwatr/icon';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/chat/chat.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';

import {pageOrderTrackingFsm} from '../../manager/controller/order-tracking.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-tracking': AlwatrPageOrderTracking;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order-tracking')
export class AlwatrPageOrderTracking extends StateMachineMixin(
    pageOrderTrackingFsm,
    UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))),
) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    alwatr-chat {
      flex-grow: 1;
    }
  `;

  protected override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_${this.stateMachine.state.to}`]?.();
  }

  protected render_loading(): unknown {
    this._logger.logMethod('render_loading');
    return message('loading');
  }

  protected render_notFound(): unknown {
    this._logger.logMethod('render_notFound');
    return message('order_not_found');
  }

  protected render_reloading(): unknown {
    this._logger.logMethod('render_reloading');
    return this.render_tracking();
  }

  protected render_tracking(): unknown {
    this._logger.logMethod('render_tracking');

    // validate order id
    const order = this.stateMachine.context.orderStorage?.data[this.stateMachine.context.orderId ?? ''] ?? null;
    if (order === null) {
      this.stateMachine.transition('INVALID_ORDER');
      return;
    }

    const iconBoxContent: IconBoxContent = {
      stated: true,
      tinted: 1,
      icon: 'receipt-outline',
      flipRtl: true,
      headline: message('order_item_headline').replace(
          '${orderId}',
          replaceNumber(`${order.id}`.padStart(2, '0')),
      ),
      description: message('order_item_status') + ': ' + message('order_status_' + order.status),
      href: '/order-detail/' + order.id,
    };

    return [
      html`<alwatr-icon-box .content=${iconBoxContent}></alwatr-icon-box>`,
      html`<alwatr-chat></alwatr-chat>`,
    ];
  }
}
