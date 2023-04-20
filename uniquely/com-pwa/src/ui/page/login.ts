import {
  AlwatrBaseElement,
  SignalMixin,
  UnresolvedMixin,
  css,
  customElement,
  html,
  mapObject,
  nothing,
  state,
} from '@alwatr/element';
import {finiteStateMachineConsumer} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {buttons} from '../../manager/buttons.js';
import {topAppBarContextProvider} from '../../manager/context.js';
import {LoginFsm} from '../../manager/controller/login.js';

import type {ButtonContent} from '@alwatr/ui-kit/button/button.js';
import type {IconBoxContent} from '@alwatr/ui-kit/src/card/icon-box.js';
import type {TextFiledContent} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-login': AlwatrPageLogin;
  }
}

/**
 * Alwatr Login Page
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
      gap: var(--sys-spacing-track);
    }

    alwatr-text-field {
      width: 100%;
    }
  `;

  protected fsm = finiteStateMachineConsumer<LoginFsm>('login_fsm_' + this.ali, 'login_fsm');

  @state()
    gotState = this.fsm.getState().target;

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({headlineKey: 'login_headline'});

    this._addSignalListeners(
        this.fsm.defineSignals([
          {
            callback: (): void => {
              const state = this.fsm.getState();
              this.gotState = state.target;
            },
            receivePrevious: 'NextCycle',
          },
          {
            signalId: 'login_form_input_change',
            callback: (detail, fsmInstance): void => {
              fsmInstance.getContext().agencyInfo[detail.name] = detail?.value ?? '';
            },
          },
          {
            signalId: 'login_submit_click_event',
            transition: 'login',
          },
          {
            signalId: buttons.retry.clickSignalId,
            transition: 'retry',
          },
        ]),
    );
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    return this.fsm.render(
        {
          login: this._renderStateLogin,
          loginSuccess: () => nothing,
          loginFailed: this._renderStateLoginFailed,
          form: this._renderStateForm,
        },
        this,
    );
  }

  protected _renderStateForm = (): unknown => {
    const textFieldContent: Record<string, TextFiledContent> = {
      phoneNumber: {
        name: 'phoneNumber',
        type: 'tel',
        placeholder: message('page_login_phone_number_placeholder'),
        inputChangeSignalName: 'login_form_input_change',
      },
      token: {
        name: 'token',
        type: 'password',
        placeholder: message('page_login_password_placeholder'),
        inputChangeSignalName: 'login_form_input_change',
      },
    };
    const loginButtonContent: ButtonContent = {
      labelKey: 'page_login_submit',
      icon: 'checkmark-outline',
      clickSignalId: 'login_submit_click_event',
    };

    return html`
      <alwatr-surface tinted>
        ${mapObject(this, textFieldContent, (textFieldContent) => {
    return html`
            <alwatr-text-field .content=${textFieldContent} outlined active-outline stated></alwatr-text-field>
          `;
  })}
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
