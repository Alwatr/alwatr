import {AlwatrElement} from '@alwatr/element';
import {router} from '@alwatr/router';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {cache} from 'lit/directives/cache.js';

import './page-flight-finder';

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
        render: () => html`<page-home class="page"></page-home>`,
      },
    },
  };

  override render(): TemplateResult {
    return html`<div class="page-container">${cache(router.outlet(this._routes))}</div>`;
  }
}
