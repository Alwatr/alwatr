import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {sampleProductList} from '../config';
import styles from '../style';

import '../component/product-item';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-invoice': PageInvoice;
  }
}

@customElement('page-invoice')
export class PageInvoice extends AlwatrElement {
  static override styles = [
    ...styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .subtotal,
      .discount,
      .shipping {
        --min-height: 0;
      }

      ion-list {
        padding: 0 !important;
      }

      ion-list ion-item ion-label {
        margin-top: 4px;
        margin-bottom: 4px;
      }

      ion-item ion-label h2,
      ion-item ion-label h3 {
        line-height: 1.6;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>شرکت تولیدی بازرگانی سافیت</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen>
        <ion-card>
          <ion-list> ${this._renderCards()} </ion-list>
        </ion-card>
        <ion-card>
          <ion-list lines="none">
            <ion-item class="subtotal">
              <ion-label>
                <h3>سر جمع</h3>
              </ion-label>
              <ion-label slot="end">
                <p><b>۱۰۰،۰۰۰،۰۰۰</b> تومان</p>
              </ion-label>
            </ion-item>
            <ion-item class="discount">
              <ion-label>
                <h3>تخفیف</h3>
              </ion-label>
              <ion-label slot="end">
                <p><b>۱۰۰،۰۰۰</b> تومان</p>
              </ion-label>
            </ion-item>
            <ion-item class="shipping" lines="full">
              <ion-label>
                <h3>هزینه باربری</h3>
              </ion-label>
              <ion-label slot="end">
                <p><b>۱۰۰،۰۰۰،۰۰۰</b> تومان</p>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-item class="total" lines="none">
            <ion-label>
              <h2>جمع کل</h2>
            </ion-label>
            <ion-label slot="end">
              <h2><b>۱۰۰،۰۰۰،۰۰۰</b> تومان</h2>
            </ion-label>
          </ion-item>
        </ion-card>
      </ion-content>
    `;
  }

  protected _renderCards(): TemplateResult {
    const cards = sampleProductList.map(
        (product) => html`
        <product-item
          id=${product.id}
          .name=${product.title}
          .imageSrc=${product.image}
          .price=${product.price}
          .readonly=${true}
        ></product-item>
      `,
    );
    return html` ${cards} `;
  }
}
