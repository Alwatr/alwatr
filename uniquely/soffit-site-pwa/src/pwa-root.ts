import {AlwatrRootElement, html, customElement} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';

import './page-home.js';

import type {PropertyValues} from '@alwatr/element';
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
        render: () => html`<alwatr-page-home></alwatr-page-home>`,
      },
    },
  };

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    l10n.config.defaultLocale = {
      code: 'fa-IR',
      direction: 'rtl',
      language: 'fa',
    };
    l10n.setLocal();
  }
}
