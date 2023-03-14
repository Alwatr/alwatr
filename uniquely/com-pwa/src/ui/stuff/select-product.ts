import {
  customElement,
  SignalMixin,
  AlwatrBaseElement,
  LocalizeMixin,
  css,
  html,
  mapObject,
  UnresolvedMixin,
  property,
} from '@alwatr/element';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/product-card.js';

import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {OrderDraft, Product, ProductPrice} from '@alwatr/type/customer-order-management.js';
import type {AlwatrProductCard, ProductCartContent} from '@alwatr/ui-kit/card/product-card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-select-product': AlwatrSelectProduct;
  }
}

/**
 * Alwatr Select Product.
 */
@customElement('alwatr-select-product')
export class AlwatrSelectProduct extends LocalizeMixin(SignalMixin(UnresolvedMixin(AlwatrBaseElement))) {
  static override styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      /* padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track)); */
      gap: var(--sys-spacing-track);
      box-sizing: border-box;
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
  protected order?: OrderDraft;

  @property()
  protected productStorage?: AlwatrDocumentStorage<Product>;

  @property()
  protected finalPriceStorage?: AlwatrDocumentStorage<ProductPrice>;

  @property()
  protected priceStorage?: AlwatrDocumentStorage<ProductPrice>;

  selectedRecord: Record<string, true> = {};

  override render(): unknown {
    this._logger.logMethod('render');

    this._updateSelectedRecord();
    return this.render_part_product_list();
  }

  private _updateSelectedRecord(): void {
    this._logger.logMethod('_updateSelectedRecord');
    this.selectedRecord = {};
    if (!this.order?.itemList?.length) return;
    for (const item of this.order.itemList) {
      this.selectedRecord[item.productId] = true;
    }
  }

  protected render_part_product_list(): unknown {
    this._logger.logMethod('render_part_product_list');

    if (this.productStorage == null || this.priceStorage == null || this.finalPriceStorage == null) {
      return this._logger.accident(
          'render_part_product_list',
          'context_not_valid',
          'Some context not valid',
          this.order,
      );
    }

    return mapObject(this, this.productStorage?.data, (product) => {
      const content: ProductCartContent = {
        id: product.id,
        title: product.title.fa,
        imagePath: config.cdn + product.image.id,
        price: this.priceStorage?.data[product.id]?.price ?? 0,
        finalPrice: this.finalPriceStorage?.data[product.id]?.price ?? 0,
      };
      // this._logger.logProperty('selected', !!this.selectedRecord[product.id]);
      return html`<alwatr-product-card
        .content=${content}
        .selected=${Boolean(this.selectedRecord[product.id])}
        @selected-change=${this._selectedChanged}
      ></alwatr-product-card>`;
    });
  }

  private _selectedChanged(event: CustomEvent): void {
    const target = <AlwatrProductCard | null>event.target;
    const productId = target?.content?.id;

    this._logger.logMethodArgs('_selectedChanged', {productId});

    if (
      target == null ||
      productId == null ||
      this.priceStorage == null ||
      this.finalPriceStorage == null ||
      this.order == null
    ) {
      return this._logger.accident(
          'render_part_product_list',
          'context_not_valid',
          'Some context not valid',
          {productId, priceStorage: this.priceStorage, finalPriceStorage: this.finalPriceStorage},
      );
    }

    this.order.itemList ??= [];
    if (target.selected === true) {
      this.order.itemList.push({
        productId,
        qty: 0,
        price: this.priceStorage.data[productId].price,
        finalPrice: this.finalPriceStorage.data[productId].price,
      });
    }
    else {
      const itemIndex = this.order.itemList.findIndex((item) => item.productId === productId);
      if (itemIndex !== -1) {
        this.order.itemList.splice(itemIndex, 1);
      }
    }

    const submitButton = this.renderRoot.querySelector('alwatr-button');
    if (submitButton && this.order.itemList.length < 2) {
      submitButton.toggleAttribute('disabled', !this.order.itemList.length);
    }
  }
}
