import {customElement, AlwatrSmartElement, css, html, state} from '@alwatr/element';

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

  @state()
    expanded = false;

  @state()
    submitted = false;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-icon-box
        .content=${_lotteryContent}
        elevated="3"
        ?stated=${!this.expanded}
        ?highlight=${!this.expanded && !this.submitted}
        @click=${this._click}
      >${this._boxContentTemplate()}</alwatr-icon-box>
    `;
  }


  private _boxContentTemplate(): unknown {
    if (this.expanded) {
      return html`<alwatr-lottery-form @form-submitted=${this._formSubmitted}></alwatr-lottery-form>`;
    }
    else if (this.submitted) {
      return html`اطلاعات شما با موفقیت ذخیره شد.`;
    }
    else {
      return html`فرم شرکت در قرعه‌کشی میدکس`;
    }
  }

  private _click(): void {
    this._logger.logMethod('_click');
    if (!this.expanded && !this.submitted) this.expanded = true;
  }

  private _formSubmitted(): void {
    this._logger.logMethod('_formSubmitted');
    this.expanded = false;
    this.submitted = true;
  }
}
