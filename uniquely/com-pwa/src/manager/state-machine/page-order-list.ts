import {FiniteStateMachine} from '@alwatr/fsm';

import {orderStorageContextConsumer} from '../../context.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order} from '@alwatr/type/src/customer-order-management.js';

const pageOrderListFsm = new FiniteStateMachine({
  id: 'page-order-list',
  initial: 'loading',
  context: <AlwatrDocumentStorage<Order> | null>null,
  states: {
    _: {on: {}},
    loading: {
      on: {
        LOADED: 'list',
      },
    },
    list: {
      on: {
        REQUEST_UPDATE: 'loading',
      },
    },
  },
});

orderStorageContextConsumer.subscribe((orderStorage) => {
  pageOrderListFsm.transition('LOADED', orderStorage);
});

// init
pageOrderListFsm.signal.subscribe((state) => {
  if (state.by === 'INIT' || state.by === 'REQUEST_UPDATE') {
    orderStorageContextConsumer.request(null, {debounce: 'Timeout'});
  }
});
