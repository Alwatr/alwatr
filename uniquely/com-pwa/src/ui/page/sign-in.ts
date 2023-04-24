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
  ref,
  state,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {buttons} from '../../manager/buttons.js';
import {signIn, userStorageContextConsumer} from '../../manager/context-provider/user.js';
import {topAppBarContextProvider} from '../../manager/context.js';

import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-sign-in': AlwatrPageSignIn;
  }
}

/**
 * Alwatr Sign In Page
 */
@customElement('alwatr-page-sign-in')
export class AlwatrPageSignIn extends UnresolvedMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: nowrap;
      padding: calc(2 * var(--sys-spacing-track)) calc(5 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    alwatr-surface {
      padding: 0;
    }

    alwatr-surface > * {
      margin: calc(3 * var(--sys-spacing-track));
    }

    .error-message {
      color: var(--sys-color-error);
    }

    alwatr-text-field {
      display: block;
    }

    alwatr-button {
      display: block;
      margin: calc(3 * var(--sys-spacing-track)) calc(6 * var(--sys-spacing-track));
      --_surface-color-on: var(--sys-color-on-primary-hsl);
      background-color: var(--sys-color-primary);
    }
  `;

  @state()
  private _userState = userStorageContextConsumer.getState().target;

  private _linkPass: string | null = null;
  private _textInputRef: Ref<AlwatrTextField> = createRef();

  override connectedCallback(): void {
    super.connectedCallback();

    this._linkPass = localStorage.getItem('link-pass');

    // prettier-ignore
    this._addSignalListeners(userStorageContextConsumer.subscribe(() => {
      this._userState = userStorageContextConsumer.getState().target;
      if (this._userState === 'complete') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        localStorage.setItem('user-token', this._linkPass!);
        localStorage.removeItem('link-pass');
        redirect({});
      }
    }, {receivePrevious: 'NextCycle'}));

    this._addSignalListeners(userStorageContextConsumer.fsm.defineSignals([
      {
        signalId: buttons.signIn.clickSignalId,
        callback: (): void => {
          const {value: textInput} = this._textInputRef;
          const phoneNumber = textInput?.value;
          this._logger.logMethodArgs?.('_onSignIn', {phoneNumber});

          if (phoneNumber == null || this._linkPass == null) {
            this._logger.accident('_onSignIn', 'invalid_sign_in_params', 'invalid sign in params', {
              phoneNumber,
              userToken: this._linkPass,
            });
            return;
          }

          signIn(phoneNumber, this._linkPass);
        },
      },
    ]));
  }

  protected override render(): unknown {
    this._logger.logMethod?.('render');

    topAppBarContextProvider.setValue({headlineKey: 'page_sign_in_headline'});

    const content = userStorageContextConsumer.fsm.render({
      'initial': () => [
        this._renderTextField(),
        this._renderSignInButton(),
      ],
      'offlineLoading': 'onlineLoading',
      'reloading': 'onlineLoading',
      'onlineLoading': () => [
        this._renderTextField(true),
        this._renderSignInButton(true),
      ],
      'reloadingFailed': 'loadingFailed',
      'loadingFailed': () => [
        this._renderTextField(),
        this._renderErrorMessage(),
        this._renderSignInButton(),
      ],
      'complete': () => nothing,
    });

    return html`<alwatr-surface elevated>${content}</alwatr-surface>`;
  }

  protected _renderTextField(loading = false): unknown {
    this._logger.logMethodArgs?.('_renderTextField', {loading});
    return html`<alwatr-text-field
      ${ref(this._textInputRef)}
      .name=${'phoneNumber'}
      .type=${'tel'}
      .placeholder=${message('page_sign_in_phone_number_placeholder')}
      ?disabled=${loading}
      outlined
      active-outline
      stated
    ></alwatr-text-field>
    <alwatr-text-field
      .type=${'password'}
      .value=${'داداش، مارو چی فرض کردی؟'}
      disabled
      outlined
      active-outline
      stated
    ></alwatr-text-field>`;
  }

  protected _renderSignInButton(loading = false): unknown {
    this._logger.logMethodArgs?.('_renderSignInButton', {loading});
    return html`<alwatr-button .content=${buttons.signIn} ?disabled=${loading}></alwatr-button>`;
  }

  protected _renderErrorMessage(): unknown {
    this._logger.logMethod?.('_renderErrorMessage');
    return html`<div class="error-message">${message('page_sign_sign_in_failed')}</div>`;
  }
}
