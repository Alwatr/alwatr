import {css, customElement, html, property, live, type PropertyValues} from '@alwatr/element';
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
  | 'textarea'
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

      input,
      textarea {
        display: block;
        padding: 0;
        font: inherit;
        width: 100%;
        box-sizing: border-box;
        border-radius: inherit;
        border: none;
        outline: transparent;
        resize: none;
        text-align: inherit;
        background-color: transparent;
        color: var(--sys-color-on-surface);
        caret-color: var(--sys-color-primary);
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
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
      textarea::placeholder {
        font: inherit;
        color: var(--sys-color-on-surface-variant);
      }
      textarea::-webkit-input-placeholder {
        font: inherit;
        color: var(--sys-color-on-surface-variant);
      }
      textarea::-moz-placeholder {
        font: inherit;
        color: var(--sys-color-on-surface-variant);
      }
    `,
  ];

  @property({type: Object})
    name = 'unknown';

  @property({type: String})
    type: InputType = 'text';

  @property({type: String})
    value = '';

  @property({type: String})
    placeholder = '';

  inputElement: HTMLInputElement | HTMLTextAreaElement | null = null;

  constructor() {
    super();
    this._inputChanged = this._inputChanged.bind(this);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._click);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._click);
  }

  override render(): unknown {
    this._logger.logMethod('render');
    this.value ??= '';

    if (this.type === 'textarea') {
      return html`<textarea
        .name=${this.name}
        .placeholder=${this.placeholder}
        .value=${live(this.value)}
        .rows=${3}
        @change=${this._inputChanged}
      ></textarea>`;
    }
    // else
    return html`<input
      .name=${this.name}
      .type=${this.type}
      .placeholder=${this.placeholder}
      .value=${live(this.value)}
      @change=${this._inputChanged}
    ></input>`;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.inputElement = this.renderRoot.querySelector('input, textarea');
  }

  protected _click(): void {
    this.inputElement?.focus();
  }

  private _inputChanged(event: Event): void {
    this._logger.logMethod('_inputChanged');
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (target == null) return;
    let inputValue = unicodeDigits.translate(target.value ?? '');
    if (this.type === 'number' || this.type === 'tel') {
      inputValue = inputValue.replaceAll(' ', '');
    }
    this.value = inputValue;
    this.dispatchEvent(new CustomEvent('input-change'));
  }
}
