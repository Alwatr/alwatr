import {
  customElement,
  css,
  html,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
} from '@alwatr/element';

import {languageButtonClickEventListener, topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/select-product.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-product': AlwatrPageProduct;
  }
}

/**
 * Alwatr Select Product Page
 */
@customElement('alwatr-page-product')
export class AlwatrPageProduct extends UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))) {
  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    topAppBarContextProvider.setValue({
      type: 'small',
      headlineKey: 'page_product_headline',
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back_to_home_click_event'},
      endIconList: [{icon: 'globe-outline', clickSignalId: languageButtonClickEventListener.id}],
      tinted: 2,
    });
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    return html`<alwatr-select-product></alwatr-select-product>`;
  }
}
