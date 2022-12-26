import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';

import '@alwatr/ui-kit/chat/chat-avatar.js';

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
      <section>
        <alwatr-chat-avatar user="1"></alwatr-chat-avatar>
        <alwatr-chat-avatar user="2"></alwatr-chat-avatar>
        <alwatr-chat-avatar user="3"></alwatr-chat-avatar>
      </section>
    `;
  }
}
