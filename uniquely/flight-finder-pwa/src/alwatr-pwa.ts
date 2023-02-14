import {customElement, html} from '@alwatr/element';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';

import './component/ionic-components.js';
import './component/page-flight-finder.js';
import ionNormalize from './style/ionic.normalize.js';
import ionTheming from './style/ionic.theming.js';

import type {RoutesConfig} from '@alwatr/router';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPWA;
  }
}

/**
 * alwatr-pwa PWA Root Element
 */
@customElement('alwatr-pwa')
export class AlwatrPWA extends AlwatrPwaElement {
  static override styles = [ionNormalize, ionTheming];

  protected _activePage = 'home';

  protected override _routesConfig: RoutesConfig = {
    routeId: super._routesConfig.routeId,
    templates: {
      home: () => html`<page-flight-finder class="ion-page"></page-flight-finder>`,
      _404: super._routesConfig.templates._404,
    },
  };
}
