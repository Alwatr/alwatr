import {
  customElement,
  css,
  html,
  SignalMixin,
  AlwatrBaseElement,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';
import {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import './app-footer';
import './register-form.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-register': AlwatrPageRegister;
  }
}

/**
 * Alwatr Register Page.
 */
@customElement('alwatr-page-register')
export class AlwatrPageRegister extends SignalMixin(AlwatrBaseElement) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
      flex-grow: 1;
      overflow-y: auto;
    }

    main > * {
      width: 100%;
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');

    const topAppBar: TopAppBarContent = {
      type: 'center',
      headline: message('register_page_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 1,
    };

    return html`
      <alwatr-top-app-bar .content=${topAppBar}></alwatr-top-app-bar>
      <main>
        <alwatr-register-form></alwatr-register-form>
      </main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }
}
