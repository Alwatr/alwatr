import {
  customElement,
  css,
  html,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
  state,
  ScheduleUpdateToFrameMixin,
  guard,
  repeat,
  type PropertyValues,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';

import {buttons} from '../../manager/buttons.js';
import {orderStorageContextConsumer} from '../../manager/context-provider/order-storage.js';
import {topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/order-status-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

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
      box-sizing: border-box;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      min-height: 100%;
      transform: opacity var(--sys-motion-duration-small);
    }

    :host([state='reloading']) {
      opacity: var(--sys-surface-reloading-opacity);
    }

    alwatr-order-status-box {
      margin-bottom: var(--sys-spacing-track);
    }

    .reloadingFailed {
      margin-bottom: var(--sys-spacing-track);
    }

    :host(:not([state='reloadingFailed'])) .reloadingFailed {
      display: none;
    }
  `;

  @state()
    gotState = orderStorageContextConsumer.getState().target;

  override connectedCallback(): void {
    super.connectedCallback();

    // prettier-ignore
    this._addSignalListeners(orderStorageContextConsumer.subscribe(() => {
      this.gotState = orderStorageContextConsumer.getState().target;
    }, {receivePrevious: 'NextCycle'}));
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('gotState')) {
      this.setAttribute('state', this.gotState);
    }
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return orderStorageContextConsumer.fsm.render({
      initial: 'onlineLoading',
      offlineLoading: 'onlineLoading',
      onlineLoading: () => {
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

      loadingFailed: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_order_list_headline',
          startIcon: buttons.backToHome,
          endIconList: [buttons.reloadOrderStorage],
        });
        const content: IconBoxContent = {
          icon: 'cloud-offline-outline',
          tinted: 1,
          headline: message('fetch_failed_headline'),
          description: message('fetch_failed_description'),
        };
        return html`
          <alwatr-icon-box .content=${content}></alwatr-icon-box>
          <alwatr-button .content=${buttons.retry}></alwatr-button>
        `;
      },

      reloadingFailed: 'complete',
      reloading: 'complete',
      complete: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_order_list_headline',
          startIcon: buttons.backToHome,
          endIconList: [buttons.newOrder, {...buttons.reloadOrderStorage, disabled: this.gotState === 'reloading'}],
        });
        return [
          this.reloadingFailedTemplate(),
          guard(orderStorageContextConsumer.getResponse()?.meta.lastUpdated, () => this.orderListTemplate()),
        ];
      },
    });
  }

  private orderListTemplate(): unknown {
    this._logger.logMethod('orderListTemplate');
    const orderStorage = orderStorageContextConsumer.getResponse();
    if (orderStorage == null) return;
    const orderList = Object.values(orderStorage.data)
        .sort(
            (o1, o2) => (o2.meta?.updated || 0) - (o1.meta?.updated || 0),
        )
        .slice(0, 15);
    return repeat(orderList, (order) => order.id, (order) => {
      return html`<alwatr-order-status-box
        .content=${order}
        .clickSignalId=${buttons.showOrderDetail.clickSignalId}
      ></alwatr-order-status-box>`;
    });
  }

  private reloadingFailedTemplate(): unknown {
    return html`<alwatr-surface tinted class="reloadingFailed">
      ${message('page_order_list_reloading_failed')}
    </alwatr-surface>`;
  }
}
