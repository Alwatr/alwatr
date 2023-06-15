import {html, customElement, PropertyValues, AlwatrBaseElement, cache} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {l10n} from '@alwatr/i18n2';
import {scrollToTopEvent} from '@alwatr/pwa-helper/context.js';
import {router} from '@alwatr/router2';
import {AlwatrSimpleSignal} from '@alwatr/signal2';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-40.css';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';
import {renderState, untilNextFrame} from '@alwatr/util';

import './page/home.js'; // for perf
import './stuff/app-footer.js';

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
  protected _registerServiceWorkerSignal = new AlwatrSimpleSignal({name: 'register_service_worker'});

  protected _renderRecord: Record<PageName | '_default', undefined | PageName | (() => unknown)> = {
    _default: 'home',
    home: () => html`<alwatr-page-home></alwatr-page-home>`,
    404: () => {
      import('./page/404.js');
      return html`<alwatr-page-404></alwatr-page-404>`;
    },
  };

  override connectedCallback(): void {
    super.connectedCallback();

    router.subscribe(this._routeContextUpdated);

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
      ${cache(renderState(<PageName>router.route.sectionList[1] ?? 'home', this._renderRecord, this))}
    </main>`;
  }

  protected _navigationBarTemplate(): unknown {
    return html`<footer>Navigation bar...</footer>`;
  }
}
