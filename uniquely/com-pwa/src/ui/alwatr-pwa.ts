import {html, customElement} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-270.css';

import './stuff/app-footer.js';
import {topAppBarContextProvider} from '../manager/context.js';

import type {RouteContext, RoutesConfig} from '@alwatr/router';

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
      'home': this._renderPageHome,
      '_404': this._renderPage404,
      'order-list': this._renderPageOrderList,
      'order': this._renderPageOrder,
    },
  };

  protected _renderPageHome(): unknown {
    import('./page/home.js');
    return html`<alwatr-page-home unresolved>...</alwatr-page-home>`;
  }

  protected _renderPage404(): unknown {
    import('./page/404.js');
    return html`<alwatr-page-404 unresolved>...</alwatr-page-404>`;
  }

  protected _renderPageOrderList(): unknown {
    import('./page/order-list.js');
    topAppBarContextProvider.setValue({headlineKey: 'loading'});
    return html`<alwatr-page-order-list unresolved>...</alwatr-page-order-list>`;
  }

  protected _renderPageOrder(routeContext: RouteContext): unknown {
    import('./page/order.js');
    topAppBarContextProvider.setValue({headlineKey: 'loading'});
    const orderId = routeContext.sectionList[1] || 'new';
    return html`<alwatr-page-order
      .orderId=${orderId}
      unresolved
    >...</alwatr-page-order>`;
  }

  protected override _navigationBarTemplate(): unknown {
    return html`<alwatr-app-footer></alwatr-app-footer>`;
  }
}
