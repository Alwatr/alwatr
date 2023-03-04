import {
  map,
  customElement,
  query,
  css,
  html,
  SignalMixin,
  AlwatrBaseElement,
  type TemplateResult,
} from '@alwatr/element';
import {message, number} from '@alwatr/i18n';
import {requestableContextConsumer} from '@alwatr/signal';
import {modalController} from '@ionic/core';

import './job-add-form.js';
import './job-item.js';
import ionNormalize from '../style/ionic.normalize.js';
import ionTheming from '../style/ionic.theming.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Job} from '@alwatr/type/flight-finder.js';


declare global {
  interface HTMLElementTagNameMap {
    'page-flight-finder': PageFlightFinder;
  }
}

@customElement('page-flight-finder')
export class PageFlightFinder extends SignalMixin(AlwatrBaseElement) {
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
      ion-card.job__list {
        --ion-item-background: var(--ion-color-primary-contrast);
      }
      ion-card.job__list .nothing {
        display: flex;
        justify-content: center;
      }

      #timer {
        display: inline-block;
        min-width: 23px;
      }

      .version {
        direction: ltr;
        margin: 0 16px 8px;
        font-size: 0.7em;
      }
    `,
  ];

  static jobDocumentStorageContextConsumer =
    requestableContextConsumer.bind<AlwatrDocumentStorage<Job>, null>('job-document-storage');

  private __jobList?: Array<Job>;
  private __lastUpdate = 0;
  @query('#timer') protected _timer?: HTMLSpanElement;

  constructor() {
    super();
    this.__updateTimer = this.__updateTimer.bind(this);
  }

  private __updateTimer(): void {
    const timer = this._timer;
    if (timer == null || this.__lastUpdate === 0) return;

    const time = Math.floor((Date.now() - this.__lastUpdate) / 6_000) / 10;

    timer.innerText = number(time);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    PageFlightFinder.jobDocumentStorageContextConsumer.subscribe((jobList) => {
      this.__jobList = Object.values(jobList.data);
      this.__lastUpdate = jobList.meta.lastUpdated;
      this.requestUpdate();
    });

    setInterval(this.__updateTimer, 3_000);
  }
  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>${message('flight_finder')}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen>
        ${this.__renderAirlineListCard()}

        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
          <ion-fab-button @click=${this.__addJobModal}>
            <alwatr-icon .name=${'add-outline'}></alwatr-icon>
          </ion-fab-button>
        </ion-fab>

        <div class="version">v${_ALWATR_VERSION_}</div>
      </ion-content>
    `;
  }

  private __renderAirlineListCard(): TemplateResult {
    return html`
      <ion-card class="job__list">
        <ion-card-header>
          <ion-card-title>${message('search_list')}</ion-card-title>
          <ion-card-subtitle><span id="timer">-</span> ${message('minutes_ago')}</ion-card-subtitle>
        </ion-card-header>

        <ion-list lines="full">
          ${map(this.__jobList, (airline) => html`<job-item .job=${airline}></job-item>`)}
        </ion-list>
      </ion-card>
    `;
  }

  private async __addJobModal(): Promise<void> {
    const modal = await modalController.create({
      component: 'job-add-form',
    });

    modal.addEventListener('close', () => {
      modal.dismiss();
    });

    await modal.present();
  }
}
