import {
  AlwatrBaseElement,
  SignalMixin,
  UnresolvedMixin,
  css,
  customElement,
  html,
  mapObject,
  property,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/icon';
import {topAppBarContextProvider} from '@alwatr/pwa-helper/src/context.js';
import {eventListener} from '@alwatr/signal';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import type {StringifyableRecord} from '@alwatr/type';
import type {ButtonContent} from '@alwatr/ui-kit/src/button/button.js';
import type {TextFieldSignalDetail, TextFiledContent} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-login': AlwatrPageLogin;
  }
}

export interface LoginInfo extends StringifyableRecord {
  username: string;
  password: string;
}

/**
 * Alwatr Customer Order Management Home Page
 */
@customElement('alwatr-page-login')
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
    }

    h3 {
      margin: 0;
      margin-bottom: calc(2 * var(--sys-spacing-track));
    }

    .input-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--sys-spacing-track);
      gap: var(--sys-spacing-track);
    }

    alwatr-icon {
      font-size: calc(3 * var(--sys-spacing-track));
    }

    alwatr-text-field,
    alwatr-radio-group {
      flex-grow: 1;
      display: block;
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  @property()
    formData: Partial<LoginInfo> = {};

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      headlineKey: 'login_headline',
    });

    this._addSignalListeners(
        eventListener.subscribe('login_form_input_change', (detail: TextFieldSignalDetail) => {
          this.formData[detail?.name] = detail?.value;
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    const textFieldContent: Record<string, TextFiledContent & {iconName: string}> = {
      phoneNumber: {
        name: 'phoneNumber',
        type: 'tel',
        placeholder: message('page_login_phone_number_placeholder'),
        iconName: 'call-outline',
        inputChangeSignalName: 'login_form_input_change',
      },
      password: {
        name: 'password',
        type: 'password',
        placeholder: message('page_login_password_placeholder'),
        iconName: 'key-outline',
        inputChangeSignalName: 'login_form_input_change',
      },
    };
    const loginButtonContent: ButtonContent = {
      labelKey: 'page_login_submit',
      icon: 'checkmark-outline',
      clickSignalId: 'click_form_click_event',
    };

    return html`
      <alwatr-surface tinted>
        <h3>${message('page_login_title')}</h3>
        ${this._inputTemplate(textFieldContent)}
      </alwatr-surface>
      <div>
        <alwatr-button .content=${loginButtonContent}></alwatr-button>
      </div>
    `;
  }

  protected _inputTemplate(textFieldContentRecord: Record<string, TextFiledContent & {iconName: string}>): unknown {
    return mapObject(this, textFieldContentRecord, (textFieldContent) => {
      return html`
        <div class="input-container">
          <alwatr-icon name=${textFieldContent.iconName}></alwatr-icon>
          <alwatr-text-field .content=${textFieldContent} outlined active-outline stated></alwatr-text-field>
        </div>
      `;
    });
  }
}
