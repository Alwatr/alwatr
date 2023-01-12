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
      <alwatr-card stated elevated><input type="text" value="elevated" /></alwatr-card>
      <alwatr-card stated elevated><input type="text" value="elevated" /></alwatr-card>
      <alwatr-card stated elevated disabled><input type="text" value="elevated" disabled /></alwatr-card>
      <alwatr-card stated elevated="2"><input type="text" value="elevated 2" /></alwatr-card>
      <alwatr-card stated elevated="3"><input type="text" value="elevated 3" /></alwatr-card>
      <alwatr-card stated elevated="4"><input type="text" value="elevated 4" /></alwatr-card>
      <alwatr-card stated filled><input type="text" value="filled" /></alwatr-card>
      <alwatr-card stated elevated filled><input type="text" value="filled" /></alwatr-card>
      <alwatr-card stated filled disabled><input type="text" value="filled" disabled /></alwatr-card>
      <alwatr-card stated outlined><input type="text" value="outlined" /></alwatr-card>
      <alwatr-card stated outlined><input type="text" value="outlined" /></alwatr-card>
      <alwatr-card stated outlined disabled><input type="text" value="outlined" disabled /></alwatr-card>
    `;
  }
}
