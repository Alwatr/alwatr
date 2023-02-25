import {html, customElement} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {message} from '@alwatr/i18n';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-85.css';

import './stuff/app-footer.js';
import '../manager/index.js';

import type {RoutesConfig} from '@alwatr/router';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPwa;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa')
class AlwatrPwa extends AlwatrPwaElement {
  protected override _routesConfig: RoutesConfig = {
    routeId: (routeContext) => routeContext.sectionList[0]?.toString(),
    templates: {
      'home': () => {
        import('./page/page-home.js');
        return html`<alwatr-page-home unresolved>${message('loading')}</alwatr-page-home>`;
      },
      '_404': () => {
        import('./page/page-404.js');
        return html`<alwatr-page-404 unresolved>${message('loading')}</alwatr-page-404>`;
      },
      'order-list': () => {
        import('./page/order-list.js');
        return html`<alwatr-page-order-list unresolved>${message('loading')}</alwatr-page-order-list>`;
      },
      'order': (routeContext) => {
        import('../page-order/page-order.js');
        return html`<alwatr-page-order .routeContext=${routeContext}>${message('loading')}</alwatr-page-order>`;
      },
    },
  };

  protected override _navigationBarTemplate(): unknown {
    return html`<alwatr-app-footer></alwatr-app-footer>`;
  }
}
