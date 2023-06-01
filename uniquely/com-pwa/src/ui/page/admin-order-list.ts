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
  when,
  mapIterable,
  type PropertyValues,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {eventListener} from '@alwatr/signal';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';

import {buttons} from '../../manager/buttons.js';
import {userListIncOrderStorageContextConsumer} from '../../manager/context-provider/user-list-storage.js';
import {topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/user-inc-order-box.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-admin-order-list': AlwatrPageAdminOrderList;
  }
}

/**
 * List of all users.
 */
@customElement('alwatr-page-admin-order-list')
export class AlwatrPageAdminOrderList extends ScheduleUpdateToFrameMixin(
    UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))),
) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
      gap: var(--sys-spacing-track);
      transform: opacity var(--sys-motion-duration-small);
    }

    :host([state='reloading']) {
      opacity: var(--sys-surface-reloading-opacity);
    }

    .reloading-failed {
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  @state()
    gotState = userListIncOrderStorageContextConsumer.getState().target;

  override connectedCallback(): void {
    super.connectedCallback();

    this._addSignalListeners(userListIncOrderStorageContextConsumer.subscribe(() => {
      this.gotState = userListIncOrderStorageContextConsumer.getState().target;
    }, {receivePrevious: 'NextCycle'}));

    this._addSignalListeners(eventListener.subscribe(buttons.retry.clickSignalId, () => {
      userListIncOrderStorageContextConsumer.request();
    }, {receivePrevious: 'No'}));

    this._addSignalListeners(eventListener.subscribe(buttons.reloadAdminOrderListStorage.clickSignalId, () => {
      userListIncOrderStorageContextConsumer.request();
    }, {receivePrevious: 'No'}));
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('gotState')) {
      this.setAttribute('state', this.gotState);
    }
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return userListIncOrderStorageContextConsumer.fsm.render({
      initial: 'onlineLoading',
      offlineLoading: 'onlineLoading',
      onlineLoading: this._renderStateLoading,
      loadingFailed: this._renderStateLoadingFailed,
      reloadingFailed: 'complete',
      reloading: 'complete',
      complete: this._renderStateComplete,
    }, this);
  }

  protected _renderStateLoading(): unknown {
    this._logger.logMethod?.('_renderStateLoading');

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
  }

  protected _renderStateLoadingFailed(): unknown {
    this._logger.logMethod?.('_renderStateLoadingFailed');

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
      <div>
        <alwatr-button .content=${buttons.retry}></alwatr-button>
      </div>
    `;
  }

  protected _renderStateComplete(): unknown {
    this._logger.logMethod?.('_renderStateComplete');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_admin_order_list_headline',
      startIcon: buttons.backToHome,
      endIconList: [
        buttons.newOrder, {...buttons.reloadAdminOrderListStorage, disabled: this.gotState === 'reloading'},
      ],
    });
    return html`
      ${when(this.gotState === 'reloadingFailed', this._render_reloadingFailed)}
      ${this._render_usersList()}
    `;
  }

  private _render_usersList(): unknown {
    const userStorage = userListIncOrderStorageContextConsumer.getResponse();
    this._logger.logMethodArgs?.('renderUsersList', {userStorage});
    if (userStorage == null) return;

    const orderStorageList = Object.values(userStorage.data).sort((u1, u2) => {
      const lastU1Order = Object.values(u1.orderList).sort((o1, o2) => {
        return (o1.meta?.updated || 0) - (o2.meta?.updated || 0);
      })[0];

      const lastU2Order = Object.values(u2.orderList).sort((o1, o2) => {
        return (o1.meta?.updated || 0) - (o2.meta?.updated || 0);
      })[0];

      return (lastU2Order?.meta?.updated || 0) - (lastU1Order?.meta?.updated || 0);
    });

    return mapIterable(
        this,
        orderStorageList,
        (userIncOrder) => {
          return html`<alwatr-user-inc-order-box .userIncOrder=${userIncOrder}></alwatr-user-inc-order-box>`;
        },
    );
  }

  private _render_reloadingFailed(): unknown {
    return html`<alwatr-surface tinted class="reloading-failed">
      ${message('page_admin_order_list_reloading_failed')}
    </alwatr-surface>`;
  }
}
