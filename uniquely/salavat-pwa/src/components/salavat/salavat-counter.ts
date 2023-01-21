import {customElement, html, css, AlwatrDummyElement, LocalizeMixin, unsafeHTML, property} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-salavat-counter': AlwatrSalavatCounter;
  }
}

@customElement('alwatr-salavat-counter')
export class AlwatrSalavatCounter extends LocalizeMixin(AlwatrDummyElement) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: max-content;
      backdrop-filter: blur(4px);
      margin: 0 auto;
      padding: 0 calc(4 * var(--sys-spacing-track)) calc(2 * var(--sys-spacing-track));
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
      color: var(--sys-color-tertiary);
    }
  `;

  @property({type: Number})
    salavatCount = 0;

  override render(): unknown {
    return html`
      <div class="text-start">تا این لحظه</div>
      <div class="text-large">
        ${unsafeHTML(this.l10n.formatNumber(this.salavatCount).replaceAll('٬', '<span>٬</span>'))}
      </div>
      <div class="text-end">صلوات نذر فرج</div>
    `;
  }
}
