import {customElement, AlwatrSmartElement, css, html, state, type PropertyValues} from '@alwatr/element';
import {untilNextFrame, untilEvent, delay} from '@alwatr/util';

import type {AlwatrIconBox, IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

import '@alwatr/ui-kit/card/icon-box.js';
import './lottery-form.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-lottery-box': AlwatrLotteryBox;
  }
}

const _lotteryContent: IconBoxContent = {
  icon: 'gift-outline',
  headline: 'شرکت در قرعه‌کشی',
  elevated: 2,
};

/**
 * Soffit lottery box element
 */
@customElement('alwatr-lottery-box')
export class AlwatrLotteryBox extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      padding: 0;
    }

    .success {
      color: var(--sys-color-primary);
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

  private _box: AlwatrIconBox | null = null;

  override render(): unknown {
    super.render();
    const content = {
      ..._lotteryContent,
      stated: !this.expanded,
      highlight: !this.expanded && !this.submitted,
    };
    return html`<alwatr-icon-box .content=${content} @click=${this._click}>
      ${this._boxContentTemplate()}
    </alwatr-icon-box>`;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._box = this.renderRoot.querySelector('alwatr-icon-box');
  }

  private _boxContentTemplate(): unknown {
    if (this.expanded) {
      return html`<alwatr-lottery-form
        invisible
        @form-submitted=${this._formSubmitted}
        @form-canceled=${this._formCanceled}
      ></alwatr-lottery-form>`;
    }
    else if (this.submitted) {
      return html`<span class="success">اطلاعات شما با موفقیت ذخیره شد.</span>`;
    }
    else {
      return html`فرم شرکت در قرعه‌کشی`;
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
    this._currentAnimate = this._animateCollapse(true);
  }

  private async _formCanceled(): Promise<void> {
    this._logger.logMethod('_formCanceled');
    await this._currentAnimate;
    this._currentAnimate = this._animateCollapse(false);
  }

  private _currentAnimate?: Promise<void>;

  private _collapseHeight = 0;
  async _animateExpand(): Promise<void> {
    if (this.expanded || this._box == null) return;
    this._logger.logMethod('_animateExpand');
    const box = this._box;
    await untilNextFrame();

    this._collapseHeight = box.scrollHeight;
    box.style.height = this._collapseHeight + 'px';
    this.expanded = true;
    await this.updateComplete;
    await untilNextFrame();

    box.style.height = box.scrollHeight + 'px';

    const form = this.renderRoot.querySelector('alwatr-lottery-form');
    if (!form) {
      this._logger.error('_animateExpand', 'form_not_found');
      this.style.height = 'auto';
      return;
    }
    form.animateExpand();

    await untilEvent(box, 'transitionend');
    box.style.height = 'auto';
  }

  async _animateCollapse(submitted: boolean): Promise<void> {
    if (!this.expanded || this._box == null) return;
    this._logger.logMethod('_animateCollapse');
    const box = this._box;
    box.style.height = 'auto';
    await untilNextFrame();

    box.style.height = box.scrollHeight + 'px';
    await untilNextFrame();

    const form = this.renderRoot.querySelector('alwatr-lottery-form');
    if (form != null) {
      form.animateCollapse();
      await delay(250);
    }

    box.style.height = this._collapseHeight + 'px';
    await untilEvent(box, 'transitionend');

    this.expanded = false;
    this.submitted = submitted;
    await this.updateComplete;
    await box.updateComplete;
    await untilNextFrame();

    if (this._collapseHeight !== box.scrollHeight) {
      box.style.height = box.scrollHeight + 'px';
      await untilEvent(box, 'transitionend');
    }

    box.style.height = 'auto';
  }
}
