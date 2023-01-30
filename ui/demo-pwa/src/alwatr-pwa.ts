import {html, customElement} from '@alwatr/element';
import {AlwatrPwaElement} from '@alwatr/element/pwa-element.js';

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
class AlwatrPwa extends AlwatrPwaElement {
  protected override _routes: RoutesConfig = {
    routeId: super._routes.routeId,
    templates: {
      _404: super._routes.templates._404,
      home: () => html`<alwatr-page-chat></alwatr-page-chat>`,
      card: () => html`<alwatr-page-card></alwatr-page-card>`,
    },
  };
}
