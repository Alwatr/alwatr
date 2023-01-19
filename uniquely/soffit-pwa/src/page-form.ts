import {customElement, AlwatrSmartElement, css, html, map} from '@alwatr/element';

import '@alwatr/ui-kit/card/card.js';

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
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: calc(2 * var(--sys-spacing-track));
      gap: calc(2 * var(--sys-spacing-track));
    }

    main form {
      width: 40%;
      flex-grow: 1;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: calc(2 * var(--sys-spacing-track));
    }

    form > * {
      margin: calc(2 * var(--sys-spacing-track));
    }

    input {
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-weight: var(--sys-typescale-body-large-font-weight);
      font-size: var(--sys-typescale-body-large-font-size);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      line-height: var(--sys-typescale-body-large-line-height);
    }

    input[type='text'],
    input[type='tel'] {
      width: 80%;
      padding: calc(2 * var(--sys-spacing-track));
      color: var(--sys-color-on-surface);
      border: 1px solid var(--sys-color-outline);
      line-height: calc(2 * var(--sys-spacing-track));
      border-radius: var(--sys-radius-xsmall);
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
      font-family: var(--sys-typescale-label-large-font-family-name);
      font-weight: var(--sys-typescale-label-large-font-weight);
      font-size: var(--sys-typescale-label-large-font-size);
      letter-spacing: var(--sys-typescale-label-large-letter-spacing);
      line-height: var(--sys-typescale-label-large-line-height);

      color: var(--sys-color-surface);
      background-color: var(--sys-color-primary);
      border: none;
      border-radius: 9999px;
      padding: calc(2 * var(--sys-spacing-track));
      width: 100%;
      width: 100%;
    }

    alwatr-card {
      width: 80%;
      border-radius: 9999px;
      padding: 0;
      margin: 0;
    }

    .radio-button-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <main>
        <h1>فرم ثبت کد قرعه کشی</h1>
        <form>
          <input type="text" name="lottery-code" placeholder="شماره قرعه کشی" />
          <div class="radio-button-container">${this._renderRadioButtons()}</div>
          <input type="text" name="name" placeholder="نام و نام‌خانوادگی" />
          <input type="tel" name="phone-number" placeholder="شماره موبایل" />
          <alwatr-card elevated>
            <button type="submit">ارسال فرم</button>
          </alwatr-card>
        </form>
      </main>
    `;
  }

  protected _renderRadioButtons(): unknown {
    return map(
        activityType,
        (activity) => html`<div>
        <input type="radio" name="activity-type" value="${activity}" />
        <label>${activity}</label>
      </div>`,
    );
  }
}
