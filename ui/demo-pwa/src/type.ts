import type {TextMessage, AlwatrDocumentStorage} from '@alwatr/type';

declare global {
  interface AlwatrSignals {
    'comment-document-storage': AlwatrDocumentStorage<TextMessage>;
  }
}
