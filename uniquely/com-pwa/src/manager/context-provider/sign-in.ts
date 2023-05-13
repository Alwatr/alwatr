import {contextProvider, serverContextConsumer} from '@alwatr/context';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {userProfileContextConsumer} from './user.js';
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
    redirect({});

    snackbarSignalTrigger.request({
      message: message('sign_in_welcome_message').replace('${fullName}', userProfile.fullName),
    });
  }
});

export const signIn = (token: string): void => {
  signInServerContext.request({
    url: config.serverContext.userProfile,
    token,
  });
};
