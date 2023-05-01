import {serverContextConsumer} from '@alwatr/context';
import {simpleHashNumber} from '@alwatr/math';

import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const userStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<ComUser>>(
    'user_storage_context',
    config.fetchContextOptions,
);

export const signIn = (phoneNumber: number, token: string): void => {
  userStorageContextConsumer.request({
    url: `${config.api}/storage/${simpleHashNumber(phoneNumber)}-${token}`,
  });
};
