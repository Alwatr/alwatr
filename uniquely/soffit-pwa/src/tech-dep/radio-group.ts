import {customElement, css, html, map, AlwatrDummyElement} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-radio-group': AlwatrFieldSet;
  }
}

const _activityType = ['پخش کننده تایل', 'نصاب تایل', 'فروشنده و مغازه‌دار', 'پیمانکار', 'سازنده', 'سایر'];

/**
 * Alwatr fieldset element
 */
@customElement('alwatr-radio-group')
export class AlwatrFieldSet extends AlwatrDummyElement {
  static override styles = css`
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
      <fieldset id="activity">
        <legend>نوع فعالیت:</legend>
        ${this._inputTemplate()}
      </fieldset>
    `;
  }

  protected _inputTemplate(): unknown {
    return map(_activityType, (activity, index) => {
      const id: string = 'activityType' + index;
      return html`<div>
        <input type="radio" id=${id} name="activity" value="${activity}" />
        <label for=${id}>${activity}</label>
      </div>`;
    });
  }
}
