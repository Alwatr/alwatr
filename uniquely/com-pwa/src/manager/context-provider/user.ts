import {contextConsumer, contextProvider} from '@alwatr/context';
import {getLocalStorageItem, setLocalStorageItem} from '@alwatr/util';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

// user profile
export const userProfileContextConsumer = contextConsumer<ComUser>('user_profile');
export const userProfileLocalStorageKey = userProfileContextConsumer.id + '_x1';

const userProfile = getLocalStorageItem<ComUser | null>(userProfileLocalStorageKey, null);
if (userProfile != null) {
  contextProvider.setValue<ComUser>(userProfileContextConsumer.id, userProfile);
}
userProfileContextConsumer.subscribe((userProfile) => {
  setLocalStorageItem<ComUser>(userProfileLocalStorageKey, userProfile);
});

// user token
export const userTokenContextConsumer = contextConsumer<string>('user_token');
export const userTokenLocalStorageKey = userTokenContextConsumer + '_x1';

const userToken = getLocalStorageItem(userTokenLocalStorageKey, null);
if (userToken != null) {
  contextProvider.setValue<string>(userTokenContextConsumer.id, userToken);
}
userTokenContextConsumer.subscribe((userToken) => {
  setLocalStorageItem<string>(userTokenLocalStorageKey, userToken);
});

// link-pass token
export const linkPassTokenContextConsumer = contextConsumer<string>('link_pass_token');
