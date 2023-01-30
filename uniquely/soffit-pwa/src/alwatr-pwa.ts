import {html, customElement} from '@alwatr/element';
import {AlwatrPwaElement} from '@alwatr/element/pwa-element.js';

import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/palette-270.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/font/vazirmatn.css';

import './page-home.js';

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
      home: () => html`<alwatr-page-home></alwatr-page-home>`,
      _404: (routeContext) => this._routesConfig.templates.home(routeContext),
    },
  };
}
