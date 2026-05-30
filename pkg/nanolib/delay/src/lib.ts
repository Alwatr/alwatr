import {getGlobalThis} from '@alwatr/global-this';
import type {DictionaryOpt} from '@alwatr/type-helper';

export const globalThis_ = getGlobalThis<DictionaryOpt<unknown>>();
