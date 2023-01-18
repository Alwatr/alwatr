import {customElement, AlwatrSmartElement, css, html, unsafeHTML, state} from '@alwatr/element';

import '@alwatr/ui-kit/card/card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: max-content;
      margin: 0 auto;
      padding: 0 calc(8 * var(--sys-spacing-track));
    }

    .text-start,
    .text-large,
    .text-end {
      display: inline-flex;
      width: max-content;
      align-items: center;
      text-shadow: 0.05em 0.05em 0.2em #0008;
    }

    .text-large {
      font-family: var(--sys-typescale-display-large-font-family-name);
      font-weight: var(--sys-typescale-display-large-font-weight);
      font-size: var(--sys-typescale-display-large-font-size);
      letter-spacing: var(--sys-typescale-display-large-letter-spacing);
      line-height: var(--sys-typescale-display-large-line-height);
    }

    .text-start,
    .text-end {
      font-family: var(--sys-typescale-headline-small-font-family-name);
      font-weight: 300;
      font-size: var(--sys-typescale-headline-small-font-size);
      letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
      line-height: var(--sys-typescale-headline-small-line-height);
    }

    .text-start {
      align-self: flex-start;
      margin-inline-end: calc(2 * var(--sys-spacing-track));
    }

    .text-large {
      direction: ltr;
      align-self: center;
    }

    .text-end {
      align-self: flex-end;
      margin-inline-start: calc(2 * var(--sys-spacing-track));
    }

    .text-large span {
      color: hsl(var(--ref-palette-tertiary50));
    }
  `;

  @state() protected _number = 1_428_584;

  override render(): unknown {
    super.render();

    const numberTemplate = Number(this._number)
        .toLocaleString('fa-IR', {
          style: 'decimal',
        })
        .replaceAll('٬', '<span>٬</span>');

    return html`
      <div class="text-start">تا این لحظه</div>
      <div class="text-large">${unsafeHTML(numberTemplate)}</div>
      <div class="text-end">صلوات نذر فرج</div>
    `;
  }
}
