import {
  customElement,
  SignalMixin,
  AlwatrBaseElement,
  LocalizeMixin,
  css,
  html,
  state,
  mapObject,
  property,
  UnresolvedMixin,
  type PropertyValues,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {contextConsumer, type ListenerSpec} from '@alwatr/signal';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/product-card.js';

import {config} from '../config.js';
import {productStorageContextConsumer, topAppBarContextProvider} from '../manager/context.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {OrderDraft, Product, ProductPrice} from '@alwatr/type/customer-order-management.js';
import type {AlwatrProductCard, ProductCartContent} from '@alwatr/ui-kit/card/product-card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-product-list': AlwatrPageOrderProduct;
  }
}

/**
 * Soffit Product Page
 */
@customElement('alwatr-page-order-product')
export class AlwatrPageOrderProduct extends LocalizeMixin(SignalMixin(UnresolvedMixin(AlwatrBaseElement))) {
  static override styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
      box-sizing: border-box;
      min-height: 100%;
      justify-content: flex-end;
    }

    alwatr-product-card {
      width: 40%;
      flex-grow: 1;
    }

    .break {
      width: 100%;
      visibility: hidden;
    }
  `;

  @property()
    storageName?: string = 'tile';

  @property({attribute: false})
    order?: OrderDraft | null;

  @state()
  protected _productStorage?: AlwatrDocumentStorage<Product> | null;
  @state()
  protected _priceList?: AlwatrDocumentStorage<ProductPrice>;
  @state()
  protected _finalPriceList?: AlwatrDocumentStorage<ProductPrice>;

  selectedRecord?: Record<string, true>;

  override connectedCallback(): void {
    super.connectedCallback();
    this._signalListenerList.push(
        productStorageContextConsumer.subscribe((productStorage) => {
          this._productStorage = productStorage;
        }),
    );

    topAppBarContextProvider.setValue({
      type: 'small',
      headline: message('page_product_list_headline'),
      startIcon: {icon: 'checkmark', clickSignalId: 'back-click-event'},
      tinted: 2,
    });
  }

  override update(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('storageName') && this.storageName != null) {
      this._storageNameUpdated();
    }
    super.update(changedProperties);
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
          {receivePrevious: 'NextCycle'},
      ),
      contextConsumer.subscribe<AlwatrDocumentStorage<ProductPrice>>(
          `price-list-storage-${storageName}-context`,
          (priceList) => {
            this._priceList = priceList;
          },
          {receivePrevious: 'NextCycle'},
      ),
      contextConsumer.subscribe<AlwatrDocumentStorage<ProductPrice>>(
          `final-price-list-storage-${storageName}-context`,
          (finalPriceList) => {
            this._finalPriceList = finalPriceList;
          },
          {receivePrevious: 'NextCycle'},
      ),
    ];
  }

  override render(): unknown {
    this._logger.logMethod('render');

    if (this._productStorage == null || this._priceList == null || this._finalPriceList == null || this.order == null) {
      return message(this._productStorage === null ? 'product_not_found' : 'loading');
    }
    // else

    this.selectedRecord = {};
    this._logger.logProperty('order', this.order);
    if (this.order.itemList?.length) {
      for (const item of this.order.itemList) {
        this.selectedRecord[item.productId] = true;
      }
    }

    return html`
      ${mapObject(this, this._productStorage?.data, this._productItemTemplate)}
      <div class="break"></div>
      <alwatr-button elevated @click=${this._orderClick} ?disabled=${!this.order.itemList?.length}>Order</alwatr-button>
    `;
  }

  protected _productItemTemplate(product: Product): unknown {
    const content: ProductCartContent = {
      id: product.id,
      title: product.title.fa,
      imagePath: config.cdn + product.image.id,
      price: this._priceList?.data[product.id].price,
      finalPrice: this._finalPriceList?.data[product.id].price,
    };
    this._logger.logProperty('selected', !!this.selectedRecord?.[product.id]);
    return html`<alwatr-product-card
      .content=${content}
      .selected=${this.selectedRecord?.[product.id] !== undefined}
      @selected-change=${this._selectedChanged}
    ></alwatr-product-card>`;
  }

  protected _selectedChanged(event: CustomEvent): void {
    const target = <AlwatrProductCard | null>event.target;
    const productId = target?.content?.id;
    this._logger.logMethodArgs('_selectedChanged', {productId});
    if (
      this.order != null &&
      this._priceList != null &&
      this._finalPriceList != null &&
      productId != null &&
      this.selectedRecord?.[productId] !== true
    ) {
      this.order.itemList ??= [];
      const item = {
        productId,
        qty: 1,
        price: this._priceList.data[productId].price,
        finalPrice: this._finalPriceList.data[productId].price,
      };

      if (target?.selected === true) {
        this.order.itemList.push(item);
      }
      else {
        this.order.itemList.splice(this.order.itemList.indexOf(item), 1);
      }

      if (this.order.itemList.length === 0) {
        this.renderRoot.querySelector('alwatr-button')?.setAttribute('disabled', '');
      }
      else if (this.order.itemList.length === 1) {
        this.renderRoot.querySelector('alwatr-button')?.removeAttribute('disabled');
      }
    }
  }

  protected _orderClick(): void {
    this._logger.logMethod('_orderClick');
    this.dispatchEvent(new CustomEvent('request-redirect', {detail: {page: 'edit'}}));
  }
}
