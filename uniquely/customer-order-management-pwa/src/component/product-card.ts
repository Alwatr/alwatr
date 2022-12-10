import {AlwatrElement} from '@alwatr/element';
import {css, html, nothing} from 'lit';
import {customElement} from 'lit/decorators.js';
import {property} from 'lit/decorators/property.js';
import {live} from 'lit/directives/live.js';

import styles from '../style';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'product-card': ProductCard;
  }
}

@customElement('product-card')
export class ProductCard extends AlwatrElement {
  static override styles = [
    ...styles,
    css`
      :host {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        position: relative;
      }

      :host ion-card::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        border-radius: 4px;
        box-shadow: 0 0 0 0 var(--ion-color-primary) inset;
        will-change: box-shadow;
        transition: box-shadow 200ms ease;
      }

      :host([selected]) ion-card::before {
        box-shadow: 0 0 0 4px var(--ion-color-primary) inset;
      }

      ion-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0;
        position: relative;
        overflow: hidden;
      }

      ion-card ion-card-header {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        padding: 12px;
      }

      ion-card ion-card-header ion-card-title {
        font-size: 16px;
        line-height: 3vh;
        margin-bottom: 4px;
        font-weight: normal;
      }

      ion-card ion-card-header ion-card-subtitle {
        margin: 0;
        line-height: 1;
        font-weight: normal;
        text-align: left;
        color: var(--ion-color-step-850);
      }

      ion-card ion-card-header ion-card-subtitle.discount {
        display: flex;
        color: var(--ion-color-step-600);
        margin-bottom: 4px;
      }

      ion-card ion-card-header ion-card-subtitle.discount .discount__value {
        display: flex;
        flex: 1 1 0;
      }

      ion-card ion-card-header ion-card-subtitle.discount .discount__value .discount__value-box {
        display: inline-flex;
        width: min-content;
        background-color: var(--ion-color-danger, #dc3545);
        padding: 2px 4px;
        border-radius: 100vw;
        color: #fff;
      }

      ion-card ion-card-header ion-card-subtitle ins {
        text-decoration: none;
      }
    `,
  ];

  @property() name?: string;
  @property() description?: string;
  @property() imageSrc?: string;
  @property({type: Number}) price?: number;
  @property() priceUnit = 'تومان';
  @property({type: Boolean, reflect: true}) selected = false;

  constructor() {
    super();

    this._toggle = this._toggle.bind(this);
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this._toggle);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('click', this._toggle);
  }

  override render(): TemplateResult {
    return html`
      <ion-card>
        ${this._renderImage(this.imageSrc, this.name)}

        <ion-card-header>
          ${this._renderTitle(this.name)} ${this._renderPrice(this.price, this.priceUnit)}
        </ion-card-header>

        <ion-fab vertical="top" horizontal="start">
          <ion-checkbox ?checked=${live(this.selected)}></ion-checkbox>
        </ion-fab>
      </ion-card>
    `;
  }

  protected _renderImage(src?: string, alt?: string): TemplateResult | typeof nothing {
    if (!src || !alt) return nothing;

    return html`<img src=${src} alt=${alt} />`;
  }
  protected _renderTitle(title?: string): TemplateResult | typeof nothing {
    if (!title) return nothing;

    return html`<ion-card-title> ${title} </ion-card-title>`;
  }
  protected _renderPrice(price?: number, priceUnit?: string): TemplateResult | typeof nothing {
    if (!price || !priceUnit) return nothing;

    return html`
      <ion-card-subtitle class="discount">
        <div class="discount__value">
          <div class="discount__value-box">۳۰٪</div>
        </div>

        <del>${new Intl.NumberFormat('fa').format(price)}</del>
      </ion-card-subtitle>
      <ion-card-subtitle>
        <strong>
          <ins> ${new Intl.NumberFormat('fa').format(price)} </ins>
        </strong>
        ${priceUnit}
      </ion-card-subtitle>
    `;
  }

  protected _toggle(): void {
    this.selected = !this.selected;
    if (this.selected) {
      navigator.vibrate(50);
    }
  }
}
