import {
  customElement,
  css,
  html,
  AlwatrBaseElement,
} from '@alwatr/element';
import '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-tour': AlwatrPageTour;
  }
}

/**
 * Alwatr tour page
 */
@customElement('alwatr-page-tour')
export class AlwatrPageTour extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      justify-content: center;
      gap: var(--sys-spacing-track);
      overflow-y: auto;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return html`Tour Page...`;
  }
}
