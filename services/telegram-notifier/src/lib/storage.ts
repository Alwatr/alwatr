import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {MemberList} from './type';

export const storage = new AlwatrStorageEngine<MemberList>({name: 'notifier-storage', path: '_data'});
