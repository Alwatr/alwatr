import {
  type PropertyValues,
  AlwatrBaseElement,
  css,
  customElement,
  html,
  LocalizeMixin,
  SignalMixin,
  property,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {eventTrigger} from '@alwatr/signal';

import '../button/icon-button.js';

import type {AlwatrStandardIconButton, IconButtonContent} from '../button/icon-button.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-text-input': AlwatrChatTextInput;
  }
}

/**
 * Alwatr chat text input element.
 */
@customElement('alwatr-chat-text-input')
export class AlwatrChatTextInput extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      --_height: calc(6 * var(--sys-spacing-track));
      display: flex;
      align-items: flex-end;
      vertical-align: middle;
      border-radius: calc(var(--_height) / 2);
      color: var(--sys-color-on-surface-variant);
      background-color: var(--sys-color-surface-variant);
      flex-grow: 1;
      user-select: none;
    }

    alwatr-icon-button {
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

  @property({type: String})
    sendButtonClickSignalId?: string;

  inputElement: HTMLTextAreaElement | null = null;
  sendButtonElement: AlwatrStandardIconButton | null = null;

  protected override firstUpdated(_changedProperties: PropertyValues<this>): void {
    super.firstUpdated(_changedProperties);
    this.inputElement = this.renderRoot.querySelector('textarea');
    this.sendButtonElement = this.renderRoot.querySelector('alwatr-icon-button');
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    const sendButtonContent: IconButtonContent = {icon: 'send-outline', flipRtl: true};

    return html`
      <textarea placeholder=${message('chat_text_input_placeholder')} @input=${this.__inputChange} rows="1"></textarea>
      <alwatr-icon-button .content=${sendButtonContent} @click=${this.sendMessage} disabled></alwatr-icon-button>
    `;
  }

  protected sendMessage(): void {
    this._logger.logMethod?.('sendMessage');
    if (!this.sendButtonClickSignalId) return;
    const value = this.inputElement?.value.trim() ?? '';
    eventTrigger.dispatch<{value: string}>(this.sendButtonClickSignalId, {value});
  }

  private __inputChange(event: InputEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value.trim();
    textarea.rows = Math.min(value.split('\n').length, 6);
    this.sendButtonElement?.toggleAttribute('disabled', value.length === 0);
  }
}
