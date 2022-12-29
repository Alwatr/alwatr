import {AlwatrDummyElement, css, customElement, html} from '@alwatr/element';

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
  static override styles = css`
    :host {
      display: flex;

      color: var(--md-sys-color-on-surface);
      background-color: var(--md-sys-color-surface);

      gap: var(--md-sys-spacing-track-1);
      padding: var(--md-sys-spacing-track-2);

      border-top-left-radius: var(--md-sys-shape-corner-large-top-top-left);
      border-top-right-radius: var(--md-sys-shape-corner-large-top-top-right);
    }

    alwatr-standard-icon-button {
      width: var(--md-sys-spacing-track-6);
      height: var(--md-sys-spacing-track-6);
    }
  `;

  override render(): unknown {
    return html`
      <alwatr-standard-icon-button .icon=${'happy-outline'}></alwatr-standard-icon-button>
      <alwatr-chat-text-input></alwatr-chat-text-input>
    `;
  }
}
