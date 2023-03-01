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
import {message} from '@alwatr/i18n';
import '@alwatr/icon';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/chat/chat.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';

import {pageOrderTrackingFsm} from '../../manager/controller/order-tracking.js';
import '../stuff/order-status-box.js';

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

    alwatr-order-status-box {
      margin-bottom: var(--sys-spacing-track);
    }

    alwatr-chat {
      flex-grow: 1;
    }
  `;

  protected override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_state_${this.stateMachine.state.to}`]?.();
  }

  protected render_state_loading(): unknown {
    this._logger.logMethod('render_state_loading');
    return message('loading');
  }

  protected render_state_notFound(): unknown {
    this._logger.logMethod('render_state_notFound');
    return message('order_not_found');
  }

  protected render_state_reloading(): unknown {
    this._logger.logMethod('render_state_reloading');
    return this.render_state_tracking();
  }

  protected render_state_tracking(): unknown {
    this._logger.logMethod('render_state_tracking');

    // validate order id
    const order = this.stateMachine.context.orderStorage?.data[this.stateMachine.context.orderId ?? ''] ?? null;
    if (order === null) {
      this.stateMachine.transition('INVALID_ORDER');
      return;
    }

    return [
      html`<alwatr-order-status-box .content=${order}></alwatr-order-status-box>`,
      html`<alwatr-chat></alwatr-chat>`,
    ];
  }
}
