import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';

import type {ClickSignalType} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

export const buttons = {
  backToHome: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'back_to_home_click_event',
  },
  browserBack: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'browser_back_click_event',
  },

  reloadOrderStorage: {
    icon: 'reload-outline',
    flipRtl: true,
    clickSignalId: 'reload_order_storage',
  },

  newOrder: {
    icon: 'add-outline',
    clickSignalId: 'new_order_click_event',
  },
  showOrderDetail: {
    clickSignalId: 'show_order_detail_click_event',
  },
  backToOrderList: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'back_to_order_list_event',
  },
} as const;

eventListener.subscribe('new_order_click_event', () => {
  redirect({
    sectionList: ['new-order'],
  });
});

eventListener.subscribe(buttons.showOrderDetail.clickSignalId, (event: ClickSignalType<Order>): void => {
  redirect({sectionList: ['order-detail', event.detail.id]});
});

eventListener.subscribe(buttons.backToOrderList.clickSignalId, (): void => {
  redirect({sectionList: ['order-list']});
});
