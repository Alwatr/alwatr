import {
  customElement,
  css,
  html,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
  StateMachineMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';

import {pageOrderListFsm} from '../../manager/controller/order-list.js';
import '../stuff/order-list.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

/**
 * List of all orders.
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
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_state_${this.stateMachine.state.to}`]?.();
  }

  render_state_loading(): unknown {
    this._logger.logMethod('render_state_loading');
    return message('loading');
  }

  render_state_reloading(): unknown {
    this._logger.logMethod('render_state_reloading');
    return this.render_state_list();
  }

  render_state_list(): unknown {
    this._logger.logMethod('render_state_list');
    const gotState = this.stateMachine.state.to;

    return html`<alwatr-order-list .storage=${this.stateMachine.context.orderStorage}></alwatr-order-list>
        <div>
          <alwatr-button
            .icon=${'reload-outline'}
            signal-id="page_order_list_reload_click_event"
            elevated
            ?disabled=${gotState === 'reloading'}
          >${message(gotState === 'reloading' ? 'loading' : 'reload')}</alwatr-button>
          <alwatr-button
            .icon=${'add-outline'}
            signal-id="new_order_click_event"
            elevated
          >${message('new_order_button')}</alwatr-button>
        </div>
      `;
  }
}
