import {contextConsumer} from '@alwatr/context';
import {html, customElement, nothing} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';
import {redirect, routeContextConsumer, type RouteContext, type RoutesConfig} from '@alwatr/router';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-270.css';

import './stuff/app-footer.js';
import {topAppBarContextProvider} from '../manager/context.js';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

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
  constructor() {
    super();
    this._checkSignedIn = this._checkSignedIn.bind(this);
  }

  protected override _routesConfig: RoutesConfig = {
    routeId: (routeContext) => routeContext.sectionList[0]?.toString(),
    templates: {
      'home': this._renderPageHome,
      '_404': this._renderPage404,
      'order-list': this._renderPageOrderList,
      'order': this._renderPageOrder,
      'sign-in': this._renderPageSignIn,
      's': this._saveLinkPass,
    },
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this._addSignalListeners(routeContextConsumer.subscribe(this._checkSignedIn));
  }

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
    const orderId = routeContext.sectionList[1] ?? 'new';
    return html`<alwatr-page-order .orderId=${orderId} unresolved>...</alwatr-page-order>`;
  }

  protected _renderPageSignIn(): unknown {
    import('./page/sign-in.js');
    topAppBarContextProvider.setValue({headlineKey: 'loading'});
    return html`<alwatr-page-sign-in></alwatr-page-sign-in>`;
  }

  protected _saveLinkPass(routeContext: RouteContext): unknown {
    const linkPass = routeContext.sectionList[1];
    if (linkPass) {
      localStorage.setItem('link-pass', linkPass + '');
    }
    redirect({sectionList: ['sign-in']}, 'replace');
    return nothing;
  }

  protected override _navigationBarTemplate(): unknown {
    return html`<alwatr-app-footer></alwatr-app-footer>`;
  }

  protected _checkSignedIn(routeContext: RouteContext): void {
    const routeId = this._routesConfig.routeId(routeContext);
    this._logger.logMethodArgs?.('_checkSignedIn', {routeId});
    if (
      contextConsumer<ComUser>('user_context').getValue() == null &&
      routeId !== 'sign-in' &&
      routeId !== 's' &&
      routeId !== ''
    ) {
      redirect({sectionList: ['sign-in']});
    }
  }
}
