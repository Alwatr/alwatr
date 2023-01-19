import {html, customElement} from '@alwatr/element';
import {AlwatrPwaElement} from '@alwatr/element/pwa-element.js';
import {l10n} from '@alwatr/i18n';

import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/palette-270.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/font/vazirmatn.css';

import './page-home.js';
import './page-form.js';

import type {RoutesConfig} from '@alwatr/router';

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
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<alwatr-page-home></alwatr-page-home>`,
      },
      form: {
        render: () => html`<alwatr-page-form></alwatr-page-form>`,
      },
    },
  };

  protected override _initLocale(): void {
    l10n.config.defaultLocale = {
      code: 'fa-IR',
      direction: 'rtl',
      language: 'fa',
    };
    super._initLocale();
  }
}
