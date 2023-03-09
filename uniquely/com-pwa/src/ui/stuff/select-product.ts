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

import type {OrderDraft} from '@alwatr/type/customer-order-management.js';
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

    const {productStorage, priceStorage, finalPriceStorage} = pageNewOrderStateMachine.context;

    if (productStorage == null || priceStorage == null || finalPriceStorage == null) {
      return this._logger.accident(
          'render_part_product_list',
          'context_not_valid',
          'Some context not valid',
          this.order,
      );
    }

    return mapObject(this, productStorage?.data, (product) => {
      const content: ProductCartContent = {
        id: product.id,
        title: product.title.fa,
        imagePath: config.cdn + product.image.id,
        price: priceStorage?.data[product.id]?.price ?? 0,
        finalPrice: finalPriceStorage?.data[product.id]?.price ?? 0,
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
    const {order, priceStorage, finalPriceStorage} = pageNewOrderStateMachine.context;

    this._logger.logMethodArgs('_selectedChanged', {productId});

    if (target == null || productId == null || priceStorage == null || finalPriceStorage == null) {
      return this._logger.accident(
          'render_part_product_list',
          'context_not_valid',
          'Some context not valid',
          {productId, priceStorage, finalPriceStorage},
      );
    }

    order.itemList ??= [];
    if (target.selected === true) {
      order.itemList.push({
        productId,
        qty: 0,
        price: priceStorage.data[productId].price,
        finalPrice: finalPriceStorage.data[productId].price,
      });
    }
    else {
      const itemIndex = order.itemList.findIndex((item) => item.productId === productId);
      if (itemIndex !== -1) {
        order.itemList.splice(itemIndex, 1);
      }
    }

    const submitButton = this.renderRoot.querySelector('alwatr-button');
    if (submitButton && order.itemList.length < 2) {
      submitButton.toggleAttribute('disabled', !order.itemList.length);
    }
  }
}
