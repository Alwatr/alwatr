import {
  customElement,
  property,
  html,
  mapIterable,
  css,
  type PropertyValueMap,
} from '@alwatr/element';
import {l10n} from '@alwatr/i18n2';
import {router} from '@alwatr/router2';
import {MaybePromise} from '@alwatr/type';

import {navigationBarContext, navigationBarEvent} from './context.js';
import {AlwatrSurface} from '../card/surface.js';
import {alwatrIcon} from '../icon/icon.js';

import type {RouteContextBase} from '@alwatr/router2/type.js';

export interface NavigationBarItemContent {
  id: string;
  icon: MaybePromise<string>;
  iconFlipRtl?: boolean;
  link: RouteContextBase['sectionList'];
  label?: string;
  // badgeValue: string,
}
export interface NavigationBarContent {
  itemList: Array<NavigationBarItemContent>;
}

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-navigation-bar': AlwatrNavigationBar;
  }
}

/**
 * Alwatr Navigation Bar Element.
 *
 * @attr {String} context-signal - context signal name.
 * @attr {String} active-item-id-signal - active item id signal name.
 */
@customElement('alwatr-navigation-bar')
export class AlwatrNavigationBar extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: calc(var(--sys-spacing-track) / 2);
        padding: calc(1.5 * var(--sys-spacing-track)) 0 calc(2 * var(--sys-spacing-track)) 0;
        color: var(--sys-color-surface);
        border-radius: 0;
        user-select: none;
        z-index: var(--sys-zindex-sticky);
        cursor: pointer;
      }

      :host > * {
        height: 100%;
        flex-grow: 1;
        text-align: center;
        text-decoration: none;
      }

      .indicator {
        display: inline-block;
      }
      .item[data-active] .indicator {
        background-color: var(--sys-color-secondary-container);
        color: var(--sys-color-secondary-container);
        border-radius: var(--sys-radius-large);
      }

      .alwatr-icon {
        padding: calc(var(--sys-spacing-track) / 2) calc(2.5 * var(--sys-spacing-track));
        color: var(--sys-color-on-surface-variant);
        font-size: calc(3 * var(--sys-spacing-track));
      }
      .item[data-active] .alwatr-icon {
        color: var(--sys-color-on-secondary-container);
      }

      .label {
        margin-top: calc(var(--sys-spacing-track));
        color: var(--sys-color-on-surface-variant);
        font-family: var(--sys-typescale-label-medium-font-family-name);
        font-weight: var(--sys-typescale-label-medium-font-weight);
        font-size: var(--sys-typescale-label-medium-font-size);
        letter-spacing: var(--sys-typescale-label-medium-letter-spacing);
        line-height: var(--sys-typescale-label-medium-line-height);
      }
      .item[data-active] .label {
        color: var(--sys-color-on-surface);
      }
    `,
  ];

  @property()
    content?: NavigationBarContent;

  @property()
    activeItemId?: string;

  protected override firstUpdated(_changedProperties: PropertyValueMap<this>): void {
    super.firstUpdated(_changedProperties);
    this.setAttribute('elevated', '2');
    this.setAttribute('tinted', '');
  }

  override connectedCallback(): void {
    super.connectedCallback();

    navigationBarContext.subscribe((context) => {
      this.content = context;
    });
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return mapIterable(this, this.content?.itemList, this.navigationItem);
  }

  protected navigationItem(content: NavigationBarItemContent): unknown {
    return html`
      <a
        class="item"
        href=${router.url({sectionList: content.link})}
        data-id=${content.id}
        ?data-active=${this.activeItemId === content.id}
        @click=${this.itemClickHandler}
      >
        <div class="indicator">
          ${alwatrIcon(content.icon)}
        </div>
        <div class="label">${l10n.message(content.label)}</div>
      </a>
    `;
  }

  protected itemClickHandler(event: MouseEvent): void {
    this._logger.logMethod?.('itemClickHandler');
    const target = event.currentTarget as HTMLDivElement;
    const id = target.getAttribute('data-id');
    if (id == null) return;

    this.activeItemId = id;
    navigationBarEvent.dispatch(this.content!.itemList.find((item) => item.id === id)!);
  }
}
