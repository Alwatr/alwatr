import {customElement, AlwatrSmartElement, css, html, unsafeHTML} from '@alwatr/element';

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
      padding: 0 calc(8 * var(--sys-spacing-track));
    }

    .text-start,
    .text-large,
    .text-end {
      display: flex;
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
      justify-content: flex-start;
    }

    .text-large {
      direction: ltr;
      justify-content: center;
    }

    .text-end {
      justify-content: flex-end;
    }

    .text-large span {
      color: hsl(var(--ref-palette-tertiary50));
    }
  `;

  override render(): unknown {
    super.render();

    const numberTemplate = Number(1_947_394)
        .toLocaleString('fa-IR', {
          style: 'decimal',
        })
        .replaceAll('٬', '<span>٬</span>');

    return html`
      <div class="text-start">تا این لحظه</div>
      <div class="text-large">${unsafeHTML(numberTemplate)}</div>
      <div class="text-end">صلوات نذر فرج شده</div>
    `;
  }
}
