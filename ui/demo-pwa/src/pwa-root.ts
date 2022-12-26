import {AlwatrRootElement, css, html, cache} from '@alwatr/element';
import {customElement} from 'lit/decorators.js';

import './demo-chat.js';

import type {RoutesConfig} from '@alwatr/router';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa-root': AlwatrPwaRoot;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa-root')
export class AlwatrPwaRoot extends AlwatrRootElement {
  protected override _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<alwatr-demo-chat></alwatr-demo-chat>`,
      },
    },
  };
}
