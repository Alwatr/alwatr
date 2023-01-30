import {localeConsumer, setLocale} from '@alwatr/i18n';
import {routerOutlet, type RoutesConfig} from '@alwatr/router';
import {html, css, type CSSResultGroup, type PropertyValues} from 'lit';
import {cache} from 'lit/directives/cache.js';

import {registerServiceWorker} from './helper/service-worker.js';
import {AlwatrSmartElement} from './smart-element.js';

import '@alwatr/ui-kit/style/token.css';
import '@alwatr/ui-kit/style/pwa.css';

/**
 * Alwatr Root Base Element
 *
 * Include: AlwatrPwaElement, root styles, router config, multi-page render
 */
export class AlwatrPwaElement extends AlwatrSmartElement {
  static override styles: CSSResultGroup = css`
    :host {
      contain: layout size style;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden;
      overflow: clip;
      height: 100%;
    }

    .page-container {
      flex-grow: 1;
      contain: size layout style;
    }
  `;

  protected _routes: RoutesConfig = {
    routeId: (route) => route.sectionList[0]?.toString(),
    templates: {
      home: () => html`<h1>Page Home ;)</h1>`,
      _404: () => html`404, Not found!`,
    },
  };

  constructor() {
    super();
    this._initLocale();
    localeConsumer.subscribe(this._routeChanged.bind(this));
  }

  protected _initLocale(): void {
    this._logger.logMethod('_initLocale');
    setLocale('fa');
  }

  protected _routeChanged(): void {
    this._logger.logMethod('routeChanged');
    this.requestUpdate();
  }

  override render(): unknown {
    super.render();
    return html`<div class="page-container">${cache(routerOutlet(this._routes))}</div>`;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.removeAttribute('unresolved');
    registerServiceWorker();
  }
}
