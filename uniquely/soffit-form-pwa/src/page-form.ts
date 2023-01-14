import {html, customElement, css, AlwatrDummyElement, state} from '@alwatr/element';

import '@alwatr/icon';

import ionNormalize from './style/ionic.normalize.js';
import ionTheming from './style/ionic.theming.js';

import type {TemplateResult} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'page-form': PageForm;
  }
}

@customElement('page-form')
export class PageForm extends AlwatrDummyElement {
  static override styles = [
    ionNormalize,
    ionTheming,
    css`
      ion-card {
        margin: 24px 16px;
      }
      ion-item {
        margin-bottom: 8px;
      }
      ion-button {
        height: 40px;
        margin-top: 16px;
      }
      ion-button ion-spinner,
      ion-button alwatr-icon {
        margin-inline-end: 16px;
      }
    `,
  ];

  @state() protected __loading = false;

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>بازرگانی سافیت</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <ion-card>
          <ion-card-header>
            <ion-card-title>فرم ثبت اطلاعات</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item fill="solid">
              <ion-label position="floating">نام</ion-label>
              <ion-input type="text" placeholder="نام خود را وارد کنید"></ion-input>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">نام خانوادگی</ion-label>
              <ion-input type="text" placeholder="نام خانوادگی خود را وارد کنید"></ion-input>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">شماره تماس</ion-label>
              <ion-input
                type="tel"
                inputmode="tel"
                maxlength="11"
                minlength="11"
                placeholder="شماره تماس خود را وارد کنید"
              ></ion-input>
            </ion-item>

            <ion-item fill="solid">
              <ion-label position="floating">نوع فعالیت</ion-label>
              <ion-select placeholder="نوع فعالیت خود را وارد کنید" interface="action-sheet" .cancelText=${'لغو'}>
                <ion-select-option value="peperoni">پخش کننده تایل</ion-select-option>
                <ion-select-option value="peperoni">فروشنده و مغازه دار</ion-select-option>
                <ion-select-option value="peperoni">نصاب تایل</ion-select-option>
                <ion-select-option value="peperoni">پیمانکار</ion-select-option>
                <ion-select-option value="peperoni">سازنده</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item fill="solid">
              <ion-label position="floating">شماره قرعه کشی</ion-label>
              <ion-input type="text" inputmode="numeric" placeholder="شماره قرعه کشی خود را وارد کنید"></ion-input>
            </ion-item>

            <ion-button fill="outline" expand="block" ?disabled=${this.__loading} @click=${this.__submitForm}>
              <ion-spinner ?hidden=${!this.__loading}></ion-spinner>
              <alwatr-icon slot="start" name="send-outline" ?hidden=${this.__loading}></alwatr-icon>
              <ion-label>ثبت اطلاعات</ion-label>
            </ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>
    `;
  }

  protected async __submitForm(): Promise<void> {
    this.__loading = true;

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 5000);
    });

    this.__loading = false;
  }
}
