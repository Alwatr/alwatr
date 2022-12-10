import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {showToastSignal} from './toast';

import type {Product} from '../type';
import type {AlwatrServiceResponse} from '@alwatr/fetch';

export const productListSignal = new SignalInterface('product-list');

productListSignal.setProvider(async () => {
  try {
    const response = await fetch({
      url: '',
      token: '',
      cacheStrategy: 'stale_while_revalidate',
    });

    if (response.ok !== true) {
      throw new Error('fetch_failed');
    }

    const responseData = (await response.json()) as AlwatrServiceResponse<Record<string, Product>>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }

    return Object.values(responseData.data);
  }
  catch (error) {
    showToastSignal.dispatch({
      message: 'عملیات با خطا رو به رو شد',
    });
  }
  return;
});

productListSignal.request({});
