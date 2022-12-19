import {AlwatrElement} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {SignalInterface} from '@alwatr/signal';
import {modalController} from '@ionic/core';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';

import ionNormalize from '../style/ionic.normalize.js';
import ionTheming from '../style/ionic.theming.js';
import {getHumanTime} from '../util/human-time.js';

import './job-item.js';
import './job-add-form.js';

import type {Job} from '../type.js';
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

      .version {
        direction: ltr;
        margin: 0 16px 8px;
        font-size: 0.7em;
      }
    `,
  ];

  private __jobList: Array<Job> = [];
  private __relativeTime: string = '';

  static jobDataSignal = new SignalInterface('job-data');
  static jobAddSignal = new SignalInterface('job-add');
  static relativeTimeFormatter = new Intl.RelativeTimeFormat('fa-IR', {style: 'narrow'});

  override connectedCallback(): void {
    super.connectedCallback();

    l10n.resourceChangeSignal.addListener(() => {
      this.requestUpdate();
    });

    PageFlightFinder.jobDataSignal.addListener((jobList) => {
      this.__jobList = Object.values(jobList.data);

      const now = new Date().getTime();
      const relativeTimeObject = getHumanTime(now - (jobList.meta?.lastUpdated ?? now));

      this.__relativeTime = PageFlightFinder.relativeTimeFormatter.format(
        -Math.floor(relativeTimeObject.humanTime),
        relativeTimeObject.units
      );
      this.requestUpdate();
    });
  }
  override render(): TemplateResult {
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

        <div class="version">v${Alwatr.version}-prv3</div>
      </ion-content>
    `;
  }

  private __renderAirlineListCard(): TemplateResult {
    return html`
      <ion-card class="job__list">
        <ion-card-header>
          <ion-card-title>${l10n.localize('search_list')}</ion-card-title>
          <ion-card-subtitle>${this.__relativeTime}</ion-card-subtitle>
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
