import {customElement, AlwatrBaseElement, css, html} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-app-footer': AlwatrPageHome;
  }
}

/**
 * Alwatr Keep App Footer
 */
@customElement('alwatr-app-footer')
export class AlwatrPageHome extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: block;
      flex-grow: 0;
      flex-shrink: 0;
      direction: ltr;
      text-align: center;
      color: var(--sys-color-on-secondary-container);
      padding: calc(2 * var(--sys-spacing-track)) var(--sys-spacing-track) var(--sys-spacing-track);
      background-color: var(--sys-color-secondary-container);
    }

    .version {
      font-size: var(--sys-typescale-label-small-font-size);
      line-height: var(--sys-typescale-label-small-line-height);
      letter-spacing: var(--sys-typescale-label-small-letter-spacing);
      opacity: 0.6;
      user-select: none;
      -webkit-user-select: none;
    }
  `;

  override render(): unknown {
    this._logger.logMethod?.('render');
    return html`
      <div class="version">Keep v${_ALWATR_VERSION_}</div>
    `;
  }
}
