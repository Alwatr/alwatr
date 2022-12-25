import {AlwatrElement, css, html} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {router} from '@alwatr/router';
import {customElement} from 'lit/decorators.js';

import './alwatr-page-home.js';

import type {TemplateResult} from '@alwatr/element';
import type {RoutesConfig} from '@alwatr/router';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPWA;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa')
export class AlwatrPWA extends AlwatrElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
      .page-container {
        flex-grow: 1;
        contain: size layout style;
      }
    `,
  ];

  constructor() {
    super();

    l10n.config.defaultLocale = {
      code: 'en-US',
      direction: 'ltr',
      language: 'en',
    };
    l10n.setLocal();

    router.signal.addListener((route) => {
      this._logger.logMethodArgs('routeChanged', {route});
      this.requestUpdate();
    });

    router.initial();
  }

  protected _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<alwatr-page-home></alwatr-page-home>`,
      },
    },
  };

  override render(): TemplateResult {
    return html`<main class="page-container">${router.outlet(this._routes)}</main>`;
  }
}
