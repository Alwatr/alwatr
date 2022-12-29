import type {AlwatrDocumentStorage} from '@alwatr/storage-engine';
import type {TextMessage} from '@alwatr/type/chat.js';


declare global {
  interface AlwatrSignals {
    'comment-document-storage': AlwatrDocumentStorage<TextMessage>;
  }
}
