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
  when,
  type PropertyValues,
  mapObject,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {eventListener} from '@alwatr/signal';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';

import {buttons} from '../../manager/buttons.js';
import {userListStorageContextConsumer} from '../../manager/context-provider/user-list-storage.js';
import {topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/order-status-box.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-user-list': AlwatrPageUserList;
  }
}

/**
 * List of all users.
 */
@customElement('alwatr-page-user-list')
export class AlwatrPageUserList extends ScheduleUpdateToFrameMixin(
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

    alwatr-order-status-box {
      margin-bottom: var(--sys-spacing-track);
    }

    .reloadingFailed {
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  @state()
    gotState = userListStorageContextConsumer.getState().target;

  override connectedCallback(): void {
    super.connectedCallback();

    // prettier-ignore
    this._addSignalListeners(userListStorageContextConsumer.subscribe(() => {
      this.gotState = userListStorageContextConsumer.getState().target;
    }, {receivePrevious: 'NextCycle'}));

    this._addSignalListeners(
        eventListener.subscribe(buttons.retry.clickSignalId, () => {
          userListStorageContextConsumer.request();
        }),
    );
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('gotState')) {
      this.setAttribute('state', this.gotState);
    }
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return userListStorageContextConsumer.fsm.render({
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
          <div>
            <alwatr-button .content=${buttons.retry}></alwatr-button>
          </div>
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
        return html`
          ${when(this.gotState === 'reloadingFailed', this._renderReloadingFailed)}
          ${guard(userListStorageContextConsumer.getResponse()?.meta.lastUpdated, () => this._renderUsersList())}
        `;
      },
    });
  }

  private _renderUsersList(): unknown {
    const userStorage = userListStorageContextConsumer.getResponse();
    this._logger.logMethodArgs?.('_renderUsersList', {userStorage});

    return mapObject(
        this,
        userStorage?.data,
        (user) => html`<alwatr-user-info-box .content=${user}></alwatr-order-info-box>`,
    );
  }

  private _renderReloadingFailed(): unknown {
    return html`<alwatr-surface tinted class="reloadingFailed">
      ${message('page_user_list_reloading_failed')}
    </alwatr-surface>`;
  }
}
