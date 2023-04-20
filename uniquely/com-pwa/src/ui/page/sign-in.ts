import {
  AlwatrBaseElement,
  PropertyValues,
  SignalMixin,
  UnresolvedMixin,
  css,
  customElement,
  html,
  state,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {buttons} from '../../manager/buttons.js';
import {userStorageContextConsumer} from '../../manager/context-provider/user.js';
import {topAppBarContextProvider} from '../../manager/context.js';

import type {ButtonContent} from '@alwatr/ui-kit/button/button.js';
import type {IconBoxContent} from '@alwatr/ui-kit/src/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-login': AlwatrPageLogin;
  }
}

/**
 * Alwatr Login Page
 */
@customElement('alwatr-page-sing-in')
export class AlwatrPageLogin extends UnresolvedMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      min-height: 100%;
      width: 100%;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }

    alwatr-surface {
      --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: var(--sys-spacing-track);
    }

    alwatr-text-field {
      width: 100%;
    }
  `;

  @state()
    gotState = userStorageContextConsumer.getState().target;

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({headlineKey: 'sign_in_headline'});

    // prettier-ignore
    this._addSignalListeners(userStorageContextConsumer.subscribe(() => {
      this.gotState = userStorageContextConsumer.getState().target;
    }, {receivePrevious: 'NextCycle'}));
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('gotState')) {
      this.setAttribute('state', this.gotState);
    }
  }


  override render(): unknown {
    this._logger.logMethod?.('render');

    // return userStorageContextConsumer.fsm.render({
    //   ''
    // });
  }

  protected _renderStateForm = (): unknown => {
    const loginButtonContent: ButtonContent = {
      labelKey: 'page_login_submit',
      icon: 'checkmark-outline',
      clickSignalId: 'login_submit_click_event',
    };

    return html`
      <alwatr-surface tinted>
        <alwatr-text-field
          .name=${'phoneNumber'}
          .type=${'tel'}
          .placeholder=${'page_login_phone_number_placeholder'}
          outlined
          active-outline
          stated
        ></alwatr-text-field>
        <alwatr-text-field
          .name=${'token'}
          .type=${'password'}
          .placeholder=${'page_login_password_placeholder'}
          outlined
          active-outline
          stated
        ></alwatr-text-field>
      </alwatr-surface>
      <div>
        <alwatr-button .content=${loginButtonContent}></alwatr-button>
      </div>
    `;
  };

  protected _renderStateLogin(): unknown {
    this._logger.logMethod?.('_render_login');

    const content: IconBoxContent = {
      headline: message('page_login_login_message'),
      icon: 'cloud-upload-outline',
      tinted: 1,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _renderStateLoginFailed(): unknown {
    this._logger.logMethod?.('_render_login_failed');

    const content: IconBoxContent = {
      headline: message('page_order_login_failed_message'),
      icon: 'cloud-offline-outline',
      tinted: 1,
    };
    return html`
      <alwatr-icon-box .content=${content}></alwatr-icon-box>
      <div>
        <alwatr-button .content=${buttons.retry}></alwatr-button>
      </div>
    `;
  }
}
