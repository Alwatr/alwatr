import type {DocumentObject} from '@alwatr/storage';

export interface DataModel extends DocumentObject {
  /**
   * Save storage data in public or private sub folder.
   */
  subFolder: 'public' | 'private';

  /**
   * Accept subStorage like `comments/page1`.
   */
  subStorage: boolean;
}
