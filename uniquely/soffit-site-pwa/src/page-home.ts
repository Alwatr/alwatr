import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import './icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      box-sizing: border-box;
      padding: calc(2 * var(--sys-spacing-track));
      gap: calc(2 * var(--sys-spacing-track));
    }

    header {
      display: flex;
      align-items: center;
      padding: calc(2 * var(--sys-spacing-track));
    }

    header img {
      width: 100%;
    }

    footer {
      width: 100%;
      display: flex;
      direction: ltr;
      text-align: center;
      box-sizing: border-box;
      color: var(--sys-color-on-primary-container);
      padding: calc(2 * var(--sys-spacing-track));
      background-color: var(--sys-color-primary-container);
      box-shadow: var(--sys-surface-elevation-4);
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <header>
        <img src="image/soffit.jpg" />
      </header>
      <section>
        <icon-box href="/" icon="gift-outline" label="شرکت در قرعه کشی میدکس"></icon-box>
        <icon-box href="/" icon="download-outline" label="دانلود کاتالوگ"></icon-box>
        <icon-box href="/" icon="earth-outline" label="سایت اصلی"></icon-box>
        <icon-box href="/" icon="call-outline" label="ارتباط مستقیم با سافیت"></icon-box>
        <icon-box href="/" icon="logo-instagram" label="اینستاگرام" instagram></icon-box>
        <icon-box href="/" icon="send-outline" label="کانال تلگرام" telegram></icon-box>
      </section>
      <footer>
        <span>A good ceiling is vital. But a SOFFIT ceiling can be an inspiration.</span>
      </footer>
    `;
  }
}
