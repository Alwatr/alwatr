// TODO: rename me to index
import {alwatrObserve, html, render, cache} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';
import {router} from '@alwatr/router2';
import {alwatrNavigationBar} from '@alwatr/ui-kit/navigation-bar2/navigation-bar.js';
import {alwatrTopAppBar} from '@alwatr/ui-kit/top-app-bar2/top-app-bar.js';
import {renderState} from '@alwatr/util';

import './app.scss';
import './page/404.js';
import './page/home.js';
import {alwatrHome} from './page/home2.js';
import {scrollToTopEvent} from './pwa-helper/context.js';
import {rootElement} from './root-element.js';
import {icons} from '../icons.js';
import {appLogger} from '../share/logger.js';

import type {RouteContext} from '@alwatr/router2';

appLogger.logModule?.('app');

export type PageName = 'home' | 'favorites' | 'tours' | 'call' | 'unknown' | '_404';

function* alwatrPwa(): unknown {
  yield alwatrTopAppBar({
    headline: 'Alwatr PWA Demo',
  });

  const main = alwatrObserve(router, (route: RouteContext) => {
    scrollToTopEvent.notify({smooth: true});

    const page = <PageName>route.sectionList[0] ?? 'home';
    return cache(
        renderState(page, {
          _default: '_404',
          unknown: () => html`unknown...`,
          favorites: () => html`favorites...`,
          home: () => alwatrHome(),
          tours: () => html`tours...`,
          call: () => html`call...`,
          _404: () => html`<alwatr-page-404></alwatr-page-404>`,
        }),
    );
  });

  yield html`<main class="scroll-area">${main}</main>`;

  yield alwatrNavigationBar({
    itemList: [
      {icon: icons.star, href: '/unknown'},
      {icon: icons.star, href: '/favorites'},
      {icon: icons.home, href: '/home'},
      {icon: icons.triangle, href: '/tours'},
      {icon: icons.call, href: '/call'},
    ],
  });
}

rootElement.replaceChildren();

if (!l10n.locale) {
  l10n.setLocale('auto');
}
render(alwatrPwa(), rootElement);

rootElement.removeAttribute('unresolved');

// TODO: send app rendered signal
