import {AlwatrDynamicDirective, alwatrObserve, cache, directive, html, type PartInfo} from '@alwatr/fract';
import {router, type RouteContext} from '@alwatr/router2';
import {alwatrNavigationBar} from '@alwatr/ui-kit2/navigation-bar/navigation-bar.js';
import {alwatrNavigationDrawer} from '@alwatr/ui-kit2/navigation-drawer/navigation-drawer.js';
import {alwatrNavigationRail} from '@alwatr/ui-kit2/navigation-rail/navigation-rail.js';
import {alwatrTopAppBar, AlwatrTopAppBarContent} from '@alwatr/ui-kit2/top-app-bar/top-app-bar.js';
import {renderState} from '@alwatr/util';

import {alwatrPageTest} from './page-test.js';
import {appNavigationContext, topAppBarContext, type AppNavigationContext} from '../share/app-navigation-context.js';
import {appLogger} from '../share/logger.js';

export type PageName = 'home' | 'favorites' | 'contact' | 'other' | '_404';

appLogger.logModule?.('alwatr-pwa');


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
      return cache(alwatrNavigationRail(context.navigationRail));
    });
  }

  protected _renderTopAppBar(): unknown {
    return alwatrObserve(topAppBarContext, (context: AlwatrTopAppBarContent) => {
      return cache(alwatrTopAppBar(context));
    });
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
