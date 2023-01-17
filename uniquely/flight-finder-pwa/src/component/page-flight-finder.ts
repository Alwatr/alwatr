import {type TemplateResult, AlwatrSmartElement, map, customElement, query, css, html} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {SignalInterface} from '@alwatr/signal';
import {modalController} from '@ionic/core';

import ionNormalize from '../style/ionic.normalize.js';
import ionTheming from '../style/ionic.theming.js';

import type {Job} from '@alwatr/type/flight-finder.js';

import './job-item.js';
import './job-add-form.js';

declare global {
  interface HTMLElementTagNameMap {
    'page-flight-finder': PageFlightFinder;
  }
}

@customElement('page-flight-finder')
export class PageFlightFinder extends AlwatrSmartElement {
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

  static jobDocumentStorageSignal = new SignalInterface('job-document-storage');
  static jobAddSignal = new SignalInterface('job-add');

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

    timer.innerText = l10n.formatNumber(time);
  }

  override connectedCallback(): void {
    super.connectedCallback();

    l10n.resourceChangeSignal.addListener(() => {
      this.requestUpdate();
    });

    PageFlightFinder.jobDocumentStorageSignal.addListener((jobList) => {
      this.__jobList = Object.values(jobList.data);
      this.__lastUpdate = jobList.meta.lastUpdated;
      this.requestUpdate();
    });

    setInterval(this.__updateTimer, 3_000);
  }
  override render(): unknown {
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>${l10n.localize('flight_finder')}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen>
        ${this.__renderAirlineListCard()}

        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
          <ion-fab-button @click=${this.__addJobModal}>
            <alwatr-icon name="add-outline"></alwatr-icon>
          </ion-fab-button>
        </ion-fab>

        <div class="version">v{{ALWATR_VERSION}}</div>
      </ion-content>
    `;
  }

  private __renderAirlineListCard(): TemplateResult {
    return html`
      <ion-card class="job__list">
        <ion-card-header>
          <ion-card-title>${l10n.localize('search_list')}</ion-card-title>
          <ion-card-subtitle><span id="timer">-</span> ${l10n.localize('minutes_ago')}</ion-card-subtitle>
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
