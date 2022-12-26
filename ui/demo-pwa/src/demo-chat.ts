import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';

import '@alwatr/ui-kit/chat/chat-avatar.js';
import '@alwatr/ui-kit/chat/chat-bubble.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-demo-chat': AlwatrDemoHome;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-demo-chat')
export class AlwatrDemoHome extends AlwatrSmartElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        l10n.resourceChangeSignal.addListener(() => {
          this.requestUpdate();
        }),
    );
  }

  override render(): unknown {
    return html`
      <p>
        <alwatr-chat-avatar user="1"></alwatr-chat-avatar>
        <alwatr-chat-avatar user="2"></alwatr-chat-avatar>
        <alwatr-chat-avatar user="3"></alwatr-chat-avatar>
      </p>
      <p>
        <alwatr-chat-bubble message="سلام" dir="rtl"></alwatr-chat-bubble>
        <alwatr-chat-bubble message="چطوری؟" end-side dir="rtl"></alwatr-chat-bubble>
        <alwatr-chat-bubble
          .message=${'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
          ' Veritatis quia nemo eaque laboriosam unde consequatur!'}
        ></alwatr-chat-bubble>
      </p>
    `;
  }
}
