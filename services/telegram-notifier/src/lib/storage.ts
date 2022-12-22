import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from '../config.js';
import {MemberList} from './type.js';

export const storage = new AlwatrStorageEngine<MemberList>(config.storage);
