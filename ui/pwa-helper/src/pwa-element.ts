import {AlwatrSmartElement, cache, html, css, type CSSResultGroup, type PropertyValues} from '@alwatr/element';
import {localeContextConsumer, setLocale} from '@alwatr/i18n';
import {routeContextConsumer, routerOutlet, type RoutesConfig} from '@alwatr/router';
import {commandTrigger} from '@alwatr/signal';

import '@alwatr/ui-kit/snackbar/controller.js';
import '@alwatr/ui-kit/style/token.css';
import '@alwatr/ui-kit/style/pwa.css';

import './signal/sw-user-notify.js';

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

  protected _routesConfig: RoutesConfig = {
    routeId: (route) => route.sectionList[0]?.toString(),
    templates: {
      home: () => html`<h1>Page Home ;)</h1>`,
      _404: () => html`<h1>404, Not found!</h1>`,
    },
  };

  override connectedCallback(): void {
    super.connectedCallback();
    if (localeContextConsumer.getValue() === undefined) {
      setLocale();
    }
    this._signalListenerList.push(routeContextConsumer.subscribe(this._routeChanged.bind(this)));
  }

  protected _routeChanged(): void {
    this._logger.logMethod('routeChanged');
    this.requestUpdate();
  }

  override render(): unknown {
    super.render();
    return html`<div class="page-container">${cache(routerOutlet(this._routesConfig))}</div>`;
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this.removeAttribute('unresolved');
    commandTrigger.request('register_service_worker_command', {});
  }
}
