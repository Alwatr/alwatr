import {AlwatrElement} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {router} from '@alwatr/router';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import ionNormalize from './style/ionic.normalize';
import ionTheming from './style/ionic.theming';

import './component/page-flight-finder';
import './component/ionic-components';
import './director';

import type {RoutesConfig} from '@alwatr/router';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPWA;
  }
}

/**
 * alwatr-pwa PWA Root Element
 */
@customElement('alwatr-pwa')
export class AlwatrPWA extends AlwatrElement {
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

    l10n.resourceChangeSignal.addListener((resource) => {
      this._logger.logMethodArgs('l10nResourceChanged', {resource});
      this.requestUpdate();
    });
    router.signal.addListener((route) => {
      this._logger.logMethodArgs('routeChanged', {route});
      this.requestUpdate();
    });
    router.initial();
  }

  protected _activePage = 'home';

  protected _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<page-flight-finder class="ion-page"></page-flight-finder>`,
      },
    },
  };

  override render(): TemplateResult {
    return html` <main class="page-container">${router.outlet(this._routes)}</main>`;
  }
}
