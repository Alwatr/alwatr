import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import styles from '../style';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends AlwatrElement {
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
          <ion-card-header>
            <ion-card-title>سفارش: <span style="direction:ltr;">958-001</span></ion-card-title>
            <ion-card-subtitle> وضعیت: در انتظار پرداخت </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>سفارش: <span style="direction:ltr;">958-001</span></ion-card-title>
            <ion-card-subtitle> وضعیت: در انتظار پرداخت </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>سفارش: <span style="direction:ltr;">958-001</span></ion-card-title>
            <ion-card-subtitle> وضعیت: در انتظار پرداخت </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>سفارش: <span style="direction:ltr;">958-001</span></ion-card-title>
            <ion-card-subtitle> وضعیت: در انتظار پرداخت </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>سفارش: <span style="direction:ltr;">958-001</span></ion-card-title>
            <ion-card-subtitle> وضعیت: در انتظار پرداخت </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>سفارش: <span style="direction:ltr;">958-001</span></ion-card-title>
            <ion-card-subtitle> وضعیت: در انتظار پرداخت </ion-card-subtitle>
          </ion-card-header>
        </ion-card>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button>
            <alwatr-icon name="add"></alwatr-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-content>
    `;
  }
}
