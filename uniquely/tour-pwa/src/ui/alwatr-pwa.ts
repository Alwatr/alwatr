import {html, customElement, PropertyValues, AlwatrBaseElement, cache, CSSResultGroup, css} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {l10n} from '@alwatr/i18n2';
import {router} from '@alwatr/router2';
import {AlwatrSimpleSignal} from '@alwatr/signal2';
import '@alwatr/ui-kit/navigation-bar/navigation-bar.js';
import {navigationBarContext, navigationBarEvent} from '@alwatr/ui-kit/src/navigation-bar/context.js';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-40.css';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';
import {renderState, untilNextFrame} from '@alwatr/util';

import './page/home.js'; // for perf
import {scrollToTopEvent} from './pwa-helper/context.js';
import './stuff/app-footer.js';
import {navigationBarData} from '../config.js';

import type {PageName} from '../type.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPwa;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa')
class AlwatrPwa extends AlwatrBaseElement {
  static override styles: CSSResultGroup = css`
    :host {
      contain: size layout paint style;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: stretch;
      overflow: hidden;
      overflow: clip;
    }

    main {
      contain: size layout paint style;
      flex-grow: 1;
      flex-shrink: 0;
    }

    .scroll-area {
      overflow-y: auto;
    }

    [unresolved] {
      display: block;
      text-align: center;
      font-family: var(--sys-typescale-headline-small-font-family-name);
      font-weight: var(--sys-typescale-headline-small-font-weight);
      font-size: var(--sys-typescale-headline-small-font-size);
      letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
      line-height: var(--sys-typescale-headline-small-line-height);
    }
  `;

  protected _registerServiceWorkerSignal = new AlwatrSimpleSignal({name: 'register_service_worker'});
  protected _renderRecord: Record<PageName | '_default', undefined | PageName | (() => unknown)> = {
    _default: 'home',
    unknown: () => html`unknown...`,
    favorites: () => html`favorites...`,
    home: () => html`<alwatr-page-home></alwatr-page-home>`,
    tours: () => html`tours...`,
    call: () => html`call...`,
    404: () => {
      import('./page/404.js');
      return html`<alwatr-page-404></alwatr-page-404>`;
    },
  };

  override connectedCallback(): void {
    super.connectedCallback();

    navigationBarContext.setValue(navigationBarData);

    router.redirect('home');
    router.subscribe(() => this._routeContextUpdated());

    navigationBarEvent.subscribe((navigationItem) => {
      router.redirect(router.url({sectionList: navigationItem.link}));
    });

    if (!l10n.locale) {
      l10n.setLocale('auto');
    }

    scrollToTopEvent.subscribe(async (option): Promise<undefined> => {
      await untilNextFrame();
      this.renderRoot.querySelector('.scroll-area')?.scrollTo({
        top: 0,
        left: 0,
        behavior: option.smooth ? 'smooth' : 'auto',
      });
      return;
    });
  }

  protected _routeContextUpdated(): void {
    this.requestUpdate();
    scrollToTopEvent.dispatch({smooth: true});
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return [this._topAppBarTemplate(), this._mainTemplate(), this._navigationBarTemplate()];
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._registerServiceWorkerSignal.dispatch();
  }

  protected _topAppBarTemplate(): unknown {
    return html`<p>_topAppBarTemplate</p>`;
  }

  protected _mainTemplate(): unknown {
    return html`<main class="scroll-area">
      ${cache(renderState(<PageName>router.route.sectionList[0] ?? 'home', this._renderRecord, this))}
    </main>`;
  }

  protected _navigationBarTemplate(): unknown {
    return html`<alwatr-navigation-bar .content=${navigationBarData}></alwatr-navigation-bar>`;
  }
}
