import {AlwatrDynamicDirective, alwatrObserve, cache, directive, html, type PartInfo} from '@alwatr/fract';
import {router, type RouteContext} from '@alwatr/router2';
import {alwatrNavigationBar} from '@alwatr/ui-kit2/navigation-bar/navigation-bar.js';
import {alwatrNavigationDrawer} from '@alwatr/ui-kit2/navigation-drawer/navigation-drawer.js';
import {alwatrTopAppBar} from '@alwatr/ui-kit2/top-app-bar/top-app-bar.js';
import {renderState} from '@alwatr/util';

import {alwatrPageTest} from './page-test.js';
import {appLogger} from '../share/logger.js';

export type PageName = 'home' | 'favorites' | 'contact' | 'other' | '_404';

appLogger.logModule?.('alwatr-pwa');


export class AlwatrPwaDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-pwa>');
  }

  * render(): unknown {
    this._logger.logMethod?.('render');

    yield html`${alwatrTopAppBar({
      headline: 'Alwatr PWA Demo',
    })}`;

    yield html`<main class="scroll-area grow">${this._renderContent()}</main>`;

    yield html`${alwatrNavigationDrawer()}`;
    yield html`${alwatrNavigationBar()}`;
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
