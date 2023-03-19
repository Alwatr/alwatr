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
    clickSignalId: 'reload_order_storage',
  },

  newOrder: {
    icon: 'add-outline',
    clickSignalId: 'new_order_click_event',
  },
  showOrderDetail: {
    clickSignalId: 'show_order_detail_click_event',
  },
} as const;

eventListener.subscribe('new_order_click_event', () => {
  redirect({
    sectionList: ['new-order'],
  });
});

eventListener.subscribe('show_order_detail_click_event', (event: ClickSignalType<Order>): void => {
  redirect({sectionList: ['order-detail', event.detail.id]});
});
