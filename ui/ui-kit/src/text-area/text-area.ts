import {css, customElement, html, property, ifDefined, type PropertyValues} from '@alwatr/element';
import '@alwatr/icon';
import {UnicodeDigits} from '@alwatr/math';

import {AlwatrSurface} from '../card/surface.js';

const unicodeDigits = new UnicodeDigits('en');

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-text-area': AlwatrTextArea;
  }
}

/**
 * Alwatr text area.
 *
 * @attr {String} name
 */
@customElement('alwatr-text-area')
export class AlwatrTextArea extends AlwatrSurface {
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

      textarea {
        display: block;
        padding: 0;
        font: inherit;
        resize: none;
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
      textarea::placeholder {
        font: inherit;
        color: var(--sys-color-on-surface-variant);
      }
      textarea::-moz-placeholder {
        font: inherit;
        color: var(--sys-color-on-surface-variant);
      }

      textarea::-webkit-outer-spin-button,
      textarea::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ];

  name = this.getAttribute('name') ?? 'unknown';

  @property({type: String})
    placeholder?: string;

  @property({type: Number})
    rows?: number;

  textareaElement: HTMLTextAreaElement | null = null;

  get value(): string {
    const val = unicodeDigits.translate(this.textareaElement?.value ?? '');
    return val;
  }
  set value(val: string) {
    if (this.textareaElement != null) {
      this.textareaElement.value = val;
    }
    else {
      this.updateComplete.then(() => {this.value = val;});
    }
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`<textarea rows=${this.rows ?? 3} placeholder=${ifDefined(this.placeholder)}></textarea>`;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.textareaElement = this.renderRoot.querySelector('textarea');
    this.addEventListener('click', () => this.textareaElement?.focus());
  }
}
