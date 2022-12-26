import {l10n} from '@alwatr/i18n';
import {router} from '@alwatr/router';
import {LitElement, css, CSSResultGroup, html} from 'lit';

import {LoggerMixin} from './mixins/logging.js';

import type {TemplateResult} from '@alwatr/element';
import type {RoutesConfig} from '@alwatr/router';


/**
 * Alwatr Root Base Element
 */
export class AlwatrRootElement extends LoggerMixin(LitElement) {
  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
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

  override render(): TemplateResult {
    return html`<div class="page-container">${cache(router.outlet(this._routes))}</div>`;
  }
}
