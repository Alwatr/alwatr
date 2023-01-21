import {AlwatrDummyElement, customElement, html, css, property, map} from '@alwatr/element';
import {router} from '@alwatr/router';

import './navigation-drawer-salavat-counter.js';

import type {Routes} from '../../types/route.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-navigation-drawer': AlwatrNavigationDrawer;
  }
}

@customElement('alwatr-navigation-drawer')
export class AlwatrNavigationDrawer extends AlwatrDummyElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        position: fixed;
        top: 0;
        bottom: 0;
        z-index: var(--sys-zindex-topness);
        right: calc(-1 * 45 * var(--sys-spacing-track));
        transform: translateX(0px);
        overflow-y: auto;

        max-width: calc(100vw - 7 * var(--sys-spacing-track));
        width: calc(45 * var(--sys-spacing-track));
        height: 100%;

        background-color: var(--sys-color-surface);
        background-image: url('/images/background.jpg');
        background-repeat: no-repeat;
        background-position: bottom right;
        background-size: cover;

        will-change: transform;

        transition-property: transform;
        transition-duration: var(--sys-motion-duration-large);
        transition-timing-function: var(--sys-motion-easing-in-out);
      }

      .navigation-drawer__items {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: calc(1.5 * var(--sys-spacing-track));
        backdrop-filter: blur(2vw);
      }

      :host([open]) {
        transform: translateX(calc(-1 * 45 * var(--sys-spacing-track)));
      }
    `,
  ];

  @property({type: Object})
    routes: Routes = {};

  @property()
    currentSlug?: string;

  @property({type: Boolean, reflect: true})
    open = false;

  override render(): unknown {
    const itemsTemplate = map(Object.keys(this.routes), (slug) => {
      const route = this.routes[slug];
      const selected = this.currentSlug === slug;

      return html`<alwatr-navigation-drawer-item
        .href=${router.makeUrl({sectionList: [slug]})}
        .icon=${route.icon.name}
        .urlPrefix=${route.icon.urlPrefix}
        .label=${route.title}
        .twoToneIcon=${route.twoToneIcon ?? false}
        ?active=${selected}
      ></alwatr-navigation-drawer-item>`;
    });

    return html`
      <alwatr-navigation-salavat-counter></alwatr-navigation-salavat-counter>
      <div class="navigation-drawer__items">${itemsTemplate}</div>
    `;
  }
}
