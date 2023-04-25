import {contextProvider, serverContextConsumer} from '@alwatr/context';

import {config} from '../../config.js';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';
import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const signInContextConsumer = serverContextConsumer<AlwatrServiceResponseSuccessWithMeta<ComUser>>(
    'user_storage_context',
    config.fetchContextOptions,
);


export const signIn = (phoneNumber: number, token: string): void => {
  signInContextConsumer.request({
    url: `${config.api}/auth/${phoneNumber}-${token}`,
  });
};
