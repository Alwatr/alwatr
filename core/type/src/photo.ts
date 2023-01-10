import {AlwatrDocumentObject} from './storage.js';

export type Photo = AlwatrDocumentObject & {
  /**
   * Primary Photo ID
   *
   * like full relative path (include extension) to image CDN (temporary)
   */
  id: string; // path/file-name.png

  /**
   * Photo extra meta information for future maintenances
   */
  meta: PhotoMeta; // meta: {order: 1233, customer: 1334}
}

export type PhotoMeta = Record<string, string | number>;
