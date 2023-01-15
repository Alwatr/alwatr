import {customElement, css, html, AlwatrDummyElement, property, ifDefined} from '@alwatr/element';

import '@alwatr/ui-kit/card/card.js';
import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'icon-box': IconBox;
  }
}

/**
 * Icon Box Component
 *
 * @attr {string} icon
 * @attr {string} label
 * @attr {string} href
 * @attr {boolean} instagram
 * @attr {boolean} telegram
 *
 * @prop {String} icon
 * @prop {String} label
 * @prop {String} href
 */
@customElement('icon-box')
export class IconBox extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: flex;
      width: 100%;
    }

    alwatr-card,
    a {
      --_surface-color-bg: 83, 48%, 51%;
      --_surface-color-on: var(--sys-color-on-primary-hsl);

      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      width: 100%;
      -webkit-tap-highlight-color: transparent;
    }

    :host([instagram]) alwatr-card {
      --_surface-color-bg: 331.6, 69.2%, 51.6%;

      background-image: radial-gradient(circle at 7% 150%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf);
    }

    :host([telegram]) alwatr-card {
      --_surface-color-bg: 200, 100%, 40%;
    }

    alwatr-card alwatr-icon:first-child {
      height: calc(4.5 * var(--sys-spacing-track));
      width: calc(4.5 * var(--sys-spacing-track));
    }

    alwatr-card alwatr-icon:last-child {
      height: calc(3 * var(--sys-spacing-track));
      width: calc(3 * var(--sys-spacing-track));
    }

    alwatr-card span {
      font-family: var(--sys-typescale-title-medium-font-family-name);
      font-weight: var(--sys-typescale-title-medium-font-weight);
      font-size: var(--sys-typescale-title-medium-font-size);
      letter-spacing: var(--sys-typescale-title-medium-letter-spacing);
      line-height: var(--sys-typescale-title-medium-line-height);
    }
  `;

  @property()
    icon?: string;

  @property()
    label?: string;

  @property()
    href?: string;

  override render(): unknown {
    super.render();
    return html`
      <a href=${ifDefined(this.href)}>
        <alwatr-card stated elevated="3">
          <alwatr-icon .name=${this.icon}></alwatr-icon>
          <span>${this.label}</span>
          <alwatr-icon name="arrow-back-outline"></alwatr-icon>
        </alwatr-card>
      </a>
    `;
  }
}
