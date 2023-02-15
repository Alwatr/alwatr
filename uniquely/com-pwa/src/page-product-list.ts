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
import {contextConsumer, type ListenerSpec} from '@alwatr/signal';
import '@alwatr/ui-kit/card/product-card.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import './app-footer';
import {config} from './config.js';
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

  private __productListener?: ListenerSpec;

  private __storageName?: string;

  get storageName(): string | undefined {
    return this.__storageName;
  }

  set storageName(value: string | undefined) {
    if (this.__storageName === value) return;

    if (this.__productListener) {
      contextConsumer.unsubscribe(this.__productListener);
    }

    if (typeof this.__storageName !== 'string' || config.productStorageList.indexOf(this.__storageName) === -1) {
      this.__storageName = undefined;
      this._productStorage = null;
      return;
    }
    // else
    this.__storageName = value;
    this.__productListener = contextConsumer.subscribe<AlwatrDocumentStorage<Product>>(
        `product-storage-${this.__storageName}-context`,
        (productStorage) => {
          this._productStorage = productStorage;
        },
    );
  }

  @state()
  protected _productStorage?: AlwatrDocumentStorage<Product> | null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._signalListenerList.push(
        productStorageContextConsumer.subscribe((productStorage) => {
          this._productStorage = productStorage;
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

    const mainContent = mapObject(
        this,
        this._productStorage?.data,
        this._productItemTemplate,
        message(this._productStorage === null ? 'product_not_found' : 'loading'),
    );

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
      price: 147000,
      finalPrice: 125000,
    };
    return html`<alwatr-product-card .content=${content}></alwatr-product-card>`;
  }
}
