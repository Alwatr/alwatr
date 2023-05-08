import {contextConsumer, contextProvider} from '@alwatr/context';
import {getLocalStorageItem, setLocalStorageItem} from '@alwatr/util';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

const localStorageSuffixKey = '_x1';

// user profile
export const userProfileContextConsumer = contextConsumer<ComUser>('user_profile');

const userProfile = getLocalStorageItem<ComUser | null>(userProfileContextConsumer.id + localStorageSuffixKey, null);
if (userProfile != null) {
  contextProvider.setValue<ComUser>(userProfileContextConsumer.id, userProfile);
}
userProfileContextConsumer.subscribe((userProfile) => {
  setLocalStorageItem<ComUser>(userProfileContextConsumer.id + localStorageSuffixKey, userProfile);
});

// user token
export const userTokenContextConsumer = contextConsumer<string>('user_token');

const userToken = getLocalStorageItem(userTokenContextConsumer.id + localStorageSuffixKey, null);
if (userToken != null) {
  contextProvider.setValue<string>(userTokenContextConsumer.id, userToken);
}
userTokenContextConsumer.subscribe((userToken) => {
  setLocalStorageItem<string>(userTokenContextConsumer.id + localStorageSuffixKey, userToken);
});

// link-pass token
export const linkPassTokenContextConsumer = contextConsumer<string>('link_pass_token');
