import {AlwatrElement} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';
import {css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';

import {cityList} from '../city-list';
import ionNormalize from '../style/ionic.normalize';
import ionTheming from '../style/ionic.theming';

import './job-item';

import type {Job, JobFilter} from '../type';
import type {InputCustomEvent, SelectCustomEvent} from '@ionic/core';
import type {TemplateResult} from 'lit';

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
      ion-card.form .form__input-date {
        display: flex;
      }
      ion-card.form .form__input-date ion-item {
        flex: 1 1 0;
      }
      ion-card.form .form__input-date ion-item::part(native) {
        height: 100%;
      }
      ion-card.form .form__input-date ion-item:last-child {
        margin-right: 0;
      }
    `,
  ];

  @state() private __jobList: Array<Job> = [
    {
      _id: '2',
      filter: {
        dest: 'MHD',
        origin: 'THR',
        dayPart: ['afternoon'],
        date: '1401/09/10',
        maxPrice: 389000,
      },
      resultList: [],
    },
    {
      _id: '3',
      filter: {
        dest: 'THR',
        origin: 'MHD',
        dayPart: ['earlyMorning'],
        date: '1401/09/12',
        maxPrice: 30000,
      },
      resultList: [
        {
          price: 10000,
          time: 0,
          seatCount: 0,
        },
        {
          price: 12000,
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
  private __newJob: Partial<JobFilter> = {};

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

        <ion-card-content>
          <ion-list lines="full"> ${airlineItemList} </ion-list>
        </ion-card-content>
      </ion-card>
    `;
  }

  private __renderForm(): TemplateResult {
    return html`
      <ion-card class="form">
        <ion-card-header>
          <ion-card-title>درخواست جدید</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item fill="solid">
              <ion-label position="floating">مبدأ</ion-label>
              <ion-select name="origin" @ionChange=${this.__inputChanged}>
                ${PageFlightFinder.cityListTemplate}
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">مقصد</ion-label>
              <ion-select name="dest" @ionChange=${this.__inputChanged}>
                ${PageFlightFinder.cityListTemplate}
              </ion-select>
            </ion-item>
            <div class="form__input-date">
              <ion-item fill="solid">
                <ion-label position="floating">روز</ion-label>
                <ion-select interface="popover">
                  <ion-select-option value="dy1">1</ion-select-option>
                  <ion-select-option value="dy2">2</ion-select-option>
                  <ion-select-option value="dy3">3</ion-select-option>
                  <ion-select-option value="dy4">4</ion-select-option>
                  <ion-select-option value="dy5">5</ion-select-option>
                  <ion-select-option value="dy6">6</ion-select-option>
                  <ion-select-option value="dy7">7</ion-select-option>
                  <ion-select-option value="dy8">8</ion-select-option>
                  <ion-select-option value="dy9">9</ion-select-option>
                  <ion-select-option value="dy10">10</ion-select-option>
                  <ion-select-option value="dy11">11</ion-select-option>
                  <ion-select-option value="dy12">12</ion-select-option>
                  <ion-select-option value="dy13">13</ion-select-option>
                  <ion-select-option value="dy14">14</ion-select-option>
                  <ion-select-option value="dy15">15</ion-select-option>
                  <ion-select-option value="dy16">16</ion-select-option>
                  <ion-select-option value="dy17">17</ion-select-option>
                  <ion-select-option value="dy18">18</ion-select-option>
                  <ion-select-option value="dy19">19</ion-select-option>
                  <ion-select-option value="dy20">20</ion-select-option>
                  <ion-select-option value="dy21">21</ion-select-option>
                  <ion-select-option value="dy22">22</ion-select-option>
                  <ion-select-option value="dy23">23</ion-select-option>
                  <ion-select-option value="dy24">24</ion-select-option>
                  <ion-select-option value="dy25">25</ion-select-option>
                  <ion-select-option value="dy26">26</ion-select-option>
                  <ion-select-option value="dy27">27</ion-select-option>
                  <ion-select-option value="dy28">28</ion-select-option>
                  <ion-select-option value="dy29">29</ion-select-option>
                  <ion-select-option value="dy30">30</ion-select-option>
                  <ion-select-option value="dy31">31</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item fill="solid">
                <ion-label position="floating">ماه</ion-label>
                <ion-select interface="popover">
                  <ion-select-option value="dy1">1</ion-select-option>
                  <ion-select-option value="dy2">2</ion-select-option>
                  <ion-select-option value="dy3">3</ion-select-option>
                  <ion-select-option value="dy4">4</ion-select-option>
                  <ion-select-option value="dy5">5</ion-select-option>
                  <ion-select-option value="dy6">6</ion-select-option>
                  <ion-select-option value="dy7">7</ion-select-option>
                  <ion-select-option value="dy8">8</ion-select-option>
                  <ion-select-option value="dy9">9</ion-select-option>
                  <ion-select-option value="dy10">10</ion-select-option>
                  <ion-select-option value="dy11">11</ion-select-option>
                  <ion-select-option value="dy12">12</ion-select-option>
                </ion-select>
              </ion-item>
            </div>
            <ion-item fill="solid">
              <ion-label position="floating">زمان</ion-label>
              <ion-select name="dayPart" @ionChange=${this.__inputChanged} interface="popover">
                <ion-select-option value="morning">صبح</ion-select-option>
                <ion-select-option value="evening">عصر</ion-select-option>
                <ion-select-option value="night">شب</ion-select-option>
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
        </ion-card-content>
      </ion-card>
    `;
  }

  private __submit(event: PointerEvent): void {
    this._logger.logMethodArgs('__submit', {
      newJob: this.__newJob,
      event,
    });

    PageFlightFinder.jobAddSignal.dispatch({
      filter: this.__newJob as Required<typeof this.__newJob>,
    });
  }

  private __inputChanged(event: InputCustomEvent | SelectCustomEvent<string>): void {
    const name = event.target.name as string | undefined;
    const value = event.detail.value as string | undefined;

    this._logger.logMethodArgs('__inputChanged', {name, value});

    if (name == null) return;

    this.requestUpdate();

    if (value == null || value.trim() == '') {
      delete this.__newJob[name];
      return;
    }

    if (name === 'maxPrice') {
      this.__newJob[name] = +value;
    }
    else {
      this.__newJob[name] = value;
    }
  }

  private get __maxPriceHelper(): string {
    const maxPrice = (this.__newJob.maxPrice ?? 0).toLocaleString('fa-IR');

    return maxPrice + ' تومان';
  }

  private get __formValidate(): boolean {
    return Object.keys(this.__newJob).length === 5;
  }
}
