import {contextProvider, serverContextConsumer} from '@alwatr/context';
import {simpleHashNumber} from '@alwatr/math';
import {redirect} from '@alwatr/router';

import {
  linkPassTokenContextConsumer,
  userProfileContextConsumer,
  userTokenContextConsumer,
} from './user.js';
import {config} from '../../config.js';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';
import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const signInServerContext = serverContextConsumer<AlwatrServiceResponseSuccessWithMeta<ComUser>>(
    'sign_in_storage_context',
    config.fetchContextOptions,
);

signInServerContext.subscribe(() => {
  if (signInServerContext.getState().target === 'complete') {
    const userProfile = signInServerContext.getResponse()!.data;
    contextProvider.setValue<ComUser>(userProfileContextConsumer.id, userProfile);

    const linkPass = linkPassTokenContextConsumer.getValue();
    if (linkPass) {
      contextProvider.setValue<string>(userTokenContextConsumer.id, linkPass);
    }

    redirect({});
  }
});

export const signIn = (phoneNumber: number, token: string): void => {
  signInContextConsumer.request({
    url: `${config.api}/storage/${simpleHashNumber(phoneNumber)}-${token}`,
  });
};
