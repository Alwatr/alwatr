import {customElement, AlwatrSmartElement, css, html, map, LocalizeMixin} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';

import '@alwatr/ui-kit/product-card/product-card.jsrd.js';

import type {PropertyValues} from '@alwatr/element';
import type {ProductType} from '@alwatr/ui-kit/product-card/product-card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-products': AlwatrPageProducts;
  }
}

const products: Record<string, ProductType> = {
  p1: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=1',
    price: 130000,
  },
  p2: {
    name: 'متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=2',
    price: 1230000,
  },
  p3: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=3',
    price: 120000,
  },
  p4: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=4',
    price: 10000,
  },
  p5: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=5',
    price: 1230000,
  },
  p6: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=6',
    price: 120000,
  },
  p7: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=7',
    price: 10000,
  },
  p8: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=8',
    price: 120000,
  },
  p9: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=9',
    price: 10000,
  },
  p10: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=0',
    price: 120000,
  },
  p11: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=1',
    price: 10000,
  },
  p12: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/480?random=2',
    price: 10000,
  },
};

/**
 * Alwatr Demo Products Page
 */
@customElement('alwatr-page-products')
export class AlwatrPageProducts extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = [
    css`
      :host {
        display: block;
        overflow-y: auto;
        height: 100%;
      }
      .cards {
        display: flex;
        flex-wrap: wrap;
        gap: var(--sys-spacing-gutter);
        padding: var(--sys-spacing-side-padding);
      }
    `,
  ];

  override render(): unknown {
    super.render();
    return html`<div class="cards">
      ${map(
      Object.values(products),
      (product) => html`<alwatr-product-card .product=${product}></alwatr-product-card>`,
  )}
    </div>`;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    l10n.setLocal({
      code: 'fa-IR',
      direction: 'rtl',
      language: 'fa',
    });
  }
}
