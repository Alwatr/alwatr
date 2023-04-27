import {contextConsumer, contextProvider} from '@alwatr/context';
import {getLocalStorageItem} from '@alwatr/util';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const userProfileLocalStorageKey = 'user-profile-x1';
export const userTokenLocalStorageKey = 'user-token-x1';

export const userProfileContextConsumer = contextConsumer<ComUser>('user-profile');
export const userTokenContextConsumer = contextConsumer<string>('user-token');

const userProfile = getLocalStorageItem<ComUser | null>(userProfileLocalStorageKey, null);
if (userProfile != null) {
  contextProvider.setValue<ComUser>(userProfileContextConsumer.id, userProfile);
}

const userToken = getLocalStorageItem<string | null>(userTokenLocalStorageKey, null);
if (userToken != null) {
  contextProvider.setValue<string>(userTokenContextConsumer.id, userToken);
}
