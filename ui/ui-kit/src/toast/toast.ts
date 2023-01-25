import {css, customElement, html, property, state} from '@alwatr/element';

import '@alwatr/icon';
import {AlwatrSurface} from '../card/surface.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-toast': AlwatrToast;
  }
}

export type ToastOptions = {
  message: string;
  autoClose: boolean;
  show: boolean;
};

/**
 * Alwatr toast.
 */
@customElement('alwatr-toast')
export class AlwatrToast extends AlwatrSurface {
  static override styles = [
    css`
      :host {
        box-sizing: border-box;
        display: block;
        margin: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
        padding: 0;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        transition: bottom, top, margin, opacity;
        transition-duration:var(--sys-motion-duration-small);
        transition-timing-function: var(--sys-motion-easing-normal);
        opacity: 0;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        gap: var(--sys-spacing-track);
        padding: calc(2 * var(--sys-spacing-track));
        background-color: var(--sys-color-inverse-surface);
        color: var(--sys-color-inverse-on-surface);
        border-radius: var(--sys-radius-small);
      }

      :host([show]) {
        margin: calc(2 * var(--sys-spacing-track));
        opacity: 1;
      }

      .message {
        margin: 0;
        padding: 0;
        color: inherit;
        display: inline;
        font-family: var(--sys-typescale-body-medium-font-family-name);
        font-weight: var(--sys-typescale-body-medium-font-weight);
        font-size: var(--sys-typescale-body-medium-font-size);
        letter-spacing: var(--sys-typescale-body-medium-letter-spacing);
        line-height: var(--sys-typescale-body-medium-line-height);
      }

      .close-icon {
        padding: 0;
        color: inherit;
        font-size: 24px;
        font-size: var(--sys-typescale-headline-small-font-size);
      }
    `,
  ];

  @state() protected _options: ToastOptions = {
    message: 'Simple message to show a message to the user',
    autoClose: false,
    show: true,
  };

  @property({type: Boolean, reflect: true})
    show = this._options.show;

  protected _show(): void {
    this._logger.logMethod('_show');
    this.setAttribute('show', '');
  }

  protected _close(): void {
    this._logger.logMethod('_close');
    this.removeAttribute('show');
  }

  protected override async firstUpdated(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._show();
    this.setAttribute('elevated', '3');
  }

  override render(): unknown {
    this._logger.logMethod('render');

    return html`
      <p class="message">${this._options.message}</p>
      <alwatr-icon @click=${this._close} class="close-icon" name="close"></alwatr-icon>
    `;
  }
}
