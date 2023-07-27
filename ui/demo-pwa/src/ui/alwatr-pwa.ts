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

    yield html`
      <!-- Navigation drawer -->
      ${this._renderNavigationDrawer()}

      <!--  Navigation rail  -->
      ${this._renderNavigationRail()}

      <!-- App container -->
      <div
        class="flex h-full max-h-full w-full max-w-full flex-col flex-nowrap
        items-stretch overflow-clip medium:ps-20 extended:ps-[22.5rem]"
      >
        <!-- Top app bar -->
        ${this._renderTopAppBar()}

        <!-- Pages container -->
        <main class="flex grow flex-wrap gap-8 p-8">${this._renderContent()}</main>

        <!-- Navigation bar -->
        ${this._renderNavigationBar()}
      </div>`;
  }

  protected _renderNavigationBar(): unknown {
    return html`
      <footer class="shrink-0 grow-0 bg-surfaceContainer elevation-2">
        <nav
          class="mx-auto flex h-20 max-w-screen-medium cursor-pointer select-none
          items-stretch text-labelMedium text-onSurfaceVariant"
        >
          <a
            aria-selected="false"
            class="group flex grow flex-col items-center justify-start pt-3
            hover:text-onSurface aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant
              group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer
              group-aria-selected:text-onSecondaryContainer
              [&>.alwatr-icon]:block [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
            >
            ${alwatrIcon({svg: icons.menu})}
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">منو</div>
          </a>

          <a
            aria-selected="false"
            class="group flex grow flex-col items-center justify-start pt-3
            hover:text-onSurface aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant
              group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer
              group-aria-selected:text-onSecondaryContainer
              [&>.alwatr-icon]:block [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
            >
              ${alwatrIcon({svg: icons.call})}
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">تماس</div>
          </a>

          <a
            aria-selected="true"
            class="group flex grow flex-col items-center justify-start pt-3 aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant
              group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer
              group-aria-selected:text-onSecondaryContainer
              [&>.alwatr-icon]:block [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
            >
              ${alwatrIcon({svg: icons.create})}
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">یادداشت</div>
          </a>

          <a
            aria-selected="false"
            class="group flex grow flex-col items-center justify-start pt-3
            hover:text-onSurface aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant
              group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer
              group-aria-selected:text-onSecondaryContainer
              [&>.alwatr-icon]:block [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
            >
              ${alwatrIcon({svg: icons.mic})}
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">ضبط</div>
          </a>

          <a
            aria-selected="false"
            class="group flex grow flex-col items-center justify-start pt-3
            hover:text-onSurface aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant
              group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer
              group-aria-selected:text-onSecondaryContainer
              [&>.alwatr-icon]:block [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
            >
              ${alwatrIcon({svg: icons.person})}
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">دوستان</div>
          </a>
        </nav>
      </footer>
    `;
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
