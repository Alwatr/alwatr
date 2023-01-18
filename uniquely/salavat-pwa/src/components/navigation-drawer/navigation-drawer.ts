import {AlwatrSmartElement, customElement, html, css} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-navigation-drawer': AlwatrNavigationDrawer;
  }
}

/**
 * @attr {boolean} open
 */
@customElement('alwatr-navigation-drawer')
export class AlwatrNavigationDrawer extends AlwatrSmartElement {
  static override styles = [
    css`
      :host {
        display: flex;

        position: fixed;
        inset: 0;
        z-index: var(--sys-zindex-topness);
        right: -100vw;
        transform: translateX(0px);

        width: 100%;
        height: 100%;

        will-change: transform;

        transition-property: transform;
        transition-duration: var(--sys-motion-duration-large-out);
        transition-timing-function: var(--sys-motion-easing-exiting);
      }

      .navigation-drawer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-y: auto;

        background-color: var(--sys-color-surface);
        background-image: url('/images/background.jpg');
        background-repeat: no-repeat;
        background-position: bottom right;
        background-size: cover;

        max-width: calc(100vw - 7 * var(--sys-spacing-track));
        width: calc(45 * var(--sys-spacing-track));
        height: 100%;
      }

      .navigation-drawer__items {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: calc(1.5 * var(--sys-spacing-track));
        backdrop-filter: blur(2vw);
      }
    `,
    css`
      :host([open]) {
        transform: translateX(-100vw);

        transition-duration: var(--sys-motion-duration-large-in);
        transition-timing-function: var(--sys-motion-easing-incoming);
      }
    `,
  ];

  static navigationDrawerSignal = new SignalInterface('navigation-drawer');

  override connectedCallback(): void {
    super.connectedCallback();

    const navigationDrawerSignalListener = AlwatrNavigationDrawer.navigationDrawerSignal.addListener((options) => {
      if (options.open === true) {
        requestAnimationFrame(() => {
          this.setAttribute('open', '');
        });
      }
      else {
        requestAnimationFrame(() => {
          this.removeAttribute('open');
        });
      }
    });

    this._signalListenerList.push(navigationDrawerSignalListener);
  }

  override render(): unknown {
    return html`
      <div class="navigation-drawer" @click=${this.navigationDrawerClicked}>
        <div class="navigation-drawer__items">
          <alwatr-navigation-drawer-item tabindex="-1" icon="megaphone" label="کمپین"></alwatr-navigation-drawer-item>
          <alwatr-navigation-drawer-item tabindex="-1" icon="book" label="داستان ما"></alwatr-navigation-drawer-item>
          <alwatr-navigation-drawer-item
            tabindex="-1"
            icon="people"
            label="حمایت از ما"
          ></alwatr-navigation-drawer-item>
          <alwatr-navigation-drawer-item
            tabindex="-1"
            icon="image"
            label="دانلود والپیپر"
          ></alwatr-navigation-drawer-item>
          <alwatr-navigation-drawer-item
            tabindex="-1"
            icon="cloud-download"
            label="دانلود اپلیکشین"
          ></alwatr-navigation-drawer-item>
        </div>
      </div>
    `;
  }

  private navigationDrawerClicked(event: PointerEvent): void {
    event.stopPropagation();
  }
}
