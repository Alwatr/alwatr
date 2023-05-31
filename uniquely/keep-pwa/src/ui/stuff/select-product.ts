import {
  AlwatrBaseElement,
  LocalizeMixin,
  SignalMixin,
  UnresolvedMixin,
  css,
  customElement,
  html,
  mapObject,
  property,
} from '@alwatr/element';
import {localeContextConsumer} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';

import {config} from '../../config.js';
import '../stuff/product-card.js';

import type {ProductCartContent} from '../stuff/product-card.js';
import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Product} from '@alwatr/type/customer-order-management.js';

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

    alwatr-product-card2 {
      width: 100%;
      flex-grow: 1;
    }
  `;

  @property()
  protected productStorage?: AlwatrDocumentStorage<Product & {price: number}> = {
      ok: true,
      meta: {
        id: 'publistore/hub/product-list/scope',
        formatVersion: 5,
        reversion: 1,
        lastUpdated: 1684866396314,
        lastAutoId: -1,
      },
      data: {
        '1': {
          id: '1',
          title: {fa: 'اسکوپ دوشیار زاویه', en: 'Double-Angle Scoop'},
          image: {id: 'keep-scope-1-0.jpg'},
          price: 1590,
        },
        '2': {
          id: '2',
          title: {fa: 'اسکوپ پروانه', en: 'Helical Scoop'},
          image: {id: 'keep-scope-2-0.jpg'},
          price: 1400,
        },
        '3': {
          id: '3',
          title: {fa: 'اسکوپ دوشیار صاف', en: 'Double-Sided Flat Scoop'},
          image: {id: 'keep-scope-3-0.jpg'},
          price: 1590,
        },
      },
    };

  override render(): unknown {
    this._logger.logMethod?.('render');

    return mapObject(this, this.productStorage?.data, this.render_part_product_card);
  }

  protected render_part_product_card(product: Product & {price: number}): unknown {
    const langCode = (localeContextConsumer.getValue()?.language ?? 'fa') as Lowercase<string>;
    const content: ProductCartContent = {
      id: product.id,
      title: product.title[langCode] ?? product.title.fa,
      imagePath: config.serverContext.cdn + '/large/' + product.image.id,
      price: product.price,
    };
    return html`<alwatr-product-card2 .content=${content}></alwatr-product-card2>`;
  }
}
