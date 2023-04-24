import {
  customElement,
  property,
  html,
  mapIterable,
  css,
  SignalMixin,
  LocalizeMixin,
  type PropertyValueMap,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/icon';
import {url} from '@alwatr/router';
import {contextConsumer, eventListener, eventTrigger} from '@alwatr/signal';

import {AlwatrSurface} from '../card/surface.js';

import type {RouteContextBase} from '@alwatr/router/type.js';
import type {StringifyableRecord} from '@alwatr/type';

export interface NavigationBarItemContent extends StringifyableRecord {
  id: string;
  icon: string;
  iconFlipRtl?: boolean;
  link: RouteContextBase['sectionList'];
  label?: string;
  // badgeValue: string,
}
export interface NavigationBarContent extends StringifyableRecord {
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
export class AlwatrNavigationBar extends LocalizeMixin(SignalMixin(AlwatrSurface)) {
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

      alwatr-icon {
        padding: calc(var(--sys-spacing-track) / 2) calc(2.5 * var(--sys-spacing-track));
        color: var(--sys-color-on-surface-variant);
        font-size: calc(3 * var(--sys-spacing-track));
      }
      .item[data-active] alwatr-icon {
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

    const contextSignal = this.getAttribute('context-signal');
    if (contextSignal) {
      this._addSignalListeners(
          contextConsumer.subscribe<NavigationBarContent>(contextSignal, (context) => {
            this.content = context;
            this.requestUpdate(); // Ensure update on child properties changes.
          },
          {receivePrevious: 'NextCycle'}),
      );
    }

    const activeItemIdSignal = this.getAttribute('active-item-id-signal');
    if (activeItemIdSignal) {
      this._addSignalListeners(
          eventListener.subscribe<{id: string}>(activeItemIdSignal, (detail) => {
            this.activeItemId = detail.id;
            this.requestUpdate(); // Ensure update on child properties changes.
          },
          {receivePrevious: 'NextCycle'}),
      );
    }
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return mapIterable(this, this.content?.itemList, this.navigationItem);
  }

  protected navigationItem(content: NavigationBarItemContent): unknown {
    const iconName = content.icon + (content.id === this.activeItemId ? '-sharp' : '-outline');
    return html`
      <a
        class="item"
        href=${url({sectionList: content.link})}
        data-id=${content.id}
        ?data-active=${this.activeItemId === content.id}
        @click=${this.itemClickHandler}
      >
        <div class="indicator">
          <alwatr-icon .name=${iconName} ?flip-rtl=${content.iconFlipRtl}></alwatr-icon>
        </div>
        <div class="label">${message(content.label)}</div>
      </a>
    `;
  }

  protected itemClickHandler(event: MouseEvent): void {
    this._logger.logMethod?.('itemClickHandler');
    const target = event.currentTarget as HTMLDivElement;
    const id = target.getAttribute('data-id');
    const activeItemIdSignal = this.getAttribute('active-item-id-signal');
    if (id == null || activeItemIdSignal == null) return;

    eventTrigger.dispatch(activeItemIdSignal, {id});
  }
}
