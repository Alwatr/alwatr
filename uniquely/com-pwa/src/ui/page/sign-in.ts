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
import '@alwatr/icon';
import {redirect} from '@alwatr/router';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/text-field/text-field.js';
import {sanitizePhoneNumber} from '@alwatr/validator';

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
      padding: calc(2 * var(--sys-spacing-track)) calc(5 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    alwatr-surface {
      display: flex;
      flex-direction: column;
      padding: calc(3 * var(--sys-spacing-track));
      gap: calc(3 * var(--sys-spacing-track));
    }

    alwatr-icon {
      display: block;
      margin: 0 auto;
      color: var(--sys-color-primary);
      font-size: calc(4 * var(--sys-spacing-track));
    }

    .error-message {
      text-align: center;
      color: var(--sys-color-error);
      font-family: var(--sys-typescale-body-small-font-family-name);
      font-weight: var(--sys-typescale-body-small-font-weight);
      font-size: var(--sys-typescale-body-small-font-size);
      letter-spacing: var(--sys-typescale-body-small-letter-spacing);
      line-height: var(--sys-typescale-body-small-line-height);
    }

    alwatr-text-field {
      display: block;
    }

    alwatr-button {
      display: block;
      margin: 0 calc(3 * var(--sys-spacing-track));
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

    topAppBarContextProvider.setValue({
      type: 'center',
      headlineKey: 'page_sign_in_headline',
      startIcon: {icon: 'menu-outline', clickSignalId: 'app-menu-click-event'},
      endIconList: [{icon: 'person-circle-outline', clickSignalId: 'user-avatar-click-event'}],
      tinted: 1,
    });

    // prettier-ignore
    this._addSignalListeners(userStorageContextConsumer.subscribe(() => {
      this._userState = userStorageContextConsumer.getState().target;
      if (this._userState === 'complete') {
        if (this._linkPass != null) {
          localStorage.setItem('user-token', this._linkPass);
          localStorage.removeItem('link-pass');
        }
        redirect({});
      }
    }, {receivePrevious: 'NextCycle'}));
  }

  protected override render(): unknown {
    this._logger.logMethod?.('render');

    let content;
    if (this._linkPass == null) {
      content = [
        this._renderTextField(true),
        this._renderAuthErrorMessage(),
        this._renderSignInButton(true),
      ];
    }
    else {
      content = userStorageContextConsumer.fsm.render({
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
    }

    return html`<alwatr-surface elevated>
        <alwatr-icon .name=${'person'}></alwatr-icon>
        ${content}
      </alwatr-surface>`;
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
      ?disabled=${loading}
      readonly
      outlined
      active-outline
      stated
    ></alwatr-text-field>`;
  }

  protected _renderSignInButton(loading = false): unknown {
    this._logger.logMethodArgs?.('_renderSignInButton', {loading});
    return html`<alwatr-button
        .content=${buttons.signIn}
        ?disabled=${loading}
        @click=${this._onSignInClick}
      ></alwatr-button>`;
  }

  protected _renderErrorMessage(): unknown {
    this._logger.logMethod?.('_renderErrorMessage');
    const errorKey = userStorageContextConsumer.getResponse()?.statusCode === 404
      ? 'sign_in_error_user_not_found'
      : 'sign_in_error_unknown';

    return html`<div class="error-message">${message(errorKey)}</div>`;
  }

  protected _renderAuthErrorMessage(): unknown {
    this._logger.logMethod?.('_renderAuthErrorMessage');
    return html`<div class="error-message">${message('page_sign_in_login_with_link_pass')}</div>`;
  }

  protected _onSignInClick(): void {
    const {value: textInput} = this._textInputRef;
    const phoneNumber = textInput?.value;
    if (!phoneNumber) return;
    this._logger.logMethodArgs?.('_onSignInClick', {phoneNumber});

    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber);

    if (sanitizedPhoneNumber == null || this._linkPass == null) {
      this._logger.accident('_onSignInClick', 'invalid_sign_in_params', 'invalid sign in params', {
        phoneNumber,
        userToken: this._linkPass,
      });
      return;
    }

    signIn(sanitizedPhoneNumber, this._linkPass);
  }
}
