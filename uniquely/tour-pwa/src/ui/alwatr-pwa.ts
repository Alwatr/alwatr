import {AlwatrDynamicDirective, alwatrObserve, cache, directive, html, type PartInfo} from '@alwatr/fract';
import {router, type RouteContext} from '@alwatr/router2';
import {alwatrNavigationBar} from '@alwatr/ui-kit2/navigation-bar/navigation-bar.js';
import {alwatrTopAppBar} from '@alwatr/ui-kit2/top-app-bar/top-app-bar.js';
import {renderState} from '@alwatr/util';

import {icons} from '../icons.js';
import {appLogger} from '../share/logger.js';

export type PageName = 'home' | 'favorites' | 'tours' | 'call' | '_404';

appLogger.logModule?.('alwatr-pwa');

const menuContext = {
  pageAction: {
    itemList: [
      {
        icon: '',
        link: '',
        label: '',
      },
      {
        icon: icons.star,
        link: '/favorites',
        label: 'علاقه مندی ها',
      },
      {
        icon: icons.home,
        link: '/home',
        label: 'خانه',
      },
      {
        icon: icons.triangle,
        link: 'tours',
        label: 'تورها',
      },
      {
        icon: icons.call,
        link: '/call',
        label: 'تماس',
      },
    ],
  },
};

export class AlwatrPwaDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-pwa>');
  }

  * render(): unknown {
    this._logger.logMethod?.('render');

    yield html`${alwatrTopAppBar({
      headline: 'Alwatr Tour PWA',
    })}`;

    yield html`<main class="scroll-area">${this._renderContent()}</main>`;

    yield html`${alwatrNavigationBar(menuContext.pageAction)}`;
  }

  protected _renderContent(): unknown {
    return alwatrObserve(router, (route: RouteContext) => {
      const page = route.sectionList[0] as PageName ?? 'home';
      return cache(renderState(page, {
        favorites: () => html`favorites...`,
        home: () => html`<alwatr-page-home></alwatr-page-home>`,
        tours: () => html`tours...`,
        call: () => html`call...`,
        _404: () => {
          import('../../../tour-pwa/src/ui/page/404.js');
          return html`<alwatr-page-404></alwatr-page-404>`;
        },
        _default: '_404',
      }));
    });
  }
}

// TODO: send app rendered signal

export const alwatrPwa = directive(AlwatrPwaDirective);

export const alwatrPwaContainer = document.getElementById('alwatr_pwa')!;

if (alwatrPwaContainer === null) {
  throw new Error('Cannot find `<div id="alwatr_pwa">` element!');
}
