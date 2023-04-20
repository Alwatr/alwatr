import {
  AlwatrBaseElement,
  Ref,
  SignalMixin,
  UnresolvedMixin,
  createRef,
  css,
  customElement,
  html,
  nothing,
  property,
  ref,
  state,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {buttons} from '../../manager/buttons.js';
import {signIn, userStorageContextConsumer} from '../../manager/context-provider/user.js';
import {topAppBarContextProvider} from '../../manager/context.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-login': AlwatrPageLogin;
  }
}

/**
 * Alwatr Sing In Page
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

    .sign-in-error {
      display: flex;
      justify-content: center;
      align-items: center;
      /* color: var(); */
    }

    alwatr-text-field {
      width: 100%;
    }
  `;

  @property()
    linkPass: string | null = null;

  @state()
    userState = userStorageContextConsumer.getState().target;

  textInputRef: Ref<AlwatrTextField> = createRef();

  override connectedCallback(): void {
    super.connectedCallback();

    this.linkPass = localStorage.getItem('link-pass');
    topAppBarContextProvider.setValue({headlineKey: 'sign_in_headline'});

    // prettier-ignore
    this._addSignalListeners(userStorageContextConsumer.subscribe(() => {
      this.userState = userStorageContextConsumer.getState().target;
    }, {receivePrevious: 'NextCycle'}));

    this._addSignalListeners(userStorageContextConsumer.fsm.defineSignals([
      {
        signalId: buttons.singIn.clickSignalId,
        callback: (): void => {
          const {value: textInput} = this.textInputRef;
          const phoneNumber = textInput?.value;
          this._logger.logMethodArgs?.('_onSignIn', {phoneNumber});

          if (phoneNumber == null || this.linkPass == null) {
            this._logger.accident('_onSignIn', 'invalid_sign_in_params', 'invalid sign in params', {
              phoneNumber,
              userToken: this.linkPass,
            });
            return;
          }

          signIn(phoneNumber, this.linkPass);
        },
      },
    ]));
  }

  protected override render(): unknown {
    this._logger.logMethod?.('render');

    if (this.userState === 'complete') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      localStorage.setItem('user-token', this.linkPass!);
      localStorage.removeItem('link-pass');
      redirect({});
      return;
    }

    return this._renderSingInForm();
  }

  protected _renderStateLogin(): unknown {
    this._logger.logMethod?.('_render_login');
    const content: IconBoxContent = {
      headline: message('page_sign_in_message'),
      icon: 'cloud-upload-outline',
      tinted: 1,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _renderSingInForm(): unknown {
    this._logger.logMethod?.('_renderSingInForm');

    const message = this.getMessage();
    const signInButtonIsDisabled = ['offlineLoading', 'reloading', 'onlineLoading'].includes(this.userState);

    return html` <alwatr-surface tinted>
        <alwatr-text-field
          .name=${'phoneNumber'}
          .type=${'tel'}
          .placeholder=${'page_sign_in_phone_number_placeholder'}
          outlined
          active-outline
          stated
          ${ref(this.textInputRef)}
        ></alwatr-text-field>
        <alwatr-text-field
          .type=${'password'}
          .value=${'داداش، مارو چی فرض کردی؟'}
          outlined
          active-outline
          stated
        ></alwatr-text-field>
      </alwatr-surface>
      ${message
        ? html`
            <div class="sign-in-error">
              <p>${message}</p>
            </div>
          `
        : nothing}
      <div>
        <alwatr-button
          .content=${buttons.singIn}
          ?disabled=${signInButtonIsDisabled}
        ></alwatr-button>
      </div>`;
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

  private getMessage(): string {
    this._logger.logMethod?.('getMessage');

    const signInMessages = {
      initial: '',
      loadingFailed: '',
      offlineLoading: '',
      onlineLoading: '',
      reloading: '',
      reloadingFailed: '',
      complete: '',
    };

    return signInMessages[this.userState];
  }
}
