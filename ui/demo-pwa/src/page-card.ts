import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/card/card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-card': AlwatrPageCard;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-card')
export class AlwatrPageCard extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      padding: 0 var(--sys-spacing-side-padding);
      box-sizing: border-box;
      height: 100%;
      gap: var(--sys-spacing-side-padding);
    }

    alwatr-card {
      width: 25%;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-card type="elevated">elevated</alwatr-card>
      <alwatr-card type="elevated">elevated</alwatr-card>
      <alwatr-card type="elevated">elevated</alwatr-card>
      <alwatr-card type="filled">filled</alwatr-card>
      <alwatr-card type="filled">filled</alwatr-card>
      <alwatr-card type="filled">filled</alwatr-card>
      <alwatr-card type="outlined">outlined</alwatr-card>
      <alwatr-card type="outlined">outlined</alwatr-card>
      <alwatr-card type="outlined">outlined</alwatr-card>
    `;
  }
}
