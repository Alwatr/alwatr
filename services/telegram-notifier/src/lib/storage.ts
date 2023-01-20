import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {MemberList} from './type.js';
import {config} from '../config.js';

export const storage = new AlwatrStorageEngine<MemberList>(config.storage);
