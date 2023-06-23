// TODO: rename me to index
import {html, render} from '@alwatr/fract';
import {alwatrNavigationBar} from '@alwatr/ui-kit/navigation-bar2/navigation-bar.js';
import {alwatrTopAppBar} from '@alwatr/ui-kit/top-app-bar2/top-app-bar.js';

import './app.scss';
import {icons} from '../icons.js';
import {appLogger} from '../share/logger.js';

appLogger.logModule?.('app');

const alwatrPwa = (): unknown => html`<div class="alwatr-pwa">
  ${alwatrTopAppBar({headline: 'Alwatr PWA Demo'})}
  ${alwatrNavigationBar({itemList: [{icon: icons.callIcon}, {icon: icons.homeIcon}]})}
</div>`;

render(alwatrPwa(), document.body);

document.body.classList.remove('loading');

// TODO: send app rendered signal
