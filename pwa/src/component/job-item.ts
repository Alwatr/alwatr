import {AlwatrElement} from '@alwatr/element';
import {css, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import '@alwatr/icon'; // TODO: preload icons after complete UI

import ionNormalize from '../style/ionic.normalize';
import ionTheming from '../style/ionic.theming';

import './ionic-components';

import type {Job, JobDetail, JobResult} from '../type';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'job-item': JobItem;
  }
}

export const i18nDayPartList: Record<JobDetail['dayPart'][0], string> = {
  earlyMorning: 'صبح زود',
  morning: 'صبح',
  midday: 'نیمه روز',
  afternoon: 'بعد از ظهر',
  evening: 'عصر',
  night: 'شب',
};
const i18nCityList: Record<string, string> = {
  MHD: 'مشهد',
  THR: 'تهران',
};

@customElement('job-item')
export class JobItem extends AlwatrElement {
  static override styles = [
    ionNormalize,
    ionTheming,
    css`
      :host {
        --ion-item-background: var(--ion-color-primary-contrast);
      }
      * {
        user-select: none;
      }

      .job::part(native) {
        align-items: flex-end;
      }
      .job ion-label {
        display: flex !important;
        flex-direction: column;
        justify-content: flex-end;
        gap: 0.1em;
        margin: 0;
        padding: 0.8em 0;
      }
      .job ion-label[slot='start'] {
        margin-inline-start: 0.5em;
      }
      .job ion-label[slot='end'] {
        margin-inline-end: 0.5em;
        height: 100%;
      }
      .job ion-label[slot='end'] * {
        text-align: end;
        justify-content: flex-end;
      }
      .job .job__title {
        font-size: 1em;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .job .job__title .job__title__arrow-icon {
        font-size: 1.3em;
        color: var(--ion-color-base);
      }
      .job .job__subtitle.job__subtitle-founded {
        margin-bottom: auto;
      }
      .job .job__subtitle {
        font-size: 0.9em;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--ion-color-step-600);
      }
      .job .job__subtitle .job__subtitle-price {
        color: var(--ion-color-base);
      }
    `,
  ];

  @property({attribute: false, type: Object}) job?: Job;

  override render(): TemplateResult | typeof nothing {
    if (this.job == null) return nothing;

    return html`
      <ion-item-sliding>
        <ion-item class="job" lines="full">
          <ion-label>
            ${this.__renderTitle(i18nCityList[this.job.detail.origin], i18nCityList[this.job.detail.dest])}
            ${this.__renderSubtitle(
      this.job.detail.date,
      this.job.detail.dayPart.map((part) => i18nDayPartList[part]).join(' - '),
  )}
            ${this.__renderDescription('بر عمر کار کشته لعنت')}
          </ion-label>
          <ion-label slot="end"> ${this.__renderFoundList(this.job.resultList)} </ion-label>
        </ion-item>

        <ion-item-options side="start">
          <ion-item-option color="danger">
            <alwatr-icon slot="icon-only" name="close-outline"></alwatr-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    `;
  }

  private __renderTitle(origin: string, destination: string): TemplateResult {
    return html`
      <div class="job__title">
        <span>${destination}</span>
        <alwatr-icon
          class="job__title__arrow-icon ion-color-primary"
          name="arrow-forward-outline"
          dir="rtl"
          flip-rtl
        ></alwatr-icon>
        <span>${origin}</span>
      </div>
    `;
  }

  private __renderSubtitle(date: string, time: string): TemplateResult {
    return html`
      <div class="job__subtitle">
        <span>${date}</span>
        <span>${time}</span>
      </div>
    `;
  }

  private __renderFoundList(resultList: Array<JobResult>): TemplateResult {
    if (resultList.length !== 0) {
      const lowestPrice = Math.min(...resultList.map((result) => result.price));
      return html`
        <div class="job__title">
          <span>${resultList.length.toLocaleString('fa')}</span>
          پرواز
        </div>
        <div class="job__subtitle job__subtitle-founded">
          <span class="job__subtitle-price ion-color-danger"> ${lowestPrice.toLocaleString('fa')} </span>
          <span> تومان </span>
        </div>
      `;
    }
    return html` <ion-note>یافت نشد</ion-note> `;
  }

  private __renderDescription(description: string): TemplateResult {
    return html` <ion-note>${description}</ion-note> `;
  }
}
