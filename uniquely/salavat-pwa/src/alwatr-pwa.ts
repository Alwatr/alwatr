import {html, customElement, css, query} from '@alwatr/element';
import {AlwatrPwaElement} from '@alwatr/element/pwa-element.js';
import {l10n} from '@alwatr/i18n';
import {router} from '@alwatr/router';
import {SignalInterface} from '@alwatr/signal';

import '@alwatr/ui-kit/style/theme/palette-dynamic.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/font/vazirmatn-roundot.css';
import '@alwatr/icon';
import '@alwatr/ui-kit/icon-button/standard-icon-button.js';

import routes from './routes.js';

import '../res/styles/index.css';
import './components/navigation-drawer/navigation-drawer.js';
import './components/navigation-drawer/navigation-drawer-item.js';
import './components/snack-bar/snack-bar.js';

import type {AlwatrNavigationDrawer} from './components/navigation-drawer/navigation-drawer.js';
import type {AlwatrSnackBar} from './components/snack-bar/snack-bar.js';
import type {CSSResultGroup} from '@alwatr/element';
import type {RoutesConfig} from '@alwatr/router';
import type {AlwatrStandardIconButton} from '@alwatr/ui-kit/button/icon-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa-root': AlwatrPwaRoot;
  }
}

@customElement('alwatr-pwa-root')
export class AlwatrPwaRoot extends AlwatrPwaElement {
  static override styles: CSSResultGroup = [
    AlwatrPwaElement.styles,
    css`
      :host {
        user-select: none;
      }

      .page-container {
        display: flex;
        flex-direction: column;
      }

      alwatr-standard-icon-button {
        width: calc(7 * var(--sys-spacing-track));
        height: calc(7 * var(--sys-spacing-track));
      }

      alwatr-navigation-drawer ~ .scrim {
        position: fixed;
        inset: 0;
        opacity: 0;
        width: 0;
        background-color: #0008;
        z-index: var(--sys-zindex-backdrop);
        will-change: opacity;

        transition: opacity var(--sys-motion-duration-large) var(--sys-motion-easing-in-out),
          width 0ms var(--sys-motion-duration-large);
      }

      alwatr-navigation-drawer[open] ~ .scrim {
        width: 100vw;
        opacity: 1;

        transition: opacity var(--sys-motion-duration-large) var(--sys-motion-easing-in-out), width 0ms 0ms;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: calc(7 * var(--sys-spacing-track));

        position: fixed;
        top: 0;
        right: 0;
        left: 0;

        z-index: var(--sys-zindex-default);
      }

      header alwatr-standard-icon-button::part(icon) {
        width: calc(4 * var(--sys-spacing-track));
        height: calc(4 * var(--sys-spacing-track));
      }

      .main-image {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-grow: 1;
        /* url reapet position/size */
        background: url('/images/main-image.jpg') no-repeat top center/cover;
        /* top right/left bottom */
        margin: 0 calc(7 * var(--sys-spacing-track)) calc(3 * var(--sys-spacing-track));
        border-radius: 0 0 50vw 50vw;
        box-shadow: 2px 4px 50px #37474f;
        overflow: hidden;
        overflow: clip;
      }

      .main-image alwatr-standard-icon-button {
        --_surface-color-bg: var(--sys-color-primary-hsl);

        border-radius: 100px 100px 0px 0px;
        padding: 0 calc(4 * var(--sys-spacing-track));
        height: calc(7 * var(--sys-spacing-track));
        margin-bottom: calc(-1 * 7 * var(--sys-spacing-track));
        background-color: hsl(var(--_surface-color-bg));

        transition-property: margin-bottom;
        transition-delay: var(--sys-motion-duration-large);
        transition-duration: var(--sys-motion-duration-large);
        transition-timing-function: var(--sys-motion-easing-in-out);
      }

      .main-image alwatr-standard-icon-button[show] {
        margin-bottom: 0;
      }

      .main-image alwatr-standard-icon-button::part(icon) {
        width: calc(5 * var(--sys-spacing-track));
        height: calc(5 * var(--sys-spacing-track));
      }

      footer {
        display: flex;
        direction: ltr;
        align-items: center;
        justify-content: space-between;
        height: calc(7 * var(--sys-spacing-track));

        font-family: var(--sys-typescale-title-small-font-family-name);
        font-weight: var(--sys-typescale-title-small-font-weight);
        font-size: var(--sys-typescale-title-small-font-size);
        letter-spacing: var(--sys-typescale-title-small-letter-spacing);
        line-height: var(--sys-typescale-title-small-line-height);
      }

      footer span {
        display: flex;
        align-items: flex-end;
        gap: calc(0.6 * var(--sys-spacing-track));
        padding-inline-start: calc(2 * var(--sys-spacing-track));
      }

      footer span alwatr-icon {
        font-size: calc(2.5 * var(--sys-spacing-track));
      }
    `,
  ];

  @query('.main-image>alwatr-standard-icon-button')
  private salavatSubmitButton?: AlwatrStandardIconButton;

  @query('alwatr-navigation-drawer')
  private navigationDrawer?: AlwatrNavigationDrawer;

  @query('alwatr-snack-bar')
  private snackBar?: AlwatrSnackBar;

  static navigationDrawerSignal = new SignalInterface('navigation-drawer');

  static snackBarSignal = new SignalInterface('snack-bar');

  static salavatSubmitButtonSignal = new SignalInterface('salavat-submit-button');

  override connectedCallback(): void {
    super.connectedCallback();

    l10n.setLocal({
      code: 'fa-IR',
      direction: 'rtl',
      language: 'fa',
    });

    const salavatSubmitButtonSignalListener = AlwatrPwaRoot.salavatSubmitButtonSignal.addListener((options) => {
      if (options.show === true) {
        this.salavatSubmitButton?.setAttribute('show', '');
      }
      else {
        this.salavatSubmitButton?.removeAttribute('show');
      }
    });

    const navigationDrawerSignalListener = AlwatrPwaRoot.navigationDrawerSignal.addListener((options) => {
      if (options.open === true) {
        this.navigationDrawer?.setAttribute('open', '');
      }
      else {
        this.navigationDrawer?.removeAttribute('open');
      }
    });

    const snackBarSignalListener = AlwatrPwaRoot.snackBarSignal.addListener((options) => {
      if (this.snackBar != null) {
        this.snackBar.open = options.open ?? false;
        this.snackBar.text = options.text ?? this.snackBar.text;
        this.snackBar.timeout = options.timeout ?? 5_000;
      }
    });

    const routeChangedSignalListener = router.signal.addListener(() => {
      requestAnimationFrame(() => setTimeout(this.navigationClose, 100));
    });

    this._signalListenerList.push(
        salavatSubmitButtonSignalListener,
        routeChangedSignalListener,
        navigationDrawerSignalListener,
        snackBarSignalListener,
    );

    AlwatrPwaRoot.snackBarSignal.dispatch({
      open: true,
      text: 'در زندگی زخمهایی هست که مثل خوره روح را آهسته در انزوا میخورد و میتراشد.',
    });
  }

  protected override _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString() ?? 'home',
    list: routes,
  };

  override render(): unknown {
    super.render();
    return html`
      <alwatr-navigation-drawer
        .routes=${this._routes.list}
        .currentSlug=${router.currentRoute.sectionList[0]?.toString() ?? 'home'}
      ></alwatr-navigation-drawer>
      <div class="scrim" @click=${this.mainClicked}></div>

      <header>
        <alwatr-standard-icon-button
          icon="menu-outline"
          stated
          @click=${this.menuButtonClicked}
        ></alwatr-standard-icon-button>
        <alwatr-standard-icon-button
          icon="salavat-small"
          url-prefix="/images/icons/"
          stated
        ></alwatr-standard-icon-button>
      </header>

      <main class="page-container">
        <div class="main-image">
          <alwatr-standard-icon-button icon="add-outline" filled stated></alwatr-standard-icon-button>
        </div>

        ${router.outlet(this._routes)}
      </main>

      <alwatr-snack-bar close-icon @close-icon=${this.snackBarClose}></alwatr-snack-bar>

      <footer>
        <span class="made-with-love">
          Made With
          <alwatr-icon name="heart-outline" class="love"></alwatr-icon>
          for
          <alwatr-icon name="heart" class="him"></alwatr-icon>
        </span>

        <alwatr-standard-icon-button icon="cloud-download-outline" stated></alwatr-standard-icon-button>
      </footer>
    `;
  }

  private menuButtonClicked(event: PointerEvent): void {
    this._logger.logMethod('menuButtonClicked');

    event.stopPropagation();

    this.navigationOpen();
  }

  private mainClicked(): void {
    this._logger.logMethodArgs('pageClicked', {open: AlwatrPwaRoot.navigationDrawerSignal.value?.open === true});

    this.navigationClose();
  }

  private navigationOpen(): void {
    if (
      AlwatrPwaRoot.navigationDrawerSignal.value?.open === false ||
      AlwatrPwaRoot.navigationDrawerSignal.value == null
    ) {
      AlwatrPwaRoot.navigationDrawerSignal.dispatch({open: true});
    }
  }

  private navigationClose(): void {
    if (
      AlwatrPwaRoot.navigationDrawerSignal.value?.open === true ||
      AlwatrPwaRoot.navigationDrawerSignal.value == null
    ) {
      AlwatrPwaRoot.navigationDrawerSignal.dispatch({open: false});
    }
  }

  private snackBarClose(): void {
    AlwatrPwaRoot.snackBarSignal.dispatch({});
  }
}
