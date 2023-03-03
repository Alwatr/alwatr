import {
  customElement,
  SignalMixin,
  AlwatrBaseElement,
  LocalizeMixin,
  css,
  html,
  mapObject,
  UnresolvedMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/product-card.js';

import {config} from '../../config.js';
import {pageNewOrderStateMachine, buttons} from '../../manager/controller/new-order.js';

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

  selectedRecord: Record<string, true> = {};

  override render(): unknown {
    this._logger.logMethod('render');
    this._updateSelectedRecord();
    return [
      this.render_part_product_list(),
      this.render_part_submit(),
    ];
  }

  private _updateSelectedRecord(): void {
    this._logger.logMethod('_updateSelectedRecord');
    const order = pageNewOrderStateMachine.context.order;
    this.selectedRecord = {};
    if (!order?.itemList?.length) return;
    for (const item of order.itemList) {
      this.selectedRecord[item.productId] = true;
    }
  }

  protected render_part_submit(): unknown {
    return html`
      <div class="break"></div>
      <alwatr-button
        elevated
        .icon=${buttons.submit.icon}
        .clickSignalId=${buttons.submit.clickSignalId}
        ?disabled=${!pageNewOrderStateMachine.context.order.itemList?.length}
      >${message('select_product_submit')}</alwatr-button>
    `;
  }

  protected render_part_product_list(): unknown {
    this._logger.logMethod('render_part_product_list');

    const {productStorage, priceStorage, finalPriceStorage} = pageNewOrderStateMachine.context;

    if (productStorage == null || priceStorage == null || finalPriceStorage == null) {
      return this._logger.accident(
          'render_part_product_list',
          'contenx_not_valid',
          'Some context not valid',
          pageNewOrderStateMachine.context,
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
