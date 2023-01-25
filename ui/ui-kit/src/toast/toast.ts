import {css, customElement, html, nothing, property, TemplateResult} from '@alwatr/element';

import '@alwatr/icon';
import {AlwatrSurface} from '../card/surface.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-toast': AlwatrToast;
  }
}

export type ToastContent = {
  message: string;
  autoHideDelay: number;
  show: boolean;
};

/**
 * Alwatr toast.
 */
@customElement('alwatr-toast')
export class AlwatrToast extends AlwatrSurface {
  constructor() {
    super();
    this._hide = this._hide.bind(this);
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
        color: var(--sys-color-inverse-on-surface);
        font-family: var(--sys-typescale-body-medium-font-family-name);
        font-weight: var(--sys-typescale-body-medium-font-weight);
        font-size: var(--sys-typescale-body-medium-font-size);
        letter-spacing: var(--sys-typescale-body-medium-letter-spacing);
        line-height: var(--sys-typescale-body-medium-line-height);
      }

      .close-icon {
        padding: 0;
        color: var(--sys-color-inverse-on-surface);
        font-size: var(--sys-typescale-headline-small-font-size);
      }
    `,
  ];

  @property({type: Object, reflect: true})
    content: ToastContent = {
      message: '',
      show: false,
      autoHideDelay: -1,
    };

  protected _show(): void {
    this._logger.logMethod('_show');
    this.setAttribute('show', '');
  }

  protected _hide(): void {
    this._logger.logMethod('_hide');
    this.removeAttribute('show');
  }

  protected _newMessage(options: ToastContent): void {
    this.content = options;
    this._show();
    if (this.content.autoHideDelay !== 0) setTimeout(this._hide, this.content.autoHideDelay);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('elevated', '3');
  }

  override render(): unknown {
    super.render();
    return html`
      <p class="message">${this.content.message}</p>
      ${this._closeButtonTemplate()}
    `;
  }

  protected _closeButtonTemplate(): TemplateResult | typeof nothing {
    this._logger.logMethod('_closeButtonTemplate');

    if (this.content.autoHideDelay !== 0) return nothing;
    return html`<alwatr-icon @click=${this._hide} class="close-icon" name="close"></alwatr-icon>`;
  }
}
