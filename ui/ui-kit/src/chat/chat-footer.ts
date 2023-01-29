import {AlwatrDummyElement, css, customElement, html} from '@alwatr/element';
import './chat-text-input.js';
import '../button/icon-button.js';

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

    alwatr-icon-button {
      width: calc(6 * var(--sys-spacing-track));
      height: calc(6 * var(--sys-spacing-track));
    }
  `;

  override render(): unknown {
    return html`
      <alwatr-icon-button .icon=${'happy-outline'}></alwatr-icon-button>
      <alwatr-chat-text-input></alwatr-chat-text-input>
    `;
  }
}
