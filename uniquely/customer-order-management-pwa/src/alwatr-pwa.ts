import {AlwatrElement} from '@alwatr/element';
import {preloadIcon} from '@alwatr/icon';
import {router} from '@alwatr/router';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {cache} from 'lit/directives/cache.js';

import styles from './style';

import './component/ionic';
import './page/page-product-list';
import './page/page-invoice';
import './page/page-amount';
import './page/page-information';
import './page/page-order';
import './page/page-home';

import type {RoutesConfig} from '@alwatr/router';
import type {ListenerInterface} from '@alwatr/signal';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPWA;
  }
}

@customElement('alwatr-pwa')
export class AlwatrPWA extends AlwatrElement {
  static override styles = [
    ...styles,
    css`
      .page-container {
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        contain: size layout style;
      }
    `,
    css`
      ion-toolbar.control-bar {
        --padding-start: 5%;
        --padding-end: 5%;
      }
      ion-toolbar.control-bar ion-button.next {
        width: 100%;
      }
    `,
  ];

  constructor() {
    super();
    router.initial();
  }

  protected _activePage = 'home';

  protected _routes: RoutesConfig = {
    // TODO: refactor route, we need to get active page!
    // TODO: ability to redirect!
    map: (route) => (this._activePage = route.sectionList[0]?.toString().trim() || 'home'),
    list: {
      products: {
        render: () => html`<page-product-list class="ion-page"></page-product-list>`,
      },
      invoice: {
        render: () => html`<page-invoice class="ion-page"></page-invoice>`,
      },
      amount: {
        render: () => html`<page-amount class="ion-page"></page-amount>`,
      },
      information: {
        render: () => html`<page-information class="ion-page"></page-information>`,
      },
      order: {
        render: () => html`<page-order class="ion-page"></page-order>`,
      },
      home: {
        render: () => html`<page-home class="ion-page"></page-home>`,
      },
    },
  };

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._listenerList.push(
        router.signal.addListener(
            (route) => {
              this._logger.logMethodArgs('routeChanged', {route});
              this.requestUpdate();
            },
            {receivePrevious: true},
        ),
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`
      <div class="page-container">${cache(router.outlet(this._routes))}</div>
      <ion-footer> ${this._renderControlBarTemplate()} ${this._renderTabBarTemplate()} </ion-footer>
    `;
  }

  protected _renderControlBarTemplate(): TemplateResult {
    return html`
      <ion-toolbar class="control-bar">
        <ion-button class="next" fill="outline" slot="start">
          <alwatr-icon slot="start" name="arrow-back" dir="rtl" flip-rtl></alwatr-icon>
          <ion-label>بعدی</ion-label>
        </ion-button>
        <ion-button class="perv" fill="clear" slot="end">
          <alwatr-icon slot="end" name="arrow-forward" dir="rtl" flip-rtl></alwatr-icon>
          <ion-label>قبلی</ion-label>
        </ion-button>
      </ion-toolbar>
    `;
  }
  protected _renderTabBarTemplate(): TemplateResult {
    const tabButtonsTemplate = [
      this._renderTabButtonTemplate('home', 'خانه', 'home'),
      this._renderTabButtonTemplate('products', 'انتخاب کالا', 'checkbox'),
      this._renderTabButtonTemplate('amount', 'تعیین متراژ', 'calculator'),
      this._renderTabButtonTemplate('information', 'نحوه بارگیری', 'archive'),
      this._renderTabButtonTemplate('invoice', 'پیش فاکتور', 'clipboard'),
      this._renderTabButtonTemplate('order', 'سفارش', 'chatbox-ellipses'),
    ];

    return html` <ion-tab-bar dir="ltr"> ${tabButtonsTemplate} </ion-tab-bar> `;
  }
  protected _renderTabButtonTemplate(
      slug: string,
      label: string,
      icon: string,
      status: 'perv' | 'curr' | 'next' = 'next',
  ): TemplateResult {
    const isNext = status === 'next';
    const isCurrent = status === 'curr';
    const isSelected = slug === this._activePage;

    preloadIcon(icon);
    preloadIcon(icon + '-outline');

    return html`
      <ion-tab-button
        href=${router.makeUrl({sectionList: [slug]})}
        layout=${isSelected || !isNext ? 'icon-top' : 'label-hide'}
        ?selected=${isSelected || isCurrent}
      >
        <alwatr-icon name=${isSelected || !isNext ? icon : icon + '-outline'}></alwatr-icon>
        <ion-label>${label}</ion-label>
      </ion-tab-button>
    `;
  }
}
