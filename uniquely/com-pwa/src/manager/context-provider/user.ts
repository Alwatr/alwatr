import {contextConsumer, contextProvider} from '@alwatr/context';
import {getLocalStorageItem} from '@alwatr/util';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const userContextConsumer = contextConsumer<ComUser>('user-context');

const user = getLocalStorageItem<ComUser | null>('user-context', null);
if (user != null) {
  contextProvider.setValue<ComUser>(userContextConsumer.id, user);
}
