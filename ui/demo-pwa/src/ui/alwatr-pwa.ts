// TODO: rename me to index
import {AlwatrDynamicDirective, directive, html, type PartInfo} from '@alwatr/fract';

import {alwatrButton} from './button.js';
import {appLogger} from '../share/logger.js';

export type PageName = 'home' | 'favorites' | 'contact' | 'other' | '_404';

appLogger.logModule?.('app');

// function* renderApp(): unknown {
//   yield html`${alwatrTopAppBar({
//     headline: 'Alwatr PWA Demo',
//   })}`;

//   const main = alwatrObserve(router, (route: RouteContext) => {
//     const page = <PageName>route.sectionList[0] ?? 'home';
//     return cache(renderState(page, {
//       home: () => html`<h1>home2...</h1>`,
//       favorites: () => html`${alwatrPageTest(page)}`,
//       other: () => html`${alwatrPageTest(page)}`,
//       contact: () => html`<h1>call...</h1>`,
//       _404: () => html`<h1>404!</h1>`,
//       _default: '_404',
//     }));
//   });

//   yield html`<main class="scroll-area">${main}</main>`;

//   yield html`${alwatrNavigationBar({
//     itemList: [
//       {icon: icons.home, href: '/home'},
//       {icon: icons.star, href: '/favorites'},
//       {icon: icons.triangle, href: '/other'},
//       {icon: icons.call, href: '/contact'},
//     ],
//   })}`;
// }

export class AlwatrPwaDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-pwa>');
  }

  render(): unknown {
    this._logger.logMethod?.('render');
    return html`
      <div class="p-10">
        <h1 class="text-titleMedium text-center">سلام ...</h1>
        ${alwatrButton({label: 'کلید ۱', extendClass: 'text-red-50'})}
        ${alwatrButton({label: 'پریز ۲', disabled: true})}
      </div>
    `;
  }
}

// TODO: send app rendered signal

export const alwatrPwa = directive(AlwatrPwaDirective);

export const alwatrPwaContainer = document.getElementById('alwatr_pwa')!;

if (alwatrPwaContainer === null) {
  throw new Error('Cannot find `<div id="alwatr_pwa">` element!');
}
