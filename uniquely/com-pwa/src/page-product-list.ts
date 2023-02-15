import {
  customElement,
  AlwatrDummyElement,
  SignalMixin,
  LocalizeMixin,
  css,
  html,
  state,
  mapObject,
  property,
  PropertyDeclaration,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {contextConsumer, type ListenerSpec} from '@alwatr/signal';
import '@alwatr/ui-kit/card/product-card.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import './app-footer';
import {config} from './config.js';
import {productStorageContextConsumer} from './context.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Product, ProductPrice} from '@alwatr/type/customer-order-management.js';
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

  @property()
    storageName?: string;

  @state()
  protected _productStorage?: AlwatrDocumentStorage<Product> | null;
  @state()
  protected _priceList?: AlwatrDocumentStorage<ProductPrice>;
  @state()
  protected _finalPriceList?: AlwatrDocumentStorage<ProductPrice>;

  override connectedCallback(): void {
    super.connectedCallback();
    this._signalListenerList.push(
        productStorageContextConsumer.subscribe((productStorage) => {
          this._productStorage = productStorage;
        }),
    );
  }

  override requestUpdate(name?: PropertyKey | undefined, oldValue?: unknown, options?: PropertyDeclaration): void {
    if (name === 'storageName') {
      this._storageNameUpdated();
    }
    super.requestUpdate(name, oldValue, options);
  }

  private __storageListenerList?: Array<ListenerSpec>;
  protected _storageNameUpdated(): void {
    const storageName = this.storageName;
    this._logger.logProperty('storageName', storageName);
    if (typeof storageName !== 'string') return;

    if (this.__storageListenerList != null) {
      for (const listener of this.__storageListenerList) {
        contextConsumer.unsubscribe(listener);
      }
      this.__storageListenerList.length = 0;
    }

    if (config.productStorageList.indexOf(storageName) === -1) {
      this.storageName = undefined;
      this._productStorage = null;
      return;
    }
    // else
    this.__storageListenerList = [
      contextConsumer.subscribe<AlwatrDocumentStorage<Product>>(
          `product-storage-${storageName}-context`,
          (productStorage) => {
            this._productStorage = productStorage;
          },
      ),
      contextConsumer.subscribe<AlwatrDocumentStorage<ProductPrice>>(
          `price-list-storage-${storageName}-context`,
          (priceList) => {
            this._priceList = priceList;
          },
      ),
      contextConsumer.subscribe<AlwatrDocumentStorage<ProductPrice>>(
          `final-price-list-storage-${storageName}-context`,
          (finalPriceList) => {
            this._finalPriceList = finalPriceList;
          },
      ),
    ];
  }

  override render(): unknown {
    this._logger.logMethod('render');

    const topAppBar: TopAppBarContent = {
      type: 'medium',
      headline: message('page_product_list_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    };

    let mainContent;
    if (this._productStorage == null || this._priceList == null || this._finalPriceList == null) {
      mainContent = message(this._productStorage === null ? 'product_not_found' : 'loading');
    }
    else {
      mainContent = mapObject(this, this._productStorage?.data, this._productItemTemplate);
    }

    return html`
      <alwatr-top-app-bar .content=${topAppBar}></alwatr-top-app-bar>
      <main>${mainContent}</main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }

  protected _productItemTemplate(product: Product): unknown {
    const content: ProductCartContent = {
      title: product.title.fa,
      imagePath: config.cdn + product.image.id,
      price: this._priceList?.data[product.id].price,
      finalPrice: this._finalPriceList?.data[product.id].price,
    };
    return html`<alwatr-product-card .content=${content}></alwatr-product-card>`;
  }
}
