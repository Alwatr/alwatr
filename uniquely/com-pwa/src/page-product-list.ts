import {
  customElement,
  AlwatrDummyElement,
  SignalMixin,
  LocalizeMixin,
  css,
  html,
  state,
  mapObject,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/product-card.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import './app-footer';
// import {config} from './config.js';
import {productStorageContextConsumer} from './context.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Product} from '@alwatr/type/customer-order-management.js';
import type {ProductCartContent} from '@alwatr/ui-kit/card/product-card.js';
import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-product-list': AlwatrPageProductList;
  }
}

/**
 * Soffit Product Page
 */
@customElement('alwatr-page-product-list')
export class AlwatrPageProductList extends LocalizeMixin(SignalMixin(AlwatrDummyElement)) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    main {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
      overflow-y: scroll;
    }

    main > * {
      width: 40%;
      flex-grow: 1;
    }
  `;

  @state()
    productStorage?: AlwatrDocumentStorage<Product>;

  override connectedCallback(): void {
    super.connectedCallback();
    this._signalListenerList.push(
        productStorageContextConsumer.subscribe((productStorage) => {
          this.productStorage = productStorage;
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    const topAppBar: TopAppBarContent = {
      type: 'medium',
      headline: message('page_product_list_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    };

    return html`
      <alwatr-top-app-bar .content=${topAppBar}></alwatr-top-app-bar>
      <main>${mapObject(this, this.productStorage?.data, this._productItemTemplate, message('loading'))}</main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }

  protected _productItemTemplate(product: Product): unknown {
    const content: ProductCartContent = {
      title: product.title.fa,
      imagePath: /* config.cdn + */ product.image.id,
      price: 147000,
      finalPrice: 125000,
    };
    return html`<alwatr-product-card .content=${content}></alwatr-product-card>`;
  }
}
