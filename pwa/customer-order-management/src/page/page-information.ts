import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import styles from '../style';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-information': PageInformation;
  }
}

@customElement('page-information')
export class PageInformation extends AlwatrElement {
  static override styles = [
    ...styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      ion-card ion-item,
      ion-button {
        margin: 0.7em;
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
          <ion-item fill="solid">
            <ion-label position="stacked">نام تحویل گیرنده</ion-label>
            <ion-input type="text" value="حسن روحانی" inputmode="text"></ion-input>
          </ion-item>
          <ion-item fill="solid">
            <ion-label position="stacked">کد ملی تحویل گیرنده</ion-label>
            <ion-input
              type="number"
              value="09909080"
              minlength="8"
              maxlength="10"
              inputmode="number"
              required
            ></ion-input>
          </ion-item>
          <ion-item fill="solid">
            <ion-label position="stacked">آدرس تحویل گیرنده</ion-label>
            <ion-textarea rows="4" value="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت "></ion-textarea>
          </ion-item>
          <ion-item fill="solid">
            <ion-label position="stacked">نحوه بارگیری</ion-label>
            <ion-select placeholder="...">
              <ion-select-option value="pishtaz">پست پیشتاز</ion-select-option>
              <ion-select-option value="tipax">تیپاکس</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item fill="solid">
            <ion-label position="stacked">نوع ماشین</ion-label>
            <ion-select placeholder="..." interface="popover">
              <ion-select-option value="benz">خاور</ion-select-option>
              <ion-select-option value="nissan">وانت</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item fill="solid">
            <ion-label position="stacked">بازه زمانی</ion-label>
            <ion-select placeholder="...">
              <ion-select-option value="1-2">۱ تا ۲ هفته</ion-select-option>
              <ion-select-option value="2-3">۲ تا ۳ هفته</ion-select-option>
              <ion-select-option value="3-4">۳ تا ۴ هفته</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button expand="block" fill="solid"> تایید </ion-button>
        </ion-card>
      </ion-content>
    `;
  }
}
