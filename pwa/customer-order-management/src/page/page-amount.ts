import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {sampleProductList} from '../config';
import styles from '../style';

import '../component/product-item';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-amount': PageAmount;
  }
}

@customElement('page-amount')
export class PageAmount extends AlwatrElement {
  static override styles = [
    ...styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
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
        ></product-item>
      `,
    );
    return html`${cards}`;
  }
}
