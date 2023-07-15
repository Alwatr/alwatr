import {
  customElement,
  css,
  html,
  state,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  type PropertyValues,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';
import {untilNextFrame, untilEvent, delay} from '@alwatr/util';

import './collaboration-form.js';

import type {AlwatrCollaborationForm} from './collaboration-form.js';
import type {AlwatrIconBox, IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-collaboration-box': AlwatrCollaborationBox;
  }
}

/**
 * Keep collaboration box element
 */
@customElement('alwatr-collaboration-box')
export class AlwatrCollaborationBox extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
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

  protected _box: AlwatrIconBox | null = null;

  override render(): unknown {
    this._logger.logMethod?.('render');
    return html`<alwatr-icon-box .content=${this._iconBoxContent} @click=${this._click}>
      ${this._boxContentTemplate()}
    </alwatr-icon-box>`;
  }

  protected get _iconBoxContent(): IconBoxContent {
    return {
      icon: 'people-outline',
      headline: message('collaboration_form_title'),
      elevated: 1,
      stated: !this.expanded,
      highlight: !this.expanded && !this.submitted,
    };
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._box = this.renderRoot.querySelector('alwatr-icon-box');
  }

  protected _boxContentTemplate(): unknown {
    if (this.expanded) {
      return html`<alwatr-collaboration-form
        id="form"
        invisible
        @form-submitted=${this._formSubmitted}
        @form-canceled=${this._formCanceled}
      ></alwatr-collaboration-form>`;
    }
    else if (this.submitted) {
      return html`<span class="success">${message('form_submitted')}</span>`;
    }
    else {
      return html`${message('collaboration_form_description')}`;
    }
  }

  protected async _click(): Promise<void> {
    this._logger.logMethod?.('_click');
    if (!this.expanded && !this.submitted) {
      await this._currentAnimate;
      this._currentAnimate = this._animateExpand();
    }
  }

  protected async _formSubmitted(): Promise<void> {
    this._logger.logMethod?.('_formSubmitted');
    await this._currentAnimate;
    this._currentAnimate = this._animateCollapse(true);
  }

  protected async _formCanceled(): Promise<void> {
    this._logger.logMethod?.('_formCanceled');
    await this._currentAnimate;
    this._currentAnimate = this._animateCollapse(false);
  }

  protected _currentAnimate?: Promise<void>;

  protected _collapseHeight = 0;
  async _animateExpand(): Promise<void> {
    if (this.expanded || this._box == null) return;
    this._logger.logMethod?.('_animateExpand');
    const box = this._box;
    await untilNextFrame();

    this._collapseHeight = box.scrollHeight;
    box.style.height = this._collapseHeight + 'px';
    this.expanded = true;
    await this.updateComplete;
    await untilNextFrame();

    box.style.height = box.scrollHeight + 'px';

    const form = this.renderRoot.querySelector<AlwatrCollaborationForm>('#form');
    if (!form) {
      this._logger.error('_animateExpand', 'form_not_found');
      this.style.height = 'auto';
      return;
    }
    void form.animateExpand();

    await untilEvent(box, 'transitionend');
    box.style.height = 'auto';
  }

  async _animateCollapse(submitted: boolean): Promise<void> {
    if (!this.expanded || this._box == null) return;
    this._logger.logMethod?.('_animateCollapse');
    const box = this._box;
    box.style.height = 'auto';
    await untilNextFrame();

    box.style.height = box.scrollHeight + 'px';
    await untilNextFrame();

    const form = this.renderRoot.querySelector<AlwatrCollaborationForm>('#form');
    if (form != null) {
      void form.animateCollapse();
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
