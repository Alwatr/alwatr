import {customElement, AlwatrSmartElement, css, html, LocalizeMixin} from '@alwatr/element';
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
      <alwatr-add-salavat .mySalavatCount=${1_490}></alwatr-add-salavat>
      <alwatr-salavat-counter .salavatCount=${1_490_298}></alwatr-salavat-counter>
    `;
  }
}
