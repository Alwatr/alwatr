import {
  css,
  customElement,
  SignalMixin,
  LocalizeMixin,
  ToggleMixin,
  nothing,
  html,
  property,
  type PropertyValues,
} from '@alwatr/element';
import {number} from '@alwatr/i18n';
import '@alwatr/icon';

import {AlwatrSurface} from './surface.js';
import '../button/icon-button.js';

import type {StringifyableRecord} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-product-card': AlwatrProductCard;
  }
}

export interface ProductCartContent extends StringifyableRecord {
  id?: string;
  title: string;
  imagePath: string;
  price?: number;
  finalPrice?: number;
}

/**
 * Alwatr elevated card element.
 */
@customElement('alwatr-product-card')
export class AlwatrProductCard extends ToggleMixin(LocalizeMixin(SignalMixin(AlwatrSurface))) {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: block;
        padding: 0;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        --_surface-color-on: var(--sys-color-on-surface-hsl);
        --_surface-color-bg: var(--sys-color-surface-hsl);
        outline: 2px solid transparent;
      }

      :host([selected]) {
        --_surface-color-on: var(--sys-color-inverse-on-surface-hsl);
        --_surface-color-bg: var(--sys-color-inverse-surface-hsl);
        border-radius: var(--sys-radius-xlarge);
        outline: 2px solid var(--sys-color-inverse-surface);
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

      :host([selected]) img {
        filter: brightness(0.8);
      }

      @media (prefers-color-scheme: dark) {
        img {
          filter: brightness(0.8);
        }
        :host([selected]) img {
          filter: brightness(1);
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
      :host([selected]) .price {
        color: inherit;
      }

      .price ins {
        color: var(--sys-color-primary);
        text-decoration: none;
        font-weight: var(--ref-font-weight-medium);
        vertical-align: middle;
      }

      .price del {
        display: block;
        text-align: end;
        padding-left: 1em;
      }

      :host([selected]) .price ins {
        color: var(--sys-color-inverse-primary);
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

    // const icon = this.selected ? 'radio-button-on-outline' : 'radio-button-off-outline';

    return html`
      <img src=${this.content.imagePath} alt=${this.content.title} />
      <div class="content">
        <h2 class="title">${this.content.title}</h2>
        <div class="price">
          <del>${number(this.content.price)}</del>
          <ins>${number(this.content.finalPrice)}</ins>
          <alwatr-icon .name=${'toman'}></alwatr-icon>
        </div>
    </div>
    `;
  }
}
