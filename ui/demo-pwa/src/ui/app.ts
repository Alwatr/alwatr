// TODO: rename me to index
import {alwatrObserve, html, render, cache} from '@alwatr/fract';
import {router} from '@alwatr/router2';
import {alwatrNavigationBar} from '@alwatr/ui-kit/navigation-bar2/navigation-bar.js';
import {alwatrTopAppBar} from '@alwatr/ui-kit/top-app-bar2/top-app-bar.js';
import {renderState} from '@alwatr/util';

// import './lit-debug.js';
import {alwatrPageTest} from './page-test.js';
import {rootElement} from './root-element.js';
// import '../../../ui-kit/style/theme/color.css';
// import '../../../ui-kit/style/theme/palette-300.css';
import {icons} from '../icons.js';
import {appLogger} from '../share/logger.js';

import type {RouteContext} from '@alwatr/router2';

appLogger.logModule?.('app');

export type PageName = 'home' | 'favorites' | 'contact' | 'other' | '_404';

appLogger.logModule?.('app');

function* alwatrPwa(): unknown {
  yield html`${alwatrTopAppBar({
    headline: 'Alwatr PWA Demo',
  })}`;

  const main = alwatrObserve(router, (route: RouteContext) => {
    const page = <PageName>route.sectionList[0] ?? 'home';
    return cache(renderState(page, {
      home: () => html`<h1>home2...</h1>`,
      favorites: () => html`${alwatrPageTest(page)}`,
      other: () => html`${alwatrPageTest(page)}`,
      contact: () => html`<h1>call...</h1>`,
      _404: () => html`<h1>404!</h1>`,
      _default: '_404',
    }));
  });

  yield html`<main class="scroll-area">${main}</main>`;

  yield html`${alwatrNavigationBar({
    itemList: [
      {icon: icons.home, href: '/home'},
      {icon: icons.star, href: '/favorites'},
      {icon: icons.triangle, href: '/other'},
      {icon: icons.call, href: '/contact'},
    ],
  })}`;
}

rootElement.replaceChildren();

render(alwatrPwa(), rootElement);

rootElement.removeAttribute('unresolved');

// TODO: send app rendered signal
