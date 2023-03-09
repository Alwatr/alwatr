import {
  customElement,
  css,
  html,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
  FiniteStateMachineController,
  state,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';
import {Order} from '@alwatr/type/customer-order-management.js';
import '@alwatr/ui-kit/button/button.js';
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

import {fetchOrderStorage} from '../../manager/context-provider/order-storage.js';
import {orderStorageContextConsumer, topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/order-list.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';

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
    clickSignalId: 'order_list_reload_click_event',
  },
  newOrder: {
    icon: 'add-outline',
    clickSignalId: 'order_list_new_order_click_event',
  },
  orderDetail: {
    clickSignalId: 'order_list_order_detail_click_event',
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
        entry: () => {
          this.gotState = this._stateMachine.state.target;
        },
        on: {
        },
      },
      pending: {
        entry: () => {
          this._logger.logMethod('state.pending.entry');
          if (orderStorageContextConsumer.getValue() == null) {
            fetchOrderStorage();
          }
          if (this._stateMachine.context.orderStorage != null) {
            this._stateMachine.transition('LOADED_SUCCESS');
          }
        },
        on: {
          LOADED_SUCCESS: {
            target: 'list',
          },
        },
      },
      list: {
        on: {
          REQUEST_UPDATE: {
            target: 'reloading',
            actions: this._requestUpdateAction,
          },
        },
      },
      reloading: {
        on: {
          LOADED_SUCCESS: {
            target: 'list',
          },
          // LOAD_FAILED: {
          //   target: 'list',
          // },
        },
      },
    },
    // signalRecord: {
    //   'order_list_reload': {
    //     translate: 'REQUEST_UPDATE'
    //   }
    // },
  } as const);

  @state()
    gotState = this._stateMachine.state.target;

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToHome,
      endIconList: [buttons.newOrder, buttons.reload],
    });

    this._signalListenerList.push(
        orderStorageContextConsumer.subscribe((orderStorage) => {
          this._stateMachine.transition('LOADED_SUCCESS', {orderStorage});
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.reload.clickSignalId, () => {
          this._stateMachine.transition('REQUEST_UPDATE');
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.newOrder.clickSignalId, () => {
          redirect({
            sectionList: ['new-order'],
          });
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType<Order>>(buttons.orderDetail.clickSignalId, (event) => {
          redirect({
            sectionList: ['order-detail', event.detail.id],
          });
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
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

  private async _requestUpdateAction(): Promise<void> {
    topAppBarContextProvider.setValue({
      headlineKey: 'loading',
      startIcon: buttons.backToHome,
      endIconList: [buttons.newOrder, buttons.reload],
    });
    await fetchOrderStorage();
    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToHome,
      endIconList: [buttons.newOrder, buttons.reload],
    });
    this._stateMachine.transition('LOADED_SUCCESS');
  }
}
