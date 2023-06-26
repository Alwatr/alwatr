import {
  css,
  customElement,
  SignalMixin,
  LocalizeMixin,
  nothing,
  html,
  property,
  type PropertyValues,
} from '@alwatr/element';
import {number} from '@alwatr/i18n';
import '@alwatr/icon';
import '@alwatr/ui-kit/button/icon-button.js';
import {AlwatrSurface} from '@alwatr/ui-kit/card/surface.js';


import type {StringifyableRecord} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-product-card2': AlwatrProductCard;
  }
}

export interface ProductCartContent extends StringifyableRecord {
  id?: string;
  title: string;
  imagePath: string;
  price?: number;
}

/**
 * Alwatr not selectable elevated card element.
 */
@customElement('alwatr-product-card2')
export class AlwatrProductCard extends LocalizeMixin(SignalMixin(AlwatrSurface)) {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: block;
        padding: 0;
        user-select: none;
        -webkit-user-select: none;
        --_surface-color-on: var(--sys-color-on-surface-hsl);
        --_surface-color-bg: var(--sys-color-surface-hsl);
        outline: 2px solid transparent;
      }

      img {
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-height: 50px;
        height: auto;
        border-radius: 0 0 var(--sys-radius-medium) var(--sys-radius-medium);
        filter: brightness(1);
        transition: filter var(--sys-motion-duration-small) var(--sys-motion-easing-normal);
      }

      @media (prefers-color-scheme: dark) {
        img {
          filter: brightness(0.8);
        }
      }

      .content{
        padding: calc(2 * var(--sys-spacing-track));

      }
      .title {
        margin: 0;
        /* text-align: center; */
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
        margin-bottom: var(--sys-spacing-track);
      }

      .price {
        text-align: end;
        color: var(--sys-color-on-surface-variant);
        font-family: var(--sys-typescale-body-small-font-family-name);
        font-weight: var(--sys-typescale-body-small-font-weight);
        font-size: var(--sys-typescale-body-small-font-size);
        letter-spacing: var(--sys-typescale-body-small-letter-spacing);
        line-height: var(--sys-typescale-body-small-line-height);
      }

      .price ins {
        color: var(--sys-color-primary);
        text-decoration: none;
        font-weight: var(--ref-font-weight-medium);
        vertical-align: middle;
      }

      svg {
        display: inline-block;
        width: 1em;
        height: 1em;
        contain: strict;
        vertical-align: middle;
      }
    `,
  ];

  @property({type: Object, attribute: false})
    content?: ProductCartContent;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
    this.setAttribute('elevated', '');
  }

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this.content != null;
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    if (this.content == null) return nothing;

    return html`
      <img src=${this.content.imagePath} alt=${this.content.title} />
      <div class="content">
        <h2 class="title">${this.content.title}</h2>
        <div class="price">
          <ins>${number(this.content.price)}</ins>
          <alwatr-icon .name=${'toman'}></alwatr-icon>
        </div>
    </div>
    `;
  }
}
