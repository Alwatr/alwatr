import {
  type PropertyValues,
  AlwatrDummyElement,
  css,
  customElement,
  html,
  LocalizeMixin,
  SignalMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';

import '../button/icon-button.js';

import type {AlwatrStandardIconButton} from '../button/icon-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-text-input': AlwatrChatTextInput;
  }
}

/**
 * Alwatr chat text input element.
 */
@customElement('alwatr-chat-text-input')
export class AlwatrChatTextInput extends LocalizeMixin(SignalMixin(AlwatrDummyElement)) {
  static override styles = css`
    :host {
      --_height: calc(6 * var(--sys-spacing-track));
      display: flex;
      user-select: none;
      align-items: flex-end;
      vertical-align: middle;
      border-radius: calc(var(--_height) / 2);
      color: var(--sys-color-on-surface-variant);
      background-color: var(--sys-color-surface-variant);
      flex-grow: 1;
    }

    alwatr-icon-button {
      width: var(--_height);
      height: var(--_height);
      --_surface-color-on: var(--sys-color-tertiary-hsl);
    }

    textarea {
      flex-grow: 1;
      width: auto;
      min-width: auto;
      color: inherit;
      resize: none;
      border: none;
      outline: 0;
      background-color: transparent;
      font-family: inherit;
      word-wrap: break-word;
      line-height: calc(2 * var(--sys-spacing-track));
      padding: var(--sys-spacing-track);
      margin: var(--sys-spacing-track);
      margin-inline-end: 0;
    }
  `;

  inputElement: HTMLTextAreaElement | null = null;
  sendButtonElement: AlwatrStandardIconButton | null = null;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <textarea
        rows="1"
        placeholder=${message('chat_text_input_placeholder')}
        @input=${this.__inputChange}
      ></textarea>
      <alwatr-icon-button .icon=${'send'} flip-rtl disabled></alwatr-icon-button>
    `;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.inputElement = this.renderRoot.querySelector('textarea');
    this.sendButtonElement = this.renderRoot.querySelector('alwatr-icon-button');
  }

  private __inputChange(event: InputEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    textarea.rows = Math.min(value.split('\n').length, 6);
    this.sendButtonElement?.toggleAttribute('disabled', value.length === 0);
  }
}
