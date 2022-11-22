import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';

import ionNormalize from '../style/ionic.normalize';
import ionTheming from '../style/ionic.theming';

import './job-item';

import type {Job} from '../type';
import type {TemplateResult, PropertyValues} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-flight-finder': PageFlightFinder;
  }
}

@customElement('page-flight-finder')
export class PageFlightFinder extends AlwatrElement {
  static override styles = [
    ionNormalize,
    ionTheming,
    css`
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

  @state() protected _airlineList: Job[] = [
    {
      filter: {
        origin: 'MHD',
        dest: 'THR',
        date: '1401/01/10',
        dayPart: ['afternoon'],
        maxPrice: 100,
      },
      resultList: [],
    },
    {
      filter: {
        origin: 'THR',
        dest: 'MHD',
        date: '1401/09/24',
        dayPart: ['evening', 'morning'],
        maxPrice: 10000,
      },
      resultList: [
        {
          price: 1230,
          seatCount: 2,
          time: 0,
        },
      ],
    },
  ];

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>پرواز یاب</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen> ${this._renderAirlineListCard()} ${this._renderForm()} </ion-content>
    `;
  }
  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
  }

  protected _renderAirlineListCard(): TemplateResult {
    const airlineItemList = map(this._airlineList, (airline) => html` <job-item .job=${airline}></job-item> `);

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
