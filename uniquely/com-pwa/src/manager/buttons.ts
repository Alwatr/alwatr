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

  editItems: {
    icon: 'create-outline',
    clickSignalId: 'page_new_order_edit_items_click_event',
  },
  submit: {
    icon: 'checkmark-outline',
    clickSignalId: 'page_new_order_submit_click_event',
  },
  editOrder: {
    icon: 'create-outline',
    clickSignalId: 'page_new_order_edit_click_event',
  },
  submitFinal: {
    icon: 'checkmark-outline',
    clickSignalId: 'page_new_order_submit_final_click_event',
  },
  submitShippingForm: {
    icon: 'checkmark-outline',
    clickSignalId: 'page_new_order_submit_shipping_form_click_event',
  },
  editShippingForm: {
    icon: 'checkmark-outline',
    clickSignalId: 'page_new_order_edit_shipping_form_click_event',
  },
  showRegisteredOrderDetail: {
    icon: 'information-outline',
    clickSignalId: 'page_new_order_detail_click_event',
  },
  showRegisteredOrderTracking: {
    icon: 'chatbox-outline',
    clickSignalId: 'page_new_order_tracking_click_event',
  },
  retry: {
    icon: 'reload-outline',
    clickSignalId: 'page_new_order_retry_click_event',
  },
} as const;

eventListener.subscribe(buttons.newOrder.clickSignalId, () => {
  redirect({sectionList: ['new-order']});
});

eventListener.subscribe(buttons.showOrderDetail.clickSignalId, (event: ClickSignalType<Order>): void => {
  redirect({sectionList: ['order-detail', event.detail.id]});
});

eventListener.subscribe(buttons.backToOrderList.clickSignalId, (): void => {
  redirect({sectionList: ['order-list']});
});
