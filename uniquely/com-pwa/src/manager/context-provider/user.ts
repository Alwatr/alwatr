import {contextProvider} from '@alwatr/signal';
import {User} from '@alwatr/type';
import {getLocalStorageItem} from '@alwatr/util';

const userContextProvider = contextProvider.bind<User>('user-context');

// demo
userContextProvider.setValue(getLocalStorageItem(userContextProvider.id, {
  id: 'demo-123',
  fullName: 'Demo User',
}));
