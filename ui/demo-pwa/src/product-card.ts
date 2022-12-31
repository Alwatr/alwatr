import {css, customElement, AlwatrDummyElement, property, LocalizeMixin, nothing, html} from '@alwatr/element';

import '@alwatr/ui-kit/icon-button/standard-icon-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-product-card': AlwatrProductCard;
  }
}

export type ProductType = {
  name: string;
  description: string;
  image: string;
  price: number;
};

/**
 * Alwatr elevated card element.
 */
@customElement('alwatr-product-card')
export class AlwatrProductCard extends LocalizeMixin(AlwatrDummyElement) {
  static override styles = [
    css`
      :host {
        display: flex;
        flex: 1 1 calc(var(--alwatr-sys-spacing-column-2) - var(--alwatr-sys-spacing-halftrack-3));
      }
      .product-card {
        width: 100%;
        padding: 0;
        transition-property: background-color;
        transition-duration: var(--alwatr-sys-motion-duration-small-out);
        transition-timing-function: var(--alwatr-sys-motion-easing-exiting);
      }
      .product-card::before,
      .product-card::after {
        transition-property: box-shadow;
        transition-duration: var(--alwatr-sys-motion-duration-small-out);
        transition-timing-function: var(--alwatr-sys-motion-easing-exiting);
      }
      .product-card .product-card__toggle {
        position: absolute;
        top: 0;
        right: 0;
        color: var(--alwatr-sys-color-on-surface-variant);
      }
      .product-card .product-card__image {
        width: 100%;
        border-radius: var(--alwatr-sys-shape-corner-medium-default-size);
      }
      .product-card .product-card__title {
        font-weight: var(--alwatr-sys-typescale-title-medium-font-weight);
        font-size: var(--alwatr-sys-typescale-title-medium-font-size);
        letter-spacing: var(--alwatr-sys-typescale-title-medium-letter-spacing);
        line-height: var(--alwatr-sys-typescale-title-medium-line-height);
        margin: var(--alwatr-sys-spacing-track-1);
        margin-bottom: auto;
        padding-bottom: var(--alwatr-sys-spacing-track-1);
      }
      .product-card .product-card__price {
        font-weight: var(--alwatr-sys-typescale-title-small-font-weight);
        font-size: var(--alwatr-sys-typescale-title-small-font-size);
        letter-spacing: var(--alwatr-sys-typescale-title-small-letter-spacing);
        line-height: var(--alwatr-sys-typescale-title-small-line-height);
        margin: 0 var(--alwatr-sys-spacing-track-1) var(--alwatr-sys-spacing-track-1);
      }
      .product-card .product-card__description {
        font-weight: var(--alwatr-sys-typescale-body-small-font-weight);
        font-size: var(--alwatr-sys-typescale-body-small-font-size);
        letter-spacing: var(--alwatr-sys-typescale-body-small-letter-spacing);
        line-height: var(--alwatr-sys-typescale-body-small-line-height);

        margin: var(--alwatr-sys-spacing-track-1);
      }
      /* selected state */
      :host([selected]) .product-card {
        background-color: var(--alwatr-sys-color-tertiary-container);

        --_elevation-level: 2;

        transition-duration: var(--alwatr-sys-motion-duration-large-in);
        transition-timing-function: var(--alwatr-sys-motion-easing-incoming);
      }
      :host([selected]) .product-card .product-card__toggle {
        color: var(--alwatr-sys-color-on-tertiary-container);
      }
    `,
  ];

  @property({type: Object, attribute: false}) product?: ProductType;
  @property({type: Boolean, reflect: true}) selected = false;

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this._toggleSelect);
  }
  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('click', this._toggleSelect);
  }

  override render(): unknown {
    super.render();

    if (this.product == null) return nothing;

    const icon = this.selected ? 'radio-button-on-outline' : 'radio-button-off-outline';

    return html`
      <alwatr-elevated-card class="product-card">
        <alwatr-standard-icon-button class="product-card__toggle" .icon=${icon}></alwatr-standard-icon-button>
        <img class="product-card__image" src=${this.product.image} />
        <h2 class="product-card__title">${this.product.name}</h2>
        <h3 class="product-card__price">${this.l10n.formatNumber(this.product.price)}</h3>
        <p class="product-card__description">${this.product.description}</p>
      </alwatr-elevated-card>
    `;
  }

  protected _toggleSelect(): boolean {
    return (this.selected = !this.selected);
  }
}
