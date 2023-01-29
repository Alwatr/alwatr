import {css, customElement, html, nothing, property, TemplateResult} from '@alwatr/element';

import {AlwatrSurface} from '../card/surface.js';

import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-toast': AlwatrToast;
  }
}

export type ToastContent = {
  message: string;
  autoHideDelay: number;
  actionButtonLabel?: string;
  actionCallBack?: () => void;
};

/**
 * Alwatr toast.
 */
@customElement('alwatr-toast')
export class AlwatrToast extends AlwatrSurface {
  constructor() {
    super();
    this._toggleShow = this._toggleShow.bind(this);
  }

  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: var(--sys-spacing-track);
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        margin: var(--sys-spacing-track) calc(4 * var(--sys-spacing-track));
        padding: calc(2 * var(--sys-spacing-track));
        background-color: var(--sys-color-inverse-surface);
        border-radius: var(--sys-radius-small);
        transition: bottom, top, margin, opacity;
        transition-duration: var(--sys-motion-duration-small);
        transition-timing-function: var(--sys-motion-easing-normal);
        opacity: 0;
        user-select: none;
      }

      :host([show]) {
        margin: calc(2 * var(--sys-spacing-track)) calc(4 * var(--sys-spacing-track));
        opacity: 1;
      }

      .message {
        margin: 0;
        padding: 0;
        display: inline;
        max-width: 50em;
        flex-grow: 1;
        color: var(--sys-color-inverse-on-surface);
        font-family: var(--sys-typescale-body-medium-font-family-name);
        font-weight: var(--sys-typescale-body-medium-font-weight);
        font-size: var(--sys-typescale-body-medium-font-size);
        letter-spacing: var(--sys-typescale-body-medium-letter-spacing);
        line-height: var(--sys-typescale-body-medium-line-height);
      }

      .close-button {
        padding: 0;
        color: var(--sys-color-inverse-on-surface);
        font-size: var(--sys-typescale-headline-small-font-size);
        cursor: pointer;
      }

      .action-button {
        display: block;
        white-space: nowrap;
        color: var(--sys-color-inverse-primary);
        font-family: var(--sys-typescale-label-large-font-family-name);
        font-weight: var(--sys-typescale-label-large-font-weight);
        font-size: var(--sys-typescale-label-large-font-size);
        letter-spacing: var(--sys-typescale-label-large-letter-spacing);
        line-height: var(--sys-typescale-label-large-line-height);
        cursor: pointer;
      }
    `,
  ];

  @property({type: Object, reflect: true})
    content: ToastContent = {
      message: '',
      autoHideDelay: 0,
    };

  @property({type: Boolean, reflect: true})
    show = false;

  protected _toggleShow(): void {
    this._logger.logMethod('_toggleShow');
    this.show = !this.show;
  }

  protected _newMessage(options: ToastContent): void {
    this.content = options;
    this._toggleShow();
    if (this.content.autoHideDelay !== 0) setTimeout(this._toggleShow, this.content.autoHideDelay);
  }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('elevated', '3');
  }

  override render(): unknown {
    super.render();
    return html`
      <p class="message">${this.content.message}</p>
      ${this._actionButtonTemplate()}
      ${this._closeButtonTemplate()}
    `;
  }

  protected _closeButtonTemplate(): TemplateResult | typeof nothing {
    this._logger.logMethod('_closeButtonTemplate');
    if (this.content.autoHideDelay !== 0) return nothing;
    return html`<alwatr-icon @click=${this._toggleShow} class="close-button" name="close"></alwatr-icon>`;
  }

  protected _actionButtonTemplate(): TemplateResult | typeof nothing {
    this._logger.logMethod('_actionButtonTemplate');

    if (this.content.actionButtonLabel === undefined) return nothing;
    return html`<span @click=${(): void => {
      if (this.content.actionCallBack === undefined) return;
      this.content.actionCallBack();
      this._hide();
    }} class="action-button"
      >${this.content.actionButtonLabel}</span>`;
  }
}
