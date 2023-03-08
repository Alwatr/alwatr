import {html, customElement} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-270.css';

import './page/home.js'; // for perf
import './stuff/app-footer.js';

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
    routeId: this._routesConfig.routeId,
    templates: {
      home: () => {
        return html`<alwatr-page-home>...</alwatr-page-home>`;
      },
      _404: () => {
        import('./page/404.js');
        return html`<alwatr-page-404>...</alwatr-page-404>`;
      },
      product: () => {
        import('./page/product.js');
        return html`<alwatr-page-product>...</alwatr-page-product>`;
      },
      agency: () => {
        import('./page/agency.js');
        return html`<alwatr-page-agency>...</alwatr-page-agency>`;
      },
    },
  };


  protected override _navigationBarTemplate(): unknown {
    return html`<alwatr-app-footer></alwatr-app-footer>`;
  }
}
