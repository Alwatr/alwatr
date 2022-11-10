import {AlwatrElement} from '@alwatr/element';
import '@ionic/core/dist/types/components';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {map} from 'lit/directives/map.js';

import ionTheming from '../style/ionic.theming';

import type {AirlineInterface} from '../type';
import type {TemplateResult} from 'lit';


declare global {
  interface HTMLElementTagNameMap {
    'page-flight-finder': PageFlightFinder;
  }
}

@customElement('page-flight-finder')
export class PageFlightFinder extends AlwatrElement {
  static override styles = [
    ionTheming,
    css`
      * {
        user-select: none;
      }
      :host {
        display: flex;
        flex-direction: column;
      }
      ion-card-content {
        padding: 0 !important;
      }
      ion-card.airline__list,
      ion-card.form {
        --ion-item-background: var(--ion-color-primary-contrast);
      }

      ion-card.airline__list .airline::part(native) {
        align-items: flex-end;
      }
      ion-card.airline__list .airline ion-label {
        display: flex !important;
        flex-direction: column;
        justify-content: flex-end;
        gap: 8px;
      }
      ion-card.airline__list .airline ion-label[slot='end'] * {
        text-align: end;
        justify-content: flex-end;
      }

      ion-card.airline__list .airline .airline__title {
        font-size: 1em;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      ion-card.airline__list .airline .airline__title ion-icon {
        font-size: 1.3em;
      }
      ion-card.airline__list .airline .airline__subtitle {
        font-size: 0.9em;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--ion-color-step-600);
      }
      ion-card.airline__list .airline .airline__subtitle .airline__subtitle-price {
        color: var(--ion-color-danger, #eb445a);
      }
    `,
    css`
      ion-card.form ion-item {
        margin: 0 8px 8px;
      }
      ion-card.form ion-button.form-btn {
        margin-left: 12px;
        margin-right: 12px;
      }
    `,
  ];

  protected _listenerList: Array<unknown> = [];
  protected _airlineList: AirlineInterface[] = [
    {
      origin: 'مشهد',
      destination: 'تهران',
      date: '۱۴۰۰/۰۹/۲۴',
      time: 'عصر',
      maxPrice: 987000000,
    },
    {
      origin: 'مشهد',
      destination: 'تهران',
      date: '۱۴۰۰/۰۱/۲۴',
      time: 'عصر',
      foundFlights: 3,
      price: 1000000,
      maxPrice: 987000000,
    },
  ];

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>پرواز یاب</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen> ${this._renderAirlineListCard()}${this._renderForm()} </ion-content>
    `;
  }

  protected _renderAirlineListCard(): TemplateResult {
    const airlineItemList = map(this._airlineList, (airline, index) =>
      this._renderAirlineItem(airline, index, this._airlineList.length),
    );

    return html`
      <ion-card class="airline__list">
        <ion-card-header>
          <ion-card-title>لیست پرواز ها</ion-card-title>
          <ion-card-subtitle> ۱۲۳ ثانیه پیش </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-list lines="full"> ${airlineItemList} </ion-list>
        </ion-card-content>
      </ion-card>
    `;
  }
  protected _renderAirlineItem(airline: AirlineInterface, index: number, total: number): TemplateResult {
    const t =
      airline.price != null && airline.foundFlights != null ?
        html`
            <div class="airline__title">
              <span>${airline.foundFlights.toLocaleString('fa')}</span>
              پرواز
            </div>
            <div class="airline__subtitle">
              <span class="airline__subtitle-price"> ${airline.price.toLocaleString('fa')} </span>
              <span> ه&zwnj;ت </span>
            </div>
          ` :
        html` <div class="airline__subtitle">یافت نشد</div> `;

    return html`
      <ion-item-sliding>
        <ion-item class="airline" .lines=${index === total - 1 ? 'none' : undefined}>
          <ion-label>
            <div class="airline__title">
              <span> ${airline.destination} </span>
              <ion-icon name="arrow-forward-outline" color="primary"></ion-icon>
              <span> ${airline.origin} </span>
            </div>
            <div class="airline__subtitle">
              <span>${airline.date}</span>
              <span>${airline.time}</span>
            </div>
          </ion-label>
          <ion-label slot="end">${t}</ion-label>
        </ion-item>

        <ion-item-options side="start">
          <ion-item-option color="danger">
            <ion-icon slot="icon-only" name="close-outline"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    `;
  }
  protected _renderForm(): TemplateResult {
    return html`
      <ion-card class="form">
        <ion-card-header>
          <ion-card-title>درخواست جدید</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item fill="solid">
              <ion-label position="floating">مبدأ</ion-label>
              <ion-select>
                <ion-select-option value="MHD">مشهد</ion-select-option>
                <ion-select-option value="THR">تهران</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">مقصد</ion-label>
              <ion-select>
                <ion-select-option value="MHD">مشهد</ion-select-option>
                <ion-select-option value="THR">تهران</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">تاریخ</ion-label>
              <ion-select>
                <ion-select-option value="data1">۱۴۰۱/۰۹/۲۴</ion-select-option>
                <ion-select-option value="data2">۱۴۰۱/۰۹/۲۵</ion-select-option>
                <ion-select-option value="data3">۱۴۰۱/۰۹/۲۶</ion-select-option>
                <ion-select-option value="data4">۱۴۰۱/۰۹/۲۷</ion-select-option>
                <ion-select-option value="data5">۱۴۰۱/۰۹/۲۸</ion-select-option>
                <ion-select-option value="data6">۱۴۰۱/۰۹/۲۹</ion-select-option>
                <ion-select-option value="data7">۱۴۰۱/۰۹/۳۰</ion-select-option>
                <ion-select-option value="data8">۱۴۰۱/۰۹/۳۱</ion-select-option>
                <ion-select-option value="data9">۱۴۰۱/۱۰/۰۱</ion-select-option>
                <ion-select-option value="data10">۱۴۰۱/۱۰/۰۲</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">زمان</ion-label>
              <ion-select>
                <ion-select-option value="morning">صبح</ion-select-option>
                <ion-select-option value="evening">عصر</ion-select-option>
                <ion-select-option value="night">شب</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">حداکثر قیمت</ion-label>
              <ion-input type="number"></ion-input>
            </ion-item>
            <ion-button class="form-btn" expand="block"> ارسال </ion-button>
          </ion-list>
        </ion-card-content>
      </ion-card>
    `;
  }
}
