import {customElement, AlwatrSmartElement, css, html, property} from '@alwatr/element';

import '@alwatr/ui-kit/card/icon-box.js';
import './lottery-form.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-lottery-box': AlwatrLotteryBox;
  }
}

const _lotteryContent = {
  wide: true,
  icon: 'gift-outline',
  headline: 'قرعه‌کشی میدکس',
};

/**
 * Soffit lottery box element
 */
@customElement('alwatr-lottery-box')
export class AlwatrLotteryBox extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  @property({type: Boolean})
    expanded = false;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-icon-box .content=${_lotteryContent} elevated="3" ?stated=${!this.expanded} @click=${this._click}>
        ${this.expanded
          ? html`<alwatr-lottery-form></alwatr-lottery-form>`
          : html`فرم شرکت در قرعه‌کشی میدکس`}
      </alwatr-icon-box>
    `;
  }

  _click(): void {
    if (!this.expanded) this.expanded = true;
  }
}
