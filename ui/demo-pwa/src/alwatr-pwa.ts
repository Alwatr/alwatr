import {AlwatrPwaElement, html, customElement} from '@alwatr/element';

import type {RoutesConfig} from '@alwatr/router';

import './page-chat.js';
import './page-card.js';

import '@alwatr/ui-kit/style/theme/palette-300.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/font/vazirmatn.css';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPwa;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa')
export class AlwatrPwa extends AlwatrPwaElement {
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
