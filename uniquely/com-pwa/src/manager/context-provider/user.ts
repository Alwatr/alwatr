import {contextConsumer, contextProvider} from '@alwatr/context';
import {getLocalStorageItem} from '@alwatr/util';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

// user profile
export const userProfileContextConsumer = contextConsumer<ComUser>('user-profile');
export const userProfileLocalStorageKey = userProfileContextConsumer.id + '-x1';

const userProfile = getLocalStorageItem<ComUser | null>(userProfileLocalStorageKey, null);
if (userProfile != null) {
  contextProvider.setValue<ComUser>(userProfileContextConsumer.id, userProfile);
}
userProfileContextConsumer.subscribe((userProfile) => {
  localStorage.setItem(userProfileLocalStorageKey, JSON.stringify(userProfile));
});

// user token
export const userTokenContextConsumer = contextConsumer<string>('user-token');
export const userTokenLocalStorageKey = userTokenContextConsumer + '-x1';

const userToken = localStorage.getItem(userTokenLocalStorageKey);
if (userToken != null) {
  contextProvider.setValue<string>(userTokenContextConsumer.id, userToken);
}
userTokenContextConsumer.subscribe((userToken) => {
  localStorage.setItem(userTokenLocalStorageKey, userToken);
});

// link-pass token
export const linkPassTokenContextConsumer = contextConsumer<string>('link-pass-token');
