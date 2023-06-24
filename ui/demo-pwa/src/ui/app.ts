// TODO: rename me to index
import {alwatrObserve, html, render} from '@alwatr/fract';
import {router} from '@alwatr/router2';
import {alwatrNavigationBar} from '@alwatr/ui-kit/navigation-bar2/navigation-bar.js';
import {alwatrTopAppBar} from '@alwatr/ui-kit/top-app-bar2/top-app-bar.js';

import './app.scss';
import {icons} from '../icons.js';
import {appLogger} from '../share/logger.js';

import type {RouteContext} from '@alwatr/router';

appLogger.logModule?.('app');

const alwatrPwa = (): unknown => html`<div class="alwatr-pwa">
  ${alwatrTopAppBar({headline: 'Alwatr PWA Demo'})}
  ${alwatrObserve(router, (route: RouteContext) => html`<h1>${route.pathname}</h1>`)}
  ${alwatrNavigationBar({
    itemList: [
      {icon: icons.home, href: '/home'},
      {icon: icons.star, href: '/favorites'},
      {icon: icons.triangle, href: '/other'},
      {icon: icons.call, href: '/contact'},
    ],
  })}
</div>`;

render(alwatrPwa(), document.body);

document.body.classList.remove('loading');

// TODO: send app rendered signal
