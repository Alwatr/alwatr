import {customElement, AlwatrSmartElement, css, html, map} from '@alwatr/element';
import '@alwatr/ui-kit/text-field/text-field.js';
import '@alwatr/ui-kit/button/button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-lottery-form': AlwatrLotteryForm;
  }
}

const _activityType = ['پخش کننده تایل', 'نصاب تایل', 'فروشنده و مغازه‌دار', 'پیمانکار', 'سازنده', 'سایر'];

/**
 * Soffit lottery form element
 */
@customElement('alwatr-lottery-form')
export class AlwatrLotteryForm extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
    }

    alwatr-text-field {
      margin-top: var(--sys-spacing-track);
    }
    alwatr-text-field:first-of-type {
      margin-top: 0;
    }

    fieldset {
      display: block;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-weight: var(--sys-typescale-body-large-font-weight);
      font-size: var(--sys-typescale-body-large-font-size);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      line-height: var(--sys-typescale-body-large-line-height);
      border: 1px solid var(--sys-color-outline);
      border-radius: var(--sys-radius-xsmall);
      background-color: transparent;
      margin: var(--sys-spacing-track) 0;
    }

    fieldset:active,
    fieldset:focus,
    fieldset:focus-within {
      border-color: var(--sys-color-primary);
    }

    fieldset legend {
      padding: 0 var(--sys-spacing-track);
    }

    fieldset div {
      margin-top: var(--sys-spacing-track);
    }
    fieldset div:first-of-type {
      margin-top: 0;
    }

    fieldset label,
    input[type='radio'] {
      display: inline-block;
      vertical-align: middle;
      margin: 0;
    }

    input[type='radio'] {
      width: 20px;
      height: 20px;
      accent-color: var(--sys-color-primary);
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-text-field
        id="code"
        type="text"
        outlined
        active-outline
        stated
        placeholder="شماره قرعه‌کشی"
      ></alwatr-text-field>
      <alwatr-text-field
        id="name"
        type="text"
        outlined
        active-outline
        stated
        placeholder="نام و نام‌خانوادگی"
      ></alwatr-text-field>
      <alwatr-text-field
        id="phone"
        type="tel"
        outlined
        active-outline
        stated
        placeholder="شماره موبایل"
      ></alwatr-text-field>
      <fieldset>
        <legend>نوع فعالیت:</legend>
        ${this._radioButtonTemplate()}
      </fieldset>
      <alwatr-button outlined>ارسال فرم</alwatr-button>
    `;
  }

  protected _radioButtonTemplate(): unknown {
    return map(_activityType, (activity, index) => {
      const id = 'activityType' + index;
      return html`<div>
        <input type="radio" id=${id} name="activity" value="${activity}" />
        <label for=${id}>${activity}</label>
      </div>`;
    });
  }
}
