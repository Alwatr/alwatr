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
  nothing,
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
 * Alwatr Select Product Element.
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

  override connectedCallback(): void {
    super.connectedCallback();
    this._updateSelectedRecord();
  }

  private _updateSelectedRecord(): void {
    this._logger.logMethod?.('_updateSelectedRecord');
    this.selectedRecord = {};
    if (!this.order?.itemList?.length) return;
    for (const item of this.order.itemList) {
      this.selectedRecord[item.productId] = true;
    }
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    if (this.productStorage == null || this.priceStorage == null || this.finalPriceStorage == null) {
      this._logger.accident('render_part_product_list', 'context_not_valid', 'Some context not valid', this.order);
      return nothing;
    }

    return mapObject(this, this.productStorage?.data, this.render_part_product_card);
  }

  protected render_part_product_card(product: Product): unknown {
    if (this.productStorage == null || this.priceStorage == null || this.finalPriceStorage == null) return;
    const content: ProductCartContent = {
      id: product.id,
      title: product.title.fa,
      imagePath: config.serverContext.cdn + '/medium/' + product.image.id,
      price: this.priceStorage?.data[product.id]?.price ?? 0,
      finalPrice: this.finalPriceStorage?.data[product.id]?.price ?? 0,
    };
    return html`<alwatr-product-card
      .content=${content}
      .selected=${Boolean(this.selectedRecord[product.id])}
      @selected-change=${this._selectedChanged}
    ></alwatr-product-card>`;
  }

  private _selectedChanged(event: CustomEvent): void {
    if (this.order == null || this.priceStorage == null || this.finalPriceStorage == null) return;
    const target = <AlwatrProductCard | null>event.target;
    const productId = target?.content?.id;

    this._logger.logMethodArgs?.('_selectedChanged', {productId});

    if (target == null || productId == null) return;

    this.order.itemList ??= [];
    if (target.selected === true) {
      this.order.itemList.push({
        productId,
        qty: 80,
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
