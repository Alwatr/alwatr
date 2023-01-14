import {AlwatrRootElement, html, customElement, cache, css} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {router, RoutesConfig} from '@alwatr/router';

import ionNormalize from './style/ionic.normalize.js';
import ionTheming from './style/ionic.theming.js';

import './ionic-components.js';
import './page-form.js';

import type {TemplateResult} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPwa;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa')
export class AlwatrPwa extends AlwatrRootElement {
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

  protected override _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<page-form class="ion-page"></page-form>`,
      },
    },
  };

  override render(): TemplateResult {
    return html`<main class="page-container">${cache(router.outlet(this._routes))}</main>`;
  }
}
