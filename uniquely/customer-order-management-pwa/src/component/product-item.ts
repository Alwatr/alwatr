import {AlwatrElement} from '@alwatr/element';
import {css, html, nothing} from 'lit';
import {customElement} from 'lit/decorators.js';
import {property} from 'lit/decorators/property.js';
import {live} from 'lit/directives/live.js';

import styles from '../style';

import type {ListenerInterface} from '@alwatr/signal';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'product-item': ProductItem;
  }
}

@customElement('product-item')
export class ProductItem extends AlwatrElement {
  static override styles = [
    ...styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      ion-item {
        --inner-padding-end: 8px;
      }

      ion-item::part(native) {
        align-items: flex-start;
      }

      ion-item ion-thumbnail {
        margin: 12px 0 12px 16px;
        --border-radius: 3px;
      }

      ion-buttons {
        margin: 0;
      }
    `,
    css`
      table.price {
        margin: 8px 0;
        width: 100%;
      }

      table.price tr td:nth-child(1) {
        padding-inline-end: 8px;
        font-weight: 400;
      }

      table.price tr td:nth-child(2) {
        padding-inline-end: 4px;
        text-align: left;
        font-weight: 500;
      }

      table.price tr {
        font-size: 14px;
        font-weight: 300;
      }

      table.price tr.price__unit,
      table.price tr.price__quantity {
        color: var(--ion-color-step-800);
      }

      table.price tr.price__total strong {
        font-weight: bold;
      }

      table.price tr.price__quantity input {
        width: 50%;
        min-width: 55px;
        text-align: left;
        direction: ltr;
        border: 2px solid #888;
        outline: none;
        border-radius: 3px;
      }
    `,
  ];

  @property() name?: string;
  @property() description?: string;
  @property() imageSrc?: string;
  @property({type: Number}) price?: number;
  @property({type: Number, reflect: true}) QTY = 1000;
  @property() priceUnit = 'تومان';
  @property({type: Boolean, reflect: true}) readonly = false;

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    // this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`
      <ion-item lines="full">
        <ion-thumbnail slot="start"> ${this._renderImage(this.imageSrc, this.name)} </ion-thumbnail>
        <ion-label>
          ${this._renderTitle(this.name)} ${this._renderPrice(this.price, this.QTY, this.priceUnit)}
        </ion-label>
      </ion-item>
    `;
  }

  protected _renderImage(src?: string, alt?: string): TemplateResult | typeof nothing {
    if (!src || !alt) return nothing;

    return html`<img src=${src} alt=${alt} />`;
  }
  protected _renderTitle(title?: string): TemplateResult | typeof nothing {
    if (!title) return nothing;

    return html`<h2>${title}</h2>`;
  }
  protected _renderPrice(price?: number, QTY?: number, priceUnit?: string): TemplateResult | typeof nothing {
    if (!price || !QTY || !priceUnit) return nothing;

    return html`
      <table class="price">
        <tr class="price__unit">
          <td>قیمت واحد (m²):</td>
          <td>${new Intl.NumberFormat('fa').format(price)}</td>
          <td>${priceUnit}</td>
        </tr>
        <tr class="price__unit">
          <td>تخفیف (۱۰٪):</td>
          <td>${new Intl.NumberFormat('fa').format(Math.round(price / 10))}</td>
          <td>${priceUnit}</td>
        </tr>
        <tr class="price__total">
          <td>قیمت کل:</td>
          <td><strong>${new Intl.NumberFormat('fa').format(price * 3.6 * QTY || 1 * (1 - 0.1))}</strong></td>
          <td>${priceUnit}</td>
        </tr>
        <tr class="price__quantity">
          <td>تعداد:</td>
          <td>${this._renderQuantity(QTY)}</td>
          <td>بسته</td>
        </tr>
      </table>
    `;
  }
  protected _renderQuantity(QTY?: number): TemplateResult | typeof nothing {
    if (!QTY) return nothing;

    if (this.readonly) {
      return html`${new Intl.NumberFormat('fa').format(QTY)}`;
    }
    return html`<input type="number" .value=${live(QTY.toString())} @input=${this._onQuantityChange} />`;
  }

  protected _onQuantityChange(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (Number(value)) {
      this.QTY = Number(value);
    }
  }
}
