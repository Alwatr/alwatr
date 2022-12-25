import {AlwatrElement, css, html} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {customElement} from 'lit/decorators.js';

import '@alwatr/icon';

import type {TemplateResult} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': AlwatrDemoHome;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrDemoHome extends AlwatrElement {
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

    // TODO: this._signalListenerList.push
    l10n.resourceChangeSignal.addListener(() => {
      this.requestUpdate();
    });
  }

  override render(): TemplateResult {
    return html`
      <section>
        <h1>
          <alwatr-icon name="home-outline"></alwatr-icon>
          ${l10n.localize('page_home')}
        </h1>
      </section>
    `;
  }
}
