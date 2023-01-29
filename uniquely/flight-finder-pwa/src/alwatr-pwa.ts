import {AlwatrSmartElement, customElement, css, html} from '@alwatr/element';
import {AlwatrPwaElement} from '@alwatr/element/pwa-element.js';
import {type RoutesConfig, routerOutlet} from '@alwatr/router';

import ionNormalize from './style/ionic.normalize.js';
import ionTheming from './style/ionic.theming.js';

import './component/page-flight-finder.js';
import './component/ionic-components.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPWA;
  }
}

/**
 * alwatr-pwa PWA Root Element
 */
@customElement('alwatr-pwa')
export class AlwatrPWA extends AlwatrSmartElement {
  static override styles = [
    ionNormalize,
    ionTheming,
    css`
      .page-container {
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        contain: size layout style;
      }
    `,
  ];

  constructor() {
    super();

    l10n.config.defaultLocale = {
      code: 'fa-IR',
      direction: 'rtl',
      language: 'fa',
    };
    l10n.setLocal();

    router.signal.addListener((route) => {
      this._logger.logMethodArgs('routeChanged', {route});
      this.requestUpdate();
    });

    router.initial();
  }

  protected _activePage = 'home';

  protected override _routes: RoutesConfig = {
    routeId: (route) => route.sectionList[0]?.toString(),
    templates: {
      home: () => html`<page-flight-finder class="ion-page"></page-flight-finder>`,
      _404: super._routes.templates._404,
    },
  };

  override render(): unknown {
    return html` <main class="page-container">${router.outlet(this._routes)}</main>`;
    return html` <main class="page-container">${routerOutlet(this._routes)}</main>`;
}
