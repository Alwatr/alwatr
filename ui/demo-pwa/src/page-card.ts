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
      padding: var(--sys-spacing-track);
      box-sizing: border-box;
      height: 100%;
      gap: var(--sys-spacing-track);
    }

    alwatr-card {
      flex-grow: 1;
      display: flex;
      align-items: flex-end;
      width: 25%;
      user-select: none;
    }

    input {
      padding: var(--sys-spacing-track);
      color: inherit;
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid transparent;
    }

    input:focus {
      border-bottom-color: currentColor;
      outline: 0;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-card type="elevated"><input type="text" value="elevated"/></alwatr-card>
      <alwatr-card type="elevated"><input type="text" value="elevated"/></alwatr-card>
      <alwatr-card type="elevated" disabled><input type="text" value="elevated" disabled/></alwatr-card>
      <alwatr-card type="filled"><input type="text" value="filled"/></alwatr-card>
      <alwatr-card type="filled"><input type="text" value="filled"/></alwatr-card>
      <alwatr-card type="filled" disabled><input type="text" value="filled" disabled/></alwatr-card>
      <alwatr-card type="outlined"><input type="text" value="outlined"/></alwatr-card>
      <alwatr-card type="outlined"><input type="text" value="outlined"/></alwatr-card>
      <alwatr-card type="outlined" disabled><input type="text" value="outlined" disabled/></alwatr-card>
      <alwatr-card type="outlined"><input type="text" value="outlined"/></alwatr-card>
      <alwatr-card type="elevated"><input type="text" value="elevated"/></alwatr-card>
      <alwatr-card type="filled"><input type="text" value="filled"/></alwatr-card>
    `;
  }
}
