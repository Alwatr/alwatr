import {html, customElement} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-270.css';

import './page/home.js'; // for perf
import './stuff/app-footer.js';
import {pageNewOrderStateMachine} from '../manager/controller/new-order.js';
import {pageOrderDetailStateMachine} from '../manager/controller/order-detail.js';
import {pageOrderListStateMachine} from '../manager/controller/order-list.js';
import {pageOrderTrackingFsm} from '../manager/controller/order-tracking.js';

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
        // import('./page/home.js');
        return html`<alwatr-page-home unresolved>...</alwatr-page-home>`;
      },
      '_404': () => {
        import('./page/404.js');
        return html`<alwatr-page-404 unresolved>...</alwatr-page-404>`;
      },
      'order-list': () => {
        if (pageOrderListStateMachine.state.to === 'unresolved') {
          pageOrderListStateMachine.transition('IMPORT');
          import('./page/order-list.js');
        }
        return html`<alwatr-page-order-list unresolved>...</alwatr-page-order-list>`;
      },
      'order-detail': (routeContext) => {
        if (pageOrderDetailStateMachine.state.to === 'unresolved') {
          pageOrderDetailStateMachine.transition('IMPORT');
          import('./page/order-detail.js');
        }
        pageOrderDetailStateMachine.transition('SHOW_DETAIL', {orderId: +routeContext.sectionList[1]});
        return html`<alwatr-page-order-detail unresolved>...</alwatr-page-order-detail>`;
      },
      'order-tracking': (routeContext) => {
        if (pageOrderTrackingFsm.state.to === 'unresolved') {
          pageOrderTrackingFsm.transition('IMPORT');
          import('./page/order-tracking.js');
        }
        pageOrderTrackingFsm.transition('SHOW_TRACKING', {orderId: +routeContext.sectionList[1]});
        return html`<alwatr-page-order-tracking unresolved>...</alwatr-page-order-tracking>`;
      },
      'new-order': () => {
        if (pageNewOrderStateMachine.state.to === 'unresolved') {
          pageNewOrderStateMachine.transition('IMPORT');
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
