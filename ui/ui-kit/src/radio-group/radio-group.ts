import {customElement, css, html, map, AlwatrBaseElement, property, nothing, live} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-radio-group': AlwatrRadioGroup;
  }
}

export interface RadioOption {label: string; value: string}

export interface RadioGroupOptions {
  title: string;
  radioGroup: RadioOption[];
}

/**
 * Alwatr fieldset element
 *
 * @attr {String} name
 */
@customElement('alwatr-radio-group')
export class AlwatrRadioGroup extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: block;
      transition: opacity var(--sys-motion-duration-small) var(--sys-motion-easing-normal);
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
      border-radius: var(--sys-radius-small);
      background-color: transparent;
      margin: var(--sys-spacing-track) 0 0;
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

  @property({type: Object})
    name = 'unknown';

  @property({type: Object})
    options?: RadioGroupOptions;

  @property({type: String})
    value?: string;

  override render(): unknown {
    this._logger.logMethod?.('render');
    return html`
      <fieldset>
        <legend>${this.options?.title}</legend>
        ${this._optionsTemplate()}
      </fieldset>
    `;
  }

  protected _optionsTemplate(): unknown {
    const options = this.options;
    if (options == null) return nothing;
    return map(options.radioGroup, (radioItem, index) => {
      const id: string = 'radioInput_' + index;
      return html`<div>
        <input
          type="radio"
          id=${id}
          .name=${this.name}
          .value=${radioItem.value}
          .checked=${live(radioItem.value === this.value)}
          @change=${this._inputChanged}
        />
        <label for=${id}>${radioItem.label}</label>
      </div>`;
    });
  }

  private _inputChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target == null) return;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input-change'));
  }
}
