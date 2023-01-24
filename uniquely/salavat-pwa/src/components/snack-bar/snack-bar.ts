import {customElement, property, html, css, when, PropertyDeclaration} from '@alwatr/element';
import {AlwatrSurface} from '@alwatr/ui-kit/card/surface.js';

import '@alwatr/ui-kit/button/icon-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-snack-bar': AlwatrSnackBar;
  }
}

/**
 * @prop {String} text
 * @prop {Number} timeout
 * @prop {Boolean} open
 * @prop {Boolean} closeIcon
 *
 * @attr {String} text
 * @attr {Number} timeout
 * @attr {Boolean} open
 * @attr {Boolean} close-icon
 *
 * @fires close-icon
 */
@customElement('alwatr-snack-bar')
export class AlwatrSnackBar extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;

        z-index: var(--sys-zindex-popover);

        position: fixed;
        bottom: calc(-1 * 6 * var(--sys-spacing-track));
        left: calc(2 * var(--sys-spacing-track));
        right: calc(2 * var(--sys-spacing-track));
        height: min-content;
        min-height: calc(6 * var(--sys-spacing-track));
        border-radius: var(--sys-radius-small);
        padding: 0;
        padding-inline-start: calc(2 * var(--sys-spacing-track));

        opacity: 0;
        background-color: var(--sys-color-inverse-surface);
        color: var(--sys-color-inverse-on-surface);

        font-family: var(--sys-typescale-body-medium-font-family-name);
        font-weight: var(--sys-typescale-body-medium-font-weight);
        font-size: var(--sys-typescale-body-medium-font-size);
        letter-spacing: var(--sys-typescale-body-medium-letter-spacing);
        line-height: var(--sys-typescale-body-medium-line-height);

        transition-property: bottom, opacity;
        transition-delay: var(--sys-motion-duration-medium);
        transition-duration: var(--sys-motion-duration-medium);
        transition-timing-function: var(--sys-motion-easing-in-out);
      }

      :host([open]) {
        opacity: 1;
        bottom: calc(2 * var(--sys-spacing-track));
      }

      .text {
        padding: calc(1.5 * var(--sys-spacing-track)) 0;
      }

      alwatr-icon-button {
        margin: auto calc(0.5 * var(--sys-spacing-track));
        padding: 0;
      }
    `,
  ];

  @property()
    text = '';

  @property({type: Number})
    timeout = 10_000;

  @property({type: Boolean, reflect: true})
    open = false;

  @property({type: Boolean, reflect: true, attribute: 'close-icon'})
    closeIcon = false;

  private timeoutTimer?: NodeJS.Timeout;

  override connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('elevated', '3');
  }

  override requestUpdate(
      name?: PropertyKey | undefined,
      oldValue?: unknown,
      options?: PropertyDeclaration<unknown, unknown> | undefined,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (name === 'timeout') {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = setTimeout(() => {
        this.open = false;
      }, this.timeout);
    }
  }

  override render(): unknown {
    return html`
      <span class="text">${this.text}</span>
      ${when(
      this.closeIcon,
      () =>
        html` <alwatr-icon-button icon="close-outline" stated @click=${this.closeIconClicked}></alwatr-icon-button> `,
  )}
    `;
  }

  private closeIconClicked(): void {
    const event = new CustomEvent('close-icon');

    this.dispatchEvent(event);
  }
}
