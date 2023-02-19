import {
  customElement,
  css,
  html,
  state,
  LocalizeMixin,
  RouterMixin,
  SignalMixin,
  AlwatrBaseElement,
  property,
  PropertyValues,
  cache,
  nothing,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {redirect, routerOutlet, type RouteContext, type RoutesConfig} from '@alwatr/router';
import '@alwatr/ui-kit/card/icon-box.js';

import {orderStorageContextConsumer, topAppBarContextProvider} from '../context.js';

import type {Order, OrderDraft} from '@alwatr/type/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order': AlwatrPageOrder;
  }
}

/**
 * Alwatr Customer Order Management Order List Page
 */
@customElement('alwatr-page-order')
export class AlwatrPageOrder extends LocalizeMixin(RouterMixin(SignalMixin(AlwatrBaseElement))) {
  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      min-height: 100%;
    }
  `;

  @property({type: Number, attribute: 'route-slice'})
    routeSlice = 1;

  get _newOrder(): OrderDraft {
    // TODO: handle last uncompleted order from localStorage
    return {id: 'new', status: 'draft'};
  }

  @state()
    orderId?: string | null;

  @state()
    order?: Order | OrderDraft | null;

  protected override async _routeContextUpdated(routeContext: RouteContext): Promise<void> {
    super._routeContextUpdated(routeContext);
    const orderId = routeContext.sectionList[1]?.toString();
    if (orderId != null) {
      this.orderId = orderId;
    }
    else {
      redirect({sectionList: ['list']}, 'replace', this.routeSlice);
    }
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('orderId')) {
      this._orderIdUpdated();
    }
    super.update(changedProperties);
  }

  protected async _orderIdUpdated(): Promise<void> {
    this._logger.logMethodArgs('_orderIdUpdated', {orderId: this.orderId});
    if (this.orderId == null) return;

    if (this.orderId === 'new') {
      if (this.order?.id !== 'new') {
        this.order = this._newOrder;
      }
      return;
    }
    // else

    const orderStorage = orderStorageContextConsumer.getValue() ?? await orderStorageContextConsumer.untilChange();
    this.order = orderStorage.data[this.orderId] ?? null;
  }

  /**
   * Routes list
   *
   * Current registered orders:
   * - `/order/list` - List of all orders.
   * - `order/id/tracking` - Tracking an order with support chat.
   * - `order/id/detail` - Review order full details.

   * New and draft orders:
   * - `order/new` make new order draft and redirect to edit page.
   * - `order/new/edit` - Editable order detail, redirect to select product if no product selected.
   * - `order/new/select-product` - Selectable product list page.
   * - `order/new/shipping` - Shipping form page.
   * - `order/new/detail` - Review order full details before final submit.
   */
  protected _routesConfig: RoutesConfig = {
    routeId: (routeContext) => routeContext.sectionList[this.routeSlice + 1]?.toString(),
    templates: {
      _404: () => {
        import('../page-404.js');
        return html`<alwatr-page-404>...</alwatr-page-404>`;
      },
      home: () => {
        /**
         * `/order`
         * `/order/list`
         * `/order/new`
         * `/order/1`
         */

        if (this.orderId == null || this.orderId === 'list') {
          import('./page-order-list.js');
          return html`<alwatr-page-order-list>...</alwatr-page-order-list>`;
          // return html`alwatr-page-order-list, ${String(this.orderId)}, ${String(this.order?.id)}`;
        }
        else if (this.orderId === 'new') {
          redirect({sectionList: [this.orderId, 'edit']}, 'replace', this.routeSlice);
          return nothing;
        }
        else {
          redirect({sectionList: [this.orderId, 'tracking']}, 'replace', this.routeSlice);
          return nothing;
        }
      },
      tracking: () => {
        /**
         * `/order/1/tracking`
         * `/order/new/tracking`
         */

        if (this.orderId && this.order?.status === 'draft') {
          redirect({sectionList: [this.orderId, 'edit']}, 'replace', this.routeSlice);
          return nothing;
        }

        import('./page-order-tracking.js');
        return html`<alwatr-page-order-tracking .order=${this.order}>...</alwatr-page-order-tracking>`;
        // return html`alwatr-page-order-tracking, ${String(this.orderId)}, ${String(this.order?.id)}`;
      },
      edit: 'detail', // Same page element.
      detail: () => {
        /**
         * `/order/1/detail`
         * `/order/1/edit`
         * `/order/new/detail`
         * `/order/new/edit`
         */

        if (this.orderId && this.order?.status === 'draft' && this.order.itemList?.length) {
          redirect({sectionList: [this.orderId, 'product']}, 'replace', this.routeSlice);
          return nothing;
        }

        import('./page-order-detail.js');
        return html`<alwatr-page-order-detail .order=${this.order}></alwatr-page-order-detail>`;
        // return html`alwatr-page-order-detail, ${String(this.orderId)}, ${String(this.order?.id)}`;
      },
      product: () => {
        /**
         * `/order/1/product`
         * `/order/new/product`
         */

        if (this.orderId && this.order?.status !== 'draft') {
          redirect({sectionList: [this.orderId, 'detail']}, 'replace', this.routeSlice);
          return nothing;
        }

        import('./page-order-product.js');
        return html`<alwatr-page-order-product .order=${this.order}></alwatr-page-order-product>`;
        // return html`alwatr-page-select-product, ${String(this.orderId)}, ${String(this.order?.id)}`;
      },
      shipping: () => {
        /**
         * `/order/1/shipping`
         * `/order/new/shipping`
         */

        if (this.orderId && this.order?.status !== 'draft') {
          redirect({sectionList: [this.orderId, 'detail']}, 'replace', this.routeSlice);
          return nothing;
        }

        import('./page-order-shipping.js');
        return html`<alwatr-page-order-shipping .order=${this.order}></alwatr-page-order-shipping>`;
        // return html`alwatr-page-shipping, ${String(this.orderId)}, ${String(this.order?.id)}`;
      },
    },
  };

  override render(): unknown {
    this._logger.logMethod('render');

    if (this.orderId === undefined) return this._errorTemplate('loading');
    if (this.orderId === null) return this._errorTemplate('not_found');
    if (this.orderId !== 'list') {
      if (this.order === undefined) return this._errorTemplate('loading');
      if (this.order === null) return this._errorTemplate('not_found');
    }
    return cache(routerOutlet(this._routesConfig));
  }

  protected _errorTemplate(messageKey: string): unknown {
    // TODO: khoshgelize errors
    topAppBarContextProvider.setValue({
      type: 'large',
      headline: message(messageKey),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    });
    return nothing;
  }
}
