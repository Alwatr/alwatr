import {AlwatrElement} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';
import {css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';

import {cityList} from '../city-list';
import ionNormalize from '../style/ionic.normalize';
import ionTheming from '../style/ionic.theming';
import {i18nDayPartList} from './job-item';

import type {dayParts, Job, NewJobFilter} from '../type';
import type {InputCustomEvent, SelectCustomEvent} from '@ionic/core';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-flight-finder': PageFlightFinder;
  }
}

const dayPartList: NewJobFilter['dayPart'] = ['earlyMorning', 'morning', 'midday', 'afternoon', 'evening', 'night'];

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
      ion-card {
        margin: 0.8em 1em;
      }
      ion-card.airline__list,
      ion-card.form {
        --ion-item-background: var(--ion-color-primary-contrast);
      }
    `,
    css`
      ion-card.form ion-item {
        margin: 0 0.8em 0.6em;
      }
      ion-card.form ion-button.form-btn {
        margin-left: 1em;
        margin-right: 1em;
      }
      ion-card.form .form__input-row {
        display: flex;
      }
      ion-card.form .form__input-row ion-item {
        flex: 1 1 0;
      }
      ion-card.form .form__input-row ion-item::part(native) {
        height: 100%;
      }
      ion-card.form .form__input-row ion-item:last-child {
        margin-right: 0;
      }
    `,
  ];

  @state() private __jobList: Array<Job> = [
    {
      id: '2',
      filter: {
        dest: 'MHD',
        origin: 'THR',
        date: '1401/09/10',
        maxPrice: 389000,
        seatCount: 0,
        dayPart: [],
      },
      resultList: [],
    },
    {
      id: '3',
      filter: {
        dest: 'THR',
        origin: 'MHD',
        date: '1401/09/12',
        maxPrice: 30000,
        seatCount: 0,
        dayPart: [],
      },
      resultList: [
        {
          price: 14550000,
          time: 0,
          seatCount: 0,
        },
        {
          price: 1450000000,
          time: 0,
          seatCount: 0,
        },
      ],
    },
  ];

  static jobListSignal = new SignalInterface('job-list');
  static jobAddSignal = new SignalInterface('job-add');
  static cityListTemplate = Object.keys(cityList).map(
      (city) => html`<ion-select-option value=${city}>${city} - ${cityList[city]}</ion-select-option>`,
  );
  static seatListTemplate = Array.from(Array(9).keys()).map((seatNumber) => {
    return html`
      <ion-select-option value=${++seatNumber}> ${seatNumber.toLocaleString('fa-IR')} صندلی </ion-select-option>
    `;
  });
  static dayPartListTemplate = dayPartList.map((part) => {
    return html` <ion-select-option value=${part}> ${i18nDayPartList[part]} </ion-select-option> `;
  });
  static dayListTemplate = Array.from(Array(31).keys()).map((dayNumber) => {
    return html` <ion-select-option value=${++dayNumber}> ${dayNumber.toLocaleString('fa-IR')} </ion-select-option> `;
  });
  static monthListTemplate = Array.from(Array(12).keys()).map((monthNumber) => {
    const month = new Date(0, monthNumber + 3).toLocaleDateString('fa-IR', {month: 'long'});

    return html`<ion-select-option value=${++monthNumber}>${month}</ion-select-option>`;
  });
  private __newJob: Partial<NewJobFilter> = {};

  override connectedCallback(): void {
    super.connectedCallback();

    PageFlightFinder.jobListSignal.addListener((jobList) => {
      this.__jobList = jobList;
    });
  }

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>پرواز یاب</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen> ${this.__renderAirlineListCard()} ${this.__renderForm()} </ion-content>
    `;
  }

  private __renderAirlineListCard(): TemplateResult {
    const airlineItemList = map(this.__jobList, (airline) => html` <job-item .job=${airline}></job-item> `);

    return html`
      <ion-card class="airline__list">
        <ion-card-header>
          <ion-card-title>لیست پرواز ها</ion-card-title>
          <ion-card-subtitle> ۱۲۳ ثانیه پیش </ion-card-subtitle>
        </ion-card-header>

        <ion-list lines="full"> ${airlineItemList} </ion-list>
      </ion-card>
    `;
  }

  private __renderForm(): TemplateResult {
    return html`
      <ion-card class="form">
        <ion-card-header>
          <ion-card-title>درخواست جدید</ion-card-title>
        </ion-card-header>

        <ion-list>
          <div class="form__input-row">
            <ion-item fill="solid">
              <ion-label position="floating">مبدأ</ion-label>
              <ion-select name="origin" ok-text="تایید" cancel-text="لغو" @ionChange=${this.__inputChanged}>
                ${PageFlightFinder.cityListTemplate}
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">مقصد</ion-label>
              <ion-select name="dest" ok-text="تایید" cancel-text="لغو" @ionChange=${this.__inputChanged}>
                ${PageFlightFinder.cityListTemplate}
              </ion-select>
            </ion-item>
          </div>
          <ion-item fill="solid">
            <ion-label position="floating">توضیحات</ion-label>
            <ion-input name="description" type="text" debounce="30" @ionChange=${this.__inputChanged}></ion-input>
          </ion-item>
          <div class="form__input-row">
            <ion-item fill="solid">
              <ion-label position="floating">روز</ion-label>
              <ion-select name="day" interface="popover" @ionChange=${this.__inputChanged}>
                ${PageFlightFinder.dayListTemplate}
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">ماه</ion-label>
              <ion-select name="month" interface="popover" @ionChange=${this.__inputChanged}>
                ${PageFlightFinder.monthListTemplate}
              </ion-select>
            </ion-item>
          </div>
          <ion-item fill="solid">
            <ion-label position="floating">تعداد صندلی</ion-label>
            <ion-select name="seatCount" interface="popover" @ionChange=${this.__inputChanged}>
              ${PageFlightFinder.seatListTemplate}
            </ion-select>
          </ion-item>
          <ion-item fill="solid">
            <ion-label position="floating">بخش روز</ion-label>
            <ion-select name="dayPart" ok-text="تایید" cancel-text="لغو" multiple @ionChange=${this.__inputChanged}>
              ${PageFlightFinder.dayPartListTemplate}
            </ion-select>
          </ion-item>
          <ion-item fill="solid">
            <ion-label position="floating">حداکثر قیمت</ion-label>
            <ion-input name="maxPrice" type="number" debounce="30" @ionChange=${this.__inputChanged}></ion-input>
            <ion-note slot="helper">${this.__maxPriceHelper}</ion-note>
          </ion-item>
          <ion-button class="form-btn" expand="block" ?disabled=${!this.__formValidate} @click=${this.__submit}>
            ارسال
          </ion-button>
        </ion-list>
      </ion-card>
    `;
  }

  private __submit(event: PointerEvent): void {
    this._logger.logMethodArgs('__submit', {
      newJob: this.__newJob,
      event,
    });

    const newJobData = this.__newJob as Required<NewJobFilter>;
    const currentYear = new Date().toLocaleDateString('fa-IR', {
      numberingSystem: 'latn',
      year: 'numeric',
    });

    PageFlightFinder.jobAddSignal.dispatch({
      filter: {
        dest: newJobData.dest,
        origin: newJobData.origin,
        dayPart: newJobData.dayPart,
        maxPrice: newJobData.maxPrice,
        seatCount: newJobData.seatCount,
        description: newJobData.description,
        date: `${currentYear}/${newJobData.month}/${newJobData.day}`,
      },
    });
  }

  private __inputChanged(
      event: InputCustomEvent | SelectCustomEvent<string> | SelectCustomEvent<Array<dayParts>>,
  ): void {
    const name = event.target.name as keyof NewJobFilter | undefined;
    const value = event.detail.value;

    this._logger.logMethodArgs('__inputChanged', {name, value});

    if (name == null) return;

    this.requestUpdate();

    if (value == null) {
      delete this.__newJob[name];
      return;
    }

    if (name === 'maxPrice' || name === 'seatCount' || name === 'day' || name === 'month') {
      this.__newJob[name] = +value;
    }
    else if (name === 'dayPart') {
      this.__newJob[name] = value as Array<dayParts>;
    }
    else {
      this.__newJob[name] = value as string;
    }
  }

  private get __maxPriceHelper(): string {
    const maxPrice = (this.__newJob.maxPrice ?? 0).toLocaleString('fa-IR');

    return maxPrice + ' تومان';
  }

  private get __formValidate(): boolean {
    return Object.keys(this.__newJob).length >= 8;
  }
}
