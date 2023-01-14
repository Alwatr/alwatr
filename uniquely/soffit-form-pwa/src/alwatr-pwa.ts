import {AlwatrRootElement, html, customElement, type TemplateResult, cache} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {router, RoutesConfig} from '@alwatr/router';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPwa;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa')
export class AlwatrPwa extends AlwatrRootElement {
  constructor() {
    super();

    l10n.config.defaultLocale = {
      code: 'fa-IR',
      direction: 'rtl',
      language: 'fa',
    };
    l10n.setLocal();

    router.signal.addListener((route) => {
      this._logger.logMethodArgs('routeChanged', {route});
      this.requestUpdate();
    });

    router.initial();
  }

  protected override _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<p>${l10n.localize('hello')}</p>`,
      },
    },
  };

  override render(): TemplateResult {
    return html`<div>${cache(router.outlet(this._routes))}</div>`;
  }
}
