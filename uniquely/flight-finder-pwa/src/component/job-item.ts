import {
  customElement,
  property,
  query,
  when,
  css,
  html,
  nothing,
  SignalMixin,
  AlwatrBaseElement,
  type TemplateResult,
} from '@alwatr/element';
import {message, number} from '@alwatr/i18n';
import '@alwatr/icon';
import {eventTrigger} from '@alwatr/signal';

import './ionic-components.js';
import {cityList} from '../city-list.js';
import ionNormalize from '../style/ionic.normalize.js';
import ionTheming from '../style/ionic.theming.js';

import type {Job, JobResult} from '@alwatr/type/flight-finder.js';

declare global {
  interface HTMLElementTagNameMap {
    'job-item': JobItem;
  }
}

@customElement('job-item')
export class JobItem extends SignalMixin(AlwatrBaseElement) {
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

      ion-item-options {
        -ms-flex-pack: start;
        justify-content: flex-start;
      }
    `,
  ];

  @property({attribute: false, type: Object}) job?: Job;
  @query('ion-item-sliding') private __ionItemSliding?: HTMLElement;

  static jobDeleteEventTrigger = eventTrigger.bind('job-delete');

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.job == null || this.job.detail == null) return nothing;

    return html`
      <ion-item-sliding @dblclick=${this.__openSliding}>
        <ion-item class="job" lines="full">
          <ion-label>
            ${this.__renderTitle(cityList[this.job.detail.origin], cityList[this.job.detail.destination])}
            ${this.__renderSubtitle(this.job.detail.date, this.job.detail.minHour, this.job.detail.maxHour)}
            ${this.__renderDescription(this.job.detail.description)}
          </ion-label>
          <ion-label slot="end"> ${this.__renderFoundList(this.job.resultList)} </ion-label>
        </ion-item>

        <ion-item-options side="start">
          <ion-item-option color="danger" @click=${this.__delete}>
            <alwatr-icon slot="icon-only" name="close-outline"></alwatr-icon>
          </ion-item-option>
        </ion-item-options>
        <ion-item-options side="end"> </ion-item-options>
      </ion-item-sliding>
    `;
  }

  private __renderTitle(origin: string, destination: string): TemplateResult {
    return html`
      <div class="job__title">
        <span>${origin}</span>
        <alwatr-icon
          class="job__title__arrow-icon ion-color-primary"
          name="arrow-forward-outline"
          dir="rtl"
          flip-rtl
        ></alwatr-icon>
        <span>${destination}</span>
      </div>
    `;
  }
  private __renderSubtitle(date: string, minHour: number | null, maxHour: number | null): TemplateResult {
    return html`
      <div class="job__subtitle">
        <span>${date}</span>
      </div>
      ${when(
      minHour != null && maxHour != null,
      () => html`
          <div class="job__subtitle">
            <span> از ${minHour} تا ${maxHour} </span>
          </div>
        `,
  )}
    `;
  }
  private __renderFoundList(resultList: Array<JobResult>): TemplateResult {
    if (resultList.length !== 0) {
      const lowestPrice = Math.min(...resultList.map((result) => result.price));
      return html`
        <div class="job__title">
          <span>${number(resultList.length)}</span>
          ${message('flight')}
        </div>
        <div class="job__subtitle job__subtitle-founded">
          <span class="job__subtitle-price ion-color-danger"> ${number(lowestPrice)} </span>
          <span>${message('config_currency')}</span>
        </div>
      `;
    }
    return html` <ion-note>${message('not_found')}</ion-note> `;
  }
  private __renderDescription(description: string): TemplateResult | typeof nothing {
    if (description.trim() == '') return nothing;

    return html` <ion-note>${description}</ion-note> `;
  }

  private __delete(): void {
    if (this.job?.id == null) {
      this._logger.incident('__delete', 'null_job_id', 'Job ID in null.');
      return;
    }

    JobItem.jobDeleteEventTrigger.dispatch(this.job.id);
  }
  private async __openSliding(): Promise<void> {
    if (this.__ionItemSliding == null) return;

    const itemSliding = this.__ionItemSliding as HTMLIonItemSlidingElement;

    if ((await itemSliding.getSlidingRatio()) > 0) {
      await itemSliding.closeOpened();
    }
    else {
      await itemSliding.open('start');
    }
  }
}
