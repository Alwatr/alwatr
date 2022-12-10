import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from './config';
import {MemberList} from './type';

export const storage = new AlwatrStorageEngine<MemberList>({name: 'notifier-storage', path: config.storage.path});
