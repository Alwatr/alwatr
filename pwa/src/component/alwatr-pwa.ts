import {router} from '@alwatr/router';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {cache} from 'lit/directives/cache.js';

import {BaseElement} from './app-debt/element';

import './page-flight-finder';

import type {RoutesConfig} from '@alwatr/router';
import type {ListenerInterface} from '@alwatr/signal';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'flight-finder-pwa': FlightFinderPWA;
  }
}

/**
 * Flight Finder PWA Root Element
 *
 * ```html
 * <flight-finder-pwa></flight-finder-pwa>
 * ```
 */
@customElement('flight-finder-pwa')
export class FlightFinderPWA extends BaseElement {
  static override styles = [
    css`
      :host {
        inset: 0;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        position: absolute;
        flex-direction: column;
        justify-content: space-between;
        contain: layout size style;
        overflow: hidden;
        z-index: 0;
      }

      .page-container {
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        contain: size layout style;
      }

      .page {
        inset: 0;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        position: absolute;
        flex-direction: column;
        justify-content: space-between;
        contain: layout size style;
        overflow: hidden;
        z-index: 0;
      }

      /* This will be displayed only on lazy loading. */
      [unresolved]::after {
        content: '...';
        display: block;
        font-size: 2em;
        padding-top: 30vh;
        letter-spacing: 3px;
        text-align: center;
      }
    `,
  ];

  constructor() {
    super();
    router.initial();
  }

  protected _activePage = 'home';

  protected _routes: RoutesConfig = {
    // TODO: refactor route, we need to get active page!
    // TODO: ability to redirect!
    map: (route) => (this._activePage = route.sectionList[0]?.toString().trim() || 'home'),
    list: {
      home: {
        render: () => html`<page-home class="page"></page-home>`,
      },
    },
  };

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._listenerList.push(
        router.signal.addListener(
            (route) => {
              this._logger.logMethodArgs('routeChanged', {route});
              this.requestUpdate();
            },
            {receivePrevious: true},
        ),
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html` <div class="page-container">${cache(router.outlet(this._routes))}</div> `;
  }
}
