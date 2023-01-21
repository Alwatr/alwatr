import {customElement, html, css, AlwatrSmartElement, state, LocalizeMixin} from '@alwatr/element';

import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-navigation-salavat-counter': AlwatrNavigationSalavatCounter;
  }
}

@customElement('alwatr-navigation-salavat-counter')
export class AlwatrNavigationSalavatCounter extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      margin: calc(8 * var(--sys-spacing-track)) 0 calc(2 * var(--sys-spacing-track));
      padding: calc(3.5 * var(--sys-spacing-track)) 0;
      width: 80%;
      border-top-left-radius: calc(16.5 * var(--sys-spacing-track));
      border-bottom-left-radius: calc(16.5 * var(--sys-spacing-track));
      overflow: hidden;
      overflow: clip;

      box-shadow: 2px 2px 20px -6px #000000bf;

      background-color: var(--sys-color-secondary);
      color: var(--sys-color-on-secondary);
    }

    div {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      min-width: max-content;
    }

    span {
      font-family: var(--sys-typescale-title-medium-font-family-name);
      font-weight: var(--sys-typescale-title-medium-font-weight);
      font-size: var(--sys-typescale-title-medium-font-size);
      letter-spacing: var(--sys-typescale-title-medium-letter-spacing);
      line-height: var(--sys-typescale-title-medium-line-height);
    }

    .number {
      text-align: end;
      font-family: var(--sys-typescale-display-medium-font-family-name);
      font-weight: var(--sys-typescale-display-medium-font-weight);
      font-size: var(--sys-typescale-display-medium-font-size);
      letter-spacing: var(--sys-typescale-display-medium-letter-spacing);
      line-height: var(--sys-typescale-display-medium-line-height);
    }
  `;

  @state() protected salavatCount = 0;

  override render(): unknown {
    return html`
      <div>
        <span>صلوات های من: </span>
        <span class="number">${this.l10n.formatNumber(this.salavatCount)}</span>
      </div>
    `;
  }
}
