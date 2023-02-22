import {customElement, css, html} from '@alwatr/element';
import {message, localeContextConsumer, number} from '@alwatr/i18n';
import {eventTrigger} from '@alwatr/signal';

import './ionic-components';
import {cityList} from '../city-list.js';
import ionNormalize from '../style/ionic.normalize.js';
import ionTheming from '../style/ionic.theming.js';

import type {NewJobDetail} from '../type.js';
import type {InputCustomEvent, SelectCustomEvent} from '@ionic/core';

declare global {
  interface HTMLElementTagNameMap {
    'job-add-form': JobAddForm;
  }
}

@customElement('job-add-form')
export class JobAddForm extends SignalMixin(AlwatrBaseElement) {
  static override styles = [
    ionNormalize,
    ionTheming,
    css`
      ion-card.form {
        --ion-item-background: var(--ion-color-primary-contrast);
      }
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

  static jobAddEventTrigger = eventTrigger.bind('job-add');

  static cityListTemplate = Object.keys(cityList).map(
      (city) => html`<ion-select-option value=${city}>${city} - ${cityList[city]}</ion-select-option>`,
  );
  static seatListTemplate = Array.from(Array(9).keys()).map((seatNumber) => {
    return html`
      <ion-select-option value=${++seatNumber}> ${seatNumber.toLocaleString('fa-IR')} صندلی </ion-select-option>
    `;
  });
  static dayListTemplate = Array.from(Array(31).keys()).map((dayNumber) => {
    return html` <ion-select-option value=${++dayNumber}> ${dayNumber.toLocaleString('fa-IR')} </ion-select-option> `;
  });
  static monthListTemplate = Array.from(Array(12).keys()).map((monthNumber) => {
    const month = new Date(0, monthNumber + 3).toLocaleDateString('fa-IR', {month: 'long'});

    return html`<ion-select-option value=${++monthNumber}>${month}</ion-select-option>`;
  });
  static hourListTemplate = Array.from(Array(24).keys()).map((hourNumber) => {
    return html` <ion-select-option value=${hourNumber}> ${hourNumber.toLocaleString('fa-IR')} </ion-select-option> `;
  });
  private __newJob: Partial<NewJobDetail> = {
    seatCount: 1,
  };

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <ion-header>
        <ion-toolbar color="secondary">
          <ion-title>افزودن درخواست</ion-title>

          <ion-buttons slot="end">
            <ion-button @click=${this.__close}>
              <alwatr-icon slot="icon-only" name="close-outline"></alwatr-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card class="form">
          <ion-card-header>
            <ion-card-title>درخواست جدید</ion-card-title>
          </ion-card-header>

          <ion-list>
            <div class="form__input-row">
              <ion-item fill="solid">
                <ion-label position="floating">${message('origin')}</ion-label>
                <ion-select
                  name="origin"
                  ok-text="${message('confirm')}"
                  cancel-text=${message('cancel')}
                  @ionChange=${this.__inputChanged}
                >
                  ${JobAddForm.cityListTemplate}
                </ion-select>
              </ion-item>
              <ion-item fill="solid">
                <ion-label position="floating">${message('destination')}</ion-label>
                <ion-select
                  name="destination"
                  ok-text=${message('confirm')}
                  cancel-text=${message('cancel')}
                  @ionChange=${this.__inputChanged}
                >
                  ${JobAddForm.cityListTemplate}
                </ion-select>
              </ion-item>
            </div>
            <ion-item fill="solid">
              <ion-label position="floating">${message('description')}</ion-label>
              <ion-input name="description" type="text" debounce="30" @ionChange=${this.__inputChanged}></ion-input>
            </ion-item>
            <div class="form__input-row">
              <ion-item fill="solid">
                <ion-label position="floating">${message('day')}</ion-label>
                <ion-select name="day" interface="popover" @ionChange=${this.__inputChanged}>
                  ${JobAddForm.dayListTemplate}
                </ion-select>
              </ion-item>
              <ion-item fill="solid">
                <ion-label position="floating">${message('month')}</ion-label>
                <ion-select name="month" interface="popover" @ionChange=${this.__inputChanged}>
                  ${JobAddForm.monthListTemplate}
                </ion-select>
              </ion-item>
            </div>
            <ion-item fill="solid">
              <ion-label position="floating">${message('seat_count')}</ion-label>
              <ion-select
                name="seatCount"
                interface="popover"
                .value=${this.__newJob.seatCount?.toString() ?? '1'}
                @ionChange=${this.__inputChanged}
              >
                ${JobAddForm.seatListTemplate}
              </ion-select>
            </ion-item>
            <div class="form__input-row">
              <ion-item fill="solid">
                <ion-label position="floating">${message('from_hour')}</ion-label>
                <ion-select name="minHour" interface="popover" @ionChange=${this.__inputChanged}>
                  ${JobAddForm.hourListTemplate}
                </ion-select>
              </ion-item>
              <ion-item fill="solid">
                <ion-label position="floating">${message('to_hour')}</ion-label>
                <ion-select name="maxHour" interface="popover" @ionChange=${this.__inputChanged}>
                  ${JobAddForm.hourListTemplate}
                </ion-select>
              </ion-item>
            </div>
            <ion-item fill="solid">
              <ion-label position="floating">${message('maximum_price')}</ion-label>
              <ion-input name="maxPrice" type="number" debounce="30" @ionChange=${this.__inputChanged}></ion-input>
              <ion-note slot="helper">${this.__maxPriceHelper}</ion-note>
            </ion-item>
            <ion-button class="form-btn" expand="block" ?disabled=${!this.__formValidate} @click=${this.__submit}>
              ${message('send')}
            </ion-button>
          </ion-list>
        </ion-card>
      </ion-content>
    `;
  }

  private __submit(event: PointerEvent): void {
    this._logger.logMethodArgs('__submit', {
      newJob: this.__newJob,
      event,
    });

    let currentYear = +new Date().toLocaleDateString(localeContextConsumer.getValue()?.code, {
      numberingSystem: 'latn',
      year: 'numeric',
    });

    const currentMonth = +new Date().toLocaleDateString(localeContextConsumer.getValue()?.code, {
      numberingSystem: 'latn',
      month: 'numeric',
    });

    if (this.__newJob.month as number < currentMonth) currentYear += 1;

    JobAddForm.jobAddEventTrigger.dispatch({
      detail: {
        destination: this.__newJob.destination as string,
        origin: this.__newJob.origin as string,
        maxHour: this.__newJob.maxHour ?? null,
        minHour: this.__newJob.minHour ?? null,
        maxPrice: this.__newJob.maxPrice ?? null,
        seatCount: this.__newJob.seatCount ?? 1,
        description: this.__newJob.description ?? '',
        date: `${currentYear}/${this.__newJob.month}/${this.__newJob.day}`,
      },
    });

    this.__close();
  }
  private __inputChanged(event: InputCustomEvent | SelectCustomEvent<string>): void {
    const name = event.target.name as keyof NewJobDetail | undefined;
    const value = event.detail.value;

    this._logger.logMethodArgs('__inputChanged', {name, value});

    if (name == null) return;

    this.requestUpdate();

    if (value == null || (typeof value === 'string' && value.trim() === '')) {
      delete this.__newJob[name];
      return;
    }

    if (name === 'origin' || name === 'destination' || name === 'description') {
      this.__newJob[name] = value as string;
    }
    else {
      this.__newJob[name] = +value;
    }
  }
  private __close(): void {
    this.parentElement?.dispatchEvent(new Event('close'));
  }

  private get __maxPriceHelper(): string {
    const maxPrice = number(this.__newJob.maxPrice ?? 0);

    return maxPrice + ' ' + message('config_currency');
  }
  private get __formValidate(): boolean {
    return Object.keys(this.__newJob).length >= 4;
  }
}
