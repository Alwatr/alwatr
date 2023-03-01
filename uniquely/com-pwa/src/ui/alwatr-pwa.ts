import {html, customElement} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-85.css';

import './stuff/app-footer.js';
import {pageOrderDetailFsm} from '../manager/controller/order-detail.js';
import {pageOrderListFsm} from '../manager/controller/order-list.js';

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
        import('./page/home.js');
        return html`<alwatr-page-home unresolved>...</alwatr-page-home>`;
      },
      '_404': () => {
        import('./page/404.js');
        return html`<alwatr-page-404 unresolved>...</alwatr-page-404>`;
      },
      'order-list': () => {
        if (pageOrderListFsm.state.to === 'unresolved') {
          pageOrderListFsm.transition('IMPORT');
          import('./page/order-list.js');
        }
        return html`<alwatr-page-order-list unresolved>...</alwatr-page-order-list>`;
      },
      'order-detail': (routeContext) => {
        if (pageOrderDetailFsm.state.to === 'unresolved') {
          pageOrderDetailFsm.transition('IMPORT');
          import('./page/order-detail.js');
        }
        pageOrderDetailFsm.transition('SHOW_DETAIL', {orderId: +routeContext.sectionList[1]});
        return html`<alwatr-page-order-detail unresolved>...</alwatr-page-order-detail>`;
      },
      'new-order': () => {
        if (pageOrderListFsm.state.to === 'unresolved') {
          pageOrderListFsm.transition('IMPORT');
          import('./page/new-order.js');
        }
        return html`<alwatr-page-new-order unresolved>...</alwatr-page-new-order>`;
      },
    },
  };

  protected override _navigationBarTemplate(): unknown {
    return html`<alwatr-app-footer></alwatr-app-footer>`;
  }
}
