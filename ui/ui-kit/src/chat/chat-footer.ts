import {AlwatrDummyElement, css, customElement, html, query} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';

import type {AlwatrChatTextInput} from './chat-text-input.js'; './chat-text-input.js';

import './chat-text-input.js';
import '../icon-button/standard-icon-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-footer': AlwatrChatFooter;
  }
}

/**
 * Alwatr chat footer element.
 */
@customElement('alwatr-chat-footer')
export class AlwatrChatFooter extends AlwatrDummyElement {
  constructor() {
    super();
    this._onSendButtonClicked = this._onSendButtonClicked.bind(this);
  }

  static override styles = css`
    :host {
      display: flex;
      gap: var(--sys-spacing-track);
      padding: calc(2 * var(--sys-spacing-track));
      padding-inline-start: var(--sys-spacing-track);
      border-top-left-radius: var(--sys-radius-large);
      border-top-right-radius: var(--sys-radius-large);
      color: var(--sys-color-on-surface);
      background-color: var(--sys-color-surface);
    }

    alwatr-standard-icon-button {
      width: calc(6 * var(--sys-spacing-track));
      height: calc(6 * var(--sys-spacing-track));
    }
  `;

    @query('alwatr-chat-text-input')
      chatTextInput?: AlwatrChatTextInput;

    override render(): unknown {
      return html`
      <alwatr-standard-icon-button .icon=${'happy-outline'} @click=${this._changeLocale}></alwatr-standard-icon-button>
      <alwatr-chat-text-input @send=${this._onSendButtonClicked}></alwatr-chat-text-input>
    `;
    }

    protected _onSendButtonClicked(): void {
      this.dispatchEvent(new Event('send'));
    }

    protected _changeLocale(): void {
      l10n.setLocal(
      l10n.locale?.code !== l10n.config.defaultLocale.code
        ? l10n.config.defaultLocale
        : {
          code: 'fa-IR',
          direction: 'rtl',
          language: 'fa',
        },
      );
    }
}
