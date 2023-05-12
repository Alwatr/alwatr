import {serverContextConsumer} from '@alwatr/context';
import {
  customElement,
  AlwatrBaseElement,
  html,
  property,
  css,
  SignalMixin,
  LocalizeMixin,
  type PropertyValues,
  mapObject,
  when,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {simpleHashNumber} from '@alwatr/math';
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import {IconButtonContent} from '@alwatr/ui-kit/src/button/icon-button.js';

import {config} from '../../config.js';
import {buttons} from '../../manager/buttons.js';
import {userTokenContextConsumer} from '../../manager/context-provider/user.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ComUser, Order} from '@alwatr/type/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-user-info-box': AlwatrUserInfoBox;
  }
}

/**
 * Alwatr User Item Box Element.
 */
@customElement('alwatr-user-info-box')
export class AlwatrUserInfoBox extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
    }

    :host([state='reloading']) {
      opacity: var(--sys-surface-reloading-opacity);
    }
  `;

  @property({attribute: false})
    user: Partial<ComUser> = {};

  protected userToken = userTokenContextConsumer.getValue();

  protected orderListStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<Order>>(
      'order_list_storage_context_' + this.user.id,
      {
        url: config.serverContext.userOrderList,
      },
  );

  override connectedCallback(): void {
    // prettier-ignore
    this._addSignalListeners(this.orderListStorageContextConsumer.subscribe(() => {
      const fsmStorageState = this.orderListStorageContextConsumer.getState().target;
      const hasReloadingAttribute = this.hasAttribute('reloading');

      if ((fsmStorageState === 'complete' || fsmStorageState === 'reloadingFailed') && hasReloadingAttribute) {
        this.removeAttribute('reloading');
        return;
      }

      if (fsmStorageState === 'reloading' && !hasReloadingAttribute) {
        this.setAttribute('reloading', '');
      }
    }, {receivePrevious: 'NextCycle'}));
  }

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this.user != null;
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    return this.orderListStorageContextConsumer.fsm.render({
      initial: 'onlineLoading',
      offlineLoading: 'onlineLoading',
      onlineLoading: () => {
        const content: IconBoxContent = {
          tinted: 1,
          icon: 'cloud-download-outline',
          headline: message('loading'),
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },
      loadingFailed: () => {
        const content: IconBoxContent = {
          icon: 'cloud-offline-outline',
          tinted: 1,
          headline: message('fetch_failed_headline'),
          description: message('fetch_failed_description'),
        };
        return html`
          <alwatr-icon-box .content=${content}></alwatr-icon-box>
          <div>
            <alwatr-button .content=${buttons.retry}></alwatr-button>
          </div>
        `;
      },
      reloadingFailed: this._renderReloadingFailed,
      reloading: 'complete',
      complete: this._renderUserOrders,
    });
  }

  private _renderUserOrders(): unknown {
    this._logger.logMethod?.('_renderUserOrders');

    return html`
      <div class="user-info-section">${this._renderUserInfo()}</div>
      <div class="orders-section">
        ${mapObject(
      this,
      this.orderListStorageContextConsumer.getResponse()?.data,
      (order) => html`<alwatr-order-status-box .content=${order}></alwatr-order-status-box>`,
  )}
      </div>
    `;
  }

  private _renderUserInfo(): unknown {
    this._logger.logMethod?.('_renderUserInfo');

    const userProfileIconButton: IconButtonContent = {
      icon: 'person-circle-outline',
    };

    return html`
      <alwatr-icon-box .content=${userProfileIconButton}></alwatr-icon-box>
      <span>${this.user!.fullName}</span>
      <span>${this.user!.phoneNumber}</span>
      <span>${this.user!.province}${this.user!.city}</span>
      ${when(this.orderListStorageContextConsumer.getState().target !== 'complete', () => html`...`)}
      ${when(
      this.orderListStorageContextConsumer.getState().target === 'complete',
      () => html`<span>${Object.keys(this.orderListStorageContextConsumer.getResponse()?.data ?? {}).length}</span>`,
  )}
    `;
  }

  private _renderReloadingFailed(): unknown {
    this._logger.logMethod?.('_renderReloadingFailed');
    return html`<alwatr-surface tinted> ${message('user_order_list_reloading_failed')} </alwatr-surface>`;
  }
}
