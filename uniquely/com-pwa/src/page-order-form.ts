import {customElement, css, html, LocalizeMixin, AlwatrBaseElement, SignalMixin} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import './app-footer.js';
import './order-form.js';

import type {TopAppBarContent} from '@alwatr/ui-kit/src/top-app-bar/top-app-bar.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-form': AlwatrPageOrderForm;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order-form')
export class AlwatrPageOrderForm extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 1;
      overflow-y: auto;
      gap: var(--sys-spacing-track);
    }

    alwatr-order-form {
      width: 100%;
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');

    const topAppBar: TopAppBarContent = {
      type: 'medium',
      headline: message('page_order_form_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    };

    return html`
      <alwatr-top-app-bar .content=${topAppBar}></alwatr-top-app-bar>
      <main>
        <alwatr-order-form></alwatr-order-form>
      </main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }
}
