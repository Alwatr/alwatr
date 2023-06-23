import {directive, html, nothing} from '@alwatr/element';
import {AlwatrDynamicDirective} from '@alwatr/fract';
import {router} from '@alwatr/router2';
import '@alwatr/ui-kit/navigation-bar/navigation-bar.js';
import {renderState} from '@alwatr/util';

import './page/home.js'; // for perf
import {navigationBarData} from '../config.js';

import type {PageName} from '../type.js';
import type {PartInfo} from '@alwatr/fract/lit.js';

const renderRecord: Record<PageName | '_default', undefined | PageName | (() => unknown)> = {
  _default: 'home',
  unknown: () => html`unknown...`,
  favorites: () => html`favorites...`,
  home: () => html`<alwatr-page-home></alwatr-page-home>`,
  tours: () => html`tours...`,
  call: () => html`call...`,
  404: () => {
    import('./page/404.js');
    return html`<alwatr-page-404></alwatr-page-404>`;
  },
};

const topAppBarTemplateDirective = (): unknown => html`<p>topAppBar ...</p>`;

const renderNavigationBarTemplateDirective = (): unknown =>
  html`<alwatr-navigation-bar .content=${navigationBarData}></alwatr-navigation-bar>`;

class MainTemplate extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<main>');

    router.redirect('home');
    router.subscribe(() => {
      this.setValue(renderState(<PageName>router.route.sectionList[0] ?? 'home', renderRecord));
    });
  }

  override render(): unknown {
    return nothing;
  }
}

const mainTemplateDirective = directive(MainTemplate);

class AlwatrPwa extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-pwa>');
  }

  override render(): unknown {
    return [topAppBarTemplateDirective(), mainTemplateDirective(), renderNavigationBarTemplateDirective()];
  }
}

export const alwatrPwaDirective = directive(AlwatrPwa);
