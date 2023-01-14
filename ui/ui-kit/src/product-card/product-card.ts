import {css, customElement, AlwatrDummyElement, property, LocalizeMixin, nothing, html} from '@alwatr/element';

import '../icon-button/standard-icon-button.js';
import '../card/card.js';

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
        flex: 1 1 var(--sys-spacing-column-2);
      }
      .product-card {
        --_surface-elevation: var(--sys-surface-elevation-1);
        --_surface-tint-opacity: var(--sys-surface-tint-opacity-1);
        position: relative;
        width: 100%;
        padding: 0;
        transition-property: background-color, box-shadow;
        transition-duration: var(--sys-motion-duration-medium-out);
        transition-timing-function: var(--sys-motion-easing-exiting);
      }
      .product-card .product-card__toggle {
        position: absolute;
        top: 0;
        right: 0;
        color: var(--sys-color-on-surface-variant);
      }
      .product-card .product-card__image {
        width: 100%;
        border-radius: var(--sys-shape-corner-medium-default-size);
      }
      .product-card .product-card__title {
        font-weight: var(--sys-typescale-title-medium-font-weight);
        font-size: var(--sys-typescale-title-medium-font-size);
        letter-spacing: var(--sys-typescale-title-medium-letter-spacing);
        line-height: var(--sys-typescale-title-medium-line-height);
        margin: var(--sys-spacing-track);
        margin-bottom: auto;
        padding-bottom: var(--sys-spacing-track);
      }
      .product-card .product-card__price {
        font-weight: var(--sys-typescale-title-small-font-weight);
        font-size: var(--sys-typescale-title-small-font-size);
        letter-spacing: var(--sys-typescale-title-small-letter-spacing);
        line-height: var(--sys-typescale-title-small-line-height);
        margin: 0 var(--sys-spacing-track) var(--sys-spacing-track);
      }
      .product-card .product-card__description {
        font-weight: var(--sys-typescale-body-small-font-weight);
        font-size: var(--sys-typescale-body-small-font-size);
        letter-spacing: var(--sys-typescale-body-small-letter-spacing);
        line-height: var(--sys-typescale-body-small-line-height);
        margin: var(--sys-spacing-track);
      }
      :host([selected]) .product-card {
        --_surface-color-bg: var(--sys-color-secondary-container-hsl);
        --_surface-color-on: var(--sys-color-on-secondary-container-hsl);
        --_surface-elevation: var(--sys-surface-elevation-3);
        transition-duration: var(--sys-motion-duration-medium-in);
        transition-timing-function: var(--sys-motion-easing-incoming);
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
      <alwatr-card class="product-card">
        <alwatr-standard-icon-button class="product-card__toggle" .icon=${icon}></alwatr-standard-icon-button>
        <img class="product-card__image" src=${this.product.image} />
        <h2 class="product-card__title">${this.product.name}</h2>
        <h3 class="product-card__price">${this.l10n.formatNumber(this.product.price)}</h3>
        <p class="product-card__description">${this.product.description}</p>
      </alwatr-card>
    `;
  }

  protected _toggleSelect(): boolean {
    return (this.selected = !this.selected);
  }
}
