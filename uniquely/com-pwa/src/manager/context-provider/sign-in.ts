import {contextProvider, serverContextConsumer} from '@alwatr/context';
import {simpleHashNumber} from '@alwatr/math';
import {redirect} from '@alwatr/router';

import {userContextConsumer} from './user.js';
import {config} from '../../config.js';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';
import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const signInContextConsumer = serverContextConsumer<AlwatrServiceResponseSuccessWithMeta<ComUser>>(
    'user_storage_context',
    config.fetchContextOptions,
);

signInContextConsumer.subscribe(() => {
  if (signInContextConsumer.getState().target === 'complete') {
    const user = signInContextConsumer.getResponse()?.data;
    if (user != null) {
      localStorage.setItem('user-info', JSON.stringify(user));
      localStorage.removeItem('link-pass');
      contextProvider.setValue<ComUser>(userContextConsumer.id, user);
    }

    redirect({});
  }
});

export const signIn = (phoneNumber: number, token: string): void => {
  signInContextConsumer.request({
    url: `${config.api}/storage/${simpleHashNumber(phoneNumber)}-${token}`,
  });
};
