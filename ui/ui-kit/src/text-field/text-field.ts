import {css, customElement, html, property, ifDefined, type PropertyValues} from '@alwatr/element';
import '@alwatr/icon';
import {UnicodeDigits} from '@alwatr/math';

import {AlwatrSurface} from '../card/surface.js';

const unicodeDigits = new UnicodeDigits('en');

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-text-field': AlwatrTextField;
  }
}

export type InputType =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'password'
  | 'datetime'
  | 'date'
  | 'month'
  | 'week'
  | 'time'
  | 'datetime-local'
  | 'number';

/**
 * Alwatr outlined text field.
 *
 * @attr {String} name
 */
@customElement('alwatr-text-field')
export class AlwatrTextField extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
        display: inline-block;
        box-sizing: border-box;
        padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
        font-family: var(--sys-typescale-body-large-font-family-name);
        font-weight: var(--sys-typescale-body-large-font-weight);
        font-size: var(--sys-typescale-body-large-font-size);
        letter-spacing: var(--sys-typescale-body-large-letter-spacing);
        line-height: var(--sys-typescale-body-large-line-height);
        border-radius: var(--sys-radius-xsmall);
        background-color: transparent;
      }

      :host([stated][outlined]:hover) {
        --_surface-elevation: var(--sys-surface-elevation-0);
      }

      input {
        display: block;
        padding: 0;
        font: inherit;
        width: 100%;
        box-sizing: border-box;
        border-radius: inherit;
        border: none;
        outline: transparent;
        text-align: inherit;
        background-color: transparent;
        color: var(--sys-color-on-surface);
        caret-color: var(--sys-color-primary);
      }

      /* So not group these selectors! */
      input::placeholder {
        font: inherit;
        color: var(--sys-color-on-surface-variant);
      }
      input::-webkit-input-placeholder {
        font: inherit;
        color: var(--sys-color-on-surface-variant);
      }
      input::-moz-placeholder {
        font: inherit;
        color: var(--sys-color-on-surface-variant);
      }

      input[type=number] {
        -moz-appearance: textfield;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ];

  name = this.getAttribute('name') ?? 'unknown';

  @property({type: String})
    type: InputType = 'text';

  @property({type: String})
    placeholder?: string;

  inputElement: HTMLInputElement | null = null;

  get value(): string {
    let val = unicodeDigits.translate(this.inputElement?.value ?? '');
    if (this.type === 'number' || this.type === 'tel') {
      val = val.replaceAll(' ', '');
    }
    return val;
  }
  set value(val: string) {
    if (this.inputElement != null) {
      this.inputElement.value = val;
    }
    else {
      this.updateComplete.then(() => {this.value = val;});
    }
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`<input type=${this.type} placeholder=${ifDefined(this.placeholder)}></input>`;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.inputElement = this.renderRoot.querySelector('input');
    this.addEventListener('click', () => this.inputElement?.focus());
  }
}
