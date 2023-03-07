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
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

import {pageOrderListStateMachine, buttons} from '../../manager/controller/order-list.js';
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
    pageOrderListStateMachine,
    UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))),
) {
  static override styles = css`
    :host {
      display: block;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    alwatr-order-list {
      transform: opacity var(--sys-motion-duration-small);
    }

    :host([state=reloading]) alwatr-order-list {
      opacity: var(--sys-surface-disabled-opacity);
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_state_${this.stateMachine.state.to}`]?.();
  }

  render_state_loading(): unknown {
    this._logger.logMethod('render_state_loading');
    return this.render_part_message('loading', 'cloud-download-outline');
  }

  render_state_reloading(): unknown {
    this._logger.logMethod('render_state_reloading');
    return this.render_state_list();
  }

  render_state_list(): unknown {
    this._logger.logMethod('render_state_list');
    return html`<alwatr-order-list
      .content=${this.stateMachine.context.orderStorage}
      .orderClickSignalId=${buttons.orderDetail.clickSignalId}
    ></alwatr-order-list>`;
  }

  protected render_part_message(key: string, icon: string): unknown {
    this._logger.logMethod('render_part_message');
    const content: IconBoxContent = {
      headline: message(key),
      icon: icon,
      tinted: 1,
    };

    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }
}
