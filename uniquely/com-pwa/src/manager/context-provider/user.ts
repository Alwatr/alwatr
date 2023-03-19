import {contextProvider} from '@alwatr/context';
import {User} from '@alwatr/type';
import {getLocalStorageItem} from '@alwatr/util';

contextProvider.setValue<User>('user_context', getLocalStorageItem('user_context', {
  id: 'demo-123',
  fullName: 'Demo User',
}));
