import {AlwatrElement} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';
import {css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';

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
    `,
  ];

  @state() private __jobList: Array<Job> = [];

  static jobListSignal = new SignalInterface('job-list');
  static jobAddSignal = new SignalInterface('job-add');
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
              <ion-select name="origin" @ionChange=${this.__inputChanged} interface="popover">
                <ion-select-option value="MHD">مشهد</ion-select-option>
                <ion-select-option value="THR">تهران</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">مقصد</ion-label>
              <ion-select name="dest" @ionChange=${this.__inputChanged} interface="popover">
                <ion-select-option value="MHD">مشهد</ion-select-option>
                <ion-select-option value="THR">تهران</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item fill="solid">
              <ion-label position="floating">تاریخ</ion-label>
              <ion-select name="date" @ionChange=${this.__inputChanged} interface="popover">
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
