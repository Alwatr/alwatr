import {AlwatrDummyElement, customElement, property, html, css, ifDefined} from '@alwatr/element';

import '@alwatr/icon';

/**
 * @prop {String} href
 * @prop {String} label
 * @prop {String} icon
 * @prop {String} badgeValue
 *
 * @attr {string} href
 * @attr {string} label
 * @attr {string} icon
 * @attr {string} badge-value
 * @attr {boolean} active
 */
@customElement('alwatr-navigation-bar-item')
export class AlwatrNavigationBarItem extends AlwatrDummyElement {
  static override styles = [
    css`
      :host {
        display: flex;
        width: 100%;
      }
      .navigation-bar-item {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: calc(1.5 * var(--sys-spacing-track)) 0;

        user-select: none;
        cursor: pointer;
        text-decoration: none;
        color: var(--sys-color-on-surface-variant);

        height: calc(7 * var(--sys-spacing-track));
        min-width: calc(10 * var(--sys-spacing-track));
      }
      .navigation-bar-item .active-indicator {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;

        border-radius: calc(2 * var(--sys-spacing-track));

        transition-property: width, background-color;

        height: calc(4 * var(--sys-spacing-track));
        width: calc(4 * var(--sys-spacing-track));
        max-width: 85%;
      }
      .navigation-bar-item .icon {
        color: inherit;
        font-size: calc(3 * var(--sys-spacing-track));

        transition-property: opacity;
      }
      .navigation-bar-item .inactive-icon {
        position: absolute;
      }
      .navigation-bar-item .label {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;

        overflow: clip;
        color: inherit;

        font-family: var(--sys-typescale-label-medium-font-family-name);
        font-weight: var(--sys-typescale-label-medium-font-weight);
        font-size: var(--sys-typescale-label-medium-font-size);
        letter-spacing: var(--sys-typescale-label-medium-letter-spacing);
        line-height: var(--sys-typescale-label-medium-line-height);
      }
      .navigation-bar-item .badge:empty {
        border-radius: calc(0.375 * var(--sys-spacing-track));
        height: calc(0.75 * var(--sys-spacing-track));
        width: calc(0.75 * var(--sys-spacing-track));
      }
    `,
    css`
      :host([active]) .navigation-bar-item .active-indicator {
        color: var(--sys-color-on-secondary-container);
        background-color: var(--sys-color-secondary-container);
      }
      :host([active]) .navigation-bar-item .inactive-icon,
      :host(:not([active])) .navigation-bar-item .active-icon {
        opacity: 0;
      }
      :host([active]) .navigation-bar-item .active-indicator {
        width: calc(10 * var(--sys-spacing-track));
      }
    `,
    css`
      /* incoming transition */
      :host([active]) .navigation-bar-item .active-indicator,
      .navigation-bar-item .icon {
        transition-duration: var(--sys-motion-duration-small-in);
        transition-timing-function: var(--sys-motion-easing-incoming);
      }

      /* exiting transition */
      .navigation-bar-item,
      :host([active]) .navigation-bar-item .inactive-icon,
      :host(:not([active])) .navigation-bar-item .active-icon {
        transition-duration: var(--sys-motion-duration-small-out);
        transition-timing-function: var(--sys-motion-easing-exiting);
      }
    `,
  ];

  @property()
    href?: string;

  @property()
    label?: string;

  @property()
    icon?: string;

  @property({attribute: 'badge-value'})
    badgeValue?: string;

  override render(): unknown {
    return html`
      <a class="navigation-bar-item" href=${ifDefined(this.href)}>
        <div class="active-indicator">
          <alwatr-icon class="icon active-icon" .name=${this.icon}></alwatr-icon>
          <alwatr-icon class="icon inactive-icon" .name=${this.icon + '-outline'}></alwatr-icon>
        </div>

        <span class="label">${this.label}</span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-navigation-bar-item': AlwatrNavigationBarItem;
  }
}
