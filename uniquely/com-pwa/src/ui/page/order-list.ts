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
  ScheduleUpdateToFrameMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {requestableContextConsumer} from '@alwatr/signal';
import {Order} from '@alwatr/type/customer-order-management.js';
import '@alwatr/ui-kit/button/button.js';
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/order-list.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

const buttons = {
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

const orderStorageContextConsumer =
  requestableContextConsumer.bind<AlwatrDocumentStorage<Order>>('order-storage-context');

/**
 * List of all orders.
 */
@customElement('alwatr-page-order-list')
export class AlwatrPageOrderList extends ScheduleUpdateToFrameMixin(
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

    :host([state='reloading']) alwatr-order-list {
      opacity: var(--sys-surface-disabled-opacity);
    }
  `;

  private _stateMachine = new FiniteStateMachineController(this, {
    id: 'order_list_' + this.ali,
    initial: 'pending',
    context: {
      orderStorage: <AlwatrDocumentStorage<Order> | null>null,
    },
    stateRecord: {
      $all: {
        entry: (): void => {
          this.gotState = this._stateMachine.state.target;
        },
        on: {},
      },
      pending: {
        entry: (): void => {
          const orderContext = orderStorageContextConsumer.getValue();
          if (orderContext.state === 'initial') {
            orderStorageContextConsumer.request(null);
          }
        },
        on: {
          context_request_initial: {},
          context_request_pending: {},
          context_request_error: {
            target: 'contextError',
          },
          context_request_complete: {
            target: 'list',
          },
          context_request_reloading: {
            target: 'reloading',
          },
        },
      },
      contextError: {
        on: {
          request_context: {
            target: 'pending',
            actions: (): void => orderStorageContextConsumer.request(null),
          },
        },
      },
      list: {
        on: {
          request_context: {
            target: 'reloading',
            actions: (): void => orderStorageContextConsumer.request(null),
          },
        },
      },
      reloading: {
        on: {
          context_request_error: {
            target: 'list',
            actions: (): void =>
              snackbarSignalTrigger.request({
                messageKey: 'fetch_failed_description',
              }),
          },
          context_request_complete: {
            target: 'list',
          },
        },
      },
    },
    signalList: [
      {
        signalId: buttons.reload.clickSignalId,
        transition: 'request_context',
      },
      {
        signalId: buttons.newOrder.clickSignalId,
        actions: (): void => {
          redirect({
            sectionList: ['new-order'],
          });
        },
      },
      {
        signalId: buttons.orderDetail.clickSignalId,
        actions: (event: ClickSignalType<Order>): void => {
          redirect({sectionList: ['order-detail', event.detail.id]});
        },
      },
    ],
  });

  @state()
    gotState = this._stateMachine.state.target;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        orderStorageContextConsumer.subscribe(
            (context) => {
              this._stateMachine.transition(`context_request_${context.state}`, {orderStorage: context.content});
            },
            {receivePrevious: 'NextCycle'},
        ),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return this._stateMachine.render({
      pending: () => {
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
      },

      contextError: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_order_list_headline',
          startIcon: buttons.backToHome,
          endIconList: [buttons.reload],
        });
        const content: IconBoxContent = {
          icon: 'cloud-offline-outline',
          tinted: 1,
          headline: message('fetch_failed_headline'),
          description: message('fetch_failed_description'),
        };
        return html`
          <alwatr-icon-box .content=${content}></alwatr-icon-box>
          <alwatr-button .icon=${buttons.reload.icon} .clickSignalId=${buttons.reload.clickSignalId}>
            ${message('retry')}
          </alwatr-button>
        `;
      },

      reloading: 'list',

      list: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_order_list_headline',
          startIcon: buttons.backToHome,
          endIconList: [buttons.newOrder, {...buttons.reload, disabled: this.gotState === 'reloading'}],
        });
        return html`<alwatr-order-list
          .content=${this._stateMachine.context.orderStorage}
          .orderClickSignalId=${buttons.orderDetail.clickSignalId}
        ></alwatr-order-list>`;
      },
    });
  }
}
