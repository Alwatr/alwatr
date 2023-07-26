/* eslint-disable lit/attribute-value-entities */
/* eslint-disable max-len */
import {AlwatrDynamicDirective, alwatrObserve, cache, directive, html, type PartInfo} from '@alwatr/fract';
import {router, type RouteContext} from '@alwatr/router2';
import {alwatrIcon} from '@alwatr/ui-kit2/icon/icon.js';
import {renderState} from '@alwatr/util';

import {alwatrPageTest} from './page-test.js';
import {icons} from '../icons.js';
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

    yield html` <!-- Navigation drawer -->
      ${this._renderNavigationDrawer()}

      <!--  Navigation rail  -->
      ${this._renderNavigationRail()}

      <!-- App container -->
      <div
        class="flex h-full max-h-full w-full max-w-full flex-col flex-nowrap items-stretch overflow-clip medium:ps-20 extended:ps-[22.5rem]"
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
          class="mx-auto flex h-20 max-w-screen-medium cursor-pointer select-none items-stretch text-labelMedium text-onSurfaceVariant"
        >
          <a
            aria-selected="false"
            class="group flex grow flex-col items-center justify-start pt-3 hover:text-onSurface aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer group-aria-selected:text-onSecondaryContainer"
            >
              <alwatr-icon name="menu-outline" class="block h-6 w-6"> </alwatr-icon>
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">منو</div>
          </a>

          <a
            aria-selected="false"
            class="group flex grow flex-col items-center justify-start pt-3 hover:text-onSurface aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer group-aria-selected:text-onSecondaryContainer"
            >
              <alwatr-icon name="call-outline" class="block h-6 w-6"> </alwatr-icon>
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">تماس</div>
          </a>

          <a
            aria-selected="true"
            class="group flex grow flex-col items-center justify-start pt-3 aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer group-aria-selected:text-onSecondaryContainer"
            >
              <alwatr-icon name="create-outline" class="block h-6 w-6"> </alwatr-icon>
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">یادداشت</div>
          </a>

          <a
            aria-selected="false"
            class="group flex grow flex-col items-center justify-start pt-3 hover:text-onSurface aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer group-aria-selected:text-onSecondaryContainer"
            >
              <alwatr-icon name="mic-outline" class="block h-6 w-6"> </alwatr-icon>
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">ضبط</div>
          </a>

          <a
            aria-selected="false"
            class="group flex grow flex-col items-center justify-start pt-3 hover:text-onSurface aria-selected:pointer-events-none"
          >
            <div
              class="rounded-2xl px-5 py-1 group-hover:stateHover-onSurfaceVariant group-active:stateActive-onSurfaceVariant group-aria-selected:bg-secondaryContainer group-aria-selected:text-onSecondaryContainer"
            >
              <alwatr-icon name="person-outline" class="block h-6 w-6"> </alwatr-icon>
            </div>
            <div class="py-1 group-aria-selected:text-onSurface">دوستان</div>
          </a>
        </nav>
      </footer>
    `;
  }

  protected _renderNavigationDrawer(): unknown {
    return html`
      <aside
        id="navigationDrawer"
        class="fixed bottom-0 left-0 top-0 z-modal w-[22.5rem] translate-x-full transform-gpu overflow-clip rounded-e-2xl bg-surfaceContainerLow transition-transform duration-300 ease-in will-change-transform elevation-1 rtl:left-auto rtl:right-0 extended:translate-x-0 extended:rounded-none extended:transition-none extended:will-change-auto extended:elevation-0 [&.opened]:translate-x-0 [&.opened]:ease-out"
      >
        <nav class="flex h-full flex-col bg-surfaceContainerLow px-3 py-3 elevation-1">
          <h2 class="mx-6 py-7 text-titleSmall text-onSurfaceVariant">سربرگ</h2>

          <ul class="text-labelLarge text-onSurfaceVariant">
            <li
              class="flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full bg-secondaryContainer px-3 text-onSecondaryContainer stateActive-secondaryContainer"
            >
              <alwatr-icon name="menu-outline" class="mx-1 h-6 w-6"></alwatr-icon>

              <div class="mx-2 grow">دریافتی</div>
              <div class="ml-3">۲۶</div>
            </li>

            <li
              class="w-84 group flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full px-3 hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer active:text-onSecondaryContainer active:stateActive-onSecondaryContainer"
            >
              <alwatr-icon name="person-outline" class="mx-1 h-6 w-6"></alwatr-icon>

              <div class="mx-2 grow">مخاطبین</div>
            </li>

            <li
              class="w-84 group flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full px-3 hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer active:text-onSecondaryContainer active:stateActive-onSecondaryContainer"
            >
              <alwatr-icon name="create-outline" class="mx-1 h-6 w-6"></alwatr-icon>

              <div class="mx-2 grow">ارسال</div>
            </li>

            <li
              class="w-84 group flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full px-3 hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer active:text-onSecondaryContainer active:stateActive-onSecondaryContainer"
            >
              <alwatr-icon name="archive-outline" class="mx-1 h-6 w-6"></alwatr-icon>

              <div class="mx-2 grow">آرشیو</div>
            </li>

            <li
              class="w-84 group flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full px-3 hover:bg-secondaryContainer hover:text-onSecondaryContainer hover:stateHover-onSecondaryContainer active:text-onSecondaryContainer active:stateActive-onSecondaryContainer"
            >
              <alwatr-icon name="trash-outline" class="mx-1 h-6 w-6"></alwatr-icon>

              <div class="mx-2 grow">سطل زباله</div>
            </li>
          </ul>
        </nav>
      </aside>
      <div
        id="scrim"
        class="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-scrim bg-scrim opacity-0 transition-opacity will-change-[opacity] extended:hidden [&.opened]:pointer-events-auto [&.opened]:opacity-25"
        onclick="navigationDrawer.classList.remove('opened');scrim.classList.remove('opened');"
      ></div>
    `;
  }

  protected _renderNavigationRail(): unknown {
    return html` <aside
      id="navigationRail"
      class="fixed bottom-0 left-0 top-0 z-modal w-20 translate-x-full transform-gpu overflow-clip rounded-e-2xl bg-surfaceContainerLow transition-transform duration-300 ease-in will-change-transform elevation-1 rtl:left-auto rtl:right-0 medium:translate-x-0 medium:rounded-none medium:transition-none medium:will-change-auto medium:elevation-0 extended:hidden [&.opened]:translate-x-0 [&.opened]:ease-out"
    >
      <nav class="flex h-full flex-col justify-around bg-surfaceContainerLow elevation-1">
        <ul class="flex flex-col gap-3 text-labelLarge text-onSurfaceVariant">
          <li class="w-84 group group mx-3 flex h-14 cursor-pointer select-none flex-col flex-nowrap items-center">
            <div
              class="flex h-8 w-14 flex-col items-center justify-around rounded-2xl group-hover:bg-secondaryContainer group-hover:stateHover-onSecondaryContainer group-active:stateActive-onSecondaryContainer"
            >
              <alwatr-icon
                name="person-outline"
                class="mx-1 h-6 w-6 group-hover:text-onSecondaryContainer group-active:text-onSecondaryContainer"
              ></alwatr-icon>
            </div>

            <div class="mx-2 grow group-hover:text-onSecondaryContainer group-active:text-onSecondaryContainer">
              مخاطبین
            </div>
          </li>

          <li class="w-84 group group mx-3 flex h-14 cursor-pointer select-none flex-col flex-nowrap items-center">
            <div
              class="flex h-8 w-14 flex-col items-center justify-around rounded-2xl group-hover:bg-secondaryContainer group-hover:stateHover-onSecondaryContainer group-active:stateActive-onSecondaryContainer"
            >
              <alwatr-icon
                name="send-outline"
                class="mx-1 h-6 w-6 group-hover:text-onSecondaryContainer group-active:text-onSecondaryContainer"
              ></alwatr-icon>
            </div>

            <div class="mx-2 grow group-hover:text-onSecondaryContainer group-active:text-onSecondaryContainer">
              ارسال
            </div>
          </li>

          <li class="w-84 group group mx-3 flex h-14 cursor-pointer select-none flex-col flex-nowrap items-center">
            <div
              class="flex h-8 w-14 flex-col items-center justify-around rounded-2xl group-hover:bg-secondaryContainer group-hover:stateHover-onSecondaryContainer group-active:stateActive-onSecondaryContainer"
            >
              <alwatr-icon
                name="archive-outline"
                class="mx-1 h-6 w-6 group-hover:text-onSecondaryContainer group-active:text-onSecondaryContainer"
              ></alwatr-icon>
            </div>

            <div class="mx-2 grow group-hover:text-onSecondaryContainer group-active:text-onSecondaryContainer">
              آرشیو
            </div>
          </li>

          <li class="w-84 group group mx-3 flex h-14 cursor-pointer select-none flex-col flex-nowrap items-center">
            <div
              class="flex h-8 w-14 flex-col items-center justify-around rounded-2xl group-hover:bg-secondaryContainer group-hover:stateHover-onSecondaryContainer group-active:stateActive-onSecondaryContainer"
            >
              <alwatr-icon
                name="trash-outline"
                class="mx-1 h-6 w-6 group-hover:text-onSecondaryContainer group-active:text-onSecondaryContainer"
              ></alwatr-icon>
            </div>

            <div class="mx-2 grow group-hover:text-onSecondaryContainer group-active:text-onSecondaryContainer">
              زباله
            </div>
          </li>
        </ul>
      </nav>
    </aside>`;
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
          class="inline-block cursor-pointer rounded-full p-3 text-onSurfaceVariant [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
        >
          ${alwatrIcon({svg: icons.refresh})}
        </button>

        <button
          class="inline-block cursor-pointer rounded-full p-3 text-onSurfaceVariant [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
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
