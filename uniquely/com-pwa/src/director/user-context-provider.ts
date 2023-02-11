import {contextProvider} from '@alwatr/signal';
import {getLocalStorageItem} from '@alwatr/util';

import type {User} from '@alwatr/type';

// demo
contextProvider.setValue<User>('user-context', getLocalStorageItem('user-context', {
  id: 'demo-123',
  fullName: 'Demo User',
}));
