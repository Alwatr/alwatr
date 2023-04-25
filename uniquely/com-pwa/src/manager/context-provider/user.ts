import {contextProvider} from '@alwatr/context';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

const user = localStorage.getItem('user-context');
if (user != null) {
  contextProvider.setValue<ComUser>('user_context', JSON.parse(user));
}
