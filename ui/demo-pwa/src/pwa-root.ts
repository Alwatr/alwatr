import {AlwatrRootElement, html, customElement} from '@alwatr/element';

import './page-chat.js';
import './page-card.js';

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
        render: () => html`<alwatr-page-chat></alwatr-page-chat>`,
      },
      card: {
        render: () => html`<alwatr-page-card></alwatr-page-card>`,
      },
    },
  };
}
