/* eslint-disable max-len */
import type {PageOrderListContent} from '../type.js';


export const orderListContent: PageOrderListContent = {
  topAppBar: {
    type: 'center',
    headline: 'سفارشات جاری',
    startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
    endIconList: [{icon: 'menu-outline', clickSignalId: 'app-menu-click-event'}],
  },
};
