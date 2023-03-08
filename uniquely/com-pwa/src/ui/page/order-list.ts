import {
  customElement,
  css,
  html,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
  FiniteStateMachineController,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {Order} from '@alwatr/type/src/customer-order-management.js';
import '@alwatr/ui-kit/button/button.js';
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

import {fetchOrderStorage} from '../../manager/context-provider/order-storage.js';
import {orderStorageContextConsumer, topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/order-list.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

export const buttons = {
  backToHome: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'back_to_home_click_event',
  },
  reload: {
    icon: 'reload-outline',
    // flipRtl: true,
    clickSignalId: 'config.id' + '_reload_click_event',
  },
  newOrder: {
    icon: 'add-outline',
    clickSignalId: 'config.id' + '_new_order_click_event',
  },
  orderDetail: {
    clickSignalId: 'config.id' + '_order_detail_click_event',
  },
} as const;

/**
 * List of all orders.
 */
@customElement('alwatr-page-order-list')
export class AlwatrPageOrderList extends UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))) {
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

  private _stateMachine = new FiniteStateMachineController(this, {
    id: 'fsm-order-list-' + this.ali,
    initial: 'pending',
    context: {
      orderStorage: <AlwatrDocumentStorage<Order> | null>null,
    },
    stateRecord: {
      $all: {
        on: {
        },
      },
      pending: {
        on: {
          CONTEXT_LOADED: 'list',
        },
      },
      list: {
        on: {
          REQUEST_UPDATE: 'reloading',
        },
      },
      reloading: {
        on: {
          CONTEXT_LOADED: 'list',
        },
      },
    },
  } as const);

  stateUpdate(): void {
    this.requestUpdate();
  }

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToHome,
      endIconList: [buttons.newOrder, buttons.reload],
    });

    if (orderStorageContextConsumer.getValue() == null) {
      fetchOrderStorage();
    }
  }

  override render(): unknown {
    this._logger.logMethod('render');
    this._stateMachine.state.target;
    return this._stateMachine.render({
      'pending': () => {
        const content: IconBoxContent = {
          tinted: 1,
          icon: 'cloud-download-outline',
          headline: message('loading'),
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },

      'reloading': 'list',

      'list': () => {
        return html`<alwatr-order-list
          .content=${this._stateMachine.context.orderStorage}
          .orderClickSignalId=${buttons.orderDetail.clickSignalId}
        ></alwatr-order-list>`;
      },
    });
  }
}
