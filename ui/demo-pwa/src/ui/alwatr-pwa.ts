import {AlwatrDynamicDirective, alwatrObserve, cache, directive, html, type PartInfo} from '@alwatr/fract';
import {router, type RouteContext} from '@alwatr/router2';
import {alwatrIcon} from '@alwatr/ui-kit2/icon/icon.js';
import {alwatrNavigationDrawer} from '@alwatr/ui-kit2/navigation-drawer/navigation-drawer.js';
import {alwatrNavigationRail} from '@alwatr/ui-kit2/navigation-rail/navigation-rail.js';
import {renderState} from '@alwatr/util';

import {alwatrPageTest} from './page-test.js';
import {icons} from '../icons.js';
import {appNavigationContext, type AppNavigationContext} from '../share/app-navigation-context.js';
import {appLogger} from '../share/logger.js';

export type PageName = 'home' | 'favorites' | 'contact' | 'other' | '_404';

appLogger.logModule?.('alwatr-pwa');

// const menuContext = {
//   pageAction: {
//     itemList: [
//       {icon: icons.home, href: '/home'},
//       {icon: icons.star, href: '/favorites'},
//       {icon: icons.triangle, href: '/other'},
//       {icon: icons.call, href: '/contact'},
//     ],
//   },
// };

export class AlwatrPwaDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-pwa>');
  }

  * render(): unknown {
    this._logger.logMethod?.('render');

    yield this._renderTopAppBar();
    yield this._renderNavigationRail();
    yield this._renderNavigationDrawer();

    yield html`<main class="flex grow flex-wrap gap-8 p-8">${this._renderContent()}</main>`;

    yield this._renderNavigationBar();
  }

  protected _renderNavigationBar(): unknown {
    return alwatrObserve(appNavigationContext, (content: AppNavigationContext) => {
      return cache(alwatrNavigationBar(content.navigationBar));
    });
  }

  protected _renderNavigationDrawer(): unknown {
    return alwatrObserve(appNavigationContext, (content: AppNavigationContext) => {
      return cache(alwatrNavigationDrawer(content.navigationDrawer));
    });
  }

  protected _renderNavigationRail(): unknown {
    return alwatrObserve(appNavigationContext, (context: AppNavigationContext) => {
      return alwatrNavigationRail(context.navigationRail);
    });
  }

  protected _renderTopAppBar(): unknown {
    return html`
      <header
        class="scroll flex h-16 shrink-0 grow-0 select-none items-center bg-surface px-1 [&.scroll]:bg-surfaceContainer"
      >
        <button
          class="inline-block cursor-pointer rounded-full p-3 text-onSurface [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
          onclick="navigationDrawer.classList.add('opened');scrim.classList.add('opened');"
        >
          ${alwatrIcon({svg: icons.menu})}
        </button>

        <div class="lead grow overflow-clip whitespace-nowrap px-1 text-start text-titleLarge text-onSurface">
          عنوان صفحه
        </div>

        <button
          class="inline-block cursor-pointer rounded-full p-3
          text-onSurfaceVariant [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
        >
          ${alwatrIcon({svg: icons.refresh})}
        </button>

        <button
          class="inline-block cursor-pointer rounded-full p-3
          text-onSurfaceVariant [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
        >
          ${alwatrIcon({svg: icons.calendarNumber})}
        </button>
      </header>
    `;
  }

  protected _renderContent(): unknown {
    return alwatrObserve(router, (route: RouteContext) => {
      const page = route.sectionList[0] as PageName ?? 'home';
      return cache(renderState(page, {
        home: () => html`<h1>home2...</h1>`,
        favorites: () => html`${alwatrPageTest(page)}`,
        other: () => html`${alwatrPageTest(page)}`,
        contact: () => html`<h1>call...</h1>`,
        _404: () => html`<h1>404!</h1>`,
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
