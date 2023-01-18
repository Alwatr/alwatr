import {l10n} from '@alwatr/i18n';
import {router, type RoutesConfig} from '@alwatr/router';
import {html, css, type CSSResultGroup, type PropertyValues} from 'lit';
import {cache} from 'lit/directives/cache.js';

import '@alwatr/ui-kit/style/token.css';
import '@alwatr/ui-kit/style/pwa.css';
import {AlwatrSmartElement} from './smart-element.js';

/**
 * Alwatr Root Base Element
 *
 * Include: AlwatrPwaElement, root styles, router config, multi-page render
 */
export class AlwatrPwaElement extends AlwatrSmartElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden;
      overflow: clip;
      contain: layout size style;
    }

    .page-container {
      flex-grow: 1;
      contain: size layout style;
    }
  `;

  protected _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<h1>Page Home ;)</h1>`,
      },
    },
  };

  constructor() {
    super();
    this._initRouter();
  }

  protected _initRouter(): void {
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

  override render(): unknown {
    super.render();
    return html`<div class="page-container">${cache(router.outlet(this._routes))}</div>`;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.removeAttribute('unresolved');
  }
}
