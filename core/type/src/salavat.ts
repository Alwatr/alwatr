import type {AlwatrDocumentObject} from './storage.js';

export type GlobalSalavatCount = AlwatrDocumentObject & {
  id: 'salavat_count',
  count: number;
};
