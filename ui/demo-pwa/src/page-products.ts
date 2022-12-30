import {customElement, AlwatrSmartElement, css, html, map, LocalizeMixin} from '@alwatr/element';

import '@alwatr/ui-kit/cards/elevated-card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-products': AlwatrPageProducts;
  }
}

type product = {
  name: string;
  description: string;
  image: string;
  price: number;
};

const products: Record<string, product> = {
  p1: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=1',
    price: 130000,
  },
  p2: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=2',
    price: 1230000,
  },
  p3: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=3',
    price: 120000,
  },
  p4: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=4',
    price: 10000,
  },
  p5: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=2',
    price: 1230000,
  },
  p6: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=3',
    price: 120000,
  },
  p7: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=4',
    price: 10000,
  },
  p8: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=3',
    price: 120000,
  },
  p9: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=4',
    price: 10000,
  },
  p10: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=3',
    price: 120000,
  },
  p11: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=4',
    price: 10000,
  },
  p12: {
    name: 'لورم ایپسوم متن ساختگی با',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
    image: 'https://picsum.photos/100?random=4',
    price: 10000,
  },
};

/**
 * Alwatr Demo Products Page
 */
@customElement('alwatr-page-products')
export class AlwatrPageProducts extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = css`
    :host {
      display: flex;
      flex: 0 1 100%;
      flex-wrap: wrap;
      gap: var(--alwatr-sys-spacing-track-2);
      padding: var(--alwatr-sys-spacing-track-2);
      overflow-y: auto;
    }
    alwatr-elevated-card {
      flex: 1 1 calc(var(--alwatr-sys-spacing-column-2) - var(--alwatr-sys-spacing-halftrack-2));
      padding: 0;
      transition-property: background-color;
      transition-duration: var(--alwatr-sys-motion-duration-small-out);
      transition-timing-function: var(--alwatr-sys-motion-easing-exiting);
    }
    alwatr-elevated-card::before,
    alwatr-elevated-card::after {
      transition-property: box-shadow;
      transition-duration: var(--alwatr-sys-motion-duration-small-out);
      transition-timing-function: var(--alwatr-sys-motion-easing-exiting);
    }
    alwatr-elevated-card:hover {
      background-color: var(--alwatr-sys-color-surface-variant);

      --_elevation-level: 3;

      transition-duration: var(--alwatr-sys-motion-duration-large-in);
      transition-timing-function: var(--alwatr-sys-motion-easing-incoming);
    }
    img {
      width: 100%;
      border-radius: var(--alwatr-sys-shape-corner-medium-default-size);
    }
    h3 {
      font-weight: var(--alwatr-sys-typescale-title-small-font-weight);
      font-size: var(--alwatr-sys-typescale-title-small-font-size);
      letter-spacing: var(--alwatr-sys-typescale-title-small-letter-spacing);
      line-height: var(--alwatr-sys-typescale-title-small-line-height);
      margin: 0 var(--alwatr-sys-spacing-track-1) var(--alwatr-sys-spacing-track-1);
    }
    h2 {
      font-weight: var(--alwatr-sys-typescale-title-medium-font-weight);
      font-size: var(--alwatr-sys-typescale-title-medium-font-size);
      letter-spacing: var(--alwatr-sys-typescale-title-medium-letter-spacing);
      line-height: var(--alwatr-sys-typescale-title-medium-line-height);
      margin: var(--alwatr-sys-spacing-track-1);
    }
    p {
      font-weight: var(--alwatr-sys-typescale-body-small-font-weight);
      font-size: var(--alwatr-sys-typescale-body-small-font-size);
      letter-spacing: var(--alwatr-sys-typescale-body-small-letter-spacing);
      line-height: var(--alwatr-sys-typescale-body-small-line-height);

      margin: var(--alwatr-sys-spacing-track-1);
    }
  `;

  override render(): unknown {
    super.render();
    return map(
        Object.values(products),
        (product) => html`
        <alwatr-elevated-card>
          <img class="product-image" src=${product.image} />
          <h2 class="product-title">${product.name}</h2>
          <h3 class="product-price">${this.l10n.formatNumber(product.price)}</h3>
          <p>${product.description}</p>
        </alwatr-elevated-card>
      `,
    );
  }
}
