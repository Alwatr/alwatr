import {customElement, AlwatrSmartElement, css, html, LocalizeMixin, state} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';

import '@material/mwc-slider/slider.js';
import '@alwatr/ui-kit/button/icon-button.js';

import '../components/salavat/add-salavat.js';
import '../components/salavat/salavat-counter.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

@customElement('alwatr-page-home')
export class AlwatrPageHome extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .total-salavat {
      display: flex;
      flex-direction: column;
      min-width: 70%;
      max-width: 100%;
      width: max-content;
      backdrop-filter: blur(4px);
      margin: 0 auto;
      padding: 0 calc(4 * var(--sys-spacing-track)) calc(2 * var(--sys-spacing-track));
    }

    .total-salavat .text-start,
    .total-salavat .text-end {
      display: flex;
      text-shadow: 0.05em 0.05em 0.2em #0008;
    }

    .total-salavat alwatr-salavat-counter {
      align-self: center;

      font-family: var(--sys-typescale-display-large-font-family-name);
      font-weight: var(--sys-typescale-display-large-font-weight);
      font-size: var(--sys-typescale-display-large-font-size);
      letter-spacing: var(--sys-typescale-display-large-letter-spacing);
      line-height: var(--sys-typescale-display-large-line-height);
    }

    .total-salavat .text-start,
    .total-salavat .text-end {
      font-family: var(--sys-typescale-headline-small-font-family-name);
      font-weight: 300;
      font-size: var(--sys-typescale-headline-small-font-size);
      letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
      line-height: var(--sys-typescale-headline-small-line-height);
    }

    .total-salavat .text-start {
      justify-content: flex-start;
    }

    .total-salavat .text-end {
      justify-content: flex-end;
    }
  `;

  static salavatSubmitButtonSignal = new SignalInterface('salavat-submit-button');

  override connectedCallback(): void {
    super.connectedCallback();

    AlwatrPageHome.salavatSubmitButtonSignal.dispatch({show: true});
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    AlwatrPageHome.salavatSubmitButtonSignal.dispatch({show: false});
  }

  override render(): unknown {
    super.render();

    return html`
      <alwatr-add-salavat></alwatr-add-salavat>

      <div class="total-salavat">
        <div class="text-start">تا این لحظه</div>
        <alwatr-salavat-counter></alwatr-salavat-counter>
        <div class="text-end">صلوات نذر فرج</div>
      </div>
    `;
  }
}
