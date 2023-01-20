import {customElement, AlwatrSmartElement, css, html, map, query} from '@alwatr/element';
import {fetch} from '@alwatr/fetch';

import {config} from './config.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-form': AlwatrPageForm;
  }
}

const activityType = ['پخش کننده تایل', 'نصاب تایل', 'فروشنده و مغازه‌دار', 'پیمانکار', 'سازنده', 'سایر'];

/**
 * Soffit Form Page
 */
@customElement('alwatr-page-form')
export class AlwatrPageForm extends AlwatrSmartElement {
  constructor() {
    super();
    this._submitForm = this._submitForm.bind(this);
  }

  static override styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }

    :host::-webkit-scrollbar {
      width: var(--sys-scrollbar-size);
      height: var(--sys-scrollbar-size);
    }

    :host::-webkit-scrollbar-corner,
    :host::-webkit-scrollbar-track {
      background-color: var(--sys-scrollbar-background);
    }

    :host::-webkit-scrollbar-track {
      margin: var(--sys-spacing-track);
    }

    :host::-webkit-scrollbar-thumb {
      background-color: var(--sys-scrollbar-color);
      border-radius: var(--sys-scrollbar-radius);
    }

    :host(:hover)::-webkit-scrollbar-thumb {
      background-color: var(--sys-scrollbar-color-hover);
    }

    main {
      width: 100%;
      box-sizing: border-box;
      padding: calc(5 * var(--sys-spacing-track)) calc(2 * var(--sys-spacing-track));
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: calc(2 * var(--sys-spacing-track));
    }

    form {
      width: 80vw;
      padding: calc(2 * var(--sys-spacing-track));
    }

    form > * {
      margin: calc(2 * var(--sys-spacing-track)) 0;
    }

    input,
    button {
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-weight: var(--sys-typescale-body-large-font-weight);
      font-size: var(--sys-typescale-body-large-font-size);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      line-height: var(--sys-typescale-body-large-line-height);
    }

    input[type='text'],
    input[type='tel'] {
      box-sizing: border-box;
      width: 100%;
      padding: calc(2 * var(--sys-spacing-track));
      color: var(--sys-color-on-surface);
      background-color: inherit;
      border: 1px solid var(--sys-color-outline);
      border-radius: var(--sys-radius-xsmall);
      line-height: calc(2 * var(--sys-spacing-track));
    }
    input[type='radio'] {
      accent-color: var(--sys-color-primary);
      width: var(--sys-typescale-body-large-line-height);
      height: var(--sys-typescale-body-large-line-height);
    }
    input::placeholder {
      color: var(--sys-color-on-surface-variant);
    }
    input:hover {
      border: 1px solid var(--sys-color-on-surface);
    }
    input:focus {
      border: 2px solid var(--sys-color-primary);
    }

    button {
      width: 100%;
      padding: calc(2 * var(--sys-spacing-track));
      color: var(--sys-color-on-primary);
      background-color: var(--sys-color-primary);
      border: none;
      border-radius: 9999px;
      box-shadow: var(--sys-surface-elevation-0);
      cursor: pointer;
      transition: box-shadow var(--sys-motion-duration-small) var(--sys-motion-easing-linear);
    }
    button:hover {
      box-shadow: var(--sys-surface-elevation-1);
    }
    button:focus {
      box-shadow: var(--sys-surface-elevation-0);
    }

    .radio-button-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--sys-spacing-track);
      flex-wrap: wrap;
    }
    .radio-button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: calc(2 * var(--sys-spacing-track));
    }
  `;

  @query('form')
    form?: HTMLFormElement;

  protected async _submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    await fetch({
      url: config.apiUrl + '/',
      token: config.apiAccessToken,
      method: 'PUT',
      bodyJson: {
        lotteryCode: (form.elements.namedItem('lottery-code') as HTMLInputElement).value,
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        phoneNumber: (form.elements.namedItem('phone-number') as HTMLInputElement).value,
        activityType: (form.elements.namedItem('activity-type') as HTMLInputElement).value,
      },
    });
  }

  protected override firstUpdated(): void {
    this.form?.addEventListener('submit', this._submitForm);
  }

  override render(): unknown {
    super.render();
    return html`
      <main>
        <h1>فرم ثبت کد قرعه کشی</h1>
        <form>
          <input type="text" name="lottery-code" placeholder="شماره قرعه کشی" />
          <input type="text" name="name" placeholder="نام و نام‌خانوادگی" />
          <input type="tel" name="phone-number" placeholder="شماره موبایل" />
          <div class="radio-button-container">${this._renderRadioButtons()}</div>
          <button type="submit">ارسال فرم</button>
        </form>
      </main>
    `;
  }

  protected _renderRadioButtons(): unknown {
    return map(
        activityType,
        (activity) => html`<span class="radio-button">
        <input type="radio" name="activity-type" value="${activity}" />
        <label>${activity}</label>
      </span>`,
    );
  }
}
