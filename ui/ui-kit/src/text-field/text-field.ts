import {css, customElement, html, property, live, type PropertyValues, ifDefined} from '@alwatr/element';
import '@alwatr/icon';
import {UnicodeDigits} from '@alwatr/math';
import {eventTrigger} from '@alwatr/signal';

import {AlwatrSurface} from '../card/surface.js';

import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

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

export type TextFieldSignalDetail<T extends Stringifyable = Stringifyable> = Stringifyable & {
  name: string;
  value: string;
  detail: T;
}

export type TextFiledContent = StringifyableRecord & {
  name: string;
  value?: string;
  placeholder?: string;
  inputChangeSignalName?: string;
  inputChangeSignalDetail?: Stringifyable;
} & ({
  type: 'textarea';
  rows?: number;
} | {
  type: InputType;
})

/**
 * Alwatr outlined text field.
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

  @property()
    content?: TextFiledContent;

  inputElement: HTMLInputElement | HTMLTextAreaElement | null = null;

  constructor() {
    super();
    this._inputChanged = this._inputChanged.bind(this);
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.inputElement = this.renderRoot.querySelector('input, textarea');
  }

  protected _click(): void {
    this.inputElement?.focus();
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    const content = this.content || {type: 'text', name: '', placeholder: '', value: ''};
    content.value ??= '';
    if (content.type === 'textarea') {
      return html`<textarea
        name=${content.name}
        placeholder=${ifDefined(content.placeholder)}
        value=${live(content.value)}
        rows=${ifDefined(content.rows) ?? 3}
        @change=${this._inputChanged}
      ></textarea>`;
    }
    // else
    return html`<input
      name=${content.name}
      type=${content.type}
      placeholder=${ifDefined(content.placeholder)}
      .value=${live(content.value)}
      @change=${this._inputChanged}
    ></input>`;
  }

  private _inputChanged(event: Event): void {
    this._logger.logMethod?.('_inputChanged');
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (target == null) return;
    const content = this.content || {type: 'text', name: '', value: ''};

    let inputValue = unicodeDigits.translate(target.value);
    if (content.type === 'number' || content.type === 'tel') {
      inputValue = inputValue.replaceAll(' ', '');
    }
    content.value = inputValue;

    if (content.inputChangeSignalName) {
      eventTrigger.dispatch<TextFieldSignalDetail>(content.inputChangeSignalName, {
        name: content.name,
        value: content.value,
        detail: content.inputChangeSignalDetail,
      });
    }
  }
}
