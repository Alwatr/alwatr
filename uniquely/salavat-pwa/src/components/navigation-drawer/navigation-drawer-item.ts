import {customElement, property, html, css, ifDefined, AlwatrSurfaceElement} from '@alwatr/element';

import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-navigation-drawer-item': AlwatrNavigationDrawerItem;
  }
}

@customElement('alwatr-navigation-drawer-item')
export class AlwatrNavigationDrawerItem extends AlwatrSurfaceElement {
  static override styles = [
    AlwatrSurfaceElement.styles,
    css`
      :host {
        --_surface-color-bg: transparent;
        --_surface-elevation: var(--sys-surface-elevation-0) !important;

        display: flex;
        flex-direction: column;
        overflow: hidden;
        overflow: clip;
        width: 100%;
      }

      .navigation-drawer-item {
        display: flex;
        align-items: center;
        position: relative;
        gap: calc(1.5 * var(--sys-spacing-track));
        padding: var(--sys-spacing-track);
        padding-inline-start: 30%;

        user-select: none;
        cursor: pointer;
        text-decoration: none;

        transition-property: color, background-color;

        height: calc(3 * var(--sys-spacing-track));

        -webkit-tap-highlight-color: transparent;
      }

      .navigation-drawer-item .icon {
        color: inherit;
        font-size: calc(3 * var(--sys-spacing-track));

        margin: auto;

        transition-property: opacity;
      }

      .navigation-drawer-item .inactive-icon {
        position: absolute;
        top: 0;
        bottom: 0;
      }

      .navigation-drawer-item .label {
        color: inherit;
        flex-grow: 1;
      }

      .navigation-drawer-item .label {
        font-family: var(--sys-typescale-label-large-font-family-name);
        font-weight: var(--sys-typescale-label-large-font-weight);
        font-size: var(--sys-typescale-label-large-font-size);
        letter-spacing: var(--sys-typescale-label-large-letter-spacing);
        line-height: var(--sys-typescale-label-large-line-height);
      }
    `,
    css`
      :host([active]) .navigation-drawer-item {
        color: var(--sys-color-on-secondary-container);
        background-color: var(--sys-color-secondary-container);
      }

      :host([active]) .navigation-drawer-item .inactive-icon,
      :host(:not([active])) .navigation-drawer-item .active-icon {
        opacity: 0;
      }
    `,
    css`
      /* incoming transition */
      :host([active]) .navigation-drawer-item,
      .navigation-drawer-item .icon {
        transition-duration: var(--sys-motion-duration-small-in);
        transition-timing-function: var(--sys-motion-easing-incoming);
      }

      /* exiting transition */
      .navigation-drawer-item,
      :host([active]) .navigation-drawer-item .inactive-icon,
      :host(:not([active])) .navigation-drawer-item .active-icon {
        transition-duration: var(--sys-motion-duration-small-out);
        transition-timing-function: var(--sys-motion-easing-exiting);
      }
    `,
  ];

  @property() href?: string;

  @property() label = '';

  @property() icon = '';

  @property({type: Boolean, reflect: true}) active = false;

  override render(): unknown {
    return html`
      <a class="navigation-drawer-item" href=${ifDefined(this.href)}>
        <alwatr-icon class="icon inactive-icon" name="${this.icon}-outline"></alwatr-icon>
        <alwatr-icon class="icon active-icon" name=${this.icon}></alwatr-icon>

        <span class="label">${this.label}</span>
      </a>
    `;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('stated', '');
  }
}
