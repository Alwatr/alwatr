import {AlwatrDummyElement, css, customElement, html, LocalizeMixin} from '@alwatr/element';

import type {PropertyValues} from '@alwatr/element';

import '../icon-button/standard-icon-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-text-input': AlwatrChatTextInput;
  }
}

/**
 * Alwatr chat text input element.
 */
@customElement('alwatr-chat-text-input')
export class AlwatrChatTextInput extends LocalizeMixin(AlwatrDummyElement) {
  static override styles = css`
    :host {
      --_height: var(--alwatr-sys-spacing-track-6);
      display: flex;
      user-select: none;
      align-items: flex-end;
      vertical-align: middle;
      border-radius: calc(var(--_height) / 2);
      color: var(--alwatr-sys-color-on-surface-variant);
      background-color: var(--alwatr-sys-color-surface-variant);
      flex-grow: 1;
    }

    alwatr-standard-icon-button {
      width: var(--_height);
      height: var(--_height);
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
      line-height: var(--alwatr-sys-spacing-track-2);
      padding: var(--alwatr-sys-spacing-track-1);
      margin: var(--alwatr-sys-spacing-track-1);
      margin-inline-end: 0;
    }
  `;

  inputElement: HTMLTextAreaElement | null = null;

  override render(): unknown {
    return html`
      <textarea
        rows="1"
        placeholder=${this.l10n.localize('chat_text_input_placeholder')}
        @input=${this.__inputChange}
      ></textarea>
      <alwatr-standard-icon-button .icon=${'send'} flip-rtl></alwatr-standard-icon-button>
    `;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.inputElement = this.renderRoot.querySelector('textarea');
  }

  private __inputChange(event: InputEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    textarea.rows = Math.min(value.split('\n').length, 6);
  }
}
