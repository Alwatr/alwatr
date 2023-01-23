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
      overflow: hidden;
    }

    .success {
      color: var(--sys-color-primary);
    }

    .success {
      font-family: var(--sys-typescale-label-large-font-family-name);
      font-weight: var(--sys-typescale-label-large-font-weight);
      font-size: var(--sys-typescale-label-large-font-size);
      letter-spacing: var(--sys-typescale-label-large-letter-spacing);
      line-height: var(--sys-typescale-label-large-line-height);
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
      return html`<alwatr-lottery-form invisible @form-submitted=${this._formSubmitted}></alwatr-lottery-form>`;
    }
    else if (this.submitted) {
      return html`<span class="success">اطلاعات شما با موفقیت ذخیره شد.</span>`;
    }
    else {
      return html`فرم شرکت در قرعه‌کشی میدکس`;
    }
  }

  private async _click(): Promise<void> {
    this._logger.logMethod('_click');
    if (!this.expanded && !this.submitted) {
      await this._currentAnimate;
      this._currentAnimate = this._animateExpand();
    }
  }

  private async _formSubmitted(): Promise<void> {
    this._logger.logMethod('_formSubmitted');
    await this._currentAnimate;
    this._currentAnimate = this._animateCollapse();
  }

  private _currentAnimate?: Promise<void>;
  private _setTransition(val: boolean): Promise<number> {
    this.toggleAttribute('transition', val);
    return new Promise((resolve) => requestAnimationFrame(resolve));
  }

  private _collapseHeight = 0;
  async _animateExpand(): Promise<void> {
    this._logger.logMethod('_animateExpand');
    if (this.expanded) return;
    await this._setTransition(false);
    this._collapseHeight = this.getBoundingClientRect().height;
    this.style.height = this._collapseHeight + 'px';
    this.expanded = true;
    await this.updateComplete;
    const form = this.renderRoot.querySelector('alwatr-lottery-form');
    if (!form) {
      this._logger.error('_animateExpand', 'form_not_found');
      this.style.height = 'auto';
      return;
    }
    // form.style.opacity = '0';
    await this._setTransition(true);
    this.style.height = this.scrollHeight + 'px';
    form.animateVisible();
    this.addEventListener('transitionend', () => {
      this._logger.logMethod('_animateExpand_transitionend');
      this._setTransition(false);
      this.style.height = 'auto';
    }, {once: true});
  }

  async _animateCollapse(): Promise<void> {
    this._logger.logMethod('_animateCollapse');
    if (!this.expanded) return;
    await this._setTransition(false);
    const form = this.renderRoot.querySelector('alwatr-lottery-form');
    if (!form) {
      this._logger.error('_animateCollapse', 'form_not_found');
      this.expanded = false;
      this.submitted = true;
      this.style.height = 'auto';
      return;
    }
    this.style.height = this.getBoundingClientRect().height + 'px';
    await this._setTransition(true);
    // form.style.opacity = '0';
    this.style.height = this._collapseHeight + 'px';
    this.addEventListener('transitionend', () => {
      this._logger.logMethod('_animateCollapse_transitionend');
      this._setTransition(false);
      this.expanded = false;
      this.submitted = true;
      this.style.height = 'auto';
    }, {once: true});
  }
}
