import type {AlwatrDocumentObject} from './storage.js';

export type TotalSalavatCount = AlwatrDocumentObject & {
  id: 'total_salavat_count',
  count: number;
};
