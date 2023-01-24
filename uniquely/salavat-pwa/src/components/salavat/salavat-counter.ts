import {
  customElement,
  html,
  css,
  LocalizeMixin,
  unsafeHTML,
  property,
  AlwatrSmartElement,
  state,
} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';

import '../loader/dot-loader.js';

import type {SalavatCount} from '../../types/signals/salavat-count.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-salavat-counter': AlwatrSalavatCounter;
  }
}

@customElement('alwatr-salavat-counter')
export class AlwatrSalavatCounter extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 1.5em;
      width: max-content;

      direction: ltr;
      text-shadow: 0.05em 0.05em 0.2em #0008;
    }
  `;

  static salavatCountSignal = new SignalInterface('salavat-count');

  @property({type: String, attribute: 'salavat-count-type'})
    salavatCountType: keyof SalavatCount = 'totalSalavatCount';

  @state()
  private salavatCountSignalValue?: SalavatCount;

  override connectedCallback(): void {
    super.connectedCallback();

    const salavatCountSignalListener = AlwatrSalavatCounter.salavatCountSignal.addListener((value) => {
      this.salavatCountSignalValue = value;
    });

    this._signalListenerList.push(salavatCountSignalListener);
  }

  override render(): unknown {
    if (this.salavatCountSignalValue != null) {
      const count = this.salavatCountSignalValue[this.salavatCountType];

      return unsafeHTML(this.l10n.formatNumber(count).replaceAll('٬', '<span>٬</span>'));
    }

    return html`<alwatr-dot-loader></alwatr-dot-loader>`;
  }
}
