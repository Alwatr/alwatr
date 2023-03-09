import {
  customElement,
  css,
  html,
  UnresolvedMixin,
  AlwatrBaseElement,
  FiniteStateMachineController,
  state,
  property,
  SignalMixin,
  LocalizeMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/icon';
import {topAppBarContextProvider} from '@alwatr/pwa-helper/context.js';
import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';
import '@alwatr/ui-kit/button/button.js';
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/chat/chat.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';

import {fetchOrderStorage} from '../../manager/context-provider/order-storage.js';
import {orderStorageContextConsumer} from '../../manager/context.js';
import '../stuff/order-status-box.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-tracking': AlwatrPageOrderTracking;
  }
}

const buttons = {
  backToOrderList: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'order_tracking_back_to_order_list_event',
  },
  reload: {
    icon: 'reload-outline',
    flipRtl: true,
    clickSignalId: 'order_tracking_reload_event',
  },
} as const;


/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order-tracking')
export class AlwatrPageOrderTracking extends UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))) {
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

  private _stateMachine = new FiniteStateMachineController(this, {
    id: 'fsm-order-tracking-' + this.ali,
    initial: 'pending',
    context: {
      orderId: <number | null> null,
      orderStorage: <AlwatrDocumentStorage<Order> | null> null,
    },
    stateRecord: {
      '$all': {
        entry: () => {
          this.gotState = this._stateMachine.state.target;
        },
        on: {},
      },
      'pending': {
        entry: () => {
          if (orderStorageContextConsumer.getValue() == null) fetchOrderStorage();
        },
        on: {
          LOADED_SUCCESS: {
            target: 'tracking',
            condition: () => {
              if (this._stateMachine.context.orderStorage == null) return false;
              return true;
            },
            actions: () => {
              if (this._stateMachine.context.orderId == null ||
              this._stateMachine.context.orderStorage?.data[this._stateMachine.context.orderId] == null
              ) this._stateMachine.transition('NOT_FOUND');
            },
          },
        },
      },
      'tracking': {
        on: {
          REQUEST_UPDATE: {
            target: 'reloading',
            actions: this._requestUpdateAction,
          },
          NOT_FOUND: {
            target: 'notFound',
          },
        },
      },
      'reloading': {
        on: {
          LOADED_SUCCESS: {
            target: 'tracking',
          },
        // LOAD_FAILED: {
        //   target: 'tracking',
        // },
        },
      },
      'notFound': {
        on: {},
      },
    }} as const);

  @state()
    gotState = this._stateMachine.state.target;

  @property({type: Number})
  get orderId(): number {
    return this.orderId;
  }
  set orderId(orderId: number) {
    this._stateMachine.transition('LOADED_SUCCESS', {orderId});
  }

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_tracking_headline',
      startIcon: buttons.backToOrderList,
      endIconList: [buttons.reload],
    });

    this._signalListenerList.push(
        orderStorageContextConsumer.subscribe((orderStorage) => {
          this._stateMachine.transition('LOADED_SUCCESS', {orderStorage});
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.backToOrderList.clickSignalId, () => {
          redirect({sectionList: ['order-list']});
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.reload.clickSignalId, () => {
          this._stateMachine.transition('REQUEST_UPDATE');
        }),
    );
  }


  protected override render(): unknown {
    this._logger.logMethod('render');
    return this._stateMachine.render({
      pending: () => {
        const content: IconBoxContent = {
          headline: message('loading'),
          icon: 'cloud-download-outline',
          tinted: 1,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },

      reloading: 'tracking',

      tracking: () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const order = this._stateMachine.context.orderStorage!.data[this._stateMachine.context.orderId!];
        return [
          html`<alwatr-order-status-box .content=${order}></alwatr-order-status-box>`,
          html`<alwatr-chat></alwatr-chat>`,
        ];
      },

      notFound: () => {
        const content: IconBoxContent = {
          headline: message('page_order_detail_not_found'),
          icon: 'close',
          tinted: 1,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },
    });
  }

  private async _requestUpdateAction(): Promise<void> {
    topAppBarContextProvider.setValue({
      headlineKey: 'loading',
      startIcon: buttons.backToOrderList,
      endIconList: [buttons.reload],
    });
    await fetchOrderStorage();
    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_tracking_headline',
      startIcon: buttons.backToOrderList,
      endIconList: [buttons.reload],
    });
    this._stateMachine.transition('LOADED_SUCCESS');
  }
}
