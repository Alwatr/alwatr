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
  print: {
    icon: 'print-outline',
    clickSignalId: 'order_detail_print',
  },

  reload: {
    icon: 'reload-outline',
  },

  reloadAdminOrderListStorage: {
    icon: 'reload-outline',
    flipRtl: true,
    clickSignalId: 'reload_admin_order_list_storage',
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
    labelKey: 'page_order_detail_button',
    icon: 'information-outline',
    clickSignalId: 'show_order_detail_click_event',
  },
  backToOrderList: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'back_to_order_list_event',
  },
  backToAdminOrderList: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'back_to_admin_order_list_event',
  },

  editItems: {
    labelKey: 'page_order_edit_items',
    icon: 'create-outline',
    clickSignalId: 'edit_items_click_event',
  },
  submit: {
    labelKey: 'page_order_submit',
    icon: 'checkmark-outline',
    clickSignalId: 'submit_click_event',
  },
  selectProductSubmit: {
    labelKey: 'select_product_submit_button',
    icon: 'checkmark-outline',
    clickSignalId: 'select_product_submit_click_event',
  },
  editOrder: {
    labelKey: 'page_order_edit',
    icon: 'create-outline',
    clickSignalId: 'edit_order_click_event',
  },
  submitFinal: {
    labelKey: 'page_order_submit_final',
    icon: 'checkmark-outline',
    clickSignalId: 'submit_final_click_event',
  },
  submitShippingForm: {
    labelKey: 'page_order_shipping_submit',
    icon: 'checkmark-outline',
    clickSignalId: 'submit_shipping_form_click_event',
  },
  editShippingForm: {
    labelKey: 'page_order_shipping_edit',
    icon: 'create-outline',
    clickSignalId: 'edit_shipping_form_click_event',
  },
  showRegisteredOrderDetail: {
    labelKey: 'page_order_detail_button',
    icon: 'information-outline',
    clickSignalId: 'show_registered_order_detail_click_event',
  },
  showRegisteredOrderTracking: {
    icon: 'chatbox-outline',
    clickSignalId: 'show_registered_order_tracking_click_event',
  },
  retry: {
    labelKey: 'page_order_retry_button',
    icon: 'reload-outline',
    clickSignalId: 'retry_click_event',
  },
  signIn: {
    labelKey: 'page_sign_in_submit',
    icon: 'checkmark-outline',
    clickSignalId: 'sign_in_submit_click_event',
  },
} as const;

eventListener.subscribe(buttons.newOrder.clickSignalId, () => {
  redirect({sectionList: ['order', 'new']});
});

eventListener.subscribe(buttons.print.clickSignalId, () => {
  window.print();
});

eventListener.subscribe(buttons.showOrderDetail.clickSignalId, (event: ClickSignalType<Order>): void => {
  redirect({sectionList: ['order', event.detail.id]});
});

eventListener.subscribe(buttons.backToOrderList.clickSignalId, (): void => {
  redirect({sectionList: ['order-list']});
});
