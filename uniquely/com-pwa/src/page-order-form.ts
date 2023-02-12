import {customElement, css, html, LocalizeMixin, AlwatrSmartElement} from '@alwatr/element';
import {message} from '@alwatr/i18n';

import type {TopAppBarContent} from '@alwatr/ui-kit/src/top-app-bar/top-app-bar.js';

import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';
import './app-footer.js';
import './order-form.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-form': AlwatrPageOrderForm;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order-form')
export class AlwatrPageOrderForm extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }

    alwatr-order-form {
      flex-grow: 1;
    }
  `;

  protected content = {
    topAppBar: <TopAppBarContent>{
      type: 'medium',
      headline: message('page_order_form_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    },
  } as const;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-top-app-bar .content=${this.content.topAppBar}></alwatr-top-app-bar>
      <main>
        <alwatr-order-form></alwatr-order-form>
      </main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }
}
