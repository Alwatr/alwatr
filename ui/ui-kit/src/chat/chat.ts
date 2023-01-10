import {customElement, AlwatrSmartElement, css, html, property, nothing} from '@alwatr/element';

import type {ChatStorage} from '@alwatr/type';

import './chat-footer.js';
import './chat-list.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat': AlwatrChat;
  }
}

const currentUser = 'user-1';

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-chat')
export class AlwatrChat extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      padding-top: var(--sys-spacing-track);
      box-sizing: border-box;
      position: relative;
    }

    alwatr-chat-list {
      height: 100%;
      color: var(--sys-color-on-secondary-container);
      background-color: var(--sys-color-secondary-container);
      padding-bottom: calc(12 * var(--sys-spacing-track));
    }

    alwatr-chat-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `;

  @property({type: Object, attribute: false})
    storage?: ChatStorage | null;

  override render(): unknown {
    super.render();
    return html`
      ${this.storage !== null
        ? html`
            <alwatr-chat-list .storage=${this.storage} .currentUser=${currentUser}></alwatr-chat-list>
            <alwatr-chat-footer></alwatr-chat-footer>
          `
        : nothing}
    `;
  }
}
